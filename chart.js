// JavaScript
define(["d5"],function(d3){

	return {
		drawChart: function(data,measureLabels,width,height,id,valueLabels,chartLayout){
			
			
			
			var valArray=new Array();
			var margin={top:20,right:20,bottom:30,left:140};
			width=width-margin.left-margin.right;
			height=height-margin.top-margin.bottom;
			
			var svg=d3.select('#'+id)
					.append("svg")
					.attr("width",width+margin.left+margin.right)
					.attr("height",height+margin.top+margin.bottom)
					.append('g')
					.attr("transform","translate("+margin.left+","+margin.top+")");
			
						

			/***** construct scales ************************/
			var x=d3.scaleLinear()
					.domain([0,d3.max(data,function(d){return d.msr1;})])
					.range([0,width]);
				
			var y=d3.scaleBand()
					.domain(data.map(function(d){return d.dim1.txt}))
					.range([0,height])
					.padding(0.3);
					
									
			/* chart layout 
			h- horizontal bar chart 
			v- vertical bar chart */
			
			if(chartLayout==='h'){ 
				
						
				var xAxis=d3.axisBottom()
							.scale(x)
							.tickSize(1);
							
				var yAxis=d3.axisLeft()
							.scale(y)
							.tickSize(1);
							
				svg.selectAll('.bar')
					.data(data)
					.enter()
					.append('rect')
					.attr('x','0')
					.attr('y',function(d){return y(d.dim1.txt)})
					.attr('height',y.bandwidth())
					.attr('width',function(d){return x(d.msr1)})
					.on('click',function(d){
						
						valArray.push(d.dim1.num);
						console.log(valArray);
						bcknd.selectValues(0,valArray,true);
					})
				
				svg.selectAll('.lbl')
					.data(data)
					.enter()
					.append('text')
					.attr('x',function(d){return x(d.msr1)})
					.attr('y',function(d){return y(d.dim1.txt)+(12+(y.bandwidth()-12)/2)})
					.text(function(d){return d.msr1})
					.attr('class','lbls');
				
				
				svg.append('g')
					.attr('class','x-axis')
					.attr('transform','translate(0,'+height+')')
					.call(xAxis);
				svg.append('g')
					.attr('class','y-axis')
					.call(yAxis);
								
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
			

				
			
			
				
		}
	};
});
