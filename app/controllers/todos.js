import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    saveNewItem() {
      if (this.get('todoItems').length < 11) {
        var newItem = {'title': this.get('newItem'), 'is_completed': false},
          that = this;
        SyncanoTodo.api.class('todo').dataobject().add(newItem)
          .then(function(item) {
            that.get('todoItems').pushObject(Ember.Object.create(item));
            that.set('newItem', null);
          });
        this.set('errorMessage', null);
      } else {
        this.set('errorMessage', 'There are too many to-do items! Please delete one before adding a new one.');
      }
    },
    toggleComplete(item) {
      SyncanoTodo.api.class('todo').dataobject(item.get('id')).update({'is_completed': !item.get('is_completed')})
        .then(function(response) {
          item.toggleProperty('is_completed');
        });
    },
    itemDelete(item) {
      var that = this;
      SyncanoTodo.api.class('todo').dataobject(item.get('id')).delete()
        .then(function(response) {
          that.get('todoItems').removeObject(item);
        });
    }
  }
});
