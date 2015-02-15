Meteor.methods({
  vote: function(usr,val) {
    Votes.update({usr:usr},{usr:usr,val:val},{upsert:true});
  },
  comment: function(usr,side,comment){
    Comments.insert({usr:usr,side:side,comment:comment});
  }
});
