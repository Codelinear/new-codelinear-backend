const express = require("express");
const {
  upload,
  uploadImage,
  sendMailContact,
  sendMail,
  fetchDataByTableName,
  updateCaseStudyData,
  deleteDataByColumnName,
  insertDataIntoTable,
} = require("../ctrl/controller");

const router = express.Router();

router.post("/images", upload.single("image"), uploadImage);

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
