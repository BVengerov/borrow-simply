 // jSnow, a jQuery Plugin v1.1.mod1
 // Licensed under GPL licenses.
 // Copyright (C) 2009 Nikos "DuMmWiaM" Kontis, dummwiam@gmail.com
 // http://www.DuMmWiaM.com/jSnow
 // Modified 2009~
 (function ($) {
   $.fn.jSnow = function (h) {
     var j = $.extend({},
     $.fn.jSnow.defaults, h);
     var k, WIN_HEIGHT;
     setWaH();
     var l = j.flakes;
     var m = j.flakeCode;
     var n = j.flakeColor;
     var o = j.flakeMinSize;
     var p = j.flakeMaxSize;
     var q = j.fallingSpeedMin;
     var r = j.fallingSpeedMax;
     var s = j.interval;
     var t = j.zIndex;
     var useGif = false;
     var u = $("<div \/>");
     u.css({
       width: k + "px",
       height: 1,
       display: "block",
       overflow: "visible",
       position: "absolute",
       top: $("html").scrollTop() + 1 + "px",
       left: "1px",
       zIndex: t
     });
     $("body").prepend(u).css({
       height: "100%"
     });
     $("html").css({
       "overflow-y": "scroll",
       "overflow-x": "hidden"
     });    var v = Array();
     generateFlake(l, false);
     setInterval(animateFlakes, s);
     window.onresize = setWaH;
     function setWaH() {
       k = $('body').width();
       WIN_HEIGHT = window.innerHeight || document.documentElement.clientHeight
       WIN_HEIGHT -= 50;
     };
     window.onscroll = function () {
       u.css({
         top: $("html").scrollTop() + "px"
       })
     };
     function generateFlake(a, b) {
       a = a || 1;
       b = b || false;
       var i = 0;
       for (i = 0; i < a; i++) {
         var c = $("<span \/>");
         var d = o + Math.floor(Math.random() * p);
         var e = m[Math.floor(Math.random() * m.length)];
         if (e.indexOf(".gif") != -1 || e.indexOf(".png") != -1) {
           var f = new Image();
           if (useGif)
             e = e.replace("png", "gif");
           f.src = e;
           e = "<img class='snowflake' src='" + e + "' alt='jSnowFlake'>"
         }
         c.html(e).css({
           color: n[Math.floor(Math.random() * n.length)],
           fontSize: d + "px",
           display: "block",
           position: "absolute",
           cursor: "default",
           "z-index": t
         });
         $(u).append(c);
         f_left = Math.floor(Math.random() * (k - c.width() - 50)) + 25;
         f_top = (b) ? -1 * c.height() : Math.floor(Math.random() * (WIN_HEIGHT - 50));
         var g = Math.floor(Math.random() * 90);
         jQuery.data(c, "posData", {
           top: f_top,
           left: f_left,
           rad: Math.random() * 50,
           i: Math.ceil(q + Math.random() * (r - q)),
           swingRange: g
         });
         c.css({
           top: f_top + "px",
           left: f_left + "px"
         });
         v.push(c)
       }
     };
     function animateFlakes() {
       var i = 0;
       for (i = v.length - 1; i >= 0; i--) {
         var f = v[i];
         var a = jQuery.data(f, "posData");
         a.top += a.i;
         var b = Number();
         b = Math.cos((a.rad / 180) * Math.PI);
         a.rad += 2;
         var X = a.left - b * a.swingRange;
         f.css({
           top: a.top + "px",
           left: X + "px"
         });
         if (a.top > WIN_HEIGHT) {
           f.remove();
		   jQuery.removeData(f);
           v.splice(i, 1);
           generateFlake(1, true)
         }
       }
     };
     return this
   };
   $.fn.jSnow.defaults = {
     flakes: 30,
     fallingSpeedMin: 1,
     fallingSpeedMax: 3,
     flakeMaxSize: 20,
     flakeMinSize: 10,
     flakeCode: ["&bull;"],
     flakeColor: ["#fff"],
     zIndex: "auto",
     interval: 50
   }
 })(jQuery);
