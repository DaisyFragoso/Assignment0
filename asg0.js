// Daisy Fragoso

var canvas;
var ctx;

function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');

  var v1 = new Vector3([2.25, 2.25, 0]);

  // draww a black rect
  ctx.fillStyle = 'black'; // Set color to black
  ctx.fillRect(0, 0, 400, 400);   // Fill a rectangle with the color

}

function drawVector(v, color){
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2);
  ctx.lineTo(200 + v.elements[0]*20, 200 - v.elements[1]*20, v.elements[2]*20);
  ctx.stroke();
}

function handleDrawEvent() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // get the values
    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;
    
    // draw the lines
    var v1 = new Vector3([x1, y1, 0.0]);
    drawVector(v1, "red");
    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue");
}

function handleDrawOperationEvent() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 400, 400);

    // v1
    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;
    var v1 = new Vector3([x1, y1, 0.0]);
    drawVector(v1, "red");

    // v2
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;
    var v2 = new Vector3([x2, y2, 0.0]);
    drawVector(v2, "blue");

    // Operations
    var opt = document.getElementById('operations').value;
    if (opt == 'add'){
        console.log(typeof(v1));
        console.log(v2);
        v1.add(v2);
        console.log(v1);

        drawVector(v1, "green");

    } else if (opt == 'sub') {
        v1.sub(v2);
        drawVector(v1, "green");

    } else if (opt == 'div') {
        var s = document.getElementById('scalar').value;
        v1.div(s);
        drawVector(v1, "green");
        v2.div(s);
        drawVector(v2, "green");

    } else if (opt == 'mult') {
        var s = document.getElementById('scalar').value;
        v1.mul(s);
        drawVector(v1, "green");
        v2.mul(s);
        drawVector(v2, "green");

    } else if (opt == 'mag') {
        console.log("Magnitude v1: " + v1.magnitude());
        console.log("Magnitude v2: " + v2.magnitude());

    } else if (opt == 'norm') {
        v1.normalize();
        drawVector(v1, "green");
        v2.normalize();
        drawVector(v2, "green");

    } else if (opt == 'angle') {
        console.log("Angle: " + angleBetween(v1, v2).toFixed(2));
    } else if (opt == 'area') {
        console.log("Area of the Triangle: " + areaTriangle(v1, v2));
    }
}

function angleBetween(v1, v2) {
    var d = Vector3.dot(v1, v2);
    var mag1 = v1.magnitude();
    var mag2 = v2.magnitude();
    
    var alpha = Math.acos(d/(mag1*mag2));
    alpha *= 180 / Math.PI; // convert to degrees

    return alpha;
}

function areaTriangle(v1, v2) {
    let crossProduct = Vector3.cross(v1, v2);
    let crossMagnitude = crossProduct.magnitude();
    let area = crossMagnitude / 2;

    return area;
}