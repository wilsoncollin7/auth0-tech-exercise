// --------------------------------------------------
// page ui listeners, changes loaded content on click
// --------------------------------------------------
// ---rules---
$("#rules").on("click", function() {
  // displays the right header and card
  $("#mainHeader").text("Rules");
  $(".rules").removeClass("hidden");
  $(".users").addClass("hidden");
  $(".clients").addClass("hidden")
  // grabs the list element
  const ruleList = $(".rulesList");
  // resets the card on every click 
  ruleList.html("")
  // get request to the server, then displays the items in the array
  $.get("/api/v2/rule", function(data) {
    for (let i = 0; i < data.length; i++) {
      let li = $("<li>").addClass("list-group-item");
      li.text(data[i].name);
      ruleList.append(li);
    }
  })
});
// ---users---
$("#users").on("click", function() {
  // displays the right header and card
  $("#mainHeader").text("Users");
  $(".rules").addClass("hidden");
  $(".users").removeClass("hidden");
  $(".clients").addClass("hidden")
  // grabs the list element
  const usersList = $(".usersList");
  // resets the card on every click 
  usersList.html("")
  // get request to the server, then displays the items in the array
  $.get("/api/v2/users", function(data) {
    for (let i = 0; i < data.length; i++) {
      let li = $("<li>").addClass("list-group-item");
      li.text(data[i]);
      usersList.append(li);
    }
  })
});
// ---clients---
$("#clients").on("click", function() {
  // displays the right header and card
  $("#mainHeader").text("Clients");
  $(".rules").addClass("hidden");
  $(".users").addClass("hidden");
  $(".clients").removeClass("hidden")
  // grabs the list element
  const clientsList = $(".clientsList");
  // resets the card on every click 
  clientsList.html("")
  // get request to the server, then displays the items in the array
  $.get("/api/v2/clients", function(data) {
    for (let i = 0; i < data.length; i++) {
      let li = $("<button>").addClass("btn btn-light client-button").attr("id", "client-button").attr("value", data[i]);
      li.text(data[i]);
      clientsList.append(li);
    }
  })
});
// ---client main buttons---
$(document).on("click", ".clientsList #client-button", function() {
  $(".clientRules").removeClass("hidden")
  // grabs client rules list
  const clientRuleList = $(".clientRulesList");
  // resets the card on every click 
  clientRuleList.html("");
  // sets variable for the name of the application
  const clientName = this.value;
  // gets the data and loops through to find the rules that relate to the client
  $.get("/api/v2/rule", function(data) {
    for (let i = 0; i < data.length; i++) {
      let li = $("<li>").addClass("list-group-item ruleForClient");
      if (data[i].script.indexOf(clientName) != -1) {
        li.text(data[i].name);
        clientRuleList.append(li);
      };
    };
    if( clientRuleList.children().length === 0 ) {
      clientRuleList.text("Client has no rules")
    }
  });
});
