import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: 'api',
  coalesceFindRequests: true,
  headers: Ember.computed('session.{isAuthenticated,header}', function(){
    if(this.get('session.isAuthenticated')){
      return this.get('session.header');
    }
  })
});
