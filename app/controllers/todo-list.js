import Ember from 'ember';

export default Ember.Controller.extend({
  sort: ['priority:desc'],
  sortedTodoList: Ember.computed.sort('model', 'sort'),

  actions: {
    saveNewItem() {
        var newItem = {'title': this.get('newItem'), 'is_completed': false, "priority": 0},
            that = this;

        this.store.createRecord('todo', newItem).save().then(function(response) {
          that.set('newItem', null);
          that.set('errorMessage', null); 
        })
        .catch(function(err) {
          that.set('errorMessage', 'There was an error creating your item. Please try again.');
        });
    },
    toggleComplete(item) {
      item.toggleProperty('is_completed');
      item.save();
    },
    itemDelete(item) {
      item.destroyRecord();
    },
    changePriority(item, increase) {
      // Check if the user wants to increase or decrease the priority and update accordingly
      var new_priority = increase ? item.get('priority') + 1 : item.get('priority') - 1;
      
      if (new_priority >= 0) { // Don't allow priority to fall below 0
        item.set('priority', new_priority);
        item.save();
      }
    }
  }
});
