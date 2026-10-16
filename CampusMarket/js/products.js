// products.js

// UPDATE CART COUNT
function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    const badge = document.getElementById("cartCount");

    badge.style.display = "flex";
    badge.textContent = total;

}
updateCartCount();

const categoryButtons = document.querySelectorAll(".choices .page");
const productSections = document.querySelectorAll(".product-section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentPage = entry.target.id;
            categoryButtons.forEach(button => {
                button.classList.remove("active");
            });
            const activeButton = document.querySelector(`.choices .page[data-page="${currentPage}"]`);
            if (activeButton) {
                activeButton.classList.add("active");
            }
        }
    });
}, {
    threshold: 0.3
});

productSections.forEach(section => {
    observer.observe(section);
});


// FILTER SIDEBAR TOGGLE
const aside = document.querySelector("aside");
const filterToggle = document.getElementById("filterToggle");

filterToggle.addEventListener("click", () => {
    aside.classList.toggle("collapsed");
});

// Toggle Sort Dropdowns
for (let i = 1; i <= 7; i++) {
    const btn = document.getElementById(`sortBtn${i}`);
    const dropdown = document.getElementById(`sortDropdown${i}`);
    if (btn && dropdown) {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close others
            document.querySelectorAll('.sort-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('show');
            });
            dropdown.classList.toggle('show');
        });
    }
}
window.addEventListener('click', () => {
    document.querySelectorAll('.sort-dropdown').forEach(d => d.classList.remove('show'));
});

// CATEGORY NAVIGATION
function goToPage(pageId) {
    const section = document.getElementById(pageId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

function sortProducts(pageKey, type) {
    const section = document.getElementById(`products-${pageKey}`);
    const grid = document.getElementById(`grid-${pageKey}`);
    const label = document.getElementById(`sortLabel${pageKey.replace('page', '')}`);
    const cards = Array.from(grid.querySelectorAll('.product-card'));

    if (type === 'recent') {
        label.textContent = 'Most Recent';
    } else if (type === 'low-high') {
        label.textContent = 'Price: Low to High';
        cards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (type === 'high-low') {
        label.textContent = 'Price: High to Low';
        cards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    }

    cards.forEach(card => grid.appendChild(card));
}



