export const isDev = import.meta.env.DEV === true

export function isMobile(): boolean {
    return navigator.userAgentData.mobile || window.innerWidth <= 768 // || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export function onIdle(callback: () => void, timeout = 2000): void {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(callback, { timeout })
    } else {
        setTimeout(callback, timeout)
    }
}

export function forcePreloadImage(uri: string): void {
    // dont worry about memory leaks here, browser will handle it
    const img = new Image()
    img.src = uri
}
