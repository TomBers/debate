Router.map(function() {
this.route('/', {
    path: '/',
    template: 'home'
   });
   this.route('debates', {
     path: '/:_id',
     template: 'debate',
     data: function() {
         return Debates.findOne({_id:this.params._id});
     }
 });

 });
