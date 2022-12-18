const fetchGupy = async () => {
  const APIResponse = await fetch(`https://cors-everywhere.onrender.com/https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=Analista%20financeiro&limit=100`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
  else {
    alert('Erro ao buscar dados');
  }
}

const renderGupy = async () => {
  const response = await fetchGupy();

  // Sort the jobs by published date in descending order
  const sortedJobs = response.data.sort((a, b) => {
    return new Date(b.publishedDate) - new Date(a.publishedDate);
  });

  // Create an array of job cards
  const jobCards = sortedJobs.map(element => {
    return `
    <div id="cards-container">
      <div class="cards">
        <div class="title">
          <div class="info-company">
            <img src="${element['careerPageLogo']}" alt="Logo" class="job-logo">

            <h1 class="job-company">${element['careerPageName']}</h1>
          </div>
          <h3 class="job-title">${element['name']}</h3>
        </div>

        <div class="location">
          <span class="job-city">${element['city']}</span>
          <span>/</span>
          <span class="job-state">${element['state']}</span>
        </div>

        <span class='job-date'>Data da vaga: ${new Date(element['publishedDate']).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })}</span>

        <span class='job-remote'>Trabalho remoto:  ${element['isRemoteWork'] === true ? 'Sim' : 'Não'}</span>

        <a href="${element['careerPageUrl']}" class="job-link" target"_blank">
        Ver vaga<i class="ph-arrow-square-out-fill"></i>
        </a>
      </div>
    </div>
    `;
  });

  // Join the job cards into a single string
  const jobCardsString = jobCards.join('');

  // Insert the job cards string into the HTML
  document.getElementById('cards-container').innerHTML = jobCardsString;
}

renderGupy();
