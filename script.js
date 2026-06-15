const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQldpBifVVkhWl81ZdrtPm3D37_JfUJALNhvUZGv8WOq-yB-7DUSE3YnmbTaFxH8Noxpdn1f1wKEf3p/pub?gid=877416022&single=true&output=csv";

function extrairJSONDaLinha(linha) {
  const inicio = linha.indexOf("{");
  const fim = linha.lastIndexOf("}");

  if (inicio === -1 || fim === -1) {
    throw new Error("JSON não encontrado na linha");
  }

  let texto = linha.slice(inicio, fim + 1);

  texto = texto
    .replace(/^"|"$/g, "")
    .replace(/""/g, '"');

  return JSON.parse(texto);
}

async function carregarCapsula() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csv = await response.text();

    const linhas = csv.trim().split("\n");
    const ultimaLinha = linhas[linhas.length - 1];

    const dados = extrairJSONDaLinha(ultimaLinha);

    console.log("Dados da cápsula:", dados);

    const nomes = dados.metadata?.nomes || ["Casal", "Especial"];

    document.getElementById("titulo").innerText =
      `${nomes[0]} ❤️ ${nomes[1]}`;

    document.getElementById("modo").innerText =
      dados.modo || "-";

    document.getElementById("ocasiao").innerText =
      dados.ocasiao || "-";

    document.getElementById("anos").innerText =
      dados.metadata?.anos_juntos ? `${dados.metadata.anos_juntos} anos` : "-";

    document.getElementById("musica").innerText =
      dados.secoes?.categorias?.episodios_inesqueciveis?.[0]?.titulo ||
      dados.secoes?.categorias?.episodios_inesqueciveis?.[0]?.sinopse ||
      dados.slides?.find(s => s.tipo === "musica_principal")?.musica ||
      "-";

    document.getElementById("mensagem").innerText =
      dados.secoes?.descricao_serie ||
      dados.secoes?.hero_banner?.tagline ||
      dados.slides?.[dados.slides.length - 1]?.frase ||
      "-";

  } catch (erro) {
    console.error("Erro:", erro);
    document.getElementById("titulo").innerText = "Erro ao carregar cápsula";
  }
}

carregarCapsula();
