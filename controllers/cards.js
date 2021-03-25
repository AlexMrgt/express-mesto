const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `${Object.values(err.errors).map((error) => error.message).join(', ')}` });
      }
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndDelete(cardId)
    .orFail(() => res.status(404).send({ message: 'Нет карточки с таким ID' }))
    .then((delCard) => res.status(200).send(delCard))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Нет карточки с таким ID' });
      }
      return res.status(400);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const likeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => res.status(400).send({ message: 'Нет карточки с таким ID' }))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Нет карточки с таким ID' });
      }
      return res.status(400);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

const dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => res.status(404).send({ message: 'Нет карточки с таким ID' }))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Нет карточки с таким ID' });
      }
      return res.status(400);
    })
    .catch(() => res.status(500).send({ message: 'Server Error' }));
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
