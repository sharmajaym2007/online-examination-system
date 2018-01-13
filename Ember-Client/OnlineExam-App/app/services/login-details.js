import Service from '@ember/service';

export default Service.extend({
  userName : null,

  init() {
    this._super(...arguments);
    this.set('userName', '');
  },

  add(userNameArg) {
    this.userName = userNameArg;
    //console.log('----login-details.js-------'+this.userName);
  },

  remove() {
    this.userName = null ;
  },

  getLoginDetails(){
    return this.userName;
  },


});
