import { Component, Input } from '@angular/core';
import { TguiIconProps } from './icon.interface';

@Component({
  template: '',
})
export abstract class TguiIconBase {
  @Input() props: TguiIconProps = {};
} 