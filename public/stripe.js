let cartItem10=JSON.parse(localStorage.getItem("cartItem10"))||[];
function addToCart(productCard){
    const name=productCard.querySelector(".product-title").textContent;
    const priceText=productCard.querySelector(".product-price").textContent;
    const price=parseFloat(priceText.replace("₹",""));
    const imgSrc=productCard.querySelector(".product-img").src;
    const existingItem=cartItem10.find((item)=>item.name ===name);
    if(existingItem){
        existingItem.quantity +=1;
    }
    else{
        cartItem10.push({
            name,
            price,
            image:imgSrc,
            quantity:1,
        });
    }
    updateLocalStorage();
    displayCartItems();
    updateCartCount();
    showToast(`${name} added to cart`);
}
function removeItem(name)
{
    cartItem10=cartItem10.filter((item) =>item.name !==name);
    updateLocalStorage();
    if(document.getElementById("cartItem10"))
    {
        displayCartItems();
    }
}
function updateCartCount()
{
    const countElement=document.getElementById("cart-count");
    const itemCount=cartItem10.reduce((count,item) => count +item.quantity,0);
    if(countElement)
    {
        countElement.textContent=itemCount;
    }
}
function displayCartItems(){
    const cartContainer=document.getElementById("cartItem10");
    const totalElement=document.getElementById("cartTotal");
    if(!cartContainer)return;
    cartContainer.innerHTML="";
    let total=0;
    cartItem10.forEach((item)=>{
        const itemTotal=item.price * item.quantity;
        total +=itemTotal;
        const cartItem10=document.createElement("div");
        cartItem10.className="cart-item";
        cartItem10.innerHTML=`
        <img src="${item.image}" alt="${item.name}"/>
        <div class="cart-title-price">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${itemTotal.toFixed(2)}</div>
        </div>
        <div class="quantity-controls">
        <button onclick="changeQuantity('${item.name}',-1)"><i class="fa-solid fa-minus"></i></button>
        <input type="text" name="" class="cart-item-quantity" value="${item.quantity}" min="1" onchange="updadeQuantity('${item.name}',this.value)">
        <button onclick="changeQuantity('${item.name}',1)"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="remove-from-cart" onclick="removeItem('${item.name}')"><i class="fa-solid fa-trash"></i></div>
        `;
        cartContainer.appendChild(cartItem10);
    });
    if(totalElement)
    {
        totalElement.textContent=`Total:₹${total.toFixed(2)}`;
    }
    }
    function changeQuantity(name,delta){
        const item=item.find((item)=>item.name ===name);
        if(item){
            item.qunatity +=delta;
            if(item.quantity <1){
                removeItem(name);
            }
            else{
                updateLocalStorage();
                displayCartItems();
            }
        }
    }
function updateLocalStorage(){
    localStorage.setItem("cartItem10",JSON.stringify(cartItem10));
}
window.onload=function(){
    updateLocalStorage();
    updateCartCount();
    if(document.getElementById("cartItem10")){
        displayCartItems();
    }
    createToastContainer();
};
function createToastContainer(){
    if(document.getElementById("toast-container")) return;
    const toastContainer=document.createElement("div");
    toastContainer.id="toast-container";
    toastContainer.className="toast-container";
    document.body.appendChild(toastContainer);
}
function showToast(message){
    const toast=document.createElement("div");
    toast.className="toast";
    toast.textContent=message;
    const container=document.getElementById("toast-container");
    container.appendChild(toast);
    setTimeout(()=>{
        toast.classList.add("toast-show");
    },500);
    setTimeout(()=>{
        toast.classList.remove("toast-show");
        setTimeout(()=>{
            if(container.contains(toast)){
                container.removeChild(toast);
            }
        },500);
    },3000);
}