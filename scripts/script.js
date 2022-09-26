'use strict';

// initial variables

let books = [
    {
        id: 0,
        name: '1984',
        price: 10.50,
        amount: 30
    },
    {
        id: 1,
        name: 'Beyound good and evil',
        price: 12.90,
        amount: 20
    },
    {
        id: 2,
        name: 'Crime and punishment',
        price: 21.80,
        amount: 10
    },
    {
        id: 3,
        name: 'Portraint of Dorian Gray',
        price: 22.00,
        amount: 40
    }
]

const productBlock = document.querySelector('#products-block');
const actionBlock = document.querySelector('#action-block');
const dropdown = document.querySelector('#select-id');
let totalCost = 0;



if (books.length > 0) {
    productBlock.style.display = 'block';
    actionBlock.style.display = 'flex';
}

for (let i = 0; i < books.length; i++) {
    // добавляет product в productBlock
    const product = document.createElement('div');
    product.className = 'product';
    product.id = "bookID-" + books[i].id;

    const productImg = document.createElement('img');

    productImg.src = `./images/${books[i].name}.jpg`;
    productImg.alt = books[i].name;
    productImg.classList.add('product-photo');

    const productName = document.createElement('span');
    productName.className = 'product-name';
    productName.textContent = books[i].name;

    const productPrice = document.createElement('span');
    productPrice.className = 'product-price';
    productPrice.textContent = '$' + books[i].price.toFixed(2);

    const productAmount = document.createElement('span');
    productAmount.classList = 'product-amount';
    productAmount.id = 'amountID-'+ books[i].id;
    productAmount.textContent = `left ${books[i].amount} pcs`;


    product.appendChild(productImg);
    product.appendChild(productName);
    product.appendChild(productPrice);
    product.appendChild(productAmount);

    productBlock.appendChild(product);


    const selectOption = document.createElement('option');
    selectOption.value = books[i].id;
    selectOption.textContent = books[i].name;

    dropdown.appendChild(selectOption);
}


const addButton = document.querySelector('#add-to-cart-button');


function addToCart() {
                                 
    const selectedOption = document.querySelector('#select-id');
    const productNumber = document.querySelector('#product-number');
    const product = books.find(b => b.id === +selectedOption.value);
    const productAmount = document.querySelector('#amountID-' + product.id);
    

    if(product.amount >= +productNumber.value){  
     
        totalCost = totalCost + +productNumber.value * product.price;
        
        product.amount = product.amount - +productNumber.value;
        productAmount.textContent = `left ${product.amount} pcs`;
            
        

        const cartTable = document.querySelector('#cart-table');

        const cartProduct = document.createElement('li');
        cartProduct.classList.add('cart-product');

        const cartProductName = document.createElement('span');
        cartProductName.classList.add('cart-product-name');
        cartProductName.textContent = product.name;
        cartProduct.appendChild(cartProductName);

        const cartProductNumber = document.createElement('span');
        cartProductNumber.classList.add('cart-product-number');
        cartProductNumber.textContent = productNumber.value + ' pcs.';
        cartProduct.appendChild(cartProductNumber);

        const cartProductCost = document.createElement('span');
        cartProductCost.classList.add('cart-product-cost');
        cartProductCost.textContent = '$' + (+productNumber.value * product.price).toFixed(2);
        cartProduct.appendChild(cartProductCost);

        cartTable.appendChild(cartProduct);


        const totalCostBlock = document.querySelector('#total-cost');
        totalCostBlock.textContent = 'Total Cost: $' + totalCost.toFixed(2);

        document.querySelector('#cart-block').style.display = 'block';

        productNumber.value = '1';
    
    }
    else if(product.amount < +productNumber.value && product.amount != 0){
        alert(`We have only ${product.amount} books`)
    }
    else if(product.amount === 0){
        alert(`We dont have this book`)
    }

}


addButton.addEventListener('click', addToCart);

const deliveryCheckBox = document.querySelector('#delivery-checkbox');

deliveryCheckBox.addEventListener('click', (event) => {
    if (deliveryCheckBox.checked) {
        totalCost += 10.00;
        document.querySelector('#total-cost').textContent = 'Total Cost: $' + totalCost.toFixed(2);
    } else {
        totalCost -= 10.00;
        document.querySelector('#total-cost').textContent = 'Total Cost: $' + totalCost.toFixed(2);
    }
})

