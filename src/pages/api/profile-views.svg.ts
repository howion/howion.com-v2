import { failure } from '#/api/api'
import { redis } from '#/api/redis'

async function readAndIncrementViews(): Promise<number> {
    try {
        const views = await redis.incr('profile_views')
        return views
    } catch (e: unknown) {
        console.error(e)
        return 0
    }
}

function numberWithCommas(n: number) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const SVG = (views: string) => `
<svg xmlns="http://www.w3.org/2000/svg" width="120.7" height="20">
    <linearGradient id="b" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient>
    <mask id="a"><rect width="120.7" height="20" rx="3" fill="#fff"/></mask>
    <g mask="url(#a)"><rect width="79.2" height="20" fill="#555"/><rect x="79.2" width="41.5" height="20" fill="#007ec6"/><rect width="120.7" height="20" fill="url(#b)"/></g>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11"><text x="40.6" y="15" fill="#010101" fill-opacity=".3">Profile views</text><text x="40.6" y="14">Profile views</text><text x="99" y="15" fill="#010101" fill-opacity=".3">${views}</text><text x="99" y="14">${views}</text></g>
</svg>
`

export async function GET() {
    try {
        const svg = SVG(numberWithCommas(await readAndIncrementViews()))

        return new Response(svg, {
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'no-cache, no-store, must-revalidate'
            }
        })
    } catch (e: unknown) {
        console.error(e)
        return failure()
    }
}
