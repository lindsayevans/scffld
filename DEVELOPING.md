```sh
pnpm build
npm link
pnpm test:unit --watch
pnpm test:integration
pnpm start examples/minimal
pnpm start examples/simple --name="My Simple Component" --overwrite --includeStyle=false
pnpm start examples/web-app --name="My Web Site"
pnpm start examples/web-app --name="My Web Site" --outputDirectory=./foo/src/
pnpm start examples/web-app --name="My Web Site" -o ./bar/src/
pnpm start reg:react-component --name="My Generator Component" --includeStyle=false
pnpm start examples/kitchen-sink --name="My Kitchen Sink" --includeStyle=false --yeah=false --nah=true
pnpm start https://raw.githubusercontent.com/scffld-dev/cli/develop/examples/simple.md --name="My Remote Component"
pnpm start github:scffld-dev/cli/examples/simple --name="My Github Component"
pnpm start github:scffld-dev/cli/examples/simple@main --name="My Github Component"
pnpm start reg:parcel-web-app --overwrite --outputDirectory=./demo-src/reg-app/
pnpm start show github:scffld-dev/cli/examples/simple
```

Generator

```sh
pnpm start generate ./demo-src/simple/
pnpm start generate ./demo-src/web-app/
scffld generate ./demo-src/simple/ > tmp.md
pnpm start tmp --outputDirectory=./generator-src/

scffld generate ./generator-demo/components/ --basePath="generator-demo/" --replaceTokens="name:My Generator Component,foo:Foo Bar" > generator-demo.md
scffld generator-demo --outputDirectory=./demo-src/ --name="scffld Rocks" --foo="yolo"
```

Create SVG screenshot - requires [asciinema](https://docs.asciinema.org/getting-started/)

```sh
npx svg-term --at=5000 --command="npx scffld github:scffld-dev/cli/examples/simple --name=\"My Awesome Component\"" --out=screenshot.svg --window --no-cursor --width=80 --height=18
```
