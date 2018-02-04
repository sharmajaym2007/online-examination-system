import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    return this.store.findRecord('question', params.question_id);
  },

  actions: {

      modifyQuestionR(userR) {
        userR.save().then(() => this.transitionTo('staff.mcq'));
      },

      willTransition(transition) {
        let model = this.controller.get('model');
        if (model.get('hasDirtyAttributes')) {
          let confirmation = confirm("Your changes haven't saved yet. Would you like to leave this form?");
          if (confirmation) {
            model.rollbackAttributes();
          } else {
            transition.abort();
          }
        }
      }
    }
  });
