import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onSaveLogin: function(category){
      let login = this.model.login
      var self = this;
      function transitionToPost(login) {
        alert('successfull');
        console.log('->------>>>>>>>'+login.password);
        self.set('token', login.id)

        if(login.category === 'staff') {
          self.transitionToRoute('staff');
        }
        else {
          self.transitionToRoute('welcome');
        }
      }

      function failure(reason) {
        alert(reason);
        self.transitionToRoute('contact');
      }
      login.category = category;
      login.save().then(transitionToPost).catch(failure);

      /*this.store.findRecord('login',1).then((restTest) => {
        alert(restTest.get('title') + ' ' + restTest.get('id'))
      })*/
    }
  }

});
