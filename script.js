const SHEET_CSV_URL = "COLE_AQUI_SEU_LINK_CSV";

async function carregarCapsula() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csv = await response.text();

    const linhas = csv.trim().split("\n");

    if (linhas.length < 2) {
      throw new Error("Planilha vazia");
    }

    const ultimaLinha = linhas[linhas.length - 1];

    const jsonMatch = ultimaLinha.match(/\{.*\}$/);

    if (!jsonMatch) {
      throw new Error("resultado_json não encontrado");
    }

    const dados = JSON.parse(jsonMatch[0]);

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
      dados.serie?.descricao_serie || "-";

  } catch (erro) {
    console.error(erro);

    document.getElementById("titulo").innerText =
      "Erro ao carregar cápsula";
  }
}

carregarCapsula();
