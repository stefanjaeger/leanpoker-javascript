module.exports = {

    VERSION: "Budweiser",

    bet_request: function (game_state) {
        var ourBet = game_state.players[game_state.in_action].bet;

        var callOrFlop = function () {
            var currentCall = call();

            if(currentCall <= 50){
                return call();
            }

            if(currentCall <= ourBet * 1.25){
                return call();
            }

            return flop();
        };
        var call = function () {
            return game_state.current_buy_in - ourBet - game_state.small_blind;
        }
        var flop = function () {
            return 0;
        }
        var minimumRaise = function () {
            return call() + game_state.minimum_raise;
        }
        var rank = function () {
            var cards = game_state.players[game_state.in_action].hole_cards;

            var card0 = cards[0].rank;
            var card1 = cards[1].rank;

            if (card0 === '10') {
                card0 = 'T';
            }
            if (card1 === '10') {
                card1 = 'T';
            }

            var hand = card0 + card1,
                handReverse = card1 + card0;

            var ranks = [
                {
                    "rank": 1,
                    "cards": ['AA', 'KK', 'QQ', 'AK']
                },
                {
                    "rank": 2,
                    "cards": ['JJ', 'TT', '99']
                },
                {
                    "rank": 3,
                    "cards": ['88', '77', 'AQ']
                },
                {
                    "rank": 4,
                    "cards": ['66', '65', '44', '33', '22', 'AJ', 'AT', 'A9', 'A8']
                },
                {
                    "rank": 5,
                    "cards": ['A7', 'A6', 'A5', 'A4', 'A3', 'A2', 'KQ']
                },
                {
                    "rank": 6,
                    "cards": ['QJ', 'JT', 'T9', '98', '87', '76', '75', '65']
                }
            ];

            var rank = 7;
            ranks.every(function (data, index) {
                if (data.cards.indexOf(hand) > 0 || data.cards.indexOf(handReverse) > 0) {
                    rank = data.rank;
                    return false;
                }
                return true;
            });
            return rank;
        }

        var preFlopStrategie = function () {
            if (rank() < 6) {
                return minimumRaise();
            } else {
                return callOrFlop();
            }
        };

        var flopStrategie = function () {

        };

        // Rounds
        switch (game_state.community_cards.length) {
        case 0: // Preflop
            console.log("preflop");
            return preFlopStrategie();
        case 3: // Flop
            console.log("flop");
            return preFlopStrategie();
        case 4: // Turn
            console.log("turn");
            return preFlopStrategie();
        case 5: // River
            console.log("river");
            return preFlopStrategie();
        default:
            return preFlopStrategie();
        }
    },

    showdown: function (game_state) {

    }
};
