import Ember from 'ember';
import TodosIndexRoute from 'syncano-todo/routes/todos/index';

export default TodosIndexRoute.extend({
  model() {
    var filter = {"query":{"is_completed": {"_eq": true}}};
      // We call Syncano and ask for the todos that are not completed
    return SyncanoTodo.api.class('todo').dataobject().list(filter)
      .then(function(data) {
        var returnArray = [];
        // Convert returned objects into Ember Objects so that our observable properties work correctly
        data.objects.forEach(function(item){
          returnArray.push(Ember.Object.create(item));
        });

        return returnArray;
      });
  }
});
