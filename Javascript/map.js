// 擷取使用者位置;
let userPosition = [];

navigator.geolocation.watchPosition((position) => {
  userPosition.push(position.coords.latitude, position.coords.longitude);

  axios
    .get(
      "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
    )
    .then(function (response) {
      renderMap(response.data, userPosition);
    });
});

//新增使用位置標記Marker
let greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

let blackIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

let VioletIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
let greyIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// 渲染站點到地圖
function renderMap(data, userPosition) {
  map.eachLayer((layer) => {
    layer.remove();
  });

  let map = L.map("map").setView(userPosition, 17);
  console.log(userPosition);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(userPosition, { icon: VioletIcon })
    .addTo(map)
    .bindPopup(`<p>您的位置</p>`)
    .openPopup();

  let markers = L.markerClusterGroup().addTo(map);
  data.forEach(function (item) {
    let mask;
    if (item.bemp == 0) {
      mask = blackIcon;
    } else if (item.sbi == 0) {
      mask = greyIcon;
    } else {
      mask = greenIcon;
    }

    markers.addLayer(
      L.marker([item.lat, item.lng], { icon: mask })
        .bindPopup(
          `<p>站名：${item.sna}</p><p>地址：${item.ar}</p><p>可租借車輛：${item.sbi}</p><p>可歸還車位：${item.bemp}</p>`
        )
        .openPopup()
    );
  });
  map.addLayer(markers);
}
