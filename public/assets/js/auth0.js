// sets the auth0 variable
let auth0 = null;
// gets the auth config file with tenant info
const fetchAuthConfig = () => fetch("/auth_config.json");
// sets a whitelist boolean to determine if user is allowed
let isOnWhitelist = false;
// configure client function that grabs the auth config info and creates the client
const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience
  });
};
// each element function to make later displaying easier for future expansion
const eachElement = (selector, fn) => {
  for (let e of document.querySelectorAll(selector)) {
    fn(e);
  }
};
// update UI function that determines if the client is authorized and renders the page 
const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();
  const user = await auth0.getUser();
  const response = await fetchAuthConfig();
  const config = await response.json();
  // function that determines if the user is on the whitelist set up in auth config
  if (config.whitelist.includes(user.email)) {
    isOnWhitelist = true;
  } else {
    $(".notLogged").addClass("hidden");
    $(".notWhitelist").removeClass("hidden");
    return;
  }
  // function that displays the right info based on whether they are authenticated and whitelisted or not
  if (isAuthenticated && isOnWhitelist) {
    $("#gated-content-1").addClass("hidden");
    $("#gated-content-2").removeClass("hidden");
    $("#btn-login").addClass("hidden");
    // here we can add content to the dropdown image
    eachElement(".profile-image", (e) => (e.src = user.picture));
    eachElement(".user-name", (e) => (e.innerText = user.name));
    eachElement(".user-email", (e) => (e.innerText = user.email));
    eachElement(".auth-invisible", (e) => e.addClass("hidden"));
    eachElement(".auth-visible", (e) => e.classList.remove("hidden"));
  } else {
    $("#gated-content-1").removeClass("hidden");
    $("#gated-content-2").addClass("hidden");
    $("#btn-login").removeClass("hidden");
  }
};
// onload function that starts the app
window.onload = async () => {
  await configureClient();
  updateUI();
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0.handleRedirectCallback();
    updateUI();
    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};
// login redirect to auth0 server
const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};
// logs out the user and reloads the page to its origin
const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};
