import { Template } from "@scalable.software/component";

import { Minimize, Tag, CSS, Attributes } from "@scalable.software/minimize";

// Configuration
configuration(Configuration.TAG, () => {
  and("Minimize imported", () => {
    then("Minimize is defined", () => {
      expect(Minimize).toBeDefined();
    });

    and("Minimize is defined", () => {
      then("Minimize.Tag static getter is defined", () => {
        expect(Minimize.Tag).toBeDefined();
      });

      and("Minimize.Tag static getter is defined", () => {
        then("Minimize.Tag is Tag", () => {
          expect(Minimize.Tag).toBe(Tag);
        });
      });
    });
  });
});

configuration(Configuration.ATTRIBUTES, () => {
  and("Minimize imported", () => {
    then("Minimize is defined", () => {
      expect(Minimize).toBeDefined();
    });

    and("Minimize is defined", () => {
      then("Minimize.Attributes static getter is defined", () => {
        expect(Minimize.Attributes).toBeDefined();
      });

      and("Minimize.Attributes static getter is defined", () => {
        then("Minimize.Attributes is Attributes", () => {
          expect(Minimize.Attributes).toBe(Attributes);
        });
      });
    });
  });
});

// Utilities
utility(Utilities.TEMPLATE, () => {
  then("Minimize.Template static property is defined", () => {
    expect(Minimize.Template).toBeDefined();
  });

  and("Minimize.Template static property is defined", () => {
    then("Minimize.Template is a Template", () => {
      expect(Minimize.Template).toBeInstanceOf(Template);
    });
  });
});

// Compositions
composition(Composition.TEMPLATE, () => {
  given("Minimize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Minimize.Tag, Minimize);
    });

    and("HTML Template is added to DOM", () => {
      let template: HTMLTemplateElement;
      beforeEach(async () => {
        template = (await Minimize.Template.load(
          "minimize.template.html"
        )) as HTMLTemplateElement;
      });
      afterEach(() => {
        remove(Minimize.Tag);
      });

      then("template is defined", () => {
        expect(template).toBeDefined();
      });

      and("a new minimize is added to DOM", () => {
        let minimize: Minimize;
        beforeEach(() => {
          minimize = add<Minimize>(Minimize.Tag);
        });
        afterEach(() => {
          minimize.remove();
        });

        then("minimize.root contents contains template contents", () => {
          expect(minimize.root.innerHTML).toContain(template.innerHTML);
        });

        and("`minimize.root` contents contains template contents", () => {
          then("`minimize.root` contains `div.icon`", () => {
            const div = minimize.root.querySelector("div.icon");
            expect(div).not.toBeNull();
          });
        });
      });
    });
  });
});

composition(Composition.CSS, () => {
  given("Minimize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Minimize.Tag, Minimize);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Minimize.Template.load("minimize.template.html");
      });
      afterEach(() => {
        remove(Minimize.Tag);
      });

      and("a new minimize is added to DOM", () => {
        let minimize: Minimize;
        beforeEach(() => {
          minimize = add<Minimize>(Minimize.Tag);
        });
        afterEach(() => {
          minimize.remove();
        });

        then("minimize.root contents contains a link to stylesheet", () => {
          expect(minimize.root.innerHTML).toContain("stylesheet");
        });

        and("minimize.root contents contains a link to stylesheet", () => {
          then("the stylesheet file's name is correct", () => {
            expect(minimize.root.innerHTML).toContain(CSS);
          });
        });
      });
    });
  });
});

// State

// Operation

// Event

// Gesture
