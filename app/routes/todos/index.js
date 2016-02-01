import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return SyncanoTodo.api.class('todo').dataobject().list()
      .then(function(data) {
        var returnArray = [];
        // Convert returned objects into Ember Objects so that our observable properties work correctly
        data.objects.forEach(function(item){
          returnArray.push(Ember.Object.create(item));
        });

        return returnArray;
      });
  },
  templateName: 'todo-list',
  controllerName: 'todo-list'
});
