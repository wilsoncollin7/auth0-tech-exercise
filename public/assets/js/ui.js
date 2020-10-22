$("#rules").on("click", function() {
  $("#mainHeader").text("Rules");
  $(".rules").removeClass("hidden");
  $(".users").addClass("hidden");
});

$("#users").on("click", function() {
  $("#mainHeader").text("Users");
  $(".rules").addClass("hidden");
  $(".users").removeClass("hidden");
});
