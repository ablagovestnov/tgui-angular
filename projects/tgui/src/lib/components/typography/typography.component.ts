import { Component, ElementRef, Renderer2, OnInit, ViewEncapsulation, HostBinding, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * The Typography component is a versatile wrapper for text content, offering
 * customizable styling options such as weight, capitalization, and HTML tag. It's designed
 * to facilitate consistent text styling across your application, with support for customization
 * through inputs.
 */
@Component({
  selector: 'tgui-typography',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="!tag()">
      <ng-content></ng-content>
    </ng-container>
    <ng-container *ngIf="tag()">
      <ng-container [ngSwitch]="tag()">
        <h1 *ngSwitchCase="'h1'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
          <ng-content></ng-content>
        </h1>
        <h2 *ngSwitchCase="'h2'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
          <ng-content></ng-content>
        </h2>
        <h3 *ngSwitchCase="'h3'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
          <ng-content></ng-content>
        </h3>
        <h4 *ngSwitchCase="'h4'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
          <ng-content></ng-content>
        </h4>
        <h5 *ngSwitchCase="'h5'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
          <ng-content></ng-content>
        </h5>
        <h6 *ngSwitchCase="'h6'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
        222  
        <ng-content></ng-content>
        </h6>
        <p *ngSwitchCase="'p'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
          <ng-content></ng-content>
        </p>
        <span *ngSwitchCase="'span'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
          <ng-content></ng-content>
        </span>
        <div *ngSwitchCase="'div'" [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
          <ng-content></ng-content>
        </div>
        <ng-container *ngSwitchDefault>
          <span [class.plain]="plain()" [class.caps]="caps()" [class.weight-1]="weight() === '1'" [class.weight-2]="weight() === '2'" [class.weight-3]="weight() === '3'">
            <ng-content></ng-content>
          </span>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
  styles: [`
    :host {
      font-family: var(--tgui--font-family);
      display: inline-block;
    }

    :host.plain, .plain {
      margin: 0;
    }

    :host.weight-1, .weight-1 {
      font-weight: var(--tgui--font_weight--accent1);
    }

    :host.weight-2, .weight-2 {
      font-weight: var(--tgui--font_weight--accent2);
    }

    :host.weight-3, .weight-3 {
      font-weight: var(--tgui--font_weight--accent3);
    }

    :host.caps, .caps {
      text-transform: uppercase;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypographyComponent {
  weight = input<'1' | '2' | '3'>('3');
  caps = input<boolean>(false);
  plain = input<boolean>(true);
  tag = input<string | undefined>(undefined);

  @HostBinding('class.plain') get isPlain() { return this.plain() && !this.tag(); }
  @HostBinding('class.caps') get isCaps() { return this.caps() && !this.tag(); }
  @HostBinding('class.weight-1') get isWeight1() { return this.weight() === '1' && !this.tag(); }
  @HostBinding('class.weight-2') get isWeight2() { return this.weight() === '2' && !this.tag(); }
  @HostBinding('class.weight-3') get isWeight3() { return this.weight() === '3' && !this.tag(); }
} 