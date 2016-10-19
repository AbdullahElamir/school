var express = require('express');
var router = express.Router();
var CommitteeMgr = require("../controller/committee");
var userHelpers = require("../controller/userHelpers");

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

// GET Committee By id
router.get('/get/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.getCommitteeId(req.params.id,function(committee){
    res.send(committee);
  });
});
 
// add new Committee
router.post('/add', userHelpers.isLogin ,function(req, res) {
  CommitteeMgr.addCommittee(req.body,function(committee){
    res.send(committee);
  });
});

/* Delete Committee by id  */
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.deleteCommittee(req.params.id,function(re){
    res.send({result:re});
  });
});

/* Edit Committee by id  */
router.put('/edit/:id',userHelpers.isLogin , function(req, res) {
  CommitteeMgr.updateCommittee(req.params.id,req.body,function(re){
    res.send({result:re});
  });
});

module.exports = router;