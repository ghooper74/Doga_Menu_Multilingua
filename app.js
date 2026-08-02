let DATA;

let lang = localStorage.getItem("doga-lang") || (navigator.language || "it").slice(0, 2);
const supported = ["it", "en", "de", "fr", "es", "pl", "ru", "zh", "ja"];
if (!supported.includes(lang)) lang = "en";

const params = new URLSearchParams(location.search);
let currentTab = params.get("section") || params.get("tab") || "menu";

const fallbackLabels = {
  menu: { it: "Menù", en: "Menu", de: "Speisekarte", fr: "Menu", es: "Menú", pl: "Menu", ru: "Меню", zh: "菜单", ja: "メニュー" },
  breakfast: { it: "Colazioni", en: "Breakfast", de: "Frühstück", fr: "Petit-déjeuner", es: "Desayuno", pl: "Śniadanie", ru: "Завтрак", zh: "早餐", ja: "朝食" },
  showcase: { it: "Vetrina", en: "Display case", de: "Vitrine", fr: "Vitrine", es: "Vitrina", pl: "Witryna", ru: "Витрина", zh: "展示柜", ja: "ショーケース" },
  salads: { it: "Insalate", en: "Salads", de: "Salate", fr: "Salades", es: "Ensaladas", pl: "Sałatki", ru: "Салаты", zh: "沙拉", ja: "サラダ" },
  wines: { it: "Vini", en: "Wines", de: "Weine", fr: "Vins", es: "Vinos", pl: "Wina", ru: "Вина", zh: "葡萄酒", ja: "ワイン" },
  drinks: { it: "Drink", en: "Drinks", de: "Getränke", fr: "Boissons", es: "Bebidas", pl: "Napoje", ru: "Напитки", zh: "饮品", ja: "ドリンク" },
  allergens: { it: "Allergeni", en: "Allergens", de: "Allergene", fr: "Allergènes", es: "Alérgenos", pl: "Alergeny", ru: "Аллергены", zh: "过敏原", ja: "アレルゲン" },
  ingredients: { it: "Ingredienti", en: "Ingredients", de: "Zutaten", fr: "Ingrédients", es: "Ingredientes", pl: "Składniki", ru: "Ингредиенты", zh: "配料", ja: "原材料" },
  traces: { it: "Possibili tracce", en: "Possible traces", de: "Mögliche Spuren", fr: "Traces possibles", es: "Posibles trazas", pl: "Możliwe ślady", ru: "Возможные следы", zh: "可能痕量", ja: "微量混入の可能性" },
  note: { it: "Nota", en: "Note", de: "Hinweis", fr: "Note", es: "Nota", pl: "Uwaga", ru: "Примечание", zh: "备注", ja: "注記" },
  choose_language: { it: "Lingua", en: "Language", de: "Sprache", fr: "Langue", es: "Idioma", pl: "Język", ru: "Язык", zh: "语言", ja: "言語" }
};

const t = obj => {
  if (obj == null) return "";
  if (typeof obj === "string" || typeof obj === "number") return String(obj);
  return obj?.[lang] || obj?.en || obj?.it || "";
};

const label = key =>
  DATA?.ui?.[key]?.[lang] ||
  DATA?.ui?.[key]?.en ||
  fallbackLabels[key]?.[lang] ||
  fallbackLabels[key]?.en ||
  key;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;"
}[c]));

function itemCard(item) {
  const desc = t(item.desc);
  const ingredients = t(item.ingredients || item.ing);
  const traces = t(item.traces);
  const note = t(item.note);

  return `<article class="card">
    <div class="card-head">
      <h3>${esc(t(item.name))}</h3>
      <div class="price">${esc(item.price || "")}</div>
    </div>
    ${desc ? `<p class="desc">${esc(desc)}</p>` : ""}
    ${ingredients ? `<p class="desc"><strong>${esc(label("ingredients"))}:</strong> ${esc(ingredients)}</p>` : ""}
    ${item.allergens ? `<div class="allergen">⚠ ${esc(label("allergens"))}: ${esc(item.allergens)}</div>` : ""}
    ${traces ? `<div class="allergen">⚠ ${esc(label("traces"))}: ${esc(traces)}</div>` : ""}
    ${note ? `<p class="desc"><strong>${esc(label("note"))}:</strong> ${esc(note)}</p>` : ""}
  </article>`;
}

function renderMenu() {
  return (DATA.sections || []).map(s => `
    <section>
      <h2 class="section-title">${esc(t(s.title))}</h2>
      <div class="grid">${(s.items || []).map(itemCard).join("")}</div>
    </section>`).join("");
}

function renderSalads() {
  return `<h2 class="section-title">${esc(label("salads"))}</h2>
    <div class="grid">${(DATA.salads || []).map(itemCard).join("")}</div>`;
}

function renderCollection(kind) {
  const items = DATA[kind] || [];
  const intro = DATA.ui?.[kind + "_intro"] ? t(DATA.ui[kind + "_intro"]) : "";

  return `<h2 class="section-title">${esc(label(kind))}</h2>
    ${intro ? `<div class="notice">${esc(intro)}</div>` : ""}
    ${items.length ? `<div class="grid">${items.map(itemCard).join("")}</div>` : `<div class="notice">Sezione da completare in <b>data/menu.json</b>.</div>`}`;
}

function renderSimple(kind) {
  const title = label(kind);
  const rows = DATA[kind] || [];

  const notice = kind === "wines"
    ? `<div class="notice">Carta iniziale: sono inseriti i vini con prezzo già confermato. Gli altri si aggiungono nel file <b>data/menu.json</b>.</div>`
    : kind === "drinks"
      ? `<div class="notice">I prezzi dei drink sono lasciati da completare nel file <b>data/menu.json</b>.</div>`
      : "";

  return `<h2 class="section-title">${esc(title)}</h2>${notice}<div class="list">${
    rows.map(x => `<div class="simple-row"><strong>${esc(t(x.name) || x.name || "")}</strong><span>${esc(x.price || "")}</span></div>`).join("")
  }</div>`;
}

function renderAllergens() {
  return `<h2 class="section-title">${esc(label("allergens"))}</h2>
    <div class="list">${
      Object.entries(DATA.allergens || {})
        .map(([n, v]) => `<div class="simple-row"><strong>${n}</strong><span>${esc(v)}</span></div>`)
        .join("")
    }</div>`;
}

function setTab(id) {
  currentTab = id;
  const url = new URL(location.href);

  if (id === "menu") url.searchParams.delete("section");
  else url.searchParams.set("section", id);

  history.replaceState(null, "", url);
  render();
  scrollTo({ top: 0, behavior: "smooth" });
}

function render() {
  document.documentElement.lang = lang;

  document.getElementById("subtitle").textContent = t(DATA.meta.subtitle);
  document.getElementById("languageLabel").textContent = label("choose_language");

  const tabs = ["menu", "breakfast", "showcase", "salads", "wines", "drinks", "allergens"];
  if (!tabs.includes(currentTab)) currentTab = "menu";

  document.getElementById("tabs").innerHTML = tabs
    .map(id => `<button data-tab="${id}" class="${id === currentTab ? "active" : ""}">${esc(label(id))}</button>`)
    .join("");

  document.querySelectorAll("[data-tab]").forEach(b => {
    b.onclick = () => setTab(b.dataset.tab);
  });

  const c = document.getElementById("content");

  c.innerHTML =
    currentTab === "menu" ? renderMenu() :
    currentTab === "salads" ? renderSalads() :
    currentTab === "breakfast" ? renderCollection("breakfast") :
    currentTab === "showcase" ? renderCollection("showcase") :
    currentTab === "allergens" ? renderAllergens() :
    renderSimple(currentTab);

  document.getElementById("footer").innerHTML =
    `<strong>DOGA</strong><br>Coperto / Service: ${esc(DATA.meta.service)} · Acqua / Water: ${esc(DATA.meta.water)}<br><small>I prodotti con asterisco potrebbero essere congelati e/o abbattuti.</small>`;
}

async function init() {
  const res = await fetch("data/menu.json", { cache: "no-store" });
  DATA = await res.json();

  const select = document.getElementById("languageSelect");
  select.innerHTML = supported
    .map(code => `<option value="${code}" ${code === lang ? "selected" : ""}>${esc(DATA.languages[code] || code)}</option>`)
    .join("");

  select.onchange = e => {
    lang = e.target.value;
    localStorage.setItem("doga-lang", lang);
    render();
  };

  render();
}

init().catch(err => {
  console.error(err);
  document.getElementById("content").innerHTML = '<div class="notice">Errore nel caricamento del menù.</div>';
});
