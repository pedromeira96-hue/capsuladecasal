const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQldpBifVVkhWl81ZdrtPm3D37_JfUJALNhvUZGv8WOq-yB-7DUSE3YnmbTaFxH8Noxpdn1f1wKEf3p/pub?gid=877416022&single=true&output=csv";

async function carregarCapsula() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csv = await response.text();

    let texto = csv.replace(/""/g, '"');

    const inicio = texto.lastIndexOf('{"modo"');
    const fim = texto.lastIndexOf("}");

    const jsonTexto = texto.slice(inicio, fim + 1);
    const dados = JSON.parse(jsonTexto);

    const nomes = dados.metadata?.nomes || ["Pedro", "Ariana"];
    const secoes = dados.secoes || {};
    const categorias = secoes.categorias || {};

    document.getElementById("titulo").innerText =
      `${nomes[0]} ❤️ ${nomes[1]}`;

    document.getElementById("modo").innerText = dados.modo || "-";
    document.getElementById("ocasiao").innerText = dados.ocasiao || "-";
    document.getElementById("anos").innerText =
      dados.metadata?.anos_juntos ? `${dados.metadata.anos_juntos} anos` : "-";

    document.getElementById("mensagem").innerText =
      secoes.hero_banner?.tagline ||
      secoes.descricao_serie ||
      "-";

    const episodios =
      categorias.episodios_inesqueciveis ||
      categorias.estreia ||
      [];

    document.getElementById("musica").innerText =
      episodios[0]?.titulo || "-";

    const container = document.getElementById("episodios");
    container.innerHTML = "";

    episodios.forEach((episodio) => {
      container.innerHTML += `
        <div class="episode-card">
          <h3>${episodio.titulo || "Episódio especial"}</h3>
          <p>${episodio.sinopse || ""}</p>
          <small>${episodio.duracao || ""} ${episodio.avaliacao || ""}</small>
        </div>
      `;
    });

    console.log("Dados carregados:", dados);

  } catch (erro) {
    console.error("Erro:", erro);
    document.getElementById("titulo").innerText = "Erro ao carregar cápsula";
  }
}

carregarCapsula();
