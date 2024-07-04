# Generator

Generate template from existing files

## Syntax

```
scffld generate [...glob] [--basePath] [--replaceTokens]
```

Where `glob` is a space separated list of [globby compatible](https://www.npmjs.com/package/globby) globs.

`basePath` can be specified to ignore that in the final filename.

`replaceTokens` is a comma separated list of props that will be added to the template, with the value being replaced with the appropriate replacement directive.
See [Replace tokens example](#replace-tokens).

The resulting template is printed to output, to write to a file append ` > path/to/template.md`

If a `.gitignore` is present it will respect it.

## Examples

### Grab everything in a directory

```sh
npx @scffld/cli generate ./src/ > templates/app.md
```

### Only include specific filetypes in a subdirectory

```sh
npx @scffld/cli generate \
    ./src/components/**/*.{tsx,scss} */ \
    > templates/components.md
```

### Base path

```sh
npx @scffld/cli generate ./src/components/ --basePath=src/components/ > templates/app.md
```

Given:

```
./src/components/Foo/Bar.tsx
```

Would output to:

```
{outputDirectory}Foo/Bar.tsx
```

### Replace tokens

- `name` & `foo` props will be added to the template params
- All variants of `My Generator Component` && `Foo Bar` in file name & content will be replaced with the appropriate scffld directive

```sh
scffld generate ./generator-demo/components/ --basePath="generator-demo/" --replaceTokens="name:My Generator Component,foo:Foo Bar" > generator-demo.md

scffld generator-demo --outputDirectory=./demo-src/ --name="scffld Rocks" --foo="yolo"
```
