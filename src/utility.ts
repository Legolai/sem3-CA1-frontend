class SupTag<k extends keyof HTMLElementTagNameMap> {
    _element!: HTMLElementTagNameMap[k];

    constructor(tagName: k) {
        this._element = document.createElement(tagName);
    }


    addClass(...classNames: string[]) {
        this._element.classList.add(...classNames);
        return this;
    }

    setTextContent(text?: number | string) {
        if (text) this._element.textContent = text.toString();
        return this;
    }

    getTextContent() {
        const content = this._element.textContent;
        if (content) return content;
    }

    setId(id: string) {
        this._element.id = id;
        return this;
    }

    get element() {
        return this._element;
    }

    appendChild(node: Node) {
        this._element.appendChild(node);
        return this;
    }

    appendTag<T extends keyof HTMLElementTagNameMap>(...tag: SupTag<T>[]) {
        tag.forEach(tag => {
            this._element.appendChild(tag.element);
        });
        return this;
    }
    appendTagBefore<T extends keyof HTMLElementTagNameMap, U extends keyof HTMLElementTagNameMap>(beforeTag: SupTag<U>, ...tag: SupTag<T>[]) {
        if (this._element.contains(beforeTag.element)) {
            beforeTag.element.before(...tag.map(tag => tag.element));
        }
        return this;
    }

    toggleClass(token: string) {
        this._element.classList.toggle(token);
        return this;
    }


    addEventListener<T extends keyof HTMLElementEventMap>(type: T, listener: EventListenerOrEventListenerObject) {
        this._element.addEventListener(type, listener);
        return this;
    }

    setAttr(qualifiedName: string, value: string) {
        this._element.setAttribute(qualifiedName, value);
        return this;
    }

    hasClass(token: string) {
        return this._element.classList.contains(token);
    }

    applyToElem(applyFn: (elm: HTMLElementTagNameMap[k]) => void) {
        applyFn(this._element);
        return this;
    }

    deleteSelf() {
        this._element.remove();
    }

    getChildrenCount() {
        return this._element.childElementCount;
    }
}





export { SupTag };