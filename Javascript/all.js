const { createApp } = Vue;
const { createPinia, mapActions, mapState } = Pinia;
import StationStore from "../store/StationStore.js";
import headers from "./components/headers.js";
import footers from "./components/footer.js";

const app = createApp({
  components: { headers, footers },
});

app.component("card", {
  data() {
    return {
      tempData: "",
      taipei_roads: [],
      road: [],
      area: "",
      tempRoad: "",
      tempMrt: "",
      tempSearch: "",
    };
  },

  mounted() {
    this.getData();
    this.taipei_roads = this.taipeiRoads;
  },

  template: `
  <section class="container mb-5">
            <div class="mt-3 mb-3">
                <div class="mb-3 flex-column">
                    <h2 class="fw-bold mb-3">查詢站點狀態</h2>
                    <a href="map.html" class="btn btn-warning text-white mb-3 rounded-4 fw-bold">點我進到地圖搜尋</a><br>
                    <label class="fw-bold form-label" for="area"><i
                            class="text-info fw-bold fs-3 bi bi-globe-asia-australia me-1"></i>區域搜尋</label>
                    <select v-model="area" class="rounded-4 text-center" name="area" id="area">
                        <option value="" selected disabled>請選擇區域</option>
                        <option value="松山區">松山區</option>
                        <option value="信義區">信義區</option>
                        <option value="大安區">大安區</option>
                        <option value="中山區">中山區</option>
                        <option value="中正區">中正區</option>
                        <option value="大同區">大同區</option>
                        <option value="萬華區">萬華區</option>
                        <option value="文山區">文山區</option>
                        <option value="南港區">南港區</option>
                        <option value="內湖區">內湖區</option>
                        <option value="士林區">士林區</option>
                        <option value="北投區">北投區</option>
                    </select>
                    <select v-if="!area == ''" v-model="tempRoad" class="rounded-4 text-center" name="road" id="road">
                        <option  selected disabled value="請選擇路別">請選擇路別</option>
                        <option v-for="(item,key) in road" :key="key" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="mb-3 flex-column">
                    <label class="fw-bold form-label" for="mrt"><i
                            class="text-info fw-bold fs-3 bi bi-train-freight-front me-1"></i>捷運站搜尋</label>
                    <select v-model="tempMrt" class="rounded-4 text-center" name="mrt" id="mrt"><option value="" selected disabled>請選擇站別</option><option v-for="(item,key) in mrtData" :key="key" :value="item">{{item}}</option>
                    </select>
                </div>
                <div class="d-flex mb-3">
                    <label class="fw-bold form-label align-self-center jcc" for="search"><i
                            class="text-info fw-bold fs-3 bi bi-search me-1"></i>輸入搜尋</label>
                    <input v-model="tempSearch" value="" class="ms-2 searchInput form-control w-50 rounded-5" type="text" placeholder="請輸入部分地址或站名"
                        name="search" id="search">
                </div>
                <p v-if="!tempData.length == 0" class="text-secondary opacity-75 text-end text-lg-start pe-5 mb-0">－共 <span class="fw-bold">{{ tempData.length }}</span> 處租借站－</p>
            </div>
            <div class="bikeList row row-cols-1 row-cols-lg-3 g-4 text-center mx-3 mx-lg-0">
            <div v-for="(item,key) in tempData"><div class="h-100 fw-bold bg-dark text-white border border-warning border-3 rounded-4 p-3 mb-3">站名：{{item.sna}}<p>地址：{{item.ar}}</p><br>站點目前可租借車輛<p class="fs-3 text-warning">{{item.sbi}}</p>可歸還車位<p class="fs-3 text-warning mb-0">{{item.bemp}}</p></div></div>
            </div>
        </section>`,

  methods: {
    ...mapActions(StationStore, ["getData"]),
  },

  watch: {
    area(newValue) {
      // 篩選 tempData
      if (newValue) {
        this.tempData = this.originalData.filter((item) => {
          return item.sarea === newValue;
        });
      }

      this.taipei_roads.filter((item) => {
        if (item.區域 == newValue) {
          this.road = item.road;
        }
      });
    },

    tempRoad(newValue) {
      if (newValue) {
        this.tempData = this.originalData.filter((item) => {
          return item.ar.match(newValue);
        });
      }
    },

    tempMrt(newValue) {
      if (newValue) {
        this.tempData = this.originalData.filter((item) => {
          return item.sna.match(newValue);
        });
      }

      this.area = "";
      this.tempSearch = "";
    },

    tempSearch(newValue) {
      if (newValue) {
        this.tempData = this.originalData.filter((item) => {
          return (item.sna || item.ar || item.sarea).match(newValue);
        });
      }

      this.tempMrt = "";
      this.area = "";
    },
  },

  computed: {
    ...mapState(StationStore, ["originalData", "taipeiRoads", "mrtData"]),
  },
});

app.component("bike-map", {
  data() {
    return {
      userPosition: [25.03746, 121.564558],
      bikeData: [],
      mapInitialized: false,
      greenIcon: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      blackIcon: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      violetIcon: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
      greyIcon: new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      }),
    };
  },

  mounted() {
    this.fetchDataAndUserPosition();
  },

  template: `<section>
        <div class="container">
            <div class="row row-cols-1 row-cols-lg-3 py-4">
                <div class="d-flex">
                    <img class="img-fluid"
                        src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png"
                        alt="">
                    <p class="align-self-center mb-0 ms-1">該站點目前無車位可歸還</p>
                </div>
                <div class="d-flex mt-2 mt-lg-0">
                    <img class="img-fluid"
                        src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
                        alt="">
                    <p class="align-self-center mb-0 ms-1">該站點目前接受歸還及租借</p>
                </div>
                <div class="d-flex mt-2 mt-lg-0">
                    <img class="img-fluid"
                        src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png"
                        alt="">
                    <p class="align-self-center mb-0 ms-1">該站點目前無車輛可租借</p>
                </div>
            </div>
        </div>
        <div v-if="!mapInitialized" class="text-center"><img src="../images/Ellipsis-3.6s-197px.svg"></div>
        <div id="map">
        </div>
    </section>`,

  methods: {
    async fetchDataAndUserPosition() {
      try {
        await this.getData();
        this.renderMap();
      } catch (error) {
        console.error("取得遠端資料時發生錯誤：", error);
      }
    },

    renderMap() {
      navigator.geolocation.watchPosition((position) => {
        this.userPosition = [
          position.coords.latitude,
          position.coords.longitude,
        ];
        if (!this.mapInitialized) {
          if (this.originalData.length > 0) {
            // 確認 originalData 是否已有資料
            this.mapInit(this.originalData, this.userPosition);
            this.mapInitialized = true;
          } else {
            ///如果 originalData 沒資料1秒後再執行一次
            setTimeout(() => {
              this.renderMap();
            }, 1000);
          }
        }
      });
    },

    mapInit(data, userPosition) {
      let map = L.map("map").setView(userPosition, 17);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(userPosition, { icon: this.violetIcon })
        .addTo(map)
        .bindPopup("<p>您的位置</p>")
        .openPopup();

      let markers = L.markerClusterGroup().addTo(map);
      data.forEach((item) => {
        let mask;
        if (item.bemp == 0) {
          mask = this.blackIcon;
        } else if (item.sbi == 0) {
          mask = this.greyIcon;
        } else {
          mask = this.greenIcon;
        }

        let arKeyword = `${item.sna
          .replace("2.0", "微笑單車+2.0:")
          .replace("_", "")}`;

        markers.addLayer(
          L.marker([item.lat, item.lng], { icon: mask })
            .bindPopup(
              `<p>站名：${item.sna}</p><p>地址：${item.ar}</p><p>可租借車輛：${item.sbi}</p><p>可歸還車位：${item.bemp}</p><a target="_blank" href="https://www.google.com.tw/maps/dir/${userPosition}/${arKeyword}/@${item.lat},${item.lng},19z/?entry=ttu">在Google Map上導航</a>`
            )
            .openPopup()
        );
      });
      map.addLayer(markers);
    },

    ...mapActions(StationStore, ["getData"]),
  },

  computed: {
    ...mapState(StationStore, ["originalData"]),
  },
});

app.component("back-to-top", {
  template: `<section data-aos="fade-down" class="fixed-bottom me-3 me-lg-5">
            <a class="heartbeat link-info link-underline-opacity-0 fw-bold position-absolute bottom-0 end-0 d-flex flex-column align-items-center"
                href="#header"><i class="display-1 bi bi-arrow-up-square-fill text-warning"></i><span
                    class="bg-info text-white rounded-3 d-none d-lg-block px-3 mb-3">Back to top</span></a>
        </section>`,
});

const pinia = createPinia();
app.use(pinia);
app.mount("#app");
