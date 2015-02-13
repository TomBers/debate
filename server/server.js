Meteor.methods({
  vote: function(usr,val) {
    Votes.update({usr:usr},{usr:usr,val:val},{upsert:true});
  }
});
