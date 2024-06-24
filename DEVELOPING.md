```sh
pnpm build
npm link
pnpm test:unit --watch
pnpm test:integration
pnpm start examples/simple --name="My Simple Component" --overwrite --includeStyle=false
pnpm start examples/web-app --name="My Web Site"
pnpm start examples/web-app --name="My Web Site" --outputDirectory=./foo/src/
pnpm start examples/web-app --name="My Web Site" -o ./bar/src/
pnpm start examples/react-component --name="My React Component" --includeStyle=false
pnpm start examples/kitchen-sink --name="My Kitchen Sink" --includeStyle=false --yeah=false --nah=true
pnpm start https://raw.githubusercontent.com/lindsayevans/scffld/develop/examples/simple.md --name="My Remote Component"
pnpm start github:lindsayevans/scffld/examples/simple --name="My Github Component"
pnpm start github:lindsayevans/scffld/examples/simple@main --name="My Github Component"
```

Create SVG screenshot - requires [asciinema](https://docs.asciinema.org/getting-started/)

```sh
npx svg-term --at=5000 --command="npx @querc/scffld@latest github:lindsayevans/scffld/examples/simple --name=\"My Awesome Component\"" --out=screenshot.svg --window --no-cursor --height=20
```
