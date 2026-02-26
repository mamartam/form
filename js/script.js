const userBirthday = document.querySelector("input[type='date']");
let date = new Date();

const optionYear = { year: "numeric" };
const optionMonth = { month: "2-digit" };
const optionDay = { day: "2-digit" };

const year = date.toLocaleString("en-US", optionYear);
const month = date.toLocaleString("en-US", optionMonth);
const day = date.toLocaleString("en-US", optionDay);

userBirthday.value = `${year}-${month}-${day}`;

// console.log(userBirthday.value);
//++++++++++++++++++++++++++++++++++++++++++
const dataValid = [false, false, false];
//++++++++++++++++++++++++++++++++++++++++++
const userName = document.getElementById("user-name");

userName.addEventListener("input", (event) => {
  let userNameInputedValue = String(event.target.value).trim();
  let hasValidLength = userNameInputedValue.length >= 3 ? true : false;
  let hasOnlyLetter = hasNumbersOrSpecialSymbols(userNameInputedValue);
  let errorMessage = event.target
    .closest(".input-box")
    .querySelector(".error-message");
  if (hasValidLength === false) {
    errorMessage.classList.remove("inactive");
    errorMessage.textContent = "Name should be longer than 3 characters!";
  } else if (hasOnlyLetter === false) {
    errorMessage.classList.remove("inactive");
    errorMessage.textContent =
      "Name should not contain numbers or special symbols";
  }
  if (hasValidLength === true && hasOnlyLetter === true) {
    dataValid[0] = true;

    errorMessage.classList.add("inactive");
    removeInvalidAddValid(userName);
  } else {
    dataValid[0] = false;
    removeValidAddInvalid(userName);
  }
});
userName.addEventListener("blur", (event) => {
  console.log(event.target.value);
  if (dataValid[0] === false) {
    removeValidAddInvalid(userName);
  } else {
    removeInvalidAddValid(userName);
  }
});

function removeValidAddInvalid(value) {
  value.classList.add("invalid");
  value.classList.remove("valid");
}
function removeInvalidAddValid(value) {
  value.classList.remove("invalid");
  value.classList.add("valid");
}
function hasNumbersOrSpecialSymbols(str) {
  const regexForName = /[^\p{L}\s]/gu;
  return !regexForName.test(str);
}
//++++++++++++++++++++++++++++++++++++++++++
const userEmail = document.getElementById("user-email");

userEmail.addEventListener("input", (event) => {
  let userEmailInputedValue = String(event.target.value).trim();
  let errorMessage = event.target
    .closest(".input-box")
    .querySelector(".error-message");
  if (userEmailInputedValue === "") {
    errorMessage.classList.remove("inactive");
    errorMessage.textContent = "Please enter your email";
  } else {
    errorMessage.classList.add("inactive");
    if (emailValidator(userEmailInputedValue)) {
      removeInvalidAddValid(userEmail);
      dataValid[1] = true;
    } else {
      removeValidAddInvalid(userEmail);
      dataValid[1] = false;
    }
  }
});

userEmail.addEventListener("blur", (event) => {
  let errorMessage = event.target
    .closest(".input-box")
    .querySelector(".error-message");

  if (dataValid[1] === true) {
    removeInvalidAddValid(userEmail);
    errorMessage.classList.add("inactive");
  } else {
    removeValidAddInvalid(userEmail);
    errorMessage.classList.remove("inactive");
    errorMessage.textContent = "Email is not correct";
  }
});
function emailValidator(str) {
  const regexForEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexForEmail.test(str);
}
//++++++++++++++++++++++++++++++++++++++++++
const userPassword = document.getElementById("user-password");

userPassword.addEventListener("blur", (event) => {
  let errorMessage = event.target
    .closest(".input-box")
    .querySelector(".error-message");
  let userPasswordInputedValue = String(event.target.value).trim();
  if (userPasswordInputedValue.length >= 8) {
    if (!searchingForLetterInUpperCase(userPasswordInputedValue)) {
      errorMessage.classList.remove("inactive");
      removeValidAddInvalid(userPassword);
      dataValid[2] = false;
      errorMessage.textContent =
        "Your password should contain at least one letter in upper register";
    } else if (!searchingForLetterInLowerCase(userPasswordInputedValue)) {
      errorMessage.classList.remove("inactive");
      removeValidAddInvalid(userPassword);
      dataValid[2] = false;
      errorMessage.textContent =
        "Your password should contain at least one letter in low register";
    } else {
      errorMessage.classList.add("inactive");
      removeInvalidAddValid(userPassword);
      dataValid[2] = true;
    }
  } else if (userPasswordInputedValue === "") {
    removeValidAddInvalid(userPassword);
    dataValid[2] = false;
    errorMessage.classList.remove("inactive");
    errorMessage.textContent = "Please enter your password";
  } else if (userPasswordInputedValue.length < 8) {
    removeValidAddInvalid(userPassword);
    dataValid[2] = false;
    errorMessage.classList.remove("inactive");
    errorMessage.textContent =
      "Your password should be longer than 8 characters";
  }
});

function searchingForLetterInUpperCase(str) {
  const regex = /\p{Lu}/u;
  return regex.test(str);
}
function searchingForLetterInLowerCase(str) {
  const regex = /\p{Ll}/u;
  return regex.test(str);
}
