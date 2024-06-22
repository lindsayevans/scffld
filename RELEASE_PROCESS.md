# Release process

## Beta

```sh
pnpm version prerelease --preid=next
pnpm build
pnpm publish --no-git-checks --access public --tag next
```

## Production

```sh
pnpm version minor
pnpm build
pnpm publish --no-git-checks --access public
```

TODO:
Create new release in git-flow

Bump version in `package.json`

Push/merge to `main` branch will trigger CI/CD workflow, which publishes `@querc/scffld@VERSION` & creates a GitHub release
