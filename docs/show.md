# Show command

Outputs the contents of a template

## Syntax

```
scffld show <template>
```

## Examples

Print the template to the screen:

```sh
npx @scffld/cli show github:scffld-dev/cli/examples/simple
```

Copy a template to local:

```sh
npx @scffld/cli show github:scffld-dev/cli/examples/simple \
    > templates/thing.md
```
