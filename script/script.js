const day = document.getElementById("day_input");
const month = document.getElementById("month_input");
const year = document.getElementById("year_input");

const inputs = document.querySelectorAll(".input");

const submitButton = document.querySelector("button");
const years = document.querySelector(".years span");
const months = document.querySelector(".months span");
const days = document.querySelector(".days span");

const monthsOfTheYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

inputs.forEach((input) => {
  input.addEventListener("blur", (e) => {
    //Tirar calc do valida pq toda vez que eu sair do campo ele faz o calculo
    valida(e.target);
    //console.log(e.target);
  });
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // esta validando um campo de cada vez, ou seja, se um campo passar, o calculo é feito normalmente

  inputs.forEach((input) => {
    valida(input);
    //valida(month);
    //valida(year);
  });
  calcResponse();
});

function calcResponse() {
  const birthDay = day.value;
  const birthMonth = month.value;
  const birthYear = year.value;

  const actualDate = new Date();

  let actualDay = actualDate.getDate();
  let actualMonth = actualDate.getMonth() + 1;
  let actualYear = actualDate.getFullYear();

  if (birthDay === "" || birthMonth === "" || birthYear === "") return;
  if (birthDay < 1 || birthDay > 31) return;
  if (birthMonth > 12 || birthMonth < 1) return;
  if (birthDay > monthsOfTheYear[birthMonth - 1]) return;
  if (
    birthDay >= actualDay &&
    birthMonth >= actualMonth &&
    birthYear >= actualYear
  )
    return;
  if (birthYear > actualYear) return;

  if (birthDay > actualDay) {
    actualDay += monthsOfTheYear[actualMonth - 1];
    actualMonth -= 1;
  }

  if (birthMonth > actualMonth) {
    actualMonth += 12;
    actualYear -= 1;
  }

  let resultDays = actualDay - birthDay;
  let resultMonths = actualMonth - birthMonth;
  let resultYears = actualYear - birthYear;

  years.innerHTML = resultYears;
  months.innerHTML = resultMonths;
  days.innerHTML = resultDays;
  clearFields();
}

function clearFields() {
  year.value = "";
  month.value = "";
  day.value = "";
  day.focus();
}

function valida(input) {
  const inputType = input.dataset.type;
  //console.log(inputType);

  if (validadores[inputType]) {
    validadores[inputType](input);
  }

  if (input.validity.valid) {
    input.parentElement.querySelector(".input-error-message").innerHTML = "";
    input.parentElement.classList.remove("input-container--invalido");
  } else {
    input.parentElement.classList.add("input-container--invalido");
    input.parentElement.querySelector(".input-error-message").innerHTML =
      mostraMensagemDeErro(inputType, input);
  }
}

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

const mensagensDeErro = {
  day: {
    valueMissing: "Must be a valid day.",
    customError: "Must be a valid day.",
  },
  month: {
    valueMissing: "Must be a valid month",
    customError: "Must be a valid month.",
  },
  year: {
    valueMissing: "Must be a valid year.",
    customError: "Must be in the past.",
  },
};

const validadores = {
  day: (input) => validaDia(input),
  month: (input) => validaMes(input),
  year: (input) => validaAno(input),
};

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = "";
  tiposDeErro.forEach((erro) => {
    if (input.validity[erro]) {
      mensagem = mensagensDeErro[tipoDeInput][erro];
    }
  });

  return mensagem;
}

function validaDia(input) {
  const dayReceived = input.value;
  let mensagem = "";
  if (dayReceived > monthsOfTheYear[month.value - 1])
    mensagem = "Tem que ser um dia valido.";
  if (dayReceived < 0 || dayReceived > 31) {
    mensagem = "Tem que ser um dia valido.";
  }

  input.setCustomValidity(mensagem);
}

function validaMes(input) {
  const monthReceived = input.value;
  let mensagem = "";
  //if(day.value > monthsOfTheYear[monthReceived-1]) mensagem = 'Tem que ser um mes valido.'
  if (monthReceived < 1 || monthReceived > 12) {
    mensagem = "Tem que ser um mes valido.";
  }

  input.setCustomValidity(mensagem);
}

function validaAno(input) {
  const yearReceived = input.value;
  let mensagem = "";

  const date = new Date();
  if (
    day.value >= date.getDay() &&
    month.value >= date.getMonth() &&
    yearReceived >= date.getFullYear()
  )
    mensagem = "Tem que estar no passado.";
  if (yearReceived > date.getFullYear()) {
    mensagem = "Tem que estar no passado.";
  }

  input.setCustomValidity(mensagem);
}
