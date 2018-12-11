const fs = require('fs');
const getItemsFromAModel = require("./getItemsFromAModel");

const originalData = JSON.parse(fs.readFileSync("outPut.json", 'utf8'));

let myOutput = [];
Promise.all(originalData.map(modelData => {
  return getItemsFromAModel(modelData.sku)
  .then(items => {
    return items.map(item => {
      const outputByItem = {... modelData};
      outputByItem.sku = item;
      const newOffers = {... modelData.offers};
      newOffers.sku = item;
      outputByItem.offers = newOffers;
      myOutput.push(outputByItem);
    })
  })
}))
.then(result => {
  fs.writeFile("productsOutput.json", JSON.stringify(myOutput), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
})
.catch(error => {
  console.warn(`Error while constructing output : ${error}`);
});
