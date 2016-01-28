import Ember from 'ember';

export default Ember.Controller.extend({
  sort: ['priority:desc'],
  sortedTodoList: Ember.computed.sort('model', 'sort'),

  actions: {
    saveNewItem() {
      // Limit number of items in list
      if (this.get('model').length < 11) {
        var newItem = {'title': this.get('newItem'), 'is_completed': false, "priority": 0},
          that = this;

        SyncanoTodo.api.class('todo').dataobject().add(newItem)
          .then(function(item) {
            that.get('model').pushObject(Ember.Object.create(item));
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
          that.get('model').removeObject(item);
        });
    },
    changePriority(item, increase) {
      // Check if the user wants to increase or decrease the priority and update accordingly
      var new_priority = increase ? item.get('priority') + 1 : item.get('priority') - 1,
        that = this;
      if (new_priority >= 0) { // Don't allow priority to fall below 0
        SyncanoTodo.api.class('todo').dataobject(item.get('id')).update({'priority': new_priority})
          .then(function(response) {
            item.set('priority', new_priority);
          });
      }
    }
  }
});
