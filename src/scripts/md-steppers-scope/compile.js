export default function($topElement, $topAttributes, $transclude) {

  return function postLink($scope, $element) {

    let $controller = $scope;
    let newScope = $controller.$parent.$new();

    newScope.$index = $scope.$index;

    $scope.$watch('$index', (value) => {
      newScope.$index = value;
    });

    let scopeDigesting = false;
    let newScopeDigesting = false;

    $scope.$watch(() => {
      if (newScopeDigesting || scopeDigesting) {
        return;
      }

      scopeDigesting = true;
      $scope.$$postDigest(() => {
        if (!newScopeDigesting) {
          newScope.$digest();
        }

        scopeDigesting = newScopeDigesting = false;
      });
    });

    newScope.$watch(() => {
      newScopeDigesting = true;
    });

    $transclude(newScope, (clone) => {
      $element.after(clone);
    });

  };

}
