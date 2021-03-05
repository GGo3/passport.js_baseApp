const Users = require('../models/users');

// проверка наличия пользователя в БД
const trySignIn = async (req, res) => {
  const result = await Users.checkUser(req.body.username, req.body.password); // в переменную отправляем результат проверки (true, false)
  if (result) {
    const currentUser = await Users.getUserByLogin(req.body.username); // если такой пользаватель есть, запрашиваем его имя и фамилию с БД 
    res.send(`Добро пожаловать, ${currentUser.surname} ${currentUser.name}`) // отправляем data в блок answer на фронте
  } else {
    res.send([{status: false, errorText: 'Неправильный логин или пароль', inputName: '.loginMain'}]) // отправляем data в блок status
  }
}

module.exports = {
  trySignIn,
}