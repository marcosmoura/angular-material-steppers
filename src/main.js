import mdSteppers from './scripts/md-steppers';
import mdStepper from './scripts/md-stepper';
import mdSteppersScope from './scripts/md-steppers-scope';
import mdStepperService from './scripts/md-steppers/service.js';

((angular) => {

  angular
    .module('ngMaterialSteppers', [
      'ngAnimate',
      'ngMaterial'
    ])
    .directive(mdSteppers.name, mdSteppers.directive)
    .directive(mdStepper.name, mdStepper.directive)
    .directive(mdSteppersScope.name, mdSteppersScope.directive)
    .factory(mdStepperService.name, mdStepperService.service);

})(angular);
