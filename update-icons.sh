#!/bin/bash

# Update all icon components to use the correct directive syntax
find projects/tgui/src/lib/icons -type f -name "*.ts" -not -name "*.spec.ts" -not -name "icon-base.component.ts" -not -name "icon.interface.ts" -not -name "index.ts" -exec sed -i '' 's/\[tguiSvgProps\]="svgProps"/tguiSvgProps\n      [props]="props()"/g' {} +

# Also update breadcrumb icons
find projects/tgui/src/lib/components/navigation/breadcrumbs/icons -type f -name "*.ts" -not -name "*.spec.ts" -exec sed -i '' 's/\[tguiSvgProps\]="svgProps"/tguiSvgProps\n      [props]="props()"/g' {} + 