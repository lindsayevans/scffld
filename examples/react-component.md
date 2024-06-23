---
outputDirectory: ./demo-src/react/
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
---

# scffld template for React Functional Component with SCSS

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
