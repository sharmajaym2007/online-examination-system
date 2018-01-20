import Service from '@ember/service';

export default Service.extend({
  userId : null,
  questions : null,
  init() {
    this._super(...arguments);
    this.set('userId', '');
    this.set('questions', '');
  },

  addUserId(userIdArg) {
    this.userName = userIdArg;
    //console.log('----login-details.js-------'+this.userName);
  },
  addQuestions(questionsArg) {
    this.questions = questionsArg;
    //console.log('----login-details.js-------'+this.userName);
  },

  remove() {
    this.userId = null ;
  },

  getUserId(){
    return this.userId;
  },
  getQuestions(){
    return this.questions;
  },

});
