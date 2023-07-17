const express=require('express');
const upload=require('../helper/upload');
const  router=express.Router();
const portfolio=require('../controller/portfolioController');
const auth=require('../helper/auth');

router.post('/addportfolio',auth.verifyToken,upload.array('image',4),portfolio.add);
router.post('/portfolioupdate/:id',auth.verifyToken,upload.array('image',4),portfolio.update);
router.delete('/deleteportfolio/:id',auth.verifyToken,portfolio.delete);
router.delete('/deleteportmultiplefolio',auth.verifyToken,portfolio.deleteMultiple);
router.get('/viewportfolio/:id',auth.verifyToken,portfolio.view);
module.exports=router;