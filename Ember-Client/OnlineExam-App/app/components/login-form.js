import Component from '@ember/component';
import Ember from 'ember';

export default Component.extend({

  actions: {
    buttonLogin: function() {
        if ((this.$("#category").val() === "")) {
          //this.selectVehicle("");
          alert("Please enter a valid category")
        }
        else {
          var category = this.get('category')
          this.get('onSave')(category);//Login.hbs has this attribute which executes
        }
      },

    assignCategory(category) {
      this.set('category', category);
    },
  }
});
