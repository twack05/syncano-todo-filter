import Syncano from 'npm:syncano';

export function initialize(container, application) {
  application.api = new Syncano({accountKey: application.SYNCANO_API_KEY}).instance(application.SYNCANO_INSTANCE_NAME);
}

export default {
  name: 'application',
  initialize
};
