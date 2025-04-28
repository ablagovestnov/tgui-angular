import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptionComponent } from '@typography/caption/caption.component';
import { HeadlineComponent } from '@typography/headline/headline.component';
import { TitleComponent } from '@typography/title/title.component';
import { LargeTitleComponent } from '@typography/large-title/large-title.component';
import { AvatarSize } from '@components/blocks/avatar/avatar.component';

/**
 * Компонент AvatarAcronym отображает инициалы для аватара,
 * автоматически подбирая соответствующий размер шрифта и компонент типографики.
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
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarAcronymComponent {
  /**
   * Размер аватара, который определяет размер отображаемых инициалов
   */
  @Input() size: AvatarSize = 'm';
  
  /**
   * Текст, из которого будут сформированы инициалы
   */
  @Input() initials: string = '';
  
  /**
   * Форматирует переданный текст в инициалы, извлекая первые буквы каждого слова (до 2 букв)
   */
  formatInitials(): string {
    if (!this.initials) return '';
    
    return this.initials
      .split(' ')
      .map(part => part.charAt(0))
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }
  
  /**
   * Определяет, какой компонент типографики использовать в зависимости от размера аватара
   */
  getTypographyComponent(): 'caption' | 'headline' | 'title' | 'large-title' {
    if (this.size === 'xxs' || this.size === 'xs' || this.size === 's') {
      return 'caption';
    }
    
    if (this.size === 'm') {
      return 'headline';
    }
    
    if (this.size === 'l') {
      return 'title';
    }
    
    return 'large-title';
  }
  
  /**
   * Определяет уровень Caption в зависимости от размера аватара
   */
  getCaptionLevel(): '1' | '2' {
    return this.size === 'xs' ? '2' : '1';
  }
} 