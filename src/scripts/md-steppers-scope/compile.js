export default function($topElement, $topAttributes, $transclude) {

  'ngInject';

  return function postLink($scope, $element) {

    'ngInject';

    let $controller = $scope;
    let newScope = $controller.$parent.$new();

    newScope.$index = $scope.$index;

    $scope.$watch('$index', function(value) {
      newScope.$index = value;
    });

    let scopeDigesting = false;
    let newScopeDigesting = false;

    $scope.$watch(function() {
      if (newScopeDigesting || scopeDigesting) {
        return;
      }

      scopeDigesting = true;
      $scope.$$postDigest(function() {
        if (!newScopeDigesting) {
          newScope.$digest();
        }

        scopeDigesting = newScopeDigesting = false;
      });
    });

    newScope.$watch(function() {
      newScopeDigesting = true;
    });

    $transclude(newScope, function(clone) {
      $element.after(clone);
    });
  };

}
