const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("jsColor"); 
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = "700";

/** 캔버스 내 픽셀 컨트롤 */
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

/* context내 모든 선은 #2c2c2c색을 가지고 두깨는 2.5 */
ctx.fillStyle= "white";
ctx.fillRect(0,0, CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle= INITIAL_COLOR;
ctx.fillStyle= INITIAL_COLOR;;
ctx.lineWidth = 2.5; /* 선 두깨조절 */


/*변수선언*/
let painting = false;
let filling  = false;

function stopPainting (){
    painting = false;
}

function startPainting(){
    painting = true;
}


 /**캔버스 내에서 마우스 움직일 때의 x,y축값 */
function onMouseMove(event) {  
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    
}
//  /**캔버스 내에서 마우스 클릭한 상태로 움직일 때는 true */    
// function onMouseDown(event) {
//     painting = true; 
// }


function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

/*선 굵기조절*/
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;

}

/*fill <-> paint mode change */
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";      
    }
}


function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0,0, CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event) {
    event.preventDefault(); /* 마우스 우클릭방지*/
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[★]";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); /**이동 */
    canvas.addEventListener("mousedown", startPainting); /**클릭 */
    canvas.addEventListener("mouseup", stopPainting); /**클릭해제 */
    canvas.addEventListener("mouseleave", stopPainting); /**캔버스밖 */
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM); /* 마우스 우클릭방지*/

}


Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));



if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}