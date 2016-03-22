let service = ($mdComponentRegistry) => {

  return function(handle) {
    let instance = $mdComponentRegistry.get(handle);

    if (!instance) {
      $mdComponentRegistry.notFoundError(handle);
    }

    return instance;
  };

};

export default {
  name: '$mdSteppers',
  service
};
