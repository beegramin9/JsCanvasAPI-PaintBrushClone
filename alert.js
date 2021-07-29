const alertSection = document.querySelector(".alert"),
    alertExitButton = alertSection.querySelector('.alert__close__button')

const CLASS_SHOWING = "showing";

function handleAlertClose() {
    alertSection.classList.remove(CLASS_SHOWING);
}

function init() {
    alertSection.classList.add(CLASS_SHOWING);
    alertExitButton.addEventListener('click', handleAlertClose);
}

init();