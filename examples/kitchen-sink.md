---
# YAML frontmatter to define prop defaults & so on
outputDirectory: ./demo-src/kitchen-sink/
props:
  name:
    type: string
    required: true
  includeStyle:
    type: boolean
    default: true
  appRoot:
    type: string
    default: '@app/'
# Hooks?
hooks:
  afterWrite: applyPrettier
---

# scffld template for React Functional Component with SCSS

Anything outside code blocks can be used for documentation etc.

Could probably use any of the methods from [change-case](https://www.npmjs.com/package/change-case) as output directives.

## File path directives

- `${SCFFLD(propName)}`
- `${ @scffld-kebab propName }`
- `${ @scffld-pascal propName }`
- ...

## Output directives

- `/* @scffld propName */`
- `/* @scffld-kebab propName */`
- `/* @scffld-pascal propName */`
- ...

### Conditional directives

- `/* @scffld-if propName */`
- `/* @scffld-else */`
- `/* @scffld-elseif propName */`
- `/* @scffld-endif */`
- ...

JS/CSS/C#/Java and so on use C-style multiline comments for directives.

Probably ignore any code blocks that don't have `{ filename: ...}`

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

JSON?

Might need to do some kinda JSON5 -> JSON conversion thing so the output is valid...

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
