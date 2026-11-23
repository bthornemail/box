class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
  }
  // Element functionality written in here
}

class PopupInfo extends HTMLElement {
  constructor() {
    super();
  }
  // Element functionality written in here
}

/*

  hese methods, which the specification calls lifecycle callbacks, you can run code in response to these events.

Custom element lifecycle callbacks include:

connectedCallback(): Called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
disconnectedCallback(): Called each time the element is removed from the document.
connectedMoveCallback(): When defined, this is called instead of connectedCallback() and disconnectedCallback() each time the element is moved to a different place in the DOM via Element.moveBefore(). Use this to avoid running initialization/cleanup code in the connectedCallback() and disconnectedCallback() callbacks when the element is not actually being added to or removed from the DOM. See Lifecycle callbacks and state-preserving moves for more details.
adoptedCallback(): Called each time the element is moved to a new document.
attributeChangedCallback(): Called when attributes are changed, added, removed, or replaced. See Responding to attribute changes for more details about this callback.

*/
// Create a class for the element
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  connectedMoveCallback() {
    console.log("Custom element moved with moveBefore()");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("my-custom-element", MyCustomElement);

class MyComponent {
  // ...
  connectedMoveCallback() {
    console.log("Custom move-handling logic here.");
  }
  // ...
}

customElements.define("word-count", WordCount, { extends: "p" });
customElements.define("popup-info", PopupInfo);


const myRegistry = new CustomElementRegistry();

myRegistry.define(
  "my-element",
  class extends HTMLElement {
    connectedCallback() {
      this.textContent = "Hello from scoped registry!";
    }
  },
);
// Note: Scoped registries do not support the extends option in define() (for creating customized built-in elements). Attempting to use extends with a scoped registry throws a NotSupportedError DOMException.
const host = document.createElement("div");
document.body.appendChild(host);

const shadow = host.attachShadow({
  mode: "open",
  customElementRegistry: myRegistry,
});

// <my-element> is upgraded using myRegistry's definition
shadow.innerHTML = "<my-element></my-element>";

(()=>
// You can also associate a scoped registry after the shadow root has been created by calling initialize(). This is useful when you need to set up the DOM structure first and attach the registry later:
const shadow = host.attachShadow({
  mode: "open",
  customElementRegistry: null, // no registry yet
});
shadow.innerHTML = "<my-element></my-element>";

// Later, associate the scoped registry and upgrade elements
myRegistry.initialize(shadow);
})()


// Create a class for the element
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["size"];

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(
      `Attribute ${name} has changed from ${oldValue} to ${newValue}.`,
    );
  }
}

customElements.define("my-custom-element", MyCustomElement);
