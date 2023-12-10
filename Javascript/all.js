let originalData;

axios
  .get(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  )
  .then(function (response) {
    originalData = response.data;
    renderData(originalData);
    filterData(originalData);
    keywordSearch(originalData);
    renderMrtList(originalData);
    renderRoadSelect(originalData);
    renderList();
  });

const list = document.querySelector(".bikeList");
const countData = document.querySelector(".countData");

//初始化資料渲染
function renderData(data) {
  let str = "";
  data.forEach(function (item, index) {
    // console.log(item);
    let content = `<div><div class="fw-bold bg-dark text-white
    border border-warning border-3 rounded-4 p-3 mb-3">站名：${item.sna}<p>地址：${item.ar}</p><br>站點目前可租借車輛<p class="fs-3 text-warning">${item.sbi}</p>可歸還車位<p class="fs-3 text-warning mb-0">${item.bemp}</p></div></div>`;
    str += content;
  });
  list.innerHTML = str;
  countData.innerHTML = `－共 <span class="fw-bold">${data.length}</span> 處租借站－`;
}

//區域及道路篩選邏輯
let taipei_roads = [
  {
    區域: "中正區",
    road: [
      { 道路名稱: "忠孝西路" },
      { 道路名稱: "忠孝東路" },
      { 道路名稱: "重慶南路" },
      { 道路名稱: "重慶北路" },
      { 道路名稱: "中正路" },
      { 道路名稱: "杭州南路" },
      { 道路名稱: "杭州北路" },
      { 道路名稱: "南昌南路" },
      { 道路名稱: "南昌北路" },
      { 道路名稱: "延平南路" },
      { 道路名稱: "市民大道" },
      { 道路名稱: "南海路" },
      { 道路名稱: "懷寧街" },
      { 道路名稱: "仁愛路" },
      { 道路名稱: "愛國西路" },
      { 道路名稱: "和平西路" },
      { 道路名稱: "南昌街" },
      { 道路名稱: "中華路" },
    ],
  },
  {
    區域: "大同區",
    road: [
      { 道路名稱: "民生西路" },
      { 道路名稱: "重慶北路" },
      { 道路名稱: "承德路" },
      { 道路名稱: "民權西路" },
      { 道路名稱: "大龍街" },
      { 道路名稱: "延平北路" },
      { 道路名稱: "迪化街" },
      { 道路名稱: "甘泉街" },
      { 道路名稱: "赤峰街" },
      { 道路名稱: "南京西路" },
      { 道路名稱: "赤峰街" },
    ],
  },
  {
    區域: "中山區",
    road: [
      { 道路名稱: "中山北路" },
      { 道路名稱: "林森北路" },
      { 道路名稱: "林森南路" },
      { 道路名稱: "民權東路" },
      { 道路名稱: "民權西路" },
      { 道路名稱: "建國北路" },
      { 道路名稱: "建國南路" },
      { 道路名稱: "中山東路" },
      { 道路名稱: "中山西路" },
      { 道路名稱: "中山北路二段" },
      { 道路名稱: "中山南路" },
      { 道路名稱: "長春路" },
      { 道路名稱: "南京西路" },
      { 道路名稱: "南京東路" },
      { 道路名稱: "松江路" },
      { 道路名稱: "南京東路一段" },
    ],
  },
  {
    區域: "松山區",
    road: [
      { 道路名稱: "敦化北路" },
      { 道路名稱: "敦化南路" },
      { 道路名稱: "八德路" },
      { 道路名稱: "南京西路" },
      { 道路名稱: "南京東路" },
      { 道路名稱: "民生東路" },
      { 道路名稱: "民生西路" },
      { 道路名稱: "市民大道" },
      { 道路名稱: "東興路" },
      { 道路名稱: "松隆路" },
      { 道路名稱: "光復北路" },
      { 道路名稱: "三民路" },
      { 道路名稱: "建國北路一段" },
      { 道路名稱: "松仁路" },
    ],
  },
  {
    區域: "大安區",
    road: [
      { 道路名稱: "忠孝西路" },
      { 道路名稱: "忠孝東路" },
      { 道路名稱: "仁愛路" },
      { 道路名稱: "信義路" },
      { 道路名稱: "羅斯福路" },
      { 道路名稱: "復興南路" },
      { 道路名稱: "復興北路" },
      { 道路名稱: "安和路" },
      { 道路名稱: "辛亥路" },
      { 道路名稱: "和平東路" },
      { 道路名稱: "建國南路" },
      { 道路名稱: "新生南路" },
      { 道路名稱: "新生北路" },
      { 道路名稱: "金華街" },
      { 道路名稱: "臺大公館校區" },
    ],
  },
  {
    區域: "萬華區",
    road: [
      { 道路名稱: "西寧南路" },
      { 道路名稱: "西寧北路" },
      { 道路名稱: "漢中街" },
      { 道路名稱: "青年路" },
      { 道路名稱: "西園路" },
      { 道路名稱: "昆明街" },
      { 道路名稱: "和平西路" },
      { 道路名稱: "康定路" },
      { 道路名稱: "萬大路" },
    ],
  },
  {
    區域: "信義區",
    road: [
      { 道路名稱: "信義路" },
      { 道路名稱: "松高路" },
      { 道路名稱: "基隆路" },
      { 道路名稱: "敦化南路" },
      { 道路名稱: "敦化北路" },
      { 道路名稱: "光復南路" },
      { 道路名稱: "光復北路" },
      { 道路名稱: "和平東路" },
      { 道路名稱: "松仁路" },
      { 道路名稱: "市民大道" },
      { 道路名稱: "忠孝東路四段" },
    ],
  },
  {
    區域: "士林區",
    road: [
      { 道路名稱: "中山北路" },
      { 道路名稱: "承德路" },
      { 道路名稱: "文昌路" },
      { 道路名稱: "天母南路" },
      { 道路名稱: "天母北路" },
      { 道路名稱: "忠誠路" },
      { 道路名稱: "永平街" },
      { 道路名稱: "福港街" },
      { 道路名稱: "德行東路" },
    ],
  },
  {
    區域: "北投區",
    road: [
      { 道路名稱: "石牌路" },
      { 道路名稱: "中央北路" },
      { 道路名稱: "東華街" },
      { 道路名稱: "中央南路" },
      { 道路名稱: "立德街" },
      { 道路名稱: "裕民街" },
      { 道路名稱: "立功街" },
      { 道路名稱: "中央東路" },
    ],
  },
  {
    區域: "內湖區",
    road: [
      { 道路名稱: "內湖路" },
      { 道路名稱: "成功路" },
      { 道路名稱: "康寧路" },
      { 道路名稱: "行善路" },
      { 道路名稱: "東湖路" },
      { 道路名稱: "文湖街" },
      { 道路名稱: "新湖三路" },
      { 道路名稱: "港墘路" },
    ],
  },
  {
    區域: "南港區",
    road: [
      { 道路名稱: "經貿二路" },
      { 道路名稱: "南港路" },
      { 道路名稱: "三重路" },
      { 道路名稱: "成福路" },
      { 道路名稱: "玉成街" },
      { 道路名稱: "忠孝東路" },
      { 道路名稱: "市民大道" },
      { 道路名稱: "東新街" },
    ],
  },
  {
    區域: "文山區",
    road: [
      { 道路名稱: "木新路" },
      { 道路名稱: "興隆路" },
      { 道路名稱: "羅斯福路" },
      { 道路名稱: "景文街" },
      { 道路名稱: "辛亥路" },
      { 道路名稱: "指南路" },
      { 道路名稱: "試院路" },
      { 道路名稱: "木柵路" },
      { 道路名稱: "景興路" },
      { 道路名稱: "試院街" },
    ],
  },
];

const area = document.querySelector("#area");
const road = document.querySelector("#road");
function filterData(data) {
  area.addEventListener("change", function (e) {
    let newData = [];
    if (e.target.value === "") {
      road.innerHTML = "";
      renderData(originalData);
      return;
    }
    data.forEach(function (item, index) {
      if (e.target.value === item.sarea) {
        newData.push(item);
        taipei_roads.forEach(function (item) {
          if (item.區域 == e.target.value) {
            let str = "";
            item.road.forEach(function (item) {
              content = `<option value="${item.道路名稱}">${item.道路名稱}</option>`;
              str += content;
            });
            road.innerHTML = `<option value="全部">全部</option>${str}`;
          }
        });
      }
      renderData(newData);
      mrtStation.value = "";
    });
  });
}

function renderRoadSelect(data) {
  road.addEventListener("change", function (e) {
    if (area.value == "") {
      renderData(data);
      return;
    }
    let newRoadData = [];
    data.forEach(function (item) {
      let keyword = e.target.value;
      if (keyword == "全部" && area.value == item.sarea) {
        newRoadData.push(item);
      }

      if (item.ar.includes(keyword) || item.sarea.includes(keyword)) {
        if (area.value == item.sarea || item.sarea.includes(keyword)) {
          newRoadData.push(item);
        }
      }
    });
    renderData(newRoadData);
    mrtStation.value = "";
  });
}

//捷運站篩選邏輯
let mrtData = [
  { station: "捷運南港展覽館站" },
  { station: "捷運南港軟體園區" },
  { station: "捷運劍潭站" },
  { station: "捷運圓山站" },
  { station: "捷運士林站" },
  { station: "捷運科技大樓站" },
  { station: "捷運大直站" },
  { station: "捷運大安森林公園站" },
  { station: "捷運松山站" },
  { station: "捷運大安站" },
  { station: "捷運內湖站" },
  { station: "捷運信義安和站" },
  { station: "捷運松江南京站" },
  { station: "捷運台北101/世貿站" },
  { station: "捷運南京三民站" },
  { station: "捷運臺大醫院站" },
  { station: "捷運臺電大樓站" },
  { station: "捷運中山站" },
  { station: "捷運臺北車站" },
  { station: "捷運中正紀念堂站" },
  { station: "捷運南京復興站" },
  { station: "捷運忠孝復興站" },
  { station: "捷運文德站" },
  { station: "捷運港墘站" },
  { station: "捷運西湖站" },
  { station: "捷運劍南路站" },
  { station: "捷運中山國中站" },
  { station: "捷運六張犁站" },
  { station: "捷運麟光站" },
  { station: "捷運東湖站" },
  { station: "捷運辛亥站" },
  { station: "捷運萬芳醫院站" },
  { station: "捷運萬芳社區站" },
  { station: "捷運木柵站" },
  { station: "捷運動物園站" },
  { station: "捷運新北投站" },
  { station: "捷運葫洲站" },
  { station: "捷運竹圍站" },
  { station: "捷運關渡站" },
  { station: "捷運忠義站" },
  { station: "捷運復興崗站" },
  { station: "捷運北投站" },
  { station: "捷運奇岩站" },
  { station: "捷運唭哩岸站" },
  { station: "捷運石牌站" },
  { station: "捷運大湖公園站" },
  { station: "捷運明德站" },
  { station: "捷運芝山站" },
  { station: "捷運民權西路站" },
  { station: "捷運雙連站" },
  { station: "捷運東門站" },
  { station: "捷運象山站" },
  { station: "捷運廣慈/奉天宮站" },
  { station: "捷運小巨蛋站" },
  { station: "捷運北門站" },
  { station: "捷運小南門站" },
  { station: "捷運古亭站" },
  { station: "捷運公館站" },
  { station: "捷運萬隆站" },
  { station: "捷運景美站" },
];

const mrtStation = document.querySelector("#mrt");
function renderList() {
  let content;
  let str = "";
  mrtData.forEach(function (item) {
    content = `<option value=${item.station}>${item.station}</option>`;
    str += content;
  });
  mrtStation.innerHTML = `<option value="">站別</option>#${str}`;
}

function renderMrtList(data) {
  mrtStation.addEventListener("change", function (e) {
    let keyword = mrtStation.value.trim().toLowerCase();
    // console.log(keyword);
    let targetStation = [];
    data.forEach(function (item, index) {
      if (item.sna.includes(keyword)) {
        targetStation.push(item);
        // console.log(item);
      }
    });
    renderData(targetStation);
    area.value = "";
    road.innerHTML = "";
  });
}

//搜尋邏輯
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector("#searchBtn");

// console.log(searchInput);
// console.log(searchBtn);

function keywordSearch(arr) {
  // searchBtn.addEventListener("click", function (e) {
  //   let keyword = searchInput.value.trim().toLowerCase();
  //   let targetStation = [];
  //   arr.forEach(function (item, index) {
  //     if (
  //       item.ar.match(keyword) ||
  //       item.sarea.match(keyword) ||
  //       item.sna.match(keyword)
  //     ) {
  //       targetStation.push(item);
  //     }
  //   });
  //   renderData(targetStation);
  // });

  searchInput.addEventListener("input", function (e) {
    let keyword = searchInput.value.trim().toLowerCase();
    let targetStation = [];
    arr.forEach(function (item, index) {
      if (
        item.ar.includes(keyword) ||
        item.sarea.includes(keyword) ||
        item.sna.includes(keyword)
      ) {
        targetStation.push(item);
      }
    });
    renderData(targetStation);
    area.value = "";
    mrtStation.value = "";
    road.value = "全部";
  });
}
