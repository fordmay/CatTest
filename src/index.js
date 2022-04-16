function activateCat(id) {
    const cat = document.querySelector(id)
    cat.jumpCount = 0;
    cat.walkCount = 0;

    cat.activity = 0;
    cat.distance = 0;

    cat.maxPositionLeft = 0;
    cat.maxPositionTop = 0;
    cat.startPositionLeft = cat.offsetLeft;
    cat.startPositionTop = cat.offsetTop;

    cat.checkNumber = function (number) {
        if (isNaN(number)) {
            alert("Це не число!");
            return false;
        }
        if (10 > number) {
            alert("Це надто мало для мене!");
            return false;
        }
        if (number > 50) {
            alert("Це надто багато для мене!");
            return false;
        }
        return true
    }
    cat.checkActivity = function (activityName) {
        const normalActivityName = activityName.toLowerCase()
        if (normalActivityName === 'гуляти') {
            return 0;
        }
        if (normalActivityName === 'стрибати') {
            return 1;
        }
        return false;
    }
    cat.getActivity = function () {
        while (true) {
            const result = prompt("Що будемо робити? \n стрибати або гуляти");
            if (cat.checkActivity(result) !== false) {
                cat.activity = cat.checkActivity(result);
                break;
            }
        }
    }
    cat.getDistance = function () {
        while (true) {
            const result = parseInt(prompt(`Як ${cat.activity === 0 ? 'далеко': 'високо'}? \nВведіть від 10 до 50`));
            if (cat.checkNumber(result)) {
                cat.distance = result;
                cat.maxPositionLeft = cat.startPositionLeft + cat.distance;
                cat.maxPositionTop = cat.startPositionTop + cat.distance;
                break;
            }
        }
    }
    cat.catWalk = function (i) {
        cat.style.left = i + 'px';
        if (i >= cat.maxPositionLeft) {
            cat.style.transform = 'rotateY(180deg)';
        } else if (i <= cat.startPositionLeft) {
            cat.style.transform = 'rotateY(0deg)';
        }
        return i;
    }
    cat.catJump = function (i) {
        cat.style.top = cat.startPositionTop - (i - cat.startPositionTop) + 'px';
        if (i >= cat.maxPositionTop) {
            cat.style.transform = 'rotate(60deg)';
        } else if (i <= cat.startPositionTop) {
            cat.style.transform = 'rotate(0deg)';
        }
        return i
    }
    cat.moveJump = function () {
        let move = 1;
        let i = cat.startPositionTop;
        let timer = setInterval(() => {
            cat.catJump(i);
            i = i + move;
            if (i > cat.maxPositionTop) {
                move = -1;
            } else if (i < cat.startPositionTop) {
                clearInterval(timer);
                cat.jumpCount++;
                document.querySelector('#message').innerHTML = `Я виконав задачу ${cat.jumpCount} раз(и).`;
            }
        }, 20)
    }
    cat.moveWalk = function () {
        let move = 1;
        let i = cat.startPositionLeft;
        let timer = setInterval(() => {
            cat.catWalk(i);
            i = i + move;
            if (i > cat.maxPositionLeft) {
                move = -1;
            } else if (i < cat.startPositionLeft) {
                clearInterval(timer);
                cat.walkCount++;
                document.querySelector('#message').innerHTML = `Я виконав задачу ${cat.walkCount} раз(и).`;
            }
        }, 20)
    }
    return cat;
}

cat1 = activateCat('#cat');
cat1.onclick = () => {
    cat1.getActivity();
    cat1.getDistance();
    if (cat1.activity === 0) {
        cat1.moveWalk();
    } else if (cat1.activity === 1) {
        cat1.moveJump();
    }
}