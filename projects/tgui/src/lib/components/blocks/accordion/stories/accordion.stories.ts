import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { Component } from '@angular/core';

import { AccordionComponent } from '../accordion.component';
import { SectionComponent } from '../../section/section.component';
import { BlockquoteComponent } from '../../blockquote/blockquote.component';
import { BadgeComponent } from '../../badge/badge.component';
import { TextComponent } from '../../../typography/text/text.component';

@Component({
  selector: 'tgui-playground-story',
  standalone: true,
  imports: [
    AccordionComponent,
    SectionComponent,
    BlockquoteComponent
  ],
  template: `
    <tgui-section style="background: var(--tgui--secondary_bg_color); padding: 20px; width: 358px;">
      <!-- Example with string summary -->
      <tgui-accordion 
        summary="Simple string title"
        style="margin-bottom: 16px"
      >
        <div style="padding: 10px 20px 20px;">
          <p>This accordion uses a simple string as its summary.</p>
        </div>
      </tgui-accordion>

      <!-- Example with template summary -->
      <tgui-accordion 
        [summary]="summaryTpl"
      >
        <div style="padding: 10px 20px 20px;">
          <tgui-blockquote>
            The accordion's basic form is believed to have been invented in Berlin, in 1822,
            by Christian Friedrich Ludwig Buschmann, although one instrument was discovered in 2006
            that appears to have been built earlier. The earliest history of the accordion in Russia is poorly documented.
          </tgui-blockquote>
        </div>
      </tgui-accordion>
    </tgui-section>

    <ng-template #summaryTpl>
      <span style="font-weight: bold">Template summary with custom styling</span>
    </ng-template>
  `
})
class PlaygroundStoryComponent {}

@Component({
  selector: 'tgui-multiple-accordions-story',
  standalone: true,
  imports: [
    AccordionComponent,
    SectionComponent,
    TextComponent
  ],
  template: `
    <tgui-section style="background: var(--tgui--secondary_bg_color); padding: 20px; margin-bottom: 20px;">
      <div style="padding: 16px;">
        <tgui-text>Basic section content</tgui-text>
      </div>

      <tgui-accordion 
        style="margin-bottom: 8px"
        summary="First accordion"
      >
        <div style="padding: 10px 20px 20px;">
          <p>This is the content of the first accordion.</p>
        </div>
      </tgui-accordion>
      
      <tgui-accordion 
        style="margin-bottom: 8px"
        summary="Second accordion"
      >
        <div style="padding: 10px 20px 20px;">
          <p>This is the content of the second accordion.</p>
        </div>
      </tgui-accordion>
      
      <tgui-accordion 
        summary="Third accordion"
      >
        <div style="padding: 10px 20px 20px;">
          <p>This is the content of the third accordion.</p>
        </div>
      </tgui-accordion>
    </tgui-section>
    
    <tgui-section style="background: var(--tgui--secondary_bg_color); padding: 20px;">
      <div style="padding: 16px;">
        <tgui-text>Multiple accordions</tgui-text>
      </div>        

      <tgui-accordion summary="Parent accordion">
        <div style="padding: 10px 20px 20px;">
          <p>This is the content of the parent accordion.</p>
          
          <tgui-accordion 
            style="margin-top: 16px"
            summary="Nested accordion"
          >
            <div style="padding: 10px 20px 20px;">
              <p>This is the content of the nested accordion.</p>
              <p>The chevron icon should only respond to its direct parent accordion state.</p>
            </div>
          </tgui-accordion>
        </div>
      </tgui-accordion>
    </tgui-section>
  `
})
class MultipleAccordionsStoryComponent {}

@Component({
  selector: 'tgui-custom-after-template-story',
  standalone: true,
  imports: [
    AccordionComponent,
    SectionComponent,
    BadgeComponent
  ],
  template: `
    <tgui-section style="background: var(--tgui--secondary_bg_color); padding: 20px; width: 358px;">
      <tgui-accordion 
        summary="Accordion with custom after template"
        [afterTemplate]="customAfterTemplate"
      >
        <div style="padding: 10px 20px 20px;">
          <p>This accordion uses a custom after template instead of the default chevron.</p>
          <p>You can put any template content in the after slot, like badges, buttons, or other components.</p>
        </div>
      </tgui-accordion>
      
      <!-- Default accordion for comparison -->
      <tgui-accordion 
        style="margin-top: 16px"
        summary="Default accordion (with chevron)"
      >
        <div style="padding: 10px 20px 20px;">
          <p>This is a default accordion with the standard chevron icon.</p>
        </div>
      </tgui-accordion>
    </tgui-section>

    <ng-template #customAfterTemplate>
      <tgui-badge type="number">5</tgui-badge>
    </ng-template>
  `
})
class CustomAfterTemplateStoryComponent {}

const meta: Meta<AccordionComponent> = {
  title: 'Blocks/Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        PlaygroundStoryComponent,
        MultipleAccordionsStoryComponent,
        CustomAfterTemplateStoryComponent
      ]
    })
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Playground: Story = {
  render: (args) => ({
    props: args,
    template: '<tgui-playground-story />'
  })
};

export const MultipleAccordions: Story = {
  render: (args) => ({
    props: args,
    template: '<tgui-multiple-accordions-story />'
  })
};

export const CustomAfterTemplate: Story = {
  render: (args) => ({
    props: args,
    template: '<tgui-custom-after-template-story />'
  })
}; 