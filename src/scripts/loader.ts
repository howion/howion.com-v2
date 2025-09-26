(() => {
    const loader = document.getElementById('loader') as HTMLDivElement

    if (!loader) return

    setTimeout(() => {
        // loader.classList.add('loader--loaded')
        window.document.body.classList.add('is-loaded')
    }, 2000)
})();
