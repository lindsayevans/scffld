```sh
pnpm build
npm link
pnpm start examples/simple --name="My Simple Component" --includeStyle=false --yeah=false --nah=true
pnpm start examples/web-app --name="My Web Site"
pnpm start examples/web-app --name="My Web Site" --outputDirectory=./foo/src/
pnpm start examples/web-app --name="My Web Site" -o ./bar/src/
pnpm start examples/react-component --name="My React Component" --includeStyle=false
pnpm start examples/kitchen-sink --name="My Kitchen Sink" --includeStyle=false
pnpm start https://raw.githubusercontent.com/lindsayevans/scffld/develop/examples/simple.md --name="My Remote Component"
pnpm start github:lindsayevans/scffld/examples/simple --name="My Github Component"
pnpm start github:lindsayevans/scffld/examples/simple@main --name="My Github Component"
```
