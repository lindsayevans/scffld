# Release process

## Beta

```sh
pnpm bump prerelease --preid=next
pnpm build
pnpm publish --no-git-checks --access public --tag next
```

## Production

Create new release in git-flow

Bump version:

```sh
pnpm bump patch
pnpm bump minor
```

Push/merge to `main` branch will trigger CI/CD workflow, which publishes `@scffld/cli@VERSION` & creates a GitHub release
