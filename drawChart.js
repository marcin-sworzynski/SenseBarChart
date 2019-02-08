// JavaScript
define(["d3"],function(d3){

	return {
		drawChart: function(data,measureLabels,width,height,id,valueLabels,chartLayout){
			
			
			var margin={top:20,right:20,bottom:30,left:40};
			width=width-margin.left-margin.right;
			height=height-margin.top-margin.bottom;
			
			var svg=d3.select('#'+id)
					.append("svg")
					.attr("width",width+margin.left+margin.right)
					.attr("height",height+margin.top+margin.bottom)
					.append('g')
					.attr("transform","translate("+margin.left+","+margin.top+")");
			var barHeight=parseFloat(height/data.length);
			var barWidth=parseFloat(width/data.length);

			//grouping element for bars 
			var bar=svg.selectAll('g')
						.data(data)
						.enter()
						.append('g');
						
			
			var x=d3.scale.linear()
					.domain([0,d3.max(data,function(d){return d.msr1;})])
					.range([0,width]);

			var y=d3.scale.linear()
					.domain([0,d3.max(data,function(d){return d.msr1;})])
					.range([height,0])
			
			/* chart layout 
			h- horizontal bar chart 
			v- vertical bar chart */
			
			if(chartLayout==='h'){ 
				bar.attr('transform',function(d,i){return "translate(0,"+i*barHeight+")";})			
					.append('rect')
					.attr('width',function(d){return x(d.msr1)})
					.attr('test',function(d){return d.msr1})
					.attr('height',barHeight-1);
				var xAxis=d3.svg.axis()
							.scale(x)
							.orient('bottom');
				svg.append('g')
					.attr('class','x-axis')
					.attr('transform','translate(0,'+height+')')
					.call(xAxis);
				
				//display/not display value labels on top of the bars
				if(valueLabels){
					bar.append('text')
						.attr('x',function(d){return x(d.msr1)-3})
						.attr('y',barHeight/2)
						.attr('dy','.35em')
						.text(function(d){return d.msr1});		
				}					
			}
			else{		
				bar.attr('transform',function(d,i){return 'translate('+i*barWidth+",0)";})
					.append('rect')
					.attr('y',function(d){return y(d.msr1)})
					.attr('height',function(d){return height-y(d.msr1)})
					.attr('width',barWidth-2);
				if(valueLabels){
					bar.append('text')
						//.attr('x',function(d,i){return i*barWidth})
						.attr('y',function(d){return y(d.msr1)})
						.text(function(d){return d.msr1})
						.attr('fill','black');
				
				}
					
			}
			

				bar.style('fill','lightblue');
			
			
				
		}
	};
});