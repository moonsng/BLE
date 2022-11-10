/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = [{
		date: new Date(2019, 5, 12),
		value1: 18,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 5)
	},
	{
		date: new Date(2019, 5, 13),
		value1: 25,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 6)
	},
	{
		date: new Date(2019, 5, 14),
		value1: 25,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 7)
	},
	{
		date: new Date(2019, 5, 15),
		value1: 22,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 8)
	},
	{
		date: new Date(2019, 5, 16),
		value1: 18,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 9)
	},
	{
		date: new Date(2019, 5, 17),
		value1: 17,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 10)
	},
	{
		date: new Date(2019, 5, 18),
		value1: 19,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 11)
	}
]

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;


var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value1";
series.dataFields.dateX = "date";
series.strokeWidth = 1;
series.fillOpacity = 0.5;
series.minBulletDistance = 10;
series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
series.tooltip.pointerOrientation = "vertical";

// Create series
var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "value2";
series2.dataFields.dateX = "date";
series2.strokeWidth = 2;
series2.stroke = am4core.color("#ff0000")
series2.strokeDasharray = "3,4";
series2.stroke = series.stroke;

// Create series
var series3 = chart.series.push(new am4charts.LineSeries());
series3.dataFields.valueY = "value3";
series3.dataFields.dateX = "date";
series3.strokeWidth = 1;
series3.strokeDasharray = "3,4";
series3.stroke = series.stroke;

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;






/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end



// create chart
var chart = am4core.create("chartDd01", am4charts.GaugeChart);
chart.innerRadius = -15;

var axis = chart.xAxes.push(new am4charts.ValueAxis());
axis.min = 0;
axis.max = 100;
axis.strictMinMax = true;

var colorSet = new am4core.ColorSet();

var gradient = new am4core.LinearGradient();
gradient.stops.push({
	color: am4core.color("green")
})
gradient.stops.push({
	color: am4core.color("yellow")
})
gradient.stops.push({
	color: am4core.color("red")
})

axis.renderer.line.stroke = gradient;
axis.renderer.line.strokeWidth = 10;
axis.renderer.line.strokeOpacity = 1;

axis.renderer.grid.template.disabled = true;

var hand = chart.hands.push(new am4charts.ClockHand());
hand.radius = am4core.percent(97);

setInterval(function () {
	hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
}, 2000);








/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end



// create chart
var chart = am4core.create("chartDd02", am4charts.GaugeChart);
chart.innerRadius = -15;

var axis = chart.xAxes.push(new am4charts.ValueAxis());
axis.min = 0;
axis.max = 100;
axis.strictMinMax = true;

var colorSet = new am4core.ColorSet();

var gradient = new am4core.LinearGradient();
gradient.stops.push({
	color: am4core.color("green")
})
gradient.stops.push({
	color: am4core.color("yellow")
})
gradient.stops.push({
	color: am4core.color("red")
})

axis.renderer.line.stroke = gradient;
axis.renderer.line.strokeWidth = 10;
axis.renderer.line.strokeOpacity = 1;

axis.renderer.grid.template.disabled = true;

var hand = chart.hands.push(new am4charts.ClockHand());
hand.radius = am4core.percent(97);

setInterval(function () {
	hand.showValue(Math.random() * 100, 1000, am4core.ease.cubicOut);
}, 2000);






/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end



// Create chart instance
var chart = am4core.create("chartdiv02", am4charts.XYChart);

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

for (var i = 0; i < 4; i++) {
	createSeries("value" + i, "Series #" + i);
}

// Create series
function createSeries(s, name) {
	var series = chart.series.push(new am4charts.LineSeries());
	series.dataFields.valueY = "value" + s;
	series.dataFields.dateX = "date";
	series.name = name;

	var segment = series.segments.template;
	segment.interactionsEnabled = true;

	var hoverState = segment.states.create("hover");
	hoverState.properties.strokeWidth = 3;

	var dimmed = segment.states.create("dimmed");
	dimmed.properties.stroke = am4core.color("#dadada");

	segment.events.on("over", function (event) {
		processOver(event.target.parent.parent.parent);
	});

	segment.events.on("out", function (event) {
		processOut(event.target.parent.parent.parent);
	});

	var data = [];
	var value = Math.round(Math.random() * 100) + 100;
	for (var i = 1; i < 100; i++) {
		value += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 30 + i / 5);
		var dataItem = {
			date: new Date(2018, 0, i)
		};
		dataItem["value" + s] = value;
		data.push(dataItem);
	}

	series.data = data;
	return series;
}



chart.legend = new am4charts.Legend();
chart.legend.position = "right";
chart.legend.scrollable = true;
chart.legend.itemContainers.template.events.on("over", function (event) {
	processOver(event.target.dataItem.dataContext);
})

chart.legend.itemContainers.template.events.on("out", function (event) {
	processOut(event.target.dataItem.dataContext);
})

function processOver(hoveredSeries) {
	hoveredSeries.toFront();

	hoveredSeries.segments.each(function (segment) {
		segment.setState("hover");
	})

	chart.series.each(function (series) {
		if (series != hoveredSeries) {
			series.segments.each(function (segment) {
				segment.setState("dimmed");
			})
			series.bulletsContainer.setState("dimmed");
		}
	});
}

function processOut(hoveredSeries) {
	chart.series.each(function (series) {
		series.segments.each(function (segment) {
			segment.setState("default");
		})
		series.bulletsContainer.setState("default");
	});
}




// Themes begin
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
var chart = am4core.create("chartdivPop", am4charts.XYChart);

// Add data
chart.data = [{
		date: new Date(2019, 5, 12),
		value1: 18,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 5)
	},
	{
		date: new Date(2019, 5, 13),
		value1: 25,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 6)
	},
	{
		date: new Date(2019, 5, 14),
		value1: 25,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 7)
	},
	{
		date: new Date(2019, 5, 15),
		value1: 22,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 8)
	},
	{
		date: new Date(2019, 5, 16),
		value1: 18,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 9)
	},
	{
		date: new Date(2019, 5, 17),
		value1: 17,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 10)
	},
	{
		date: new Date(2019, 5, 18),
		value1: 19,
		value2: 18,
		value3: 32,
		previousDate: new Date(2019, 5, 11)
	}
]

// Create axes
var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
dateAxis.renderer.minGridDistance = 50;


var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.valueY = "value1";
series.dataFields.dateX = "date";
series.strokeWidth = 1;
series.fillOpacity = 0.5;
series.minBulletDistance = 10;
series.tooltipText = "[bold]{date.formatDate()}:[/] {value1}\n[bold]{previousDate.formatDate()}:[/] {value2}";
series.tooltip.pointerOrientation = "vertical";

// Create series
var series2 = chart.series.push(new am4charts.LineSeries());
series2.dataFields.valueY = "value2";
series2.dataFields.dateX = "date";
series2.strokeWidth = 2;
series2.stroke = am4core.color("#ff0000")
series2.strokeDasharray = "3,4";
series2.stroke = series.stroke;

// Create series
var series3 = chart.series.push(new am4charts.LineSeries());
series3.dataFields.valueY = "value3";
series3.dataFields.dateX = "date";
series3.strokeWidth = 1;
series3.strokeDasharray = "3,4";
series3.stroke = series.stroke;

// Add cursor
chart.cursor = new am4charts.XYCursor();
chart.cursor.xAxis = dateAxis;