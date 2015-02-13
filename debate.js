if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('usr',Math.random());


  Meteor.startup(function () {

   data = {
  series: [1,1,1]
};



    var sum = function(a, b) { return a + b };


    mypie = new Chartist.Pie('.ct-chart', data, {
      labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
      }
    });

  });





  Template.hello.helpers({
    usr: function () {
      return Session.get('usr');
    },
    agree: function () {
      Session.set('agree',Votes.find({val:'agree'}).fetch().length);
      graphUpdte();
      return Votes.find({val:'agree'}).fetch().length;
    },
    neutral: function () {
      Session.set('neutral',Votes.find({val:'neutral'}).fetch().length);
      graphUpdte();
      return Votes.find({val:'neutral'}).fetch().length;
    },
    disagree: function () {
      Session.set('disagree',Votes.find({val:'disagree'}).fetch().length);
      graphUpdte();
      return Votes.find({val:'disagree'}).fetch().length;
    },

  });

  Template.hello.events({
    'change [type=radio]': function(evt){
      Meteor.call('vote',Session.get('usr'),evt.currentTarget.value);

    }
  });
}


function graphUpdte(){
  data = {
 series: [Session.get('agree'),Session.get('neutral'),Session.get('disagree')]
};
try{
mypie.update(data);
}
catch(e){}

}
