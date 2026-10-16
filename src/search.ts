/// <reference types="@types/chrome" />
import _cash from 'cash-dom';
import type { Cash, CashStatic } from 'cash-dom';

// deno-lint-ignore no-explicit-any
const rawCash = (_cash as any).default || _cash;
const $: ((selector: string | HTMLElement | Element) => Cash) & CashStatic = rawCash;

class Price {}

class Product {
  imgSrc?: string;
  brandName?: string;
  subBrandName?: string;
  productName?: string;
  sku?: string;
  upc?: string;
  price?: Price;

  getArray(): [string, string][] {
    return Object.entries(this);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 내가 정의한 고유한 action 액션명인지 필터링합니다.
  /*
  if (message.action === 'TEST') {
    alert(message.tabId);

    const title = document.title; // 웹페이지의 실제 타이틀을 가져옴

    // 요청한 곳으로 응답 데이터를 돌려줌 (이게 곧 await의 반환값이 됨)
    sendResponse({ pageTitle: title });

    const c = $('.product-name');
    alert(c.text());
  }
    */
});

// deno-lint-ignore explicit-function-return-type
export function search() {
  /*
  const c = $('.product-detail-container');
  alert(c.children);
  return [
    '1',
    '2',
  ];
  */

  alert('ts');
  const container = document.querySelector('.product-detail-container');
  if (!container) {
    return [];
  }

  const product = new Product();

  const imageNode = container?.getElementsByClassName('.image-carousel-container')?.[0];

  const image = imageNode?.querySelector('.zoomImage img');
  product.imgSrc = image?.getAttribute('src') ?? undefined;
  // console.dir(result);

  const productNode = container?.getElementsByClassName('.product-info');
  const brandNames = container?.querySelectorAll('.pdp-brand') || [];
  product.brandName = brandNames?.[1].textContent.trim();
  product.subBrandName = brandNames?.[0].textContent.trim();
  // console.log(brandNames);s
  // console.log(brandNames?.[0].textContent.trim());
  // console.log(brandNames?.[1].textContent.trim());

  const productName = container?.querySelector('.product-name');
  product.productName = productName?.textContent.trim();
  // console.log(productName?.textContent.trim());

  const sku = container?.querySelector('.product-id');
  product.sku = sku?.textContent.trim();
  // console.log(sku);
  // console.log(sku?.textContent.trim());

  const upc = container?.querySelector('.upc-id');
  product.upc = upc?.textContent.trim();
  // console.log(upc);
  // console.log(upc?.textContent.trim());

  const headings = document.querySelectorAll('h1');
  return Array.from(headings).map((el) => el.innerText.trim() || 'No Contents');
}
