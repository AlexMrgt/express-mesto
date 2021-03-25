const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "Поле 'Имя' обязательно для заполнения"],
    minlength: [2, "Имя не может быть короче двух символов"],
    maxlength: [30, "Имя не может быть длиннее тридцати символов"]
  },
  about: {
    type: String,
    required: [true, "Поле 'О себе' обязательно для заполнения"],
    minlength: [2, "Поле 'О себе' не может быть короче двух символов"],
    maxlength: [30, "Поле 'О себе' нне может быть длиннее тридцати символов"]
  },
  avatar: {
    type: String,
    required: [true, "Поле 'Аватар' обязательно для заполнения"],
  }
});

module.exports = mongoose.model('user', userSchema);
