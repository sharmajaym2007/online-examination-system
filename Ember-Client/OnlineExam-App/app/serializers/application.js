import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONSerializer.extend({
  //primaryKey: '_id',
  serializeIntoHash(hash, typeClass, snapshot, options) {
    let opts = options || {};
    opts.includeId = true;
    Ember.merge(hash, this.serialize(snapshot, opts));
  }
});
