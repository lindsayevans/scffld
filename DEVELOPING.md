```sh
pnpm build
npm link
pnpm start examples/simple --name="My Simple Component" --includeStyle=false
pnpm start examples/web-app --name="My Web Site"
pnpm start examples/react-component --name="My React Component" --includeStyle=false
pnpm start examples/kitchen-sink --name="My Kitchen Sink" --includeStyle=false
pnpm start https://raw.githubusercontent.com/lindsayevans/scffld/develop/examples/simple.md --name="My Remote Component"
pnpm start github:lindsayevans/scffld/examples/simple --name="My Github Component"
```
