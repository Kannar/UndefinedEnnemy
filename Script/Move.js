window.onload = function(){
    var Titre = document.getElementById("Titre");
    TweenLite.to(Titre, 0, {scale:0.6});
    TweenLite.to(Titre, 0.5, {left:"15%"});

   var BoutonStart = document.getElementById("BoutonStart");
   TweenLite.to(BoutonStart, 0, {scale:0.5});
   TweenLite.from(BoutonStart, 2, {opacity:0, left:"-1020px"});


   var BoutonRegle = document.getElementById("BoutonRegle");
    TweenLite.to(BoutonRegle, 0, {scale:0.7});
   TweenLite.from(BoutonRegle, 2, {opacity:0, left:"-1020px"});

  $("#BoutonStart").hover(function() {
	TweenLite.to($("#BoutonStart"), 0.5, {scale:0.7, opacity:1});
	}, function() {
    TweenLite.to($("#BoutonStart"), 0.5, {scale:0.5, opacity:1});
  });

  $("#BoutonStart").click(function() {
	TweenLite.to($("#BoutonStart"), 0.1, {scale:0.5, opacity:1});
	window.location="game.html";
});

  $("#BoutonRegle").hover(function() {
  TweenLite.to($("#BoutonRegle"), 0.5, {scale:1, opacity:1});
  }, function() {
    TweenLite.to($("#BoutonRegle"), 0.5, {scale:0.7, opacity:1});
  });

  $("#BoutonRegle").click(function() {
  TweenLite.to($("#BoutonRegle"), 0.1, {scale:0.5, opacity:1});
  window.location="regle.html";
});
}

