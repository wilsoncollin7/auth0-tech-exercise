let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

let isOnWhitelist = false;

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();
  
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    audience: config.audience
  });
};

const eachElement = (selector, fn) => {
  for (let e of document.querySelectorAll(selector)) {
    fn(e);
  }
};

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();
  const user = await auth0.getUser();
  const response = await fetchAuthConfig();
  const config = await response.json();

  if (config.whitelist.includes(user.email)) {
    isOnWhitelist = true;
  } else {
    $(".notLogged").addClass("hidden");
    $(".notWhitelist").removeClass("hidden");
    return;
  }

  if (isAuthenticated && isOnWhitelist) {
    $("#gated-content-1").addClass("hidden");
    $("#gated-content-2").removeClass("hidden");

    $("#btn-login").addClass("hidden");
    
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

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};
