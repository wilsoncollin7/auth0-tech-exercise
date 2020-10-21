let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
  
};

const eachElement = (selector, fn) => {
  for (let e of document.querySelectorAll(selector)) {
    fn(e);
  }
};

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    document.getElementById("gated-content-1").classList.remove("hidden");
    document.getElementById("gated-content-2").classList.remove("hidden");

    document.getElementById("btn-logout").classList.remove("hidden");
    document.getElementById("btn-login").classList.add("hidden");

    const user = await auth0.getUser();
    
    eachElement(".profile-image", (e) => (e.src = user.picture));
    eachElement(".user-name", (e) => (e.innerText = user.name));
    eachElement(".user-email", (e) => (e.innerText = user.email));
    eachElement(".auth-invisible", (e) => e.classList.add("hidden"));
    eachElement(".auth-visible", (e) => e.classList.remove("hidden"));

  } else {
    document.getElementById("gated-content-1").classList.add("hidden");
    document.getElementById("gated-content-2").classList.add("hidden");
    document.getElementById("btn-logout").classList.add("hidden");
    document.getElementById("btn-login").classList.remove("hidden");
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