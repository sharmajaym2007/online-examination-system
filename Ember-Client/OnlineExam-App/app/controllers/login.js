import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    onSaveLogin: function(){

      let login = this.model.login
      var self = this;

      function transitionToPost(login) {
        alert('successfull');
        alert(login.id)
        self.set('token', login.id)
        self.transitionToRoute('welcome');
      }

      function failure(reason) {
        alert(reason);
        self.transitionToRoute('contact');
      }

      login.save().then(transitionToPost).catch(failure);



      /*this.store.findRecord('login',1).then((restTest) => {
        alert(restTest.get('title') + ' ' + restTest.get('id'))
      })*/
    }
  }

});
