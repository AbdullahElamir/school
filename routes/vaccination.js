var express = require('express');
var router = express.Router();
var VaccinationMgr = require("../controller/vaccination");
var userHelpers = require("../controller/userHelpers");
var user={};
user.school="57fb8d5606d14d29e32b3c86";

router.get('/all', userHelpers.isLogin ,function(req, res) {
  VaccinationMgr.getAllVaccination(function(vaccination){
    res.send(vaccination);
  });
});

// add new vaccination
router.post('/add', userHelpers.isLogin ,function(req, res) {
  VaccinationMgr.addVaccination(req.body,function(vaccination){
    res.send(vaccination);
  });
});
// add new student's vaccination
router.post('/student', userHelpers.isLogin ,function(req, res) {
  VaccinationMgr.setStudentVaccination(req.body,function(result){
    res.send(result);
  });
});
// get vaccination by status
router.get('/status/:status',userHelpers.isLogin , function(req, res) {
  VaccinationMgr.getAllVaccinationStatus(req.params.status,function(vaccination){
    res.send(vaccination);
  });
});
router.get('/student/:id',userHelpers.isLogin , function(req, res) {
  VaccinationMgr.getAllVaccinationStudent(req.params.id,function(vaccination){
    res.send(vaccination);
  });
});
router.put('/student/edit/:id', userHelpers.isLogin ,function(req, res) {
  VaccinationMgr.updateStudentVaccination(req.params.id,req.body,function(vaccination){
    res.send(vaccination);
  });
});
// edit vaccination by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  VaccinationMgr.updateVaccination(req.params.id,req.body,function(vaccination){
    res.send(vaccination);
  });
});

router.delete('/student/delete/:id',userHelpers.isLogin , function(req, res) {
  VaccinationMgr.deleteStudentVaccination(req.params.id,function(vaccination){
    res.send({result:vaccination});
  });
});
// delete vaccination by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  VaccinationMgr.deleteVaccination(req.params.id,function(vaccination){
    res.send({result:vaccination});
  });
});
//get all vaccination By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  VaccinationMgr.getAllVaccinationsBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(vaccination){
    res.send(vaccination);
  });
});

// get all vaccination
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  VaccinationMgr.getAllVaccinationCount(req.params.limit,req.params.page,function(vaccination){
    res.send(vaccination);
  });
});

// get vaccination by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  VaccinationMgr.getVaccinationId(req.params.id,function(vaccination){
    res.send(vaccination);
  });
});


module.exports = router;
