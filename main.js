const jobCompany = document.getElementById('job-company');
const jobTitle = document.getElementById('job-title');
const jobCity = document.getElementById('job-city');
const jobState = document.getElementById('job-state');
const jobDate = document.getElementById('job-date');
const jobLink = document.getElementById('job-link');
const jobLogo = document.getElementById('job-logo');

const fetchGupy = async (gupy) => {
  const APIResponse = await fetch(`https://cors-everywhere.onrender.com/https://portal.gupy.io/_next/data/lSTZemWfxCuGRPIikwn3c/pt/job-search/term=Analista%20financeiro.json`);


  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
  else {
    alert('Erro ao buscar dados');
  }
}

const renderGupy = async (gupy) => {

  const data = await fetchGupy(gupy)

  jobCompany.innerHTML = data['pageProps']['dehydratedState']['queries'][52]['state']['data']['pages'][0]['data'][0]['careerPageName']

  jobTitle.innerHTML = data['pageProps']['dehydratedState']['queries'][52]['state']['data']['pages'][0]['data'][0]['name']

  jobCity.innerHTML = data['pageProps']['dehydratedState']['queries'][52]['state']['data']['pages'][0]['data'][0]['city']

  jobState.innerHTML = data['pageProps']['dehydratedState']['queries'][52]['state']['data']['pages'][0]['data'][0]['state']

  jobDate.innerHTML = data['pageProps']['dehydratedState']['queries'][52]['state']['data']['pages'][0]['data'][0]['publishedDate']

  jobLink.innerHTML = data['pageProps']['dehydratedState']['queries'][52]['state']['data']['pages'][0]['data'][0]['careerPageUrl']

  jobLogo.src = data['pageProps']['dehydratedState']['queries'][52]['state']['data']['pages'][0]['data'][0]['careerPageLogo']

}

renderGupy()