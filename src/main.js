import mdSteppers from './scripts/md-steppers';
import mdStepper from './scripts/md-stepper';

((angular) => {

  angular
    .module('angular-material-steppers', [
      'ngAnimate',
      'ngMaterial'
    ])
    .directive(mdSteppers.name, mdSteppers.directive)
    .directive(mdStepper.name, mdStepper.directive);

})(angular);
