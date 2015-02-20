Router.configure({
layoutTemplate: 'layout',
// waitOn: function() { return Meteor.subscribe('debates'); },
});



Router.map(function() {
  this.route('/', {
    path: '/',
    template: 'home'
  });

  this.route('analysis', {
    path: '/analysis/:_id',
    template: 'history',
    data: function() {
      return this.params._id;
    }
  });

  this.route('edit', {
    path: '/edit/:_id',
    template: 'home',
    data: function() {
      return Debates.findOne({_id:this.params._id});
    }
  });

  this.route('clear', {
    path: '/clear/:_id',
    template: 'clear',
    data: function() {
      return this.params._id;
    }
  });

  this.route('del', {
    path: '/del/:_id',
    template: 'del',
    data: function() {
      return this.params._id;
    }
  });

  this.route('debates', {
    path: '/:_id',
    template: 'debate',
    data: function() {
      return Debates.findOne({_id:this.params._id});
    }
  });

});
