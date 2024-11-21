const d = document,
  { log } = console;
const $form = d.querySelector("#form");
const $fields = d.querySelectorAll(".form-field");
const $errorMessages = d.querySelectorAll(".form-error");

const validateField = (field) =>
  field.checkValidity() ? false : field.validationMessage;

$fields.forEach((field, index) => {
  field.addEventListener("input", () => {
    const error = validateField(field);
    if (error) {
      $errorMessages[index].innerText = error;
      return;
    } else {
      $errorMessages[index].innerText = "";
    }
  });
});

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  $fields.forEach((field, index) => {
    const error = validateField(field);
    if (error) {
      $errorMessages[index].innerText = error;
      valid = false;
      return;
    } else {
      $errorMessages[index].innerText = "";
    }
  });
  valid && $form.submit();
});
