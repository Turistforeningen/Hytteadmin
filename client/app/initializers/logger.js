export function initialize(container, application) {
  application.inject('route', 'logger', 'service:logger');
  application.inject('model', 'logger', 'service:logger');
  application.inject('controller', 'logger', 'service:logger');
  application.inject('component', 'logger', 'service:logger');
}

export default {
  name: 'logger',
  initialize: initialize
};
