//擷取使用者位置;
// let userPosition = [];

// navigator.geolocation.getCurrentPosition((position) => {
//   userPosition.push(position.coords.latitude, position.coords.longitude);
// });

axios
  .get(
    "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
  )
  .then(function (response) {
    renderMap(response.data);
  });

//渲染站點到地圖
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

function renderMap(data) {
  map = L.map("map").setView([25.042254, 121.5509563], 15);
  L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }

    // L.marker([25.0486589, 121.5092654], { icon: greenIcon })
    //   .addTo(map)
    //   .bindPopup(`<p>您的位置</p>`)
    //   .openPopup()
  ).addTo(map);

  let markers = L.markerClusterGroup().addTo(map);
  data.forEach(function (item) {
    markers.addLayer(
      L.marker([item.lat, item.lng])
        .bindPopup(
          `<p>站名：${item.sna}</p><p>地址：${item.ar}</p><p>可租借車輛：${item.sbi}</p><p>可歸還車位：${item.bemp}</p>`
        )
        .openPopup()
    );
    map.addLayer(markers);
  });
}
