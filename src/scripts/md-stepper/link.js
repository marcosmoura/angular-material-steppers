export default function($scope, $element, $attributes, $controller) {

  $scope.$mdStepper = {};

  $controller.addStep({
    label: $attributes.hasOwnProperty('mdLabel') && $attributes.mdLabel,
    editable: $attributes.hasOwnProperty('mdEditable') && !!$attributes.mdEditable,
    optional: $attributes.hasOwnProperty('mdOptional') && $attributes.mdOptional
  });

  $controller.setActive(0);

  $scope.$mdStepper.isActive = (index) => {
    return $controller.isActive(index);
  };

}
