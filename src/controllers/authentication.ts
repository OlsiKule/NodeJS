// register controller
import express from "express";

import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const login = async(req:express.Request, res: express.Response) => {
    try {
        // export the fields we want 
       const {email, password} = req.body;
       
       if (!email || !password){
        return res.sendStatus(400);
       }
       
       const user = await getUserByEmail(email).select("+authentication.salt +authentication.password");
       
       if (!user){
        return res.sendStatus(400);
       }


       const expectedHash = authentication(user.authentication.salt, password);

       if (user.authentication.password !== expectedHash) {
        return res.sendStatus(403);
        }
    
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie("OLSI-AUTH", user.authentication.sessionToken, { domain: "localhost", path: "/"})

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);   
    }
}

export const register = async (req:express.Request, res:express.Response ) => { 
    try {
        // extract the data from body
        const {email, password, username} = req.body; 

        // create a check to see if any of the fields are missing 
        if(!email || !password || !username) {
            return res.sendStatus(400);
        }

        // check if email entered exists
        const existingUser = await getUserByEmail(email);

            if(existingUser){
                return res.sendStatus(400);
            }
        // if everything is correct create authentication with salt
        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),  
            },
        });
        // return a success message
        return res.status(200).json(user).end();
    }
    catch(error) {
        console.log(error);
        return res.sendStatus(400);
    }
}