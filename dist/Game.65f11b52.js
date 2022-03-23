// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/Input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var MovingDirection = {
  up: 0,
  down: 1,
  left: 2,
  right: 3
};
var _default = MovingDirection;
exports.default = _default;
},{}],"js/Sound.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var Sound = {
  eatDotSound: new Audio("sounds/eat_dot.wav"),
  powerDotSound: new Audio("sounds/power_dot.wav"),
  eatGhostSound: new Audio("sounds/eat_ghost.wav"),
  gameOverSound: new Audio("sounds/game_over.wav"),
  gameWinSound: new Audio("sounds/game_win.wav")
};
var _default = Sound;
exports.default = _default;
},{}],"js/Pacman.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Input = _interopRequireDefault(require("./Input.js"));

var _Sound = _interopRequireDefault(require("./Sound.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _loadPacmanImages = /*#__PURE__*/new WeakSet();

var _keydown = /*#__PURE__*/new WeakMap();

var _move = /*#__PURE__*/new WeakSet();

var _animate = /*#__PURE__*/new WeakSet();

var _eatDot = /*#__PURE__*/new WeakSet();

var _eatPowerDot = /*#__PURE__*/new WeakSet();

var _eatGhost = /*#__PURE__*/new WeakSet();

var Pacman = /*#__PURE__*/function () {
  function Pacman(x, y, tileSize, speed, tileMap) {
    var _this = this;

    _classCallCheck(this, Pacman);

    _classPrivateMethodInitSpec(this, _eatGhost);

    _classPrivateMethodInitSpec(this, _eatPowerDot);

    _classPrivateMethodInitSpec(this, _eatDot);

    _classPrivateMethodInitSpec(this, _animate);

    _classPrivateMethodInitSpec(this, _move);

    _classPrivateMethodInitSpec(this, _loadPacmanImages);

    _defineProperty(this, "Rotation", {
      right: 0,
      down: 1,
      left: 2,
      up: 3
    });

    _classPrivateFieldInitSpec(this, _keydown, {
      writable: true,
      value: function value(event) {
        if (event.keyCode == 37) {
          if (_this.currentMovingDirection == _Input.default.right) _this.currentMovingDirection = _Input.default.left;
          _this.requestedMovingDirection = _Input.default.left;
          _this.madeFirstMove = true;
        }

        if (event.keyCode == 38) {
          if (_this.currentMovingDirection == _Input.default.down) _this.currentMovingDirection = _Input.default.up;
          _this.requestedMovingDirection = _Input.default.up;
          _this.madeFirstMove = true;
        }

        if (event.keyCode == 39) {
          if (_this.currentMovingDirection == _Input.default.left) _this.currentMovingDirection = _Input.default.right;
          _this.requestedMovingDirection = _Input.default.right;
          _this.madeFirstMove = true;
        }

        if (event.keyCode == 40) {
          if (_this.currentMovingDirection == _Input.default.up) _this.currentMovingDirection = _Input.default.down;
          _this.requestedMovingDirection = _Input.default.down;
          _this.madeFirstMove = true;
        }
      }
    });

    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.speed = speed;
    this.tileMap = tileMap;
    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;
    this.pacmanAnimationTimerDefault = 10;
    this.pacmanAnimationTimer = null;
    this.pacmanRotation = this.Rotation.right;
    this.powerDotActive = false;
    this.powerDotAboutToExpire = false;
    this.timers = [];
    this.madeFirstMove = false;
    document.addEventListener("keydown", _classPrivateFieldGet(this, _keydown)); // keyboard input

    _classPrivateMethodGet(this, _loadPacmanImages, _loadPacmanImages2).call(this); //  score logic


    this.score = 0;
    this.highScore = undefined;
    this.dom_score = document.querySelector("#score");
  }

  _createClass(Pacman, [{
    key: "draw",
    value: function draw(ctx, pause, ghosts) {
      if (!pause) {
        _classPrivateMethodGet(this, _move, _move2).call(this);

        _classPrivateMethodGet(this, _animate, _animate2).call(this);
      }

      _classPrivateMethodGet(this, _eatDot, _eatDot2).call(this);

      _classPrivateMethodGet(this, _eatPowerDot, _eatPowerDot2).call(this);

      _classPrivateMethodGet(this, _eatGhost, _eatGhost2).call(this, ghosts);

      var size = this.tileSize / 2;
      ctx.save();
      ctx.translate(this.x + size, this.y + size);
      ctx.rotate(this.pacmanRotation * 90 * Math.PI / 180);
      ctx.drawImage(this.pacmanImages[this.pacmanImageIndex], -size, -size, this.tileSize, this.tileSize);
      ctx.restore();
    }
  }, {
    key: "updateHighScore",
    value: function updateHighScore() {
      this.highScore = JSON.parse(localStorage.getItem("High Score"));
      this.highScore ? null : this.highScore = this.score;
      this.highScore > this.score ? this.highScore = this.highScore : this.highScore = this.score;
      localStorage.setItem("High Score", JSON.stringify(this.highScore));
    }
  }]);

  return Pacman;
}();

exports.default = Pacman;

function _loadPacmanImages2() {
  var pacmanImage1 = new Image();
  pacmanImage1.src = "/images/pac0.png";
  var pacmanImage2 = new Image();
  pacmanImage2.src = "/images/pac1.png";
  var pacmanImage3 = new Image();
  pacmanImage3.src = "/images/pac2.png";
  this.pacmanImages = [pacmanImage1, pacmanImage2, pacmanImage3, pacmanImage2];
  this.pacmanImageIndex = 0;
}

function _move2() {
  if (this.currentMovingDirection !== this.requestedMovingDirection) {
    if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
      if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.requestedMovingDirection)) this.currentMovingDirection = this.requestedMovingDirection;
    }
  }

  if (this.tileMap.didCollideWithEnvironment(this.x, this.y, this.currentMovingDirection)) {
    this.pacmanAnimationTimer = null;
    this.pacmanImageIndex = 1;
    return;
  } else if (this.currentMovingDirection != null && this.pacmanAnimationTimer == null) {
    this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
  }

  switch (this.currentMovingDirection) {
    case _Input.default.up:
      this.y -= this.speed;
      this.pacmanRotation = this.Rotation.up;
      break;

    case _Input.default.down:
      this.y += this.speed;
      this.pacmanRotation = this.Rotation.down;
      break;

    case _Input.default.left:
      this.x -= this.speed;
      this.pacmanRotation = this.Rotation.left;
      break;

    case _Input.default.right:
      this.x += this.speed;
      this.pacmanRotation = this.Rotation.right;
      break;
  }
}

function _animate2() {
  if (this.pacmanAnimationTimer == null) {
    return;
  }

  this.pacmanAnimationTimer--;

  if (this.pacmanAnimationTimer == 0) {
    this.pacmanAnimationTimer = this.pacmanAnimationTimerDefault;
    this.pacmanImageIndex++;
    if (this.pacmanImageIndex == this.pacmanImages.length) this.pacmanImageIndex = 0;
  }
}

function _eatDot2() {
  if (this.tileMap.eatDot(this.x, this.y) && this.madeFirstMove) {
    this.score += 1;
    this.dom_score.innerHTML = "".concat(this.score);
    this.updateHighScore();

    _Sound.default.eatDotSound.play();
  }
}

function _eatPowerDot2() {
  var _this2 = this;

  if (this.tileMap.eatPowerDot(this.x, this.y)) {
    this.score += 10;
    this.dom_score.innerHTML = "".concat(this.score);
    this.updateHighScore();

    _Sound.default.powerDotSound.play();

    this.powerDotActive = true;
    this.powerDotAboutToExpire = false;
    this.timers.forEach(function (timer) {
      return clearTimeout(timer);
    });
    this.timers = [];
    var powerDotTimer = setTimeout(function () {
      _this2.powerDotActive = false;
      _this2.powerDotAboutToExpire = false;
    }, 1000 * 6);
    this.timers.push(powerDotTimer);
    var powerDotAboutToExpireTimer = setTimeout(function () {
      _this2.powerDotAboutToExpire = true;
    }, 1000 * 3);
    this.timers.push(powerDotAboutToExpireTimer);
  }
}

function _eatGhost2(ghosts) {
  var _this3 = this;

  if (this.powerDotActive) {
    var collideGhosts = ghosts.filter(function (ghost) {
      return ghost.collideWith(_this3);
    });
    collideGhosts.forEach(function (ghost) {
      ghosts.splice(ghosts.indexOf(ghost), 1);
      _this3.score += 50;
      _this3.dom_score.innerHTML = "".concat(_this3.score);

      _this3.updateHighScore();

      _Sound.default.eatGhostSound.play();
    });
  }
}
},{"./Input.js":"js/Input.js","./Sound.js":"js/Sound.js"}],"js/Ghost.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Input = _interopRequireDefault(require("./Input.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _setImage = /*#__PURE__*/new WeakSet();

var _setImageWhenPowerDotIsActive = /*#__PURE__*/new WeakSet();

var _changeDirection = /*#__PURE__*/new WeakSet();

var _move = /*#__PURE__*/new WeakSet();

var _random = /*#__PURE__*/new WeakSet();

var _loadImages = /*#__PURE__*/new WeakSet();

var Ghost = /*#__PURE__*/function () {
  function Ghost(x, y, tileSize, speed, tileMap) {
    _classCallCheck(this, Ghost);

    _classPrivateMethodInitSpec(this, _loadImages);

    _classPrivateMethodInitSpec(this, _random);

    _classPrivateMethodInitSpec(this, _move);

    _classPrivateMethodInitSpec(this, _changeDirection);

    _classPrivateMethodInitSpec(this, _setImageWhenPowerDotIsActive);

    _classPrivateMethodInitSpec(this, _setImage);

    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.speed = speed;
    this.tileMap = tileMap;

    _classPrivateMethodGet(this, _loadImages, _loadImages2).call(this);

    this.movingDirection = Math.floor(Math.random() * Object.keys(_Input.default).length);
    this.directionTimerDefault = _classPrivateMethodGet(this, _random, _random2).call(this, 10, 25);
    this.directionTimer = this.directionTimerDefault;
    this.scaredAboutToExpireTimerDefault = 10;
    this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;
  }

  _createClass(Ghost, [{
    key: "draw",
    value: function draw(ctx, pause, pacman) {
      if (!pause) {
        _classPrivateMethodGet(this, _move, _move2).call(this);

        _classPrivateMethodGet(this, _changeDirection, _changeDirection2).call(this);
      }

      _classPrivateMethodGet(this, _setImage, _setImage2).call(this, ctx, pacman);
    }
  }, {
    key: "collideWith",
    value: function collideWith(pacman) {
      var size = this.tileSize / 2;

      if (this.x < pacman.x + size && this.x + size > pacman.x && this.y < pacman.y + size && this.y + size > pacman.y) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Ghost;
}();

exports.default = Ghost;

function _setImage2(ctx, pacman) {
  if (pacman.powerDotActive) {
    _classPrivateMethodGet(this, _setImageWhenPowerDotIsActive, _setImageWhenPowerDotIsActive2).call(this, pacman);
  } else {
    this.image = this.normalGhost;
  }

  ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
}

function _setImageWhenPowerDotIsActive2(pacman) {
  if (pacman.powerDotAboutToExpire) {
    this.scaredAboutToExpireTimer--;

    if (this.scaredAboutToExpireTimer === 0) {
      this.scaredAboutToExpireTimer = this.scaredAboutToExpireTimerDefault;

      if (this.image === this.scaredGhost) {
        this.image = this.scaredGhost2;
      } else {
        this.image = this.scaredGhost;
      }
    }
  } else {
    this.image = this.scaredGhost;
  }
}

function _changeDirection2() {
  this.directionTimer--;
  var newMoveDirection = null;

  if (this.directionTimer == 0) {
    this.directionTimer = this.directionTimerDefault;
    newMoveDirection = Math.floor(Math.random() * Object.keys(_Input.default).length);
  }

  if (newMoveDirection != null && this.movingDirection != newMoveDirection) {
    if (Number.isInteger(this.x / this.tileSize) && Number.isInteger(this.y / this.tileSize)) {
      if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, newMoveDirection)) {
        this.movingDirection = newMoveDirection;
      }
    }
  }
}

function _move2() {
  if (!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.movingDirection)) {
    switch (this.movingDirection) {
      case _Input.default.up:
        this.y -= this.speed;
        break;

      case _Input.default.down:
        this.y += this.speed;
        break;

      case _Input.default.left:
        this.x -= this.speed;
        break;

      case _Input.default.right:
        this.x += this.speed;
        break;
    }
  }
}

function _random2(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _loadImages2() {
  this.normalGhost = new Image();
  this.normalGhost.src = "/images/ghost1.png";
  this.scaredGhost = new Image();
  this.scaredGhost.src = "/images/scaredGhost.png";
  this.scaredGhost2 = new Image();
  this.scaredGhost2.src = "/images/scaredGhost2.png";
  this.image = this.normalGhost;
}
},{"./Input.js":"js/Input.js"}],"js/TileMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pacman = _interopRequireDefault(require("./Pacman.js"));

var _Ghost = _interopRequireDefault(require("./Ghost.js"));

var _Input = _interopRequireDefault(require("./Input.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _drawDot = /*#__PURE__*/new WeakSet();

var _drawPowerDot = /*#__PURE__*/new WeakSet();

var _drawWall = /*#__PURE__*/new WeakSet();

var _drawBlank = /*#__PURE__*/new WeakSet();

var _dotsLeft = /*#__PURE__*/new WeakSet();

var TileMap = /*#__PURE__*/function () {
  function TileMap(tileSize) {
    _classCallCheck(this, TileMap);

    _classPrivateMethodInitSpec(this, _dotsLeft);

    _classPrivateMethodInitSpec(this, _drawBlank);

    _classPrivateMethodInitSpec(this, _drawWall);

    _classPrivateMethodInitSpec(this, _drawPowerDot);

    _classPrivateMethodInitSpec(this, _drawDot);

    _defineProperty(this, "gameMap", [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 5, 1], [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1], [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1], [1, 0, 0, 0, 0, 1, 5, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1], [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1], [1, 2, 2, 1, 0, 1, 0, 0, 0, 0, 0, 3, 0, 1, 0, 1, 2, 2, 1], [1, 1, 1, 1, 0, 1, 0, 1, 1, 2, 1, 1, 0, 1, 0, 1, 1, 1, 1], [1, 4, 0, 0, 0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 1, 0, 1, 0, 1, 1, 2, 1, 1, 0, 1, 0, 1, 1, 1, 1], [1, 2, 2, 1, 0, 1, 0, 3, 0, 0, 0, 0, 0, 1, 0, 1, 2, 2, 1], [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1], [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1], [1, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 5, 0, 1], [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1], [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1], [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]);

    this.tileSize = tileSize;
    this.yellowDot = new Image();
    this.yellowDot.src = "/images/yellowDot.png"; // this.yellowDot.src = "https://i.ibb.co/vsqT0FR/bonbon.gif";

    this.pinkDot = new Image();
    this.pinkDot.src = "/images/pinkDot.png";
    this.wall = new Image();
    this.wall.src = "/images/wall.png";
    this.powerDot = this.pinkDot;
    this.powerDotAnmationTimerDefault = 30;
    this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;
  } // Legend:>> 0 - dots; 1 - wall; 2 - empty space; 3 - ghost; 4 - pacman; 5 - power pellet


  _createClass(TileMap, [{
    key: "draw",
    value: function draw(ctx) {
      for (var row = 0; row < this.gameMap.length; row++) {
        for (var column = 0; column < this.gameMap[row].length; column++) {
          var tile = this.gameMap[row][column];

          if (tile === 0) {
            _classPrivateMethodGet(this, _drawDot, _drawDot2).call(this, ctx, column, row, this.tileSize);
          } else if (tile === 1) {
            _classPrivateMethodGet(this, _drawWall, _drawWall2).call(this, ctx, column, row, this.tileSize);
          } else if (tile == 2) {
            _classPrivateMethodGet(this, _drawBlank, _drawBlank2).call(this, ctx, column, row, this.tileSize);
          } else {
            _classPrivateMethodGet(this, _drawPowerDot, _drawPowerDot2).call(this, ctx, column, row, this.tileSize);
          }
        }
      }
    }
  }, {
    key: "getPacman",
    value: function getPacman(speed) {
      for (var row = 0; row < this.gameMap.length; row++) {
        for (var column = 0; column < this.gameMap[row].length; column++) {
          var tile = this.gameMap[row][column];

          if (tile === 4) {
            // 4 --> pacman
            this.gameMap[row][column] = 0;
            return new _Pacman.default(column * this.tileSize, row * this.tileSize, this.tileSize, speed, this);
          }
        }
      }
    }
  }, {
    key: "getGhosts",
    value: function getGhosts(speed) {
      var ghosts = [];

      for (var row = 0; row < this.gameMap.length; row++) {
        for (var column = 0; column < this.gameMap[row].length; column++) {
          var tile = this.gameMap[row][column];

          if (tile == 3) {
            this.gameMap[row][column] = 0;
            ghosts.push(new _Ghost.default(column * this.tileSize, row * this.tileSize, this.tileSize, speed, this));
          }
        }
      }

      return ghosts;
    }
  }, {
    key: "setCanvasSize",
    value: function setCanvasSize(canvas) {
      canvas.width = this.gameMap[0].length * this.tileSize;
      canvas.height = this.gameMap.length * this.tileSize;
    }
  }, {
    key: "didCollideWithEnvironment",
    value: function didCollideWithEnvironment(x, y, direction) {
      if (direction == null) {
        return;
      }

      if (Number.isInteger(x / this.tileSize) && Number.isInteger(y / this.tileSize)) {
        var column = 0;
        var row = 0;
        var nextColumn = 0;
        var nextRow = 0;

        switch (direction) {
          case _Input.default.right:
            nextColumn = x + this.tileSize;
            column = nextColumn / this.tileSize;
            row = y / this.tileSize;
            break;

          case _Input.default.left:
            nextColumn = x - this.tileSize;
            column = nextColumn / this.tileSize;
            row = y / this.tileSize;
            break;

          case _Input.default.up:
            nextRow = y - this.tileSize;
            row = nextRow / this.tileSize;
            column = x / this.tileSize;
            break;

          case _Input.default.down:
            nextRow = y + this.tileSize;
            row = nextRow / this.tileSize;
            column = x / this.tileSize;
            break;
        }

        var tile = this.gameMap[row][column];

        if (tile === 1) {
          // if 1, we're colliding with a wall
          return true;
        }
      }

      return false;
    }
  }, {
    key: "didWin",
    value: function didWin() {
      return _classPrivateMethodGet(this, _dotsLeft, _dotsLeft2).call(this) === 0;
    }
  }, {
    key: "eatDot",
    value: function eatDot(x, y) {
      var row = y / this.tileSize;
      var column = x / this.tileSize;

      if (Number.isInteger(row) && Number.isInteger(column)) {
        if (this.gameMap[row][column] === 0) {
          this.gameMap[row][column] = 2;
          return true;
        }
      }

      return false;
    }
  }, {
    key: "eatPowerDot",
    value: function eatPowerDot(x, y) {
      var row = y / this.tileSize;
      var column = x / this.tileSize;

      if (Number.isInteger(row) && Number.isInteger(column)) {
        var tile = this.gameMap[row][column];

        if (tile === 5) {
          this.gameMap[row][column] = 2;
          return true;
        }
      }

      return false;
    }
  }]);

  return TileMap;
}();

exports.default = TileMap;

function _drawDot2(ctx, column, row, size) {
  ctx.drawImage(this.yellowDot, column * this.tileSize, row * this.tileSize, size, size);
}

function _drawPowerDot2(ctx, column, row, size) {
  this.powerDotAnmationTimer--;

  if (this.powerDotAnmationTimer === 0) {
    this.powerDotAnmationTimer = this.powerDotAnmationTimerDefault;

    if (this.powerDot == this.pinkDot) {
      this.powerDot = this.yellowDot;
    } else {
      this.powerDot = this.pinkDot;
    }
  }

  ctx.drawImage(this.powerDot, column * size, row * size, size, size);
}

function _drawWall2(ctx, column, row, size) {
  ctx.drawImage(this.wall, column * this.tileSize, row * this.tileSize, size, size);
}

function _drawBlank2(ctx, column, row, size) {
  ctx.fillStyle = "black";
  ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
}

function _dotsLeft2() {
  return this.gameMap.flat().filter(function (tile) {
    return tile === 0;
  }).length;
}
},{"./Pacman.js":"js/Pacman.js","./Ghost.js":"js/Ghost.js","./Input.js":"js/Input.js"}],"js/Game.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audioManager = audioManager;

var _TileMap = _interopRequireDefault(require("./TileMap.js"));

var _Sound = _interopRequireDefault(require("./Sound.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById("game-canvas"),
    ctx = canvas.getContext("2d"),
    GAME_OVER = document.getElementById("game-over"),
    YOU_WON = document.getElementById("you-won"),
    YOU_LOSE = document.getElementById("you-lose"),
    restart = document.getElementById("restart"),
    soundElement = document.getElementById("sound"),
    tileSize = 32,
    speed = 2,
    tileMap = new _TileMap.default(tileSize),
    pacman = tileMap.getPacman(speed),
    ghosts = tileMap.getGhosts(speed);
var gameOver = false,
    gameWin = false;

function gameLoop() {
  tileMap.draw(ctx);
  drawGameEnd();
  pacman.draw(ctx, pause(), ghosts);
  ghosts.forEach(function (ghost) {
    return ghost.draw(ctx, pause(), pacman);
  });
  checkGameOver();
  checkGameWin();
}

function checkGameWin() {
  if (!gameWin) {
    gameWin = tileMap.didWin();

    if (gameWin) {
      _Sound.default.gameWinSound.play();
    }
  }
}

function checkGameOver() {
  if (!gameOver) {
    gameOver = isGameOver();

    if (gameOver) {
      _Sound.default.gameOverSound.play();
    }
  }
}

function isGameOver() {
  return ghosts.some(function (ghost) {
    return !pacman.powerDotActive && ghost.collideWith(pacman);
  });
}

function pause() {
  return !pacman.madeFirstMove || gameOver || gameWin;
}

function drawGameEnd() {
  if (gameOver || gameWin) {
    showYouWon();
    drawHighScore();

    if (gameOver) {
      showYouLose();
      drawHighScore();
    }
  }
}

tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
soundElement.addEventListener("click", audioManager);

function audioManager() {
  var imgSrc = soundElement.getAttribute("src");
  var SOUND_IMG = imgSrc === "images/volume-on.png" ? "images/volume-mute.png" : "images/volume-on.png";
  soundElement.setAttribute("src", SOUND_IMG);
  _Sound.default.gameWinSound.muted = _Sound.default.gameWinSound.muted ? false : true;
  _Sound.default.gameOverSound.muted = _Sound.default.gameOverSound.muted ? false : true;
  _Sound.default.eatDotSound.muted = _Sound.default.eatDotSound.muted ? false : true;
  _Sound.default.powerDotSound.muted = _Sound.default.powerDotSound.muted ? false : true;
  _Sound.default.eatGhostSound.muted = _Sound.default.eatGhostSound.muted ? false : true;
}

restart.addEventListener("click", function () {
  location.reload();
});

function showYouWon() {
  GAME_OVER.style.display = "block";
  YOU_WON.style.display = "block";
}

function showYouLose() {
  GAME_OVER.style.display = "block";
  YOU_LOSE.style.display = "block";
}

function drawHighScore() {
  var highScore = JSON.parse(localStorage.getItem("High Score"));
  var gradient = ctx.createLinearGradient(0, 0, canvas.width / 2, 26);
  gradient.addColorStop("0", "yellow");
  gradient.addColorStop("1", "#f7ae15");
  ctx.fillStyle = gradient;
  ctx.textAlign = "center";
  ctx.font = "bold 35px 'Fun Games', sans-serif";
  ctx.fillText("HIGHEST SCORE : " + highScore, canvas.width / 2, 26);
}
},{"./TileMap.js":"js/TileMap.js","./Sound.js":"js/Sound.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1104" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/Game.js"], null)
//# sourceMappingURL=/Game.65f11b52.js.map