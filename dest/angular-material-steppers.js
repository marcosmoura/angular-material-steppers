(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/marcosmoura/Projects/github/angular-material-steppers/src/main.js":[function(require,module,exports){
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

},{"./scripts/md-stepper":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-stepper/index.js","./scripts/md-steppers":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/index.js","./scripts/md-steppers-scope":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers-scope/index.js","./scripts/md-steppers/service.js":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/service.js"}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-stepper/index.js":[function(require,module,exports){
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

},{"./link":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-stepper/link.js","./template":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-stepper/template.js"}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-stepper/link.js":[function(require,module,exports){
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

},{}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-stepper/template.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element) {
  var $stepperParent = $element.parent();
  var stepperIndex = Array.prototype.indexOf.call($stepperParent[0].children, $element[0]);

  return "<div class=\"md-stepper\" ng-class=\"{ 'md-active': $mdStepper.isActive(" + stepperIndex + ") }\">" + $element.html() + "</div>";
};

},{}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers-scope/compile.js":[function(require,module,exports){
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

},{}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers-scope/index.js":[function(require,module,exports){
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

},{"./compile":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers-scope/compile.js"}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/controller.js":[function(require,module,exports){
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
};

},{}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/index.js":[function(require,module,exports){
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

},{"./controller":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/controller.js","./template":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/template.js"}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/service.js":[function(require,module,exports){
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

},{}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/template.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element, $attributes) {

  var $steppersContent = '\n    <button\n      class="md-stepper-indicator"\n      ng-repeat="(stepNumber, $step) in $mdSteppers.steps track by $index"\n      ng-class="{\n        \'md-active\': $mdSteppers.isActive(stepNumber),\n        \'md-completed\': $mdSteppers.isCompleted(stepNumber),\n        \'md-editable\': $step.editable && $mdSteppers.enableEditMode(stepNumber),\n        \'md-stepper-optional\': $step.optional\n      }"\n      ng-click="!$mdSteppers.linear && !$mdSteppers.isActive(stepNumber) && $mdSteppers.changeStep(stepNumber)"\n      md-ink-ripple="{{ $mdSteppers.hasInkRipple(stepNumber) }}">\n      <div class="md-stepper-indicator-wrapper">\n        <div class="md-stepper-number">\n          <span>{{ ::stepNumber+1 }}</span>\n          <md-icon class="md-stepper-icon md-stepper-icon-edit" ng-if="$step.editable" ng-show="$mdSteppers.enableEditMode(stepNumber)">edit</md-icon>\n        </div>\n\n        <div class="md-stepper-title">\n          <span>{{ $step.label }}</span>\n          <small ng-if="$step.optional">{{ $step.optional }}</small>\n        </div>\n      </div>\n    </button>\n  ';
  var $steppersHeader = '<md-steppers-header class="md-steppers-header">' + $steppersContent + '</md-steppers-header>';
  var $steppersActions = $element.find('md-steppers-actions').detach().html();

  if ($attributes.hasOwnProperty('mdCard')) {
    $steppersHeader = '<md-card class="md-steppers-header">' + $steppersContent + '</md-card>';
  }

  return '\n    <div class="md-steppers" ng-class="{ \'md-steppers-linear\': $mdSteppers.linear, \'md-steppers-alternative\': $mdSteppers.alternative }">\n      ' + $steppersHeader + '\n      <md-steppers-content class="md-steppers-content">' + $element.html() + '</md-steppers-content>\n      <md-steppers-actions md-steppers-scope class="md-steppers-actions">' + $steppersActions + '</md-steppers-actions>\n    </div>\n  ';
};

},{}]},{},["/Users/marcosmoura/Projects/github/angular-material-steppers/src/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXIvaW5kZXguanMiLCJzcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2xpbmsuanMiLCJzcmMvc2NyaXB0cy9tZC1zdGVwcGVyL3RlbXBsYXRlLmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMtc2NvcGUvY29tcGlsZS5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzLXNjb3BlL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvY29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL3RlbXBsYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsQ0FBQyxVQUFDLE9BQUQsRUFBYTs7QUFFWixVQUNHLE1BREgsQ0FDVSwyQkFEVixFQUN1QyxDQUNuQyxXQURtQyxFQUVuQyxZQUZtQyxDQUR2QyxFQUtHLFNBTEgsQ0FLYSxxQkFBVyxJQUFYLEVBQWlCLHFCQUFXLFNBQVgsQ0FMOUIsQ0FNRyxTQU5ILENBTWEsb0JBQVUsSUFBVixFQUFnQixvQkFBVSxTQUFWLENBTjdCLENBT0csU0FQSCxDQU9hLDBCQUFnQixJQUFoQixFQUFzQiwwQkFBZ0IsU0FBaEIsQ0FQbkMsQ0FRRyxPQVJILENBUVcsa0JBQWlCLElBQWpCLEVBQXVCLGtCQUFpQixPQUFqQixDQVJsQyxDQUZZO0NBQWIsQ0FBRCxDQVlHLE9BWkg7Ozs7Ozs7OztBQ0xBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksWUFBWSxXQUFaOztBQUVKLElBQUksWUFBWSxTQUFaLFNBQVksR0FBTTs7QUFFcEIsU0FBTztBQUNMLGNBQVUsR0FBVjtBQUNBLGFBQVMsYUFBVDtBQUNBLFdBQU87QUFDTCxhQUFPLFVBQVA7QUFDQSxnQkFBVSxhQUFWO0FBQ0EsZ0JBQVUsY0FBVjtLQUhGO0FBS0Esd0JBUks7QUFTTCxnQ0FUSztHQUFQLENBRm9CO0NBQU47O2tCQWdCRDtBQUNiLFFBQU0sU0FBTjtBQUNBLHNCQUZhOzs7Ozs7Ozs7O2tCQ3JCQSxVQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMkIsV0FBM0IsRUFBd0MsV0FBeEMsRUFBcUQ7O0FBRWxFLFNBQU8sVUFBUCxHQUFvQixFQUFwQixDQUZrRTs7QUFJbEUsY0FBWSxPQUFaLENBQW9CO0FBQ2xCLFdBQU8sT0FBTyxLQUFQO0FBQ1AsY0FBVSxPQUFPLFFBQVAsSUFBbUIsT0FBTyxjQUFQLENBQXNCLFVBQXRCLENBQW5CO0FBQ1YsY0FBVSxPQUFPLFFBQVA7R0FIWixFQUprRTs7QUFVbEUsY0FBWSxTQUFaLENBQXNCLENBQXRCLEVBVmtFOztBQVlsRSxTQUFPLFVBQVAsQ0FBa0IsUUFBbEIsR0FBNkIsVUFBQyxLQUFELEVBQVc7QUFDdEMsV0FBTyxZQUFZLFFBQVosQ0FBcUIsS0FBckIsQ0FBUCxDQURzQztHQUFYLENBWnFDO0NBQXJEOzs7Ozs7Ozs7a0JDQUEsVUFBUyxRQUFULEVBQW1CO0FBQ2hDLE1BQUksaUJBQWlCLFNBQVMsTUFBVCxFQUFqQixDQUQ0QjtBQUVoQyxNQUFJLGVBQWUsTUFBTSxTQUFOLENBQWdCLE9BQWhCLENBQXdCLElBQXhCLENBQTZCLGVBQWUsQ0FBZixFQUFrQixRQUFsQixFQUE0QixTQUFTLENBQVQsQ0FBekQsQ0FBZixDQUY0Qjs7QUFJaEMsc0ZBQStFLDBCQUFvQixTQUFTLElBQVQsYUFBbkcsQ0FKZ0M7Q0FBbkI7Ozs7Ozs7OztrQkNBQSxVQUFTLFdBQVQsRUFBc0IsY0FBdEIsRUFBc0MsV0FBdEMsRUFBbUQ7QUFDaEUsU0FBTyxTQUFTLFFBQVQsQ0FBa0IsTUFBbEIsRUFBMEIsUUFBMUIsRUFBb0M7QUFDekMsUUFBSSxjQUFjLE1BQWQsQ0FEcUM7QUFFekMsUUFBSSxXQUFXLFlBQVksT0FBWixDQUFvQixJQUFwQixFQUFYLENBRnFDOztBQUl6QyxhQUFTLE1BQVQsR0FBa0IsT0FBTyxNQUFQLENBSnVCOztBQU16QyxXQUFPLE1BQVAsQ0FBYyxRQUFkLEVBQXdCLFVBQVMsS0FBVCxFQUFnQjtBQUN0QyxlQUFTLE1BQVQsR0FBa0IsS0FBbEIsQ0FEc0M7S0FBaEIsQ0FBeEIsQ0FOeUM7O0FBVXpDLFFBQUksaUJBQWlCLEtBQWpCLENBVnFDO0FBV3pDLFFBQUksb0JBQW9CLEtBQXBCLENBWHFDOztBQWF6QyxXQUFPLE1BQVAsQ0FBYyxZQUFXO0FBQ3ZCLFVBQUkscUJBQXFCLGNBQXJCLEVBQXFDO0FBQ3ZDLGVBRHVDO09BQXpDOztBQUlBLHVCQUFpQixJQUFqQixDQUx1QjtBQU12QixhQUFPLFlBQVAsQ0FBb0IsWUFBVztBQUM3QixZQUFJLENBQUMsaUJBQUQsRUFBb0I7QUFDdEIsbUJBQVMsT0FBVCxHQURzQjtTQUF4Qjs7QUFJQSx5QkFBaUIsb0JBQW9CLEtBQXBCLENBTFk7T0FBWCxDQUFwQixDQU51QjtLQUFYLENBQWQsQ0FieUM7O0FBNEJ6QyxhQUFTLE1BQVQsQ0FBZ0IsWUFBVztBQUN6QiwwQkFBb0IsSUFBcEIsQ0FEeUI7S0FBWCxDQUFoQixDQTVCeUM7O0FBZ0N6QyxnQkFBWSxRQUFaLEVBQXNCLFVBQVMsS0FBVCxFQUFnQjtBQUNwQyxlQUFTLEtBQVQsQ0FBZSxLQUFmLEVBRG9DO0tBQWhCLENBQXRCLENBaEN5QztHQUFwQyxDQUR5RDtDQUFuRDs7Ozs7Ozs7O0FDQWY7Ozs7OztBQUVBLElBQUksWUFBWSxpQkFBWjs7QUFFSixJQUFJLFlBQVksU0FBWixTQUFZLEdBQU07O0FBRXBCLFNBQU87QUFDTCxjQUFVLElBQVY7QUFDQSw4QkFGSztBQUdMLGNBQVUsSUFBVjtBQUNBLGdCQUFZLFNBQVo7R0FKRixDQUZvQjtDQUFOOztrQkFXRDtBQUNiLFFBQU0sU0FBTjtBQUNBLHNCQUZhOzs7Ozs7Ozs7O2tCQ2ZBLFVBQVMsTUFBVCxFQUFpQixTQUFqQixFQUE0QixRQUE1QixFQUFzQyxXQUF0QyxFQUFtRCxPQUFuRCxFQUE0RDs7O0FBRXpFLE9BQUssS0FBTCxHQUFhLEVBQWIsQ0FGeUU7QUFHekUsT0FBSyxVQUFMLEdBQWtCLENBQWxCLENBSHlFOztBQUt6RSxPQUFLLE9BQUwsR0FBZSxVQUFDLElBQUQsRUFBVTtBQUN2QixVQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLElBQWhCLEVBRHVCO0dBQVYsQ0FMMEQ7O0FBU3pFLE9BQUssUUFBTCxHQUFnQixVQUFDLFVBQUQsRUFBZ0I7QUFDOUIsUUFBSSxlQUFlLE1BQUssVUFBTCxFQUFpQjtBQUNsQyxhQUFPLElBQVAsQ0FEa0M7S0FBcEM7O0FBSUEsV0FBTyxLQUFQLENBTDhCO0dBQWhCLENBVHlEOztBQWlCekUsT0FBSyxZQUFMLEdBQW9CLFVBQUMsVUFBRCxFQUFnQjtBQUNsQyxRQUFJLE1BQUssTUFBTCxJQUFlLGVBQWUsTUFBSyxVQUFMLEVBQWlCO0FBQ2pELGFBQU8sS0FBUCxDQURpRDtLQUFuRDs7QUFJQSxXQUFPLElBQVAsQ0FMa0M7R0FBaEIsQ0FqQnFEOztBQXlCekUsT0FBSyxTQUFMLEdBQWlCLFVBQUMsVUFBRCxFQUFnQjtBQUMvQixRQUFJLG1CQUFtQixRQUFRLE9BQVIsQ0FBZ0IsVUFBVSxDQUFWLEVBQWEsYUFBYixDQUEyQixzQkFBM0IsQ0FBaEIsQ0FBbkIsQ0FEMkI7QUFFL0IsUUFBSSxXQUFXLFFBQVEsT0FBUixDQUFnQixVQUFVLENBQVYsRUFBYSxnQkFBYixDQUE4QixhQUE5QixFQUE2QyxVQUE3QyxDQUFoQixDQUFYLENBRjJCOztBQUkvQixVQUFLLFVBQUwsR0FBa0IsVUFBbEIsQ0FKK0I7O0FBTS9CLGdCQUFZLGdCQUFaLEVBQThCO0FBQzVCLFlBQU0sRUFBRSxRQUFRLGlCQUFpQixDQUFqQixFQUFvQixZQUFwQixHQUFtQyxJQUFuQyxFQUFoQjtBQUNBLFVBQUksRUFBRSxRQUFRLFNBQVMsSUFBVCxDQUFjLGNBQWQsSUFBZ0MsSUFBaEMsRUFBZDtBQUNBLGNBQVEsOEJBQVI7QUFDQSxnQkFBVSxHQUFWO0tBSkYsRUFLRyxLQUxILEdBS1csSUFMWCxDQUtnQixZQUFNO0FBQ3BCLHVCQUFpQixHQUFqQixDQUFxQjtBQUNuQixvQkFBWSxNQUFaO0FBQ0EsZ0JBQVEsRUFBUjtPQUZGLEVBRG9COztBQU1wQixjQUFRLFFBQVIsQ0FBaUIsWUFBVztBQUMxQix5QkFBaUIsR0FBakIsQ0FBcUIsWUFBckIsRUFBbUMsRUFBbkMsRUFEMEI7T0FBWCxDQUFqQixDQU5vQjtLQUFOLENBTGhCLENBTitCO0dBQWhCLENBekJ3RDs7QUFnRHpFLE9BQUssWUFBTCxHQUFvQixVQUFDLFVBQUQsRUFBZ0I7QUFDbEMsWUFBUSxHQUFSLENBQVksV0FBWixFQUF5QixVQUF6QixFQURrQztHQUFoQixDQWhEcUQ7O0FBb0R6RSxPQUFLLFVBQUwsR0FBa0IsVUFBQyxVQUFELEVBQWdCO0FBQ2hDLFVBQUssU0FBTCxDQUFlLFVBQWYsRUFEZ0M7R0FBaEIsQ0FwRHVEO0NBQTVEOzs7Ozs7Ozs7QUNBZjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFlBQVksWUFBWjs7QUFFSixJQUFJLFlBQVksU0FBWixTQUFZLENBQUMsb0JBQUQsRUFBdUIsSUFBdkIsRUFBZ0M7O0FBRTlDLFNBQU87QUFDTCxjQUFVLEdBQVY7QUFDQSxXQUFPO0FBQ0wsWUFBTSxVQUFOO0FBQ0EsY0FBUSxZQUFSO0FBQ0EsbUJBQWEsaUJBQWI7S0FIRjtBQUtBLGdDQVBLO0FBUUwsVUFBTSxjQUFDLE1BQUQsRUFBUyxRQUFULEVBQW1CLFdBQW5CLEVBQWdDLFdBQWhDLEVBQWdEO0FBQ3BELFVBQUksQ0FBQyxZQUFZLEVBQVosRUFBZ0I7QUFDbkIsYUFBSyxJQUFMLENBQVUsOENBQVYsRUFEbUI7T0FBckI7O0FBSUEsMkJBQXFCLFFBQXJCLENBQThCO0FBQzVCLG9CQUFZLFlBQVksVUFBWjtBQUNaLHNCQUFjLFlBQVksWUFBWjtBQUNkLGtCQUFVLFlBQVksUUFBWjtPQUhaLEVBSUcsWUFBWSxFQUFaLENBSkgsQ0FMb0Q7S0FBaEQ7QUFXTixvQ0FuQks7QUFvQkwsd0JBQWtCLFNBQWxCO0FBQ0Esc0JBQWtCLElBQWxCO0dBckJGLENBRjhDO0NBQWhDOztrQkE0QkQ7QUFDYixRQUFNLFNBQU47QUFDQSxzQkFGYTs7Ozs7Ozs7O0FDakNmLElBQUksVUFBVSxTQUFWLE9BQVUsQ0FBQyxvQkFBRCxFQUEwQjtBQUN0QyxTQUFPLFVBQVMsTUFBVCxFQUFpQjtBQUN0QixRQUFJLFdBQVcscUJBQXFCLEdBQXJCLENBQXlCLE1BQXpCLENBQVgsQ0FEa0I7O0FBR3RCLFFBQUksQ0FBQyxRQUFELEVBQVc7QUFDYiwyQkFBcUIsYUFBckIsQ0FBbUMsTUFBbkMsRUFEYTtLQUFmOztBQUlBLFdBQU8sUUFBUCxDQVBzQjtHQUFqQixDQUQrQjtDQUExQjs7a0JBWUM7QUFDYixRQUFNLGFBQU47QUFDQSxrQkFGYTs7Ozs7Ozs7OztrQkNaQSxVQUFTLFFBQVQsRUFBbUIsV0FBbkIsRUFBZ0M7O0FBRTdDLE1BQUksNmxDQUFKLENBRjZDO0FBMkI3QyxNQUFJLHNFQUFvRSwwQ0FBcEUsQ0EzQnlDO0FBNEI3QyxNQUFJLG1CQUFtQixTQUFTLElBQVQsQ0FBYyxxQkFBZCxFQUFxQyxNQUFyQyxHQUE4QyxJQUE5QyxFQUFuQixDQTVCeUM7O0FBOEI3QyxNQUFJLFlBQVksY0FBWixDQUEyQixRQUEzQixDQUFKLEVBQTBDO0FBQ3hDLCtEQUF5RCwrQkFBekQsQ0FEd0M7R0FBMUM7O0FBSUEscUtBRU0sZ0ZBQ2lELFNBQVMsSUFBVCwyR0FDa0IsMkRBSnpFLENBbEM2QztDQUFoQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgbWRTdGVwcGVycyBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMnO1xuaW1wb3J0IG1kU3RlcHBlciBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcic7XG5pbXBvcnQgbWRTdGVwcGVyc1Njb3BlIGZyb20gJy4vc2NyaXB0cy9tZC1zdGVwcGVycy1zY29wZSc7XG5pbXBvcnQgbWRTdGVwcGVyU2VydmljZSBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMvc2VydmljZS5qcyc7XG5cbigoYW5ndWxhcikgPT4ge1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhbmd1bGFyLW1hdGVyaWFsLXN0ZXBwZXJzJywgW1xuICAgICAgJ25nQW5pbWF0ZScsXG4gICAgICAnbmdNYXRlcmlhbCdcbiAgICBdKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVycy5uYW1lLCBtZFN0ZXBwZXJzLmRpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKG1kU3RlcHBlci5uYW1lLCBtZFN0ZXBwZXIuZGlyZWN0aXZlKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVyc1Njb3BlLm5hbWUsIG1kU3RlcHBlcnNTY29wZS5kaXJlY3RpdmUpXG4gICAgLmZhY3RvcnkobWRTdGVwcGVyU2VydmljZS5uYW1lLCBtZFN0ZXBwZXJTZXJ2aWNlLnNlcnZpY2UpO1xuXG59KShhbmd1bGFyKTtcbiIsImltcG9ydCBsaW5rIGZyb20gJy4vbGluayc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVyJztcblxubGV0IGRpcmVjdGl2ZSA9ICgpID0+IHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgcmVxdWlyZTogJ15tZFN0ZXBwZXJzJyxcbiAgICBzY29wZToge1xuICAgICAgbGFiZWw6ICdAbWRMYWJlbCcsXG4gICAgICBlZGl0YWJsZTogJz1tZEVkaXRhYmxlJyxcbiAgICAgIG9wdGlvbmFsOiAnQD9tZE9wdGlvbmFsJ1xuICAgIH0sXG4gICAgbGluayxcbiAgICB0ZW1wbGF0ZVxuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IGNvbXBvbmVudCxcbiAgZGlyZWN0aXZlXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHNjb3BlLCAkZWxlbWVudCwgJGF0dHJpYnV0ZXMsICRjb250cm9sbGVyKSB7XG5cbiAgJHNjb3BlLiRtZFN0ZXBwZXIgPSB7fTtcblxuICAkY29udHJvbGxlci5hZGRTdGVwKHtcbiAgICBsYWJlbDogJHNjb3BlLmxhYmVsLFxuICAgIGVkaXRhYmxlOiAkc2NvcGUuZWRpdGFibGUgfHwgJHNjb3BlLmhhc093blByb3BlcnR5KCdlZGl0YWJsZScpLFxuICAgIG9wdGlvbmFsOiAkc2NvcGUub3B0aW9uYWxcbiAgfSk7XG5cbiAgJGNvbnRyb2xsZXIuc2V0QWN0aXZlKDApO1xuXG4gICRzY29wZS4kbWRTdGVwcGVyLmlzQWN0aXZlID0gKGluZGV4KSA9PiB7XG4gICAgcmV0dXJuICRjb250cm9sbGVyLmlzQWN0aXZlKGluZGV4KTtcbiAgfTtcblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQpIHtcbiAgbGV0ICRzdGVwcGVyUGFyZW50ID0gJGVsZW1lbnQucGFyZW50KCk7XG4gIGxldCBzdGVwcGVySW5kZXggPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKCRzdGVwcGVyUGFyZW50WzBdLmNoaWxkcmVuLCAkZWxlbWVudFswXSk7XG5cbiAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlclwiIG5nLWNsYXNzPVwieyAnbWQtYWN0aXZlJzogJG1kU3RlcHBlci5pc0FjdGl2ZSgke3N0ZXBwZXJJbmRleH0pIH1cIj4keyRlbGVtZW50Lmh0bWwoKX08L2Rpdj5gO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJHRvcEVsZW1lbnQsICR0b3BBdHRyaWJ1dGVzLCAkdHJhbnNjbHVkZSkge1xuICByZXR1cm4gZnVuY3Rpb24gcG9zdExpbmsoJHNjb3BlLCAkZWxlbWVudCkge1xuICAgIGxldCAkY29udHJvbGxlciA9ICRzY29wZTtcbiAgICBsZXQgbmV3U2NvcGUgPSAkY29udHJvbGxlci4kcGFyZW50LiRuZXcoKTtcblxuICAgIG5ld1Njb3BlLiRpbmRleCA9ICRzY29wZS4kaW5kZXg7XG5cbiAgICAkc2NvcGUuJHdhdGNoKCckaW5kZXgnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgbmV3U2NvcGUuJGluZGV4ID0gdmFsdWU7XG4gICAgfSk7XG5cbiAgICBsZXQgc2NvcGVEaWdlc3RpbmcgPSBmYWxzZTtcbiAgICBsZXQgbmV3U2NvcGVEaWdlc3RpbmcgPSBmYWxzZTtcblxuICAgICRzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICBpZiAobmV3U2NvcGVEaWdlc3RpbmcgfHwgc2NvcGVEaWdlc3RpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzY29wZURpZ2VzdGluZyA9IHRydWU7XG4gICAgICAkc2NvcGUuJCRwb3N0RGlnZXN0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIW5ld1Njb3BlRGlnZXN0aW5nKSB7XG4gICAgICAgICAgbmV3U2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2NvcGVEaWdlc3RpbmcgPSBuZXdTY29wZURpZ2VzdGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBuZXdTY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICBuZXdTY29wZURpZ2VzdGluZyA9IHRydWU7XG4gICAgfSk7XG5cbiAgICAkdHJhbnNjbHVkZShuZXdTY29wZSwgZnVuY3Rpb24oY2xvbmUpIHtcbiAgICAgICRlbGVtZW50LmFmdGVyKGNsb25lKTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsImltcG9ydCBjb21waWxlIGZyb20gJy4vY29tcGlsZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVyc1Njb3BlJztcblxubGV0IGRpcmVjdGl2ZSA9ICgpID0+IHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIGNvbXBpbGU6IGNvbXBpbGUsXG4gICAgdGVybWluYWw6IHRydWUsXG4gICAgdHJhbnNjbHVkZTogJ2VsZW1lbnQnXG4gIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogY29tcG9uZW50LFxuICBkaXJlY3RpdmVcbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigkc2NvcGUsICRkb2N1bWVudCwgJGVsZW1lbnQsICRhbmltYXRlQ3NzLCAkbWRVdGlsKSB7XG5cbiAgdGhpcy5zdGVwcyA9IFtdO1xuICB0aGlzLnN0ZXBBY3RpdmUgPSAwO1xuXG4gIHRoaXMuYWRkU3RlcCA9IChzdGVwKSA9PiB7XG4gICAgdGhpcy5zdGVwcy5wdXNoKHN0ZXApO1xuICB9O1xuXG4gIHRoaXMuaXNBY3RpdmUgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGlmIChzdGVwTnVtYmVyID09PSB0aGlzLnN0ZXBBY3RpdmUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICB0aGlzLmhhc0lua1JpcHBsZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHRoaXMubGluZWFyIHx8IHN0ZXBOdW1iZXIgPT09IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHRoaXMuc2V0QWN0aXZlID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBsZXQgJHN0ZXBwZXJzQ29udGVudCA9IGFuZ3VsYXIuZWxlbWVudCgkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLm1kLXN0ZXBwZXJzLWNvbnRlbnQnKSk7XG4gICAgbGV0ICRzdGVwcGVyID0gYW5ndWxhci5lbGVtZW50KCRkb2N1bWVudFswXS5xdWVyeVNlbGVjdG9yQWxsKCcubWQtc3RlcHBlcicpW3N0ZXBOdW1iZXJdKTtcblxuICAgIHRoaXMuc3RlcEFjdGl2ZSA9IHN0ZXBOdW1iZXI7XG5cbiAgICAkYW5pbWF0ZUNzcygkc3RlcHBlcnNDb250ZW50LCB7XG4gICAgICBmcm9tOiB7IGhlaWdodDogJHN0ZXBwZXJzQ29udGVudFswXS5jbGllbnRIZWlnaHQgKyAncHgnIH0sXG4gICAgICB0bzogeyBoZWlnaHQ6ICRzdGVwcGVyLnByb3AoJ2NsaWVudEhlaWdodCcpICsgJ3B4JyB9LFxuICAgICAgZWFzaW5nOiAnY3ViaWMtYmV6aWVyKC4zNSwgMCwgLjI1LCAxKScsXG4gICAgICBkdXJhdGlvbjogMC40XG4gICAgfSkuc3RhcnQoKS5kb25lKCgpID0+IHtcbiAgICAgICRzdGVwcGVyc0NvbnRlbnQuY3NzKHtcbiAgICAgICAgdHJhbnNpdGlvbjogJ25vbmUnLFxuICAgICAgICBoZWlnaHQ6ICcnXG4gICAgICB9KTtcblxuICAgICAgJG1kVXRpbC5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJHN0ZXBwZXJzQ29udGVudC5jc3MoJ3RyYW5zaXRpb24nLCAnJyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcblxuICB0aGlzLnNldENvbXBsZXRlZCA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0NvbXBsZXRlZCcsIHN0ZXBOdW1iZXIpO1xuICB9O1xuXG4gIHRoaXMuY2hhbmdlU3RlcCA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zZXRBY3RpdmUoc3RlcE51bWJlcik7XG4gIH07XG5cbn1cbiIsImltcG9ydCBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVycyc7XG5cbmxldCBkaXJlY3RpdmUgPSAoJG1kQ29tcG9uZW50UmVnaXN0cnksICRsb2cpID0+IHtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnRScsXG4gICAgc2NvcGU6IHtcbiAgICAgIGNhcmQ6ICc9P21kQ2FyZCcsXG4gICAgICBsaW5lYXI6ICc9P21kTGluZWFyJyxcbiAgICAgIGFsdGVybmF0aXZlOiAnPT9tZEFsdGVybmF0aXZlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGUsXG4gICAgbGluazogKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyaWJ1dGVzLCAkY29udHJvbGxlcikgPT4ge1xuICAgICAgaWYgKCEkYXR0cmlidXRlcy5pZCkge1xuICAgICAgICAkbG9nLndhcm4oJ1lvdSBtdXN0IHNldCBhbiBpZCBhdHRyaWJ1dGUgdG8geW91ciBzdGVwcGVyJyk7XG4gICAgICB9XG5cbiAgICAgICRtZENvbXBvbmVudFJlZ2lzdHJ5LnJlZ2lzdGVyKHtcbiAgICAgICAgY2hhbmdlU3RlcDogJGNvbnRyb2xsZXIuY2hhbmdlU3RlcCxcbiAgICAgICAgc2V0Q29tcGxldGVkOiAkY29udHJvbGxlci5zZXRDb21wbGV0ZWQsXG4gICAgICAgIGlzQWN0aXZlOiAkY29udHJvbGxlci5pc0FjdGl2ZVxuICAgICAgfSwgJGF0dHJpYnV0ZXMuaWQpO1xuICAgIH0sXG4gICAgY29udHJvbGxlcixcbiAgICBjb250cm9sbGVyQXM6IGAkJHtjb21wb25lbnR9YCxcbiAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlXG4gIH07XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZTogY29tcG9uZW50LFxuICBkaXJlY3RpdmVcbn07XG4iLCJsZXQgc2VydmljZSA9ICgkbWRDb21wb25lbnRSZWdpc3RyeSkgPT4ge1xuICByZXR1cm4gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgbGV0IGluc3RhbmNlID0gJG1kQ29tcG9uZW50UmVnaXN0cnkuZ2V0KGhhbmRsZSk7XG5cbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICAkbWRDb21wb25lbnRSZWdpc3RyeS5ub3RGb3VuZEVycm9yKGhhbmRsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiAnJG1kU3RlcHBlcnMnLFxuICBzZXJ2aWNlXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsICRhdHRyaWJ1dGVzKSB7XG5cbiAgbGV0ICRzdGVwcGVyc0NvbnRlbnQgPSBgXG4gICAgPGJ1dHRvblxuICAgICAgY2xhc3M9XCJtZC1zdGVwcGVyLWluZGljYXRvclwiXG4gICAgICBuZy1yZXBlYXQ9XCIoc3RlcE51bWJlciwgJHN0ZXApIGluICRtZFN0ZXBwZXJzLnN0ZXBzIHRyYWNrIGJ5ICRpbmRleFwiXG4gICAgICBuZy1jbGFzcz1cIntcbiAgICAgICAgJ21kLWFjdGl2ZSc6ICRtZFN0ZXBwZXJzLmlzQWN0aXZlKHN0ZXBOdW1iZXIpLFxuICAgICAgICAnbWQtY29tcGxldGVkJzogJG1kU3RlcHBlcnMuaXNDb21wbGV0ZWQoc3RlcE51bWJlciksXG4gICAgICAgICdtZC1lZGl0YWJsZSc6ICRzdGVwLmVkaXRhYmxlICYmICRtZFN0ZXBwZXJzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIpLFxuICAgICAgICAnbWQtc3RlcHBlci1vcHRpb25hbCc6ICRzdGVwLm9wdGlvbmFsXG4gICAgICB9XCJcbiAgICAgIG5nLWNsaWNrPVwiISRtZFN0ZXBwZXJzLmxpbmVhciAmJiAhJG1kU3RlcHBlcnMuaXNBY3RpdmUoc3RlcE51bWJlcikgJiYgJG1kU3RlcHBlcnMuY2hhbmdlU3RlcChzdGVwTnVtYmVyKVwiXG4gICAgICBtZC1pbmstcmlwcGxlPVwie3sgJG1kU3RlcHBlcnMuaGFzSW5rUmlwcGxlKHN0ZXBOdW1iZXIpIH19XCI+XG4gICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1pbmRpY2F0b3Itd3JhcHBlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci1udW1iZXJcIj5cbiAgICAgICAgICA8c3Bhbj57eyA6OnN0ZXBOdW1iZXIrMSB9fTwvc3Bhbj5cbiAgICAgICAgICA8bWQtaWNvbiBjbGFzcz1cIm1kLXN0ZXBwZXItaWNvbiBtZC1zdGVwcGVyLWljb24tZWRpdFwiIG5nLWlmPVwiJHN0ZXAuZWRpdGFibGVcIiBuZy1zaG93PVwiJG1kU3RlcHBlcnMuZW5hYmxlRWRpdE1vZGUoc3RlcE51bWJlcilcIj5lZGl0PC9tZC1pY29uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlci10aXRsZVwiPlxuICAgICAgICAgIDxzcGFuPnt7ICRzdGVwLmxhYmVsIH19PC9zcGFuPlxuICAgICAgICAgIDxzbWFsbCBuZy1pZj1cIiRzdGVwLm9wdGlvbmFsXCI+e3sgJHN0ZXAub3B0aW9uYWwgfX08L3NtYWxsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuICBgO1xuICBsZXQgJHN0ZXBwZXJzSGVhZGVyID0gYDxtZC1zdGVwcGVycy1oZWFkZXIgY2xhc3M9XCJtZC1zdGVwcGVycy1oZWFkZXJcIj4keyRzdGVwcGVyc0NvbnRlbnR9PC9tZC1zdGVwcGVycy1oZWFkZXI+YDtcbiAgbGV0ICRzdGVwcGVyc0FjdGlvbnMgPSAkZWxlbWVudC5maW5kKCdtZC1zdGVwcGVycy1hY3Rpb25zJykuZGV0YWNoKCkuaHRtbCgpO1xuXG4gIGlmICgkYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSgnbWRDYXJkJykpIHtcbiAgICAkc3RlcHBlcnNIZWFkZXIgPSBgPG1kLWNhcmQgY2xhc3M9XCJtZC1zdGVwcGVycy1oZWFkZXJcIj4keyRzdGVwcGVyc0NvbnRlbnR9PC9tZC1jYXJkPmA7XG4gIH1cblxuICByZXR1cm4gYFxuICAgIDxkaXYgY2xhc3M9XCJtZC1zdGVwcGVyc1wiIG5nLWNsYXNzPVwieyAnbWQtc3RlcHBlcnMtbGluZWFyJzogJG1kU3RlcHBlcnMubGluZWFyLCAnbWQtc3RlcHBlcnMtYWx0ZXJuYXRpdmUnOiAkbWRTdGVwcGVycy5hbHRlcm5hdGl2ZSB9XCI+XG4gICAgICAkeyRzdGVwcGVyc0hlYWRlcn1cbiAgICAgIDxtZC1zdGVwcGVycy1jb250ZW50IGNsYXNzPVwibWQtc3RlcHBlcnMtY29udGVudFwiPiR7JGVsZW1lbnQuaHRtbCgpfTwvbWQtc3RlcHBlcnMtY29udGVudD5cbiAgICAgIDxtZC1zdGVwcGVycy1hY3Rpb25zIG1kLXN0ZXBwZXJzLXNjb3BlIGNsYXNzPVwibWQtc3RlcHBlcnMtYWN0aW9uc1wiPiR7JHN0ZXBwZXJzQWN0aW9uc308L21kLXN0ZXBwZXJzLWFjdGlvbnM+XG4gICAgPC9kaXY+XG4gIGA7XG5cbn1cbiJdfQ==
