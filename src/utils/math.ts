export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value))
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

export function LERP(a: number, b: number, n: number): number {
    return (1 - n) * a + n * b
}

export function smoothStep(a: number, b: number, x: number): number {
    x = clamp((x - a) / (b - a), 0, 1)
    return x * x * (3 - 2 * x)
}

export function randomId(): string {
    return Math.random().toString(36).slice(2)
}
