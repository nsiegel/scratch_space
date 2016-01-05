$(document).ready(function() {
  var socket = io.connect();
  var canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  // ctx.fillStyle = "rgba(0,0,0)";
  var isDrawing = false;
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;

  var x = 0;
  var y = 0;

  var findXY = function(x, y) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: x - canvas.offsetLeft,
      y: y - canvas.offsetTop
    };
  };

  var click = function(e) {
    isDrawing = true;
    var pos = findXY(e.pageX, e.pageY);
    x = pos.x;
    y = pos.y;
    // ctx.beginPath();
    // ctx.moveTo(pos.x, pos.y);
  };

  var draw = function(e) {
    if (!isDrawing) {
      // console.log('Im not drawing');
      return;
    }
    var pos = findXY(e.pageX, e.pageY);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(pos.x, pos.y);
    x = pos.x;
    y = pos.y;
    // console.log("x: " + x + " " + "y: " + y);
    ctx.stroke();
    socket.emit('draw', {
      x: x,
      y: y,
    });
  };

  var drawCoordinates = function(a, b) {
    if (!isDrawing) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(a, b);
    ctx.lineTo(a, b);
    // console.log("x: " + x + " " + "y: " + y);
    ctx.stroke();
  }

  var stopDrawing = function(e) {
    isDrawing = false;
  };

  canvas.addEventListener('mousedown', click);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);

  socket.on('message', function(data) {
    console.log(data.message);
  });

  socket.on('draw', function(data) {
    // got drawing coordinates
    // must draw at these coordinates
    // call draw(x, y)
    draw(data.x, data.y);
  });
});
