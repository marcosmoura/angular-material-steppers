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

  angular.module('angular-material-steppers', ['ngAnimate', 'ngMaterial']).directive(_mdSteppers2.default.name, _mdSteppers2.default.directive).directive(_mdStepper2.default.name, _mdStepper2.default.directive).directive(_mdSteppersScope2.default.name, _mdSteppersScope2.default.directive).factory(_service2.default.name, _service2.default.service);
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
    link: function link($scope, $element, $attributes, $controller) {
      if (!$attributes.id) {
        $log.warn('You must set an id attribute to your stepper');
      }

      $mdComponentRegistry.register({
        changeStep: $controller.changeStep,
        setCompleted: $controller.setCompleted,
        isActive: $controller.isActive
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXIvaW5kZXguanMiLCJzcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2xpbmsuanMiLCJzcmMvc2NyaXB0cy9tZC1zdGVwcGVyL3RlbXBsYXRlLmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUvY29tcGlsZS5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvY29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL3RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsQ0FBQyxVQUFDLE9BQUQsRUFBYTs7QUFFWixVQUNHLE1BREgsQ0FDVSwyQkFEVixFQUN1QyxDQUNuQyxXQURtQyxFQUVuQyxZQUZtQyxDQUR2QyxFQUtHLFNBTEgsQ0FLYSxxQkFBVyxJQUFYLEVBQWlCLHFCQUFXLFNBQVgsQ0FMOUIsQ0FNRyxTQU5ILENBTWEsb0JBQVUsSUFBVixFQUFnQixvQkFBVSxTQUFWLENBTjdCLENBT0csU0FQSCxDQU9hLDBCQUFnQixJQUFoQixFQUFzQiwwQkFBZ0IsU0FBaEIsQ0FQbkMsQ0FRRyxPQVJILENBUVcsa0JBQWlCLElBQWpCLEVBQXVCLGtCQUFpQixPQUFqQixDQVJsQyxDQUZZO0NBQWIsQ0FBRCxDQVlHLE9BWkg7Ozs7Ozs7OztBQ0xBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksWUFBWSxXQUFaOztBQUVKLElBQUksWUFBWSxTQUFaLFNBQVksR0FBTTs7QUFFcEIsU0FBTztBQUNMLGNBQVUsR0FB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Q2IsUUFBTSxhQUFOO0FBQ0Esa0JBRmE7Ozs7Ozs7Ozs7a0JDWkEsVUFBUyxRQUFULEVBQW1CLFdBQW5CLEVBQWdDOztBQUU3QyxNQUFJLHV6Q0FBSixDQUY2QztBQTRCN0MsTUFBSSxzRUFBb0UsMENBQXBFLENBNUJ5QztBQTZCN0MsTUFBSSxtQkFBbUIsU0FBUyxJQUFULENBQWMscUJBQWQsRUFBcUMsTUFBckMsR0FBOEMsSUFBOUMsRUFBbkIsQ0E3QnlDOztBQStCN0MsTUFBSSxZQUFZLGNBQVosQ0FBMkIsUUFBM0IsQ0FBSixFQUEwQztBQUN4QywrREFBeUQsK0JBQXpELENBRHdDO0dBQTFDOztBQUlBLHFLQUVNLGdGQUNpRCxTQUFTLElBQVQsMkdBQ2tCLDJEQUp6RSxDQW5DNkM7Q0FBaEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IG1kU3RlcHBlcnMgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXJzJztcbmltcG9ydCBtZFN0ZXBwZXIgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXInO1xuaW1wb3J0IG1kU3RlcHBlcnNTY29wZSBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUnO1xuaW1wb3J0IG1kU3RlcHBlclNlcnZpY2UgZnJvbSAnLi9zY3JpcHRzL21kLXN0ZXBwZXJzL3NlcnZpY2UuanMnO1xuXG4oKGFuZ3VsYXIpID0+IHtcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYW5ndWxhci1tYXRlcmlhbC1zdGVwcGVycycsIFtcbiAgICAgICduZ0FuaW1hdGUnLFxuICAgICAgJ25nTWF0ZXJpYWwnXG4gICAgXSlcbiAgICAuZGlyZWN0aXZlKG1kU3RlcHBlcnMubmFtZSwgbWRTdGVwcGVycy5kaXJlY3RpdmUpXG4gICAgLmRpcmVjdGl2ZShtZFN0ZXBwZXIubmFtZSwgbWRTdGVwcGVyLmRpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKG1kU3RlcHBlcnNTY29wZS5uYW1lLCBtZFN0ZXBwZXJzU2NvcGUuZGlyZWN0aXZlKVxuICAgIC5mYWN0b3J5KG1kU3RlcHBlclNlcnZpY2UubmFtZSwgbWRTdGVwcGVyU2VydmljZS5zZXJ2aWNlKTtcblxufSkoYW5ndWxhcik7XG4iLCJpbXBvcnQgbGluayBmcm9tICcuL2xpbmsnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnO1xuXG5sZXQgY29tcG9uZW50ID0gJ21kU3RlcHBlcic7XG5cbmxldCBkaXJlY3RpdmUgPSAoKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcXVpcmU6ICdebWRTdGVwcGVycycsXG4gICAgc2NvcGU6IHtcbiAgICAgIGxhYmVsOiAnQG1kTGFiZWwnLFxuICAgICAgZWRpdGFibGU6ICc9bWRFZGl0YWJsZScsXG4gICAgICBvcHRpb25hbDogJ0A/bWRPcHRpb25hbCdcbiAgICB9LFxuICAgIGxpbmssXG4gICAgdGVtcGxhdGVcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBjb21wb25lbnQsXG4gIGRpcmVjdGl2ZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyaWJ1dGVzLCAkY29udHJvbGxlcikge1xuXG4gICRzY29wZS4kbWRTdGVwcGVyID0ge307XG5cbiAgJGNvbnRyb2xsZXIuYWRkU3RlcCh7XG4gICAgbGFiZWw6ICRzY29wZS5sYWJlbCxcbiAgICBlZGl0YWJsZTogJHNjb3BlLmVkaXRhYmxlIHx8ICRzY29wZS5oYXNPd25Qcm9wZXJ0eSgnZWRpdGFibGUnKSxcbiAgICBvcHRpb25hbDogJHNjb3BlLm9wdGlvbmFsXG4gIH0pO1xuXG4gICRjb250cm9sbGVyLnNldEFjdGl2ZSgwKTtcblxuICAkc2NvcGUuJG1kU3RlcHBlci5pc0FjdGl2ZSA9IChpbmRleCkgPT4ge1xuICAgIHJldHVybiAkY29udHJvbGxlci5pc0FjdGl2ZShpbmRleCk7XG4gIH07XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIGxldCAkc3RlcHBlclBhcmVudCA9ICRlbGVtZW50LnBhcmVudCgpO1xuICBsZXQgc3RlcHBlckluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbCgkc3RlcHBlclBhcmVudFswXS5jaGlsZHJlbiwgJGVsZW1lbnRbMF0pO1xuXG4gIHJldHVybiBgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXJcIiBuZy1jbGFzcz1cInsgJ21kLWFjdGl2ZSc6ICRtZFN0ZXBwZXIuaXNBY3RpdmUoJHtzdGVwcGVySW5kZXh9KSB9XCI+JHskZWxlbWVudC5odG1sKCl9PC9kaXY+YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCR0b3BFbGVtZW50LCAkdG9wQXR0cmlidXRlcywgJHRyYW5zY2x1ZGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHBvc3RMaW5rKCRzY29wZSwgJGVsZW1lbnQpIHtcbiAgICBsZXQgJGNvbnRyb2xsZXIgPSAkc2NvcGU7XG4gICAgbGV0IG5ld1Njb3BlID0gJGNvbnRyb2xsZXIuJHBhcmVudC4kbmV3KCk7XG5cbiAgICBuZXdTY29wZS4kaW5kZXggPSAkc2NvcGUuJGluZGV4O1xuXG4gICAgJHNjb3BlLiR3YXRjaCgnJGluZGV4JywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIG5ld1Njb3BlLiRpbmRleCA9IHZhbHVlO1xuICAgIH0pO1xuXG4gICAgbGV0IHNjb3BlRGlnZXN0aW5nID0gZmFsc2U7XG4gICAgbGV0IG5ld1Njb3BlRGlnZXN0aW5nID0gZmFsc2U7XG5cbiAgICAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKG5ld1Njb3BlRGlnZXN0aW5nIHx8IHNjb3BlRGlnZXN0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2NvcGVEaWdlc3RpbmcgPSB0cnVlO1xuICAgICAgJHNjb3BlLiQkcG9zdERpZ2VzdChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFuZXdTY29wZURpZ2VzdGluZykge1xuICAgICAgICAgIG5ld1Njb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjb3BlRGlnZXN0aW5nID0gbmV3U2NvcGVEaWdlc3RpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbmV3U2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgbmV3U2NvcGVEaWdlc3RpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgJHRyYW5zY2x1ZGUobmV3U2NvcGUsIGZ1bmN0aW9uKGNsb25lKSB7XG4gICAgICAkZWxlbWVudC5hZnRlcihjbG9uZSk7XG4gICAgfSk7XG4gIH07XG59XG4iLCJpbXBvcnQgY29tcGlsZSBmcm9tICcuL2NvbXBpbGUnO1xuXG5sZXQgY29tcG9uZW50ID0gJ21kU3RlcHBlcnNTY29wZSc7XG5cbmxldCBkaXJlY3RpdmUgPSAoKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0FFJyxcbiAgICBjb21waWxlOiBjb21waWxlLFxuICAgIHRlcm1pbmFsOiB0cnVlLFxuICAgIHRyYW5zY2x1ZGU6ICdlbGVtZW50J1xuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IGNvbXBvbmVudCxcbiAgZGlyZWN0aXZlXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHNjb3BlLCAkZG9jdW1lbnQsICRlbGVtZW50LCAkYW5pbWF0ZUNzcywgJG1kVXRpbCkge1xuXG4gIHRoaXMuc3RlcHMgPSBbXTtcbiAgdGhpcy5zdGVwQWN0aXZlID0gMDtcblxuICB0aGlzLmFkZFN0ZXAgPSAoc3RlcCkgPT4ge1xuICAgIHRoaXMuc3RlcHMucHVzaChzdGVwKTtcbiAgfTtcblxuICB0aGlzLmlzQWN0aXZlID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBpZiAoc3RlcE51bWJlciA9PT0gdGhpcy5zdGVwQWN0aXZlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgdGhpcy5pc0NvbXBsZXRlZCA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHRoaXMubGluZWFyICYmIHN0ZXBOdW1iZXIgPCB0aGlzLnN0ZXBBY3RpdmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB0aGlzLmVuYWJsZUVkaXRNb2RlID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBpZiAodGhpcy5saW5lYXIgJiYgc3RlcE51bWJlciA8IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHRoaXMuaGFzSW5rUmlwcGxlID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBpZiAodGhpcy5saW5lYXIgfHwgc3RlcE51bWJlciA9PT0gdGhpcy5zdGVwQWN0aXZlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgdGhpcy5zZXRBY3RpdmUgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGxldCAkc3RlcHBlcnNDb250ZW50ID0gYW5ndWxhci5lbGVtZW50KCRkb2N1bWVudFswXS5xdWVyeVNlbGVjdG9yKCcubWQtc3RlcHBlcnMtY29udGVudCcpKTtcbiAgICBsZXQgJHN0ZXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZC1zdGVwcGVyJylbc3RlcE51bWJlcl0pO1xuXG4gICAgdGhpcy5zdGVwQWN0aXZlID0gc3RlcE51bWJlcjtcblxuICAgICRhbmltYXRlQ3NzKCRzdGVwcGVyc0NvbnRlbnQsIHtcbiAgICAgIGZyb206IHsgaGVpZ2h0OiAkc3RlcHBlcnNDb250ZW50WzBdLmNsaWVudEhlaWdodCArICdweCcgfSxcbiAgICAgIHRvOiB7IGhlaWdodDogJHN0ZXBwZXIucHJvcCgnY2xpZW50SGVpZ2h0JykgKyAncHgnIH0sXG4gICAgICBlYXNpbmc6ICdjdWJpYy1iZXppZXIoLjM1LCAwLCAuMjUsIDEpJyxcbiAgICAgIGR1cmF0aW9uOiAwLjRcbiAgICB9KS5zdGFydCgpLmRvbmUoKCkgPT4ge1xuICAgICAgJHN0ZXBwZXJzQ29udGVudC5jc3Moe1xuICAgICAgICB0cmFuc2l0aW9uOiAnbm9uZScsXG4gICAgICAgIGhlaWdodDogJydcbiAgICAgIH0pO1xuXG4gICAgICAkbWRVdGlsLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3RlcHBlcnNDb250ZW50LmNzcygndHJhbnNpdGlvbicsICcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMuc2V0Q29tcGxldGVkID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQ29tcGxldGVkJywgc3RlcE51bWJlcik7XG4gIH07XG5cbiAgdGhpcy5jaGFuZ2VTdGVwID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICB0aGlzLnNldEFjdGl2ZShzdGVwTnVtYmVyKTtcbiAgfTtcblxuICB0aGlzLmNsaWNrQWN0aW9uID0gZnVuY3Rpb24oc3RlcE51bWJlcikge1xuICAgIGlmICh0aGlzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIpKSB7XG4gICAgICB0aGlzLnNldEFjdGl2ZShzdGVwTnVtYmVyKTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmxpbmVhciAmJiAhdGhpcy5pc0FjdGl2ZShzdGVwTnVtYmVyKSkge1xuICAgICAgdGhpcy5jaGFuZ2VTdGVwKHN0ZXBOdW1iZXIpO1xuICAgIH1cbiAgfTtcblxufVxuIiwiaW1wb3J0IGNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3RlbXBsYXRlJztcblxubGV0IGNvbXBvbmVudCA9ICdtZFN0ZXBwZXJzJztcblxubGV0IGRpcmVjdGl2ZSA9ICgkbWRDb21wb25lbnRSZWdpc3RyeSwgJGxvZykgPT4ge1xuXG4gIHJldHVybiB7XG4gICAgcmVzdHJpY3Q6ICdFJyxcbiAgICBzY29wZToge1xuICAgICAgY2FyZDogJz0/bWRDYXJkJyxcbiAgICAgIGxpbmVhcjogJz0/bWRMaW5lYXInLFxuICAgICAgYWx0ZXJuYXRpdmU6ICc9P21kQWx0ZXJuYXRpdmUnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZSxcbiAgICBsaW5rOiAoJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJpYnV0ZXMsICRjb250cm9sbGVyKSA9PiB7XG4gICAgICBpZiAoISRhdHRyaWJ1dGVzLmlkKSB7XG4gICAgICAgICRsb2cud2FybignWW91IG11c3Qgc2V0IGFuIGlkIGF0dHJpYnV0ZSB0byB5b3VyIHN0ZXBwZXInKTtcbiAgICAgIH1cblxuICAgICAgJG1kQ29tcG9uZW50UmVnaXN0cnkucmVnaXN0ZXIoe1xuICAgICAgICBjaGFuZ2VTdGVwOiAkY29udHJvbGxlci5jaGFuZ2VTdGVwLFxuICAgICAgICBzZXRDb21wbGV0ZWQ6ICRjb250cm9sbGVyLnNldENvbXBsZXRlZCxcbiAgICAgICAgaXNBY3RpdmU6ICRjb250cm9sbGVyLmlzQWN0aXZlXG4gICAgICB9LCAkYXR0cmlidXRlcy5pZCk7XG4gICAgfSxcbiAgICBjb250cm9sbGVyLFxuICAgIGNvbnRyb2xsZXJBczogYCQke2NvbXBvbmVudH1gLFxuICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWVcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBjb21wb25lbnQsXG4gIGRpcmVjdGl2ZVxufTtcbiIsImxldCBzZXJ2aWNlID0gKCRtZENvbXBvbmVudFJlZ2lzdHJ5KSA9PiB7XG4gIHJldHVybiBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICBsZXQgaW5zdGFuY2UgPSAkbWRDb21wb25lbnRSZWdpc3RyeS5nZXQoaGFuZGxlKTtcblxuICAgIGlmICghaW5zdGFuY2UpIHtcbiAgICAgICRtZENvbXBvbmVudFJlZ2lzdHJ5Lm5vdEZvdW5kRXJyb3IoaGFuZGxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6ICckbWRTdGVwcGVycycsXG4gIHNlcnZpY2Vcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkZWxlbWVudCwgJGF0dHJpYnV0ZXMpIHtcblxuICBsZXQgJHN0ZXBwZXJzQ29udGVudCA9IGBcbiAgICA8YnV0dG9uXG4gICAgICBjbGFzcz1cIm1kLXN0ZXBwZXItaW5kaWNhdG9yXCJcbiAgICAgIG5nLXJlcGVhdD1cIihzdGVwTnVtYmVyLCAkc3RlcCkgaW4gJG1kU3RlcHBlcnMuc3RlcHMgdHJhY2sgYnkgJGluZGV4XCJcbiAgICAgIG5nLWNsYXNzPVwie1xuICAgICAgICAnbWQtYWN0aXZlJzogJG1kU3RlcHBlcnMuaXNBY3RpdmUoc3RlcE51bWJlciksXG4gICAgICAgICdtZC1jb21wbGV0ZWQnOiAkbWRTdGVwcGVycy5pc0NvbXBsZXRlZChzdGVwTnVtYmVyKSxcbiAgICAgICAgJ21kLWVkaXRhYmxlJzogJHN0ZXAuZWRpdGFibGUgJiYgJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlciksXG4gICAgICAgICdtZC1zdGVwcGVyLW9wdGlvbmFsJzogJHN0ZXAub3B0aW9uYWxcbiAgICAgIH1cIlxuICAgICAgbmctY2xpY2s9XCIkbWRTdGVwcGVycy5jbGlja0FjdGlvbihzdGVwTnVtYmVyKVwiXG4gICAgICBtZC1pbmstcmlwcGxlPVwie3sgJG1kU3RlcHBlcnMuaGFzSW5rUmlwcGxlKHN0ZXBOdW1iZXIpIHx8ICRtZFN0ZXBwZXJzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIpIH19XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1pbmRpY2F0b3Itd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1udW1iZXJcIj5cbiAgICAgICAgICA8c3BhbiBuZy1pZj1cIiEkbWRTdGVwcGVycy5pc0NvbXBsZXRlZChzdGVwTnVtYmVyKSAmJiAhJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlcilcIj57eyA6OnN0ZXBOdW1iZXIrMSB9fTwvc3Bhbj5cbiAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cIm1kLXN0ZXBwZXItaWNvbiBtZC1zdGVwcGVyLWljb24tZWRpdFwiIG5nLWlmPVwiJHN0ZXAuZWRpdGFibGVcIiBuZy1zaG93PVwiJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlcilcIj5lZGl0PC9tZC1pY29uPlxuICAgICAgICAgIDxtZC1pY29uIGNsYXNzPVwibWQtc3RlcHBlci1pY29uXCIgbmctaWY9XCIkbWRTdGVwcGVycy5pc0NvbXBsZXRlZChzdGVwTnVtYmVyKSAmJiAhJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlcilcIj5jaGVjazwvbWQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXItdGl0bGVcIj5cbiAgICAgICAgICA8c3Bhbj57eyAkc3RlcC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICA8c21hbGwgbmctaWY9XCIkc3RlcC5vcHRpb25hbFwiPnt7ICRzdGVwLm9wdGlvbmFsIH19PC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgYDtcbiAgbGV0ICRzdGVwcGVyc0hlYWRlciA9IGA8bWQtc3RlcHBlcnMtaGVhZGVyIGNsYXNzPVwibWQtc3RlcHBlcnMtaGVhZGVyXCI+JHskc3RlcHBlcnNDb250ZW50fTwvbWQtc3RlcHBlcnMtaGVhZGVyPmA7XG4gIGxldCAkc3RlcHBlcnNBY3Rpb25zID0gJGVsZW1lbnQuZmluZCgnbWQtc3RlcHBlcnMtYWN0aW9ucycpLmRldGFjaCgpLmh0bWwoKTtcblxuICBpZiAoJGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ21kQ2FyZCcpKSB7XG4gICAgJHN0ZXBwZXJzSGVhZGVyID0gYDxtZC1jYXJkIGNsYXNzPVwibWQtc3RlcHBlcnMtaGVhZGVyXCI+JHskc3RlcHBlcnNDb250ZW50fTwvbWQtY2FyZD5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlcnNcIiBuZy1jbGFzcz1cInsgJ21kLXN0ZXBwZXJzLWxpbmVhcic6ICRtZFN0ZXBwZXJzLmxpbmVhciwgJ21kLXN0ZXBwZXJzLWFsdGVybmF0aXZlJzogJG1kU3RlcHBlcnMuYWx0ZXJuYXRpdmUgfVwiPlxuICAgICAgJHskc3RlcHBlcnNIZWFkZXJ9XG4gICAgICA8bWQtc3RlcHBlcnMtY29udGVudCBjbGFzcz1cIm1kLXN0ZXBwZXJzLWNvbnRlbnRcIj4keyRlbGVtZW50Lmh0bWwoKX08L21kLXN0ZXBwZXJzLWNvbnRlbnQ+XG4gICAgICA8bWQtc3RlcHBlcnMtYWN0aW9ucyBtZC1zdGVwcGVycy1zY29wZSBjbGFzcz1cIm1kLXN0ZXBwZXJzLWFjdGlvbnNcIj4keyRzdGVwcGVyc0FjdGlvbnN9PC9tZC1zdGVwcGVycy1hY3Rpb25zPlxuICAgIDwvZGl2PlxuICBgO1xuXG59XG4iXX0=
