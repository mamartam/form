//++++++++++++++++++++++++++++++++++++++++++
const dataValid = [false, false, false, false, false, false, false];
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
//++++++++++++++++++++++++++++++++++++++++++
const userBirthday = document.getElementById("user-birthday");

userBirthday.addEventListener("change", (event) => {
  let errorMessage = event.target
    .closest(".input-box")
    .querySelector(".error-message");
  let today = new Date();
  let userBirthdayDate = new Date(event.target.value);
  let eighteenthBirthday = new Date(userBirthdayDate);

  eighteenthBirthday.setFullYear(userBirthdayDate.getFullYear() + 18);
  if (today.getTime() >= eighteenthBirthday) {
    dataValid[3] = true;
    removeInvalidAddValid(userBirthday);
    errorMessage.classList.add("inactive");
  } else {
    dataValid[3] = false;
    removeValidAddInvalid(userBirthday);
    errorMessage.textContent = "Sorry, but candidate must be 18+ years old";
    errorMessage.classList.remove("inactive");
  }
});

//++++++++++++++++++++++++++++++++++++++++++

const userPreparationLevel = document.getElementById("user-preparation-level");

userPreparationLevel.addEventListener("change", (event) => {
  const value = event.target.value;
  const validLevels = ["starter", "middle", "profi"];

  if (validLevels.includes(value)) {
    dataValid[4] = true;
    removeInvalidAddValid(userPreparationLevel);
  } else {
    dataValid[4] = false;
    removeValidAddInvalid(userPreparationLevel);
  }
});

//++++++++++++++++++++++++++++++++++++++++++
const userHours = document.getElementById("user-hours");

userHours.addEventListener("input", (event) => {
  let errorMessage = event.target
    .closest(".input-box")
    .querySelector(".error-message");
  let userHoursInputedValue = event.target.value;
  if (Number(userHoursInputedValue) > 40) {
    errorMessage.textContent = "Hours can't be greater than 40 per week!";
    removeValidAddInvalid(userHours);
    removeInActive(dataValid, errorMessage, 5);
  } else if (
    Number(userHoursInputedValue) < 1 &&
    userHoursInputedValue !== ""
  ) {
    errorMessage.textContent = "Hours can't be less than 1!";

    removeValidAddInvalid(userHours);
    removeInActive(dataValid, errorMessage, 5);
  } else {
    dataValid[5] = true;
    removeInvalidAddValid(userHours);
    errorMessage.classList.add("inactive");
  }
});
userHours.addEventListener("blur", (event) => {
  let errorMessage = event.target
    .closest(".input-box")
    .querySelector(".error-message");
  let userHoursInputedValue = event.target.value;
  if (userHoursInputedValue === "") {
    errorMessage.textContent = "Please enter hours!";

    removeValidAddInvalid(userHours);
    removeInActive(dataValid, errorMessage, 5);
  }
});

function removeInActive(array, message, index) {
  message.classList.remove("inactive");
  array[index] = false;
}

//++++++++++++++++++++++++++++++++++++++++++
const userFieldBox = document.querySelector(".user-field-box");

userFieldBox.addEventListener("change", (event) => {
  let errorMessage = event.target
    .closest(".user-field-box")
    .querySelector(".error-message");
  if (event.target.name === "user-field") {
    console.log(event.target);
    dataValid[6] = true;
    errorMessage.classList.add("inactive");
  }
});

//++++++++++++++++++++++++++++++++++++++++++
