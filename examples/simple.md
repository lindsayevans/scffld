---
outputDirectory: ./demo-src/simple/
props:
  name:
    type: string
    required: true
  includeStyle:
    type: boolean
    default: true
  yeah:
    type: boolean
    default: true
  nah:
    type: boolean
    default: false
---

```scss { filename: 'test.css', condition: includeStyle }
body {
  color: teal;
}
```

```scss { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }.css', condition: includeStyle }
./* @scffld-kebab name */ {
  outline: 4px dashed salmon;
}
```

```html { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }-replace.html' }
<div class="<!-- @scffld-kebab name -->">
  <h2><!-- @scffld name --></h2>
  <pre>Relative path to outputDirectory: <!-- @scffld-relativeRoot -->
includeStyle: <!-- @scffld includeStyle --></pre>
  <h3>Replace methods:</h3>
  <dl>
    <dt>upper:</dt>
    <dd><!-- @scffld-upper name --></dd>
    <dt>lower:</dt>
    <dd><!-- @scffld-lower name --></dd>
    <dt>camel:</dt>
    <dd><!-- @scffld-camel name --></dd>
    <dt>capital:</dt>
    <dd><!-- @scffld-capital name --></dd>
    <dt>constant:</dt>
    <dd><!-- @scffld-constant name --></dd>
    <dt>dot:</dt>
    <dd><!-- @scffld-dot name --></dd>
    <dt>kebab:</dt>
    <dd><!-- @scffld-kebab name --></dd>
    <dt>pascal:</dt>
    <dd><!-- @scffld-pascal name --></dd>
    <dt>pascalSnake:</dt>
    <dd><!-- @scffld-pascalSnake name --></dd>
    <dt>path:</dt>
    <dd><!-- @scffld-path name --></dd>
    <dt>sentence:</dt>
    <dd><!-- @scffld-sentence name --></dd>
    <dt>snake:</dt>
    <dd><!-- @scffld-snake name --></dd>
    <dt>train:</dt>
    <dd><!-- @scffld-train name --></dd>
  </dl>
  <!-- @scffld-if includeStyle -->
  <link rel="stylesheet" href="<!-- @scffld-relativeRoot -->test.css" />
  <link rel="stylesheet" href="<!-- @scffld-kebab name -->.css" />
  <!-- @scffld-endif -->
</div>
```

```html { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }-conditionals.html' }
<div class="<!-- @scffld-kebab name -->">
  <!-- @scffld-if includeStyle -->
  <link rel="stylesheet" href="<!-- @scffld-relativeRoot -->test.css" />
  <!-- @scffld-endif -->
  <!-- @scffld-if yeah -->
  <p>yeah, nah</p>
  <!-- @scffld-endif -->
  <!-- @scffld-if nah -->
  <p>nah, yeah</p>
  <!-- @scffld-endif -->
</div>
```
