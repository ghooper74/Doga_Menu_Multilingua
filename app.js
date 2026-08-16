let DATA;

let lang = localStorage.getItem("doga-lang") || (navigator.language || "it").slice(0, 2);
const supported = ["it", "en", "de", "fr", "es", "pl", "ru", "zh", "ja"];

const languageFlags = {
  it: "🇮🇹",
  en: "🇬🇧",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  pl: "🇵🇱",
  ru: "🇷🇺",
  zh: "🇨🇳",
  ja: "🇯🇵"
};

if (!supported.includes(lang)) lang = "en";

const params = new URLSearchParams(location.search);
let currentTab = params.get("section") || params.get("tab") || "menu";
let selectedWineSection = "all";

const fallbackLabels = {
  menu: { it: "Menù", en: "Menu", de: "Speisekarte", fr: "Menu", es: "Menú", pl: "Menu", ru: "Меню", zh: "菜单", ja: "メニュー" },
  canteen: {
    it:"Mensa",
    en:"Canteen",
    de:"Kantine",
    fr:"Cantine",
    es:"Comedor",
    pl:"Stołówka",
    ru:"Столовая",
    zh:"食堂",
    ja:"食堂"
  },
  breakfast: { it: "Colazioni", en: "Breakfast", de: "Frühstück", fr: "Petit-déjeuner", es: "Desayuno", pl: "Śniadanie", ru: "Завтрак", zh: "早餐", ja: "朝食" },
  showcase: { it: "Vetrina", en: "Display case", de: "Vitrine", fr: "Vitrine", es: "Vitrina", pl: "Witryna", ru: "Витрина", zh: "展示柜", ja: "ショーケース" },
  salads: { it: "Insalate", en: "Salads", de: "Salate", fr: "Salades", es: "Ensaladas", pl: "Sałatki", ru: "Салаты", zh: "沙拉", ja: "サラダ" },
  desserts: { it: "Dolci", en: "Desserts", de: "Desserts", fr: "Desserts", es: "Postres", pl: "Desery", ru: "Десерты", zh: "甜点", ja: "デザート" },
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

  if (kind === "breakfast") {
    const buffetItems = items.filter(item => !item.extra);
    const extraItems = items.filter(item => item.extra);

    return `<h2 class="section-title">${esc(label(kind))}</h2>
      ${intro ? `<div class="notice">${esc(intro)}</div>` : ""}
      ${buffetItems.length ? `<div class="grid">${buffetItems.map(itemCard).join("")}</div>` : ""}
      ${extraItems.length ? `
        <h2 class="section-title">${esc(label("breakfast_extras"))}</h2>
        <div class="grid">${extraItems.map(itemCard).join("")}</div>
      ` : ""}`;
  }

  return `<h2 class="section-title">${esc(label(kind))}</h2>
    ${intro ? `<div class="notice">${esc(intro)}</div>` : ""}
    ${items.length ? `<div class="grid">${items.map(itemCard).join("")}</div>` : `<div class="notice">Sezione da completare in <b>data/menu.json</b>.</div>`}`;
}


function wineLabel(key) {
  const labels = {
    type: {
      it:"Tipologia", en:"Type", de:"Typ", fr:"Type", es:"Tipo",
      pl:"Rodzaj", ru:"Тип", zh:"类型", ja:"種類"
    },
    grapes: {
      it:"Uvaggio", en:"Grapes", de:"Rebsorten", fr:"Cépages",
      es:"Uvas", pl:"Szczepy", ru:"Сорта винограда", zh:"葡萄品种", ja:"ブドウ品種"
    },
    alcohol: {
      it:"Gradazione alcolica", en:"Alcohol", de:"Alkoholgehalt",
      fr:"Teneur en alcool", es:"Graduación alcohólica",
      pl:"Zawartość alkoholu", ru:"Крепость", zh:"酒精度", ja:"アルコール度数"
    },
    winemaking: {
      it:"Vinificazione e affinamento", en:"Vinification and ageing",
      de:"Vinifikation und Ausbau", fr:"Vinification et élevage",
      es:"Vinificación y crianza", pl:"Winifikacja i dojrzewanie",
      ru:"Винификация и выдержка", zh:"酿造与熟成", ja:"醸造・熟成"
    },
    temperature: {
      it:"Temperatura di servizio", en:"Serving temperature",
      de:"Serviertemperatur", fr:"Température de service",
      es:"Temperatura de servicio", pl:"Temperatura podawania",
      ru:"Температура подачи", zh:"饮用温度", ja:"提供温度"
    },
    pairings: {
      it:"Abbinamenti", en:"Pairings", de:"Speiseempfehlungen",
      fr:"Accords", es:"Maridajes", pl:"Połączenia kulinarne",
      ru:"Гастрономические сочетания", zh:"餐酒搭配", ja:"おすすめの料理"
    }
  };

  return labels[key]?.[lang] || labels[key]?.en || key;
}

function wineCard(wine) {
  if (!wine.description) {
    return `<div class="simple-row">
      <strong>${esc(t(wine.name) || wine.name || "")}</strong>
      <span>${esc(wine.price || "")}</span>
    </div>`;
  }

  const title = [
    wine.name,
    wine.producer ? `– ${wine.producer}` : "",
    wine.vintage || ""
  ].filter(Boolean).join(" ");

  return `<article class="card wine-card">
    <div class="card-head">
      <h3>🍷 ${esc(title)}</h3>
      <div class="price">${esc(wine.price || "")}</div>
    </div>

    <p class="desc"><strong>${esc(wineLabel("type"))}:</strong> ${esc(t(wine.type))}</p>
    <p class="desc"><strong>${esc(wineLabel("grapes"))}:</strong> ${esc(wine.grapes || "")}</p>
    <p class="desc"><strong>${esc(wineLabel("alcohol"))}:</strong> ${esc(wine.alcohol || "")}</p>
    <p class="desc"><strong>${esc(wineLabel("winemaking"))}:</strong> ${esc(t(wine.winemaking))}</p>
    <p class="desc"><strong>${esc(wineLabel("temperature"))}:</strong> ${esc(wine.serving_temperature || "")}</p>

    <h4>${esc(wineLabel("pairings"))}</h4>
    <p class="desc">${esc(t(wine.pairing))}</p>

    <p class="desc wine-description">${esc(t(wine.description))}</p>
  </article>`;
}

function renderWines() {
  const wines = DATA.wines || [];

  return `<h2 class="section-title">${esc(label("wines"))}</h2>
    <div class="grid">
      ${wines.map(wineCard).join("")}
    </div>`;
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


const wineSectionOrder = [
  "all",
  "sparkling_italian",
  "sparkling_french",
  "white_tuscany",
  "white_other",
  "rose",
  "red_bolgheri",
  "red_tuscany",
  "super_tuscan",
  "red_other",
  "dessert",
  "other"
];

const wineSectionLabels = {
  all: {
    it:"Tutti", en:"All", de:"Alle", fr:"Tous", es:"Todos",
    pl:"Wszystkie", ru:"Все", zh:"全部", ja:"すべて"
  },
  sparkling_italian: {
    it:"Bollicine italiane", en:"Italian sparkling wines",
    de:"Italienische Schaumweine", fr:"Bulles italiennes",
    es:"Espumosos italianos", pl:"Włoskie wina musujące",
    ru:"Итальянские игристые", zh:"意大利起泡酒", ja:"イタリアのスパークリング"
  },
  sparkling_french: {
    it:"Bollicine francesi", en:"French sparkling wines",
    de:"Französische Schaumweine", fr:"Bulles françaises",
    es:"Espumosos franceses", pl:"Francuskie wina musujące",
    ru:"Французские игристые", zh:"法国起泡酒", ja:"フランスのスパークリング"
  },
  white_tuscany: {
    it:"Bianchi toscani", en:"Tuscan white wines",
    de:"Toskanische Weißweine", fr:"Blancs toscans",
    es:"Blancos toscanos", pl:"Białe wina toskańskie",
    ru:"Белые вина Тосканы", zh:"托斯卡纳白葡萄酒", ja:"トスカーナの白"
  },
  white_other: {
    it:"Bianchi italiani ed esteri", en:"Italian and international whites",
    de:"Italienische und internationale Weißweine",
    fr:"Blancs italiens et étrangers",
    es:"Blancos italianos e internacionales",
    pl:"Białe włoskie i zagraniczne",
    ru:"Белые вина Италии и других стран",
    zh:"意大利及国际白葡萄酒", ja:"イタリア・海外の白"
  },
  rose: {
    it:"Rosati", en:"Rosé wines", de:"Roséweine", fr:"Rosés",
    es:"Rosados", pl:"Wina różowe", ru:"Розовые вина",
    zh:"桃红葡萄酒", ja:"ロゼ"
  },
  red_bolgheri: {
    it:"Rossi di Bolgheri", en:"Bolgheri reds",
    de:"Rotweine aus Bolgheri", fr:"Rouges de Bolgheri",
    es:"Tintos de Bolgheri", pl:"Czerwone z Bolgheri",
    ru:"Красные вина Болгери", zh:"博格利红葡萄酒", ja:"ボルゲリの赤"
  },
  red_tuscany: {
    it:"Rossi toscani", en:"Tuscan reds",
    de:"Toskanische Rotweine", fr:"Rouges toscans",
    es:"Tintos toscanos", pl:"Czerwone wina toskańskie",
    ru:"Красные вина Тосканы", zh:"托斯卡纳红葡萄酒", ja:"トスカーナの赤"
  },
  super_tuscan: {
    it:"Super Tuscan", en:"Super Tuscan", de:"Super Tuscan",
    fr:"Super Tuscan", es:"Super Tuscan", pl:"Super Tuscan",
    ru:"Супертосканские", zh:"超级托斯卡纳", ja:"スーパータスカン"
  },
  red_other: {
    it:"Rossi italiani ed esteri", en:"Italian and international reds",
    de:"Italienische und internationale Rotweine",
    fr:"Rouges italiens et étrangers",
    es:"Tintos italianos e internacionales",
    pl:"Czerwone włoskie i zagraniczne",
    ru:"Красные вина Италии и других стран",
    zh:"意大利及国际红葡萄酒", ja:"イタリア・海外の赤"
  },
  dessert: {
    it:"Vini dolci", en:"Dessert wines", de:"Dessertweine",
    fr:"Vins de dessert", es:"Vinos de postre",
    pl:"Wina deserowe", ru:"Десертные вина",
    zh:"甜葡萄酒", ja:"デザートワイン"
  },
  other: {
    it:"Altri vini", en:"Other wines", de:"Weitere Weine",
    fr:"Autres vins", es:"Otros vinos", pl:"Pozostałe wina",
    ru:"Другие вина", zh:"其他葡萄酒", ja:"その他"
  }
};

const wineFieldLabels = {
  type: {
    it:"Tipologia", en:"Type", de:"Typ", fr:"Type", es:"Tipo",
    pl:"Rodzaj", ru:"Тип", zh:"类型", ja:"種類"
  },
  origin: {
    it:"Provenienza", en:"Origin", de:"Herkunft", fr:"Origine",
    es:"Origen", pl:"Pochodzenie", ru:"Происхождение",
    zh:"产地", ja:"産地"
  },
  grapes: {
    it:"Uvaggio", en:"Grapes", de:"Rebsorten", fr:"Cépages",
    es:"Uvas", pl:"Szczepy", ru:"Сорта винограда",
    zh:"葡萄品种", ja:"ブドウ品種"
  },
  alcohol: {
    it:"Gradazione alcolica", en:"Alcohol", de:"Alkoholgehalt",
    fr:"Teneur en alcool", es:"Graduación alcohólica",
    pl:"Zawartość alkoholu", ru:"Крепость",
    zh:"酒精度", ja:"アルコール度数"
  },
  winemaking: {
    it:"Vinificazione e affinamento", en:"Vinification and ageing",
    de:"Vinifikation und Ausbau", fr:"Vinification et élevage",
    es:"Vinificación y crianza", pl:"Winifikacja i dojrzewanie",
    ru:"Винификация и выдержка", zh:"酿造与熟成", ja:"醸造・熟成"
  },
  temperature: {
    it:"Temperatura di servizio", en:"Serving temperature",
    de:"Serviertemperatur", fr:"Température de service",
    es:"Temperatura de servicio", pl:"Temperatura podawania",
    ru:"Температура подачи", zh:"饮用温度", ja:"提供温度"
  },
  pairing: {
    it:"Abbinamenti", en:"Pairings", de:"Speiseempfehlungen",
    fr:"Accords", es:"Maridajes", pl:"Połączenia kulinarne",
    ru:"Гастрономические сочетания", zh:"餐酒搭配", ja:"おすすめの料理"
  }
};

function wineTextLabel(collection, key) {
  return collection[key]?.[lang] ||
         collection[key]?.en ||
         collection[key]?.it ||
         key;
}

function wineCard(wine) {
  const title = [
    wine.name,
    wine.producer ? `– ${wine.producer}` : "",
    wine.vintage || ""
  ].filter(Boolean).join(" ");

  const type = t(wine.type);
  const origin = t(wine.origin);
  const grapes = t(wine.grapes);
  const alcohol = wine.alcohol || wine.alcohol_content || "";
  const winemaking = t(wine.winemaking || wine.vinification);
  const temperature =
    wine.serving_temperature ||
    wine.service ||
    wine.temperature ||
    "";
  const pairing = t(wine.pairing || wine.pairings);
  const description = t(wine.description || wine.desc);

  return `<article class="card wine-card"
    data-wine-name="${esc(String(wine.name || "").toLocaleLowerCase())}">
    <div class="card-head">
      <h3>🍷 ${esc(title)}</h3>
      <div class="price">${esc(wine.price || "")}</div>
    </div>

    ${type ? `<p class="desc"><strong>${esc(wineTextLabel(wineFieldLabels, "type"))}:</strong> ${esc(type)}</p>` : ""}
    ${origin ? `<p class="desc"><strong>${esc(wineTextLabel(wineFieldLabels, "origin"))}:</strong> ${esc(origin)}</p>` : ""}
    ${grapes ? `<p class="desc"><strong>${esc(wineTextLabel(wineFieldLabels, "grapes"))}:</strong> ${esc(grapes)}</p>` : ""}
    ${alcohol ? `<p class="desc"><strong>${esc(wineTextLabel(wineFieldLabels, "alcohol"))}:</strong> ${esc(alcohol)}</p>` : ""}
    ${winemaking ? `<p class="desc"><strong>${esc(wineTextLabel(wineFieldLabels, "winemaking"))}:</strong> ${esc(winemaking)}</p>` : ""}
    ${temperature ? `<p class="desc"><strong>${esc(wineTextLabel(wineFieldLabels, "temperature"))}:</strong> ${esc(temperature)}</p>` : ""}

    ${pairing ? `
      <h4 class="wine-subtitle">${esc(wineTextLabel(wineFieldLabels, "pairing"))}</h4>
      <p class="desc">${esc(pairing)}</p>
    ` : ""}

    ${description ? `<p class="desc wine-description">${esc(description)}</p>` : ""}
  </article>`;
}

function renderWines() {
  const wines = DATA.wines || [];

  const wineSearchPlaceholder = ({
    it: "Cerca vino...",
    en: "Search wine...",
    de: "Wein suchen...",
    fr: "Rechercher un vin...",
    es: "Buscar vino...",
    pl: "Szukaj wina...",
    ru: "Поиск вина...",
    zh: "搜索葡萄酒...",
    ja: "ワインを検索..."
  })[lang] || "Search wine...";

  const wineSearchEmpty = ({
    it: "Nessun vino trovato.",
    en: "No wine found.",
    de: "Kein Wein gefunden.",
    fr: "Aucun vin trouvé.",
    es: "No se encontró ningún vino.",
    pl: "Nie znaleziono wina.",
    ru: "Вино не найдено.",
    zh: "未找到葡萄酒。",
    ja: "ワインが見つかりません。"
  })[lang] || "No wine found.";

  const availableSections = wineSectionOrder.filter(section =>
    section === "all" ||
    wines.some(wine => (wine.wine_section || "other") === section)
  );

  if (!availableSections.includes(selectedWineSection)) {
    selectedWineSection = "all";
  }

  const visibleWines = selectedWineSection === "all"
    ? wines
    : wines.filter(wine =>
        (wine.wine_section || "other") === selectedWineSection
      );

  const buttons = availableSections.map(section => `
    <button
      type="button"
      class="wine-filter ${section === selectedWineSection ? "active" : ""}"
      data-wine-section="${section}">
      ${esc(wineTextLabel(wineSectionLabels, section))}
    </button>
  `).join("");

  const grouped = selectedWineSection === "all"
    ? availableSections
        .filter(section => section !== "all")
        .map(section => {
          const sectionWines = wines.filter(wine =>
            (wine.wine_section || "other") === section
          );

          if (!sectionWines.length) return "";

          return `<section class="wine-group">
            <h2 class="section-title">
              ${esc(wineTextLabel(wineSectionLabels, section))}
            </h2>
            <div class="grid">
              ${sectionWines.map(wineCard).join("")}
            </div>
          </section>`;
        }).join("")
    : `<h2 class="section-title">
         ${esc(wineTextLabel(wineSectionLabels, selectedWineSection))}
       </h2>
       <div class="grid">
         ${visibleWines.map(wineCard).join("")}
       </div>`;

  setTimeout(() => {
    document.querySelectorAll("[data-wine-section]").forEach(button => {
      button.onclick = () => {
        selectedWineSection = button.dataset.wineSection;
        render();
        scrollTo({ top: 0, behavior: "smooth" });
      };
    });

    const searchInput = document.getElementById("wine-search-input");

    if (searchInput) {
      const applyWineSearch = () => {
        const query = String(searchInput.value || "")
          .trim()
          .toLocaleLowerCase();

        let visibleCount = 0;

        document
          .querySelectorAll(".wine-card[data-wine-name]")
          .forEach(card => {
            const wineName = String(card.dataset.wineName || "")
              .toLocaleLowerCase();

            const matches = !query || wineName.includes(query);

            card.hidden = !matches;

            if (matches) visibleCount += 1;
          });

        document.querySelectorAll(".wine-group").forEach(group => {
          const hasVisibleWine = Array
            .from(group.querySelectorAll(".wine-card[data-wine-name]"))
            .some(card => !card.hidden);

          group.hidden = !hasVisibleWine;
        });

        const emptyNotice =
          document.getElementById("wine-search-empty");

        if (emptyNotice) {
          emptyNotice.hidden = visibleCount !== 0;
        }
      };

      searchInput.oninput = applyWineSearch;
      applyWineSearch();
    }
  }, 0);

  return `
    <h2 class="section-title">${esc(label("wines"))}</h2>

    <div style="margin: 0 0 16px 0;">
      <input
        id="wine-search-input"
        type="search"
        placeholder="${esc(wineSearchPlaceholder)}"
        aria-label="${esc(wineSearchPlaceholder)}"
        autocomplete="off"
        style="
          width:100%;
          box-sizing:border-box;
          padding:13px 15px;
          font-size:16px;
          border:1px solid #aaa;
          border-radius:10px;
          background:#fff;
          color:#111;
        "
      >
    </div>

    <div
      id="wine-search-empty"
      class="notice"
      hidden>
      ${esc(wineSearchEmpty)}
    </div>

    <div class="wine-filters">${buttons}</div>
    ${grouped}
  `;
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

  const languageButtons = document.getElementById("languageButtons");
  languageButtons.innerHTML = supported.map(code => `
    <button
      type="button"
      class="language-button ${code === lang ? "active" : ""}"
      data-language="${code}"
      title="${esc(DATA.languages[code] || code)}"
      aria-label="${esc(DATA.languages[code] || code)}"
      aria-pressed="${code === lang}">
      <span aria-hidden="true">${languageFlags[code]}</span>
      <small>${code.toUpperCase()}</small>
    </button>
  `).join("");

  languageButtons.querySelectorAll("[data-language]").forEach(button => {
    button.onclick = () => {
      lang = button.dataset.language;
      localStorage.setItem("doga-lang", lang);
      render();
    };
  });

  const tabs = ["menu", "breakfast", "canteen", "showcase", "salads", "desserts", "wines", "drinks", "allergens"];
  if (!tabs.includes(currentTab)) currentTab = "menu";

  document.getElementById("tabs").innerHTML = tabs
    .map(id => `<button data-tab="${id}" class="${id === currentTab ? "active" : ""}">${esc(label(id))}</button>`)
    .join("");

  document.querySelectorAll("[data-tab]").forEach(b => {
    b.onclick = () => {
      if (b.dataset.tab === "canteen") {
        location.href = "./mensa/";
        return;
      }
      setTab(b.dataset.tab);
    };
  });

  const c = document.getElementById("content");

  c.innerHTML =
    currentTab === "menu" ? renderMenu() :
    currentTab === "salads" ? renderSalads() :
    currentTab === "breakfast" ? renderCollection("breakfast") :
    currentTab === "showcase" ? renderCollection("showcase") :
    currentTab === "desserts" ? renderCollection("desserts") :
    currentTab === "wines" ? renderWines() :
    currentTab === "allergens" ? renderAllergens() :
    renderSimple(currentTab);

  document.getElementById("footer").innerHTML =
    `<strong>DOGA</strong><br>Coperto / Service: ${esc(DATA.meta.service)} · Acqua / Water: ${esc(DATA.meta.water)}<br><small>I prodotti con asterisco potrebbero essere congelati e/o abbattuti.</small>`;
}

async function init() {
  const res = await fetch("data/menu.json", { cache: "no-store" });
  DATA = await res.json();

  render();
}

init().catch(err => {
  console.error(err);
  document.getElementById("content").innerHTML = '<div class="notice">Errore nel caricamento del menù.</div>';
});
