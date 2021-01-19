async function loadpage() {
    const response = await fetch("/api/product");
    const product = await response.json();

    const row = document.querySelector(".row");
    row.innerHTML = "";

    for (const productdetails of product.product) {
        const card = document.createElement("div");
        card.id = productdetails.id;
        card.classList.add('columndetail')
        card.innerHTML = `
        <div class="card">
            <img src="assets/${productdetails.imageName}" alt="${productdetails.productName}" 
                style="width:100%"  onclick = "todetailpage('${productdetails.id}')">
            <p id = "normalprice">${productdetails.normalPrice} Fr.</p>
            <p id= "specialprice">${productdetails.specialOffer} Fr.</p>
        </div>`;

        row.appendChild(card);
    }
    for (const productdetails of product.product) {
        const card = document.createElement("div");
        card.id = productdetails.id;
        card.classList.add('columndetail')
        card.innerHTML = `
        <div class="card">
            <h1>${productdetails.productName}</h1>
            <p>${productdetails.description}</p>
            <button onclick = "">Zum Warenkorb</button>
        </div>`;

        row.appendChild(card);
    }
}

loadpage();