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

# Node.js

- Node.js je runtime pro spouštění Javascriptu na serveru
- Vytvořil Ryan Dahl v roce 2009
- Node.js je open-source, multiplatformní, single-threaded
- přímí přístup k službám operačního systému (file system, network, proces)
- používá engine V8
- Node.js je napsaný v C++
- Moderní alternativy jsou: Deno.js, Bun.js, ...

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
- exports - reference na module.exports
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


