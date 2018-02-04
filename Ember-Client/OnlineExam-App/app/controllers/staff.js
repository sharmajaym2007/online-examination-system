import Controller from '@ember/controller';
import Ember from 'ember';
export default Controller.extend({
  actions: {
    init: function() {
       this._super();
       let students = this.model.students
       alert(students.toArray())
    },

    onUpdateQuestion: function(question) {
      //question.save();
      var docId= question.id, self= this;
      var questionT = JSON.stringify(question);

      Ember.$.ajax({
          type: 'PUT',
          url: 'http://localhost:8080/oems/questions/'+docId,
          data: questionT,
          contentType: "application/json; charset=utf-8",
          dataType: "text",
          // your other details...
      }).then(function(response) {
          //alert(111);
          //var myElement = document.getElementById(docId);
          //myElement.style.display = 'none';
          alert(response);
          // process the result...
      });
    },

    onDeleteQuestion: function(question) {
      //question.save();
      var docId= question.id, self= this;
      var questionT = JSON.stringify(question);


      this.store.findRecord('question', question.id, { backgroundReload: false }).then(function(question) {
        question.destroyRecord(); // => DELETE to /posts/2

      });

      alert(1);
      //document.getElementById(docId).style.visibility = "hidden";
      this.get('target._routerMicrolib').refresh({page: {limit: 20, offset: 100}});
      alert(2);



      //this.get('target.router').refresh();
      //alert(1);

      /*Ember.$.ajax({
          type: 'PUT',
          url: 'http://localhost:8080/oems/questions/'+docId,
          data: questionT,
          contentType: "application/json; charset=utf-8",
          dataType: "text",
          // your other details...
      }).then(function(response) {
          //alert(111);
          var myElement = document.getElementById(docId);
          myElement.style.display = 'none';
          alert(response);
          // process the result...
      });*/
    }
  }
});
