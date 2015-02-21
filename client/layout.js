Template.layout.helpers({
    // debates: function() {
    //     return Debates.find().fetch();
    // },
    no :function(){
      return Debates.find().fetch().length;
    }
})
