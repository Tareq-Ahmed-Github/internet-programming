let product = [];
const products = document.getElementById('products');
fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => {
    product = data;
    data.slice(9, 18).map(prod => {
        const items = products.innerHTML + `
            <div class="card prod-card col mt-4">
                <img src= ${prod.image} height="100px" width="100px">
                <div class="card-body">
                    <h5 class="card-title">${prod.title.slice(0, 10)}</h5>
                    <p class="card-text">$<strong class="prod-one">${prod.price}</strong></p>
                    <p class="d-none">shipping <input id="shipping-cost">50</input></p>
                </div>
                <div class="  prod-btn border-0">
                    <button class="btn btn-primary w-100" type="button" onClick="addToCart(${prod.id})">Add To Cart</button>
                </div>
            </div>
            `;
        products.innerHTML = items;

    })
})

let price = 0;
let shipping = 0;
let totalPrice = 0;
let addToCart = (props) => {
    product.map((element) => {
        if (element.id === props) {
            price += parseFloat(element.price);
            document.getElementById("price-input").value = price.toFixed(2);
            shipping += 50;
            document.getElementById("shipping").value = shipping.toFixed(2);
            // vat += parseFloat(element.vat);
            let vat = price * 5 / 100;
            document.getElementById("vat").value = vat.toFixed(2);
            totalPrice = parseFloat(price + shipping + vat);
            document.getElementById("total-input").value = totalPrice.toFixed(2);
        }

    })
}

