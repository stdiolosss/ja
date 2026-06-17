window.addEventListener("load", function () {
  var canvas = document.getElementById("canvas");
  if (!canvas || !canvas.getContext) {
    return;
  }

  var context = canvas.getContext("2d");
  var fontSize = 12;
  var text = "WELCOME TO WWW.STDIOLOSSS.COM";
  var colors = [
    "#33B5E5",
    "#0099CC",
    "#AA66CC",
    "#9933CC",
    "#99CC00",
    "#669900",
    "#FFBB33",
    "#FF8800",
    "#FF4444",
    "#CC0000",
  ];
  var frameInterval = 1000 / 12;
  var drops = [];
  var columns = 0;
  var width = 0;
  var height = 0;
  var lastDrawTime = 0;
  var animationId = null;

  function resizeCanvas() {
    width = window.innerWidth || document.documentElement.clientWidth || screen.width;
    height = window.innerHeight || document.documentElement.clientHeight || screen.height;

    canvas.width = width;
    canvas.height = height;

    columns = Math.ceil(width / fontSize);
    drops = [];
    for (var i = 0; i < columns; i++) {
      drops.push(0);
    }
  }

  function draw() {
    context.fillStyle = "rgba(18,18,28,.08)";
    context.fillRect(0, 0, width, height);
    context.font = "600 " + fontSize + "px Georgia";
    context.fillStyle = colors[Math.floor(Math.random() * colors.length)];

    for (var i = 0; i < columns; i++) {
      var index = Math.floor(Math.random() * text.length);
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      context.fillText(text[index], x, y);

      if (y >= canvas.height && Math.random() > 0.99) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function loop(timestamp) {
    if (document.hidden) {
      animationId = null;
      return;
    }

    if (timestamp - lastDrawTime >= frameInterval) {
      lastDrawTime = timestamp;
      draw();
    }

    animationId = requestAnimationFrame(loop);
  }

  function start() {
    if (animationId === null && !document.hidden) {
      animationId = requestAnimationFrame(loop);
    }
  }

  resizeCanvas();
  draw();
  start();

  window.addEventListener("resize", function () {
    resizeCanvas();
    draw();
  });

  document.addEventListener("visibilitychange", start);
});
