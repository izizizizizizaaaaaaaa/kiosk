document.addEventListener('DOMContentLoaded', function () {
    fetchDataAndInitializeTable();
});

// data.json 파일 가져옴
function fetchDataAndInitializeTable() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initializeDataTable(data);
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function initializeDataTable(data) {
    $('#data-table').DataTable({
        data: data,
        columns: [
            { data: 'date' },
            { data: 'time' },
            { data: 'place' },
            {
                data: 'menu',
                render: function (menuArray) {
                    if (Array.isArray(menuArray) && menuArray.length > 0) {
                        // 'menu' 배열의 모든 객체의 속성을 표시
                        const menuDetails = menuArray.map(menuItem => {
                            return `메뉴:${menuItem.m_name}`;
                        });
                        return menuDetails.join('<br>');

                    } else {
                        return 'No menu items'; // 'menu' 배열이 비어있는 경우에 대한 처리
                    }
                }
            },
            {
                data: 'menu',
                render: function (menuArray) {
                    if (Array.isArray(menuArray) && menuArray.length > 0) {
                        // 'menu' 배열의 모든 객체의 속성을 표시
                        const menuDetails = menuArray.map(menuItem => {
                            return `옵션:${menuItem.m_option}`;
                        });

                        return menuDetails.join('<br>');
                    } else {
                        return 'No menu items'; // 'menu' 배열이 비어있는 경우에 대한 처리
                    }
                }
            },
            {
                data: 'menu',
                render: function (menuArray) {
                    if (Array.isArray(menuArray) && menuArray.length > 0) {
                        // 'menu' 배열의 모든 객체의 속성을 표시
                        const menuDetails = menuArray.map(menuItem => {
                            return `개수:${menuItem.m_number}`;
                        });

                        return menuDetails.join('<br>');
                    } else {
                        return 'No menu items'; // 'menu' 배열이 비어있는 경우에 대한 처리
                    }
                }
            },
            {
                data: 'menu',
                render: function (menuArray) {
                    if (Array.isArray(menuArray) && menuArray.length > 0) {
                        // 'menu' 배열의 모든 객체의 속성을 표시
                        const menuDetails = menuArray.map(menuItem => {
                            return `총 가격: ${menuItem.m_tprice}`;
                        });

                        return menuDetails.join('<br>');
                    } else {
                        return 'No menu items'; // 'menu' 배열이 비어있는 경우에 대한 처리
                    }
                }
            },
            { data: 'allPrice' }
        ]
    });
}

function moveGraph() {
    window.location.href = "indexM2.html";
}
