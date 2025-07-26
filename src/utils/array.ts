export function repeat<T>(element: T, times: number): T[] {
    return Array(times).fill(element)
}
