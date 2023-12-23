// scriptM2.js

// 차트 초기화
const ctx = document.getElementById("myLineChart").getContext("2d");
let myLineChart;
let orderData; // 전역 변수로 선언
let timeInterval = 1000 * 60 * 60;   // 시간 간격 전역 변수 , 초기값 1시간 설정
let hours = 24                  // 최대 표시 기간 전역 변수 , 초기값 24시간

async function initializeGraph() {
    // data.json 파일에서 데이터 가져오기
    const response = await fetch('data.json');
    orderData = await response.json();

    myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: '주문 개수',
                data: [],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 5,
                fill: true
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'category',
                    position: 'bottom'
                }
            }
        }



    });

    updateGraph(24); // 최대 표시 기간 (시간 단위)
}

function moveTable() {
    window.location.href = "indexM1.html";
}

// 그래프 업데이트 함수
function updateGraph(hours) {
    // 시간에 따른 주문 개수 계산
    const orderCountByHour = calculateOrderCountByHour(orderData, hours);
    // 데이터 업데이트
    myLineChart.data.labels = Object.keys(orderCountByHour);
    myLineChart.data.datasets[0].data = Object.values(orderCountByHour);
    // 차트 업데이트
    myLineChart.update();
    console.log(orderCountByHour)   // 그래프를 데이터로 콘솔창에 표시
}

// 날짜에 따른 주문 개수 계산 함수
function calculateOrderCountByHour(orderData, hours) {
    const newData = {};
    let date = "";

    for (let i = 0; i < orderData.length; i++) {
        let sumTemp = 0;
        if (date != orderData[i].date) {                    // 기존 데이터와 다르다면 [date] key값을 만들어서 거기에 추가
            date = orderData[i].date;
            newData[date] = 0;
            for (let j = 0; j < orderData[i].menu.length; j++) {
                sumTemp += orderData[i].menu[j].m_number
            }
            newData[date] = sumTemp;
        } else if (date == orderData[i].date) {             // 기존 날짜와 같을 때
            for (let j = 0; j < orderData[i].menu.length; j++) {
                sumTemp += orderData[i].menu[j].m_number
            }
            newData[date] += sumTemp;
        }
    }
    return newData;
}
// 차트 초기화
initializeGraph();