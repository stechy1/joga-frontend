# Frontendová část aplikace

## Požadavky
- NodeJS >= v10
- npm >= 6
- Angular 8

## Nastavení aplikace
1. Po naklonování musíš spustit příkaz `npm install`. 
Tím se vygeneruje složka `node_modules` se všemi externími knihovnami potřebnými pro běh aplikace.
2. Pro spuštění vývojového serveru doporučuji příkaz `npm run start`. 
To spustí předpřipravenou konfiguraci, 
která jednak otevře port pro naslouchání na interní síti - lze tak spustit aplikaci i na mobilu,
dále se aplikuje proxy, díky níž nebude problém s komunikací mezi dvěma servery (angular server a php server).

## Vytvoření produkční verze
1. Spustíš příkaz `npm run release`.
2. Vytvoří se složka `build`, ve které se vygeneruje produkční verze aplikace
3. Obsah složky `build` nakopíruj do **backendu** do složky `public`.
4. Otevři si webovky pomocí serveru a měl bys vidět to, co vidíš v Angular serveru.
