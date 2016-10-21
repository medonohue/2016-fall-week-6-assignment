console.log('6.1');

//First, append <svg> element and implement the margin convention
var m = {t:50,r:50,b:50,l:50};
var outerWidth = document.getElementById('canvas').clientWidth,
    outerHeight = document.getElementById('canvas').clientHeight;
var w = outerWidth - m.l - m.r,
    h = outerHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width',outerWidth)
    .attr('height',outerHeight)
    .append('g')
    .attr('transform','translate(' + m.l + ',' + m.t + ')');

//Import data and parse
//d3.csv('../data/olympic_medal_count.csv',parse,dataLoaded);
//Import data and parse
d3.csv('../data/olympic_medal_count.csv',parse,dataLoaded);

function dataLoaded(err,rows){
	console.table(rows);

//Get the minimum and maximum numbers in a list:
	
    var //min1900 = d3.min(rows, function(d){ return d.count1900; }),
        //max1900 = d3.max(rows, function(d){ return d.count1900; }),
        //min1960 = d3.min(rows, function(d){ return d.count1960; }),
        //max1960 = d3.max(rows, function(d){ return d.count1960; }),
        min2012 = d3.min(rows, function(d){ return d.count2012; })
        max2012 = d3.max(rows, function(d){ return d.count2012; });

//could also use d3.extent, which returns min and max.  you call it by saying extent[0], extent[1]

//     console.log(min2012, max2012);


    var scaleY = d3.scaleLinear()
        			.domain([min2012,max2012])
        			.range([h,0]);
        			
    
        			
    rows.sort(function(b,a){
	    return a.count2012 - b.count2012;
    });
    
    var top5 = rows.slice(0,5);
	console.table(top5);
	
	var scaleX = d3.scaleOrdinal()
        .domain(top5.map(function (d) { return d.country;}))
        .range(d3.range(0, w, w/5));
        
        console.log(scaleX("United States"))    			

	
  var bars = plot.selectAll("rect")
    .data(top5)
    .enter().append("rect")
	.attr("x", function (d, i) {return scaleX(d.country);})
	.attr("y", function (d) {return scaleY(d.count2012);})
	.attr("width", function (d) {return 30;})
	.attr("height", function (d) { return h - scaleY(d.count2012); });
	


//create the axis function
    var axisX = d3.axisBottom() //choose one of the four position options and feed it a scale
    	.scale(scaleX)
    	.tickSize(0);
    	
    	//then pass a selection into the axis function
    	var axisNode = plot.append('g').attr('class','axis')
    	.attr('transform','translate(0,'+h+')');
		axisX(axisNode);

//create the axis function
    var axisY = d3.axisLeft() //choose one of the four position options and feed it a scale
    	.scale(scaleY)
    	.tickSize(5)
    	.ticks(20, "s");
    	
    	//then pass a selection into the axis function
    	var axisNode2 = plot.append('g').attr('class','axis')
    	.attr('transform','translate(-30,0)');
		axisY(axisNode2);

};

//parse
function parse(d){
		
	return {
		country: d.Country,//d.CountryName 
		//count1900: +d['1900'],
		//count1960: +d['1960'],
		count2012: +d['2012']
	}
};


