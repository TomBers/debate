Meteor.methods({
  vote: function(debate,usr,val) {
    Votes.update({debate:debate,usr:usr},{debate:debate,usr:usr,val:val},{upsert:true});
  },
  comment: function(debate,usr,side,comment){
    var dte = new Date();
    Comments.insert({debate:debate,usr:usr,side:side,comment:comment,DateTime:dte});
  },
  makeDebate: function(title,ac,nc,dc,url){
    return Debates.insert({title:title,ac:ac,nc:nc,dc:dc,url:url});

  }
});
