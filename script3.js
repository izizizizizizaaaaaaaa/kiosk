// 로컬 데이터
const dataList = window.localStorage.getItem('orderList');
const forHow = window.localStorage.getItem('inout');
const orderList = JSON.parse(dataList);
const inout = JSON.parse(forHow);

document.getElementById("how").innerHTML = inout;

console.log(orderList);
console.log(inout);

// 총 가격 계산
let all_price = 0;
for (let i = 0; i < orderList.length; i++) {
    all_price += orderList[i].m_tprice;
}

// orderList 표시
function renderOrder() {
    let orderPage = '<div></div>';
    for (let i = 0; i < orderList.length; i++) {
        orderPage += `<div class="order-task">
        <div>${orderList[i].m_name}</div>
        <div>${orderList[i].m_option}</div>
        <div>${orderList[i].m_number}</div>
        <div>${orderList[i].m_tprice}원</div>
        </div>`
    }
    document.getElementById("order-list").innerHTML = orderPage;
    document.getElementById("totalPrice").innerHTML = `총 가격 : ${all_price}원`;
}

renderOrder();

// 주문 버튼 누르면 로컬 스토리지 초기화 및 서버로 전달, 첫 페이지 이동
document.getElementById("order-end").addEventListener("click", function () {
    const dataToPost = orderList;

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();

    const date = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
    const time = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    const allPrice = all_price;


    //서버로 전달
    const in_out = inout
    payload = {
        data1: date,
        data2: time,
        data3: in_out,
        data4: dataToPost,
        data5: allPrice
    }

    fetch('/your-server-endpoint', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
        .then(response => {
            if (response.status === 200) {
                alert('주문이 완료되었습니다!');
            } else {
                alert('Failed to post variable');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to post variable');
        });

    //스토리지 초기화
    localStorage.clear();

    // 첫화면 이동
    window.location.href = "index1.html";

});
