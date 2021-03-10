const hexa = require("hexa.one");
const apiConfig = require('./config/api.config');
const Hexa = new hexa(apiConfig.HEXA);
let items = Hexa.getItems(252490)
setTimeout(() => {
    console.log(items);
}, 5000);
