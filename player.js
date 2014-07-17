module.exports = {

    VERSION: "1.0",

    bet_request: function (game_state) {
        var findHighestBet = function (game_state) {
            var max = 0;
            for (var i = 0; i < game_state.players.length; i++) {
                if (game_state.players[i].status === 'active') {
                    if (game_state.players[i].bet > max) {
                        max = game_state.players[i].bet;
                    }
                }
            }
            return max;
        }

        console.log('max = ' + findHighestBet(game_state));

        return 0;
    },

    showdown: function (game_state) {

    }
};
