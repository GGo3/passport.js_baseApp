const formEl = document.querySelector('.mainform');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', ev => {
    ev.preventDefault();
    window.location.href = "/logout";
});
