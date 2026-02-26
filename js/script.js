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
const dataValid = [false];
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
    removeInvalidAddValid();
  } else {
    dataValid[0] = false;
    removeValidAddInvalid();
  }
});
userName.addEventListener("blur", (event) => {
  console.log(event.target.value);
  if (dataValid[0] === false) {
    removeValidAddInvalid();
  } else {
    removeInvalidAddValid();
  }
});

function removeValidAddInvalid() {
  userName.classList.add("invalid");
  userName.classList.remove("valid");
}
function removeInvalidAddValid() {
  userName.classList.remove("invalid");
  userName.classList.add("valid");
}
function hasNumbersOrSpecialSymbols(str) {
  const regexForName = /[^\p{L}\s]/gu;
  return !regexForName.test(str);
}
