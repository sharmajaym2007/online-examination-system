import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.store.createRecord('user');
  },

  actions: {

    saveUserR(newUser) {
      newUser.save().then(() => this.transitionTo('staff.users'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
