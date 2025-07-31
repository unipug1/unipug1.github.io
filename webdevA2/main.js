//target all elements to save to constants
const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector("#page4btn");
const page5btn = document.querySelector("#page5btn");
var allpages = document.querySelectorAll(".page");

//select all subtopic pages
function hideall() { //function to hide all pages
    for (let onepage of allpages) { //go through all subtopic pages
        onepage.style.display = "none"; //hide it
    }
}

function show(pgno) { //function to show selected page no
    hideall();
    //select the page based on the parameter passed in
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block"; //show the page
}

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
    show(1);
});
page2btn.addEventListener("click", function () {
    show(2);
});
page3btn.addEventListener("click", function () {
    show(3);
});
page4btn.addEventListener("click", function () {
    show(4);
});
page5btn.addEventListener("click", function () {
    show(5);
});
hideall();

/*JS for hamMenu */
const menuBtn = document.querySelector("#menuBtn");
const menuItemsList = document.querySelector("nav ul");
menuBtn.addEventListener("click", toggleMenus);
function toggleMenus() { /*open and close menu*/
    //if menuItemsList dont have the class "menuShow", add it, else remove it
    menuItemsList.classList.toggle("menuShow");
    //if menu is showing (has the class “menuShow”)
    if (menuItemsList.classList.contains("menuShow")) {
        menuBtn.innerHTML = "Close Menu"; //change button text to chose menu
    } else { //if menu NOT showing
        menuBtn.innerHTML = "Open Menu"; //change button text open menu
    }
}

// JS for img slider for equipment
const slides = document.querySelectorAll(".slides img");
const dots = document.querySelectorAll(".dot");
let slideIndex = 0;
let sliderIntervalId = null;

document.addEventListener("DOMContentLoaded", initialiseSlider);

function initialiseSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        sliderIntervalId = setInterval(nextSlide, 5000);
    }
}

function hideSlide(slide) {
    slide.classList.remove("displaySlide");
}

function hideDot(dot) {
    dot.classList.remove("active");
}

function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0;
    }
    else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(hideSlide);
    dots.forEach(hideDot);
    slides[slideIndex].classList.add("displaySlide");
    dots[slideIndex].classList.add("active");
}

function prevSlide() {
    clearInterval(sliderIntervalId);
    slideIndex = slideIndex - 1;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex = slideIndex + 1;
    showSlide(slideIndex);
}

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// accordion js code
const accordionHeaders = document.querySelectorAll(".accordion-header");

for (var i = 0; i < accordionHeaders.length; i++) {
    accordionHeaders[i].addEventListener("click", function () {
        const accordionItem = this.parentElement;
        const accordionContent = accordionItem.querySelector(".accordion-content");

        accordionContent.classList.toggle("active");

        if (accordionContent.classList.contains("active")) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }
        else {
            accordionContent.style.maxHeight = 0;
        }
    });
}

/* quiz */
const submitBtn = document.querySelector("#submitBtn");
const resetQuizBtn = document.querySelector("#resetQuizBtn");
submitBtn.addEventListener("click", checkAns);
resetQuizBtn.addEventListener("click", resetQuiz);
const scoreBox = document.querySelector("#scoreBox");
var q1, q2, q3, q4, q5, score = 0;

function resetQuiz() {
    scoreBox.innerHTML = "Not submitted";

    var quizAnswers = document.querySelectorAll("input[type='radio']:checked");
    for (let i = 0; i < quizAnswers.length; i++) {
        quizAnswers[i].checked = false;
    }

    score = 0;
}

function checkAns() {
    score = 0;

    q1 = document.querySelector("input[name='q1']:checked").value;
    console.log(q1);
    if (q1 == "10") {
        score++;
    }

    q2 = document.querySelector("input[name='q2']:checked").value;
    console.log(q2);
    if (q2 == "Spare") {
        score++;
    }

    q3 = document.querySelector("input[name='q3']:checked").value;
    console.log(q3);
    if (q3 == "Strike") {
        score++;
    }

    q4 = document.querySelector("input[name='q4']:checked").value;
    console.log(q4);
    if (q4 == "10") {
        score++;
    }

    q5 = document.querySelector("input[name='q5']:checked").value;
    console.log(q5);
    if (q5 == "300") {
        score++;
    }

    scoreBox.innerHTML = "Score: " + score;
}

/* js for bowling game */
const ball = document.getElementById("ball");
const laneArea = document.getElementById("lane");
const ballGuide = document.getElementById("guide");
const message = document.getElementById("message");
const controls = document.getElementById("controls");
const bowlingAudio = new Audio("audio/bowling_strike.mp3");
const pinsWrapper = document.getElementById('pins-wrapper');

function generatePins() {
    const layout = [4, 3, 2, 1];

    for (let i = 0; i < layout.length; i++) {
        var row = document.createElement('div');
        var count = layout[i];
        row.classList.add("row");

        for (let j = 0; j < count; j++) {
            var pin = document.createElement('div');
            pin.classList.add("pin");

            row.appendChild(pin);
        }

        pinsWrapper.appendChild(row);
    }
}

let ball_drag = false;

let ball_start_x = 0;
let ball_start_y = 0;
let ball_end_x = 0;
let ball_end_y = 0;
let force = 0;

let rollInterval = null;

function resetGame() {
    pinsWrapper.innerHTML = '';

    ball.style.top = "400px";
    ball.style.left = "calc(50% - 30px)";
    ball.classList.remove("roll");

    ballGuide.style.top = "400px";
    ballGuide.style.left = "calc(50% - 5px)";
    ballGuide.style.height = "10px";
    ballGuide.style.transform = "none";

    const pins = document.querySelectorAll(".pin");
    for (let i = 0; i < pins.length; i++) {
        pins[i].classList.remove("fall");
        pins[i].classList.remove("fall-left");
        pins[i].classList.remove("fall-right");
    }

    message.classList.add("hidden");

    if (rollInterval) {
        clearInterval(rollInterval);
        rollInterval = null;
    }
}

function handleGrab(event) {
    event.preventDefault();
    ball_drag = true;
    ball_start_x = event.clientX;
    ball_start_y = event.clientY;
}

function handleDragBall(event) {
    if (!ball_drag) {
        return;
    }

    event.preventDefault();

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    ball.style.top = mouseY - 30 + 'px';
    ball.style.left = mouseX - 30 + 'px';

    ball_end_x = mouseX;
    ball_end_y = mouseY;

    adjustGuide();
}

function handleThrowBall() {
    ball_drag = false;
    let ballMissed = false;

    let { angle_rad } = angleCalc();

    rollInterval = setInterval(function () {
        ball.style.top = parseInt(ball.style.top) - Math.cos(angle_rad) * 10 + 'px';
        ball.style.left = parseInt(ball.style.left) - Math.sin(angle_rad) * 10 + 'px';

        const laneRect = laneArea.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        // Check if ball is out of bounds (left or right side of lane)
        const ballCenterX = ballRect.left + ballRect.width / 2;
        if (ballCenterX < laneRect.left || ballCenterX > laneRect.right) {
            ballMissed = true;
            clearInterval(rollInterval);
            ball.classList.remove("roll");
            message.innerHTML = "Miss!";
            message.classList.remove("hidden");
            return;
        }

        // Check if ball reached the pins area (Y position)
        const pinsWrapperRect = pinsWrapper.getBoundingClientRect();

        if (ballRect.top <= pinsWrapperRect.top + 20) {
            clearInterval(rollInterval);
            ball.classList.remove("roll");

            if (!ballMissed) {
                // Calculate approximate pins area based on pin size and layout
                // Since we have 4 pins in the back row with margins, estimate the actual pins width
                const pinWidth = 30;
                const pinMargin = 5; 
                const maxPinsInRow = 4;
                const estimatedPinsWidth = (pinWidth * maxPinsInRow) + (pinMargin * 2 * maxPinsInRow);

                // Center the pins area within the lane
                const laneCenterX = laneRect.left + laneRect.width / 2;
                const pinsLeft = laneCenterX - (estimatedPinsWidth / 2);
                const pinsRight = laneCenterX + (estimatedPinsWidth / 2);

                // Check if ball hit the actual pins area
                if (ballCenterX >= pinsLeft && ballCenterX <= pinsRight) {
                    // Ball hit the pins - make them fall
                    const pins = document.querySelectorAll(".pin");
                    for (let i = 0; i < pins.length; i++) {
                        // Alternate between fall-left and fall-right for variety
                        if (i % 2 === 0) {
                            pins[i].classList.add("fall-left");
                        } else {
                            pins[i].classList.add("fall-right");
                        }
                    }
                    message.innerHTML = "Strike!";
                    bowlingAudio.play();
                    message.classList.remove("hidden");
                }
                // when ball misses the pins
                else {
                    message.innerHTML = "Miss!";
                    message.classList.remove("hidden");
                }
            }
        }
    }, 2000 / force);

    ball.classList.add("roll");
}

function adjustGuide() {
    let { adj, angle_rad } = angleCalc();
    ballGuide.style.height = adj + 'px';
    ballGuide.style.transform = ballGuide.style.transform = "perspective(100px) rotate(" + (-angle_rad) + "rad)";
}

function angleCalc() {
    const adj = ball_end_y - ball_start_y;
    const opp = ball_end_x - ball_start_x;
    const tan = opp / adj;
    const angle_rad = Math.atan(tan);

    force = Math.sqrt(Math.pow(opp, 2) + Math.pow(adj, 2));

    const cal = {
        adj,
        angle_rad
    };

    return cal;
}

ball.addEventListener('pointerdown', handleGrab);
ball.addEventListener('pointerup', handleThrowBall);
document.addEventListener('pointermove', handleDragBall);
controls.addEventListener('click', function (event) {
    if (event.target.id === "spawnBtn") {
        generatePins();
    }
    if (event.target.id === "resetBtn") {
        resetGame();
    }
});

/* full screen for desktop */
const btnFS = document.querySelector("#btnFS");
const btnWS = document.querySelector("#btnWS");

btnFS.addEventListener("click", enterFullScreen);
btnWS.addEventListener("click", exitFullScreen);

function enterFullScreen() { // called by user generated event
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    }
    else if (document.documentElement.mozRequestFullScreen) { // firefox
        document.documentElement.mozRequestFullScreen();
    }
    else if (document.documentElement.webkitRequestFullScreen) { // chrome, safari, opera
        document.documentElement.webkitRequestFullScreen();
    } 
    else if (document.documentElement.msRequestFullScreen) { // IE, edge
        document.documentElement.msRequestFullScreen();
    }
}

function exitFullScreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) { // firefox
        document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullScreen) { // chrome, safari
        document.webkitExitFullScreen();
    }
    else if (document.msExitFullScreen) { // IE, edge
        document.msExitFullScreen();
    }
}
