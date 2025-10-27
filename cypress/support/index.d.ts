// index.d.ts
declare namespace Cypress {
  interface Chainable {
    checkAppLoaded(timeout?: number): Chainable<void>;
    addIngredientsToConstructor(): Chainable<void>;
    verifyConstructorIngredients(): Chainable<void>;
  }
}
