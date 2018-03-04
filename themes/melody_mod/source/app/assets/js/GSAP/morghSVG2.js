TweenLite.set("svg", {position:"absolute", left:"50%", xPercent:-50});
TweenLite.defaultEase = Power4.easeInOut;
var tl = new TimelineMax({delay:0.3}),
		flap = new TimelineMax({repeat:10}),
		scrubTween = TweenLite.to("#scrubber", 10, {x:682, ease:Linear.easeNone, paused:true});

tl.to("#M", 2, {morphSVG:{shape:"#cape", shapeIndex:-19}, fill:"#444"}, 0)
	.to("#H", 2, {morphSVG:"#torso", fill:"#777"}, 0.1)
	.to("#P", 2, {morphSVG:{shape:"#legs", shapeIndex:-24}, fill:"#777"}, 0.1)
	.to("#O", 2, {morphSVG:"#head", fill:"#777"}, 0.05)
	.to("#R", 1.5, {morphSVG:{shape:"#sock", shapeIndex:-11}, fill:"#88CE02", transformOrigin:"-100 60"}, 0.5)
	.set("#GUY, #capeFlow1", {visibility:"visible", opacity:1}, 1.6)
	.to("#M, #O, #R, #P, #H", 0.7, {autoAlpha:0, ease:Linear.easeNone}, 1.6);

flap.add([
	waveSVG(document.getElementById("capeBottom1"), {taperEnd: 80, taperStart:2, loose:true, length:120, angle:-52, magnitude:10, phase:110, duration:2, start:6, end:15, repeat:10}),
	waveSVG(document.getElementById("shadowBottom1"), {taperEnd: 80, taperStart:2, loose:true, length:120, angle:-32, magnitude:10, phase:110, duration:2, start:7, end:12, repeat:10}),
	waveSVG(document.getElementById("shadowTop1"), {loose:true, length:120, angle:-16, magnitude:20, phase:-140, duration:2, start:10, end:14, repeat:10}),
	waveSVG(document.getElementById("capeTop1"), {loose:true, angle: 70, length:120, magnitude:10, phase:20, duration:2, start:2, end:9, repeat:10})
]);

tl.add(flap, 2)

	.addLabel("SVG", 2.3)
	.staggerFrom("#S, #V, #G", 0.8, {x:-50, autoAlpha:0, rotation:-90, ease:Back.easeOut, transformOrigin:"center center"}, 0.15, "SVG")
	.addLabel("circles", "SVG+=2")
	.to("#S", 0.8, {morphSVG:{shape:"#circleOuter", shapeIndex:-1}, fill:"#444", ease:Power3.easeInOut}, "circles")
	.to("#G", 0.8, {morphSVG:{shape:"#circleMid", shapeIndex:-8}, fill:"#777", ease:Power3.easeInOut}, "circles+=0.1")
	.to("#V", 0.8, {morphSVG:{shape:"#circleInner", shapeIndex:10}, fill:"#000", ease:Power3.easeInOut}, "circles+=0.2")

	.addLabel("shapes", 4.9)
	.from("#heart", 0.4, {scale:0.1, autoAlpha:0, ease:Back.easeOut, transformOrigin:"center center"}, "shapes")
	.to("#heart", 1, {morphSVG:{shape:"#star"}, fill:"#FFFF66"}, "shapes+=1")
	.to("#heart", 1, {morphSVG:{shape:"#thumb"}, fill:"#3399CC"}, "shapes+=2.5")
	.to("#heart", 1, {morphSVG:{shape:"#rocket"}, fill:"orange"}, "shapes+=4")
	.to("#heart", 1, {morphSVG:{shape:"#apple"}, fill:"#CC0000"}, "shapes+=5.5")
	.to("#heart", 1, {morphSVG:{shape:"#plug"}, fill:"#9966CC"}, "shapes+=7")
	.to("#heart", 1, {morphSVG:{shape:"#light", shapeIndex:[-19, -13], map:"complexity"}, fill:"white"}, "shapes+=8.5")
	.staggerTo("#S, #V, #G", 0.8, {scale:0, autoAlpha:0, ease:Back.easeIn, transformOrigin:"center center"}, 0.1, "shapes+=10")
	.set("#heart", {autoAlpha:0}, "shapes+=10")
	.set(".bulb", {autoAlpha:1}, "shapes+=10")
	.staggerTo(".bulb", 1.5, {cycle:{morphSVG:["#morph1", "#morph2", "#morph3", "#morph4", "#morph5", "#morph6", "#morph7", "#morph8", "#morph9", "#morph10", "#morph11", "#morph12", "#morph13", "#morph14"]}}, 0.05, "shapes+=10.3")
	.from("#fromGreenSock", 1, {x:50, autoAlpha:0, ease:Power2.easeOut}, "shapes+=12");

Draggable.create("#scrubber", {
	type:"x",
	bounds:{maxX:682, minX:0},
	onPress: function() {
		tl.pause();
	},
	onDrag:function() {
		tl.time(20 * this.x / 682);
	},
	onRelease:function() {
		tl.resume();
	}
});


function updateScrubber() {
	scrubTween.progress(Math.min(1, tl.time() / 20));
}
tl.time(20).restart(true); //force initialization up front to improve runtime performance thereafter
tl.eventCallback("onUpdate", updateScrubber);



//the function below is a bit advanced and it handles the flapping cape. It leverages MorphSVGPlugin to do some heavy lifting, but ultimately relies on some custom triganometry applied in an onUpdate to manipulate the points on a sine wave. 
function waveSVG(e, vars) {
	var _placeDot = function (x, y, vars) {
				var _createSVG = function(type, attributes) {
							var element = document.createElementNS("http://www.w3.org/2000/svg", type),
									reg = /([a-z])([A-Z])/g,
									p;
							for (p in attributes) {
								element.setAttributeNS(null, p.replace(reg, "$1-$2").toLowerCase(), attributes[p]);
							}
							return element;
						},
						dot = _createSVG("circle", {cx:x, cy:y, r:vars.size || 6, fill:vars.color || "red"}),
						container = vars.container || document.querySelector("svg");
				if (container) {
					container.appendChild(dot);
				}
				return dot;
			},
			_getLength = function(x, y, x2, y2) {
				x = x2 - x;
				y = y2 - y;
				return Math.sqrt(x * x + y * y);
			},
			_getTotalLength = function(bezier, start, end) {
				var x = bezier[start],
						y = bezier[start+1],
						length = 0,
						i;
				for (i = start; i < end; i += 2) {
					length += _getLength(x, y, x=bezier[i], bezier[i+1]);
				}
				return length;
			},
			_DEG2RAD = Math.PI / 180,
			_RAD2DEG = 180 / Math.PI,
			bezier = MorphSVGPlugin.pathDataToRawBezier(e.getAttribute("d"))[0],
			start = (vars.start || 0) * 2,
			end = (vars.end === 0) ? 0 : (vars.end * 2) || (bezier.length - 1),
			length = vars.length || 100,
			magnitude = vars.magnitude || 50,
			proxy = {a:0},
			debug = !!vars.debug,
			phase = (vars.phase || 0) * _DEG2RAD,
			taperStart = vars.taperStart || 0,
			taperEnd = vars.taperEnd || 0,
			startX = bezier[start],
			startY = bezier[start + 1],
			changes = [],
			bezierLength = 0,
			loose = !!vars.loose,//if true, we'll just make the points influence the current positions instead of forcing them strictly onto the wave.
			tl = new TimelineMax({repeat:vars.repeat}),
			bezierTotalLength, angle, i, x, y, dx, dy, sin, cos, sin2, cos2, m, pathStart, t, negCos, negSin, rotatedStartX;
	if (end >= bezier.length-1) {
		end = bezier.length - 2;
	}
	if (start >= bezier.length) {
		start = bezier.length - 1;
	}
	bezierTotalLength = _getTotalLength(bezier, start, end);

	dx = bezier[end] - startX;
	dy = bezier[end+1] - startY;
	if (vars.angle || vars.angle === 0) {
		angle = vars.angle * _DEG2RAD;
	} else {
		angle = Math.atan2(dy, dx) - Math.PI / 2;
	}
	sin = Math.sin(angle);
	cos = Math.cos(angle);
	sin2 = Math.sin(angle + Math.PI / 2);
	cos2 = Math.cos(angle + Math.PI / 2);
	negCos = Math.cos(-angle);
	negSin = Math.sin(-angle);
	rotatedStartX = startX * negCos + startY * negSin;

	if (debug) { //note: if debug is true, we drop a red dot at the beginning, yellow at the end, blue dots as control points, and purple as anchors.
		_placeDot(bezier[start], bezier[start + 1], {container: e.parentNode, color:"red"});
		_placeDot(bezier[end], bezier[end + 1], {container: e.parentNode, color:"yellow"});
		console.log("waveSVG() angle: ", angle * _RAD2DEG, "degrees. RED dot is start, YELLOW is end.");
	}

	x = startX;
	y = startY;
	for (i = start; i < end; i += 2) {
		bezierLength += _getLength(x, y, x=bezier[i], y=bezier[i+1]);
		dx = x * negCos + y * negSin; //rotated in the opposite direction
		dy = x * negSin + y * negCos;
		t = (taperStart && bezierLength < taperStart) ? bezierLength / taperStart : (taperEnd && bezierLength > bezierTotalLength - taperEnd && bezierLength < bezierTotalLength) ? ((bezierTotalLength - bezierLength) / taperEnd) : 1; //taper
		m = Math.sin((dx / length) * Math.PI * 2 + phase) * magnitude;
		changes.push( {i: i - (start ? 2 : 0), p:dx, a: (dx / length) * Math.PI * 2 + phase, t:t, x: loose ? x - m * sin * t : startX + (dx - rotatedStartX) * cos2 * t, y: loose ? y - m * cos * t : startY + (dx - rotatedStartX) * sin2 * t, smooth: (i % 6 === 0 && i > start && i < end) ? Math.abs( Math.atan2(y - bezier[i-1], x - bezier[i-2]) - Math.atan2(bezier[i+3] - y, bezier[i+2] - x) ) < 0.01 : false} );
		if (debug) {
			changes[changes.length-1].dot = _placeDot(x, y, {container: e.parenNode, size:3, color: (i % 6) ? "blue" : "purple"});
		}
	}
	//when we're not animating the first point, optimize things by taking out the first x/y and treat them independently so we can merely bezier.join(",") on each update.
	if (start) {
		pathStart = "M" + bezier.shift() + "," + bezier.shift() + " C";
	}

	tl.to(proxy, vars.duration || 3, {a:Math.PI * 2, ease:vars.ease || Linear.easeNone, onUpdate:function() {
		var l = changes.length,
				angle = proxy.a,
				node, i, m, x, y, x2, y2, x1, y1, cp, dx, dy, d, a, cpCos, cpSin;
		for (i = 0; i < l; i++) {
			node = changes[i];
			if (node.smooth || i === l - 1 || !changes[i + 1].smooth) {
				m = Math.sin(node.a + angle) * magnitude * node.t;
				bezier[node.i] = x = node.x + m * sin;
				bezier[node.i + 1] = y = node.y + m * cos;

				if (node.smooth) { //make sure smooth anchors stay smooth!
					cp = changes[i - 1];
					m = Math.sin(cp.a + angle) * magnitude * cp.t;
					x1 = cp.x + m * sin;
					y1 = cp.y + m * cos;

					cp = changes[i + 1];
					m = Math.sin(cp.a + angle) * magnitude * cp.t;
					x2 = cp.x + m * sin;
					y2 = cp.y + m * cos;

					a = Math.atan2(y2 - y1, x2 - x1);
					cpCos = Math.cos(a);
					cpSin = Math.sin(a);

					dx = x2 - x;
					dy = y2 - y;
					d = Math.sqrt(dx * dx + dy * dy);
					bezier[cp.i] = x + cpCos * d;
					bezier[cp.i + 1] = y + cpSin * d;

					cp = changes[i - 1];
					dx = x1 - x;
					dy = y1 - y;
					d = Math.sqrt(dx * dx + dy * dy);
					bezier[cp.i] = x - cpCos * d;
					bezier[cp.i + 1] = y - cpSin * d;
					i++;
				}
			}
		}
		if (debug) {
			for (i = 0; i < l; i++) {
				node = changes[i];
				node.dot.setAttribute("cx", bezier[node.i]);
				node.dot.setAttribute("cy", bezier[node.i + 1]);
			}
		} else if (start) {
			e.setAttribute("d", pathStart + bezier.join(","));
		} else {
			e.setAttribute("d", "M" + bezier[0] + "," + bezier[1] + " C" + bezier.slice(2).join(","));
		}
	}});
	return tl;
}