$(document).ready(function() {

  var width = 1400,
      height = 1000;

  var rateById = d3.map();

  var quantize = d3.scale.quantize()
      .domain([0,13])
      .range(d3.range(13).map(function(i) { return "fs" + i; }));

  var path = d3.geo.path();

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  var data = (function() {
          var json = null;
          $.ajax({
              'async': false,
              'global': false,
              'url': "/fire_data.json",
              'dataType': "json",
              'success': function (data) {

                var hash = {};

                  $.each(data, function(k,v) {
                    hash[v[0]] = v[2];
                  });


                  queue()
                      .defer(d3.json, "/us.json")
                      //.defer(d3.tsv, "/unemployment.tsv", function(d) { rateById.set(d.id, +d.rate); })
                //      .defer(d3.json, "/fire_data.json", function(d) {
                //
                //
                //        $.each(d, function(k, v) {
                //          //console.log(v[0]+" "+v[2]);
                //
                //          data.push([v[0], v[2]]);
                //
                //          //rateById.set( v[0], v[2] );
                //        });
                //
                //      })
                      .await(ready);




                  function ready(error, us) {

                    svg.append("g")
                        .attr("class", "counties")
                      .selectAll("path")
                        .data(topojson.feature(us, us.objects.counties).features)
                      .enter().append("path")
                        .attr("class", function(d) {

                          return quantize(hash[d.id]);

                        })
                        .attr("d", path);

                    svg.append("path")
                        .datum(topojson.mesh(us, us.objects.states, function(a, b) {
                         //console.log(b);
                          return a !== b; }))
                        .attr("class", "states")
                        .attr("d", path);
                  }



              }
          });
          return json;
      })();




});