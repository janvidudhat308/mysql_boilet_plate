const { log } = require('console');
const multer=require('multer');
var path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        let ext=path.extname(file.originalname)
        cb(null, Date.now()+ext)
    }
});
 
var upload = multer({ 
    storage: storage,
    fileFilter:function(req,file,callback){
        if(file.mimetype=="image/png"||file.mimetype=="image/jpg"||file.mimetype=="image/jpeg")
        {
            callback(null,true);
        }
        else
        {
            
            callback(null,false);
        }
    },
    limits:{
        fileSize:1024*1024*2
    }
});
module.exports=upload