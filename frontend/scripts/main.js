async function loadoffers() {
    const response = await fetch("/api/products");
    const products = await response.json();
    const row = document.querySelector(".row");

    row.innerHTML = "";

    for (const product of products.products) {
        const card = document.createElement("div");
        console.log(product.id);
        card.id = product.id;
        card.classList.add('column')
        card.innerHTML = `
        <div class="card">
            <img src="assets/${product.imageName}" alt="${product.productName}" style="width:100%">
            <p>${product.normalPrice} Fr.</p>
            <p>${product.specialOffer} Fr.</p>
        </div>`;

        row.appendChild(card);
    }

}


loadoffers();