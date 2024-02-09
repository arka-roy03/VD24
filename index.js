var envelopeTop = document.getElementsByClassName('envelope-top')[0];
var letter = document.getElementsByClassName('letter')[0];

var buttons = document.getElementsByClassName('btn');
var startBtn = buttons[0], prevBtn = buttons[1], nextBtn = buttons[2], noBtn = buttons[3], yesBtn = buttons[4], stopBtn = buttons[5];

var text = document.getElementsByClassName('text')[0];
var sticker = document.getElementsByClassName('sticker')[0];
var question = document.getElementsByClassName('text')[1];
var errorAudio = new Audio('assets/audios/error.mp3');
var successAudio = new Audio('assets/audios/success.mp3');

let curr = 0, total = 20, noCount = 0, loopTimer;

function preloadAssets() {
    for(var i = 0; i <= 5 ; i++) {
        var image = document.createElement("img");
        image.setAttribute('src', `assets/hints/${i}.webp`);
        document.getElementsByClassName('preloading')[0].appendChild(image);
    }
    for(var i = 1; i <= 14 ; i++) {
        var image = document.createElement("img");
        image.setAttribute('src', `assets/stickers/${i}.webp`);
        document.getElementsByClassName('preloading')[0].appendChild(image);
    }
    var start = document.createElement("img");
    start.setAttribute('src', 'assets/stickers/start.webp');
    var end = document.createElement("img");
    end.setAttribute('src', 'assets/stickers/end.webp');
    document.getElementsByClassName('preloading')[0].appendChild(start);
    document.getElementsByClassName('preloading')[0].appendChild(end);
}

preloadAssets();

let texts = ["Chinki is getting ready for his date", "With bbddoolllllllllllllllllll", "This is their first time going out on valentines day", "They are so excited eeeeeeeee", "They went to a cafe, and took many cutiepie pictures", "Bbdoll had an iskrimgasm, and chinki just gazed at her in awe", "They were having a lot of fun", "Until suddenly!!!", "Bbdoll left chinki and went away", "And chinki could not help but cry an ocean", "Chinki's sleep finally breaks, as he realizes it was all a dream", "Chinki gets sad, still unable to go out with bbdoll on valentines day", "But chinki is still determined to go out with bbdoll", "So, he is asking"]

let hints = ["To open this top secret confidential document(from chinki to bbdoll) you must identify yourself.", "Hint 1: Chinki calls bbdoll this(but she hates it😭😭) - 1st Part", 'Hint 2: There is "ekta" in the middle, and the password does not have spaces. - 2nd part', "Hint 3: Bbdoll does this whenever she sees a catttyyyyyy - 3rd part", "Dhyet😡...eta type kor: shimuektamyao", "Yeeeeeeeeeee hiiiiiiiii bbdoollllllllllll"];

function writeText(element, text, index, last) {
    if(index === 0) {
        if(element === question) {
            yesBtn.style = "pointer-events: none"
            noBtn.style = "pointer-events: none"
        }
        prevBtn.style = "pointer-events: none"
        nextBtn.style = "pointer-events: none"
        element.textContent = "";
    }
    if(index < text.length) {
        // console.log(index);
        element.textContent += text.charAt(index);
        loopTimer = setTimeout(() => writeText(element, text, ++index, last), 50);
    }
    else {
        prevBtn.style = ""
        nextBtn.style = ""
        if(element === question) {
            yesBtn.style = ""
            noBtn.style = ""
        }
        clearTimeout(loopTimer);
        if(last) {
            loopTimer = setTimeout(() => writeText(question, "Bbdoll, will you be my valentine?", 0, false), 50);
        }
    }
}

function setContent() {
    // text.innerHTML = texts[curr-1]
    sticker.setAttribute('src', `assets/stickers/${curr}.webp`)
    writeText(text, texts[curr-1], 0, curr === texts.length);
}

function handlePrev() {
    curr--;
    // console.log(curr);
    setContent();
    if(curr === 1)
        prevBtn.classList.toggle('invisible')
    if(curr == texts.length - 1) 
        nextBtn.classList.toggle('invisible')
}

function handleNext() {
    curr++;
    // console.log(curr);
    setContent();
    if(curr === texts.length) {
        nextBtn.classList.toggle('invisible')
        prevBtn.classList.toggle('invisible')
        yesBtn.classList.toggle('invisible')
        noBtn.classList.toggle('invisible')
        question.classList.toggle('invisible')
        text.style.margin = '0.5rem 0'
        question.style.margin = '0.5rem 0'
        // writeText(question, "Bbdoll, will you be my valentine?", 0);
    }
    if(curr === 2)
        prevBtn.classList.toggle('invisible')
}

startBtn.addEventListener('click', () => {
    nextBtn.classList.toggle('invisible')
    startBtn.classList.toggle('invisible')
    handleNext();
})

prevBtn.addEventListener('click', handlePrev);

nextBtn.addEventListener('click', handleNext);

function danceAround() {
    noCount++;
    if(noCount === 1) {
        noBtn.innerHTML = "Huh..ebar r no boltei debona";
        noBtn.style.position = 'absolute';
    }
    noBtn.style.left = `${Math.ceil(Math.random() * 90)}%`;
    noBtn.style.top = `${Math.ceil(Math.random() * 90)}%`;
}

noBtn.addEventListener('mouseover', danceAround)

noBtn.addEventListener('click', danceAround)

yesBtn.addEventListener('click', () => {
    successAudio.loop = true;
    successAudio.play()
    text.classList.toggle('invisible')
    question.classList.toggle('invisible')
    document.getElementsByClassName('buttonsDiv')[0].classList.toggle('invisible')
    document.getElementsByClassName('greeting')[0].classList.toggle('invisible')
    sticker.setAttribute('src', 'assets/stickers/end.webp')
    document.getElementsByClassName('stickers')[0].style = 'padding: 0';
    document.getElementsByClassName('final-text')[0].classList.toggle('invisible')
    setTimeout(() => {
        stopBtn.classList.toggle('invisible')
    }, 10000)
})

stopBtn.addEventListener('click', () => {
    successAudio.pause();
    stopBtn.classList.toggle('invisible')
})

let count = 0;
var popupSticker = document.getElementsByClassName('popupSticker')[0];
var popupHeading = document.getElementsByClassName('popupHeading')[0]
var passwordElement = document.getElementsByClassName('passwordInput')[0];

function checkPassword() {
    let password = passwordElement.value;
    if(password.toLowerCase() === "shimuektamyao") {
        count = 5;
        successAudio.play();
        passwordElement.style = "display: none"
        document.getElementsByClassName('openBtn')[0].style = "display: none";
    }
    else {
        if(count !== 4)
            count++;
        errorAudio.play();
        passwordElement.classList.add("error");
        setTimeout(() => {
            passwordElement.classList.remove("error")
        }, 1500);
    }
    popupHeading.textContent = hints[count];
    popupSticker.setAttribute('src', `assets/hints/${count}.webp`);
    if(count === 5) {
        setTimeout(() => {
            location.href = "#";
            setTimeout(() => {
                envelopeTop.classList.add('topOpen');
                document.getElementsByClassName('open')[0].style = "display: none"
                setTimeout(() => letter.classList.add('out'), 1000);
            }, 500);
        }, 1000)
    }
}

document.getElementsByClassName('open')[0].addEventListener('click', () => {
    count = 0;
    console.log('reset')
    
    popupSticker.setAttribute('src', `assets/hints/${count}.webp`);
    popupHeading.textContent = hints[count];
    console.log('click')
    location.href = '#popup';

    errorAudio.play();
    errorAudio.pause();
    errorAudio.currentTime = 0;
    successAudio.play();
    successAudio.pause();
    successAudio.currentTime = 0;
    
})

document.getElementsByClassName('openBtn')[0].addEventListener('click', () => checkPassword());

passwordElement.addEventListener('keydown', (e) => {
    if(e.code === "Enter")
        checkPassword();
}) 