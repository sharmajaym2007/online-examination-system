import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    onSaveLogin: function(category){
      let login = this.model.login
      var self = this;
      function transitionToPost(login) {
        alert('successfull');
        console.log('->------>>>>>>>'+login.name);
        self.set('token', login.id)

        console.log(login)
        if(login.role == 'staff') {
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
