module.exports  = app => {
  const controller = app.controllers.games;

  app.route('/api/v1/games')
    .get(controller.listGames)
    .post(controller.saveGames);

  app.route('/api/v1/games/:gameId')
    .put(controller.updateGames)
    .delete(controller.removeGames);
}