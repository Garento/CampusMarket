// CART BADGE 
const badge = document.getElementById("cartCount");

if (badge) {
    badge.textContent = "0";
    badge.style.display = "flex";
}

// ADD BUTTON ALERT 
const addCart = document.getElementById("addCart");

if(addCart){

    addCart.onclick = () => {

        alert(
            addCart.dataset.name + 
            " added to cart!"
        );

    };

}