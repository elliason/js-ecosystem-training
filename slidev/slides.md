---
theme: seriph
background: ./images/javascript.jpg
layout: cover
---

# Javascriptový ekosystém

---
layout: image-right

image: ./images/libs-icons.png
---

# Obsah:

- Úvod do Javascriptu
- Runtimes & Engines
- Module system
- Package managers
- Jazykové nadstavby (transpilery, kompilátory)
- Build nástroje
- Nástroje pro kvalitu kódu
- Test runnery
- Další Tooly
- Knihovny a Frameworky

---

# Úvod do Javascriptu

- Javascript je jazyk, který je vytvořen v roce 1995 pro webové prohlížeče (Netscape Navigator).
- Autor je *Brendan Eich*.
- JavaScript byl původně obchodní název implementace společnosti Netscape,
- JScript je verze vlastní implementace Microsoftu.
- ECMAScript je standardizovaná verze Javascriptu. (Ecma International)

## Základní vlastnosti

- interpretovaný*
- dynamicky typovaný
- jednovláknový (single-threaded)
- multi paradigmatický (OOP i FP)

<!-- Brendan Eich:
- také spoluzakládal a řídil Mozzila foundation, 
- stojí za Brave prohlížečem 

Ecma script:
- 13 verzí, poslední je ECMAScript 2022

Ecma International:
- mezinárodní nevýdělečná organizace pro normalizaci informačních a komunikačních systémů s otevřeným členstvím. 
- Publikovala více než 400 standardů a 100 technických zpráv, z nichž více než 2/3 byly převzaty jako mezinárodní standardy nebo technické zprávy. 
- Apple, google, Meta, IBM, microsoft, Huawei...

Just in time kompilace:
- kompilace probíhá při běhu programu
- kombinace AOT (ahead of time) a interpretace
-->

---

# Engine

- Engine je program který spouští JS kód (kompiluje, interpretuje...)
  <img src="/images/js_engine.jpeg" class="m-10 h-60" />
- V8, SpiderMonkey, Chakra ...

---

# Runtime

- Runtime je kontext, kde se spouští engine
- Obsahuje vlastní API's, které engine používá
  <img src="/images/js_runtime.jpg" class="m-5 h-60" />
- Browser, Node.js, Deno.js, Bun.js ...

<!--
Runtime environment určuje jaké globální proměnné jsou dostupné a ovlivňují 
způsob jakým je program vykonáván.
-->

---
layout: image
image: './images/js-runtimes.jpeg'
---

# JS Runtimes

---

# Node.js
https://nodejs.org/en/
- JS runtime pro server
- Používá V8 engine
- napsaný v C++
- Vytvořil Ryan Dahl v roce 2009
- Node.js je open-source, multiplatformní, single-threaded
- přímí přístup k službám operačního systému (file system, network, proces)
- Moderní alternativy jsou: Deno.js, Bun.js, ...

---

# Deno.js
https://deno.land/
+ JS, TS, WA runtime pro server
+ Používá V8 engine
+ Napsaný v Rustu
+ Vytvořil Ryan Dahl v roce 2018, 2020 produkční verze
+ 10 věcí které Ryan litoval na design node.js: https://medium.com/@imior/10-things-i-regret-about-node-js-ryan-dahl-2ba71ff6b4dc

---

# Deno.js

+ Browser kompatibilní API (ES modules, web workers, fetch, ...)
+ Bezpečnost na prvním místě, script má přístup pouze ke zdrojům které jsou explicitně povolené
+ Typescript out of the box
+ Obsahuje build-in Tooling (code formatter *deno fmt*, linter *deno lint*, testovací framework *deno test*, ...)
+ Knihovna standardních, prověřených modulů (https://deno.land/std)
+ Nepodporuje npm, ale používá URL adresy pro importy
  ```js
  import { serve } from "https://deno.land/std/http/server.ts";
  ```
+ Deno moduly jsou založeny na URL adresách
+ Nepoužívá package.json, ale používá import mapy (https://deno.land/manual/linking_to_external_code/import_maps)
+ Nepodporuje commonjs, ale používá ES modules

<!--
Poměrně nekompatibilní s node.js, je potřeba přepisovat velkou část balíčků
Za 4 roky nezískal velkou popularitu,
-->

---

# Deno.js
Deno import modulů:
```js
import { add } from 'https://x.nest.land/ramda@0.27.0/source/index.js';
```
VS Node:
```js
import { add } from 'ramda';
```

### Co je zde přesně modul Ramda?
1) node.js module resolution algoritmus
2) Package manager, připravuje soubory na disku tak aby node načetl správně moduly

Deno používá URL adresy pro importy, takže moduly jsou založeny na URL adresách, které jsou immutable, což zaručuje, že modul bude vždy stejný


---
layout: image-right
image: ./images/bun-fast.png
---

# Bun.js
https://bun.sh/

+ JS, TS, WA runtime pro server
+ používá JavascriptCore engine (používá třeba Webkit/Safari) (https://github.com/WebKit/WebKit/tree/main/Source/JavaScriptCore)
+ Vytvořil Jarred Sumner v roce 2022, zatím beta verze
+ Napsán v Zig
+ Cíle:
  - výkon/rychlost
  - kompatibilita
  - hotový tooling ekosystém

---

# Bun.js
+ podporuje ESM i CJS, podporuje node.js module resolution algoritmus
+ podporuje nativně typescript
+ automatické načítání .env proměnných
+ implementuje většinu node.js i web API's (fetch, websocket, ...)
+ vlastní build-in SQLite3 klient
+ podporuje některé node.js core moduly (fs, path)

#### Bun CLI API
```bash
bun run // spustí js/ts soubor, nebo package.json script
bun install // instaluje balíčky z npm
bun wiptest // js/ts test runner podobný Jestu
```

---

# Bun.js vs Deno.js vs Node.js
- Node zůstává nejstabilnější
- Deno největší důraz na bezpečnost
- Bun nejlepší výkon + velký příslib do budoucna

---

# Module system

- Moduly umožňují rozdělení kódu na znovupoužitelné části,
- zlepšují strukturování aplikací, stavební systém pro organizaci aplikací
- Modul = jednotka softwaru
- Modulární systém = nástroje pro definování, vytváření, používání a sdílení modulů

---

# Moduly v jiných jazycích:

- PHP obdoba = composer
- .NET obdoba = nuget
- Java obdoba = jars
- Ruby obdoba = gems

---

# Moduly v Javascriptu:

<img src="/images/frustrated.jpg" class="" />

---

- Původně nebyl modulární systém součástí specifikace jazyka.
- ECMAScript 2015 (ES6) přidává ESM.
- Node.js přidává CommonJS (CJS).
- Další komunitní modulární systémy: AMD, UMD, SystemJS
- V současnosti se používá převážně ESM a CJS
- V budoucnu se bude používat pouze ESM

<!-- 
- V prohlížeči jsou moduly jednotlivé soubory importované přes script tag
- ESM se snaží smazať rozdíly mezi prohlížečem a Node.js
- ES6 definovala pouze formální specifikaci modulů, nikoliv implementaci - proto trvá naszení roky
- node používá ESM od 13.2
-->

---

# CJS - CommonJS

- CJS je modulární systém pro Node.js
- V browseru se používá přes bundlery (browserify, webpack)
- Synchronní načítání

---

```js
    // import pomocí require
    const fs = require('fs');
    
    // export pomocí module.exports
    module.exports = {
        name: 'John',
        age: 30
    }
  
    // nebo
    module.exports = () => {
        console.log('Hello world');
    }
  
    // nebo
    module.exports = "Hello world";
  
    // nebo
  exports.name = 'John';
  exports.age = 30;

  // takhle ale ne
  // importuje prázdný objekt
  exports = "Hello world";
```

<!--
- module.exports - exportuje modul, defaultně je to prázdný objekt
- exports - je reference na module.exports
- exports i module.exports jsou reference na objekt, který je exportován
- exports lze používat pouze pro přidávání nových properties do objektu (ideální pro named export)
- module.exports lze použít pro přepsání celého objektu (třeba při exportu funkce)
-->

---

# AMD - Asynchronous Module Definition

- AMD je modulární systém pro prohlížeče
- Asynchronní načítání
- Používá se přes loadery (require.js, curl.js, ...)
- V současnosti zastaralý, používá se jen v legacy aplikacích
```js
    // helper/util.js
    define(function () {
      return {
        log: function (text) {
          return console.log(text);
        }
      };
    });

    // app/main.js
    var util = require(["helper/util"]);
    util.log("Hello world!");
    
    // app.js
    requirejs(['app/main']);
```

---

# UMD - Universal Module Definition
- univerzální modulární systém, pro server i browser
- komplikovaný zápis
- modul za běhu detekuje v jakém prostředí je a podle toho se chová jinak

---

# ESM - ECMAScript Modules
- Moderní js standard (EcmaScript 2015)
- do budoucna preferovaný způsob
- Statické načítání, importy jsou popsány na vrchu souboru, mimo flow programu
```js
    // helper/util.js
    export function log(text) {
      return console.log(text);
    }
    
    export default class Something {
      constructor() {
        this.name = 'John';
      }
    }

    // app/main.js
    import Something, { log } from 'helper/util';
    log("Hello world!");
    const something = new Something();
```
<!--
- dynamický import v ES2020 (ES11)
-->

---

# ESM vs CJS
- CJS může používat `.cjs`, tím řekne Node.js, že má soubor načíst jako CJS
- ESM může používat `.mjs`, tím řekne Node.js, že má soubor načíst jako ESM
- package.json - `"type": "module"` - řekne Node.js, že má všechny soubory v adresáři načíst jako ESM
- package.json - `"type": "commonjs"` - řekne Node.js, že má všechny soubory v adresáři načíst jako CJS

<!--
- Jak se Node.js rozhodne, jaký modulární systém použít?
-->

---

## Kompatibilita
- CJS a ESM jsou částečně kompatibilní.
- ESM module může částečně importovat CJS module.
- CJS nemůže používat require(), dá se to částečně obejít pomocí import().
- Nefunguje vždy, kvůli odlišné povaze (statické ESM, synchronní CJS, asynchronní import())


### Module Resolution rozdíly
- Algoritmus pro nalezení modulu
- ESM import souboru musí pro správný resolution obsahovat příponu `.js` nebo `.mjs`
- CJS import nemusí nutně obsahovat příponu
- node option `--experimental-specifier-resolution=node` - ESM import souboru nemusí obsahovat příponu - experimentální

### Další rozdíly
- v ESM modulu nejsou dostupné globální proměnné `__dirname` a `__filename`

---

# Package managers v node.js
<img src="/images/package-managers.webp" />

<!-- package managers zároveň i script runners / (build tools/ monorepo tools) -->

---

# NPM
https://www.npmjs.com/
+ Node Package Manager
+ Standard
+ Dnes za ním stojí Microsoft (github)
```bash
npm install <package> # instalace
npm install <package>@<version> # instalace konkrétní verze
npm install <package> --global # instalace globálně
npm run <script> # spuštění scriptu
```

---

# Yarn
https://yarnpkg.com/

+ Yarn 1 - https://classic.yarnpkg.com/
+ Yarn 2 (3) - https://yarnpkg.com/

+ Yarn 1 - v roce 2016 revoluční věc, rychlost, workspaces, lockfiles, offline mode, ...
+ Yarn 2 - v roce 2020, kontroverzní volby: PnP, zero-install...

---

# Yarn
- umí více instalačních strategií
- systém pluginů
- flexibilní konfigurace
- trvá dlouho pochopit všechny možnosti

```bash
yarn add <package> # instalace
yarn add <package>@<version> # instalace konkrétní verze
yarn global add <package> # instalace globálně
yarn run <script> # spuštění scriptu
yarn <script> # spuštění scriptu
```

---

<img src="/images/black-hole.png" />

---

## Yarn 2 PnP (Plug'n'Play)
- Problémy s node_modules (duplikace, rychlost, ...)
- PnP - yarn vytvoří jeden soubor **.pnp.cjs**, mapující moduly dle jména a verze na konkrétní soubor
- upravuje node.js, aby načítal moduly dle **.pnp.cjs** (méně filesystém dotazů při resolvingu)
- standardně nejsou moduly v node_modules ale načítají se přímo z yarn cache
- standardně není možné používat modul který není v dependencies
- není plně kompatibilní, nové paradigma. Po 2 letech není široce přijato komunitou.
### Jak to rozjet:
Do package.json se přidá:
```json
{
  "installConfig": {
    "pnp": true
  }
}
```

<!-- 
- Je jedno jestli 10 projektů používá úplně stejné knihovny, klasická instalace vytvoří kompletní node_modules složku v každém z nich.
- Velké množství souborů kopírovaných při každé instalaci
- Rychlost načítání modulů v runtimu, dlouhý boot time (node musí prohledávat filesystém kde se nacházejí moduly které ma načíst)

-->

---

- Pro spouštění scriptů se používá `yarn node` místo `node`.

Namísto:
```json
  "scripts": {
      "start": "node ./server.js",
  }
```
Se použije:
```json
  "scripts": {
      "start": "yarn node ./server.js",
  }
```

---

## Yarn 2 Zero-Install
- Dependecies jsou commitnuté do repozitáře, v zip archivu.
- Není potřeba je instalovat - už tam jsou po naklonování
- Pokaždé když se přidá nová dependency, je potřeba commitnout nový zip archiv
- Výhody: rychlost instalace, offline mode, řeší to moduly stažené z registrů, bezp ...
- Nevýhody: velikost repozitáře

.gitignore:
```gitignore
!.yarn/cache
```
```bash
git add .yarn
```

---

## Upgradovat yarn ?
### Yarn 2/3 se dá využívat i bez PnP a Zero-Install
- upgrade na v.2:
  ```bash
  yarn set version berry
  ```
- In .yarnrc.yml , add:
  ```yaml
  nodeLinker: node-modules
  ```
- In .gitignore, add:
  ```gitignore
  .yarn/*
  !.yarn/patches
  !.yarn/releases
  !.yarn/plugins
  !.yarn/sdks
  !.yarn/versions
  ```

---

# Některé další výhody Yarn 2/3
- Pluginy, např. plugin který automaticky přidá @types pro instalované balíčky
- Vylepšená podpora workspaces
- yarn dlx - obdoba npx (spouští npm balíčky bez instalace)
... + další ( https://dev.to/arcanis/introducing-yarn-2-4eh1 )

---

# PNPM (Performant NPM)
https://pnpm.io/

- Vytvořil r. 2017 Zoltan Kochan
- drop-in replacement pro NPM (zpětná kompatibilita)
- Odlišná struktura node_modules (nested)
- globální store modulů, každý balíček je jen jednou v globálním store (šetří místo)
- Každý soubor v node_modules je hard link na globální store

<!-- Je otázka zda se to dá využít pro naše docker-based projekty -->

---

# Bower
- package manager pro front-end
- deprecated

---

# Srovnání package managerů
- https://blog.logrocket.com/javascript-package-managers-compared/

---

# Jazykové nadstavby
- TypeScript
- ~~CoffeeScript~~
- Babel
- SWC
- ~~Flow~~
- _Elm, ReasonML, PureScript, ClojureScript ..._

---

# TypeScript / Flow
- Jazykové nadstavby pro JavaScript, přidávají statickou typizaci
- Typescript je široce podporovaný, Flow pomalu umírá
## Typescript
- Vznikl v r. 2012, vytvořil Anders Hejlsberg (původní vývojář jazyka C#, vytvořil také Delphi a Turbo Pascal)
- Zaštítěný Microsoftem
- Vlastní kompiler
- Každý JS kód je validní TS kód. Lze adoptovat postupně.

---

# Typescript
- konfigurace TS je v souboru tsconfig.json (nebo CLI parametry)

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true
  },
  "exclude": [
    "node_modules"
  ],
  "include": [
    "src/**/*"
  ]
}
```

https://www.typescriptlang.org/docs/

---

# Typescript
- Typy se definují pomocí `interface` nebo `type`
- Typy se používají pro definici parametrů proměnných, funkcí, objektů, polí, tříd ...
- Upravuje některé JS konstrukce např. Třídy.
- Přidává další konstrukce např. Generics, Enums, ...

---

# Typescript
- Dokumentace: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
- TypeScript type challenges: https://github.com/type-challenges/type-challenges

---

# Babel
https://babeljs.io/
- Vznikl v r. 2014, vytvořil Sebastian McKenzie jako osobní projekt
- Cílem bylo převést ES6 kód do ES5 podporovaného všemi prohlížeči
- Systém pluginů, které přidávají nové funkce
- Dnes ztrácí na popularitě, protože většina prohlížečů podporuje moderní ECMAScript
- Používá se také pro převod JSX do JS
- Dá se použít pro převod TS do JS

<!--
TS = preprocesor
Babel = posptprocesor
-->

---
 
# Babel
- konfigurace v .babelrc
```bash
  npm install --save-dev @babel/core @babel/cli
```
```json
{
  "scripts": {
    "build": "babel src -d lib"
  }
}
```

---

# SWC
https://swc.rs/
- Alternativa k Babelu, napsaná v Rustu
- Zaštítěn Vercelem, součást next.js
- Cílem bylo vytvořit rychlejší kompilátor pro TS
- Podporuje také bundling, minifikaci, ...
- porovnání s Babelem: https://swc.rs/docs/migrating-from-babel
- konfigurace v `.swcrc` souboru

---

# Nástroje pro kvalitu kódu
- ESLint / TSLint
- Prettier
- Husky
- Lint-staged

---

# ESLint / TSLint
- Lintery pro kontrolu kvality kódu
- Především kontrolují syntaxi, ale i konvence
- TSlint je deprecated, od verze 6.0.0 ESLint podporuje TS
- konfigurace v souboru `.eslintrc` nebo `.eslintrc.json` nebo `.eslintrc.js`
- konfigurace v `package.json` v sekci `eslintConfig`
- konfigurace v CLI parametrech
- https://stash.mediafactory.cz/projects/MFDEV/repos/frontend-coding-standards/browse

```json
{
  "scripts": {
    "eslint:fix": "eslint . --quiet --ext .ts,.tsx,.js,.jsx,.jsm,.cjs --fix",
    "eslint:lint": "eslint . --ext .ts,.tsx,.js,.jsx,.jsm,.cjs"
  }
}
```

---

# Prettier
- Formátovací nástroj
- Do určité míry konfigurovatelný
- Konfigurace v souboru `.prettierrc` nebo `.prettierrc.js` nebo `package.json` v sekci `prettier`
- automatické formátování při uložení souboru v IDE

```json
  {
    "printWidth": 120,
    "tabWidth": 4,
    "useTabs": false,
    "semi": true,
    "singleQuote": true,
    "trailingComma": "es5",
    "bracketSpacing": true,
    "arrowParens": "always",
    "endOfLine": "lf"
  }
```

---

# Prettier
- podpora více formátů souborů
```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,cjs,mjs,css,less,scss,json,yml,yaml,md,mdx}\""
  }
}
```

---

# Husky
- Git hooks
- Před commitem, před pushem, před instalací, ...
- Spolu s lint-staged
- lint, test, formátovaní před commitem

---

# Test Runnery
- Jest
- Mocha
- Jasmine
- Ava
- Cypress
- Playwright

---

# Jest
- Test runner od Facebooku
- Primárně pro unit testy
- Podporuje snapshot testy
- Podporuje testování React komponent
- Podporuje testování TypeScript

---

# Cypress
https://www.cypress.io/
- Test runner pro end-to-end testy
- Využívá prohlížeč pro spuštění testů
- Výhody: rychlost, snadná integrace s CI, snadná integrace s Cypress Dashboard
- Dá se použít i pro obecně automatizování klikání v browseru
- Vývojářsky přívětivé API

---

# Buildery / bundlery
- Kombinování mnoha vstupních souborů do několika výstupních + jejich procesování
- Součást procesingu je minifikace, transpilace, linting, ...
- optimizace, tree shaking, code splitting ...
- platformy pro vývoj, poskytují všechny potřebné služby a integrace
- Moderní bundlery vytvářejí graf závislostí mezi soubory a vytvářejí bundle soubory, bundlují pouze ty soubory, které jsou potřeba

---

# Bundlery

- Grunt
- Gulp
- Browserify
- Webpack
- Parcel
- FuseBox
- Rollup
- Vite
- esbuild

---

<img src="/images/bundlers.webp" />

---

# Webpack
https://webpack.js.org/
- standard mezi bundlery
- velmi flexibilní
- konfigurace může být velmi komplexní
- základ mnoha dalších projektů (next.js, create-react-app, storybook, ...)
- konfigurace v souboru `webpack.config.js`

---

# Webpack

## entry pointy: 
- soubory kde webpack začíná budovat dependency graph
- webpack dále prochází importované moduly a přidává je do dependency graphu

## output: 
- výstupní složka kam webpack vytvoří bundle soubory

---

# Webpack
## loaders:
- webpack nepodporuje nativně všechny formáty souborů
- loaders převádějí soubory do formátu, který webpack podporuje
- např. `ts-loader` převádí TypeScript soubory do JavaScriptu
- `file-loader` převádí obrázky do base64
- `css-loader` převádí CSS soubory do JavaScriptu
- `style-loader` převádí CSS soubory do inline CSS

---

# Webpack
## plugins:
- rozšíření webpacku
- např. `html-webpack-plugin` vytváří HTML soubory z šablon
- `mini-css-extract-plugin` vytváří CSS soubory z JavaScriptu
- `terser-webpack-plugin` minifikuje JavaScript soubory
- `copy-webpack-plugin` kopíruje soubory do výstupní složky
- `webpack-bundle-analyzer` analyzuje bundle soubory
- `webpack-dev-server` vytváří vývojový server

---

# Webpack
## mode:
- nastavuje výchozí nastavení webpacku
- `development` - výchozí nastavení pro vývoj
- `production` - výchozí nastavení pro produkci

--- 

# Parcel
https://parceljs.org/
- velmi jednoduchý bundler
- rychlý
- postrádá pokročilé možnosti
- vhodné pro některé menší projekty

---

# Rollup
https://rollupjs.org/guide/en/
- jednoduché nastavit správné optimalizace
- nemá tolik pluginů jako webpack

---

# Vite
https://vitejs.dev/
- moderní bundler
- velmi rychlý, používá esbuild pro transpilaci + ES modules
- od Evana You, autora Vue.js
- obsahuje dev server
- rychle získává popularitu
- typescript out of the box
- HMR out of the box
- Rozdělí dependencies do 2 částí:
- závislosti které nejsou často updatované jsou v samostatném bundle souboru, který se neaktualizuje při každém buildu
- závislosti které jsou často updatované jsou poskytované on demand bez nutnosti buildu (využívá schopnost moderních browserů načítat ES modules on demand)
- Produkční build využívá Rollup pro optimalizaci








