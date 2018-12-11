const fs = require('fs');


function createGroupsForSupemodels(){
  const fileGroupModels = fs.readFileSync("./outputs/russian_yoga_models.json", "utf8");
  const loadedFileModels = JSON.parse(fileGroupModels);

  const superModels = loadedFileModels.map(e => e.parentIdentifier).reduce((p, c) => {
    if (!p.includes(c)) p.push(c);
    return p;
  }, []);

  const output = superModels.map(supermodel_id => {
    const dataOneModel = loadedFileModels.filter(e => e.parentIdentifier === supermodel_id);
    const name = dataOneModel[0].name.split(" ");
    name.pop(); //for our example, name is just the same without the last word
    let skus = dataOneModel.map(e => e.skus.join());

    return {
      identifier: supermodel_id,
      name: name.join(" "),
      type: "SUPER_MODEL",
      skus: skus
    }
  })

  fs.writeFile("./outputs/russian_yoga_supermodels.json", JSON.stringify(output), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  })
}

createGroupsForSupemodels();

module.exports = createGroupsForSupemodels;
