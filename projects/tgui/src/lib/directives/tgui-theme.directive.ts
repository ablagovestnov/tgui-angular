import { Directive, ElementRef, OnInit, Renderer2, inject } from '@angular/core';

/**
 * Directive that automatically loads the TGUI styles
 * This should be applied once on a root element (typically body or app-root)
 */
@Directive({
  selector: '[tguiTheme]',
  standalone: true,
})
export class ThemeDirective implements OnInit {
  // CSS file path - this will be loaded from assets in the actual build
  private stylesPath = 'assets/tgui/styles/variables.css';
  
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  ngOnInit(): void {
    this.loadStyles();
  }

  private loadStyles(): void {
    const head = document.head;
    const link = document.createElement('link');
    
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = this.stylesPath;
    
    head.appendChild(link);
  }
} 