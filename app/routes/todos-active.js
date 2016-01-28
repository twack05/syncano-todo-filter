import Ember from 'ember';
import TodosIndexRoute from 'syncano-todo/routes/todos/index';

export default TodosIndexRoute.extend({
  model() {
    var filter = {"is_completed": {"_eq": false}};
    return SyncanoTodo.api.class('todo').dataobject().list(filter)
      .then(function(data) {
        var returnArray = [];

        data.objects.forEach(function(item){
          returnArray.push(Ember.Object.create(item));
        });

        return returnArray;
      });
  }
});
