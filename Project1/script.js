const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Submit Event Listener
// ----------------------
form.addEventListener("submit", (e) => {
  e.preventDefault(); // captures data from sending to server, held in DOM

  checkInputRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});

// Validation Handler Functions
// ----------------------------
const showError = (input, message) => {
  const parentElement = input.parentElement;
  parentElement.className = "form-control error";
  const smallTag = parentElement.querySelector("small");
  smallTag.innerText = message;
};

const showSuccess = (input) => {
  const parentElement = input.parentElement;
  parentElement.className = "form-control success";
};

const checkInputRequired = (inputArray) => {
  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, ` ${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const getFieldName = (input) => {
  const fieldName = input.id;
  return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be greater than ${min}`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max}`);
  } else {
    showSuccess(input);
  }
};

const checkEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email.value.trim()).toLowerCase())) {
    showSuccess(email);
  } else {
    showError(email, `Email is invalid`);
  }
};

const checkPasswordsMatch = (pass1, pass2) => {
  if (pass1.value.trim() === pass2.value.trim()) {
    showSuccess(pass1);
    showSuccess(pass2);
  } else {
    showError(pass1, `Passwords Don't Match`);
    showError(pass2, `Passwords Don't Match`);
  }
};
