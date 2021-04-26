const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');

const getCards = (_, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = async (req, res, next) => {
  try {
    const owner = req.user._id;
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner });
    const populatedCard = await newCard.populate('owner').execPopulate();
    return res.send(populatedCard);
  } catch (err) {
    return next(err);
  }
};

// не нашел как сделать populate в таком варианте

// const createCard = (req, res, next) => {
//   const owner = req.user._id;
//   const { name, link } = req.body;

//   Card.create({ name, link, owner })
//     .then((newCard) => {
//       const populatedCard = newCard.populate('owner').execPopulate();
//       console.log(populatedCard);
//       res.send(populatedCard)})
//     .catch(next);
// };

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const currentUserId = req.user._id;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки по вашему запросу не нашлось');
      }
      if (card.owner.toString() !== currentUserId) {
        throw new ForbiddenError('Запрещено удалять чужие карточки');
      } else {
        Card.findByIdAndDelete(cardId)
          .then((delCard) => res.status(200).send(delCard))
          .catch(next);
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким ID'))
    .populate('owner')
    .populate('likes')
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Нет карточки с таким ID'))
    .populate('owner')
    .populate('likes')
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
