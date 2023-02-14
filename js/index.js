// ======================= Authenticatoin ============

let regName = document.querySelector("#regName");
let regPhone = document.querySelector("#regPhone");
let regEmail = document.querySelector("#regEmail");
let regPassword = document.querySelector("#regPassword");
let registerBTN = document.querySelector("#registerBTN");
let loginBTN = document.querySelector("#loginBTN");
let logEmail = document.querySelector("#logEmail");
let logPassword = document.querySelector("#logPassword");
let registerLINK = document.querySelector("#registerLINK");
let loginLINK = document.querySelector("#loginLINK");
let logoutLINK = document.querySelector("#logoutLINK");
let addProductSEC = document.querySelector("#addProductSEC");
let productsSEC = document.querySelector("#productsSEC");
let search = document.querySelector("#search");
let users = [];

if (localStorage.getItem("pharmacyAccounts") != null) {
    users = JSON.parse(localStorage.getItem("pharmacyAccounts"));
}

registerLINK.addEventListener("click", function () {
    document.querySelector("#registerSEC").classList.replace("d-none", "d-block");
    document.querySelector("#loginSEC").classList.replace("d-block", "d-none");
});

loginLINK.addEventListener("click", function () {
    document.querySelector("#registerSEC").classList.replace("d-block", "d-none");
    document.querySelector("#loginSEC").classList.replace("d-none", "d-block");

});

registerBTN.addEventListener("click", function () {

    if (validePhone() == false) {
        document.querySelector("#phoneWarning").classList.replace("d-none", "d-block");
    }
    else if (valideEmail() == false) {
        document.querySelector("#emailWarning").classList.replace("d-none", "d-block");
    }
    else if (validePassword() == false) {
        document.querySelector("#passwordWarning").classList.replace("d-none", "d-block");
    }
    else if (validePhone() == true && valideEmail() == true && validePassword() == true) {
        let user = {
            regName: regName.value,
            regPhone: regPhone.value,
            regEmail: regEmail.value,
            regPassword: regPassword.value,
        }
        if (regName.value != "" && regPhone.value != "" && regEmail.value != "" && regPassword.value != "") {
            if (checkEmail()) {
                document.querySelector("#regWarning").classList.replace("d-none", "d-block");
            }
            else {
                users.push(user);
                localStorage.setItem("pharmacyAccounts", JSON.stringify(users));
                document.querySelector("#registerSEC").classList.add("d-none");
                document.querySelector("#loginSEC").classList.replace("d-none", "d-block")
            }

        }
    }
});

loginBTN.addEventListener("click", function () {
    for (let i = 0; i < users.length; i++) {
        if (logEmail.value == users[i].regEmail && logPassword.value == users[i].regPassword) {
            document.querySelector("#loginSEC").classList.replace("d-block", "d-none");
            document.querySelector("#search").classList.replace("d-none", "d-block");
            addProductSEC.classList.replace("d-none", "d-block");
            productsSEC.classList.replace("d-none", "d-block");
            logoutLINK.classList.replace("d-none", "d-block");
            registerLINK.classList.add("d-none");
            loginLINK.classList.add("d-none");
        }
    }
});

logoutLINK.addEventListener("click", function () {
    document.querySelector("#loginSEC").classList.replace("d-none", "d-block");
    document.querySelector("#search").classList.replace("d-block", "d-none");
    addProductSEC.classList.replace("d-block", "d-none");
    productsSEC.classList.replace("d-block", "d-none");
    logoutLINK.classList.replace("d-block", "d-none");
    registerLINK.classList.replace("d-none", "d-block");
    loginLINK.classList.replace("d-none", "d-block");
});

function checkEmail() {
    for (let i = 0; i < users.length; i++) {
        if (regEmail.value == users[i].regEmail) {
            return true
        }
    }
};

function validePhone() {
    let regexPhone = /^01[0125][0-9]{8}$/gm
    if (regexPhone.test(regPhone.value)) {
        return true
    }
    else {
        return false
    }
};

function valideEmail() {
    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
    if (regexEmail.test(regEmail.value)) {
        return true
    }
    else {
        return false
    }
};

function validePassword() {
    let regexPassword = /[a-z]{8}/
    if (regexPassword.test(regPassword.value)) {
        return true
    }
    else {
        return false
    }
};

// ================= CRUD =====================


let productName = document.querySelector("#productName");
let productCat = document.querySelector("#productCat");
let productCode = document.querySelector("#productCode");
let productPrice = document.querySelector("#productPrice");
let productDesc = document.querySelector("#productDesc");
let addProductBTN = document.querySelector("#addProductBTN");
let updateProductBTN = document.querySelector("#updateProductBTN");
let currentIndex;

let products = [];

if (localStorage.getItem("products") != null) {
    products = JSON.parse(localStorage.getItem("products"));
    display()
}


addProductBTN.addEventListener("click", function () {
    let product = {
        productName: productName.value,
        productCat: productCat.value,
        productCode: productCode.value,
        productPrice: productPrice.value,
        productDesc: productDesc.value
    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    display()
    clearForm()

});

function display() {

    let productContainer = ``;
    for (let i = 0; i < products.length; i++) {
        let desc = products[i].productDesc.split(" ").splice(0, 20).join(" ");
        productContainer += `
        <div class="col-md-6 col-lg-4 col-xl-3">
                <div class="card text-muted">
                    <div class="card-body position-relative">
                        <h3 class="card-title text-primary">${products[i].productName}</h3>
                        <h5 class="card-subtitle mb-2 text-muted">${products[i].productCat}</h5>
                        <h5 class="card-subtitle mb-2 text-muted">Code : ${products[i].productCode}</h5>
                        <p class="card-text">${desc}</p>
                        <div class="text-center">
                            <div onclick="updateProduct(${i})" class="btn btn-warning text-light mx-3">Update</div>
                            <div onclick="deleteProduct(${i})" class="btn btn-danger text-light mx-3">Delete</div>
                        </div>
                        <div
                            class="price text-light rounded-pill d-flex justify-content-center align-items-center bg-primary position-absolute">
                            ${products[i].productPrice} $</div>
                    </div>
                </div>
        </div>
`
    }

    document.querySelector("#displayProduct").innerHTML = productContainer;
}

function clearForm() {
    productName.value = ""
    productCode.value = ""
    productPrice.value = ""
    productDesc.value = ""
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    display()
}

function updateProduct(index) {
    currentIndex = index

    productName.value = products[index].productName
    productCat.value = products[index].productCat
    productCode.value = products[index].productCode
    productPrice.value = products[index].productPrice
    productDesc.value = products[index].productDesc

    addProductBTN.classList.replace("d-block", "d-none");
    updateProductBTN.classList.replace("d-none", "d-block");

};

updateProductBTN.addEventListener("click", function () {

    products[currentIndex].productName = productName.value;
    products[currentIndex].productCat = productCat.value;
    products[currentIndex].productCode = productCode.value;
    products[currentIndex].productPrice = productPrice.value;
    products[currentIndex].productDesc = productDesc.value;

    updateProductBTN.classList.replace("d-block", "d-none");
    addProductBTN.classList.replace("d-none", "d-block");

    localStorage.setItem("products", JSON.stringify(products));
    display();
    clearForm();
})

search.addEventListener("input", function () {
    let productContainer = ``;
    for (let i = 0; i < products.length; i++) {
        if (products[i].productName.toLowerCase().includes(search.value.toLowerCase()) == true) {
            let desc = products[i].productDesc.split(" ").splice(0, 20).join(" ");
            productContainer += `
            <div class="col-md-3">
                    <div class="card text-muted" style="width: 18rem;">
                        <div class="card-body position-relative">
                        <h3 class="card-title text-primary">${products[i].productName}</h3>
                        <h5 class="card-subtitle mb-2 text-muted">${products[i].productCat}</h5>
                        <h5 class="card-subtitle mb-2 text-muted">Code : ${products[i].productCode}</h5>
                            <p class="card-text">${desc}</p>
                            <div class="text-center">
                                <div onclick="updateProduct(${i})" id="updateBTN" class="btn btn-warning text-light mx-3">Update</div>
                                <div onclick="deleteProduct(${i})" id="deleteBTN" class="btn btn-danger text-light mx-3">Delete</div>
                            </div>
                            <div
                                class="price text-light rounded-pill d-flex justify-content-center align-items-center w-25 bg-primary position-absolute">
                                ${products[i].productPrice} EGP</div>
                        </div>
                    </div>
            </div>
            `
        }
        document.querySelector("#displayProduct").innerHTML = productContainer;

    }

});