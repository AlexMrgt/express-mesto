const cardsRouter = require('express').Router();

const { newCardValidator, cardIdValidator } = require('../middlewares/celebrateValidation');

const {
  createCard, getCards, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/',
  newCardValidator,
  createCard);

cardsRouter.delete('/:cardId',
  cardIdValidator,
  deleteCardById);

cardsRouter.put('/:cardId/likes',
  cardIdValidator,
  likeCard);

cardsRouter.delete('/:cardId/likes',
  cardIdValidator,
  dislikeCard);

module.exports = cardsRouter;
