require.config({
	paths:{
		"d5":"https://d3js.org/d3.v5.min"
	},
	waitSeconds:20 

});

var bcknd={};
var self={};


define( [ "jquery","d3","./drawChart","css!./chart.css"
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
			},
			selectionMode:"CONFIRM"
		},
		definition:{
			type:"items",
			component:"accordion",
			items:{
				dimensions:{
					uses:"dimensions",
					min:1,
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
								},
								colorPicker:{
									label:"Measure 1 Color",
									component:'color-picker',
									ref:'msr1_color',
									type:'integer',
									defaultValue:3
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
			
			bcknd=this.backendApi
			self=this;
			//console.log(this.selectValues(0,[5,10]));
			//console.log(this.backendApi);
			
			var valueLabels=layout.chart.valueLabels;
			var chartLayout=layout.chart.Layout //h - for horizontal chart, v- for vertical
			
			var qMatrix=layout.qHyperCube.qDataPages[0].qMatrix;
			
			var measureLabels=layout.qHyperCube.qMeasureInfo.map(function(d){
				return d.qFallbackTitle;
			});
			var data=qMatrix.map(function(d){
				return {
					dim1:{num:d[0].qElemNumber,txt:d[0].qText},
					msr1:d[1].qText,
					msr2:d[2].qText
				}
			});
			var width=$element.width();
			var height=$element.height();
			
			
			var id="container_"+ layout.qInfo.qId;
			if(document.getElementById(id)){
				$('#'+id).empty();
			}
			else{
				$element.append($('<div/>').attr('id',id).width(width).height(height).attr('postition','relative'));
			}
			console.log(layout);
			d.drawChart(data,measureLabels,width,height,id,valueLabels,chartLayout);
			

		}
	};

} );




