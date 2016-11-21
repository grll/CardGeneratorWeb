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
      if (card.answers.length <= 2)
      {
        answerDivs.eq(2).addClass("hide");
        answerDivs.eq(3).addClass("hide");
      }
      else
      {
        answerDivs.eq(2).removeClass("hide");
        answerDivs.eq(3).removeClass("hide");
      }
      if (card.answers[i])
      {
        answerDivs.eq(i).find("span").eq(0).html(card.answers[i].answer);
        var scores = ['academics', 'finances', 'health', 'social'];
        for(var j=0; j < 4; j++)
        {
          answerDivs.eq(i).find(".score").eq(j).html(card.answers[i].changes[scores[j]]);
        }
        answerDivs.eq(i).css("visibility","visible");
      }
      else
      {
        answerDivs.eq(i).css("visibility","hidden");
      }
    }
    $("#myModal").modal('show');
  }
});
