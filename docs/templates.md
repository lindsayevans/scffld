# Templates

Templates are Markdown files requiring two parts:

- [Parameters](#parameters)
- [File blocks](#file-blocks)

Otherwise the file can contain any other Markdown you want - useful for providing usage instructions, documentation, etc.

TL;DR - take a look at the [examples](../examples/).

## Parameters

Parameters are defined using a YAML frontmatter block, separated from the rest of the template using three dashes (`---`).

None of the parameters are required, but it's a good idea to provide a default `outputDirectory`.

```yaml
---
outputDirectory: ./src/
props:
  name:
    type: string
    required: true
---
```

### Available parameters

| Parameter             | Details                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `outputDirectory`     | Base directory where files should be written                                                                            |
| `postInstallMessage`  | Markdown displayed to the user after scffld has finished writing files<br>Can also contain [directives](#directives)    |
| `postInstallCommands` | List of commands to run after scffld has finished writing files<br>Can also contain [path directives](#path-directives) |
| `props`               | A map of the properties that the template uses                                                                          |

**Note:**
`postInstallCommands` will be squished down to a single line & special characters escaped, so should only be used for simple commands.

### Properties

The map key used determines the property used on the command line, e.g.

```yaml
---
props:
  myProperty:
    type: string
  myOtherProperty:
    type: boolean
---
```

```sh
scffld template-name --myProperty="foo bar" --myOtherProperty=true
```

### Property fields

| Field         | Details                                                      |
| ------------- | ------------------------------------------------------------ |
| `type`        | `string`, `boolean` or `list`                                |
| `required`    | User must supply a value                                     |
| `default`     | Default value if not supplied                                |
| `options`     | List of options available for `type: list`                   |
| `shortName`   | Shortened option name                                        |
| `description` | Description of the property<br>Displayed when using `--help` |

### Reserved property names

| Name              | Short name |
| ----------------- | ---------- |
| `overwrite`       |            |
| `outputDirectory` | `o`        |
| `version`         | `V`        |
| `help`            | `h`        |

## File blocks

Markdown fenced code blocks define the template for each file.

Syntax:

````md
```TYPE FILE_INFO
CONTENT
```
````

- TYPE: The file type, determines how directives are parsed
- FILE_INFO: A YAML object with at least a `filename` field to determine the output filename, can contain [Path directives](#path-directives)
- CONTENT: The file content, can contain [Directives](#directives)

FILE_INFO can also contain a `condition` field which determines whether to output the file based on a prop:

````md
```css { filename: 'foo.css', condition: includeStyles }
.foo {
  ...;
}
```
````

There is also a special `base64` type for binary files, e.g.

````md
```base64 { filename: 'foo.png'}
iVBORw0KGgoAAAA...
```
````

### Directives

Directives can be embedded in your template to output values, implement logic etc.

They are written in the file language's multiline comment syntax with the prefix `@scffld`, e.g.

```js
/* @scffld name */
```

#### Supported languages

Will default to C-style `/* @scffld ... */` for unsupported languages

| Language                         | Syntax                   |
| -------------------------------- | ------------------------ |
| default                          | `/* @scffld ... */`      |
| `html`<br>`svg`<br>`xml`<br>`md` | `<!-- @scffld ... -->`   |
| `cfml`                           | `<!--- @scffld ... --->` |
| `py`                             | `'''' @scffld ... '''`   |

#### Output directives

Output properties & other params

Given `--name="My component" --outputDirectory=./src/components/`

| Directive                        | Example output                                          |
| -------------------------------- | ------------------------------------------------------- |
| `/* @scffld name */`             | My component                                            |
| `/* @scffld-outputDirectory */`  | ./src/components/                                       |
| `/* @scffld-relativeRoot */`     | ../../<br>(relative path from file to output directory) |
| `/* @scffld-upper name /*`       | MY COMPONENT                                            |
| `/* @scffld-lower name /*`       | my component                                            |
| `/* @scffld-camel name /*`       | myComponent                                             |
| `/* @scffld-capital name /*`     | My Component                                            |
| `/* @scffld-constant name /*`    | MY_COMPONENT                                            |
| `/* @scffld-dot name /*`         | my.component                                            |
| `/* @scffld-kebab name /*`       | my-component                                            |
| `/* @scffld-pascal name /*`      | MyComponent                                             |
| `/* @scffld-pascalSnake name /*` | My_Component                                            |
| `/* @scffld-path name /*`        | my/component                                            |
| `/* @scffld-sentence name /*`    | My component                                            |
| `/* @scffld-snake name /*`       | my_component                                            |
| `/* @scffld-train name /*`       | My-Component                                            |

#### Conditional directives

Basic conditional logic is supported:

```js
/* @scffld-if includeStyles */
import 'styles.css';
/* @scffld-endif */
```

```js
/* @scffld-if includeProps */
const foo: FooProps = (props)
/* @scffld-else */
const foo = ()
/* @scffld-endif */
```

Current restrictions:

- Cannot be nested
- No "else-if" functionality

#### Path directives

Any of the output directives can be used within the filename, using `${ @scffld-DIRECTIVE PROPERTY }`

e.g.

```
{ filename: '${ @scffld-kebab name }.css' }
```
