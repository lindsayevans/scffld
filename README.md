# scffld

## What?

(possibly dumb idea for) Markdown based code scaffolding

## Why?

Yeoman etc. seem old & unmaintained, plus I woke up at 3am & was bored

## How?

Nothing functional yet, but something along the lines of:

```sh
scffld examples/react-component --name="My Awesome Component" --includeStyle=false
```

would walk through all of the code blocks in [examples/react-component.md](./examples/react-component.md), replacing specially formatted comments with props & output a file for each
