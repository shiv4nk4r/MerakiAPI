const ApiRouter = require("express").Router();

//Getting all the child routes
const CourseRoute = require("./API/CourseRoute");

//Handling all the routes
ApiRouter.use("/courses", CourseRoute);

module.exports = ApiRouter;
