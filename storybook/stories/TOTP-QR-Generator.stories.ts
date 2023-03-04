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

import { Meta } from '@storybook/react';

import { argTypes } from './argTypes';
import { defaultArgs } from './defaultArgs';
import { StoryArgs } from './StoryArgs';
import { Decorator } from './Decorator';
import '@shko.online/totp-qr-generator/TOTP-QR-Generator/style.css';

export default {
  title: 'TOTP QR Generator/TOTP QR Generator',
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes,
  args: defaultArgs,
  decorators: [Decorator],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/html/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta<StoryArgs>;

export { Default as TOTPQRGenerator } from './Default';

