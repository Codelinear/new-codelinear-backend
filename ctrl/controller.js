const nodemailer = require("nodemailer");
var validator = require("node-email-validation");
const mysql = require("mysql");
const { response } = require("express");
const multer = require("multer");

const connection = mysql.createPool({
  host: "217.21.87.205",
  user: "u947451844_saif08",
  password: "u]1ro&X$1R",
  database: "u947451844_pages",
});
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
      from: { email },
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
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "developer@codelinear.com",
      pass: "umlw qvhn nslr udrt",
    },
  });
  const mailOptions = {
    from: "Codelinear Developer <developer@codelinear.com>",
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
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
};
const getMailData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const ipAddress = req.ip;
  const { username, lastname, email, message } = req.body;
  const formData = { username, lastname, email, message, ipAddress };
  connection.query(
    "INSERT INTO contactforminformation SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getAdminData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { email, password } = req.body;
  formData = { email, password };
  connection.query("INSERT INTO manageadmin SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAdminData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM manageadmin", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const deleteAdminData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { email } = req.body;

  connection.query(
    "DELETE FROM manageadmin where email = ?",
    [email],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const deletePositionData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { positiontitle1 } = req.body;

  connection.query(
    "DELETE FROM careerpos1 where positiontitle1 = ?",
    [positiontitle1],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayMailData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM contactforminformation", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeHeroHeaderData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { homeHero } = req.body;
  const formData = { homeHero };
  connection.query("INSERT INTO home_page SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeHeroHeaderData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM home_page", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeHeroCase1Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { cname, cheader } = req.body;
  const formData = { cname, cheader };
  connection.query(
    "INSERT INTO homeherocase1 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayHomeHeroCase1Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM homeherocase1", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeHeroCase2Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { cname1, cheader1 } = req.body;
  const formData = { cname1, cheader1 };
  connection.query(
    "INSERT INTO homeherocase2 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayHomeHeroCase2Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM homeherocase2", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeHeroCase3Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { cname2, cheader2 } = req.body;
  const formData = { cname2, cheader2 };
  connection.query(
    "INSERT INTO homeherocase3 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayHomeHeroCase3Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM homeherocase3", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeHeroCase4Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { cname3, cheader3 } = req.body;
  const formData = { cname3, cheader3 };
  connection.query(
    "INSERT INTO homeherocase4 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayHomeHeroCase4Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM homeherocase4", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeHeroCase5Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { cname4, cheader4 } = req.body;
  const formData = { cname4, cheader4 };
  connection.query(
    "INSERT INTO homeherocase5 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayHomeHeroCase5Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM homeherocase5", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeVisionHeaderData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { vision_pera } = req.body;
  const formData = { vision_pera };
  connection.query("INSERT INTO vision SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeVisionHeaderData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM vision", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeDigitalTransformationData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { title, content } = req.body;
  const formData = { title, content };
  connection.query("INSERT INTO codelinear SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeDigitalTransformationData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM codelinear", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeTechnologyConsultingData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { crew, crew_pera } = req.body;
  const formData = { crew, crew_pera };
  connection.query("INSERT INTO crew SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeTechnlogyConsultingData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM crew", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeProductEngineeringData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { heading, pera } = req.body;
  const formData = { heading, pera };
  connection.query("INSERT INTO contactus SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeProductEngineeringData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM contactus", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeAboutData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { lifeHeading, lifePera } = req.body;
  const formData = { lifeHeading, lifePera };
  connection.query("INSERT INTO lifeat SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeAboutData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM lifeat", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeServiceData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead } = req.body;
  const formData = { servicehead };
  connection.query("INSERT INTO service SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeServiceData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService1Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead1, servicecont1 } = req.body;
  const formData = { servicehead1, servicecont1 };
  connection.query("INSERT INTO service1 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService1Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service1", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService2Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead2, servicecont2 } = req.body;
  const formData = { servicehead2, servicecont2 };
  connection.query("INSERT INTO service2 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService2Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service2", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService3Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead3, servicecont3 } = req.body;
  const formData = { servicehead3, servicecont3 };
  connection.query("INSERT INTO service3 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService3Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service3", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService4Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead4, servicecont4 } = req.body;
  const formData = { servicehead4, servicecont4 };
  connection.query("INSERT INTO service4 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService4Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service4", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService5Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead5, servicecont5 } = req.body;
  const formData = { servicehead5, servicecont5 };
  connection.query("INSERT INTO service5 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService5Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service5", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService6Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead6, servicecont6 } = req.body;
  const formData = { servicehead6, servicecont6 };
  connection.query("INSERT INTO service6 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService6Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service6", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService7Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead7, servicecont7 } = req.body;
  const formData = { servicehead7, servicecont7 };
  connection.query("INSERT INTO service7 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService7Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service7", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService8Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead8, servicecont8 } = req.body;
  const formData = { servicehead8, servicecont8 };
  connection.query("INSERT INTO service8 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService8Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service8", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService9Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead9, servicecont9 } = req.body;
  const formData = { servicehead9, servicecont9 };
  connection.query("INSERT INTO service9 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService9Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service9", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService10Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead10, servicecont10 } = req.body;
  const formData = { servicehead10, servicecont10 };
  connection.query("INSERT INTO service10 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService10Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service10", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService11Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead11, servicecont11 } = req.body;
  const formData = { servicehead11, servicecont11 };
  connection.query("INSERT INTO service11 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService11Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service11", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeService12Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicehead12, servicecont12 } = req.body;
  const formData = { servicehead12, servicecont12 };
  connection.query("INSERT INTO service12 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeService12Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM service12", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeCaseStudy1Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { casename1, caseheader1 } = req.body;
  const formData = { casename1, caseheader1 };
  connection.query("INSERT INTO casestudy1 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeCaseStudy1Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM casestudy1", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeCaseStudy2Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { casename2, caseheader2 } = req.body;
  const formData = { casename2, caseheader2 };
  connection.query("INSERT INTO casestudy2 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeCaseStudy2Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM casestudy2", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeCaseStudy3Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { casename3, caseheader3 } = req.body;
  const formData = { casename3, caseheader3 };
  connection.query("INSERT INTO casestudy3 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeCaseStudy3Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM casestudy3", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeCaseStudy4Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { casename4, caseheader4 } = req.body;
  const formData = { casename4, caseheader4 };
  connection.query("INSERT INTO casestudy4 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeCaseStudy4Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM casestudy4", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeCaseStudy5Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { casename5, caseheader5 } = req.body;
  const formData = { casename5, caseheader5 };
  connection.query("INSERT INTO casestudy5 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeCaseStudy5Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM casestudy5", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeClientData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { clienttitle } = req.body;
  const formData = { clienttitle };
  connection.query("INSERT INTO client SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeClientData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM client", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead } = req.body;
  const formData = { industrieshead };
  connection.query("INSERT INTO industries SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData1 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead1 } = req.body;
  const formData = { industrieshead1 };
  connection.query("INSERT INTO industries1 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData1 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries1", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData2 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead2 } = req.body;
  const formData = { industrieshead2 };
  connection.query("INSERT INTO industries2 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData2 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries2", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData3 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead3 } = req.body;
  const formData = { industrieshead3 };
  connection.query("INSERT INTO industries3 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData3 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries3", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData4 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead4 } = req.body;
  const formData = { industrieshead4 };
  connection.query("INSERT INTO industries4 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData4 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries4", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData5 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead5 } = req.body;
  const formData = { industrieshead5 };
  connection.query("INSERT INTO industries5 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData5 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries5", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData6 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead6 } = req.body;
  const formData = { industrieshead6 };
  connection.query("INSERT INTO industries6 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData6 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries6", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData7 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead7 } = req.body;
  const formData = { industrieshead7 };
  connection.query("INSERT INTO industries7 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData7 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries7", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData8 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead8 } = req.body;
  const formData = { industrieshead8 };
  connection.query("INSERT INTO industries8 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData8 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries8", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData9 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead9 } = req.body;
  const formData = { industrieshead9 };
  connection.query("INSERT INTO industries9 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeIndustriesData9 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries9", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeIndustriesData10 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrieshead10 } = req.body;
  const formData = { industrieshead10 };
  connection.query(
    "INSERT INTO industries10 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayHomeIndustriesData10 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industries10", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { bloghead } = req.body;
  const formData = { bloghead };
  connection.query("INSERT INTO blog SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData1 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle1, blogbody1 } = req.body;
  const formData = { blogtitle1, blogbody1 };
  connection.query("INSERT INTO blog1 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData1 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog1", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData2 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle2, blogbody2 } = req.body;
  const formData = { blogtitle2, blogbody2 };
  connection.query("INSERT INTO blog2 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData2 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog2", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData3 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle3, blogbody3 } = req.body;
  const formData = { blogtitle3, blogbody3 };
  connection.query("INSERT INTO blog3 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData3 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog3", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData4 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle4, blogbody4 } = req.body;
  const formData = { blogtitle4, blogbody4 };
  connection.query("INSERT INTO blog4 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData4 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog4", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData5 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle5, blogbody5 } = req.body;
  const formData = { blogtitle5, blogbody5 };
  connection.query("INSERT INTO blog5 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData5 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog5", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData6 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle6, blogbody6 } = req.body;
  const formData = { blogtitle6, blogbody6 };
  connection.query("INSERT INTO blog6 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData6 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog6", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData7 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle7, blogbody7 } = req.body;
  const formData = { blogtitle7, blogbody7 };
  connection.query("INSERT INTO blog7 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData7 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog7", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData8 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle8, blogbody8 } = req.body;
  const formData = { blogtitle8, blogbody8 };
  connection.query("INSERT INTO blog8 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData8 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog8", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData9 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle9, blogbody9 } = req.body;
  const formData = { blogtitle9, blogbody9 };
  connection.query("INSERT INTO blog9 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData9 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog9", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData10 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle10, blogbody10 } = req.body;
  const formData = { blogtitle10, blogbody10 };
  connection.query("INSERT INTO blog10 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData10 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog10", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData11 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle11, blogbody11 } = req.body;
  const formData = { blogtitle11, blogbody11 };
  connection.query("INSERT INTO blog11 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData11 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog11", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData12 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle12, blogbody12 } = req.body;
  const formData = { blogtitle12, blogbody12 };
  connection.query("INSERT INTO blog12 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData12 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog12", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData13 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle13, blogbody13 } = req.body;
  const formData = { blogtitle13, blogbody13 };
  connection.query("INSERT INTO blog13 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData13 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog13", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData14 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle14, blogbody14 } = req.body;
  const formData = { blogtitle14, blogbody14 };
  connection.query("INSERT INTO blog14 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData14 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog14", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData15 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle15, blogbody15 } = req.body;
  const formData = { blogtitle15, blogbody15 };
  connection.query("INSERT INTO blog15 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData15 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog15", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData16 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle16, blogbody16 } = req.body;
  const formData = { blogtitle16, blogbody16 };
  connection.query("INSERT INTO blog16 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeBlogData16 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blog16", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeBlogData17 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { blogtitle17, blogbody17, blogbody217 } = req.body;
  const formData = { blogtitle17, blogbody17, blogbody217 };
  connection.query(
    "INSERT INTO featuredblog SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayHomeBlogData17 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM featuredblog", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getBlogHeaderData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { header } = req.body;
  const formData = { header };
  connection.query(
    "INSERT INTO blogmainpage SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayBlogHeaderData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM blogmainpage", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeCompanyData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody } = req.body;
  const formData = { companytitle, companybody };
  connection.query("INSERT INTO company SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeCompanyData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM company", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeContactData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { contactemail, contactnumber } = req.body;
  const formData = { contactemail, contactnumber };
  connection.query("INSERT INTO contact SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeContactData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM contact", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getHomeAddressData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { indiatitle, indiabody, usatitle, usabody } = req.body;
  const formData = { indiatitle, indiabody, usatitle, usabody };
  connection.query("INSERT INTO address SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayHomeAddressData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM address", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getServiceHeaderData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { servicepagehead, servicepagecont } = req.body;
  const formData = { servicepagehead, servicepagecont };
  connection.query("INSERT INTO servicepage SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayServiceHeaderData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM servicepage", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService1Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { prodtitle, prodpara, prodsubtitle1, prodsubtitle2, prodsubtitle3 } =
    req.body;
  const formData = {
    prodtitle,
    prodpara,
    prodsubtitle1,
    prodsubtitle2,
    prodsubtitle3,
  };
  connection.query("INSERT INTO serviceprod SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService1Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM serviceprod", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService2Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    apptitle,
    apppara,
    appsubtitle1,
    appsubtitle2,
    appsubtitle3,
    appsubtitle4,
    appsubtitle5,
  } = req.body;
  const formData = {
    apptitle,
    apppara,
    appsubtitle1,
    appsubtitle2,
    appsubtitle3,
    appsubtitle4,
    appsubtitle5,
  };
  connection.query("INSERT INTO serviceapp SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService2Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM serviceapp", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService3Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    techhead,
    techpara,
    techsubtitle1,
    techsubtitle2,
    techsubtitle3,
    techsubtitle4,
    techsubtitle5,
    techsubtitle6,
    techsubtitle7,
    techsubtitle8,
  } = req.body;
  const formData = {
    techhead,
    techpara,
    techsubtitle1,
    techsubtitle2,
    techsubtitle3,
    techsubtitle4,
    techsubtitle5,
    techsubtitle6,
    techsubtitle7,
    techsubtitle8,
  };
  connection.query("INSERT INTO servicetech SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService3Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM servicetech", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService4Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    aihead,
    aipara,
    aisubtitle1,
    aisubtitle2,
    aisubtitle3,
    aisubtitle4,
    aisubtitle5,
  } = req.body;
  const formData = {
    aihead,
    aipara,
    aisubtitle1,
    aisubtitle2,
    aisubtitle3,
    aisubtitle4,
    aisubtitle5,
  };
  connection.query("INSERT INTO aiservice SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService4Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aiservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService5Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    sftitle,
    sfpara,
    sfsubtitle1,
    sfsubtitle2,
    sfsubtitle3,
    sfsubtitle4,
  } = req.body;
  const formData = {
    sftitle,
    sfpara,
    sfsubtitle1,
    sfsubtitle2,
    sfsubtitle3,
    sfsubtitle4,
  };
  connection.query("INSERT INTO sfservice SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService5Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM sfservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService6Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    mstitle,
    mspara,
    mssubtitle1,
    mssubtitle2,
    mssubtitle3,
    mssubtitle4,
  } = req.body;
  const formData = {
    mstitle,
    mspara,
    mssubtitle1,
    mssubtitle2,
    mssubtitle3,
    mssubtitle4,
  };
  connection.query("INSERT INTO msservice SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService6Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM msservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService7Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    ecomthead,
    ecompara,
    ecomsubtitle1,
    ecomsubtitle2,
    ecomsubtitle3,
    ecomsubtitle4,
    ecomsubtitle5,
    ecomsubtitle6,
    ecomsubtitle7,
    ecomsubtitle8,
    ecomsubtitle9,
    ecomsubtitle10,
  } = req.body;
  const formData = {
    ecomthead,
    ecompara,
    ecomsubtitle1,
    ecomsubtitle2,
    ecomsubtitle3,
    ecomsubtitle4,
    ecomsubtitle5,
    ecomsubtitle6,
    ecomsubtitle7,
    ecomsubtitle8,
    ecomsubtitle9,
    ecomsubtitle10,
  };
  connection.query(
    "INSERT INTO ecommerceservice SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayService7Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM ecommerceservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService8Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    cloudtitle,
    cloudpara,
    cloudsubtitle1,
    cloudsubtitle2,
    cloudsubtitle3,
    cloudsubtitle4,
    cloudsubtitle5,
  } = req.body;
  const formData = {
    cloudtitle,
    cloudpara,
    cloudsubtitle1,
    cloudsubtitle2,
    cloudsubtitle3,
    cloudsubtitle4,
    cloudsubtitle5,
  };
  connection.query(
    "INSERT INTO cloudservice SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayService8Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM cloudservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService9Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    gametitle,
    gamepara,
    gamesubtitle1,
    gamesubtitle2,
    gamesubtitle3,
    gamesubtitle4,
    gamesubtitle5,
  } = req.body;
  const formData = {
    gametitle,
    gamepara,
    gamesubtitle1,
    gamesubtitle2,
    gamesubtitle3,
    gamesubtitle4,
    gamesubtitle5,
  };
  connection.query("INSERT INTO gameservice SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService9Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM gameservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService10Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    arvrtitle,
    arvrpara,
    arvrsubtitle1,
    arvrsubtitle2,
    arvrsubtitle3,
    arvrsubtitle4,
    arvrsubtitle5,
    arvrsubtitle6,
  } = req.body;
  const formData = {
    arvrtitle,
    arvrpara,
    arvrsubtitle1,
    arvrsubtitle2,
    arvrsubtitle3,
    arvrsubtitle4,
    arvrsubtitle5,
    arvrsubtitle6,
  };
  connection.query("INSERT INTO arvrservice SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService10Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM arvrservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService11Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    lowtitle,
    lowpara,
    lowsubtitle1,
    lowsubtitle2,
    lowsubtitle3,
    lowsubtitle4,
    lowsubtitle5,
  } = req.body;
  const formData = {
    lowtitle,
    lowpara,
    lowsubtitle1,
    lowsubtitle2,
    lowsubtitle3,
    lowsubtitle4,
    lowsubtitle5,
  };
  connection.query("INSERT INTO lowservice SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService11Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM lowservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getService12Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    qatitle,
    qapara,
    qasubtitle1,
    qasubtitle2,
    qasubtitle3,
    qasubtitle4,
    qasubtitle5,
    qasubtitle6,
    qasubtitle7,
    qasubtitle8,
    qasubtitle9,
  } = req.body;
  const formData = {
    qatitle,
    qapara,
    qasubtitle1,
    qasubtitle2,
    qasubtitle3,
    qasubtitle4,
    qasubtitle5,
    qasubtitle6,
    qasubtitle7,
    qasubtitle8,
    qasubtitle9,
  };
  connection.query("INSERT INTO qaservice SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayService12Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM qaservice", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutHeaderData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutHeading } = req.body;
  const formData = {
    aboutHeading,
  };
  connection.query("INSERT INTO abouthero SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutHeaderData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM abouthero", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutVisionData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutVision } = req.body;
  const formData = {
    aboutVision,
  };
  connection.query("INSERT INTO aboutvision SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutVisionData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutvision", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutOurVisonData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { ourVision } = req.body;
  const formData = {
    ourVision,
  };
  connection.query("INSERT INTO ourvision SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutOurVisonData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM ourvision", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutGuidingData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { guidingtitle, guidingbody } = req.body;
  const formData = {
    guidingtitle,
    guidingbody,
  };
  connection.query(
    "INSERT INTO aboutguiding SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayAboutGuidingData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutguiding", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutGuidingContentData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    problem_solve,
    problem_pera,
    leader,
    leader_pera,
    patrons,
    patron_pera,
  } = req.body;
  const formData = {
    problem_solve,
    problem_pera,
    leader,
    leader_pera,
    patrons,
    patron_pera,
  };
  connection.query("INSERT INTO ability SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutGuidingContentData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM ability", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitmentData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { ideal_pera } = req.body;
  const formData = {
    ideal_pera,
  };
  connection.query("INSERT INTO ideal SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitmentData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM ideal", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitment1Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutcommtitle1, aboutcommbody1 } = req.body;
  const formData = {
    aboutcommtitle1,
    aboutcommbody1,
  };
  connection.query("INSERT INTO aboutcomm1 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitment1Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutcomm1", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitment2Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutcommtitle2, aboutcommbody2 } = req.body;
  const formData = {
    aboutcommtitle2,
    aboutcommbody2,
  };
  connection.query("INSERT INTO aboutcomm2 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitment2Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutcomm2", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitment3Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutcommtitle3, aboutcommbody3 } = req.body;
  const formData = {
    aboutcommtitle3,
    aboutcommbody3,
  };
  connection.query("INSERT INTO aboutcomm3 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitment3Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutcomm3", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitment4Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutcommtitle4, aboutcommbody4 } = req.body;
  const formData = {
    aboutcommtitle4,
    aboutcommbody4,
  };
  connection.query("INSERT INTO aboutcomm4 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitment4Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutcomm4", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitment5Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutcommtitle5, aboutcommbody5 } = req.body;
  const formData = {
    aboutcommtitle5,
    aboutcommbody5,
  };
  connection.query("INSERT INTO aboutcomm5 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitment5Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutcomm5", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitment6Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutcommtitle6, aboutcommbody6 } = req.body;
  const formData = {
    aboutcommtitle6,
    aboutcommbody6,
  };
  connection.query("INSERT INTO aboutcomm6 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitment6Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutcomm6", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitment7Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutcommtitle7, aboutcommbody7 } = req.body;
  const formData = {
    aboutcommtitle7,
    aboutcommbody7,
  };
  connection.query("INSERT INTO aboutcomm7 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitment7Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutcomm7", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getAboutCommitment8Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { aboutcommtitle8, aboutcommbody8 } = req.body;
  const formData = {
    aboutcommtitle8,
    aboutcommbody8,
  };
  connection.query("INSERT INTO aboutcomm8 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayAboutCommitment8Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM aboutcomm8", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustryHeaderData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industriestitle } = req.body;
  const formData = {
    industriestitle,
  };
  connection.query(
    "INSERT INTO industriespage SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustryHeaderData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industriespage", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustryGreyData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrygreycont } = req.body;
  const formData = {
    industrygreycont,
  };
  connection.query(
    "INSERT INTO industrygreybox SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustryGreyData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrygreybox", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry1Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle1, industrybody1 } = req.body;
  const formData = {
    industrytitle1,
    industrybody1,
  };
  connection.query(
    "INSERT INTO industrymain1 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry1Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain1", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry2Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle2, industrybody2 } = req.body;
  const formData = {
    industrytitle2,
    industrybody2,
  };
  connection.query(
    "INSERT INTO industrymain2 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry2Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain2", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry3Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle3, industrybody3 } = req.body;
  const formData = {
    industrytitle3,
    industrybody3,
  };
  connection.query(
    "INSERT INTO industrymain3 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry3Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain3", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry4Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle4, industrybody4 } = req.body;
  const formData = {
    industrytitle4,
    industrybody4,
  };
  connection.query(
    "INSERT INTO industrymain4 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry4Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain4", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry5Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle5, industrybody5 } = req.body;
  const formData = {
    industrytitle5,
    industrybody5,
  };
  connection.query(
    "INSERT INTO industrymain5 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry5Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain5", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry6Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle6, industrybody6 } = req.body;
  const formData = {
    industrytitle6,
    industrybody6,
  };
  connection.query(
    "INSERT INTO industrymain6 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry6Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain6", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry7Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle7, industrybody7 } = req.body;
  const formData = {
    industrytitle7,
    industrybody7,
  };
  connection.query(
    "INSERT INTO industrymain7 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry7Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain7", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry8Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle8, industrybody8 } = req.body;
  const formData = {
    industrytitle8,
    industrybody8,
  };
  connection.query(
    "INSERT INTO industrymain8 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry8Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain8", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry9Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle9, industrybody9 } = req.body;
  const formData = {
    industrytitle9,
    industrybody9,
  };
  connection.query(
    "INSERT INTO industrymain9 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry9Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain9", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getIndustry10Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { industrytitle10, industrybody10 } = req.body;
  const formData = {
    industrytitle10,
    industrybody10,
  };
  connection.query(
    "INSERT INTO industrymain10 SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayIndustry10Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM industrymain10", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getCaseStudyData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    ["", companytitle, "", "", 1],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData1 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 2],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData2 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 3],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData3 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 4],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData4 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 5],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData5 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 6],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData6 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 7],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData7 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 8],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData8 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 9],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData9 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 10],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData10 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 11],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData11 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 12],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData12 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 13],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData13 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 14],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData14 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 15],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData15 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 16],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData16 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 17],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData17 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 18],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData18 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 19],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData19 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 20],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData20 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 21],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData21 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 22],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData22 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 23],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData23 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 24],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData24 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 25],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData25 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 26],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData26 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 27],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData27 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 28],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData28 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 29],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData29 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 30],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData30 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 31],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData31 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 32],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData32 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 33],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData33 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 34],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getCaseStudyData34 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { companytitle, companybody, companyindustry, company } = req.body;
  connection.query(
    "UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?",
    [company, companytitle, companybody, companyindustry, 35],
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const displayCaseStudyHeaderData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM maincasestudy", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getCareerHeaderData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { careerheading, careerpara1, careerpara2, careerpara3 } = req.body;
  const formData = {
    careerheading,
    careerpara1,
    careerpara2,
    careerpara3,
  };
  connection.query("INSERT INTO careerpage SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayCareerHeaderData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM careerpage", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getCareerPos1Data = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const { positiontitle1, posloc1, posexp1, posreq1 } = req.body;
  const formData = {
    positiontitle1,
    posloc1,
    posexp1,
    posreq1,
  };
  connection.query("INSERT INTO careerpos1 SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayCareerpos1Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM careerpos1", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getContactData = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    contactheader,
    regiens,
    loc1,
    loc2,
    loc3,
    office,
    office1,
    area1,
    office2,
    area2,
    contact,
    call,
    number,
    write,
    mail,
    enquiry,
    email,
  } = req.body;
  const formData = {
    contactheader,
    regiens,
    loc1,
    loc2,
    loc3,
    office,
    office1,
    area1,
    office2,
    area2,
    contact,
    call,
    number,
    write,
    mail,
    enquiry,
    email,
  };
  connection.query("INSERT INTO contactpage SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const displayContactData = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM contactpage", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};

const displayImages = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM images", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.json(results);
    });
  });
};
const displayServicePage1Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM productdesign", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage2Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM appdev", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage3Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM tech", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage4Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM AI", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage5Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM ecommerce", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage6Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM cloud", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage7Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM gamedev", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage8Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM arvr", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage9Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM lowcode", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage10Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM salesforce", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage11Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM sharepoint", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayServicePage12Data = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM quality", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage34 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM ikea", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage33 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM booking", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage32 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM wilder", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage31 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM mangocase", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage30 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM soch", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage29 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM moviework", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage28 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM studio", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage27 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM steelcase", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage26 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM sodashi", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage25 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM litup", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage24 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM mica", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage23 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM course", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage22 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM middle", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage21 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM lyracase", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage1 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM sea", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage2 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM trade", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage3 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM sdu", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage4 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM vacaystay", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage5 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM contrasted", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage6 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM kanbar", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage7 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM wearwell", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage8 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM leafandhive", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage9 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM imapac", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage10 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM klass", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage11 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM william", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage12 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM vouri", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage13 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM homesrus", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage14 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM landmark", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage15 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM klub", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage16 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM kernal", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage17 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM hinge", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage18 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM cowboycase", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage19 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM deel", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const displayCaseStudyPage20 = (req, res) => {
  connection.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.status(500).send("Database connection error");
      return;
    }

    conn.query("SELECT * FROM convoy", (err, results) => {
      conn.release();
      if (err) {
        console.log(err);
        res.status(500).send("Error retrieving data from database");
        return;
      }
      res.send(results);
    });
  });
};
const getServicepage1 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheader,
    heropara,
    section1ttle,
    section1header,
    section1para,
    section1subhead1,
    section1subpara1,
    section1subhead2,
    section1subpara2,
    section1subhead3,
    section1subpara3,
    section1txt,
    section2title,
    section2header,
    section2para,
    section2subhead1,
    section2subhead2,
    section2subpara1,
    section2subhead3,
    section2subpara2,
    section2subhead4,
    section2subpara3,
    section2txt,
    section3title,
    section3header,
    section3para,
    section3subhead1,
    section3subpara1,
    section3subhead2,
    section3subpara2,
    section3subhead3,
    section3subpara3,
    cardheader,
    cardtitle,
  } = req.body;
  const formData = {
    heroheader,
    heropara,
    section1ttle,
    section1header,
    section1para,
    section1subhead1,
    section1subpara1,
    section1subhead2,
    section1subpara2,
    section1subhead3,
    section1subpara3,
    section1txt,
    section2title,
    section2header,
    section2para,
    section2subhead1,
    section2subhead2,
    section2subpara1,
    section2subhead3,
    section2subpara2,
    section2subhead4,
    section2subpara3,
    section2txt,
    section3title,
    section3header,
    section3para,
    section3subhead1,
    section3subpara1,
    section3subhead2,
    section3subpara2,
    section3subhead3,
    section3subpara3,
    cardheader,
    cardtitle,
  };
  connection.query(
    "INSERT INTO productdesign SET ?",
    formData,
    (err, result) => {
      if (err) throw err;
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
    }
  );
};
const getServicepage2 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheader,
    heropara,
    section1itle,
    section1header,
    section1para,
    section1subhead1,
    section1subhead2,
    section1subhead3,
    section1subhead4,
    section1subhead5,
    section2title,
    section2header,
    section2para,
    section2subhead1,
    section2subpara1,
    section2subhead2,
    section2subpara2,
    section2subhead3,
    section2subpara3,
    section3title,
    section3header,
    section3para,
    section3subhead1,
    section3subpara1,
    section3subhead2,
    section3subpara2,
    section3subhead3,
    section3subpara3,
    section3txt,
    section4title,
    section4header,
    section4para,
    section4subhead1,
    section4subpara1,
    section4subhead2,
    section4subpara2,
    section4subhead3,
    section4subpara3,
    section4txt,
    section5title,
    section5header,
    section5para,
    section5subhead1,
    section5subpara1,
    section5subhead2,
    section5subpara2,
    section5subhead3,
    section5subpara3,
    cardtitle,
  } = req.body;
  const formData = {
    heroheader,
    heropara,
    section1itle,
    section1header,
    section1para,
    section1subhead1,
    section1subhead2,
    section1subhead3,
    section1subhead4,
    section1subhead5,
    section2title,
    section2header,
    section2para,
    section2subhead1,
    section2subpara1,
    section2subhead2,
    section2subpara2,
    section2subhead3,
    section2subpara3,
    section3title,
    section3header,
    section3para,
    section3subhead1,
    section3subpara1,
    section3subhead2,
    section3subpara2,
    section3subhead3,
    section3subpara3,
    section3txt,
    section4title,
    section4header,
    section4para,
    section4subhead1,
    section4subpara1,
    section4subhead2,
    section4subpara2,
    section4subhead3,
    section4subpara3,
    section4txt,
    section5title,
    section5header,
    section5para,
    section5subhead1,
    section5subpara1,
    section5subhead2,
    section5subpara2,
    section5subhead3,
    section5subpara3,
    cardtitle,
  };
  connection.query("INSERT INTO appdev SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage3 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheader,
    heropara,
    section1title,
    section1header,
    section1subhead1,
    section1subhead2,
    section1subhead3,
    section1subpara1,
    section1subpara2,
    section1subpara3,
    section1para,
    section2title,
    section2header,
    section2para,
    section2subhead1,
    section2subhead2,
    section2subhead3,
    section2subpara1,
    section2subpara2,
    section2subpara3,
    sectiontitle3,
    sectionheader3,
    sectionpara3,
    sectionsubhead31,
    sectionsubpara31,
    sectionsubhead32,
    sectionsubpara32,
    sectionsubhead33,
    sectionsubpara33,
    sectiontxt3,
    sectiontitle4,
    sectionheader4,
    sectionpara4,
    sectionsubhead41,
    sectionsubpara41,
    sectionsubhead42,
    sectionsubpara42,
    sectionsubhead43,
    sectionsubpara43,
    sectiontitle5,
    sectionheader5,
    sectionpara5,
    sectionsubhead51,
    sectionsubpara51,
    sectionsubhead52,
    sectionsubpara52,
    sectionsubhead53,
    sectionsubpara53,
    sectiontitle6,
    sectionheader6,
    sectionpara6,
    sectionsubhead61,
    sectionsubpara61,
    sectionsubhead62,
    sectionsubpara62,
    sectionsubhead63,
    sectionsubpara63,
    sectiontxt6,
    sectiontitle7,
    sectionheader7,
    sectionpara7,
    sectionsubhead71,
    sectionsubpara71,
    sectionsubhead72,
    sectionsubpara72,
    sectionsubhead73,
    sectionsubpara73,
    sectiontitle8,
    sectionheader8,
    sectionsubhead81,
    sectionsubpara81,
    sectionsubhead82,
    sectionsubpara82,
    sectionsubhead83,
    sectionsubpara83,
    sectionpara8,
    cardtxt,
  } = req.body;
  const formData = {
    heroheader,
    heropara,
    section1title,
    section1header,
    section1subhead1,
    section1subhead2,
    section1subhead3,
    section1subpara1,
    section1subpara2,
    section1subpara3,
    section1para,
    section2title,
    section2header,
    section2para,
    section2subhead1,
    section2subhead2,
    section2subhead3,
    section2subpara1,
    section2subpara2,
    section2subpara3,
    sectiontitle3,
    sectionheader3,
    sectionpara3,
    sectionsubhead31,
    sectionsubpara31,
    sectionsubhead32,
    sectionsubpara32,
    sectionsubhead33,
    sectionsubpara33,
    sectiontxt3,
    sectiontitle4,
    sectionheader4,
    sectionpara4,
    sectionsubhead41,
    sectionsubpara41,
    sectionsubhead42,
    sectionsubpara42,
    sectionsubhead43,
    sectionsubpara43,
    sectiontitle5,
    sectionheader5,
    sectionpara5,
    sectionsubhead51,
    sectionsubpara51,
    sectionsubhead52,
    sectionsubpara52,
    sectionsubhead53,
    sectionsubpara53,
    sectiontitle6,
    sectionheader6,
    sectionpara6,
    sectionsubhead61,
    sectionsubpara61,
    sectionsubhead62,
    sectionsubpara62,
    sectionsubhead63,
    sectionsubpara63,
    sectiontxt6,
    sectiontitle7,
    sectionheader7,
    sectionpara7,
    sectionsubhead71,
    sectionsubpara71,
    sectionsubhead72,
    sectionsubpara72,
    sectionsubhead73,
    sectionsubpara73,
    sectiontitle8,
    sectionheader8,
    sectionsubhead81,
    sectionsubpara81,
    sectionsubhead82,
    sectionsubpara82,
    sectionsubhead83,
    sectionsubpara83,
    sectionpara8,
    cardtxt,
  };
  connection.query("INSERT INTO tech SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage4 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheader,
    heropara,
    sectiontitle1,
    sectionheader1,
    sectionpara1,
    sectionsubhead11,
    sectionpara11,
    sectionsubhead12,
    sectionpara12,
    sectionsubhead13,
    sectionpara13,
    sectiontitle2,
    sectionheader2,
    sectionpara2,
    sectionsubhead21,
    sectionpara21,
    sectionsubhead22,
    sectionpara22,
    sectionsubhead23,
    sectionpara23,
    sectiontitle3,
    sectionheader3,
    sectionpara3,
    sectionsubhead31,
    sectionpara31,
    sectionsubhead32,
    sectionpara32,
    sectionsubhead33,
    sectionpara33,
    sectiontitle4,
    sectionheader4,
    sectionpara4,
    sectionsubhead41,
    sectionpara41,
    sectionsubhead42,
    sectionpara42,
    sectionsubhead43,
    sectionpara43,
    sectiontitle5,
    sectionheader5,
    sectionpara5,
    sectionsubhead51,
    sectionpara51,
    sectionsubhead52,
    sectionpara52,
    sectionsubhead53,
    sectionpara53,
    cardtxt,
  } = req.body;
  const formData = {
    heroheader,
    heropara,
    sectiontitle1,
    sectionheader1,
    sectionpara1,
    sectionsubhead11,
    sectionpara11,
    sectionsubhead12,
    sectionpara12,
    sectionsubhead13,
    sectionpara13,
    sectiontitle2,
    sectionheader2,
    sectionpara2,
    sectionsubhead21,
    sectionpara21,
    sectionsubhead22,
    sectionpara22,
    sectionsubhead23,
    sectionpara23,
    sectiontitle3,
    sectionheader3,
    sectionpara3,
    sectionsubhead31,
    sectionpara31,
    sectionsubhead32,
    sectionpara32,
    sectionsubhead33,
    sectionpara33,
    sectiontitle4,
    sectionheader4,
    sectionpara4,
    sectionsubhead41,
    sectionpara41,
    sectionsubhead42,
    sectionpara42,
    sectionsubhead43,
    sectionpara43,
    sectiontitle5,
    sectionheader5,
    sectionpara5,
    sectionsubhead51,
    sectionpara51,
    sectionsubhead52,
    sectionpara52,
    sectionsubhead53,
    sectionpara53,
    cardtxt,
  };
  connection.query("INSERT INTO AI SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage5 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheader,
    heropara,
    sectiontitle1,
    sectionheader1,
    sectionpara1,
    sectionsubhead1,
    sectionsubhead2,
    sectionsubhead3,
    sectionsubhead4,
    sectionsubhead5,
    sectionsubhead6,
    sectionsubhead7,
    sectionsubhead8,
    sectionsubhead9,
    sectionsubhead10,
    sectionsubpara1,
    sectionsubpara2,
    sectionsubpara3,
    sectionsubpara4,
    sectionsubpara5,
    sectionsubpara6,
    sectionsubpara7,
    sectionsubpara8,
    sectionsubpara9,
    sectionsubpara10,
    sectionttxt,
    cardtxt,
  } = req.body;
  const formData = {
    heroheader,
    heropara,
    sectiontitle1,
    sectionheader1,
    sectionpara1,
    sectionsubhead1,
    sectionsubhead2,
    sectionsubhead3,
    sectionsubhead4,
    sectionsubhead5,
    sectionsubhead6,
    sectionsubhead7,
    sectionsubhead8,
    sectionsubhead9,
    sectionsubhead10,
    sectionsubpara1,
    sectionsubpara2,
    sectionsubpara3,
    sectionsubpara4,
    sectionsubpara5,
    sectionsubpara6,
    sectionsubpara7,
    sectionsubpara8,
    sectionsubpara9,
    sectionsubpara10,
    sectionttxt,
    cardtxt,
  };
  connection.query("INSERT INTO ecommerce SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage6 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheader,
    heropara,
    sectiontxt,
    cardtxt,
    sectiontitle1,
    sectiontitle2,
    sectiontitle3,
    sectiontitle4,
    sectiontitle5,
    sectionheader1,
    sectionheader2,
    sectionheader3,
    sectionheader4,
    sectionheader5,
    sectionpara1,
    sectionpara2,
    sectionpara3,
    sectionpara4,
    sectionpara5,
    sectionsubhead1,
    sectionsubhead2,
    sectionsubhead3,
    sectionsubhead4,
    sectionsubhead5,
    sectionsubhead6,
    sectionsubhead7,
    sectionsubhead8,
    sectionsubhead9,
    sectionsubhead10,
    sectionsubhead11,
    sectionsubhead12,
    sectionsubhead13,
    sectionsubhead14,
    sectionsubhead15,
    sectionsubpara1,
    sectionsubpara2,
    sectionsubpara3,
    sectionsubpara4,
    sectionsubpara5,
    sectionsubpara6,
    sectionsubpara7,
    sectionsubpara8,
    sectionsubpara9,
    sectionsubpara10,
    sectionsubpara11,
    sectionsubpara12,
    sectionsubpara13,
    sectionsubpara14,
    sectionsubpara15,
  } = req.body;
  const formData = {
    heroheader,
    heropara,
    sectiontxt,
    cardtxt,
    sectiontitle1,
    sectiontitle2,
    sectiontitle3,
    sectiontitle4,
    sectiontitle5,
    sectionheader1,
    sectionheader2,
    sectionheader3,
    sectionheader4,
    sectionheader5,
    sectionpara1,
    sectionpara2,
    sectionpara3,
    sectionpara4,
    sectionpara5,
    sectionsubhead1,
    sectionsubhead2,
    sectionsubhead3,
    sectionsubhead4,
    sectionsubhead5,
    sectionsubhead6,
    sectionsubhead7,
    sectionsubhead8,
    sectionsubhead9,
    sectionsubhead10,
    sectionsubhead11,
    sectionsubhead12,
    sectionsubhead13,
    sectionsubhead14,
    sectionsubhead15,
    sectionsubpara1,
    sectionsubpara2,
    sectionsubpara3,
    sectionsubpara4,
    sectionsubpara5,
    sectionsubpara6,
    sectionsubpara7,
    sectionsubpara8,
    sectionsubpara9,
    sectionsubpara10,
    sectionsubpara11,
    sectionsubpara12,
    sectionsubpara13,
    sectionsubpara14,
    sectionsubpara15,
  };
  connection.query("INSERT INTO cloud SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage7 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    header,
    header1,
    header2,
    header3,
    header4,
    header5,
    para,
    para1,
    para2,
    para3,
    para4,
    para5,
    text1,
    text2,
    cardtxt,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subhead10,
    subhead11,
    subhead12,
    subhead13,
    subhead14,
    subhead15,
    subhead16,
    subhead17,
    subhead18,
    subhead19,
    subhead20,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
    subpara10,
    subpara11,
    subpara12,
    subpara13,
    subpara14,
    title1,
    title2,
    title3,
    title4,
    title5,
  } = req.body;
  const formData = {
    header,
    header1,
    header2,
    header3,
    header4,
    header5,
    para,
    para1,
    para2,
    para3,
    para4,
    para5,
    text1,
    text2,
    cardtxt,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subhead10,
    subhead11,
    subhead12,
    subhead13,
    subhead14,
    subhead15,
    subhead16,
    subhead17,
    subhead18,
    subhead19,
    subhead20,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
    subpara10,
    subpara11,
    subpara12,
    subpara13,
    subpara14,
    title1,
    title2,
    title3,
    title4,
    title5,
  };
  connection.query("INSERT INTO gamedev SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage8 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    header1,
    header2,
    header3,
    header4,
    header5,
    header6,
    header7,
    para1,
    para2,
    para3,
    para4,
    para5,
    para6,
    para7,
    title1,
    title2,
    title3,
    title4,
    title5,
    title6,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subhead10,
    subhead11,
    subhead12,
    subhead13,
    subhead14,
    subhead15,
    subhead16,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
    subpara10,
    subpara11,
    subpara12,
    subpara13,
    subpara14,
    subpara15,
    subpara16,
    subpara17,
    subpara18,
    subhead17,
    subhead18,
    txt1,
    txt2,
    txt3,
    card,
  } = req.body;
  const formData = {
    header1,
    header2,
    header3,
    header4,
    header5,
    header6,
    header7,
    para1,
    para2,
    para3,
    para4,
    para5,
    para6,
    para7,
    title1,
    title2,
    title3,
    title4,
    title5,
    title6,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subhead10,
    subhead11,
    subhead12,
    subhead13,
    subhead14,
    subhead15,
    subhead16,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
    subpara10,
    subpara11,
    subpara12,
    subpara13,
    subpara14,
    subpara15,
    subpara16,
    subpara17,
    subpara18,
    subhead17,
    subhead18,
    txt1,
    txt2,
    txt3,
    card,
  };
  connection.query("INSERT INTO arvr SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage9 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    header1,
    header2,
    para1,
    para2,
    title,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    txt,
    card,
  } = req.body;
  const formData = {
    header1,
    header2,
    para1,
    para2,
    title,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    txt,
    card,
  };
  connection.query("INSERT INTO lowcode SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage10 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    header,
    header1,
    header2,
    header3,
    header4,
    header5,
    header6,
    para,
    para1,
    para2,
    para3,
    para4,
    para5,
    para6,
    title1,
    title2,
    title3,
    title4,
    title5,
    title6,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subhead10,
    subhead11,
    subhead12,
    subhead13,
    subhead14,
    subhead15,
    subhead16,
    subhead17,
    subhead18,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
    subpara10,
    subpara11,
    subpara12,
    subpara13,
    subpara14,
    subpara15,
    subpara16,
    subpara17,
    subpara18,
    text,
    card,
  } = req.body;
  const formData = {
    header,
    header1,
    header2,
    header3,
    header4,
    header5,
    header6,
    para,
    para1,
    para2,
    para3,
    para4,
    para5,
    para6,
    title1,
    title2,
    title3,
    title4,
    title5,
    title6,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subhead10,
    subhead11,
    subhead12,
    subhead13,
    subhead14,
    subhead15,
    subhead16,
    subhead17,
    subhead18,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
    subpara10,
    subpara11,
    subpara12,
    subpara13,
    subpara14,
    subpara15,
    subpara16,
    subpara17,
    subpara18,
    text,
    card,
  };
  connection.query("INSERT INTO salesforce SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage11 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    header,
    header1,
    header2,
    header3,
    header4,
    para,
    para1,
    para2,
    para3,
    para4,
    title1,
    title2,
    title3,
    title4,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subhead10,
    subhead11,
    subhead12,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
    subpara10,
    subpara11,
    subpara12,
    txt,
    card,
  } = req.body;
  const formData = {
    header,
    header1,
    header2,
    header3,
    header4,
    para,
    para1,
    para2,
    para3,
    para4,
    title1,
    title2,
    title3,
    title4,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subhead10,
    subhead11,
    subhead12,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
    subpara10,
    subpara11,
    subpara12,
    txt,
    card,
  };
  connection.query("INSERT INTO sharepoint SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getServicepage12 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    header,
    header2,
    para1,
    para2,
    title,
    text,
    card,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
  } = req.body;
  const formData = {
    header,
    header2,
    para1,
    para2,
    title,
    text,
    card,
    subhead1,
    subhead2,
    subhead3,
    subhead4,
    subhead5,
    subhead6,
    subhead7,
    subhead8,
    subhead9,
    subpara1,
    subpara2,
    subpara3,
    subpara4,
    subpara5,
    subpara6,
    subpara7,
    subpara8,
    subpara9,
  };
  connection.query("INSERT INTO quality SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData1 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    header,
    para,
    title1,
    text1,
    title2,
    text2,
    text3,
    text4,
    text5,
    problem,
    header1,
    para1,
    header2,
    para2,
    text6,
  } = req.body;
  const formData = {
    header,
    para,
    title1,
    text1,
    title2,
    text2,
    text3,
    text4,
    text5,
    problem,
    header1,
    para1,
    header2,
    para2,
    text6,
  };
  connection.query("INSERT INTO sea SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData2 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    header1,
    para1,
    title1,
    text1,
    title2,
    text2,
    title3,
    text3,
    title4,
    text4,
    text5,
    text6,
    text7,
    text8,
    problem,
    para2,
    header2,
    title5,
    text9,
    title6,
    text10,
    title7,
    text11,
    blurheader,
    blurtext,
  } = req.body;
  const formData = {
    header1,
    para1,
    title1,
    text1,
    title2,
    text2,
    title3,
    text3,
    title4,
    text4,
    text5,
    text6,
    text7,
    text8,
    problem,
    para2,
    header2,
    title5,
    text9,
    title6,
    text10,
    title7,
    text11,
    blurheader,
    blurtext,
  };
  connection.query("INSERT INTO trade SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData3 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    hero,
    about,
    ach1,
    field1,
    ach2,
    field2,
    ach3,
    field3,
    sectitle1,
    seccont1,
    sectitle2,
    seccont2,
    seccont3,
    seccont4,
    seccont5,
    seccont6,
    sectitle3,
    seccont7,
    seccont8,
    seccont9,
    seccont10,
    seccont11,
    seccont12,
    seccont13,
    seccont14,
    seccont15,
    seccont16,
    problem,
    wedoheader,
    wedopara,
    wedoach1,
    wedocont1,
    wedoach2,
    wedocont2,
    applicationhead,
    blursectionhead,
    blursectionpara,
    apptitle1,
    apptitle2,
    apptitle3,
    apptitle4,
    apptitle5,
    apptitle6,
    apptitle7,
    apptitle8,
    apptitle9,
    apptitle10,
    apphead1,
    apphead2,
    apphead3,
    apphead4,
    apphead5,
    apphead6,
    apphead7,
    apphead8,
    apphead9,
    apphead10,
    apppara1,
    apppara2,
    apppara3,
    apppara4,
    apppara5,
    apppara6,
    apppara7,
    apppara8,
    apppara9,
    apppara10,
  } = req.body;
  const formData = {
    hero,
    about,
    ach1,
    field1,
    ach2,
    field2,
    ach3,
    field3,
    sectitle1,
    seccont1,
    sectitle2,
    seccont2,
    seccont3,
    seccont4,
    seccont5,
    seccont6,
    sectitle3,
    seccont7,
    seccont8,
    seccont9,
    seccont10,
    seccont11,
    seccont12,
    seccont13,
    seccont14,
    seccont15,
    seccont16,
    problem,
    wedoheader,
    wedopara,
    wedoach1,
    wedocont1,
    wedoach2,
    wedocont2,
    applicationhead,
    blursectionhead,
    blursectionpara,
    apptitle1,
    apptitle2,
    apptitle3,
    apptitle4,
    apptitle5,
    apptitle6,
    apptitle7,
    apptitle8,
    apptitle9,
    apptitle10,
    apphead1,
    apphead2,
    apphead3,
    apphead4,
    apphead5,
    apphead6,
    apphead7,
    apphead8,
    apphead9,
    apphead10,
    apppara1,
    apppara2,
    apppara3,
    apppara4,
    apppara5,
    apppara6,
    apppara7,
    apppara8,
    apppara9,
    apppara10,
  };
  connection.query("INSERT INTO sdu SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData4 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheader,
    about,
    ach1,
    field1,
    sectitle1,
    seccont1,
    sectitle2,
    seccont11,
    seccont2,
    seccont3,
    seccont4,
    problem,
    wedoheading,
    wedopara,
    wedoach1,
    wedofield1,
    wedoaci2,
    wedofield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheader,
    about,
    ach1,
    field1,
    sectitle1,
    seccont1,
    sectitle2,
    seccont11,
    seccont2,
    seccont3,
    seccont4,
    problem,
    wedoheading,
    wedopara,
    wedoach1,
    wedofield1,
    wedoaci2,
    wedofield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO vacaystay SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData5 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    content1,
    title2,
    content2,
    content3,
    conten4,
    content5,
    problem,
    weheading,
    wepara,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    content1,
    title2,
    content2,
    content3,
    conten4,
    content5,
    problem,
    weheading,
    wepara,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO contrasted SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData6 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    ach1,
    field1,
    ach2,
    field2,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    ach1,
    field1,
    ach2,
    field2,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO kanbar SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData7 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    ach1,
    field1,
    ach2,
    field2,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    cont8,
    cont9,
    cont10,
    cont11,
    cont12,
    cont13,
    cont14,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    appheading,
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    weheadining1,
    weheadining2,
    weheadining3,
    weheadining4,
    weheadining5,
    weheadining6,
    wepara1,
    wepara2,
    wepara3,
    wepara4,
    wepara5,
    wepara6,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    ach1,
    field1,
    ach2,
    field2,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    cont8,
    cont9,
    cont10,
    cont11,
    cont12,
    cont13,
    cont14,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    appheading,
    number1,
    number2,
    number3,
    number4,
    number5,
    number6,
    weheadining1,
    weheadining2,
    weheadining3,
    weheadining4,
    weheadining5,
    weheadining6,
    wepara1,
    wepara2,
    wepara3,
    wepara4,
    wepara5,
    wepara6,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO wearwell SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData8 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    ach1,
    field1,
    title1,
    title2,
    title3,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    cont8,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    ach1,
    field1,
    title1,
    title2,
    title3,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    cont8,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO leafandhive SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData9 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    title3,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    title3,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO imapac SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData10 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO klass SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData11 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    title3,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    cont8,
    cont9,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    title3,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    cont8,
    cont9,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO william SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData12 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO vouri SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData13 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    title3,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    cont8,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    title3,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    cont8,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO homesrus SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData14 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    problem,
    weheading,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    cont7,
    problem,
    weheading,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO landmark SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData15 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    ach1,
    field1,
    ach2,
    field2,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    ach1,
    field1,
    ach2,
    field2,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO klub SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData16 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    weach3,
    wefield1,
    wefield2,
    wefield3,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    weach3,
    wefield1,
    wefield2,
    wefield3,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO kernal SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData17 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    weach1,
    weach2,
    weach3,
    wefield1,
    wefield2,
    wefield3,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    weach1,
    weach2,
    weach3,
    wefield1,
    wefield2,
    wefield3,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO hinge SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData18 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    ach1,
    field1,
    ach2,
    field2,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    weach1,
    weach12,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    ach1,
    field1,
    ach2,
    field2,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    weach1,
    weach12,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO cowboycase SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData19 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO deel SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData20 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    weach3,
    wefield1,
    wefield2,
    wefield3,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    weach3,
    wefield1,
    wefield2,
    wefield3,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO convoy SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData21 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    weafield1,
    weafield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    weafield1,
    weafield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO lyracase SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData22 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    cont6,
    problem,
    weheading,
    wepara,
    weach1,
    weach2,
    wefield1,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO middle SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData23 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO course SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData24 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO mica SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData25 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO litup SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData26 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO sodashi SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData27 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO steelcase SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData28 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    problem,
    weheading,
    wepoint1,
    wepoint2,
    wepoint3,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    problem,
    weheading,
    wepoint1,
    wepoint2,
    wepoint3,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO stdio SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData29 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepoint1,
    wepoint2,
    wepoint3,
    weach1,
    wefield1,
    weach2,
    wefield2,
    weach3,
    wefield3,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepoint1,
    wepoint2,
    wepoint3,
    weach1,
    wefield1,
    weach2,
    wefield2,
    weach3,
    wefield3,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO moviework SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData30 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    cont5,
    problem,
    weheading,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO soch SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData31 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    wedoheading,
    wedopara,
    wedopoint1,
    wedopoint2,
    wedopoint3,
    wedopoint4,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    wedoheading,
    wedopara,
    wedopoint1,
    wedopoint2,
    wedopoint3,
    wedopoint4,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO mangocase SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData32 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    problem,
    weheading,
    wepoint1,
    wepoint2,
    wepoint3,
    wepoint4,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    problem,
    weheading,
    wepoint1,
    wepoint2,
    wepoint3,
    wepoint4,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO wilder SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData33 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO booking SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};
const getCaseStudyPageData34 = (req, res) => {
  connection.getConnection((err) => {
    if (err) {
      console.log(err);
    } else {
    }
  });
  const {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  } = req.body;
  const formData = {
    heroheading,
    about,
    title1,
    title2,
    cont1,
    cont2,
    cont3,
    cont4,
    problem,
    weheading,
    wepara,
    weach1,
    wefield1,
    weach2,
    wefield2,
    blurheading,
    blurpara,
  };
  connection.query("INSERT INTO ikea SET ?", formData, (err, result) => {
    if (err) throw err;
    console.log("Form data inserted:", result);
    res.send("Form submitted successfully");
  });
};

module.exports = {
  sendMailContact,
  displayImages,
  getMailData,
  displayMailData,
  getHomeHeroHeaderData,
  displayHomeHeroHeaderData,
  getHomeHeroCase1Data,
  displayHomeHeroCase1Data,
  getHomeHeroCase2Data,
  displayHomeHeroCase2Data,
  getHomeHeroCase3Data,
  displayHomeHeroCase3Data,
  getHomeHeroCase4Data,
  displayHomeHeroCase4Data,
  getHomeHeroCase5Data,
  displayHomeHeroCase5Data,
  getHomeVisionHeaderData,
  displayHomeVisionHeaderData,
  getHomeDigitalTransformationData,
  displayHomeDigitalTransformationData,
  getHomeProductEngineeringData,
  displayHomeProductEngineeringData,
  getHomeTechnologyConsultingData,
  displayHomeTechnlogyConsultingData,
  getHomeAboutData,
  displayHomeAboutData,
  getHomeServiceData,
  displayHomeServiceData,
  getHomeService1Data,
  displayHomeService1Data,
  getHomeService2Data,
  displayHomeService2Data,
  displayHomeService3Data,
  displayHomeService4Data,
  displayHomeService5Data,
  displayHomeService6Data,
  displayHomeService7Data,
  displayHomeService8Data,
  displayHomeService9Data,
  displayHomeService10Data,
  displayHomeService11Data,
  displayHomeService12Data,
  getHomeService3Data,
  getHomeService4Data,
  getHomeService5Data,
  getHomeService6Data,
  getHomeService7Data,
  getHomeService8Data,
  getHomeService9Data,
  getHomeService10Data,
  getHomeService11Data,
  getHomeService12Data,
  getHomeCaseStudy1Data,
  getHomeCaseStudy2Data,
  getHomeCaseStudy3Data,
  getHomeCaseStudy4Data,
  getHomeCaseStudy5Data,
  displayHomeCaseStudy1Data,
  displayHomeCaseStudy2Data,
  displayHomeCaseStudy3Data,
  displayHomeCaseStudy4Data,
  displayHomeCaseStudy5Data,
  getHomeClientData,
  displayHomeClientData,
  getHomeIndustriesData,
  getHomeIndustriesData1,
  getHomeIndustriesData2,
  getHomeIndustriesData3,
  getHomeIndustriesData4,
  getHomeIndustriesData5,
  getHomeIndustriesData6,
  getHomeIndustriesData7,
  getHomeIndustriesData8,
  getHomeIndustriesData9,
  getHomeIndustriesData10,
  displayHomeIndustriesData,
  displayHomeIndustriesData1,
  displayHomeIndustriesData2,
  displayHomeIndustriesData3,
  displayHomeIndustriesData4,
  displayHomeIndustriesData5,
  displayHomeIndustriesData6,
  displayHomeIndustriesData7,
  displayHomeIndustriesData8,
  displayHomeIndustriesData9,
  displayHomeIndustriesData10,
  getHomeBlogData,
  getHomeBlogData1,
  getHomeBlogData2,
  getHomeBlogData3,
  getHomeBlogData4,
  getHomeBlogData5,
  getHomeBlogData6,
  getHomeBlogData7,
  getHomeBlogData8,
  getHomeBlogData9,
  getHomeBlogData10,
  getHomeBlogData11,
  getHomeBlogData12,
  getHomeBlogData13,
  getHomeBlogData14,
  getHomeBlogData15,
  getHomeBlogData16,
  getHomeBlogData17,
  getBlogHeaderData,
  displayHomeBlogData,
  displayHomeBlogData1,
  displayHomeBlogData2,
  displayHomeBlogData3,
  displayHomeBlogData4,
  displayHomeBlogData5,
  displayHomeBlogData6,
  displayHomeBlogData7,
  displayHomeBlogData8,
  displayHomeBlogData9,
  displayHomeBlogData10,
  displayHomeBlogData11,
  displayHomeBlogData12,
  displayHomeBlogData13,
  displayHomeBlogData14,
  displayHomeBlogData15,
  displayHomeBlogData16,
  displayHomeBlogData17,
  displayBlogHeaderData,
  getHomeCompanyData,
  displayHomeCompanyData,
  getHomeAddressData,
  displayHomeAddressData,
  getHomeContactData,
  displayHomeContactData,
  getServiceHeaderData,
  displayServiceHeaderData,
  getService1Data,
  getService2Data,
  getService3Data,
  getService4Data,
  getService5Data,
  getService6Data,
  getService7Data,
  getService8Data,
  getService9Data,
  getService10Data,
  getService11Data,
  getService12Data,
  displayService1Data,
  displayService2Data,
  displayService3Data,
  displayService4Data,
  displayService5Data,
  displayService6Data,
  displayService7Data,
  displayService8Data,
  displayService9Data,
  displayService10Data,
  displayService11Data,
  displayService12Data,
  getAboutHeaderData,
  getAboutVisionData,
  getAboutOurVisonData,
  getAboutGuidingData,
  getAboutGuidingContentData,
  getAboutCommitmentData,
  getAboutCommitment1Data,
  getAboutCommitment2Data,
  getAboutCommitment3Data,
  getAboutCommitment4Data,
  getAboutCommitment5Data,
  getAboutCommitment6Data,
  getAboutCommitment7Data,
  getAboutCommitment8Data,
  displayAboutCommitmentData,
  displayAboutCommitment1Data,
  displayAboutCommitment2Data,
  displayAboutCommitment3Data,
  displayAboutCommitment4Data,
  displayAboutCommitment5Data,
  displayAboutCommitment6Data,
  displayAboutCommitment7Data,
  displayAboutCommitment8Data,
  displayAboutHeaderData,
  displayAboutVisionData,
  displayAboutOurVisonData,
  displayAboutGuidingData,
  displayAboutGuidingContentData,
  getIndustryHeaderData,
  getIndustryGreyData,
  displayIndustryHeaderData,
  displayIndustryGreyData,
  getIndustry1Data,
  getIndustry2Data,
  getIndustry3Data,
  getIndustry4Data,
  getIndustry5Data,
  getIndustry6Data,
  getIndustry7Data,
  getIndustry8Data,
  getIndustry9Data,
  getIndustry10Data,
  displayIndustry1Data,
  displayIndustry10Data,
  displayIndustry2Data,
  displayIndustry3Data,
  displayIndustry4Data,
  displayIndustry5Data,
  displayIndustry6Data,
  displayIndustry7Data,
  displayIndustry8Data,
  displayIndustry9Data,
  getCaseStudyData,
  getCaseStudyData1,
  getCaseStudyData2,
  getCaseStudyData3,
  getCaseStudyData4,
  getCaseStudyData5,
  getCaseStudyData6,
  getCaseStudyData7,
  getCaseStudyData8,
  getCaseStudyData9,
  getCaseStudyData10,
  getCaseStudyData11,
  getCaseStudyData12,
  getCaseStudyData13,
  getCaseStudyData14,
  getCaseStudyData15,
  getCaseStudyData16,
  getCaseStudyData17,
  getCaseStudyData18,
  getCaseStudyData19,
  getCaseStudyData20,
  getCaseStudyData21,
  getCaseStudyData22,
  getCaseStudyData23,
  getCaseStudyData24,
  getCaseStudyData25,
  getCaseStudyData26,
  getCaseStudyData27,
  getCaseStudyData28,
  getCaseStudyData29,
  getCaseStudyData30,
  getCaseStudyData31,
  getCaseStudyData32,
  getCaseStudyData33,
  getCaseStudyData34,
  displayCaseStudyHeaderData,
  getCareerHeaderData,
  displayCareerHeaderData,
  getCareerPos1Data,
  displayCareerpos1Data,
  getContactData,
  displayContactData,
  sendMail,
  getAdminData,
  deleteAdminData,
  deletePositionData,
  displayAdminData,
  displayServicePage1Data,
  displayServicePage2Data,
  displayServicePage3Data,
  displayServicePage4Data,
  displayServicePage5Data,
  displayServicePage6Data,
  displayServicePage7Data,
  displayServicePage8Data,
  displayServicePage9Data,
  displayServicePage10Data,
  displayServicePage11Data,
  displayServicePage12Data,
  displayCaseStudyPage1,
  displayCaseStudyPage2,
  displayCaseStudyPage3,
  displayCaseStudyPage4,
  displayCaseStudyPage5,
  displayCaseStudyPage6,
  displayCaseStudyPage7,
  displayCaseStudyPage8,
  displayCaseStudyPage9,
  displayCaseStudyPage10,
  displayCaseStudyPage11,
  displayCaseStudyPage12,
  displayCaseStudyPage13,
  displayCaseStudyPage14,
  displayCaseStudyPage15,
  displayCaseStudyPage16,
  displayCaseStudyPage17,
  displayCaseStudyPage18,
  displayCaseStudyPage19,
  displayCaseStudyPage20,
  displayCaseStudyPage21,
  displayCaseStudyPage22,
  displayCaseStudyPage23,
  displayCaseStudyPage24,
  displayCaseStudyPage25,
  displayCaseStudyPage26,
  displayCaseStudyPage27,
  displayCaseStudyPage28,
  displayCaseStudyPage29,
  displayCaseStudyPage30,
  displayCaseStudyPage31,
  displayCaseStudyPage32,
  displayCaseStudyPage33,
  displayCaseStudyPage34,
  getServicepage1,
  getServicepage2,
  getServicepage3,
  getServicepage4,
  getServicepage5,
  getServicepage6,
  getServicepage7,
  getServicepage8,
  getServicepage9,
  getServicepage10,
  getServicepage11,
  getServicepage12,
  getCaseStudyPageData1,
  getCaseStudyPageData2,
  getCaseStudyPageData3,
  getCaseStudyPageData4,
  getCaseStudyPageData5,
  getCaseStudyPageData6,
  getCaseStudyPageData7,
  getCaseStudyPageData8,
  getCaseStudyPageData9,
  getCaseStudyPageData10,
  getCaseStudyPageData11,
  getCaseStudyPageData12,
  getCaseStudyPageData13,
  getCaseStudyPageData14,
  getCaseStudyPageData15,
  getCaseStudyPageData16,
  getCaseStudyPageData17,
  getCaseStudyPageData18,
  getCaseStudyPageData19,
  getCaseStudyPageData20,
  getCaseStudyPageData21,
  getCaseStudyPageData22,
  getCaseStudyPageData23,
  getCaseStudyPageData24,
  getCaseStudyPageData25,
  getCaseStudyPageData26,
  getCaseStudyPageData27,
  getCaseStudyPageData28,
  getCaseStudyPageData29,
  getCaseStudyPageData30,
  getCaseStudyPageData31,
  getCaseStudyPageData32,
  getCaseStudyPageData33,
  getCaseStudyPageData34,
};
