
function GraphLine(){
	// set the dimensions and margins of the graph
	var margin = {top: 20, right: 50, bottom: 30, left: 50},
		width = 960 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// parse the date / time
	//var parseTime = d3.timeParse("%d-%b-%y");

	// set the ranges
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// define the line
	var valueline = d3.line()
		.x(function(d) { return x(d.date); })
		.y(function(d) { return y(d.close); });

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select("#morris-area-chart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");

	// gridlines in x axis function
	function make_x_gridlines() {		
		return d3.axisBottom(x)
			.ticks(20)
	}

	// gridlines in y axis function
	function make_y_gridlines() {		
		return d3.axisLeft(y)
			.ticks(5)
	}

	// Get the data
	d3.csv("data1.csv", function(error, data) {
	  if (error) throw error;

	  // format the data
	  data.forEach(function(d) {
		  d.date =  d.date;
		  d.close = +d.close;
	  });

	  // Scale the range of the data
	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  y.domain(d3.extent(data, function(d) { return d.close; }));
	  //y.domain([0, d3.max(data, function(d) { return d.close; })]);

	  // add the X gridlines
	  svg.append("g")			
		  .attr("class", "grid")
		  .attr("transform", "translate(0," + height + ")")
		  .call(make_x_gridlines()
			  .tickSize(-height)
			  .tickFormat("")
		  )

	  // add the Y gridlines
	  svg.append("g")			
		  .attr("class", "grid")
		  .call(make_y_gridlines()
			  .tickSize(-width)
			  .tickFormat("")
		  )

	  // add the valueline path.
	  svg.append("path")
		  .data([data])
		  .attr("class", "line")
		  .attr("d", valueline);

	  // add the X Axis
	  svg.append("g")
		  .attr("transform", "translate(0," + height + ")")
		  .call(d3.axisBottom(x));

	  // add the Y Axis left
	  svg.append("g")
		  .call(d3.axisLeft(y));

	  // add the Y Axis right
	  svg.append("g")
		.attr("transform", "translate(" + width +",0)")	
		.call(d3.axisRight(y));
	
	});
}