import Ember from 'ember';

export default Ember.Route.extend({
model() {

  return Ember.RSVP.hash({
    // 'loginInfo': this.store.createRecord('login', {
    //     userName: this.get("userName"), password: this.get("password")
    // })
    'login':this.store.createRecord('login')
  });

}

});
