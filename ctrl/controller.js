const nodemailer = require("nodemailer");
var validator = require("node-email-validation");
const { pool } = require('../pool/pool');

const fetchDataByTableName = (tableName) => async (req, res) => {
  try {
    const sql = `SELECT * FROM ${tableName}`;
    pool.query(sql, (error, results) => {
      if (error) {
        console.error("Error retrieving data from database:", error);
        res.status(500).send("Error retrieving data from database");
      } else {
        res.send(results);
      }
    });
  } catch (err) {
    console.error("Error retrieving data from database:", err);
    res.status(500).send("Error retrieving data from database");
  }
};

const insertDataIntoTable = (tableName) => async (req, res) => {
  const formData = req.body;
  const sql = `INSERT INTO ${tableName} SET ?`;

  try {
    pool.query(sql, formData, (error, result) => {
      if (error) {
        console.error("Error inserting data:", error);
        res.status(500).send("Error inserting data into database");
      } else {
        console.log("Form data inserted:", result);
        res.send("Form submitted successfully");
      }
    });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data into database");
  }
};

const deleteDataByColumnName = (tableName, columnName) => async (req, res) => {
  const { value } = req.body;

  const sql = `DELETE FROM ${tableName} WHERE ${columnName} = ?`;

  try {
    pool.query(sql, [value], (error, result) => {
      if (error) {
        console.error(`Error deleting data from ${tableName}:`, error);
        res.status(500).send(`Error deleting data from ${tableName}`);
      } else {
        console.log("Data deleted successfully:", result);
        res.send("Data deleted successfully");
      }
    });
  } catch (err) {
    console.error(`Error deleting data from ${tableName}:`, err);
    res.status(500).send(`Error deleting data from ${tableName}`);
  }
};

const updateCaseStudyData = (id) => async (req, res) => {
  const { company, companytitle, companybody, companyindustry } = req.body;

  const sql = `UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?`;

  try {
    pool.query(sql, [company, companytitle, companybody, companyindustry, id], (error, result) => {
      if (error) {
        console.error("Error updating case study data:", error);
        res.status(500).send("Error updating case study data");
      } else {
        console.log("Case study data updated successfully:", result);
        res.send("Case study data updated successfully");
      }
    });
  } catch (err) {
    console.error("Error updating case study data:", err);
    res.status(500).send("Error updating case study data");
  }
};

const sendMailContact = (req, res) => {
  const { username, lastname, email, message } = req.body;
  if (validator.is_email_valid(email)) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "developer@codelinear.com",
        pass: "umlw qvhn nslr udrt",
      },
    });
    const mailOptions = {
      from: "Codelinear <developer@codelinear.com>",
      to: "info@codelinear.com",
      subject: "New message from your website",
      text: `FirstName: ${username}\nLastName: ${lastname}\nEmail: ${email}\nMessage: ${message}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent:", info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  } else {
    res.status(500).send("Error sending email");
  }
};

const sendMail = async (req, res) => {
  const { email, username } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "marketing@codelinear.com",
        pass: "mdjj rmcm gqtc kuyt",
      },
    });
    const mailOptions = {
      from: "Codelinear <marketing@codelinear.com>",
      to: email,
      subject: " Thank You for Contacting Codelinear!",
      text: `Dear ${username},

Thank you for reaching out to Codelinear! 
We appreciate you taking the time to connect with us.

Your message has been received and is currently being reviewed by our team. 
We\'ll get back to you as soon as possible with a response to your inquiry. 

Thank you again for choosing Codelinear. We look forward to assisting you further!

Best regards,

Codelinear`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
};

module.exports = {
  sendMailContact,
  sendMail,
  fetchDataByTableName,
  updateCaseStudyData,
  deleteDataByColumnName,
  insertDataIntoTable,
};
