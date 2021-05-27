"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _routes = _interopRequireDefault(require("./routes"));

var _mongoconnect = _interopRequireDefault(require("./config/mongoconnect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Production environment

var isProduction = process.env.NODE_ENV === "production";
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 1000000
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  return next();
}); //https debug

app.use((0, _morgan["default"])('dev')); // Create Static Route

app.use('/uploads', _express["default"]["static"]('uploads')); //Connect Mongo

(0, _mongoconnect["default"])();
app.use("/", _routes["default"]);
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("Server is running on isProductions => ".concat(isProduction));
  console.log("Server is running on PORT ".concat(PORT));
});