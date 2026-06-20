export function formatPrice(price: string, cents: string): string {
    return `R$ ${price},${cents}`;
}
