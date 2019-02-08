require.config({
	paths:{
		"d3":"https://d3js.org/d3.v5.min.js",
	},
	waitSeconds:20

});




define( [ "jquery","d3","./drawChart"
],
function ($,d3,d) {

	return {
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		initialProperties:{
			qHyperCubeDef:{
				qDimensions:[],
				qMeasures:[],
				qInitialDataFetch:[{
					qWidth:4,
					qHeight:500
				}]
			}
		},
		definition:{
			type:"items",
			component:"accordion",
			items:{
				dimensions:{
					uses:"dimensions",
					min:2,
					max:2
				},
				measures:{
					uses:"measures",
					min:2,
					max:2
				},
				sorting:{
					uses:"sorting"
				},
				appearance:{
					uses:"settings",
					items:{
						chartType:{
							type:"items",
							label:"Presentation",
							items:{
								chartLayout:{
									type:"string",
									component:"buttongroup",
									label:"Chart Layout",
									ref:"chart.Layout",
									options:[{
										value:"v",
										label:"Vertical",
										tooltip:"Select vertical chart"
									},{
										value:"h",
										label:"Horizontal",
										tooltip:"Select horizontal chart"								
									}		
									]								
								},
								chartLabels:{
									type:"boolean",
									component:"switch",
									label:"Value labels",
									ref:"chart.valueLabels",
									options:[{
										value:true,
										label:"On"
									},{
										value:false,
										label:"Off"
									}]								
								}
							}
						}
					}
				}
			}
		},
		paint: function ($element,layout) {
			//add your rendering code here
			//$element.html( "Chart" );
			//needed for export
			//return qlik.Promise.resolve();
			var valueLabels=layout.chart.valueLabels;
			var chartLayout=layout.chart.Layout //h - for horizontal chart, v- for vertical
			
			var qMatrix=layout.qHyperCube.qDataPages[0].qMatrix;
			var measureLabels=layout.qHyperCube.qMeasureInfo.map(function(d){
				return d.qFallbackTitle;
			});
			var data=qMatrix.map(function(d){
				return {
					dim1:d[0].qText,
					msr1:d[2].qNum,
					msr2:d[3].qNum
				}
			});
			var width=$element.width();
			var height=$element.height();
			
			
			var id="container_"+ layout.qInfo.qId;
			if(document.getElementById(id)){
				$('#'+id).empty();
			}
			else{
				$element.append($('<div/>').attr('id',id).width(width).height(height));
			}
			console.log(layout);
			d.drawChart(data,measureLabels,width,height,id,valueLabels,chartLayout);
			

		}
	};

} );




