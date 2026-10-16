class Price {
}

class Product {
  imgSrc?: string;
  brandName?: string;
  subBrandName?: string;
  productName?: string;
  sku?: string;
  upc?: string;
  price?: Price;
}

export function extract(htmlText: string | null): void {
  const product = new Product();

  if (!htmlText) {
    return;
  }

  const container = document.querySelector('.product-detail-container');
  if (!container) {
    return;
  }

  const image = container?.querySelector('.zoomImage img');
  product.imgSrc = image?.getAttribute('src') ?? undefined;
  // console.dir(result);

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

  const mtPrices = container?.querySelector('.mt-prices');
  const prices = container?.querySelector('.prices');

  if (mtPrices) {
    // Volume Pricing (2 ~ 4개)
    // <div> 2개 → .pg1 1 ~ 2개
    const divs = console.log(mtPrices);
  } else {
    const range = prices?.querySelector('.range');
    const salePrice = prices?.querySelector('.sale-price');

    if (range) {
      // Range
      // .price → .range → .value 2개 중 뒤에꺼 (content 속성)
      // .price → .range → .value 2개 (content 속성)
      console.log(prices?.querySelector('.range'));
    } else if (salePrice) {
      // Discount
      // .price → .value (content 속성)
      // .value.sale-price (content 속성)
      const salePrice = prices?.querySelector('.sale-price')?.textContent.trim()?.slice(1);
      /*
      const price = prices?.querySelector('del .value')?.childNodes.filter((node) => node.nodeType === 3).map((node) =>
        node.text
      ).join('').trim()?.slice(
        1,
      );
      */
      console.log(salePrice);
      // console.log(price);
    } else {
      // Single
      // .price → .value (content 속성)
      const price = prices?.querySelector('.value')?.textContent.trim()?.slice(1);
      console.log(price);
    }
  }
  // console.log(product);

  return;
  /*
  if (!targetNode) {
    return parse('<div>empty</div>');
  }
 */
}
