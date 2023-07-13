const express=require('express');
const upload=require('../helper/upload');
const  router=express.Router();
const portfolio=require('../controller/portfolioController');
const genrateToken=require('../helper/auth');

router.post('/addportfolio',upload.array('image',4),portfolio.add);
router.post('/portfolioupdate/:id',upload.array('image',4),portfolio.update);
router.delete('/deleteportfolio/:id',portfolio.delete);
router.delete('/deleteportmultiplefolio',portfolio.deleteMultiple);
router.get('/viewportfolio/:id',portfolio.view);
module.exports=router;