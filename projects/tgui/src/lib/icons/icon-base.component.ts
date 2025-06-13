import { Component, input, HostBinding, ViewEncapsulation } from '@angular/core';
import { TguiIconProps } from './icon.interface';

@Component({
  template: '',
  encapsulation: ViewEncapsulation.None
})
export abstract class TguiIconBase {
  props = input<TguiIconProps>({});
  
  @HostBinding('attr.tgui-icon')
  get tguiIconAttr() {
    return '';
  }
} 