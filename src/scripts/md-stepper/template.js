export default function($element) {

  let $stepperParent = $element.parent();
  let stepperIndex = Array.prototype.indexOf.call($stepperParent[0].children, $element[0]);

  return `<div class="md-stepper" ng-class="{ 'md-active': $mdStepper.isActive(${stepperIndex}) }">${$element.html()}</div>`;

}
