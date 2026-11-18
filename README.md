![License: CC BY-NC-SA 4.0](https://flat.badgen.net/static/license/CC-BY-NC-SA-4.0/green)

# Minimize

A lightweight, self-contained web component that lets users ask for a window, panel or dialog to be minimized. It behaves like the matching control in the corner of a desktop window: it looks pressed while it is held, makes the request when it is let go, and makes none when the pointer moves away first. It can be shown or hidden on demand, operated with a pointer or the keyboard, and adapts automatically to light and dark themes, emitting an event for each request to give product teams a single drop-in control.

The component does not minimize anything itself, and holds no window state: the host application acts on the request.

---

## 1. Introduction

The **Minimize** component provides a press button that requests minimizing and can be hidden or shown, via both **imperative** and **declarative** APIs. It leverages custom Web Component features, including Shadow DOM, custom events, and attribute reflection for a clean, modular design.

### 1.1 Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/scalable-software/minimize.git
   cd minimize
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Run Tests (Optional)**

   ```bash
   npm test
   ```

   - Ensures everything is working as expected before you start.

4. **Start Local Server**

   ```bash
   npm run serve
   ```

   - This builds the component and opens the demo page, with `<minimize-button>` at the top and its controls below it.

---

## 2. Quick Start Usage Walkthrough

This walkthrough uses the demo page to show how `<minimize-button>` behaves, before exploring its internal design. The page has the component in a band across the top, and three groups below it: **States**, **Operations** and **Events**.

1. **Press and hold** the `<minimize-button>`.
   - It looks pressed, and the **States** group shows `status` as `pressed`.
   - Nothing appears in the **Events** log yet: no request has been made.

2. **Let go** while the pointer is still on the button.
   - `status` returns to `released`, and the **Events** log shows `onminimize`.

3. **Press** again, **move the pointer away**, and then let go.
   - `status` returns to `released` the moment the pointer leaves, and no `onminimize` is logged: you changed your mind.

4. **Press the Tab key** until the button has focus, then **hold down Enter** or the **space bar**.
   - It looks pressed, `status` shows `pressed`, and the page does not scroll. No `onminimize` is logged while the key is held.
   - **Lift the key**: `status` returns to `released`, and one `onminimize` is logged.
   - Hold the key down again and **press Tab** to move the focus away: `status` returns to `released`, and no `onminimize` is logged.

5. **Click** the `minimize` button in the **Operations** group.
   - The host application can make the same request from code. Every call logs one `onminimize`, and no state changes.

6. **Click** `hide`, then `show`.
   - The component disappears and comes back. The log shows `onhide` and `onshow`, each with its `detail`.

7. **Choose** `flat` for `appearance` in the **States** group.
   - The button loses its border, shadow and rounded corners, as it would inside a taskbar.

8. **Open the Developer Tools**, select the **Console**, and subscribe from code:

   ```js
   const minimize = document.querySelector("minimize-button");

   minimize.onminimize = () => console.log("Minimizing was requested");
   minimize.minimize();
   ```

9. **Inspect** the `<minimize-button>` in the **Elements** tab while you hold it down:

   ```html
   <minimize-button status="pressed"></minimize-button>
   ```

10. **Manually change** the `status` attribute to `"pressed"`.
    - The component puts `released` back at once: only the component changes `status`.

For more details on **States**, **Operations**, and **Events**, consult the sections below or check the generated **API documentation** (see `npm run document`).

---

## 3. Architectural Overview

### 3.1 Composition

- **Template** (`minimize.template.html`): Defines DOM structure — a `.icon` container, focusable and announced as a button named "Minimize", holding the SVG icon of a single horizontal line. Its one style rule, `:host { display: none; }`, keeps the minimize hidden until its stylesheet applies, so the minimize is never seen unstyled.
- **Style** (`minimize.style.css`): Encapsulates appearance, including the pressed look, hover effects, the flat appearance, and light/dark theme adaptation. Its rule `:host(:defined) { display: inline-block; }` reveals the minimize; a stylesheet that replaces this one must carry that rule, or the minimize stays hidden.
- **Class** (`minimize.ts`): Extends the base component class to handle lifecycle hooks, Shadow DOM creation, attribute reflection, and event dispatch.

> **Separation of Concerns**
>
> - **HTML** for structure
> - **CSS** for presentation
> - **TypeScript** for behavior

### 3.2 Class Lifecycle

Lifecycle methods are implemented in the base class and extended by the **Minimize** component:

- **`connectedCallback()`**
  1. Creates a Shadow DOM.
  2. Clones the HTML template into the Shadow Root.
  3. Inserts a `<link>` for scoped CSS.
  4. Initialises default state attributes.
  5. Sets up event listeners on the icon: the pointer going down, being lifted and leaving, a click, a key going down and being lifted, and the loss of focus.

- **`disconnectedCallback()`**
  - Removes the event listeners.

---

## 4. Core Concepts: State, Operations, Events, and Gestures

The following sections explain how the minimize button works internally.

### 4.1 State

The **Minimize** component uses both **internal properties** and **DOM attributes** to manage its state. This ensures consistency whether you modify the component via script or HTML attributes.

#### 4.1.1 Definition

- **`visibility`** (`visible` | `hidden`)
  - Whether the minimize button is displayed.
  - **Optional attribute**: absent from the DOM when `visible` (the default); present as `[visibility="hidden"]` on the host element when hidden.

- **`status`** (`released` | `pressed`) — **readonly**
  - Whether the control is being pressed. It is `pressed` from the moment the pointer goes down on the icon until it is lifted or leaves the icon, and from the moment Enter or Space goes down on the focused icon until the key is lifted or the icon loses focus. It is `released` at all other times.
  - **Compulsory attribute**: always present in the DOM, reflecting the current state at all times, so a stylesheet can select on `[status="pressed"]`.
  - Only the component changes it. Assigning the property does not compile in TypeScript, and a `status` attribute that is set or removed from outside is put back to the current state without an error.

- **`appearance`** (`floating` | `flat`)
  - Whether the minimize button stands alone, with its own border, shadow and rounded corners, or lies flat inside another surface such as a taskbar.
  - **Optional attribute**: absent from the DOM when `floating` (the default); present as `[appearance="flat"]` on the host element when flat.
  - It changes how the control looks, not what it does: it has no operation and sends no event.

#### 4.1.2 Internal vs. Attribute-Driven State

1. **Internal State**

   ```typescript
   private _visibility: Visibility = Visibility.VISIBLE;
   private _status: Status = Status.RELEASED;
   private _appearance: Appearance = Appearance.FLOATING;
   ```

   - Predictable defaults decoupled from external attributes.

2. **Attribute-Driven State**

   ```typescript
   public get visibility(): Visibility {
     return this._visibility;
   }
   public set visibility(visibility: Visibility | null) {
     try {
       // Normalize
       visibility = visibility ?? Visibility.VISIBLE;
       // Validate
       visibility = Validate.visibility(visibility);
       // Guard
       if (this._visibility === visibility) return;
       // Mutate
       this._visibility = visibility;
     } finally {
       // Reflect
       this._reflect(
         Attributes.VISIBILITY,
         this._visibility,
         Visibility.VISIBLE
       );
     }
     // Dispatch
     const detail = { visibility };
     visibility === Visibility.HIDDEN && this._dispatch(Event.ON_HIDE, detail);
     visibility === Visibility.VISIBLE && this._dispatch(Event.ON_SHOW, detail);
   }
   ```

   - Normalises `null` to the default before validation.
   - Validates the incoming value and throws on invalid input.
   - Guards against no-op mutations with an early return.
   - Always makes the `visibility` attribute show the state, also after a rejected or ignored value, so an invalid attribute never stays in the DOM.
   - Dispatches the corresponding event on every accepted transition.

3. **Readonly State**

   ```typescript
   public get status(): Status {
     return this._status;
   }
   private set status(status: Status) {
     try {
       // Mutate
       this._status = status;
     } finally {
       // Reflect
       this._reflect(Attributes.STATUS, this._status);
     }
   }
   ```

   - The setter is private: the component produces the value itself, so it has no validator.

#### 4.1.3 Lifecycle & Attribute Handlers

- `_initialize()` writes the `status` attribute to the DOM on connect, ensuring the compulsory attribute is always reflected from the first render.
- `attributeChangedCallback()` invokes `_attributeHandlers`. For `visibility` and `appearance` the change is routed back through the setter, so external attribute mutations and imperative setter calls follow the same mutation path. For `status` the handler restores the attribute to the current state.

#### 4.1.4 Usage Tips

- **Fallback**: Removing `[visibility="hidden"]` reverts the component to its visible default.
- **Clean DOM**: When `visibility` is `visible` and `appearance` is `floating`, neither attribute is present on the host element.
- **Hide what does not apply**: the component does not decide when minimizing is allowed. Hide it when the window cannot be minimized, and show it again later.

---

### 4.2 Operations

The **Minimize** component's imperative API.

#### 4.2.1 Definition

1. `hide()` → sets `[visibility="hidden"]` on the host element
2. `show()` → removes the `[visibility]` attribute from the host element
3. `minimize()` → requests minimizing: changes no state, and dispatches `onminimize` on every call

#### 4.2.2 Example

```typescript
public minimize = () => {
  this._dispatch(Event.ON_MINIMIZE);
};
```

`hide()` and `show()` assign a state, and the state's setter sends the event. `minimize()` changes no state: the request is the outcome, so the operation sends the event itself, each time it is called.

---

### 4.3 Events

The **Minimize** component broadcasts custom events for each request and each change of visibility.

#### 4.3.1 Definition

- **`onhide`**: Fired when transitioning from `visible` to `hidden`. Its `detail` is `{ visibility: "hidden" }`.
- **`onshow`**: Fired when transitioning from `hidden` to `visible`. Its `detail` is `{ visibility: "visible" }`.
- **`onminimize`**: Fired each time minimizing is requested, by a gesture or by the `minimize` operation. It has no `detail`.

#### 4.3.2 Usage Tips

- Assign a handler directly to the setter:

  ```js
  minimize.onminimize = () => console.log("Minimizing was requested");
  ```

- Or use standard DOM event listening:

  ```js
  minimize.addEventListener("onminimize", () => {
    // ...
  });
  ```

- Or receive every event the component sends with `onevent`:

  ```js
  minimize.onevent = (event) => console.log(event.type, event.detail);
  ```

---

### 4.4 Gestures

What the end user does on the icon, and what it leads to.

| Gesture | On the icon | Leads to |
|---|---|---|
| `pointerdown` | the pointer goes down | `status` becomes `pressed` |
| `pointerup` | the pointer is lifted | `status` becomes `released` |
| `pointerleave` | the pointer leaves | `status` becomes `released`, and no request is made |
| `click` | the pointer is pressed and lifted on the icon | `minimize()` |
| `keydown` | Enter or Space goes down while the icon has focus | `status` becomes `pressed`, and the page does not scroll |
| `keyup` | Enter or Space is lifted while the icon has focus | `minimize()` when the control is pressed, then `status` becomes `released` |
| `blur` | the icon loses focus | `status` becomes `released`, and no request is made |
| `hover` | the pointer is over the icon | a change of background, border, shadow and fill, in CSS only |

Pressing and releasing are not offered to the outside: the component has no `press` or `release` operation.

---

## 5. Development Workflow

Below is a recommended workflow for building, testing, documenting, and publishing the Minimize component.

### 5.1 From Specifications to Implementation

1. **Define Specs** (composition, states, operations, events, gestures) in `specifications/minimize.specifications.json`.
2. **Implement** in TypeScript, test first (reflect states as attributes, dispatch events on transitions and requests).
3. **Link** the final compiled JS or leverage import maps.

### 5.2 Testing

Unit tests run with Karma + Jasmine. The specification is checked first, then the suite covers composition, states, validation, operations, events, and gestures.

```bash
npm test
```

### 5.3 Documentation (Typedoc)

```bash
npm run document
```

Auto-generates API docs from TypeScript annotations.

### 5.4 Publishing & Versioning

1. **Build**:

   ```bash
   npm run build
   ```

   Outputs to `dist/`.

2. **Bump Version**:

   ```bash
   npm version [major|minor|patch]
   ```

3. **Publish**:

   ```bash
   npm publish
   ```

### 5.5 Import Maps

The path in the import map depends on how the package is consumed.

**During local development** (e.g. the project's own `demo/`), the path resolves relative to the served file and points directly into the local build output:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/minimize": "./dist/index.js"
    }
  }
</script>
<script type="module">
  import "@scalable.software/minimize";
</script>
```

**After publishing to npm**, the path must point to the package inside `node_modules`:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/minimize": "/node_modules/@scalable.software/minimize/dist/index.js"
    }
  }
</script>
<script type="module">
  import "@scalable.software/minimize";
</script>
```

Alternatively, reference the package from a CDN:

```html
<script type="importmap">
  {
    "imports": {
      "@scalable.software/minimize": "https://unpkg.com/@scalable.software/minimize/dist/index.js"
    }
  }
</script>
<script type="module">
  import "@scalable.software/minimize";
</script>
```

The component is built on `@scalable.software/component`, which needs its own entry in the import map. Importing the package does not define the element: load the template and define it, as the demo does.

```js
import { Minimize } from "@scalable.software/minimize";

await Minimize.Template.load("minimize.template.html");

customElements.define(Minimize.Tag, Minimize);
```

---

## 6. Best Practices & Extensibility

1. **Requests, not actions** — `onminimize` says that minimizing was asked for. The host application decides what that means and does it.
2. **Accessibility** — The icon can be reached with the Tab key, is announced as a button named "Minimize" through its `aria-label`, and is operated with Enter or the space bar: it is pressed while the key is held, and the request is made when the key is lifted.
3. **Testing** — Simulate pointer presses, clicks and key presses to confirm correct state transitions and event dispatch.
4. **Documentation** — Provide real usage snippets (like the Quick Start above) for developer onboarding.
5. **Publishing** — Use semantic versioning to manage features and breaking changes; employ CI/CD for automated build, test, and publish.

---

## 7. Conclusion

By pressing, releasing and moving away from the control in the Usage Walkthrough, we have demonstrated its core features. Internally, the **Minimize** component's **State**, **Operations**, **Events** and **Gestures** ensure predictable, event-driven functionality. Follow the **development workflow** for build, test, docs, and publishing to confidently integrate `<minimize-button>` into your projects.

---

## License

> This software and its documentation are released under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License (CC BY-NC-SA 4.0). This means you are free to share, copy, distribute, and transmit the work, and to adapt it, but only under the following conditions:
>
> Attribution: You must attribute the work in the manner specified by the author or licensor (but not in any way that suggests that they endorse you or your use of the work).
>
> NonCommercial: You may not use this material for commercial purposes.
>
> ShareAlike: If you alter, transform, or build upon this work, you may distribute the resulting work only under the same or similar license to this one.
>
> For more details, please visit the full [license agreement](https://creativecommons.org/licenses/by-nc-sa/4.0/).
