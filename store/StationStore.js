const { defineStore } = Pinia;

export default defineStore("stationStore", {
  state: () => ({
    originalData: [],
    taipeiRoads: [
      {
        區域: "中正區",
        road: [
          "忠孝西路",
          "忠孝東路",
          "重慶南路",
          "重慶北路",
          "中正路",
          "杭州南路",
          "杭州北路",
          "南昌南路",
          "南昌北路",
          "延平南路",
          "市民大道",
          "南海路",
          "懷寧街",
          "仁愛路",
          "愛國西路",
          "和平西路",
          "南昌街",
          "中華路",
        ],
      },
      {
        區域: "大同區",
        road: [
          "民生西路",
          "重慶北路",
          "承德路",
          "民權西路",
          "大龍街",
          "延平北路",
          "迪化街",
          "甘泉街",
          "赤峰街",
          "南京西路",
          "赤峰街",
        ],
      },
      {
        區域: "中山區",
        road: [
          "中山北路",
          "林森北路",
          "林森南路",
          "民權東路",
          "民權西路",
          "建國北路",
          "建國南路",
          "中山東路",
          "中山西路",
          "中山北路二段",
          "中山南路",
          "長春路",
          "南京西路",
          "南京東路",
          "松江路",
          "南京東路一段",
        ],
      },
      {
        區域: "松山區",
        road: [
          "敦化北路",
          "敦化南路",
          "八德路",
          "南京西路",
          "南京東路",
          "民生東路",
          "民生西路",
          "市民大道",
          "東興路",
          "松隆路",
          "光復北路",
          "三民路",
          "建國北路一段",
          "松仁路",
        ],
      },
      {
        區域: "大安區",
        road: [
          "忠孝西路",
          "忠孝東路",
          "仁愛路",
          "信義路",
          "羅斯福路",
          "復興南路",
          "復興北路",
          "安和路",
          "辛亥路",
          "和平東路",
          "建國南路",
          "新生南路",
          "新生北路",
          "金華街",
          "臺大公館校區",
        ],
      },
      {
        區域: "萬華區",
        road: [
          "西寧南路",
          "西寧北路",
          "漢中街",
          "青年路",
          "西園路",
          "昆明街",
          "和平西路",
          "康定路",
          "萬大路",
        ],
      },
      {
        區域: "信義區",
        road: [
          "信義路",
          "松高路",
          "基隆路",
          "敦化南路",
          "敦化北路",
          "光復南路",
          "光復北路",
          "和平東路",
          "松仁路",
          "市民大道",
          "忠孝東路四段",
        ],
      },
      {
        區域: "士林區",
        road: [
          "中山北路",
          "承德路",
          "文昌路",
          "天母南路",
          "天母北路",
          "忠誠路",
          "永平街",
          "福港街",
          "德行東路",
        ],
      },
      {
        區域: "北投區",
        road: [
          "石牌路",
          "中央北路",
          "東華街",
          "中央南路",
          "立德街",
          "裕民街",
          "立功街",
          "中央東路",
        ],
      },
      {
        區域: "內湖區",
        road: [
          "內湖路",
          "成功路",
          "康寧路",
          "行善路",
          "東湖路",
          "文湖街",
          "新湖三路",
          "港墘路",
        ],
      },
      {
        區域: "南港區",
        road: [
          "經貿二路",
          "南港路",
          "三重路",
          "成福路",
          "玉成街",
          "忠孝東路",
          "市民大道",
          "東新街",
        ],
      },
      {
        區域: "文山區",
        road: [
          "木新路",
          "興隆路",
          "羅斯福路",
          "景文街",
          "辛亥路",
          "指南路",
          "試院路",
          "木柵路",
          "景興路",
          "試院街",
        ],
      },
    ],
    mrtData: [
      "南港展覽館站",
      "南港軟體園區",
      "劍潭站",
      "圓山站",
      "士林站",
      "科技大樓站",
      "大直站",
      "大安森林公園站",
      "松山站",
      "大安站",
      "內湖站",
      "信義安和站",
      "松江南京站",
      "台北101/世貿站",
      "南京三民站",
      "臺大醫院站",
      "臺電大樓站",
      "中山站",
      "臺北車站",
      "中正紀念堂站",
      "南京復興站",
      "忠孝復興站",
      "文德站",
      "港墘站",
      "西湖站",
      "劍南路站",
      "中山國中站",
      "六張犁站",
      "麟光站",
      "東湖站",
      "辛亥站",
      "萬芳醫院站",
      "萬芳社區站",
      "木柵站",
      "動物園站",
      "新北投站",
      "葫洲站",
      "竹圍站",
      "關渡站",
      "忠義站",
      "復興崗站",
      "北投站",
      "奇岩站",
      "唭哩岸站",
      "石牌站",
      "大湖公園站",
      "明德站",
      "芝山站",
      "民權西路站",
      "雙連站",
      "東門站",
      "象山站",
      "廣慈/奉天宮站",
      "小巨蛋站",
      "北門站",
      "小南門站",
      "古亭站",
      "公館站",
      "萬隆站",
      "景美站",
    ],
  }),
  actions: {
    getData() {
      axios
        .get(
          "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json"
        )
        .then((res) => {
          this.originalData = res.data;
          console.log(this.originalData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
