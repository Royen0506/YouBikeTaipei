let originalData;

axios
  .get(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  )
  .then(function (response) {
    originalData = response.data;
    renderData(originalData);
    filiterData(originalData);
    keywordSearch(originalData);
  });

const list = document.querySelector(".list");

//初始化資料渲染
function renderData(data) {
  let str = "";
  data.forEach(function (item, index) {
    // console.log(item);
    let content = `<li class="border border-2 border-dark rounded-4 py-3 px-3 mb-3">站名：${item.sna}<p>地址：${item.ar}</p><br>站點目前可租借車輛：<p class="fs-3">${item.sbi}</p>可歸還車位：<p class="fs-3">${item.bemp}</p></li>`;
    str += content;
  });
  list.innerHTML = str;
}

//篩選邏輯
const area = document.querySelector("#area");
function filiterData(data) {
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

//搜尋邏輯
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector("#searchBtn");

// console.log(searchInput);
// console.log(searchBtn);

function keywordSearch(arr) {
  searchBtn.addEventListener("click", function (e) {
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
