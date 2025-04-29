import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { 
  TypographyComponent,
  TextComponent,
  CaptionComponent,
  HeadlineComponent,
  LargeTitleComponent,
  SubheadlineComponent,
  TitleComponent
} from '@typography/index';

// Meta для общего введения о типографике
const meta: Meta<TypographyComponent> = {
  title: 'Typography/Introduction',
  component: TypographyComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        TypographyComponent,
        TextComponent,
        CaptionComponent,
        HeadlineComponent,
        LargeTitleComponent,
        SubheadlineComponent,
        TitleComponent
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<TypographyComponent>;

// Общее введение с демонстрацией всех компонентов
export const TypographyOverview: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h2 style="margin-bottom: 16px;">Система типографики TGUI</h2>
          <p style="max-width: 800px; margin-bottom: 24px;">
            TGUI предоставляет набор компонентов для обеспечения единообразной и гибкой типографики в приложении. 
            Все компоненты типографики наследуются от базового <code>TypographyComponent</code> и имеют общие свойства: 
            <code>weight</code> (для управления жирностью шрифта), <code>caps</code> (для трансформации в верхний регистр) 
            и <code>plain</code> (для управления отступами).
          </p>
        </div>

        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h3 style="margin-bottom: 12px;">LargeTitle - для основных заголовков (h1)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-large-title level="1">LargeTitle Level 1 (default)</tgui-large-title>
            <tgui-large-title level="2">LargeTitle Level 2 (smaller)</tgui-large-title>
          </div>
        </div>

        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h3 style="margin-bottom: 12px;">Title - для заголовков разных уровней (h2-h4)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-title level="1">Title Level 1 (h2)</tgui-title>
            <tgui-title level="2">Title Level 2 (h3)</tgui-title>
            <tgui-title level="3">Title Level 3 (h4)</tgui-title>
          </div>
        </div>

        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h3 style="margin-bottom: 12px;">Headline - для подзаголовков (h5)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-headline level="1">Headline Level 1 (default)</tgui-headline>
            <tgui-headline level="2">Headline Level 2 (smaller)</tgui-headline>
          </div>
        </div>

        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h3 style="margin-bottom: 12px;">Subheadline - для дополнительных подзаголовков (h6)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-subheadline level="1">Subheadline Level 1 (default)</tgui-subheadline>
            <tgui-subheadline level="2">Subheadline Level 2 (smaller)</tgui-subheadline>
          </div>
        </div>

        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h3 style="margin-bottom: 12px;">Text - для основного текста</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-text level="1">Text Level 1 (default) - для основного текста в приложении</tgui-text>
            <tgui-text level="2">Text Level 2 (smaller) - для менее важного или вспомогательного текста</tgui-text>
          </div>
        </div>

        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h3 style="margin-bottom: 12px;">Caption - для мелкого текста и подписей</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-caption level="1">Caption Level 1 (default) - для подписей и вспомогательного текста</tgui-caption>
            <tgui-caption level="2">Caption Level 2 (smaller) - для самого мелкого текста, сносок или пояснений</tgui-caption>
          </div>
        </div>

        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h3 style="margin-bottom: 12px;">Типографика с разными весами (weights)</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-text weight="1">Text с weight="1" (Bold)</tgui-text>
            <tgui-text weight="2">Text с weight="2" (Medium/Semibold)</tgui-text>
            <tgui-text weight="3">Text с weight="3" (Regular)</tgui-text>
          </div>
        </div>

        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h3 style="margin-bottom: 12px;">Другие стилевые опции</h3>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <tgui-text [caps]="true">Текст в верхнем регистре (caps=true)</tgui-text>
            <tgui-text [plain]="false">Текст без удаления отступов (plain=false)</tgui-text>
          </div>
        </div>
      </div>
    `,
  }),
}; 
