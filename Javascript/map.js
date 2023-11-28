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
  map = L.map("map").setView(userPosition, 16);
  L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },

    L.marker(userPosition, { icon: greenIcon })
      .addTo(map)
      .bindPopup(`<p>您的位置</p>`)
      .openPopup()
  ).addTo(map);

  let markers = L.markerClusterGroup().addTo(map);
  data.forEach(function (item) {
    markers.addLayer(
      L.marker([item.lat, item.lng])
        .bindPopup(
          `<p>站名：${item.sna}</p><p>地址：${item.ar}</p><p>可租借車輛：${item.tot}</p><p>可歸還車位：${item.sbi}</p><a target="_blank" href="https://www.google.com.tw/maps/place/${item.ar}/@${item.lat},${item.lng},20z/">導航</a>`
        )
        .openPopup()
    );
    map.addLayer(markers);
  });
}
