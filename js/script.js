/**
* @Author: gyanl, ananayarora
* @Date:   2016-09-29T09:56:56+05:30
* @Last modified by:   ananayarora
* @Last modified time: 2016-09-29T10:00:14+05:30
*/

var newColour = [];
var format = 'hex';
var selected = 0;

function changeColorFormat() {
    format = document.querySelector('input[type="radio"]:checked').value;
}

function genColor() {
    var a = "";
    for (var i = 0; i < 3; i++)
        a = a.concat(Math.floor(Math.random() * 255).toString(16));

    if (a.length < 6) {
        for (var i = 0; i < (6 - a.length); i++)
            a = "0" + a;
    }
    return "#" + a;
}

function changeColour(num) {
    selected = num;
    if (num != -1) {
        new_color = newColour[num];
        //outline();  either use the fn or just write the code here.
    } else {
        new_color = genColor();
        newColour.unshift(new_color);
        for (var i = 0; i < 6; i++) {
            var div_id = "c" + (i);
            document.getElementById(div_id).style.background = newColour[i];
            document.getElementById('c0').focus();
        }
    }
    document.body.style.backgroundColor = new_color;
    document.getElementById('clipboard').style.background = new_color;
    document.getElementById('generate').style.background = new_color;
    document.getElementById('copyall').style.background = new_color;
    document.getElementById('clipboard').setAttribute("data-clipboard-text", formatColor(new_color));
}

function formatColor(color) {
    color = convertColor(color, format);
    return color;
}

function toast(yo) {
    yo.setAttribute("data-clipboard-text", formatColor(newColour[selected]));
    document.getElementById("toast").innerHTML = yo.getAttribute("data-clipboard-text") + " copied to clipboard.";
}

function copyAll(yo) {
    var colors = formatColor(newColour[0]);
    for (var i = 1; i < 6; i++) {
        if (newColour[i]) {
            colors = colors + ", " + formatColor(newColour[i]);
        }
    }
    document.getElementById('copyall').setAttribute("data-clipboard-text", colors);
    document.getElementById("toast").innerHTML = yo.getAttribute("data-clipboard-text") + " copied to clipboard.";
}

function start() {
    var clipboard = new Clipboard('.btn');
    changeColour(-1);
}

function keyNav(dir){
    switch(dir){
        case "right":
        if (selected < newColour.length -1){
        changeColour(selected + 1);
        document.getElementById('c'+(selected)).focus();
        }
        break;

        case "left":
        if (selected > 0){
        changeColour(selected - 1);
        document.getElementById('c'+(selected)).focus();
        }
        break;
    }

}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 82:
        changeColour(-1);
        break;

        case 67:
        var color = document.getElementById('clipboard');
        toast(color)
        break;
        
        case 65:
        var color = document.getElementById('copyall');
        copyAll(color)
        break;

        //added arrow key nav here
        //right
        case 39:
        keyNav("right");
        break;

        //right
        case 37:
        keyNav("left");
        break;
    }
};
