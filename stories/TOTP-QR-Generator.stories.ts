/*
   Copyright 2023 Betim Beja and Shko Online LLC

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import type { ArgTypes, Meta, StoryObj } from '@storybook/html';

import type { IInputs, IOutputs } from '../TOTP-QR-Generator/generated/ManifestTypes';

import { useArgs, useEffect } from "@storybook/preview-api";

import { ComponentFrameworkMockGenerator, StringPropertyMock } from '@shko.online/componentframework-mock';

import { TOTPQRGenerator as Component } from '../TOTP-QR-Generator/index';

import resource from 'raw-loader!!../TOTP-QR-Generator/strings/TOTPQRGenerator.1033.resx';
const xmlResource = new DOMParser().parseFromString(resource, 'text/xml');
const elements = xmlResource.getElementsByTagNameNS('', 'data');
const getFromResource = (key: string) => {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].getAttribute('name') === key) {
      return elements[i].getElementsByTagName('value')[0].innerHTML?.trim();
    }
  }
};

const application_Name = getFromResource('Application_Display_Key');
let application_Description = getFromResource('Application_Desc_Key');
const secret_Name = getFromResource('Secret_Display_Key');
let secret_Description = getFromResource('Secret_Desc_Key');
const user_Name = getFromResource('User_Display_Key');
let user_Description = getFromResource('User_Desc_Key');

const argTypes: Partial<ArgTypes<StoryArgs>> = {
  isDisabled: {
    name: 'Disabled',
    table: {
      category: 'Mode',
      defaultValue: { summary: 'false' },
    },
  },
  isVisible: {
    name: 'Visible',
    table: {
      category: 'Mode',
      defaultValue: { summary: 'true' },
    },
  },
  Application: {
    name: application_Name,
    description: application_Description,
    control: 'text',
    table: {
      category: 'Parameters',
    },
  },
  Secret: {
    name: secret_Name,
    description: secret_Description,
    control: 'text',
    table: {
      category: 'Parameters',
    },
  },
  User: {
    name: user_Name,
    description: user_Description,
    control: 'text',
    table: {
      category: 'Parameters',
    },
  },
};



import '../TOTP-QR-Generator/style.css';

export interface StoryArgs {
    Application: string;
    isVisible: boolean;
    isDisabled: boolean;
    Secret: string;
    User: string;
  }

// This defines your component's Story
export default {
    title: 'TOTP QR Generator/TOTP QR Generator',
  // Note: ArgTypes controls the way inputs are rendered in the Controls addon.
  argTypes,
  // Note: you can define the default arguments of all the stories related to this component here
  args: {
    Application: 'shko.online',
    isVisible: true,
    isDisabled: false,
    Secret: 'LUFCAKIIEUTTA7RQ',
    User: 'sales@shko.online'
  },
  decorators: [
    // Note: You can control the div assigned to your PCF component here.
    // Also, you can make this div resizable if you want to test trackContainerResize
    (Story) => {
      var container = document.createElement('div');
      container.style.margin = '2em';
      container.style.padding = '1em';
      container.style.maxWidth = '350px';
      container.style.border = 'dotted 1px';

      var storyResult = Story();
      if (typeof storyResult == 'string') {
        container.innerHTML = storyResult;
      } else {
        container.appendChild(storyResult);
      }
      return container;
    },
  ],
} as Meta<StoryArgs>;

// This render generator is used to control how the component is rendered for each story.
// With the help of ComponentFrameworkGenerator you can run your component with a fake version
// of the ComponentFramework API
const renderGenerator = () => {
  let container: HTMLDivElement | null;
  let mockGenerator: ComponentFrameworkMockGenerator<IInputs, IOutputs>;

  return function () {
    const [args, updateArgs] = useArgs<StoryArgs>();
    // Fires on unload story
    useEffect(
      () => () => {
        container = null;
        mockGenerator.control.destroy();
      },
      []
    );
    if (!container) {
      container = document.createElement('div');
      container.className = "";
      mockGenerator = new ComponentFrameworkMockGenerator(
        Component,
        {
          Application: StringPropertyMock,
          Secret: StringPropertyMock,
          User: StringPropertyMock,
        },
        container,
      );
  
      mockGenerator.context.mode.isControlDisabled = args.isDisabled;
      mockGenerator.context.mode.isVisible = args.isVisible;
      mockGenerator.context._SetCanvasItems({
        Application: args.Application,
        Secret: args.Secret,
        User: args.User,
      });
  
      mockGenerator.onOutputChanged.callsFake(() => {
        mockGenerator.context._parameters.Secret._Refresh();
        updateArgs({ Secret: mockGenerator.context._parameters.Secret.raw || undefined });
      });
  
      mockGenerator.ExecuteInit();
    }

    if (mockGenerator) {
        mockGenerator.context.mode.isVisible = args.isVisible;
        mockGenerator.context.mode.isControlDisabled = args.isDisabled;
        mockGenerator.context._parameters.Application._SetValue(args.Application);
        mockGenerator.context._parameters.Secret._SetValue(args.Secret);
        mockGenerator.context._parameters.User._SetValue(args.User);
        mockGenerator.ExecuteUpdateView();
    }

    return container;
  };
};

// This is a particular configuration of you component. You can export different StoryObj objects
// to show different states of your component
export const TOTPQRGenerator = {
  render: renderGenerator(),
  parameters: { controls: { expanded: true } },
} as StoryObj<StoryArgs>;
