Router.map(function() {
this.route('/', {
    path: '/',
    template: 'home',
    data: function () {
    templateData = { debates: Debates.find() };
    return templateData;
  }
   });

   this.route('history', {
       path: '/history',
       template: 'history'
      });

   this.route('debates', {
     path: '/:_id',
     template: 'debate',
     data: function() {
         return Debates.findOne({_id:this.params._id});
     }
 });

 });
