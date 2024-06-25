# scffld

[![NPM Version](https://img.shields.io/npm/v/%40querc%2Fscffld)](https://www.npmjs.com/package/@querc/scffld)
[![codecov](https://codecov.io/gh/lindsayevans/scffld/graph/badge.svg?token=ERAIXQNUZF)](https://codecov.io/gh/lindsayevans/scffld)

Simple code scaffolding tool utilising a single Markdown file to define templates & properties.

## Why?

I wanted something that was a bit less complex than full-blown code generation tools like Yeoman, Angular Schematics etc.

## Usage

Requires [NodeJS](https://nodejs.org/) 18+.

### Quickstart

```sh
npx @querc/scffld@latest github:lindsayevans/scffld/examples/simple \
    --name="My Awesome Component" \
    -o ./my-project/src/
```

(Windows users will need to remove `\` and put everything on one line)

Files will be created in `my-project/src`

![Example of command output](./docs/screenshot.svg)

See [docs/usage.md](./docs/usage.md) for more details or check out the [example templates](./examples/).
