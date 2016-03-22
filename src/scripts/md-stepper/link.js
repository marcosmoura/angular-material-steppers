export default function($scope, $element, $attributes, $controller) {

  'ngInject';

  $scope.$mdStepper = {};

  $controller.addStep({
    label: $scope.label,
    editable: $scope.editable || $scope.hasOwnProperty('editable'),
    optional: $scope.optional
  });

  $controller.setActive(0);

  $scope.$mdStepper.isActive = (index) => {
    return $controller.isActive(index);
  };

}
