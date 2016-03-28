import link from './link';
import template from './template';

let component = 'mdStepper';

let directive = () => {

  'ngInject';

  return {
    restrict: 'E',
    require: '^mdSteppers',
    link,
    template
  };

};

export default {
  name: component,
  directive
};
