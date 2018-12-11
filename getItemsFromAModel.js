const fetch = require('node-fetch');

const getFedIdBearer = require("./getFedIdBearer");
const masterdataURL = process.env.masterdataURL;
const masterdataAPIKey = process.env.masterdataAPIKey;

function getItemsFromAModel(model) {
  return getFedIdBearer()
  .then(bearer => {
    return fetch(`${masterdataURL}/arbo/models/${model}/articles`,{
      headers: {
      "x-api-key": masterdataAPIKey,
      Authorization: "Bearer " + bearer
      }
    })
  })
  .then(result => result.json())
  .then(result => result.map(e => e.article_id))
  .catch(error => {
    console.warn(`Error while retrieving items from masterdata : ${error}`);
  })
}

module.exports = getItemsFromAModel;
