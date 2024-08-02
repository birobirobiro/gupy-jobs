const api = `https://corsproxy.io/?https://portal.api.gupy.io/api/v1/jobs?`;
const limit = 10;
let totalJobs = 0;
let currentPage = 1;

let selectedArea = 'front-end';

const vacancyTypeMap = {
  "vacancy_type_effective": "Efetivo",
  "vacancy_type_apprentice": "Aprendiz",
  "vacancy_type_internship": "Estágio",
  "vacancy_legal_entity": "Pessoa Jurídica",
  "vacancy_type_trainee": "Trainee",
  "vacancy_type_temporary": "Temporário",
  "vacancy_type_freelancer": "Freelancer",
  "vacancy_type_outsource": "Terceirizado",
  "vacancy_type_talent_pool": "Banco de Talentos",
  "vacancy_type_volunteer": "Voluntário",
  "vacancy_type_associate": "Associado",
  "vacancy_type_summer": "Summer Job"
};

const fetchGupy = async (page = 1) => {
  const offset = (page - 1) * limit;
  document.getElementById("loading").style.display = "flex";

  const queryParams = new URLSearchParams({
    limit,
    offset,
    jobName: selectedArea,
  }).toString();

  const apiUrl = `${api}${queryParams}`;

  console.log("API Request URL:", apiUrl);

  try {
    const APIResponse = await fetch(apiUrl);
    document.getElementById("loading").style.display = "none";

    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      totalJobs = data.pagination.total;
      return data;
    } else {
      console.error("API response status:", APIResponse.status);
      alert("Erro ao buscar dados. Verifique o console para mais detalhes.");
    }
  } catch (error) {
    document.getElementById("loading").style.display = "none";
    console.error("Fetch error:", error);
    alert("Erro ao buscar dados. Verifique o console para mais detalhes.");
  }
};

const renderGupy = async (page = 1) => {
  currentPage = page;
  const response = await fetchGupy(page);
  if (response && response.data) {
    const jobsData = response.data;

    // Create an array of job cards
    const jobCards = jobsData.map((element) => {
      return `
        <a href="${element.careerPageUrl}" target="_blank" class="block border border-gray-700 rounded-lg p-6 bg-gray-800 transform transition-transform hover:translate-y-1">
          <div class="flex items-center gap-3 mb-4">
            <img src="${element.careerPageLogo}" alt="${element.careerPageName}" class="w-10 h-10 rounded-md">
            <h1 class="text-xl text-white">${element.careerPageName}</h1>
          </div>
          <h3 class="text-lg text-white mb-2">${element.name}</h3>
          <div class="flex gap-2 text-sm text-gray-400 mb-4">
            <span>${element.city}</span>
            <span>/</span>
            <span>${element.state}</span>
          </div>
          <span class="text-sm text-gray-400 mb-4 block">Vaga publicada em: ${new Date(element.publishedDate).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}</span>
          <div class="flex items-center gap-2 text-sm mb-2">
            <span class="flex items-center gap-1">Trabalho remoto: ${element.isRemoteWork ? `<i class="ph-house text-green-400"></i> Sim` : `<i class="ph-buildings text-red-400"></i> Não`}</span>
          </div>
          <div class="flex items-center gap-2 text-sm mb-2">
            <span class="flex items-center gap-1">Tem Selo Gupy: ${element.badges?.friendlyBadge ? `<i class="ph-circle-wavy-check text-yellow-400"></i> Sim` : `<i class="ph-circle-wavy-warning text-yellow-400"></i> Não`}</span>
          </div>
          <div class="flex items-center gap-2 text-sm mb-2">
            <span class="flex items-center gap-1">Vagas para PcD: ${element.isPWD ? `<i class="ph-wheelchair text-green-400"></i> Sim` : `<i class="ph-wheelchair text-red-400"></i> Não`}</span>
          </div>
          <div class="flex items-center gap-2 text-sm mb-2">
            <span class="flex items-center gap-1">Tipo de vaga: ${vacancyTypeMap[element.type]}</span>
          </div>
        </a>
      `;
    });

    // Join the job cards into a single string
    const jobCardsString = jobCards.join("");

    // Insert the job cards string into the HTML
    document.getElementById("cards-container").innerHTML = jobCardsString;

    // Update button visibility
    document.getElementById("prev-button").disabled = currentPage === 1;
    document.getElementById("next-button").disabled = currentPage * limit >= totalJobs;
  } else {
    document.getElementById("cards-container").innerHTML = "<p>Nenhuma vaga encontrada.</p>";
  }
};

document.getElementById("prev-button").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderGupy(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.getElementById("next-button").addEventListener("click", () => {
  if (currentPage * limit < totalJobs) {
    currentPage++;
    renderGupy(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

document.getElementById("search-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    selectedArea = event.target.value;
    currentPage = 1;
    renderGupy(currentPage);
  }
});

document.getElementById("search-button").addEventListener("click", () => {
  selectedArea = document.getElementById("search-input").value;
  currentPage = 1;
  renderGupy(currentPage);
});

// Initial render
renderGupy(currentPage);
