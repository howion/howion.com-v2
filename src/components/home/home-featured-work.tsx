import c from 'clsx'
import { HomeData, HomeDataFeaturedWorksCategories } from '##/constants/home-data'
import { useState } from 'preact/hooks'

export function HomeFeaturedWork() {
    const [selectedCat, setSelectedCat] = useState<(typeof HomeDataFeaturedWorksCategories)[number]>('All')

    return (
        <section id="section-featuredwork" class="space-section-5x">
            <div className="w" data-parallax-speed="1">
                <div className="home-h2-slick-wrapper">
                    <h2 className="home-h2 text-slick-extra">Featured Work</h2>
                    <sup className="text-slick text-tabular">06</sup>
                </div>
            </div>
            <div data-parallax-speed="1" className="w featuredwork-radios">
                <div className="radiobutton-container">
                    {HomeDataFeaturedWorksCategories.map((cat) => (
                        <div
                            className={c('radiobutton', cat === selectedCat && 'selected')}
                            onClick={() => setSelectedCat(cat)}
                            data-cursor="pointer"
                        >
                            <span className="home-text text-slick">{cat}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w featuredwork-list space-section-3x" data-parallax-speed="1.15">
                {Object.entries(HomeData.featuredWorks).map(
                    ([cat, works]) =>
                        (selectedCat === 'All' || selectedCat === cat) &&
                        works.map((work) => (
                            <div
                                className="featuredwork-list-entry"
                                data-cursor={work.picture ? 'picture' : 'pointer'}
                                data-cursor-src={`/assets/screenshots/${work.picture}`}
                            >
                                <a
                                    className="featuredwork-list-entry-title primary-text text-slick no-focus"
                                    href={work.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title=""
                                >
                                    {work.name}
                                </a>
                            </div>
                        ))
                )}
            </div>
        </section>
    )
}
