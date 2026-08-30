/* =========================================
   CHILLAX HUB
   Main JavaScript
========================================= */


/* =========================================
   VARIABLES
========================================= */

const body = document.body;

const header = document.getElementById("header");

const preloader =
    document.getElementById("preloader");

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileNav =
    document.getElementById("mobileNav");

const categories =
    document.querySelectorAll(".category");

const menuCards =
    document.querySelectorAll(".menu-card");

const menuItems =
    document.querySelectorAll(".menu-item");

const menuSearch =
    document.getElementById("menuSearch");

const noResults =
    document.getElementById("noResults");

const year =
    document.getElementById("year");


/* =========================================
   PRELOADER
========================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 700);

});


/* =========================================
   YEAR
========================================= */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================
   HEADER SCROLL
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =========================================
   MOBILE MENU
========================================= */

mobileMenuButton.addEventListener(
    "click",
    () => {

        mobileNav.classList.toggle("open");

        const icon =
            mobileMenuButton.querySelector("i");

        if (mobileNav.classList.contains("open")) {

            icon.classList.remove(
                "fa-bars"
            );

            icon.classList.add(
                "fa-xmark"
            );

        } else {

            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }
);


/* Close mobile menu */

mobileNav
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove(
                    "open"
                );

                const icon =
                    mobileMenuButton
                        .querySelector("i");

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }
        );

    });


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        ".desktop-nav a"
    );

window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);


/* =========================================
   MENU FILTER
========================================= */

let currentCategory = "all";


categories.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categories.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });

            button.classList.add(
                "active"
            );

            currentCategory =
                button.dataset.filter;

            filterMenu();

        }
    );

});


/* =========================================
   SEARCH
========================================= */

menuSearch.addEventListener(
    "input",
    filterMenu
);


function filterMenu() {

    const searchValue =
        menuSearch.value
            .toLowerCase()
            .trim();

    let visibleCards = 0;

    menuCards.forEach(card => {

        const category =
            card.dataset.category;

        const cardText =
            card.innerText.toLowerCase();

        const categoryMatch =
            currentCategory === "all" ||
            category === currentCategory;

        const searchMatch =
            searchValue === "" ||
            cardText.includes(searchValue);

        if (
            categoryMatch &&
            searchMatch
        ) {

            card.classList.remove(
                "hidden"
            );

            visibleCards++;

        } else {

            card.classList.add(
                "hidden"
            );

        }

    });


    if (visibleCards === 0) {

        noResults.style.display =
            "block";

    } else {

        noResults.style.display =
            "none";

    }

}


/* =========================================
   SEARCH OVERLAY
========================================= */

const openSearch =
    document.getElementById("openSearch");

const closeSearch =
    document.getElementById("closeSearch");

const searchOverlay =
    document.getElementById("searchOverlay");

const overlaySearch =
    document.getElementById("overlaySearch");


openSearch.addEventListener(
    "click",
    () => {

        searchOverlay.classList.add(
            "open"
        );

        body.classList.add(
            "no-scroll"
        );

        setTimeout(() => {

            overlaySearch.focus();

        }, 300);

    }
);


function closeSearchOverlay() {

    searchOverlay.classList.remove(
        "open"
    );

    body.classList.remove(
        "no-scroll"
    );

}


closeSearch.addEventListener(
    "click",
    closeSearchOverlay
);


searchOverlay.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            searchOverlay
        ) {

            closeSearchOverlay();

        }

    }
);


/* Overlay search → actual menu */

overlaySearch.addEventListener(
    "input",
    () => {

        menuSearch.value =
            overlaySearch.value;

        filterMenu();

    }
);


overlaySearch.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            closeSearchOverlay();

            document
                .getElementById("menu")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    }
);


/* =========================================
   CART SYSTEM
========================================= */

let cart = [];


/* Elements */

const openCart =
    document.getElementById("openCart");

const closeCart =
    document.getElementById("closeCart");

const cartDrawer =
    document.getElementById("cartDrawer");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const emptyCart =
    document.getElementById("emptyCart");

const checkout =
    document.getElementById("checkout");

const toast =
    document.getElementById("toast");


/* =========================================
   OPEN CART
========================================= */

function openCartDrawer() {

    cartDrawer.classList.add(
        "open"
    );

    cartOverlay.classList.add(
        "open"
    );

    body.classList.add(
        "no-scroll"
    );

}


openCart.addEventListener(
    "click",
    openCartDrawer
);


/* =========================================
   CLOSE CART
========================================= */

function closeCartDrawer() {

    cartDrawer.classList.remove(
        "open"
    );

    cartOverlay.classList.remove(
        "open"
    );

    body.classList.remove(
        "no-scroll"
    );

}


closeCart.addEventListener(
    "click",
    closeCartDrawer
);


cartOverlay.addEventListener(
    "click",
    closeCartDrawer
);


/* =========================================
   ADD ITEM
========================================= */

menuItems.forEach(item => {

    item.addEventListener(
        "click",
        () => {

            const name =
                item.dataset.name;

            const price =
                Number(item.dataset.price);


            const existing =
                cart.find(
                    product =>
                        product.name === name
                );


            if (existing) {

                existing.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    quantity: 1

                });

            }


            updateCart();

            showToast(
                `${name} added`
            );

        }
    );

});


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.classList.add(
            "show"
        );

    } else {

        emptyCart.classList.remove(
            "show"
        );

    }


    let total = 0;

    let count = 0;


    cart.forEach(
        (product, index) => {

            total +=
                product.price *
                product.quantity;

            count +=
                product.quantity;


            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "cart-row";


            row.innerHTML = `

                <div>

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        ${product.price} EGP each
                    </p>

                    <div class="cart-controls">

                        <button
                            class="minus"
                            data-index="${index}"
                        >
                            −
                        </button>

                        <span>
                            ${product.quantity}
                        </span>

                        <button
                            class="plus"
                            data-index="${index}"
                        >
                            +
                        </button>

                        <button
                            class="remove-item"
                            data-index="${index}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

                <strong class="cart-price">
                    ${product.price * product.quantity}
                    EGP
                </strong>

            `;


            cartItems.appendChild(row);

        }
    );


    cartCount.textContent =
        count;

    cartTotal.textContent =
        total;


    attachCartButtons();

}


/* =========================================
   CART BUTTONS
========================================= */

function attachCartButtons() {

    document
        .querySelectorAll(".plus")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    cart[index].quantity++;

                    updateCart();

                }
            );

        });


    document
        .querySelectorAll(".minus")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        cart[index].quantity > 1
                    ) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(
                            index,
                            1
                        );

                    }


                    updateCart();

                }
            );

        });


    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    cart.splice(
                        index,
                        1
                    );

                    updateCart();

                }
            );

        });

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    toast.querySelector("span")
        .textContent = message;

    toast.classList.add(
        "show"
    );


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2200);

}


/* =========================================
   WHATSAPP CHECKOUT
========================================= */

checkout.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            showToast(
                "Your order is empty"
            );

            return;

        }


        let message =
            "Hello Chillax Hub! 👋%0A%0A";

        message +=
            "*New Order*%0A";

        message +=
            "━━━━━━━━━━━━━━%0A";


        cart.forEach(product => {

            message +=
                `• ${product.name} × ${product.quantity} = ${product.price * product.quantity} EGP%0A`;

        });


        const total =
            cart.reduce(
                (sum, product) =>
                    sum +
                    product.price *
                    product.quantity,
                0
            );


        message +=
            "━━━━━━━━━━━━━━%0A";

        message +=
            `*Total: ${total} EGP*%0A%0A`;

        message +=
            "Thank you! ❤️";


        const whatsappURL =
            `https://wa.me/201038645555?text=${message}`;


        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearchOverlay();

            closeCartDrawer();

            mobileNav.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================
   INITIALIZE
========================================= */

updateCart();