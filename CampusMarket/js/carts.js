// ===============================
// CART PAGE SYSTEM
// ===============================

let products = JSON.parse(localStorage.getItem("cart")) || [];
const SHIPPING_FEE = 0;
const PLATFORM_FEE = 20;
let promoApplied = false
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");

// ================= FORMAT PESO =================
function formatPeso(amount){
    return "₱" +
    amount.toLocaleString(
        "en-PH",
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    );
}


// ================= DISPLAY CART ================//
function renderCart(){
    if(!cartItems) return;

    cartItems.innerHTML = "";
    products.forEach(product => {
        const item = document.createElement("div");
        item.className = "cart-item";
        item.innerHTML = `
        <img 
            class="product-image"
            src="${product.image}"
            alt="${product.name}">
        
            <div class="product-details">
                <h3>
                ${product.name}
                </h3>

                <strong>
                ${formatPeso(product.price)}
                </strong>

                <p>
                ${product.condition}
                </p>

                <p>
                Category:
                ${product.category}
                </p>
        </div>

        <div class="quantity-control">
            <button class="minus">
                −
            </button>

            <span>
                ${product.quantity}
            </span>

            <button class="plus">
                +
            </button>
        </div>

        <strong class="line-total">
        ${
            formatPeso(
            product.price *
            product.quantity
            )

        }
        </strong>

        <button class="remove-button">
        <i class="bx bx-trash"></i>
        </button>
        `;



        // PLUS
        item.querySelector(".plus").addEventListener("click",()=>{

            product.quantity++;

            saveCart();

            renderCart();
        });

        // MINUS
        item.querySelector(".minus").addEventListener("click",()=>{

            if(product.quantity > 1){

                product.quantity--;

                saveCart();

                renderCart();
            }
        });

        // REMOVE
        item.querySelector(".remove-button").addEventListener("click",()=>{

            products =
            products.filter(
                item =>
                item.id !== product.id
            );
            saveCart();

            renderCart();
        });

        cartItems.appendChild(item);
    });

    updateEmptyState();

    updateSummary();
}


// ================= SAVE =================//
function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(products)
    );
}


// ================= EMPTY CART =================
function updateEmptyState(){

    const empty = products.length === 0;

    if(emptyCart){
        emptyCart.hidden =
        !empty;
    }

    if(cartItems){
        cartItems.hidden =
        empty;
    }
}

// ================= SUMMARY =================
function updateSummary(){

    const count = products.reduce(
        (sum,item)=>
        sum + item.quantity,
        0
    );

    const subtotal =
    products.reduce(
        (sum,item)=>sum + (item.price * item.quantity), 0
    );

    const shipping = products.length ? SHIPPING_FEE : 0;
    const platform = products.length ? PLATFORM_FEE : 0;
    const discount = promoApplied ? subtotal * 0.10 : 0;
    const total = subtotal + shipping + platform - discount;
    const elements = {

        cartCount:count,

        summaryCount:count,

        subtotal:
        formatPeso(subtotal),

        shipping:
        formatPeso(shipping),

        platformFee:
        formatPeso(platform),

        discount:
        "-" + formatPeso(discount),

        total:
        formatPeso(total)
    };


    Object.keys(elements)
    .forEach(id=>{
        const el = document.getElementById(id);

        if(el){
            el.textContent =
            elements[id];
        }
    });
}

// ================= PROMO =================
const applyPromo = document.getElementById("applyPromo");

if (applyPromo){

    applyPromo.addEventListener("click", ()=> {
    
        const input = document.getElementById("promoInput");
        const message = document.getElementById("promoMessage");

        if (input.value.trim().toUpperCase() === "CAMPUS10") {
            promoApplied=true;
            message.textContent =
            "Promo applied! You saved 10%.";
        }

        else {
            promoApplied=false;
            message.textContent =
            "Invalid promo code.";
        }

        updateSummary();
    });
}

// START
renderCart();

document.getElementById("checkoutButton").addEventListener("click", function () {
    const cartItems = document.getElementById("cartItems");

    // Tingnan kung may laman ang cart
    if (!cartItems || cartItems.children.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Kapag may laman ang cart, magpatuloy sa checkout
    window.location.href = "../pages/checkout.html";
});