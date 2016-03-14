import controller from './controller';
import template from './template';

let component = 'mdSteppers';

let directive = () => {

  return {
    restrict: 'E',
    scope: {
      card: '=?mdCard',
      linear: '=?mdLinear',
      alternative: '=?mdAlternative'
    },
    template,
    controller,
    controllerAs: `$${component}`,
    bindToController: true
  };

};

export default {
  name: component,
  directive
};
