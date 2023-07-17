const express=require('express');
const  router=express.Router();
const auth=require('../helper/auth');
const contactController=require('../controller/contactController');

router.post('/addcontact',auth.verifyToken(),contactController.addcontact);
router.post('/updatecontact/:id',auth.verifyToken(),contactController.updatecontact);
router.get('/viewcontact/:id',auth.verifyToken(),contactController.viewcontact);
router.delete('/deletecontact/:id',auth.verifyToken(),contactController.deletecontact);
router.delete('/deletemultiplecontact',auth.verifyToken(),contactController.deletemultiplecontact);

module.exports=router;