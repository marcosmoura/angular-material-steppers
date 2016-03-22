angular
  .module('angular-material-steppers')
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('red');
  })
  .controller('AppController', function($mdSteppers) {
    this.isLinear = true;
    this.isAlternative = false;
    this.stepsCount = 3;
    this.currentStep = 0;

    this.toggleLinear = function() {
      this.isLinear = !this.isLinear;
    };

    this.toggleAlternative = function() {
      this.isAlternative = !this.isAlternative;
    };

    this.previousStep = function() {
      var steppers = $mdSteppers('campaign-stepper');

      steppers.changeStep(this.currentStep === 0 ? 3 : this.currentStep--);
    };

    this.cancel = function() {
      var steppers = $mdSteppers('campaign-stepper');

      steppers.changeStep(this.currentStep !== 0 && this.currentStep - 1);
    };

    this.nextStep = function() {
      var steppers = $mdSteppers('campaign-stepper');

      steppers.changeStep(this.currentStep === this.stepsCount ? 0 : this.currentStep++);
    };

  });
