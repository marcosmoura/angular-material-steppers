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
	        getCurrentStep: $controller.getCurrentStep
	      }, $attributes.id);
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
	
	  this.getCurrentStep = function () {
	    return _this.stepActive;
	  };
	
	  this.clickAction = function (stepNumber, editing) {
	    if (this.enableEditMode(stepNumber, editing)) {
	      this.setActive(stepNumber);
	
	      return true;
	    }
	
	    if (!this.linear && !this.isActive(stepNumber)) {
	      this.changeStep(stepNumber);
	    }
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
	
	  var $steppersContent = '\n    <button\n      class="md-stepper-indicator"\n      ng-repeat="(stepNumber, $step) in $mdSteppers.steps track by $index"\n      ng-class="{\n        \'md-active\': $mdSteppers.isActive(stepNumber),\n        \'md-completed\': $mdSteppers.isCompleted(stepNumber),\n        \'md-editable\': $step.editable && $mdSteppers.enableEditMode(stepNumber, $step.editable),\n        \'md-stepper-optional\': $step.optional\n      }"\n      ng-click="$mdSteppers.clickAction(stepNumber)"\n      md-ink-ripple="{{ $mdSteppers.hasInkRipple(stepNumber) || $mdSteppers.enableEditMode(stepNumber, $step.editable) }}">\n      <div class="md-stepper-indicator-wrapper">\n        <div class="md-stepper-number">\n          <span ng-if="!$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber, $step.editable)">{{ ::stepNumber+1 }}</span>\n          <md-icon class="md-stepper-icon md-stepper-icon-edit" ng-if="$step.editable" ng-show="$mdSteppers.enableEditMode(stepNumber, $step.editable)">edit</md-icon>\n          <md-icon class="md-stepper-icon" ng-if="$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber, $step.editable)">check</md-icon>\n        </div>\n\n        <div class="md-stepper-title">\n          <span>{{ $step.label }}</span>\n          <small ng-if="$step.optional">{{ $step.optional }}</small>\n        </div>\n      </div>\n    </button>\n  ';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTgwOWYyM2VhN2VhMzJkNjdlODQiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVycy90ZW1wbGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXIvbGluay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL3RlbXBsYXRlLmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2NvbXBpbGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxFQUFDLFVBQUMsT0FBRCxFQUFhOztBQUVaLFdBQ0csTUFESCxDQUNVLG9CQURWLEVBQ2dDLENBQzVCLFdBRDRCLEVBRTVCLFlBRjRCLENBRGhDLEVBS0csU0FMSCxDQUthLHFCQUFXLElBQVgsRUFB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cmlhbC1zdGVwcGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZTgwOWYyM2VhN2VhMzJkNjdlODRcbiAqKi8iLCJpbXBvcnQgbWRTdGVwcGVycyBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMnO1xuaW1wb3J0IG1kU3RlcHBlciBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcic7XG5pbXBvcnQgbWRTdGVwcGVyc1Njb3BlIGZyb20gJy4vc2NyaXB0cy9tZC1zdGVwcGVycy1zY29wZSc7XG5pbXBvcnQgbWRTdGVwcGVyU2VydmljZSBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qcyc7XG5cbigoYW5ndWxhcikgPT4ge1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCduZ01hdGVyaWFsU3RlcHBlcnMnLCBbXG4gICAgICAnbmdBbmltYXRlJyxcbiAgICAgICduZ01hdGVyaWFsJ1xuICAgIF0pXG4gICAgLmRpcmVjdGl2ZShtZFN0ZXBwZXJzLm5hbWUsIG1kU3RlcHBlcnMuZGlyZWN0aXZlKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVyLm5hbWUsIG1kU3RlcHBlci5kaXJlY3RpdmUpXG4gICAgLmRpcmVjdGl2ZShtZFN0ZXBwZXJzU2NvcGUubmFtZSwgbWRTdGVwcGVyc1Njb3BlLmRpcmVjdGl2ZSlcbiAgICAuZmFjdG9yeShtZFN0ZXBwZXJTZXJ2aWNlLm5hbWUsIG1kU3RlcHBlclNlcnZpY2Uuc2VydmljZSk7XG5cbn0pKGFuZ3VsYXIpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbWFpbi5qc1xuICoqLyIsImltcG9ydCBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVycyc7XG5cbmxldCBkaXJlY3RpdmUgPSAoJG1kQ29tcG9uZW50UmVnaXN0cnksICRsb2cpID0+IHtcblxuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgY2FyZDogJz0/bWRDYXJkJyxcbiAgICAgIGxpbmVhcjogJz0/bWRMaW5lYXInLFxuICAgICAgYWx0ZXJuYXRpdmU6ICc9P21kQWx0ZXJuYXRpdmUnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZSxcbiAgICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJpYnV0ZXMsICRjb250cm9sbGVyKSA9PiB7XG5cbiAgICAgIGlmICghJGF0dHJpYnV0ZXMuaWQpIHtcbiAgICAgICAgJGxvZy53YXJuKCdZb3UgbXVzdCBzZXQgYW4gaWQgYXR0cmlidXRlIHRvIHlvdXIgc3RlcHBlcicpO1xuICAgICAgfVxuXG4gICAgICAkbWRDb21wb25lbnRSZWdpc3RyeS5yZWdpc3Rlcih7XG4gICAgICAgIGNoYW5nZVN0ZXA6ICRjb250cm9sbGVyLmNoYW5nZVN0ZXAsXG4gICAgICAgIHNldENvbXBsZXRlZDogJGNvbnRyb2xsZXIuc2V0Q29tcGxldGVkLFxuICAgICAgICBpc0FjdGl2ZTogJGNvbnRyb2xsZXIuaXNBY3RpdmUsXG4gICAgICAgIGdldEN1cnJlbnRTdGVwOiAkY29udHJvbGxlci5nZXRDdXJyZW50U3RlcFxuICAgICAgfSwgJGF0dHJpYnV0ZXMuaWQpO1xuXG4gICAgfSxcbiAgICBjb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogYCQke2NvbXBvbmVudH1gLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBjb21wb25lbnQsXG4gIGRpcmVjdGl2ZVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkc2NvcGUsICRkb2N1bWVudCwgJGVsZW1lbnQsICRhbmltYXRlQ3NzLCAkbWRVdGlsKSB7XG5cbiAgJ25nSW5qZWN0JztcblxuICB0aGlzLnN0ZXBzID0gW107XG4gIHRoaXMuc3RlcEFjdGl2ZSA9IDA7XG5cbiAgdGhpcy5hZGRTdGVwID0gKHN0ZXApID0+IHtcbiAgICB0aGlzLnN0ZXBzLnB1c2goc3RlcCk7XG4gIH07XG5cbiAgdGhpcy5pc0FjdGl2ZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHN0ZXBOdW1iZXIgPT09IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHRoaXMuaXNDb21wbGV0ZWQgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGlmICh0aGlzLmxpbmVhciAmJiBzdGVwTnVtYmVyIDwgdGhpcy5zdGVwQWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdGhpcy5lbmFibGVFZGl0TW9kZSA9IChzdGVwTnVtYmVyLCBoYXNFZGl0aW5nKSA9PiB7XG4gICAgaWYgKGhhc0VkaXRpbmcgJiYgKHRoaXMubGluZWFyICYmIHN0ZXBOdW1iZXIgPCB0aGlzLnN0ZXBBY3RpdmUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdGhpcy5oYXNJbmtSaXBwbGUgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGlmICh0aGlzLmxpbmVhciB8fCBzdGVwTnVtYmVyID09PSB0aGlzLnN0ZXBBY3RpdmUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICB0aGlzLnNldEFjdGl2ZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgbGV0ICRzdGVwcGVyc0NvbnRlbnQgPSBhbmd1bGFyLmVsZW1lbnQoJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5tZC1zdGVwcGVycy1jb250ZW50JykpO1xuICAgIGxldCAkc3RlcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvckFsbCgnLm1kLXN0ZXBwZXInKVtzdGVwTnVtYmVyXSk7XG5cbiAgICB0aGlzLnN0ZXBBY3RpdmUgPSBzdGVwTnVtYmVyO1xuXG4gICAgJGFuaW1hdGVDc3MoJHN0ZXBwZXJzQ29udGVudCwge1xuICAgICAgZnJvbTogeyBoZWlnaHQ6ICRzdGVwcGVyc0NvbnRlbnRbMF0uY2xpZW50SGVpZ2h0ICsgJ3B4JyB9LFxuICAgICAgdG86IHsgaGVpZ2h0OiAkc3RlcHBlci5wcm9wKCdjbGllbnRIZWlnaHQnKSArICdweCcgfSxcbiAgICAgIGVhc2luZzogJ2N1YmljLWJlemllciguMzUsIDAsIC4yNSwgMSknLFxuICAgICAgZHVyYXRpb246IDAuNFxuICAgIH0pLnN0YXJ0KCkuZG9uZSgoKSA9PiB7XG4gICAgICAkc3RlcHBlcnNDb250ZW50LmNzcyh7XG4gICAgICAgIHRyYW5zaXRpb246ICdub25lJyxcbiAgICAgICAgaGVpZ2h0OiAnJ1xuICAgICAgfSk7XG5cbiAgICAgICRtZFV0aWwubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICRzdGVwcGVyc0NvbnRlbnQuY3NzKCd0cmFuc2l0aW9uJywgJycpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH07XG5cbiAgdGhpcy5zZXRDb21wbGV0ZWQgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdDb21wbGV0ZWQnLCBzdGVwTnVtYmVyKTtcbiAgfTtcblxuICB0aGlzLmNoYW5nZVN0ZXAgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIHRoaXMuc2V0QWN0aXZlKHN0ZXBOdW1iZXIpO1xuICB9O1xuXG4gIHRoaXMuZ2V0Q3VycmVudFN0ZXAgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcEFjdGl2ZTtcbiAgfTtcblxuICB0aGlzLmNsaWNrQWN0aW9uID0gZnVuY3Rpb24oc3RlcE51bWJlciwgZWRpdGluZykge1xuICAgIGlmICh0aGlzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIsIGVkaXRpbmcpKSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZShzdGVwTnVtYmVyKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmxpbmVhciAmJiAhdGhpcy5pc0FjdGl2ZShzdGVwTnVtYmVyKSkge1xuICAgICAgdGhpcy5jaGFuZ2VTdGVwKHN0ZXBOdW1iZXIpO1xuICAgIH1cbiAgfTtcblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVycy9jb250cm9sbGVyLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsICRhdHRyaWJ1dGVzKSB7XG5cbiAgbGV0ICRzdGVwcGVyc0NvbnRlbnQgPSBgXG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3M9XCJtZC1zdGVwcGVyLWluZGljYXRvclwiXG4gICAgICBuZy1yZXBlYXQ9XCIoc3RlcE51bWJlciwgJHN0ZXApIGluICRtZFN0ZXBwZXJzLnN0ZXBzIHRyYWNrIGJ5ICRpbmRleFwiXG4gICAgICBuZy1jbGFzcz1cIntcbiAgICAgICAgJ21kLWFjdGl2ZSc6ICRtZFN0ZXBwZXJzLmlzQWN0aXZlKHN0ZXBOdW1iZXIpLFxuICAgICAgICAnbWQtY29tcGxldGVkJzogJG1kU3RlcHBlcnMuaXNDb21wbGV0ZWQoc3RlcE51bWJlciksXG4gICAgICAgICdtZC1lZGl0YWJsZSc6ICRzdGVwLmVkaXRhYmxlICYmICRtZFN0ZXBwZXJzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIsICRzdGVwLmVkaXRhYmxlKSxcbiAgICAgICAgJ21kLXN0ZXBwZXItb3B0aW9uYWwnOiAkc3RlcC5vcHRpb25hbFxuICAgICAgfVwiXG4gICAgICBuZy1jbGljaz1cIiRtZFN0ZXBwZXJzLmNsaWNrQWN0aW9uKHN0ZXBOdW1iZXIpXCJcbiAgICAgIG1kLWluay1yaXBwbGU9XCJ7eyAkbWRTdGVwcGVycy5oYXNJbmtSaXBwbGUoc3RlcE51bWJlcikgfHwgJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlciwgJHN0ZXAuZWRpdGFibGUpIH19XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1pbmRpY2F0b3Itd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1udW1iZXJcIj5cbiAgICAgICAgICA8c3BhbiBuZy1pZj1cIiEkbWRTdGVwcGVycy5pc0NvbXBsZXRlZChzdGVwTnVtYmVyKSAmJiAhJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlciwgJHN0ZXAuZWRpdGFibGUpXCI+e3sgOjpzdGVwTnVtYmVyKzEgfX08L3NwYW4+XG4gICAgICAgICAgPG1kLWljb24gY2xhc3M9XCJtZC1zdGVwcGVyLWljb24gbWQtc3RlcHBlci1pY29uLWVkaXRcIiBuZy1pZj1cIiRzdGVwLmVkaXRhYmxlXCIgbmctc2hvdz1cIiRtZFN0ZXBwZXJzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIsICRzdGVwLmVkaXRhYmxlKVwiPmVkaXQ8L21kLWljb24+XG4gICAgICAgICAgPG1kLWljb24gY2xhc3M9XCJtZC1zdGVwcGVyLWljb25cIiBuZy1pZj1cIiRtZFN0ZXBwZXJzLmlzQ29tcGxldGVkKHN0ZXBOdW1iZXIpICYmICEkbWRTdGVwcGVycy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyLCAkc3RlcC5lZGl0YWJsZSlcIj5jaGVjazwvbWQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXItdGl0bGVcIj5cbiAgICAgICAgICA8c3Bhbj57eyAkc3RlcC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICA8c21hbGwgbmctaWY9XCIkc3RlcC5vcHRpb25hbFwiPnt7ICRzdGVwLm9wdGlvbmFsIH19PC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgYDtcbiAgbGV0ICRzdGVwcGVyc0hlYWRlciA9IGA8bWQtc3RlcHBlcnMtaGVhZGVyIGNsYXNzPVwibWQtc3RlcHBlcnMtaGVhZGVyXCI+JHskc3RlcHBlcnNDb250ZW50fTwvbWQtc3RlcHBlcnMtaGVhZGVyPmA7XG4gIGxldCAkc3RlcHBlcnNBY3Rpb25zID0gJGVsZW1lbnQuZmluZCgnbWQtc3RlcHBlcnMtYWN0aW9ucycpLmRldGFjaCgpLmh0bWwoKTtcblxuICBpZiAoJGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ21kQ2FyZCcpKSB7XG4gICAgJHN0ZXBwZXJzSGVhZGVyID0gYDxtZC1jYXJkIGNsYXNzPVwibWQtc3RlcHBlcnMtaGVhZGVyXCI+JHskc3RlcHBlcnNDb250ZW50fTwvbWQtY2FyZD5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlcnNcIiBuZy1jbGFzcz1cInsgJ21kLXN0ZXBwZXJzLWxpbmVhcic6ICRtZFN0ZXBwZXJzLmxpbmVhciwgJ21kLXN0ZXBwZXJzLWFsdGVybmF0aXZlJzogJG1kU3RlcHBlcnMuYWx0ZXJuYXRpdmUgfVwiPlxuICAgICAgJHskc3RlcHBlcnNIZWFkZXJ9XG4gICAgICA8bWQtc3RlcHBlcnMtY29udGVudCBjbGFzcz1cIm1kLXN0ZXBwZXJzLWNvbnRlbnRcIj4keyRlbGVtZW50Lmh0bWwoKX08L21kLXN0ZXBwZXJzLWNvbnRlbnQ+XG4gICAgICA8bWQtc3RlcHBlcnMtYWN0aW9ucyBtZC1zdGVwcGVycy1zY29wZSBjbGFzcz1cIm1kLXN0ZXBwZXJzLWFjdGlvbnNcIj4keyRzdGVwcGVyc0FjdGlvbnN9PC9tZC1zdGVwcGVycy1hY3Rpb25zPlxuICAgIDwvZGl2PlxuICBgO1xuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL3RlbXBsYXRlLmpzXG4gKiovIiwiaW1wb3J0IGxpbmsgZnJvbSAnLi9saW5rJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJztcblxubGV0IGNvbXBvbmVudCA9ICdtZFN0ZXBwZXInO1xuXG5sZXQgZGlyZWN0aXZlID0gKCkgPT4ge1xuXG4gICduZ0luamVjdCc7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcXVpcmU6ICdebWRTdGVwcGVycycsXG4gICAgbGluayxcbiAgICB0ZW1wbGF0ZVxuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IGNvbXBvbmVudCxcbiAgZGlyZWN0aXZlXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2luZGV4LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJpYnV0ZXMsICRjb250cm9sbGVyKSB7XG5cbiAgJHNjb3BlLiRtZFN0ZXBwZXIgPSB7fTtcblxuICAkY29udHJvbGxlci5hZGRTdGVwKHtcbiAgICBsYWJlbDogJGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ21kTGFiZWwnKSAmJiAkYXR0cmlidXRlcy5tZExhYmVsLFxuICAgIGVkaXRhYmxlOiAkYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnbWRFZGl0YWJsZScpICYmICEhJGF0dHJpYnV0ZXMubWRFZGl0YWJsZSxcbiAgICBvcHRpb25hbDogJGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ21kT3B0aW9uYWwnKSAmJiAkYXR0cmlidXRlcy5tZE9wdGlvbmFsXG4gIH0pO1xuXG4gICRjb250cm9sbGVyLnNldEFjdGl2ZSgwKTtcblxuICAkc2NvcGUuJG1kU3RlcHBlci5pc0FjdGl2ZSA9IChpbmRleCkgPT4ge1xuICAgIHJldHVybiAkY29udHJvbGxlci5pc0FjdGl2ZShpbmRleCk7XG4gIH07XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlci9saW5rLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQpIHtcblxuICBsZXQgJHN0ZXBwZXJQYXJlbnQgPSAkZWxlbWVudC5wYXJlbnQoKTtcbiAgbGV0IHN0ZXBwZXJJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoJHN0ZXBwZXJQYXJlbnRbMF0uY2hpbGRyZW4sICRlbGVtZW50WzBdKTtcblxuICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJtZC1zdGVwcGVyXCIgbmctY2xhc3M9XCJ7ICdtZC1hY3RpdmUnOiAkbWRTdGVwcGVyLmlzQWN0aXZlKCR7c3RlcHBlckluZGV4fSkgfVwiPlxuICAgICAgPG1kLXN0ZXBwZXJzLXNjb3BlPiR7JGVsZW1lbnQuaHRtbCgpfTwvbWQtc3RlcHBlcnMtc2NvcGU+XG4gICAgPC9kaXY+XG4gIGA7XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlci90ZW1wbGF0ZS5qc1xuICoqLyIsImltcG9ydCBjb21waWxlIGZyb20gJy4vY29tcGlsZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVyc1Njb3BlJztcblxubGV0IGRpcmVjdGl2ZSA9ICgpID0+IHtcblxuICAnbmdJbmplY3QnO1xuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgY29tcGlsZTogY29tcGlsZSxcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICB0cmFuc2NsdWRlOiAnZWxlbWVudCdcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBjb21wb25lbnQsXG4gIGRpcmVjdGl2ZVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUvaW5kZXguanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkdG9wRWxlbWVudCwgJHRvcEF0dHJpYnV0ZXMsICR0cmFuc2NsdWRlKSB7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHBvc3RMaW5rKCRzY29wZSwgJGVsZW1lbnQpIHtcblxuICAgIGxldCAkY29udHJvbGxlciA9ICRzY29wZTtcbiAgICBsZXQgbmV3U2NvcGUgPSAkY29udHJvbGxlci4kcGFyZW50LiRuZXcoKTtcblxuICAgIG5ld1Njb3BlLiRpbmRleCA9ICRzY29wZS4kaW5kZXg7XG5cbiAgICAkc2NvcGUuJHdhdGNoKCckaW5kZXgnLCAodmFsdWUpID0+IHtcbiAgICAgIG5ld1Njb3BlLiRpbmRleCA9IHZhbHVlO1xuICAgIH0pO1xuXG4gICAgbGV0IHNjb3BlRGlnZXN0aW5nID0gZmFsc2U7XG4gICAgbGV0IG5ld1Njb3BlRGlnZXN0aW5nID0gZmFsc2U7XG5cbiAgICAkc2NvcGUuJHdhdGNoKCgpID0+IHtcbiAgICAgIGlmIChuZXdTY29wZURpZ2VzdGluZyB8fCBzY29wZURpZ2VzdGluZykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNjb3BlRGlnZXN0aW5nID0gdHJ1ZTtcbiAgICAgICRzY29wZS4kJHBvc3REaWdlc3QoKCkgPT4ge1xuICAgICAgICBpZiAoIW5ld1Njb3BlRGlnZXN0aW5nKSB7XG4gICAgICAgICAgbmV3U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGVEaWdlc3RpbmcgPSBuZXdTY29wZURpZ2VzdGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBuZXdTY29wZS4kd2F0Y2goKCkgPT4ge1xuICAgICAgbmV3U2NvcGVEaWdlc3RpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgJHRyYW5zY2x1ZGUobmV3U2NvcGUsIChjbG9uZSkgPT4ge1xuICAgICAgJGVsZW1lbnQuYWZ0ZXIoY2xvbmUpO1xuICAgIH0pO1xuXG4gIH07XG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUvY29tcGlsZS5qc1xuICoqLyIsImxldCBzZXJ2aWNlID0gKCRtZENvbXBvbmVudFJlZ2lzdHJ5KSA9PiB7XG5cbiAgJ25nSW5qZWN0JztcblxuICByZXR1cm4gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgbGV0IGluc3RhbmNlID0gJG1kQ29tcG9uZW50UmVnaXN0cnkuZ2V0KGhhbmRsZSk7XG5cbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAkbWRDb21wb25lbnRSZWdpc3RyeS5ub3RGb3VuZEVycm9yKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICckbWRTdGVwcGVycycsXG4gIHNlcnZpY2Vcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL3NlcnZpY2UuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9