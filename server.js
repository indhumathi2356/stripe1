import express from "express";
import stripe from  "stripe";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app=express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors({
    origin:"*",
    methods:["GET","POST","OPTIONS"],
    headers:["Content-Type"],
}));
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
let stripeGateway=new stripe(process.env.secret_key);
app.post("/stripe-checkout",async(req,res)=>{
    const lineItems=req.body.items.map((item)=>{
        const unitAmount=parseInt(parseFloat(item.price)*100);
        return{
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name,
                    images:[item.images],
                },
                unit_amount:unitAmount,
            },
            quantity:item.quantity,
        };
    });
    const session=await stripeGateway.checkout.sessions.create({
        payment_method_types:["card"],
        mode:"payment",
        success_url:'http://localhost:5000/success.html',
        cancel_url:'http://localhost:5000/cancel.html',
        line_items:lineItems,
        billing_address_collection:"required",

    });
    res.json({url:session.url});
});
app.listen(5000,()=>{
    console.log("listening on port 5000");
});