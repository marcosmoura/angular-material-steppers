(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/main.js":[function(require,module,exports){
'use strict';

var _mdSteppers = require('./scripts/md-steppers');

var _mdSteppers2 = _interopRequireDefault(_mdSteppers);

var _mdStepper = require('./scripts/md-stepper');

var _mdStepper2 = _interopRequireDefault(_mdStepper);

var _mdSteppersScope = require('./scripts/md-steppers-scope');

var _mdSteppersScope2 = _interopRequireDefault(_mdSteppersScope);

var _service = require('./scripts/md-steppers/service.js');

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (angular) {

  angular.module('ngMaterialSteppers', ['ngAnimate', 'ngMaterial']).directive(_mdSteppers2.default.name, _mdSteppers2.default.directive).directive(_mdStepper2.default.name, _mdStepper2.default.directive).directive(_mdSteppersScope2.default.name, _mdSteppersScope2.default.directive).factory(_service2.default.name, _service2.default.service);
})(angular);

},{"./scripts/md-stepper":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-stepper/index.js","./scripts/md-steppers":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers/index.js","./scripts/md-steppers-scope":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers-scope/index.js","./scripts/md-steppers/service.js":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers/service.js"}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-stepper/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = 'mdStepper';

var directive = function directive() {

  return {
    restrict: 'E',
    require: '^mdSteppers',
    scope: {
      label: '@mdLabel',
      editable: '=mdEditable',
      optional: '@?mdOptional'
    },
    link: _link2.default,
    template: _template2.default
  };
};

exports.default = {
  name: component,
  directive: directive
};

},{"./link":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-stepper/link.js","./template":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-stepper/template.js"}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-stepper/link.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($scope, $element, $attributes, $controller) {

  $scope.$mdStepper = {};

  $controller.addStep({
    label: $scope.label,
    editable: $scope.editable || $scope.hasOwnProperty('editable'),
    optional: $scope.optional
  });

  $controller.setActive(0);

  $scope.$mdStepper.isActive = function (index) {
    return $controller.isActive(index);
  };
};

},{}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-stepper/template.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element) {

  var $stepperParent = $element.parent();
  var stepperIndex = Array.prototype.indexOf.call($stepperParent[0].children, $element[0]);

  return "<div class=\"md-stepper\" ng-class=\"{ 'md-active': $mdStepper.isActive(" + stepperIndex + ") }\">" + $element.html() + "</div>";
};

},{}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers-scope/compile.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($topElement, $topAttributes, $transclude) {

  return function postLink($scope, $element) {

    'ngInject';

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

},{}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers-scope/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compile = require('./compile');

var _compile2 = _interopRequireDefault(_compile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = 'mdSteppersScope';

var directive = function directive() {

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

},{"./compile":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers-scope/compile.js"}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers/controller.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($scope, $document, $element, $animateCss, $mdUtil) {
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
};

},{}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var component = 'mdSteppers';

var directive = function directive($mdComponentRegistry, $log) {

  return {
    restrict: 'E',
    scope: {
      card: '=?mdCard',
      linear: '=?mdLinear',
      alternative: '=?mdAlternative'
    },
    template: _template2.default,
    link: ['$scope', '$element', '$attributes', '$controller', function ($scope, $element, $attributes, $controller) {

      'ngInject';

      if (!$attributes.id) {
        $log.warn('You must set an id attribute to your stepper');
      }

      $mdComponentRegistry.register({
        changeStep: $controller.changeStep,
        setCompleted: $controller.setCompleted,
        isActive: $controller.isActive
      }, $attributes.id);
    }],
    controller: _controller2.default,
    controllerAs: '$' + component,
    bindToController: true
  };
};

exports.default = {
  name: component,
  directive: directive
};

},{"./controller":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers/controller.js","./template":"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers/template.js"}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers/service.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var service = function service($mdComponentRegistry) {

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

},{}],"/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/scripts/md-steppers/template.js":[function(require,module,exports){
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

},{}]},{},["/home/marcosmoura/Projects/personal/github/angular-material-steppers/src/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXIvaW5kZXguanMiLCJzcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2xpbmsuanMiLCJzcmMvc2NyaXB0cy9tZC1zdGVwcGVyL3RlbXBsYXRlLmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUvY29tcGlsZS5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvY29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL3RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsQ0FBQyxVQUFDLE9BQUQsRUFBYTs7QUFFWixVQUNHLE1BREgsQ0FDVSxvQkFEVixFQUNnQyxDQUM1QixXQUQ0QixFQUU1QixZQUY0QixDQURoQyxFQUtHLFNBTEgsQ0FLYSxxQkFBVyxJQUFYLEVBQWlCLHFCQUFXLFNBQVgsQ0FMOUIsQ0FNRyxTQU5ILENBTWEsb0JBQVUsSUFBVixFQUFnQixvQkFBVSxTQUFWLENBTjdCLENBT0csU0FQSCxDQU9hLDBCQUFnQixJQUFoQixFQUFzQiwwQkFBZ0IsU0FBaEIsQ0FQbkMsQ0FRRyxPQVJILENBUVcsa0JBQWlCLElBQWpCLEVBQXVCLGtCQUFpQixPQUFqQixDQVJsQyxDQUZZO0NBQWIsQ0FBRCxDQVlHLE9BWkg7Ozs7Ozs7OztBQ0xBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksWUFBWSxXQUFaOztBQUVKLElBQUksWUFBWSxTQUFaLFNBQVksR0FBTTs7QUFFcEIsU0FBTztBQUNMLGNBQVUsR0FB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O0FBQ2IsMkJBQXFCLGFBQXJCLENBQW1DLE1BQW5DLEVBRGE7S0FBZjs7QUFJQSxXQUFPLFFBQVAsQ0FQc0I7R0FBakIsQ0FGK0I7Q0FBMUI7O2tCQWNDO0FBQ2IsUUFBTSxhQUFOO0FBQ0Esa0JBRmE7Ozs7Ozs7Ozs7a0JDZEEsVUFBUyxRQUFULEVBQW1CLFdBQW5CLEVBQWdDOztBQUU3QyxNQUFJLHV6Q0FBSixDQUY2QztBQTRCN0MsTUFBSSxzRUFBb0UsMENBQXBFLENBNUJ5QztBQTZCN0MsTUFBSSxtQkFBbUIsU0FBUyxJQUFULENBQWMscUJBQWQsRUFBcUMsTUFBckMsR0FBOEMsSUFBOUMsRUFBbkIsQ0E3QnlDOztBQStCN0MsTUFBSSxZQUFZLGNBQVosQ0FBMkIsUUFBM0IsQ0FBSixFQUEwQztBQUN4QywrREFBeUQsK0JBQXpELENBRHdDO0dBQTFDOztBQUlBLHFLQUVNLGdGQUNpRCxTQUFTLElBQVQsMkdBQ2tCLDJEQUp6RSxDQW5DNkM7Q0FBaEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IG1kU3RlcHBlcnMgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXJzJztcbmltcG9ydCBtZFN0ZXBwZXIgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXInO1xuaW1wb3J0IG1kU3RlcHBlcnNTY29wZSBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUnO1xuaW1wb3J0IG1kU3RlcHBlclNlcnZpY2UgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXJzL3NlcnZpY2UuanMnO1xuXG4oKGFuZ3VsYXIpID0+IHtcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnbmdNYXRlcmlhbFN0ZXBwZXJzJywgW1xuICAgICAgJ25nQW5pbWF0ZScsXG4gICAgICAnbmdNYXRlcmlhbCdcbiAgICBdKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVycy5uYW1lLCBtZFN0ZXBwZXJzLmRpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKG1kU3RlcHBlci5uYW1lLCBtZFN0ZXBwZXIuZGlyZWN0aXZlKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVyc1Njb3BlLm5hbWUsIG1kU3RlcHBlcnNTY29wZS5kaXJlY3RpdmUpXG4gICAgLmZhY3RvcnkobWRTdGVwcGVyU2VydmljZS5uYW1lLCBtZFN0ZXBwZXJTZXJ2aWNlLnNlcnZpY2UpO1xuXG59KShhbmd1bGFyKTtcbiIsImltcG9ydCBsaW5rIGZyb20gJy4vbGluayc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVyJztcblxubGV0IGRpcmVjdGl2ZSA9ICgpID0+IHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVxdWlyZTogJ15tZFN0ZXBwZXJzJyxcbiAgICBzY29wZToge1xuICAgICAgbGFiZWw6ICdAbWRMYWJlbCcsXG4gICAgICBlZGl0YWJsZTogJz1tZEVkaXRhYmxlJyxcbiAgICAgIG9wdGlvbmFsOiAnQD9tZE9wdGlvbmFsJ1xuICAgIH0sXG4gICAgbGluayxcbiAgICB0ZW1wbGF0ZVxuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IGNvbXBvbmVudCxcbiAgZGlyZWN0aXZlXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJpYnV0ZXMsICRjb250cm9sbGVyKSB7XG5cbiAgJHNjb3BlLiRtZFN0ZXBwZXIgPSB7fTtcblxuICAkY29udHJvbGxlci5hZGRTdGVwKHtcbiAgICBsYWJlbDogJHNjb3BlLmxhYmVsLFxuICAgIGVkaXRhYmxlOiAkc2NvcGUuZWRpdGFibGUgfHwgJHNjb3BlLmhhc093blByb3BlcnR5KCdlZGl0YWJsZScpLFxuICAgIG9wdGlvbmFsOiAkc2NvcGUub3B0aW9uYWxcbiAgfSk7XG5cbiAgJGNvbnRyb2xsZXIuc2V0QWN0aXZlKDApO1xuXG4gICRzY29wZS4kbWRTdGVwcGVyLmlzQWN0aXZlID0gKGluZGV4KSA9PiB7XG4gICAgcmV0dXJuICRjb250cm9sbGVyLmlzQWN0aXZlKGluZGV4KTtcbiAgfTtcblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQpIHtcblxuICBsZXQgJHN0ZXBwZXJQYXJlbnQgPSAkZWxlbWVudC5wYXJlbnQoKTtcbiAgbGV0IHN0ZXBwZXJJbmRleCA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoJHN0ZXBwZXJQYXJlbnRbMF0uY2hpbGRyZW4sICRlbGVtZW50WzBdKTtcblxuICByZXR1cm4gYDxkaXYgY2xhc3M9XCJtZC1zdGVwcGVyXCIgbmctY2xhc3M9XCJ7ICdtZC1hY3RpdmUnOiAkbWRTdGVwcGVyLmlzQWN0aXZlKCR7c3RlcHBlckluZGV4fSkgfVwiPiR7JGVsZW1lbnQuaHRtbCgpfTwvZGl2PmA7XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR0b3BFbGVtZW50LCAkdG9wQXR0cmlidXRlcywgJHRyYW5zY2x1ZGUpIHtcblxuICByZXR1cm4gZnVuY3Rpb24gcG9zdExpbmsoJHNjb3BlLCAkZWxlbWVudCkge1xuXG4gICAgJ25nSW5qZWN0JztcblxuICAgIGxldCAkY29udHJvbGxlciA9ICRzY29wZTtcbiAgICBsZXQgbmV3U2NvcGUgPSAkY29udHJvbGxlci4kcGFyZW50LiRuZXcoKTtcblxuICAgIG5ld1Njb3BlLiRpbmRleCA9ICRzY29wZS4kaW5kZXg7XG5cbiAgICAkc2NvcGUuJHdhdGNoKCckaW5kZXgnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgbmV3U2NvcGUuJGluZGV4ID0gdmFsdWU7XG4gICAgfSk7XG5cbiAgICBsZXQgc2NvcGVEaWdlc3RpbmcgPSBmYWxzZTtcbiAgICBsZXQgbmV3U2NvcGVEaWdlc3RpbmcgPSBmYWxzZTtcblxuICAgICRzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAobmV3U2NvcGVEaWdlc3RpbmcgfHwgc2NvcGVEaWdlc3RpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzY29wZURpZ2VzdGluZyA9IHRydWU7XG4gICAgICAkc2NvcGUuJCRwb3N0RGlnZXN0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIW5ld1Njb3BlRGlnZXN0aW5nKSB7XG4gICAgICAgICAgbmV3U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGVEaWdlc3RpbmcgPSBuZXdTY29wZURpZ2VzdGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBuZXdTY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICBuZXdTY29wZURpZ2VzdGluZyA9IHRydWU7XG4gICAgfSk7XG5cbiAgICAkdHJhbnNjbHVkZShuZXdTY29wZSwgZnVuY3Rpb24oY2xvbmUpIHtcbiAgICAgICRlbGVtZW50LmFmdGVyKGNsb25lKTtcbiAgICB9KTtcbiAgfTtcblxufVxuIiwiaW1wb3J0IGNvbXBpbGUgZnJvbSAnLi9jb21waWxlJztcblxubGV0IGNvbXBvbmVudCA9ICdtZFN0ZXBwZXJzU2NvcGUnO1xuXG5sZXQgZGlyZWN0aXZlID0gKCkgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgY29tcGlsZTogY29tcGlsZSxcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgICB0cmFuc2NsdWRlOiAnZWxlbWVudCdcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBjb21wb25lbnQsXG4gIGRpcmVjdGl2ZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRzY29wZSwgJGRvY3VtZW50LCAkZWxlbWVudCwgJGFuaW1hdGVDc3MsICRtZFV0aWwpIHtcblxuICB0aGlzLnN0ZXBzID0gW107XG4gIHRoaXMuc3RlcEFjdGl2ZSA9IDA7XG5cbiAgdGhpcy5hZGRTdGVwID0gKHN0ZXApID0+IHtcbiAgICB0aGlzLnN0ZXBzLnB1c2goc3RlcCk7XG4gIH07XG5cbiAgdGhpcy5pc0FjdGl2ZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHN0ZXBOdW1iZXIgPT09IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHRoaXMuaXNDb21wbGV0ZWQgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGlmICh0aGlzLmxpbmVhciAmJiBzdGVwTnVtYmVyIDwgdGhpcy5zdGVwQWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdGhpcy5lbmFibGVFZGl0TW9kZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHRoaXMubGluZWFyICYmIHN0ZXBOdW1iZXIgPCB0aGlzLnN0ZXBBY3RpdmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB0aGlzLmhhc0lua1JpcHBsZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHRoaXMubGluZWFyIHx8IHN0ZXBOdW1iZXIgPT09IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHRoaXMuc2V0QWN0aXZlID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBsZXQgJHN0ZXBwZXJzQ29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1kLXN0ZXBwZXJzLWNvbnRlbnQnKSk7XG4gICAgbGV0ICRzdGVwcGVyID0gYW5ndWxhci5lbGVtZW50KCRkb2N1bWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKCcubWQtc3RlcHBlcicpW3N0ZXBOdW1iZXJdKTtcblxuICAgIHRoaXMuc3RlcEFjdGl2ZSA9IHN0ZXBOdW1iZXI7XG5cbiAgICAkYW5pbWF0ZUNzcygkc3RlcHBlcnNDb250ZW50LCB7XG4gICAgICBmcm9tOiB7IGhlaWdodDogJHN0ZXBwZXJzQ29udGVudFswXS5jbGllbnRIZWlnaHQgKyAncHgnIH0sXG4gICAgICB0bzogeyBoZWlnaHQ6ICRzdGVwcGVyLnByb3AoJ2NsaWVudEhlaWdodCcpICsgJ3B4JyB9LFxuICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKC4zNSwgMCwgLjI1LCAxKScsXG4gICAgICBkdXJhdGlvbjogMC40XG4gICAgfSkuc3RhcnQoKS5kb25lKCgpID0+IHtcbiAgICAgICRzdGVwcGVyc0NvbnRlbnQuY3NzKHtcbiAgICAgICAgdHJhbnNpdGlvbjogJ25vbmUnLFxuICAgICAgICBoZWlnaHQ6ICcnXG4gICAgICB9KTtcblxuICAgICAgJG1kVXRpbC5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0ZXBwZXJzQ29udGVudC5jc3MoJ3RyYW5zaXRpb24nLCAnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICB0aGlzLnNldENvbXBsZXRlZCA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0NvbXBsZXRlZCcsIHN0ZXBOdW1iZXIpO1xuICB9O1xuXG4gIHRoaXMuY2hhbmdlU3RlcCA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zZXRBY3RpdmUoc3RlcE51bWJlcik7XG4gIH07XG5cbiAgdGhpcy5jbGlja0FjdGlvbiA9IGZ1bmN0aW9uKHN0ZXBOdW1iZXIpIHtcbiAgICBpZiAodGhpcy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyKSkge1xuICAgICAgdGhpcy5zZXRBY3RpdmUoc3RlcE51bWJlcik7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5saW5lYXIgJiYgIXRoaXMuaXNBY3RpdmUoc3RlcE51bWJlcikpIHtcbiAgICAgIHRoaXMuY2hhbmdlU3RlcChzdGVwTnVtYmVyKTtcbiAgICB9XG4gIH07XG5cbn1cbiIsImltcG9ydCBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVycyc7XG5cbmxldCBkaXJlY3RpdmUgPSAoJG1kQ29tcG9uZW50UmVnaXN0cnksICRsb2cpID0+IHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGNhcmQ6ICc9P21kQ2FyZCcsXG4gICAgICBsaW5lYXI6ICc9P21kTGluZWFyJyxcbiAgICAgIGFsdGVybmF0aXZlOiAnPT9tZEFsdGVybmF0aXZlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGUsXG4gICAgbGluazogWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGF0dHJpYnV0ZXMnLCAnJGNvbnRyb2xsZXInLCAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJpYnV0ZXMsICRjb250cm9sbGVyKSA9PiB7XG5cbiAgICAgICduZ0luamVjdCc7XG5cbiAgICAgIGlmICghJGF0dHJpYnV0ZXMuaWQpIHtcbiAgICAgICAgJGxvZy53YXJuKCdZb3UgbXVzdCBzZXQgYW4gaWQgYXR0cmlidXRlIHRvIHlvdXIgc3RlcHBlcicpO1xuICAgICAgfVxuXG4gICAgICAkbWRDb21wb25lbnRSZWdpc3RyeS5yZWdpc3Rlcih7XG4gICAgICAgIGNoYW5nZVN0ZXA6ICRjb250cm9sbGVyLmNoYW5nZVN0ZXAsXG4gICAgICAgIHNldENvbXBsZXRlZDogJGNvbnRyb2xsZXIuc2V0Q29tcGxldGVkLFxuICAgICAgICBpc0FjdGl2ZTogJGNvbnRyb2xsZXIuaXNBY3RpdmVcbiAgICAgIH0sICRhdHRyaWJ1dGVzLmlkKTtcblxuICAgIH1dLFxuICAgIGNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiBgJCR7Y29tcG9uZW50fWAsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IGNvbXBvbmVudCxcbiAgZGlyZWN0aXZlXG59O1xuIiwibGV0IHNlcnZpY2UgPSAoJG1kQ29tcG9uZW50UmVnaXN0cnkpID0+IHtcblxuICByZXR1cm4gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgbGV0IGluc3RhbmNlID0gJG1kQ29tcG9uZW50UmVnaXN0cnkuZ2V0KGhhbmRsZSk7XG5cbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAkbWRDb21wb25lbnRSZWdpc3RyeS5ub3RGb3VuZEVycm9yKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICckbWRTdGVwcGVycycsXG4gIHNlcnZpY2Vcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgJGF0dHJpYnV0ZXMpIHtcblxuICBsZXQgJHN0ZXBwZXJzQ29udGVudCA9IGBcbiAgICA8YnV0dG9uXG4gICAgICBjbGFzcz1cIm1kLXN0ZXBwZXItaW5kaWNhdG9yXCJcbiAgICAgIG5nLXJlcGVhdD1cIihzdGVwTnVtYmVyLCAkc3RlcCkgaW4gJG1kU3RlcHBlcnMuc3RlcHMgdHJhY2sgYnkgJGluZGV4XCJcbiAgICAgIG5nLWNsYXNzPVwie1xuICAgICAgICAnbWQtYWN0aXZlJzogJG1kU3RlcHBlcnMuaXNBY3RpdmUoc3RlcE51bWJlciksXG4gICAgICAgICdtZC1jb21wbGV0ZWQnOiAkbWRTdGVwcGVycy5pc0NvbXBsZXRlZChzdGVwTnVtYmVyKSxcbiAgICAgICAgJ21kLWVkaXRhYmxlJzogJHN0ZXAuZWRpdGFibGUgJiYgJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlciksXG4gICAgICAgICdtZC1zdGVwcGVyLW9wdGlvbmFsJzogJHN0ZXAub3B0aW9uYWxcbiAgICAgIH1cIlxuICAgICAgbmctY2xpY2s9XCIkbWRTdGVwcGVycy5jbGlja0FjdGlvbihzdGVwTnVtYmVyKVwiXG4gICAgICBtZC1pbmstcmlwcGxlPVwie3sgJG1kU3RlcHBlcnMuaGFzSW5rUmlwcGxlKHN0ZXBOdW1iZXIpIHx8ICRtZFN0ZXBwZXJzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIpIH19XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1pbmRpY2F0b3Itd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1udW1iZXJcIj5cbiAgICAgICAgICA8c3BhbiBuZy1pZj1cIiEkbWRTdGVwcGVycy5pc0NvbXBsZXRlZChzdGVwTnVtYmVyKSAmJiAhJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlcilcIj57eyA6OnN0ZXBOdW1iZXIrMSB9fTwvc3Bhbj5cbiAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cIm1kLXN0ZXBwZXItaWNvbiBtZC1zdGVwcGVyLWljb24tZWRpdFwiIG5nLWlmPVwiJHN0ZXAuZWRpdGFibGVcIiBuZy1zaG93PVwiJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlcilcIj5lZGl0PC9tZC1pY29uPlxuICAgICAgICAgIDxtZC1pY29uIGNsYXNzPVwibWQtc3RlcHBlci1pY29uXCIgbmctaWY9XCIkbWRTdGVwcGVycy5pc0NvbXBsZXRlZChzdGVwTnVtYmVyKSAmJiAhJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlcilcIj5jaGVjazwvbWQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXItdGl0bGVcIj5cbiAgICAgICAgICA8c3Bhbj57eyAkc3RlcC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICA8c21hbGwgbmctaWY9XCIkc3RlcC5vcHRpb25hbFwiPnt7ICRzdGVwLm9wdGlvbmFsIH19PC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgYDtcbiAgbGV0ICRzdGVwcGVyc0hlYWRlciA9IGA8bWQtc3RlcHBlcnMtaGVhZGVyIGNsYXNzPVwibWQtc3RlcHBlcnMtaGVhZGVyXCI+JHskc3RlcHBlcnNDb250ZW50fTwvbWQtc3RlcHBlcnMtaGVhZGVyPmA7XG4gIGxldCAkc3RlcHBlcnNBY3Rpb25zID0gJGVsZW1lbnQuZmluZCgnbWQtc3RlcHBlcnMtYWN0aW9ucycpLmRldGFjaCgpLmh0bWwoKTtcblxuICBpZiAoJGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ21kQ2FyZCcpKSB7XG4gICAgJHN0ZXBwZXJzSGVhZGVyID0gYDxtZC1jYXJkIGNsYXNzPVwibWQtc3RlcHBlcnMtaGVhZGVyXCI+JHskc3RlcHBlcnNDb250ZW50fTwvbWQtY2FyZD5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlcnNcIiBuZy1jbGFzcz1cInsgJ21kLXN0ZXBwZXJzLWxpbmVhcic6ICRtZFN0ZXBwZXJzLmxpbmVhciwgJ21kLXN0ZXBwZXJzLWFsdGVybmF0aXZlJzogJG1kU3RlcHBlcnMuYWx0ZXJuYXRpdmUgfVwiPlxuICAgICAgJHskc3RlcHBlcnNIZWFkZXJ9XG4gICAgICA8bWQtc3RlcHBlcnMtY29udGVudCBjbGFzcz1cIm1kLXN0ZXBwZXJzLWNvbnRlbnRcIj4keyRlbGVtZW50Lmh0bWwoKX08L21kLXN0ZXBwZXJzLWNvbnRlbnQ+XG4gICAgICA8bWQtc3RlcHBlcnMtYWN0aW9ucyBtZC1zdGVwcGVycy1zY29wZSBjbGFzcz1cIm1kLXN0ZXBwZXJzLWFjdGlvbnNcIj4keyRzdGVwcGVyc0FjdGlvbnN9PC9tZC1zdGVwcGVycy1hY3Rpb25zPlxuICAgIDwvZGl2PlxuICBgO1xuXG59XG4iXX0=
