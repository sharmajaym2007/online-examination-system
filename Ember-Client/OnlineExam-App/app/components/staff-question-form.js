import Component from '@ember/component';

export default Component.extend({
  actions: {
    init: function() {
     this._super();
    },
    updateQuestion: function(question) {
      this.get('onSave')(question);
    },
    deleteQuestion: function(question) {
      this.get('onDelete')(question);
    }
  }
});
