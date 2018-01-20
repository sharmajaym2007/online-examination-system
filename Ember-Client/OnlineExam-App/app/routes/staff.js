import Route from '@ember/routing/route';

export default Route.extend({
  model(){
    return Ember.RSVP.hash({
      'students': this.get('store').findAll('user'),
      'questions': this.get('store').findAll('question')
      .forEach(function(question) {
            question.set('isEditEnabled', false);
      })
    });
  }
});
