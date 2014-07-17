module.exports = {

    VERSION: "Eichhof",

    bet_request: function (game_state) {
        var ourBet = game_state.players[game_state.in_action].bet;
        var cards = game_state.players[game_state.in_action].hole_cards;
        var card0 = cards[0];
        var card1 = cards[1];
        
        var callOrFold = function () {
            var currentCall = call();

            // TBD: nicht fix 50, sondern basierend auf Blindes
            if(currentCall <= 50){
                return call();
            }

            if(currentCall <= ourBet * 1.25){
                return call();
            }

            return fold();
        };
        var call = function () {
            return game_state.current_buy_in - ourBet - game_state.small_blind;
        }
        var fold = function () {
            return 0;
        }
        var minimumRaise = function () {
            return call() + game_state.minimum_raise;
        }
        var rank = function () {
            

            if (card0.rank === '10') {
                card0.rank = 'T';
            }
            if (card1.rank === '10') {
                card1.rank = 'T';
            }

            var hand = card0.rank + card1.rank,
                handReverse = card1.rank + card0.rank;

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
        
        var isStraight = function(){
                var allCards = [].concat(game_state.community_cards);
                allCards.push(card0);
                allCards.push(card1);
            
                allCards = allCards.map(function(card){
                    switch (card.rank){
                            case 'A': return 14;
                            case 'K': return 13;
                            case 'Q': return 12;
                            case 'J': return 11;
                            default: return card.rank;
                    }
                });    
            
                function sortNumber(a,b) {
                    return a - b;
                }

                allCards.sort(sortNumber);
            
                var prevNumber;
                var gapCount = 0;
                allCards.forEach(function(currentNumber){
                    if(prevNumber !== undefined && currentNumber - prevNumber === 1){
                        gapCount++;
                    } else {
                        gapCount = 0;
                    }
                    
                    prevNumber = currentNumber;
                });
                
                return gapCount > 3;
            };

        var preFlopStrategie = function () {

            switch (rank()) {
            case 1:
                return minimumRaise() * 5;
            case 2:
                return minimumRaise() * 2;
            case 3:
                return minimumRaise() * 1.5;
            case 4:
                return minimumRaise() * 1.5;
            case 5:
                return minimumRaise();
            case 6:
                return callOrFold();
            default:
                return callOrFold();
            }


        };

        var flopStrategie = function () {
            if(isStraight()){
                return minimumRaise() * 10;
            }
            
            switch (rank()) {
            case 1:
                return minimumRaise() * 5;
            case 2:
                return minimumRaise() * 2;
            case 3:
                return minimumRaise() * 1.5;
            case 4:
                return minimumRaise() * 1.5;
            case 5:
                return minimumRaise();
            case 6:
                return callOrFold();
            default:
                return callOrFold();
            }
        };

        // Rounds
        switch (game_state.community_cards.length) {
        case 0: // Preflop
            console.log("preflop");
            return preFlopStrategie();
        case 3: // Flop
            console.log("flop");
            return flopStrategie();
        case 4: // Turn
            console.log("turn");
            return flopStrategie();
        case 5: // River
            console.log("river");
            return flopStrategie();
        default:
            return flopStrategie();
        }
    },

    showdown: function (game_state) {

    }
};
