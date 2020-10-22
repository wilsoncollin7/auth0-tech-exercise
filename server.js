const express = require("express");
const logger = require("morgan");
const axios = require("axios").default;

const authConfig = require("./public/auth_config.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/v2/rule", (req, res) => {
  axios.request({
    method: 'GET',
    url: 'https://dev-dq7p2jjf.us.auth0.com/api/v2/rules',
    headers: {authorization: `Bearer ${authConfig.token}`}
  }).then(function (response) {
    const rules = [];
    for (let i = 0; i < response.data.length; i++) {
      rules.push(response.data[i].name);
    }
    res.send(rules)
  }).catch(function (error) {
    console.error(error);
  });
})


// const options = {
//   method: 'GET',
//   url: 'https://dev-dq7p2jjf.us.auth0.com/api/v2/rules',
//   headers: {authorization: `Bearer ${authConfig.token}`}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });


// app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
});
