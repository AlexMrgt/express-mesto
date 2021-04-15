const mongoose = require('mongoose');
const validator = require('validator');

const customErrorString = 'Неверный формат поля {PATH}';
const urlValidator = [validator.isURL, customErrorString];

const cardSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Поле "Название" обязательно для заполнения'],
    minlength: [2, 'Название не может быть короче двух символов'],
    maxlength: [30, 'Название не может быть длиннее тридцати символов'],
  },
  link: {
    type: String,
    validation: urlValidator,
    required: [true, 'Поле "Ссылка на изображение" обязательно для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
