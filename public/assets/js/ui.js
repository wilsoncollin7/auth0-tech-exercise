$("#rules").on("click", function() {
  $("#mainHeader").text("Rules");
  $(".rules").removeClass("hidden");
  $(".users").addClass("hidden");
  $(".clients").addClass("hidden")

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
  $(".clients").addClass("hidden")

  const usersList = $(".usersList");

  usersList.html("")

  $.get("/api/v2/users", function(data) {
    for (let i = 0; i < data.length; i++) {
      let li = $("<li>").addClass("list-group-item");
      li.text(data[i]);
      usersList.append(li);
    }
  })
});

$("#clients").on("click", function() {
  $("#mainHeader").text("Clients");
  $(".rules").addClass("hidden");
  $(".users").addClass("hidden");
  $(".clients").removeClass("hidden")

  const clientsList = $(".clientsList");

  clientsList.html("")

  $.get("/api/v2/clients", function(data) {
    for (let i = 0; i < data.length; i++) {
      let li = $("<li>").addClass("list-group-item");
      li.text(data[i]);
      clientsList.append(li);
    }
  })
});
