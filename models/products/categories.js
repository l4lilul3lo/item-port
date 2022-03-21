const data = require("./data.json");

let categories = [];
data.forEach((category) => {
  if (!categories.includes(category.id)) {
    categories.push(category.id);
  }
});

console.log(categories);
