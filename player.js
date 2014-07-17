module.exports = {

    VERSION: "1.0",

    bet_request: function (game_state) {
        var getCurrentPlayer = function(game_state) {
            for (var i = 0; i < game_state.players.length; i++) {
                if (game_state.players[i].name === 'Grischa') {
                    return game_state.players[i];
                }
            }
        }

        return game_state.current_buy_in - getCurrentPlayer(game_state).bet;
    },

    showdown: function (game_state) {

    }
};
