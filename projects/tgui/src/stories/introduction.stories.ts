import { Component } from '@angular/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
  selector: 'tgui-introduction',
  template: `
    <div class="introduction">
      <h1>Welcome to TGUI for Angular</h1>
      <p>This is the Angular implementation of the Telegram UI components for Web App development.</p>
      
      <h2>Getting Started</h2>
      <p>Check out the documentation for individual components or see the "Getting Started" guide for 
      installation instructions.</p>
      
      <h2>Features</h2>
      <ul>
        <li>Theme support (light/dark)</li>
        <li>Platform detection (iOS/base)</li>
        <li>Telegram Web App integration</li>
        <li>No wrapper component required</li>
      </ul>
      
      <h2>Component Organization</h2>
      <p>Each component's stories are now co-located with the component itself in a <code>story</code> folder:</p>
      <ul>
        <li>Avatar: <code>src/lib/core/components/blocks/avatar/story/</code></li>
        <li>Button: <code>src/lib/core/components/blocks/button/story/</code></li>
        <li>Typography: <code>src/lib/core/components/typography/text/story/</code> (and others)</li>
      </ul>
      <p>This organization improves discoverability and makes maintenance easier.</p>
    </div>
  `,
  styles: [`
    .introduction {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    h1 {
      margin-bottom: 16px;
    }
    h2 {
      margin-top: 24px;
      margin-bottom: 12px;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin-bottom: 8px;
    }
    code {
      background-color: rgba(0, 0, 0, 0.05);
      padding: 2px 4px;
      border-radius: 3px;
      font-family: monospace;
    }
  `],
  standalone: true
})
export class IntroductionComponent {}

// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<IntroductionComponent> = {
  title: 'Introduction',
  component: IntroductionComponent,
  decorators: [
    moduleMetadata({
      imports: [IntroductionComponent]
    })
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<IntroductionComponent>;

export const Default: Story = {}; 