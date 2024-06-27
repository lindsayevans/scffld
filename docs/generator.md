# Generator - ✨ Experimental ✨

Generate template from existing files

> [!IMPORTANT]
> Generator won't do everything for you & the resulting template will likely need some manual tweaking to add directives etc.

## Syntax

```
scffld generate [...glob]
```

Where `glob` is a list of [globby compatible](https://www.npmjs.com/package/globby) globs.

The resulting template is printed to output, to write to a file append ` > path/to/template.md`

If a `.gitignore` is present it will respect it.

## Examples

Grab everything in a directory:

```sh
npx @querc/scffld generate ./src/ > templates/app.md
```

Only include specific filetypes in a subdirectory:

```sh
npx @querc/scffld generate \
    ./src/components/**/*.{tsx,scss} */ \
    > templates/components.md
```
