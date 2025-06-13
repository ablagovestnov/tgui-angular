import { Component, ViewEncapsulation, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipComponent } from '../../../../form/chip/chip.component';

/**
 * CardChip component that displays a small actionable or informational element on the Card
 * Leverages the ChipComponent with fixed positioning for use within cards
 */
@Component({
  selector: 'tgui-card-chip',
  template: `
    <div class="tgui-card-chip__container">
      <tgui-chip [mode]="mode()" [before]="before()" [after]="after()" [className]="chipClassName()">
        <ng-content></ng-content>
      </tgui-chip>
    </div>
  `,
  styles: [`
    .tgui-card-chip__container {
      position: absolute;
      right: 16px;
      top: 16px;
      z-index: 1;
    }
  `],
  standalone: true,
  imports: [CommonModule, ChipComponent],
  exportAs: 'tguiCardChip'
})
export class CardChipComponent {
  /** Defines the visual style of the chip, inherits from the ChipComponent */
  mode = input<'elevated' | 'mono' | 'outline'>('elevated');
  
  /** Content to be placed before the main text */
  before = input<any>();
  
  /** Content to be placed after the main text */
  after = input<any>();
  
  /** Custom class name for the chip component */
  chipClassName = input<string>('');
  
  /** Apply base class */
  @HostBinding('class') className = 'tgui-card-chip';
} 