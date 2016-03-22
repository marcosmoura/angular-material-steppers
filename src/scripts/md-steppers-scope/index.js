import compile from './compile';

let component = 'mdSteppersScope';

let directive = () => {

  'ngInject';

  return {
    restrict: 'AE',
    compile: compile,
    terminal: true,
    transclude: 'element'
  };

};

export default {
  name: component,
  directive
};
