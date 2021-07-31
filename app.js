/* 캔버스 위에서 마우스가 움직이면 감지하도록  */
const canvas = document.querySelector("#jsCanvas")
const ctx = canvas.getContext('2d')
/* 캔버스의 픽셀을 가지고 노는 것이기 때문에 자동적으로 이미지 저장과 같은
이미지 메소드가 제공됨 */


canvas.width = 650;
canvas.height = 650;

// If you want to have the visual size be the same as the pixel size,\
// never set the styles, only the attributes.

/* css로 만든 햐얀 네모는 그냥 디자인일 뿐이고
실제 HTML 요소를 위한 크기도 정해줘야 한다.(= 픽셀을 잡는 과정)
이렇게 650으로 해놓으면 반응형으로 em으로 잡아도 될려나..? */
// 이거 리사이즈 때마다 해줘야 함 + 맨 처음이랑!
const screenWidth = window.innerWidth;
if (screenWidth > 840) {
    canvas.width = 650;
    canvas.height = 650;
} else if (screenWidth > 520) {
    canvas.width = 500;
    canvas.height = 500;
} else {
    canvas.width = 320;
    canvas.height = 320;
}
// height 속성이나 width 속성을 재설정하면, 기존 canvas 그림 전부 사라짐

window.addEventListener('resize', () => {
    if (screenWidth > 840) {
        canvas.width = 650;
        canvas.height = 650;
    } else if (screenWidth > 520) {
        canvas.width = 500;
        canvas.height = 500;
    } else {
        canvas.width = 320;
        canvas.height = 320;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
});


// canvas 기본색 하얀색으로
ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width,canvas.height)

const DEFAULT_COLOR = "#2c2c2c"

ctx.strokeStyle = DEFAULT_COLOR
// 여기 ctx.fillStyle = DEFAULT_COLOR 으로 되었었는데, Nomad가 틀린거임
/* 정확히 말하면 default가 fill을 눌렀는데 왜 fillStyle이 white에서 
버튼 색으로 바뀌지 않는가? 가 문제임 */

ctx.lineWidth = 2.5



/* 색을 받아오기 */
const colors = document.getElementsByClassName('jsColor')
/* 캔버스 색을 바꾸는지, 아닌지를 알아야 함 */
const mode = document.getElementById('jsMode')
function handleColorClick(event) {
    
    // 기존 캔버스색을 가져올수 있어야 함
    
    const color = event.target.style.backgroundColor;
    console.log(color);
    /* strokeStyle을 오버라이딩하기만 하면 됨 
    => fillStyle(캔버스색)도 오버라이딩해야한다*/
    /* ctx.fillStyle = color */ /* 캔버스 채우는 색 */
    console.log("캔버스색", ctx.fillStyle);
    /* 아니면 경우를 나누면 되나? */
    console.log('현재 모드',mode.innerText);
    if (filling) {
        ctx.fillStyle = color
        // 한번에 다바꾸니까 캔버스색깔이 드로잉색깔을 따라가지
        // 캔버스색깔을 보존해서 이따 지울때 쓰고싶으면 경우를 나눠야 한다
    } else {
        ctx.strokeStyle = color /* 캔버스 윤곽선 색 */
    }
}

/* colors의 type은 HTMLcollection. Array로 만들고 싶다 */
Array.from(colors).forEach(color =>{
    color.addEventListener('click', handleColorClick)
    
})
/* mousedown이 됐을 때 painting은 true가 된다. 
클릭을 멈추면 다시 false로 돌아가야 함 */
let painting = false;

/* 선 굵기 바꾸기 */
const range = document.querySelector('#jsRange')

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value
}

if (range) {
    range.addEventListener('input',handleRangeChange)
}


/* Current Mode 나오게하는 Alert */

/* Filling, Drawing 모드 바꾸기 */
let filling = false
function handleModeClick() {
    if (filling) {
        mode.innerText = "Change to \n Filling"
        filling = false
    } else {
        mode.innerText = "Change to \n Draw"
        filling = true
    }
}
if (mode) {
    mode.addEventListener('click',handleModeClick)
}


/* Filling 모드에서 canvas를 클릭하면 채워주기를 바람 */
function handleCanvasClick() {
    console.log('handleCanvasClick: clicked');
    /* filling일때만 실행하게. 아니면 그대로 drawing할 수 있도록 */
    if (filling) {
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }
}


function onMouseMove(event) {
    /* client는 1920x1080 화면 전체의 좌표
    canvas의 좌표만 얻고 싶다면 offsetX, offsetY */
    const x = event.offsetX;
    const y = event.offsetY;
    /* 캔버스 위를 클릭하는 순간을 인지하게 하고
    클릭했을 때 페인팅을 시작해야 함 */

    /* context의 메소드들 */
    /* path는 선을 만들어주는데, path를 시작하고 움직이며 채워넣을 수 있다.
    우리는 path를 마우스가 클릭 없이 그냥 떠다닐 때만 시작되기를 원한다.
    (좌표만 저장한다는 느낌)
    여기서 path는 만들어지긴 하지만 채워지지 않은 빈 선이다.
    클릭이 되면 실제로 painting을 시작한다. */
    if (!painting) {
        /* 클릭 안하고 움직일 때 */
        ctx.beginPath()
        /* 마우스가 가는대로 path가 만들어지는 중 */
        ctx.moveTo(x,y)
    } else {
        /* 클릭하고 움직일 때 
        클릭 시작점에서 현재 마우스 x,y까지 선을 그린다.
        => 클릭하고 있을 때 내내 발생하겠지. 시작과 끝선이 아니란 말씀
        */
       ctx.lineTo(x,y)
       /* 실제로 칠함 */
       ctx.stroke()
    }

    /* 마우스일때
    클릭안하고 옮겨다니기만해도 클릭안하고 움직이는게 됨
    클릭을 해야 stroke()가 실행됨
    터치일때 
    실제로 터치디바이스일땐, 클릭 안할때를 알 필요가 없잖아? 
    클릭 안할때는 이벤트리스너도 실행이 안됨
    클릭하면 stroke가 실행되는게 아니라 !painting일때의 moveTo(x,y)가 실행됨
    */
}

/* 저장 */
const saveBtn = document.querySelector('#jsSave')

function handleCM(event) {
    /* 원래 실행되는 마우스 오른쪽 클릭 없앰 */
    event.preventDefault()
}
function handleSaveClick(event) {
    const image = canvas.toDataURL();
    const link = document.createElement('a')
    link.href = image
    link.download = 'PaintJS'
    /* 다운로드 링크를 누르는 효과 */
    link.click()
}

if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick)
}

/* 같은 기능이 반복되지? => 하나의 함수로 통함
function onMouseUp(event) {
    stopPainting()
}

function onMouseLeave(event) {
    painting = false
}
*/

function startPainting() {
    painting = true
}
function stopPainting() {
    painting = false
}

/* 리셋하기 */
function handleResetClick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
}

const resetBtn = document.querySelector('#jsReset')

if (resetBtn) {
    resetBtn.addEventListener('click', handleResetClick)
}

/* 지우기 */
function handleEraseClick() {

    console.log('캔버스색',ctx.fillStyle);
    console.log('원래 선 색, 캔버스색으로 바꾸기 전',ctx.strokeStyle);
    /* 쓰는 색깔이 strokeStyle이 아니라 다른건가본데? */
    ctx.strokeStyle = ctx.fillStyle
    /* 지우개 크기는 Brush를 따라감 */
}

const eraseBtn = document.querySelector('#jsErase')

if (eraseBtn) {
    eraseBtn.addEventListener('click', handleEraseClick)
}

/* startPainting가 뭘까? */

/* 터치 추가 */
function handleTouchClick(event) {
    console.log(event);
    event.preventDefault();
    if ( filling ) {
        ctx.fillRect(0,0,canvas.width,canvas.height);
        console.log('필링');
    } else {
        ctx.beginPath();
        startPainting();
        console.log('드로잉');
    }
}

// function onMouseMove(event) {
//     const x = event.offsetX;
//     const y = event.offsetY;
//     if (!painting) {
//         ctx.beginPath()
//         ctx.moveTo(x,y)
//     } else {
//        ctx.lineTo(x,y)
//        ctx.stroke()
//     }
// }

function handleTouchMove(event) {
    event.preventDefault();
    var touches = event.changedTouches;
    console.log(touches[0]);
    /* onMouseMove랑 같은건데. 여기서 x,y좌표를 주면 되거든...? */
    ctx.lineTo(touches[0].clientX, touches[0].clientY);
    /* clientX, clientY, pageX, pageY */
    ctx.stroke();
}

function handleTouchEnd(event) {
    event.preventDefault();
    ctx.closePath();
    stopPainting();
    console.log('handleTouchEnd');
}


/* 여기에 터치를 추가해야 되네요? ... */
if (canvas) {
    canvas.addEventListener('mousemove',onMouseMove)
    /* 클릭했을 때 이벤트: mousedown */
    canvas.addEventListener('mousedown',startPainting)
    /* 클릭 멈추고 ;손 뗐을 때 이벤트: mouseup */
    canvas.addEventListener('mouseup',stopPainting)
    /* 캔버스를 벗어났을 때도 painting은 false가 되어야 함 */
    canvas.addEventListener('mouseleave',stopPainting)
    /* 캔버스 클릭됐을 때 */
    canvas.addEventListener('click',handleCanvasClick)
    /* 마우스 오른쪽 클릭해서 나오는 게 contextmenu */
    canvas.addEventListener('contextmenu',handleCM)

    // 마우스는
    /* 안움직이다(mousemove) 누르고(mousedown) 그때부터 쭈욱 그리다가
    떼면(mouseup) 끝난다. 마우스 왼쪽은 터치에서 오래 누르면 자동으로 되니까
    touch에서 다시 할 필요가 없다. click은 터치에서 touchstart랑 같다 */
    // 터치에서는
    /* click이 touchstart랑 같다
    안움직이면 손가락을 아예 대지 않은 것이기때문에 mousemove가 필요없다
    손 댔을 때touchmove만 그린다. touchend는 손을 뗐을 때이다 */
    canvas.addEventListener("touchstart", handleTouchClick, false);
    canvas.addEventListener('touchmove',handleTouchMove, false)
    canvas.addEventListener("touchend", handleTouchEnd, false);


    /* touchcancel은 캔버스 밖으로 나가는게 아니라 
    아예 스크린 밖으로 나갈때를 위한 것 */

    // when the user puts a finger on the screen.
    // == the player touches the screen but doesn't move
    // when they move the finger on the screen while touching it
    // when the user stops touching the screen
    // when a touch is cancelled, for example when the user moves their finger outside of the screen.
}

