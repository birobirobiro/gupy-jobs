let headersList = {
  "Accept": "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)"
}

let response = await fetch("https://cors-everywhere.onrender.com/https://portal.gupy.io/_next/data/lSTZemWfxCuGRPIikwn3c/pt/job-search/term=Analista%20financeiro.json", {
  method: "GET",
  headers: headersList
});

let data = await response.text();
console.log(data);
