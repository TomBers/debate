  Session.setDefault('usr',Math.random());
  Session.setDefault('agree',0);
  Session.setDefault('neutral',0);
  Session.setDefault('disagree',0);
  Session.setDefault('side','none');
 data = {
  series: [1, 1, 1]
};

var sum = function(a, b) { return a + b };

Template.hello.rendered = function(){

  this.autorun(function () {
    Session.set('debate',Router.current().location.get().path.substring(1));


    mypie = new Chartist.Pie('.ct-chart', data,{donut: true,showLabel:false,donutWidth:90});

    $('paper-tab').on('down', function(evt){
      $('.instructions').hide();
      $('.chart-container').show();
      Session.set('side',evt.currentTarget.id)
      Meteor.call('vote',Session.get('debate'),Session.get('usr'),evt.currentTarget.id);
    });

    $('core-icon-button').on('click', function(evt){
      var com = $('.the_item').val();
      if(com != ''){
           Meteor.call('comment',Session.get('debate'),Session.get('usr'),Session.get('side'),com);
         }
           $('.the_item').val('');
    });

    $('input').keypress(function(e){
      if(e.charCode == 13){
        var com = $('.the_item').val();
        if(com != ''){
             Meteor.call('comment',Session.get('debate'),Session.get('usr'),Session.get('side'),com);
           }
             $('.the_item').val('');

      }
    });



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

};



  Template.hello.helpers({
    usr: function () {
      return Session.get('usr');
    },
    selected: function () {
      try{
      var side = Votes.findOne({debate:Session.get('debate'),usr:Session.get('usr')}).val;
      switch (side){
        case 'agree' :return 0;break;
        case 'neutral' : return 1;break;
        case 'disagree': return 2;break;
        default : return null;
      }
    }catch(e){}



    },
    agree: function () {
      var ta = Votes.find({debate:Session.get('debate'),val:'agree'}).fetch().length;
      Session.set('agree',ta);
      return ta;
    },
    neutral: function () {
      var tn = Votes.find({debate:Session.get('debate'),val:'neutral'}).fetch().length;
      Session.set('neutral',tn);
      return tn;
    },
    disagree: function () {
      var td = Votes.find({debate:Session.get('debate'),val:'disagree'}).fetch().length;
      Session.set('disagree',td);
      return td;
    },
    total: function () {
      return Session.get('agree') + Session.get('neutral') + Session.get('disagree');
    }

  });

  Template.comment.helpers({
    comments: function(){
      return Comments.find({debate:Session.get('debate')},{sort: {DateTime:-1}});
    }
  });




//   Template.comment.events({
//     'click core-icon-button': function(e){
//       // var com = $('.the_item').val();
//       // Meteor.call('comment',Session.get('usr'),Session.get('side'),com);
//       // $('.the_item').val('');
//     // console.log(e);
//   },
//   'keypress input': function(e){
//
// }
//   });

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
