import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.store.findAll('question');
  },

  actions: {
    deleteQuestion(library) {
      let confirmation = confirm('Do you want to delete this Question?');

      if (confirmation) {
        library.destroyRecord();
      }
    }
  }

});
