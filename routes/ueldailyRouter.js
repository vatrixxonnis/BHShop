const express = require("express");
const mongoose = require("mongoose");
const ueldailyRouter = express.Router();
const crypto = require("node:crypto");
const { uuid } = require("uuidv4");
const createError = require("http-errors");

// Retry Fetch
function wait(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function fetchRetry(url, delay = 3000, tries = 5, fetchOptions = {}) {
  function onError(err) {
    triesLeft = tries - 1;
    if (!triesLeft) {
      throw err;
    }
    return wait(delay).then(() =>
      fetchRetry(url, delay, triesLeft, fetchOptions)
    );
  }
  try {
    return await fetch(url, fetchOptions);
  } catch (err_1) {
    return onError(err_1);
  }
}

ueldailyRouter.get("/fetchAllActivitiesWithCheerio", async (req, res) => {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = req.body.url || req.query.url || "https://uel.edu.vn/tin-tuc";
  const baseURL = searchUrl.slice(0, searchUrl.lastIndexOf("/"));
  await page.goto(url, { waitUntil: "domcontentloaded" });
  let respond = [];
  do {
    let result = await page.evaluate(() => {
      // Clone the news container
      const doc = document.querySelector(".nd_news").cloneNode(true);
      doc.querySelector(".PageColumns").remove();
      doc.querySelector("#ctl08_ctl01_RadListView1_ClientState").remove();
      let isFinalPage = false;
      document
        .querySelector(
          "div.PageColumns > div#ctl08_ctl01_pnPager > a#ctl08_ctl01_lbtNext"
        )
        .hasAttribute("href")
        ? (isFinalPage = false)
        : (isFinalPage = true);
      return [doc.innerHTML, isFinalPage];
    });
    const cheerio = require("cheerio");
    const $ = cheerio.load(result[0]);
    $("div").each((i, el) => {
      let title = $(el).find("h4 > a").text();
      let time = $(el).find("h4 > span").text();
      let link = baseURL + $(el).find("h4 > a").attr("href");
      let img = baseURL + $(el).find("img").attr("src");
      let description = $(el).find("h3").text().trim();
      respond.push({
        title: title,
        time: time,
        link: link,
        img: img,
        description: description,
      });
    });
    if (result[1]) break;
    await Promise.all([
      page.waitForNavigation(), // wait for navigation to happen
      page.click("a#ctl08_ctl01_lbtNext"), // click link to cause navigation
    ]);
  } while (true);
  await browser.close();
  res.send(respond);
});

ueldailyRouter.get("/fetchAllActivities", async (req, res) => {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = req.body.url || req.query.url || "https://uel.edu.vn/tin-tuc";
  await page.goto(url, { waitUntil: "domcontentloaded" });
  let respond = [];
  do {
    let result = await page.evaluate(() => {
      // Clone the news container
      const doc = document.querySelector(".nd_news").cloneNode(true);
      doc.querySelector(".PageColumns").remove();
      doc.querySelector("#ctl08_ctl01_RadListView1_ClientState").remove();
      // Iterate through all news
      let onePage = [];
      doc.querySelectorAll(".nd_news > div").forEach((el) => {
        let title = el.querySelector("h4 > a").innerText;
        let time = el.querySelector("h4 > span").innerText.slice(1, -1);
        let description = el.querySelector("h3.h3_content").innerText.trim();
        let imageURL = el.querySelector("img").src;
        let link = el.querySelector("h4 > a").href;
        onePage.push({
          title: title,
          time: time,
          description: description,
          imageURL: imageURL,
          link: link,
        });
      });
      // Check if this is the final page
      let isFinalPage = false;
      document
        .querySelector(
          "div.PageColumns > div#ctl08_ctl01_pnPager > a#ctl08_ctl01_lbtNext"
        )
        .hasAttribute("href")
        ? (isFinalPage = false)
        : (isFinalPage = true);
      return [onePage, isFinalPage];
    });
    respond = respond.concat(result[0]);
    if (result[1]) break;
    await Promise.all([
      page.waitForNavigation(), // wait for navigation to happen
      page.click("a#ctl08_ctl01_lbtNext"), // click link to cause navigation
    ]);
  } while (true);
  // Close the browser
  await browser.close();
  res.send(respond);
});

ueldailyRouter.get("/cheerio", async (req, res, next) => {
  const cheerio = require("cheerio");
  const searchUrl =
    req.body.url || req.query.url || "https://uel.edu.vn/tin-tuc";
  const newsItemHolder = [];
  const baseURL = searchUrl.slice(0, searchUrl.lastIndexOf("/"));
  const response = await fetchRetry(searchUrl, 1000, 2).catch((error) => {
    console.log(
      "There has been a problem with your fetch operation: " + error.message
    );
  });
  const htmlString = await response.text(); // get response text
  const $ = cheerio.load(htmlString); // parse HTML string
  $(".PageColumns").remove();
  $("#ctl08_ctl01_RadListView1_ClientState").remove();
  $("#ctl08_ctl01_RadListView1").remove();
  $(".nd_news > div").each(function (i, div) {
    let title = $("h4 > a", div).text();
    // let time = $("h4 > span", div).text().slice(1, -1).replace(/\//g, "-");
    let time = $("h4 > span", div).text().slice(1, -1).split("/").reverse().join("-");
    let description = $("h3.h3_content", div).text().trim();
    let imageURL = baseURL + $("img", div).attr("src");
    let link = baseURL + $("h4 > a", div).attr("href");
    newsItemHolder.push({
      title: title,
      time: time,
      description: description,
      imageURL: imageURL,
      link: link,
    });
  });
  return res.send(newsItemHolder);
});

const uelMainNews = require("../data/uelMainNews.json");

const isStalled = () => {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.join(__dirname, "../data/uelMainNews.json");
  const { mtime } = fs.statSync(filePath);
  const lastModified = new Date(mtime).getTime();
  const now = new Date().getTime();
  const diff = now - lastModified;
  if (diff > 86400000) return false;
  return true;
};

const updateLatest = async () => {
  const puppeteer = require("puppeteer");
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const url = "https://uel.edu.vn/tin-tuc";
  await page.goto(url, { waitUntil: "domcontentloaded" });
  let respond = [];
  let htmlNode = await page.evaluate(() => {
    // Clone the news container
    const doc = document.querySelector(".nd_news").cloneNode(true);
    doc.querySelector(".PageColumns").remove();
    doc.querySelector("#ctl08_ctl01_RadListView1_ClientState").remove();
    // Iterate through all news
    let onePage = [];
    doc.querySelectorAll(".nd_news > div").forEach((el) => {
      let title = el.querySelector("h4 > a").innerText;
      let time = el.querySelector("h4 > span").innerText.slice(1, -1);
      let description = el.querySelector("h3.h3_content").innerText.trim();
      let imageURL = el.querySelector("img").src;
      let link = el.querySelector("h4 > a").href;
      onePage.push({
        title: title,
        time: time,
        description: description,
        imageURL: imageURL,
        link: link,
      });
    });
    return onePage;
  });
  await browser.close();
  let index = htmlNode.findIndex((el) => {
    let [day, month, year] = el.time.split("/");
    let [day1, month1, year1] = uelMainNews[0].time.split("/");
    let date1 = new Date(+year, month - 1, day);
    let date2 = new Date(+year1, month1 - 1, day1);
    if (date1.getTime() === date2.getTime()) return true;
    return false;
  });
  while(index !== -1) {
    index--;
    if (index < 0) break;
    uelMainNews.unshift(htmlNode[index]);
  }
  const fs = require("fs");
  const path = require("path");
  fs.writeFileSync(
    path.join(__dirname, "../data/uelMainNews.json"),
    JSON.stringify(uelMainNews)
  );
  return;  
};
updateLatest();

ueldailyRouter.get("/allMainNews", async (req, res, next) => {
  res.json(uelMainNews);
});

module.exports = ueldailyRouter;
