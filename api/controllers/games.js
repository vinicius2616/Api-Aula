const uuidv4 = require('uuid/v4');


module.exports = app => {
  
  const gamesDB = app.data.games;
  const controller = {};

  const { games: gamesMock, } = gamesDB;

  controller.listGames = (req, res) => res.status(200).json(gamesDB);

  controller.saveGames = (req, res) => {
    gamesMock.data.push({
      id: uuidv4(),
      title: req.body.title,
      year: req.body.year,
      type: req.body.type
    });

    res.status(201).json(gamesMock);
  }

  controller.removeGames = (req, res) => {
    const { gameId, } = req.params;

    const foundGameIndex = gamesMock.data.findIndex(game => game.id === gameId);

    if(foundGameIndex === -1){
      res.status(404).json({
        message: 'Game não encontrado',
        success: false,
        games: gamesMock,
      });
    }else {
      gamesMock.data.splice(foundGameIndex, 1);
      res.status(200).json({
        message: 'Game removido com sucesso!',
        success: true,
        games: gamesMock,
      });
    }


  }

  controller.updateGames = (req, res) => {
    const { gameId, } = req.params;
    const { title, year, type } = req.body;

    const foundGameIndex = gamesMock.data.findIndex(game => game.id === gameId);

    if (foundGameIndex < 0) {
      res.status(404).json({
        message: 'Game não encontrado',
        success: false,
        games: gamesMock,
      });
    }

    const newGamesMock = gamesMock.data.map(game => {
      if (game.id === gameId) {
        game.title = title;
        game.year = year;
        game.type = type;
      }

      return game;
    });

    gamesMock.data = [...newGamesMock];

    res.status(200).json({
      message: 'Game alterado com sucesso!',
      success: true,
      games: gamesMock,
    });
  }

  return controller;

}