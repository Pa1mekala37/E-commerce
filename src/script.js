let shop = document.getElementById("explore-menu-section-items");

let mybasket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, productName, img, price } = x;
            let search = mybasket.find((x) => x.id === id) || []
            return `
            <div id=product-id-${id} class="col-12 col-md-6 col-lg-3">
                <div class="shadow-lg menu-item-card p-3 mb-3">
                <img src=${img} class="menu-item-image w-100" />
                <h1 class="product-card-title">${productName}</h1>
                <div class="d-flex flex-row justify-content-between">
                    <h1 class="item-price"> ₹ ${price}</h1>
                    <div class="add-cart-buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
                </div>
            </div>
    `;
        }).join(""));
};

generateShop();



let increment = (id) => {
    let selectedItem = id;
    let search = mybasket.find((x) => x.id === selectedItem.id);

    if (search === undefined) {
        mybasket.push({
            id:selectedItem.id,
            item:1,
        });
    } else {
        search.item += 1;
    }

    // console.log(mybasket)
    update(selectedItem.id);
    localStorage.setItem("data",JSON.stringify(mybasket));
}



let decrement = (id) => {
    let selectedItem = id;
    let search = mybasket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
     else {
        search.item -= 1;
    }

    update(selectedItem.id);
    mybasket = mybasket.filter((x) => x.item !== 0);
    // console.log(mybasket);
    localStorage.setItem("data",JSON.stringify(mybasket));
}

let update = (id) => {
    let search = mybasket.find((x) => x.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;
    totalCartQuantity();
};


let totalCartQuantity  = () => {
    let cartQuantity = document.getElementById("cartQuantity")
    cartQuantity.innerHTML = mybasket.map((x) => x.item).reduce((x,y) => x+y,0);
}

totalCartQuantity();