let myGraph1=document.getElementById('myGraph1');
let myGraph2=document.getElementById('myGraph2');
let myGraph3=document.getElementById('myGraph3');
let myGraph4=document.getElementById('myGraph4');
let myGraph5=document.getElementById('myGraph5');
const listContainer = document.getElementById('myList'); // 取得具有特定 ID 的列表容器元素

//'觀光遊憩區別','門票收入','遊客人次', '上年同月份遊客人次', '增減數', '成長率', '備註'

d3.csv('data1.csv').then(function(data) {
    // 將解析後的CSV數據存儲到數組a中

    let a = data;
    console.log('檢查CSV數據存儲到a[]中:', a);
//第1張圖-門票收入
    let data0 = {
        type: "bar", // 將圖表類型設置為長條圖
        title:"109年1月門票收入",
        x: [], // 條形圖的標籤
        y: []  // 條形圖的數值
    };

    for (let x = 0; x < a.length; x++) {
        data0.x.push(a[x]['觀光遊憩區別']);
        data0.y.push(parseInt(a[x]['門票收入'].replace(/,/g, ''))); // 分隔符號移除
    }

    console.log('數據測試:', data0);
    let data1 = [data0]; // 長條圖對象
    let layout ={
        margin:{
            t:0
        },
        yaxis: {
            title: '門票收入(NTD)' // 設y軸
        }
    };

    // 處理data1或其他相關操作
    Plotly.newPlot(myGraph1, data1, layout);
//第2張圖-遊客人次
    let data2 = {
        type: "pie",
        title:"109年1月遊客人次",
        labels: [],
        values: []
    };
    data2.hole =0.5;
    for (let x = 0; x < a.length; x++) {
        data2.labels.push(a[x]['觀光遊憩區別']);
        data2.values.push(parseInt(a[x]['遊客人次'].replace(/,/g, ''))); // 千位數分隔符號移除並轉為整數
    }

    console.log('數據測試:', data2);
    let data3 = [data2];

    let layout2 ={
        margin:{
            t:10,
            l:0,
        
        }
    };
    
    Plotly.newPlot(myGraph2, data3, layout2);
//第3張圖-上年同月份遊客人次
    let data4 = {
        type: "pie",
        title:"108年1月遊客人次",
        labels: [],
        values: []
        
    };
    data4.hole =0.5;
    for (let x = 0; x < a.length; x++) {
        data4.labels.push(a[x]['觀光遊憩區別']);
        data4.values.push(parseInt(a[x]['上年同月份遊客人次'].replace(/,/g, ''))); // 千位數分隔符號移除並轉為整數
    }

    console.log('數據測試:', data4);
    let data5 = [data4];

    let layout3 ={
        margin:{
            t:10,
            l:0,
        
        }
    };
    
    Plotly.newPlot(myGraph3, data5, layout3);
//第4張圖-對比遊客人次

    let data6 = {
        type: "bar", // 將圖表類型設置為長條圖
        name: "109年1月",
        x: [], // 條形圖的標籤
        y: [],  // 條形圖的數值
    };

    let data7 = {
        type: "bar", // 將圖表類型設置為長條圖
        name: "108年1月",
        x: [], // 條形圖的標籤
        y: []  // 條形圖的數值
    };

    for (let x = 0; x < a.length; x++) {
        data6.x.push(a[x]['觀光遊憩區別']);
        data6.y.push(parseInt(a[x]['遊客人次'].replace(/,/g, ''))); 

        data7.x.push(a[x]['觀光遊憩區別']);
        data7.y.push(parseInt(a[x]['上年同月份遊客人次'].replace(/,/g, ''))); 
    }
    console.log('數據測試:', data6, data7);
    let layout4 = {
        margin: {
            t: 0
        },
        yaxis: {
            title: '人數' 
        },
        barmode: 'stack' // 堆疊
    };
    Plotly.newPlot(myGraph4, [data7, data6], layout4);
//第5張圖-門票收入
    let data8 = {
        type: "bar", // 將圖表類型設置為長條圖
        title:"成長率",
        x: [], // 條形圖的標籤
        y: []  // 條形圖的數值
    };

    for (let x = 0; x < a.length; x++) {
        data8.x.push(a[x]['觀光遊憩區別']);
        data8.y.push(parseInt(a[x]['成長率'].replace(/,/g, ''))); 
    }

    console.log('數據測試:', data8);
    let data9 = [data8];
    let layout5 ={
        margin:{
            t:0
        },
        yaxis: {
            title: '成長率(%)' 
        }
    };


Plotly.newPlot(myGraph5, data9, layout5);

//資料來源
    dataSource={
        label:[],
        value:[]
    };
    for (let x = 0; x < a.length; x++) {
        dataSource.label.push(a[x]['觀光遊憩區別']);
        dataSource.value.push(a[x]['備註']); 
    }
    console.log('數據測試dataSource:', dataSource);

    for (let x = 0; x < dataSource.label.length; x++) {
        const listItem = document.createElement('li'); // 創建 <li> 元素
        listItem.textContent = `${dataSource.label[x]}: ${dataSource.value[x]}`; // 設定 <li> 元素的文本內容
        listContainer.appendChild(listItem); // 將 <li> 元素添加到列表容器中
    }
}).catch(function(error) {
    // 處理數據錯誤
    console.error('加載CSV數據時發生錯誤:', error);
});