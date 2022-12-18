const fetchGupy = async () => {
  //  Produção
  const APIResponse = await fetch(`https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=financeiro&limit=300&type=vacancy_type_effective`);


  //  Local
  // const APIResponse = await fetch(`https://cors-everywhere.onrender.com/https://portal.api.gupy.io/api/v1/jobs?isRemoteWork=true&jobName=financeiro&limit=300&type=vacancy_type_effective`);

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
      <div class="cards">
          
        <div class="title">
        <div class="info-company">
        <img src="${element['careerPageLogo']}" alt="${element['careerPageName']}" >
        
        <h1 class="job-company">${element['careerPageName']}</h1>
        
        <div class="tooltip">
        <span class="tooltiptext"></span>
        </div>

        <h3 class="tooltip">${element['badges']['friendlyBadge']
        === true ? "🏆" : ''
      }
          <span class="tooltiptext">Empresa com selo Gupy</span>
        </h3>
          
        </div>
          
          <h3>${element['name']}</h3>

        </div>

        <div class="location">
          <span>${element['city']}</span>
          <span>/</span>
          <span>${element['state']}</span>
        </div>

        <span>Vaga publicada em: ${new Date(element['publishedDate']).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })}</span>

        <span>Trabalho remoto:  ${element['isRemoteWork'] === true ? 'Sim' : 'Não'}</span>

        <a href="${element['careerPageUrl']}" target"_blank">
        Ver vaga
        <i class="ph-arrow-square-out-fill"></i>
        </a>
      </div>
    `;
  });

  // Join the job cards into a single string
  const jobCardsString = jobCards.join('');

  // Insert the job cards string into the HTML
  document.getElementById('cards-container').innerHTML = jobCardsString;
}

renderGupy();
