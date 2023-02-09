// products from API

let repeat = () => {
    let counter = 1;
    while (counter <= 100) {

        const storeItemContainer = document.createElement("div");
        storeItemContainer.className = "col-10 col-sm-6 col-lg-4 mx-auto my-3 store-item";
        storeItemContainer.dataset.item = "sweets";

        const storeItemCard = document.createElement("div");
        storeItemCard.className = "card";

        const storeItemImgContainer = document.createElement("div");
        storeItemImgContainer.className = "img-container";

        const storeItemImage = document.createElement("img");
        storeItemImage.src = "";
        storeItemImage.className = "card-img-top store-img";
        storeItemImage.alt = "";

        const storeItemIcon = document.createElement("span");
        storeItemIcon.className = "store-item-icon";

        const storeItemIconI = document.createElement("i");
        storeItemIconI.className = "fa-solid fa-cart-plus";

        const storeItemPtag = document.createElement('p');
        storeItemPtag.innerText = "Add To Cart";

        const storeItemBody = document.createElement("div");
        storeItemBody.className = "card-body";

        const storeItemText = document.createElement("div");
        storeItemText.className = "card-text text-capitalize";

        const storeItemName = document.createElement("h5");
        storeItemName.id = "store-item-name";
        storeItemName.innerText = "item name";

        const storeItemValue = document.createElement("h5");
        storeItemValue.className = "store-item-value";

        const strongValue = document.createElement("strong");
        strongValue.className = "font-weight-bold";
        strongValue.id = "store-item-price";

        storeItemCard.appendChild(storeItemImgContainer)
        storeItemIcon.appendChild(storeItemIconI);
        storeItemIcon.appendChild(storeItemPtag);
        storeItemImgContainer.appendChild(storeItemImage);
        storeItemImgContainer.appendChild(storeItemIcon);
        storeItemCard.appendChild(storeItemBody)
        storeItemText.appendChild(storeItemValue)
        storeItemText.appendChild(storeItemName)
        document.getElementById("items-container")
            .appendChild(storeItemContainer)
            .appendChild(storeItemCard)
        storeItemBody.appendChild(storeItemText, storeItemName)
        storeItemValue.appendChild(strongValue)

        fetch('https://dummyjson.com/products/' + counter++)
            .then(res => res.json())
            .then(product => {
                storeItemImage.src = product.thumbnail
                strongValue.innerText = "$" + product.price
                storeItemName.innerText = product.title
            })
    }
}

repeat();


// show cart

(function () {
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");

    cartInfo.addEventListener("click", function () {
        cart.classList.toggle("show-cart");
    });
})();

// add items to the cart

(function () {
    const cartBtn = document.querySelectorAll(".store-item-icon");
    cartBtn.forEach(function (btn) {
        btn.addEventListener("click", function (event) {
            if (event.target.parentElement.classList.contains("store-item-icon")) {
                let productImg = event.target.parentElement.previousElementSibling.src;

                const item = {};
                let name =
                    event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                item.name = name;

                let price =
                    event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                let finalPrice = price.slice(1).trim();
                item.price = finalPrice;

                // console.log(finalPrice);
                // console.log(item.name);
                // console.log(item);

                const cartItem = document.createElement("div");
                cartItem.classList.add(
                    "cart-item",
                    "d-flex",
                    "justify-content-between",
                    "text-capitalize",
                    "my-3"
                );
                cartItem.id = "cart-item";


                const imgWrapper = document.createElement('img');
                imgWrapper.src = productImg;
                imgWrapper.className = "img-fluid rounded-circle";
                imgWrapper.id = "item-img";
                imgWrapper.alt = "";

                const itemText = document.createElement('div');
                itemText.className = "item-text";
                itemText.className = "mx-3";

                const title = document.createElement('p');
                title.id = "cart-item-title";
                title.className = "font-weight-bold mb-0";
                title.textContent = item.name;

                const priceWrapper = document.createElement('div');
                priceWrapper.className = "item-text-pricewrapper";

                const dollarSign = document.createElement('span');
                dollarSign.textContent = "$";

                const priceSpan = document.createElement('span');
                priceSpan.id = "cart-item-price";
                priceSpan.className = "cart-item-price mb-0";
                priceSpan.textContent = item.price;

                const removeLink = document.createElement('a');
                removeLink.id = "cart-item-remove";
                removeLink.className = "cart-item-remove";
                removeLink.href = "#";

                const trashIcon = document.createElement('i');
                trashIcon.className = "fas fa-trash";


                // Append

                cartItem.appendChild(imgWrapper, itemText, removeLink)

                removeLink.appendChild(trashIcon);
                priceWrapper.appendChild(dollarSign);
                priceWrapper.appendChild(priceSpan);
                itemText.appendChild(title);
                itemText.appendChild(priceWrapper);

                cartItem.appendChild(imgWrapper);
                cartItem.appendChild(itemText);
                cartItem.appendChild(removeLink);


                // cartItem.innerHTML = 
                // `
                // <img src="${productImg}" class="img-fluid rounded-circle" id="item-img" alt="">
                // <div class="item-text">
                //     <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                //     <div class="item-text-pricewrapper">
                //         <span>$</span>
                //         <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>    
                //     </div>
                // </div>
                // </div>
                // `;

                // select cart
                const cart = document.getElementById("cart");
                const total = document.querySelector(".cart-total-container");
                cart.insertBefore(cartItem, total);
                alert("Item Added to the Cart")
                showTotals();

                // remove item from cart
    
                (function () {
                    const removeBtn = document.querySelectorAll(".cart-item-remove");
                    removeBtn.forEach(function (btn) {
                        btn.addEventListener("click", function (event) {
                            if (event.target.parentElement.classList.contains("cart-item-remove")){
                                let removeCartItem = document.getElementById("cart-item");
                                event.target.parentElement.parentElement.remove();                                
                                // console.log(event.target.parentElement);
                                showTotals();
                            }
                        });
                    });
                })();
                
            }
        });
    });
})();

// show Totals

function showTotals() {
    const total = [];
    const items = document.querySelectorAll(".cart-item-price");

    items.forEach(function (item) {
        total.push(parseFloat(item.textContent));
    });

    const totalMoney = total.reduce(function (total, item) {
        total += item;
        return total;
    }, 0);
    const finalMoney = totalMoney.toFixed(2);

    document.getElementById("cart-total").textContent = finalMoney;
    document.getElementById("cart-total2").textContent = finalMoney;

    // document.getElementById(".item-total").textContent = finalMoney;
    document.getElementById("item-count").textContent = total.length;

    // console.log(finalMoney);


    // Clear All Items from cart

        (function () {
            const clearBtn = document.getElementById("clear-cart");
            clearBtn.addEventListener("click", function (event) {
                let clearAll = document.getElementById("cart-item");
                // console.log(clearAll);

                clearAll.remove();
                    showTotals();
                });
        })();


};
