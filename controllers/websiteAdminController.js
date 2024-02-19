const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwtUtils = require('../utils/jwtUtils');

async function getAllWebsiteAdmins(req,res){
    try{
        const websiteAdmins= await prisma.websiteAdmin.findMany();
        res.json(websiteAdmins);
    }catch (error){
        res.status(500).json({message : 'Error retriving website admins ',error: error.message});
    }
}


async function signupWebsiteAdmin(req,res){
    const { username,password,contactnumber,industryName, websiteId}  = req.body;

    try{
        const  newWebsiteAdmin = await prisma.websiteAdmin.create({
            data:{ username, password, contactNumber, industryName, websiteId:Number(websiteId) },
        });
        res.json(newWebsiteAdmin);

    }catch (error){
        res.status(500).json({ message : 'Error creating website  admin', error: error.message});
    }
}



async function loginWebsiteAdmin(req,res){
    const { username, password } = req.body;
    try{
        const websiteAdmin = await prisma.websiteAdmin.findUnique({ where: {username}});

        if (!websiteAdmin || websiteAdmin.password !== password) {
            return res.status(401).json({ message: 'Invalid  credentials'});
        }


        const token  = jwtUtils.generateToken(websiteAdmin);
        res.json({ token });




    }
    catch(error){
        res.status(500).json({ message :'Error  logging in ',  error :  error.message });

    }
}


module.exports={
    getAllWebsiteAdmins,
    loginWebsiteAdmin,
    signupWebsiteAdmin,

}


