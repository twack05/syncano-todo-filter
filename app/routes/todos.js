import Ember from 'ember';
import TodoModel from 'syncano-todo/models/todo';

export default Ember.Route.extend({
  model() {
    return SyncanoTodo.api.class('todo').dataobject().list()
      .then(function(data) {
        var returnArray = [];

        data.objects.forEach(function(item){
          returnArray.push(Ember.Object.create(item));
        });

        return returnArray;
      });
  },
  setupController(controller, model) {
    controller.set('todoItems', model);
  }
});
