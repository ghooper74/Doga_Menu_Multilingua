let DATA;
let lang = localStorage.getItem("doga-lang") || (navigator.language || "it").slice(0,2);
const supported = ["it","en","de","fr","es","pl","ru","zh","ja"];
if(!supported.includes(lang)) lang="en";
let currentTab="menu";

const t = obj => obj?.[lang] || obj?.en || obj?.it || "";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));

function itemCard(item){
  const desc = t(item.desc);
  return `<article class="card">
    <div class="card-head"><h3>${esc(t(item.name))}</h3><div class="price">${esc(item.price)}</div></div>
    ${desc ? `<p class="desc">${esc(desc)}</p>` : ""}
    ${item.allergens ? `<div class="allergen">⚠ ${esc(DATA.ui.allergens[lang] || DATA.ui.allergens.en)}: ${esc(item.allergens)}</div>` : ""}
  </article>`;
}

function renderMenu(){
  return DATA.sections.map(s=>`
    <section>
      <h2 class="section-title">${esc(t(s.title))}</h2>
      <div class="grid">${s.items.map(itemCard).join("")}</div>
    </section>`).join("");
}
function renderSalads(){
  return `<h2 class="section-title">${esc(DATA.ui.salads[lang] || DATA.ui.salads.en)}</h2>
    <div class="grid">${DATA.salads.map(itemCard).join("")}</div>`;
}
function renderSimple(kind){
  const title=DATA.ui[kind][lang] || DATA.ui[kind].en;
  const notice = kind==="wines"
    ? `<div class="notice">Carta iniziale: sono inseriti i vini con prezzo già confermato. Gli altri si aggiungono nel file <b>data/menu.json</b>.</div>`
    : `<div class="notice">I prezzi dei drink sono lasciati da completare nel file <b>data/menu.json</b>.</div>`;
  return `<h2 class="section-title">${esc(title)}</h2>${notice}<div class="list">${
    DATA[kind].map(x=>`<div class="simple-row"><strong>${esc(x.name)}</strong><span>${esc(x.price)}</span></div>`).join("")
  }</div>`;
}
function renderAllergens(){
  return `<h2 class="section-title">${esc(DATA.ui.allergens[lang] || DATA.ui.allergens.en)}</h2>
    <div class="list">${Object.entries(DATA.allergens).map(([n,v])=>`<div class="simple-row"><strong>${n}</strong><span>${esc(v)}</span></div>`).join("")}</div>`;
}
function render(){
  document.documentElement.lang=lang;
  document.getElementById("subtitle").textContent=t(DATA.meta.subtitle);
  document.getElementById("languageLabel").textContent=DATA.ui.choose_language[lang] || DATA.ui.choose_language.en;
  const tabs=["menu","salads","wines","drinks","allergens"];
  document.getElementById("tabs").innerHTML=tabs.map(id=>`<button data-tab="${id}" class="${id===currentTab?"active":""}">${esc(DATA.ui[id][lang] || DATA.ui[id].en)}</button>`).join("");
  document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{currentTab=b.dataset.tab;render();scrollTo({top:0,behavior:"smooth"})});
  const c=document.getElementById("content");
  c.innerHTML=currentTab==="menu"?renderMenu():currentTab==="salads"?renderSalads():currentTab==="allergens"?renderAllergens():renderSimple(currentTab);
  document.getElementById("footer").innerHTML=`<strong>DOGA</strong><br>Coperto / Service: ${esc(DATA.meta.service)} · Acqua / Water: ${esc(DATA.meta.water)}<br><small>I prodotti con asterisco potrebbero essere congelati e/o abbattuti.</small>`;
}
async function init(){
  const res=await fetch("data/menu.json",{cache:"no-store"});
  DATA=await res.json();
  const select=document.getElementById("languageSelect");
  select.innerHTML=supported.map(code=>`<option value="${code}" ${code===lang?"selected":""}>${esc(DATA.languages[code])}</option>`).join("");
  select.onchange=e=>{lang=e.target.value;localStorage.setItem("doga-lang",lang);render()};
  render();
}
init().catch(err=>{
  console.error(err);
  document.getElementById("content").innerHTML='<div class="notice">Errore nel caricamento del menù.</div>';
});