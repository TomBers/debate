Session.setDefault('debates',0);

window.addEventListener('polymer-ready', function(e) {
  //Code Here
  // console.log(e);
  var dbts = Debates.find().fetch();
  // console.log(dbts);
  Session.set('debates',dbts);

});


Template.layout.helpers({
    debates : function(){
      return Session.get('debates');
    }
    ,no :function(){
      return Debates.find().fetch().length;
    }
})
