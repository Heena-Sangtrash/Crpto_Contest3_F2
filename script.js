let themeBtn = document.querySelector(".header__switch-btn>input");
let mobThemeBtn = document.querySelector(".mobile-header__switch-btn>input")
// let swithAfterElement = window.getComputedStyle(themeBtn, '::after');

// let swithAfterElement = document.styleSheets[0].cssRules[1];

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
})

mobThemeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
})


let menuIcon = document.querySelector("#mobile-nav-icon");

let mobileNav = document.querySelector(".mobile-header");

let isMobNavOpen = false;
menuIcon.addEventListener("click", () => {
    if (isMobNavOpen === false) {
        mobileNav.style.display = "block";
        isMobNavOpen = true;
    } else {
        mobileNav.style.display = "none";
        isMobNavOpen = false;
    }
})

// Adding styles to main header title ---------------------
let main = document.querySelector(".main__grid");

let mainHeaderLeft = document.getElementsByClassName("main__header-left")[0];
let mainHeaderRight = document.getElementsByClassName("main__header-right")[0];
mainHeaderLeft.classList.add("main__header-active");
mainHeaderLeft.addEventListener("click", () => {
    mainHeaderLeft.classList.add("main__header-active");
    mainHeaderRight.classList.remove("main__header-active")
    main.innerHTML = "";
    defaultPageGridData (); 
})

let table = document.getElementById("table");


mainHeaderRight.addEventListener("click", () => {
    main.innerHTML = "";
    mainHeaderRight.classList.add("main__header-active");
    mainHeaderLeft.classList.remove("main__header-active");
    async function getData() {
        let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
        let response = await fetch(url);
        let data = await response.json();
        createList(data);
    }
    getData()

    function createList(dataList) {
        dataList.forEach((singleData) => {
            let tr = document.createElement("tr");
            tr.classList.add("tr");

            let trInnerHtml = `<td>
                                    <div class="table-main__grid-card-top">
                                    <div class="table-main__grid-card-top-left">
                                        <img
                                        src="${singleData.image}"
                                        alt="icon imag"
                                        />
                                    </div>
                                    <div class="table-main__grid-card-top-right">
                                        <h5 style="color:white">${singleData.id}</h5>
                                        <p style="color:white">${singleData.name}</p>
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="table-percentage">${singleData.price_change_percentage_24h} %</div>
                                </td>
                                <td>
                                    <div class="table-price">$ ${singleData.current_price}</div>
                                </td>
                                <td>
                                    <div class="total__valume">Total Valume: ${singleData.total_volume}</div>
                                </td>
                                <td>
                                    <div class="market__cap">Market Cap: ${singleData.market_cap}</div>
                                </td>`
            tr.innerHTML = trInnerHtml;
            // Get the elements inside the card
        let percentageDiv = tr.querySelector(".table-percentage");
        let priceDiv = tr.querySelector(".table-price");

        // Apply styles based on the condition
        if (singleData.price_change_percentage_24h < 0) {
            percentageDiv.style.borderColor = "#e7514a";
            percentageDiv.style.color = "#e7514a";
            priceDiv.style.color = "#e7514a";
        }
            table.appendChild(tr);
        })
    }

})


/* <tr class="tr">
            <td>
              <div class="table-main__grid-card-top">
                <div class="table-main__grid-card-top-left">
                  <img
                    src="https://images.unsplash.com/photo-1536739120124-af891f029e99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                    alt="icon imag"
                  />
                </div>
                <div class="table-main__grid-card-top-right">
                  <h5>BTC</h5>
                  <p>Bitcoin</p>
                </div>
              </div>
            </td>
            <td>
              <div class="table-percentage">24 %</div>
            </td>
            <td>
              <div class="table-price">$ 23</div>
            </td>
            <td>
              <div class="total__valume">Total Valume: 123.13,33,2,2</div>
            </td>
            <td>
              <div class="market__cap">Market Cap: 123.13,33,2,2</div>
            </td>
          </tr> */


function defaultPageGridData () {async function getData() {
                let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
                let response = await fetch(url);
                let data = await response.json();
                createGrid(data);
            }

            getData();

            let mainGrid = document.querySelector(".main__grid");

            function createGrid(dataList) {
                dataList.forEach((singleObj) => {
                    
                    let gridElement = document.createElement("div");
                    gridElement.classList.add("main__grid-card");
                    let innerHtmlCard = `<div class="main__grid-card-top">
                                                <div class="main__grid-card-top-left">
                                                <img src="${singleObj.image}" alt="icon imag" />
                                                </div>
                                                <div class="main__grid-card-top-right">
                                                <h5>${singleObj.id}</h5>
                                                <p>${singleObj.name}</p>
                                                </div>
                                            </div>
                                            <div class="main__grid-card-bottom">
                                                <div class="percentage">${singleObj.price_change_percentage_24h} %</div>
                                                <div class="price">$ ${singleObj.current_price}</div>
                                                <div class="total__valume">Total Valume: ${singleObj.total_volume}</div>
                                                <div class="market__cap">Market Cap: ${singleObj.market_cap}</div>
                                            </div>`
                    gridElement.innerHTML = innerHtmlCard;

                    // Get the elements inside the card
                    let percentageDiv = gridElement.querySelector(".percentage");
                    let priceDiv = gridElement.querySelector(".price");

                    // Apply styles based on the condition
                    if (singleObj.price_change_percentage_24h < 0) {
                        percentageDiv.style.borderColor = "#e7514a";
                        percentageDiv.style.color = "#e7514a";
                        priceDiv.style.color = "#e7514a";
                    }

                    mainGrid.appendChild(gridElement)
                })

}}
defaultPageGridData ();