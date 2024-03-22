const express = require("express");
const multer = require("multer");
const path = require("path");
const mysql = require("mysql");

const {
  sendMailContact,
  sendMail,
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
  getHomeTechnologyConsultingData,
  displayHomeTechnlogyConsultingData,
  getHomeProductEngineeringData,
  displayHomeProductEngineeringData,
  getHomeAboutData,
  displayHomeAboutData,
  getHomeServiceData,
  getHomeService1Data,
  getHomeService2Data,
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
  displayHomeServiceData,
  displayHomeService1Data,
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
  getHomeAddressData,
  getHomeCompanyData,
  getHomeContactData,
  displayHomeAddressData,
  displayHomeCompanyData,
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
  getCareerPos1Data,
  displayCareerHeaderData,
  displayCareerpos1Data,
  getContactData,
  displayContactData,
  getAdminData,
  deleteAdminData,
  deletePositionData,
  displayAdminData,
  displayImages,
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
const connection = mysql.createPool({
  host: "217.21.87.205",
  user: "u947451844_saif08",
  password: "u]1ro&X$1R",
  database: "u947451844_pages",
});
const router = express.Router();
router.post("/images", upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).send("No file uploaded");
    return;
  }
  const { filename } = req.file;
  const { id } = req.body;
  const sql = "UPDATE images SET filename = ? WHERE id = ?";
  connection.query(sql, [filename, id], (err, result) => {
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
router.post("/getMailData", getMailData);
router.post("/getAdminData", getAdminData);
router.post("/deleteAdminData", deleteAdminData);
router.post("/deletePositionData", deletePositionData);
router.post("/getHomeHeroHeaderData", getHomeHeroHeaderData);
router.post("/getHomeHeroCase1Data", getHomeHeroCase1Data);
router.post("/getHomeHeroCase2Data", getHomeHeroCase2Data);
router.post("/getHomeHeroCase3Data", getHomeHeroCase3Data);
router.post("/getHomeHeroCase4Data", getHomeHeroCase4Data);
router.post("/getHomeHeroCase5Data", getHomeHeroCase5Data);
router.post("/getHomeVisionHeaderData", getHomeVisionHeaderData);
router.post(
  "/getHomeDigitalTransformationData",
  getHomeDigitalTransformationData
);
router.post("/getHomeProductEngineeringData", getHomeProductEngineeringData);
router.post(
  "/getHomeTechnologyConsultingData",
  getHomeTechnologyConsultingData
);
router.post("/getHomeAboutData", getHomeAboutData);
router.post("/getHomeServiceData", getHomeServiceData);
router.post("/getHomeService1Data", getHomeService1Data);
router.post("/getHomeService2Data", getHomeService2Data);
router.post("/getHomeService3Data", getHomeService3Data);
router.post("/getHomeService4Data", getHomeService4Data);
router.post("/getHomeService5Data", getHomeService5Data);
router.post("/getHomeService6Data", getHomeService6Data);
router.post("/getHomeService7Data", getHomeService7Data);
router.post("/getHomeService8Data", getHomeService8Data);
router.post("/getHomeService9Data", getHomeService9Data);
router.post("/getHomeService10Data", getHomeService10Data);
router.post("/getHomeService11Data", getHomeService11Data);
router.post("/getHomeService12Data", getHomeService12Data);
router.post("/getHomeCaseStudy1Data", getHomeCaseStudy1Data);
router.post("/getHomeCaseStudy2Data", getHomeCaseStudy2Data);
router.post("/getHomeCaseStudy3Data", getHomeCaseStudy3Data);
router.post("/getHomeCaseStudy4Data", getHomeCaseStudy4Data);
router.post("/getHomeCaseStudy5Data", getHomeCaseStudy5Data);
router.post("/getHomeClientData", getHomeClientData);
router.post("/getHomeIndustriesData", getHomeIndustriesData);
router.post("/getHomeIndustries1Data", getHomeIndustriesData1);
router.post("/getHomeIndustries2Data", getHomeIndustriesData2);
router.post("/getHomeIndustries3Data", getHomeIndustriesData3);
router.post("/getHomeIndustries4Data", getHomeIndustriesData4);
router.post("/getHomeIndustries5Data", getHomeIndustriesData5);
router.post("/getHomeIndustries6Data", getHomeIndustriesData6);
router.post("/getHomeIndustries7Data", getHomeIndustriesData7);
router.post("/getHomeIndustries8Data", getHomeIndustriesData8);
router.post("/getHomeIndustries9Data", getHomeIndustriesData9);
router.post("/getHomeIndustries10Data", getHomeIndustriesData10);
router.post("/getHomeBlogData", getHomeBlogData);
router.post("/getHomeBlog1Data", getHomeBlogData1);
router.post("/getHomeBlog2Data", getHomeBlogData2);
router.post("/getHomeBlog3Data", getHomeBlogData3);
router.post("/getHomeBlog4Data", getHomeBlogData4);
router.post("/getHomeBlog5Data", getHomeBlogData5);
router.post("/getHomeBlog6Data", getHomeBlogData6);
router.post("/getHomeBlog7Data", getHomeBlogData7);
router.post("/getHomeBlog8Data", getHomeBlogData8);
router.post("/getHomeBlog9Data", getHomeBlogData9);
router.post("/getHomeBlog10Data", getHomeBlogData10);
router.post("/getHomeBlog11Data", getHomeBlogData11);
router.post("/getHomeBlog12Data", getHomeBlogData12);
router.post("/getHomeBlog13Data", getHomeBlogData13);
router.post("/getHomeBlog14Data", getHomeBlogData14);
router.post("/getHomeBlog15Data", getHomeBlogData15);
router.post("/getHomeBlog16Data", getHomeBlogData16);
router.post("/getHomeBlog17Data", getHomeBlogData17);
router.post("/getBlogHeaderData", getBlogHeaderData);
router.post("/getHomeCompanyData", getHomeCompanyData);
router.post("/getHomeAddressData", getHomeAddressData);
router.post("/getHomeContactData", getHomeContactData);
router.post("/getServiceHeaderData", getServiceHeaderData);
router.post("/getService1Data", getService1Data);
router.post("/getService2Data", getService2Data);
router.post("/getService3Data", getService3Data);
router.post("/getService4Data", getService4Data);
router.post("/getService5Data", getService5Data);
router.post("/getService6Data", getService6Data);
router.post("/getService7Data", getService7Data);
router.post("/getService8Data", getService8Data);
router.post("/getService9Data", getService9Data);
router.post("/getService10Data", getService10Data);
router.post("/getService11Data", getService11Data);
router.post("/getService12Data", getService12Data);
router.post("/getAboutHeaderData", getAboutHeaderData);
router.post("/getAboutVisionData", getAboutVisionData);
router.post("/getAboutOurVisionData", getAboutOurVisonData);
router.post("/getAboutGuidingData", getAboutGuidingData);
router.post("/getAboutGuidingContentData", getAboutGuidingContentData);
router.post("/getAboutCommitmentData", getAboutCommitmentData);
router.post("/getAboutCommitment1Data", getAboutCommitment1Data);
router.post("/getAboutCommitment2Data", getAboutCommitment2Data);
router.post("/getAboutCommitment3Data", getAboutCommitment3Data);
router.post("/getAboutCommitment4Data", getAboutCommitment4Data);
router.post("/getAboutCommitment5Data", getAboutCommitment5Data);
router.post("/getAboutCommitment6Data", getAboutCommitment6Data);
router.post("/getAboutCommitment7Data", getAboutCommitment7Data);
router.post("/getAboutCommitment8Data", getAboutCommitment8Data);
router.post("/getIndustryHeaderData", getIndustryHeaderData);
router.post("/getIndustryGreyData", getIndustryGreyData);
router.post("/getIndustry1Data", getIndustry1Data);
router.post("/getIndustry10Data", getIndustry10Data);
router.post("/getIndustry2Data", getIndustry2Data);
router.post("/getIndustry3Data", getIndustry3Data);
router.post("/getIndustry4Data", getIndustry4Data);
router.post("/getIndustry5Data", getIndustry5Data);
router.post("/getIndustry6Data", getIndustry6Data);
router.post("/getIndustry7Data", getIndustry7Data);
router.post("/getIndustry8Data", getIndustry8Data);
router.post("/getIndustry9Data", getIndustry9Data);
router.post("/getCaseStudyHeaderData", getCaseStudyData);
router.post("/getCaseStudyData1", getCaseStudyData1);
router.post("/getCaseStudyData2", getCaseStudyData2);
router.post("/getCaseStudyData3", getCaseStudyData3);
router.post("/getCaseStudyData4", getCaseStudyData4);
router.post("/getCaseStudyData5", getCaseStudyData5);
router.post("/getCaseStudyData6", getCaseStudyData6);
router.post("/getCaseStudyData7", getCaseStudyData7);
router.post("/getCaseStudyData8", getCaseStudyData8);
router.post("/getCaseStudyData9", getCaseStudyData9);
router.post("/getCaseStudyData10", getCaseStudyData10);
router.post("/getCaseStudyData11", getCaseStudyData11);
router.post("/getCaseStudyData12", getCaseStudyData12);
router.post("/getCaseStudyData13", getCaseStudyData13);
router.post("/getCaseStudyData14", getCaseStudyData14);
router.post("/getCaseStudyData15", getCaseStudyData15);
router.post("/getCaseStudyData16", getCaseStudyData16);
router.post("/getCaseStudyData17", getCaseStudyData17);
router.post("/getCaseStudyData18", getCaseStudyData18);
router.post("/getCaseStudyData19", getCaseStudyData19);
router.post("/getCaseStudyData20", getCaseStudyData20);
router.post("/getCaseStudyData21", getCaseStudyData21);
router.post("/getCaseStudyData22", getCaseStudyData22);
router.post("/getCaseStudyData23", getCaseStudyData23);
router.post("/getCaseStudyData24", getCaseStudyData24);
router.post("/getCaseStudyData25", getCaseStudyData25);
router.post("/getCaseStudyData26", getCaseStudyData26);
router.post("/getCaseStudyData27", getCaseStudyData27);
router.post("/getCaseStudyData28", getCaseStudyData28);
router.post("/getCaseStudyData29", getCaseStudyData29);
router.post("/getCaseStudyData30", getCaseStudyData30);
router.post("/getCaseStudyData31", getCaseStudyData31);
router.post("/getCaseStudyData32", getCaseStudyData32);
router.post("/getCaseStudyData33", getCaseStudyData33);
router.post("/getCaseStudyData34", getCaseStudyData34);
router.post("/getCareerHeaderData", getCareerHeaderData);
router.post("/getCareerPos1Data", getCareerPos1Data);
router.post("/getContactData", getContactData);
router.post("/getServicepage1", getServicepage1);
router.post("/getServicepage2", getServicepage2);
router.post("/getServicepage3", getServicepage3);
router.post("/getServicepage4", getServicepage4);
router.post("/getServicepage5", getServicepage5);
router.post("/getServicepage6", getServicepage6);
router.post("/getServicepage7", getServicepage7);
router.post("/getServicepage8", getServicepage8);
router.post("/getServicepage9", getServicepage9);
router.post("/getServicepage10", getServicepage10);
router.post("/getServicepage11", getServicepage11);
router.post("/getServicepage12", getServicepage12);
router.post("/getCaseStudyPageDataSEA", getCaseStudyPageData1);
router.post("/getCaseStudyPageData2", getCaseStudyPageData2);
router.post("/getCaseStudyPageData3", getCaseStudyPageData3);
router.post("/getCaseStudyPageData4", getCaseStudyPageData4);
router.post("/getCaseStudyPageData5", getCaseStudyPageData5);
router.post("/getCaseStudyPageData6", getCaseStudyPageData6);
router.post("/getCaseStudyPageData7", getCaseStudyPageData7);
router.post("/getCaseStudyPageData8", getCaseStudyPageData8);
router.post("/getCaseStudyPageData9", getCaseStudyPageData9);
router.post("/getCaseStudyPageData10", getCaseStudyPageData10);
router.post("/getCaseStudyPageData11", getCaseStudyPageData11);
router.post("/getCaseStudyPageData12", getCaseStudyPageData12);
router.post("/getCaseStudyPageData13", getCaseStudyPageData13);
router.post("/getCaseStudyPageData14", getCaseStudyPageData14);
router.post("/getCaseStudyPageData15", getCaseStudyPageData15);
router.post("/getCaseStudyPageData16", getCaseStudyPageData16);
router.post("/getCaseStudyPageData17", getCaseStudyPageData17);
router.post("/getCaseStudyPageData18", getCaseStudyPageData18);
router.post("/getCaseStudyPageData19", getCaseStudyPageData19);
router.post("/getCaseStudyPageData20", getCaseStudyPageData20);
router.post("/getCaseStudyPageData21", getCaseStudyPageData21);
router.post("/getCaseStudyPageData22", getCaseStudyPageData22);
router.post("/getCaseStudyPageData23", getCaseStudyPageData23);
router.post("/getCaseStudyPageData24", getCaseStudyPageData24);
router.post("/getCaseStudyPageData25", getCaseStudyPageData25);
router.post("/getCaseStudyPageData26", getCaseStudyPageData26);
router.post("/getCaseStudyPageData27", getCaseStudyPageData27);
router.post("/getCaseStudyPageData28", getCaseStudyPageData28);
router.post("/getCaseStudyPageData29", getCaseStudyPageData29);
router.post("/getCaseStudyPageData30", getCaseStudyPageData30);
router.post("/getCaseStudyPageData31", getCaseStudyPageData31);
router.post("/getCaseStudyPageData32", getCaseStudyPageData32);
router.post("/getCaseStudyPageData33", getCaseStudyPageData33);
router.post("/getCaseStudyPageData34", getCaseStudyPageData34);
router.get("/displayMailData", displayMailData);
router.get("/displayAdminData", displayAdminData);
router.get("/displayHomeHeroHeaderData", displayHomeHeroHeaderData);
router.get("/displayHomeHeroCase1Data", displayHomeHeroCase1Data);
router.get("/displayHomeHeroCase2Data", displayHomeHeroCase2Data);
router.get("/displayHomeHeroCase3Data", displayHomeHeroCase3Data);
router.get("/displayHomeHeroCase4Data", displayHomeHeroCase4Data);
router.get("/displayHomeHeroCase5Data", displayHomeHeroCase5Data);
router.get("/displayHomeVisionHeaderData", displayHomeVisionHeaderData);
router.get(
  "/displayHomeDigitalTransformationData",
  displayHomeDigitalTransformationData
);
router.get(
  "/displayHomeTechnlogyConsultingData",
  displayHomeTechnlogyConsultingData
);
router.get(
  "/displayHomeProductEngineeringData",
  displayHomeProductEngineeringData
);
router.get(
  "/displayHomeProductEngineeringData",
  displayHomeProductEngineeringData
);
router.get("/displayHomeAboutData", displayHomeAboutData);
router.get("/displayHomeServiceData", displayHomeServiceData);
router.get("/displayHomeService1Data", displayHomeService1Data);
router.get("/displayHomeService2Data", displayHomeService2Data);
router.get("/displayHomeService3Data", displayHomeService3Data);
router.get("/displayHomeService4Data", displayHomeService4Data);
router.get("/displayHomeService5Data", displayHomeService5Data);
router.get("/displayHomeService6Data", displayHomeService6Data);
router.get("/displayHomeService7Data", displayHomeService7Data);
router.get("/displayHomeService8Data", displayHomeService8Data);
router.get("/displayHomeService9Data", displayHomeService9Data);
router.get("/displayHomeService10Data", displayHomeService10Data);
router.get("/displayHomeService11Data", displayHomeService11Data);
router.get("/displayHomeService12Data", displayHomeService12Data);
router.get("/displayHomeCaseStudy1Data", displayHomeCaseStudy1Data);
router.get("/displayHomeCaseStudy2Data", displayHomeCaseStudy2Data);
router.get("/displayHomeCaseStudy3Data", displayHomeCaseStudy3Data);
router.get("/displayHomeCaseStudy4Data", displayHomeCaseStudy4Data);
router.get("/displayHomeCaseStudy5Data", displayHomeCaseStudy5Data);
router.get("/displayHomeClientData", displayHomeClientData);
router.get("/displayHomeIndustriesData", displayHomeIndustriesData);
router.get("/displayHomeIndustries1Data", displayHomeIndustriesData1);
router.get("/displayHomeIndustries2Data", displayHomeIndustriesData2);
router.get("/displayHomeIndustries3Data", displayHomeIndustriesData3);
router.get("/displayHomeIndustries4Data", displayHomeIndustriesData4);
router.get("/displayHomeIndustries5Data", displayHomeIndustriesData5);
router.get("/displayHomeIndustries6Data", displayHomeIndustriesData6);
router.get("/displayHomeIndustries7Data", displayHomeIndustriesData7);
router.get("/displayHomeIndustries8Data", displayHomeIndustriesData8);
router.get("/displayHomeIndustries9Data", displayHomeIndustriesData9);
router.get("/displayHomeIndustries10Data", displayHomeIndustriesData10);
router.get("/displayHomeBlogData", displayHomeBlogData);
router.get("/displayHomeBlog1Data", displayHomeBlogData1);
router.get("/displayHomeBlog2Data", displayHomeBlogData2);
router.get("/displayHomeBlog3Data", displayHomeBlogData3);
router.get("/displayHomeBlog4Data", displayHomeBlogData4);
router.get("/displayHomeBlog5Data", displayHomeBlogData5);
router.get("/displayHomeBlog6Data", displayHomeBlogData6);
router.get("/displayHomeBlog7Data", displayHomeBlogData7);
router.get("/displayHomeBlog8Data", displayHomeBlogData8);
router.get("/displayHomeBlog9Data", displayHomeBlogData9);
router.get("/displayHomeBlog10Data", displayHomeBlogData10);
router.get("/displayHomeBlog11Data", displayHomeBlogData11);
router.get("/displayHomeBlog12Data", displayHomeBlogData12);
router.get("/displayHomeBlog13Data", displayHomeBlogData13);
router.get("/displayHomeBlog14Data", displayHomeBlogData14);
router.get("/displayHomeBlog15Data", displayHomeBlogData15);
router.get("/displayHomeBlog16Data", displayHomeBlogData16);
router.get("/displayHomeBlog17Data", displayHomeBlogData17);
router.get("/displayBlogHeaderData", displayBlogHeaderData);
router.get("/displayHomeCompanyData", displayHomeCompanyData);
router.get("/displayHomeAddressData", displayHomeAddressData);
router.get("/displayHomeContactData", displayHomeContactData);
router.get("/displayServiceHeaderData", displayServiceHeaderData);
router.get("/displayService1Data", displayService1Data);
router.get("/displayService2Data", displayService2Data);
router.get("/displayService3Data", displayService3Data);
router.get("/displayService4Data", displayService4Data);
router.get("/displayService5Data", displayService5Data);
router.get("/displayService6Data", displayService6Data);
router.get("/displayService7Data", displayService7Data);
router.get("/displayService8Data", displayService8Data);
router.get("/displayService9Data", displayService9Data);
router.get("/displayService10Data", displayService10Data);
router.get("/displayService11Data", displayService11Data);
router.get("/displayService12Data", displayService12Data);
router.get("/displayAboutHeaderData", displayAboutHeaderData);
router.get("/displayAboutVisionData", displayAboutVisionData);
router.get("/displayAboutOurVisionData", displayAboutOurVisonData);
router.get("/displayAboutGuidingData", displayAboutGuidingData);
router.get("/displayAboutGuidingContentData", displayAboutGuidingContentData);
router.get("/displayAboutCommitmentData", displayAboutCommitmentData);
router.get("/displayAboutCommitment1Data", displayAboutCommitment1Data);
router.get("/displayAboutCommitment2Data", displayAboutCommitment2Data);
router.get("/displayAboutCommitment3Data", displayAboutCommitment3Data);
router.get("/displayAboutCommitment4Data", displayAboutCommitment4Data);
router.get("/displayAboutCommitment5Data", displayAboutCommitment5Data);
router.get("/displayAboutCommitment6Data", displayAboutCommitment6Data);
router.get("/displayAboutCommitment7Data", displayAboutCommitment7Data);
router.get("/displayAboutCommitment8Data", displayAboutCommitment8Data);
router.get("/displayIndustryHeaderData", displayIndustryHeaderData);
router.get("/displayIndustryGreyData", displayIndustryGreyData);
router.get("/displayIndustry1Data", displayIndustry1Data);
router.get("/displayIndustry10Data", displayIndustry10Data);
router.get("/displayIndustry2Data", displayIndustry2Data);
router.get("/displayIndustry3Data", displayIndustry3Data);
router.get("/displayIndustry4Data", displayIndustry4Data);
router.get("/displayIndustry5Data", displayIndustry5Data);
router.get("/displayIndustry6Data", displayIndustry6Data);
router.get("/displayIndustry7Data", displayIndustry7Data);
router.get("/displayIndustry8Data", displayIndustry8Data);
router.get("/displayIndustry9Data", displayIndustry9Data);
router.get("/displayCaseStudyHeaderData", displayCaseStudyHeaderData);
router.get("/displayCareerHeaderData", displayCareerHeaderData);
router.get("/displayCareerPos1Data", displayCareerpos1Data);
router.get("/displayContactData", displayContactData);
router.get("/displayImages", displayImages);
router.get("/displayServicePage1Data", displayServicePage1Data);
router.get("/displayServicePage2Data", displayServicePage2Data);
router.get("/displayServicePage3Data", displayServicePage3Data);
router.get("/displayServicePage4Data", displayServicePage4Data);
router.get("/displayServicePage5Data", displayServicePage5Data);
router.get("/displayServicePage6Data", displayServicePage6Data);
router.get("/displayServicePage7Data", displayServicePage7Data);
router.get("/displayServicePage8Data", displayServicePage8Data);
router.get("/displayServicePage9Data", displayServicePage9Data);
router.get("/displayServicePage10Data", displayServicePage10Data);
router.get("/displayServicePage11Data", displayServicePage11Data);
router.get("/displayServicePage12Data", displayServicePage12Data);
router.get("/displayCaseStudyPage1", displayCaseStudyPage1);
router.get("/displayCaseStudyPage2", displayCaseStudyPage2);
router.get("/displayCaseStudyPage3", displayCaseStudyPage3);
router.get("/displayCaseStudyPage4", displayCaseStudyPage4);
router.get("/displayCaseStudyPage5", displayCaseStudyPage5);
router.get("/displayCaseStudyPage6", displayCaseStudyPage6);
router.get("/displayCaseStudyPage7", displayCaseStudyPage7);
router.get("/displayCaseStudyPage8", displayCaseStudyPage8);
router.get("/displayCaseStudyPage9", displayCaseStudyPage9);
router.get("/displayCaseStudyPage10", displayCaseStudyPage10);
router.get("/displayCaseStudyPage11", displayCaseStudyPage11);
router.get("/displayCaseStudyPage12", displayCaseStudyPage12);
router.get("/displayCaseStudyPage13", displayCaseStudyPage13);
router.get("/displayCaseStudyPage14", displayCaseStudyPage14);
router.get("/displayCaseStudyPage15", displayCaseStudyPage15);
router.get("/displayCaseStudyPage16", displayCaseStudyPage16);
router.get("/displayCaseStudyPage17", displayCaseStudyPage17);
router.get("/displayCaseStudyPage18", displayCaseStudyPage18);
router.get("/displayCaseStudyPage19", displayCaseStudyPage19);
router.get("/displayCaseStudyPage20", displayCaseStudyPage20);
router.get("/displayCaseStudyPage21", displayCaseStudyPage21);
router.get("/displayCaseStudyPage22", displayCaseStudyPage22);
router.get("/displayCaseStudyPage23", displayCaseStudyPage23);
router.get("/displayCaseStudyPage24", displayCaseStudyPage24);
router.get("/displayCaseStudyPage25", displayCaseStudyPage25);
router.get("/displayCaseStudyPage26", displayCaseStudyPage26);
router.get("/displayCaseStudyPage27", displayCaseStudyPage27);
router.get("/displayCaseStudyPage28", displayCaseStudyPage28);
router.get("/displayCaseStudyPage29", displayCaseStudyPage29);
router.get("/displayCaseStudyPage30", displayCaseStudyPage30);
router.get("/displayCaseStudyPage31", displayCaseStudyPage31);
router.get("/displayCaseStudyPage32", displayCaseStudyPage32);
router.get("/displayCaseStudyPage33", displayCaseStudyPage33);
router.get("/displayCaseStudyPage34", displayCaseStudyPage34);
module.exports = { router };
