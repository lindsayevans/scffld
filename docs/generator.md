# Generator - ✨ Experimental ✨

Generate template from existing files

See [Feature #3](https://github.com/lindsayevans/scffld/issues/3) for the gory details.

## Syntax

```
scffld :generate [...glob]
```

Where `glob` is a list of [globby compatible](https://www.npmjs.com/package/globby) globs

## Examples

```sh
npx @querc/scffld :generate \
    ./src/components/Foo/ \
    ./src/components/Bar/ \
    > templates/components.md
```

```sh
npx @querc/scffld :generate \
    ./src/components/**/*.{tsx,scss} */ \
    > templates/components.md
```
