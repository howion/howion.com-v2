import type { ApiSpotifyResponse } from '#/pages/api/spotify.json'
import { useEffect, useRef, useState } from 'preact/hooks'

interface Props {
    id?: string
}

async function retrieveSpotifyData(): Promise<ApiSpotifyResponse | null> {
    try {
        const res = await fetch('/api/spotify.json')

        if (!res.ok) {
            return null
        }

        const data = await res.json()

        if (!data || !data.success) {
            return null
        }

        console.info('Fetched Spotify Data.')

        return data.data
    } catch (e: unknown) {
        console.error(e)
        return null
    }
}

function msToTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function SpotifyPlaybackBar({ at0, total }: { at0: number; total: number }) {
    const [at, setAt] = useState(at0)
    const intervalRef = useRef<number | null>(null)

    useEffect(() => {
        setAt(at0)

        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current)
        }

        intervalRef.current = window.setInterval(() => {
            setAt((prevAt) => {
                const next = prevAt + 1000

                if (next >= total) {
                    if (intervalRef.current !== null) {
                        clearInterval(intervalRef.current)
                    }
                    return total
                }

                return next
            })
        }, 1000)

        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current)
            }
        }
    }, [at0, total])

    const percentage = total > 0 ? (at / total) * 100 : 0

    if (total === 0 || at === 0 || at > total || at < 0 || at === total) {
        return null
    }

    return (
        <div class="spotify-player-bar-container">
            <div class="spotify-player-bar-times">
                <p class="home-text text-slick spotify-color">{msToTime(at)}</p>
                <p class="home-text text-slick spotify-color">{msToTime(total)}</p>
            </div>
            <div class="spotify-player-bar">
                <div
                    class="spotify-player-bar-inner"
                    style={{
                        width: `${percentage}%`
                    }}
                ></div>
            </div>
        </div>
    )
}

export function HomeSpotify({ id }: Props) {
    const [data, setData] = useState<ApiSpotifyResponse | null>(null)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    async function updateData() {
        if (!document.hasFocus()) {
            return
        }

        retrieveSpotifyData().then((d) => {
            setData(d)
        })
    }

    useEffect(() => {
        if (data === null && document.hasFocus()) {
            updateData()
            return
        }

        const at0 = data?.playback.at || 0
        const total = data?.playback.total || 0

        const nextUpdateIn = total > 0 ? Math.max(0, total - at0) : 30 * 1000
        const minmax = Math.min(nextUpdateIn, 60 * 1000)

        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(() => {
            updateData()
        }, minmax)

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [data])

    useEffect(() => {
        window.addEventListener('focus', () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current)
            }

            updateData()
        })
    }, [])

    if (!data || !data.playback.track?.albumArtUrl || data.playback.total === 0) {
        return null
    }

    return (
        <section id={id}>
            <div className="w space-section-5x center">
                <div class="v wauto wmax10 horizontal" data-parallax-speed="1.25">
                    <div class="v w5 spotify-player-container">
                        <p class="home-text text-slick spotify-color">
                            {data.playback.isActive ? 'Currently Playing' : 'Last Played'}
                        </p>

                        <div class="v w5 nowrap horizontal spotify-player">
                            <div class="v w1 spotify-player-lhs">
                                <img class="spotify-player-cover" src={data.playback.track.albumArtUrl} alt="" />
                            </div>
                            <div class="v wauto mw0 spotify-player-rhs">
                                <div class="spotify-player-rhs-top">
                                    <div class="spotify-player-rhs-top-lhs">
                                        <p class="spotify-player-title home-text text-slick">
                                            {data.playback.track.name}
                                        </p>
                                        <p class="spotify-player-artist home-text text-slick">
                                            {data.playback.track.artists.join(', ')}
                                        </p>
                                    </div>
                                    <div class="spotify-player-rhs-top-rhs">
                                        <img src="/assets/spotify.svg" alt="Spotify Emblem" width="38" height="38" />
                                    </div>
                                </div>
                                <div class="spotify-player-rhs-bot">
                                    {data.playback.isActive && (
                                        <SpotifyPlaybackBar at0={data.playback.at} total={data.playback.total} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="v wauto mw0 wmax2 spotify-dash-container">
                        <p class="home-text text-slick spotify-color text-noselect">&nbsp;</p>
                        <div class="v spotify-dash-container-inner">
                            <div class="spotify-dash"></div>
                        </div>
                    </div>

                    <div class="v w3 spotify-player-container">
                        <p class="home-text text-slick spotify-color text-noselect">&nbsp;</p>

                        <div class="v w3 nowrap horizontal spotify-player">
                            <div class="v w1 spotify-player-lhs">
                                <img
                                    class="spotify-player-cover"
                                    src="/assets/images/avatar.webp"
                                    alt="Howion's Spotify Avatar"
                                />
                            </div>
                            <div class="wauto mw0 spotify-player-rhs">
                                <div class="spotify-player-rhs-top">
                                    <div class="spotify-player-rhs-top-lhs">
                                        <p class="spotify-player-title home-text text-slick">Mert &mdash; howion</p>
                                        {data.playback.isActive && (
                                            <p class="home-text text-slick spotify-color">Online</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w space-section-x center">
                <div class="v wauto wmax10 horizontal spotify-lists" data-parallax-speed="1.25">
                    <div class="v w3 spotify-list">
                        <p class="home-text text-slick spotify-color spotify-list-title">Top Tracks This Month</p>
                        <div class="spotify-list-wrapper">
                            {data.tracks.map((track, i) => (
                                <div class="spotify-list-item" key={i}>
                                    <p class="home-text text-slick spotify-list-item-title">{track.name}</p>
                                    <p class="home-text text-slick spotify-list-item-subtitle">
                                        {track.artists.join(', ')}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div class="v w2 spotify-list spotify-list-simple">
                        <p class="home-text text-slick spotify-color spotify-list-title">Recent Top Artists</p>
                        <div class="spotify-list-wrapper">
                            {data.artists.map((name, i) => (
                                <div class="spotify-list-item" key={i}>
                                    <p class="home-text text-slick spotify-list-item-title">{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="v wauto wmax2"></div>

                    <div class="v w2 spotify-list spotify-list-simple">
                        <p class="home-text text-slick spotify-color spotify-list-title">Recent Top Genres</p>
                        <div class="spotify-list-wrapper">
                            {data.genres.map((name, i) => (
                                <div class="spotify-list-item" key={i}>
                                    <p class="home-text text-slick spotify-list-item-title">{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
