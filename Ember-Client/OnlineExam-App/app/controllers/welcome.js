import Controller from '@ember/controller';

export default Controller.extend({



  actions: {
    buttonStart: function(){
      var self = this;
      alert('welcome-successfull');
      self.transitionToRoute('questions');
    }
  }

});
