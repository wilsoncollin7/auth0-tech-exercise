$("#rules").on("click", function() {
  $("#mainHeader").text("Rules");
  $(".rules").removeClass("hidden");
  $(".users").addClass("hidden");

  const ruleList = $(".rulesList");

  ruleList.html("")

  $.get("/api/v2/rule", function(data) {
    for (let i = 0; i < data.length; i++) {
      let li = $("<li>").addClass("list-group-item");
      li.text(data[i]);
      ruleList.append(li);
    }
  })
  
});

$("#users").on("click", function() {
  $("#mainHeader").text("Users");
  $(".rules").addClass("hidden");
  $(".users").removeClass("hidden");
});
