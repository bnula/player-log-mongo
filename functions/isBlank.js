const _ = require("lodash");

function isBlank(value) {
   value = value.trim();
   return _.isEmpty(value) && !_.isNumber(value) || _.isNaN(value);
}

exports.isBlank = isBlank;