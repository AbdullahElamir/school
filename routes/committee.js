var express = require('express');
var router = express.Router();
var CommitteeMgr = require("../controller/committee");
var userHelpers = require("../controller/userHelpers");

router.put('/examCommittee/students/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.updateStudents(req.params.id,req.body,function(re){
    res.send(re);
  });
});

// GET Committee By id
router.get('/get/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.getCommitteeId(req.params.id,function(committee){
    res.send(committee);
  });
});
 
// GET Exam Committee By id
router.get('/examCommittee/get/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.getFullStudentsExamCommitteeId(req.params.id,function(examCommittee){
    res.send(examCommittee);
  });
});

// add new Committee
router.post('/add', userHelpers.isLogin ,function(req, res) {
  CommitteeMgr.addCommittee(req.body,function(committee){
    res.send(committee);
  });
});
 
// add new Exam Committee
router.post('/examCommittee/add', userHelpers.isLogin ,function(req, res) {
  CommitteeMgr.addExamCommittee(req.body,function(examCommittee){
    res.send(examCommittee);
  });
});

/* Delete Committee by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.deleteCommittee(req.params.id,function(re){
    res.send({result:re});
  });
});

/* Delete Exam Committee by id  */
router.delete('/examCommittee/delete/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.deleteExamCommittee(req.params.id,function(re){
    res.send({result:re});
  });
});

/* Edit Committee by id  */
router.put('/edit/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.updateCommittee(req.params.id,req.body,function(re){
    res.send({result:re});
  });
});

/* Edit Exam Committee by id  */
router.put('/examCommittee/edit/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.updateExamCommittee(req.params.id,req.body,function(re){
    res.send({result:re});
  });
});

/*GET all Exams Committee By Search Value*/
router.get('/examCommittee/:searchValue/:limit/:page/:id_of_committee',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.getExamCommitteesBySearchValue(req.params.id_of_committee,req.params.searchValue,req.params.limit,req.params.page,function(examsCommittee){
    res.send(examsCommittee);
  });
});

// GET all Exams Committees
router.get('/examCommittee//:limit/:page/:id_of_committee',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.getExamCommitteesBySearchValue(req.params.id_of_committee,"",req.params.limit,req.params.page,function(examsCommittee){
    res.send(examsCommittee);
  });
});

/*GET all Committees By Search Value And Year*/
router.get('/:searchValue/:year/:limit/:page',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.getCommitteesBySearchValueAndYear(req.params.searchValue,req.params.year,req.params.limit,req.params.page,function(committees){
    res.send(committees);
  });
});

// GET all Committees By Year
router.get('/:year/:limit/:page',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.getCommitteesBySearchValueAndYear("",req.params.year,req.params.limit,req.params.page,function(committees){
    res.send(committees);
  });
});

module.exports = router;