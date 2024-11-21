const d = document,
  { log } = console;
const $form = d.querySelector("#login");
const $fields = d.querySelectorAll(".form-field");
const $errorMessages = d.querySelectorAll(".form-error");
const $eyes = d.querySelectorAll(".eye");

const validateField = (field, index) => {
  const error = field.checkValidity() ? false : field.validationMessage;
  if (error) {
    $errorMessages[index].innerText = error;
    return false;
  } else {
    $errorMessages[index].innerText = "";
  }
  return true;
};

const togglePassword = (eye) => {
  if (eye.getAttribute("data-eye-on") !== "true") {
    eye.classList.add("eye-off");
    eye.setAttribute("data-eye-on", true);
    $form[eye.dataset.input].type = "text";
  } else {
    eye.classList.remove("eye-off");
    eye.setAttribute("data-eye-on", false);
    $form[eye.dataset.input].type = "password";
  }
};

$fields.forEach((field, index) =>
  field.addEventListener("input", () => validateField(field, index))
);

$form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  $fields.forEach((field, index) => {
    if (!valid) return;
    valid = validateField(field, index);
  });
  if ($form.password.value !== $form.confirm.value) {
    $form.querySelector("errorConfirmPassword").innerText =
      "Las contraseñas no coinciden";
    valid = false;
  }
  valid && $form.submit();
});

$eyes.forEach((eye) => {
  eye.addEventListener("click", (e) => {
    togglePassword(eye);
  });
});
