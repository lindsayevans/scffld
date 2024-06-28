# scffld

[![NPM Version](https://img.shields.io/npm/v/%40querc%2Fscffld)](https://www.npmjs.com/package/@querc/scffld)
[![codecov](https://codecov.io/gh/lindsayevans/scffld/graph/badge.svg?token=ERAIXQNUZF)](https://codecov.io/gh/lindsayevans/scffld)
[![Known Vulnerabilities](https://snyk.io/test/github/lindsayevans/scffld/badge.svg)](https://snyk.io/test/github/lindsayevans/scffld)

Simple code scaffolding tool utilising a single Markdown file to define templates & properties.

## Why?

I wanted something that was a bit less complex than full-blown code generation tools like Yeoman, Angular Schematics etc.

## Features

- Local or remote templates
- File templates can be written in any language you want - HTML, XML, CSS, SCSS, JavaScript, TypeScript, Python, Ruby, PHP, ColdFusion, COBOL ...
- Output user-supplied properties in your templates, with conversion & conditional directives
- Prompt the user for missing properties - enter a text string, yes/no for booleans; or choose from a list of options
- Display custom messages & run commands after scaffolding
- ✨ Experimental ✨ [Generate template from existing files](./docs/generator.md)

Take a look at the [template docs](./docs/templates.md) for full details.

## Usage

Requires [NodeJS](https://nodejs.org/) 18+.

### Quickstart

```sh
npx @querc/scffld@latest github:lindsayevans/scffld/examples/simple \
    --name="My Awesome Component" \
    -o ./my-project/src/
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/scffld-quickstart?file=README.md)

(Windows users will need to remove `\` and put everything on one line)

Files will be created in `my-project/src`

![Example of command output](./docs/screenshot.svg)

See [docs/usage.md](./docs/usage.md) for more details or check out the [example templates](./examples/).
