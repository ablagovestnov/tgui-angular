import { Component } from '@angular/core';
import { RootComponent } from './components/utils/tgui-root/tgui-root.component';

/**
 * @deprecated Use TGUIRootComponent instead
 */
@Component({
  selector: 'tgui-root',
  standalone: true,
  imports: [RootComponent],
  template: `
    <tgui-root>
      <ng-content></ng-content>
    </tgui-root>
  `,
})
export class TguiComponent {
  // This component is just a wrapper for backward compatibility
}
