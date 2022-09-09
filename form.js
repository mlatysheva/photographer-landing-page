const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-button');

submitBtn.addEventListener('click', (e) => {
  validateForm();
});

function printError(elementId, errorMessage) {
  document.getElementById(elementId).innerHTML = errorMessage;
}

function validateForm() {
  const name = document.contactForm.name.value;
  const email = document.contactForm.email.value;
  const phone = document.contactForm.phone.value;
  const message = document.contactForm.message.value;
  
  let nameErr, emailErr, phoneErr, messageErr = true;
  
  if (name === "") {
    printError("nameErr", "Please enter your name");
  } else {
    const regex = /^[a-zA-Z\s]+$/;                
    if (regex.test(name) === false) {
      printError("nameErr", "Please enter a valid name");
    } else {
      printError("nameErr", "");
      nameErr = false;
    }
  }
  
  if (email == "") {
    printError("emailErr", "Please enter your email address");
  } else {
    const regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
      printError("emailErr", "Please enter a valid email address");
    } else{
      printError("emailErr", "");
      emailErr = false;
    }
  }
  
  if (phone == "") {
    printError("phoneErr", "Please enter your phone number");
  } else {
    const regex = /^[1-9]\d{9}$/;
    if (regex.test(phone) === false) {
      printError("phoneErr", "Please enter a valid 10 digit phone number");
    } else{
      printError("phoneErr", "");
      phoneErr = false;
    }
  }
  
  if (message == "") {
    printError("messageErr", "Please enter your message of at least 15 and not more than 500 characters");
  } else if (message.length < 15 || message.length > 500) {
    printError("messageErr", "Text should be between 15 and 500 characters long");
  } else {
    printError("messageErr", "");
    messageErr = false;
  }
  
  // Prevent the form from being submitted if there are any errors
  if ((nameErr || emailErr || phoneErr || messageErr) == true) {
    return false;
  } else {
    const dataPreview = "You've entered the following details: \n" +
      "Full Name: " + name + "\n" +
      "Email Address: " + email + "\n" +
      "Phone Number: " + phone + "\n" +
      "Message: " + message + "\n";
    alert(dataPreview);
  }
};
