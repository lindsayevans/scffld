---
outputDirectory: ./demo-src/simple/
props:
  name:
    type: string
    required: true
    shortName: N
  includeStyle:
    type: boolean
    default: true
    description: Include CSS files
---

```scss { filename: 'simple.css', condition: includeStyle }
body {
  color: teal;
}
```

```scss { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }.css', condition: includeStyle }
./* @scffld-kebab name */ {
  outline: 4px dashed salmon;
}
```

```html { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }.html' }
<div class="<!-- @scffld-kebab name -->">
  <h2><!-- @scffld name --></h2>

  <!-- @scffld-if includeStyle -->
  <link rel="stylesheet" href="<!-- @scffld-relativeRoot -->test.css" />
  <link rel="stylesheet" href="<!-- @scffld-kebab name -->.css" />
  <!-- @scffld-endif -->
</div>
```
