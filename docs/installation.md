# Installation

scffld can be installed locally in your NodeJS project:

```sh
npm i -D @scffld/cli
```

You can then run using `npx scffld ...`

Or use it in your `package.json` scripts:

```json
"scripts": {
    "generate:component": "scffld templates/component"
}
```

```sh
npm run generate:component -- --name="My Component"
```
