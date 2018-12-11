const fetch = require('node-fetch');
const { URLSearchParams } = require("url");

const FedId_ClientId = process.env.FedId_ClientId;
const FedId_SecretBase64 = process.env.FedId_SecretBase64;
const FedId_Username = process.env.FedId_Username;
const FedId_Password = process.env.FedId_Password;
const FedId_URL = process.env.FedId_URL;

function getFedIdBearer(){
  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("username", FedId_Username);
  params.append("password", FedId_Password);

  return fetch(FedId_URL, {
    method: 'POST',
    body: params,
    headers: {Authorization: "Basic " + FedId_SecretBase64}
  })
  .then(result => result.json())
  .then(result => result.access_token)
  .catch(error => {
    console.warn(`Error while connecting to FEDID : ${error}`);
  })
}

module.exports = getFedIdBearer;
