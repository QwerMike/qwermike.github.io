let canvas = document.getElementById("mycanvas");
let side = Math.min(window.innerWidth, window.innerHeight);
canvas.height = side;
canvas.width = side;
let pixel = { size: side / 32.0 };

let pixelGrid = new Array(32);
for (let i = 0; i < 32; ++i) {
  pixelGrid[i] = new Array(32);
  for (let j = 0; j < 32; ++j) {
	pixelGrid[i][j] = false;
  }
}

// starts on script load
function start(params) {
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = 1;
  ctx.fillStyle = "black";
	ctx.strokeStyle = "grey";
  Draw.grid32(ctx);
  //showPoly(ctx, "(4,4)-(4,26)-(20,26)-(28,18)-(21,4)-(21,8)-(10,8)-(10,4)");
  let p1 = null, p2 = null;

	let inputPoint = function (e) {
		p2 = Point.newPointFromMouse(e.clientX, e.clientY);
    Draw.point(p2, ctx);
		Draw.bline(p1, p2, ctx);
		p1 = p2;
  }

	let initPoint = function initPoint(e) {
		if (p1 == null) {
			p1 = Point.newPointFromMouse(e.clientX, e.clientY);
			pixelGrid[p1.x][p1.y] = true;
    	Draw.point(p1, ctx);
			canvas.removeEventListener("click", initPoint);
			canvas.addEventListener("click", inputPoint);
		}
	}
	
  canvas.addEventListener("click", initPoint);

  document.addEventListener("keyup", function completeInput(e) {
    if (e.keyCode == 13 || e.which == 13) { // 13 -> Enter
      canvas.removeEventListener("click", inputPoint);
	  	canvas.addEventListener("click", function inputSeed(e) {
				canvas.removeEventListener("click", inputSeed);
				let seed = Point.newPointFromMouse(e.clientX, e.clientY);
				ctx.fillStyle = "green";
				boundaryFill(ctx, seed);
	  	});
    } else if (e.keyCode == 27 || e.which == 27) { // 27 -> Esc
			p1 = null;
			p2 = null;
			canvas.removeEventListener("click", inputPoint);
			canvas.addEventListener("click", initPoint);
		}
  });
}

function showPoly(ctx, str) {
  let arr = str.replace(/[()]+/g, "").split("-");
  for (let i = 0; i < arr.length; ++i) {
		let coor = arr[i].split(",");
		let p = new Point(parseInt(coor[0]), parseInt(coor[1]));
		Draw.point(p, ctx);
  }
}

function boundaryFill(ctx, seed) {
  if (!pixelGrid[seed.x][seed.y]) {
		pixelGrid[seed.x][seed.y] = true;
		Draw.point(seed, ctx);
		console.log(seed.x, seed.y);
		setTimeout(()=>{
			if (seed.x < 31){
				let p = new Point(seed.x + 1, seed.y);
				boundaryFill(ctx, p);
			}
		}, 100);
			
		setTimeout(()=>{
			if (seed.x > 0) {
				let p = new Point(seed.x - 1, seed.y);
				boundaryFill(ctx, p);
			}
		}, 100);
			
		setTimeout(()=>{
			if (seed.y < 31) {
				let p = new Point(seed.x, seed.y + 1);
				boundaryFill(ctx, p);
			}
		}, 100);
		
		setTimeout(()=>{
			if (seed.y > 0) {
			let p = new Point(seed.x, seed.y - 1);
				boundaryFill(ctx, p);
			}
		}, 100);
	}
}

function boundaryFill_linear(ctx, seed, t) {
  if (!pixelGrid[seed.x][seed.y]) {
		pixelGrid[seed.x][seed.y] = true;
		setTimeout(() => Draw.point(seed, ctx), t);
		if (seed.x < 31){
			let p = new Point(seed.x + 1, seed.y);
			boundaryFill_linear(ctx, p, t+=20);
		}
		
		if (seed.y < 31) {
			let p = new Point(seed.x, seed.y + 1);
			boundaryFill_linear(ctx, p, t+=15);
		}

		if (seed.x > 0) {
			let p = new Point(seed.x - 1, seed.y);
			boundaryFill_linear(ctx, p, t+=10);
		}
	
		if (seed.y > 0) {
			let p = new Point(seed.x, seed.y - 1);
			boundaryFill_linear(ctx, p, t+=5);
		}
	}
}

class Draw {
	static point(p, ctx) {
		pixelGrid[p.x][p.y] = true;
		ctx.beginPath();
		ctx.rect(p.x*pixel.size, p.y*pixel.size,
			 			 pixel.size, pixel.size);
    ctx.fill();
		ctx.closePath();
	}

	static grid32(ctx) {
		for (let i = 0; i < 33; ++i) {
			ctx.beginPath();
			ctx.moveTo(i * pixel.size, 0);
			ctx.lineTo(i * pixel.size, canvas.height);
			ctx.stroke();
			ctx.closePath();
		}
		
		for (let i = 0; i < 33; ++i) {
			ctx.beginPath();
			ctx.moveTo(0, i * pixel.size);
			ctx.lineTo(canvas.width, i * pixel.size);
			ctx.stroke();
			ctx.closePath();
		}
	}

	static bline(p0, p1, ctx) { 
		let dx = Math.abs(p1.x - p0.x), sx = p0.x < p1.x ? 1 : -1;
		let dy = Math.abs(p1.y - p0.y), sy = p0.y < p1.y ? 1 : -1; 
		let err = (dx > dy ? dx : -dy) / 2, e2;
		let p = new Point(p0.x, p0.y);
		
		while (true) {
			console.log(p.x, p.y);
			Draw.point(p, ctx);
			if (p.x === p1.x && p.y === p1.y) break;
			e2 = err;
			if (e2 > -dx) { err -= dy; p.x += sx; }
			if (e2 < dy) { err += dx; p.y += sy; }
		}
	}
} // class Draw

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

	static newPointFromMouse(x, y) {
		let p = new Point();
		p.x = (x / pixel.size) | 0;
		p.y = (y / pixel.size) | 0;
		return p;
	}
}
