document.addEventListener('DOMContentLoaded', () => {
  fetch('blogs.json')
    .then(response => response.json())
    .then(blogs => {
      const container = document.getElementById('blogContainer');

      // Optional: sortiere nach Slug-Nummer absteigend (neueste zuerst)
      blogs.sort((a, b) => {
        const numA = parseInt(a.slug.replace(/\D/g, ''));
        const numB = parseInt(b.slug.replace(/\D/g, ''));
        return numB - numA;
      });

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
    })
    .catch(error => {
      console.error('Fehler beim Laden der Blogdaten:', error);
    });
});