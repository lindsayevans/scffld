# scffld

[![NPM Version](https://img.shields.io/npm/v/%40querc%2Fscffld)](https://www.npmjs.com/package/@querc/scffld)

## What?

(possibly dumb idea for) Markdown based code scaffolding

## Why?

I wanted something that was a bit less complicated than Yeoman et al.

## How?

### Remote template

```sh
npx @querc/scffld@latest github:lindsayevans/scffld/examples/simple \
    --name="My Awesome Component" \
    -o ./my-project/src/
```

### Local template

1. Grab one of the [example files](./examples) & save it locally
2. Run this command, replacing `examples/simple` with your example file

```sh
npx @querc/scffld examples/simple \
    --name="My Awesome Component" \
    -o ./my-project/src/
```

Created files will be in `my-project/src`

Try it out with a few options different to the defaults:

```sh
npx @querc/scffld examples/simple \
    --name="My Awesome Component" \
    -o ./my-project/src/ \
    --includeStyle=false --yeah=false --nah=true
```

Show supported potions for the template

```sh
npx @querc/scffld examples/simple --help
```

## TODO

- [ ] Check if it works on Windows
- [ ] ~~else~~/elseif conditionals
- [ ] Nested conditionals
- [ ] Export API
- [ ] Tests
