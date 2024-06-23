# scffld

[![NPM Version](https://img.shields.io/npm/v/%40querc%2Fscffld)](https://www.npmjs.com/package/@querc/scffld)

Simple code scaffolding tool utilising a single Markdown file to define templates & properties.

## Why?

I wanted something that was a bit less complex than full-blown code generation tools like Yeoman, Angular Schematics etc.

## Usage

Requires a recent version of [NodeJS](https://nodejs.org/).

### Quickstart

```sh
npx @querc/scffld@latest github:lindsayevans/scffld/examples/simple \
    --name="My Awesome Component" \
    -o ./my-project/src/
```

Files will be created in `my-project/src`

<img src="./docs/quickstart-screen.svg" width="732" alt="Example of command output" />

See [docs/usage.md](./docs/usage.md) for more details or check out the [example templates](./examples/).

## TODO

- [ ] Check if it works on Windows
- [ ] ~~else~~/elseif conditionals
- [ ] Nested conditionals
- [x] Export API
- [ ] Tests
