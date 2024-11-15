import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

let loginModalInstance;

export function closeLoginModal() {
  const loginModalElement = document.querySelector("#loginModal");

  if (!loginModalInstance) {
    loginModalInstance = bootstrap.Modal.getInstance(loginModalElement);
  }

  if (loginModalInstance) {
    loginModalInstance.hide();
    cleanupModal();
  }
}

function cleanupModal() {
  document.body.classList.remove("modal-open");
  document.body.style.paddingRight = "";
}
