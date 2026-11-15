import { Minimize } from "@scalable.software/minimize";

await Minimize.Template.load("minimize.template.html");

customElements.define(Minimize.Tag, Minimize);
