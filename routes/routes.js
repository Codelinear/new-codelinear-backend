const express = require("express");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");
const pool = require("../pool/pool");

const {
  sendMailContact,
  sendMail,
  fetchDataByTableName,
  updateCaseStudyData,
  deleteDataByColumnName,
  insertDataIntoTable,
} = require("../ctrl/controller");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
const router = express.Router();
router.post("/images", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
    return;
  }
  const { filename } = req.file;
  const { id } = req.body;
  const sql = "UPDATE images SET filename = ? WHERE id = ?";
  pool.query(sql, [filename, id], (err, result) => {
    if (err) {
      console.error("Error uploading image: ", err);
      res.status(500).send("Error uploading image");
      return;
    }
    console.log("Image uploaded successfully");
    res.status(200).send("Image uploaded successfully");
  });
});
router.post("/sendMailContact", sendMailContact);
router.post("/sendMail", sendMail);
router.post("/insert/:tableName", (req, res) => {
  const { tableName } = req.params;
  insertDataIntoTable(tableName)(req, res);
});
router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  updateCaseStudyData(id)(req, res);
});
router.post("/delete/:tableName/:columnName", (req, res) => {
  const { tableName, columnName } = req.params;
  deleteDataByColumnName(tableName, columnName)(req, res);
});
router.get("/fetch/:tableName", (req, res) => {
  const { tableName } = req.params;
  fetchDataByTableName(tableName)(req, res);
});
module.exports = { router };
