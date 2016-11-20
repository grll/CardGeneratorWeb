// Initialize Firebase
var config = {
  apiKey: "AIzaSyBUqtGx5JnZnLVclM-kRVhi-06jb1uBnOE",
  authDomain: "epflsurvival-abd33.firebaseapp.com",
  databaseURL: "https://epflsurvival-abd33.firebaseio.com",
  storageBucket: "epflsurvival-abd33.appspot.com",
  messagingSenderId: "166394322782"
};
firebase.initializeApp(config);

var app = angular.module("myApp", ["firebase"]);

app.controller("Ctrl", function($scope, $firebaseArray) {
  var ref = firebase.database().ref().child("cards");
  $scope.cards = $firebaseArray(ref);

  $scope.cards.$loaded().then(function() {
    $("#spinner").addClass("hide");
  });

  $scope.display = function (card) {
    console.log(card);
    $("#myModalLabel").html(card.question);
    $("#myModalBody").html(card.description);
    var answerDivs = $("#myModalBody > .col-xs-6");
    for(var i=0; i < 4; i++)
    {
      if (card.answers[i])
      {
        var strHTML = "card.answers[i].answer <br>";
        // ajouter les jauges/ commentaires
        $(answerDivs[i]).html(card.answers[i].answer);
        $(answerDivs[i]).removeClass("hide");
      }
      else
      {
        $(answerDivs[i]).addClass("hide");
      }
    }
    $("#myModal").modal('show');
  }
});
