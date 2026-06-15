const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQldpBifVVkhWl81ZdrtPm3D37_JfUJALNhvUZGv8WOq-yB-7DUSE3YnmbTaFxH8Noxpdn1f1wKEf3p/pub?gid=877416022&single=true&output=csv";

async function carregarCapsula() {
try {
const response = await fetch(SHEET_CSV_URL);
const csv = await response.text();

```
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
```

} catch (erro) {
console.error(erro);

```
document.getElementById("titulo").innerText =
  "Erro ao carregar cápsula";
```

}
}

carregarCapsula();
