# DOGA Menu Sacra

Sito statico multilingua per:

- menù ristorante;
- insalate;
- vini;
- drink;
- allergeni.

## Nome consigliato del repository

`doga-menu-sacra`

## Pubblicazione su GitHub

1. Crea un repository vuoto chiamato `doga-menu-sacra`.
2. Carica tutti i file contenuti in questa cartella, non la cartella esterna.
3. Apri **Settings → Pages**.
4. Scegli **Deploy from a branch**.
5. Branch: `main`; cartella: `/root`.
6. Il sito sarà disponibile su:
   `https://TUO-USERNAME.github.io/doga-menu-sacra/`

## Pubblicazione su Render

1. Accedi a Render.
2. **New → Static Site**.
3. Collega il repository GitHub.
4. Build command: lascia vuoto.
5. Publish directory: `.`
6. Salva.

Questo è un sito statico: non richiede un server Python/Node sempre acceso.

## Modificare piatti, prezzi, vini e drink

Apri:

`data/menu.json`

Cerca il nome del prodotto e cambia `price`, `name`, `desc` o `allergens`.

## Collegamento con Barman Sacra e Sommelier Sacra

La stessa struttura JSON può essere letta in futuro dai bot Telegram.  
Per ora il sito usa direttamente `data/menu.json`.

## Nota

Sono stati inseriti i vini di cui avevamo già un prezzo confermato.
I prezzi dei drink sono lasciati con `—` finché non vengono comunicati.