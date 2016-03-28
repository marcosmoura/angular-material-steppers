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
	
	      $mdComponentRegistry.register({
	        changeStep: $controller.changeStep,
	        setCompleted: $controller.setCompleted,
	        isActive: $controller.isActive,
	        currentStep: $controller.stepActive
	      }, $attributes.id);
	    },
	    controller: _controller2.default,
	    controllerAs: '$' + component,
	    bindToController: true
	  };
	};
	directive.$inject = ["$mdComponentRegistry", "$log"];
	
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
	
	exports.default = ["$scope", "$document", "$element", "$animateCss", "$mdUtil", function ($scope, $document, $element, $animateCss, $mdUtil) {
	
	  'ngInject';
	
	  var _this = this;
	
	  this.steps = [];
	  this.stepActive = 0;
	
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
	
	  this.enableEditMode = function (stepNumber) {
	    if (_this.linear && stepNumber < _this.stepActive) {
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
	
	  this.setCompleted = function (stepNumber) {
	    console.log('Completed', stepNumber);
	  };
	
	  this.changeStep = function (stepNumber) {
	    _this.setActive(stepNumber);
	  };
	
	  this.clickAction = function (stepNumber) {
	    if (this.enableEditMode(stepNumber)) {
	      this.setActive(stepNumber);
	
	      return true;
	    }
	
	    if (!this.linear && !this.isActive(stepNumber)) {
	      this.changeStep(stepNumber);
	    }
	  };
	}];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function ($element, $attributes) {
	
	  var $steppersContent = '\n    <button\n      class="md-stepper-indicator"\n      ng-repeat="(stepNumber, $step) in $mdSteppers.steps track by $index"\n      ng-class="{\n        \'md-active\': $mdSteppers.isActive(stepNumber),\n        \'md-completed\': $mdSteppers.isCompleted(stepNumber),\n        \'md-editable\': $step.editable && $mdSteppers.enableEditMode(stepNumber),\n        \'md-stepper-optional\': $step.optional\n      }"\n      ng-click="$mdSteppers.clickAction(stepNumber)"\n      md-ink-ripple="{{ $mdSteppers.hasInkRipple(stepNumber) || $mdSteppers.enableEditMode(stepNumber) }}">\n      <div class="md-stepper-indicator-wrapper">\n        <div class="md-stepper-number">\n          <span ng-if="!$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber)">{{ ::stepNumber+1 }}</span>\n          <md-icon class="md-stepper-icon md-stepper-icon-edit" ng-if="$step.editable" ng-show="$mdSteppers.enableEditMode(stepNumber)">edit</md-icon>\n          <md-icon class="md-stepper-icon" ng-if="$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber)">check</md-icon>\n        </div>\n\n        <div class="md-stepper-title">\n          <span>{{ $step.label }}</span>\n          <small ng-if="$step.optional">{{ $step.optional }}</small>\n        </div>\n      </div>\n    </button>\n  ';
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
	service.$inject = ["$mdComponentRegistry"];
	
	exports.default = {
	  name: '$mdSteppers',
	  service: service
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzIyZGUwMmY5YTVjNjkzZTg2ZDgiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVycy90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXIvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2NvbXBpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFBQTs7QUFJQSxLQUFJLGVBQWUsdUJBQXVCOztBQUgxQzs7QUFPQSxLQUFJLGNBQWMsdUJBQXVCOztBQU56Qzs7QUFVQSxLQUFJLG9CQUFvQix1QkFBdUI7O0FBVC9DOztBQWFBLEtBQUksWUFBWSx1QkFBdUI7O0FBRXZDLFVBQVMsdUJBQXVCLEtBQUssRUFB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Qjs7OztLQUl6QyxTQUFTLE9BQU8sWUFBTTtPQUNwQixvQkFBb0I7OztLQUd0QixZQUFZLFVBQVUsVUFBQyxPQUFVO09BQy9CLFNBQVMsTUFBTTs7Ozs7Ozs7O0FDcENyQjs7QUFFQSxRQUFPLGVBQWUsU0FBUyxjQUFjO0dBQzNDLE9BQU87O0FBSFQsS0FBSSxVQUFVLFNBQVYsUUFBVyxzQkFBeUI7O0dBRXRDOztHQUVBLE9BQU8sVUFBUyxRQUFRO0tBQ3RCLElBQUksV0FBVyxxQkFBcUIsSUFBSTs7S0FFeEMsSUFBSSxDQUFDLFVBQVU7T0FDYixxQkFBcUIsY0FBYzs7O0tBR3JDLE9BQU87Ozs7O0FBU1gsU0FBUSxVQUpPO0dBQ2IsTUFBTTtHQUNOIiwiZmlsZSI6ImFuZ3VsYXItbWF0ZXJpYWwtc3RlcHBlcnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGMyMmRlMDJmOWE1YzY5M2U4NmQ4XG4gKiovIiwiaW1wb3J0IG1kU3RlcHBlcnMgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXJzJztcbmltcG9ydCBtZFN0ZXBwZXIgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXInO1xuaW1wb3J0IG1kU3RlcHBlcnNTY29wZSBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUnO1xuaW1wb3J0IG1kU3RlcHBlclNlcnZpY2UgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXJzL3NlcnZpY2UuanMnO1xuXG4oKGFuZ3VsYXIpID0+IHtcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnbmdNYXRlcmlhbFN0ZXBwZXJzJywgW1xuICAgICAgJ25nQW5pbWF0ZScsXG4gICAgICAnbmdNYXRlcmlhbCdcbiAgICBdKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVycy5uYW1lLCBtZFN0ZXBwZXJzLmRpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKG1kU3RlcHBlci5uYW1lLCBtZFN0ZXBwZXIuZGlyZWN0aXZlKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVyc1Njb3BlLm5hbWUsIG1kU3RlcHBlcnNTY29wZS5kaXJlY3RpdmUpXG4gICAgLmZhY3RvcnkobWRTdGVwcGVyU2VydmljZS5uYW1lLCBtZFN0ZXBwZXJTZXJ2aWNlLnNlcnZpY2UpO1xuXG59KShhbmd1bGFyKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL21haW4uanNcbiAqKi8iLCJpbXBvcnQgY29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXInO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnO1xuXG5sZXQgY29tcG9uZW50ID0gJ21kU3RlcHBlcnMnO1xuXG5sZXQgZGlyZWN0aXZlID0gKCRtZENvbXBvbmVudFJlZ2lzdHJ5LCAkbG9nKSA9PiB7XG5cbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGNhcmQ6ICc9P21kQ2FyZCcsXG4gICAgICBsaW5lYXI6ICc9P21kTGluZWFyJyxcbiAgICAgIGFsdGVybmF0aXZlOiAnPT9tZEFsdGVybmF0aXZlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGUsXG4gICAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyaWJ1dGVzLCAkY29udHJvbGxlcikgPT4ge1xuXG4gICAgICBpZiAoISRhdHRyaWJ1dGVzLmlkKSB7XG4gICAgICAgICRsb2cud2FybignWW91IG11c3Qgc2V0IGFuIGlkIGF0dHJpYnV0ZSB0byB5b3VyIHN0ZXBwZXInKTtcbiAgICAgIH1cblxuICAgICAgJG1kQ29tcG9uZW50UmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICBjaGFuZ2VTdGVwOiAkY29udHJvbGxlci5jaGFuZ2VTdGVwLFxuICAgICAgICBzZXRDb21wbGV0ZWQ6ICRjb250cm9sbGVyLnNldENvbXBsZXRlZCxcbiAgICAgICAgaXNBY3RpdmU6ICRjb250cm9sbGVyLmlzQWN0aXZlLFxuICAgICAgICBjdXJyZW50U3RlcDogJGNvbnRyb2xsZXIuc3RlcEFjdGl2ZVxuICAgICAgfSwgJGF0dHJpYnV0ZXMuaWQpO1xuXG4gICAgfSxcbiAgICBjb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogYCQke2NvbXBvbmVudH1gLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBjb21wb25lbnQsXG4gIGRpcmVjdGl2ZVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkc2NvcGUsICRkb2N1bWVudCwgJGVsZW1lbnQsICRhbmltYXRlQ3NzLCAkbWRVdGlsKSB7XG5cbiAgJ25nSW5qZWN0JztcblxuICB0aGlzLnN0ZXBzID0gW107XG4gIHRoaXMuc3RlcEFjdGl2ZSA9IDA7XG5cbiAgdGhpcy5hZGRTdGVwID0gKHN0ZXApID0+IHtcbiAgICB0aGlzLnN0ZXBzLnB1c2goc3RlcCk7XG4gIH07XG5cbiAgdGhpcy5pc0FjdGl2ZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHN0ZXBOdW1iZXIgPT09IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHRoaXMuaXNDb21wbGV0ZWQgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGlmICh0aGlzLmxpbmVhciAmJiBzdGVwTnVtYmVyIDwgdGhpcy5zdGVwQWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdGhpcy5lbmFibGVFZGl0TW9kZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHRoaXMubGluZWFyICYmIHN0ZXBOdW1iZXIgPCB0aGlzLnN0ZXBBY3RpdmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB0aGlzLmhhc0lua1JpcHBsZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHRoaXMubGluZWFyIHx8IHN0ZXBOdW1iZXIgPT09IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHRoaXMuc2V0QWN0aXZlID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBsZXQgJHN0ZXBwZXJzQ29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1kLXN0ZXBwZXJzLWNvbnRlbnQnKSk7XG4gICAgbGV0ICRzdGVwcGVyID0gYW5ndWxhci5lbGVtZW50KCRkb2N1bWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKCcubWQtc3RlcHBlcicpW3N0ZXBOdW1iZXJdKTtcblxuICAgIHRoaXMuc3RlcEFjdGl2ZSA9IHN0ZXBOdW1iZXI7XG5cbiAgICAkYW5pbWF0ZUNzcygkc3RlcHBlcnNDb250ZW50LCB7XG4gICAgICBmcm9tOiB7IGhlaWdodDogJHN0ZXBwZXJzQ29udGVudFswXS5jbGllbnRIZWlnaHQgKyAncHgnIH0sXG4gICAgICB0bzogeyBoZWlnaHQ6ICRzdGVwcGVyLnByb3AoJ2NsaWVudEhlaWdodCcpICsgJ3B4JyB9LFxuICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKC4zNSwgMCwgLjI1LCAxKScsXG4gICAgICBkdXJhdGlvbjogMC40XG4gICAgfSkuc3RhcnQoKS5kb25lKCgpID0+IHtcbiAgICAgICRzdGVwcGVyc0NvbnRlbnQuY3NzKHtcbiAgICAgICAgdHJhbnNpdGlvbjogJ25vbmUnLFxuICAgICAgICBoZWlnaHQ6ICcnXG4gICAgICB9KTtcblxuICAgICAgJG1kVXRpbC5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0ZXBwZXJzQ29udGVudC5jc3MoJ3RyYW5zaXRpb24nLCAnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICB0aGlzLnNldENvbXBsZXRlZCA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0NvbXBsZXRlZCcsIHN0ZXBOdW1iZXIpO1xuICB9O1xuXG4gIHRoaXMuY2hhbmdlU3RlcCA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zZXRBY3RpdmUoc3RlcE51bWJlcik7XG4gIH07XG5cbiAgdGhpcy5jbGlja0FjdGlvbiA9IGZ1bmN0aW9uKHN0ZXBOdW1iZXIpIHtcbiAgICBpZiAodGhpcy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyKSkge1xuICAgICAgdGhpcy5zZXRBY3RpdmUoc3RlcE51bWJlcik7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5saW5lYXIgJiYgIXRoaXMuaXNBY3RpdmUoc3RlcE51bWJlcikpIHtcbiAgICAgIHRoaXMuY2hhbmdlU3RlcChzdGVwTnVtYmVyKTtcbiAgICB9XG4gIH07XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvY29udHJvbGxlci5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50LCAkYXR0cmlidXRlcykge1xuXG4gIGxldCAkc3RlcHBlcnNDb250ZW50ID0gYFxuICAgIDxidXR0b25cbiAgICAgIGNsYXNzPVwibWQtc3RlcHBlci1pbmRpY2F0b3JcIlxuICAgICAgbmctcmVwZWF0PVwiKHN0ZXBOdW1iZXIsICRzdGVwKSBpbiAkbWRTdGVwcGVycy5zdGVwcyB0cmFjayBieSAkaW5kZXhcIlxuICAgICAgbmctY2xhc3M9XCJ7XG4gICAgICAgICdtZC1hY3RpdmUnOiAkbWRTdGVwcGVycy5pc0FjdGl2ZShzdGVwTnVtYmVyKSxcbiAgICAgICAgJ21kLWNvbXBsZXRlZCc6ICRtZFN0ZXBwZXJzLmlzQ29tcGxldGVkKHN0ZXBOdW1iZXIpLFxuICAgICAgICAnbWQtZWRpdGFibGUnOiAkc3RlcC5lZGl0YWJsZSAmJiAkbWRTdGVwcGVycy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyKSxcbiAgICAgICAgJ21kLXN0ZXBwZXItb3B0aW9uYWwnOiAkc3RlcC5vcHRpb25hbFxuICAgICAgfVwiXG4gICAgICBuZy1jbGljaz1cIiRtZFN0ZXBwZXJzLmNsaWNrQWN0aW9uKHN0ZXBOdW1iZXIpXCJcbiAgICAgIG1kLWluay1yaXBwbGU9XCJ7eyAkbWRTdGVwcGVycy5oYXNJbmtSaXBwbGUoc3RlcE51bWJlcikgfHwgJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlcikgfX1cIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZC1zdGVwcGVyLWluZGljYXRvci13cmFwcGVyXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZC1zdGVwcGVyLW51bWJlclwiPlxuICAgICAgICAgIDxzcGFuIG5nLWlmPVwiISRtZFN0ZXBwZXJzLmlzQ29tcGxldGVkKHN0ZXBOdW1iZXIpICYmICEkbWRTdGVwcGVycy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyKVwiPnt7IDo6c3RlcE51bWJlcisxIH19PC9zcGFuPlxuICAgICAgICAgIDxtZC1pY29uIGNsYXNzPVwibWQtc3RlcHBlci1pY29uIG1kLXN0ZXBwZXItaWNvbi1lZGl0XCIgbmctaWY9XCIkc3RlcC5lZGl0YWJsZVwiIG5nLXNob3c9XCIkbWRTdGVwcGVycy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyKVwiPmVkaXQ8L21kLWljb24+XG4gICAgICAgICAgPG1kLWljb24gY2xhc3M9XCJtZC1zdGVwcGVyLWljb25cIiBuZy1pZj1cIiRtZFN0ZXBwZXJzLmlzQ29tcGxldGVkKHN0ZXBOdW1iZXIpICYmICEkbWRTdGVwcGVycy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyKVwiPmNoZWNrPC9tZC1pY29uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci10aXRsZVwiPlxuICAgICAgICAgIDxzcGFuPnt7ICRzdGVwLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzbWFsbCBuZy1pZj1cIiRzdGVwLm9wdGlvbmFsXCI+e3sgJHN0ZXAub3B0aW9uYWwgfX08L3NtYWxsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuICBgO1xuICBsZXQgJHN0ZXBwZXJzSGVhZGVyID0gYDxtZC1zdGVwcGVycy1oZWFkZXIgY2xhc3M9XCJtZC1zdGVwcGVycy1oZWFkZXJcIj4keyRzdGVwcGVyc0NvbnRlbnR9PC9tZC1zdGVwcGVycy1oZWFkZXI+YDtcbiAgbGV0ICRzdGVwcGVyc0FjdGlvbnMgPSAkZWxlbWVudC5maW5kKCdtZC1zdGVwcGVycy1hY3Rpb25zJykuZGV0YWNoKCkuaHRtbCgpO1xuXG4gIGlmICgkYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnbWRDYXJkJykpIHtcbiAgICAkc3RlcHBlcnNIZWFkZXIgPSBgPG1kLWNhcmQgY2xhc3M9XCJtZC1zdGVwcGVycy1oZWFkZXJcIj4keyRzdGVwcGVyc0NvbnRlbnR9PC9tZC1jYXJkPmA7XG4gIH1cblxuICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJtZC1zdGVwcGVyc1wiIG5nLWNsYXNzPVwieyAnbWQtc3RlcHBlcnMtbGluZWFyJzogJG1kU3RlcHBlcnMubGluZWFyLCAnbWQtc3RlcHBlcnMtYWx0ZXJuYXRpdmUnOiAkbWRTdGVwcGVycy5hbHRlcm5hdGl2ZSB9XCI+XG4gICAgICAkeyRzdGVwcGVyc0hlYWRlcn1cbiAgICAgIDxtZC1zdGVwcGVycy1jb250ZW50IGNsYXNzPVwibWQtc3RlcHBlcnMtY29udGVudFwiPiR7JGVsZW1lbnQuaHRtbCgpfTwvbWQtc3RlcHBlcnMtY29udGVudD5cbiAgICAgIDxtZC1zdGVwcGVycy1hY3Rpb25zIG1kLXN0ZXBwZXJzLXNjb3BlIGNsYXNzPVwibWQtc3RlcHBlcnMtYWN0aW9uc1wiPiR7JHN0ZXBwZXJzQWN0aW9uc308L21kLXN0ZXBwZXJzLWFjdGlvbnM+XG4gICAgPC9kaXY+XG4gIGA7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvdGVtcGxhdGUuanNcbiAqKi8iLCJpbXBvcnQgbGluayBmcm9tICcuL2xpbmsnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnO1xuXG5sZXQgY29tcG9uZW50ID0gJ21kU3RlcHBlcic7XG5cbmxldCBkaXJlY3RpdmUgPSAoKSA9PiB7XG5cbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVxdWlyZTogJ15tZFN0ZXBwZXJzJyxcbiAgICBsaW5rLFxuICAgIHRlbXBsYXRlXG4gIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogY29tcG9uZW50LFxuICBkaXJlY3RpdmVcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXIvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkc2NvcGUsICRlbGVtZW50LCAkYXR0cmlidXRlcywgJGNvbnRyb2xsZXIpIHtcblxuICAkc2NvcGUuJG1kU3RlcHBlciA9IHt9O1xuXG4gICRjb250cm9sbGVyLmFkZFN0ZXAoe1xuICAgIGxhYmVsOiAkYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnbWRMYWJlbCcpICYmICRhdHRyaWJ1dGVzLm1kTGFiZWwsXG4gICAgZWRpdGFibGU6ICRhdHRyaWJ1dGVzLmhhc093blByb3BlcnR5KCdtZEVkaXRhYmxlJykgJiYgISEkYXR0cmlidXRlcy5tZEVkaXRhYmxlLFxuICAgIG9wdGlvbmFsOiAkYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnbWRPcHRpb25hbCcpICYmICRhdHRyaWJ1dGVzLm1kT3B0aW9uYWxcbiAgfSk7XG5cbiAgJGNvbnRyb2xsZXIuc2V0QWN0aXZlKDApO1xuXG4gICRzY29wZS4kbWRTdGVwcGVyLmlzQWN0aXZlID0gKGluZGV4KSA9PiB7XG4gICAgcmV0dXJuICRjb250cm9sbGVyLmlzQWN0aXZlKGluZGV4KTtcbiAgfTtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2xpbmsuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCkge1xuXG4gIGxldCAkc3RlcHBlclBhcmVudCA9ICRlbGVtZW50LnBhcmVudCgpO1xuICBsZXQgc3RlcHBlckluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbCgkc3RlcHBlclBhcmVudFswXS5jaGlsZHJlbiwgJGVsZW1lbnRbMF0pO1xuXG4gIHJldHVybiBgXG4gICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXJcIiBuZy1jbGFzcz1cInsgJ21kLWFjdGl2ZSc6ICRtZFN0ZXBwZXIuaXNBY3RpdmUoJHtzdGVwcGVySW5kZXh9KSB9XCI+XG4gICAgICA8bWQtc3RlcHBlcnMtc2NvcGU+JHskZWxlbWVudC5odG1sKCl9PC9tZC1zdGVwcGVycy1zY29wZT5cbiAgICA8L2Rpdj5cbiAgYDtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL3RlbXBsYXRlLmpzXG4gKiovIiwiaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi9jb21waWxlJztcblxubGV0IGNvbXBvbmVudCA9ICdtZFN0ZXBwZXJzU2NvcGUnO1xuXG5sZXQgZGlyZWN0aXZlID0gKCkgPT4ge1xuXG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0FFJyxcbiAgICBjb21waWxlOiBjb21waWxlLFxuICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgIHRyYW5zY2x1ZGU6ICdlbGVtZW50J1xuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IGNvbXBvbmVudCxcbiAgZGlyZWN0aXZlXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVycy1zY29wZS9pbmRleC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR0b3BFbGVtZW50LCAkdG9wQXR0cmlidXRlcywgJHRyYW5zY2x1ZGUpIHtcblxuICByZXR1cm4gZnVuY3Rpb24gcG9zdExpbmsoJHNjb3BlLCAkZWxlbWVudCkge1xuXG4gICAgbGV0ICRjb250cm9sbGVyID0gJHNjb3BlO1xuICAgIGxldCBuZXdTY29wZSA9ICRjb250cm9sbGVyLiRwYXJlbnQuJG5ldygpO1xuXG4gICAgbmV3U2NvcGUuJGluZGV4ID0gJHNjb3BlLiRpbmRleDtcblxuICAgICRzY29wZS4kd2F0Y2goJyRpbmRleCcsICh2YWx1ZSkgPT4ge1xuICAgICAgbmV3U2NvcGUuJGluZGV4ID0gdmFsdWU7XG4gICAgfSk7XG5cbiAgICBsZXQgc2NvcGVEaWdlc3RpbmcgPSBmYWxzZTtcbiAgICBsZXQgbmV3U2NvcGVEaWdlc3RpbmcgPSBmYWxzZTtcblxuICAgICRzY29wZS4kd2F0Y2goKCkgPT4ge1xuICAgICAgaWYgKG5ld1Njb3BlRGlnZXN0aW5nIHx8IHNjb3BlRGlnZXN0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2NvcGVEaWdlc3RpbmcgPSB0cnVlO1xuICAgICAgJHNjb3BlLiQkcG9zdERpZ2VzdCgoKSA9PiB7XG4gICAgICAgIGlmICghbmV3U2NvcGVEaWdlc3RpbmcpIHtcbiAgICAgICAgICBuZXdTY29wZS4kZGlnZXN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzY29wZURpZ2VzdGluZyA9IG5ld1Njb3BlRGlnZXN0aW5nID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIG5ld1Njb3BlLiR3YXRjaCgoKSA9PiB7XG4gICAgICBuZXdTY29wZURpZ2VzdGluZyA9IHRydWU7XG4gICAgfSk7XG5cbiAgICAkdHJhbnNjbHVkZShuZXdTY29wZSwgKGNsb25lKSA9PiB7XG4gICAgICAkZWxlbWVudC5hZnRlcihjbG9uZSk7XG4gICAgfSk7XG5cbiAgfTtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVycy1zY29wZS9jb21waWxlLmpzXG4gKiovIiwibGV0IHNlcnZpY2UgPSAoJG1kQ29tcG9uZW50UmVnaXN0cnkpID0+IHtcblxuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBsZXQgaW5zdGFuY2UgPSAkbWRDb21wb25lbnRSZWdpc3RyeS5nZXQoaGFuZGxlKTtcblxuICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICRtZENvbXBvbmVudFJlZ2lzdHJ5Lm5vdEZvdW5kRXJyb3IoaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogJyRtZFN0ZXBwZXJzJyxcbiAgc2VydmljZVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=