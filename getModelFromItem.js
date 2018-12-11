const fetch = require('node-fetch');

const getFedIdBearer = require("./getFedIdBearer");
const masterdataURL = process.env.masterdataURL;
const masterdataAPIKey = process.env.masterdataAPIKey;

function getModelFromItem(item){
  return getFedIdBearer()
  .then(bearer => {
    return fetch(`${masterdataURL}/arbo/articles/${item}`,{
      headers: {
        "x-api-key": masterdataAPIKey,
        Authorization: "Bearer " + bearer
      }
    })
  })
  .then(result => result.json())
  .then(result => result.map(e => e.r3code)[0])
  .catch(error => {
    console.warn(`Error while retrieving model for item ${item} : ${error}`);
  })
}

module.exports = getModelFromItem;
