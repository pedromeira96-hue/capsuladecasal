const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQldpBifVVkhWl81ZdrtPm3D37_JfUJALNhvUZGv8WOq-yB-7DUSE3YnmbTaFxH8Noxpdn1f1wKEf3p/pub?gid=877416022&single=true&output=csv";

async function carregarCapsula() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csv = await response.text();

    const inicioJson = csv.lastIndexOf('{"modo"');

    if (inicioJson === -1) {
      document.getElementById("titulo").innerText =
        "JSON não encontrado";
      return;
    }

    let jsonTexto = csv.substring(inicioJson);

    jsonTexto = jsonTexto
      .replace(/""/g, '"')
      .replace(/^"/, "")
      .replace(/"$/, "");

    const dados = JSON.parse(jsonTexto);

    document.getElementById("titulo").innerText =
      `${dados.metadata.nomes[0]} ❤️ ${dados.metadata.nomes[1]}`;

    document.getElementById("modo").innerText =
      dados.modo || "-";

    document.getElementById("ocasiao").innerText =
      dados.ocasiao || "-";

    document.getElementById("anos").innerText =
      dados.metadata.anos_juntos || "-";

    document.getElementById("musica").innerText =
      dados.episodios_inesqueciveis?.[0]?.titulo || "-";

    document.getElementById("mensagem").innerText =
      dados.hero_banner?.tagline || "-";

    console.log(dados);

  } catch (erro) {
    console.error(erro);

    document.getElementById("titulo").innerText =
      "Erro ao interpretar JSON";
  }
}

carregarCapsula();
