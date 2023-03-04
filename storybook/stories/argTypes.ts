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

import { ArgTypes } from '@storybook/react';
import { StoryArgs } from './StoryArgs';

import resource from 'raw-loader!!@shko.online/totp-qr-generator/TOTP-QR-Generator/strings/TOTPQRGenerator.1033.resx';
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

export const argTypes: Partial<ArgTypes<StoryArgs>> = {
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
    type: 'string',
    table: {
      category: 'Parameters',
    },
  },
  Secret: {
    name: secret_Name,
    description: secret_Description,
    type: 'string',
    table: {
      category: 'Parameters',
    },
  },
  User: {
    name: user_Name,
    description: user_Description,
    type: 'string',
    table: {
      category: 'Parameters',
    },
  },
};

