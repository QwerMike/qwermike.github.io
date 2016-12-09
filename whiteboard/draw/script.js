function start() {
  firebase.initializeApp({databaseURL: 'https://test-c6477.firebaseio.com'});
  var db = firebase.database()
    , canvas = initCanvas()
    , ctx = initContext(canvas)
    , pointRadius = 3;
  db.ref('/whiteboard').set({
    width: canvas.width,
    height: canvas.height,
    pointRadius: pointRadius
  });

  document.getElementById("clear")
    .addEventListener("click", function () {
      db.ref('/whiteboard/coordinates').set(null);
      db.ref('/whiteboard/cleared').set(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

  var fillOnMove = function (e) {
    db.ref('/whiteboard/coordinates/').set({
      x: e.clientX,
      y: e.clientY
    });
    drawPoint(ctx, e.clientX, e.clientY, pointRadius);
  }

  canvas.addEventListener('mousedown', function (e) {
    db.ref('/whiteboard/coordinates/').set({
      x: e.clientX,
      y: e.clientY
    });
    drawPoint(ctx, e.clientX, e.clientY, pointRadius);
    canvas.addEventListener('mousemove', fillOnMove, false);
  }, false);

  canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', fillOnMove);
  }, false);

  /////////////////////////////////////////////////////////
  /* mobile support */  
  canvas.addEventListener("touchstart", function (e) {
    e.preventDefault();
		var touch = e.touches[0];
		var mouseEvent = new MouseEvent("mousedown", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	canvas.addEventListener("touchend", function (e) {
    e.preventDefault();
		var mouseEvent = new MouseEvent("mouseup", {});
		canvas.dispatchEvent(mouseEvent);
	}, false);

	canvas.addEventListener("touchmove", function (e) {
    e.preventDefault();
		var touch = e.touches[0];
    db.ref('/whiteboard/coordinates/').set({
      x: touch.clientX,
      y: touch.clientY
    });
    drawPoint(ctx, touch.clientX, touch.clientY, pointRadius);
		var mouseEvent = new MouseEvent("mousemove", {
			clientX: touch.clientX,
			clientY: touch.clientY
		});
		canvas.dispatchEvent(mouseEvent);
	}, false);
  /* end of mobile support*/
  /////////////////////////////////////////////////////////
}

function initCanvas() {
  var canvas = document.getElementById('mycanvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}

function initContext(canvas) {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  return ctx;
}

function drawPoint(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}
