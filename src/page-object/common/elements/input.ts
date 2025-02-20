import { BaseElement } from "./base-element";


export class Input extends BaseElement {
  protected readonly name = 'поле';

  public async fill(value: string) {
    const locator = this.getLocator();

    await locator.fill(value);
  }
}
