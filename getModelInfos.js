const fetch = require('node-fetch');

const getFedIdBearer = require("./getFedIdBearer");
const masterdataURL = process.env.masterdataURL;
const masterdataAPIKey = process.env.masterdataAPIKey;

function getModelInfos(model_id){
  return getFedIdBearer()
  .then(bearer => {
    return fetch(`${masterdataURL}/arbo/models/${model_id}/infos`,{
      headers: {
        "x-api-key": masterdataAPIKey,
        Authorization: "Bearer " + bearer
      }
    })
  })
  .then(result => result.json())
  .catch(error => {
    console.warn(`Error while retrieving model infos for model ${model_id} : ${error}`);
  })
}

module.exports = getModelInfos;
