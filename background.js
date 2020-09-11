
// setTimeout(() => {
//     const buttons = document.querySelectorAll('button');
//     console.log("Running")
//     const refreshButtons = Array.prototype.filter.call(buttons, button => button.innerText === 'REFRESH');
//     refreshButtons.forEach(refreshButton => refreshButton.click())
// }, 3000);
let i = 0;

const minuteToMilliSeconds = (minute) => Math.floor(minute * 60_000);
const minuteArrayToMilliSecondsArray = minutesArray => minutesArray.map(minuteToMilliSeconds)
const generateRandomNumberWithinRange = (min, max) => () => Math.random() * (max - min) + min;
const generateRandomArray = (length, min, max) => Array.from(new Array(length), generateRandomNumberWithinRange(min, max));
let randomPick = (array) => {
    return array[Math.floor(Math.random() * array.length)]
}

// initial values for buttonText and array
const buttonText = "REFRESH";
// each refresh of the browser you get different intervals
const finalArrayInMilliSeconds = minuteArrayToMilliSecondsArray(generateRandomArray(10, 10, 30)) // size of array, min and max minutes
console.log(finalArrayInMilliSeconds.map(x => x / 60_000))
// Look for all the button elements and click the ones with buttonText as their innertext
const findButtonAndClick = (buttonText) => {
    const buttons = document.querySelectorAll('button');
    console.log("Running")
    const refreshButtons = Array.prototype.filter.call(buttons, button => button.innerText.toLowerCase() === buttonText.toLowerCase());
    refreshButtons.forEach(refreshButton => refreshButton.click())
    console.log(`${buttonText} buttons are clicked.`)
}


// recursively call setTimeout with different time intervals and click the button
const loopTimeOut = (buttonText, finalArrayInMilliSeconds) => setTimeout(() => {
    // checking if there is a memory leak. TODO: Remove after testing
    console.trace(`Stack Trace ${++i}`)
    findButtonAndClick(buttonText);
    loopTimeOut(buttonText, finalArrayInMilliSeconds)
    return;
}, randomPick(finalArrayInMilliSeconds))

// let's kick start our process
loopTimeOut(buttonText, finalArrayInMilliSeconds)

