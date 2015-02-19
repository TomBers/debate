// M7pymCp4EPZoKDeNL

Template.history.rendered = function(){



  $( window ).resize(function() {
    setDimensions();
});

  Tracker.autorun(function () {

  var hist = History.find({debate:'M7pymCp4EPZoKDeNL'},{sort: {DateTime:1}}).fetch();
  var series = [];
  var agree = [];
  var disagree =[];
  var neutral = [];
  hist.forEach(function(dat){
    // console.log(dat);
    series.push(dat.DateTime.toTimeString());
    agree.push(dat.agree);
    disagree.push(dat.disagree);
    neutral.push(dat.neutral);
  })

  setDimensions();

  var options = {
    width: Session.get('ww'),
    height: Session.get('wh'),
    showLabel:false
  };


  var histGraph = new Chartist.Line('.ct-chart', {
  labels: series,
  series: [
    agree,
    neutral,
    disagree
  ]},options);

  histGraph.update();

});



// BAR code

//   new Chartist.Bar('.ct-chart', {
//   labels: series,
//   series: [
//     agree,
//     neutral,
//     disagree
//   ]
// }, {
//   stackBars: true,
//   axisY: {
//     labelInterpolationFnc: function(value) {
//       return (value);
//     }
//   }
// }).on('draw', function(data) {
//   if(data.type === 'bar') {
//     data.element.attr({
//       style: 'stroke-width: 30px'
//     });
//   }
// });


}

function setDimensions(){
  Session.set('wh',$(window).height() - 50);
  Session.set('ww',$(window).width() - 50 );

}
