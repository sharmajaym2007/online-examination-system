import DS from 'ember-data';
import AjaxServiceSupport from 'ember-ajax/mixins/ajax-support';

export default DS.JSONAPIAdapter.extend({
  host:'http://localhost:8080/oems',
});
