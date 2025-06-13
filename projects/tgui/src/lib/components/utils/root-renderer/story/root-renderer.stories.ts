import { type Meta, type StoryObj } from '@storybook/angular';
import { RootRendererComponent } from '../root-renderer.component';

// Component meta information
const meta: Meta<RootRendererComponent> = {
  title: 'Service/RootRenderer',
  component: RootRendererComponent,
  tags: ['autodocs'],
  // No decorator for adding tgui-root here, as it's already added globally
  parameters: {
    // Special parameter for this story to explain how the portal works
    docs: {
      description: {
        component: `
          RootRenderer component allows rendering content outside the normal DOM hierarchy, in a special portal container.
          This is useful for creating modal windows, overlays, popup notifications and other UI elements 
          that should be displayed above the main content.
          
          The component uses PortalService to get a reference to the portal container created in tgui-root.
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj<RootRendererComponent>;

// Basic example
export const Default: Story = {
  name: 'Basic Example',
  render: (args) => ({
    props: args,
    template: `
      <div style="position: relative;">
        <h3>Main Content</h3>
        <p>This content is in the normal DOM flow</p>
        
        <tgui-root-renderer>
          <div style="background-color: #e0f7fa; padding: 10px; border-radius: 4px; margin-top: 10px;">
            <h4>Content in Portal</h4>
            <p>This content is rendered in the portal container</p>
            <button>Button in Portal</button>
          </div>
        </tgui-root-renderer>
        
        <p style="margin-top: 10px;">Text after RootRenderer component in normal DOM</p>
      </div>
      
      <div style="margin-top: 20px; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>Portal Container (content renders here ⤵)</h4>
        <div class="tgui-portal-container" style="min-height: 50px; border: 1px dashed #999; padding: 10px; border-radius: 4px;"></div>
      </div>
    `
  })
};

// Example with multiple elements
export const WithMultipleElements: Story = {
  name: 'Multiple Elements',
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p>Demonstration of multiple elements in portal:</p>
        
        <tgui-root-renderer>
          <div style="background-color: #ffebee; padding: 10px; margin-bottom: 10px; border-radius: 4px;">
            <h4>First Element in Portal</h4>
            <p>First element rendered in the portal container</p>
          </div>
          <div style="background-color: #e8f5e9; padding: 10px; border-radius: 4px;">
            <h4>Second Element in Portal</h4>
            <p>Second element rendered in the portal container</p>
          </div>
        </tgui-root-renderer>
        
        <p style="margin-top: 10px;">Normal content after RootRenderer</p>
      </div>
      
      <div style="margin-top: 20px; padding: 10px; background-color: #f5f5f5; border-radius: 4px;">
        <h4>Portal Container (content renders here ⤵)</h4>
        <div class="tgui-portal-container" style="min-height: 100px; border: 1px dashed #999; padding: 10px; border-radius: 4px;"></div>
      </div>
    `
  })
}; 