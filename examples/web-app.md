---
outputDirectory: ./demo-src/web-app/
props:
  name:
    type: string
    required: true
  includeStyle:
    type: boolean
    default: true
  includeScript:
    type: boolean
    default: true
  includeIcons:
    type: boolean
    default: true
postInstallMessage: |
  ___
  # Your web app '<!-- @scffld name -->' has been created!
  \
  To get started, run the following commands:
  ```sh
  cd <!-- @scffld-outputDirectory -->
  npm i
  npm start
  ```
---

```json { filename: 'package.json' }
{
  "name": "/* @scffld-kebab name */",
  "version": "0.0.0",
  "description": "/* @scffld name */",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel src/index.html",
    "build": "parcel build src/index.html",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    /* @scffld-if includeStyle */
    "@parcel/transformer-sass": "^2",
    /* @scffld-endif */
    "parcel": "^2"
  },
  "dependencies": {
    /* @scffld-if includeIcons */
    "bootstrap-icons": "^1"
    /* @scffld-endif */
  }
}
```

````md { filename: 'README.md' }
# <!-- @scffld name -->

```sh
npm start
open http://localhost:1234
```
````

```scss { filename: 'src/main.scss', condition: includeStyle }
body {
  color: teal;
}
```

```ts { filename: 'src/main.ts', condition: includeScript }
console.log('Hello /* @scffld name */!');
```

```base64 { filename: 'src/images/favicon.png' }
iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAO1SURBVHgB7d07ThtRGIbh34OFkCjCEpwVgISoY1YQsgJoQEMV7yCwAxcU3CQmK0hYQaBL5bCESUfpBoQsjZ1/CI5QFCX4HOMM872PZNmIi4HzMpdjMccMAAAAAAAAEhoWqdPpLN3e3r4fjUZtf3Ol0WgsWY34z9VPkuTK7zO/vzw8PMytRqIC2N7eLgf8kz9smYbcQ3h3cnJyZTURHECapq3hcPjFdAZ/rD8YDF5nWda3GkgsUFEUHdMb/NLS/Px8x2oiOADfHy6brk2rieAAfPO/YrpaW1tbtTjYDQ6gbkf7k1pYWNAOQN3d3Z32QaDLTVdf/izAXZoo3/3VZh4g5iAwM1EewL7VxJwF6vV6+erqajmR1DYt+0dHR5nVRPRrAQ8zgnv+sJwXqOupYe5/9ec++fX59PT0wmokOoDfla8P+Hz5/SmS/9JaNiH/nLaFT7Ts+3PnFmn8NZrNZu6ne/1ut1uLA74/mXoAsTygLY/gzAL47OS6v1p3YXgy5gHEEYA4AhBHAOIIQBwBiCMAcQQgjgDEEYA4AhBHAOIIQBwBiCMAcQQgjgDEEYA4AhBHAOIIQBwBiCMAcQQgjgDEEYA4AhBHAOIIQBwBiCMAcQQgjgDEEYA4AhBHAOIIQBwBiCMAcQQgjgDEEYA4AhBHAOIIQBwBiGsaKu1hce72ozUY+uV6BtNav5gAKuph4Lt+u188wwf+1/vKxzs7O7k/3Ds+Pv5oEdgFVJQP/Df7+8opLb9lHsIHi0AAFVSummJPX5h7L03TtgUigApKkmSiNZOKotiwQARQQZMuzO3HBG8tEAFUTLkqecDC3MELWRNAxTSbzZC1FwkAYQigYsYTPrNCABXjZwAEgNkhAHEEII4AxBGAOAIQRwDiCEAcAYgjAHEEII4AxBGAOAIQRwDiCEAcAYgjAHEEII4AxBGAOAIQRwDiCEDcs18hJE3T1iQfPxqNXvnNQhRF0Zr0+aom5ucPER1AeSmTm5ubjSRJVvwbf2M//1GxNX7/cDi0WWk0GmezfL46iApgd3d30we/W/478yyrxfQEB1Buan2Tmz2+eBFenuCDQN/U7hlevJizgGXDixcTQMiVLFAxzAOICw7Aj/r7hqoIHovgAPy8fyrXqkU8PxMLHouYLcCloRJ8LDILFBzAYDDoshuohDzmgtHBAWRZVg7+evkNGP6X3HfF6xZhziL0er3rtbW1c98SfPf90EJ5ibPy3vBsHra6X/3WXVxc3D04OLg2AAAAAAAA4F9+AHMcAgkS1nLvAAAAAElFTkSuQmCC
```

```svg { filename: 'src/images/favicon.svg' }
<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100.642 81.6252C100.642 76.987 101.106 73.9876 102.033 72.6271C102.961 71.2665 104.724 70.5863 107.321 70.5863C109.547 70.5863 111.217 71.1738 112.33 72.3488C113.443 73.462 114 75.2245 114 77.6364V81.6252V112.145C114 114.309 113.412 116.01 112.237 117.247C111.062 118.422 109.424 119.009 107.321 119.009H25.039H20.679C18.4527 119.009 16.7829 118.453 15.6698 117.34C14.5566 116.226 14 114.557 14 112.33C14 109.857 14.6494 108.187 15.9481 107.321C17.3086 106.393 20.3389 105.93 25.039 105.93H36.6345V22.3488H25.039C20.4626 22.3488 17.4632 21.885 16.0408 20.9573C14.6803 19.9678 14 18.2053 14 15.6698C14 13.3816 14.5566 11.7118 15.6698 10.6605C16.8448 9.54731 18.6382 8.99072 21.0501 8.99072H25.039H66.8757H71.2356C73.462 8.99072 75.1626 9.54731 76.3377 10.6605C77.5127 11.7737 78.1002 13.4434 78.1002 15.6698C78.1002 18.2053 77.389 19.9678 75.9666 20.9573C74.6061 21.885 71.5758 22.3488 66.8757 22.3488H51.2913V105.93H100.642V81.6252Z" fill="#666666"/>
</svg>
```

```html { filename: 'src/index.html' }
<!DOCTYPE html>
<html lang="en-AU">
  <head>
    <meta charset="utf-8" />
    <title><!-- @scffld name --></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#ccc" />
    <meta name="description" content="<!-- @scffld name -->" />
    <link rel="icon" type="image/svg+xml" href="./images/favicon.svg" />
    <link rel="icon" type="image/png" href="./images/favicon.png" />
    <!-- @scffld-if includeStyle -->
    <link rel="stylesheet" href="./main.scss" />
    <!-- @scffld-endif -->
  </head>
  <body>
    <header>
      <h1><!-- @scffld name --></h1>
      <!-- @scffld-if includeIcons -->
      <img
        src="npm:bootstrap-icons/icons/fire.svg"
        width="64"
        height="64"
        alt=""
      />
      <!-- @scffld-endif -->
    </header>
    <!-- @scffld-if includeScript -->
    <script src="./main.ts"></script>
    <!-- @scffld-endif -->
  </body>
</html>
```
