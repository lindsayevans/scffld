# scffld

[![NPM Version](https://img.shields.io/npm/v/%40querc%2Fscffld)](https://www.npmjs.com/package/@querc/scffld)

## What?

(possibly dumb idea for) Markdown based code scaffolding

## Why?

I wanted something that was a bit less complicated than Yeoman et al.

## How?

### Remote template

```sh
npx @querc/scffld github:lindsayevans/scffld/examples/simple --name="My Awesome Component"
```

### Local template

1. Grab one of the [example files](./examples) & save it locally
2. Run this command, replacing `examples/simple` with your example file

```sh
npx @querc/scffld examples/simple --name="My Awesome Component"
```

3. Created files will be in `demo-src`
4. Try it out with a few options different to the defaults:

```sh
npx @querc/scffld examples/simple --name="My Awesome Component" --includeStyle=false --yeah=false --nah=true
```

## TODO

- [ ] Check if it works on Windows
- [ ] ~~else~~/elseif conditionals
- [ ] Nested conditionals
- [ ] Export API
- [ ] Tests
