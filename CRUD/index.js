var Product_Name = document.getElementById("productName");
var Product_Price = document.getElementById("ProductPrice");
var Product_Desc = document.getElementById("ProductDescription");
var Product_Cate = document.getElementById("ProductCategory");
var ProductsList;
var counter;

localStorage.getItem("productsList") == null ? (ProductsList = []) : (ProductsList = JSON.parse(localStorage.getItem("productsList")));

displayProducts(ProductsList);

function localStorageUpdate() {
    localStorage.setItem("productsList", JSON.stringify(ProductsList));
}

function addProduct() {
    if (validName()) {
        var product = {
            name: Product_Name.value,
            price: Product_Price.value,
            desc: Product_Desc.value,
            cate: Product_Cate.value
        };
        ProductsList.push(product);
        localStorageUpdate();
        displayProducts(ProductsList);
        validName()
        clearInputs();
        document.getElementById("savebtn").classList.add("d-none");
    }
}

function displayProducts(data) {
    var item = "";
    for (let i = 0; i < data.length; i++) {
        item += `<tr>
                    <td>${i + 1}</td>
                    <td>${data[i].newName ? (data[i].newName) : (data[i].name)}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].cate}</td>
                    <td>${data[i].desc}</td>
                    <td><button class="btn btn-warning" onclick="updateProduct(${i})">UPDATE</button></td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${i})">DELETE</button></td>
                </tr>`;
    }
    document.getElementById("table-body").innerHTML = item;
    localStorageUpdate();
}

function clearInputs() {
    Product_Name.value = '';
    Product_Price.value = '';
    Product_Desc.value = '';
    Product_Cate.value = '';
}

function deleteProduct(index) {
    ProductsList.splice(index, 1);
    localStorageUpdate()
    displayProducts(ProductsList);
}

function updateProduct(index) {
    Product_Name.value = ProductsList[index].name;
    Product_Price.value = ProductsList[index].price;
    Product_Desc.value = ProductsList[index].desc;
    Product_Cate.value = ProductsList[index].cate;
    counter = index;
    document.getElementById("savebtn").classList.remove("d-none");
}

function saveUpdates() {
    ProductsList[counter].name = Product_Name.value;
    ProductsList[counter].price = Product_Price.value;
    ProductsList[counter].desc = Product_Desc.value;
    ProductsList[counter].cate = Product_Cate.value;

    localStorageUpdate();
    displayProducts(ProductsList);
    document.getElementById("savebtn").classList.add("d-none");
    clearInputs();
}

function search(data) {
    var searchList = []
    for (var i = 0; i < ProductsList.length; i++) {
        var lowerData = data.toLowerCase();
        if (ProductsList[i].name.toLowerCase().includes(lowerData)) {
            ProductsList[i].newName = ProductsList[i].name.toLowerCase().replaceAll(lowerData, `<span class = "text-warning">${lowerData}</span>`)
            searchList.push(ProductsList[i])
        }
    }
    displayProducts(searchList);
}

function validName() {

    var regex = /[A-Z]{6}/;

    regex.test(Product_Name.value)

    if (regex.test(Product_Name.value)) {
        Product_Name.style.border = `solid 0px red`
        document.getElementById("invalidname").classList.add("d-none");
        return true;
    } else {
        document.getElementById("invalidname").classList.remove("d-none");
        Product_Name.style.border = `solid 2px red`
        return false;
    }
}
