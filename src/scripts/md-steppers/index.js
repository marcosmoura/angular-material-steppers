import controller from './controller';
import template from './template';

let component = 'mdSteppers';

let directive = ($mdComponentRegistry, $log) => {

  'ngInject';

  return {
    restrict: 'E',
    scope: {
      card: '=?mdCard',
      linear: '=?mdLinear',
      alternative: '=?mdAlternative'
    },
    template,
    link: ($scope, $element, $attributes, $controller) => {

      if (!$attributes.id) {
        $log.warn('You must set an id attribute to your stepper');
      }

      let registeredStepper = $mdComponentRegistry.register({
        changeStep: $controller.changeStep,
        isActive: $controller.isActive,
        getCurrentStep: $controller.getCurrentStep,
        setError: $controller.setError,
        clearError: $controller.clearError
      }, $attributes.id);

      $scope.$on('$destroy', function() {
        registeredStepper();
      });

    },
    controller,
    controllerAs: `$${component}`,
    bindToController: true
  };

};

export default {
  name: component,
  directive
};
