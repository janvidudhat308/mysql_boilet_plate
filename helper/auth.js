const config=require('config');
const jwt=require('jsonwebtoken');
const genrateToken=(req,res,next)=>{
    const token=jwt.sign({email:req.body.email},config.get('jwtPrivateKey'));
    setTimeout(() => {
        token = null; 
        console.log("Token expired");
      }, 24 * 60 * 60 * 1000); 
    res.middlewareData=token;
    next();
}

const verifyToken=(req,res,next)=>{
    const token_value=req.header('x-auth-token');
    if(token_value==undefined)
    {
        res.send('access denied...');
    }
    try
    {
        const verify=jwt.verify(token_value,config.get('jwtPrivateKey'));

        req.user=verify;
        next();
    }
    catch(ex)
    {
        res.status(400).send('Invalid token..');
    }

}
exports.genrateToken=genrateToken;
exports.verifyToken=verifyToken;



