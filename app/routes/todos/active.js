import Ember from 'ember';
import TodosIndexRoute from 'syncano-todo/routes/todos/index';

export default TodosIndexRoute.extend({
  model() {
    var filter = {"query":{"is_completed": {"_eq": false}}};
    return this.store.query('todo', filter);
  }
});
