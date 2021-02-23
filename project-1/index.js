const { makeAPIcall } = require('./helpers');

async function getCheapestPrice() {
  const c1 = await makeAPIcall('http://demo1852771.mockable.io/ibibo');
  const c2 = await makeAPIcall('http://demo1852771.mockable.io/mmt');
  const c3 = c1.price < c2.price ? c1.price : c2.price;
  return c3;
}
