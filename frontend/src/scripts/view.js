/**
 * Example Sift Sift. Frontend view entry point.
 */
import { SiftView, registerSiftView } from '@redsift/sift-sdk-web';
import { select } from 'd3';
import cloud from 'd3-cloud/build/d3.layout.cloud.js'

export default class MyView extends SiftView {
  constructor() {
  // You have to call the super() method to initialize the base class.
    super();
    this.controller.subscribe('words', this.onWords.bind(this));
  }

  presentView(value) {
    console.log('counter: presentView: ', value);
    this.onWords(value.data);
  }

  willPresentView(value) {
    console.log('counter: willPresentView: ', value);
  }

  onWords(words) {
    var formatted = words.map(({ value, key }) => ({ text: key, size: value}));
    var layout = cloud()
      .size([1600,800])
      .words(formatted)
      .padding(5)
      .rotate(function() { return ~~(Math.random() * 2) * 90; })
      .fontSize(function(d) { return 7 * d.size; })
      .on("end", draw);

    layout.start();

    function draw(formatted) {
     select("body").append("svg")
          .attr("width", layout.size()[0])
          .attr("height", layout.size()[1])
        .append("g")
          .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
        .selectAll("text")
          .data(formatted)
        .enter().append("text")
          .style("font-size", function(d) { return 9 * Math.sqrt(d.size) + "px"; })
          // .style("font-family", "Impact")
          // .style("fill", function(d, i) { return scale.category20()(i); })
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
          })
          .text(function(d) { return d.text; });

    }
  }
}

registerSiftView(new MyView(window));
