let product = [];
const products = document.getElementById('products');
fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => {
    product = data;
    product.slice(9, 18).map(prod => {
        const items = products.innerHTML + `
            <div class="card prod-card mt-4">
                <img src= ${prod.image} height="100px" width="100px">
                <div class="card-body">
                    <h5 class="card-title">${prod.title.slice(0, 10)}</h5>
                    <p class="card-text">$<strong class="prod-one">${prod.price}</strong></p>
                    <p class="d-none">shipping <input id="shipping-cost">50</input></p>
                </div>
                <div class="  prod-btn border-0">
                    <button class="btn btn-danger w-100" type="button" onClick="addToCart(${prod.id})">Add To Cart</button>
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
            if (element.price > 500 && element.price < 800) {
                shipping += 100;
            }
            else if (element.price > 800 && element.price < 1000) {
                shipping += 150;
            }
            else if (element.price > 1000) {
                shipping += 200;
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
        Swal.fire({
            title: 'Order',
            html: `Your total Price is ${totalPrice.toFixed(2)}`,
            icon: 'success',
            confirmButtonText: 'Confirm'
        })
    }
    else {
        Swal.fire({
            tittle: 'Error',
            text: 'Please select some items',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
        return;

    }
}
