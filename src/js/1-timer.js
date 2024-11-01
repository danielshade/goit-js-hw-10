"use strict"
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
        if (Date.now() >= selectedDates[0]) {
            inactiveStartBtn()
            iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topCenter',
                color: 'red',
                messageColor: "black",
                close: false,
                timeout: 4000,
                progressBar: false
            });
        }
        else {
            startBtn.style.backgroundColor = "#4e75ff";
            startBtn.style.color = "#fff";
            startBtn.style.pointerEvents = "auto";
            userSelectedDate = selectedDates[0];
            startBtn.disabled = false
            }
    },
    
};

flatpickr("#datetime-picker", options);



const startBtn = document.querySelector("button[data-start]");
startBtn.addEventListener("click", timer)
const input = document.querySelector('#datetime-picker');


function inactiveStartBtn() {
    startBtn.style.backgroundColor = "#cfcfcf";
    startBtn.style.color = "#989898";
    startBtn.style.pointerEvents = "none";
}


let intervalId = null;

function timer() {
    inactiveStartBtn()
    input.disabled = true;  
    let endTimer = userSelectedDate.getTime();
    let startTimer = Date.now();
    let stopTimer = endTimer - startTimer;
    intervalId = setInterval(() => {
        stopTimer -= 1000
        convertMs(stopTimer);
        if (stopTimer < 1000) {
        iziToast.error({
            message: 'Timer has expired ',
            position: 'topCenter',
            color: 'green',
            messageColor: "black",
            close: false,
            timeout: 4000,
            progressBar: false
        });
            clearInterval(intervalId)
        }
    }, 1000);
    
}

const spanDays = document.querySelector('[data-days]');
const spanHours = document.querySelector('[data-hours]');
const spanMinutes = document.querySelector('[data-minutes]');
const spanSeconds = document.querySelector('[data-seconds]');



function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day).toString().padStart(2,'0');
    const hours = Math.floor((ms % day) / hour).toString().padStart(2,'0');
    const minutes = Math.floor(((ms % day) % hour) / minute).toString().padStart(2,'0');
    const seconds = Math.floor((((ms % day) % hour) % minute) / second).toString().padStart(2,'0');

    spanDays.textContent = `${days}`;
    spanHours.textContent = `${hours}`;
    spanMinutes.textContent = `${minutes}`;
    spanSeconds.textContent = `${seconds}`;
}
 