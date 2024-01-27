import express from "express";
import dotenv from "dotenv";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

const promBundle = require("express-prom-bundle");
// Add the options to the prometheus middleware most option are for http_request_duration_seconds histogram metric
const metricsMiddleware = promBundle({
 includeMethod: true, 
 includePath: true, 
 includeStatusCode: true, 
 includeUp: true,
 customLabels: {project_name: 'hello_world', project_type: 'test_metrics_labels'},
 promClient: {
 collectDefaultMetrics: {
 }
 }
});
// add the prometheus middleware to all routes
app.use(metricsMiddleware)
// default endpoint 
app.get("/",(req,res) => res.json({
 "GET /": "All Routes", 
 "GET /hello": "{hello:world}", 
 "GET /metrics": "Metrics data",
 "POST /bye": "POST Request: + post data"
}));

app.get("/", (req, res) => {
  res.json({ message: "We have mounted the voulme to running container" });
});
 

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});