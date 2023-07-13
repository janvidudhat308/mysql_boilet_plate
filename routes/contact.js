const express=require('express');
const  router=express.Router();
const auth=require('../helper/auth');
const contactController=require('../controller/contactController');

router.post('/addcontact',contactController.addcontact);
router.post('/updatecontact/:id',contactController.updatecontact);
router.get('/viewcontact/:id',contactController.viewcontact);
router.delete('/deletecontact/:id',contactController.deletecontact);
router.delete('/deletemultiplecontact',contactController.deletemultiplecontact);

module.exports=router;