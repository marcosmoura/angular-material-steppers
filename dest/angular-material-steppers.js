/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _mdSteppers = __webpack_require__(1);
	
	var _mdSteppers2 = _interopRequireDefault(_mdSteppers);
	
	var _mdStepper = __webpack_require__(4);
	
	var _mdStepper2 = _interopRequireDefault(_mdStepper);
	
	var _mdSteppersScope = __webpack_require__(7);
	
	var _mdSteppersScope2 = _interopRequireDefault(_mdSteppersScope);
	
	var _service = __webpack_require__(9);
	
	var _service2 = _interopRequireDefault(_service);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(function (angular) {
	
	  angular.module('ngMaterialSteppers', ['ngAnimate', 'ngMaterial']).directive(_mdSteppers2.default.name, _mdSteppers2.default.directive).directive(_mdStepper2.default.name, _mdStepper2.default.directive).directive(_mdSteppersScope2.default.name, _mdSteppersScope2.default.directive).factory(_service2.default.name, _service2.default.service);
	})(angular);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _controller = __webpack_require__(2);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	var _template = __webpack_require__(3);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var component = 'mdSteppers';
	
	var directive = function directive($mdComponentRegistry, $log) {
	
	  'ngInject';
	
	  return {
	    restrict: 'E',
	    scope: {
	      card: '=?mdCard',
	      linear: '=?mdLinear',
	      alternative: '=?mdAlternative'
	    },
	    template: _template2.default,
	    link: function link($scope, $element, $attributes, $controller) {
	
	      if (!$attributes.id) {
	        $log.warn('You must set an id attribute to your stepper');
	      }
	
	      var registeredStepper = $mdComponentRegistry.register({
	        changeStep: $controller.changeStep,
	        isActive: $controller.isActive,
	        getCurrentStep: $controller.getCurrentStep,
	        setError: $controller.setError,
	        clearError: $controller.clearError
	      }, $attributes.id);
	
	      $scope.$on('$destroy', function () {
	        registeredStepper();
	      });
	    },
	    controller: _controller2.default,
	    controllerAs: '$' + component,
	    bindToController: true
	  };
	};
	
	exports.default = {
	  name: component,
	  directive: directive
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($scope, $document, $element, $animateCss, $mdUtil) {
	
	  'ngInject';
	
	  var _this = this;
	
	  this.steps = [];
	  this.stepActive = 0;
	  this.stepsErrors = [];
	
	  this.addStep = function (step) {
	    _this.steps.push(step);
	  };
	
	  this.isActive = function (stepNumber) {
	    if (stepNumber === _this.stepActive) {
	      return true;
	    }
	
	    return false;
	  };
	
	  this.isCompleted = function (stepNumber) {
	    if (_this.linear && stepNumber < _this.stepActive) {
	      return true;
	    }
	
	    return false;
	  };
	
	  this.enableEditMode = function (stepNumber, hasEditing) {
	    if (hasEditing && _this.linear && stepNumber < _this.stepActive) {
	      return true;
	    }
	
	    return false;
	  };
	
	  this.hasInkRipple = function (stepNumber) {
	    if (_this.linear || stepNumber === _this.stepActive) {
	      return false;
	    }
	
	    return true;
	  };
	
	  this.setActive = function (stepNumber) {
	    var $steppersContent = angular.element($document[0].querySelector('.md-steppers-content'));
	    var $stepper = angular.element($document[0].querySelectorAll('.md-stepper')[stepNumber]);
	
	    _this.stepActive = stepNumber;
	
	    if (_this.stepsErrors[stepNumber]) {
	      _this.stepsErrors[stepNumber].hasError = false;
	    }
	
	    $animateCss($steppersContent, {
	      from: { height: $steppersContent[0].clientHeight + 'px' },
	      to: { height: $stepper.prop('clientHeight') + 'px' },
	      easing: 'cubic-bezier(.35, 0, .25, 1)',
	      duration: 0.4
	    }).start().done(function () {
	      $steppersContent.css({
	        transition: 'none',
	        height: ''
	      });
	
	      $mdUtil.nextTick(function () {
	        $steppersContent.css('transition', '');
	      });
	    });
	  };
	
	  this.changeStep = function (stepNumber) {
	    _this.setActive(stepNumber);
	  };
	
	  this.getCurrentStep = function () {
	    return _this.stepActive;
	  };
	
	  this.clickAction = function (stepNumber, editing) {
	    if (_this.enableEditMode(stepNumber, editing)) {
	      _this.setActive(stepNumber);
	
	      return true;
	    }
	
	    if (!_this.linear && !_this.isActive(stepNumber)) {
	      _this.changeStep(stepNumber);
	    }
	  };
	
	  this.setError = function (stepNumber, message) {
	    _this.stepsErrors[stepNumber] = {};
	
	    var step = _this.stepsErrors[stepNumber];
	
	    step.hasError = true;
	    step.message = message;
	  };
	
	  this.clearError = function (stepNumber) {
	    if (_this.stepsErrors[stepNumber]) {
	      _this.stepsErrors[stepNumber].hasError = false;
	    }
	  };
	
	  this.hasError = function (stepNumber) {
	    var step = _this.stepsErrors[stepNumber];
	
	    return step && step.hasError;
	  };
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($element, $attributes) {
	
	  var $steppersContent = '\n    <button\n      type="button"\n      class="md-stepper-indicator"\n      ng-repeat="(stepNumber, $step) in $mdSteppers.steps track by $index"\n      ng-class="{\n        \'md-active\': $mdSteppers.isActive(stepNumber),\n        \'md-completed\': $mdSteppers.isCompleted(stepNumber),\n        \'md-error\': $mdSteppers.hasError(stepNumber),\n        \'md-editable\': $step.editable && $mdSteppers.enableEditMode(stepNumber, $step.editable),\n        \'md-stepper-optional\': $step.optional || $mdSteppers.hasError(stepNumber)\n      }"\n      ng-click="$mdSteppers.clickAction(stepNumber, $step.editable)"\n      md-ink-ripple="{{ $mdSteppers.hasInkRipple(stepNumber) || $mdSteppers.enableEditMode(stepNumber, $step.editable) }}">\n      <div class="md-stepper-indicator-wrapper">\n        <div class="md-stepper-number" ng-hide="$mdSteppers.hasError(stepNumber)">\n          <span ng-if="!$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber, $step.editable)">{{ ::stepNumber+1 }}</span>\n          <md-icon class="md-stepper-icon md-stepper-icon-edit" ng-if="$step.editable" ng-show="$mdSteppers.enableEditMode(stepNumber, $step.editable)">edit</md-icon>\n          <md-icon class="md-stepper-icon" ng-if="$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber, $step.editable)">check</md-icon>\n        </div>\n\n        <div class="md-stepper-error-indicator" ng-show="$mdSteppers.hasError(stepNumber)">\n          <md-icon>warning</md-icon>\n        </div>\n\n        <div class="md-stepper-title">\n          <span>{{ $step.label }}</span>\n          <small ng-if="$step.optional && !$mdSteppers.hasError(stepNumber)">{{ $step.optional }}</small>\n          <small class="md-stepper-error-message" ng-show="$mdSteppers.hasError(stepNumber)">{{ $mdSteppers.stepsErrors[stepNumber].message }}</small>\n        </div>\n      </div>\n    </button>\n  ';
	  var $steppersHeader = '<md-steppers-header class="md-steppers-header">' + $steppersContent + '</md-steppers-header>';
	  var $steppersActions = $element.find('md-steppers-actions').detach().html();
	
	  if ($attributes.hasOwnProperty('mdCard')) {
	    $steppersHeader = '<md-card class="md-steppers-header">' + $steppersContent + '</md-card>';
	  }
	
	  return '\n    <div class="md-steppers" ng-class="{ \'md-steppers-linear\': $mdSteppers.linear, \'md-steppers-alternative\': $mdSteppers.alternative }">\n      ' + $steppersHeader + '\n      <md-steppers-content class="md-steppers-content">' + $element.html() + '</md-steppers-content>\n      <md-steppers-actions md-steppers-scope class="md-steppers-actions">' + $steppersActions + '</md-steppers-actions>\n    </div>\n  ';
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _link = __webpack_require__(5);
	
	var _link2 = _interopRequireDefault(_link);
	
	var _template = __webpack_require__(6);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var component = 'mdStepper';
	
	var directive = function directive() {
	
	  'ngInject';
	
	  return {
	    restrict: 'E',
	    require: '^mdSteppers',
	    link: _link2.default,
	    template: _template2.default
	  };
	};
	
	exports.default = {
	  name: component,
	  directive: directive
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($scope, $element, $attributes, $controller) {
	
	  $scope.$mdStepper = {};
	
	  $controller.addStep({
	    label: $attributes.hasOwnProperty('mdLabel') && $attributes.mdLabel,
	    editable: $attributes.hasOwnProperty('mdEditable') && !!$attributes.mdEditable,
	    optional: $attributes.hasOwnProperty('mdOptional') && $attributes.mdOptional
	  });
	
	  $controller.setActive(0);
	
	  $scope.$mdStepper.isActive = function (index) {
	    return $controller.isActive(index);
	  };
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($element) {
	
	  var $stepperParent = $element.parent();
	  var stepperIndex = Array.prototype.indexOf.call($stepperParent[0].children, $element[0]);
	
	  return "\n    <div class=\"md-stepper\" ng-class=\"{ 'md-active': $mdStepper.isActive(" + stepperIndex + ") }\">\n      <md-steppers-scope>" + $element.html() + "</md-steppers-scope>\n    </div>\n  ";
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _compile = __webpack_require__(8);
	
	var _compile2 = _interopRequireDefault(_compile);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var component = 'mdSteppersScope';
	
	var directive = function directive() {
	
	  'ngInject';
	
	  return {
	    restrict: 'AE',
	    compile: _compile2.default,
	    terminal: true,
	    transclude: 'element'
	  };
	};
	
	exports.default = {
	  name: component,
	  directive: directive
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($topElement, $topAttributes, $transclude) {
	
	  return function postLink($scope, $element) {
	
	    var $controller = $scope;
	    var newScope = $controller.$parent.$new();
	
	    newScope.$index = $scope.$index;
	
	    $scope.$watch('$index', function (value) {
	      newScope.$index = value;
	    });
	
	    var scopeDigesting = false;
	    var newScopeDigesting = false;
	
	    $scope.$watch(function () {
	      if (newScopeDigesting || scopeDigesting) {
	        return;
	      }
	
	      scopeDigesting = true;
	      $scope.$$postDigest(function () {
	        if (!newScopeDigesting) {
	          newScope.$digest();
	        }
	
	        scopeDigesting = newScopeDigesting = false;
	      });
	    });
	
	    newScope.$watch(function () {
	      newScopeDigesting = true;
	    });
	
	    $transclude(newScope, function (clone) {
	      $element.after(clone);
	    });
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var service = function service($mdComponentRegistry) {
	
	  'ngInject';
	
	  return function (handle) {
	    var instance = $mdComponentRegistry.get(handle);
	
	    if (!instance) {
	      $mdComponentRegistry.notFoundError(handle);
	    }
	
	    return instance;
	  };
	};
	
	exports.default = {
	  name: '$mdSteppers',
	  service: service
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjRjYjUyNTA3MDM3MDAzNDVlMGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVycy90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXIvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2NvbXBpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxFQUFDLFVBQUMsT0FBRCxFQUFhOztBQUVaLFdBQ0csTUFESCxDQUNVLG9CQURWLEVBQ2dDLENBQzVCLFdBRDRCLEVBRTVCLFlBRjRCLENBRGhDLEVBS0csU0FMSCxDQUthLHFCQUFXLElBQVgsRUFB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QXpDOztBQUlBLHdCQUFpQixJQUFqQixDQUxrQjtBQU1sQixjQUFPLFlBQVAsQ0FBb0IsWUFBTTtBQUN4QixhQUFJLENBQUMsaUJBQUQsRUFBb0I7QUFDdEIsb0JBQVMsT0FBVCxHQURzQjtVQUF4Qjs7QUFJQSwwQkFBaUIsb0JBQW9CLEtBQXBCLENBTE87UUFBTixDQUFwQixDQU5rQjtNQUFOLENBQWQsQ0FkeUM7O0FBNkJ6QyxjQUFTLE1BQVQsQ0FBZ0IsWUFBTTtBQUNwQiwyQkFBb0IsSUFBcEIsQ0FEb0I7TUFBTixDQUFoQixDQTdCeUM7O0FBaUN6QyxpQkFBWSxRQUFaLEVBQXNCLFVBQUMsS0FBRCxFQUFXO0FBQy9CLGdCQUFTLEtBQVQsQ0FBZSxLQUFmLEVBRCtCO01BQVgsQ0FBdEIsQ0FqQ3lDO0lBQXBDLENBRnlEO0VBQW5ELEM7Ozs7Ozs7Ozs7O0FDQWYsS0FBSSxVQUFVLFNBQVYsT0FBVSxDQUFDLG9CQUFELEVBQTBCOztBQUV0QyxjQUZzQzs7QUFJdEMsVUFBTyxVQUFTLE1BQVQsRUFBaUI7QUFDdEIsU0FBSSxXQUFXLHFCQUFxQixHQUFyQixDQUF5QixNQUF6QixDQUFYLENBRGtCOztBQUd0QixTQUFJLENBQUMsUUFBRCxFQUFXO0FBQ2IsNEJBQXFCLGFBQXJCLENBQW1DLE1BQW5DLEVBRGE7TUFBZjs7QUFJQSxZQUFPLFFBQVAsQ0FQc0I7SUFBakIsQ0FKK0I7RUFBMUI7O21CQWdCQztBQUNiLFNBQU0sYUFBTjtBQUNBLG1CQUZhIiwiZmlsZSI6ImFuZ3VsYXItbWF0ZXJpYWwtc3RlcHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDI0Y2I1MjUwNzAzNzAwMzQ1ZTBmXG4gKiovIiwiaW1wb3J0IG1kU3RlcHBlcnMgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXJzJztcbmltcG9ydCBtZFN0ZXBwZXIgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXInO1xuaW1wb3J0IG1kU3RlcHBlcnNTY29wZSBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUnO1xuaW1wb3J0IG1kU3RlcHBlclNlcnZpY2UgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXJzL3NlcnZpY2UuanMnO1xuXG4oKGFuZ3VsYXIpID0+IHtcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnbmdNYXRlcmlhbFN0ZXBwZXJzJywgW1xuICAgICAgJ25nQW5pbWF0ZScsXG4gICAgICAnbmdNYXRlcmlhbCdcbiAgICBdKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVycy5uYW1lLCBtZFN0ZXBwZXJzLmRpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKG1kU3RlcHBlci5uYW1lLCBtZFN0ZXBwZXIuZGlyZWN0aXZlKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVyc1Njb3BlLm5hbWUsIG1kU3RlcHBlcnNTY29wZS5kaXJlY3RpdmUpXG4gICAgLmZhY3RvcnkobWRTdGVwcGVyU2VydmljZS5uYW1lLCBtZFN0ZXBwZXJTZXJ2aWNlLnNlcnZpY2UpO1xuXG59KShhbmd1bGFyKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21haW4uanNcbiAqKi8iLCJpbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnO1xuXG5sZXQgY29tcG9uZW50ID0gJ21kU3RlcHBlcnMnO1xuXG5sZXQgZGlyZWN0aXZlID0gKCRtZENvbXBvbmVudFJlZ2lzdHJ5LCAkbG9nKSA9PiB7XG5cbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGNhcmQ6ICc9P21kQ2FyZCcsXG4gICAgICBsaW5lYXI6ICc9P21kTGluZWFyJyxcbiAgICAgIGFsdGVybmF0aXZlOiAnPT9tZEFsdGVybmF0aXZlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGUsXG4gICAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyaWJ1dGVzLCAkY29udHJvbGxlcikgPT4ge1xuXG4gICAgICBpZiAoISRhdHRyaWJ1dGVzLmlkKSB7XG4gICAgICAgICRsb2cud2FybignWW91IG11c3Qgc2V0IGFuIGlkIGF0dHJpYnV0ZSB0byB5b3VyIHN0ZXBwZXInKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlZ2lzdGVyZWRTdGVwcGVyID0gJG1kQ29tcG9uZW50UmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICBjaGFuZ2VTdGVwOiAkY29udHJvbGxlci5jaGFuZ2VTdGVwLFxuICAgICAgICBpc0FjdGl2ZTogJGNvbnRyb2xsZXIuaXNBY3RpdmUsXG4gICAgICAgIGdldEN1cnJlbnRTdGVwOiAkY29udHJvbGxlci5nZXRDdXJyZW50U3RlcCxcbiAgICAgICAgc2V0RXJyb3I6ICRjb250cm9sbGVyLnNldEVycm9yLFxuICAgICAgICBjbGVhckVycm9yOiAkY29udHJvbGxlci5jbGVhckVycm9yXG4gICAgICB9LCAkYXR0cmlidXRlcy5pZCk7XG5cbiAgICAgICRzY29wZS4kb24oJyRkZXN0cm95JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVyZWRTdGVwcGVyKCk7XG4gICAgICB9KTtcblxuICAgIH0sXG4gICAgY29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6IGAkJHtjb21wb25lbnR9YCxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogY29tcG9uZW50LFxuICBkaXJlY3RpdmVcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHNjb3BlLCAkZG9jdW1lbnQsICRlbGVtZW50LCAkYW5pbWF0ZUNzcywgJG1kVXRpbCkge1xuXG4gICduZ0luamVjdCc7XG5cbiAgdGhpcy5zdGVwcyA9IFtdO1xuICB0aGlzLnN0ZXBBY3RpdmUgPSAwO1xuICB0aGlzLnN0ZXBzRXJyb3JzID0gW107XG5cbiAgdGhpcy5hZGRTdGVwID0gKHN0ZXApID0+IHtcbiAgICB0aGlzLnN0ZXBzLnB1c2goc3RlcCk7XG4gIH07XG5cbiAgdGhpcy5pc0FjdGl2ZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHN0ZXBOdW1iZXIgPT09IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHRoaXMuaXNDb21wbGV0ZWQgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGlmICh0aGlzLmxpbmVhciAmJiBzdGVwTnVtYmVyIDwgdGhpcy5zdGVwQWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdGhpcy5lbmFibGVFZGl0TW9kZSA9IChzdGVwTnVtYmVyLCBoYXNFZGl0aW5nKSA9PiB7XG4gICAgaWYgKGhhc0VkaXRpbmcgJiYgKHRoaXMubGluZWFyICYmIHN0ZXBOdW1iZXIgPCB0aGlzLnN0ZXBBY3RpdmUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdGhpcy5oYXNJbmtSaXBwbGUgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGlmICh0aGlzLmxpbmVhciB8fCBzdGVwTnVtYmVyID09PSB0aGlzLnN0ZXBBY3RpdmUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICB0aGlzLnNldEFjdGl2ZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgbGV0ICRzdGVwcGVyc0NvbnRlbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tZC1zdGVwcGVycy1jb250ZW50JykpO1xuICAgIGxldCAkc3RlcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1kLXN0ZXBwZXInKVtzdGVwTnVtYmVyXSk7XG5cbiAgICB0aGlzLnN0ZXBBY3RpdmUgPSBzdGVwTnVtYmVyO1xuXG4gICAgaWYgKHRoaXMuc3RlcHNFcnJvcnNbc3RlcE51bWJlcl0pIHtcbiAgICAgIHRoaXMuc3RlcHNFcnJvcnNbc3RlcE51bWJlcl0uaGFzRXJyb3IgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAkYW5pbWF0ZUNzcygkc3RlcHBlcnNDb250ZW50LCB7XG4gICAgICBmcm9tOiB7IGhlaWdodDogJHN0ZXBwZXJzQ29udGVudFswXS5jbGllbnRIZWlnaHQgKyAncHgnIH0sXG4gICAgICB0bzogeyBoZWlnaHQ6ICRzdGVwcGVyLnByb3AoJ2NsaWVudEhlaWdodCcpICsgJ3B4JyB9LFxuICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKC4zNSwgMCwgLjI1LCAxKScsXG4gICAgICBkdXJhdGlvbjogMC40XG4gICAgfSkuc3RhcnQoKS5kb25lKCgpID0+IHtcbiAgICAgICRzdGVwcGVyc0NvbnRlbnQuY3NzKHtcbiAgICAgICAgdHJhbnNpdGlvbjogJ25vbmUnLFxuICAgICAgICBoZWlnaHQ6ICcnXG4gICAgICB9KTtcblxuICAgICAgJG1kVXRpbC5uZXh0VGljaygoKSA9PiB7XG4gICAgICAgICRzdGVwcGVyc0NvbnRlbnQuY3NzKCd0cmFuc2l0aW9uJywgJycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGhpcy5jaGFuZ2VTdGVwID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICB0aGlzLnNldEFjdGl2ZShzdGVwTnVtYmVyKTtcbiAgfTtcblxuICB0aGlzLmdldEN1cnJlbnRTdGVwID0gKCkgPT4ge1xuICAgIHJldHVybiB0aGlzLnN0ZXBBY3RpdmU7XG4gIH07XG5cbiAgdGhpcy5jbGlja0FjdGlvbiA9IChzdGVwTnVtYmVyLCBlZGl0aW5nKSA9PiB7XG4gICAgaWYgKHRoaXMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlciwgZWRpdGluZykpIHtcbiAgICAgIHRoaXMuc2V0QWN0aXZlKHN0ZXBOdW1iZXIpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubGluZWFyICYmICF0aGlzLmlzQWN0aXZlKHN0ZXBOdW1iZXIpKSB7XG4gICAgICB0aGlzLmNoYW5nZVN0ZXAoc3RlcE51bWJlcik7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuc2V0RXJyb3IgPSAoc3RlcE51bWJlciwgbWVzc2FnZSkgPT4ge1xuICAgIHRoaXMuc3RlcHNFcnJvcnNbc3RlcE51bWJlcl0gPSB7fTtcblxuICAgIGxldCBzdGVwID0gdGhpcy5zdGVwc0Vycm9yc1tzdGVwTnVtYmVyXTtcblxuICAgIHN0ZXAuaGFzRXJyb3IgPSB0cnVlO1xuICAgIHN0ZXAubWVzc2FnZSA9IG1lc3NhZ2U7XG4gIH07XG5cbiAgdGhpcy5jbGVhckVycm9yID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBpZiAodGhpcy5zdGVwc0Vycm9yc1tzdGVwTnVtYmVyXSkge1xuICAgICAgdGhpcy5zdGVwc0Vycm9yc1tzdGVwTnVtYmVyXS5oYXNFcnJvciA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmhhc0Vycm9yID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBsZXQgc3RlcCA9IHRoaXMuc3RlcHNFcnJvcnNbc3RlcE51bWJlcl07XG5cbiAgICByZXR1cm4gc3RlcCAmJiBzdGVwLmhhc0Vycm9yO1xuICB9O1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL2NvbnRyb2xsZXIuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgJGF0dHJpYnV0ZXMpIHtcblxuICBsZXQgJHN0ZXBwZXJzQ29udGVudCA9IGBcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIGNsYXNzPVwibWQtc3RlcHBlci1pbmRpY2F0b3JcIlxuICAgICAgbmctcmVwZWF0PVwiKHN0ZXBOdW1iZXIsICRzdGVwKSBpbiAkbWRTdGVwcGVycy5zdGVwcyB0cmFjayBieSAkaW5kZXhcIlxuICAgICAgbmctY2xhc3M9XCJ7XG4gICAgICAgICdtZC1hY3RpdmUnOiAkbWRTdGVwcGVycy5pc0FjdGl2ZShzdGVwTnVtYmVyKSxcbiAgICAgICAgJ21kLWNvbXBsZXRlZCc6ICRtZFN0ZXBwZXJzLmlzQ29tcGxldGVkKHN0ZXBOdW1iZXIpLFxuICAgICAgICAnbWQtZXJyb3InOiAkbWRTdGVwcGVycy5oYXNFcnJvcihzdGVwTnVtYmVyKSxcbiAgICAgICAgJ21kLWVkaXRhYmxlJzogJHN0ZXAuZWRpdGFibGUgJiYgJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlciwgJHN0ZXAuZWRpdGFibGUpLFxuICAgICAgICAnbWQtc3RlcHBlci1vcHRpb25hbCc6ICRzdGVwLm9wdGlvbmFsIHx8ICRtZFN0ZXBwZXJzLmhhc0Vycm9yKHN0ZXBOdW1iZXIpXG4gICAgICB9XCJcbiAgICAgIG5nLWNsaWNrPVwiJG1kU3RlcHBlcnMuY2xpY2tBY3Rpb24oc3RlcE51bWJlciwgJHN0ZXAuZWRpdGFibGUpXCJcbiAgICAgIG1kLWluay1yaXBwbGU9XCJ7eyAkbWRTdGVwcGVycy5oYXNJbmtSaXBwbGUoc3RlcE51bWJlcikgfHwgJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlciwgJHN0ZXAuZWRpdGFibGUpIH19XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1pbmRpY2F0b3Itd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1udW1iZXJcIiBuZy1oaWRlPVwiJG1kU3RlcHBlcnMuaGFzRXJyb3Ioc3RlcE51bWJlcilcIj5cbiAgICAgICAgICA8c3BhbiBuZy1pZj1cIiEkbWRTdGVwcGVycy5pc0NvbXBsZXRlZChzdGVwTnVtYmVyKSAmJiAhJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlciwgJHN0ZXAuZWRpdGFibGUpXCI+e3sgOjpzdGVwTnVtYmVyKzEgfX08L3NwYW4+XG4gICAgICAgICAgPG1kLWljb24gY2xhc3M9XCJtZC1zdGVwcGVyLWljb24gbWQtc3RlcHBlci1pY29uLWVkaXRcIiBuZy1pZj1cIiRzdGVwLmVkaXRhYmxlXCIgbmctc2hvdz1cIiRtZFN0ZXBwZXJzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIsICRzdGVwLmVkaXRhYmxlKVwiPmVkaXQ8L21kLWljb24+XG4gICAgICAgICAgPG1kLWljb24gY2xhc3M9XCJtZC1zdGVwcGVyLWljb25cIiBuZy1pZj1cIiRtZFN0ZXBwZXJzLmlzQ29tcGxldGVkKHN0ZXBOdW1iZXIpICYmICEkbWRTdGVwcGVycy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyLCAkc3RlcC5lZGl0YWJsZSlcIj5jaGVjazwvbWQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXItZXJyb3ItaW5kaWNhdG9yXCIgbmctc2hvdz1cIiRtZFN0ZXBwZXJzLmhhc0Vycm9yKHN0ZXBOdW1iZXIpXCI+XG4gICAgICAgICAgPG1kLWljb24+d2FybmluZzwvbWQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXItdGl0bGVcIj5cbiAgICAgICAgICA8c3Bhbj57eyAkc3RlcC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICA8c21hbGwgbmctaWY9XCIkc3RlcC5vcHRpb25hbCAmJiAhJG1kU3RlcHBlcnMuaGFzRXJyb3Ioc3RlcE51bWJlcilcIj57eyAkc3RlcC5vcHRpb25hbCB9fTwvc21hbGw+XG4gICAgICAgICAgPHNtYWxsIGNsYXNzPVwibWQtc3RlcHBlci1lcnJvci1tZXNzYWdlXCIgbmctc2hvdz1cIiRtZFN0ZXBwZXJzLmhhc0Vycm9yKHN0ZXBOdW1iZXIpXCI+e3sgJG1kU3RlcHBlcnMuc3RlcHNFcnJvcnNbc3RlcE51bWJlcl0ubWVzc2FnZSB9fTwvc21hbGw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9idXR0b24+XG4gIGA7XG4gIGxldCAkc3RlcHBlcnNIZWFkZXIgPSBgPG1kLXN0ZXBwZXJzLWhlYWRlciBjbGFzcz1cIm1kLXN0ZXBwZXJzLWhlYWRlclwiPiR7JHN0ZXBwZXJzQ29udGVudH08L21kLXN0ZXBwZXJzLWhlYWRlcj5gO1xuICBsZXQgJHN0ZXBwZXJzQWN0aW9ucyA9ICRlbGVtZW50LmZpbmQoJ21kLXN0ZXBwZXJzLWFjdGlvbnMnKS5kZXRhY2goKS5odG1sKCk7XG5cbiAgaWYgKCRhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdtZENhcmQnKSkge1xuICAgICRzdGVwcGVyc0hlYWRlciA9IGA8bWQtY2FyZCBjbGFzcz1cIm1kLXN0ZXBwZXJzLWhlYWRlclwiPiR7JHN0ZXBwZXJzQ29udGVudH08L21kLWNhcmQ+YDtcbiAgfVxuXG4gIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXJzXCIgbmctY2xhc3M9XCJ7ICdtZC1zdGVwcGVycy1saW5lYXInOiAkbWRTdGVwcGVycy5saW5lYXIsICdtZC1zdGVwcGVycy1hbHRlcm5hdGl2ZSc6ICRtZFN0ZXBwZXJzLmFsdGVybmF0aXZlIH1cIj5cbiAgICAgICR7JHN0ZXBwZXJzSGVhZGVyfVxuICAgICAgPG1kLXN0ZXBwZXJzLWNvbnRlbnQgY2xhc3M9XCJtZC1zdGVwcGVycy1jb250ZW50XCI+JHskZWxlbWVudC5odG1sKCl9PC9tZC1zdGVwcGVycy1jb250ZW50PlxuICAgICAgPG1kLXN0ZXBwZXJzLWFjdGlvbnMgbWQtc3RlcHBlcnMtc2NvcGUgY2xhc3M9XCJtZC1zdGVwcGVycy1hY3Rpb25zXCI+JHskc3RlcHBlcnNBY3Rpb25zfTwvbWQtc3RlcHBlcnMtYWN0aW9ucz5cbiAgICA8L2Rpdj5cbiAgYDtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVycy90ZW1wbGF0ZS5qc1xuICoqLyIsImltcG9ydCBsaW5rIGZyb20gJy4vbGluayc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVyJztcblxubGV0IGRpcmVjdGl2ZSA9ICgpID0+IHtcblxuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICByZXF1aXJlOiAnXm1kU3RlcHBlcnMnLFxuICAgIGxpbmssXG4gICAgdGVtcGxhdGVcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBjb21wb25lbnQsXG4gIGRpcmVjdGl2ZVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlci9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyaWJ1dGVzLCAkY29udHJvbGxlcikge1xuXG4gICRzY29wZS4kbWRTdGVwcGVyID0ge307XG5cbiAgJGNvbnRyb2xsZXIuYWRkU3RlcCh7XG4gICAgbGFiZWw6ICRhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdtZExhYmVsJykgJiYgJGF0dHJpYnV0ZXMubWRMYWJlbCxcbiAgICBlZGl0YWJsZTogJGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ21kRWRpdGFibGUnKSAmJiAhISRhdHRyaWJ1dGVzLm1kRWRpdGFibGUsXG4gICAgb3B0aW9uYWw6ICRhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdtZE9wdGlvbmFsJykgJiYgJGF0dHJpYnV0ZXMubWRPcHRpb25hbFxuICB9KTtcblxuICAkY29udHJvbGxlci5zZXRBY3RpdmUoMCk7XG5cbiAgJHNjb3BlLiRtZFN0ZXBwZXIuaXNBY3RpdmUgPSAoaW5kZXgpID0+IHtcbiAgICByZXR1cm4gJGNvbnRyb2xsZXIuaXNBY3RpdmUoaW5kZXgpO1xuICB9O1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXIvbGluay5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG5cbiAgbGV0ICRzdGVwcGVyUGFyZW50ID0gJGVsZW1lbnQucGFyZW50KCk7XG4gIGxldCBzdGVwcGVySW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKCRzdGVwcGVyUGFyZW50WzBdLmNoaWxkcmVuLCAkZWxlbWVudFswXSk7XG5cbiAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlclwiIG5nLWNsYXNzPVwieyAnbWQtYWN0aXZlJzogJG1kU3RlcHBlci5pc0FjdGl2ZSgke3N0ZXBwZXJJbmRleH0pIH1cIj5cbiAgICAgIDxtZC1zdGVwcGVycy1zY29wZT4keyRlbGVtZW50Lmh0bWwoKX08L21kLXN0ZXBwZXJzLXNjb3BlPlxuICAgIDwvZGl2PlxuICBgO1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXIvdGVtcGxhdGUuanNcbiAqKi8iLCJpbXBvcnQgY29tcGlsZSBmcm9tICcuL2NvbXBpbGUnO1xuXG5sZXQgY29tcG9uZW50ID0gJ21kU3RlcHBlcnNTY29wZSc7XG5cbmxldCBkaXJlY3RpdmUgPSAoKSA9PiB7XG5cbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIGNvbXBpbGU6IGNvbXBpbGUsXG4gICAgdGVybWluYWw6IHRydWUsXG4gICAgdHJhbnNjbHVkZTogJ2VsZW1lbnQnXG4gIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogY29tcG9uZW50LFxuICBkaXJlY3RpdmVcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHRvcEVsZW1lbnQsICR0b3BBdHRyaWJ1dGVzLCAkdHJhbnNjbHVkZSkge1xuXG4gIHJldHVybiBmdW5jdGlvbiBwb3N0TGluaygkc2NvcGUsICRlbGVtZW50KSB7XG5cbiAgICBsZXQgJGNvbnRyb2xsZXIgPSAkc2NvcGU7XG4gICAgbGV0IG5ld1Njb3BlID0gJGNvbnRyb2xsZXIuJHBhcmVudC4kbmV3KCk7XG5cbiAgICBuZXdTY29wZS4kaW5kZXggPSAkc2NvcGUuJGluZGV4O1xuXG4gICAgJHNjb3BlLiR3YXRjaCgnJGluZGV4JywgKHZhbHVlKSA9PiB7XG4gICAgICBuZXdTY29wZS4kaW5kZXggPSB2YWx1ZTtcbiAgICB9KTtcblxuICAgIGxldCBzY29wZURpZ2VzdGluZyA9IGZhbHNlO1xuICAgIGxldCBuZXdTY29wZURpZ2VzdGluZyA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLiR3YXRjaCgoKSA9PiB7XG4gICAgICBpZiAobmV3U2NvcGVEaWdlc3RpbmcgfHwgc2NvcGVEaWdlc3RpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzY29wZURpZ2VzdGluZyA9IHRydWU7XG4gICAgICAkc2NvcGUuJCRwb3N0RGlnZXN0KCgpID0+IHtcbiAgICAgICAgaWYgKCFuZXdTY29wZURpZ2VzdGluZykge1xuICAgICAgICAgIG5ld1Njb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlRGlnZXN0aW5nID0gbmV3U2NvcGVEaWdlc3RpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbmV3U2NvcGUuJHdhdGNoKCgpID0+IHtcbiAgICAgIG5ld1Njb3BlRGlnZXN0aW5nID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgICR0cmFuc2NsdWRlKG5ld1Njb3BlLCAoY2xvbmUpID0+IHtcbiAgICAgICRlbGVtZW50LmFmdGVyKGNsb25lKTtcbiAgICB9KTtcblxuICB9O1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2NvbXBpbGUuanNcbiAqKi8iLCJsZXQgc2VydmljZSA9ICgkbWRDb21wb25lbnRSZWdpc3RyeSkgPT4ge1xuXG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgIGxldCBpbnN0YW5jZSA9ICRtZENvbXBvbmVudFJlZ2lzdHJ5LmdldChoYW5kbGUpO1xuXG4gICAgaWYgKCFpbnN0YW5jZSkge1xuICAgICAgJG1kQ29tcG9uZW50UmVnaXN0cnkubm90Rm91bmRFcnJvcihoYW5kbGUpO1xuICAgIH1cblxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnJG1kU3RlcHBlcnMnLFxuICBzZXJ2aWNlXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVycy9zZXJ2aWNlLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==