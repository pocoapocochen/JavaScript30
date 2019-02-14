const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const input = document.customForm; // if there is 'name' attribute in an element, then can write like this! 

let countdown; // to store setInterval function , so that can use clearInterval in it and directly pass it into clearInterval

function timer(sec) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now(); // old: (new Date()).getTime()
    const then = now + (sec * 1000);
    displayTimeLeft(sec);
    displayTimeEnd(then);

    countdown = setInterval(() => {
        const secLeft = Math.round((then - Date.now()) / 1000);

        // check when to stop
        if (secLeft < 0) {
            clearInterval(countdown);
            return;
        }

        // display
        displayTimeLeft(secLeft);
    }, 1000);
}

function displayTimeLeft(sec) {
    const min = Math.floor(sec / 60);
    const secRemain = sec % 60;
    const display = `${min}:${secRemain < 10 ? '0' : ''}${secRemain}`;
    timeLeft.textContent = display;
    document.title = display; // show on the webpage tob
}

function displayTimeEnd(sec) {
    const endTime = new Date(sec);
    const hour = endTime.getHours();
    const min = endTime.getMinutes();
    timeEnd.textContent = `Be Back at ${hour}:${min < 10 ? '0' : ''}${min}`;
}


function startTimer() {
    const seconds = parseInt(this.dataset.time); // convert string to number
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
input.addEventListener('submit', function(e) { 
    //can not use arrow funtion because 'this' will be point to 'window', https://zendev.com/2018/10/01/javascript-arrow-functions-how-why-when.html

    e.preventDefault();
    
    const min = this.minutes.value; 
    /* this: <form name="customForm" id="custom"></form> */
    /* this.minutes : <input type="text" name="minutes" placeholder="Enter Minutes"> */
    timer(min * 60);
    this.reset();
});
