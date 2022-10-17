let product = [];
const products = document.getElementById('products');
fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => {
    product = data;
    product.slice(9, 18).map(prod => {
        const items = products.innerHTML + `
            <div class="card prod-card mt-4 bg-image hover-zoom">
                <img src= ${prod.image} height="100px" width="100px">
                <div class="card-body">
                    <h5 class="card-title">${prod.title.slice(0, 10)}</h5>
                    <p class="card-text">$<strong class="prod-one">${prod.price}</strong></p>
                    <p class="d-none">shipping <input id="shipping-cost">50</input></p>
                </div>
                <div class="  prod-btn border-0">
                    <button class="btn btn-design btn-danger w-100" type="button" onClick="addToCart(${prod.id})">Add To Cart</button>
                </div>
            </div>
            `;
        products.innerHTML = items;

    })
})

let totalProducts = 0;
let price = 0;
let shipping = 0;
let totalPrice = 0;
let addToCart = (props) => {
    product.map((element) => {
        if (element.id === props) {
            totalProducts += 1;
            document.getElementById("total-products").value = totalProducts;
            price += parseFloat(element.price);
            document.getElementById("price-input").value = price.toFixed(2);
            if (price >= 500 && price < 800) {
                shipping = 100;
            }
            else if (price >= 800 && price < 1000) {
                shipping = 150;
            }
            else if (price >= 1000) {
                shipping = 200;
            }
            document.getElementById("shipping").value = shipping.toFixed(2);
            totalPrice = parseFloat(price + shipping);
            document.getElementById("total-input").value = totalPrice.toFixed(2);
            let vat = price * 15 / 100;
            document.getElementById("vat").value = vat.toFixed(2);
            totalPriceNtax = parseFloat(price + shipping + vat);
            document.getElementById("total-input-Ntax").value = totalPriceNtax.toFixed(2);
        }

    })
}

function checkout() {
    if (totalPrice > 0) {
        swal(`Your total Price is $${totalPriceNtax.toFixed(2)}`, '', 'info', {
            buttons: {
                cancel: "cancel",
                catch: {
                    text: "Confirm",
                    value: "catch",
                },
            }
        })
            .then((value) => {
                switch (value) {
                    case "catch":
                        swal('Bravo!', 'Thank you sir, your product is on the way.', 'success');
                        break;
                }
            });

        document.getElementById("total-products").value = '';
        document.getElementById("price-input").value = '';
        document.getElementById("shipping").value = '';
        document.getElementById("total-input").value = '';
        document.getElementById("vat").value = '';
        document.getElementById("total-input-Ntax").value = '';
        totalProducts = 0;
        price = 0;
        shipping = 0;
        totalPrice = 0;
        vat = 0;
        totalPriceNtax = 0;

    }
    else {
        Swal.fire({
            tittle: 'Error',
            text: 'Your cart is empty, please add products to your cart.',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;

    }
}

// upcoming products
let upcomingProds = [];
const upcoming = document.getElementById('upcoming-products');
fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => {
    upcomingProds = data;
    upcomingProds.slice(6, 9).map(element => {
        const elems = upcoming.innerHTML + `
        <div class="card mt-4 mx-2">
            <img src=${element.image} class="upcoming-img" height="100px" width="100px">
            <div class="card-body">
                    <h5 class="card-title">${element.title.slice(0, 10)}</h5>
                    <p class="card-text">$<strong class="prod-one">${element.price}</strong></p>
                    <p class="d-none">shipping <input id="shipping-cost">50</input></p>
            </div>
            <div class="upc-prod-btn">
            <button class="btn btn-danger w-100" type="button" disabled>Coming soon</button>
            </div>
        </div>
        `
        upcoming.innerHTML = elems;
    })

})

