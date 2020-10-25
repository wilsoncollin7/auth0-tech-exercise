# Auth0 Rule Viewer 
  [![GitHub followers](https://img.shields.io/github/followers/wilsoncollin7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/wilsoncollin7?tab=followers) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  This app lets the user list all rules, users, and clients associated with their tenant in Auth0.

  <img src="./public/assets/images/page.JPG">

  ## Installation

  Download this repo. Then you will need to create a auth_config.json file in the public folder that fits this model:

  ```
  {
    "domain": "[APPLICATION_DOMAIN]",
    "clientId": "[CLIENT_ID]",
    "audience": "[MANAGEMENT_SYSTEM_API_IDENTIFIER]",
    "token": "[MANAGEMENT_SYSTEM_API_TOKEN]",
    "whitelist": [ALL_EMAILS_ON_YOUR_WHITELIST]
  }
  ```

  ## Usage

  This is an express app, run:
  
  ```
  nodemon server.js
  ```

  ## License

  This aplication is made with the [MIT License](https://opensource.org/licenses/MIT)

  ## Questions

  For any questions you might have, you can email me at wilsoncollin7@gmail.com. You can also check out my [GitHub Profile](https://github.com/wilsoncollin7).
