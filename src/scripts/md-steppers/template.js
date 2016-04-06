export default function($element, $attributes) {

  let $steppersContent = `
    <button
      class="md-stepper-indicator"
      ng-repeat="(stepNumber, $step) in $mdSteppers.steps track by $index"
      ng-class="{
        'md-active': $mdSteppers.isActive(stepNumber),
        'md-completed': $mdSteppers.isCompleted(stepNumber),
        'md-error': $mdSteppers.hasError(stepNumber),
        'md-editable': $step.editable && $mdSteppers.enableEditMode(stepNumber, $step.editable),
        'md-stepper-optional': $step.optional || $mdSteppers.hasError(stepNumber)
      }"
      ng-click="$mdSteppers.clickAction(stepNumber)"
      md-ink-ripple="{{ $mdSteppers.hasInkRipple(stepNumber) || $mdSteppers.enableEditMode(stepNumber, $step.editable) }}">
      <div class="md-stepper-indicator-wrapper">
        <div class="md-stepper-number" ng-hide="$mdSteppers.hasError(stepNumber)">
          <span ng-if="!$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber, $step.editable)">{{ ::stepNumber+1 }}</span>
          <md-icon class="md-stepper-icon md-stepper-icon-edit" ng-if="$step.editable" ng-show="$mdSteppers.enableEditMode(stepNumber, $step.editable)">edit</md-icon>
          <md-icon class="md-stepper-icon" ng-if="$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber, $step.editable)">check</md-icon>
        </div>

        <div class="md-stepper-error-indicator" ng-show="$mdSteppers.hasError(stepNumber)">
          <md-icon>warning</md-icon>
        </div>

        <div class="md-stepper-title">
          <span>{{ $step.label }}</span>
          <small ng-if="$step.optional && !$mdSteppers.hasError(stepNumber)">{{ $step.optional }}</small>
          <small class="md-stepper-error-message" ng-show="$mdSteppers.hasError(stepNumber)">{{ $mdSteppers.stepsErrors[stepNumber].message }}</small>
        </div>
      </div>
    </button>
  `;
  let $steppersHeader = `<md-steppers-header class="md-steppers-header">${$steppersContent}</md-steppers-header>`;
  let $steppersActions = $element.find('md-steppers-actions').detach().html();

  if ($attributes.hasOwnProperty('mdCard')) {
    $steppersHeader = `<md-card class="md-steppers-header">${$steppersContent}</md-card>`;
  }

  return `
    <div class="md-steppers" ng-class="{ 'md-steppers-linear': $mdSteppers.linear, 'md-steppers-alternative': $mdSteppers.alternative }">
      ${$steppersHeader}
      <md-steppers-content class="md-steppers-content">${$element.html()}</md-steppers-content>
      <md-steppers-actions md-steppers-scope class="md-steppers-actions">${$steppersActions}</md-steppers-actions>
    </div>
  `;

}
