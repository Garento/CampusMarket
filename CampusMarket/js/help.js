// ===============================
// CART BADGE
// ===============================

function updateCartBadge(){

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    const badge = document.querySelector(".cart-badge");


    if(cart.length > 0){

        badge.textContent = cart.length;
        badge.style.display = "flex";

    }else{

        badge.textContent = "";
        badge.style.display = "none";

    }

}


updateCartBadge();




// ===============================
// HELP SEARCH
// ===============================


const searchInput = document.querySelector(
    ".search-box2 input"
);


const helpCards = document.querySelectorAll(
    ".help-box"
);



searchInput.addEventListener(
"keyup",
function(){


    let value = this.value
    .toLowerCase();



    helpCards.forEach(card=>{


        let text =
        card.innerText.toLowerCase();



        if(text.includes(value)){


            card.style.display="block";


        }else{


            card.style.display="none";


        }



    });



});





// ===============================
// NAVBAR SHADOW EFFECT
// ===============================


window.addEventListener(
"scroll",
()=>{


    const navbar =
    document.querySelector(".navbar");


    if(window.scrollY > 20){


        navbar.style.boxShadow =
        "0 5px 20px rgba(0,0,0,.12)";


    }else{


        navbar.style.boxShadow =
        "0 2px 10px rgba(0,0,0,.08)";


    }


});