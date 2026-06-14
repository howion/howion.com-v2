export interface FeaturedWork {
    name: string
    description?: string
    picture?: string
    link: string
}

export const HomeData = {
    // RESEARCH
    researchCurrent: [
        'Nondeterministic Type Theory',
        'Homotopy Type Theory',
        '',
        'Interaction Nets',
        'Linear Logic'
        // 'Lattice Theory',
    ],
    researchPrior: [
        'Kleene Algebra',
        'Computation Complexity Theory',
        'Prediction Markets',
        '',
        'Philosophy of Science'
    ],

    // DEVELOPMENT
    developmentEntries: {
        // 'TBA Mobile App': ['iOS', 'Swift', 'Bun', '', 'Currently in Development'],
        'Howion Inc': ["Howion's Message Protocol"],
        'Book of Mathematics': ['My Magnum Opus', '', 'Currently in Development'],
        'Book of History': ['Nondeterministic Type Theory', 'Interaction Nets', 'NEO4J', '', 'Postponed'],
        "Mahler's Hammer": ['Cryptography', '', 'Postponed']
    },

    // CONTACT
    contactAvailableFor: ['Collaboration', 'Research', 'Consulting', '', 'Just Chat \\ EN \\ TR'],
    contactMails: ['howion (at) fuck.it', 'mert.coskun (a) metu.edu.tr', 'howionwastaken (a) gmail.com'],
    contactSocials: {
        GitHub: 'https://github.com/howion/',
        LinkedIn: 'https://www.linkedin.com/in/omer-mert-coskun/',
        Behance: 'https://www.behance.net/howion',
        Dribbble: 'https://dribbble.com/howion',
        X: 'https://x.com/howionwastaken',
        Spotify: 'https://open.spotify.com/user/avxit10lkjwlmlw605mxg7nbe',
        IMDb: 'https://www.imdb.com/user/ur106540372',
        Instagram: 'https://www.instagram.com/omermertcoskun/',
        ORCID: 'https://orcid.org/0000-0002-8324-2325'
    },

    techStack: {
        Languages: [
            'Bash',
            'HTML5',
            'CSS',
            'TypeScript*',
            'JavaScript',
            'LaTeX',
            'Python',
            'PHP',
            'CSharp',
            'Visual Basic',
            'Markdown X'
        ],
        'Frontend and DevTools': [
            'PostCSS*',
            'SASS',
            'React*',
            'React Native',
            'Next',
            'Astro',
            'WebRTC',
            'Mapbox',
            'Vite',
            'PhoneGap'
        ],
        'Backend and DevOps': [
            'AWS*',
            'Docker',
            'Git',
            'Postgres',
            'Redis',
            'Elysia',
            'tRPC',
            'Serverless',
            'Wireguard',
            'FFMPEG',
            'OpenVPN',
            'Nginx',
            'Caddy',
            'Prisma',
            'Drizzle',
            'Cloudflare',
            'OpenAI',
            'Sentry',
            'Plausible',
            'Laravel',
            'Laravel Forge',
            'Hetzner Cloud'
        ],
        'Tools and Services': [
            'Figma*',
            'Linear',
            'arxiv',
            'Adobe PS6',
            'Github Copilot',
            // 'Desmos',
            'WolframAlpha',
            'Cursor'
        ],
        Opinionated: [
            'Arch Linux',
            'XFCE',
            'ZSH',
            'VSCodium',
            'Bun*',
            'Biome',
            'Mullvad',
            'LibreWolf',
            'Signal',
            'Typst'
        ]
    },

    featuredWorks: {
        Websites: [
            {
                name: 'Anatolia: 19th Century',
                link: 'https://anatolia19.metu.edu.tr/',
                picture: 'a19.webp',
                description:
                    'An undergraduate digital humanities project aiming to compile as well as digitize intricate data on the region in this century.'
            },
            {
                name: 'howion.com',
                link: 'https://github.com/howion/howion.com-v2',
                picture: 'howioncom.webp',
                description: 'This website you are currently browsing, built from scratch using Astro and Preact.'
            },
            {
                name: 'notes.howion.com',
                link: 'https://notes.howion.com/',
                description:
                    'My personal wiki and note-taking system built with Astro, Markdown files, featuring a growing collection of notes on various topics.'
            },
            {
                name: 'Speculo',
                link: 'https://speculo.howion.com/',
                picture: 'speculo.webp',
                description: 'P2P mobile to desktop device orientation mirroring.'
            }
        ],
        Lectures: [
            {
                name: 'Gödel ve Ontolojik Kanıtı',
                picture: 'godel.webp',
                link: 'https://github.com/howion/notes/blob/main/lectures/godel-ve-ontolojik-kaniti/00-index.md'
            },
            {
                name: 'Sembolik Form Olarak Perspektif',
                picture: 'perspective.webp',
                link: 'https://github.com/howion/notes/blob/main/lectures/sembolik-form-olarak-perspektif/00-index.md'
            }
        ],
        Poems: [
            {
                name: 'Salvé, salvé, salvé, Parve?',
                link: 'https://github.com/howion/notes/blob/main/poems/02-salve-salve-salve-parve.md'
            },
            {
                name: 'Bitscript',
                link: 'https://github.com/howion/notes/blob/main/poems/05-bitscript.md'
            }
        ],
        Notes: [
            {
                name: 'Group Theory',
                link: 'https://notes.howion.com/group-theory',
                description:
                    'Comprehensive notes on Group Theory, covering fundamental concepts, theorems, and applications in abstract algebra.'
            },
            {
                name: 'Groups and Geometry',
                link: 'https://notes.howion.com/groups-and-geometry',
                description:
                    'Some notes exploring the deep connections between group theory and geometry, including symmetry groups and their geometric interpretations.'
            },
            {
                name: 'Ring Theory',
                link: 'https://notes.howion.com/ring-theory'
            },
            {
                name: 'Logic and Computation',
                link: 'https://notes.howion.com/logic-and-computation'
            }
        ],
        // Drawings: [
        // ],
        Miscellaneous: [
            {
                name: 'lambert-w-function',
                link: 'https://www.npmjs.com/package/lambert-w-function',
                description:
                    'An open source TypeScript implementation of the Lambert W function for both Node.js and browser environments with ~500 downloads a week.'
            },
            {
                name: 'HUID Spec and Implementation',
                link: 'https://github.com/howionlabs/huid-spec',
                description:
                    "HUID (Howion's Unique IDentifier) is a Snowflake-style custom unique identifier specification designed for modern databases."
            },
            {
                name: 'nth-harmonic',
                link: 'https://github.com/howion/nth-harmonic',
                description:
                    'An open source TypeScript library to compute the nth harmonic number efficiently using digamma function.'
            }
        ]
    } satisfies Record<string, FeaturedWork[]> as Record<string, FeaturedWork[]>
}

export const HomeDataFeaturedWorksCategories = ['All', ...Object.keys(HomeData.featuredWorks)]

export const HomeDatFeaturedWorkPicturesPath = Object.values(HomeData.featuredWorks)
    .flat()
    .map((w) => w.picture)
    .filter((p) => p !== undefined)
