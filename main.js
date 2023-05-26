const products = [
  {
    name: "Monitor Gamer Curvo 49 DQHD, 240Hz, 1ms, HDMI e DisplayPort, HDR 1000, FreeSync Premium, Ajuste de Altura",
    price: "8.599,90",
    preview: "product-image-monitor.jpg",
  },
  {
    name: "Cadeira Gamer  RGB - Preta com Iluminação (Led)",
    price: "959,90",
    preview: "product-image-cadeira.jpg",
  },
  {
    name: "Teclado Gamer Mecânico Low Profile RGB AW510K 580",
    price: "1.002,00",
    preview: "product-image-teclado.jpg",
  },
  {
    name: "Headset Gamer RGB Preto",
    price: "99,90",
    preview: "product-image-headset.jpg",
  },
  {
    name: "Patinho De Borracha Para Banho",
    price: "19,90",
    preview: "product-image-patinho.jpg"
  }
]

window.addEventListener("load", () => {
    const productsWrapper = document.querySelector('.products-wrapper')

    products.map((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
        <div class="product-image">
            <img
                src="./assets/${product.preview}"
                alt="Imagem de um monitor gamer "
            />
        </div>

        <div class="product-info">
            <h2 class="product-name">
                ${product.name}
            </h2>

            <div class="price-wrapper">
            <p class="product-price bold">R$ ${product.price}</p>
            <div class="stepper">
                <button class="btn btn-left">
                    <img src="./assets/minus.svg" alt="Botão de subtração" />
                </button>

                <input type="text" id="quantity" value="1" maxLength="2" class="quantity" />

                <button class="btn btn-right">
                    <img src="./assets/plus.svg" alt="Botão de adição" />
                </button>
            </div>
            </div>
        </div>
            `

        productsWrapper.appendChild(productCard)
        stepper(productCard, product)
        updateTotalPrice()
        limitCharacters(productCard);
    })
})

function stepper(productCard, product) {
    const btnLeft = productCard.querySelector('.btn-left');
    const btnRight = productCard.querySelector('.btn-right');
    const quantityInput = productCard.querySelector('#quantity')

    acceptOnlyNumbers(quantityInput);

    let quantity = 1;

    btnLeft.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity
            countTotalPrice(product.price, quantity)
            updateTotalPrice()
        }
    });

    btnRight.addEventListener('click', () => {
        quantity++;
        quantityInput.value = quantity
        countTotalPrice(product.price, quantity)
        updateTotalPrice()
    });

    return quantity;
}

function acceptOnlyNumbers(quantityInput) {
    quantityInput.addEventListener('keydown', (e) => {
        const regex = /^\d+$/;

        if (!regex.test(e.key)
            && e.key !== 'Backspace'
            && e.key !== 'Delete'
            && e.key !== 'ArrowLeft'
            && e.key !== 'ArrowRight') {
            e.preventDefault();
        }
    })
}

function countTotalPrice(productPrice, quantity) {
    const formattedPrice = productPrice.replace('.', '').replace(',', '.')
    const priceNumber = parseFloat(formattedPrice)
    const totalPrice = priceNumber * quantity

    return totalPrice
}

function updateTotalPrice() {
    const totalPriceElement = document.querySelector('.total-price')
    let totalPrice = 0

    const quantityInputs = document.querySelectorAll('.quantity');
    quantityInputs.forEach((quantityInput, index) => {
      const product = products[index]
      const quantity = parseInt(quantityInput.value)
      const productTotalPrice = countTotalPrice(product.price, quantity)
      totalPrice += productTotalPrice
    })

    totalPriceElement.textContent = totalPrice.toLocaleString('pt-br', {
        minimumFractionDigits: 2
    })
}

const cupomWrapper = document.querySelector('.cupom-wrapper')
const textAddCupom = document.querySelector('.cupom-wrapper p')
const inputWrapper = document.querySelector('.input-wrapper')

cupomWrapper.addEventListener('click', () => {
    inputWrapper.style.display = 'block'
    textAddCupom.style.display = 'none'
})

const closeInputWrapperBtn = document.querySelector('.close-input-wrapper')

closeInputWrapperBtn.addEventListener('click', (e) => {
    e.stopPropagation()

    textAddCupom.style.display = 'block'
    inputWrapper.style.display = 'none'
})

function limitCharacters(productCard) {
    const productsName = productCard.querySelectorAll('.product-name');
    const limit = 50

    productsName.forEach(productName => {
        const text = productName.textContent.trim();
        const dots = '...';

        if (text.length > limit) {
            const productNameFormatted = text.substring(0, limit - dots.length) + dots;
            productName.textContent = productNameFormatted;
        }
    })
}