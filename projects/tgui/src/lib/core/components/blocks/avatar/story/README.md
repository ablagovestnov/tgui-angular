# Stories Migration

This directory contains the stories for the Avatar component. These stories were moved from the central `src/stories` directory to be co-located with the component they document, following best practices for component organization.

## Benefits of Co-location

1. **Better discoverability** - Stories are directly adjacent to the components they document
2. **Easier maintenance** - When updating a component, it's easier to remember to update its stories
3. **Improved context** - Developers can easily see examples of component usage while working on the component
4. **Module coherence** - All files related to a component are kept together

## Storybook Configuration

The Storybook configuration automatically detects stories anywhere in the project using the glob pattern:
```
../src/**/*.stories.@(js|jsx|ts|tsx)
```

This allows stories to be co-located with their components while still being properly displayed in Storybook. 