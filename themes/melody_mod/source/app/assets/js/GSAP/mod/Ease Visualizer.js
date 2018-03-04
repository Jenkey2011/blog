//GreenSock Ease Visualizer
//Copyright 2017, GreenSock Inc.
! function(e) {
	function a(a, i) {
		var c, u, p, h, g, _ = i.data("easeVisualizer");
		_.settings.lightTheme === !0 && i.addClass("light"), i.addClass("ease_visualizer").html(a), i.addClass("enabled"), u = i.innerWidth() - 595 || 244, v = e(".ease_menu .ease_class"), e(".ease_menu").css("width", u + "px").on("click", ".ease_class", {
			vis: i
		}, n);
		var m = i.find(".main_ease_class_select");
		i.find(".go").css("width", u + "px").on("click.easeVisualizer", {
			vis: i
		}, f), i.find("select, input").on("change.easeVisualizer", {
			vis: i
		}, l).each(function() {
			var a = e(this);
			a.wrap("<label class='" + a.data("type") + "_label'></label>").after("<span class='display'></span>")
		}).trigger("change"), i.find(".editable").attr("tabindex", "-1").on("change.easeVisualizer", function() {
			e(this).siblings(".display").focus()
		}).siblings(".display").attr("contenteditable", "true").attr("spellcheck", "true"), _.settings.lockEase !== !0 ? (i.find(".ease_selector").css({
			display: "none",
			opacity: 0
		}).on("click", "button", {
			vis: i
		}, r).trigger("change"), i.find(".main_ease_class_label").on("mousedown.easeVisualizer", {
			vis: i
		}, s)) : (i.find(".ease_selector").css({
			display: "none",
			opacity: 0
		}), m.css("display", "none").parent().addClass("locked")), i.find(".custom_path").on("focusout.easeVisualizer", {
			vis: i
		}, d), i.find(".main_ease_class_select").css("visibility", "hidden");
		var w = i.find(".graph_lines")[0];
		for (p = 1; 13 > p; p++) L("line", w, {
			x1: 50 * p,
			x2: 50 * p,
			y1: -150,
			y2: 500,
			stroke: "#222",
			strokeWidth: 1,
			vectorEffect: "non-scaling-stroke"
		}), 3 !== p && L("line", w, {
			x1: 0,
			x2: 500,
			y1: 50 * p - 150,
			y2: 50 * p - 150,
			stroke: "#222",
			strokeWidth: 1,
			vectorEffect: "non-scaling-stroke"
		});
		L("line", w, {
			x1: 0,
			x2: 500,
			y1: 0,
			y2: 0,
			stroke: "#777",
			strokeWidth: 1,
			vectorEffect: "non-scaling-stroke"
		}), C = !0, p = window.location.href.indexOf("CustomEase="), -1 !== p ? (h = window.location.href.indexOf("&", p), g = decodeURI(-1 !== h ? window.location.href.substr(p + 11, h - p - 11) : window.location.href.substr(p + 11)), _.settings.startEase = "CustomEase", i.find(".custom_path").text(g)) : "CustomEase" === _.settings.startEase && m.find('option[value="Power2"]').prop("selected", !0).trigger("change"), _.settings.startEase = _.settings.startEase || "Power2.easeOut", c = t(_.settings.startEase, !0), o(c), m.find('option[value="' + t(_.settings.startEase) + '"]').prop("selected", !0).trigger("change"), y && y.delay(1.5)
	}

	function t(e, a) {
		return e = e.split(".")[0], a ? "RoughEase" === e ? "Rough" : "SteppedEase" === e ? "Stepped" : e : "Rough" === e ? "RoughEase" : "Stepped" === e ? "SteppedEase" : "Custom" === e ? "CustomEase" : e
	}

	function s(e) {
		e.preventDefault(), e.stopPropagation();
		var a = e.data.vis;
		return window.showBasicOverlay(a.find(".ease_selector").focus(), function() {
			i(a)
		}), !1
	}

	function i(e) {
		e.find(".main_ease_class_label").css("visibility", "visible"), window.hideBasicOverlay()
	}

	function n(e) {
		return o(this.textContent) ? void(y && y.restart()) : void e.data.vis.find(".main_ease_class_select").find('option[value="' + t(this.textContent) + '"]').prop("selected", !0).trigger("change")
	}

	function o(e) {
		if ("CustomEase" === e && (e = "Custom"), x) {
			if (x.target.textContent === e) return !0;
			TweenLite.to(x.target, .2, {
				backgroundColor: "rgba(0,0,0,0)",
				color: "#626262",
				clearProps: "backgroundColor,color"
			})
		}
		for (var a = v.length; --a > -1;) v[a].textContent === e && (x = TweenLite.to(v[a], .2, {
			backgroundColor: "#88CE02",
			color: "black"
		}));
		v.siblings(".ease_type_section").css("visibility", "Rough" === e || "Stepped" === e || "SlowMo" === e || "Power0" === e || "Custom" === e ? "hidden" : "visible")
	}

	function r(a) {
		var s = a.data.vis,
			n = s.find(".main_ease_class_select"),
			r = s.find(".basic_ease_type_select"),
			l = e(this),
			c = l.attr("class").split(" ");
		n.find('option[value="' + c[0] + '"]').prop("selected", !0).trigger("change"), c[1] && "easeNone" !== c[1] && r.find('option[value="' + c[1] + '"]').prop("selected", !0).trigger("change"), o(t(c[0], !0)), i(s)
	}

	function l(a) {
		var t = a.data.vis,
			s = e(this),
			i = s.is("select"),
			n = s.data("type"),
			o = i ? s.val() : s.prop("checked");
		if (i) {
			s.siblings(".display").text(o)
		} else s.siblings(".display").text(o ? "true" : "false");
		switch (n) {
			case "ease_type_quick":
				return void t.find(".basic_ease_type_select").find('option[value="' + o + '"]').prop("selected", !0).trigger("change");
			case "target":
				var r = t.find(".visualization"),
					l = t.find(".prop");
				switch (o) {
					case "graph":
						b(t.find(".graph"), r), b(t.find(".prop_graph"), l);
						break;
					case "clock":
						b(t.find(".clock"), r), b(t.find(".prop_clock"), l);
						break;
					case "box":
						b(t.find(".box"), r), b(t.find(".prop_box"), l)
				}
				break;
			case "main_ease_class":
				var r = t.find(".main_ease_type"),
					d = t.data("easeVisualizer");
				switch (d.editMode = !1, o) {
					case "Power0":
						b(t.find(".linear_ease"), r);
						break;
					case "RoughEase":
						b(t.find(".rough_ease"), r);
						break;
					case "SlowMo":
						b(t.find(".slowmo_ease"), r);
						break;
					case "SteppedEase":
						b(t.find(".stepped_ease"), r);
						break;
					case "Elastic":
						b(t.find(".elastic_ease"), r);
						break;
					case "Back":
						b(t.find(".back_ease"), r);
						break;
					case "CustomEase":
						b(t.find(".custom_ease"), r), d.editMode = !0;
						break;
					default:
						b(t.find(".basic_ease"), r)
				}
				u(t), t.toggleClass("editMode", d.editMode);
				break;
			case "rough_ease_class":
				var r = t.find(".rough_ease_type");
				switch (o) {
					case "Power0":
						b(t.find(".rough_linear_ease"), r);
						break;
					default:
						b(t.find(".rough_basic_ease"), r)
				}
				u(t);
				break;
			case "main_basic_ease_type":
				u(t), t.find(".ease_type_quick_select").find('option[value="' + o + '"]').prop("selected", !0), t.find(".ease_type_quick_select").siblings(".display").text(o);
				break;
			case "rough_basic_ease_type":
				u(t);
				break;
			case "rough_taper":
			case "rough_randomize":
			case "rough_clamp":
			case "slowmo_yoyo":
		}
		p(t), c(t, "CustomEase" === t.data("easeVisualizer").currentEaseName), h(null, t)
	}

	function c(e, a) {
		if (e.custom !== a) {
			e.custom = a;
			var t, s = e.find(".ease_template")[0],
				i = e.find(".custom-warning")[0],
				n = e.data("easeVisualizer").currentEase,
				o = e.find(".custom_path")[0],
				r = function() {
					t = !0
				};
			a ? (s.style.visibility = "visible", i.style.display = "block", TweenLite.fromTo(".ease-instructions", .3, {
				y: 50
			}, {
				autoAlpha: 1,
				y: 0,
				delay: .2
			}), s.setAttribute("d", CustomEase.getSVGData(n, {
				width: 500,
				height: 500
			})), e.editor ? (e.editor.enabled(!0), e.editor.select()) : e.editor = new PathEditor(s, {
				draggable: !1,
				anchorSnap: PathEditor.getSnapFunction({
					x: 0,
					y: 0,
					width: 500,
					height: 500,
					containY: !1,
					gridSize: 50,
					radius: 5,
					axis: PathEditor.editingAxis
				}),
				onUpdate: function() {
					var e = t,
						a = this._bezier[0][this._bezier[0].length - 2],
						s = this._bezier[0][0];
					t = !1, o.innerHTML = this.getNormalizedSVG(500, 500, !0, r), t = t || s > 1 || 499 > a, e !== t && (this._selectionPath.style.stroke = t ? "red" : "#4e7fff")
				},
				handleSnap: PathEditor.getSnapFunction({
					x: 0,
					y: 0,
					width: 500,
					height: 500,
					containY: !1,
					containX: !1,
					radius: 5,
					axis: PathEditor.editingAxis
				})
			})) : e.editor && (e.editor.enabled(!1), s.style.visibility = "hidden", i.style.display = "none", TweenLite.to(".ease-instructions", .2, {
				autoAlpha: 0
			}))
		}
	}

	function d(e) {
		var a, t, s, i = e.data.vis;
		i && i.custom && (a = i.find(".custom_path").text(), -1 !== a.indexOf("<") && (t = a.match(O), t && (a = t[0], a = PathEditor.getCubicSVGData(a.substr(3, a.length - 5)))), t = a.match(T), s = CustomEase.create("custom", a, {
			height: Math.abs(1 - t[t.length - 2]) < .01 ? -1 : 0
		}), i.data("easeVisualizer").currentEase = s, w(i), i.find(".ease_template").attr("d", i.find(".graph_path_reveal").attr("d")), i.editor.init())
	}

	function u(e) {
		var a = e.find(".main_ease_class_select").val(),
			t = (e.find(".basic_ease_type_select").val(), e.find(".target_select").val()),
			s = "graph" === t && ("CustomEase" === a || "Elastic" === a || "Back" === a || "RoughEase" === a && "Elastic" === e.find(".rough_ease_class_select").val() && "easeOut" === e.find(".rough_ease_type_select").val());
		s && (TweenLite.to(e, .4, {
			paddingTop: 220,
			ease: Power2.easeInOut
		}), TweenLite.to(e.find(".ease_menu"), .4, {
			top: 220,
			ease: Power2.easeInOut
		}), TweenLite.to(e.find("#graph_path").find("rect"), .5, {
			attr: {
				y: -200
			},
			ease: Power2.easeInOut
		}))
	}

	function p(e) {
		var a = parseFloat(e.find(".duration").siblings(".display").text()),
			t = e.data("easeVisualizer").currentEaseName,
			s = e.find(".basic_ease_type_select").val();
		(isNaN(a) || 0 === a) && (a = 2.5), e.find(".duration").siblings(".display").text(a);
		var i, n = e.find(".main_ease_class_select").val(),
			o = e.find(".target_select").val();
		switch (n) {
			case "Power0":
				i = Power0.easeNone;
				break;
			case "RoughEase":
				var r = parseFloat(e.find(".rough_strength").siblings(".display").text(), 10);
				(isNaN(r) || 0 === r) && (r = 1), e.find(".rough_strength").siblings(".display").text(r);
				var l = parseFloat(e.find(".rough_points").siblings(".display").text(), 10);
				(isNaN(l) || 0 === l) && (l = 20), l > 500 && (l = 500), e.find(".rough_points").siblings(".display").text(l);
				var c = e.find(".rough_ease_class_select").val(),
					d = window[c][e.find(".rough_ease_type_select").val()];
				i = new RoughEase({
					strength: r,
					points: l,
					template: d,
					taper: e.find(".rough_taper_select").val().replace(/\"/g, ""),
					randomize: e.find(".rough_randomize_checkbox").prop("checked"),
					clamp: e.find(".rough_clamp_checkbox").prop("checked")
				});
				break;
			case "SlowMo":
				var u = parseFloat(e.find(".slowmo_ratio").siblings(".display").text(), 10);
				(isNaN(u) || 0 > u) && (u = .7), e.find(".slowmo_ratio").siblings(".display").text(u);
				var p = parseFloat(e.find(".slowmo_power").siblings(".display").text(), 10);
				(isNaN(p) || 0 > p) && (p = .7), e.find(".slowmo_power").siblings(".display").text(p);
				var f = e.find(".slowmo_yoyo_checkbox").prop("checked");
				i = new SlowMo(u, p, f);
				break;
			case "SteppedEase":
				var h = parseInt(e.find(".stepped_steps").siblings(".display").text(), 10);
				(isNaN(h) || 0 === h) && (h = 12), h > 100 && (h = 100), e.find(".stepped_steps").siblings(".display").text(h), i = new SteppedEase(h);
				break;
			case "Elastic":
				var g = parseFloat(e.find(".elastic_amplitude").siblings(".display").text()) || 1,
					_ = parseFloat(e.find(".elastic_period").siblings(".display").text());
				e.find(".elastic_amplitude").siblings(".display").text(g), e.find(".elastic_period").siblings(".display").text(_), i = Elastic[s].config(g, _);
				break;
			case "Back":
				var m = parseFloat(e.find(".back_amount").siblings(".display").text()) || 1;
				e.find(".back_amount").siblings(".display").text(m), i = Back[s].config(m);
				break;
			case "CustomEase":
				i = CustomEase.create("custom", e.find(".custom_path").text(), {
					height: 1
				});
				break;
			default:
				i = window[n][s]
		}
		var b = e.data("easeVisualizer");
		b.currentVis = o, b.currentDuration = a, b.currentEaseName = n, b.currentEaseType = s, b.currentEase = i, "CustomEase" === n && "CustomEase" !== t || !C || w(e)
	}

	function f(e, a) {
		var a = e.data.vis;
		a && a.custom && (p(a), h(e, a)), y && y.restart()
	}

	function h(e, a) {
		void 0 === a && (a = e.data.vis, p(a));
		var t = a.data("easeVisualizer"),
			s = t.graphTL,
			i = t.clockTL,
			n = t.boxTL;
		switch (s && s.progress(0).kill(), i && i.progress(0).kill(), n && n.progress(0).kill(), t.currentVis) {
			case "graph":
				g(a);
				break;
			case "clock":
				_(a);
				break;
			case "box":
				m(a)
		}
	}

	function g(e) {
		var a = e.data("easeVisualizer"),
			t = a.currentDuration,
			s = a.currentEase,
			i = .2,
			n = y = new TimelineLite({
				delay: .1
			});
		n.add("start", i);
		var o = e.find(".progress_number");
		return n.to({
			p: 0
		}, t, {
			ease: Linear.easeNone,
			p: 1,
			onUpdate: function() {
				o.text(this.target.p.toFixed(2))
			}
		}, "start"), n.fromTo(e.find(".graph_line"), 1e-4, {
			autoAlpha: 0
		}, {
			autoAlpha: 1
		}, "start"), n.fromTo(e.find("#graph_path_reveal rect"), t, {
			attr: {
				width: 0
			}
		}, {
			attr: {
				width: 500
			},
			ease: Linear.easeNone
		}, "start"), n.fromTo(e.find(".graph_liney"), t, {
			attr: {
				x1: 0,
				x2: 0
			}
		}, {
			attr: {
				x1: 500,
				x2: 500
			},
			ease: Linear.easeNone
		}, "start"), n.fromTo(e.find(".progress_joint"), t, {
			top: "100%"
		}, {
			top: "0%",
			ease: s
		}, "start"), n.fromTo(e.find(".graph_linex"), t, {
			attr: {
				y1: 500,
				y2: 500
			}
		}, {
			attr: {
				y1: 0,
				y2: 0
			},
			ease: s
		}, "start"), n.fromTo(e.find(".horizontal .progress_fill"), t, {
			scaleX: 0,
			transformOrigin: "left center"
		}, {
			ease: Linear.easeNone,
			scaleX: 1
		}, "start"), n.fromTo(e.find(".vertical .progress_fill"), t, {
			scaleY: 0,
			transformOrigin: "left bottom"
		}, {
			ease: s,
			scaleY: 1
		}, "start"), n.to(e.find(".graph_line"), .07, {
			autoAlpha: 0
		}), a.graphTL = n, n
	}

	function _(e) {
		var a = e.data("easeVisualizer"),
			t = a.currentDuration,
			s = a.currentEase,
			i = .2,
			n = y = new TimelineLite;
		n.add("start", i), n.fromTo(e.find(".clock_ease"), t, {
			rotation: 0,
			transformOrigin: "center bottom"
		}, {
			ease: s,
			rotation: 360,
			force3D: !0
		}, "start"), n.fromTo(e.find(".clock_linear"), t, {
			rotation: 0,
			transformOrigin: "center bottom"
		}, {
			ease: Linear.easeNone,
			rotation: 360,
			force3D: !0
		}, "start"), n.fromTo(e.find(".horizontal .progress_fill"), t, {
			scaleX: 0,
			transformOrigin: "left center"
		}, {
			ease: Linear.easeNone,
			scaleX: 1,
			force3D: !0
		}, "start"), a.clockTL = n
	}

	function m(e) {
		var a = e.data("easeVisualizer"),
			t = a.currentDuration,
			s = a.currentEase,
			i = a.currentEaseType,
			n = .2,
			o = y = new TimelineLite;
		o.add("start", n), o.fromTo(e.find(".box_power0"), t, {
			x: "0%"
		}, {
			ease: Power0.easeIn,
			x: "400%",
			force3D: !0
		}, "start"), o.fromTo(e.find(".box_power1"), t, {
			x: "0%"
		}, {
			ease: Power1[i] || Power1.easeOut,
			x: "400%",
			force3D: !0
		}, "start"), o.fromTo(e.find(".box_power2"), t, {
			x: "0%"
		}, {
			ease: Power2[i] || Power2.easeOut,
			x: "400%",
			force3D: !0
		}, "start"), o.fromTo(e.find(".box_power3"), t, {
			x: "0%"
		}, {
			ease: Power3[i] || Power3.easeOut,
			x: "400%",
			force3D: !0
		}, "start"), o.fromTo(e.find(".box_power4"), t, {
			x: "0%"
		}, {
			ease: Power4[i] || Power4.easeOut,
			x: "400%",
			force3D: !0
		}, "start"), o.fromTo(e.find(".box_custom"), t, {
			x: "0%"
		}, {
			ease: s,
			x: "400%",
			force3D: !0
		}, "start"), o.fromTo(e.find(".horizontal .progress_fill"), t, {
			scaleX: 0,
			transformOrigin: "left center"
		}, {
			ease: Linear.easeNone,
			scaleX: 1,
			force3D: !0
		}, "start"), a.boxTL = o
	}

	function w(e) {
		var a, t, s = e.find(".main_ease_class_select").val(),
			i = e.data("easeVisualizer"),
			n = "SteppedEase" === s || "Bounce" === s || "Elastic" === s ? 3 : 1,
			o = i.currentEase || Linear.easeNone,
			r = i.currentEaseName,
			l = r + "." + i.currentEaseType,
			c = "Elastic.easeOut" !== l && "Back" !== r || "Elastic.easeOut" === l && 1 === o._p1 && .075 === o._p3 || "Back" === r && 1.7 === o._p1 ? P[l] : null,
			d = e.find(".custom_path");
		c ? (d.text(c), a = z[l]) : (a = CustomEase.getSVGData(o, {
			width: 500,
			height: 500,
			precision: n
		}), t = o.rawBezier ? a : PathEditor.simplifySVG(a, {
			tolerance: 1 === n ? 3 : 1,
			cornerThreshold: "Bounce" === r ? 130 : "SteppedEase" === r || "RoughEase" === r ? 180 : 0
		}), d.text(CustomEase.getSVGData(new CustomEase("custom", t, {
			height: 500
		}), {
			width: 1,
			height: -1,
			y: 1,
			precision: n
		}))), C && (TweenLite.to(".graph_path", .4, {
			morphSVG: a
		}), e.find(".graph_path_reveal").attr("d", a))
	}

	function b(e, a) {
		TweenLite.set(e, {
			display: ""
		}), TweenLite.set(a.not(e), {
			display: "none"
		})
	}
	// var y, v, x, C, k = "/wp-content/themes/greensock/includes/EaseVisualizer/EaseVisualizer.html",
	var y, v, x, C, k = "http://172.31.36.229/tools/html/EaseVisualizer.html",
	
		E = 0,
		T = /(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
		O = /\bd=["']+.*["'][\s\/>]/i,
		M = {
			startEase: "Power2",
			lightTheme: !1,
			lockEase: !1
		},
		P = {
			"Power0.easeOut": "0,0,1,1",
			"Power1.easeOut": "0.104,0.204,0.492,1",
			"Power2.easeOut": "M0,0,C0.126,0.382,0.282,0.674,0.44,0.822,0.632,1.002,0.818,1.001,1,1",
			"Power3.easeOut": "M0,0,C0.083,0.294,0.182,0.718,0.448,0.908,0.579,1.001,0.752,1,1,1",
			"Power4.easeOut": "M0,0,C0.11,0.494,0.192,0.726,0.318,0.852,0.45,0.984,0.504,1,1,1",
			"Back.easeOut": "M0,0,C0.128,0.572,0.257,1.016,0.512,1.09,0.672,1.136,0.838,1,1,1",
			"Elastic.easeOut": "M0,0,C0,0,0.049,0.675,0.085,1.115,0.122,1.498,0.156,1.34,0.16,1.322,0.189,1.193,0.203,1.111,0.23,0.978,0.262,0.818,0.303,0.876,0.307,0.882,0.335,0.925,0.349,0.965,0.38,1.006,0.43,1.088,0.484,1.022,0.53,0.997,0.58,0.964,0.667,1.002,0.725,1.004,0.829,1.008,1,1,1,1",
			"Bounce.easeOut": "M0,0,C0.14,0,0.242,0.438,0.272,0.561,0.313,0.728,0.354,0.963,0.362,1,0.37,0.985,0.414,0.873,0.455,0.811,0.51,0.726,0.573,0.753,0.586,0.762,0.662,0.812,0.719,0.981,0.726,0.998,0.788,0.914,0.84,0.936,0.859,0.95,0.878,0.964,0.897,0.985,0.911,0.998,0.922,0.994,0.939,0.984,0.954,0.984,0.969,0.984,1,1,1,1",
			"Circ.easeOut": "M0,0,C0,0.408,0.242,0.657,0.295,0.709,0.346,0.76,0.584,1,1,1",
			"Expo.easeOut": "M0,0,C0.084,0.61,0.214,0.802,0.28,0.856,0.356,0.918,0.374,1,1,1",
			"Sine.easeOut": "M0,0,C0.266,0.412,0.436,0.654,0.565,0.775,0.609,0.816,0.78,1,1,1",
			"Power1.easeIn": "0.532,0,0.924,0.862",
			"Power2.easeIn": "M0,0,C0.366,0,0.438,0.069,0.575,0.19,0.802,0.39,1,1,1,1",
			"Power3.easeIn": "M0,0,C0.482,0,0.49,0.046,0.625,0.152,0.733,0.237,0.88,0.524,1,1",
			"Power4.easeIn": "M0,0,C0.46,0,0.496,0.014,0.616,0.088,0.734,0.161,0.884,0.4,1,1",
			"Back.easeIn": "M0,0,C0.192,0,0.33,-0.152,0.522,-0.078,0.641,-0.031,0.832,0.19,1,1",
			"Circ.easeIn": "M0,0,C0.42,0,0.658,0.243,0.71,0.295,0.762,0.348,1,0.59,1,1",
			"Expo.easeIn": "M0,0,C0.5,0,0.581,0.047,0.625,0.073,0.72,0.13,0.9,0.23,1,1",
			"Sine.easeIn": "0.434,0.004,0.79,0.698",
			"Power1.easeInOut": "M0,0,C0.272,0,0.472,0.455,0.496,0.496,0.574,0.63,0.744,1,1,1",
			"Power2.easeInOut": "M0,0,C0.173,0,0.242,0.036,0.322,0.13,0.401,0.223,0.449,0.367,0.502,0.506,0.546,0.622,0.62,0.824,0.726,0.916,0.799,0.98,0.869,1,1,1",
			"Power3.easeInOut": "M0,0 C0.212,0 0.247,0.014 0.326,0.09 0.402,0.164 0.46,0.356 0.502,0.504 0.551,0.68 0.594,0.816 0.654,0.882 0.726,0.961 0.734,1 1,1",
			"Power4.easeInOut": "M0,0,C0.29,0,0.294,0.018,0.365,0.103,0.434,0.186,0.466,0.362,0.498,0.502,0.518,0.592,0.552,0.77,0.615,0.864,0.69,0.975,0.704,1,1,1",
			"Back.easeInOut": "M0,0,C0.068,0,0.128,-0.061,0.175,-0.081,0.224,-0.102,0.267,-0.107,0.315,-0.065,0.384,-0.004,0.449,0.253,0.465,0.323,0.505,0.501,0.521,0.602,0.56,0.779,0.588,0.908,0.651,1.042,0.705,1.082,0.748,1.114,0.799,1.094,0.817,1.085,0.868,1.061,0.938,0.998,1,1",
			"Circ.easeInOut": "M0,0,C0.17,0,0.286,0.085,0.32,0.115,0.394,0.18,0.498,0.3,0.5,0.5,0.502,0.706,0.608,0.816,0.645,0.852,0.67,0.877,0.794,1,1,1",
			"Expo.easeInOut": "M0,0,C0.25,0,0.294,0.023,0.335,0.05,0.428,0.11,0.466,0.292,0.498,0.502,0.532,0.73,0.586,0.88,0.64,0.928,0.679,0.962,0.698,1,1,1",
			"Sine.easeInOut": "M0,0,C0.2,0,0.374,0.306,0.507,0.512,0.652,0.738,0.822,1,1,1"
		},
		z = {
			"Power0.easeOut": "M0,500 C0,500 500,0 500,0",
			"Power1.easeOut": "M0,500 C52,398 246,0 500,0",
			"Power2.easeOut": "M0,500 C63,309 141,163 220,89 316,-1 409,-0.499 500,0",
			"Power3.easeOut": "M0,500 C41.5,353 91,141 224,46 289.5,-0.499 376,0 500,0",
			"Power4.easeOut": "M0,500 C55,253 96,137 159,74 225,8 252,0 500,0",
			"Back.easeOut": "M0,500 C64,214 128.5,-8 256,-45 336,-68 419,0 500,0",
			"Elastic.easeOut": "M0,500 C0,500 24.5,162.5 42.5,-57.5 61,-249 78,-170 80,-161 94.5,-96.5 101.5,-55.5 115,11 131,91 151.5,62 153.5,59 167.5,37.5 174.5,17.5 190,-3 215,-44 242,-11 265,1.5 290,18 333.5,-1 362.5,-2 414.5,-4 500,0 500,0",
			"Bounce.easeOut": "M0,500 C70,500 121,281 136,219.5 156.5,136 177,18.5 181,0 185,7.5 207,63.5 227.5,94.5 255,137 286.5,123.5 293,119 331,94 359.5,9.5 363,1 394,43 420,32 429.5,25 439,18 448.5,7.5 455.5,1 461,3 469.5,8 477,8 484.5,8 500,0 500,0",
			"Circ.easeOut": "M0,500 C0,296 121,171.5 147.5,145.5 173,120 292,0 500,0",
			"Expo.easeOut": "M0,500 C42,195 107,99 140,72 178,41 187,0 500,0",
			"Sine.easeOut": "M0,500 C133,294 218,173 282.5,112.5 304.5,92 390,0 500,0",
			"Power1.easeIn": "M0,500 C266,500 462,69 500,0",
			"Power2.easeIn": "M0,500 C183,500 219,465.5 287.5,405 401,305 500,0 500,0",
			"Power3.easeIn": "M0,500 C241,500 245,477 312.5,424 366.5,381.5 440,238 500,0",
			"Power4.easeIn": "M0,500 C230,500 248,493 308,456 367,419.5 442,300 500,0",
			"Back.easeIn": "M0,500 C96,500 165,576 261,539 320.5,515.5 416,405 500,0",
			"Circ.easeIn": "M0,500 C210,500 329,378.5 355,352.5 381,326 500,205 500,0",
			"Expo.easeIn": "M0,500 C250,500 290.5,476.5 312.5,463.5 360,435 450,385 500,0",
			"Sine.easeIn": "M0,500 C217,498 395,151 500,0",
			"Power1.easeInOut": "M0,500 C136,500 236,272.5 248,252 287,185 372,0 500,0",
			"Power2.easeInOut": "M0,500 C86.5,500 121,482 161,435 200.5,388.5 224.5,316.5 251,247 273,189 310,88 363,42 399.5,10 434.5,0 500,0",
			"Power3.easeInOut": "M0,500 C106,500 123.5,493 163,455 201,418 230,322 251,248 275.5,160 297,92 327,59 363,19.5 367,0 500,0",
			"Power4.easeInOut": "M0,500 C145,500 147,491 182.5,448.5 217,407 233,319 249,249 259,204 276,115 307.5,68 345,12.5 352,0 500,0",
			"Back.easeInOut": "M0,500 C34,500 64,530.5 87.5,540.5 112,551 133.5,553.5 157.5,532.5 192,502 224.5,373.5 232.5,338.5 252.5,249.5 260.5,199 280,110.5 294,46 325.5,-21 352.5,-41 374,-57 399.5,-47 408.5,-42.5 434,-30.5 469,1 500,0",
			"Circ.easeInOut": "M0,500 C85,500 143,457.5 160,442.5 197,410 249,350 250,250 251,147 304,92 322.5,74 335,61.5 397,0 500,0",
			"Expo.easeInOut": "M0,500 C125,500 147,488.5 167.5,475 214,445 233,354 249,249 266,135 293,60 320,36 339.5,19 349,0 500,0",
			"Sine.easeInOut": "M0,500 C100,500 187,347 253.5,244 326,131 411,0 500,0"
		},
		L = function(e, a, t, s) {
			var i, n = document.createElementNS("http://www.w3.org/2000/svg", e),
				o = /([a-z])([A-Z])/g;
			for (i in t) n.setAttributeNS(null, i.replace(o, "$1-$2").toLowerCase(), t[i]);
			return s ? a.parentNode.insertBefore(n, a) : a.appendChild(n), n
		},
		I = {
			init: function(t) {
				var s = e.extend({}, M, t);
				return this.each(function() {
					var t = e(this),
						i = t.data("easeVisualizer");
					i || (t.data("easeVisualizer", {
						id: E++,
						settings: s,
						active: !0,
						graphTL: null,
						clockTL: null,
						boxTL: null,
						currentVis: "graph",
						currentDuration: 2.5,
						currentEaseName: "Power2",
						currentEase: null,
						editMode: !1
					}), e.get(k).done(function(e) {
						null === e ? console.log("Error. Could not load html.") : a(e, t)
					}).fail(function() {
						console.log("Error. Could not load html.")
					}))
				})
			},
			destroy: function() {
				return this.each(function() {
					var a = e(this),
						t = a.data("easeVisualizer");
					t.graphTL && t.graphTL.kill(), t.clockTL && t.clockTL.kill(), t.boxTL && t.boxTL.kill(), a.find(".go").off("click.easeVisualizer"), a.find("select, input").off("change.easeVisualizer"), a.find(".editable").off("change.easeVisualizer"), a.find(".main_ease_class_label").off("mousedown.easeVisualizer"), a.html("").removeData().removeClass("light ease_visualizer enabled").css("margin-top", "")
				})
			}
		};
	e.fn.easeVisualizer = function(a) {
		return I[a] ? I[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? void e.error("Method " + a + " does not exist") : I.init.apply(this, arguments)
	}
}(jQuery), $(function() {
	function e(e, a) {
		return e ? (t && (TweenLite.set(t, {
			autoAlpha: 0,
			display: "none"
		}), s ? t.style.zIndex = s : TweenLite.set(t, {
			clearProps: "zIndex"
		}), i && i.resume()), t = e[0] || e, s = t.style.zIndex, window.TimelineLite && (i = TimelineLite.exportRoot().pause()), TweenLite.set(t, {
			opacity: 0,
			xPercent: -50,
			yPercent: -50,
			x: 0,
			display: "block",
			zIndex: 5e3,
			top: "50%",
			left: "50%",
			position: "fixed",
			maxHeight: "98%",
			bottom: "auto",
			right: "auto"
		}), TweenLite.to(o, .25, {
			autoAlpha: .6,
			ease: Linear.easeNone
		}), TweenLite.to(t, .25, {
			autoAlpha: 1,
			force3D: !0
		}), n = a, !1) : void console.log("Error: no overlay argument provided to showBasicOverlay().")
	}

	function a() {
		t && (TweenLite.to(o, .2, {
			autoAlpha: 0,
			ease: Linear.easeNone,
			onComplete: n
		}), TweenLite.set(t, {
			autoAlpha: 0,
			display: "none",
			onComplete: function() {
				s ? t.style.zIndex = s : TweenLite.set(t, {
					clearProps: "zIndex"
				}), t = null, i && i.resume()
			}
		}))
	}
	var t, s, i, n, o = document.getElementById("overlay-dimmer");
	o || (o = document.createElement("div"), o.setAttribute("id", "overlay-dimmer"), o.style.cssText = "width: 100%; height: 100%; background-color: black; opacity: 0.5; position: fixed; top: 0;left: 0; z-index: 3000; cursor: pointer; visibility: hidden;", TweenLite.set(o, {
		force3D: !0
	}), (document.body || document.documentElement).appendChild(o)), o.onclick = a, window.showBasicOverlay = e, window.hideBasicOverlay = a
}), $(".ease-visualizer").each(function() {
	var e = $(this);
	e.css({
		padding: "70px 20px 20px",
		borderRadius: "10px",
		color: "#999",
		backgroundColor: "#222"
	}).html("<p style='padding:250px 0 300px; font-size:30px; text-align:center;'>Loading...</p>").easeVisualizer({
		startEase: e.data("ease") || "Power2.easeOut",
		lightTheme: e.data("light")
	})
});