# Changelog

## Semantic Versioning (SemVer policy)
   ⚠️ All Versions after 1.x are considered SemVer. 
   Every release in the 0.x range is considered experimental. 
   There can and will be breaking API changes without deprecation.

## Versions

## [2.1.0] - 2019-07-11
- restructuring of output modules: 
    - split `dist.browser` into `dist.commonjs.es5` and `dist.esm.es5`

## [2.0.0] - 2019-07-11
- change module format of `dist.browser` & `dist` from `es2015` to `commonjs`
  to avoid problems
  when using these helpers in code which is tested by jest.   
  
  **Problem:**  
  Jest runs inside node and node support for es6/es2015 import syntax is still experimental, 
  so all es6 modules have to be transpiled for jest. This somehow does not work in stencilOne, 
  which uses rollup.

## [1.0.1] - 2019-07-01
- Bugfix: add the Minilog logger types to dependencies instead of devDependencies  
=> otherwise the type can not be found in apps using this library.

## [1.0.0] - 2019-07-01

- Feature: Serialization Helpers for JSON and POJOS
- Feature: MomentIsoSerialization as default
- Feature: MomentSerializationSchema Factory Function

### [0.0.1] - 2019-04-29
Initial Version
