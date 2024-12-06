( () => {
    "use strict";
    var e, t, n, r = {
        d: (e, t) => {
            for (var n in t)
                r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
                    enumerable: !0,
                    get: t[n]
                })
        }
        ,
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
    };
    r.d({}, {
        e: () => _t
    }),
    function(e) {
        const t = []
          , n = "__jsObjectId"
          , r = "__dotNetObject"
          , o = "__byte[]"
          , a = "__dotNetStream"
          , i = "__jsStreamReferenceLength";
        let s, c;
        class l {
            constructor(e) {
                this._jsObject = e,
                this._cachedFunctions = new Map
            }
            findFunction(e) {
                const t = this._cachedFunctions.get(e);
                if (t)
                    return t;
                let n, r = this._jsObject;
                if (e.split(".").forEach((t => {
                    if (!(t in r))
                        throw new Error(`Could not find '${e}' ('${t}' was undefined).`);
                    n = r,
                    r = r[t]
                }
                )),
                r instanceof Function)
                    return r = r.bind(n),
                    this._cachedFunctions.set(e, r),
                    r;
                throw new Error(`The value '${e}' is not a function.`)
            }
            getWrappedObject() {
                return this._jsObject
            }
        }
        const u = {
            0: new l(window)
        };
        u[0]._cachedFunctions.set("import", (e => ("string" == typeof e && e.startsWith("./") && (e = new URL(e.substr(2),document.baseURI).toString()),
        import(e))));
        let d, h = 1;
        function f(e) {
            t.push(e)
        }
        function m(e) {
            if (e && "object" == typeof e) {
                u[h] = new l(e);
                const t = {
                    [n]: h
                };
                return h++,
                t
            }
            throw new Error(`Cannot create a JSObjectReference from the value '${e}'.`)
        }
        function p(e) {
            let t = -1;
            if (e instanceof ArrayBuffer && (e = new Uint8Array(e)),
            e instanceof Blob)
                t = e.size;
            else {
                if (!(e.buffer instanceof ArrayBuffer))
                    throw new Error("Supplied value is not a typed array or blob.");
                if (void 0 === e.byteLength)
                    throw new Error(`Cannot create a JSStreamReference from the value '${e}' as it doesn't have a byteLength.`);
                t = e.byteLength
            }
            const r = {
                [i]: t
            };
            try {
                const t = m(e);
                r[n] = t[n]
            } catch (t) {
                throw new Error(`Cannot create a JSStreamReference from the value '${e}'.`)
            }
            return r
        }
        function b(e, n) {
            c = e;
            const r = n ? JSON.parse(n, ( (e, n) => t.reduce(( (t, n) => n(e, t)), n))) : null;
            return c = void 0,
            r
        }
        function v() {
            if (void 0 === s)
                throw new Error("No call dispatcher has been set.");
            if (null === s)
                throw new Error("There are multiple .NET runtimes present, so a default dispatcher could not be resolved. Use DotNetObject to invoke .NET instance methods.");
            return s
        }
        e.attachDispatcher = function(e) {
            const t = new g(e);
            return void 0 === s ? s = t : s && (s = null),
            t
        }
        ,
        e.attachReviver = f,
        e.invokeMethod = function(e, t, ...n) {
            return v().invokeDotNetStaticMethod(e, t, ...n)
        }
        ,
        e.invokeMethodAsync = function(e, t, ...n) {
            return v().invokeDotNetStaticMethodAsync(e, t, ...n)
        }
        ,
        e.createJSObjectReference = m,
        e.createJSStreamReference = p,
        e.disposeJSObjectReference = function(e) {
            const t = e && e[n];
            "number" == typeof t && E(t)
        }
        ,
        function(e) {
            e[e.Default = 0] = "Default",
            e[e.JSObjectReference = 1] = "JSObjectReference",
            e[e.JSStreamReference = 2] = "JSStreamReference",
            e[e.JSVoidResult = 3] = "JSVoidResult"
        }(d = e.JSCallResultType || (e.JSCallResultType = {}));
        class g {
            constructor(e) {
                this._dotNetCallDispatcher = e,
                this._byteArraysToBeRevived = new Map,
                this._pendingDotNetToJSStreams = new Map,
                this._pendingAsyncCalls = {},
                this._nextAsyncCallId = 1
            }
            getDotNetCallDispatcher() {
                return this._dotNetCallDispatcher
            }
            invokeJSFromDotNet(e, t, n, r) {
                const o = b(this, t)
                  , a = D(w(e, r)(...o || []), n);
                return null == a ? null : N(this, a)
            }
            beginInvokeJSFromDotNet(e, t, n, r, o) {
                const a = new Promise((e => {
                    const r = b(this, n);
                    e(w(t, o)(...r || []))
                }
                ));
                e && a.then((t => N(this, [e, !0, D(t, r)]))).then((t => this._dotNetCallDispatcher.endInvokeJSFromDotNet(e, !0, t)), (t => this._dotNetCallDispatcher.endInvokeJSFromDotNet(e, !1, JSON.stringify([e, !1, y(t)]))))
            }
            endInvokeDotNetFromJS(e, t, n) {
                const r = t ? b(this, n) : new Error(n);
                this.completePendingCall(parseInt(e, 10), t, r)
            }
            invokeDotNetStaticMethod(e, t, ...n) {
                return this.invokeDotNetMethod(e, t, null, n)
            }
            invokeDotNetStaticMethodAsync(e, t, ...n) {
                return this.invokeDotNetMethodAsync(e, t, null, n)
            }
            invokeDotNetMethod(e, t, n, r) {
                if (this._dotNetCallDispatcher.invokeDotNetFromJS) {
                    const o = N(this, r)
                      , a = this._dotNetCallDispatcher.invokeDotNetFromJS(e, t, n, o);
                    return a ? b(this, a) : null
                }
                throw new Error("The current dispatcher does not support synchronous calls from JS to .NET. Use invokeDotNetMethodAsync instead.")
            }
            invokeDotNetMethodAsync(e, t, n, r) {
                if (e && n)
                    throw new Error(`For instance method calls, assemblyName should be null. Received '${e}'.`);
                const o = this._nextAsyncCallId++
                  , a = new Promise(( (e, t) => {
                    this._pendingAsyncCalls[o] = {
                        resolve: e,
                        reject: t
                    }
                }
                ));
                try {
                    const a = N(this, r);
                    this._dotNetCallDispatcher.beginInvokeDotNetFromJS(o, e, t, n, a)
                } catch (e) {
                    this.completePendingCall(o, !1, e)
                }
                return a
            }
            receiveByteArray(e, t) {
                this._byteArraysToBeRevived.set(e, t)
            }
            processByteArray(e) {
                const t = this._byteArraysToBeRevived.get(e);
                return t ? (this._byteArraysToBeRevived.delete(e),
                t) : null
            }
            supplyDotNetStream(e, t) {
                if (this._pendingDotNetToJSStreams.has(e)) {
                    const n = this._pendingDotNetToJSStreams.get(e);
                    this._pendingDotNetToJSStreams.delete(e),
                    n.resolve(t)
                } else {
                    const n = new C;
                    n.resolve(t),
                    this._pendingDotNetToJSStreams.set(e, n)
                }
            }
            getDotNetStreamPromise(e) {
                let t;
                if (this._pendingDotNetToJSStreams.has(e))
                    t = this._pendingDotNetToJSStreams.get(e).streamPromise,
                    this._pendingDotNetToJSStreams.delete(e);
                else {
                    const n = new C;
                    this._pendingDotNetToJSStreams.set(e, n),
                    t = n.streamPromise
                }
                return t
            }
            completePendingCall(e, t, n) {
                if (!this._pendingAsyncCalls.hasOwnProperty(e))
                    throw new Error(`There is no pending async call with ID ${e}.`);
                const r = this._pendingAsyncCalls[e];
                delete this._pendingAsyncCalls[e],
                t ? r.resolve(n) : r.reject(n)
            }
        }
        function y(e) {
            return e instanceof Error ? `${e.message}\n${e.stack}` : e ? e.toString() : "null"
        }
        function w(e, t) {
            const n = u[t];
            if (n)
                return n.findFunction(e);
            throw new Error(`JS object instance with ID ${t} does not exist (has it been disposed?).`)
        }
        function E(e) {
            delete u[e]
        }
        e.findJSFunction = w,
        e.disposeJSObjectReferenceById = E;
        class S {
            constructor(e, t) {
                this._id = e,
                this._callDispatcher = t
            }
            invokeMethod(e, ...t) {
                return this._callDispatcher.invokeDotNetMethod(null, e, this._id, t)
            }
            invokeMethodAsync(e, ...t) {
                return this._callDispatcher.invokeDotNetMethodAsync(null, e, this._id, t)
            }
            dispose() {
                this._callDispatcher.invokeDotNetMethodAsync(null, "__Dispose", this._id, null).catch((e => console.error(e)))
            }
            serializeAsArg() {
                return {
                    [r]: this._id
                }
            }
        }
        e.DotNetObject = S,
        f((function(e, t) {
            if (t && "object" == typeof t) {
                if (t.hasOwnProperty(r))
                    return new S(t[r],c);
                if (t.hasOwnProperty(n)) {
                    const e = t[n]
                      , r = u[e];
                    if (r)
                        return r.getWrappedObject();
                    throw new Error(`JS object instance with Id '${e}' does not exist. It may have been disposed.`)
                }
                if (t.hasOwnProperty(o)) {
                    const e = t[o]
                      , n = c.processByteArray(e);
                    if (void 0 === n)
                        throw new Error(`Byte array index '${e}' does not exist.`);
                    return n
                }
                if (t.hasOwnProperty(a)) {
                    const e = t[a]
                      , n = c.getDotNetStreamPromise(e);
                    return new I(n)
                }
            }
            return t
        }
        ));
        class I {
            constructor(e) {
                this._streamPromise = e
            }
            stream() {
                return this._streamPromise
            }
            async arrayBuffer() {
                return new Response(await this.stream()).arrayBuffer()
            }
        }
        class C {
            constructor() {
                this.streamPromise = new Promise(( (e, t) => {
                    this.resolve = e,
                    this.reject = t
                }
                ))
            }
        }
        function D(e, t) {
            switch (t) {
            case d.Default:
                return e;
            case d.JSObjectReference:
                return m(e);
            case d.JSStreamReference:
                return p(e);
            case d.JSVoidResult:
                return null;
            default:
                throw new Error(`Invalid JS call result type '${t}'.`)
            }
        }
        let A = 0;
        function N(e, t) {
            A = 0,
            c = e;
            const n = JSON.stringify(t, R);
            return c = void 0,
            n
        }
        function R(e, t) {
            if (t instanceof S)
                return t.serializeAsArg();
            if (t instanceof Uint8Array) {
                c.getDotNetCallDispatcher().sendByteArray(A, t);
                const e = {
                    [o]: A
                };
                return A++,
                e
            }
            return t
        }
    }(e || (e = {})),
    function(e) {
        e[e.prependFrame = 1] = "prependFrame",
        e[e.removeFrame = 2] = "removeFrame",
        e[e.setAttribute = 3] = "setAttribute",
        e[e.removeAttribute = 4] = "removeAttribute",
        e[e.updateText = 5] = "updateText",
        e[e.stepIn = 6] = "stepIn",
        e[e.stepOut = 7] = "stepOut",
        e[e.updateMarkup = 8] = "updateMarkup",
        e[e.permutationListEntry = 9] = "permutationListEntry",
        e[e.permutationListEnd = 10] = "permutationListEnd"
    }(t || (t = {})),
    function(e) {
        e[e.element = 1] = "element",
        e[e.text = 2] = "text",
        e[e.attribute = 3] = "attribute",
        e[e.component = 4] = "component",
        e[e.region = 5] = "region",
        e[e.elementReferenceCapture = 6] = "elementReferenceCapture",
        e[e.markup = 8] = "markup",
        e[e.namedEvent = 10] = "namedEvent"
    }(n || (n = {}));
    class o {
        constructor(e, t) {
            this.componentId = e,
            this.fieldValue = t
        }
        static fromEvent(e, t) {
            const n = t.target;
            if (n instanceof Element) {
                const t = function(e) {
                    return e instanceof HTMLInputElement ? e.type && "checkbox" === e.type.toLowerCase() ? {
                        value: e.checked
                    } : {
                        value: e.value
                    } : e instanceof HTMLSelectElement || e instanceof HTMLTextAreaElement ? {
                        value: e.value
                    } : null
                }(n);
                if (t)
                    return new o(e,t.value)
            }
            return null
        }
    }
    const a = new Map
      , i = new Map
      , s = [];
    function c(e) {
        return a.get(e)
    }
    function l(e) {
        const t = a.get(e);
        return (null == t ? void 0 : t.browserEventName) || e
    }
    function u(e, t) {
        e.forEach((e => a.set(e, t)))
    }
    function d(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
            const r = e[n];
            t.push({
                identifier: r.identifier,
                clientX: r.clientX,
                clientY: r.clientY,
                screenX: r.screenX,
                screenY: r.screenY,
                pageX: r.pageX,
                pageY: r.pageY
            })
        }
        return t
    }
    function h(e) {
        return {
            detail: e.detail,
            screenX: e.screenX,
            screenY: e.screenY,
            clientX: e.clientX,
            clientY: e.clientY,
            offsetX: e.offsetX,
            offsetY: e.offsetY,
            pageX: e.pageX,
            pageY: e.pageY,
            movementX: e.movementX,
            movementY: e.movementY,
            button: e.button,
            buttons: e.buttons,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey,
            type: e.type
        }
    }
    u(["input", "change"], {
        createEventArgs: function(e) {
            const t = e.target;
            if (function(e) {
                return -1 !== f.indexOf(e.getAttribute("type"))
            }(t)) {
                const e = function(e) {
                    const t = e.value
                      , n = e.type;
                    switch (n) {
                    case "date":
                    case "month":
                    case "week":
                        return t;
                    case "datetime-local":
                        return 16 === t.length ? t + ":00" : t;
                    case "time":
                        return 5 === t.length ? t + ":00" : t
                    }
                    throw new Error(`Invalid element type '${n}'.`)
                }(t);
                return {
                    value: e
                }
            }
            if (function(e) {
                return e instanceof HTMLSelectElement && "select-multiple" === e.type
            }(t)) {
                const e = t;
                return {
                    value: Array.from(e.options).filter((e => e.selected)).map((e => e.value))
                }
            }
            {
                const e = function(e) {
                    return !!e && "INPUT" === e.tagName && "checkbox" === e.getAttribute("type")
                }(t);
                return {
                    value: e ? !!t.checked : t.value
                }
            }
        }
    }),
    u(["copy", "cut", "paste"], {
        createEventArgs: e => ({
            type: e.type
        })
    }),
    u(["drag", "dragend", "dragenter", "dragleave", "dragover", "dragstart", "drop"], {
        createEventArgs: e => {
            return {
                ...h(t = e),
                dataTransfer: t.dataTransfer ? {
                    dropEffect: t.dataTransfer.dropEffect,
                    effectAllowed: t.dataTransfer.effectAllowed,
                    files: Array.from(t.dataTransfer.files).map((e => e.name)),
                    items: Array.from(t.dataTransfer.items).map((e => ({
                        kind: e.kind,
                        type: e.type
                    }))),
                    types: t.dataTransfer.types
                } : null
            };
            var t
        }
    }),
    u(["focus", "blur", "focusin", "focusout"], {
        createEventArgs: e => ({
            type: e.type
        })
    }),
    u(["keydown", "keyup", "keypress"], {
        createEventArgs: e => {
            return {
                key: (t = e).key,
                code: t.code,
                location: t.location,
                repeat: t.repeat,
                ctrlKey: t.ctrlKey,
                shiftKey: t.shiftKey,
                altKey: t.altKey,
                metaKey: t.metaKey,
                type: t.type
            };
            var t
        }
    }),
    u(["contextmenu", "click", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "mouseleave", "mouseenter", "dblclick"], {
        createEventArgs: e => h(e)
    }),
    u(["error"], {
        createEventArgs: e => {
            return {
                message: (t = e).message,
                filename: t.filename,
                lineno: t.lineno,
                colno: t.colno,
                type: t.type
            };
            var t
        }
    }),
    u(["loadstart", "timeout", "abort", "load", "loadend", "progress"], {
        createEventArgs: e => {
            return {
                lengthComputable: (t = e).lengthComputable,
                loaded: t.loaded,
                total: t.total,
                type: t.type
            };
            var t
        }
    }),
    u(["touchcancel", "touchend", "touchmove", "touchenter", "touchleave", "touchstart"], {
        createEventArgs: e => {
            return {
                detail: (t = e).detail,
                touches: d(t.touches),
                targetTouches: d(t.targetTouches),
                changedTouches: d(t.changedTouches),
                ctrlKey: t.ctrlKey,
                shiftKey: t.shiftKey,
                altKey: t.altKey,
                metaKey: t.metaKey,
                type: t.type
            };
            var t
        }
    }),
    u(["gotpointercapture", "lostpointercapture", "pointercancel", "pointerdown", "pointerenter", "pointerleave", "pointermove", "pointerout", "pointerover", "pointerup"], {
        createEventArgs: e => {
            return {
                ...h(t = e),
                pointerId: t.pointerId,
                width: t.width,
                height: t.height,
                pressure: t.pressure,
                tiltX: t.tiltX,
                tiltY: t.tiltY,
                pointerType: t.pointerType,
                isPrimary: t.isPrimary
            };
            var t
        }
    }),
    u(["wheel", "mousewheel"], {
        createEventArgs: e => {
            return {
                ...h(t = e),
                deltaX: t.deltaX,
                deltaY: t.deltaY,
                deltaZ: t.deltaZ,
                deltaMode: t.deltaMode
            };
            var t
        }
    }),
    u(["cancel", "close", "toggle"], {
        createEventArgs: () => ({})
    });
    const f = ["date", "datetime-local", "month", "time", "week"]
      , m = new Map;
    let p, b, v = 0;
    const g = {
        async add(e, t, n) {
            if (!n)
                throw new Error("initialParameters must be an object, even if empty.");
            const r = "__bl-dynamic-root:" + (++v).toString();
            m.set(r, e);
            const o = await E().invokeMethodAsync("AddRootComponent", t, r)
              , a = new w(o,b[t]);
            return await a.setParameters(n),
            a
        }
    };
    class y {
        invoke(e) {
            return this._callback(e)
        }
        setCallback(t) {
            this._selfJSObjectReference || (this._selfJSObjectReference = e.createJSObjectReference(this)),
            this._callback = t
        }
        getJSObjectReference() {
            return this._selfJSObjectReference
        }
        dispose() {
            this._selfJSObjectReference && e.disposeJSObjectReference(this._selfJSObjectReference)
        }
    }
    class w {
        constructor(e, t) {
            this._jsEventCallbackWrappers = new Map,
            this._componentId = e;
            for (const e of t)
                "eventcallback" === e.type && this._jsEventCallbackWrappers.set(e.name.toLowerCase(), new y)
        }
        setParameters(e) {
            const t = {}
              , n = Object.entries(e || {})
              , r = n.length;
            for (const [e,r] of n) {
                const n = this._jsEventCallbackWrappers.get(e.toLowerCase());
                n && r ? (n.setCallback(r),
                t[e] = n.getJSObjectReference()) : t[e] = r
            }
            return E().invokeMethodAsync("SetRootComponentParameters", this._componentId, r, t)
        }
        async dispose() {
            if (null !== this._componentId) {
                await E().invokeMethodAsync("RemoveRootComponent", this._componentId),
                this._componentId = null;
                for (const e of this._jsEventCallbackWrappers.values())
                    e.dispose()
            }
        }
    }
    function E() {
        if (!p)
            throw new Error("Dynamic root components have not been enabled in this application.");
        return p
    }
    const S = new Map
      , I = []
      , C = new Map;
    function D(e, t, n) {
        return N(e, t.eventHandlerId, ( () => A(e).invokeMethodAsync("DispatchEventAsync", t, n)))
    }
    function A(e) {
        const t = S.get(e);
        if (!t)
            throw new Error(`No interop methods are registered for renderer ${e}`);
        return t
    }
    let N = (e, t, n) => n();
    const R = x(["abort", "blur", "cancel", "canplay", "canplaythrough", "change", "close", "cuechange", "durationchange", "emptied", "ended", "error", "focus", "load", "loadeddata", "loadedmetadata", "loadend", "loadstart", "mouseenter", "mouseleave", "pointerenter", "pointerleave", "pause", "play", "playing", "progress", "ratechange", "reset", "scroll", "seeked", "seeking", "stalled", "submit", "suspend", "timeupdate", "toggle", "unload", "volumechange", "waiting", "DOMNodeInsertedIntoDocument", "DOMNodeRemovedFromDocument"])
      , k = {
        submit: !0
    }
      , T = x(["click", "dblclick", "mousedown", "mousemove", "mouseup"]);
    class _ {
        constructor(e) {
            this.browserRendererId = e,
            this.afterClickCallbacks = [];
            const t = ++_.nextEventDelegatorId;
            this.eventsCollectionKey = `_blazorEvents_${t}`,
            this.eventInfoStore = new O(this.onGlobalEvent.bind(this))
        }
        setListener(e, t, n, r) {
            const o = this.getEventHandlerInfosForElement(e, !0)
              , a = o.getHandler(t);
            if (a)
                this.eventInfoStore.update(a.eventHandlerId, n);
            else {
                const a = {
                    element: e,
                    eventName: t,
                    eventHandlerId: n,
                    renderingComponentId: r
                };
                this.eventInfoStore.add(a),
                o.setHandler(t, a)
            }
        }
        getHandler(e) {
            return this.eventInfoStore.get(e)
        }
        removeListener(e) {
            const t = this.eventInfoStore.remove(e);
            if (t) {
                const e = t.element
                  , n = this.getEventHandlerInfosForElement(e, !1);
                n && n.removeHandler(t.eventName)
            }
        }
        notifyAfterClick(e) {
            this.afterClickCallbacks.push(e),
            this.eventInfoStore.addGlobalListener("click")
        }
        setStopPropagation(e, t, n) {
            this.getEventHandlerInfosForElement(e, !0).stopPropagation(t, n)
        }
        setPreventDefault(e, t, n) {
            this.getEventHandlerInfosForElement(e, !0).preventDefault(t, n)
        }
        onGlobalEvent(e) {
            if (!(e.target instanceof Element))
                return;
            this.dispatchGlobalEventToAllElements(e.type, e);
            const t = (n = e.type,
            i.get(n));
            var n;
            t && t.forEach((t => this.dispatchGlobalEventToAllElements(t, e))),
            "click" === e.type && this.afterClickCallbacks.forEach((t => t(e)))
        }
        dispatchGlobalEventToAllElements(e, t) {
            const n = t.composedPath();
            let r = n.shift()
              , a = null
              , i = !1;
            const s = Object.prototype.hasOwnProperty.call(R, e);
            let l = !1;
            for (; r; ) {
                const h = r
                  , f = this.getEventHandlerInfosForElement(h, !1);
                if (f) {
                    const n = f.getHandler(e);
                    if (n && (u = h,
                    d = t.type,
                    !((u instanceof HTMLButtonElement || u instanceof HTMLInputElement || u instanceof HTMLTextAreaElement || u instanceof HTMLSelectElement) && Object.prototype.hasOwnProperty.call(T, d) && u.disabled))) {
                        if (!i) {
                            const n = c(e);
                            a = (null == n ? void 0 : n.createEventArgs) ? n.createEventArgs(t) : {},
                            i = !0
                        }
                        Object.prototype.hasOwnProperty.call(k, t.type) && t.preventDefault(),
                        D(this.browserRendererId, {
                            eventHandlerId: n.eventHandlerId,
                            eventName: e,
                            eventFieldInfo: o.fromEvent(n.renderingComponentId, t)
                        }, a)
                    }
                    f.stopPropagation(e) && (l = !0),
                    f.preventDefault(e) && t.preventDefault()
                }
                r = s || l ? void 0 : n.shift()
            }
            var u, d
        }
        getEventHandlerInfosForElement(e, t) {
            return Object.prototype.hasOwnProperty.call(e, this.eventsCollectionKey) ? e[this.eventsCollectionKey] : t ? e[this.eventsCollectionKey] = new L : null
        }
    }
    _.nextEventDelegatorId = 0;
    class O {
        constructor(e) {
            this.globalListener = e,
            this.infosByEventHandlerId = {},
            this.countByEventName = {},
            s.push(this.handleEventNameAliasAdded.bind(this))
        }
        add(e) {
            if (this.infosByEventHandlerId[e.eventHandlerId])
                throw new Error(`Event ${e.eventHandlerId} is already tracked`);
            this.infosByEventHandlerId[e.eventHandlerId] = e,
            this.addGlobalListener(e.eventName)
        }
        get(e) {
            return this.infosByEventHandlerId[e]
        }
        addGlobalListener(e) {
            if (e = l(e),
            Object.prototype.hasOwnProperty.call(this.countByEventName, e))
                this.countByEventName[e]++;
            else {
                this.countByEventName[e] = 1;
                const t = Object.prototype.hasOwnProperty.call(R, e);
                document.addEventListener(e, this.globalListener, t)
            }
        }
        update(e, t) {
            if (Object.prototype.hasOwnProperty.call(this.infosByEventHandlerId, t))
                throw new Error(`Event ${t} is already tracked`);
            const n = this.infosByEventHandlerId[e];
            delete this.infosByEventHandlerId[e],
            n.eventHandlerId = t,
            this.infosByEventHandlerId[t] = n
        }
        remove(e) {
            const t = this.infosByEventHandlerId[e];
            if (t) {
                delete this.infosByEventHandlerId[e];
                const n = l(t.eventName);
                0 == --this.countByEventName[n] && (delete this.countByEventName[n],
                document.removeEventListener(n, this.globalListener))
            }
            return t
        }
        handleEventNameAliasAdded(e, t) {
            if (Object.prototype.hasOwnProperty.call(this.countByEventName, e)) {
                const n = this.countByEventName[e];
                delete this.countByEventName[e],
                document.removeEventListener(e, this.globalListener),
                this.addGlobalListener(t),
                this.countByEventName[t] += n - 1
            }
        }
    }
    class L {
        constructor() {
            this.handlers = {},
            this.preventDefaultFlags = null,
            this.stopPropagationFlags = null
        }
        getHandler(e) {
            return Object.prototype.hasOwnProperty.call(this.handlers, e) ? this.handlers[e] : null
        }
        setHandler(e, t) {
            this.handlers[e] = t
        }
        removeHandler(e) {
            delete this.handlers[e]
        }
        preventDefault(e, t) {
            return void 0 !== t && (this.preventDefaultFlags = this.preventDefaultFlags || {},
            this.preventDefaultFlags[e] = t),
            !!this.preventDefaultFlags && this.preventDefaultFlags[e]
        }
        stopPropagation(e, t) {
            return void 0 !== t && (this.stopPropagationFlags = this.stopPropagationFlags || {},
            this.stopPropagationFlags[e] = t),
            !!this.stopPropagationFlags && this.stopPropagationFlags[e]
        }
    }
    function x(e) {
        const t = {};
        return e.forEach((e => {
            t[e] = !0
        }
        )),
        t
    }
    const F = Symbol()
      , M = Symbol();
    function P(e, t) {
        if (F in e)
            return e;
        const n = [];
        if (e.childNodes.length > 0) {
            if (!t)
                throw new Error("New logical elements must start empty, or allowExistingContents must be true");
            e.childNodes.forEach((t => {
                const r = P(t, !0);
                r[M] = e,
                n.push(r)
            }
            ))
        }
        return e[F] = n,
        e
    }
    function B(e) {
        const t = W(e);
        for (; t.length; )
            J(e, 0)
    }
    function j(e, t) {
        const n = document.createComment("!");
        return H(n, e, t),
        n
    }
    function H(e, t, n) {
        const r = e;
        let o = e;
        if (e instanceof Comment) {
            const t = W(r);
            if ((null == t ? void 0 : t.length) > 0) {
                const t = G(r)
                  , n = new Range;
                n.setStartBefore(e),
                n.setEndAfter(t),
                o = n.extractContents()
            }
        }
        const a = U(r);
        if (a) {
            const e = W(a)
              , t = Array.prototype.indexOf.call(e, r);
            e.splice(t, 1),
            delete r[M]
        }
        const i = W(t);
        if (n < i.length) {
            const e = i[n];
            e.parentNode.insertBefore(o, e),
            i.splice(n, 0, r)
        } else
            Y(o, t),
            i.push(r);
        r[M] = t,
        F in r || (r[F] = [])
    }
    function J(e, t) {
        const n = W(e).splice(t, 1)[0];
        if (n instanceof Comment) {
            const e = W(n);
            if (e)
                for (; e.length > 0; )
                    J(n, 0)
        }
        const r = n;
        r.parentNode.removeChild(r)
    }
    function U(e) {
        return e[M] || null
    }
    function z(e, t) {
        return W(e)[t]
    }
    function $(e) {
        const t = X(e);
        return "http://www.w3.org/2000/svg" === t.namespaceURI && "foreignObject" !== t.tagName
    }
    function W(e) {
        return e[F]
    }
    function K(e) {
        const t = W(U(e));
        return t[Array.prototype.indexOf.call(t, e) + 1] || null
    }
    function V(e, t) {
        const n = W(e);
        t.forEach((e => {
            e.moveRangeStart = n[e.fromSiblingIndex],
            e.moveRangeEnd = G(e.moveRangeStart)
        }
        )),
        t.forEach((t => {
            const r = document.createComment("marker");
            t.moveToBeforeMarker = r;
            const o = n[t.toSiblingIndex + 1];
            o ? o.parentNode.insertBefore(r, o) : Y(r, e)
        }
        )),
        t.forEach((e => {
            const t = e.moveToBeforeMarker
              , n = t.parentNode
              , r = e.moveRangeStart
              , o = e.moveRangeEnd;
            let a = r;
            for (; a; ) {
                const e = a.nextSibling;
                if (n.insertBefore(a, t),
                a === o)
                    break;
                a = e
            }
            n.removeChild(t)
        }
        )),
        t.forEach((e => {
            n[e.toSiblingIndex] = e.moveRangeStart
        }
        ))
    }
    function X(e) {
        if (e instanceof Element || e instanceof DocumentFragment)
            return e;
        if (e instanceof Comment)
            return e.parentNode;
        throw new Error("Not a valid logical element")
    }
    function Y(e, t) {
        if (t instanceof Element || t instanceof DocumentFragment)
            t.appendChild(e);
        else {
            if (!(t instanceof Comment))
                throw new Error(`Cannot append node because the parent is not a valid logical element. Parent: ${t}`);
            {
                const n = K(t);
                n ? n.parentNode.insertBefore(e, n) : Y(e, U(t))
            }
        }
    }
    function G(e) {
        if (e instanceof Element || e instanceof DocumentFragment)
            return e;
        const t = K(e);
        if (t)
            return t.previousSibling;
        {
            const t = U(e);
            return t instanceof Element || t instanceof DocumentFragment ? t.lastChild : G(t)
        }
    }
    function q(e) {
        return `_bl_${e}`
    }
    Symbol();
    const Z = "__internalId";
    e.attachReviver(( (e, t) => t && "object" == typeof t && Object.prototype.hasOwnProperty.call(t, Z) && "string" == typeof t[Z] ? function(e) {
        const t = `[${q(e)}]`;
        return document.querySelector(t)
    }(t[Z]) : t));
    const Q = "_blazorDeferredValue";
    function ee(e) {
        return "select-multiple" === e.type
    }
    function te(e, t) {
        e.value = t || ""
    }
    function ne(e, t) {
        e instanceof HTMLSelectElement ? ee(e) ? function(e, t) {
            t || (t = []);
            for (let n = 0; n < e.options.length; n++)
                e.options[n].selected = -1 !== t.indexOf(e.options[n].value)
        }(e, t) : te(e, t) : e.value = t
    }
    function re(e) {
        const t = function(e) {
            for (; e; ) {
                if (e instanceof HTMLSelectElement)
                    return e;
                e = e.parentElement
            }
            return null
        }(e);
        if (!function(e) {
            return !!e && Q in e
        }(t))
            return !1;
        if (ee(t))
            e.selected = -1 !== t._blazorDeferredValue.indexOf(e.value);
        else {
            if (t._blazorDeferredValue !== e.value)
                return !1;
            te(t, e.value),
            delete t._blazorDeferredValue
        }
        return !0
    }
    const oe = document.createElement("template")
      , ae = document.createElementNS("http://www.w3.org/2000/svg", "g")
      , ie = new Set
      , se = Symbol()
      , ce = Symbol();
    class le {
        constructor(e) {
            this.rootComponentIds = new Set,
            this.childComponentLocations = {},
            this.eventDelegator = new _(e),
            this.eventDelegator.notifyAfterClick((e => {
                Ce() && function(e, t) {
                    if (0 !== e.button || function(e) {
                        return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey
                    }(e))
                        return;
                    if (e.defaultPrevented)
                        return;
                    const n = function(e) {
                        const t = e.composedPath && e.composedPath();
                        if (t)
                            for (let e = 0; e < t.length; e++) {
                                const n = t[e];
                                if (n instanceof HTMLAnchorElement || n instanceof SVGAElement)
                                    return n
                            }
                        return null
                    }(e);
                    if (n && function(e) {
                        const t = e.getAttribute("target");
                        return (!t || "_self" === t) && e.hasAttribute("href") && !e.hasAttribute("download")
                    }(n)) {
                        const t = Ie(n.getAttribute("href"));
                        ye(t) && (e.preventDefault(),
                        xe(t, !0, !1))
                    }
                }(e)
            }
            ))
        }
        getRootComponentCount() {
            return this.rootComponentIds.size
        }
        attachRootComponentToLogicalElement(e, t, n) {
            if (function(e) {
                return e[se]
            }(t))
                throw new Error(`Root component '${e}' could not be attached because its target element is already associated with a root component`);
            n && (t = j(t, W(t).length)),
            ue(t, !0),
            this.attachComponentToElement(e, t),
            this.rootComponentIds.add(e),
            ie.add(t)
        }
        updateComponent(e, t, n, r) {
            var o;
            const a = this.childComponentLocations[t];
            if (!a)
                throw new Error(`No element is currently associated with component ${t}`);
            ie.delete(a) && (B(a),
            a instanceof Comment && (a.textContent = "!"));
            const i = null === (o = X(a)) || void 0 === o ? void 0 : o.getRootNode()
              , s = i && i.activeElement;
            this.applyEdits(e, t, a, 0, n, r),
            s instanceof HTMLElement && i && i.activeElement !== s && s.focus()
        }
        disposeComponent(e) {
            if (this.rootComponentIds.delete(e)) {
                const t = this.childComponentLocations[e];
                ue(t, !1),
                !0 === t[ce] ? ie.add(t) : B(t)
            }
            delete this.childComponentLocations[e]
        }
        disposeEventHandler(e) {
            this.eventDelegator.removeListener(e)
        }
        attachComponentToElement(e, t) {
            this.childComponentLocations[e] = t
        }
        applyEdits(e, n, r, o, a, i) {
            let s, c = 0, l = o;
            const u = e.arrayBuilderSegmentReader
              , d = e.editReader
              , h = e.frameReader
              , f = u.values(a)
              , m = u.offset(a)
              , p = m + u.count(a);
            for (let a = m; a < p; a++) {
                const u = e.diffReader.editsEntry(f, a)
                  , m = d.editType(u);
                switch (m) {
                case t.prependFrame:
                    {
                        const t = d.newTreeIndex(u)
                          , o = e.referenceFramesEntry(i, t)
                          , a = d.siblingIndex(u);
                        this.insertFrame(e, n, r, l + a, i, o, t);
                        break
                    }
                case t.removeFrame:
                    J(r, l + d.siblingIndex(u));
                    break;
                case t.setAttribute:
                    {
                        const t = d.newTreeIndex(u)
                          , o = e.referenceFramesEntry(i, t)
                          , a = z(r, l + d.siblingIndex(u));
                        if (!(a instanceof Element))
                            throw new Error("Cannot set attribute on non-element child");
                        this.applyAttribute(e, n, a, o);
                        break
                    }
                case t.removeAttribute:
                    {
                        const e = z(r, l + d.siblingIndex(u));
                        if (!(e instanceof Element))
                            throw new Error("Cannot remove attribute from non-element child");
                        {
                            const t = d.removedAttributeName(u);
                            this.setOrRemoveAttributeOrProperty(e, t, null)
                        }
                        break
                    }
                case t.updateText:
                    {
                        const t = d.newTreeIndex(u)
                          , n = e.referenceFramesEntry(i, t)
                          , o = z(r, l + d.siblingIndex(u));
                        if (!(o instanceof Text))
                            throw new Error("Cannot set text content on non-text child");
                        o.textContent = h.textContent(n);
                        break
                    }
                case t.updateMarkup:
                    {
                        const t = d.newTreeIndex(u)
                          , n = e.referenceFramesEntry(i, t)
                          , o = d.siblingIndex(u);
                        J(r, l + o),
                        this.insertMarkup(e, r, l + o, n);
                        break
                    }
                case t.stepIn:
                    r = z(r, l + d.siblingIndex(u)),
                    c++,
                    l = 0;
                    break;
                case t.stepOut:
                    r = U(r),
                    c--,
                    l = 0 === c ? o : 0;
                    break;
                case t.permutationListEntry:
                    s = s || [],
                    s.push({
                        fromSiblingIndex: l + d.siblingIndex(u),
                        toSiblingIndex: l + d.moveToSiblingIndex(u)
                    });
                    break;
                case t.permutationListEnd:
                    V(r, s),
                    s = void 0;
                    break;
                default:
                    throw new Error(`Unknown edit type: ${m}`)
                }
            }
        }
        insertFrame(e, t, r, o, a, i, s) {
            const c = e.frameReader
              , l = c.frameType(i);
            switch (l) {
            case n.element:
                return this.insertElement(e, t, r, o, a, i, s),
                1;
            case n.text:
                return this.insertText(e, r, o, i),
                1;
            case n.attribute:
                throw new Error("Attribute frames should only be present as leading children of element frames.");
            case n.component:
                return this.insertComponent(e, r, o, i),
                1;
            case n.region:
                return this.insertFrameRange(e, t, r, o, a, s + 1, s + c.subtreeLength(i));
            case n.elementReferenceCapture:
                if (r instanceof Element)
                    return u = r,
                    d = c.elementReferenceCaptureId(i),
                    u.setAttribute(q(d), ""),
                    0;
                throw new Error("Reference capture frames can only be children of element frames.");
            case n.markup:
                return this.insertMarkup(e, r, o, i),
                1;
            case n.namedEvent:
                return 0;
            default:
                throw new Error(`Unknown frame type: ${l}`)
            }
            var u, d
        }
        insertElement(e, t, r, o, a, i, s) {
            const c = e.frameReader
              , l = c.elementName(i)
              , u = "svg" === l || $(r) ? document.createElementNS("http://www.w3.org/2000/svg", l) : document.createElement(l)
              , d = P(u);
            let h = !1;
            const f = s + c.subtreeLength(i);
            for (let i = s + 1; i < f; i++) {
                const s = e.referenceFramesEntry(a, i);
                if (c.frameType(s) !== n.attribute) {
                    H(u, r, o),
                    h = !0,
                    this.insertFrameRange(e, t, d, 0, a, i, f);
                    break
                }
                this.applyAttribute(e, t, u, s)
            }
            var m;
            h || H(u, r, o),
            (m = u)instanceof HTMLOptionElement ? re(m) : Q in m && ne(m, m[Q])
        }
        insertComponent(e, t, n, r) {
            const o = j(t, n)
              , a = e.frameReader.componentId(r);
            this.attachComponentToElement(a, o)
        }
        insertText(e, t, n, r) {
            const o = e.frameReader.textContent(r);
            H(document.createTextNode(o), t, n)
        }
        insertMarkup(e, t, n, r) {
            const o = j(t, n)
              , a = (i = e.frameReader.markupContent(r),
            $(t) ? (ae.innerHTML = i || " ",
            ae) : (oe.innerHTML = i || " ",
            oe.content.querySelectorAll("script").forEach((e => {
                const t = document.createElement("script");
                t.textContent = e.textContent,
                e.getAttributeNames().forEach((n => {
                    t.setAttribute(n, e.getAttribute(n))
                }
                )),
                e.parentNode.replaceChild(t, e)
            }
            )),
            oe.content));
            var i;
            let s = 0;
            for (; a.firstChild; )
                H(a.firstChild, o, s++)
        }
        applyAttribute(e, t, n, r) {
            const o = e.frameReader
              , a = o.attributeName(r)
              , i = o.attributeEventHandlerId(r);
            if (i) {
                const e = he(a);
                return void this.eventDelegator.setListener(n, e, i, t)
            }
            const s = o.attributeValue(r);
            this.setOrRemoveAttributeOrProperty(n, a, s)
        }
        insertFrameRange(e, t, n, r, o, a, i) {
            const s = r;
            for (let s = a; s < i; s++) {
                const a = e.referenceFramesEntry(o, s);
                r += this.insertFrame(e, t, n, r, o, a, s),
                s += de(e, a)
            }
            return r - s
        }
        setOrRemoveAttributeOrProperty(e, t, n) {
            (function(e, t, n) {
                switch (t) {
                case "value":
                    return function(e, t) {
                        switch (t && "INPUT" === e.tagName && (t = function(e, t) {
                            switch (t.getAttribute("type")) {
                            case "time":
                                return 8 !== e.length || !e.endsWith("00") && t.hasAttribute("step") ? e : e.substring(0, 5);
                            case "datetime-local":
                                return 19 !== e.length || !e.endsWith("00") && t.hasAttribute("step") ? e : e.substring(0, 16);
                            default:
                                return e
                            }
                        }(t, e)),
                        e.tagName) {
                        case "INPUT":
                        case "SELECT":
                        case "TEXTAREA":
                            return t && e instanceof HTMLSelectElement && ee(e) && (t = JSON.parse(t)),
                            ne(e, t),
                            e[Q] = t,
                            !0;
                        case "OPTION":
                            return t || "" === t ? e.setAttribute("value", t) : e.removeAttribute("value"),
                            re(e),
                            !0;
                        default:
                            return !1
                        }
                    }(e, n);
                case "checked":
                    return function(e, t) {
                        return "INPUT" === e.tagName && (e.checked = null !== t,
                        !0)
                    }(e, n);
                default:
                    return !1
                }
            }
            )(e, t, n) || (t.startsWith("__internal_") ? this.applyInternalAttribute(e, t.substring(11), n) : null !== n ? e.setAttribute(t, n) : e.removeAttribute(t))
        }
        applyInternalAttribute(e, t, n) {
            if (t.startsWith("stopPropagation_")) {
                const r = he(t.substring(16));
                this.eventDelegator.setStopPropagation(e, r, null !== n)
            } else {
                if (!t.startsWith("preventDefault_"))
                    throw new Error(`Unsupported internal attribute '${t}'`);
                {
                    const r = he(t.substring(15));
                    this.eventDelegator.setPreventDefault(e, r, null !== n)
                }
            }
        }
    }
    function ue(e, t) {
        e[se] = t
    }
    function de(e, t) {
        const r = e.frameReader;
        switch (r.frameType(t)) {
        case n.component:
        case n.element:
        case n.region:
            return r.subtreeLength(t) - 1;
        default:
            return 0
        }
    }
    function he(e) {
        if (e.startsWith("on"))
            return e.substring(2);
        throw new Error(`Attribute should be an event name, but doesn't start with 'on'. Value: '${e}'`)
    }
    const fe = {};
    let me, pe, be, ve, ge = !1;
    function ye(e) {
        const t = (n = document.baseURI).substring(0, n.lastIndexOf("/"));
        var n;
        const r = e.charAt(t.length);
        return e.startsWith(t) && ("" === r || "/" === r || "?" === r || "#" === r)
    }
    function we(e) {
        var t;
        null === (t = document.getElementById(e)) || void 0 === t || t.scrollIntoView()
    }
    function Ee() {
        return void 0 !== pe
    }
    function Se(e, t) {
        if (!pe)
            throw new Error("No enhanced programmatic navigation handler has been attached");
        pe(e, t)
    }
    function Ie(e) {
        return ve = ve || document.createElement("a"),
        ve.href = e,
        ve.href
    }
    function Ce() {
        return void 0 !== me
    }
    function De() {
        return me
    }
    let Ae = !1
      , Ne = 0
      , Re = 0;
    const ke = new Map;
    let Te = async function(e) {
        var t, n, r;
        Pe();
        const o = Je();
        if (null == o ? void 0 : o.hasLocationChangingEventListeners) {
            const a = null !== (n = null === (t = e.state) || void 0 === t ? void 0 : t._index) && void 0 !== n ? n : 0
              , i = null === (r = e.state) || void 0 === r ? void 0 : r.userState
              , s = a - Ne
              , c = location.href;
            if (await Me(-s),
            !await Be(c, i, !1, o))
                return;
            await Me(s)
        }
        await je(!1)
    }
      , _e = null;
    const Oe = {
        listenForNavigationEvents: function(e, t, n) {
            var r, o;
            ke.set(e, {
                rendererId: e,
                hasLocationChangingEventListeners: !1,
                locationChanged: t,
                locationChanging: n
            }),
            Ae || (Ae = !0,
            window.addEventListener("popstate", He),
            Ne = null !== (o = null === (r = history.state) || void 0 === r ? void 0 : r._index) && void 0 !== o ? o : 0,
            be = (e, t) => {
                je(t, e)
            }
            )
        },
        enableNavigationInterception: function(e) {
            if (void 0 !== me && me !== e)
                throw new Error("Only one interactive runtime may enable navigation interception at a time.");
            me = e
        },
        setHasLocationChangingListeners: function(e, t) {
            const n = ke.get(e);
            if (!n)
                throw new Error(`Renderer with ID '${e}' is not listening for navigation events`);
            n.hasLocationChangingEventListeners = t
        },
        endLocationChanging: function(e, t) {
            _e && e === Re && (_e(t),
            _e = null)
        },
        navigateTo: function(e, t) {
            Le(e, t, !0)
        },
        refresh: function(e) {
            !e && Ee() ? Se(location.href, !0) : location.reload()
        },
        getBaseURI: () => document.baseURI,
        getLocationHref: () => location.href,
        scrollToElement: we
    };
    function Le(e, t, n=!1) {
        const r = Ie(e)
          , o = Ue();
        if (t.forceLoad || !ye(r) || "serverside-fullpageload" === o)
            !function(e, t) {
                if (location.href === e) {
                    const t = e + "?";
                    history.replaceState(null, "", t),
                    location.replace(e)
                } else
                    t ? location.replace(e) : location.href = e
            }(e, t.replaceHistoryEntry);
        else if ("clientside-router" === o)
            xe(r, !1, t.replaceHistoryEntry, t.historyEntryState, n);
        else {
            if ("serverside-enhanced" !== o)
                throw new Error(`Unsupported page load mechanism: ${o}`);
            Se(r, t.replaceHistoryEntry)
        }
    }
    async function xe(e, t, n, r=void 0, o=!1) {
        if (Pe(),
        function(e) {
            const t = new URL(e);
            return "" !== t.hash && location.origin === t.origin && location.pathname === t.pathname && location.search === t.search
        }(e))
            return Fe(e, n, r),
            void function(e) {
                const t = e.indexOf("#");
                t !== e.length - 1 && we(e.substring(t + 1))
            }(e);
        const a = Je();
        (o || !(null == a ? void 0 : a.hasLocationChangingEventListeners) || await Be(e, r, t, a)) && (ge = !0,
        Fe(e, n, r),
        await je(t))
    }
    function Fe(e, t, n=void 0) {
        t ? history.replaceState({
            userState: n,
            _index: Ne
        }, "", e) : (Ne++,
        history.pushState({
            userState: n,
            _index: Ne
        }, "", e))
    }
    function Me(e) {
        return new Promise((t => {
            const n = Te;
            Te = () => {
                Te = n,
                t()
            }
            ,
            history.go(e)
        }
        ))
    }
    function Pe() {
        _e && (_e(!1),
        _e = null)
    }
    function Be(e, t, n, r) {
        return new Promise((o => {
            Pe(),
            Re++,
            _e = o,
            r.locationChanging(Re, e, t, n)
        }
        ))
    }
    async function je(e, t) {
        const n = null != t ? t : location.href;
        await Promise.all(Array.from(ke, (async ([t,r]) => {
            var o, a;
            a = t,
            S.has(a) && await r.locationChanged(n, null === (o = history.state) || void 0 === o ? void 0 : o.userState, e)
        }
        )))
    }
    async function He(e) {
        var t, n;
        Te && "serverside-enhanced" !== Ue() && await Te(e),
        Ne = null !== (n = null === (t = history.state) || void 0 === t ? void 0 : t._index) && void 0 !== n ? n : 0
    }
    function Je() {
        const e = De();
        if (void 0 !== e)
            return ke.get(e)
    }
    function Ue() {
        return Ce() ? "clientside-router" : Ee() ? "serverside-enhanced" : window.Blazor._internal.isBlazorWeb ? "serverside-fullpageload" : "clientside-router"
    }
    const ze = {
        focus: function(e, t) {
            if (e instanceof HTMLElement)
                e.focus({
                    preventScroll: t
                });
            else {
                if (!(e instanceof SVGElement))
                    throw new Error("Unable to focus an invalid element.");
                if (!e.hasAttribute("tabindex"))
                    throw new Error("Unable to focus an SVG element that does not have a tabindex.");
                e.focus({
                    preventScroll: t
                })
            }
        },
        focusBySelector: function(e, t) {
            const n = document.querySelector(e);
            n && (n.hasAttribute("tabindex") || (n.tabIndex = -1),
            n.focus({
                preventScroll: !0
            }))
        }
    }
      , $e = {
        init: function(e, t, n, r=50) {
            const o = Ke(t);
            (o || document.documentElement).style.overflowAnchor = "none";
            const a = document.createRange();
            h(n.parentElement) && (t.style.display = "table-row",
            n.style.display = "table-row");
            const i = new IntersectionObserver((function(r) {
                r.forEach((r => {
                    var o;
                    if (!r.isIntersecting)
                        return;
                    a.setStartAfter(t),
                    a.setEndBefore(n);
                    const i = a.getBoundingClientRect().height
                      , s = null === (o = r.rootBounds) || void 0 === o ? void 0 : o.height;
                    r.target === t ? e.invokeMethodAsync("OnSpacerBeforeVisible", r.intersectionRect.top - r.boundingClientRect.top, i, s) : r.target === n && n.offsetHeight > 0 && e.invokeMethodAsync("OnSpacerAfterVisible", r.boundingClientRect.bottom - r.intersectionRect.bottom, i, s)
                }
                ))
            }
            ),{
                root: o,
                rootMargin: `${r}px`
            });
            i.observe(t),
            i.observe(n);
            const s = d(t)
              , c = d(n)
              , {observersByDotNetObjectId: l, id: u} = Ve(e);
            function d(e) {
                const t = {
                    attributes: !0
                }
                  , n = new MutationObserver(( (n, r) => {
                    h(e.parentElement) && (r.disconnect(),
                    e.style.display = "table-row",
                    r.observe(e, t)),
                    i.unobserve(e),
                    i.observe(e)
                }
                ));
                return n.observe(e, t),
                n
            }
            function h(e) {
                return null !== e && (e instanceof HTMLTableElement && "" === e.style.display || "table" === e.style.display || e instanceof HTMLTableSectionElement && "" === e.style.display || "table-row-group" === e.style.display)
            }
            l[u] = {
                intersectionObserver: i,
                mutationObserverBefore: s,
                mutationObserverAfter: c
            }
        },
        dispose: function(e) {
            const {observersByDotNetObjectId: t, id: n} = Ve(e)
              , r = t[n];
            r && (r.intersectionObserver.disconnect(),
            r.mutationObserverBefore.disconnect(),
            r.mutationObserverAfter.disconnect(),
            e.dispose(),
            delete t[n])
        }
    }
      , We = Symbol();
    function Ke(e) {
        return e && e !== document.body && e !== document.documentElement ? "visible" !== getComputedStyle(e).overflowY ? e : Ke(e.parentElement) : null
    }
    function Ve(e) {
        var t;
        const n = e._callDispatcher
          , r = e._id;
        return null !== (t = n[We]) && void 0 !== t || (n[We] = {}),
        {
            observersByDotNetObjectId: n[We],
            id: r
        }
    }
    const Xe = {
        getAndRemoveExistingTitle: function() {
            var e;
            const t = document.head ? document.head.getElementsByTagName("title") : [];
            if (0 === t.length)
                return null;
            let n = null;
            for (let r = t.length - 1; r >= 0; r--) {
                const o = t[r]
                  , a = o.previousSibling;
                a instanceof Comment && null !== U(a) || (null === n && (n = o.textContent),
                null === (e = o.parentNode) || void 0 === e || e.removeChild(o))
            }
            return n
        }
    }
      , Ye = {
        init: function(e, t) {
            t._blazorInputFileNextFileId = 0,
            t.addEventListener("click", (function() {
                t.value = ""
            }
            )),
            t.addEventListener("change", (function() {
                t._blazorFilesById = {};
                const n = Array.prototype.map.call(t.files, (function(e) {
                    const n = {
                        id: ++t._blazorInputFileNextFileId,
                        lastModified: new Date(e.lastModified).toISOString(),
                        name: e.name,
                        size: e.size,
                        contentType: e.type,
                        readPromise: void 0,
                        arrayBuffer: void 0,
                        blob: e
                    };
                    return t._blazorFilesById[n.id] = n,
                    n
                }
                ));
                e.invokeMethodAsync("NotifyChange", n)
            }
            ))
        },
        toImageFile: async function(e, t, n, r, o) {
            const a = Ge(e, t)
              , i = await new Promise((function(e) {
                const t = new Image;
                t.onload = function() {
                    URL.revokeObjectURL(t.src),
                    e(t)
                }
                ,
                t.onerror = function() {
                    t.onerror = null,
                    URL.revokeObjectURL(t.src)
                }
                ,
                t.src = URL.createObjectURL(a.blob)
            }
            ))
              , s = await new Promise((function(e) {
                var t;
                const a = Math.min(1, r / i.width)
                  , s = Math.min(1, o / i.height)
                  , c = Math.min(a, s)
                  , l = document.createElement("canvas");
                l.width = Math.round(i.width * c),
                l.height = Math.round(i.height * c),
                null === (t = l.getContext("2d")) || void 0 === t || t.drawImage(i, 0, 0, l.width, l.height),
                l.toBlob(e, n)
            }
            ))
              , c = {
                id: ++e._blazorInputFileNextFileId,
                lastModified: a.lastModified,
                name: a.name,
                size: (null == s ? void 0 : s.size) || 0,
                contentType: n,
                blob: s || a.blob
            };
            return e._blazorFilesById[c.id] = c,
            c
        },
        readFileData: async function(e, t) {
            return Ge(e, t).blob
        }
    };
    function Ge(e, t) {
        const n = e._blazorFilesById[t];
        if (!n)
            throw new Error(`There is no file with ID ${t}. The file list may have changed. See https://aka.ms/aspnet/blazor-input-file-multiple-selections.`);
        return n
    }
    const qe = new Set
      , Ze = {
        enableNavigationPrompt: function(e) {
            0 === qe.size && window.addEventListener("beforeunload", Qe),
            qe.add(e)
        },
        disableNavigationPrompt: function(e) {
            qe.delete(e),
            0 === qe.size && window.removeEventListener("beforeunload", Qe)
        }
    };
    function Qe(e) {
        e.preventDefault(),
        e.returnValue = !0
    }
    const et = new Map
      , tt = {
        navigateTo: function(e, t, n=!1) {
            Le(e, t instanceof Object ? t : {
                forceLoad: t,
                replaceHistoryEntry: n
            })
        },
        registerCustomEventType: function(e, t) {
            if (!t)
                throw new Error("The options parameter is required.");
            if (a.has(e))
                throw new Error(`The event '${e}' is already registered.`);
            if (t.browserEventName) {
                const n = i.get(t.browserEventName);
                n ? n.push(e) : i.set(t.browserEventName, [e]),
                s.forEach((n => n(e, t.browserEventName)))
            }
            a.set(e, t)
        },
        rootComponents: g,
        runtime: {},
        _internal: {
            navigationManager: Oe,
            domWrapper: ze,
            Virtualize: $e,
            PageTitle: Xe,
            InputFile: Ye,
            NavigationLock: Ze,
            getJSDataStreamChunk: async function(e, t, n) {
                return e instanceof Blob ? await async function(e, t, n) {
                    const r = e.slice(t, t + n)
                      , o = await r.arrayBuffer();
                    return new Uint8Array(o)
                }(e, t, n) : function(e, t, n) {
                    return new Uint8Array(e.buffer,e.byteOffset + t,n)
                }(e, t, n)
            },
            attachWebRendererInterop: function(t, n, r, o) {
                var a, i;
                if (S.has(t))
                    throw new Error(`Interop methods are already registered for renderer ${t}`);
                S.set(t, n),
                r && o && Object.keys(r).length > 0 && function(t, n, r) {
                    if (p)
                        throw new Error("Dynamic root components have already been enabled.");
                    p = t,
                    b = n;
                    for (const [t,o] of Object.entries(r)) {
                        const r = e.findJSFunction(t, 0);
                        for (const e of o)
                            r(e, n[e])
                    }
                }(A(t), r, o),
                null === (i = null === (a = C.get(t)) || void 0 === a ? void 0 : a[0]) || void 0 === i || i.call(a),
                function(e) {
                    for (const t of I)
                        t(e)
                }(t)
            }
        }
    };
    window.Blazor = tt;
    let nt = !1;
    const rt = "function" == typeof TextDecoder ? new TextDecoder("utf-8") : null
      , ot = rt ? rt.decode.bind(rt) : function(e) {
        let t = 0;
        const n = e.length
          , r = []
          , o = [];
        for (; t < n; ) {
            const n = e[t++];
            if (0 === n)
                break;
            if (0 == (128 & n))
                r.push(n);
            else if (192 == (224 & n)) {
                const o = 63 & e[t++];
                r.push((31 & n) << 6 | o)
            } else if (224 == (240 & n)) {
                const o = 63 & e[t++]
                  , a = 63 & e[t++];
                r.push((31 & n) << 12 | o << 6 | a)
            } else if (240 == (248 & n)) {
                let o = (7 & n) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++];
                o > 65535 && (o -= 65536,
                r.push(o >>> 10 & 1023 | 55296),
                o = 56320 | 1023 & o),
                r.push(o)
            }
            r.length > 1024 && (o.push(String.fromCharCode.apply(null, r)),
            r.length = 0)
        }
        return o.push(String.fromCharCode.apply(null, r)),
        o.join("")
    }
      , at = Math.pow(2, 32)
      , it = Math.pow(2, 21) - 1;
    function st(e, t) {
        return e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24
    }
    function ct(e, t) {
        return e[t] + (e[t + 1] << 8) + (e[t + 2] << 16) + (e[t + 3] << 24 >>> 0)
    }
    function lt(e, t) {
        const n = ct(e, t + 4);
        if (n > it)
            throw new Error(`Cannot read uint64 with high order part ${n}, because the result would exceed Number.MAX_SAFE_INTEGER.`);
        return n * at + ct(e, t)
    }
    class ut {
        constructor(e) {
            this.batchData = e;
            const t = new mt(e);
            this.arrayRangeReader = new pt(e),
            this.arrayBuilderSegmentReader = new bt(e),
            this.diffReader = new dt(e),
            this.editReader = new ht(e,t),
            this.frameReader = new ft(e,t)
        }
        updatedComponents() {
            return st(this.batchData, this.batchData.length - 20)
        }
        referenceFrames() {
            return st(this.batchData, this.batchData.length - 16)
        }
        disposedComponentIds() {
            return st(this.batchData, this.batchData.length - 12)
        }
        disposedEventHandlerIds() {
            return st(this.batchData, this.batchData.length - 8)
        }
        updatedComponentsEntry(e, t) {
            const n = e + 4 * t;
            return st(this.batchData, n)
        }
        referenceFramesEntry(e, t) {
            return e + 20 * t
        }
        disposedComponentIdsEntry(e, t) {
            const n = e + 4 * t;
            return st(this.batchData, n)
        }
        disposedEventHandlerIdsEntry(e, t) {
            const n = e + 8 * t;
            return lt(this.batchData, n)
        }
    }
    class dt {
        constructor(e) {
            this.batchDataUint8 = e
        }
        componentId(e) {
            return st(this.batchDataUint8, e)
        }
        edits(e) {
            return e + 4
        }
        editsEntry(e, t) {
            return e + 16 * t
        }
    }
    class ht {
        constructor(e, t) {
            this.batchDataUint8 = e,
            this.stringReader = t
        }
        editType(e) {
            return st(this.batchDataUint8, e)
        }
        siblingIndex(e) {
            return st(this.batchDataUint8, e + 4)
        }
        newTreeIndex(e) {
            return st(this.batchDataUint8, e + 8)
        }
        moveToSiblingIndex(e) {
            return st(this.batchDataUint8, e + 8)
        }
        removedAttributeName(e) {
            const t = st(this.batchDataUint8, e + 12);
            return this.stringReader.readString(t)
        }
    }
    class ft {
        constructor(e, t) {
            this.batchDataUint8 = e,
            this.stringReader = t
        }
        frameType(e) {
            return st(this.batchDataUint8, e)
        }
        subtreeLength(e) {
            return st(this.batchDataUint8, e + 4)
        }
        elementReferenceCaptureId(e) {
            const t = st(this.batchDataUint8, e + 4);
            return this.stringReader.readString(t)
        }
        componentId(e) {
            return st(this.batchDataUint8, e + 8)
        }
        elementName(e) {
            const t = st(this.batchDataUint8, e + 8);
            return this.stringReader.readString(t)
        }
        textContent(e) {
            const t = st(this.batchDataUint8, e + 4);
            return this.stringReader.readString(t)
        }
        markupContent(e) {
            const t = st(this.batchDataUint8, e + 4);
            return this.stringReader.readString(t)
        }
        attributeName(e) {
            const t = st(this.batchDataUint8, e + 4);
            return this.stringReader.readString(t)
        }
        attributeValue(e) {
            const t = st(this.batchDataUint8, e + 8);
            return this.stringReader.readString(t)
        }
        attributeEventHandlerId(e) {
            return lt(this.batchDataUint8, e + 12)
        }
    }
    class mt {
        constructor(e) {
            this.batchDataUint8 = e,
            this.stringTableStartIndex = st(e, e.length - 4)
        }
        readString(e) {
            if (-1 === e)
                return null;
            {
                const n = st(this.batchDataUint8, this.stringTableStartIndex + 4 * e)
                  , r = function(e, t) {
                    let n = 0
                      , r = 0;
                    for (let o = 0; o < 4; o++) {
                        const a = e[t + o];
                        if (n |= (127 & a) << r,
                        a < 128)
                            break;
                        r += 7
                    }
                    return n
                }(this.batchDataUint8, n)
                  , o = n + ((t = r) < 128 ? 1 : t < 16384 ? 2 : t < 2097152 ? 3 : 4)
                  , a = new Uint8Array(this.batchDataUint8.buffer,this.batchDataUint8.byteOffset + o,r);
                return ot(a)
            }
            var t
        }
    }
    class pt {
        constructor(e) {
            this.batchDataUint8 = e
        }
        count(e) {
            return st(this.batchDataUint8, e)
        }
        values(e) {
            return e + 4
        }
    }
    class bt {
        constructor(e) {
            this.batchDataUint8 = e
        }
        offset(e) {
            return 0
        }
        count(e) {
            return st(this.batchDataUint8, e)
        }
        values(e) {
            return e + 4
        }
    }
    const vt = "__bwv:";
    let gt = !1;
    function yt(e, t) {
        Dt("OnRenderCompleted", e, t)
    }
    function wt(e, t, n, r, o) {
        Dt("BeginInvokeDotNet", e ? e.toString() : null, t, n, r || 0, o)
    }
    function Et(e, t, n) {
        Dt("EndInvokeJS", e, t, n)
    }
    function St(e, t) {
        const n = function(e) {
            const t = new Array(e.length);
            for (let n = 0; n < e.length; n++)
                t[n] = String.fromCharCode(e[n]);
            return btoa(t.join(""))
        }(t);
        Dt("ReceiveByteArrayFromJS", e, n)
    }
    function It(e, t, n) {
        return Dt("OnLocationChanged", e, t, n),
        Promise.resolve()
    }
    function Ct(e, t, n, r) {
        return Dt("OnLocationChanging", e, t, n, r),
        Promise.resolve()
    }
    function Dt(e, ...t) {
        const n = function(e, t) {
            return gt ? null : `${vt}${JSON.stringify([e, ...t])}`
        }(e, t);
        n && window.external.sendMessage(n)
    }
    var At, Nt;
    function Rt(e, t) {
        const n = kt(t);
        _t.receiveByteArray(e, n)
    }
    function kt(e) {
        const t = atob(e)
          , n = t.length
          , r = new Uint8Array(n);
        for (let e = 0; e < n; e++)
            r[e] = t.charCodeAt(e);
        return r
    }
    !function(e) {
        e[e.Default = 0] = "Default",
        e[e.Server = 1] = "Server",
        e[e.WebAssembly = 2] = "WebAssembly",
        e[e.WebView = 3] = "WebView"
    }(At || (At = {})),
    function(e) {
        e[e.Trace = 0] = "Trace",
        e[e.Debug = 1] = "Debug",
        e[e.Information = 2] = "Information",
        e[e.Warning = 3] = "Warning",
        e[e.Error = 4] = "Error",
        e[e.Critical = 5] = "Critical",
        e[e.None = 6] = "None"
    }(Nt || (Nt = {}));
    class Tt {
        constructor(e=!0, t, n, r=0) {
            this.singleRuntime = e,
            this.logger = t,
            this.webRendererId = r,
            this.afterStartedCallbacks = [],
            n && this.afterStartedCallbacks.push(...n)
        }
        async importInitializersAsync(e, t) {
            await Promise.all(e.map((e => async function(e, n) {
                const r = function(e) {
                    const t = document.baseURI;
                    return t.endsWith("/") ? `${t}${e}` : `${t}/${e}`
                }(n)
                  , o = await import(r);
                if (void 0 !== o) {
                    if (e.singleRuntime) {
                        const {beforeStart: n, afterStarted: r, beforeWebAssemblyStart: i, afterWebAssemblyStarted: s, beforeServerStart: c, afterServerStarted: l} = o;
                        let u = n;
                        e.webRendererId === At.Server && c && (u = c),
                        e.webRendererId === At.WebAssembly && i && (u = i);
                        let d = r;
                        return e.webRendererId === At.Server && l && (d = l),
                        e.webRendererId === At.WebAssembly && s && (d = s),
                        a(e, u, d, t)
                    }
                    return function(e, t, n) {
                        var o;
                        const i = n[0]
                          , {beforeStart: s, afterStarted: c, beforeWebStart: l, afterWebStarted: u, beforeWebAssemblyStart: d, afterWebAssemblyStarted: h, beforeServerStart: f, afterServerStarted: m} = t
                          , p = !(l || u || d || h || f || m || !s && !c)
                          , b = p && i.enableClassicInitializers;
                        if (p && !i.enableClassicInitializers)
                            null === (o = e.logger) || void 0 === o || o.log(Nt.Warning, `Initializer '${r}' will be ignored because multiple runtimes are available. use 'before(web|webAssembly|server)Start' and 'after(web|webAssembly|server)Started?' instead.)`);
                        else if (b)
                            return a(e, s, c, n);
                        if (function(e) {
                            e.webAssembly ? e.webAssembly.initializers || (e.webAssembly.initializers = {
                                beforeStart: [],
                                afterStarted: []
                            }) : e.webAssembly = {
                                initializers: {
                                    beforeStart: [],
                                    afterStarted: []
                                }
                            },
                            e.circuit ? e.circuit.initializers || (e.circuit.initializers = {
                                beforeStart: [],
                                afterStarted: []
                            }) : e.circuit = {
                                initializers: {
                                    beforeStart: [],
                                    afterStarted: []
                                }
                            }
                        }(i),
                        d && i.webAssembly.initializers.beforeStart.push(d),
                        h && i.webAssembly.initializers.afterStarted.push(h),
                        f && i.circuit.initializers.beforeStart.push(f),
                        m && i.circuit.initializers.afterStarted.push(m),
                        u && e.afterStartedCallbacks.push(u),
                        l)
                            return l(i)
                    }(e, o, t)
                }
                function a(e, t, n, r) {
                    if (n && e.afterStartedCallbacks.push(n),
                    t)
                        return t(...r)
                }
            }(this, e))))
        }
        async invokeAfterStartedCallbacks(e) {
            const t = (n = this.webRendererId,
            null === (r = C.get(n)) || void 0 === r ? void 0 : r[1]);
            var n, r;
            t && await t,
            await Promise.all(this.afterStartedCallbacks.map((t => t(e))))
        }
    }
    let _t, Ot = !1;
    async function Lt() {
        if (Ot)
            throw new Error("Blazor has already started.");
        Ot = !0,
        _t = e.attachDispatcher({
            beginInvokeDotNetFromJS: wt,
            endInvokeJSFromDotNet: Et,
            sendByteArray: St
        });
        const t = await async function() {
            const e = await fetch("_framework/blazor.modules.json", {
                method: "GET",
                credentials: "include",
                cache: "no-cache"
            })
              , t = await e.json()
              , n = new Tt;
            return await n.importInitializersAsync(t, []),
            n
        }();
        (function() {
            const e = {
                AttachToDocument: (e, t) => {
                    !function(e, t, n) {
                        const r = "::before";
                        let o = !1;
                        if (e.endsWith("::after"))
                            e = e.slice(0, -7),
                            o = !0;
                        else if (e.endsWith(r))
                            throw new Error(`The '${r}' selector is not supported.`);
                        const a = function(e) {
                            const t = m.get(e);
                            if (t)
                                return m.delete(e),
                                t
                        }(e) || document.querySelector(e);
                        if (!a)
                            throw new Error(`Could not find any element matching selector '${e}'.`);
                        !function(e, t, n, r) {
                            let o = fe[e];
                            o || (o = new le(e),
                            fe[e] = o),
                            o.attachRootComponentToLogicalElement(n, t, r)
                        }(n, P(a, !0), t, o)
                    }(t, e, At.WebView)
                }
                ,
                RenderBatch: (e, t) => {
                    try {
                        const n = kt(t);
                        (function(e, t) {
                            const n = fe[e];
                            if (!n)
                                throw new Error(`There is no browser renderer with ID ${e}.`);
                            const r = t.arrayRangeReader
                              , o = t.updatedComponents()
                              , a = r.values(o)
                              , i = r.count(o)
                              , s = t.referenceFrames()
                              , c = r.values(s)
                              , l = t.diffReader;
                            for (let e = 0; e < i; e++) {
                                const r = t.updatedComponentsEntry(a, e)
                                  , o = l.componentId(r)
                                  , i = l.edits(r);
                                n.updateComponent(t, o, i, c)
                            }
                            const u = t.disposedComponentIds()
                              , d = r.values(u)
                              , h = r.count(u);
                            for (let e = 0; e < h; e++) {
                                const r = t.disposedComponentIdsEntry(d, e);
                                n.disposeComponent(r)
                            }
                            const f = t.disposedEventHandlerIds()
                              , m = r.values(f)
                              , p = r.count(f);
                            for (let e = 0; e < p; e++) {
                                const r = t.disposedEventHandlerIdsEntry(m, e);
                                n.disposeEventHandler(r)
                            }
                            ge && (ge = !1,
                            window.scrollTo && window.scrollTo(0, 0))
                        }
                        )(At.WebView, new ut(n)),
                        yt(e, null)
                    } catch (t) {
                        yt(e, t.toString())
                    }
                }
                ,
                NotifyUnhandledException: (e, t) => {
                    gt = !0,
                    console.error(`${e}\n${t}`),
                    function() {
                        const e = document.querySelector("#blazor-error-ui");
                        e && (e.style.display = "block"),
                        nt || (nt = !0,
                        document.querySelectorAll("#blazor-error-ui .reload").forEach((e => {
                            e.onclick = function(e) {
                                location.reload(),
                                e.preventDefault()
                            }
                        }
                        )),
                        document.querySelectorAll("#blazor-error-ui .dismiss").forEach((e => {
                            e.onclick = function(e) {
                                const t = document.querySelector("#blazor-error-ui");
                                t && (t.style.display = "none"),
                                e.preventDefault()
                            }
                        }
                        )))
                    }()
                }
                ,
                BeginInvokeJS: _t.beginInvokeJSFromDotNet.bind(_t),
                EndInvokeDotNet: _t.endInvokeDotNetFromJS.bind(_t),
                SendByteArrayToJS: Rt,
                Navigate: Oe.navigateTo,
                Refresh: Oe.refresh,
                SetHasLocationChangingListeners: e => {
                    Oe.setHasLocationChangingListeners(At.WebView, e)
                }
                ,
                EndLocationChanging: Oe.endLocationChanging
            };
            window.external.receiveMessage((t => {
                const n = function(e) {
                    if (gt || !e || !e.startsWith(vt))
                        return null;
                    const t = e.substring(vt.length)
                      , [n,...r] = JSON.parse(t);
                    return {
                        messageType: n,
                        args: r
                    }
                }(t);
                if (n) {
                    if (!Object.prototype.hasOwnProperty.call(e, n.messageType))
                        throw new Error(`Unsupported IPC message type '${n.messageType}'`);
                    e[n.messageType].apply(null, n.args)
                }
            }
            ))
        }
        )(),
        tt._internal.receiveWebViewDotNetDataStream = xt,
        Oe.enableNavigationInterception(At.WebView),
        Oe.listenForNavigationEvents(At.WebView, It, Ct),
        Dt("AttachPage", Oe.getBaseURI(), Oe.getLocationHref()),
        await t.invokeAfterStartedCallbacks(tt)
    }
    function xt(e, t, n, r) {
        !function(e, t, n, r, o) {
            let a = et.get(t);
            if (!a) {
                const n = new ReadableStream({
                    start(e) {
                        et.set(t, e),
                        a = e
                    }
                });
                e.supplyDotNetStream(t, n)
            }
            o ? (a.error(o),
            et.delete(t)) : 0 === r ? (a.close(),
            et.delete(t)) : a.enqueue(n.length === r ? n : n.subarray(0, r))
        }(_t, e, t, n, r)
    }
    tt.start = Lt,
    window.DotNet = e,
    document && document.currentScript && "false" !== document.currentScript.getAttribute("autostart") && Lt()
}
)();
