async function loadoffers() {
    const response = await fetch("/api/products");
    const products = await response.json();
    const row = document.querySelector(".row");

    row.innerHTML = "";

    for (const product of products.products) {
        const card = document.createElement("div");
        card.id = product.id;
        card.classList.add('column')
        card.innerHTML = `
        <div class="card">
            <img src="assets/${product.imageName}" alt="${product.productName}" 
                style="width:100%"  onclick = "todetailpage('${product.id}')">
            <p id = "normalprice">${product.normalPrice} Fr.</p>
            <p id= "specialprice">${product.specialOffer} Fr.</p>
            <button onclick = "">Zum Warenkorb</button>
        </div>`;

        row.appendChild(card);
    }
}

async function todetailpage(productid) {
    await fetch(`/session/${productid}`, { method: "PUT" });

    location.href = "./productdetails.html";
}


loadoffers();