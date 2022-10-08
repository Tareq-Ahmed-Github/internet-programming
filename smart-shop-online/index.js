let product = [];
const products = document.getElementById('products');
fetch('https://fakestoreapi.com/products').then(response => response.json()).then(data => {
    product = data;
    data.slice(9, 18).map(prod => {
        const items = products.innerHTML + `
            <div class="card prod-card col mt-4">
                <img src= ${prod.image} height="100px" width="100px">
                <div class="card-body">
                    <h5 class="card-title">${prod.title.slice(0,10)}</h5>
                    <p class="card-text">$<strong class="prod-one">${prod.price}</strong></p>
                </div>
                <div class="  prod-btn border-0">
                    <button class="btn btn-primary w-100" type="button">Buy Now</button>
                </div>
            </div>
            `;
        products.innerHTML = items;

    })



}
)