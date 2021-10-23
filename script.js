function drawGrid(container, no) {
    container.innerHTML = "";
    //container = Array.from(container)
    for (let i = 0; i < (no * no); i++) {
        let box = document.createElement("div");
        container.appendChild(box);
        box.style.backgroundColor = "#3f3f3f";

        box.addEventListener("mouseover", changeColor);

    }
    container.style.gridTemplateColumns = `repeat(${no}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${no}, 1fr)`;
}

function changeColor(e) {
    if (colorMode == 0 && checked == 0) {
        e.target.style.backgroundColor = "rgb(255, 255, 255)";
    }
    else if (colorMode == 1 && checked == 0) {
        e.target.style.backgroundColor = getRandomColor();
    }
    else if (colorMode == 0 && checked == 1) {
        if (e.target.getAttribute("data-flag")) {
            e.target.style.backgroundColor = shade(e.target.style.backgroundColor);
        }
        else { 
            e.target.style.backgroundColor = "rgb(255, 255, 255)";
        }
    }
    else {
        if (e.target.getAttribute("data-flag")) {
            e.target.style.backgroundColor = shade(e.target.style.backgroundColor);
        }
        else {
            e.target.style.backgroundColor = getRandomColor();
        }
    }
    e.target.setAttribute("data-flag", true);
}

function getRandomColor() {
    let h = Math.floor(Math.random() * 360);
    return `hsl(${h},85%,60%)`;
}

function shade(currentColor) {
    let rgb = currentColor.match(/\d+/g).map(x => {        
        let y = x - 55;
        y = y < 0 ? 0 : y;
        return y;
    });
    return (`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
}

function calcDimensions() {
    if (w < h) {
        gridContainer.style.width = "90vw";
        gridContainer.style.height = "90vw";

    } else {
        gridContainer.style.width = "90vh";
        gridContainer.style.height = "90vh";
    }
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;
}

function clearClick() {

    gridDimensions = prompt("Enter new Sketch dimensions:\nmin: 5, max: 100 ");
    if (gridDimensions >= 5 && gridDimensions <= 100 && gridDimensions % 1 == 0) {
        console.log(gridDimensions);
        drawGrid(gridContainer, gridDimensions);
    }
    else {
        clearClick();
    }
    colorMode = 1;
    changeMode();
}

function changeMode() {
    if (colorMode == 0) {
        colorMode = 1;
        drawGrid(gridContainer, gridDimensions);
        document.getElementById("colorP").innerHTML = "Enter White mode";
        document.getElementById("color").innerHTML = "White mode";
    }
    else {
        colorMode = 0;
        drawGrid(gridContainer, gridDimensions);
        document.getElementById("colorP").innerHTML = "Enter Color mode";
        document.getElementById("color").innerHTML = "Color mode";
    }
}

function changeChkbx() {
    if (this.checked) {
        checked = 1;
    }
    else checked = 0;
}

let colorMode = 0; // 1 - White mode, 2 - Color mode, 3 - Shading mode
let gridDimensions = 15;
let checked = 0;
let gridContainer = document.getElementById("grid");
let clearBtn = document.getElementById("clear");
let colorBtn = document.getElementById("color");
let shading = document.getElementById("shading");


let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight;
calcDimensions(w, h);
drawGrid(gridContainer, gridDimensions);
window.addEventListener("resize", calcDimensions);
clearBtn.addEventListener("click", clearClick);
colorBtn.addEventListener("click", changeMode);
shading.addEventListener("change", changeChkbx);
