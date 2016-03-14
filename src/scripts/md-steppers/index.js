import controller from './controller';
import template from './template';

let component = 'mdSteppers';

let directive = ($mdComponentRegistry, $log) => {

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

      $mdComponentRegistry.register({
        changeStep: $controller.changeStep,
        setCompleted: $controller.setCompleted,
        isActive: $controller.isActive
      }, $attributes.id);
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
