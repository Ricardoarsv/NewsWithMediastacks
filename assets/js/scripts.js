const categorySelect = document.getElementById('category-select');
    const newsContainer = document.getElementById('news-container');
    const defaultMessage = document.getElementById('default-message');

    categorySelect.addEventListener('change', () => {
      const category = categorySelect.value;
      fetchNews(category);
    });

    function fetchNews(category) {
      const apiKey = '3b4c911681652e90b2e403bd82f58242';
      const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&categories=${category}&languages=es`;

      defaultMessage.style.display = 'none';
      newsContainer.style.display = 'flex';

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.data && data.data.length > 0) {
            newsContainer.innerHTML = '';

            data.data.forEach(news => {
              const truncatedDescription = news.description.slice(0, 200) + '...';

              const newsCard = document.createElement('div');
              newsCard.classList.add('card', 'w-96', 'bg-base-100', 'shadow-xl', 'flex', 'flex-col', 'max-w-[320px]', 'mr-[20px]', 'md:mr-0', 'md:mb-[20px]');
              newsCard.innerHTML = `
                <div class="card-body">
                  <h2 class="card-title">${news.title}</h2><br>
                  <h2 class="card-title bg-primary rounded-lg justify-center text-center">${news.author}</h2><br>
                  <p>${truncatedDescription}</p>
                  <div class="card-actions justify-end">
                    <a href="${news.url}" class="btn btn-primary">Leer más</a>
                  </div>
                </div>
              `;
              newsContainer.appendChild(newsCard);
            });
          } else {
            newsContainer.innerHTML = '<p>No se encontraron noticias para esta categoría.</p>';
          }
        })
        .catch(error => {
          console.error('Error al obtener las noticias:', error);
          newsContainer.innerHTML = '<p>Ocurrió un error al cargar las noticias.</p>';
        });
    }