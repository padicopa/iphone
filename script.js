// --- Variables Globales y Datos de Productos ---
let cart = []; // El carrito de compras, debería ser un array de objetos {id, name, price, quantity}
let hasCartBeenOpenedAutomatically = false; // Bandera para controlar la apertura automática del carrito (primera adición)
let openCartOnFirstAddAfterCheckout = false; // Bandera: Para controlar la apertura después de una compra confirmada

// RUTAS DE IMAGENES: Deben ser relativas a la carpeta 'assets/img/' que es la raíz de tu proyecto.
const products = [
    { id: 1, name: "iPhone 16", price: 900.00, image: "assets/img/iphone16_2.jpg" },
    { id: 2, name: "iPhone 16 PRO", price: 1000.00, image: "assets/img/iphone16pro.jpg" },
    { id: 3, name: "iPhone 16 PRO MAX", price: 1100.00, image: "assets/img/iphonepromax16.jpg" }
];

// --- Datos Estáticos para Dirección (Argentina y Uruguay) ---
const argentinaProvinces = [
    "Buenos Aires", "Ciudad Autónoma de Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes",
    "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza",
    "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis",
    "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán"
].sort();

const uruguayDepartments = [
    "Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida",
    "Lavalleja", "Maldonado", "Montevideo", "Paysandú", "Río Negro", "Rivera",
    "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres"
].sort();

// Datos de ciudades por provincia/departamento
const citiesByProvince = {
    // Argentina - Buenos Aires (con zonas)
    "Buenos Aires": [
        "Adrogué (Zona Sur)", "Banfield (Zona Sur)", "Burzaco (Zona Sur)", "Lanús (Zona Sur)", "Lomas de Zamora (Zona Sur)", "Quilmes (Zona Sur)", "Temperley (Zona Sur)",
        "Acassuso (Zona Norte)", "Florida (Zona Norte)", "Martinez (Zona Norte)", "Olivos (Zona Norte)", "San Isidro (Zona Norte)", "Vicente López (Zona Norte)",
        "Ciudad Evita (Zona Oeste)", "Haedo (Zona Oeste)", "Laferrere (Zona Oeste)", "Morón (Zona Oeste)", "Ramos Mejía (Zona Oeste)", "San Justo (Zona Oeste)",
        "Berazategui (Zona Este)", "La Plata (Zona Este)", "Ensenada (Zona Este)", "Berisso (Zona Este)"
    ].sort(),
    // Argentina - Ciudad Autónoma de Buenos Aires (con barrios)
    "Ciudad Autónoma de Buenos Aires": [
        "Agronomía", "Almagro", "Balvanera", "Barracas", "Belgrano", "Boedo", "Caballito", "Chacarita", "Coghlan", "Colegiales",
        "Constitución", "Flores", "Floresta", "La Boca", "La Paternal", "Liniers", "Mataderos", "Monte Castro", "Monserrat",
        "Nueva Pompeya", "Núñez", "Palermo", "Parque Avellaneda", "Parque Chacabuco", "Parque Chas", "Parque Patricios",
        "Puerto Madero", "Recoleta", "Retiro", "Saavedra", "San Cristóbal", "San Nicolás", "San Telmo", "Vélez Sarsfield",
        "Versalles", "Villa Crespo", "Villa del Parque", "Villa Devoto", "Villa General Mitre", "Villa Lugano", "Villa Luro",
        "Villa Ortúzar", "Villa Pueyrredón", "Villa Real", "Villa Riachuelo", "Villa Santa Rita", "Villa Soldati", "Villa Urquiza"
    ].sort(),
    // Otras provincias argentinas (ejemplos, puedes expandir si necesitas más)
    "Córdoba": ["Córdoba Capital", "Río Cuarto", "Villa Carlos Paz", "San Francisco"].sort(),
    "Santa Fe": ["Rosario", "Santa Fe Capital", "Rafaela", "Venado Tuerto"].sort(),
    "Mendoza": ["Mendoza Capital", "San Rafael", "Godoy Cruz", "Las Heras"].sort(),
    "Salta": ["Salta Capital", "Orán", "Tartagal"].sort(),
    // Puedes añadir provincias que no tengan localidades predefinidas, por ejemplo:
    "Chaco": [], // Provincia sin localidades predefinidas para activar la lógica de "Datos Adicionales"
    // Uruguay - Departamentos (se usan los nombres de los departamentos como localidades por simplicidad, o se podrían agregar ciudades específicas)
    "Artigas": ["Artigas", "Bella Unión", "Tomás Gomensoro"].sort(),
    "Canelones": ["Canelones", "Las Piedras", "Pando", "Ciudad de la Costa"].sort(),
    "Cerro Largo": ["Melo", "Río Branco", "Fraile Muerto"].sort(),
    "Colonia": ["Colonia del Sacramento", "Carmelo", "Nueva Palmira"].sort(),
    "Durazno": ["Durazno", "Sarandí del Yí"].sort(),
    "Flores": ["Trinidad"].sort(),
    "Florida": ["Florida"].sort(),
    "Lavalleja": ["Minas", "José Pedro Varela"].sort(),
    "Maldonado": ["Maldonado", "Punta del Este", "San Carlos", "Piriápolis"].sort(),
    "Montevideo": ["Montevideo"].sort(),
    "Paysandú": ["Paysandú", "Guichón"].sort(),
    "Río Negro": ["Fray Bentos", "Young"].sort(),
    "Rivera": ["Rivera", "Tranqueras"].sort(),
    "Rocha": ["Rocha", "Chuy", "La Paloma"].sort(),
    "Salto": ["Salto", "Daymán", "Arapey"].sort(),
    "San José": ["San José de Mayo", "Ciudad del Plata"].sort(),
    "Soriano": ["Mercedes", "Dolores"].sort(),
    "Tacuarembó": ["Tacuarembó", "Paso de los Toros"].sort(),
    "Treinta y Tres": ["Treinta y Tres", "Vergara"].sort()
};


// --- Elementos del DOM (Asegúrate de que tus IDs en index.html coincidan) ---
const cartIcon = document.getElementById("cart-icon");
const cartSidebar = document.getElementById("cart-sidebar");
const closeCartBtn = document.getElementById("close-cart-btn");
const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartCountElement = document.getElementById("cart-count");
const checkoutForm = document.getElementById("checkout-form");
const checkoutSuccess = document.getElementById("checkout-success");
const cartActions = document.getElementById("cart-actions");
const clearCartBtn = document.getElementById("clear-cart-btn");
const checkoutBtn = document.getElementById("checkout-btn");
const backToHomeBtn = document.getElementById("back-to-home-btn");
const backToMenuFromCheckoutBtn = document.getElementById("back-to-menu-btn");

// Variables para campos de Datos Personales
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const phoneAreaCodeInput = document.getElementById("phone-area-code"); 
const phoneNumberInput = document.getElementById("phone-number");     

const fullNameError = document.getElementById("full-name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");           

// Variables para campos de Dirección de Envío
const countrySelect = document.getElementById("country");
const provinceSelect = document.getElementById("province");
const citySelect = document.getElementById("city");
const streetInput = document.getElementById("street");
const numberInput = document.getElementById("number");
const zipCodeInput = document.getElementById("zip-code");
const additionalDataTextarea = document.getElementById("additional-data");

const countryError = document.getElementById("country-error");
const provinceError = document.getElementById("province-error");
const cityError = document.getElementById("city-error");
const streetError = document.getElementById("street-error");
const numberError = document.getElementById("number-error");
const zipCodeError = document.getElementById("zip-code-error");
const additionalDataError = document.getElementById("additional-data-error");


// Variables para opciones de pago
const radioMercadoPago = document.getElementById("radio-mercadopago");
const radioTarjeta = document.getElementById("radio-tarjeta");
const cardDetailsDiv = document.getElementById("card-details");
const cardNumberInput = document.getElementById("card-number");
const cardNameInput = document.getElementById("card-name");
const expiryDateInput = document.getElementById("expiry-date");
const cvvInput = document.getElementById("cvv");

// Variables para elementos de error de tarjeta
const cardNumberError = document.getElementById("card-number-error");
const cardNameError = document.getElementById("card-name-error");
const expiryDateError = document.getElementById("expiry-date-error");
const cvvError = document.getElementById("cvv-error");
const cardNumberValidationIcon = document.getElementById("card-number-validation-icon");
// NUEVO: Elemento para el ícono de la marca de tarjeta
const cardBrandIcon = document.getElementById("card-brand-icon"); 


// --- Funciones del Carrito ---

// Inicializa la pantalla de productos
function initializeProducts() {
    productGrid.innerHTML = ''; // Limpiar cualquier contenido existente
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}">Agregar al carrito</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Añadir event listeners a los botones "Agregar al carrito"
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", addToCart);
    });
}

// Agrega un producto al carrito
function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const productToAdd = products.find(p => p.id === productId);

    if (productToAdd) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...productToAdd, quantity: 1 });
        }
        updateCartDisplay();

        // Abre el carrito si es la primera vez que se agrega un producto
        // O si es la primera vez que se agrega después de una compra confirmada
        if (!hasCartBeenOpenedAutomatically || openCartOnFirstAddAfterCheckout) {
            cartSidebar.classList.add("open"); // Abre la barra lateral
            hasCartBeenOpenedAutomatically = true; // Marca que ya se abrió automáticamente (para la sesión actual)
            openCartOnFirstAddAfterCheckout = false; // Reinicia la bandera para la siguiente compra
        }
    }
}

// Actualiza la visualización del carrito
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let itemCount = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
        cartTotalElement.textContent = '$0.00';
        cartCountElement.textContent = '0';
        cartActions.style.display = "none"; // Ocultar botones si el carrito está vacío
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.classList.add("cart-item");
        itemElement.innerHTML = `
            <span>${item.name} - $${item.price.toFixed(2)}</span>
            <div class="item-quantity-controls">
                <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            </div>
            <button class="remove-from-cart-btn" data-id="${item.id}">Eliminar</button>
        `;
        cartItemsContainer.appendChild(itemElement);

        total += item.price * item.quantity;
        itemCount += item.quantity;
    });

    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    cartCountElement.textContent = itemCount.toString();
    cartActions.style.display = "flex"; // Mostrar botones si hay ítems en el carrito

    // Añadir event listeners a los botones de cantidad y eliminar
    document.querySelectorAll(".quantity-btn").forEach(button => {
        button.addEventListener("click", updateItemQuantity);
    });
    document.querySelectorAll(".remove-from-cart-btn").forEach(button => {
        button.addEventListener("click", removeFromCart);
    });
}

// Actualiza la cantidad de un producto en el carrito
function updateItemQuantity(event) {
    const productId = parseInt(event.target.dataset.id);
    const action = event.target.dataset.action; // 'increase' o 'decrease'

    const itemToUpdate = cart.find(item => item.id === productId);

    if (itemToUpdate) {
        if (action === "increase") {
            itemToUpdate.quantity++;
        } else if (action === "decrease") {
            if (itemToUpdate.quantity > 1) {
                itemToUpdate.quantity--;
            } else {
                // Si la cantidad llega a 0, eliminar el item del carrito
                cart = cart.filter(item => item.id !== productId);
            }
        }
    }
    updateCartDisplay();
}

// Elimina un producto del carrito
function removeFromCart(event) {
    const productId = parseInt(event.target.dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Vacía todo el carrito
function clearCart() {
    cart = [];
    updateCartDisplay();
}


// --- Lógica del Checkout / Formulario ---

// Función para manejar el cambio de método de pago
function handlePaymentMethodChange() {
    if (radioTarjeta.checked) {
        cardDetailsDiv.style.display = "flex"; 
        // Establecer 'required' si el campo de tarjeta está visible
        cardNumberInput.setAttribute("required", "true");
        cardNameInput.setAttribute("required", "true");
        expiryDateInput.setAttribute("required", "true");
        cvvInput.setAttribute("required", "true");
        detectCardBrand(); // Vuelve a detectar la marca si el campo tiene algo al habilitarse
    } else {
        cardDetailsDiv.style.display = "none"; 
        // Remover 'required' y limpiar errores si no es método de tarjeta
        cardNumberInput.removeAttribute("required");
        cardNameInput.removeAttribute("required");
        expiryDateInput.removeAttribute("required");
        cvvInput.removeAttribute("required");

        // Limpiar valores y mensajes de error de tarjeta
        cardNumberInput.value = '';
        cardNameInput.value = '';
        expiryDateInput.value = '';
        cvvInput.value = '';
        setErrorMessage(cardNumberError, '');
        setErrorMessage(cardNameError, '');
        setErrorMessage(expiryDateError, '');
        setErrorMessage(cvvError, '');
        
        // Limpiar clases de validación del input y el ícono
        cardNumberInput.classList.remove('valid', 'invalid');
        cardNumberValidationIcon.className = ''; // Limpiar clases del ícono
        cardNumberValidationIcon.textContent = ''; // Limpiar texto del ícono
        // NUEVO: Limpiar la marca de la tarjeta al deshabilitar los campos de tarjeta
        cardBrandIcon.className = '';
        cardBrandIcon.innerHTML = '';
    }
}

// Resetear todos los campos del formulario de checkout y mensajes de error
function resetCheckoutForm() {
    // Resetear campos de texto/email/telefono
    fullNameInput.value = '';
    emailInput.value = '';
    phoneAreaCodeInput.value = ''; 
    phoneNumberInput.value = '';   
    streetInput.value = '';
    numberInput.value = '';
    zipCodeInput.value = '';
    additionalDataTextarea.value = '';

    // Resetear selects a la opción por defecto
    countrySelect.value = '';
    provinceSelect.innerHTML = '<option value="">Seleccione una provincia/departamento</option>';
    provinceSelect.disabled = true;
    citySelect.innerHTML = '<option value="">Seleccione una localidad/barrio</option>';
    citySelect.disabled = true;

    // Resetear radios de pago (por defecto Mercado Pago)
    radioMercadoPago.checked = true;
    handlePaymentMethodChange(); // Esto limpiará los campos de tarjeta y sus errores

    // Limpiar todos los mensajes de error
    document.querySelectorAll('.error-message').forEach(el => setErrorMessage(el, ''));
    
    // Limpiar clases de validación visual de todos los inputs en el formulario
    document.querySelectorAll('#checkout-form input, #checkout-form select, #checkout-form textarea').forEach(input => {
        input.classList.remove('valid', 'invalid');
    });
    // Limpiar el ícono de validación de tarjeta
    cardNumberValidationIcon.className = '';
    cardNumberValidationIcon.textContent = '';
    // NUEVO: Limpiar el ícono de la marca de tarjeta
    cardBrandIcon.className = '';
    cardBrandIcon.innerHTML = '';
}


// Mostrar el formulario de checkout
function showCheckoutForm() {
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
        return;
    }
    cartSidebar.classList.remove("open");
    productGrid.style.display = "none";
    checkoutForm.style.display = "flex"; // Usar flex para la visualización del formulario
    checkoutSuccess.style.display = "none";
    
    resetCheckoutForm(); // Limpiar y resetear el formulario cada vez que se abre
    loadCountries(); // Cargar países después de resetear

    // Asegura el estado correcto de los campos de tarjeta al mostrar el form
    handlePaymentMethodChange(); 
}

// Volver a la grilla de productos desde el formulario de checkout
function backToMenu() {
    checkoutForm.style.display = "none";
    productGrid.style.display = "grid";
    window.scrollTo(0, 0); // Scroll al inicio de la página
    resetCheckoutForm(); // Limpiar el formulario al volver
    // IMPORTANTE: Al volver al menú desde el checkout, reiniciamos la bandera
    // para que la próxima vez que se agregue un producto, el carrito se abra.
    hasCartBeenOpenedAutomatically = false; 
    openCartOnFirstAddAfterCheckout = true; // Habilita la apertura única tras el checkout
}


// --- Funciones de Validación de Campos Generales ---

function setErrorMessage(element, message) {
    element.textContent = message;
    if (message) {
        element.classList.add('visible');
    } else {
        element.classList.remove('visible');
    }
}

function validateFullName() {
    // REQUISITO: No permitir caracteres especiales ni números. Solo letras y espacios.
    // Limpiar el valor para permitir solo letras (incluyendo acentos y ñ) y espacios.
    fullNameInput.value = fullNameInput.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');

    let value = fullNameInput.value.trim();
    setErrorMessage(fullNameError, ''); // Limpiar error previo

    if (!value) {
        setErrorMessage(fullNameError, "El nombre completo es obligatorio.");
        return false;
    }
    // Validar formato final: solo letras y un solo espacio entre palabras.
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/.test(value)) {
        setErrorMessage(fullNameError, "El nombre solo debe contener letras y un solo espacio entre palabras.");
        return false;
    }
    if (value.length > 23) {
        setErrorMessage(fullNameError, "Máximo 23 caracteres.");
        return false;
    }
    return true;
}


function validateEmail() {
    const value = emailInput.value.trim();
    setErrorMessage(emailError, ''); // Limpiar error previo

    if (!value) {
        setErrorMessage(emailError, "El correo electrónico es obligatorio.");
        return false;
    }
    // Regex de email más robusta (pero no excesivamente estricta para permitir la mayoría de emails válidos)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        setErrorMessage(emailError, "Formato de correo electrónico inválido.");
        return false;
    }
    return true;
}

function validatePhone() {
    const areaCode = phoneAreaCodeInput.value.trim();
    const number = phoneNumberInput.value.trim();
    setErrorMessage(phoneError, ''); // Limpiar error previo

    if (!areaCode || !number) {
        setErrorMessage(phoneError, "El código de área y el número de celular son obligatorios.");
        return false;
    }

    // REQUISITO: Código de área solo números y menor a 6 caracteres
    if (!/^\d+$/.test(areaCode)) {
        setErrorMessage(phoneError, "El código de área solo debe contener números.");
        return false;
    }
    if (areaCode.length >= 6 || areaCode.length < 2) { // Longitud < 6 y min 2
        setErrorMessage(phoneError, "Cód. Área debe tener entre 2 y 5 dígitos.");
        return false;
    }

    // REQUISITO: Número de celular de 8 a 10 caracteres, solo números
    if (!/^\d+$/.test(number)) {
        setErrorMessage(phoneError, "El número de celular solo debe contener números.");
        return false;
    }
    if (number.length < 8 || number.length > 10) { 
        setErrorMessage(phoneError, "Número debe tener entre 8 y 10 dígitos.");
        return false;
    }
    return true;
}

// --- Funciones de Validación de Dirección ---

function loadCountries() {
    countrySelect.innerHTML = '<option value="">Seleccione un país</option>';
    countrySelect.innerHTML += '<option value="Argentina">Argentina</option>';
    countrySelect.innerHTML += '<option value="Uruguay">Uruguay</option>';
}

function loadProvinces() {
    const selectedCountry = countrySelect.value;
    provinceSelect.innerHTML = '<option value="">Seleccione una provincia/departamento</option>';
    citySelect.innerHTML = '<option value="">Seleccione una localidad/barrio</option>'; // Limpiar ciudades al cambiar provincia
    citySelect.disabled = true; // Deshabilitar ciudades
    // Siempre limpia el error de ciudad cuando se recargan las provincias
    setErrorMessage(cityError, ''); 

    if (selectedCountry === "Argentina") {
        argentinaProvinces.forEach(province => {
            const option = document.createElement("option");
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        });
        provinceSelect.disabled = false;
    } else if (selectedCountry === "Uruguay") {
        uruguayDepartments.forEach(department => {
            const option = document.createElement("option");
            option.value = department;
            option.textContent = department;
            provinceSelect.appendChild(option);
        });
        provinceSelect.disabled = false;
    }
    else {
        provinceSelect.disabled = true;
    }
    validateCountry(); // Re-validar país
    validateProvince(); // Re-validar provincia (probablemente se invalide)
}

function loadCities() {
    const selectedProvince = provinceSelect.value;
    citySelect.innerHTML = '<option value="">Seleccione una localidad/barrio</option>'; // Siempre limpia primero

    if (selectedProvince && citiesByProvince[selectedProvince] && citiesByProvince[selectedProvince].length > 0) {
        // Si hay ciudades para la provincia seleccionada, cargarlas
        citiesByProvince[selectedProvince].forEach(city => {
            const option = document.createElement("option");
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
        citySelect.disabled = false;
        setErrorMessage(cityError, ''); // Limpiar cualquier mensaje de error previo si ahora hay opciones
    } else {
        // NUEVO: Si no hay ciudades para la provincia o la lista está vacía
        citySelect.disabled = true;
        setErrorMessage(cityError, 'No hay localidades predefinidas para esta provincia. Por favor, ingrese su localidad en "Datos Adicionales".');
    }
    validateProvince(); // Re-validar provincia (siempre bueno)
    validateCity(); // Re-validar ciudad (esto ahora será condicional)
}

function validateCountry() {
    const value = countrySelect.value;
    setErrorMessage(countryError, '');
    if (!value) {
        setErrorMessage(countryError, "El país es obligatorio.");
        return false;
    }
    return true;
}

function validateProvince() {
    const value = provinceSelect.value;
    setErrorMessage(provinceError, '');
    if (!value) {
        setErrorMessage(provinceError, "La provincia/departamento es obligatoria.");
        return false;
    }
    return true;
}

function validateCity() {
    const value = citySelect.value;
    setErrorMessage(cityError, '');

    // MODIFICADO: La validación de ciudad obligatoria ahora depende si el select está deshabilitado
    if (citySelect.disabled) {
        // Si el select de ciudad está deshabilitado, significa que no hay opciones precargadas
        // y el usuario debe especificar la localidad en 'Datos Adicionales'.
        // No marcamos un error aquí, pero sí en 'Datos Adicionales'.
        return true; // No es un error en este campo si está deshabilitado
    }

    if (!value) {
        setErrorMessage(cityError, "La localidad/barrio es obligatoria.");
        return false;
    }
    return true;
}

function validateStreet() {
    const value = streetInput.value.trim();
    setErrorMessage(streetError, '');
    if (!value) {
        setErrorMessage(streetError, "La calle es obligatoria.");
        return false;
    }
    // Permite letras (incluyendo acentos y ñ), números, espacios y caracteres comunes en direcciones (., #, °, -)
    if (!/^[a-zA-Z0-9\s.,#°\-ñÑáéíóúÁÉÍÓÚ]+$/.test(value)) { 
        setErrorMessage(streetError, "Caracteres inválidos en la calle.");
        return false;
    }
    if (value.length < 3) {
        setErrorMessage(streetError, "Nombre de calle muy corto.");
        return false;
    }
    if (value.length > 50) {
        setErrorMessage(streetError, "Nombre de calle muy largo (máx 50).");
        return false;
    }
    return true;
}

function validateNumber() {
    const value = numberInput.value.trim();
    setErrorMessage(numberError, '');
    if (!value) {
        setErrorMessage(numberError, "El número es obligatorio.");
        return false;
    }
    // Permitir solo dígitos para el número de calle.
    if (!/^\d+$/.test(value)) {
        setErrorMessage(numberError, "El número debe contener solo dígitos.");
        return false;
    }
    // REQUISITO: Máximo 6 caracteres numéricos.
    if (value.length > 6) { 
        setErrorMessage(numberError, "Número muy largo (máx 6 dígitos).");
        return false;
    }
    if (value.length < 1) { // Mínimo 1 dígito
        setErrorMessage(numberError, "Número muy corto (mín 1 dígito).");
        return false;
    }
    return true;
}

function validateZipCode() {
    const value = zipCodeInput.value.trim();
    setErrorMessage(zipCodeError, '');
    if (!value) {
        setErrorMessage(zipCodeError, "El código postal es obligatorio.");
        return false;
    }
    // REQUISITO: Solo números y máximo 6 caracteres.
    if (!/^\d+$/.test(value)) {
        setErrorMessage(zipCodeError, "El código postal debe contener solo números.");
        return false;
    }
    if (value.length > 6) { // Máximo 6 caracteres
        setErrorMessage(zipCodeError, "Código postal muy largo (máx 6 dígitos).");
        return false;
    }
    if (value.length < 4) { // Un mínimo razonable, puedes ajustar
        setErrorMessage(zipCodeError, "Código postal muy corto (mín 4 dígitos).");
        return false;
    }
    return true;
}

function validateAdditionalData() {
    const value = additionalDataTextarea.value.trim();
    setErrorMessage(additionalDataError, '');

    // NUEVA LÓGICA: Hacer obligatorio si el select de ciudad está deshabilitado
    if (citySelect.disabled && !value) {
        setErrorMessage(additionalDataError, "Por favor, especifique su localidad en este campo, ya que no hay opciones predefinidas.");
        return false;
    }
    
    if (value.length > 100) {
        setErrorMessage(additionalDataError, "Máximo 100 caracteres.");
        return false;
    }
    return true;
}


// --- Funciones de Validación de Tarjeta ---

// Algoritmo de Luhn (para validar números de tarjeta)
function isValidLuhn(cardNumber) {
    let sum = 0;
    let alternate = false;
    // Eliminar espacios y guiones
    const cleanedCardNumber = cardNumber.replace(/\D/g, ''); 

    for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanedCardNumber[i], 10);
        if (alternate) {
            digit *= 2;
            if (digit > 9) {
                digit = (digit % 10) + 1;
            }
        }
        sum += digit;
        alternate = !alternate;
    }
    return (sum % 10 === 0);
}

// NUEVA FUNCIÓN: Detecta y muestra la marca de la tarjeta
function detectCardBrand() {
    const cardNumber = cardNumberInput.value.replace(/\s/g, ''); // Limpiar espacios
    cardBrandIcon.className = ''; // Limpiar clases previas
    cardBrandIcon.innerHTML = ''; // Limpiar contenido previo

    if (!radioTarjeta.checked) return; // No mostrar nada si no es tarjeta

    if (cardNumber.length >= 2) { // Necesitamos al menos los primeros dos dígitos para Mastercard
        // Visa: Empieza con 4
        if (cardNumber.startsWith('4')) {
            cardBrandIcon.classList.add('fab', 'fa-cc-visa', 'visa'); // Usa clases de FontAwesome y la clase 'visa' para el color
            cardBrandIcon.title = 'Visa';
        } 
        // Mastercard: Empieza con 51-55
        else if (cardNumber.startsWith('51') || cardNumber.startsWith('52') || cardNumber.startsWith('53') || cardNumber.startsWith('54') || cardNumber.startsWith('55')) {
            cardBrandIcon.classList.add('fab', 'fa-cc-mastercard', 'mastercard'); // Usa clases de FontAwesome y la clase 'mastercard'
            cardBrandIcon.title = 'Mastercard';
        } 
        // Si no es ninguna de las dos (o es otro prefijo válido pero no detectado)
        else {
            cardBrandIcon.innerHTML = ''; // Limpiar si no coincide
            cardBrandIcon.title = '';
        }
    }
}


function validateCardNumber() {
    let value = cardNumberInput.value.replace(/\s/g, ''); // Limpiar espacios
    setErrorMessage(cardNumberError, ''); // Limpiar error previo
    
    // Limpiar clases de validación visual del input
    cardNumberInput.classList.remove('valid', 'invalid');
    // Limpiar el contenido del span del ícono de validación
    cardNumberValidationIcon.className = '';
    cardNumberValidationIcon.textContent = '';
    
    // NUEVO: Llamar a la función para detectar la marca de la tarjeta
    detectCardBrand();

    if (!radioTarjeta.checked) return true; // No validar si no es método de tarjeta

    let isValid = true; // Variable para controlar la validez del campo de tarjeta

    if (!value) {
        setErrorMessage(cardNumberError, "El número de tarjeta es obligatorio.");
        isValid = false;
    }
    
    // REQUISITO: Solo números, sin caracteres especiales ni letras.
    if (isValid && !/^\d+$/.test(value)) {
        setErrorMessage(cardNumberError, "El número de tarjeta solo debe contener dígitos.");
        isValid = false;
    }

    // Visa y Mastercard típicamente tienen 16 dígitos
    if (isValid && value.length !== 16) {
        setErrorMessage(cardNumberError, "El número de tarjeta debe tener 16 dígitos.");
        isValid = false;
    }
    if (isValid && !isValidLuhn(value)) {
        setErrorMessage(cardNumberError, "Número de tarjeta inválido (Luhn).");
        isValid = false;
    }
    // Opcional: Validación de prefijos para Visa (4) y Mastercard (51-55)
    // ESTA VALIDACIÓN SE MUEVE A LA FUNCIÓN detectCardBrand() y se simplifica aquí
    if (isValid) {
        const isVisa = value.startsWith('4');
        const isMastercard = value.startsWith('51') || value.startsWith('52') || value.startsWith('53') || value.startsWith('54') || value.startsWith('55');
        
        if (!isVisa && !isMastercard) {
            setErrorMessage(cardNumberError, "Solo se aceptan tarjetas Visa o Mastercard.");
            isValid = false;
        }
    }


    // Aplicar clases 'valid' o 'invalid' al input y mostrar ícono
    if (value.length > 0) { // Solo aplicar si el campo no está vacío
        if (isValid) {
            cardNumberInput.classList.add('valid');
            cardNumberValidationIcon.classList.add('valid');
            cardNumberValidationIcon.textContent = '✓'; // Tilde verde (Unicode U+2713)
        } else {
            cardNumberInput.classList.add('invalid');
            cardNumberValidationIcon.classList.add('invalid');
            cardNumberValidationIcon.textContent = '✗'; // Cruz roja (Unicode U+2717)
        }
    }

    return isValid;
}

function validateCardName() {
    // REQUISITO: Solo letras, sin caracteres especiales ni números.
    // Limpiar el valor para permitir solo letras (incluyendo acentos y ñ) y espacios.
    cardNameInput.value = cardNameInput.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '').toUpperCase(); 

    let value = cardNameInput.value.trim(); 
    setErrorMessage(cardNameError, ''); // Limpiar error previo

    if (!radioTarjeta.checked) return true; // No validar si no es método de tarjeta

    if (!value) {
        setErrorMessage(cardNameError, "El nombre del titular es obligatorio.");
        return false;
    }
    // Validar formato final: solo letras y un solo espacio entre palabras.
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+(?: [a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+)*$/.test(value)) {
        setErrorMessage(cardNameError, "El nombre solo debe contener letras y un solo espacio entre palabras.");
        return false;
    }
    
    if (value.length < 2) {
           setErrorMessage(cardNameError, "El nombre es demasiado corto.");
           return false;
    }
    if (value.length > 70) { 
        setErrorMessage(cardNameError, "El nombre es demasiado largo.");
        return false;
    }

    return true;
}


function validateExpiryDate() {
    const value = expiryDateInput.value.trim();
    setErrorMessage(expiryDateError, ''); // Limpiar error previo

    if (!radioTarjeta.checked) return true; // No validar si no es método de tarjeta

    if (!value) {
        setErrorMessage(expiryDateError, "La fecha de vencimiento es obligatoria.");
        return false;
    }
    
    const parts = value.split('/');
    // Asegurarse de que haya 2 partes y que cada parte tenga 2 dígitos
    if (parts.length !== 2 || parts[0].length !== 2 || parts[1].length !== 2) {
        setErrorMessage(expiryDateError, "Formato MM/AA incorrecto (ej: 01/25).");
        return false;
    }

    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10); 

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
        setErrorMessage(expiryDateError, "Mes o año inválido.");
        return false;
    }

    const today = new Date();
    const currentFullYear = today.getFullYear(); 
    const currentMonth = today.getMonth() + 1; // getMonth() es 0-11, sumamos 1 para el mes real

    // Lógica de inferencia del año completo:
    // Determina el siglo basándose en un umbral respecto al año actual.
    let inferredFullYear;
    const currentTwoDigitYear = currentFullYear % 100;
    
    // Si el año ingresado es mayor o igual que el año actual de dos dígitos (considerando un pequeño margen), asumimos 20xx
    // De lo contrario, asumimos 21xx (para años que "dan la vuelta", ej. 99 para 2099, 01 para 2101)
    if (year >= currentTwoDigitYear - 10 && year <= 99) { 
        inferredFullYear = 2000 + year;
    } else { 
        inferredFullYear = 2100 + year;
    }
    
    // La tarjeta solo está vencida si el año es anterior O
    // si el año es el actual Y el mes es anterior al actual.
    if (inferredFullYear < currentFullYear) { 
        setErrorMessage(expiryDateError, "Fecha de vencimiento caducada.");
        return false;
    }
    if (inferredFullYear === currentFullYear && month < currentMonth) { 
        setErrorMessage(expiryDateError, "Fecha de vencimiento caducada.");
        return false;
    }
    // Límite superior de 15 años en el futuro desde el año actual
    if (inferredFullYear > currentFullYear + 15) {
        setErrorMessage(expiryDateError, "Fecha de vencimiento demasiado lejana.");
        return false;
    }

    return true;
}

function validateCvv() {
    const value = cvvInput.value.trim();
    setErrorMessage(cvvError, ''); // Limpiar error previo

    if (!radioTarjeta.checked) return true; // No validar si no es método de tarjeta

    if (!value) {
        setErrorMessage(cvvError, "El CVV es obligatorio.");
        return false;
    }
    // Validación: Solo permitir dígitos.
    if (!/^\d+$/.test(value)) {
        setErrorMessage(cvvError, "El CVV solo debe contener dígitos.");
        return false;
    }
    // CVV de Visa/Mastercard suele ser 3 dígitos, Amex 4. Permitimos 3 o 4.
    if (value.length < 3 || value.length > 4) {
        setErrorMessage(cvvError, "CVV incorrecto (debe tener 3 o 4 dígitos)."); 
        return false;
    }
    return true;
}

// Formatear el número de tarjeta con espacios
function formatCardNumber() {
    let input = cardNumberInput.value.replace(/\s/g, ''); // Eliminar espacios existentes
    let formattedInput = '';
    for (let i = 0; i < input.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedInput += ' ';
        }
        formattedInput += input[i];
    }
    cardNumberInput.value = formattedInput;
}

// Formatear la fecha de vencimiento (MM/AA)
function formatExpiryDate() {
    let input = expiryDateInput.value.replace(/\D/g, ''); // Eliminar no-dígitos
    let formattedInput = '';
    if (input.length > 2) {
        formattedInput = input.substring(0, 2) + '/' + input.substring(2, 4);
    } else {
        formattedInput = input;
    }
    expiryDateInput.value = formattedInput;
}


// Manejar el envío del formulario de checkout
async function submitCheckout(event) {
    event.preventDefault(); // Previene el envío predeterminado del formulario

    let formIsValid = true; // Variable para rastrear la validez general del formulario

    // Validar campos de Datos Personales
    // NOTA: Se evalúan todas las funciones para que se muestren todos los errores,
    // por eso se usa `&& formIsValid` y no `formIsValid = validateFoo() && validateBar();`
    formIsValid = validateFullName() && formIsValid;
    formIsValid = validateEmail() && formIsValid;
    formIsValid = validatePhone() && formIsValid; 

    // Validar campos de Dirección de Envío
    formIsValid = validateCountry() && formIsValid;
    formIsValid = validateProvince() && formIsValid;
    // La validación de city ya es condicional dentro de validateCity()
    formIsValid = validateCity() && formIsValid; 
    formIsValid = validateStreet() && formIsValid;
    formIsValid = validateNumber() && formIsValid;
    formIsValid = validateZipCode() && formIsValid;
    // IMPORTANTE: Ahora additionalData se valida condicionalmente para ser obligatorio
    formIsValid = validateAdditionalData() && formIsValid; 

    // Validar carrito no vacío
    if (cart.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
        formIsValid = false; 
    }

    const selectedPaymentMethod = document.querySelector('input[name="payment-method"]:checked');
    if (!selectedPaymentMethod) {
        alert("Por favor, selecciona un método de pago.");
        formIsValid = false; 
    }
    const paymentMethodValue = selectedPaymentMethod ? selectedPaymentMethod.value : null;

    // Validar campos de tarjeta si la opción "Tarjeta" está seleccionada
    if (paymentMethodValue === "tarjeta") {
        formIsValid = validateCardNumber() && formIsValid;
        formIsValid = validateCardName() && formIsValid; 
        formIsValid = validateExpiryDate() && formIsValid;
        formIsValid = validateCvv() && formIsValid;
    }

    // Si el formulario no es válido, detener el envío y hacer scroll al primer error
    if (!formIsValid) {
        const firstErrorElement = document.querySelector('.error-message.visible');
        if (firstErrorElement) {
            // Asegurarse de que el elemento padre (input-group) también sea visible antes de scrollear
            firstErrorElement.closest('.input-group').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return; 
    }

    // Si llegamos aquí, el formulario es válido, procedemos con el envío al servidor
    const orderData = {
        customer: {
            fullName: fullNameInput.value.trim(), 
            email: emailInput.value.trim(),
            phone: { 
                areaCode: phoneAreaCodeInput.value.trim(),
                number: phoneNumberInput.value.trim()
            }
        },
        shippingAddress: {
            country: countrySelect.value,
            province: provinceSelect.value,
            // Aquí se envía el valor de citySelect (puede ser vacío si disabled)
            city: citySelect.value, 
            street: streetInput.value.trim(),
            number: numberInput.value.trim(),
            zipCode: zipCodeInput.value.trim(),
            additionalData: additionalDataTextarea.value.trim()
        },
        items: cart,
        total: parseFloat(cartTotalElement.textContent.replace('$', '')),
        paymentMethod: paymentMethodValue 
    };

    if (paymentMethodValue === "tarjeta") {
        orderData.cardDetails = {
            cardNumber: cardNumberInput.value.replace(/\s/g, ''), // Enviar sin espacios
            cardName: cardNameInput.value.trim(), 
            expiryDate: expiryDateInput.value,
            cvv: cvvInput.value
        };
    }

    try {
        // En un entorno real, aquí harías una llamada a tu API de backend.
        // Por ahora, simulamos una respuesta exitosa.
        console.log('Datos del pedido para enviar:', orderData);
        
        // Simular un envío exitoso con un retardo
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Mostrar mensaje de éxito y ocultar el formulario de checkout
        checkoutForm.style.display = "none";
        checkoutSuccess.style.display = "flex"; // Usar flex para centrar contenido si aplica
        
        // Limpiar el carrito y actualizar su display
        clearCart(); 

        // Opcional: scroll al inicio del mensaje de éxito
        checkoutSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Después de una compra exitosa, prepara el carrito para abrirse
        // automáticamente la próxima vez que se agregue un producto al volver al menú principal.
        openCartOnFirstAddAfterCheckout = true;
        hasCartBeenOpenedAutomatically = false; // Resetear para que la próxima vez se abra una vez

    } catch (error) {
        console.error("Error al procesar el pedido:", error);
        alert("Hubo un error al procesar tu pedido. Por favor, inténtalo de nuevo.");
    }
}

// --- Event Listeners ---

// Carrito
cartIcon.addEventListener("click", () => cartSidebar.classList.add("open"));
closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("open"));
clearCartBtn.addEventListener("click", clearCart);
checkoutBtn.addEventListener("click", showCheckoutForm);

// Botones de navegación
backToHomeBtn.addEventListener("click", () => {
    checkoutSuccess.style.display = "none";
    productGrid.style.display = "grid"; // Volver a mostrar la grilla de productos
    cartSidebar.classList.remove("open"); // Asegurarse de que el carrito esté cerrado
    resetCheckoutForm(); // REQUISITO: Limpiar el formulario al volver al inicio
    window.scrollTo(0, 0); // Scroll al inicio de la página

    // Al volver al inicio desde el éxito, prepara el carrito para abrirse
    // automáticamente la próxima vez que se agregue un producto.
    openCartOnFirstAddAfterCheckout = true;
    hasCartBeenOpenedAutomatically = false; // Resetear para que la próxima vez se abra una vez
});

backToMenuFromCheckoutBtn.addEventListener("click", backToMenu); // Listener para el botón "Volver al Menú" en el checkout

// Formulario de Checkout (Validaciones en tiempo real y al enviar)
checkoutForm.addEventListener("submit", submitCheckout);

// Datos Personales
fullNameInput.addEventListener('input', validateFullName); // Limpiar y validar en cada input
emailInput.addEventListener('input', validateEmail);
phoneAreaCodeInput.addEventListener('input', () => { 
    phoneAreaCodeInput.value = phoneAreaCodeInput.value.replace(/\D/g, ''); // Filtrar no dígitos
    validatePhone();
});
phoneNumberInput.addEventListener('input', () => {   
    phoneNumberInput.value = phoneNumberInput.value.replace(/\D/g, ''); // Filtrar no dígitos
    validatePhone();
});

// Dirección de Envío
countrySelect.addEventListener('change', loadProvinces);
provinceSelect.addEventListener('change', loadCities);

countrySelect.addEventListener('blur', validateCountry);
provinceSelect.addEventListener('blur', validateProvince);
citySelect.addEventListener('blur', validateCity);
streetInput.addEventListener('input', validateStreet);
numberInput.addEventListener('input', () => {
    // Filtrar no dígitos y luego validar
    numberInput.value = numberInput.value.replace(/\D/g, ''); 
    validateNumber();
});
zipCodeInput.addEventListener('input', () => {
    // Filtrar no dígitos y luego validar. Longitud máxima ya está en el HTML
    zipCodeInput.value = zipCodeInput.value.replace(/\D/g, '');
    validateZipCode();
});

additionalDataTextarea.addEventListener('input', validateAdditionalData);

// Método de Pago
radioMercadoPago.addEventListener('change', handlePaymentMethodChange);
radioTarjeta.addEventListener('change', handlePaymentMethodChange);

// Campos de Tarjeta
cardNumberInput.addEventListener('input', () => {
    // Filtra para que solo se permitan dígitos antes de formatear
    cardNumberInput.value = cardNumberInput.value.replace(/\D/g, ''); 
    formatCardNumber(); // Formatear mientras se escribe
    validateCardNumber(); // La validación ahora también maneja el ícono
});
// También al perder el foco para asegurar que se formatee bien si el usuario pegó
cardNumberInput.addEventListener('blur', () => {
    cardNumberInput.value = cardNumberInput.value.replace(/\D/g, '');
    formatCardNumber();
    validateCardNumber();
});


cardNameInput.addEventListener('input', () => {
    // REQUISITO: Solo letras, sin caracteres especiales ni números.
    cardNameInput.value = cardNameInput.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '').toUpperCase(); 
    validateCardName();
});
cardNameInput.addEventListener('blur', () => {
    // Asegurarse de que el formato final sea mayúsculas y limpio al perder el foco
    cardNameInput.value = cardNameInput.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '').toUpperCase(); 
    validateCardName();
});

expiryDateInput.addEventListener('input', () => {
    formatExpiryDate(); // Formatear mientras se escribe
    validateExpiryDate();
});

cvvInput.addEventListener('input', () => {
    // Filtrar no dígitos
    cvvInput.value = cvvInput.value.replace(/\D/g, '');
    validateCvv();
});


// --- Inicialización ---
document.addEventListener("DOMContentLoaded", () => {
    initializeProducts();
    updateCartDisplay(); // Asegurarse de que el carrito se muestre correctamente al cargar
});