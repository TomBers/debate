Meteor.methods({
  vote: function(debate,usr,val) {
    Votes.update({debate:debate,usr:usr},{debate:debate,usr:usr,val:val},{upsert:true});
    var dte = new Date();
    History.insert({debate:debate
      ,usr:usr
      ,agree:Votes.find({debate:debate,val:'agree'}).fetch().length
      ,neutral:Votes.find({debate:debate,val:'neutral'}).fetch().length
      ,disagree:Votes.find({debate:debate,val:'disagree'}).fetch().length
      ,DateTime:dte
      });
  },
  comment: function(debate,usr,side,comment){
    var dte = new Date();
    Comments.insert({debate:debate,usr:usr,side:side,comment:comment,DateTime:dte});
  },
  makeDebate: function(title,ac,nc,dc,url,did){
    if (did == ''){
    return Debates.insert({title:title,ac:ac,nc:nc,dc:dc,url:url});
  }else{
    return Debates.update({_id:did},{_id:did,title:title,ac:ac,nc:nc,dc:dc,url:url},{upsert:false});
  }
},
clearDebate: function(debate,del){
  Comments.remove({debate:debate});
  Votes.remove({debate:debate});
  History.remove({debate:debate});
  if(del){
  Debates.remove({_id:debate});
}
}
});
