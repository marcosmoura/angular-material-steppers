export default function($scope, $document, $element, $animateCss, $mdUtil) {

  'ngInject';

  this.steps = [];
  this.stepActive = 0;
  this.stepsErrors = [];

  this.addStep = (step) => {
    this.steps.push(step);
  };

  this.isActive = (stepNumber) => {
    if (stepNumber === this.stepActive) {
      return true;
    }

    return false;
  };

  this.isCompleted = (stepNumber) => {
    if (this.linear && stepNumber < this.stepActive) {
      return true;
    }

    return false;
  };

  this.enableEditMode = (stepNumber, hasEditing) => {
    if (hasEditing && (this.linear && stepNumber < this.stepActive)) {
      return true;
    }

    return false;
  };

  this.hasInkRipple = (stepNumber) => {
    if (this.linear || stepNumber === this.stepActive) {
      return false;
    }

    return true;
  };

  this.setActive = (stepNumber) => {
    let $steppersContent = angular.element($document[0].querySelector('.md-steppers-content'));
    let $stepper = angular.element($document[0].querySelectorAll('.md-stepper')[stepNumber]);

    this.stepActive = stepNumber;

    if (this.stepsErrors[stepNumber]) {
      this.stepsErrors[stepNumber].hasError = false;
    }

    $animateCss($steppersContent, {
      from: { height: $steppersContent[0].clientHeight + 'px' },
      to: { height: $stepper.prop('clientHeight') + 'px' },
      easing: 'cubic-bezier(.35, 0, .25, 1)',
      duration: 0.4
    }).start().done(() => {
      $steppersContent.css({
        transition: 'none',
        height: ''
      });

      $mdUtil.nextTick(() => {
        $steppersContent.css('transition', '');
      });
    });
  };

  this.changeStep = (stepNumber) => {
    this.setActive(stepNumber);
  };

  this.getCurrentStep = () => {
    return this.stepActive;
  };

  this.getStepMetadata = (stepNumber) => {
    let step = this.steps[stepNumber];

    let stepMetadata = {
      label: step.label,
      editable: step.editable,
      optional: step.optional
    };
    
    return stepMetadata;
  };

  this.clickAction = (stepNumber, editing) => {
    if (this.enableEditMode(stepNumber, editing)) {
      this.setActive(stepNumber);

      return true;
    }

    if (!this.linear && !this.isActive(stepNumber)) {
      this.changeStep(stepNumber);
    }
  };

  this.setError = (stepNumber, message) => {
    this.stepsErrors[stepNumber] = {};

    let step = this.stepsErrors[stepNumber];

    step.hasError = true;
    step.message = message;
  };

  this.clearError = (stepNumber) => {
    if (this.stepsErrors[stepNumber]) {
      this.stepsErrors[stepNumber].hasError = false;
    }
  };

  this.hasError = (stepNumber) => {
    let step = this.stepsErrors[stepNumber];

    return step && step.hasError;
  };

}
