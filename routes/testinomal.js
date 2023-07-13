const upload=require('../helper/upload');
const express=require('express');
const  router=express.Router();
const testinomalcontroller=require('../controller/testinomalController');
const genrateToken=require('../helper/auth');

router.post('/addtestinomal',upload.single('image'),testinomalcontroller.addtestinomal);
router.get('/viewtestinomal/:id',testinomalcontroller.viewtestinomal);
router.post('/updatetestinomal/:id',upload.single('image'),testinomalcontroller.updatetestinomal);
router.delete('/deletetestinomal/:id',testinomalcontroller.deletetestinomal);
router.delete('/deletemultiplestinomal',testinomalcontroller.deletetemultiplestinomal);
module.exports=router;
