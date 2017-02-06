// global vars
var audio = new (window.AudioContext || window.webkitAudioContext)();
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var colors = ["#839192", "#80ffbf", "#566573", "#ff8080", "#00cc00", "#006600", "#c2d6d6"];
var time = 0;
var arrayLevel = 0;
var colorPick = 1;
var step=0;
var rangechange = 0;
// Interval ID's
var drawing = 0;

// VISUAL VARIABLE 4 CHANGE
var canvasSize = 900;
var speed = 30;
// END BLOCK;
var volControl = document.getElementById("volume");
var array = [];

ctx.strokeRect(1,1,899,899);
function resetButton() {
    ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);
    calcNewArray();
    drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
    drawArray(array);
    resetImage();
}

function startButton() {
    if (document.getElementById("StartButton").value == "Play") {
        document.getElementById("StartButton").value = "Pause ";
        initSort();
    } else {
        clearInterval(drawing);
        resetImage();
        document.getElementById("StartButton").value = "Play";
    }
}

calcNewArray();
resetImage();

function resetImage () {
    ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);
    drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
    drawArray(array);
        }

function calcNewArray() {
    array=[];
    for (var i = 0; i < +document.getElementById("elementsNumb").value; i++) {
        array.push(i*(1/(+document.getElementById("elementsNumb").value))*canvasSize*0.26+70);
    }
    var compareRandom = function() {
        return Math.random() - 0.5;
    };
    array.sort(compareRandom);
    step = array.length-2;
    resetImage();
}

function startOsc(freq) {
    var attack = 25,
        decay = 50,
        gain = audio.createGain(),
        osc = audio.createOscillator();
    gain.connect(audio.destination);
    gain.gain.setValueAtTime(0, audio.currentTime);
    gain.gain.linearRampToValueAtTime(volControl.value, audio.currentTime + attack / 700);
    gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 700);

    osc.frequency.value = (freq+100)*1.4;
    osc.type = "square";
    osc.connect(gain);
    osc.start(0);

    setTimeout(function() {
        osc.stop(0);
        osc.disconnect(gain);
        gain.disconnect(audio.destination);
    }, decay);
}

// document.getElementById("myRange").disabled = true;

function drawCircle(radius, fillColor) {
    ctx.strokeStyle = "#273746";
    ctx.lineWidth = 5;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(canvasSize/2, canvasSize/2, radius, Math.PI*2, 0);
    ctx.stroke();
    ctx.fill();
}

function drawArray(array) {
    ctx.lineWidth = 2*Math.PI*(+document.getElementById("sphereRadius").value)/array.length;

    for (var i = 0; i < array.length; i++) {
        lineFunction(false, i, colors[0], +document.getElementById("sphereRadius").value);
        lineFunction(false, time, colors[colorPick], +document.getElementById("sphereRadius").value);
        lineFunction(false, time+step, colors[colorPick], +document.getElementById("sphereRadius").value);
        lineFunction(true, i, colors[2], +document.getElementById("sphereRadius").value);
    }
}

function lineFunction(pommel, radCord, color, radius) {
    ctx.strokeStyle = color;
    if (pommel) {
        ctx.strokeStyle = colors[2];
        ctx.beginPath();
        ctx.moveTo(Math.cos(radCord*(Math.PI*2/array.length))*(radius+array[radCord])+canvasSize/2, Math.sin(radCord*(Math.PI*2/array.length))*(radius+array[radCord])+canvasSize/2);
        ctx.lineTo(Math.cos(radCord*(Math.PI*2/array.length))*(radius+array[radCord]+2*Math.PI*radius/array.length)+canvasSize/2, Math.sin(radCord*(Math.PI*2/array.length))*(radius+array[radCord]+2*Math.PI*radius/array.length)+canvasSize/2);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(Math.cos(radCord*(Math.PI*2/array.length))*radius+canvasSize/2, Math.sin(radCord*(Math.PI*2/array.length))*radius+canvasSize/2);
        ctx.lineTo(Math.cos(radCord*(Math.PI*2/array.length))*(radius+array[radCord])+canvasSize/2, Math.sin(radCord*(Math.PI*2/array.length))*(radius+array[radCord])+canvasSize/2);
        ctx.stroke();
    }
}

function initSort() {
    drawing = setInterval(sort, speed); // visual speed || code repeat interval
}

function sort() {  // comb sort code & conditions
    if (time + step >= array.length) {
        time = 0;
        step = (step == 1) ? step : Math.floor(step / 1.25);
    }
    if (arrayLevel > array.length*2) {
        terminateProgram();
    }
    for (var i = 0; i < array.length-1; i++) {
        if (array[i] <= array[i+step]) {
            arrayLevel++;
        } else {
            arrayLevel=0;
        }
    }
    if (time < array.length-1-arrayLevel) {
        startOsc(array[time+step]);
        startOsc(array[time]);
        ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);
        drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
        drawArray(array);

        if (array[time] > array[time+step]) {
            var temp = array[time];
            array[time] = array[time+step];
            array[time+step] = temp;
            colorPick = 3;
        } else {
            colorPick = 1;
        }
        time++;

    } else {
        time = 0;}
}

// Last green loop and shutdown
function terminateProgram() {
    colorPick = 3;
    arrayLevel = 0;
    clearInterval(drawing);
    ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);
    drawCircle(+document.getElementById("sphereRadius").value);
    ctx.lineWidth = 2 * Math.PI * (+document.getElementById("sphereRadius").value) / array.length;
    for (var i = 0; i < array.length; i++) {
        lineFunction(false, i, colors[0], +document.getElementById("sphereRadius").value);
        lineFunction(true, i, colors[2], +document.getElementById("sphereRadius").value);
    }
    i = 0;
    var id2 = setInterval(function() {
        if (i < array.length) {
            startOsc(array[i]);
            lineFunction(false, i, colors[1], +document.getElementById("sphereRadius").value);
            lineFunction(true, i, colors[5], +document.getElementById("sphereRadius").value);
        } else {
            drawCircle(+document.getElementById("sphereRadius").value, "#b3ffcc");
            clearInterval(id2);
            document.getElementById("StartButton").value = "Play";
            // Program shutdown!
        }
        i++;
    }, speed*0.5); // Last green-style speed
}
