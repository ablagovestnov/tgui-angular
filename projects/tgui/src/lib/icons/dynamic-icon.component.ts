import { Component, Input, OnChanges, SimpleChanges, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TguiIconBase } from './icon-base.component';
import { TguiIconProps } from './icon.interface';

// Import all icon components
import * as Icons from './index';

@Component({
  selector: 'tgui-dynamic-icon',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-container #iconContainer></ng-container>',
})
export class TguiDynamicIconComponent implements OnChanges {
  @Input() icon!: string;
  
  @ViewChild('iconContainer', { read: ViewContainerRef, static: true })
  iconContainer!: ViewContainerRef;

  private componentRef: ComponentRef<TguiIconBase> | null = null;
  
  // Available icon sizes in ascending order
  private readonly iconSizes = ['12', '16', '20', '24', '28', '32', '36'];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      this.loadIconComponent();
    }
  }

  private loadIconComponent(): void {
    // Clear the previous component if any
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    this.iconContainer.clear();

    // Attempt to find the icon component by name
    let iconComponentName = this.formatIconComponentName(this.icon);
    let IconComponent = (Icons as any)[iconComponentName];
    // If no icon found and no size was specified, try with the smallest size first
    if (!IconComponent && !this.hasSize(this.icon)) {
      for (const size of this.iconSizes) {
        iconComponentName = this.toCamelCase(`tgui-icon${size}-${this.icon}`);
        IconComponent = (Icons as any)[iconComponentName];
        if (IconComponent) break;
      }
    }

    if (IconComponent) {
      this.componentRef = this.iconContainer.createComponent(IconComponent);
    } else {
      console.warn(`Icon component "${this.icon}" not found.`);
    }
  }


  private hasSize(iconName: string): boolean {
    // Check if the icon name already contains a size
    if (iconName.startsWith('tgui-icon') && /tgui-icon\d+/.test(iconName)) {
      return true;
    }
    
    if (iconName.includes('-')) {
      const parts = iconName.split('-');
      // Check if any part is a number (size)
      return parts.some(part => /^\d+$/.test(part));
    }
    
    return false;
  }

  private formatIconComponentName(iconName: string): string {
    // Handle different name formats
    if (iconName.startsWith('tgui-icon')) {
      return this.toCamelCase(iconName);
    }
    
    // If icon name contains a size (e.g. "close-24" or "24/close")
    if (iconName.includes('-')) {
      const parts = iconName.split('-');
      if (/^\d+$/.test(parts[parts.length - 1])) {
        // Format: "close-24" -> "TguiIcon24Close"
        const size = parts.pop();
        return this.toCamelCase(`tgui-icon${size}-${parts.join('-')}`);
      } else if (/^\d+$/.test(parts[0])) {
        // Format: "24-close" -> "TguiIcon24Close"
        const size = parts.shift();
        return this.toCamelCase(`tgui-icon${size}-${parts.join('-')}`);
      }
    }
    
    // For icons without size, we'll try with different sizes in loadIconComponent
    // Just return a default format here
    return this.toCamelCase(`tgui-icon-${iconName}`);
  }

  private toCamelCase(str: string): string {
    return str.replace(/(^|-|_)([a-z])/g, (match, separator, char) => 
      char.toUpperCase()
    ).replace(/(-|_)/g, '');
  }
} 