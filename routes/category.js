//category router
const categoryController=require('../controller/categorycontroller');
const express=require('express');
const upload=require('../helper/upload');
const  router=express.Router();
const auth=require('../helper/auth');

router.post('/addcategory',auth.verifyToken,upload.single('categoryimage'),categoryController.addCategory);
router.get('/showcategory',auth.verifyToken,categoryController.listAllCategory);
router.post('/updatecategory/:id',auth.verifyToken,upload.single('categoryimage'),categoryController.updatecategory);
router.delete('/deletecategory',auth.verifyToken,categoryController.deleteMultipleCategory);
router.delete('/deletesinglecategory/:id',auth.verifyToken,categoryController.deleteSingleCategory);

module.exports=router;