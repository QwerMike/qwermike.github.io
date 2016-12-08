function start() {
  firebase.initializeApp({databaseURL: "https://test-c6477.firebaseio.com"});
  var db = firebase.database()
    , canvas = initCanvas()
    , ctx = initContext(canvas)
    , pointRadius
    , xCoef
    , yCoef;

  db.ref('/whiteboard').once('value')
    .then(function(snapshot) {
      var wb = snapshot.val();
      xCoef = canvas.width / wb.width;
      yCoef = canvas.height / wb.height;
      pointRadius = wb.pointRadius;
  });

  db.ref('/whiteboard/coordinates')
    .on('value', function(snapshot) {
      drawPoint(ctx,
                snapshot.val().x * xCoef,
                snapshot.val().y * yCoef,
                pointRadius);
    });
}

function initCanvas() {
  var canvas = document.getElementById("mycanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  return canvas;
}

function initContext(canvas) {
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.strokeStyle = "black";
  return ctx;
}

function drawPoint(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
}
