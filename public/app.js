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
  $scope.display = function (card) {
    console.log(card);
    $("#myModalLabel").html(card.title);
    $("#myModalBody").html(card.description);
    $("#myModal").modal('show');
  }
});
