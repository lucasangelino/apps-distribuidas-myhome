export function priceFormater({price}) {
  const ARPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
  return ARPrice.format(price);
}
