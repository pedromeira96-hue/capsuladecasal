const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQldpBifVVkhWl81ZdrtPm3D37_JfUJALNhvUZGv8WOq-yB-7DUSE3YnmbTaFxH8Noxpdn1f1wKEf3p/pub?gid=877416022&single=true&output=csv";

async function carregarCapsula() {
  try {
    const response = await fetch(SHEET_CSV_URL);
    const csv = await response.text();

    let texto = csv.replace(/""/g, '"');

    const inicio = texto.lastIndexOf('{"modo"');
    const fim = texto.lastIndexOf("}");
    const dados = JSON.parse(texto.slice(inicio, fim + 1));

    const nomes = dados.metadata?.nomes || ["Casal", "Especial"];
    const secoes = dados.secoes || {};
    const categorias = secoes.categorias || {};

    const episodios = [
      ...(categorias.estreia || []),
      ...(categorias.temporada_atual || []),
      ...(categorias.episodios_inesqueciveis || []),
      ...(categorias.em_breve || [])
    ];

    document.getElementById("titulo").innerText =
      secoes.hero_banner?.titulo || `${nomes[0]} ❤️ ${nomes[1]}`;

    document.getElementById("mensagem").innerText =
      secoes.hero_banner?.tagline || secoes.descricao_serie || "";

    document.getElementById("modo").innerText = dados.modo || "netflix";
    document.getElementById("ocasiao").innerText = dados.ocasiao || "";
    document.getElementById("anos").innerText =
      dados.metadata?.anos_juntos ? `${dados.metadata.anos_juntos} anos` : "";

    document.getElementById("musica").innerText =
      categorias.episodios_inesqueciveis?.[0]?.titulo || "Trilha do casal";

    const container = document.getElementById("episodios");
    container.innerHTML = "";

    episodios.forEach((ep) => {
      container.innerHTML += `
        <article class="episode-card">
          <span class="episode-badge">${ep.avaliacao || "★★★★★"}</span>
          <h3>${ep.titulo || "Episódio especial"}</h3>
          <p>${ep.sinopse || ""}</p>
          <small>${ep.duracao || "Em produção"}</small>
        </article>
      `;
    });

  } catch (erro) {
    console.error("Erro:", erro);
    document.getElementById("titulo").innerText = "Erro ao carregar cápsula";
  }
}

carregarCapsula();
