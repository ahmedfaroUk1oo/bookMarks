var headTitle = document.querySelector("h1");
var height = 60;
headTitle.addEventListener("mouseover",function(){
    document.documentElement.style.setProperty(`--main-height`, height+`%`);
})
headTitle.addEventListener("mouseout",function(){
    document.documentElement.style.setProperty(`--main-height`,`35%`);
})


// ******************************************************************

var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");

function isNameValid() {
    var regex = /^([a-zA-Z_ ]){3,}$/;
    var valid =regex.test(siteName.value);
    if(valid){
        siteName.classList.remove("notValid");
        siteName.classList.add("valid");
    }else {
        siteName.classList.add("notValid");
        siteName.classList.remove("valid");
    } 
    return valid;
}

function isUrlValid() {
    var regex = /^([hH]ttp[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}$/;
    var valid =regex.test(siteUrl.value);
    if(valid){
        siteUrl.classList.remove("notValid");
        siteUrl.classList.add("valid");
    }else {
        siteUrl.classList.add("notValid");
        siteUrl.classList.remove("valid");
    } 
    return valid;
}

// table section 
var productList = [];
var localStorageKey = "allProducts";
var overlayMsg = document.getElementById("overlayError");
var closeBtn = document.getElementById("closeBtn");
var overlaySec = document.querySelector(".overlay")

function addLocal(){  
    localStorage.setItem(localStorageKey , JSON.stringify(productList));
}

if(JSON.parse(localStorage.getItem(localStorageKey))) {
    productList = JSON.parse( localStorage.getItem(localStorageKey));
    displayProducts();
}

function closeOverLay() {
    overlayMsg.classList.replace("d-flex","d-none");
}


function addProduct () {
    if(isNameValid()&& isUrlValid()) {

        var product = {
            name:siteName.value,
            webUrl:siteUrl.value
        }

        productList.push(product);
        displayProducts();
        addLocal();
        clear()
    }else {
        overlayMsg.classList.replace("d-none" , "d-flex")
    }
}



overlayMsg.addEventListener("click" ,closeOverLay);

closeBtn.addEventListener("click",closeOverLay);
overlaySec.addEventListener("click",function(e){
    e.stopPropagation();
})


function displayProducts() {
    var blackbox ="";
    for(var i=0; i<productList.length; i++) {
        blackbox+= `
        <tr>
        <td>${i+1}</td>
        <td>${productList[i].name}</td>
        <td><button class="btn btn-success" onclick="visitSite(${i})" ><i class="fa-solid fa-eye pe-2" ></i>Visit</button></td>
        <td><button class="btn btn-danger" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
        </tr>`
    }
    document.getElementById("#products").innerHTML = blackbox;
}

function deleteProduct(index) {
productList.splice(index,1);
displayProducts();
addLocal();
}

function clear() {
    siteName.value ="";
    siteUrl.value="";
    siteName.classList.remove("valid");
    siteUrl.classList.remove("valid");
}

function visitSite(index) {
    var protocol = /^([hH]ttp[s]?)/;
if(protocol.test(productList[index].webUrl)) {
    window.open(productList[index].webUrl);
}else {
    window.open(new URL(`https://${productList[index].webUrl}`))
}
}
// table section 

