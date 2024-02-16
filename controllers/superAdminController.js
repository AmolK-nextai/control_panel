const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwtUtils = require('../utils/jwtUtils');

async function getAllSuperAdmins(req,res){
    const superAdmins = await prisma.superAdmin.findMany();
    res.json(superAdmins);
}


async function signupSuperAdmin(req,res){
    const { username, password }  = req.body;

    try{
        const newSuperAdmin = await prisma.superAdmin.create({
            data:{ username, password},
        });
        res.json(newSuperAdmin);
    } catch (error){
        res.status(500).json({ message: 'Error creating  super admin', error:error.message });
    }
}



async function loginSuperAdmin(req,res){
    const { username, password } = req.body;

    try {
        const superAdmin = await prisma.superAdmin.findUnique({ where: { username } });

        if (!superAdmin || superAdmin.password !== password ){
            return res.status(401).json({ message : 'Invalid credentials' })
        }


        const token = jwtUtils.generateToken(superAdmin);
        res.json({ token });

    }
   catch(error){


    res.status(500).json({message:'Error logging in ', error:error.message});

   } 
}



module.exports={
    getAllSuperAdmins,
    signupSuperAdmin,
    loginSuperAdmin
};