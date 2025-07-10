document.addEventListener('DOMContentLoaded', () => {
    function slugToNumber(slug) {
        return parseInt(slug.split('_')[1], 10);
    }

    const container = document.getElementById('blogContainer');
    const filterSelect = document.getElementById('filterSelect'); // Dropdown für Filter

    // Hilfsfunktion um die Blogs im DOM anzuzeigen
    function renderBlogs(blogs) {
        container.innerHTML = ''; // Clear vorherige Inhalte
        blogs.forEach(blog => {
            const card = document.createElement('div');
            card.className = 'col-md-6 col-lg-4';

            card.innerHTML = `
                <div class="card h-100 shadow-sm border-0">
                <img src="${blog.thumbnail}" class="card-img-top" alt="${blog.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${blog.title}</h5>
                    <p class="card-text text-muted">${blog.excerpt}</p>
                    <a href="https://cannabee-imkerei.github.io/blog/${blog.slug}/index.html" class="btn btn-outline-primary mt-auto">Beitrag lesen</a>
                </div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // Laden und initial rendern
    fetch('blogs.json')
        .then(response => response.json())
        .then(blogs => {
            // Filterfunktion
            function filterAndSortBlogs(filter) {
                let filteredBlogs = [...blogs];

                if (filter === 'newest') {
                    filteredBlogs.sort((a, b) => slugToNumber(b.slug) - slugToNumber(a.slug));
                } else if (filter === 'oldest') {
                    filteredBlogs.sort((a, b) => slugToNumber(a.slug) - slugToNumber(b.slug));
                } else if (filter === 'anleitung') {
                    filteredBlogs = filteredBlogs.filter(blog => blog.type === 'tutorial');
                    filteredBlogs.sort((a, b) => slugToNumber(b.slug) - slugToNumber(a.slug));
                }

                return filteredBlogs;
            }

            // Eventlistener für Dropdown
            filterSelect.addEventListener('change', (e) => {
                const selectedFilter = e.target.value;
                const filteredBlogs = filterAndSortBlogs(selectedFilter);
                renderBlogs(filteredBlogs);
            });

            // Initial laden mit Default "neueste zuerst"
            renderBlogs(filterAndSortBlogs('newest'));
        })
        .catch(error => {
            console.error('Fehler beim Laden der Blogdaten:', error);
            container.innerHTML = '<p class="text-danger">Fehler beim Laden der Blogdaten.</p>';
        });
});