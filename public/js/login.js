const formEl = document.querySelector('.mainform');
const answEl = document.querySelector('.answ');

formEl.addEventListener('submit', ev => {
    ev.preventDefault();
    const params = new FormData(formEl);
    axios.post('/login', params)
      .then(r => {
        if (r.data === "adm_OK") {
          window.location.href = "/admin";
        }
        answEl.innerHTML = r.data;
      });
});
