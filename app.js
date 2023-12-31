const startNumber = 4;


// function for flipping animation
function flip(flipCard, newNumber) {
    const topHalf = flipCard.querySelector(".top");
    const startNumber = parseInt(topHalf.textContent);

    if (newNumber === startNumber) return


    const bottomHalf = flipCard.querySelector(".bottom");
    const topFlip = document.createElement("div");
    topFlip.classList.add("top-flip");
    const bottomFlip = document.createElement("div");
    bottomFlip.classList.add("bottom-flip");

    if (startNumber < 9 && startNumber > 1) {
        bottomFlip.textContent = `0${newNumber}`;
        bottomHalf.textContent = `0${startNumber}`;
        topFlip.textContent = `0${startNumber}`;
    } else {
        bottomFlip.textContent = newNumber;
        topFlip.textContent = startNumber;
        bottomHalf.textContent = startNumber;
    }

    topFlip.addEventListener("animationstart", e => {
        if (startNumber <= 10 && startNumber >= 1) {
            topHalf.textContent = `0${newNumber}`
        } else {
            topHalf.textContent = newNumber;
        }
    });

    topFlip.addEventListener("animationend", e => {
        if (startNumber <= 10 && startNumber >= 1) {
            bottomHalf.textContent = `0${newNumber}`
        } else {
            bottomHalf.textContent = newNumber;
        }
        topFlip.remove();
    });

    bottomFlip.addEventListener("animationend", e => {
        bottomFlip.remove();
    });

    flipCard.append(topFlip, bottomFlip);
}

function flipAllCards(time) {

    const seconds = time % 60;
    const minutes = Math.floor((time / 60) % 60);
    const hours = Math.floor((time / 3600) % 24 - 2);
    const days = Math.floor(time / 86400);

    flip(document.querySelector("[data-seconds"), seconds);
    flip(document.querySelector("[data-minutes]"), minutes);
    flip(document.querySelector("[data-hours]"), hours);
    flip(document.querySelector("[data-days"), days);
}


const countToDate = new Date("2024-01-01");
let previousTimeBetweenDates;
setInterval(() => {
    const currentDate = new Date();
    const timeBetweenDates = Math.ceil((countToDate - currentDate) / 1000);

    if (previousTimeBetweenDates != timeBetweenDates) {
        flipAllCards(timeBetweenDates);
    }

    previousTimeBetweenDates = timeBetweenDates;
}, 250);

