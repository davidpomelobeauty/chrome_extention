/// <reference types="@types/chrome" />
/// <reference types="vite/client" />
import _cash from 'cash-dom';
import type { Cash, CashStatic } from 'cash-dom';

if (import.meta.hot) {
  import.meta.hot.on('vite:beforeFullReload', () => {
    // 에러를 강제로 발생시켜 뒤이어 실행될 페이지 새로고침(location.reload)을 차단합니다.
    // deno-lint-ignore no-throw-literal
    throw '(skipping full reload)';
  });
}

// asdasda
// deno-lint-ignore no-explicit-any
const rawCash = (_cash as any).default || _cash;
const $: ((selector: string | HTMLElement | Element) => Cash) & CashStatic = rawCash;

class Price {}

class Product {
  imgSrc?: string;
  brandName?: string;
  subBrandName?: string;
  name?: string;
  sku?: string;
  upc?: string;
  price?: Price;
  sizes: { size: string; unit: string; available: boolean }[] | [] = [];

  consotructor(): void {}

  getArray(): [string, string][] {
    return Object.entries(this);
  }
}

// deno-lint-ignore no-explicit-any
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'TEST') {
    sendResponse({ pageTitle: document.title });
    search();
  }
});

// deno-lint-ignore explicit-function-return-type
export function search() {
  const product = new Product();

  const c = $('.product-detail-container');
  const i = c.find('.image-carousel-container');
  const p = c.find('.product-info.col-md-6');

  product.imgSrc = i.find('.zoomImage img').attr('src') || undefined;

  const bns = p.find('.pdp-brand');
  product.brandName = bns.eq(1).text().trim();
  product.subBrandName = bns.eq(0).text().trim() || undefined;

  product.name = p.find('.product-name').text().trim();
  product.sku = p.find('.product-id').text().trim();
  product.upc = p.find('.upc-id').text().trim() || undefined;

  getPrice(product, p);

  console.log(product);
}

function getPrice(product: Product, p: _cash.Cash): void {
  const mps = p.find('.mt-prices');
  const ps = p.find('.prices');
  if (mps.length > 0) {
    const f = mps.children().first();

    if (f.text().trim() === 'Volume Pricing') {
      /* Volume Pricing */
      const vp = mps.children('div').get().map((div) => $(div).find('.pg1'));
      const [s, v] = vp;
      const sDiscounted = s.length === 2 ? s.eq(0).text().trim().slice(1) : undefined;
      const sOriginal = s.length === 2 ? s.eq(1).text().trim().slice(1) : s.eq(0).text().trim().slice(1);
      const vDiscounted = v.length === 2 ? v.eq(0).text().trim().slice(1) : undefined;
      const vOriginal = v.length === 2 ? v.eq(1).text().trim().slice(1) : v.eq(0).text().trim().slice(1);
    }
  } else {
    const rg = ps.find('.range');
    const sp = ps.find('.sale-price');

    if (rg.length > 0) {
      /* Range */
      const [from, to] = rg.find('.value').get().map((n) => $(n).attr('content'));
    } else if (sp.length > 0) {
      /* Discount */
      const [discounted, original] = sp.parent().find('.value').get().map((n) => $(n).attr('content'));
      console.log(discounted);
      console.log(original);
    } else {
      /* Single */
      const price = ps.find('.value').attr('content');
      console.log(price);
    }
  }
}

function single() {
}
function variations() {
}
