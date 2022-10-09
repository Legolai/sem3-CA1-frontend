import { ActionHook } from "../interfaces";
import { SupTag } from "../utility";

const Modal = <k extends keyof HTMLElementTagNameMap>(content: (hook: ActionHook) => SupTag<k>, id: string, header: string, actionHook: ActionHook) => {
    const background = new SupTag("div").setId(id).addClass("bg-modal");
    const component = new SupTag("div").addClass("modal");
    const container = new SupTag("div").addClass("modal-container");
    const headerElm = new SupTag("h2").setTextContent(header);


    const closeAnimation = () => {
        container.applyToElem(elm => elm
            .animate([{ opacity: 1, easing: "ease-out" }, { opacity: 0 }], 300)
            .finished.then(_ => {
                container.element.style.opacity = '0';
                background
                    .applyToElem(bg => bg
                        .animate([{ opacity: 1, easing: "ease-out" }, { opacity: 0 }], 100)
                        .finished.then(_ => {
                            background.element.style.display = "none";
                            background.element.style.opacity = "0";
                        })
                    );
            }));
    };


    const openAnimation = () => {
        background.element.style.display = "block";
        background
            .applyToElem(bg => bg
                .animate([{ opacity: 0, easing: "ease-in" }, { opacity: 1 }], 100)
                .finished.then(_ => {
                    bg.style.opacity = "1";
                    container.applyToElem(elm => elm
                        .animate([{ opacity: 0, easing: "ease-in" }, { opacity: 1 }], 300)
                        .finished.then(_ => container.element.style.opacity = '1'));
                })
            );
    };

    actionHook.open = openAnimation;
    actionHook.close = closeAnimation;


    background.addEventListener("click", (event) => {
        if (event.target == background.element) closeAnimation();
    });

    const closeBtn = new SupTag("button")
        .addClass("close-modal-btn")
        .appendTag(new SupTag("span")
            .applyToElem(elm => elm.innerHTML = "&times;"))
        .addEventListener("click", () => closeAnimation());

    const contentContainer = new SupTag("div")
        .addClass("modal-content-container")
        .appendTag(content(actionHook));


    container.appendTag(headerElm, closeBtn, contentContainer);
    component.appendTag(container);
    background.appendTag(component);
    return background;
};

export default Modal;