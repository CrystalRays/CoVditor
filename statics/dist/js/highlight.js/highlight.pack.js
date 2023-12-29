/*
  Highlight.js 10.7.2 (00233d63)
  License: BSD-3-Clause
  Copyright (c) 2006-2021, Ivan Sagalaev
*/
var hljs = function() {
    "use strict";
    function e(t) {
        return t instanceof Map ? t.clear = t.delete = t.set = ()=>{
            throw Error("map is read-only")
        }
        : t instanceof Set && (t.add = t.clear = t.delete = ()=>{
            throw Error("set is read-only")
        }
        ),
        Object.freeze(t),
        Object.getOwnPropertyNames(t).forEach((n=>{
            var i = t[n];
            "object" != typeof i || Object.isFrozen(i) || e(i)
        }
        )),
        t
    }
    var t = e
      , n = e;
    t.default = n;
    class i {
        constructor(e) {
            void 0 === e.data && (e.data = {}),
            this.data = e.data,
            this.isMatchIgnored = !1
        }
        ignoreMatch() {
            this.isMatchIgnored = !0
        }
    }
    function s(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;")
    }
    function a(e, ...t) {
        const n = Object.create(null);
        for (const t in e)
            n[t] = e[t];
        return t.forEach((e=>{
            for (const t in e)
                n[t] = e[t]
        }
        )),
        n
    }
    const r = e=>!!e.kind;
    class l {
        constructor(e, t) {
            this.buffer = "",
            this.classPrefix = t.classPrefix,
            e.walk(this)
        }
        addText(e) {
            this.buffer += s(e)
        }
        openNode(e) {
            if (!r(e))
                return;
            let t = e.kind;
            e.sublanguage || (t = `${this.classPrefix}${t}`),
            this.span(t)
        }
        closeNode(e) {
            r(e) && (this.buffer += "</span>")
        }
        value() {
            return this.buffer
        }
        span(e) {
            this.buffer += `<span class="${e}">`
        }
    }
    class o {
        constructor() {
            this.rootNode = {
                children: []
            },
            this.stack = [this.rootNode]
        }
        get top() {
            return this.stack[this.stack.length - 1]
        }
        get root() {
            return this.rootNode
        }
        add(e) {
            this.top.children.push(e)
        }
        openNode(e) {
            const t = {
                kind: e,
                children: []
            };
            this.add(t),
            this.stack.push(t)
        }
        closeNode() {
            if (this.stack.length > 1)
                return this.stack.pop()
        }
        closeAllNodes() {
            for (; this.closeNode(); )
                ;
        }
        toJSON() {
            return JSON.stringify(this.rootNode, null, 4)
        }
        walk(e) {
            return this.constructor._walk(e, this.rootNode)
        }
        static _walk(e, t) {
            return "string" == typeof t ? e.addText(t) : t.children && (e.openNode(t),
            t.children.forEach((t=>this._walk(e, t))),
            e.closeNode(t)),
            e
        }
        static _collapse(e) {
            "string" != typeof e && e.children && (e.children.every((e=>"string" == typeof e)) ? e.children = [e.children.join("")] : e.children.forEach((e=>{
                o._collapse(e)
            }
            )))
        }
    }
    class c extends o {
        constructor(e) {
            super(),
            this.options = e
        }
        addKeyword(e, t) {
            "" !== e && (this.openNode(t),
            this.addText(e),
            this.closeNode())
        }
        addText(e) {
            "" !== e && this.add(e)
        }
        addSublanguage(e, t) {
            const n = e.root;
            n.kind = t,
            n.sublanguage = !0,
            this.add(n)
        }
        toHTML() {
            return new l(this,this.options).value()
        }
        finalize() {
            return !0
        }
    }
    function g(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    const u = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
      , h = "[a-zA-Z]\\w*"
      , d = "[a-zA-Z_]\\w*"
      , f = "\\b\\d+(\\.\\d+)?"
      , p = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"
      , m = "\\b(0b[01]+)"
      , b = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
    }
      , E = {
        className: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [b]
    }
      , x = {
        className: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [b]
    }
      , v = {
        begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
    }
      , w = (e,t,n={})=>{
        const i = a({
            className: "comment",
            begin: e,
            end: t,
            contains: []
        }, n);
        return i.contains.push(v),
        i.contains.push({
            className: "doctag",
            begin: "(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",
            relevance: 0
        }),
        i
    }
      , y = w("//", "$")
      , N = w("/\\*", "\\*/")
      , R = w("#", "$");
    var _ = Object.freeze({
        __proto__: null,
        MATCH_NOTHING_RE: /\b\B/,
        IDENT_RE: h,
        UNDERSCORE_IDENT_RE: d,
        NUMBER_RE: f,
        C_NUMBER_RE: p,
        BINARY_NUMBER_RE: m,
        RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
        SHEBANG: (e={})=>{
            const t = /^#![ ]*\//; 
            return e.binary && (e.begin = ((...e)=>e.map((e=>g(e))).join(""))(t, /.*\b/, e.binary, /\b.*/)),
            a({
                className: "meta",
                begin: t,
                end: /$/,
                relevance: 0,
                "on:begin": (e,t)=>{
                    0 !== e.index && t.ignoreMatch()
                }
            }, e)
        }
        ,
        BACKSLASH_ESCAPE: b,
        APOS_STRING_MODE: E,
        QUOTE_STRING_MODE: x,
        PHRASAL_WORDS_MODE: v,
        COMMENT: w,
        C_LINE_COMMENT_MODE: y,
        C_BLOCK_COMMENT_MODE: N,
        HASH_COMMENT_MODE: R,
        NUMBER_MODE: {
            className: "number",
            begin: f,
            relevance: 0
        },
        C_NUMBER_MODE: {
            className: "number",
            begin: p,
            relevance: 0
        },
        BINARY_NUMBER_MODE: {
            className: "number",
            begin: m,
            relevance: 0
        },
        CSS_NUMBER_MODE: {
            className: "number",
            begin: f + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
            relevance: 0
        },
        REGEXP_MODE: {
            begin: /(?=\/[^/\n]*\/)/,
            contains: [{
                className: "regexp",
                begin: /\//,
                end: /\/[gimuy]*/,
                illegal: /\n/,
                contains: [b, {
                    begin: /\[/,
                    end: /\]/,
                    relevance: 0,
                    contains: [b]
                }]
            }]
        },
        TITLE_MODE: {
            className: "title",
            begin: h,
            relevance: 0
        },
        UNDERSCORE_TITLE_MODE: {
            className: "title",
            begin: d,
            relevance: 0
        },
        METHOD_GUARD: {
            begin: "\\.\\s*[a-zA-Z_]\\w*",
            relevance: 0
        },
        END_SAME_AS_BEGIN: e=>Object.assign(e, {
            "on:begin": (e,t)=>{
                t.data._beginMatch = e[1]
            }
            ,
            "on:end": (e,t)=>{
                t.data._beginMatch !== e[1] && t.ignoreMatch()
            }
        })
    });
    function k(e, t) {
        "." === e.input[e.index - 1] && t.ignoreMatch()
    }
    function M(e, t) {
        t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)",
        e.__beforeBegin = k,
        e.keywords = e.keywords || e.beginKeywords,
        delete e.beginKeywords,
        void 0 === e.relevance && (e.relevance = 0))
    }
    function O(e, t) {
        Array.isArray(e.illegal) && (e.illegal = ((...e)=>"(" + e.map((e=>g(e))).join("|") + ")")(...e.illegal))
    }
    function A(e, t) {
        if (e.match) {
            if (e.begin || e.end)
                throw Error("begin & end are not supported with match");
            e.begin = e.match,
            delete e.match
        }
    }
    function L(e, t) {
        void 0 === e.relevance && (e.relevance = 1)
    }
    const I = ["of", "and", "for", "in", "not", "or", "if", "then", "parent", "list", "value"];
    function j(e, t, n="keyword") {
        const i = {};
        return "string" == typeof e ? s(n, e.split(" ")) : Array.isArray(e) ? s(n, e) : Object.keys(e).forEach((n=>{
            Object.assign(i, j(e[n], t, n))
        }
        )),
        i;
        function s(e, n) {
            t && (n = n.map((e=>e.toLowerCase()))),
            n.forEach((t=>{
                const n = t.split("|");
                i[n[0]] = [e, B(n[0], n[1])]
            }
            ))
        }
    }
    function B(e, t) {
        return t ? Number(t) : (e=>I.includes(e.toLowerCase()))(e) ? 0 : 1
    }
    function T(e, {plugins: t}) {
        function n(t, n) {
            return RegExp(g(t), "m" + (e.case_insensitive ? "i" : "") + (n ? "g" : ""))
        }
        class i {
            constructor() {
                this.matchIndexes = {},
                this.regexes = [],
                this.matchAt = 1,
                this.position = 0
            }
            addRule(e, t) {
                t.position = this.position++,
                this.matchIndexes[this.matchAt] = t,
                this.regexes.push([t, e]),
                this.matchAt += (e=>RegExp(e.toString() + "|").exec("").length - 1)(e) + 1
            }
            compile() {
                0 === this.regexes.length && (this.exec = ()=>null);
                const e = this.regexes.map((e=>e[1]));
                this.matcherRe = n(((e,t="|")=>{
                    let n = 0;
                    return e.map((e=>{
                        n += 1;
                        const t = n;
                        let i = g(e)
                          , s = "";
                        for (; i.length > 0; ) {
                            const e = u.exec(i);
                            if (!e) {
                                s += i;
                                break
                            }
                            s += i.substring(0, e.index),
                            i = i.substring(e.index + e[0].length),
                            "\\" === e[0][0] && e[1] ? s += "\\" + (Number(e[1]) + t) : (s += e[0],
                            "(" === e[0] && n++)
                        }
                        return s
                    }
                    )).map((e=>`(${e})`)).join(t)
                }
                )(e), !0),
                this.lastIndex = 0
            }
            exec(e) {
                this.matcherRe.lastIndex = this.lastIndex;
                const t = this.matcherRe.exec(e);
                if (!t)
                    return null;
                const n = t.findIndex(((e,t)=>t > 0 && void 0 !== e))
                  , i = this.matchIndexes[n];
                return t.splice(0, n),
                Object.assign(t, i)
            }
        }
        class s {
            constructor() {
                this.rules = [],
                this.multiRegexes = [],
                this.count = 0,
                this.lastIndex = 0,
                this.regexIndex = 0
            }
            getMatcher(e) {
                if (this.multiRegexes[e])
                    return this.multiRegexes[e];
                const t = new i;
                return this.rules.slice(e).forEach((([e,n])=>t.addRule(e, n))),
                t.compile(),
                this.multiRegexes[e] = t,
                t
            }
            resumingScanAtSamePosition() {
                return 0 !== this.regexIndex
            }
            considerAll() {
                this.regexIndex = 0
            }
            addRule(e, t) {
                this.rules.push([e, t]),
                "begin" === t.type && this.count++
            }
            exec(e) {
                const t = this.getMatcher(this.regexIndex);
                t.lastIndex = this.lastIndex;
                let n = t.exec(e);
                if (this.resumingScanAtSamePosition())
                    if (n && n.index === this.lastIndex)
                        ;
                    else {
                        const t = this.getMatcher(0);
                        t.lastIndex = this.lastIndex + 1,
                        n = t.exec(e)
                    }
                return n && (this.regexIndex += n.position + 1,
                this.regexIndex === this.count && this.considerAll()),
                n
            }
        }
        if (e.compilerExtensions || (e.compilerExtensions = []),
        e.contains && e.contains.includes("self"))
            throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
        return e.classNameAliases = a(e.classNameAliases || {}),
        function t(i, r) {
            const l = i;
            if (i.isCompiled)
                return l;
            [A].forEach((e=>e(i, r))),
            e.compilerExtensions.forEach((e=>e(i, r))),
            i.__beforeBegin = null,
            [M, O, L].forEach((e=>e(i, r))),
            i.isCompiled = !0;
            let o = null;
            if ("object" == typeof i.keywords && (o = i.keywords.$pattern,
            delete i.keywords.$pattern),
            i.keywords && (i.keywords = j(i.keywords, e.case_insensitive)),
            i.lexemes && o)
                throw Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");
            return o = o || i.lexemes || /\w+/,
            l.keywordPatternRe = n(o, !0),
            r && (i.begin || (i.begin = /\B|\b/),
            l.beginRe = n(i.begin),
            i.endSameAsBegin && (i.end = i.begin),
            i.end || i.endsWithParent || (i.end = /\B|\b/),
            i.end && (l.endRe = n(i.end)),
            l.terminatorEnd = g(i.end) || "",
            i.endsWithParent && r.terminatorEnd && (l.terminatorEnd += (i.end ? "|" : "") + r.terminatorEnd)),
            i.illegal && (l.illegalRe = n(i.illegal)),
            i.contains || (i.contains = []),
            i.contains = [].concat(...i.contains.map((e=>(e=>(e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map((t=>a(e, {
                variants: null
            }, t)))),
            e.cachedVariants ? e.cachedVariants : S(e) ? a(e, {
                starts: e.starts ? a(e.starts) : null
            }) : Object.isFrozen(e) ? a(e) : e))("self" === e ? i : e)))),
            i.contains.forEach((e=>{
                t(e, l)
            }
            )),
            i.starts && t(i.starts, r),
            l.matcher = (e=>{
                const t = new s;
                return e.contains.forEach((e=>t.addRule(e.begin, {
                    rule: e,
                    type: "begin"
                }))),
                e.terminatorEnd && t.addRule(e.terminatorEnd, {
                    type: "end"
                }),
                e.illegal && t.addRule(e.illegal, {
                    type: "illegal"
                }),
                t
            }
            )(l),
            l
        }(e)
    }
    function S(e) {
        return !!e && (e.endsWithParent || S(e.starts))
    }
    function P(e) {
        const t = {
            props: ["language", "code", "autodetect"],
            data: ()=>({
                detectedLanguage: "",
                unknownLanguage: !1
            }),
            computed: {
                className() {
                    return this.unknownLanguage ? "" : "hljs " + this.detectedLanguage
                },
                highlighted() {
                    if (!this.autoDetect && !e.getLanguage(this.language))
                        return console.warn(`The language "${this.language}" you specified could not be found.`),
                        this.unknownLanguage = !0,
                        s(this.code);
                    let t = {};
                    return this.autoDetect ? (t = e.highlightAuto(this.code),
                    this.detectedLanguage = t.language) : (t = e.highlight(this.language, this.code, this.ignoreIllegals),
                    this.detectedLanguage = this.language),
                    t.value
                },
                autoDetect() {
                    return !(this.language && (e = this.autodetect,
                    !e && "" !== e));
                    var e
                },
                ignoreIllegals: ()=>!0
            },
            render(e) {
                return e("pre", {}, [e("code", {
                    class: this.className,
                    domProps: {
                        innerHTML: this.highlighted
                    }
                })])
            }
        };
        return {
            Component: t,
            VuePlugin: {
                install(e) {
                    e.component("highlightjs", t)
                }
            }
        }
    }
    const D = {
        "after:highlightElement": ({el: e, result: t, text: n})=>{
            const i = H(e);
            if (!i.length)
                return;
            const a = document.createElement("div");
            a.innerHTML = t.value,
            t.value = ((e,t,n)=>{
                let i = 0
                  , a = "";
                const r = [];
                function l() {
                    return e.length && t.length ? e[0].offset !== t[0].offset ? e[0].offset < t[0].offset ? e : t : "start" === t[0].event ? e : t : e.length ? e : t
                }
                function o(e) {
                    a += "<" + C(e) + [].map.call(e.attributes, (function(e) {
                        return " " + e.nodeName + '="' + s(e.value) + '"'
                    }
                    )).join("") + ">"
                }
                function c(e) {
                    a += "</" + C(e) + ">"
                }
                function g(e) {
                    ("start" === e.event ? o : c)(e.node)
                }
                for (; e.length || t.length; ) {
                    let t = l();
                    if (a += s(n.substring(i, t[0].offset)),
                    i = t[0].offset,
                    t === e) {
                        r.reverse().forEach(c);
                        do {
                            g(t.splice(0, 1)[0]),
                            t = l()
                        } while (t === e && t.length && t[0].offset === i);
                        r.reverse().forEach(o)
                    } else
                        "start" === t[0].event ? r.push(t[0].node) : r.pop(),
                        g(t.splice(0, 1)[0])
                }
                return a + s(n.substr(i))
            }
            )(i, H(a), n)
        }
    };
    function C(e) {
        return e.nodeName.toLowerCase()
    }
    function H(e) {
        const t = [];
        return function e(n, i) {
            for (let s = n.firstChild; s; s = s.nextSibling)
                3 === s.nodeType ? i += s.nodeValue.length : 1 === s.nodeType && (t.push({
                    event: "start",
                    offset: i,
                    node: s
                }),
                i = e(s, i),
                C(s).match(/br|hr|img|input/) || t.push({
                    event: "stop",
                    offset: i,
                    node: s
                }));
            return i
        }(e, 0),
        t
    }
    const $ = {}
      , U = e=>{
        console.error(e)
    }
      , z = (e,...t)=>{
        console.log("WARN: " + e, ...t)
    }
      , K = (e,t)=>{
        $[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`),
        $[`${e}/${t}`] = !0)
    }
      , G = s
      , V = a
      , W = Symbol("nomatch");
    return (e=>{
        const n = Object.create(null)
          , s = Object.create(null)
          , a = [];
        let r = !0;
        const l = /(^(<[^>]+>|\t|)+|\n)/gm
          , o = "Could not find the language '{}', did you forget to load/include a language module?"
          , g = {
            disableAutodetect: !0,
            name: "Plain text",
            contains: []
        };
        let u = {
            noHighlightRe: /^(no-?highlight)$/i,
            languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
            classPrefix: "hljs-",
            tabReplace: null,
            useBR: !1,
            languages: null,
            __emitter: c
        };
        function h(e) {
            return u.noHighlightRe.test(e)
        }
        function d(e, t, n, i) {
            let s = ""
              , a = "";
            "object" == typeof t ? (s = e,
            n = t.ignoreIllegals,
            a = t.language,
            i = void 0) : (K("10.7.0", "highlight(lang, code, ...args) has been deprecated."),
            K("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
            a = e,
            s = t);
            const r = {
                code: s,
                language: a
            };
            M("before:highlight", r);
            const l = r.result ? r.result : f(r.language, r.code, n, i);
            return l.code = r.code,
            M("after:highlight", l),
            l
        }
        function f(e, t, s, l) {
            function c(e, t) {
                const n = v.case_insensitive ? t[0].toLowerCase() : t[0];
                return Object.prototype.hasOwnProperty.call(e.keywords, n) && e.keywords[n]
            }
            function g() {
                null != R.subLanguage ? (()=>{
                    if ("" === M)
                        return;
                    let e = null;
                    if ("string" == typeof R.subLanguage) {
                        if (!n[R.subLanguage])
                            return void k.addText(M);
                        e = f(R.subLanguage, M, !0, _[R.subLanguage]),
                        _[R.subLanguage] = e.top
                    } else
                        e = p(M, R.subLanguage.length ? R.subLanguage : null);
                    R.relevance > 0 && (O += e.relevance),
                    k.addSublanguage(e.emitter, e.language)
                }
                )() : (()=>{
                    if (!R.keywords)
                        return void k.addText(M);
                    let e = 0;
                    R.keywordPatternRe.lastIndex = 0;
                    let t = R.keywordPatternRe.exec(M)
                      , n = "";
                    for (; t; ) {
                        n += M.substring(e, t.index);
                        const i = c(R, t);
                        if (i) {
                            const [e,s] = i;
                            if (k.addText(n),
                            n = "",
                            O += s,
                            e.startsWith("_"))
                                n += t[0];
                            else {
                                const n = v.classNameAliases[e] || e;
                                k.addKeyword(t[0], n)
                            }
                        } else
                            n += t[0];
                        e = R.keywordPatternRe.lastIndex,
                        t = R.keywordPatternRe.exec(M)
                    }
                    n += M.substr(e),
                    k.addText(n)
                }
                )(),
                M = ""
            }
            function h(e) {
                return e.className && k.openNode(v.classNameAliases[e.className] || e.className),
                R = Object.create(e, {
                    parent: {
                        value: R
                    }
                }),
                R
            }
            function d(e, t, n) {
                let s = ((e,t)=>{
                    const n = e && e.exec(t);
                    return n && 0 === n.index
                }
                )(e.endRe, n);
                if (s) {
                    if (e["on:end"]) {
                        const n = new i(e);
                        e["on:end"](t, n),
                        n.isMatchIgnored && (s = !1)
                    }
                    if (s) {
                        for (; e.endsParent && e.parent; )
                            e = e.parent;
                        return e
                    }
                }
                if (e.endsWithParent)
                    return d(e.parent, t, n)
            }
            function m(e) {
                return 0 === R.matcher.regexIndex ? (M += e[0],
                1) : (I = !0,
                0)
            }
            function b(e) {
                const n = e[0]
                  , i = t.substr(e.index)
                  , s = d(R, e, i);
                if (!s)
                    return W;
                const a = R;
                a.skip ? M += n : (a.returnEnd || a.excludeEnd || (M += n),
                g(),
                a.excludeEnd && (M = n));
                do {
                    R.className && k.closeNode(),
                    R.skip || R.subLanguage || (O += R.relevance),
                    R = R.parent
                } while (R !== s.parent);
                return s.starts && (s.endSameAsBegin && (s.starts.endRe = s.endRe),
                h(s.starts)),
                a.returnEnd ? 0 : n.length
            }
            let E = {};
            function x(n, a) {
                const l = a && a[0];
                if (M += n,
                null == l)
                    return g(),
                    0;
                if ("begin" === E.type && "end" === a.type && E.index === a.index && "" === l) {
                    if (M += t.slice(a.index, a.index + 1),
                    !r) {
                        const t = Error("0 width match regex");
                        throw t.languageName = e,
                        t.badRule = E.rule,
                        t
                    }
                    return 1
                }
                if (E = a,
                "begin" === a.type)
                    return function(e) {
                        const t = e[0]
                          , n = e.rule
                          , s = new i(n)
                          , a = [n.__beforeBegin, n["on:begin"]];
                        for (const n of a)
                            if (n && (n(e, s),
                            s.isMatchIgnored))
                                return m(t);
                        return n && n.endSameAsBegin && (n.endRe = RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&"), "m")),
                        n.skip ? M += t : (n.excludeBegin && (M += t),
                        g(),
                        n.returnBegin || n.excludeBegin || (M = t)),
                        h(n),
                        n.returnBegin ? 0 : t.length
                    }(a);
                if ("illegal" === a.type && !s) {
                    const e = Error('Illegal lexeme "' + l + '" for mode "' + (R.className || "<unnamed>") + '"');
                    throw e.mode = R,
                    e
                }
                if ("end" === a.type) {
                    const e = b(a);
                    if (e !== W)
                        return e
                }
                if ("illegal" === a.type && "" === l)
                    return 1;
                if (L > 1e5 && L > 3 * a.index)
                    throw Error("potential infinite loop, way more iterations than matches");
                return M += l,
                l.length
            }
            const v = N(e);
            if (!v)
                throw U(o.replace("{}", e)),
                Error('Unknown language: "' + e + '"');
            const w = T(v, {
                plugins: a
            });
            let y = ""
              , R = l || w;
            const _ = {}
              , k = new u.__emitter(u);
            (()=>{
                const e = [];
                for (let t = R; t !== v; t = t.parent)
                    t.className && e.unshift(t.className);
                e.forEach((e=>k.openNode(e)))
            }
            )();
            let M = ""
              , O = 0
              , A = 0
              , L = 0
              , I = !1;
            try {
                for (R.matcher.considerAll(); ; ) {
                    L++,
                    I ? I = !1 : R.matcher.considerAll(),
                    R.matcher.lastIndex = A;
                    const e = R.matcher.exec(t);
                    if (!e)
                        break;
                    const n = x(t.substring(A, e.index), e);
                    A = e.index + n
                }
                return x(t.substr(A)),
                k.closeAllNodes(),
                k.finalize(),
                y = k.toHTML(),
                {
                    relevance: Math.floor(O),
                    value: y,
                    language: e,
                    illegal: !1,
                    emitter: k,
                    top: R
                }
            } catch (n) {
                if (n.message && n.message.includes("Illegal"))
                    return {
                        illegal: !0,
                        illegalBy: {
                            msg: n.message,
                            context: t.slice(A - 100, A + 100),
                            mode: n.mode
                        },
                        sofar: y,
                        relevance: 0,
                        value: G(t),
                        emitter: k
                    };
                if (r)
                    return {
                        illegal: !1,
                        relevance: 0,
                        value: G(t),
                        emitter: k,
                        language: e,
                        top: R,
                        errorRaised: n
                    };
                throw n
            }
        }
        function p(e, t) {
            t = t || u.languages || Object.keys(n);
            const i = (e=>{
                const t = {
                    relevance: 0,
                    emitter: new u.__emitter(u),
                    value: G(e),
                    illegal: !1,
                    top: g
                };
                return t.emitter.addText(e),
                t
            }
            )(e)
              , s = t.filter(N).filter(k).map((t=>f(t, e, !1)));
            s.unshift(i);
            const a = s.sort(((e,t)=>{
                if (e.relevance !== t.relevance)
                    return t.relevance - e.relevance;
                if (e.language && t.language) {
                    if (N(e.language).supersetOf === t.language)
                        return 1;
                    if (N(t.language).supersetOf === e.language)
                        return -1
                }
                return 0
            }
            ))
              , [r,l] = a
              , o = r;
            return o.second_best = l,
            o
        }
        const m = {
            "before:highlightElement": ({el: e})=>{
                u.useBR && (e.innerHTML = e.innerHTML.replace(/\n/g, "").replace(/<br[ /]*>/g, "\n"))
            }
            ,
            "after:highlightElement": ({result: e})=>{
                u.useBR && (e.value = e.value.replace(/\n/g, "<br>"))
            }
        }
          , b = /^(<[^>]+>|\t)+/gm
          , E = {
            "after:highlightElement": ({result: e})=>{
                u.tabReplace && (e.value = e.value.replace(b, (e=>e.replace(/\t/g, u.tabReplace))))
            }
        };
        function x(e) {
            let t = null;
            const n = (e=>{
                let t = e.className + " ";
                t += e.parentNode ? e.parentNode.className : "";
                const n = u.languageDetectRe.exec(t);
                if (n) {
                    const t = N(n[1]);
                    return t || (z(o.replace("{}", n[1])),
                    z("Falling back to no-highlight mode for this block.", e)),
                    t ? n[1] : "no-highlight"
                }
                return t.split(/\s+/).find((e=>h(e) || N(e)))
            }
            )(e);
            if (h(n))
                return;
            M("before:highlightElement", {
                el: e,
                language: n
            }),
            t = e;
            const i = t.textContent
              , a = n ? d(i, {
                language: n,
                ignoreIllegals: !0
            }) : p(i);
            M("after:highlightElement", {
                el: e,
                result: a,
                text: i
            }),
            e.innerHTML = a.value,
            ((e,t,n)=>{
                const i = t ? s[t] : n;
                e.classList.add("hljs"),
                i && e.classList.add(i)
            }
            )(e, n, a.language),
            e.result = {
                language: a.language,
                re: a.relevance,
                relavance: a.relevance
            },
            a.second_best && (e.second_best = {
                language: a.second_best.language,
                re: a.second_best.relevance,
                relavance: a.second_best.relevance
            })
        }
        const v = ()=>{
            v.called || (v.called = !0,
            K("10.6.0", "initHighlighting() is deprecated.  Use highlightAll() instead."),
            document.querySelectorAll("pre code").forEach(x))
        }
        ;
        let w = !1;
        function y() {
            "loading" !== document.readyState ? document.querySelectorAll("pre code").forEach(x) : w = !0
        }
        function N(e) {
            return e = (e || "").toLowerCase(),
            n[e] || n[s[e]]
        }
        function R(e, {languageName: t}) {
            "string" == typeof e && (e = [e]),
            e.forEach((e=>{
                s[e.toLowerCase()] = t
            }
            ))
        }
        function k(e) {
            const t = N(e);
            return t && !t.disableAutodetect
        }
        function M(e, t) {
            const n = e;
            a.forEach((e=>{
                e[n] && e[n](t)
            }
            ))
        }
        "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", (()=>{
            w && y()
        }
        ), !1),
        Object.assign(e, {
            highlight: d,
            highlightAuto: p,
            highlightAll: y,
            fixMarkup: e=>{
                return K("10.2.0", "fixMarkup will be removed entirely in v11.0"),
                K("10.2.0", "Please see https://github.com/highlightjs/highlight.js/issues/2534"),
                t = e,
                u.tabReplace || u.useBR ? t.replace(l, (e=>"\n" === e ? u.useBR ? "<br>" : e : u.tabReplace ? e.replace(/\t/g, u.tabReplace) : e)) : t;
                var t
            }
            ,
            highlightElement: x,
            highlightBlock: e=>(K("10.7.0", "highlightBlock will be removed entirely in v12.0"),
            K("10.7.0", "Please use highlightElement now."),
            x(e)),
            configure: e=>{
                e.useBR && (K("10.3.0", "'useBR' will be removed entirely in v11.0"),
                K("10.3.0", "Please see https://github.com/highlightjs/highlight.js/issues/2559")),
                u = V(u, e)
            }
            ,
            initHighlighting: v,
            initHighlightingOnLoad: ()=>{
                K("10.6.0", "initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."),
                w = !0
            }
            ,
            registerLanguage: (t,i)=>{
                let s = null;
                try {
                    s = i(e)
                } catch (e) {
                    if (U("Language definition for '{}' could not be registered.".replace("{}", t)),
                    !r)
                        throw e;
                    U(e),
                    s = g
                }
                s.name || (s.name = t),
                n[t] = s,
                s.rawDefinition = i.bind(null, e),
                s.aliases && R(s.aliases, {
                    languageName: t
                })
            }
            ,
            unregisterLanguage: e=>{
                delete n[e];
                for (const t of Object.keys(s))
                    s[t] === e && delete s[t]
            }
            ,
            listLanguages: ()=>Object.keys(n),
            getLanguage: N,
            registerAliases: R,
            requireLanguage: e=>{
                K("10.4.0", "requireLanguage will be removed entirely in v11."),
                K("10.4.0", "Please see https://github.com/highlightjs/highlight.js/pull/2844");
                const t = N(e);
                if (t)
                    return t;
                throw Error("The '{}' language is required, but not loaded.".replace("{}", e))
            }
            ,
            autoDetection: k,
            inherit: V,
            addPlugin: e=>{
                (e=>{
                    e["before:highlightBlock"] && !e["before:highlightElement"] && (e["before:highlightElement"] = t=>{
                        e["before:highlightBlock"](Object.assign({
                            block: t.el
                        }, t))
                    }
                    ),
                    e["after:highlightBlock"] && !e["after:highlightElement"] && (e["after:highlightElement"] = t=>{
                        e["after:highlightBlock"](Object.assign({
                            block: t.el
                        }, t))
                    }
                    )
                }
                )(e),
                a.push(e)
            }
            ,
            vuePlugin: P(e).VuePlugin
        }),
        e.debugMode = ()=>{
            r = !1
        }
        ,
        e.safeMode = ()=>{
            r = !0
        }
        ,
        e.versionString = "10.7.2";
        for (const e in _)
            "object" == typeof _[e] && t(_[e]);
        return Object.assign(e, _),
        e.addPlugin(m),
        e.addPlugin(D),
        e.addPlugin(E),
        e
    }
    )({})
}();
"object" == typeof exports && "undefined" != typeof module && (module.exports = hljs);
hljs.registerLanguage("nginx", (()=>{
    "use strict";
    return e=>{
        const n = {
            className: "variable",
            variants: [{
                begin: /\$\d+/
            }, {
                begin: /\$\{/,
                end: /\}/
            }, {
                begin: /[$@]/ + e.UNDERSCORE_IDENT_RE
            }]
        }
          , a = {
            endsWithParent: !0,
            keywords: {
                $pattern: "[a-z/_]+",
                literal: "on off yes no true false none blocked debug info notice warn error crit select break last permanent redirect kqueue rtsig epoll poll /dev/poll"
            },
            relevance: 0,
            illegal: "=>",
            contains: [e.HASH_COMMENT_MODE, {
                className: "string",
                contains: [e.BACKSLASH_ESCAPE, n],
                variants: [{
                    begin: /"/,
                    end: /"/
                }, {
                    begin: /'/,
                    end: /'/
                }]
            }, {
                begin: "([a-z]+):/",
                end: "\\s",
                endsWithParent: !0,
                excludeEnd: !0,
                contains: [n]
            }, {
                className: "regexp",
                contains: [e.BACKSLASH_ESCAPE, n],
                variants: [{
                    begin: "\\s\\^",
                    end: "\\s|\\{|;",
                    returnEnd: !0
                }, {
                    begin: "~\\*?\\s+",
                    end: "\\s|\\{|;",
                    returnEnd: !0
                }, {
                    begin: "\\*(\\.[a-z\\-]+)+"
                }, {
                    begin: "([a-z\\-]+\\.)+\\*"
                }]
            }, {
                className: "number",
                begin: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b"
            }, {
                className: "number",
                begin: "\\b\\d+[kKmMgGdshdwy]*\\b",
                relevance: 0
            }, n]
        };
        return {
            name: "Nginx config",
            aliases: ["nginxconf"],
            contains: [e.HASH_COMMENT_MODE, {
                begin: e.UNDERSCORE_IDENT_RE + "\\s+\\{",
                returnBegin: !0,
                end: /\{/,
                contains: [{
                    className: "section",
                    begin: e.UNDERSCORE_IDENT_RE
                }],
                relevance: 0
            }, {
                begin: e.UNDERSCORE_IDENT_RE + "\\s",
                end: ";|\\{",
                returnBegin: !0,
                contains: [{
                    className: "attribute",
                    begin: e.UNDERSCORE_IDENT_RE,
                    starts: a
                }],
                relevance: 0
            }],
            illegal: "[^\\s\\}]"
        }
    }
}
)());
hljs.registerLanguage("less", (()=>{
    "use strict";
    const e = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"]
      , t = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"]
      , i = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"]
      , o = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"]
      , n = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-variation-settings", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "src", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"].reverse()
      , r = i.concat(o);
    return a=>{
        const s = (e=>({
            IMPORTANT: {
                className: "meta",
                begin: "!important"
            },
            HEXCOLOR: {
                className: "number",
                begin: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
            },
            ATTRIBUTE_SELECTOR_MODE: {
                className: "selector-attr",
                begin: /\[/,
                end: /\]/,
                illegal: "$",
                contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
            }
        }))(a)
          , l = r
          , d = "([\\w-]+|@\\{[\\w-]+\\})"
          , c = []
          , g = []
          , b = e=>({
            className: "string",
            begin: "~?" + e + ".*?" + e
        })
          , m = (e,t,i)=>({
            className: e,
            begin: t,
            relevance: i
        })
          , u = {
            $pattern: /[a-z-]+/,
            keyword: "and or not only",
            attribute: t.join(" ")
        }
          , p = {
            begin: "\\(",
            end: "\\)",
            contains: g,
            keywords: u,
            relevance: 0
        };
        g.push(a.C_LINE_COMMENT_MODE, a.C_BLOCK_COMMENT_MODE, b("'"), b('"'), a.CSS_NUMBER_MODE, {
            begin: "(url|data-uri)\\(",
            starts: {
                className: "string",
                end: "[\\)\\n]",
                excludeEnd: !0
            }
        }, s.HEXCOLOR, p, m("variable", "@@?[\\w-]+", 10), m("variable", "@\\{[\\w-]+\\}"), m("built_in", "~?`[^`]*?`"), {
            className: "attribute",
            begin: "[\\w-]+\\s*:",
            end: ":",
            returnBegin: !0,
            excludeEnd: !0
        }, s.IMPORTANT);
        const f = g.concat({
            begin: /\{/,
            end: /\}/,
            contains: c
        })
          , h = {
            beginKeywords: "when",
            endsWithParent: !0,
            contains: [{
                beginKeywords: "and not"
            }].concat(g)
        }
          , w = {
            begin: d + "\\s*:",
            returnBegin: !0,
            end: /[;}]/,
            relevance: 0,
            contains: [{
                begin: /-(webkit|moz|ms|o)-/
            }, {
                className: "attribute",
                begin: "\\b(" + n.join("|") + ")\\b",
                end: /(?=:)/,
                starts: {
                    endsWithParent: !0,
                    illegal: "[<=$]",
                    relevance: 0,
                    contains: g
                }
            }]
        }
          , v = {
            className: "keyword",
            begin: "@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",
            starts: {
                end: "[;{}]",
                keywords: u,
                returnEnd: !0,
                contains: g,
                relevance: 0
            }
        }
          , y = {
            className: "variable",
            variants: [{
                begin: "@[\\w-]+\\s*:",
                relevance: 15
            }, {
                begin: "@[\\w-]+"
            }],
            starts: {
                end: "[;}]",
                returnEnd: !0,
                contains: f
            }
        }
          , k = {
            variants: [{
                begin: "[\\.#:&\\[>]",
                end: "[;{}]"
            }, {
                begin: d,
                end: /\{/
            }],
            returnBegin: !0,
            returnEnd: !0,
            illegal: "[<='$\"]",
            relevance: 0,
            contains: [a.C_LINE_COMMENT_MODE, a.C_BLOCK_COMMENT_MODE, h, m("keyword", "all\\b"), m("variable", "@\\{[\\w-]+\\}"), {
                begin: "\\b(" + e.join("|") + ")\\b",
                className: "selector-tag"
            }, m("selector-tag", d + "%?", 0), m("selector-id", "#" + d), m("selector-class", "\\." + d, 0), m("selector-tag", "&", 0), s.ATTRIBUTE_SELECTOR_MODE, {
                className: "selector-pseudo",
                begin: ":(" + i.join("|") + ")"
            }, {
                className: "selector-pseudo",
                begin: "::(" + o.join("|") + ")"
            }, {
                begin: "\\(",
                end: "\\)",
                contains: f
            }, {
                begin: "!important"
            }]
        }
          , E = {
            begin: `[\\w-]+:(:)?(${l.join("|")})`,
            returnBegin: !0,
            contains: [k]
        };
        return c.push(a.C_LINE_COMMENT_MODE, a.C_BLOCK_COMMENT_MODE, v, y, E, w, k),
        {
            name: "Less",
            case_insensitive: !0,
            illegal: "[=>'/<($\"]",
            contains: c
        }
    }
}
)());
hljs.registerLanguage("python", (()=>{
    "use strict";
    return e=>{
        const n = {
            $pattern: /[A-Za-z]\w+|__\w+__/,
            keyword: ["and", "as", "assert", "async", "await", "break", "class", "continue", "def", "del", "elif", "else", "except", "finally", "for", "from", "global", "if", "import", "in", "is", "lambda", "nonlocal|10", "not", "or", "pass", "raise", "return", "try", "while", "with", "yield"],
            built_in: ["__import__", "abs", "all", "any", "ascii", "bin", "bool", "breakpoint", "bytearray", "bytes", "callable", "chr", "classmethod", "compile", "complex", "delattr", "dict", "dir", "divmod", "enumerate", "eval", "exec", "filter", "float", "format", "frozenset", "getattr", "globals", "hasattr", "hash", "help", "hex", "id", "input", "int", "isinstance", "issubclass", "iter", "len", "list", "locals", "map", "max", "memoryview", "min", "next", "object", "oct", "open", "ord", "pow", "print", "property", "range", "repr", "reversed", "round", "set", "setattr", "slice", "sorted", "staticmethod", "str", "sum", "super", "tuple", "type", "vars", "zip"],
            literal: ["__debug__", "Ellipsis", "False", "None", "NotImplemented", "True"],
            type: ["Any", "Callable", "Coroutine", "Dict", "List", "Literal", "Generic", "Optional", "Sequence", "Set", "Tuple", "Type", "Union"]
        }
          , a = {
            className: "meta",
            begin: /^(>>>|\.\.\.) /
        }
          , i = {
            className: "subst",
            begin: /\{/,
            end: /\}/,
            keywords: n,
            illegal: /#/
        }
          , s = {
            begin: /\{\{/,
            relevance: 0
        }
          , t = {
            className: "string",
            contains: [e.BACKSLASH_ESCAPE],
            variants: [{
                begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
                end: /'''/,
                contains: [e.BACKSLASH_ESCAPE, a],
                relevance: 10
            }, {
                begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
                end: /"""/,
                contains: [e.BACKSLASH_ESCAPE, a],
                relevance: 10
            }, {
                begin: /([fF][rR]|[rR][fF]|[fF])'''/,
                end: /'''/,
                contains: [e.BACKSLASH_ESCAPE, a, s, i]
            }, {
                begin: /([fF][rR]|[rR][fF]|[fF])"""/,
                end: /"""/,
                contains: [e.BACKSLASH_ESCAPE, a, s, i]
            }, {
                begin: /([uU]|[rR])'/,
                end: /'/,
                relevance: 10
            }, {
                begin: /([uU]|[rR])"/,
                end: /"/,
                relevance: 10
            }, {
                begin: /([bB]|[bB][rR]|[rR][bB])'/,
                end: /'/
            }, {
                begin: /([bB]|[bB][rR]|[rR][bB])"/,
                end: /"/
            }, {
                begin: /([fF][rR]|[rR][fF]|[fF])'/,
                end: /'/,
                contains: [e.BACKSLASH_ESCAPE, s, i]
            }, {
                begin: /([fF][rR]|[rR][fF]|[fF])"/,
                end: /"/,
                contains: [e.BACKSLASH_ESCAPE, s, i]
            }, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
        }
          , r = "[0-9](_?[0-9])*"
          , l = `(\\b(${r}))?\\.(${r})|\\b(${r})\\.`
          , b = {
            className: "number",
            relevance: 0,
            variants: [{
                begin: `(\\b(${r})|(${l}))[eE][+-]?(${r})[jJ]?\\b`
            }, {
                begin: `(${l})[jJ]?`
            }, {
                begin: "\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"
            }, {
                begin: "\\b0[bB](_?[01])+[lL]?\\b"
            }, {
                begin: "\\b0[oO](_?[0-7])+[lL]?\\b"
            }, {
                begin: "\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"
            }, {
                begin: `\\b(${r})[jJ]\\b`
            }]
        }
          , o = {
            className: "comment",
            begin: (d = /# type:/,
            ((...e)=>e.map((e=>(e=>e ? "string" == typeof e ? e : e.source : null)(e))).join(""))("(?=", d, ")")),
            end: /$/,
            keywords: n,
            contains: [{
                begin: /# type:/
            }, {
                begin: /#/,
                end: /\b\B/,
                endsWithParent: !0
            }]
        }
          , c = {
            className: "params",
            variants: [{
                className: "",
                begin: /\(\s*\)/,
                skip: !0
            }, {
                begin: /\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0,
                keywords: n,
                contains: ["self", a, b, t, e.HASH_COMMENT_MODE]
            }]
        };
        var d;
        return i.contains = [t, b, a],
        {
            name: "Python",
            aliases: ["py", "gyp", "ipython"],
            keywords: n,
            illegal: /(<\/|->|\?)|=>/,
            contains: [a, b, {
                begin: /\bself\b/
            }, {
                beginKeywords: "if",
                relevance: 0
            }, t, o, e.HASH_COMMENT_MODE, {
                variants: [{
                    className: "function",
                    beginKeywords: "def"
                }, {
                    className: "class",
                    beginKeywords: "class"
                }],
                end: /:/,
                illegal: /[${=;\n,]/,
                contains: [e.UNDERSCORE_TITLE_MODE, c, {
                    begin: /->/,
                    endsWithParent: !0,
                    keywords: n
                }]
            }, {
                className: "meta",
                begin: /^[\t ]*@/,
                end: /(?=#)|$/,
                contains: [b, c, t]
            }]
        }
    }
}
)());
hljs.registerLanguage("r", (()=>{
    "use strict";
    function e(...e) {
        return e.map((e=>{
            return (a = e) ? "string" == typeof a ? a : a.source : null;
            var a
        }
        )).join("")
    }
    return a=>{
        const n = /(?:(?:[a-zA-Z]|\.[._a-zA-Z])[._a-zA-Z0-9]*)|\.(?!\d)/;
        return {
            name: "R",
            illegal: /->/,
            keywords: {
                $pattern: n,
                keyword: "function if in break next repeat else for while",
                literal: "NULL NA TRUE FALSE Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 NA_complex_|10",
                built_in: "LETTERS letters month.abb month.name pi T F abs acos acosh all any anyNA Arg as.call as.character as.complex as.double as.environment as.integer as.logical as.null.default as.numeric as.raw asin asinh atan atanh attr attributes baseenv browser c call ceiling class Conj cos cosh cospi cummax cummin cumprod cumsum digamma dim dimnames emptyenv exp expression floor forceAndCall gamma gc.time globalenv Im interactive invisible is.array is.atomic is.call is.character is.complex is.double is.environment is.expression is.finite is.function is.infinite is.integer is.language is.list is.logical is.matrix is.na is.name is.nan is.null is.numeric is.object is.pairlist is.raw is.recursive is.single is.symbol lazyLoadDBfetch length lgamma list log max min missing Mod names nargs nzchar oldClass on.exit pos.to.env proc.time prod quote range Re rep retracemem return round seq_along seq_len seq.int sign signif sin sinh sinpi sqrt standardGeneric substitute sum switch tan tanh tanpi tracemem trigamma trunc unclass untracemem UseMethod xtfrm"
            },
            compilerExtensions: [(a,n)=>{
                if (!a.beforeMatch)
                    return;
                if (a.starts)
                    throw Error("beforeMatch cannot be used with starts");
                const i = Object.assign({}, a);
                Object.keys(a).forEach((e=>{
                    delete a[e]
                }
                )),
                a.begin = e(i.beforeMatch, e("(?=", i.begin, ")")),
                a.starts = {
                    relevance: 0,
                    contains: [Object.assign(i, {
                        endsParent: !0
                    })]
                },
                a.relevance = 0,
                delete i.beforeMatch
            }
            ],
            contains: [a.COMMENT(/#'/, /$/, {
                contains: [{
                    className: "doctag",
                    begin: "@examples",
                    starts: {
                        contains: [{
                            begin: /\n/
                        }, {
                            begin: /#'\s*(?=@[a-zA-Z]+)/,
                            endsParent: !0
                        }, {
                            begin: /#'/,
                            end: /$/,
                            excludeBegin: !0
                        }]
                    }
                }, {
                    className: "doctag",
                    begin: "@param",
                    end: /$/,
                    contains: [{
                        className: "variable",
                        variants: [{
                            begin: n
                        }, {
                            begin: /`(?:\\.|[^`\\])+`/
                        }],
                        endsParent: !0
                    }]
                }, {
                    className: "doctag",
                    begin: /@[a-zA-Z]+/
                }, {
                    className: "meta-keyword",
                    begin: /\\[a-zA-Z]+/
                }]
            }), a.HASH_COMMENT_MODE, {
                className: "string",
                contains: [a.BACKSLASH_ESCAPE],
                variants: [a.END_SAME_AS_BEGIN({
                    begin: /[rR]"(-*)\(/,
                    end: /\)(-*)"/
                }), a.END_SAME_AS_BEGIN({
                    begin: /[rR]"(-*)\{/,
                    end: /\}(-*)"/
                }), a.END_SAME_AS_BEGIN({
                    begin: /[rR]"(-*)\[/,
                    end: /\](-*)"/
                }), a.END_SAME_AS_BEGIN({
                    begin: /[rR]'(-*)\(/,
                    end: /\)(-*)'/
                }), a.END_SAME_AS_BEGIN({
                    begin: /[rR]'(-*)\{/,
                    end: /\}(-*)'/
                }), a.END_SAME_AS_BEGIN({
                    begin: /[rR]'(-*)\[/,
                    end: /\](-*)'/
                }), {
                    begin: '"',
                    end: '"',
                    relevance: 0
                }, {
                    begin: "'",
                    end: "'",
                    relevance: 0
                }]
            }, {
                className: "number",
                relevance: 0,
                beforeMatch: /([^a-zA-Z0-9._])/,
                variants: [{
                    match: /0[xX][0-9a-fA-F]+\.[0-9a-fA-F]*[pP][+-]?\d+i?/
                }, {
                    match: /0[xX][0-9a-fA-F]+([pP][+-]?\d+)?[Li]?/
                }, {
                    match: /(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?[Li]?/
                }]
            }, {
                begin: "%",
                end: "%"
            }, {
                begin: e(/[a-zA-Z][a-zA-Z_0-9]*/, "\\s+<-\\s+")
            }, {
                begin: "`",
                end: "`",
                contains: [{
                    begin: /\\./
                }]
            }]
        }
    }
}
)());
hljs.registerLanguage("bash", (()=>{
    "use strict";
    function e(...e) {
        return e.map((e=>{
            return (s = e) ? "string" == typeof s ? s : s.source : null;
            var s
        }
        )).join("")
    }
    return s=>{
        const n = {}
          , t = {
            begin: /\$\{/,
            end: /\}/,
            contains: ["self", {
                begin: /:-/,
                contains: [n]
            }]
        };
        Object.assign(n, {
            className: "variable",
            variants: [{
                begin: e(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
            }, t]
        });
        const a = {
            className: "subst",
            begin: /\$\(/,
            end: /\)/,
            contains: [s.BACKSLASH_ESCAPE]
        }
          , i = {
            begin: /<<-?\s*(?=\w+)/,
            starts: {
                contains: [s.END_SAME_AS_BEGIN({
                    begin: /(\w+)/,
                    end: /(\w+)/,
                    className: "string"
                })]
            }
        }
          , c = {
            className: "string",
            begin: /"/,
            end: /"/,
            contains: [s.BACKSLASH_ESCAPE, n, a]
        };
        a.contains.push(c);
        const o = {
            begin: /\$\(\(/,
            end: /\)\)/,
            contains: [{
                begin: /\d+#[0-9a-f]+/,
                className: "number"
            }, s.NUMBER_MODE, n]
        }
          , r = s.SHEBANG({
            binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
            relevance: 10
        })
          , l = {
            className: "function",
            begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
            returnBegin: !0,
            contains: [s.inherit(s.TITLE_MODE, {
                begin: /\w[\w\d_]*/
            })],
            relevance: 0
        };
        return {
            name: "Bash",
            aliases: ["sh", "zsh"],
            keywords: {
                $pattern: /\b[a-z._-]+\b/,
                keyword: "if then else elif fi for while in do done case esac function",
                literal: "true false",
                built_in: "break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"
            },
            contains: [r, s.SHEBANG(), l, o, s.HASH_COMMENT_MODE, i, c, {
                className: "",
                begin: /\\"/
            }, {
                className: "string",
                begin: /'/,
                end: /'/
            }, n]
        }
    }
}
)());
hljs.registerLanguage("shell", (()=>{
    "use strict";
    return s=>({
        name: "Shell Session",
        aliases: ["console"],
        contains: [{
            className: "meta",
            begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#]/,
            starts: {
                end: /[^\\](?=\s*$)/,
                subLanguage: "bash"
            }
        }]
    })
}
)());
hljs.registerLanguage("gradle", (()=>{
    "use strict";
    return e=>({
        name: "Gradle",
        case_insensitive: !0,
        keywords: {
            keyword: "task project allprojects subprojects artifacts buildscript configurations dependencies repositories sourceSets description delete from into include exclude source classpath destinationDir includes options sourceCompatibility targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant def abstract break case catch continue default do else extends final finally for if implements instanceof native new private protected public return static switch synchronized throw throws transient try volatile while strictfp package import false null super this true antlrtask checkstyle codenarc copy boolean byte char class double float int interface long short void compile runTime file fileTree abs any append asList asWritable call collect compareTo count div dump each eachByte eachFile eachLine every find findAll flatten getAt getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter newReader newWriter next plus pop power previous print println push putAt read readBytes readLines reverse reverseEach round size sort splitEachLine step subMap times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader withStream withWriter withWriterAppend write writeLine"
        },
        contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE, e.REGEXP_MODE]
    })
}
)());
hljs.registerLanguage("properties", (()=>{
    "use strict";
    return e=>{
        var n = "[ \\t\\f]*"
          , a = n + "[:=]" + n
          , t = "(" + a + "|[ \\t\\f]+)"
          , r = "([^\\\\\\W:= \\t\\f\\n]|\\\\.)+"
          , s = "([^\\\\:= \\t\\f\\n]|\\\\.)+"
          , i = {
            end: t,
            relevance: 0,
            starts: {
                className: "string",
                end: /$/,
                relevance: 0,
                contains: [{
                    begin: "\\\\\\\\"
                }, {
                    begin: "\\\\\\n"
                }]
            }
        };
        return {
            name: ".properties",
            case_insensitive: !0,
            illegal: /\S/,
            contains: [e.COMMENT("^\\s*[!#]", "$"), {
                returnBegin: !0,
                variants: [{
                    begin: r + a,
                    relevance: 1
                }, {
                    begin: r + "[ \\t\\f]+",
                    relevance: 0
                }],
                contains: [{
                    className: "attr",
                    begin: r,
                    endsParent: !0,
                    relevance: 0
                }],
                starts: i
            }, {
                begin: s + t,
                returnBegin: !0,
                relevance: 0,
                contains: [{
                    className: "meta",
                    begin: s,
                    endsParent: !0,
                    relevance: 0
                }],
                starts: i
            }, {
                className: "attr",
                relevance: 0,
                begin: s + n + "$"
            }]
        }
    }
}
)());
hljs.registerLanguage("xml", (()=>{
    "use strict";
    function e(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    function n(e) {
        return a("(?=", e, ")")
    }
    function a(...n) {
        return n.map((n=>e(n))).join("")
    }
    function s(...n) {
        return "(" + n.map((n=>e(n))).join("|") + ")"
    }
    return e=>{
        const t = a(/[A-Z_]/, a("(", /[A-Z0-9_.-]*:/, ")?"), /[A-Z0-9_.-]*/)
          , i = {
            className: "symbol",
            begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
        }
          , r = {
            begin: /\s/,
            contains: [{
                className: "meta-keyword",
                begin: /#?[a-z_][a-z1-9_-]+/,
                illegal: /\n/
            }]
        }
          , c = e.inherit(r, {
            begin: /\(/,
            end: /\)/
        })
          , l = e.inherit(e.APOS_STRING_MODE, {
            className: "meta-string"
        })
          , g = e.inherit(e.QUOTE_STRING_MODE, {
            className: "meta-string"
        })
          , m = {
            endsWithParent: !0,
            illegal: /</,
            relevance: 0,
            contains: [{
                className: "attr",
                begin: /[A-Za-z0-9._:-]+/,
                relevance: 0
            }, {
                begin: /=\s*/,
                relevance: 0,
                contains: [{
                    className: "string",
                    endsParent: !0,
                    variants: [{
                        begin: /"/,
                        end: /"/,
                        contains: [i]
                    }, {
                        begin: /'/,
                        end: /'/,
                        contains: [i]
                    }, {
                        begin: /[^\s"'=<>`]+/
                    }]
                }]
            }]
        };
        return {
            name: "HTML, XML",
            aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist", "wsf", "svg"],
            case_insensitive: !0,
            contains: [{
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                relevance: 10,
                contains: [r, g, l, c, {
                    begin: /\[/,
                    end: /\]/,
                    contains: [{
                        className: "meta",
                        begin: /<![a-z]/,
                        end: />/,
                        contains: [r, c, g, l]
                    }]
                }]
            }, e.COMMENT(/<!--/, /-->/, {
                relevance: 10
            }), {
                begin: /<!\[CDATA\[/,
                end: /\]\]>/,
                relevance: 10
            }, i, {
                className: "meta",
                begin: /<\?xml/,
                end: /\?>/,
                relevance: 10
            }, {
                className: "tag",
                begin: /<style(?=\s|>)/,
                end: />/,
                keywords: {
                    name: "style"
                },
                contains: [m],
                starts: {
                    end: /<\/style>/,
                    returnEnd: !0,
                    subLanguage: ["css", "xml"]
                }
            }, {
                className: "tag",
                begin: /<script(?=\s|>)/,
                end: />/,
                keywords: {
                    name: "script"
                },
                contains: [m],
                starts: {
                    end: /<\/script>/,
                    returnEnd: !0,
                    subLanguage: ["javascript", "handlebars", "xml"]
                }
            }, {
                className: "tag",
                begin: /<>|<\/>/
            }, {
                className: "tag",
                begin: a(/</, n(a(t, s(/\/>/, />/, /\s/)))),
                end: /\/?>/,
                contains: [{
                    className: "name",
                    begin: t,
                    relevance: 0,
                    starts: m
                }]
            }, {
                className: "tag",
                begin: a(/<\//, n(a(t, />/))),
                contains: [{
                    className: "name",
                    begin: t,
                    relevance: 0
                }, {
                    begin: />/,
                    relevance: 0,
                    endsParent: !0
                }]
            }]
        }
    }
}
)());
hljs.registerLanguage("c", (()=>{
    "use strict";
    function e(e) {
        return ((...e)=>e.map((e=>(e=>e ? "string" == typeof e ? e : e.source : null)(e))).join(""))("(", e, ")?")
    }
    return t=>{
        const n = t.COMMENT("//", "$", {
            contains: [{
                begin: /\\\n/
            }]
        })
          , r = "[a-zA-Z_]\\w*::"
          , a = "(decltype\\(auto\\)|" + e(r) + "[a-zA-Z_]\\w*" + e("<[^<>]+>") + ")"
          , i = {
            className: "keyword",
            begin: "\\b[a-z\\d_]*_t\\b"
        }
          , s = {
            className: "string",
            variants: [{
                begin: '(u8?|U|L)?"',
                end: '"',
                illegal: "\\n",
                contains: [t.BACKSLASH_ESCAPE]
            }, {
                begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                end: "'",
                illegal: "."
            }, t.END_SAME_AS_BEGIN({
                begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                end: /\)([^()\\ ]{0,16})"/
            })]
        }
          , o = {
            className: "number",
            variants: [{
                begin: "\\b(0b[01']+)"
            }, {
                begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
            }, {
                begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }],
            relevance: 0
        }
          , c = {
            className: "meta",
            begin: /#\s*[a-z]+\b/,
            end: /$/,
            keywords: {
                "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
            },
            contains: [{
                begin: /\\\n/,
                relevance: 0
            }, t.inherit(s, {
                className: "meta-string"
            }), {
                className: "meta-string",
                begin: /<.*?>/
            }, n, t.C_BLOCK_COMMENT_MODE]
        }
          , l = {
            className: "title",
            begin: e(r) + t.IDENT_RE,
            relevance: 0
        }
          , d = e(r) + t.IDENT_RE + "\\s*\\("
          , u = {
            keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
            built_in: "std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",
            literal: "true false nullptr NULL"
        }
          , m = [c, i, n, t.C_BLOCK_COMMENT_MODE, o, s]
          , p = {
            variants: [{
                begin: /=/,
                end: /;/
            }, {
                begin: /\(/,
                end: /\)/
            }, {
                beginKeywords: "new throw return else",
                end: /;/
            }],
            keywords: u,
            contains: m.concat([{
                begin: /\(/,
                end: /\)/,
                keywords: u,
                contains: m.concat(["self"]),
                relevance: 0
            }]),
            relevance: 0
        }
          , _ = {
            className: "function",
            begin: "(" + a + "[\\*&\\s]+)+" + d,
            returnBegin: !0,
            end: /[{;=]/,
            excludeEnd: !0,
            keywords: u,
            illegal: /[^\w\s\*&:<>.]/,
            contains: [{
                begin: "decltype\\(auto\\)",
                keywords: u,
                relevance: 0
            }, {
                begin: d,
                returnBegin: !0,
                contains: [l],
                relevance: 0
            }, {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: u,
                relevance: 0,
                contains: [n, t.C_BLOCK_COMMENT_MODE, s, o, i, {
                    begin: /\(/,
                    end: /\)/,
                    keywords: u,
                    relevance: 0,
                    contains: ["self", n, t.C_BLOCK_COMMENT_MODE, s, o, i]
                }]
            }, i, n, t.C_BLOCK_COMMENT_MODE, c]
        };
        return {
            name: "C",
            aliases: ["h"],
            keywords: u,
            disableAutodetect: !0,
            illegal: "</",
            contains: [].concat(p, _, m, [c, {
                begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                end: ">",
                keywords: u,
                contains: ["self", i]
            }, {
                begin: t.IDENT_RE + "::",
                keywords: u
            }, {
                className: "class",
                beginKeywords: "enum class struct union",
                end: /[{;:<>=]/,
                contains: [{
                    beginKeywords: "final class struct"
                }, t.TITLE_MODE]
            }]),
            exports: {
                preprocessor: c,
                strings: s,
                keywords: u
            }
        }
    }
}
)());
hljs.registerLanguage("ruby", (()=>{
    "use strict";
    function e(...e) {
        return e.map((e=>{
            return (n = e) ? "string" == typeof n ? n : n.source : null;
            var n
        }
        )).join("")
    }
    return n=>{
        const a = "([a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?)"
          , i = {
            keyword: "and then defined module in return redo if BEGIN retry end for self when next until do begin unless END rescue else break undef not super class case require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor __FILE__",
            built_in: "proc lambda",
            literal: "true false nil"
        }
          , s = {
            className: "doctag",
            begin: "@[A-Za-z]+"
        }
          , r = {
            begin: "#<",
            end: ">"
        }
          , b = [n.COMMENT("#", "$", {
            contains: [s]
        }), n.COMMENT("^=begin", "^=end", {
            contains: [s],
            relevance: 10
        }), n.COMMENT("^__END__", "\\n$")]
          , c = {
            className: "subst",
            begin: /#\{/,
            end: /\}/,
            keywords: i
        }
          , t = {
            className: "string",
            contains: [n.BACKSLASH_ESCAPE, c],
            variants: [{
                begin: /'/,
                end: /'/
            }, {
                begin: /"/,
                end: /"/
            }, {
                begin: /`/,
                end: /`/
            }, {
                begin: /%[qQwWx]?\(/,
                end: /\)/
            }, {
                begin: /%[qQwWx]?\[/,
                end: /\]/
            }, {
                begin: /%[qQwWx]?\{/,
                end: /\}/
            }, {
                begin: /%[qQwWx]?</,
                end: />/
            }, {
                begin: /%[qQwWx]?\//,
                end: /\//
            }, {
                begin: /%[qQwWx]?%/,
                end: /%/
            }, {
                begin: /%[qQwWx]?-/,
                end: /-/
            }, {
                begin: /%[qQwWx]?\|/,
                end: /\|/
            }, {
                begin: /\B\?(\\\d{1,3})/
            }, {
                begin: /\B\?(\\x[A-Fa-f0-9]{1,2})/
            }, {
                begin: /\B\?(\\u\{?[A-Fa-f0-9]{1,6}\}?)/
            }, {
                begin: /\B\?(\\M-\\C-|\\M-\\c|\\c\\M-|\\M-|\\C-\\M-)[\x20-\x7e]/
            }, {
                begin: /\B\?\\(c|C-)[\x20-\x7e]/
            }, {
                begin: /\B\?\\?\S/
            }, {
                begin: /<<[-~]?'?(\w+)\n(?:[^\n]*\n)*?\s*\1\b/,
                returnBegin: !0,
                contains: [{
                    begin: /<<[-~]?'?/
                }, n.END_SAME_AS_BEGIN({
                    begin: /(\w+)/,
                    end: /(\w+)/,
                    contains: [n.BACKSLASH_ESCAPE, c]
                })]
            }]
        }
          , g = "[0-9](_?[0-9])*"
          , d = {
            className: "number",
            relevance: 0,
            variants: [{
                begin: `\\b([1-9](_?[0-9])*|0)(\\.(${g}))?([eE][+-]?(${g})|r)?i?\\b`
            }, {
                begin: "\\b0[dD][0-9](_?[0-9])*r?i?\\b"
            }, {
                begin: "\\b0[bB][0-1](_?[0-1])*r?i?\\b"
            }, {
                begin: "\\b0[oO][0-7](_?[0-7])*r?i?\\b"
            }, {
                begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*r?i?\\b"
            }, {
                begin: "\\b0(_?[0-7])+r?i?\\b"
            }]
        }
          , l = {
            className: "params",
            begin: "\\(",
            end: "\\)",
            endsParent: !0,
            keywords: i
        }
          , o = [t, {
            className: "class",
            beginKeywords: "class module",
            end: "$|;",
            illegal: /=/,
            contains: [n.inherit(n.TITLE_MODE, {
                begin: "[A-Za-z_]\\w*(::\\w+)*(\\?|!)?"
            }), {
                begin: "<\\s*",
                contains: [{
                    begin: "(" + n.IDENT_RE + "::)?" + n.IDENT_RE,
                    relevance: 0
                }]
            }].concat(b)
        }, {
            className: "function",
            begin: e(/def\s+/, (_ = a + "\\s*(\\(|;|$)",
            e("(?=", _, ")"))),
            relevance: 0,
            keywords: "def",
            end: "$|;",
            contains: [n.inherit(n.TITLE_MODE, {
                begin: a
            }), l].concat(b)
        }, {
            begin: n.IDENT_RE + "::"
        }, {
            className: "symbol",
            begin: n.UNDERSCORE_IDENT_RE + "(!|\\?)?:",
            relevance: 0
        }, {
            className: "symbol",
            begin: ":(?!\\s)",
            contains: [t, {
                begin: a
            }],
            relevance: 0
        }, d, {
            className: "variable",
            begin: "(\\$\\W)|((\\$|@@?)(\\w+))(?=[^@$?])(?![A-Za-z])(?![@$?'])"
        }, {
            className: "params",
            begin: /\|/,
            end: /\|/,
            relevance: 0,
            keywords: i
        }, {
            begin: "(" + n.RE_STARTERS_RE + "|unless)\\s*",
            keywords: "unless",
            contains: [{
                className: "regexp",
                contains: [n.BACKSLASH_ESCAPE, c],
                illegal: /\n/,
                variants: [{
                    begin: "/",
                    end: "/[a-z]*"
                }, {
                    begin: /%r\{/,
                    end: /\}[a-z]*/
                }, {
                    begin: "%r\\(",
                    end: "\\)[a-z]*"
                }, {
                    begin: "%r!",
                    end: "![a-z]*"
                }, {
                    begin: "%r\\[",
                    end: "\\][a-z]*"
                }]
            }].concat(r, b),
            relevance: 0
        }].concat(r, b);
        var _;
        c.contains = o,
        l.contains = o;
        const E = [{
            begin: /^\s*=>/,
            starts: {
                end: "$",
                contains: o
            }
        }, {
            className: "meta",
            begin: "^([>?]>|[\\w#]+\\(\\w+\\):\\d+:\\d+>|(\\w+-)?\\d+\\.\\d+\\.\\d+(p\\d+)?[^\\d][^>]+>)(?=[ ])",
            starts: {
                end: "$",
                contains: o
            }
        }];
        return b.unshift(r),
        {
            name: "Ruby",
            aliases: ["rb", "gemspec", "podspec", "thor", "irb"],
            keywords: i,
            illegal: /\/\*/,
            contains: [n.SHEBANG({
                binary: "ruby"
            })].concat(E).concat(b).concat(o)
        }
    }
}
)());
hljs.registerLanguage("php", (()=>{
    "use strict";
    return e=>{
        const r = {
            className: "variable",
            begin: "\\$+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*(?![A-Za-z0-9])(?![$])"
        }
          , t = {
            className: "meta",
            variants: [{
                begin: /<\?php/,
                relevance: 10
            }, {
                begin: /<\?[=]?/
            }, {
                begin: /\?>/
            }]
        }
          , a = {
            className: "subst",
            variants: [{
                begin: /\$\w+/
            }, {
                begin: /\{\$/,
                end: /\}/
            }]
        }
          , n = e.inherit(e.APOS_STRING_MODE, {
            illegal: null
        })
          , i = e.inherit(e.QUOTE_STRING_MODE, {
            illegal: null,
            contains: e.QUOTE_STRING_MODE.contains.concat(a)
        })
          , o = e.END_SAME_AS_BEGIN({
            begin: /<<<[ \t]*(\w+)\n/,
            end: /[ \t]*(\w+)\b/,
            contains: e.QUOTE_STRING_MODE.contains.concat(a)
        })
          , l = {
            className: "string",
            contains: [e.BACKSLASH_ESCAPE, t],
            variants: [e.inherit(n, {
                begin: "b'",
                end: "'"
            }), e.inherit(i, {
                begin: 'b"',
                end: '"'
            }), i, n, o]
        }
          , s = {
            className: "number",
            variants: [{
                begin: "\\b0b[01]+(?:_[01]+)*\\b"
            }, {
                begin: "\\b0o[0-7]+(?:_[0-7]+)*\\b"
            }, {
                begin: "\\b0x[\\da-f]+(?:_[\\da-f]+)*\\b"
            }, {
                begin: "(?:\\b\\d+(?:_\\d+)*(\\.(?:\\d+(?:_\\d+)*))?|\\B\\.\\d+)(?:e[+-]?\\d+)?"
            }],
            relevance: 0
        }
          , c = {
            keyword: "__CLASS__ __DIR__ __FILE__ __FUNCTION__ __LINE__ __METHOD__ __NAMESPACE__ __TRAIT__ die echo exit include include_once print require require_once array abstract and as binary bool boolean break callable case catch class clone const continue declare default do double else elseif empty enddeclare endfor endforeach endif endswitch endwhile enum eval extends final finally float for foreach from global goto if implements instanceof insteadof int integer interface isset iterable list match|0 mixed new object or private protected public real return string switch throw trait try unset use var void while xor yield",
            literal: "false null true",
            built_in: "Error|0 AppendIterator ArgumentCountError ArithmeticError ArrayIterator ArrayObject AssertionError BadFunctionCallException BadMethodCallException CachingIterator CallbackFilterIterator CompileError Countable DirectoryIterator DivisionByZeroError DomainException EmptyIterator ErrorException Exception FilesystemIterator FilterIterator GlobIterator InfiniteIterator InvalidArgumentException IteratorIterator LengthException LimitIterator LogicException MultipleIterator NoRewindIterator OutOfBoundsException OutOfRangeException OuterIterator OverflowException ParentIterator ParseError RangeException RecursiveArrayIterator RecursiveCachingIterator RecursiveCallbackFilterIterator RecursiveDirectoryIterator RecursiveFilterIterator RecursiveIterator RecursiveIteratorIterator RecursiveRegexIterator RecursiveTreeIterator RegexIterator RuntimeException SeekableIterator SplDoublyLinkedList SplFileInfo SplFileObject SplFixedArray SplHeap SplMaxHeap SplMinHeap SplObjectStorage SplObserver SplObserver SplPriorityQueue SplQueue SplStack SplSubject SplSubject SplTempFileObject TypeError UnderflowException UnexpectedValueException UnhandledMatchError ArrayAccess Closure Generator Iterator IteratorAggregate Serializable Stringable Throwable Traversable WeakReference WeakMap Directory __PHP_Incomplete_Class parent php_user_filter self static stdClass"
        };
        return {
            aliases: ["php3", "php4", "php5", "php6", "php7", "php8"],
            case_insensitive: !0,
            keywords: c,
            contains: [e.HASH_COMMENT_MODE, e.COMMENT("//", "$", {
                contains: [t]
            }), e.COMMENT("/\\*", "\\*/", {
                contains: [{
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                }]
            }), e.COMMENT("__halt_compiler.+?;", !1, {
                endsWithParent: !0,
                keywords: "__halt_compiler"
            }), t, {
                className: "keyword",
                begin: /\$this\b/
            }, r, {
                begin: /(::|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*/
            }, {
                className: "function",
                relevance: 0,
                beginKeywords: "fn function",
                end: /[;{]/,
                excludeEnd: !0,
                illegal: "[$%\\[]",
                contains: [{
                    beginKeywords: "use"
                }, e.UNDERSCORE_TITLE_MODE, {
                    begin: "=>",
                    endsParent: !0
                }, {
                    className: "params",
                    begin: "\\(",
                    end: "\\)",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: c,
                    contains: ["self", r, e.C_BLOCK_COMMENT_MODE, l, s]
                }]
            }, {
                className: "class",
                variants: [{
                    beginKeywords: "enum",
                    illegal: /[($"]/
                }, {
                    beginKeywords: "class interface trait",
                    illegal: /[:($"]/
                }],
                relevance: 0,
                end: /\{/,
                excludeEnd: !0,
                contains: [{
                    beginKeywords: "extends implements"
                }, e.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "namespace",
                relevance: 0,
                end: ";",
                illegal: /[.']/,
                contains: [e.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "use",
                relevance: 0,
                end: ";",
                contains: [e.UNDERSCORE_TITLE_MODE]
            }, l, s]
        }
    }
}
)());
hljs.registerLanguage("stata", (()=>{
    "use strict";
    return e=>({
        name: "Stata",
        aliases: ["do", "ado"],
        case_insensitive: !0,
        keywords: "if else in foreach for forv forva forval forvalu forvalue forvalues by bys bysort xi quietly qui capture about ac ac_7 acprplot acprplot_7 adjust ado adopath adoupdate alpha ameans an ano anov anova anova_estat anova_terms anovadef aorder ap app appe appen append arch arch_dr arch_estat arch_p archlm areg areg_p args arima arima_dr arima_estat arima_p as asmprobit asmprobit_estat asmprobit_lf asmprobit_mfx__dlg asmprobit_p ass asse asser assert avplot avplot_7 avplots avplots_7 bcskew0 bgodfrey bias binreg bip0_lf biplot bipp_lf bipr_lf bipr_p biprobit bitest bitesti bitowt blogit bmemsize boot bootsamp bootstrap bootstrap_8 boxco_l boxco_p boxcox boxcox_6 boxcox_p bprobit br break brier bro brow brows browse brr brrstat bs bs_7 bsampl_w bsample bsample_7 bsqreg bstat bstat_7 bstat_8 bstrap bstrap_7 bubble bubbleplot ca ca_estat ca_p cabiplot camat canon canon_8 canon_8_p canon_estat canon_p cap caprojection capt captu captur capture cat cc cchart cchart_7 cci cd censobs_table centile cf char chdir checkdlgfiles checkestimationsample checkhlpfiles checksum chelp ci cii cl class classutil clear cli clis clist clo clog clog_lf clog_p clogi clogi_sw clogit clogit_lf clogit_p clogitp clogl_sw cloglog clonevar clslistarray cluster cluster_measures cluster_stop cluster_tree cluster_tree_8 clustermat cmdlog cnr cnre cnreg cnreg_p cnreg_sw cnsreg codebook collaps4 collapse colormult_nb colormult_nw compare compress conf confi confir confirm conren cons const constr constra constrai constrain constraint continue contract copy copyright copysource cor corc corr corr2data corr_anti corr_kmo corr_smc corre correl correla correlat correlate corrgram cou coun count cox cox_p cox_sw coxbase coxhaz coxvar cprplot cprplot_7 crc cret cretu cretur creturn cross cs cscript cscript_log csi ct ct_is ctset ctst_5 ctst_st cttost cumsp cumsp_7 cumul cusum cusum_7 cutil d|0 datasig datasign datasigna datasignat datasignatu datasignatur datasignature datetof db dbeta de dec deco decod decode deff des desc descr descri describ describe destring dfbeta dfgls dfuller di di_g dir dirstats dis discard disp disp_res disp_s displ displa display distinct do doe doed doedi doedit dotplot dotplot_7 dprobit drawnorm drop ds ds_util dstdize duplicates durbina dwstat dydx e|0 ed edi edit egen eivreg emdef en enc enco encod encode eq erase ereg ereg_lf ereg_p ereg_sw ereghet ereghet_glf ereghet_glf_sh ereghet_gp ereghet_ilf ereghet_ilf_sh ereghet_ip eret eretu eretur ereturn err erro error esize est est_cfexist est_cfname est_clickable est_expand est_hold est_table est_unhold est_unholdok estat estat_default estat_summ estat_vce_only esti estimates etodow etof etomdy ex exi exit expand expandcl fac fact facto factor factor_estat factor_p factor_pca_rotated factor_rotate factormat fcast fcast_compute fcast_graph fdades fdadesc fdadescr fdadescri fdadescrib fdadescribe fdasav fdasave fdause fh_st file open file read file close file filefilter fillin find_hlp_file findfile findit findit_7 fit fl fli flis flist for5_0 forest forestplot form forma format fpredict frac_154 frac_adj frac_chk frac_cox frac_ddp frac_dis frac_dv frac_in frac_mun frac_pp frac_pq frac_pv frac_wgt frac_xo fracgen fracplot fracplot_7 fracpoly fracpred fron_ex fron_hn fron_p fron_tn fron_tn2 frontier ftodate ftoe ftomdy ftowdate funnel funnelplot g|0 gamhet_glf gamhet_gp gamhet_ilf gamhet_ip gamma gamma_d2 gamma_p gamma_sw gammahet gdi_hexagon gdi_spokes ge gen gene gener genera generat generate genrank genstd genvmean gettoken gl gladder gladder_7 glim_l01 glim_l02 glim_l03 glim_l04 glim_l05 glim_l06 glim_l07 glim_l08 glim_l09 glim_l10 glim_l11 glim_l12 glim_lf glim_mu glim_nw1 glim_nw2 glim_nw3 glim_p glim_v1 glim_v2 glim_v3 glim_v4 glim_v5 glim_v6 glim_v7 glm glm_6 glm_p glm_sw glmpred glo glob globa global glogit glogit_8 glogit_p gmeans gnbre_lf gnbreg gnbreg_5 gnbreg_p gomp_lf gompe_sw gomper_p gompertz gompertzhet gomphet_glf gomphet_glf_sh gomphet_gp gomphet_ilf gomphet_ilf_sh gomphet_ip gphdot gphpen gphprint gprefs gprobi_p gprobit gprobit_8 gr gr7 gr_copy gr_current gr_db gr_describe gr_dir gr_draw gr_draw_replay gr_drop gr_edit gr_editviewopts gr_example gr_example2 gr_export gr_print gr_qscheme gr_query gr_read gr_rename gr_replay gr_save gr_set gr_setscheme gr_table gr_undo gr_use graph graph7 grebar greigen greigen_7 greigen_8 grmeanby grmeanby_7 gs_fileinfo gs_filetype gs_graphinfo gs_stat gsort gwood h|0 hadimvo hareg hausman haver he heck_d2 heckma_p heckman heckp_lf heckpr_p heckprob hel help hereg hetpr_lf hetpr_p hetprob hettest hexdump hilite hist hist_7 histogram hlogit hlu hmeans hotel hotelling hprobit hreg hsearch icd9 icd9_ff icd9p iis impute imtest inbase include inf infi infil infile infix inp inpu input ins insheet insp inspe inspec inspect integ inten intreg intreg_7 intreg_p intrg2_ll intrg_ll intrg_ll2 ipolate iqreg ir irf irf_create irfm iri is_svy is_svysum isid istdize ivprob_1_lf ivprob_lf ivprobit ivprobit_p ivreg ivreg_footnote ivtob_1_lf ivtob_lf ivtobit ivtobit_p jackknife jacknife jknife jknife_6 jknife_8 jkstat joinby kalarma1 kap kap_3 kapmeier kappa kapwgt kdensity kdensity_7 keep ksm ksmirnov ktau kwallis l|0 la lab labbe labbeplot labe label labelbook ladder levels levelsof leverage lfit lfit_p li lincom line linktest lis list lloghet_glf lloghet_glf_sh lloghet_gp lloghet_ilf lloghet_ilf_sh lloghet_ip llogi_sw llogis_p llogist llogistic llogistichet lnorm_lf lnorm_sw lnorma_p lnormal lnormalhet lnormhet_glf lnormhet_glf_sh lnormhet_gp lnormhet_ilf lnormhet_ilf_sh lnormhet_ip lnskew0 loadingplot loc loca local log logi logis_lf logistic logistic_p logit logit_estat logit_p loglogs logrank loneway lookfor lookup lowess lowess_7 lpredict lrecomp lroc lroc_7 lrtest ls lsens lsens_7 lsens_x lstat ltable ltable_7 ltriang lv lvr2plot lvr2plot_7 m|0 ma mac macr macro makecns man manova manova_estat manova_p manovatest mantel mark markin markout marksample mat mat_capp mat_order mat_put_rr mat_rapp mata mata_clear mata_describe mata_drop mata_matdescribe mata_matsave mata_matuse mata_memory mata_mlib mata_mosave mata_rename mata_which matalabel matcproc matlist matname matr matri matrix matrix_input__dlg matstrik mcc mcci md0_ md1_ md1debug_ md2_ md2debug_ mds mds_estat mds_p mdsconfig mdslong mdsmat mdsshepard mdytoe mdytof me_derd mean means median memory memsize menl meqparse mer merg merge meta mfp mfx mhelp mhodds minbound mixed_ll mixed_ll_reparm mkassert mkdir mkmat mkspline ml ml_5 ml_adjs ml_bhhhs ml_c_d ml_check ml_clear ml_cnt ml_debug ml_defd ml_e0 ml_e0_bfgs ml_e0_cycle ml_e0_dfp ml_e0i ml_e1 ml_e1_bfgs ml_e1_bhhh ml_e1_cycle ml_e1_dfp ml_e2 ml_e2_cycle ml_ebfg0 ml_ebfr0 ml_ebfr1 ml_ebh0q ml_ebhh0 ml_ebhr0 ml_ebr0i ml_ecr0i ml_edfp0 ml_edfr0 ml_edfr1 ml_edr0i ml_eds ml_eer0i ml_egr0i ml_elf ml_elf_bfgs ml_elf_bhhh ml_elf_cycle ml_elf_dfp ml_elfi ml_elfs ml_enr0i ml_enrr0 ml_erdu0 ml_erdu0_bfgs ml_erdu0_bhhh ml_erdu0_bhhhq ml_erdu0_cycle ml_erdu0_dfp ml_erdu0_nrbfgs ml_exde ml_footnote ml_geqnr ml_grad0 ml_graph ml_hbhhh ml_hd0 ml_hold ml_init ml_inv ml_log ml_max ml_mlout ml_mlout_8 ml_model ml_nb0 ml_opt ml_p ml_plot ml_query ml_rdgrd ml_repor ml_s_e ml_score ml_searc ml_technique ml_unhold mleval mlf_ mlmatbysum mlmatsum mlog mlogi mlogit mlogit_footnote mlogit_p mlopts mlsum mlvecsum mnl0_ mor more mov move mprobit mprobit_lf mprobit_p mrdu0_ mrdu1_ mvdecode mvencode mvreg mvreg_estat n|0 nbreg nbreg_al nbreg_lf nbreg_p nbreg_sw nestreg net newey newey_7 newey_p news nl nl_7 nl_9 nl_9_p nl_p nl_p_7 nlcom nlcom_p nlexp2 nlexp2_7 nlexp2a nlexp2a_7 nlexp3 nlexp3_7 nlgom3 nlgom3_7 nlgom4 nlgom4_7 nlinit nllog3 nllog3_7 nllog4 nllog4_7 nlog_rd nlogit nlogit_p nlogitgen nlogittree nlpred no nobreak noi nois noisi noisil noisily note notes notes_dlg nptrend numlabel numlist odbc old_ver olo olog ologi ologi_sw ologit ologit_p ologitp on one onew onewa oneway op_colnm op_comp op_diff op_inv op_str opr opro oprob oprob_sw oprobi oprobi_p oprobit oprobitp opts_exclusive order orthog orthpoly ou out outf outfi outfil outfile outs outsh outshe outshee outsheet ovtest pac pac_7 palette parse parse_dissim pause pca pca_8 pca_display pca_estat pca_p pca_rotate pcamat pchart pchart_7 pchi pchi_7 pcorr pctile pentium pergram pergram_7 permute permute_8 personal peto_st pkcollapse pkcross pkequiv pkexamine pkexamine_7 pkshape pksumm pksumm_7 pl plo plot plugin pnorm pnorm_7 poisgof poiss_lf poiss_sw poisso_p poisson poisson_estat post postclose postfile postutil pperron pr prais prais_e prais_e2 prais_p predict predictnl preserve print pro prob probi probit probit_estat probit_p proc_time procoverlay procrustes procrustes_estat procrustes_p profiler prog progr progra program prop proportion prtest prtesti pwcorr pwd q\\s qby qbys qchi qchi_7 qladder qladder_7 qnorm qnorm_7 qqplot qqplot_7 qreg qreg_c qreg_p qreg_sw qu quadchk quantile quantile_7 que quer query range ranksum ratio rchart rchart_7 rcof recast reclink recode reg reg3 reg3_p regdw regr regre regre_p2 regres regres_p regress regress_estat regriv_p remap ren rena renam rename renpfix repeat replace report reshape restore ret retu retur return rm rmdir robvar roccomp roccomp_7 roccomp_8 rocf_lf rocfit rocfit_8 rocgold rocplot rocplot_7 roctab roctab_7 rolling rologit rologit_p rot rota rotat rotate rotatemat rreg rreg_p ru run runtest rvfplot rvfplot_7 rvpplot rvpplot_7 sa safesum sample sampsi sav save savedresults saveold sc sca scal scala scalar scatter scm_mine sco scob_lf scob_p scobi_sw scobit scor score scoreplot scoreplot_help scree screeplot screeplot_help sdtest sdtesti se search separate seperate serrbar serrbar_7 serset set set_defaults sfrancia sh she shel shell shewhart shewhart_7 signestimationsample signrank signtest simul simul_7 simulate simulate_8 sktest sleep slogit slogit_d2 slogit_p smooth snapspan so sor sort spearman spikeplot spikeplot_7 spikeplt spline_x split sqreg sqreg_p sret sretu sretur sreturn ssc st st_ct st_hc st_hcd st_hcd_sh st_is st_issys st_note st_promo st_set st_show st_smpl st_subid stack statsby statsby_8 stbase stci stci_7 stcox stcox_estat stcox_fr stcox_fr_ll stcox_p stcox_sw stcoxkm stcoxkm_7 stcstat stcurv stcurve stcurve_7 stdes stem stepwise stereg stfill stgen stir stjoin stmc stmh stphplot stphplot_7 stphtest stphtest_7 stptime strate strate_7 streg streg_sw streset sts sts_7 stset stsplit stsum sttocc sttoct stvary stweib su suest suest_8 sum summ summa summar summari summariz summarize sunflower sureg survcurv survsum svar svar_p svmat svy svy_disp svy_dreg svy_est svy_est_7 svy_estat svy_get svy_gnbreg_p svy_head svy_header svy_heckman_p svy_heckprob_p svy_intreg_p svy_ivreg_p svy_logistic_p svy_logit_p svy_mlogit_p svy_nbreg_p svy_ologit_p svy_oprobit_p svy_poisson_p svy_probit_p svy_regress_p svy_sub svy_sub_7 svy_x svy_x_7 svy_x_p svydes svydes_8 svygen svygnbreg svyheckman svyheckprob svyintreg svyintreg_7 svyintrg svyivreg svylc svylog_p svylogit svymarkout svymarkout_8 svymean svymlog svymlogit svynbreg svyolog svyologit svyoprob svyoprobit svyopts svypois svypois_7 svypoisson svyprobit svyprobt svyprop svyprop_7 svyratio svyreg svyreg_p svyregress svyset svyset_7 svyset_8 svytab svytab_7 svytest svytotal sw sw_8 swcnreg swcox swereg swilk swlogis swlogit swologit swoprbt swpois swprobit swqreg swtobit swweib symmetry symmi symplot symplot_7 syntax sysdescribe sysdir sysuse szroeter ta tab tab1 tab2 tab_or tabd tabdi tabdis tabdisp tabi table tabodds tabodds_7 tabstat tabu tabul tabula tabulat tabulate te tempfile tempname tempvar tes test testnl testparm teststd tetrachoric time_it timer tis tob tobi tobit tobit_p tobit_sw token tokeni tokeniz tokenize tostring total translate translator transmap treat_ll treatr_p treatreg trim trimfill trnb_cons trnb_mean trpoiss_d2 trunc_ll truncr_p truncreg tsappend tset tsfill tsline tsline_ex tsreport tsrevar tsrline tsset tssmooth tsunab ttest ttesti tut_chk tut_wait tutorial tw tware_st two twoway twoway__fpfit_serset twoway__function_gen twoway__histogram_gen twoway__ipoint_serset twoway__ipoints_serset twoway__kdensity_gen twoway__lfit_serset twoway__normgen_gen twoway__pci_serset twoway__qfit_serset twoway__scatteri_serset twoway__sunflower_gen twoway_ksm_serset ty typ type typeof u|0 unab unabbrev unabcmd update us use uselabel var var_mkcompanion var_p varbasic varfcast vargranger varirf varirf_add varirf_cgraph varirf_create varirf_ctable varirf_describe varirf_dir varirf_drop varirf_erase varirf_graph varirf_ograph varirf_rename varirf_set varirf_table varlist varlmar varnorm varsoc varstable varstable_w varstable_w2 varwle vce vec vec_fevd vec_mkphi vec_p vec_p_w vecirf_create veclmar veclmar_w vecnorm vecnorm_w vecrank vecstable verinst vers versi versio version view viewsource vif vwls wdatetof webdescribe webseek webuse weib1_lf weib2_lf weib_lf weib_lf0 weibhet_glf weibhet_glf_sh weibhet_glfa weibhet_glfa_sh weibhet_gp weibhet_ilf weibhet_ilf_sh weibhet_ilfa weibhet_ilfa_sh weibhet_ip weibu_sw weibul_p weibull weibull_c weibull_s weibullhet wh whelp whi which whil while wilc_st wilcoxon win wind windo window winexec wntestb wntestb_7 wntestq xchart xchart_7 xcorr xcorr_7 xi xi_6 xmlsav xmlsave xmluse xpose xsh xshe xshel xshell xt_iis xt_tis xtab_p xtabond xtbin_p xtclog xtcloglog xtcloglog_8 xtcloglog_d2 xtcloglog_pa_p xtcloglog_re_p xtcnt_p xtcorr xtdata xtdes xtfront_p xtfrontier xtgee xtgee_elink xtgee_estat xtgee_makeivar xtgee_p xtgee_plink xtgls xtgls_p xthaus xthausman xtht_p xthtaylor xtile xtint_p xtintreg xtintreg_8 xtintreg_d2 xtintreg_p xtivp_1 xtivp_2 xtivreg xtline xtline_ex xtlogit xtlogit_8 xtlogit_d2 xtlogit_fe_p xtlogit_pa_p xtlogit_re_p xtmixed xtmixed_estat xtmixed_p xtnb_fe xtnb_lf xtnbreg xtnbreg_pa_p xtnbreg_refe_p xtpcse xtpcse_p xtpois xtpoisson xtpoisson_d2 xtpoisson_pa_p xtpoisson_refe_p xtpred xtprobit xtprobit_8 xtprobit_d2 xtprobit_re_p xtps_fe xtps_lf xtps_ren xtps_ren_8 xtrar_p xtrc xtrc_p xtrchh xtrefe_p xtreg xtreg_be xtreg_fe xtreg_ml xtreg_pa_p xtreg_re xtregar xtrere_p xtset xtsf_ll xtsf_llti xtsum xttab xttest0 xttobit xttobit_8 xttobit_p xttrans yx yxview__barlike_draw yxview_area_draw yxview_bar_draw yxview_dot_draw yxview_dropline_draw yxview_function_draw yxview_iarrow_draw yxview_ilabels_draw yxview_normal_draw yxview_pcarrow_draw yxview_pcbarrow_draw yxview_pccapsym_draw yxview_pcscatter_draw yxview_pcspike_draw yxview_rarea_draw yxview_rbar_draw yxview_rbarm_draw yxview_rcap_draw yxview_rcapsym_draw yxview_rconnected_draw yxview_rline_draw yxview_rscatter_draw yxview_rspike_draw yxview_spike_draw yxview_sunflower_draw zap_s zinb zinb_llf zinb_plf zip zip_llf zip_p zip_plf zt_ct_5 zt_hc_5 zt_hcd_5 zt_is_5 zt_iss_5 zt_sho_5 zt_smp_5 ztbase_5 ztcox_5 ztdes_5 ztereg_5 ztfill_5 ztgen_5 ztir_5 ztjoin_5 ztnb ztnb_p ztp ztp_p zts_5 ztset_5 ztspli_5 ztsum_5 zttoct_5 ztvary_5 ztweib_5",
        contains: [{
            className: "symbol",
            begin: /`[a-zA-Z0-9_]+'/
        }, {
            className: "variable",
            begin: /\$\{?[a-zA-Z0-9_]+\}?/
        }, {
            className: "string",
            variants: [{
                begin: '`"[^\r\n]*?"\''
            }, {
                begin: '"[^\r\n"]*"'
            }]
        }, {
            className: "built_in",
            variants: [{
                begin: "\\b(abs|acos|asin|atan|atan2|atanh|ceil|cloglog|comb|cos|digamma|exp|floor|invcloglog|invlogit|ln|lnfact|lnfactorial|lngamma|log|log10|max|min|mod|reldif|round|sign|sin|sqrt|sum|tan|tanh|trigamma|trunc|betaden|Binomial|binorm|binormal|chi2|chi2tail|dgammapda|dgammapdada|dgammapdadx|dgammapdx|dgammapdxdx|F|Fden|Ftail|gammaden|gammap|ibeta|invbinomial|invchi2|invchi2tail|invF|invFtail|invgammap|invibeta|invnchi2|invnFtail|invnibeta|invnorm|invnormal|invttail|nbetaden|nchi2|nFden|nFtail|nibeta|norm|normal|normalden|normd|npnchi2|tden|ttail|uniform|abbrev|char|index|indexnot|length|lower|ltrim|match|plural|proper|real|regexm|regexr|regexs|reverse|rtrim|string|strlen|strlower|strltrim|strmatch|strofreal|strpos|strproper|strreverse|strrtrim|strtrim|strupper|subinstr|subinword|substr|trim|upper|word|wordcount|_caller|autocode|byteorder|chop|clip|cond|e|epsdouble|epsfloat|group|inlist|inrange|irecode|matrix|maxbyte|maxdouble|maxfloat|maxint|maxlong|mi|minbyte|mindouble|minfloat|minint|minlong|missing|r|recode|replay|return|s|scalar|d|date|day|dow|doy|halfyear|mdy|month|quarter|week|year|d|daily|dofd|dofh|dofm|dofq|dofw|dofy|h|halfyearly|hofd|m|mofd|monthly|q|qofd|quarterly|tin|twithin|w|weekly|wofd|y|yearly|yh|ym|yofd|yq|yw|cholesky|colnumb|colsof|corr|det|diag|diag0cnt|el|get|hadamard|I|inv|invsym|issym|issymmetric|J|matmissing|matuniform|mreldif|nullmat|rownumb|rowsof|sweep|syminv|trace|vec|vecdiag)(?=\\()"
            }]
        }, e.COMMENT("^[ \t]*\\*.*$", !1), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
    })
}
)());
hljs.registerLanguage("typescript", (()=>{
    "use strict";
    const e = "[A-Za-z$_][0-9A-Za-z$_]*"
      , n = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"]
      , a = ["true", "false", "null", "undefined", "NaN", "Infinity"]
      , s = [].concat(["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"], ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]);
    function t(e) {
        return r("(?=", e, ")")
    }
    function r(...e) {
        return e.map((e=>{
            return (n = e) ? "string" == typeof n ? n : n.source : null;
            var n
        }
        )).join("")
    }
    return i=>{
        const c = {
            $pattern: e,
            keyword: n.concat(["type", "namespace", "typedef", "interface", "public", "private", "protected", "implements", "declare", "abstract", "readonly"]),
            literal: a,
            built_in: s.concat(["any", "void", "number", "boolean", "string", "object", "never", "enum"])
        }
          , o = {
            className: "meta",
            begin: "@[A-Za-z$_][0-9A-Za-z$_]*"
        }
          , l = (e,n,a)=>{
            const s = e.contains.findIndex((e=>e.label === n));
            if (-1 === s)
                throw Error("can not find mode to replace");
            e.contains.splice(s, 1, a)
        }
          , b = (i=>{
            const c = e
              , o = {
                begin: /<[A-Za-z0-9\\._:-]+/,
                end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
                isTrulyOpeningTag: (e,n)=>{
                    const a = e[0].length + e.index
                      , s = e.input[a];
                    "<" !== s ? ">" === s && (((e,{after: n})=>{
                        const a = "</" + e[0].slice(1);
                        return -1 !== e.input.indexOf(a, n)
                    }
                    )(e, {
                        after: a
                    }) || n.ignoreMatch()) : n.ignoreMatch()
                }
            }
              , l = {
                $pattern: e,
                keyword: n,
                literal: a,
                built_in: s
            }
              , b = "\\.([0-9](_?[0-9])*)"
              , d = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*"
              , g = {
                className: "number",
                variants: [{
                    begin: `(\\b(${d})((${b})|\\.)?|(${b}))[eE][+-]?([0-9](_?[0-9])*)\\b`
                }, {
                    begin: `\\b(${d})\\b((${b})\\b|\\.)?|(${b})\\b`
                }, {
                    begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
                }, {
                    begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
                }, {
                    begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
                }, {
                    begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
                }, {
                    begin: "\\b0[0-7]+n?\\b"
                }],
                relevance: 0
            }
              , u = {
                className: "subst",
                begin: "\\$\\{",
                end: "\\}",
                keywords: l,
                contains: []
            }
              , E = {
                begin: "html`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [i.BACKSLASH_ESCAPE, u],
                    subLanguage: "xml"
                }
            }
              , m = {
                begin: "css`",
                end: "",
                starts: {
                    end: "`",
                    returnEnd: !1,
                    contains: [i.BACKSLASH_ESCAPE, u],
                    subLanguage: "css"
                }
            }
              , y = {
                className: "string",
                begin: "`",
                end: "`",
                contains: [i.BACKSLASH_ESCAPE, u]
            }
              , _ = {
                className: "comment",
                variants: [i.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
                    relevance: 0,
                    contains: [{
                        className: "doctag",
                        begin: "@[A-Za-z]+",
                        contains: [{
                            className: "type",
                            begin: "\\{",
                            end: "\\}",
                            relevance: 0
                        }, {
                            className: "variable",
                            begin: c + "(?=\\s*(-)|$)",
                            endsParent: !0,
                            relevance: 0
                        }, {
                            begin: /(?=[^\n])\s/,
                            relevance: 0
                        }]
                    }]
                }), i.C_BLOCK_COMMENT_MODE, i.C_LINE_COMMENT_MODE]
            }
              , p = [i.APOS_STRING_MODE, i.QUOTE_STRING_MODE, E, m, y, g, i.REGEXP_MODE];
            u.contains = p.concat({
                begin: /\{/,
                end: /\}/,
                keywords: l,
                contains: ["self"].concat(p)
            });
            const N = [].concat(_, u.contains)
              , f = N.concat([{
                begin: /\(/,
                end: /\)/,
                keywords: l,
                contains: ["self"].concat(N)
            }])
              , A = {
                className: "params",
                begin: /\(/,
                end: /\)/,
                excludeBegin: !0,
                excludeEnd: !0,
                keywords: l,
                contains: f
            };
            return {
                name: "Javascript",
                aliases: ["js", "jsx", "mjs", "cjs"],
                keywords: l,
                exports: {
                    PARAMS_CONTAINS: f
                },
                illegal: /#(?![$_A-z])/,
                contains: [i.SHEBANG({
                    label: "shebang",
                    binary: "node",
                    relevance: 5
                }), {
                    label: "use_strict",
                    className: "meta",
                    relevance: 10,
                    begin: /^\s*['"]use (strict|asm)['"]/
                }, i.APOS_STRING_MODE, i.QUOTE_STRING_MODE, E, m, y, _, g, {
                    begin: r(/[{,\n]\s*/, t(r(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c + "\\s*:"))),
                    relevance: 0,
                    contains: [{
                        className: "attr",
                        begin: c + t("\\s*:"),
                        relevance: 0
                    }]
                }, {
                    begin: "(" + i.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                    keywords: "return throw case",
                    contains: [_, i.REGEXP_MODE, {
                        className: "function",
                        begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + i.UNDERSCORE_IDENT_RE + ")\\s*=>",
                        returnBegin: !0,
                        end: "\\s*=>",
                        contains: [{
                            className: "params",
                            variants: [{
                                begin: i.UNDERSCORE_IDENT_RE,
                                relevance: 0
                            }, {
                                className: null,
                                begin: /\(\s*\)/,
                                skip: !0
                            }, {
                                begin: /\(/,
                                end: /\)/,
                                excludeBegin: !0,
                                excludeEnd: !0,
                                keywords: l,
                                contains: f
                            }]
                        }]
                    }, {
                        begin: /,/,
                        relevance: 0
                    }, {
                        className: "",
                        begin: /\s/,
                        end: /\s*/,
                        skip: !0
                    }, {
                        variants: [{
                            begin: "<>",
                            end: "</>"
                        }, {
                            begin: o.begin,
                            "on:begin": o.isTrulyOpeningTag,
                            end: o.end
                        }],
                        subLanguage: "xml",
                        contains: [{
                            begin: o.begin,
                            end: o.end,
                            skip: !0,
                            contains: ["self"]
                        }]
                    }],
                    relevance: 0
                }, {
                    className: "function",
                    beginKeywords: "function",
                    end: /[{;]/,
                    excludeEnd: !0,
                    keywords: l,
                    contains: ["self", i.inherit(i.TITLE_MODE, {
                        begin: c
                    }), A],
                    illegal: /%/
                }, {
                    beginKeywords: "while if switch catch for"
                }, {
                    className: "function",
                    begin: i.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
                    returnBegin: !0,
                    contains: [A, i.inherit(i.TITLE_MODE, {
                        begin: c
                    })]
                }, {
                    variants: [{
                        begin: "\\." + c
                    }, {
                        begin: "\\$" + c
                    }],
                    relevance: 0
                }, {
                    className: "class",
                    beginKeywords: "class",
                    end: /[{;=]/,
                    excludeEnd: !0,
                    illegal: /[:"[\]]/,
                    contains: [{
                        beginKeywords: "extends"
                    }, i.UNDERSCORE_TITLE_MODE]
                }, {
                    begin: /\b(?=constructor)/,
                    end: /[{;]/,
                    excludeEnd: !0,
                    contains: [i.inherit(i.TITLE_MODE, {
                        begin: c
                    }), "self", A]
                }, {
                    begin: "(get|set)\\s+(?=" + c + "\\()",
                    end: /\{/,
                    keywords: "get set",
                    contains: [i.inherit(i.TITLE_MODE, {
                        begin: c
                    }), {
                        begin: /\(\)/
                    }, A]
                }, {
                    begin: /\$[(.]/
                }]
            }
        }
        )(i);
        return Object.assign(b.keywords, c),
        b.exports.PARAMS_CONTAINS.push(o),
        b.contains = b.contains.concat([o, {
            beginKeywords: "namespace",
            end: /\{/,
            excludeEnd: !0
        }, {
            beginKeywords: "interface",
            end: /\{/,
            excludeEnd: !0,
            keywords: "interface extends"
        }]),
        l(b, "shebang", i.SHEBANG()),
        l(b, "use_strict", {
            className: "meta",
            relevance: 10,
            begin: /^\s*['"]use strict['"]/
        }),
        b.contains.find((e=>"function" === e.className)).relevance = 0,
        Object.assign(b, {
            name: "TypeScript",
            aliases: ["ts", "tsx"]
        }),
        b
    }
}
)());
hljs.registerLanguage("vbnet", (()=>{
    "use strict";
    function e(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    function n(...n) {
        return n.map((n=>e(n))).join("")
    }
    function t(...n) {
        return "(" + n.map((n=>e(n))).join("|") + ")"
    }
    return e=>{
        const a = /\d{1,2}\/\d{1,2}\/\d{4}/
          , i = /\d{4}-\d{1,2}-\d{1,2}/
          , s = /(\d|1[012])(:\d+){0,2} *(AM|PM)/
          , r = /\d{1,2}(:\d{1,2}){1,2}/
          , o = {
            className: "literal",
            variants: [{
                begin: n(/# */, t(i, a), / *#/)
            }, {
                begin: n(/# */, r, / *#/)
            }, {
                begin: n(/# */, s, / *#/)
            }, {
                begin: n(/# */, t(i, a), / +/, t(s, r), / *#/)
            }]
        }
          , l = e.COMMENT(/'''/, /$/, {
            contains: [{
                className: "doctag",
                begin: /<\/?/,
                end: />/
            }]
        })
          , c = e.COMMENT(null, /$/, {
            variants: [{
                begin: /'/
            }, {
                begin: /([\t ]|^)REM(?=\s)/
            }]
        });
        return {
            name: "Visual Basic .NET",
            aliases: ["vb"],
            case_insensitive: !0,
            classNameAliases: {
                label: "symbol"
            },
            keywords: {
                keyword: "addhandler alias aggregate ansi as async assembly auto binary by byref byval call case catch class compare const continue custom declare default delegate dim distinct do each equals else elseif end enum erase error event exit explicit finally for friend from function get global goto group handles if implements imports in inherits interface into iterator join key let lib loop me mid module mustinherit mustoverride mybase myclass namespace narrowing new next notinheritable notoverridable of off on operator option optional order overloads overridable overrides paramarray partial preserve private property protected public raiseevent readonly redim removehandler resume return select set shadows shared skip static step stop structure strict sub synclock take text then throw to try unicode until using when where while widening with withevents writeonly yield",
                built_in: "addressof and andalso await directcast gettype getxmlnamespace is isfalse isnot istrue like mod nameof new not or orelse trycast typeof xor cbool cbyte cchar cdate cdbl cdec cint clng cobj csbyte cshort csng cstr cuint culng cushort",
                type: "boolean byte char date decimal double integer long object sbyte short single string uinteger ulong ushort",
                literal: "true false nothing"
            },
            illegal: "//|\\{|\\}|endif|gosub|variant|wend|^\\$ ",
            contains: [{
                className: "string",
                begin: /"(""|[^/n])"C\b/
            }, {
                className: "string",
                begin: /"/,
                end: /"/,
                illegal: /\n/,
                contains: [{
                    begin: /""/
                }]
            }, o, {
                className: "number",
                relevance: 0,
                variants: [{
                    begin: /\b\d[\d_]*((\.[\d_]+(E[+-]?[\d_]+)?)|(E[+-]?[\d_]+))[RFD@!#]?/
                }, {
                    begin: /\b\d[\d_]*((U?[SIL])|[%&])?/
                }, {
                    begin: /&H[\dA-F_]+((U?[SIL])|[%&])?/
                }, {
                    begin: /&O[0-7_]+((U?[SIL])|[%&])?/
                }, {
                    begin: /&B[01_]+((U?[SIL])|[%&])?/
                }]
            }, {
                className: "label",
                begin: /^\w+:/
            }, l, c, {
                className: "meta",
                begin: /[\t ]*#(const|disable|else|elseif|enable|end|externalsource|if|region)\b/,
                end: /$/,
                keywords: {
                    "meta-keyword": "const disable else elseif enable end externalsource if region then"
                },
                contains: [c]
            }]
        }
    }
}
)());
hljs.registerLanguage("fortran", (()=>{
    "use strict";
    function e(...e) {
        return e.map((e=>{
            return (n = e) ? "string" == typeof n ? n : n.source : null;
            var n
        }
        )).join("")
    }
    return n=>{
        const a = {
            variants: [n.COMMENT("!", "$", {
                relevance: 0
            }), n.COMMENT("^C[ ]", "$", {
                relevance: 0
            }), n.COMMENT("^C$", "$", {
                relevance: 0
            })]
        }
          , t = /(_[a-z_\d]+)?/
          , i = /([de][+-]?\d+)?/
          , c = {
            className: "number",
            variants: [{
                begin: e(/\b\d+/, /\.(\d*)/, i, t)
            }, {
                begin: e(/\b\d+/, i, t)
            }, {
                begin: e(/\.\d+/, i, t)
            }],
            relevance: 0
        }
          , o = {
            className: "function",
            beginKeywords: "subroutine function program",
            illegal: "[${=\\n]",
            contains: [n.UNDERSCORE_TITLE_MODE, {
                className: "params",
                begin: "\\(",
                end: "\\)"
            }]
        };
        return {
            name: "Fortran",
            case_insensitive: !0,
            aliases: ["f90", "f95"],
            keywords: {
                literal: ".False. .True.",
                keyword: "kind do concurrent local shared while private call intrinsic where elsewhere type endtype endmodule endselect endinterface end enddo endif if forall endforall only contains default return stop then block endblock endassociate public subroutine|10 function program .and. .or. .not. .le. .eq. .ge. .gt. .lt. goto save else use module select case access blank direct exist file fmt form formatted iostat name named nextrec number opened rec recl sequential status unformatted unit continue format pause cycle exit c_null_char c_alert c_backspace c_form_feed flush wait decimal round iomsg synchronous nopass non_overridable pass protected volatile abstract extends import non_intrinsic value deferred generic final enumerator class associate bind enum c_int c_short c_long c_long_long c_signed_char c_size_t c_int8_t c_int16_t c_int32_t c_int64_t c_int_least8_t c_int_least16_t c_int_least32_t c_int_least64_t c_int_fast8_t c_int_fast16_t c_int_fast32_t c_int_fast64_t c_intmax_t C_intptr_t c_float c_double c_long_double c_float_complex c_double_complex c_long_double_complex c_bool c_char c_null_ptr c_null_funptr c_new_line c_carriage_return c_horizontal_tab c_vertical_tab iso_c_binding c_loc c_funloc c_associated  c_f_pointer c_ptr c_funptr iso_fortran_env character_storage_size error_unit file_storage_size input_unit iostat_end iostat_eor numeric_storage_size output_unit c_f_procpointer ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode newunit contiguous recursive pad position action delim readwrite eor advance nml interface procedure namelist include sequence elemental pure impure integer real character complex logical codimension dimension allocatable|10 parameter external implicit|10 none double precision assign intent optional pointer target in out common equivalence data",
                built_in: "alog alog10 amax0 amax1 amin0 amin1 amod cabs ccos cexp clog csin csqrt dabs dacos dasin datan datan2 dcos dcosh ddim dexp dint dlog dlog10 dmax1 dmin1 dmod dnint dsign dsin dsinh dsqrt dtan dtanh float iabs idim idint idnint ifix isign max0 max1 min0 min1 sngl algama cdabs cdcos cdexp cdlog cdsin cdsqrt cqabs cqcos cqexp cqlog cqsin cqsqrt dcmplx dconjg derf derfc dfloat dgamma dimag dlgama iqint qabs qacos qasin qatan qatan2 qcmplx qconjg qcos qcosh qdim qerf qerfc qexp qgamma qimag qlgama qlog qlog10 qmax1 qmin1 qmod qnint qsign qsin qsinh qsqrt qtan qtanh abs acos aimag aint anint asin atan atan2 char cmplx conjg cos cosh exp ichar index int log log10 max min nint sign sin sinh sqrt tan tanh print write dim lge lgt lle llt mod nullify allocate deallocate adjustl adjustr all allocated any associated bit_size btest ceiling count cshift date_and_time digits dot_product eoshift epsilon exponent floor fraction huge iand ibclr ibits ibset ieor ior ishft ishftc lbound len_trim matmul maxexponent maxloc maxval merge minexponent minloc minval modulo mvbits nearest pack present product radix random_number random_seed range repeat reshape rrspacing scale scan selected_int_kind selected_real_kind set_exponent shape size spacing spread sum system_clock tiny transpose trim ubound unpack verify achar iachar transfer dble entry dprod cpu_time command_argument_count get_command get_command_argument get_environment_variable is_iostat_end ieee_arithmetic ieee_support_underflow_control ieee_get_underflow_mode ieee_set_underflow_mode is_iostat_eor move_alloc new_line selected_char_kind same_type_as extends_type_of acosh asinh atanh bessel_j0 bessel_j1 bessel_jn bessel_y0 bessel_y1 bessel_yn erf erfc erfc_scaled gamma log_gamma hypot norm2 atomic_define atomic_ref execute_command_line leadz trailz storage_size merge_bits bge bgt ble blt dshiftl dshiftr findloc iall iany iparity image_index lcobound ucobound maskl maskr num_images parity popcnt poppar shifta shiftl shiftr this_image sync change team co_broadcast co_max co_min co_sum co_reduce"
            },
            illegal: /\/\*/,
            contains: [{
                className: "string",
                relevance: 0,
                variants: [n.APOS_STRING_MODE, n.QUOTE_STRING_MODE]
            }, o, {
                begin: /^C\s*=(?!=)/,
                relevance: 0
            }, a, c]
        }
    }
}
)());
hljs.registerLanguage("kotlin", (()=>{
    "use strict";
    var e = "\\.([0-9](_*[0-9])*)"
      , n = "[0-9a-fA-F](_*[0-9a-fA-F])*"
      , a = {
        className: "number",
        variants: [{
            begin: `(\\b([0-9](_*[0-9])*)((${e})|\\.)?|(${e}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
        }, {
            begin: `\\b([0-9](_*[0-9])*)((${e})[fFdD]?\\b|\\.([fFdD]\\b)?)`
        }, {
            begin: `(${e})[fFdD]?\\b`
        }, {
            begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b"
        }, {
            begin: `\\b0[xX]((${n})\\.?|(${n})?\\.(${n}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
        }, {
            begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
        }, {
            begin: `\\b0[xX](${n})[lL]?\\b`
        }, {
            begin: "\\b0(_*[0-7])*[lL]?\\b"
        }, {
            begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
        }],
        relevance: 0
    };
    return e=>{
        const n = {
            keyword: "abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",
            built_in: "Byte Short Char Int Long Boolean Float Double Void Unit Nothing",
            literal: "true false null"
        }
          , i = {
            className: "symbol",
            begin: e.UNDERSCORE_IDENT_RE + "@"
        }
          , s = {
            className: "subst",
            begin: /\$\{/,
            end: /\}/,
            contains: [e.C_NUMBER_MODE]
        }
          , t = {
            className: "variable",
            begin: "\\$" + e.UNDERSCORE_IDENT_RE
        }
          , r = {
            className: "string",
            variants: [{
                begin: '"""',
                end: '"""(?=[^"])',
                contains: [t, s]
            }, {
                begin: "'",
                end: "'",
                illegal: /\n/,
                contains: [e.BACKSLASH_ESCAPE]
            }, {
                begin: '"',
                end: '"',
                illegal: /\n/,
                contains: [e.BACKSLASH_ESCAPE, t, s]
            }]
        };
        s.contains.push(r);
        const l = {
            className: "meta",
            begin: "@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*" + e.UNDERSCORE_IDENT_RE + ")?"
        }
          , c = {
            className: "meta",
            begin: "@" + e.UNDERSCORE_IDENT_RE,
            contains: [{
                begin: /\(/,
                end: /\)/,
                contains: [e.inherit(r, {
                    className: "meta-string"
                })]
            }]
        }
          , o = a
          , b = e.COMMENT("/\\*", "\\*/", {
            contains: [e.C_BLOCK_COMMENT_MODE]
        })
          , E = {
            variants: [{
                className: "type",
                begin: e.UNDERSCORE_IDENT_RE
            }, {
                begin: /\(/,
                end: /\)/,
                contains: []
            }]
        }
          , d = E;
        return d.variants[1].contains = [E],
        E.variants[1].contains = [d],
        {
            name: "Kotlin",
            aliases: ["kt", "kts"],
            keywords: n,
            contains: [e.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                }]
            }), e.C_LINE_COMMENT_MODE, b, {
                className: "keyword",
                begin: /\b(break|continue|return|this)\b/,
                starts: {
                    contains: [{
                        className: "symbol",
                        begin: /@\w+/
                    }]
                }
            }, i, l, c, {
                className: "function",
                beginKeywords: "fun",
                end: "[(]|$",
                returnBegin: !0,
                excludeEnd: !0,
                keywords: n,
                relevance: 5,
                contains: [{
                    begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "type",
                    begin: /</,
                    end: />/,
                    keywords: "reified",
                    relevance: 0
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    endsParent: !0,
                    keywords: n,
                    relevance: 0,
                    contains: [{
                        begin: /:/,
                        end: /[=,\/]/,
                        endsWithParent: !0,
                        contains: [E, e.C_LINE_COMMENT_MODE, b],
                        relevance: 0
                    }, e.C_LINE_COMMENT_MODE, b, l, c, r, e.C_NUMBER_MODE]
                }, b]
            }, {
                className: "class",
                beginKeywords: "class interface trait",
                end: /[:\{(]|$/,
                excludeEnd: !0,
                illegal: "extends implements",
                contains: [{
                    beginKeywords: "public protected internal private constructor"
                }, e.UNDERSCORE_TITLE_MODE, {
                    className: "type",
                    begin: /</,
                    end: />/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    relevance: 0
                }, {
                    className: "type",
                    begin: /[,:]\s*/,
                    end: /[<\(,]|$/,
                    excludeBegin: !0,
                    returnEnd: !0
                }, l, c]
            }, r, {
                className: "meta",
                begin: "^#!/usr/bin/env",
                end: "$",
                illegal: "\n"
            }, o]
        }
    }
}
)());
hljs.registerLanguage("erb", (()=>{
    "use strict";
    return e=>({
        name: "ERB",
        subLanguage: "xml",
        contains: [e.COMMENT("<%#", "%>"), {
            begin: "<%[%=-]?",
            end: "[%-]?%>",
            subLanguage: "ruby",
            excludeBegin: !0,
            excludeEnd: !0
        }]
    })
}
)());
hljs.registerLanguage("mathematica", (()=>{
    "use strict";
    const e = ["AASTriangle", "AbelianGroup", "Abort", "AbortKernels", "AbortProtect", "AbortScheduledTask", "Above", "Abs", "AbsArg", "AbsArgPlot", "Absolute", "AbsoluteCorrelation", "AbsoluteCorrelationFunction", "AbsoluteCurrentValue", "AbsoluteDashing", "AbsoluteFileName", "AbsoluteOptions", "AbsolutePointSize", "AbsoluteThickness", "AbsoluteTime", "AbsoluteTiming", "AcceptanceThreshold", "AccountingForm", "Accumulate", "Accuracy", "AccuracyGoal", "ActionDelay", "ActionMenu", "ActionMenuBox", "ActionMenuBoxOptions", "Activate", "Active", "ActiveClassification", "ActiveClassificationObject", "ActiveItem", "ActivePrediction", "ActivePredictionObject", "ActiveStyle", "AcyclicGraphQ", "AddOnHelpPath", "AddSides", "AddTo", "AddToSearchIndex", "AddUsers", "AdjacencyGraph", "AdjacencyList", "AdjacencyMatrix", "AdjacentMeshCells", "AdjustmentBox", "AdjustmentBoxOptions", "AdjustTimeSeriesForecast", "AdministrativeDivisionData", "AffineHalfSpace", "AffineSpace", "AffineStateSpaceModel", "AffineTransform", "After", "AggregatedEntityClass", "AggregationLayer", "AircraftData", "AirportData", "AirPressureData", "AirTemperatureData", "AiryAi", "AiryAiPrime", "AiryAiZero", "AiryBi", "AiryBiPrime", "AiryBiZero", "AlgebraicIntegerQ", "AlgebraicNumber", "AlgebraicNumberDenominator", "AlgebraicNumberNorm", "AlgebraicNumberPolynomial", "AlgebraicNumberTrace", "AlgebraicRules", "AlgebraicRulesData", "Algebraics", "AlgebraicUnitQ", "Alignment", "AlignmentMarker", "AlignmentPoint", "All", "AllowAdultContent", "AllowedCloudExtraParameters", "AllowedCloudParameterExtensions", "AllowedDimensions", "AllowedFrequencyRange", "AllowedHeads", "AllowGroupClose", "AllowIncomplete", "AllowInlineCells", "AllowKernelInitialization", "AllowLooseGrammar", "AllowReverseGroupClose", "AllowScriptLevelChange", "AllowVersionUpdate", "AllTrue", "Alphabet", "AlphabeticOrder", "AlphabeticSort", "AlphaChannel", "AlternateImage", "AlternatingFactorial", "AlternatingGroup", "AlternativeHypothesis", "Alternatives", "AltitudeMethod", "AmbientLight", "AmbiguityFunction", "AmbiguityList", "Analytic", "AnatomyData", "AnatomyForm", "AnatomyPlot3D", "AnatomySkinStyle", "AnatomyStyling", "AnchoredSearch", "And", "AndersonDarlingTest", "AngerJ", "AngleBisector", "AngleBracket", "AnglePath", "AnglePath3D", "AngleVector", "AngularGauge", "Animate", "AnimationCycleOffset", "AnimationCycleRepetitions", "AnimationDirection", "AnimationDisplayTime", "AnimationRate", "AnimationRepetitions", "AnimationRunning", "AnimationRunTime", "AnimationTimeIndex", "Animator", "AnimatorBox", "AnimatorBoxOptions", "AnimatorElements", "Annotate", "Annotation", "AnnotationDelete", "AnnotationKeys", "AnnotationRules", "AnnotationValue", "Annuity", "AnnuityDue", "Annulus", "AnomalyDetection", "AnomalyDetector", "AnomalyDetectorFunction", "Anonymous", "Antialiasing", "AntihermitianMatrixQ", "Antisymmetric", "AntisymmetricMatrixQ", "Antonyms", "AnyOrder", "AnySubset", "AnyTrue", "Apart", "ApartSquareFree", "APIFunction", "Appearance", "AppearanceElements", "AppearanceRules", "AppellF1", "Append", "AppendCheck", "AppendLayer", "AppendTo", "Apply", "ApplySides", "ArcCos", "ArcCosh", "ArcCot", "ArcCoth", "ArcCsc", "ArcCsch", "ArcCurvature", "ARCHProcess", "ArcLength", "ArcSec", "ArcSech", "ArcSin", "ArcSinDistribution", "ArcSinh", "ArcTan", "ArcTanh", "Area", "Arg", "ArgMax", "ArgMin", "ArgumentCountQ", "ARIMAProcess", "ArithmeticGeometricMean", "ARMAProcess", "Around", "AroundReplace", "ARProcess", "Array", "ArrayComponents", "ArrayDepth", "ArrayFilter", "ArrayFlatten", "ArrayMesh", "ArrayPad", "ArrayPlot", "ArrayQ", "ArrayResample", "ArrayReshape", "ArrayRules", "Arrays", "Arrow", "Arrow3DBox", "ArrowBox", "Arrowheads", "ASATriangle", "Ask", "AskAppend", "AskConfirm", "AskDisplay", "AskedQ", "AskedValue", "AskFunction", "AskState", "AskTemplateDisplay", "AspectRatio", "AspectRatioFixed", "Assert", "AssociateTo", "Association", "AssociationFormat", "AssociationMap", "AssociationQ", "AssociationThread", "AssumeDeterministic", "Assuming", "Assumptions", "AstronomicalData", "Asymptotic", "AsymptoticDSolveValue", "AsymptoticEqual", "AsymptoticEquivalent", "AsymptoticGreater", "AsymptoticGreaterEqual", "AsymptoticIntegrate", "AsymptoticLess", "AsymptoticLessEqual", "AsymptoticOutputTracker", "AsymptoticProduct", "AsymptoticRSolveValue", "AsymptoticSolve", "AsymptoticSum", "Asynchronous", "AsynchronousTaskObject", "AsynchronousTasks", "Atom", "AtomCoordinates", "AtomCount", "AtomDiagramCoordinates", "AtomList", "AtomQ", "AttentionLayer", "Attributes", "Audio", "AudioAmplify", "AudioAnnotate", "AudioAnnotationLookup", "AudioBlockMap", "AudioCapture", "AudioChannelAssignment", "AudioChannelCombine", "AudioChannelMix", "AudioChannels", "AudioChannelSeparate", "AudioData", "AudioDelay", "AudioDelete", "AudioDevice", "AudioDistance", "AudioEncoding", "AudioFade", "AudioFrequencyShift", "AudioGenerator", "AudioIdentify", "AudioInputDevice", "AudioInsert", "AudioInstanceQ", "AudioIntervals", "AudioJoin", "AudioLabel", "AudioLength", "AudioLocalMeasurements", "AudioLooping", "AudioLoudness", "AudioMeasurements", "AudioNormalize", "AudioOutputDevice", "AudioOverlay", "AudioPad", "AudioPan", "AudioPartition", "AudioPause", "AudioPitchShift", "AudioPlay", "AudioPlot", "AudioQ", "AudioRecord", "AudioReplace", "AudioResample", "AudioReverb", "AudioReverse", "AudioSampleRate", "AudioSpectralMap", "AudioSpectralTransformation", "AudioSplit", "AudioStop", "AudioStream", "AudioStreams", "AudioTimeStretch", "AudioTracks", "AudioTrim", "AudioType", "AugmentedPolyhedron", "AugmentedSymmetricPolynomial", "Authenticate", "Authentication", "AuthenticationDialog", "AutoAction", "Autocomplete", "AutocompletionFunction", "AutoCopy", "AutocorrelationTest", "AutoDelete", "AutoEvaluateEvents", "AutoGeneratedPackage", "AutoIndent", "AutoIndentSpacings", "AutoItalicWords", "AutoloadPath", "AutoMatch", "Automatic", "AutomaticImageSize", "AutoMultiplicationSymbol", "AutoNumberFormatting", "AutoOpenNotebooks", "AutoOpenPalettes", "AutoQuoteCharacters", "AutoRefreshed", "AutoRemove", "AutorunSequencing", "AutoScaling", "AutoScroll", "AutoSpacing", "AutoStyleOptions", "AutoStyleWords", "AutoSubmitting", "Axes", "AxesEdge", "AxesLabel", "AxesOrigin", "AxesStyle", "AxiomaticTheory", "Axis", "BabyMonsterGroupB", "Back", "Background", "BackgroundAppearance", "BackgroundTasksSettings", "Backslash", "Backsubstitution", "Backward", "Ball", "Band", "BandpassFilter", "BandstopFilter", "BarabasiAlbertGraphDistribution", "BarChart", "BarChart3D", "BarcodeImage", "BarcodeRecognize", "BaringhausHenzeTest", "BarLegend", "BarlowProschanImportance", "BarnesG", "BarOrigin", "BarSpacing", "BartlettHannWindow", "BartlettWindow", "BaseDecode", "BaseEncode", "BaseForm", "Baseline", "BaselinePosition", "BaseStyle", "BasicRecurrentLayer", "BatchNormalizationLayer", "BatchSize", "BatesDistribution", "BattleLemarieWavelet", "BayesianMaximization", "BayesianMaximizationObject", "BayesianMinimization", "BayesianMinimizationObject", "Because", "BeckmannDistribution", "Beep", "Before", "Begin", "BeginDialogPacket", "BeginFrontEndInteractionPacket", "BeginPackage", "BellB", "BellY", "Below", "BenfordDistribution", "BeniniDistribution", "BenktanderGibratDistribution", "BenktanderWeibullDistribution", "BernoulliB", "BernoulliDistribution", "BernoulliGraphDistribution", "BernoulliProcess", "BernsteinBasis", "BesselFilterModel", "BesselI", "BesselJ", "BesselJZero", "BesselK", "BesselY", "BesselYZero", "Beta", "BetaBinomialDistribution", "BetaDistribution", "BetaNegativeBinomialDistribution", "BetaPrimeDistribution", "BetaRegularized", "Between", "BetweennessCentrality", "BeveledPolyhedron", "BezierCurve", "BezierCurve3DBox", "BezierCurve3DBoxOptions", "BezierCurveBox", "BezierCurveBoxOptions", "BezierFunction", "BilateralFilter", "Binarize", "BinaryDeserialize", "BinaryDistance", "BinaryFormat", "BinaryImageQ", "BinaryRead", "BinaryReadList", "BinarySerialize", "BinaryWrite", "BinCounts", "BinLists", "Binomial", "BinomialDistribution", "BinomialProcess", "BinormalDistribution", "BiorthogonalSplineWavelet", "BipartiteGraphQ", "BiquadraticFilterModel", "BirnbaumImportance", "BirnbaumSaundersDistribution", "BitAnd", "BitClear", "BitGet", "BitLength", "BitNot", "BitOr", "BitSet", "BitShiftLeft", "BitShiftRight", "BitXor", "BiweightLocation", "BiweightMidvariance", "Black", "BlackmanHarrisWindow", "BlackmanNuttallWindow", "BlackmanWindow", "Blank", "BlankForm", "BlankNullSequence", "BlankSequence", "Blend", "Block", "BlockchainAddressData", "BlockchainBase", "BlockchainBlockData", "BlockchainContractValue", "BlockchainData", "BlockchainGet", "BlockchainKeyEncode", "BlockchainPut", "BlockchainTokenData", "BlockchainTransaction", "BlockchainTransactionData", "BlockchainTransactionSign", "BlockchainTransactionSubmit", "BlockMap", "BlockRandom", "BlomqvistBeta", "BlomqvistBetaTest", "Blue", "Blur", "BodePlot", "BohmanWindow", "Bold", "Bond", "BondCount", "BondList", "BondQ", "Bookmarks", "Boole", "BooleanConsecutiveFunction", "BooleanConvert", "BooleanCountingFunction", "BooleanFunction", "BooleanGraph", "BooleanMaxterms", "BooleanMinimize", "BooleanMinterms", "BooleanQ", "BooleanRegion", "Booleans", "BooleanStrings", "BooleanTable", "BooleanVariables", "BorderDimensions", "BorelTannerDistribution", "Bottom", "BottomHatTransform", "BoundaryDiscretizeGraphics", "BoundaryDiscretizeRegion", "BoundaryMesh", "BoundaryMeshRegion", "BoundaryMeshRegionQ", "BoundaryStyle", "BoundedRegionQ", "BoundingRegion", "Bounds", "Box", "BoxBaselineShift", "BoxData", "BoxDimensions", "Boxed", "Boxes", "BoxForm", "BoxFormFormatTypes", "BoxFrame", "BoxID", "BoxMargins", "BoxMatrix", "BoxObject", "BoxRatios", "BoxRotation", "BoxRotationPoint", "BoxStyle", "BoxWhiskerChart", "Bra", "BracketingBar", "BraKet", "BrayCurtisDistance", "BreadthFirstScan", "Break", "BridgeData", "BrightnessEqualize", "BroadcastStationData", "Brown", "BrownForsytheTest", "BrownianBridgeProcess", "BrowserCategory", "BSplineBasis", "BSplineCurve", "BSplineCurve3DBox", "BSplineCurve3DBoxOptions", "BSplineCurveBox", "BSplineCurveBoxOptions", "BSplineFunction", "BSplineSurface", "BSplineSurface3DBox", "BSplineSurface3DBoxOptions", "BubbleChart", "BubbleChart3D", "BubbleScale", "BubbleSizes", "BuildingData", "BulletGauge", "BusinessDayQ", "ButterflyGraph", "ButterworthFilterModel", "Button", "ButtonBar", "ButtonBox", "ButtonBoxOptions", "ButtonCell", "ButtonContents", "ButtonData", "ButtonEvaluator", "ButtonExpandable", "ButtonFrame", "ButtonFunction", "ButtonMargins", "ButtonMinHeight", "ButtonNote", "ButtonNotebook", "ButtonSource", "ButtonStyle", "ButtonStyleMenuListing", "Byte", "ByteArray", "ByteArrayFormat", "ByteArrayQ", "ByteArrayToString", "ByteCount", "ByteOrdering", "C", "CachedValue", "CacheGraphics", "CachePersistence", "CalendarConvert", "CalendarData", "CalendarType", "Callout", "CalloutMarker", "CalloutStyle", "CallPacket", "CanberraDistance", "Cancel", "CancelButton", "CandlestickChart", "CanonicalGraph", "CanonicalizePolygon", "CanonicalizePolyhedron", "CanonicalName", "CanonicalWarpingCorrespondence", "CanonicalWarpingDistance", "CantorMesh", "CantorStaircase", "Cap", "CapForm", "CapitalDifferentialD", "Capitalize", "CapsuleShape", "CaptureRunning", "CardinalBSplineBasis", "CarlemanLinearize", "CarmichaelLambda", "CaseOrdering", "Cases", "CaseSensitive", "Cashflow", "Casoratian", "Catalan", "CatalanNumber", "Catch", "CategoricalDistribution", "Catenate", "CatenateLayer", "CauchyDistribution", "CauchyWindow", "CayleyGraph", "CDF", "CDFDeploy", "CDFInformation", "CDFWavelet", "Ceiling", "CelestialSystem", "Cell", "CellAutoOverwrite", "CellBaseline", "CellBoundingBox", "CellBracketOptions", "CellChangeTimes", "CellContents", "CellContext", "CellDingbat", "CellDynamicExpression", "CellEditDuplicate", "CellElementsBoundingBox", "CellElementSpacings", "CellEpilog", "CellEvaluationDuplicate", "CellEvaluationFunction", "CellEvaluationLanguage", "CellEventActions", "CellFrame", "CellFrameColor", "CellFrameLabelMargins", "CellFrameLabels", "CellFrameMargins", "CellGroup", "CellGroupData", "CellGrouping", "CellGroupingRules", "CellHorizontalScrolling", "CellID", "CellLabel", "CellLabelAutoDelete", "CellLabelMargins", "CellLabelPositioning", "CellLabelStyle", "CellLabelTemplate", "CellMargins", "CellObject", "CellOpen", "CellPrint", "CellProlog", "Cells", "CellSize", "CellStyle", "CellTags", "CellularAutomaton", "CensoredDistribution", "Censoring", "Center", "CenterArray", "CenterDot", "CentralFeature", "CentralMoment", "CentralMomentGeneratingFunction", "Cepstrogram", "CepstrogramArray", "CepstrumArray", "CForm", "ChampernowneNumber", "ChangeOptions", "ChannelBase", "ChannelBrokerAction", "ChannelDatabin", "ChannelHistoryLength", "ChannelListen", "ChannelListener", "ChannelListeners", "ChannelListenerWait", "ChannelObject", "ChannelPreSendFunction", "ChannelReceiverFunction", "ChannelSend", "ChannelSubscribers", "ChanVeseBinarize", "Character", "CharacterCounts", "CharacterEncoding", "CharacterEncodingsPath", "CharacteristicFunction", "CharacteristicPolynomial", "CharacterName", "CharacterNormalize", "CharacterRange", "Characters", "ChartBaseStyle", "ChartElementData", "ChartElementDataFunction", "ChartElementFunction", "ChartElements", "ChartLabels", "ChartLayout", "ChartLegends", "ChartStyle", "Chebyshev1FilterModel", "Chebyshev2FilterModel", "ChebyshevDistance", "ChebyshevT", "ChebyshevU", "Check", "CheckAbort", "CheckAll", "Checkbox", "CheckboxBar", "CheckboxBox", "CheckboxBoxOptions", "ChemicalData", "ChessboardDistance", "ChiDistribution", "ChineseRemainder", "ChiSquareDistribution", "ChoiceButtons", "ChoiceDialog", "CholeskyDecomposition", "Chop", "ChromaticityPlot", "ChromaticityPlot3D", "ChromaticPolynomial", "Circle", "CircleBox", "CircleDot", "CircleMinus", "CirclePlus", "CirclePoints", "CircleThrough", "CircleTimes", "CirculantGraph", "CircularOrthogonalMatrixDistribution", "CircularQuaternionMatrixDistribution", "CircularRealMatrixDistribution", "CircularSymplecticMatrixDistribution", "CircularUnitaryMatrixDistribution", "Circumsphere", "CityData", "ClassifierFunction", "ClassifierInformation", "ClassifierMeasurements", "ClassifierMeasurementsObject", "Classify", "ClassPriors", "Clear", "ClearAll", "ClearAttributes", "ClearCookies", "ClearPermissions", "ClearSystemCache", "ClebschGordan", "ClickPane", "Clip", "ClipboardNotebook", "ClipFill", "ClippingStyle", "ClipPlanes", "ClipPlanesStyle", "ClipRange", "Clock", "ClockGauge", "ClockwiseContourIntegral", "Close", "Closed", "CloseKernels", "ClosenessCentrality", "Closing", "ClosingAutoSave", "ClosingEvent", "ClosingSaveDialog", "CloudAccountData", "CloudBase", "CloudConnect", "CloudConnections", "CloudDeploy", "CloudDirectory", "CloudDisconnect", "CloudEvaluate", "CloudExport", "CloudExpression", "CloudExpressions", "CloudFunction", "CloudGet", "CloudImport", "CloudLoggingData", "CloudObject", "CloudObjectInformation", "CloudObjectInformationData", "CloudObjectNameFormat", "CloudObjects", "CloudObjectURLType", "CloudPublish", "CloudPut", "CloudRenderingMethod", "CloudSave", "CloudShare", "CloudSubmit", "CloudSymbol", "CloudUnshare", "CloudUserID", "ClusterClassify", "ClusterDissimilarityFunction", "ClusteringComponents", "ClusteringTree", "CMYKColor", "Coarse", "CodeAssistOptions", "Coefficient", "CoefficientArrays", "CoefficientDomain", "CoefficientList", "CoefficientRules", "CoifletWavelet", "Collect", "Colon", "ColonForm", "ColorBalance", "ColorCombine", "ColorConvert", "ColorCoverage", "ColorData", "ColorDataFunction", "ColorDetect", "ColorDistance", "ColorFunction", "ColorFunctionScaling", "Colorize", "ColorNegate", "ColorOutput", "ColorProfileData", "ColorQ", "ColorQuantize", "ColorReplace", "ColorRules", "ColorSelectorSettings", "ColorSeparate", "ColorSetter", "ColorSetterBox", "ColorSetterBoxOptions", "ColorSlider", "ColorsNear", "ColorSpace", "ColorToneMapping", "Column", "ColumnAlignments", "ColumnBackgrounds", "ColumnForm", "ColumnLines", "ColumnsEqual", "ColumnSpacings", "ColumnWidths", "CombinedEntityClass", "CombinerFunction", "CometData", "CommonDefaultFormatTypes", "Commonest", "CommonestFilter", "CommonName", "CommonUnits", "CommunityBoundaryStyle", "CommunityGraphPlot", "CommunityLabels", "CommunityRegionStyle", "CompanyData", "CompatibleUnitQ", "CompilationOptions", "CompilationTarget", "Compile", "Compiled", "CompiledCodeFunction", "CompiledFunction", "CompilerOptions", "Complement", "ComplementedEntityClass", "CompleteGraph", "CompleteGraphQ", "CompleteKaryTree", "CompletionsListPacket", "Complex", "ComplexContourPlot", "Complexes", "ComplexExpand", "ComplexInfinity", "ComplexityFunction", "ComplexListPlot", "ComplexPlot", "ComplexPlot3D", "ComplexRegionPlot", "ComplexStreamPlot", "ComplexVectorPlot", "ComponentMeasurements", "ComponentwiseContextMenu", "Compose", "ComposeList", "ComposeSeries", "CompositeQ", "Composition", "CompoundElement", "CompoundExpression", "CompoundPoissonDistribution", "CompoundPoissonProcess", "CompoundRenewalProcess", "Compress", "CompressedData", "CompressionLevel", "ComputeUncertainty", "Condition", "ConditionalExpression", "Conditioned", "Cone", "ConeBox", "ConfidenceLevel", "ConfidenceRange", "ConfidenceTransform", "ConfigurationPath", "ConformAudio", "ConformImages", "Congruent", "ConicHullRegion", "ConicHullRegion3DBox", "ConicHullRegionBox", "ConicOptimization", "Conjugate", "ConjugateTranspose", "Conjunction", "Connect", "ConnectedComponents", "ConnectedGraphComponents", "ConnectedGraphQ", "ConnectedMeshComponents", "ConnectedMoleculeComponents", "ConnectedMoleculeQ", "ConnectionSettings", "ConnectLibraryCallbackFunction", "ConnectSystemModelComponents", "ConnesWindow", "ConoverTest", "ConsoleMessage", "ConsoleMessagePacket", "Constant", "ConstantArray", "ConstantArrayLayer", "ConstantImage", "ConstantPlusLayer", "ConstantRegionQ", "Constants", "ConstantTimesLayer", "ConstellationData", "ConstrainedMax", "ConstrainedMin", "Construct", "Containing", "ContainsAll", "ContainsAny", "ContainsExactly", "ContainsNone", "ContainsOnly", "ContentFieldOptions", "ContentLocationFunction", "ContentObject", "ContentPadding", "ContentsBoundingBox", "ContentSelectable", "ContentSize", "Context", "ContextMenu", "Contexts", "ContextToFileName", "Continuation", "Continue", "ContinuedFraction", "ContinuedFractionK", "ContinuousAction", "ContinuousMarkovProcess", "ContinuousTask", "ContinuousTimeModelQ", "ContinuousWaveletData", "ContinuousWaveletTransform", "ContourDetect", "ContourGraphics", "ContourIntegral", "ContourLabels", "ContourLines", "ContourPlot", "ContourPlot3D", "Contours", "ContourShading", "ContourSmoothing", "ContourStyle", "ContraharmonicMean", "ContrastiveLossLayer", "Control", "ControlActive", "ControlAlignment", "ControlGroupContentsBox", "ControllabilityGramian", "ControllabilityMatrix", "ControllableDecomposition", "ControllableModelQ", "ControllerDuration", "ControllerInformation", "ControllerInformationData", "ControllerLinking", "ControllerManipulate", "ControllerMethod", "ControllerPath", "ControllerState", "ControlPlacement", "ControlsRendering", "ControlType", "Convergents", "ConversionOptions", "ConversionRules", "ConvertToBitmapPacket", "ConvertToPostScript", "ConvertToPostScriptPacket", "ConvexHullMesh", "ConvexPolygonQ", "ConvexPolyhedronQ", "ConvolutionLayer", "Convolve", "ConwayGroupCo1", "ConwayGroupCo2", "ConwayGroupCo3", "CookieFunction", "Cookies", "CoordinateBoundingBox", "CoordinateBoundingBoxArray", "CoordinateBounds", "CoordinateBoundsArray", "CoordinateChartData", "CoordinatesToolOptions", "CoordinateTransform", "CoordinateTransformData", "CoprimeQ", "Coproduct", "CopulaDistribution", "Copyable", "CopyDatabin", "CopyDirectory", "CopyFile", "CopyTag", "CopyToClipboard", "CornerFilter", "CornerNeighbors", "Correlation", "CorrelationDistance", "CorrelationFunction", "CorrelationTest", "Cos", "Cosh", "CoshIntegral", "CosineDistance", "CosineWindow", "CosIntegral", "Cot", "Coth", "Count", "CountDistinct", "CountDistinctBy", "CounterAssignments", "CounterBox", "CounterBoxOptions", "CounterClockwiseContourIntegral", "CounterEvaluator", "CounterFunction", "CounterIncrements", "CounterStyle", "CounterStyleMenuListing", "CountRoots", "CountryData", "Counts", "CountsBy", "Covariance", "CovarianceEstimatorFunction", "CovarianceFunction", "CoxianDistribution", "CoxIngersollRossProcess", "CoxModel", "CoxModelFit", "CramerVonMisesTest", "CreateArchive", "CreateCellID", "CreateChannel", "CreateCloudExpression", "CreateDatabin", "CreateDataStructure", "CreateDataSystemModel", "CreateDialog", "CreateDirectory", "CreateDocument", "CreateFile", "CreateIntermediateDirectories", "CreateManagedLibraryExpression", "CreateNotebook", "CreatePacletArchive", "CreatePalette", "CreatePalettePacket", "CreatePermissionsGroup", "CreateScheduledTask", "CreateSearchIndex", "CreateSystemModel", "CreateTemporary", "CreateUUID", "CreateWindow", "CriterionFunction", "CriticalityFailureImportance", "CriticalitySuccessImportance", "CriticalSection", "Cross", "CrossEntropyLossLayer", "CrossingCount", "CrossingDetect", "CrossingPolygon", "CrossMatrix", "Csc", "Csch", "CTCLossLayer", "Cube", "CubeRoot", "Cubics", "Cuboid", "CuboidBox", "Cumulant", "CumulantGeneratingFunction", "Cup", "CupCap", "Curl", "CurlyDoubleQuote", "CurlyQuote", "CurrencyConvert", "CurrentDate", "CurrentImage", "CurrentlySpeakingPacket", "CurrentNotebookImage", "CurrentScreenImage", "CurrentValue", "Curry", "CurryApplied", "CurvatureFlowFilter", "CurveClosed", "Cyan", "CycleGraph", "CycleIndexPolynomial", "Cycles", "CyclicGroup", "Cyclotomic", "Cylinder", "CylinderBox", "CylindricalDecomposition", "D", "DagumDistribution", "DamData", "DamerauLevenshteinDistance", "DampingFactor", "Darker", "Dashed", "Dashing", "DatabaseConnect", "DatabaseDisconnect", "DatabaseReference", "Databin", "DatabinAdd", "DatabinRemove", "Databins", "DatabinUpload", "DataCompression", "DataDistribution", "DataRange", "DataReversed", "Dataset", "DatasetDisplayPanel", "DataStructure", "DataStructureQ", "Date", "DateBounds", "Dated", "DateDelimiters", "DateDifference", "DatedUnit", "DateFormat", "DateFunction", "DateHistogram", "DateInterval", "DateList", "DateListLogPlot", "DateListPlot", "DateListStepPlot", "DateObject", "DateObjectQ", "DateOverlapsQ", "DatePattern", "DatePlus", "DateRange", "DateReduction", "DateString", "DateTicksFormat", "DateValue", "DateWithinQ", "DaubechiesWavelet", "DavisDistribution", "DawsonF", "DayCount", "DayCountConvention", "DayHemisphere", "DaylightQ", "DayMatchQ", "DayName", "DayNightTerminator", "DayPlus", "DayRange", "DayRound", "DeBruijnGraph", "DeBruijnSequence", "Debug", "DebugTag", "Decapitalize", "Decimal", "DecimalForm", "DeclareKnownSymbols", "DeclarePackage", "Decompose", "DeconvolutionLayer", "Decrement", "Decrypt", "DecryptFile", "DedekindEta", "DeepSpaceProbeData", "Default", "DefaultAxesStyle", "DefaultBaseStyle", "DefaultBoxStyle", "DefaultButton", "DefaultColor", "DefaultControlPlacement", "DefaultDuplicateCellStyle", "DefaultDuration", "DefaultElement", "DefaultFaceGridsStyle", "DefaultFieldHintStyle", "DefaultFont", "DefaultFontProperties", "DefaultFormatType", "DefaultFormatTypeForStyle", "DefaultFrameStyle", "DefaultFrameTicksStyle", "DefaultGridLinesStyle", "DefaultInlineFormatType", "DefaultInputFormatType", "DefaultLabelStyle", "DefaultMenuStyle", "DefaultNaturalLanguage", "DefaultNewCellStyle", "DefaultNewInlineCellStyle", "DefaultNotebook", "DefaultOptions", "DefaultOutputFormatType", "DefaultPrintPrecision", "DefaultStyle", "DefaultStyleDefinitions", "DefaultTextFormatType", "DefaultTextInlineFormatType", "DefaultTicksStyle", "DefaultTooltipStyle", "DefaultValue", "DefaultValues", "Defer", "DefineExternal", "DefineInputStreamMethod", "DefineOutputStreamMethod", "DefineResourceFunction", "Definition", "Degree", "DegreeCentrality", "DegreeGraphDistribution", "DegreeLexicographic", "DegreeReverseLexicographic", "DEigensystem", "DEigenvalues", "Deinitialization", "Del", "DelaunayMesh", "Delayed", "Deletable", "Delete", "DeleteAnomalies", "DeleteBorderComponents", "DeleteCases", "DeleteChannel", "DeleteCloudExpression", "DeleteContents", "DeleteDirectory", "DeleteDuplicates", "DeleteDuplicatesBy", "DeleteFile", "DeleteMissing", "DeleteObject", "DeletePermissionsKey", "DeleteSearchIndex", "DeleteSmallComponents", "DeleteStopwords", "DeleteWithContents", "DeletionWarning", "DelimitedArray", "DelimitedSequence", "Delimiter", "DelimiterFlashTime", "DelimiterMatching", "Delimiters", "DeliveryFunction", "Dendrogram", "Denominator", "DensityGraphics", "DensityHistogram", "DensityPlot", "DensityPlot3D", "DependentVariables", "Deploy", "Deployed", "Depth", "DepthFirstScan", "Derivative", "DerivativeFilter", "DerivedKey", "DescriptorStateSpace", "DesignMatrix", "DestroyAfterEvaluation", "Det", "DeviceClose", "DeviceConfigure", "DeviceExecute", "DeviceExecuteAsynchronous", "DeviceObject", "DeviceOpen", "DeviceOpenQ", "DeviceRead", "DeviceReadBuffer", "DeviceReadLatest", "DeviceReadList", "DeviceReadTimeSeries", "Devices", "DeviceStreams", "DeviceWrite", "DeviceWriteBuffer", "DGaussianWavelet", "DiacriticalPositioning", "Diagonal", "DiagonalizableMatrixQ", "DiagonalMatrix", "DiagonalMatrixQ", "Dialog", "DialogIndent", "DialogInput", "DialogLevel", "DialogNotebook", "DialogProlog", "DialogReturn", "DialogSymbols", "Diamond", "DiamondMatrix", "DiceDissimilarity", "DictionaryLookup", "DictionaryWordQ", "DifferenceDelta", "DifferenceOrder", "DifferenceQuotient", "DifferenceRoot", "DifferenceRootReduce", "Differences", "DifferentialD", "DifferentialRoot", "DifferentialRootReduce", "DifferentiatorFilter", "DigitalSignature", "DigitBlock", "DigitBlockMinimum", "DigitCharacter", "DigitCount", "DigitQ", "DihedralAngle", "DihedralGroup", "Dilation", "DimensionalCombinations", "DimensionalMeshComponents", "DimensionReduce", "DimensionReducerFunction", "DimensionReduction", "Dimensions", "DiracComb", "DiracDelta", "DirectedEdge", "DirectedEdges", "DirectedGraph", "DirectedGraphQ", "DirectedInfinity", "Direction", "Directive", "Directory", "DirectoryName", "DirectoryQ", "DirectoryStack", "DirichletBeta", "DirichletCharacter", "DirichletCondition", "DirichletConvolve", "DirichletDistribution", "DirichletEta", "DirichletL", "DirichletLambda", "DirichletTransform", "DirichletWindow", "DisableConsolePrintPacket", "DisableFormatting", "DiscreteAsymptotic", "DiscreteChirpZTransform", "DiscreteConvolve", "DiscreteDelta", "DiscreteHadamardTransform", "DiscreteIndicator", "DiscreteLimit", "DiscreteLQEstimatorGains", "DiscreteLQRegulatorGains", "DiscreteLyapunovSolve", "DiscreteMarkovProcess", "DiscreteMaxLimit", "DiscreteMinLimit", "DiscretePlot", "DiscretePlot3D", "DiscreteRatio", "DiscreteRiccatiSolve", "DiscreteShift", "DiscreteTimeModelQ", "DiscreteUniformDistribution", "DiscreteVariables", "DiscreteWaveletData", "DiscreteWaveletPacketTransform", "DiscreteWaveletTransform", "DiscretizeGraphics", "DiscretizeRegion", "Discriminant", "DisjointQ", "Disjunction", "Disk", "DiskBox", "DiskMatrix", "DiskSegment", "Dispatch", "DispatchQ", "DispersionEstimatorFunction", "Display", "DisplayAllSteps", "DisplayEndPacket", "DisplayFlushImagePacket", "DisplayForm", "DisplayFunction", "DisplayPacket", "DisplayRules", "DisplaySetSizePacket", "DisplayString", "DisplayTemporary", "DisplayWith", "DisplayWithRef", "DisplayWithVariable", "DistanceFunction", "DistanceMatrix", "DistanceTransform", "Distribute", "Distributed", "DistributedContexts", "DistributeDefinitions", "DistributionChart", "DistributionDomain", "DistributionFitTest", "DistributionParameterAssumptions", "DistributionParameterQ", "Dithering", "Div", "Divergence", "Divide", "DivideBy", "Dividers", "DivideSides", "Divisible", "Divisors", "DivisorSigma", "DivisorSum", "DMSList", "DMSString", "Do", "DockedCells", "DocumentGenerator", "DocumentGeneratorInformation", "DocumentGeneratorInformationData", "DocumentGenerators", "DocumentNotebook", "DocumentWeightingRules", "Dodecahedron", "DomainRegistrationInformation", "DominantColors", "DOSTextFormat", "Dot", "DotDashed", "DotEqual", "DotLayer", "DotPlusLayer", "Dotted", "DoubleBracketingBar", "DoubleContourIntegral", "DoubleDownArrow", "DoubleLeftArrow", "DoubleLeftRightArrow", "DoubleLeftTee", "DoubleLongLeftArrow", "DoubleLongLeftRightArrow", "DoubleLongRightArrow", "DoubleRightArrow", "DoubleRightTee", "DoubleUpArrow", "DoubleUpDownArrow", "DoubleVerticalBar", "DoublyInfinite", "Down", "DownArrow", "DownArrowBar", "DownArrowUpArrow", "DownLeftRightVector", "DownLeftTeeVector", "DownLeftVector", "DownLeftVectorBar", "DownRightTeeVector", "DownRightVector", "DownRightVectorBar", "Downsample", "DownTee", "DownTeeArrow", "DownValues", "DragAndDrop", "DrawEdges", "DrawFrontFaces", "DrawHighlighted", "Drop", "DropoutLayer", "DSolve", "DSolveValue", "Dt", "DualLinearProgramming", "DualPolyhedron", "DualSystemsModel", "DumpGet", "DumpSave", "DuplicateFreeQ", "Duration", "Dynamic", "DynamicBox", "DynamicBoxOptions", "DynamicEvaluationTimeout", "DynamicGeoGraphics", "DynamicImage", "DynamicLocation", "DynamicModule", "DynamicModuleBox", "DynamicModuleBoxOptions", "DynamicModuleParent", "DynamicModuleValues", "DynamicName", "DynamicNamespace", "DynamicReference", "DynamicSetting", "DynamicUpdating", "DynamicWrapper", "DynamicWrapperBox", "DynamicWrapperBoxOptions", "E", "EarthImpactData", "EarthquakeData", "EccentricityCentrality", "Echo", "EchoFunction", "EclipseType", "EdgeAdd", "EdgeBetweennessCentrality", "EdgeCapacity", "EdgeCapForm", "EdgeColor", "EdgeConnectivity", "EdgeContract", "EdgeCost", "EdgeCount", "EdgeCoverQ", "EdgeCycleMatrix", "EdgeDashing", "EdgeDelete", "EdgeDetect", "EdgeForm", "EdgeIndex", "EdgeJoinForm", "EdgeLabeling", "EdgeLabels", "EdgeLabelStyle", "EdgeList", "EdgeOpacity", "EdgeQ", "EdgeRenderingFunction", "EdgeRules", "EdgeShapeFunction", "EdgeStyle", "EdgeTaggedGraph", "EdgeTaggedGraphQ", "EdgeTags", "EdgeThickness", "EdgeWeight", "EdgeWeightedGraphQ", "Editable", "EditButtonSettings", "EditCellTagsSettings", "EditDistance", "EffectiveInterest", "Eigensystem", "Eigenvalues", "EigenvectorCentrality", "Eigenvectors", "Element", "ElementData", "ElementwiseLayer", "ElidedForms", "Eliminate", "EliminationOrder", "Ellipsoid", "EllipticE", "EllipticExp", "EllipticExpPrime", "EllipticF", "EllipticFilterModel", "EllipticK", "EllipticLog", "EllipticNomeQ", "EllipticPi", "EllipticReducedHalfPeriods", "EllipticTheta", "EllipticThetaPrime", "EmbedCode", "EmbeddedHTML", "EmbeddedService", "EmbeddingLayer", "EmbeddingObject", "EmitSound", "EmphasizeSyntaxErrors", "EmpiricalDistribution", "Empty", "EmptyGraphQ", "EmptyRegion", "EnableConsolePrintPacket", "Enabled", "Encode", "Encrypt", "EncryptedObject", "EncryptFile", "End", "EndAdd", "EndDialogPacket", "EndFrontEndInteractionPacket", "EndOfBuffer", "EndOfFile", "EndOfLine", "EndOfString", "EndPackage", "EngineEnvironment", "EngineeringForm", "Enter", "EnterExpressionPacket", "EnterTextPacket", "Entity", "EntityClass", "EntityClassList", "EntityCopies", "EntityFunction", "EntityGroup", "EntityInstance", "EntityList", "EntityPrefetch", "EntityProperties", "EntityProperty", "EntityPropertyClass", "EntityRegister", "EntityStore", "EntityStores", "EntityTypeName", "EntityUnregister", "EntityValue", "Entropy", "EntropyFilter", "Environment", "Epilog", "EpilogFunction", "Equal", "EqualColumns", "EqualRows", "EqualTilde", "EqualTo", "EquatedTo", "Equilibrium", "EquirippleFilterKernel", "Equivalent", "Erf", "Erfc", "Erfi", "ErlangB", "ErlangC", "ErlangDistribution", "Erosion", "ErrorBox", "ErrorBoxOptions", "ErrorNorm", "ErrorPacket", "ErrorsDialogSettings", "EscapeRadius", "EstimatedBackground", "EstimatedDistribution", "EstimatedProcess", "EstimatorGains", "EstimatorRegulator", "EuclideanDistance", "EulerAngles", "EulerCharacteristic", "EulerE", "EulerGamma", "EulerianGraphQ", "EulerMatrix", "EulerPhi", "Evaluatable", "Evaluate", "Evaluated", "EvaluatePacket", "EvaluateScheduledTask", "EvaluationBox", "EvaluationCell", "EvaluationCompletionAction", "EvaluationData", "EvaluationElements", "EvaluationEnvironment", "EvaluationMode", "EvaluationMonitor", "EvaluationNotebook", "EvaluationObject", "EvaluationOrder", "Evaluator", "EvaluatorNames", "EvenQ", "EventData", "EventEvaluator", "EventHandler", "EventHandlerTag", "EventLabels", "EventSeries", "ExactBlackmanWindow", "ExactNumberQ", "ExactRootIsolation", "ExampleData", "Except", "ExcludedForms", "ExcludedLines", "ExcludedPhysicalQuantities", "ExcludePods", "Exclusions", "ExclusionsStyle", "Exists", "Exit", "ExitDialog", "ExoplanetData", "Exp", "Expand", "ExpandAll", "ExpandDenominator", "ExpandFileName", "ExpandNumerator", "Expectation", "ExpectationE", "ExpectedValue", "ExpGammaDistribution", "ExpIntegralE", "ExpIntegralEi", "ExpirationDate", "Exponent", "ExponentFunction", "ExponentialDistribution", "ExponentialFamily", "ExponentialGeneratingFunction", "ExponentialMovingAverage", "ExponentialPowerDistribution", "ExponentPosition", "ExponentStep", "Export", "ExportAutoReplacements", "ExportByteArray", "ExportForm", "ExportPacket", "ExportString", "Expression", "ExpressionCell", "ExpressionGraph", "ExpressionPacket", "ExpressionUUID", "ExpToTrig", "ExtendedEntityClass", "ExtendedGCD", "Extension", "ExtentElementFunction", "ExtentMarkers", "ExtentSize", "ExternalBundle", "ExternalCall", "ExternalDataCharacterEncoding", "ExternalEvaluate", "ExternalFunction", "ExternalFunctionName", "ExternalIdentifier", "ExternalObject", "ExternalOptions", "ExternalSessionObject", "ExternalSessions", "ExternalStorageBase", "ExternalStorageDownload", "ExternalStorageGet", "ExternalStorageObject", "ExternalStoragePut", "ExternalStorageUpload", "ExternalTypeSignature", "ExternalValue", "Extract", "ExtractArchive", "ExtractLayer", "ExtractPacletArchive", "ExtremeValueDistribution", "FaceAlign", "FaceForm", "FaceGrids", "FaceGridsStyle", "FacialFeatures", "Factor", "FactorComplete", "Factorial", "Factorial2", "FactorialMoment", "FactorialMomentGeneratingFunction", "FactorialPower", "FactorInteger", "FactorList", "FactorSquareFree", "FactorSquareFreeList", "FactorTerms", "FactorTermsList", "Fail", "Failure", "FailureAction", "FailureDistribution", "FailureQ", "False", "FareySequence", "FARIMAProcess", "FeatureDistance", "FeatureExtract", "FeatureExtraction", "FeatureExtractor", "FeatureExtractorFunction", "FeatureNames", "FeatureNearest", "FeatureSpacePlot", "FeatureSpacePlot3D", "FeatureTypes", "FEDisableConsolePrintPacket", "FeedbackLinearize", "FeedbackSector", "FeedbackSectorStyle", "FeedbackType", "FEEnableConsolePrintPacket", "FetalGrowthData", "Fibonacci", "Fibonorial", "FieldCompletionFunction", "FieldHint", "FieldHintStyle", "FieldMasked", "FieldSize", "File", "FileBaseName", "FileByteCount", "FileConvert", "FileDate", "FileExistsQ", "FileExtension", "FileFormat", "FileHandler", "FileHash", "FileInformation", "FileName", "FileNameDepth", "FileNameDialogSettings", "FileNameDrop", "FileNameForms", "FileNameJoin", "FileNames", "FileNameSetter", "FileNameSplit", "FileNameTake", "FilePrint", "FileSize", "FileSystemMap", "FileSystemScan", "FileTemplate", "FileTemplateApply", "FileType", "FilledCurve", "FilledCurveBox", "FilledCurveBoxOptions", "Filling", "FillingStyle", "FillingTransform", "FilteredEntityClass", "FilterRules", "FinancialBond", "FinancialData", "FinancialDerivative", "FinancialIndicator", "Find", "FindAnomalies", "FindArgMax", "FindArgMin", "FindChannels", "FindClique", "FindClusters", "FindCookies", "FindCurvePath", "FindCycle", "FindDevices", "FindDistribution", "FindDistributionParameters", "FindDivisions", "FindEdgeCover", "FindEdgeCut", "FindEdgeIndependentPaths", "FindEquationalProof", "FindEulerianCycle", "FindExternalEvaluators", "FindFaces", "FindFile", "FindFit", "FindFormula", "FindFundamentalCycles", "FindGeneratingFunction", "FindGeoLocation", "FindGeometricConjectures", "FindGeometricTransform", "FindGraphCommunities", "FindGraphIsomorphism", "FindGraphPartition", "FindHamiltonianCycle", "FindHamiltonianPath", "FindHiddenMarkovStates", "FindImageText", "FindIndependentEdgeSet", "FindIndependentVertexSet", "FindInstance", "FindIntegerNullVector", "FindKClan", "FindKClique", "FindKClub", "FindKPlex", "FindLibrary", "FindLinearRecurrence", "FindList", "FindMatchingColor", "FindMaximum", "FindMaximumCut", "FindMaximumFlow", "FindMaxValue", "FindMeshDefects", "FindMinimum", "FindMinimumCostFlow", "FindMinimumCut", "FindMinValue", "FindMoleculeSubstructure", "FindPath", "FindPeaks", "FindPermutation", "FindPostmanTour", "FindProcessParameters", "FindRepeat", "FindRoot", "FindSequenceFunction", "FindSettings", "FindShortestPath", "FindShortestTour", "FindSpanningTree", "FindSystemModelEquilibrium", "FindTextualAnswer", "FindThreshold", "FindTransientRepeat", "FindVertexCover", "FindVertexCut", "FindVertexIndependentPaths", "Fine", "FinishDynamic", "FiniteAbelianGroupCount", "FiniteGroupCount", "FiniteGroupData", "First", "FirstCase", "FirstPassageTimeDistribution", "FirstPosition", "FischerGroupFi22", "FischerGroupFi23", "FischerGroupFi24Prime", "FisherHypergeometricDistribution", "FisherRatioTest", "FisherZDistribution", "Fit", "FitAll", "FitRegularization", "FittedModel", "FixedOrder", "FixedPoint", "FixedPointList", "FlashSelection", "Flat", "Flatten", "FlattenAt", "FlattenLayer", "FlatTopWindow", "FlipView", "Floor", "FlowPolynomial", "FlushPrintOutputPacket", "Fold", "FoldList", "FoldPair", "FoldPairList", "FollowRedirects", "Font", "FontColor", "FontFamily", "FontForm", "FontName", "FontOpacity", "FontPostScriptName", "FontProperties", "FontReencoding", "FontSize", "FontSlant", "FontSubstitutions", "FontTracking", "FontVariations", "FontWeight", "For", "ForAll", "ForceVersionInstall", "Format", "FormatRules", "FormatType", "FormatTypeAutoConvert", "FormatValues", "FormBox", "FormBoxOptions", "FormControl", "FormFunction", "FormLayoutFunction", "FormObject", "FormPage", "FormTheme", "FormulaData", "FormulaLookup", "FortranForm", "Forward", "ForwardBackward", "Fourier", "FourierCoefficient", "FourierCosCoefficient", "FourierCosSeries", "FourierCosTransform", "FourierDCT", "FourierDCTFilter", "FourierDCTMatrix", "FourierDST", "FourierDSTMatrix", "FourierMatrix", "FourierParameters", "FourierSequenceTransform", "FourierSeries", "FourierSinCoefficient", "FourierSinSeries", "FourierSinTransform", "FourierTransform", "FourierTrigSeries", "FractionalBrownianMotionProcess", "FractionalGaussianNoiseProcess", "FractionalPart", "FractionBox", "FractionBoxOptions", "FractionLine", "Frame", "FrameBox", "FrameBoxOptions", "Framed", "FrameInset", "FrameLabel", "Frameless", "FrameMargins", "FrameRate", "FrameStyle", "FrameTicks", "FrameTicksStyle", "FRatioDistribution", "FrechetDistribution", "FreeQ", "FrenetSerretSystem", "FrequencySamplingFilterKernel", "FresnelC", "FresnelF", "FresnelG", "FresnelS", "Friday", "FrobeniusNumber", "FrobeniusSolve", "FromAbsoluteTime", "FromCharacterCode", "FromCoefficientRules", "FromContinuedFraction", "FromDate", "FromDigits", "FromDMS", "FromEntity", "FromJulianDate", "FromLetterNumber", "FromPolarCoordinates", "FromRomanNumeral", "FromSphericalCoordinates", "FromUnixTime", "Front", "FrontEndDynamicExpression", "FrontEndEventActions", "FrontEndExecute", "FrontEndObject", "FrontEndResource", "FrontEndResourceString", "FrontEndStackSize", "FrontEndToken", "FrontEndTokenExecute", "FrontEndValueCache", "FrontEndVersion", "FrontFaceColor", "FrontFaceOpacity", "Full", "FullAxes", "FullDefinition", "FullForm", "FullGraphics", "FullInformationOutputRegulator", "FullOptions", "FullRegion", "FullSimplify", "Function", "FunctionCompile", "FunctionCompileExport", "FunctionCompileExportByteArray", "FunctionCompileExportLibrary", "FunctionCompileExportString", "FunctionDomain", "FunctionExpand", "FunctionInterpolation", "FunctionPeriod", "FunctionRange", "FunctionSpace", "FussellVeselyImportance", "GaborFilter", "GaborMatrix", "GaborWavelet", "GainMargins", "GainPhaseMargins", "GalaxyData", "GalleryView", "Gamma", "GammaDistribution", "GammaRegularized", "GapPenalty", "GARCHProcess", "GatedRecurrentLayer", "Gather", "GatherBy", "GaugeFaceElementFunction", "GaugeFaceStyle", "GaugeFrameElementFunction", "GaugeFrameSize", "GaugeFrameStyle", "GaugeLabels", "GaugeMarkers", "GaugeStyle", "GaussianFilter", "GaussianIntegers", "GaussianMatrix", "GaussianOrthogonalMatrixDistribution", "GaussianSymplecticMatrixDistribution", "GaussianUnitaryMatrixDistribution", "GaussianWindow", "GCD", "GegenbauerC", "General", "GeneralizedLinearModelFit", "GenerateAsymmetricKeyPair", "GenerateConditions", "GeneratedCell", "GeneratedDocumentBinding", "GenerateDerivedKey", "GenerateDigitalSignature", "GenerateDocument", "GeneratedParameters", "GeneratedQuantityMagnitudes", "GenerateFileSignature", "GenerateHTTPResponse", "GenerateSecuredAuthenticationKey", "GenerateSymmetricKey", "GeneratingFunction", "GeneratorDescription", "GeneratorHistoryLength", "GeneratorOutputType", "Generic", "GenericCylindricalDecomposition", "GenomeData", "GenomeLookup", "GeoAntipode", "GeoArea", "GeoArraySize", "GeoBackground", "GeoBoundingBox", "GeoBounds", "GeoBoundsRegion", "GeoBubbleChart", "GeoCenter", "GeoCircle", "GeoContourPlot", "GeoDensityPlot", "GeodesicClosing", "GeodesicDilation", "GeodesicErosion", "GeodesicOpening", "GeoDestination", "GeodesyData", "GeoDirection", "GeoDisk", "GeoDisplacement", "GeoDistance", "GeoDistanceList", "GeoElevationData", "GeoEntities", "GeoGraphics", "GeogravityModelData", "GeoGridDirectionDifference", "GeoGridLines", "GeoGridLinesStyle", "GeoGridPosition", "GeoGridRange", "GeoGridRangePadding", "GeoGridUnitArea", "GeoGridUnitDistance", "GeoGridVector", "GeoGroup", "GeoHemisphere", "GeoHemisphereBoundary", "GeoHistogram", "GeoIdentify", "GeoImage", "GeoLabels", "GeoLength", "GeoListPlot", "GeoLocation", "GeologicalPeriodData", "GeomagneticModelData", "GeoMarker", "GeometricAssertion", "GeometricBrownianMotionProcess", "GeometricDistribution", "GeometricMean", "GeometricMeanFilter", "GeometricOptimization", "GeometricScene", "GeometricTransformation", "GeometricTransformation3DBox", "GeometricTransformation3DBoxOptions", "GeometricTransformationBox", "GeometricTransformationBoxOptions", "GeoModel", "GeoNearest", "GeoPath", "GeoPosition", "GeoPositionENU", "GeoPositionXYZ", "GeoProjection", "GeoProjectionData", "GeoRange", "GeoRangePadding", "GeoRegionValuePlot", "GeoResolution", "GeoScaleBar", "GeoServer", "GeoSmoothHistogram", "GeoStreamPlot", "GeoStyling", "GeoStylingImageFunction", "GeoVariant", "GeoVector", "GeoVectorENU", "GeoVectorPlot", "GeoVectorXYZ", "GeoVisibleRegion", "GeoVisibleRegionBoundary", "GeoWithinQ", "GeoZoomLevel", "GestureHandler", "GestureHandlerTag", "Get", "GetBoundingBoxSizePacket", "GetContext", "GetEnvironment", "GetFileName", "GetFrontEndOptionsDataPacket", "GetLinebreakInformationPacket", "GetMenusPacket", "GetPageBreakInformationPacket", "Glaisher", "GlobalClusteringCoefficient", "GlobalPreferences", "GlobalSession", "Glow", "GoldenAngle", "GoldenRatio", "GompertzMakehamDistribution", "GoochShading", "GoodmanKruskalGamma", "GoodmanKruskalGammaTest", "Goto", "Grad", "Gradient", "GradientFilter", "GradientOrientationFilter", "GrammarApply", "GrammarRules", "GrammarToken", "Graph", "Graph3D", "GraphAssortativity", "GraphAutomorphismGroup", "GraphCenter", "GraphComplement", "GraphData", "GraphDensity", "GraphDiameter", "GraphDifference", "GraphDisjointUnion", "GraphDistance", "GraphDistanceMatrix", "GraphElementData", "GraphEmbedding", "GraphHighlight", "GraphHighlightStyle", "GraphHub", "Graphics", "Graphics3D", "Graphics3DBox", "Graphics3DBoxOptions", "GraphicsArray", "GraphicsBaseline", "GraphicsBox", "GraphicsBoxOptions", "GraphicsColor", "GraphicsColumn", "GraphicsComplex", "GraphicsComplex3DBox", "GraphicsComplex3DBoxOptions", "GraphicsComplexBox", "GraphicsComplexBoxOptions", "GraphicsContents", "GraphicsData", "GraphicsGrid", "GraphicsGridBox", "GraphicsGroup", "GraphicsGroup3DBox", "GraphicsGroup3DBoxOptions", "GraphicsGroupBox", "GraphicsGroupBoxOptions", "GraphicsGrouping", "GraphicsHighlightColor", "GraphicsRow", "GraphicsSpacing", "GraphicsStyle", "GraphIntersection", "GraphLayout", "GraphLinkEfficiency", "GraphPeriphery", "GraphPlot", "GraphPlot3D", "GraphPower", "GraphPropertyDistribution", "GraphQ", "GraphRadius", "GraphReciprocity", "GraphRoot", "GraphStyle", "GraphUnion", "Gray", "GrayLevel", "Greater", "GreaterEqual", "GreaterEqualLess", "GreaterEqualThan", "GreaterFullEqual", "GreaterGreater", "GreaterLess", "GreaterSlantEqual", "GreaterThan", "GreaterTilde", "Green", "GreenFunction", "Grid", "GridBaseline", "GridBox", "GridBoxAlignment", "GridBoxBackground", "GridBoxDividers", "GridBoxFrame", "GridBoxItemSize", "GridBoxItemStyle", "GridBoxOptions", "GridBoxSpacings", "GridCreationSettings", "GridDefaultElement", "GridElementStyleOptions", "GridFrame", "GridFrameMargins", "GridGraph", "GridLines", "GridLinesStyle", "GroebnerBasis", "GroupActionBase", "GroupBy", "GroupCentralizer", "GroupElementFromWord", "GroupElementPosition", "GroupElementQ", "GroupElements", "GroupElementToWord", "GroupGenerators", "Groupings", "GroupMultiplicationTable", "GroupOrbits", "GroupOrder", "GroupPageBreakWithin", "GroupSetwiseStabilizer", "GroupStabilizer", "GroupStabilizerChain", "GroupTogetherGrouping", "GroupTogetherNestedGrouping", "GrowCutComponents", "Gudermannian", "GuidedFilter", "GumbelDistribution", "HaarWavelet", "HadamardMatrix", "HalfLine", "HalfNormalDistribution", "HalfPlane", "HalfSpace", "HalftoneShading", "HamiltonianGraphQ", "HammingDistance", "HammingWindow", "HandlerFunctions", "HandlerFunctionsKeys", "HankelH1", "HankelH2", "HankelMatrix", "HankelTransform", "HannPoissonWindow", "HannWindow", "HaradaNortonGroupHN", "HararyGraph", "HarmonicMean", "HarmonicMeanFilter", "HarmonicNumber", "Hash", "HatchFilling", "HatchShading", "Haversine", "HazardFunction", "Head", "HeadCompose", "HeaderAlignment", "HeaderBackground", "HeaderDisplayFunction", "HeaderLines", "HeaderSize", "HeaderStyle", "Heads", "HeavisideLambda", "HeavisidePi", "HeavisideTheta", "HeldGroupHe", "HeldPart", "HelpBrowserLookup", "HelpBrowserNotebook", "HelpBrowserSettings", "Here", "HermiteDecomposition", "HermiteH", "HermitianMatrixQ", "HessenbergDecomposition", "Hessian", "HeunB", "HeunBPrime", "HeunC", "HeunCPrime", "HeunD", "HeunDPrime", "HeunG", "HeunGPrime", "HeunT", "HeunTPrime", "HexadecimalCharacter", "Hexahedron", "HexahedronBox", "HexahedronBoxOptions", "HiddenItems", "HiddenMarkovProcess", "HiddenSurface", "Highlighted", "HighlightGraph", "HighlightImage", "HighlightMesh", "HighpassFilter", "HigmanSimsGroupHS", "HilbertCurve", "HilbertFilter", "HilbertMatrix", "Histogram", "Histogram3D", "HistogramDistribution", "HistogramList", "HistogramTransform", "HistogramTransformInterpolation", "HistoricalPeriodData", "HitMissTransform", "HITSCentrality", "HjorthDistribution", "HodgeDual", "HoeffdingD", "HoeffdingDTest", "Hold", "HoldAll", "HoldAllComplete", "HoldComplete", "HoldFirst", "HoldForm", "HoldPattern", "HoldRest", "HolidayCalendar", "HomeDirectory", "HomePage", "Horizontal", "HorizontalForm", "HorizontalGauge", "HorizontalScrollPosition", "HornerForm", "HostLookup", "HotellingTSquareDistribution", "HoytDistribution", "HTMLSave", "HTTPErrorResponse", "HTTPRedirect", "HTTPRequest", "HTTPRequestData", "HTTPResponse", "Hue", "HumanGrowthData", "HumpDownHump", "HumpEqual", "HurwitzLerchPhi", "HurwitzZeta", "HyperbolicDistribution", "HypercubeGraph", "HyperexponentialDistribution", "Hyperfactorial", "Hypergeometric0F1", "Hypergeometric0F1Regularized", "Hypergeometric1F1", "Hypergeometric1F1Regularized", "Hypergeometric2F1", "Hypergeometric2F1Regularized", "HypergeometricDistribution", "HypergeometricPFQ", "HypergeometricPFQRegularized", "HypergeometricU", "Hyperlink", "HyperlinkAction", "HyperlinkCreationSettings", "Hyperplane", "Hyphenation", "HyphenationOptions", "HypoexponentialDistribution", "HypothesisTestData", "I", "IconData", "Iconize", "IconizedObject", "IconRules", "Icosahedron", "Identity", "IdentityMatrix", "If", "IgnoreCase", "IgnoreDiacritics", "IgnorePunctuation", "IgnoreSpellCheck", "IgnoringInactive", "Im", "Image", "Image3D", "Image3DProjection", "Image3DSlices", "ImageAccumulate", "ImageAdd", "ImageAdjust", "ImageAlign", "ImageApply", "ImageApplyIndexed", "ImageAspectRatio", "ImageAssemble", "ImageAugmentationLayer", "ImageBoundingBoxes", "ImageCache", "ImageCacheValid", "ImageCapture", "ImageCaptureFunction", "ImageCases", "ImageChannels", "ImageClip", "ImageCollage", "ImageColorSpace", "ImageCompose", "ImageContainsQ", "ImageContents", "ImageConvolve", "ImageCooccurrence", "ImageCorners", "ImageCorrelate", "ImageCorrespondingPoints", "ImageCrop", "ImageData", "ImageDeconvolve", "ImageDemosaic", "ImageDifference", "ImageDimensions", "ImageDisplacements", "ImageDistance", "ImageEffect", "ImageExposureCombine", "ImageFeatureTrack", "ImageFileApply", "ImageFileFilter", "ImageFileScan", "ImageFilter", "ImageFocusCombine", "ImageForestingComponents", "ImageFormattingWidth", "ImageForwardTransformation", "ImageGraphics", "ImageHistogram", "ImageIdentify", "ImageInstanceQ", "ImageKeypoints", "ImageLabels", "ImageLegends", "ImageLevels", "ImageLines", "ImageMargins", "ImageMarker", "ImageMarkers", "ImageMeasurements", "ImageMesh", "ImageMultiply", "ImageOffset", "ImagePad", "ImagePadding", "ImagePartition", "ImagePeriodogram", "ImagePerspectiveTransformation", "ImagePosition", "ImagePreviewFunction", "ImagePyramid", "ImagePyramidApply", "ImageQ", "ImageRangeCache", "ImageRecolor", "ImageReflect", "ImageRegion", "ImageResize", "ImageResolution", "ImageRestyle", "ImageRotate", "ImageRotated", "ImageSaliencyFilter", "ImageScaled", "ImageScan", "ImageSize", "ImageSizeAction", "ImageSizeCache", "ImageSizeMultipliers", "ImageSizeRaw", "ImageSubtract", "ImageTake", "ImageTransformation", "ImageTrim", "ImageType", "ImageValue", "ImageValuePositions", "ImagingDevice", "ImplicitRegion", "Implies", "Import", "ImportAutoReplacements", "ImportByteArray", "ImportOptions", "ImportString", "ImprovementImportance", "In", "Inactivate", "Inactive", "IncidenceGraph", "IncidenceList", "IncidenceMatrix", "IncludeAromaticBonds", "IncludeConstantBasis", "IncludeDefinitions", "IncludeDirectories", "IncludeFileExtension", "IncludeGeneratorTasks", "IncludeHydrogens", "IncludeInflections", "IncludeMetaInformation", "IncludePods", "IncludeQuantities", "IncludeRelatedTables", "IncludeSingularTerm", "IncludeWindowTimes", "Increment", "IndefiniteMatrixQ", "Indent", "IndentingNewlineSpacings", "IndentMaxFraction", "IndependenceTest", "IndependentEdgeSetQ", "IndependentPhysicalQuantity", "IndependentUnit", "IndependentUnitDimension", "IndependentVertexSetQ", "Indeterminate", "IndeterminateThreshold", "IndexCreationOptions", "Indexed", "IndexEdgeTaggedGraph", "IndexGraph", "IndexTag", "Inequality", "InexactNumberQ", "InexactNumbers", "InfiniteFuture", "InfiniteLine", "InfinitePast", "InfinitePlane", "Infinity", "Infix", "InflationAdjust", "InflationMethod", "Information", "InformationData", "InformationDataGrid", "Inherited", "InheritScope", "InhomogeneousPoissonProcess", "InitialEvaluationHistory", "Initialization", "InitializationCell", "InitializationCellEvaluation", "InitializationCellWarning", "InitializationObjects", "InitializationValue", "Initialize", "InitialSeeding", "InlineCounterAssignments", "InlineCounterIncrements", "InlineRules", "Inner", "InnerPolygon", "InnerPolyhedron", "Inpaint", "Input", "InputAliases", "InputAssumptions", "InputAutoReplacements", "InputField", "InputFieldBox", "InputFieldBoxOptions", "InputForm", "InputGrouping", "InputNamePacket", "InputNotebook", "InputPacket", "InputSettings", "InputStream", "InputString", "InputStringPacket", "InputToBoxFormPacket", "Insert", "InsertionFunction", "InsertionPointObject", "InsertLinebreaks", "InsertResults", "Inset", "Inset3DBox", "Inset3DBoxOptions", "InsetBox", "InsetBoxOptions", "Insphere", "Install", "InstallService", "InstanceNormalizationLayer", "InString", "Integer", "IntegerDigits", "IntegerExponent", "IntegerLength", "IntegerName", "IntegerPart", "IntegerPartitions", "IntegerQ", "IntegerReverse", "Integers", "IntegerString", "Integral", "Integrate", "Interactive", "InteractiveTradingChart", "Interlaced", "Interleaving", "InternallyBalancedDecomposition", "InterpolatingFunction", "InterpolatingPolynomial", "Interpolation", "InterpolationOrder", "InterpolationPoints", "InterpolationPrecision", "Interpretation", "InterpretationBox", "InterpretationBoxOptions", "InterpretationFunction", "Interpreter", "InterpretTemplate", "InterquartileRange", "Interrupt", "InterruptSettings", "IntersectedEntityClass", "IntersectingQ", "Intersection", "Interval", "IntervalIntersection", "IntervalMarkers", "IntervalMarkersStyle", "IntervalMemberQ", "IntervalSlider", "IntervalUnion", "Into", "Inverse", "InverseBetaRegularized", "InverseCDF", "InverseChiSquareDistribution", "InverseContinuousWaveletTransform", "InverseDistanceTransform", "InverseEllipticNomeQ", "InverseErf", "InverseErfc", "InverseFourier", "InverseFourierCosTransform", "InverseFourierSequenceTransform", "InverseFourierSinTransform", "InverseFourierTransform", "InverseFunction", "InverseFunctions", "InverseGammaDistribution", "InverseGammaRegularized", "InverseGaussianDistribution", "InverseGudermannian", "InverseHankelTransform", "InverseHaversine", "InverseImagePyramid", "InverseJacobiCD", "InverseJacobiCN", "InverseJacobiCS", "InverseJacobiDC", "InverseJacobiDN", "InverseJacobiDS", "InverseJacobiNC", "InverseJacobiND", "InverseJacobiNS", "InverseJacobiSC", "InverseJacobiSD", "InverseJacobiSN", "InverseLaplaceTransform", "InverseMellinTransform", "InversePermutation", "InverseRadon", "InverseRadonTransform", "InverseSeries", "InverseShortTimeFourier", "InverseSpectrogram", "InverseSurvivalFunction", "InverseTransformedRegion", "InverseWaveletTransform", "InverseWeierstrassP", "InverseWishartMatrixDistribution", "InverseZTransform", "Invisible", "InvisibleApplication", "InvisibleTimes", "IPAddress", "IrreduciblePolynomialQ", "IslandData", "IsolatingInterval", "IsomorphicGraphQ", "IsotopeData", "Italic", "Item", "ItemAspectRatio", "ItemBox", "ItemBoxOptions", "ItemDisplayFunction", "ItemSize", "ItemStyle", "ItoProcess", "JaccardDissimilarity", "JacobiAmplitude", "Jacobian", "JacobiCD", "JacobiCN", "JacobiCS", "JacobiDC", "JacobiDN", "JacobiDS", "JacobiNC", "JacobiND", "JacobiNS", "JacobiP", "JacobiSC", "JacobiSD", "JacobiSN", "JacobiSymbol", "JacobiZeta", "JankoGroupJ1", "JankoGroupJ2", "JankoGroupJ3", "JankoGroupJ4", "JarqueBeraALMTest", "JohnsonDistribution", "Join", "JoinAcross", "Joined", "JoinedCurve", "JoinedCurveBox", "JoinedCurveBoxOptions", "JoinForm", "JordanDecomposition", "JordanModelDecomposition", "JulianDate", "JuliaSetBoettcher", "JuliaSetIterationCount", "JuliaSetPlot", "JuliaSetPoints", "K", "KagiChart", "KaiserBesselWindow", "KaiserWindow", "KalmanEstimator", "KalmanFilter", "KarhunenLoeveDecomposition", "KaryTree", "KatzCentrality", "KCoreComponents", "KDistribution", "KEdgeConnectedComponents", "KEdgeConnectedGraphQ", "KeepExistingVersion", "KelvinBei", "KelvinBer", "KelvinKei", "KelvinKer", "KendallTau", "KendallTauTest", "KernelExecute", "KernelFunction", "KernelMixtureDistribution", "KernelObject", "Kernels", "Ket", "Key", "KeyCollisionFunction", "KeyComplement", "KeyDrop", "KeyDropFrom", "KeyExistsQ", "KeyFreeQ", "KeyIntersection", "KeyMap", "KeyMemberQ", "KeypointStrength", "Keys", "KeySelect", "KeySort", "KeySortBy", "KeyTake", "KeyUnion", "KeyValueMap", "KeyValuePattern", "Khinchin", "KillProcess", "KirchhoffGraph", "KirchhoffMatrix", "KleinInvariantJ", "KnapsackSolve", "KnightTourGraph", "KnotData", "KnownUnitQ", "KochCurve", "KolmogorovSmirnovTest", "KroneckerDelta", "KroneckerModelDecomposition", "KroneckerProduct", "KroneckerSymbol", "KuiperTest", "KumaraswamyDistribution", "Kurtosis", "KuwaharaFilter", "KVertexConnectedComponents", "KVertexConnectedGraphQ", "LABColor", "Label", "Labeled", "LabeledSlider", "LabelingFunction", "LabelingSize", "LabelStyle", "LabelVisibility", "LaguerreL", "LakeData", "LambdaComponents", "LambertW", "LaminaData", "LanczosWindow", "LandauDistribution", "Language", "LanguageCategory", "LanguageData", "LanguageIdentify", "LanguageOptions", "LaplaceDistribution", "LaplaceTransform", "Laplacian", "LaplacianFilter", "LaplacianGaussianFilter", "Large", "Larger", "Last", "Latitude", "LatitudeLongitude", "LatticeData", "LatticeReduce", "Launch", "LaunchKernels", "LayeredGraphPlot", "LayerSizeFunction", "LayoutInformation", "LCHColor", "LCM", "LeaderSize", "LeafCount", "LeapYearQ", "LearnDistribution", "LearnedDistribution", "LearningRate", "LearningRateMultipliers", "LeastSquares", "LeastSquaresFilterKernel", "Left", "LeftArrow", "LeftArrowBar", "LeftArrowRightArrow", "LeftDownTeeVector", "LeftDownVector", "LeftDownVectorBar", "LeftRightArrow", "LeftRightVector", "LeftTee", "LeftTeeArrow", "LeftTeeVector", "LeftTriangle", "LeftTriangleBar", "LeftTriangleEqual", "LeftUpDownVector", "LeftUpTeeVector", "LeftUpVector", "LeftUpVectorBar", "LeftVector", "LeftVectorBar", "LegendAppearance", "Legended", "LegendFunction", "LegendLabel", "LegendLayout", "LegendMargins", "LegendMarkers", "LegendMarkerSize", "LegendreP", "LegendreQ", "LegendreType", "Length", "LengthWhile", "LerchPhi", "Less", "LessEqual", "LessEqualGreater", "LessEqualThan", "LessFullEqual", "LessGreater", "LessLess", "LessSlantEqual", "LessThan", "LessTilde", "LetterCharacter", "LetterCounts", "LetterNumber", "LetterQ", "Level", "LeveneTest", "LeviCivitaTensor", "LevyDistribution", "Lexicographic", "LibraryDataType", "LibraryFunction", "LibraryFunctionError", "LibraryFunctionInformation", "LibraryFunctionLoad", "LibraryFunctionUnload", "LibraryLoad", "LibraryUnload", "LicenseID", "LiftingFilterData", "LiftingWaveletTransform", "LightBlue", "LightBrown", "LightCyan", "Lighter", "LightGray", "LightGreen", "Lighting", "LightingAngle", "LightMagenta", "LightOrange", "LightPink", "LightPurple", "LightRed", "LightSources", "LightYellow", "Likelihood", "Limit", "LimitsPositioning", "LimitsPositioningTokens", "LindleyDistribution", "Line", "Line3DBox", "Line3DBoxOptions", "LinearFilter", "LinearFractionalOptimization", "LinearFractionalTransform", "LinearGradientImage", "LinearizingTransformationData", "LinearLayer", "LinearModelFit", "LinearOffsetFunction", "LinearOptimization", "LinearProgramming", "LinearRecurrence", "LinearSolve", "LinearSolveFunction", "LineBox", "LineBoxOptions", "LineBreak", "LinebreakAdjustments", "LineBreakChart", "LinebreakSemicolonWeighting", "LineBreakWithin", "LineColor", "LineGraph", "LineIndent", "LineIndentMaxFraction", "LineIntegralConvolutionPlot", "LineIntegralConvolutionScale", "LineLegend", "LineOpacity", "LineSpacing", "LineWrapParts", "LinkActivate", "LinkClose", "LinkConnect", "LinkConnectedQ", "LinkCreate", "LinkError", "LinkFlush", "LinkFunction", "LinkHost", "LinkInterrupt", "LinkLaunch", "LinkMode", "LinkObject", "LinkOpen", "LinkOptions", "LinkPatterns", "LinkProtocol", "LinkRankCentrality", "LinkRead", "LinkReadHeld", "LinkReadyQ", "Links", "LinkService", "LinkWrite", "LinkWriteHeld", "LiouvilleLambda", "List", "Listable", "ListAnimate", "ListContourPlot", "ListContourPlot3D", "ListConvolve", "ListCorrelate", "ListCurvePathPlot", "ListDeconvolve", "ListDensityPlot", "ListDensityPlot3D", "Listen", "ListFormat", "ListFourierSequenceTransform", "ListInterpolation", "ListLineIntegralConvolutionPlot", "ListLinePlot", "ListLogLinearPlot", "ListLogLogPlot", "ListLogPlot", "ListPicker", "ListPickerBox", "ListPickerBoxBackground", "ListPickerBoxOptions", "ListPlay", "ListPlot", "ListPlot3D", "ListPointPlot3D", "ListPolarPlot", "ListQ", "ListSliceContourPlot3D", "ListSliceDensityPlot3D", "ListSliceVectorPlot3D", "ListStepPlot", "ListStreamDensityPlot", "ListStreamPlot", "ListSurfacePlot3D", "ListVectorDensityPlot", "ListVectorPlot", "ListVectorPlot3D", "ListZTransform", "Literal", "LiteralSearch", "LocalAdaptiveBinarize", "LocalCache", "LocalClusteringCoefficient", "LocalizeDefinitions", "LocalizeVariables", "LocalObject", "LocalObjects", "LocalResponseNormalizationLayer", "LocalSubmit", "LocalSymbol", "LocalTime", "LocalTimeZone", "LocationEquivalenceTest", "LocationTest", "Locator", "LocatorAutoCreate", "LocatorBox", "LocatorBoxOptions", "LocatorCentering", "LocatorPane", "LocatorPaneBox", "LocatorPaneBoxOptions", "LocatorRegion", "Locked", "Log", "Log10", "Log2", "LogBarnesG", "LogGamma", "LogGammaDistribution", "LogicalExpand", "LogIntegral", "LogisticDistribution", "LogisticSigmoid", "LogitModelFit", "LogLikelihood", "LogLinearPlot", "LogLogisticDistribution", "LogLogPlot", "LogMultinormalDistribution", "LogNormalDistribution", "LogPlot", "LogRankTest", "LogSeriesDistribution", "LongEqual", "Longest", "LongestCommonSequence", "LongestCommonSequencePositions", "LongestCommonSubsequence", "LongestCommonSubsequencePositions", "LongestMatch", "LongestOrderedSequence", "LongForm", "Longitude", "LongLeftArrow", "LongLeftRightArrow", "LongRightArrow", "LongShortTermMemoryLayer", "Lookup", "Loopback", "LoopFreeGraphQ", "Looping", "LossFunction", "LowerCaseQ", "LowerLeftArrow", "LowerRightArrow", "LowerTriangularize", "LowerTriangularMatrixQ", "LowpassFilter", "LQEstimatorGains", "LQGRegulator", "LQOutputRegulatorGains", "LQRegulatorGains", "LUBackSubstitution", "LucasL", "LuccioSamiComponents", "LUDecomposition", "LunarEclipse", "LUVColor", "LyapunovSolve", "LyonsGroupLy", "MachineID", "MachineName", "MachineNumberQ", "MachinePrecision", "MacintoshSystemPageSetup", "Magenta", "Magnification", "Magnify", "MailAddressValidation", "MailExecute", "MailFolder", "MailItem", "MailReceiverFunction", "MailResponseFunction", "MailSearch", "MailServerConnect", "MailServerConnection", "MailSettings", "MainSolve", "MaintainDynamicCaches", "Majority", "MakeBoxes", "MakeExpression", "MakeRules", "ManagedLibraryExpressionID", "ManagedLibraryExpressionQ", "MandelbrotSetBoettcher", "MandelbrotSetDistance", "MandelbrotSetIterationCount", "MandelbrotSetMemberQ", "MandelbrotSetPlot", "MangoldtLambda", "ManhattanDistance", "Manipulate", "Manipulator", "MannedSpaceMissionData", "MannWhitneyTest", "MantissaExponent", "Manual", "Map", "MapAll", "MapAt", "MapIndexed", "MAProcess", "MapThread", "MarchenkoPasturDistribution", "MarcumQ", "MardiaCombinedTest", "MardiaKurtosisTest", "MardiaSkewnessTest", "MarginalDistribution", "MarkovProcessProperties", "Masking", "MatchingDissimilarity", "MatchLocalNameQ", "MatchLocalNames", "MatchQ", "Material", "MathematicalFunctionData", "MathematicaNotation", "MathieuC", "MathieuCharacteristicA", "MathieuCharacteristicB", "MathieuCharacteristicExponent", "MathieuCPrime", "MathieuGroupM11", "MathieuGroupM12", "MathieuGroupM22", "MathieuGroupM23", "MathieuGroupM24", "MathieuS", "MathieuSPrime", "MathMLForm", "MathMLText", "Matrices", "MatrixExp", "MatrixForm", "MatrixFunction", "MatrixLog", "MatrixNormalDistribution", "MatrixPlot", "MatrixPower", "MatrixPropertyDistribution", "MatrixQ", "MatrixRank", "MatrixTDistribution", "Max", "MaxBend", "MaxCellMeasure", "MaxColorDistance", "MaxDate", "MaxDetect", "MaxDuration", "MaxExtraBandwidths", "MaxExtraConditions", "MaxFeatureDisplacement", "MaxFeatures", "MaxFilter", "MaximalBy", "Maximize", "MaxItems", "MaxIterations", "MaxLimit", "MaxMemoryUsed", "MaxMixtureKernels", "MaxOverlapFraction", "MaxPlotPoints", "MaxPoints", "MaxRecursion", "MaxStableDistribution", "MaxStepFraction", "MaxSteps", "MaxStepSize", "MaxTrainingRounds", "MaxValue", "MaxwellDistribution", "MaxWordGap", "McLaughlinGroupMcL", "Mean", "MeanAbsoluteLossLayer", "MeanAround", "MeanClusteringCoefficient", "MeanDegreeConnectivity", "MeanDeviation", "MeanFilter", "MeanGraphDistance", "MeanNeighborDegree", "MeanShift", "MeanShiftFilter", "MeanSquaredLossLayer", "Median", "MedianDeviation", "MedianFilter", "MedicalTestData", "Medium", "MeijerG", "MeijerGReduce", "MeixnerDistribution", "MellinConvolve", "MellinTransform", "MemberQ", "MemoryAvailable", "MemoryConstrained", "MemoryConstraint", "MemoryInUse", "MengerMesh", "Menu", "MenuAppearance", "MenuCommandKey", "MenuEvaluator", "MenuItem", "MenuList", "MenuPacket", "MenuSortingValue", "MenuStyle", "MenuView", "Merge", "MergeDifferences", "MergingFunction", "MersennePrimeExponent", "MersennePrimeExponentQ", "Mesh", "MeshCellCentroid", "MeshCellCount", "MeshCellHighlight", "MeshCellIndex", "MeshCellLabel", "MeshCellMarker", "MeshCellMeasure", "MeshCellQuality", "MeshCells", "MeshCellShapeFunction", "MeshCellStyle", "MeshConnectivityGraph", "MeshCoordinates", "MeshFunctions", "MeshPrimitives", "MeshQualityGoal", "MeshRange", "MeshRefinementFunction", "MeshRegion", "MeshRegionQ", "MeshShading", "MeshStyle", "Message", "MessageDialog", "MessageList", "MessageName", "MessageObject", "MessageOptions", "MessagePacket", "Messages", "MessagesNotebook", "MetaCharacters", "MetaInformation", "MeteorShowerData", "Method", "MethodOptions", "MexicanHatWavelet", "MeyerWavelet", "Midpoint", "Min", "MinColorDistance", "MinDate", "MinDetect", "MineralData", "MinFilter", "MinimalBy", "MinimalPolynomial", "MinimalStateSpaceModel", "Minimize", "MinimumTimeIncrement", "MinIntervalSize", "MinkowskiQuestionMark", "MinLimit", "MinMax", "MinorPlanetData", "Minors", "MinRecursion", "MinSize", "MinStableDistribution", "Minus", "MinusPlus", "MinValue", "Missing", "MissingBehavior", "MissingDataMethod", "MissingDataRules", "MissingQ", "MissingString", "MissingStyle", "MissingValuePattern", "MittagLefflerE", "MixedFractionParts", "MixedGraphQ", "MixedMagnitude", "MixedRadix", "MixedRadixQuantity", "MixedUnit", "MixtureDistribution", "Mod", "Modal", "Mode", "Modular", "ModularInverse", "ModularLambda", "Module", "Modulus", "MoebiusMu", "Molecule", "MoleculeContainsQ", "MoleculeEquivalentQ", "MoleculeGraph", "MoleculeModify", "MoleculePattern", "MoleculePlot", "MoleculePlot3D", "MoleculeProperty", "MoleculeQ", "MoleculeRecognize", "MoleculeValue", "Moment", "Momentary", "MomentConvert", "MomentEvaluate", "MomentGeneratingFunction", "MomentOfInertia", "Monday", "Monitor", "MonomialList", "MonomialOrder", "MonsterGroupM", "MoonPhase", "MoonPosition", "MorletWavelet", "MorphologicalBinarize", "MorphologicalBranchPoints", "MorphologicalComponents", "MorphologicalEulerNumber", "MorphologicalGraph", "MorphologicalPerimeter", "MorphologicalTransform", "MortalityData", "Most", "MountainData", "MouseAnnotation", "MouseAppearance", "MouseAppearanceTag", "MouseButtons", "Mouseover", "MousePointerNote", "MousePosition", "MovieData", "MovingAverage", "MovingMap", "MovingMedian", "MoyalDistribution", "Multicolumn", "MultiedgeStyle", "MultigraphQ", "MultilaunchWarning", "MultiLetterItalics", "MultiLetterStyle", "MultilineFunction", "Multinomial", "MultinomialDistribution", "MultinormalDistribution", "MultiplicativeOrder", "Multiplicity", "MultiplySides", "Multiselection", "MultivariateHypergeometricDistribution", "MultivariatePoissonDistribution", "MultivariateTDistribution", "N", "NakagamiDistribution", "NameQ", "Names", "NamespaceBox", "NamespaceBoxOptions", "Nand", "NArgMax", "NArgMin", "NBernoulliB", "NBodySimulation", "NBodySimulationData", "NCache", "NDEigensystem", "NDEigenvalues", "NDSolve", "NDSolveValue", "Nearest", "NearestFunction", "NearestMeshCells", "NearestNeighborGraph", "NearestTo", "NebulaData", "NeedCurrentFrontEndPackagePacket", "NeedCurrentFrontEndSymbolsPacket", "NeedlemanWunschSimilarity", "Needs", "Negative", "NegativeBinomialDistribution", "NegativeDefiniteMatrixQ", "NegativeIntegers", "NegativeMultinomialDistribution", "NegativeRationals", "NegativeReals", "NegativeSemidefiniteMatrixQ", "NeighborhoodData", "NeighborhoodGraph", "Nest", "NestedGreaterGreater", "NestedLessLess", "NestedScriptRules", "NestGraph", "NestList", "NestWhile", "NestWhileList", "NetAppend", "NetBidirectionalOperator", "NetChain", "NetDecoder", "NetDelete", "NetDrop", "NetEncoder", "NetEvaluationMode", "NetExtract", "NetFlatten", "NetFoldOperator", "NetGANOperator", "NetGraph", "NetInformation", "NetInitialize", "NetInsert", "NetInsertSharedArrays", "NetJoin", "NetMapOperator", "NetMapThreadOperator", "NetMeasurements", "NetModel", "NetNestOperator", "NetPairEmbeddingOperator", "NetPort", "NetPortGradient", "NetPrepend", "NetRename", "NetReplace", "NetReplacePart", "NetSharedArray", "NetStateObject", "NetTake", "NetTrain", "NetTrainResultsObject", "NetworkPacketCapture", "NetworkPacketRecording", "NetworkPacketRecordingDuring", "NetworkPacketTrace", "NeumannValue", "NevilleThetaC", "NevilleThetaD", "NevilleThetaN", "NevilleThetaS", "NewPrimitiveStyle", "NExpectation", "Next", "NextCell", "NextDate", "NextPrime", "NextScheduledTaskTime", "NHoldAll", "NHoldFirst", "NHoldRest", "NicholsGridLines", "NicholsPlot", "NightHemisphere", "NIntegrate", "NMaximize", "NMaxValue", "NMinimize", "NMinValue", "NominalVariables", "NonAssociative", "NoncentralBetaDistribution", "NoncentralChiSquareDistribution", "NoncentralFRatioDistribution", "NoncentralStudentTDistribution", "NonCommutativeMultiply", "NonConstants", "NondimensionalizationTransform", "None", "NoneTrue", "NonlinearModelFit", "NonlinearStateSpaceModel", "NonlocalMeansFilter", "NonNegative", "NonNegativeIntegers", "NonNegativeRationals", "NonNegativeReals", "NonPositive", "NonPositiveIntegers", "NonPositiveRationals", "NonPositiveReals", "Nor", "NorlundB", "Norm", "Normal", "NormalDistribution", "NormalGrouping", "NormalizationLayer", "Normalize", "Normalized", "NormalizedSquaredEuclideanDistance", "NormalMatrixQ", "NormalsFunction", "NormFunction", "Not", "NotCongruent", "NotCupCap", "NotDoubleVerticalBar", "Notebook", "NotebookApply", "NotebookAutoSave", "NotebookClose", "NotebookConvertSettings", "NotebookCreate", "NotebookCreateReturnObject", "NotebookDefault", "NotebookDelete", "NotebookDirectory", "NotebookDynamicExpression", "NotebookEvaluate", "NotebookEventActions", "NotebookFileName", "NotebookFind", "NotebookFindReturnObject", "NotebookGet", "NotebookGetLayoutInformationPacket", "NotebookGetMisspellingsPacket", "NotebookImport", "NotebookInformation", "NotebookInterfaceObject", "NotebookLocate", "NotebookObject", "NotebookOpen", "NotebookOpenReturnObject", "NotebookPath", "NotebookPrint", "NotebookPut", "NotebookPutReturnObject", "NotebookRead", "NotebookResetGeneratedCells", "Notebooks", "NotebookSave", "NotebookSaveAs", "NotebookSelection", "NotebookSetupLayoutInformationPacket", "NotebooksMenu", "NotebookTemplate", "NotebookWrite", "NotElement", "NotEqualTilde", "NotExists", "NotGreater", "NotGreaterEqual", "NotGreaterFullEqual", "NotGreaterGreater", "NotGreaterLess", "NotGreaterSlantEqual", "NotGreaterTilde", "Nothing", "NotHumpDownHump", "NotHumpEqual", "NotificationFunction", "NotLeftTriangle", "NotLeftTriangleBar", "NotLeftTriangleEqual", "NotLess", "NotLessEqual", "NotLessFullEqual", "NotLessGreater", "NotLessLess", "NotLessSlantEqual", "NotLessTilde", "NotNestedGreaterGreater", "NotNestedLessLess", "NotPrecedes", "NotPrecedesEqual", "NotPrecedesSlantEqual", "NotPrecedesTilde", "NotReverseElement", "NotRightTriangle", "NotRightTriangleBar", "NotRightTriangleEqual", "NotSquareSubset", "NotSquareSubsetEqual", "NotSquareSuperset", "NotSquareSupersetEqual", "NotSubset", "NotSubsetEqual", "NotSucceeds", "NotSucceedsEqual", "NotSucceedsSlantEqual", "NotSucceedsTilde", "NotSuperset", "NotSupersetEqual", "NotTilde", "NotTildeEqual", "NotTildeFullEqual", "NotTildeTilde", "NotVerticalBar", "Now", "NoWhitespace", "NProbability", "NProduct", "NProductFactors", "NRoots", "NSolve", "NSum", "NSumTerms", "NuclearExplosionData", "NuclearReactorData", "Null", "NullRecords", "NullSpace", "NullWords", "Number", "NumberCompose", "NumberDecompose", "NumberExpand", "NumberFieldClassNumber", "NumberFieldDiscriminant", "NumberFieldFundamentalUnits", "NumberFieldIntegralBasis", "NumberFieldNormRepresentatives", "NumberFieldRegulator", "NumberFieldRootsOfUnity", "NumberFieldSignature", "NumberForm", "NumberFormat", "NumberLinePlot", "NumberMarks", "NumberMultiplier", "NumberPadding", "NumberPoint", "NumberQ", "NumberSeparator", "NumberSigns", "NumberString", "Numerator", "NumeratorDenominator", "NumericalOrder", "NumericalSort", "NumericArray", "NumericArrayQ", "NumericArrayType", "NumericFunction", "NumericQ", "NuttallWindow", "NValues", "NyquistGridLines", "NyquistPlot", "O", "ObservabilityGramian", "ObservabilityMatrix", "ObservableDecomposition", "ObservableModelQ", "OceanData", "Octahedron", "OddQ", "Off", "Offset", "OLEData", "On", "ONanGroupON", "Once", "OneIdentity", "Opacity", "OpacityFunction", "OpacityFunctionScaling", "Open", "OpenAppend", "Opener", "OpenerBox", "OpenerBoxOptions", "OpenerView", "OpenFunctionInspectorPacket", "Opening", "OpenRead", "OpenSpecialOptions", "OpenTemporary", "OpenWrite", "Operate", "OperatingSystem", "OperatorApplied", "OptimumFlowData", "Optional", "OptionalElement", "OptionInspectorSettings", "OptionQ", "Options", "OptionsPacket", "OptionsPattern", "OptionValue", "OptionValueBox", "OptionValueBoxOptions", "Or", "Orange", "Order", "OrderDistribution", "OrderedQ", "Ordering", "OrderingBy", "OrderingLayer", "Orderless", "OrderlessPatternSequence", "OrnsteinUhlenbeckProcess", "Orthogonalize", "OrthogonalMatrixQ", "Out", "Outer", "OuterPolygon", "OuterPolyhedron", "OutputAutoOverwrite", "OutputControllabilityMatrix", "OutputControllableModelQ", "OutputForm", "OutputFormData", "OutputGrouping", "OutputMathEditExpression", "OutputNamePacket", "OutputResponse", "OutputSizeLimit", "OutputStream", "Over", "OverBar", "OverDot", "Overflow", "OverHat", "Overlaps", "Overlay", "OverlayBox", "OverlayBoxOptions", "Overscript", "OverscriptBox", "OverscriptBoxOptions", "OverTilde", "OverVector", "OverwriteTarget", "OwenT", "OwnValues", "Package", "PackingMethod", "PackPaclet", "PacletDataRebuild", "PacletDirectoryAdd", "PacletDirectoryLoad", "PacletDirectoryRemove", "PacletDirectoryUnload", "PacletDisable", "PacletEnable", "PacletFind", "PacletFindRemote", "PacletInformation", "PacletInstall", "PacletInstallSubmit", "PacletNewerQ", "PacletObject", "PacletObjectQ", "PacletSite", "PacletSiteObject", "PacletSiteRegister", "PacletSites", "PacletSiteUnregister", "PacletSiteUpdate", "PacletUninstall", "PacletUpdate", "PaddedForm", "Padding", "PaddingLayer", "PaddingSize", "PadeApproximant", "PadLeft", "PadRight", "PageBreakAbove", "PageBreakBelow", "PageBreakWithin", "PageFooterLines", "PageFooters", "PageHeaderLines", "PageHeaders", "PageHeight", "PageRankCentrality", "PageTheme", "PageWidth", "Pagination", "PairedBarChart", "PairedHistogram", "PairedSmoothHistogram", "PairedTTest", "PairedZTest", "PaletteNotebook", "PalettePath", "PalindromeQ", "Pane", "PaneBox", "PaneBoxOptions", "Panel", "PanelBox", "PanelBoxOptions", "Paneled", "PaneSelector", "PaneSelectorBox", "PaneSelectorBoxOptions", "PaperWidth", "ParabolicCylinderD", "ParagraphIndent", "ParagraphSpacing", "ParallelArray", "ParallelCombine", "ParallelDo", "Parallelepiped", "ParallelEvaluate", "Parallelization", "Parallelize", "ParallelMap", "ParallelNeeds", "Parallelogram", "ParallelProduct", "ParallelSubmit", "ParallelSum", "ParallelTable", "ParallelTry", "Parameter", "ParameterEstimator", "ParameterMixtureDistribution", "ParameterVariables", "ParametricFunction", "ParametricNDSolve", "ParametricNDSolveValue", "ParametricPlot", "ParametricPlot3D", "ParametricRampLayer", "ParametricRegion", "ParentBox", "ParentCell", "ParentConnect", "ParentDirectory", "ParentForm", "Parenthesize", "ParentList", "ParentNotebook", "ParetoDistribution", "ParetoPickandsDistribution", "ParkData", "Part", "PartBehavior", "PartialCorrelationFunction", "PartialD", "ParticleAcceleratorData", "ParticleData", "Partition", "PartitionGranularity", "PartitionsP", "PartitionsQ", "PartLayer", "PartOfSpeech", "PartProtection", "ParzenWindow", "PascalDistribution", "PassEventsDown", "PassEventsUp", "Paste", "PasteAutoQuoteCharacters", "PasteBoxFormInlineCells", "PasteButton", "Path", "PathGraph", "PathGraphQ", "Pattern", "PatternFilling", "PatternSequence", "PatternTest", "PauliMatrix", "PaulWavelet", "Pause", "PausedTime", "PDF", "PeakDetect", "PeanoCurve", "PearsonChiSquareTest", "PearsonCorrelationTest", "PearsonDistribution", "PercentForm", "PerfectNumber", "PerfectNumberQ", "PerformanceGoal", "Perimeter", "PeriodicBoundaryCondition", "PeriodicInterpolation", "Periodogram", "PeriodogramArray", "Permanent", "Permissions", "PermissionsGroup", "PermissionsGroupMemberQ", "PermissionsGroups", "PermissionsKey", "PermissionsKeys", "PermutationCycles", "PermutationCyclesQ", "PermutationGroup", "PermutationLength", "PermutationList", "PermutationListQ", "PermutationMax", "PermutationMin", "PermutationOrder", "PermutationPower", "PermutationProduct", "PermutationReplace", "Permutations", "PermutationSupport", "Permute", "PeronaMalikFilter", "Perpendicular", "PerpendicularBisector", "PersistenceLocation", "PersistenceTime", "PersistentObject", "PersistentObjects", "PersistentValue", "PersonData", "PERTDistribution", "PetersenGraph", "PhaseMargins", "PhaseRange", "PhysicalSystemData", "Pi", "Pick", "PIDData", "PIDDerivativeFilter", "PIDFeedforward", "PIDTune", "Piecewise", "PiecewiseExpand", "PieChart", "PieChart3D", "PillaiTrace", "PillaiTraceTest", "PingTime", "Pink", "PitchRecognize", "Pivoting", "PixelConstrained", "PixelValue", "PixelValuePositions", "Placed", "Placeholder", "PlaceholderReplace", "Plain", "PlanarAngle", "PlanarGraph", "PlanarGraphQ", "PlanckRadiationLaw", "PlaneCurveData", "PlanetaryMoonData", "PlanetData", "PlantData", "Play", "PlayRange", "Plot", "Plot3D", "Plot3Matrix", "PlotDivision", "PlotJoined", "PlotLabel", "PlotLabels", "PlotLayout", "PlotLegends", "PlotMarkers", "PlotPoints", "PlotRange", "PlotRangeClipping", "PlotRangeClipPlanesStyle", "PlotRangePadding", "PlotRegion", "PlotStyle", "PlotTheme", "Pluralize", "Plus", "PlusMinus", "Pochhammer", "PodStates", "PodWidth", "Point", "Point3DBox", "Point3DBoxOptions", "PointBox", "PointBoxOptions", "PointFigureChart", "PointLegend", "PointSize", "PoissonConsulDistribution", "PoissonDistribution", "PoissonProcess", "PoissonWindow", "PolarAxes", "PolarAxesOrigin", "PolarGridLines", "PolarPlot", "PolarTicks", "PoleZeroMarkers", "PolyaAeppliDistribution", "PolyGamma", "Polygon", "Polygon3DBox", "Polygon3DBoxOptions", "PolygonalNumber", "PolygonAngle", "PolygonBox", "PolygonBoxOptions", "PolygonCoordinates", "PolygonDecomposition", "PolygonHoleScale", "PolygonIntersections", "PolygonScale", "Polyhedron", "PolyhedronAngle", "PolyhedronCoordinates", "PolyhedronData", "PolyhedronDecomposition", "PolyhedronGenus", "PolyLog", "PolynomialExtendedGCD", "PolynomialForm", "PolynomialGCD", "PolynomialLCM", "PolynomialMod", "PolynomialQ", "PolynomialQuotient", "PolynomialQuotientRemainder", "PolynomialReduce", "PolynomialRemainder", "Polynomials", "PoolingLayer", "PopupMenu", "PopupMenuBox", "PopupMenuBoxOptions", "PopupView", "PopupWindow", "Position", "PositionIndex", "Positive", "PositiveDefiniteMatrixQ", "PositiveIntegers", "PositiveRationals", "PositiveReals", "PositiveSemidefiniteMatrixQ", "PossibleZeroQ", "Postfix", "PostScript", "Power", "PowerDistribution", "PowerExpand", "PowerMod", "PowerModList", "PowerRange", "PowerSpectralDensity", "PowersRepresentations", "PowerSymmetricPolynomial", "Precedence", "PrecedenceForm", "Precedes", "PrecedesEqual", "PrecedesSlantEqual", "PrecedesTilde", "Precision", "PrecisionGoal", "PreDecrement", "Predict", "PredictionRoot", "PredictorFunction", "PredictorInformation", "PredictorMeasurements", "PredictorMeasurementsObject", "PreemptProtect", "PreferencesPath", "Prefix", "PreIncrement", "Prepend", "PrependLayer", "PrependTo", "PreprocessingRules", "PreserveColor", "PreserveImageOptions", "Previous", "PreviousCell", "PreviousDate", "PriceGraphDistribution", "PrimaryPlaceholder", "Prime", "PrimeNu", "PrimeOmega", "PrimePi", "PrimePowerQ", "PrimeQ", "Primes", "PrimeZetaP", "PrimitivePolynomialQ", "PrimitiveRoot", "PrimitiveRootList", "PrincipalComponents", "PrincipalValue", "Print", "PrintableASCIIQ", "PrintAction", "PrintForm", "PrintingCopies", "PrintingOptions", "PrintingPageRange", "PrintingStartingPageNumber", "PrintingStyleEnvironment", "Printout3D", "Printout3DPreviewer", "PrintPrecision", "PrintTemporary", "Prism", "PrismBox", "PrismBoxOptions", "PrivateCellOptions", "PrivateEvaluationOptions", "PrivateFontOptions", "PrivateFrontEndOptions", "PrivateKey", "PrivateNotebookOptions", "PrivatePaths", "Probability", "ProbabilityDistribution", "ProbabilityPlot", "ProbabilityPr", "ProbabilityScalePlot", "ProbitModelFit", "ProcessConnection", "ProcessDirectory", "ProcessEnvironment", "Processes", "ProcessEstimator", "ProcessInformation", "ProcessObject", "ProcessParameterAssumptions", "ProcessParameterQ", "ProcessStateDomain", "ProcessStatus", "ProcessTimeDomain", "Product", "ProductDistribution", "ProductLog", "ProgressIndicator", "ProgressIndicatorBox", "ProgressIndicatorBoxOptions", "Projection", "Prolog", "PromptForm", "ProofObject", "Properties", "Property", "PropertyList", "PropertyValue", "Proportion", "Proportional", "Protect", "Protected", "ProteinData", "Pruning", "PseudoInverse", "PsychrometricPropertyData", "PublicKey", "PublisherID", "PulsarData", "PunctuationCharacter", "Purple", "Put", "PutAppend", "Pyramid", "PyramidBox", "PyramidBoxOptions", "QBinomial", "QFactorial", "QGamma", "QHypergeometricPFQ", "QnDispersion", "QPochhammer", "QPolyGamma", "QRDecomposition", "QuadraticIrrationalQ", "QuadraticOptimization", "Quantile", "QuantilePlot", "Quantity", "QuantityArray", "QuantityDistribution", "QuantityForm", "QuantityMagnitude", "QuantityQ", "QuantityUnit", "QuantityVariable", "QuantityVariableCanonicalUnit", "QuantityVariableDimensions", "QuantityVariableIdentifier", "QuantityVariablePhysicalQuantity", "Quartics", "QuartileDeviation", "Quartiles", "QuartileSkewness", "Query", "QueueingNetworkProcess", "QueueingProcess", "QueueProperties", "Quiet", "Quit", "Quotient", "QuotientRemainder", "RadialGradientImage", "RadialityCentrality", "RadicalBox", "RadicalBoxOptions", "RadioButton", "RadioButtonBar", "RadioButtonBox", "RadioButtonBoxOptions", "Radon", "RadonTransform", "RamanujanTau", "RamanujanTauL", "RamanujanTauTheta", "RamanujanTauZ", "Ramp", "Random", "RandomChoice", "RandomColor", "RandomComplex", "RandomEntity", "RandomFunction", "RandomGeoPosition", "RandomGraph", "RandomImage", "RandomInstance", "RandomInteger", "RandomPermutation", "RandomPoint", "RandomPolygon", "RandomPolyhedron", "RandomPrime", "RandomReal", "RandomSample", "RandomSeed", "RandomSeeding", "RandomVariate", "RandomWalkProcess", "RandomWord", "Range", "RangeFilter", "RangeSpecification", "RankedMax", "RankedMin", "RarerProbability", "Raster", "Raster3D", "Raster3DBox", "Raster3DBoxOptions", "RasterArray", "RasterBox", "RasterBoxOptions", "Rasterize", "RasterSize", "Rational", "RationalFunctions", "Rationalize", "Rationals", "Ratios", "RawArray", "RawBoxes", "RawData", "RawMedium", "RayleighDistribution", "Re", "Read", "ReadByteArray", "ReadLine", "ReadList", "ReadProtected", "ReadString", "Real", "RealAbs", "RealBlockDiagonalForm", "RealDigits", "RealExponent", "Reals", "RealSign", "Reap", "RebuildPacletData", "RecognitionPrior", "RecognitionThreshold", "Record", "RecordLists", "RecordSeparators", "Rectangle", "RectangleBox", "RectangleBoxOptions", "RectangleChart", "RectangleChart3D", "RectangularRepeatingElement", "RecurrenceFilter", "RecurrenceTable", "RecurringDigitsForm", "Red", "Reduce", "RefBox", "ReferenceLineStyle", "ReferenceMarkers", "ReferenceMarkerStyle", "Refine", "ReflectionMatrix", "ReflectionTransform", "Refresh", "RefreshRate", "Region", "RegionBinarize", "RegionBoundary", "RegionBoundaryStyle", "RegionBounds", "RegionCentroid", "RegionDifference", "RegionDimension", "RegionDisjoint", "RegionDistance", "RegionDistanceFunction", "RegionEmbeddingDimension", "RegionEqual", "RegionFillingStyle", "RegionFunction", "RegionImage", "RegionIntersection", "RegionMeasure", "RegionMember", "RegionMemberFunction", "RegionMoment", "RegionNearest", "RegionNearestFunction", "RegionPlot", "RegionPlot3D", "RegionProduct", "RegionQ", "RegionResize", "RegionSize", "RegionSymmetricDifference", "RegionUnion", "RegionWithin", "RegisterExternalEvaluator", "RegularExpression", "Regularization", "RegularlySampledQ", "RegularPolygon", "ReIm", "ReImLabels", "ReImPlot", "ReImStyle", "Reinstall", "RelationalDatabase", "RelationGraph", "Release", "ReleaseHold", "ReliabilityDistribution", "ReliefImage", "ReliefPlot", "RemoteAuthorizationCaching", "RemoteConnect", "RemoteConnectionObject", "RemoteFile", "RemoteRun", "RemoteRunProcess", "Remove", "RemoveAlphaChannel", "RemoveAsynchronousTask", "RemoveAudioStream", "RemoveBackground", "RemoveChannelListener", "RemoveChannelSubscribers", "Removed", "RemoveDiacritics", "RemoveInputStreamMethod", "RemoveOutputStreamMethod", "RemoveProperty", "RemoveScheduledTask", "RemoveUsers", "RemoveVideoStream", "RenameDirectory", "RenameFile", "RenderAll", "RenderingOptions", "RenewalProcess", "RenkoChart", "RepairMesh", "Repeated", "RepeatedNull", "RepeatedString", "RepeatedTiming", "RepeatingElement", "Replace", "ReplaceAll", "ReplaceHeldPart", "ReplaceImageValue", "ReplaceList", "ReplacePart", "ReplacePixelValue", "ReplaceRepeated", "ReplicateLayer", "RequiredPhysicalQuantities", "Resampling", "ResamplingAlgorithmData", "ResamplingMethod", "Rescale", "RescalingTransform", "ResetDirectory", "ResetMenusPacket", "ResetScheduledTask", "ReshapeLayer", "Residue", "ResizeLayer", "Resolve", "ResourceAcquire", "ResourceData", "ResourceFunction", "ResourceObject", "ResourceRegister", "ResourceRemove", "ResourceSearch", "ResourceSubmissionObject", "ResourceSubmit", "ResourceSystemBase", "ResourceSystemPath", "ResourceUpdate", "ResourceVersion", "ResponseForm", "Rest", "RestartInterval", "Restricted", "Resultant", "ResumePacket", "Return", "ReturnEntersInput", "ReturnExpressionPacket", "ReturnInputFormPacket", "ReturnPacket", "ReturnReceiptFunction", "ReturnTextPacket", "Reverse", "ReverseApplied", "ReverseBiorthogonalSplineWavelet", "ReverseElement", "ReverseEquilibrium", "ReverseGraph", "ReverseSort", "ReverseSortBy", "ReverseUpEquilibrium", "RevolutionAxis", "RevolutionPlot3D", "RGBColor", "RiccatiSolve", "RiceDistribution", "RidgeFilter", "RiemannR", "RiemannSiegelTheta", "RiemannSiegelZ", "RiemannXi", "Riffle", "Right", "RightArrow", "RightArrowBar", "RightArrowLeftArrow", "RightComposition", "RightCosetRepresentative", "RightDownTeeVector", "RightDownVector", "RightDownVectorBar", "RightTee", "RightTeeArrow", "RightTeeVector", "RightTriangle", "RightTriangleBar", "RightTriangleEqual", "RightUpDownVector", "RightUpTeeVector", "RightUpVector", "RightUpVectorBar", "RightVector", "RightVectorBar", "RiskAchievementImportance", "RiskReductionImportance", "RogersTanimotoDissimilarity", "RollPitchYawAngles", "RollPitchYawMatrix", "RomanNumeral", "Root", "RootApproximant", "RootIntervals", "RootLocusPlot", "RootMeanSquare", "RootOfUnityQ", "RootReduce", "Roots", "RootSum", "Rotate", "RotateLabel", "RotateLeft", "RotateRight", "RotationAction", "RotationBox", "RotationBoxOptions", "RotationMatrix", "RotationTransform", "Round", "RoundImplies", "RoundingRadius", "Row", "RowAlignments", "RowBackgrounds", "RowBox", "RowHeights", "RowLines", "RowMinHeight", "RowReduce", "RowsEqual", "RowSpacings", "RSolve", "RSolveValue", "RudinShapiro", "RudvalisGroupRu", "Rule", "RuleCondition", "RuleDelayed", "RuleForm", "RulePlot", "RulerUnits", "Run", "RunProcess", "RunScheduledTask", "RunThrough", "RuntimeAttributes", "RuntimeOptions", "RussellRaoDissimilarity", "SameQ", "SameTest", "SameTestProperties", "SampledEntityClass", "SampleDepth", "SampledSoundFunction", "SampledSoundList", "SampleRate", "SamplingPeriod", "SARIMAProcess", "SARMAProcess", "SASTriangle", "SatelliteData", "SatisfiabilityCount", "SatisfiabilityInstances", "SatisfiableQ", "Saturday", "Save", "Saveable", "SaveAutoDelete", "SaveConnection", "SaveDefinitions", "SavitzkyGolayMatrix", "SawtoothWave", "Scale", "Scaled", "ScaleDivisions", "ScaledMousePosition", "ScaleOrigin", "ScalePadding", "ScaleRanges", "ScaleRangeStyle", "ScalingFunctions", "ScalingMatrix", "ScalingTransform", "Scan", "ScheduledTask", "ScheduledTaskActiveQ", "ScheduledTaskInformation", "ScheduledTaskInformationData", "ScheduledTaskObject", "ScheduledTasks", "SchurDecomposition", "ScientificForm", "ScientificNotationThreshold", "ScorerGi", "ScorerGiPrime", "ScorerHi", "ScorerHiPrime", "ScreenRectangle", "ScreenStyleEnvironment", "ScriptBaselineShifts", "ScriptForm", "ScriptLevel", "ScriptMinSize", "ScriptRules", "ScriptSizeMultipliers", "Scrollbars", "ScrollingOptions", "ScrollPosition", "SearchAdjustment", "SearchIndexObject", "SearchIndices", "SearchQueryString", "SearchResultObject", "Sec", "Sech", "SechDistribution", "SecondOrderConeOptimization", "SectionGrouping", "SectorChart", "SectorChart3D", "SectorOrigin", "SectorSpacing", "SecuredAuthenticationKey", "SecuredAuthenticationKeys", "SeedRandom", "Select", "Selectable", "SelectComponents", "SelectedCells", "SelectedNotebook", "SelectFirst", "Selection", "SelectionAnimate", "SelectionCell", "SelectionCellCreateCell", "SelectionCellDefaultStyle", "SelectionCellParentStyle", "SelectionCreateCell", "SelectionDebuggerTag", "SelectionDuplicateCell", "SelectionEvaluate", "SelectionEvaluateCreateCell", "SelectionMove", "SelectionPlaceholder", "SelectionSetStyle", "SelectWithContents", "SelfLoops", "SelfLoopStyle", "SemanticImport", "SemanticImportString", "SemanticInterpretation", "SemialgebraicComponentInstances", "SemidefiniteOptimization", "SendMail", "SendMessage", "Sequence", "SequenceAlignment", "SequenceAttentionLayer", "SequenceCases", "SequenceCount", "SequenceFold", "SequenceFoldList", "SequenceForm", "SequenceHold", "SequenceLastLayer", "SequenceMostLayer", "SequencePosition", "SequencePredict", "SequencePredictorFunction", "SequenceReplace", "SequenceRestLayer", "SequenceReverseLayer", "SequenceSplit", "Series", "SeriesCoefficient", "SeriesData", "SeriesTermGoal", "ServiceConnect", "ServiceDisconnect", "ServiceExecute", "ServiceObject", "ServiceRequest", "ServiceResponse", "ServiceSubmit", "SessionSubmit", "SessionTime", "Set", "SetAccuracy", "SetAlphaChannel", "SetAttributes", "Setbacks", "SetBoxFormNamesPacket", "SetCloudDirectory", "SetCookies", "SetDelayed", "SetDirectory", "SetEnvironment", "SetEvaluationNotebook", "SetFileDate", "SetFileLoadingContext", "SetNotebookStatusLine", "SetOptions", "SetOptionsPacket", "SetPermissions", "SetPrecision", "SetProperty", "SetSecuredAuthenticationKey", "SetSelectedNotebook", "SetSharedFunction", "SetSharedVariable", "SetSpeechParametersPacket", "SetStreamPosition", "SetSystemModel", "SetSystemOptions", "Setter", "SetterBar", "SetterBox", "SetterBoxOptions", "Setting", "SetUsers", "SetValue", "Shading", "Shallow", "ShannonWavelet", "ShapiroWilkTest", "Share", "SharingList", "Sharpen", "ShearingMatrix", "ShearingTransform", "ShellRegion", "ShenCastanMatrix", "ShiftedGompertzDistribution", "ShiftRegisterSequence", "Short", "ShortDownArrow", "Shortest", "ShortestMatch", "ShortestPathFunction", "ShortLeftArrow", "ShortRightArrow", "ShortTimeFourier", "ShortTimeFourierData", "ShortUpArrow", "Show", "ShowAutoConvert", "ShowAutoSpellCheck", "ShowAutoStyles", "ShowCellBracket", "ShowCellLabel", "ShowCellTags", "ShowClosedCellArea", "ShowCodeAssist", "ShowContents", "ShowControls", "ShowCursorTracker", "ShowGroupOpenCloseIcon", "ShowGroupOpener", "ShowInvisibleCharacters", "ShowPageBreaks", "ShowPredictiveInterface", "ShowSelection", "ShowShortBoxForm", "ShowSpecialCharacters", "ShowStringCharacters", "ShowSyntaxStyles", "ShrinkingDelay", "ShrinkWrapBoundingBox", "SiderealTime", "SiegelTheta", "SiegelTukeyTest", "SierpinskiCurve", "SierpinskiMesh", "Sign", "Signature", "SignedRankTest", "SignedRegionDistance", "SignificanceLevel", "SignPadding", "SignTest", "SimilarityRules", "SimpleGraph", "SimpleGraphQ", "SimplePolygonQ", "SimplePolyhedronQ", "Simplex", "Simplify", "Sin", "Sinc", "SinghMaddalaDistribution", "SingleEvaluation", "SingleLetterItalics", "SingleLetterStyle", "SingularValueDecomposition", "SingularValueList", "SingularValuePlot", "SingularValues", "Sinh", "SinhIntegral", "SinIntegral", "SixJSymbol", "Skeleton", "SkeletonTransform", "SkellamDistribution", "Skewness", "SkewNormalDistribution", "SkinStyle", "Skip", "SliceContourPlot3D", "SliceDensityPlot3D", "SliceDistribution", "SliceVectorPlot3D", "Slider", "Slider2D", "Slider2DBox", "Slider2DBoxOptions", "SliderBox", "SliderBoxOptions", "SlideView", "Slot", "SlotSequence", "Small", "SmallCircle", "Smaller", "SmithDecomposition", "SmithDelayCompensator", "SmithWatermanSimilarity", "SmoothDensityHistogram", "SmoothHistogram", "SmoothHistogram3D", "SmoothKernelDistribution", "SnDispersion", "Snippet", "SnubPolyhedron", "SocialMediaData", "Socket", "SocketConnect", "SocketListen", "SocketListener", "SocketObject", "SocketOpen", "SocketReadMessage", "SocketReadyQ", "Sockets", "SocketWaitAll", "SocketWaitNext", "SoftmaxLayer", "SokalSneathDissimilarity", "SolarEclipse", "SolarSystemFeatureData", "SolidAngle", "SolidData", "SolidRegionQ", "Solve", "SolveAlways", "SolveDelayed", "Sort", "SortBy", "SortedBy", "SortedEntityClass", "Sound", "SoundAndGraphics", "SoundNote", "SoundVolume", "SourceLink", "Sow", "Space", "SpaceCurveData", "SpaceForm", "Spacer", "Spacings", "Span", "SpanAdjustments", "SpanCharacterRounding", "SpanFromAbove", "SpanFromBoth", "SpanFromLeft", "SpanLineThickness", "SpanMaxSize", "SpanMinSize", "SpanningCharacters", "SpanSymmetric", "SparseArray", "SpatialGraphDistribution", "SpatialMedian", "SpatialTransformationLayer", "Speak", "SpeakerMatchQ", "SpeakTextPacket", "SpearmanRankTest", "SpearmanRho", "SpeciesData", "SpecificityGoal", "SpectralLineData", "Spectrogram", "SpectrogramArray", "Specularity", "SpeechCases", "SpeechInterpreter", "SpeechRecognize", "SpeechSynthesize", "SpellingCorrection", "SpellingCorrectionList", "SpellingDictionaries", "SpellingDictionariesPath", "SpellingOptions", "SpellingSuggestionsPacket", "Sphere", "SphereBox", "SpherePoints", "SphericalBesselJ", "SphericalBesselY", "SphericalHankelH1", "SphericalHankelH2", "SphericalHarmonicY", "SphericalPlot3D", "SphericalRegion", "SphericalShell", "SpheroidalEigenvalue", "SpheroidalJoiningFactor", "SpheroidalPS", "SpheroidalPSPrime", "SpheroidalQS", "SpheroidalQSPrime", "SpheroidalRadialFactor", "SpheroidalS1", "SpheroidalS1Prime", "SpheroidalS2", "SpheroidalS2Prime", "Splice", "SplicedDistribution", "SplineClosed", "SplineDegree", "SplineKnots", "SplineWeights", "Split", "SplitBy", "SpokenString", "Sqrt", "SqrtBox", "SqrtBoxOptions", "Square", "SquaredEuclideanDistance", "SquareFreeQ", "SquareIntersection", "SquareMatrixQ", "SquareRepeatingElement", "SquaresR", "SquareSubset", "SquareSubsetEqual", "SquareSuperset", "SquareSupersetEqual", "SquareUnion", "SquareWave", "SSSTriangle", "StabilityMargins", "StabilityMarginsStyle", "StableDistribution", "Stack", "StackBegin", "StackComplete", "StackedDateListPlot", "StackedListPlot", "StackInhibit", "StadiumShape", "StandardAtmosphereData", "StandardDeviation", "StandardDeviationFilter", "StandardForm", "Standardize", "Standardized", "StandardOceanData", "StandbyDistribution", "Star", "StarClusterData", "StarData", "StarGraph", "StartAsynchronousTask", "StartExternalSession", "StartingStepSize", "StartOfLine", "StartOfString", "StartProcess", "StartScheduledTask", "StartupSound", "StartWebSession", "StateDimensions", "StateFeedbackGains", "StateOutputEstimator", "StateResponse", "StateSpaceModel", "StateSpaceRealization", "StateSpaceTransform", "StateTransformationLinearize", "StationaryDistribution", "StationaryWaveletPacketTransform", "StationaryWaveletTransform", "StatusArea", "StatusCentrality", "StepMonitor", "StereochemistryElements", "StieltjesGamma", "StippleShading", "StirlingS1", "StirlingS2", "StopAsynchronousTask", "StoppingPowerData", "StopScheduledTask", "StrataVariables", "StratonovichProcess", "StreamColorFunction", "StreamColorFunctionScaling", "StreamDensityPlot", "StreamMarkers", "StreamPlot", "StreamPoints", "StreamPosition", "Streams", "StreamScale", "StreamStyle", "String", "StringBreak", "StringByteCount", "StringCases", "StringContainsQ", "StringCount", "StringDelete", "StringDrop", "StringEndsQ", "StringExpression", "StringExtract", "StringForm", "StringFormat", "StringFreeQ", "StringInsert", "StringJoin", "StringLength", "StringMatchQ", "StringPadLeft", "StringPadRight", "StringPart", "StringPartition", "StringPosition", "StringQ", "StringRepeat", "StringReplace", "StringReplaceList", "StringReplacePart", "StringReverse", "StringRiffle", "StringRotateLeft", "StringRotateRight", "StringSkeleton", "StringSplit", "StringStartsQ", "StringTake", "StringTemplate", "StringToByteArray", "StringToStream", "StringTrim", "StripBoxes", "StripOnInput", "StripWrapperBoxes", "StrokeForm", "StructuralImportance", "StructuredArray", "StructuredArrayHeadQ", "StructuredSelection", "StruveH", "StruveL", "Stub", "StudentTDistribution", "Style", "StyleBox", "StyleBoxAutoDelete", "StyleData", "StyleDefinitions", "StyleForm", "StyleHints", "StyleKeyMapping", "StyleMenuListing", "StyleNameDialogSettings", "StyleNames", "StylePrint", "StyleSheetPath", "Subdivide", "Subfactorial", "Subgraph", "SubMinus", "SubPlus", "SubresultantPolynomialRemainders", "SubresultantPolynomials", "Subresultants", "Subscript", "SubscriptBox", "SubscriptBoxOptions", "Subscripted", "Subsequences", "Subset", "SubsetCases", "SubsetCount", "SubsetEqual", "SubsetMap", "SubsetPosition", "SubsetQ", "SubsetReplace", "Subsets", "SubStar", "SubstitutionSystem", "Subsuperscript", "SubsuperscriptBox", "SubsuperscriptBoxOptions", "SubtitleEncoding", "SubtitleTracks", "Subtract", "SubtractFrom", "SubtractSides", "SubValues", "Succeeds", "SucceedsEqual", "SucceedsSlantEqual", "SucceedsTilde", "Success", "SuchThat", "Sum", "SumConvergence", "SummationLayer", "Sunday", "SunPosition", "Sunrise", "Sunset", "SuperDagger", "SuperMinus", "SupernovaData", "SuperPlus", "Superscript", "SuperscriptBox", "SuperscriptBoxOptions", "Superset", "SupersetEqual", "SuperStar", "Surd", "SurdForm", "SurfaceAppearance", "SurfaceArea", "SurfaceColor", "SurfaceData", "SurfaceGraphics", "SurvivalDistribution", "SurvivalFunction", "SurvivalModel", "SurvivalModelFit", "SuspendPacket", "SuzukiDistribution", "SuzukiGroupSuz", "SwatchLegend", "Switch", "Symbol", "SymbolName", "SymletWavelet", "Symmetric", "SymmetricGroup", "SymmetricKey", "SymmetricMatrixQ", "SymmetricPolynomial", "SymmetricReduction", "Symmetrize", "SymmetrizedArray", "SymmetrizedArrayRules", "SymmetrizedDependentComponents", "SymmetrizedIndependentComponents", "SymmetrizedReplacePart", "SynchronousInitialization", "SynchronousUpdating", "Synonyms", "Syntax", "SyntaxForm", "SyntaxInformation", "SyntaxLength", "SyntaxPacket", "SyntaxQ", "SynthesizeMissingValues", "SystemCredential", "SystemCredentialData", "SystemCredentialKey", "SystemCredentialKeys", "SystemCredentialStoreObject", "SystemDialogInput", "SystemException", "SystemGet", "SystemHelpPath", "SystemInformation", "SystemInformationData", "SystemInstall", "SystemModel", "SystemModeler", "SystemModelExamples", "SystemModelLinearize", "SystemModelParametricSimulate", "SystemModelPlot", "SystemModelProgressReporting", "SystemModelReliability", "SystemModels", "SystemModelSimulate", "SystemModelSimulateSensitivity", "SystemModelSimulationData", "SystemOpen", "SystemOptions", "SystemProcessData", "SystemProcesses", "SystemsConnectionsModel", "SystemsModelDelay", "SystemsModelDelayApproximate", "SystemsModelDelete", "SystemsModelDimensions", "SystemsModelExtract", "SystemsModelFeedbackConnect", "SystemsModelLabels", "SystemsModelLinearity", "SystemsModelMerge", "SystemsModelOrder", "SystemsModelParallelConnect", "SystemsModelSeriesConnect", "SystemsModelStateFeedbackConnect", "SystemsModelVectorRelativeOrders", "SystemStub", "SystemTest", "Tab", "TabFilling", "Table", "TableAlignments", "TableDepth", "TableDirections", "TableForm", "TableHeadings", "TableSpacing", "TableView", "TableViewBox", "TableViewBoxBackground", "TableViewBoxItemSize", "TableViewBoxOptions", "TabSpacings", "TabView", "TabViewBox", "TabViewBoxOptions", "TagBox", "TagBoxNote", "TagBoxOptions", "TaggingRules", "TagSet", "TagSetDelayed", "TagStyle", "TagUnset", "Take", "TakeDrop", "TakeLargest", "TakeLargestBy", "TakeList", "TakeSmallest", "TakeSmallestBy", "TakeWhile", "Tally", "Tan", "Tanh", "TargetDevice", "TargetFunctions", "TargetSystem", "TargetUnits", "TaskAbort", "TaskExecute", "TaskObject", "TaskRemove", "TaskResume", "Tasks", "TaskSuspend", "TaskWait", "TautologyQ", "TelegraphProcess", "TemplateApply", "TemplateArgBox", "TemplateBox", "TemplateBoxOptions", "TemplateEvaluate", "TemplateExpression", "TemplateIf", "TemplateObject", "TemplateSequence", "TemplateSlot", "TemplateSlotSequence", "TemplateUnevaluated", "TemplateVerbatim", "TemplateWith", "TemporalData", "TemporalRegularity", "Temporary", "TemporaryVariable", "TensorContract", "TensorDimensions", "TensorExpand", "TensorProduct", "TensorQ", "TensorRank", "TensorReduce", "TensorSymmetry", "TensorTranspose", "TensorWedge", "TestID", "TestReport", "TestReportObject", "TestResultObject", "Tetrahedron", "TetrahedronBox", "TetrahedronBoxOptions", "TeXForm", "TeXSave", "Text", "Text3DBox", "Text3DBoxOptions", "TextAlignment", "TextBand", "TextBoundingBox", "TextBox", "TextCases", "TextCell", "TextClipboardType", "TextContents", "TextData", "TextElement", "TextForm", "TextGrid", "TextJustification", "TextLine", "TextPacket", "TextParagraph", "TextPosition", "TextRecognize", "TextSearch", "TextSearchReport", "TextSentences", "TextString", "TextStructure", "TextStyle", "TextTranslation", "Texture", "TextureCoordinateFunction", "TextureCoordinateScaling", "TextWords", "Therefore", "ThermodynamicData", "ThermometerGauge", "Thick", "Thickness", "Thin", "Thinning", "ThisLink", "ThompsonGroupTh", "Thread", "ThreadingLayer", "ThreeJSymbol", "Threshold", "Through", "Throw", "ThueMorse", "Thumbnail", "Thursday", "Ticks", "TicksStyle", "TideData", "Tilde", "TildeEqual", "TildeFullEqual", "TildeTilde", "TimeConstrained", "TimeConstraint", "TimeDirection", "TimeFormat", "TimeGoal", "TimelinePlot", "TimeObject", "TimeObjectQ", "TimeRemaining", "Times", "TimesBy", "TimeSeries", "TimeSeriesAggregate", "TimeSeriesForecast", "TimeSeriesInsert", "TimeSeriesInvertibility", "TimeSeriesMap", "TimeSeriesMapThread", "TimeSeriesModel", "TimeSeriesModelFit", "TimeSeriesResample", "TimeSeriesRescale", "TimeSeriesShift", "TimeSeriesThread", "TimeSeriesWindow", "TimeUsed", "TimeValue", "TimeWarpingCorrespondence", "TimeWarpingDistance", "TimeZone", "TimeZoneConvert", "TimeZoneOffset", "Timing", "Tiny", "TitleGrouping", "TitsGroupT", "ToBoxes", "ToCharacterCode", "ToColor", "ToContinuousTimeModel", "ToDate", "Today", "ToDiscreteTimeModel", "ToEntity", "ToeplitzMatrix", "ToExpression", "ToFileName", "Together", "Toggle", "ToggleFalse", "Toggler", "TogglerBar", "TogglerBox", "TogglerBoxOptions", "ToHeldExpression", "ToInvertibleTimeSeries", "TokenWords", "Tolerance", "ToLowerCase", "Tomorrow", "ToNumberField", "TooBig", "Tooltip", "TooltipBox", "TooltipBoxOptions", "TooltipDelay", "TooltipStyle", "ToonShading", "Top", "TopHatTransform", "ToPolarCoordinates", "TopologicalSort", "ToRadicals", "ToRules", "ToSphericalCoordinates", "ToString", "Total", "TotalHeight", "TotalLayer", "TotalVariationFilter", "TotalWidth", "TouchPosition", "TouchscreenAutoZoom", "TouchscreenControlPlacement", "ToUpperCase", "Tr", "Trace", "TraceAbove", "TraceAction", "TraceBackward", "TraceDepth", "TraceDialog", "TraceForward", "TraceInternal", "TraceLevel", "TraceOff", "TraceOn", "TraceOriginal", "TracePrint", "TraceScan", "TrackedSymbols", "TrackingFunction", "TracyWidomDistribution", "TradingChart", "TraditionalForm", "TraditionalFunctionNotation", "TraditionalNotation", "TraditionalOrder", "TrainingProgressCheckpointing", "TrainingProgressFunction", "TrainingProgressMeasurements", "TrainingProgressReporting", "TrainingStoppingCriterion", "TrainingUpdateSchedule", "TransferFunctionCancel", "TransferFunctionExpand", "TransferFunctionFactor", "TransferFunctionModel", "TransferFunctionPoles", "TransferFunctionTransform", "TransferFunctionZeros", "TransformationClass", "TransformationFunction", "TransformationFunctions", "TransformationMatrix", "TransformedDistribution", "TransformedField", "TransformedProcess", "TransformedRegion", "TransitionDirection", "TransitionDuration", "TransitionEffect", "TransitiveClosureGraph", "TransitiveReductionGraph", "Translate", "TranslationOptions", "TranslationTransform", "Transliterate", "Transparent", "TransparentColor", "Transpose", "TransposeLayer", "TrapSelection", "TravelDirections", "TravelDirectionsData", "TravelDistance", "TravelDistanceList", "TravelMethod", "TravelTime", "TreeForm", "TreeGraph", "TreeGraphQ", "TreePlot", "TrendStyle", "Triangle", "TriangleCenter", "TriangleConstruct", "TriangleMeasurement", "TriangleWave", "TriangularDistribution", "TriangulateMesh", "Trig", "TrigExpand", "TrigFactor", "TrigFactorList", "Trigger", "TrigReduce", "TrigToExp", "TrimmedMean", "TrimmedVariance", "TropicalStormData", "True", "TrueQ", "TruncatedDistribution", "TruncatedPolyhedron", "TsallisQExponentialDistribution", "TsallisQGaussianDistribution", "TTest", "Tube", "TubeBezierCurveBox", "TubeBezierCurveBoxOptions", "TubeBox", "TubeBoxOptions", "TubeBSplineCurveBox", "TubeBSplineCurveBoxOptions", "Tuesday", "TukeyLambdaDistribution", "TukeyWindow", "TunnelData", "Tuples", "TuranGraph", "TuringMachine", "TuttePolynomial", "TwoWayRule", "Typed", "TypeSpecifier", "UnateQ", "Uncompress", "UnconstrainedParameters", "Undefined", "UnderBar", "Underflow", "Underlined", "Underoverscript", "UnderoverscriptBox", "UnderoverscriptBoxOptions", "Underscript", "UnderscriptBox", "UnderscriptBoxOptions", "UnderseaFeatureData", "UndirectedEdge", "UndirectedGraph", "UndirectedGraphQ", "UndoOptions", "UndoTrackedVariables", "Unequal", "UnequalTo", "Unevaluated", "UniformDistribution", "UniformGraphDistribution", "UniformPolyhedron", "UniformSumDistribution", "Uninstall", "Union", "UnionedEntityClass", "UnionPlus", "Unique", "UnitaryMatrixQ", "UnitBox", "UnitConvert", "UnitDimensions", "Unitize", "UnitRootTest", "UnitSimplify", "UnitStep", "UnitSystem", "UnitTriangle", "UnitVector", "UnitVectorLayer", "UnityDimensions", "UniverseModelData", "UniversityData", "UnixTime", "Unprotect", "UnregisterExternalEvaluator", "UnsameQ", "UnsavedVariables", "Unset", "UnsetShared", "UntrackedVariables", "Up", "UpArrow", "UpArrowBar", "UpArrowDownArrow", "Update", "UpdateDynamicObjects", "UpdateDynamicObjectsSynchronous", "UpdateInterval", "UpdatePacletSites", "UpdateSearchIndex", "UpDownArrow", "UpEquilibrium", "UpperCaseQ", "UpperLeftArrow", "UpperRightArrow", "UpperTriangularize", "UpperTriangularMatrixQ", "Upsample", "UpSet", "UpSetDelayed", "UpTee", "UpTeeArrow", "UpTo", "UpValues", "URL", "URLBuild", "URLDecode", "URLDispatcher", "URLDownload", "URLDownloadSubmit", "URLEncode", "URLExecute", "URLExpand", "URLFetch", "URLFetchAsynchronous", "URLParse", "URLQueryDecode", "URLQueryEncode", "URLRead", "URLResponseTime", "URLSave", "URLSaveAsynchronous", "URLShorten", "URLSubmit", "UseGraphicsRange", "UserDefinedWavelet", "Using", "UsingFrontEnd", "UtilityFunction", "V2Get", "ValenceErrorHandling", "ValidationLength", "ValidationSet", "Value", "ValueBox", "ValueBoxOptions", "ValueDimensions", "ValueForm", "ValuePreprocessingFunction", "ValueQ", "Values", "ValuesData", "Variables", "Variance", "VarianceEquivalenceTest", "VarianceEstimatorFunction", "VarianceGammaDistribution", "VarianceTest", "VectorAngle", "VectorAround", "VectorAspectRatio", "VectorColorFunction", "VectorColorFunctionScaling", "VectorDensityPlot", "VectorGlyphData", "VectorGreater", "VectorGreaterEqual", "VectorLess", "VectorLessEqual", "VectorMarkers", "VectorPlot", "VectorPlot3D", "VectorPoints", "VectorQ", "VectorRange", "Vectors", "VectorScale", "VectorScaling", "VectorSizes", "VectorStyle", "Vee", "Verbatim", "Verbose", "VerboseConvertToPostScriptPacket", "VerificationTest", "VerifyConvergence", "VerifyDerivedKey", "VerifyDigitalSignature", "VerifyFileSignature", "VerifyInterpretation", "VerifySecurityCertificates", "VerifySolutions", "VerifyTestAssumptions", "Version", "VersionedPreferences", "VersionNumber", "VertexAdd", "VertexCapacity", "VertexColors", "VertexComponent", "VertexConnectivity", "VertexContract", "VertexCoordinateRules", "VertexCoordinates", "VertexCorrelationSimilarity", "VertexCosineSimilarity", "VertexCount", "VertexCoverQ", "VertexDataCoordinates", "VertexDegree", "VertexDelete", "VertexDiceSimilarity", "VertexEccentricity", "VertexInComponent", "VertexInDegree", "VertexIndex", "VertexJaccardSimilarity", "VertexLabeling", "VertexLabels", "VertexLabelStyle", "VertexList", "VertexNormals", "VertexOutComponent", "VertexOutDegree", "VertexQ", "VertexRenderingFunction", "VertexReplace", "VertexShape", "VertexShapeFunction", "VertexSize", "VertexStyle", "VertexTextureCoordinates", "VertexWeight", "VertexWeightedGraphQ", "Vertical", "VerticalBar", "VerticalForm", "VerticalGauge", "VerticalSeparator", "VerticalSlider", "VerticalTilde", "Video", "VideoEncoding", "VideoExtractFrames", "VideoFrameList", "VideoFrameMap", "VideoPause", "VideoPlay", "VideoQ", "VideoStop", "VideoStream", "VideoStreams", "VideoTimeSeries", "VideoTracks", "VideoTrim", "ViewAngle", "ViewCenter", "ViewMatrix", "ViewPoint", "ViewPointSelectorSettings", "ViewPort", "ViewProjection", "ViewRange", "ViewVector", "ViewVertical", "VirtualGroupData", "Visible", "VisibleCell", "VoiceStyleData", "VoigtDistribution", "VolcanoData", "Volume", "VonMisesDistribution", "VoronoiMesh", "WaitAll", "WaitAsynchronousTask", "WaitNext", "WaitUntil", "WakebyDistribution", "WalleniusHypergeometricDistribution", "WaringYuleDistribution", "WarpingCorrespondence", "WarpingDistance", "WatershedComponents", "WatsonUSquareTest", "WattsStrogatzGraphDistribution", "WaveletBestBasis", "WaveletFilterCoefficients", "WaveletImagePlot", "WaveletListPlot", "WaveletMapIndexed", "WaveletMatrixPlot", "WaveletPhi", "WaveletPsi", "WaveletScale", "WaveletScalogram", "WaveletThreshold", "WeaklyConnectedComponents", "WeaklyConnectedGraphComponents", "WeaklyConnectedGraphQ", "WeakStationarity", "WeatherData", "WeatherForecastData", "WebAudioSearch", "WebElementObject", "WeberE", "WebExecute", "WebImage", "WebImageSearch", "WebSearch", "WebSessionObject", "WebSessions", "WebWindowObject", "Wedge", "Wednesday", "WeibullDistribution", "WeierstrassE1", "WeierstrassE2", "WeierstrassE3", "WeierstrassEta1", "WeierstrassEta2", "WeierstrassEta3", "WeierstrassHalfPeriods", "WeierstrassHalfPeriodW1", "WeierstrassHalfPeriodW2", "WeierstrassHalfPeriodW3", "WeierstrassInvariantG2", "WeierstrassInvariantG3", "WeierstrassInvariants", "WeierstrassP", "WeierstrassPPrime", "WeierstrassSigma", "WeierstrassZeta", "WeightedAdjacencyGraph", "WeightedAdjacencyMatrix", "WeightedData", "WeightedGraphQ", "Weights", "WelchWindow", "WheelGraph", "WhenEvent", "Which", "While", "White", "WhiteNoiseProcess", "WhitePoint", "Whitespace", "WhitespaceCharacter", "WhittakerM", "WhittakerW", "WienerFilter", "WienerProcess", "WignerD", "WignerSemicircleDistribution", "WikidataData", "WikidataSearch", "WikipediaData", "WikipediaSearch", "WilksW", "WilksWTest", "WindDirectionData", "WindingCount", "WindingPolygon", "WindowClickSelect", "WindowElements", "WindowFloating", "WindowFrame", "WindowFrameElements", "WindowMargins", "WindowMovable", "WindowOpacity", "WindowPersistentStyles", "WindowSelected", "WindowSize", "WindowStatusArea", "WindowTitle", "WindowToolbars", "WindowWidth", "WindSpeedData", "WindVectorData", "WinsorizedMean", "WinsorizedVariance", "WishartMatrixDistribution", "With", "WolframAlpha", "WolframAlphaDate", "WolframAlphaQuantity", "WolframAlphaResult", "WolframLanguageData", "Word", "WordBoundary", "WordCharacter", "WordCloud", "WordCount", "WordCounts", "WordData", "WordDefinition", "WordFrequency", "WordFrequencyData", "WordList", "WordOrientation", "WordSearch", "WordSelectionFunction", "WordSeparators", "WordSpacings", "WordStem", "WordTranslation", "WorkingPrecision", "WrapAround", "Write", "WriteLine", "WriteString", "Wronskian", "XMLElement", "XMLObject", "XMLTemplate", "Xnor", "Xor", "XYZColor", "Yellow", "Yesterday", "YuleDissimilarity", "ZernikeR", "ZeroSymmetric", "ZeroTest", "ZeroWidthTimes", "Zeta", "ZetaZero", "ZIPCodeData", "ZipfDistribution", "ZoomCenter", "ZoomFactor", "ZTest", "ZTransform", "$Aborted", "$ActivationGroupID", "$ActivationKey", "$ActivationUserRegistered", "$AddOnsDirectory", "$AllowDataUpdates", "$AllowExternalChannelFunctions", "$AllowInternet", "$AssertFunction", "$Assumptions", "$AsynchronousTask", "$AudioDecoders", "$AudioEncoders", "$AudioInputDevices", "$AudioOutputDevices", "$BaseDirectory", "$BasePacletsDirectory", "$BatchInput", "$BatchOutput", "$BlockchainBase", "$BoxForms", "$ByteOrdering", "$CacheBaseDirectory", "$Canceled", "$ChannelBase", "$CharacterEncoding", "$CharacterEncodings", "$CloudAccountName", "$CloudBase", "$CloudConnected", "$CloudConnection", "$CloudCreditsAvailable", "$CloudEvaluation", "$CloudExpressionBase", "$CloudObjectNameFormat", "$CloudObjectURLType", "$CloudRootDirectory", "$CloudSymbolBase", "$CloudUserID", "$CloudUserUUID", "$CloudVersion", "$CloudVersionNumber", "$CloudWolframEngineVersionNumber", "$CommandLine", "$CompilationTarget", "$ConditionHold", "$ConfiguredKernels", "$Context", "$ContextPath", "$ControlActiveSetting", "$Cookies", "$CookieStore", "$CreationDate", "$CurrentLink", "$CurrentTask", "$CurrentWebSession", "$DataStructures", "$DateStringFormat", "$DefaultAudioInputDevice", "$DefaultAudioOutputDevice", "$DefaultFont", "$DefaultFrontEnd", "$DefaultImagingDevice", "$DefaultLocalBase", "$DefaultMailbox", "$DefaultNetworkInterface", "$DefaultPath", "$DefaultProxyRules", "$DefaultSystemCredentialStore", "$Display", "$DisplayFunction", "$DistributedContexts", "$DynamicEvaluation", "$Echo", "$EmbedCodeEnvironments", "$EmbeddableServices", "$EntityStores", "$Epilog", "$EvaluationCloudBase", "$EvaluationCloudObject", "$EvaluationEnvironment", "$ExportFormats", "$ExternalIdentifierTypes", "$ExternalStorageBase", "$Failed", "$FinancialDataSource", "$FontFamilies", "$FormatType", "$FrontEnd", "$FrontEndSession", "$GeoEntityTypes", "$GeoLocation", "$GeoLocationCity", "$GeoLocationCountry", "$GeoLocationPrecision", "$GeoLocationSource", "$HistoryLength", "$HomeDirectory", "$HTMLExportRules", "$HTTPCookies", "$HTTPRequest", "$IgnoreEOF", "$ImageFormattingWidth", "$ImageResolution", "$ImagingDevice", "$ImagingDevices", "$ImportFormats", "$IncomingMailSettings", "$InitialDirectory", "$Initialization", "$InitializationContexts", "$Input", "$InputFileName", "$InputStreamMethods", "$Inspector", "$InstallationDate", "$InstallationDirectory", "$InterfaceEnvironment", "$InterpreterTypes", "$IterationLimit", "$KernelCount", "$KernelID", "$Language", "$LaunchDirectory", "$LibraryPath", "$LicenseExpirationDate", "$LicenseID", "$LicenseProcesses", "$LicenseServer", "$LicenseSubprocesses", "$LicenseType", "$Line", "$Linked", "$LinkSupported", "$LoadedFiles", "$LocalBase", "$LocalSymbolBase", "$MachineAddresses", "$MachineDomain", "$MachineDomains", "$MachineEpsilon", "$MachineID", "$MachineName", "$MachinePrecision", "$MachineType", "$MaxExtraPrecision", "$MaxLicenseProcesses", "$MaxLicenseSubprocesses", "$MaxMachineNumber", "$MaxNumber", "$MaxPiecewiseCases", "$MaxPrecision", "$MaxRootDegree", "$MessageGroups", "$MessageList", "$MessagePrePrint", "$Messages", "$MinMachineNumber", "$MinNumber", "$MinorReleaseNumber", "$MinPrecision", "$MobilePhone", "$ModuleNumber", "$NetworkConnected", "$NetworkInterfaces", "$NetworkLicense", "$NewMessage", "$NewSymbol", "$NotebookInlineStorageLimit", "$Notebooks", "$NoValue", "$NumberMarks", "$Off", "$OperatingSystem", "$Output", "$OutputForms", "$OutputSizeLimit", "$OutputStreamMethods", "$Packages", "$ParentLink", "$ParentProcessID", "$PasswordFile", "$PatchLevelID", "$Path", "$PathnameSeparator", "$PerformanceGoal", "$Permissions", "$PermissionsGroupBase", "$PersistenceBase", "$PersistencePath", "$PipeSupported", "$PlotTheme", "$Post", "$Pre", "$PreferencesDirectory", "$PreInitialization", "$PrePrint", "$PreRead", "$PrintForms", "$PrintLiteral", "$Printout3DPreviewer", "$ProcessID", "$ProcessorCount", "$ProcessorType", "$ProductInformation", "$ProgramName", "$PublisherID", "$RandomState", "$RecursionLimit", "$RegisteredDeviceClasses", "$RegisteredUserName", "$ReleaseNumber", "$RequesterAddress", "$RequesterWolframID", "$RequesterWolframUUID", "$RootDirectory", "$ScheduledTask", "$ScriptCommandLine", "$ScriptInputString", "$SecuredAuthenticationKeyTokens", "$ServiceCreditsAvailable", "$Services", "$SessionID", "$SetParentLink", "$SharedFunctions", "$SharedVariables", "$SoundDisplay", "$SoundDisplayFunction", "$SourceLink", "$SSHAuthentication", "$SubtitleDecoders", "$SubtitleEncoders", "$SummaryBoxDataSizeLimit", "$SuppressInputFormHeads", "$SynchronousEvaluation", "$SyntaxHandler", "$System", "$SystemCharacterEncoding", "$SystemCredentialStore", "$SystemID", "$SystemMemory", "$SystemShell", "$SystemTimeZone", "$SystemWordLength", "$TemplatePath", "$TemporaryDirectory", "$TemporaryPrefix", "$TestFileName", "$TextStyle", "$TimedOut", "$TimeUnit", "$TimeZone", "$TimeZoneEntity", "$TopDirectory", "$TraceOff", "$TraceOn", "$TracePattern", "$TracePostAction", "$TracePreAction", "$UnitSystem", "$Urgent", "$UserAddOnsDirectory", "$UserAgentLanguages", "$UserAgentMachine", "$UserAgentName", "$UserAgentOperatingSystem", "$UserAgentString", "$UserAgentVersion", "$UserBaseDirectory", "$UserBasePacletsDirectory", "$UserDocumentsDirectory", "$Username", "$UserName", "$UserURLBase", "$Version", "$VersionNumber", "$VideoDecoders", "$VideoEncoders", "$VoiceStyles", "$WolframDocumentsDirectory", "$WolframID", "$WolframUUID"];
    function t(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    function i(e) {
        return o("(", e, ")?")
    }
    function o(...e) {
        return e.map((e=>t(e))).join("")
    }
    function a(...e) {
        return "(" + e.map((e=>t(e))).join("|") + ")"
    }
    return t=>{
        const n = a(o(/([2-9]|[1-2]\d|[3][0-5])\^\^/, /(\w*\.\w+|\w+\.\w*|\w+)/), /(\d*\.\d+|\d+\.\d*|\d+)/)
          , r = {
            className: "number",
            relevance: 0,
            begin: o(n, i(a(/``[+-]?(\d*\.\d+|\d+\.\d*|\d+)/, /`([+-]?(\d*\.\d+|\d+\.\d*|\d+))?/)), i(/\*\^[+-]?\d+/))
        }
          , l = /[a-zA-Z$][a-zA-Z0-9$]*/
          , s = new Set(e)
          , c = {
            variants: [{
                className: "builtin-symbol",
                begin: l,
                "on:begin": (e,t)=>{
                    s.has(e[0]) || t.ignoreMatch()
                }
            }, {
                className: "symbol",
                relevance: 0,
                begin: l
            }]
        }
          , u = {
            className: "message-name",
            relevance: 0,
            begin: o("::", l)
        };
        return {
            name: "Mathematica",
            aliases: ["mma", "wl"],
            classNameAliases: {
                brace: "punctuation",
                pattern: "type",
                slot: "type",
                symbol: "variable",
                "named-character": "variable",
                "builtin-symbol": "built_in",
                "message-name": "string"
            },
            contains: [t.COMMENT(/\(\*/, /\*\)/, {
                contains: ["self"]
            }), {
                className: "pattern",
                relevance: 0,
                begin: /([a-zA-Z$][a-zA-Z0-9$]*)?_+([a-zA-Z$][a-zA-Z0-9$]*)?/
            }, {
                className: "slot",
                relevance: 0,
                begin: /#[a-zA-Z$][a-zA-Z0-9$]*|#+[0-9]?/
            }, u, c, {
                className: "named-character",
                begin: /\\\[[$a-zA-Z][$a-zA-Z0-9]+\]/
            }, t.QUOTE_STRING_MODE, r, {
                className: "operator",
                relevance: 0,
                begin: /[+\-*/,;.:@~=><&|_`'^?!%]+/
            }, {
                className: "brace",
                relevance: 0,
                begin: /[[\](){}]/
            }]
        }
    }
}
)());
hljs.registerLanguage("matlab", (()=>{
    "use strict";
    return e=>{
        var a = {
            relevance: 0,
            contains: [{
                begin: "('|\\.')+"
            }]
        };
        return {
            name: "Matlab",
            keywords: {
                keyword: "arguments break case catch classdef continue else elseif end enumeration events for function global if methods otherwise parfor persistent properties return spmd switch try while",
                built_in: "sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i|0 inf nan isnan isinf isfinite j|0 why compan gallery hadamard hankel hilb invhilb magic pascal rosser toeplitz vander wilkinson max min nanmax nanmin mean nanmean type table readtable writetable sortrows sort figure plot plot3 scatter scatter3 cellfun legend intersect ismember procrustes hold num2cell "
            },
            illegal: '(//|"|#|/\\*|\\s+/\\w+)',
            contains: [{
                className: "function",
                beginKeywords: "function",
                end: "$",
                contains: [e.UNDERSCORE_TITLE_MODE, {
                    className: "params",
                    variants: [{
                        begin: "\\(",
                        end: "\\)"
                    }, {
                        begin: "\\[",
                        end: "\\]"
                    }]
                }]
            }, {
                className: "built_in",
                begin: /true|false/,
                relevance: 0,
                starts: a
            }, {
                begin: "[a-zA-Z][a-zA-Z_0-9]*('|\\.')+",
                relevance: 0
            }, {
                className: "number",
                begin: e.C_NUMBER_RE,
                relevance: 0,
                starts: a
            }, {
                className: "string",
                begin: "'",
                end: "'",
                contains: [e.BACKSLASH_ESCAPE, {
                    begin: "''"
                }]
            }, {
                begin: /\]|\}|\)/,
                relevance: 0,
                starts: a
            }, {
                className: "string",
                begin: '"',
                end: '"',
                contains: [e.BACKSLASH_ESCAPE, {
                    begin: '""'
                }],
                starts: a
            }, e.COMMENT("^\\s*%\\{\\s*$", "^\\s*%\\}\\s*$"), e.COMMENT("%", "$")]
        }
    }
}
)());
hljs.registerLanguage("csharp", (()=>{
    "use strict";
    return e=>{
        const n = {
            keyword: ["abstract", "as", "base", "break", "case", "class", "const", "continue", "do", "else", "event", "explicit", "extern", "finally", "fixed", "for", "foreach", "goto", "if", "implicit", "in", "interface", "internal", "is", "lock", "namespace", "new", "operator", "out", "override", "params", "private", "protected", "public", "readonly", "record", "ref", "return", "sealed", "sizeof", "stackalloc", "static", "struct", "switch", "this", "throw", "try", "typeof", "unchecked", "unsafe", "using", "virtual", "void", "volatile", "while"].concat(["add", "alias", "and", "ascending", "async", "await", "by", "descending", "equals", "from", "get", "global", "group", "init", "into", "join", "let", "nameof", "not", "notnull", "on", "or", "orderby", "partial", "remove", "select", "set", "unmanaged", "value|0", "var", "when", "where", "with", "yield"]),
            built_in: ["bool", "byte", "char", "decimal", "delegate", "double", "dynamic", "enum", "float", "int", "long", "nint", "nuint", "object", "sbyte", "short", "string", "ulong", "uint", "ushort"],
            literal: ["default", "false", "null", "true"]
        }
          , a = e.inherit(e.TITLE_MODE, {
            begin: "[a-zA-Z](\\.?\\w)*"
        })
          , i = {
            className: "number",
            variants: [{
                begin: "\\b(0b[01']+)"
            }, {
                begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)(u|U|l|L|ul|UL|f|F|b|B)"
            }, {
                begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }],
            relevance: 0
        }
          , s = {
            className: "string",
            begin: '@"',
            end: '"',
            contains: [{
                begin: '""'
            }]
        }
          , t = e.inherit(s, {
            illegal: /\n/
        })
          , r = {
            className: "subst",
            begin: /\{/,
            end: /\}/,
            keywords: n
        }
          , l = e.inherit(r, {
            illegal: /\n/
        })
          , c = {
            className: "string",
            begin: /\$"/,
            end: '"',
            illegal: /\n/,
            contains: [{
                begin: /\{\{/
            }, {
                begin: /\}\}/
            }, e.BACKSLASH_ESCAPE, l]
        }
          , o = {
            className: "string",
            begin: /\$@"/,
            end: '"',
            contains: [{
                begin: /\{\{/
            }, {
                begin: /\}\}/
            }, {
                begin: '""'
            }, r]
        }
          , d = e.inherit(o, {
            illegal: /\n/,
            contains: [{
                begin: /\{\{/
            }, {
                begin: /\}\}/
            }, {
                begin: '""'
            }, l]
        });
        r.contains = [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, i, e.C_BLOCK_COMMENT_MODE],
        l.contains = [d, c, t, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, i, e.inherit(e.C_BLOCK_COMMENT_MODE, {
            illegal: /\n/
        })];
        const g = {
            variants: [o, c, s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
        }
          , E = {
            begin: "<",
            end: ">",
            contains: [{
                beginKeywords: "in out"
            }, a]
        }
          , _ = e.IDENT_RE + "(<" + e.IDENT_RE + "(\\s*,\\s*" + e.IDENT_RE + ")*>)?(\\[\\])?"
          , b = {
            begin: "@" + e.IDENT_RE,
            relevance: 0
        };
        return {
            name: "C#",
            aliases: ["cs", "c#"],
            keywords: n,
            illegal: /::/,
            contains: [e.COMMENT("///", "$", {
                returnBegin: !0,
                contains: [{
                    className: "doctag",
                    variants: [{
                        begin: "///",
                        relevance: 0
                    }, {
                        begin: "\x3c!--|--\x3e"
                    }, {
                        begin: "</?",
                        end: ">"
                    }]
                }]
            }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                className: "meta",
                begin: "#",
                end: "$",
                keywords: {
                    "meta-keyword": "if else elif endif define undef warning error line region endregion pragma checksum"
                }
            }, g, i, {
                beginKeywords: "class interface",
                relevance: 0,
                end: /[{;=]/,
                illegal: /[^\s:,]/,
                contains: [{
                    beginKeywords: "where class"
                }, a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, {
                beginKeywords: "namespace",
                relevance: 0,
                end: /[{;=]/,
                illegal: /[^\s:]/,
                contains: [a, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, {
                beginKeywords: "record",
                relevance: 0,
                end: /[{;=]/,
                illegal: /[^\s:]/,
                contains: [a, E, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, {
                className: "meta",
                begin: "^\\s*\\[",
                excludeBegin: !0,
                end: "\\]",
                excludeEnd: !0,
                contains: [{
                    className: "meta-string",
                    begin: /"/,
                    end: /"/
                }]
            }, {
                beginKeywords: "new return throw await else",
                relevance: 0
            }, {
                className: "function",
                begin: "(" + _ + "\\s+)+" + e.IDENT_RE + "\\s*(<.+>\\s*)?\\(",
                returnBegin: !0,
                end: /\s*[{;=]/,
                excludeEnd: !0,
                keywords: n,
                contains: [{
                    beginKeywords: "public private protected static internal protected abstract async extern override unsafe virtual new sealed partial",
                    relevance: 0
                }, {
                    begin: e.IDENT_RE + "\\s*(<.+>\\s*)?\\(",
                    returnBegin: !0,
                    contains: [e.TITLE_MODE, E],
                    relevance: 0
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: n,
                    relevance: 0,
                    contains: [g, i, e.C_BLOCK_COMMENT_MODE]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, b]
        }
    }
}
)());
hljs.registerLanguage("lisp", (()=>{
    "use strict";
    return e=>{
        var n = "[a-zA-Z_\\-+\\*\\/<=>&#][a-zA-Z0-9_\\-+*\\/<=>&#!]*"
          , a = "\\|[^]*?\\|"
          , i = "(-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s|D|E|F|L|S)(\\+|-)?\\d+)?"
          , s = {
            className: "literal",
            begin: "\\b(t{1}|nil)\\b"
        }
          , l = {
            className: "number",
            variants: [{
                begin: i,
                relevance: 0
            }, {
                begin: "#(b|B)[0-1]+(/[0-1]+)?"
            }, {
                begin: "#(o|O)[0-7]+(/[0-7]+)?"
            }, {
                begin: "#(x|X)[0-9a-fA-F]+(/[0-9a-fA-F]+)?"
            }, {
                begin: "#(c|C)\\(" + i + " +" + i,
                end: "\\)"
            }]
        }
          , b = e.inherit(e.QUOTE_STRING_MODE, {
            illegal: null
        })
          , g = e.COMMENT(";", "$", {
            relevance: 0
        })
          , r = {
            begin: "\\*",
            end: "\\*"
        }
          , t = {
            className: "symbol",
            begin: "[:&]" + n
        }
          , c = {
            begin: n,
            relevance: 0
        }
          , d = {
            begin: a
        }
          , o = {
            contains: [l, b, r, t, {
                begin: "\\(",
                end: "\\)",
                contains: ["self", s, b, l, c]
            }, c],
            variants: [{
                begin: "['`]\\(",
                end: "\\)"
            }, {
                begin: "\\(quote ",
                end: "\\)",
                keywords: {
                    name: "quote"
                }
            }, {
                begin: "'" + a
            }]
        }
          , v = {
            variants: [{
                begin: "'" + n
            }, {
                begin: "#'" + n + "(::" + n + ")*"
            }]
        }
          , m = {
            begin: "\\(\\s*",
            end: "\\)"
        }
          , u = {
            endsWithParent: !0,
            relevance: 0
        };
        return m.contains = [{
            className: "name",
            variants: [{
                begin: n,
                relevance: 0
            }, {
                begin: a
            }]
        }, u],
        u.contains = [o, v, m, s, l, b, g, r, t, d, c],
        {
            name: "Lisp",
            illegal: /\S/,
            contains: [l, e.SHEBANG(), s, b, g, o, v, m, c]
        }
    }
}
)());
hljs.registerLanguage("diff", (()=>{
    "use strict";
    return e=>({
        name: "Diff",
        aliases: ["patch"],
        contains: [{
            className: "meta",
            relevance: 10,
            variants: [{
                begin: /^@@ +-\d+,\d+ +\+\d+,\d+ +@@/
            }, {
                begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/
            }, {
                begin: /^--- +\d+,\d+ +----$/
            }]
        }, {
            className: "comment",
            variants: [{
                begin: /Index: /,
                end: /$/
            }, {
                begin: /^index/,
                end: /$/
            }, {
                begin: /={3,}/,
                end: /$/
            }, {
                begin: /^-{3}/,
                end: /$/
            }, {
                begin: /^\*{3} /,
                end: /$/
            }, {
                begin: /^\+{3}/,
                end: /$/
            }, {
                begin: /^\*{15}$/
            }, {
                begin: /^diff --git/,
                end: /$/
            }]
        }, {
            className: "addition",
            begin: /^\+/,
            end: /$/
        }, {
            className: "deletion",
            begin: /^-/,
            end: /$/
        }, {
            className: "addition",
            begin: /^!/,
            end: /$/
        }]
    })
}
)());
hljs.registerLanguage("ada", (()=>{
    "use strict";
    return e=>{
        const n = "[A-Za-z](_?[A-Za-z0-9.])*"
          , s = "[]\\{\\}%#'\""
          , a = e.COMMENT("--", "$")
          , r = {
            begin: "\\s+:\\s+",
            end: "\\s*(:=|;|\\)|=>|$)",
            illegal: s,
            contains: [{
                beginKeywords: "loop for declare others",
                endsParent: !0
            }, {
                className: "keyword",
                beginKeywords: "not null constant access function procedure in out aliased exception"
            }, {
                className: "type",
                begin: n,
                endsParent: !0,
                relevance: 0
            }]
        };
        return {
            name: "Ada",
            case_insensitive: !0,
            keywords: {
                keyword: "abort else new return abs elsif not reverse abstract end accept entry select access exception of separate aliased exit or some all others subtype and for out synchronized array function overriding at tagged generic package task begin goto pragma terminate body private then if procedure type case in protected constant interface is raise use declare range delay limited record when delta loop rem while digits renames with do mod requeue xor",
                literal: "True False"
            },
            contains: [a, {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [{
                    begin: /""/,
                    relevance: 0
                }]
            }, {
                className: "string",
                begin: /'.'/
            }, {
                className: "number",
                begin: "\\b(\\d(_|\\d)*#\\w+(\\.\\w+)?#([eE][-+]?\\d(_|\\d)*)?|\\d(_|\\d)*(\\.\\d(_|\\d)*)?([eE][-+]?\\d(_|\\d)*)?)",
                relevance: 0
            }, {
                className: "symbol",
                begin: "'" + n
            }, {
                className: "title",
                begin: "(\\bwith\\s+)?(\\bprivate\\s+)?\\bpackage\\s+(\\bbody\\s+)?",
                end: "(is|$)",
                keywords: "package body",
                excludeBegin: !0,
                excludeEnd: !0,
                illegal: s
            }, {
                begin: "(\\b(with|overriding)\\s+)?\\b(function|procedure)\\s+",
                end: "(\\bis|\\bwith|\\brenames|\\)\\s*;)",
                keywords: "overriding function procedure with is renames return",
                returnBegin: !0,
                contains: [a, {
                    className: "title",
                    begin: "(\\bwith\\s+)?\\b(function|procedure)\\s+",
                    end: "(\\(|\\s+|$)",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    illegal: s
                }, r, {
                    className: "type",
                    begin: "\\breturn\\s+",
                    end: "(\\s+|;|$)",
                    keywords: "return",
                    excludeBegin: !0,
                    excludeEnd: !0,
                    endsParent: !0,
                    illegal: s
                }]
            }, {
                className: "type",
                begin: "\\b(sub)?type\\s+",
                end: "\\s+",
                keywords: "type",
                excludeBegin: !0,
                illegal: s
            }, r]
        }
    }
}
)());
hljs.registerLanguage("pgsql", (()=>{
    "use strict";
    return E=>{
        const T = E.COMMENT("--", "$")
          , N = "\\$([a-zA-Z_]?|[a-zA-Z_][a-zA-Z_0-9]*)\\$"
          , A = "BIGINT INT8 BIGSERIAL SERIAL8 BIT VARYING VARBIT BOOLEAN BOOL BOX BYTEA CHARACTER CHAR VARCHAR CIDR CIRCLE DATE DOUBLE PRECISION FLOAT8 FLOAT INET INTEGER INT INT4 INTERVAL JSON JSONB LINE LSEG|10 MACADDR MACADDR8 MONEY NUMERIC DEC DECIMAL PATH POINT POLYGON REAL FLOAT4 SMALLINT INT2 SMALLSERIAL|10 SERIAL2|10 SERIAL|10 SERIAL4|10 TEXT TIME ZONE TIMETZ|10 TIMESTAMP TIMESTAMPTZ|10 TSQUERY|10 TSVECTOR|10 TXID_SNAPSHOT|10 UUID XML NATIONAL NCHAR INT4RANGE|10 INT8RANGE|10 NUMRANGE|10 TSRANGE|10 TSTZRANGE|10 DATERANGE|10 ANYELEMENT ANYARRAY ANYNONARRAY ANYENUM ANYRANGE CSTRING INTERNAL RECORD PG_DDL_COMMAND VOID UNKNOWN OPAQUE REFCURSOR NAME OID REGPROC|10 REGPROCEDURE|10 REGOPER|10 REGOPERATOR|10 REGCLASS|10 REGTYPE|10 REGROLE|10 REGNAMESPACE|10 REGCONFIG|10 REGDICTIONARY|10 "
          , R = A.trim().split(" ").map((E=>E.split("|")[0])).join("|")
          , I = "ARRAY_AGG AVG BIT_AND BIT_OR BOOL_AND BOOL_OR COUNT EVERY JSON_AGG JSONB_AGG JSON_OBJECT_AGG JSONB_OBJECT_AGG MAX MIN MODE STRING_AGG SUM XMLAGG CORR COVAR_POP COVAR_SAMP REGR_AVGX REGR_AVGY REGR_COUNT REGR_INTERCEPT REGR_R2 REGR_SLOPE REGR_SXX REGR_SXY REGR_SYY STDDEV STDDEV_POP STDDEV_SAMP VARIANCE VAR_POP VAR_SAMP PERCENTILE_CONT PERCENTILE_DISC ROW_NUMBER RANK DENSE_RANK PERCENT_RANK CUME_DIST NTILE LAG LEAD FIRST_VALUE LAST_VALUE NTH_VALUE NUM_NONNULLS NUM_NULLS ABS CBRT CEIL CEILING DEGREES DIV EXP FLOOR LN LOG MOD PI POWER RADIANS ROUND SCALE SIGN SQRT TRUNC WIDTH_BUCKET RANDOM SETSEED ACOS ACOSD ASIN ASIND ATAN ATAND ATAN2 ATAN2D COS COSD COT COTD SIN SIND TAN TAND BIT_LENGTH CHAR_LENGTH CHARACTER_LENGTH LOWER OCTET_LENGTH OVERLAY POSITION SUBSTRING TREAT TRIM UPPER ASCII BTRIM CHR CONCAT CONCAT_WS CONVERT CONVERT_FROM CONVERT_TO DECODE ENCODE INITCAP LEFT LENGTH LPAD LTRIM MD5 PARSE_IDENT PG_CLIENT_ENCODING QUOTE_IDENT|10 QUOTE_LITERAL|10 QUOTE_NULLABLE|10 REGEXP_MATCH REGEXP_MATCHES REGEXP_REPLACE REGEXP_SPLIT_TO_ARRAY REGEXP_SPLIT_TO_TABLE REPEAT REPLACE REVERSE RIGHT RPAD RTRIM SPLIT_PART STRPOS SUBSTR TO_ASCII TO_HEX TRANSLATE OCTET_LENGTH GET_BIT GET_BYTE SET_BIT SET_BYTE TO_CHAR TO_DATE TO_NUMBER TO_TIMESTAMP AGE CLOCK_TIMESTAMP|10 DATE_PART DATE_TRUNC ISFINITE JUSTIFY_DAYS JUSTIFY_HOURS JUSTIFY_INTERVAL MAKE_DATE MAKE_INTERVAL|10 MAKE_TIME MAKE_TIMESTAMP|10 MAKE_TIMESTAMPTZ|10 NOW STATEMENT_TIMESTAMP|10 TIMEOFDAY TRANSACTION_TIMESTAMP|10 ENUM_FIRST ENUM_LAST ENUM_RANGE AREA CENTER DIAMETER HEIGHT ISCLOSED ISOPEN NPOINTS PCLOSE POPEN RADIUS WIDTH BOX BOUND_BOX CIRCLE LINE LSEG PATH POLYGON ABBREV BROADCAST HOST HOSTMASK MASKLEN NETMASK NETWORK SET_MASKLEN TEXT INET_SAME_FAMILY INET_MERGE MACADDR8_SET7BIT ARRAY_TO_TSVECTOR GET_CURRENT_TS_CONFIG NUMNODE PLAINTO_TSQUERY PHRASETO_TSQUERY WEBSEARCH_TO_TSQUERY QUERYTREE SETWEIGHT STRIP TO_TSQUERY TO_TSVECTOR JSON_TO_TSVECTOR JSONB_TO_TSVECTOR TS_DELETE TS_FILTER TS_HEADLINE TS_RANK TS_RANK_CD TS_REWRITE TSQUERY_PHRASE TSVECTOR_TO_ARRAY TSVECTOR_UPDATE_TRIGGER TSVECTOR_UPDATE_TRIGGER_COLUMN XMLCOMMENT XMLCONCAT XMLELEMENT XMLFOREST XMLPI XMLROOT XMLEXISTS XML_IS_WELL_FORMED XML_IS_WELL_FORMED_DOCUMENT XML_IS_WELL_FORMED_CONTENT XPATH XPATH_EXISTS XMLTABLE XMLNAMESPACES TABLE_TO_XML TABLE_TO_XMLSCHEMA TABLE_TO_XML_AND_XMLSCHEMA QUERY_TO_XML QUERY_TO_XMLSCHEMA QUERY_TO_XML_AND_XMLSCHEMA CURSOR_TO_XML CURSOR_TO_XMLSCHEMA SCHEMA_TO_XML SCHEMA_TO_XMLSCHEMA SCHEMA_TO_XML_AND_XMLSCHEMA DATABASE_TO_XML DATABASE_TO_XMLSCHEMA DATABASE_TO_XML_AND_XMLSCHEMA XMLATTRIBUTES TO_JSON TO_JSONB ARRAY_TO_JSON ROW_TO_JSON JSON_BUILD_ARRAY JSONB_BUILD_ARRAY JSON_BUILD_OBJECT JSONB_BUILD_OBJECT JSON_OBJECT JSONB_OBJECT JSON_ARRAY_LENGTH JSONB_ARRAY_LENGTH JSON_EACH JSONB_EACH JSON_EACH_TEXT JSONB_EACH_TEXT JSON_EXTRACT_PATH JSONB_EXTRACT_PATH JSON_OBJECT_KEYS JSONB_OBJECT_KEYS JSON_POPULATE_RECORD JSONB_POPULATE_RECORD JSON_POPULATE_RECORDSET JSONB_POPULATE_RECORDSET JSON_ARRAY_ELEMENTS JSONB_ARRAY_ELEMENTS JSON_ARRAY_ELEMENTS_TEXT JSONB_ARRAY_ELEMENTS_TEXT JSON_TYPEOF JSONB_TYPEOF JSON_TO_RECORD JSONB_TO_RECORD JSON_TO_RECORDSET JSONB_TO_RECORDSET JSON_STRIP_NULLS JSONB_STRIP_NULLS JSONB_SET JSONB_INSERT JSONB_PRETTY CURRVAL LASTVAL NEXTVAL SETVAL COALESCE NULLIF GREATEST LEAST ARRAY_APPEND ARRAY_CAT ARRAY_NDIMS ARRAY_DIMS ARRAY_FILL ARRAY_LENGTH ARRAY_LOWER ARRAY_POSITION ARRAY_POSITIONS ARRAY_PREPEND ARRAY_REMOVE ARRAY_REPLACE ARRAY_TO_STRING ARRAY_UPPER CARDINALITY STRING_TO_ARRAY UNNEST ISEMPTY LOWER_INC UPPER_INC LOWER_INF UPPER_INF RANGE_MERGE GENERATE_SERIES GENERATE_SUBSCRIPTS CURRENT_DATABASE CURRENT_QUERY CURRENT_SCHEMA|10 CURRENT_SCHEMAS|10 INET_CLIENT_ADDR INET_CLIENT_PORT INET_SERVER_ADDR INET_SERVER_PORT ROW_SECURITY_ACTIVE FORMAT_TYPE TO_REGCLASS TO_REGPROC TO_REGPROCEDURE TO_REGOPER TO_REGOPERATOR TO_REGTYPE TO_REGNAMESPACE TO_REGROLE COL_DESCRIPTION OBJ_DESCRIPTION SHOBJ_DESCRIPTION TXID_CURRENT TXID_CURRENT_IF_ASSIGNED TXID_CURRENT_SNAPSHOT TXID_SNAPSHOT_XIP TXID_SNAPSHOT_XMAX TXID_SNAPSHOT_XMIN TXID_VISIBLE_IN_SNAPSHOT TXID_STATUS CURRENT_SETTING SET_CONFIG BRIN_SUMMARIZE_NEW_VALUES BRIN_SUMMARIZE_RANGE BRIN_DESUMMARIZE_RANGE GIN_CLEAN_PENDING_LIST SUPPRESS_REDUNDANT_UPDATES_TRIGGER LO_FROM_BYTEA LO_PUT LO_GET LO_CREAT LO_CREATE LO_UNLINK LO_IMPORT LO_EXPORT LOREAD LOWRITE GROUPING CAST".split(" ").map((E=>E.split("|")[0])).join("|");
        return {
            name: "PostgreSQL",
            aliases: ["postgres", "postgresql"],
            case_insensitive: !0,
            keywords: {
                keyword: "ABORT ALTER ANALYZE BEGIN CALL CHECKPOINT|10 CLOSE CLUSTER COMMENT COMMIT COPY CREATE DEALLOCATE DECLARE DELETE DISCARD DO DROP END EXECUTE EXPLAIN FETCH GRANT IMPORT INSERT LISTEN LOAD LOCK MOVE NOTIFY PREPARE REASSIGN|10 REFRESH REINDEX RELEASE RESET REVOKE ROLLBACK SAVEPOINT SECURITY SELECT SET SHOW START TRUNCATE UNLISTEN|10 UPDATE VACUUM|10 VALUES AGGREGATE COLLATION CONVERSION|10 DATABASE DEFAULT PRIVILEGES DOMAIN TRIGGER EXTENSION FOREIGN WRAPPER|10 TABLE FUNCTION GROUP LANGUAGE LARGE OBJECT MATERIALIZED VIEW OPERATOR CLASS FAMILY POLICY PUBLICATION|10 ROLE RULE SCHEMA SEQUENCE SERVER STATISTICS SUBSCRIPTION SYSTEM TABLESPACE CONFIGURATION DICTIONARY PARSER TEMPLATE TYPE USER MAPPING PREPARED ACCESS METHOD CAST AS TRANSFORM TRANSACTION OWNED TO INTO SESSION AUTHORIZATION INDEX PROCEDURE ASSERTION ALL ANALYSE AND ANY ARRAY ASC ASYMMETRIC|10 BOTH CASE CHECK COLLATE COLUMN CONCURRENTLY|10 CONSTRAINT CROSS DEFERRABLE RANGE DESC DISTINCT ELSE EXCEPT FOR FREEZE|10 FROM FULL HAVING ILIKE IN INITIALLY INNER INTERSECT IS ISNULL JOIN LATERAL LEADING LIKE LIMIT NATURAL NOT NOTNULL NULL OFFSET ON ONLY OR ORDER OUTER OVERLAPS PLACING PRIMARY REFERENCES RETURNING SIMILAR SOME SYMMETRIC TABLESAMPLE THEN TRAILING UNION UNIQUE USING VARIADIC|10 VERBOSE WHEN WHERE WINDOW WITH BY RETURNS INOUT OUT SETOF|10 IF STRICT CURRENT CONTINUE OWNER LOCATION OVER PARTITION WITHIN BETWEEN ESCAPE EXTERNAL INVOKER DEFINER WORK RENAME VERSION CONNECTION CONNECT TABLES TEMP TEMPORARY FUNCTIONS SEQUENCES TYPES SCHEMAS OPTION CASCADE RESTRICT ADD ADMIN EXISTS VALID VALIDATE ENABLE DISABLE REPLICA|10 ALWAYS PASSING COLUMNS PATH REF VALUE OVERRIDING IMMUTABLE STABLE VOLATILE BEFORE AFTER EACH ROW PROCEDURAL ROUTINE NO HANDLER VALIDATOR OPTIONS STORAGE OIDS|10 WITHOUT INHERIT DEPENDS CALLED INPUT LEAKPROOF|10 COST ROWS NOWAIT SEARCH UNTIL ENCRYPTED|10 PASSWORD CONFLICT|10 INSTEAD INHERITS CHARACTERISTICS WRITE CURSOR ALSO STATEMENT SHARE EXCLUSIVE INLINE ISOLATION REPEATABLE READ COMMITTED SERIALIZABLE UNCOMMITTED LOCAL GLOBAL SQL PROCEDURES RECURSIVE SNAPSHOT ROLLUP CUBE TRUSTED|10 INCLUDE FOLLOWING PRECEDING UNBOUNDED RANGE GROUPS UNENCRYPTED|10 SYSID FORMAT DELIMITER HEADER QUOTE ENCODING FILTER OFF FORCE_QUOTE FORCE_NOT_NULL FORCE_NULL COSTS BUFFERS TIMING SUMMARY DISABLE_PAGE_SKIPPING RESTART CYCLE GENERATED IDENTITY DEFERRED IMMEDIATE LEVEL LOGGED UNLOGGED OF NOTHING NONE EXCLUDE ATTRIBUTE USAGE ROUTINES TRUE FALSE NAN INFINITY ALIAS BEGIN CONSTANT DECLARE END EXCEPTION RETURN PERFORM|10 RAISE GET DIAGNOSTICS STACKED|10 FOREACH LOOP ELSIF EXIT WHILE REVERSE SLICE DEBUG LOG INFO NOTICE WARNING ASSERT OPEN SUPERUSER NOSUPERUSER CREATEDB NOCREATEDB CREATEROLE NOCREATEROLE INHERIT NOINHERIT LOGIN NOLOGIN REPLICATION NOREPLICATION BYPASSRLS NOBYPASSRLS ",
                built_in: "CURRENT_TIME CURRENT_TIMESTAMP CURRENT_USER CURRENT_CATALOG|10 CURRENT_DATE LOCALTIME LOCALTIMESTAMP CURRENT_ROLE|10 CURRENT_SCHEMA|10 SESSION_USER PUBLIC FOUND NEW OLD TG_NAME|10 TG_WHEN|10 TG_LEVEL|10 TG_OP|10 TG_RELID|10 TG_RELNAME|10 TG_TABLE_NAME|10 TG_TABLE_SCHEMA|10 TG_NARGS|10 TG_ARGV|10 TG_EVENT|10 TG_TAG|10 ROW_COUNT RESULT_OID|10 PG_CONTEXT|10 RETURNED_SQLSTATE COLUMN_NAME CONSTRAINT_NAME PG_DATATYPE_NAME|10 MESSAGE_TEXT TABLE_NAME SCHEMA_NAME PG_EXCEPTION_DETAIL|10 PG_EXCEPTION_HINT|10 PG_EXCEPTION_CONTEXT|10 SQLSTATE SQLERRM|10 SUCCESSFUL_COMPLETION WARNING DYNAMIC_RESULT_SETS_RETURNED IMPLICIT_ZERO_BIT_PADDING NULL_VALUE_ELIMINATED_IN_SET_FUNCTION PRIVILEGE_NOT_GRANTED PRIVILEGE_NOT_REVOKED STRING_DATA_RIGHT_TRUNCATION DEPRECATED_FEATURE NO_DATA NO_ADDITIONAL_DYNAMIC_RESULT_SETS_RETURNED SQL_STATEMENT_NOT_YET_COMPLETE CONNECTION_EXCEPTION CONNECTION_DOES_NOT_EXIST CONNECTION_FAILURE SQLCLIENT_UNABLE_TO_ESTABLISH_SQLCONNECTION SQLSERVER_REJECTED_ESTABLISHMENT_OF_SQLCONNECTION TRANSACTION_RESOLUTION_UNKNOWN PROTOCOL_VIOLATION TRIGGERED_ACTION_EXCEPTION FEATURE_NOT_SUPPORTED INVALID_TRANSACTION_INITIATION LOCATOR_EXCEPTION INVALID_LOCATOR_SPECIFICATION INVALID_GRANTOR INVALID_GRANT_OPERATION INVALID_ROLE_SPECIFICATION DIAGNOSTICS_EXCEPTION STACKED_DIAGNOSTICS_ACCESSED_WITHOUT_ACTIVE_HANDLER CASE_NOT_FOUND CARDINALITY_VIOLATION DATA_EXCEPTION ARRAY_SUBSCRIPT_ERROR CHARACTER_NOT_IN_REPERTOIRE DATETIME_FIELD_OVERFLOW DIVISION_BY_ZERO ERROR_IN_ASSIGNMENT ESCAPE_CHARACTER_CONFLICT INDICATOR_OVERFLOW INTERVAL_FIELD_OVERFLOW INVALID_ARGUMENT_FOR_LOGARITHM INVALID_ARGUMENT_FOR_NTILE_FUNCTION INVALID_ARGUMENT_FOR_NTH_VALUE_FUNCTION INVALID_ARGUMENT_FOR_POWER_FUNCTION INVALID_ARGUMENT_FOR_WIDTH_BUCKET_FUNCTION INVALID_CHARACTER_VALUE_FOR_CAST INVALID_DATETIME_FORMAT INVALID_ESCAPE_CHARACTER INVALID_ESCAPE_OCTET INVALID_ESCAPE_SEQUENCE NONSTANDARD_USE_OF_ESCAPE_CHARACTER INVALID_INDICATOR_PARAMETER_VALUE INVALID_PARAMETER_VALUE INVALID_REGULAR_EXPRESSION INVALID_ROW_COUNT_IN_LIMIT_CLAUSE INVALID_ROW_COUNT_IN_RESULT_OFFSET_CLAUSE INVALID_TABLESAMPLE_ARGUMENT INVALID_TABLESAMPLE_REPEAT INVALID_TIME_ZONE_DISPLACEMENT_VALUE INVALID_USE_OF_ESCAPE_CHARACTER MOST_SPECIFIC_TYPE_MISMATCH NULL_VALUE_NOT_ALLOWED NULL_VALUE_NO_INDICATOR_PARAMETER NUMERIC_VALUE_OUT_OF_RANGE SEQUENCE_GENERATOR_LIMIT_EXCEEDED STRING_DATA_LENGTH_MISMATCH STRING_DATA_RIGHT_TRUNCATION SUBSTRING_ERROR TRIM_ERROR UNTERMINATED_C_STRING ZERO_LENGTH_CHARACTER_STRING FLOATING_POINT_EXCEPTION INVALID_TEXT_REPRESENTATION INVALID_BINARY_REPRESENTATION BAD_COPY_FILE_FORMAT UNTRANSLATABLE_CHARACTER NOT_AN_XML_DOCUMENT INVALID_XML_DOCUMENT INVALID_XML_CONTENT INVALID_XML_COMMENT INVALID_XML_PROCESSING_INSTRUCTION INTEGRITY_CONSTRAINT_VIOLATION RESTRICT_VIOLATION NOT_NULL_VIOLATION FOREIGN_KEY_VIOLATION UNIQUE_VIOLATION CHECK_VIOLATION EXCLUSION_VIOLATION INVALID_CURSOR_STATE INVALID_TRANSACTION_STATE ACTIVE_SQL_TRANSACTION BRANCH_TRANSACTION_ALREADY_ACTIVE HELD_CURSOR_REQUIRES_SAME_ISOLATION_LEVEL INAPPROPRIATE_ACCESS_MODE_FOR_BRANCH_TRANSACTION INAPPROPRIATE_ISOLATION_LEVEL_FOR_BRANCH_TRANSACTION NO_ACTIVE_SQL_TRANSACTION_FOR_BRANCH_TRANSACTION READ_ONLY_SQL_TRANSACTION SCHEMA_AND_DATA_STATEMENT_MIXING_NOT_SUPPORTED NO_ACTIVE_SQL_TRANSACTION IN_FAILED_SQL_TRANSACTION IDLE_IN_TRANSACTION_SESSION_TIMEOUT INVALID_SQL_STATEMENT_NAME TRIGGERED_DATA_CHANGE_VIOLATION INVALID_AUTHORIZATION_SPECIFICATION INVALID_PASSWORD DEPENDENT_PRIVILEGE_DESCRIPTORS_STILL_EXIST DEPENDENT_OBJECTS_STILL_EXIST INVALID_TRANSACTION_TERMINATION SQL_ROUTINE_EXCEPTION FUNCTION_EXECUTED_NO_RETURN_STATEMENT MODIFYING_SQL_DATA_NOT_PERMITTED PROHIBITED_SQL_STATEMENT_ATTEMPTED READING_SQL_DATA_NOT_PERMITTED INVALID_CURSOR_NAME EXTERNAL_ROUTINE_EXCEPTION CONTAINING_SQL_NOT_PERMITTED MODIFYING_SQL_DATA_NOT_PERMITTED PROHIBITED_SQL_STATEMENT_ATTEMPTED READING_SQL_DATA_NOT_PERMITTED EXTERNAL_ROUTINE_INVOCATION_EXCEPTION INVALID_SQLSTATE_RETURNED NULL_VALUE_NOT_ALLOWED TRIGGER_PROTOCOL_VIOLATED SRF_PROTOCOL_VIOLATED EVENT_TRIGGER_PROTOCOL_VIOLATED SAVEPOINT_EXCEPTION INVALID_SAVEPOINT_SPECIFICATION INVALID_CATALOG_NAME INVALID_SCHEMA_NAME TRANSACTION_ROLLBACK TRANSACTION_INTEGRITY_CONSTRAINT_VIOLATION SERIALIZATION_FAILURE STATEMENT_COMPLETION_UNKNOWN DEADLOCK_DETECTED SYNTAX_ERROR_OR_ACCESS_RULE_VIOLATION SYNTAX_ERROR INSUFFICIENT_PRIVILEGE CANNOT_COERCE GROUPING_ERROR WINDOWING_ERROR INVALID_RECURSION INVALID_FOREIGN_KEY INVALID_NAME NAME_TOO_LONG RESERVED_NAME DATATYPE_MISMATCH INDETERMINATE_DATATYPE COLLATION_MISMATCH INDETERMINATE_COLLATION WRONG_OBJECT_TYPE GENERATED_ALWAYS UNDEFINED_COLUMN UNDEFINED_FUNCTION UNDEFINED_TABLE UNDEFINED_PARAMETER UNDEFINED_OBJECT DUPLICATE_COLUMN DUPLICATE_CURSOR DUPLICATE_DATABASE DUPLICATE_FUNCTION DUPLICATE_PREPARED_STATEMENT DUPLICATE_SCHEMA DUPLICATE_TABLE DUPLICATE_ALIAS DUPLICATE_OBJECT AMBIGUOUS_COLUMN AMBIGUOUS_FUNCTION AMBIGUOUS_PARAMETER AMBIGUOUS_ALIAS INVALID_COLUMN_REFERENCE INVALID_COLUMN_DEFINITION INVALID_CURSOR_DEFINITION INVALID_DATABASE_DEFINITION INVALID_FUNCTION_DEFINITION INVALID_PREPARED_STATEMENT_DEFINITION INVALID_SCHEMA_DEFINITION INVALID_TABLE_DEFINITION INVALID_OBJECT_DEFINITION WITH_CHECK_OPTION_VIOLATION INSUFFICIENT_RESOURCES DISK_FULL OUT_OF_MEMORY TOO_MANY_CONNECTIONS CONFIGURATION_LIMIT_EXCEEDED PROGRAM_LIMIT_EXCEEDED STATEMENT_TOO_COMPLEX TOO_MANY_COLUMNS TOO_MANY_ARGUMENTS OBJECT_NOT_IN_PREREQUISITE_STATE OBJECT_IN_USE CANT_CHANGE_RUNTIME_PARAM LOCK_NOT_AVAILABLE OPERATOR_INTERVENTION QUERY_CANCELED ADMIN_SHUTDOWN CRASH_SHUTDOWN CANNOT_CONNECT_NOW DATABASE_DROPPED SYSTEM_ERROR IO_ERROR UNDEFINED_FILE DUPLICATE_FILE SNAPSHOT_TOO_OLD CONFIG_FILE_ERROR LOCK_FILE_EXISTS FDW_ERROR FDW_COLUMN_NAME_NOT_FOUND FDW_DYNAMIC_PARAMETER_VALUE_NEEDED FDW_FUNCTION_SEQUENCE_ERROR FDW_INCONSISTENT_DESCRIPTOR_INFORMATION FDW_INVALID_ATTRIBUTE_VALUE FDW_INVALID_COLUMN_NAME FDW_INVALID_COLUMN_NUMBER FDW_INVALID_DATA_TYPE FDW_INVALID_DATA_TYPE_DESCRIPTORS FDW_INVALID_DESCRIPTOR_FIELD_IDENTIFIER FDW_INVALID_HANDLE FDW_INVALID_OPTION_INDEX FDW_INVALID_OPTION_NAME FDW_INVALID_STRING_LENGTH_OR_BUFFER_LENGTH FDW_INVALID_STRING_FORMAT FDW_INVALID_USE_OF_NULL_POINTER FDW_TOO_MANY_HANDLES FDW_OUT_OF_MEMORY FDW_NO_SCHEMAS FDW_OPTION_NAME_NOT_FOUND FDW_REPLY_HANDLE FDW_SCHEMA_NOT_FOUND FDW_TABLE_NOT_FOUND FDW_UNABLE_TO_CREATE_EXECUTION FDW_UNABLE_TO_CREATE_REPLY FDW_UNABLE_TO_ESTABLISH_CONNECTION PLPGSQL_ERROR RAISE_EXCEPTION NO_DATA_FOUND TOO_MANY_ROWS ASSERT_FAILURE INTERNAL_ERROR DATA_CORRUPTED INDEX_CORRUPTED "
            },
            illegal: /:==|\W\s*\(\*|(^|\s)\$[a-z]|\{\{|[a-z]:\s*$|\.\.\.|TO:|DO:/,
            contains: [{
                className: "keyword",
                variants: [{
                    begin: /\bTEXT\s*SEARCH\b/
                }, {
                    begin: /\b(PRIMARY|FOREIGN|FOR(\s+NO)?)\s+KEY\b/
                }, {
                    begin: /\bPARALLEL\s+(UNSAFE|RESTRICTED|SAFE)\b/
                }, {
                    begin: /\bSTORAGE\s+(PLAIN|EXTERNAL|EXTENDED|MAIN)\b/
                }, {
                    begin: /\bMATCH\s+(FULL|PARTIAL|SIMPLE)\b/
                }, {
                    begin: /\bNULLS\s+(FIRST|LAST)\b/
                }, {
                    begin: /\bEVENT\s+TRIGGER\b/
                }, {
                    begin: /\b(MAPPING|OR)\s+REPLACE\b/
                }, {
                    begin: /\b(FROM|TO)\s+(PROGRAM|STDIN|STDOUT)\b/
                }, {
                    begin: /\b(SHARE|EXCLUSIVE)\s+MODE\b/
                }, {
                    begin: /\b(LEFT|RIGHT)\s+(OUTER\s+)?JOIN\b/
                }, {
                    begin: /\b(FETCH|MOVE)\s+(NEXT|PRIOR|FIRST|LAST|ABSOLUTE|RELATIVE|FORWARD|BACKWARD)\b/
                }, {
                    begin: /\bPRESERVE\s+ROWS\b/
                }, {
                    begin: /\bDISCARD\s+PLANS\b/
                }, {
                    begin: /\bREFERENCING\s+(OLD|NEW)\b/
                }, {
                    begin: /\bSKIP\s+LOCKED\b/
                }, {
                    begin: /\bGROUPING\s+SETS\b/
                }, {
                    begin: /\b(BINARY|INSENSITIVE|SCROLL|NO\s+SCROLL)\s+(CURSOR|FOR)\b/
                }, {
                    begin: /\b(WITH|WITHOUT)\s+HOLD\b/
                }, {
                    begin: /\bWITH\s+(CASCADED|LOCAL)\s+CHECK\s+OPTION\b/
                }, {
                    begin: /\bEXCLUDE\s+(TIES|NO\s+OTHERS)\b/
                }, {
                    begin: /\bFORMAT\s+(TEXT|XML|JSON|YAML)\b/
                }, {
                    begin: /\bSET\s+((SESSION|LOCAL)\s+)?NAMES\b/
                }, {
                    begin: /\bIS\s+(NOT\s+)?UNKNOWN\b/
                }, {
                    begin: /\bSECURITY\s+LABEL\b/
                }, {
                    begin: /\bSTANDALONE\s+(YES|NO|NO\s+VALUE)\b/
                }, {
                    begin: /\bWITH\s+(NO\s+)?DATA\b/
                }, {
                    begin: /\b(FOREIGN|SET)\s+DATA\b/
                }, {
                    begin: /\bSET\s+(CATALOG|CONSTRAINTS)\b/
                }, {
                    begin: /\b(WITH|FOR)\s+ORDINALITY\b/
                }, {
                    begin: /\bIS\s+(NOT\s+)?DOCUMENT\b/
                }, {
                    begin: /\bXML\s+OPTION\s+(DOCUMENT|CONTENT)\b/
                }, {
                    begin: /\b(STRIP|PRESERVE)\s+WHITESPACE\b/
                }, {
                    begin: /\bNO\s+(ACTION|MAXVALUE|MINVALUE)\b/
                }, {
                    begin: /\bPARTITION\s+BY\s+(RANGE|LIST|HASH)\b/
                }, {
                    begin: /\bAT\s+TIME\s+ZONE\b/
                }, {
                    begin: /\bGRANTED\s+BY\b/
                }, {
                    begin: /\bRETURN\s+(QUERY|NEXT)\b/
                }, {
                    begin: /\b(ATTACH|DETACH)\s+PARTITION\b/
                }, {
                    begin: /\bFORCE\s+ROW\s+LEVEL\s+SECURITY\b/
                }, {
                    begin: /\b(INCLUDING|EXCLUDING)\s+(COMMENTS|CONSTRAINTS|DEFAULTS|IDENTITY|INDEXES|STATISTICS|STORAGE|ALL)\b/
                }, {
                    begin: /\bAS\s+(ASSIGNMENT|IMPLICIT|PERMISSIVE|RESTRICTIVE|ENUM|RANGE)\b/
                }]
            }, {
                begin: /\b(FORMAT|FAMILY|VERSION)\s*\(/
            }, {
                begin: /\bINCLUDE\s*\(/,
                keywords: "INCLUDE"
            }, {
                begin: /\bRANGE(?!\s*(BETWEEN|UNBOUNDED|CURRENT|[-0-9]+))/
            }, {
                begin: /\b(VERSION|OWNER|TEMPLATE|TABLESPACE|CONNECTION\s+LIMIT|PROCEDURE|RESTRICT|JOIN|PARSER|COPY|START|END|COLLATION|INPUT|ANALYZE|STORAGE|LIKE|DEFAULT|DELIMITER|ENCODING|COLUMN|CONSTRAINT|TABLE|SCHEMA)\s*=/
            }, {
                begin: /\b(PG_\w+?|HAS_[A-Z_]+_PRIVILEGE)\b/,
                relevance: 10
            }, {
                begin: /\bEXTRACT\s*\(/,
                end: /\bFROM\b/,
                returnEnd: !0,
                keywords: {
                    type: "CENTURY DAY DECADE DOW DOY EPOCH HOUR ISODOW ISOYEAR MICROSECONDS MILLENNIUM MILLISECONDS MINUTE MONTH QUARTER SECOND TIMEZONE TIMEZONE_HOUR TIMEZONE_MINUTE WEEK YEAR"
                }
            }, {
                begin: /\b(XMLELEMENT|XMLPI)\s*\(\s*NAME/,
                keywords: {
                    keyword: "NAME"
                }
            }, {
                begin: /\b(XMLPARSE|XMLSERIALIZE)\s*\(\s*(DOCUMENT|CONTENT)/,
                keywords: {
                    keyword: "DOCUMENT CONTENT"
                }
            }, {
                beginKeywords: "CACHE INCREMENT MAXVALUE MINVALUE",
                end: E.C_NUMBER_RE,
                returnEnd: !0,
                keywords: "BY CACHE INCREMENT MAXVALUE MINVALUE"
            }, {
                className: "type",
                begin: /\b(WITH|WITHOUT)\s+TIME\s+ZONE\b/
            }, {
                className: "type",
                begin: /\bINTERVAL\s+(YEAR|MONTH|DAY|HOUR|MINUTE|SECOND)(\s+TO\s+(MONTH|HOUR|MINUTE|SECOND))?\b/
            }, {
                begin: /\bRETURNS\s+(LANGUAGE_HANDLER|TRIGGER|EVENT_TRIGGER|FDW_HANDLER|INDEX_AM_HANDLER|TSM_HANDLER)\b/,
                keywords: {
                    keyword: "RETURNS",
                    type: "LANGUAGE_HANDLER TRIGGER EVENT_TRIGGER FDW_HANDLER INDEX_AM_HANDLER TSM_HANDLER"
                }
            }, {
                begin: "\\b(" + I + ")\\s*\\("
            }, {
                begin: "\\.(" + R + ")\\b"
            }, {
                begin: "\\b(" + R + ")\\s+PATH\\b",
                keywords: {
                    keyword: "PATH",
                    type: A.replace("PATH ", "")
                }
            }, {
                className: "type",
                begin: "\\b(" + R + ")\\b"
            }, {
                className: "string",
                begin: "'",
                end: "'",
                contains: [{
                    begin: "''"
                }]
            }, {
                className: "string",
                begin: "(e|E|u&|U&)'",
                end: "'",
                contains: [{
                    begin: "\\\\."
                }],
                relevance: 10
            }, E.END_SAME_AS_BEGIN({
                begin: N,
                end: N,
                contains: [{
                    subLanguage: ["pgsql", "perl", "python", "tcl", "r", "lua", "java", "php", "ruby", "bash", "scheme", "xml", "json"],
                    endsWithParent: !0
                }]
            }), {
                begin: '"',
                end: '"',
                contains: [{
                    begin: '""'
                }]
            }, E.C_NUMBER_MODE, E.C_BLOCK_COMMENT_MODE, T, {
                className: "meta",
                variants: [{
                    begin: "%(ROW)?TYPE",
                    relevance: 10
                }, {
                    begin: "\\$\\d+"
                }, {
                    begin: "^#\\w",
                    end: "$"
                }]
            }, {
                className: "symbol",
                begin: "<<\\s*[a-zA-Z_][a-zA-Z_0-9$]*\\s*>>",
                relevance: 10
            }]
        }
    }
}
)());
hljs.registerLanguage("rust", (()=>{
    "use strict";
    return e=>{
        const n = "([ui](8|16|32|64|128|size)|f(32|64))?"
          , t = "drop i8 i16 i32 i64 i128 isize u8 u16 u32 u64 u128 usize f32 f64 str char bool Box Option Result String Vec Copy Send Sized Sync Drop Fn FnMut FnOnce ToOwned Clone Debug PartialEq PartialOrd Eq Ord AsRef AsMut Into From Default Iterator Extend IntoIterator DoubleEndedIterator ExactSizeIterator SliceConcatExt ToString assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! debug_assert! debug_assert_eq! env! panic! file! format! format_args! include_bin! include_str! line! local_data_key! module_path! option_env! print! println! select! stringify! try! unimplemented! unreachable! vec! write! writeln! macro_rules! assert_ne! debug_assert_ne!";
        return {
            name: "Rust",
            aliases: ["rs"],
            keywords: {
                $pattern: e.IDENT_RE + "!?",
                keyword: "abstract as async await become box break const continue crate do dyn else enum extern false final fn for if impl in let loop macro match mod move mut override priv pub ref return self Self static struct super trait true try type typeof unsafe unsized use virtual where while yield",
                literal: "true false Some None Ok Err",
                built_in: t
            },
            illegal: "</",
            contains: [e.C_LINE_COMMENT_MODE, e.COMMENT("/\\*", "\\*/", {
                contains: ["self"]
            }), e.inherit(e.QUOTE_STRING_MODE, {
                begin: /b?"/,
                illegal: null
            }), {
                className: "string",
                variants: [{
                    begin: /r(#*)"(.|\n)*?"\1(?!#)/
                }, {
                    begin: /b?'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
                }]
            }, {
                className: "symbol",
                begin: /'[a-zA-Z_][a-zA-Z0-9_]*/
            }, {
                className: "number",
                variants: [{
                    begin: "\\b0b([01_]+)" + n
                }, {
                    begin: "\\b0o([0-7_]+)" + n
                }, {
                    begin: "\\b0x([A-Fa-f0-9_]+)" + n
                }, {
                    begin: "\\b(\\d[\\d_]*(\\.[0-9_]+)?([eE][+-]?[0-9_]+)?)" + n
                }],
                relevance: 0
            }, {
                className: "function",
                beginKeywords: "fn",
                end: "(\\(|<)",
                excludeEnd: !0,
                contains: [e.UNDERSCORE_TITLE_MODE]
            }, {
                className: "meta",
                begin: "#!?\\[",
                end: "\\]",
                contains: [{
                    className: "meta-string",
                    begin: /"/,
                    end: /"/
                }]
            }, {
                className: "class",
                beginKeywords: "type",
                end: ";",
                contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, {
                    endsParent: !0
                })],
                illegal: "\\S"
            }, {
                className: "class",
                beginKeywords: "trait enum struct union",
                end: /\{/,
                contains: [e.inherit(e.UNDERSCORE_TITLE_MODE, {
                    endsParent: !0
                })],
                illegal: "[\\w\\d]"
            }, {
                begin: e.IDENT_RE + "::",
                keywords: {
                    built_in: t
                }
            }, {
                begin: "->"
            }]
        }
    }
}
)());
hljs.registerLanguage("yaml", (()=>{
    "use strict";
    return e=>{
        var n = "true false yes no null"
          , a = "[\\w#;/?:@&=+$,.~*'()[\\]]+"
          , s = {
            className: "string",
            relevance: 0,
            variants: [{
                begin: /'/,
                end: /'/
            }, {
                begin: /"/,
                end: /"/
            }, {
                begin: /\S+/
            }],
            contains: [e.BACKSLASH_ESCAPE, {
                className: "template-variable",
                variants: [{
                    begin: /\{\{/,
                    end: /\}\}/
                }, {
                    begin: /%\{/,
                    end: /\}/
                }]
            }]
        }
          , i = e.inherit(s, {
            variants: [{
                begin: /'/,
                end: /'/
            }, {
                begin: /"/,
                end: /"/
            }, {
                begin: /[^\s,{}[\]]+/
            }]
        })
          , l = {
            end: ",",
            endsWithParent: !0,
            excludeEnd: !0,
            keywords: n,
            relevance: 0
        }
          , t = {
            begin: /\{/,
            end: /\}/,
            contains: [l],
            illegal: "\\n",
            relevance: 0
        }
          , g = {
            begin: "\\[",
            end: "\\]",
            contains: [l],
            illegal: "\\n",
            relevance: 0
        }
          , b = [{
            className: "attr",
            variants: [{
                begin: "\\w[\\w :\\/.-]*:(?=[ \t]|$)"
            }, {
                begin: '"\\w[\\w :\\/.-]*":(?=[ \t]|$)'
            }, {
                begin: "'\\w[\\w :\\/.-]*':(?=[ \t]|$)"
            }]
        }, {
            className: "meta",
            begin: "^---\\s*$",
            relevance: 10
        }, {
            className: "string",
            begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
        }, {
            begin: "<%[%=-]?",
            end: "[%-]?%>",
            subLanguage: "ruby",
            excludeBegin: !0,
            excludeEnd: !0,
            relevance: 0
        }, {
            className: "type",
            begin: "!\\w+!" + a
        }, {
            className: "type",
            begin: "!<" + a + ">"
        }, {
            className: "type",
            begin: "!" + a
        }, {
            className: "type",
            begin: "!!" + a
        }, {
            className: "meta",
            begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
        }, {
            className: "meta",
            begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
        }, {
            className: "bullet",
            begin: "-(?=[ ]|$)",
            relevance: 0
        }, e.HASH_COMMENT_MODE, {
            beginKeywords: n,
            keywords: {
                literal: n
            }
        }, {
            className: "number",
            begin: "\\b[0-9]{4}(-[0-9][0-9]){0,2}([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?(\\.[0-9]*)?([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?\\b"
        }, {
            className: "number",
            begin: e.C_NUMBER_RE + "\\b",
            relevance: 0
        }, t, g, s]
          , r = [...b];
        return r.pop(),
        r.push(i),
        l.contains = r,
        {
            name: "YAML",
            case_insensitive: !0,
            aliases: ["yml"],
            contains: b
        }
    }
}
)());
hljs.registerLanguage("json", (()=>{
    "use strict";
    return n=>{
        const e = {
            literal: "true false null"
        }
          , i = [n.C_LINE_COMMENT_MODE, n.C_BLOCK_COMMENT_MODE]
          , a = [n.QUOTE_STRING_MODE, n.C_NUMBER_MODE]
          , l = {
            end: ",",
            endsWithParent: !0,
            excludeEnd: !0,
            contains: a,
            keywords: e
        }
          , t = {
            begin: /\{/,
            end: /\}/,
            contains: [{
                className: "attr",
                begin: /"/,
                end: /"/,
                contains: [n.BACKSLASH_ESCAPE],
                illegal: "\\n"
            }, n.inherit(l, {
                begin: /:/
            })].concat(i),
            illegal: "\\S"
        }
          , s = {
            begin: "\\[",
            end: "\\]",
            contains: [n.inherit(l)],
            illegal: "\\S"
        };
        return a.push(t, s),
        i.forEach((n=>{
            a.push(n)
        }
        )),
        {
            name: "JSON",
            contains: a,
            keywords: e,
            illegal: "\\S"
        }
    }
}
)());
hljs.registerLanguage("makefile", (()=>{
    "use strict";
    return e=>{
        const i = {
            className: "variable",
            variants: [{
                begin: "\\$\\(" + e.UNDERSCORE_IDENT_RE + "\\)",
                contains: [e.BACKSLASH_ESCAPE]
            }, {
                begin: /\$[@%<?\^\+\*]/
            }]
        }
          , a = {
            className: "string",
            begin: /"/,
            end: /"/,
            contains: [e.BACKSLASH_ESCAPE, i]
        }
          , n = {
            className: "variable",
            begin: /\$\([\w-]+\s/,
            end: /\)/,
            keywords: {
                built_in: "subst patsubst strip findstring filter filter-out sort word wordlist firstword lastword dir notdir suffix basename addsuffix addprefix join wildcard realpath abspath error warning shell origin flavor foreach if or and call eval file value"
            },
            contains: [i]
        }
          , s = {
            begin: "^" + e.UNDERSCORE_IDENT_RE + "\\s*(?=[:+?]?=)"
        }
          , r = {
            className: "section",
            begin: /^[^\s]+:/,
            end: /$/,
            contains: [i]
        };
        return {
            name: "Makefile",
            aliases: ["mk", "mak", "make"],
            keywords: {
                $pattern: /[\w-]+/,
                keyword: "define endef undefine ifdef ifndef ifeq ifneq else endif include -include sinclude override export unexport private vpath"
            },
            contains: [e.HASH_COMMENT_MODE, i, a, n, s, {
                className: "meta",
                begin: /^\.PHONY:/,
                end: /$/,
                keywords: {
                    $pattern: /[\.\w]+/,
                    "meta-keyword": ".PHONY"
                }
            }, r]
        }
    }
}
)());
hljs.registerLanguage("sql_more", (()=>{
    "use strict";
    return e=>{
        var t = e.COMMENT("--", "$");
        return {
            name: "SQL (more)",
            aliases: ["mysql", "oracle"],
            disableAutodetect: !0,
            case_insensitive: !0,
            illegal: /[<>{}*]/,
            contains: [{
                beginKeywords: "begin end start commit rollback savepoint lock alter create drop rename call delete do handler insert load replace select truncate update set show pragma grant merge describe use explain help declare prepare execute deallocate release unlock purge reset change stop analyze cache flush optimize repair kill install uninstall checksum restore check backup revoke comment values with",
                end: /;/,
                endsWithParent: !0,
                keywords: {
                    $pattern: /[\w\.]+/,
                    keyword: "as abort abs absolute acc acce accep accept access accessed accessible account acos action activate add addtime admin administer advanced advise aes_decrypt aes_encrypt after agent aggregate ali alia alias all allocate allow alter always analyze ancillary and anti any anydata anydataset anyschema anytype apply archive archived archivelog are as asc ascii asin assembly assertion associate asynchronous at atan atn2 attr attri attrib attribu attribut attribute attributes audit authenticated authentication authid authors auto autoallocate autodblink autoextend automatic availability avg backup badfile basicfile before begin beginning benchmark between bfile bfile_base big bigfile bin binary_double binary_float binlog bit_and bit_count bit_length bit_or bit_xor bitmap blob_base block blocksize body both bound bucket buffer_cache buffer_pool build bulk by byte byteordermark bytes cache caching call calling cancel capacity cascade cascaded case cast catalog category ceil ceiling chain change changed char_base char_length character_length characters characterset charindex charset charsetform charsetid check checksum checksum_agg child choose chr chunk class cleanup clear client clob clob_base clone close cluster_id cluster_probability cluster_set clustering coalesce coercibility col collate collation collect colu colum column column_value columns columns_updated comment commit compact compatibility compiled complete composite_limit compound compress compute concat concat_ws concurrent confirm conn connec connect connect_by_iscycle connect_by_isleaf connect_by_root connect_time connection consider consistent constant constraint constraints constructor container content contents context contributors controlfile conv convert convert_tz corr corr_k corr_s corresponding corruption cos cost count count_big counted covar_pop covar_samp cpu_per_call cpu_per_session crc32 create creation critical cross cube cume_dist curdate current current_date current_time current_timestamp current_user cursor curtime customdatum cycle data database databases datafile datafiles datalength date_add date_cache date_format date_sub dateadd datediff datefromparts datename datepart datetime2fromparts day day_to_second dayname dayofmonth dayofweek dayofyear days db_role_change dbtimezone ddl deallocate declare decode decompose decrement decrypt deduplicate def defa defau defaul default defaults deferred defi defin define degrees delayed delegate delete delete_all delimited demand dense_rank depth dequeue des_decrypt des_encrypt des_key_file desc descr descri describ describe descriptor deterministic diagnostics difference dimension direct_load directory disable disable_all disallow disassociate discardfile disconnect diskgroup distinct distinctrow distribute distributed div do document domain dotnet double downgrade drop dumpfile duplicate duration each edition editionable editions element ellipsis else elsif elt empty enable enable_all enclosed encode encoding encrypt end end-exec endian enforced engine engines enqueue enterprise entityescaping eomonth error errors escaped evalname evaluate event eventdata events except exception exceptions exchange exclude excluding execu execut execute exempt exists exit exp expire explain explode export export_set extended extent external external_1 external_2 externally extract failed failed_login_attempts failover failure far fast feature_set feature_value fetch field fields file file_name_convert filesystem_like_logging final finish first first_value fixed flash_cache flashback floor flush following follows for forall force foreign form forma format found found_rows freelist freelists freepools fresh from from_base64 from_days ftp full function general generated get get_format get_lock getdate getutcdate global global_name globally go goto grant grants greatest group group_concat group_id grouping grouping_id groups gtid_subtract guarantee guard handler hash hashkeys having hea head headi headin heading heap help hex hierarchy high high_priority hosts hour hours http id ident_current ident_incr ident_seed identified identity idle_time if ifnull ignore iif ilike ilm immediate import in include including increment index indexes indexing indextype indicator indices inet6_aton inet6_ntoa inet_aton inet_ntoa infile initial initialized initially initrans inmemory inner innodb input insert install instance instantiable instr interface interleaved intersect into invalidate invisible is is_free_lock is_ipv4 is_ipv4_compat is_not is_not_null is_used_lock isdate isnull isolation iterate java join json json_exists keep keep_duplicates key keys kill language large last last_day last_insert_id last_value lateral lax lcase lead leading least leaves left len lenght length less level levels library like like2 like4 likec limit lines link list listagg little ln load load_file lob lobs local localtime localtimestamp locate locator lock locked log log10 log2 logfile logfiles logging logical logical_reads_per_call logoff logon logs long loop low low_priority lower lpad lrtrim ltrim main make_set makedate maketime managed management manual map mapping mask master master_pos_wait match matched materialized max maxextents maximize maxinstances maxlen maxlogfiles maxloghistory maxlogmembers maxsize maxtrans md5 measures median medium member memcompress memory merge microsecond mid migration min minextents minimum mining minus minute minutes minvalue missing mod mode model modification modify module monitoring month months mount move movement multiset mutex name name_const names nan national native natural nav nchar nclob nested never new newline next nextval no no_write_to_binlog noarchivelog noaudit nobadfile nocheck nocompress nocopy nocycle nodelay nodiscardfile noentityescaping noguarantee nokeep nologfile nomapping nomaxvalue nominimize nominvalue nomonitoring none noneditionable nonschema noorder nopr nopro noprom nopromp noprompt norely noresetlogs noreverse normal norowdependencies noschemacheck noswitch not nothing notice notnull notrim novalidate now nowait nth_value nullif nulls num numb numbe nvarchar nvarchar2 object ocicoll ocidate ocidatetime ociduration ociinterval ociloblocator ocinumber ociref ocirefcursor ocirowid ocistring ocitype oct octet_length of off offline offset oid oidindex old on online only opaque open operations operator optimal optimize option optionally or oracle oracle_date oradata ord ordaudio orddicom orddoc order ordimage ordinality ordvideo organization orlany orlvary out outer outfile outline output over overflow overriding package pad parallel parallel_enable parameters parent parse partial partition partitions pascal passing password password_grace_time password_lock_time password_reuse_max password_reuse_time password_verify_function patch path patindex pctincrease pctthreshold pctused pctversion percent percent_rank percentile_cont percentile_disc performance period period_add period_diff permanent physical pi pipe pipelined pivot pluggable plugin policy position post_transaction pow power pragma prebuilt precedes preceding precision prediction prediction_cost prediction_details prediction_probability prediction_set prepare present preserve prior priority private private_sga privileges procedural procedure procedure_analyze processlist profiles project prompt protection public publishingservername purge quarter query quick quiesce quota quotename radians raise rand range rank raw read reads readsize rebuild record records recover recovery recursive recycle redo reduced ref reference referenced references referencing refresh regexp_like register regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy reject rekey relational relative relaylog release release_lock relies_on relocate rely rem remainder rename repair repeat replace replicate replication required reset resetlogs resize resource respect restore restricted result result_cache resumable resume retention return returning returns reuse reverse revoke right rlike role roles rollback rolling rollup round row row_count rowdependencies rowid rownum rows rtrim rules safe salt sample save savepoint sb1 sb2 sb4 scan schema schemacheck scn scope scroll sdo_georaster sdo_topo_geometry search sec_to_time second seconds section securefile security seed segment select self semi sequence sequential serializable server servererror session session_user sessions_per_user set sets settings sha sha1 sha2 share shared shared_pool short show shrink shutdown si_averagecolor si_colorhistogram si_featurelist si_positionalcolor si_stillimage si_texture siblings sid sign sin size size_t sizes skip slave sleep smalldatetimefromparts smallfile snapshot some soname sort soundex source space sparse spfile split sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_small_result sql_variant_property sqlcode sqldata sqlerror sqlname sqlstate sqrt square standalone standby start starting startup statement static statistics stats_binomial_test stats_crosstab stats_ks_test stats_mode stats_mw_test stats_one_way_anova stats_t_test_ stats_t_test_indep stats_t_test_one stats_t_test_paired stats_wsr_test status std stddev stddev_pop stddev_samp stdev stop storage store stored str str_to_date straight_join strcmp strict string struct stuff style subdate subpartition subpartitions substitutable substr substring subtime subtring_index subtype success sum suspend switch switchoffset switchover sync synchronous synonym sys sys_xmlagg sysasm sysaux sysdate sysdatetimeoffset sysdba sysoper system system_user sysutcdatetime table tables tablespace tablesample tan tdo template temporary terminated tertiary_weights test than then thread through tier ties time time_format time_zone timediff timefromparts timeout timestamp timestampadd timestampdiff timezone_abbr timezone_minute timezone_region to to_base64 to_date to_days to_seconds todatetimeoffset trace tracking transaction transactional translate translation treat trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse type ub1 ub2 ub4 ucase unarchived unbounded uncompress under undo unhex unicode uniform uninstall union unique unix_timestamp unknown unlimited unlock unnest unpivot unrecoverable unsafe unsigned until untrusted unusable unused update updated upgrade upped upper upsert url urowid usable usage use use_stored_outlines user user_data user_resources users using utc_date utc_timestamp uuid uuid_short validate validate_password_strength validation valist value values var var_samp varcharc vari varia variab variabl variable variables variance varp varraw varrawc varray verify version versions view virtual visible void wait wallet warning warnings week weekday weekofyear wellformed when whene whenev wheneve whenever where while whitespace window with within without work wrapped xdb xml xmlagg xmlattributes xmlcast xmlcolattval xmlelement xmlexists xmlforest xmlindex xmlnamespaces xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltype xor year year_to_month years yearweek",
                    literal: "true false null unknown",
                    built_in: "array bigint binary bit blob bool boolean char character date dec decimal float int int8 integer interval number numeric real record serial serial8 smallint text time timestamp tinyint varchar varchar2 varying void"
                },
                contains: [{
                    className: "string",
                    begin: "'",
                    end: "'",
                    contains: [{
                        begin: "''"
                    }]
                }, {
                    className: "string",
                    begin: '"',
                    end: '"',
                    contains: [{
                        begin: '""'
                    }]
                }, {
                    className: "string",
                    begin: "`",
                    end: "`"
                }, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, t, e.HASH_COMMENT_MODE]
            }, e.C_BLOCK_COMMENT_MODE, t, e.HASH_COMMENT_MODE]
        }
    }
}
)());
hljs.registerLanguage("julia", (()=>{
    "use strict";
    return e=>{
        var r = "[A-Za-z_\\u00A1-\\uFFFF][A-Za-z_0-9\\u00A1-\\uFFFF]*"
          , t = {
            $pattern: r,
            keyword: ["baremodule", "begin", "break", "catch", "ccall", "const", "continue", "do", "else", "elseif", "end", "export", "false", "finally", "for", "function", "global", "if", "import", "in", "isa", "let", "local", "macro", "module", "quote", "return", "true", "try", "using", "where", "while"],
            literal: ["ARGS", "C_NULL", "DEPOT_PATH", "ENDIAN_BOM", "ENV", "Inf", "Inf16", "Inf32", "Inf64", "InsertionSort", "LOAD_PATH", "MergeSort", "NaN", "NaN16", "NaN32", "NaN64", "PROGRAM_FILE", "QuickSort", "RoundDown", "RoundFromZero", "RoundNearest", "RoundNearestTiesAway", "RoundNearestTiesUp", "RoundToZero", "RoundUp", "VERSION|0", "devnull", "false", "im", "missing", "nothing", "pi", "stderr", "stdin", "stdout", "true", "undef", "\u03c0", "\u212f"],
            built_in: ["AbstractArray", "AbstractChannel", "AbstractChar", "AbstractDict", "AbstractDisplay", "AbstractFloat", "AbstractIrrational", "AbstractMatrix", "AbstractRange", "AbstractSet", "AbstractString", "AbstractUnitRange", "AbstractVecOrMat", "AbstractVector", "Any", "ArgumentError", "Array", "AssertionError", "BigFloat", "BigInt", "BitArray", "BitMatrix", "BitSet", "BitVector", "Bool", "BoundsError", "CapturedException", "CartesianIndex", "CartesianIndices", "Cchar", "Cdouble", "Cfloat", "Channel", "Char", "Cint", "Cintmax_t", "Clong", "Clonglong", "Cmd", "Colon", "Complex", "ComplexF16", "ComplexF32", "ComplexF64", "CompositeException", "Condition", "Cptrdiff_t", "Cshort", "Csize_t", "Cssize_t", "Cstring", "Cuchar", "Cuint", "Cuintmax_t", "Culong", "Culonglong", "Cushort", "Cvoid", "Cwchar_t", "Cwstring", "DataType", "DenseArray", "DenseMatrix", "DenseVecOrMat", "DenseVector", "Dict", "DimensionMismatch", "Dims", "DivideError", "DomainError", "EOFError", "Enum", "ErrorException", "Exception", "ExponentialBackOff", "Expr", "Float16", "Float32", "Float64", "Function", "GlobalRef", "HTML", "IO", "IOBuffer", "IOContext", "IOStream", "IdDict", "IndexCartesian", "IndexLinear", "IndexStyle", "InexactError", "InitError", "Int", "Int128", "Int16", "Int32", "Int64", "Int8", "Integer", "InterruptException", "InvalidStateException", "Irrational", "KeyError", "LinRange", "LineNumberNode", "LinearIndices", "LoadError", "MIME", "Matrix", "Method", "MethodError", "Missing", "MissingException", "Module", "NTuple", "NamedTuple", "Nothing", "Number", "OrdinalRange", "OutOfMemoryError", "OverflowError", "Pair", "PartialQuickSort", "PermutedDimsArray", "Pipe", "ProcessFailedException", "Ptr", "QuoteNode", "Rational", "RawFD", "ReadOnlyMemoryError", "Real", "ReentrantLock", "Ref", "Regex", "RegexMatch", "RoundingMode", "SegmentationFault", "Set", "Signed", "Some", "StackOverflowError", "StepRange", "StepRangeLen", "StridedArray", "StridedMatrix", "StridedVecOrMat", "StridedVector", "String", "StringIndexError", "SubArray", "SubString", "SubstitutionString", "Symbol", "SystemError", "Task", "TaskFailedException", "Text", "TextDisplay", "Timer", "Tuple", "Type", "TypeError", "TypeVar", "UInt", "UInt128", "UInt16", "UInt32", "UInt64", "UInt8", "UndefInitializer", "UndefKeywordError", "UndefRefError", "UndefVarError", "Union", "UnionAll", "UnitRange", "Unsigned", "Val", "Vararg", "VecElement", "VecOrMat", "Vector", "VersionNumber", "WeakKeyDict", "WeakRef"]
        }
          , n = {
            keywords: t,
            illegal: /<\//
        }
          , a = {
            className: "subst",
            begin: /\$\(/,
            end: /\)/,
            keywords: t
        }
          , i = {
            className: "variable",
            begin: "\\$" + r
        }
          , o = {
            className: "string",
            contains: [e.BACKSLASH_ESCAPE, a, i],
            variants: [{
                begin: /\w*"""/,
                end: /"""\w*/,
                relevance: 10
            }, {
                begin: /\w*"/,
                end: /"\w*/
            }]
        }
          , s = {
            className: "string",
            contains: [e.BACKSLASH_ESCAPE, a, i],
            begin: "`",
            end: "`"
        }
          , l = {
            className: "meta",
            begin: "@" + r
        };
        return n.name = "Julia",
        n.contains = [{
            className: "number",
            begin: /(\b0x[\d_]*(\.[\d_]*)?|0x\.\d[\d_]*)p[-+]?\d+|\b0[box][a-fA-F0-9][a-fA-F0-9_]*|(\b\d[\d_]*(\.[\d_]*)?|\.\d[\d_]*)([eEfF][-+]?\d+)?/,
            relevance: 0
        }, {
            className: "string",
            begin: /'(.|\\[xXuU][a-zA-Z0-9]+)'/
        }, o, s, l, {
            className: "comment",
            variants: [{
                begin: "#=",
                end: "=#",
                relevance: 10
            }, {
                begin: "#",
                end: "$"
            }]
        }, e.HASH_COMMENT_MODE, {
            className: "keyword",
            begin: "\\b(((abstract|primitive)\\s+)type|(mutable\\s+)?struct)\\b"
        }, {
            begin: /<:/
        }],
        a.contains = n.contains,
        n
    }
}
)());
hljs.registerLanguage("julia-repl", (()=>{
    "use strict";
    return a=>({
        name: "Julia REPL",
        contains: [{
            className: "meta",
            begin: /^julia>/,
            relevance: 10,
            starts: {
                end: /^(?![ ]{6})/,
                subLanguage: "julia"
            },
            aliases: ["jldoctest"]
        }]
    })
}
)());
hljs.registerLanguage("css", (()=>{
    "use strict";
    const e = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"]
      , t = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"]
      , i = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"]
      , o = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"]
      , r = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-variation-settings", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "src", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"].reverse();
    return n=>{
        const a = (e=>({
            IMPORTANT: {
                className: "meta",
                begin: "!important"
            },
            HEXCOLOR: {
                className: "number",
                begin: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
            },
            ATTRIBUTE_SELECTOR_MODE: {
                className: "selector-attr",
                begin: /\[/,
                end: /\]/,
                illegal: "$",
                contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
            }
        }))(n)
          , l = [n.APOS_STRING_MODE, n.QUOTE_STRING_MODE];
        return {
            name: "CSS",
            case_insensitive: !0,
            illegal: /[=|'\$]/,
            keywords: {
                keyframePosition: "from to"
            },
            classNameAliases: {
                keyframePosition: "selector-tag"
            },
            contains: [n.C_BLOCK_COMMENT_MODE, {
                begin: /-(webkit|moz|ms|o)-(?=[a-z])/
            }, n.CSS_NUMBER_MODE, {
                className: "selector-id",
                begin: /#[A-Za-z0-9_-]+/,
                relevance: 0
            }, {
                className: "selector-class",
                begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
                relevance: 0
            }, a.ATTRIBUTE_SELECTOR_MODE, {
                className: "selector-pseudo",
                variants: [{
                    begin: ":(" + i.join("|") + ")"
                }, {
                    begin: "::(" + o.join("|") + ")"
                }]
            }, {
                className: "attribute",
                begin: "\\b(" + r.join("|") + ")\\b"
            }, {
                begin: ":",
                end: "[;}]",
                contains: [a.HEXCOLOR, a.IMPORTANT, n.CSS_NUMBER_MODE, ...l, {
                    begin: /(url|data-uri)\(/,
                    end: /\)/,
                    relevance: 0,
                    keywords: {
                        built_in: "url data-uri"
                    },
                    contains: [{
                        className: "string",
                        begin: /[^)]/,
                        endsWithParent: !0,
                        excludeEnd: !0
                    }]
                }, {
                    className: "built_in",
                    begin: /[\w-]+(?=\()/
                }]
            }, {
                begin: (s = /@/,
                ((...e)=>e.map((e=>(e=>e ? "string" == typeof e ? e : e.source : null)(e))).join(""))("(?=", s, ")")),
                end: "[{;]",
                relevance: 0,
                illegal: /:/,
                contains: [{
                    className: "keyword",
                    begin: /@-?\w[\w]*(-\w+)*/
                }, {
                    begin: /\s/,
                    endsWithParent: !0,
                    excludeEnd: !0,
                    relevance: 0,
                    keywords: {
                        $pattern: /[a-z-]+/,
                        keyword: "and or not only",
                        attribute: t.join(" ")
                    },
                    contains: [{
                        begin: /[a-z-]+(?=:)/,
                        className: "attribute"
                    }, ...l, n.CSS_NUMBER_MODE]
                }]
            }, {
                className: "selector-tag",
                begin: "\\b(" + e.join("|") + ")\\b"
            }]
        };
        var s
    }
}
)());
hljs.registerLanguage("ini", (()=>{
    "use strict";
    function e(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    function n(...n) {
        return n.map((n=>e(n))).join("")
    }
    return s=>{
        const a = {
            className: "number",
            relevance: 0,
            variants: [{
                begin: /([+-]+)?[\d]+_[\d_]+/
            }, {
                begin: s.NUMBER_RE
            }]
        }
          , i = s.COMMENT();
        i.variants = [{
            begin: /;/,
            end: /$/
        }, {
            begin: /#/,
            end: /$/
        }];
        const t = {
            className: "variable",
            variants: [{
                begin: /\$[\w\d"][\w\d_]*/
            }, {
                begin: /\$\{(.*?)\}/
            }]
        }
          , r = {
            className: "literal",
            begin: /\bon|off|true|false|yes|no\b/
        }
          , l = {
            className: "string",
            contains: [s.BACKSLASH_ESCAPE],
            variants: [{
                begin: "'''",
                end: "'''",
                relevance: 10
            }, {
                begin: '"""',
                end: '"""',
                relevance: 10
            }, {
                begin: '"',
                end: '"'
            }, {
                begin: "'",
                end: "'"
            }]
        }
          , c = {
            begin: /\[/,
            end: /\]/,
            contains: [i, r, t, l, a, "self"],
            relevance: 0
        }
          , g = "(" + [/[A-Za-z0-9_-]+/, /"(\\"|[^"])*"/, /'[^']*'/].map((n=>e(n))).join("|") + ")";
        return {
            name: "TOML, also INI",
            aliases: ["toml"],
            case_insensitive: !0,
            illegal: /\S/,
            contains: [i, {
                className: "section",
                begin: /\[+/,
                end: /\]+/
            }, {
                begin: n(g, "(\\s*\\.\\s*", g, ")*", n("(?=", /\s*=\s*[^#\s]/, ")")),
                className: "attr",
                starts: {
                    end: /$/,
                    contains: [i, c, r, t, l, a]
                }
            }]
        }
    }
}
)());
hljs.registerLanguage("markdown", (()=>{
    "use strict";
    function n(...n) {
        return n.map((n=>{
            return (e = n) ? "string" == typeof e ? e : e.source : null;
            var e
        }
        )).join("")
    }
    return e=>{
        const a = {
            begin: /<\/?[A-Za-z_]/,
            end: ">",
            subLanguage: "xml",
            relevance: 0
        }
          , i = {
            variants: [{
                begin: /\[.+?\]\[.*?\]/,
                relevance: 0
            }, {
                begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
                relevance: 2
            }, {
                begin: n(/\[.+?\]\(/, /[A-Za-z][A-Za-z0-9+.-]*/, /:\/\/.*?\)/),
                relevance: 2
            }, {
                begin: /\[.+?\]\([./?&#].*?\)/,
                relevance: 1
            }, {
                begin: /\[.+?\]\(.*?\)/,
                relevance: 0
            }],
            returnBegin: !0,
            contains: [{
                className: "string",
                relevance: 0,
                begin: "\\[",
                end: "\\]",
                excludeBegin: !0,
                returnEnd: !0
            }, {
                className: "link",
                relevance: 0,
                begin: "\\]\\(",
                end: "\\)",
                excludeBegin: !0,
                excludeEnd: !0
            }, {
                className: "symbol",
                relevance: 0,
                begin: "\\]\\[",
                end: "\\]",
                excludeBegin: !0,
                excludeEnd: !0
            }]
        }
          , s = {
            className: "strong",
            contains: [],
            variants: [{
                begin: /_{2}/,
                end: /_{2}/
            }, {
                begin: /\*{2}/,
                end: /\*{2}/
            }]
        }
          , c = {
            className: "emphasis",
            contains: [],
            variants: [{
                begin: /\*(?!\*)/,
                end: /\*/
            }, {
                begin: /_(?!_)/,
                end: /_/,
                relevance: 0
            }]
        };
        s.contains.push(c),
        c.contains.push(s);
        let t = [a, i];
        return s.contains = s.contains.concat(t),
        c.contains = c.contains.concat(t),
        t = t.concat(s, c),
        {
            name: "Markdown",
            aliases: ["md", "mkdown", "mkd"],
            contains: [{
                className: "section",
                variants: [{
                    begin: "^#{1,6}",
                    end: "$",
                    contains: t
                }, {
                    begin: "(?=^.+?\\n[=-]{2,}$)",
                    contains: [{
                        begin: "^[=-]*$"
                    }, {
                        begin: "^",
                        end: "\\n",
                        contains: t
                    }]
                }]
            }, a, {
                className: "bullet",
                begin: "^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
                end: "\\s+",
                excludeEnd: !0
            }, s, c, {
                className: "quote",
                begin: "^>\\s+",
                contains: t,
                end: "$"
            }, {
                className: "code",
                variants: [{
                    begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*"
                }, {
                    begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*"
                }, {
                    begin: "```",
                    end: "```+[ ]*$"
                }, {
                    begin: "~~~",
                    end: "~~~+[ ]*$"
                }, {
                    begin: "`.+?`"
                }, {
                    begin: "(?=^( {4}|\\t))",
                    contains: [{
                        begin: "^( {4}|\\t)",
                        end: "(\\n)$"
                    }],
                    relevance: 0
                }]
            }, {
                begin: "^[-\\*]{3,}",
                end: "$"
            }, i, {
                begin: /^\[[^\n]+\]:/,
                returnBegin: !0,
                contains: [{
                    className: "symbol",
                    begin: /\[/,
                    end: /\]/,
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "link",
                    begin: /:\s*/,
                    end: /$/,
                    excludeBegin: !0
                }]
            }]
        }
    }
}
)());
hljs.registerLanguage("dart", (()=>{
    "use strict";
    return e=>{
        const n = {
            className: "subst",
            variants: [{
                begin: "\\$[A-Za-z0-9_]+"
            }]
        }
          , a = {
            className: "subst",
            variants: [{
                begin: /\$\{/,
                end: /\}/
            }],
            keywords: "true false null this is new super"
        }
          , t = {
            className: "string",
            variants: [{
                begin: "r'''",
                end: "'''"
            }, {
                begin: 'r"""',
                end: '"""'
            }, {
                begin: "r'",
                end: "'",
                illegal: "\\n"
            }, {
                begin: 'r"',
                end: '"',
                illegal: "\\n"
            }, {
                begin: "'''",
                end: "'''",
                contains: [e.BACKSLASH_ESCAPE, n, a]
            }, {
                begin: '"""',
                end: '"""',
                contains: [e.BACKSLASH_ESCAPE, n, a]
            }, {
                begin: "'",
                end: "'",
                illegal: "\\n",
                contains: [e.BACKSLASH_ESCAPE, n, a]
            }, {
                begin: '"',
                end: '"',
                illegal: "\\n",
                contains: [e.BACKSLASH_ESCAPE, n, a]
            }]
        };
        a.contains = [e.C_NUMBER_MODE, t];
        const i = ["Comparable", "DateTime", "Duration", "Function", "Iterable", "Iterator", "List", "Map", "Match", "Object", "Pattern", "RegExp", "Set", "Stopwatch", "String", "StringBuffer", "StringSink", "Symbol", "Type", "Uri", "bool", "double", "int", "num", "Element", "ElementList"]
          , r = i.map((e=>e + "?"));
        return {
            name: "Dart",
            keywords: {
                keyword: "abstract as assert async await break case catch class const continue covariant default deferred do dynamic else enum export extends extension external factory false final finally for Function get hide if implements import in inferface is late library mixin new null on operator part required rethrow return set show static super switch sync this throw true try typedef var void while with yield",
                built_in: i.concat(r).concat(["Never", "Null", "dynamic", "print", "document", "querySelector", "querySelectorAll", "window"]),
                $pattern: /[A-Za-z][A-Za-z0-9_]*\??/
            },
            contains: [t, e.COMMENT(/\/\*\*(?!\/)/, /\*\//, {
                subLanguage: "markdown",
                relevance: 0
            }), e.COMMENT(/\/{3,} ?/, /$/, {
                contains: [{
                    subLanguage: "markdown",
                    begin: ".",
                    end: "$",
                    relevance: 0
                }]
            }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                className: "class",
                beginKeywords: "class interface",
                end: /\{/,
                excludeEnd: !0,
                contains: [{
                    beginKeywords: "extends implements"
                }, e.UNDERSCORE_TITLE_MODE]
            }, e.C_NUMBER_MODE, {
                className: "meta",
                begin: "@[A-Za-z]+"
            }, {
                begin: "=>"
            }]
        }
    }
}
)());
hljs.registerLanguage("apache", (()=>{
    "use strict";
    return e=>{
        const n = {
            className: "number",
            begin: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?/
        };
        return {
            name: "Apache config",
            aliases: ["apacheconf"],
            case_insensitive: !0,
            contains: [e.HASH_COMMENT_MODE, {
                className: "section",
                begin: /<\/?/,
                end: />/,
                contains: [n, {
                    className: "number",
                    begin: /:\d{1,5}/
                }, e.inherit(e.QUOTE_STRING_MODE, {
                    relevance: 0
                })]
            }, {
                className: "attribute",
                begin: /\w+/,
                relevance: 0,
                keywords: {
                    nomarkup: "order deny allow setenv rewriterule rewriteengine rewritecond documentroot sethandler errordocument loadmodule options header listen serverroot servername"
                },
                starts: {
                    end: /$/,
                    relevance: 0,
                    keywords: {
                        literal: "on off all deny allow"
                    },
                    contains: [{
                        className: "meta",
                        begin: /\s\[/,
                        end: /\]$/
                    }, {
                        className: "variable",
                        begin: /[\$%]\{/,
                        end: /\}/,
                        contains: ["self", {
                            className: "number",
                            begin: /[$%]\d+/
                        }]
                    }, n, {
                        className: "number",
                        begin: /\d+/
                    }, e.QUOTE_STRING_MODE]
                }
            }],
            illegal: /\S/
        }
    }
}
)());
hljs.registerLanguage("go", (()=>{
    "use strict";
    return e=>{
        const n = {
            keyword: "break default func interface select case map struct chan else goto package switch const fallthrough if range type continue for import return var go defer bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 uint16 uint32 uint64 int uint uintptr rune",
            literal: "true false iota nil",
            built_in: "append cap close complex copy imag len make new panic print println real recover delete"
        };
        return {
            name: "Go",
            aliases: ["golang"],
            keywords: n,
            illegal: "</",
            contains: [e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, {
                className: "string",
                variants: [e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
                    begin: "`",
                    end: "`"
                }]
            }, {
                className: "number",
                variants: [{
                    begin: e.C_NUMBER_RE + "[i]",
                    relevance: 1
                }, e.C_NUMBER_MODE]
            }, {
                begin: /:=/
            }, {
                className: "function",
                beginKeywords: "func",
                end: "\\s*(\\{|$)",
                excludeEnd: !0,
                contains: [e.TITLE_MODE, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: n,
                    illegal: /["']/
                }]
            }]
        }
    }
}
)());
hljs.registerLanguage("perl", (()=>{
    "use strict";
    function e(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    function n(...n) {
        return n.map((n=>e(n))).join("")
    }
    function t(...n) {
        return "(" + n.map((n=>e(n))).join("|") + ")"
    }
    return e=>{
        const r = /[dualxmsipngr]{0,12}/
          , s = {
            $pattern: /[\w.]+/,
            keyword: "abs accept alarm and atan2 bind binmode bless break caller chdir chmod chomp chop chown chr chroot close closedir connect continue cos crypt dbmclose dbmopen defined delete die do dump each else elsif endgrent endhostent endnetent endprotoent endpwent endservent eof eval exec exists exit exp fcntl fileno flock for foreach fork format formline getc getgrent getgrgid getgrnam gethostbyaddr gethostbyname gethostent getlogin getnetbyaddr getnetbyname getnetent getpeername getpgrp getpriority getprotobyname getprotobynumber getprotoent getpwent getpwnam getpwuid getservbyname getservbyport getservent getsockname getsockopt given glob gmtime goto grep gt hex if index int ioctl join keys kill last lc lcfirst length link listen local localtime log lstat lt ma map mkdir msgctl msgget msgrcv msgsnd my ne next no not oct open opendir or ord our pack package pipe pop pos print printf prototype push q|0 qq quotemeta qw qx rand read readdir readline readlink readpipe recv redo ref rename require reset return reverse rewinddir rindex rmdir say scalar seek seekdir select semctl semget semop send setgrent sethostent setnetent setpgrp setpriority setprotoent setpwent setservent setsockopt shift shmctl shmget shmread shmwrite shutdown sin sleep socket socketpair sort splice split sprintf sqrt srand stat state study sub substr symlink syscall sysopen sysread sysseek system syswrite tell telldir tie tied time times tr truncate uc ucfirst umask undef unless unlink unpack unshift untie until use utime values vec wait waitpid wantarray warn when while write x|0 xor y|0"
        }
          , i = {
            className: "subst",
            begin: "[$@]\\{",
            end: "\\}",
            keywords: s
        }
          , a = {
            begin: /->\{/,
            end: /\}/
        }
          , o = {
            variants: [{
                begin: /\$\d/
            }, {
                begin: n(/[$%@](\^\w\b|#\w+(::\w+)*|\{\w+\}|\w+(::\w*)*)/, "(?![A-Za-z])(?![@$%])")
            }, {
                begin: /[$%@][^\s\w{]/,
                relevance: 0
            }]
        }
          , c = [e.BACKSLASH_ESCAPE, i, o]
          , g = [/!/, /\//, /\|/, /\?/, /'/, /"/, /#/]
          , l = (e,t,s="\\1")=>{
            const i = "\\1" === s ? s : n(s, t);
            return n(n("(?:", e, ")"), t, /(?:\\.|[^\\\/])*?/, i, /(?:\\.|[^\\\/])*?/, s, r)
        }
          , d = (e,t,s)=>n(n("(?:", e, ")"), t, /(?:\\.|[^\\\/])*?/, s, r)
          , p = [o, e.HASH_COMMENT_MODE, e.COMMENT(/^=\w/, /=cut/, {
            endsWithParent: !0
        }), a, {
            className: "string",
            contains: c,
            variants: [{
                begin: "q[qwxr]?\\s*\\(",
                end: "\\)",
                relevance: 5
            }, {
                begin: "q[qwxr]?\\s*\\[",
                end: "\\]",
                relevance: 5
            }, {
                begin: "q[qwxr]?\\s*\\{",
                end: "\\}",
                relevance: 5
            }, {
                begin: "q[qwxr]?\\s*\\|",
                end: "\\|",
                relevance: 5
            }, {
                begin: "q[qwxr]?\\s*<",
                end: ">",
                relevance: 5
            }, {
                begin: "qw\\s+q",
                end: "q",
                relevance: 5
            }, {
                begin: "'",
                end: "'",
                contains: [e.BACKSLASH_ESCAPE]
            }, {
                begin: '"',
                end: '"'
            }, {
                begin: "`",
                end: "`",
                contains: [e.BACKSLASH_ESCAPE]
            }, {
                begin: /\{\w+\}/,
                relevance: 0
            }, {
                begin: "-?\\w+\\s*=>",
                relevance: 0
            }]
        }, {
            className: "number",
            begin: "(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b",
            relevance: 0
        }, {
            begin: "(\\/\\/|" + e.RE_STARTERS_RE + "|\\b(split|return|print|reverse|grep)\\b)\\s*",
            keywords: "split return print reverse grep",
            relevance: 0,
            contains: [e.HASH_COMMENT_MODE, {
                className: "regexp",
                variants: [{
                    begin: l("s|tr|y", t(...g))
                }, {
                    begin: l("s|tr|y", "\\(", "\\)")
                }, {
                    begin: l("s|tr|y", "\\[", "\\]")
                }, {
                    begin: l("s|tr|y", "\\{", "\\}")
                }],
                relevance: 2
            }, {
                className: "regexp",
                variants: [{
                    begin: /(m|qr)\/\//,
                    relevance: 0
                }, {
                    begin: d("(?:m|qr)?", /\//, /\//)
                }, {
                    begin: d("m|qr", t(...g), /\1/)
                }, {
                    begin: d("m|qr", /\(/, /\)/)
                }, {
                    begin: d("m|qr", /\[/, /\]/)
                }, {
                    begin: d("m|qr", /\{/, /\}/)
                }]
            }]
        }, {
            className: "function",
            beginKeywords: "sub",
            end: "(\\s*\\(.*?\\))?[;{]",
            excludeEnd: !0,
            relevance: 5,
            contains: [e.TITLE_MODE]
        }, {
            begin: "-\\w\\b",
            relevance: 0
        }, {
            begin: "^__DATA__$",
            end: "^__END__$",
            subLanguage: "mojolicious",
            contains: [{
                begin: "^@@.*",
                end: "$",
                className: "comment"
            }]
        }];
        return i.contains = p,
        a.contains = p,
        {
            name: "Perl",
            aliases: ["pl", "pm"],
            keywords: s,
            contains: p
        }
    }
}
)());
hljs.registerLanguage("lua", (()=>{
    "use strict";
    return e=>{
        const t = "\\[=*\\["
          , a = "\\]=*\\]"
          , n = {
            begin: t,
            end: a,
            contains: ["self"]
        }
          , o = [e.COMMENT("--(?!\\[=*\\[)", "$"), e.COMMENT("--\\[=*\\[", a, {
            contains: [n],
            relevance: 10
        })];
        return {
            name: "Lua",
            keywords: {
                $pattern: e.UNDERSCORE_IDENT_RE,
                literal: "true false nil",
                keyword: "and break do else elseif end for goto if in local not or repeat return then until while",
                built_in: "_G _ENV _VERSION __index __newindex __mode __call __metatable __tostring __len __gc __add __sub __mul __div __mod __pow __concat __unm __eq __lt __le assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall arg self coroutine resume yield status wrap create running debug getupvalue debug sethook getmetatable gethook setmetatable setlocal traceback setfenv getinfo setupvalue getlocal getregistry getfenv io lines write close flush open output type read stderr stdin input stdout popen tmpfile math log max acos huge ldexp pi cos tanh pow deg tan cosh sinh random randomseed frexp ceil floor rad abs sqrt modf asin min mod fmod log10 atan2 exp sin atan os exit setlocale date getenv difftime remove time clock tmpname rename execute package preload loadlib loaded loaders cpath config path seeall string sub upper len gfind rep find match char dump gmatch reverse byte format gsub lower table setn insert getn foreachi maxn foreach concat sort remove"
            },
            contains: o.concat([{
                className: "function",
                beginKeywords: "function",
                end: "\\)",
                contains: [e.inherit(e.TITLE_MODE, {
                    begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
                }), {
                    className: "params",
                    begin: "\\(",
                    endsWithParent: !0,
                    contains: o
                }].concat(o)
            }, e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                className: "string",
                begin: t,
                end: a,
                contains: [n],
                relevance: 5
            }])
        }
    }
}
)());
hljs.registerLanguage("cpp", (()=>{
    "use strict";
    function e(e) {
        return t("(", e, ")?")
    }
    function t(...e) {
        return e.map((e=>{
            return (t = e) ? "string" == typeof t ? t : t.source : null;
            var t
        }
        )).join("")
    }
    return n=>{
        const r = n.COMMENT("//", "$", {
            contains: [{
                begin: /\\\n/
            }]
        })
          , a = "[a-zA-Z_]\\w*::"
          , i = "(decltype\\(auto\\)|" + e(a) + "[a-zA-Z_]\\w*" + e("<[^<>]+>") + ")"
          , s = {
            className: "keyword",
            begin: "\\b[a-z\\d_]*_t\\b"
        }
          , c = {
            className: "string",
            variants: [{
                begin: '(u8?|U|L)?"',
                end: '"',
                illegal: "\\n",
                contains: [n.BACKSLASH_ESCAPE]
            }, {
                begin: "(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
                end: "'",
                illegal: "."
            }, n.END_SAME_AS_BEGIN({
                begin: /(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,
                end: /\)([^()\\ ]{0,16})"/
            })]
        }
          , o = {
            className: "number",
            variants: [{
                begin: "\\b(0b[01']+)"
            }, {
                begin: "(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"
            }, {
                begin: "(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"
            }],
            relevance: 0
        }
          , l = {
            className: "meta",
            begin: /#\s*[a-z]+\b/,
            end: /$/,
            keywords: {
                "meta-keyword": "if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"
            },
            contains: [{
                begin: /\\\n/,
                relevance: 0
            }, n.inherit(c, {
                className: "meta-string"
            }), {
                className: "meta-string",
                begin: /<.*?>/
            }, r, n.C_BLOCK_COMMENT_MODE]
        }
          , d = {
            className: "title",
            begin: e(a) + n.IDENT_RE,
            relevance: 0
        }
          , u = e(a) + n.IDENT_RE + "\\s*\\("
          , m = {
            keyword: "int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",
            built_in: "_Bool _Complex _Imaginary",
            _relevance_hints: ["asin", "atan2", "atan", "calloc", "ceil", "cosh", "cos", "exit", "exp", "fabs", "floor", "fmod", "fprintf", "fputs", "free", "frexp", "auto_ptr", "deque", "list", "queue", "stack", "vector", "map", "set", "pair", "bitset", "multiset", "multimap", "unordered_set", "fscanf", "future", "isalnum", "isalpha", "iscntrl", "isdigit", "isgraph", "islower", "isprint", "ispunct", "isspace", "isupper", "isxdigit", "tolower", "toupper", "labs", "ldexp", "log10", "log", "malloc", "realloc", "memchr", "memcmp", "memcpy", "memset", "modf", "pow", "printf", "putchar", "puts", "scanf", "sinh", "sin", "snprintf", "sprintf", "sqrt", "sscanf", "strcat", "strchr", "strcmp", "strcpy", "strcspn", "strlen", "strncat", "strncmp", "strncpy", "strpbrk", "strrchr", "strspn", "strstr", "tanh", "tan", "unordered_map", "unordered_multiset", "unordered_multimap", "priority_queue", "make_pair", "array", "shared_ptr", "abort", "terminate", "abs", "acos", "vfprintf", "vprintf", "vsprintf", "endl", "initializer_list", "unique_ptr", "complex", "imaginary", "std", "string", "wstring", "cin", "cout", "cerr", "clog", "stdin", "stdout", "stderr", "stringstream", "istringstream", "ostringstream"],
            literal: "true false nullptr NULL"
        }
          , p = {
            className: "function.dispatch",
            relevance: 0,
            keywords: m,
            begin: t(/\b/, /(?!decltype)/, /(?!if)/, /(?!for)/, /(?!while)/, n.IDENT_RE, (_ = /\s*\(/,
            t("(?=", _, ")")))
        };
        var _;
        const g = [p, l, s, r, n.C_BLOCK_COMMENT_MODE, o, c]
          , b = {
            variants: [{
                begin: /=/,
                end: /;/
            }, {
                begin: /\(/,
                end: /\)/
            }, {
                beginKeywords: "new throw return else",
                end: /;/
            }],
            keywords: m,
            contains: g.concat([{
                begin: /\(/,
                end: /\)/,
                keywords: m,
                contains: g.concat(["self"]),
                relevance: 0
            }]),
            relevance: 0
        }
          , f = {
            className: "function",
            begin: "(" + i + "[\\*&\\s]+)+" + u,
            returnBegin: !0,
            end: /[{;=]/,
            excludeEnd: !0,
            keywords: m,
            illegal: /[^\w\s\*&:<>.]/,
            contains: [{
                begin: "decltype\\(auto\\)",
                keywords: m,
                relevance: 0
            }, {
                begin: u,
                returnBegin: !0,
                contains: [d],
                relevance: 0
            }, {
                begin: /::/,
                relevance: 0
            }, {
                begin: /:/,
                endsWithParent: !0,
                contains: [c, o]
            }, {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: m,
                relevance: 0,
                contains: [r, n.C_BLOCK_COMMENT_MODE, c, o, s, {
                    begin: /\(/,
                    end: /\)/,
                    keywords: m,
                    relevance: 0,
                    contains: ["self", r, n.C_BLOCK_COMMENT_MODE, c, o, s]
                }]
            }, s, r, n.C_BLOCK_COMMENT_MODE, l]
        };
        return {
            name: "C++",
            aliases: ["cc", "c++", "h++", "hpp", "hh", "hxx", "cxx"],
            keywords: m,
            illegal: "</",
            classNameAliases: {
                "function.dispatch": "built_in"
            },
            contains: [].concat(b, f, p, g, [l, {
                begin: "\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",
                end: ">",
                keywords: m,
                contains: ["self", s]
            }, {
                begin: n.IDENT_RE + "::",
                keywords: m
            }, {
                className: "class",
                beginKeywords: "enum class struct union",
                end: /[{;:<>=]/,
                contains: [{
                    beginKeywords: "final class struct"
                }, n.TITLE_MODE]
            }]),
            exports: {
                preprocessor: l,
                strings: c,
                keywords: m
            }
        }
    }
}
)());
hljs.registerLanguage("scss", (()=>{
    "use strict";
    const e = ["a", "abbr", "address", "article", "aside", "audio", "b", "blockquote", "body", "button", "canvas", "caption", "cite", "code", "dd", "del", "details", "dfn", "div", "dl", "dt", "em", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "html", "i", "iframe", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "mark", "menu", "nav", "object", "ol", "p", "q", "quote", "samp", "section", "span", "strong", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "ul", "var", "video"]
      , t = ["any-hover", "any-pointer", "aspect-ratio", "color", "color-gamut", "color-index", "device-aspect-ratio", "device-height", "device-width", "display-mode", "forced-colors", "grid", "height", "hover", "inverted-colors", "monochrome", "orientation", "overflow-block", "overflow-inline", "pointer", "prefers-color-scheme", "prefers-contrast", "prefers-reduced-motion", "prefers-reduced-transparency", "resolution", "scan", "scripting", "update", "width", "min-width", "max-width", "min-height", "max-height"]
      , i = ["active", "any-link", "blank", "checked", "current", "default", "defined", "dir", "disabled", "drop", "empty", "enabled", "first", "first-child", "first-of-type", "fullscreen", "future", "focus", "focus-visible", "focus-within", "has", "host", "host-context", "hover", "indeterminate", "in-range", "invalid", "is", "lang", "last-child", "last-of-type", "left", "link", "local-link", "not", "nth-child", "nth-col", "nth-last-child", "nth-last-col", "nth-last-of-type", "nth-of-type", "only-child", "only-of-type", "optional", "out-of-range", "past", "placeholder-shown", "read-only", "read-write", "required", "right", "root", "scope", "target", "target-within", "user-invalid", "valid", "visited", "where"]
      , o = ["after", "backdrop", "before", "cue", "cue-region", "first-letter", "first-line", "grammar-error", "marker", "part", "placeholder", "selection", "slotted", "spelling-error"]
      , r = ["align-content", "align-items", "align-self", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timing-function", "auto", "backface-visibility", "background", "background-attachment", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-repeat", "background-size", "border", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "clear", "clip", "clip-path", "color", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "content", "counter-increment", "counter-reset", "cursor", "direction", "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-size", "font-size-adjust", "font-smoothing", "font-stretch", "font-style", "font-variant", "font-variant-ligatures", "font-variation-settings", "font-weight", "height", "hyphens", "icon", "image-orientation", "image-rendering", "image-resolution", "ime-mode", "inherit", "initial", "justify-content", "left", "letter-spacing", "line-height", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-bottom", "margin-left", "margin-right", "margin-top", "marks", "mask", "max-height", "max-width", "min-height", "min-width", "nav-down", "nav-index", "nav-left", "nav-right", "nav-up", "none", "normal", "object-fit", "object-position", "opacity", "order", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-wrap", "overflow-x", "overflow-y", "padding", "padding-bottom", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "perspective", "perspective-origin", "pointer-events", "position", "quotes", "resize", "right", "src", "tab-size", "table-layout", "text-align", "text-align-last", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-style", "text-indent", "text-overflow", "text-rendering", "text-shadow", "text-transform", "text-underline-position", "top", "transform", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "unicode-bidi", "vertical-align", "visibility", "white-space", "widows", "width", "word-break", "word-spacing", "word-wrap", "z-index"].reverse();
    return a=>{
        const n = (e=>({
            IMPORTANT: {
                className: "meta",
                begin: "!important"
            },
            HEXCOLOR: {
                className: "number",
                begin: "#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})"
            },
            ATTRIBUTE_SELECTOR_MODE: {
                className: "selector-attr",
                begin: /\[/,
                end: /\]/,
                illegal: "$",
                contains: [e.APOS_STRING_MODE, e.QUOTE_STRING_MODE]
            }
        }))(a)
          , l = o
          , s = i
          , d = "@[a-z-]+"
          , c = {
            className: "variable",
            begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"
        };
        return {
            name: "SCSS",
            case_insensitive: !0,
            illegal: "[=/|']",
            contains: [a.C_LINE_COMMENT_MODE, a.C_BLOCK_COMMENT_MODE, {
                className: "selector-id",
                begin: "#[A-Za-z0-9_-]+",
                relevance: 0
            }, {
                className: "selector-class",
                begin: "\\.[A-Za-z0-9_-]+",
                relevance: 0
            }, n.ATTRIBUTE_SELECTOR_MODE, {
                className: "selector-tag",
                begin: "\\b(" + e.join("|") + ")\\b",
                relevance: 0
            }, {
                className: "selector-pseudo",
                begin: ":(" + s.join("|") + ")"
            }, {
                className: "selector-pseudo",
                begin: "::(" + l.join("|") + ")"
            }, c, {
                begin: /\(/,
                end: /\)/,
                contains: [a.CSS_NUMBER_MODE]
            }, {
                className: "attribute",
                begin: "\\b(" + r.join("|") + ")\\b"
            }, {
                begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
            }, {
                begin: ":",
                end: ";",
                contains: [c, n.HEXCOLOR, a.CSS_NUMBER_MODE, a.QUOTE_STRING_MODE, a.APOS_STRING_MODE, n.IMPORTANT]
            }, {
                begin: "@(page|font-face)",
                lexemes: d,
                keywords: "@page @font-face"
            }, {
                begin: "@",
                end: "[{;]",
                returnBegin: !0,
                keywords: {
                    $pattern: /[a-z-]+/,
                    keyword: "and or not only",
                    attribute: t.join(" ")
                },
                contains: [{
                    begin: d,
                    className: "keyword"
                }, {
                    begin: /[a-z-]+(?=:)/,
                    className: "attribute"
                }, c, a.QUOTE_STRING_MODE, a.APOS_STRING_MODE, n.HEXCOLOR, a.CSS_NUMBER_MODE]
            }]
        }
    }
}
)());
hljs.registerLanguage("http", (()=>{
    "use strict";
    function e(...e) {
        return e.map((e=>{
            return (n = e) ? "string" == typeof n ? n : n.source : null;
            var n
        }
        )).join("")
    }
    return n=>{
        const a = "HTTP/(2|1\\.[01])"
          , s = {
            className: "attribute",
            begin: e("^", /[A-Za-z][A-Za-z0-9-]*/, "(?=\\:\\s)"),
            starts: {
                contains: [{
                    className: "punctuation",
                    begin: /: /,
                    relevance: 0,
                    starts: {
                        end: "$",
                        relevance: 0
                    }
                }]
            }
        }
          , t = [s, {
            begin: "\\n\\n",
            starts: {
                subLanguage: [],
                endsWithParent: !0
            }
        }];
        return {
            name: "HTTP",
            aliases: ["https"],
            illegal: /\S/,
            contains: [{
                begin: "^(?=" + a + " \\d{3})",
                end: /$/,
                contains: [{
                    className: "meta",
                    begin: a
                }, {
                    className: "number",
                    begin: "\\b\\d{3}\\b"
                }],
                starts: {
                    end: /\b\B/,
                    illegal: /\S/,
                    contains: t
                }
            }, {
                begin: "(?=^[A-Z]+ (.*?) " + a + "$)",
                end: /$/,
                contains: [{
                    className: "string",
                    begin: " ",
                    end: " ",
                    excludeBegin: !0,
                    excludeEnd: !0
                }, {
                    className: "meta",
                    begin: a
                }, {
                    className: "keyword",
                    begin: "[A-Z]+"
                }],
                starts: {
                    end: /\b\B/,
                    illegal: /\S/,
                    contains: t
                }
            }, n.inherit(s, {
                relevance: 0
            })]
        }
    }
}
)());
hljs.registerLanguage("plaintext", (()=>{
    "use strict";
    return t=>({
        name: "Plain text",
        aliases: ["text", "txt"],
        disableAutodetect: !0
    })
}
)());
hljs.registerLanguage("powershell", (()=>{
    "use strict";
    return e=>{
        const n = {
            $pattern: /-?[A-z\.\-]+\b/,
            keyword: "if else foreach return do while until elseif begin for trap data dynamicparam end break throw param continue finally in switch exit filter try process catch hidden static parameter",
            built_in: "ac asnp cat cd CFS chdir clc clear clhy cli clp cls clv cnsn compare copy cp cpi cpp curl cvpa dbp del diff dir dnsn ebp echo|0 epal epcsv epsn erase etsn exsn fc fhx fl ft fw gal gbp gc gcb gci gcm gcs gdr gerr ghy gi gin gjb gl gm gmo gp gps gpv group gsn gsnp gsv gtz gu gv gwmi h history icm iex ihy ii ipal ipcsv ipmo ipsn irm ise iwmi iwr kill lp ls man md measure mi mount move mp mv nal ndr ni nmo npssc nsn nv ogv oh popd ps pushd pwd r rbp rcjb rcsn rd rdr ren ri rjb rm rmdir rmo rni rnp rp rsn rsnp rujb rv rvpa rwmi sajb sal saps sasv sbp sc scb select set shcm si sl sleep sls sort sp spjb spps spsv start stz sujb sv swmi tee trcm type wget where wjb write"
        }
          , s = {
            begin: "`[\\s\\S]",
            relevance: 0
        }
          , i = {
            className: "variable",
            variants: [{
                begin: /\$\B/
            }, {
                className: "keyword",
                begin: /\$this/
            }, {
                begin: /\$[\w\d][\w\d_:]*/
            }]
        }
          , a = {
            className: "string",
            variants: [{
                begin: /"/,
                end: /"/
            }, {
                begin: /@"/,
                end: /^"@/
            }],
            contains: [s, i, {
                className: "variable",
                begin: /\$[A-z]/,
                end: /[^A-z]/
            }]
        }
          , t = {
            className: "string",
            variants: [{
                begin: /'/,
                end: /'/
            }, {
                begin: /@'/,
                end: /^'@/
            }]
        }
          , r = e.inherit(e.COMMENT(null, null), {
            variants: [{
                begin: /#/,
                end: /$/
            }, {
                begin: /<#/,
                end: /#>/
            }],
            contains: [{
                className: "doctag",
                variants: [{
                    begin: /\.(synopsis|description|example|inputs|outputs|notes|link|component|role|functionality)/
                }, {
                    begin: /\.(parameter|forwardhelptargetname|forwardhelpcategory|remotehelprunspace|externalhelp)\s+\S+/
                }]
            }]
        })
          , c = {
            className: "class",
            beginKeywords: "class enum",
            end: /\s*[{]/,
            excludeEnd: !0,
            relevance: 0,
            contains: [e.TITLE_MODE]
        }
          , l = {
            className: "function",
            begin: /function\s+/,
            end: /\s*\{|$/,
            excludeEnd: !0,
            returnBegin: !0,
            relevance: 0,
            contains: [{
                begin: "function",
                relevance: 0,
                className: "keyword"
            }, {
                className: "title",
                begin: /\w[\w\d]*((-)[\w\d]+)*/,
                relevance: 0
            }, {
                begin: /\(/,
                end: /\)/,
                className: "params",
                relevance: 0,
                contains: [i]
            }]
        }
          , o = {
            begin: /using\s/,
            end: /$/,
            returnBegin: !0,
            contains: [a, t, {
                className: "keyword",
                begin: /(using|assembly|command|module|namespace|type)/
            }]
        }
          , p = {
            className: "function",
            begin: /\[.*\]\s*[\w]+[ ]??\(/,
            end: /$/,
            returnBegin: !0,
            relevance: 0,
            contains: [{
                className: "keyword",
                begin: "(".concat(n.keyword.toString().replace(/\s/g, "|"), ")\\b"),
                endsParent: !0,
                relevance: 0
            }, e.inherit(e.TITLE_MODE, {
                endsParent: !0
            })]
        }
          , g = [p, r, s, e.NUMBER_MODE, a, t, {
            className: "built_in",
            variants: [{
                begin: "(Add|Clear|Close|Copy|Enter|Exit|Find|Format|Get|Hide|Join|Lock|Move|New|Open|Optimize|Pop|Push|Redo|Remove|Rename|Reset|Resize|Search|Select|Set|Show|Skip|Split|Step|Switch|Undo|Unlock|Watch|Backup|Checkpoint|Compare|Compress|Convert|ConvertFrom|ConvertTo|Dismount|Edit|Expand|Export|Group|Import|Initialize|Limit|Merge|Mount|Out|Publish|Restore|Save|Sync|Unpublish|Update|Approve|Assert|Build|Complete|Confirm|Deny|Deploy|Disable|Enable|Install|Invoke|Register|Request|Restart|Resume|Start|Stop|Submit|Suspend|Uninstall|Unregister|Wait|Debug|Measure|Ping|Repair|Resolve|Test|Trace|Connect|Disconnect|Read|Receive|Send|Write|Block|Grant|Protect|Revoke|Unblock|Unprotect|Use|ForEach|Sort|Tee|Where)+(-)[\\w\\d]+"
            }]
        }, i, {
            className: "literal",
            begin: /\$(null|true|false)\b/
        }, {
            className: "selector-tag",
            begin: /@\B/,
            relevance: 0
        }]
          , m = {
            begin: /\[/,
            end: /\]/,
            excludeBegin: !0,
            excludeEnd: !0,
            relevance: 0,
            contains: [].concat("self", g, {
                begin: "(string|char|byte|int|long|bool|decimal|single|double|DateTime|xml|array|hashtable|void)",
                className: "built_in",
                relevance: 0
            }, {
                className: "type",
                begin: /[\.\w\d]+/,
                relevance: 0
            })
        };
        return p.contains.unshift(m),
        {
            name: "PowerShell",
            aliases: ["ps", "ps1"],
            case_insensitive: !0,
            keywords: n,
            contains: g.concat(c, l, o, {
                variants: [{
                    className: "operator",
                    begin: "(-and|-as|-band|-bnot|-bor|-bxor|-casesensitive|-ccontains|-ceq|-cge|-cgt|-cle|-clike|-clt|-cmatch|-cne|-cnotcontains|-cnotlike|-cnotmatch|-contains|-creplace|-csplit|-eq|-exact|-f|-file|-ge|-gt|-icontains|-ieq|-ige|-igt|-ile|-ilike|-ilt|-imatch|-in|-ine|-inotcontains|-inotlike|-inotmatch|-ireplace|-is|-isnot|-isplit|-join|-le|-like|-lt|-match|-ne|-not|-notcontains|-notin|-notlike|-notmatch|-or|-regex|-replace|-shl|-shr|-split|-wildcard|-xor)\\b"
                }, {
                    className: "literal",
                    begin: /(-)[\w\d]+/,
                    relevance: 0
                }]
            }, m)
        }
    }
}
)());
hljs.registerLanguage("sql", (()=>{
    "use strict";
    function e(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    function r(...r) {
        return r.map((r=>e(r))).join("")
    }
    function t(...r) {
        return "(" + r.map((r=>e(r))).join("|") + ")"
    }
    return e=>{
        const n = e.COMMENT("--", "$")
          , a = ["true", "false", "unknown"]
          , i = ["bigint", "binary", "blob", "boolean", "char", "character", "clob", "date", "dec", "decfloat", "decimal", "float", "int", "integer", "interval", "nchar", "nclob", "national", "numeric", "real", "row", "smallint", "time", "timestamp", "varchar", "varying", "varbinary"]
          , s = ["abs", "acos", "array_agg", "asin", "atan", "avg", "cast", "ceil", "ceiling", "coalesce", "corr", "cos", "cosh", "count", "covar_pop", "covar_samp", "cume_dist", "dense_rank", "deref", "element", "exp", "extract", "first_value", "floor", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "last_value", "lead", "listagg", "ln", "log", "log10", "lower", "max", "min", "mod", "nth_value", "ntile", "nullif", "percent_rank", "percentile_cont", "percentile_disc", "position", "position_regex", "power", "rank", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "row_number", "sin", "sinh", "sqrt", "stddev_pop", "stddev_samp", "substring", "substring_regex", "sum", "tan", "tanh", "translate", "translate_regex", "treat", "trim", "trim_array", "unnest", "upper", "value_of", "var_pop", "var_samp", "width_bucket"]
          , o = ["create table", "insert into", "primary key", "foreign key", "not null", "alter table", "add constraint", "grouping sets", "on overflow", "character set", "respect nulls", "ignore nulls", "nulls first", "nulls last", "depth first", "breadth first"]
          , c = s
          , l = ["abs", "acos", "all", "allocate", "alter", "and", "any", "are", "array", "array_agg", "array_max_cardinality", "as", "asensitive", "asin", "asymmetric", "at", "atan", "atomic", "authorization", "avg", "begin", "begin_frame", "begin_partition", "between", "bigint", "binary", "blob", "boolean", "both", "by", "call", "called", "cardinality", "cascaded", "case", "cast", "ceil", "ceiling", "char", "char_length", "character", "character_length", "check", "classifier", "clob", "close", "coalesce", "collate", "collect", "column", "commit", "condition", "connect", "constraint", "contains", "convert", "copy", "corr", "corresponding", "cos", "cosh", "count", "covar_pop", "covar_samp", "create", "cross", "cube", "cume_dist", "current", "current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_row", "current_schema", "current_time", "current_timestamp", "current_path", "current_role", "current_transform_group_for_type", "current_user", "cursor", "cycle", "date", "day", "deallocate", "dec", "decimal", "decfloat", "declare", "default", "define", "delete", "dense_rank", "deref", "describe", "deterministic", "disconnect", "distinct", "double", "drop", "dynamic", "each", "element", "else", "empty", "end", "end_frame", "end_partition", "end-exec", "equals", "escape", "every", "except", "exec", "execute", "exists", "exp", "external", "extract", "false", "fetch", "filter", "first_value", "float", "floor", "for", "foreign", "frame_row", "free", "from", "full", "function", "fusion", "get", "global", "grant", "group", "grouping", "groups", "having", "hold", "hour", "identity", "in", "indicator", "initial", "inner", "inout", "insensitive", "insert", "int", "integer", "intersect", "intersection", "interval", "into", "is", "join", "json_array", "json_arrayagg", "json_exists", "json_object", "json_objectagg", "json_query", "json_table", "json_table_primitive", "json_value", "lag", "language", "large", "last_value", "lateral", "lead", "leading", "left", "like", "like_regex", "listagg", "ln", "local", "localtime", "localtimestamp", "log", "log10", "lower", "match", "match_number", "match_recognize", "matches", "max", "member", "merge", "method", "min", "minute", "mod", "modifies", "module", "month", "multiset", "national", "natural", "nchar", "nclob", "new", "no", "none", "normalize", "not", "nth_value", "ntile", "null", "nullif", "numeric", "octet_length", "occurrences_regex", "of", "offset", "old", "omit", "on", "one", "only", "open", "or", "order", "out", "outer", "over", "overlaps", "overlay", "parameter", "partition", "pattern", "per", "percent", "percent_rank", "percentile_cont", "percentile_disc", "period", "portion", "position", "position_regex", "power", "precedes", "precision", "prepare", "primary", "procedure", "ptf", "range", "rank", "reads", "real", "recursive", "ref", "references", "referencing", "regr_avgx", "regr_avgy", "regr_count", "regr_intercept", "regr_r2", "regr_slope", "regr_sxx", "regr_sxy", "regr_syy", "release", "result", "return", "returns", "revoke", "right", "rollback", "rollup", "row", "row_number", "rows", "running", "savepoint", "scope", "scroll", "search", "second", "seek", "select", "sensitive", "session_user", "set", "show", "similar", "sin", "sinh", "skip", "smallint", "some", "specific", "specifictype", "sql", "sqlexception", "sqlstate", "sqlwarning", "sqrt", "start", "static", "stddev_pop", "stddev_samp", "submultiset", "subset", "substring", "substring_regex", "succeeds", "sum", "symmetric", "system", "system_time", "system_user", "table", "tablesample", "tan", "tanh", "then", "time", "timestamp", "timezone_hour", "timezone_minute", "to", "trailing", "translate", "translate_regex", "translation", "treat", "trigger", "trim", "trim_array", "true", "truncate", "uescape", "union", "unique", "unknown", "unnest", "update   ", "upper", "user", "using", "value", "values", "value_of", "var_pop", "var_samp", "varbinary", "varchar", "varying", "versioning", "when", "whenever", "where", "width_bucket", "window", "with", "within", "without", "year", "add", "asc", "collation", "desc", "final", "first", "last", "view"].filter((e=>!s.includes(e)))
          , u = {
            begin: r(/\b/, t(...c), /\s*\(/),
            keywords: {
                built_in: c
            }
        };
        return {
            name: "SQL",
            case_insensitive: !0,
            illegal: /[{}]|<\//,
            keywords: {
                $pattern: /\b[\w\.]+/,
                keyword: ((e,{exceptions: r, when: t}={})=>{
                    const n = t;
                    return r = r || [],
                    e.map((e=>e.match(/\|\d+$/) || r.includes(e) ? e : n(e) ? e + "|0" : e))
                }
                )(l, {
                    when: e=>e.length < 3
                }),
                literal: a,
                type: i,
                built_in: ["current_catalog", "current_date", "current_default_transform_group", "current_path", "current_role", "current_schema", "current_transform_group_for_type", "current_user", "session_user", "system_time", "system_user", "current_time", "localtime", "current_timestamp", "localtimestamp"]
            },
            contains: [{
                begin: t(...o),
                keywords: {
                    $pattern: /[\w\.]+/,
                    keyword: l.concat(o),
                    literal: a,
                    type: i
                }
            }, {
                className: "type",
                begin: t("double precision", "large object", "with timezone", "without timezone")
            }, u, {
                className: "variable",
                begin: /@[a-z0-9]+/
            }, {
                className: "string",
                variants: [{
                    begin: /'/,
                    end: /'/,
                    contains: [{
                        begin: /''/
                    }]
                }]
            }, {
                begin: /"/,
                end: /"/,
                contains: [{
                    begin: /""/
                }]
            }, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE, n, {
                className: "operator",
                begin: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
                relevance: 0
            }]
        }
    }
}
)());
hljs.registerLanguage("javascript", (()=>{
    "use strict";
    const e = "[A-Za-z$_][0-9A-Za-z$_]*"
      , n = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"]
      , a = ["true", "false", "null", "undefined", "NaN", "Infinity"]
      , s = [].concat(["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"], ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]);
    function r(e) {
        return t("(?=", e, ")")
    }
    function t(...e) {
        return e.map((e=>{
            return (n = e) ? "string" == typeof n ? n : n.source : null;
            var n
        }
        )).join("")
    }
    return i=>{
        const c = e
          , o = {
            begin: /<[A-Za-z0-9\\._:-]+/,
            end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
            isTrulyOpeningTag: (e,n)=>{
                const a = e[0].length + e.index
                  , s = e.input[a];
                "<" !== s ? ">" === s && (((e,{after: n})=>{
                    const a = "</" + e[0].slice(1);
                    return -1 !== e.input.indexOf(a, n)
                }
                )(e, {
                    after: a
                }) || n.ignoreMatch()) : n.ignoreMatch()
            }
        }
          , l = {
            $pattern: e,
            keyword: n,
            literal: a,
            built_in: s
        }
          , g = "\\.([0-9](_?[0-9])*)"
          , b = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*"
          , d = {
            className: "number",
            variants: [{
                begin: `(\\b(${b})((${g})|\\.)?|(${g}))[eE][+-]?([0-9](_?[0-9])*)\\b`
            }, {
                begin: `\\b(${b})\\b((${g})\\b|\\.)?|(${g})\\b`
            }, {
                begin: "\\b(0|[1-9](_?[0-9])*)n\\b"
            }, {
                begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"
            }, {
                begin: "\\b0[bB][0-1](_?[0-1])*n?\\b"
            }, {
                begin: "\\b0[oO][0-7](_?[0-7])*n?\\b"
            }, {
                begin: "\\b0[0-7]+n?\\b"
            }],
            relevance: 0
        }
          , E = {
            className: "subst",
            begin: "\\$\\{",
            end: "\\}",
            keywords: l,
            contains: []
        }
          , u = {
            begin: "html`",
            end: "",
            starts: {
                end: "`",
                returnEnd: !1,
                contains: [i.BACKSLASH_ESCAPE, E],
                subLanguage: "xml"
            }
        }
          , _ = {
            begin: "css`",
            end: "",
            starts: {
                end: "`",
                returnEnd: !1,
                contains: [i.BACKSLASH_ESCAPE, E],
                subLanguage: "css"
            }
        }
          , m = {
            className: "string",
            begin: "`",
            end: "`",
            contains: [i.BACKSLASH_ESCAPE, E]
        }
          , y = {
            className: "comment",
            variants: [i.COMMENT(/\/\*\*(?!\/)/, "\\*/", {
                relevance: 0,
                contains: [{
                    className: "doctag",
                    begin: "@[A-Za-z]+",
                    contains: [{
                        className: "type",
                        begin: "\\{",
                        end: "\\}",
                        relevance: 0
                    }, {
                        className: "variable",
                        begin: c + "(?=\\s*(-)|$)",
                        endsParent: !0,
                        relevance: 0
                    }, {
                        begin: /(?=[^\n])\s/,
                        relevance: 0
                    }]
                }]
            }), i.C_BLOCK_COMMENT_MODE, i.C_LINE_COMMENT_MODE]
        }
          , N = [i.APOS_STRING_MODE, i.QUOTE_STRING_MODE, u, _, m, d, i.REGEXP_MODE];
        E.contains = N.concat({
            begin: /\{/,
            end: /\}/,
            keywords: l,
            contains: ["self"].concat(N)
        });
        const A = [].concat(y, E.contains)
          , f = A.concat([{
            begin: /\(/,
            end: /\)/,
            keywords: l,
            contains: ["self"].concat(A)
        }])
          , p = {
            className: "params",
            begin: /\(/,
            end: /\)/,
            excludeBegin: !0,
            excludeEnd: !0,
            keywords: l,
            contains: f
        };
        return {
            name: "Javascript",
            aliases: ["js", "jsx", "mjs", "cjs"],
            keywords: l,
            exports: {
                PARAMS_CONTAINS: f
            },
            illegal: /#(?![$_A-z])/,
            contains: [i.SHEBANG({
                label: "shebang",
                binary: "node",
                relevance: 5
            }), {
                label: "use_strict",
                className: "meta",
                relevance: 10,
                begin: /^\s*['"]use (strict|asm)['"]/
            }, i.APOS_STRING_MODE, i.QUOTE_STRING_MODE, u, _, m, y, d, {
                begin: t(/[{,\n]\s*/, r(t(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/, c + "\\s*:"))),
                relevance: 0,
                contains: [{
                    className: "attr",
                    begin: c + r("\\s*:"),
                    relevance: 0
                }]
            }, {
                begin: "(" + i.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
                keywords: "return throw case",
                contains: [y, i.REGEXP_MODE, {
                    className: "function",
                    begin: "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + i.UNDERSCORE_IDENT_RE + ")\\s*=>",
                    returnBegin: !0,
                    end: "\\s*=>",
                    contains: [{
                        className: "params",
                        variants: [{
                            begin: i.UNDERSCORE_IDENT_RE,
                            relevance: 0
                        }, {
                            className: null,
                            begin: /\(\s*\)/,
                            skip: !0
                        }, {
                            begin: /\(/,
                            end: /\)/,
                            excludeBegin: !0,
                            excludeEnd: !0,
                            keywords: l,
                            contains: f
                        }]
                    }]
                }, {
                    begin: /,/,
                    relevance: 0
                }, {
                    className: "",
                    begin: /\s/,
                    end: /\s*/,
                    skip: !0
                }, {
                    variants: [{
                        begin: "<>",
                        end: "</>"
                    }, {
                        begin: o.begin,
                        "on:begin": o.isTrulyOpeningTag,
                        end: o.end
                    }],
                    subLanguage: "xml",
                    contains: [{
                        begin: o.begin,
                        end: o.end,
                        skip: !0,
                        contains: ["self"]
                    }]
                }],
                relevance: 0
            }, {
                className: "function",
                beginKeywords: "function",
                end: /[{;]/,
                excludeEnd: !0,
                keywords: l,
                contains: ["self", i.inherit(i.TITLE_MODE, {
                    begin: c
                }), p],
                illegal: /%/
            }, {
                beginKeywords: "while if switch catch for"
            }, {
                className: "function",
                begin: i.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
                returnBegin: !0,
                contains: [p, i.inherit(i.TITLE_MODE, {
                    begin: c
                })]
            }, {
                variants: [{
                    begin: "\\." + c
                }, {
                    begin: "\\$" + c
                }],
                relevance: 0
            }, {
                className: "class",
                beginKeywords: "class",
                end: /[{;=]/,
                excludeEnd: !0,
                illegal: /[:"[\]]/,
                contains: [{
                    beginKeywords: "extends"
                }, i.UNDERSCORE_TITLE_MODE]
            }, {
                begin: /\b(?=constructor)/,
                end: /[{;]/,
                excludeEnd: !0,
                contains: [i.inherit(i.TITLE_MODE, {
                    begin: c
                }), "self", p]
            }, {
                begin: "(get|set)\\s+(?=" + c + "\\()",
                end: /\{/,
                keywords: "get set",
                contains: [i.inherit(i.TITLE_MODE, {
                    begin: c
                }), {
                    begin: /\(\)/
                }, p]
            }, {
                begin: /\$[(.]/
            }]
        }
    }
}
)());
hljs.registerLanguage("java", (()=>{
    "use strict";
    var e = "\\.([0-9](_*[0-9])*)"
      , n = "[0-9a-fA-F](_*[0-9a-fA-F])*"
      , a = {
        className: "number",
        variants: [{
            begin: `(\\b([0-9](_*[0-9])*)((${e})|\\.)?|(${e}))[eE][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
        }, {
            begin: `\\b([0-9](_*[0-9])*)((${e})[fFdD]?\\b|\\.([fFdD]\\b)?)`
        }, {
            begin: `(${e})[fFdD]?\\b`
        }, {
            begin: "\\b([0-9](_*[0-9])*)[fFdD]\\b"
        }, {
            begin: `\\b0[xX]((${n})\\.?|(${n})?\\.(${n}))[pP][+-]?([0-9](_*[0-9])*)[fFdD]?\\b`
        }, {
            begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b"
        }, {
            begin: `\\b0[xX](${n})[lL]?\\b`
        }, {
            begin: "\\b0(_*[0-7])*[lL]?\\b"
        }, {
            begin: "\\b0[bB][01](_*[01])*[lL]?\\b"
        }],
        relevance: 0
    };
    return e=>{
        var n = "false synchronized int abstract float private char boolean var static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private module requires exports do"
          , s = {
            className: "meta",
            begin: "@[\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*",
            contains: [{
                begin: /\(/,
                end: /\)/,
                contains: ["self"]
            }]
        };
        const r = a;
        return {
            name: "Java",
            aliases: ["jsp"],
            keywords: n,
            illegal: /<\/|#/,
            contains: [e.COMMENT("/\\*\\*", "\\*/", {
                relevance: 0,
                contains: [{
                    begin: /\w+@/,
                    relevance: 0
                }, {
                    className: "doctag",
                    begin: "@[A-Za-z]+"
                }]
            }), {
                begin: /import java\.[a-z]+\./,
                keywords: "import",
                relevance: 2
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
                className: "class",
                beginKeywords: "class interface enum",
                end: /[{;=]/,
                excludeEnd: !0,
                relevance: 1,
                keywords: "class interface enum",
                illegal: /[:"\[\]]/,
                contains: [{
                    beginKeywords: "extends implements"
                }, e.UNDERSCORE_TITLE_MODE]
            }, {
                beginKeywords: "new throw return else",
                relevance: 0
            }, {
                className: "class",
                begin: "record\\s+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: !0,
                excludeEnd: !0,
                end: /[{;=]/,
                keywords: n,
                contains: [{
                    beginKeywords: "record"
                }, {
                    begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: n,
                    relevance: 0,
                    contains: [e.C_BLOCK_COMMENT_MODE]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, {
                className: "function",
                begin: "([\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*(<[\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*(\\s*,\\s*[\xc0-\u02b8a-zA-Z_$][\xc0-\u02b8a-zA-Z_$0-9]*)*>)?\\s+)+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: !0,
                end: /[{;=]/,
                excludeEnd: !0,
                keywords: n,
                contains: [{
                    begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                    returnBegin: !0,
                    relevance: 0,
                    contains: [e.UNDERSCORE_TITLE_MODE]
                }, {
                    className: "params",
                    begin: /\(/,
                    end: /\)/,
                    keywords: n,
                    relevance: 0,
                    contains: [s, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, r, e.C_BLOCK_COMMENT_MODE]
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, r, s]
        }
    }
}
)());
hljs.registerLanguage("php-template", (()=>{
    "use strict";
    return n=>({
        name: "PHP template",
        subLanguage: "xml",
        contains: [{
            begin: /<\?(php|=)?/,
            end: /\?>/,
            subLanguage: "php",
            contains: [{
                begin: "/\\*",
                end: "\\*/",
                skip: !0
            }, {
                begin: 'b"',
                end: '"',
                skip: !0
            }, {
                begin: "b'",
                end: "'",
                skip: !0
            }, n.inherit(n.APOS_STRING_MODE, {
                illegal: null,
                className: null,
                contains: null,
                skip: !0
            }), n.inherit(n.QUOTE_STRING_MODE, {
                illegal: null,
                className: null,
                contains: null,
                skip: !0
            })]
        }]
    })
}
)());
hljs.registerLanguage("python-repl", (()=>{
    "use strict";
    return s=>({
        aliases: ["pycon"],
        contains: [{
            className: "meta",
            starts: {
                end: / |$/,
                starts: {
                    end: "$",
                    subLanguage: "python"
                }
            },
            variants: [{
                begin: /^>>>(?=[ ]|$)/
            }, {
                begin: /^\.\.\.(?=[ ]|$)/
            }]
        }]
    })
}
)());
hljs.registerLanguage("swift", (()=>{
    "use strict";
    function e(e) {
        return e ? "string" == typeof e ? e : e.source : null
    }
    function n(e) {
        return a("(?=", e, ")")
    }
    function a(...n) {
        return n.map((n=>e(n))).join("")
    }
    function t(...n) {
        return "(" + n.map((n=>e(n))).join("|") + ")"
    }
    const i = e=>a(/\b/, e, /\w$/.test(e) ? /\b/ : /\B/)
      , s = ["Protocol", "Type"].map(i)
      , u = ["init", "self"].map(i)
      , c = ["Any", "Self"]
      , r = ["associatedtype", "async", "await", /as\?/, /as!/, "as", "break", "case", "catch", "class", "continue", "convenience", "default", "defer", "deinit", "didSet", "do", "dynamic", "else", "enum", "extension", "fallthrough", /fileprivate\(set\)/, "fileprivate", "final", "for", "func", "get", "guard", "if", "import", "indirect", "infix", /init\?/, /init!/, "inout", /internal\(set\)/, "internal", "in", "is", "lazy", "let", "mutating", "nonmutating", /open\(set\)/, "open", "operator", "optional", "override", "postfix", "precedencegroup", "prefix", /private\(set\)/, "private", "protocol", /public\(set\)/, "public", "repeat", "required", "rethrows", "return", "set", "some", "static", "struct", "subscript", "super", "switch", "throws", "throw", /try\?/, /try!/, "try", "typealias", /unowned\(safe\)/, /unowned\(unsafe\)/, "unowned", "var", "weak", "where", "while", "willSet"]
      , o = ["false", "nil", "true"]
      , l = ["assignment", "associativity", "higherThan", "left", "lowerThan", "none", "right"]
      , m = ["#colorLiteral", "#column", "#dsohandle", "#else", "#elseif", "#endif", "#error", "#file", "#fileID", "#fileLiteral", "#filePath", "#function", "#if", "#imageLiteral", "#keyPath", "#line", "#selector", "#sourceLocation", "#warn_unqualified_access", "#warning"]
      , d = ["abs", "all", "any", "assert", "assertionFailure", "debugPrint", "dump", "fatalError", "getVaList", "isKnownUniquelyReferenced", "max", "min", "numericCast", "pointwiseMax", "pointwiseMin", "precondition", "preconditionFailure", "print", "readLine", "repeatElement", "sequence", "stride", "swap", "swift_unboxFromSwiftValueWithType", "transcode", "type", "unsafeBitCast", "unsafeDowncast", "withExtendedLifetime", "withUnsafeMutablePointer", "withUnsafePointer", "withVaList", "withoutActuallyEscaping", "zip"]
      , p = t(/[/=\-+!*%<>&|^~?]/, /[\u00A1-\u00A7]/, /[\u00A9\u00AB]/, /[\u00AC\u00AE]/, /[\u00B0\u00B1]/, /[\u00B6\u00BB\u00BF\u00D7\u00F7]/, /[\u2016-\u2017]/, /[\u2020-\u2027]/, /[\u2030-\u203E]/, /[\u2041-\u2053]/, /[\u2055-\u205E]/, /[\u2190-\u23FF]/, /[\u2500-\u2775]/, /[\u2794-\u2BFF]/, /[\u2E00-\u2E7F]/, /[\u3001-\u3003]/, /[\u3008-\u3020]/, /[\u3030]/)
      , F = t(p, /[\u0300-\u036F]/, /[\u1DC0-\u1DFF]/, /[\u20D0-\u20FF]/, /[\uFE00-\uFE0F]/, /[\uFE20-\uFE2F]/)
      , b = a(p, F, "*")
      , h = t(/[a-zA-Z_]/, /[\u00A8\u00AA\u00AD\u00AF\u00B2-\u00B5\u00B7-\u00BA]/, /[\u00BC-\u00BE\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/, /[\u0100-\u02FF\u0370-\u167F\u1681-\u180D\u180F-\u1DBF]/, /[\u1E00-\u1FFF]/, /[\u200B-\u200D\u202A-\u202E\u203F-\u2040\u2054\u2060-\u206F]/, /[\u2070-\u20CF\u2100-\u218F\u2460-\u24FF\u2776-\u2793]/, /[\u2C00-\u2DFF\u2E80-\u2FFF]/, /[\u3004-\u3007\u3021-\u302F\u3031-\u303F\u3040-\uD7FF]/, /[\uF900-\uFD3D\uFD40-\uFDCF\uFDF0-\uFE1F\uFE30-\uFE44]/, /[\uFE47-\uFEFE\uFF00-\uFFFD]/)
      , f = t(h, /\d/, /[\u0300-\u036F\u1DC0-\u1DFF\u20D0-\u20FF\uFE20-\uFE2F]/)
      , w = a(h, f, "*")
      , y = a(/[A-Z]/, f, "*")
      , g = ["autoclosure", a(/convention\(/, t("swift", "block", "c"), /\)/), "discardableResult", "dynamicCallable", "dynamicMemberLookup", "escaping", "frozen", "GKInspectable", "IBAction", "IBDesignable", "IBInspectable", "IBOutlet", "IBSegueAction", "inlinable", "main", "nonobjc", "NSApplicationMain", "NSCopying", "NSManaged", a(/objc\(/, w, /\)/), "objc", "objcMembers", "propertyWrapper", "requires_stored_property_inits", "testable", "UIApplicationMain", "unknown", "usableFromInline"]
      , E = ["iOS", "iOSApplicationExtension", "macOS", "macOSApplicationExtension", "macCatalyst", "macCatalystApplicationExtension", "watchOS", "watchOSApplicationExtension", "tvOS", "tvOSApplicationExtension", "swift"];
    return e=>{
        const p = {
            match: /\s+/,
            relevance: 0
        }
          , h = e.COMMENT("/\\*", "\\*/", {
            contains: ["self"]
        })
          , v = [e.C_LINE_COMMENT_MODE, h]
          , N = {
            className: "keyword",
            begin: a(/\./, n(t(...s, ...u))),
            end: t(...s, ...u),
            excludeBegin: !0
        }
          , A = {
            match: a(/\./, t(...r)),
            relevance: 0
        }
          , C = r.filter((e=>"string" == typeof e)).concat(["_|0"])
          , _ = {
            variants: [{
                className: "keyword",
                match: t(...r.filter((e=>"string" != typeof e)).concat(c).map(i), ...u)
            }]
        }
          , D = {
            $pattern: t(/\b\w+/, /#\w+/),
            keyword: C.concat(m),
            literal: o
        }
          , B = [N, A, _]
          , k = [{
            match: a(/\./, t(...d)),
            relevance: 0
        }, {
            className: "built_in",
            match: a(/\b/, t(...d), /(?=\()/)
        }]
          , M = {
            match: /->/,
            relevance: 0
        }
          , S = [M, {
            className: "operator",
            relevance: 0,
            variants: [{
                match: b
            }, {
                match: `\\.(\\.|${F})+`
            }]
        }]
          , x = "([0-9a-fA-F]_*)+"
          , I = {
            className: "number",
            relevance: 0,
            variants: [{
                match: "\\b(([0-9]_*)+)(\\.(([0-9]_*)+))?([eE][+-]?(([0-9]_*)+))?\\b"
            }, {
                match: `\\b0x(${x})(\\.(${x}))?([pP][+-]?(([0-9]_*)+))?\\b`
            }, {
                match: /\b0o([0-7]_*)+\b/
            }, {
                match: /\b0b([01]_*)+\b/
            }]
        }
          , O = (e="")=>({
            className: "subst",
            variants: [{
                match: a(/\\/, e, /[0\\tnr"']/)
            }, {
                match: a(/\\/, e, /u\{[0-9a-fA-F]{1,8}\}/)
            }]
        })
          , T = (e="")=>({
            className: "subst",
            match: a(/\\/, e, /[\t ]*(?:[\r\n]|\r\n)/)
        })
          , L = (e="")=>({
            className: "subst",
            label: "interpol",
            begin: a(/\\/, e, /\(/),
            end: /\)/
        })
          , P = (e="")=>({
            begin: a(e, /"""/),
            end: a(/"""/, e),
            contains: [O(e), T(e), L(e)]
        })
          , $ = (e="")=>({
            begin: a(e, /"/),
            end: a(/"/, e),
            contains: [O(e), L(e)]
        })
          , K = {
            className: "string",
            variants: [P(), P("#"), P("##"), P("###"), $(), $("#"), $("##"), $("###")]
        }
          , j = {
            match: a(/`/, w, /`/)
        }
          , z = [j, {
            className: "variable",
            match: /\$\d+/
        }, {
            className: "variable",
            match: `\\$${f}+`
        }]
          , q = [{
            match: /(@|#)available/,
            className: "keyword",
            starts: {
                contains: [{
                    begin: /\(/,
                    end: /\)/,
                    keywords: E,
                    contains: [...S, I, K]
                }]
            }
        }, {
            className: "keyword",
            match: a(/@/, t(...g))
        }, {
            className: "meta",
            match: a(/@/, w)
        }]
          , U = {
            match: n(/\b[A-Z]/),
            relevance: 0,
            contains: [{
                className: "type",
                match: a(/(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)/, f, "+")
            }, {
                className: "type",
                match: y,
                relevance: 0
            }, {
                match: /[?!]+/,
                relevance: 0
            }, {
                match: /\.\.\./,
                relevance: 0
            }, {
                match: a(/\s+&\s+/, n(y)),
                relevance: 0
            }]
        }
          , Z = {
            begin: /</,
            end: />/,
            keywords: D,
            contains: [...v, ...B, ...q, M, U]
        };
        U.contains.push(Z);
        const G = {
            begin: /\(/,
            end: /\)/,
            relevance: 0,
            keywords: D,
            contains: ["self", {
                match: a(w, /\s*:/),
                keywords: "_|0",
                relevance: 0
            }, ...v, ...B, ...k, ...S, I, K, ...z, ...q, U]
        }
          , H = {
            beginKeywords: "func",
            contains: [{
                className: "title",
                match: t(j.match, w, b),
                endsParent: !0,
                relevance: 0
            }, p]
        }
          , R = {
            begin: /</,
            end: />/,
            contains: [...v, U]
        }
          , V = {
            begin: /\(/,
            end: /\)/,
            keywords: D,
            contains: [{
                begin: t(n(a(w, /\s*:/)), n(a(w, /\s+/, w, /\s*:/))),
                end: /:/,
                relevance: 0,
                contains: [{
                    className: "keyword",
                    match: /\b_\b/
                }, {
                    className: "params",
                    match: w
                }]
            }, ...v, ...B, ...S, I, K, ...q, U, G],
            endsParent: !0,
            illegal: /["']/
        }
          , W = {
            className: "function",
            match: n(/\bfunc\b/),
            contains: [H, R, V, p],
            illegal: [/\[/, /%/]
        }
          , X = {
            className: "function",
            match: /\b(subscript|init[?!]?)\s*(?=[<(])/,
            keywords: {
                keyword: "subscript init init? init!",
                $pattern: /\w+[?!]?/
            },
            contains: [R, V, p],
            illegal: /\[|%/
        }
          , J = {
            beginKeywords: "operator",
            end: e.MATCH_NOTHING_RE,
            contains: [{
                className: "title",
                match: b,
                endsParent: !0,
                relevance: 0
            }]
        }
          , Q = {
            beginKeywords: "precedencegroup",
            end: e.MATCH_NOTHING_RE,
            contains: [{
                className: "title",
                match: y,
                relevance: 0
            }, {
                begin: /{/,
                end: /}/,
                relevance: 0,
                endsParent: !0,
                keywords: [...l, ...o],
                contains: [U]
            }]
        };
        for (const e of K.variants) {
            const n = e.contains.find((e=>"interpol" === e.label));
            n.keywords = D;
            const a = [...B, ...k, ...S, I, K, ...z];
            n.contains = [...a, {
                begin: /\(/,
                end: /\)/,
                contains: ["self", ...a]
            }]
        }
        return {
            name: "Swift",
            keywords: D,
            contains: [...v, W, X, {
                className: "class",
                beginKeywords: "struct protocol class extension enum",
                end: "\\{",
                excludeEnd: !0,
                keywords: D,
                contains: [e.inherit(e.TITLE_MODE, {
                    begin: /[A-Za-z$_][\u00C0-\u02B80-9A-Za-z$_]*/
                }), ...B]
            }, J, Q, {
                beginKeywords: "import",
                end: /$/,
                contains: [...v],
                relevance: 0
            }, ...B, ...k, ...S, I, K, ...z, ...q, U, G]
        }
    }
}
)());
hljs.registerLanguage("clojure", (()=>{
    "use strict";
    return e=>{
        const t = "a-zA-Z_\\-!.?+*=<>&#'"
          , n = "[" + t + "][" + t + "0-9/;:]*"
          , r = "def defonce defprotocol defstruct defmulti defmethod defn- defn defmacro deftype defrecord"
          , a = {
            $pattern: n,
            "builtin-name": r + " cond apply if-not if-let if not not= =|0 <|0 >|0 <=|0 >=|0 ==|0 +|0 /|0 *|0 -|0 rem quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last drop-while while intern condp case reduced cycle split-at split-with repeat replicate iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter monitor-exit macroexpand macroexpand-1 for dosync and or when when-not when-let comp juxt partial sequence memoize constantly complement identity assert peek pop doto proxy first rest cons cast coll last butlast sigs reify second ffirst fnext nfirst nnext meta with-meta ns in-ns create-ns import refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize"
        }
          , s = {
            begin: n,
            relevance: 0
        }
          , o = {
            className: "number",
            begin: "[-+]?\\d+(\\.\\d+)?",
            relevance: 0
        }
          , i = e.inherit(e.QUOTE_STRING_MODE, {
            illegal: null
        })
          , c = e.COMMENT(";", "$", {
            relevance: 0
        })
          , d = {
            className: "literal",
            begin: /\b(true|false|nil)\b/
        }
          , l = {
            begin: "[\\[\\{]",
            end: "[\\]\\}]"
        }
          , m = {
            className: "comment",
            begin: "\\^" + n
        }
          , p = e.COMMENT("\\^\\{", "\\}")
          , u = {
            className: "symbol",
            begin: "[:]{1,2}" + n
        }
          , f = {
            begin: "\\(",
            end: "\\)"
        }
          , h = {
            endsWithParent: !0,
            relevance: 0
        }
          , y = {
            keywords: a,
            className: "name",
            begin: n,
            relevance: 0,
            starts: h
        }
          , g = [f, i, m, p, c, u, l, o, d, s]
          , b = {
            beginKeywords: r,
            lexemes: n,
            end: '(\\[|#|\\d|"|:|\\{|\\)|\\(|$)',
            contains: [{
                className: "title",
                begin: n,
                relevance: 0,
                excludeEnd: !0,
                endsParent: !0
            }].concat(g)
        };
        return f.contains = [e.COMMENT("comment", ""), b, y, h],
        h.contains = g,
        l.contains = g,
        p.contains = [l],
        {
            name: "Clojure",
            aliases: ["clj"],
            illegal: /\S/,
            contains: [f, i, m, p, c, u, l, o, d]
        }
    }
}
)());
hljs.registerLanguage("haskell", (()=>{
    "use strict";
    return e=>{
        const n = {
            variants: [e.COMMENT("--", "$"), e.COMMENT(/\{-/, /-\}/, {
                contains: ["self"]
            })]
        }
          , i = {
            className: "meta",
            begin: /\{-#/,
            end: /#-\}/
        }
          , a = {
            className: "meta",
            begin: "^#",
            end: "$"
        }
          , s = {
            className: "type",
            begin: "\\b[A-Z][\\w']*",
            relevance: 0
        }
          , l = {
            begin: "\\(",
            end: "\\)",
            illegal: '"',
            contains: [i, a, {
                className: "type",
                begin: "\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?"
            }, e.inherit(e.TITLE_MODE, {
                begin: "[_a-z][\\w']*"
            }), n]
        };
        return {
            name: "Haskell",
            aliases: ["hs"],
            keywords: "let in if then else case of where do module import hiding qualified type data newtype deriving class instance as default infix infixl infixr foreign export ccall stdcall cplusplus jvm dotnet safe unsafe family forall mdo proc rec",
            contains: [{
                beginKeywords: "module",
                end: "where",
                keywords: "module where",
                contains: [l, n],
                illegal: "\\W\\.|;"
            }, {
                begin: "\\bimport\\b",
                end: "$",
                keywords: "import qualified as hiding",
                contains: [l, n],
                illegal: "\\W\\.|;"
            }, {
                className: "class",
                begin: "^(\\s*)?(class|instance)\\b",
                end: "where",
                keywords: "class family instance where",
                contains: [s, l, n]
            }, {
                className: "class",
                begin: "\\b(data|(new)?type)\\b",
                end: "$",
                keywords: "data family type newtype deriving",
                contains: [i, s, l, {
                    begin: /\{/,
                    end: /\}/,
                    contains: l.contains
                }, n]
            }, {
                beginKeywords: "default",
                end: "$",
                contains: [s, l, n]
            }, {
                beginKeywords: "infix infixl infixr",
                end: "$",
                contains: [e.C_NUMBER_MODE, n]
            }, {
                begin: "\\bforeign\\b",
                end: "$",
                keywords: "foreign import export ccall stdcall cplusplus jvm dotnet safe unsafe",
                contains: [s, e.QUOTE_STRING_MODE, n]
            }, {
                className: "meta",
                begin: "#!\\/usr\\/bin\\/env runhaskell",
                end: "$"
            }, i, a, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, s, e.inherit(e.TITLE_MODE, {
                begin: "^[_a-z][\\w']*"
            }), n, {
                begin: "->|<-"
            }]
        }
    }
}
)());
hljs.registerLanguage("cmake", (()=>{
    "use strict";
    return e=>({
        name: "CMake",
        aliases: ["cmake.in"],
        case_insensitive: !0,
        keywords: {
            keyword: "break cmake_host_system_information cmake_minimum_required cmake_parse_arguments cmake_policy configure_file continue elseif else endforeach endfunction endif endmacro endwhile execute_process file find_file find_library find_package find_path find_program foreach function get_cmake_property get_directory_property get_filename_component get_property if include include_guard list macro mark_as_advanced math message option return separate_arguments set_directory_properties set_property set site_name string unset variable_watch while add_compile_definitions add_compile_options add_custom_command add_custom_target add_definitions add_dependencies add_executable add_library add_link_options add_subdirectory add_test aux_source_directory build_command create_test_sourcelist define_property enable_language enable_testing export fltk_wrap_ui get_source_file_property get_target_property get_test_property include_directories include_external_msproject include_regular_expression install link_directories link_libraries load_cache project qt_wrap_cpp qt_wrap_ui remove_definitions set_source_files_properties set_target_properties set_tests_properties source_group target_compile_definitions target_compile_features target_compile_options target_include_directories target_link_directories target_link_libraries target_link_options target_sources try_compile try_run ctest_build ctest_configure ctest_coverage ctest_empty_binary_directory ctest_memcheck ctest_read_custom_files ctest_run_script ctest_sleep ctest_start ctest_submit ctest_test ctest_update ctest_upload build_name exec_program export_library_dependencies install_files install_programs install_targets load_command make_directory output_required_files remove subdir_depends subdirs use_mangled_mesa utility_source variable_requires write_file qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or not command policy target test exists is_newer_than is_directory is_symlink is_absolute matches less greater equal less_equal greater_equal strless strgreater strequal strless_equal strgreater_equal version_less version_greater version_equal version_less_equal version_greater_equal in_list defined"
        },
        contains: [{
            className: "variable",
            begin: /\$\{/,
            end: /\}/
        }, e.HASH_COMMENT_MODE, e.QUOTE_STRING_MODE, e.NUMBER_MODE]
    })
}
)());
hljs.registerLanguage("objectivec", (()=>{
    "use strict";
    return e=>{
        const n = /[a-zA-Z@][a-zA-Z0-9_]*/
          , _ = {
            $pattern: n,
            keyword: "@interface @class @protocol @implementation"
        };
        return {
            name: "Objective-C",
            aliases: ["mm", "objc", "obj-c", "obj-c++", "objective-c++"],
            keywords: {
                $pattern: n,
                keyword: "int float while char export sizeof typedef const struct for union unsigned long volatile static bool mutable if do return goto void enum else break extern asm case short default double register explicit signed typename this switch continue wchar_t inline readonly assign readwrite self @synchronized id typeof nonatomic super unichar IBOutlet IBAction strong weak copy in out inout bycopy byref oneway __strong __weak __block __autoreleasing @private @protected @public @try @property @end @throw @catch @finally @autoreleasepool @synthesize @dynamic @selector @optional @required @encode @package @import @defs @compatibility_alias __bridge __bridge_transfer __bridge_retained __bridge_retain __covariant __contravariant __kindof _Nonnull _Nullable _Null_unspecified __FUNCTION__ __PRETTY_FUNCTION__ __attribute__ getter setter retain unsafe_unretained nonnull nullable null_unspecified null_resettable class instancetype NS_DESIGNATED_INITIALIZER NS_UNAVAILABLE NS_REQUIRES_SUPER NS_RETURNS_INNER_POINTER NS_INLINE NS_AVAILABLE NS_DEPRECATED NS_ENUM NS_OPTIONS NS_SWIFT_UNAVAILABLE NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_REFINED_FOR_SWIFT NS_SWIFT_NAME NS_SWIFT_NOTHROW NS_DURING NS_HANDLER NS_ENDHANDLER NS_VALUERETURN NS_VOIDRETURN",
                literal: "false true FALSE TRUE nil YES NO NULL",
                built_in: "BOOL dispatch_once_t dispatch_queue_t dispatch_sync dispatch_async dispatch_once"
            },
            illegal: "</",
            contains: [{
                className: "built_in",
                begin: "\\b(AV|CA|CF|CG|CI|CL|CM|CN|CT|MK|MP|MTK|MTL|NS|SCN|SK|UI|WK|XC)\\w+"
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.C_NUMBER_MODE, e.QUOTE_STRING_MODE, e.APOS_STRING_MODE, {
                className: "string",
                variants: [{
                    begin: '@"',
                    end: '"',
                    illegal: "\\n",
                    contains: [e.BACKSLASH_ESCAPE]
                }]
            }, {
                className: "meta",
                begin: /#\s*[a-z]+\b/,
                end: /$/,
                keywords: {
                    "meta-keyword": "if else elif endif define undef warning error line pragma ifdef ifndef include"
                },
                contains: [{
                    begin: /\\\n/,
                    relevance: 0
                }, e.inherit(e.QUOTE_STRING_MODE, {
                    className: "meta-string"
                }), {
                    className: "meta-string",
                    begin: /<.*?>/,
                    end: /$/,
                    illegal: "\\n"
                }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE]
            }, {
                className: "class",
                begin: "(" + _.keyword.split(" ").join("|") + ")\\b",
                end: /(\{|$)/,
                excludeEnd: !0,
                keywords: _,
                contains: [e.UNDERSCORE_TITLE_MODE]
            }, {
                begin: "\\." + e.UNDERSCORE_IDENT_RE,
                relevance: 0
            }]
        }
    }
}
)());
hljs.registerLanguage("coffeescript", (()=>{
    "use strict";
    const e = ["as", "in", "of", "if", "for", "while", "finally", "var", "new", "function", "do", "return", "void", "else", "break", "catch", "instanceof", "with", "throw", "case", "default", "try", "switch", "continue", "typeof", "delete", "let", "yield", "const", "class", "debugger", "async", "await", "static", "import", "from", "export", "extends"]
      , n = ["true", "false", "null", "undefined", "NaN", "Infinity"]
      , a = [].concat(["setInterval", "setTimeout", "clearInterval", "clearTimeout", "require", "exports", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "unescape"], ["arguments", "this", "super", "console", "window", "document", "localStorage", "module", "global"], ["Intl", "DataView", "Number", "Math", "Date", "String", "RegExp", "Object", "Function", "Boolean", "Error", "Symbol", "Set", "Map", "WeakSet", "WeakMap", "Proxy", "Reflect", "JSON", "Promise", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Float32Array", "Array", "Uint8Array", "Uint8ClampedArray", "ArrayBuffer", "BigInt64Array", "BigUint64Array", "BigInt"], ["EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"]);
    return r=>{
        const t = {
            keyword: e.concat(["then", "unless", "until", "loop", "by", "when", "and", "or", "is", "isnt", "not"]).filter((i = ["var", "const", "let", "function", "static"],
            e=>!i.includes(e))),
            literal: n.concat(["yes", "no", "on", "off"]),
            built_in: a.concat(["npm", "print"])
        };
        var i;
        const s = "[A-Za-z$_][0-9A-Za-z$_]*"
          , o = {
            className: "subst",
            begin: /#\{/,
            end: /\}/,
            keywords: t
        }
          , c = [r.BINARY_NUMBER_MODE, r.inherit(r.C_NUMBER_MODE, {
            starts: {
                end: "(\\s*/)?",
                relevance: 0
            }
        }), {
            className: "string",
            variants: [{
                begin: /'''/,
                end: /'''/,
                contains: [r.BACKSLASH_ESCAPE]
            }, {
                begin: /'/,
                end: /'/,
                contains: [r.BACKSLASH_ESCAPE]
            }, {
                begin: /"""/,
                end: /"""/,
                contains: [r.BACKSLASH_ESCAPE, o]
            }, {
                begin: /"/,
                end: /"/,
                contains: [r.BACKSLASH_ESCAPE, o]
            }]
        }, {
            className: "regexp",
            variants: [{
                begin: "///",
                end: "///",
                contains: [o, r.HASH_COMMENT_MODE]
            }, {
                begin: "//[gim]{0,3}(?=\\W)",
                relevance: 0
            }, {
                begin: /\/(?![ *]).*?(?![\\]).\/[gim]{0,3}(?=\W)/
            }]
        }, {
            begin: "@" + s
        }, {
            subLanguage: "javascript",
            excludeBegin: !0,
            excludeEnd: !0,
            variants: [{
                begin: "```",
                end: "```"
            }, {
                begin: "`",
                end: "`"
            }]
        }];
        o.contains = c;
        const l = r.inherit(r.TITLE_MODE, {
            begin: s
        })
          , d = "(\\(.*\\)\\s*)?\\B[-=]>"
          , g = {
            className: "params",
            begin: "\\([^\\(]",
            returnBegin: !0,
            contains: [{
                begin: /\(/,
                end: /\)/,
                keywords: t,
                contains: ["self"].concat(c)
            }]
        };
        return {
            name: "CoffeeScript",
            aliases: ["coffee", "cson", "iced"],
            keywords: t,
            illegal: /\/\*/,
            contains: c.concat([r.COMMENT("###", "###"), r.HASH_COMMENT_MODE, {
                className: "function",
                begin: "^\\s*" + s + "\\s*=\\s*" + d,
                end: "[-=]>",
                returnBegin: !0,
                contains: [l, g]
            }, {
                begin: /[:\(,=]\s*/,
                relevance: 0,
                contains: [{
                    className: "function",
                    begin: d,
                    end: "[-=]>",
                    returnBegin: !0,
                    contains: [g]
                }]
            }, {
                className: "class",
                beginKeywords: "class",
                end: "$",
                illegal: /[:="\[\]]/,
                contains: [{
                    beginKeywords: "extends",
                    endsWithParent: !0,
                    illegal: /[:="\[\]]/,
                    contains: [l]
                }, l]
            }, {
                begin: s + ":",
                end: ":",
                returnBegin: !0,
                returnEnd: !0,
                relevance: 0
            }])
        }
    }
}
)());
