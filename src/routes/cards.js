const cardsRouter = require('express').Router();
const { createCard, getCards, deleteCardById, likeCard, dislikeCard } = require('../controllers/cards');

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:cardId', deleteCardById);
cardsRouter.patch('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId/likes', dislikeCard);

module.exports = cardsRouter;