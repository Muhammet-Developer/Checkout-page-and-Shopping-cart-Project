const taxRate = 0.18;
const shippingPrice = 15;
const ShippingFreePrice = 300;

window.addEventListener("load",()=>{
    calculateCartPrice();
    //set items to LocalStorage
    localStorage.setItem("taxRate",taxRate);
    localStorage.setItem("shippingPrice",shippingPrice);
    localStorage.setItem("ShippingFreePrice",ShippingFreePrice);

    sessionStorage.setItem("taxRate",taxRate);
    sessionStorage.setItem("shippingPrice",shippingPrice);
    sessionStorage.setItem("ShippingFreePrice",ShippingFreePrice);
    
})

const productsDiv = document.querySelector(".products");

productsDiv.addEventListener("click",(event)=>{
    
    if(event.target.className == "fa-solid fa-minus"){ // We caught the minus buttons in products
        if(event.target.parentElement.querySelector(".quantity").innerText > 1){
            event.target.parentElement.querySelector(".quantity").innerText--;
            calculateProductPrice(event.target);
            calculateCartPrice();
        }
        else{
            if(confirm(`${event.target.parentElement.parentElement.querySelector("h2").innerHTML} The product will be deleted from the cart!!!`)){
            //When remove is less than 1, it will delete directly
            event.target.parentElement.parentElement.parentElement.remove();
        }
    }
    }

    else if(event.target.classList.contains("fa-plus")){ //we caught the pros in our products with a different capture method
        const lt = event.target.previousElementSibling.innerText++;
        // console.log(lt);
        calculateProductPrice(event.target);
        calculateCartPrice();
    }

    else if(confirm(`${event.target.parentElement.parentElement.querySelector("h2").innerHTML}The product will be deleted from the cart!!!`)){
        //If the product is to be deleted
        event.target.parentElement.parentElement.parentElement.remove();
        calculateCartPrice();
    }

})

const calculateProductPrice = (btn) =>{
    const productInfoDiv = btn.parentElement.parentElement;
    //console.log(productInfoDiv);
    const price = productInfoDiv.querySelector(".product-price strong").innerText; 
    const quantity =productInfoDiv.querySelector(".quantity").innerText;           
    const productTotalDiv = productInfoDiv.querySelector(".product-line-price"); 
    productTotalDiv.innerHTML = (price * quantity).toFixed(2);
} 

const calculateCartPrice = () => {
    const productsTotalPricesDivs = document.querySelectorAll(".product-line-price");
    let subtotal = 0;
    productsTotalPricesDivs.forEach(div =>{
        subtotal += parseFloat(div.innerText);
    })
    //console.log(subtotal);
    const taxPrice = subtotal * localStorage.getItem("taxRate");

     const shippingPrice = parseFloat(subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice") ? localStorage.getItem("shippingPrice") : 0);
    //console.log(shippingPrice);
    document.querySelector("#cart-subtotal").lastElementChild.innerText = subtotal.toFixed(2);
    document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);
    document.querySelector("#cart-shipping").children[1].innerText = shippingPrice.toFixed(2);
    document.querySelector("#cart-total").lastElementChild.innerText = (subtotal + taxPrice + shippingPrice).toFixed(2);
}
