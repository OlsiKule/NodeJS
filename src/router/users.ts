import express from "express";
import { isAuthenticated, isOwner } from "../middlewares";
import { getAllUsers, deleteUser, updateUser } from "../controllers/users";
import { deleteUserById } from "db/users";


export default (router: express.Router) => {
    router.get("/users", getAllUsers, isAuthenticated);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
    router.patch("/user/:id", isAuthenticated, isOwner, updateUser)
};

