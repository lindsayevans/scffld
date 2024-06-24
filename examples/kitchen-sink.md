---
# YAML frontmatter to define prop defaults & so on
outputDirectory: ./demo-src/kitchen-sink/
props:
  name:
    type: string
    required: true
    shortName: N
  includeStyle:
    type: boolean
    default: true
  yeah:
    type: boolean
    shortName: y
    default: true
  nah:
    type: boolean
    shortName: n
    default: false
  appRoot:
    type: string
    default: '@app/'
postInstallMessage: |
  ___
  # Your web app '<!-- @scffld name -->' has been created!
  \
  To get started, run the following commands:
  ```sh
  cd <!-- @scffld-outputDirectory -->
  npm i
  npm start
  ```

# hooks:
#   afterWrite: applyPrettier
---

# scffld template for React Functional Component with SCSS

Anything outside code blocks can be used for documentation etc.

```tsx { filename: '${ @scffld-pascal name }/${ @scffld-pascal name }.tsx' }
import React from 'react'
import { Button } from '/* @scffld appRoot */components';

/* @scffld-if includeStyle */
import './/* @scffld-pascal name */.scss'
/* @scffld-endif */

const baseClass = '/* @scffld-kebab name */'

export type /* @scffld-pascal name */Props = {
    title?: string
}

export const /* @scffld-pascal name */: React.FC</* @scffld-pascal name */Props> = (props) => {
    const { title = '/* @scffld name */' } = props

    return (<div className={baseClass}><Button>{ title }</Button></div>)
}
```

```scss { filename: '${ @scffld-pascal name }/${ @scffld-pascal name }.scss', condition: includeStyle }
@use '/* @scffld-relativeRoot */design-system/tokens';

./* @scffld-kebab name */ {
  outline: 1px dashed tokens.$colour-teal;

  &--active {
    outline: 1px dashed tokens.$colour-salmon;
  }
}
```

HTML, SVG etc. would need to use HTML-style comments

```html { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }.html' }
<div class="<!-- @scffld-kebab name -->">
  <h2><!-- @scffld name --></h2>
  <!-- @scffld-if includeStyle -->
  <style></style>
  <!-- @scffld-endif -->
</div>
```

JSON

```json { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }.json' }
{
  "title": "/* @scffld name */",
  /* @scffld-if includeStyle */
  "stylesheet": "/* @scffld-kebab name */.scss"
  /* @scffld-endif */
}
```

Python? I have no idea if any of this makes sense...

```py { filename: '${ @scffld-pascal name }/${ @scffld-snake name }.py' }
''' @scffld-if includeStyle '''
import ''' @scffld-snake name '''
''' @scffld-endif '''

print("Hello ''' @scffld name '''")
```

CFML FTMFW

```cfm { filename: '${ @scffld-pascal name }/${ @scffld-snake name }.cfm' }
<cfset message="<!--- @scffld name --->">
<cfoutput>#message#</cfoutput>
```

Various directives

```html { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }-output-directives.html' }
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
</div>
```

```html { filename: '${ @scffld-pascal name }/${ @scffld-kebab name }-conditional-directives.html' }
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
  <!-- @scffld-if yeah -->
  <p>yeah1</p>
  <!-- @scffld-else -->
  <p>nah1</p>
  <!-- @scffld-endif -->
  <!-- @scffld-if nah -->
  <p>nah2</p>
  <!-- @scffld-else -->
  <p>yeah2</p>
  <!-- @scffld-endif -->
</div>
```

## Example output

This code block will be ignored

```sh
scffld examples/react-component --name="My Awesome Component"

# src/MyAwesomeComponent/MyAwesomeComponent.tsx
# src/MyAwesomeComponent/MyAwesomeComponent.scss
# src/MyAwesomeComponent/my-awesome-component.html
# src/MyAwesomeComponent/my-awesome-component.json
# src/MyAwesomeComponent/my_awesome_component.py
```
