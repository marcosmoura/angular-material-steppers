(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/marcosmoura/Projects/github/angular-material-steppers/src/main.js":[function(require,module,exports){
'use strict';

var _mdSteppers = require('./scripts/md-steppers');

var _mdSteppers2 = _interopRequireDefault(_mdSteppers);

var _mdStepper = require('./scripts/md-stepper');

var _mdStepper2 = _interopRequireDefault(_mdStepper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (angular) {

  angular.module('angular-material-steppers', ['ngAnimate', 'ngMaterial']).directive(_mdSteppers2.default.name, _mdSteppers2.default.directive).directive(_mdStepper2.default.name, _mdStepper2.default.directive);
})(angular);

},{"./scripts/md-stepper":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-stepper/index.js","./scripts/md-steppers":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/index.js"}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-stepper/index.js":[function(require,module,exports){
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

},{}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/controller.js":[function(require,module,exports){
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

var directive = function directive() {

  return {
    restrict: 'E',
    scope: {
      card: '=?mdCard',
      linear: '=?mdLinear',
      alternative: '=?mdAlternative'
    },
    template: _template2.default,
    controller: _controller2.default,
    controllerAs: '$' + component,
    bindToController: true
  };
};

exports.default = {
  name: component,
  directive: directive
};

},{"./controller":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/controller.js","./template":"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/template.js"}],"/Users/marcosmoura/Projects/github/angular-material-steppers/src/scripts/md-steppers/template.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function ($element, $attributes) {

  var $steppersContent = '\n    <button class="md-stepper-indicator"\n      ng-repeat="(stepNumber, $step) in $mdSteppers.steps"\n      ng-class="{\n        \'md-active\': $mdSteppers.isActive(stepNumber),\n        \'md-completed\': $mdSteppers.isCompleted(stepNumber),\n        \'md-editable\': $step.editable && $mdSteppers.enableEditMode(stepNumber),\n        \'md-stepper-optional\': $step.optional\n      }"\n      ng-click="!$mdSteppers.linear && !$mdSteppers.isActive(stepNumber) && $mdSteppers.changeStep(stepNumber)"\n      md-ink-ripple="{{ $mdSteppers.hasInkRipple(stepNumber) }}">\n      <div class="md-stepper-indicator-wrapper">\n        <div class="md-stepper-number">\n          <span>{{ ::stepNumber+1 }}</span>\n          <md-icon class="md-stepper-icon md-stepper-icon-edit" ng-if="$step.editable" ng-show="$mdSteppers.enableEditMode(stepNumber)">edit</md-icon>\n        </div>\n\n        <div class="md-stepper-title">\n          <span>{{ $step.label }}</span>\n          <small ng-if="$step.optional">{{ $step.optional }}</small>\n        </div>\n      </div>\n    </button>\n  ';
  var $steppersHeader = '<md-steppers-header class="md-steppers-header">' + $steppersContent + '</md-steppers-header>';
  var $steppersActions = $element.find('md-steppers-actions').detach().html();

  if ($attributes.hasOwnProperty('mdCard')) {
    $steppersHeader = '<md-card class="md-steppers-header">' + $steppersContent + '</md-card>';
  }

  return '\n    <div class="md-steppers" ng-class="{ \'md-steppers-linear\': $mdSteppers.linear, \'md-steppers-alternative\': $mdSteppers.alternative }">\n      ' + $steppersHeader + '\n      <md-steppers-content class="md-steppers-content">' + $element.html() + '</md-steppers-content>\n      <md-steppers-actions class="md-steppers-actions">' + $steppersActions + '</md-steppers-actions>\n    </div>\n  ';
};

},{}]},{},["/Users/marcosmoura/Projects/github/angular-material-steppers/src/main.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXIvaW5kZXguanMiLCJzcmMvc2NyaXB0cy9tZC1zdGVwcGVyL2xpbmsuanMiLCJzcmMvc2NyaXB0cy9tZC1zdGVwcGVyL3RlbXBsYXRlLmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvY29udHJvbGxlci5qcyIsInNyYy9zY3JpcHRzL21kLXN0ZXBwZXJzL2luZGV4LmpzIiwic3JjL3NjcmlwdHMvbWQtc3RlcHBlcnMvdGVtcGxhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0E7Ozs7OztBQUVBLENBQUMsVUFBQyxPQUFELEVBQWE7O0FBRVosVUFDRyxNQURILENBQ1UsMkJBRFYsRUFDdUMsQ0FDbkMsV0FEbUMsRUFFbkMsWUFGbUMsQ0FEdkMsRUFLRyxTQUxILENBS2EscUJBQVcsSUFBWCxFQUFpQixxQkFBVyxTQUFYLENBTDlCLENBTUcsU0FOSCxDQU1hLG9CQUFVLElBQVYsRUFBZ0Isb0JBQVUsU0FBVixDQU43QixDQUZZO0NBQWIsQ0FBRCxDQVVHLE9BVkg7Ozs7Ozs7OztBQ0hBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQUksWUFBWSxXQUFaOztBQUVKLElBQUksWUFBWSxTQUFaLFNBQVksR0FBTTs7QUFFcEIsU0FBTztBQUNMLGNBQVUsR0FBVjtBQUNBLGFBQVMsYUFBVDtBQUNBLFdBQU87QUFDTCxhQUFPLFVBQVA7QUFDQSxnQkFBVSxhQUFWO0FBQ0EsZ0JBQVUsY0FBVjtLQUhGO0FBS0Esd0JBUks7QUFTTCxnQ0FUSztHQUFQLENBRm9CO0NBQU47O2tCQWdCRDtBQUNiLFFBQU0sU0FBTjtBQUNBLHNCQUZhOzs7Ozs7Ozs7O2tCQ3JCQSxVQUFTLE1BQVQsRUFBaUIsUUFBakIsRUFBMkIsV0FBM0IsRUFBd0MsV0FBeEMsRUFBcUQ7O0FBRWxFLFNBQU8sVUFBUCxHQUFvQixF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Zjs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJLFlBQVksWUFBWjs7QUFFSixJQUFJLFlBQVksU0FBWixTQUFZLEdBQU07O0FBRXBCLFNBQU87QUFDTCxjQUFVLEdBQVY7QUFDQSxXQUFPO0FBQ0wsWUFBTSxVQUFOO0FBQ0EsY0FBUSxZQUFSO0FBQ0EsbUJBQWEsaUJBQWI7S0FIRjtBQUtBLGdDQVBLO0FBUUwsb0NBUks7QUFTTCx3QkFBa0IsU0FBbEI7QUFDQSxzQkFBa0IsSUFBbEI7R0FWRixDQUZvQjtDQUFOOztrQkFpQkQ7QUFDYixRQUFNLFNBQU47QUFDQSxzQkFGYTs7Ozs7Ozs7OztrQkN0QkEsVUFBUyxRQUFULEVBQW1CLFdBQW5CLEVBQWdDOztBQUU3QyxNQUFJLHNrQ0FBSixDQUY2QztBQTBCN0MsTUFBSSxzRUFBb0UsMENBQXBFLENBMUJ5QztBQTJCN0MsTUFBSSxtQkFBbUIsU0FBUyxJQUFULENBQWMscUJBQWQsRUFBcUMsTUFBckMsR0FBOEMsSUFBOUMsRUFBbkIsQ0EzQnlDOztBQTZCN0MsTUFBSSxZQUFZLGNBQVosQ0FBMkIsUUFBM0IsQ0FBSixFQUEwQztBQUN4QywrREFBeUQsK0JBQXpELENBRHdDO0dBQTFDOztBQUlBLHFLQUVNLGdGQUNpRCxTQUFTLElBQVQseUZBQ0EsMkRBSnZELENBakM2QztDQUFoQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgbWRTdGVwcGVycyBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcnMnO1xuaW1wb3J0IG1kU3RlcHBlciBmcm9tICcuL3NjcmlwdHMvbWQtc3RlcHBlcic7XG5cbigoYW5ndWxhcikgPT4ge1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhbmd1bGFyLW1hdGVyaWFsLXN0ZXBwZXJzJywgW1xuICAgICAgJ25nQW5pbWF0ZScsXG4gICAgICAnbmdNYXRlcmlhbCdcbiAgICBdKVxuICAgIC5kaXJlY3RpdmUobWRTdGVwcGVycy5uYW1lLCBtZFN0ZXBwZXJzLmRpcmVjdGl2ZSlcbiAgICAuZGlyZWN0aXZlKG1kU3RlcHBlci5uYW1lLCBtZFN0ZXBwZXIuZGlyZWN0aXZlKTtcblxufSkoYW5ndWxhcik7XG4iLCJpbXBvcnQgbGluayBmcm9tICcuL2xpbmsnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vdGVtcGxhdGUnO1xuXG5sZXQgY29tcG9uZW50ID0gJ21kU3RlcHBlcic7XG5cbmxldCBkaXJlY3RpdmUgPSAoKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHJlcXVpcmU6ICdebWRTdGVwcGVycycsXG4gICAgc2NvcGU6IHtcbiAgICAgIGxhYmVsOiAnQG1kTGFiZWwnLFxuICAgICAgZWRpdGFibGU6ICc9bWRFZGl0YWJsZScsXG4gICAgICBvcHRpb25hbDogJ0A/bWRPcHRpb25hbCdcbiAgICB9LFxuICAgIGxpbmssXG4gICAgdGVtcGxhdGVcbiAgfTtcblxufTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lOiBjb21wb25lbnQsXG4gIGRpcmVjdGl2ZVxufTtcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRzY29wZSwgJGVsZW1lbnQsICRhdHRyaWJ1dGVzLCAkY29udHJvbGxlcikge1xuXG4gICRzY29wZS4kbWRTdGVwcGVyID0ge307XG5cbiAgJGNvbnRyb2xsZXIuYWRkU3RlcCh7XG4gICAgbGFiZWw6ICRzY29wZS5sYWJlbCxcbiAgICBlZGl0YWJsZTogJHNjb3BlLmVkaXRhYmxlIHx8ICRzY29wZS5oYXNPd25Qcm9wZXJ0eSgnZWRpdGFibGUnKSxcbiAgICBvcHRpb25hbDogJHNjb3BlLm9wdGlvbmFsXG4gIH0pO1xuXG4gICRjb250cm9sbGVyLnNldEFjdGl2ZSgwKTtcblxuICAkc2NvcGUuJG1kU3RlcHBlci5pc0FjdGl2ZSA9IChpbmRleCkgPT4ge1xuICAgIHJldHVybiAkY29udHJvbGxlci5pc0FjdGl2ZShpbmRleCk7XG4gIH07XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRlbGVtZW50KSB7XG4gIGxldCAkc3RlcHBlclBhcmVudCA9ICRlbGVtZW50LnBhcmVudCgpO1xuICBsZXQgc3RlcHBlckluZGV4ID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbCgkc3RlcHBlclBhcmVudFswXS5jaGlsZHJlbiwgJGVsZW1lbnRbMF0pO1xuXG4gIHJldHVybiBgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXJcIiBuZy1jbGFzcz1cInsgJ21kLWFjdGl2ZSc6ICRtZFN0ZXBwZXIuaXNBY3RpdmUoJHtzdGVwcGVySW5kZXh9KSB9XCI+JHskZWxlbWVudC5odG1sKCl9PC9kaXY+YDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCRzY29wZSwgJGRvY3VtZW50LCAkZWxlbWVudCwgJGFuaW1hdGVDc3MsICRtZFV0aWwpIHtcblxuICB0aGlzLnN0ZXBzID0gW107XG4gIHRoaXMuc3RlcEFjdGl2ZSA9IDA7XG5cbiAgdGhpcy5hZGRTdGVwID0gKHN0ZXApID0+IHtcbiAgICB0aGlzLnN0ZXBzLnB1c2goc3RlcCk7XG4gIH07XG5cbiAgdGhpcy5pc0FjdGl2ZSA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgaWYgKHN0ZXBOdW1iZXIgPT09IHRoaXMuc3RlcEFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIHRoaXMuaGFzSW5rUmlwcGxlID0gKHN0ZXBOdW1iZXIpID0+IHtcbiAgICBpZiAodGhpcy5saW5lYXIgfHwgc3RlcE51bWJlciA9PT0gdGhpcy5zdGVwQWN0aXZlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgdGhpcy5zZXRBY3RpdmUgPSAoc3RlcE51bWJlcikgPT4ge1xuICAgIGxldCAkc3RlcHBlcnNDb250ZW50ID0gYW5ndWxhci5lbGVtZW50KCRkb2N1bWVudFswXS5xdWVyeVNlbGVjdG9yKCcubWQtc3RlcHBlcnMtY29udGVudCcpKTtcbiAgICBsZXQgJHN0ZXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZC1zdGVwcGVyJylbc3RlcE51bWJlcl0pO1xuXG4gICAgdGhpcy5zdGVwQWN0aXZlID0gc3RlcE51bWJlcjtcblxuICAgICRhbmltYXRlQ3NzKCRzdGVwcGVyc0NvbnRlbnQsIHtcbiAgICAgIGZyb206IHsgaGVpZ2h0OiAkc3RlcHBlcnNDb250ZW50WzBdLmNsaWVudEhlaWdodCArICdweCcgfSxcbiAgICAgIHRvOiB7IGhlaWdodDogJHN0ZXBwZXIucHJvcCgnY2xpZW50SGVpZ2h0JykgKyAncHgnIH0sXG4gICAgICBlYXNpbmc6ICdjdWJpYy1iZXppZXIoLjM1LCAwLCAuMjUsIDEpJyxcbiAgICAgIGR1cmF0aW9uOiAwLjRcbiAgICB9KS5zdGFydCgpLmRvbmUoKCkgPT4ge1xuICAgICAgJHN0ZXBwZXJzQ29udGVudC5jc3Moe1xuICAgICAgICB0cmFuc2l0aW9uOiAnbm9uZScsXG4gICAgICAgIGhlaWdodDogJydcbiAgICAgIH0pO1xuXG4gICAgICAkbWRVdGlsLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkc3RlcHBlcnNDb250ZW50LmNzcygndHJhbnNpdGlvbicsICcnKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9O1xuXG4gIHRoaXMuY2hhbmdlU3RlcCA9IChzdGVwTnVtYmVyKSA9PiB7XG4gICAgdGhpcy5zZXRBY3RpdmUoc3RlcE51bWJlcik7XG4gIH07XG5cbn1cbiIsImltcG9ydCBjb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcic7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi90ZW1wbGF0ZSc7XG5cbmxldCBjb21wb25lbnQgPSAnbWRTdGVwcGVycyc7XG5cbmxldCBkaXJlY3RpdmUgPSAoKSA9PiB7XG5cbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHNjb3BlOiB7XG4gICAgICBjYXJkOiAnPT9tZENhcmQnLFxuICAgICAgbGluZWFyOiAnPT9tZExpbmVhcicsXG4gICAgICBhbHRlcm5hdGl2ZTogJz0/bWRBbHRlcm5hdGl2ZSdcbiAgICB9LFxuICAgIHRlbXBsYXRlLFxuICAgIGNvbnRyb2xsZXIsXG4gICAgY29udHJvbGxlckFzOiBgJCR7Y29tcG9uZW50fWAsXG4gICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZVxuICB9O1xuXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWU6IGNvbXBvbmVudCxcbiAgZGlyZWN0aXZlXG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oJGVsZW1lbnQsICRhdHRyaWJ1dGVzKSB7XG5cbiAgbGV0ICRzdGVwcGVyc0NvbnRlbnQgPSBgXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm1kLXN0ZXBwZXItaW5kaWNhdG9yXCJcbiAgICAgIG5nLXJlcGVhdD1cIihzdGVwTnVtYmVyLCAkc3RlcCkgaW4gJG1kU3RlcHBlcnMuc3RlcHNcIlxuICAgICAgbmctY2xhc3M9XCJ7XG4gICAgICAgICdtZC1hY3RpdmUnOiAkbWRTdGVwcGVycy5pc0FjdGl2ZShzdGVwTnVtYmVyKSxcbiAgICAgICAgJ21kLWNvbXBsZXRlZCc6ICRtZFN0ZXBwZXJzLmlzQ29tcGxldGVkKHN0ZXBOdW1iZXIpLFxuICAgICAgICAnbWQtZWRpdGFibGUnOiAkc3RlcC5lZGl0YWJsZSAmJiAkbWRTdGVwcGVycy5lbmFibGVFZGl0TW9kZShzdGVwTnVtYmVyKSxcbiAgICAgICAgJ21kLXN0ZXBwZXItb3B0aW9uYWwnOiAkc3RlcC5vcHRpb25hbFxuICAgICAgfVwiXG4gICAgICBuZy1jbGljaz1cIiEkbWRTdGVwcGVycy5saW5lYXIgJiYgISRtZFN0ZXBwZXJzLmlzQWN0aXZlKHN0ZXBOdW1iZXIpICYmICRtZFN0ZXBwZXJzLmNoYW5nZVN0ZXAoc3RlcE51bWJlcilcIlxuICAgICAgbWQtaW5rLXJpcHBsZT1cInt7ICRtZFN0ZXBwZXJzLmhhc0lua1JpcHBsZShzdGVwTnVtYmVyKSB9fVwiPlxuICAgICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXItaW5kaWNhdG9yLXdyYXBwZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXItbnVtYmVyXCI+XG4gICAgICAgICAgPHNwYW4+e3sgOjpzdGVwTnVtYmVyKzEgfX08L3NwYW4+XG4gICAgICAgICAgPG1kLWljb24gY2xhc3M9XCJtZC1zdGVwcGVyLWljb24gbWQtc3RlcHBlci1pY29uLWVkaXRcIiBuZy1pZj1cIiRzdGVwLmVkaXRhYmxlXCIgbmctc2hvdz1cIiRtZFN0ZXBwZXJzLmVuYWJsZUVkaXRNb2RlKHN0ZXBOdW1iZXIpXCI+ZWRpdDwvbWQtaWNvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1kLXN0ZXBwZXItdGl0bGVcIj5cbiAgICAgICAgICA8c3Bhbj57eyAkc3RlcC5sYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICA8c21hbGwgbmctaWY9XCIkc3RlcC5vcHRpb25hbFwiPnt7ICRzdGVwLm9wdGlvbmFsIH19PC9zbWFsbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgYDtcbiAgbGV0ICRzdGVwcGVyc0hlYWRlciA9IGA8bWQtc3RlcHBlcnMtaGVhZGVyIGNsYXNzPVwibWQtc3RlcHBlcnMtaGVhZGVyXCI+JHskc3RlcHBlcnNDb250ZW50fTwvbWQtc3RlcHBlcnMtaGVhZGVyPmA7XG4gIGxldCAkc3RlcHBlcnNBY3Rpb25zID0gJGVsZW1lbnQuZmluZCgnbWQtc3RlcHBlcnMtYWN0aW9ucycpLmRldGFjaCgpLmh0bWwoKTtcblxuICBpZiAoJGF0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoJ21kQ2FyZCcpKSB7XG4gICAgJHN0ZXBwZXJzSGVhZGVyID0gYDxtZC1jYXJkIGNsYXNzPVwibWQtc3RlcHBlcnMtaGVhZGVyXCI+JHskc3RlcHBlcnNDb250ZW50fTwvbWQtY2FyZD5gO1xuICB9XG5cbiAgcmV0dXJuIGBcbiAgICA8ZGl2IGNsYXNzPVwibWQtc3RlcHBlcnNcIiBuZy1jbGFzcz1cInsgJ21kLXN0ZXBwZXJzLWxpbmVhcic6ICRtZFN0ZXBwZXJzLmxpbmVhciwgJ21kLXN0ZXBwZXJzLWFsdGVybmF0aXZlJzogJG1kU3RlcHBlcnMuYWx0ZXJuYXRpdmUgfVwiPlxuICAgICAgJHskc3RlcHBlcnNIZWFkZXJ9XG4gICAgICA8bWQtc3RlcHBlcnMtY29udGVudCBjbGFzcz1cIm1kLXN0ZXBwZXJzLWNvbnRlbnRcIj4keyRlbGVtZW50Lmh0bWwoKX08L21kLXN0ZXBwZXJzLWNvbnRlbnQ+XG4gICAgICA8bWQtc3RlcHBlcnMtYWN0aW9ucyBjbGFzcz1cIm1kLXN0ZXBwZXJzLWFjdGlvbnNcIj4keyRzdGVwcGVyc0FjdGlvbnN9PC9tZC1zdGVwcGVycy1hY3Rpb25zPlxuICAgIDwvZGl2PlxuICBgO1xuXG59XG4iXX0=
