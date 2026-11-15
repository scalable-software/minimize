import { Template } from "@scalable.software/component";

import {
  Minimize,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility,
  Status
} from "@scalable.software/minimize";

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

          when("`minimize.root` contains `div.icon`", () => {
            let div: HTMLDivElement;
            beforeEach(() => {
              div = minimize.root.querySelector("div.icon") as HTMLDivElement;
            });

            then("`div.icon` contains `svg.minimize`", () => {
              const svg = div.querySelector("svg.minimize");
              expect(svg).not.toBeNull();
            });

            then("`div.icon` has `tabindex` `0`", () => {
              expect(div.getAttribute("tabindex")).toBe("0");
            });

            then("`div.icon` has `role` `button`", () => {
              expect(div.getAttribute("role")).toBe("button");
            });
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

composition(Composition.ELEMENT, () => {
  and("Minimize is defined in custom element registry", () => {
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

        then("`minimize.elements.icon` is defined", () => {
          expect(minimize["elements"].icon).toBeDefined();
        });

        when("`minimize.elements.icon` is defined", () => {
          then(
            "`minimize.elements.icon` is a cached reference to the `div` with class `icon`",
            () => {
              const icon = minimize.root.querySelector(
                ".icon"
              ) as HTMLDivElement;
              expect(minimize["elements"].icon).toBe(icon);
            }
          );
        });
      });
    });
  });
});

// State
state(State.VISIBILITY, () => {
  given("Minimize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Minimize.Tag, Minimize);
    });

    and("a HTML Template is added to DOM", () => {
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

        then("`minimize.visibility` getter exists", () => {
          expect(minimize.visibility).toBeDefined();
        });

        when("`minimize.visibility` getter exists", () => {
          then("`minimize.visibility` is `Visibility.VISIBLE`", () => {
            expect(minimize.visibility).toBe(Visibility.VISIBLE);
          });
        });

        then("`visibility` attribute does not exist", () => {
          expect(minimize.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
        });

        then("`minimize.visibility` setter exists", () => {
          expect(hasSetter(minimize, "visibility")).toBeTrue();
        });

        and("`minimize.visibility` setter exists", () => {
          when("`minimize.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              minimize.visibility = Visibility.HIDDEN;
            });

            then("`minimize.visibility` is `Visibility.HIDDEN`", () => {
              expect(minimize.visibility).toBe(Visibility.HIDDEN);
            });

            then("minimize `visibility` attribute is `Visibility.HIDDEN`", () => {
              const value = minimize.getAttribute(Attributes.VISIBILITY);
              expect(value).toBe(Visibility.HIDDEN);
            });

            when("`minimize.visibility` is set to `Visibility.VISIBLE`", () => {
              beforeEach(() => {
                minimize.visibility = Visibility.VISIBLE;
              });

              then("`visibility` attribute does not exist", () => {
                expect(
                  minimize.hasAttribute(Attributes.VISIBILITY)
                ).toBeFalse();
              });
            });
          });

          when("`minimize.visibility` is set to `null`", () => {
            beforeEach(() => {
              minimize.visibility = null;
            });

            then("`minimize.visibility` is `Visibility.VISIBLE`", () => {
              expect(minimize.visibility).toBe(Visibility.VISIBLE);
            });
          });

          when("`visibility` attribute is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              minimize.setAttribute(Attributes.VISIBILITY, Visibility.HIDDEN);
            });

            then("`minimize.visibility` is `Visibility.HIDDEN`", () => {
              expect(minimize.visibility).toBe(Visibility.HIDDEN);
            });
          });

          when("`visibility` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                minimize.setAttribute(Attributes.VISIBILITY, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`visibility` attribute does not exist", () => {
              expect(minimize.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });

            then("`minimize.visibility` is `Visibility.VISIBLE`", () => {
              expect(minimize.visibility).toBe(Visibility.VISIBLE);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });

          when("`visibility` attribute is set to `Visibility.VISIBLE`", () => {
            beforeEach(() => {
              minimize.setAttribute(Attributes.VISIBILITY, Visibility.VISIBLE);
            });

            then("`visibility` attribute does not exist", () => {
              expect(minimize.hasAttribute(Attributes.VISIBILITY)).toBeFalse();
            });
          });

          and("`minimize.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              minimize.visibility = Visibility.HIDDEN;
            });

            when("`visibility` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  minimize.setAttribute(Attributes.VISIBILITY, "invalid");
                });
              });

              then("`visibility` attribute is `Visibility.HIDDEN`", () => {
                const value = minimize.getAttribute(Attributes.VISIBILITY);
                expect(value).toBe(Visibility.HIDDEN);
              });
            });
          });

          when("`minimize.visibility` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                minimize.visibility = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid visibility value: invalid'",
              () => {
                expect(error.message).toBe("Invalid visibility value: invalid");
              }
            );
          });
        });
      });
    });
  });
});

state(State.STATUS, () => {
  given("Minimize is defined in custom element registry", () => {
    beforeEach(() => {
      define(Minimize.Tag, Minimize);
    });

    and("a HTML Template is added to DOM", () => {
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

        then("`minimize.status` getter exists", () => {
          expect(minimize.status).toBeDefined();
        });

        when("`minimize.status` getter exists", () => {
          then("`minimize.status` is `Status.RELEASED`", () => {
            expect(minimize.status).toBe(Status.RELEASED);
          });
        });

        then("`status` attribute exists", () => {
          const value = minimize.getAttribute(Attributes.STATUS);
          expect(value).not.toBeNull();
        });

        and("`status` attribute exists", () => {
          then("`status` attribute is `Status.RELEASED`", () => {
            const value = minimize.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.RELEASED);
          });

          when("`status` attribute is set to `Status.PRESSED`", () => {
            let error: Error | undefined;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                minimize.setAttribute(Attributes.STATUS, Status.PRESSED);
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = minimize.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("`minimize.status` is `Status.RELEASED`", () => {
              expect(minimize.status).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(error).toBeUndefined();
            });
          });

          when("`status` attribute is set to `invalid`", () => {
            let error: Error | undefined;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                minimize.setAttribute(Attributes.STATUS, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = minimize.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("`minimize.status` is `Status.RELEASED`", () => {
              expect(minimize.status).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(error).toBeUndefined();
            });
          });
        });
      });
    });
  });
});

// Operation

// Event

// Gesture
