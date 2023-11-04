export function priceFormater({price}) {
  const ARPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 0,
  });
  return ARPrice.format(price);
}
