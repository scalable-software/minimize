import { Template } from "@scalable.software/component";

import {
  Minimize,
  Tag,
  CSS,
  Attributes,
  State,
  Visibility,
  Status,
  Appearance,
  Operation,
  Event,
  Gesture
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

          when("`status` attribute is removed", () => {
            let error: Error | undefined;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                minimize.removeAttribute(Attributes.STATUS);
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`status` attribute is `Status.RELEASED`", () => {
              const value = minimize.getAttribute(Attributes.STATUS);
              expect(value).toBe(Status.RELEASED);
            });

            then("no error is reported", () => {
              expect(error).toBeUndefined();
            });
          });
        });
      });

      and(
        "a new minimize with `status` attribute `Status.PRESSED` is added to DOM",
        () => {
          let minimize: Minimize;
          beforeEach(() => {
            minimize = add<Minimize>(Minimize.Tag, {
              [Attributes.STATUS]: Status.PRESSED
            });
          });
          afterEach(() => {
            minimize.remove();
          });

          then("`minimize.status` is `Status.RELEASED`", () => {
            expect(minimize.status).toBe(Status.RELEASED);
          });

          then("`status` attribute is `Status.RELEASED`", () => {
            const value = minimize.getAttribute(Attributes.STATUS);
            expect(value).toBe(Status.RELEASED);
          });
        }
      );
    });
  });
});

state(State.APPEARANCE, () => {
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

        then("`minimize.appearance` getter exists", () => {
          expect(minimize.appearance).toBeDefined();
        });

        when("`minimize.appearance` getter exists", () => {
          then("`minimize.appearance` is `Appearance.FLOATING`", () => {
            expect(minimize.appearance).toBe(Appearance.FLOATING);
          });
        });

        then("`appearance` attribute does not exist", () => {
          expect(minimize.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
        });

        then("`minimize.appearance` setter exists", () => {
          expect(hasSetter(minimize, "appearance")).toBeTrue();
        });

        and("`minimize.appearance` setter exists", () => {
          when("`minimize.appearance` is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              minimize.appearance = Appearance.FLAT;
            });

            then("`minimize.appearance` is `Appearance.FLAT`", () => {
              expect(minimize.appearance).toBe(Appearance.FLAT);
            });

            then("minimize `appearance` attribute is `Appearance.FLAT`", () => {
              const value = minimize.getAttribute(Attributes.APPEARANCE);
              expect(value).toBe(Appearance.FLAT);
            });

            when("`minimize.appearance` is set to `Appearance.FLOATING`", () => {
              beforeEach(() => {
                minimize.appearance = Appearance.FLOATING;
              });

              then("`appearance` attribute does not exist", () => {
                expect(
                  minimize.hasAttribute(Attributes.APPEARANCE)
                ).toBeFalse();
              });
            });
          });

          when("`minimize.appearance` is set to `null`", () => {
            beforeEach(() => {
              minimize.appearance = null;
            });

            then("`minimize.appearance` is `Appearance.FLOATING`", () => {
              expect(minimize.appearance).toBe(Appearance.FLOATING);
            });
          });

          when("`appearance` attribute is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              minimize.setAttribute(Attributes.APPEARANCE, Appearance.FLAT);
            });

            then("`minimize.appearance` is `Appearance.FLAT`", () => {
              expect(minimize.appearance).toBe(Appearance.FLAT);
            });
          });

          when("`appearance` attribute is set to `invalid`", () => {
            let error: Error;
            beforeEach(async () => {
              await jasmine.spyOnGlobalErrorsAsync(async (reported) => {
                minimize.setAttribute(Attributes.APPEARANCE, "invalid");
                error = reported.calls.mostRecent()?.args[0];
              });
            });

            then("`appearance` attribute does not exist", () => {
              expect(minimize.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
            });

            then("`minimize.appearance` is `Appearance.FLOATING`", () => {
              expect(minimize.appearance).toBe(Appearance.FLOATING);
            });

            then("an error is reported", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid appearance value: invalid'",
              () => {
                expect(error.message).toBe("Invalid appearance value: invalid");
              }
            );
          });

          when("`appearance` attribute is set to `Appearance.FLOATING`", () => {
            beforeEach(() => {
              minimize.setAttribute(
                Attributes.APPEARANCE,
                Appearance.FLOATING
              );
            });

            then("`appearance` attribute does not exist", () => {
              expect(minimize.hasAttribute(Attributes.APPEARANCE)).toBeFalse();
            });
          });

          and("`minimize.appearance` is set to `Appearance.FLAT`", () => {
            beforeEach(() => {
              minimize.appearance = Appearance.FLAT;
            });

            when("`appearance` attribute is set to `invalid`", () => {
              beforeEach(async () => {
                await jasmine.spyOnGlobalErrorsAsync(async () => {
                  minimize.setAttribute(Attributes.APPEARANCE, "invalid");
                });
              });

              then("`appearance` attribute is `Appearance.FLAT`", () => {
                const value = minimize.getAttribute(Attributes.APPEARANCE);
                expect(value).toBe(Appearance.FLAT);
              });
            });
          });

          when("`minimize.appearance` is set to `invalid`", () => {
            let error: Error;
            beforeEach(() => {
              try {
                // @ts-expect-error
                minimize.appearance = "invalid";
              } catch (err) {
                error = err as Error;
              }
            });

            then("an error is thrown", () => {
              expect(error).toBeDefined();
            });

            then(
              "error message contains 'Invalid appearance value: invalid'",
              () => {
                expect(error.message).toBe("Invalid appearance value: invalid");
              }
            );
          });
        });
      });
    });
  });
});

// Operation
operation(Operation.HIDE, () => {
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

        then("`minimize.hide` method exists", () => {
          expect(minimize.hide).toBeDefined();
        });

        and("`minimize.hide` method exists", () => {
          when("invoking `minimize.hide`", () => {
            let result: unknown;
            beforeEach(() => {
              result = minimize.hide();
            });

            then("`minimize.visibility` is `Visibility.HIDDEN`", () => {
              expect(minimize.visibility).toBe(Visibility.HIDDEN);
            });

            then("`minimize.hide` returns nothing", () => {
              expect(result).toBeUndefined();
            });
          });
        });
      });
    });
  });
});

operation(Operation.SHOW, () => {
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

        then("`minimize.show` method exists", () => {
          expect(minimize.show).toBeDefined();
        });

        and("`minimize.show` method exists", () => {
          and("`minimize.visibility` is `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              minimize.visibility = Visibility.HIDDEN;
            });

            when("invoking `minimize.show`", () => {
              let result: unknown;
              beforeEach(() => {
                result = minimize.show();
              });

              then("`minimize.visibility` is `Visibility.VISIBLE`", () => {
                expect(minimize.visibility).toBe(Visibility.VISIBLE);
              });

              then("`minimize.show` returns nothing", () => {
                expect(result).toBeUndefined();
              });
            });
          });
        });
      });
    });
  });
});

operation(Operation.MINIMIZE, () => {
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

        then("`minimize.minimize` method exists", () => {
          expect(minimize.minimize).toBeDefined();
        });

        and("`minimize.minimize` method exists", () => {
          and("`minimize.onminimize` is set to a listener", () => {
            let onminimize: jasmine.Spy;
            beforeEach(() => {
              onminimize = jasmine.createSpy("onminimize");
              minimize.onminimize = onminimize;
            });

            when("invoking `minimize.minimize`", () => {
              let result: unknown;
              beforeEach(() => {
                result = minimize.minimize();
              });

              then("`minimize.onminimize` is called", () => {
                expect(onminimize).toHaveBeenCalled();
              });

              then("`minimize.minimize` returns nothing", () => {
                expect(result).toBeUndefined();
              });

              then("`minimize.visibility` is `Visibility.VISIBLE`", () => {
                expect(minimize.visibility).toBe(Visibility.VISIBLE);
              });

              then("`minimize.status` is `Status.RELEASED`", () => {
                expect(minimize.status).toBe(Status.RELEASED);
              });

              then("`minimize.appearance` is `Appearance.FLOATING`", () => {
                expect(minimize.appearance).toBe(Appearance.FLOATING);
              });
            });

            when("invoking `minimize.minimize` twice", () => {
              beforeEach(() => {
                minimize.minimize();
                minimize.minimize();
              });

              then("`minimize.onminimize` is called twice", () => {
                expect(onminimize).toHaveBeenCalledTimes(2);
              });
            });
          });
        });
      });
    });
  });
});

// Event
events(Event.ON_HIDE, () => {
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

        then("`minimize.onhide` setter exists", () => {
          expect(hasSetter(minimize, Event.ON_HIDE)).toBeTrue();
        });

        and("`minimize.onhide` setter exists", () => {
          and("`minimize.onhide` is set to a listener", () => {
            let onhide: jasmine.Spy;
            beforeEach(() => {
              onhide = jasmine.createSpy("onhide");
              minimize.onhide = onhide;
            });

            when("`minimize.visibility` is set to `Visibility.HIDDEN`", () => {
              beforeEach(() => {
                minimize.visibility = Visibility.HIDDEN;
              });

              then("`minimize.onhide` is called", () => {
                expect(onhide).toHaveBeenCalled();
              });

              then(
                "`minimize.onhide` is called with `{ detail: { visibility: Visibility.HIDDEN } }`",
                () => {
                  const message = {
                    detail: { visibility: Visibility.HIDDEN }
                  };
                  expect(onhide).toHaveBeenCalledWith(
                    jasmine.objectContaining(message)
                  );
                }
              );
            });

            when(
              "`minimize.visibility` is set to `Visibility.HIDDEN` twice",
              () => {
                beforeEach(() => {
                  minimize.visibility = Visibility.HIDDEN;
                  minimize.visibility = Visibility.HIDDEN;
                });

                then("`minimize.onhide` is called once", () => {
                  expect(onhide).toHaveBeenCalledTimes(1);
                });
              }
            );

            and("`minimize.onhide` is set to a new listener", () => {
              let onhide2: jasmine.Spy;
              beforeEach(() => {
                onhide2 = jasmine.createSpy("onhide2");
                minimize.onhide = onhide2;
              });

              when("`minimize.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  minimize.visibility = Visibility.HIDDEN;
                });

                then("old `minimize.onhide` is not called", () => {
                  expect(onhide).not.toHaveBeenCalled();
                });

                then("new `minimize.onhide` is called", () => {
                  expect(onhide2).toHaveBeenCalled();
                });
              });
            });

            when("`minimize.onhide` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  minimize.onhide = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then(
                "error message contains 'Invalid onhide value: invalid'",
                () => {
                  expect(error.message).toBe("Invalid onhide value: invalid");
                }
              );

              when("`minimize.visibility` is set to `Visibility.HIDDEN`", () => {
                beforeEach(() => {
                  minimize.visibility = Visibility.HIDDEN;
                });

                then("`minimize.onhide` is still called", () => {
                  expect(onhide).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });
  });
});

events(Event.ON_SHOW, () => {
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

        then("`minimize.onshow` setter exists", () => {
          expect(hasSetter(minimize, Event.ON_SHOW)).toBeTrue();
        });

        and("`minimize.onshow` setter exists", () => {
          and("`minimize.visibility` is set to `Visibility.HIDDEN`", () => {
            beforeEach(() => {
              minimize.visibility = Visibility.HIDDEN;
            });

            and("`minimize.onshow` is set to a listener", () => {
              let onshow: jasmine.Spy;
              beforeEach(() => {
                onshow = jasmine.createSpy("onshow");
                minimize.onshow = onshow;
              });

              when(
                "`minimize.visibility` is set to `Visibility.VISIBLE`",
                () => {
                  beforeEach(() => {
                    minimize.visibility = Visibility.VISIBLE;
                  });

                  then("`minimize.onshow` is called", () => {
                    expect(onshow).toHaveBeenCalled();
                  });

                  then(
                    "`minimize.onshow` is called with `{ detail: { visibility: Visibility.VISIBLE } }`",
                    () => {
                      const message = {
                        detail: { visibility: Visibility.VISIBLE }
                      };
                      expect(onshow).toHaveBeenCalledWith(
                        jasmine.objectContaining(message)
                      );
                    }
                  );
                }
              );

              when(
                "`minimize.visibility` is set to `Visibility.VISIBLE` twice",
                () => {
                  beforeEach(() => {
                    minimize.visibility = Visibility.VISIBLE;
                    minimize.visibility = Visibility.VISIBLE;
                  });

                  then("`minimize.onshow` is called once", () => {
                    expect(onshow).toHaveBeenCalledTimes(1);
                  });
                }
              );

              and("`minimize.onshow` is set to a new listener", () => {
                let onshow2: jasmine.Spy;
                beforeEach(() => {
                  onshow2 = jasmine.createSpy("onshow2");
                  minimize.onshow = onshow2;
                });

                when(
                  "`minimize.visibility` is set to `Visibility.VISIBLE`",
                  () => {
                    beforeEach(() => {
                      minimize.visibility = Visibility.VISIBLE;
                    });

                    then("old `minimize.onshow` is not called", () => {
                      expect(onshow).not.toHaveBeenCalled();
                    });

                    then("new `minimize.onshow` is called", () => {
                      expect(onshow2).toHaveBeenCalled();
                    });
                  }
                );
              });

              when("`minimize.onshow` is set to `invalid`", () => {
                let error: Error;
                beforeEach(() => {
                  try {
                    // @ts-expect-error
                    minimize.onshow = "invalid";
                  } catch (err) {
                    error = err as Error;
                  }
                });

                then("an error is thrown", () => {
                  expect(error).toBeDefined();
                });

                then(
                  "error message contains 'Invalid onshow value: invalid'",
                  () => {
                    expect(error.message).toBe("Invalid onshow value: invalid");
                  }
                );

                when(
                  "`minimize.visibility` is set to `Visibility.VISIBLE`",
                  () => {
                    beforeEach(() => {
                      minimize.visibility = Visibility.VISIBLE;
                    });

                    then("`minimize.onshow` is still called", () => {
                      expect(onshow).toHaveBeenCalled();
                    });
                  }
                );
              });
            });
          });
        });
      });
    });
  });
});

events(Event.ON_MINIMIZE, () => {
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

        then("`minimize.onminimize` setter exists", () => {
          expect(hasSetter(minimize, Event.ON_MINIMIZE)).toBeTrue();
        });

        and("`minimize.onminimize` setter exists", () => {
          and("`minimize.onminimize` is set to a listener", () => {
            let onminimize: jasmine.Spy;
            beforeEach(() => {
              onminimize = jasmine.createSpy("onminimize");
              minimize.onminimize = onminimize;
            });

            when("`minimize.minimize` is invoked", () => {
              beforeEach(() => {
                minimize.minimize();
              });

              then("`minimize.onminimize` is called", () => {
                expect(onminimize).toHaveBeenCalled();
              });

              then("`minimize.onminimize` is called with no detail", () => {
                expect(onminimize).toHaveBeenCalledWith(
                  jasmine.objectContaining({ detail: null })
                );
              });
            });

            and("`minimize.onminimize` is set to a new listener", () => {
              let onminimize2: jasmine.Spy;
              beforeEach(() => {
                onminimize2 = jasmine.createSpy("onminimize2");
                minimize.onminimize = onminimize2;
              });

              when("`minimize.minimize` is invoked", () => {
                beforeEach(() => {
                  minimize.minimize();
                });

                then("old `minimize.onminimize` is not called", () => {
                  expect(onminimize).not.toHaveBeenCalled();
                });

                then("new `minimize.onminimize` is called", () => {
                  expect(onminimize2).toHaveBeenCalled();
                });
              });
            });

            when("`minimize.onminimize` is set to `invalid`", () => {
              let error: Error;
              beforeEach(() => {
                try {
                  // @ts-expect-error
                  minimize.onminimize = "invalid";
                } catch (err) {
                  error = err as Error;
                }
              });

              then("an error is thrown", () => {
                expect(error).toBeDefined();
              });

              then(
                "error message contains 'Invalid onminimize value: invalid'",
                () => {
                  expect(error.message).toBe(
                    "Invalid onminimize value: invalid"
                  );
                }
              );

              when("`minimize.minimize` is invoked", () => {
                beforeEach(() => {
                  minimize.minimize();
                });

                then("`minimize.onminimize` is still called", () => {
                  expect(onminimize).toHaveBeenCalled();
                });
              });
            });
          });
        });
      });
    });
  });
});

// Gesture
gesture(Gesture.POINTERDOWN, () => {
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

        when("user presses the pointer on `div` with class `icon`", () => {
          beforeEach(() => {
            const icon = minimize.root.querySelector(".icon") as HTMLElement;
            icon.dispatchEvent(new PointerEvent(Gesture.POINTERDOWN));
          });

          then("`minimize.status` is `Status.PRESSED`", () => {
            expect(minimize.status).toEqual(Status.PRESSED);
          });
        });
      });
    });
  });
});
