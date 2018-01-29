import Component from '@ember/component';

export default Component.extend({
  actions: {
    init: function() {
     this._super();
    },
    updateQuestion: function(question) {
      console.log(question)
      this.get('onSave')(question);
    }
  }
});
