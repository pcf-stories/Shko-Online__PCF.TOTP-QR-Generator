import type { IInputs, IOutputs } from "./generated/ManifestTypes";
import type { Root } from "react-dom/client";

import { createElement } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { authenticator } from "otplib";

export class TOTPQRGenerator
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _application: string;
  private _notifyOutputChanged: () => void;
  private _root: Root;
  private _secret: string;
  private _user: string;
  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    this._notifyOutputChanged = notifyOutputChanged;
    this._root = createRoot(container);
    this._Render(context);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    this._Render(context);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      Secret: this._secret,
    };
  }

  public destroy(): void {}

  private _Render(context: ComponentFramework.Context<IInputs>): void {
    this._application = context.parameters.Application.raw || "";
    this._user = context.parameters.User.raw || "";
    this._secret = context.parameters.Secret.raw || "";

    const app = createElement(
      App,
      {
        value: this._GenerateUri(),
        setNewSecret: this._NewSecret.bind(this),
      },
      null
    );

    this._root.render(app);
  }

  private _GenerateUri(): string {
    return `otpauth://totp/${this._application}:${encodeURIComponent(
      this._user
    )}?secret=${this._secret}&issuer=${this._application}&algorithm=${
      authenticator.allOptions().algorithm
    }&digits=${authenticator.allOptions().digits}&period=${
      authenticator.allOptions().step
    }`;
  }

  private _NewSecret(): void {
    this._secret = authenticator.generateSecret();
    this._notifyOutputChanged();
  }
}
