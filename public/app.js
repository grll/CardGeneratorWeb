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
  // constants
  var scores = ['academics', 'finances', 'health', 'social'];
  var sections = ['PH', 'MA', 'SCGC', 'GM', 'MT', 'EL', 'MX', 'IN', 'SC', 'GC', 'SIE', 'AR', 'SV'];
  var periodes = ['Début Semestre 1', 'Milieu Semestre 1', 'Fin Semestre 1', 'Révisions 1', 'Examens 1', 'Vacances', 'Début Semestre 2', 'Milieu Semestre 2', 'Fin Semestre 2', 'Révisions 2', 'Examens 2']

  var ref = firebase.database().ref().child("cards");

  $scope.cards = $firebaseArray(ref);

  $scope.cards.$loaded().then(function() {
    $(".spinner").eq(0).addClass("hide");
    for (var i=0; i < $scope.cards.length; i++) {
      //$scope.cards[i].new_img_url = $scope.cards[i].image;
      if($scope.cards[i].image)
        $scope.cards[i].img_status = "yes";
      else
        $scope.cards[i].img_status = "no";
    }
    console.log($scope.cards);
  });

  $scope.display = function (card) {
    //console.log(card); for testing

    $("#myModalLabel").html(card.question);
    $("#myModalBody").html(card.description);
    var answerDivs = $("#myModalBody > .col-xs-6");
    var media = $(".media").eq(0);

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
        // put answer
        answerDivs.eq(i).find("span").eq(0).html(card.answers[i].answer);
        // put jauges on answer
        for(var j=0; j < 4; j++)
        {
          answerDivs.eq(i).find(".score").eq(j).html(card.answers[i].changes[scores[j]]);
        }
        // put comment
        if (card.answers[i].comment)
        {
          answerDivs.eq(i).find(".comment").eq(0).html(card.answers[i].comment);
        }
        else
        {
          answerDivs.eq(i).find(".comment").eq(0).html("Pas de commentaire...");
        }
        // put suite
        if (card.answers[i].suite)
        {
          answerDivs.eq(i).find(".suite").eq(0).html(card.answers[i].suite);
        }
        else
        {
          answerDivs.eq(i).find(".suite").eq(0).html("Pas de suite...");
        }
        // make it visible
        answerDivs.eq(i).css("visibility","visible");
      }
      else
      {
        answerDivs.eq(i).css("visibility","hidden");
      }
    }
    // --- FILL MEDIA DATA ---
    // fill img
    if (card.image)
    {

      media.find("img").eq(0).hide();
      media.find(".loader").eq(0).show();

      var imgRef = firebase.storage().ref().child("images/" + card.image).getDownloadURL().then(function(url) {
        media.find("img").eq(0).one("load",function () {
          media.find(".loader").eq(0).hide();
          media.find("img").eq(0).show();
        }).attr("src", url);
      }).catch(function (error){
        media.find("img").eq(0).one("load",function () {
          media.find(".loader").eq(0).hide();
          media.find("img").eq(0).show();
        }).attr("src", "img-not-found.png");
      });
    }
    else
    {
      media.find("img").eq(0).one("load",function () {
        media.find(".loader").eq(0).hide();
        media.find("img").eq(0).show();
      }).attr("src", "no-img.png");
    }
    // fill the date
    if (card.date != -1)
      media.find(".date").eq(0).html("Jour " + card.date);
    else
      media.find(".date").eq(0).html("Pas de date...");
    // fill the section
    if (card.section != -1)
      media.find(".section").eq(0).html(sections[card.section]);
    else
      media.find(".section").eq(0).html("Pas de section...");
    // fill the period
    if (card.period != -1)
      media.find(".period").eq(0).html(periodes[card.period]);
    else
      media.find(".period").eq(0).html("Pas de période...");
    // fill tag
    if (card.tag)
      media.find(".tag").eq(0).html(card.tag);
    else
      media.find(".tag").eq(0).html("Pas de tag...");

    // fill the range
    var rangesTableTrTd = $("#ranges").find('tr').eq(1).find('td');
    for (var i=0; i < rangesTableTrTd.length; i++)
    {
      rangesTableTrTd.eq(i).html(card.ranges[scores[i]][0] + " - " + card.ranges[scores[i]][1]);
    }

    // equalize the height of each answer before displaying:
    $(".same-height").matchHeight();

    $("#myModal").modal('show');
  }

  $scope.add_img_url = function(id) {
    var card = $scope.cards.$getRecord(id);
    console.log(card)
    $scope.cards.$save(card).then(function() {
      alert('saved');
    });
  }
});
