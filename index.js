const puppeteer = require('puppeteer');
const XLSX = require('xlsx');


async function getPageData(){
  const url = "https://www.ffbatiment.fr/annuaire-des-entreprises";
   const browser = await puppeteer.launch({ headless: false});
   const page = await browser.newPage();
   await page.goto(url, {waitUntil: "networkidle2"});
   await page.click(".banner-actions-container > button");

  //  const allElements = await page.$$('*');

  //  console.log(`Total elements on the page: ${allElements.length}`);
 
  
  const listeDep = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("#content > div > div > div > div.content > div > div > div.search-and-results.col-12.col-lg-9 > div > div.search-bloc.col-12.col-lg-9.show > div > div.form > form > div > div:nth-child(2) > div > div > div > ul.select-list")
    ,
      (element) =>
        element.textContent
    )
  );
 
console.log(listeDep)

// const entreprise = await page.evaluate(() => {

//   return Array.from(document.querySelectorAll('a.h4'))

//               .map(entreprise => entreprise.innerText);

// });

// console.log(entreprise)

// const email = await page.evaluate(() =>
//   Array.from(
//     document.querySelectorAll("#content > div > div > div > div.content > div > div > div.search-and-results.col-12.col-lg-9 > div > div.details.col-12.col-lg-12.show > div > div > div.col-12.col-lg-7 > div > div > div.adresse-details-2 > div.emails")
//   ,
//     (e) =>
//       e.textContent
//   )
// );

// console.log(email)
const scrapedData = [];

for(let listeDep of allListeDeps){
    const data = await getPageData(listeDep,page);
    // const secondTowait = (Math.floor (Math.random()* 4) + 1) * 1000
    // await page.waitFor(secondTowait);
    scrapedData.push(data);

}


  
    

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(scrapedData);
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, "links.xlsx");


    // await browser.close();
// })();

getPageData();