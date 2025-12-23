import express from "express";
import stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(express.static("public"));
app.use(express.json());
app.get("/",(req,res)=>{
    res.sendFile("stripe.html",{root:"public"});
});
app.get("/cart.html",(req,res)=>{
    res.sendFile("cart.html",{root:"public"});
});
app.get("/success.html",(req,res)=>{
    res.sendFile("success.html",{root:"public"});
});
app.get("/cancel.html",(req,res)=>{
    res.sendFile("cancel.html",{root:"public"});
});
app.listen(3000,()=>{
    console.log("listening on port 3000");
});