#!/bin/bash

# Базовые пути
STORY_DIR="projects/tgui/src/stories"
COMPONENTS_DIR="projects/tgui/src/lib/core/components"

# Создаем директории для истории компонентов в каждой папке компонента
create_story_dirs() {
  # Компоненты в blocks
  mkdir -p "$COMPONENTS_DIR/blocks/button/story"
  mkdir -p "$COMPONENTS_DIR/blocks/avatar/story"
  mkdir -p "$COMPONENTS_DIR/blocks/avatar-stack/story"
  mkdir -p "$COMPONENTS_DIR/blocks/card/story"
  mkdir -p "$COMPONENTS_DIR/blocks/section/story"
  mkdir -p "$COMPONENTS_DIR/blocks/badge/story"
  
  # Компоненты в typography
  mkdir -p "$COMPONENTS_DIR/typography/text/story"
  mkdir -p "$COMPONENTS_DIR/typography/headline/story"
  mkdir -p "$COMPONENTS_DIR/typography/title/story"
  mkdir -p "$COMPONENTS_DIR/typography/large-title/story"
  mkdir -p "$COMPONENTS_DIR/typography/subheadline/story"
  mkdir -p "$COMPONENTS_DIR/typography/caption/story"
  mkdir -p "$COMPONENTS_DIR/typography/story"
  
  # Компоненты в feedback
  mkdir -p "$COMPONENTS_DIR/feedback/spinner/story"
  
  # Компоненты в service
  mkdir -p "$COMPONENTS_DIR/service/tappable/components/ripple/story"
  
  # Компоненты в misc
  mkdir -p "$COMPONENTS_DIR/misc/divider/story"
  
  # Компоненты в form
  mkdir -p "$COMPONENTS_DIR/form/chip/story"
}

# Функция для обновления импортов в файле истории
update_imports() {
  local story_file=$1
  local component_type=$2
  local component_name=$3
  
  # Читаем содержимое файла
  content=$(cat "$story_file")
  
  case "$component_type" in
    "blocks")
      # Обновляем импорт для блоков
      if [[ "$component_name" == "avatar-stack" ]]; then
        content=$(echo "$content" | sed "s|import { AvatarStackComponent } from '../lib/core/components/avatar-stack/avatar-stack.component';|import { AvatarStackComponent } from '../avatar-stack.component';|g")
        content=$(echo "$content" | sed "s|import { AvatarComponent } from '../lib/core/components/avatar/avatar.component';|import { AvatarComponent } from '../../avatar/avatar.component';|g")
      elif [[ "$component_name" == "avatar" ]]; then
        content=$(echo "$content" | sed "s|import { AvatarComponent, AvatarBadgeComponent } from '../lib/core/components/avatar';|import { AvatarComponent, AvatarBadgeComponent } from '../';|g")
      elif [[ "$component_name" == "button" ]]; then
        content=$(echo "$content" | sed "s|import { ButtonComponent } from '../lib/core/components/button/button.component';|import { ButtonComponent } from '../button.component';|g")
        content=$(echo "$content" | sed "s|import { SpinnerComponent } from '../lib/core/components/spinner/spinner.component';|import { SpinnerComponent } from '../../../../components/feedback/spinner/spinner.component';|g")
        content=$(echo "$content" | sed "s|import { RippleComponent } from '../lib/core/components/ripple/ripple.component';|import { RippleComponent } from '../../../../components/service/tappable/components/ripple/ripple.component';|g")
      elif [[ "$component_name" == "card" ]]; then
        content=$(echo "$content" | sed "s|import { CardComponent } from '../lib/core/components/blocks/card/card.component';|import { CardComponent } from '../card.component';|g")
      elif [[ "$component_name" == "section" ]]; then
        content=$(echo "$content" | sed "s|import { SectionComponent } from '../lib/core/components/blocks/section/section.component';|import { SectionComponent } from '../section.component';|g")
      fi
      ;;
    "typography")
      # Обновляем импорт для типографики
      case "$component_name" in
        "text")
          content=$(echo "$content" | sed "s|import { TextComponent } from '../lib/core/components/typography/text/text.component';|import { TextComponent } from '../text.component';|g")
          ;;
        "headline")
          content=$(echo "$content" | sed "s|import { HeadlineComponent } from '../lib/core/components/typography/headline/headline.component';|import { HeadlineComponent } from '../headline.component';|g")
          ;;
        "title")
          content=$(echo "$content" | sed "s|import { TitleComponent } from '../lib/core/components/typography/title/title.component';|import { TitleComponent } from '../title.component';|g")
          ;;
        "large-title")
          content=$(echo "$content" | sed "s|import { LargeTitleComponent } from '../lib/core/components/typography/large-title/large-title.component';|import { LargeTitleComponent } from '../large-title.component';|g")
          ;;
        "subheadline")
          content=$(echo "$content" | sed "s|import { SubheadlineComponent } from '../lib/core/components/typography/subheadline/subheadline.component';|import { SubheadlineComponent } from '../subheadline.component';|g")
          ;;
        "caption")
          content=$(echo "$content" | sed "s|import { CaptionComponent } from '../lib/core/components/typography/caption/caption.component';|import { CaptionComponent } from '../caption.component';|g")
          ;;
        "typography")
          content=$(echo "$content" | sed "s|import { TypographyComponent } from '../lib/core/components/typography/typography.component';|import { TypographyComponent } from '../typography.component';|g")
          ;;
      esac
      ;;
    "feedback")
      # Обновляем импорт для feedback компонентов
      if [[ "$component_name" == "spinner" ]]; then
        content=$(echo "$content" | sed "s|import { SpinnerComponent } from '../lib/core/components/spinner/spinner.component';|import { SpinnerComponent } from '../spinner.component';|g")
      fi
      ;;
    "service")
      # Обновляем импорт для service компонентов
      if [[ "$component_name" == "ripple" ]]; then
        content=$(echo "$content" | sed "s|import { RippleComponent } from '../lib/core/components/ripple/ripple.component';|import { RippleComponent } from '../ripple.component';|g")
      fi
      ;;
    "misc")
      # Обновляем импорт для misc компонентов
      if [[ "$component_name" == "divider" ]]; then
        content=$(echo "$content" | sed "s|import { DividerComponent } from '../lib/core/components/misc/divider/divider.component';|import { DividerComponent } from '../divider.component';|g")
      fi
      ;;
    "form")
      # Обновляем импорт для form компонентов
      if [[ "$component_name" == "chip" ]]; then
        content=$(echo "$content" | sed "s|import { ChipComponent } from '../lib/core/components/form/chip/chip.component';|import { ChipComponent } from '../chip.component';|g")
      fi
      ;;
  esac
  
  # Записываем обновленное содержимое
  echo "$content" > "$story_file"
}

# Перемещаем и обновляем файлы историй
move_and_update_stories() {
  # Компоненты blocks
  cp "$STORY_DIR/button.stories.ts" "$COMPONENTS_DIR/blocks/button/story/" && update_imports "$COMPONENTS_DIR/blocks/button/story/button.stories.ts" "blocks" "button"
  cp "$STORY_DIR/avatar.stories.ts" "$COMPONENTS_DIR/blocks/avatar/story/" && update_imports "$COMPONENTS_DIR/blocks/avatar/story/avatar.stories.ts" "blocks" "avatar"
  cp "$STORY_DIR/avatar-stack.stories.ts" "$COMPONENTS_DIR/blocks/avatar-stack/story/" && update_imports "$COMPONENTS_DIR/blocks/avatar-stack/story/avatar-stack.stories.ts" "blocks" "avatar-stack"
  cp "$STORY_DIR/card.stories.ts" "$COMPONENTS_DIR/blocks/card/story/" && update_imports "$COMPONENTS_DIR/blocks/card/story/card.stories.ts" "blocks" "card"
  
  # Компоненты typography
  cp "$STORY_DIR/text.stories.ts" "$COMPONENTS_DIR/typography/text/story/" && update_imports "$COMPONENTS_DIR/typography/text/story/text.stories.ts" "typography" "text"
  cp "$STORY_DIR/headline.stories.ts" "$COMPONENTS_DIR/typography/headline/story/" && update_imports "$COMPONENTS_DIR/typography/headline/story/headline.stories.ts" "typography" "headline"
  cp "$STORY_DIR/title.stories.ts" "$COMPONENTS_DIR/typography/title/story/" && update_imports "$COMPONENTS_DIR/typography/title/story/title.stories.ts" "typography" "title"
  cp "$STORY_DIR/large-title.stories.ts" "$COMPONENTS_DIR/typography/large-title/story/" && update_imports "$COMPONENTS_DIR/typography/large-title/story/large-title.stories.ts" "typography" "large-title"
  cp "$STORY_DIR/subheadline.stories.ts" "$COMPONENTS_DIR/typography/subheadline/story/" && update_imports "$COMPONENTS_DIR/typography/subheadline/story/subheadline.stories.ts" "typography" "subheadline"
  cp "$STORY_DIR/caption.stories.ts" "$COMPONENTS_DIR/typography/caption/story/" && update_imports "$COMPONENTS_DIR/typography/caption/story/caption.stories.ts" "typography" "caption"
  cp "$STORY_DIR/typography.stories.ts" "$COMPONENTS_DIR/typography/story/" && update_imports "$COMPONENTS_DIR/typography/story/typography.stories.ts" "typography" "typography"
  cp "$STORY_DIR/typography-base.stories.ts" "$COMPONENTS_DIR/typography/story/" && update_imports "$COMPONENTS_DIR/typography/story/typography-base.stories.ts" "typography" "typography"
  
  # Компоненты feedback
  cp "$STORY_DIR/spinner.stories.ts" "$COMPONENTS_DIR/feedback/spinner/story/" && update_imports "$COMPONENTS_DIR/feedback/spinner/story/spinner.stories.ts" "feedback" "spinner"
  
  # Компоненты service
  cp "$STORY_DIR/ripple.stories.ts" "$COMPONENTS_DIR/service/tappable/components/ripple/story/" && update_imports "$COMPONENTS_DIR/service/tappable/components/ripple/story/ripple.stories.ts" "service" "ripple"
}

# Создаем директории для историй
create_story_dirs

# Перемещаем и обновляем истории
move_and_update_stories

echo "Истории успешно перенесены и обновлены" 