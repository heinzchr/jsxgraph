/*
    Copyright 2008,2009
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with JSXGraph.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Slider (Schieberegler)
 * input: 3 arrays:
 * [x0,y0],[x1,y1],[min,start,max]
 * The slider is line from [x0,y0] to [x1,y1].
 * The position [x0,y0]  corresponds to the value "min",
 * [x1,y1] corresponds to the value max.
 * Initally, the slider is at position [x0,y0] + ([x1,y1]-[x0,y0])*start/(max-min)
 * The return value is an invisible point, whos X() or Y() value
 * returns the position between max and min,
 * Further, there is a method Value() returning the same value.
 **/
JXG.createSlider = function(board, parentArr, atts) {
    var pos0, pos1, smin, start, smax, p1, p2, l1, ticks, ti, startx, starty, p3, l2, p4, n, t;
    pos0 = parentArr[0];
    pos1 = parentArr[1];
    smin = parentArr[2][0];
    start = parentArr[2][1];
    smax = parentArr[2][2];
    p1 = board.createElement('point', pos0, {visible:false, fixed:true, name:''}); 
    p2 = board.createElement('point', pos1, {visible:false, fixed:true, name:''}); 
    l1 = board.createElement('line', [p1,p2], {straightFirst:false, straightLast:false, strokewidth:1, name:''});
    ticks  = 1;
    ti = board.createElement('ticks', [l1, p2.Dist(p1)/ticks],{insertTicks:true, drawLabels:false, drawZero:true}); 

    p1.needsRegularUpdate = false;
    p2.needsRegularUpdate = false;
    l1.needsRegularUpdate = false;
    
    startx = pos0[0]+(pos1[0]-pos0[0])*(start-smin)/(smax-smin);
    starty = pos0[1]+(pos1[1]-pos0[1])*(start-smin)/(smax-smin);

    p3 = board.createElement('glider', [startx,starty,l1], {style:6,strokeColor:'#0080c0',fillColor:'#0080c0',showInfobox:false,name:''});
    l2 = board.createElement('line', [p1,p3], {straightFirst:false, straightLast:false, strokewidth:3, strokeColor:'#0080c0',name:''}); 
    p4 = board.createElement('point', [
            function() {return p3.Dist(p1)/p2.Dist(p1)*(smax - smin)+smin;}, 
            function() {return p3.Dist(p1)/p2.Dist(p1)*(smax - smin)+smin;}
            ], 
            {visible:false,name:'',snapWidth:1});
    p4.Value = p4.X;
    if (atts['name'] && atts['name']!='') {
        n = atts['name'] + ' = ';
    } else {
        n = '';
    }
    t = board.createElement('text', [((pos1[0]-pos0[0])*.05+pos1[0]), ((pos1[1]-pos0[1])*.05+pos1[1]), function(){return n+(p4.X()).toFixed(2);}],{name:''}); 
    return p4;
};    

JXG.JSXGraph.registerElement('slider', JXG.createSlider);