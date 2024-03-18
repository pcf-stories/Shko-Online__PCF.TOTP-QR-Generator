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

import React from 'react';

import type { IAppProps } from './App.types';

import QRCode from 'react-qr-code';

const App = ({ disabled, setNewSecret, value, visible }: IAppProps) =>
  visible ? (
    <div>
      <div className="totp.qr.container">
        <QRCode className="totp.qr.image" value={value} />
        <button
          type="button"
          className="totp.qr.overlay"
          disabled={disabled}
          onClick={() => {
            setNewSecret();
          }}
        >
          Click to generate new secret!
        </button>
      </div>
    </div>
  ) : (
    <></>
  );

export default App;

