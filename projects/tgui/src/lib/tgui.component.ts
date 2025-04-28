import { Component } from '@angular/core';
import { TGUIRootComponent } from './core/components/service/tgui-root/tgui-root.component';

/**
 * @deprecated Use TGUIRootComponent instead
 */
@Component({
  selector: 'lib-tgui',
  standalone: true,
  imports: [TGUIRootComponent],
  template: `
    <tgui-root>
      <ng-content></ng-content>
    </tgui-root>
  `,
})
export class TguiComponent {
  // This component is just a wrapper for backward compatibility
}
