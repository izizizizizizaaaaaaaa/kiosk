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
                    position: 'bottom',
                    reverse: true
                }
            }
        }



    });

    updateGraph(24); // 최대 표시 기간 (시간 단위)
}

function moveTable() {
    window.location.href = "indexM1.html";
}


function setInterval(num) {    // 시간 간격 설정 함수
    timeInterval = num * 1000 * 60 * 60 // num = 1 기준 1시간
    updateGraph(hours);
}

function setHours(num) {
    hours = num;
    updateGraph(hours);
}

// 그래프 업데이트 함수
function updateGraph(hours) {
    // 시간에 따른 주문 개수 계산
    const orderCountByHour = calculateOrderCountByHour(orderData, hours);
    // 데이터 업데이트
    myLineChart.data.labels = Object.keys(orderCountByHour)
    myLineChart.data.datasets[0].data = Object.values(orderCountByHour);
    // 차트 업데이트
    myLineChart.update();
}

// 시간에 따른 주문 개수 계산 함수
function calculateOrderCountByHour(orderData, hours) {
    const orderCountByHour = {};

    for (let i = 0; i < hours / (timeInterval / 3600000); i++) {

        const currentTime = new Date();
        currentTime.setMinutes(0);
        currentTime.setSeconds(0);
        const startTime = currentTime - i * timeInterval; // 1시간 단위
        const start_Time = new Date(startTime);     // 날짜 시간 형식으로 수정

        const endTime = startTime - timeInterval;

        const ordersInHour = orderData.map(order => {
            const orderTime = new Date(`${order.date}T${order.time}`);
            const orderTimestamp = orderTime.getTime();

            let temp = 0;
            for (let j = 0; j < orderData.length; j++) {
                let sum = 0;
                for (let k = 0; k < order.menu.length; k++) {
                    sum += order.menu[k].m_number;
                }
                temp = sum;

            }

            return orderTimestamp >= endTime && orderTimestamp < startTime ? temp : 0;
        });
        orderCountByHour[start_Time] = ordersInHour.reduce((sum, order) => sum + order, 0);
    }
    return orderCountByHour;
}
// 차트 초기화
initializeGraph();