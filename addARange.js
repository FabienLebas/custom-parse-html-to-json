//start by putting HTML in all_models_from_a_range.html by copy/pasting node called rb-range-container

const { parse } = require('node-html-parser');
const fs = require('fs');

const file = fs.readFileSync("./all_models_from_a_range.html", 'utf8');
const parsed = parse(file);

function getNodes(myClass, rank = 0) {
  return parsed.querySelectorAll(myClass).map(e => e.childNodes[rank].rawText);
}

function getImages(myImageClass, rank = 0) {
  return parsed.querySelectorAll(myImageClass).map(e => e.childNodes[rank].rawAttrs.split('"')[1]);
}

const manualSplitByModels = file.split('<div class="rb-range-models">');
manualSplitByModels.shift();
function findElement(myClass) { //returns an array with true if myClass is found, false otherwise
  return manualSplitByModels.map(e => e.includes(myClass));
}

const modelNames = getNodes("#rb-card-model_model_name");
const colors = modelNames.map(e => e.split(" ")[e.split(" ").length - 1]);
const modelBrands = getNodes("#rb-card-model_model_brand");
const modelIds = getNodes("#rb-card-model_model_id");
const pricesRub = getNodes("#rb-card-model_model_prices", 2).map(e => e.split(" ")[0]);
const pictures = getImages("#rb-card-model_model_picture");
const isDeleted = findElement(" rb-card-deleted");

const sampleObjectOutput = JSON.parse(fs.readFileSync("./sampleOutput.json", 'utf8'))[0];

const myOutput = modelNames.map((e, index) => {
  const myObject = {... sampleObjectOutput};
  myObject.sku = modelIds[index];
  myObject.name = e;
  myObject.brand = modelBrands[index];
  myObject.color = colors[index];
  myObject.image = [pictures[index]];
  const myOffers = {... sampleObjectOutput.offers};
  const mySeller = {... sampleObjectOutput.offers.seller};
  mySeller.name = process.env.sellerName;
  myOffers.sku = modelIds[index];
  const myPriceSpecification = {... sampleObjectOutput.offers.priceSpecification};
  myPriceSpecification.price = pricesRub[index];
  myOffers.seller = mySeller;
  myOffers.priceSpecification = myPriceSpecification;
  myObject.offers = myOffers;
  return myObject;
});

const previousOutput = JSON.parse(fs.readFileSync("outPut.json", 'utf8'));
const dataToWrite = previousOutput.concat(myOutput);

fs.writeFile("outPut.json", JSON.stringify(dataToWrite), (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
})
