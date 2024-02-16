const jwt = require('jsonwebtoken');
const { PrismaClient }  = require('@prisma/client');

const prisma = new PrismaClient();


function verifyToken( req,res,next ){

    const token = req.headers.authoriazation;

    if(!token){
        return res.status(401).json({ message: 'Unathorized : Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded ) => {
        if (err){
            return  res.status(401).json({message :'Unathorized : Invalid token '})
        }


        const user = await prisma.user.findUnique({ where:{id :decoded.id }});
        if (!user){
            return res.status(401).json({message:'Unathorized : User not found'});
        }


        req.user =user;
        next();
    });

}



function verifyTokenSuperAdmin(req,res,next){
    const token = req.headers.authoriazation;

    if (!token){
        return res.status(401).json({ message : 'Unathorized :Token not provided'});
    }

    jwt.verify(token, process.env.JWT_SECRET_SUPERADMIN, async (err, decoded) =>{
        if (err){
            return res.status.json({message :'Unathorized :Inavalid Token'})
        }
        const superAdmin = await prisma.superAdmin.findUnique({ where: { id: decoded.id } });

        if (!superAdmin) {
          return res.status(401).json({ message: 'Unauthorized: SuperAdmin not found' });
        }
        req.superAdmin = superAdmin;
    next();
    });
}


module.exports = {
    verifyToken,
    verifyTokenSuperAdmin,
  };