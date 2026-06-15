const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQldpBifVVkhWl81ZdrtPm3D37_JfUJALNhvUZGv8WOq-yB-7DUSE3YnmbTaFxH8Noxpdn1f1wKEf3p/pub?gid=877416022&single=true&output=csv";

async function carregarCapsula() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csv = await response.text();

    const linhas = csv.trim().split("\n");
    const ultimaLinha = linhas[linhas.length - 1];

    console.log("Última linha:", ultimaLinha);

    document.getElementById("titulo").innerText = "CSV carregado com sucesso";

  } catch (erro) {
    console.error("Erro:", erro);

    document.getElementById("titulo").innerText =
      "Erro ao carregar dados";
  }
}

carregarCapsula();
