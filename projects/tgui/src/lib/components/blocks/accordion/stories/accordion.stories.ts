import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { AccordionComponent } from '../accordion.component';
import { AccordionSummaryComponent } from '../components/accordion-summary/accordion-summary.component';
import { AccordionContentComponent } from '../components/accordion-content/accordion-content.component';
import { SectionComponent } from '../../section/section.component';
import { BlockquoteComponent } from '../../blockquote/blockquote.component';

const meta: Meta<AccordionComponent> = {
  title: 'Blocks/Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        AccordionComponent, 
        AccordionSummaryComponent, 
        AccordionContentComponent,
        SectionComponent,
        BlockquoteComponent
      ],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Playground: Story = {
  render: () => ({
    props: {
      expanded: false,
      toggleExpanded: function() {
        this['expanded'] = !this['expanded'];
      },
    },
    template: `
      <tgui-section style="background: var(--tgui--secondary_bg_color); padding: 20px; width: 358px;">
        <tgui-accordion [expanded]="expanded" (expandedChange)="toggleExpanded()">
          <tgui-accordion-summary>
            History of accordion
          </tgui-accordion-summary>
          <tgui-accordion-content>
            <div style="padding: 10px 20px 20px;">
              <tgui-blockquote>
                The accordion's basic form is believed to have been invented in Berlin, in 1822,
                by Christian Friedrich Ludwig Buschmann, although one instrument was discovered in 2006
                that appears to have been built earlier. The earliest history of the accordion in Russia is poorly documented.
              </tgui-blockquote>
            </div>
          </tgui-accordion-content>
        </tgui-accordion>
      </tgui-section>
    `
  }),
  args: {
    expanded: false
  }
};

export const MultipleAccordions: Story = {
  render: () => ({
    props: {
      accordion1: false,
      accordion2: false,
      accordion3: false,
      nestedAccordion: false,
      
      toggleAccordion1: function() {
        this['accordion1'] = !this['accordion1'];
      },
      toggleAccordion2: function() {
        this['accordion2'] = !this['accordion2'];
      },
      toggleAccordion3: function() {
        this['accordion3'] = !this['accordion3'];
      },
      toggleNestedAccordion: function() {
        this['nestedAccordion'] = !this['nestedAccordion'];
      }
    },
    template: `
      <tgui-section style="background: var(--tgui--secondary_bg_color); padding: 20px; margin-bottom: 20px;">
        <div style="padding: 16px;">
            <tgui-text>Basic section content</tgui-text>
          </div>
        <tgui-accordion [expanded]="accordion1" (expandedChange)="toggleAccordion1()" style="margin-bottom: 8px">
          <tgui-accordion-summary>
            First accordion
          </tgui-accordion-summary>
          <tgui-accordion-content>
            <div style="padding: 10px 20px 20px;">
              <p>This is the content of the first accordion.</p>
            </div>
          </tgui-accordion-content>
        </tgui-accordion>
        
        <tgui-accordion [expanded]="accordion2" (expandedChange)="toggleAccordion2()" style="margin-bottom: 8px">
          <tgui-accordion-summary>
            Second accordion
          </tgui-accordion-summary>
          <tgui-accordion-content>
            <div style="padding: 10px 20px 20px;">
              <p>This is the content of the second accordion.</p>
            </div>
          </tgui-accordion-content>
        </tgui-accordion>
        
        <tgui-accordion [expanded]="accordion3" (expandedChange)="toggleAccordion3()">
          <tgui-accordion-summary>
            Third accordion
          </tgui-accordion-summary>
          <tgui-accordion-content>
            <div style="padding: 10px 20px 20px;">
              <p>This is the content of the third accordion.</p>
            </div>
          </tgui-accordion-content>
        </tgui-accordion>
      </tgui-section>
      
      <tgui-section style="background: var(--tgui--secondary_bg_color); padding: 20px;">
          <div style="padding: 16px;">
            <tgui-text>Multiple accordions</tgui-text>
          </div>        
        <tgui-accordion>
          <tgui-accordion-summary>
            Parent accordion
          </tgui-accordion-summary>
          <tgui-accordion-content>
            <div style="padding: 10px 20px 20px;">
              <p>This is the content of the parent accordion.</p>
              
              <tgui-accordion  style="margin-top: 16px">
                <tgui-accordion-summary>
                  Nested accordion
                </tgui-accordion-summary>
                <tgui-accordion-content>
                  <div style="padding: 10px 20px 20px;">
                    <p>This is the content of the nested accordion.</p>
                    <p>The chevron icon should only respond to its direct parent accordion state.</p>
                  </div>
                </tgui-accordion-content>
              </tgui-accordion>
            </div>
          </tgui-accordion-content>
        </tgui-accordion>
      </tgui-section>
    `
  })
}; 