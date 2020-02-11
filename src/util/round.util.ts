export function roundUpTo5Cents(n: number): number {
    // 1 = 20 * 0.05 to round to the nearest 0.05
    return Math.ceil(n * 20) / 20;
}