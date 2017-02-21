// global vars:

// sort state
var playing = false;

//canvas pics & audio prep.
var audio = new AudioContext(),
    volControl = document.getElementById("volume"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    canvasSize = 900;

//sphere radius global vars for RoundView
var radiusValue =  +document.getElementById("sphereRadius").value,
    diffRadiusValue = 0;

var colors = ["#839192", "#80ffbf", "#566573", "#ff8080", "#00cc00", "#006600", "#c2d6d6"],
    colorPick = 3,
    sortView = "roundView";

document.getElementById("roundView").style.backgroundColor = "hsla(163, 81%, 80%, 1)";
document.getElementById("firstButton").style.background = "linear-gradient(hsla(136, 64%, 87%, 1), hsla(136, 64%, 57%, 1))";


// additional sort state global vars & starting vars
var array = [],
    arrayLevel = 0,
    arrayLevelLow = 0,
    direction = true,
    time = 0,
    sortType ="combSort",
    step = 0,
    drawing = 0;


// |BEWARE|   Some terrible code below   /╲/\╭[☉﹏☉]╮/\╱\

calcNewArray();

function resetButton() {
    calcNewArray();
    if (sortView == "roundView") {
        drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
    }
    drawArray(array);
    resetImage();
}

function mouseDown() {
    if (playing) {
        document.getElementById("firstButton").style.background = "linear-gradient(hsla(0, 64%, 57%, 1), hsla(0, 64%, 87%, 1))";
    } else {
        document.getElementById("firstButton").style.background = "linear-gradient(hsla(136, 64%, 57%, 1), hsla(136, 64%, 87%, 1))";
    }
}

function startButton() {
    if (!playing) {
        playing = true;
        document.getElementsByClassName("sprite-play")[0].style.backgroundPosition = "-60px -5px";
        document.getElementById("firstButton").style.background = "linear-gradient(hsla(0, 64%, 87%, 1), hsla(0, 64%, 57%, 1))";
        initSort();
    } else {
        playing = false;
        document.getElementsByClassName("sprite-play")[0].style.backgroundPosition = "-60px -45px";
        document.getElementById("firstButton").style.background = "linear-gradient(hsla(136, 64%, 87%, 1), hsla(136, 64%, 57%, 1))";
        clearInterval(drawing);
        resetImage();
    }
}

function changeSpeed() {
    if (playing) {
        clearInterval(drawing);
        initSort();
    }
}

function changeRadius() {
    diffRadiusValue = +document.getElementById("sphereRadius").value - radiusValue;
    radiusValue = +document.getElementById("sphereRadius").value;
    for (var i = 0; i < array.length; i++) {
        array[i] -= diffRadiusValue;
    }
    resetImage();
}

// easy way to instantly clear & repaint sort image on the screen
function resetImage () {
    ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);
    if (sortView == "roundView") {
        drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
    }
    drawArray(array);
}

function compareRandom(array) {
    var j, x;
    for (var i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
}

function calcNewArray() {
    array=[];
    for (var i = 0; i < +document.getElementById("elementsNumb").value; i++) {
        array.push(Math.round(( (canvasSize/2) - (+document.getElementById("sphereRadius").value) - 60)));
    }
    for (i = 0; i < array.length; i++) {
        array[i] =  array[i] * ((i)*((0.64/array.length))) + 90;
    }
    compareRandom(array);
    step = array.length-2;
    time = 0;
    direction = true;
    resetImage();
}

// sound & soundwave shape
function startOsc(freq) {
    var attack = 25,
        decay = 60,
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

function drawCircle(radius, fillColor) {
    ctx.strokeStyle = colors[0];
    ctx.lineWidth = 5;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(canvasSize/2, canvasSize/2, radius, Math.PI*2, 0);
    ctx.stroke();
    ctx.fill();
}

function drawArray(array) {
    ctx.lineWidth = 2*Math.PI*(+document.getElementById("sphereRadius").value)/array.length;

    if (sortType === "combSort") {
         for (var i = 0; i < array.length; i++) {
            lineFunction(false, i, colors[0], +document.getElementById("sphereRadius").value);
            lineFunction(false, time-1, colors[colorPick], +document.getElementById("sphereRadius").value);
            lineFunction(false, time+step-1, colors[colorPick], +document.getElementById("sphereRadius").value);
            lineFunction(true, i, colors[2], +document.getElementById("sphereRadius").value);
         }
    }

    if (sortType === "bubbleSort") {
        for (var i = 0; i < array.length; i++) {
            lineFunction(false, i, colors[0], +document.getElementById("sphereRadius").value);
            lineFunction(false, time-1, colors[colorPick], +document.getElementById("sphereRadius").value);
            lineFunction(false, time, colors[colorPick], +document.getElementById("sphereRadius").value);
            lineFunction(true, i, colors[2], +document.getElementById("sphereRadius").value);
        }
    }

    if (sortType === "cocktailSort") {
        if (direction) {
            for (var i = 0; i < array.length; i++) {
                lineFunction(false, i, colors[0], +document.getElementById("sphereRadius").value);
                lineFunction(false, time-1, colors[colorPick], +document.getElementById("sphereRadius").value);
                lineFunction(false, time, colors[colorPick], +document.getElementById("sphereRadius").value);
                lineFunction(true, i, colors[2], +document.getElementById("sphereRadius").value);
            }
        } else {
            for (var i = 0; i < array.length; i++) {
                lineFunction(false, i, colors[0], +document.getElementById("sphereRadius").value);
                lineFunction(false, time+2, colors[colorPick], +document.getElementById("sphereRadius").value);
                lineFunction(false, time+1, colors[colorPick], +document.getElementById("sphereRadius").value);
                lineFunction(true, i, colors[2], +document.getElementById("sphereRadius").value);
            }
        }
    }
}

function lineFunction(pommel, radCord, color, radius) {
    if (sortView == "roundView") {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2*Math.PI*(+document.getElementById("sphereRadius").value)/array.length;
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
    if (sortView == "classicView") {
        ctx.strokeStyle = color;
        ctx.lineWidth = canvasSize*0.75 / array.length;
        if (pommel) {
            ctx.beginPath();
            ctx.moveTo(radCord * (canvasSize*0.9 / array.length)+30, canvasSize/2 - array[radCord]);
            ctx.lineTo(radCord * (canvasSize*0.9 / array.length)+30, canvasSize/2 - array[radCord] - canvasSize*0.8 / array.length);
            ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(radCord * (canvasSize*0.9 / array.length)+30, canvasSize/2);
            ctx.lineTo(radCord * (canvasSize*0.9 / array.length)+30, canvasSize/2 - array[radCord]);
            ctx.stroke();
        }
    }
    if (sortView == "gradientView") {
        var gradientValue = canvasSize/array.length + 50;
        ctx.lineWidth = canvasSize / array.length;
        if (time > 1) {
            ctx.strokeStyle = colors[2];
            ctx.beginPath();
            if (sortType == "combSort") {
                ctx.moveTo((time - 1) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300);
                ctx.lineTo((time - 1)* (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300 - canvasSize * 0.8 / array.length);
            }
            if (sortType == "bubbleSort") {
                ctx.moveTo((time - 1) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300);
                ctx.lineTo((time - 1)* (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300 - canvasSize * 0.8 / array.length);
            }
            if (sortType == "cocktailSort") {
                if (direction) {
                    ctx.moveTo((time - 1) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300);
                    ctx.lineTo((time - 1) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300 - canvasSize * 0.8 / array.length);
                } else {
                    ctx.moveTo((time + 2) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300);
                    ctx.lineTo((time + 2) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300 - canvasSize * 0.8 / array.length);
                }
            }
            ctx.stroke();

            ctx.beginPath();
            if (sortType == "combSort") {
                ctx.moveTo((time + step - 1) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300);
                ctx.lineTo((time + step - 1) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300 - canvasSize * 0.8 / array.length);
            }
            if (sortType == "bubbleSort") {
                ctx.moveTo((time) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300);
                ctx.lineTo((time) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300 - canvasSize * 0.8 / array.length);
            }
            if (sortType == "cocktailSort") {
                if (direction) {
                    ctx.moveTo(time * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300);
                    ctx.lineTo(time * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300 - canvasSize * 0.8 / array.length);
                } else {
                    ctx.moveTo((time + 1) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300);
                    ctx.lineTo((time + 1) * (canvasSize * 0.8 / array.length) + gradientValue, canvasSize / 2 - 300 - canvasSize * 0.8 / array.length);
                }
            }
                ctx.stroke();
            }
        ctx.strokeStyle = "hsla( 199, 17%, "+100*array[radCord]/300+"%, 1)";
        if (!pommel) {
            ctx.beginPath();
            ctx.moveTo(radCord * (canvasSize*0.8 / array.length)+canvasSize/array.length + 50, canvasSize/2);
            ctx.lineTo(radCord * (canvasSize*0.8 / array.length)+canvasSize/array.length + 50, canvasSize/2 - 300);
            ctx.stroke();
        }
    }


}

function initSort() {
    drawing = setInterval(sort, Math.abs(+document.getElementById("codeSpeed").value-200)); // code repeat interval
}

function changeSortType() {
    clearInterval(drawing);
    resetImage();
    if (playing) {
        startButton();
    }
    sortType = document.forms[0].elements[0].value;
    clearInterval(drawing);
}

function changeSortView(view) {
    document.getElementById("roundView").style.backgroundColor="";
    document.getElementById("classicView").style.backgroundColor="";
    document.getElementById("gradientView").style.backgroundColor="";

    sortView = view;
    if (sortView == "roundView") {
        document.getElementById("roundView").style.backgroundColor = "hsla(163, 81%, 80%, 1)";
    }
    if (sortView == "classicView") {
        document.getElementById("classicView").style.backgroundColor = "hsla(163, 81%, 80%, 1)";
    }
    if (sortView == "gradientView") {
        document.getElementById("gradientView").style.backgroundColor = "hsla(163, 81%, 80%, 1)";
    }
    resetImage();
}

function sort() {
    ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);

    // **************// comb sort code & conditions //************************************************//

    if (sortType === "combSort") {
        if (array[time] > array[time+step]) {
            colorPick = 3;
        } else {
            colorPick = 1;
        }
        drawArray(array);
        if (sortView == "roundView") {
            drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
        }
        if (time + step >= array.length) {
            time = 0;
            step = (step == 1) ? step : Math.floor(step / 1.25);
        }
        if (arrayLevel > array.length) {
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


            if (array[time] > array[time+step]) {
                var temp = array[time];
                array[time] = array[time+step];
                array[time+step] = temp;
            }
            time++;
        } else {
            time = 0;}
    }
    // *******// stupid-style bubble sort & conditions //*************//

    if (sortType === "bubbleSort") {

        ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);

        if (array[time] > array[time+1]) {
            colorPick = 3;
        } else colorPick = 1;

        drawArray(array);
        if (sortView == "roundView") {
            drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
        }

        if (arrayLevel > array.length) {
            terminateProgram();
        }

        for (var i = 0; i < array.length-1; i++) {
            if (array[i] <= array[i+1]) {
                arrayLevel++;
            } else {
                arrayLevel=0;
            }
        }

        if (time < array.length-1-arrayLevel) {

            startOsc(array[time]);
            startOsc(array[time+1]);


            if (array[time] > array [time+1]) {
                var temp = array[time+1];
                array[time+1] = array[time];
                array[time] = temp;
            }
            time++;

        } else {
            time = 0;}
    }
    // ********************// cocktail shaker sort //*********************************//

    if (sortType === "cocktailSort") { //
        if (arrayLevel+arrayLevelLow > array.length) {
            terminateProgram();
        }

        ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);
        drawArray(array);
        if (sortView == "roundView") {
            drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
        }

        if (direction) {
            for (var i = 0; i < array.length-1; i++) {
                if (array[i] < array[i+1]) {
                    arrayLevel++;
                } else {
                    arrayLevel=0;
                }
            }
        } else {
            for (i = array.length; i > 1; i--) {
                if (array[i] > array[i-1]) {
                    arrayLevelLow++;
                } else {
                    arrayLevelLow=0;
                }
            }
        }

        if (direction) {
            if (time < array.length-arrayLevel-1) {
                startOsc(array[time]);
                startOsc(array[time+1]);
                if (array[time] > array [time+1]) {
                    var temp = array[time+1];
                    array[time+1] = array[time];
                    array[time] = temp;
                    colorPick = 3;
                } else {
                    colorPick = 1;
                }
                time++;

            } else {
                direction=false;
            }
        }


        if (!direction) {
            if (time > arrayLevelLow) {
                startOsc(array[time]);
                startOsc(array[time-1]);
                if (array[time] > array [time+1]) {
                    var temp = array[time+1];
                    array[time+1] = array[time];
                    array[time] = temp;
                    colorPick = 3;
                } else {
                    colorPick = 1;
                }
                time--;

            } else {
                direction=true;
            }
        }
    }
}

function terminateProgram() {
    clearInterval(drawing);
    ctx.clearRect(10, 10, canvasSize-20, canvasSize-20);
    time = 0;
    colorPick = 3;
    ctx.lineWidth = 2 * Math.PI * (+document.getElementById("sphereRadius").value) / array.length;
    for (var i = 0; i < array.length; i++) {
        lineFunction(false, i, colors[0], +document.getElementById("sphereRadius").value);
        lineFunction(true, i, colors[2], +document.getElementById("sphereRadius").value);
        if (sortView == "roundView") {
            drawCircle(+document.getElementById("sphereRadius").value, colors[6]);
        }
    }
    i = 0;
    var finishDrawing = setInterval(function() { // Last green-style check 
        if (i < array.length) {
            startOsc(array[i]);
            lineFunction(false, i, colors[1], +document.getElementById("sphereRadius").value);
            lineFunction(true, i, colors[5], +document.getElementById("sphereRadius").value);
            if (sortView == "roundView") {
                drawCircle(+document.getElementById("sphereRadius").value);
            }
        } else {
            if (sortView == "roundView") {
                drawCircle(+document.getElementById("sphereRadius").value, "#b3ffcc");
            }
            clearInterval(finishDrawing);
            arrayLevel = 0;
            arrayLevelLow = 0;
            playing = false;
            document.getElementsByClassName("sprite-play")[0].style.backgroundPosition = "-60px -45px";
            document.getElementById("firstButton").style.background = "linear-gradient(hsla(136, 64%, 87%, 1), hsla(136, 64%, 57%, 1))";
            console.log("Array with " + array.length + " elements was completely sorted via " + sortType + " technique!" );

            // Program shutdown!
        }
        i++;
    }, Math.abs(+document.getElementById("codeSpeed").value-200)*0.7);
}

