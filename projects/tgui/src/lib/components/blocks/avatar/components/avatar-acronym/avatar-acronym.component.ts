import { Component, ViewEncapsulation, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptionComponent } from '../../../../typography/caption/caption.component';
import { HeadlineComponent } from '../../../../typography/headline/headline.component';
import { TitleComponent } from '../../../../typography/title/title.component';
import { LargeTitleComponent } from '../../../../typography/large-title/large-title.component';
import { AvatarSize } from '../../avatar.component';

/**
 * The AvatarAcronym component displays initials for an avatar,
 * automatically selecting the appropriate font size and typography component.
 */
@Component({
  selector: 'tgui-avatar-acronym',
  standalone: true,
  imports: [
    CommonModule, 
    CaptionComponent, 
    HeadlineComponent, 
    TitleComponent, 
    LargeTitleComponent
  ],
  template: `
    <ng-container [ngSwitch]="getTypographyComponent()">
      <tgui-caption 
        *ngSwitchCase="'caption'" 
        [level]="getCaptionLevel()" 
        weight="1" 
        [caps]="true"
      >{{ formatInitials() }}</tgui-caption>
      
      <tgui-headline 
        *ngSwitchCase="'headline'" 
        weight="2" 
        [caps]="true"
      >{{ formatInitials() }}</tgui-headline>
      
      <tgui-title 
        *ngSwitchCase="'title'" 
        level="3" 
        weight="1" 
        [caps]="true"
      >{{ formatInitials() }}</tgui-title>
      
      <tgui-large-title 
        *ngSwitchCase="'large-title'" 
        weight="1" 
        [caps]="true"
      >{{ formatInitials() }}</tgui-large-title>
    </ng-container>
  `,
  styles: [`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: var(--tgui--link_color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarAcronymComponent {
  /**
   * Avatar size that determines the size of displayed initials
   */
  size = input<AvatarSize>('m');
  
  /**
   * Text from which initials will be formed
   */
  initials = input<string>('');
  
  /**
   * Formats the passed text into initials, extracting the first letters of each word (up to 2 letters)
   */
  formatInitials(): string {
    if (!this.initials()) return '';
    
    return this.initials()
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  
  /**
   * Determines which typography component to use based on avatar size
   */
  getTypographyComponent(): 'caption' | 'headline' | 'title' | 'large-title' {
    if (this.size() === 'xxs' || this.size() === 'xs' || this.size() === 's') {
      return 'caption';
    }
    
    if (this.size() === 'm') {
      return 'headline';
    }
    
    if (this.size() === 'l') {
      return 'title';
    }
    
    return 'large-title';
  }
  
  /**
   * Determines Caption level based on avatar size
   */
  getCaptionLevel(): '1' | '2' {
    return this.size() === 'xs' ? '2' : '1';
  }
} 