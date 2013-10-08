/*
 * ChartLegend.js
 * A legend addition for Chart.js (http://chartjs.org/)
 *
 * Copyright 2013 Ricardo Mones
 * Released under MIT license
 * See https://github.com/mones/ChartLegend/blob/master/LICENSE
 */

window.ChartLegend = function(parentId) {

    var chartLegend = this;

    this.defaults = {
        spotSizePixels : 12,
	spotBorder : true,
	spotBorderColor : 'rgba(128,128,128,0.8)',
	spotBorderSize : 1,
	titleFontFamily : "'Arial'",
	titleFontSize : 12,
	titleFontStyle : 'normal',
	titleColor : 'rgba(0,0,0,0.9)',
	titleBackgroundColor : 'rgba(255,255,255,1)',
	legendBorder : true,
	legendBorderColor : 'rgba(128,128,128,0.8)',
	legendBorderSize : 1,
	legendPadding : 2,
    };

    this.Vertical = function(data, options) {
        var cfg = (options)? mergeChartConfig(chartLegend.defaults, options): chartLegend.defaults;
        return new Vertical(parentId, data, cfg);
    }

    this.Horizontal = function(data, options) {
        var cfg = (options)? mergeChartConfig(chartLegend.defaults, options): chartLegend.defaults;
        return new Horizontal(parentId, data, cfg);
    }

    function styleSpot(spot, options) {
        spot.style.width = options.spotSizePixels + 'px';
        spot.style.height = options.spotSizePixels + 'px';
	if (options.spotBorder) {
            spot.style.borderColor = options.spotBorderColor;
            spot.style.borderStyle = 'solid';
            spot.style.borderWidth = options.spotBorderSize + 'px';
	}
    }

    function styleTitle(title, options) {
	title.style.fontFamily = options.titleFontFamily;
	title.style.fontSize = options.titleFontSize + 'px';
	title.style.fontStyle = options.titleFontStyle;
	title.style.color = options.titleColor;
	title.style.backgroundColor = options.titleBackgroundColor;
    }

    function styleLegend(legend, options) {
        if (options.legendBorder) {
	    legend.style.borderColor = options.legendBorderColor;
	    legend.style.borderStyle = 'solid';
	    legend.style.borderWidth = options.legendBorderSize + 'px';
	    legend.style.padding = options.legendPadding + 'px';
	}
    }

    function getDatasetColor(d) {
        if (d.hasOwnProperty('strokeColor')) {
            if (typeof d.strokeColor === 'string') {
	        return d.strokeColor
            } else {
	        return d.strokeColor[0];
            }	
        }
        return d.color;
    }

    var Vertical = function(parentId, data, config) {
        var parent = document.getElementById(parentId);
        parent.className = 'legend';
        var datas = data.hasOwnProperty('datasets') ? data.datasets : data;
        var table = document.createElement('table');
        parent.appendChild(table);
	styleLegend(table, config);

        datas.forEach(function(d) {
    	    var row = document.createElement('tr');
	    table.appendChild(row);
	    var color = document.createElement('td');
	    row.appendChild(color);
	    var spot = document.createElement('div');
            color.appendChild(spot);
            styleSpot(spot, config);
            spot.style.backgroundColor = getDatasetColor(d);
            var title = document.createElement('td');
            row.appendChild(title);
	    styleTitle(title, config);
            title.className = 'title';
            var text = document.createTextNode(d.title);
            title.appendChild(text);
        });
    }

    var Horizontal = function(parentId, data, config) {
        var parent = document.getElementById(parentId);
        parent.className = 'legend';
        var datas = data.hasOwnProperty('datasets') ? data.datasets : data;
        var table = document.createElement('table');
        parent.appendChild(table);
	styleLegend(table, config);
    	var row = document.createElement('tr');
	table.appendChild(row);

        datas.forEach(function(d) {
	    var cell = document.createElement('td');
	    row.appendChild(cell);
	    var subtable = document.createElement('table');
	    cell.appendChild(subtable);
	    var subrow = document.createElement('tr');
	    subtable.appendChild(subrow);
	    var color = document.createElement('td');
	    subrow.appendChild(color);
	    var spot = document.createElement('div');
            color.appendChild(spot);
            styleSpot(spot, config);
            spot.style.backgroundColor = getDatasetColor(d);
            var title = document.createElement('td');
            subrow.appendChild(title);
	    styleTitle(title, config);
            title.className = 'title';
            var text = document.createTextNode(d.title);
            title.appendChild(text);
        });
    }

    // from Chart.js
    function mergeChartConfig(defaults, userDefined) {
        var returnObj = {};
	for (var attrname in defaults) { returnObj[attrname] = defaults[attrname]; }
	for (var attrname in userDefined) { returnObj[attrname] = userDefined[attrname]; }
	return returnObj;
    }
}

