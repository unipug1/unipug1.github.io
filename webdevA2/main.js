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
// selects all images in the image slider and dots 
const slides = document.querySelectorAll(".slides img");
const dots = document.querySelectorAll(".dot");

// slide index and interval id for automatic sliding
let slideIndex = 0;
let sliderIntervalId = null;

// initialise slider when DOM content is loaded
document.addEventListener("DOMContentLoaded", initialiseSlider);

function initialiseSlider() {
    // only start slider if there are slides available
    if (slides.length > 0) {
        // show first slide and automatic sliding occurs every 5 seconds
        slides[slideIndex].classList.add("displaySlide");
        sliderIntervalId = setInterval(nextSlide, 5000);
    }
}

// hide slide by removing displaySlide class
function hideSlide(slide) {
    slide.classList.remove("displaySlide");
}

// hide dot by removing active class
function hideDot(dot) {
    dot.classList.remove("active");
}

// show slide at certain index with wrap-around logic
function showSlide(index) {

    // wrap around to first slide if index exceeds number of slides 
    if (index >= slides.length) {
        slideIndex = 0;
    }
    // wrap around to last slide if index is negative 
    else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    // hide all slides and dots
    slides.forEach(hideSlide);
    dots.forEach(hideDot);
    // show active slide and corresponding dot 
    slides[slideIndex].classList.add("displaySlide");
    dots[slideIndex].classList.add("active");
}

// show previous slide
function prevSlide() {
    slideIndex = slideIndex - 1;
    showSlide(slideIndex);
}

// show next slide 
function nextSlide() {
    slideIndex = slideIndex + 1;
    showSlide(slideIndex);
}

// select navigation buttons for slides
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// add click event listeners to buttons to manually navigate image slider 
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// accordion js code
// select all elements with accordion-header class
const accordionHeaders = document.querySelectorAll(".accordion-header");

// loop through each accordion header 
for (var i = 0; i < accordionHeaders.length; i++) {
    // add click event listener to each header 
    accordionHeaders[i].addEventListener("click", function () {
        // get parent element of clicked header which is the accordion item
        const accordionItem = this.parentElement;
        // find accordion content within the accordion item
        const accordionContent = accordionItem.querySelector(".accordion-content");
        // toggle active class to expand or collapse accordion content 
        accordionContent.classList.toggle("active");
        // if accordion content is expanded - set maxHeight to scrollHeight to show content
        if (accordionContent.classList.contains("active")) {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
        }
        // if collapsed - set maxHeight to 0 to hide content
        else {
            accordionContent.style.maxHeight = "0px";
        }
    });
}

/* quiz */
const submitBtn = document.querySelector("#submitBtn");
const resetQuizBtn = document.querySelector("#resetQuizBtn");
const scoreBox = document.querySelector("#scoreBox");

submitBtn.addEventListener("click", checkAns);
resetQuizBtn.addEventListener("click", resetQuiz);

var q1, q2, q3, q4, q5, score = 0;

function resetQuiz() {
    // reset score display text
    scoreBox.innerHTML = "Not submitted";
    // select all checked radio inputs and uncheck them
    var quizAnswers = document.querySelectorAll("input[type='radio']:checked");
    for (let i = 0; i < quizAnswers.length; i++) {
        quizAnswers[i].checked = false;
    }
    // reset score to 0
    score = 0;
}

function checkAns() {
    score = 0; // reset score to 0 and check ans and give score if correct
    // read value of selected radio button for q1
    q1 = document.querySelector("input[name='q1']:checked").value;
    console.log(q1); // check if q1 value is retrieved
    if (q1 == "10") {
        score++;
    }
    // read value of selected radio button for q2
    q2 = document.querySelector("input[name='q2']:checked").value;
    console.log(q2); // check if q2 value is retrieved
    if (q2 == "Spare") {
        score++;
    }
    // read value of selected radio button for q3
    q3 = document.querySelector("input[name='q3']:checked").value;
    console.log(q3); // check if q3 value is retrieved
    if (q3 == "Strike") {
        score++;
    }
    // read value of selected radio button for q4
    q4 = document.querySelector("input[name='q4']:checked").value;
    console.log(q4); // check if q4 value is retrieved
    if (q4 == "10") {
        score++;
    }
    // read value of selected radio button for q5
    q5 = document.querySelector("input[name='q5']:checked").value;
    console.log(q5); // check if q5 value is retrieved
    if (q5 == "300") {
        score++;
    }
    // update the string in score box to show total score 
    scoreBox.innerHTML = "Score: " + score;
}

/* js for bowling game */
// select elements used for bowling game
const ball = document.getElementById("ball");
const laneArea = document.getElementById("lane");
const ballGuide = document.getElementById("guide");
const message = document.getElementById("message");
const controls = document.getElementById("controls");
const bowlingAudio = new Audio("audio/bowling_strike.mp3");
const pinsWrapper = document.getElementById('pins-wrapper');

// generate bowling pins in a 4-3-2-1 formation, using dynamic content
function generatePins() {
    const layout = [4, 3, 2, 1]; // number of pins in each row

    // create each row of pins
    for (let i = 0; i < layout.length; i++) {
        // create new div element to represent row 
        var row = document.createElement('div');
        var count = layout[i];
        row.classList.add("row");

        // add pins to current row 
        for (let j = 0; j < count; j++) {
            // create new div element to represent pin
            var pin = document.createElement('div');
            // add pin class to apply style
            pin.classList.add("pin");
            // add pin div as child of current row div
            row.appendChild(pin);
        }
        // add row div to pin wrapper
        pinsWrapper.appendChild(row);
    }
}

// ball dragging control and throw variables
let ball_drag = false;
let ball_start_x = 0;
let ball_start_y = 0;
let ball_end_x = 0;
let ball_end_y = 0;
let force = 0;
let rollInterval = null;

// reset game to initial state
function resetGame() {
    pinsWrapper.innerHTML = ''; // remove all pins
    // reset ball position
    ball.style.top = "400px";
    ball.style.left = "calc(50% - 30px)";
    ball.classList.remove("roll");
    // reset ball guide position
    ballGuide.style.top = "400px";
    ballGuide.style.left = "calc(50% - 5px)";
    ballGuide.style.height = "10px";
    ballGuide.style.transform = "none";
    // remove falling animation classes from pins
    const pins = document.querySelectorAll(".pin");
    for (let i = 0; i < pins.length; i++) {
        pins[i].classList.remove("fall");
        pins[i].classList.remove("fall-left");
        pins[i].classList.remove("fall-right");
    }
    // hide message
    message.classList.add("hidden");
    // stop ball rolling
    if (rollInterval) {
        clearInterval(rollInterval);
        rollInterval = null;
    }
}

// when user grabs ball
function handleGrab(event) {
    event.preventDefault(); // stop default browser behaviour eg scrolling so ball dragging works 
    ball_drag = true;
    ball_start_x = event.clientX; // for x position of pointer(viewport coords)
    ball_start_y = event.clientY; // for y position of pointer(viewport coords)
}

function handleDragBall(event) {
    if (!ball_drag) {
        return; // exit if ball is not dragged
    }

    event.preventDefault();

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // move ball to follow pointer and offset by 30px to center it under cursor
    ball.style.top = mouseY - 30 + 'px';
    ball.style.left = mouseX - 30 + 'px';
    // store position for calculations eg speed
    ball_end_x = mouseX;
    ball_end_y = mouseY;

    // update ball guide showing direction of ball
    adjustGuide();
}

function handleThrowBall() {
    // stop drag state when ball is thrown 
    ball_drag = false;
    let ballMissed = false;
    // get angle of throw from the calculation function
    let { angle_rad } = angleCalc();

    // start interval timer to animate ball movement 
    rollInterval = setInterval(function () {
        // update position of ball along throw angle by 10 pxiels per frame
        ball.style.top = parseInt(ball.style.top) - Math.cos(angle_rad) * 10 + 'px';
        ball.style.left = parseInt(ball.style.left) - Math.sin(angle_rad) * 10 + 'px';

        // get bounding rectangles for lane and ball for collision checks(to provide info about size and position of element relative to viewport)
        const laneRect = laneArea.getBoundingClientRect();
        const ballRect = ball.getBoundingClientRect();

        // get x coordinate of center of ball
        const ballCenterX = ballRect.left + ballRect.width / 2;

        // check if ball goes out of the left or right side of lane
        if (ballCenterX < laneRect.left || ballCenterX > laneRect.right) {
            ballMissed = true;
            clearInterval(rollInterval); // stop animation
            ball.classList.remove("roll"); // remove roll class
            message.innerHTML = "Miss!";
            message.classList.remove("hidden"); // make message visible
            return; // exit animation function
        }

        // check if ball reached the y position of pins area
        const pinsWrapperRect = pinsWrapper.getBoundingClientRect();

        // check if ball reached pin area (near top of pin container)
        if (ballRect.top <= pinsWrapperRect.top + 20) {
            clearInterval(rollInterval); // stop rolling animation
            ball.classList.remove("roll");

            if (!ballMissed) {
                // estimate pins area based on pin size and layout
                const pinWidth = 30; // from css
                const pinMargin = 5; // from css
                const maxPinsInRow = 4;
                const estimatedPinsWidth = (pinWidth * maxPinsInRow) + (pinMargin * 2 * maxPinsInRow);

                // calculate center x position of lane
                const laneCenterX = laneRect.left + laneRect.width / 2;
                // calculate left and right bounds of pin area 
                const pinsLeft = laneCenterX - (estimatedPinsWidth / 2);
                const pinsRight = laneCenterX + (estimatedPinsWidth / 2);

                // check if center of ball hits within area of pins
                if (ballCenterX >= pinsLeft && ballCenterX <= pinsRight) {
                    // if ball hits pins - trigger fall animation
                    const pins = document.querySelectorAll(".pin");
                    for (let i = 0; i < pins.length; i++) {
                        // alternate falling animation direction
                        if (i % 2 === 0) {
                            pins[i].classList.add("fall-left"); // add fall-left animation class
                        } else {
                            pins[i].classList.add("fall-right"); // add fall-right animation class
                        }
                    }
                    message.innerHTML = "Strike!";
                    bowlingAudio.play(); // play audio
                    message.classList.remove("hidden");
                }
                // when ball misses the pins
                else {
                    message.innerHTML = "Miss!";
                    message.classList.remove("hidden");
                }
            }
        }
    }, 2000 / force); // animation speed based on force
    // add ball rolling animation
    ball.classList.add("roll");
}

// adjust angle and length of ball guide based on drag direction
function adjustGuide() {
    let { adj, angle_rad } = angleCalc(); // get length and angle from calculation function
    ballGuide.style.height = adj + 'px'; 
    ballGuide.style.transform = "perspective(100px) rotate(" + (-angle_rad) + "rad)"; // rotate guide to match throw angle
}

// calculate angle of ball throw and strength (force)
function angleCalc() {
    const adj = ball_end_y - ball_start_y; // vertical distance dragged 
    const opp = ball_end_x - ball_start_x; // horizontal distance dragged
    const tan = opp / adj; // tangent of angle
    const angle_rad = Math.atan(tan); // angle in radians 

    // use distance formula (euclidean) to calculate force (speed)
    force = Math.sqrt(Math.pow(opp, 2) + Math.pow(adj, 2));

    const cal = {
        adj,
        angle_rad
    };

    return cal;
}

// event listener for user interacting with ball
ball.addEventListener('pointerdown', handleGrab);
ball.addEventListener('pointerup', handleThrowBall);
document.addEventListener('pointermove', handleDragBall);
// event delegation on controls container to spawn pins or reset game
controls.addEventListener('click', function (event) {
    if (event.target.id === "spawnBtn") { // if spawn pins button clicked
        generatePins();
    }
    if (event.target.id === "resetBtn") { // if reset game button clicked
        resetGame();
    }
});

/* full screen */
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
