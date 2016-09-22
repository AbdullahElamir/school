var express = require('express');
var router = express.Router();
var clothesMgr = require("../controller/clothes");
var userHelpers = require("../controller/userHelpers");

router.get('/all', userHelpers.isLogin ,function(req, res) {
  clothesMgr.getAllClothes(function(clothes){
    res.send(clothes);
  });
});

router.get('/status/:status', userHelpers.isLogin ,function(req, res) {
  clothesMgr.getAllClothesStatus(req.params.status,function(clothes){
    res.send(clothes);
  });
});

router.get('/name/:name', userHelpers.isLogin ,function(req, res) {
  clothesMgr.getClothesName(req.params.name,function(clothes){
    res.send(clothes);
  });
});

// add new clothes
router.post('/add', userHelpers.isLogin ,function(req, res) {
  clothesMgr.addClothes(req.body,function(clothes){
    res.send(clothes);
  });
});

// edit clothes by id
router.put('/edit/:id', userHelpers.isLogin ,function(req, res) {
  clothesMgr.updateClothes(req.params.id,req.body,function(clothes){
    res.send(clothes);
  });
});

// delete clothes by id
router.delete('/delete/:id',userHelpers.isLogin , function(req, res) {
  clothesMgr.deleteClothes(req.params.id,function(clothes){
    res.send(clothes);
  });
});

//get all clothes By Search Value
router.get('/:searchValue/:limit/:page',userHelpers.isLogin , function(req, res) {
  clothesMgr.getAllClothesBySearchValue(req.params.searchValue,req.params.limit,req.params.page,function(clothes){
    res.send(clothes);
  });
});

// get all clothes
router.get('/:limit/:page',userHelpers.isLogin , function(req, res) {
  clothesMgr.getAllClothesCount(req.params.limit,req.params.page,function(clothes){
    res.send(clothes);
  });
});

// get clothes by id
router.get('/:id',userHelpers.isLogin , function(req, res) {
  clothesMgr.getClothesId(req.params.id,function(clothes){
    res.send(clothes);
  });
});

module.exports = router;