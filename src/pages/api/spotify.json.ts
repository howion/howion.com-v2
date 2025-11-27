import { failure, success } from '#/api/api'

export const prerender = false

async function retrieveAccessToken(): Promise<string> {
    const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN
    const clientId = import.meta.env.SPOTIFY_CLIENT_ID
    const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET

    const params = new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken
    })

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`
        },
        body: params.toString()
    })

    const data = await res.json()

    if (!data || !data.access_token) {
        throw new Error('No access token in response')
    }

    return data.access_token
}

async function retrieveTop(
    token: string,
    type: 'artists' | 'tracks',
    limit = 20,
    range: 'short_term' | 'medium_term' | 'long_term' = 'medium_term'
) {
    const res = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=${limit}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error(`Failed to retrieve top ${type}: ${res.status}`)
    }

    const data = await res.json()

    return data
}

async function retrievePlaybackState(token: string) {
    const res = await fetch('https://api.spotify.com/v1/me/player', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error(`Failed to retrieve playback state: ${res.status}`)
    }

    try {
        const data = await res.json()

        return data
    } catch (_) {
        // this probably means empty response, so return last known state
        const res2 = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (!res2.ok) {
            throw new Error(`Failed to retrieve recently played: ${res2.status}`)
        }

        const data2 = await res2.json()

        return {
            is_playing: false,
            progress_ms: 0,
            item: data2.items[0]?.track || null
        }
    }
}

export interface ApiSpotifyTrack {
    name: string
    albumArtUrl?: string
    spotifyUrl?: string
    artists: string[]
}

export interface ApiSpotifyResponse {
    playback: {
        isActive: boolean
        at: number
        total: number
        track: ApiSpotifyTrack | null
    }
    artists: string[]
    tracks: ApiSpotifyTrack[]
    genres: string[]
}

export async function GET() {
    try {
        const token = await retrieveAccessToken()

        const [playback, artists, tracks] = await Promise.all([
            retrievePlaybackState(token),
            retrieveTop(token, 'artists', 15, 'short_term'), // ~4 weeks
            retrieveTop(token, 'tracks', 8, 'short_term') // ~4 weeks
        ])

        const genresSet = new Set<string>()

        for (const artist of artists.items) {
            if (artist.genres && Array.isArray(artist.genres)) {
                for (const g of artist.genres) {
                    genresSet.add(g)
                }
            }
        }

        return success({
            playback: {
                isActive: playback.is_playing,
                at: playback.progress_ms || 0,
                total: playback.item?.duration_ms || 0,
                track: playback.item
                    ? {
                          name: playback.item.name,
                          albumArtUrl: playback.item.album.images[0]?.url || null,
                          spotifyUrl: playback.item.external_urls?.spotify || null,
                          artists: playback.item.artists.map((a: any) => a.name)
                      }
                    : null
            },
            artists: artists.items.map((a: any) => a.name),
            tracks: tracks.items.map((t: any) => ({
                name: t.name,
                albumArtUrl: t.album.images[0]?.url,
                spotifyUrl: t.external_urls.spotify,
                artists: t.artists.map((a: any) => a.name)
            })),
            genres: Array.from(genresSet)
        } satisfies ApiSpotifyResponse)
    } catch (e: unknown) {
        console.error(e)
        return failure()
    }
}

// async function retrieveRefreshToken(code: string) {
//     try {
//         const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
//         const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

//         const params = new URLSearchParams({
//             grant_type: 'authorization_code',
//             code: code,
//             redirect_uri: 'http://127.0.0.1:8888',
//         })

//         const res = await fetch('https://accounts.spotify.com/api/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
//             },
//             body: params.toString()
//         })

//         const data = await res.json();

//         return data;
//     } catch (_) {
//         return null
//     }
// }

// function buildAuthCodeLink() {
//     const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
//     const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

//     const params = new URLSearchParams({
//         response_type: 'code',
//         client_id: clientId,
//         client_secret: clientSecret,
//         redirect_uri: 'http://127.0.0.1:8888',
//         scope: 'user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-playback-position user-top-read user-read-recently-played'
//     })

//     return `https://accounts.spotify.com/authorize?${params.toString()}`
// }
