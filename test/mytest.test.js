const { expect } = require("chai")
const puppeteer = require('puppeteer');

describe('ui 자동화 테스트 샘플', function() {

    let browser;
    let page;

    // 최초 1번 수행
    before(async function() { 
      // runs once before the first test in this block
      console.info("before")
      browser = await puppeteer.launch({
          headless: false,
          args: ['--window-size=1920,1080'],
          slowMo: 30,   // 30ms 씩 delay

      })

      page = await browser.newPage()

      page.setDefaultTimeout(8000)  // 8 초 timeout

      await page.setViewport({
          width: 1920,
          height: 1080
      })

      await Promise.all([
          page.goto("http://www.naver.com"),
          page.waitForNavigation()
      ])

    });

    // 모든 test case 수행완료 후 수행
    after(async function() {
      // runs once after the last test in this block
      console.info("after")

      // 마지막 화면 확인하기 위해 3초 대기 
      await page.waitForTimeout(3000)
      await page.close()
      await browser.close()
    });


    // 각각의 test case 수행전에 실행
    beforeEach(function() {
      // runs before each test in this block
      console.info("beforeEach")
    });

    // 각각의 test case 수행후에 실행
    afterEach(function() {
      // runs after each test in this block
      console.info("afterEach")
    });

    // test case 
    it('쇼핑 클릭하기 테스트', async function() {
      let target = "//span[text()='쇼핑']/ancestor::a"
      // await page.waitForTimeout(3000)
      await page.waitForXPath(target)
      let s = await page.$x(target)
      s = s[0]

      await Promise.all([
          await s.click(),
          page.waitForNavigation()
      ])

    });

    // test case 
    it('카테고리 값 테스트', async function() {
      let target = "//ul[@id='categoryListPage1']/li/button"
      await page.waitForXPath(target)
      s = await page.$x(target)


      for ( item of s ) {
          const value = await item.evaluate(el => el.textContent);
          console.info('value: ', value.trim())

          
      }
      expect(s.length).to.lessThan(20)
      expect(s.length).to.greaterThan(10)


    });


    // test case
    it('검색어 입력 테스트', async function() {
      let target = "//input[@title='검색어 입력']"
      await page.waitForXPath(target)
      s = await page.$x(target)
      s = s[0]
      await s.type('핫한 아이템 찾아줘')


    });


  });