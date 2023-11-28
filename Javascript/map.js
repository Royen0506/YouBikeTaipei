axios
  .get(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  )
  .then(function (response) {
    renderMap(response.data);
  });

//渲染站點到地圖
function renderMap(data) {
  map = L.map("map").setView(userPosition, 17);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  L.marker(userPosition).bindPopup(`<p>您的位置</p>`).openPopup().addTo(map);

  let markers = L.markerClusterGroup().addTo(map);
  data.forEach(function (item) {
    markers.addLayer(
      L.marker([item.lat, item.lng])
        .bindPopup(
          `<p>站名：${item.sna}</p><p>地址：${item.ar}</p><p>可租借車輛：${item.tot}</p><p>可歸還車位：${item.sbi}</p>`
        )
        .openPopup()
    );
    map.addLayer(markers);
  });
}

//擷取使用者位置
let userPosition = [];
const successCallback = (position) => {
  userPosition.push(position.coords.latitude, position.coords.longitude);
};
const errorCallback = (error) => {
  console.log(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
