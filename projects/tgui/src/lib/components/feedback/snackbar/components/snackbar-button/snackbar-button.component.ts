import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TappableComponent } from '../../../../utils/tappable/tappable.component';

@Component({
  selector: 'tgui-snackbar-button',
  standalone: true,
  imports: [CommonModule, TappableComponent],
  template: `
    <tgui-tappable>
      <ng-content></ng-content>
    </tgui-tappable>
  `,
  styleUrls: ['./snackbar-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarButtonComponent {} 