# Show command

Outputs the contents of a template

## Syntax

```
scffld show <template>
```

## Examples

Print the template to the screen:

```sh
npx @querc/scffld show github:lindsayevans/scffld/examples/simple
```

Copy a template to local:

```sh
npx @querc/scffld show github:lindsayevans/scffld/examples/simple \
    > templates/thing.md
```