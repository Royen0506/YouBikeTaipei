export default {
  template: `<header class="bg-info" id="header">
            <h1 data-aos="fade-down" class="text-center fw-bold py-3 py-lg-4 text-white mb-0"><i
                    class="bi bi-bicycle fw-bold"></i>
                臺北市YouBike2.0<br class="d-block d-lg-none">租借站點查詢
            </h1>
        </header>
        <section class="bg-dark py-3">
            <div class="container">
                <p class="mb-0 text-info">版本1.02</p>
                <p class="mb-0 text-white lh-lg">1.新增地圖搜尋<br>2.區域搜尋後方新增道路搜尋<br>3.吃了塊蛋糕順便吸一下貓</p>
                <p class="fw-bold text-warning mb-3 mt-2">提醒：資料更新頻率為每分鐘更新一次<br>資料取自政府開放資料平台
                </p>
                <slot></slot>
            </div>
        </section>
        <img class="d-none d-lg-block header-img border-bottom border-warning border-4 w-100 object-fit-cover"  src="https://www.taiwanexcellence.org/upload/product/old/old2022/112235IA-Y037_L.jpg">
        `,
};
