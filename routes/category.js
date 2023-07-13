//category router
const categoryController=require('../controller/categorycontroller');
const express=require('express');
const upload=require('../helper/upload');
const  router=express.Router();
const auth=require('../helper/auth');

router.post('/addcategory',upload.single('categoryimage'),categoryController.addCategory);
router.get('/showcategory',categoryController.listAllCategory);
router.post('/updatecategory/:id',upload.single('categoryimage'),categoryController.updatecategory);
// router.post('/updatecategory/:id',auth.verifyToken,upload.single('categoryimage'),categoryController.updateCategory);
router.delete('/deletecategory',categoryController.deleteMultipleCategory);
router.delete('/deletesinglecategory/:id',categoryController.deleteSingleCategory);

module.exports=router;