import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { createElement } from "react";
import { render } from "react-dom";
import App from "./App";
import { generateSecret, generateUri } from "@sunknudsen/totp";

export class TOTPQRGenerator
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  private _notifyOutputChanged: () => void;
  private _container: HTMLDivElement;
  private user: string;
  private application: string;
  private secret: string;
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
    this.updateParameters(context);
    this._notifyOutputChanged = notifyOutputChanged;
    this._container = container;

    render(
      this.QRCodeGenerator(this.application, this.user, this.secret),
      container
    );
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    render(
      this.QRCodeGenerator(this.application, this.user, this.secret),
      this._container
    );
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      Secret: this.secret,
    };
  }

  public destroy(): void {}
  public QRCodeGenerator(application: string, user: string, secret: string) {
    const app = createElement(
      App,
      {
        value: generateUri(application, user, secret, application),
        setNewSecret: this.newSecret.bind(this),
      },
      null
    );
    return app;
  }
  public updateParameters(context: ComponentFramework.Context<IInputs>): void {
    this.application = context.parameters.Application.raw || "";
    this.user = context.parameters.User.raw || "";
    this.secret = context.parameters.Secret.raw || "";
  }
  public newSecret(): void {
    this.secret = generateSecret();
    this._notifyOutputChanged();
    console.log(this.secret);
  }
}
