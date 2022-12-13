const jobCompany = document.getElementById('job-company');
const jobTitle = document.getElementById('job-title');
const jobCity = document.getElementById('job-city');
const jobState = document.getElementById('job-state');
const jobDate = document.getElementById('job-date');
const jobLink = document.getElementById('job-link');
const jobLogo = document.getElementById('job-logo');
const jobRemote = document.getElementById('job-remote');

const fetchGupy = async (gupy) => {
  const APIResponse = await fetch(`https://cors-everywhere.onrender.com/https://portal.api.gupy.io/api/v1/jobs?jobName=Analista%20financeiro&limit=50`);

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
  else {
    alert('Erro ao buscar dados');
  }
}

const renderGupy = async (gupy) => {

  const response = await fetchGupy(gupy)

  response.data.forEach(element => {

    jobCompany.innerHTML = element['careerPageName']

    jobTitle.innerHTML = element['name']

    jobCity.innerHTML = element['city']

    jobState.innerHTML = element['state']

    jobDate.innerHTML = `Data da vaga: ` + new Date(element['publishedDate']).toLocaleDateString()

    jobLink.innerHTML = element['careerPageUrl']

    jobLogo.src = element['careerPageLogo']

    jobRemote.innerHTML = element['isRemoteWork'] === true ? 'Remoto: Sim' : 'Remoto: Não'
  });

}

renderGupy()
