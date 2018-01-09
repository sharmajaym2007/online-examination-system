import Component from '@ember/component';

export default Component.extend({
  actions: {
    buttonLogin: function() {

        this.get('onSave')();

  }
}
});
