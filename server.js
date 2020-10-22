const express = require("express");
const logger = require("morgan");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const authConfig = require("./public/auth_config.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ["RS256"]
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!"
  });
});

app.get("/auth_config.json", (req, res) => {
  res.sendFile(join(__dirname, "auth_config.json"));
});

// app.use(require("./routes/apiRoutes"));
// app.use(require("./routes/htmlRoutes"));

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
