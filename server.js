const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

require('dotenv').config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD

// Express 앱 생성
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/your-server-endpoint', (req, res) => {
    // POST로 전송된 변수 값 가져오기
    const data1 = req.body.data1;
    const data2 = req.body.data2;
    const data3 = req.body.data3;
    const data4 = req.body.data4;
    const data5 = req.body.data5;

    console.log('받은 날짜 데이터:', data1);
    console.log('받은 시간 데이터:', data2);
    console.log('받은 장소 데이터:', data3);
    console.log('받은 메뉴 데이터:', data4);
    console.log('받은 총액 데이터:', data5);

    res.status(200).send('Variable received successfully');


    // mongodb로 옮기는~~
    const { MongoClient } = require("mongodb");
    // const uri = 'mongodb://localhost:27017'; 로컬
    // const uri = "mongodb://127.0.0.1:27017"; 로컬
    const uri = MONGODB_URI_PROD;       // 배포
    const client = new MongoClient(uri);

    // 데이터 삽입 및 서버로 전체 데이터 다시 불러오기
    async function run() {
        const database = client.db("firstDB");
        const users = database.collection("users");

        // 데이터 삽입
        const userData = await users.insertOne({
            date: data1,
            time: data2,
            place: data3,
            menu: data4,
            allPrice: data5
        })
        console.log('result', userData);

        const fromData = await users.find({}).project({ _id: 0 }).toArray();
        fs.writeFileSync('data.json', JSON.stringify(fromData)); // 데이터를 파일로 저장
        console.log('데이터 저장 완')
    }
    run();

});

// 정적 파일 제공 (HTML 파일)
app.use(express.static(path.join(__dirname)));

// 시작 화면
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index1.html');
    console.log('안녕하세요');
});

// 관리 접속
// app.get('/manageTable', async (req, res) => {
//     // MongoDB 연결 및 데이터 가져오기
//     const { MongoClient } = require("mongodb");
//     const uri = "mongodb://127.0.0.1:27017";
//     const client = new MongoClient(uri);

//     console.log('ManageTable 접속');

//     try {
//         await client.connect();
//         const database = client.db("firstDB");
//         const users = database.collection("users");
//         const fromData = await users.find({}).project({ _id: 0 }).toArray();

//         fs.writeFileSync('data.json', JSON.stringify(fromData)); // 데이터를 파일로 저장
//         res.sendFile(__dirname + '/indexM1.html');   // html 호출
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('서버 오류');
//     } finally {
//         await client.close();
//     }
// });

// app.get('/manageGraph', async (req, res) => {
//     // MongoDB 연결 및 데이터 가져오기
//     const { MongoClient } = require("mongodb");
//     const uri = "mongodb://127.0.0.1:27017";
//     const client = new MongoClient(uri);
//     console.log('ManageGraph 접속');
//     try {
//         await client.connect();
//         const database = client.db("firstDB");
//         const users = database.collection("users");
//         const fromData = await users.find({}).project({ _id: 0 }).toArray();

//         fs.writeFileSync('data.json', JSON.stringify(fromData)); // 데이터를 파일로 저장
//         res.sendFile(__dirname + '/indexM2.html');   // html 호출
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('서버 오류');
//     } finally {
//         await client.close();
//     }
// })


// 서버 시작
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
}); 