const express=require('express');
const upload=require('../helper/upload');
const  router=express.Router();
const registrationController=require('../controller/registrationController');
const auth=require('../helper/auth');

router.post('/adduser',upload.single('image'),registrationController.registration);
//forgot password
router.post('/forgotpassword',registrationController.forgotpassword);
router.post('/setnewpassword/:email',registrationController.setnewpassword);


router.post('/login',auth.genrateToken,registrationController.login);
router.post('/updateprofile',upload.single('image'),auth.verifyToken,registrationController.updateprofile);
router.get('/viewprofile',upload.single('image'),auth.verifyToken,registrationController.viewprofile);
router.post('/resetpassword',auth.verifyToken,registrationController.resetpassword);
module.exports=router;