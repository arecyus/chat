const moment = require("moment");

var date = moment();

date.locale("es");
console.log(date.format("MM d YYYY, h:mm:ss a"));
