import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import mainRouter from "./routes";
import connectMongo from "./config/mongoconnect";

const app = express();

// Production environment
const isProduction = process.env.NODE_ENV === "production";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 1000000}));
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    return next();
});

//https debug
app.use(morgan('dev'));

// Create Static Route
app.use('/uploads', express.static('uploads'));

//Connect Mongo
connectMongo();

app.use("/", mainRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on isProductions => ${isProduction}`);
    console.log(`Server is running on PORT ${PORT}`);
});
