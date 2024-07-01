# Usage

We'll be using `npx` on this page to run the examples without installing anything.

See [installation.md](./installation.md) for local install instructions.

## Quickstart

```sh
npx @scffld/cli github:scffld-dev/cli/examples/simple \
    --name="My Awesome Component" \
    -o ./my-project/src/
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz_small.svg)](https://stackblitz.com/edit/scffld-quickstart?file=README.md)

(Windows users will need to remove `\` and put everything on one line)

Files will be created in `my-project/src`

![Example of command output](./screenshot.svg)

## Slightly less-quick start

Use the [web-app template](../examples/web-app.md) without the required `name` prop:

```sh
npx @scffld/cli github:scffld-dev/cli/examples/web-app -o ./my-web-app/src/
```

A few things to note:

- It will prompt you for the missing name, and allow you to change the defaults of any other template options
- Will prompt to overwrite any existing files
- Displays a custom post install message
- Prompts you to allow running of custom post install commands

## Basic syntax

```sh
npx @scffld/cli template [options]
```

## Local templates

1. Grab one of the [example templates](../examples/) & save it locally, or create your own (see [templates.md](./templates.md) for details)
2. Run this command, replacing `examples/simple` with your template name

```sh
npx @scffld/cli examples/simple \
    --name="My Awesome Component" \
    -o ./my-project/src/
```

Files will be created in `my-project/src`

Show supported options for the template:

```sh
npx @scffld/cli examples/simple \
    --help
```

Try it out with a few options different to the defaults:

```sh
npx @scffld/cli examples/simple \
    --name="My Other Component" \
    --includeStyle=false \
    --yeah=false \
    --nah=true \
    -o ./my-project/src/
```

or leave out all options to be prompted for them:

```sh
npx @scffld/cli examples/simple
```

## Remote templates

Templates can be loaded from a remote URL:

```sh
npx @scffld/cli https://raw.githubusercontent.com/scffld-dev/cli/develop/examples/simple.md \
    --name="My Remote Component"
```

or from GitHub:

```sh
npx @scffld/cli github:scffld-dev/cli/examples/simple \
    --name="My Remote Component"
```

and with a specific commit/tag/branch:

```sh
npx @scffld/cli github:scffld-dev/cli/examples/simple@v0.11.0 \
    --name="My Remote Component"
```

## Common options

| Option                   | Details                                                                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `-h` `--help`            | Show available options for the template                                                                   |
| `-o` `--outputDirectory` | Base directory where files should be written<br>Defaults to the `outputDirectory` defined in the template |
| `--overwrite`            | `true`: overwrite existing files<br>`false`: exit instead of overwriting                                  |

## Other commands

- [`show`](./show.md) - Outputs the contents of a template
- [`generate`](./generator.md) - Generate template from existing files
