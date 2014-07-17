module.exports = {

    VERSION: "1.0",

    bet_request: function (game_state) {
        return game_state.current_buy_in - game_state.players[game_state.in_action].bet;
    },

    showdown: function (game_state) {

    }
};
