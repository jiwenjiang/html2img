const express = require("express");
const puppeteer = require('puppeteer');

const PORT = 5000;
// const URL =
//   "http://localhost:3001/teeth-report?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlTmFtZSI6Im95QU1LNU5EZVRnSzN1OXpLYVpweDhaTjc3aE0iLCJ1c2VySWQiOiIxMzIiLCJwbGF0Zm9ybUNvZGUiOjJ9.rNYwBR-PkQ2oXDpGXPGe1sAQyjNKAi4RsWgs-DZIZPPK7p_38nSCuArmFA-Q8eJKzGKaXuYySBgPPoDBwkFugA&id=331";

const app = express();
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", "3.2.1");
  if (req.method == "OPTIONS") res.sendStatus(200);
  else next();
});

app.use(express.json({ extended: true }));

app.get("/gen-img", function (req, res) {
  // const puppeteer = require("puppeteer");
  const URL = `http://localhost:3001/teeth-report?token=${req.query.token}&id=${req.query.id}`;
  (async () => {
    let browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox']
    });
    let page = await browser.newPage();
    await page.goto(URL);
    await page.waitForSelector("#renderRef")
    const res2 = await page.screenshot({
      // path: "a.png",
      fullPage: true,
      encoding: "base64"
    });
  
    browser.close();
    res.send(res2);
  })();
});

app.get("/health", function (req, res) {
  res.send("ok");
});

app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));


