const fs = require('fs');
const getModelInfos = require("./getModelInfos");
const getItemsFromAModel = require("./getItemsFromAModel");

const modelsFile = fs.readFileSync("./outputs/outPut.json", "utf8");
const loadedModels = JSON.parse(modelsFile);
const models = loadedModels.map(e => e.sku);

function createGroupsForModels(){
  return Promise.all(models.map(model => {
    return Promise.all([getModelInfos(model), getItemsFromAModel(model)])
    .then(modelInfos => {
      return {
        identifier: model,
        name: modelInfos[0].label,
        type: "MODEL",
        skus: modelInfos[1],
        parentIdentifier: modelInfos[0].conception_code
      }
    })
  }))
  .then(result => {
    fs.writeFile("./outputs/russian_yoga_models.json", JSON.stringify(result), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    })
  })
  .catch(error => {
    console.warn(`Error in createGroupsForModels : ${error}`);
  })
}

createGroupsForModels()

module.exports = createGroupsForModels;
