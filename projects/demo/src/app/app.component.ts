import { Component, OnInit, NO_ERRORS_SCHEMA, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Import from new structure using path aliases
import { TypographyComponent, TextComponent, CaptionComponent, HeadlineComponent, 
  LargeTitleComponent, SubheadlineComponent, TitleComponent } from '@typography/public-api';
import { ButtonComponent } from '@blocks/button/button.component';
import { TGUIRootComponent } from '@service/tgui-root/tgui-root.component';
import { RootPortalComponent } from '@service/portal/root-portal.component';
import { AvatarComponent, AvatarBadgeComponent } from '@blocks/avatar';
import { AvatarStackComponent } from '@blocks/avatar-stack';
import { BadgeComponent } from '@blocks/badge/badge.component';
import { SpinnerComponent } from '@feedback/spinner/spinner.component';
import { PortalService } from '@services/portal.service';
import { DividerComponent } from '@misc/divider/divider.component';
import { SectionComponent, SectionHeaderComponent, SectionFooterComponent } from '@blocks/section/public-api';
import { CardComponent, CardCellComponent, CardChipComponent } from '@blocks/card/public-api';
import { ChipComponent } from '@form/chip';

interface ColorVariable {
  name: string;
  value: string;
  category: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TypographyComponent,
    TextComponent,
    CaptionComponent,
    HeadlineComponent,
    LargeTitleComponent,
    SubheadlineComponent,
    TitleComponent,
    ButtonComponent,
    TGUIRootComponent,
    RootPortalComponent,
    AvatarComponent,
    AvatarBadgeComponent,
    AvatarStackComponent,
    BadgeComponent,
    SpinnerComponent,
    DividerComponent,
    SectionComponent,
    SectionHeaderComponent,
    SectionFooterComponent,
    CardComponent,
    CardCellComponent,
    CardChipComponent,
    ChipComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(TGUIRootComponent, { read: ElementRef }) tguiRootElement!: ElementRef;
  
  title = 'TGUI Angular Demo';
  isDarkTheme = false;
  isIOS = false;
  followSystemTheme = false;
  showPortalContent = false;
  
  nativeColors: ColorVariable[] = [];
  customColors: ColorVariable[] = [];
  nonThemeColors: ColorVariable[] = [];
  
  // Create icon template references as needed for card examples
  beforeChipIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.5 4.5C10.5 5.88071 9.38071 7 8 7C6.61929 7 5.5 5.88071 5.5 4.5C5.5 3.11929 6.61929 2 8 2C9.38071 2 10.5 3.11929 10.5 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 12.5C3 10.2909 5.23858 8.5 8 8.5C10.7614 8.5 13 10.2909 13 12.5V14H3V12.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;

  afterChipIcon = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
  
  constructor(private portalService: PortalService) {}
  
  ngOnInit() {
    this.updateColorVariables();
  }
  
  ngAfterViewInit() {
    // Ensure portal service has a valid container reference
    if (this.tguiRootElement) {
      this.portalService.setPortalContainer(this.tguiRootElement);
    }
  }
  
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    console.log(`Toggle Theme: isDarkTheme=${this.isDarkTheme}, appearance=${this.isDarkTheme ? 'dark' : 'light'}`);
    this.updateColorVariables();
  }
  
  togglePlatform() {
    this.isIOS = !this.isIOS;
    console.log(`Toggle Platform: isIOS=${this.isIOS}, platform=${this.isIOS ? 'ios' : 'base'}`);
  }
  
  toggleFollowSystem() {
    this.followSystemTheme = !this.followSystemTheme;
    console.log(`Toggle FollowSystem: followSystemTheme=${this.followSystemTheme}`);
  }
  
  updateColorVariables() {
    // Очистим предыдущие значения
    this.nativeColors = [];
    this.customColors = [];
    this.nonThemeColors = [];
    
    // Native tokens
    this.nativeColors = [
      this.getColorVariable('--tgui--bg_color', 'native'),
      this.getColorVariable('--tgui--text_color', 'native'),
      this.getColorVariable('--tgui--hint_color', 'native'),
      this.getColorVariable('--tgui--link_color', 'native'),
      this.getColorVariable('--tgui--button_color', 'native'),
      this.getColorVariable('--tgui--button_text_color', 'native'),
      this.getColorVariable('--tgui--secondary_bg_color', 'native'),
      this.getColorVariable('--tgui--header_bg_color', 'native'),
      this.getColorVariable('--tgui--accent_text_color', 'native'),
      this.getColorVariable('--tgui--section_bg_color', 'native'),
      this.getColorVariable('--tgui--section_header_text_color', 'native'),
      this.getColorVariable('--tgui--subtitle_text_color', 'native'),
      this.getColorVariable('--tgui--destructive_text_color', 'native')
    ];
    
    // Custom lib tokens
    this.customColors = [
      this.getColorVariable('--tgui--skeleton', 'custom'),
      this.getColorVariable('--tgui--divider', 'custom'),
      this.getColorVariable('--tgui--outline', 'custom'),
      this.getColorVariable('--tgui--surface_primary', 'custom'),
      this.getColorVariable('--tgui--tertiary_bg_color', 'custom'),
      this.getColorVariable('--tgui--quartenary_bg_color', 'custom'),
      this.getColorVariable('--tgui--segmented_control_active_bg', 'custom'),
      this.getColorVariable('--tgui--card_bg_color', 'custom'),
      this.getColorVariable('--tgui--secondary_hint_color', 'custom'),
      this.getColorVariable('--tgui--secondary_fill', 'custom'),
      this.getColorVariable('--tgui--green', 'custom'),
      this.getColorVariable('--tgui--destructive_background', 'custom')
    ];
    
    // Non-theme tokens
    this.nonThemeColors = [
      this.getColorVariable('--tgui--surface_dark', 'non-theme'),
      this.getColorVariable('--tooltip_background_dark', 'non-theme'),
      this.getColorVariable('--tgui--white', 'non-theme'),
      this.getColorVariable('--tgui--black', 'non-theme')
    ];
  }
  
  getColorVariable(name: string, category: string): ColorVariable {
    const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return {
      name: name.replace('--tgui--', ''),
      value,
      category
    };
  }
}
