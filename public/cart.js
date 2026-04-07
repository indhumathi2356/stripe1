document.addEventListener("DOMContentLoaded",()=>{
const payBtn=document.querySelector(".checkout-btn");
payBtn.addEventListener("click",()=>{
    if(payBtn){
    fetch("http://localhost:5000/stripe-checkout",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            items:JSON.parse(localStorage.getItem("cartItemS3"))
        }),
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.url){
            window.location.href=data.url;
        }
        else{
            console.error("invalid url received from server:",data.url);
        }
    })
    .catch((err)=>{
        console.log('err:',err);
    });
}
});
});