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
    renderList();
  });

const list = document.querySelector(".list");
const countData = document.querySelector(".countData");

//初始化資料渲染
function renderData(data) {
  let str = "";
  data.forEach(function (item, index) {
    // console.log(item);
    let content = `<li class="fw-bold bg-dark text-white
    border border-warning border-3 rounded-4 py-3 mb-3">站名：${item.sna}<p>地址：${item.ar}</p><br>站點目前可租借車輛<p class="fs-3 text-warning">${item.sbi}</p>可歸還車位<p class="fs-3 text-warning">${item.bemp}</p></li>`;
    str += content;
  });
  list.innerHTML = str;
  countData.innerHTML = `－共 <span class="fw-bold">${data.length}</span> 處租借站－`;
}

//篩選邏輯
const area = document.querySelector("#area");
function filterData(data) {
  area.addEventListener("change", function (e) {
    let newData = [];
    if (e.target.value === "") {
      renderData(originalData);
      return;
    }
    data.forEach(function (item, index) {
      if (e.target.value === item.sarea) {
        newData.push(item);
      }
      renderData(newData);
    });
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
  { station: "捷運大坪林站" },
  { station: "捷運七張站" },
  { station: "捷運小碧潭站" },
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
      if (item.sna.match(keyword)) {
        targetStation.push(item);
        console.log(item);
      }
    });
    renderData(targetStation);
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

  searchInput.addEventListener("change", function (e) {
    let keyword = searchInput.value.trim().toLowerCase();
    let targetStation = [];
    arr.forEach(function (item, index) {
      if (
        item.ar.match(keyword) ||
        item.sarea.match(keyword) ||
        item.sna.match(keyword)
      ) {
        targetStation.push(item);
      }
    });
    renderData(targetStation);
  });
}
