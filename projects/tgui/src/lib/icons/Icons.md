import { Meta } from '@storybook/blocks';

<Meta title="Icons/Documentation" />

# Иконки TGUI

Библиотека TGUI предоставляет набор иконок, которые можно использовать в вашем приложении.

## Структура иконок

Иконки организованы по размерам:
- 12×12
- 16×16
- 20×20
- 24×24
- 28×28
- 32×32
- 36×36

## Использование иконок

Каждая иконка представляет собой standalone компонент Angular и может быть импортирована и использована следующим образом:

```typescript
import { Component } from '@angular/core';
import { TguiIcon20ChevronDown } from '@tgui/icons/icon20/tgui-icon20-chevron-down';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [TguiIcon20ChevronDown],
  template: `
    <div>
      <tgui-icon20-chevron-down></tgui-icon20-chevron-down>
    </div>
  `,
})
export class ExampleComponent {}
```

## Свойства иконок

Каждая иконка поддерживает следующие входные параметры:

| Имя | Тип | Описание |
|-----|-----|----------|
| class | string | CSS класс для стилизации иконки |
| style | { [key: string]: string } | Дополнительные стили для иконки |
| ariaLabel | string | Aria-label для доступности |
| title | string | Всплывающая подсказка для иконки |

Пример использования с параметрами:

```typescript
<tgui-icon20-chevron-down 
  class="custom-icon"
  [style]="{ 'color': 'red' }"
  ariaLabel="Раскрыть"
  title="Нажмите, чтобы раскрыть"
></tgui-icon20-chevron-down>
```

## Стилизация иконок

### Дефолтный цвет

По умолчанию все иконки используют цвет, определенный переменной CSS `--tgui-link_color`. Это позволяет иконкам автоматически соответствовать общей цветовой схеме приложения.

### Изменение цвета

Иконки используют `currentColor` для заливки, поэтому их цвет можно легко изменять через CSS:

```css
/* Переопределение цвета для всех иконок в контейнере */
.icon-container {
  color: #ff0000; /* Иконки будут красными */
}

/* Изменение цвета при наведении */
.icon-container:hover {
  color: #0000ff; /* При наведении иконки станут синими */
}
```

Или непосредственно в атрибуте style:

```html
<tgui-icon20-chevron-down style="color: #ff5722;"></tgui-icon20-chevron-down>
```

### Изменение размера

Размер иконки также можно изменить с помощью свойства `font-size`:

```html
<tgui-icon20-chevron-down style="font-size: 24px;"></tgui-icon20-chevron-down>
```

## Именование иконок

Иконки следуют соглашению об именовании `TguiIcon<SIZE><ICON-NAME>`, где:
- `<SIZE>` - размер иконки (12, 16, 20, 24, 28, 32, 36)
- `<ICON-NAME>` - имя иконки в CamelCase 

## Доступные иконки

### Иконки 12×12

| Название | Селектор | Описание |
|----------|----------|----------|
| Quote | tgui-icon12-quote | Кавычки для цитирования |

### Иконки 16×16

| Название | Селектор | Описание |
|----------|----------|----------|
| Cancel | tgui-icon16-cancel | Крестик для закрытия или отмены действия |
| Chevron | tgui-icon16-chevron | Стрелка-шеврон для навигации или раскрытия |

### Иконки 20×20

| Название | Селектор | Описание |
|----------|----------|----------|
| ChevronDown | tgui-icon20-chevron-down | Стрелка вниз для раскрывающихся списков |
| Copy | tgui-icon20-copy | Иконка копирования |
| QuestionMark | tgui-icon20-question-mark | Знак вопроса для подсказок и справки |
| Select | tgui-icon20-select | Галочка для отметки выбранных элементов |
| SelectIos | tgui-icon20-select-ios | Галочка в стиле iOS |

### Иконки 24×24

| Название | Селектор | Описание |
|----------|----------|----------|
| Cancel | tgui-icon24-cancel | Крестик для закрытия или отмены действия |
| Channel | tgui-icon24-channel | Иконка канала связи |
| Chat | tgui-icon24-chat | Иконка чата/сообщений |
| ChevronDown | tgui-icon24-chevron-down | Стрелка вниз для раскрывающихся списков |
| ChevronLeft | tgui-icon24-chevron-left | Стрелка влево для навигации |
| ChevronRight | tgui-icon24-chevron-right | Стрелка вправо для навигации |
| Close | tgui-icon24-close | Иконка закрытия |
| Notifications | tgui-icon24-notifications | Иконка уведомлений |
| PersonRemove | tgui-icon24-person-remove | Иконка удаления пользователя |
| QR | tgui-icon24-qr | QR код |
| SunLow | tgui-icon24-sun-low | Иконка солнца (низкой яркости) |

### Иконки 28×28

| Название | Селектор | Описание |
|----------|----------|----------|
| AddCircle | tgui-icon28-add-circle | Иконка добавления в круге |
| Archive | tgui-icon28-archive | Иконка архива |
| Attach | tgui-icon28-attach | Иконка вложения |
| Chat | tgui-icon28-chat | Иконка чата/сообщений |
| Close | tgui-icon28-close | Иконка закрытия |
| CloseAmbient | tgui-icon28-close-ambient | Иконка закрытия с подсветкой |
| Devices | tgui-icon28-devices | Иконка устройств |
| Edit | tgui-icon28-edit | Иконка редактирования |
| Heart | tgui-icon28-heart | Иконка сердца |
| Stats | tgui-icon28-stats | Иконка статистики |

### Иконки 32×32

| Название | Селектор | Описание |
|----------|----------|----------|
| ProfileColoredSquare | tgui-icon32-profile-colored-square | Цветной квадрат с информацией профиля |

### Иконки 36×36

| Название | Селектор | Описание |
|----------|----------|----------|
| Backspace | tgui-icon36-backspace | Иконка клавиши backspace | 