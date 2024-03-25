const nodemailer = require("nodemailer");
var validator = require("node-email-validation");
const mysql = require("mysql");
const { response } = require("express");
const multer = require("multer");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 60 * 60 });

const pool = mysql.createPool({
  host: "217.21.87.205",
  user: "u947451844_saif08",
  password: "u]1ro&X$1R",
  database: "u947451844_pages",
});

const executeQuery = (sql, params, callback) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to database:", err);
      callback(err, null);
    } else {
      connection.query(sql, params, (err, results) => {
        connection.release();
        if (err) {
          console.error("Error executing query:", err);
          callback(err, null);
        } else {
          callback(null, results);
        }
      });
    }
  });
};

const fetchDataByTableName = (tableName) => (req, res) => {
  const cacheKey = `${tableName}_data`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Data retrieved from cache");
    return res.send(cachedData);
  }
  const sql = `SELECT * FROM ${tableName}`;
  executeQuery(sql, null, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving data from database");
      return;
    }
    cache.set(cacheKey, results);
    res.send(results);
  });
};

const invalidateCacheForTable = (tableName) => {
  const cacheKey = `${tableName}_data`;
  cache.del(cacheKey);
};

const insertDataIntoTable = (tableName) => (req, res) => {
  const formData = req.body;
  const sql = `INSERT INTO ${tableName} SET ?`;
  executeQuery(sql, formData, (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).send("Error inserting data into database");
    } else {
      console.log("Form data inserted:", result);
      res.send("Form submitted successfully");
      invalidateCacheForTable(tableName);
    }
  });
};
const deleteDataByColumnName = (tableName, columnName) => (req, res) => {
  const { value } = req.body;

  const sql = `DELETE FROM ${tableName} WHERE ${columnName} = ?`;
  executeQuery(sql, [value], (err, result) => {
    if (err) {
      console.error(`Error deleting data from ${tableName}:`, err);
      res.status(500).send(`Error deleting data from ${tableName}`);
    } else {
      console.log("Data deleted successfully:", result);
      res.send("Data deleted successfully");
      invalidateCacheForTable(tableName);
    }
  });
};
const updateCaseStudyData = (id) => (req, res) => {
  const { company, companytitle, companybody, companyindustry } = req.body;

  const sql = `UPDATE maincasestudy SET company = ?, companytitle = ?, companybody = ?, companyindustry = ? WHERE id = ?`;
  executeQuery(
    sql,
    [company, companytitle, companybody, companyindustry, id],
    (err, result) => {
      if (err) {
        console.error("Error updating case study data:", err);
        res.status(500).send("Error updating case study data");
      } else {
        console.log("Case study data updated successfully:", result);
        res.send("Case study data updated successfully");
        invalidateCacheForTable('maincasestudy');
      }
    }
  );
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
const getMailData = insertDataIntoTable("contactforminformation");
const getAdminData = insertDataIntoTable("manageadmin");
const displayAdminData = fetchDataByTableName("manageadmin");
const deleteAdminData = deleteDataByColumnName("manageadmin", "email");
const deletePositionData = deleteDataByColumnName("careerpos1", "positiontitle1");
const displayMailData = fetchDataByTableName("contactforminformation");
const getHomeHeroHeaderData = insertDataIntoTable("home_page");
const displayHomeHeroHeaderData = fetchDataByTableName("home_page");
const getHomeHeroCase1Data = insertDataIntoTable("homeherocase1");
const displayHomeHeroCase1Data = fetchDataByTableName("homeherocase1");
const getHomeHeroCase2Data = insertDataIntoTable("homeherocase2");
const displayHomeHeroCase2Data = fetchDataByTableName("homeherocase2");
const getHomeHeroCase3Data = insertDataIntoTable("homeherocase3");
const displayHomeHeroCase3Data = fetchDataByTableName("homeherocase3");
const getHomeHeroCase4Data = insertDataIntoTable("homeherocase4");
const displayHomeHeroCase4Data = fetchDataByTableName("homeherocase4");
const getHomeHeroCase5Data = insertDataIntoTable("homeherocase5");
const displayHomeHeroCase5Data = fetchDataByTableName("homeherocase5");
const getHomeVisionHeaderData = insertDataIntoTable("vision");
const displayHomeVisionHeaderData = fetchDataByTableName("vision");
const getHomeDigitalTransformationData = insertDataIntoTable("codelinear");
const displayHomeDigitalTransformationData = fetchDataByTableName("codelinear");
const getHomeTechnologyConsultingData = insertDataIntoTable("crew");
const displayHomeTechnlogyConsultingData = fetchDataByTableName("crew");
const getHomeProductEngineeringData = insertDataIntoTable("contactus");
const displayHomeProductEngineeringData = fetchDataByTableName("contactus");
const getHomeAboutData = insertDataIntoTable("lifeat");
const displayHomeAboutData = fetchDataByTableName("lifeat");
const getHomeServiceData = insertDataIntoTable("service");
const displayHomeServiceData = fetchDataByTableName("service");
const getHomeService1Data = insertDataIntoTable("service1");
const displayHomeService1Data = fetchDataByTableName("service1");
const getHomeService2Data = insertDataIntoTable("service2");
const displayHomeService2Data = fetchDataByTableName("service2");
const getHomeService3Data = insertDataIntoTable("service3");
const displayHomeService3Data = fetchDataByTableName("service3");
const getHomeService4Data = insertDataIntoTable("service4");
const displayHomeService4Data = fetchDataByTableName("service4");
const getHomeService5Data = insertDataIntoTable("service5");
const displayHomeService5Data = fetchDataByTableName("service5");
const getHomeService6Data = insertDataIntoTable("service6");
const displayHomeService6Data = fetchDataByTableName("service6");
const getHomeService7Data = insertDataIntoTable("service7");
const displayHomeService7Data = fetchDataByTableName("service7");
const getHomeService8Data = insertDataIntoTable("service8");
const displayHomeService8Data = fetchDataByTableName("service8");
const getHomeService9Data = insertDataIntoTable("service9");
const displayHomeService9Data = fetchDataByTableName("service9");
const getHomeService10Data = insertDataIntoTable("service10");
const displayHomeService10Data = fetchDataByTableName("service10");
const getHomeService11Data = insertDataIntoTable("service11");
const displayHomeService11Data = fetchDataByTableName("service11");
const getHomeService12Data = insertDataIntoTable("service12");
const displayHomeService12Data = fetchDataByTableName("service12");
const getHomeCaseStudy1Data = insertDataIntoTable("casestudy1");
const displayHomeCaseStudy1Data = fetchDataByTableName("casestudy1");
const getHomeCaseStudy2Data = insertDataIntoTable("casestudy2");
const displayHomeCaseStudy2Data = fetchDataByTableName("casestudy2");
const getHomeCaseStudy3Data = insertDataIntoTable("casestudy3");
const displayHomeCaseStudy3Data = fetchDataByTableName("casestudy3");
const getHomeCaseStudy4Data = insertDataIntoTable("casestudy4");
const displayHomeCaseStudy4Data = fetchDataByTableName("casestudy4");
const getHomeCaseStudy5Data = insertDataIntoTable("casestudy5");
const displayHomeCaseStudy5Data = fetchDataByTableName("casestudy5");
const getHomeClientData = insertDataIntoTable("client");
const displayHomeClientData = fetchDataByTableName("client");
const getHomeIndustriesData = insertDataIntoTable("industries");
const displayHomeIndustriesData = fetchDataByTableName("industries");
const getHomeIndustriesData1 = insertDataIntoTable("industries1");
const displayHomeIndustriesData1 = fetchDataByTableName("industries1");
const getHomeIndustriesData2 = insertDataIntoTable("industries2");
const displayHomeIndustriesData2 = fetchDataByTableName("industries2");
const getHomeIndustriesData3 = insertDataIntoTable("industries3");
const displayHomeIndustriesData3 = fetchDataByTableName("industries3");
const getHomeIndustriesData4 = insertDataIntoTable("industries4");
const displayHomeIndustriesData4 = fetchDataByTableName("industries4");
const getHomeIndustriesData5 = insertDataIntoTable("industries5");
const displayHomeIndustriesData5 = fetchDataByTableName("industries5");
const getHomeIndustriesData6 = insertDataIntoTable("industries6");
const displayHomeIndustriesData6 = fetchDataByTableName("industries6");
const getHomeIndustriesData7 = insertDataIntoTable("industries7");
const displayHomeIndustriesData7 = fetchDataByTableName("industries7");
const getHomeIndustriesData8 = insertDataIntoTable("industrie8");
const displayHomeIndustriesData8 = fetchDataByTableName("industries8");
const getHomeIndustriesData9 = insertDataIntoTable("industries9");
const displayHomeIndustriesData9 = fetchDataByTableName("industries9");
const getHomeIndustriesData10 = insertDataIntoTable("industries10");
const displayHomeIndustriesData10 = fetchDataByTableName("industries10");
const getHomeBlogData = insertDataIntoTable("blog");
const displayHomeBlogData = fetchDataByTableName("blog");
const getHomeBlogData1 = insertDataIntoTable("blog1");
const displayHomeBlogData1 = fetchDataByTableName("blog1");
const getHomeBlogData2 = insertDataIntoTable("blog2");
const displayHomeBlogData2 = fetchDataByTableName("blog2");
const getHomeBlogData3 = insertDataIntoTable("blog3");
const displayHomeBlogData3 = fetchDataByTableName("blog3");
const getHomeBlogData4 = insertDataIntoTable("blog4");
const displayHomeBlogData4 = fetchDataByTableName("blog4");
const getHomeBlogData5 = insertDataIntoTable("blog5");
const displayHomeBlogData5 = fetchDataByTableName("blog5");
const getHomeBlogData6 = insertDataIntoTable("blog6");
const displayHomeBlogData6 = fetchDataByTableName("blog6");
const getHomeBlogData7 = insertDataIntoTable("blog7");
const displayHomeBlogData7 = fetchDataByTableName("blog7");
const getHomeBlogData8 = insertDataIntoTable("blog8");
const displayHomeBlogData8 = fetchDataByTableName("blog8");
const getHomeBlogData9 = insertDataIntoTable("blog9");
const displayHomeBlogData9 = fetchDataByTableName("blog9");
const getHomeBlogData10 = insertDataIntoTable("blog10");
const displayHomeBlogData10 = fetchDataByTableName("blog10");
const getHomeBlogData11 = insertDataIntoTable("blog11");
const displayHomeBlogData11 = fetchDataByTableName("blog11");
const getHomeBlogData12 = insertDataIntoTable("blog12");
const displayHomeBlogData12 = fetchDataByTableName("blog12");
const getHomeBlogData13 = insertDataIntoTable("blog13");
const displayHomeBlogData13 = fetchDataByTableName("blog13");
const getHomeBlogData14 = insertDataIntoTable("blog14");
const displayHomeBlogData14 = fetchDataByTableName("blog14");
const getHomeBlogData15 = insertDataIntoTable("blog15");
const displayHomeBlogData15 = fetchDataByTableName("blog15");
const getHomeBlogData16 = insertDataIntoTable("blog16");
const displayHomeBlogData16 = fetchDataByTableName("blog16");
const getHomeBlogData17 = insertDataIntoTable("featuredblog");
const displayHomeBlogData17 = fetchDataByTableName("featuredblog");
const getBlogHeaderData = insertDataIntoTable("blogmainpage");
const displayBlogHeaderData = fetchDataByTableName("blogmainpage");
const getHomeCompanyData = insertDataIntoTable("company");
const displayHomeCompanyData = fetchDataByTableName("company");
const getHomeContactData = insertDataIntoTable("contact");
const displayHomeContactData = fetchDataByTableName("contact");
const getHomeAddressData = insertDataIntoTable("address");
const displayHomeAddressData = fetchDataByTableName("address");
const getServiceHeaderData = insertDataIntoTable("servicepage");
const displayServiceHeaderData = fetchDataByTableName("servicepage");
const getService1Data = insertDataIntoTable("serviceprod");
const displayService1Data = fetchDataByTableName("serviceprod");
const getService2Data = insertDataIntoTable("serviceapp");
const displayService2Data = fetchDataByTableName("serviceapp");
const getService3Data = insertDataIntoTable("servicetech");
const displayService3Data = fetchDataByTableName("servicetech");
const getService4Data = insertDataIntoTable("aiservice");
const displayService4Data = fetchDataByTableName("aiservice");
const getService5Data = insertDataIntoTable("sfservice");
const displayService5Data = fetchDataByTableName("sfservice");
const getService6Data = insertDataIntoTable("msservice");
const displayService6Data = fetchDataByTableName("msservice");
const getService7Data = insertDataIntoTable("ecommerceservice");
const displayService7Data = fetchDataByTableName("ecommerceservice");
const getService8Data = insertDataIntoTable("cloudservice");
const displayService8Data = fetchDataByTableName("cloudservice");
const getService9Data = insertDataIntoTable("gameservice");
const displayService9Data = fetchDataByTableName("gameservice");
const getService10Data = insertDataIntoTable("arvrservice");
const displayService10Data = fetchDataByTableName("arvrservice");
const getService11Data = insertDataIntoTable("lowservice");
const displayService11Data = fetchDataByTableName("lowservice");
const getService12Data = insertDataIntoTable("qaservice");
const displayService12Data = fetchDataByTableName("qaservice");
const getAboutHeaderData = insertDataIntoTable("abouthero");
const displayAboutHeaderData = fetchDataByTableName("abouthero");
const getAboutVisionData = insertDataIntoTable("aboutvision");
const displayAboutVisionData = fetchDataByTableName("aboutvision");
const getAboutOurVisonData = insertDataIntoTable("ourvision");
const displayAboutOurVisonData = fetchDataByTableName("ourvision");
const getAboutGuidingData = insertDataIntoTable("aboutguiding");
const displayAboutGuidingData = fetchDataByTableName("aboutguiding");
const getAboutGuidingContentData = insertDataIntoTable("ability");
const displayAboutGuidingContentData = fetchDataByTableName("ability");
const getAboutCommitmentData = insertDataIntoTable("ideal");
const displayAboutCommitmentData = fetchDataByTableName("ideal");
const getAboutCommitment1Data = insertDataIntoTable("aboutcomm1");
const displayAboutCommitment1Data = fetchDataByTableName("aboutcomm1");
const getAboutCommitment2Data = insertDataIntoTable("aboutcomm2");
const displayAboutCommitment2Data = fetchDataByTableName("aboutcomm2");
const getAboutCommitment3Data = insertDataIntoTable("aboutcomm3");
const displayAboutCommitment3Data = fetchDataByTableName("aboutcomm3");
const getAboutCommitment4Data = insertDataIntoTable("aboutcomm4");
const displayAboutCommitment4Data = fetchDataByTableName("aboutcomm4");
const getAboutCommitment5Data = insertDataIntoTable("aboutcomm5");
const displayAboutCommitment5Data = fetchDataByTableName("aboutcomm5");
const getAboutCommitment6Data = insertDataIntoTable("aboutcomm6");
const displayAboutCommitment6Data = fetchDataByTableName("aboutcomm6");
const getAboutCommitment7Data = insertDataIntoTable("aboutcomm7");
const displayAboutCommitment7Data = fetchDataByTableName("aboutcomm7");
const getAboutCommitment8Data = insertDataIntoTable("aboutcomm8");
const displayAboutCommitment8Data = fetchDataByTableName("aboutcomm8");
const getIndustryHeaderData = insertDataIntoTable("industriespage");
const displayIndustryHeaderData = fetchDataByTableName("industriespage");
const getIndustryGreyData = insertDataIntoTable("industrygreybox");
const displayIndustryGreyData = fetchDataByTableName("industrygreybox");
const getIndustry1Data = insertDataIntoTable("industrymain1");
const displayIndustry1Data = fetchDataByTableName("industrymain1");
const getIndustry2Data = insertDataIntoTable("industrymain2");
const displayIndustry2Data = fetchDataByTableName("industrymain2");
const getIndustry3Data = insertDataIntoTable("industrymain3");
const displayIndustry3Data = fetchDataByTableName("industrymain3");
const getIndustry4Data = insertDataIntoTable("industrymain4");
const displayIndustry4Data = fetchDataByTableName("industrymain4");
const getIndustry5Data = insertDataIntoTable("industrymain5");
const displayIndustry5Data = fetchDataByTableName("industrymain5");
const getIndustry6Data = insertDataIntoTable("industrymain6");
const displayIndustry6Data = fetchDataByTableName("industrymain6");
const getIndustry7Data = insertDataIntoTable("industrymain7");
const displayIndustry7Data = fetchDataByTableName("industrymain7");
const getIndustry8Data = insertDataIntoTable("industrymain8");
const displayIndustry8Data = fetchDataByTableName("industrymain8");
const getIndustry9Data = insertDataIntoTable("industrymain9");
const displayIndustry9Data = fetchDataByTableName("industrymain9");
const getIndustry10Data = insertDataIntoTable("industrymain10");
const displayIndustry10Data = fetchDataByTableName("industrymain10");
const getCaseStudyData = updateCaseStudyData(1);
const getCaseStudyData1 = updateCaseStudyData(2);
const getCaseStudyData2 = updateCaseStudyData(3);
const getCaseStudyData3 = updateCaseStudyData(4);
const getCaseStudyData4 = updateCaseStudyData(5);
const getCaseStudyData5 = updateCaseStudyData(6);
const getCaseStudyData6 = updateCaseStudyData(7);
const getCaseStudyData7 = updateCaseStudyData(8);
const getCaseStudyData8 = updateCaseStudyData(9);
const getCaseStudyData9 = updateCaseStudyData(10);
const getCaseStudyData10 = updateCaseStudyData(11);
const getCaseStudyData11 = updateCaseStudyData(12);
const getCaseStudyData12 = updateCaseStudyData(13);
const getCaseStudyData13 = updateCaseStudyData(14);
const getCaseStudyData14 = updateCaseStudyData(15);
const getCaseStudyData15 = updateCaseStudyData(16);
const getCaseStudyData16 = updateCaseStudyData(17);
const getCaseStudyData17 = updateCaseStudyData(18);
const getCaseStudyData18 = updateCaseStudyData(19);
const getCaseStudyData19 = updateCaseStudyData(20);
const getCaseStudyData20 = updateCaseStudyData(21);
const getCaseStudyData21 = updateCaseStudyData(22);
const getCaseStudyData22 = updateCaseStudyData(23);
const getCaseStudyData23 = updateCaseStudyData(24);
const getCaseStudyData24 = updateCaseStudyData(25);
const getCaseStudyData25 = updateCaseStudyData(26);
const getCaseStudyData26 = updateCaseStudyData(27);
const getCaseStudyData27 = updateCaseStudyData(28);
const getCaseStudyData28 = updateCaseStudyData(29);
const getCaseStudyData29 = updateCaseStudyData(30);
const getCaseStudyData30 = updateCaseStudyData(31);
const getCaseStudyData31 = updateCaseStudyData(32);
const getCaseStudyData32 = updateCaseStudyData(33);
const getCaseStudyData33 = updateCaseStudyData(34);
const getCaseStudyData34 = updateCaseStudyData(35);
const displayCaseStudyHeaderData = fetchDataByTableName("maincasestudy");
const getCareerHeaderData = insertDataIntoTable("careerpage");
const displayCareerHeaderData = fetchDataByTableName("careerpage");
const getCareerPos1Data = insertDataIntoTable("careerpos1");
const displayCareerpos1Data = fetchDataByTableName("careerpos1");
const getContactData = insertDataIntoTable("contactpage");
const displayContactData = fetchDataByTableName("contactpage");
const displayImages = fetchDataByTableName("images");
const displayServicePage1Data = fetchDataByTableName("productdesign");
const displayServicePage2Data = fetchDataByTableName("appdev");
const displayServicePage3Data = fetchDataByTableName("tech");
const displayServicePage4Data = fetchDataByTableName("AI");
const displayServicePage5Data = fetchDataByTableName("ecommerce");
const displayServicePage6Data = fetchDataByTableName("cloud");
const displayServicePage7Data = fetchDataByTableName("gamedev");
const displayServicePage8Data = fetchDataByTableName("arvr");
const displayServicePage9Data = fetchDataByTableName("lowcode");
const displayServicePage10Data = fetchDataByTableName("salesforce");
const displayServicePage11Data = fetchDataByTableName("sharepoint");
const displayServicePage12Data = fetchDataByTableName("quality");
const displayCaseStudyPage34 = fetchDataByTableName("ikea");
const displayCaseStudyPage33 = fetchDataByTableName("booking");
const displayCaseStudyPage32 = fetchDataByTableName("wilder");
const displayCaseStudyPage31 = fetchDataByTableName("mangocase");
const displayCaseStudyPage30 = fetchDataByTableName("soch");
const displayCaseStudyPage29 = fetchDataByTableName("moviework");
const displayCaseStudyPage28 = fetchDataByTableName("studio");
const displayCaseStudyPage27 = fetchDataByTableName("steelcase");
const displayCaseStudyPage26 = fetchDataByTableName("sodashi");
const displayCaseStudyPage25 = fetchDataByTableName("litup");
const displayCaseStudyPage24 = fetchDataByTableName("mica");
const displayCaseStudyPage23 = fetchDataByTableName("course");
const displayCaseStudyPage22 = fetchDataByTableName("middle");
const displayCaseStudyPage21 = fetchDataByTableName("lyracase");
const displayCaseStudyPage1 = fetchDataByTableName("sea");
const displayCaseStudyPage2 = fetchDataByTableName("trade");
const displayCaseStudyPage3 = fetchDataByTableName("sdu");
const displayCaseStudyPage4 = fetchDataByTableName("vacaystay");
const displayCaseStudyPage5 = fetchDataByTableName("contrasted");
const displayCaseStudyPage6 = fetchDataByTableName("kanbar");
const displayCaseStudyPage7 = fetchDataByTableName("wearwell");
const displayCaseStudyPage8 = fetchDataByTableName("leafandhive");
const displayCaseStudyPage9 = fetchDataByTableName("imapac");
const displayCaseStudyPage10 = fetchDataByTableName("klass");
const displayCaseStudyPage11 = fetchDataByTableName("william");
const displayCaseStudyPage12 = fetchDataByTableName("vouri");
const displayCaseStudyPage13 = fetchDataByTableName("homesrus");
const displayCaseStudyPage14 = fetchDataByTableName("landmark");
const displayCaseStudyPage15 = fetchDataByTableName("klub");
const displayCaseStudyPage16 = fetchDataByTableName("kernal");
const displayCaseStudyPage17 = fetchDataByTableName("hinge");
const displayCaseStudyPage18 = fetchDataByTableName("cowboycase");
const displayCaseStudyPage19 = fetchDataByTableName("deel");
const displayCaseStudyPage20 = fetchDataByTableName("convoy");
const getServicepage1 = insertDataIntoTable("productdesign");
const getServicepage2 = insertDataIntoTable("appdev");
const getServicepage3 = insertDataIntoTable("tech");
const getServicepage4 = insertDataIntoTable("AI");
const getServicepage5 = insertDataIntoTable("ecommerce");
const getServicepage6 = insertDataIntoTable("cloud");
const getServicepage7 = insertDataIntoTable("gamedev");
const getServicepage8 = insertDataIntoTable("arvr");
const getServicepage9 = insertDataIntoTable("lowcode");
const getServicepage10 = insertDataIntoTable("salesforce");
const getServicepage11 = insertDataIntoTable("sharepoint");
const getServicepage12 = insertDataIntoTable("qaulity");
const getCaseStudyPageData1 = insertDataIntoTable("sea");
const getCaseStudyPageData2 = insertDataIntoTable("trade");
const getCaseStudyPageData3 = insertDataIntoTable("sdu");
const getCaseStudyPageData4 = insertDataIntoTable("vacaystay");
const getCaseStudyPageData5 = insertDataIntoTable("contrasted");
const getCaseStudyPageData6 = insertDataIntoTable("kanbar");
const getCaseStudyPageData7 = insertDataIntoTable("wearwell");
const getCaseStudyPageData8 = insertDataIntoTable("leafandhive");
const getCaseStudyPageData9 = insertDataIntoTable("imapac");
const getCaseStudyPageData10 = insertDataIntoTable("klass");
const getCaseStudyPageData11 = insertDataIntoTable("william");
const getCaseStudyPageData12 = insertDataIntoTable("vouri");
const getCaseStudyPageData13 = insertDataIntoTable("homesrus");
const getCaseStudyPageData14 = insertDataIntoTable("landmark");
const getCaseStudyPageData15 = insertDataIntoTable("klub");
const getCaseStudyPageData16 = insertDataIntoTable("kernal");
const getCaseStudyPageData17 = insertDataIntoTable("hinge");
const getCaseStudyPageData18 = insertDataIntoTable("cowboycase");
const getCaseStudyPageData19 = insertDataIntoTable("deel");
const getCaseStudyPageData20 = insertDataIntoTable("convoy");
const getCaseStudyPageData21 = insertDataIntoTable("lyracase");
const getCaseStudyPageData22 = insertDataIntoTable("middle");
const getCaseStudyPageData23 = insertDataIntoTable("course");
const getCaseStudyPageData24 = insertDataIntoTable("mica");
const getCaseStudyPageData25 = insertDataIntoTable("litup");
const getCaseStudyPageData26 = insertDataIntoTable("sodashi");
const getCaseStudyPageData27 = insertDataIntoTable("steelcase");
const getCaseStudyPageData28 = insertDataIntoTable("studio");
const getCaseStudyPageData29 = insertDataIntoTable("moviework");
const getCaseStudyPageData30 = insertDataIntoTable("soch");
const getCaseStudyPageData31 = insertDataIntoTable("mangocase");
const getCaseStudyPageData32 = insertDataIntoTable("wilder");
const getCaseStudyPageData33 = insertDataIntoTable("booking");
const getCaseStudyPageData34 = insertDataIntoTable("ikea");
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
