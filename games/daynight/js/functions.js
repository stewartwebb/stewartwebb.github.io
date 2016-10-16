// Clones objects which is useful when saving into another array.
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

// Generates an array of RGB colours between two original colours.
function gradient(startColor, endColor, steps) {
	var start = {
    'Hex'   : startColor,
    	'R'     : parseInt(startColor.slice(1,3), 16),
        'G'     : parseInt(startColor.slice(3,5), 16),
        'B'     : parseInt(startColor.slice(5,7), 16)
	}
    var end = {
		'Hex'   : endColor,
        	'R'     : parseInt(endColor.slice(1,3), 16),
        	'G'     : parseInt(endColor.slice(3,5), 16),
            'B'     : parseInt(endColor.slice(5,7), 16)
    }
    diffR = end['R'] - start['R'];
    diffG = end['G'] - start['G'];
    diffB = end['B'] - start['B'];

    stepsHex  = new Array();
    stepsR    = new Array();
    stepsG    = new Array();
    stepsB    = new Array();

    for(var i = 0; i <= steps; i++) {
    	stepsR[i] = Math.round(start['R'] + ((diffR / steps) * i));
        stepsG[i] = Math.round(start['G'] + ((diffG / steps) * i));
        stepsB[i] = Math.round(start['B'] + ((diffB / steps) * i));
        
        stepsHex[i] = 'rgb(' + stepsR[i] + ',' + stepsG[i] + ',' + stepsB[i] + ')';
        
    }
    return stepsHex;
}