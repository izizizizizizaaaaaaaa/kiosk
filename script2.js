let buttonAll = document.getElementById("button-all")       // 상단 버튼
let buttonDrink = document.getElementById("button-drink")  // 상단 버튼
let buttonFood = document.getElementById("button-food") // 상단 버튼
let buttonOrder = document.getElementById("order-go") // 하단 주문 버튼

let mode = "all"
let list = []
let menuTask
let tempNum = 1;
let basketArray
let basketList = []   // 빈 리스트로 만들어

buttonOrder.disabled = true;

buttonAll.addEventListener("click", function () {
    mode = "all"
    render()
});
buttonDrink.addEventListener("click", function () {
    mode = "drink"
    render()
});
buttonFood.addEventListener("click", function () {
    mode = "food"
    render()
});
buttonOrder.addEventListener("click", function () {
    localStorage.setItem('orderList', JSON.stringify(basketList));
    window.location.href = "index3.html";
});


let menu = [
    coffee = {
        name: "americano",
        kind: "drink",
        price: 3000,
        number: 0,
        task: `<div class="menu-block col-6" id="americano">
            <img src="images/coffee.jpg">
            <p class="menu-name">아메리카노</p>
            <p class="menu-name">3,000원</p>
            <button type="button" class="menu-button" data-bs-toggle="modal" data-bs-target="#americano-button"></button>
        </div>`
    },
    latte = {
        name: "latte",
        kind: "drink",
        price: 3800,
        number: 0,
        task: `<div class="menu-block col-6" id="latte">
            <img src="images/latte.jpg">
            <p class="menu-name">라떼</p>
            <p class="menu-name">3,800원</p>
            <button type="button" class="menu-button" data-bs-toggle="modal" data-bs-target="#latte-button"></button>
        </div>`
    },
    juice = {
        name: "juice",
        kind: "drink",
        price: 3600,
        number: 0,
        task: `<div class="menu-block col-6" id="juice">
            <img src="images/juice.jpg">
            <p class="menu-name">주스</p>
            <p class="menu-name">3,600원</p>
            <button type="button" class="menu-button" data-bs-toggle="modal" data-bs-target="#juice-button"></button>
        </div>`
    },
    tea = {
        name: "tea",
        kind: "drink",
        price: 4500,
        number: 0,
        task: `<div class="menu-block col-6" id="tea">
            <img src="images/tea.jpg">
            <p class="menu-name">녹차</p>
            <p class="menu-name">4,500원</p>
            <button type="button" class="menu-button" data-bs-toggle="modal" data-bs-target="#tea-button"></button>
        </div>`
    },
    cookie = {
        name: "cookie",
        kind: "food",
        price: 5400,
        number: 0,
        task: `<div class="menu-block col-6" id="cookie">
            <img src="images/cookie.jpg">
            <p class="menu-name">쿠키</p>
            <p class="menu-name">5,400원</p>
            <button type="button" class="menu-button" data-bs-toggle="modal" data-bs-target="#cookie-button"></button>
        </div>`
    },
    toast = {
        name: "toast",
        kind: "food",
        price: 4400,
        number: 0,
        task: `<div class="menu-block col-6" id="toast">
            <img src="images/toast.jpg">
            <p class="menu-name">토스트</p>
            <p class="menu-name">4,400원</p>
            <button type="button" class="menu-button" data-bs-toggle="modal" data-bs-target="#toast-button"></button>
        </div>`
    }
];

function render() {
    if (mode == "all") {
        list = []
        for (i = 0; i < menu.length; i++) {
            list.push(menu[i])
        }
    } else if (mode == "drink") {
        list = []
        for (i = 0; i < menu.length; i++) {
            if (menu[i].kind == "drink") {
                list.push(menu[i])
            }
        }
    } else if (mode == "food") {
        list = []
        for (i = 0; i < menu.length; i++) {
            if (menu[i].kind == "food") {
                list.push(menu[i])
            }
        }
    }

    menuTask = []
    for (i = 0; i < list.length; i++) {
        menuTask += list[i].task
    }
    menuTask += `<div class="blink"></div>`

    document.getElementById("menu-space").innerHTML = menuTask
}

function minus(i) {
    if (tempNum > 1) {
        tempNum -= 1
    }
    document.getElementById(`temp-num${i}`).innerHTML = tempNum
}

function plus(i) {
    if (tempNum < 100) {
        tempNum += 1
    }
    document.getElementById(`temp-num${i}`).innerHTML = tempNum
}

function resetTempNum(i) {
    tempNum = 1
    document.getElementById(`temp-num${i}`).innerHTML = tempNum
}

function select(i) {
    let option = document.querySelector(`input[name="${i}-option"]:checked`).value; //라디오버튼 체크 선택값
    menu[i].number = tempNum
    resetTempNum(i)
    basketObject = {
        m_name: menu[i].name,
        m_option: option,
        m_number: menu[i].number,
        m_tprice: menu[i].price * menu[i].number,
        m_id: randomIDGenerate()
    }

    basketList.push(basketObject)

    // 주문 버튼 활성/비활성
    if (basketList.length == 0) {
        buttonOrder.disabled = true;
    } else {
        buttonOrder.disabled = false;
    }

    renderOrder()
}

function renderOrder() {
    let resultHTML = "";

    for (i = 0; i < basketList.length; i++) {
        resultHTML += `<div class="basket-task">
        <div>${basketList[i].m_name}</div>  
        <div>${basketList[i].m_option}</div>
        <div>${basketList[i].m_number}</div>
        <div>${basketList[i].m_tprice}원</div>
        <button onclick="deleteList('${basketList[i].m_id}')">X</button>
    </div>`;
    }
    console.log(basketList)
    document.getElementById("in-basket").innerHTML = resultHTML;
}

function deleteList(id) {
    for (let i = 0; i < basketList.length; i++) {
        if (basketList[i].m_id == id) {
            basketList.splice(i, 1)
            break;
        }
    }
    renderOrder()
}

function randomIDGenerate() {
    return Math.random().toString(36).substr(2, 9);
}


