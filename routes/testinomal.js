const upload=require('../helper/upload');
const express=require('express');
const  router=express.Router();
const testinomalcontroller=require('../controller/testinomalController');
const auth=require('../helper/auth');

router.post('/addtestinomal',auth.verifyToken(),upload.single('image'),testinomalcontroller.addtestinomal);
router.get('/viewtestinomal/:id',auth.verifyToken(),testinomalcontroller.viewtestinomal);
router.post('/updatetestinomal/:id',auth.verifyToken(),upload.single('image'),testinomalcontroller.updatetestinomal);
router.delete('/deletetestinomal/:id',auth.verifyToken(),testinomalcontroller.deletetestinomal);
router.delete('/deletemultiplestinomal',auth.verifyToken(),testinomalcontroller.deletetemultiplestinomal);
module.exports=router;
