const day = document.querySelector(".day_input")
const month = document.querySelector(".month_input")
const year = document.querySelector(".year_input")
const submitButton = document.querySelector("button")
const years = document.querySelector(".years span")
const months = document.querySelector(".months span")
const days = document.querySelector(".days span")

submitButton.addEventListener('click', (e) => {
  //fazer os calculos necessarios
  e.preventDefault();
  calcResponse();
  clearFields();
})

function calcResponse() {
  
  const birthDay = day.value;
  const birthMonth = month.value;
  const birthYear = year.value;

  const actualDate = new Date();

  let actualDay = actualDate.getDate();
  let actualMonth = actualDate.getMonth() + 1;
  let actualYear = actualDate.getFullYear();
  const monthsOfTheYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if(birthDay > actualDay)
  {
    actualDay += monthsOfTheYear[actualMonth - 1];
    actualMonth -= 1;
  }

  if(birthMonth > actualMonth)
  {
    actualMonth += 12;
    actualYear -= 1;
  }

  let resultDays = actualDay - birthDay;
  let resultMonths = actualMonth - birthMonth;
  let resultYears = actualYear - birthYear;

  years.innerHTML = resultYears;
  months.innerHTML = resultMonths;
  days.innerHTML = resultDays;
}

function clearFields() {
  year.value = "";
  month.value = "";
  day.value = "";
  day.focus();
}