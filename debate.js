if (Meteor.isClient) {
  Session.setDefault('usr',Math.random());
  Session.setDefault('agree',0);
  Session.setDefault('neutral',0);
  Session.setDefault('disagree',0);
  Session.setDefault('side','none');
 data = {
  series: [1, 1, 1]
};


  Meteor.startup(function () {



    var sum = function(a, b) { return a + b };

      mypie = new Chartist.Pie('.ct-chart', data);

    Tracker.autorun(function () {
      if(Session.get('agree') == 0 && Session.get('neutral') == 0 && Session.get('disagree') ==0){
        var data = {
        series: [1, 1, 1]
      };
    }else{
      data = {
        series: [Session.get('agree'),Session.get('neutral'),Session.get('disagree')]
      };
    }
      mypie.update(data);

    });

    $('paper-tab').on('down', function(evt){
      // alert('clicked');
      // console.log(evt);
      $('.instructions').hide();
      $('.chart-container').show();
      Session.set('side',evt.currentTarget.id)
      Meteor.call('vote',Session.get('usr'),evt.currentTarget.id);
    });

    $('core-icon-button').on('click', function(evt){
      var com = $('.the_item').val();
      if(com != ''){
           Meteor.call('comment',Session.get('usr'),Session.get('side'),com);
         }
           $('.the_item').val('');
    });




  });


  Template.hello.helpers({
    usr: function () {
      return Session.get('usr');
    },
    agree: function () {
      Session.set('agree',Votes.find({val:'agree'}).fetch().length);
      return Votes.find({val:'agree'}).fetch().length;
    },
    neutral: function () {
      Session.set('neutral',Votes.find({val:'neutral'}).fetch().length);
      return Votes.find({val:'neutral'}).fetch().length;
    },
    disagree: function () {
      Session.set('disagree',Votes.find({val:'disagree'}).fetch().length);
      return Votes.find({val:'disagree'}).fetch().length;
    },
    total: function () {
      return Session.get('agree') + Session.get('neutral') + Session.get('disagree');
    }

  });

  Template.comment.helpers({
    comments: function(){
      return Comments.find({});
    }
  });




  Template.comment.events({
    'click core-icon-button': function(e){
      // var com = $('.the_item').val();
      // Meteor.call('comment',Session.get('usr'),Session.get('side'),com);
      // $('.the_item').val('');
    // console.log(e);
  },
  'keypress input': function(e){
    if(e.charCode == 13){
      var com = $('.the_item').val();
      Meteor.call('comment',Session.get('usr'),Session.get('side'),com);
      $('.the_item').val('');
    }
}
  });

  // Template.hello.events({
  //   'click paper-tab': function(evt){
  //     alert('Clcked');
  //     // $('.instructions').hide();
  //     // $('.chart-container').show();
  //     // Session.set('side',evt.currentTarget.id)
  //     // Meteor.call('vote',Session.get('usr'),evt.currentTarget.id);
  //     // console.log(evt.currentTarget.id);
  //   }
  //
  // });
}
