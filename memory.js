function Deck(types) {
  this.cards = [];
  for(var i = 0, j = 0; i < types.length; i++, j++) {
    this.cards.push(new Card(types[i], j++));
    this.cards.push(new Card(types[i], j));
  }
  this.getCard =  function(index) {
    return this.cards[parseInt(index)];
  };
}

function Card(type, id) {
  this.type = type;
  this.visible = false;
  this.id = id;
}

function setupGame(deck) {
  var indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  //randomly choose a card to be added to DOM
  //remove that card from temporary cards deck
  while(indices.length != 0) {
    var rand = Math.floor(Math.random() * (indices.length - 1));

    var cardIndex = indices[rand];
    addCardToDom(deck.cards[cardIndex]);
    indices.splice(rand, 1);
  }
}

function addCardToDom(card) {
  var cardHtml =
    '<div class="card"> \
      <span class="contents" id="' + card.id + '"> \
      </span> \
    </div>';

  $(".game-board").append(cardHtml);
}


var deck = new Deck(["Banana", "Apple", "Orange", "Peach", "Lemon" ]);

$(document).ready(function() {
  setupGame(deck);

  //click card event
  $(".card").click(function() {
    //ignore previously selected or previously matched card
    if($(this).find(".match").length == 0 && $(this).find(".selected").length == 0) {
      var prevCardElem = $(".card").find(".selected");
      var currCardElem = $(this).find("span");
      var prevCard;
      var currCard = deck.getCard(currCardElem.attr("id"));

      currCardElem.html(currCard.type).show(200).addClass("selected");

      /*CHECK MATCH*/

      //check that previous card was selected
      if(prevCardElem.length) {
        prevCard = deck.getCard(prevCardElem.attr("id"));

        if(prevCard.type == currCard.type) {
          $(".card").find(".contents").removeClass("selected");
          prevCardElem.addClass("match");
          currCardElem.addClass("match");
        }
        else {
          //hide two nonmatched cards only
          var nonMatchPair = $(".card").find(".contents").not(".match");
          nonMatchPair.removeClass("selected").hide(1000, function() {
            //remove text from dom
            $(this).html("");
          });
        }
      }
    }
  });

});
