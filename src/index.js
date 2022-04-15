document.querySelector('#cat').onclick = start;

let jumpCount = 0;
let walkCount = 0;

function getJumpCount(){
    ++jumpCount;
    return `стрибати ${jumpCount}`;
}
function getWalkCount(){
    ++walkCount;
    return `ходити ${walkCount}`;
}

function start() {
    document.querySelector('#message').innerHTML = ""
    const result = window.confirm("Що будемо робити? \n ok - стрибати \n cancel - ходити");
    if (result) {
        const answer = prompt("Як високо? \nВведіть від 10 до 50");
        if (checkAnswer(+answer)) {
            move(catJump, 200, +answer, getJumpCount());
        }
    } else {
        const answer = prompt("Як далеко? \nВведіть від 10 до 50");
        if (checkAnswer(+answer)) {
            move(catWalk, 20, +answer, getWalkCount());
        }
    }
}

function checkAnswer(number) {
    if (!isNaN(number) && 10 <= number && number <= 50) {
        return true;
    } else if (!isNaN(number) && 10 > number) {
        alert("Це надто мало для мене!");
    } else if (!isNaN(number) && number > 50) {
        alert("Це надто багато для мене!");
    } else {
        alert("Це не число!");
    }
    return false;
}

function move(functionAction, start, step, count) {
    let i = start;
    let move = 1;

    // loops with intervals 20 milliseconds
    let timer = setInterval(() => {

        // function catJump or catWalk
        functionAction(i, start, start + (step * 4))

        // moves from start to max and back with a step 1
        i = i + move;
        if (i > start + (step * 4)) {
            move = -1;
        } else if (i < start) {
            move = 1;
            clearInterval(timer);
            document.querySelector('#message').innerHTML = `Я виконав задачу ${count} раз(и).`;
        }
    }, 20)
}

function catJump(i, start, max) {
    const cat = document.getElementById("cat");
    // move img
    cat.style.top = start - (i - start) + 'px';
    // if 'i' reaches 'max' or 'start' changes 'rotation'
    if (i >= max) {
        cat.style.transform = 'rotate(60deg)';
    } else if (i <= start) {
        cat.style.transform = 'rotate(0deg)';
    }
    return i
}

function catWalk(i, start, max) {
    const cat = document.getElementById('cat');
    // move img
    cat.style.left = i + 'px';
    // if 'i' reaches 'max' or 'start' changes 'rotateY'
    if (i >= max) {
        cat.style.transform = 'rotateY(180deg)';
    } else if (i <= start) {
        cat.style.transform = 'rotateY(0deg)';
    }
    return i
}
