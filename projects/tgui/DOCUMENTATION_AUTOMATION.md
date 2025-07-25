# API Documentation Automation

Эта система автоматически генерирует API документацию для библиотеки TGUI Angular и включает её в сборку пакета.

## 📋 Что генерируется

### 1. `documentation.json` (2.1MB)
- Полные метаданные всех компонентов, сервисов, директив и интерфейсов
- Извлекается из TypeScript исходного кода через Compodoc
- Содержит типы, описания, примеры из JSDoc комментариев
- **Оптимизирован для сборки** (без Storybook зависимостей)

### 2. `API_REFERENCE.md` (80KB)
- Человеко-читаемая документация в Markdown формате
- Автоматически сгруппированная по категориям компонентов
- Включает примеры использования и свойства
- **Предназначена для AI** и разработчиков

### 3. `API_SCHEMA.json` (141KB)
- Структурированная JSON схема для машинного чтения
- Типизированная информация о всех API элементах
- **Оптимизирована для AI** и автоматизации

## 🚀 Как это работает

### Автоматическая генерация при сборке:

```bash
# При выполнении команды build
npm run build
```

**Процесс:**
1. 📖 `generate-docs.js` → Запускает Compodoc для анализа TypeScript кода
2. 🔄 Парсит полученный `documentation.json`
3. 📝 Генерирует `API_REFERENCE.md` с группировкой и примерами
4. 🔧 Создает `API_SCHEMA.json` с типизированной схемой
5. 📦 Angular копирует все файлы в `dist/` при сборке пакета

### Доступные команды:

```bash
# Только генерация документации
npm run generate-docs

# Сборка библиотеки с документацией (по умолчанию)
npm run build

# Сборка библиотеки без документации (быстрая)
npm run build:lib-only
```

## 📁 Структура файлов

```
projects/tgui/
├── scripts/
│   ├── generate-docs.js     # Главный скрипт генерации
│   └── pre-build.js         # Проверка существования файлов
├── docs/                    # Генерируемые файлы (в .gitignore)
│   ├── documentation.json   # Полные метаданные от Compodoc
│   ├── API_REFERENCE.md     # Markdown документация для AI
│   ├── API_SCHEMA.json      # JSON схема для машинного чтения
│   └── .gitignore           # Исключает автогенерированные файлы
└── ng-package.json          # Включает docs/ в assets сборки
```

## 🔧 Конфигурация

### ng-package.json
```json
{
  "assets": [
    "./src/lib/styles/**/*.css",
    "./docs/documentation.json",
    "./docs/API_REFERENCE.md", 
    "./docs/API_SCHEMA.json"
  ]
}
```

### package.json
```json
{
  "scripts": {
    "build": "npm run generate-docs && ng build",
    "generate-docs": "node projects/tgui/scripts/generate-docs.js"
  }
}
```

## 📊 Размеры файлов

| Файл | Размер | Описание |
|------|--------|----------|
| `documentation.json` | 2.1MB | Полные метаданные (компактные, без Storybook) |
| `API_REFERENCE.md` | 80KB | Человеко-читаемая документация |
| `API_SCHEMA.json` | 141KB | Структурированная схема |

*Общий размер: ~2.3MB добавляется к сборке пакета*

## 🎯 Использование в опубликованном пакете

После установки `tgui-angular`, файлы документации доступны по путям:

```typescript
// В Node.js приложении
import fs from 'fs';
import path from 'path';

// Путь к документации в node_modules
const tguiPath = path.dirname(require.resolve('tgui-angular/package.json'));
const apiSchema = JSON.parse(fs.readFileSync(path.join(tguiPath, 'docs/API_SCHEMA.json'), 'utf8'));
const apiReference = fs.readFileSync(path.join(tguiPath, 'docs/API_REFERENCE.md'), 'utf8');

// Использование AI или анализ компонентов
console.log('Available components:', Object.keys(apiSchema.components));
```

## 🤖 Для AI ассистентов

API документация специально оптимизирована для использования AI:

### API_REFERENCE.md содержит:
- ✅ Полное описание всех компонентов с селекторами
- ✅ Типизированные свойства с описаниями
- ✅ Примеры использования для каждого компонента  
- ✅ Best practices и рекомендации
- ✅ Группировка по функциональным областям

### API_SCHEMA.json предоставляет:
- ✅ Машинно-читаемую структуру всех API элементов
- ✅ Типизированную информацию о свойствах
- ✅ Метаданные о файлах и зависимостях
- ✅ Связи между компонентами

## ⚡ Производительность

### Быстрая сборка (без документации):
```bash
npm run build:lib-only  # ~2-3 секунды
```

### Полная сборка (с документацией):
```bash
npm run build           # ~5-7 секунд (включая Compodoc)
```

### Кэширование:
- Документация генерируется только при необходимости
- Compodoc использует кэширование TypeScript компиляции
- При изменении только стилей документация не перегенерируется

## 🔄 Синхронизация с кодом

Документация **автоматически синхронизируется** с изменениями в коде:

- ✅ **Новые компоненты** автоматически добавляются
- ✅ **Изменения в свойствах** мгновенно отражаются  
- ✅ **JSDoc комментарии** включаются в описания
- ✅ **Типы TypeScript** точно извлекаются
- ✅ **Селекторы и имена** всегда актуальны

## 🛠 Техническая реализация

### Compodoc конфигурация:
```bash
npx compodoc \
  --tsconfig projects/tgui/tsconfig.lib.json \
  --exportFormat json \
  --disableSourceCode \     # Экономим размер
  --disableGraph \          # Убираем графы зависимостей  
  --disablePrivate \        # Только публичные API
  --hideGenerator           # Без метаданных генератора
```

### Парсинг и трансформация:
- Группировка компонентов по директориям
- Генерация примеров использования
- Извлечение типов и их описаний
- Создание структурированной схемы

Эта система обеспечивает всегда актуальную и полную документацию API, готовую к использованию как разработчиками, так и AI ассистентами. 