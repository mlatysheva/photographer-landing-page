const form = document.getElementById('submit-form');
const email = document.getElementById('email');
const emailError = document.querySelector('#email + span.error');

email.addEventListener('input', () => {
  if (email.validity.valid) {
    emailError.innerText = '';
    email.className = 'error';
  } else {
    showError();
  }
});

form.addEventListener('submit', (e) => {
  if (!email.validity.valid) {
    showError();
    e.preventDefault();
  }
});

function showError() {
  if (email.validity.valueMissiing) {
    emailError.textContent = 'Please enter an email';
  } else if (email.validity.typeMismatch) {
    emailError.textContent = 'Please enter a valid email address';
  } else if (email.validity.tooShort) {
    emailError.textContent = `Email should be at least ${email.getAttribute('minlength')} characters long; you entered ${email.value.length}`;
  }
  emailError.className = 'error active';
}