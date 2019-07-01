# Library Deployment to NPM 

These are instructions on how to publish this library as @bjesuiter/serializr-helpers to npm. 
They are not part of `README.md` so that they are not published to npm.

# How to deploy

- create a new changelog entry in `CHANGELOG.md` and define the new version number 
  based on how much the change breaks the existing api (patch, minor, major)
- increase version number with `npm version patch | minor | major`, like defined earlier
- run `npm publish --access public`, or use the shortcut `npm run deploy`

Files to publish are listed in package.json['files'] key. 
Some files are published automatically, like 
- README.md 
- LICENCE.md (if available)
- package.json
