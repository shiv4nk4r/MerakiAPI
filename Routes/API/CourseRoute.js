const CoursesRoute = require("express").Router();
const multer = require("multer");
const Course = require("../../Model/Courses");

//Multer Setup START
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid File Type"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});
//Multer Setup Finish

//Create a new course
CoursesRoute.post(
  "/create",
  upload.single("courseImage"),
  async (req, res, next) => {
    const course = new Course({
      Name: req.body.name,
      Description: req.body.description,
      productImage: req.file.path,
    });
    try {
      const savedCourse = await course.save();
      res.send({ course: course._id });
    } catch (err) {
      res.send(err);
    }
  }
);

//Get all the courses
CoursesRoute.get("/", (req, res) => {
  Course.find()
    .select("Name Description productImage")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.Name,
            description: doc.Description,
            id: doc._id,
            productImage: doc.productImage,
          };
        }),
      };
      res.status(200).json(response);
    });
});

//Get one course
CoursesRoute.get("/:productID", (req, res) => {
  const id = req.params.productID;
  Course.findById(id)
    .select("Name Description productImage")
    .exec()
    .then((doc) => {
      console.log("FromDatabase", doc);
      if (doc) {
        res.status(200).json({ product: doc });
      }
    });
});

module.exports = CoursesRoute;
