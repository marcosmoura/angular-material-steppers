export default function($element, $attributes) {

  let $steppersContent = `
    <button
      class="md-stepper-indicator"
      ng-repeat="(stepNumber, $step) in $mdSteppers.steps track by $index"
      ng-class="{
        'md-active': $mdSteppers.isActive(stepNumber),
        'md-completed': $mdSteppers.isCompleted(stepNumber),
        'md-editable': $step.editable && $mdSteppers.enableEditMode(stepNumber),
        'md-stepper-optional': $step.optional
      }"
      ng-click="$mdSteppers.clickAction(stepNumber)"
      md-ink-ripple="{{ $mdSteppers.hasInkRipple(stepNumber) || $mdSteppers.enableEditMode(stepNumber) }}">
      <div class="md-stepper-indicator-wrapper">
        <div class="md-stepper-number">
          <span ng-if="!$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber)">{{ ::stepNumber+1 }}</span>
          <md-icon class="md-stepper-icon md-stepper-icon-edit" ng-if="$step.editable" ng-show="$mdSteppers.enableEditMode(stepNumber)">edit</md-icon>
          <md-icon class="md-stepper-icon" ng-if="$mdSteppers.isCompleted(stepNumber) && !$mdSteppers.enableEditMode(stepNumber)">check</md-icon>
        </div>

        <div class="md-stepper-title">
          <span>{{ $step.label }}</span>
          <small ng-if="$step.optional">{{ $step.optional }}</small>
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
