import Controller from '@ember/controller';

export default Controller.extend({
  ajax: Ember.inject.service(),
  actions: {
    init: function() {
       this._super();
       let students = this.model.students
       alert(students.toArray())
    },
    onSaveUpdateQuestion: function(question) {
      return this.get('ajax').request('/questions/'+question.id, {
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(question)
      });
    }
  }
});
