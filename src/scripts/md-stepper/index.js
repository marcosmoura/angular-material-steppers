import link from './link';
import template from './template';

let component = 'mdStepper';

let directive = () => {

  'ngInject';

  return {
    restrict: 'E',
    require: '^mdSteppers',
    scope: {
      label: '@mdLabel',
      editable: '=mdEditable',
      optional: '@?mdOptional'
    },
    link,
    template
  };

};

export default {
  name: component,
  directive
};
