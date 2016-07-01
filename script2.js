
var graph1=function(data){
  var margin={top:30, bottom:80, left:120, right:100},
  width=900-margin.left-margin.right,
  height=500-margin.top-margin.bottom;
//var p = d3.time.format("%2001%0%0").parse;

var x = d3.time.scale()
   .range([0, width]);

var y = d3.scale.linear()
   .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
   .scale(x)
   .orient("bottom")
   .ticks(30);


var yAxis = d3.svg.axis()
   .scale(y)
   .orient("left")
   .ticks(20);

var line = d3.svg.line()
   .interpolate("allows")
   .x(function(d) { return x(d.year); })
   .y(function(d) { return y(d.arrest); });

var svg = d3.select("#json1").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
 .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   //var a=[];

   data.forEach(function(d){
     d.year=+d.year;
   //  a.push(new Date(d.year,0,0));
    d.Arrested=+d.Arrested;
    d.NotArrested=+d.NotArrested;
   });

 color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));
 var assault = color.domain().map(function(name) {
   return {
     name: name,
     values: data.map(function(d) {
       return {year: d.year, arrest: +d[name]};
     })
   };
 });

 x.domain(d3.extent(data, function(d) { return d.year; }));

 y.domain([
   0,
   d3.max(assault, function(c) { return d3.max(c.values, function(v) { return v.arrest; }); })
 ]);

 svg.append("g")
 .attr("class", "x axis")
 .attr("transform", "translate(0," + height + ")")
 .call(xAxis)
 .append("text")
 .attr("transform", "translate(" + width + ",1)")
  .style("font-size","12px")
  .style("font-weight","bold")
  .text("Years");

 svg.append("g")
     .attr("class", "y axis")
     .call(yAxis)
     .append("text")
     .attr("transform", "rotate(-90)")
     .attr("y",6)
     .attr("dy","1em")
     .style("text-anchor", "end")
     .style("font-size","12px")
     .style("font-weight","bold")
     .text("No.of Arrests & Non-Arrests People");

 var result = svg.selectAll(".chart")
     .data(assault)
   .enter().append("g")
     .attr("class", "chart");

 result.append("path")
     .attr("class", "line")
     .attr("d", function(d) { return line(d.values); })
     .style("stroke", function(d) { return color(d.name); });
     result.append("text")
         .datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
         .attr("transform", function(d) { return "translate(" + x(d.value.year) + "," + y(d.value.arrest) + ")"; })
         .text(function(d) { return d.name; });
   };
