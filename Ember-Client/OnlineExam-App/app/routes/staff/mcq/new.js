import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.store.createRecord('question');
  },

  actions: {

    saveQuestionR(newQuestion) {
      newQuestion.save().then(() => this.transitionTo('staff.mcq'));
    },

    willTransition() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('model').rollbackAttributes();
    }
  }
});
