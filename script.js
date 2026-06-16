const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQldpBifVVkhWl81ZdrtPm3D37_JfUJALNhvUZGv8WOq-yB-7DUSE3YnmbTaFxH8Noxpdn1f1wKEf3p/pub?gid=877416022&single=true&output=csv";

async function carregarCapsula() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csv = await response.text();

    let texto = csv.replace(/""/g, '"');

    const inicio = texto.lastIndexOf('{"modo"');
    const fim = texto.lastIndexOf("}");

    if (inicio === -1 || fim === -1) {
      throw new Error("JSON não encontrado");
    }

    const jsonTexto = texto.slice(inicio, fim + 1);
    const dados = JSON.parse(jsonTexto);

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
      "-";

    document.getElementById("mensagem").innerText =
      dados.secoes?.hero_banner?.tagline ||
      dados.secoes?.descricao_serie ||
      "-";

    console.log("Dados carregados:", dados);

  } catch (erro) {
    console.error("Erro:", erro);
    document.getElementById("titulo").innerText = "Erro ao carregar cápsula";
  }
}

carregarCapsula();
