const display = document.getElementById('display');
const minusButton = document.querySelector('.minus');
const plusButton = document.querySelector('.plus');

//Initialize counter
let counter = 0;

//Function to update the display
function updateDisplay() {
  display.textContent = counter;
}

//Event listeners for minus button
minusButton.addEventListener('click', () => {
  counter--;
  updateDisplay();
});

//Event listeners for plus button
plusButton.addEventListener('click', () => {
  counter++;
  updateDisplay();
});

//display update
updateDisplay();