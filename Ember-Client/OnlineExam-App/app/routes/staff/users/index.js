import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.store.findAll('user');
  },

  actions: {
    deleteUser(library) {
      let confirmation = confirm('Do you want to delete this Student/Staff?');

      if (confirmation) {
        library.destroyRecord();
      }
    }
  }

});
