const User = require('../models/user');


const getUsers = (req, res) => {

  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: "Server Error" }));
}

const getUserById = (req, res) => {

  const {id} = req.params;
  User.findById(id)
    .orFail(()=> res.status(404).send({message : "Пользователь не найден"}))
    .then( user => res.send(user))
    .catch(err => {
      if (err.name === 'CastError'){
        return res.status(404).send({message : "Пользователь не найден"})// можно и так, наверное, но мне кажется, это лишняя информация: .send({message : "Неверный формат ID пользователя"})
      }
    })
    .catch(err => res.status(500).send({ message: "Server Error" }));
}

const createUser = (req, res)=>{

  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then(user=> res.send(user))
    .catch(err => {
      if (err.name === 'ValidationError'){
        return res.status(400).send({message : `${Object.values(err.errors).map(error => error.message).join(', ')}`})
      }
    })
    .catch(err => res.status(500).send({ message: "Server Error" }));
};

// editUser/editUserAvatar без проверки на cast-error у ID, тк пока все-равно нет логики авторизации/аутентификации
const editUser = (req, res) => {

  const _id = req.user._id;
  const {name, about} = req.body;

  User.findByIdAndUpdate(
     _id ,
    {name, about },
    {new : true, runValidators : true}
  )
  .orFail(()=>{
    res.status(404).send({ message: "Нет пользователя с таким ID" })
  })
  .then( user => res.status(200).send(user))
  .catch(err => {
    if (err.name === 'ValidationError'){
      return res.status(400).send({message : `${Object.values(err.errors).map(error => error.message).join(', ')}`})
    }
  })
  .catch(err => res.status(500).send({ message: "Server Error" }))
};

const editUserAvatar = (req, res)=>{

  const _id = req.user._id;
  const {avatar} = req.body;

  User.findByIdAndUpdate(
     _id ,
    {avatar},
    {new : true, runValidators : true}
  )
  .orFail(()=>{
    res.status(404).send({ message: "Нет пользователя с таким ID" })
  })
  .then( user => res.status(200).send(user))
  .catch(err => {
    if (err.name === 'ValidationError'){
      return res.status(400).send({message : `${Object.values(err.errors).map(error => error.message).join(', ')}`})
    }
  })
  .catch(err => res.status(500).send({ message: "Server Error" }))

};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  editUser,
  editUserAvatar
}