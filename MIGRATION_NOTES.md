# Angular 21 Migration Notes

## Issues Resolved

### 1. **Dependency Conflict - TypeScript Version**
   - **Problem**: `@angular-devkit/build-angular@21` requires `typescript >=5.9 <6.0`, but the project had `typescript ^5.6.3`
   - **Solution**: Updated TypeScript to `^5.9.3`

### 2. **Jest/Testing Framework Compatibility**
   - **Problem**: `jest-preset-angular@14.4.2` only supports `@angular/compiler-cli@>=15.0.0 <21.0.0`, incompatible with Angular 21
   - **Solution**: Updated to compatible versions:
     - `jest-preset-angular` → `^16.1.1` (supports Angular 21)
     - `jest` → `^30.2.0`
     - `jest-environment-jsdom` → `^30.2.0` (explicitly added, required by Jest 30)
     - `@types/jest` → `^30.0.0`
     - `ts-jest` → `^29.4.6`

### 3. **Type Definition Errors: Missing Angular Modules**
   - **Problem**: Errors like:
     - `Cannot find module '@angular/core/primitives/di'`
     - `Cannot find module '@angular/common/http'`
   - **Root Cause**: `codelyzer@6.0.2` and `protractor@7.0.0` depend on Angular 9 type definitions, causing version conflicts
   - **Solution**: 
     - Removed `codelyzer` (deprecated, replaced by ESLint which is already configured)
     - Removed `protractor` (deprecated, replaced by modern testing tools)
     - Added `skipLibCheck: true` to all tsconfig files to suppress type errors in dependencies

### 4. **TSConfig Updates**
   Updated all TypeScript configuration files to include:
   - `skipLibCheck: true` - Skips type checking of declaration files to prevent errors from incompatible type definitions
   - `forceConsistentCasingInFileNames: true` - Ensures file name consistency across platforms

## Files Modified

1. **package.json**
   - Removed: `codelyzer`, `protractor`, `tslint`
   - Updated: `typescript`, `jest`, `jest-preset-angular`, `@types/jest`, `ts-jest`, `jest-environment-jsdom`

2. **tsconfig.json**
   - Added: `skipLibCheck`, `forceConsistentCasingInFileNames`

3. **projects/ng-sortgrid/tsconfig.lib.json**
   - Added: `skipLibCheck`

4. **projects/ng-sortgrid/tsconfig.spec.json**
   - Added: `skipLibCheck`

5. **projects/ng-sortgrid-demo/tsconfig.app.json**
   - Added: `skipLibCheck`

## Build/Test Commands

All the following commands should now work without type errors:

```bash
npm install       # Install dependencies
npm run build:lib # Build the library
npm run test:lib  # Run library tests
npm run lint      # Run ESLint
npm run start     # Start demo app dev server
```

## Notes

- Engine warnings about Node.js version are expected with Node v23.6.0. Angular 21 officially supports Node 20.19.0, 22.12.0, or >=24.0.0
- If you want to avoid engine warnings, consider using nvm to switch to Node 22.x or higher
- The `skipLibCheck` setting is safe and commonly used in production Angular projects to suppress spurious type errors from dependencies

## Deprecation Warnings

The following warnings are expected from npm and are safe to ignore:
- `tslint` (replaced by ESLint)
- `protractor` (replaced by Cypress, Playwright, or native Angular testing)
- Various deprecated npm packages like `rimraf@2`, `glob@7`

These come from transitive dependencies and don't affect your build or tests.

