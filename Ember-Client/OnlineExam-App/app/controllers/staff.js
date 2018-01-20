import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    init: function() {
       this._super();
       let students = this.model.students
       alert(students.toArray())
    },
    onSaveUpdateQuestion: function(question) {
      question.save();
    }
  }
});
