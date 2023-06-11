// Form Element
const inputForm = document.querySelector(".calculator__input");

// INPUT ELEMENTS
const inputElements = document.querySelectorAll("input");
const inputDay = document.querySelector("#day");
const inputMonth = document.querySelector("#month");
const inputYear = document.querySelector("#year");

// Alerts Elements
const inputDayAlert = document.querySelector(".alert-day");
const inputMonthAlert = document.querySelector(".alert-month");
const inputYearAlert = document.querySelector(".alert-year");

// OUTPUT ELEMENTS
const outputDay = document.querySelector(".output-days");
const outputMonth = document.querySelector(".output-months");
const outputYear = document.querySelector(".output-years");

// Current Date
const today = new Date();
let currentDay = today.getDate();
let currentMonth = 1 + today.getMonth();
let currentYear = today.getFullYear();

inputDay.addEventListener("input", (e) => {
  if (+inputDay.value > 31) {
    addError(inputDayAlert);
    return;
  } else if (+inputDay.value <= 0) {
    addError(inputDayAlert);
    return;
  } else if (+inputDay.value === "") {
    removeError(inputDayAlert);
    return;
  } else {
    removeError(inputDayAlert);
    return;
  }
});

inputMonth.addEventListener("input", () => {
  if (+inputMonth.value > 12) {
    addError(inputMonthAlert);
    return;
  } else if (+inputMonth.value <= 0) {
    addError(inputMonthAlert);
    return;
  } else {
    removeError(inputMonthAlert);
    return;
  }
});

inputYear.addEventListener("input", (e) => {
  if (+inputYear.value > 2023) {
    addError(inputYearAlert);
    return;
  } else if (+inputYear.value < 1000) {
    addError(inputYearAlert);
    return;
  } else {
    removeError(inputYearAlert);
    return;
  }
});

inputForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let invalidity = [];

  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].value === "") {
      inputElements[i].parentElement.classList.add('error');
      inputElements[i].nextElementSibling.classList.add("showError");
      inputElements[i].nextElementSibling.innerText = `This field is required`;
      invalidity.push(false);
    } else if (
      inputElements[i].nextElementSibling.classList.contains("showError")
    ) {
      inputElements[i].parentElement.classList.add('error');
      invalidity.push(false);
    } else {
      inputElements[i].parentElement.classList.remove('error');
      inputElements[i].nextElementSibling.classList.remove("showError");
      invalidity.push(true);
    }
  }
  if (!invalidity.includes(false)) {
    calculateAge();
  } else {
    console.log(`I can't calculate this shit man`);
  }
});

// FUNCTIONS
function addError(time) {
  time.classList.add("showError");
  time.parentElement.classList.add('error');
  switch (time) {
    case inputDayAlert:
      time.innerText = `Must be a valid day`;
      break;

    case inputMonthAlert:
      time.innerText = `Must be a valid month`;
      break;

    case inputYearAlert:
      time.innerText = `Must be a valid year`;
      break;
  }
}

function removeError(time) {
  time.classList.remove("showError");
  time.parentElement.classList.remove('error');

}

function calculateAge() {
  // days of every month
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // if birth date is greater than current date
  // then do not count this month and add 30
  // to the date so as to subtract the date and
  // get the remaining days
  if (inputDay.value > currentDay) {
    currentDay = currentDay + month[inputMonth.value - 1];
    currentMonth = currentMonth - 1;
  }

  // if birth month exceeds current month, then do
  // not count this year and add 12 to the month so
  // that we can subtract and find out the difference
  if (inputMonth.value > currentMonth) {
    currentYear = currentYear - 1;
    currentMonth = currentMonth + 12;
  }

  // calculate date, month, year
  let calculatedDay = currentDay - inputDay.value;
  let calculatedMonth = currentMonth - inputMonth.value;
  let calculatedYear = currentYear - inputYear.value;

  if (calculatedDay > 31) {
    calculatedMonth++;
    let dayDiff = calculatedDay - 31;
    calculatedDay = dayDiff;
  } else if (calculatedMonth === 12) {
    calculatedYear++;
    calculatedMonth = 0;
  } else if (calculatedMonth > 12) {
    calculatedYear++;
    let monthDiff = calculatedMonth - 12;
    calculatedMonth = monthDiff;
  }

  // print the calculated age
  animateNumbers(outputDay, calculatedDay);
  animateNumbers(outputMonth, calculatedMonth);
  animateNumbers(outputYear, calculatedYear);
}

function animateNumbers(element, calculatedAge) {
  let step = 25;
  calculatedAge > 25 && (step = 20);
  calculatedAge > 50 && (step = 15);
  calculatedAge > 75 && (step = 10);
  calculatedAge > 100 && (step = 5);
  calculatedAge > 200 && (step = 1);

  let n = 0;
  if (calculatedAge === 0) {
    element.innerHTML = n;
  } else {
    let interval = setInterval(() => {
      n = n + 1;
      if (n === calculatedAge) {
        clearInterval(interval);
      }
      element.innerHTML = n;
    }, step);
  }
}