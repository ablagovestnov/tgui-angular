import { 
  Component, 
  ViewEncapsulation, 
  ChangeDetectionStrategy,
  ContentChildren,
  QueryList,
  AfterContentInit,
  input,
  output,
  signal,
  effect,
  ElementRef,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsItemComponent } from './tabs-item.component';
import { Subscription } from 'rxjs';

/**
 * The TabsList component renders a list of tabs, typically used for navigating between different views
 * or filtering content. It visually indicates the currently active tab and supports custom styling.
 */
@Component({
  selector: 'tgui-tabs-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs-container" role="tablist">
      <div 
        *ngIf="hasSelectedTab()"
        aria-hidden="true"
        class="slider"
        [style.width.%]="100 / tabsCount()"
        [style.transform]="getSliderTransform()"
      ></div>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      overflow: hidden; /* Обрезаем содержимое, если оно выходит за пределы */
    }

    .tabs-container {
      overflow: hidden;
      position: relative;
      display: flex;
      align-items: center;
      align-content: stretch;
      width: 100%;
      height: 100%;
      /* Удаляем gap, так как он может мешать при сжатии */
      /* Используем flex-контейнер для равномерного распределения пространства */
    }

    /* Убеждаемся, что дочерние элементы TabsItem равномерно распределяются */
    ::ng-deep .tabs-container > tgui-tabs-item {
      flex: 1 1 0;
      min-width: 0; /* Важно для сжатия flex-элементов */
      margin: 0 6px; /* Добавляем горизонтальные отступы вместо gap */
    }

    /* Убираем отступ у первого и последнего элемента для выравнивания */
    ::ng-deep .tabs-container > tgui-tabs-item:first-child {
      margin-left: 0;
    }

    ::ng-deep .tabs-container > tgui-tabs-item:last-child {
      margin-right: 0;
    }

    .slider {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 3px;
      transition: transform 125ms;
      border-radius: 4px 4px 1px 1px;
      background: var(--tgui--button_color);
    }
  `],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsListComponent implements AfterContentInit, OnDestroy {
  /** Индекс выбранной вкладки */
  selectedIndex = input<number>(0);
  
  /** Событие изменения выбранной вкладки */
  selectedIndexChange = output<number>();
  
  /** Количество вкладок */
  tabsCount = signal<number>(0);
  
  /** Проверка, есть ли выбранная вкладка */
  hasSelectedTab = signal<boolean>(false);
  
  /** Текущий выбранный индекс (внутренний) */
  private activeTabIndex = signal<number>(0);
  
  /** Получение всех дочерних элементов TabsItem */
  @ContentChildren(TabsItemComponent) tabItems!: QueryList<TabsItemComponent>;
  
  /** Подписки на события табов */
  private subscriptions: Subscription[] = [];
  
  constructor() {
    effect(() => {
      this.activeTabIndex.update(() => this.selectedIndex());
      this.updateSelectedState();
    });
  }
  
  ngAfterContentInit(): void {
    // Инициализация вкладок
    this.updateTabsCount();
    this.updateSelectedState();
    
    // Отслеживаем изменения в составе вкладок
    this.tabItems.changes.subscribe(() => {
      this.updateTabsCount();
      this.updateSelectedState();
    });
  }
  
  ngOnDestroy(): void {
    // Очистка подписок при уничтожении компонента
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  
  /** Получает трансформацию для слайдера */
  getSliderTransform(): string {
    return `translateX(${100 * this.activeTabIndex()}%)`;
  }
  
  /** Обновляет количество вкладок */
  private updateTabsCount(): void {
    if (this.tabItems) {
      this.tabsCount.update(val => this.tabItems.length);
    }
  }
  
  /** Выбирает вкладку по индексу */
  selectTab(index: number): void {
    if (index !== this.activeTabIndex()) {
      this.activeTabIndex.update(() => index);
      this.selectedIndexChange.emit(index);
      this.updateSelectedState();
    }
  }
  
  /** Обновляет состояние выбранных вкладок */
  private updateSelectedState(): void {
    if (!this.tabItems) return;
    
    const activeIndex = this.activeTabIndex();
    this.hasSelectedTab.update(() => activeIndex > -1 && activeIndex < this.tabItems.length);
    
    // Очистка предыдущих подписок
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];
    
    this.tabItems.forEach((item, index) => {
      // Обновляем свойство selected в каждом табе через публичный метод
      const isSelected = index === activeIndex;
      item.setSelected(isSelected);
      
      // Подписываемся на событие выбора
      const subscription = item.select.subscribe(() => {
        this.selectTab(index);
      });
      
      this.subscriptions.push(subscription);
    });
  }
} 