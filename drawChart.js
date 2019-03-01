// JavaScript
define(["jquery","d5"],function($,d3){

	return {
		drawChart: function(data,measureLabels,width,height,id,valueLabels,chartLayout){
			
			var refBarHeight=3 //define height of the reference bar
			
			var valArray=new Array();
			var margin={top:20,right:20,bottom:30,left:140};
			width=width-margin.left-margin.right;
			height=height-margin.top-margin.bottom;
		
			
			var div=d3.select('#'+id)
						.append('div')
						.attr('class','tooltip')
						.style('position','absolute')
						.style('opacity',0);
			
			var svg=d3.select('#'+id)
					.append("svg")
					.attr("width",width+margin.left+margin.right)
					.attr("height",height+margin.top+margin.bottom)
					.append('g')
					.attr("transform","translate("+margin.left+","+margin.top+")");
			
						

			/***** construct scales ************************/
			var x=d3.scaleLinear()
					.domain([0,d3.max(data,function(d){return d.msr1;})])
					.range([0,width-20]);
			var x2=d3.scaleLinear()
					.domain([0,d3.max(data,function(d){return d.msr2})])
					.range([0,width-20]);
				
			var y=d3.scaleBand()
					.domain(data.map(function(d){return d.dim1.txt}))
					.range([0,height])
					.padding(0.3);
					
				
						
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
					.attr('class','bar')
					.on('mouseover',function(d){							//display pop-ups on mouseover event on chart bar
						div.html('<p>'+d.dim1.txt+'</p><p>'+measureLabels[0]+' : '+d.msr1+'</p>')
							.style('left',(x(d.msr1)+margin.left)/2+'px')   //calculate the x position the half way of chart bar (margin.left+bar.width)/2 
							.style('top',(y(d.dim1.txt)-50)+'px')
							.style('opacity',.9);
					})
					.on('mouseout',function(d){
						div.style('opacity',0)
					})
					.on('click',function(d){					
						self.selectValues(0,[d.dim1.num],true)
					});

			 	//create compare bars
				svg.selectAll('.bar-ref')
					.data(data)
					.enter()
					.append('rect')
					.attr('x',0)
					.attr('y',function(d){return y(d.dim1.txt)+y.bandwidth()/2-refBarHeight/2})
					.attr('height',refBarHeight)
					.attr('width',function(d){return x2(d.msr2)})
					.attr('class','bar-ref');
				if(valueLabels){
					svg.selectAll('.lbl')
						.data(data)
						.enter()
						.append('text')
						.attr('x',function(d){return x(d.msr1)})
						.attr('y',function(d){return y(d.dim1.txt)+(12+(y.bandwidth()-12)/2)})
						.text(function(d){return d.msr1})
						.attr('class','lbls')
						.attr('dx','.2em');				
				}

				
				
				svg.append('g')
					.attr('class','x-axis')
					.attr('transform','translate(0,'+height+')')
					.call(xAxis);
				svg.append('g')
					.attr('class','y-axis')
					.call(yAxis);
	

				
			
			
				
		}
	};
});
