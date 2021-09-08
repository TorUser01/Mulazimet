/*!
 * froala_editor v3.1.0 (https://www.froala.com/wysiwyg-editor)
 * License https://froala.com/wysiwyg-editor/terms/
 * Copyright 2014-2020 Froala Labs
 */

! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.FroalaEditor = t()
}(this, function() {
    "use strict";

    function Fe(e) {
        return (Fe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
            var t = this;
            if (!document.documentElement.contains(t)) return null;
            do {
                if (t.matches(e)) return t;
                t = t.parentElement || t.parentNode
            } while (null !== t && 1 === t.nodeType);
            return null
        }), Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(e) {
            for (var t = (this.document || this.ownerDocument).querySelectorAll(e), n = t.length; 0 <= --n && t.item(n) !== this;);
            return -1 < n
        }), Array.isArray || (Array.isArray = function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
            value: function(e, t) {
                if (null == e) throw new TypeError("Cannot convert undefined or null to object");
                for (var n = Object(e), a = 1; a < arguments.length; a++) {
                    var r = arguments[a];
                    if (null != r)
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o])
                }
                return n
            },
            writable: !0,
            configurable: !0
        }),
        function() {
            var i = /^\s*:scope/gi,
                s = /,\s*:scope/gi,
                l = document.createElement("div");

            function e(e, t) {
                var o = e[t];
                e[t] = function(e) {
                    var t, n = !1,
                        a = !1;
                    if (e && (e.match(i) || e.match(s))) {
                        this.parentNode || (l.appendChild(this), a = !0);
                        var r = this.parentNode;
                        return this.id || (this.id = "rootedQuerySelector_id_".concat((new Date).getTime()), n = !0), t = o.call(r, e.replace(i, "#".concat(this.id)).replace(s, ",#".concat(this.id))), n && (this.id = ""), a && l.removeChild(this), t
                    }
                    return o.call(this, e)
                }
            }

            try {
                l.querySelectorAll(":scope *")
            } catch (t) {
                e(Element.prototype, "querySelector"), e(Element.prototype, "querySelectorAll"), e(HTMLElement.prototype, "querySelector"), e(HTMLElement.prototype, "querySelectorAll")
            }
        }();

    function $e(e, t, n) {
        if ("string" != typeof e) return new $e.Bootstrap(e, t, n);
        var a = document.querySelectorAll(e);
        t && t.iframe_document && (a = t.iframe_document.querySelectorAll(e));
        for (var r = [], o = 0; o < a.length; o++) {
            var i = a[o]["data-froala.editor"];
            i ? r.push(i) : r.push(new $e.Bootstrap(a[o], t, n))
        }
        return 1 == r.length ? r[0] : r
    }

    $e.RegisterPlugins = function(e) {
        for (var t = 0; t < e.length; t++) e[t].call($e)
    }, Object.assign($e, {
        DEFAULTS: { initOnClick: !1, pluginsEnabled: null },
        MODULES: {},
        PLUGINS: {},
        VERSION: "3.1.0",
        INSTANCES: [],
        OPTS_MAPPING: {},
        SHARED: {},
        ID: 0
    }), $e.MODULES.node = function(i) {
        var n = i.$;

        function s(e) {
            return e && "IFRAME" !== e.tagName ? Array.prototype.slice.call(e.childNodes || []) : []
        }

        function l(e) {
            return !!e && (e.nodeType === Node.ELEMENT_NODE && 0 <= $e.BLOCK_TAGS.indexOf(e.tagName.toLowerCase()))
        }

        function c(e) {
            var t = {},
                n = e.attributes;
            if (n)
                for (var a = 0; a < n.length; a++) {
                    var r = n[a];
                    t[r.nodeName] = r.value
                }
            return t
        }

        function t(e) {
            for (var t = "", n = c(e), a = Object.keys(n).sort(), r = 0; r < a.length; r++) {
                var o = a[r],
                    i = n[o];
                i.indexOf("'") < 0 && 0 <= i.indexOf('"') ? t += " ".concat(o, "='").concat(i, "'") : (0 <= i.indexOf('"') && 0 <= i.indexOf("'") && (i = i.replace(/"/g, "&quot;")), t += " ".concat(o, '="').concat(i, '"'))
            }
            return t
        }

        function a(e) {
            return e === i.el
        }

        return {
            isBlock: l,
            isEmpty: function d(e, t) {
                if (!e) return !0;
                if (e.querySelector("table")) return !1;
                var n = s(e);
                1 === n.length && l(n[0]) && (n = s(n[0]));
                for (var a = !1, r = 0; r < n.length; r++) {
                    var o = n[r];
                    if (!(t && i.node.hasClass(o, "fr-marker") || o.nodeType === Node.TEXT_NODE && 0 === o.textContent.length)) {
                        if ("BR" !== o.tagName && 0 < (o.textContent || "").replace(/\u200B/gi, "").replace(/\n/g, "").length) return !1;
                        if (a) return !1;
                        "BR" === o.tagName && (a = !0)
                    }
                }
                return !(e.querySelectorAll($e.VOID_ELEMENTS.join(",")).length - e.querySelectorAll("br").length || e.querySelector("".concat(i.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || 1 < e.querySelectorAll($e.BLOCK_TAGS.join(",")).length || e.querySelector("".concat(i.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")))
            },
            blockParent: function r(e) {
                for (; e && e.parentNode !== i.el && (!e.parentNode || !i.node.hasClass(e.parentNode, "fr-inner"));)
                    if (l(e = e.parentNode)) return e;
                return null
            },
            deepestParent: function o(e, t, n) {
                if (void 0 === t && (t = []), void 0 === n && (n = !0), t.push(i.el), 0 <= t.indexOf(e.parentNode) || e.parentNode && i.node.hasClass(e.parentNode, "fr-inner") || e.parentNode && 0 <= $e.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) && n) return null;
                for (; t.indexOf(e.parentNode) < 0 && e.parentNode && !i.node.hasClass(e.parentNode, "fr-inner") && ($e.SIMPLE_ENTER_TAGS.indexOf(e.parentNode.tagName) < 0 || !n) && (!l(e) || l(e.parentNode)) && (!l(e) || !l(e.parentNode) || !n);) e = e.parentNode;
                return e
            },
            rawAttributes: c,
            attributes: t,
            clearAttributes: function f(e) {
                for (var t = e.attributes, n = t.length - 1; 0 <= n; n--) {
                    var a = t[n];
                    e.removeAttribute(a.nodeName)
                }
            },
            openTagString: function p(e) {
                return "<".concat(e.tagName.toLowerCase()).concat(t(e), ">")
            },
            closeTagString: function u(e) {
                return "</".concat(e.tagName.toLowerCase(), ">")
            },
            isFirstSibling: function h(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.previousSibling; n && t && i.node.hasClass(n, "fr-marker");) n = n.previousSibling;
                return !n || n.nodeType === Node.TEXT_NODE && "" === n.textContent && h(n)
            },
            isLastSibling: function g(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.nextSibling; n && t && i.node.hasClass(n, "fr-marker");) n = n.nextSibling;
                return !n || n.nodeType === Node.TEXT_NODE && "" === n.textContent && g(n)
            },
            isList: function m(e) {
                return !!e && 0 <= ["UL", "OL"].indexOf(e.tagName)
            },
            isLink: function v(e) {
                return !!e && e.nodeType === Node.ELEMENT_NODE && "a" === e.tagName.toLowerCase()
            },
            isElement: a,
            contents: s,
            isVoid: function b(e) {
                return e && e.nodeType === Node.ELEMENT_NODE && 0 <= $e.VOID_ELEMENTS.indexOf((e.tagName || "").toLowerCase())
            },
            hasFocus: function E(e) {
                return e === i.doc.activeElement && (!i.doc.hasFocus || i.doc.hasFocus()) && Boolean(a(e) || e.type || e.href || ~e.tabIndex)
            },
            isEditable: function T(e) {
                return (!e.getAttribute || "false" !== e.getAttribute("contenteditable")) && ["STYLE", "SCRIPT"].indexOf(e.tagName) < 0
            },
            isDeletable: function A(e) {
                return e && e.nodeType === Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= (e.getAttribute("class") || "").indexOf("fr-deletable")
            },
            hasClass: function C(e, t) {
                return e instanceof n && (e = e.get(0)), e && e.classList && e.classList.contains(t)
            },
            filter: function S(e) {
                return i.browser.msie ? e : { acceptNode: e }
            }
        }
    }, Object.assign($e.DEFAULTS, {
        htmlAllowedTags: ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "blockquote", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "pre", "progress", "queue", "rp", "rt", "ruby", "s", "samp", "script", "style", "section", "select", "small", "source", "span", "strike", "strong", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "var", "video", "wbr"],
        htmlRemoveTags: ["script", "style"],
        htmlAllowedAttrs: ["accept", "accept-charset", "accesskey", "action", "align", "allowfullscreen", "allowtransparency", "alt", "async", "autocomplete", "autofocus", "autoplay", "autosave", "background", "bgcolor", "border", "charset", "cellpadding", "cellspacing", "checked", "cite", "class", "color", "cols", "colspan", "content", "contenteditable", "contextmenu", "controls", "coords", "data", "data-.*", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "dropzone", "enctype", "for", "form", "formaction", "frameborder", "headers", "height", "hidden", "high", "href", "hreflang", "http-equiv", "icon", "id", "ismap", "itemprop", "keytype", "kind", "label", "lang", "language", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "mozallowfullscreen", "multiple", "muted", "name", "novalidate", "open", "optimum", "pattern", "ping", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "scoped", "scrolling", "seamless", "selected", "shape", "size", "sizes", "span", "src", "srcdoc", "srclang", "srcset", "start", "step", "summary", "spellcheck", "style", "tabindex", "target", "title", "type", "translate", "usemap", "value", "valign", "webkitallowfullscreen", "width", "wrap"],
        htmlAllowedStyleProps: [".*"],
        htmlAllowComments: !0,
        htmlUntouched: !1,
        fullPage: !1
    }), $e.HTML5Map = { B: "STRONG", I: "EM", STRIKE: "S" }, $e.MODULES.clean = function(f) {
        var d, p, u, h, g = f.$;

        function r(e) {
            if (e.nodeType === Node.ELEMENT_NODE && e.getAttribute("class") && 0 <= e.getAttribute("class").indexOf("fr-marker")) return !1;
            var t, n = f.node.contents(e),
                a = [];
            for (t = 0; t < n.length; t++) n[t].nodeType !== Node.ELEMENT_NODE || f.node.isVoid(n[t]) ? n[t].nodeType === Node.TEXT_NODE && (n[t].textContent = n[t].textContent.replace(/\u200b/g, "")) : n[t].textContent.replace(/\u200b/g, "").length !== n[t].textContent.length && r(n[t]);
            if (e.nodeType === Node.ELEMENT_NODE && !f.node.isVoid(e) && (e.normalize(), n = f.node.contents(e), a = e.querySelectorAll(".fr-marker"), n.length - a.length == 0)) {
                for (t = 0; t < n.length; t++)
                    if (n[t].nodeType === Node.ELEMENT_NODE && (n[t].getAttribute("class") || "").indexOf("fr-marker") < 0) return !1;
                for (t = 0; t < a.length; t++) e.parentNode.insertBefore(a[t].cloneNode(!0), e);
                return e.parentNode.removeChild(e), !1
            }
        }

        function s(e, t) {
            if (e.nodeType === Node.COMMENT_NODE) return "\x3c!--".concat(e.nodeValue, "--\x3e");
            if (e.nodeType === Node.TEXT_NODE) return t ? e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : e.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00A0/g, "&nbsp;").replace(/\u0009/g, "");
            if (e.nodeType !== Node.ELEMENT_NODE) return e.outerHTML;
            if (e.nodeType === Node.ELEMENT_NODE && 0 <= ["STYLE", "SCRIPT", "NOSCRIPT"].indexOf(e.tagName)) return e.outerHTML;
            if (e.nodeType === Node.ELEMENT_NODE && "svg" === e.tagName) {
                var n = document.createElement("div"),
                    a = e.cloneNode(!0);
                return n.appendChild(a), n.innerHTML
            }
            if ("IFRAME" === e.tagName) return e.outerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
            var r = e.childNodes;
            if (0 === r.length) return e.outerHTML;
            for (var o = "", i = 0; i < r.length; i++) "PRE" === e.tagName && (t = !0), o += s(r[i], t);
            return f.node.openTagString(e) + o + f.node.closeTagString(e)
        }

        var l = [];

        function m(e) {
            var t = e.replace(/;;/gi, ";");
            return ";" !== (t = t.replace(/^;/gi, "")).charAt(t.length) && (t += ";"), t
        }

        function c(e) {
            var t;
            for (t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    var n = t.match(u),
                        a = null;
                    "style" === t && f.opts.htmlAllowedStyleProps.length && (a = e[t].match(h)), n && a ? e[t] = m(a.join(";")) : n && ("style" !== t || a) || delete e[t]
                }
            for (var r = "", o = Object.keys(e).sort(), i = 0; i < o.length; i++) e[t = o[i]].indexOf('"') < 0 ? r += " ".concat(t, '="').concat(e[t], '"') : r += " ".concat(t, "='").concat(e[t], "'");
            return r
        }

        function v(e, t) {
            var n, a = document.implementation.createHTMLDocument("Froala DOC").createElement("DIV");
            g(a).append(e);
            var r = "";
            if (a) {
                var o = f.node.contents(a);
                for (n = 0; n < o.length; n++) t(o[n]);
                for (o = f.node.contents(a), n = 0; n < o.length; n++) r += s(o[n])
            }
            return r
        }

        function b(e, t, n) {
            var a = e = function o(e) {
                    return l = [], e = (e = (e = (e = e.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, function(e) {
                        return l.push(e), "[FROALA.EDITOR.SCRIPT ".concat(l.length - 1, "]")
                    })).replace(/<noscript\b[^<]*(?:(?!<\/noscript>)<[^<]*)*<\/noscript>/gi, function(e) {
                        return l.push(e), "[FROALA.EDITOR.NOSCRIPT ".concat(l.length - 1, "]")
                    })).replace(/<meta((?:[\w\W]*?)) http-equiv="/g, '<meta$1 data-fr-http-equiv="')).replace(/<img((?:[\w\W]*?)) src="/g, '<img$1 data-fr-src="')
                }(e),
                r = null;
            return f.opts.fullPage && (a = f.html.extractNode(e, "body") || (0 <= e.indexOf("<body") ? "" : e), n && (r = f.html.extractNode(e, "head") || "")), a = v(a, t), r && (r = v(r, t)),
                function i(e) {
                    return e = (e = (e = e.replace(/\[FROALA\.EDITOR\.SCRIPT ([\d]*)\]/gi, function(e, t) {
                        return 0 <= f.opts.htmlRemoveTags.indexOf("script") ? "" : l[parseInt(t, 10)]
                    })).replace(/\[FROALA\.EDITOR\.NOSCRIPT ([\d]*)\]/gi, function(e, t) {
                        return 0 <= f.opts.htmlRemoveTags.indexOf("noscript") ? "" : l[parseInt(t, 10)].replace(/&lt;/g, "<").replace(/&gt;/g, ">")
                    })).replace(/<img((?:[\w\W]*?)) data-fr-src="/g, '<img$1 src="')
                }(function s(e, t, n) {
                    if (f.opts.fullPage) {
                        var a = f.html.extractDoctype(n),
                            r = c(f.html.extractNodeAttrs(n, "html"));
                        t = null === t ? f.html.extractNode(n, "head") || "<title></title>" : t;
                        var o = c(f.html.extractNodeAttrs(n, "head")),
                            i = c(f.html.extractNodeAttrs(n, "body"));
                        return "".concat(a, "<html").concat(r, "><head").concat(o, ">").concat(t, "</head><body").concat(i, ">").concat(e, "</body></html>")
                    }
                    return e
                }(a, r, e))
        }

        function E(e) {
            var t = f.doc.createElement("DIV");
            return t.innerText = e, t.textContent
        }

        function T(e) {
            for (var t = f.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType !== Node.TEXT_NODE && T(t[n]);
            ! function c(i) {
                if ("SPAN" === i.tagName && 0 <= (i.getAttribute("class") || "").indexOf("fr-marker")) return !1;
                if ("PRE" === i.tagName && function l(e) {
                        var t = e.innerHTML;
                        0 <= t.indexOf("\n") && (e.innerHTML = t.replace(/\n/g, "<br>"))
                    }(i), i.nodeType === Node.ELEMENT_NODE && (i.getAttribute("data-fr-src") && 0 !== i.getAttribute("data-fr-src").indexOf("blob:") && i.setAttribute("data-fr-src", f.helpers.sanitizeURL(E(i.getAttribute("data-fr-src")))), i.getAttribute("href") && i.setAttribute("href", f.helpers.sanitizeURL(E(i.getAttribute("href")))), i.getAttribute("src") && i.setAttribute("src", f.helpers.sanitizeURL(E(i.getAttribute("src")))), 0 <= ["TABLE", "TBODY", "TFOOT", "TR"].indexOf(i.tagName) && (i.innerHTML = i.innerHTML.trim())), !f.opts.pasteAllowLocalImages && i.nodeType === Node.ELEMENT_NODE && "IMG" === i.tagName && i.getAttribute("data-fr-src") && 0 === i.getAttribute("data-fr-src").indexOf("file://")) return i.parentNode.removeChild(i), !1;
                if (i.nodeType === Node.ELEMENT_NODE && $e.HTML5Map[i.tagName] && "" === f.node.attributes(i)) {
                    var e = $e.HTML5Map[i.tagName],
                        t = "<".concat(e, ">").concat(i.innerHTML, "</").concat(e, ">");
                    i.insertAdjacentHTML("beforebegin", t), (i = i.previousSibling).parentNode.removeChild(i.nextSibling)
                }
                if (f.opts.htmlAllowComments || i.nodeType !== Node.COMMENT_NODE)
                    if (i.tagName && i.tagName.match(p)) "STYLE" == i.tagName && f.helpers.isMac() && function() {
                        for (var e, n = i.innerHTML.trim(), a = [], t = /{([^}]+)}/g; e = t.exec(n);) a.push(e[1]);
                        for (var r = function r(t) {
                                var e = n.substring(0, n.indexOf("{")).trim();
                                i.parentNode.querySelectorAll(e).forEach(function(e) {
                                    e.removeAttribute("class"), e.setAttribute("style", a[t])
                                }), n = n.substring(n.indexOf("}") + 1)
                            }, o = 0; - 1 != n.indexOf("{"); o++) r(o)
                    }(), i.parentNode.removeChild(i);
                    else if (i.tagName && !i.tagName.match(d)) "svg" === i.tagName ? i.parentNode.removeChild(i) : f.browser.safari && "path" === i.tagName && i.parentNode && "svg" === i.parentNode.tagName || (i.outerHTML = i.innerHTML);
                else {
                    var n = i.attributes;
                    if (n)
                        for (var a = n.length - 1; 0 <= a; a--) {
                            var r = n[a],
                                o = r.nodeName.match(u),
                                s = null;
                            "style" === r.nodeName && f.opts.htmlAllowedStyleProps.length && (s = r.value.match(h)), o && s ? r.value = m(s.join(";")) : o && ("style" !== r.nodeName || s) || i.removeAttribute(r.nodeName)
                        }
                } else 0 !== i.data.indexOf("[FROALA.EDITOR") && i.parentNode.removeChild(i)
            }(e)
        }

        return {
            _init: function e() {
                f.opts.fullPage && g.merge(f.opts.htmlAllowedTags, ["head", "title", "style", "link", "base", "body", "html", "meta"])
            },
            html: function A(e, t, n, a) {
                void 0 === t && (t = []), void 0 === n && (n = []), void 0 === a && (a = !1);
                var r, o = g.merge([], f.opts.htmlAllowedTags);
                for (r = 0; r < t.length; r++) 0 <= o.indexOf(t[r]) && o.splice(o.indexOf(t[r]), 1);
                var i = g.merge([], f.opts.htmlAllowedAttrs);
                for (r = 0; r < n.length; r++) 0 <= i.indexOf(n[r]) && i.splice(i.indexOf(n[r]), 1);
                return i.push("data-fr-.*"), i.push("fr-.*"), d = new RegExp("^".concat(o.join("$|^"), "$"), "gi"), u = new RegExp("^".concat(i.join("$|^"), "$"), "gi"), p = new RegExp("^".concat(f.opts.htmlRemoveTags.join("$|^"), "$"), "gi"), h = f.opts.htmlAllowedStyleProps.length ? new RegExp("((^|;|\\s)".concat(f.opts.htmlAllowedStyleProps.join(":.+?(?=;|$))|((^|;|\\s)"), ":.+?(?=(;)|$))"), "gi") : null, e = b(e, T, !0)
            },
            toHTML5: function a() {
                var e = f.el.querySelectorAll(Object.keys($e.HTML5Map).join(","));
                if (e.length) {
                    var t = !1;
                    f.el.querySelector(".fr-marker") || (f.selection.save(), t = !0);
                    for (var n = 0; n < e.length; n++) "" === f.node.attributes(e[n]) && g(e[n]).replaceWith("<".concat($e.HTML5Map[e[n].tagName], ">").concat(e[n].innerHTML, "</").concat($e.HTML5Map[e[n].tagName], ">"));
                    t && f.selection.restore()
                }
            },
            tables: function t() {
                ! function s() {
                    for (var e = f.el.querySelectorAll("tr"), t = 0; t < e.length; t++) {
                        for (var n = e[t].children, a = !0, r = 0; r < n.length; r++)
                            if ("TH" !== n[r].tagName) {
                                a = !1;
                                break
                            }
                        if (!1 !== a && 0 !== n.length) {
                            for (var o = e[t]; o && "TABLE" !== o.tagName && "THEAD" !== o.tagName;) o = o.parentNode;
                            var i = o;
                            "THEAD" !== i.tagName && (i = f.doc.createElement("THEAD"), o.insertBefore(i, o.firstChild)), i.appendChild(e[t])
                        }
                    }
                }()
            },
            lists: function C() {
                ! function s() {
                    var e, t = [];
                    do {
                        if (t.length) {
                            var n = t[0],
                                a = f.doc.createElement("ul");
                            n.parentNode.insertBefore(a, n);
                            do {
                                var r = n;
                                n = n.nextSibling, a.appendChild(r)
                            } while (n && "LI" === n.tagName)
                        }
                        t = [];
                        for (var o = f.el.querySelectorAll("li"), i = 0; i < o.length; i++) e = o[i], f.node.isList(e.parentNode) || t.push(o[i])
                    } while (0 < t.length)
                }(),
                function o() {
                    for (var e = f.el.querySelectorAll("ol + ol, ul + ul"), t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (f.node.isList(n.previousSibling) && f.node.openTagString(n) === f.node.openTagString(n.previousSibling)) {
                            for (var a = f.node.contents(n), r = 0; r < a.length; r++) n.previousSibling.appendChild(a[r]);
                            n.parentNode.removeChild(n)
                        }
                    }
                }(),
                function i() {
                    for (var e = f.el.querySelectorAll("ul, ol"), t = 0; t < e.length; t++)
                        for (var n = f.node.contents(e[t]), a = null, r = n.length - 1; 0 <= r; r--) "LI" !== n[r].tagName && "UL" != n[r].tagName && "OL" != n[r].tagName ? (a || (a = g(f.doc.createElement("LI"))).insertBefore(n[r]), a.prepend(n[r])) : a = null
                }(),
                function l() {
                    var e, t, n;
                    do {
                        t = !1;
                        var a = f.el.querySelectorAll("li:empty");
                        for (e = 0; e < a.length; e++) a[e].parentNode.removeChild(a[e]);
                        var r = f.el.querySelectorAll("ul, ol");
                        for (e = 0; e < r.length; e++)(n = r[e]).querySelector("LI") || (t = !0, n.parentNode.removeChild(n))
                    } while (!0 === t)
                }(),
                function r() {
                    for (var e = f.el.querySelectorAll("ul > ul, ol > ol, ul > ol, ol > ul"), t = 0; t < e.length; t++) {
                        var n = e[t],
                            a = n.previousSibling;
                        a && ("LI" === a.tagName ? a.appendChild(n) : g(n).wrap("<li></li>"))
                    }
                }(),
                function c() {
                    for (var e = f.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (n.nextSibling) {
                            var a = n.nextSibling,
                                r = g(f.doc.createElement("LI"));
                            g(n.parentNode).after(r.get(0));
                            do {
                                var o = a;
                                a = a.nextSibling, r.append(o)
                            } while (a)
                        }
                    }
                }(),
                function d() {
                    for (var e = f.el.querySelectorAll("li > ul, li > ol"), t = 0; t < e.length; t++) {
                        var n = e[t];
                        if (f.node.isFirstSibling(n)) g(n).before("<br/>");
                        else if (n.previousSibling && "BR" === n.previousSibling.tagName) {
                            for (var a = n.previousSibling.previousSibling; a && f.node.hasClass(a, "fr-marker");) a = a.previousSibling;
                            a && "BR" !== a.tagName && g(n.previousSibling).remove()
                        }
                    }
                }(),
                function n() {
                    for (var e = f.el.querySelectorAll("li:empty"), t = 0; t < e.length; t++) g(e[t]).remove()
                }()
            },
            invisibleSpaces: function n(e) {
                return e.replace(/\u200b/g, "").length === e.length ? e : f.clean.exec(e, r)
            },
            exec: b
        }
    }, $e.XS = 0, $e.SM = 1, $e.MD = 2, $e.LG = 3;
    $e.LinkRegExCommon = "[".concat("a-z\\u0080-\\u009f\\u00a1-\\uffff0-9-_\\.", "]{1,}"), $e.LinkRegExEnd = "((:[0-9]{1,5})|)(((\\/|\\?|#)[a-z\\u00a1-\\uffff0-9@?\\|!^=%&amp;\\/~+#-\\'*-_{}]*)|())", $e.LinkRegExTLD = "((".concat($e.LinkRegExCommon, ")(\\.(com|net|org|edu|mil|gov|co|biz|info|me|dev)))"), $e.LinkRegExHTTP = "((ftp|http|https):\\/\\/".concat($e.LinkRegExCommon, ")"), $e.LinkRegExAuth = "((ftp|http|https):\\/\\/[\\u0021-\\uffff]{1,}@".concat($e.LinkRegExCommon, ")"), $e.LinkRegExWWW = "(www\\.".concat($e.LinkRegExCommon, "\\.[a-z0-9-]{2,24})"), $e.LinkRegEx = "(".concat($e.LinkRegExTLD, "|").concat($e.LinkRegExHTTP, "|").concat($e.LinkRegExWWW, "|").concat($e.LinkRegExAuth, ")").concat($e.LinkRegExEnd), $e.LinkProtocols = ["mailto", "tel", "sms", "notes", "data"], $e.MAIL_REGEX = /.+@.+\..+/i, $e.MODULES.helpers = function(o) {
        var i, s = o.$;

        function e() {
            var e = {},
                t = function o() {
                    var e, t = -1;
                    return "Microsoft Internet Explorer" === navigator.appName ? (e = navigator.userAgent, null !== new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))) : "Netscape" === navigator.appName && (e = navigator.userAgent, null !== new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})").exec(e) && (t = parseFloat(RegExp.$1))), t
                }();
            if (0 < t) e.msie = !0;
            else {
                var n = navigator.userAgent.toLowerCase(),
                    a = /(edge)[ /]([\w.]+)/.exec(n) || /(chrome)[ /]([\w.]+)/.exec(n) || /(webkit)[ /]([\w.]+)/.exec(n) || /(opera)(?:.*version|)[ /]([\w.]+)/.exec(n) || /(msie) ([\w.]+)/.exec(n) || n.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(n) || [],
                    r = a[1] || "";
                a[2];
                a[1] && (e[r] = !0), e.chrome ? e.webkit = !0 : e.webkit && (e.safari = !0)
            }
            return e.msie && (e.version = t), e
        }

        function t() {
            return /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && !r()
        }

        function n() {
            return /(Android)/g.test(navigator.userAgent) && !r()
        }

        function a() {
            return /(Blackberry)/g.test(navigator.userAgent)
        }

        function r() {
            return /(Windows Phone)/gi.test(navigator.userAgent)
        }

        var l = null;
        return {
            _init: function c() {
                o.browser = e()
            },
            isIOS: t,
            isMac: function d() {
                return null === l && (l = 0 <= navigator.platform.toUpperCase().indexOf("MAC")), l
            },
            isAndroid: n,
            isBlackberry: a,
            isWindowsPhone: r,
            isMobile: function f() {
                return n() || t() || a()
            },
            isEmail: function p(e) {
                return !/^(https?:|ftps?:|)\/\//i.test(e) && $e.MAIL_REGEX.test(e)
            },
            requestAnimationFrame: function u() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
                    window.setTimeout(e, 1e3 / 60)
                }
            },
            getPX: function h(e) {
                return parseInt(e, 10) || 0
            },
            screenSize: function g() {
                try {
                    var e = s(".fr-box").width();
                    if (e < 768) return $e.XS;
                    if (768 <= e && e < 992) return $e.SM;
                    if (992 <= e && e < 1200) return $e.MD;
                    if (1200 <= e) return $e.LG
                } catch (t) {
                    return $e.LG
                }
            },
            isTouch: function m() {
                return "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch
            },
            sanitizeURL: function v(e) {
                return /^(https?:|ftps?:|)\/\//i.test(e) ? e : /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) ? e : new RegExp("^(".concat($e.LinkProtocols.join("|"), "):"), "i").test(e) ? e : e = encodeURIComponent(e).replace(/%23/g, "#").replace(/%2F/g, "/").replace(/%25/g, "%").replace(/mailto%3A/gi, "mailto:").replace(/file%3A/gi, "file:").replace(/sms%3A/gi, "sms:").replace(/tel%3A/gi, "tel:").replace(/notes%3A/gi, "notes:").replace(/data%3Aimage/gi, "data:image").replace(/blob%3A/gi, "blob:").replace(/%3A(\d)/gi, ":$1").replace(/webkit-fake-url%3A/gi, "webkit-fake-url:").replace(/%3F/g, "?").replace(/%3D/g, "=").replace(/%26/g, "&").replace(/&amp;/g, "&").replace(/%2C/g, ",").replace(/%3B/g, ";").replace(/%2B/g, "+").replace(/%40/g, "@").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/%7B/g, "{").replace(/%7D/g, "}")
            },
            isArray: function b(e) {
                return e && !Object.prototype.propertyIsEnumerable.call(e, "length") && "object" === Fe(e) && "number" == typeof e.length
            },
            RGBToHex: function E(e) {
                function t(e) {
                    return "0".concat(parseInt(e, 10).toString(16)).slice(-2)
                }

                try {
                    return e && "transparent" !== e ? /^#[0-9A-F]{6}$/i.test(e) ? e : (e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/), "#".concat(t(e[1])).concat(t(e[2])).concat(t(e[3])).toUpperCase()) : ""
                } catch (n) {
                    return null
                }
            },
            HEXtoRGB: function T(e) {
                e = e.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(e, t, n, a) {
                    return t + t + n + n + a + a
                });
                var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
                return t ? "rgb(".concat(parseInt(t[1], 16), ", ").concat(parseInt(t[2], 16), ", ").concat(parseInt(t[3], 16), ")") : ""
            },
            isURL: function A(e) {
                return !!/^(https?:|ftps?:|)\/\//i.test(e) && (e = String(e).replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "%22").replace(/ /g, "%20"), new RegExp("^".concat($e.LinkRegExHTTP).concat($e.LinkRegExEnd, "$"), "gi").test(e))
            },
            getAlignment: function C(e) {
                e.css || (e = s(e));
                var t = (e.css("text-align") || "").replace(/-(.*)-/g, "");
                if (["left", "right", "justify", "center"].indexOf(t) < 0) {
                    if (!i) {
                        var n = s('<div dir="'.concat("rtl" === o.opts.direction ? "rtl" : "auto", '" style="text-align: ').concat(o.$el.css("text-align"), '; position: fixed; left: -3000px;"><span id="s1">.</span><span id="s2">.</span></div>'));
                        s("body").first().append(n);
                        var a = n.find("#s1").get(0).getBoundingClientRect().left,
                            r = n.find("#s2").get(0).getBoundingClientRect().left;
                        n.remove(), i = a < r ? "left" : "right"
                    }
                    t = i
                }
                return t
            },
            scrollTop: function S() {
                return o.o_win.pageYOffset ? o.o_win.pageYOffset : o.o_doc.documentElement && o.o_doc.documentElement.scrollTop ? o.o_doc.documentElement.scrollTop : o.o_doc.body.scrollTop ? o.o_doc.body.scrollTop : 0
            },
            scrollLeft: function y() {
                return o.o_win.pageXOffset ? o.o_win.pageXOffset : o.o_doc.documentElement && o.o_doc.documentElement.scrollLeft ? o.o_doc.documentElement.scrollLeft : o.o_doc.body.scrollLeft ? o.o_doc.body.scrollLeft : 0
            },
            isInViewPort: function R(e) {
                var t = e.getBoundingClientRect();
                return 0 <= (t = {
                    top: Math.round(t.top),
                    bottom: Math.round(t.bottom)
                }).top && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) || t.top <= 0 && t.bottom >= (window.innerHeight || document.documentElement.clientHeight)
            }
        }
    }, $e.MODULES.events = function(l) {
        var e, o = l.$,
            i = {};

        function s(e, t, n) {
            m(e, t, n)
        }

        function c(e) {
            if (void 0 === e && (e = !0), !l.$wp) return !1;
            if (l.helpers.isIOS() && l.$win.get(0).focus(), l.core.hasFocus()) return !1;
            if (!l.core.hasFocus() && e) {
                var t = l.$win.scrollTop();
                if (l.browser.msie && l.$box && l.$box.css("position", "fixed"), l.browser.msie && l.$wp && l.$wp.css("overflow", "visible"), l.browser.msie && l.$sc && l.$sc.css("position", "fixed"), p(), l.el.focus(), l.events.trigger("focus"), f(), l.browser.msie && l.$sc && l.$sc.css("position", ""), l.browser.msie && l.$box && l.$box.css("position", ""), l.browser.msie && l.$wp && l.$wp.css("overflow", "auto"), t !== l.$win.scrollTop() && l.$win.scrollTop(t), !l.selection.info(l.el).atStart) return !1
            }
            if (!l.core.hasFocus() || 0 < l.$el.find(".fr-marker").length) return !1;
            if (l.selection.info(l.el).atStart && l.selection.isCollapsed() && null !== l.html.defaultTag()) {
                var n = l.markers.insert();
                if (n && !l.node.blockParent(n)) {
                    o(n).remove();
                    var a = l.$el.find(l.html.blockTagsQuery()).get(0);
                    a && (o(a).prepend($e.MARKERS), l.selection.restore())
                } else n && o(n).remove()
            }
        }

        var d = !1;

        function f() {
            e = !0
        }

        function p() {
            e = !1
        }

        function u() {
            return e
        }

        function h(e, t, n) {
            var a, r = e.split(" ");
            if (1 < r.length) {
                for (var o = 0; o < r.length; o++) h(r[o], t, n);
                return !0
            }
            void 0 === n && (n = !1), a = 0 !== e.indexOf("shared.") ? (i[e] = i[e] || [], i[e]) : (l.shared._events[e] = l.shared._events[e] || [], l.shared._events[e]), n ? a.unshift(t) : a.push(t)
        }

        var g = [];

        function m(e, t, n, a, r) {
            "function" == typeof n && (r = a, a = n, n = !1);
            var o = r ? l.shared.$_events : g,
                i = r ? l.sid : l.id,
                s = "".concat(t.trim().split(" ").join(".ed".concat(i, " ")), ".ed").concat(i);
            n ? e.on(s, n, a) : e.on(s, a), o.push([e, s])
        }

        function t(e) {
            for (var t = 0; t < e.length; t++) e[t][0].off(e[t][1])
        }

        function v(e, t, n) {
            if (!l.edit.isDisabled() || n) {
                var a, r;
                if (0 !== e.indexOf("shared.")) a = i[e];
                else {
                    if (0 < l.shared.count) return !1;
                    a = l.shared._events[e]
                }
                if (a)
                    for (var o = 0; o < a.length; o++)
                        if (!1 === (r = a[o].apply(l, t))) return !1;
                return (!l.opts.events || !l.opts.events[e] || !1 !== (r = l.opts.events[e].apply(l, t))) && r
            }
        }

        function b() {
            for (var e in i) Object.prototype.hasOwnProperty.call(i, e) && delete i[e]
        }

        function E() {
            for (var e in l.shared._events) Object.prototype.hasOwnProperty.call(l.shared._events, e) && delete l.shared._events[e]
        }

        return {
            _init: function T() {
                l.shared.$_events = l.shared.$_events || [], l.shared._events = {},
                    function e() {
                        l.helpers.isMobile() ? (l._mousedown = "touchstart", l._mouseup = "touchend", l._move = "touchmove", l._mousemove = "touchmove") : (l._mousedown = "mousedown", l._mouseup = "mouseup", l._move = "", l._mousemove = "mousemove")
                    }(),
                    function t() {
                        s(l.$el, "click mouseup mousedown touchstart touchend dragenter dragover dragleave dragend drop dragstart", function(e) {
                            v(e.type, [e])
                        }), h("mousedown", function() {
                            for (var e = 0; e < $e.INSTANCES.length; e++) $e.INSTANCES[e] !== l && $e.INSTANCES[e].popups && $e.INSTANCES[e].popups.areVisible() && $e.INSTANCES[e].$el.find(".fr-marker").remove()
                        })
                    }(),
                    function n() {
                        s(l.$win, l._mousedown, function(e) {
                            v("window.mousedown", [e]), f()
                        }), s(l.$win, l._mouseup, function(e) {
                            v("window.mouseup", [e])
                        }), s(l.$win, "cut copy keydown keyup touchmove touchend", function(e) {
                            v("window.".concat(e.type), [e])
                        })
                    }(),
                    function a() {
                        s(l.$doc, "dragend drop", function(e) {
                            v("document.".concat(e.type), [e])
                        })
                    }(),
                    function r() {
                        s(l.$el, "keydown keypress keyup input", function(e) {
                            v(e.type, [e])
                        })
                    }(),
                    function o() {
                        s(l.$el, "focus", function(e) {
                            u() && (c(!1), !1 === d && v(e.type, [e]))
                        }), s(l.$el, "blur", function(e) {
                            u() && !0 === d && (v(e.type, [e]), f())
                        }), m(l.$el, "mousedown", '[contenteditable="true"]', function() {
                            p(), l.$el.blur()
                        }), h("focus", function() {
                            d = !0
                        }), h("blur", function() {
                            d = !1
                        })
                    }(), f(),
                    function i() {
                        s(l.$el, "cut copy paste beforepaste", function(e) {
                            v(e.type, [e])
                        })
                    }(), h("destroy", b), h("shared.destroy", E)
            },
            on: h,
            trigger: v,
            bindClick: function a(e, t, n) {
                m(e, l._mousedown, t, function(e) {
                    l.edit.isDisabled() || function n(e) {
                        var t = o(e.currentTarget);
                        return l.edit.isDisabled() || l.node.hasClass(t.get(0), "fr-disabled") ? (e.preventDefault(), !1) : "mousedown" === e.type && 1 !== e.which || (l.helpers.isMobile() || e.preventDefault(), (l.helpers.isAndroid() || l.helpers.isWindowsPhone()) && 0 === t.parents(".fr-dropdown-menu").length && (e.preventDefault(), e.stopPropagation()), t.addClass("fr-selected"), void l.events.trigger("commands.mousedown", [t]))
                    }(e)
                }, !0), m(e, "".concat(l._mouseup, " ").concat(l._move), t, function(e) {
                    l.edit.isDisabled() || function r(e, t) {
                        var n = o(e.currentTarget);
                        if (l.edit.isDisabled() || l.node.hasClass(n.get(0), "fr-disabled")) return e.preventDefault(), !1;
                        if ("mouseup" === e.type && 1 !== e.which) return !0;
                        if (l.button.getButtons(".fr-selected", !0).get(0) == n.get(0) && !l.node.hasClass(n.get(0), "fr-selected")) return !0;
                        if ("touchmove" !== e.type) {
                            if (e.stopPropagation(), e.stopImmediatePropagation(), e.preventDefault(), !l.node.hasClass(n.get(0), "fr-selected")) return l.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), !1;
                            if (l.button.getButtons(".fr-selected", !0).removeClass("fr-selected"), n.data("dragging") || n.attr("disabled")) return n.removeData("dragging"), !1;
                            var a = n.data("timeout");
                            a && (clearTimeout(a), n.removeData("timeout")), t.apply(l, [e])
                        } else n.data("timeout") || n.data("timeout", setTimeout(function() {
                            n.data("dragging", !0)
                        }, 100))
                    }(e, n)
                }, !0), m(e, "mousedown click mouseup", t, function(e) {
                    l.edit.isDisabled() || e.stopPropagation()
                }, !0), h("window.mouseup", function() {
                    l.edit.isDisabled() || (e.find(t).removeClass("fr-selected"), f())
                }), m(e, "mouseover", t, function() {
                    o(this).hasClass("fr-options") && o(this).prev(".fr-btn").addClass("fr-btn-hover"), o(this).next(".fr-btn").hasClass("fr-options") && o(this).next(".fr-btn").addClass("fr-btn-hover")
                }), m(e, "mouseout", t, function() {
                    o(this).hasClass("fr-options") && o(this).prev(".fr-btn").removeClass("fr-btn-hover"), o(this).next(".fr-btn").hasClass("fr-options") && o(this).next(".fr-btn").removeClass("fr-btn-hover")
                })
            },
            disableBlur: p,
            enableBlur: f,
            blurActive: u,
            focus: c,
            chainTrigger: function A(e, t, n) {
                if (!l.edit.isDisabled() || n) {
                    var a, r;
                    if (0 !== e.indexOf("shared.")) a = i[e];
                    else {
                        if (0 < l.shared.count) return !1;
                        a = l.shared._events[e]
                    }
                    if (a)
                        for (var o = 0; o < a.length; o++) void 0 !== (r = a[o].apply(l, [t])) && (t = r);
                    return l.opts.events && l.opts.events[e] && void 0 !== (r = l.opts.events[e].apply(l, [t])) && (t = r), t
                }
            },
            $on: m,
            $off: function n() {
                t(g), g = [], 0 === l.shared.count && (t(l.shared.$_events), l.shared.$_events = [])
            }
        }
    }, Object.assign($e.DEFAULTS, { indentMargin: 20 }), $e.COMMANDS = {
        bold: {
            title: "Bold",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("strong");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        italic: {
            title: "Italic",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("em");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        underline: {
            title: "Underline",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("u");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        strikeThrough: {
            title: "Strikethrough",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("s");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        subscript: {
            title: "Subscript",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("sub");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        superscript: {
            title: "Superscript",
            toggle: !0,
            refresh: function(e) {
                var t = this.format.is("sup");
                e.toggleClass("fr-active", t).attr("aria-pressed", t)
            }
        },
        outdent: { title: "Decrease Indent" },
        indent: { title: "Increase Indent" },
        undo: { title: "Undo", undo: !1, forcedRefresh: !0, disabled: !0 },
        redo: { title: "Redo", undo: !1, forcedRefresh: !0, disabled: !0 },
        insertHR: { title: "Insert Horizontal Line" },
        clearFormatting: { title: "Clear Formatting" },
        selectAll: { title: "Select All", undo: !1 },
        moreText: { title: "More Text", undo: !1 },
        moreParagraph: { title: "More Paragraph", undo: !1 },
        moreRich: { title: "More Rich", undo: !1 },
        moreMisc: { title: "More Misc", undo: !1 }
    }, $e.RegisterCommand = function(e, t) {
        $e.COMMANDS[e] = t
    }, $e.MODULES.commands = function(i) {
        var s = i.$;

        function r(e) {
            return i.html.defaultTag() && (e = "<".concat(i.html.defaultTag(), ">").concat(e, "</").concat(i.html.defaultTag(), ">")), e
        }

        var o = {
            bold: function() {
                e("bold", "strong")
            },
            subscript: function() {
                i.format.is("sup") && i.format.remove("sup"), e("subscript", "sub")
            },
            superscript: function() {
                i.format.is("sub") && i.format.remove("sub"), e("superscript", "sup")
            },
            italic: function() {
                e("italic", "em")
            },
            strikeThrough: function() {
                e("strikeThrough", "s")
            },
            underline: function() {
                e("underline", "u")
            },
            undo: function() {
                i.undo.run()
            },
            redo: function() {
                i.undo.redo()
            },
            indent: function() {
                a(1)
            },
            outdent: function() {
                a(-1)
            },
            show: function() {
                i.opts.toolbarInline && i.toolbar.showInline(null, !0)
            },
            insertHR: function() {
                i.selection.remove();
                var e = "";
                i.core.isEmpty() && (e = r(e = "<br>")), i.html.insert('<hr id="fr-just" class="fr-just">'.concat(e));
                var t, n = i.$el.find("hr#fr-just").length ? i.$el.find("hr#fr-just") : i.$el.find(".fr-just");
                if (n.removeAttr("id"), n.removeAttr("class"), 0 === n.next().length) {
                    var a = i.html.defaultTag();
                    a ? n.after(s(i.doc.createElement(a)).append("<br>").get(0)) : n.after("<br>")
                }
                n.prev().is("hr") ? t = i.selection.setAfter(n.get(0), !1) : n.next().is("hr") ? t = i.selection.setBefore(n.get(0), !1) : i.selection.setAfter(n.get(0), !1) || i.selection.setBefore(n.get(0), !1), t || void 0 === t || (e = r(e = "".concat($e.MARKERS, "<br>")), n.after(e)), i.selection.restore()
            },
            clearFormatting: function() {
                i.format.remove()
            },
            selectAll: function() {
                i.doc.execCommand("selectAll", !1, !1)
            },
            moreText: function(e) {
                t(e)
            },
            moreParagraph: function(e) {
                t(e)
            },
            moreRich: function(e) {
                t(e)
            },
            moreMisc: function(e) {
                t(e)
            }
        };

        function t(e) {
            ! function n(e) {
                var t = i.$tb.find('.fr-more-toolbar[data-name="'.concat(e.attr("data-group-name"), '"]'));
                i.$tb.find(".fr-open").not(e).removeClass("fr-open"), e.toggleClass("fr-open"), i.$tb.find(".fr-more-toolbar").removeClass("fr-overflow-visible"), i.$tb.find(".fr-expanded").not(t).length ? (i.$tb.find(".fr-expanded").toggleClass("fr-expanded"), t.toggleClass("fr-expanded")) : (t.toggleClass("fr-expanded"), i.$box.toggleClass("fr-toolbar-open"), i.$tb.toggleClass("fr-toolbar-open"))
            }(i.$tb.find("[data-cmd=".concat(e, "]"))), i.toolbar.setMoreToolbarsHeight()
        }

        function n(e, t) {
            if (!1 !== i.events.trigger("commands.before", s.merge([e], t || []))) {
                var n = $e.COMMANDS[e] && $e.COMMANDS[e].callback || o[e],
                    a = !0,
                    r = !1;
                $e.COMMANDS[e] && ("undefined" != typeof $e.COMMANDS[e].focus && (a = $e.COMMANDS[e].focus), "undefined" != typeof $e.COMMANDS[e].accessibilityFocus && (r = $e.COMMANDS[e].accessibilityFocus)), (!i.core.hasFocus() && a && !i.popups.areVisible() || !i.core.hasFocus() && r && i.accessibility.hasFocus()) && i.events.focus(!0), $e.COMMANDS[e] && !1 !== $e.COMMANDS[e].undo && (i.$el.find(".fr-marker").length && (i.events.disableBlur(), i.selection.restore()), i.undo.saveStep()), n && n.apply(i, s.merge([e], t || [])), i.events.trigger("commands.after", s.merge([e], t || [])), $e.COMMANDS[e] && !1 !== $e.COMMANDS[e].undo && i.undo.saveStep()
            }
        }

        function e(e, t) {
            i.format.toggle(t)
        }

        function a(e) {
            i.selection.save(), i.html.wrap(!0, !0, !0, !0), i.selection.restore();
            for (var t = i.selection.blocks(), n = 0; n < t.length; n++)
                if ("LI" !== t[n].tagName || "LI" !== t[n].parentNode.tagName) {
                    var a = s(t[n]);
                    "LI" != t[n].tagName && "LI" == t[n].parentNode.tagName && (a = s(t[n].parentNode));
                    var r = "rtl" === i.opts.direction || "rtl" === a.css("direction") ? "margin-right" : "margin-left",
                        o = i.helpers.getPX(a.css(r));
                    if (a.width() < 2 * i.opts.indentMargin && 0 < e) continue;
                    a.css(r, Math.max(o + e * i.opts.indentMargin, 0) || ""), a.removeClass("fr-temp-div")
                }
            i.selection.save(), i.html.unwrap(), i.selection.restore()
        }

        function l(e) {
            return function() {
                n(e)
            }
        }

        var c = {};
        for (var d in o) Object.prototype.hasOwnProperty.call(o, d) && (c[d] = l(d));
        return Object.assign(c, {
            exec: n,
            _init: function f() {
                i.events.on("keydown", function(e) {
                    var t = i.selection.element();
                    if (t && "HR" === t.tagName && !i.keys.isArrow(e.which)) return e.preventDefault(), !1
                }), i.events.on("keyup", function(e) {
                    var t = i.selection.element();
                    if (t && "HR" === t.tagName)
                        if (e.which === $e.KEYCODE.ARROW_LEFT || e.which === $e.KEYCODE.ARROW_UP) {
                            if (t.previousSibling) return i.node.isBlock(t.previousSibling) ? i.selection.setAtEnd(t.previousSibling) : s(t).before($e.MARKERS), i.selection.restore(), !1
                        } else if ((e.which === $e.KEYCODE.ARROW_RIGHT || e.which === $e.KEYCODE.ARROW_DOWN) && t.nextSibling) return i.node.isBlock(t.nextSibling) ? i.selection.setAtStart(t.nextSibling) : s(t).after($e.MARKERS), i.selection.restore(), !1
                }), i.events.on("mousedown", function(e) {
                    if (e.target && "HR" === e.target.tagName) return e.preventDefault(), e.stopPropagation(), !1
                }), i.events.on("mouseup", function() {
                    var e = i.selection.element();
                    e === i.selection.endElement() && e && "HR" === e.tagName && (e.nextSibling && (i.node.isBlock(e.nextSibling) ? i.selection.setAtStart(e.nextSibling) : s(e).after($e.MARKERS)), i.selection.restore())
                })
            }
        })
    }, $e.MODULES.cursorLists = function(g) {
        var m = g.$;

        function v(e) {
            for (var t = e;
                "LI" !== t.tagName;) t = t.parentNode;
            return t
        }

        function b(e) {
            for (var t = e; !g.node.isList(t);) t = t.parentNode;
            return t
        }

        return {
            _startEnter: function E(e) {
                var t, n = v(e),
                    a = n.nextSibling,
                    r = n.previousSibling,
                    o = g.html.defaultTag();
                if (g.node.isEmpty(n, !0) && a) {
                    for (var i = "", s = "", l = e.parentNode; !g.node.isList(l) && l.parentNode && ("LI" !== l.parentNode.tagName || l.parentNode === n);) i = g.node.openTagString(l) + i, s += g.node.closeTagString(l), l = l.parentNode;
                    i = g.node.openTagString(l) + i, s += g.node.closeTagString(l);
                    var c = "";
                    for (c = l.parentNode && "LI" === l.parentNode.tagName ? "".concat(s, "<li>").concat($e.MARKERS, "<br>").concat(i) : o ? "".concat(s, "<").concat(o, ">").concat($e.MARKERS, "<br></").concat(o, ">").concat(i) : "".concat(s + $e.MARKERS, "<br>").concat(i);
                        ["UL", "OL"].indexOf(l.tagName) < 0 || l.parentNode && "LI" === l.parentNode.tagName;) l = l.parentNode;
                    m(n).replaceWith('<span id="fr-break"></span>');
                    var d = g.node.openTagString(l) + m(l).html() + g.node.closeTagString(l);
                    d = d.replace(/<span id="fr-break"><\/span>/g, c), m(l).replaceWith(d), g.$el.find("li:empty").remove()
                } else if (r && a || !g.node.isEmpty(n, !0)) {
                    for (var f = "<br>", p = e.parentNode; p && "LI" !== p.tagName;) f = g.node.openTagString(p) + f + g.node.closeTagString(p), p = p.parentNode;
                    m(n).before("<li>".concat(f, "</li>")), m(e).remove()
                } else if (r) {
                    t = b(n);
                    for (var u = "".concat($e.MARKERS, "<br>"), h = e.parentNode; h && "LI" !== h.tagName;) u = g.node.openTagString(h) + u + g.node.closeTagString(h), h = h.parentNode;
                    t.parentNode && "LI" === t.parentNode.tagName ? m(t.parentNode).after("<li>".concat(u, "</li>")) : o ? m(t).after("<".concat(o, ">").concat(u, "</").concat(o, ">")) : m(t).after(u), m(n).remove()
                } else(t = b(n)).parentNode && "LI" === t.parentNode.tagName ? a ? m(t.parentNode).before("".concat(g.node.openTagString(n) + $e.MARKERS, "<br></li>")) : m(t.parentNode).after("".concat(g.node.openTagString(n) + $e.MARKERS, "<br></li>")) : o ? m(t).before("<".concat(o, ">").concat($e.MARKERS, "<br></").concat(o, ">")) : m(t).before("".concat($e.MARKERS, "<br>")), m(n).remove()
            },
            _middleEnter: function c(e) {
                for (var t = v(e), n = "", a = e, r = "", o = "", i = !1; a !== t;) {
                    var s = "A" === (a = a.parentNode).tagName && g.cursor.isAtEnd(e, a) ? "fr-to-remove" : "";
                    i || a == t || g.node.isBlock(a) || (i = !0, r += $e.INVISIBLE_SPACE), r = g.node.openTagString(m(a).clone().addClass(s).get(0)) + r, o = g.node.closeTagString(a) + o
                }
                n = o + n + r + $e.MARKERS + (g.opts.keepFormatOnDelete ? $e.INVISIBLE_SPACE : ""), m(e).replaceWith('<span id="fr-break"></span>');
                var l = g.node.openTagString(t) + m(t).html() + g.node.closeTagString(t);
                l = l.replace(/<span id="fr-break"><\/span>/g, n), m(t).replaceWith(l)
            },
            _endEnter: function l(e) {
                for (var t = v(e), n = $e.MARKERS, a = "", r = e, o = !1; r !== t;)
                    if (!(r = r.parentNode).classList.contains("fr-img-space-wrap") && !r.classList.contains("fr-img-space-wrap2")) {
                        var i = "A" === r.tagName && g.cursor.isAtEnd(e, r) ? "fr-to-remove" : "";
                        o || r === t || g.node.isBlock(r) || (o = !0, a += $e.INVISIBLE_SPACE), a = g.node.openTagString(m(r).clone().addClass(i).get(0)) + a, n += g.node.closeTagString(r)
                    }
                var s = a + n;
                m(e).remove(), m(t).after(s)
            },
            _backspace: function d(e) {
                var t = v(e),
                    n = t.previousSibling;
                if (n) {
                    n = m(n).find(g.html.blockTagsQuery()).get(-1) || n, m(e).replaceWith($e.MARKERS);
                    var a = g.node.contents(n);
                    a.length && "BR" === a[a.length - 1].tagName && m(a[a.length - 1]).remove(), m(t).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                        this.parentNode === t && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                    });
                    for (var r, o = g.node.contents(t)[0]; o && !g.node.isList(o);) r = o.nextSibling, m(n).append(o), o = r;
                    for (n = t.previousSibling; o;) r = o.nextSibling, m(n).append(o), o = r;
                    1 < (a = g.node.contents(n)).length && "BR" === a[a.length - 1].tagName && m(a[a.length - 1]).remove(), m(t).remove()
                } else {
                    var i = b(t);
                    if (m(e).replaceWith($e.MARKERS), i.parentNode && "LI" === i.parentNode.tagName) {
                        var s = i.previousSibling;
                        g.node.isBlock(s) ? (m(t).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                            this.parentNode === t && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                        }), m(s).append(m(t).html())) : m(i).before(m(t).html())
                    } else {
                        var l = g.html.defaultTag();
                        l && 0 === m(t).find(g.html.blockTagsQuery()).length ? m(i).before("<".concat(l, ">").concat(m(t).html(), "</").concat(l, ">")) : m(i).before(m(t).html())
                    }
                    m(t).remove(), g.html.wrap(), 0 === m(i).find("li").length && m(i).remove()
                }
            },
            _del: function f(e) {
                var t, n = v(e),
                    a = n.nextSibling;
                if (a) {
                    (t = g.node.contents(a)).length && "BR" === t[0].tagName && m(t[0]).remove(), m(a).find(g.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                        this.parentNode === a && m(this).replaceWith(m(this).html() + (g.node.isEmpty(this) ? "" : "<br>"))
                    });
                    for (var r, o = e, i = g.node.contents(a)[0]; i && !g.node.isList(i);) r = i.nextSibling, m(o).after(i), o = i, i = r;
                    for (; i;) r = i.nextSibling, m(n).append(i), i = r;
                    m(e).replaceWith($e.MARKERS), m(a).remove()
                } else {
                    for (var s = n; !s.nextSibling && s !== g.el;) s = s.parentNode;
                    if (s === g.el) return !1;
                    if (s = s.nextSibling, g.node.isBlock(s)) $e.NO_DELETE_TAGS.indexOf(s.tagName) < 0 && (m(e).replaceWith($e.MARKERS), (t = g.node.contents(n)).length && "BR" === t[t.length - 1].tagName && m(t[t.length - 1]).remove(), m(n).append(m(s).html()), m(s).remove());
                    else
                        for ((t = g.node.contents(n)).length && "BR" === t[t.length - 1].tagName && m(t[t.length - 1]).remove(), m(e).replaceWith($e.MARKERS); s && !g.node.isBlock(s) && "BR" !== s.tagName;) m(n).append(m(s)), s = s.nextSibling
                }
            }
        }
    }, $e.NO_DELETE_TAGS = ["TH", "TD", "TR", "TABLE", "FORM"], $e.SIMPLE_ENTER_TAGS = ["TH", "TD", "LI", "DL", "DT", "FORM"], $e.MODULES.cursor = function(u) {
        var h = u.$;

        function o(e) {
            return !!e && (!!u.node.isBlock(e) || (e.nextSibling && e.nextSibling.nodeType === Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? o(e.nextSibling) : !(e.nextSibling && (!e.previousSibling || "BR" !== e.nextSibling.tagName || e.nextSibling.nextSibling)) && o(e.parentNode)))
        }

        function i(e) {
            return !!e && (!!u.node.isBlock(e) || (e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? i(e.previousSibling) : !e.previousSibling && (!(e.previousSibling || !u.node.hasClass(e.parentNode, "fr-inner")) || i(e.parentNode))))
        }

        function g(e, t) {
            return !!e && (e !== u.$wp.get(0) && (e.previousSibling && e.previousSibling.nodeType === Node.TEXT_NODE && 0 === e.previousSibling.textContent.replace(/\u200b/g, "").length ? g(e.previousSibling, t) : !e.previousSibling && (e.parentNode === t || g(e.parentNode, t))))
        }

        function m(e, t) {
            return !!e && (e !== u.$wp.get(0) && (e.nextSibling && e.nextSibling.nodeType === Node.TEXT_NODE && 0 === e.nextSibling.textContent.replace(/\u200b/g, "").length ? m(e.nextSibling, t) : !(e.nextSibling && (!e.previousSibling || "BR" !== e.nextSibling.tagName || e.nextSibling.nextSibling)) && (e.parentNode === t || m(e.parentNode, t))))
        }

        function c(e) {
            return 0 < h(e).parentsUntil(u.$el, "LI").length && 0 === h(e).parentsUntil("LI", "TABLE").length
        }

        function d(e, t) {
            var n = new RegExp("".concat(t ? "^" : "", "(([\\uD83C-\\uDBFF\\uDC00-\\uDFFF]+\\u200D)*[\\uD83C-\\uDBFF\\uDC00-\\uDFFF]{2})").concat(t ? "" : "$"), "i"),
                a = e.match(n);
            return a ? a[0].length : 1
        }

        function f(e) {
            for (var t, n = e; !n.previousSibling;)
                if (n = n.parentNode, u.node.isElement(n)) return !1;
            if (n = n.previousSibling, !u.node.isBlock(n) && u.node.isEditable(n)) {
                for (t = u.node.contents(n); n.nodeType !== Node.TEXT_NODE && !u.node.isDeletable(n) && t.length && u.node.isEditable(n);) n = t[t.length - 1], t = u.node.contents(n);
                if (n.nodeType === Node.TEXT_NODE) {
                    var a = n.textContent,
                        r = a.length;
                    if (a.length && "\n" === a[a.length - 1]) return n.textContent = a.substring(0, r - 2), 0 === n.textContent.length && n.parentNode.removeChild(n), f(e);
                    if (u.opts.tabSpaces && a.length >= u.opts.tabSpaces) 0 === a.substr(a.length - u.opts.tabSpaces, a.length - 1).replace(/ /g, "").replace(new RegExp($e.UNICODE_NBSP, "g"), "").length && (r = a.length - u.opts.tabSpaces + 1);
                    n.textContent = a.substring(0, r - d(a)), u.opts.htmlUntouched && !e.nextSibling && n.textContent.length && " " === n.textContent[n.textContent.length - 1] && (n.textContent = n.textContent.substring(0, n.textContent.length - 1) + $e.UNICODE_NBSP);
                    var o = a.length !== n.textContent.length;
                    if (0 === n.textContent.length)
                        if (o && u.opts.keepFormatOnDelete) h(n).after($e.INVISIBLE_SPACE + $e.MARKERS);
                        else if (0 !== a.length && u.node.isBlock(n.parentNode)) h(n).after($e.MARKERS);
                    else if ((2 != n.parentNode.childNodes.length || n.parentNode != e.parentNode) && 1 != n.parentNode.childNodes.length || u.node.isBlock(n.parentNode) || u.node.isElement(n.parentNode) || !u.node.isDeletable(n.parentNode)) {
                        for (; !u.node.isElement(n.parentNode) && u.node.isEmpty(n.parentNode) && $e.NO_DELETE_TAGS.indexOf(n.parentNode.tagName) < 0;) {
                            var i = n;
                            n = n.parentNode, i.parentNode.removeChild(i)
                        }
                        h(n).after($e.MARKERS), u.node.isElement(n.parentNode) && !e.nextSibling && n.previousSibling && "BR" === n.previousSibling.tagName && h(e).after("<br>"), n.parentNode.removeChild(n)
                    } else h(n.parentNode).after($e.MARKERS), h(n.parentNode).remove();
                    else h(n).after($e.MARKERS)
                } else u.node.isDeletable(n) ? (h(n).after($e.MARKERS), h(n).remove()) : e.nextSibling && "BR" === e.nextSibling.tagName && u.node.isVoid(n) && "BR" !== n.tagName ? (h(e.nextSibling).remove(), h(e).replaceWith($e.MARKERS)) : !1 !== u.events.trigger("node.remove", [h(n)]) && (h(n).after($e.MARKERS), h(n).remove())
            } else if ($e.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n)))
                if (u.node.isDeletable(n)) h(e).replaceWith($e.MARKERS), h(n).remove();
                else if (u.node.isEmpty(n) && !u.node.isList(n)) h(n).remove(), h(e).replaceWith($e.MARKERS);
            else {
                for (u.node.isList(n) && (n = h(n).find("li").last().get(0)), (t = u.node.contents(n)) && "BR" === t[t.length - 1].tagName && h(t[t.length - 1]).remove(), t = u.node.contents(n); t && u.node.isBlock(t[t.length - 1]);) n = t[t.length - 1], t = u.node.contents(n);
                h(n).append($e.MARKERS);
                for (var s = e; !s.previousSibling;) s = s.parentNode;
                for (; s && "BR" !== s.tagName && !u.node.isBlock(s);) {
                    var l = s;
                    s = s.nextSibling, h(n).append(l)
                }
                s && "BR" === s.tagName && h(s).remove(), h(e).remove()
            } else e.nextSibling && "BR" === e.nextSibling.tagName && h(e.nextSibling).remove();
            return !0
        }

        function s(e) {
            var t = 0 < h(e).parentsUntil(u.$el, "BLOCKQUOTE").length,
                n = u.node.deepestParent(e, [], !t);
            if (n && "BLOCKQUOTE" === n.tagName) {
                var a = u.node.deepestParent(e, [h(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
                a && a.nextSibling && (n = a)
            }
            if (null !== n) {
                var r, o = n.nextSibling;
                if (u.node.isBlock(n) && (u.node.isEditable(n) || u.node.isDeletable(n)) && o && $e.NO_DELETE_TAGS.indexOf(o.tagName) < 0)
                    if (u.node.isDeletable(o)) h(o).remove(), h(e).replaceWith($e.MARKERS);
                    else if (u.node.isBlock(o) && u.node.isEditable(o))
                    if (u.node.isList(o))
                        if (u.node.isEmpty(n, !0)) h(n).remove(), h(o).find("li").first().prepend($e.MARKERS);
                        else {
                            var i = h(o).find("li").first();
                            "BLOCKQUOTE" === n.tagName && (r = u.node.contents(n)).length && u.node.isBlock(r[r.length - 1]) && (n = r[r.length - 1]), 0 === i.find("ul, ol").length && (h(e).replaceWith($e.MARKERS), i.find(u.html.blockTagsQuery()).not("ol, ul, table").each(function() {
                                this.parentNode === i.get(0) && h(this).replaceWith(h(this).html() + (u.node.isEmpty(this) ? "" : "<br>"))
                            }), h(n).append(u.node.contents(i.get(0))), i.remove(), 0 === h(o).find("li").length && h(o).remove())
                        }
                else {
                    if ((r = u.node.contents(o)).length && "BR" === r[0].tagName && h(r[0]).remove(), "BLOCKQUOTE" !== o.tagName && "BLOCKQUOTE" === n.tagName)
                        for (r = u.node.contents(n); r.length && u.node.isBlock(r[r.length - 1]);) n = r[r.length - 1], r = u.node.contents(n);
                    else if ("BLOCKQUOTE" === o.tagName && "BLOCKQUOTE" !== n.tagName)
                        for (r = u.node.contents(o); r.length && u.node.isBlock(r[0]);) o = r[0], r = u.node.contents(o);
                    h(e).replaceWith($e.MARKERS), h(n).append(o.innerHTML), h(o).remove()
                } else {
                    for (h(e).replaceWith($e.MARKERS); o && "BR" !== o.tagName && !u.node.isBlock(o) && u.node.isEditable(o);) {
                        var s = o;
                        o = o.nextSibling, h(n).append(s)
                    }
                    o && "BR" === o.tagName && u.node.isEditable(o) && h(o).remove()
                }
            }
        }

        function n(e) {
            for (var t, n = e; !n.nextSibling;)
                if (n = n.parentNode, u.node.isElement(n)) return !1;
            if ("BR" === (n = n.nextSibling).tagName && u.node.isEditable(n))
                if (n.nextSibling) {
                    if (u.node.isBlock(n.nextSibling) && u.node.isEditable(n.nextSibling)) {
                        if (!($e.NO_DELETE_TAGS.indexOf(n.nextSibling.tagName) < 0)) return void h(n).remove();
                        n = n.nextSibling, h(n.previousSibling).remove()
                    }
                } else if (o(n)) {
                if (c(e)) u.cursorLists._del(e);
                else u.node.deepestParent(n) && ((!u.node.isEmpty(u.node.blockParent(n)) || (u.node.blockParent(n).nextSibling && $e.NO_DELETE_TAGS.indexOf(u.node.blockParent(n).nextSibling.tagName)) < 0) && h(n).remove(), s(e));
                return
            }
            if (!u.node.isBlock(n) && u.node.isEditable(n)) {
                for (t = u.node.contents(n); n.nodeType !== Node.TEXT_NODE && t.length && !u.node.isDeletable(n) && u.node.isEditable(n);) n = t[0], t = u.node.contents(n);
                n.nodeType === Node.TEXT_NODE ? (h(n).before($e.MARKERS), n.textContent.length && (n.textContent = n.textContent.substring(d(n.textContent, !0), n.textContent.length))) : u.node.isDeletable(n) ? (h(n).before($e.MARKERS), h(n).remove()) : !1 !== u.events.trigger("node.remove", [h(n)]) && (h(n).before($e.MARKERS), h(n).remove()), h(e).remove()
            } else if ($e.NO_DELETE_TAGS.indexOf(n.tagName) < 0 && (u.node.isEditable(n) || u.node.isDeletable(n)))
                if (u.node.isDeletable(n)) h(e).replaceWith($e.MARKERS), h(n).remove();
                else if (u.node.isList(n)) e.previousSibling ? (h(n).find("li").first().prepend(e), u.cursorLists._backspace(e)) : (h(n).find("li").first().prepend($e.MARKERS), h(e).remove());
            else if ((t = u.node.contents(n)) && "BR" === t[0].tagName && h(t[0]).remove(), t && "BLOCKQUOTE" === n.tagName) {
                var a = t[0];
                for (h(e).before($e.MARKERS); a && "BR" !== a.tagName;) {
                    var r = a;
                    a = a.nextSibling, h(e).before(r)
                }
                a && "BR" === a.tagName && h(a).remove()
            } else h(e).after(h(n).html()).after($e.MARKERS), h(n).remove()
        }

        function p() {
            for (var e = u.el.querySelectorAll("blockquote:empty"), t = 0; t < e.length; t++) e[t].parentNode.removeChild(e[t])
        }

        function l(e, t, n) {
            var a, r = u.node.deepestParent(e, [], !n);
            if (r && "BLOCKQUOTE" === r.tagName) return m(e, r) ? (a = u.html.defaultTag(), t ? h(e).replaceWith("<br>" + $e.MARKERS) : a ? h(r).after("<".concat(a, ">").concat($e.MARKERS, "<br></").concat(a, ">")) : h(r).after("".concat($e.MARKERS, "<br>")), h(e).remove()) : v(e, t, n), !1;
            if (null === r)(a = u.html.defaultTag()) && u.node.isElement(e.parentNode) ? h(e).replaceWith("<".concat(a, ">").concat($e.MARKERS, "<br></").concat(a, ">")) : !e.previousSibling || h(e.previousSibling).is("br") || e.nextSibling ? h(e).replaceWith("<br>".concat($e.MARKERS)) : h(e).replaceWith("<br>".concat($e.MARKERS, "<br>"));
            else {
                var o = e,
                    i = "";
                "PRE" != r.tagName || e.nextSibling || (t = !0), u.node.isBlock(r) && !t || (i = "<br/>");
                var s, l = "",
                    c = "",
                    d = "",
                    f = "";
                (a = u.html.defaultTag()) && u.node.isBlock(r) && (d = "<".concat(a, ">"), f = "</".concat(a, ">"), r.tagName === a.toUpperCase() && (d = u.node.openTagString(h(r).clone().removeAttr("id").get(0))));
                do {
                    if (o = o.parentNode, !t || o !== r || t && !u.node.isBlock(r))
                        if (l += u.node.closeTagString(o), o === r && u.node.isBlock(r)) c = d + c;
                        else {
                            var p = ("A" === o.tagName || u.node.hasClass(o, "fa")) && m(e, o) ? "fr-to-remove" : "";
                            c = u.node.openTagString(h(o).clone().addClass(p).get(0)) + c
                        }
                } while (o !== r);
                i = l + i + c + (e.parentNode === r && u.node.isBlock(r) ? "" : $e.INVISIBLE_SPACE) + $e.MARKERS, u.node.isBlock(r) && !h(r).find("*").last().is("br") && h(r).append("<br/>"), h(e).after('<span id="fr-break"></span>'), h(e).remove(), r.nextSibling && !u.node.isBlock(r.nextSibling) || u.node.isBlock(r) || h(r).after("<br>"), s = (s = !t && u.node.isBlock(r) ? u.node.openTagString(r) + h(r).html() + f : u.node.openTagString(r) + h(r).html() + u.node.closeTagString(r)).replace(/<span id="fr-break"><\/span>/g, i), h(r).replaceWith(s)
            }
        }

        function v(e, t, n) {
            var a = u.node.deepestParent(e, [], !n);
            if (null === a) u.html.defaultTag() && e.parentNode === u.el ? h(e).replaceWith("<".concat(u.html.defaultTag(), ">").concat($e.MARKERS, "<br></").concat(u.html.defaultTag(), ">")) : (e.nextSibling && !u.node.isBlock(e.nextSibling) || h(e).after("<br>"), h(e).replaceWith("<br>".concat($e.MARKERS)));
            else if (e.previousSibling && "IMG" == e.previousSibling.tagName || e.nextSibling && "IMG" == e.nextSibling.tagName) h(e).replaceWith("<" + u.html.defaultTag() + ">" + $e.MARKERS + "<br></" + u.html.defaultTag() + ">");
            else {
                var r = e,
                    o = "";
                "PRE" === a.tagName && (t = !0), u.node.isBlock(a) && !t || (o = "<br>");
                var i = "",
                    s = "";
                do {
                    var l = r;
                    if (r = r.parentNode, "BLOCKQUOTE" === a.tagName && u.node.isEmpty(l) && !u.node.hasClass(l, "fr-marker") && h(l).contains(e) && h(l).after(e), "BLOCKQUOTE" !== a.tagName || !m(e, r) && !g(e, r))
                        if (!t || r !== a || t && !u.node.isBlock(a)) {
                            i += u.node.closeTagString(r);
                            var c = "A" == r.tagName && m(e, r) || u.node.hasClass(r, "fa") ? "fr-to-remove" : "";
                            s = u.node.openTagString(h(r).clone().addClass(c).removeAttr("id").get(0)) + s
                        } else "BLOCKQUOTE" == a.tagName && t && (s = i = "")
                } while (r !== a);
                var d = a === e.parentNode && u.node.isBlock(a) || e.nextSibling;
                if ("BLOCKQUOTE" === a.tagName)
                    if (e.previousSibling && u.node.isBlock(e.previousSibling) && e.nextSibling && "BR" === e.nextSibling.tagName && (h(e.nextSibling).after(e), e.nextSibling && "BR" === e.nextSibling.tagName && h(e.nextSibling).remove()), t) o = i + o + $e.MARKERS + s;
                    else {
                        var f = u.html.defaultTag();
                        o = "".concat(i + o + (f ? "<".concat(f, ">") : "") + $e.MARKERS, "<br>").concat(f ? "</".concat(f, ">") : "").concat(s)
                    }
                else o = i + o + s + (d ? "" : $e.INVISIBLE_SPACE) + $e.MARKERS;
                h(e).replaceWith('<span id="fr-break"></span>');
                var p = u.node.openTagString(a) + h(a).html() + u.node.closeTagString(a);
                p = p.replace(/<span id="fr-break"><\/span>/g, o), h(a).replaceWith(p)
            }
        }

        return {
            enter: function b(e) {
                var t = u.markers.insert();
                if (!t) return !0;
                for (var n = t.parentNode; n && !u.node.isElement(n);) {
                    if ("false" === n.getAttribute("contenteditable")) return h(t).replaceWith($e.MARKERS), u.selection.restore(), !1;
                    if ("true" === n.getAttribute("contenteditable")) break;
                    n = n.parentNode
                }
                u.el.normalize();
                var a = !1;
                0 < h(t).parentsUntil(u.$el, "BLOCKQUOTE").length && (a = !0), h(t).parentsUntil(u.$el, "TD, TH").length && (a = !1), o(t) ? !c(t) || e || a ? l(t, e, a) : u.cursorLists._endEnter(t) : i(t) ? !c(t) || e || a ? function s(e, t, n) {
                        var a, r = u.node.deepestParent(e, [], !n);
                        if (r && "TABLE" === r.tagName) return h(r).find("td, th").first().prepend(e), s(e, t, n);
                        if (r && "BLOCKQUOTE" === r.tagName)
                            if (g(e, r)) {
                                if (!t) return (a = u.html.defaultTag()) ? h(r).before("<".concat(a, ">").concat($e.MARKERS, "<br></").concat(a, ">")) : h(r).before("".concat($e.MARKERS, "<br>")), h(e).remove(), !1
                            } else m(e, r) ? l(e, t, !0) : v(e, t, !0);
                        if (null === r)(a = u.html.defaultTag()) && u.node.isElement(e.parentNode) ? h(e).replaceWith("<".concat(a, ">").concat($e.MARKERS, "<br></").concat(a, ">")) : h(e).replaceWith("<br>".concat($e.MARKERS));
                        else {
                            if (u.node.isBlock(r))
                                if ("PRE" === r.tagName && (t = !0), t) h(e).remove(), h(r).prepend("<br>".concat($e.MARKERS));
                                else if (e.nextSibling && "IMG" == e.nextSibling.tagName || e.nextSibling && e.nextSibling.nextElementSibling && "IMG" == e.nextSibling.nextElementSibling) h(e).replaceWith("<" + u.html.defaultTag() + ">" + $e.MARKERS + "<br></" + u.html.defaultTag() + ">");
                            else {
                                if (u.node.isEmpty(r, !0)) return l(e, t, n);
                                if (u.opts.keepFormatOnDelete) {
                                    for (var o = e, i = $e.INVISIBLE_SPACE; o !== r && !u.node.isElement(o);) o = o.parentNode, i = u.node.openTagString(o) + i + u.node.closeTagString(o);
                                    h(r).before(i)
                                } else h(r).before("".concat(u.node.openTagString(h(r).clone().removeAttr("id").get(0)), "<br>").concat(u.node.closeTagString(r)))
                            } else h(r).before("<br>");
                            h(e).remove()
                        }
                    }(t, e, a) : u.cursorLists._startEnter(t) : !c(t) || e || a ? v(t, e, a) : u.cursorLists._middleEnter(t),
                    function r() {
                        u.$el.find(".fr-to-remove").each(function() {
                            for (var e = u.node.contents(this), t = 0; t < e.length; t++) e[t].nodeType === Node.TEXT_NODE && (e[t].textContent = e[t].textContent.replace(/\u200B/g, ""));
                            h(this).replaceWith(this.innerHTML)
                        })
                    }(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore()
            },
            backspace: function E() {
                var e = !1,
                    t = u.markers.insert();
                if (!t) return !0;
                for (var n = t.parentNode; n && !u.node.isElement(n);) {
                    if ("false" === n.getAttribute("contenteditable")) return h(t).replaceWith($e.MARKERS), u.selection.restore(), !1;
                    if (n.innerText.length && "true" === n.getAttribute("contenteditable")) break;
                    n = n.parentNode
                }
                u.el.normalize();
                var a = t.previousSibling;
                if (a) {
                    var r = a.textContent;
                    r && r.length && 8203 === r.charCodeAt(r.length - 1) && (1 === r.length ? h(a).remove() : a.textContent = a.textContent.substr(0, r.length - d(r)))
                }
                return o(t) ? c(t) && g(t, h(t).parents("li").first().get(0)) ? u.cursorLists._backspace(t) : e = f(t) : i(t) ? c(t) && g(t, h(t).parents("li").first().get(0)) ? u.cursorLists._backspace(t) : function l(e) {
                    for (var t = 0 < h(e).parentsUntil(u.$el, "BLOCKQUOTE").length, n = u.node.deepestParent(e, [], !t), a = n; n && !n.previousSibling && "BLOCKQUOTE" !== n.tagName && n.parentElement !== u.el && !u.node.hasClass(n.parentElement, "fr-inner") && $e.SIMPLE_ENTER_TAGS.indexOf(n.parentElement.tagName) < 0;) n = n.parentElement;
                    if (n && "BLOCKQUOTE" === n.tagName) {
                        var r = u.node.deepestParent(e, [h(e).parentsUntil(u.$el, "BLOCKQUOTE").get(0)]);
                        r && r.previousSibling && (a = n = r)
                    }
                    if (null !== n) {
                        var o, i = n.previousSibling;
                        if (u.node.isBlock(n) && u.node.isEditable(n))
                            if (i && $e.NO_DELETE_TAGS.indexOf(i.tagName) < 0) {
                                if (u.node.isDeletable(i)) h(i).remove(), h(e).replaceWith($e.MARKERS);
                                else if (u.node.isEditable(i))
                                    if (u.node.isBlock(i))
                                        if (u.node.isEmpty(i) && !u.node.isList(i)) h(i).remove(), h(e).after(u.opts.keepFormatOnDelete ? $e.INVISIBLE_SPACE : "");
                                        else {
                                            if (u.node.isList(i) && (i = h(i).find("li").last().get(0)), (o = u.node.contents(i)).length && "BR" === o[o.length - 1].tagName && h(o[o.length - 1]).remove(), "BLOCKQUOTE" === i.tagName && "BLOCKQUOTE" !== n.tagName)
                                                for (o = u.node.contents(i); o.length && u.node.isBlock(o[o.length - 1]);) i = o[o.length - 1], o = u.node.contents(i);
                                            else if ("BLOCKQUOTE" !== i.tagName && "BLOCKQUOTE" === a.tagName)
                                                for (o = u.node.contents(a); o.length && u.node.isBlock(o[0]);) a = o[0], o = u.node.contents(a);
                                            if (u.node.isEmpty(n)) h(e).remove(), u.selection.setAtEnd(i, !0);
                                            else {
                                                h(e).replaceWith($e.MARKERS);
                                                var s = i.childNodes;
                                                u.node.isBlock(s[s.length - 1]) ? h(s[s.length - 1]).append(a.innerHTML) : h(i).append(a.innerHTML)
                                            }
                                            h(a).remove(), u.node.isEmpty(n) && h(n).remove()
                                        }
                                else h(e).replaceWith($e.MARKERS), "BLOCKQUOTE" === n.tagName && i.nodeType === Node.ELEMENT_NODE ? h(i).remove() : (h(i).after(u.node.isEmpty(n) ? "" : h(n).html()), h(n).remove(), "BR" === i.tagName && h(i).remove())
                            } else i || (n && "BLOCKQUOTE" === n.tagName && 0 === h(n).text().replace(/\u200B/g, "").length ? h(n).remove() : u.node.isEmpty(n) && n.parentNode && u.node.isEditable(n.parentNode) && n.parentNode != u.el && h(n.parentNode).remove())
                    }
                }(t) : e = f(t), h(t).remove(), p(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists(), u.spaces.normalizeAroundCursor()), u.selection.restore(), e
            },
            del: function a() {
                var e = u.markers.insert();
                if (!e) return !1;
                if (u.el.normalize(), o(e))
                    if (c(e))
                        if (0 === h(e).parents("li").first().find("ul, ol").length) u.cursorLists._del(e);
                        else {
                            var t = h(e).parents("li").first().find("ul, ol").first().find("li").first();
                            (t = t.find(u.html.blockTagsQuery()).get(-1) || t).prepend(e), u.cursorLists._backspace(e)
                        }
                else s(e);
                else i(e), n(e);
                h(e).remove(), p(), u.html.fillEmptyBlocks(!0), u.opts.htmlUntouched || (u.html.cleanEmptyTags(), u.clean.lists()), u.spaces.normalizeAroundCursor(), u.selection.restore()
            },
            isAtEnd: m,
            isAtStart: g
        }
    }, $e.MODULES.data = function(f) {
        function p(e) {
            return e
        }

        function c(e) {
            for (var t = e.toString(), n = 0, a = 0; a < t.length; a++) n += parseInt(t.charAt(a), 10);
            return 10 < n ? n % 9 + 1 : n
        }

        function d(e, t, n) {
            for (var a = Math.abs(n); 0 < a--;) e -= t;
            return n < 0 && (e += 123), e
        }

        function u(e) {
            return e && "block" !== e.css("display") ? (e.remove(), !0) : e && 0 === f.helpers.getPX(e.css("height")) ? (e.remove(), !0) : !(!e || "absolute" !== e.css("position") && "fixed" !== e.css("position") || (e.remove(), 0))
        }

        function h(e) {
            return e && 0 === f.$box.find(e).length
        }

        function g() {
            if (10 < e && (f[p(L("0ppecjvc=="))](), setTimeout(function() {
                    T.FE = null
                }, 10)), !f.$box) return !1;
            f.$wp.prepend(L(p(L(y)))), b = f.$wp.find("> div").first(), E = b.find("> a"), "rtl" === f.opts.direction && b.css("left", "auto").css("right", 0).attr("direction", "rtl"), e++
        }

        function m(e) {
            for (var t = [L("9qqG-7amjlwq=="), L("KA3B3C2A6D1D5H5H1A3=="), L("3B9B3B5F3C4G3E3=="), L("QzbzvxyB2yA-9m=="), L("ji1kacwmgG5bc=="), L("nmA-13aogi1A3c1jd=="), L("BA9ggq=="), L("emznbjbH3fij=="), L("tkC-22d1qC-13sD1wzF-7=="), L("tA3jjf=="), L("1D1brkm==")], n = 0; n < t.length; n++)
                if (String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
                        return (void 0 === t || t > this.length) && (t = this.length), this.substring(t - e.length, t) === e
                    }), e.endsWith(t[n])) return !0;
            return !1
        }

        function v() {
            var e = L(p(n)),
                t = L(p("tzgatD-13eD1dtdrvmF3c1nrC-7saQcdav==")).split(".");
            return window.parent.document.querySelector(e) && window[t[1]][t[2]]
        }

        var b, E, T = f.$,
            A = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2FC1A3NB2IF1HE1TH4WB8eB-11zVG2F3I3yYB5ZG4CB2DA15CC5AD3F1A1KG1oLA10B1A6wQF1H3vgale2C4F4XA2qc2A5D5B3pepmriKB3OE1HD1fUC10pjD-11E-11TB4YJ3bC-16zE-11yc1B2CE2BC3jhjKC1pdA-21OA6C1D5B-8vF4QA11pD6sqf1C3lldA-16BD4A2H3qoEA7bB-16rmNH5H1F1vSB7RE2A3TH4YC5A5b1A4d1B3whepyAC3AA2zknC3mbgf1SC4WH4PD8TC5ZB2C3H3jb2A5ZA2EF2aoFC5qqHC4B1H1zeGA7UA5RF4TA29TA6ZC4d1C3hyWA10A3rBB2E3decorationRD3QC10UD3E6E6ZD2F3F3fme2E5uxxrEC9C3E4fB-11azhHB1LD7D6VF4VVTPC6b1C4TYG3qzDD6B3B3AH4I2H2kxbHE1JD1yihfd1QD6WB1D4mhrc1B5rvFG3A14A7cDA2OC1AA1JB5zC-16KA6WB4C-8wvlTB5A5lkZB2C2C7zynBD2D2bI-7C-21d1HE2cubyvPC8A6VB3aroxxZE4C4F4e1I2BE1WjdifH1H4A14NA1GB1YG-10tWA3A14A9sVA2C5XH2A29b2A6gsleGG2jaED2D-13fhE1OA8NjwytyTD4e1sc1D-16ZC3B5C-9e1C2FB6EFF5B2C2JH4E1C2tdLE5A3UG4G-7b2D3B4fA-9oh1G3kqvB4AG3ibnjcAC6D2B1cDA9KC2QA6bRC4VA30RB8hYB2A4A-8h1A21A2B2==",
            C = "7D4YH4fkhHB3pqDC3H2E1fkMD1IB1NF1D3QD9wB5rxqlh1A8c2B4ZA3FD2AA6FB5EB3jJG4D2J-7aC-21GB6PC5RE4TC11QD6XC4XE3XH3mlvnqjbaOA2OC2BE6A1fmI-7ujwbc1G5f1F3e1C11mXF4owBG3E1yD1E4F1D2D-8B-8C-7yC-22HD1MF5UE4cWA3D8D6a1B2C3H3a3I3sZA4B3A2akfwEB3xHD5D1F1wIC11pA-16xdxtVI2C9A6YC4a1A2F3B2GA6B4C3lsjyJB1eMA1D-11MF5PE4ja1D3D7byrf1C3e1C7D-16lwqAF3H2A1B-21wNE1MA1OG1HB2A-16tSE5UD4RB3icRA4F-10wtwzBB3E1C3CC2DA8LA2LA1EB1kdH-8uVB7decorg1J2B7B6qjrqGI2J1C6ijehIB1hkemC-13hqkrH4H-7QD6XF5XF3HLNAC3CB2aD2CD2KB10B4ycg1A-8KA4H4B11jVB5TC4yqpB-21pd1E4pedzGB6MD5B3ncB-7MA4LD2JB6PD5uH-8TB9C7YD5XD2E3I3jmiDB3zeimhLD8E2F2JC1H-9ivkPC5lG-10SB1D3H3A-21rc1A3d1E3fsdqwfGA2KA1OrC-22LA6D1B4afUB16SC7AitC-8qYA11fsxcajGA15avjNE2A-9h1hDB16B9tPC1C5F5UC1G3B8d2A5d1D4RnHJ3C3JB5D3ucMG1yzD-17hafjC-8VD3yWC6e1YD2H3ZE2C8C5oBA3H3D2vFA4WzJC4C2i1A-65fNB8afWA1H4A26mvkC-13ZB3E3h1A21BC4eFB2GD2AA5ghqND2A2B2==",
            n = "MekC-11nB-8tIzpD7pewxvzC6mD-16xerg1==",
            S = "AA15A8B6C4B5A2E2B3B1A7==",
            y = "sC-7OB2fwhVC4vsG-7ohPA4ZD4D-8f1J3stzB-11bFE2EE1MA2ND1KD1IE4cA-21pSD2D5ve1G3h1A8b1E5ZC3CD2FA16mC5OC5E1hpnG1NA10B1D7hkUD4I-7b2C3C5nXD2E3F3whidEC2EH3GI2mJE2E2bxci1WA10VC7pllSG2F3A7xd1A4ZC3DB2aaeGA2DE4H2E1j1ywD-13FD1A3VE4WA3D8C6wuc1A2hf1B5B7vnrrjA1B9ic1mpbD1oMB1iSB7rWC4RI4G-7upB6jd1A2F3H2EA4FD3kDF4A2moc1anJD1TD4VI4b2C7oeQF4c1E3XC7ZA3C3G3uDB2wGB6D1JC4D1JD4C1hTE6QC5pH4pD3C-22D7c1A3textAA4gdlB2mpozkmhNC1mrxA3yWA5edhg1I2H3B7ozgmvAI3I2B5GD1LD2RSNH1KA1XA5SB4PA3sA9tlmC-9tnf1G3nd1coBH4I2I2JC3C-16LE6A1tnUA3vbwQB1G3f1A20a3A8a1C6pxAB2eniuE1F3kH2lnjB2hB-16XA5PF1G4zwtYA5B-11mzTG2B9pHB3BE2hGH3B3B2cMD5C1F1wzPA8E7VG5H5vD3H-7C8tyvsVF2I1G2A5fE3bg1mgajoyxMA4fhuzSD8aQB2B4g1A20ukb1A4B3F3GG2CujjanIC1ObiB11SD1C5pWC1D4YB8YE5FE-11jXE2F-7jB4CC2G-10uLH4E1C2tA-13yjUH5d1H1A7sWD5E4hmjF-7pykafoGA16hDD4joyD-8OA33B3C2tC7cRE4SA31a1B8d1e2A4F4g1A2A22CC5zwlAC2C1A12==",
            R = function() {
                for (var e = 0, t = document.domain, n = t.split("."), a = "_gd".concat((new Date).getTime()); e < n.length - 1 && -1 === document.cookie.indexOf("".concat(a, "=").concat(a));) t = n.slice(-1 - ++e).join("."), document.cookie = "".concat(a, "=").concat(a, ";domain=").concat(t, ";");
                return document.cookie = "".concat(a, "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=").concat(t, ";"), (t || "").replace(/(^\.*)|(\.*$)/g, "")
            }(),
            L = p(function w(e) {
                if (!e) return e;
                for (var t = "", n = p("charCodeAt"), a = p("fromCharCode"), r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".indexOf(e[0]), o = 1; o < e.length - 2; o++) {
                    for (var i = c(++r), s = e[n](o), l = "";
                        /[0-9-]/.test(e[o + 1]);) l += e[++o];
                    s = d(s, i, l = parseInt(l, 10) || 0), s ^= r - 1 & 31, t += String[a](s)
                }
                return t
            }),
            e = 0;
        return {
            _init: function _() {
                var e = f.opts.key || [""],
                    t = L(p("ziRA1E3B9pA5B-11D-11xg1A3ZB5D1D4B-11ED2EG2pdeoC1clIH4wB-22yQD5uF4YE3E3A9=="));
                "string" == typeof e && (e = [e]);
                for (var n, a, r, o = !(f.ul = !0), i = 0, s = 0; s < e.length; s++) {
                    var l = (a = e[s], 4 === (r = (L(a) || "").split("|")).length && "V3" === r[0] ? [r[1], r[3], r[2]] : [null, null, ""]),
                        c = l[2];
                    if (c === L(p(L("LGnD1KNZf1CPBYCAZB-8F3UDSLLSG1VFf1A3C2=="))) || 0 <= c.indexOf(R, c.length - R.length) || m(R) || v()) {
                        if (null !== (n = l[1]) && !(0 == n.indexOf("TRIAL") ? (n = new Date(n.replace(/TRIAL/, "")), new Date(n) < new Date && (A = C, 1)) : new Date(n) < new Date(L(S))) || !(0 < (R || "").length) || m(R) || v()) {
                            f.ul = !1;
                            break
                        }
                        o = !0, y = A, i = l[0] || -1
                    }
                }
                var d = new Image;
                !0 === f.ul && (g(), d.src = o ? "".concat(p(L(t)), "e=").concat(i) : "".concat(p(L(t)), "u")), !0 === f.ul && (f.events.on("contentChanged", function() {
                    (function e() {
                        return u(b) || u(E) || h(b) || h(E)
                    })() && g()
                }), f.events.on("html.get", function(e) {
                    return e + L("qD2H-9G3ioD-17qA1tE1B-8qI3A4hA-13C-11E2C1njfldD1E6pg1C-8sC3hfbkcD2G3stC-22gqgB3G2B-7vtoA4nweeD1A31A15B9uC-16A1F5dkykdc1B8dE-11bA3F2D3A9gd1E7F2tlI-8H-7vtxB2A5B2C3B2F2B5A6ldbyC4iqC-22D-17E-13mA3D2dywiB3oxlvfC1H4C2TjqbzlnI3ntB4E3qA2zaqsC6D3pmnkoE3C6D5wvuE3bwifdhB6hch1E4xibD-17dmrC1rG-7pntnF6nB-8F1D2A11C8plrkmF2F3MC-16bocqA2WwA-21ayeA1C4d1isC-22rD-13D6DfjpjtC2E6hB2G2G4A-7D2==")
                })), f.events.on("html.set", function() {
                    var e = f.el.querySelector('[data-f-id="pbf"]');
                    e && T(e).remove()
                }), f.events.on("destroy", function() {
                    b && b.length && b.remove()
                }, !0)
            }
        }
    }, $e.MODULES.edit = function(t) {
        function e() {
            if (t.browser.mozilla) try {
                t.doc.execCommand("enableObjectResizing", !1, "false"), t.doc.execCommand("enableInlineTableEditing", !1, "false")
            } catch (e) {}
            if (t.browser.msie) try {
                t.doc.body.addEventListener("mscontrolselect", function(e) {
                    return e.srcElement.focus(), !1
                })
            } catch (e) {}
        }

        var n = !1;

        function a() {
            return n
        }

        return {
            _init: function r() {
                t.events.on("focus", function() {
                    a() ? t.edit.off() : t.edit.on()
                })
            },
            on: function o() {
                t.$wp ? (t.$el.attr("contenteditable", !0), t.$el.removeClass("fr-disabled").attr("aria-disabled", !1), e()) : t.$el.is("a") && t.$el.attr("contenteditable", !0), t.events.trigger("edit.on", [], !0), n = !1
            },
            off: function i() {
                t.events.disableBlur(), t.$wp ? (t.$el.attr("contenteditable", !1), t.$el.addClass("fr-disabled").attr("aria-disabled", !0)) : t.$el.is("a") && t.$el.attr("contenteditable", !1), t.events.trigger("edit.off"), t.events.enableBlur(), n = !0
            },
            disableDesign: e,
            isDisabled: a
        }
    }, $e.MODULES.format = function(b) {
        var E = b.$;

        function f(e, t) {
            var n = "<".concat(e);
            for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (n += " ".concat(a, '="').concat(t[a], '"'));
            return n += ">"
        }

        function T(e, t) {
            var n = e;
            for (var a in t) Object.prototype.hasOwnProperty.call(t, a) && (n += "id" === a ? "#".concat(t[a]) : "class" === a ? ".".concat(t[a]) : "[".concat(a, '="').concat(t[a], '"]'));
            return n
        }

        function A(e, t) {
            return !(!e || e.nodeType !== Node.ELEMENT_NODE) && (e.matches || e.matchesSelector || e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.oMatchesSelector).call(e, t)
        }

        function m(e, t, n) {
            if (e) {
                for (; e.nodeType === Node.COMMENT_NODE;) e = e.nextSibling;
                if (e) {
                    if (b.node.isBlock(e) && "HR" !== e.tagName) return b.node.hasClass(e.firstChild, "fr-marker") ? m(e.firstChild.nextSibling, t, n) : m(e.firstChild, t, n), !1;
                    var a = E(b.doc.createElement(t));
                    a.attr(n), a.insertBefore(e);
                    for (var r = e; r && !E(r).is(".fr-marker") && 0 === E(r).find(".fr-marker").length && "UL" !== r.tagName && "OL" !== r.tagName;) {
                        var o = r;
                        if (b.node.isBlock(r) && "HR" !== e.tagName) return m(r.firstChild, t, n), !1;
                        r = r.nextSibling, a.append(o)
                    }
                    if (r) {
                        if (E(r).find(".fr-marker").length || "UL" === r.tagName || "OL" === r.tagName) m(r.firstChild, t, n);
                        else if (b.browser.mozilla && b.node.hasClass(r, "fr-marker")) {
                            var i, s = b.selection.blocks(),
                                l = s.length;
                            for (i = 0; i < l; i++) s[i] != r.parentNode && s[i].childNodes.length && s[i].childNodes[0] != r.parentNode && (r = s[i].childNodes[1] || s[i].childNodes[0], (a = E(f(t, n)).insertBefore(r)).append(r))
                        }
                    } else {
                        for (var c = a.get(0).parentNode; c && !c.nextSibling && !b.node.isElement(c);) c = c.parentNode;
                        if (c) {
                            var d = c.nextSibling;
                            d && (b.node.isBlock(d) ? "HR" === d.tagName ? m(d.nextSibling, t, n) : m(d.firstChild, t, n) : m(d, t, n))
                        }
                    }
                    a.is(":empty") && a.remove()
                }
            }
        }

        function n(e, t) {
            var n;
            if (void 0 === t && (t = {}), t.style && delete t.style, b.selection.isCollapsed()) {
                b.markers.insert(), b.$el.find(".fr-marker").replaceWith(f(e, t) + $e.INVISIBLE_SPACE + $e.MARKERS + function i(e) {
                    return "</".concat(e, ">")
                }(e)), b.selection.restore()
            } else {
                var a;
                b.selection.save(), m(b.$el.find('.fr-marker[data-type="true"]').length && b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling, e, t);
                do {
                    for (a = b.$el.find("".concat(T(e, t), " > ").concat(T(e, t))), n = 0; n < a.length; n++) a[n].outerHTML = a[n].innerHTML
                } while (a.length);
                b.el.normalize();
                var r = b.el.querySelectorAll(".fr-marker");
                for (n = 0; n < r.length; n++) {
                    var o = E(r[n]);
                    !0 === o.data("type") ? A(o.get(0).nextSibling, T(e, t)) && o.next().prepend(o) : A(o.get(0).previousSibling, T(e, t)) && o.prev().append(o)
                }
                b.selection.restore()
            }
        }

        function C(e, t, n, a) {
            if (!a) {
                var r = !1;
                if (!0 === e.data("type"))
                    for (; b.node.isFirstSibling(e.get(0)) && !e.parent().is(b.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().before(e), r = !0;
                else if (!1 === e.data("type"))
                    for (; b.node.isLastSibling(e.get(0)) && !e.parent().is(b.$el) && !e.parent().is("ol") && !e.parent().is("ul");) e.parent().after(e), r = !0;
                if (r) return !0
            }
            if (e.parents(t).length || void 0 === t) {
                var o, i = "",
                    s = "",
                    l = e.parent();
                if (l.is(b.$el) || b.node.isBlock(l.get(0))) return !1;
                for (; !(b.node.isBlock(l.parent().get(0)) || void 0 !== t && A(l.get(0), T(t, n)));) i += b.node.closeTagString(l.get(0)), s = b.node.openTagString(l.get(0)) + s, l = l.parent();
                var c = e.get(0).outerHTML;
                return e.replaceWith('<span id="mark"></span>'), o = l.html().replace(/<span id="mark"><\/span>/, i + b.node.closeTagString(l.get(0)) + s + c + i + b.node.openTagString(l.get(0)) + s), l.replaceWith(b.node.openTagString(l.get(0)) + o + b.node.closeTagString(l.get(0))), !0
            }
            return !1
        }

        function a(e, t) {
            void 0 === t && (t = {}), t.style && delete t.style;
            var n = b.selection.isCollapsed();
            b.selection.save();
            for (var a = !0; a;) {
                a = !1;
                for (var r = b.$el.find(".fr-marker"), o = 0; o < r.length; o++) {
                    var i = E(r[o]),
                        s = null;
                    if (i.attr("data-cloned") || n || (s = i.clone().removeClass("fr-marker").addClass("fr-clone"), i.data("type") && "true" === i.data("type").toString() ? i.attr("data-cloned", !0).after(s) : i.attr("data-cloned", !0).before(s)), C(i, e, t, n)) {
                        a = !0;
                        break
                    }
                }
            }! function m(e, t, n, a) {
                for (var r = b.node.contents(e.get(0)), o = 0; o < r.length; o++) {
                    var i = r[o];
                    if (i.innerHTML && 8203 == i.innerHTML.charCodeAt() && i.tagName.toLocaleLowerCase() == n && (i.outerHTML = i.innerHTML), b.node.hasClass(i, "fr-marker")) t = (t + 1) % 2;
                    else if (t)
                        if (0 < E(i).find(".fr-marker").length) t = m(E(i), t, n, a);
                        else {
                            for (var s = E(i).find(n || "*:not(br)"), l = s.length - 1; 0 <= l; l--) {
                                var c = s[l];
                                b.node.isBlock(c) || b.node.isVoid(c) || void 0 !== n && !A(c, T(n, a)) ? b.node.isBlock(c) && void 0 === n && "TABLE" !== i.tagName && b.node.clearAttributes(c) : b.node.hasClass(c, "fr-clone") || (c.outerHTML = c.innerHTML)
                            }
                            void 0 === n && i.nodeType === Node.ELEMENT_NODE && !b.node.isVoid(i) || A(i, T(n, a)) ? b.node.isBlock(i) || b.node.hasClass(i, "fr-clone") || (i.outerHTML = i.innerHTML) : void 0 === n && i.nodeType === Node.ELEMENT_NODE && b.node.isBlock(i) && "TABLE" !== i.tagName && b.node.clearAttributes(i)
                        }
                    else 0 < E(i).find(".fr-marker").length && (t = m(E(i), t, n, a))
                }
                return t
            }(b.$el, 0, e, t), n || (b.$el.find(".fr-marker").remove(), b.$el.find(".fr-clone").removeClass("fr-clone").addClass("fr-marker")), n && b.$el.find(".fr-marker").before($e.INVISIBLE_SPACE).after($e.INVISIBLE_SPACE), b.html.cleanEmptyTags(), b.el.normalize(), b.selection.restore();
            var l = b.win.getSelection() && b.win.getSelection().anchorNode;
            if (l) {
                var c = b.node.blockParent(l),
                    d = !!l.textContent.replace(/\u200B/g, "").length,
                    f = b.win.getSelection().getRangeAt(0),
                    p = f.startOffset,
                    u = f.endOffset;
                b.selection.text().replace(/\u200B/g, "").length || function v(e, t) {
                    if (e && t) {
                        if (e.isSameNode(t) ? e.textContent = e.textContent.replace(/\u200B(?=.*\u200B)/g, "") : e.nodeType === Node.TEXT_NODE && (e.textContent = e.textContent.replace(/\u200B/g, "")), !e.childNodes.length) return !1;
                        Array.isArray(e.childNodes) && e.childNodes.forEach(function(e) {
                            v(e, t)
                        })
                    }
                }(c, l);
                var h = b.win.getSelection().getRangeAt(0);
                if (l.nodeType === Node.TEXT_NODE && (!d || !b.selection.text().length && p === u)) {
                    var g = l.textContent.search(/\u200B/g) + 1;
                    h.setStart(l, g), h.setEnd(l, g)
                }
            }
        }

        function t(e, t) {
            var n, a, r, o, i, s = null;
            if (b.selection.isCollapsed()) {
                b.markers.insert();
                var l = (a = b.$el.find(".fr-marker")).parent();
                if (b.node.openTagString(l.get(0)) === '<span style="'.concat(e, ": ").concat(l.css(e), ';">')) {
                    if (b.node.isEmpty(l.get(0))) s = E(b.doc.createElement("span")).attr("style", "".concat(e, ": ").concat(t, ";")).html("".concat($e.INVISIBLE_SPACE).concat($e.MARKERS)), l.replaceWith(s);
                    else {
                        var c = {};
                        c["style*"] = "".concat(e, ":"), C(a, "span", c, !0), a = b.$el.find(".fr-marker"), t ? (s = E(b.doc.createElement("span")).attr("style", "".concat(e, ": ").concat(t, ";")).html("".concat($e.INVISIBLE_SPACE).concat($e.MARKERS)), a.replaceWith(s)) : a.replaceWith($e.INVISIBLE_SPACE + $e.MARKERS)
                    }
                    b.html.cleanEmptyTags()
                } else b.node.isEmpty(l.get(0)) && l.is("span") ? (a.replaceWith($e.MARKERS), l.css(e, t)) : (s = E('<span style="'.concat(e, ": ").concat(t, ';">').concat($e.INVISIBLE_SPACE).concat($e.MARKERS, "</span>")), a.replaceWith(s));
                s && v(s, e, t)
            } else {
                if (b.selection.save(), null === t || "color" === e && 0 < b.$el.find(".fr-marker").parents("u, a").length) {
                    var d = b.$el.find(".fr-marker");
                    for (n = 0; n < d.length; n++)
                        if (!0 === (a = E(d[n])).data("type") || "true" === a.data("type"))
                            for (; b.node.isFirstSibling(a.get(0)) && !a.parent().is(b.$el) && !b.node.isElement(a.parent().get(0)) && !b.node.isBlock(a.parent().get(0));) a.parent().before(a);
                        else
                            for (; b.node.isLastSibling(a.get(0)) && !a.parent().is(b.$el) && !b.node.isElement(a.parent().get(0)) && !b.node.isBlock(a.parent().get(0));) a.parent().after(a)
                }
                for (var f = b.$el.find('.fr-marker[data-type="true"]').get(0).nextSibling; f.firstChild;) f = f.firstChild;
                var p = { "class": "fr-unprocessed" };
                for (t && (p.style = "".concat(e, ": ").concat(t, ";")), m(f, "span", p), b.$el.find(".fr-marker + .fr-unprocessed").each(function() {
                        E(this).prepend(E(this).prev())
                    }), b.$el.find(".fr-unprocessed + .fr-marker").each(function() {
                        E(this).prev().append(E(this))
                    }), (t || "").match(/\dem$/) && b.$el.find("span.fr-unprocessed").removeClass("fr-unprocessed"); 0 < b.$el.find("span.fr-unprocessed").length;) {
                    if ((s = b.$el.find("span.fr-unprocessed").first().removeClass("fr-unprocessed")).parent().get(0).normalize(), s.parent().is("span") && 1 === s.parent().get(0).childNodes.length) {
                        s.parent().css(e, t);
                        var u = s;
                        s = s.parent(), u.replaceWith(u.html())
                    }
                    var h = s.find("span");
                    for (n = h.length - 1; 0 <= n; n--) r = h[n], o = e, i = void 0, (i = E(r)).css(o, ""), "" === i.attr("style") && i.replaceWith(i.html());
                    v(s, e, t)
                }
            }! function g() {
                var e;
                for (; 0 < b.$el.find(".fr-split:empty").length;) b.$el.find(".fr-split:empty").remove();
                b.$el.find(".fr-split").removeClass("fr-split"), b.$el.find('[style=""]').removeAttr("style"), b.$el.find('[class=""]').removeAttr("class"), b.html.cleanEmptyTags();
                for (var t = b.$el.find("span"), n = t.length - 1; 0 <= n; n--) {
                    var a = t[n];
                    a.attributes && 0 !== a.attributes.length || E(a).replaceWith(a.innerHTML)
                }
                b.el.normalize();
                var r = b.$el.find("span[style] + span[style]");
                for (e = 0; e < r.length; e++) {
                    var o = E(r[e]),
                        i = E(r[e]).prev();
                    o.get(0).previousSibling === i.get(0) && b.node.openTagString(o.get(0)) === b.node.openTagString(i.get(0)) && (o.prepend(i.html()), i.remove())
                }
                b.$el.find("span[style] span[style]").each(function() {
                    if (0 <= E(this).attr("style").indexOf("font-size")) {
                        var e = E(this).parents("span[style]");
                        0 <= e.attr("style").indexOf("background-color") && (E(this).attr("style", "".concat(E(this).attr("style"), ";").concat(e.attr("style"))), C(E(this), "span[style]", {}, !1))
                    }
                }), b.el.normalize(), b.selection.restore()
            }()
        }

        function v(e, t, n) {
            var a, r, o, i = e.parentsUntil(b.$el, "span[style]"),
                s = [];
            for (a = i.length - 1; 0 <= a; a--) r = i[a], o = t, 0 === E(r).attr("style").indexOf("".concat(o, ":")) || 0 <= E(r).attr("style").indexOf(";".concat(o, ":")) || 0 <= E(r).attr("style").indexOf("; ".concat(o, ":")) || s.push(i[a]);
            if ((i = i.not(s)).length) {
                for (var l = "", c = "", d = "", f = "", p = e.get(0); p = p.parentNode, E(p).addClass("fr-split"), l += b.node.closeTagString(p), c = b.node.openTagString(E(p).clone().addClass("fr-split").get(0)) + c, i.get(0) !== p && (d += b.node.closeTagString(p), f = b.node.openTagString(E(p).clone().addClass("fr-split").get(0)) + f), i.get(0) !== p;);
                var u = "".concat(l + b.node.openTagString(E(i.get(0)).clone().css(t, n || "").get(0)) + f + e.css(t, "").get(0).outerHTML + d, "</span>").concat(c);
                e.replaceWith('<span id="fr-break"></span>');
                var h = i.get(0).outerHTML;
                E(i.get(0)).replaceWith(h.replace(/<span id="fr-break"><\/span>/g, function() {
                    return u
                }))
            }
        }

        function r(e, t) {
            void 0 === t && (t = {}), t.style && delete t.style;
            var n = b.selection.ranges(0),
                a = n.startContainer;
            if (a.nodeType === Node.ELEMENT_NODE && 0 < a.childNodes.length && a.childNodes[n.startOffset] && (a = a.childNodes[n.startOffset]), !n.collapsed && a.nodeType === Node.TEXT_NODE && n.startOffset === (a.textContent || "").length) {
                for (; !b.node.isBlock(a.parentNode) && !a.nextSibling;) a = a.parentNode;
                a.nextSibling && (a = a.nextSibling)
            }
            for (var r = a; r && r.nodeType === Node.ELEMENT_NODE && !A(r, T(e, t));) r = r.firstChild;
            if (r && r.nodeType === Node.ELEMENT_NODE && A(r, T(e, t))) return !0;
            var o = a;
            for (o && o.nodeType !== Node.ELEMENT_NODE && (o = o.parentNode); o && o.nodeType === Node.ELEMENT_NODE && o !== b.el && !A(o, T(e, t));) o = o.parentNode;
            return !(!o || o.nodeType !== Node.ELEMENT_NODE || o === b.el || !A(o, T(e, t)))
        }

        return {
            is: r,
            toggle: function o(e, t) {
                r(e, t) ? a(e, t) : n(e, t)
            },
            apply: n,
            remove: a,
            applyStyle: t,
            removeStyle: function i(e) {
                t(e, null)
            }
        }
    }, $e.MODULES.spaces = function(c) {
        function a(e, t) {
            var n = e.previousSibling,
                a = e.nextSibling,
                r = e.textContent,
                o = e.parentNode,
                i = [$e.ENTER_P, $e.ENTER_DIV, $e.ENTER_BR];
            if (!c.html.isPreformatted(o)) {
                t && (r = r.replace(/[\f\n\r\t\v ]{2,}/g, " "), a && "BR" !== a.tagName && !c.node.isBlock(a) || !(c.node.isBlock(o) || c.node.isLink(o) && !o.nextSibling || c.node.isElement(o)) || (r = r.replace(/[\f\n\r\t\v ]{1,}$/g, "")), n && "BR" !== n.tagName && !c.node.isBlock(n) || !(c.node.isBlock(o) || c.node.isLink(o) && !o.previousSibling || c.node.isElement(o)) || (r = r.replace(/^[\f\n\r\t\v ]{1,}/g, "")), (c.node.isBlock(a) || c.node.isBlock(n)) && (r = r.replace(/^[\f\n\r\t\v ]{1,}/g, "")), " " === r && (n && c.node.isVoid(n) || a && c.node.isVoid(a)) && !(n && a && c.node.isVoid(n) || a && n && c.node.isVoid(a)) && (r = "")), (!n && c.node.isBlock(a) || !a && c.node.isBlock(n)) && c.node.isBlock(o) && o !== c.el && (r = r.replace(/^[\f\n\r\t\v ]{1,}/g, "")), t || (r = r.replace(new RegExp($e.UNICODE_NBSP, "g"), " "));
                for (var s = "", l = 0; l < r.length; l++) 32 != r.charCodeAt(l) || 0 !== l && 32 != s.charCodeAt(l - 1) || (c.opts.enter !== $e.ENTER_BR && c.opts.enter !== $e.ENTER_DIV || !(n && "BR" === n.tagName || a && "BR" === a.tagName)) && (n && a && c.node.isVoid(n) || n && a && c.node.isVoid(a)) ? s += r[l] : s += $e.UNICODE_NBSP;
                (!a || a && c.node.isBlock(a) || a && a.nodeType === Node.ELEMENT_NODE && c.win.getComputedStyle(a) && "block" === c.win.getComputedStyle(a).display) && (!c.node.isVoid(n) || n && -1 !== ["P", "DIV", "BR"].indexOf(n.tagName) && -1 !== i.indexOf(c.opts.enter)) && (s = s.replace(/ $/, $e.UNICODE_NBSP)), !n || c.node.isVoid(n) || c.node.isBlock(n) || 1 !== (s = s.replace(/^\u00A0([^ $])/, " $1")).length || 160 !== s.charCodeAt(0) || !a || c.node.isVoid(a) || c.node.isBlock(a) || c.node.hasClass(n, "fr-marker") && c.node.hasClass(a, "fr-marker") || (s = " "), t || (s = s.replace(/([^ \u00A0])\u00A0([^ \u00A0])/g, "$1 $2")), e.textContent !== s && (e.textContent = s)
            }
        }

        function l(e, t) {
            if (void 0 !== e && e || (e = c.el), void 0 === t && (t = !1), !e.getAttribute || "false" !== e.getAttribute("contenteditable"))
                if (e.nodeType === Node.TEXT_NODE) a(e, t);
                else if (e.nodeType === Node.ELEMENT_NODE)
                for (var n = c.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, c.node.filter(function(e) {
                        for (var t = e.parentNode; t && t !== c.el;) {
                            if ("STYLE" === t.tagName || "IFRAME" === t.tagName) return !1;
                            if ("PRE" === t.tagName) return !1;
                            t = t.parentNode
                        }
                        return null !== e.textContent.match(/([ \u00A0\f\n\r\t\v]{2,})|(^[ \u00A0\f\n\r\t\v]{1,})|([ \u00A0\f\n\r\t\v]{1,}$)/g) && !c.node.hasClass(e.parentNode, "fr-marker")
                    }), !1); n.nextNode();) a(n.currentNode, t)
        }

        return {
            normalize: l,
            normalizeAroundCursor: function d() {
                for (var e = [], t = c.el.querySelectorAll(".fr-marker"), n = 0; n < t.length; n++) {
                    for (var a = null, r = c.node.blockParent(t[n]), o = (a = r || t[n]).nextSibling, i = a.previousSibling; o && "BR" === o.tagName;) o = o.nextSibling;
                    for (; i && "BR" === i.tagName;) i = i.previousSibling;
                    a && e.indexOf(a) < 0 && e.push(a), i && e.indexOf(i) < 0 && e.push(i), o && e.indexOf(o) < 0 && e.push(o)
                }
                for (var s = 0; s < e.length; s++) l(e[s])
            }
        }
    }, $e.START_MARKER = '<span class="fr-marker" data-id="0" data-type="true" style="display: none; line-height: 0;">'.concat($e.INVISIBLE_SPACE = "&#8203;", "</span>"), $e.END_MARKER = '<span class="fr-marker" data-id="0" data-type="false" style="display: none; line-height: 0;">'.concat($e.INVISIBLE_SPACE, "</span>"), $e.MARKERS = $e.START_MARKER + $e.END_MARKER, $e.MODULES.markers = function(d) {
        var f = d.$;

        function l() {
            if (!d.$wp) return null;
            try {
                var e = d.selection.ranges(0),
                    t = e.commonAncestorContainer;
                if (t !== d.el && !d.$el.contains(t)) return null;
                var n = e.cloneRange(),
                    a = e.cloneRange();
                n.collapse(!0);
                var r = f(d.doc.createElement("SPAN")).addClass("fr-marker").attr("style", "display: none; line-height: 0;").html($e.INVISIBLE_SPACE).get(0);
                if (n.insertNode(r), r = d.$el.find("span.fr-marker").get(0)) {
                    for (var o = r.nextSibling; o && o.nodeType === Node.TEXT_NODE && 0 === o.textContent.length;) f(o).remove(), o = d.$el.find("span.fr-marker").get(0).nextSibling;
                    return d.selection.clear(), d.selection.get().addRange(a), r
                }
                return null
            } catch (i) {}
        }

        function c() {
            d.$el.find(".fr-marker").remove()
        }

        return {
            place: function p(e, t, n) {
                var a, r, o;
                try {
                    var i = e.cloneRange();
                    if (i.collapse(t), i.insertNode(function l(e, t) {
                            var n = f(d.doc.createElement("SPAN"));
                            return n.addClass("fr-marker").attr("data-id", t).attr("data-type", e).attr("style", "display: ".concat(d.browser.safari ? "none" : "inline-block", "; line-height: 0;")).html($e.INVISIBLE_SPACE), n.get(0)
                        }(t, n)), !0 === t)
                        for (o = (a = d.$el.find('span.fr-marker[data-type="true"][data-id="'.concat(n, '"]')).get(0)).nextSibling; o && o.nodeType === Node.TEXT_NODE && 0 === o.textContent.length;) f(o).remove(), o = a.nextSibling;
                    if (!0 === t && !e.collapsed) {
                        for (; !d.node.isElement(a.parentNode) && !o;) f(a.parentNode).after(a), o = a.nextSibling;
                        if (o && o.nodeType === Node.ELEMENT_NODE && d.node.isBlock(o) && "HR" !== o.tagName) {
                            for (r = [o]; o = r[0], (r = d.node.contents(o))[0] && d.node.isBlock(r[0]););
                            f(o).prepend(f(a))
                        }
                    }
                    if (!1 === t && !e.collapsed) {
                        if ((o = (a = d.$el.find('span.fr-marker[data-type="false"][data-id="'.concat(n, '"]')).get(0)).previousSibling) && o.nodeType === Node.ELEMENT_NODE && d.node.isBlock(o) && "HR" !== o.tagName) {
                            for (r = [o]; o = r[r.length - 1], (r = d.node.contents(o))[r.length - 1] && d.node.isBlock(r[r.length - 1]););
                            f(o).append(f(a))
                        }
                        (a.parentNode && 0 <= ["TD", "TH"].indexOf(a.parentNode.tagName) || !a.previousSibling && d.node.isBlock(a.parentElement)) && a.parentNode.previousSibling && !a.previousSibling && f(a.parentNode.previousSibling).append(a)
                    }
                    var s = d.$el.find('span.fr-marker[data-type="'.concat(t, '"][data-id="').concat(n, '"]')).get(0);
                    return s && (s.style.display = "none"), s
                } catch (c) {
                    return null
                }
            },
            insert: l,
            split: function i() {
                d.selection.isCollapsed() || d.selection.remove();
                var e = d.$el.find(".fr-marker").get(0);
                if (e || (e = l()), !e) return null;
                var t = d.node.deepestParent(e);
                if (t || (t = d.node.blockParent(e)) && "LI" !== t.tagName && (t = null), t)
                    if (d.node.isBlock(t) && d.node.isEmpty(t)) "LI" !== t.tagName || t.parentNode.firstElementChild !== t || d.node.isEmpty(t.parentNode) ? f(t).replaceWith('<span class="fr-marker"></span>') : f(t).append('<span class="fr-marker"></span>');
                    else if (d.cursor.isAtStart(e, t)) f(t).before('<span class="fr-marker"></span>'), f(e).remove();
                else if (d.cursor.isAtEnd(e, t)) f(t).after('<span class="fr-marker"></span>'), f(e).remove();
                else {
                    for (var n = e, a = "", r = ""; n = n.parentNode, a += d.node.closeTagString(n), r = d.node.openTagString(n) + r, n !== t;);
                    f(e).replaceWith('<span id="fr-break"></span>');
                    var o = d.node.openTagString(t) + f(t).html() + d.node.closeTagString(t);
                    o = o.replace(/<span id="fr-break"><\/span>/g, "".concat(a, '<span class="fr-marker"></span>').concat(r)), f(t).replaceWith(o)
                }
                return d.$el.find(".fr-marker").get(0)
            },
            insertAtPoint: function u(e) {
                var t, n = e.clientX,
                    a = e.clientY;
                c();
                var r = null;
                if ("undefined" != typeof d.doc.caretPositionFromPoint ? (t = d.doc.caretPositionFromPoint(n, a), (r = d.doc.createRange()).setStart(t.offsetNode, t.offset), r.setEnd(t.offsetNode, t.offset)) : "undefined" != typeof d.doc.caretRangeFromPoint && (t = d.doc.caretRangeFromPoint(n, a), (r = d.doc.createRange()).setStart(t.startContainer, t.startOffset), r.setEnd(t.startContainer, t.startOffset)), null !== r && "undefined" != typeof d.win.getSelection) {
                    var o = d.win.getSelection();
                    o.removeAllRanges(), o.addRange(r)
                } else if ("undefined" != typeof d.doc.body.createTextRange) try {
                    (r = d.doc.body.createTextRange()).moveToPoint(n, a);
                    var i = r.duplicate();
                    i.moveToPoint(n, a), r.setEndPoint("EndToEnd", i), r.select()
                } catch (s) {
                    return !1
                }
                l()
            },
            remove: c
        }
    }, $e.MODULES.selection = function(A) {
        var C = A.$;

        function s() {
            var e = "";
            return A.win.getSelection ? e = A.win.getSelection() : A.doc.getSelection ? e = A.doc.getSelection() : A.doc.selection && (e = A.doc.selection.createRange().text), e.toString()
        }

        function T() {
            return A.win.getSelection ? A.win.getSelection() : A.doc.getSelection ? A.doc.getSelection() : A.doc.selection.createRange()
        }

        function d(e) {
            var t = T(),
                n = [];
            if (t && t.getRangeAt && t.rangeCount) {
                n = [];
                for (var a = 0; a < t.rangeCount; a++) n.push(t.getRangeAt(a))
            } else n = A.doc.createRange ? [A.doc.createRange()] : [];
            return void 0 !== e ? n[e] : n
        }

        function S() {
            var e = T();
            try {
                e.removeAllRanges ? e.removeAllRanges() : e.empty ? e.empty() : e.clear && e.clear()
            } catch (t) {}
        }

        function f(e, t) {
            var n = e;
            return n.nodeType === Node.ELEMENT_NODE && 0 < n.childNodes.length && n.childNodes[t] && (n = n.childNodes[t]), n.nodeType === Node.TEXT_NODE && (n = n.parentNode), n
        }

        function y() {
            if (A.$wp) {
                A.markers.remove();
                var e, t, n = d(),
                    a = [];
                for (t = 0; t < n.length; t++)
                    if (n[t].startContainer !== A.doc || A.browser.msie) {
                        var r = (e = n[t]).collapsed,
                            o = A.markers.place(e, !0, t),
                            i = A.markers.place(e, !1, t);
                        if (void 0 !== o && o || !r || (C(".fr-marker").remove(), A.selection.setAtEnd(A.el)), A.el.normalize(), A.browser.safari && !r) try {
                            (e = A.doc.createRange()).setStartAfter(o), e.setEndBefore(i), a.push(e)
                        } catch (s) {}
                    }
                if (A.browser.safari && a.length)
                    for (A.selection.clear(), t = 0; t < a.length; t++) A.selection.get().addRange(a[t])
            }
        }

        function R() {
            var e, t = A.el.querySelectorAll('.fr-marker[data-type="true"]');
            if (!A.$wp) return A.markers.remove(), !1;
            if (0 === t.length) return !1;
            if (A.browser.msie || A.browser.edge)
                for (e = 0; e < t.length; e++) t[e].style.display = "inline-block";
            A.core.hasFocus() || A.browser.msie || A.browser.webkit || A.$el.focus(), S();
            var n = T();
            for (e = 0; e < t.length; e++) {
                var a = C(t[e]).data("id"),
                    r = t[e],
                    o = A.doc.createRange(),
                    i = A.$el.find('.fr-marker[data-type="false"][data-id="'.concat(a, '"]'));
                (A.browser.msie || A.browser.edge) && i.css("display", "inline-block");
                var s = null;
                if (0 < i.length) {
                    i = i[0];
                    try {
                        for (var l = !1, c = r.nextSibling, d = null; c && c.nodeType === Node.TEXT_NODE && 0 === c.textContent.length;) c = (d = c).nextSibling, C(d).remove();
                        for (var f = i.nextSibling; f && f.nodeType === Node.TEXT_NODE && 0 === f.textContent.length;) f = (d = f).nextSibling, C(d).remove();
                        if (r.nextSibling === i || i.nextSibling === r) {
                            for (var p = r.nextSibling === i ? r : i, u = p === r ? i : r, h = p.previousSibling; h && h.nodeType === Node.TEXT_NODE && 0 === h.length;) h = (d = h).previousSibling, C(d).remove();
                            if (h && h.nodeType === Node.TEXT_NODE)
                                for (; h && h.previousSibling && h.previousSibling.nodeType === Node.TEXT_NODE;) h.previousSibling.textContent += h.textContent, h = h.previousSibling, C(h.nextSibling).remove();
                            for (var g = u.nextSibling; g && g.nodeType === Node.TEXT_NODE && 0 === g.length;) g = (d = g).nextSibling, C(d).remove();
                            if (g && g.nodeType === Node.TEXT_NODE)
                                for (; g && g.nextSibling && g.nextSibling.nodeType === Node.TEXT_NODE;) g.nextSibling.textContent = g.textContent + g.nextSibling.textContent, g = g.nextSibling, C(g.previousSibling).remove();
                            if (h && (A.node.isVoid(h) || A.node.isBlock(h)) && (h = null), g && (A.node.isVoid(g) || A.node.isBlock(g)) && (g = null), h && g && h.nodeType === Node.TEXT_NODE && g.nodeType === Node.TEXT_NODE) {
                                C(r).remove(), C(i).remove();
                                var m = h.textContent.length;
                                h.textContent += g.textContent, C(g).remove(), A.opts.htmlUntouched || A.spaces.normalize(h), o.setStart(h, m), o.setEnd(h, m), l = !0
                            } else !h && g && g.nodeType === Node.TEXT_NODE ? (C(r).remove(), C(i).remove(), A.opts.htmlUntouched || A.spaces.normalize(g), s = C(A.doc.createTextNode("\u200b")).get(0), C(g).before(s), o.setStart(g, 0), o.setEnd(g, 0), l = !0) : !g && h && h.nodeType === Node.TEXT_NODE && (C(r).remove(), C(i).remove(), A.opts.htmlUntouched || A.spaces.normalize(h), s = C(A.doc.createTextNode("\u200b")).get(0), C(h).after(s), o.setStart(h, h.textContent.length), o.setEnd(h, h.textContent.length), l = !0)
                        }
                        if (!l) {
                            var v = void 0,
                                b = void 0;
                            b = (A.browser.chrome || A.browser.edge) && r.nextSibling === i ? (v = L(i, o, !0) || o.setStartAfter(i), L(r, o, !1) || o.setEndBefore(r)) : (r.previousSibling === i && (i = (r = i).nextSibling), i.nextSibling && "BR" === i.nextSibling.tagName || !i.nextSibling && A.node.isBlock(r.previousSibling) || r.previousSibling && "BR" === r.previousSibling.tagName || (r.style.display = "inline", i.style.display = "inline", s = C(A.doc.createTextNode("\u200b")).get(0)), v = L(r, o, !0) || C(r).before(s) && o.setStartBefore(r), L(i, o, !1) || C(i).after(s) && o.setEndAfter(i)), "function" == typeof v && v(), "function" == typeof b && b()
                        }
                    } catch (E) {}
                }
                s && C(s).remove();
                try {
                    n.addRange(o)
                } catch (E) {}
            }
            A.markers.remove()
        }

        function L(e, t, n) {
            var a, r = e.previousSibling,
                o = e.nextSibling;
            return r && o && r.nodeType === Node.TEXT_NODE && o.nodeType === Node.TEXT_NODE ? (a = r.textContent.length, n ? (o.textContent = r.textContent + o.textContent, C(r).remove(), C(e).remove(), A.opts.htmlUntouched || A.spaces.normalize(o), function() {
                t.setStart(o, a)
            }) : (r.textContent += o.textContent, C(o).remove(), C(e).remove(), A.opts.htmlUntouched || A.spaces.normalize(r), function() {
                t.setEnd(r, a)
            })) : r && !o && r.nodeType === Node.TEXT_NODE ? (a = r.textContent.length, n ? (A.opts.htmlUntouched || A.spaces.normalize(r), function() {
                t.setStart(r, a)
            }) : (A.opts.htmlUntouched || A.spaces.normalize(r), function() {
                t.setEnd(r, a)
            })) : !(!o || r || o.nodeType !== Node.TEXT_NODE) && (n ? (A.opts.htmlUntouched || A.spaces.normalize(o), function() {
                t.setStart(o, 0)
            }) : (A.opts.htmlUntouched || A.spaces.normalize(o), function() {
                t.setEnd(o, 0)
            }))
        }

        function w() {
            for (var e = d(), t = 0; t < e.length; t++)
                if (!e[t].collapsed) return !1;
            return !0
        }

        function r(e) {
            var t, n, a = !1,
                r = !1;
            if (A.win.getSelection) {
                var o = A.win.getSelection();
                o.rangeCount && ((n = (t = o.getRangeAt(0)).cloneRange()).selectNodeContents(e), n.setEnd(t.startContainer, t.startOffset), a = i(n), n.selectNodeContents(e), n.setStart(t.endContainer, t.endOffset), r = i(n))
            } else A.doc.selection && "Control" !== A.doc.selection.type && ((n = (t = A.doc.selection.createRange()).duplicate()).moveToElementText(e), n.setEndPoint("EndToStart", t), a = i(n), n.moveToElementText(e), n.setEndPoint("StartToEnd", t), r = i(n));
            return { atStart: a, atEnd: r }
        }

        function i(e) {
            return "" === e.toString().replace(/[\u200B-\u200D\uFEFF]/g, "")
        }

        function _(e, t) {
            void 0 === t && (t = !0);
            var n = C(e).html();
            n && n.replace(/\u200b/g, "").length !== n.length && C(e).html(n.replace(/\u200b/g, ""));
            for (var a = A.node.contents(e), r = 0; r < a.length; r++) a[r].nodeType !== Node.ELEMENT_NODE ? C(a[r]).remove() : (_(a[r], 0 === r), 0 === r && (t = !1));
            if (e.nodeType === Node.TEXT_NODE) {
                var o = C(document.createElement("span")).attr("data-first", "true").attr("data-text", "true");
                C(e)[0].replaceWith(o[0])
            } else t && C(e).attr("data-first", !0)
        }

        function O() {
            return 0 === C(this).find("fr-inner").length
        }

        function p() {
            try {
                if (!A.$wp) return !1;
                for (var e = d(0).commonAncestorContainer; e && !A.node.isElement(e);) e = e.parentNode;
                return !!A.node.isElement(e)
            } catch (t) {
                return !1
            }
        }

        function a(e, t) {
            if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
            for (var n = e.firstChild; n && (A.node.isBlock(n) || t && !A.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE);) n = (e = n).firstChild;
            e.innerHTML = $e.MARKERS + e.innerHTML
        }

        function o(e, t) {
            if (!e || 0 < e.getElementsByClassName("fr-marker").length) return !1;
            for (var n = e.lastChild; n && (A.node.isBlock(n) || t && !A.node.isVoid(n) && n.nodeType === Node.ELEMENT_NODE);) n = (e = n).lastChild;
            var a = A.doc.createElement("SPAN");
            for (a.setAttribute("id", "fr-sel-markers"), a.innerHTML = $e.MARKERS; e.parentNode && A.opts.htmlAllowedEmptyTags && 0 <= A.opts.htmlAllowedEmptyTags.indexOf(e.tagName.toLowerCase());) e = e.parentNode;
            e.appendChild(a);
            var r = e.querySelector("#fr-sel-markers");
            r.outerHTML = r.innerHTML
        }

        return {
            text: s,
            get: T,
            ranges: d,
            clear: S,
            element: function l() {
                var e = T();
                try {
                    if (e.rangeCount) {
                        var t, n = d(0),
                            a = n.startContainer;
                        if (A.node.isElement(a) && 0 === n.startOffset && a.childNodes.length)
                            for (; a.childNodes.length && a.childNodes[0].nodeType === Node.ELEMENT_NODE;) a = a.childNodes[0];
                        if (a.nodeType === Node.TEXT_NODE && n.startOffset === (a.textContent || "").length && a.nextSibling && (a = a.nextSibling), a.nodeType === Node.ELEMENT_NODE) {
                            var r = !1;
                            if (0 < a.childNodes.length && a.childNodes[n.startOffset]) {
                                for (t = a.childNodes[n.startOffset]; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                if (t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (a = t, r = !0), !r && 1 < a.childNodes.length && 0 < n.startOffset && a.childNodes[n.startOffset - 1]) {
                                    for (t = a.childNodes[n.startOffset - 1]; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) t = t.nextSibling;
                                    t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (a = t, r = !0)
                                }
                            } else !n.collapsed && a.nextSibling && a.nextSibling.nodeType === Node.ELEMENT_NODE && (t = a.nextSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (a = t, r = !0);
                            !r && 0 < a.childNodes.length && C(a.childNodes[0]).text().replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && ["BR", "IMG", "HR"].indexOf(a.childNodes[0].tagName) < 0 && (a = a.childNodes[0])
                        }
                        for (; a.nodeType !== Node.ELEMENT_NODE && a.parentNode;) a = a.parentNode;
                        for (var o = a; o && "HTML" !== o.tagName;) {
                            if (o === A.el) return a;
                            o = C(o).parent()[0]
                        }
                    }
                } catch (i) {}
                return A.el
            },
            endElement: function c() {
                var e = T();
                try {
                    if (e.rangeCount) {
                        var t, n = d(0),
                            a = n.endContainer;
                        if (a.nodeType === Node.ELEMENT_NODE) {
                            var r = !1;
                            0 < a.childNodes.length && a.childNodes[n.endOffset] && C(a.childNodes[n.endOffset]).text() === s() ? (a = a.childNodes[n.endOffset], r = !0) : !n.collapsed && a.previousSibling && a.previousSibling.nodeType === Node.ELEMENT_NODE ? (t = a.previousSibling) && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (a = t, r = !0) : !n.collapsed && 0 < a.childNodes.length && a.childNodes[n.endOffset] && (t = a.childNodes[n.endOffset].previousSibling).nodeType === Node.ELEMENT_NODE && t && t.textContent.replace(/\u200B/g, "") === s().replace(/\u200B/g, "") && (a = t, r = !0), !r && 0 < a.childNodes.length && C(a.childNodes[a.childNodes.length - 1]).text() === s() && ["BR", "IMG", "HR"].indexOf(a.childNodes[a.childNodes.length - 1].tagName) < 0 && (a = a.childNodes[a.childNodes.length - 1])
                        }
                        for (a.nodeType === Node.TEXT_NODE && 0 === n.endOffset && a.previousSibling && a.previousSibling.nodeType === Node.ELEMENT_NODE && (a = a.previousSibling); a.nodeType !== Node.ELEMENT_NODE && a.parentNode;) a = a.parentNode;
                        for (var o = a; o && "HTML" !== o.tagName;) {
                            if (o === A.el) return a;
                            o = C(o).parent()[0]
                        }
                    }
                } catch (i) {}
                return A.el
            },
            save: y,
            restore: R,
            isCollapsed: w,
            isFull: function u() {
                if (w()) return !1;
                A.selection.save();
                var e, t = A.el.querySelectorAll("td, th, img, br");
                for (e = 0; e < t.length; e++) t[e].nextSibling && (t[e].innerHTML = '<span class="fr-mk">'.concat($e.INVISIBLE_SPACE, "</span>").concat(t[e].innerHTML));
                var n = !1,
                    a = r(A.el);
                for (a.atStart && a.atEnd && (n = !0), t = A.el.querySelectorAll(".fr-mk"), e = 0; e < t.length; e++) t[e].parentNode.removeChild(t[e]);
                return A.selection.restore(), n
            },
            inEditor: p,
            remove: function N() {
                if (w()) return !0;
                var e;

                function t(e) {
                    for (var t = e.previousSibling; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) {
                        var n = t;
                        t = t.previousSibling, C(n).remove()
                    }
                    return t
                }

                function n(e) {
                    for (var t = e.nextSibling; t && t.nodeType === Node.TEXT_NODE && 0 === t.textContent.length;) {
                        var n = t;
                        t = t.nextSibling, C(n).remove()
                    }
                    return t
                }

                y();
                var a = A.$el.find('.fr-marker[data-type="true"]');
                for (e = 0; e < a.length; e++)
                    for (var r = a[e]; !(t(r) || A.node.isBlock(r.parentNode) || A.$el.is(r.parentNode) || A.node.hasClass(r.parentNode, "fr-inner"));) C(r.parentNode).before(r);
                var o = A.$el.find('.fr-marker[data-type="false"]');
                for (e = 0; e < o.length; e++) {
                    for (var i = o[e]; !(n(i) || A.node.isBlock(i.parentNode) || A.$el.is(i.parentNode) || A.node.hasClass(i.parentNode, "fr-inner"));) C(i.parentNode).after(i);
                    i.parentNode && A.node.isBlock(i.parentNode) && A.node.isEmpty(i.parentNode) && !A.$el.is(i.parentNode) && !A.node.hasClass(i.parentNode, "fr-inner") && A.opts.keepFormatOnDelete && C(i.parentNode).after(i)
                }
                if (function E() {
                        for (var e = A.$el.find(".fr-marker"), t = 0; t < e.length; t++)
                            if (C(e[t]).parentsUntil('.fr-element, [contenteditable="true"]', '[contenteditable="false"]').length) return !1;
                        return !0
                    }()) {
                    ! function T(e, t) {
                        var n = A.node.contents(e.get(0));
                        0 <= ["TD", "TH"].indexOf(e.get(0).tagName) && 1 === e.find(".fr-marker").length && (A.node.hasClass(n[0], "fr-marker") || "BR" == n[0].tagName && A.node.hasClass(n[0].nextElementSibling, "fr-marker")) && e.attr("data-del-cell", !0);
                        for (var a = 0; a < n.length; a++) {
                            var r = n[a];
                            A.node.hasClass(r, "fr-marker") ? t = (t + 1) % 2 : t ? 0 < C(r).find(".fr-marker").length ? t = T(C(r), t) : ["TD", "TH"].indexOf(r.tagName) < 0 && !A.node.hasClass(r, "fr-inner") ? !A.opts.keepFormatOnDelete || 0 < A.$el.find("[data-first]").length || A.node.isVoid(r) ? C(r).remove() : _(r) : A.node.hasClass(r, "fr-inner") ? 0 === C(r).find(".fr-inner").length ? C(r).html("<br>") : C(r).find(".fr-inner").filter(O).html("<br>") : (C(r).empty(), C(r).attr("data-del-cell", !0)) : 0 < C(r).find(".fr-marker").length && (t = T(C(r), t))
                        }
                        return t
                    }(A.$el, 0);
                    var s = A.$el.find('[data-first="true"]');
                    if (s.length) A.$el.find(".fr-marker").remove(), s.append($e.INVISIBLE_SPACE + $e.MARKERS).removeAttr("data-first"), s.attr("data-text") && s.replaceWith(s.html());
                    else
                        for (A.$el.find("table").filter(function() {
                                return 0 < C(this).find("[data-del-cell]").length && C(this).find("[data-del-cell]").length === C(this).find("td, th").length
                            }).remove(), A.$el.find("[data-del-cell]").removeAttr("data-del-cell"), a = A.$el.find('.fr-marker[data-type="true"]'), e = 0; e < a.length; e++) {
                            var l = a[e],
                                c = l.nextSibling,
                                d = A.$el.find('.fr-marker[data-type="false"][data-id="'.concat(C(l).data("id"), '"]')).get(0);
                            if (d) {
                                if (l && (!c || c !== d)) {
                                    var f = A.node.blockParent(l),
                                        p = A.node.blockParent(d),
                                        u = !1,
                                        h = !1;
                                    if (f && 0 <= ["UL", "OL"].indexOf(f.tagName) && (u = !(f = null)), p && 0 <= ["UL", "OL"].indexOf(p.tagName) && (h = !(p = null)), C(l).after(d), f !== p)
                                        if (null !== f || u)
                                            if (null !== p || h || 0 !== C(f).parentsUntil(A.$el, "table").length) f && p && 0 === C(f).parentsUntil(A.$el, "table").length && 0 === C(p).parentsUntil(A.$el, "table").length && !C(f).contains(p) && !C(p).contains(f) && (C(f).append(C(p).html()), C(p).remove());
                                            else {
                                                for (c = f; !c.nextSibling && c.parentNode !== A.el;) c = c.parentNode;
                                                for (c = c.nextSibling; c && "BR" !== c.tagName;) {
                                                    var g = c.nextSibling;
                                                    C(f).append(c), c = g
                                                }
                                                c && "BR" === c.tagName && C(c).remove()
                                            }
                                    else {
                                        var m = A.node.deepestParent(l);
                                        m ? (C(m).after(C(p).html()), C(p).remove()) : 0 === C(p).parentsUntil(A.$el, "table").length && (C(l).next().after(C(p).html()), C(p).remove())
                                    }
                                }
                            } else d = C(l).clone().attr("data-type", !1), C(l).after(d)
                        }
                }
                A.$el.find("li:empty").remove(), A.opts.keepFormatOnDelete || A.html.fillEmptyBlocks(), A.html.cleanEmptyTags(!0), A.opts.htmlUntouched || (A.clean.lists(), A.$el.find("li:empty").append("<br>"), A.spaces.normalize());
                var v = A.$el.find(".fr-marker").last().get(0),
                    b = A.$el.find(".fr-marker").first().get(0);
                void 0 !== v && void 0 !== b && !v.nextSibling && b.previousSibling && "BR" === b.previousSibling.tagName && A.node.isElement(v.parentNode) && A.node.isElement(b.parentNode) && A.$el.append("<br>"), R()
            },
            blocks: function h() {
                var e, t, n = [],
                    a = T();
                if (p() && a.rangeCount) {
                    var r = d();
                    for (e = 0; e < r.length; e++) {
                        var o = r[e],
                            i = f(o.startContainer, o.startOffset),
                            s = f(o.endContainer, o.endOffset);
                        (A.node.isBlock(i) || A.node.hasClass(i, "fr-inner")) && n.indexOf(i) < 0 && n.push(i), (t = A.node.blockParent(i)) && n.indexOf(t) < 0 && n.push(t);
                        for (var l = [], c = i; c !== s && c !== A.el;) l.indexOf(c) < 0 && c.children && c.children.length ? (l.push(c), c = c.children[0]) : c.nextSibling ? c = c.nextSibling : c.parentNode && (c = c.parentNode, l.push(c)), A.node.isBlock(c) && l.indexOf(c) < 0 && n.indexOf(c) < 0 && (c !== s || 0 < o.endOffset) && n.push(c);
                        A.node.isBlock(s) && n.indexOf(s) < 0 && 0 < o.endOffset && n.push(s), (t = A.node.blockParent(s)) && n.indexOf(t) < 0 && n.push(t)
                    }
                }
                for (e = n.length - 1; 0 < e; e--) C(n[e]).find(n).length && n.splice(e, 1);
                return n
            },
            info: r,
            setAtEnd: o,
            setAtStart: a,
            setBefore: function g(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.previousSibling; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length;) n = n.previousSibling;
                return n ? (A.node.isBlock(n) ? o(n) : "BR" === n.tagName ? C(n).before($e.MARKERS) : C(n).after($e.MARKERS), !0) : !!t && (A.node.isBlock(e) ? a(e) : C(e).before($e.MARKERS), !0)
            },
            setAfter: function m(e, t) {
                void 0 === t && (t = !0);
                for (var n = e.nextSibling; n && n.nodeType === Node.TEXT_NODE && 0 === n.textContent.length;) n = n.nextSibling;
                return n ? (A.node.isBlock(n) ? a(n) : C(n).before($e.MARKERS), !0) : !!t && (A.node.isBlock(e) ? o(e) : C(e).after($e.MARKERS), !0)
            },
            rangeElement: f
        }
    }, Object.assign($e.DEFAULTS, { language: null }), $e.LANGUAGE = {}, $e.MODULES.language = function(e) {
        var t;
        return {
            _init: function n() {
                $e.LANGUAGE && (t = $e.LANGUAGE[e.opts.language]), t && t.direction && (e.opts.direction = t.direction)
            },
            translate: function a(e) {
                return t && t.translation[e] && t.translation[e].length ? t.translation[e] : e
            }
        }
    }, Object.assign($e.DEFAULTS, { placeholderText: "مەزمۇن كىرگۈزۈڭ" }), $e.MODULES.placeholder = function(f) {
        var p = f.$;

        function e() {
            f.$placeholder || function d() {
                f.$placeholder = p(f.doc.createElement("SPAN")).addClass("fr-placeholder"), f.$wp.append(f.$placeholder)
            }();
            var e = f.opts.iframe ? f.$iframe.prev().outerHeight(!0) : f.$el.prev().outerHeight(!0),
                t = 0,
                n = 0,
                a = 0,
                r = 0,
                o = 0,
                i = 0,
                s = f.node.contents(f.el),
                l = p(f.selection.element()).css("text-align");
            if (s.length && s[0].nodeType === Node.ELEMENT_NODE) {
                var c = p(s[0]);
                (0 < f.$wp.prev().length || 0 < f.$el.prev().length) && f.ready && (t = f.helpers.getPX(c.css("margin-top")), r = f.helpers.getPX(c.css("padding-top")), n = f.helpers.getPX(c.css("margin-left")), a = f.helpers.getPX(c.css("margin-right")), o = f.helpers.getPX(c.css("padding-left")), i = f.helpers.getPX(c.css("padding-right"))), f.$placeholder.css("font-size", c.css("font-size")), f.$placeholder.css("line-height", c.css("line-height"))
            } else f.$placeholder.css("font-size", f.$el.css("font-size")), f.$placeholder.css("line-height", f.$el.css("line-height"));
            f.$wp.addClass("show-placeholder"), f.$placeholder.css({
                marginTop: Math.max(f.helpers.getPX(f.$el.css("margin-top")), t) + (e || 0),
                paddingTop: Math.max(f.helpers.getPX(f.$el.css("padding-top")), r),
                paddingLeft: Math.max(f.helpers.getPX(f.$el.css("padding-left")), o),
                marginLeft: Math.max(f.helpers.getPX(f.$el.css("margin-left")), n),
                paddingRight: Math.max(f.helpers.getPX(f.$el.css("padding-right")), i),
                marginRight: Math.max(f.helpers.getPX(f.$el.css("margin-right")), a),
                textAlign: l
            }).text(f.language.translate(f.opts.placeholderText || f.$oel.attr("placeholder") || "")), f.$placeholder.html(f.$placeholder.text().replace(/\n/g, "<br>"))
        }

        function t() {
            f.$wp.removeClass("show-placeholder")
        }

        function n() {
            if (!f.$wp) return !1;
            f.core.isEmpty() ? e() : t()
        }

        return {
            _init: function a() {
                if (!f.$wp) return !1;
                f.events.on("init input keydown keyup contentChanged initialized", n)
            },
            show: e,
            hide: t,
            refresh: n,
            isVisible: function r() {
                return !f.$wp || f.node.hasClass(f.$wp.get(0), "show-placeholder")
            }
        }
    }, $e.UNICODE_NBSP = String.fromCharCode(160), $e.VOID_ELEMENTS = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"], $e.BLOCK_TAGS = ["address", "article", "aside", "audio", "blockquote", "canvas", "details", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "li", "main", "nav", "noscript", "ol", "output", "p", "pre", "section", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "ul", "video"], Object.assign($e.DEFAULTS, {
        htmlAllowedEmptyTags: ["textarea", "a", "iframe", "object", "video", "style", "script", ".fa", ".fr-emoticon", ".fr-inner", "path", "line", "hr"],
        htmlDoNotWrapTags: ["script", "style"],
        htmlSimpleAmpersand: !1,
        htmlIgnoreCSSProperties: [],
        htmlExecuteScripts: !0
    }), $e.MODULES.html = function(O) {
        var p = O.$;

        function d() {
            return O.opts.enter === $e.ENTER_P ? "p" : O.opts.enter === $e.ENTER_DIV ? "div" : O.opts.enter === $e.ENTER_BR ? null : void 0
        }

        function s(e, t) {
            return !(!e || e === O.el) && (t ? -1 != ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName) || s(e.parentNode, t) : -1 !== ["PRE", "SCRIPT", "STYLE"].indexOf(e.tagName))
        }

        function o(e) {
            var t, n = [],
                a = [];
            if (e) {
                var r = O.el.querySelectorAll(".fr-marker");
                for (t = 0; t < r.length; t++) {
                    var o = O.node.blockParent(r[t]) || r[t];
                    if (o) {
                        var i = o.nextSibling,
                            s = o.previousSibling;
                        o && a.indexOf(o) < 0 && O.node.isBlock(o) && a.push(o), s && O.node.isBlock(s) && a.indexOf(s) < 0 && a.push(s), i && O.node.isBlock(i) && a.indexOf(i) < 0 && a.push(i)
                    }
                }
            } else a = O.el.querySelectorAll(u());
            var l = u();
            for (l += ",".concat($e.VOID_ELEMENTS.join(",")), l += ", .fr-inner", l += ",".concat(O.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)"), t = a.length - 1; 0 <= t; t--)
                if (!(a[t].textContent && 0 < a[t].textContent.replace(/\u200B|\n/g, "").length || 0 < a[t].querySelectorAll(l).length)) {
                    for (var c = O.node.contents(a[t]), d = !1, f = 0; f < c.length; f++)
                        if (c[f].nodeType !== Node.COMMENT_NODE && c[f].textContent && 0 < c[f].textContent.replace(/\u200B|\n/g, "").length) {
                            d = !0;
                            break
                        }
                    d || n.push(a[t])
                }
            return n
        }

        function u() {
            return $e.BLOCK_TAGS.join(", ")
        }

        function e(e) {
            var t, n, a = p.merge([], $e.VOID_ELEMENTS);
            a = p.merge(a, O.opts.htmlAllowedEmptyTags), a = void 0 === e ? p.merge(a, $e.BLOCK_TAGS) : p.merge(a, $e.NO_DELETE_TAGS), t = O.el.querySelectorAll("*:empty:not(".concat(a.join("):not("), "):not(.fr-marker):not(template)"));
            do {
                n = !1;
                for (var r = 0; r < t.length; r++) 0 !== t[r].attributes.length && void 0 === t[r].getAttribute("href") || (t[r].parentNode.removeChild(t[r]), n = !0);
                t = O.el.querySelectorAll("*:empty:not(".concat(a.join("):not("), "):not(.fr-marker):not(template)"))
            } while (t.length && n)
        }

        function i(e, t) {
            var n = d();
            if (t && (n = "div"), n) {
                for (var a = O.doc.createDocumentFragment(), r = null, o = !1, i = e.firstChild, s = !1; i;) {
                    var l = i.nextSibling;
                    if (i.nodeType === Node.ELEMENT_NODE && (O.node.isBlock(i) || 0 <= O.opts.htmlDoNotWrapTags.indexOf(i.tagName.toLowerCase()) && !O.node.hasClass(i, "fr-marker"))) r = null, a.appendChild(i.cloneNode(!0));
                    else if (i.nodeType !== Node.ELEMENT_NODE && i.nodeType !== Node.TEXT_NODE) r = null, a.appendChild(i.cloneNode(!0));
                    else if ("BR" === i.tagName) null === r ? (r = O.doc.createElement(n), s = !0, t && (r.setAttribute("class", "fr-temp-div"), r.setAttribute("data-empty", !0)), r.appendChild(i.cloneNode(!0)), a.appendChild(r)) : !1 === o && (r.appendChild(O.doc.createElement("br")), t && (r.setAttribute("class", "fr-temp-div"), r.setAttribute("data-empty", !0))), r = null;
                    else {
                        var c = i.textContent;
                        i.nodeType !== Node.TEXT_NODE || 0 < c.replace(/\n/g, "").replace(/(^ *)|( *$)/g, "").length || c.replace(/(^ *)|( *$)/g, "").length && c.indexOf("\n") < 0 ? (null === r && (r = O.doc.createElement(n), s = !0, t && r.setAttribute("class", "fr-temp-div"), a.appendChild(r), o = !1), r.appendChild(i.cloneNode(!0)), o || O.node.hasClass(i, "fr-marker") || i.nodeType === Node.TEXT_NODE && 0 === c.replace(/ /g, "").length || (o = !0)) : s = !0
                    }
                    i = l
                }
                s && (e.innerHTML = "", e.appendChild(a))
            }
        }

        function l(e, t) {
            for (var n = e.length - 1; 0 <= n; n--) i(e[n], t)
        }

        function t(e, t, n, a, r) {
            if (!O.$wp) return !1;
            void 0 === e && (e = !1), void 0 === t && (t = !1), void 0 === n && (n = !1), void 0 === a && (a = !1), void 0 === r && (r = !1);
            var o = O.$wp.scrollTop();
            i(O.el, e), a && l(O.el.querySelectorAll(".fr-inner"), e), t && l(O.el.querySelectorAll("td, th"), e), n && l(O.el.querySelectorAll("blockquote"), e), r && l(O.el.querySelectorAll("li"), e), o !== O.$wp.scrollTop() && O.$wp.scrollTop(o)
        }

        function n(e) {
            if (void 0 === e && (e = O.el), e && 0 <= ["SCRIPT", "STYLE", "PRE"].indexOf(e.tagName)) return !1;
            for (var t = O.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, O.node.filter(function(e) {
                    return null !== e.textContent.match(/([ \n]{2,})|(^[ \n]{1,})|([ \n]{1,}$)/g)
                }), !1); t.nextNode();) {
                var n = t.currentNode;
                if (!s(n.parentNode, !0)) {
                    var a = O.node.isBlock(n.parentNode) || O.node.isElement(n.parentNode),
                        r = n.textContent.replace(/(?!^)( ){2,}(?!$)/g, " ").replace(/\n/g, " ").replace(/^[ ]{2,}/g, " ").replace(/[ ]{2,}$/g, " ");
                    if (a) {
                        var o = n.previousSibling,
                            i = n.nextSibling;
                        o && i && " " === r ? r = O.node.isBlock(o) && O.node.isBlock(i) ? "" : " " : (o || (r = r.replace(/^ */, "")), i || (r = r.replace(/ *$/, "")))
                    }
                    n.textContent = r
                }
            }
        }

        function a(e, t, n) {
            var a = new RegExp(t, "gi").exec(e);
            return a ? a[n] : null
        }

        function N(e) {
            var t = e.doctype,
                n = "<!DOCTYPE html>";
            return t && (n = "<!DOCTYPE ".concat(t.name).concat(t.publicId ? ' PUBLIC "'.concat(t.publicId, '"') : "").concat(!t.publicId && t.systemId ? " SYSTEM" : "").concat(t.systemId ? ' "'.concat(t.systemId, '"') : "", ">")), n
        }

        function c(e) {
            var t = e.parentNode;
            if (t && (O.node.isBlock(t) || O.node.isElement(t)) && ["TD", "TH"].indexOf(t.tagName) < 0) {
                for (var n = e.previousSibling, a = e.nextSibling; n && (n.nodeType === Node.TEXT_NODE && 0 === n.textContent.replace(/\n|\r/g, "").length || O.node.hasClass(n, "fr-tmp"));) n = n.previousSibling;
                if (a) return !1;
                n && t && "BR" !== n.tagName && !O.node.isBlock(n) && !a && 0 < t.textContent.replace(/\u200B/g, "").length && 0 < n.textContent.length && !O.node.hasClass(n, "fr-marker") && (O.el === t && !a && O.opts.enter === $e.ENTER_BR && O.browser.msie || e.parentNode.removeChild(e))
            } else !t || O.node.isBlock(t) || O.node.isElement(t) || e.previousSibling || e.nextSibling || !O.node.isDeletable(e.parentNode) || c(e.parentNode)
        }

        function h() {
            O.opts.htmlUntouched || (e(), t(), n(), O.spaces.normalize(null, !0), O.html.fillEmptyBlocks(), O.clean.lists(), O.clean.tables(), O.clean.toHTML5(), O.html.cleanBRs()), O.selection.restore(), r(), O.placeholder.refresh()
        }

        function r() {
            O.node.isEmpty(O.el) && (null !== d() ? O.el.querySelector(u()) || O.el.querySelector("".concat(O.opts.htmlDoNotWrapTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || (O.core.hasFocus() ? (O.$el.html("<".concat(d(), ">").concat($e.MARKERS, "<br/></").concat(d(), ">")), O.selection.restore()) : O.$el.html("<".concat(d(), "><br/></").concat(d(), ">"))) : O.el.querySelector("*:not(.fr-marker):not(br)") || (O.core.hasFocus() ? (O.$el.html("".concat($e.MARKERS, "<br/>")), O.selection.restore()) : O.$el.html("<br/>")))
        }

        function g(e, t) {
            return a(e, "<".concat(t, "[^>]*?>([\\w\\W]*)</").concat(t, ">"), 1)
        }

        function m(e, t) {
            var n = p("<div ".concat(a(e, "<".concat(t, "([^>]*?)>"), 1) || "", ">"));
            return O.node.rawAttributes(n.get(0))
        }

        function v(e) {
            return (a(e, "<!DOCTYPE([^>]*?)>", 0) || "<!DOCTYPE html>").replace(/\n/g, " ").replace(/ {2,}/g, " ")
        }

        function b(e, t) {
            O.opts.htmlExecuteScripts ? e.html(t) : e.get(0).innerHTML = t
        }

        function x(e) {
            var t;
            (t = /:not\(([^)]*)\)/g).test(e) && (e = e.replace(t, "     $1 "));
            var n = 100 * (e.match(/(#[^\s+>~.[:]+)/g) || []).length + 10 * (e.match(/(\[[^]]+\])/g) || []).length + 10 * (e.match(/(\.[^\s+>~.[:]+)/g) || []).length + 10 * (e.match(/(:[\w-]+\([^)]*\))/gi) || []).length + 10 * (e.match(/(:[^\s+>~.[:]+)/g) || []).length + (e.match(/(::[^\s+>~.[:]+|:first-line|:first-letter|:before|:after)/gi) || []).length;
            return n += ((e = (e = e.replace(/[*\s+>~]/g, " ")).replace(/[#.]/g, " ")).match(/([^\s+>~.[:]+)/g) || []).length
        }

        function I(e) {
            if (O.events.trigger("html.processGet", [e]), e && e.getAttribute && "" === e.getAttribute("class") && e.removeAttribute("class"), e && e.getAttribute && "" === e.getAttribute("style") && e.removeAttribute("style"), e && e.nodeType === Node.ELEMENT_NODE) {
                var t, n = e.querySelectorAll('[class=""],[style=""]');
                for (t = 0; t < n.length; t++) {
                    var a = n[t];
                    "" === a.getAttribute("class") && a.removeAttribute("class"), "" === a.getAttribute("style") && a.removeAttribute("style")
                }
                if ("BR" === e.tagName) c(e);
                else {
                    var r = e.querySelectorAll("br");
                    for (t = 0; t < r.length; t++) c(r[t])
                }
            }
        }

        function k(e, t) {
            return e[3] - t[3]
        }

        function M() {
            for (var e = O.el.querySelectorAll("input, textarea"), t = 0; t < e.length; t++) "checkbox" !== e[t].type && "radio" !== e[t].type || (e[t].checked ? e[t].setAttribute("checked", e[t].checked) : O.$(e[t]).removeAttr("checked")), e[t].getAttribute("value") && e[t].setAttribute("value", e[t].value)
        }

        function f(e) {
            var t = O.doc.createElement("div");
            return t.innerHTML = e, null !== t.querySelector(u())
        }

        function E(e) {
            var t = null;
            if (void 0 === e && (t = O.selection.element()), O.opts.keepFormatOnDelete) return !1;
            var n, a,
                r = t ? (t.textContent.match(/\u200B/g) || []).length - t.querySelectorAll(".fr-marker").length : 0;
            if ((O.el.textContent.match(/\u200B/g) || []).length - O.el.querySelectorAll(".fr-marker").length === r) return !1;
            do {
                a = !1, n = O.el.querySelectorAll("*:not(.fr-marker)");
                for (var o = 0; o < n.length; o++) {
                    var i = n[o];
                    if (t !== i) {
                        var s = i.textContent;
                        0 === i.children.length && 1 === s.length && 8203 === s.charCodeAt(0) && "TD" !== i.tagName && (p(i).remove(), a = !0)
                    }
                }
            } while (a)
        }

        function T() {
            E(), O.placeholder && setTimeout(O.placeholder.refresh, 0)
        }

        return {
            defaultTag: d,
            isPreformatted: s,
            emptyBlocks: o,
            emptyBlockTagsQuery: function A() {
                return "".concat($e.BLOCK_TAGS.join(":empty, "), ":empty")
            },
            blockTagsQuery: u,
            fillEmptyBlocks: function C(e) {
                var t = o(e);
                O.node.isEmpty(O.el) && O.opts.enter === $e.ENTER_BR && t.push(O.el);
                for (var n = 0; n < t.length; n++) {
                    var a = t[n];
                    "false" === a.getAttribute("contenteditable") || a.querySelector("".concat(O.opts.htmlAllowedEmptyTags.join(":not(.fr-marker),"), ":not(.fr-marker)")) || O.node.isVoid(a) || "TABLE" !== a.tagName && "TBODY" !== a.tagName && "TR" !== a.tagName && "UL" !== a.tagName && "OL" !== a.tagName && a.appendChild(O.doc.createElement("br"))
                }
                if (O.browser.msie && O.opts.enter === $e.ENTER_BR) {
                    var r = O.node.contents(O.el);
                    r.length && r[r.length - 1].nodeType === Node.TEXT_NODE && O.$el.append("<br>")
                }
            },
            cleanEmptyTags: e,
            cleanWhiteTags: E,
            cleanBlankSpaces: n,
            blocks: function S() {
                return O.$el.get(0).querySelectorAll(u())
            },
            getDoctype: N,
            set: function y(e) {
                var t = O.clean.html((e || "").trim(), [], [], O.opts.fullPage);
                if (O.opts.fullPage) {
                    var n = g(t, "body") || (0 <= t.indexOf("<body") ? "" : t),
                        a = m(t, "body"),
                        r = g(t, "head") || "<title></title>",
                        o = m(t, "head"),
                        i = p("<div>");
                    i.append(r).contents().each(function() {
                        (this.nodeType === Node.COMMENT_NODE || 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName)) && this.parentNode.removeChild(this)
                    });
                    var s = i.html().trim();
                    r = p("<div>").append(r).contents().map(function() {
                        return this.nodeType === Node.COMMENT_NODE ? "\x3c!--".concat(this.nodeValue, "--\x3e") : 0 <= ["BASE", "LINK", "META", "NOSCRIPT", "SCRIPT", "STYLE", "TEMPLATE", "TITLE"].indexOf(this.tagName) ? this.outerHTML : ""
                    }).toArray().join("");
                    var l = v(t),
                        c = m(t, "html");
                    b(O.$el, "".concat(s, "\n").concat(n)), O.node.clearAttributes(O.el), O.$el.attr(a), O.$el.addClass("fr-view"), O.$el.attr("spellcheck", O.opts.spellcheck), O.$el.attr("dir", O.opts.direction), b(O.$head, r), O.node.clearAttributes(O.$head.get(0)), O.$head.attr(o), O.node.clearAttributes(O.$html.get(0)), O.$html.attr(c), O.iframe_document.doctype.parentNode.replaceChild(function f(e, t) {
                        var n = e.match(/<!DOCTYPE ?([^ ]*) ?([^ ]*) ?"?([^"]*)"? ?"?([^"]*)"?>/i);
                        return n ? t.implementation.createDocumentType(n[1], n[3], n[4]) : t.implementation.createDocumentType("html")
                    }(l, O.iframe_document), O.iframe_document.doctype)
                } else b(O.$el, t);
                var d = O.edit.isDisabled();
                O.edit.on(), O.core.injectStyle(O.opts.iframeDefaultStyle + O.opts.iframeStyle), h(), O.opts.useClasses || (O.$el.find("[fr-original-class]").each(function() {
                    this.setAttribute("class", this.getAttribute("fr-original-class")), this.removeAttribute("fr-original-class")
                }), O.$el.find("[fr-original-style]").each(function() {
                    this.setAttribute("style", this.getAttribute("fr-original-style")), this.removeAttribute("fr-original-style")
                })), d && O.edit.off(), O.events.trigger("html.set"), O.events.trigger("charCounter.update")
            },
            syncInputs: M,
            get: function D(e, t) {
                if (!O.$wp) return O.$oel.clone().removeClass("fr-view").removeAttr("contenteditable").get(0).outerHTML;
                var n = "";
                O.events.trigger("html.beforeGet");
                var a, r, o = [],
                    i = {},
                    s = [];
                if (M(), !O.opts.useClasses && !t) {
                    var l = new RegExp("^".concat(O.opts.htmlIgnoreCSSProperties.join("$|^"), "$"), "gi");
                    for (a = 0; a < O.doc.styleSheets.length; a++) {
                        var c = void 0,
                            d = 0;
                        try {
                            c = O.doc.styleSheets[a].cssRules, O.doc.styleSheets[a].ownerNode && "STYLE" === O.doc.styleSheets[a].ownerNode.nodeType && (d = 1)
                        } catch (_) {}
                        if (c)
                            for (var f = 0, p = c.length; f < p; f++)
                                if (c[f].selectorText && 0 < c[f].style.cssText.length) {
                                    var u = c[f].selectorText.replace(/body |\.fr-view /g, "").replace(/::/g, ":"),
                                        h = void 0;
                                    try {
                                        h = O.el.querySelectorAll(u)
                                    } catch (_) {
                                        h = []
                                    }
                                    for (r = 0; r < h.length; r++) {
                                        !h[r].getAttribute("fr-original-style") && h[r].getAttribute("style") ? (h[r].setAttribute("fr-original-style", h[r].getAttribute("style")), o.push(h[r])) : h[r].getAttribute("fr-original-style") || (h[r].setAttribute("fr-original-style", ""), o.push(h[r])), i[h[r]] || (i[h[r]] = {});
                                        for (var g = 1e3 * d + x(c[f].selectorText), m = c[f].style.cssText.split(";"), v = 0; v < m.length; v++) {
                                            var b = m[v].trim().split(":")[0];
                                            if (b && !b.match(l) && (i[h[r]][b] || (i[h[r]][b] = 0) <= (h[r].getAttribute("fr-original-style") || "").indexOf("".concat(b, ":")) && (i[h[r]][b] = 1e4), g >= i[h[r]][b] && (i[h[r]][b] = g, m[v].trim().length))) {
                                                var E = m[v].trim().split(":");
                                                E.splice(0, 1), s.push([h[r], b.trim(), E.join(":").trim(), g])
                                            }
                                        }
                                    }
                                }
                    }
                    for (s.sort(k), a = 0; a < s.length; a++) {
                        var T = s[a];
                        T[0].style[T[1]] = T[2]
                    }
                    for (a = 0; a < o.length; a++)
                        if (o[a].getAttribute("class") && (o[a].setAttribute("fr-original-class", o[a].getAttribute("class")), o[a].removeAttribute("class")), 0 < (o[a].getAttribute("fr-original-style") || "").trim().length) {
                            var A = o[a].getAttribute("fr-original-style").split(";");
                            for (r = 0; r < A.length; r++)
                                if (0 < A[r].indexOf(":")) {
                                    var C = A[r].split(":"),
                                        S = C[0];
                                    C.splice(0, 1), o[a].style[S.trim()] = C.join(":").trim()
                                }
                        }
                }
                if (O.node.isEmpty(O.el)) O.opts.fullPage && (n = N(O.iframe_document), n += "<html".concat(O.node.attributes(O.$html.get(0)), ">").concat(O.$html.find("head").get(0).outerHTML, "<body></body></html>"));
                else if (void 0 === e && (e = !1), O.opts.fullPage) {
                    n = N(O.iframe_document), O.$el.removeClass("fr-view");
                    var y = O.opts.heightMin,
                        R = O.opts.height,
                        L = O.opts.heightMax;
                    O.opts.heightMin = null, O.opts.height = null, O.opts.heightMax = null, O.size.refresh(), n += "<html".concat(O.node.attributes(O.$html.get(0)), ">").concat(O.$html.html(), "</html>"), O.opts.heightMin = y, O.opts.height = R, O.opts.heightMax = L, O.size.refresh(), O.$el.addClass("fr-view")
                } else n = O.$el.html();
                if (!O.opts.useClasses && !t)
                    for (a = 0; a < o.length; a++) o[a].getAttribute("fr-original-class") && (o[a].setAttribute("class", o[a].getAttribute("fr-original-class")), o[a].removeAttribute("fr-original-class")), null !== o[a].getAttribute("fr-original-style") && void 0 !== o[a].getAttribute("fr-original-style") ? (0 !== o[a].getAttribute("fr-original-style").length ? o[a].setAttribute("style", o[a].getAttribute("fr-original-style")) : o[a].removeAttribute("style"), o[a].removeAttribute("fr-original-style")) : o[a].removeAttribute("style");
                O.opts.fullPage && (n = (n = (n = (n = (n = (n = (n = (n = n.replace(/<style data-fr-style="true">(?:[\w\W]*?)<\/style>/g, "")).replace(/<link([^>]*)data-fr-style="true"([^>]*)>/g, "")).replace(/<style(?:[\w\W]*?)class="firebugResetStyles"(?:[\w\W]*?)>(?:[\w\W]*?)<\/style>/g, "")).replace(/<body((?:[\w\W]*?)) spellcheck="true"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")).replace(/<body((?:[\w\W]*?)) contenteditable="(true|false)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?)) dir="([\w]*)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$3>$4</body>")).replace(/<body((?:[\w\W]*?))class="([\w\W]*?)(fr-rtl|fr-ltr)([\w\W]*?)"((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, '<body$1class="$2$4"$5>$6</body>')).replace(/<body((?:[\w\W]*?)) class=""((?:[\w\W]*?))>((?:[\w\W]*?))<\/body>/g, "<body$1$2>$3</body>")), O.opts.htmlSimpleAmpersand && (n = n.replace(/&amp;/gi, "&")), O.events.trigger("html.afterGet"), e || (n = n.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")), n = O.clean.invisibleSpaces(n), n = O.clean.exec(n, I);
                var w = O.events.chainTrigger("html.get", n);
                return "string" == typeof w && (n = w), n = (n = n.replace(/<pre(?:[\w\W]*?)>(?:[\w\W]*?)<\/pre>/g, function(e) {
                    return e.replace(/<br>/g, "\n")
                })).replace(/<meta((?:[\w\W]*?)) data-fr-http-equiv="/g, '<meta$1 http-equiv="')
            },
            getSelected: function R() {
                function e(e, t) {
                    for (; t && (t.nodeType === Node.TEXT_NODE || !O.node.isBlock(t)) && !O.node.isElement(t) && !O.node.hasClass(t, "fr-inner");) t && t.nodeType !== Node.TEXT_NODE && p(e).wrapInner(O.node.openTagString(t) + O.node.closeTagString(t)), t = t.parentNode;
                    t && e.innerHTML === t.innerHTML ? e.innerHTML = t.outerHTML : -1 != t.innerText.indexOf(e.innerHTML) && (e.innerHTML = O.node.openTagString(t) + t.innerHTML + O.node.closeTagString(t))
                }

                var t, n, a = "";
                if ("undefined" != typeof O.win.getSelection) {
                    O.browser.mozilla && (O.selection.save(), 1 < O.$el.find('.fr-marker[data-type="false"]').length && (O.$el.find('.fr-marker[data-type="false"][data-id="0"]').remove(), O.$el.find('.fr-marker[data-type="false"]:last').attr("data-id", "0"), O.$el.find(".fr-marker").not('[data-id="0"]').remove()), O.selection.restore());
                    for (var r = O.selection.ranges(), o = 0; o < r.length; o++) {
                        var i = document.createElement("div");
                        i.appendChild(r[o].cloneContents()), e(i, (n = t = void 0, n = null, O.win.getSelection ? (t = O.win.getSelection()) && t.rangeCount && (n = t.getRangeAt(0).commonAncestorContainer).nodeType !== Node.ELEMENT_NODE && (n = n.parentNode) : (t = O.doc.selection) && "Control" !== t.type && (n = t.createRange().parentElement()), null !== n && (0 <= p(n).parents().toArray().indexOf(O.el) || n === O.el) ? n : null)), 0 < p(i).find(".fr-element").length && (i = O.el), a += i.innerHTML
                    }
                } else "undefined" != typeof O.doc.selection && "Text" === O.doc.selection.type && (a = O.doc.selection.createRange().htmlText);
                return a
            },
            insert: function L(e, t, n) {
                var a;
                if (O.selection.isCollapsed() || O.selection.remove(), a = t ? e : O.clean.html(e), e.indexOf('class="fr-marker"') < 0 && (a = function i(e) {
                        var t = O.doc.createElement("div");
                        return t.innerHTML = e, O.selection.setAtEnd(t, !0), t.innerHTML
                    }(a)), O.node.isEmpty(O.el) && !O.opts.keepFormatOnDelete && f(a)) O.el.innerHTML = a;
                else {
                    var r = O.markers.insert();
                    if (r) {
                        O.node.isLastSibling(r) && p(r).parent().hasClass("fr-deletable") && p(r).insertAfter(p(r).parent());
                        var o = O.node.blockParent(r);
                        if ((f(a) || n) && (O.node.deepestParent(r) || o && "LI" === o.tagName)) {
                            if (o && "LI" === o.tagName && (a = function s(e) {
                                    if (!O.html.defaultTag()) return e;
                                    var t = O.doc.createElement("div");
                                    t.innerHTML = e;
                                    for (var n = t.querySelectorAll(":scope > ".concat(O.html.defaultTag())), a = n.length - 1; 0 <= a; a--) {
                                        var r = n[a];
                                        O.node.isBlock(r.previousSibling) || (r.previousSibling && !O.node.isEmpty(r) && p("<br>").insertAfter(r.previousSibling), r.outerHTML = r.innerHTML)
                                    }
                                    return t.innerHTML
                                }(a)), !(r = O.markers.split())) return !1;
                            r.outerHTML = a
                        } else r.outerHTML = a
                    } else O.el.innerHTML += a
                }
                h(), O.keys.positionCaret(), O.events.trigger("html.inserted")
            },
            wrap: t,
            unwrap: function w() {
                O.$el.find("div.fr-temp-div").each(function() {
                    this.previousSibling && this.previousSibling.nodeType === Node.TEXT_NODE && p(this).before("<br>"), p(this).attr("data-empty") || !this.nextSibling || O.node.isBlock(this.nextSibling) && !p(this.nextSibling).hasClass("fr-temp-div") ? p(this).replaceWith(p(this).html()) : p(this).replaceWith("".concat(p(this).html(), "<br>"))
                }), O.$el.find(".fr-temp-div").removeClass("fr-temp-div").filter(function() {
                    return "" === p(this).attr("class")
                }).removeAttr("class")
            },
            escapeEntities: function _(e) {
                return e.replace(/</gi, "&lt;").replace(/>/gi, "&gt;").replace(/"/gi, "&quot;").replace(/'/gi, "&#39;")
            },
            checkIfEmpty: r,
            extractNode: g,
            extractNodeAttrs: m,
            extractDoctype: v,
            cleanBRs: function B() {
                for (var e = O.el.getElementsByTagName("br"), t = 0; t < e.length; t++) c(e[t])
            },
            _init: function F() {
                O.$wp && (O.events.on("mouseup", T), O.events.on("keydown", T), O.events.on("contentChanged", r))
            },
            _setHtml: b
        }
    }, $e.ENTER_P = 0, $e.ENTER_DIV = 1, $e.ENTER_BR = 2, $e.KEYCODE = {
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        ESC: 27,
        SPACE: 32,
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        FF_SEMICOLON: 59,
        FF_EQUALS: 61,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        FF_HYPHEN: 173,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        HYPHEN: 189,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        TILDE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221,
        IME: 229
    }, Object.assign($e.DEFAULTS, { enter: $e.ENTER_P, multiLine: !0, tabSpaces: 0 }), $e.MODULES.keys = function(d) {
        var f, n, a, r = d.$,
            p = !1;

        function u(e) {
            if (d.selection.isCollapsed())
                if (["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && d.cursor.backspace(), d.helpers.isIOS()) {
                    var t = d.selection.ranges(0);
                    t.deleteContents(), t.insertNode(document.createTextNode("\u200b")), d.selection.get().modify("move", "forward", "character")
                } else ["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && e.preventDefault(), e.stopPropagation();
            else e.preventDefault(), e.stopPropagation(), d.selection.remove();
            d.placeholder.refresh()
        }

        function h(e) {
            ["INPUT", "BUTTON", "TEXTAREA"].indexOf(e.target && e.target.tagName) < 0 && e.preventDefault(), e.stopPropagation(), "" === d.selection.text() && "IMG" != d.selection.element().tagName ? d.cursor.del() : d.selection.remove(), d.placeholder.refresh()
        }

        function e() {
            if (d.browser.mozilla && d.selection.isCollapsed() && !p) {
                var e = d.selection.ranges(0),
                    t = e.startContainer,
                    n = e.startOffset;
                t && t.nodeType === Node.TEXT_NODE && n <= t.textContent.length && 0 < n && 32 === t.textContent.charCodeAt(n - 1) && (d.selection.save(), d.spaces.normalize(), d.selection.restore())
            }
        }

        function t() {
            d.selection.isFull() && setTimeout(function() {
                var e = d.html.defaultTag();
                e ? d.$el.html("<".concat(e, ">").concat($e.MARKERS, "<br/></").concat(e, ">")) : d.$el.html("".concat($e.MARKERS, "<br/>")), d.selection.restore(), d.placeholder.refresh(), d.button.bulkRefresh(), d.undo.saveStep()
            }, 0)
        }

        function o() {
            p = !1
        }

        function i() {
            p = !1
        }

        function g() {
            var e = d.html.defaultTag();
            e ? d.$el.html("<".concat(e, ">").concat($e.MARKERS, "<br/></").concat(e, ">")) : d.$el.html("".concat($e.MARKERS, "<br/>")), d.selection.restore()
        }

        function m(e, t) {
            if ((-1 < e.innerHTML.indexOf("<span") || -1 < e.parentElement.innerHTML.indexOf("<span") || -1 < e.parentElement.parentElement.innerHTML.indexOf("<span")) && (e.classList.contains("fr-img-space-wrap") || e.parentElement.classList.contains("fr-img-space-wrap") || e.parentElement.parentElement.classList.contains("fr-img-space-wrap"))) {
                if (r(e.parentElement).is("p")) {
                    var n = e.parentElement.innerHTML;
                    return (n = n.replace(/<br>/g, "")).length < 1 ? e.parentElement.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != n && " " != n && "Backspace" == t.key ? u(t) : "&nbsp;" != n && " " != n && "Delete" == t.key && h(t), !0
                }
                if (r(e).is("p")) {
                    var a = e.innerHTML.replace(/<br>/g, "");
                    return a.length < 1 ? e.insertAdjacentHTML("afterbegin", "&nbsp;") : "&nbsp;" != a && " " != a && "Backspace" == t.key ? u(t) : "&nbsp;" != a && " " != a && "Delete" == t.key && h(t), !0
                }
            }
            return !1
        }

        function s(e) {
            var t = d.selection.element();
            if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
            if (e && b(e.which)) return !0;
            d.events.disableBlur();
            var n = e.which;
            if (16 === n) return !0;
            if ((f = n) === $e.KEYCODE.IME) return p = !0;
            p = !1;
            var a = E(n) && !v(e) && !e.altKey,
                r = n === $e.KEYCODE.BACKSPACE || n === $e.KEYCODE.DELETE;
            if ((d.selection.isFull() && !d.opts.keepFormatOnDelete && !d.placeholder.isVisible() || r && d.placeholder.isVisible() && d.opts.keepFormatOnDelete) && (a || r) && (g(), !E(n))) return e.preventDefault(), !0;
            if (n === $e.KEYCODE.ENTER) e.shiftKey || t.classList.contains("fr-inner") || t.parentElement.classList.contains("fr-inner") ? function o(e) {
                e.preventDefault(), e.stopPropagation(), d.opts.multiLine && (d.selection.isCollapsed() || d.selection.remove(), d.cursor.enter(!0))
            }(e) : function i(e) {
                d.opts.multiLine ? (d.helpers.isIOS() || (e.preventDefault(), e.stopPropagation()), d.selection.isCollapsed() || d.selection.remove(), d.cursor.enter()) : (e.preventDefault(), e.stopPropagation())
            }(e);
            else if (n === $e.KEYCODE.BACKSPACE && (e.metaKey || e.ctrlKey)) ! function s() {
                setTimeout(function() {
                    d.events.disableBlur(), d.events.focus()
                }, 0)
            }();
            else if (n !== $e.KEYCODE.BACKSPACE || v(e) || e.altKey)
                if (n !== $e.KEYCODE.DELETE || v(e) || e.altKey || e.shiftKey) n === $e.KEYCODE.SPACE ? function l(e) {
                    var t = d.selection.element();
                    if (!d.helpers.isMobile() && t && "A" === t.tagName) {
                        e.preventDefault(), e.stopPropagation(), d.selection.isCollapsed() || d.selection.remove();
                        var n = d.markers.insert();
                        if (n) {
                            var a = n.previousSibling;
                            !n.nextSibling && n.parentNode && "A" === n.parentNode.tagName ? (n.parentNode.insertAdjacentHTML("afterend", "&nbsp;".concat($e.MARKERS)), n.parentNode.removeChild(n)) : (a && a.nodeType === Node.TEXT_NODE && 1 === a.textContent.length && 160 === a.textContent.charCodeAt(0) ? a.textContent += " " : n.insertAdjacentHTML("beforebegin", "&nbsp;"), n.outerHTML = $e.MARKERS), d.selection.restore()
                        }
                    }
                }(e) : n === $e.KEYCODE.TAB ? function c(e) {
                    if (0 < d.opts.tabSpaces)
                        if (d.selection.isCollapsed()) {
                            d.undo.saveStep(), e.preventDefault(), e.stopPropagation();
                            for (var t = "", n = 0; n < d.opts.tabSpaces; n++) t += "&nbsp;";
                            d.html.insert(t), d.placeholder.refresh(), d.undo.saveStep()
                        } else e.preventDefault(), e.stopPropagation(), e.shiftKey ? d.commands.outdent() : d.commands.indent()
                }(e) : v(e) || !E(e.which) || d.selection.isCollapsed() || e.ctrlKey || e.altKey || d.selection.remove();
                else {
                    if (m(t, e)) return e.preventDefault(), void e.stopPropagation();
                    d.placeholder.isVisible() ? (d.opts.keepFormatOnDelete || g(), e.preventDefault(), e.stopPropagation()) : h(e)
                }
            else {
                if (m(t, e)) return e.preventDefault(), void e.stopPropagation();
                d.placeholder.isVisible() ? (d.opts.keepFormatOnDelete || g(), e.preventDefault(), e.stopPropagation()) : u(e)
            }
            d.events.enableBlur()
        }

        function l() {
            if (!d.$wp) return !0;
            var e;
            d.opts.height || d.opts.heightMax ? (e = d.position.getBoundingRect().top, (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top), e > d.$wp.offset().top - d.helpers.scrollTop() + d.$wp.height() - 20 && d.$wp.scrollTop(e + d.$wp.scrollTop() - (d.$wp.height() + d.$wp.offset().top) + d.helpers.scrollTop() + 20)) : (e = d.position.getBoundingRect().top, d.opts.toolbarBottom && (e += d.opts.toolbarStickyOffset), (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top, e -= d.helpers.scrollTop()), (e += d.opts.toolbarStickyOffset) > d.o_win.innerHeight - 20 && r(d.o_win).scrollTop(e + d.helpers.scrollTop() - d.o_win.innerHeight + 20), e = d.position.getBoundingRect().top, d.opts.toolbarBottom || (e -= d.opts.toolbarStickyOffset), (d.helpers.isIOS() || d.helpers.isAndroid()) && (e -= d.helpers.scrollTop()), d.opts.iframe && (e += d.$iframe.offset().top, e -= d.helpers.scrollTop()), e < 100 && r(d.o_win).scrollTop(e + d.helpers.scrollTop() - 100))
        }

        function c(e) {
            var t = d.selection.element();
            if (t && 0 <= ["INPUT", "TEXTAREA"].indexOf(t.tagName)) return !0;
            if (e && 0 === e.which && f && (e.which = f), d.helpers.isAndroid() && d.browser.mozilla) return !0;
            if (p) return !1;
            if (e && d.helpers.isIOS() && e.which === $e.KEYCODE.ENTER && d.doc.execCommand("undo"), !d.selection.isCollapsed()) return !0;
            if (e && (e.which === $e.KEYCODE.META || e.which === $e.KEYCODE.CTRL)) return !0;
            if (e && b(e.which)) return !0;
            if (e && !d.helpers.isIOS() && (e.which === $e.KEYCODE.ENTER || e.which === $e.KEYCODE.BACKSPACE || 37 <= e.which && e.which <= 40 && !d.browser.msie)) try {
                l()
            } catch (a) {}
            var n = d.selection.element();
            (function r(e) {
                if (!e) return !1;
                var t = e.innerHTML;
                return !!((t = t.replace(/<span[^>]*? class\s*=\s*["']?fr-marker["']?[^>]+>\u200b<\/span>/gi, "")) && /\u200B/.test(t) && 0 < t.replace(/\u200B/gi, "").length)
            })(n) && !d.node.hasClass(n, "fr-marker") && "IFRAME" !== n.tagName && function o(e) {
                return !d.helpers.isIOS() || 0 === ((e.textContent || "").match(/[\u3041-\u3096\u30A0-\u30FF\u4E00-\u9FFF\u3130-\u318F\uAC00-\uD7AF]/gi) || []).length
            }(n) && (d.selection.save(), function i(e) {
                for (var t = d.doc.createTreeWalker(e, NodeFilter.SHOW_TEXT, d.node.filter(function(e) {
                        return /\u200B/gi.test(e.textContent)
                    }), !1); t.nextNode();) {
                    var n = t.currentNode;
                    n.textContent = n.textContent.replace(/\u200B/gi, "")
                }
            }(n), d.selection.restore())
        }

        function v(e) {
            if (-1 !== navigator.userAgent.indexOf("Mac OS X")) {
                if (e.metaKey && !e.altKey) return !0
            } else if (e.ctrlKey && !e.altKey) return !0;
            return !1
        }

        function b(e) {
            if (e >= $e.KEYCODE.ARROW_LEFT && e <= $e.KEYCODE.ARROW_DOWN) return !0
        }

        function E(e) {
            if (e >= $e.KEYCODE.ZERO && e <= $e.KEYCODE.NINE) return !0;
            if (e >= $e.KEYCODE.NUM_ZERO && e <= $e.KEYCODE.NUM_MULTIPLY) return !0;
            if (e >= $e.KEYCODE.A && e <= $e.KEYCODE.Z) return !0;
            if (d.browser.webkit && 0 === e) return !0;
            switch (e) {
                case $e.KEYCODE.SPACE:
                case $e.KEYCODE.QUESTION_MARK:
                case $e.KEYCODE.NUM_PLUS:
                case $e.KEYCODE.NUM_MINUS:
                case $e.KEYCODE.NUM_PERIOD:
                case $e.KEYCODE.NUM_DIVISION:
                case $e.KEYCODE.SEMICOLON:
                case $e.KEYCODE.FF_SEMICOLON:
                case $e.KEYCODE.DASH:
                case $e.KEYCODE.EQUALS:
                case $e.KEYCODE.FF_EQUALS:
                case $e.KEYCODE.COMMA:
                case $e.KEYCODE.PERIOD:
                case $e.KEYCODE.SLASH:
                case $e.KEYCODE.APOSTROPHE:
                case $e.KEYCODE.SINGLE_QUOTE:
                case $e.KEYCODE.OPEN_SQUARE_BRACKET:
                case $e.KEYCODE.BACKSLASH:
                case $e.KEYCODE.CLOSE_SQUARE_BRACKET:
                    return !0;
                default:
                    return !1
            }
        }

        function T(e) {
            var t = e.which;
            if (v(e) || 37 <= t && t <= 40 || !E(t) && t !== $e.KEYCODE.DELETE && t !== $e.KEYCODE.BACKSPACE && t !== $e.KEYCODE.ENTER && t !== $e.KEYCODE.IME) return !0;
            n || (a = d.snapshot.get(), d.undo.canDo() || d.undo.saveStep()), clearTimeout(n), n = setTimeout(function() {
                n = null, d.undo.saveStep()
            }, Math.max(250, d.opts.typingTimer))
        }

        function A(e) {
            var t = e.which;
            if (v(e) || 37 <= t && t <= 40) return !0;
            a && n ? (d.undo.saveStep(a), a = null) : void 0 !== t && 0 !== t || a || n || d.undo.saveStep()
        }

        function C(e) {
            if (e && "BR" === e.tagName) return !1;
            try {
                return 0 === (e.textContent || "").length && e.querySelector && !e.querySelector(":scope > br") || e.childNodes && 1 === e.childNodes.length && e.childNodes[0].getAttribute && ("false" === e.childNodes[0].getAttribute("contenteditable") || d.node.hasClass(e.childNodes[0], "fr-img-caption"))
            } catch (t) {
                return !1
            }
        }

        function S(e) {
            var t = d.el.childNodes,
                n = d.html.defaultTag(),
                a = d.node.blockParent(d.selection.blocks()[0]);
            return a && "TR" == a.tagName && a.getAttribute("contenteditable") == undefined && (a = a.closest("table")), !d.node.isEditable(e.target) || a && "false" === a.getAttribute("contenteditable") ? d.toolbar.disable() : d.toolbar.enable(), !(!e.target || e.target === d.el) || (0 === t.length || void(t[0].offsetHeight + t[0].offsetTop <= e.offsetY ? C(t[t.length - 1]) && (n ? d.$el.append("<".concat(n, ">").concat($e.MARKERS, "<br></").concat(n, ">")) : d.$el.append("".concat($e.MARKERS, "<br>")), d.selection.restore(), l()) : e.offsetY <= 10 && C(t[0]) && (n ? d.$el.prepend("<".concat(n, ">").concat($e.MARKERS, "<br></").concat(n, ">")) : d.$el.prepend("".concat($e.MARKERS, "<br>")), d.selection.restore(), l())))
        }

        function y() {
            n && clearTimeout(n)
        }

        return {
            _init: function R() {
                d.events.on("keydown", T), d.events.on("input", e), d.events.on("mousedown", i), d.events.on("keyup input", A), d.events.on("keypress", o), d.events.on("keydown", s), d.events.on("keyup", c), d.events.on("destroy", y), d.events.on("html.inserted", c), d.events.on("cut", t), d.opts.multiLine && d.events.on("click", S)
            },
            ctrlKey: v,
            isCharacter: E,
            isArrow: b,
            forceUndo: function L() {
                n && (clearTimeout(n), d.undo.saveStep(), a = null)
            },
            isIME: function w() {
                return p
            },
            isBrowserAction: function _(e) {
                var t = e.which;
                return v(e) || t === $e.KEYCODE.F5
            },
            positionCaret: l
        }
    }, Object.assign($e.DEFAULTS, {
        pastePlain: !1,
        pasteDeniedTags: ["colgroup", "col", "meta"],
        pasteDeniedAttrs: ["class", "id"],
        pasteAllowedStyleProps: [".*"],
        pasteAllowLocalImages: !1
    }), $e.MODULES.paste = function(L) {
        var i, s, o, w, _ = L.$;

        function n(e, t) {
            try {
                L.win.localStorage.setItem("fr-copied-html", e), L.win.localStorage.setItem("fr-copied-text", t)
            } catch (n) {}
        }

        function e(e) {
            var t = L.html.getSelected();
            n(t, _(L.doc.createElement("div")).html(t).text()), "cut" === e.type && (L.undo.saveStep(), setTimeout(function() {
                L.selection.save(), L.html.wrap(), L.selection.restore(), L.events.focus(), L.undo.saveStep()
            }, 0))
        }

        var l = !1;

        function t(e) {
            if ("INPUT" === e.target.nodeName && "text" === e.target.type) return !0;
            if (L.edit.isDisabled()) return !1;
            if (c(e.target)) return !1;
            if (l) return !1;
            if (e.originalEvent && (e = e.originalEvent), !1 === L.events.trigger("paste.before", [e])) return e.preventDefault(), !1;
            if (e && e.clipboardData && e.clipboardData.getData) {
                var t = "",
                    n = e.clipboardData.types;
                if (L.helpers.isArray(n))
                    for (var a = 0; a < n.length; a++) t += "".concat(n[a], ";");
                else t = n;
                if (i = "", /text\/rtf/.test(t) && (s = e.clipboardData.getData("text/rtf")), /text\/html/.test(t) && !L.browser.safari ? i = e.clipboardData.getData("text/html") : /text\/rtf/.test(t) && L.browser.safari ? i = s : /public.rtf/.test(t) && L.browser.safari && (i = e.clipboardData.getData("text/rtf")), "" !== i) return d(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1;
                i = null
            }
            return function r() {
                L.selection.save(), L.events.disableBlur(), i = null, o ? (o.html(""), L.browser.edge && L.opts.iframe && L.$el.append(o)) : (o = _('<div contenteditable="true" style="position: fixed; top: 0; left: -9999px; height: 100%; width: 0; word-break: break-all; overflow:hidden; z-index: 2147483647; line-height: 140%; -moz-user-select: text; -webkit-user-select: text; -ms-user-select: text; user-select: text;" tabIndex="-1"></div>'), L.browser.webkit || L.browser.mozilla ? (o.css("top", L.$sc.scrollTop()), L.$el.after(o)) : L.browser.edge && L.opts.iframe ? L.$el.append(o) : L.$box.after(o), L.events.on("destroy", function() {
                    o.remove()
                }));
                var e;
                L.helpers.isIOS() && L.$sc && (e = L.$sc.scrollTop());
                L.opts.iframe && L.$el.attr("contenteditable", "false");
                o.focus(), L.helpers.isIOS() && L.$sc && L.$sc.scrollTop(e);
                L.win.setTimeout(d, 1)
            }(), !1
        }

        function c(e) {
            return e && "false" === e.contentEditable
        }

        function a(e) {
            if (e.originalEvent && (e = e.originalEvent), c(e.target)) return !1;
            if (e && e.dataTransfer && e.dataTransfer.getData) {
                var t = "",
                    n = e.dataTransfer.types;
                if (L.helpers.isArray(n))
                    for (var a = 0; a < n.length; a++) t += "".concat(n[a], ";");
                else t = n;
                if (i = "", /text\/rtf/.test(t) && (s = e.dataTransfer.getData("text/rtf")), /text\/html/.test(t) ? i = e.dataTransfer.getData("text/html") : /text\/rtf/.test(t) && L.browser.safari ? i = s : /text\/plain/.test(t) && !this.browser.mozilla && (i = L.html.escapeEntities(e.dataTransfer.getData("text/plain")).replace(/\n/g, "<br>")), "" !== i) {
                    L.keys.forceUndo(), w = L.snapshot.get(), L.selection.save(), L.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-helper");
                    var r = L.markers.insertAtPoint(e);
                    if (L.$el.find(".fr-marker").removeClass("fr-marker").addClass("fr-marker-placeholder"), L.$el.find(".fr-marker-helper").addClass("fr-marker").removeClass("fr-marker-helper"), L.selection.restore(), L.selection.remove(), L.$el.find(".fr-marker-placeholder").addClass("fr-marker").removeClass("fr-marker-placeholder"), !1 !== r) {
                        var o = L.el.querySelector(".fr-marker");
                        return _(o).replaceWith($e.MARKERS), L.selection.restore(), d(), e.preventDefault && (e.stopPropagation(), e.preventDefault()), !1
                    }
                } else i = null
            }
        }

        function d() {
            L.opts.iframe && L.$el.attr("contenteditable", "true"), L.browser.edge && L.opts.iframe && L.$box.after(o), w || (L.keys.forceUndo(), w = L.snapshot.get()), i || (i = o.get(0).innerHTML, L.selection.restore(), L.events.enableBlur());
            var e = i.match(/(class="?Mso|class='?Mso|class="?Xl|class='?Xl|class=Xl|style="[^"]*\bmso-|style='[^']*\bmso-|w:WordDocument|LibreOffice)/gi),
                t = L.events.chainTrigger("paste.beforeCleanup", i);
            t && "string" == typeof t && (i = t), (!e || e && !1 !== L.events.trigger("paste.wordPaste", [i])) && r(i, e)
        }

        function O(e) {
            for (var t = "", n = 0; n++ < e;) t += "&nbsp;";
            return t
        }

        function r(e, t, n) {
            var a, r = null,
                o = null;
            if (0 <= e.toLowerCase().indexOf("<body")) {
                var i = "";
                0 <= e.indexOf("<style") && (i = e.replace(/[.\s\S\w\W<>]*(<style[^>]*>[\s]*[.\s\S\w\W<>]*[\s]*<\/style>)[.\s\S\w\W<>]*/gi, "$1")), e = (e = i + e.replace(/[.\s\S\w\W<>]*<body[^>]*>[\s]*([.\s\S\w\W<>]*)[\s]*<\/body>[.\s\S\w\W<>]*/gi, "$1")).replace(/ \n/g, " ").replace(/\n /g, " ").replace(/([^>])\n([^<])/g, "$1 $2")
            }
            var s = !1;
            0 <= e.indexOf('id="docs-internal-guid') && (e = e.replace(/^[\w\W\s\S]* id="docs-internal-guid[^>]*>([\w\W\s\S]*)<\/b>[\w\W\s\S]*$/g, "$1"), s = !0), 0 <= e.indexOf('content="Sheets"') && (e = e.replace(/width:0px;/g, ""));
            var l = !1;
            if (!t)
                if ((l = function A(e) {
                        var t = null;
                        try {
                            t = L.win.localStorage.getItem("fr-copied-text")
                        } catch (n) {}
                        return !(!t || _("<div>").html(e).text().replace(/\u00A0/gi, " ").replace(/\r|\n/gi, "") !== t.replace(/\u00A0/gi, " ").replace(/\r|\n/gi, ""))
                    }(e)) && (e = L.win.localStorage.getItem("fr-copied-html")), l) e = L.clean.html(e, L.opts.pasteDeniedTags, L.opts.pasteDeniedAttrs);
                else {
                    var c = L.opts.htmlAllowedStyleProps;
                    L.opts.htmlAllowedStyleProps = L.opts.pasteAllowedStyleProps, L.opts.htmlAllowComments = !1, e = (e = (e = e.replace(/<span class="Apple-tab-span">\s*<\/span>/g, O(L.opts.tabSpaces || 4))).replace(/<span class="Apple-tab-span" style="white-space:pre">(\t*)<\/span>/g, function(e, t) {
                        return O(t.length * (L.opts.tabSpaces || 4))
                    })).replace(/\t/g, O(L.opts.tabSpaces || 4)), e = L.clean.html(e, L.opts.pasteDeniedTags, L.opts.pasteDeniedAttrs), L.opts.htmlAllowedStyleProps = c, L.opts.htmlAllowComments = !0, e = (e = (e = N(e)).replace(/\r/g, "")).replace(/^ */g, "").replace(/ *$/g, "")
                }!t || L.wordPaste && n || (0 === (e = e.replace(/^\n*/g, "").replace(/^ /g, "")).indexOf("<colgroup>") && (e = "<table>".concat(e, "</table>")), e = N(e = function C(e) {
                var t;
                e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = (e = e.replace(/<p(.*?)class="?'?MsoListParagraph"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li>$3</li></ul>")).replace(/<p(.*?)class="?'?NumberedText"?'? ([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li>$3</li></ol>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ul><li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpFirst"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<ol><li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?NumberedTextCxSpMiddle"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListBullet"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li>")).replace(/<p(.*?)class="?'?MsoListParagraphCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ul>")).replace(/<p(.*?)class="?'?NumberedTextCxSpLast"?'?([\s\S]*?)(level\d)?([\s\S]*?)>([\s\S]*?)<\/p>/gi, "<li$3>$5</li></ol>")).replace(/<span([^<]*?)style="?'?mso-list:Ignore"?'?([\s\S]*?)>([\s\S]*?)<span/gi, "<span><span")).replace(/<!--\[if !supportLists\]-->([\s\S]*?)<!--\[endif\]-->/gi, "")).replace(/<!\[if !supportLists\]>([\s\S]*?)<!\[endif\]>/gi, "")).replace(/(\n|\r| class=(")?Mso[a-zA-Z0-9]+(")?)/gi, " ")).replace(/<!--[\s\S]*?-->/gi, "")).replace(/<(\/)*(meta|link|span|\\?xml:|st1:|o:|font)(.*?)>/gi, "");
                var n, a = ["style", "script", "applet", "embed", "noframes", "noscript"];
                for (t = 0; t < a.length; t++) {
                    var r = new RegExp("<".concat(a[t], ".*?").concat(a[t], "(.*?)>"), "gi");
                    e = e.replace(r, "")
                }
                for (e = (e = (e = e.replace(/&nbsp;/gi, " ")).replace(/<td([^>]*)><\/td>/g, "<td$1><br></td>")).replace(/<th([^>]*)><\/th>/g, "<th$1><br></th>");
                    (e = (n = e).replace(/<[^/>][^>]*><\/[^>]+>/gi, "")) !== n;);
                e = (e = e.replace(/<lilevel([^1])([^>]*)>/gi, '<li data-indent="true"$2>')).replace(/<lilevel1([^>]*)>/gi, "<li$1>"), e = (e = (e = L.clean.html(e, L.opts.pasteDeniedTags, L.opts.pasteDeniedAttrs)).replace(/<a>(.[^<]+)<\/a>/gi, "$1")).replace(/<br> */g, "<br>");
                var o = L.o_doc.createElement("div");
                o.innerHTML = e;
                var i = o.querySelectorAll("li[data-indent]");
                for (t = 0; t < i.length; t++) {
                    var s = i[t],
                        l = s.previousElementSibling;
                    if (l && "LI" === l.tagName) {
                        var c = l.querySelector(":scope > ul, :scope > ol");
                        c || (c = document.createElement("ul"), l.appendChild(c)), c.appendChild(s)
                    } else s.removeAttribute("data-indent")
                }
                return L.html.cleanBlankSpaces(o), e = o.innerHTML
            }(e))), L.opts.pastePlain && !l && (e = function S(e) {
                var t, n = null,
                    a = L.doc.createElement("div");
                a.innerHTML = e;
                var r = a.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote");
                for (t = 0; t < r.length; t++)(n = r[t]).outerHTML = "<".concat(L.html.defaultTag() || "DIV", ">").concat(n.innerHTML, "</").concat(L.html.defaultTag() || "DIV", ">");
                for (t = (r = a.querySelectorAll("*:not(".concat("p, div, h1, h2, h3, h4, h5, h6, pre, blockquote, ul, ol, li, table, tbody, thead, tr, td, br, img".split(",").join("):not("), ")"))).length - 1; 0 <= t; t--)(n = r[t]).outerHTML = n.innerHTML;
                return function o(e) {
                    for (var t = L.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType !== Node.TEXT_NODE && t[n].nodeType !== Node.ELEMENT_NODE ? t[n].parentNode.removeChild(t[n]) : o(t[n])
                }(a), a.innerHTML
            }(e));
            var d = L.events.chainTrigger("paste.afterCleanup", e);
            if ("string" == typeof d && (e = d), "" !== e) {
                var f = L.o_doc.createElement("div");
                0 <= (f.innerHTML = e).indexOf("<body>") ? (L.html.cleanBlankSpaces(f), L.spaces.normalize(f, !0)) : L.spaces.normalize(f);
                var p = f.getElementsByTagName("span");
                for (a = p.length - 1; 0 <= a; a--) {
                    var u = p[a];
                    0 === u.attributes.length && (u.outerHTML = u.innerHTML)
                }
                if (!0 === L.opts.linkAlwaysBlank) {
                    var h = f.getElementsByTagName("a");
                    for (a = h.length - 1; 0 <= a; a--) {
                        var g = h[a];
                        g.getAttribute("target") || g.setAttribute("target", "_blank")
                    }
                }
                var m = L.selection.element(),
                    v = !1;
                if (m && _(m).parentsUntil(L.el, "ul, ol").length && (v = !0), v) {
                    var b = f.children;
                    1 === b.length && 0 <= ["OL", "UL"].indexOf(b[0].tagName) && (b[0].outerHTML = b[0].innerHTML)
                }
                if (!s) {
                    var E = f.getElementsByTagName("br");
                    for (a = E.length - 1; 0 <= a; a--) {
                        var T = E[a];
                        L.node.isBlock(T.previousSibling) && T.parentNode.removeChild(T)
                    }
                }
                if (L.opts.enter === $e.ENTER_BR)
                    for (a = (r = f.querySelectorAll("p, div")).length - 1; 0 <= a; a--) 0 === (o = r[a]).attributes.length && (o.outerHTML = o.innerHTML + (o.nextSibling && !L.node.isEmpty(o) ? "<br>" : ""));
                else if (L.opts.enter === $e.ENTER_DIV)
                    for (a = (r = f.getElementsByTagName("p")).length - 1; 0 <= a; a--) 0 === (o = r[a]).attributes.length && (o.outerHTML = "<div>".concat(o.innerHTML, "</div>"));
                else L.opts.enter === $e.ENTER_P && 1 === f.childNodes.length && "P" === f.childNodes[0].tagName && 0 === f.childNodes[0].attributes.length && (f.childNodes[0].outerHTML = f.childNodes[0].innerHTML);
                e = f.innerHTML, l && (e = function y(e) {
                    var t, n = L.o_doc.createElement("div");
                    n.innerHTML = e;
                    var a = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat($e.VOID_ELEMENTS.join("):not("), "):not(").concat(L.opts.htmlAllowedEmptyTags.join("):not("), ")"));
                    for (; a.length;) {
                        for (t = 0; t < a.length; t++) a[t].parentNode.removeChild(a[t]);
                        a = n.querySelectorAll("*:empty:not(td):not(th):not(tr):not(iframe):not(svg):not(".concat($e.VOID_ELEMENTS.join("):not("), "):not(").concat(L.opts.htmlAllowedEmptyTags.join("):not("), ")"))
                    }
                    return n.innerHTML
                }(e)), L.html.insert(e, !0)
            }! function R() {
                L.events.trigger("paste.after")
            }(), L.undo.saveStep(w), w = null, L.undo.saveStep()
        }

        function f(e) {
            for (var t = e.length - 1; 0 <= t; t--) e[t].attributes && e[t].attributes.length && e.splice(t, 1);
            return e
        }

        function N(e) {
            var t, n = L.o_doc.createElement("div");
            n.innerHTML = e;
            for (var a = f(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])"))); a.length;) {
                var r = a[a.length - 1];
                if (L.html.defaultTag() && "div" !== L.html.defaultTag()) r.querySelector(L.html.blockTagsQuery()) ? r.outerHTML = r.innerHTML : r.outerHTML = "<".concat(L.html.defaultTag(), ">").concat(r.innerHTML, "</").concat(L.html.defaultTag(), ">");
                else {
                    var o = r.querySelectorAll("*");
                    !o.length || "BR" !== o[o.length - 1].tagName && 0 === r.innerText.length ? r.outerHTML = r.innerHTML + (r.nextSibling ? "<br>" : "") : !o.length || "BR" !== o[o.length - 1].tagName || o[o.length - 1].nextSibling ? r.outerHTML = r.innerHTML + (r.nextSibling ? "<br>" : "") : r.outerHTML = r.innerHTML
                }
                a = f(Array.prototype.slice.call(n.querySelectorAll(":scope > div:not([style]), td > div:not([style]), th > div:not([style]), li > div:not([style])")))
            }
            for (a = f(Array.prototype.slice.call(n.querySelectorAll("div:not([style])"))); a.length;) {
                for (t = 0; t < a.length; t++) {
                    var i = a[t],
                        s = i.innerHTML.replace(/\u0009/gi, "").trim();
                    i.outerHTML = s
                }
                a = f(Array.prototype.slice.call(n.querySelectorAll("div:not([style])")))
            }
            return n.innerHTML
        }

        function p() {
            L.el.removeEventListener("copy", e), L.el.removeEventListener("cut", e), L.el.removeEventListener("paste", t)
        }

        return {
            _init: function u() {
                L.el.addEventListener("copy", e), L.el.addEventListener("cut", e), L.el.addEventListener("paste", t, { capture: !0 }), L.events.on("drop", a), L.browser.msie && L.browser.version < 11 && (L.events.on("mouseup", function(e) {
                    2 === e.button && (setTimeout(function() {
                        l = !1
                    }, 50), l = !0)
                }, !0), L.events.on("beforepaste", t)), L.events.on("destroy", p)
            },
            cleanEmptyTagsAndDivs: N,
            getRtfClipboard: function h() {
                return s
            },
            saveCopiedText: n,
            clean: r
        }
    }, Object.assign($e.DEFAULTS, {
        shortcutsEnabled: [],
        shortcutsHint: !0
    }), $e.SHORTCUTS_MAP = {}, $e.RegisterShortcut = function(e, t, n, a, r, o) {
        $e.SHORTCUTS_MAP[(r ? "^" : "") + (o ? "@" : "") + e] = {
            cmd: t,
            val: n,
            letter: a,
            shift: r,
            option: o
        }, $e.DEFAULTS.shortcutsEnabled.push(t)
    }, $e.RegisterShortcut($e.KEYCODE.E, "show", null, "E", !1, !1), $e.RegisterShortcut($e.KEYCODE.B, "bold", null, "B", !1, !1), $e.RegisterShortcut($e.KEYCODE.I, "italic", null, "I", !1, !1), $e.RegisterShortcut($e.KEYCODE.U, "underline", null, "U", !1, !1), $e.RegisterShortcut($e.KEYCODE.S, "strikeThrough", null, "S", !1, !1), $e.RegisterShortcut($e.KEYCODE.CLOSE_SQUARE_BRACKET, "indent", null, "]", !1, !1), $e.RegisterShortcut($e.KEYCODE.OPEN_SQUARE_BRACKET, "outdent", null, "[", !1, !1), $e.RegisterShortcut($e.KEYCODE.Z, "undo", null, "Z", !1, !1), $e.RegisterShortcut($e.KEYCODE.Z, "redo", null, "Z", !0, !1), $e.RegisterShortcut($e.KEYCODE.Y, "redo", null, "Y", !1, !1), $e.MODULES.shortcuts = function(s) {
        var a = null;
        var l = !1;

        function e(e) {
            if (!s.core.hasFocus()) return !0;
            var t = e.which,
                n = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
            if ("keyup" === e.type && l && t !== $e.KEYCODE.META) return l = !1;
            "keydown" === e.type && (l = !1);
            var a = (e.shiftKey ? "^" : "") + (e.altKey ? "@" : "") + t,
                r = s.node.blockParent(s.selection.blocks()[0]);
            if (r && "TR" == r.tagName && r.getAttribute("contenteditable") == undefined && (r = r.closest("table")), n && $e.SHORTCUTS_MAP[a] && (!r || "false" !== r.getAttribute("contenteditable"))) {
                var o = $e.SHORTCUTS_MAP[a].cmd;
                if (o && 0 <= s.opts.shortcutsEnabled.indexOf(o)) {
                    var i = $e.SHORTCUTS_MAP[a].val;
                    if (!1 === s.events.trigger("shortcut", [e, o, i])) return !(l = !0);
                    if (o && (s.commands[o] || $e.COMMANDS[o] && $e.COMMANDS[o].callback)) return e.preventDefault(), e.stopPropagation(), "keydown" === e.type && ((s.commands[o] || $e.COMMANDS[o].callback)(), l = !0), !1
                }
            }
        }

        return {
            _init: function t() {
                s.events.on("keydown", e, !0), s.events.on("keyup", e, !0)
            },
            get: function r(e) {
                if (!s.opts.shortcutsHint) return null;
                if (!a)
                    for (var t in a = {}, $e.SHORTCUTS_MAP) Object.prototype.hasOwnProperty.call($e.SHORTCUTS_MAP, t) && 0 <= s.opts.shortcutsEnabled.indexOf($e.SHORTCUTS_MAP[t].cmd) && (a["".concat($e.SHORTCUTS_MAP[t].cmd, ".").concat($e.SHORTCUTS_MAP[t].val || "")] = {
                        shift: $e.SHORTCUTS_MAP[t].shift,
                        option: $e.SHORTCUTS_MAP[t].option,
                        letter: $e.SHORTCUTS_MAP[t].letter
                    });
                var n = a[e];
                return n ? (s.helpers.isMac() ? String.fromCharCode(8984) : "".concat(s.language.translate("Ctrl"), "+")) + (n.shift ? s.helpers.isMac() ? String.fromCharCode(8679) : "".concat(s.language.translate("Shift"), "+") : "") + (n.option ? s.helpers.isMac() ? String.fromCharCode(8997) : "".concat(s.language.translate("Alt"), "+") : "") + n.letter : null
            }
        }
    }, $e.MODULES.snapshot = function(l) {
        function n(e) {
            for (var t = e.parentNode.childNodes, n = 0, a = null, r = 0; r < t.length; r++) {
                if (a) {
                    var o = t[r].nodeType === Node.TEXT_NODE && "" === t[r].textContent,
                        i = a.nodeType === Node.TEXT_NODE && t[r].nodeType === Node.TEXT_NODE,
                        s = a.nodeType === Node.TEXT_NODE && "" === a.textContent;
                    o || i || s || n++
                }
                if (t[r] === e) return n;
                a = t[r]
            }
        }

        function r(e) {
            var t = [];
            if (!e.parentNode) return [];
            for (; !l.node.isElement(e);) t.push(n(e)), e = e.parentNode;
            return t.reverse()
        }

        function o(e, t) {
            for (; e && e.nodeType === Node.TEXT_NODE;) {
                var n = e.previousSibling;
                n && n.nodeType === Node.TEXT_NODE && (t += n.textContent.length), e = n
            }
            return t
        }

        function c(e) {
            for (var t = l.el, n = 0; n < e.length; n++) t = t.childNodes[e[n]];
            return t
        }

        function a(e, t) {
            try {
                var n = c(t.scLoc),
                    a = t.scOffset,
                    r = c(t.ecLoc),
                    o = t.ecOffset,
                    i = l.doc.createRange();
                i.setStart(n, a), i.setEnd(r, o), e.addRange(i)
            } catch (s) {}
        }

        return {
            get: function i() {
                var e, t = {};
                if (l.events.trigger("snapshot.before"), t.html = (l.$wp ? l.$el.html() : l.$oel.get(0).outerHTML).replace(/ style=""/g, ""), t.ranges = [], l.$wp && l.selection.inEditor() && l.core.hasFocus())
                    for (var n = l.selection.ranges(), a = 0; a < n.length; a++) t.ranges.push({
                        scLoc: r((e = n[a]).startContainer),
                        scOffset: o(e.startContainer, e.startOffset),
                        ecLoc: r(e.endContainer),
                        ecOffset: o(e.endContainer, e.endOffset)
                    });
                return l.events.trigger("snapshot.after", [t]), t
            },
            restore: function s(e) {
                l.$el.html() !== e.html && (l.opts.htmlExecuteScripts ? l.$el.html(e.html) : l.el.innerHTML = e.html);
                var t = l.selection.get();
                l.selection.clear(), l.events.focus(!0);
                for (var n = 0; n < e.ranges.length; n++) a(t, e.ranges[n])
            },
            equal: function d(e, t) {
                return e.html === t.html && (!l.core.hasFocus() || JSON.stringify(e.ranges) === JSON.stringify(t.ranges))
            }
        }
    }, $e.MODULES.undo = function(n) {
        function e(e) {
            var t = e.which;
            n.keys.ctrlKey(e) && (t === $e.KEYCODE.Z && e.shiftKey && e.preventDefault(), t === $e.KEYCODE.Z && e.preventDefault())
        }

        var t = null;

        function a() {
            if (n.undo_stack && !n.undoing)
                for (; n.undo_stack.length > n.undo_index;) n.undo_stack.pop()
        }

        function r() {
            n.undo_index = 0, n.undo_stack = []
        }

        function o() {
            n.undo_stack = []
        }

        return {
            _init: function i() {
                r(), n.events.on("initialized", function() {
                    t = (n.$wp ? n.$el.html() : n.$oel.get(0).outerHTML).replace(/ style=""/g, "")
                }), n.events.on("blur", function() {
                    n.el.querySelector(".fr-dragging") || n.undo.saveStep()
                }), n.events.on("keydown", e), n.events.on("destroy", o)
            },
            run: function s() {
                if (1 < n.undo_index) {
                    n.undoing = !0;
                    var e = n.undo_stack[--n.undo_index - 1];
                    clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.undo"), n.undoing = !1
                }
            },
            redo: function l() {
                if (n.undo_index < n.undo_stack.length) {
                    n.undoing = !0;
                    var e = n.undo_stack[n.undo_index++];
                    clearTimeout(n._content_changed_timer), n.snapshot.restore(e), t = e.html, n.popups.hideAll(), n.toolbar.enable(), n.events.trigger("contentChanged"), n.events.trigger("commands.redo"), n.undoing = !1
                }
            },
            canDo: function c() {
                return !(0 === n.undo_stack.length || n.undo_index <= 1)
            },
            canRedo: function d() {
                return n.undo_index !== n.undo_stack.length
            },
            dropRedo: a,
            reset: r,
            saveStep: function f(e) {
                !n.undo_stack || n.undoing || n.el.querySelector(".fr-marker") || (void 0 === e ? (e = n.snapshot.get(), n.undo_stack[n.undo_index - 1] && n.snapshot.equal(n.undo_stack[n.undo_index - 1], e) || (a(), n.undo_stack.push(e), n.undo_index++, e.html !== t && (n.events.trigger("contentChanged"), t = e.html))) : (a(), 0 < n.undo_index ? n.undo_stack[n.undo_index - 1] = e : (n.undo_stack.push(e), n.undo_index++)))
            }
        }
    }, Object.assign($e.DEFAULTS, {
        height: null,
        heightMax: null,
        heightMin: null,
        width: null
    }), $e.MODULES.size = function(e) {
        function t() {
            n(), e.opts.height && e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom"))), e.$iframe.height(e.$el.outerHeight(!0))
        }

        function n() {
            e.opts.heightMin ? e.$el.css("minHeight", e.opts.heightMin) : e.$el.css("minHeight", ""), e.opts.heightMax ? (e.$wp.css("maxHeight", e.opts.heightMax), e.$wp.css("overflow", "auto")) : (e.$wp.css("maxHeight", ""), e.$wp.css("overflow", "")), e.opts.height ? (e.$wp.css("height", e.opts.height), e.$wp.css("overflow", "auto"), e.$el.css("minHeight", e.opts.height - e.helpers.getPX(e.$el.css("padding-top")) - e.helpers.getPX(e.$el.css("padding-bottom")))) : (e.$wp.css("height", ""), e.opts.heightMin || e.$el.css("minHeight", ""), e.opts.heightMax || e.$wp.css("overflow", "")), e.opts.width && e.$box.width(e.opts.width)
        }

        return {
            _init: function a() {
                if (!e.$wp) return !1;
                n(), e.$iframe && (e.events.on("keyup keydown", function() {
                    setTimeout(t, 0)
                }, !0), e.events.on("commands.after html.set init initialized paste.after", t))
            },
            syncIframe: t,
            refresh: n
        }
    }, Object.assign($e.DEFAULTS, {
        documentReady: !1,
        editorClass: null,
        typingTimer: 500,
        iframe: !1,
        requestWithCORS: !0,
        requestWithCredentials: !1,
        requestHeaders: {},
        useClasses: !0,
        spellcheck: !0,
        iframeDefaultStyle: 'html{margin:0px;height:auto;}body{height:auto;padding:20px;background:transparent;color:#000000;position:relative;z-index: 2;-webkit-user-select:auto;margin:0px;overflow:hidden;min-height:20px;}body:after{content:"";display:block;clear:both;}body::-moz-selection{background:#b5d6fd;color:#000;}body::selection{background:#b5d6fd;color:#000;}',
        iframeStyle: "",
        iframeStyleFiles: [],
        direction: "rtl",
        zIndex: 1,
        tabIndex: null,
        disableRightClick: !1,
        scrollableContainer: "body",
        keepFormatOnDelete: !1,
        theme: null
    }), $e.MODULES.core = function(i) {
        var a = i.$;

        function n() {
            if (i.$box.addClass("fr-box".concat(i.opts.editorClass ? " ".concat(i.opts.editorClass) : "")), i.$box.attr("role", "application"), i.$wp.addClass("fr-wrapper"), i.opts.documentReady && i.$box.addClass("fr-document"), function r() {
                    i.opts.iframe || i.$el.addClass("fr-element fr-view")
                }(), i.opts.iframe) {
                i.$iframe.addClass("fr-iframe"), i.$el.addClass("fr-view");
                for (var e = 0; e < i.o_doc.styleSheets.length; e++) {
                    var t = void 0;
                    try {
                        t = i.o_doc.styleSheets[e].cssRules
                    } catch (o) {}
                    if (t)
                        for (var n = 0, a = t.length; n < a; n++) !t[n].selectorText || 0 !== t[n].selectorText.indexOf(".fr-view") && 0 !== t[n].selectorText.indexOf(".fr-element") || 0 < t[n].style.cssText.length && (0 === t[n].selectorText.indexOf(".fr-view") ? i.opts.iframeStyle += "".concat(t[n].selectorText.replace(/\.fr-view/g, "body"), "{").concat(t[n].style.cssText, "}") : i.opts.iframeStyle += "".concat(t[n].selectorText.replace(/\.fr-element/g, "body"), "{").concat(t[n].style.cssText, "}"))
                }
            }
            "auto" !== i.opts.direction && i.$box.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(i.opts.direction)), i.$el.attr("dir", i.opts.direction), i.$wp.attr("dir", i.opts.direction), 1 < i.opts.zIndex && i.$box.css("z-index", i.opts.zIndex), i.opts.theme && i.$box.addClass("".concat(i.opts.theme, "-theme")), i.opts.tabIndex = i.opts.tabIndex || i.$oel.attr("tabIndex"), i.opts.tabIndex && i.$el.attr("tabIndex", i.opts.tabIndex)
        }

        return {
            _init: function r() {
                if ($e.INSTANCES.push(i), function e() {
                        i.drag_support = {
                            filereader: "undefined" != typeof FileReader,
                            formdata: Boolean(i.win.FormData),
                            progress: "upload" in new XMLHttpRequest
                        }
                    }(), i.$wp) {
                    n(), i.html.set(i._original_html), i.$el.attr("spellcheck", i.opts.spellcheck), i.helpers.isMobile() && (i.$el.attr("autocomplete", i.opts.spellcheck ? "on" : "off"), i.$el.attr("autocorrect", i.opts.spellcheck ? "on" : "off"), i.$el.attr("autocapitalize", i.opts.spellcheck ? "on" : "off")), i.opts.disableRightClick && i.events.$on(i.$el, "contextmenu", function(e) {
                        if (2 === e.button) return e.preventDefault(), e.stopPropagation(), !1
                    });
                    try {
                        i.doc.execCommand("styleWithCSS", !1, !1)
                    } catch (t) {}
                }
                "TEXTAREA" === i.$oel.get(0).tagName && (i.events.on("contentChanged", function() {
                    i.$oel.val(i.html.get())
                }), i.events.on("form.submit", function() {
                    i.$oel.val(i.html.get())
                }), i.events.on("form.reset", function() {
                    i.html.set(i._original_html)
                }), i.$oel.val(i.html.get())), i.helpers.isIOS() && i.events.$on(i.$doc, "selectionchange", function() {
                    i.$doc.get(0).hasFocus() || i.$win.get(0).focus()
                }), i.events.trigger("init"), i.opts.autofocus && !i.opts.initOnClick && i.$wp && i.events.on("initialized", function() {
                    i.events.focus(!0)
                })
            },
            destroy: function t(e) {
                "TEXTAREA" === i.$oel.get(0).tagName && i.$oel.val(e), i.$box && i.$box.removeAttr("role"), i.$wp && ("TEXTAREA" === i.$oel.get(0).tagName ? (i.$el.html(""), i.$wp.html(""), i.$box.replaceWith(i.$oel), i.$oel.show()) : (i.$wp.replaceWith(e), i.$el.html(""), i.$box.removeClass("fr-view fr-ltr fr-box ".concat(i.opts.editorClass || "")), i.opts.theme && i.$box.addClass("".concat(i.opts.theme, "-theme")))), this.$wp = null, this.$el = null, this.el = null, this.$box = null
            },
            isEmpty: function e() {
                return i.node.isEmpty(i.el)
            },
            getXHR: function o(e, t) {
                var n = new XMLHttpRequest;
                for (var a in n.open(t, e, !0), i.opts.requestWithCredentials && (n.withCredentials = !0), i.opts.requestHeaders) Object.prototype.hasOwnProperty.call(i.opts.requestHeaders, a) && n.setRequestHeader(a, i.opts.requestHeaders[a]);
                return n
            },
            injectStyle: function s(e) {
                if (i.opts.iframe) {
                    i.$head.find("style[data-fr-style], link[data-fr-style]").remove(), i.$head.append('<style data-fr-style="true">'.concat(e, "</style>"));
                    for (var t = 0; t < i.opts.iframeStyleFiles.length; t++) {
                        var n = a('<link data-fr-style="true" rel="stylesheet" href="'.concat(i.opts.iframeStyleFiles[t], '">'));
                        n.get(0).addEventListener("load", i.size.syncIframe), i.$head.append(n)
                    }
                }
            },
            hasFocus: function l() {
                return i.browser.mozilla && i.helpers.isMobile() ? i.selection.inEditor() : i.node.hasFocus(i.el) || 0 < i.$el.find("*:focus").length
            },
            sameInstance: function c(e) {
                if (!e) return !1;
                var t = e.data("instance");
                return !!t && t.id === i.id
            }
        }
    }, $e.POPUP_TEMPLATES = { "text.edit": "[_EDIT_]" }, $e.RegisterTemplate = function(e, t) {
        $e.POPUP_TEMPLATES[e] = t
    }, $e.MODULES.popups = function(f) {
        var d = f.$;
        f.shared.popups || (f.shared.popups = {});
        var p, u = f.shared.popups;

        function h(e, t) {
            t.isVisible() || (t = f.$sc), t.is(u[e].data("container")) || (u[e].data("container", t), t.append(u[e]))
        }

        function i() {
            d(this).toggleClass("fr-not-empty", !0)
        }

        function s() {
            var e = d(this);
            e.toggleClass("fr-not-empty", "" !== e.val())
        }

        function g(e) {
            return u[e] && f.node.hasClass(u[e], "fr-active") && f.core.sameInstance(u[e]) || !1
        }

        function m(e) {
            for (var t in u)
                if (Object.prototype.hasOwnProperty.call(u, t) && g(t) && (void 0 === e || u[t].data("instance") === e)) return u[t];
            return !1
        }

        function n(e) {
            var t = null;
            if ((t = "string" != typeof e ? e : u[e]) && f.node.hasClass(t, "fr-active") && (t.removeClass("fr-active fr-above"), f.events.trigger("popups.hide.".concat(e)), f.$tb && (1 < f.opts.zIndex ? f.$tb.css("zIndex", f.opts.zIndex + 1) : f.$tb.css("zIndex", "")), f.events.disableBlur(), t.find("input, textarea, button").each(function() {
                    this === this.ownerDocument.activeElement && this.blur()
                }), t.find("input, textarea").attr("disabled", "disabled"), p))
                for (var n = 0; n < p.length; n++) d(p[n]).removeClass("fr-btn-active-popup")
        }

        function v(e) {
            for (var t in void 0 === e && (e = []), u) Object.prototype.hasOwnProperty.call(u, t) && e.indexOf(t) < 0 && n(t)
        }

        function t() {
            f.shared.exit_flag = !0
        }

        function b() {
            f.shared.exit_flag = !1
        }

        function o() {
            return f.shared.exit_flag
        }

        function l(e, t) {
            var n, a = function c(e, t) {
                    var n = $e.POPUP_TEMPLATES[e];
                    if (!n) return null;
                    for (var a in "function" == typeof n && (n = n.apply(f)), t) Object.prototype.hasOwnProperty.call(t, a) && (n = n.replace("[_".concat(a.toUpperCase(), "_]"), t[a]));
                    return n
                }(e, t),
                r = d(f.doc.createElement("DIV"));
            if (!a) return r.addClass("fr-popup fr-empty"), (n = d("body").first()).append(r), r.data("container", n), u[e] = r;
            r.addClass("fr-popup".concat(f.helpers.isMobile() ? " fr-mobile" : " fr-desktop").concat(f.opts.toolbarInline ? " fr-inline" : "")), r.html(a), f.opts.theme && r.addClass("".concat(f.opts.theme, "-theme")), 1 < f.opts.zIndex && (!f.opts.editInPopup && f.$tb ? f.$tb.css("z-index", f.opts.zIndex + 2) : r.css("z-index", f.opts.zIndex + 2)), "auto" !== f.opts.direction && r.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(f.opts.direction)), r.find("input, textarea").attr("dir", f.opts.direction).attr("disabled", "disabled"), (n = d("body").first()).append(r), r.data("container", n);
            var o = (u[e] = r).find(".fr-color-hex-layer");
            if (0 < o.length) {
                var i = f.helpers.getPX(r.find(".fr-color-set > span").css("width")),
                    s = f.helpers.getPX(o.css("paddingLeft")),
                    l = f.helpers.getPX(o.css("paddingRight"));
                o.css("width", i * f.opts.colorsStep + s + l)
            }
            return f.button.bindCommands(r, !1), r
        }

        function E(a) {
            var r = u[a];
            return {
                _windowResize: function() {
                    var e = r.data("instance") || f;
                    !e.helpers.isMobile() && r.isVisible() && (e.events.disableBlur(), e.popups.hide(a), e.events.enableBlur())
                },
                _inputFocus: function(e) {
                    var t = r.data("instance") || f,
                        n = d(e.currentTarget);
                    if (n.is("input:file") && n.closest(".fr-layer").addClass("fr-input-focus"), e.preventDefault(), e.stopPropagation(), setTimeout(function() {
                            t.events.enableBlur()
                        }, 100), t.helpers.isMobile()) {
                        var a = d(t.o_win).scrollTop();
                        setTimeout(function() {
                            d(t.o_win).scrollTop(a)
                        }, 0)
                    }
                },
                _inputBlur: function(e) {
                    var t = r.data("instance") || f,
                        n = d(e.currentTarget);
                    n.is("input:file") && n.closest(".fr-layer").removeClass("fr-input-focus"), document.activeElement !== this && d(this).isVisible() && (t.events.blurActive() && t.events.trigger("blur"), t.events.enableBlur())
                },
                _editorKeydown: function(e) {
                    var t = r.data("instance") || f;
                    t.keys.ctrlKey(e) || e.which === $e.KEYCODE.ALT || e.which === $e.KEYCODE.ESC || (g(a) && r.findVisible(".fr-back").length ? t.button.exec(r.findVisible(".fr-back").first()) : e.which !== $e.KEYCODE.ALT && t.popups.hide(a))
                },
                _preventFocus: function(e) {
                    var t = r.data("instance") || f,
                        n = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                    "mouseup" === e.type || d(n).is(":focus") || t.events.disableBlur(), "mouseup" !== e.type || d(n).hasClass("fr-command") || 0 < d(n).parents(".fr-command").length || d(n).hasClass("fr-dropdown-content") || f.button.hideActiveDropdowns(r), (f.browser.safari || f.browser.mozilla) && "mousedown" === e.type && d(n).is("input[type=file]") && t.events.disableBlur();
                    var a = "input, textarea, button, select, label, .fr-command";
                    if (n && !d(n).is(a) && 0 === d(n).parents(a).length) return e.stopPropagation(), !1;
                    n && d(n).is(a) && e.stopPropagation(), b()
                },
                _editorMouseup: function() {
                    r.isVisible() && o() && 0 < r.findVisible("input:focus, textarea:focus, button:focus, select:focus").length && f.events.disableBlur()
                },
                _windowMouseup: function(e) {
                    if (!f.core.sameInstance(r)) return !0;
                    var t = r.data("instance") || f;
                    r.isVisible() && o() && (e.stopPropagation(), t.markers.remove(), t.popups.hide(a), b())
                },
                _windowKeydown: function(e) {
                    if (!f.core.sameInstance(r)) return !0;
                    var t = r.data("instance") || f,
                        n = e.which;
                    if ($e.KEYCODE.ESC === n) {
                        if (t.popups.isVisible(a) && t.opts.toolbarInline) return e.stopPropagation(), t.popups.isVisible(a) && (r.findVisible(".fr-back").length ? (t.button.exec(r.findVisible(".fr-back").first()), t.accessibility.focusPopupButton(r)) : r.findVisible(".fr-dismiss").length ? t.button.exec(r.findVisible(".fr-dismiss").first()) : (t.popups.hide(a), t.toolbar.showInline(null, !0), t.accessibility.focusPopupButton(r))), !1;
                        if (t.popups.isVisible(a)) return r.findVisible(".fr-back").length ? (t.button.exec(r.findVisible(".fr-back").first), t.accessibility.focusPopupButton(r)) : r.findVisible(".fr-dismiss").length ? t.button.exec(r.findVisible(".fr-dismiss").first()) : (t.popups.hide(a), t.accessibility.focusPopupButton(r)), !1
                    }
                },
                _repositionPopup: function() {
                    if (!f.opts.height && !f.opts.heightMax || f.opts.toolbarInline) return !0;
                    if (f.$wp && g(a) && r.parent().get(0) === f.$sc.get(0)) {
                        var e = r.offset().top - f.$wp.offset().top,
                            t = f.$wp.outerHeight();
                        f.node.hasClass(r.get(0), "fr-above") && (e += r.outerHeight()), t < e || e < 0 ? r.addClass("fr-hidden") : r.removeClass("fr-hidden")
                    }
                }
            }
        }

        function c(e, t) {
            f.events.on("mouseup", e._editorMouseup, !0), f.$wp && f.events.on("keydown", e._editorKeydown), f.events.on("focus", function() {
                u[t].removeClass("focused")
            }), f.events.on("blur", function() {
                m() && f.markers.remove(), f.helpers.isMobile() ? u[t].hasClass("focused") ? (v(), u[t].removeClass("focused")) : u[t].addClass("focused") : u[t].find("iframe").length || v()
            }), f.$wp && !f.helpers.isMobile() && f.events.$on(f.$wp, "scroll.popup".concat(t), e._repositionPopup), f.events.on("window.mouseup", e._windowMouseup, !0), f.events.on("window.keydown", e._windowKeydown, !0), u[t].data("inst".concat(f.id), !0), f.events.on("destroy", function() {
                f.core.sameInstance(u[t]) && (d("body").first().append(u[t]), u[t].removeClass("fr-active"))
            }, !0)
        }

        function T() {
            var e = d(this).prev().children().first();
            e.attr("checked", !e.attr("checked"))
        }

        function e() {
            for (var e in u)
                if (Object.prototype.hasOwnProperty.call(u, e)) {
                    var t = u[e];
                    t && (t.html("").removeData().remove(), u[e] = null)
                }
            u = []
        }

        return f.shared.exit_flag = !1, {
            _init: function a() {
                f.events.on("shared.destroy", e, !0), f.events.on("window.mousedown", t), f.events.on("window.touchmove", b), f.events.$on(d(f.o_win), "scroll", b), f.events.on("mousedown", function(e) {
                    m() && (e.stopPropagation(), f.$el.find(".fr-marker").remove(), t(), f.events.disableBlur())
                })
            },
            create: function A(e, t) {
                var n = l(e, t),
                    a = E(e);
                c(a, e), f.events.$on(n, "mousedown mouseup touchstart touchend touch", "*", a._preventFocus, !0), f.events.$on(n, "focus", "input, textarea, button, select", a._inputFocus, !0), f.events.$on(n, "blur", "input, textarea, button, select", a._inputBlur, !0);
                var r = n.find("input, textarea");
                return function o(e) {
                    for (var t = 0; t < e.length; t++) {
                        var n = e[t],
                            a = d(n);
                        0 === a.next().length && a.attr("placeholder") && (a.after('<label for="'.concat(a.attr("id"), '">').concat(a.attr("placeholder"), "</label>")), a.attr("placeholder", ""))
                    }
                }(r), f.events.$on(r, "focus", i), f.events.$on(r, "blur change", s), f.events.$on(n, "click", ".fr-checkbox + label", T), f.accessibility.registerPopup(e), f.helpers.isIOS() && f.events.$on(n, "touchend", "label", function() {
                    d("#".concat(d(this).attr("for"))).prop("checked", function(e, t) {
                        return !t
                    })
                }, !0), f.events.$on(d(f.o_win), "resize", a._windowResize, !0), n
            },
            get: function r(e) {
                var t = u[e];
                return t && !t.data("inst".concat(f.id)) && c(E(e), e), t
            },
            show: function C(e, t, n, a, r) {
                if (g(e) || (m() && 0 < f.$el.find(".fr-marker").length ? (f.events.disableBlur(), f.selection.restore()) : m() || (f.events.disableBlur(), f.events.focus(), f.events.enableBlur())), v([e]), !u[e]) return !1;
                var o = f.button.getButtons(".fr-dropdown.fr-active");
                o.removeClass("fr-active").attr("aria-expanded", !1).parents(".fr-toolbar").css("zIndex", "").find("> .fr-dropdown-wrapper").css("height", ""), o.next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), u[e].data("instance", f), f.$tb && f.$tb.data("instance", f);
                var i = g(e);
                u[e].addClass("fr-active").removeClass("fr-hidden").find("input, textarea").removeAttr("disabled");
                var s = u[e].data("container");
                if (function d(e, t) {
                        t.isVisible() || (t = f.$sc), t.contains([u[e].get(0)]) || t.append(u[e])
                    }(e, s), f.opts.toolbarInline && s && f.$tb && s.get(0) === f.$tb.get(0) && (h(e, f.$sc), n = f.$tb.offset().top - f.helpers.getPX(f.$tb.css("margin-top")), t = f.$tb.offset().left + f.$tb.outerWidth() / 2, f.node.hasClass(f.$tb.get(0), "fr-above") && n && (n += f.$tb.outerHeight()), a = 0), s = u[e].data("container"), f.opts.iframe && !a && !i) {
                    var l = f.helpers.getPX(f.$wp.find(".fr-iframe").css("padding-top")),
                        c = f.helpers.getPX(f.$wp.find(".fr-iframe").css("padding-left"));
                    t && (t -= f.$iframe.offset().left + c), n && (n -= f.$iframe.offset().top + l)
                }
                s.is(f.$tb) ? f.$tb.css("zIndex", (f.opts.zIndex || 1) + 4) : u[e].css("zIndex", (f.opts.zIndex || 1) + 4), f.opts.toolbarBottom && s && f.$tb && s.get(0) === f.$tb.get(0) && (u[e].addClass("fr-above"), n && (n -= u[e].outerHeight())), r && (t -= u[e].width() / 2), t + u[e].outerWidth() > f.$sc.offset().left + f.$sc.width() && (t -= t + u[e].outerWidth() - f.$sc.offset().left - f.$sc.width()), t < f.$sc.offset().left && "rtl" === f.opts.direction && (t = f.$sc.offset().left), u[e].removeClass("fr-active"), f.position.at(t, n, u[e], a || 0), u[e].addClass("fr-active"), i || f.accessibility.focusPopup(u[e]), f.opts.toolbarInline && f.toolbar.hide(), f.$tb && (p = f.$tb.find(".fr-btn-active-popup")), f.events.trigger("popups.show.".concat(e)), E(e)._repositionPopup(), b()
            },
            hide: n,
            onHide: function S(e, t) {
                f.events.on("popups.hide.".concat(e), t)
            },
            hideAll: v,
            setContainer: h,
            refresh: function y(e) {
                u[e].data("instance", f), f.events.trigger("popups.refresh.".concat(e));
                for (var t = u[e].find(".fr-command"), n = 0; n < t.length; n++) {
                    var a = d(t[n]);
                    0 === a.parents(".fr-dropdown-menu").length && f.button.refresh(a)
                }
            },
            onRefresh: function R(e, t) {
                f.events.on("popups.refresh.".concat(e), t)
            },
            onShow: function L(e, t) {
                f.events.on("popups.show.".concat(e), t)
            },
            isVisible: g,
            areVisible: m
        }
    }, $e.MODULES.accessibility = function(f) {
        var p = f.$,
            o = !0;

        function l(t) {
            t && t.length && !f.$el.find('[contenteditable="true"]').is(":focus") && (t.data("blur-event-set") || t.parents(".fr-popup").length || (f.events.$on(t, "blur", function() {
                var e = t.parents(".fr-toolbar, .fr-popup").data("instance") || f;
                e.events.blurActive() && !f.core.hasFocus() && e.events.trigger("blur"), setTimeout(function() {
                    e.events.enableBlur()
                }, 100)
            }, !0), t.data("blur-event-set", !0)), (t.parents(".fr-toolbar, .fr-popup").data("instance") || f).events.disableBlur(), t.get(0).focus(), f.shared.$f_el = t)
        }

        function u(e, t) {
            var n = t ? "last" : "first",
                a = s(g(e))[n]();
            if (a.length) return l(a), !0
        }

        function i(e) {
            return e.is("input, textarea, select") && t(), f.events.disableBlur(), e.get(0).focus(), !0
        }

        function h(e, t) {
            var n = e.find("input, textarea, button, select").filter(function() {
                return p(this).isVisible()
            }).not(":disabled");
            if ((n = t ? n.last() : n.first()).length) return i(n);
            if (f.shared.with_kb) {
                var a = e.findVisible(".fr-active-item").first();
                if (a.length) return i(a);
                var r = e.findVisible("[tabIndex]").first();
                if (r.length) return i(r)
            }
        }

        function t() {
            0 === f.$el.find(".fr-marker").length && f.core.hasFocus() && f.selection.save()
        }

        function c() {
            var e = f.popups.areVisible();
            if (e) {
                var t = e.find(".fr-buttons");
                return t.find("button:focus, .fr-group span:focus").length ? !u(e.data("instance").$tb) : !u(t)
            }
            return !u(f.$tb)
        }

        function d() {
            var e = null;
            return f.shared.$f_el.is(".fr-dropdown.fr-active") ? e = f.shared.$f_el : f.shared.$f_el.closest(".fr-dropdown-menu").prev().is(".fr-dropdown.fr-active") && (e = f.shared.$f_el.closest(".fr-dropdown-menu").prev()), e
        }

        function s(e) {
            for (var t = -1, n = 0; n < e.length; n++) p(e[n]).hasClass("fr-open") && (t = n);
            var a = e.index(f.$tb.find(".fr-more-toolbar.fr-expanded > button.fr-command").first());
            if (0 < a && -1 !== t) {
                var r = e.slice(a, e.length),
                    o = (e = e.slice(0, a)).slice(0, t + 1),
                    i = e.slice(t + 1, e.length);
                e = o;
                for (var s = 0; s < r.length; s++) e.push(r[s]);
                for (var l = 0; l < i.length; l++) e.push(i[l])
            }
            return e
        }

        function g(e) {
            return e.findVisible("button:not(.fr-disabled), .fr-group span.fr-command").filter(function(e) {
                var t = p(e).parents(".fr-more-toolbar");
                return 0 === t.length || 0 < t.length && t.hasClass("fr-expanded")
            })
        }

        function n(e, t, n) {
            if (f.shared.$f_el) {
                var a = d();
                a && (f.button.click(a), f.shared.$f_el = a);
                var r = s(g(e)),
                    o = r.index(f.shared.$f_el);
                if (0 === o && !n || o === r.length - 1 && n) {
                    var i;
                    if (t) {
                        if (e.parent().is(".fr-popup")) i = !h(e.parent().children().not(".fr-buttons"), !n);
                        !1 === i && (f.shared.$f_el = null)
                    }
                    t && !1 === i || u(e, !n)
                } else l(p(r.get(o + (n ? 1 : -1))));
                return !1
            }
        }

        function m(e, t) {
            return n(e, t, !0)
        }

        function v(e, t) {
            return n(e, t)
        }

        function b(e) {
            if (f.shared.$f_el) {
                var t;
                if (f.shared.$f_el.is(".fr-dropdown.fr-active")) return l(t = e ? f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.next().find(".fr-command:not(.fr-disabled)").last()), !1;
                if (f.shared.$f_el.is("a.fr-command")) return (t = e ? f.shared.$f_el.closest("li").nextAllVisible().first().find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest("li").prevAllVisible().first().find(".fr-command:not(.fr-disabled)").first()).length || (t = e ? f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").first() : f.shared.$f_el.closest(".fr-dropdown-menu").find(".fr-command:not(.fr-disabled)").last()), l(t), !1
            }
        }

        function E() {
            if (f.shared.$f_el) {
                if (f.shared.$f_el.hasClass("fr-dropdown")) f.button.click(f.shared.$f_el);
                else if (f.shared.$f_el.is("button.fr-back")) {
                    f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus());
                    var e = f.popups.areVisible(f);
                    e && (f.shared.with_kb = !1), f.button.click(f.shared.$f_el), A(e)
                } else {
                    if (f.events.disableBlur(), f.button.click(f.shared.$f_el), f.shared.$f_el.attr("data-group-name")) {
                        var t = f.$tb.find('.fr-more-toolbar[data-name="'.concat(f.shared.$f_el.attr("data-group-name"), '"]')),
                            n = f.shared.$f_el;
                        t.hasClass("fr-expanded") && (n = t.findVisible("button:not(.fr-disabled)").first()), n && l(n)
                    } else if (f.shared.$f_el.attr("data-popup")) {
                        var a = f.popups.areVisible(f);
                        a && a.data("popup-button", f.shared.$f_el)
                    } else if (f.shared.$f_el.attr("data-modal")) {
                        var r = f.modals.areVisible(f);
                        r && r.data("modal-button", f.shared.$f_el)
                    }
                    f.shared.$f_el = null
                }
                return !1
            }
        }

        function T() {
            f.shared.$f_el && (f.events.disableBlur(), f.shared.$f_el.blur(), f.shared.$f_el = null), !1 !== f.events.trigger("toolbar.focusEditor") && (f.events.disableBlur(), f.$el.get(0).focus(), f.events.focus())
        }

        function r(a) {
            a && a.length && (f.events.$on(a, "keydown", function(e) {
                if (!p(e.target).is("a.fr-command, button.fr-command, .fr-group span.fr-command")) return !0;
                var t = a.parents(".fr-popup").data("instance") || a.data("instance") || f;
                f.shared.with_kb = !0;
                var n = t.accessibility.exec(e, a);
                return f.shared.with_kb = !1, n
            }, !0), f.events.$on(a, "mouseenter", "[tabIndex]", function(e) {
                var t = a.parents(".fr-popup").data("instance") || a.data("instance") || f;
                if (!o) return e.stopPropagation(), void e.preventDefault();
                var n = p(e.currentTarget);
                t.shared.$f_el && t.shared.$f_el.not(n) && t.accessibility.focusEditor()
            }, !0), f.$tb && f.events.$on(f.$tb, "transitionend", ".fr-more-toolbar", function() {
                f.shared.$f_el = p(document.activeElement)
            }))
        }

        function A(e) {
            var t = e.data("popup-button");
            t && setTimeout(function() {
                l(t), e.data("popup-button", null)
            }, 0)
        }

        function C(e) {
            var t = f.popups.areVisible(e);
            t && t.data("popup-button", null)
        }

        function e(e) {
            var t = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey;
            if (e.which !== $e.KEYCODE.F10 || t || e.shiftKey || !e.altKey) return !0;
            f.shared.with_kb = !0;
            var n = f.popups.areVisible(f),
                a = !1;
            return n && (a = h(n.children().not(".fr-buttons"))), a || c(), f.shared.with_kb = !1, e.preventDefault(), e.stopPropagation(), !1
        }

        return {
            _init: function a() {
                f.$wp ? f.events.on("keydown", e, !0) : f.events.$on(f.$win, "keydown", e, !0), f.events.on("mousedown", function(e) {
                    C(f), f.shared.$f_el && f.el.isSameNode(f.shared.$f_el[0]) && (f.accessibility.restoreSelection(), e.stopPropagation(), f.events.disableBlur(), f.shared.$f_el = null)
                }, !0), f.events.on("blur", function() {
                    f.shared.$f_el = null, C(f)
                }, !0)
            },
            registerPopup: function S(e) {
                var t = f.popups.get(e),
                    n = function a(c) {
                        var d = f.popups.get(c);
                        return {
                            _tiKeydown: function(e) {
                                var t = d.data("instance") || f;
                                if (!1 === t.events.trigger("popup.tab", [e])) return !1;
                                var n = e.which,
                                    a = d.find(":focus").first();
                                if ($e.KEYCODE.TAB === n) {
                                    e.preventDefault();
                                    var r = d.children().not(".fr-buttons"),
                                        o = r.findVisible("input, textarea, button, select").not(".fr-no-touch input, .fr-no-touch textarea, .fr-no-touch button, .fr-no-touch select, :disabled").toArray(),
                                        i = o.indexOf(this) + (e.shiftKey ? -1 : 1);
                                    if (0 <= i && i < o.length) return t.events.disableBlur(), p(o[i]).focus(), e.stopPropagation(), !1;
                                    var s = d.find(".fr-buttons");
                                    if (s.length && u(s, Boolean(e.shiftKey))) return e.stopPropagation(), !1;
                                    if (h(r)) return e.stopPropagation(), !1
                                } else {
                                    if ($e.KEYCODE.ENTER !== n || !e.target || "TEXTAREA" === e.target.tagName) return $e.KEYCODE.ESC === n ? (e.preventDefault(), e.stopPropagation(), t.accessibility.restoreSelection(), t.popups.isVisible(c) && d.findVisible(".fr-back").length ? (t.opts.toolbarInline && (t.events.disableBlur(), t.events.focus()), t.button.exec(d.findVisible(".fr-back").first()), A(d)) : t.popups.isVisible(c) && d.findVisible(".fr-dismiss").length ? t.button.exec(d.findVisible(".fr-dismiss").first()) : (t.popups.hide(c), t.opts.toolbarInline && t.toolbar.showInline(null, !0), A(d)), !1) : $e.KEYCODE.SPACE === n && (a.is(".fr-submit") || a.is(".fr-dismiss")) ? (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(a), !0) : t.keys.isBrowserAction(e) ? void e.stopPropagation() : a.is("input[type=text], textarea") ? void e.stopPropagation() : $e.KEYCODE.SPACE === n && (a.is(".fr-link-attr") || a.is("input[type=file]")) ? void e.stopPropagation() : (e.stopPropagation(), e.preventDefault(), !1);
                                    var l = null;
                                    0 < d.findVisible(".fr-submit").length ? l = d.findVisible(".fr-submit").first() : d.findVisible(".fr-dismiss").length && (l = d.findVisible(".fr-dismiss").first()), l && (e.preventDefault(), e.stopPropagation(), t.events.disableBlur(), t.button.exec(l))
                                }
                            },
                            _tiMouseenter: function() {
                                var e = d.data("instance") || f;
                                C(e)
                            }
                        }
                    }(e);
                r(t.find(".fr-buttons")), f.events.$on(t, "mouseenter", "tabIndex", n._tiMouseenter, !0), f.events.$on(t.children().not(".fr-buttons"), "keydown", "[tabIndex]", n._tiKeydown, !0), f.popups.onHide(e, function() {
                    (t.data("instance") || f).accessibility.restoreSelection()
                }), f.popups.onShow(e, function() {
                    o = !1, setTimeout(function() {
                        o = !0
                    }, 0)
                })
            },
            registerToolbar: r,
            focusToolbarElement: l,
            focusToolbar: u,
            focusContent: h,
            focusPopup: function y(a) {
                var r = a.children().not(".fr-buttons");
                r.data("mouseenter-event-set") || (f.events.$on(r, "mouseenter", "[tabIndex]", function(e) {
                    var t = a.data("instance") || f;
                    if (!o) return e.stopPropagation(), void e.preventDefault();
                    var n = r.find(":focus").first();
                    n.length && !n.is("input, button, textarea, select") && (t.events.disableBlur(), n.blur(), t.events.disableBlur(), t.events.focus())
                }), r.data("mouseenter-event-set", !0)), !h(r) && f.shared.with_kb && u(a.find(".fr-buttons"))
            },
            focusModal: function R(e) {
                f.core.hasFocus() || (f.events.disableBlur(), f.events.focus()), f.accessibility.saveSelection(), f.events.disableBlur(), f.el.blur(), f.selection.clear(), f.events.disableBlur(), f.shared.with_kb ? e.find(".fr-command[tabIndex], [tabIndex]").first().focus() : e.find("[tabIndex]").first().focus()
            },
            focusEditor: T,
            focusPopupButton: A,
            focusModalButton: function L(e) {
                var t = e.data("modal-button");
                t && setTimeout(function() {
                    l(t), e.data("modal-button", null)
                }, 0)
            },
            hasFocus: function w() {
                return null !== f.shared.$f_el
            },
            exec: function _(e, t) {
                var n = -1 !== navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                    a = e.which,
                    r = !1;
                return a !== $e.KEYCODE.TAB || n || e.shiftKey || e.altKey ? a !== $e.KEYCODE.ARROW_RIGHT || n || e.shiftKey || e.altKey ? a !== $e.KEYCODE.TAB || n || !e.shiftKey || e.altKey ? a !== $e.KEYCODE.ARROW_LEFT || n || e.shiftKey || e.altKey ? a !== $e.KEYCODE.ARROW_UP || n || e.shiftKey || e.altKey ? a !== $e.KEYCODE.ARROW_DOWN || n || e.shiftKey || e.altKey ? a !== $e.KEYCODE.ENTER && a !== $e.KEYCODE.SPACE || n || e.shiftKey || e.altKey ? a !== $e.KEYCODE.ESC || n || e.shiftKey || e.altKey ? a !== $e.KEYCODE.F10 || n || e.shiftKey || !e.altKey || (r = c()) : r = function o(e) {
                    if (f.shared.$f_el) {
                        var t = d();
                        return t ? (f.button.click(t), l(t)) : e.parent().findVisible(".fr-back").length ? (f.shared.with_kb = !1, f.opts.toolbarInline && (f.events.disableBlur(), f.events.focus()), f.button.exec(e.parent().findVisible(".fr-back")).first(), A(e.parent())) : f.shared.$f_el.is("button, .fr-group span") && (e.parent().is(".fr-popup") ? (f.accessibility.restoreSelection(), f.shared.$f_el = null, !1 !== f.events.trigger("toolbar.esc") && (f.popups.hide(e.parent()), f.opts.toolbarInline && f.toolbar.showInline(null, !0), A(e.parent()))) : T()), !1
                    }
                }(t) : r = E() : r = function i() {
                    return f.shared.$f_el && f.shared.$f_el.is(".fr-dropdown:not(.fr-active)") ? E() : b(!0)
                }() : r = function s() {
                    return b()
                }() : r = v(t) : r = v(t, !0) : r = m(t) : r = m(t, !0), f.shared.$f_el || void 0 !== r || (r = !0), !r && f.keys.isBrowserAction(e) && (r = !0), !!r || (e.preventDefault(), e.stopPropagation(), !1)
            },
            saveSelection: t,
            restoreSelection: function O() {
                f.$el.find(".fr-marker").length && (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur())
            }
        }
    }, Object.assign($e.DEFAULTS, { tooltips: !0 }), $e.MODULES.tooltip = function(o) {
        var i = o.$;

        function a() {
            o.helpers.isMobile() || o.$tooltip && o.$tooltip.removeClass("fr-visible").css("left", "-3000px").css("position", "fixed")
        }

        function r(e, t) {
            if (!o.helpers.isMobile() && (e.data("title") || e.data("title", e.attr("title")), e.data("title"))) {
                o.$tooltip || function r() {
                    o.opts.tooltips && !o.helpers.isMobile() && (o.shared.$tooltip ? o.$tooltip = o.shared.$tooltip : (o.shared.$tooltip = i(o.doc.createElement("DIV")).addClass("fr-tooltip"), o.$tooltip = o.shared.$tooltip, o.opts.theme && o.$tooltip.addClass("".concat(o.opts.theme, "-theme")), i(o.o_doc).find("body").first().append(o.$tooltip)), o.events.on("shared.destroy", function() {
                        o.$tooltip.html("").removeData().remove(), o.$tooltip = null
                    }, !0))
                }(), e.removeAttr("title"), o.$tooltip.text(o.language.translate(e.data("title"))), o.$tooltip.addClass("fr-visible");
                var n = e.offset().left + (e.outerWidth() - o.$tooltip.outerWidth()) / 2;
                n < 0 && (n = 0), n + o.$tooltip.outerWidth() > i(o.o_win).width() && (n = i(o.o_win).width() - o.$tooltip.outerWidth()), void 0 === t && (t = o.opts.toolbarBottom), e.offset().top - i(window).scrollTop() + e.outerHeight() + 10 >= i(window).height() && (t = !0);
                var a = t ? e.offset().top - o.$tooltip.height() : e.offset().top + e.outerHeight();
                o.$tooltip.css("position", ""), o.$tooltip.css("left", n), o.$tooltip.css("top", Math.ceil(a)), "static" !== i(o.o_doc).find("body").first().css("position") ? (o.$tooltip.css("margin-left", -i(o.o_doc).find("body").first().offset().left), o.$tooltip.css("margin-top", -i(o.o_doc).find("body").first().offset().top)) : (o.$tooltip.css("margin-left", ""), o.$tooltip.css("margin-top", ""))
            }
        }

        return {
            hide: a,
            to: r,
            bind: function s(e, t, n) {
                o.opts.tooltips && !o.helpers.isMobile() && (o.events.$on(e, "mouseover", t, function(e) {
                    o.node.hasClass(e.currentTarget, "fr-disabled") || o.edit.isDisabled() || r(i(e.currentTarget), n)
                }, !0), o.events.$on(e, "mouseout ".concat(o._mousedown, " ").concat(o._mouseup), t, function() {
                    a()
                }, !0))
            }
        }
    }, $e.TOOLBAR_VISIBLE_BUTTONS = 3, $e.MODULES.button = function(g) {
        var h = g.$,
            i = [];
        (g.opts.toolbarInline || g.opts.toolbarContainer) && (g.shared.buttons || (g.shared.buttons = []), i = g.shared.buttons);
        var s = [];

        function l(e, t, n) {
            for (var a = h(), r = 0; r < e.length; r++) {
                var o = h(e[r]);
                if (o.is(t) && (a = a.add(o)), n && o.is(".fr-dropdown")) {
                    var i = o.next().find(t);
                    a = a.add(i)
                }
            }
            return a
        }

        function m(e, t) {
            var n, a = h();
            if (!e) return a;
            for (n in a = (a = a.add(l(i, e, t))).add(l(s, e, t)), g.shared.popups)
                if (Object.prototype.hasOwnProperty.call(g.shared.popups, n)) {
                    var r = g.shared.popups[n].children().find(e);
                    a = a.add(r)
                }
            for (n in g.shared.modals)
                if (Object.prototype.hasOwnProperty.call(g.shared.modals, n)) {
                    var o = g.shared.modals[n].$modal.find(e);
                    a = a.add(o)
                }
            return a
        }

        function r(e) {
            var t = e.next(),
                n = g.node.hasClass(e.get(0), "fr-active"),
                a = m(".fr-dropdown.fr-active").not(e),
                r = e.parents(".fr-toolbar, .fr-popup").data("instance") || g;
            r.helpers.isIOS() && !r.el.querySelector(".fr-marker") && (r.selection.save(), r.selection.clear(), r.selection.restore()), t.parents(".fr-more-toolbar").addClass("fr-overflow-visible");
            var o = 0,
                i = 0,
                s = t.find("> .fr-dropdown-wrapper");
            if (!n) {
                var l = e.data("cmd");
                t.find(".fr-command").removeClass("fr-active").attr("aria-selected", !1), $e.COMMANDS[l] && $e.COMMANDS[l].refreshOnShow && $e.COMMANDS[l].refreshOnShow.apply(r, [e, t]), t.css("left", e.offset().left - e.parents(".fr-btn-wrap, .fr-toolbar, .fr-buttons").offset().left - ("rtl" === g.opts.direction ? t.width() - e.outerWidth() : 0)), t.addClass("test-height"), o = t.outerHeight(), i = g.helpers.getPX(s.css("max-height")), t.removeClass("test-height"), t.css("top", "").css("bottom", "");
                var c = e.outerHeight() / 10;
                if (!g.opts.toolbarBottom && t.offset().top + e.outerHeight() + o < h(g.o_doc).height()) t.css("top", e.position().top + e.outerHeight() - c);
                else {
                    var d = 0,
                        f = e.parents(".fr-more-toolbar");
                    0 < f.length && (d = f.first().height()), t.css("bottom", e.parents(".fr-popup, .fr-toolbar").first().height() - d - e.position().top)
                }
            }
            (e.addClass("fr-blink").toggleClass("fr-active"), e.hasClass("fr-options")) && e.prev().toggleClass("fr-expanded");
            e.hasClass("fr-active") ? (t.attr("aria-hidden", !1), e.attr("aria-expanded", !0), function u(e, t, n) {
                n <= t && e.parent().css("overflow", "auto"), e.css("height", Math.min(t, n))
            }(s, o, i)) : (t.attr("aria-hidden", !0).css("overflow", ""), e.attr("aria-expanded", !1), s.css("height", "")), setTimeout(function() {
                e.removeClass("fr-blink")
            }, 300), t.css("margin-left", ""), t.offset().left + t.outerWidth() > g.$sc.offset().left + g.$sc.width() && t.css("margin-left", -(t.offset().left + t.outerWidth() - g.$sc.offset().left - g.$sc.width())), t.offset().left < g.$sc.offset().left && "rtl" === g.opts.direction && t.css("margin-left", g.$sc.offset().left), a.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), a.prev(".fr-expanded").removeClass("fr-expanded"), a.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), 0 !== e.parents(".fr-popup").length || g.opts.toolbarInline || (g.node.hasClass(e.get(0), "fr-active") ? g.$tb.css("zIndex", (g.opts.zIndex || 1) + 4) : g.$tb.css("zIndex", ""));
            var p = t.find("a.fr-command.fr-active").first();
            g.helpers.isMobile() || (p.length ? (g.accessibility.focusToolbarElement(p), s.scrollTop(Math.abs(p.parents(".fr-dropdown-content").offset().top - p.offset().top) - p.offset().top)) : (g.accessibility.focusToolbarElement(e), s.scrollTop(0)))
        }

        function o(e) {
            e.addClass("fr-blink"), setTimeout(function() {
                e.removeClass("fr-blink")
            }, 500);
            for (var t = e.data("cmd"), n = []; void 0 !== e.data("param".concat(n.length + 1));) n.push(e.data("param".concat(n.length + 1)));
            var a = m(".fr-dropdown.fr-active");
            a.length && (a.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), a.prev(".fr-expanded").removeClass("fr-expanded"), a.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", "")), e.parents(".fr-popup, .fr-toolbar").data("instance").commands.exec(t, n)
        }

        function t(e) {
            var t = e.parents(".fr-popup, .fr-toolbar").data("instance");
            if (0 === e.parents(".fr-popup").length && e.data("popup") && !e.hasClass("fr-btn-active-popup") && e.addClass("fr-btn-active-popup"), 0 !== e.parents(".fr-popup").length || e.data("popup") || t.popups.hideAll(), t.popups.areVisible() && !t.popups.areVisible(t)) {
                for (var n = 0; n < $e.INSTANCES.length; n++) $e.INSTANCES[n] !== t && $e.INSTANCES[n].popups && $e.INSTANCES[n].popups.areVisible() && $e.INSTANCES[n].$el.find(".fr-marker").remove();
                t.popups.hideAll()
            }
            g.node.hasClass(e.get(0), "fr-dropdown") ? r(e) : (! function a(e) {
                o(e)
            }(e), $e.COMMANDS[e.data("cmd")] && !1 !== $e.COMMANDS[e.data("cmd")].refreshAfterCallback && t.button.bulkRefresh())
        }

        function c(e) {
            t(h(e.currentTarget))
        }

        function d(e) {
            var t = e.find(".fr-dropdown.fr-active");
            t.length && (t.removeClass("fr-active").attr("aria-expanded", !1).next().attr("aria-hidden", !0).css("overflow", "").find("> .fr-dropdown-wrapper").css("height", ""), t.parents(".fr-toolbar:not(.fr-inline)").css("zIndex", ""), t.prev().removeClass("fr-expanded"))
        }

        function f(e) {
            e.preventDefault(), e.stopPropagation()
        }

        function p(e) {
            if (e.stopPropagation(), !g.helpers.isMobile()) return !1
        }

        function v(e) {
            var t = 1 < arguments.length && arguments[1] !== undefined ? arguments[1] : {},
                n = 2 < arguments.length ? arguments[2] : undefined;
            if (g.helpers.isMobile() && !1 === t.showOnMobile) return "";
            var a = t.displaySelection;
            "function" == typeof a && (a = a(g));
            var r = "";
            if ("options" !== t.type)
                if (a) {
                    var o = "function" == typeof t.defaultSelection ? t.defaultSelection(g) : t.defaultSelection;
                    r = '<span style="width:'.concat(t.displaySelectionWidth || 100, 'px">').concat(g.language.translate(o || t.title), "</span>")
                } else r = g.icon.create(t.icon || e), r += '<span class="fr-sr-only">'.concat(g.language.translate(t.title) || "", "</span>");
            var i = t.popup ? ' data-popup="true"' : "",
                s = t.modal ? ' data-modal="true"' : "",
                l = g.shortcuts.get("".concat(e, "."));
            l = l ? " (".concat(l, ")") : "";
            var c = "".concat(e, "-").concat(g.id),
                d = "dropdown-menu-".concat(c),
                f = '<button id="'.concat(c, '"').concat(t.more_btn ? ' data-group-name="'.concat(c, '" ') : "", 'type="button" tabIndex="-1" role="button"').concat(t.toggle ? ' aria-pressed="false"' : "").concat("dropdown" === t.type || "options" === t.type ? ' aria-controls="'.concat(d, '" aria-expanded="false" aria-haspopup="true"') : "").concat(t.disabled ? ' aria-disabled="true"' : "", ' title="').concat(g.language.translate(t.title) || "").concat(l, '" class="fr-command fr-btn').concat("dropdown" === t.type || "options" == t.type ? " fr-dropdown" : "").concat("options" == t.type ? " fr-options" : "").concat("more" == t.type ? " fr-more" : "").concat(t.displaySelection ? " fr-selection" : "").concat(t.back ? " fr-back" : "").concat(t.disabled ? " fr-disabled" : "").concat(n ? "" : " fr-hidden", '" data-cmd="').concat(e, '"').concat(i).concat(s, ">").concat(r, "</button>");
            if ("dropdown" === t.type || "options" === t.type) {
                var p = '<div id="'.concat(d, '" class="fr-dropdown-menu" role="listbox" aria-labelledby="').concat(c, '" aria-hidden="true"><div class="fr-dropdown-wrapper" role="presentation"><div class="fr-dropdown-content" role="presentation">');
                p += function u(e, t) {
                    var n = "";
                    if (t.html) "function" == typeof t.html ? n += t.html.call(g) : n += t.html;
                    else {
                        var a = t.options;
                        for (var r in "function" == typeof a && (a = a()), n += '<ul class="fr-dropdown-list" role="presentation">', a)
                            if (Object.prototype.hasOwnProperty.call(a, r)) {
                                var o = g.shortcuts.get("".concat(e, ".").concat(r));
                                o = o ? '<span class="fr-shortcut">'.concat(o, "</span>") : "", n += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="'.concat("options" === t.type ? e.replace(/Options/g, "") : e, '" data-param1="').concat(r, '" title="').concat(a[r], '">').concat(g.language.translate(a[r]), "</a></li>")
                            }
                        n += "</ul>"
                    }
                    return n
                }(e, t), f += p += "</div></div></div>"
            }
            return t.hasOptions && t.hasOptions.apply(g) && (f = '<div class="fr-btn-wrap">'.concat(f, " ").concat(v(e + "Options", Object.assign({}, t, {
                type: "options",
                hasOptions: !1
            }), n), "  </div>")), f
        }

        function e(r) {
            var o = g.$tb && g.$tb.data("instance") || g;
            if (!1 === g.events.trigger("buttons.refresh")) return !0;
            setTimeout(function() {
                for (var e = o.selection.inEditor() && o.core.hasFocus(), t = 0; t < r.length; t++) {
                    var n = h(r[t]),
                        a = n.data("cmd");
                    0 === n.parents(".fr-popup").length ? e || $e.COMMANDS[a] && $e.COMMANDS[a].forcedRefresh ? o.button.refresh(n) : g.node.hasClass(n.get(0), "fr-dropdown") || (n.removeClass("fr-active"), n.attr("aria-pressed") && n.attr("aria-pressed", !1)) : n.parents(".fr-popup").isVisible() && o.button.refresh(n)
                }
            }, 0)
        }

        function n() {
            e(i), e(s)
        }

        function a() {
            i = [], s = []
        }

        g.shared.popup_buttons || (g.shared.popup_buttons = []), s = g.shared.popup_buttons;
        var u = null;

        function b() {
            clearTimeout(u), u = setTimeout(n, 50)
        }

        return {
            _init: function E() {
                g.opts.toolbarInline ? g.events.on("toolbar.show", n) : (g.events.on("mouseup", b), g.events.on("keyup", b), g.events.on("blur", b), g.events.on("focus", b), g.events.on("contentChanged", b), g.helpers.isMobile() && g.events.$on(g.$doc, "selectionchange", n)), g.events.on("shared.destroy", a)
            },
            build: v,
            buildList: function T(e, t) {
                for (var n = "", a = 0; a < e.length; a++) {
                    var r = e[a],
                        o = $e.COMMANDS[r];
                    o && "undefined" != typeof o.plugin && g.opts.pluginsEnabled.indexOf(o.plugin) < 0 || (o ? n += v(r, o, void 0 === t || 0 <= t.indexOf(r)) : "|" === r ? n += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" === r && (n += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>'))
                }
                return n
            },
            buildGroup: function A(e) {
                var t = "",
                    n = "";
                for (var a in e) {
                    var r = e[a];
                    if (r.buttons) {
                        for (var o = "", i = "", s = 0, l = "left", c = $e.TOOLBAR_VISIBLE_BUTTONS, d = 0; d < r.buttons.length; d++) {
                            var f = r.buttons[d],
                                p = $e.COMMANDS[f];
                            p || ("|" == f ? o += '<div class="fr-separator fr-vs" role="separator" aria-orientation="vertical"></div>' : "-" == f && (o += '<div class="fr-separator fr-hs" role="separator" aria-orientation="horizontal"></div>')), !p || p && "undefined" != typeof p.plugin && g.opts.pluginsEnabled.indexOf(p.plugin) < 0 || (e[a].align !== undefined && (l = e[a].align), e[a].buttonsVisible !== undefined && (c = e[a].buttonsVisible), e.showMoreButtons && c <= s ? i += v(f, p, !0) : o += v(f, p, !0), s++)
                        }
                        if (e.showMoreButtons && c < s) {
                            var u = a,
                                h = $e.COMMANDS[u];
                            h.more_btn = !0, o += v(u, h, !0)
                        }
                        t += '<div class="fr-btn-grp fr-float-'.concat(l, '">').concat(o, "</div>"), e.showMoreButtons && 0 < i.length && (n += '<div class="fr-more-toolbar" data-name="'.concat(a + "-" + g.id, '">').concat(i, "</div>"))
                    }
                }
                return g.opts.toolbarBottom ? "".concat(n, '<div class="fr-newline"></div>').concat(t) : "".concat(t, '<div class="fr-newline"></div>').concat(n)
            },
            bindCommands: function C(t, e) {
                g.events.bindClick(t, ".fr-command:not(.fr-disabled)", c), g.events.$on(t, "".concat(g._mousedown, " ").concat(g._mouseup, " ").concat(g._move), ".fr-dropdown-menu", f, !0), g.events.$on(t, "".concat(g._mousedown, " ").concat(g._mouseup, " ").concat(g._move), ".fr-dropdown-menu .fr-dropdown-wrapper", p, !0);
                var n = t.get(0).ownerDocument,
                    a = "defaultView" in n ? n.defaultView : n.parentWindow;

                function r(e) {
                    (!e || e.type === g._mouseup && e.target !== h("html").get(0) || "keydown" === e.type && (g.keys.isCharacter(e.which) && !g.keys.ctrlKey(e) || e.which === $e.KEYCODE.ESC)) && d(t)
                }

                g.events.$on(h(a), "".concat(g._mouseup, " resize keydown"), r, !0), g.opts.iframe && g.events.$on(g.$win, g._mouseup, r, !0), g.node.hasClass(t.get(0), "fr-popup") ? h.merge(s, t.find(".fr-btn").toArray()) : h.merge(i, t.find(".fr-btn").toArray()), g.tooltip.bind(t, ".fr-btn, .fr-title", e)
            },
            refresh: function S(e) {
                var t, n = e.parents(".fr-popup, .fr-toolbar").data("instance") || g,
                    a = e.data("cmd");
                g.node.hasClass(e.get(0), "fr-dropdown") ? t = e.next() : (e.removeClass("fr-active"), e.attr("aria-pressed") && e.attr("aria-pressed", !1)), $e.COMMANDS[a] && $e.COMMANDS[a].refresh ? $e.COMMANDS[a].refresh.apply(n, [e, t]) : g.refresh[a] && n.refresh[a](e, t)
            },
            bulkRefresh: n,
            exec: o,
            click: t,
            hideActiveDropdowns: d,
            addButtons: function y(e) {
                for (var t = 0; t < e.length; t++) i.push(e)
            },
            getButtons: m,
            getPosition: function R(e) {
                var t = e.offset().left,
                    n = g.opts.toolbarBottom ? 10 : e.outerHeight() - 10;
                return { left: t, top: e.offset().top + n }
            }
        }
    }, $e.ICON_TEMPLATES = {
        font_awesome: '<i class="fa fa-[NAME]" aria-hidden="true"></i>',
        font_awesome_5: '<i class="fas fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5r: '<i class="far fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5l: '<i class="fal fa-[FA5NAME]" aria-hidden="true"></i>',
        font_awesome_5b: '<i class="fab fa-[FA5NAME]" aria-hidden="true"></i>',
        text: '<span style="text-align: center;">[NAME]</span>',
        image: "<img src=[SRC] alt=[ALT] />",
        svg: '<svg class="fr-svg" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="[PATH]"/></svg>',
        empty: " "
    }, $e.ICONS = {
        bold: { NAME: "bold", SVG_KEY: "bold" },
        italic: { NAME: "italic", SVG_KEY: "italic" },
        underline: { NAME: "underline", SVG_KEY: "underline" },
        strikeThrough: { NAME: "strikethrough", SVG_KEY: "strikeThrough" },
        subscript: { NAME: "subscript", SVG_KEY: "subscript" },
        superscript: { NAME: "superscript", SVG_KEY: "superscript" },
        color: { NAME: "tint", SVG_KEY: "textColor" },
        outdent: { NAME: "outdent", SVG_KEY: "outdent" },
        indent: { NAME: "indent", SVG_KEY: "indent" },
        undo: { NAME: "rotate-left", FA5NAME: "undo", SVG_KEY: "undo" },
        redo: { NAME: "rotate-right", FA5NAME: "redo", SVG_KEY: "redo" },
        insertHR: { NAME: "minus", SVG_KEY: "horizontalLine" },
        clearFormatting: { NAME: "eraser", SVG_KEY: "clearFormatting" },
        selectAll: { NAME: "mouse-pointer", SVG_KEY: "selectAll" },
        moreText: { NAME: "ellipsis-v", SVG_KEY: "textMore" },
        moreParagraph: { NAME: "ellipsis-v", SVG_KEY: "paragraphMore" },
        moreRich: { NAME: "ellipsis-v", SVG_KEY: "insertMore" },
        moreMisc: { NAME: "ellipsis-v", SVG_KEY: "more" }
    }, $e.DefineIconTemplate = function(e, t) {
        $e.ICON_TEMPLATES[e] = t
    }, $e.DefineIcon = function(e, t) {
        $e.ICONS[e] = t
    }, Object.assign($e.DEFAULTS, { iconsTemplate: "svg" }), $e.MODULES.icon = function(r) {
        return {
            create: function o(n) {
                var e = null,
                    a = $e.ICONS[n];
                if (void 0 !== a) {
                    var t = a.template || $e.ICON_DEFAULT_TEMPLATE || r.opts.iconsTemplate;
                    t && t.apply && (t = t.apply(r)), a.FA5NAME || (a.FA5NAME = a.NAME), "svg" !== t || a.PATH || (a.PATH = $e.SVG[a.SVG_KEY] || ""), t && (t = $e.ICON_TEMPLATES[t]) && (e = t.replace(/\[([a-zA-Z0-9]*)\]/g, function(e, t) {
                        return "NAME" === t ? a[t] || n : a[t]
                    }))
                }
                return e || n
            },
            getTemplate: function a(e) {
                var t = $e.ICONS[e],
                    n = r.opts.iconsTemplate;
                return void 0 !== t ? n = t.template || $e.ICON_DEFAULT_TEMPLATE || r.opts.iconsTemplate : n
            }
        }
    }, $e.SVG = {
        add: "M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z",
        advancedImageEditor: "M3,17v2h6v-2H3z M3,5v2h10V5H3z M13,21v-2h8v-2h-8v-2h-2v6H13z M7,9v2H3v2h4v2h2V9H7z M21,13v-2H11v2H21z M15,9h2V7h4V5h-4  V3h-2V9z",
        alignCenter: "M9,18h6v-2H9V18z M6,11v2h12v-2H6z M3,6v2h18V6H3z",
        alignJustify: "M3,18h18v-2H3V18z M3,11v2h18v-2H3z M3,6v2h18V6H3z",
        alignLeft: "M3,18h6v-2H3V18z M3,11v2h12v-2H3z M3,6v2h18V6H3z",
        alignRight: "M15,18h6v-2h-6V18z M9,11v2h12v-2H9z M3,6v2h18V6H3z",
        anchors: "M16,4h-4H8C6.9,4,6,4.9,6,6v4v10l6-2.6l6,2.6V10V6C18,4.9,17.1,4,16,4z M16,17l-4-1.8L8,17v-7V6h4h4v4V17z",
        back: "M20 11L7.83 11 11.425 7.405 10.01 5.991 5.416 10.586 5.414 10.584 4 11.998 4.002 12 4 12.002 5.414 13.416 5.416 13.414 10.01 18.009 11.425 16.595 7.83 13 20 13 20 13 20 11 20 11Z",
        backgroundColor: "M9.91752,12.24082l7.74791-5.39017,1.17942,1.29591-6.094,7.20747L9.91752,12.24082M7.58741,12.652l4.53533,4.98327a.93412.93412,0,0,0,1.39531-.0909L20.96943,8.7314A.90827.90827,0,0,0,20.99075,7.533l-2.513-2.76116a.90827.90827,0,0,0-1.19509-.09132L7.809,11.27135A.93412.93412,0,0,0,7.58741,12.652ZM2.7939,18.52772,8.41126,19.5l1.47913-1.34617-3.02889-3.328Z",
        blockquote: "M10.31788,5l.93817,1.3226A12.88271,12.88271,0,0,0,8.1653,9.40125a5.54242,5.54242,0,0,0-.998,3.07866v.33733q.36089-.04773.66067-.084a4.75723,4.75723,0,0,1,.56519-.03691,2.87044,2.87044,0,0,1,2.11693.8427,2.8416,2.8416,0,0,1,.8427,2.09274,3.37183,3.37183,0,0,1-.8898,2.453A3.143,3.143,0,0,1,8.10547,19,3.40532,3.40532,0,0,1,5.375,17.7245,4.91156,4.91156,0,0,1,4.30442,14.453,9.3672,9.3672,0,0,1,5.82051,9.32933,14.75716,14.75716,0,0,1,10.31788,5Zm8.39243,0,.9369,1.3226a12.88289,12.88289,0,0,0-3.09075,3.07865,5.54241,5.54241,0,0,0-.998,3.07866v.33733q.33606-.04773.63775-.084a4.91773,4.91773,0,0,1,.58938-.03691,2.8043,2.8043,0,0,1,2.1042.83,2.89952,2.89952,0,0,1,.80578,2.10547,3.42336,3.42336,0,0,1-.86561,2.453A3.06291,3.06291,0,0,1,16.49664,19,3.47924,3.47924,0,0,1,13.742,17.7245,4.846,4.846,0,0,1,12.64721,14.453,9.25867,9.25867,0,0,1,14.17476,9.3898,15.26076,15.26076,0,0,1,18.71031,5Z",
        bold: "M15.25,11.8h0A3.68,3.68,0,0,0,17,9a3.93,3.93,0,0,0-3.86-4H6.65V19h7a3.74,3.74,0,0,0,3.7-3.78V15.1A3.64,3.64,0,0,0,15.25,11.8ZM8.65,7h4.2a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61,2.23,2.23,0,0,1-.63.09H8.65Zm4.6,10H8.65V13h4.6a2.09,2.09,0,0,1,2,1.3,2.09,2.09,0,0,1-1.37,2.61A2.23,2.23,0,0,1,13.25,17Z",
        cellBackground: "M16.6,12.4L7.6,3.5L6.2,4.9l2.4,2.4l-5.2,5.2c-0.6,0.6-0.6,1.5,0,2.1l5.5,5.5c0.3,0.3,0.7,0.4,1.1,0.4s0.8-0.1,1.1-0.4  l5.5-5.5C17.2,14,17.2,13,16.6,12.4z M5.2,13.5L10,8.7l4.8,4.8H5.2z M19,15c0,0-2,2.2-2,3.5c0,1.1,0.9,2,2,2s2-0.9,2-2  C21,17.2,19,15,19,15z",
        cellBorderColor: "M22,22H2v2h20V22z",
        cellOptions: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M9.5,6.5h5V9h-5V6.5z M8,17.5H4  c-0.3,0-0.5-0.2-0.5-0.4c0,0,0,0,0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M8,9H3.5V7c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0,0H8V9z   M14.5,17.5h-5V15h5V17.5z M20.5,17c0,0.3-0.2,0.5-0.4,0.5c0,0,0,0,0,0H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9H16V6.5h4  c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0V9z",
        cellStyle: "M20,19.9l0.9,3.6l-3.2-1.9l-3.3,1.9l0.8-3.6L12.3,17h3.8l1.7-3.5l1.4,3.5H23L20,19.9z M20,5H4C2.9,5,2,5.9,2,7v10  c0,1.1,0.9,2,2,2h7.5l-0.6-0.6L10,17.5H9.5V15h5.4l1.1-2.3v-2.2h4.5v3H20l0.6,1.5H22V7C22,5.9,21.1,5,20,5z M3.5,7  c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0.1,0h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M4,17.5c-0.3,0-0.5-0.2-0.5-0.4c0,0,0,0,0-0.1v-2H8v2.5H4  z M14.5,9h-5V6.5h5V9z M20.5,9H16V6.5h4c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0.1V9z",
        clearFormatting: "M11.48,10.09l-1.2-1.21L8.8,7.41,6.43,5,5.37,6.1,8.25,9,4.66,19h2l1.43-4h5.14l1.43,4h2l-.89-2.51L18.27,19l1.07-1.06L14.59,13.2ZM8.8,13l.92-2.56L12.27,13Zm.56-7.15L9.66,5h2l1.75,4.9Z",
        close: "M13.4,12l5.6,5.6L17.6,19L12,13.4L6.4,19L5,17.6l5.6-5.6L5,6.4L6.4,5l5.6,5.6L17.6,5L19,6.4L13.4,12z",
        codeView: "M9.4,16.6,4.8,12,9.4,7.4,8,6,2,12l6,6Zm5.2,0L19.2,12,14.6,7.4,16,6l6,6-6,6Z",
        cogs: "M18.877 12.907a6.459 6.459 0 0 0 0 -1.814l1.952 -1.526a0.468 0.468 0 0 0 0.111 -0.593l-1.851 -3.2a0.461 0.461 0 0 0 -0.407 -0.231 0.421 0.421 0 0 0 -0.157 0.028l-2.3 0.925a6.755 6.755 0 0 0 -1.563 -0.907l-0.352 -2.452a0.451 0.451 0 0 0 -0.453 -0.388h-3.7a0.451 0.451 0 0 0 -0.454 0.388L9.347 5.588A7.077 7.077 0 0 0 7.783 6.5l-2.3 -0.925a0.508 0.508 0 0 0 -0.166 -0.028 0.457 0.457 0 0 0 -0.4 0.231l-1.851 3.2a0.457 0.457 0 0 0 0.111 0.593l1.952 1.526A7.348 7.348 0 0 0 5.063 12a7.348 7.348 0 0 0 0.064 0.907L3.175 14.433a0.468 0.468 0 0 0 -0.111 0.593l1.851 3.2a0.461 0.461 0 0 0 0.407 0.231 0.421 0.421 0 0 0 0.157 -0.028l2.3 -0.925a6.74 6.74 0 0 0 1.564 0.907L9.7 20.864a0.451 0.451 0 0 0 0.454 0.388h3.7a0.451 0.451 0 0 0 0.453 -0.388l0.352 -2.452a7.093 7.093 0 0 0 1.563 -0.907l2.3 0.925a0.513 0.513 0 0 0 0.167 0.028 0.457 0.457 0 0 0 0.4 -0.231l1.851 -3.2a0.468 0.468 0 0 0 -0.111 -0.593Zm-0.09 2.029l-0.854 1.476 -2.117 -0.852 -0.673 0.508a5.426 5.426 0 0 1 -1.164 0.679l-0.795 0.323 -0.33 2.269h-1.7l-0.32 -2.269 -0.793 -0.322a5.3 5.3 0 0 1 -1.147 -0.662L8.2 15.56l-2.133 0.86 -0.854 -1.475 1.806 -1.411 -0.1 -0.847c-0.028 -0.292 -0.046 -0.5 -0.046 -0.687s0.018 -0.4 0.045 -0.672l0.106 -0.854L5.217 9.064l0.854 -1.475 2.117 0.851 0.673 -0.508a5.426 5.426 0 0 1 1.164 -0.679l0.8 -0.323 0.331 -2.269h1.7l0.321 2.269 0.792 0.322a5.3 5.3 0 0 1 1.148 0.661l0.684 0.526 2.133 -0.859 0.853 1.473 -1.8 1.421 0.1 0.847a5 5 0 0 1 0.046 0.679c0 0.193 -0.018 0.4 -0.045 0.672l-0.106 0.853ZM12 14.544A2.544 2.544 0 1 1 14.546 12 2.552 2.552 0 0 1 12 14.544Z",
        columns: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.4  c0,0,0,0,0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M8,9H3.5V7c0-0.3,0.2-0.5,0.4-0.5c0,0,0,0,0,0H8V9z M20.5,17  c0,0.3-0.2,0.5-0.4,0.5c0,0,0,0,0,0H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9H16V6.5h4c0.3,0,0.5,0.2,0.5,0.4c0,0,0,0,0,0  V9z",
        edit: "M17,11.2L12.8,7L5,14.8V19h4.2L17,11.2z M7,16.8v-1.5l5.6-5.6l1.4,1.5l-5.6,5.6H7z M13.5,6.3l0.7-0.7c0.8-0.8,2.1-0.8,2.8,0  c0,0,0,0,0,0L18.4,7c0.8,0.8,0.8,2,0,2.8l-0.7,0.7L13.5,6.3z",
        exitFullscreen: "M5,16H8v3h2V14H5ZM8,8H5v2h5V5H8Zm6,11h2V16h3V14H14ZM16,8V5H14v5h5V8Z",
        fontAwesome: "M18.99018,13.98212V7.52679c-.08038-1.21875-1.33929-.683-1.33929-.683-2.933,1.39282-4.36274.61938-5.85938.15625a6.23272,6.23272,0,0,0-2.79376-.20062l-.00946.004A1.98777,1.98777,0,0,0,7.62189,5.106a.984.984,0,0,0-.17517-.05432c-.02447-.0055-.04882-.01032-.0736-.0149A.9565.9565,0,0,0,7.1908,5H6.82539a.9565.9565,0,0,0-.18232.0368c-.02472.00458-.04907.0094-.07348.01484a.985.985,0,0,0-.17523.05438,1.98585,1.98585,0,0,0-.573,3.49585v9.394A1.004,1.004,0,0,0,6.82539,19H7.1908a1.00406,1.00406,0,0,0,1.00409-1.00409V15.52234c3.64221-1.09827,5.19709.64282,7.09888.57587a5.57291,5.57291,0,0,0,3.25446-1.05805A1.2458,1.2458,0,0,0,18.99018,13.98212Z",
        fontFamily: "M16,19h2L13,5H11L6,19H8l1.43-4h5.14Zm-5.86-6L12,7.8,13.86,13Z",
        fontSize: "M20.75,19h1.5l-3-10h-1.5l-3,10h1.5L17,16.5h3Zm-3.3-4,1.05-3.5L19.55,15Zm-5.7,4h2l-5-14h-2l-5,14h2l1.43-4h5.14ZM5.89,13,7.75,7.8,9.61,13Z",
        fullscreen: "M7,14H5v5h5V17H7ZM5,10H7V7h3V5H5Zm12,7H14v2h5V14H17ZM14,5V7h3v3h2V5Z",
        help: "M11,17h2v2h-2V17z M12,5C9.8,5,8,6.8,8,9h2c0-1.1,0.9-2,2-2s2,0.9,2,2c0,2-3,1.7-3,5v1h2v-1c0-2.2,3-2.5,3-5  C16,6.8,14.2,5,12,5z",
        horizontalLine: "M5,12h14 M19,11H5v2h14V11z",
        imageAltText: "M19,7h-6v12h-2V7H5V5h6h2h6V7z",
        imageCaption: "M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z M22,22H2v2h20V22z",
        imageClass: "M9.5,13.4l-2.9-2.9h3.8L12.2,7l1.4,3.5h3.8l-3,2.9l0.9,3.6L12,15.1L8.8,17L9.5,13.4z M22,6v12c0,1.1-0.9,2-2,2H4  c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,6H4v12h16V8.8V6z",
        imageDisplay: "M3,5h18v2H3V5z M13,9h8v2h-8V9z M13,13h8v2h-8V13z M3,17h18v2H3V17z M3,9h8v6H3V9z",
        imageManager: "M20,6h-7l-2-2H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V8C22,6.9,21.1,6,20,6z M20,18H4V6h6.2l2,2H20V18z   M18,16l-3.8-5H14l-2.9,3.8L9,12.1L6,16H18z M10,9.5C10,8.7,9.3,8,8.5,8S7,8.7,7,9.5S7.7,11,8.5,11S10,10.3,10,9.5z",
        imageSize: "M16.9,4c-0.3,0-0.5,0.2-0.8,0.3L3.3,13c-0.9,0.6-1.1,1.9-0.5,2.8l2.2,3.3c0.4,0.7,1.2,1,2,0.8c0.3,0,0.5-0.2,0.8-0.3  L20.7,11c0.9-0.6,1.1-1.9,0.5-2.8l-2.2-3.3C18.5,4.2,17.7,3.9,16.9,4L16.9,4z M16.9,9.9L18.1,9l-2-2.9L17,5.6c0.1,0,0.1-0.1,0.2-0.1  c0.2,0,0.4,0,0.5,0.2L19.9,9c0.2,0.2,0.1,0.5-0.1,0.7L7,18.4c-0.1,0-0.1,0.1-0.2,0.1c-0.2,0-0.4,0-0.5-0.2L4.1,15  c-0.2-0.2-0.1-0.5,0.1-0.7L5,13.7l2,2.9l1.2-0.8l-2-2.9L7.5,12l1.1,1.7l1.2-0.8l-1.1-1.7l1.2-0.8l2,2.9l1.2-0.8l-2-2.9l1.2-0.8  l1.1,1.7l1.2-0.8l-1.1-1.7L14.9,7L16.9,9.9z",
        indent: "M3,9v6l3-3L3,9z M3,19h18v-2H3V19z M3,7h18V5H3V7z M9,11h12V9H9V11z M9,15h12v-2H9V15z",
        inlineClass: "M9.9,13.313A1.2,1.2,0,0,1,9.968,13H6.277l1.86-5.2,1.841,5.148A1.291,1.291,0,0,1,11.212,12h.426l-2.5-7h-2l-5,14h2l1.43-4H9.9Zm2.651,6.727a2.884,2.884,0,0,1-.655-2.018v-2.71A1.309,1.309,0,0,1,13.208,14h3.113a3.039,3.039,0,0,1,2,1.092s1.728,1.818,2.964,2.928a1.383,1.383,0,0,1,.318,1.931,1.44,1.44,0,0,1-.19.215l-3.347,3.31a1.309,1.309,0,0,1-1.832.258h0a1.282,1.282,0,0,1-.258-.257l-1.71-1.728Zm2.48-3.96a.773.773,0,1,0,.008,0Z",
        inlineStyle: "M11.88,15h.7l.7-1.7-3-8.3h-2l-5,14h2l1.4-4Zm-4.4-2,1.9-5.2,1.9,5.2ZM15.4,21.545l3.246,1.949-.909-3.637L20.72,17H16.954l-1.429-3.506L13.837,17H10.071l2.857,2.857-.779,3.637Z",
        insertEmbed: "M20.73889,15.45929a3.4768,3.4768,0,0,0-5.45965-.28662L9.5661,12.50861a3.49811,3.49811,0,0,0-.00873-1.01331l5.72174-2.66809a3.55783,3.55783,0,1,0-.84527-1.81262L8.70966,9.6839a3.50851,3.50851,0,1,0,.0111,4.63727l5.7132,2.66412a3.49763,3.49763,0,1,0,6.30493-1.526ZM18.00745,5.01056A1.49993,1.49993,0,1,1,16.39551,6.3894,1.49994,1.49994,0,0,1,18.00745,5.01056ZM5.99237,13.49536a1.49989,1.49989,0,1,1,1.61194-1.37878A1.49982,1.49982,0,0,1,5.99237,13.49536Zm11.78211,5.494a1.49993,1.49993,0,1,1,1.61193-1.37885A1.49987,1.49987,0,0,1,17.77448,18.98932Z",
        insertFile: "M7,3C5.9,3,5,3.9,5,5v14c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7.6L14.4,3H7z M17,19H7V5h6v4h4V19z",
        insertImage: "M14.2,11l3.8,5H6l3-3.9l2.1,2.7L14,11H14.2z M8.5,11c0.8,0,1.5-0.7,1.5-1.5S9.3,8,8.5,8S7,8.7,7,9.5C7,10.3,7.7,11,8.5,11z   M22,6v12c0,1.1-0.9,2-2,2H4c-1.1,0-2-0.9-2-2V6c0-1.1,0.9-2,2-2h16C21.1,4,22,4.9,22,6z M20,8.8V6H4v12h16V8.8z",
        insertLink: "M11,17H7A5,5,0,0,1,7,7h4V9H7a3,3,0,0,0,0,6h4ZM17,7H13V9h4a3,3,0,0,1,0,6H13v2h4A5,5,0,0,0,17,7Zm-1,4H8v2h8Z",
        insertMore: "M16.5,13h-6v6h-2V13h-6V11h6V5h2v6h6Zm5,4.5A1.5,1.5,0,1,1,20,16,1.5,1.5,0,0,1,21.5,17.5Zm0-4A1.5,1.5,0,1,1,20,12,1.5,1.5,0,0,1,21.5,13.5Zm0-4A1.5,1.5,0,1,1,20,8,1.5,1.5,0,0,1,21.5,9.5Z",
        insertTable: "M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M9.5,13.5v-3  h5v3H9.5z M14.5,15v2.5h-5V15H14.5z M9.5,9V6.5h5V9H9.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M3.5,10.5H8v3H3.5V10.5z M3.5,17  v-2H8v2.5H4C3.7,17.5,3.5,17.3,3.5,17z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M16,9V6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16z",
        insertVideo: "M15,8v8H5V8H15m2,2.5V7a1,1,0,0,0-1-1H4A1,1,0,0,0,3,7V17a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V13.5l2.29,2.29A1,1,0,0,0,21,15.08V8.91a1,1,0,0,0-1.71-.71Z",
        upload: "M12 6.66667a4.87654 4.87654 0 0 1 4.77525 3.92342l0.29618 1.50268 1.52794 0.10578a2.57021 2.57021 0 0 1 -0.1827 5.13478H6.5a3.49774 3.49774 0 0 1 -0.3844 -6.97454l1.06682 -0.11341L7.678 9.29387A4.86024 4.86024 0 0 1 12 6.66667m0 -2A6.871 6.871 0 0 0 5.90417 8.37 5.49773 5.49773 0 0 0 6.5 19.33333H18.41667a4.57019 4.57019 0 0 0 0.32083 -9.13A6.86567 6.86567 0 0 0 12 4.66667Zm0.99976 7.2469h1.91406L11.99976 9 9.08618 11.91357h1.91358v3H11V16h2V14h-0.00024Z",
        italic: "M11.76,9h2l-2.2,10h-2Zm1.68-4a1,1,0,1,0,1,1,1,1,0,0,0-1-1Z",
        search: "M15.5 14h-0.79l-0.28 -0.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09 -0.59 4.23 -1.57l0.27 0.28v0.79l5 4.99L20.49 19l-4.99 -5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
        lineHeight: "M6.25,7h2.5L5.25,3.5,1.75,7h2.5V17H1.75l3.5,3.5L8.75,17H6.25Zm4-2V7h12V5Zm0,14h12V17h-12Zm0-6h12V11h-12Z",
        linkStyles: "M19,17.9l0.9,3.6l-3.2-1.9l-3.3,1.9l0.8-3.6L11.3,15h3.8l1.7-3.5l1.4,3.5H22L19,17.9z M20,12c0,0.3-0.1,0.7-0.2,1h2.1  c0.1-0.3,0.1-0.6,0.1-1c0-2.8-2.2-5-5-5h-4v2h4C18.7,9,20,10.3,20,12z M14.8,11H8v2h3.3h2.5L14.8,11z M9.9,16.4L8.5,15H7  c-1.7,0-3-1.3-3-3s1.3-3,3-3h4V7H7c-2.8,0-5,2.2-5,5s2.2,5,5,5h3.5L9.9,16.4z",
        mention: "M12.4,5c-4.1,0-7.5,3.4-7.5,7.5S8.3,20,12.4,20h3.8v-1.5h-3.8c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6v1.1  c0,0.6-0.5,1.2-1.1,1.2s-1.1-0.6-1.1-1.2v-1.1c0-2.1-1.7-3.8-3.8-3.8s-3.7,1.7-3.7,3.8s1.7,3.8,3.8,3.8c1,0,2-0.4,2.7-1.1  c0.5,0.7,1.3,1.1,2.2,1.1c1.5,0,2.6-1.2,2.6-2.7v-1.1C19.9,8.4,16.6,5,12.4,5z M12.4,14.7c-1.2,0-2.3-1-2.3-2.2s1-2.3,2.3-2.3  s2.3,1,2.3,2.3S13.6,14.7,12.4,14.7z",
        more: "M13.5,17c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,16.2,13.5,17z M13.5,12c0,0.8-0.7,1.5-1.5,1.5 s-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5S13.5,11.2,13.5,12z M13.5,7c0,0.8-0.7,1.5-1.5,1.5S10.5,7.8,10.5,7s0.7-1.5,1.5-1.5 S13.5,6.2,13.5,7z",
        openLink: "M17,17H7V7h3V5H7C6,5,5,6,5,7v10c0,1,1,2,2,2h10c1,0,2-1,2-2v-3h-2V17z M14,5v2h1.6l-5.8,5.8l1.4,1.4L17,8.4V10h2V5H14z",
        orderedList: "M2.5,16h2v.5h-1v1h1V18h-2v1h3V15h-3Zm1-7h1V5h-2V6h1Zm-1,2H4.3L2.5,13.1V14h3V13H3.7l1.8-2.1V10h-3Zm5-5V8h14V6Zm0,12h14V16H7.5Zm0-5h14V11H7.5Z",
        outdent: "M3,12l3,3V9L3,12z M3,19h18v-2H3V19z M3,7h18V5H3V7z M9,11h12V9H9V11z M9,15h12v-2H9V15z",
        pageBreaker: "M3,9v6l3-3L3,9z M21,9H8V4h2v3h9V4h2V9z M21,20h-2v-3h-9v3H8v-5h13V20z M11,13H8v-2h3V13z M16,13h-3v-2h3V13z M21,13h-3v-2  h3V13z",
        paragraphFormat: "M10.15,5A4.11,4.11,0,0,0,6.08,8.18,4,4,0,0,0,10,13v6h2V7h2V19h2V7h2V5ZM8,9a2,2,0,0,1,2-2v4A2,2,0,0,1,8,9Z",
        paragraphMore: "M7.682,5a4.11,4.11,0,0,0-4.07,3.18,4,4,0,0,0,3.11,4.725h0l.027.005a3.766,3.766,0,0,0,.82.09v6h2V7h2V19h2V7h2V5ZM5.532,9a2,2,0,0,1,2-2v4A2,2,0,0,1,5.532,9Zm14.94,8.491a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,17.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,13.491Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.472,9.491Z",
        paragraphStyle: "M4,9c0-1.1,0.9-2,2-2v4C4.9,11,4,10.1,4,9z M16.7,20.5l3.2,1.9L19,18.8l3-2.9h-3.7l-1.4-3.5L15.3,16h-3.8l2.9,2.9l-0.9,3.6  L16.7,20.5z M10,17.4V19h1.6L10,17.4z M6.1,5c-1.9,0-3.6,1.3-4,3.2c-0.5,2.1,0.8,4.2,2.9,4.7c0,0,0,0,0,0h0.2C5.5,13,5.8,13,6,13v6  h2V7h2v7h2V7h2V5H6.1z",
        pdfExport: "M7,3C5.9,3,5,3.9,5,5v14c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V7.6L14.4,3H7z M17,19H7V5h6v4h4V19z M16.3,13.5  c-0.2-0.6-1.1-0.8-2.6-0.8c-0.1,0-0.1,0-0.2,0c-0.3-0.3-0.8-0.9-1-1.2c-0.2-0.2-0.3-0.3-0.4-0.6c0.2-0.7,0.2-1,0.3-1.5  c0.1-0.9,0-1.6-0.2-1.8c-0.4-0.2-0.7-0.2-0.9-0.2c-0.1,0-0.3,0.2-0.7,0.7c-0.2,0.7-0.1,1.8,0.6,2.8c-0.2,0.8-0.7,1.6-1,2.4  c-0.8,0.2-1.5,0.7-1.9,1.1c-0.7,0.7-0.9,1.1-0.7,1.6c0,0.3,0.2,0.6,0.7,0.6c0.3-0.1,0.3-0.2,0.7-0.3c0.6-0.3,1.2-1.7,1.7-2.4  c0.8-0.2,1.7-0.3,2-0.3c0.1,0,0.3,0,0.6,0c0.8,0.8,1.2,1.1,1.8,1.2c0.1,0,0.2,0,0.3,0c0.3,0,0.8-0.1,1-0.6  C16.4,14.1,16.4,13.9,16.3,13.5z M8.3,15.7c-0.1,0.1-0.2,0.1-0.2,0.1c0-0.1,0-0.3,0.6-0.8c0.2-0.2,0.6-0.3,0.9-0.7  C9,15,8.6,15.5,8.3,15.7z M11.3,9c0-0.1,0.1-0.2,0.1-0.2S11.6,9,11.5,10c0,0.1,0,0.3-0.1,0.7C11.3,10.1,11,9.5,11.3,9z M10.9,13.1  c0.2-0.6,0.6-1,0.7-1.5c0.1,0.1,0.1,0.1,0.2,0.2c0.1,0.2,0.3,0.7,0.7,0.9C12.2,12.8,11.6,13,10.9,13.1z M15.2,14.1  c-0.1,0-0.1,0-0.2,0c-0.2,0-0.7-0.2-1-0.7c1.1,0,1.6,0.2,1.6,0.6C15.5,14.1,15.4,14.1,15.2,14.1z",
        print: "M16.1,17c0-0.6,0.4-1,1-1c0.6,0,1,0.4,1,1s-0.4,1-1,1C16.5,18,16.1,17.6,16.1,17z M22,15v4c0,1.1-0.9,2-2,2H4  c-1.1,0-2-0.9-2-2v-4c0-1.1,0.9-2,2-2h1V5c0-1.1,0.9-2,2-2h7.4L19,7.6V13h1C21.1,13,22,13.9,22,15z M7,13h10V9h-4V5H7V13z M20,15H4  v4h16V15z",
        redo: "M13.6,9.4c1.7,0.3,3.2,0.9,4.6,2L21,8.5v7h-7l2.7-2.7C13,10.1,7.9,11,5.3,14.7c-0.2,0.3-0.4,0.5-0.5,0.8L3,14.6  C5.1,10.8,9.3,8.7,13.6,9.4z",
        removeTable: "M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z",
        remove: "M15,10v8H9v-8H15 M14,4H9.9l-1,1H6v2h12V5h-3L14,4z M17,8H7v10c0,1.1,0.9,2,2,2h6c1.1,0,2-0.9,2-2V8z",
        replaceImage: "M16,5v3H4v2h12v3l4-4L16,5z M8,19v-3h12v-2H8v-3l-4,4L8,19z",
        row: "M20,5H4C2.9,5,2,5.9,2,7v2v1.5v3V15v2c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2v-2v-1.5v-3V9V7C22,5.9,21.1,5,20,5z M16,6.5h4  c0.3,0,0.5,0.2,0.5,0.5v2H16V6.5z M9.5,6.5h5V9h-5V6.5z M3.5,7c0-0.3,0.2-0.5,0.5-0.5h4V9H3.5V7z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.5  v-2H8V17.5z M14.5,17.5h-5V15h5V17.5z M20.5,17c0,0.3-0.2,0.5-0.5,0.5h-4V15h4.5V17z",
        selectAll: "M5,7h2V5C5.9,5,5,5.9,5,7z M5,11h2V9H5V11z M9,19h2v-2H9V19z M5,11h2V9H5V11z M15,5h-2v2h2V5z M17,5v2h2C19,5.9,18.1,5,17,5  z M7,19v-2H5C5,18.1,5.9,19,7,19z M5,15h2v-2H5V15z M11,5H9v2h2V5z M13,19h2v-2h-2V19z M17,11h2V9h-2V11z M17,19c1.1,0,2-0.9,2-2h-2  V19z M17,11h2V9h-2V11z M17,15h2v-2h-2V15z M13,19h2v-2h-2V19z M13,7h2V5h-2V7z M9,15h6V9H9V15z M11,11h2v2h-2V11z",
        smile: "M11.991,3A9,9,0,1,0,21,12,8.99557,8.99557,0,0,0,11.991,3ZM12,19a7,7,0,1,1,7-7A6.99808,6.99808,0,0,1,12,19Zm3.105-5.2h1.503a4.94542,4.94542,0,0,1-9.216,0H8.895a3.57808,3.57808,0,0,0,6.21,0ZM7.5,9.75A1.35,1.35,0,1,1,8.85,11.1,1.35,1.35,0,0,1,7.5,9.75Zm6.3,0a1.35,1.35,0,1,1,1.35,1.35A1.35,1.35,0,0,1,13.8,9.75Z",
        spellcheck: "M19.1,13.6l-5.6,5.6l-2.7-2.7l-1.4,1.4l4.1,4.1l7-7L19.1,13.6z M10.8,13.7l2.7,2.7l0.8-0.8L10.5,5h-2l-5,14h2l1.4-4h2.6  L10.8,13.7z M9.5,7.8l1.9,5.2H7.6L9.5,7.8z",
        star: "M12.1,7.7l1,2.5l0.4,0.9h1h2.4l-2.1,2l-0.6,0.6l0.2,0.9l0.6,2.3l-2.2-1.3L12,15.2l-0.8,0.5L9,17l0.5-2.5l0.1-0.8L9,13.1  l-2-2h2.5h0.9l0.4-0.8L12.1,7.7 M12.2,4L9.5,9.6H3.4L8,14.2L6.9,20l5.1-3.1l5.3,3.1l-1.5-5.8l4.8-4.6h-6.1L12.2,4L12.2,4z",
        strikeThrough: "M3,12.20294H21v1.5H16.63422a3.59782,3.59782,0,0,1,.34942,1.5929,3.252,3.252,0,0,1-1.31427,2.6997A5.55082,5.55082,0,0,1,12.20251,19a6.4421,6.4421,0,0,1-2.62335-.539,4.46335,4.46335,0,0,1-1.89264-1.48816,3.668,3.668,0,0,1-.67016-2.15546V14.704h.28723v-.0011h.34149v.0011H9.02v.11334a2.18275,2.18275,0,0,0,.85413,1.83069,3.69,3.69,0,0,0,2.32836.67926,3.38778,3.38778,0,0,0,2.07666-.5462,1.73346,1.73346,0,0,0,.7013-1.46655,1.69749,1.69749,0,0,0-.647-1.43439,3.00525,3.00525,0,0,0-.27491-.17725H3ZM16.34473,7.05981A4.18163,4.18163,0,0,0,14.6236,5.5462,5.627,5.627,0,0,0,12.11072,5,5.16083,5.16083,0,0,0,8.74719,6.06213,3.36315,3.36315,0,0,0,7.44006,8.76855a3.22923,3.22923,0,0,0,.3216,1.42786h2.59668c-.08338-.05365-.18537-.10577-.25269-.16064a1.60652,1.60652,0,0,1-.65283-1.30036,1.79843,1.79843,0,0,1,.68842-1.5108,3.12971,3.12971,0,0,1,1.96948-.55243,3.04779,3.04779,0,0,1,2.106.6687,2.35066,2.35066,0,0,1,.736,1.83258v.11341h2.00317V9.17346A3.90013,3.90013,0,0,0,16.34473,7.05981Z",
        subscript: "M10.4,12l3.6,3.6L12.6,17L9,13.4L5.4,17L4,15.6L7.6,12L4,8.4L5.4,7L9,10.6L12.6,7L14,8.4L10.4,12z M18.31234,19.674  l1.06812-1.1465c0.196-0.20141,0.37093-0.40739,0.5368-0.6088c0.15975-0.19418,0.30419-0.40046,0.432-0.617  c0.11969-0.20017,0.21776-0.41249,0.29255-0.6334c0.07103-0.21492,0.10703-0.43986,0.10662-0.66621  c0.00297-0.28137-0.04904-0.56062-0.1531-0.82206c-0.09855-0.24575-0.25264-0.46534-0.45022-0.6416  c-0.20984-0.18355-0.45523-0.32191-0.72089-0.40646c-0.63808-0.19005-1.3198-0.17443-1.94851,0.04465  c-0.28703,0.10845-0.54746,0.2772-0.76372,0.49487c-0.20881,0.20858-0.37069,0.45932-0.47483,0.73548  c-0.10002,0.26648-0.15276,0.54838-0.15585,0.833l-0.00364,0.237H17.617l0.00638-0.22692  c0.00158-0.12667,0.01966-0.25258,0.05377-0.37458c0.03337-0.10708,0.08655-0.20693,0.15679-0.29437  c0.07105-0.08037,0.15959-0.14335,0.25882-0.1841c0.22459-0.08899,0.47371-0.09417,0.7018-0.01458  c0.0822,0.03608,0.15559,0.08957,0.21509,0.15679c0.06076,0.07174,0.10745,0.15429,0.13761,0.24333  c0.03567,0.10824,0.05412,0.22141,0.05469,0.33538c-0.00111,0.08959-0.0118,0.17881-0.0319,0.26612  c-0.02913,0.10428-0.07076,0.20465-0.124,0.29893c-0.07733,0.13621-0.1654,0.26603-0.26338,0.38823  c-0.13438,0.17465-0.27767,0.34226-0.42929,0.50217l-2.15634,2.35315V21H21v-1.326H18.31234z",
        superscript: "M10.4,12,14,15.6,12.6,17,9,13.4,5.4,17,4,15.6,7.6,12,4,8.4,5.4,7,9,10.6,12.6,7,14,8.4Zm8.91234-3.326,1.06812-1.1465c.196-.20141.37093-.40739.5368-.6088a4.85745,4.85745,0,0,0,.432-.617,3.29,3.29,0,0,0,.29255-.6334,2.11079,2.11079,0,0,0,.10662-.66621,2.16127,2.16127,0,0,0-.1531-.82206,1.7154,1.7154,0,0,0-.45022-.6416,2.03,2.03,0,0,0-.72089-.40646,3.17085,3.17085,0,0,0-1.94851.04465,2.14555,2.14555,0,0,0-.76372.49487,2.07379,2.07379,0,0,0-.47483.73548,2.446,2.446,0,0,0-.15585.833l-.00364.237H18.617L18.62338,5.25a1.45865,1.45865,0,0,1,.05377-.37458.89552.89552,0,0,1,.15679-.29437.70083.70083,0,0,1,.25882-.1841,1.00569,1.00569,0,0,1,.7018-.01458.62014.62014,0,0,1,.21509.15679.74752.74752,0,0,1,.13761.24333,1.08893,1.08893,0,0,1,.05469.33538,1.25556,1.25556,0,0,1-.0319.26612,1.34227,1.34227,0,0,1-.124.29893,2.94367,2.94367,0,0,1-.26338.38823,6.41629,6.41629,0,0,1-.42929.50217L17.19709,8.92642V10H22V8.674Z",
        symbols: "M15.77493,16.98885a8.21343,8.21343,0,0,0,1.96753-2.57651,7.34824,7.34824,0,0,0,.6034-3.07618A6.09092,6.09092,0,0,0,11.99515,5a6.13347,6.13347,0,0,0-4.585,1.79187,6.417,6.417,0,0,0-1.756,4.69207,6.93955,6.93955,0,0,0,.622,2.97415,8.06587,8.06587,0,0,0,1.949,2.53076H5.41452V19h5.54114v-.04331h-.00147V16.84107a5.82825,5.82825,0,0,1-2.2052-2.2352A6.40513,6.40513,0,0,1,7.97672,11.447,4.68548,4.68548,0,0,1,9.07785,8.19191a3.73232,3.73232,0,0,1,2.9173-1.22462,3.76839,3.76839,0,0,1,2.91241,1.21489,4.482,4.482,0,0,1,1.11572,3.154,6.71141,6.71141,0,0,1-.75384,3.24732,5.83562,5.83562,0,0,1-2.22357,2.25759v2.11562H13.0444V19h5.54108V16.98885Z",
        tags: "M8.9749 7.47489a1.5 1.5 0 1 1 -1.5 1.5A1.5 1.5 0 0 1 8.9749 7.47489Zm3.78866 -3.12713L16.5362 8.12041l0.33565 0.33564 2.77038 2.77038a2.01988 2.01988 0 0 1 0.59 1.42 1.95518 1.95518 0 0 1 -0.5854 1.40455l0.00044 0.00043 -5.59583 5.59583 -0.00043 -0.00044a1.95518 1.95518 0 0 1 -1.40455 0.5854 1.98762 1.98762 0 0 1 -1.41 -0.58L8.45605 16.87185l-0.33564 -0.33565L4.35777 12.77357a1.99576 1.99576 0 0 1 -0.59 -1.42V9.36358l0 -3.59582a2.00579 2.00579 0 0 1 2 -2l3.59582 0h1.98995A1.98762 1.98762 0 0 1 12.76356 4.34776ZM15.46186 9.866l-0.33564 -0.33564L11.36359 5.76776H5.76776v5.59583L9.866 15.46186l2.7794 2.7794 5.5878 -5.60385 -0.001 -0.001Z",
        tableHeader: "M20,5H4C2.9,5,2,5.9,2,7v10c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V7C22,5.9,21.1,5,20,5z M8,17.5H4c-0.3,0-0.5-0.2-0.5-0.4  l0,0V17v-2H8V17.5z M8,13.5H3.5v-3H8V13.5z M14.5,17.5h-5V15h5V17.5z M14.5,13.5h-5v-3h5V13.5z M20.5,17c0,0.3-0.2,0.5-0.4,0.5l0,0  H16V15h4.5V17z M20.5,13.5H16v-3h4.5V13.5z M20.5,9h-4.4H16h-1.5h-5H8H7.9H3.5V7c0-0.3,0.2-0.5,0.4-0.5l0,0h4l0,0h8.2l0,0H20  c0.3,0,0.5,0.2,0.5,0.4l0,0V9z",
        tableStyle: "M20.0171,19.89752l.9,3.6-3.2-1.9-3.3,1.9.8-3.6-2.9-2.9h3.8l1.7-3.5,1.4,3.5h3.8ZM20,5H4A2.00591,2.00591,0,0,0,2,7V17a2.00591,2.00591,0,0,0,2,2h7.49115l-.58826-.58826L9.99115,17.5H9.5V14.9975h5.36511L16,12.66089V10.5h4.5v3h-.52783l.599,1.4975H22V7A2.00591,2.00591,0,0,0,20,5ZM3.5,7A.4724.4724,0,0,1,4,6.5H8V9H3.5Zm0,3.5H8v3H3.5Zm.5,7a.4724.4724,0,0,1-.5-.5V15H8v2.5Zm10.5-4h-5v-3h5Zm0-4.5h-5V6.5h5Zm6,0H16V6.5h4a.4724.4724,0,0,1,.5.5Z",
        textColor: "M15.2,13.494s-3.6,3.9-3.6,6.3a3.65,3.65,0,0,0,7.3.1v-.1C18.9,17.394,15.2,13.494,15.2,13.494Zm-1.47-1.357.669-.724L12.1,5h-2l-5,14h2l1.43-4h2.943A24.426,24.426,0,0,1,13.726,12.137ZM11.1,7.8l1.86,5.2H9.244Z",
        textMore: "M13.55,19h2l-5-14h-2l-5,14h2l1.4-4h5.1Zm-5.9-6,1.9-5.2,1.9,5.2Zm12.8,4.5a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,17.5Zm0-4a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,20.45,13.5Zm0-4A1.5,1.5,0,1,1,18.95,8,1.5,1.5,0,0,1,20.45,9.5Z",
        underline: "M19,20v2H5V20Zm-3-6.785a4,4,0,0,1-5.74,3.4A3.75,3.75,0,0,1,8,13.085V5.005H6v8.21a6,6,0,0,0,8,5.44,5.851,5.851,0,0,0,4-5.65v-8H16ZM16,5v0h2V5ZM8,5H6v0H8Z",
        undo: "M10.4,9.4c-1.7,0.3-3.2,0.9-4.6,2L3,8.5v7h7l-2.7-2.7c3.7-2.6,8.8-1.8,11.5,1.9c0.2,0.3,0.4,0.5,0.5,0.8l1.8-0.9  C18.9,10.8,14.7,8.7,10.4,9.4z",
        unlink: "M14.4,11l1.6,1.6V11H14.4z M17,7h-4v1.9h4c1.7,0,3.1,1.4,3.1,3.1c0,1.3-0.8,2.4-1.9,2.8l1.4,1.4C21,15.4,22,13.8,22,12  C22,9.2,19.8,7,17,7z M2,4.3l3.1,3.1C3.3,8.1,2,9.9,2,12c0,2.8,2.2,5,5,5h4v-1.9H7c-1.7,0-3.1-1.4-3.1-3.1c0-1.6,1.2-2.9,2.8-3.1  L8.7,11H8v2h2.7l2.3,2.3V17h1.7l4,4l1.4-1.4L3.4,2.9L2,4.3z",
        unorderedList: "M4,10.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,10.5,4,10.5z M4,5.5C3.2,5.5,2.5,6.2,2.5,7  S3.2,8.5,4,8.5S5.5,7.8,5.5,7S4.8,5.5,4,5.5z M4,15.5c-0.8,0-1.5,0.7-1.5,1.5s0.7,1.5,1.5,1.5s1.5-0.7,1.5-1.5S4.8,15.5,4,15.5z   M7.5,6v2h14V6H7.5z M7.5,18h14v-2h-14V18z M7.5,13h14v-2h-14V13z",
        verticalAlignBottom: "M16,13h-3V3h-2v10H8l4,4L16,13z M3,19v2h18v-2H3z",
        verticalAlignMiddle: "M3,11v2h18v-2H3z M8,18h3v3h2v-3h3l-4-4L8,18z M16,6h-3V3h-2v3H8l4,4L16,6z",
        verticalAlignTop: "M8,11h3v10h2V11h3l-4-4L8,11z M21,5V3H3v2H21z"
    }, $e.MODULES.modals = function(l) {
        var i = l.$;
        l.shared.modals || (l.shared.modals = {});
        var r, c = l.shared.modals;

        function e() {
            for (var e in c)
                if (Object.prototype.hasOwnProperty.call(c, e)) {
                    var t = c[e];
                    t && t.$modal && t.$modal.removeData().remove()
                }
            r && r.removeData().remove(), c = {}
        }

        function s(e, t) {
            if (c[e]) {
                var n = c[e].$modal,
                    a = n.data("instance") || l;
                a.events.enableBlur(), n.hide(), r.hide(), i(a.o_doc).find("body").first().removeClass("prevent-scroll fr-mobile"), n.removeClass("fr-active"), t || (a.accessibility.restoreSelection(), a.events.trigger("modals.hide"))
            }
        }

        function n(e) {
            var t;
            if ("string" == typeof e) {
                if (!c[e]) return;
                t = c[e].$modal
            } else t = e;
            return t && l.node.hasClass(t, "fr-active") && l.core.sameInstance(t) || !1
        }

        return {
            _init: function t() {
                l.events.on("shared.destroy", e, !0)
            },
            get: function a(e) {
                return c[e]
            },
            create: function d(n, e, t) {
                if (e = '<div class="fr-modal-head-line">'.concat(e, "</div>"), l.shared.$overlay || (l.shared.$overlay = i(l.doc.createElement("DIV")).addClass("fr-overlay"), i("body").first().append(l.shared.$overlay)), r = l.shared.$overlay, l.opts.theme && r.addClass("".concat(l.opts.theme, "-theme")), !c[n]) {
                    var a = function o(e, t) {
                        var n = '<div tabIndex="-1" class="fr-modal'.concat(l.opts.theme ? " ".concat(l.opts.theme, "-theme") : "", '"><div class="fr-modal-wrapper">'),
                            a = '<button title="'.concat(l.language.translate("Cancel"), '" class="fr-command fr-btn fr-modal-close"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24"><path d="').concat($e.SVG.close, '"/></svg></button>');
                        n += '<div class="fr-modal-head">'.concat(e).concat(a, "</div>"), n += '<div tabIndex="-1" class="fr-modal-body">'.concat(t, "</div>"), n += "</div></div>";
                        var r = i(l.doc.createElement("DIV"));
                        return r.html(n), r.find("> .fr-modal")
                    }(e, t);
                    c[n] = {
                        $modal: a,
                        $head: a.find(".fr-modal-head"),
                        $body: a.find(".fr-modal-body")
                    }, l.helpers.isMobile() || a.addClass("fr-desktop"), i("body").first().append(a), l.events.$on(a, "click", ".fr-modal-close", function() {
                        s(n)
                    }, !0), c[n].$body.css("margin-top", c[n].$head.outerHeight()), l.events.$on(a, "keydown", function(e) {
                        var t = e.which;
                        return t === $e.KEYCODE.ESC ? (s(n), l.accessibility.focusModalButton(a), !1) : !(!i(e.currentTarget).is("input[type=text], textarea") && t !== $e.KEYCODE.ARROW_UP && t !== $e.KEYCODE.ARROW_DOWN && !l.keys.isBrowserAction(e) && (e.preventDefault(), e.stopPropagation(), 1))
                    }, !0), s(n, !0)
                }
                return c[n]
            },
            show: function o(e) {
                if (c[e]) {
                    var t = c[e].$modal;
                    t.data("instance", l), t.show(), r.show(), i(l.o_doc).find("body").first().addClass("prevent-scroll"), l.helpers.isMobile() && i(l.o_doc).find("body").first().addClass("fr-mobile"), t.addClass("fr-active"), l.accessibility.focusModal(t)
                }
            },
            hide: s,
            resize: function f(e) {
                if (c[e]) {
                    var t = c[e],
                        n = t.$modal,
                        a = t.$body,
                        r = l.o_win.innerHeight,
                        o = n.find(".fr-modal-wrapper"),
                        i = r - o.outerHeight(!0) + (o.height() - (a.outerHeight(!0) - a.height())),
                        s = "auto";
                    i < a.get(0).scrollHeight && (s = i), a.height(s)
                }
            },
            isVisible: n,
            areVisible: function p(e) {
                for (var t in c)
                    if (Object.prototype.hasOwnProperty.call(c, t) && n(t) && (void 0 === e || c[t].$modal.data("instance") === e)) return c[t].$modal;
                return !1
            }
        }
    }, $e.MODULES.position = function(T) {
        var A = T.$;

        function r() {
            var e = T.selection.ranges(0).getBoundingClientRect();
            if (0 === e.top && 0 === e.left && 0 === e.width || 0 === e.height) {
                var t = !1;
                0 === T.$el.find(".fr-marker").length && (T.selection.save(), t = !0);
                var n = T.$el.find(".fr-marker").first();
                n.css("display", "inline"), n.css("line-height", "");
                var a = n.offset(),
                    r = n.outerHeight();
                n.css("display", "none"), n.css("line-height", 0), (e = {}).left = a && a.left, e.width = 0, e.height = r, e.top = a && a.top - (T.helpers.isMobile() && !T.helpers.isIOS() || T.opts.iframe ? 0 : T.helpers.scrollTop()), e.right = 1, e.bottom = 1, e.ok = !0, t && T.selection.restore()
            }
            return e
        }

        function o(e, t, n, a) {
            var r = n.data("container");
            if (!r || "BODY" === r.get(0).tagName && "static" === r.css("position") || (e && (e -= r.offset().left), t && (t -= r.offset().top), "BODY" !== r.get(0).tagName ? (e && (e += r.get(0).scrollLeft), t && (t += r.get(0).scrollTop)) : "absolute" === r.css("position") && (e && (e += r.position().left), t && (t += r.position().top))), T.opts.iframe && r && T.$tb && r.get(0) !== T.$tb.get(0)) {
                var o = T.helpers.getPX(T.$wp.find(".fr-iframe").css("padding-top")),
                    i = T.helpers.getPX(T.$wp.find(".fr-iframe").css("padding-left"));
                e && (e += T.$iframe.offset().left + i), t && (t += T.$iframe.offset().top + o)
            }
            var s = function l(e, t) {
                var n = e.outerWidth(!0);
                return t + n > T.$sc.get(0).clientWidth - 10 && (t = T.$sc.get(0).clientWidth - n - 10), t < 0 && (t = 10), t
            }(n, e);
            e && n.css("left", s), t && n.css("top", function c(e, t, n) {
                var a = e.outerHeight(!0);
                if (!T.helpers.isMobile() && T.$tb && e.parent().get(0) !== T.$tb.get(0)) {
                    var r = e.parent().offset().top,
                        o = t - a - (n || 0);
                    e.parent().get(0) === T.$sc.get(0) && (r -= e.parent().position().top);
                    var i = T.$sc.get(0).clientHeight;
                    r + t + a > T.$sc.offset().top + i && 0 < e.parent().offset().top + o && 0 < o ? o > T.$wp.scrollTop() && (t = o, e.addClass("fr-above")) : e.removeClass("fr-above")
                }
                return t
            }(n, t, a))
        }

        function t(e) {
            var n = A(e),
                t = n.is(".fr-sticky-on"),
                a = n.data("sticky-top"),
                r = n.data("sticky-scheduled");
            if (void 0 === a) {
                n.data("sticky-top", 0);
                var o = A('<div class="fr-sticky-dummy" style="height: '.concat(n.outerHeight(), 'px;"></div>'));
                T.$box.prepend(o)
            } else T.$box.find(".fr-sticky-dummy").css("height", n.outerHeight());
            if (T.core.hasFocus() || 0 < T.$tb.findVisible("input:focus").length) {
                var i = T.helpers.scrollTop(),
                    s = Math.min(Math.max(i - T.$tb.parent().offset().top, 0), T.$tb.parent().outerHeight() - n.outerHeight());
                if (s !== a && s !== r && (clearTimeout(n.data("sticky-timeout")), n.data("sticky-scheduled", s), n.outerHeight() < i - T.$tb.parent().offset().top && n.addClass("fr-opacity-0"), n.data("sticky-timeout", setTimeout(function() {
                        var e = T.helpers.scrollTop(),
                            t = Math.min(Math.max(e - T.$tb.parent().offset().top, 0), T.$tb.parent().outerHeight() - n.outerHeight());
                        0 < t && "BODY" === T.$tb.parent().get(0).tagName && (t += T.$tb.parent().position().top), t !== a && (n.css("top", Math.max(t, 0)), n.data("sticky-top", t), n.data("sticky-scheduled", t)), n.removeClass("fr-opacity-0")
                    }, 100))), !t) {
                    var l = T.$tb.parent(),
                        c = l.get(0).offsetWidth - l.get(0).clientWidth;
                    n.css("top", "0"), n.width(l.width() - c), n.addClass("fr-sticky-on"), T.$box.addClass("fr-sticky-box")
                }
            } else clearTimeout(A(e).css("sticky-timeout")), n.css("top", "0"), n.css("position", ""), n.css("width", ""), n.data("sticky-top", 0), n.removeClass("fr-sticky-on"), T.$box.removeClass("fr-sticky-box")
        }

        function n(e) {
            if (e.offsetWidth) {
                var t = A(e),
                    n = t.outerHeight(),
                    a = t.data("sticky-position"),
                    r = A("body" === T.opts.scrollableContainer ? T.o_win : T.opts.scrollableContainer).outerHeight(),
                    o = 0,
                    i = 0;
                "body" !== T.opts.scrollableContainer && (o = T.$sc.offset().top, i = A(T.o_win).outerHeight() - o - r);
                var s = "body" === T.opts.scrollableContainer ? T.helpers.scrollTop() : o,
                    l = t.is(".fr-sticky-on");
                t.data("sticky-parent") || t.data("sticky-parent", t.parent());
                var c = t.data("sticky-parent"),
                    d = c.offset().top,
                    f = c.outerHeight();
                if (t.data("sticky-offset") ? T.$box.find(".fr-sticky-dummy").css("height", "".concat(n, "px")) : (t.data("sticky-offset", !0), t.after('<div class="fr-sticky-dummy" style="height: '.concat(n, 'px;"></div>'))), !a) {
                    var p = "auto" !== t.css("top") || "auto" !== t.css("bottom");
                    p || t.css("position", "fixed"), a = {
                        top: T.node.hasClass(t.get(0), "fr-top"),
                        bottom: T.node.hasClass(t.get(0), "fr-bottom")
                    }, p || t.css("position", ""), t.data("sticky-position", a), t.data("top", T.node.hasClass(t.get(0), "fr-top") ? t.css("top") : "auto"), t.data("bottom", T.node.hasClass(t.get(0), "fr-bottom") ? t.css("bottom") : "auto")
                }
                var u = T.helpers.getPX(t.data("top")),
                    h = T.helpers.getPX(t.data("bottom")),
                    g = a.top && function b() {
                        return d < s + u && s + u <= d + f - n
                    }() && (T.helpers.isInViewPort(T.$sc.get(0)) || "body" === T.opts.scrollableContainer),
                    m = a.bottom && function E() {
                        return d + n < s + r - h && s + r - h < d + f
                    }();
                if (g || m) {
                    var v = c.get(0).offsetWidth - c.get(0).clientWidth;
                    t.css("width", "".concat(c.get(0).getBoundingClientRect().width - v, "px")), l || (t.addClass("fr-sticky-on"), t.removeClass("fr-sticky-off"), t.css("top") && ("auto" !== t.data("top") ? t.css("top", T.helpers.getPX(t.data("top")) + o) : t.data("top", "auto")), t.css("bottom") && ("auto" !== t.data("bottom") ? t.css("bottom", T.helpers.getPX(t.data("bottom")) + i) : t.css("bottom", "auto")))
                } else T.node.hasClass(t.get(0), "fr-sticky-off") || (t.css("width", ""), t.removeClass("fr-sticky-on"), t.addClass("fr-sticky-off"), t.css("top") && "auto" !== t.data("top") && a.top && t.css("top", 0), t.css("bottom") && "auto" !== t.data("bottom") && a.bottom && t.css("bottom", 0))
            }
        }

        function a() {
            if (T.helpers.requestAnimationFrame()(a), !1 !== T.events.trigger("position.refresh"))
                for (var e = 0; e < T._stickyElements.length; e++) t(T._stickyElements[e])
        }

        function i() {
            if (T._stickyElements)
                for (var e = 0; e < T._stickyElements.length; e++) n(T._stickyElements[e])
        }

        return {
            _init: function s() {
                ! function e() {
                    T._stickyElements = [], T.helpers.isIOS() ? (a(), T.events.$on(A(T.o_win), "scroll", function() {
                        if (T.core.hasFocus())
                            for (var e = 0; e < T._stickyElements.length; e++) {
                                var t = A(T._stickyElements[e]),
                                    n = t.parent(),
                                    a = T.helpers.scrollTop();
                                t.outerHeight() < a - n.offset().top && (t.addClass("fr-opacity-0"), t.data("sticky-top", -1), t.data("sticky-scheduled", -1))
                            }
                    }, !0)) : ("body" !== T.opts.scrollableContainer && T.events.$on(A(T.opts.scrollableContainer), "scroll", i, !0), T.events.$on(A(T.o_win), "scroll", i, !0), T.events.$on(A(T.o_win), "resize", i, !0), T.events.on("initialized", i), T.events.on("focus", i), T.events.$on(A(T.o_win), "resize", "textarea", i, !0)), T.events.on("destroy", function() {
                        T._stickyElements = []
                    })
                }()
            },
            forSelection: function l(e) {
                var t = r();
                e.css({ top: 0, left: 0 });
                var n = t.top + t.height,
                    a = t.left + t.width / 2 - e.get(0).offsetWidth / 2 + T.helpers.scrollLeft();
                T.opts.iframe || (n += T.helpers.scrollTop()), o(a, n, e, t.height)
            },
            addSticky: function c(e) {
                e.addClass("fr-sticky"), T.helpers.isIOS() && e.addClass("fr-sticky-ios"), e.removeClass("fr-sticky"), T._stickyElements.push(e.get(0))
            },
            refresh: i,
            at: o,
            getBoundingRect: r
        }
    }, $e.MODULES.refresh = function(l) {
        var c = l.$;

        function r(e, t) {
            e.toggleClass("fr-disabled", t).attr("aria-disabled", t)
        }

        function e(e) {
            var t = l.$tb.find('.fr-more-toolbar[data-name="'.concat(e.attr("data-group-name"), '"]')),
                n = function s(e, t) {
                    var n = 0,
                        a = t.find("> .fr-command, > .fr-btn-wrap");
                    a.each(function(e, t) {
                        n += c(t).outerWidth()
                    });
                    var r, o = l.helpers.getPX(c(a[0]).css("margin-left")),
                        i = l.helpers.getPX(c(a[0]).css("margin-right"));
                    r = "rtl" === l.opts.direction ? l.$tb.outerWidth() - e.offset().left + l.$tb.offset().left - (n + e.outerWidth() + a.length * (o + i)) / 2 : e.offset().left - l.$tb.offset().left - (n - e.outerWidth() + a.length * (o + i)) / 2;
                    r + n + a.length * (o + i) > l.$tb.outerWidth() && (r -= (n + a.length * (o + i) - e.outerWidth()) / 2);
                    r < 0 && (r = 0);
                    return r
                }(e, t);
            "rtl" === l.opts.direction ? t.css("padding-right", n) : t.css("padding-left", n)
        }

        return {
            undo: function t(e) {
                r(e, !l.undo.canDo())
            },
            redo: function n(e) {
                r(e, !l.undo.canRedo())
            },
            outdent: function o(e) {
                if (l.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                for (var t = l.selection.blocks(), n = 0; n < t.length; n++) {
                    var a = "rtl" === l.opts.direction || "rtl" === c(t[n]).css("direction") ? "margin-right" : "margin-left";
                    if ("LI" === t[n].tagName || "LI" === t[n].parentNode.tagName) return r(e, !1), !0;
                    if (0 < l.helpers.getPX(c(t[n]).css(a))) return r(e, !1), !0
                }
                r(e, !0)
            },
            indent: function i(e) {
                if (l.node.hasClass(e.get(0), "fr-no-refresh")) return !1;
                for (var t = l.selection.blocks(), n = 0; n < t.length; n++) {
                    for (var a = t[n].previousSibling; a && a.nodeType === Node.TEXT_NODE && 0 === a.textContent.length;) a = a.previousSibling;
                    if ("LI" !== t[n].tagName || a) return r(e, !1), !0;
                    r(e, !0)
                }
            },
            moreText: e,
            moreParagraph: e,
            moreMisc: e,
            moreRich: e
        }
    }, Object.assign($e.DEFAULTS, {
        attribution: !0,
        toolbarBottom: !1,
        toolbarButtons: null,
        toolbarButtonsXS: null,
        toolbarButtonsSM: null,
        toolbarButtonsMD: null,
        toolbarContainer: null,
        toolbarInline: !1,
        toolbarSticky: !0,
        toolbarStickyOffset: 0,
        toolbarVisibleWithoutSelection: !1
    }), $e.TOOLBAR_BUTTONS = {
        moreText: { buttons: ["fullscreen", "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontSize", "textColor", "backgroundColor", "inlineClass", "inlineStyle", "clearFormatting"] },
        moreParagraph: { buttons: ["alignRight", "alignCenter", "alignJustify", "alignLeft", "lineHeight", "outdent", "indent", "quote"] },
        moreRich: { buttons: ["insertLink", "insertImage", "insertVideo", "insertTable", "emoticons", "fontAwesome", "specialCharacters", "embedly"] },
        moreMisc: {
            buttons: ["undo", "redo", "selectAll", , "print", "spellChecker", "html", "help"],
            align: "right",
            buttonsVisible: 3
        }
    }, $e.TOOLBAR_BUTTONS_MD = null, ($e.TOOLBAR_BUTTONS_SM = {}).moreText = Object.assign({}, $e.TOOLBAR_BUTTONS.moreText, { buttonsVisible: 2 }), $e.TOOLBAR_BUTTONS_SM.moreParagraph = Object.assign({}, $e.TOOLBAR_BUTTONS.moreParagraph, { buttonsVisible: 2 }), $e.TOOLBAR_BUTTONS_SM.moreRich = Object.assign({}, $e.TOOLBAR_BUTTONS.moreRich, { buttonsVisible: 2 }), $e.TOOLBAR_BUTTONS_SM.moreMisc = Object.assign({}, $e.TOOLBAR_BUTTONS.moreMisc, { buttonsVisible: 2 }), ($e.TOOLBAR_BUTTONS_XS = {}).moreText = Object.assign({}, $e.TOOLBAR_BUTTONS.moreText, { buttonsVisible: 0 }), $e.TOOLBAR_BUTTONS_XS.moreParagraph = Object.assign({}, $e.TOOLBAR_BUTTONS.moreParagraph, { buttonsVisible: 0 }), $e.TOOLBAR_BUTTONS_XS.moreRich = Object.assign({}, $e.TOOLBAR_BUTTONS.moreRich, { buttonsVisible: 0 }), $e.TOOLBAR_BUTTONS_XS.moreMisc = Object.assign({}, $e.TOOLBAR_BUTTONS.moreMisc, { buttonsVisible: 2 }), $e.POWERED_BY = '<a id="logo" href="#" title="كودۋاز گۇرۇپپىسى"><span>كودۋازلار</span></a>', $e.MODULES.toolbar = function(m) {
        var v, b = m.$,
            t = [];

        function e(e) {
            var n = {};
            if (Array.isArray(e)) {
                if (!Array.isArray(e[0])) {
                    for (var t = [], a = [], r = 0; r < e.length; r++) "|" === e[r] || "-" === e[r] ? (0 < a.length && t.push(a), a = []) : a.push(e[r]);
                    0 < a.length && t.push(a), e = t
                }
                e.forEach(function(e, t) {
                    n["group".concat(t + 1)] = { buttons: e }
                }), n.showMoreButtons = !1
            } else "object" !== Fe(e) || Array.isArray(e) || ((n = e).showMoreButtons = !0);
            return n
        }

        function E() {
            var e = m.helpers.screenSize();
            return t[v = e]
        }

        function T() {
            for (var e = m.$tb.find(".fr-more-toolbar"), c = "", t = 0; t < e.length; t++) {
                var d = b(e[t]);
                d.hasClass("fr-expanded") ? function() {
                    var n = m.helpers.getPX(d.css("padding-left")),
                        e = d.find("> .fr-command, > .fr-btn-wrap"),
                        t = b(e[0]),
                        a = m.helpers.getPX(t.css("margin-left")),
                        r = m.helpers.getPX(t.css("margin-right")),
                        o = m.helpers.getPX(t.css("margin-top")),
                        i = m.helpers.getPX(t.css("margin-bottom"));
                    if (e.each(function(e, t) {
                            n += b(t).outerWidth() + a + r
                        }), m.$tb.outerWidth() < n) {
                        var s = Math.floor(n / m.$tb.outerWidth());
                        n += s * (n / d[0].childElementCount), s = Math.ceil(n / m.$tb.outerWidth());
                        var l = (m.helpers.getPX(t.css("height")) + o + i) * s;
                        d.css("height", l), c = l
                    }
                }() : d.css("height", "")
            }
            m.$tb.css("padding-bottom", c)
        }

        function a() {
            if (v !== m.helpers.screenSize()) {
                var e = E(),
                    t = b(),
                    n = b();
                for (var a in m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").addClass("fr-hidden"),
                        function g() {
                            for (var t = m.$tb.find(".fr-btn-grp, .fr-more-toolbar"), a = function a(e) {
                                    var n = b(t[e]);
                                    n.children().each(function(e, t) {
                                        n.before(t)
                                    }), n.remove()
                                }, e = 0; e < t.length; e++) a(e)
                        }(), e) {
                    var r = e[a];
                    if (r.buttons) {
                        var o = void 0,
                            i = 0,
                            s = 3,
                            l = b('<div class="fr-btn-grp fr-float-'.concat(e[a].align ? e[a].align : "left", '"></div>'));
                        e.showMoreButtons && (o = b('<div class="fr-more-toolbar"></div>').data("name", "".concat(a, "-").concat(m.id)));
                        for (var c = 0; c < r.buttons.length; c++) {
                            r.buttonsVisible !== undefined && (s = r.buttonsVisible);
                            var d = m.$tb.find('> .fr-command[data-cmd="' + r.buttons[c] + '"], > div.fr-btn-wrap > .fr-command[data-cmd="' + r.buttons[c] + '"]'),
                                f = null;
                            m.node.hasClass(d.next().get(0), "fr-dropdown-menu") && (f = d.next()), m.node.hasClass(d.next().get(0), "fr-options") && (d.removeClass("fr-hidden"), d.next().removeClass("fr-hidden"), d = d.parent()), d.removeClass("fr-hidden"), e.showMoreButtons && s <= i ? (o.append(d), f && o.append(f)) : (l.append(d), f && l.append(f)), i++
                        }
                        if (e.showMoreButtons && s < i) {
                            var p = m.$tb.find('.fr-command[data-cmd="'.concat(a, '"]'));
                            if (0 < p.length) p.removeClass("fr-hidden fr-open");
                            else {
                                var u = a,
                                    h = $e.COMMANDS[u];
                                h.more_btn = !0, p = b(m.button.build(u, h, !0)), m.button.addButtons(p)
                            }
                            l.append(p)
                        }
                        t.push(l), e.showMoreButtons && n.push(o)
                    }
                }
                m.opts.toolbarBottom ? (m.$tb.append(n), m.$tb.find(".fr-newline").remove(), m.$tb.append('<div class="fr-newline"></div>'), m.$tb.append(t)) : (m.$tb.append(t), m.$tb.find(".fr-newline").remove(), m.$tb.append('<div class="fr-newline"></div>'), m.$tb.append(n)), m.$tb.removeClass("fr-toolbar-open"), m.$box.removeClass("fr-toolbar-open"), m.events.trigger("codeView.toggle")
            }
            T()
        }

        function n(e, t) {
            setTimeout(function() {
                if ((!e || e.which != $e.KEYCODE.ESC) && m.selection.inEditor() && m.core.hasFocus() && !m.popups.areVisible() && "false" != b(m.selection.blocks()[0]).closest("table").attr("contenteditable") && (m.opts.toolbarVisibleWithoutSelection || !m.selection.isCollapsed() && !m.keys.isIME() || t)) {
                    if (m.$tb.data("instance", m), !1 === m.events.trigger("toolbar.show", [e])) return;
                    m.$tb.show(), m.opts.toolbarContainer || m.position.forSelection(m.$tb), 1 < m.opts.zIndex ? m.$tb.css("z-index", m.opts.zIndex + 1) : m.$tb.css("z-index", null)
                }
            }, 0)
        }

        function r(e) {
            return (!e || "blur" !== e.type || document.activeElement !== m.el) && (!(!e || "keydown" !== e.type || !m.keys.ctrlKey(e)) || (!!m.button.getButtons(".fr-dropdown.fr-active").next().find(m.o_doc.activeElement).length || void(!1 !== m.events.trigger("toolbar.hide") && m.$tb.hide())))
        }

        t[$e.XS] = e(m.opts.toolbarButtonsXS || m.opts.toolbarButtons || $e.TOOLBAR_BUTTONS_XS || $e.TOOLBAR_BUTTONS || []), t[$e.SM] = e(m.opts.toolbarButtonsSM || m.opts.toolbarButtons || $e.TOOLBAR_BUTTONS_SM || $e.TOOLBAR_BUTTONS || []), t[$e.MD] = e(m.opts.toolbarButtonsMD || m.opts.toolbarButtons || $e.TOOLBAR_BUTTONS_MD || $e.TOOLBAR_BUTTONS || []), t[$e.LG] = e(m.opts.toolbarButtons || $e.TOOLBAR_BUTTONS || []);
        var o = null;

        function i(e) {
            clearTimeout(o), e && e.which === $e.KEYCODE.ESC || (o = setTimeout(n, m.opts.typingTimer))
        }

        function s() {
            m.events.on("window.mousedown", r), m.events.on("keydown", r), m.events.on("blur", r), m.events.$on(m.$tb, "transitionend", ".fr-more-toolbar", function() {
                m.position.forSelection(m.$tb)
            }), m.helpers.isMobile() || m.events.on("window.mouseup", n), m.helpers.isMobile() ? m.helpers.isIOS() || (m.events.on("window.touchend", n), m.browser.mozilla && setInterval(n, 200)) : m.events.on("window.keyup", i), m.events.on("keydown", function(e) {
                e && e.which === $e.KEYCODE.ESC && r()
            }), m.events.on("keydown", function(e) {
                if (e.which === $e.KEYCODE.ALT) return e.stopPropagation(), !1
            }, !0), m.events.$on(m.$wp, "scroll.toolbar", n), m.events.on("commands.after", n), m.helpers.isMobile() && (m.events.$on(m.$doc, "selectionchange", i), m.events.$on(m.$doc, "orientationchange", n))
        }

        function l() {
            m.$tb.html("").removeData().remove(), m.$tb = null, m.$second_tb && (m.$second_tb.html("").removeData().remove(), m.$second_tb = null)
        }

        function c() {
            m.$box.removeClass("fr-top fr-bottom fr-inline fr-basic"), m.$box.find(".fr-sticky-dummy").remove()
        }

        function d() {
            m.opts.theme && m.$tb.addClass("".concat(m.opts.theme, "-theme")), 1 < m.opts.zIndex && m.$tb.css("z-index", m.opts.zIndex + 1), "auto" !== m.opts.direction && m.$tb.removeClass("fr-ltr fr-rtl").addClass("fr-".concat(m.opts.direction)), m.helpers.isMobile() ? m.$tb.addClass("fr-mobile") : m.$tb.addClass("fr-desktop"), m.opts.toolbarContainer ? (m.opts.toolbarInline && (s(), r()), m.opts.toolbarBottom ? m.$tb.addClass("fr-bottom") : m.$tb.addClass("fr-top")) : function e() {
                    m.opts.toolbarInline ? (m.$sc.append(m.$tb), m.$tb.data("container", m.$sc), m.$tb.addClass("fr-inline"), s(), m.opts.toolbarBottom = !1) : (m.opts.toolbarBottom && !m.helpers.isIOS() ? (m.$box.append(m.$tb), m.$tb.addClass("fr-bottom"), m.$box.addClass("fr-bottom")) : (m.opts.toolbarBottom = !1, m.$box.prepend(m.$tb), m.$tb.addClass("fr-top"), m.$box.addClass("fr-top")), m.$tb.addClass("fr-basic"), m.opts.toolbarSticky && (m.opts.toolbarStickyOffset && (m.opts.toolbarBottom ? m.$tb.css("bottom", m.opts.toolbarStickyOffset) : m.$tb.css("top", m.opts.toolbarStickyOffset)), m.position.addSticky(m.$tb)))
                }(),
                function t() {
                    var e = m.button.buildGroup(E());
                    m.$tb.append(e), T(), m.button.bindCommands(m.$tb)
                }(),
                function n() {
                    m.events.$on(b(m.o_win), "resize", a), m.events.$on(b(m.o_win), "orientationchange", a)
                }(), m.accessibility.registerToolbar(m.$tb), m.events.$on(m.$tb, "".concat(m._mousedown, " ").concat(m._mouseup), function(e) {
                    var t = e.originalEvent ? e.originalEvent.target || e.originalEvent.originalTarget : null;
                    if (t && "INPUT" !== t.tagName && !m.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1
                }, !0), m.helpers.isMobile() && m.events.$on(m.$tb, "click", function() {
                    m.$el.focus()
                }), m.events.$on(m.$tb, "transitionend", ".fr-more-toolbar", function() {
                    m.$box.hasClass("fr-fullscreen") && (m.opts.height = m.o_win.innerHeight - (m.opts.toolbarInline ? 0 : m.$tb.outerHeight() + (m.$second_tb ? m.$second_tb.outerHeight() : 0)), m.size.refresh())
                })
        }

        var f = !1;
        return {
            _init: function p() {
                if (m.$sc = b(m.opts.scrollableContainer).first(), !m.$wp) return !1;
                m.opts.toolbarInline || m.opts.toolbarBottom || (m.$second_tb = b(m.doc.createElement("div")).attr("class", "second-toolbar"), m.$box.append(m.$second_tb), (!1 !== m.ul || m.opts.attribution) && m.$second_tb.prepend($e.POWERED_BY)), m.opts.toolbarContainer ? (m.shared.$tb ? (m.$tb = m.shared.$tb, m.opts.toolbarInline && s()) : (m.shared.$tb = b(m.doc.createElement("DIV")), m.shared.$tb.addClass("fr-toolbar"), m.$tb = m.shared.$tb, b(m.opts.toolbarContainer).append(m.$tb), d(), m.$tb.data("instance", m)), m.opts.toolbarInline ? m.$box.addClass("fr-inline") : m.$box.addClass("fr-basic"), m.events.on("focus", function() {
                        m.$tb.data("instance", m)
                    }, !0), m.opts.toolbarInline = !1) : m.opts.toolbarInline ? (m.$box.addClass("fr-inline"), m.shared.$tb ? (m.$tb = m.shared.$tb, s()) : (m.shared.$tb = b(m.doc.createElement("DIV")), m.shared.$tb.addClass("fr-toolbar"), m.$tb = m.shared.$tb, d())) : (m.$box.addClass("fr-basic"), m.$tb = b(m.doc.createElement("DIV")), m.$tb.addClass("fr-toolbar"), d(), m.$tb.data("instance", m)), m.events.on("destroy", c, !0), m.events.on(m.opts.toolbarInline || m.opts.toolbarContainer ? "shared.destroy" : "destroy", l, !0), m.events.on("edit.on", function() {
                        m.$tb.removeClass("fr-disabled").removeAttr("aria-disabled")
                    }), m.events.on("edit.off", function() {
                        m.$tb.addClass("fr-disabled").attr("aria-disabled", !0)
                    }),
                    function e() {
                        m.events.on("shortcut", function(e, t, n) {
                            var a;
                            if (t && !n ? a = m.$tb.find('.fr-command[data-cmd="'.concat(t, '"]')) : t && n && (a = m.$tb.find('.fr-command[data-cmd="'.concat(t, '"][data-param1="').concat(n, '"]'))), a.length && (e.preventDefault(), e.stopPropagation(), a.parents(".fr-toolbar").data("instance", m), "keydown" === e.type)) return m.button.exec(a), !1
                        })
                    }()
            },
            hide: r,
            show: function u() {
                if (!1 === m.events.trigger("toolbar.show")) return !1;
                m.$tb.show()
            },
            showInline: n,
            disable: function h() {
                !f && m.$tb && (m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").addClass("fr-disabled fr-no-refresh").attr("aria-disabled", !0), f = !0)
            },
            enable: function g() {
                f && m.$tb && (m.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").removeClass("fr-disabled fr-no-refresh").attr("aria-disabled", !1), f = !1), m.button.bulkRefresh()
            },
            setMoreToolbarsHeight: T
        }
    };
    var c = ["scroll", "wheel", "touchmove", "touchstart", "touchend"],
        d = ["webkit", "moz", "ms", "o"],
        f = ["transitionend"],
        r = document.createElement("div").style,
        o = ["Webkit", "Moz", "ms", "O", "css", "style"],
        s = { visibility: "hidden", display: "block" },
        a = ["focus", "blur", "click"],
        i = {},
        l = function l(e, t) {
            return {
                altKey: e.altKey,
                bubbles: e.bubbles,
                cancelable: e.cancelable,
                changedTouches: e.changedTouches,
                ctrlKey: e.ctrlKey,
                detail: e.detail,
                eventPhase: e.eventPhase,
                metaKey: e.metaKey,
                pageX: e.pageX,
                pageY: e.pageY,
                shiftKey: e.shiftKey,
                view: e.view,
                "char": e["char"],
                key: e.key,
                keyCode: e.keyCode,
                button: e.button,
                buttons: e.buttons,
                clientX: e.clientX,
                clientY: e.clientY,
                offsetX: e.offsetX,
                offsetY: e.offsetY,
                pointerId: e.pointerId,
                pointerType: e.pointerType,
                screenX: e.screenX,
                screenY: e.screenY,
                targetTouches: e.targetTouches,
                toElement: e.toElement,
                touches: e.touches,
                type: e.type,
                which: e.which,
                target: e.target,
                currentTarget: t,
                originalEvent: e,
                stopPropagation: function() {
                    e.stopPropagation()
                },
                stopImmediatePropagation: function() {
                    e.stopImmediatePropagation()
                },
                preventDefault: function() {
                    -1 === c.indexOf(e.type) && e.preventDefault()
                }
            }
        },
        p = function p(e) {
            return e.ownerDocument && e.ownerDocument.body.contains(e) || "#document" === e.nodeName || "HTML" === e.nodeName || e === window
        },
        u = function u(n, a) {
            return function(e) {
                var t = e.target;
                if (a)
                    for (a = g(a); t && t !== this;) t.matches && t.matches(g(a)) && n.call(t, l(e, t)), t = t.parentNode;
                else p(t) && n.call(t, l(e, t))
            }
        },
        h = function h(e, t) {
            return new b(e, t)
        },
        g = function g(e) {
            return e && "string" == typeof e ? e.replace(/^\s*>/g, ":scope >").replace(/,\s*>/g, ", :scope >") : e
        },
        m = function m(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        },
        v = h;
    h.fn = h.prototype = {
        constructor: h,
        length: 0,
        contains: function(e) {
            if (!e) return !1;
            if (Array.isArray(e)) {
                for (var t = 0; t < e.length; t++)
                    if (this.contains(e[t]) && this != e[t]) return !0;
                return !1
            }
            for (var n = 0; n < this.length; n++)
                for (var a = e; a;) {
                    if (a == this[n] || a[0] && a[0].isEqualNode(this[n])) return !0;
                    a = a.parentNode
                }
            return !1
        },
        findVisible: function(e) {
            for (var t = this.find(e), n = t.length - 1; 0 <= n; n--) v(t[n]).isVisible() || t.splice(n, 1);
            return t
        },
        formatParams: function(t) {
            var e = "".concat(Object.keys(t).map(function(e) {
                return "".concat(e, "=").concat(encodeURIComponent(t[e]))
            }).join("&"));
            return e || ""
        },
        ajax: function(t) {
            var n = new XMLHttpRequest,
                e = this.formatParams(t.data);
            for (var a in "GET" === t.method.toUpperCase() && (t.url = e ? t.url + "?" + e : t.url), n.open(t.method, t.url, !0), t.withCredentials && (n.withCredentials = !0), t.crossDomain && n.setRequestHeader("Access-Control-Allow-Origin", "*"), t.headers) Object.prototype.hasOwnProperty.call(t.headers, a) && n.setRequestHeader(a, t.headers[a]);
            Object.prototype.hasOwnProperty.call(t.headers, "Content-Type") || ("json" === t.dataType ? n.setRequestHeader("Content-Type", "application/json") : n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")), n.onload = function() {
                if (200 == n.status) {
                    var e = n.responseText;
                    "json" === t.dataType && (e = JSON.parse(e)), t.done(e, n.status, n)
                } else t.fail(n)
            }, n.send(e)
        },
        prevAll: function() {
            var e = v();
            if (!this[0]) return e;
            for (var t = this[0]; t && t.previousSibling;) t = t.previousSibling, e.push(t);
            return e
        },
        index: function(e) {
            return e ? "string" == typeof e ? [].indexOf.call(v(e), this[0]) : [].indexOf.call(this, e.length ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        isVisible: function() {
            return !!this[0] && !!(this[0].offsetWidth || this[0].offsetHeight || this[0].getClientRects().length)
        },
        toArray: function() {
            return [].slice.call(this)
        },
        get: function(e) {
            return null == e ? [].slice.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = h.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        wrapAll: function(e) {
            var t;
            return this[0] && (m(e) && (e = e.call(this[0])), t = h(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;) e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(e) {
            if ("string" == typeof e) {
                for (var t = e.split(" "), n = 0; n < t.length && 0 === t[n].trim().length;) n++;
                if (n < t.length && (v(e).length && t[n].trim() === v(e)[0].tagName && (e = document.createElement(t[n].trim())), n++), "string" != typeof e)
                    for (var a = v(e); n < t.length; n++) {
                        t[n] = t[n].trim();
                        var r = t[n].split("=");
                        a.attr(r[0], r[1].replace('"', ""))
                    }
            }
            for (; !this[0].firstChild && this[0].firstChild !== e;) e.appendChild(this[0].firstChild)
        },
        wrap: function(t) {
            var n = m(t);
            return this.each(function(e) {
                v(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                this.nodeName && this.nodeName.toLowerCase() === name.toLowerCase() || h(this).replaceWith(this.childNodes)
            })
        },
        grep: function(e, t, n) {
            for (var a = [], r = 0, o = e.length, i = !n; r < o; r++) !t(e[r], r) !== i && a.push(e[r]);
            return a
        },
        map: function(n) {
            return this.pushStack(h.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack([].slice.apply(this, arguments))
        },
        each: function(e) {
            if (this.length)
                for (var t = 0; t < this.length && !1 !== e.call(this[t], t, this[t]); t++);
            return this
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        empty: function() {
            for (var e = 0; e < this.length; e++) this[e].innerHTML = ""
        },
        contents: function() {
            for (var e = v(), t = 0; t < this.length; t++)
                for (var n = this[t].childNodes, a = 0; a < n.length; a++) e.push(n[a]);
            return e
        },
        attr: function(e, t) {
            if ("object" === Fe(e)) {
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && null !== e[n] && this.attr(n, e[n]);
                return this
            }
            if (void 0 === t) return 0 === this.length || !this[0].getAttribute && "checked" !== e ? undefined : "checked" === e ? this[0].checked : "tagName" === e ? this[0].tagName : this[0].getAttribute(e);
            if ("checked" === e)
                for (var a = 0; a < this.length; a++) this[a].checked = t;
            else if ("tagName" === e)
                for (var r = 0; r < this.length; r++) this[r].tagName = t;
            else
                for (var o = 0; o < this.length; o++) this[o].setAttribute(e, t);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t++) this[t].removeAttribute && this[t].removeAttribute(e);
            return this
        },
        hide: function() {
            return this.css("display", "none"), this
        },
        show: function() {
            return this.css("display", "block"), this
        },
        focus: function() {
            return this.length && this[0].focus(), this
        },
        blur: function() {
            return this.length && this[0].blur(), this
        },
        data: function(e, t) {
            if (void 0 !== t) {
                for (var n = 0; n < this.length; n++) "object" !== Fe(this[n]["data-" + e] = t) && "function" != typeof t && this[n].setAttribute && this[n].setAttribute("data-" + e, t);
                return this
            }
            if (void 0 !== t) return this.attr("data-" + e, t);
            if (0 === this.length) return undefined;
            for (var a = 0; a < this.length; a++) {
                var r = this[a]["data-" + e];
                if (null == r && this[a].getAttribute && (r = this[a].getAttribute("data-" + e)), void 0 !== r && null != r) return r
            }
            return undefined
        },
        removeData: function(e) {
            for (var t = 0; t < this.length; t++) this[t].removeAttribute && this[t].removeAttribute("data-" + e), this[t]["data-" + e] = null;
            return this
        },
        getCorrectStyleName: function(e) {
            if (!i[e]) {
                var t;
                e in r && (t = e);
                for (var n = e[0].toUpperCase() + e.slice(1), a = o.length; a--;)(e = o[a] + n) in r && (t = e);
                i[e] = t
            }
            return i[e]
        },
        css: function(e, t) {
            if (void 0 !== t) {
                if (0 === this.length) return this;
                ("string" != typeof t || "" === t.trim() || isNaN(t)) && "number" != typeof t || !/(margin)|(padding)|(height)|(width)|(top)|(left)|(right)|(bottom)/gi.test(e) || /(line-height)/gi.test(e) || (t += "px");
                for (var n = 0; n < this.length; n++) e = v(this).getCorrectStyleName(e), this[n].style[e] = t;
                return this
            }
            if ("string" == typeof e) {
                if (0 === this.length) return undefined;
                var a = this[0].ownerDocument || document,
                    r = a.defaultView || a.parentWindow;
                return e = v(this).getCorrectStyleName(e), r.getComputedStyle(this[0])[e]
            }
            for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && this.css(o, e[o]);
            return this
        },
        toggleClass: function(e, t) {
            if (1 < e.split(" ").length) {
                for (var n = e.split(" "), a = 0; a < n.length; a++) this.toggleClass(n[a], t);
                return this
            }
            for (var r = 0; r < this.length; r++) void 0 === t ? this[r].classList.contains(e) ? this[r].classList.remove(e) : this[r].classList.add(e) : t ? this[r].classList.contains(e) || this[r].classList.add(e) : this[r].classList.contains(e) && this[r].classList.remove(e);
            return this
        },
        addClass: function(e) {
            if (0 === e.length) return this;
            if (1 < e.split(" ").length) {
                for (var t = e.split(" "), n = 0; n < t.length; n++) this.addClass(t[n]);
                return this
            }
            for (var a = 0; a < this.length; a++) this[a].classList.add(e);
            return this
        },
        removeClass: function(e) {
            if (1 < e.split(" ").length) {
                for (var t = e.split(" "), n = 0; n < t.length; n++) t[n] = t[n].trim(), t[n].length && this.removeClass(t[n]);
                return this
            }
            for (var a = 0; a < this.length; a++) e.length && this[a].classList.remove(e);
            return this
        },
        getClass: function(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        },
        stripAndCollapse: function(e) {
            return (e.match(/[^\x20\t\r\n\f]+/g) || []).join(" ")
        },
        hasClass: function(e) {
            var t, n, a = 0;
            for (t = " " + e + " "; n = this[a++];)
                if (1 === n.nodeType && -1 < (" " + v(this).stripAndCollapse(v(this).getClass(n)) + " ").indexOf(t)) return !0;
            return !1
        },
        scrollTop: function(e) {
            if (void 0 === e) return 0 === this.length ? undefined : this[0] === document ? document.documentElement.scrollTop : this[0].scrollTop;
            for (var t = 0; t < this.length; t++) this[t] === document ? window.scrollTo(document.documentElement.scrollLeft, e) : this[t].scrollTop = e
        },
        scrollLeft: function(e) {
            if (void 0 === e) return 0 === this.length ? undefined : this[0] === document ? document.documentElement.scrollLeft : this[0].scrollLeft;
            for (var t = 0; t < this.length; t++) this[t] === document ? window.scrollTo(e, document.documentElement.scrollTop) : this[t].scrollLeft = e
        },
        on: function(e, t, n) {
            if (1 < e.split(" ").length) {
                for (var a = e.split(" "), r = 0; r < a.length; r++)
                    if (-1 !== f.indexOf(e))
                        for (var o = 0; o < d.length; o++) this.on(d[o] + e[0].toUpperCase() + e.slice(1), t, n);
                    else this.on(a[r], t, n);
                return this
            }
            n = "function" == typeof t ? u(t, null) : u(n, t);
            for (var i = 0; i < this.length; i++) {
                var s = v(this[i]);
                s.data("events") || s.data("events", []), s.data("events").push([e, n]);
                var l = e.split(".");
                l = l[0], 0 <= c.indexOf(l) ? s.get(0).addEventListener(l, n, { passive: !0 }) : s.get(0).addEventListener(l, n)
            }
        },
        off: function(e) {
            if (1 < e.split(" ").length) {
                for (var t = e.split(" "), n = 0; n < t.length; n++) this.off(t[n]);
                return this
            }
            for (var a = 0; a < this.length; a++) {
                var r = v(this[a]);
                if (r.data("events")) {
                    var o = e.split(".");
                    o = o[0];
                    for (var i = r.data("events") || [], s = i.length - 1; 0 <= s; s--) {
                        var l = i[s];
                        l[0] == e && (r.get(0).removeEventListener(o, l[1]), i.splice(s, 1))
                    }
                }
            }
        },
        trigger: function(e) {
            for (var t = 0; t < this.length; t++) {
                var n = void 0;
                "function" == typeof Event ? n = 0 <= e.search(/^mouse/g) ? new MouseEvent(e, {
                    view: window,
                    cancelable: !0,
                    bubbles: !0
                }) : new Event(e) : 0 <= e.search(/^mouse/g) ? (n = document.createEvent("MouseEvents")).initMouseEvent(e, !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null) : (n = document.createEvent("Event")).initEvent(e, !0, !0), 0 <= a.indexOf(e) && "function" == typeof this[t][e] ? this[t][e]() : this[t].dispatchEvent(n)
            }
        },
        triggerHandler: function() {},
        val: function(e) {
            if (void 0 === e) return this[0].value;
            for (var t = 0; t < this.length; t++) this[t].value = e;
            return this
        },
        siblings: function() {
            return v(this[0]).parent().children().not(this)
        },
        find: function(e) {
            var t = v();
            if ("string" != typeof e) {
                for (var n = 0; n < e.length; n++)
                    for (var a = 0; a < this.length; a++)
                        if (this[a] !== e[n] && v(this[a]).contains(e[n])) {
                            t.push(e[n]);
                            break
                        }
                return t
            }
            var r = function r(e) {
                return "object" === ("undefined" == typeof HTMLElement ? "undefined" : Fe(HTMLElement)) ? e instanceof HTMLElement : e && "object" === Fe(e) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName
            };
            e = g(e);
            for (var o = 0; o < this.length; o++)
                if (this[o].querySelectorAll) {
                    var i = [];
                    e && "string" == typeof e ? i = this[o].querySelectorAll(e) : r(e) && (i = [e]);
                    for (var s = 0; s < i.length; s++) t.push(i[s])
                }
            return t
        },
        children: function() {
            for (var e = v(), t = 0; t < this.length; t++)
                for (var n = this[t].children, a = 0; a < n.length; a++) e.push(n[a]);
            return e
        },
        not: function(e) {
            if ("string" == typeof e)
                for (var t = this.length - 1; 0 <= t; t--) this[t].matches(e) && this.splice(t, 1);
            else if (e instanceof h) {
                for (var n = this.length - 1; 0 <= n; n--)
                    for (var a = 0; a < e.length; a++)
                        if (this[n] === e[a]) {
                            this.splice(n, 1);
                            break
                        }
            } else
                for (var r = this.length - 1; 0 <= r; r--) this[r] === e[0] && this.splice(r, 1);
            return this
        },
        add: function(e) {
            for (var t = 0; t < e.length; t++) this.push(e[t]);
            return this
        },
        closest: function(e) {
            for (var t = 0; t < this.length; t++) {
                var n = this[t].closest && this[t].closest(e);
                if (n) return v(n)
            }
            return v()
        },
        html: function(e) {
            if (void 0 === e) return 0 === this.length ? undefined : this[0].innerHTML;
            if ("string" == typeof e)
                for (var t = 0; t < this.length; t++) {
                    this[t].innerHTML = e;
                    for (var n = this[t].children, a = this[t].ownerDocument || document, r = 0; r < n.length; r++)
                        if ("SCRIPT" === n[r].tagName) {
                            var o = a.createElement("script");
                            o.innerHTML = n[r].innerHTML, a.head.appendChild(o).parentNode.removeChild(o)
                        }
                } else {
                    this[0].innerHTML = "", this.append(e[0]);
                    var i = this[0].ownerDocument || document;
                    if ("SCRIPT" === e[0].tagName) {
                        var s = i.createElement("script");
                        s.innerHTML = e[0].innerHTML, i.head.appendChild(s).parentNode.removeChild(s)
                    }
                }
            return this
        },
        text: function(e) {
            if (!e) return this.length ? this[0].textContent : "";
            for (var t = 0; t < this.length; t++) this[t].textContent = e
        },
        after: function e(t) {
            if (t)
                if ("string" == typeof t)
                    for (var n = 0; n < this.length; n++) {
                        var e = this[n];
                        if (e.nodeType != Node.ELEMENT_NODE) {
                            var a = e.ownerDocument.createElement("SPAN");
                            v(e).after(a), v(a).after(t).remove()
                        } else e.insertAdjacentHTML("afterend", t)
                    } else {
                        var r = this[0];
                        if (r.nextSibling)
                            if (t instanceof h)
                                for (var o = 0; o < t.length; o++) r.nextSibling.parentNode.insertBefore(t[o], r.nextSibling);
                            else r.nextSibling.parentNode.insertBefore(t, r.nextSibling);
                        else v(r.parentNode).append(t)
                    }
            return this
        },
        clone: function(e) {
            for (var t = v(), n = 0; n < this.length; n++) t.push(this[n].cloneNode(e));
            return t
        },
        replaceWith: function(e) {
            if ("string" == typeof e)
                for (var t = 0; t < this.length; t++) this[t].parentNode && (this[t].outerHTML = e);
            else if (e.length)
                for (var n = 0; n < this.length; n++) this.replaceWith(e[n]);
            else this.after(e).remove()
        },
        insertBefore: function(e) {
            return v(e).before(this[0]), this
        },
        before: function e(t) {
            if (t instanceof h) {
                for (var n = 0; n < t.length; n++) this.before(t[n]);
                return this
            }
            if (t)
                if ("string" == typeof t)
                    for (var a = 0; a < this.length; a++) {
                        var e = this[a];
                        if (e.nodeType != Node.ELEMENT_NODE) {
                            var r = e.ownerDocument.createElement("SPAN");
                            v(e).before(r), v(r).before(t).remove()
                        } else e.parentNode && e.insertAdjacentHTML("beforebegin", t)
                    } else {
                        var o = this[0];
                        if (o.parentNode)
                            if (t instanceof h)
                                for (var i = 0; i < t.length; i++) o.parentNode.insertBefore(t[i], o);
                            else o.parentNode.insertBefore(t, o)
                    }
            return this
        },
        append: function(e) {
            if (0 == this.length) return this;
            if ("string" == typeof e)
                for (var t = 0; t < this.length; t++) {
                    var n = this[t],
                        a = n.ownerDocument.createElement("SPAN");
                    v(n).append(a), v(a).after(e).remove()
                } else if (e instanceof h || Array.isArray(e))
                    for (var r = 0; r < e.length; r++) this.append(e[r]);
                else "function" != typeof e && this[0].appendChild(e);
            return this
        },
        prepend: function(e) {
            if (0 == this.length) return this;
            if ("string" == typeof e)
                for (var t = 0; t < this.length; t++) {
                    var n = this[t],
                        a = n.ownerDocument.createElement("SPAN");
                    v(n).prepend(a), v(a).before(e).remove()
                } else if (e instanceof h)
                    for (var r = 0; r < e.length; r++) this.prepend(e[r]);
                else {
                    var o = this[0];
                    o.firstChild ? o.firstChild ? o.insertBefore(e, o.firstChild) : o.appendChild(e) : v(o).append(e)
                }
            return this
        },
        remove: function() {
            for (var e = 0; e < this.length; e++) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        },
        prev: function() {
            return this.length && this[0].previousElementSibling ? v(this[0].previousElementSibling) : v()
        },
        next: function() {
            return this.length && this[0].nextElementSibling ? v(this[0].nextElementSibling) : v()
        },
        nextAllVisible: function() {
            return this.next()
        },
        prevAllVisible: function() {
            return this.prev()
        },
        outerHeight: function(e) {
            if (0 === this.length) return undefined;
            var t = this[0];
            if (t === t.window) return t.innerHeight;
            var n = {},
                a = this.isVisible();
            if (!a)
                for (var r in s) n[r] = t.style[r], t.style[r] = s[r];
            var o = t.offsetHeight;
            if (e && (o += parseInt(v(t).css("marginTop")) + parseInt(v(t).css("marginBottom"))), !a)
                for (var i in s) t.style[i] = n[i];
            return o
        },
        outerWidth: function(e) {
            if (0 === this.length) return undefined;
            var t = this[0];
            if (t === t.window) return t.outerWidth;
            var n = {},
                a = this.isVisible();
            if (!a)
                for (var r in s) n[r] = t.style[r], t.style[r] = s[r];
            var o = t.offsetWidth;
            if (e && (o += parseInt(v(t).css("marginLeft")) + parseInt(v(t).css("marginRight"))), !a)
                for (var i in s) t.style[i] = n[i];
            return o
        },
        width: function(e) {
            if (e === undefined) return this[0] instanceof HTMLDocument ? this[0].body.offsetWidth : this[0].offsetWidth;
            this[0].style.width = e + "px"
        },
        height: function(e) {
            var t = this[0];
            if (e === undefined) {
                if (t instanceof HTMLDocument) {
                    var n = t.documentElement;
                    return Math.max(t.body.scrollHeight, n.scrollHeight, t.body.offsetHeight, n.offsetHeight, n.clientHeight)
                }
                return t.offsetHeight
            }
            t.style.height = e + "px"
        },
        is: function(e) {
            return 0 !== this.length && ("string" == typeof e && this[0].matches ? this[0].matches(e) : e instanceof h ? this[0] == e[0] : this[0] == e)
        },
        parent: function() {
            return 0 === this.length ? v() : v(this[0].parentNode)
        },
        parents: function(e) {
            for (var t = v(), n = 0; n < this.length; n++)
                for (var a = this[n].parentNode; a && a != document && a.matches;) e ? a.matches(e) && t.push(a) : t.push(a), a = a.parentNode;
            return t
        },
        parentsUntil: function(e, t) {
            var n = v();
            e instanceof h && 0 < e.length && (e = e[0]);
            for (var a = 0; a < this.length; a++)
                for (var r = this[a].parentNode; r && r != document && r.matches && r != e && this[a] != e && ("string" != typeof e || !r.matches(e));) t ? r.matches(t) && n.push(r) : n.push(r), r = r.parentNode;
            return n
        },
        insertAfter: function(e) {
            var t = e.parent()[0];
            t && t.insertBefore(this[0], e[0].nextElementSibling)
        },
        filter: function(e) {
            var t = v();
            if ("function" == typeof e)
                for (var n = 0; n < this.length; n++) e.call(this[n], this[n]) && t.push(this[n]);
            else if ("string" == typeof e)
                for (var a = 0; a < this.length; a++) this[a].matches(e) && t.push(this[a]);
            return t
        },
        offset: function() {
            var e = this[0].getBoundingClientRect(),
                t = this[0].ownerDocument.defaultView;
            return { top: e.top + t.pageYOffset, left: e.left + t.pageXOffset }
        },
        position: function() {
            return { left: this[0].offsetLeft, top: this[0].offsetTop }
        },
        push: [].push,
        splice: [].splice
    }, h.extend = function(e) {
        e = e || {};
        for (var t = 1; t < arguments.length; t++)
            if (arguments[t])
                for (var n in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], n) && (e[n] = arguments[t][n]);
        return e
    }, h.merge = function(e, t) {
        for (var n = +t.length, a = 0, r = e.length; a < n; a++) e[r++] = t[a];
        return e.length = r, e
    }, h.map = function(e, t, n) {
        var a, r, o = 0,
            i = [];
        if (Array.isArray(e))
            for (a = e.length; o < a; o++) null != (r = t(e[o], o, n)) && i.push(r);
        else
            for (o in e) null != (r = t(e[o], o, n)) && i.push(r);
        return [].concat.apply([], i)
    };
    var b = function b(e, t) {
        if (!e) return this;
        if ("string" == typeof e && "<" === e[0]) {
            var n = document.createElement("DIV");
            return n.innerHTML = e, v(n.firstElementChild)
        }
        if (t = t instanceof h ? t[0] : t, "string" != typeof e) return e instanceof h ? e : (this[0] = e, this.length = 1, this);
        e = g(e);
        for (var a = (t || document).querySelectorAll(e), r = 0; r < a.length; r++) this[r] = a[r];
        return this.length = a.length, this
    };
    b.prototype = h.prototype;
    var E = $e;

    function T() {
        this.doc = this.$el.get(0).ownerDocument, this.win = "defaultView" in this.doc ? this.doc.defaultView : this.doc.parentWindow, this.$doc = h(this.doc), this.$win = h(this.win), this.opts.pluginsEnabled || (this.opts.pluginsEnabled = Object.keys(E.PLUGINS)), this.opts.initOnClick ? (this.load(E.MODULES), this.$el.on("touchstart.init", function() {
            h(this).data("touched", !0)
        }), this.$el.on("touchmove.init", function() {
            h(this).removeData("touched")
        }), this.$el.on("mousedown.init touchend.init dragenter.init focus.init", function a(e) {
            if ("touchend" === e.type && !this.$el.data("touched")) return !0;
            if (1 === e.which || !e.which) {
                this.$el.off("mousedown.init touchstart.init touchmove.init touchend.init dragenter.init focus.init"), this.load(E.MODULES), this.load(E.PLUGINS);
                var t = e.originalEvent && e.originalEvent.originalTarget;
                if (t && "IMG" === t.tagName && h(t).trigger("mousedown"), "undefined" == typeof this.ul && this.destroy(), "touchend" === e.type && this.image && e.originalEvent && e.originalEvent.target && h(e.originalEvent.target).is("img")) {
                    var n = this;
                    setTimeout(function() {
                        n.image.edit(h(e.originalEvent.target))
                    }, 100)
                }
                this.ready = !0, this.events.trigger("initialized")
            }
        }.bind(this)), this.events.trigger("initializationDelayed")) : (this.load(E.MODULES), this.load(E.PLUGINS), h(this.o_win).scrollTop(this.c_scroll), "undefined" == typeof this.ul && this.destroy(), this.ready = !0, this.events.trigger("initialized"))
    }

    if (E.Bootstrap = function(e, t, n) {
            this.id = ++E.ID, this.$ = h;
            var a = {};
            "function" == typeof t && (n = t, t = {}), n && (t.events || (t.events = {}), t.events.initialized = n), t && t.documentReady && (a.toolbarButtons = [
                ["fullscreen", "undo", "redo", "getPDF", "print"],
                ["bold", "italic", "underline", "textColor", "backgroundColor", "clearFormatting"],
                ["alignLeft", "alignCenter", "alignRight", "alignJustify"],
                ["formatOL", "formatUL", "indent", "outdent"],
                ["paragraphFormat"],
                ["fontFamily"],
                ["fontSize"],
                ["insertLink", "insertImage", "quote"]
            ], a.paragraphFormatSelection = !0, a.fontFamilySelection = !0, a.fontSizeSelection = !0, a.placeholderText = "", a.quickInsertEnabled = !1, a.charCounterCount = !1), this.opts = Object.assign({}, Object.assign({}, E.DEFAULTS, a, "object" === Fe(t) && t));
            var r = JSON.stringify(this.opts);
            E.OPTS_MAPPING[r] = E.OPTS_MAPPING[r] || this.id, this.sid = E.OPTS_MAPPING[r], E.SHARED[this.sid] = E.SHARED[this.sid] || {}, this.shared = E.SHARED[this.sid], this.shared.count = (this.shared.count || 0) + 1, this.$oel = h(e), this.$oel.data("froala.editor", this), this.o_doc = e.ownerDocument, this.o_win = "defaultView" in this.o_doc ? this.o_doc.defaultView : this.o_doc.parentWindow, this.c_scroll = h(this.o_win).scrollTop(), this._init()
        }, E.Bootstrap.prototype._init = function() {
            var e = this.$oel.get(0).tagName;
            this.$oel.closest("label").length;
            var t = function() {
                    "TEXTAREA" !== e && (this._original_html = this._original_html || this.$oel.html()), this.$box = this.$box || this.$oel, this.opts.fullPage && (this.opts.iframe = !0), this.opts.iframe ? (this.$iframe = h('<iframe src="about:blank" frameBorder="0">'), this.$wp = h("<div></div>"), this.$box.html(this.$wp), this.$wp.append(this.$iframe), this.$iframe.get(0).contentWindow.document.open(), this.$iframe.get(0).contentWindow.document.write("<!DOCTYPE html>"), this.$iframe.get(0).contentWindow.document.write("<html><head></head><body></body></html>"), this.$iframe.get(0).contentWindow.document.close(), this.iframe_document = this.$iframe.get(0).contentWindow.document, this.$el = h(this.iframe_document.querySelector("body")), this.el = this.$el.get(0), this.$head = h(this.iframe_document.querySelector("head")), this.$html = h(this.iframe_document.querySelector("html"))) : (this.$el = h(this.o_doc.createElement("DIV")), this.el = this.$el.get(0), this.$wp = h(this.o_doc.createElement("DIV")).append(this.$el), this.$box.html(this.$wp)), setTimeout(T.bind(this), 0)
                }.bind(this),
                n = function() {
                    this.$box = h("<div>"), this.$oel.before(this.$box).hide(), this._original_html = this.$oel.val();
                    var e = this;
                    this.$oel.parents("form").on("submit.".concat(this.id), function() {
                        e.events.trigger("form.submit")
                    }), this.$oel.parents("form").on("reset.".concat(this.id), function() {
                        e.events.trigger("form.reset")
                    }), t()
                }.bind(this),
                a = function() {
                    this.$el = this.$oel, this.el = this.$el.get(0), this.$el.attr("contenteditable", !0).css("outline", "none").css("display", "inline-block"), this.opts.multiLine = !1, this.opts.toolbarInline = !1, setTimeout(T.bind(this), 0)
                }.bind(this),
                r = function() {
                    this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, setTimeout(T.bind(this), 0)
                }.bind(this),
                o = function() {
                    this.$el = this.$oel, this.el = this.$el.get(0), this.opts.toolbarInline = !1, this.$oel.on("click.popup", function(e) {
                        e.preventDefault()
                    }), setTimeout(T.bind(this), 0)
                }.bind(this);
            this.opts.editInPopup ? o() : "TEXTAREA" === e ? n() : "A" === e ? a() : "IMG" === e ? r() : "BUTTON" === e || "INPUT" === e ? (this.opts.editInPopup = !0, this.opts.toolbarInline = !1, o()) : t()
        }, E.Bootstrap.prototype.load = function(e) {
            for (var t in e)
                if (Object.prototype.hasOwnProperty.call(e, t)) {
                    if (this[t]) continue;
                    if (E.PLUGINS[t] && this.opts.pluginsEnabled.indexOf(t) < 0) continue;
                    if (this[t] = new e[t](this), this[t]._init && (this[t]._init(), this.opts.initOnClick && "core" === t)) return !1
                }
        }, E.Bootstrap.prototype.destroy = function() {
            this.destrying = !0, this.shared.count--, this.events && this.events.$off();
            var e = this.html && this.html.get();
            if (this.opts.iframe && (this.events.disableBlur(), this.win.focus(), this.events.enableBlur()), this.events && (this.events.trigger("destroy", [], !0), this.events.trigger("shared.destroy", [], !0)), 0 === this.shared.count) {
                for (var t in this.shared) Object.prototype.hasOwnProperty.call(this.shared, t) && (this.shared[t] = null, E.SHARED[this.sid][t] = null);
                delete E.SHARED[this.sid]
            }
            this.$oel.parents("form").off(".".concat(this.id)), this.$oel.off("click.popup"), this.$oel.removeData("froala.editor"), this.$oel.off("froalaEditor"), this.core && this.core.destroy(e), E.INSTANCES.splice(E.INSTANCES.indexOf(this), 1)
        }, $e.PLUGINS.align = function(r) {
            var o = r.$;
            return {
                apply: function i(e) {
                    var t = r.selection.element();
                    if (o(t).parents(".fr-img-caption").length) o(t).css("text-align", e);
                    else {
                        r.selection.save(), r.html.wrap(!0, !0, !0, !0), r.selection.restore();
                        for (var n = r.selection.blocks(), a = 0; a < n.length; a++) o(n[a]).css("text-align", e).removeClass("fr-temp-div"), "" === o(n[a]).attr("class") && o(n[a]).removeAttr("class"), "" === o(n[a]).attr("style") && o(n[a]).removeAttr("style");
                        r.selection.save(), r.html.unwrap(), r.selection.restore()
                    }
                },
                refresh: function a(e) {
                    var t = r.selection.blocks();
                    if (t.length) {
                        var n = r.helpers.getAlignment(o(t[0]));
                        e.find("> *").first().replaceWith(r.icon.create("align-".concat(n)))
                    }
                },
                refreshOnShow: function s(e, t) {
                    var n = r.selection.blocks();
                    if (n.length) {
                        var a = r.helpers.getAlignment(o(n[0]));
                        t.find('a.fr-command[data-param1="'.concat(a, '"]')).addClass("fr-active").attr("aria-selected", !0)
                    }
                },
                refreshForToolbar: function l(e) {
                    var t = r.selection.blocks();
                    if (t.length) {
                        var n = r.helpers.getAlignment(o(t[0]));
                        n = n.charAt(0).toUpperCase() + n.slice(1), "align".concat(n) === e.attr("data-cmd") && e.addClass("fr-active")
                    }
                }
            }
        }, $e.DefineIcon("align", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), $e.DefineIcon("align-left", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), $e.DefineIcon("align-right", {
            NAME: "align-right",
            SVG_KEY: "alignRight"
        }), $e.DefineIcon("align-center", {
            NAME: "align-center",
            SVG_KEY: "alignCenter"
        }), $e.DefineIcon("align-justify", {
            NAME: "align-justify",
            SVG_KEY: "alignJustify"
        }), $e.RegisterCommand("align", {
            type: "dropdown",
            title: "Align",
            options: { left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify" },
            html: function() {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = $e.COMMANDS.align.options;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="align"data-param1="\n        '.concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.icon.create("align-".concat(n)), '<span class="fr-sr-only">\n        ').concat(this.language.translate(t[n]), "</span></a></li>"));
                return e += "</ul>"
            },
            callback: function(e, t) {
                this.align.apply(t)
            },
            refresh: function(e) {
                this.align.refresh(e)
            },
            refreshOnShow: function(e, t) {
                this.align.refreshOnShow(e, t)
            },
            plugin: "align"
        }), $e.RegisterCommand("alignLeft", {
            type: "button",
            icon: "align-left",
            title: "Align Left",
            callback: function() {
                this.align.apply("left")
            },
            refresh: function(e) {
                this.align.refreshForToolbar(e)
            },
            plugin: "align"
        }), $e.RegisterCommand("alignRight", {
            type: "button",
            icon: "align-right",
            title: "Align Right",
            callback: function() {
                this.align.apply("right")
            },
            refresh: function(e) {
                this.align.refreshForToolbar(e)
            },
            plugin: "align"
        }), $e.RegisterCommand("alignCenter", {
            type: "button",
            icon: "align-center",
            title: "Align Center",
            callback: function() {
                this.align.apply("center")
            },
            refresh: function(e) {
                this.align.refreshForToolbar(e)
            },
            plugin: "align"
        }), $e.RegisterCommand("alignJustify", {
            type: "button",
            icon: "align-justify",
            title: "Align Justify",
            callback: function() {
                this.align.apply("justify")
            },
            refresh: function(e) {
                this.align.refreshForToolbar(e)
            },
            plugin: "align"
        }), Object.assign($e.DEFAULTS, { charCounterMax: -1, charCounterCount: !0 }), $e.PLUGINS.charCounter = function(n) {
            var a, t = n.$,
                r = function r() {
                    return (n.el.textContent || "").replace(/\u200B/g, "").length
                };

            function e(e) {
                if (n.opts.charCounterMax < 0) return !0;
                if (r() < n.opts.charCounterMax) return !0;
                var t = e.which;
                return !(!n.keys.ctrlKey(e) && n.keys.isCharacter(t) || t === $e.KEYCODE.IME) || (e.preventDefault(), e.stopPropagation(), n.events.trigger("charCounter.exceeded"), !1)
            }

            function o(e) {
                return n.opts.charCounterMax < 0 ? e : t("<div>").html(e).text().length + r() <= n.opts.charCounterMax ? e : (n.events.trigger("charCounter.exceeded"), "")
            }

            function i() {
                if (n.opts.charCounterCount) {
                    var e = r() + (0 < n.opts.charCounterMax ? "/" + n.opts.charCounterMax : "");
                    a.text("".concat(n.language.translate("ھەرىپ سانى"), " : ").concat(e)), n.opts.toolbarBottom && a.css("margin-bottom", n.$tb.outerHeight(!0));
                    var t = n.$wp.get(0).offsetWidth - n.$wp.get(0).clientWidth;
                    0 <= t && ("rtl" == n.opts.direction ? a.css("margin-left", t) : a.css("margin-right", t))
                }
            }

            return {
                _init: function s() {
                    return !!n.$wp && !!n.opts.charCounterCount && ((a = t(document.createElement("span")).attr("class", "fr-counter")).css("bottom", n.$wp.css("border-bottom-width")), n.$second_tb && n.$second_tb.append(a), n.events.on("keydown", e, !0), n.events.on("paste.afterCleanup", o), n.events.on("keyup contentChanged input", function() {
                        n.events.trigger("charCounter.update")
                    }), n.events.on("charCounter.update", i), n.events.trigger("charCounter.update"), void n.events.on("destroy", function() {
                        t(n.o_win).off("resize.char".concat(n.id)), a.removeData().remove(), a = null
                    }))
                },
                count: r
            }
        }, $e.PLUGINS.codeBeautifier = function() {
            var e, t, n, a, j = {};

            function O(a, e) {
                var t = { "@page": !0, "@font-face": !0, "@keyframes": !0, "@media": !0, "@supports": !0, "@document": !0 },
                    n = { "@media": !0, "@supports": !0, "@document": !0 };
                e = e || {}, a = (a = a || "").replace(/\r\n|[\r\u2028\u2029]/g, "\n");
                var r = e.indent_size || 4,
                    o = e.indent_char || " ",
                    i = e.selector_separator_newline === undefined || e.selector_separator_newline,
                    s = e.end_with_newline !== undefined && e.end_with_newline,
                    l = e.newline_between_rules === undefined || e.newline_between_rules,
                    c = e.eol ? e.eol : "\n";
                "string" == typeof r && (r = parseInt(r, 10)), e.indent_with_tabs && (o = "\t", r = 1), c = c.replace(/\\r/, "\r").replace(/\\n/, "\n");
                var d, f = /^\s+$/,
                    p = -1,
                    u = 0;

                function h() {
                    return (d = a.charAt(++p)) || ""
                }

                function g(e) {
                    var t, n = p;
                    return e && v(), t = a.charAt(p + 1) || "", p = n - 1, h(), t
                }

                function m(e) {
                    for (var t = p; h();)
                        if ("\\" === d) h();
                        else {
                            if (-1 !== e.indexOf(d)) break;
                            if ("\n" === d) break
                        }
                    return a.substring(t, p + 1)
                }

                function v() {
                    for (var e = ""; f.test(g());) h(), e += d;
                    return e
                }

                function b() {
                    var e = "";
                    for (d && f.test(d) && (e = d); f.test(h());) e += d;
                    return e
                }

                function E(e) {
                    var t = p;
                    for (e = "/" === g(), h(); h();) {
                        if (!e && "*" === d && "/" === g()) {
                            h();
                            break
                        }
                        if (e && "\n" === d) return a.substring(t, p)
                    }
                    return a.substring(t, p) + d
                }

                function T(e) {
                    return a.substring(p - e.length, p).toLowerCase() === e
                }

                function A() {
                    for (var e = 0, t = p + 1; t < a.length; t++) {
                        var n = a.charAt(t);
                        if ("{" === n) return !0;
                        if ("(" === n) e += 1;
                        else if (")" === n) {
                            if (0 === e) return !1;
                            e -= 1
                        } else if (" " === n || "}" === n) return !1
                    }
                    return !1
                }

                var C = a.match(/^[\t ]*/)[0],
                    S = new Array(r + 1).join(o),
                    y = 0,
                    R = 0;
                for (var L, w, _, O = {
                        "{": function(e) {
                            O.singleSpace(), N.push(e), O.newLine()
                        },
                        "}": function(e) {
                            O.newLine(), N.push(e), O.newLine()
                        },
                        _lastCharWhitespace: function() {
                            return f.test(N[N.length - 1])
                        },
                        newLine: function(e) {
                            N.length && (e || "\n" === N[N.length - 1] || O.trim(), N.push("\n"), C && N.push(C))
                        },
                        singleSpace: function() {
                            N.length && !O._lastCharWhitespace() && N.push(" ")
                        },
                        preserveSingleSpace: function() {
                            L && O.singleSpace()
                        },
                        trim: function() {
                            for (; O._lastCharWhitespace();) N.pop()
                        }
                    }, N = [], x = !1, I = !1, k = !1, M = "", D = "";;) {
                    var B = b();
                    L = "" !== B;
                    var F = -1 !== B.indexOf("\n");
                    if (D = M, !(M = d)) break;
                    if ("/" === d && "*" === g()) {
                        var $ = 0 === y;
                        (F || $) && O.newLine(), N.push(E()), O.newLine(), $ && O.newLine(!0)
                    } else if ("/" === d && "/" === g()) F || "{" === D || O.trim(), O.singleSpace(), N.push(E()), O.newLine();
                    else if ("@" === d) {
                        O.preserveSingleSpace(), N.push(d);
                        var P = (void 0, w = p, _ = m(": , {}()[]/='\""), p = w - 1, h(), _);
                        P.match(/[ :]$/) && (h(), P = m(": ").replace(/\s$/, ""), N.push(P), O.singleSpace()), (P = P.replace(/\s$/, "")) in t && (R += 1, P in n && (k = !0))
                    } else "#" === d && "{" === g() ? (O.preserveSingleSpace(), N.push(m("}"))) : "{" === d ? "}" === g(!0) ? (v(), h(), O.singleSpace(), N.push("{}"), O.newLine(), l && 0 === y && O.newLine(!0)) : (y++, C += S, O["{"](d), x = k ? (k = !1, R < y) : R <= y) : "}" === d ? (y--, C = C.slice(0, -r), O["}"](d), I = x = !1, R && R--, l && 0 === y && O.newLine(!0)) : ":" === d ? (v(), !x && !k || T("&") || A() ? ":" === g() ? (h(), N.push("::")) : N.push(":") : (I = !0, N.push(":"), O.singleSpace())) : '"' === d || "'" === d ? (O.preserveSingleSpace(), N.push(m(d))) : " " === d ? (I = !1, N.push(d), O.newLine()) : "(" === d ? T("url") ? (N.push(d), v(), h() && (")" !== d && '"' !== d && "'" !== d ? N.push(m(")")) : p--)) : (u++, O.preserveSingleSpace(), N.push(d), v()) : ")" === d ? (N.push(d), u--) : "," === d ? (N.push(d), v(), i && !I && u < 1 ? O.newLine() : O.singleSpace()) : ("]" === d || ("[" === d ? O.preserveSingleSpace() : "=" === d ? (v(), d = "=") : O.preserveSingleSpace()), N.push(d))
                }
                var H = "";
                return C && (H += C), H += N.join("").replace(/[\r\n\t ]+$/, ""), s && (H += "\n"), "\n" != c && (H = H.replace(/[\n]/g, c)), H
            }

            function q(e, t) {
                for (var n = 0; n < t.length; n += 1)
                    if (t[n] === e) return !0;
                return !1
            }

            function X(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }

            function N(e, t) {
                return new r(e, t).beautify()
            }

            e = j, t = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc", n = new RegExp("[".concat(t, "]")), a = new RegExp("[".concat(t, " ").concat("\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f", "]")), e.newline = /[\n\r\u2028\u2029]/, e.lineBreak = new RegExp("\r\n|".concat(e.newline.source)), e.allLineBreaks = new RegExp(e.lineBreak.source, "g"), e.isIdentifierStart = function(e) {
                return e < 65 ? 36 === e || 64 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || 170 <= e && n.test(String.fromCharCode(e)))
            }, e.isIdentifierChar = function(e) {
                return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || 170 <= e && a.test(String.fromCharCode(e))))
            };
            var Z = {
                BlockStatement: "BlockStatement",
                Statement: "Statement",
                ObjectLiteral: "ObjectLiteral",
                ArrayLiteral: "ArrayLiteral",
                ForInitializer: "ForInitializer",
                Conditional: "Conditional",
                Expression: "Expression"
            };

            function r(a, e) {
                var c, r, o, d, i, s, l, f, p, t, n, u, h, g = [],
                    m = "";

                function v(e, t) {
                    var n = 0;
                    return e && (n = e.indentation_level, !c.just_added_newline() && e.line_indent_level > n && (n = e.line_indent_level)), {
                        mode: t,
                        parent: e,
                        last_text: e ? e.last_text : "",
                        last_word: e ? e.last_word : "",
                        declaration_statement: !1,
                        declaration_assignment: !1,
                        multiline_frame: !1,
                        if_block: !1,
                        else_block: !1,
                        do_block: !1,
                        do_while: !1,
                        in_case_statement: !1,
                        in_case: !1,
                        case_body: !1,
                        indentation_level: n,
                        line_indent_level: e ? e.line_indent_level : n,
                        start_line_index: c.get_line_number(),
                        ternary_depth: 0
                    }
                }

                for (u = {
                        TK_START_EXPR: function M() {
                            N();
                            var e = Z.Expression;
                            if ("[" === d.text) {
                                if ("TK_WORD" === i || ")" === f.last_text) return "TK_RESERVED" === i && q(f.last_text, o.line_starters) && (c.space_before_token = !0), R(e), S(), y(), void(h.space_in_paren && (c.space_before_token = !0));
                                e = Z.ArrayLiteral, L(f.mode) && ("[" !== f.last_text && ("," !== f.last_text || "]" !== s && "}" !== s) || h.keep_array_indentation || A())
                            } else "TK_RESERVED" === i && "for" === f.last_text ? e = Z.ForInitializer : "TK_RESERVED" === i && q(f.last_text, ["if", "while"]) && (e = Z.Conditional);
                            " " === f.last_text || "TK_START_BLOCK" === i ? A() : "TK_END_EXPR" === i || "TK_START_EXPR" === i || "TK_END_BLOCK" === i || "." === f.last_text ? T(d.wanted_newline) : "TK_RESERVED" === i && "(" === d.text || "TK_WORD" === i || "TK_OPERATOR" === i ? "TK_RESERVED" === i && ("function" === f.last_word || "typeof" === f.last_word) || "*" === f.last_text && "function" === s ? h.space_after_anon_function && (c.space_before_token = !0) : "TK_RESERVED" !== i || !q(f.last_text, o.line_starters) && "catch" !== f.last_text || h.space_before_conditional && (c.space_before_token = !0) : c.space_before_token = !0;
                            "(" === d.text && "TK_RESERVED" === i && "await" === f.last_word && (c.space_before_token = !0);
                            "(" === d.text && ("TK_EQUALS" !== i && "TK_OPERATOR" !== i || O() || T());
                            R(e), S(), h.space_in_paren && (c.space_before_token = !0);
                            y()
                        },
                        TK_END_EXPR: function D() {
                            for (; f.mode === Z.Statement;) _();
                            f.multiline_frame && T("]" === d.text && L(f.mode) && !h.keep_array_indentation);
                            h.space_in_paren && ("TK_START_EXPR" !== i || h.space_in_empty_paren ? c.space_before_token = !0 : (c.trim(), c.space_before_token = !1));
                            "]" === d.text && h.keep_array_indentation ? (S(), _()) : (_(), S());
                            c.remove_redundant_indentation(p), f.do_while && p.mode === Z.Conditional && (p.mode = Z.Expression, f.do_block = !1, f.do_while = !1)
                        },
                        TK_START_BLOCK: function B() {
                            var e = I(1),
                                t = I(2);
                            t && (":" === t.text && q(e.type, ["TK_STRING", "TK_WORD", "TK_RESERVED"]) || q(e.text, ["get", "set"]) && q(t.type, ["TK_WORD", "TK_RESERVED"])) ? q(s, ["class", "interface"]) ? R(Z.BlockStatement) : R(Z.ObjectLiteral) : R(Z.BlockStatement);
                            var n = !e.comments_before.length && "}" === e.text && "function" === f.last_word && "TK_END_EXPR" === i;
                            "expand" === h.brace_style || "none" === h.brace_style && d.wanted_newline ? "TK_OPERATOR" !== i && (n || "TK_EQUALS" === i || "TK_RESERVED" === i && x(f.last_text) && "else" !== f.last_text) ? c.space_before_token = !0 : A(!1, !0) : "TK_OPERATOR" !== i && "TK_START_EXPR" !== i ? "TK_START_BLOCK" === i ? A() : c.space_before_token = !0 : L(p.mode) && "," === f.last_text && ("}" === s ? c.space_before_token = !0 : A());
                            S(), y()
                        },
                        TK_END_BLOCK: function F() {
                            for (; f.mode === Z.Statement;) _();
                            var e = "TK_START_BLOCK" === i;
                            "expand" === h.brace_style ? e || A() : e || (L(f.mode) && h.keep_array_indentation ? (h.keep_array_indentation = !1, A(), h.keep_array_indentation = !0) : A());
                            _(), S()
                        },
                        TK_WORD: k,
                        TK_RESERVED: k,
                        TK_SEMICOLON: function $() {
                            N() && (c.space_before_token = !1);
                            for (; f.mode === Z.Statement && !f.if_block && !f.do_block;) _();
                            S()
                        },
                        TK_STRING: function P() {
                            N() ? c.space_before_token = !0 : "TK_RESERVED" === i || "TK_WORD" === i ? c.space_before_token = !0 : "TK_COMMA" === i || "TK_START_EXPR" === i || "TK_EQUALS" === i || "TK_OPERATOR" === i ? O() || T() : A();
                            S()
                        },
                        TK_EQUALS: function H() {
                            N();
                            f.declaration_statement && (f.declaration_assignment = !0);
                            c.space_before_token = !0, S(), c.space_before_token = !0
                        },
                        TK_OPERATOR: function K() {
                            N();
                            if ("TK_RESERVED" === i && x(f.last_text)) return c.space_before_token = !0, void S();
                            if ("*" === d.text && "TK_DOT" === i) return void S();
                            if (":" === d.text && f.in_case) return f.case_body = !0, y(), S(), A(), void(f.in_case = !1);
                            if ("::" === d.text) return void S();
                            "TK_OPERATOR" === i && T();
                            var e = !0,
                                t = !0;
                            q(d.text, ["--", "++", "!", "~"]) || q(d.text, ["-", "+"]) && (q(i, ["TK_START_BLOCK", "TK_START_EXPR", "TK_EQUALS", "TK_OPERATOR"]) || q(f.last_text, o.line_starters) || "," === f.last_text) ? (t = e = !1, !d.wanted_newline || "--" !== d.text && "++" !== d.text || A(!1, !0), " " === f.last_text && w(f.mode) && (e = !0), "TK_RESERVED" === i ? e = !0 : "TK_END_EXPR" === i ? e = !("]" === f.last_text && ("--" === d.text || "++" === d.text)) : "TK_OPERATOR" === i && (e = q(d.text, ["--", "-", "++", "+"]) && q(f.last_text, ["--", "-", "++", "+"]), q(d.text, ["+", "-"]) && q(f.last_text, ["--", "++"]) && (t = !0)), f.mode !== Z.BlockStatement && f.mode !== Z.Statement || "{" !== f.last_text && " " !== f.last_text || A()) : ":" === d.text ? 0 === f.ternary_depth ? e = !1 : f.ternary_depth -= 1 : "?" === d.text ? f.ternary_depth += 1 : "*" === d.text && "TK_RESERVED" === i && "function" === f.last_text && (t = e = !1);
                            c.space_before_token = c.space_before_token || e, S(), c.space_before_token = t
                        },
                        TK_COMMA: function U() {
                            if (f.declaration_statement) return w(f.parent.mode) && (f.declaration_assignment = !1), S(), void(f.declaration_assignment ? A(f.declaration_assignment = !1, !0) : (c.space_before_token = !0, h.comma_first && T()));
                            S(), f.mode === Z.ObjectLiteral || f.mode === Z.Statement && f.parent.mode === Z.ObjectLiteral ? (f.mode === Z.Statement && _(), A()) : (c.space_before_token = !0, h.comma_first && T())
                        },
                        TK_BLOCK_COMMENT: function W() {
                            if (c.raw) return c.add_raw_token(d), void(d.directives && "end" === d.directives.preserve && (h.test_output_raw || (c.raw = !1)));
                            if (d.directives) return A(!1, !0), S(), "start" === d.directives.preserve && (c.raw = !0), void A(!1, !0);
                            if (!j.newline.test(d.text) && !d.wanted_newline) return c.space_before_token = !0, S(), void(c.space_before_token = !0);
                            var e, t = function i(e) {
                                    var t;
                                    e = e.replace(/\x0d/g, "");
                                    var n = [];
                                    t = e.indexOf("\n");
                                    for (; - 1 !== t;) n.push(e.substring(0, t)), e = e.substring(t + 1), t = e.indexOf("\n");
                                    e.length && n.push(e);
                                    return n
                                }(d.text),
                                n = !1,
                                a = !1,
                                r = d.whitespace_before,
                                o = r.length;
                            A(!1, !0), 1 < t.length && (! function s(e, t) {
                                for (var n = 0; n < e.length; n++) {
                                    var a = X(e[n]);
                                    if (a.charAt(0) !== t) return !1
                                }
                                return !0
                            }(t.slice(1), "*") ? function l(e, t) {
                                for (var n, a = 0, r = e.length; a < r; a++)
                                    if ((n = e[a]) && 0 !== n.indexOf(t)) return !1;
                                return !0
                            }(t.slice(1), r) && (a = !0) : n = !0);
                            for (S(t[0]), e = 1; e < t.length; e++) A(!1, !0), n ? S(" ".concat(t[e].replace(/^\s+/g, ""))) : a && t[e].length > o ? S(t[e].substring(o)) : c.add_token(t[e]);
                            A(!1, !0)
                        },
                        TK_COMMENT: function V() {
                            d.wanted_newline ? A(!1, !0) : c.trim(!0);
                            c.space_before_token = !0, S(), A(!1, !0)
                        },
                        TK_DOT: function z() {
                            N();
                            "TK_RESERVED" === i && x(f.last_text) ? c.space_before_token = !0 : T(")" === f.last_text && h.break_chained_methods);
                            S()
                        },
                        TK_UNKNOWN: function G() {
                            S(), "\n" === d.text[d.text.length - 1] && A()
                        },
                        TK_EOF: function Y() {
                            for (; f.mode === Z.Statement;) _()
                        }
                    }, h = {}, (e = e || {}).braces_on_own_line !== undefined && (h.brace_style = e.braces_on_own_line ? "expand" : "collapse"), h.brace_style = e.brace_style ? e.brace_style : h.brace_style ? h.brace_style : "collapse", "expand-strict" === h.brace_style && (h.brace_style = "expand"), h.indent_size = e.indent_size ? parseInt(e.indent_size, 10) : 4, h.indent_char = e.indent_char ? e.indent_char : " ", h.eol = e.eol ? e.eol : "\n", h.preserve_newlines = e.preserve_newlines === undefined || e.preserve_newlines, h.break_chained_methods = e.break_chained_methods !== undefined && e.break_chained_methods, h.max_preserve_newlines = e.max_preserve_newlines === undefined ? 0 : parseInt(e.max_preserve_newlines, 10), h.space_in_paren = e.space_in_paren !== undefined && e.space_in_paren, h.space_in_empty_paren = e.space_in_empty_paren !== undefined && e.space_in_empty_paren, h.jslint_happy = e.jslint_happy !== undefined && e.jslint_happy, h.space_after_anon_function = e.space_after_anon_function !== undefined && e.space_after_anon_function, h.keep_array_indentation = e.keep_array_indentation !== undefined && e.keep_array_indentation, h.space_before_conditional = e.space_before_conditional === undefined || e.space_before_conditional, h.unescape_strings = e.unescape_strings !== undefined && e.unescape_strings, h.wrap_line_length = e.wrap_line_length === undefined ? 0 : parseInt(e.wrap_line_length, 10), h.e4x = e.e4x !== undefined && e.e4x, h.end_with_newline = e.end_with_newline !== undefined && e.end_with_newline, h.comma_first = e.comma_first !== undefined && e.comma_first, h.test_output_raw = e.test_output_raw !== undefined && e.test_output_raw, h.jslint_happy && (h.space_after_anon_function = !0), e.indent_with_tabs && (h.indent_char = "\t", h.indent_size = 1), h.eol = h.eol.replace(/\\r/, "\r").replace(/\\n/, "\n"), l = ""; 0 < h.indent_size;) l += h.indent_char, h.indent_size -= 1;
                var b = 0;
                if (a && a.length) {
                    for (;
                        " " === a.charAt(b) || "\t" === a.charAt(b);) m += a.charAt(b), b += 1;
                    a = a.substring(b)
                }

                function E(e) {
                    var t = e.newlines;
                    if (h.keep_array_indentation && L(f.mode))
                        for (var n = 0; n < t; n += 1) A(0 < n);
                    else if (h.max_preserve_newlines && t > h.max_preserve_newlines && (t = h.max_preserve_newlines), h.preserve_newlines && 1 < e.newlines) {
                        A();
                        for (var a = 1; a < t; a += 1) A(!0)
                    }
                    u[(d = e).type]()
                }

                function T(e) {
                    if (e = e !== undefined && e, !c.just_added_newline())
                        if (h.preserve_newlines && d.wanted_newline || e) A(!1, !0);
                        else if (h.wrap_line_length) {
                        c.current_line.get_character_count() + d.text.length + (c.space_before_token ? 1 : 0) >= h.wrap_line_length && A(!1, !0)
                    }
                }

                function A(e, t) {
                    if (!t && " " !== f.last_text && "," !== f.last_text && "=" !== f.last_text && "TK_OPERATOR" !== i)
                        for (; f.mode === Z.Statement && !f.if_block && !f.do_block;) _();
                    c.add_new_line(e) && (f.multiline_frame = !0)
                }

                function C() {
                    c.just_added_newline() && (h.keep_array_indentation && L(f.mode) && d.wanted_newline ? (c.current_line.push(d.whitespace_before), c.space_before_token = !1) : c.set_indent(f.indentation_level) && (f.line_indent_level = f.indentation_level))
                }

                function S(e) {
                    c.raw ? c.add_raw_token(d) : (h.comma_first && "TK_COMMA" === i && c.just_added_newline() && "," === c.previous_line.last() && (c.previous_line.pop(), C(), c.add_token(","), c.space_before_token = !0), e = e || d.text, C(), c.add_token(e))
                }

                function y() {
                    f.indentation_level += 1
                }

                function R(e) {
                    p = f ? (t.push(f), f) : v(null, e), f = v(p, e)
                }

                function L(e) {
                    return e === Z.ArrayLiteral
                }

                function w(e) {
                    return q(e, [Z.Expression, Z.ForInitializer, Z.Conditional])
                }

                function _() {
                    0 < t.length && (p = f, f = t.pop(), p.mode === Z.Statement && c.remove_redundant_indentation(p))
                }

                function O() {
                    return f.parent.mode === Z.ObjectLiteral && f.mode === Z.Statement && (":" === f.last_text && 0 === f.ternary_depth || "TK_RESERVED" === i && q(f.last_text, ["get", "set"]))
                }

                function N() {
                    return !!("TK_RESERVED" === i && q(f.last_text, ["const", "let", "const"]) && "TK_WORD" === d.type || "TK_RESERVED" === i && "do" === f.last_text || "TK_RESERVED" === i && "return" === f.last_text && !d.wanted_newline || "TK_RESERVED" === i && "else" === f.last_text && ("TK_RESERVED" !== d.type || "if" !== d.text) || "TK_END_EXPR" === i && (p.mode === Z.ForInitializer || p.mode === Z.Conditional) || "TK_WORD" === i && f.mode === Z.BlockStatement && !f.in_case && "--" !== d.text && "++" !== d.text && "function" !== s && "TK_WORD" !== d.type && "TK_RESERVED" !== d.type || f.mode === Z.ObjectLiteral && (":" === f.last_text && 0 === f.ternary_depth || "TK_RESERVED" === i && q(f.last_text, ["get", "set"]))) && (R(Z.Statement), y(), "TK_RESERVED" === i && q(f.last_text, ["const", "let", "const"]) && "TK_WORD" === d.type && (f.declaration_statement = !0), O() || T("TK_RESERVED" === d.type && q(d.text, ["do", "for", "if", "while"])), !0)
                }

                function x(e) {
                    return q(e, ["case", "return", "do", "if", "throw", "else"])
                }

                function I(e) {
                    var t = r + (e || 0);
                    return t < 0 || t >= g.length ? null : g[t]
                }

                function k() {
                    ("TK_RESERVED" === d.type && f.mode !== Z.ObjectLiteral && q(d.text, ["set", "get"]) && (d.type = "TK_WORD"), "TK_RESERVED" === d.type && f.mode === Z.ObjectLiteral) && (":" === I(1).text && (d.type = "TK_WORD"));
                    if (N() || !d.wanted_newline || w(f.mode) || "TK_OPERATOR" === i && "--" !== f.last_text && "++" !== f.last_text || "TK_EQUALS" === i || !h.preserve_newlines && "TK_RESERVED" === i && q(f.last_text, ["const", "let", "const", "set", "get"]) || A(), f.do_block && !f.do_while) {
                        if ("TK_RESERVED" === d.type && "while" === d.text) return c.space_before_token = !0, S(), c.space_before_token = !0, void(f.do_while = !0);
                        A(), f.do_block = !1
                    }
                    if (f.if_block)
                        if (f.else_block || "TK_RESERVED" !== d.type || "else" !== d.text) {
                            for (; f.mode === Z.Statement;) _();
                            f.if_block = !1, f.else_block = !1
                        } else f.else_block = !0;
                    if ("TK_RESERVED" === d.type && ("case" === d.text || "default" === d.text && f.in_case_statement)) return A(), (f.case_body || h.jslint_happy) && (! function e() {
                        0 < f.indentation_level && (!f.parent || f.indentation_level > f.parent.indentation_level) && (f.indentation_level -= 1)
                    }(), f.case_body = !1), S(), f.in_case = !0, void(f.in_case_statement = !0);
                    if ("TK_RESERVED" === d.type && "function" === d.text && ((q(f.last_text, ["}", " "]) || c.just_added_newline() && !q(f.last_text, ["[", "{", ":", "=", ","])) && (c.just_added_blankline() || d.comments_before.length || (A(), A(!0))), "TK_RESERVED" === i || "TK_WORD" === i ? "TK_RESERVED" === i && q(f.last_text, ["get", "set", "new", "return", "export", "async"]) ? c.space_before_token = !0 : "TK_RESERVED" === i && "default" === f.last_text && "export" === s ? c.space_before_token = !0 : A() : "TK_OPERATOR" === i || "=" === f.last_text ? c.space_before_token = !0 : (f.multiline_frame || !w(f.mode) && !L(f.mode)) && A()), "TK_COMMA" !== i && "TK_START_EXPR" !== i && "TK_EQUALS" !== i && "TK_OPERATOR" !== i || O() || T(), "TK_RESERVED" === d.type && q(d.text, ["function", "get", "set"])) return S(), void(f.last_word = d.text);
                    (n = "NONE", "TK_END_BLOCK" === i ? "TK_RESERVED" === d.type && q(d.text, ["else", "catch", "finally"]) ? "expand" === h.brace_style || "end-expand" === h.brace_style || "none" === h.brace_style && d.wanted_newline ? n = "NEWLINE" : (n = "SPACE", c.space_before_token = !0) : n = "NEWLINE" : "TK_SEMICOLON" === i && f.mode === Z.BlockStatement ? n = "NEWLINE" : "TK_SEMICOLON" === i && w(f.mode) ? n = "SPACE" : "TK_STRING" === i ? n = "NEWLINE" : "TK_RESERVED" === i || "TK_WORD" === i || "*" === f.last_text && "function" === s ? n = "SPACE" : "TK_START_BLOCK" === i ? n = "NEWLINE" : "TK_END_EXPR" === i && (c.space_before_token = !0, n = "NEWLINE"), "TK_RESERVED" === d.type && q(d.text, o.line_starters) && ")" !== f.last_text && (n = "else" === f.last_text || "export" === f.last_text ? "SPACE" : "NEWLINE"), "TK_RESERVED" === d.type && q(d.text, ["else", "catch", "finally"])) ? "TK_END_BLOCK" !== i || "expand" === h.brace_style || "end-expand" === h.brace_style || "none" === h.brace_style && d.wanted_newline ? A() : (c.trim(!0), "}" !== c.current_line.last() && A(), c.space_before_token = !0): "NEWLINE" === n ? "TK_RESERVED" === i && x(f.last_text) ? c.space_before_token = !0 : "TK_END_EXPR" !== i ? "TK_START_EXPR" === i && "TK_RESERVED" === d.type && q(d.text, ["const", "let", "const"]) || ":" === f.last_text || ("TK_RESERVED" === d.type && "if" === d.text && "else" === f.last_text ? c.space_before_token = !0 : A()) : "TK_RESERVED" === d.type && q(d.text, o.line_starters) && ")" !== f.last_text && A() : f.multiline_frame && L(f.mode) && "," === f.last_text && "}" === s ? A() : "SPACE" === n && (c.space_before_token = !0);
                    S(), f.last_word = d.text, "TK_RESERVED" === d.type && "do" === d.text && (f.do_block = !0), "TK_RESERVED" === d.type && "if" === d.text && (f.if_block = !0)
                }

                i = "TK_START_BLOCK", s = "", (c = new Q(l, m)).raw = h.test_output_raw, t = [], R(Z.BlockStatement), this.beautify = function() {
                    var e, t;
                    for (o = new ee(a, h, l), g = o.tokenize(), r = 0; e = I();) {
                        for (var n = 0; n < e.comments_before.length; n++) E(e.comments_before[n]);
                        E(e), s = f.last_text, i = e.type, f.last_text = e.text, r += 1
                    }
                    return t = c.get_code(), h.end_with_newline && (t += "\n"), "\n" != h.eol && (t = t.replace(/[\n]/g, h.eol)), t
                }
            }

            function o(t) {
                var n = 0,
                    a = -1,
                    r = [],
                    o = !0;
                this.set_indent = function(e) {
                    n = t.baseIndentLength + e * t.indent_length, a = e
                }, this.get_character_count = function() {
                    return n
                }, this.is_empty = function() {
                    return o
                }, this.last = function() {
                    return this._empty ? null : r[r.length - 1]
                }, this.push = function(e) {
                    r.push(e), n += e.length, o = !1
                }, this.pop = function() {
                    var e = null;
                    return o || (e = r.pop(), n -= e.length, o = 0 === r.length), e
                }, this.remove_indent = function() {
                    0 < a && (a -= 1, n -= t.indent_length)
                }, this.trim = function() {
                    for (;
                        " " === this.last();) r.pop(), n -= 1;
                    o = 0 === r.length
                }, this.toString = function() {
                    var e = "";
                    return this._empty || (0 <= a && (e = t.indent_cache[a]), e += r.join("")), e
                }
            }

            function Q(t, n) {
                n = n || "", this.indent_cache = [n], this.baseIndentLength = n.length, this.indent_length = t.length, this.raw = !1;
                var a = [];
                this.baseIndentString = n, this.indent_string = t, this.previous_line = null, this.current_line = null, this.space_before_token = !1, this.add_outputline = function() {
                    this.previous_line = this.current_line, this.current_line = new o(this), a.push(this.current_line)
                }, this.add_outputline(), this.get_line_number = function() {
                    return a.length
                }, this.add_new_line = function(e) {
                    return (1 !== this.get_line_number() || !this.just_added_newline()) && (!(!e && this.just_added_newline()) && (this.raw || this.add_outputline(), !0))
                }, this.get_code = function() {
                    return a.join("\n").replace(/[\r\n\t ]+$/, "")
                }, this.set_indent = function(e) {
                    if (1 < a.length) {
                        for (; e >= this.indent_cache.length;) this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                        return this.current_line.set_indent(e), !0
                    }
                    return this.current_line.set_indent(0), !1
                }, this.add_raw_token = function(e) {
                    for (var t = 0; t < e.newlines; t++) this.add_outputline();
                    this.current_line.push(e.whitespace_before), this.current_line.push(e.text), this.space_before_token = !1
                }, this.add_token = function(e) {
                    this.add_space_before_token(), this.current_line.push(e)
                }, this.add_space_before_token = function() {
                    this.space_before_token && !this.just_added_newline() && this.current_line.push(" "), this.space_before_token = !1
                }, this.remove_redundant_indentation = function(e) {
                    if (!e.multiline_frame && e.mode !== Z.ForInitializer && e.mode !== Z.Conditional)
                        for (var t = e.start_line_index, n = a.length; t < n;) a[t].remove_indent(), t++
                }, this.trim = function(e) {
                    for (e = e !== undefined && e, this.current_line.trim(t, n); e && 1 < a.length && this.current_line.is_empty();) a.pop(), this.current_line = a[a.length - 1], this.current_line.trim();
                    this.previous_line = 1 < a.length ? a[a.length - 2] : null
                }, this.just_added_newline = function() {
                    return this.current_line.is_empty()
                }, this.just_added_blankline = function() {
                    return !!this.just_added_newline() && (1 === a.length || a[a.length - 2].is_empty())
                }
            }

            var J = function J(e, t, n, a, r, o) {
                this.type = e, this.text = t, this.comments_before = [], this.newlines = n || 0, this.wanted_newline = 0 < n, this.whitespace_before = a || "", this.parent = null, this.directives = null
            };

            function ee(_, O, e) {
                var N = "\n\r\t ".split(""),
                    x = /[0-9]/,
                    I = /[01234567]/,
                    k = /[0123456789abcdefABCDEF]/,
                    M = "+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! ~ , : ? ^ ^= |= :: =>".split(" ");
                this.line_starters = "continue,try,throw,return,const,let,const,if,switch,case,default,for,while,break,function,import,export".split(",");
                var D, B, F, $, P, H,
                    K = this.line_starters.concat(["do", "in", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await"]),
                    U = /([\s\S]*?)((?:\*\/)|$)/g,
                    W = /([^\n\r\u2028\u2029]*)/g,
                    V = /\/\* beautify( \w+[:]\w+)+ \*\//g,
                    z = / (\w+)[:](\w+)/g,
                    G = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g,
                    Y = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

                function i() {
                    var e, t, n = [];
                    if (D = 0, B = "", H <= P) return ["", "TK_EOF"];
                    t = $.length ? $[$.length - 1] : new J("TK_START_BLOCK", "{");
                    var a = _.charAt(P);
                    for (P += 1; q(a, N);) {
                        if (j.newline.test(a) ? "\n" === a && "\r" === _.charAt(P - 2) || (D += 1, n = []) : n.push(a), H <= P) return ["", "TK_EOF"];
                        a = _.charAt(P), P += 1
                    }
                    if (n.length && (B = n.join("")), x.test(a)) {
                        var r = !0,
                            o = !0,
                            i = x;
                        for ("0" === a && P < H && /[Xxo]/.test(_.charAt(P)) ? (o = r = !1, a += _.charAt(P), P += 1, i = /[o]/.test(_.charAt(P)) ? I : k) : (a = "", P -= 1); P < H && i.test(_.charAt(P));) a += _.charAt(P), P += 1, r && P < H && "." === _.charAt(P) && (a += _.charAt(P), P += 1, r = !1), o && P < H && /[Ee]/.test(_.charAt(P)) && (a += _.charAt(P), (P += 1) < H && /[+-]/.test(_.charAt(P)) && (a += _.charAt(P), P += 1), r = o = !1);
                        return [a, "TK_WORD"]
                    }
                    if (j.isIdentifierStart(_.charCodeAt(P - 1))) {
                        if (P < H)
                            for (; j.isIdentifierChar(_.charCodeAt(P)) && (a += _.charAt(P), (P += 1) !== H););
                        return "TK_DOT" === t.type || "TK_RESERVED" === t.type && q(t.text, ["set", "get"]) || !q(a, K) ? [a, "TK_WORD"] : "in" === a ? [a, "TK_OPERATOR"] : [a, "TK_RESERVED"]
                    }
                    if ("(" === a || "[" === a) return [a, "TK_START_EXPR"];
                    if (")" === a || "]" === a) return [a, "TK_END_EXPR"];
                    if ("{" === a) return [a, "TK_START_BLOCK"];
                    if ("}" === a) return [a, "TK_END_BLOCK"];
                    if (" " === a) return [a, "TK_SEMICOLON"];
                    if ("/" === a) {
                        var s = "";
                        if ("*" === _.charAt(P)) {
                            P += 1, U.lastIndex = P;
                            var l = U.exec(_);
                            s = "/*".concat(l[0]), P += l[0].length;
                            var c = function L(e) {
                                if (!e.match(V)) return null;
                                var t = {};
                                z.lastIndex = 0;
                                for (var n = z.exec(e); n;) t[n[1]] = n[2], n = z.exec(e);
                                return t
                            }(s);
                            return c && "start" === c.ignore && (G.lastIndex = P, s += (l = G.exec(_))[0], P += l[0].length), [s = s.replace(j.lineBreak, "\n"), "TK_BLOCK_COMMENT", c]
                        }
                        if ("/" === _.charAt(P)) {
                            P += 1, W.lastIndex = P;
                            var d = W.exec(_);
                            return s = "//".concat(d[0]), P += d[0].length, [s, "TK_COMMENT"]
                        }
                    }
                    if ("`" === a || "'" === a || '"' === a || ("/" === a || O.e4x && "<" === a && _.slice(P - 1).match(/^<([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/)) && ("TK_RESERVED" === t.type && q(t.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || "TK_END_EXPR" === t.type && ")" === t.text && t.parent && "TK_RESERVED" === t.parent.type && q(t.parent.text, ["if", "while", "for"]) || q(t.type, ["TK_COMMENT", "TK_START_EXPR", "TK_START_BLOCK", "TK_END_BLOCK", "TK_OPERATOR", "TK_EQUALS", "TK_EOF", "TK_SEMICOLON", "TK_COMMA"]))) {
                        var f = a,
                            p = !1,
                            u = !1;
                        if (e = a, "/" === f)
                            for (var h = !1; P < H && (p || h || _.charAt(P) !== f) && !j.newline.test(_.charAt(P));) e += _.charAt(P), p ? p = !1 : (p = "\\" === _.charAt(P), "[" === _.charAt(P) ? h = !0 : "]" === _.charAt(P) && (h = !1)), P += 1;
                        else if (O.e4x && "<" === f) {
                            var g = /<(\/?)([-a-zA-Z:0-9_.]+|{[^{}]*}|!\[CDATA\[[\s\S]*?\]\])(\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{.*?}))*\s*(\/?)\s*>/g,
                                m = _.slice(P - 1),
                                v = g.exec(m);
                            if (v && 0 === v.index) {
                                for (var b = v[2], E = 0; v;) {
                                    var T = !!v[1],
                                        A = v[2],
                                        C = !!v[v.length - 1] || "![CDATA[" === A.slice(0, 8);
                                    if (A !== b || C || (T ? --E : ++E), E <= 0) break;
                                    v = g.exec(m)
                                }
                                var S = v ? v.index + v[0].length : m.length;
                                return m = m.slice(0, S), P += S - 1, [m = m.replace(j.lineBreak, "\n"), "TK_STRING"]
                            }
                        } else
                            for (; P < H && (p || _.charAt(P) !== f && ("`" === f || !j.newline.test(_.charAt(P))));)(p || "`" === f) && j.newline.test(_.charAt(P)) ? ("\r" === _.charAt(P) && "\n" === _.charAt(P + 1) && (P += 1), e += "\n") : e += _.charAt(P), p = p ? ("x" !== _.charAt(P) && "u" !== _.charAt(P) || (u = !0), !1) : "\\" === _.charAt(P), P += 1;
                        if (u && O.unescape_strings && (e = function w(e) {
                                var t, n = !1,
                                    a = "",
                                    r = 0,
                                    o = "",
                                    i = 0;
                                for (; n || r < e.length;)
                                    if (t = e.charAt(r), r++, n) {
                                        if (n = !1, "x" === t) o = e.substr(r, 2), r += 2;
                                        else {
                                            if ("u" !== t) {
                                                a += "\\".concat(t);
                                                continue
                                            }
                                            o = e.substr(r, 4), r += 4
                                        }
                                        if (!o.match(/^[0123456789abcdefABCDEF]+$/)) return e;
                                        if (0 <= (i = parseInt(o, 16)) && i < 32) {
                                            a += "x" === t ? "\\x".concat(o) : "\\u".concat(o);
                                            continue
                                        }
                                        if (34 === i || 39 === i || 92 === i) a += "\\".concat(String.fromCharCode(i));
                                        else {
                                            if ("x" === t && 126 < i && i <= 255) return e;
                                            a += String.fromCharCode(i)
                                        }
                                    } else "\\" === t ? n = !0 : a += t;
                                return a
                            }(e)), P < H && _.charAt(P) === f && (e += f, P += 1, "/" === f))
                            for (; P < H && j.isIdentifierStart(_.charCodeAt(P));) e += _.charAt(P), P += 1;
                        return [e, "TK_STRING"]
                    }
                    if ("#" === a) {
                        if (0 === $.length && "!" === _.charAt(P)) {
                            for (e = a; P < H && "\n" !== a;) e += a = _.charAt(P), P += 1;
                            return ["".concat(X(e), "\n"), "TK_UNKNOWN"]
                        }
                        var y = "#";
                        if (P < H && x.test(_.charAt(P))) {
                            for (; y += a = _.charAt(P), (P += 1) < H && "#" !== a && "=" !== a;);
                            return "#" === a || ("[" === _.charAt(P) && "]" === _.charAt(P + 1) ? (y += "[]", P += 2) : "{" === _.charAt(P) && "}" === _.charAt(P + 1) && (y += "{}", P += 2)), [y, "TK_WORD"]
                        }
                    }
                    if ("<" === a && ("?" === _.charAt(P) || "%" === _.charAt(P))) {
                        Y.lastIndex = P - 1;
                        var R = Y.exec(_);
                        if (R) return a = R[0], P += a.length - 1, [a = a.replace(j.lineBreak, "\n"), "TK_STRING"]
                    }
                    if ("<" === a && "\x3c!--" === _.substring(P - 1, P + 3)) {
                        for (P += 3, a = "\x3c!--"; !j.newline.test(_.charAt(P)) && P < H;) a += _.charAt(P), P++;
                        return F = !0, [a, "TK_COMMENT"]
                    }
                    if ("-" === a && F && "--\x3e" === _.substring(P - 1, P + 2)) return F = !1, P += 2, ["--\x3e", "TK_COMMENT"];
                    if ("." === a) return [a, "TK_DOT"];
                    if (q(a, M)) {
                        for (; P < H && q(a + _.charAt(P), M) && (a += _.charAt(P), !(H <= (P += 1))););
                        return "," === a ? [a, "TK_COMMA"] : "=" === a ? [a, "TK_EQUALS"] : [a, "TK_OPERATOR"]
                    }
                    return [a, "TK_UNKNOWN"]
                }

                this.tokenize = function() {
                    var e, t, n;
                    H = _.length, P = 0, F = !1, $ = [];
                    for (var a = null, r = [], o = []; !t || "TK_EOF" !== t.type;) {
                        for (n = i(), e = new J(n[1], n[0], D, B);
                            "TK_COMMENT" === e.type || "TK_BLOCK_COMMENT" === e.type || "TK_UNKNOWN" === e.type;) "TK_BLOCK_COMMENT" === e.type && (e.directives = n[2]), o.push(e), n = i(), e = new J(n[1], n[0], D, B);
                        o.length && (e.comments_before = o, o = []), "TK_START_BLOCK" === e.type || "TK_START_EXPR" === e.type ? (e.parent = t, r.push(a), a = e) : ("TK_END_BLOCK" === e.type || "TK_END_EXPR" === e.type) && a && ("]" === e.text && "[" === a.text || ")" === e.text && "(" === a.text || "}" === e.text && "{" === a.text) && (e.parent = a.parent, a = r.pop()), $.push(e), t = e
                    }
                    return $
                }
            }

            return {
                run: function x(e, t) {
                    function i(e) {
                        return e.replace(/\s+$/g, "")
                    }

                    var n, a, r, m, o, s, v, l, c, b, E, T, d, f;
                    for ((t = t || {}).wrap_line_length !== undefined && 0 !== parseInt(t.wrap_line_length, 10) || t.max_char === undefined || 0 === parseInt(t.max_char, 10) || (t.wrap_line_length = t.max_char), a = t.indent_inner_html !== undefined && t.indent_inner_html, r = t.indent_size === undefined ? 4 : parseInt(t.indent_size, 10), m = t.indent_char === undefined ? " " : t.indent_char, s = t.brace_style === undefined ? "collapse" : t.brace_style, o = 0 === parseInt(t.wrap_line_length, 10) ? 32786 : parseInt(t.wrap_line_length || 250, 10), v = t.unformatted || ["a", "span", "img", "bdo", "em", "strong", "dfn", "code", "samp", "kbd", "const", "cite", "abbr", "acronym", "q", "sub", "sup", "tt", "i", "b", "big", "small", "u", "s", "strike", "font", "ins", "del", "address", "pre"], l = t.preserve_newlines === undefined || t.preserve_newlines, c = l ? isNaN(parseInt(t.max_preserve_newlines, 10)) ? 32786 : parseInt(t.max_preserve_newlines, 10) : 0, b = t.indent_handlebars !== undefined && t.indent_handlebars, E = t.wrap_attributes === undefined ? "auto" : t.wrap_attributes, T = t.wrap_attributes_indent_size === undefined ? r : parseInt(t.wrap_attributes_indent_size, 10) || r, d = t.end_with_newline !== undefined && t.end_with_newline, f = Array.isArray(t.extra_liners) ? t.extra_liners.concat() : "string" == typeof t.extra_liners ? t.extra_liners.split(",") : "head,body,/html".split(","), t.indent_with_tabs && (m = "\t", r = 1), (n = new function _() {
                            return this.pos = 0, this.token = "", this.current_mode = "CONTENT", this.tags = {
                                parent: "parent1",
                                parentcount: 1,
                                parent1: ""
                            }, this.tag_type = "", this.token_text = this.last_token = this.last_text = this.token_type = "", this.newlines = 0, this.indent_content = a, this.Utils = {
                                whitespace: "\n\r\t ".split(""),
                                single_token: "br,input,link,meta,source,!doctype,basefont,base,area,hr,wbr,param,img,isindex,embed".split(","),
                                extra_liners: f,
                                in_array: function(e, t) {
                                    for (var n = 0; n < t.length; n++)
                                        if (e === t[n]) return !0;
                                    return !1
                                }
                            }, this.is_whitespace = function(e) {
                                for (; 0 < e.length; e++)
                                    if (!this.Utils.in_array(e.charAt(0), this.Utils.whitespace)) return !1;
                                return !0
                            }, this.traverse_whitespace = function() {
                                var e = "";
                                if (e = this.input.charAt(this.pos), this.Utils.in_array(e, this.Utils.whitespace)) {
                                    for (this.newlines = 0; this.Utils.in_array(e, this.Utils.whitespace);) l && "\n" === e && this.newlines <= c && (this.newlines += 1), this.pos++, e = this.input.charAt(this.pos);
                                    return !0
                                }
                                return !1
                            }, this.space_or_wrap = function(e) {
                                this.line_char_count >= this.wrap_line_length ? (this.print_newline(!1, e), this.print_indentation(e)) : (this.line_char_count++, e.push(" "))
                            }, this.get_content = function() {
                                for (var e = "", t = [];
                                    "<" != this.input.charAt(this.pos);) {
                                    if (this.pos >= this.input.length) return t.length ? t.join("") : ["", "TK_EOF"];
                                    if (this.traverse_whitespace()) this.space_or_wrap(t);
                                    else {
                                        if (b) {
                                            var n = this.input.substr(this.pos, 3);
                                            if ("{{#" === n || "{{/" === n) break;
                                            if ("{{!" === n) return [this.get_tag(), "TK_TAG_HANDLEBARS_COMMENT"];
                                            if ("{{" === this.input.substr(this.pos, 2) && "{{else}}" === this.get_tag(!0)) break
                                        }
                                        e = this.input.charAt(this.pos), this.pos++, this.line_char_count++, t.push(e)
                                    }
                                }
                                return t.length ? t.join("") : ""
                            }, this.get_contents_to = function(e) {
                                if (this.pos === this.input.length) return ["", "TK_EOF"];
                                var t = "",
                                    n = new RegExp("</".concat(e, "\\s*>"), "igm");
                                n.lastIndex = this.pos;
                                var a = n.exec(this.input),
                                    r = a ? a.index : this.input.length;
                                return this.pos < r && (t = this.input.substring(this.pos, r), this.pos = r), t
                            }, this.record_tag = function(e) {
                                this.tags["".concat(e, "count")] ? this.tags["".concat(e, "count")]++ : this.tags["".concat(e, "count")] = 1, this.tags[e + this.tags["".concat(e, "count")]] = this.indent_level, this.tags[e + this.tags["".concat(e, "count")] + "parent"] = this.tags.parent, this.tags.parent = e + this.tags["".concat(e, "count")]
                            }, this.retrieve_tag = function(e) {
                                if (this.tags["".concat(e, "count")]) {
                                    for (var t = this.tags.parent; t && e + this.tags["".concat(e, "count")] !== t;) t = this.tags["".concat(t, "parent")];
                                    t && (this.indent_level = this.tags[e + this.tags["".concat(e, "count")]], this.tags.parent = this.tags[t + "parent"]), delete this.tags[e + this.tags["".concat(e, "count")] + "parent"], delete this.tags[e + this.tags["".concat(e, "count")]], 1 === this.tags["".concat(e, "count")] ? delete this.tags["".concat(e, "count")] : this.tags["".concat(e, "count")]--
                                }
                            }, this.indent_to_tag = function(e) {
                                if (this.tags["".concat(e, "count")]) {
                                    for (var t = this.tags.parent; t && e + this.tags["".concat(e, "count")] !== t;) t = this.tags["".concat(t, "parent")];
                                    t && (this.indent_level = this.tags[e + this.tags["".concat(e, "count")]])
                                }
                            }, this.get_tag = function(e) {
                                var t, n, a = "",
                                    r = [],
                                    o = "",
                                    i = !1,
                                    s = !0,
                                    l = this.pos,
                                    c = this.line_char_count;
                                e = e !== undefined && e;
                                do {
                                    if (this.pos >= this.input.length) return e && (this.pos = l, this.line_char_count = c), r.length ? r.join("") : ["", "TK_EOF"];
                                    if (a = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(a, this.Utils.whitespace)) i = !0;
                                    else {
                                        if ("'" !== a && '"' !== a || (a += this.get_unformatted(a), i = !0), "=" === a && (i = !1), r.length && "=" != r[r.length - 1] && ">" != a && i) {
                                            if (this.space_or_wrap(r), i = !1, !s && "force" === E && "/" != a) {
                                                this.print_newline(!0, r), this.print_indentation(r);
                                                for (var d = 0; d < T; d++) r.push(m)
                                            }
                                            for (var f = 0; f < r.length; f++)
                                                if (" " === r[f]) {
                                                    s = !1;
                                                    break
                                                }
                                        }
                                        if (b && "<" === n && a + this.input.charAt(this.pos) === "{{" && (a += this.get_unformatted("}}"), r.length && " " != r[r.length - 1] && "<" != r[r.length - 1] && (a = " ".concat(a)), i = !0), "<" !== a || n || (t = this.pos - 1, n = "<"), b && !n && 2 <= r.length && "{" === r[r.length - 1] && "{" === r[r.length - 2] && (t = "#" === a || "/" === a || "!" === a ? this.pos - 3 : this.pos - 2, n = "{"), this.line_char_count++, r.push(a), r[1] && ("!" === r[1] || "?" === r[1] || "%" === r[1])) {
                                            r = [this.get_comment(t)];
                                            break
                                        }
                                        if (b && r[1] && "{" === r[1] && r[2] && "!" === r[2]) {
                                            r = [this.get_comment(t)];
                                            break
                                        }
                                        if (b && "{" === n && 2 < r.length && "}" === r[r.length - 2] && "}" === r[r.length - 1]) break
                                    }
                                } while (">" != a);
                                var p, u, h = r.join("");
                                p = -1 != h.indexOf(" ") ? h.indexOf(" ") : "{" === h[0] ? h.indexOf("}") : h.indexOf(">"), u = "<" !== h[0] && b ? "#" === h[2] ? 3 : 2 : 1;
                                var g = h.substring(u, p).toLowerCase();
                                return "/" === h.charAt(h.length - 2) || this.Utils.in_array(g, this.Utils.single_token) ? e || (this.tag_type = "SINGLE") : b && "{" === h[0] && "else" === g ? e || (this.indent_to_tag("if"), this.tag_type = "HANDLEBARS_ELSE", this.indent_content = !0, this.traverse_whitespace()) : this.is_unformatted(g, v) ? (o = this.get_unformatted("</".concat(g, ">"), h), r.push(o), this.pos, this.tag_type = "SINGLE") : "script" === g && (-1 === h.search("type") || -1 < h.search("type") && -1 < h.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript)/)) ? e || (this.record_tag(g), this.tag_type = "SCRIPT") : "style" === g && (-1 === h.search("type") || -1 < h.search("type") && -1 < h.search("text/css")) ? e || (this.record_tag(g), this.tag_type = "STYLE") : "!" === g.charAt(0) ? e || (this.tag_type = "SINGLE", this.traverse_whitespace()) : e || ("/" === g.charAt(0) ? (this.retrieve_tag(g.substring(1)), this.tag_type = "END") : (this.record_tag(g), "html" != g.toLowerCase() && (this.indent_content = !0), this.tag_type = "START"), this.traverse_whitespace() && this.space_or_wrap(r), this.Utils.in_array(g, this.Utils.extra_liners) && (this.print_newline(!1, this.output), this.output.length && "\n" != this.output[this.output.length - 2] && this.print_newline(!0, this.output))), e && (this.pos = l, this.line_char_count = c), r.join("")
                            }, this.get_comment = function(e) {
                                var t = "",
                                    n = ">",
                                    a = !1;
                                this.pos = e;
                                var r = this.input.charAt(this.pos);
                                for (this.pos++; this.pos <= this.input.length && ((t += r)[t.length - 1] !== n[n.length - 1] || -1 == t.indexOf(n));) !a && t.length < 10 && (0 === t.indexOf("<![if") ? (n = "<![endif]>", a = !0) : 0 === t.indexOf("<![cdata[") ? (n = "]]>", a = !0) : 0 === t.indexOf("<![") ? (n = "]>", a = !0) : 0 === t.indexOf("\x3c!--") ? (n = "--\x3e", a = !0) : 0 === t.indexOf("{{!") ? (n = "}}", a = !0) : 0 === t.indexOf("<?") ? (n = "?>", a = !0) : 0 === t.indexOf("<%") && (n = "%>", a = !0)), r = this.input.charAt(this.pos), this.pos++;
                                return t
                            }, this.get_unformatted = function(e, t) {
                                if (t && -1 != t.toLowerCase().indexOf(e)) return "";
                                var n = "",
                                    a = "",
                                    r = 0,
                                    o = !0;
                                do {
                                    if (this.pos >= this.input.length) return a;
                                    if (n = this.input.charAt(this.pos), this.pos++, this.Utils.in_array(n, this.Utils.whitespace)) {
                                        if (!o) {
                                            this.line_char_count--;
                                            continue
                                        }
                                        if ("\n" === n || "\r" === n) {
                                            a += "\n", this.line_char_count = 0;
                                            continue
                                        }
                                    }
                                    a += n, this.line_char_count++, o = !0, b && "{" === n && a.length && "{" === a[a.length - 2] && (r = (a += this.get_unformatted("}}")).length)
                                } while (-1 === a.toLowerCase().indexOf(e, r));
                                return a
                            }, this.get_token = function() {
                                var e;
                                if ("TK_TAG_SCRIPT" !== this.last_token && "TK_TAG_STYLE" !== this.last_token) return "CONTENT" === this.current_mode ? "string" != typeof(e = this.get_content()) ? e : [e, "TK_CONTENT"] : "TAG" === this.current_mode ? "string" != typeof(e = this.get_tag()) ? e : [e, "TK_TAG_".concat(this.tag_type)] : void 0;
                                var t = this.last_token.substr(7);
                                return "string" != typeof(e = this.get_contents_to(t)) ? e : [e, "TK_".concat(t)]
                            }, this.get_full_indent = function(e) {
                                return (e = this.indent_level + e || 0) < 1 ? "" : new Array(e + 1).join(this.indent_string)
                            }, this.is_unformatted = function(e, t) {
                                if (!this.Utils.in_array(e, t)) return !1;
                                if ("a" != e.toLowerCase() || !this.Utils.in_array("a", t)) return !0;
                                var n = (this.get_tag(!0) || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);
                                return !(n && !this.Utils.in_array(n, t))
                            }, this.printer = function(e, t, n, a, r) {
                                this.input = e || "", this.output = [], this.indent_character = t, this.indent_string = "", this.indent_size = n, this.brace_style = r, this.indent_level = 0, this.wrap_line_length = a;
                                for (var o = this.line_char_count = 0; o < this.indent_size; o++) this.indent_string += this.indent_character;
                                this.print_newline = function(e, t) {
                                    this.line_char_count = 0, t && t.length && (e || "\n" != t[t.length - 1]) && ("\n" != t[t.length - 1] && (t[t.length - 1] = i(t[t.length - 1])), t.push("\n"))
                                }, this.print_indentation = function(e) {
                                    for (var t = 0; t < this.indent_level; t++) e.push(this.indent_string), this.line_char_count += this.indent_string.length
                                }, this.print_token = function(e) {
                                    this.is_whitespace(e) && !this.output.length || ((e || "" !== e) && this.output.length && "\n" === this.output[this.output.length - 1] && (this.print_indentation(this.output), e = function t(e) {
                                        return e.replace(/^\s+/g, "")
                                    }(e)), this.print_token_raw(e))
                                }, this.print_token_raw = function(e) {
                                    0 < this.newlines && (e = i(e)), e && "" !== e && (1 < e.length && "\n" === e[e.length - 1] ? (this.output.push(e.slice(0, -1)), this.print_newline(!1, this.output)) : this.output.push(e));
                                    for (var t = 0; t < this.newlines; t++) this.print_newline(0 < t, this.output);
                                    this.newlines = 0
                                }, this.indent = function() {
                                    this.indent_level++
                                }, this.unindent = function() {
                                    0 < this.indent_level && this.indent_level--
                                }
                            }, this
                        }).printer(e, m, r, o, s);;) {
                        var p = n.get_token();
                        if (n.token_text = p[0], n.token_type = p[1], "TK_EOF" === n.token_type) break;
                        switch (n.token_type) {
                            case "TK_TAG_START":
                                n.print_newline(!1, n.output), n.print_token(n.token_text), n.indent_content && (n.indent(), n.indent_content = !1), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_STYLE":
                            case "TK_TAG_SCRIPT":
                                n.print_newline(!1, n.output), n.print_token(n.token_text), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_END":
                                if ("TK_CONTENT" === n.last_token && "" === n.last_text) {
                                    var u = n.token_text.match(/\w+/)[0],
                                        h = null;
                                    n.output.length && (h = n.output[n.output.length - 1].match(/(?:<|{{#)\/?\s*(\w+)/)), (null === h || h[1] != u && !n.Utils.in_array(h[1], v)) && n.print_newline(!1, n.output)
                                }
                                n.print_token(n.token_text), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_SINGLE":
                                var g = n.token_text.match(/^\s*<([a-z-]+)/i);
                                g && n.Utils.in_array(g[1], v) || n.print_newline(!1, n.output), n.print_token(n.token_text), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_HANDLEBARS_ELSE":
                                n.print_token(n.token_text), n.indent_content && (n.indent(), n.indent_content = !1), n.current_mode = "CONTENT";
                                break;
                            case "TK_TAG_HANDLEBARS_COMMENT":
                            case "TK_CONTENT":
                                n.print_token(n.token_text), n.current_mode = "TAG";
                                break;
                            case "TK_STYLE":
                            case "TK_SCRIPT":
                                if ("" !== n.token_text) {
                                    n.print_newline(!1, n.output);
                                    var A = n.token_text,
                                        C = void 0,
                                        S = 1;
                                    "TK_SCRIPT" === n.token_type ? C = N : "TK_STYLE" === n.token_type && (C = O), "keep" === t.indent_scripts ? S = 0 : "separate" === t.indent_scripts && (S = -n.indent_level);
                                    var y = n.get_full_indent(S);
                                    if (C) A = C(A.replace(/^\s*/, y), t);
                                    else {
                                        var R = A.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(n.indent_string).length - 1,
                                            L = n.get_full_indent(S - R);
                                        A = A.replace(/^\s*/, y).replace(/\r\n|\r|\n/g, "\n" + L).replace(/\s+$/, "")
                                    }
                                    A && (n.print_token_raw(A), n.print_newline(!0, n.output))
                                }
                                n.current_mode = "TAG";
                                break;
                            default:
                                "" !== n.token_text && n.print_token(n.token_text)
                        }
                        n.last_token = n.token_type, n.last_text = n.token_text
                    }
                    var w = n.output.join("").replace(/[\r\n\t ]+$/, "");
                    return d && (w += "\n"), w
                }
            }
        }, Object.assign($e.DEFAULTS, {
            codeMirror: window.CodeMirror,
            codeMirrorOptions: {
                lineNumbers: !0,
                tabMode: "indent",
                indentWithTabs: !0,
                lineWrapping: !0,
                mode: "text/html",
                tabSize: 2
            },
            codeBeautifierOptions: {
                end_with_newline: !0,
                indent_inner_html: !0,
                extra_liners: ["p", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "pre", "ul", "ol", "table", "dl"],
                brace_style: "expand",
                indent_char: "\t",
                indent_size: 1,
                wrap_line_length: 0
            },
            codeViewKeepActiveButtons: ["fullscreen"]
        }), $e.PLUGINS.codeView = function(c) {
            var d, f, p = c.$,
                u = function u() {
                    return c.$box.hasClass("fr-code-view")
                };

            function h() {
                return f ? f.getValue() : d.val()
            }

            function g() {
                u() && (f && f.setSize(null, c.opts.height ? c.opts.height : "auto"), c.opts.heightMin || c.opts.height ? (c.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", c.opts.heightMin || c.opts.height), d.css("height", c.opts.height)) : c.$box.find(".CodeMirror-scroll, .CodeMirror-gutters").css("min-height", ""))
            }

            var m, v = !1;

            function b() {
                u() && c.events.trigger("blur")
            }

            function E() {
                u() && v && c.events.trigger("focus")
            }

            function a(e) {
                d || (! function l() {
                    d = p('<textarea class="fr-code" tabIndex="-1">'), c.$wp.append(d), d.attr("dir", c.opts.direction), c.$box.hasClass("fr-basic") || (m = p('<a data-cmd="html" title="Code View" class="fr-command fr-btn html-switch'.concat(c.helpers.isMobile() ? "" : " fr-desktop", '" role="button" tabIndex="-1"><i class="fa fa-code"></i></button>')), c.$box.append(m), c.events.bindClick(c.$box, "a.html-switch", function() {
                        c.events.trigger("commands.before", ["html"]), T(!1), c.events.trigger("commands.after", ["html"])
                    }));
                    var e = function e() {
                        return !u()
                    };
                    c.events.on("buttons.refresh", e), c.events.on("copy", e, !0), c.events.on("cut", e, !0), c.events.on("paste", e, !0), c.events.on("destroy", A, !0), c.events.on("html.set", function() {
                        u() && T(!0)
                    }), c.events.on("codeView.update", g), c.events.on("codeView.toggle", function() {
                        c.$box.hasClass("fr-code-view") && T()
                    }), c.events.on("form.submit", function() {
                        u() && (c.html.set(h()), c.events.trigger("contentChanged", [], !0))
                    }, !0)
                }(), !f && c.opts.codeMirror ? ((f = c.opts.codeMirror.fromTextArea(d.get(0), c.opts.codeMirrorOptions)).on("blur", b), f.on("focus", E)) : (c.events.$on(d, "keydown keyup change input", function() {
                    c.opts.height ? this.removeAttribute("rows") : (this.rows = 1, 0 === this.value.length ? this.style.height = "auto" : this.style.height = "".concat(this.scrollHeight, "px"))
                }), c.events.$on(d, "blur", b), c.events.$on(d, "focus", E))), c.undo.saveStep(), c.html.cleanEmptyTags(), c.html.cleanWhiteTags(!0), c.core.hasFocus() && (c.core.isEmpty() || (c.selection.save(), c.$el.find('.fr-marker[data-type="true"]').first().replaceWith('<span class="fr-tmp fr-sm">F</span>'), c.$el.find('.fr-marker[data-type="false"]').last().replaceWith('<span class="fr-tmp fr-em">F</span>')));
                var t = c.html.get(!1, !0);
                c.$el.find("span.fr-tmp").remove(), c.$box.toggleClass("fr-code-view", !0);
                var n, a, r = !1;
                if (c.core.hasFocus() && (r = !0, c.events.disableBlur(), c.$el.blur()), t = (t = t.replace(/<span class="fr-tmp fr-sm">F<\/span>/, "FROALA-SM")).replace(/<span class="fr-tmp fr-em">F<\/span>/, "FROALA-EM"), c.codeBeautifier && !t.includes("fr-embedly") && (t = c.codeBeautifier.run(t, c.opts.codeBeautifierOptions)), f) {
                    n = t.indexOf("FROALA-SM"), (a = t.indexOf("FROALA-EM")) < n ? n = a : a -= 9;
                    var o = (t = t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).substring(0, n).length - t.substring(0, n).replace(/\n/g, "").length,
                        i = t.substring(0, a).length - t.substring(0, a).replace(/\n/g, "").length;
                    n = t.substring(0, n).length - t.substring(0, t.substring(0, n).lastIndexOf("\n") + 1).length, a = t.substring(0, a).length - t.substring(0, t.substring(0, a).lastIndexOf("\n") + 1).length, f.setSize(null, c.opts.height ? c.opts.height : "auto"), c.opts.heightMin && c.$box.find(".CodeMirror-scroll").css("min-height", c.opts.heightMin), f.setValue(t), v = !r, f.focus(), v = !0, f.setSelection({
                        line: o,
                        ch: n
                    }, { line: i, ch: a }), f.refresh(), f.clearHistory()
                } else {
                    n = t.indexOf("FROALA-SM"), a = t.indexOf("FROALA-EM") - 9, c.opts.heightMin && d.css("min-height", c.opts.heightMin), c.opts.height && d.css("height", c.opts.height), c.opts.heightMax && d.css("max-height", c.opts.height || c.opts.heightMax), d.val(t.replace(/FROALA-SM/g, "").replace(/FROALA-EM/g, "")).trigger("change");
                    var s = p(c.o_doc).scrollTop();
                    v = !r, d.focus(), v = !0, d.get(0).setSelectionRange(n, a), p(c.o_doc).scrollTop(s)
                }
                c.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").not(e).filter(function() {
                    return c.opts.codeViewKeepActiveButtons.indexOf(p(this).data("cmd")) < 0
                }).addClass("fr-disabled").attr("aria-disabled", !0), e.addClass("fr-active").attr("aria-pressed", !0), !c.helpers.isMobile() && c.opts.toolbarInline && c.toolbar.hide()
            }

            function T(e) {
                void 0 === e && (e = !u());
                var t = c.$tb.find('.fr-command[data-cmd="html"]');
                e ? (c.popups.hideAll(), a(t)) : (c.$box.toggleClass("fr-code-view", !1), function n(e) {
                    var t = h();
                    c.html.set(t), c.$el.blur(), c.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command, .fr-btn-grp > .fr-btn-wrap > .fr-command, .fr-more-toolbar > .fr-btn-wrap > .fr-command").not(e).removeClass("fr-disabled").attr("aria-disabled", !1), e.removeClass("fr-active").attr("aria-pressed", !1), c.selection.setAtStart(c.el), c.selection.restore(), c.placeholder.refresh(), c.undo.saveStep()
                }(t), c.events.trigger("codeView.update"))
            }

            function A() {
                u() && T(!1), f && f.toTextArea(), d.val("").removeData().remove(), d = null, m && (m.remove(), m = null)
            }

            return {
                _init: function e() {
                    if (c.events.on("focus", function() {
                            c.opts.toolbarContainer && function t() {
                                var e = c.$tb.find('.fr-command[data-cmd="html"]');
                                u() ? (c.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").not(e).filter(function() {
                                    return c.opts.codeViewKeepActiveButtons.indexOf(p(this).data("cmd")) < 0
                                }).addClass("fr-disabled").attr("aria-disabled", !1), e.addClass("fr-active").attr("aria-pressed", !1)) : (c.$tb.find(".fr-btn-grp > .fr-command, .fr-more-toolbar > .fr-command").not(e).removeClass("fr-disabled").attr("aria-disabled", !1), e.removeClass("fr-active").attr("aria-pressed", !1))
                            }()
                        }), !c.$wp) return !1
                },
                toggle: T,
                isActive: u,
                get: h
            }
        }, $e.RegisterCommand("html", {
            title: "Code View",
            undo: !1,
            focus: !1,
            forcedRefresh: !0,
            toggle: !0,
            callback: function() {
                this.codeView.toggle()
            },
            plugin: "codeView"
        }), $e.DefineIcon("html", {
            NAME: "code",
            SVG_KEY: "codeView"
        }), Object.assign($e.POPUP_TEMPLATES, {
            "textColor.picker": "[_BUTTONS_][_TEXT_COLORS_][_CUSTOM_COLOR_]",
            "backgroundColor.picker": "[_BUTTONS_][_BACKGROUND_COLORS_][_CUSTOM_COLOR_]"
        }), Object.assign($e.DEFAULTS, {
            colorsText: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
            colorsBackground: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
            colorsStep: 7,
            colorsHEXInput: !0,
            colorsButtons: ["colorsBack", "|", "-"]
        }), $e.PLUGINS.colors = function(m) {
            var v = m.$,
                s = '<div class="fr-color-hex-layer fr-active fr-layer" id="fr-color-hex-layer- \n  '.concat(m.id, '"><div class="fr-input-line"><input maxlength="7" id="[ID]"\n  type="text" placeholder="').concat(m.language.translate("HEX Color"), '" \n  tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button \n  type="button" class="fr-command fr-submit" data-cmd="[COMMAND]" tabIndex="2" role="button">\n  ').concat(m.language.translate("OK"), "</button></div></div>");

            function l(e) {
                for (var t = "text" === e ? m.opts.colorsText : m.opts.colorsBackground, n = '<div class="fr-color-set fr-'.concat(e, '-color fr-selected-set">'), a = 0; a < t.length; a++) 0 !== a && a % m.opts.colorsStep == 0 && (n += "<br>"), "REMOVE" !== t[a] ? n += '<span class="fr-command fr-select-color" style="background:'.concat(t[a], ';" \n        tabIndex="-1" aria-selected="false" role="button" data-cmd="apply').concat(e, 'Color" \n        data-param1="').concat(t[a], '"><span class="fr-sr-only"> ').concat(m.language.translate("Color")).concat(t[a], " \n        &nbsp;&nbsp;&nbsp;</span></span>") : n += '<span class="fr-command fr-select-color" data-cmd="apply'.concat(e, 'Color"\n         tabIndex="-1" role="button" data-param1="REMOVE" \n         title="').concat(m.language.translate("Clear Formatting"), '">').concat(m.icon.create("remove"), ' \n        <span class="fr-sr-only"> ').concat(m.language.translate("Clear Formatting"), " </span></span>");
                return "".concat(n, "</div>")
            }

            function c(e) {
                var t, n = m.popups.get("".concat(e, "Color.picker")),
                    a = v(m.selection.element());
                t = "background" === e ? "background-color" : "color";
                var r = n.find(".fr-".concat(e, "-color .fr-select-color"));
                for (r.find(".fr-selected-color").remove(), r.removeClass("fr-active-item"), r.not('[data-param1="REMOVE"]').attr("aria-selected", !1); a.get(0) !== m.el;) {
                    if ("transparent" !== a.css(t) && "rgba(0, 0, 0, 0)" !== a.css(t)) {
                        var o = n.find(".fr-".concat(e, '-color .fr-select-color[data-param1="').concat(m.helpers.RGBToHex(a.css(t)), '"]'));
                        o.append('<span class="fr-selected-color" aria-hidden="true">\uf00c</span>'), o.addClass("fr-active-item").attr("aria-selected", !0);
                        break
                    }
                    a = a.parent()
                }! function i(e) {
                    var t = m.popups.get("".concat(e, "Color.picker")),
                        n = t.find(".fr-".concat(e, "-color .fr-active-item")).attr("data-param1"),
                        a = t.find(".fr-color-hex-layer input");
                    n || (n = "");
                    a.length && v(a.val(n).input).trigger("change")
                }(e)
            }

            function a(e) {
                "REMOVE" !== e ? m.format.applyStyle("background-color", m.helpers.HEXtoRGB(e)) : m.format.removeStyle("background-color"), m.popups.hide("backgroundColor.picker")
            }

            function r(e) {
                "REMOVE" !== e ? m.format.applyStyle("color", m.helpers.HEXtoRGB(e)) : m.format.removeStyle("color"), m.popups.hide("textColor.picker")
            }

            return {
                showColorsPopup: function d(e) {
                    var t = m.$tb.find('.fr-command[data-cmd="'.concat(e, '"]')),
                        n = m.popups.get("".concat(e, ".picker"));
                    if (n || (n = function i(e) {
                            var t = "";
                            m.opts.toolbarInline && 0 < m.opts.colorsButtons.length && (t += '<div class="fr-buttons fr-colors-buttons fr-tabs">\n        '.concat(m.button.buildList(m.opts.colorsButtons), "\n        </div>"));
                            var n, a = "";
                            n = "textColor" === e ? (m.opts.colorsHEXInput && (a = s.replace(/\[ID\]/g, "fr-color-hex-layer-text-".concat(m.id)).replace(/\[COMMAND\]/g, "customTextColor")), {
                                buttons: t,
                                text_colors: l("text"),
                                custom_color: a
                            }) : (m.opts.colorsHEXInput && (a = s.replace(/\[ID\]/g, "fr-color-hex-layer-background-".concat(m.id)).replace(/\[COMMAND\]/g, "customBackgroundColor")), {
                                buttons: t,
                                background_colors: l("background"),
                                custom_color: a
                            });
                            var r = m.popups.create("".concat(e, ".picker"), n);
                            return function o(h, g) {
                                m.events.on("popup.tab", function(e) {
                                    var t = v(e.currentTarget);
                                    if (!m.popups.isVisible(g) || !t.is("span")) return !0;
                                    var n = e.which,
                                        a = !0;
                                    if ($e.KEYCODE.TAB === n) {
                                        var r = h.find(".fr-buttons");
                                        a = !m.accessibility.focusToolbar(r, !!e.shiftKey)
                                    } else if ($e.KEYCODE.ARROW_UP === n || $e.KEYCODE.ARROW_DOWN === n || $e.KEYCODE.ARROW_LEFT === n || $e.KEYCODE.ARROW_RIGHT === n) {
                                        if (t.is("span.fr-select-color")) {
                                            var o = t.parent().find("span.fr-select-color"),
                                                i = o.index(t),
                                                s = m.opts.colorsStep,
                                                l = Math.floor(o.length / s),
                                                c = i % s,
                                                d = Math.floor(i / s),
                                                f = d * s + c,
                                                p = l * s;
                                            $e.KEYCODE.ARROW_UP === n ? f = ((f - s) % p + p) % p : $e.KEYCODE.ARROW_DOWN === n ? f = (f + s) % p : $e.KEYCODE.ARROW_LEFT === n ? f = ((f - 1) % p + p) % p : $e.KEYCODE.ARROW_RIGHT === n && (f = (f + 1) % p);
                                            var u = v(o.get(f));
                                            m.events.disableBlur(), u.focus(), a = !1
                                        }
                                    } else $e.KEYCODE.ENTER === n && (m.button.exec(t), a = !1);
                                    return !1 === a && (e.preventDefault(), e.stopPropagation()), a
                                }, !0)
                            }(r, "".concat(e, ".picker")), r
                        }(e)), !n.hasClass("fr-active"))
                        if (m.popups.setContainer("".concat(e, ".picker"), m.$tb), c("textColor" === e ? "text" : "background"), t.isVisible()) {
                            var a = m.button.getPosition(t),
                                r = a.left,
                                o = a.top;
                            m.popups.show("".concat(e, ".picker"), r, o, t.outerHeight())
                        } else m.position.forSelection(n), m.popups.show("".concat(e, ".picker"))
                },
                background: a,
                customColor: function o(e) {
                    var t = m.popups.get("".concat(e, "Color.picker")).find(".fr-color-hex-layer input");
                    if (t.length) {
                        var n = t.val();
                        "background" === e ? a(n) : r(n)
                    }
                },
                text: r,
                back: function e() {
                    m.popups.hide("textColor.picker"), m.popups.hide("backgroundColor.picker"), m.toolbar.showInline()
                }
            }
        }, $e.DefineIcon("textColor", {
            NAME: "tint",
            SVG_KEY: "textColor"
        }), $e.RegisterCommand("textColor", {
            title: "Text Color",
            undo: !1,
            focus: !0,
            refreshOnCallback: !1,
            popup: !0,
            callback: function() {
                this.popups.isVisible("textColor.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("textColor.picker")) : this.colors.showColorsPopup("textColor")
            }
        }), $e.RegisterCommand("applytextColor", {
            undo: !0,
            callback: function(e, t) {
                this.colors.text(t)
            }
        }), $e.RegisterCommand("customTextColor", {
            title: "OK",
            undo: !0,
            callback: function() {
                this.colors.customColor("text")
            }
        }), $e.DefineIcon("backgroundColor", {
            NAME: "paint-brush",
            SVG_KEY: "backgroundColor"
        }), $e.RegisterCommand("backgroundColor", {
            title: "Background Color",
            undo: !1,
            focus: !0,
            refreshOnCallback: !1,
            popup: !0,
            callback: function() {
                this.popups.isVisible("backgroundColor.picker") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("backgroundColor.picker")) : this.colors.showColorsPopup("backgroundColor")
            }
        }), $e.RegisterCommand("applybackgroundColor", {
            undo: !0,
            callback: function(e, t) {
                this.colors.background(t)
            }
        }), $e.RegisterCommand("customBackgroundColor", {
            title: "OK",
            undo: !0,
            callback: function() {
                this.colors.customColor("background")
            }
        }), $e.DefineIcon("colorsBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), $e.RegisterCommand("colorsBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            refreshAfterCallback: !1,
            callback: function() {
                this.colors.back()
            }
        }), $e.DefineIcon("remove", {
            NAME: "eraser",
            SVG_KEY: "remove"
        }), Object.assign($e.DEFAULTS, { dragInline: !0 }), $e.PLUGINS.draggable = function(d) {
            var f = d.$;

            function e(e) {
                return !(!e.originalEvent || !e.originalEvent.target || e.originalEvent.target.nodeType !== Node.TEXT_NODE) || (e.target && "A" === e.target.tagName && 1 === e.target.childNodes.length && "IMG" === e.target.childNodes[0].tagName && (e.target = e.target.childNodes[0]), f(e.target).hasClass("fr-draggable") ? (d.undo.canDo() || d.undo.saveStep(), d.opts.dragInline ? d.$el.attr("contenteditable", !0) : d.$el.attr("contenteditable", !1), d.opts.toolbarInline && d.toolbar.hide(), f(e.target).addClass("fr-dragging"), d.browser.msie || d.browser.edge || d.selection.clear(), void e.originalEvent.dataTransfer.setData("text", "Froala")) : (e.preventDefault(), !1))
            }

            var p, u = function u(e) {
                return !(e && ("HTML" === e.tagName || "BODY" === e.tagName || d.node.isElement(e)))
            };

            function h(e, t, n) {
                if (d.opts.iframe) {
                    var a = d.helpers.getPX(d.$wp.find(".fr-iframe").css("padding-top")),
                        r = d.helpers.getPX(d.$wp.find(".fr-iframe").css("padding-left"));
                    e += d.$iframe.offset().top + a, t += d.$iframe.offset().left + r
                }
                p.offset().top !== e && p.css("top", e), p.offset().left !== t && p.css("left", t), p.width() !== n && p.css("width", n)
            }

            function t(e) {
                e.originalEvent.dataTransfer.dropEffect = "move", d.opts.dragInline ? (! function n() {
                    for (var e = null, t = 0; t < $e.INSTANCES.length; t++)
                        if ((e = $e.INSTANCES[t].$el.find(".fr-dragging")).length) return e.get(0)
                }() || d.browser.msie || d.browser.edge) && e.preventDefault() : (e.preventDefault(), function c(e) {
                    var t = d.doc.elementFromPoint(e.originalEvent.pageX - d.win.pageXOffset, e.originalEvent.pageY - d.win.pageYOffset);
                    if (!u(t)) {
                        for (var n = 0, a = t; !u(a) && a === t && 0 < e.originalEvent.pageY - d.win.pageYOffset - n;) n++, a = d.doc.elementFromPoint(e.originalEvent.pageX - d.win.pageXOffset, e.originalEvent.pageY - d.win.pageYOffset - n);
                        (!u(a) || p && 0 === d.$el.find(a).length && a !== p.get(0)) && (a = null);
                        for (var r = 0, o = t; !u(o) && o === t && e.originalEvent.pageY - d.win.pageYOffset + r < f(d.doc).height();) r++, o = d.doc.elementFromPoint(e.originalEvent.pageX - d.win.pageXOffset, e.originalEvent.pageY - d.win.pageYOffset + r);
                        (!u(o) || p && 0 === d.$el.find(o).length && o !== p.get(0)) && (o = null), t = null === o && a ? a : o && null === a ? o : o && a ? n < r ? a : o : null
                    }
                    if (f(t).hasClass("fr-drag-helper")) return !1;
                    if (t && !d.node.isBlock(t) && (t = d.node.blockParent(t)), t && 0 <= ["TD", "TH", "TR", "THEAD", "TBODY"].indexOf(t.tagName) && (t = f(t).parents("table").get(0)), t && 0 <= ["LI"].indexOf(t.tagName) && (t = f(t).parents("UL, OL").get(0)), t && !f(t).hasClass("fr-drag-helper")) {
                        var i;
                        p || ($e.$draggable_helper || ($e.$draggable_helper = f(document.createElement("div")).attr("class", "fr-drag-helper")), p = $e.$draggable_helper, d.events.on("shared.destroy", function() {
                            p.html("").removeData().remove(), p = null
                        }, !0)), i = e.originalEvent.pageY < f(t).offset().top + f(t).outerHeight() / 2;
                        var s = f(t),
                            l = 0;
                        i || 0 !== s.next().length ? (i || (s = s.next()), "before" === p.data("fr-position") && s.is(p.data("fr-tag")) || (0 < s.prev().length && (l = parseFloat(s.prev().css("margin-bottom")) || 0), l = Math.max(l, parseFloat(s.css("margin-top")) || 0), h(s.offset().top - l / 2 - d.$box.offset().top, s.offset().left - d.win.pageXOffset - d.$box.offset().left, s.width()), p.data("fr-position", "before"))) : "after" === p.data("fr-position") && s.is(p.data("fr-tag")) || (l = parseFloat(s.css("margin-bottom")) || 0, h(s.offset().top + f(t).height() + l / 2 - d.$box.offset().top, s.offset().left - d.win.pageXOffset - d.$box.offset().left, s.width()), p.data("fr-position", "after")), p.data("fr-tag", s), p.addClass("fr-visible"), d.$box.append(p)
                    } else p && 0 < d.$box.find(p).length && p.removeClass("fr-visible")
                }(e))
            }

            function n(e) {
                e.originalEvent.dataTransfer.dropEffect = "move", d.opts.dragInline || e.preventDefault()
            }

            function a(e) {
                d.$el.attr("contenteditable", !0);
                var t = d.$el.find(".fr-dragging");
                p && p.hasClass("fr-visible") && d.$box.find(p).length ? r(e) : t.length && (e.preventDefault(), e.stopPropagation()), p && d.$box.find(p).length && p.removeClass("fr-visible"), t.removeClass("fr-dragging")
            }

            function r(e) {
                var t, n;
                d.$el.attr("contenteditable", !0);
                for (var a = 0; a < $e.INSTANCES.length; a++)
                    if ((t = $e.INSTANCES[a].$el.find(".fr-dragging")).length) {
                        n = $e.INSTANCES[a];
                        break
                    }
                if (t.length) {
                    if (e.preventDefault(), e.stopPropagation(), p && p.hasClass("fr-visible") && d.$box.find(p).length) p.data("fr-tag")[p.data("fr-position")]('<span class="fr-marker"></span>'), p.removeClass("fr-visible");
                    else if (!1 === d.markers.insertAtPoint(e.originalEvent)) return !1;
                    if (t.removeClass("fr-dragging"), !1 === (t = d.events.chainTrigger("element.beforeDrop", t))) return !1;
                    var r = t;
                    if (t.parent().is("A") && 1 === t.parent().get(0).childNodes.length && (r = t.parent()), d.core.isEmpty()) d.events.focus();
                    else d.$el.find(".fr-marker").replaceWith($e.MARKERS), d.selection.restore();
                    if (n === d || d.undo.canDo() || d.undo.saveStep(), d.core.isEmpty()) d.$el.html(r);
                    else {
                        var o = d.markers.insert();
                        0 === r.find(o).length ? f(o).replaceWith(r) : 0 === t.find(o).length && f(o).replaceWith(t), t.after($e.MARKERS), d.selection.restore()
                    }
                    return d.popups.hideAll(), d.selection.save(), d.$el.find(d.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").not(d.opts.htmlAllowedEmptyTags.join(",")).remove(), d.html.wrap(), d.html.fillEmptyBlocks(), d.selection.restore(), d.undo.saveStep(), d.opts.iframe && d.size.syncIframe(), n !== d && (n.popups.hideAll(), n.$el.find(n.html.emptyBlockTagsQuery()).not("TD, TH, LI, .fr-inner").remove(), n.html.wrap(), n.html.fillEmptyBlocks(), n.undo.saveStep(), n.events.trigger("element.dropped"), n.opts.iframe && n.size.syncIframe()), d.events.trigger("element.dropped", [r]), !1
                }
                p && p.removeClass("fr-visible"), d.undo.canDo() || d.undo.saveStep(), setTimeout(function() {
                    d.undo.saveStep()
                }, 0)
            }

            function o(e) {
                if (e && "DIV" === e.tagName && d.node.hasClass(e, "fr-drag-helper")) e.parentNode.removeChild(e);
                else if (e && e.nodeType === Node.ELEMENT_NODE)
                    for (var t = e.querySelectorAll("div.fr-drag-helper"), n = 0; n < t.length; n++) t[n].parentNode.removeChild(t[n])
            }

            return {
                _init: function i() {
                    d.opts.enter === $e.ENTER_BR && (d.opts.dragInline = !0), d.events.on("dragstart", e, !0), d.events.on("dragover", t, !0), d.events.on("dragenter", n, !0), d.events.on("document.dragend", a, !0), d.events.on("document.drop", a, !0), d.events.on("drop", r, !0), d.events.on("html.processGet", o)
                }
            }
        }, Object.assign($e.DEFAULTS, { editInPopup: !1 }), $e.MODULES.editInPopup = function(a) {
            function e() {
                a.events.$on(a.$el, a._mouseup, function() {
                    setTimeout(function() {
                        ! function n() {
                            var e, t = a.popups.get("text.edit");
                            e = "INPUT" === a.el.tagName ? a.$el.attr("placeholder") : a.$el.text(), t.find("input").val(e).trigger("change"), a.popups.setContainer("text.edit", a.$sc), a.popups.show("text.edit", a.$el.offset().left + a.$el.outerWidth() / 2, a.$el.offset().top + a.$el.outerHeight(), a.$el.outerHeight())
                        }()
                    }, 10)
                })
            }

            return {
                _init: function n() {
                    a.opts.editInPopup && (! function t() {
                        var e = { edit: '<div id="fr-text-edit-'.concat(a.id, '" class="fr-layer fr-text-edit-layer"><div class="fr-input-line"><input type="text" placeholder="').concat(a.language.translate("Text"), '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="updateText" tabIndex="2">').concat(a.language.translate("Update"), "</button></div></div>") };
                        a.popups.create("text.edit", e)
                    }(), e())
                },
                update: function t() {
                    var e = a.popups.get("text.edit").find("input").val();
                    0 === e.length && (e = a.opts.placeholderText), "INPUT" === a.el.tagName ? a.$el.attr("placeholder", e) : a.$el.text(e), a.events.trigger("contentChanged"), a.popups.hide("text.edit")
                }
            }
        }, $e.RegisterCommand("updateText", {
            focus: !1,
            undo: !1,
            callback: function() {
                this.editInPopup.update()
            }
        }), Object.assign($e.POPUP_TEMPLATES, { emoticons: "[_BUTTONS_][_CUSTOM_LAYER_]" }), Object.assign($e.DEFAULTS, {
            emoticonsSet: [{
                id: "people",
                name: "Smileys & People",
                code: "1f600",
                emoticons: [{ code: "1f600", desc: "Grinning face" }, {
                    code: "1f601",
                    desc: "Grinning Face with Smiling Eyes"
                }, { code: "1f602", desc: "Face with Tears of Joy" }, {
                    code: "1f603",
                    desc: "Smiling Face with Open Mouth"
                }, { code: "1f604", desc: "Smiling Face with Open Mouth and Smiling Eyes" }, {
                    code: "1f605",
                    desc: "Smiling Face with Open Mouth and Cold Sweat"
                }, { code: "1f606", desc: "Smiling Face with Open Mouth and Tightly-Closed Eyes" }, {
                    code: "1f609",
                    desc: "Winking Face"
                }, { code: "1f60a", desc: "Smiling Face with Smiling Eyes" }, {
                    code: "1f608",
                    desc: "Face Savouring Delicious Food"
                }, { code: "1f60e", desc: "Smiling Face with Sunglasses" }, {
                    code: "1f60d",
                    desc: "Smiling Face with Heart-Shaped Eyes"
                }, { code: "1f618", desc: "Face Throwing a Kiss" }, { code: "1f617", desc: "Kissing Face" }, {
                    code: "1f619",
                    desc: "Kissing Face with Smiling Eyes"
                }, { code: "1f61a", desc: "Kissing Face with Closed Eyes" }, {
                    code: "263a",
                    desc: "White Smiling Face"
                }, { code: "1f642", desc: "Slightly Smiling Face" }, { code: "1f610", desc: "Neutral Face" }, {
                    code: "1f611",
                    desc: "Expressionless Face"
                }, { code: "1f636", desc: "Face Without Mouth" }, { code: "1f60f", desc: "Smirking Face" }, {
                    code: "1f623",
                    desc: "Persevering Face"
                }, { code: "1f625", desc: "Disappointed but Relieved Face" }, {
                    code: "1f62e",
                    desc: "Face with Open Mouth"
                }, { code: "1f62f", desc: "Hushed Face" }, { code: "1f62a", desc: "Sleepy Face" }, {
                    code: "1f62b",
                    desc: "Tired Face"
                }, { code: "1f634", desc: "Sleeping Face" }, { code: "1f60c", desc: "Relieved Face" }, {
                    code: "1f61b",
                    desc: "Face with Stuck-out Tongue"
                }, { code: "1f61c", desc: "Face with Stuck-out Tongue and Winking Eye" }, {
                    code: "1f61d",
                    desc: "Face with Stuck-out Tongue and Tightly-Closed Eyes"
                }, { code: "1f612", desc: "Unamused Face" }, { code: "1f613", desc: "Face with Cold Sweat" }, {
                    code: "1f613",
                    desc: "Face with Cold Sweat"
                }, { code: "1f614", desc: "Pensive Face" }, { code: "1f615", desc: "Confused Face" }, {
                    code: "1f632",
                    desc: "Astonished  Face"
                }, { code: "1f616", desc: "Confounded Face" }, { code: "1f61e", desc: "Disappointed Face" }, {
                    code: "1f61f",
                    desc: "Worried Face"
                }, { code: "1f624", desc: "Face with Look of Triumph" }, { code: "1f622", desc: "Crying Face" }, {
                    code: "1f62d",
                    desc: "Loudly Crying Face"
                }, { code: "1f626", desc: "Frowning Face with Open Mouth" }, {
                    code: "1f627",
                    desc: "Anguished Face"
                }, { code: "1f628", desc: "Fearful Face" }, { code: "1f629", desc: "Weary Face" }, {
                    code: "1f62c",
                    desc: "Grimacing Face"
                }, { code: "1f630", desc: "Face with Open Mouth and Cold Sweat" }, {
                    code: "1f631",
                    desc: "Face Screaming in Fear"
                }, { code: "1f633", desc: "Flushed Face" }, { code: "1f635", desc: "Dizzy Face" }, {
                    code: "1f621",
                    desc: "Pouting Face"
                }, { code: "1f620", desc: "Angry Face" }, { code: "1f637", desc: "Face with Medical Mask" }, {
                    code: "1f607",
                    desc: "Smiling Face with Halo"
                }, { code: "1f608", desc: "Smiling Face with Horns" }, { code: "1f47f", desc: "Imp" }, {
                    code: "1f479",
                    desc: "Japanese Ogre"
                }, { code: "1f47a", desc: "Japanese Goblin" }, { code: "1f480", desc: "Skull" }, {
                    code: "1f47b",
                    desc: "Ghost"
                }, { code: "1f47d", desc: "Extraterrestrial Alien" }, { code: "1f47e", desc: "Alien Monster" }, {
                    code: "1f4a9",
                    desc: "Pile of Poo"
                }, { code: "1f63a", desc: "Smiling Cat Face with Open Mouth" }, {
                    code: "1f638",
                    desc: "Grinning Cat Face with Smiling Eyes"
                }, { code: "1f639", desc: "Cat Face with Tears of Joy" }, {
                    code: "1f63b",
                    desc: "Smiling Cat Face with Heart-Shaped Eyes"
                }, { code: "1f63c", desc: "Cat Face with Wry Smile" }, {
                    code: "1f63d",
                    desc: "Kissing Cat Face with Closed Eyes"
                }, { code: "1f640", desc: "Weary Cat Face" }, { code: "1f63f", desc: "Crying Cat Face" }, {
                    code: "1f63e",
                    desc: "Pouting Cat Face"
                }, { code: "1f648", desc: "See-No-Evil Monkey" }, {
                    code: "1f649",
                    desc: "Hear-No-Evil Monkey"
                }, { code: "1f64a", desc: "Speak-No-Evil Monkey" }, { code: "1f476", desc: "Baby" }, {
                    code: "1f466",
                    desc: "Boy"
                }, { code: "1f467", desc: "Girl" }, { code: "1f468", desc: "Man" }, {
                    code: "1f469",
                    desc: "Woman"
                }, { code: "1f474", desc: "Older Man" }, { code: "1f475", desc: "Older Woman" }, {
                    code: "1f46e",
                    desc: "Police Officer"
                }, { code: "1f482", desc: " Guardsman" }, { code: "1f477", desc: " Construction Worker" }, {
                    code: "1f478",
                    desc: "Princess"
                }, { code: "1f473", desc: "Man with Turban" }, { code: "1f472", desc: "Man with Gua Pi Mao" }, {
                    code: "1f471",
                    desc: "Person with Blond Hair"
                }, { code: "1f470", desc: "Bride with Veil" }, { code: "1f47c", desc: "Baby Angel" }, {
                    code: "1f385",
                    desc: "Father Christmas"
                }, { code: "1f64e", desc: "Person with Pouting Face" }, {
                    code: "1f645",
                    desc: "Face with No Good Gesture"
                }, { code: "1f646", desc: "Face with Ok Gesture" }, {
                    code: "1f481",
                    desc: "Information Desk Person"
                }, { code: "1f64b", desc: "Happy Person Raising One Hand" }, {
                    code: "1f647",
                    desc: "Person Bowing Deeply"
                }, { code: "1f486", desc: "Face Massage" }, { code: "1f487", desc: "Haircut" }, {
                    code: "1f6b6",
                    desc: "Pedestrian"
                }, { code: "1f3c3", desc: "Runner" }, { code: "1f483", desc: "Dancer" }, {
                    code: "1f46f",
                    desc: "Woman with Bunny Ears"
                }, { code: "1f6c0", desc: "Bath" }, { code: "1f464", desc: "Bust in Silhouette" }, {
                    code: "1f465",
                    desc: "Busts in Silhouette"
                }, { code: "1f3c7", desc: "Horse Racing" }, { code: "1f3c2", desc: " Snowboarder" }, {
                    code: "1f3c4",
                    desc: " Surfer"
                }, { code: "1f6a3", desc: " Rowboat" }, { code: "1f3ca", desc: " Swimmer" }, {
                    code: "1f6b4",
                    desc: " Bicyclist"
                }, { code: "1f6b5", desc: "Mountain Bicyclist" }, {
                    code: "1f46b",
                    desc: " Man and Woman Holding Hands"
                }, { code: "1f46c", desc: "Two Men Holding Hands" }, {
                    code: "1f46d",
                    desc: "Two Women Holding Hands"
                }, { code: "1f48f", desc: "Kiss" }, {
                    code: "1f468-2764-1f48b-1f468",
                    uCode: "\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68",
                    desc: "Man Kiss Man"
                }, {
                    code: "1f469-2764-1f48b-1f469",
                    uCode: "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc69",
                    desc: "Woman Kiss Woman"
                }, { code: "1f491", desc: "Couple with Heart" }, {
                    code: "1f468-2764-1f468",
                    uCode: "\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68",
                    desc: "Man Heart Man"
                }, {
                    code: "1f469-2764-1f469",
                    uCode: "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc69",
                    desc: "Woman Heart Woman"
                }, { code: "1f46a", desc: "Family" }, { code: "1f468", desc: "Man Woman Boy" }, {
                    code: "1f468-1f469-1f467",
                    desc: "Man Woman Girl"
                }, { code: "1f468-1f469-1f467-1f466", desc: "Man Woman Girl Boy" }, {
                    code: "1f468-1f469-1f466-1f466",
                    desc: "Man Woman Boy Boy"
                }, { code: "1f468-1f469-1f467-1f467", desc: "Man Woman Girl Girl" }, {
                    code: "1f468-1f468-1f466",
                    desc: "Man Man Boy"
                }, { code: "1f468-1f468-1f467", desc: "Man Man Girl" }, {
                    code: "1f468-1f468-1f467-1f466",
                    desc: "Man Man Girl Boy"
                }, { code: "1f468-1f468-1f466-1f466", desc: "Man Man Boy Boy" }, {
                    code: "1f469-1f469-1f466",
                    desc: "Woman Woman Boy"
                }, { code: "1f469-1f469-1f467", desc: "Woman Woman Girl" }, {
                    code: "1f469-1f469-1f467-1f466",
                    desc: "Woman Woman Girl Boy"
                }, { code: "1f469-1f469-1f467-1f467", desc: "Woman Woman Girl Girl" }, {
                    code: "1f4aa",
                    desc: "Flexed Biceps"
                }, { code: "1f448", desc: "White Left Pointing Backhand Index" }, {
                    code: "1f449",
                    desc: "White Right Pointing Backhand Index"
                }, { code: "1f446", desc: "White Up Pointing Backhand Index" }, {
                    code: "1f447",
                    desc: "White Down Pointing Backhand Index"
                }, { code: "270c", desc: "Victory Hand" }, { code: "270b", desc: "Raised Hand" }, {
                    code: "1f44c",
                    desc: "Ok Hand Sign"
                }, { code: "1f44d", desc: "Thumbs Up Sign" }, { code: "1f44e", desc: "Thumbs Down Sign" }, {
                    code: "270a",
                    desc: "Raised Fist"
                }, { code: "1f44a", desc: "Fisted Hand Sign" }, { code: "1f44b", desc: "Waving Hand Sign" }, {
                    code: "1f44f",
                    desc: "Clapping Hands Sign"
                }, { code: "1f450", desc: "Open  Hands Sign" }, {
                    code: "1f64c",
                    desc: "Person Raising Both Hands in Celebration"
                }, { code: "1f64f", desc: "Person with Folded Hands" }, { code: "1f485", desc: "Nail Polish" }, {
                    code: "1f442",
                    desc: "Ear"
                }, { code: "1f443", desc: "Nose" }, { code: "1f463", desc: "Footprints" }, {
                    code: "1f440",
                    desc: "Eyes"
                }, { code: "1f445", desc: "Tongue" }, { code: "1f444", desc: "Mouth" }, {
                    code: "1f48b",
                    desc: "Kiss Mark"
                }, { code: "1f498", desc: "Heart with Arrow" }, { code: "2764", desc: "Heavy Black Heart" }, {
                    code: "1f493",
                    desc: "Heavy Black Heart"
                }, { code: "1f494", desc: "Broken Heart" }, { code: "1f495", desc: "Two Hearts" }, {
                    code: "1f496",
                    desc: "Sparkling Hearts"
                }, { code: "1f497", desc: "Growing Hearts" }, { code: "1f499", desc: "Blue Heart" }, {
                    code: "1f49a",
                    desc: "Green Heart"
                }, { code: "1f49b", desc: "Yellow Heart" }, { code: "1f49c", desc: "Purple Heart" }, {
                    code: "1f49d",
                    desc: "Heart with Ribbon"
                }, { code: "1f49e", desc: "Revolving Hearts" }, { code: "1f49f", desc: "Heart Decoration" }, {
                    code: "1f48c",
                    desc: "Love Letter"
                }, { code: "1f4a4", desc: "Sleeping Symbol" }, { code: "1f4a2", desc: "Anger Symbol" }, {
                    code: "1f4a3",
                    desc: "Bomb"
                }, { code: "1f4a5", desc: "Collision Symbol" }, {
                    code: "1f4a6",
                    desc: "Splashing Sweat Symbol"
                }, { code: "1f4a8", desc: "Dash Symbol" }, { code: "1f4ab", desc: "Dizzy Symbol" }, {
                    code: "1f4ab",
                    desc: "Dizzy Symbol"
                }, { code: "1f4ac", desc: "Speech Balloon" }, { code: "1f4ad", desc: "Thought Balloon" }, {
                    code: "1f453",
                    desc: "Eyeglasses"
                }, { code: "1f454", desc: "Necktie" }, { code: "1f455", desc: "T-Shirt" }, {
                    code: "1f456",
                    desc: "Jeans"
                }, { code: "1f457", desc: "Dress" }, { code: "1f458", desc: "Kimono" }, {
                    code: "1f459",
                    desc: "Bikini"
                }, { code: "1f45a", desc: "Womans Clothes" }, { code: "1f45b", desc: "Purse" }, {
                    code: "1f45c",
                    desc: "Handbag"
                }, { code: "1f45d", desc: "Pouch" }, { code: "1f392", desc: "School Satchel" }, {
                    code: "1f45e",
                    desc: "Mans Shoe"
                }, { code: "1f45f", desc: "Athletic Shoe" }, { code: "1f460", desc: "High-Heeled Shoe" }, {
                    code: "1f461",
                    desc: "Womans Sandal"
                }, { code: "1f462", desc: "Womans Boots" }, { code: "1f451", desc: "Crown" }, {
                    code: "1f452",
                    desc: "Womans Hat"
                }, { code: "1f462", desc: "Top Hat" }, { code: "1f393", desc: "Graduation Cap" }, {
                    code: "1f484",
                    desc: "Lipstick"
                }, { code: "1f48d", desc: "Ring" }, { code: "1f48e", desc: "Gem Stone" }]
            }, {
                id: "nature",
                name: "Animals & Nature",
                code: "1F435",
                emoticons: [{ code: "1F435", desc: "Monkey Face" }, { code: "1F412", desc: "Monkey" }, {
                    code: "1F436",
                    desc: "Dog Face"
                }, { code: "1F415", desc: "Dog" }, { code: "1F429", desc: "Poodle" }, {
                    code: "1F43A",
                    desc: "Wolf Face"
                }, { code: "1F431", desc: "Cat Face" }, { code: "1F408", desc: "Cat" }, {
                    code: "1F42F",
                    desc: "Tiger Face"
                }, { code: "1F405", desc: "Tiger" }, { code: "1F406", desc: "Leopard" }, {
                    code: "1F434",
                    desc: "Horse Face"
                }, { code: "1F40E", desc: "Horse" }, { code: "1F42E", desc: "Cow Face" }, {
                    code: "1F402",
                    desc: "Ox"
                }, { code: "1F403", desc: "Water Buffalo" }, { code: "1F404", desc: "Cow" }, {
                    code: "1F437",
                    desc: "Pig Face"
                }, { code: "1F416", desc: "Pig" }, { code: "1F417", desc: "Boar" }, {
                    code: "1F43D",
                    desc: "Pig Nose"
                }, { code: "1F40F", desc: "Ram" }, { code: "1F411", desc: "Sheep" }, {
                    code: "1F410",
                    desc: "Goat"
                }, { code: "1F42A", desc: "Dromedary Camel" }, { code: "1F42B", desc: "Bactrian Camel" }, {
                    code: "1F418",
                    desc: "Elephant"
                }, { code: "1F42D", desc: "Mouse Face" }, { code: "1F401", desc: "Mouse" }, {
                    code: "1F400",
                    desc: "Rat"
                }, { code: "1F439", desc: "Hamster Face" }, { code: "1F430", desc: "Rabbit Face" }, {
                    code: "1F407",
                    desc: "Rabbit"
                }, { code: "1F43B", desc: "Bear Face" }, { code: "1F428", desc: "Koala" }, {
                    code: "1F43C",
                    desc: "Panda Face"
                }, { code: "1F43E", desc: "Paw Prints" }, { code: "1F414", desc: "Chicken" }, {
                    code: "1F413",
                    desc: "Rooster"
                }, { code: "1F423", desc: "Hatching Chick" }, { code: "1F424", desc: "Baby Chick" }, {
                    code: "1F425",
                    desc: "Front-Facing Baby Chick"
                }, { code: "1F426", desc: "Bird" }, { code: "1F427", desc: "Penguin" }, {
                    code: "1F438",
                    desc: "Frog Face"
                }, { code: "1F40A", desc: "Crocodile" }, { code: "1F422", desc: "Turtle" }, {
                    code: "1F40D",
                    desc: "Snake"
                }, { code: "1F432", desc: "Dragon Face" }, { code: "1F409", desc: "Dragon" }, {
                    code: "1F433",
                    desc: "Spouting Whale"
                }, { code: "1F40B", desc: "Whale" }, { code: "1F42C", desc: "Dolphin" }, {
                    code: "1F41F",
                    desc: "Fish"
                }, { code: "1F420", desc: "Tropical Fish" }, { code: "1F421", desc: "Blowfish" }, {
                    code: "1F419",
                    desc: "Octopus"
                }, { code: "1F41A", desc: "Spiral Shell" }, { code: "1F40C", desc: "Snail" }, {
                    code: "1F41B",
                    desc: "Bug"
                }, { code: "1F41C", desc: "Ant" }, { code: "1F41D", desc: "Honeybee" }, {
                    code: "1F41E",
                    desc: "Lady Beetle"
                }, { code: "1F490", desc: "Bouquet" }, { code: "1F338", desc: "Cherry Blossom" }, {
                    code: "1F4AE",
                    desc: "White Flower"
                }, { code: "1F339", desc: "Rose" }, { code: "1F33A", desc: "Hibiscus" }, {
                    code: "1F33B",
                    desc: "Sunflower"
                }, { code: "1F33C", desc: "Blossom" }, { code: "1F337", desc: "Tulip" }, {
                    code: "1F331",
                    desc: "Seedling"
                }, { code: "1F332", desc: "Evergreen Tree" }, { code: "1F333", desc: "Deciduous Tree" }, {
                    code: "1F334",
                    desc: "Palm Tree"
                }, { code: "1F335", desc: "Cactus" }, { code: "1F33E", desc: "Ear of Rice" }, {
                    code: "1F33F",
                    desc: "Herb"
                }, { code: "2618", desc: "Four Leaf Clover" }, { code: "1F341", desc: "Maple Leaf" }, {
                    code: "1F342",
                    desc: "Fallen Leaf"
                }, { code: "1F343", desc: "Leaf Fluttering in Wind" }]
            }, {
                id: "foods",
                name: "Food & Drink",
                code: "1F347",
                emoticons: [{ code: "1F347", desc: "Grapes" }, { code: "1F348", desc: "Melon" }, {
                    code: "1F349",
                    desc: "Watermelon"
                }, { code: "1F34A", desc: "Tangerine" }, { code: "1F34B", desc: "Lemon" }, {
                    code: "1F34C",
                    desc: "Banana"
                }, { code: "1F34D", desc: "Pineapple" }, { code: "1F34E", desc: "Red Apple" }, {
                    code: "1F34F",
                    desc: "Green Apple"
                }, { code: "1F350", desc: "Pear" }, { code: "1F351", desc: "Peach" }, {
                    code: "1F352",
                    desc: "Cherries"
                }, { code: "1F353", desc: "Strawberry" }, { code: "1F345", desc: "Tomato" }, {
                    code: "1F346",
                    desc: "Aubergine"
                }, { code: "1F33D", desc: "Ear of Maize" }, { code: "1F344", desc: "Mushroom" }, {
                    code: "1F330",
                    desc: "Chestnut"
                }, { code: "1F35E", desc: "Bread" }, { code: "1F356", desc: "Meat on Bone" }, {
                    code: "1F357",
                    desc: "Poultry Leg"
                }, { code: "1F354", desc: "Hamburger" }, { code: "1F35F", desc: "French Fries" }, {
                    code: "1F355",
                    desc: "Slice of Pizza"
                }, { code: "1F373", desc: "Cooking" }, { code: "1F372", desc: "Pot of Food" }, {
                    code: "1F371",
                    desc: "Bento Box"
                }, { code: "1F358", desc: "Rice Cracker" }, { code: "1F359", desc: "Rice Ball" }, {
                    code: "1F35A",
                    desc: "Cooked Rice"
                }, { code: "1F35B", desc: "Curry and Rice" }, { code: "1F35C", desc: "Steaming Bowl" }, {
                    code: "1F35D",
                    desc: "Spaghetti"
                }, { code: "1F360", desc: "Roasted Sweet Potato" }, { code: "1F362", desc: "Oden" }, {
                    code: "1F363",
                    desc: "Sushi"
                }, { code: "1F364", desc: "Fried Shrimp" }, {
                    code: "1F365",
                    desc: "Fish Cake with Swirl Design"
                }, { code: "1F361", desc: "Dango" }, { code: "1F366", desc: "Soft Ice Cream" }, {
                    code: "1F367",
                    desc: "Shaved Ice"
                }, { code: "1F368", desc: "Ice Cream" }, { code: "1F369", desc: "Doughnut" }, {
                    code: "1F36A",
                    desc: "Cookie"
                }, { code: "1F382", desc: "Birthday Cake" }, { code: "1F370", desc: "Shortcake" }, {
                    code: "1F36B",
                    desc: "Chocolate Bar"
                }, { code: "1F36C", desc: "Candy" }, { code: "1F36D", desc: "Lollipop" }, {
                    code: "1F36E",
                    desc: "Custard"
                }, { code: "1F36F", desc: "Honey Pot" }, { code: "1F37C", desc: "Baby Bottle" }, {
                    code: "2615",
                    desc: "Hot Beverage"
                }, { code: "1F375", desc: "Teacup Without Handle" }, {
                    code: "1F376",
                    desc: "Sake Bottle and Cup"
                }, { code: "1F377", desc: "Wine Glass" }, { code: "1F378", desc: "Cocktail Glass" }, {
                    code: "1F379",
                    desc: "Tropical Drink"
                }, { code: "1F37A", desc: "Beer Mug" }, { code: "1F37B", desc: "Clinking Beer Mugs" }, {
                    code: "1F374",
                    desc: "Fork and Knife"
                }, { code: "1F52A", desc: "Hocho" }]
            }, {
                id: "activity",
                name: "Activities",
                code: "1f383",
                emoticons: [{ code: "1f383", desc: " Jack-O-Lantern" }, {
                    code: "1f384",
                    desc: "Christmas Tree"
                }, { code: "1f386", desc: " Fireworks" }, { code: "1f387", desc: "Firework Sparkler" }, {
                    code: "2728",
                    desc: " Sparkles"
                }, { code: "1f388", desc: "Balloon" }, { code: "1f389", desc: "Party Popper" }, {
                    code: "1f38a",
                    desc: "Confetti Ball"
                }, { code: "1f38b", desc: "Tanabata Tree" }, { code: "1f38d", desc: "Pine Decoration" }, {
                    code: "1f38e",
                    desc: "Japanese Dolls"
                }, { code: "1f38f", desc: "Carp Streamer" }, { code: "1f390", desc: "Wind Chime" }, {
                    code: "1f391",
                    desc: "Moon Viewing Ceremony"
                }, { code: "1f380", desc: "Ribbon" }, { code: "1f381", desc: "Wrapped Present" }, {
                    code: "1f3ab",
                    desc: "Ticket"
                }, { code: "1f3c6", desc: "Trophy" }, { code: "1f388", desc: "Balloon" }, {
                    code: "26bd",
                    desc: "Soccer Ball"
                }, { code: "26be", desc: "Baseball" }, { code: "1f3c0", desc: "Basketball and Hoop" }, {
                    code: "1f3c8",
                    desc: "American Football"
                }, { code: "1f3c9", desc: "Rugby Football" }, {
                    code: "1f3be",
                    desc: "Tennis Racquet and Ball"
                }, { code: "1f3b1", desc: "Billiards" }, { code: "1f3b3", desc: "Bowling" }, {
                    code: "1f3af",
                    desc: "Direct Hit"
                }, { code: "26f3", desc: "Flag in Hole" }, { code: "1f3a3", desc: "Fishing Pole and Fish" }, {
                    code: "1f3bd",
                    desc: "Running Shirt with Sash"
                }, { code: "1f3bf", desc: "Ski and Ski Boot" }, { code: "1f3ae", desc: "Video Game" }, {
                    code: "1f3b2",
                    desc: "Game Die"
                }, { code: "2660", desc: "Black Spade Suit" }, { code: "2665", desc: "Black Heart SuiT" }, {
                    code: "2666",
                    desc: "Black Diamond Suit"
                }, { code: "2663", desc: "Black Club Suit" }, {
                    code: "1f0cf",
                    desc: "Playing Card Black Joker"
                }, { code: "1f004", desc: "Mahjong Tile Red Dragon" }, { code: "1f3b4", desc: "Flower Playing Cards" }]
            }, {
                id: "places",
                name: "Travel & Places",
                code: "1f30d",
                emoticons: [{ code: "1f30d", desc: "Earth Globe Europe-Africa" }, {
                    code: "1f30e",
                    desc: "Earth Globe Americas"
                }, { code: "1f30f", desc: "Earth Globe Asia-Australia" }, {
                    code: "1f310",
                    desc: "Globe with Meridians"
                }, { code: "1f5fe", desc: "Silhouette of Japan" }, { code: "1f30b", desc: "Volcano" }, {
                    code: "1f5fb",
                    desc: "Mount Fuji"
                }, { code: "1f3e0", desc: "House Building" }, { code: "1f3e1", desc: "House with Garden" }, {
                    code: "1f3e2",
                    desc: "Office Building"
                }, { code: "1f3e3", desc: "Japanese Post Office" }, {
                    code: "1f3e4",
                    desc: "European Post Office"
                }, { code: "1f3e5", desc: "Hospital" }, { code: "1f3e6", desc: "Bank" }, {
                    code: "1f3e8",
                    desc: "Hotel"
                }, { code: "1f3e9", desc: "Love Hotel" }, { code: "1f3ea", desc: "Convenience Store" }, {
                    code: "1f3eb",
                    desc: "School"
                }, { code: "1f3ec", desc: "Department Store" }, { code: "1f3ed", desc: "Factory" }, {
                    code: "1f3ef",
                    desc: "Japanese Castle"
                }, { code: "1f3f0", desc: "European Castle" }, { code: "1f492", desc: "Wedding" }, {
                    code: "1f5fc",
                    desc: "Tokyo Tower"
                }, { code: "1f5fd", desc: "Statue of Liberty" }, { code: "26ea", desc: "Church" }, {
                    code: "26f2",
                    desc: "Fountain"
                }, { code: "26fa", desc: "Tent" }, { code: "1f301", desc: "Foggy" }, {
                    code: "1f303",
                    desc: "Night with Stars"
                }, { code: "1f304", desc: "Sunrise over Mountains" }, { code: "1f305", desc: "Sunrise" }, {
                    code: "1f306",
                    desc: "Cityscape at Dusk"
                }, { code: "1f307", desc: "Sunset over Buildings" }, { code: "1f309", desc: "Bridge at Night" }, {
                    code: "2668",
                    desc: "Hot Springs"
                }, { code: "1f30c", desc: "Milky Way" }, { code: "1f3a0", desc: "Carousel Horse" }, {
                    code: "1f3a1",
                    desc: "Ferris Wheel"
                }, { code: "1f3a2", desc: "Roller Coaster" }, { code: "1f488", desc: "Barber Pole" }, {
                    code: "1f3aa",
                    desc: "Circus Tent"
                }, { code: "1f3ad", desc: "Performing Arts" }, { code: "1f3a8", desc: "Artist Palette" }, {
                    code: "1f3b0",
                    desc: "Slot Machine"
                }, { code: "1f682", desc: "Steam Locomotive" }, { code: "1f683", desc: "Railway Car" }, {
                    code: "1f684",
                    desc: "High-Speed Train"
                }, { code: "1f685", desc: "High-Speed Train with Bullet Nose" }, {
                    code: "1f686",
                    desc: "Train"
                }, { code: "1f687", desc: "Metro" }, { code: "1f688", desc: "Light Rail" }, {
                    code: "1f689",
                    desc: "Station"
                }, { code: "1f68a", desc: "Tram" }, { code: "1f69d", desc: "Monorail" }, {
                    code: "1f69e",
                    desc: "Mountain Railway"
                }, { code: "1f68b", desc: "Tram Car" }, { code: "1f68c", desc: "Bus" }, {
                    code: "1f68d",
                    desc: "Oncoming Bus"
                }, { code: "1f68e", desc: "Trolleybus" }, { code: "1f690", desc: "Minibus" }, {
                    code: "1f691",
                    desc: "Ambulance"
                }, { code: "1f692", desc: "Fire Engine" }, { code: "1f693", desc: "Police Car" }, {
                    code: "1f694",
                    desc: "Oncoming Police Car"
                }, { code: "1f695", desc: "Taxi" }, { code: "1f695", desc: "Oncoming Taxi" }, {
                    code: "1f697",
                    desc: "Automobile"
                }, { code: "1f698", desc: "Oncoming Automobile" }, {
                    code: "1f699",
                    desc: "Recreational Vehicle"
                }, { code: "1f69a", desc: "Delivery Truck" }, { code: "1f69b", desc: "Articulated Lorry" }, {
                    code: "1f69c",
                    desc: "Tractor"
                }, { code: "1f6b2", desc: "Bicycle" }, { code: "1f68f", desc: "Bus Stop" }, {
                    code: "26fd",
                    desc: "Fuel Pump"
                }, { code: "1f6a8", desc: "Police Cars Revolving Light" }, {
                    code: "1f6a5",
                    desc: "Horizontal Traffic Light"
                }, { code: "1f6a6", desc: "Vertical Traffic Light" }, {
                    code: "1f6a7",
                    desc: "Construction Sign"
                }, { code: "2693", desc: "Anchor" }, { code: "26f5", desc: "Sailboat" }, {
                    code: "1f6a4",
                    desc: "Speedboat"
                }, { code: "1f6a2", desc: "Ship" }, { code: "2708", desc: "Airplane" }, {
                    code: "1f4ba",
                    desc: "Seat"
                }, { code: "1f681", desc: "Helicopter" }, { code: "1f69f", desc: "Suspension Railway" }, {
                    code: "1f6a0",
                    desc: "Mountain Cableway"
                }, { code: "1f6a1", desc: "Aerial Tramway" }, { code: "1f680", desc: "Rocket" }, {
                    code: "1f6aa",
                    desc: "Door"
                }, { code: "1f6bd", desc: "Toilet" }, { code: "1f6bf", desc: "Shower" }, {
                    code: "1f6c1",
                    desc: "Bathtub"
                }, { code: "231b", desc: "Hourglass" }, { code: "23f3", desc: "Hourglass with Flowing Sand" }, {
                    code: "231a",
                    desc: "Watch"
                }, { code: "23f0", desc: "Alarm Clock" }, { code: "1f55b", desc: "Clock Face Twelve Oclock" }, {
                    code: "1f567",
                    desc: "Clock Face Twelve-Thirty"
                }, { code: "1f550", desc: "Clock Face One Oclock" }, {
                    code: "1f55c",
                    desc: "Clock Face One-thirty"
                }, { code: "1f551", desc: "Clock Face Two Oclock" }, {
                    code: "1f55d",
                    desc: "Clock Face Two-thirty"
                }, { code: "1f552", desc: "Clock Face Three Oclock" }, {
                    code: "1f55e",
                    desc: "Clock Face Three-thirty"
                }, { code: "1f553", desc: "Clock Face Four Oclock" }, {
                    code: "1f55f",
                    desc: "Clock Face Four-thirty"
                }, { code: "1f554", desc: "Clock Face Five Oclock" }, {
                    code: "1f560",
                    desc: "Clock Face Five-thirty"
                }, { code: "1f555", desc: "Clock Face Six Oclock" }, {
                    code: "1f561",
                    desc: "Clock Face Six-thirty"
                }, { code: "1f556", desc: "Clock Face Seven Oclock" }, {
                    code: "1f562",
                    desc: "Clock Face Seven-thirty"
                }, { code: "1f557", desc: "Clock Face Eight Oclock" }, {
                    code: "1f563",
                    desc: "Clock Face Eight-thirty"
                }, { code: "1f558", desc: "Clock Face Nine Oclock" }, {
                    code: "1f564",
                    desc: "Clock Face Nine-thirty"
                }, { code: "1f559", desc: "Clock Face Ten Oclock" }, {
                    code: "1f565",
                    desc: "Clock Face Ten-thirty"
                }, { code: "1f55a", desc: "Clock Face Eleven Oclock" }, {
                    code: "1f566",
                    desc: "Clock Face Eleven-thirty"
                }, { code: "1f311", desc: "New Moon Symbol" }, {
                    code: "1f312",
                    desc: "Waxing Crescent Moon Symbol"
                }, { code: "1f313", desc: "First Quarter Moon Symbol" }, {
                    code: "1f314",
                    desc: "Waxing Gibbous Moon Symbol"
                }, { code: "1f315", desc: "Full Moon Symbol" }, {
                    code: "1f316",
                    desc: "Waning Gibbous Moon Symbol"
                }, { code: "1f317", desc: "Last Quarter Moon Symbol" }, {
                    code: "1f318",
                    desc: "Waning Crescent Moon Symbol"
                }, { code: "1f319", desc: "Crescent Moon" }, { code: "1f31a", desc: "New Moon with Face" }, {
                    code: "1f31b",
                    desc: "First Quarter Moon with Face"
                }, { code: "1f31c", desc: "Last Quarter Moon with Face" }, {
                    code: "2600",
                    desc: "Black Sun with Rays"
                }, { code: "1f31d", desc: "Full Moon with Face" }, { code: "1f31e", desc: "Sun with Face" }, {
                    code: "2b50",
                    desc: "White Medium Star"
                }, { code: "1f31f", desc: "Glowing Star" }, { code: "1f320", desc: "Shooting Star" }, {
                    code: "2601",
                    desc: "Cloud"
                }, { code: "26c5", desc: "Sun Behind Cloud" }, { code: "1f300", desc: "Cyclone" }, {
                    code: "1f308",
                    desc: "Rainbow"
                }, { code: "1f302", desc: "Closed Umbrella" }, {
                    code: "2614",
                    desc: "Umbrella with Rain Drops"
                }, { code: "26a1", desc: "High Voltage Sign" }, { code: "2744", desc: "Snowflake" }, {
                    code: "2603",
                    desc: "Snowman Without Snow"
                }, { code: "1f525", desc: "Fire" }, { code: "1f4a7", desc: "Droplet" }, { code: "1F30A", desc: "Water Wave" }]
            }, {
                id: "objects",
                name: "Objects",
                code: "1F507",
                emoticons: [{ code: "1F507", desc: "Speaker with Cancellation Stroke" }, {
                    code: "1F508",
                    desc: "Speaker"
                }, { code: "1F509", desc: "Speaker with One Sound Wave" }, {
                    code: "1F50A",
                    desc: "Speaker with Three Sound Wave"
                }, { code: "1F4E2", desc: "Public Address Loudspeaker" }, {
                    code: "1F4E3",
                    desc: "Cheering Megaphone"
                }, { code: "1F4EF", desc: "Postal Horn" }, { code: "1F514", desc: "Bell" }, {
                    code: "1F515",
                    desc: "Bell with Cancellation Stroke"
                }, { code: "1F3BC", desc: "Musical Score" }, { code: "1F3B5", desc: "Musical Note" }, {
                    code: "1F3B6",
                    desc: "Multiple Musical Notes"
                }, { code: "1F3A4", desc: "Microphone" }, { code: "1F3A7", desc: "Headphone" }, {
                    code: "1F4FB",
                    desc: "Radio"
                }, { code: "1F3B7", desc: "Saxophone" }, { code: "1F3B8", desc: "Guitar" }, {
                    code: "1F3B9",
                    desc: "Musical Keyboard"
                }, { code: "1F3BA", desc: "Trumpet" }, { code: "1F3BB", desc: "Violin" }, {
                    code: "1F4F1",
                    desc: "Mobile Phone"
                }, { code: "1F4F2", desc: "Mobile Phone with Rightwards Arrow at Left" }, {
                    code: "260E",
                    desc: "Black Telephone"
                }, { code: "1F4DE", desc: "Telephone Receiver" }, { code: "1F4DF", desc: "Pager" }, {
                    code: "1F4E0",
                    desc: "Fax Machine"
                }, { code: "1F50B", desc: "Battery" }, { code: "1F50C", desc: "Electric Plug" }, {
                    code: "1F4BB",
                    desc: "Personal Computer"
                }, { code: "1F4BD", desc: "Minidisc" }, { code: "1F4BE", desc: "Floppy Disk" }, {
                    code: "1F4BF",
                    desc: "Optical Disk"
                }, { code: "1F4C0", desc: "Dvd" }, { code: "1F3A5", desc: "Movie Camera" }, {
                    code: "1F3AC",
                    desc: "Clapper Board"
                }, { code: "1F4FA", desc: "Television" }, { code: "1F4F7", desc: "Camera" }, {
                    code: "1F4F9",
                    desc: "Video Camera"
                }, { code: "1F4FC", desc: "Videocassette" }, {
                    code: "1F50D",
                    desc: "Left-Pointing Magnifying Glass"
                }, { code: "1F50E", desc: "Right-Pointing Magnifying Glass" }, {
                    code: "1F52C",
                    desc: "Microscope"
                }, { code: "1F52D", desc: "Telelscope" }, { code: "1F4E1", desc: "Satellite Antenna" }, {
                    code: "1F4A1",
                    desc: "Electric Light Bulb"
                }, { code: "1F526", desc: "Electric Torch" }, { code: "1F3EE", desc: "Izakaya Lantern" }, {
                    code: "1F4D4",
                    desc: "Notebook with Decorative Cover"
                }, { code: "1F4D5", desc: "Closed Book" }, { code: "1F4D6", desc: "Open Book" }, {
                    code: "1F4D7",
                    desc: "Green Book"
                }, { code: "1F4D8", desc: "Blue Book" }, { code: "1F4D9", desc: "Orange Book" }, {
                    code: "1F4DA",
                    desc: "Books"
                }, { code: "1F4D3", desc: "Notebook" }, { code: "1F4D2", desc: "Ledger" }, {
                    code: "1F4C3",
                    desc: "Curl"
                }, { code: "1F4DC", desc: "Scroll" }, { code: "1F4C4", desc: "Page Facing Up" }, {
                    code: "1F4F0",
                    desc: "Newspaper"
                }, { code: "1F4D1", desc: "Bookmark Tabs" }, { code: "1F516", desc: "Bookmark" }, {
                    code: "1F4B0",
                    desc: "Money Bag"
                }, { code: "1F4B4", desc: "Banknote with Yen Sign" }, {
                    code: "1F4B5",
                    desc: "Banknote with Dollar Sign"
                }, { code: "1F4B6", desc: "Banknote with Euro Sign" }, {
                    code: "1F4B7",
                    desc: "Banknote with Pound Sign"
                }, { code: "1F4B8", desc: "Money with Wings" }, { code: "1F4B3", desc: "Credit Card" }, {
                    code: "1F4B9",
                    desc: "Chart with Upwards Trend and Yen Sign"
                }, { code: "1F4B1", desc: "Currency Exchange" }, { code: "1F4B2", desc: "Heavy Dollar Sign" }, {
                    code: "2709",
                    desc: "Envelope"
                }, { code: "1F4E7", desc: "E-Mail Symbol" }, { code: "1F4E8", desc: "Incoming Envelope" }, {
                    code: "1F4E9",
                    desc: "Envelope with Downwards Arrow Above"
                }, { code: "1F4E4", desc: "Outbox Tray" }, { code: "1F4E5", desc: "Inbox Tray" }, {
                    code: "1F4E6",
                    desc: "Package"
                }, { code: "1F4BE", desc: "Closed Mailbox with Raised Flag" }, {
                    code: "1F4EA",
                    desc: "Closed Mailbox with Lowered Flag"
                }, { code: "1F4EC", desc: "Open Mailbox with Raised Flag" }, {
                    code: "1F4ED",
                    desc: "Open Mailbox with Lowered Flag"
                }, { code: "1F5F3", desc: "Postbox" }, { code: "270F", desc: "Pencil" }, {
                    code: "2712",
                    desc: "Black Nib"
                }, { code: "1F4DD", desc: "Memo" }, { code: "1F4BC", desc: "Briefcase" }, {
                    code: "1F4C1",
                    desc: "File Folder"
                }, { code: "1F4C2", desc: "Open File Folder" }, { code: "1F4C5", desc: "Calender" }, {
                    code: "1F4C6",
                    desc: "Tear-off Calender"
                }, { code: "1F4C7", desc: "Card Index" }, { code: "1F4C8", desc: "Chart with Upwards Trend" }, {
                    code: "1F4C9",
                    desc: "Chart with Downwards Trend"
                }, { code: "1F4CA", desc: "Bar Chart" }, { code: "1F4CB", desc: "Clipboard" }, {
                    code: "1F4CC",
                    desc: "Pushpin"
                }, { code: "1F4CD", desc: "Round Pushpin" }, { code: "1F4CE", desc: "Paperclip" }, {
                    code: "1F4CF",
                    desc: "Straight Ruler"
                }, { code: "1F4D0", desc: "Triangular Ruler" }, { code: "2702", desc: "Black Scissors" }, {
                    code: "1F512",
                    desc: "Lock"
                }, { code: "1F513", desc: "Open Lock" }, { code: "1F50F", desc: "Lock with Ink Pen" }, {
                    code: "1F510",
                    desc: "Closed Lock with Key"
                }, { code: "1F511", desc: "Key" }, { code: "1F528", desc: "Hammer" }, {
                    code: "1F52B",
                    desc: "Pistol"
                }, { code: "1F527", desc: "Wrench" }, { code: "1F529", desc: "Nut and Bolt" }, {
                    code: "1F517",
                    desc: "Link Symbol"
                }, { code: "1F489", desc: "Syringe" }, { code: "1F48A", desc: "Pill" }, {
                    code: "1F6AC",
                    desc: "Smoking Symbol"
                }, { code: "1F5FF", desc: "Moyai" }, { code: "1F52E", desc: "Crystal Ball" }]
            }, {
                id: "symbols",
                name: "Symbols",
                code: "1F3E7",
                emoticons: [{ code: "1F3E7", desc: "Automated Teller Machine" }, {
                    code: "1F6AE",
                    desc: "Put Litter in Its Place Symbol"
                }, { code: "1F6B0", desc: "Potable Water Symbol" }, { code: "267F", desc: "Wheelchair Symbol" }, {
                    code: "1F6B9",
                    desc: "Mens Symbol"
                }, { code: "1F6BA", desc: "Womens Symbol" }, { code: "1F6BB", desc: "Restroom" }, {
                    code: "1F6BC",
                    desc: "Baby Symbol"
                }, { code: "1F6BE", desc: "Water Closet" }, { code: "1F6C2", desc: "Passport Control" }, {
                    code: "1F6C3",
                    desc: "Customs"
                }, { code: "1F6C4", desc: "Baggage Claim" }, { code: "1F6C5", desc: "Left Luggage" }, {
                    code: "26A0",
                    desc: "Warning Sign"
                }, { code: "1F6B8", desc: "Children Crossing" }, { code: "26D4", desc: "No Entry" }, {
                    code: "1F6AB",
                    desc: "No Entry Sign"
                }, { code: "1F6B3", desc: "No Bicycles" }, { code: "1F6AD", desc: "No Smoking Symbol" }, {
                    code: "1F6AF",
                    desc: "Do Not Litter Symbol"
                }, { code: "1F6B1", desc: "Non-Potable Water Symbol" }, {
                    code: "1F6B7",
                    desc: "No Pedestrians"
                }, { code: "1F4F5", desc: "No Mobile Phones" }, {
                    code: "1F51E",
                    desc: "No One Under Eighteen Symbol"
                }, { code: "2B06", desc: "Upwards Black Arrow" }, { code: "2197", desc: "North East Arrow" }, {
                    code: "27A1",
                    desc: "Black Rightwards Arrow"
                }, { code: "2198", desc: "South East Arrow" }, { code: "2B07", desc: "Downwards Black Arrow" }, {
                    code: "2199",
                    desc: "South West Arrow"
                }, { code: "2B05", desc: "Leftwards Black Arrow" }, { code: "2196", desc: "North West Arrow" }, {
                    code: "2195",
                    desc: "Up Down Arrow"
                }, { code: "2194", desc: "Left Right Arrow" }, {
                    code: "21A9",
                    desc: "Leftwards Arrow with Hook"
                }, { code: "21AA", desc: "Rightwards Arrow with Hook" }, {
                    code: "2934",
                    desc: "Arrow Pointing Rightwards Then Curving Upwards"
                }, { code: "2935", desc: "Arrow Pointing Rightwards Then Curving Downwards" }, {
                    code: "1F503",
                    desc: "Clockwise Downwards and Upwards Open Circle Arrows"
                }, { code: "1F504", desc: "Anticlockwise Downwards and Upwards Open Circle Arrows" }, {
                    code: "1F519",
                    desc: "Back with Leftwards Arrow Above"
                }, { code: "1F51A", desc: "End with Leftwards Arrow Above" }, {
                    code: "1F51B",
                    desc: "On with Exclamation Mark with Left Right Arrow Above"
                }, { code: "1F51C", desc: "Soon with Rightwards Arrow Above" }, {
                    code: "1F51D",
                    desc: "Top with Upwards Arrow Above"
                }, { code: "1F52F", desc: "Six Pointed Star with Middle Dot" }, { code: "2648", desc: "Aries" }, {
                    code: "2649",
                    desc: "Taurus"
                }, { code: "264A", desc: "Gemini" }, { code: "264B", desc: "Cancer" }, {
                    code: "264C",
                    desc: "Leo"
                }, { code: "264D", desc: "Virgo" }, { code: "264E", desc: "Libra" }, {
                    code: "264F",
                    desc: "Scorpius"
                }, { code: "2650", desc: "Sagittarius" }, { code: "2651", desc: "Capricorn" }, {
                    code: "2652",
                    desc: "Aquarius"
                }, { code: "2653", desc: "Pisces" }, { code: "26CE", desc: "Ophiuchus" }, {
                    code: "1F500",
                    desc: "Twisted Rightwards Arrows"
                }, { code: "1F501", desc: "Clockwise Rightwards and Leftwards Open Circle Arrows" }, {
                    code: "1F502",
                    desc: "Clockwise Rightwards and Leftwards Open Circle Arrows with Circled One Overlay"
                }, { code: "25B6", desc: "Black Right-Pointing Triangle" }, {
                    code: "23E9",
                    desc: "Black Right-Pointing Double Triangle"
                }, { code: "25C0", desc: "Black Left-Pointing Triangle" }, {
                    code: "23EA",
                    desc: "Black Left-Pointing Double Triangle"
                }, { code: "1F53C", desc: "Up-Pointing Small Red Triangle" }, {
                    code: "23EB",
                    desc: "Black Up-Pointing Double Triangle"
                }, { code: "1F53D", desc: "Down-Pointing Small Red Triangle" }, {
                    code: "23EC",
                    desc: "Black Down-Pointing Double Triangle"
                }, { code: "1F3A6", desc: "Cinema" }, { code: "1F505", desc: "Low Brightness Symbol" }, {
                    code: "1F506",
                    desc: "High Brightness Symbol"
                }, { code: "1F4F6", desc: "Antenna with Bars" }, { code: "1F4F3", desc: "Vibration Mode" }, {
                    code: "1F4F4",
                    desc: "Mobile Phone off"
                }, { code: "267B", desc: "Black Universal Recycling Symbol" }, {
                    code: "1F531",
                    desc: "Trident Emblem"
                }, { code: "1F4DB", desc: "Name Badge" }, {
                    code: "1F530",
                    desc: "Japanese Symbol for Beginner"
                }, { code: "2B55", desc: "Heavy Large Circle" }, {
                    code: "2705",
                    desc: "White Heavy Check Mark"
                }, { code: "2611", desc: "Ballot Box with Check" }, { code: "2714", desc: "Heavy Check Mark" }, {
                    code: "2716",
                    desc: "Heavy Multiplication X"
                }, { code: "274C", desc: "Cross Mark" }, { code: "274E", desc: "Negative Squared Cross Mark" }, {
                    code: "2795",
                    desc: "Heavy Plus Sign"
                }, { code: "2796", desc: "Heavy Minus Sign" }, { code: "2797", desc: "Heavy Division Sign" }, {
                    code: "27B0",
                    desc: "Curly Loop"
                }, { code: "27BF", desc: "Double Curly Loop" }, { code: "303D", desc: "Part Alternation Mark" }, {
                    code: "2733",
                    desc: "Eight Spoked Asterisk"
                }, { code: "2734", desc: "Eight Pointed Black Star" }, { code: "2747", desc: "Sparkle" }, {
                    code: "203C",
                    desc: "Double Exclamation Mark"
                }, { code: "2049", desc: "Exclamation Question Mark" }, {
                    code: "2753",
                    desc: "Black Question Mark Ornament"
                }, { code: "2754", desc: "White Question Mark Ornament" }, {
                    code: "2755",
                    desc: "White Exclamation Mark Ornament"
                }, { code: "2757", desc: "Heavy Exclamation Mark Symbol" }, { code: "3030", desc: "Wavy Dash" }, {
                    code: "2122",
                    desc: "Trade Mark Sign"
                }, { code: "1F51F", desc: "Keycap Ten" }, { code: "1F4AF", desc: "Hundred Points Symbol" }, {
                    code: "1F520",
                    desc: "Input Symbol for Latin Capital Letters"
                }, { code: "1F521", desc: "Input Symbol for Latin Small Letters" }, {
                    code: "1F522",
                    desc: "Input Symbol for Numbers"
                }, { code: "1F523", desc: "Input Symbol for Symbols" }, {
                    code: "1F524",
                    desc: "Input Symbol for Latin Letters"
                }, { code: "1F170", desc: "Negative Squared Latin Capital Letter a" }, {
                    code: "1F18E",
                    desc: "Negative Squared Ab"
                }, { code: "1F171", desc: "Negative Squared Latin Capital Letter B" }, {
                    code: "1F191",
                    desc: "Squared Cl"
                }, { code: "1F192", desc: "Squared Cool" }, { code: "1F193", desc: "Squared Free" }, {
                    code: "2139",
                    desc: "Information Source"
                }, { code: "1F194", desc: "Squared Id" }, {
                    code: "24C2",
                    desc: "Circled Latin Capital Letter M"
                }, { code: "1F195", desc: "Squared New" }, { code: "1F196", desc: "Squared Ng" }, {
                    code: "1F17E",
                    desc: "Negative Squared Latin Capital Letter O"
                }, { code: "1F197", desc: "Squared Ok" }, {
                    code: "1F17F",
                    desc: "Negative Squared Latin Capital Letter P"
                }, { code: "1F198", desc: "Squared Sos" }, {
                    code: "1F199",
                    desc: "Squared Up with Exclamation Mark"
                }, { code: "1F19A", desc: "Squared Vs" }, { code: "1F201", desc: "Squared Katakana Koko" }, {
                    code: "1F202",
                    desc: "Squared Katakana Sa"
                }, { code: "1F237", desc: "Squared Cjk Unified Ideograph-6708" }, {
                    code: "1F236",
                    desc: "Squared Cjk Unified Ideograph-6709"
                }, { code: "1F22F", desc: "Squared Cjk Unified Ideograph-6307" }, {
                    code: "1F250",
                    desc: "Circled Ideograph Advantage"
                }, { code: "1F239", desc: "Squared Cjk Unified Ideograph-5272" }, {
                    code: "1F21A",
                    desc: "Squared Cjk Unified Ideograph-7121"
                }, { code: "1F232", desc: "Squared Cjk Unified Ideograph-7981" }, {
                    code: "1F251",
                    desc: "Circled Ideograph Accept"
                }, { code: "1F238", desc: "Squared Cjk Unified Ideograph-7533" }, {
                    code: "1F234",
                    desc: "Squared Cjk Unified Ideograph-5408"
                }, { code: "1F233", desc: "Squared Cjk Unified Ideograph-7a7a" }, {
                    code: "3297",
                    desc: "Circled Ideograph Congratulation"
                }, { code: "3299", desc: "Circled Ideograph Secret" }, {
                    code: "1F23A",
                    desc: "Squared Cjk Unified Ideograph-55b6"
                }, { code: "1F235", desc: "Squared Cjk Unified Ideograph-6e80" }, {
                    code: "25AA",
                    desc: "Black Small Square"
                }, { code: "25AB", desc: "White Small Square" }, { code: "25FB", desc: "White Medium Square" }, {
                    code: "25FC",
                    desc: "Black Medium Square"
                }, { code: "25FD", desc: "White Medium Small Square" }, {
                    code: "25FE",
                    desc: "Black Medium Small Square"
                }, { code: "2B1B", desc: "Black Large Square" }, { code: "2B1C", desc: "White Large Square" }, {
                    code: "1F536",
                    desc: "Large Orange Diamond"
                }, { code: "1F537", desc: "Large Blue Diamond" }, {
                    code: "1F538",
                    desc: "Small Orange Diamond"
                }, { code: "1F539", desc: "Small Blue Diamond" }, {
                    code: "1F53A",
                    desc: "Up-Pointing Red Triangle"
                }, { code: "1F53B", desc: "Down-Pointing Red Triangle" }, {
                    code: "1F4A0",
                    desc: "Diamond Shape with a Dot Inside"
                }, { code: "1F518", desc: "Radio Button" }, { code: "1F532", desc: "Black Square Button" }, {
                    code: "1F533",
                    desc: "White Square Button"
                }, { code: "26AA", desc: "Medium White Circle" }, { code: "26AB", desc: "Medium Black Circle" }, {
                    code: "1F534",
                    desc: "Large Red Circle"
                }, { code: "1F535", desc: "Large Blue Circle" }]
            }, {
                id: "flags",
                name: "Flags",
                code: "1F3C1",
                emoticons: [{ code: "1f3c1", desc: "Chequered Flag" }, {
                    code: "1f1e8-1f1f3",
                    desc: "China Flag"
                }, { code: "1f38c", desc: "Crossed Flags" }, {
                    code: "1f1e9-1f1ea",
                    desc: "Germany Flag"
                }, { code: "1f1ea-1f1f8", desc: "Spain Flag" }, {
                    code: "1f1e6-1f1e8",
                    desc: "Ascension Island Flag"
                }, { code: "1f1e6-1f1e9", desc: "Andorra Flag" }, {
                    code: "1f1e6-1f1ea",
                    desc: "United Arab Emirates Flag"
                }, { code: "1f1e6-1f1eb", desc: "Afghanistan Flag" }, {
                    code: "1f1e6-1f1ec",
                    desc: "Antigua & Barbuda Flag"
                }, { code: "1f1e6-1f1ee", desc: "Anguilla Flag" }, {
                    code: "1f1e6-1f1f1",
                    desc: "Albania Flag"
                }, { code: "1f1e6-1f1f2", desc: "Armenia Flag" }, {
                    code: "1f1e6-1f1f4",
                    desc: "Angola Flag"
                }, { code: "1f1e6-1f1f6", desc: "Antarctica Flag" }, {
                    code: "1f1e6-1f1f7",
                    desc: "Argentina Flag"
                }, { code: "1f1e6-1f1f8", desc: "American Samoa Flag" }, {
                    code: "1f1e6-1f1f9",
                    desc: "Austria Flag"
                }, { code: "1f1e6-1f1fa", desc: "Australia Flag" }, {
                    code: "1f1e6-1f1fc",
                    desc: "Aruba Flag"
                }, { code: "1f1e6-1f1fd", desc: "\xc5land Islands Flag" }, {
                    code: "1f1e6-1f1ff",
                    desc: "Azerbaijan Flag"
                }, { code: "1f1e7-1f1e7", desc: "Barbados Flag" }, {
                    code: "1f1e7-1f1e9",
                    desc: "Bangladesh Flag"
                }, { code: "1f1e7-1f1ea", desc: "Belgium Flag" }, {
                    code: "1f1e7-1f1eb",
                    desc: "Burkina Faso Flag"
                }, { code: "1f1e7-1f1ec", desc: "Bulgaria Flag" }, {
                    code: "1f1e7-1f1ed",
                    desc: "Bahrain Flag"
                }, { code: "1f1e7-1f1ee", desc: "Burundi Flag" }, {
                    code: "1f1e7-1f1ef",
                    desc: "Benin Flag"
                }, { code: "1f1e7-1f1f1", desc: "St. Barth\xe9lemy Flag" }, {
                    code: "1f1e7-1f1f2",
                    desc: "Bermuda Flag"
                }, { code: "1f1e7-1f1f4", desc: "Bolivia Flag" }, {
                    code: "1f1e7-1f1f6",
                    desc: "Caribbean Netherlands Flag"
                }, { code: "1f1e7-1f1f7", desc: "Brazil Flag" }, {
                    code: "1f1e7-1f1f8",
                    desc: "Bahamas Flag"
                }, { code: "1f1e7-1f1f9", desc: "Bhutan Flag" }, {
                    code: "1f1e7-1f1fb",
                    desc: "Bouvet Island Flag"
                }, { code: "1f1e7-1f1fc", desc: "Botswana Flag" }, {
                    code: "1f1e7-1f1fe",
                    desc: "Belarus Flag"
                }, { code: "1f1e7-1f1ff", desc: "Belize Flag" }, {
                    code: "1f1e8-1f1e6",
                    desc: "Canada Flag"
                }, { code: "1f1e8-1f1e8", desc: "Cocos (keeling) Islands Flag" }, {
                    code: "1f1e8-1f1e9",
                    desc: "Congo - Kinshasa Flag"
                }, { code: "1f1e8-1f1eb", desc: "Central African Republic Flag" }, {
                    code: "1f1e8-1f1ec",
                    desc: "Congo - Brazzaville Flag"
                }, { code: "1f1e8-1f1ed", desc: "Switzerland Flag" }, {
                    code: "1f1e8-1f1ee",
                    desc: "C\xf4te D\u2019ivoire Flag"
                }, { code: "1f1e8-1f1f0", desc: "Cook Islands Flag" }, {
                    code: "1f1e8-1f1f1",
                    desc: "Chile Flag"
                }, { code: "1f1e8-1f1f2", desc: "Cameroon Flag" }, {
                    code: "1f1e8-1f1f4",
                    desc: "Colombia Flag"
                }, { code: "1f1e8-1f1f7", desc: "Costa Rica Flag" }, {
                    code: "1f1e8-1f1fa",
                    desc: "Cuba Flag"
                }, { code: "1f1e8-1f1fb", desc: "Cape Verde Flag" }, {
                    code: "1f1e8-1f1fc",
                    desc: "Cura\xe7ao Flag"
                }, { code: "1f1e8-1f1fd", desc: "Christmas Island Flag" }, {
                    code: "1f1e8-1f1fe",
                    desc: "Cyprus Flag"
                }, { code: "1f1e8-1f1ff", desc: 'Czechia Flag"' }, {
                    code: "1f1e9-1f1ec",
                    desc: "Diego Garcia Flag"
                }, { code: "1f1e9-1f1ef", desc: "Djibouti Flag" }, {
                    code: "1f1e9-1f1f0",
                    desc: "Denmark Flag"
                }, { code: "1f1e9-1f1f2", desc: "Dominica Flag" }, {
                    code: "1f1e9-1f1f4",
                    desc: "Dominican Republic Flag"
                }, { code: "1f1e9-1f1ff", desc: "Algeria Flag" }, {
                    code: "1f1ea-1f1e6",
                    desc: "Ceuta & Melilla Flag"
                }, { code: "1f1ea-1f1e8", desc: "Ecuador Flag" }, {
                    code: "1f1ea-1f1ea",
                    desc: "Estonia Flag"
                }, { code: "1f1ea-1f1ec", desc: "Egypt Flag" }, {
                    code: "1f1ea-1f1ed",
                    desc: "Western Sahara Flag"
                }, { code: "1f1ea-1f1f7", desc: "Eritrea Flag" }, {
                    code: "1f1ea-1f1f9",
                    desc: "Ethiopia Flag"
                }, { code: "1f1ea-1f1fa", desc: "European Union Flag" }, {
                    code: "1f1eb-1f1ee",
                    desc: "Finland Flag"
                }, { code: "1f1eb-1f1ef", desc: "Fiji Flag" }, {
                    code: "1f1eb-1f1f0",
                    desc: "Falkland Islands Flag"
                }, { code: "1f1eb-1f1f2", desc: "Micronesia Flag" }, {
                    code: "1f1eb-1f1f4",
                    desc: "Faroe Islands Flag"
                }, { code: "1f1ec-1f1e6", desc: "Gabon Flag" }, {
                    code: "1f1ec-1f1e9",
                    desc: "Grenada Flag"
                }, { code: "1f1ec-1f1ea", desc: "Georgia Flag" }, {
                    code: "1f1ec-1f1eb",
                    desc: "French Guiana Flag"
                }, { code: "1f1ec-1f1ec", desc: "Guernsey Flag" }, {
                    code: "1f1ec-1f1ed",
                    desc: "Ghana Flag"
                }, { code: "1f1ec-1f1ee", desc: "Gibraltar Flag" }, {
                    code: "1f1ec-1f1f1",
                    desc: "Greenland Flag"
                }, { code: "1f1ec-1f1f2", desc: "Gambia Flag" }, {
                    code: "1f1ec-1f1f3",
                    desc: "Guinea Flag"
                }, { code: "1f1ec-1f1f5", desc: "Guadeloupe Flag" }, {
                    code: "1f1ec-1f1f6",
                    desc: "Equatorial Guinea Flag"
                }, { code: "1f1ec-1f1f7", desc: "Greece Flag" }, {
                    code: "1f1ec-1f1f8",
                    desc: "South Georgia & South Sandwich Islands Flag"
                }, { code: "1f1ec-1f1f9", desc: "Guatemala Flag" }, {
                    code: "1f1ec-1f1fa",
                    desc: "Guam Flag"
                }, { code: "1f1ec-1f1fc", desc: "Guinea-Bissau Flag" }, {
                    code: "1f1ec-1f1fe",
                    desc: "Guyana Flag"
                }, { code: "1f1ed-1f1f0", desc: "Hong Kong Sar China Flag" }, {
                    code: "1f1ed-1f1f2",
                    desc: "Heard & Mcdonald Islands Flag"
                }, { code: "1f1ed-1f1f3", desc: "Honduras Flag" }, {
                    code: "1f1ed-1f1f7",
                    desc: "Croatia Flag"
                }, { code: "1f1ed-1f1f9", desc: "Haiti Flag" }, {
                    code: "1f1ed-1f1fa",
                    desc: "Hungary Flag"
                }, { code: "1f1ee-1f1e8", desc: "Canary Islands Flag" }, {
                    code: "1f1ee-1f1e9",
                    desc: "Indonesia Flag"
                }, { code: "1f1ee-1f1ea", desc: "Ireland Flag" }, {
                    code: "1f1ee-1f1f1",
                    desc: "Israel Flag"
                }, { code: "1f1ee-1f1f2", desc: "Isle of Man Flag" }, {
                    code: "1f1ee-1f1f3",
                    desc: "India Flag"
                }, { code: "1f1ee-1f1f4", desc: "British Indian Ocean Territory Flag" }, {
                    code: "1f1ee-1f1f6",
                    desc: "Iraq Flag"
                }, { code: "1f1ee-1f1f7", desc: "Iran Flag" }, {
                    code: "1f1ee-1f1f8",
                    desc: "Iceland Flag"
                }, { code: "1f1ef-1f1ea", desc: "Jersey Flag" }, {
                    code: "1f1ef-1f1f2",
                    desc: "Jamaica Flag"
                }, { code: "1f1ef-1f1f4", desc: "Jordan Flag" }, {
                    code: "1f1f0-1f1ea",
                    desc: "Kenya Flag"
                }, { code: "1f1f0-1f1ec", desc: "Kyrgyzstan Flag" }, {
                    code: "1f1f0-1f1ed",
                    desc: "Cambodia Flag"
                }, { code: "1f1f0-1f1ee", desc: "Kiribati Flag" }, {
                    code: "1f1f0-1f1f2",
                    desc: "Comoros Flag"
                }, { code: "1f1f0-1f1f3", desc: "St. Kitts & Nevis Flag" }, {
                    code: "1f1f0-1f1f5",
                    desc: "North Korea Flag"
                }, { code: "1f1f0-1f1fc", desc: "Kuwait Flag" }, {
                    code: "1f1f0-1f1fe",
                    desc: "Cayman Islands Flag"
                }, { code: "1f1f0-1f1ff", desc: "Kazakhstan Flag" }, {
                    code: "1f1f1-1f1e6",
                    desc: "Laos Flag"
                }, { code: "1f1f1-1f1e7", desc: "Lebanon Flag" }, {
                    code: "1f1f1-1f1e8",
                    desc: "St. Lucia Flag"
                }, { code: "1f1f1-1f1ee", desc: "Liechtenstein Flag" }, {
                    code: "1f1f1-1f1f0",
                    desc: "Sri Lanka Flag"
                }, { code: "1f1f1-1f1f7", desc: "Liberia Flag" }, {
                    code: "1f1f1-1f1f8",
                    desc: "Lesotho Flag"
                }, { code: "1f1f1-1f1f9", desc: "Lithuania Flag" }, {
                    code: "1f1f1-1f1fa",
                    desc: "Luxembourg Flag"
                }, { code: "1f1f1-1f1fb", desc: "Latvia Flag" }, {
                    code: "1f1f1-1f1fe",
                    desc: "Libya Flag"
                }, { code: "1f1f2-1f1e6", desc: "Morocco Flag" }, {
                    code: "1f1f2-1f1e8",
                    desc: "Monaco Flag"
                }, { code: "1f1f2-1f1e9", desc: "Moldova Flag" }, {
                    code: "1f1f2-1f1ea",
                    desc: "Montenegro Flag"
                }, { code: "1f1f2-1f1eb", desc: "St. Martin Flag" }, {
                    code: "1f1f2-1f1ec",
                    desc: "Madagascar Flag"
                }, { code: "1f1f2-1f1ed", desc: "Marshall Islands Flag" }, {
                    code: "1f1f2-1f1f0",
                    desc: "Macedonia Flag"
                }, { code: "1f1f2-1f1f1", desc: "Mali Flag" }, {
                    code: "1f1f2-1f1f2",
                    desc: "Myanmar (burma) Flag"
                }, { code: "1f1f2-1f1f3", desc: "Mongolia Flag" }, {
                    code: "1f1f2-1f1f4",
                    desc: "Macau Sar China Flag"
                }, { code: "1f1f2-1f1f5", desc: "Northern Mariana Islands Flag" }, {
                    code: "1f1f2-1f1f6",
                    desc: "Martinique Flag"
                }, { code: "1f1f2-1f1f7", desc: "Mauritania Flag" }, {
                    code: "1f1f2-1f1f8",
                    desc: "Montserrat Flag"
                }, { code: "1f1f2-1f1f9", desc: "Malta Flag" }, {
                    code: "1f1f2-1f1fa",
                    desc: "Mauritius Flag"
                }, { code: "1f1f2-1f1fb", desc: "Maldives Flag" }, {
                    code: "1f1f2-1f1fc",
                    desc: "Malawi Flag"
                }, { code: "1f1f2-1f1fd", desc: "Mexico Flag" }, {
                    code: "1f1f2-1f1fe",
                    desc: "Malaysia Flag"
                }, { code: "1f1f2-1f1ff", desc: "Mozambique Flag" }, {
                    code: "1f1f3-1f1e6",
                    desc: "Namibia Flag"
                }, { code: "1f1f3-1f1e8", desc: "New Caledonia Flag" }, {
                    code: "1f1f3-1f1ea",
                    desc: "Niger Flag"
                }, { code: "1f1f3-1f1eb", desc: "Norfolk Island Flag" }, {
                    code: "1f1f3-1f1ec",
                    desc: "Nigeria Flag"
                }, { code: "1f1f3-1f1ee", desc: "Nicaragua Flag" }, {
                    code: "1f1f3-1f1f1",
                    desc: "Netherlands Flag"
                }, { code: "1f1f3-1f1f4", desc: "Norway Flag" }, {
                    code: "1f1f3-1f1f5",
                    desc: "Nepal Flag"
                }, { code: "1f1f3-1f1f7", desc: "Nauru Flag" }, {
                    code: "1f1f3-1f1fa",
                    desc: "Niue Flag"
                }, { code: "1f1f3-1f1ff", desc: "New Zealand Flag" }, {
                    code: "1f1f4-1f1f2",
                    desc: "Oman Flag"
                }, { code: "1f1f8-1f1ff", desc: "Swaziland Flag" }, {
                    code: "1f1f5-1f1e6",
                    desc: "Panama Flag"
                }, { code: "1f1f5-1f1ea", desc: "Peru Flag" }, {
                    code: "1f1f5-1f1eb",
                    desc: "French Polynesia Flag"
                }, { code: "1f1f5-1f1ec", desc: "Papua New Guinea Flag" }, {
                    code: "1f1f5-1f1ed",
                    desc: "Philippines Flag"
                }, { code: "1f1f5-1f1f0", desc: "Pakistan Flag" }, {
                    code: "1f1f5-1f1f1",
                    desc: "Poland Flag"
                }, { code: "1f1f5-1f1f2", desc: "St. Pierre & Miquelon  Flag" }, {
                    code: "1f1f5-1f1f3",
                    desc: "Pitcairn Islands Flag"
                }, { code: "1f1f5-1f1f7", desc: "Puerto Rico Flag" }, {
                    code: "1f1f5-1f1f8",
                    desc: "Palestinian Territories Flag"
                }, { code: "1f1f5-1f1f9", desc: "Portugal Flag" }, {
                    code: "1f1f5-1f1fc",
                    desc: "Palau Flag"
                }, { code: "1f1f5-1f1fe", desc: "Paraguay Flag" }, {
                    code: "1f1f6-1f1e6",
                    desc: "Qatar Flag"
                }, { code: "1f1f7-1f1ea", desc: "R\xe9union Flag" }, {
                    code: "1f1f7-1f1f4",
                    desc: "Romania Flag"
                }, { code: "1f1f7-1f1f8", desc: "Serbia Flag" }, {
                    code: "1f1f7-1f1fc",
                    desc: "Rwanda Flag"
                }, { code: "1f1f8-1f1e6", desc: "Saudi Arabia Flag" }, {
                    code: "1f1f8-1f1e7",
                    desc: "Solomon Islands Flag"
                }, { code: "1f1f8-1f1e8", desc: "Seychelles Flag" }, {
                    code: "1f1f8-1f1e9",
                    desc: "Sudan Flag"
                }, { code: "1f1f8-1f1ea", desc: "Sweden Flag" }, {
                    code: "1f1f8-1f1ec",
                    desc: "Singapore Flag"
                }, { code: "1f1f8-1f1ee", desc: "Slovenia Flag" }, {
                    code: "1f1f8-1f1ed",
                    desc: "St. Helena  Flag"
                }, { code: "1f1f8-1f1ef", desc: "Svalbard & Jan Mayen  Flag" }, {
                    code: "1f1f8-1f1f1",
                    desc: "Sierra Leone Flag"
                }, { code: "1f1f8-1f1f2", desc: "San Marino Flag" }, {
                    code: "1f1f8-1f1f3",
                    desc: "Senegal Flag"
                }, { code: "1f1f8-1f1f4", desc: "Somalia Flag" }, {
                    code: "1f1f8-1f1f7",
                    desc: "Suriname Flag"
                }, { code: "1f1f8-1f1f8", desc: "South Sudan  Flag" }, {
                    code: "1f1f8-1f1f9",
                    desc: "S\xe3o Tom\xe9 & Pr\xedncipe Flag"
                }, { code: "1f1f8-1f1fb", desc: "El Salvador Flag" }, {
                    code: "1f1f8-1f1fd",
                    desc: "Sint Maarten Flag"
                }, { code: "1f1f8-1f1fe", desc: "Syria Flag" }, {
                    code: "1f1f9-1f1e6",
                    desc: "Tristan Da Cunha Flag"
                }, { code: "1f1f9-1f1e8", desc: "Turks & Caicos Islands  Flag" }, {
                    code: "1f1f9-1f1eb",
                    desc: "French Southern Territories Flag"
                }, { code: "1f1f9-1f1ec", desc: "Togo Flag" }, {
                    code: "1f1f9-1f1ed",
                    desc: "Thailand Flag"
                }, { code: "1f1f9-1f1ef", desc: "Tajikistan Flag" }, {
                    code: "1f1f9-1f1f0",
                    desc: "Tokelau Flag"
                }, { code: "1f1f9-1f1f1", desc: "Timor-Leste Flag" }, {
                    code: "1f1f9-1f1f2",
                    desc: "Turkmenistan Flag"
                }, { code: "1f1f9-1f1f3", desc: "Tunisia Flag" }, {
                    code: "1f1f9-1f1f4",
                    desc: "Tonga Flag"
                }, { code: "1f1f9-1f1f7", desc: "Turkey Flag" }, {
                    code: "1f1f9-1f1f9",
                    desc: "Trinidad & Tobago Flag"
                }, { code: "1f1f9-1f1fb", desc: "Tuvalu Flag" }, {
                    code: "1f1f9-1f1fc",
                    desc: "Taiwan Flag"
                }, { code: "1f1f9-1f1ff", desc: "Tanzania Flag" }, {
                    code: "1f1fa-1f1e6",
                    desc: "Ukraine City  Flag"
                }, { code: "1f1fa-1f1ec", desc: "Uganda Flag" }, {
                    code: "1f1fa-1f1f2",
                    desc: "U.s. Outlying Islands  Flag"
                }, { code: "1f1fa-1f1fe", desc: "Uruguay  Flag" }, {
                    code: "1f1fa-1f1ff",
                    desc: "Uzbekistan Flag"
                }, { code: "1f1fb-1f1e6", desc: "Vatican City  Flag" }, {
                    code: "1f1fb-1f1e8",
                    desc: "St. Vincent & Grenadines Flag"
                }, { code: "1f1fb-1f1ea", desc: "Venezuela Flag" }, {
                    code: "1f1fb-1f1ec",
                    desc: "British Virgin Islands Flag"
                }, { code: "1f1fb-1f1ee", desc: "U.s. Virgin Islands Flag" }, {
                    code: "1f1fb-1f1f3",
                    desc: "Vietnam Flag"
                }, { code: "1f1fc-1f1f8", desc: "Samoa Flag" }, {
                    code: "1f1fb-1f1fa",
                    desc: "Vanuatu Flag"
                }, { code: "1f1fc-1f1eb", desc: '"Wallis & Futuna Flag' }, {
                    code: "1f1fd-1f1f0",
                    desc: "Kosovo Flag"
                }, { code: "1f1fe-1f1ea", desc: "Yemen Flag" }, {
                    code: "1f1fe-1f1f9",
                    desc: "Mayotte Flag"
                }, { code: "1f1ff-1f1e6", desc: "South Africa Flag" }, {
                    code: "1f1ff-1f1f2",
                    desc: "Zambia Flag"
                }, { code: "1f1ff-1f1fc", desc: "Zimbabwe Flag" }, {
                    code: "1f1eb-1f1f7",
                    desc: "France Flag"
                }, { code: "1f1ec-1f1e7", desc: "United Kingdom  Flag" }, {
                    code: "1f1ee-1f1f9",
                    desc: "Italy Flag"
                }, { code: "1f1ef-1f1f5", desc: "Japan Flag" }, {
                    code: "1f1f0-1f1f7",
                    desc: "South Korea Flag"
                }, { code: "1f1f7-1f1fa", desc: "Russia Flag" }, {
                    code: "1F6A9",
                    desc: "Triangular Flag on Post"
                }, { code: "1f1fa-1f1f8", desc: "United States Flag" }]
            }],
            emoticonsButtons: ["emoticonsBack", "|"],
            emoticonsUseImage: !0
        }), $e.PLUGINS.emoticons = function(m) {
            var v = m.$,
                r = m.opts.emoticonsSet,
                o = r && r[0],
                i = "";

            function s() {
                if (!m.selection.isCollapsed()) return !1;
                var e = m.selection.element(),
                    t = m.selection.endElement();
                if (e && m.node.hasClass(e, "fr-emoticon")) return e;
                if (t && m.node.hasClass(t, "fr-emoticon")) return t;
                var n = m.selection.ranges(0),
                    a = n.startContainer;
                if (a.nodeType == Node.ELEMENT_NODE && 0 < a.childNodes.length && 0 < n.startOffset) {
                    var r = a.childNodes[n.startOffset - 1];
                    if (m.node.hasClass(r, "fr-emoticon")) return r
                }
                return !1
            }

            function l() {
                return "".concat(function a(e, t) {
                    return '<div class="fr-buttons fr-tabs fr-tabs-scroll">\n                        '.concat(function n(e, a) {
                        var r = "";
                        return e.forEach(function(e) {
                            var t = { image: e.code.toLowerCase() },
                                n = {
                                    elementClass: e.id === a.id ? "fr-active fr-active-tab" : "",
                                    emoticonsUnicodeClass: m.opts.emoticonsUseImage ? "" : "fr-tabs-unicode",
                                    title: m.language.translate(e.name),
                                    dataCmd: "setEmoticonCategory",
                                    dataParam1: e.id,
                                    image: m.opts.emoticonsUseImage ? '<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/'.concat(t.image, '.svg"/>') : "&#x".concat(t.image, ";")
                                };
                            r += '<button class="fr-command fr-btn '.concat(n.elementClass, " ").concat(n.emoticonsUnicodeClass, '" \n      title="').concat(n.title, '" data-cmd="').concat(n.dataCmd, '" data-param1="').concat(n.dataParam1, '">\n       ').concat(n.image, " </button>")
                        }), r
                    }(e, t), "\n                        </div>")
                }(r, o), "\n                      ").concat(function n(e) {
                    return '\n        <div class="fr-icon-container fr-emoticon-container">\n            '.concat(function t(e) {
                        var r = "";
                        return e.emoticons.forEach(function(e) {
                            var t = e.code.split("-").reduce(function(e, t) {
                                    return e ? "".concat(e, "&zwj;&#x").concat(t.toLowerCase(), ";") : "&#x".concat(t.toLowerCase(), ";")
                                }, ""),
                                n = { image: e.code.toLowerCase(), compiledCode: e.uCode ? e.uCode : t },
                                a = {
                                    dataParam1: e.code.toLowerCase(),
                                    dataParam2: n.compiledCode,
                                    title: m.language.translate(e.desc),
                                    image: m.opts.emoticonsUseImage ? '<img src="https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/'.concat(n.image, '.svg"/>') : "".concat(n.compiledCode),
                                    desc: m.language.translate(e.desc)
                                };
                            r += '<span class="fr-command fr-emoticon fr-icon" role="button" \n      data-cmd="insertEmoticon" data-param1="'.concat(a.dataParam1, '" \n      data-param2="').concat(a.dataParam2, '"  title="').concat(a.title, '" >\n      ').concat(a.image, '<span class="fr-sr-only">').concat(a.desc, "&nbsp;&nbsp;&nbsp;</span></span>")
                        }), r
                    }(e), "\n        </div>\n        ")
                }(o), "\n                      ").concat(function e() {
                    return m.opts.emoticonsUseImage ? '<p style="font-size: 12px; text-align: center; padding: 0 5px;">Emoji free by <a class="fr-link" tabIndex="-1" href="http://emojione.com/" target="_blank" rel="nofollow noopener noreferrer" role="link" aria-label="Open Emoji One website.">Emoji One</a></p>' : ""
                }())
            }

            return {
                _init: function e() {
                    var n = function n() {
                        for (var e = m.el.querySelectorAll(".fr-emoticon:not(.fr-deletable)"), t = 0; t < e.length; t++) e[t].className += " fr-deletable"
                    };
                    n(), m.events.on("html.set", n), m.events.on("keydown", function(e) {
                        if (m.keys.isCharacter(e.which) && m.selection.inEditor()) {
                            var t = m.selection.ranges(0),
                                n = s();
                            m.node.hasClass(n, "fr-emoticon-img") && n && (0 === t.startOffset && m.selection.element() === n ? v(n).before($e.MARKERS + $e.INVISIBLE_SPACE) : v(n).after($e.INVISIBLE_SPACE + $e.MARKERS), m.selection.restore())
                        }
                    }), m.events.on("keyup", function(e) {
                        for (var t = m.el.querySelectorAll(".fr-emoticon"), n = 0; n < t.length; n++) "undefined" != typeof t[n].textContent && 0 === t[n].textContent.replace(/\u200B/gi, "").length && v(t[n]).remove();
                        if (!(e.which >= $e.KEYCODE.ARROW_LEFT && e.which <= $e.KEYCODE.ARROW_DOWN)) {
                            var a = s();
                            m.node.hasClass(a, "fr-emoticon-img") && (v(a).append($e.MARKERS), m.selection.restore())
                        }
                    })
                },
                insert: function c(e, t) {
                    var n = s(),
                        a = m.selection.ranges(0);
                    n ? (0 === a.startOffset && m.selection.element() === n ? v(n).before($e.MARKERS + $e.INVISIBLE_SPACE) : 0 < a.startOffset && m.selection.element() === n && a.commonAncestorContainer.parentNode.classList.contains("fr-emoticon") && v(n).after($e.INVISIBLE_SPACE + $e.MARKERS), m.selection.restore(), m.html.insert('<span class="fr-emoticon fr-deletable'.concat(t ? " fr-emoticon-img" : "", '"').concat(t ? ' style="background: url('.concat(t, ');"') : "", ">").concat(t ? "&nbsp;" : e, "</span>&nbsp;").concat($e.MARKERS), !0)) : m.html.insert('<span class="fr-emoticon fr-deletable'.concat(t ? " fr-emoticon-img" : "", '"').concat(t ? ' style="background: url('.concat(t, ');"') : "", ">").concat(t ? "&nbsp;" : e, "</span>&nbsp;"), !0)
                },
                setEmoticonCategory: function n(t) {
                    o = r.filter(function(e) {
                            return e.id === t
                        })[0],
                        function e() {
                            m.popups.get("emoticons").html(i + l())
                        }()
                },
                showEmoticonsPopup: function d() {
                    var e = m.popups.get("emoticons");
                    if (e || (e = function o() {
                            m.opts.toolbarInline && 0 < m.opts.emoticonsButtons.length && (i = '<div class="fr-buttons fr-emoticons-buttons fr-tabs">'.concat(m.button.buildList(m.opts.emoticonsButtons), "</div>"));
                            var e = { buttons: i, custom_layer: l() },
                                t = m.popups.create("emoticons", e);
                            return function n(g) {
                                m.events.on("popup.tab", function(e) {
                                    var t = v(e.currentTarget);
                                    if (!m.popups.isVisible("emoticons") || !t.is("span, a")) return !0;
                                    var n, a, r, o = e.which;
                                    if ($e.KEYCODE.TAB == o) {
                                        if (t.is("span.fr-emoticon") && e.shiftKey || t.is("a") && !e.shiftKey) {
                                            var i = g.find(".fr-buttons");
                                            n = !m.accessibility.focusToolbar(i, !!e.shiftKey)
                                        }
                                        if (!1 !== n) {
                                            var s = g.find("span.fr-emoticon:focus").first().concat(g.findVisible(" div.fr-tabs").first().concat(g.find("a")));
                                            t.is("span.fr-emoticon") && (s = s.not("span.fr-emoticon:not(:focus)")), a = s.index(t), a = e.shiftKey ? ((a - 1) % s.length + s.length) % s.length : (a + 1) % s.length, r = s.get(a), m.events.disableBlur(), r.focus(), n = !1
                                        }
                                    } else if ($e.KEYCODE.ARROW_UP == o || $e.KEYCODE.ARROW_DOWN == o || $e.KEYCODE.ARROW_LEFT == o || $e.KEYCODE.ARROW_RIGHT == o) {
                                        if (t.is("span.fr-emoticon")) {
                                            var l = t.parent().find("span.fr-emoticon");
                                            a = l.index(t);
                                            var c = m.opts.emoticonsStep,
                                                d = Math.floor(l.length / c),
                                                f = a % c,
                                                p = Math.floor(a / c),
                                                u = p * c + f,
                                                h = d * c;
                                            $e.KEYCODE.ARROW_UP == o ? u = ((u - c) % h + h) % h : $e.KEYCODE.ARROW_DOWN == o ? u = (u + c) % h : $e.KEYCODE.ARROW_LEFT == o ? u = ((u - 1) % h + h) % h : $e.KEYCODE.ARROW_RIGHT == o && (u = (u + 1) % h), r = v(l.get(u)), m.events.disableBlur(), r.focus(), n = !1
                                        }
                                    } else $e.KEYCODE.ENTER == o && (t.is("a") ? t[0].click() : m.button.exec(t), n = !1);
                                    return !1 === n && (e.preventDefault(), e.stopPropagation()), n
                                }, !0)
                            }(t), t
                        }()), !e.hasClass("fr-active")) {
                        m.popups.refresh("emoticons"), m.popups.setContainer("emoticons", m.$tb);
                        var t = m.$tb.find('.fr-command[data-cmd="emoticons"]'),
                            n = m.button.getPosition(t),
                            a = n.left,
                            r = n.top;
                        m.popups.show("emoticons", a, r, t.outerHeight())
                    }
                },
                back: function t() {
                    m.popups.hide("emoticons"), m.toolbar.showInline()
                }
            }
        }, $e.DefineIcon("emoticons", {
            NAME: "smile-o",
            FA5NAME: "smile",
            SVG_KEY: "smile"
        }), $e.RegisterCommand("emoticons", {
            title: "Emoticons",
            undo: !1,
            focus: !0,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function() {
                this.popups.isVisible("emoticons") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("emoticons")) : this.emoticons.showEmoticonsPopup()
            },
            plugin: "emoticons"
        }), $e.RegisterCommand("insertEmoticon", {
            callback: function(e, t, n) {
                this.emoticons.insert(n, this.opts.emoticonsUseImage ? "https://cdnjs.cloudflare.com/ajax/libs/emojione/2.0.1/assets/svg/".concat(t, ".svg") : null), this.popups.hide("emoticons")
            }
        }), $e.RegisterCommand("setEmoticonCategory", {
            undo: !1,
            focus: !1,
            callback: function(e, t) {
                this.emoticons.setEmoticonCategory(t)
            }
        }), $e.DefineIcon("emoticonsBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), $e.RegisterCommand("emoticonsBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            refreshAfterCallback: !1,
            callback: function() {
                this.emoticons.back()
            }
        }), Object.assign($e.DEFAULTS, { entities: "&quot;&#39;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&uml;&copy;&ordf;&laquo;&not;&shy;&reg;&macr;&deg;&plusmn;&sup2;&sup3;&acute;&micro;&para;&middot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&Aring;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&divide;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&OElig;&oelig;&Scaron;&scaron;&Yuml;&fnof;&circ;&tilde;&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&Omega;&alpha;&beta;&gamma;&delta;&epsilon;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsilon;&phi;&chi;&psi;&omega;&thetasym;&upsih;&piv;&ensp;&emsp;&thinsp;&zwnj;&zwj;&lrm;&rlm;&ndash;&mdash;&lsquo;&rsquo;&sbquo;&ldquo;&rdquo;&bdquo;&dagger;&Dagger;&bull;&hellip;&permil;&prime;&Prime;&lsaquo;&rsaquo;&oline;&frasl;&euro;&image;&weierp;&real;&trade;&alefsym;&larr;&uarr;&rarr;&darr;&harr;&crarr;&lArr;&uArr;&rArr;&dArr;&hArr;&forall;&part;&exist;&empty;&nabla;&isin;&notin;&ni;&prod;&sum;&minus;&lowast;&radic;&prop;&infin;&ang;&and;&or;&cap;&cup;&int;&there4;&sim;&cong;&asymp;&ne;&equiv;&le;&ge;&sub;&sup;&nsub;&sube;&supe;&oplus;&otimes;&perp;&sdot;&lceil;&rceil;&lfloor;&rfloor;&lang;&rang;&loz;&spades;&clubs;&hearts;&diams;" }), $e.PLUGINS.entities = function(r) {
            var o, i, s = r.$;

            function a(e) {
                var t = e.textContent;
                if (t.match(o)) {
                    for (var n = "", a = 0; a < t.length; a++) i[t[a]] ? n += i[t[a]] : n += t[a];
                    e.textContent = n
                }
            }

            function l(e) {
                if (e && 0 <= ["STYLE", "SCRIPT", "svg", "IFRAME"].indexOf(e.tagName)) return !0;
                for (var t = r.node.contents(e), n = 0; n < t.length; n++) t[n].nodeType === Node.TEXT_NODE ? a(t[n]) : l(t[n]);
                return e.nodeType === Node.TEXT_NODE && a(e), !1
            }

            var c = function c(e) {
                return 0 === e.length ? "" : r.clean.exec(e, l).replace(/\&amp;/g, "&")
            };
            return {
                _init: function d() {
                    r.opts.htmlSimpleAmpersand || (r.opts.entities = "".concat(r.opts.entities, "&amp;"));
                    var e = s(document.createElement("div")).html(r.opts.entities).text(),
                        t = r.opts.entities.split(";");
                    i = {}, o = "";
                    for (var n = 0; n < e.length; n++) {
                        var a = e.charAt(n);
                        i[a] = "".concat(t[n], ";"), o += "\\".concat(a + (n < e.length - 1 ? "|" : ""))
                    }
                    o = new RegExp("(".concat(o, ")"), "g"), r.events.on("html.get", c, !0)
                }
            }
        }, Object.assign($e.POPUP_TEMPLATES, { "file.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_PROGRESS_BAR_]" }), Object.assign($e.DEFAULTS, {
            fileUpload: !0,
            fileUploadURL: null,
            fileUploadParam: "file",
            fileUploadParams: {},
            fileUploadToS3: !1,
            fileUploadMethod: "POST",
            fileMaxSize: 10485760,
            fileAllowedTypes: ["*"],
            fileInsertButtons: ["fileBack", "|"],
            fileUseSelectedText: !1
        }), $e.PLUGINS.file = function(d) {
            var a, f = d.$,
                l = "https://i.froala.com/upload",
                p = 2,
                u = 3,
                h = 4,
                c = 5,
                g = 6,
                n = {};

            function m() {
                var e = d.popups.get("file.insert");
                e || (e = S()), e.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), e.find(".fr-file-progress-bar-layer").addClass("fr-active"), e.find(".fr-buttons").hide(), r(d.language.translate("Uploading"), 0)
            }

            function o(e) {
                var t = d.popups.get("file.insert");
                t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-file-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e && (d.events.focus(), d.popups.hide("file.insert")))
            }

            function r(e, t) {
                var n = d.popups.get("file.insert");
                if (n) {
                    var a = n.find(".fr-file-progress-bar-layer");
                    a.find("h3").text(e + (t ? " ".concat(t, "%") : "")), a.removeClass("fr-error"), t ? (a.find("div").removeClass("fr-indeterminate"), a.find("div > span").css("width", "".concat(t, "%"))) : a.find("div").addClass("fr-indeterminate")
                }
            }

            function v(e, t, n) {
                d.edit.on(), d.events.focus(!0), d.selection.restore(), d.opts.fileUseSelectedText && d.selection.text().length && (t = d.selection.text()), d.html.insert('<a href="'.concat(e, '" target="_blank" id="fr-inserted-file" class="fr-file">').concat(t, "</a>"));
                var a = d.$el.find("#fr-inserted-file");
                a.removeAttr("id"), d.popups.hide("file.insert"), d.undo.saveStep(), R(), d.events.trigger("file.inserted", [a, n])
            }

            function b(e) {
                var t = this.status,
                    n = this.response,
                    a = this.responseXML,
                    r = this.responseText;
                try {
                    if (d.opts.fileUploadToS3)
                        if (201 === t) {
                            var o = function s(e) {
                                try {
                                    var t = f(e).find("Location").text(),
                                        n = f(e).find("Key").text();
                                    return !1 === d.events.trigger("file.uploadedToS3", [t, n, e], !0) ? (d.edit.on(), !1) : t
                                } catch (a) {
                                    return A(h, e), !1
                                }
                            }(a);
                            o && v(o, e, n || a)
                        } else A(h, n || a);
                    else if (200 <= t && t < 300) {
                        var i = function l(e) {
                            try {
                                if (!1 === d.events.trigger("file.uploaded", [e], !0)) return d.edit.on(), !1;
                                var t = JSON.parse(e);
                                return t.link ? t : (A(p, e), !1)
                            } catch (n) {
                                return A(h, e), !1
                            }
                        }(r);
                        i && v(i.link, e, n || r)
                    } else A(u, n || r)
                } catch (c) {
                    A(h, n || r)
                }
            }

            function E() {
                A(h, this.response || this.responseText || this.responseXML)
            }

            function T(e) {
                if (e.lengthComputable) {
                    var t = e.loaded / e.total * 100 | 0;
                    r(d.language.translate("Uploading"), t)
                }
            }

            function A(e, t) {
                d.edit.on(),
                    function a(e) {
                        m();
                        var t = d.popups.get("file.insert").find(".fr-file-progress-bar-layer");
                        t.addClass("fr-error");
                        var n = t.find("h3");
                        n.text(e), d.events.disableBlur(), n.focus()
                    }(d.language.translate("Something went wrong. Please try again.")), d.events.trigger("file.error", [{
                        code: e,
                        message: n[e]
                    }, t])
            }

            function C() {
                d.edit.on(), o(!0)
            }

            function i(e) {
                if (void 0 !== e && 0 < e.length) {
                    if (!1 === d.events.trigger("file.beforeUpload", [e])) return !1;
                    var t, n = e[0];
                    if ((null === d.opts.fileUploadURL || d.opts.fileUploadURL === l) && !d.opts.fileUploadToS3) return function s(r) {
                        var o = new FileReader;
                        o.onload = function() {
                            for (var e = o.result, t = atob(o.result.split(",")[1]), n = [], a = 0; a < t.length; a++) n.push(t.charCodeAt(a));
                            e = window.URL.createObjectURL(new Blob([new Uint8Array(n)], { type: r.type })), d.file.insert(e, r.name, null)
                        }, m(), o.readAsDataURL(r)
                    }(n), !1;
                    if (n.size > d.opts.fileMaxSize) return A(c), !1;
                    if (d.opts.fileAllowedTypes.indexOf("*") < 0 && d.opts.fileAllowedTypes.indexOf(n.type.replace(/file\//g, "")) < 0) return A(g), !1;
                    if (d.drag_support.formdata && (t = d.drag_support.formdata ? new FormData : null), t) {
                        var a;
                        if (!1 !== d.opts.fileUploadToS3)
                            for (a in t.append("key", d.opts.fileUploadToS3.keyStart + (new Date).getTime() + "-" + (n.name || "untitled")), t.append("success_action_status", "201"), t.append("X-Requested-With", "xhr"), t.append("Content-Type", n.type), d.opts.fileUploadToS3.params) d.opts.fileUploadToS3.params.hasOwnProperty(a) && t.append(a, d.opts.fileUploadToS3.params[a]);
                        for (a in d.opts.fileUploadParams) d.opts.fileUploadParams.hasOwnProperty(a) && t.append(a, d.opts.fileUploadParams[a]);
                        t.append(d.opts.fileUploadParam, n);
                        var r = d.opts.fileUploadURL;
                        d.opts.fileUploadToS3 && (r = d.opts.fileUploadToS3.uploadURL ? d.opts.fileUploadToS3.uploadURL : "https://".concat(d.opts.fileUploadToS3.region, ".amazonaws.com/").concat(d.opts.fileUploadToS3.bucket));
                        var o = d.core.getXHR(r, d.opts.fileUploadMethod);
                        o.onload = function() {
                            b.call(o, n.name)
                        }, o.onerror = E, o.upload.onprogress = T, o.onabort = C, m();
                        var i = d.popups.get("file.insert");
                        i && (i.off("abortUpload"), i.on("abortUpload", function() {
                            4 !== o.readyState && o.abort()
                        })), o.send(t)
                    }
                }
            }

            function s() {
                o()
            }

            function S(e) {
                if (e) return d.popups.onHide("file.insert", s), !0;
                var t;
                d.opts.fileUpload || d.opts.fileInsertButtons.splice(d.opts.fileInsertButtons.indexOf("fileUpload"), 1), t = '<div class="fr-buttons fr-tabs">'.concat(d.button.buildList(d.opts.fileInsertButtons), "</div>");
                var n = "";
                d.opts.fileUpload && (n = '<div class="fr-file-upload-layer fr-layer fr-active" id="fr-file-upload-layer-'.concat(d.id, '"><strong>').concat(d.language.translate("Drop file"), "</strong><br>(").concat(d.language.translate("or click"), ')<div class="fr-form"><input type="file" name="').concat(d.opts.fileUploadParam, '" accept="').concat(0 <= d.opts.fileAllowedTypes.indexOf("*") ? "/" : "").concat(d.opts.fileAllowedTypes.join(", ").toLowerCase(), '" tabIndex="-1" aria-labelledby="fr-file-upload-layer-').concat(d.id, '" role="button"></div></div>'));
                var a = {
                        buttons: t,
                        upload_layer: n,
                        progress_bar: '<div class="fr-file-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="fileDismissError" tabIndex="2" role="button">OK</button></div></div>'
                    },
                    r = d.popups.create("file.insert", a);
                return function o(n) {
                    d.events.$on(n, "dragover dragenter", ".fr-file-upload-layer", function() {
                        return f(this).addClass("fr-drop"), !1
                    }, !0), d.events.$on(n, "dragleave dragend", ".fr-file-upload-layer", function() {
                        return f(this).removeClass("fr-drop"), !1
                    }, !0), d.events.$on(n, "drop", ".fr-file-upload-layer", function(e) {
                        e.preventDefault(), e.stopPropagation(), f(this).removeClass("fr-drop");
                        var t = e.originalEvent.dataTransfer;
                        t && t.files && (n.data("instance") || d).file.upload(t.files)
                    }, !0), d.helpers.isIOS() && d.events.$on(n, "touchstart", '.fr-file-upload-layer input[type="file"]', function() {
                        f(this).trigger("click")
                    }), d.events.$on(n, "change", '.fr-file-upload-layer input[type="file"]', function() {
                        if (this.files) {
                            var e = n.data("instance") || d;
                            e.events.disableBlur(), n.find("input:focus").blur(), e.events.enableBlur(), e.file.upload(this.files)
                        }
                        f(this).val("")
                    }, !0)
                }(r), r
            }

            function t(e) {
                d.node.hasClass(e, "fr-file")
            }

            function y(e) {
                var t = e.originalEvent.dataTransfer;
                if (t && t.files && t.files.length) {
                    var n = t.files[0];
                    if (n && "undefined" != typeof n.type) {
                        if (n.type.indexOf("image") < 0) {
                            if (!d.opts.fileUpload) return e.preventDefault(), e.stopPropagation(), !1;
                            d.markers.remove(), d.markers.insertAtPoint(e.originalEvent), d.$el.find(".fr-marker").replaceWith($e.MARKERS), d.popups.hideAll();
                            var a = d.popups.get("file.insert");
                            return a || (a = S()), d.popups.setContainer("file.insert", d.$sc), d.popups.show("file.insert", e.originalEvent.pageX, e.originalEvent.pageY), m(), i(t.files), e.preventDefault(), e.stopPropagation(), !1
                        }
                    } else n.type.indexOf("image") < 0 && (e.preventDefault(), e.stopPropagation())
                }
            }

            function R() {
                var e, t = Array.prototype.slice.call(d.el.querySelectorAll("a.fr-file")),
                    n = [];
                for (e = 0; e < t.length; e++) n.push(t[e].getAttribute("href"));
                if (a)
                    for (e = 0; e < a.length; e++) n.indexOf(a[e].getAttribute("href")) < 0 && d.events.trigger("file.unlink", [a[e]]);
                a = t
            }

            return n[1] = "File cannot be loaded from the passed link.", n[p] = "No link in upload response.", n[u] = "Error during file upload.", n[h] = "Parsing response failed.", n[c] = "File is too large.", n[g] = "File file type is invalid.", n[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", {
                _init: function L() {
                    ! function e() {
                        d.events.on("drop", y), d.events.$on(d.$win, "keydown", function(e) {
                            var t = e.which,
                                n = d.popups.get("file.insert");
                            n && t === $e.KEYCODE.ESC && n.trigger("abortUpload")
                        }), d.events.on("destroy", function() {
                            var e = d.popups.get("file.insert");
                            e && e.trigger("abortUpload")
                        })
                    }(), d.events.on("link.beforeRemove", t), d.$wp && (R(), d.events.on("contentChanged", R)), S(!0)
                },
                showInsertPopup: function w() {
                    var e = d.$tb.find('.fr-command[data-cmd="insertFile"]'),
                        t = d.popups.get("file.insert");
                    if (t || (t = S()), o(), !t.hasClass("fr-active"))
                        if (d.popups.refresh("file.insert"), d.popups.setContainer("file.insert", d.$tb), e.isVisible) {
                            var n = d.button.getPosition(e),
                                a = n.left,
                                r = n.top;
                            d.popups.show("file.insert", a, r, e.outerHeight())
                        } else d.position.forSelection(t), d.popups.show("file.insert")
                },
                upload: i,
                insert: v,
                back: function e() {
                    d.events.disableBlur(), d.selection.restore(), d.events.enableBlur(), d.popups.hide("file.insert"), d.toolbar.showInline()
                },
                hideProgressBar: o
            }
        }, $e.DefineIcon("insertFile", {
            NAME: "file-o",
            FA5NAME: "file",
            SVG_KEY: "insertFile"
        }), $e.RegisterCommand("insertFile", {
            title: "Upload File",
            undo: !1,
            focus: !0,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function() {
                this.popups.isVisible("file.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("file.insert")) : this.file.showInsertPopup()
            },
            plugin: "file"
        }), $e.DefineIcon("fileBack", { NAME: "arrow-left", SVG_KEY: "back" }), $e.RegisterCommand("fileBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            refreshAfterCallback: !1,
            callback: function() {
                this.file.back()
            },
            refresh: function(e) {
                this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
            }
        }), $e.RegisterCommand("fileDismissError", {
            title: "OK",
            callback: function() {
                this.file.hideProgressBar(!0)
            }
        }), Object.assign($e.DEFAULTS, {
            fontFamily: {
                "Arial,Helvetica,sans-serif": "Arial",
                "Georgia,serif": "Georgia",
                "Impact,Charcoal,sans-serif": "Impact",
                "Tahoma,Geneva,sans-serif": "Tahoma",
                "Times New Roman,Times,serif,-webkit-standard": "Times New Roman",
                "Verdana,Geneva,sans-serif": "Verdana",
            },
            fontFamilySelection: !1,
            fontFamilyDefaultSelection: "Font Family"
        }), $e.PLUGINS.fontFamily = function(r) {
            var o = r.$;

            function i(e) {
                var t = e.replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'| /g, "").split(",");
                return o(this).grep(t, function(e) {
                    return 0 < e.length
                })
            }

            function s(e, t) {
                for (var n = 0; n < e.length; n++)
                    for (var a = 0; a < t.length; a++)
                        if (e[n].toLowerCase() === t[a].toLowerCase()) return [n, a];
                return null
            }

            function n() {
                var e = i(o(r.selection.element()).css("font-family")),
                    t = [];
                for (var n in r.opts.fontFamily)
                    if (r.opts.fontFamily.hasOwnProperty(n)) {
                        var a = s(e, i(n));
                        a && t.push([n, a])
                    }
                return 0 === t.length ? null : (t.sort(function(e, t) {
                    var n = e[1][0] - t[1][0];
                    return 0 === n ? e[1][1] - t[1][1] : n
                }), t[0][0])
            }

            return {
                apply: function t(e) {
                    r.format.applyStyle("font-family", e)
                },
                refreshOnShow: function a(e, t) {
                    t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="'.concat(n(), '"]')).addClass("fr-active").attr("aria-selected", !0)
                },
                refresh: function l(e) {
                    if (r.opts.fontFamilySelection) {
                        var t = o(r.selection.element()).css("font-family").replace(/(sans-serif|serif|monospace|cursive|fantasy)/gi, "").replace(/"|'|/g, "").split(",");
                        e.find("> span").text(r.opts.fontFamily[n()] || t[0] || r.language.translate(r.opts.fontFamilyDefaultSelection))
                    }
                }
            }
        }, $e.RegisterCommand("fontFamily", {
            type: "dropdown",
            displaySelection: function(e) {
                return e.opts.fontFamilySelection
            },
            defaultSelection: function(e) {
                return e.opts.fontFamilyDefaultSelection
            },
            displaySelectionWidth: 120,
            html: function() {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = this.opts.fontFamily;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontFamily" data-param1="\n        '.concat(n, '" style="font-family: ').concat(n, '" title="').concat(t[n], '">').concat(t[n], "</a></li>"));
                return e += "</ul>"
            },
            title: "Font Family",
            callback: function(e, t) {
                this.fontFamily.apply(t)
            },
            refresh: function(e) {
                this.fontFamily.refresh(e)
            },
            refreshOnShow: function(e, t) {
                this.fontFamily.refreshOnShow(e, t)
            },
            plugin: "fontFamily"
        }), $e.DefineIcon("fontFamily", {
            NAME: "font",
            SVG_KEY: "fontFamily"
        }), Object.assign($e.DEFAULTS, {
            fontSize: ["8", "9", "10", "11", "12", "14", "18", "24", "30", "36", "48", "60", "72", "96"],
            fontSizeSelection: !1,
            fontSizeDefaultSelection: "12",
            fontSizeUnit: "px"
        }), $e.PLUGINS.fontSize = function(a) {
            var r = a.$;
            return {
                apply: function t(e) {
                    a.format.applyStyle("font-size", e)
                },
                refreshOnShow: function o(e, t) {
                    var n = r(a.selection.element()).css("font-size");
                    "pt" === a.opts.fontSizeUnit && (n = "".concat(Math.round(72 * parseFloat(n, 10) / 96), "pt")), t.find(".fr-command.fr-active").removeClass("fr-active").attr("aria-selected", !1), t.find('.fr-command[data-param1="'.concat(n, '"]')).addClass("fr-active").attr("aria-selected", !0)
                },
                refresh: function n(e) {
                    if (a.opts.fontSizeSelection) {
                        var t = a.helpers.getPX(r(a.selection.element()).css("font-size"));
                        "pt" === a.opts.fontSizeUnit && (t = "".concat(Math.round(72 * parseFloat(t, 10) / 96), "pt")), e.find("> span").text(t)
                    }
                }
            }
        }, $e.RegisterCommand("fontSize", {
            type: "dropdown",
            title: "Font Size",
            displaySelection: function(e) {
                return e.opts.fontSizeSelection
            },
            displaySelectionWidth: 30,
            defaultSelection: function(e) {
                return e.opts.fontSizeDefaultSelection
            },
            html: function() {
                for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.fontSize, n = 0; n < t.length; n++) {
                    var a = t[n];
                    e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="fontSize" data-param1="\n      '.concat(a).concat(this.opts.fontSizeUnit, '" title="').concat(a, '">').concat(a, "</a></li>")
                }
                return e += "</ul>"
            },
            callback: function(e, t) {
                this.fontSize.apply(t)
            },
            refresh: function(e) {
                this.fontSize.refresh(e)
            },
            refreshOnShow: function(e, t) {
                this.fontSize.refreshOnShow(e, t)
            },
            plugin: "fontSize"
        }), $e.DefineIcon("fontSize", {
            NAME: "text-height",
            SVG_KEY: "fontSize"
        }), Object.assign($e.POPUP_TEMPLATES, {
            "forms.edit": "[_BUTTONS_]",
            "forms.update": "[_BUTTONS_][_TEXT_LAYER_]"
        }), Object.assign($e.DEFAULTS, {
            formEditButtons: ["inputStyle", "inputEdit"],
            formStyles: { "fr-rounded": "Rounded", "fr-large": "Large" },
            formMultipleStyles: !0,
            formUpdateButtons: ["inputBack", "|"]
        }), $e.PLUGINS.forms = function(i) {
            var s, l = i.$;

            function t(e) {
                i.selection.clear(), l(this).data("mousedown", !0)
            }

            function n(e) {
                l(this).data("mousedown") && (e.stopPropagation(), l(this).removeData("mousedown"), d(s = this)), e.preventDefault()
            }

            function a() {
                i.$el.find("input, textarea, button").removeData("mousedown")
            }

            function r() {
                l(this).removeData("mousedown")
            }

            function c() {
                return s || null
            }

            function d(e) {
                if (-1 == ["checkbox", "radio"].indexOf(e.type)) {
                    var t = i.popups.get("forms.edit");
                    t || (t = function o() {
                        var e = "";
                        0 < i.opts.formEditButtons.length && (e = '<div class="fr-buttons">'.concat(i.button.buildList(i.opts.formEditButtons), "</div>"));
                        var t = { buttons: e },
                            n = i.popups.create("forms.edit", t);
                        return i.$wp && i.events.$on(i.$wp, "scroll.link-edit", function() {
                            c() && i.popups.isVisible("forms.edit") && d(c())
                        }), n
                    }());
                    var n = l(s = e);
                    i.popups.refresh("forms.edit"), i.popups.setContainer("forms.edit", i.$sc);
                    var a = n.offset().left + n.outerWidth() / 2,
                        r = n.offset().top + n.outerHeight();
                    i.popups.show("forms.edit", a, r, n.outerHeight())
                }
            }

            function o() {
                var e = i.popups.get("forms.update"),
                    t = c();
                if (t) {
                    var n = l(t);
                    n.is("button") ? e.find('input[type="text"][name="text"]').val(n.text()) : n.is("input[type=button]") || n.is("input[type=submit]") || n.is("input[type=reset]") ? e.find('input[type="text"][name="text"]').val(n.val()) : e.find('input[type="text"][name="text"]').val(n.attr("placeholder"))
                }
                e.find('input[type="text"][name="text"]').trigger("change")
            }

            function f() {
                s = null
            }

            function p(e) {
                if (e) return i.popups.onRefresh("forms.update", o), i.popups.onHide("forms.update", f), !0;
                var t = "";
                1 <= i.opts.formUpdateButtons.length && (t = '<div class="fr-buttons">'.concat(i.button.buildList(i.opts.formUpdateButtons), "</div>"));
                var n = 0,
                    a = {
                        buttons: t,
                        text_layer: '<div class="fr-forms-text-layer fr-layer fr-active"> \n    <div class="fr-input-line"><input name="text" type="text" placeholder="Text" tabIndex=" '.concat(++n, ' "></div>\n    <div class="fr-action-buttons"><button class="fr-command fr-submit" data-cmd="updateInput" href="#" tabIndex="').concat(2, '" type="button">').concat(i.language.translate("Update"), "</button></div></div>")
                    };
                return i.popups.create("forms.update", a)
            }

            return {
                _init: function u() {
                    ! function e() {
                        i.events.$on(i.$el, i._mousedown, "input, textarea, button", t), i.events.$on(i.$el, i._mouseup, "input, textarea, button", n), i.events.$on(i.$el, "touchmove", "input, textarea, button", r), i.events.$on(i.$el, i._mouseup, a), i.events.$on(i.$win, i._mouseup, a), p(!0)
                    }(), i.events.$on(i.$el, "submit", "form", function(e) {
                        return e.preventDefault(), !1
                    })
                },
                updateInput: function h() {
                    var e = i.popups.get("forms.update"),
                        t = c();
                    if (t) {
                        var n = l(t),
                            a = e.find('input[type="text"][name="text"]').val() || "";
                        n.is("button") ? a.length ? n.text(a) : n.text("\u200b") : -1 != ["button", "submit", "reset"].indexOf(t.type) ? n.attr("value", a) : n.attr("placeholder", a), i.popups.hide("forms.update"), d(t)
                    }
                },
                getInput: c,
                applyStyle: function g(e, t, n) {
                    void 0 === t && (t = i.opts.formStyles), void 0 === n && (n = i.opts.formMultipleStyles);
                    var a = c();
                    if (!a) return !1;
                    if (!n) {
                        var r = Object.keys(t);
                        r.splice(r.indexOf(e), 1), l(a).removeClass(r.join(" "))
                    }
                    l(a).toggleClass(e)
                },
                showUpdatePopup: function m() {
                    var e = c();
                    if (e) {
                        var t = l(e),
                            n = i.popups.get("forms.update");
                        n || (n = p()), i.popups.isVisible("forms.update") || i.popups.refresh("forms.update"), i.popups.setContainer("forms.update", i.$sc);
                        var a = t.offset().left + t.outerWidth() / 2,
                            r = t.offset().top + t.outerHeight();
                        i.popups.show("forms.update", a, r, t.outerHeight())
                    }
                },
                showEditPopup: d,
                back: function v() {
                    i.events.disableBlur(), i.selection.restore(), i.events.enableBlur();
                    var e = c();
                    e && i.$wp && ("BUTTON" === e.tagName && i.selection.restore(), d(e))
                }
            }
        }, $e.RegisterCommand("updateInput", {
            undo: !1,
            focus: !1,
            title: "Update",
            callback: function() {
                this.forms.updateInput()
            }
        }), $e.DefineIcon("inputStyle", {
            NAME: "magic",
            SVG_KEY: "inlineStyle"
        }), $e.RegisterCommand("inputStyle", {
            title: "Style",
            type: "dropdown",
            html: function() {
                var e = '<ul class="fr-dropdown-list">',
                    t = this.opts.formStyles;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li><a class="fr-command" tabIndex="-1" data-cmd="inputStyle" data-param1="'.concat(n, '">').concat(this.language.translate(t[n]), "</a></li>"));
                return e += "</ul>"
            },
            callback: function(e, t) {
                var n = this.forms.getInput();
                n && (this.forms.applyStyle(t), this.forms.showEditPopup(n))
            },
            refreshOnShow: function(e, t) {
                var n = this.$,
                    a = this.forms.getInput();
                if (a) {
                    var r = n(a);
                    t.find(".fr-command").each(function() {
                        var e = n(this).data("param1");
                        n(this).toggleClass("fr-active", r.hasClass(e))
                    })
                }
            }
        }), $e.DefineIcon("inputEdit", {
            NAME: "edit",
            SVG_KEY: "edit"
        }), $e.RegisterCommand("inputEdit", {
            title: "Edit Button",
            undo: !1,
            refreshAfterCallback: !1,
            callback: function() {
                this.forms.showUpdatePopup()
            }
        }), $e.DefineIcon("inputBack", {
            NAME: "arrow-left",
            SVG_KEY: "back"
        }), $e.RegisterCommand("inputBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            refreshAfterCallback: !1,
            callback: function() {
                this.forms.back()
            }
        }), $e.RegisterCommand("updateInput", {
            undo: !1,
            focus: !1,
            title: "Update",
            callback: function() {
                this.forms.updateInput()
            }
        }), $e.PLUGINS.fullscreen = function(r) {
            var o, i, s, l, c = r.$,
                d = function d() {
                    return r.$box.hasClass("fr-fullscreen")
                };

            function f() {
                var e, t, n;
                if (r.helpers.isIOS() && r.core.hasFocus()) return r.$el.blur(), setTimeout(u, 250), !1;
                o = r.helpers.scrollTop(), r.$box.toggleClass("fr-fullscreen"), c("body").first().toggleClass("fr-fullscreen"), r.helpers.isMobile() && (r.$tb.data("parent", r.$tb.parent()), r.$box.prepend(r.$tb), r.$tb.data("sticky-dummy") && r.$tb.after(r.$tb.data("sticky-dummy"))), e = r.opts, i = e.height, e((t = r.opts, s = t.heightMax, t))((n = r.opts, l = n.z_index, n)), r.opts.height = r.o_win.innerHeight - (r.opts.toolbarInline ? 0 : r.$tb.outerHeight() + (r.$second_tb ? r.$second_tb.outerHeight() : 0)), r.opts.zIndex = 2147483641, r.opts.heightMax = null, r.size.refresh(), r.opts.toolbarInline && r.toolbar.showInline();
                for (var a = r.$box.parent(); !a.first().is("body");) a.addClass("fr-fullscreen-wrapper"), a = a.parent();
                r.opts.toolbarContainer && r.$box.prepend(r.$tb), r.events.trigger("charCounter.update"), r.events.trigger("codeView.update"), r.$win.trigger("scroll")
            }

            function p() {
                if (r.helpers.isIOS() && r.core.hasFocus()) return r.$el.blur(), setTimeout(u, 250), !1;
                r.$box.toggleClass("fr-fullscreen"), c("body").first().toggleClass("fr-fullscreen"), r.$tb.data("parent") && r.$tb.data("parent").prepend(r.$tb), r.$tb.data("sticky-dummy") && r.$tb.after(r.$tb.data("sticky-dummy")), r.opts.height = i, r.opts.heightMax = s, r.opts.zIndex = l, r.size.refresh(), c(r.o_win).scrollTop(o), r.opts.toolbarInline && r.toolbar.showInline(), r.events.trigger("charCounter.update"), r.opts.toolbarSticky && r.opts.toolbarStickyOffset && (r.opts.toolbarBottom ? r.$tb.css("bottom", r.opts.toolbarStickyOffset).data("bottom", r.opts.toolbarStickyOffset) : r.$tb.css("top", r.opts.toolbarStickyOffset).data("top", r.opts.toolbarStickyOffset));
                for (var e = r.$box.parent(); !e.first().is("body");) e.removeClass("fr-fullscreen-wrapper"), e = e.parent();
                r.opts.toolbarContainer && c(r.opts.toolbarContainer).append(r.$tb), c(r.o_win).trigger("scroll"), r.events.trigger("codeView.update")
            }

            function u() {
                d() ? p() : f(), h(r.$tb.find('.fr-command[data-cmd="fullscreen"]'));
                var e = r.$tb.find('.fr-command[data-cmd="moreText"]'),
                    t = r.$tb.find('.fr-command[data-cmd="moreParagraph"]'),
                    n = r.$tb.find('.fr-command[data-cmd="moreRich"]'),
                    a = r.$tb.find('.fr-command[data-cmd="moreMisc"]');
                e.length && r.refresh.moreText(e), t.length && r.refresh.moreParagraph(t), n.length && r.refresh.moreRich(n), a.length && r.refresh.moreMisc(a)
            }

            function h(e) {
                var t = d();
                e.toggleClass("fr-active", t).attr("aria-pressed", t), e.find("> *").not(".fr-sr-only").replaceWith(t ? r.icon.create("fullscreenCompress") : r.icon.create("fullscreen"))
            }

            return {
                _init: function e() {
                    if (!r.$wp) return !1;
                    r.events.$on(c(r.o_win), "resize", function() {
                        d() && (p(), f())
                    }), r.events.on("toolbar.hide", function() {
                        if (d() && r.helpers.isMobile()) return !1
                    }), r.events.on("position.refresh", function() {
                        if (r.helpers.isIOS()) return !d()
                    }), r.events.on("destroy", function() {
                        d() && p()
                    }, !0)
                },
                toggle: u,
                refresh: h,
                isActive: d
            }
        }, $e.RegisterCommand("fullscreen", {
            title: "Fullscreen",
            undo: !1,
            focus: !1,
            accessibilityFocus: !0,
            forcedRefresh: !0,
            toggle: !0,
            callback: function() {
                this.fullscreen.toggle()
            },
            refresh: function(e) {
                this.fullscreen.refresh(e)
            },
            plugin: "fullscreen"
        }), $e.DefineIcon("fullscreen", {
            NAME: "expand",
            SVG_KEY: "fullscreen"
        }), $e.DefineIcon("fullscreenCompress", { NAME: "compress", SVG_KEY: "exitFullscreen" }), Object.assign($e.DEFAULTS, {
            helpSets: [{
                title: "Inline Editor",
                commands: [{ val: "OSkeyE", desc: "Show the editor" }]
            }, {
                title: "Common actions",
                commands: [{ val: "OSkeyC", desc: "Copy" }, { val: "OSkeyX", desc: "Cut" }, {
                    val: "OSkeyV",
                    desc: "Paste"
                }, { val: "OSkeyZ", desc: "Undo" }, { val: "OSkeyShift+Z", desc: "Redo" }, {
                    val: "OSkeyK",
                    desc: "Insert Link"
                }, { val: "OSkeyP", desc: "Insert Image" }]
            }, {
                title: "Basic Formatting",
                commands: [{ val: "OSkeyA", desc: "Select All" }, { val: "OSkeyB", desc: "Bold" }, {
                    val: "OSkeyI",
                    desc: "Italic"
                }, { val: "OSkeyU", desc: "Underline" }, { val: "OSkeyS", desc: "Strikethrough" }, {
                    val: "OSkey]",
                    desc: "Increase Indent"
                }, { val: "OSkey[", desc: "Decrease Indent" }]
            }, {
                title: "Quote",
                commands: [{ val: "OSkey'", desc: "Increase quote level" }, {
                    val: "OSkeyShift+'",
                    desc: "Decrease quote level"
                }]
            }, {
                title: "Image / Video",
                commands: [{ val: "OSkey+", desc: "Resize larger" }, { val: "OSkey-", desc: "Resize smaller" }]
            }, {
                title: "Table",
                commands: [{ val: "Alt+Space", desc: "Select table cell" }, {
                    val: "Shift+Left/Right arrow",
                    desc: "Extend selection one cell"
                }, { val: "Shift+Up/Down arrow", desc: "Extend selection one row" }]
            }, {
                title: "Navigation",
                commands: [{ val: "OSkey/", desc: "Shortcuts" }, { val: "Alt+F10", desc: "Focus popup / toolbar" }, {
                    val: "Esc",
                    desc: "Return focus to previous position"
                }]
            }]
        }), $e.PLUGINS.help = function(s) {
            var a, r = s.$,
                o = "help";
            return {
                _init: function e() {},
                show: function l() {
                    if (!a) {
                        var e = "<h4>".concat(s.language.translate("Shortcuts"), "</h4>"),
                            t = function i() {
                                for (var e = '<div class="fr-help-modal">', t = 0; t < s.opts.helpSets.length; t++) {
                                    var n = s.opts.helpSets[t],
                                        a = "<table>";
                                    a += "<thead><tr><th>".concat(s.language.translate(n.title), "</th></tr></thead>"), a += "<tbody>";
                                    for (var r = 0; r < n.commands.length; r++) {
                                        var o = n.commands[r];
                                        a += "<tr>", a += "<td>".concat(s.language.translate(o.desc), "</td>"), a += "<td>".concat(o.val.replace("OSkey", s.helpers.isMac() ? "&#8984;" : "Ctrl+"), "</td>"), a += "</tr>"
                                    }
                                    e += a += "</tbody></table>"
                                }
                                return e += "</div>"
                            }(),
                            n = s.modals.create(o, e, t);
                        a = n.$modal, s.events.$on(r(s.o_win), "resize", function() {
                            s.modals.resize(o)
                        })
                    }
                    s.modals.show(o), s.modals.resize(o)
                },
                hide: function t() {
                    s.modals.hide(o)
                }
            }
        }, $e.DefineIcon("help", {
            NAME: "question",
            SVG_KEY: "help"
        }), $e.RegisterShortcut($e.KEYCODE.SLASH, "help", null, "/"), $e.RegisterCommand("help", {
            title: "Help",
            icon: "help",
            undo: !1,
            focus: !1,
            modal: !0,
            callback: function() {
                this.help.show()
            },
            plugin: "help",
            showOnMobile: !1
        }), Object.assign($e.POPUP_TEMPLATES, {
            "image.insert": "[_BUTTONS_][_UPLOAD_LAYER_][_BY_URL_LAYER_][_PROGRESS_BAR_]",
            "image.edit": "[_BUTTONS_]",
            "image.alt": "[_BUTTONS_][_ALT_LAYER_]",
            "image.size": "[_BUTTONS_][_SIZE_LAYER_]"
        }), Object.assign($e.DEFAULTS, {
            imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
            imageEditButtons: ["imageReplace", "imageAlign", "imageCaption", "imageRemove", "imageLink", "linkOpen", "linkEdit", "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"],
            imageAltButtons: ["imageBack", "|"],
            imageSizeButtons: ["imageBack", "|"],
            imageUpload: !0,
            imageUploadURL: '/upload_image',
            imageCORSProxy: "https://cors-anywhere.froala.com",
            imageUploadRemoteUrls: !0,
            imageUploadParam: "file",
            imageUploadParams: {},
            imageUploadToS3: !1,
            imageUploadMethod: "POST",
            imageMaxSize: 10485760,
            imageAllowedTypes: ["jpeg", "jpg", "png", "gif", "webp"],
            imageResize: !0,
            imageResizeWithPercent: !1,
            imageRoundPercent: !1,
            imageDefaultWidth: 300,
            imageDefaultAlign: "center",
            imageDefaultDisplay: "block",
            imageSplitHTML: !1,
            imageStyles: { "fr-rounded": "Rounded", "fr-bordered": "Bordered", "fr-shadow": "Shadow" },
            imageMove: !0,
            imageMultipleStyles: !0,
            imageTextNear: !0,
            imagePaste: !0,
            imagePasteProcess: !1,
            imageMinWidth: 16,
            imageOutputSize: !1,
            imageDefaultMargin: 5,
            imageAddNewLine: !1
        }), $e.PLUGINS.image = function(f) {
            var p, l, c, d, s, n, u = f.$,
                i = "https://i.froala.com/upload",
                t = !1,
                a = 1,
                h = 2,
                g = 3,
                m = 4,
                v = 5,
                b = 6,
                r = {};

            function E() {
                var e = f.popups.get("image.insert").find(".fr-image-by-url-layer input");
                e.val(""), p && e.val(p.attr("src")), e.trigger("change")
            }

            function o() {
                var e = f.popups.get("image.edit");
                if (e || (e = x()), e) {
                    var t = Te();
                    Ae() && (t = t.find(".fr-img-wrap")), f.popups.setContainer("image.edit", f.$sc), f.popups.refresh("image.edit");
                    var n = t.offset().left + t.outerWidth() / 2,
                        a = t.offset().top + t.outerHeight();
                    p.hasClass("fr-uploading") ? I() : f.popups.show("image.edit", n, a, t.outerHeight(), !0)
                }
            }

            function T() {
                k()
            }

            function A(e) {
                0 < e.parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption").first());
                var t = e.hasClass("fr-dib") ? "block" : e.hasClass("fr-dii") ? "inline" : null,
                    n = e.hasClass("fr-fil") ? "left" : e.hasClass("fr-fir") ? "right" : ge(e);
                he(e, t, n), e.removeClass("fr-dib fr-dii fr-fir fr-fil")
            }

            function C() {
                for (var e, t = "IMG" == f.el.tagName ? [f.el] : f.el.querySelectorAll("img"), n = 0; n < t.length; n++) {
                    var a = u(t[n]);
                    !f.opts.htmlUntouched && f.opts.useClasses ? ((f.opts.imageDefaultAlign || f.opts.imageDefaultDisplay) && (0 < (e = a).parents(".fr-img-caption").length && (e = e.parents(".fr-img-caption").first()), e.hasClass("fr-dii") || e.hasClass("fr-dib") || (e.addClass("fr-fi".concat(ge(e)[0])), e.addClass("fr-di".concat(me(e)[0])), e.css("margin", ""), e.css("float", ""), e.css("display", ""), e.css("z-index", ""), e.css("position", ""), e.css("overflow", ""), e.css("vertical-align", ""))), f.opts.imageTextNear || (0 < a.parents(".fr-img-caption").length ? a.parents(".fr-img-caption").first().removeClass("fr-dii").addClass("fr-dib") : a.removeClass("fr-dii").addClass("fr-dib"))) : f.opts.htmlUntouched || f.opts.useClasses || (f.opts.imageDefaultAlign || f.opts.imageDefaultDisplay) && A(a), f.opts.iframe && a.on("load", f.size.syncIframe)
                }
            }

            function S(e) {
                void 0 === e && (e = !0);
                var t, n = Array.prototype.slice.call(f.el.querySelectorAll("img")),
                    a = [];
                for (t = 0; t < n.length; t++)
                    if (a.push(n[t].getAttribute("src")), u(n[t]).toggleClass("fr-draggable", f.opts.imageMove), "" === n[t].getAttribute("class") && n[t].removeAttribute("class"), "" === n[t].getAttribute("style") && n[t].removeAttribute("style"), n[t].parentNode && n[t].parentNode.parentNode && f.node.hasClass(n[t].parentNode.parentNode, "fr-img-caption")) {
                        var r = n[t].parentNode.parentNode;
                        f.browser.mozilla || r.setAttribute("contenteditable", !1), r.setAttribute("draggable", !1), r.classList.add("fr-draggable");
                        var o = n[t].nextSibling;
                        o && !f.browser.mozilla && o.setAttribute("contenteditable", !0)
                    }
                if (s)
                    for (t = 0; t < s.length; t++) a.indexOf(s[t].getAttribute("src")) < 0 && f.events.trigger("image.removed", [u(s[t])]);
                if (s && e) {
                    var i = [];
                    for (t = 0; t < s.length; t++) i.push(s[t].getAttribute("src"));
                    for (t = 0; t < n.length; t++) i.indexOf(n[t].getAttribute("src")) < 0 && f.events.trigger("image.loaded", [u(n[t])])
                }
                s = n
            }

            function y() {
                if (l || function i() {
                        var e;
                        f.shared.$image_resizer ? (l = f.shared.$image_resizer, d = f.shared.$img_overlay, f.events.on("destroy", function() {
                            u("body").first().append(l.removeClass("fr-active"))
                        }, !0)) : (f.shared.$image_resizer = u(document.createElement("div")).attr("class", "fr-image-resizer"), l = f.shared.$image_resizer, f.events.$on(l, "mousedown", function(e) {
                            e.stopPropagation()
                        }, !0), f.opts.imageResize && (l.append(R("nw") + R("ne") + R("sw") + R("se")), f.shared.$img_overlay = u(document.createElement("div")).attr("class", "fr-image-overlay"), d = f.shared.$img_overlay, e = l.get(0).ownerDocument, u(e).find("body").first().append(d)));
                        f.events.on("shared.destroy", function() {
                            l.html("").removeData().remove(), l = null, f.opts.imageResize && (d.remove(), d = null)
                        }, !0), f.helpers.isMobile() || f.events.$on(u(f.o_win), "resize", function() {
                            p && !p.hasClass("fr-uploading") ? de(!0) : p && (y(), ve(), I(!1))
                        });
                        if (f.opts.imageResize) {
                            e = l.get(0).ownerDocument, f.events.$on(l, f._mousedown, ".fr-handler", w), f.events.$on(u(e), f._mousemove, _), f.events.$on(u(e.defaultView || e.parentWindow), f._mouseup, O), f.events.$on(d, "mouseleave", O);
                            var a = 1,
                                r = null,
                                o = 0;
                            f.events.on("keydown", function(e) {
                                if (p) {
                                    var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                                        n = e.which;
                                    (n !== r || 200 < e.timeStamp - o) && (a = 1), (n == $e.KEYCODE.EQUALS || f.browser.mozilla && n == $e.KEYCODE.FF_EQUALS) && t && !e.altKey ? a = ee.call(this, e, 1, 1, a) : (n == $e.KEYCODE.HYPHEN || f.browser.mozilla && n == $e.KEYCODE.FF_HYPHEN) && t && !e.altKey ? a = ee.call(this, e, 2, -1, a) : f.keys.ctrlKey(e) || n != $e.KEYCODE.ENTER || (p.before("<br>"), B(p)), r = n, o = e.timeStamp
                                }
                            }, !0), f.events.on("keyup", function() {
                                a = 1
                            })
                        }
                    }(), !p) return !1;
                var e = f.$wp || f.$sc;
                e.append(l), l.data("instance", f);
                var t = e.scrollTop() - ("static" != e.css("position") ? e.offset().top : 0),
                    n = e.scrollLeft() - ("static" != e.css("position") ? e.offset().left : 0);
                n -= f.helpers.getPX(e.css("border-left-width")), t -= f.helpers.getPX(e.css("border-top-width")), f.$el.is("img") && f.$sc.is("body") && (n = t = 0);
                var a = Te();
                Ae() && (a = a.find(".fr-img-wrap"));
                var r = 0,
                    o = 0;
                f.opts.iframe && (r = f.helpers.getPX(f.$wp.find(".fr-iframe").css("padding-top")), o = f.helpers.getPX(f.$wp.find(".fr-iframe").css("padding-left"))), l.css("top", (f.opts.iframe ? a.offset().top + r : a.offset().top + t) - 1).css("left", (f.opts.iframe ? a.offset().left + o : a.offset().left + n) - 1).css("width", a.get(0).getBoundingClientRect().width).css("height", a.get(0).getBoundingClientRect().height).addClass("fr-active")
            }

            function R(e) {
                return '<div class="fr-handler fr-h'.concat(e, '"></div>')
            }

            function L(e) {
                Ae() ? p.parents(".fr-img-caption").css("width", e) : p.css("width", e)
            }

            function w(e) {
                if (!f.core.sameInstance(l)) return !0;
                if (e.preventDefault(), e.stopPropagation(), f.$el.find("img.fr-error").left) return !1;
                f.undo.canDo() || f.undo.saveStep();
                var t = e.pageX || e.originalEvent.touches[0].pageX;
                if ("mousedown" == e.type) {
                    var n = f.$oel.get(0).ownerDocument,
                        a = n.defaultView || n.parentWindow,
                        r = !1;
                    try {
                        r = a.location != a.parent.location && !(a.$ && a.$.FE)
                    } catch (s) {}
                    r && a.frameElement && (t += f.helpers.getPX(u(a.frameElement).offset().left) + a.frameElement.clientLeft)
                }
                (c = u(this)).data("start-x", t), c.data("start-width", p.width()), c.data("start-height", p.height());
                var o = p.width();
                if (f.opts.imageResizeWithPercent) {
                    var i = p.parentsUntil(f.$el, f.html.blockTagsQuery()).get(0) || f.el;
                    o = (o / u(i).outerWidth() * 100).toFixed(2) + "%"
                }
                L(o), d.show(), f.popups.hideAll(), ue()
            }

            function _(e) {
                if (!f.core.sameInstance(l)) return !0;
                var t;
                if (c && p) {
                    if (e.preventDefault(), f.$el.find("img.fr-error").left) return !1;
                    var n = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null);
                    if (!n) return !1;
                    var a = n - c.data("start-x"),
                        r = c.data("start-width");
                    if ((c.hasClass("fr-hnw") || c.hasClass("fr-hsw")) && (a = 0 - a), f.opts.imageResizeWithPercent) {
                        var o = p.parentsUntil(f.$el, f.html.blockTagsQuery()).get(0) || f.el;
                        r = ((r + a) / u(o).outerWidth() * 100).toFixed(2), f.opts.imageRoundPercent && (r = Math.round(r)), L("".concat(r, "%")), (t = Ae() ? (f.helpers.getPX(p.parents(".fr-img-caption").css("width")) / u(o).outerWidth() * 100).toFixed(2) : (f.helpers.getPX(p.css("width")) / u(o).outerWidth() * 100).toFixed(2)) === r || f.opts.imageRoundPercent || L("".concat(t, "%")), p.css("height", "").removeAttr("height")
                    } else r + a >= f.opts.imageMinWidth && (L(r + a), t = Ae() ? f.helpers.getPX(p.parents(".fr-img-caption").css("width")) : f.helpers.getPX(p.css("width"))), t !== r + a && L(t), ((p.attr("style") || "").match(/(^height:)|(; *height:)/) || p.attr("height")) && (p.css("height", c.data("start-height") * p.width() / c.data("start-width")), p.removeAttr("height"));
                    y(), f.events.trigger("image.resize", [Ee()])
                }
            }

            function O(e) {
                if (!f.core.sameInstance(l)) return !0;
                if (c && p) {
                    if (e && e.stopPropagation(), f.$el.find("img.fr-error").left) return !1;
                    c = null, d.hide(), y(), o(), f.undo.saveStep(), f.events.trigger("image.resizeEnd", [Ee()])
                } else l.removeClass("fr-active")
            }

            function N(e, t, n) {
                f.edit.on(), p && p.addClass("fr-error"), r[e] ? D(f.language.translate(r[e])) : D(f.language.translate("Something went wrong. Please try again.")), !p && n && te(n), f.events.trigger("image.error", [{
                    code: e,
                    message: r[e]
                }, t, n])
            }

            function x(e) {
                if (e) return f.$wp && f.events.$on(f.$wp, "scroll.image-edit", function() {
                    p && f.popups.isVisible("image.edit") && (f.events.disableBlur(), o())
                }), !0;
                var t = "";
                if (0 < f.opts.imageEditButtons.length) {
                    var n = { buttons: t += '<div class="fr-buttons"> \n        '.concat(f.button.buildList(f.opts.imageEditButtons), "\n        </div>") };
                    return f.popups.create("image.edit", n)
                }
                return !1
            }

            function I(e) {
                var t = f.popups.get("image.insert");
                if (t || (t = Y()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), p) {
                    var n = Te();
                    f.popups.setContainer("image.insert", f.$sc);
                    var a = n.offset().left,
                        r = n.offset().top + n.height();
                    f.popups.show("image.insert", a, r, n.outerHeight())
                }
                void 0 === e && M(f.language.translate("Uploading"), 0)
            }

            function k(e) {
                var t = f.popups.get("image.insert");
                if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-image-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || f.$el.find("img.fr-error").length)) {
                    if (f.events.focus(), f.$el.find("img.fr-error").length && (f.$el.find("img.fr-error").remove(), f.undo.saveStep(), f.undo.run(), f.undo.dropRedo()), !f.$wp && p) {
                        var n = p;
                        de(!0), f.selection.setAfter(n.get(0)), f.selection.restore()
                    }
                    f.popups.hide("image.insert")
                }
            }

            function M(e, t) {
                var n = f.popups.get("image.insert");
                if (n) {
                    var a = n.find(".fr-image-progress-bar-layer");
                    a.find("h3").text(e + (t ? " ".concat(t, "%") : "")), a.removeClass("fr-error"), t ? (a.find("div").removeClass("fr-indeterminate"), a.find("div > span").css("width", "".concat(t, "%"))) : a.find("div").addClass("fr-indeterminate")
                }
            }

            function D(e) {
                I();
                var t = f.popups.get("image.insert").find(".fr-image-progress-bar-layer");
                t.addClass("fr-error");
                var n = t.find("h3");
                n.text(e), f.events.disableBlur(), n.focus()
            }

            function B(e) {
                ce.call(e.get(0))
            }

            function F() {
                var e = u(this);
                f.popups.hide("image.insert"), e.removeClass("fr-uploading"), e.next().is("br") && e.next().remove(), B(e), f.events.trigger("image.loaded", [e])
            }

            function $(i, e, s, l, c) {
                l && "string" == typeof l && (l = f.$(l)), f.edit.off(), M(f.language.translate("Loading image")), e && (i = f.helpers.sanitizeURL(i));
                var t = new Image;
                t.onload = function() {
                    var e, t;
                    if (l) {
                        f.undo.canDo() || l.hasClass("fr-uploading") || f.undo.saveStep();
                        var n = l.data("fr-old-src");
                        l.data("fr-image-pasted") && (n = null), f.$wp ? ((e = l.clone().removeData("fr-old-src").removeClass("fr-uploading").removeAttr("data-fr-image-pasted")).off("load"), n && l.attr("src", n), l.replaceWith(e)) : e = l;
                        for (var a = e.get(0).attributes, r = 0; r < a.length; r++) {
                            var o = a[r];
                            0 === o.nodeName.indexOf("data-") && e.removeAttr(o.nodeName)
                        }
                        if (void 0 !== s)
                            for (t in s) s.hasOwnProperty(t) && "link" != t && e.attr("data-".concat(t), s[t]);
                        e.on("load", F), e.attr("src", i), f.edit.on(), S(!1), f.undo.saveStep(), f.events.disableBlur(), f.$el.blur(), f.events.trigger(n ? "image.replaced" : "image.inserted", [e, c])
                    } else e = U(i, s, F), S(!1), f.undo.saveStep(), f.events.disableBlur(), f.$el.blur(), f.events.trigger("image.inserted", [e, c])
                }, t.onerror = function() {
                    N(a)
                }, I(f.language.translate("Loading image")), t.src = i
            }

            function P(e) {
                M(f.language.translate("Loading image"));
                var t = this.status,
                    n = this.response,
                    a = this.responseXML,
                    r = this.responseText;
                try {
                    if (f.opts.imageUploadToS3)
                        if (201 == t) {
                            var o = function s(e) {
                                try {
                                    var t = u(e).find("Location").text(),
                                        n = u(e).find("Key").text();
                                    return !1 === f.events.trigger("image.uploadedToS3", [t, n, e], !0) ? (f.edit.on(), !1) : t
                                } catch (a) {
                                    return N(m, e), !1
                                }
                            }(a);
                            o && $(o, !1, [], e, n || a)
                        } else N(m, n || a, e);
                    else if (200 <= t && t < 300) {
                        var i = function l(e) {
                            try {
                                if (!1 === f.events.trigger("image.uploaded", [e], !0)) return f.edit.on(), !1;
                                var t = JSON.parse(e);
                                return t.link ? t : (N(h, e), !1)
                            } catch (n) {
                                return N(m, e), !1
                            }
                        }(r);
                        i && $(i.link, !1, i, e, n || r)
                    } else N(g, n || r, e)
                } catch (c) {
                    N(m, n || r, e)
                }
            }

            function H() {
                N(m, this.response || this.responseText || this.responseXML)
            }

            function K(e) {
                if (e.lengthComputable) {
                    var t = e.loaded / e.total * 100 | 0;
                    M(f.language.translate("Uploading"), t)
                }
            }

            function U(e, t, n) {
                var a, r = u(document.createElement("img")).attr("src", e);
                if (t && void 0 !== t)
                    for (a in t) t.hasOwnProperty(a) && "link" != a && (" data-".concat(a, '="').concat(t[a], '"'), r.attr("data-str".concat(a), t[a]));
                var o = f.opts.imageDefaultWidth;
                o && "auto" != o && (o = f.opts.imageResizeWithPercent ? "100%" : "".concat(o, "px")), r.attr("style", o ? "width: ".concat(o, ";") : ""), he(r, f.opts.imageDefaultDisplay, f.opts.imageDefaultAlign), r.on("load", n), r.on("error", n), f.edit.on(), f.events.focus(!0), f.selection.restore(), f.undo.saveStep(), f.opts.imageSplitHTML ? f.markers.split() : f.markers.insert(), f.html.wrap();
                var i = f.$el.find(".fr-marker");
                return i.length ? (i.parent().is("hr") && i.parent().after(i), f.node.isLastSibling(i) && i.parent().hasClass("fr-deletable") && i.insertAfter(i.parent()), i.replaceWith(r)) : f.$el.append(r), f.selection.clear(), r
            }

            function W() {
                f.edit.on(), k(!0)
            }

            function V(e, t) {
                if (void 0 !== e && 0 < e.length) {
                    if (!1 === f.events.trigger("image.beforeUpload", [e, t])) return !1;
                    var n, a = e[0];
                    if ((null === f.opts.imageUploadURL || f.opts.imageUploadURL == i) && !f.opts.imageUploadToS3) return function s(r, o) {
                        var i = new FileReader;
                        i.onload = function() {
                            var e = i.result;
                            if (i.result.indexOf("svg+xml") < 0) {
                                for (var t = atob(i.result.split(",")[1]), n = [], a = 0; a < t.length; a++) n.push(t.charCodeAt(a));
                                e = window.URL.createObjectURL(new Blob([new Uint8Array(n)], { type: r.type })), f.image.insert(e, !1, null, o)
                            }
                        }, I(), i.readAsDataURL(r)
                    }(a, t || p), !1;
                    if (a.name || (a.name = (new Date).getTime() + "." + (a.type || "image/jpeg").replace(/image\//g, "")), a.size > f.opts.imageMaxSize) return N(v), !1;
                    if (f.opts.imageAllowedTypes.indexOf(a.type.replace(/image\//g, "")) < 0) return N(b), !1;
                    if (f.drag_support.formdata && (n = f.drag_support.formdata ? new FormData : null), n) {
                        var r;
                        if (!1 !== f.opts.imageUploadToS3)
                            for (r in n.append("key", f.opts.imageUploadToS3.keyStart + (new Date).getTime() + "-" + (a.name || "untitled")), n.append("success_action_status", "201"), n.append("X-Requested-With", "xhr"), n.append("Content-Type", a.type), f.opts.imageUploadToS3.params) f.opts.imageUploadToS3.params.hasOwnProperty(r) && n.append(r, f.opts.imageUploadToS3.params[r]);
                        for (r in f.opts.imageUploadParams) f.opts.imageUploadParams.hasOwnProperty(r) && n.append(r, f.opts.imageUploadParams[r]);
                        n.append(f.opts.imageUploadParam, a, a.name);
                        var o = f.opts.imageUploadURL;
                        f.opts.imageUploadToS3 && (o = f.opts.imageUploadToS3.uploadURL ? f.opts.imageUploadToS3.uploadURL : "https://".concat(f.opts.imageUploadToS3.region, ".amazonaws.com/").concat(f.opts.imageUploadToS3.bucket)),
                            function l(t, n, e, r) {
                                function o() {
                                    var e = u(this);
                                    e.off("load"), e.addClass("fr-uploading"), e.next().is("br") && e.next().remove(), f.placeholder.refresh(), B(e), y(), I(), f.edit.off(), t.onload = function() {
                                        P.call(t, e)
                                    }, t.onerror = H, t.upload.onprogress = K, t.onabort = W, u(e.off("abortUpload")).on("abortUpload", function() {
                                        4 != t.readyState && (t.abort(), r ? (r.attr("src", r.data("fr-old-src")), r.removeClass("fr-uploading")) : e.remove(), de(!0))
                                    }), t.send(n)
                                }

                                var i = new FileReader;
                                i.onload = function() {
                                    var e = i.result;
                                    if (i.result.indexOf("svg+xml") < 0) {
                                        for (var t = atob(i.result.split(",")[1]), n = [], a = 0; a < t.length; a++) n.push(t.charCodeAt(a));
                                        e = window.URL.createObjectURL(new Blob([new Uint8Array(n)], { type: "image/jpeg" }))
                                    }
                                    r ? (r.on("load", o), r.on("error", function() {
                                        o(), u(this).off("error")
                                    }), f.edit.on(), f.undo.saveStep(), r.data("fr-old-src", r.attr("src")), r.attr("src", e)) : U(e, null, o)
                                }, i.readAsDataURL(e)
                            }(f.core.getXHR(o, f.opts.imageUploadMethod), n, a, t || p)
                    }
                }
            }

            function z(e) {
                if (e.is("img") && 0 < e.parents(".fr-img-caption").length) return e.parents(".fr-img-caption")
            }

            function G(e) {
                var t = e.originalEvent.dataTransfer;
                if (t && t.files && t.files.length) {
                    var n = t.files[0];
                    if (n && n.type && -1 !== n.type.indexOf("image") && 0 <= f.opts.imageAllowedTypes.indexOf(n.type.replace(/image\//g, ""))) {
                        if (!f.opts.imageUpload) return e.preventDefault(), e.stopPropagation(), !1;
                        f.markers.remove(), f.markers.insertAtPoint(e.originalEvent), f.$el.find(".fr-marker").replaceWith($e.MARKERS), 0 === f.$el.find(".fr-marker").length && f.selection.setAtEnd(f.el), f.popups.hideAll();
                        var a = f.popups.get("image.insert");
                        a || (a = Y()), f.popups.setContainer("image.insert", f.$sc);
                        var r = e.originalEvent.pageX,
                            o = e.originalEvent.pageY;
                        if (f.opts.iframe) {
                            var i = f.helpers.getPX(f.$wp.find(".fr-iframe").css("padding-top")),
                                s = f.helpers.getPX(f.$wp.find(".fr-iframe").css("padding-left"));
                            o += f.$iframe.offset().top + i, r += f.$iframe.offset().left + s
                        }
                        return f.popups.show("image.insert", r, o), I(), 0 <= f.opts.imageAllowedTypes.indexOf(n.type.replace(/image\//g, "")) ? (de(!0), V(t.files)) : N(b), e.preventDefault(), e.stopPropagation(), !1
                    }
                }
            }

            function Y(e) {
                if (e) return f.popups.onRefresh("image.insert", E), f.popups.onHide("image.insert", T), !0;
                var t, n, a = "";
                f.opts.imageUpload || -1 === f.opts.imageInsertButtons.indexOf("imageUpload") || f.opts.imageInsertButtons.splice(f.opts.imageInsertButtons.indexOf("imageUpload"), 1);
                var r = f.button.buildList(f.opts.imageInsertButtons);
                "" !== r && (a = '<div class="fr-buttons fr-tabs">'.concat(r, "</div>"));
                var o = f.opts.imageInsertButtons.indexOf("imageUpload"),
                    i = f.opts.imageInsertButtons.indexOf("imageByURL"),
                    s = "";
                0 <= o && (t = " fr-active", 0 <= i && i < o && (t = ""), s = '<div class="fr-image-upload-layer'.concat(t, ' fr-layer" id="fr-image-upload-layer-').concat(f.id, '"><strong>').concat(f.language.translate("Drop image"), "</strong><br>(").concat(f.language.translate("or click"), ')<div class="fr-form"><input type="file" accept="image/').concat(f.opts.imageAllowedTypes.join(", image/").toLowerCase(), '" tabIndex="-1" aria-labelledby="fr-image-upload-layer-').concat(f.id, '" role="button"></div></div>'));
                var l = "";
                0 <= i && (t = " fr-active", 0 <= o && o < i && (t = ""), l = '<div class="fr-image-by-url-layer'.concat(t, ' fr-layer" id="fr-image-by-url-layer-').concat(f.id, '"><div class="fr-input-line"><input id="fr-image-by-url-layer-text-').concat(f.id, '" type="text" placeholder="http://" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageInsertByURL" tabIndex="2" role="button">').concat(f.language.translate("Insert"), "</button></div></div>"));
                var c = {
                    buttons: a,
                    upload_layer: s,
                    by_url_layer: l,
                    progress_bar: '<div class="fr-image-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="imageDismissError" tabIndex="2" role="button">OK</button></div></div>'
                };
                return 1 <= f.opts.imageInsertButtons.length && (n = f.popups.create("image.insert", c)), f.$wp && f.events.$on(f.$wp, "scroll", function() {
                        p && f.popups.isVisible("image.insert") && ve()
                    }),
                    function d(a) {
                        f.events.$on(a, "dragover dragenter", ".fr-image-upload-layer", function(e) {
                            return u(this).addClass("fr-drop"), (f.browser.msie || f.browser.edge) && e.preventDefault(), !1
                        }, !0), f.events.$on(a, "dragleave dragend", ".fr-image-upload-layer", function(e) {
                            return u(this).removeClass("fr-drop"), (f.browser.msie || f.browser.edge) && e.preventDefault(), !1
                        }, !0), f.events.$on(a, "drop", ".fr-image-upload-layer", function(e) {
                            e.preventDefault(), e.stopPropagation(), u(this).removeClass("fr-drop");
                            var t = e.originalEvent.dataTransfer;
                            if (t && t.files) {
                                var n = a.data("instance") || f;
                                n.events.disableBlur(), n.image.upload(t.files), n.events.enableBlur()
                            }
                        }, !0), f.helpers.isIOS() && f.events.$on(a, "touchstart", '.fr-image-upload-layer input[type="file"]', function() {
                            u(this).trigger("click")
                        }, !0), f.events.$on(a, "change", '.fr-image-upload-layer input[type="file"]', function() {
                            if (this.files) {
                                var e = a.data("instance") || f;
                                e.events.disableBlur(), a.find("input:focus").blur(), e.events.enableBlur(), e.image.upload(this.files, p)
                            }
                            u(this).val("")
                        }, !0)
                    }(n), n
            }

            function j() {
                p && f.popups.get("image.alt").find("input").val(p.attr("alt") || "").trigger("change")
            }

            function q() {
                var e = f.popups.get("image.alt");
                e || (e = X()), k(), f.popups.refresh("image.alt"), f.popups.setContainer("image.alt", f.$sc);
                var t = Te();
                Ae() && (t = t.find(".fr-img-wrap"));
                var n = t.offset().left + t.outerWidth() / 2,
                    a = t.offset().top + t.outerHeight();
                f.popups.show("image.alt", n, a, t.outerHeight(), !0)
            }

            function X(e) {
                if (e) return f.popups.onRefresh("image.alt", j), !0;
                var t = {
                        buttons: '<div class="fr-buttons fr-tabs">'.concat(f.button.buildList(f.opts.imageAltButtons), "</div>"),
                        alt_layer: '<div class="fr-image-alt-layer fr-layer fr-active" id="fr-image-alt-layer-'.concat(f.id, '"><div class="fr-input-line"><input id="fr-image-alt-layer-text-').concat(f.id, '" type="text" placeholder="').concat(f.language.translate("Alternative Text"), '" tabIndex="1"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetAlt" tabIndex="2" role="button">').concat(f.language.translate("Update"), "</button></div></div>")
                    },
                    n = f.popups.create("image.alt", t);
                return f.$wp && f.events.$on(f.$wp, "scroll.image-alt", function() {
                    p && f.popups.isVisible("image.alt") && q()
                }), n
            }

            function Z() {
                var e = f.popups.get("image.size");
                if (p)
                    if (Ae()) {
                        var t = p.parent();
                        t.get(0).style.width || (t = p.parent().parent()), e.find('input[name="width"]').val(t.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(t.get(0).style.height).trigger("change")
                    } else e.find('input[name="width"]').val(p.get(0).style.width).trigger("change"), e.find('input[name="height"]').val(p.get(0).style.height).trigger("change")
            }

            function Q() {
                var e = f.popups.get("image.size");
                e || (e = J()), k(), f.popups.refresh("image.size"), f.popups.setContainer("image.size", f.$sc);
                var t = Te();
                Ae() && (t = t.find(".fr-img-wrap"));
                var n = t.offset().left + t.outerWidth() / 2,
                    a = t.offset().top + t.outerHeight();
                f.popups.show("image.size", n, a, t.outerHeight(), !0)
            }

            function J(e) {
                if (e) return f.popups.onRefresh("image.size", Z), !0;
                var t = {
                        buttons: '<div class="fr-buttons fr-tabs">'.concat(f.button.buildList(f.opts.imageSizeButtons), "</div>"),
                        size_layer: '<div class="fr-image-size-layer fr-layer fr-active" id="fr-image-size-layer-'.concat(f.id, '"><div class="fr-image-group"><div class="fr-input-line"><input id="fr-image-size-layer-width-\'').concat(f.id, '" type="text" name="width" placeholder="').concat(f.language.translate("Width"), '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-image-size-layer-height').concat(f.id, '" type="text" name="height" placeholder="').concat(f.language.translate("Height"), '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="imageSetSize" tabIndex="2" role="button">').concat(f.language.translate("Update"), "</button></div></div>")
                    },
                    n = f.popups.create("image.size", t);
                return f.$wp && f.events.$on(f.$wp, "scroll.image-size", function() {
                    p && f.popups.isVisible("image.size") && Q()
                }), n
            }

            function ee(e, t, n, a) {
                return e.pageX = t, w.call(this, e), e.pageX = e.pageX + n * Math.floor(Math.pow(1.1, a)), _.call(this, e), O.call(this, e), ++a
            }

            function te(e) {
                (e = e || Te()) && !1 !== f.events.trigger("image.beforeRemove", [e]) && (f.popups.hideAll(), be(), de(!0), f.undo.canDo() || f.undo.saveStep(), e.get(0) == f.el ? e.removeAttr("src") : (e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? (f.selection.setBefore(e.get(0).parentNode) || f.selection.setAfter(e.get(0).parentNode) || e.parent().after($e.MARKERS), u(e.get(0).parentNode).remove()) : (f.selection.setBefore(e.get(0)) || f.selection.setAfter(e.get(0)) || e.after($e.MARKERS), e.remove()), f.html.fillEmptyBlocks(), f.selection.restore()), f.undo.saveStep())
            }

            function ne(e) {
                var t = e.which;
                if (p && (t == $e.KEYCODE.BACKSPACE || t == $e.KEYCODE.DELETE)) return e.preventDefault(), e.stopPropagation(), te(), !1;
                if (p && t == $e.KEYCODE.ESC) {
                    var n = p;
                    return de(!0), f.selection.setAfter(n.get(0)), f.selection.restore(), e.preventDefault(), !1
                }
                if (!p || t != $e.KEYCODE.ARROW_LEFT && t != $e.KEYCODE.ARROW_RIGHT) return p && t === $e.KEYCODE.TAB ? (e.preventDefault(), e.stopPropagation(), de(!0), !1) : p && t != $e.KEYCODE.F10 && !f.keys.isBrowserAction(e) ? (e.preventDefault(), e.stopPropagation(), !1) : void 0;
                var a = p.get(0);
                return de(!0), t == $e.KEYCODE.ARROW_LEFT ? f.selection.setBefore(a) : f.selection.setAfter(a), f.selection.restore(), e.preventDefault(), !1
            }

            function ae(e) {
                if (e && "IMG" == e.tagName) {
                    if (f.node.hasClass(e, "fr-uploading") || f.node.hasClass(e, "fr-error") ? e.parentNode.removeChild(e) : f.node.hasClass(e, "fr-draggable") && e.classList.remove("fr-draggable"), e.parentNode && e.parentNode.parentNode && f.node.hasClass(e.parentNode.parentNode, "fr-img-caption")) {
                        var t = e.parentNode.parentNode;
                        t.removeAttribute("contenteditable"), t.removeAttribute("draggable"), t.classList.remove("fr-draggable");
                        var n = e.nextSibling;
                        n && n.removeAttribute("contenteditable")
                    }
                } else if (e && e.nodeType == Node.ELEMENT_NODE)
                    for (var a = e.querySelectorAll("img.fr-uploading, img.fr-error, img.fr-draggable"), r = 0; r < a.length; r++) ae(a[r])
            }

            function re(e) {
                if (!1 === f.events.trigger("image.beforePasteUpload", [e])) return !1;
                p = u(e), y(), o(), ve(), I(), p.on("load", function() {
                    var t = [];
                    y(), u(f.popups.get("image.insert").get(0)).find("div.fr-active.fr-error").length < 1 && I(), u(this).data("events").find(function(e) {
                        "load" === e[0] && t.push(e)
                    }), t.length <= 1 && u(this).off("load")
                });
                for (var t = u(e).attr("src").split(","), n = atob(t[1]), a = [], r = 0; r < n.length; r++) a.push(n.charCodeAt(r));
                V([new Blob([new Uint8Array(a)], { type: t[0].replace(/data\:/g, "").replace(/;base64/g, "") })], p)
            }

            function oe() {
                f.opts.imagePaste ? f.$el.find("img[data-fr-image-pasted]").each(function(e, a) {
                    if (f.opts.imagePasteProcess) {
                        var t = f.opts.imageDefaultWidth;
                        t && "auto" != t && (t += f.opts.imageResizeWithPercent ? "%" : "px"), u(a).css("width", t).removeClass("fr-dii fr-dib fr-fir fr-fil"), he(u(a), f.opts.imageDefaultDisplay, f.opts.imageDefaultAlign)
                    }
                    if (0 === a.src.indexOf("data:")) re(a);
                    else if (0 === a.src.indexOf("blob:") || 0 === a.src.indexOf("http") && f.opts.imageUploadRemoteUrls && f.opts.imageCORSProxy) {
                        var n = new Image;
                        n.crossOrigin = "Anonymous", n.onload = function() {
                            var e, t = f.o_doc.createElement("CANVAS"),
                                n = t.getContext("2d");
                            t.height = this.naturalHeight, t.width = this.naturalWidth, n.drawImage(this, 0, 0), setTimeout(function() {
                                re(a)
                            }, 0), e = 2e3 < this.naturalWidth || 1500 < this.naturalHeight ? "jpeg" : "png", a.src = t.toDataURL("image/".concat(e))
                        }, n.src = (0 === a.src.indexOf("blob:") ? "" : "".concat(f.opts.imageCORSProxy, "/")) + a.src
                    } else 0 !== a.src.indexOf("http") || 0 === a.src.indexOf("https://mail.google.com/mail") ? (f.selection.save(), u(a).remove(), f.selection.restore()) : u(a).removeAttr("data-fr-image-pasted")
                }) : f.$el.find("img[data-fr-image-pasted]").remove()
            }

            function ie(e) {
                var t = e.target.result,
                    n = f.opts.imageDefaultWidth;
                n && "auto" != n && (n += f.opts.imageResizeWithPercent ? "%" : "px"), f.undo.saveStep(), f.html.insert('<img data-fr-image-pasted="true" src="'.concat(t, '"').concat(n ? ' style="width: '.concat(n, ';"') : "", ">"));
                var a = f.$el.find('img[data-fr-image-pasted="true"]');
                a && he(a, f.opts.imageDefaultDisplay, f.opts.imageDefaultAlign), f.events.trigger("paste.after")
            }

            function se(e) {
                if (e && e.clipboardData && e.clipboardData.items) {
                    var t = null;
                    if (e.clipboardData.types && -1 != [].indexOf.call(e.clipboardData.types, "text/rtf") || e.clipboardData.getData("text/rtf")) t = e.clipboardData.items[0].getAsFile();
                    else
                        for (var n = 0; n < e.clipboardData.items.length && !(t = e.clipboardData.items[n].getAsFile()); n++);
                    if (t) return function a(e) {
                        var t = new FileReader;
                        t.onload = ie, t.readAsDataURL(e)
                    }(t), !1
                }
            }

            function le(e) {
                return e = e.replace(/<img /gi, '<img data-fr-image-pasted="true" ')
            }

            function ce(e) {
                if ("false" == u(this).parents("[contenteditable]").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                if (e && "touchend" == e.type && n) return !0;
                if (e && f.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
                for (var t = 0; t < $e.INSTANCES.length; t++) $e.INSTANCES[t] != f && $e.INSTANCES[t].events.trigger("image.hideResizer");
                f.toolbar.disable(), e && (e.stopPropagation(), e.preventDefault()), f.helpers.isMobile() && (f.events.disableBlur(), f.$el.blur(), f.events.enableBlur()), f.opts.iframe && f.size.syncIframe(), p = u(this), be(), y(), o(), f.browser.msie ? (f.popups.areVisible() && f.events.disableBlur(), f.win.getSelection && (f.win.getSelection().removeAllRanges(), f.win.getSelection().addRange(f.doc.createRange()))) : f.selection.clear(), f.helpers.isIOS() && (f.events.disableBlur(), f.$el.blur()), f.button.bulkRefresh(), f.events.trigger("video.hideResizer")
            }

            function de(e) {
                p && (function t() {
                    return fe
                }() || !0 === e) && (f.toolbar.enable(), l.removeClass("fr-active"), f.popups.hide("image.edit"), p = null, ue(), c = null, d && d.hide())
            }

            r[a] = "Image cannot be loaded from the passed link.", r[h] = "No link in upload response.", r[g] = "Error during file upload.", r[m] = "Parsing response failed.", r[v] = "File is too large.", r[b] = "Image file type is invalid.", r[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.";
            var fe = !(r[8] = "Image file is corrupted.");

            function pe() {
                fe = !0
            }

            function ue() {
                fe = !1
            }

            function he(e, t, n) {
                !f.opts.htmlUntouched && f.opts.useClasses ? (e.removeClass("fr-fil fr-fir fr-dib fr-dii"), n && e.addClass("fr-fi".concat(n[0])), t && e.addClass("fr-di".concat(t[0]))) : "inline" == t ? (e.css({
                    display: "inline-block",
                    verticalAlign: "bottom",
                    margin: f.opts.imageDefaultMargin
                }), "center" == n ? e.css({
                    "float": "none",
                    marginBottom: "",
                    marginTop: "",
                    maxWidth: "calc(100% - ".concat(2 * f.opts.imageDefaultMargin, "px)"),
                    textAlign: "center"
                }) : "left" == n ? e.css({
                    "float": "left",
                    marginLeft: 0,
                    maxWidth: "calc(100% - ".concat(f.opts.imageDefaultMargin, "px)"),
                    textAlign: "left"
                }) : e.css({
                    "float": "right",
                    marginRight: 0,
                    maxWidth: "calc(100% - ".concat(f.opts.imageDefaultMargin, "px)"),
                    textAlign: "right"
                })) : "block" == t && (e.css({
                    display: "block",
                    "float": "none",
                    verticalAlign: "top",
                    margin: "".concat(f.opts.imageDefaultMargin, "px auto"),
                    textAlign: "center"
                }), "left" == n ? e.css({ marginLeft: 0, textAlign: "left" }) : "right" == n && e.css({
                    marginRight: 0,
                    textAlign: "right"
                }))
            }

            function ge(e) {
                if (void 0 === e && (e = Te()), e) {
                    if (e.hasClass("fr-fil")) return "left";
                    if (e.hasClass("fr-fir")) return "right";
                    if (e.hasClass("fr-dib") || e.hasClass("fr-dii")) return "center";
                    var t = e.css("float");
                    if (e.css("float", "none"), "block" == e.css("display")) {
                        if (e.css("float", ""), e.css("float") != t && e.css("float", t), 0 === parseInt(e.css("margin-left"), 10)) return "left";
                        if (0 === parseInt(e.css("margin-right"), 10)) return "right"
                    } else {
                        if (e.css("float", ""), e.css("float") != t && e.css("float", t), "left" == e.css("float")) return "left";
                        if ("right" == e.css("float")) return "right"
                    }
                }
                return "center"
            }

            function me(e) {
                void 0 === e && (e = Te());
                var t = e.css("float");
                return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline")
            }

            function ve() {
                var e = f.popups.get("image.insert");
                e || (e = Y()), f.popups.isVisible("image.insert") || (k(), f.popups.refresh("image.insert"), f.popups.setContainer("image.insert", f.$sc));
                var t = Te();
                Ae() && (t = t.find(".fr-img-wrap"));
                var n = t.offset().left + t.outerWidth() / 2,
                    a = t.offset().top + t.outerHeight();
                f.popups.show("image.insert", n, a, t.outerHeight(!0), !0)
            }

            function be() {
                if (p) {
                    f.events.disableBlur(), f.selection.clear();
                    var e = f.doc.createRange();
                    e.selectNode(p.get(0)), f.browser.msie && e.collapse(!0), f.selection.get().addRange(e), f.events.enableBlur()
                }
            }

            function Ee() {
                return p
            }

            function Te() {
                return Ae() ? p.parents(".fr-img-caption").first() : p
            }

            function Ae() {
                return !!p && 0 < p.parents(".fr-img-caption").length
            }

            return {
                _init: function Ce() {
                    var a;
                    (function e() {
                        f.events.$on(f.$el, f._mousedown, "IMG" == f.el.tagName ? null : 'img:not([contenteditable="false"])', function(e) {
                            if ("false" == u(this).parents("contenteditable").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                            f.helpers.isMobile() || f.selection.clear(), t = !0, f.popups.areVisible() && f.events.disableBlur(), f.browser.msie && (f.events.disableBlur(), f.$el.attr("contenteditable", !1)), f.draggable || "touchstart" == e.type || e.preventDefault(), e.stopPropagation()
                        }), f.events.$on(f.$el, f._mousedown, ".fr-img-caption .fr-inner", function(e) {
                            f.core.hasFocus() || f.events.focus(), e.stopPropagation()
                        }), f.events.$on(f.$el, "paste", ".fr-img-caption .fr-inner", function(e) {
                            f.toolbar.hide(), e.stopPropagation()
                        }), f.events.$on(f.$el, f._mouseup, "IMG" == f.el.tagName ? null : 'img:not([contenteditable="false"])', function(e) {
                            if ("false" == u(this).parents("contenteditable").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                            t && (t = !1, e.stopPropagation(), f.browser.msie && (f.$el.attr("contenteditable", !0), f.events.enableBlur()))
                        }), f.events.on("keyup", function(e) {
                            if (e.shiftKey && "" === f.selection.text().replace(/\n/g, "") && f.keys.isArrow(e.which)) {
                                var t = f.selection.element(),
                                    n = f.selection.endElement();
                                t && "IMG" == t.tagName ? B(u(t)) : n && "IMG" == n.tagName && B(u(n))
                            }
                        }, !0), f.events.on("drop", G), f.events.on("element.beforeDrop", z), f.events.on("window.mousedown", pe), f.events.on("window.touchmove", ue), f.events.on("mouseup window.mouseup", function() {
                            if (p) return de(), !1;
                            ue()
                        }), f.events.on("commands.mousedown", function(e) {
                            0 < e.parents(".fr-toolbar").length && de()
                        }), f.events.on("image.resizeEnd", function() {
                            f.opts.iframe && f.size.syncIframe()
                        }), f.events.on("blur image.hideResizer commands.undo commands.redo element.dropped", function() {
                            de(!(t = !1))
                        }), f.events.on("modals.hide", function() {
                            p && (be(), f.selection.clear())
                        }), f.events.on("image.resizeEnd", function() {
                            f.win.getSelection && B(p)
                        }), f.opts.imageAddNewLine && f.events.on("image.inserted", function(e) {
                            var t = e.get(0);
                            for (t.nextSibling && "BR" === t.nextSibling.tagName && (t = t.nextSibling); t && !f.node.isElement(t);) t = f.node.isLastSibling(t) ? t.parentNode : null;
                            f.node.isElement(t) && (f.opts.enter === $e.ENTER_BR ? e.after("<br>") : u(f.node.blockParent(e.get(0))).after("<".concat(f.html.defaultTag(), "><br></").concat(f.html.defaultTag(), ">")))
                        })
                    })(), "IMG" == f.el.tagName && f.$el.addClass("fr-view"), f.events.$on(f.$el, f.helpers.isMobile() && !f.helpers.isWindowsPhone() ? "touchend" : "click", "IMG" == f.el.tagName ? null : 'img:not([contenteditable="false"])', ce), f.helpers.isMobile() && (f.events.$on(f.$el, "touchstart", "IMG" == f.el.tagName ? null : 'img:not([contenteditable="false"])', function() {
                        n = !1
                    }), f.events.$on(f.$el, "touchmove", function() {
                        n = !0
                    })), f.$wp ? (f.events.on("window.keydown keydown", ne, !0), f.events.on("keyup", function(e) {
                        if (p && e.which == $e.KEYCODE.ENTER) return !1
                    }, !0), f.events.$on(f.$el, "keydown", function() {
                        var e = f.selection.element();
                        (e.nodeType === Node.TEXT_NODE || "BR" == e.tagName && f.node.isLastSibling(e)) && (e = e.parentNode), f.node.hasClass(e, "fr-inner") || (f.node.hasClass(e, "fr-img-caption") || (e = u(e).parents(".fr-img-caption").get(0)), f.node.hasClass(e, "fr-img-caption") && (u(e).after($e.INVISIBLE_SPACE + $e.MARKERS), f.selection.restore()))
                    })) : f.events.$on(f.$win, "keydown", ne), f.events.on("toolbar.esc", function() {
                        if (p) {
                            if (f.$wp) f.events.disableBlur(), f.events.focus();
                            else {
                                var e = p;
                                de(!0), f.selection.setAfter(e.get(0)), f.selection.restore()
                            }
                            return !1
                        }
                    }, !0), f.events.on("toolbar.focusEditor", function() {
                        if (p) return !1
                    }, !0), f.events.on("window.cut window.copy", function(e) {
                        if (p && f.popups.isVisible("image.edit") && !f.popups.get("image.edit").find(":focus").length) {
                            var t = Te();
                            Ae() ? (t.before($e.START_MARKER), t.after($e.END_MARKER), f.selection.restore(), f.paste.saveCopiedText(t.get(0).outerHTML, t.text())) : (be(), f.paste.saveCopiedText(p.get(0).outerHTML, p.attr("alt"))), "copy" == e.type ? setTimeout(function() {
                                B(p)
                            }) : (de(!0), f.undo.saveStep(), setTimeout(function() {
                                f.undo.saveStep()
                            }, 0))
                        }
                    }, !0), f.browser.msie && f.events.on("keydown", function(e) {
                        if (!f.selection.isCollapsed() || !p) return !0;
                        var t = e.which;
                        t == $e.KEYCODE.C && f.keys.ctrlKey(e) ? f.events.trigger("window.copy") : t == $e.KEYCODE.X && f.keys.ctrlKey(e) && f.events.trigger("window.cut")
                    }), f.events.$on(u(f.o_win), "keydown", function(e) {
                        var t = e.which;
                        if (p && t == $e.KEYCODE.BACKSPACE) return e.preventDefault(), !1
                    }), f.events.$on(f.$win, "keydown", function(e) {
                        var t = e.which;
                        p && p.hasClass("fr-uploading") && t == $e.KEYCODE.ESC && p.trigger("abortUpload")
                    }), f.events.on("destroy", function() {
                        p && p.hasClass("fr-uploading") && p.trigger("abortUpload")
                    }), f.events.on("paste.before", se), f.events.on("paste.beforeCleanup", le), f.events.on("paste.after", oe), f.events.on("html.set", C), f.events.on("html.inserted", C), C(), f.events.on("destroy", function() {
                        s = []
                    }), f.events.on("html.processGet", ae), f.opts.imageOutputSize && f.events.on("html.beforeGet", function() {
                        a = f.el.querySelectorAll("img");
                        for (var e = 0; e < a.length; e++) {
                            var t = a[e].style.width || u(a[e]).width(),
                                n = a[e].style.height || u(a[e]).height();
                            t && a[e].setAttribute("width", "".concat(t).replace(/px/, "")), n && a[e].setAttribute("height", "".concat(n).replace(/px/, ""))
                        }
                    }), f.opts.iframe && f.events.on("image.loaded", f.size.syncIframe), f.$wp && (S(), f.events.on("contentChanged", S)), f.events.$on(u(f.o_win), "orientationchange.image", function() {
                        setTimeout(function() {
                            p && B(p)
                        }, 100)
                    }), x(!0), Y(!0), J(!0), X(!0), f.events.on("node.remove", function(e) {
                        if ("IMG" == e.get(0).tagName) return te(e), !1
                    })
                },
                showInsertPopup: function Se() {
                    var e = f.$tb.find('.fr-command[data-cmd="insertImage"]'),
                        t = f.popups.get("image.insert");
                    if (t || (t = Y()), k(), !t.hasClass("fr-active"))
                        if (f.popups.refresh("image.insert"), f.popups.setContainer("image.insert", f.$tb), e.isVisible()) {
                            var n = f.button.getPosition(e),
                                a = n.left,
                                r = n.top;
                            f.popups.show("image.insert", a, r, e.outerHeight())
                        } else f.position.forSelection(t), f.popups.show("image.insert")
                },
                showLayer: function ye(e) {
                    var t, n, a = f.popups.get("image.insert");
                    if (p || f.opts.toolbarInline) {
                        if (p) {
                            var r = Te();
                            Ae() && (r = r.find(".fr-img-wrap")), n = r.offset().top + r.outerHeight(), t = r.offset().left
                        }
                    } else {
                        var o = f.$tb.find('.fr-command[data-cmd="insertImage"]');
                        t = o.offset().left, n = o.offset().top + (f.opts.toolbarBottom ? 10 : o.outerHeight() - 10)
                    }!p && f.opts.toolbarInline && (n = a.offset().top - f.helpers.getPX(a.css("margin-top")), a.hasClass("fr-above") && (n += a.outerHeight())), a.find(".fr-layer").removeClass("fr-active"), a.find(".fr-".concat(e, "-layer")).addClass("fr-active"), f.popups.show("image.insert", t, n, p ? p.outerHeight() : 0), f.accessibility.focusPopup(a)
                },
                refreshUploadButton: function Re(e) {
                    var t = f.popups.get("image.insert");
                    t && t.find(".fr-image-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
                },
                refreshByURLButton: function Le(e) {
                    var t = f.popups.get("image.insert");
                    t && t.find(".fr-image-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
                },
                upload: V,
                insertByURL: function we() {
                    var e = f.popups.get("image.insert").find(".fr-image-by-url-layer input");
                    if (0 < e.val().length) {
                        I(), M(f.language.translate("Loading image"));
                        var t = e.val().trim();
                        if (f.opts.imageUploadRemoteUrls && f.opts.imageCORSProxy && f.opts.imageUpload) {
                            var n = new XMLHttpRequest;
                            n.onload = function() {
                                200 == this.status ? V([new Blob([this.response], { type: this.response.type || "image/png" })], p) : N(a)
                            }, n.onerror = function() {
                                $(t, !0, [], p)
                            }, n.open("GET", "".concat(f.opts.imageCORSProxy, "/").concat(t), !0), n.responseType = "blob", n.send()
                        } else $(t, !0, [], p);
                        e.val(""), e.blur()
                    }
                },
                align: function _e(e) {
                    var t = Te();
                    t.removeClass("fr-fir fr-fil"), !f.opts.htmlUntouched && f.opts.useClasses ? "left" == e ? t.addClass("fr-fil") : "right" == e && t.addClass("fr-fir") : he(t, me(), e), be(), y(), o(), f.selection.clear()
                },
                refreshAlign: function Oe(e) {
                    p && e.find("> *").first().replaceWith(f.icon.create("image-align-".concat(ge())))
                },
                refreshAlignOnShow: function Ne(e, t) {
                    p && t.find('.fr-command[data-param1="'.concat(ge(), '"]')).addClass("fr-active").attr("aria-selected", !0)
                },
                display: function xe(e) {
                    var t = Te();
                    t.removeClass("fr-dii fr-dib"), !f.opts.htmlUntouched && f.opts.useClasses ? "inline" == e ? t.addClass("fr-dii") : "block" == e && t.addClass("fr-dib") : he(t, e, ge()), be(), y(), o(), f.selection.clear()
                },
                refreshDisplayOnShow: function Ie(e, t) {
                    p && t.find('.fr-command[data-param1="'.concat(me(), '"]')).addClass("fr-active").attr("aria-selected", !0)
                },
                replace: ve,
                back: function e() {
                    p ? (f.events.disableBlur(), u(".fr-popup input:focus").blur(), B(p)) : (f.events.disableBlur(), f.selection.restore(), f.events.enableBlur(), f.popups.hide("image.insert"), f.toolbar.showInline())
                },
                get: Ee,
                getEl: Te,
                insert: $,
                showProgressBar: I,
                remove: te,
                hideProgressBar: k,
                applyStyle: function ke(e, t, n) {
                    if (void 0 === t && (t = f.opts.imageStyles), void 0 === n && (n = f.opts.imageMultipleStyles), !p) return !1;
                    var a = Te();
                    if (!n) {
                        var r = Object.keys(t);
                        r.splice(r.indexOf(e), 1), a.removeClass(r.join(" "))
                    }
                    "object" == Fe(t[e]) ? (a.removeAttr("style"), a.css(t[e].style)) : a.toggleClass(e), B(p)
                },
                showAltPopup: q,
                showSizePopup: Q,
                setAlt: function Me(e) {
                    if (p) {
                        var t = f.popups.get("image.alt");
                        p.attr("alt", e || t.find("input").val() || ""), t.find("input:focus").blur(), B(p)
                    }
                },
                setSize: function De(e, t) {
                    if (p) {
                        var n = f.popups.get("image.size");
                        e = e || n.find('input[name="width"]').val() || "", t = t || n.find('input[name="height"]').val() || "";
                        var a = /^[\d]+((px)|%)*$/g;
                        p.removeAttr("width").removeAttr("height"), e.match(a) ? p.css("width", e) : p.css("width", ""), t.match(a) ? p.css("height", t) : p.css("height", ""), Ae() && (p.parents(".fr-img-caption").removeAttr("width").removeAttr("height"), e.match(a) ? p.parents(".fr-img-caption").css("width", e) : p.parents(".fr-img-caption").css("width", ""), t.match(a) ? p.parents(".fr-img-caption").css("height", t) : p.parents(".fr-img-caption").css("height", "")), n && n.find("input:focus").blur(), B(p)
                    }
                },
                toggleCaption: function Be() {
                    var e;
                    if (p && !Ae()) {
                        (e = p).parent().is("a") && (e = p.parent());
                        var t, n,
                            a = p.parents("ul") && 0 < p.parents("ul").length ? p.parents("ul") : p.parents("ol") && 0 < p.parents("ol").length ? p.parents("ol") : [];
                        if (0 < a.length) {
                            var r = a.find("li").length,
                                o = p.parents("li"),
                                i = document.createElement("li");
                            r - 1 === o.index() && (a.append(i), i.innerHTML = "&nbsp;")
                        }
                        e.attr("style") && (n = -1 < (t = e.attr("style").split(":")).indexOf("width") ? t[t.indexOf("width") + 1].replace(";", "") : "");
                        var s = f.opts.imageResizeWithPercent ? (-1 < n.indexOf("px") ? null : n) || "100%" : p.width() + "px";
                        e.wrap('<div class="fr-img-space-wrap"><span ' + (f.browser.mozilla ? "" : 'contenteditable="false"') + 'class="fr-img-caption ' + p.attr("class") + '" style="' + (f.opts.useClasses ? "" : e.attr("style")) + '" draggable="false"></span><p class="fr-img-space-wrap2">&nbsp;</p></div>'), e.wrap('<span class="fr-img-wrap"></span>'), p.after('<span class="fr-inner"'.concat(f.browser.mozilla ? "" : ' contenteditable="true"', ">").concat($e.START_MARKER).concat(f.language.translate("Image Caption")).concat($e.END_MARKER, "</span>")), p.removeAttr("class").removeAttr("style").removeAttr("width"), p.parents(".fr-img-caption").css("width", s), de(!0), f.selection.restore()
                    } else e = Te(), p.insertAfter(e), p.attr("class", e.attr("class").replace("fr-img-caption", "")).attr("style", e.attr("style")), e.remove(), B(p)
                },
                hasCaption: Ae,
                exitEdit: de,
                edit: B
            }
        }, $e.DefineIcon("insertImage", {
            NAME: "image",
            SVG_KEY: "insertImage"
        }), $e.RegisterShortcut($e.KEYCODE.P, "insertImage", null, "P"), $e.RegisterCommand("insertImage", {
            title: "Insert Image",
            undo: !1,
            focus: !0,
            refreshAfterCallback: !1,
            popup: !0,
            callback: function() {
                this.popups.isVisible("image.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("image.insert")) : this.image.showInsertPopup()
            },
            plugin: "image"
        }), $e.DefineIcon("imageUpload", {
            NAME: "upload",
            SVG_KEY: "upload"
        }), $e.RegisterCommand("imageUpload", {
            title: "Upload Image",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function() {
                this.image.showLayer("image-upload")
            },
            refresh: function(e) {
                this.image.refreshUploadButton(e)
            }
        }), $e.DefineIcon("imageByURL", {
            NAME: "link",
            SVG_KEY: "insertLink"
        }), $e.RegisterCommand("imageByURL", {
            title: "By URL",
            undo: !1,
            focus: !1,
            toggle: !0,
            callback: function() {
                this.image.showLayer("image-by-url")
            },
            refresh: function(e) {
                this.image.refreshByURLButton(e)
            }
        }), $e.RegisterCommand("imageInsertByURL", {
            title: "Insert Image",
            undo: !0,
            refreshAfterCallback: !1,
            callback: function() {
                this.image.insertByURL()
            },
            refresh: function(e) {
                this.image.get() ? e.text(this.language.translate("Replace")) : e.text(this.language.translate("Insert"))
            }
        }), $e.DefineIcon("imageDisplay", {
            NAME: "star",
            SVG_KEY: "imageDisplay"
        }), $e.RegisterCommand("imageDisplay", {
            title: "Display",
            type: "dropdown",
            options: { inline: "Inline", block: "Break Text" },
            callback: function(e, t) {
                this.image.display(t)
            },
            refresh: function(e) {
                this.opts.imageTextNear || e.addClass("fr-hidden")
            },
            refreshOnShow: function(e, t) {
                this.image.refreshDisplayOnShow(e, t)
            }
        }), $e.DefineIcon("image-align", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), $e.DefineIcon("image-align-left", {
            NAME: "align-left",
            SVG_KEY: "alignLeft"
        }), $e.DefineIcon("image-align-right", {
            NAME: "align-right",
            SVG_KEY: "alignRight"
        }), $e.DefineIcon("image-align-center", {
            NAME: "align-justify",
            SVG_KEY: "alignCenter"
        }), $e.DefineIcon("imageAlign", {
            NAME: "align-justify",
            SVG_KEY: "alignJustify"
        }), $e.RegisterCommand("imageAlign", {
            type: "dropdown",
            title: "Align",
            options: { left: "Align Left", center: "None", right: "Align Right" },
            html: function() {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = $e.COMMANDS.imageAlign.options;
                for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="imageAlign" data-param1="'.concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.icon.create("image-align-".concat(n)), '<span class="fr-sr-only">').concat(this.language.translate(t[n]), "</span></a></li>"));
                return e += "</ul>"
            },
            callback: function(e, t) {
                this.image.align(t)
            },
            refresh: function(e) {
                this.image.refreshAlign(e)
            },
            refreshOnShow: function(e, t) {
                this.image.refreshAlignOnShow(e, t)
            }
        }), $e.DefineIcon("imageReplace", {
            NAME: "exchange",
            FA5NAME: "exchange-alt",
            SVG_KEY: "replaceImage"
        }), $e.RegisterCommand("imageReplace", {
            title: "Replace",
            undo: !1,
            focus: !1,
            popup: !0,
            refreshAfterCallback: !1,
            callback: function() {
                this.image.replace()
            }
        }), $e.DefineIcon("imageRemove", {
            NAME: "trash",
            SVG_KEY: "remove"
        }), $e.RegisterCommand("imageRemove", {
            title: "Remove",
            callback: function() {
                this.image.remove()
            }
        }), $e.DefineIcon("imageBack", { NAME: "arrow-left", SVG_KEY: "back" }), $e.RegisterCommand("imageBack", {
            title: "Back",
            undo: !1,
            focus: !1,
            back: !0,
            callback: function() {
                this.image.back()
            },
            refresh: function(e) {
                this.$;
                this.image.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
            }
        }), $e.RegisterCommand("imageDismissError", {
            title: "OK",
            undo: !1,
            callback: function() {
                this.image.hideProgressBar(!0)
            }
        }), $e.DefineIcon("imageStyle", {
            NAME: "magic",
            SVG_KEY: "imageClass"
        }), $e.RegisterCommand("imageStyle", {
            title: "Style",
            type: "dropdown",
            html: function() {
                var e = '<ul class="fr-dropdown-list" role="presentation">',
                    t = this.opts.imageStyles;
                for (var n in t)
                    if (t.hasOwnProperty(n)) {
                        var a = t[n];
                        "object" == Fe(a) && (a = a.title), e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="imageStyle" data-param1="'.concat(n, '">').concat(this.language.translate(a), "</a></li>")
                    }
                return e += "</ul>"
            },
            callback: function(e, t) {
                this.image.applyStyle(t)
            },
            refreshOnShow: function(e, t) {
                var n = this.$,
                    a = this.image.getEl();
                a && t.find(".fr-command").each(function() {
                    var e = n(this).data("param1"),
                        t = a.hasClass(e);
                    n(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        }), $e.DefineIcon("imageAlt", { NAME: "info", SVG_KEY: "imageAltText" }), $e.RegisterCommand("imageAlt", {
            undo: !1,
            focus: !1,
            popup: !0,
            title: "Alternative Text",
            callback: function() {
                this.image.showAltPopup()
            }
        }), $e.RegisterCommand("imageSetAlt", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function() {
                this.image.setAlt()
            }
        }), $e.DefineIcon("imageSize", { NAME: "arrows-alt", SVG_KEY: "imageSize" }), $e.RegisterCommand("imageSize", {
            undo: !1,
            focus: !1,
            popup: !0,
            title: "Change Size",
            callback: function() {
                this.image.showSizePopup()
            }
        }), $e.RegisterCommand("imageSetSize", {
            undo: !0,
            focus: !1,
            title: "Update",
            refreshAfterCallback: !1,
            callback: function() {
                this.image.setSize()
            }
        }), $e.DefineIcon("imageCaption", {
            NAME: "commenting",
            FA5NAME: "comment-alt",
            SVG_KEY: "imageCaption"
        }), $e.RegisterCommand("imageCaption", {
            undo: !0,
            focus: !1,
            title: "Image Caption",
            refreshAfterCallback: !0,
            callback: function() {
                this.image.toggleCaption()
            },
            refresh: function(e) {
                this.image.get() && e.toggleClass("fr-active", this.image.hasCaption())
            }
        }), Object.assign($e.DEFAULTS, {
            imageManagerLoadURL: "https://i.froala.com/load-files",
            imageManagerLoadMethod: "get",
            imageManagerLoadParams: {},
            imageManagerPreloader: null,
            imageManagerDeleteURL: "",
            imageManagerDeleteMethod: "post",
            imageManagerDeleteParams: {},
            imageManagerPageSize: 12,
            imageManagerScrollOffset: 20,
            imageManagerToggleTags: !0
        }), $e.PLUGINS.imageManager = function(s) {
            var l, c, o, i, d, f, p, u, h, g, m, v = s.$,
                b = "image_manager",
                e = 10,
                E = 11,
                T = 12,
                A = 13,
                C = 14,
                S = 15,
                n = 21,
                a = 22,
                r = {};

            function y() {
                var e = v(window).outerWidth();
                return e < 768 ? 2 : e < 1200 ? 3 : 4
            }

            function R() {
                d.empty();
                for (var e = 0; e < m; e++) d.append('<div class="fr-list-column"></div>')
            }

            function L() {
                if (h < p.length && (d.outerHeight() <= o.outerHeight() + s.opts.imageManagerScrollOffset || o.scrollTop() + s.opts.imageManagerScrollOffset > d.outerHeight() - o.outerHeight())) {
                    u++;
                    for (var e = s.opts.imageManagerPageSize * (u - 1); e < Math.min(p.length, s.opts.imageManagerPageSize * u); e++) t(p[e])
                }
            }

            function t(r) {
                var o = new Image,
                    i = v(document.createElement("div")).attr("class", "fr-image-container fr-empty fr-image-" + g++).attr("data-loading", s.language.translate("Loading") + "..").attr("data-deleting", s.language.translate("Deleting") + "..");
                N(!1), o.onload = function() {
                    i.height(Math.floor(i.width() / o.width * o.height));
                    var n = v(document.createElement("img"));
                    if (r.thumb) n.attr("src", r.thumb);
                    else {
                        if (M(C, r), !r.url) return M(S, r), !1;
                        n.attr("src", r.url)
                    }
                    if (r.url && n.attr("data-url", r.url), r.tag)
                        if (c.find(".fr-modal-more.fr-not-available").removeClass("fr-not-available"), c.find(".fr-modal-tags").show(), 0 <= r.tag.indexOf(",")) {
                            for (var e = r.tag.split(","), t = 0; t < e.length; t++) e[t] = e[t].trim(), 0 === f.find('a[title="'.concat(e[t], '"]')).length && f.append('<a role="button" title="'.concat(e[t], '">').concat(e[t], "</a>"));
                            n.attr("data-tag", e.join())
                        } else 0 === f.find('a[title="'.concat(r.tag.trim(), '"]')).length && f.append('<a role="button" title="'.concat(r.tag.trim(), '">').concat(r.tag.trim(), "</a>")), n.attr("data-tag", r.tag.trim());
                    for (var a in r.name && n.attr("alt", r.name), r) r.hasOwnProperty(a) && "thumb" !== a && "url" !== a && "tag" !== a && n.attr("data-".concat(a), r[a]);
                    i.append(n).append(v(s.icon.create("imageManagerDelete")).addClass("fr-delete-img").attr("title", s.language.translate("Delete"))).append(v(s.icon.create("imageManagerInsert")).addClass("fr-insert-img").attr("title", s.language.translate("Insert"))), f.find(".fr-selected-tag").each(function(e, t) {
                        $(n, t.text) || i.hide()
                    }), n.on("load", function() {
                        i.removeClass("fr-empty"), i.height("auto"), h++, O(_(parseInt(n.parent().attr("class").match(/fr-image-(\d+)/)[1], 10) + 1)), N(!1), h % s.opts.imageManagerPageSize == 0 && L()
                    }), s.events.trigger("imageManager.imageLoaded", [n])
                }, o.onerror = function() {
                    h++, i.remove(), O(_(parseInt(i.attr("class").match(/fr-image-(\d+)/)[1], 10) + 1)), M(e, r), h % s.opts.imageManagerPageSize == 0 && L()
                }, o.src = r.thumb || r.url, w().append(i)
            }

            function w() {
                var a, r;
                return d.find(".fr-list-column").each(function(e, t) {
                    var n = v(t);
                    0 === e ? (r = n.outerHeight(), a = n) : n.outerHeight() < r && (r = n.outerHeight(), a = n)
                }), a
            }

            function _(e) {
                e === undefined && (e = 0);
                for (var t = [], n = g - 1; e <= n; n--) {
                    var a = d.find(".fr-image-".concat(n));
                    a.length && (t.push(a), v(document.createElement("div")).attr("id", "fr-image-hidden-container").append(a), d.find(".fr-image-".concat(n)).remove())
                }
                return t
            }

            function O(e) {
                for (var t = e.length - 1; 0 <= t; t--) w().append(e[t])
            }

            function N(e) {
                if (e === undefined && (e = !0), !l.isVisible()) return !0;
                var t = y();
                if (t !== m) {
                    m = t;
                    var n = _();
                    R(), O(n)
                }
                s.modals.resize(b), e && L()
            }

            function x(e) {
                var t = {},
                    n = e.data();
                for (var a in n) n.hasOwnProperty(a) && "url" !== a && "tag" !== a && (t[a] = n[a]);
                return t
            }

            function I(e) {
                var t = v(e.currentTarget).siblings("img"),
                    n = l.data("instance") || s,
                    a = l.data("current-image");
                if (s.modals.hide(b), n.image.showProgressBar(), a) a.data("fr-old-src", a.attr("src")), a.trigger("click");
                else {
                    n.events.focus(!0), n.selection.restore();
                    var r = n.position.getBoundingRect(),
                        o = r.left + r.width / 2 + v(s.doc).scrollLeft(),
                        i = r.top + r.height + v(s.doc).scrollTop();
                    n.popups.setContainer("image.insert", s.$sc), n.popups.show("image.insert", o, i)
                }
                n.image.insert(t.data("url"), !1, x(t), a)
            }

            function k(e) {
                var o = v(e.currentTarget).siblings("img"),
                    t = s.language.translate("Are you sure? Image will be deleted.");
                confirm(t) && (s.opts.imageManagerDeleteURL ? !1 !== s.events.trigger("imageManager.beforeDeleteImage", [o]) && (o.parent().addClass("fr-image-deleting"), v(this).ajax({
                    method: s.opts.imageManagerDeleteMethod,
                    url: s.opts.imageManagerDeleteURL,
                    data: Object.assign(Object.assign({ src: o.attr("src") }, x(o)), s.opts.imageManagerDeleteParams),
                    crossDomain: s.opts.requestWithCORS,
                    withCredentials: s.opts.requestWithCredentials,
                    headers: s.opts.requestHeaders,
                    done: function(e, t, n) {
                        s.events.trigger("imageManager.imageDeleted", [e]);
                        var a = _(parseInt(o.parent().attr("class").match(/fr-image-(\d+)/)[1], 10) + 1);
                        o.parent().remove(), O(a),
                            function r() {
                                l.find("#fr-modal-tags > a").each(function() {
                                    0 === l.find('#fr-image-list [data-tag*="'.concat(v(this).text(), '"]')).length && v(this).removeClass("fr-selected-tag").hide()
                                }), B()
                            }(), N(!0)
                    },
                    fail: function(e) {
                        M(n, e.response || e.responseText)
                    }
                })) : M(a))
            }

            function M(e, t) {
                10 <= e && e < 20 ? i.hide() : 20 <= e && e < 30 && v(".fr-image-deleting").removeClass("fr-image-deleting"), s.events.trigger("imageManager.error", [{
                    code: e,
                    message: r[e]
                }, t])
            }

            function D() {
                var e = c.find(".fr-modal-head-line").outerHeight(),
                    t = f.outerHeight();
                c.toggleClass("fr-show-tags"), c.hasClass("fr-show-tags") ? (c.css("height", e + t), o.css("marginTop", e + t), f.find("a").css("opacity", 1)) : (c.css("height", e), o.css("marginTop", e), f.find("a").css("opacity", 0))
            }

            function B() {
                var e = f.find(".fr-selected-tag");
                0 < e.length ? (d.find("img").parents().show(), e.each(function(e, a) {
                    d.find("img").each(function(e, t) {
                        var n = v(t);
                        $(n, a.text) || n.parent().hide()
                    })
                })) : d.find("img").parents().show(), O(_()), L()
            }

            function F(e) {
                e.preventDefault();
                var t = v(e.currentTarget);
                t.toggleClass("fr-selected-tag"), s.opts.imageManagerToggleTags && t.siblings("a").removeClass("fr-selected-tag"), B()
            }

            function $(e, t) {
                for (var n = (e.attr("data-tag") || "").split(","), a = 0; a < n.length; a++)
                    if (n[a] === t) return !0;
                return !1
            }

            return r[e] = "Image cannot be loaded from the passed link.", r[E] = "Error during load images request.", r[T] = "Missing imageManagerLoadURL option.", r[A] = "Parsing load response failed.", r[C] = "Missing image thumb.", r[S] = "Missing image URL.", r[n] = "Error during delete image request.", r[a] = "Missing imageManagerDeleteURL option.", {
                require: ["image"],
                _init: function P() {
                    if (!s.$wp && "IMG" !== s.el.tagName) return !1
                },
                show: function H() {
                    if (!l) {
                        var e,
                            t = '<button class="fr-command fr-btn fr-modal-more fr-not-available" id="fr-modal-more-'.concat(s.sid, '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24""><path d="').concat($e.SVG.tags, '"/></svg></button><h4 data-text="true">').concat(s.language.translate("Manage Images"), '</h4></div>\n      <div class="fr-modal-tags" id="fr-modal-tags">');
                        e = s.opts.imageManagerPreloader ? '<img class="fr-preloader" id="fr-preloader" alt="'.concat(s.language.translate("Loading"), '.." src="').concat(s.opts.imageManagerPreloader, '" style="display: none;">') : '<span class="fr-preloader" id="fr-preloader" style="display: none;">'.concat(s.language.translate("Loading"), "</span>"), e += '<div class="fr-image-list" id="fr-image-list"></div>';
                        var n = s.modals.create(b, t, e);
                        l = n.$modal, c = n.$head, o = n.$body
                    }
                    l.data("current-image", s.image.get()), s.modals.show(b), i || function a() {
                            i = l.find("#fr-preloader"), d = l.find("#fr-image-list"), f = l.find("#fr-modal-tags"), m = y(), R(), c.css("height", c.find(".fr-modal-head-line").outerHeight()), s.events.$on(v(s.o_win), "resize", function() {
                                N(!!p)
                            }), s.events.bindClick(d, ".fr-insert-img", I), s.events.bindClick(d, ".fr-delete-img", k), s.helpers.isMobile() && (s.events.bindClick(d, "div.fr-image-container", function(e) {
                                l.find(".fr-mobile-selected").removeClass("fr-mobile-selected"), v(e.currentTarget).addClass("fr-mobile-selected")
                            }), l.on(s._mousedown, function() {
                                l.find(".fr-mobile-selected").removeClass("fr-mobile-selected")
                            })), l.on(s._mousedown + " " + s._mouseup, function(e) {
                                e.stopPropagation()
                            }), l.on(s._mousedown, "*", function() {
                                s.events.disableBlur()
                            }), o.on("scroll", L), s.events.bindClick(l, "button#fr-modal-more-".concat(s.sid), D), s.events.bindClick(f, "a", F)
                        }(),
                        function r() {
                            i.show(), d.find(".fr-list-column").empty(), s.opts.imageManagerLoadURL ? v(this).ajax({
                                url: s.opts.imageManagerLoadURL,
                                method: s.opts.imageManagerLoadMethod,
                                data: s.opts.imageManagerLoadParams,
                                crossDomain: s.opts.requestWithCORS,
                                withCredentials: s.opts.requestWithCredentials,
                                headers: s.opts.requestHeaders,
                                done: function(e, t, n) {
                                    s.events.trigger("imageManager.imagesLoaded", [e]),
                                        function a(e, t) {
                                            try {
                                                d.find(".fr-list-column").empty(), g = h = u = 0, p = JSON.parse(e), L()
                                            } catch (n) {
                                                M(A, t)
                                            }
                                        }(e, n.response), i.hide()
                                },
                                fail: function(e) {
                                    M(E, e.response || e.responseText)
                                }
                            }) : M(T)
                        }()
                },
                hide: function K() {
                    s.modals.hide(b)
                }
            }
        }, !$e.PLUGINS.image) throw new Error("Image manager plugin requires image plugin.");
    return $e.DEFAULTS.imageInsertButtons.push("imageManager"), $e.RegisterCommand("imageManager", {
        title: "Browse",
        undo: !1,
        focus: !1,
        modal: !0,
        callback: function() {
            this.imageManager.show()
        },
        plugin: "imageManager"
    }), $e.DefineIcon("imageManager", {
        NAME: "folder",
        SVG_KEY: "imageManager"
    }), $e.DefineIcon("imageManagerInsert", {
        NAME: "plus",
        SVG_KEY: "add"
    }), $e.DefineIcon("imageManagerDelete", {
        NAME: "trash",
        SVG_KEY: "remove"
    }), Object.assign($e.DEFAULTS, {
        inlineClasses: {
            "fr-class-code": "Code",
            "fr-class-highlighted": "Highlighted",
            "fr-class-transparency": "Transparent"
        }
    }), $e.PLUGINS.inlineClass = function(n) {
        var a = n.$;
        return {
            apply: function t(e) {
                n.format.toggle("span", { "class": e })
            },
            refreshOnShow: function r(e, t) {
                t.find(".fr-command").each(function() {
                    var e = a(this).data("param1"),
                        t = n.format.is("span", { "class": e });
                    a(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        }
    }, $e.RegisterCommand("inlineClass", {
        type: "dropdown",
        title: "Inline Class",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.inlineClasses;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineClass" data-param1="'.concat(n, '" title="').concat(t[n], '">').concat(t[n], "</a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.inlineClass.apply(t)
        },
        refreshOnShow: function(e, t) {
            this.inlineClass.refreshOnShow(e, t)
        },
        plugin: "inlineClass"
    }), $e.DefineIcon("inlineClass", {
        NAME: "tag",
        SVG_KEY: "inlineClass"
    }), Object.assign($e.DEFAULTS, {
        inlineStyles: {
            "Big Red": "font-size: 20px; color: red;",
            "Small Blue": "font-size: 14px; color: blue;"
        }
    }), $e.PLUGINS.inlineStyle = function(r) {
        return {
            apply: function o(e) {
                for (var t = e.split(";"), n = 0; n < t.length; n++) {
                    var a = t[n].split(":");
                    t[n].length && 2 == a.length && r.format.applyStyle(a[0].trim(), a[1].trim())
                }
            }
        }
    }, $e.RegisterCommand("inlineStyle", {
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.inlineStyles;
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var a = t[n] + (-1 === t[n].indexOf("display:block;") ? " display:block;" : "");
                    e += '<li role="presentation"><span style="'.concat(a, '" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="inlineStyle" data-param1="').concat(t[n], '" title="').concat(this.language.translate(n), '">').concat(this.language.translate(n), "</a></span></li>")
                }
            return e += "</ul>"
        },
        title: "Inline Style",
        callback: function(e, t) {
            this.inlineStyle.apply(t)
        },
        plugin: "inlineStyle"
    }), $e.DefineIcon("inlineStyle", {
        NAME: "paint-brush",
        SVG_KEY: "inlineStyle"
    }), Object.assign($e.DEFAULTS, {
        lineBreakerTags: ["table", "hr", "form", "dl", "span.fr-video", ".fr-embedly", "img"],
        lineBreakerOffset: 15,
        lineBreakerHorizontalOffset: 10
    }), $e.PLUGINS.lineBreaker = function(h) {
        var g, t, r, m = h.$;

        function l(e, t) {
            var n, a, r, o, i, s, l, c;
            if (null == e) i = (o = t.parent()).offset().top, n = (l = t.offset().top) - Math.min((l - i) / 2, h.opts.lineBreakerOffset), r = o.outerWidth(), a = o.offset().left;
            else if (null == t)(s = (o = e.parent()).offset().top + o.outerHeight()) < (c = e.offset().top + e.outerHeight()) && (s = (o = m(o).parent()).offset().top + o.outerHeight()), n = c + Math.min(Math.abs(s - c) / 2, h.opts.lineBreakerOffset), r = o.outerWidth(), a = o.offset().left;
            else {
                o = e.parent();
                var d = e.offset().top + e.height(),
                    f = t.offset().top;
                if (f < d) return !1;
                n = (d + f) / 2, r = o.outerWidth(), a = o.offset().left
            }
            if (h.opts.iframe) {
                var p = h.helpers.getPX(h.$wp.find(".fr-iframe").css("padding-top")),
                    u = h.helpers.getPX(h.$wp.find(".fr-iframe").css("padding-left"));
                a += h.$iframe.offset().left - h.helpers.scrollLeft() + u, n += h.$iframe.offset().top - h.helpers.scrollTop() + p
            }
            h.$box.append(g), g.css("top", n - h.win.pageYOffset), g.css("left", a - h.win.pageXOffset), g.css("width", r), g.data("tag1", e), g.data("tag2", t), g.addClass("fr-visible").data("instance", h)
        }

        function c(e) {
            if (e) {
                var t = m(e);
                if (0 === h.$el.find(t).length) return null;
                if (e.nodeType != Node.TEXT_NODE && t.is(h.opts.lineBreakerTags.join(","))) return t;
                if (0 < t.parents(h.opts.lineBreakerTags.join(",")).length) return e = t.parents(h.opts.lineBreakerTags.join(",")).get(0), 0 !== h.$el.find(m(e)).length && m(e).is(h.opts.lineBreakerTags.join(",")) ? m(e) : null
            }
            return null
        }

        function o(e, t) {
            var n = h.doc.elementFromPoint(e, t);
            return n && !m(n).closest(".fr-line-breaker").length && !h.node.isElement(n) && n != h.$wp.get(0) && function a(e) {
                if ("undefined" != typeof e.inFroalaWrapper) return e.inFroalaWrapper;
                for (var t = e; e.parentNode && e.parentNode !== h.$wp.get(0);) e = e.parentNode;
                return t.inFroalaWrapper = e.parentNode == h.$wp.get(0), t.inFroalaWrapper
            }(n) ? n : null
        }

        function i(e, t, n) {
            for (var a = n, r = null; a <= h.opts.lineBreakerOffset && !r;)(r = o(e, t - a)) || (r = o(e, t + a)), a += n;
            return r
        }

        function d(e, t, n) {
            for (var a = null, r = 100; !a && e > h.$box.offset().left && e < h.$box.offset().left + h.$box.outerWidth() && 0 < r;)(a = o(e, t)) || (a = i(e, t, 5)), "left" == n ? e -= h.opts.lineBreakerHorizontalOffset : e += h.opts.lineBreakerHorizontalOffset, r -= h.opts.lineBreakerHorizontalOffset;
            return a
        }

        function n(e) {
            var t = r = null,
                n = null,
                a = h.doc.elementFromPoint(e.pageX - h.win.pageXOffset, e.pageY - h.win.pageYOffset);
            (t = a && ("HTML" == a.tagName || "BODY" == a.tagName || h.node.isElement(a) || 0 <= (a.getAttribute("class") || "").indexOf("fr-line-breaker")) ? ((n = i(e.pageX - h.win.pageXOffset, e.pageY - h.win.pageYOffset, 1)) || (n = d(e.pageX - h.win.pageXOffset - h.opts.lineBreakerHorizontalOffset, e.pageY - h.win.pageYOffset, "left")), n || (n = d(e.pageX - h.win.pageXOffset + h.opts.lineBreakerHorizontalOffset, e.pageY - h.win.pageYOffset, "right")), c(n)) : c(a)) ? function s(e, t) {
                var n, a, r = e.offset().top,
                    o = e.offset().top + e.outerHeight();
                if (Math.abs(o - t) <= h.opts.lineBreakerOffset || Math.abs(t - r) <= h.opts.lineBreakerOffset)
                    if (Math.abs(o - t) < Math.abs(t - r)) {
                        for (var i = (a = e.get(0)).nextSibling; i && i.nodeType == Node.TEXT_NODE && 0 === i.textContent.length;) i = i.nextSibling;
                        if (!i) return l(e, null), !0;
                        if (n = c(i)) return l(e, n), !0
                    } else {
                        if (!(a = e.get(0)).previousSibling) return l(null, e), !0;
                        if (n = c(a.previousSibling)) return l(n, e), !0
                    }
                g.removeClass("fr-visible").removeData("instance")
            }(t, e.pageY) : h.core.sameInstance(g) && g.removeClass("fr-visible").removeData("instance")
        }

        function a(e) {
            return !(g.hasClass("fr-visible") && !h.core.sameInstance(g)) && (h.popups.areVisible() || h.el.querySelector(".fr-selected-cell") ? (g.removeClass("fr-visible"), !0) : void(!1 !== t || h.edit.isDisabled() || (r && clearTimeout(r), r = setTimeout(n, 30, e))))
        }

        function s() {
            r && clearTimeout(r), g && g.hasClass("fr-visible") && g.removeClass("fr-visible").removeData("instance")
        }

        var f = function f() {
                t = !0, s()
            },
            p = function p() {
                t = !1
            };

        function u(e) {
            e.preventDefault();
            var t = g.data("instance") || h;
            g.removeClass("fr-visible").removeData("instance");
            var n = g.data("tag1"),
                a = g.data("tag2"),
                r = h.html.defaultTag();
            null == n ? r && "TD" != a.parent().get(0).tagName && 0 === a.parents(r).length ? a.before("<".concat(r, ">").concat($e.MARKERS, "<br></").concat(r, ">")) : a.before("".concat($e.MARKERS, "<br>")) : r && "TD" != n.parent().get(0).tagName && 0 === n.parents(r).length ? n.after("<".concat(r, ">").concat($e.MARKERS, "<br></").concat(r, ">")) : n.after("".concat($e.MARKERS, "<br>")), t.selection.restore(), h.toolbar.enable()
        }

        return {
            _init: function v() {
                if (!h.$wp) return !1;
                ! function e() {
                    h.shared.$line_breaker || (h.shared.$line_breaker = m(document.createElement("div")).attr("class", "fr-line-breaker").html('<a class="fr-floating-btn" role="button" tabIndex="-1" title="'.concat(h.language.translate("Break"), '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="17" y="7" width="2" height="8"/><rect x="10" y="13" width="7" height="2"/><path d="M10.000,10.000 L10.000,18.013 L5.000,14.031 L10.000,10.000 Z"/></svg></a>'))), g = h.shared.$line_breaker, h.events.on("shared.destroy", function() {
                        g.html("").removeData().remove(), g = null
                    }, !0), h.events.on("destroy", function() {
                        g.removeData("instance").removeClass("fr-visible"), m("body").first().append(g), clearTimeout(r)
                    }, !0), h.events.$on(g, "mousemove", function(e) {
                        e.stopPropagation()
                    }, !0), h.events.bindClick(g, "a", u)
                }(), t = !1, h.events.$on(h.$win, "mousemove", a), h.events.$on(m(h.win), "scroll", s), h.events.on("popups.show.table.edit", s), h.events.on("commands.after", s), h.events.$on(m(h.win), "mousedown", f), h.events.$on(m(h.win), "mouseup", p)
            }
        }
    }, Object.assign($e.DEFAULTS, {
        lineHeights: {
            Default: "",
            Single: "1",
            1.15: "1.15",
            1.5: "1.5",
            Double: "2"
        }
    }), $e.PLUGINS.lineHeight = function(a) {
        var s = a.$;
        return {
            _init: function e() {},
            apply: function r(e) {
                a.selection.save(), a.html.wrap(!0, !0, !0, !0), a.selection.restore();
                var t = a.selection.blocks();
                t.length && s(t[0]).parent().is("td") && a.format.applyStyle("line-height", e.toString()), a.selection.save();
                for (var n = 0; n < t.length; n++) s(t[n]).css("line-height", e), "" === s(t[n]).attr("style") && s(t[n]).removeAttr("style");
                a.html.unwrap(), a.selection.restore()
            },
            refreshOnShow: function o(e, t) {
                var n = a.selection.blocks();
                if (n.length) {
                    var i = s(n[0]);
                    t.find(".fr-command").each(function() {
                        var e = s(this).data("param1"),
                            t = i.attr("style"),
                            n = 0 <= (t || "").indexOf("line-height: " + e + ";");
                        if (t) {
                            var a = t.substring(t.indexOf("line-height")),
                                r = a.substr(0, a.indexOf(";")),
                                o = r && r.split(":")[1];
                            o && o.length || "Default" !== i.text() || (n = !0)
                        }
                        t && -1 !== t.indexOf("line-height") || "" !== e || (n = !0), s(this).toggleClass("fr-active", n).attr("aria-selected", n)
                    })
                }
            }
        }
    }, $e.RegisterCommand("lineHeight", {
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.lineHeights;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command '.concat(n, '" tabIndex="-1" role="option" data-cmd="lineHeight" data-param1="').concat(t[n], '" title="').concat(this.language.translate(n), '">').concat(this.language.translate(n), "</a></li>"));
            return e += "</ul>"
        },
        title: "Line Height",
        callback: function(e, t) {
            this.lineHeight.apply(t)
        },
        refreshOnShow: function(e, t) {
            this.lineHeight.refreshOnShow(e, t)
        },
        plugin: "lineHeight"
    }), $e.DefineIcon("lineHeight", {
        NAME: "arrows-v",
        FA5NAME: "arrows-alt-v",
        SVG_KEY: "lineHeight"
    }), Object.assign($e.POPUP_TEMPLATES, {
        "link.edit": "[_BUTTONS_]",
        "link.insert": "[_BUTTONS_][_INPUT_LAYER_]"
    }), Object.assign($e.DEFAULTS, {
        linkEditButtons: ["linkOpen", "linkStyle", "linkEdit", "linkRemove"],
        linkInsertButtons: ["linkBack", "|", "linkList"],
        linkAttributes: {},
        linkAutoPrefix: "http://",
        linkStyles: { "fr-green": "Green", "fr-strong": "Thick" },
        linkMultipleStyles: !0,
        linkConvertEmailAddress: !0,
        linkAlwaysBlank: !1,
        linkAlwaysNoFollow: !1,
        linkNoOpener: !0,
        linkNoReferrer: !0,
        linkList: [{ text: "Froala", href: "https://froala.com", target: "_blank" }, {
            text: "Google",
            href: "https://google.com",
            target: "_blank"
        }, { displayText: "Facebook", href: "https://facebook.com" }],
        linkText: !0
    }), $e.PLUGINS.link = function(u) {
        var h = u.$;

        function g() {
            var e = u.image ? u.image.get() : null;
            if (e || !u.$wp) return "A" == u.el.tagName ? u.el : e && e.get(0).parentNode && "A" == e.get(0).parentNode.tagName ? e.get(0).parentNode : void 0;
            var t = u.selection.ranges(0).commonAncestorContainer;
            try {
                t && (t.contains && t.contains(u.el) || !u.el.contains(t) || u.el == t) && (t = null)
            } catch (r) {
                t = null
            }
            if (t && "A" === t.tagName) return t;
            var n = u.selection.element(),
                a = u.selection.endElement();
            "A" == n.tagName || u.node.isElement(n) || (n = h(n).parentsUntil(u.$el, "a").first().get(0)), "A" == a.tagName || u.node.isElement(a) || (a = h(a).parentsUntil(u.$el, "a").first().get(0));
            try {
                a && (a.contains && a.contains(u.el) || !u.el.contains(a) || u.el == a) && (a = null)
            } catch (r) {
                a = null
            }
            try {
                n && (n.contains && n.contains(u.el) || !u.el.contains(n) || u.el == n) && (n = null)
            } catch (r) {
                n = null
            }
            return a && a == n && "A" == a.tagName ? (u.browser.msie || u.helpers.isMobile()) && (u.selection.info(n).atEnd || u.selection.info(n).atStart) ? null : n : null
        }

        function m() {
            var e, t, n, a, r = u.image ? u.image.get() : null,
                o = [];
            if (r) "A" == r.get(0).parentNode.tagName && o.push(r.get(0).parentNode);
            else if (u.win.getSelection) {
                var i = u.win.getSelection();
                if (i.getRangeAt && i.rangeCount) {
                    a = u.doc.createRange();
                    for (var s = 0; s < i.rangeCount; ++s)
                        if ((t = (e = i.getRangeAt(s)).commonAncestorContainer) && 1 != t.nodeType && (t = t.parentNode), t && "a" == t.nodeName.toLowerCase()) o.push(t);
                        else {
                            n = t.getElementsByTagName("a");
                            for (var l = 0; l < n.length; ++l) a.selectNodeContents(n[l]), a.compareBoundaryPoints(e.END_TO_START, e) < 1 && -1 < a.compareBoundaryPoints(e.START_TO_END, e) && o.push(n[l])
                        }
                }
            } else if (u.doc.selection && "Control" != u.doc.selection.type)
                if ("a" == (t = (e = u.doc.selection.createRange()).parentElement()).nodeName.toLowerCase()) o.push(t);
                else {
                    n = t.getElementsByTagName("a"), a = u.doc.body.createTextRange();
                    for (var c = 0; c < n.length; ++c) a.moveToElementText(n[c]), -1 < a.compareEndPoints("StartToEnd", e) && a.compareEndPoints("EndToStart", e) < 1 && o.push(n[c])
                }
            return o
        }

        function v(r) {
            if (u.core.hasFocus()) {
                if (o(), r && "keyup" === r.type && (r.altKey || r.which == $e.KEYCODE.ALT)) return !0;
                setTimeout(function() {
                    if (!r || r && (1 == r.which || "mouseup" != r.type)) {
                        var e = g(),
                            t = u.image ? u.image.get() : null;
                        if (e && !t) {
                            if (u.image) {
                                var n = u.node.contents(e);
                                if (1 == n.length && "IMG" == n[0].tagName) {
                                    var a = u.selection.ranges(0);
                                    return 0 === a.startOffset && 0 === a.endOffset ? h(e).before($e.MARKERS) : h(e).after($e.MARKERS), u.selection.restore(), !1
                                }
                            }
                            r && r.stopPropagation(), i(e)
                        }
                    }
                }, u.helpers.isIOS() ? 100 : 0)
            }
        }

        function i(e) {
            var t = u.popups.get("link.edit");
            t || (t = function o() {
                var e = "";
                1 <= u.opts.linkEditButtons.length && ("A" == u.el.tagName && 0 <= u.opts.linkEditButtons.indexOf("linkRemove") && u.opts.linkEditButtons.splice(u.opts.linkEditButtons.indexOf("linkRemove"), 1), e = '<div class="fr-buttons">'.concat(u.button.buildList(u.opts.linkEditButtons), "</div>"));
                var t = { buttons: e },
                    n = u.popups.create("link.edit", t);
                u.$wp && u.events.$on(u.$wp, "scroll.link-edit", function() {
                    g() && u.popups.isVisible("link.edit") && i(g())
                });
                return n
            }());
            var n = h(e);
            u.popups.isVisible("link.edit") || u.popups.refresh("link.edit"), u.popups.setContainer("link.edit", u.$sc);
            var a = n.offset().left + n.outerWidth() / 2,
                r = n.offset().top + n.outerHeight();
            u.popups.show("link.edit", a, r, n.outerHeight(), !0)
        }

        function o() {
            u.popups.hide("link.edit")
        }

        function l() {
            var e = u.popups.get("link.insert"),
                t = g();
            if (t) {
                var n, a, r = h(t),
                    o = e.find('input.fr-link-attr[type="text"]'),
                    i = e.find('input.fr-link-attr[type="checkbox"]');
                for (n = 0; n < o.length; n++)(a = h(o[n])).val(r.attr(a.attr("name") || ""));
                for (i.attr("checked", !1), n = 0; n < i.length; n++) a = h(i[n]), r.attr(a.attr("name")) == a.data("checked") && a.attr("checked", !0);
                e.find('input.fr-link-attr[type="text"][name="text"]').val(r.text())
            } else e.find('input.fr-link-attr[type="text"]').val(""), e.find('input.fr-link-attr[type="checkbox"]').attr("checked", !1), e.find('input.fr-link-attr[type="text"][name="text"]').val(u.selection.text());
            e.find("input.fr-link-attr").trigger("change"), (u.image ? u.image.get() : null) ? e.find('.fr-link-attr[name="text"]').parent().hide() : e.find('.fr-link-attr[name="text"]').parent().show()
        }

        function s(e) {
            if (e) return u.popups.onRefresh("link.insert", l), !0;
            var t = "";
            1 <= u.opts.linkInsertButtons.length && (t = '<div class="fr-buttons fr-tabs">'.concat(u.button.buildList(u.opts.linkInsertButtons), "</div>"));
            var n = "",
                a = 0;
            for (var r in n = '<div class="fr-link-insert-layer fr-layer fr-active" id="fr-link-insert-layer-'.concat(u.id, '">'), n += '<div class="fr-input-line"><input id="fr-link-insert-layer-url-'.concat(u.id, '" name="href" type="text" class="fr-link-attr" placeholder="').concat(u.language.translate("URL"), '" tabIndex="').concat(++a, '"></div>'), u.opts.linkText && (n += '<div class="fr-input-line"><input id="fr-link-insert-layer-text-'.concat(u.id, '" name="text" type="text" class="fr-link-attr" placeholder="').concat(u.language.translate("Text"), '" tabIndex="').concat(++a, '"></div>')), u.opts.linkAttributes)
                if (u.opts.linkAttributes.hasOwnProperty(r)) {
                    var o = u.opts.linkAttributes[r];
                    n += '<div class="fr-input-line"><input name="'.concat(r, '" type="text" class="fr-link-attr" placeholder="').concat(u.language.translate(o), '" tabIndex="').concat(++a, '"></div>')
                }
            u.opts.linkAlwaysBlank || (n += '<div class="fr-checkbox-line"><span class="fr-checkbox"><input name="target" class="fr-link-attr" data-checked="_blank" type="checkbox" id="fr-link-target-'.concat(u.id, '" tabIndex="').concat(++a, '"><span>').concat('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10" viewBox="0 0 32 32"><path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" fill="#FFF"></path></svg>', '</span></span><label id="fr-label-target-').concat(u.id, '">').concat(u.language.translate("Open in new tab"), "</label></div>"));
            var i = {
                    buttons: t,
                    input_layer: n += '<div class="fr-action-buttons"><button class="fr-command fr-submit" role="button" data-cmd="linkInsert" href="#" tabIndex="'.concat(++a, '" type="button">').concat(u.language.translate("Insert"), "</button></div></div>")
                },
                s = u.popups.create("link.insert", i);
            return u.$wp && u.events.$on(u.$wp, "scroll.link-insert", function() {
                (u.image ? u.image.get() : null) && u.popups.isVisible("link.insert") && f(), u.popups.isVisible("link.insert") && d()
            }), s
        }

        function c(e, t, n) {
            if (void 0 === n && (n = {}), !1 === u.events.trigger("link.beforeInsert", [e, t, n])) return !1;
            var a = u.image ? u.image.get() : null;
            a || "A" == u.el.tagName ? "A" == u.el.tagName && u.$el.focus() : (u.selection.restore(), u.popups.hide("link.insert"));
            var r = e;
            u.opts.linkConvertEmailAddress && u.helpers.isEmail(e) && !/^mailto:.*/i.test(e) && (e = "mailto:".concat(e));
            if ("" === u.opts.linkAutoPrefix || new RegExp("^(" + $e.LinkProtocols.join("|") + "):.", "i").test(e) || /^data:image.*/i.test(e) || /^(https?:|ftps?:|file:|)\/\//i.test(e) || /^([A-Za-z]:(\\){1,2}|[A-Za-z]:((\\){1,2}[^\\]+)+)(\\)?$/i.test(e) || ["/", "{", "[", "#", "(", "."].indexOf((e || "")[0]) < 0 && (e = u.opts.linkAutoPrefix + u.helpers.sanitizeURL(e)), e = u.helpers.sanitizeURL(e), u.opts.linkAlwaysBlank && (n.target = "_blank"), u.opts.linkAlwaysNoFollow && (n.rel = "nofollow"), u.helpers.isEmail(r) && (n.target = null, n.rel = null), "_blank" == n.target ? (u.opts.linkNoOpener && (n.rel ? n.rel += " noopener" : n.rel = "noopener"), u.opts.linkNoReferrer && (n.rel ? n.rel += " noreferrer" : n.rel = "noreferrer")) : null == n.target && (n.rel ? n.rel = n.rel.replace(/noopener/, "").replace(/noreferrer/, "") : n.rel = null), t = t || "", e === u.opts.linkAutoPrefix) return u.popups.get("link.insert").find('input[name="href"]').addClass("fr-error"), u.events.trigger("link.bad", [r]), !1;
            var o, i = g();
            if (i) {
                if ((o = h(i)).attr("href", e), 0 < t.length && o.text() != t && !a) {
                    for (var s = o.get(0); 1 === s.childNodes.length && s.childNodes[0].nodeType == Node.ELEMENT_NODE;) s = s.childNodes[0];
                    h(s).text(t)
                }
                for (var l in a || o.prepend($e.START_MARKER).append($e.END_MARKER), n) n[l] ? o.attr(l, n[l]) : o.removeAttr(l);
                a || u.selection.restore()
            } else {
                a ? (a.wrap('<a href="'.concat(e, '"></a>')), u.image.hasCaption() && a.parent().append(a.parents(".fr-img-caption").find(".fr-inner"))) : (u.format.remove("a"), u.selection.isCollapsed() ? (t = 0 === t.length ? r : t, u.html.insert('<a href="'.concat(e, '">').concat($e.START_MARKER).concat(t.replace(/&/g, "&amp;").replace(/</, "&lt;", ">", "&gt;")).concat($e.END_MARKER, "</a>")), u.selection.restore()) : 0 < t.length && t != u.selection.text().replace(/\n/g, "") ? (u.selection.remove(), u.html.insert('<a href="'.concat(e, '">').concat($e.START_MARKER).concat(t.replace(/&/g, "&amp;")).concat($e.END_MARKER, "</a>")), u.selection.restore()) : (! function p() {
                    if (!u.selection.isCollapsed()) {
                        u.selection.save();
                        for (var e = u.$el.find(".fr-marker").addClass("fr-unprocessed").toArray(); e.length;) {
                            var t = h(e.pop());
                            t.removeClass("fr-unprocessed");
                            var n = u.node.deepestParent(t.get(0));
                            if (n) {
                                for (var a = t.get(0), r = "", o = ""; a = a.parentNode, u.node.isBlock(a) || (r += u.node.closeTagString(a), o = u.node.openTagString(a) + o), a != n;);
                                var i = u.node.openTagString(t.get(0)) + t.html() + u.node.closeTagString(t.get(0));
                                t.replaceWith('<span id="fr-break"></span>');
                                var s = n.outerHTML;
                                s = (s = s.replace(/<span id="fr-break"><\/span>/g, r + i + o)).replace(o + r, ""), n.outerHTML = s
                            }
                            e = u.$el.find(".fr-marker.fr-unprocessed").toArray()
                        }
                        u.html.cleanEmptyTags(), u.selection.restore()
                    }
                }(), u.format.apply("a", { href: e })));
                for (var c = m(), d = 0; d < c.length; d++)(o = h(c[d])).attr(n), o.removeAttr("_moz_dirty");
                1 == c.length && u.$wp && !a && (h(c[0]).prepend($e.START_MARKER).append($e.END_MARKER), u.selection.restore())
            }
            if (a) {
                var f = u.popups.get("link.insert");
                f && f.find("input:focus").blur(), u.image.edit(a)
            } else v()
        }

        function d() {
            o();
            var e = g();
            if (e) {
                var t = u.popups.get("link.insert");
                t || (t = s()), u.popups.isVisible("link.insert") || (u.popups.refresh("link.insert"), u.selection.save(), u.helpers.isMobile() && (u.events.disableBlur(), u.$el.blur(), u.events.enableBlur())), u.popups.setContainer("link.insert", u.$sc);
                var n = (u.image ? u.image.get() : null) || h(e),
                    a = n.offset().left + n.outerWidth() / 2,
                    r = n.offset().top + n.outerHeight();
                u.popups.show("link.insert", a, r, n.outerHeight(), !0)
            }
        }

        function f() {
            var e = u.image ? u.image.getEl() : null;
            if (e) {
                var t = u.popups.get("link.insert");
                u.image.hasCaption() && (e = e.find(".fr-img-wrap")), t || (t = s()), l(), u.popups.setContainer("link.insert", u.$sc);
                var n = e.offset().left + e.outerWidth() / 2,
                    a = e.offset().top + e.outerHeight();
                u.popups.show("link.insert", n, a, e.outerHeight(), !0)
            }
        }

        return {
            _init: function e() {
                u.events.on("keyup", function(e) {
                    e.which != $e.KEYCODE.ESC && v(e)
                }), u.events.on("window.mouseup", v), u.events.$on(u.$el, "click", "a", function(e) {
                    u.edit.isDisabled() && e.preventDefault()
                }), u.helpers.isMobile() && u.events.$on(u.$doc, "selectionchange", v), s(!0), "A" == u.el.tagName && u.$el.addClass("fr-view"), u.events.on("toolbar.esc", function() {
                    if (u.popups.isVisible("link.edit")) return u.events.disableBlur(), u.events.focus(), !1
                }, !0)
            },
            remove: function n() {
                var e = g(),
                    t = u.image ? u.image.get() : null;
                if (!1 === u.events.trigger("link.beforeRemove", [e])) return !1;
                t && e ? (t.unwrap(), u.image.edit(t)) : e && (u.selection.save(), h(e).replaceWith(h(e).html()), u.selection.restore(), o())
            },
            showInsertPopup: function p() {
                var e = u.$tb.find('.fr-command[data-cmd="insertLink"]'),
                    t = u.popups.get("link.insert");
                if (t || (t = s()), !t.hasClass("fr-active"))
                    if (u.popups.refresh("link.insert"), u.popups.setContainer("link.insert", u.$tb || u.$sc), e.isVisible()) {
                        var n = u.button.getPosition(e),
                            a = n.left,
                            r = n.top;
                        u.popups.show("link.insert", a, r, e.outerHeight())
                    } else u.position.forSelection(t), u.popups.show("link.insert")
            },
            usePredefined: function b(e) {
                var t, n, a = u.opts.linkList[e],
                    r = u.popups.get("link.insert"),
                    o = r.find('input.fr-link-attr[type="text"]'),
                    i = r.find('input.fr-link-attr[type="checkbox"]');
                for (a.rel && (r.rel = a.rel), n = 0; n < o.length; n++) a[(t = h(o[n])).attr("name")] ? (t.val(a[t.attr("name")]), t.toggleClass("fr-not-empty", !0)) : "text" != t.attr("name") && t.val("");
                for (n = 0; n < i.length; n++)(t = h(i[n])).attr("checked", t.data("checked") == a[t.attr("name")]);
                u.accessibility.focusPopup(r)
            },
            insertCallback: function E() {
                var e, t, n = u.popups.get("link.insert"),
                    a = n.find('input.fr-link-attr[type="text"]'),
                    r = n.find('input.fr-link-attr[type="checkbox"]'),
                    o = (a.filter('[name="href"]').val() || "").trim(),
                    i = a.filter('[name="text"]').val(),
                    s = {};
                for (t = 0; t < a.length; t++) e = h(a[t]), ["href", "text"].indexOf(e.attr("name")) < 0 && (s[e.attr("name")] = e.val());
                for (t = 0; t < r.length; t++)(e = h(r[t])).is(":checked") ? s[e.attr("name")] = e.data("checked") : s[e.attr("name")] = e.data("unchecked") || null;
                n.rel && (s.rel = n.rel);
                var l = u.helpers.scrollTop();
                c(o, i, s), h(u.o_win).scrollTop(l)
            },
            insert: c,
            update: d,
            get: g,
            allSelected: m,
            back: function t() {
                u.image && u.image.get() ? u.image.back() : (u.events.disableBlur(), u.selection.restore(), u.events.enableBlur(), g() && u.$wp ? (u.selection.restore(), o(), v()) : "A" == u.el.tagName ? (u.$el.focus(), v()) : (u.popups.hide("link.insert"), u.toolbar.showInline()))
            },
            imageLink: f,
            applyStyle: function T(e, t, n) {
                void 0 === n && (n = u.opts.linkMultipleStyles), void 0 === t && (t = u.opts.linkStyles);
                var a = g();
                if (!a) return !1;
                if (!n) {
                    var r = Object.keys(t);
                    r.splice(r.indexOf(e), 1), h(a).removeClass(r.join(" "))
                }
                h(a).toggleClass(e), v()
            }
        }
    }, $e.DefineIcon("insertLink", {
        NAME: "link",
        SVG_KEY: "insertLink"
    }), $e.RegisterShortcut($e.KEYCODE.K, "insertLink", null, "K"), $e.RegisterCommand("insertLink", {
        title: "Insert Link",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("link.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("link.insert")) : this.link.showInsertPopup()
        },
        plugin: "link"
    }), $e.DefineIcon("linkOpen", {
        NAME: "external-link",
        FA5NAME: "external-link-alt",
        SVG_KEY: "openLink"
    }), $e.RegisterCommand("linkOpen", {
        title: "Open Link",
        undo: !1,
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
        },
        callback: function() {
            var e = this.link.get();
            e && (-1 !== e.href.indexOf("mailto:") ? this.o_win.open(e.href).close() : (e.target || (e.target = "_self"), this.browser.msie || this.browser.edge ? this.o_win.open(e.href, e.target) : this.o_win.open(e.href, e.target, "noopener")), this.popups.hide("link.edit"))
        },
        plugin: "link"
    }), $e.DefineIcon("linkEdit", { NAME: "edit", SVG_KEY: "edit" }), $e.RegisterCommand("linkEdit", {
        title: "Edit Link",
        undo: !1,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.link.update()
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
        },
        plugin: "link"
    }), $e.DefineIcon("linkRemove", {
        NAME: "unlink",
        SVG_KEY: "unlink"
    }), $e.RegisterCommand("linkRemove", {
        title: "Unlink",
        callback: function() {
            this.link.remove()
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
        },
        plugin: "link"
    }), $e.DefineIcon("linkBack", { NAME: "arrow-left", SVG_KEY: "back" }), $e.RegisterCommand("linkBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.back()
        },
        refresh: function(e) {
            var t = this.link.get() && this.doc.hasFocus();
            (this.image ? this.image.get() : null) || t || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
        },
        plugin: "link"
    }), $e.DefineIcon("linkList", {
        NAME: "search",
        SVG_KEY: "search"
    }), $e.RegisterCommand("linkList", {
        title: "Choose Link",
        type: "dropdown",
        focus: !1,
        undo: !1,
        refreshAfterCallback: !1,
        html: function() {
            for (var e = '<ul class="fr-dropdown-list" role="presentation">', t = this.opts.linkList, n = 0; n < t.length; n++) e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkList" data-param1="'.concat(n, '">').concat(t[n].displayText || t[n].text, "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.link.usePredefined(t)
        },
        plugin: "link"
    }), $e.RegisterCommand("linkInsert", {
        focus: !1,
        refreshAfterCallback: !1,
        callback: function() {
            this.link.insertCallback()
        },
        refresh: function(e) {
            this.link.get() ? e.text(this.language.translate("Update")) : e.text(this.language.translate("Insert"))
        },
        plugin: "link"
    }), $e.DefineIcon("imageLink", {
        NAME: "link",
        SVG_KEY: "insertLink"
    }), $e.RegisterCommand("imageLink", {
        title: "Insert Link",
        undo: !1,
        focus: !1,
        popup: !0,
        callback: function() {
            this.link.imageLink()
        },
        refresh: function(e) {
            var t;
            this.link.get() ? ((t = e.prev()).hasClass("fr-separator") && t.removeClass("fr-hidden"), e.addClass("fr-hidden")) : ((t = e.prev()).hasClass("fr-separator") && t.addClass("fr-hidden"), e.removeClass("fr-hidden"))
        },
        plugin: "link"
    }), $e.DefineIcon("linkStyle", {
        NAME: "magic",
        SVG_KEY: "linkStyles"
    }), $e.RegisterCommand("linkStyle", {
        title: "Style",
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.linkStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="linkStyle" data-param1="'.concat(n, '">').concat(this.language.translate(t[n]), "</a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.link.applyStyle(t)
        },
        refreshOnShow: function(e, t) {
            var n = this.$,
                a = this.link.get();
            if (a) {
                var r = n(a);
                t.find(".fr-command").each(function() {
                    var e = n(this).data("param1"),
                        t = r.hasClass(e);
                    n(this).toggleClass("fr-active", t).attr("aria-selected", t)
                })
            }
        },
        refresh: function(e) {
            this.link.get() ? e.removeClass("fr-hidden") : e.addClass("fr-hidden")
        },
        plugin: "link"
    }), Object.assign($e.DEFAULTS, { listAdvancedTypes: !0 }), $e.PLUGINS.lists = function(f) {
        var p = f.$;

        function u(e) {
            return '<span class="fr-open-'.concat(e.toLowerCase(), '"></span>')
        }

        function h(e) {
            return '<span class="fr-close-'.concat(e.toLowerCase(), '"></span>')
        }

        function o(e, t) {
            ! function c(e, t) {
                for (var n = [], a = 0; a < e.length; a++) {
                    var r = e[a].parentNode;
                    "LI" == e[a].tagName && r.tagName != t && n.indexOf(r) < 0 && n.push(r)
                }
                for (var o = n.length - 1; 0 <= o; o--) {
                    var i = p(n[o]);
                    i.replaceWith("<".concat(t.toLowerCase(), " ").concat(f.node.attributes(i.get(0)), ">").concat(i.html(), "</").concat(t.toLowerCase(), ">"))
                }
            }(e, t);
            var n, a = f.html.defaultTag(),
                r = null;
            e.length && (n = "rtl" == f.opts.direction || "rtl" == p(e[0]).css("direction") ? "margin-right" : "margin-left");
            for (var o = 0; o < e.length; o++)
                if ("TD" != e[o].tagName && "TH" != e[o].tagName && "LI" != e[o].tagName) {
                    var i = f.helpers.getPX(p(e[o]).css(n)) || 0;
                    (e[o].style.marginLeft = null) === r && (r = i);
                    var s = 0 < r ? "<".concat(t, ' style="').concat(n, ": ").concat(r, 'px ">') : "<".concat(t, ">"),
                        l = "</".concat(t, ">");
                    for (i -= r; 0 < i / f.opts.indentMargin;) s += "</".concat(t, ">"), l += l, i -= f.opts.indentMargin;
                    a && e[o].tagName.toLowerCase() == a ? p(e[o]).replaceWith("".concat(s, "<li").concat(f.node.attributes(e[o]), ">").concat(p(e[o]).html(), "</li>").concat(l)) : p(e[o]).wrap("".concat(s, "<li></li>").concat(l))
                }
            f.clean.lists()
        }

        function i(e) {
            var t, n;
            for (t = e.length - 1; 0 <= t; t--)
                for (n = t - 1; 0 <= n; n--)
                    if (p(e[n]).find(e[t]).length || e[n] == e[t]) {
                        e.splice(t, 1);
                        break
                    }
            var a = [];
            for (t = 0; t < e.length; t++) {
                var r = p(e[t]),
                    o = e[t].parentNode,
                    i = r.attr("class");
                if (r.before(h(o.tagName)), "LI" == o.parentNode.tagName) r.before(h("LI")), r.after(u("LI"));
                else {
                    var s = "";
                    i && (s += ' class="'.concat(i, '"'));
                    var l = "rtl" == f.opts.direction || "rtl" == r.css("direction") ? "margin-right" : "margin-left";
                    f.helpers.getPX(p(o).css(l)) && 0 <= (p(o).attr("style") || "").indexOf("".concat(l, ":")) && (s += ' style="'.concat(l, ":").concat(f.helpers.getPX(p(o).css(l)), 'px;"')), f.html.defaultTag() && 0 === r.find(f.html.blockTagsQuery()).length && r.wrapInner(f.html.defaultTag() + s), f.node.isEmpty(r.get(0), !0) || 0 !== r.find(f.html.blockTagsQuery()).length || r.append("<br>"), r.append(u("LI")), r.prepend(h("LI"))
                }
                r.after(u(o.tagName)), "LI" == o.parentNode.tagName && (o = o.parentNode.parentNode), a.indexOf(o) < 0 && a.push(o)
            }
            for (t = 0; t < a.length; t++) {
                var c = p(a[t]),
                    d = c.html();
                d = (d = d.replace(/<span class="fr-close-([a-z]*)"><\/span>/g, "</$1>")).replace(/<span class="fr-open-([a-z]*)"><\/span>/g, "<$1>"), c.replaceWith(f.node.openTagString(c.get(0)) + d + f.node.closeTagString(c.get(0)))
            }
            f.$el.find("li:empty").remove(), f.$el.find("ul:empty, ol:empty").remove(), f.clean.lists(), f.html.wrap()
        }

        function s(e) {
            f.selection.save();
            for (var t = 0; t < e.length; t++) {
                var n = e[t].previousSibling;
                if (n) {
                    var a = p(e[t]).find("> ul, > ol").last().get(0);
                    if (a) {
                        var r = p(document.createElement("li"));
                        p(a).prepend(r);
                        for (var o = f.node.contents(e[t])[0]; o && !f.node.isList(o);) {
                            var i = o.nextSibling;
                            r.append(o), o = i
                        }
                        p(n).append(p(a)), p(e[t]).remove()
                    } else {
                        var s = p(n).find("> ul, > ol").last().get(0);
                        if (s) p(s).append(p(e[t]));
                        else {
                            var l = p("<".concat(e[t].parentNode.tagName, ">"));
                            p(n).append(l), l.append(p(e[t]))
                        }
                    }
                }
            }
            f.clean.lists(), f.selection.restore()
        }

        function l(e) {
            f.selection.save(), i(e), f.selection.restore()
        }

        function e(e) {
            if ("indent" == e || "outdent" == e) {
                var t = !1,
                    n = f.selection.blocks(),
                    a = [],
                    r = n[0].previousSibling || n[0].parentElement;
                if ("outdent" == e) {
                    if ("LI" == r.tagName || "LI" != r.parentNode.tagName) return
                } else if (!n[0].previousSibling || "LI" != n[0].previousSibling.tagName) return;
                for (var o = 0; o < n.length; o++) "LI" == n[o].tagName ? (t = !0, a.push(n[o])) : "LI" == n[o].parentNode.tagName && (t = !0, a.push(n[o].parentNode));
                t && ("indent" == e ? s(a) : l(a))
            }
        }

        return {
            _init: function t() {
                f.events.on("commands.after", e), f.events.on("keydown", function(e) {
                    if (e.which == $e.KEYCODE.TAB) {
                        for (var t = f.selection.blocks(), n = [], a = 0; a < t.length; a++) "LI" == t[a].tagName ? n.push(t[a]) : "LI" == t[a].parentNode.tagName && n.push(t[a].parentNode);
                        if (1 < n.length || n.length && (f.selection.info(n[0]).atStart || f.node.isEmpty(n[0]))) return e.preventDefault(), e.stopPropagation(), e.shiftKey ? l(n) : s(n), !1
                    }
                }, !0)
            },
            format: function c(e, t) {
                var n, a;
                for (f.html.syncInputs(), f.selection.save(), f.html.wrap(!0, !0, !0, !0), f.selection.restore(), a = f.selection.blocks(), n = 0; n < a.length; n++) "LI" != a[n].tagName && "LI" == a[n].parentNode.tagName && (a[n] = a[n].parentNode);
                if (f.selection.save(), function r(e, t) {
                        for (var n = !0, a = 0; a < e.length; a++) {
                            if ("LI" != e[a].tagName) return !1;
                            e[a].parentNode.tagName != t && (n = !1)
                        }
                        return n
                    }(a, e) ? t || i(a) : o(a, e), f.html.unwrap(), f.selection.restore(), t = t || "default") {
                    for (a = f.selection.blocks(), n = 0; n < a.length; n++) "LI" != a[n].tagName && "LI" == a[n].parentNode.tagName && (a[n] = a[n].parentNode);
                    for (n = 0; n < a.length; n++) "LI" == a[n].tagName && (p(a[n].parentNode).css("list-style-type", "default" === t ? "" : t), 0 === (p(a[n].parentNode).attr("style") || "").length && p(a[n].parentNode).removeAttr("style"))
                }
            },
            refresh: function r(e, t) {
                var n = p(f.selection.element());
                if (n.get(0) != f.el) {
                    var a = n.get(0);
                    (a = "LI" != a.tagName && a.firstElementChild && "LI" != a.firstElementChild.tagName ? n.parents("li").get(0) : "LI" == a.tagName || a.firstElementChild ? a.firstElementChild && "LI" == a.firstElementChild.tagName ? n.get(0).firstChild : n.get(0) : n.parents("li").get(0)) && a.parentNode.tagName == t && f.el.contains(a.parentNode) && e.addClass("fr-active")
                }
            }
        }
    }, $e.DefineIcon("formatOLSimple", {
        NAME: "list-ol",
        SVG_KEY: "orderedList"
    }), $e.RegisterCommand("formatOLSimple", {
        title: "Ordered List",
        type: "button",
        options: { "default": "Default", circle: "Circle", disc: "Disc", square: "Square" },
        refresh: function(e) {
            this.lists.refresh(e, "OL")
        },
        callback: function(e, t) {
            this.lists.format("OL", t)
        },
        plugin: "lists"
    }), $e.RegisterCommand("formatUL", {
        title: "Unordered List",
        type: "button",
        hasOptions: function() {
            return this.opts.listAdvancedTypes
        },
        options: { "default": "Default", circle: "Circle", disc: "Disc", square: "Square" },
        refresh: function(e) {
            this.lists.refresh(e, "UL")
        },
        callback: function(e, t) {
            this.lists.format("UL", t)
        },
        plugin: "lists"
    }), $e.RegisterCommand("formatOL", {
        title: "Ordered List",
        hasOptions: function() {
            return this.opts.listAdvancedTypes
        },
        options: {
            "default": "Default",
            "lower-alpha": "Lower Alpha",
            "lower-greek": "Lower Greek",
            "lower-roman": "Lower Roman",
            "upper-alpha": "Upper Alpha",
            "upper-roman": "Upper Roman"
        },
        refresh: function(e) {
            this.lists.refresh(e, "OL")
        },
        callback: function(e, t) {
            this.lists.format("OL", t)
        },
        plugin: "lists"
    }), $e.DefineIcon("formatUL", {
        NAME: "list-ul",
        SVG_KEY: "unorderedList"
    }), $e.DefineIcon("formatOL", {
        NAME: "list-ol",
        SVG_KEY: "orderedList"
    }), Object.assign($e.DEFAULTS, {
        paragraphFormat: {
            N: "Normal",
            H1: "Heading 1",
            H2: "Heading 2",
            H3: "Heading 3",
            H4: "Heading 4",
            PRE: "Code"
        },
        paragraphFormatSelection: !1,
        paragraphDefaultSelection: "Paragraph Format"
    }), $e.PLUGINS.paragraphFormat = function(p) {
        var u = p.$;

        function h(e, t) {
            var n = p.html.defaultTag();
            if (t && t.toLowerCase() != n)
                if (0 < e.find("ul, ol").length) {
                    var a = u("<" + t + ">");
                    e.prepend(a);
                    for (var r = p.node.contents(e.get(0))[0]; r && ["UL", "OL"].indexOf(r.tagName) < 0;) {
                        var o = r.nextSibling;
                        a.append(r), r = o
                    }
                } else e.html("<" + t + ">" + e.html() + "</" + t + ">")
        }

        return {
            apply: function g(e) {
                "N" == e && (e = p.html.defaultTag()), p.selection.save(), p.html.wrap(!0, !0, !p.opts.paragraphFormat.BLOCKQUOTE, !0, !0), p.selection.restore();
                var t, n, a, r, o, i, s, l, c = p.selection.blocks();
                p.selection.save(), p.$el.find("pre").attr("skip", !0);
                for (var d = 0; d < c.length; d++)
                    if (c[d].tagName != e && !p.node.isList(c[d])) {
                        var f = u(c[d]);
                        "LI" == c[d].tagName ? h(f, e) : "LI" == c[d].parentNode.tagName && c[d] ? (i = f, s = e, l = p.html.defaultTag(), s && s.toLowerCase() != l || (s = 'div class="fr-temp-div"'), i.replaceWith(u("<" + s + ">").html(i.html()))) : 0 <= ["TD", "TH"].indexOf(c[d].parentNode.tagName) ? (a = f, r = e, o = p.html.defaultTag(), r || (r = 'div class="fr-temp-div"' + (p.node.isEmpty(a.get(0), !0) ? ' data-empty="true"' : "")), r.toLowerCase() == o ? (p.node.isEmpty(a.get(0), !0) || a.append("<br/>"), a.replaceWith(a.html())) : a.replaceWith(u("<" + r + ">").html(a.html()))) : (t = f, (n = e) || (n = 'div class="fr-temp-div"' + (p.node.isEmpty(t.get(0), !0) ? ' data-empty="true"' : "")), "H1" != n && "H2" != n && "H3" != n && "H4" != n && "H5" != n || !p.node.attributes(t.get(0)).includes("font-size:") ? t.replaceWith(u("<" + n + " " + p.node.attributes(t.get(0)) + ">").html(t.html()).removeAttr("data-empty")) : t.replaceWith(u("<" + n + " " + p.node.attributes(t.get(0)).replace(/font-size:[0-9]+px;?/, "") + ">").html(t.html()).removeAttr("data-empty")))
                    }
                p.$el.find('pre:not([skip="true"]) + pre:not([skip="true"])').each(function() {
                    u(this).prev().append("<br>" + u(this).html()), u(this).remove()
                }), p.$el.find("pre").removeAttr("skip"), p.html.unwrap(), p.selection.restore()
            },
            refreshOnShow: function i(e, t) {
                var n = p.selection.blocks();
                if (n.length) {
                    var a = n[0],
                        r = "N",
                        o = p.html.defaultTag();
                    a.tagName.toLowerCase() != o && a != p.el && (r = a.tagName), t.find('.fr-command[data-param1="' + r + '"]').addClass("fr-active").attr("aria-selected", !0)
                } else t.find('.fr-command[data-param1="N"]').addClass("fr-active").attr("aria-selected", !0)
            },
            refresh: function o(e) {
                if (p.opts.paragraphFormatSelection) {
                    var t = p.selection.blocks();
                    if (t.length) {
                        var n = t[0],
                            a = "N",
                            r = p.html.defaultTag();
                        n.tagName.toLowerCase() != r && n != p.el && (a = n.tagName), 0 <= ["LI", "TD", "TH"].indexOf(a) && (a = "N"), e.find(">span").text(p.language.translate(p.opts.paragraphFormat[a]))
                    } else e.find(">span").text(p.language.translate(p.opts.paragraphFormat.N))
                }
            }
        }
    }, $e.RegisterCommand("paragraphFormat", {
        type: "dropdown",
        displaySelection: function(e) {
            return e.opts.paragraphFormatSelection
        },
        defaultSelection: function(e) {
            return e.language.translate(e.opts.paragraphDefaultSelection)
        },
        displaySelectionWidth: 80,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.paragraphFormat;
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var a = this.shortcuts.get("paragraphFormat." + n);
                    a = a ? '<span class="fr-shortcut">' + a + "</span>" : "", e += '<li role="presentation"><' + ("N" == n ? this.html.defaultTag() || "DIV" : n) + ' style="padding: 0 !important; margin: 0 !important;" role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="paragraphFormat" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></" + ("N" == n ? this.html.defaultTag() || "DIV" : n) + "></li>"
                }
            return e += "</ul>"
        },
        title: "Paragraph Format",
        callback: function(e, t) {
            this.paragraphFormat.apply(t)
        },
        refresh: function(e) {
            this.paragraphFormat.refresh(e)
        },
        refreshOnShow: function(e, t) {
            this.paragraphFormat.refreshOnShow(e, t)
        },
        plugin: "paragraphFormat"
    }), $e.DefineIcon("paragraphFormat", {
        NAME: "paragraph",
        SVG_KEY: "paragraphFormat"
    }), Object.assign($e.DEFAULTS, {
        paragraphStyles: {
            "fr-text-gray": "Gray",
            "fr-text-bordered": "Bordered",
            "fr-text-spaced": "Spaced",
            "fr-text-uppercase": "Uppercase"
        },
        paragraphMultipleStyles: !0
    }), $e.PLUGINS.paragraphStyle = function(s) {
        var l = s.$;
        return {
            _init: function e() {},
            apply: function c(e, t, n) {
                void 0 === t && (t = s.opts.paragraphStyles), void 0 === n && (n = s.opts.paragraphMultipleStyles);
                var a = "";
                n || ((a = Object.keys(t)).splice(a.indexOf(e), 1), a = a.join(" ")), s.selection.save(), s.html.wrap(!0, !0, !0, !0), s.selection.restore();
                var r = s.selection.blocks();
                s.selection.save();
                for (var o = l(r[0]).hasClass(e), i = 0; i < r.length; i++) l(r[i]).removeClass(a).toggleClass(e, !o), l(r[i]).hasClass("fr-temp-div") && l(r[i]).removeClass("fr-temp-div"), "" === l(r[i]).attr("class") && l(r[i]).removeAttr("class");
                s.html.unwrap(), s.selection.restore()
            },
            refreshOnShow: function r(e, t) {
                var n = s.selection.blocks();
                if (n.length) {
                    var a = l(n[0]);
                    t.find(".fr-command").each(function() {
                        var e = l(this).data("param1"),
                            t = a.hasClass(e);
                        l(this).toggleClass("fr-active", t).attr("aria-selected", t)
                    })
                }
            }
        }
    }, $e.RegisterCommand("paragraphStyle", {
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.paragraphStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command '.concat(n, '" tabIndex="-1" role="option" data-cmd="paragraphStyle" data-param1="').concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.language.translate(t[n]), "</a></li>"));
            return e += "</ul>"
        },
        title: "Paragraph Style",
        callback: function(e, t) {
            this.paragraphStyle.apply(t)
        },
        refreshOnShow: function(e, t) {
            this.paragraphStyle.refreshOnShow(e, t)
        },
        plugin: "paragraphStyle"
    }), $e.DefineIcon("paragraphStyle", {
        NAME: "magic",
        SVG_KEY: "paragraphStyle"
    }), Object.assign($e.DEFAULTS, { html2pdf: window.html2pdf }), $e.PLUGINS.print = function(l) {
        return {
            run: function e() {
                ! function s(e) {
                    var t = l.html.get(),
                        n = null;
                    l.shared.print_iframe ? n = l.shared.print_iframe : ((n = document.createElement("iframe")).name = "fr-print", n.style.position = "fixed", n.style.top = "0", n.style.left = "-9999px", n.style.height = "100%", n.style.width = "0", n.style.overflow = "hidden", n.style["z-index"] = "2147483647", n.style.tabIndex = "-1", l.events.on("shared.destroy", function() {
                        n.remove()
                    }), l.shared.print_iframe = n);
                    try {
                        document.body.removeChild(n)
                    } catch (i) {}
                    document.body.appendChild(n);
                    var a = function a() {
                        e(), n.removeEventListener("load", a)
                    };
                    n.addEventListener("load", a);
                    var r = n.contentWindow;
                    r.document.open(), r.document.write("<!DOCTYPE html><html " + (l.opts.documentReady ? 'style="margin: 0; padding: 0;"' : "") + "><head><title>" + document.title + "</title>"), Array.prototype.forEach.call(document.querySelectorAll("style"), function(e) {
                        e = e.cloneNode(!0), r.document.write(e.outerHTML)
                    });
                    var o = document.querySelectorAll("link[rel=stylesheet]");
                    Array.prototype.forEach.call(o, function(e) {
                        var t = document.createElement("link");
                        t.rel = e.rel, t.href = e.href, t.media = "print", t.type = "text/css", t.media = "all", r.document.write(t.outerHTML)
                    }), r.document.write('</head><body style="height:auto;text-align: ' + ("rtl" == l.opts.direction ? "right" : "left") + "; direction: " + l.opts.direction + "; " + (l.opts.documentReady ? " padding: 2cm; width: 17cm; margin: 0;" : "") + '"><div class="fr-view">'), r.document.write(t), r.document.write("</div></body></html>"), r.document.close()
                }(function() {
                    setTimeout(function() {
                        l.events.disableBlur(), window.frames["fr-print"].focus(), window.frames["fr-print"].print(), l.$win.get(0).focus(), l.events.disableBlur(), l.events.focus()
                    }, 0)
                })
            },
            toPDF: function t() {
                l.opts.html2pdf && (l.$el.css("text-align", "right"), l.opts.html2pdf().set({
                    margin: [10, 20],
                    html2canvas: { useCORS: !0 }
                }).from(l.el).save(), setTimeout(function() {
                    l.$el.css("text-align", "")
                }, 100))
            }
        }
    }, $e.DefineIcon("print", { NAME: "print", SVG_KEY: "print" }), $e.RegisterCommand("print", {
        title: "Print",
        undo: !1,
        focus: !1,
        plugin: "print",
        callback: function() {
            this.print.run()
        }
    }), $e.DefineIcon("getPDF", {
        NAME: "file-pdf-o",
        FA5NAME: "file-pdf",
        SVG_KEY: "pdfExport"
    }), $e.RegisterCommand("getPDF", {
        title: "Download PDF",
        type: "button",
        focus: !1,
        undo: !1,
        callback: function() {
            this.print.toPDF()
        }
    }), Object.assign($e.DEFAULTS, {
        quickInsertButtons: ["image", "video", "embedly", "table", "ul", "ol", "hr"],
        quickInsertTags: ["p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "pre", "blockquote"],
        quickInsertEnabled: !0
    }), $e.QUICK_INSERT_BUTTONS = {}, $e.DefineIcon("quickInsert", {
        SVG_KEY: "add",
        template: "svg"
    }), $e.RegisterQuickInsertButton = function(e, t) {
        $e.QUICK_INSERT_BUTTONS[e] = Object.assign({ undo: !0 }, t)
    }, $e.RegisterQuickInsertButton("image", {
        icon: "insertImage",
        requiredPlugin: "image",
        title: "Insert Image",
        undo: !1,
        callback: function() {
            var e = this,
                t = e.$;
            e.shared.$qi_image_input || (e.shared.$qi_image_input = t(document.createElement("input")).attr("accept", "image/" + e.opts.imageAllowedTypes.join(", image/").toLowerCase()).attr("name", "quickInsertImage".concat(this.id)).attr("style", "display: none;").attr("type", "file"), t("body").first().append(e.shared.$qi_image_input), e.events.$on(e.shared.$qi_image_input, "change", function() {
                var e = t(this).data("inst");
                this.files && (e.quickInsert.hide(), e.image.upload(this.files)), t(this).val("")
            }, !0)), e.$qi_image_input = e.shared.$qi_image_input, e.helpers.isMobile() && e.selection.save(), e.events.disableBlur(), e.$qi_image_input.data("inst", e)[0].click()
        }
    }), $e.RegisterQuickInsertButton("video", {
        icon: "insertVideo",
        requiredPlugin: "video",
        title: "Insert Video",
        undo: !1,
        callback: function() {
            var e = prompt(this.language.translate("Paste the URL of the video you want to insert."));
            e && this.video.insertByURL(e)
        }
    }), $e.RegisterQuickInsertButton("embedly", {
        icon: "embedly",
        requiredPlugin: "embedly",
        title: "Embed URL",
        undo: !1,
        callback: function() {
            var e = prompt(this.language.translate("Paste the URL of any web content you want to insert."));
            e && this.embedly.add(e)
        }
    }), $e.RegisterQuickInsertButton("table", {
        icon: "insertTable",
        requiredPlugin: "table",
        title: "Insert Table",
        callback: function() {
            this.table.insert(2, 2)
        }
    }), $e.RegisterQuickInsertButton("ol", {
        icon: "formatOL",
        requiredPlugin: "lists",
        title: "Ordered List",
        callback: function() {
            this.lists.format("OL")
        }
    }), $e.RegisterQuickInsertButton("ul", {
        icon: "formatUL",
        requiredPlugin: "lists",
        title: "Unordered List",
        callback: function() {
            this.lists.format("UL")
        }
    }), $e.RegisterQuickInsertButton("hr", {
        icon: "insertHR",
        title: "Insert Horizontal Line",
        callback: function() {
            this.commands.insertHR()
        }
    }), $e.PLUGINS.quickInsert = function(i) {
        var s, l, c = i.$;

        function n(e) {
            var t, n, a;
            (t = e.offset().top - i.$box.offset().top, n = (i.$iframe && i.$iframe.offset().left || 0) + e.offset().left < s.outerWidth() ? e.offset().left + s.outerWidth() : 0 - s.outerWidth(), i.opts.enter != $e.ENTER_BR) ? a = (s.outerHeight() - e.outerHeight()) / 2: (c(document.createElement("span")).html($e.INVISIBLE_SPACE).insertAfter(e), a = (s.outerHeight() - e.next().outerHeight()) / 2, e.next().remove());
            if (i.opts.iframe) {
                var r = i.helpers.getPX(i.$wp.find(".fr-iframe").css("padding-top"));
                t += i.$iframe.offset().top + r
            }
            s.hasClass("fr-on") && 0 <= t && l.css("top", t - a), 0 <= t && t - Math.abs(a) <= i.$box.outerHeight() - e.outerHeight() ? (s.hasClass("fr-hidden") && (s.hasClass("fr-on") && d(), s.removeClass("fr-hidden")), s.css("top", t - a)) : s.hasClass("fr-visible") && (s.addClass("fr-hidden"), f()), s.css("left", n)
        }

        function a() {
            if (i.core.hasFocus()) {
                var e = i.selection.element();
                if (i.opts.enter == $e.ENTER_BR || i.node.isBlock(e) || (e = i.node.blockParent(e)), i.opts.enter == $e.ENTER_BR && !i.node.isBlock(e)) {
                    var t = i.node.deepestParent(e);
                    t && (e = t)
                }
                var n = function n() {
                        return i.opts.enter != $e.ENTER_BR && i.node.isEmpty(e) && 0 <= i.opts.quickInsertTags.indexOf(e.tagName.toLowerCase())
                    },
                    a = function a() {
                        return i.opts.enter == $e.ENTER_BR && ("BR" == e.tagName && (!e.previousSibling || "BR" == e.previousSibling.tagName || i.node.isBlock(e.previousSibling)) || i.node.isEmpty(e) && (!e.previousSibling || "BR" == e.previousSibling.tagName || i.node.isBlock(e.previousSibling)) && (!e.nextSibling || "BR" == e.nextSibling.tagName || i.node.isBlock(e.nextSibling)))
                    };
                e && (n() || a()) ? s && s.data("tag").is(c(e)) && s.hasClass("fr-on") ? f() : i.selection.isCollapsed() && r(c(e)) : o()
            }
        }

        function o() {
            s && (s.hasClass("fr-on") && f(), s.removeClass("fr-visible fr-on"), s.css("left", -9999).css("top", -9999))
        }

        function d(e) {
            if (e && e.preventDefault(), s.hasClass("fr-on") && !s.hasClass("fr-hidden")) f();
            else {
                if (!i.shared.$qi_helper) {
                    for (var t = i.opts.quickInsertButtons, n = '<div class="fr-qi-helper">', a = 0, r = 0; r < t.length; r++) {
                        var o = $e.QUICK_INSERT_BUTTONS[t[r]];
                        o && (!o.requiredPlugin || $e.PLUGINS[o.requiredPlugin] && 0 <= i.opts.pluginsEnabled.indexOf(o.requiredPlugin)) && (n += '<a class="fr-btn fr-floating-btn" role="button" title="'.concat(i.language.translate(o.title), '" tabIndex="-1" data-cmd="').concat(t[r], '" style="transition-delay: ').concat(.025 * a++, 's;">').concat(i.icon.create(o.icon), "</a>"))
                    }
                    n += "</div>", i.shared.$qi_helper = c(n), i.tooltip.bind(i.shared.$qi_helper, "a.fr-btn"), i.events.$on(i.shared.$qi_helper, "mousedown", function(e) {
                        e.preventDefault()
                    }, !0)
                }
                l = i.shared.$qi_helper, i.$box.append(l), setTimeout(function() {
                    l.css("top", parseFloat(s.css("top"))), l.css("left", parseFloat(s.css("left")) + s.outerWidth()), l.find("a").addClass("fr-size-1"), s.addClass("fr-on")
                }, 10)
            }
        }

        function f() {
            var n = i.$box.find(".fr-qi-helper");
            n.length && function() {
                for (var t = n.find("a"), e = 0; e < t.length; e++) ! function(e) {
                    setTimeout(function() {
                        n.children().eq(t.length - 1 - e).removeClass("fr-size-1")
                    }, 25 * e)
                }(e);
                setTimeout(function() {
                    n.css("left", -9999), s && !s.hasClass("fr-hidden") && s.removeClass("fr-on")
                }, 25 * e)
            }()
        }

        function p() {
            s.hasClass("fr-visible") && n(s.data("tag"))
        }

        return {
            _init: function e() {
                if (!i.$wp || !i.opts.quickInsertEnabled) return !1;
                i.popups.onShow("image.edit", o), i.events.on("mouseup", a), i.helpers.isMobile() && i.events.$on(c(i.o_doc), "selectionchange", a), i.events.on("blur", o), i.events.on("keyup", a), i.events.on("keydown", function() {
                    setTimeout(function() {
                        a()
                    }, 0)
                })
            },
            hide: o
        }
    }, $e.PLUGINS.quote = function(r) {
        var o = r.$;

        function i(e) {
            for (; e.parentNode && e.parentNode != r.el;) e = e.parentNode;
            return e
        }

        return {
            apply: function t(e) {
                r.selection.save(), r.html.wrap(!0, !0, !0, !0), r.selection.restore(), "increase" == e ? function a() {
                    var e, t = r.selection.blocks();
                    for (e = 0; e < t.length; e++) t[e] = i(t[e]);
                    r.selection.save();
                    var n = o(document.createElement("blockquote"));
                    for (n.insertBefore(t[0]), e = 0; e < t.length; e++) n.append(t[e]);
                    r.html.unwrap(), r.selection.restore()
                }() : "decrease" == e && function n() {
                    var e, t = r.selection.blocks();
                    for (e = 0; e < t.length; e++) "BLOCKQUOTE" != t[e].tagName && (t[e] = o(t[e]).parentsUntil(r.$el, "BLOCKQUOTE").get(0));
                    for (r.selection.save(), e = 0; e < t.length; e++) t[e] && o(t[e]).replaceWith(t[e].innerHTML);
                    r.html.unwrap(), r.selection.restore()
                }()
            }
        }
    }, $e.RegisterShortcut($e.KEYCODE.SINGLE_QUOTE, "quote", "increase", "'"), $e.RegisterShortcut($e.KEYCODE.SINGLE_QUOTE, "quote", "decrease", "'", !0), $e.RegisterCommand("quote", {
        title: "Quote",
        type: "dropdown",
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = { increase: "Increase", decrease: "Decrease" };
            for (var n in t)
                if (t.hasOwnProperty(n)) {
                    var a = this.shortcuts.get("quote.".concat(n));
                    e += '<li role="presentation"><a class="fr-command fr-active '.concat(n, '" tabIndex="-1" role="option" data-cmd="quote" data-param1="').concat(n, '" title="').concat(t[n], '">').concat(this.language.translate(t[n])).concat(a ? '<span class="fr-shortcut">'.concat(a, "</span>") : "", "</a></li>")
                }
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.quote.apply(t)
        },
        plugin: "quote"
    }), $e.DefineIcon("quote", {
        NAME: "quote-left",
        SVG_KEY: "blockquote"
    }), Object.assign($e.DEFAULTS, {
        saveInterval: 1e4,
        saveURL: null,
        saveParams: {},
        saveParam: "body",
        saveMethod: "POST"
    }), $e.PLUGINS.save = function(s) {
        var l = s.$,
            e = null,
            c = null,
            t = !1,
            d = 1,
            f = 2,
            n = {};

        function p(e, t) {
            s.events.trigger("save.error", [{ code: e, message: n[e] }, t])
        }

        function a(e) {
            void 0 === e && (e = s.html.get());
            var a = e,
                t = s.events.trigger("save.before", [e]);
            if (!1 === t) return !1;
            if ("string" == typeof t && (e = t), s.opts.saveURL) {
                var n = {};
                for (var r in s.opts.saveParams)
                    if (s.opts.saveParams.hasOwnProperty(r)) {
                        var o = s.opts.saveParams[r];
                        n[r] = "function" == typeof o ? o.call(this) : o
                    }
                var i = {};
                i[s.opts.saveParam] = e, l(this).ajax({
                    method: s.opts.saveMethod,
                    url: s.opts.saveURL,
                    data: Object.assign(i, n),
                    crossDomain: s.opts.requestWithCORS,
                    withCredentials: s.opts.requestWithCredentials,
                    headers: s.opts.requestHeaders,
                    done: function(e, t, n) {
                        c = a, s.events.trigger("save.after", [e])
                    },
                    fail: function(e) {
                        p(f, e.response || e.responseText)
                    }
                })
            } else p(d)
        }

        function r() {
            clearTimeout(e), e = setTimeout(function() {
                var e = s.html.get();
                (c != e || t) && (t = !1, a(c = e))
            }, 0)
        }

        return n[d] = "Missing saveURL option.", n[f] = "Something went wrong during save.", {
            _init: function o() {
                s.opts.saveInterval && (c = s.html.get(), s.events.on("contentChanged", function() {
                    setTimeout(r, s.opts.saveInterval)
                }), s.events.on("keydown destroy", function() {
                    clearTimeout(e)
                }))
            },
            save: a,
            reset: function i() {
                r(), t = !1
            },
            force: function u() {
                t = !0
            }
        }
    }, $e.DefineIcon("save", { NAME: "floppy-o", FA5NAME: "save" }), $e.RegisterCommand("save", {
        title: "Save",
        undo: !1,
        focus: !1,
        refreshAfterCallback: !1,
        callback: function() {
            this.save.save()
        },
        plugin: "save"
    }), Object.assign($e.DEFAULTS, {
        specialCharactersSets: [{
            title: "Latin",
            "char": "&iexcl;",
            list: [{ "char": "&iexcl;", desc: "INVERTED EXCLAMATION MARK" }, {
                "char": "&cent;",
                desc: "CENT SIGN"
            }, { "char": "&pound;", desc: "POUND SIGN" }, { "char": "&curren;", desc: "CURRENCY SIGN" }, {
                "char": "&yen;",
                desc: "YEN SIGN"
            }, { "char": "&brvbar;", desc: "BROKEN BAR" }, { "char": "&sect;", desc: "SECTION SIGN" }, {
                "char": "&uml;",
                desc: "DIAERESIS"
            }, { "char": "&copy;", desc: "COPYRIGHT SIGN" }, {
                "char": "&trade;",
                desc: "TRADEMARK SIGN"
            }, { "char": "&ordf;", desc: "FEMININE ORDINAL INDICATOR" }, {
                "char": "&laquo;",
                desc: "LEFT-POINTING DOUBLE ANGLE QUOTATION MARK"
            }, { "char": "&not;", desc: "NOT SIGN" }, { "char": "&reg;", desc: "REGISTERED SIGN" }, {
                "char": "&macr;",
                desc: "MACRON"
            }, { "char": "&deg;", desc: "DEGREE SIGN" }, { "char": "&plusmn;", desc: "PLUS-MINUS SIGN" }, {
                "char": "&sup2;",
                desc: "SUPERSCRIPT TWO"
            }, { "char": "&sup3;", desc: "SUPERSCRIPT THREE" }, {
                "char": "&acute;",
                desc: "ACUTE ACCENT"
            }, { "char": "&micro;", desc: "MICRO SIGN" }, { "char": "&para;", desc: "PILCROW SIGN" }, {
                "char": "&middot;",
                desc: "MIDDLE DOT"
            }, { "char": "&cedil;", desc: "CEDILLA" }, { "char": "&sup1;", desc: "SUPERSCRIPT ONE" }, {
                "char": "&ordm;",
                desc: "MASCULINE ORDINAL INDICATOR"
            }, { "char": "&raquo;", desc: "RIGHT-POINTING DOUBLE ANGLE QUOTATION MARK" }, {
                "char": "&frac14;",
                desc: "VULGAR FRACTION ONE QUARTER"
            }, { "char": "&frac12;", desc: "VULGAR FRACTION ONE HALF" }, {
                "char": "&frac34;",
                desc: "VULGAR FRACTION THREE QUARTERS"
            }, { "char": "&iquest;", desc: "INVERTED QUESTION MARK" }, {
                "char": "&Agrave;",
                desc: "LATIN CAPITAL LETTER A WITH GRAVE"
            }, { "char": "&Aacute;", desc: "LATIN CAPITAL LETTER A WITH ACUTE" }, {
                "char": "&Acirc;",
                desc: "LATIN CAPITAL LETTER A WITH CIRCUMFLEX"
            }, { "char": "&Atilde;", desc: "LATIN CAPITAL LETTER A WITH TILDE" }, {
                "char": "&Auml;",
                desc: "LATIN CAPITAL LETTER A WITH DIAERESIS "
            }, { "char": "&Aring;", desc: "LATIN CAPITAL LETTER A WITH RING ABOVE" }, {
                "char": "&AElig;",
                desc: "LATIN CAPITAL LETTER AE"
            }, { "char": "&Ccedil;", desc: "LATIN CAPITAL LETTER C WITH CEDILLA" }, {
                "char": "&Egrave;",
                desc: "LATIN CAPITAL LETTER E WITH GRAVE"
            }, { "char": "&Eacute;", desc: "LATIN CAPITAL LETTER E WITH ACUTE" }, {
                "char": "&Ecirc;",
                desc: "LATIN CAPITAL LETTER E WITH CIRCUMFLEX"
            }, { "char": "&Euml;", desc: "LATIN CAPITAL LETTER E WITH DIAERESIS" }, {
                "char": "&Igrave;",
                desc: "LATIN CAPITAL LETTER I WITH GRAVE"
            }, { "char": "&Iacute;", desc: "LATIN CAPITAL LETTER I WITH ACUTE" }, {
                "char": "&Icirc;",
                desc: "LATIN CAPITAL LETTER I WITH CIRCUMFLEX"
            }, { "char": "&Iuml;", desc: "LATIN CAPITAL LETTER I WITH DIAERESIS" }, {
                "char": "&ETH;",
                desc: "LATIN CAPITAL LETTER ETH"
            }, { "char": "&Ntilde;", desc: "LATIN CAPITAL LETTER N WITH TILDE" }, {
                "char": "&Ograve;",
                desc: "LATIN CAPITAL LETTER O WITH GRAVE"
            }, { "char": "&Oacute;", desc: "LATIN CAPITAL LETTER O WITH ACUTE" }, {
                "char": "&Ocirc;",
                desc: "LATIN CAPITAL LETTER O WITH CIRCUMFLEX"
            }, { "char": "&Otilde;", desc: "LATIN CAPITAL LETTER O WITH TILDE" }, {
                "char": "&Ouml;",
                desc: "LATIN CAPITAL LETTER O WITH DIAERESIS"
            }, { "char": "&times;", desc: "MULTIPLICATION SIGN" }, {
                "char": "&Oslash;",
                desc: "LATIN CAPITAL LETTER O WITH STROKE"
            }, { "char": "&Ugrave;", desc: "LATIN CAPITAL LETTER U WITH GRAVE" }, {
                "char": "&Uacute;",
                desc: "LATIN CAPITAL LETTER U WITH ACUTE"
            }, { "char": "&Ucirc;", desc: "LATIN CAPITAL LETTER U WITH CIRCUMFLEX" }, {
                "char": "&Uuml;",
                desc: "LATIN CAPITAL LETTER U WITH DIAERESIS"
            }, { "char": "&Yacute;", desc: "LATIN CAPITAL LETTER Y WITH ACUTE" }, {
                "char": "&THORN;",
                desc: "LATIN CAPITAL LETTER THORN"
            }, { "char": "&szlig;", desc: "LATIN SMALL LETTER SHARP S" }, {
                "char": "&agrave;",
                desc: "LATIN SMALL LETTER A WITH GRAVE"
            }, { "char": "&aacute;", desc: "LATIN SMALL LETTER A WITH ACUTE " }, {
                "char": "&acirc;",
                desc: "LATIN SMALL LETTER A WITH CIRCUMFLEX"
            }, { "char": "&atilde;", desc: "LATIN SMALL LETTER A WITH TILDE" }, {
                "char": "&auml;",
                desc: "LATIN SMALL LETTER A WITH DIAERESIS"
            }, { "char": "&aring;", desc: "LATIN SMALL LETTER A WITH RING ABOVE" }, {
                "char": "&aelig;",
                desc: "LATIN SMALL LETTER AE"
            }, { "char": "&ccedil;", desc: "LATIN SMALL LETTER C WITH CEDILLA" }, {
                "char": "&egrave;",
                desc: "LATIN SMALL LETTER E WITH GRAVE"
            }, { "char": "&eacute;", desc: "LATIN SMALL LETTER E WITH ACUTE" }, {
                "char": "&ecirc;",
                desc: "LATIN SMALL LETTER E WITH CIRCUMFLEX"
            }, { "char": "&euml;", desc: "LATIN SMALL LETTER E WITH DIAERESIS" }, {
                "char": "&igrave;",
                desc: "LATIN SMALL LETTER I WITH GRAVE"
            }, { "char": "&iacute;", desc: "LATIN SMALL LETTER I WITH ACUTE" }, {
                "char": "&icirc;",
                desc: "LATIN SMALL LETTER I WITH CIRCUMFLEX"
            }, { "char": "&iuml;", desc: "LATIN SMALL LETTER I WITH DIAERESIS" }, {
                "char": "&eth;",
                desc: "LATIN SMALL LETTER ETH"
            }, { "char": "&ntilde;", desc: "LATIN SMALL LETTER N WITH TILDE" }, {
                "char": "&ograve;",
                desc: "LATIN SMALL LETTER O WITH GRAVE"
            }, { "char": "&oacute;", desc: "LATIN SMALL LETTER O WITH ACUTE" }, {
                "char": "&ocirc;",
                desc: "LATIN SMALL LETTER O WITH CIRCUMFLEX"
            }, { "char": "&otilde;", desc: "LATIN SMALL LETTER O WITH TILDE" }, {
                "char": "&ouml;",
                desc: "LATIN SMALL LETTER O WITH DIAERESIS"
            }, { "char": "&divide;", desc: "DIVISION SIGN" }, {
                "char": "&oslash;",
                desc: "LATIN SMALL LETTER O WITH STROKE"
            }, { "char": "&ugrave;", desc: "LATIN SMALL LETTER U WITH GRAVE" }, {
                "char": "&uacute;",
                desc: "LATIN SMALL LETTER U WITH ACUTE"
            }, { "char": "&ucirc;", desc: "LATIN SMALL LETTER U WITH CIRCUMFLEX" }, {
                "char": "&uuml;",
                desc: "LATIN SMALL LETTER U WITH DIAERESIS"
            }, { "char": "&yacute;", desc: "LATIN SMALL LETTER Y WITH ACUTE" }, {
                "char": "&thorn;",
                desc: "LATIN SMALL LETTER THORN"
            }, { "char": "&yuml;", desc: "LATIN SMALL LETTER Y WITH DIAERESIS" }]
        }, {
            title: "Greek",
            "char": "&Alpha;",
            list: [{ "char": "&Alpha;", desc: "GREEK CAPITAL LETTER ALPHA" }, {
                "char": "&Beta;",
                desc: "GREEK CAPITAL LETTER BETA"
            }, { "char": "&Gamma;", desc: "GREEK CAPITAL LETTER GAMMA" }, {
                "char": "&Delta;",
                desc: "GREEK CAPITAL LETTER DELTA"
            }, { "char": "&Epsilon;", desc: "GREEK CAPITAL LETTER EPSILON" }, {
                "char": "&Zeta;",
                desc: "GREEK CAPITAL LETTER ZETA"
            }, { "char": "&Eta;", desc: "GREEK CAPITAL LETTER ETA" }, {
                "char": "&Theta;",
                desc: "GREEK CAPITAL LETTER THETA"
            }, { "char": "&Iota;", desc: "GREEK CAPITAL LETTER IOTA" }, {
                "char": "&Kappa;",
                desc: "GREEK CAPITAL LETTER KAPPA"
            }, { "char": "&Lambda;", desc: "GREEK CAPITAL LETTER LAMBDA" }, {
                "char": "&Mu;",
                desc: "GREEK CAPITAL LETTER MU"
            }, { "char": "&Nu;", desc: "GREEK CAPITAL LETTER NU" }, {
                "char": "&Xi;",
                desc: "GREEK CAPITAL LETTER XI"
            }, { "char": "&Omicron;", desc: "GREEK CAPITAL LETTER OMICRON" }, {
                "char": "&Pi;",
                desc: "GREEK CAPITAL LETTER PI"
            }, { "char": "&Rho;", desc: "GREEK CAPITAL LETTER RHO" }, {
                "char": "&Sigma;",
                desc: "GREEK CAPITAL LETTER SIGMA"
            }, { "char": "&Tau;", desc: "GREEK CAPITAL LETTER TAU" }, {
                "char": "&Upsilon;",
                desc: "GREEK CAPITAL LETTER UPSILON"
            }, { "char": "&Phi;", desc: "GREEK CAPITAL LETTER PHI" }, {
                "char": "&Chi;",
                desc: "GREEK CAPITAL LETTER CHI"
            }, { "char": "&Psi;", desc: "GREEK CAPITAL LETTER PSI" }, {
                "char": "&Omega;",
                desc: "GREEK CAPITAL LETTER OMEGA"
            }, { "char": "&alpha;", desc: "GREEK SMALL LETTER ALPHA" }, {
                "char": "&beta;",
                desc: "GREEK SMALL LETTER BETA"
            }, { "char": "&gamma;", desc: "GREEK SMALL LETTER GAMMA" }, {
                "char": "&delta;",
                desc: "GREEK SMALL LETTER DELTA"
            }, { "char": "&epsilon;", desc: "GREEK SMALL LETTER EPSILON" }, {
                "char": "&zeta;",
                desc: "GREEK SMALL LETTER ZETA"
            }, { "char": "&eta;", desc: "GREEK SMALL LETTER ETA" }, {
                "char": "&theta;",
                desc: "GREEK SMALL LETTER THETA"
            }, { "char": "&iota;", desc: "GREEK SMALL LETTER IOTA" }, {
                "char": "&kappa;",
                desc: "GREEK SMALL LETTER KAPPA"
            }, { "char": "&lambda;", desc: "GREEK SMALL LETTER LAMBDA" }, {
                "char": "&mu;",
                desc: "GREEK SMALL LETTER MU"
            }, { "char": "&nu;", desc: "GREEK SMALL LETTER NU" }, {
                "char": "&xi;",
                desc: "GREEK SMALL LETTER XI"
            }, { "char": "&omicron;", desc: "GREEK SMALL LETTER OMICRON" }, {
                "char": "&pi;",
                desc: "GREEK SMALL LETTER PI"
            }, { "char": "&rho;", desc: "GREEK SMALL LETTER RHO" }, {
                "char": "&sigmaf;",
                desc: "GREEK SMALL LETTER FINAL SIGMA"
            }, { "char": "&sigma;", desc: "GREEK SMALL LETTER SIGMA" }, {
                "char": "&tau;",
                desc: "GREEK SMALL LETTER TAU"
            }, { "char": "&upsilon;", desc: "GREEK SMALL LETTER UPSILON" }, {
                "char": "&phi;",
                desc: "GREEK SMALL LETTER PHI"
            }, { "char": "&chi;", desc: "GREEK SMALL LETTER CHI" }, {
                "char": "&psi;",
                desc: "GREEK SMALL LETTER PSI"
            }, { "char": "&omega;", desc: "GREEK SMALL LETTER OMEGA" }, {
                "char": "&thetasym;",
                desc: "GREEK THETA SYMBOL"
            }, { "char": "&upsih;", desc: "GREEK UPSILON WITH HOOK SYMBOL" }, {
                "char": "&straightphi;",
                desc: "GREEK PHI SYMBOL"
            }, { "char": "&piv;", desc: "GREEK PI SYMBOL" }, {
                "char": "&Gammad;",
                desc: "GREEK LETTER DIGAMMA"
            }, { "char": "&gammad;", desc: "GREEK SMALL LETTER DIGAMMA" }, {
                "char": "&varkappa;",
                desc: "GREEK KAPPA SYMBOL"
            }, { "char": "&varrho;", desc: "GREEK RHO SYMBOL" }, {
                "char": "&straightepsilon;",
                desc: "GREEK LUNATE EPSILON SYMBOL"
            }, { "char": "&backepsilon;", desc: "GREEK REVERSED LUNATE EPSILON SYMBOL" }]
        }, {
            title: "Cyrillic",
            "char": "&#x400",
            list: [{ "char": "&#x400", desc: "CYRILLIC CAPITAL LETTER IE WITH GRAVE" }, {
                "char": "&#x401",
                desc: "CYRILLIC CAPITAL LETTER IO"
            }, { "char": "&#x402", desc: "CYRILLIC CAPITAL LETTER DJE" }, {
                "char": "&#x403",
                desc: "CYRILLIC CAPITAL LETTER GJE"
            }, { "char": "&#x404", desc: "CYRILLIC CAPITAL LETTER UKRAINIAN IE" }, {
                "char": "&#x405",
                desc: "CYRILLIC CAPITAL LETTER DZE"
            }, { "char": "&#x406", desc: "CYRILLIC CAPITAL LETTER BYELORUSSIAN-UKRAINIAN I" }, {
                "char": "&#x407",
                desc: "CYRILLIC CAPITAL LETTER YI"
            }, { "char": "&#x408", desc: "CYRILLIC CAPITAL LETTER JE" }, {
                "char": "&#x409",
                desc: "CYRILLIC CAPITAL LETTER LJE"
            }, { "char": "&#x40A", desc: "CYRILLIC CAPITAL LETTER NJE" }, {
                "char": "&#x40B",
                desc: "CYRILLIC CAPITAL LETTER TSHE"
            }, { "char": "&#x40C", desc: "CYRILLIC CAPITAL LETTER KJE" }, {
                "char": "&#x40D",
                desc: "CYRILLIC CAPITAL LETTER I WITH GRAVE"
            }, { "char": "&#x40E", desc: "CYRILLIC CAPITAL LETTER SHORT U" }, {
                "char": "&#x40F",
                desc: "CYRILLIC CAPITAL LETTER DZHE"
            }, { "char": "&#x410", desc: "CYRILLIC CAPITAL LETTER A" }, {
                "char": "&#x411",
                desc: "CYRILLIC CAPITAL LETTER BE"
            }, { "char": "&#x412", desc: "CYRILLIC CAPITAL LETTER VE" }, {
                "char": "&#x413",
                desc: "CYRILLIC CAPITAL LETTER GHE"
            }, { "char": "&#x414", desc: "CYRILLIC CAPITAL LETTER DE" }, {
                "char": "&#x415",
                desc: "CYRILLIC CAPITAL LETTER IE"
            }, { "char": "&#x416", desc: "CYRILLIC CAPITAL LETTER ZHE" }, {
                "char": "&#x417",
                desc: "CYRILLIC CAPITAL LETTER ZE"
            }, { "char": "&#x418", desc: "CYRILLIC CAPITAL LETTER I" }, {
                "char": "&#x419",
                desc: "CYRILLIC CAPITAL LETTER SHORT I"
            }, { "char": "&#x41A", desc: "CYRILLIC CAPITAL LETTER KA" }, {
                "char": "&#x41B",
                desc: "CYRILLIC CAPITAL LETTER EL"
            }, { "char": "&#x41C", desc: "CYRILLIC CAPITAL LETTER EM" }, {
                "char": "&#x41D",
                desc: "CYRILLIC CAPITAL LETTER EN"
            }, { "char": "&#x41E", desc: "CYRILLIC CAPITAL LETTER O" }, {
                "char": "&#x41F",
                desc: "CYRILLIC CAPITAL LETTER PE"
            }, { "char": "&#x420", desc: "CYRILLIC CAPITAL LETTER ER" }, {
                "char": "&#x421",
                desc: "CYRILLIC CAPITAL LETTER ES"
            }, { "char": "&#x422", desc: "CYRILLIC CAPITAL LETTER TE" }, {
                "char": "&#x423",
                desc: "CYRILLIC CAPITAL LETTER U"
            }, { "char": "&#x424", desc: "CYRILLIC CAPITAL LETTER EF" }, {
                "char": "&#x425",
                desc: "CYRILLIC CAPITAL LETTER HA"
            }, { "char": "&#x426", desc: "CYRILLIC CAPITAL LETTER TSE" }, {
                "char": "&#x427",
                desc: "CYRILLIC CAPITAL LETTER CHE"
            }, { "char": "&#x428", desc: "CYRILLIC CAPITAL LETTER SHA" }, {
                "char": "&#x429",
                desc: "CYRILLIC CAPITAL LETTER SHCHA"
            }, { "char": "&#x42A", desc: "CYRILLIC CAPITAL LETTER HARD SIGN" }, {
                "char": "&#x42B",
                desc: "CYRILLIC CAPITAL LETTER YERU"
            }, { "char": "&#x42C", desc: "CYRILLIC CAPITAL LETTER SOFT SIGN" }, {
                "char": "&#x42D",
                desc: "CYRILLIC CAPITAL LETTER E"
            }, { "char": "&#x42E", desc: "CYRILLIC CAPITAL LETTER YU" }, {
                "char": "&#x42F",
                desc: "CYRILLIC CAPITAL LETTER YA"
            }, { "char": "&#x430", desc: "CYRILLIC SMALL LETTER A" }, {
                "char": "&#x431",
                desc: "CYRILLIC SMALL LETTER BE"
            }, { "char": "&#x432", desc: "CYRILLIC SMALL LETTER VE" }, {
                "char": "&#x433",
                desc: "CYRILLIC SMALL LETTER GHE"
            }, { "char": "&#x434", desc: "CYRILLIC SMALL LETTER DE" }, {
                "char": "&#x435",
                desc: "CYRILLIC SMALL LETTER IE"
            }, { "char": "&#x436", desc: "CYRILLIC SMALL LETTER ZHE" }, {
                "char": "&#x437",
                desc: "CYRILLIC SMALL LETTER ZE"
            }, { "char": "&#x438", desc: "CYRILLIC SMALL LETTER I" }, {
                "char": "&#x439",
                desc: "CYRILLIC SMALL LETTER SHORT I"
            }, { "char": "&#x43A", desc: "CYRILLIC SMALL LETTER KA" }, {
                "char": "&#x43B",
                desc: "CYRILLIC SMALL LETTER EL"
            }, { "char": "&#x43C", desc: "CYRILLIC SMALL LETTER EM" }, {
                "char": "&#x43D",
                desc: "CYRILLIC SMALL LETTER EN"
            }, { "char": "&#x43E", desc: "CYRILLIC SMALL LETTER O" }, {
                "char": "&#x43F",
                desc: "CYRILLIC SMALL LETTER PE"
            }, { "char": "&#x440", desc: "CYRILLIC SMALL LETTER ER" }, {
                "char": "&#x441",
                desc: "CYRILLIC SMALL LETTER ES"
            }, { "char": "&#x442", desc: "CYRILLIC SMALL LETTER TE" }, {
                "char": "&#x443",
                desc: "CYRILLIC SMALL LETTER U"
            }, { "char": "&#x444", desc: "CYRILLIC SMALL LETTER EF" }, {
                "char": "&#x445",
                desc: "CYRILLIC SMALL LETTER HA"
            }, { "char": "&#x446", desc: "CYRILLIC SMALL LETTER TSE" }, {
                "char": "&#x447",
                desc: "CYRILLIC SMALL LETTER CHE"
            }, { "char": "&#x448", desc: "CYRILLIC SMALL LETTER SHA" }, {
                "char": "&#x449",
                desc: "CYRILLIC SMALL LETTER SHCHA"
            }, { "char": "&#x44A", desc: "CYRILLIC SMALL LETTER HARD SIGN" }, {
                "char": "&#x44B",
                desc: "CYRILLIC SMALL LETTER YERU"
            }, { "char": "&#x44C", desc: "CYRILLIC SMALL LETTER SOFT SIGN" }, {
                "char": "&#x44D",
                desc: "CYRILLIC SMALL LETTER E"
            }, { "char": "&#x44E", desc: "CYRILLIC SMALL LETTER YU" }, {
                "char": "&#x44F",
                desc: "CYRILLIC SMALL LETTER YA"
            }, { "char": "&#x450", desc: "CYRILLIC SMALL LETTER IE WITH GRAVE" }, {
                "char": "&#x451",
                desc: "CYRILLIC SMALL LETTER IO"
            }, { "char": "&#x452", desc: "CYRILLIC SMALL LETTER DJE" }, {
                "char": "&#x453",
                desc: "CYRILLIC SMALL LETTER GJE"
            }, { "char": "&#x454", desc: "CYRILLIC SMALL LETTER UKRAINIAN IE" }, {
                "char": "&#x455",
                desc: "CYRILLIC SMALL LETTER DZE"
            }, { "char": "&#x456", desc: "CYRILLIC SMALL LETTER BYELORUSSIAN-UKRAINIAN I" }, {
                "char": "&#x457",
                desc: "CYRILLIC SMALL LETTER YI"
            }, { "char": "&#x458", desc: "CYRILLIC SMALL LETTER JE" }, {
                "char": "&#x459",
                desc: "CYRILLIC SMALL LETTER LJE"
            }, { "char": "&#x45A", desc: "CYRILLIC SMALL LETTER NJE" }, {
                "char": "&#x45B",
                desc: "CYRILLIC SMALL LETTER TSHE"
            }, { "char": "&#x45C", desc: "CYRILLIC SMALL LETTER KJE" }, {
                "char": "&#x45D",
                desc: "CYRILLIC SMALL LETTER I WITH GRAVE"
            }, { "char": "&#x45E", desc: "CYRILLIC SMALL LETTER SHORT U" }, {
                "char": "&#x45F",
                desc: "CYRILLIC SMALL LETTER DZHE"
            }]
        }, {
            title: "Punctuation",
            "char": "&ndash;",
            list: [{ "char": "&ndash;", desc: "EN DASH" }, { "char": "&mdash;", desc: "EM DASH" }, {
                "char": "&lsquo;",
                desc: "LEFT SINGLE QUOTATION MARK"
            }, { "char": "&rsquo;", desc: "RIGHT SINGLE QUOTATION MARK" }, {
                "char": "&sbquo;",
                desc: "SINGLE LOW-9 QUOTATION MARK"
            }, { "char": "&ldquo;", desc: "LEFT DOUBLE QUOTATION MARK" }, {
                "char": "&rdquo;",
                desc: "RIGHT DOUBLE QUOTATION MARK"
            }, { "char": "&bdquo;", desc: "DOUBLE LOW-9 QUOTATION MARK" }, {
                "char": "&dagger;",
                desc: "DAGGER"
            }, { "char": "&Dagger;", desc: "DOUBLE DAGGER" }, { "char": "&bull;", desc: "BULLET" }, {
                "char": "&hellip;",
                desc: "HORIZONTAL ELLIPSIS"
            }, { "char": "&permil;", desc: "PER MILLE SIGN" }, { "char": "&prime;", desc: "PRIME" }, {
                "char": "&Prime;",
                desc: "DOUBLE PRIME"
            }, { "char": "&lsaquo;", desc: "SINGLE LEFT-POINTING ANGLE QUOTATION MARK" }, {
                "char": "&rsaquo;",
                desc: "SINGLE RIGHT-POINTING ANGLE QUOTATION MARK"
            }, { "char": "&oline;", desc: "OVERLINE" }, { "char": "&frasl;", desc: "FRACTION SLASH" }]
        }, {
            title: "Currency",
            "char": "&#x20A0",
            list: [{ "char": "&#x20A0", desc: "EURO-CURRENCY SIGN" }, {
                "char": "&#x20A1",
                desc: "COLON SIGN"
            }, { "char": "&#x20A2", desc: "CRUZEIRO SIGN" }, {
                "char": "&#x20A3",
                desc: "FRENCH FRANC SIGN"
            }, { "char": "&#x20A4", desc: "LIRA SIGN" }, { "char": "&#x20A5", desc: "MILL SIGN" }, {
                "char": "&#x20A6",
                desc: "NAIRA SIGN"
            }, { "char": "&#x20A7", desc: "PESETA SIGN" }, { "char": "&#x20A8", desc: "RUPEE SIGN" }, {
                "char": "&#x20A9",
                desc: "WON SIGN"
            }, { "char": "&#x20AA", desc: "NEW SHEQEL SIGN" }, { "char": "&#x20AB", desc: "DONG SIGN" }, {
                "char": "&#x20AC",
                desc: "EURO SIGN"
            }, { "char": "&#x20AD", desc: "KIP SIGN" }, { "char": "&#x20AE", desc: "TUGRIK SIGN" }, {
                "char": "&#x20AF",
                desc: "DRACHMA SIGN"
            }, { "char": "&#x20B0", desc: "GERMAN PENNY SYMBOL" }, {
                "char": "&#x20B1",
                desc: "PESO SIGN"
            }, { "char": "&#x20B2", desc: "GUARANI SIGN" }, { "char": "&#x20B3", desc: "AUSTRAL SIGN" }, {
                "char": "&#x20B4",
                desc: "HRYVNIA SIGN"
            }, { "char": "&#x20B5", desc: "CEDI SIGN" }, {
                "char": "&#x20B6",
                desc: "LIVRE TOURNOIS SIGN"
            }, { "char": "&#x20B7", desc: "SPESMILO SIGN" }, { "char": "&#x20B8", desc: "TENGE SIGN" }, {
                "char": "&#x20B9",
                desc: "INDIAN RUPEE SIGN"
            }]
        }, {
            title: "Arrows",
            "char": "&#x2190",
            list: [{ "char": "&#x2190", desc: "LEFTWARDS ARROW" }, {
                "char": "&#x2191",
                desc: "UPWARDS ARROW"
            }, { "char": "&#x2192", desc: "RIGHTWARDS ARROW" }, {
                "char": "&#x2193",
                desc: "DOWNWARDS ARROW"
            }, { "char": "&#x2194", desc: "LEFT RIGHT ARROW" }, {
                "char": "&#x2195",
                desc: "UP DOWN ARROW"
            }, { "char": "&#x2196", desc: "NORTH WEST ARROW" }, {
                "char": "&#x2197",
                desc: "NORTH EAST ARROW"
            }, { "char": "&#x2198", desc: "SOUTH EAST ARROW" }, {
                "char": "&#x2199",
                desc: "SOUTH WEST ARROW"
            }, { "char": "&#x219A", desc: "LEFTWARDS ARROW WITH STROKE" }, {
                "char": "&#x219B",
                desc: "RIGHTWARDS ARROW WITH STROKE"
            }, { "char": "&#x219C", desc: "LEFTWARDS WAVE ARROW" }, {
                "char": "&#x219D",
                desc: "RIGHTWARDS WAVE ARROW"
            }, { "char": "&#x219E", desc: "LEFTWARDS TWO HEADED ARROW" }, {
                "char": "&#x219F",
                desc: "UPWARDS TWO HEADED ARROW"
            }, { "char": "&#x21A0", desc: "RIGHTWARDS TWO HEADED ARROW" }, {
                "char": "&#x21A1",
                desc: "DOWNWARDS TWO HEADED ARROW"
            }, { "char": "&#x21A2", desc: "LEFTWARDS ARROW WITH TAIL" }, {
                "char": "&#x21A3",
                desc: "RIGHTWARDS ARROW WITH TAIL"
            }, { "char": "&#x21A4", desc: "LEFTWARDS ARROW FROM BAR" }, {
                "char": "&#x21A5",
                desc: "UPWARDS ARROW FROM BAR"
            }, { "char": "&#x21A6", desc: "RIGHTWARDS ARROW FROM BAR" }, {
                "char": "&#x21A7",
                desc: "DOWNWARDS ARROW FROM BAR"
            }, { "char": "&#x21A8", desc: "UP DOWN ARROW WITH BASE" }, {
                "char": "&#x21A9",
                desc: "LEFTWARDS ARROW WITH HOOK"
            }, { "char": "&#x21AA", desc: "RIGHTWARDS ARROW WITH HOOK" }, {
                "char": "&#x21AB",
                desc: "LEFTWARDS ARROW WITH LOOP"
            }, { "char": "&#x21AC", desc: "RIGHTWARDS ARROW WITH LOOP" }, {
                "char": "&#x21AD",
                desc: "LEFT RIGHT WAVE ARROW"
            }, { "char": "&#x21AE", desc: "LEFT RIGHT ARROW WITH STROKE" }, {
                "char": "&#x21AF",
                desc: "DOWNWARDS ZIGZAG ARROW"
            }, { "char": "&#x21B0", desc: "UPWARDS ARROW WITH TIP LEFTWARDS" }, {
                "char": "&#x21B1",
                desc: "UPWARDS ARROW WITH TIP RIGHTWARDS"
            }, { "char": "&#x21B2", desc: "DOWNWARDS ARROW WITH TIP LEFTWARDS" }, {
                "char": "&#x21B3",
                desc: "DOWNWARDS ARROW WITH TIP RIGHTWARDS"
            }, { "char": "&#x21B4", desc: "RIGHTWARDS ARROW WITH CORNER DOWNWARDS" }, {
                "char": "&#x21B5",
                desc: "DOWNWARDS ARROW WITH CORNER LEFTWARDS"
            }, { "char": "&#x21B6", desc: "ANTICLOCKWISE TOP SEMICIRCLE ARROW" }, {
                "char": "&#x21B7",
                desc: "CLOCKWISE TOP SEMICIRCLE ARROW"
            }, { "char": "&#x21B8", desc: "NORTH WEST ARROW TO LONG BAR" }, {
                "char": "&#x21B9",
                desc: "LEFTWARDS ARROW TO BAR OVER RIGHTWARDS ARROW TO BAR"
            }, { "char": "&#x21BA", desc: "ANTICLOCKWISE OPEN CIRCLE ARROW" }, {
                "char": "&#x21BB",
                desc: "CLOCKWISE OPEN CIRCLE ARROW"
            }, { "char": "&#x21BC", desc: "LEFTWARDS HARPOON WITH BARB UPWARDS" }, {
                "char": "&#x21BD",
                desc: "LEFTWARDS HARPOON WITH BARB DOWNWARDS"
            }, { "char": "&#x21BE", desc: "UPWARDS HARPOON WITH BARB RIGHTWARDS" }, {
                "char": "&#x21BF",
                desc: "UPWARDS HARPOON WITH BARB LEFTWARDS"
            }, { "char": "&#x21C0", desc: "RIGHTWARDS HARPOON WITH BARB UPWARDS" }, {
                "char": "&#x21C1",
                desc: "RIGHTWARDS HARPOON WITH BARB DOWNWARDS"
            }, { "char": "&#x21C2", desc: "DOWNWARDS HARPOON WITH BARB RIGHTWARDS" }, {
                "char": "&#x21C3",
                desc: "DOWNWARDS HARPOON WITH BARB LEFTWARDS"
            }, { "char": "&#x21C4", desc: "RIGHTWARDS ARROW OVER LEFTWARDS ARROW" }, {
                "char": "&#x21C5",
                desc: "UPWARDS ARROW LEFTWARDS OF DOWNWARDS ARROW"
            }, { "char": "&#x21C6", desc: "LEFTWARDS ARROW OVER RIGHTWARDS ARROW" }, {
                "char": "&#x21C7",
                desc: "LEFTWARDS PAIRED ARROWS"
            }, { "char": "&#x21C8", desc: "UPWARDS PAIRED ARROWS" }, {
                "char": "&#x21C9",
                desc: "RIGHTWARDS PAIRED ARROWS"
            }, { "char": "&#x21CA", desc: "DOWNWARDS PAIRED ARROWS" }, {
                "char": "&#x21CB",
                desc: "LEFTWARDS HARPOON OVER RIGHTWARDS HARPOON"
            }, { "char": "&#x21CC", desc: "RIGHTWARDS HARPOON OVER LEFTWARDS HARPOON" }, {
                "char": "&#x21CD",
                desc: "LEFTWARDS DOUBLE ARROW WITH STROKE"
            }, { "char": "&#x21CE", desc: "LEFT RIGHT DOUBLE ARROW WITH STROKE" }, {
                "char": "&#x21CF",
                desc: "RIGHTWARDS DOUBLE ARROW WITH STROKE"
            }, { "char": "&#x21D0", desc: "LEFTWARDS DOUBLE ARROW" }, {
                "char": "&#x21D1",
                desc: "UPWARDS DOUBLE ARROW"
            }, { "char": "&#x21D2", desc: "RIGHTWARDS DOUBLE ARROW" }, {
                "char": "&#x21D3",
                desc: "DOWNWARDS DOUBLE ARROW"
            }, { "char": "&#x21D4", desc: "LEFT RIGHT DOUBLE ARROW" }, {
                "char": "&#x21D5",
                desc: "UP DOWN DOUBLE ARROW"
            }, { "char": "&#x21D6", desc: "NORTH WEST DOUBLE ARROW" }, {
                "char": "&#x21D7",
                desc: "NORTH EAST DOUBLE ARROW"
            }, { "char": "&#x21D8", desc: "SOUTH EAST DOUBLE ARROW" }, {
                "char": "&#x21D9",
                desc: "SOUTH WEST DOUBLE ARROW"
            }, { "char": "&#x21DA", desc: "LEFTWARDS TRIPLE ARROW" }, {
                "char": "&#x21DB",
                desc: "RIGHTWARDS TRIPLE ARROW"
            }, { "char": "&#x21DC", desc: "LEFTWARDS SQUIGGLE ARROW" }, {
                "char": "&#x21DD",
                desc: "RIGHTWARDS SQUIGGLE ARROW"
            }, { "char": "&#x21DE", desc: "UPWARDS ARROW WITH DOUBLE STROKE" }, {
                "char": "&#x21DF",
                desc: "DOWNWARDS ARROW WITH DOUBLE STROKE"
            }, { "char": "&#x21E0", desc: "LEFTWARDS DASHED ARROW" }, {
                "char": "&#x21E1",
                desc: "UPWARDS DASHED ARROW"
            }, { "char": "&#x21E2", desc: "RIGHTWARDS DASHED ARROW" }, {
                "char": "&#x21E3",
                desc: "DOWNWARDS DASHED ARROW"
            }, { "char": "&#x21E4", desc: "LEFTWARDS ARROW TO BAR" }, {
                "char": "&#x21E5",
                desc: "RIGHTWARDS ARROW TO BAR"
            }, { "char": "&#x21E6", desc: "LEFTWARDS WHITE ARROW" }, {
                "char": "&#x21E7",
                desc: "UPWARDS WHITE ARROW"
            }, { "char": "&#x21E8", desc: "RIGHTWARDS WHITE ARROW" }, {
                "char": "&#x21E9",
                desc: "DOWNWARDS WHITE ARROW"
            }, { "char": "&#x21EA", desc: "UPWARDS WHITE ARROW FROM BAR" }, {
                "char": "&#x21EB",
                desc: "UPWARDS WHITE ARROW ON PEDESTAL"
            }, { "char": "&#x21EC", desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH HORIZONTAL BAR" }, {
                "char": "&#x21ED",
                desc: "UPWARDS WHITE ARROW ON PEDESTAL WITH VERTICAL BAR"
            }, { "char": "&#x21EE", desc: "UPWARDS WHITE DOUBLE ARROW" }, {
                "char": "&#x21EF",
                desc: "UPWARDS WHITE DOUBLE ARROW ON PEDESTAL"
            }, { "char": "&#x21F0", desc: "RIGHTWARDS WHITE ARROW FROM WALL" }, {
                "char": "&#x21F1",
                desc: "NORTH WEST ARROW TO CORNER"
            }, { "char": "&#x21F2", desc: "SOUTH EAST ARROW TO CORNER" }, {
                "char": "&#x21F3",
                desc: "UP DOWN WHITE ARROW"
            }, { "char": "&#x21F4", desc: "RIGHT ARROW WITH SMALL CIRCLE" }, {
                "char": "&#x21F5",
                desc: "DOWNWARDS ARROW LEFTWARDS OF UPWARDS ARROW"
            }, { "char": "&#x21F6", desc: "THREE RIGHTWARDS ARROWS" }, {
                "char": "&#x21F7",
                desc: "LEFTWARDS ARROW WITH VERTICAL STROKE"
            }, { "char": "&#x21F8", desc: "RIGHTWARDS ARROW WITH VERTICAL STROKE" }, {
                "char": "&#x21F9",
                desc: "LEFT RIGHT ARROW WITH VERTICAL STROKE"
            }, { "char": "&#x21FA", desc: "LEFTWARDS ARROW WITH DOUBLE VERTICAL STROKE" }, {
                "char": "&#x21FB",
                desc: "RIGHTWARDS ARROW WITH DOUBLE VERTICAL STROKE"
            }, { "char": "&#x21FC", desc: "LEFT RIGHT ARROW WITH DOUBLE VERTICAL STROKE" }, {
                "char": "&#x21FD",
                desc: "LEFTWARDS OPEN-HEADED ARROW"
            }, { "char": "&#x21FE", desc: "RIGHTWARDS OPEN-HEADED ARROW" }, {
                "char": "&#x21FF",
                desc: "LEFT RIGHT OPEN-HEADED ARROW"
            }]
        }, {
            title: "Math",
            "char": "&forall;",
            list: [{ "char": "&forall;", desc: "FOR ALL" }, {
                "char": "&part;",
                desc: "PARTIAL DIFFERENTIAL"
            }, { "char": "&exist;", desc: "THERE EXISTS" }, { "char": "&empty;", desc: "EMPTY SET" }, {
                "char": "&nabla;",
                desc: "NABLA"
            }, { "char": "&isin;", desc: "ELEMENT OF" }, { "char": "&notin;", desc: "NOT AN ELEMENT OF" }, {
                "char": "&ni;",
                desc: "CONTAINS AS MEMBER"
            }, { "char": "&prod;", desc: "N-ARY PRODUCT" }, {
                "char": "&sum;",
                desc: "N-ARY SUMMATION"
            }, { "char": "&minus;", desc: "MINUS SIGN" }, {
                "char": "&lowast;",
                desc: "ASTERISK OPERATOR"
            }, { "char": "&radic;", desc: "SQUARE ROOT" }, {
                "char": "&prop;",
                desc: "PROPORTIONAL TO"
            }, { "char": "&infin;", desc: "INFINITY" }, { "char": "&ang;", desc: "ANGLE" }, {
                "char": "&and;",
                desc: "LOGICAL AND"
            }, { "char": "&or;", desc: "LOGICAL OR" }, { "char": "&cap;", desc: "INTERSECTION" }, {
                "char": "&cup;",
                desc: "UNION"
            }, { "char": "&int;", desc: "INTEGRAL" }, { "char": "&there4;", desc: "THEREFORE" }, {
                "char": "&sim;",
                desc: "TILDE OPERATOR"
            }, { "char": "&cong;", desc: "APPROXIMATELY EQUAL TO" }, {
                "char": "&asymp;",
                desc: "ALMOST EQUAL TO"
            }, { "char": "&ne;", desc: "NOT EQUAL TO" }, { "char": "&equiv;", desc: "IDENTICAL TO" }, {
                "char": "&le;",
                desc: "LESS-THAN OR EQUAL TO"
            }, { "char": "&ge;", desc: "GREATER-THAN OR EQUAL TO" }, {
                "char": "&sub;",
                desc: "SUBSET OF"
            }, { "char": "&sup;", desc: "SUPERSET OF" }, { "char": "&nsub;", desc: "NOT A SUBSET OF" }, {
                "char": "&sube;",
                desc: "SUBSET OF OR EQUAL TO"
            }, { "char": "&supe;", desc: "SUPERSET OF OR EQUAL TO" }, {
                "char": "&oplus;",
                desc: "CIRCLED PLUS"
            }, { "char": "&otimes;", desc: "CIRCLED TIMES" }, { "char": "&perp;", desc: "UP TACK" }]
        }, {
            title: "Misc",
            "char": "&spades;",
            list: [{ "char": "&spades;", desc: "BLACK SPADE SUIT" }, {
                "char": "&clubs;",
                desc: "BLACK CLUB SUIT"
            }, { "char": "&hearts;", desc: "BLACK HEART SUIT" }, {
                "char": "&diams;",
                desc: "BLACK DIAMOND SUIT"
            }, { "char": "&#x2669", desc: "QUARTER NOTE" }, { "char": "&#x266A", desc: "EIGHTH NOTE" }, {
                "char": "&#x266B",
                desc: "BEAMED EIGHTH NOTES"
            }, { "char": "&#x266C", desc: "BEAMED SIXTEENTH NOTES" }, {
                "char": "&#x266D",
                desc: "MUSIC FLAT SIGN"
            }, { "char": "&#x266E", desc: "MUSIC NATURAL SIGN" }, {
                "char": "&#x2600",
                desc: "BLACK SUN WITH RAYS"
            }, { "char": "&#x2601", desc: "CLOUD" }, { "char": "&#x2602", desc: "UMBRELLA" }, {
                "char": "&#x2603",
                desc: "SNOWMAN"
            }, { "char": "&#x2615", desc: "HOT BEVERAGE" }, { "char": "&#x2618", desc: "SHAMROCK" }, {
                "char": "&#x262F",
                desc: "YIN YANG"
            }, { "char": "&#x2714", desc: "HEAVY CHECK MARK" }, {
                "char": "&#x2716",
                desc: "HEAVY MULTIPLICATION X"
            }, { "char": "&#x2744", desc: "SNOWFLAKE" }, {
                "char": "&#x275B",
                desc: "HEAVY SINGLE TURNED COMMA QUOTATION MARK ORNAMENT"
            }, { "char": "&#x275C", desc: "HEAVY SINGLE COMMA QUOTATION MARK ORNAMENT" }, {
                "char": "&#x275D",
                desc: "HEAVY DOUBLE TURNED COMMA QUOTATION MARK ORNAMENT"
            }, { "char": "&#x275E", desc: "HEAVY DOUBLE COMMA QUOTATION MARK ORNAMENT" }, {
                "char": "&#x2764",
                desc: "HEAVY BLACK HEART"
            }]
        }],
        specialCharButtons: ["specialCharBack", "|"]
    }), Object.assign($e.POPUP_TEMPLATES, { specialCharacters: "[_BUTTONS_][_CUSTOM_LAYER_]" }), $e.PLUGINS.specialCharacters = function(g) {
        var m = g.$,
            n = g.opts.specialCharactersSets[0],
            r = g.opts.specialCharactersSets,
            i = "";

        function s() {
            return '\n        <div class="fr-buttons fr-tabs fr-tabs-scroll">\n          '.concat(function t(e, n) {
                var a = "";
                return e.forEach(function(e) {
                    var t = {
                        elementClass: e.title === n.title ? "fr-active fr-active-tab" : "",
                        title: e.title,
                        dataParam1: e.title,
                        desc: e["char"]
                    };
                    a += '<button class="fr-command fr-btn fr-special-character-category '.concat(t.elementClass, '" title="').concat(t.title, '" data-cmd="setSpecialCharacterCategory" data-param1="').concat(t.dataParam1, '"><span>').concat(t.desc, "</span></button>")
                }), a
            }(r, n), '\n        </div>\n        <div class="fr-icon-container fr-sc-container">\n          ').concat(function a(e) {
                var n = "";
                return e.list.forEach(function(e) {
                    var t = { dataParam1: e["char"], title: e.desc, splCharValue: e["char"] };
                    n += '<span class="fr-command fr-special-character fr-icon" role="button" \n      data-cmd="insertSpecialCharacter" data-param1="'.concat(t.dataParam1, '" \n      title="').concat(t.title, '">').concat(t.splCharValue, "</span>")
                }), n
            }(n), "\n        </div>")
        }

        return {
            setSpecialCharacterCategory: function a(t) {
                n = r.filter(function(e) {
                        return e.title === t
                    })[0],
                    function e() {
                        g.popups.get("specialCharacters").html(i + s())
                    }()
            },
            showSpecialCharsPopup: function l() {
                var e = g.popups.get("specialCharacters");
                if (e || (e = function o() {
                        g.opts.toolbarInline && 0 < g.opts.specialCharButtons.length && (i = '<div class="fr-buttons fr-tabs">'.concat(g.button.buildList(g.opts.specialCharButtons), "</div>"));
                        var e = { buttons: i, custom_layer: s() },
                            t = g.popups.create("specialCharacters", e);
                        return function n(h) {
                            g.events.on("popup.tab", function(e) {
                                var t = m(e.currentTarget);
                                if (!g.popups.isVisible("specialCharacters") || !t.is("span, a")) return !0;
                                var n, a, r, o = e.which;
                                if ($e.KEYCODE.TAB == o) {
                                    if (t.is("span.fr-icon") && e.shiftKey || t.is("a") && !e.shiftKey) {
                                        var i = h.find(".fr-buttons");
                                        n = !g.accessibility.focusToolbar(i, !!e.shiftKey)
                                    }
                                    if (!1 !== n) {
                                        var s = h.find("span.fr-icon:focus").first().concat(h.findVisible(" span.fr-icon").first().concat(h.find("a")));
                                        t.is("span.fr-icon") && (s = s.not("span.fr-icon:not(:focus)")), a = s.index(t), a = e.shiftKey ? ((a - 1) % s.length + s.length) % s.length : (a + 1) % s.length, r = s.get(a), g.events.disableBlur(), r.focus(), n = !1
                                    }
                                } else if ($e.KEYCODE.ARROW_UP == o || $e.KEYCODE.ARROW_DOWN == o || $e.KEYCODE.ARROW_LEFT == o || $e.KEYCODE.ARROW_RIGHT == o) {
                                    if (t.is("span.fr-icon")) {
                                        var l = t.parent().find("span.fr-icon");
                                        a = l.index(t);
                                        var c = Math.floor(l.length / 11),
                                            d = a % 11,
                                            f = Math.floor(a / 11),
                                            p = 11 * f + d,
                                            u = 11 * c;
                                        $e.KEYCODE.ARROW_UP == o ? p = ((p - 11) % u + u) % u : $e.KEYCODE.ARROW_DOWN == o ? p = (p + 11) % u : $e.KEYCODE.ARROW_LEFT == o ? p = ((p - 1) % u + u) % u : $e.KEYCODE.ARROW_RIGHT == o && (p = (p + 1) % u), r = m(l.get(p)), g.events.disableBlur(), r.focus(), n = !1
                                    }
                                } else $e.KEYCODE.ENTER == o && (t.is("a") ? t[0].click() : g.button.exec(t), n = !1);
                                return !1 === n && (e.preventDefault(), e.stopPropagation()), n
                            }, !0)
                        }(t), t
                    }()), !e.hasClass("fr-active")) {
                    g.popups.refresh("specialCharacters"), g.popups.setContainer("specialCharacters", g.$tb);
                    var t = g.$tb.find('.fr-command[data-cmd="specialCharacters"]'),
                        n = g.button.getPosition(t),
                        a = n.left,
                        r = n.top;
                    g.popups.show("specialCharacters", a, r, outerHeight)
                }
            },
            back: function e() {
                g.popups.hide("specialCharacters"), g.toolbar.showInline()
            }
        }
    }, $e.DefineIcon("specialCharacters", {
        NAME: "dollar-sign",
        SVG_KEY: "symbols"
    }), $e.RegisterCommand("specialCharacters", {
        title: "Special Characters",
        icon: "specialCharacters",
        undo: !1,
        focus: !1,
        popup: !0,
        refreshAfterCallback: !1,
        plugin: "specialCharacters",
        showOnMobile: !0,
        callback: function() {
            this.popups.isVisible("specialCharacters") ? (this.$el.find(".fr-marker") && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("specialCharacters")) : this.specialCharacters.showSpecialCharsPopup()
        }
    }), $e.RegisterCommand("insertSpecialCharacter", {
        callback: function(e, t) {
            this.undo.saveStep(), this.html.insert(t), this.undo.saveStep(), this.popups.hide("specialCharacters")
        }
    }), $e.RegisterCommand("setSpecialCharacterCategory", {
        undo: !1,
        focus: !1,
        callback: function(e, t) {
            this.specialCharacters.setSpecialCharacterCategory(t)
        }
    }), $e.DefineIcon("specialCharBack", {
        NAME: "arrow-left",
        SVG_KEY: "back"
    }), $e.RegisterCommand("specialCharBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.specialCharacters.back()
        }
    }), Object.assign($e.POPUP_TEMPLATES, {
        "table.insert": "[_BUTTONS_][_ROWS_COLUMNS_]",
        "table.edit": "[_BUTTONS_]",
        "table.colors": "[_BUTTONS_][_COLORS_][_CUSTOM_COLOR_]"
    }), Object.assign($e.DEFAULTS, {
        tableInsertMaxSize: 10,
        tableEditButtons: ["tableHeader", "tableRemove", "tableRows", "tableColumns", "tableStyle", "-", "tableCells", "tableCellBackground", "tableCellVerticalAlign", "tableCellHorizontalAlign", "tableCellStyle"],
        tableInsertButtons: ["tableBack", "|"],
        tableResizer: !0,
        tableDefaultWidth: "100%",
        tableResizerOffset: 5,
        tableResizingLimit: 30,
        tableColorsButtons: ["tableBack", "|"],
        tableColors: ["#61BD6D", "#1ABC9C", "#54ACD2", "#2C82C9", "#9365B8", "#475577", "#CCCCCC", "#41A85F", "#00A885", "#3D8EB9", "#2969B0", "#553982", "#28324E", "#000000", "#F7DA64", "#FBA026", "#EB6B56", "#E25041", "#A38F84", "#EFEFEF", "#FFFFFF", "#FAC51C", "#F37934", "#D14841", "#B8312F", "#7C706B", "#D1D5D8", "REMOVE"],
        tableColorsStep: 7,
        tableCellStyles: { "fr-highlighted": "Highlighted", "fr-thick": "Thick" },
        tableStyles: { "fr-dashed-borders": "Dashed Borders", "fr-alternate-rows": "Alternate Rows" },
        tableCellMultipleStyles: !0,
        tableMultipleStyles: !0,
        tableInsertHelper: !0,
        tableInsertHelperOffset: 15
    }), $e.PLUGINS.table = function(C) {
        var S, c, r, o, a, i, y, R = C.$;

        function u() {
            var e = L();
            if (e) {
                var t = C.popups.get("table.edit");
                if (t || (t = p()), t) {
                    C.popups.setContainer("table.edit", C.$sc);
                    var n = x(e),
                        a = n.left + (n.right - n.left) / 2,
                        r = n.bottom;
                    C.popups.show("table.edit", a, r, n.bottom - n.top, !0), C.edit.isDisabled() && (1 < Q().length && C.toolbar.disable(), C.$el.removeClass("fr-no-selection"), C.edit.on(), C.button.bulkRefresh(), C.selection.setAtEnd(C.$el.find(".fr-selected-cell").last().get(0)), C.selection.restore())
                }
            }
        }

        function s() {
            var e = L();
            if (e) {
                var t = C.popups.get("table.colors");
                t || (t = function i() {
                    var e = "";
                    0 < C.opts.tableColorsButtons.length && (e = '<div class="fr-buttons fr-tabs">'.concat(C.button.buildList(C.opts.tableColorsButtons), "</div>"));
                    var t = "";
                    C.opts.colorsHEXInput && (t = '<div class="fr-color-hex-layer fr-table-colors-hex-layer fr-active fr-layer" id="fr-table-colors-hex-layer-'.concat(C.id, '"><div class="fr-input-line"><input maxlength="7" id="fr-table-colors-hex-layer-text-').concat(C.id, '" type="text" placeholder="').concat(C.language.translate("HEX Color"), '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="tableCellBackgroundCustomColor" tabIndex="2" role="button">').concat(C.language.translate("OK"), "</button></div></div>"));
                    var n = {
                            buttons: e,
                            colors: function r() {
                                for (var e = '<div class="fr-color-set fr-table-colors">', t = 0; t < C.opts.tableColors.length; t++) 0 !== t && t % C.opts.tableColorsStep == 0 && (e += "<br>"), "REMOVE" != C.opts.tableColors[t] ? e += '<span class="fr-command" style="background: '.concat(C.opts.tableColors[t], ';" tabIndex="-1" role="button" data-cmd="tableCellBackgroundColor" data-param1="').concat(C.opts.tableColors[t], '"><span class="fr-sr-only">').concat(C.language.translate("Color"), " ").concat(C.opts.tableColors[t], "&nbsp;&nbsp;&nbsp;</span></span>") : e += '<span class="fr-command" data-cmd="tableCellBackgroundColor" tabIndex="-1" role="button" data-param1="REMOVE" title="'.concat(C.language.translate("Clear Formatting"), '">').concat(C.icon.create("tableColorRemove"), '<span class="fr-sr-only">').concat(C.language.translate("Clear Formatting"), "</span></span>");
                                return e += "</div>"
                            }(),
                            custom_color: t
                        },
                        a = C.popups.create("table.colors", n);
                    return C.events.$on(C.$wp, "scroll.table-colors", function() {
                            C.popups.isVisible("table.colors") && s()
                        }),
                        function o(h) {
                            C.events.on("popup.tab", function(e) {
                                var t = R(e.currentTarget);
                                if (!C.popups.isVisible("table.colors") || !t.is("span")) return !0;
                                var n = e.which,
                                    a = !0;
                                if ($e.KEYCODE.TAB == n) {
                                    var r = h.find(".fr-buttons");
                                    a = !C.accessibility.focusToolbar(r, !!e.shiftKey)
                                } else if ($e.KEYCODE.ARROW_UP == n || $e.KEYCODE.ARROW_DOWN == n || $e.KEYCODE.ARROW_LEFT == n || $e.KEYCODE.ARROW_RIGHT == n) {
                                    var o = t.parent().find("span.fr-command"),
                                        i = o.index(t),
                                        s = C.opts.colorsStep,
                                        l = Math.floor(o.length / s),
                                        c = i % s,
                                        d = Math.floor(i / s),
                                        f = d * s + c,
                                        p = l * s;
                                    $e.KEYCODE.ARROW_UP == n ? f = ((f - s) % p + p) % p : $e.KEYCODE.ARROW_DOWN == n ? f = (f + s) % p : $e.KEYCODE.ARROW_LEFT == n ? f = ((f - 1) % p + p) % p : $e.KEYCODE.ARROW_RIGHT == n && (f = (f + 1) % p);
                                    var u = R(o.get(f));
                                    C.events.disableBlur(), u.focus(), a = !1
                                } else $e.KEYCODE.ENTER == n && (C.button.exec(t), a = !1);
                                return !1 === a && (e.preventDefault(), e.stopPropagation()), a
                            }, !0)
                        }(a), a
                }()), C.popups.setContainer("table.colors", C.$sc);
                var n = x(e),
                    a = (n.left + n.right) / 2,
                    r = n.bottom;
                ! function o() {
                    var e = C.popups.get("table.colors"),
                        t = C.$el.find(".fr-selected-cell").first(),
                        n = C.helpers.RGBToHex(t.css("background-color")),
                        a = e.find(".fr-table-colors-hex-layer input");
                    e.find(".fr-selected-color").removeClass("fr-selected-color fr-active-item"), e.find('span[data-param1="'.concat(n, '"]')).addClass("fr-selected-color fr-active-item"), a.val(n).trigger("change")
                }(), C.popups.show("table.colors", a, r, n.bottom - n.top, !0)
            }
        }

        function l() {
            0 === Q().length && C.toolbar.enable()
        }

        function d(e) {
            if (e) return C.popups.onHide("table.insert", function() {
                C.popups.get("table.insert").find('.fr-table-size .fr-select-table-size > span[data-row="1"][data-col="1"]').trigger("mouseover")
            }), !0;
            var t = "";
            0 < C.opts.tableInsertButtons.length && (t = '<div class="fr-buttons fr-tabs">'.concat(C.button.buildList(C.opts.tableInsertButtons), "</div>"));
            var n = {
                    buttons: t,
                    rows_columns: function o() {
                        for (var e = '<div class="fr-table-size"><div class="fr-table-size-info">1 &times; 1</div><div class="fr-select-table-size">', t = 1; t <= C.opts.tableInsertMaxSize; t++) {
                            for (var n = 1; n <= C.opts.tableInsertMaxSize; n++) {
                                var a = "inline-block";
                                2 < t && !C.helpers.isMobile() && (a = "none");
                                var r = "fr-table-cell ";
                                1 == t && 1 == n && (r += " hover"), e += '<span class="fr-command '.concat(r, '" tabIndex="-1" data-cmd="tableInsert" data-row="').concat(t, '" data-col="').concat(n, '" data-param1="').concat(t, '" data-param2="').concat(n, '" style="display: ').concat(a, ';" role="button"><span></span><span class="fr-sr-only">').concat(t, " &times; ").concat(n, "&nbsp;&nbsp;&nbsp;</span></span>")
                            }
                            e += '<div class="new-line"></div>'
                        }
                        return e += "</div></div>"
                    }()
                },
                a = C.popups.create("table.insert", n);
            return C.events.$on(a, "mouseover", ".fr-table-size .fr-select-table-size .fr-table-cell", function(e) {
                    f(R(e.currentTarget))
                }, !0),
                function r(e) {
                    C.events.$on(e, "focus", "[tabIndex]", function(e) {
                        var t = R(e.currentTarget);
                        f(t)
                    }), C.events.on("popup.tab", function(e) {
                        var t = R(e.currentTarget);
                        if (!C.popups.isVisible("table.insert") || !t.is("span, a")) return !0;
                        var n, a = e.which;
                        if ($e.KEYCODE.ARROW_UP == a || $e.KEYCODE.ARROW_DOWN == a || $e.KEYCODE.ARROW_LEFT == a || $e.KEYCODE.ARROW_RIGHT == a) {
                            if (t.is("span.fr-table-cell")) {
                                var r = t.parent().find("span.fr-table-cell"),
                                    o = r.index(t),
                                    i = C.opts.tableInsertMaxSize,
                                    s = o % i,
                                    l = Math.floor(o / i);
                                $e.KEYCODE.ARROW_UP == a ? l = Math.max(0, l - 1) : $e.KEYCODE.ARROW_DOWN == a ? l = Math.min(C.opts.tableInsertMaxSize - 1, l + 1) : $e.KEYCODE.ARROW_LEFT == a ? s = Math.max(0, s - 1) : $e.KEYCODE.ARROW_RIGHT == a && (s = Math.min(C.opts.tableInsertMaxSize - 1, s + 1));
                                var c = l * i + s,
                                    d = R(r.get(c));
                                f(d), C.events.disableBlur(), d.focus(), n = !1
                            }
                        } else $e.KEYCODE.ENTER == a && (C.button.exec(t), n = !1);
                        return !1 === n && (e.preventDefault(), e.stopPropagation()), n
                    }, !0)
                }(a), a
        }

        function f(e) {
            var t = e.data("row");
            null !== t && (t = parseInt(t));
            var n = e.data("col");
            null !== n && (n = parseInt(n));
            var a = e.parent();
            a.siblings(".fr-table-size-info").html("".concat(t, " &times; ").concat(n)), a.find("> span").removeClass("hover fr-active-item");
            for (var r = 1; r <= C.opts.tableInsertMaxSize; r++)
                for (var o = 0; o <= C.opts.tableInsertMaxSize; o++) {
                    var i = a.find('> span[data-row="'.concat(r, '"][data-col="').concat(o, '"]'));
                    r <= t && o <= n ? i.addClass("hover") : r <= t + 1 || r <= 2 && !C.helpers.isMobile() ? i.css("display", "inline-block") : 2 < r && !C.helpers.isMobile() && i.css("display", "none")
                }
            e.addClass("fr-active-item")
        }

        function p(e) {
            if (e) return C.popups.onHide("table.edit", l), !0;
            if (0 < C.opts.tableEditButtons.length) {
                var t = { buttons: '<div class="fr-buttons">'.concat(C.button.buildList(C.opts.tableEditButtons), "</div>") },
                    n = C.popups.create("table.edit", t);
                return C.events.$on(C.$wp, "scroll.table-edit", function() {
                    C.popups.isVisible("table.edit") && u()
                }), n
            }
            return !1
        }

        function h() {
            if (0 < Q().length) {
                var e = J();
                C.selection.setBefore(e.get(0)) || C.selection.setAfter(e.get(0)), C.selection.restore(), C.popups.hide("table.edit"), e.remove(), C.toolbar.enable()
            }
        }

        function g(e) {
            var t = J();
            if (0 < t.length) {
                if (0 < C.$el.find("th.fr-selected-cell").length && "above" == e) return;
                var n, a, r, o = L(),
                    i = N(o);
                if (null == i) return;
                a = "above" == e ? i.min_i : i.max_i;
                var s = "<tr>";
                for (n = 0; n < o[a].length; n++) {
                    if ("below" == e && a < o.length - 1 && o[a][n] == o[a + 1][n] || "above" == e && 0 < a && o[a][n] == o[a - 1][n]) {
                        if (0 === n || 0 < n && o[a][n] != o[a][n - 1]) {
                            var l = R(o[a][n]);
                            l.attr("rowspan", parseInt(l.attr("rowspan"), 10) + 1)
                        }
                    } else s += '<td style="' + R(o[a][n]).attr("style") + '" ><br></td>'
                }
                s += "</tr>", r = 0 < C.$el.find("th.fr-selected-cell").length && "below" == e ? R(t.find("tbody").not(t.find("> table tbody"))) : R(t.find("tr").not(t.find("> table tr")).get(a)), "below" == e ? "TBODY" == r.attr("tagName") ? r.prepend(s) : r[0].parentNode && r[0].insertAdjacentHTML("afterend", s) : "above" == e && (r.before(s), C.popups.isVisible("table.edit") && u())
            }
        }

        function m(e, t, n) {
            var a, r, o, i, s, l = 0,
                c = L(n);
            if (e < (t = Math.min(t, c[0].length - 1)))
                for (r = e; r <= t; r++)
                    if (!(e < r && c[0][r] == c[0][r - 1]) && 1 < (i = Math.min(parseInt(c[0][r].getAttribute("colspan"), 10) || 1, t - e + 1)) && c[0][r] == c[0][r + 1])
                        for (l = i - 1, a = 1; a < c.length; a++)
                            if (c[a][r] != c[a - 1][r]) {
                                for (o = r; o < r + i; o++)
                                    if (1 < (s = parseInt(c[a][o].getAttribute("colspan"), 10) || 1) && c[a][o] == c[a][o + 1]) o += l = Math.min(l, s - 1);
                                    else if (!(l = Math.max(0, l - 1))) break;
                                if (!l) break
                            }
            l && b(c, l, "colspan", 0, c.length - 1, e, t)
        }

        function v(e, t, n) {
            var a, r, o, i, s, l = 0,
                c = L(n);
            if (e < (t = Math.min(t, c.length - 1)))
                for (a = e; a <= t; a++)
                    if (!(e < a && c[a][0] == c[a - 1][0]) && 1 < (i = Math.min(parseInt(c[a][0].getAttribute("rowspan"), 10) || 1, t - e + 1)) && c[a][0] == c[a + 1][0])
                        for (l = i - 1, r = 1; r < c[0].length; r++)
                            if (c[a][r] != c[a][r - 1]) {
                                for (o = a; o < a + i; o++)
                                    if (1 < (s = parseInt(c[o][r].getAttribute("rowspan"), 10) || 1) && c[o][r] == c[o + 1][r]) o += l = Math.min(l, s - 1);
                                    else if (!(l = Math.max(0, l - 1))) break;
                                if (!l) break
                            }
            l && b(c, l, "rowspan", e, t, 0, c[0].length - 1)
        }

        function b(e, t, n, a, r, o, i) {
            var s, l, c;
            for (s = a; s <= r; s++)
                for (l = o; l <= i; l++) a < s && e[s][l] == e[s - 1][l] || o < l && e[s][l] == e[s][l - 1] || 1 < (c = parseInt(e[s][l].getAttribute(n), 10) || 1) && (1 < c - t ? e[s][l].setAttribute(n, c - t) : e[s][l].removeAttribute(n))
        }

        function E(e, t, n, a, r) {
            v(e, t, r), m(n, a, r)
        }

        function t(e) {
            var t = C.$el.find(".fr-selected-cell");
            "REMOVE" != e ? t.css("background-color", C.helpers.HEXtoRGB(e)) : t.css("background-color", ""), u()
        }

        function L(e) {
            var c = [];
            return null == (e = e || null) && 0 < Q().length && (e = J()), e && e.findVisible("tr").not(e.find("> table tr")).each(function(s, e) {
                var t = R(e),
                    l = 0;
                t.find("> th, > td").each(function(e, t) {
                    for (var n = R(t), a = parseInt(n.attr("colspan"), 10) || 1, r = parseInt(n.attr("rowspan"), 10) || 1, o = s; o < s + r; o++)
                        for (var i = l; i < l + a; i++) c[o] || (c[o] = []), c[o][i] ? l++ : c[o][i] = t;
                    l += a
                })
            }), c
        }

        function w(e, t) {
            for (var n = 0; n < t.length; n++)
                for (var a = 0; a < t[n].length; a++)
                    if (t[n][a] == e) return {
                        row: n,
                        col: a
                    }
        }

        function _(e, t, n) {
            for (var a = e + 1, r = t + 1; a < n.length;) {
                if (n[a][t] != n[e][t]) {
                    a--;
                    break
                }
                a++
            }
            for (a == n.length && a--; r < n[e].length;) {
                if (n[e][r] != n[e][t]) {
                    r--;
                    break
                }
                r++
            }
            return r == n[e].length && r--, { row: a, col: r }
        }

        function T() {
            C.el.querySelector(".fr-cell-fixed") && C.el.querySelector(".fr-cell-fixed").classList.remove("fr-cell-fixed"), C.el.querySelector(".fr-cell-handler") && C.el.querySelector(".fr-cell-handler").classList.remove("fr-cell-handler")
        }

        function A() {
            var e = C.$el.find(".fr-selected-cell");
            0 < e.length && e.each(function() {
                var e = R(this);
                e.removeClass("fr-selected-cell"), "" === e.attr("class") && e.removeAttr("class")
            }), T()
        }

        function O() {
            C.events.disableBlur(), C.selection.clear(), C.$el.addClass("fr-no-selection"), C.$el.blur(), C.events.enableBlur()
        }

        function N(e) {
            var t = C.$el.find(".fr-selected-cell");
            if (0 < t.length) {
                var n, a = e.length,
                    r = 0,
                    o = e[0].length,
                    i = 0;
                for (n = 0; n < t.length; n++) {
                    var s = w(t[n], e),
                        l = _(s.row, s.col, e);
                    a = Math.min(s.row, a), r = Math.max(l.row, r), o = Math.min(s.col, o), i = Math.max(l.col, i)
                }
                return { min_i: a, max_i: r, min_j: o, max_j: i }
            }
            return null
        }

        function x(e) {
            var t = N(e);
            if (null != t) {
                var n = R(e[t.min_i][t.min_j]),
                    a = R(e[t.min_i][t.max_j]),
                    r = R(e[t.max_i][t.min_j]);
                return {
                    left: n.length && n.offset().left,
                    right: a.length && a.offset().left + a.outerWidth(),
                    top: n.length && n.offset().top,
                    bottom: r.length && r.offset().top + r.outerHeight()
                }
            }
        }

        function I(e, t) {
            if (R(e).is(t)) A(), R(e).addClass("fr-selected-cell");
            else {
                O(), C.edit.off();
                var n = L(),
                    a = w(e, n),
                    r = w(t, n),
                    o = function u(e, t, n, a, r) {
                        var o, i, s, l, c = e,
                            d = t,
                            f = n,
                            p = a;
                        for (o = c; o <= d; o++)(1 < (parseInt(R(r[o][f]).attr("rowspan"), 10) || 1) || 1 < (parseInt(R(r[o][f]).attr("colspan"), 10) || 1)) && (l = _((s = w(r[o][f], r)).row, s.col, r), c = Math.min(s.row, c), d = Math.max(l.row, d), f = Math.min(s.col, f), p = Math.max(l.col, p)), (1 < (parseInt(R(r[o][p]).attr("rowspan"), 10) || 1) || 1 < (parseInt(R(r[o][p]).attr("colspan"), 10) || 1)) && (l = _((s = w(r[o][p], r)).row, s.col, r), c = Math.min(s.row, c), d = Math.max(l.row, d), f = Math.min(s.col, f), p = Math.max(l.col, p));
                        for (i = f; i <= p; i++)(1 < (parseInt(R(r[c][i]).attr("rowspan"), 10) || 1) || 1 < (parseInt(R(r[c][i]).attr("colspan"), 10) || 1)) && (l = _((s = w(r[c][i], r)).row, s.col, r), c = Math.min(s.row, c), d = Math.max(l.row, d), f = Math.min(s.col, f), p = Math.max(l.col, p)), (1 < (parseInt(R(r[d][i]).attr("rowspan"), 10) || 1) || 1 < (parseInt(R(r[d][i]).attr("colspan"), 10) || 1)) && (l = _((s = w(r[d][i], r)).row, s.col, r), c = Math.min(s.row, c), d = Math.max(l.row, d), f = Math.min(s.col, f), p = Math.max(l.col, p));
                        return c == e && d == t && f == n && p == a ? {
                            min_i: e,
                            max_i: t,
                            min_j: n,
                            max_j: a
                        } : u(c, d, f, p, r)
                    }(Math.min(a.row, r.row), Math.max(a.row, r.row), Math.min(a.col, r.col), Math.max(a.col, r.col), n);
                A(), e.classList.add("fr-cell-fixed"), t.classList.add("fr-cell-handler");
                for (var i = o.min_i; i <= o.max_i; i++)
                    for (var s = o.min_j; s <= o.max_j; s++) R(n[i][s]).addClass("fr-selected-cell")
            }
        }

        function k(e) {
            var t = null,
                n = R(e.target);
            return "TD" == e.target.tagName || "TH" == e.target.tagName ? t = e.target : 0 < n.closest("th", n.closest("thead")[0]).length ? t = n.closest("th", n.closest("thead")[0]).get(0) : 0 < n.closest("td", n.closest("tr")[0]).length && (t = n.closest("td", n.closest("tr")[0]).get(0)), -1 === C.$el.html.toString().search(t) ? null : t
        }

        function M() {
            A(), C.popups.hide("table.edit")
        }

        function e(e) {
            var t = k(e);
            if ("false" == R(t).parents("[contenteditable]").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
            if (0 < Q().length && !t && M(), !C.edit.isDisabled() || C.popups.isVisible("table.edit"))
                if (1 != e.which || 1 == e.which && C.helpers.isMac() && e.ctrlKey)(3 == e.which || 1 == e.which && C.helpers.isMac() && e.ctrlKey) && t && M();
                else if (o = !0, t) {
                0 < Q().length && !e.shiftKey && M(), e.stopPropagation(), C.events.trigger("image.hideResizer"), C.events.trigger("video.hideResizer"), r = !0;
                var n = t.tagName.toLowerCase();
                e.shiftKey && 0 < C.$el.find("".concat(n, ".fr-selected-cell")).length ? R(C.$el.find("".concat(n, ".fr-selected-cell")).closest("table")).is(R(t).closest("table")) ? I(a, t) : O() : ((C.keys.ctrlKey(e) || e.shiftKey) && (1 < Q().length || 0 === R(t).find(C.selection.element()).length && !R(t).is(C.selection.element())) && O(), a = t, 0 < C.opts.tableEditButtons.length && I(a, a))
            }
        }

        function n(e) {
            if (!C.edit.isDisabled() && C.popups.areVisible()) return !0;
            if (r || C.$tb.is(e.target) || C.$tb.is(R(e.target).closest(".fr-toolbar")) || (0 < Q().length && C.toolbar.enable(), A()), !(1 != e.which || 1 == e.which && C.helpers.isMac() && e.ctrlKey)) {
                if (o = !1, r) r = !1, k(e) || 1 != Q().length ? 0 < Q().length && (C.selection.isCollapsed() ? u() : (A(), C.edit.on())) : A();
                if (y) {
                    y = !1, S.removeClass("fr-moving"), C.$el.removeClass("fr-no-selection"), C.edit.on();
                    var t = parseFloat(S.css("left")) + C.opts.tableResizerOffset + C.$wp.offset().left;
                    C.opts.iframe && (t -= C.$iframe.offset().left), S.data("release-position", t), S.removeData("max-left"), S.removeData("max-right"),
                        function T() {
                            var e = S.data("origin"),
                                t = S.data("release-position");
                            if (e !== t) {
                                var n = S.data("first"),
                                    a = S.data("second"),
                                    r = S.data("table"),
                                    o = r.outerWidth();
                                if (C.undo.canDo() || C.undo.saveStep(), null != n && null != a) {
                                    var i, s, l, c = L(r),
                                        d = [],
                                        f = [],
                                        p = [],
                                        u = [];
                                    for (i = 0; i < c.length; i++) s = R(c[i][n]), l = R(c[i][a]), d[i] = s.outerWidth(), p[i] = l.outerWidth(), f[i] = d[i] / o * 100, u[i] = p[i] / o * 100;
                                    for (i = 0; i < c.length; i++)
                                        if (s = R(c[i][n]), l = R(c[i][a]), c[i][n] != c[i][a]) {
                                            var h = (f[i] * (d[i] + t - e) / d[i]).toFixed(4);
                                            s.css("width", h + "%"), l.css("width", (f[i] + u[i] - h).toFixed(4) + "%")
                                        }
                                } else {
                                    var g, m = r.parent(),
                                        v = o / m.width() * 100,
                                        b = (parseInt(r.css("margin-left"), 10) || 0) / m.width() * 100,
                                        E = (parseInt(r.css("margin-right"), 10) || 0) / m.width() * 100;
                                    "rtl" == C.opts.direction && 0 === a || "rtl" != C.opts.direction && 0 !== a ? (g = (o + t - e) / o * v, r.css("margin-right", "calc(100% - ".concat(Math.round(g).toFixed(4), "% - ").concat(Math.round(b).toFixed(4), "%)"))) : ("rtl" == C.opts.direction && 0 !== a || "rtl" != C.opts.direction && 0 === a) && (g = (o - t + e) / o * v, r.css("margin-left", "calc(100% - ".concat(Math.round(g).toFixed(4), "% - ").concat(Math.round(E).toFixed(4), "%)"))), r.css("width", "".concat(Math.round(g).toFixed(4), "%"))
                                }
                                C.selection.restore(), C.undo.saveStep(), C.events.trigger("table.resized", [r.get(0)])
                            }
                            S.removeData("origin"), S.removeData("release-position"), S.removeData("first"), S.removeData("second"), S.removeData("table")
                        }(), P()
                }
            }
        }

        function D(e) {
            if (C.events.$on(R("input"), "click", ee), !0 === r && 0 < C.opts.tableEditButtons.length) {
                if (R(e.currentTarget).closest("table").is(J())) {
                    if ("TD" == e.currentTarget.tagName && 0 === C.$el.find("th.fr-selected-cell").length) return void I(a, e.currentTarget);
                    if ("TH" == e.currentTarget.tagName && 0 === C.$el.find("td.fr-selected-cell").length) return void I(a, e.currentTarget)
                }
                O()
            }
        }

        function B(e, t, n, a) {
            for (var r, o = t; o != C.el && "TD" != o.tagName && "TH" != o.tagName && ("up" == a ? r = o.previousElementSibling : "down" == a && (r = o.nextElementSibling), !r);) o = o.parentNode;
            "TD" == o.tagName || "TH" == o.tagName ? function i(e, t) {
                for (var n = e; n && "TABLE" != n.tagName && n.parentNode != C.el;) n = n.parentNode;
                if (n && "TABLE" == n.tagName) {
                    var a = L(R(n));
                    "up" == t ? F(w(e, a), n, a) : "down" == t && $(w(e, a), n, a)
                }
            }(o, a) : r && ("up" == a && C.selection.setAtEnd(r), "down" == a && C.selection.setAtStart(r))
        }

        function F(e, t, n) {
            0 < e.row ? C.selection.setAtEnd(n[e.row - 1][e.col]) : B(0, t, 0, "up")
        }

        function $(e, t, n) {
            var a = parseInt(n[e.row][e.col].getAttribute("rowspan"), 10) || 1;
            e.row < n.length - a ? C.selection.setAtStart(n[e.row + a][e.col]) : B(0, t, 0, "down")
        }

        function P() {
            S && (S.find("div").css("opacity", 0), S.css("top", 0), S.css("left", 0), S.css("height", 0), S.find("div").css("height", 0), S.hide())
        }

        function H() {
            c && c.removeClass("fr-visible").css("left", "-9999px")
        }

        function K(e, t) {
            var n = R(t),
                a = n.closest("table"),
                r = a.parent();
            if (t && "TD" != t.tagName && "TH" != t.tagName && (0 < n.closest("td").length ? t = n.closest("td") : 0 < n.closest("th").length && (t = n.closest("th"))), !t || "TD" != t.tagName && "TH" != t.tagName) S && n.get(0) != S.get(0) && n.parent().get(0) != S.get(0) && C.core.sameInstance(S) && P();
            else {
                if (n = R(t), 0 === C.$el.find(n).length) return !1;
                var o = n.offset().left - 1,
                    i = o + n.outerWidth();
                if (Math.abs(e.pageX - o) <= C.opts.tableResizerOffset || Math.abs(i - e.pageX) <= C.opts.tableResizerOffset) {
                    var s, l, c, d, f, p = L(a),
                        u = w(t, p),
                        h = _(u.row, u.col, p),
                        g = a.offset().top,
                        m = a.outerHeight() - 1;
                    "rtl" != C.opts.direction ? e.pageX - o <= C.opts.tableResizerOffset ? (c = o, 0 < u.col ? (d = o - G(u.col - 1, p) + C.opts.tableResizingLimit, f = o + G(u.col, p) - C.opts.tableResizingLimit, s = u.col - 1, l = u.col) : (s = null, l = 0, d = a.offset().left - 1 - parseInt(a.css("margin-left"), 10), f = a.offset().left - 1 + a.width() - p[0].length * C.opts.tableResizingLimit)) : i - e.pageX <= C.opts.tableResizerOffset && (c = i, h.col < p[h.row].length && p[h.row][h.col + 1] ? (d = i - G(h.col, p) + C.opts.tableResizingLimit, f = i + G(h.col + 1, p) - C.opts.tableResizingLimit, s = h.col, l = h.col + 1) : (s = h.col, l = null, d = a.offset().left - 1 + p[0].length * C.opts.tableResizingLimit, f = r.offset().left - 1 + r.width() + parseFloat(r.css("padding-left")))) : i - e.pageX <= C.opts.tableResizerOffset ? (c = i, 0 < u.col ? (d = i - G(u.col, p) + C.opts.tableResizingLimit, f = i + G(u.col - 1, p) - C.opts.tableResizingLimit, s = u.col, l = u.col - 1) : (s = null, l = 0, d = a.offset().left + p[0].length * C.opts.tableResizingLimit, f = r.offset().left - 1 + r.width() + parseFloat(r.css("padding-left")))) : e.pageX - o <= C.opts.tableResizerOffset && (c = o, h.col < p[h.row].length && p[h.row][h.col + 1] ? (d = o - G(h.col + 1, p) + C.opts.tableResizingLimit, f = o + G(h.col, p) - C.opts.tableResizingLimit, s = h.col + 1, l = h.col) : (s = h.col, l = null, d = r.offset().left + parseFloat(r.css("padding-left")), f = a.offset().left - 1 + a.width() - p[0].length * C.opts.tableResizingLimit)), S || function A() {
                        C.shared.$table_resizer || (C.shared.$table_resizer = R(document.createElement("div")).attr("class", "fr-table-resizer").html("<div></div>")), S = C.shared.$table_resizer, C.events.$on(S, "mousedown", function(e) {
                            return !C.core.sameInstance(S) || (0 < Q().length && M(), 1 == e.which ? (C.selection.save(), y = !0, S.addClass("fr-moving"), O(), C.edit.off(), S.find("div").css("opacity", 1), !1) : void 0)
                        }), C.events.$on(S, "mousemove", function(e) {
                            if (!C.core.sameInstance(S)) return !0;
                            y && (C.opts.iframe && (e.pageX -= C.$iframe.offset().left), j(e))
                        }), C.events.on("shared.destroy", function() {
                            S.html("").removeData().remove(), S = null
                        }, !0), C.events.on("destroy", function() {
                            C.$el.find(".fr-selected-cell").removeClass("fr-selected-cell"), R("body").first().append(S.hide())
                        }, !0)
                    }(), S.data("table", a), S.data("first", s), S.data("second", l), S.data("instance", C), C.$wp.append(S);
                    var v = c - C.win.pageXOffset - C.opts.tableResizerOffset - C.$wp.offset().left,
                        b = g - C.$wp.offset().top + C.$wp.scrollTop();
                    if (C.opts.iframe) {
                        var E = C.helpers.getPX(C.$wp.find(".fr-iframe").css("padding-top")),
                            T = C.helpers.getPX(C.$wp.find(".fr-iframe").css("padding-left"));
                        v += C.$iframe.offset().left + T, b += C.$iframe.offset().top + E, d += C.$iframe.offset().left, f += C.$iframe.offset().left
                    }
                    S.data("max-left", d), S.data("max-right", f), S.data("origin", c - C.win.pageXOffset), S.css("top", b), S.css("left", v), S.css("height", m), S.find("div").css("height", m), S.css("padding-left", C.opts.tableResizerOffset), S.css("padding-right", C.opts.tableResizerOffset), S.show()
                } else C.core.sameInstance(S) && P()
            }
        }

        function U(e, t) {
            if (C.$box.find(".fr-line-breaker").isVisible()) return !1;
            c || X(), C.$box.append(c), c.data("instance", C);
            var n, a = R(t).find("tr").first(),
                r = e.pageX,
                o = 0,
                i = 0;
            if (C.opts.iframe) {
                var s = C.helpers.getPX(C.$wp.find(".fr-iframe").css("padding-top")),
                    l = C.helpers.getPX(C.$wp.find(".fr-iframe").css("padding-left"));
                o += C.$iframe.offset().left - C.helpers.scrollLeft() + l, i += C.$iframe.offset().top - C.helpers.scrollTop() + s
            }
            a.find("th, td").each(function() {
                var e = R(this);
                return e.offset().left <= r && r < e.offset().left + e.outerWidth() / 2 ? (n = parseInt(c.find("a").css("width"), 10), c.css("top", i + e.offset().top - C.$box.offset().top - n - 5), c.css("left", o + e.offset().left - C.$box.offset().left - n / 2), c.data("selected-cell", e), c.data("position", "before"), c.addClass("fr-visible"), !1) : e.offset().left + e.outerWidth() / 2 <= r && r < e.offset().left + e.outerWidth() ? (n = parseInt(c.find("a").css("width"), 10), c.css("top", i + e.offset().top - C.$box.offset().top - n - 5), c.css("left", o + e.offset().left - C.$box.offset().left + e.outerWidth() - n / 2), c.data("selected-cell", e), c.data("position", "after"), c.addClass("fr-visible"), !1) : void 0
            })
        }

        function W(e, t) {
            if (C.$box.find(".fr-line-breaker").isVisible()) return !1;
            c || X(), C.$box.append(c), c.data("instance", C);
            var n, a = R(t),
                r = e.pageY,
                o = 0,
                i = 0;
            if (C.opts.iframe) {
                var s = C.helpers.getPX(C.$wp.find(".fr-iframe").css("padding-top")),
                    l = C.helpers.getPX(C.$wp.find(".fr-iframe").css("padding-left"));
                o += C.$iframe.offset().left - C.helpers.scrollLeft() + l, i += C.$iframe.offset().top - C.helpers.scrollTop() + s
            }
            a.find("tr").each(function() {
                var e = R(this);
                return e.offset().top <= r && r < e.offset().top + e.outerHeight() / 2 ? (n = parseInt(c.find("a").css("width"), 10), c.css("top", i + e.offset().top - C.$box.offset().top - n / 2), c.css("left", o + e.offset().left - C.$box.offset().left - n - 5), c.data("selected-cell", e.find("td").first()), c.data("position", "above"), c.addClass("fr-visible"), !1) : e.offset().top + e.outerHeight() / 2 <= r && r < e.offset().top + e.outerHeight() ? (n = parseInt(c.find("a").css("width"), 10), c.css("top", i + e.offset().top - C.$box.offset().top + e.outerHeight() - n / 2), c.css("left", o + e.offset().left - C.$box.offset().left - n - 5), c.data("selected-cell", e.find("td").first()), c.data("position", "below"), c.addClass("fr-visible"), !1) : void 0
            })
        }

        function V(e) {
            i = null;
            var t = C.doc.elementFromPoint(e.pageX - C.win.pageXOffset, e.pageY - C.win.pageYOffset);
            C.opts.tableResizer && (!C.popups.areVisible() || C.popups.areVisible() && C.popups.isVisible("table.edit")) && K(e, t), !C.opts.tableInsertHelper || C.popups.areVisible() || C.$tb.hasClass("fr-inline") && C.$tb.isVisible() || function o(e, t) {
                if (0 === Q().length) {
                    var n, a, r;
                    if (t && ("HTML" == t.tagName || "BODY" == t.tagName || C.node.isElement(t)))
                        for (n = 1; n <= C.opts.tableInsertHelperOffset; n++) {
                            if (a = C.doc.elementFromPoint(e.pageX - C.win.pageXOffset, e.pageY - C.win.pageYOffset + n), R(a).hasClass("fr-tooltip")) return !0;
                            if (a && ("TH" == a.tagName || "TD" == a.tagName || "TABLE" == a.tagName) && (R(a).parents(".fr-wrapper").length || C.opts.iframe) && "false" != R(a).closest("table").attr("contenteditable")) return U(e, R(a).closest("table")), !0;
                            if (r = C.doc.elementFromPoint(e.pageX - C.win.pageXOffset + n, e.pageY - C.win.pageYOffset), R(r).hasClass("fr-tooltip")) return !0;
                            if (r && ("TH" == r.tagName || "TD" == r.tagName || "TABLE" == r.tagName) && (R(r).parents(".fr-wrapper").length || C.opts.iframe) && "false" != R(r).closest("table").attr("contenteditable")) return W(e, R(r).closest("table")), !0
                        }
                    C.core.sameInstance(c) && H()
                }
            }(e, t)
        }

        function z() {
            if (y) {
                var e = S.data("table").offset().top - C.win.pageYOffset;
                if (C.opts.iframe) {
                    var t = C.helpers.getPX(C.$wp.find(".fr-iframe").css("padding-top"));
                    e += C.$iframe.offset().top - C.helpers.scrollTop() + t
                }
                S.css("top", e)
            }
        }

        function G(e, t) {
            var n, a = R(t[0][e]).outerWidth();
            for (n = 1; n < t.length; n++) a = Math.min(a, R(t[n][e]).outerWidth());
            return a
        }

        function Y(e, t, n) {
            var a, r = 0;
            for (a = e; a <= t; a++) r += G(a, n);
            return r
        }

        function j(e) {
            if (1 < Q().length && o && O(), !1 === o && !1 === r && !1 === y) i && clearTimeout(i), C.edit.isDisabled() && !C.popups.isVisible("table.edit") || (i = setTimeout(V, 30, e));
            else if (y) {
                var t = e.pageX - C.win.pageXOffset;
                C.opts.iframe && (t += C.$iframe.offset().left);
                var n = S.data("max-left"),
                    a = S.data("max-right");
                n <= t && t <= a ? S.css("left", t - C.opts.tableResizerOffset - C.$wp.offset().left) : t < n && parseFloat(S.css("left"), 10) > n - C.opts.tableResizerOffset ? S.css("left", n - C.opts.tableResizerOffset - C.$wp.offset().left) : a < t && parseFloat(S.css("left"), 10) < a - C.opts.tableResizerOffset && S.css("left", a - C.opts.tableResizerOffset - C.$wp.offset().left)
            } else o && H()
        }

        function q(e) {
            C.node.isEmpty(e.get(0)) ? e.prepend($e.MARKERS) : e.prepend($e.START_MARKER).append($e.END_MARKER)
        }

        function X() {
            C.shared.$ti_helper || (C.shared.$ti_helper = R(document.createElement("div")).attr("class", "fr-insert-helper").html('<a class="fr-floating-btn" role="button" tabIndex="-1" title="'.concat(C.language.translate("Insert"), '"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M22,16.75 L16.75,16.75 L16.75,22 L15.25,22.000 L15.25,16.75 L10,16.75 L10,15.25 L15.25,15.25 L15.25,10 L16.75,10 L16.75,15.25 L22,15.25 L22,16.75 Z"/></svg></a>')), C.events.bindClick(C.shared.$ti_helper, "a", function() {
                var e = c.data("selected-cell"),
                    t = c.data("position"),
                    n = c.data("instance") || C;
                "before" == t ? (C.undo.saveStep(), e.addClass("fr-selected-cell"), n.table.insertColumn(t), e.removeClass("fr-selected-cell"), C.undo.saveStep()) : "after" == t ? (C.undo.saveStep(), e.addClass("fr-selected-cell"), n.table.insertColumn(t), e.removeClass("fr-selected-cell"), C.undo.saveStep()) : "above" == t ? (C.undo.saveStep(), e.addClass("fr-selected-cell"), n.table.insertRow(t), e.removeClass("fr-selected-cell"), C.undo.saveStep()) : "below" == t && (C.undo.saveStep(), e.addClass("fr-selected-cell"), n.table.insertRow(t), e.removeClass("fr-selected-cell"), C.undo.saveStep()), H()
            }), C.events.on("shared.destroy", function() {
                C.shared.$ti_helper.html("").removeData().remove(), C.shared.$ti_helper = null
            }, !0), C.events.$on(C.shared.$ti_helper, "mousemove", function(e) {
                e.stopPropagation()
            }, !0), C.events.$on(R(C.o_win), "scroll", function() {
                H()
            }, !0), C.events.$on(C.$wp, "scroll", function() {
                H()
            }, !0)), c = C.shared.$ti_helper, C.events.on("destroy", function() {
                c = null
            }), C.tooltip.bind(C.$box, ".fr-insert-helper > a.fr-floating-btn")
        }

        function Z() {
            a = null, clearTimeout(i)
        }

        function Q() {
            return C.el.querySelectorAll(".fr-selected-cell")
        }

        function J() {
            var e = Q();
            if (e.length) {
                for (var t = e[0]; t && "TABLE" != t.tagName && t.parentNode != C.el;) t = t.parentNode;
                return t && "TABLE" == t.tagName ? R(t) : R([])
            }
            return R([])
        }

        function ee(e) {
            r = !1
        }

        return {
            _init: function te() {
                if (!C.$wp) return !1;
                if (!C.helpers.isMobile()) {
                    y = r = o = !1, C.events.$on(C.$el, "mousedown", e), C.popups.onShow("image.edit", function() {
                        A(), r = o = !1
                    }), C.popups.onShow("link.edit", function() {
                        A(), r = o = !1
                    }), C.events.on("commands.mousedown", function(e) {
                        0 < e.parents(".fr-toolbar").length && A()
                    }), C.events.$on(C.$el, "mouseover", "th, td", D), C.events.$on(C.$win, "mouseup", n), C.opts.iframe && C.events.$on(R(C.o_win), "mouseup", n), C.events.$on(C.$win, "mousemove", j), C.events.$on(R(C.o_win), "scroll", z), C.events.on("contentChanged", function() {
                        0 < Q().length && (u(), C.$el.find("img").on("load.selected-cells", function() {
                            R(this).off("load.selected-cells"), 0 < Q().length && u()
                        }))
                    }), C.events.$on(R(C.o_win), "resize", function() {
                        A()
                    }), C.events.on("toolbar.esc", function() {
                        if (0 < Q().length) return C.events.disableBlur(), C.events.focus(), !1
                    }, !0), C.events.$on(R(C.o_win), "keydown", function() {
                        o && r && (r = o = !1, C.$el.removeClass("fr-no-selection"), C.edit.on(), C.selection.setAtEnd(C.$el.find(".fr-selected-cell").last().get(0)), C.selection.restore(), A())
                    }), C.events.$on(C.$el, "keydown", function(e) {
                        e.shiftKey ? !1 === function i(e) {
                            var t = Q();
                            if (null != t && 0 < t.length) {
                                var n, a = L(),
                                    r = e.which,
                                    o = w(1 == t.length ? n = t[0] : (n = C.el.querySelector(".fr-cell-fixed"), C.el.querySelector(".fr-cell-handler")), a);
                                if ($e.KEYCODE.ARROW_RIGHT == r) {
                                    if (o.col < a[0].length - 1) return I(n, a[o.row][o.col + 1]), !1
                                } else if ($e.KEYCODE.ARROW_DOWN == r) {
                                    if (o.row < a.length - 1) return I(n, a[o.row + 1][o.col]), !1
                                } else if ($e.KEYCODE.ARROW_LEFT == r) {
                                    if (0 < o.col) return I(n, a[o.row][o.col - 1]), !1
                                } else if ($e.KEYCODE.ARROW_UP == r && 0 < o.row) return I(n, a[o.row - 1][o.col]), !1
                            }
                        }(e) && setTimeout(function() {
                            u()
                        }, 0) : function s(e) {
                            var t = e.which,
                                n = C.selection.blocks();
                            if (n.length && ("TD" == (n = n[0]).tagName || "TH" == n.tagName)) {
                                for (var a = n; a && "TABLE" != a.tagName && a.parentNode != C.el;) a = a.parentNode;
                                if (a && "TABLE" == a.tagName && ($e.KEYCODE.ARROW_LEFT == t || $e.KEYCODE.ARROW_UP == t || $e.KEYCODE.ARROW_RIGHT == t || $e.KEYCODE.ARROW_DOWN == t) && (0 < Q().length && M(), C.browser.webkit && ($e.KEYCODE.ARROW_UP == t || $e.KEYCODE.ARROW_DOWN == t))) {
                                    var r = C.selection.ranges(0).startContainer;
                                    if (r.nodeType == Node.TEXT_NODE && ($e.KEYCODE.ARROW_UP == t && (r.previousSibling && "BR" !== r.previousSibling.tagName || r.previousSibling && "BR" === r.previousSibling.tagName && r.previousSibling.previousSibling) || $e.KEYCODE.ARROW_DOWN == t && (r.nextSibling && "BR" !== r.nextSibling.tagName || r.nextSibling && "BR" === r.nextSibling.tagName && r.nextSibling.nextSibling))) return;
                                    e.preventDefault(), e.stopPropagation();
                                    var o = L(R(a)),
                                        i = w(n, o);
                                    return $e.KEYCODE.ARROW_UP == t ? F(i, a, o) : $e.KEYCODE.ARROW_DOWN == t && $(i, a, o), C.selection.restore(), !1
                                }
                            }
                        }(e)
                    }), C.events.on("keydown", function(e) {
                        if (!1 === function a(e) {
                                if (e.which == $e.KEYCODE.TAB) {
                                    var t;
                                    if (0 < Q().length) t = C.$el.find(".fr-selected-cell").last();
                                    else {
                                        var n = C.selection.element();
                                        "TD" == n.tagName || "TH" == n.tagName ? t = R(n) : n != C.el && (0 < R(n).parentsUntil(C.$el, "td").length ? t = R(n).parents("td").first() : 0 < R(n).parentsUntil(C.$el, "th").length && (t = R(n).parents("th").first()))
                                    }
                                    if (t) return e.preventDefault(), !!(0 === C.selection.get().focusOffset && 0 < R(C.selection.element()).parentsUntil(C.$el, "ol, ul").length && (0 < R(C.selection.element()).closest("li").prev().length || R(C.selection.element()).is("li") && 0 < R(C.selection.element()).prev().length)) || (M(), e.shiftKey ? 0 < t.prev().length ? q(t.prev()) : 0 < t.closest("tr").length && 0 < t.closest("tr").prev().length ? q(t.closest("tr").prev().find("td").last()) : 0 < t.closest("tbody").length && 0 < t.closest("table").find("thead tr").length && q(t.closest("table").find("thead tr th").last()) : 0 < t.next().length ? q(t.next()) : 0 < t.closest("tr").length && 0 < t.closest("tr").next().length ? q(t.closest("tr").next().find("td").first()) : 0 < t.closest("thead").length && 0 < t.closest("table").find("tbody tr").length ? q(t.closest("table").find("tbody tr td").first()) : (t.addClass("fr-selected-cell"), g("below"), A(), q(t.closest("tr").next().find("td").first())), C.selection.restore(), !1)
                                }
                            }(e)) return !1;
                        var t = Q();
                        if (0 < t.length) {
                            if (0 < t.length && C.keys.ctrlKey(e) && e.which == $e.KEYCODE.A) return A(), C.popups.isVisible("table.edit") && C.popups.hide("table.edit"), t = [], !0;
                            if (e.which == $e.KEYCODE.ESC && C.popups.isVisible("table.edit")) return A(), C.popups.hide("table.edit"), e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation(), !(t = []);
                            if (1 < t.length && (e.which == $e.KEYCODE.BACKSPACE || e.which == $e.KEYCODE.DELETE)) {
                                C.undo.saveStep();
                                for (var n = 0; n < t.length; n++) R(t[n]).html("<br>"), n == t.length - 1 && R(t[n]).prepend($e.MARKERS);
                                return C.selection.restore(), C.undo.saveStep(), !(t = [])
                            }
                            if (1 < t.length && e.which != $e.KEYCODE.F10 && !C.keys.isBrowserAction(e)) return e.preventDefault(), !(t = [])
                        } else if (!(t = []) === function r(e) {
                                if (e.altKey && e.which == $e.KEYCODE.SPACE) {
                                    var t, n = C.selection.element();
                                    if ("TD" == n.tagName || "TH" == n.tagName ? t = n : 0 < R(n).closest("td").length ? t = R(n).closest("td").get(0) : 0 < R(n).closest("th").length && (t = R(n).closest("th").get(0)), t) return e.preventDefault(), I(t, t), u(), !1
                                }
                            }(e)) return !1
                    }, !0);
                    var t = [];
                    C.events.on("html.beforeGet", function() {
                        t = Q();
                        for (var e = 0; e < t.length; e++) t[e].className = (t[e].className || "").replace(/fr-selected-cell/g, "")
                    }), C.events.on("html.afterGet", function() {
                        for (var e = 0; e < t.length; e++) t[e].className = (t[e].className ? t[e].className.trim() + " " : "") + "fr-selected-cell";
                        t = []
                    }), d(!0), p(!0)
                }
                C.events.on("destroy", Z)
            },
            insert: function ne(e, t) {
                var n, a,
                    r = "<table " + (C.opts.tableDefaultWidth ? 'style="width: ' + C.opts.tableDefaultWidth + ';" ' : "") + 'class="fr-inserted-table"><tbody>',
                    o = 100 / t;
                for (n = 0; n < e; n++) {
                    for (r += "<tr>", a = 0; a < t; a++) r += "<td" + (C.opts.tableDefaultWidth ? ' style="width: ' + o.toFixed(4) + '%;"' : "") + ">", 0 === n && 0 === a && (r += $e.MARKERS), r += "<br></td>";
                    r += "</tr>"
                }
                r += "</tbody></table>", C.html.insert(r), C.selection.restore();
                var i = C.$el.find(".fr-inserted-table");
                i.removeClass("fr-inserted-table"), C.events.trigger("table.inserted", [i.get(0)])
            },
            remove: h,
            insertRow: g,
            deleteRow: function ae() {
                var e = J();
                if (0 < e.length) {
                    var t, n, a, r = L(),
                        o = N(r);
                    if (null == o) return;
                    if (0 === o.min_i && o.max_i == r.length - 1) h();
                    else {
                        for (t = o.max_i; t >= o.min_i; t--) {
                            for (a = R(e.find("tr").not(e.find("> table tr")).get(t)), n = 0; n < r[t].length; n++)
                                if (0 === n || r[t][n] != r[t][n - 1]) {
                                    var i = R(r[t][n]);
                                    if (1 < parseInt(i.attr("rowspan"), 10)) {
                                        var s = parseInt(i.attr("rowspan"), 10) - 1;
                                        1 == s ? i.removeAttr("rowspan") : i.attr("rowspan", s)
                                    }
                                    if (t < r.length - 1 && r[t][n] == r[t + 1][n] && (0 === t || r[t][n] != r[t - 1][n])) {
                                        for (var l = r[t][n], c = n; 0 < c && r[t][c] == r[t][c - 1];) c--;
                                        0 === c ? R(e.find("tr").not(e.find("> table tr")).get(t + 1)).prepend(l) : R(r[t + 1][c - 1])[0].parentNode && R(r[t + 1][c - 1])[0].insertAdjacentElement("afterend", l)
                                    }
                                }
                            var d = a.parent();
                            a.remove(), 0 === d.find("tr").length && d.remove(), r = L(e)
                        }
                        E(0, r.length - 1, 0, r[0].length - 1, e), 0 < o.min_i ? C.selection.setAtEnd(r[o.min_i - 1][0]) : C.selection.setAtEnd(r[0][0]), C.selection.restore(), C.popups.hide("table.edit")
                    }
                }
            },
            insertColumn: function re(l) {
                var e = J();
                if (0 < e.length) {
                    var c, d = L(),
                        t = N(d);
                    c = "before" == l ? t.min_j : t.max_j;
                    var n, f = 100 / d[0].length,
                        p = 100 / (d[0].length + 1);
                    e.find("th, td").each(function() {
                        (n = R(this)).data("old-width", n.outerWidth() / e.outerWidth() * 100)
                    }), e.find("tr").not(e.find("> table tr")).each(function(e) {
                        for (var t, n = R(this), a = 0, r = 0; a - 1 < c;) {
                            if (!(t = n.find("> th, > td").get(r))) {
                                t = null;
                                break
                            }
                            t == d[e][a] ? (a += parseInt(R(t).attr("colspan"), 10) || 1, r++) : (a += parseInt(R(d[e][a]).attr("colspan"), 10) || 1, "after" == l && (t = 0 === r ? -1 : n.find("> th, > td").get(r - 1)))
                        }
                        var o, i = R(t);
                        if ("after" == l && c < a - 1 || "before" == l && 0 < c && d[e][c] == d[e][c - 1]) {
                            if (0 === e || 0 < e && d[e][c] != d[e - 1][c]) {
                                var s = parseInt(i.attr("colspan"), 10) + 1;
                                i.attr("colspan", s), i.css("width", (i.data("old-width") * p / f + p).toFixed(4) + "%"), i.removeData("old-width")
                            }
                        } else o = 0 < n.find("th").length ? '<th style="width: '.concat(p.toFixed(4), '%;"><br></th>') : '<td style="width: '.concat(p.toFixed(4), '%;"><br></td>'), -1 == t ? n.prepend(o) : null == t ? n.append(o) : "before" == l ? i.before(o) : "after" == l && i[0].parentNode && i[0].insertAdjacentHTML("afterend", o)
                    }), e.find("th, td").each(function() {
                        (n = R(this)).data("old-width") && (n.css("width", (n.data("old-width") * p / f).toFixed(4) + "%"), n.removeData("old-width"))
                    }), C.popups.isVisible("table.edit") && u()
                }
            },
            deleteColumn: function oe() {
                var e = J();
                if (0 < e.length) {
                    var t, n, a, r = L(),
                        o = N(r);
                    if (null == o) return;
                    if (0 === o.min_j && o.max_j == r[0].length - 1) h();
                    else {
                        var i = 0;
                        for (t = 0; t < r.length; t++)
                            for (n = 0; n < r[0].length; n++)(a = R(r[t][n])).hasClass("fr-selected-cell") || (a.data("old-width", a.outerWidth() / e.outerWidth() * 100), (n < o.min_j || n > o.max_j) && (i += a.outerWidth() / e.outerWidth() * 100));
                        for (i /= r.length, n = o.max_j; n >= o.min_j; n--)
                            for (t = 0; t < r.length; t++)
                                if (0 === t || r[t][n] != r[t - 1][n])
                                    if (a = R(r[t][n]), 1 < (parseInt(a.attr("colspan"), 10) || 1)) {
                                        var s = parseInt(a.attr("colspan"), 10) - 1;
                                        1 == s ? a.removeAttr("colspan") : a.attr("colspan", s), a.css("width", (100 * (a.data("old-width") - G(n, r)) / i).toFixed(4) + "%"), a.removeData("old-width")
                                    } else {
                                        var l = R(a.parent().get(0));
                                        a.remove(), 0 === l.find("> th, > td").length && (0 === l.prev().length || 0 === l.next().length || l.prev().find("> th[rowspan], > td[rowspan]").length < l.prev().find("> th, > td").length) && l.remove()
                                    }
                        E(0, r.length - 1, 0, r[0].length - 1, e), 0 < o.min_j ? C.selection.setAtEnd(r[o.min_i][o.min_j - 1]) : C.selection.setAtEnd(r[o.min_i][0]), C.selection.restore(), C.popups.hide("table.edit"), e.find("th, td").each(function() {
                            (a = R(this)).data("old-width") && (a.css("width", (100 * a.data("old-width") / i).toFixed(4) + "%"), a.removeData("old-width"))
                        })
                    }
                }
            },
            mergeCells: function ie() {
                if (1 < Q().length && (0 === C.$el.find("th.fr-selected-cell").length || 0 === C.$el.find("td.fr-selected-cell").length)) {
                    T();
                    var e, t, n = N(L());
                    if (null == n) return;
                    var a = C.$el.find(".fr-selected-cell"),
                        r = R(a[0]),
                        o = r.parent().find(".fr-selected-cell"),
                        i = r.closest("table"),
                        s = r.html(),
                        l = 0;
                    for (e = 0; e < o.length; e++) l += R(o[e]).outerWidth();
                    for (r.css("width", Math.min(100, l / i.outerWidth() * 100).toFixed(4) + "%"), n.min_j < n.max_j && r.attr("colspan", n.max_j - n.min_j + 1), n.min_i < n.max_i && r.attr("rowspan", n.max_i - n.min_i + 1), e = 1; e < a.length; e++) "<br>" != (t = R(a[e])).html() && "" !== t.html() && (s += "<br>".concat(t.html())), t.remove();
                    r.html(s), C.selection.setAtEnd(r.get(0)), C.selection.restore(), C.toolbar.enable(), v(n.min_i, n.max_i, i);
                    var c = i.find("tr:empty");
                    for (e = c.length - 1; 0 <= e; e--) R(c[e]).remove();
                    m(n.min_j, n.max_j, i), u()
                }
            },
            splitCellVertically: function se() {
                if (1 == Q().length) {
                    var e = C.$el.find(".fr-selected-cell"),
                        t = parseInt(e.attr("colspan"), 10) || 1,
                        n = e.parent().outerWidth(),
                        a = e.outerWidth(),
                        r = e.clone().html("<br>"),
                        o = L(),
                        i = w(e.get(0), o);
                    if (1 < t) {
                        var s = Math.ceil(t / 2);
                        a = Y(i.col, i.col + s - 1, o) / n * 100;
                        var l = Y(i.col + s, i.col + t - 1, o) / n * 100;
                        1 < s ? e.attr("colspan", s) : e.removeAttr("colspan"), 1 < t - s ? r.attr("colspan", t - s) : r.removeAttr("colspan"), e.css("width", a.toFixed(4) + "%"), r.css("width", l.toFixed(4) + "%")
                    } else {
                        var c;
                        for (c = 0; c < o.length; c++)
                            if (0 === c || o[c][i.col] != o[c - 1][i.col]) {
                                var d = R(o[c][i.col]);
                                if (!d.is(e)) {
                                    var f = (parseInt(d.attr("colspan"), 10) || 1) + 1;
                                    d.attr("colspan", f)
                                }
                            }
                        a = a / n * 100 / 2, e.css("width", "".concat(a.toFixed(4), "%")), r.css("width", "".concat(a.toFixed(4), "%"))
                    }
                    e[0].parentNode && e[0].insertAdjacentElement("afterend", r[0]), A(), C.popups.hide("table.edit")
                }
            },
            splitCellHorizontally: function le() {
                if (1 == Q().length) {
                    var e = C.$el.find(".fr-selected-cell"),
                        t = e.parent(),
                        n = e.closest("table"),
                        a = parseInt(e.attr("rowspan"), 10),
                        r = L(),
                        o = w(e.get(0), r),
                        i = e.clone().html("<br>");
                    if (1 < a) {
                        var s = Math.ceil(a / 2);
                        1 < s ? e.attr("rowspan", s) : e.removeAttr("rowspan"), 1 < a - s ? i.attr("rowspan", a - s) : i.removeAttr("rowspan");
                        for (var l = o.row + s, c = 0 === o.col ? o.col : o.col - 1; 0 <= c && (r[l][c] == r[l][c - 1] || 0 < l && r[l][c] == r[l - 1][c]);) c--; -
                        1 == c ? R(n.find("tr").not(n.find("> table tr")).get(l)).prepend(i) : R(r[l][c])[0].parentNode && R(r[l][c])[0].insertAdjacentElement("afterend", i[0])
                    } else {
                        var d, f = R(document.createElement("tr")).append(i);
                        for (d = 0; d < r[0].length; d++)
                            if (0 === d || r[o.row][d] != r[o.row][d - 1]) {
                                var p = R(r[o.row][d]);
                                p.is(e) || p.attr("rowspan", (parseInt(p.attr("rowspan"), 10) || 1) + 1)
                            }
                        t[0].parentNode && t[0].insertAdjacentElement("afterend", f[0])
                    }
                    A(), C.popups.hide("table.edit")
                }
            },
            addHeader: function ce() {
                var e = J();
                if (0 < e.length && 0 === e.find("th").length) {
                    var t, n = "<thead><tr>",
                        a = 0;
                    for (e.find("tr").first().find("> td").each(function() {
                            var e = R(this);
                            a += parseInt(e.attr("colspan"), 10) || 1
                        }), t = 0; t < a; t++) n += "<th><br></th>";
                    n += "</tr></thead>", e.prepend(n), u()
                }
            },
            removeHeader: function de() {
                var e = J(),
                    t = e.find("thead");
                if (0 < t.length)
                    if (0 === e.find("tbody tr").length) h();
                    else if (t.remove(), 0 < Q().length) u();
                else {
                    C.popups.hide("table.edit");
                    var n = e.find("tbody tr").first().find("td").first().get(0);
                    n && (C.selection.setAtEnd(n), C.selection.restore())
                }
            },
            setBackground: t,
            showInsertPopup: function fe() {
                var e = C.$tb.find('.fr-command[data-cmd="insertTable"]'),
                    t = C.popups.get("table.insert");
                if (t || (t = d()), !t.hasClass("fr-active")) {
                    C.popups.refresh("table.insert"), C.popups.setContainer("table.insert", C.$tb);
                    var n = C.button.getPosition(e),
                        a = n.left,
                        r = n.top;
                    C.popups.show("table.insert", a, r, e.outerHeight())
                }
            },
            showEditPopup: u,
            showColorsPopup: s,
            back: function pe() {
                0 < Q().length ? u() : (C.popups.hide("table.insert"), C.toolbar.showInline())
            },
            verticalAlign: function ue(e) {
                C.$el.find(".fr-selected-cell").css("vertical-align", e)
            },
            horizontalAlign: function he(e) {
                C.$el.find(".fr-selected-cell").css("text-align", e)
            },
            applyStyle: function ge(e, t, n, a) {
                if (0 < t.length) {
                    if (!n) {
                        var r = Object.keys(a);
                        r.splice(r.indexOf(e), 1), t.removeClass(r.join(" "))
                    }
                    t.toggleClass(e)
                }
            },
            selectedTable: J,
            selectedCells: Q,
            customColor: function me() {
                var e = C.popups.get("table.colors").find(".fr-table-colors-hex-layer input");
                e.length && t(e.val())
            },
            selectCells: I
        }
    }, $e.DefineIcon("insertTable", {
        NAME: "table",
        SVG_KEY: "insertTable"
    }), $e.RegisterCommand("insertTable", {
        title: "Insert Table",
        undo: !1,
        focus: !0,
        refreshOnCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("table.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("table.insert")) : this.table.showInsertPopup()
        },
        plugin: "table"
    }), $e.RegisterCommand("tableInsert", {
        callback: function(e, t, n) {
            this.table.insert(t, n), this.popups.hide("table.insert")
        }
    }), $e.DefineIcon("tableHeader", {
        NAME: "header",
        FA5NAME: "heading",
        SVG_KEY: "tableHeader"
    }), $e.RegisterCommand("tableHeader", {
        title: "Table Header",
        focus: !1,
        toggle: !0,
        callback: function() {
            this.popups.get("table.edit").find('.fr-command[data-cmd="tableHeader"]').hasClass("fr-active") ? this.table.removeHeader() : this.table.addHeader()
        },
        refresh: function(e) {
            var t = this.table.selectedTable();
            0 < t.length && (0 === t.find("th").length ? e.removeClass("fr-active").attr("aria-pressed", !1) : e.addClass("fr-active").attr("aria-pressed", !0))
        }
    }), $e.DefineIcon("tableRows", { NAME: "bars", SVG_KEY: "row" }), $e.RegisterCommand("tableRows", {
        type: "dropdown",
        focus: !1,
        title: "Row",
        options: { above: "Insert row above", below: "Insert row below", "delete": "Delete row" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = $e.COMMANDS.tableRows.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableRows" data-param1="' + n + '" title="' + this.language.translate(t[n]) + '">' + this.language.translate(t[n]) + "</a></li>");
            return e += "</ul>"
        },
        callback: function(e, t) {
            "above" == t || "below" == t ? this.table.insertRow(t) : this.table.deleteRow()
        }
    }), $e.DefineIcon("tableColumns", {
        NAME: "bars fa-rotate-90",
        SVG_KEY: "columns"
    }), $e.RegisterCommand("tableColumns", {
        type: "dropdown",
        focus: !1,
        title: "Column",
        options: { before: "Insert column before", after: "Insert column after", "delete": "Delete column" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = $e.COMMANDS.tableColumns.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableColumns" data-param1="'.concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.language.translate(t[n]), "</a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            "before" == t || "after" == t ? this.table.insertColumn(t) : this.table.deleteColumn()
        }
    }), $e.DefineIcon("tableCells", {
        NAME: "square-o",
        FA5NAME: "square",
        SVG_KEY: "cellOptions"
    }), $e.RegisterCommand("tableCells", {
        type: "dropdown",
        focus: !1,
        title: "Cell",
        options: { merge: "Merge cells", "vertical-split": "Vertical split", "horizontal-split": "Horizontal split" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = $e.COMMANDS.tableCells.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCells" data-param1="'.concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.language.translate(t[n]), "</a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            "merge" == t ? this.table.mergeCells() : "vertical-split" == t ? this.table.splitCellVertically() : this.table.splitCellHorizontally()
        },
        refreshOnShow: function(e, t) {
            1 < this.$el.find(".fr-selected-cell").length ? (t.find('a[data-param1="vertical-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="horizontal-split"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="merge"]').removeClass("fr-disabled").attr("aria-disabled", !1)) : (t.find('a[data-param1="merge"]').addClass("fr-disabled").attr("aria-disabled", !0), t.find('a[data-param1="vertical-split"]').removeClass("fr-disabled").attr("aria-disabled", !1), t.find('a[data-param1="horizontal-split"]').removeClass("fr-disabled").attr("aria-disabled", !1))
        }
    }), $e.DefineIcon("tableRemove", {
        NAME: "trash",
        SVG_KEY: "removeTable"
    }), $e.RegisterCommand("tableRemove", {
        title: "Remove Table",
        focus: !1,
        callback: function() {
            this.table.remove()
        }
    }), $e.DefineIcon("tableStyle", {
        NAME: "paint-brush",
        SVG_KEY: "tableStyle"
    }), $e.RegisterCommand("tableStyle", {
        title: "Table Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.tableStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableStyle" data-param1="'.concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.language.translate(t[n]), "</a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.table.applyStyle(t, this.$el.find(".fr-selected-cell").closest("table"), this.opts.tableMultipleStyles, this.opts.tableStyles)
        },
        refreshOnShow: function(e, t) {
            var n = this.$,
                a = this.$el.find(".fr-selected-cell").closest("table");
            a && t.find(".fr-command").each(function() {
                var e = n(this).data("param1"),
                    t = a.hasClass(e);
                n(this).toggleClass("fr-active", t).attr("aria-selected", t)
            })
        }
    }), $e.DefineIcon("tableCellBackground", {
        NAME: "tint",
        SVG_KEY: "cellBackground"
    }), $e.RegisterCommand("tableCellBackground", {
        title: "Cell Background",
        focus: !1,
        popup: !0,
        callback: function() {
            this.table.showColorsPopup()
        }
    }), $e.RegisterCommand("tableCellBackgroundColor", {
        undo: !0,
        focus: !1,
        callback: function(e, t) {
            this.table.setBackground(t)
        }
    }), $e.DefineIcon("tableBack", { NAME: "arrow-left", SVG_KEY: "back" }), $e.RegisterCommand("tableBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.table.back()
        },
        refresh: function(e) {
            0 !== this.table.selectedCells().length || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
        }
    }), $e.DefineIcon("tableCellVerticalAlign", {
        NAME: "arrows-v",
        FA5NAME: "arrows-alt-v",
        SVG_KEY: "verticalAlignMiddle"
    }), $e.RegisterCommand("tableCellVerticalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Vertical Align",
        options: { Top: "Align Top", Middle: "Align Middle", Bottom: "Align Bottom" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = $e.COMMANDS.tableCellVerticalAlign.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellVerticalAlign" data-param1="'.concat(n.toLowerCase(), '" title="').concat(this.language.translate(t[n]), '">').concat(this.language.translate(n), "</a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.table.verticalAlign(t)
        },
        refreshOnShow: function(e, t) {
            t.find('.fr-command[data-param1="' + this.$el.find(".fr-selected-cell").css("vertical-align") + '"]').addClass("fr-active").attr("aria-selected", !0)
        }
    }), $e.DefineIcon("tableCellHorizontalAlign", {
        NAME: "align-left",
        SVG_KEY: "alignLeft"
    }), $e.DefineIcon("align-left", {
        NAME: "align-left",
        SVG_KEY: "alignLeft"
    }), $e.DefineIcon("align-right", {
        NAME: "align-right",
        SVG_KEY: "alignRight"
    }), $e.DefineIcon("align-center", {
        NAME: "align-center",
        SVG_KEY: "alignCenter"
    }), $e.DefineIcon("align-justify", {
        NAME: "align-justify",
        SVG_KEY: "alignJustify"
    }), $e.RegisterCommand("tableCellHorizontalAlign", {
        type: "dropdown",
        focus: !1,
        title: "Horizontal Align",
        options: { left: "Align Left", center: "Align Center", right: "Align Right", justify: "Align Justify" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = $e.COMMANDS.tableCellHorizontalAlign.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="tableCellHorizontalAlign" data-param1="'.concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.icon.create("align-".concat(n)), '<span class="fr-sr-only">').concat(this.language.translate(t[n]), "</span></a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.table.horizontalAlign(t)
        },
        refresh: function(e) {
            var t = this.table.selectedCells(),
                n = this.$;
            t.length && e.find("> *").first().replaceWith(this.icon.create("align-".concat(this.helpers.getAlignment(n(t[0])))))
        },
        refreshOnShow: function(e, t) {
            t.find('.fr-command[data-param1="' + this.helpers.getAlignment(this.$el.find(".fr-selected-cell").first()) + '"]').addClass("fr-active").attr("aria-selected", !0)
        }
    }), $e.DefineIcon("tableCellStyle", {
        NAME: "magic",
        SVG_KEY: "cellStyle"
    }), $e.RegisterCommand("tableCellStyle", {
        title: "Cell Style",
        type: "dropdown",
        focus: !1,
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = this.opts.tableCellStyles;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command" tabIndex="-1" role="option" data-cmd="tableCellStyle" data-param1="'.concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.language.translate(t[n]), "</a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.table.applyStyle(t, this.$el.find(".fr-selected-cell"), this.opts.tableCellMultipleStyles, this.opts.tableCellStyles)
        },
        refreshOnShow: function(e, t) {
            var n = this.$,
                a = this.$el.find(".fr-selected-cell").first();
            a && t.find(".fr-command").each(function() {
                var e = n(this).data("param1"),
                    t = a.hasClass(e);
                n(this).toggleClass("fr-active", t).attr("aria-selected", t)
            })
        }
    }), $e.RegisterCommand("tableCellBackgroundCustomColor", {
        title: "OK",
        undo: !0,
        callback: function() {
            this.table.customColor()
        }
    }), $e.DefineIcon("tableColorRemove", {
        NAME: "eraser",
        SVG_KEY: "remove"
    }), $e.URLRegEx = "(^| |\\u00A0)(".concat($e.LinkRegEx, "|([a-z0-9+-_.]{1,}@[a-z0-9+-_.]{1,}\\.[a-z0-9+-_]{1,}))$"), $e.PLUGINS.url = function(o) {
        var i = o.$,
            s = null;

        function t(e, t, n) {
            for (var a = ""; n.length && "." == n[n.length - 1];) a += ".", n = n.substring(0, n.length - 1);
            var r = n;
            if (o.opts.linkConvertEmailAddress) o.helpers.isEmail(r) && !/^mailto:.*/i.test(r) && (r = "mailto:".concat(r));
            else if (o.helpers.isEmail(r)) return t + n;
            return /^((http|https|ftp|ftps|mailto|tel|sms|notes|data)\:)/i.test(r) || (r = "//".concat(r)), (t || "") + "<a".concat(o.opts.linkAlwaysBlank ? ' target="_blank"' : "").concat(s ? ' rel="'.concat(s, '"') : "", ' data-fr-linked="true" href="').concat(r, '">').concat(n.replace(/&amp;/g, "&").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), "</a>").concat(a)
        }

        var l = function l() {
            return new RegExp($e.URLRegEx, "gi")
        };

        function c(e) {
            return o.opts.linkAlwaysNoFollow && (s = "nofollow"), o.opts.linkAlwaysBlank && (o.opts.linkNoOpener && (s ? s += " noopener" : s = "noopener"), o.opts.linkNoReferrer && (s ? s += " noreferrer" : s = "noreferrer")), e.replace(l(), t)
        }

        function d(e) {
            var t = e.split(" ");
            return t[t.length - 1]
        }

        function n() {
            var e = o.selection.ranges(0),
                t = e.startContainer;
            if (!t || t.nodeType !== Node.TEXT_NODE || e.startOffset !== (t.textContent || "").length) return !1;
            if (function r(e) {
                    return !!e && ("A" === e.tagName || !(!e.parentNode || e.parentNode == o.el) && r(e.parentNode))
                }(t)) return !1;
            if (l().test(d(t.textContent))) {
                i(t).before(c(t.textContent));
                var n = i(t.parentNode).find("a[data-fr-linked]");
                n.removeAttr("data-fr-linked"), t.parentNode.removeChild(t), o.events.trigger("url.linked", [n.get(0)])
            } else if (t.textContent.split(" ").length <= 2 && t.previousSibling && "A" === t.previousSibling.tagName) {
                var a = t.previousSibling.innerText + t.textContent;
                l().test(d(a)) && (i(t.previousSibling).replaceWith(c(a)), t.parentNode.removeChild(t))
            }
        }

        return {
            _init: function e() {
                o.events.on("keypress", function(e) {
                    !o.selection.isCollapsed() || "." != e.key && ")" != e.key && "(" != e.key || n()
                }, !0), o.events.on("keydown", function(e) {
                    var t = e.which;
                    !o.selection.isCollapsed() || t != $e.KEYCODE.ENTER && t != $e.KEYCODE.SPACE || n()
                }, !0), o.events.on("paste.beforeCleanup", function(e) {
                    if (o.helpers.isURL(e)) {
                        var t = null;
                        return o.opts.linkAlwaysBlank && (o.opts.linkNoOpener && (t ? t += " noopener" : t = "noopener"), o.opts.linkNoReferrer && (t ? t += " noreferrer" : t = "noreferrer")), "<a".concat(o.opts.linkAlwaysBlank ? ' target="_blank"' : "").concat(t ? ' rel="'.concat(t, '"') : "", ' href="').concat(e, '" >').concat(e, "</a>")
                    }
                })
            }
        }
    }, Object.assign($e.POPUP_TEMPLATES, {
        "video.insert": "[_BUTTONS_][_BY_URL_LAYER_][_EMBED_LAYER_][_UPLOAD_LAYER_][_PROGRESS_BAR_]",
        "video.edit": "[_BUTTONS_]",
        "video.size": "[_BUTTONS_][_SIZE_LAYER_]"
    }), Object.assign($e.DEFAULTS, {
        videoAllowedTypes: ["mp4", "webm", "ogg"],
        videoAllowedProviders: [".*"],
        videoDefaultAlign: "center",
        videoDefaultDisplay: "block",
        videoDefaultWidth: 600,
        videoEditButtons: ["videoReplace", "videoRemove", "videoDisplay", "videoAlign", "videoSize"],
        videoInsertButtons: ["videoBack", "|", "videoByURL", "videoEmbed", "videoUpload"],
        videoMaxSize: 52428800,
        videoMove: !0,
        videoResize: !0,
        videoResponsive: !1,
        videoSizeButtons: ["videoBack", "|"],
        videoSplitHTML: !1,
        videoTextNear: !0,
        videoUpload: !0,
        videoUploadMethod: "POST",
        videoUploadParam: "file",
        videoUploadParams: {},
        videoUploadToS3: !1,
        videoUploadURL: null
    }), $e.VIDEO_PROVIDERS = [{
        test_regex: /^.*((youtu.be)|(youtube.com))\/((v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))?\??v?=?([^#\&\?]*).*/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([0-9a-zA-Z_\-]+)(.+)?/g,
        url_text: "https://www.youtube.com/embed/$1?$2",
        html: '<iframe width="640" height="360" src="{url}&wmode=opaque" frameborder="0" allowfullscreen></iframe>',
        provider: "youtube"
    }, {
        test_regex: /^.*(?:vimeo.com)\/(?:channels(\/\w+\/)?|groups\/*\/videos\/\u200b\d+\/|video\/|)(\d+)(?:$|\/|\?)/,
        url_regex: /(?:https?:\/\/)?(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?(\/[a-zA-Z0-9_\-]+)?/i,
        url_text: "https://player.vimeo.com/video/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
        provider: "vimeo"
    }, {
        test_regex: /^.+(dailymotion.com|dai.ly)\/(video|hub)?\/?([^_]+)[^#]*(#video=([^_&]+))?/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:dailymotion\.com|dai\.ly)\/(?:video|hub)?\/?(.+)/g,
        url_text: "https://www.dailymotion.com/embed/video/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
        provider: "dailymotion"
    }, {
        test_regex: /^.+(screen.yahoo.com)\/[^_&]+/,
        url_regex: "",
        url_text: "",
        html: '<iframe width="640" height="360" src="{url}?format=embed" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',
        provider: "yahoo"
    }, {
        test_regex: /^.+(rutube.ru)\/[^_&]+/,
        url_regex: /(?:https?:\/\/)?(?:www\.)?(?:rutube\.ru)\/(?:video)?\/?(.+)/g,
        url_text: "https://rutube.ru/play/embed/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" allowtransparency="true"></iframe>',
        provider: "rutube"
    }, {
        test_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/,
        url_regex: /^(?:.+)vidyard.com\/(?:watch)?\/?([^.&/]+)\/?(?:[^_.&]+)?/g,
        url_text: "https://play.vidyard.com/$1",
        html: '<iframe width="640" height="360" src="{url}" frameborder="0" allowfullscreen></iframe>',
        provider: "vidyard"
    }], $e.VIDEO_EMBED_REGEX = /^\W*((<iframe(.|\n)*>(\s|\n)*<\/iframe>)|(<embed(.|\n)*>))\W*$/i, $e.PLUGINS.video = function(u) {
        var s, d, f, p, a, n, h = u.$,
            l = "https://i.froala.com/upload",
            g = 2,
            m = 3,
            v = 4,
            c = 5,
            b = 6,
            r = {};

        function E() {
            var e = u.popups.get("video.insert");
            e.find(".fr-video-by-url-layer input").val("").trigger("change");
            var t = e.find(".fr-video-embed-layer textarea");
            t.val("").trigger("change"), (t = e.find(".fr-video-upload-layer input")).val("").trigger("change")
        }

        function o() {
            var e = u.popups.get("video.edit");
            if (e || (e = function r() {
                    var e = "";
                    if (0 < u.opts.videoEditButtons.length) {
                        u.opts.videoResponsive && (-1 < u.opts.videoEditButtons.indexOf("videoSize") && u.opts.videoEditButtons.splice(u.opts.videoEditButtons.indexOf("videoSize"), 1), -1 < u.opts.videoEditButtons.indexOf("videoDisplay") && u.opts.videoEditButtons.splice(u.opts.videoEditButtons.indexOf("videoDisplay"), 1), -1 < u.opts.videoEditButtons.indexOf("videoAlign") && u.opts.videoEditButtons.splice(u.opts.videoEditButtons.indexOf("videoAlign"), 1));
                        var t = { buttons: e += '<div class="fr-buttons"> \n      '.concat(u.button.buildList(u.opts.videoEditButtons), " \n      </div>") },
                            n = u.popups.create("video.edit", t);
                        return u.events.$on(u.$wp, "scroll.video-edit", function() {
                            p && u.popups.isVisible("video.edit") && (u.events.disableBlur(), w(p))
                        }), n
                    }
                    return !1
                }()), e) {
                u.popups.setContainer("video.edit", u.$sc), u.popups.refresh("video.edit");
                var t = p.find("iframe, embed, video"),
                    n = t.offset().left + t.outerWidth() / 2,
                    a = t.offset().top + t.outerHeight();
                u.popups.show("video.edit", n, a, t.outerHeight(), !0)
            }
        }

        function i(e) {
            if (e) return u.popups.onRefresh("video.insert", E), u.popups.onHide("video.insert", X), !0;
            var t = "";
            u.opts.videoUpload || -1 === u.opts.videoInsertButtons.indexOf("videoUpload") || u.opts.videoInsertButtons.splice(u.opts.videoInsertButtons.indexOf("videoUpload"), 1);
            var n = u.button.buildList(u.opts.videoInsertButtons);
            "" !== n && (t = '<div class="fr-buttons">' + n + "</div>");
            var a, r = "",
                o = u.opts.videoInsertButtons.indexOf("videoUpload"),
                i = u.opts.videoInsertButtons.indexOf("videoByURL"),
                s = u.opts.videoInsertButtons.indexOf("videoEmbed");
            0 <= i && (a = " fr-active", (o < i && 0 <= o || s < i && 0 <= s) && (a = ""), r = '<div class="fr-video-by-url-layer fr-layer'.concat(a, '" id="fr-video-by-url-layer-').concat(u.id, '"><div class="fr-input-line"><input id="fr-video-by-url-layer-text-').concat(u.id, '" type="text" placeholder="').concat(u.language.translate("Paste in a video URL"), '" tabIndex="1" aria-required="true"></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertByURL" tabIndex="2" role="button">').concat(u.language.translate("Insert"), "</button></div></div>"));
            var l = "";
            0 <= s && (a = " fr-active", (o < s && 0 <= o || i < s && 0 <= i) && (a = ""), l = '<div class="fr-video-embed-layer fr-layer'.concat(a, '" id="fr-video-embed-layer-').concat(u.id, '"><div class="fr-input-line"><textarea id="fr-video-embed-layer-text').concat(u.id, '" type="text" placeholder="').concat(u.language.translate("Embedded Code"), '" tabIndex="1" aria-required="true" rows="5"></textarea></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoInsertEmbed" tabIndex="2" role="button">').concat(u.language.translate("Insert"), "</button></div></div>"));
            var c = "";
            0 <= o && (a = " fr-active", (s < o && 0 <= s || i < o && 0 <= i) && (a = ""), c = '<div class="fr-video-upload-layer fr-layer'.concat(a, '" id="fr-video-upload-layer-').concat(u.id, '"><strong>').concat(u.language.translate("Drop video"), "</strong><br>(").concat(u.language.translate("or click"), ')<div class="fr-form"><input type="file" accept="video/').concat(u.opts.videoAllowedTypes.join(", video/").toLowerCase(), '" tabIndex="-1" aria-labelledby="fr-video-upload-layer-').concat(u.id, '" role="button"></div></div>'));
            var d = {
                    buttons: t,
                    by_url_layer: r,
                    embed_layer: l,
                    upload_layer: c,
                    progress_bar: '<div class="fr-video-progress-bar-layer fr-layer"><h3 tabIndex="-1" class="fr-message">Uploading</h3><div class="fr-loader"><span class="fr-progress"></span></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-dismiss" data-cmd="videoDismissError" tabIndex="2" role="button">OK</button></div></div>'
                },
                f = u.popups.create("video.insert", d);
            return function p(a) {
                u.events.$on(a, "dragover dragenter", ".fr-video-upload-layer", function() {
                    return h(this).addClass("fr-drop"), !1
                }, !0), u.events.$on(a, "dragleave dragend", ".fr-video-upload-layer", function() {
                    return h(this).removeClass("fr-drop"), !1
                }, !0), u.events.$on(a, "drop", ".fr-video-upload-layer", function(e) {
                    e.preventDefault(), e.stopPropagation(), h(this).removeClass("fr-drop");
                    var t = e.originalEvent.dataTransfer;
                    if (t && t.files) {
                        var n = a.data("instance") || u;
                        n.events.disableBlur(), n.video.upload(t.files), n.events.enableBlur()
                    }
                }, !0), u.helpers.isIOS() && u.events.$on(a, "touchstart", '.fr-video-upload-layer input[type="file"]', function() {
                    h(this).trigger("click")
                }, !0);
                u.events.$on(a, "change", '.fr-video-upload-layer input[type="file"]', function() {
                    if (this.files) {
                        var e = a.data("instance") || u;
                        e.events.disableBlur(), a.find("input:focus").blur(), e.events.enableBlur(), e.video.upload(this.files)
                    }
                    h(this).val("")
                }, !0)
            }(f), f
        }

        function T(e) {
            u.events.focus(!0), u.selection.restore();
            var t = !1;
            p && (q(), t = !0), u.html.insert('<span contenteditable="false" draggable="true" class="fr-jiv fr-video fr-deletable">'.concat(e, "</span>"), !1, u.opts.videoSplitHTML), u.popups.hide("video.insert");
            var n = u.$el.find(".fr-jiv");
            n.removeClass("fr-jiv"), n.toggleClass("fr-rv", u.opts.videoResponsive), Z(n, u.opts.videoDefaultDisplay, u.opts.videoDefaultAlign), n.toggleClass("fr-draggable", u.opts.videoMove), u.events.trigger(t ? "video.replaced" : "video.inserted", [n])
        }

        function A() {
            var e = h(this);
            u.popups.hide("video.insert"), e.removeClass("fr-uploading"), e.parent().next().is("br") && e.parent().next().remove(), w(e.parent()), u.events.trigger("video.loaded", [e.parent()])
        }

        function C(s, e, c, d, f) {
            u.edit.off(), R("Loading video"), e && (s = u.helpers.sanitizeURL(s));
            var p = function p() {
                var e, t;
                if (d) {
                    u.undo.canDo() || d.find("video").hasClass("fr-uploading") || u.undo.saveStep();
                    var n = d.find("video").data("fr-old-src"),
                        a = d.data("fr-replaced");
                    d.data("fr-replaced", !1), u.$wp ? ((e = d.clone(!0)).find("video").removeData("fr-old-src").removeClass("fr-uploading"), e.find("video").off("canplay"), n && d.find("video").attr("src", n), d.replaceWith(e)) : e = d;
                    for (var r = e.find("video").get(0).attributes, o = 0; o < r.length; o++) {
                        var i = r[o];
                        0 === i.nodeName.indexOf("data-") && e.find("video").removeAttr(i.nodeName)
                    }
                    if (void 0 !== c)
                        for (t in c) c.hasOwnProperty(t) && "link" != t && e.find("video").attr("data-".concat(t), c[t]);
                    e.find("video").on("canplay", A), e.find("video").attr("src", s), u.edit.on(), F(), u.undo.saveStep(), u.$el.blur(), u.events.trigger(a ? "video.replaced" : "video.inserted", [e, f])
                } else e = function l(e, t, n) {
                    var a, r = "";
                    if (t && void 0 !== t)
                        for (a in t) t.hasOwnProperty(a) && "link" != a && (r += " data-".concat(a, '="').concat(t[a], '"'));
                    var o = u.opts.videoDefaultWidth;
                    o && "auto" != o && (o = "".concat(o, "px"));
                    var i = h(document.createElement("span")).attr("contenteditable", "false").attr("draggable", "true").attr("class", "fr-video fr-dv" + u.opts.videoDefaultDisplay[0] + ("center" != u.opts.videoDefaultAlign ? " fr-fv" + u.opts.videoDefaultAlign[0] : "")).html('<video src="' + e + '" ' + r + (o ? ' style="width: ' + o + ';" ' : "") + " controls>" + u.language.translate("Your browser does not support HTML5 video.") + "</video>");
                    i.toggleClass("fr-draggable", u.opts.videoMove), u.edit.on(), u.events.focus(!0), u.selection.restore(), u.undo.saveStep(), u.opts.videoSplitHTML ? u.markers.split() : u.markers.insert();
                    u.html.wrap();
                    var s = u.$el.find(".fr-marker");
                    u.node.isLastSibling(s) && s.parent().hasClass("fr-deletable") && s.insertAfter(s.parent());
                    s.replaceWith(i), u.selection.clear(), i.find("video").get(0).readyState > i.find("video").get(0).HAVE_FUTURE_DATA || u.helpers.isIOS() ? n.call(i.find("video").get(0)) : i.find("video").on("canplaythrough load", n);
                    return i
                }(s, c, A), F(), u.undo.saveStep(), u.events.trigger("video.inserted", [e, f])
            };
            S("Loading video"), p()
        }

        function S(e) {
            var t = u.popups.get("video.insert");
            if (t || (t = i()), t.find(".fr-layer.fr-active").removeClass("fr-active").addClass("fr-pactive"), t.find(".fr-video-progress-bar-layer").addClass("fr-active"), t.find(".fr-buttons").hide(), p) {
                var n = p.find("video");
                u.popups.setContainer("video.insert", u.$sc);
                var a = n.offset().left,
                    r = n.offset().top + n.height();
                u.popups.show("video.insert", a, r, n.outerHeight())
            }
            void 0 === e && R(u.language.translate("Uploading"), 0)
        }

        function y(e) {
            var t = u.popups.get("video.insert");
            if (t && (t.find(".fr-layer.fr-pactive").addClass("fr-active").removeClass("fr-pactive"), t.find(".fr-video-progress-bar-layer").removeClass("fr-active"), t.find(".fr-buttons").show(), e || u.$el.find("video.fr-error").length)) {
                if (u.events.focus(), u.$el.find("video.fr-error").length && (u.$el.find("video.fr-error").parent().remove(), u.undo.saveStep(), u.undo.run(), u.undo.dropRedo()), !u.$wp && p) {
                    var n = p;
                    P(!0), u.selection.setAfter(n.find("video").get(0)), u.selection.restore()
                }
                u.popups.hide("video.insert")
            }
        }

        function R(e, t) {
            var n = u.popups.get("video.insert");
            if (n) {
                var a = n.find(".fr-video-progress-bar-layer");
                a.find("h3").text(e + (t ? " ".concat(t, "%") : "")), a.removeClass("fr-error"), t ? (a.find("div").removeClass("fr-indeterminate"), a.find("div > span").css("width", "".concat(t, "%"))) : a.find("div").addClass("fr-indeterminate")
            }
        }

        function L(e) {
            S();
            var t = u.popups.get("video.insert").find(".fr-video-progress-bar-layer");
            t.addClass("fr-error");
            var n = t.find("h3");
            n.text(e), u.events.disableBlur(), n.focus()
        }

        function w(e) {
            t.call(e.get(0))
        }

        function _(e) {
            R("Loading video");
            var t = this.status,
                n = this.response,
                a = this.responseXML,
                r = this.responseText;
            try {
                if (u.opts.videoUploadToS3)
                    if (201 == t) {
                        var o = function s(e) {
                            try {
                                var t = h(e).find("Location").text(),
                                    n = h(e).find("Key").text();
                                return !1 === u.events.trigger("video.uploadedToS3", [t, n, e], !0) ? (u.edit.on(), !1) : t
                            } catch (a) {
                                return V(v, e), !1
                            }
                        }(a);
                        o && C(o, !1, [], e, n || a)
                    } else V(v, n || a);
                else if (200 <= t && t < 300) {
                    var i = function l(e) {
                        try {
                            if (!1 === u.events.trigger("video.uploaded", [e], !0)) return u.edit.on(), !1;
                            var t = JSON.parse(e);
                            return t.link ? t : (V(g, e), !1)
                        } catch (n) {
                            return V(v, e), !1
                        }
                    }(r);
                    i && C(i.link, !1, i, e, n || r)
                } else V(m, n || r)
            } catch (c) {
                V(v, n || r)
            }
        }

        function O() {
            V(v, this.response || this.responseText || this.responseXML)
        }

        function N(e) {
            if (e.lengthComputable) {
                var t = e.loaded / e.total * 100 | 0;
                R(u.language.translate("Uploading"), t)
            }
        }

        function x() {
            u.edit.on(), y(!0)
        }

        function I(e) {
            if (!u.core.sameInstance(f)) return !0;
            e.preventDefault(), e.stopPropagation();
            var t = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null),
                n = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
            if (!t || !n) return !1;
            if ("mousedown" == e.type) {
                var a = u.$oel.get(0).ownerDocument,
                    r = a.defaultView || a.parentWindow,
                    o = !1;
                try {
                    o = r.location != r.parent.location && !(r.$ && r.$.FE)
                } catch (i) {}
                o && r.frameElement && (t += u.helpers.getPX(h(r.frameElement).offset().left) + r.frameElement.clientLeft, n = e.clientY + u.helpers.getPX(h(r.frameElement).offset().top) + r.frameElement.clientTop)
            }
            u.undo.canDo() || u.undo.saveStep(), (d = h(this)).data("start-x", t), d.data("start-y", n), s.show(), u.popups.hideAll(), K()
        }

        function k(e) {
            if (!u.core.sameInstance(f)) return !0;
            if (d) {
                e.preventDefault();
                var t = e.pageX || (e.originalEvent.touches ? e.originalEvent.touches[0].pageX : null),
                    n = e.pageY || (e.originalEvent.touches ? e.originalEvent.touches[0].pageY : null);
                if (!t || !n) return !1;
                var a = d.data("start-x"),
                    r = d.data("start-y");
                d.data("start-x", t), d.data("start-y", n);
                var o = t - a,
                    i = n - r,
                    s = p.find("iframe, embed, video"),
                    l = s.width(),
                    c = s.height();
                (d.hasClass("fr-hnw") || d.hasClass("fr-hsw")) && (o = 0 - o), (d.hasClass("fr-hnw") || d.hasClass("fr-hne")) && (i = 0 - i), s.css("width", l + o), s.css("height", c + i), s.removeAttr("width"), s.removeAttr("height"), $()
            }
        }

        function M(e) {
            if (!u.core.sameInstance(f)) return !0;
            d && p && (e && e.stopPropagation(), d = null, s.hide(), $(), o(), u.undo.saveStep())
        }

        function D(e) {
            return '<div class="fr-handler fr-h'.concat(e, '"></div>')
        }

        function B(e, t, n, a) {
            return e.pageX = t, e.pageY = t, I.call(this, e), e.pageX = e.pageX + n * Math.floor(Math.pow(1.1, a)), e.pageY = e.pageY + n * Math.floor(Math.pow(1.1, a)), k.call(this, e), M.call(this, e), ++a
        }

        function F() {
            var e, t = Array.prototype.slice.call(u.el.querySelectorAll("video, .fr-video > *")),
                n = [];
            for (e = 0; e < t.length; e++) n.push(t[e].getAttribute("src")), h(t[e]).toggleClass("fr-draggable", u.opts.videoMove), "" === t[e].getAttribute("class") && t[e].removeAttribute("class"), "" === t[e].getAttribute("style") && t[e].removeAttribute("style");
            if (a)
                for (e = 0; e < a.length; e++) n.indexOf(a[e].getAttribute("src")) < 0 && u.events.trigger("video.removed", [h(a[e])]);
            a = t
        }

        function $() {
            f || function i() {
                var e;
                if (u.shared.$video_resizer ? (f = u.shared.$video_resizer, s = u.shared.$vid_overlay, u.events.on("destroy", function() {
                        h("body").first().append(f.removeClass("fr-active"))
                    }, !0)) : (u.shared.$video_resizer = h(document.createElement("div")).attr("class", "fr-video-resizer"), f = u.shared.$video_resizer, u.events.$on(f, "mousedown", function(e) {
                        e.stopPropagation()
                    }, !0), u.opts.videoResize && (f.append(D("nw") + D("ne") + D("sw") + D("se")), u.shared.$vid_overlay = h(document.createElement("div")).attr("class", "fr-video-overlay"), s = u.shared.$vid_overlay, e = f.get(0).ownerDocument, h(e).find("body").first().append(s))), u.events.on("shared.destroy", function() {
                        f.html("").removeData().remove(), f = null, u.opts.videoResize && (s.remove(), s = null)
                    }, !0), u.helpers.isMobile() || u.events.$on(h(u.o_win), "resize.video", function() {
                        P(!0)
                    }), u.opts.videoResize) {
                    e = f.get(0).ownerDocument, u.events.$on(f, u._mousedown, ".fr-handler", I), u.events.$on(h(e), u._mousemove, k), u.events.$on(h(e.defaultView || e.parentWindow), u._mouseup, M), u.events.$on(s, "mouseleave", M);
                    var a = 1,
                        r = null,
                        o = 0;
                    u.events.on("keydown", function(e) {
                        if (p) {
                            var t = -1 != navigator.userAgent.indexOf("Mac OS X") ? e.metaKey : e.ctrlKey,
                                n = e.which;
                            (n !== r || 200 < e.timeStamp - o) && (a = 1), (n == $e.KEYCODE.EQUALS || u.browser.mozilla && n == $e.KEYCODE.FF_EQUALS) && t && !e.altKey ? a = B.call(this, e, 1, 1, a) : (n == $e.KEYCODE.HYPHEN || u.browser.mozilla && n == $e.KEYCODE.FF_HYPHEN) && t && !e.altKey && (a = B.call(this, e, 2, -1, a)), r = n, o = e.timeStamp
                        }
                    }), u.events.on("keyup", function() {
                        a = 1
                    })
                }
            }(), (u.$wp || u.$sc).append(f), f.data("instance", u);
            var e = p.find("iframe, embed, video"),
                t = 0,
                n = 0;
            u.opts.iframe && (n = u.helpers.getPX(u.$wp.find(".fr-iframe").css("padding-top")), t = u.helpers.getPX(u.$wp.find(".fr-iframe").css("padding-left"))), f.css("top", (u.opts.iframe ? e.offset().top + n - 1 : e.offset().top - u.$wp.offset().top - 1) + u.$wp.scrollTop()).css("left", (u.opts.iframe ? e.offset().left + t - 1 : e.offset().left - u.$wp.offset().left - 1) + u.$wp.scrollLeft()).css("width", e.get(0).getBoundingClientRect().width).css("height", e.get(0).getBoundingClientRect().height).addClass("fr-active")
        }

        function t(e) {
            if (e && "touchend" == e.type && n) return !0;
            if (e && u.edit.isDisabled()) return e.stopPropagation(), e.preventDefault(), !1;
            if (u.edit.isDisabled()) return !1;
            for (var t = 0; t < $e.INSTANCES.length; t++) $e.INSTANCES[t] != u && $e.INSTANCES[t].events.trigger("video.hideResizer");
            u.toolbar.disable(), u.helpers.isMobile() && (u.events.disableBlur(), u.$el.blur(), u.events.enableBlur()), u.$el.find(".fr-video.fr-active").removeClass("fr-active"), (p = h(this)).addClass("fr-active"), u.opts.iframe && u.size.syncIframe(), J(), $(), o(), u.selection.clear(), u.button.bulkRefresh(), u.events.trigger("image.hideResizer")
        }

        function P(e) {
            p && (function t() {
                return u.shared.vid_exit_flag
            }() || !0 === e) && (f.removeClass("fr-active"), u.toolbar.enable(), p.removeClass("fr-active"), p = null, K())
        }

        function H() {
            u.shared.vid_exit_flag = !0
        }

        function K() {
            u.shared.vid_exit_flag = !1
        }

        function U(e) {
            var t = e.originalEvent.dataTransfer;
            if (t && t.files && t.files.length) {
                var n = t.files[0];
                if (n && n.type && -1 !== n.type.indexOf("video")) {
                    if (!u.opts.videoUpload) return e.preventDefault(), e.stopPropagation(), !1;
                    u.markers.remove(), u.markers.insertAtPoint(e.originalEvent), u.$el.find(".fr-marker").replaceWith($e.MARKERS), u.popups.hideAll();
                    var a = u.popups.get("video.insert");
                    return a || (a = i()), u.popups.setContainer("video.insert", u.$sc), u.popups.show("video.insert", e.originalEvent.pageX, e.originalEvent.pageY), S(), 0 <= u.opts.videoAllowedTypes.indexOf(n.type.replace(/video\//g, "")) ? W(t.files) : V(b), e.preventDefault(), e.stopPropagation(), !1
                }
            }
        }

        function W(e) {
            if (void 0 !== e && 0 < e.length) {
                if (!1 === u.events.trigger("video.beforeUpload", [e])) return !1;
                var t, n = e[0];
                if ((null === u.opts.videoUploadURL || u.opts.videoUploadURL == l) && !u.opts.videoUploadToS3) return function s(a) {
                    p && p.find("iframe") && p.find("iframe").length && q();
                    var r = new FileReader;
                    r.onload = function() {
                        r.result;
                        for (var e = atob(r.result.split(",")[1]), t = [], n = 0; n < e.length; n++) t.push(e.charCodeAt(n));
                        C(window.URL.createObjectURL(new Blob([new Uint8Array(t)], { type: a.type })), !1, null, p)
                    }, S(), r.readAsDataURL(a)
                }(n), !1;
                if (n.size > u.opts.videoMaxSize) return V(c), !1;
                if (u.opts.videoAllowedTypes.indexOf(n.type.replace(/video\//g, "")) < 0) return V(b), !1;
                if (u.drag_support.formdata && (t = u.drag_support.formdata ? new FormData : null), t) {
                    var a;
                    if (!1 !== u.opts.videoUploadToS3)
                        for (a in t.append("key", u.opts.videoUploadToS3.keyStart + (new Date).getTime() + "-" + (n.name || "untitled")), t.append("success_action_status", "201"), t.append("X-Requested-With", "xhr"), t.append("Content-Type", n.type), u.opts.videoUploadToS3.params) u.opts.videoUploadToS3.params.hasOwnProperty(a) && t.append(a, u.opts.videoUploadToS3.params[a]);
                    for (a in u.opts.videoUploadParams) u.opts.videoUploadParams.hasOwnProperty(a) && t.append(a, u.opts.videoUploadParams[a]);
                    t.append(u.opts.videoUploadParam, n);
                    var r = u.opts.videoUploadURL;
                    u.opts.videoUploadToS3 && (r = u.opts.videoUploadToS3.uploadURL ? u.opts.videoUploadToS3.uploadURL : "https://".concat(u.opts.videoUploadToS3.region, ".amazonaws.com/").concat(u.opts.videoUploadToS3.bucket));
                    var o = u.core.getXHR(r, u.opts.videoUploadMethod);
                    o.onload = function() {
                        _.call(o, p)
                    }, o.onerror = O, o.upload.onprogress = N, o.onabort = x, S(), u.events.disableBlur(), u.edit.off(), u.events.enableBlur();
                    var i = u.popups.get("video.insert");
                    i && h(i.off("abortUpload")).on("abortUpload", function() {
                        4 != o.readyState && o.abort()
                    }), o.send(t)
                }
            }
        }

        function V(e, t) {
            u.edit.on(), p && p.find("video").addClass("fr-error"), L(u.language.translate("Something went wrong. Please try again.")), u.events.trigger("video.error", [{
                code: e,
                message: r[e]
            }, t])
        }

        function z() {
            if (p) {
                var e = u.popups.get("video.size"),
                    t = p.find("iframe, embed, video");
                e.find('input[name="width"]').val(t.get(0).style.width || t.attr("width")).trigger("change"), e.find('input[name="height"]').val(t.get(0).style.height || t.attr("height")).trigger("change")
            }
        }

        function G(e) {
            if (e) return u.popups.onRefresh("video.size", z), !0;
            var t = {
                    buttons: '<div class="fr-buttons fr-tabs">'.concat(u.button.buildList(u.opts.videoSizeButtons), "</div>"),
                    size_layer: '<div class="fr-video-size-layer fr-layer fr-active" id="fr-video-size-layer-'.concat(u.id, '"><div class="fr-video-group"><div class="fr-input-line"><input id="fr-video-size-layer-width-').concat(u.id, '" type="text" name="width" placeholder="').concat(u.language.translate("Width"), '" tabIndex="1"></div><div class="fr-input-line"><input id="fr-video-size-layer-height-').concat(u.id, '" type="text" name="height" placeholder="').concat(u.language.translate("Height"), '" tabIndex="1"></div></div><div class="fr-action-buttons"><button type="button" class="fr-command fr-submit" data-cmd="videoSetSize" tabIndex="2" role="button">').concat(u.language.translate("Update"), "</button></div></div>")
                },
                n = u.popups.create("video.size", t);
            return u.events.$on(u.$wp, "scroll", function() {
                p && u.popups.isVisible("video.size") && (u.events.disableBlur(), w(p))
            }), n
        }

        function Y(e) {
            if (void 0 === e && (e = p), e) {
                if (e.hasClass("fr-fvl")) return "left";
                if (e.hasClass("fr-fvr")) return "right";
                if (e.hasClass("fr-dvb") || e.hasClass("fr-dvi")) return "center";
                if ("block" == e.css("display")) {
                    if ("left" == e.css("text-algin")) return "left";
                    if ("right" == e.css("text-align")) return "right"
                } else {
                    if ("left" == e.css("float")) return "left";
                    if ("right" == e.css("float")) return "right"
                }
            }
            return "center"
        }

        function j(e) {
            void 0 === e && (e = p);
            var t = e.css("float");
            return e.css("float", "none"), "block" == e.css("display") ? (e.css("float", ""), e.css("float") != t && e.css("float", t), "block") : (e.css("float", ""), e.css("float") != t && e.css("float", t), "inline")
        }

        function q() {
            if (p && !1 !== u.events.trigger("video.beforeRemove", [p])) {
                var e = p;
                u.popups.hideAll(), P(!0), u.selection.setBefore(e.get(0)) || u.selection.setAfter(e.get(0)), e.remove(), u.selection.restore(), u.html.fillEmptyBlocks()
            }
        }

        function X() {
            y()
        }

        function Z(e, t, n) {
            !u.opts.htmlUntouched && u.opts.useClasses ? (e.removeClass("fr-fvl fr-fvr fr-dvb fr-dvi"), e.addClass("fr-fv".concat(n[0], " fr-dv").concat(t[0]))) : "inline" == t ? (e.css({ display: "inline-block" }), "center" == n ? e.css({ "float": "none" }) : "left" == n ? e.css({ "float": "left" }) : e.css({ "float": "right" })) : (e.css({
                display: "block",
                clear: "both"
            }), "left" == n ? e.css({ textAlign: "left" }) : "right" == n ? e.css({ textAlign: "right" }) : e.css({ textAlign: "center" }))
        }

        function Q() {
            var e = u.$el.find("video").filter(function() {
                return 0 === h(this).parents("span.fr-video").length
            });
            if (0 != e.length) {
                e.wrap(h(document.createElement("span")).attr("class", "fr-video fr-deletable").attr("contenteditable", "false")), u.$el.find("embed, iframe").filter(function() {
                    if (u.browser.safari && this.getAttribute("src") && this.setAttribute("src", this.src), 0 < h(this).parents("span.fr-video").length) return !1;
                    for (var e = h(this).attr("src"), t = 0; t < $e.VIDEO_PROVIDERS.length; t++) {
                        var n = $e.VIDEO_PROVIDERS[t];
                        if (n.test_regex.test(e) && new RegExp(u.opts.videoAllowedProviders.join("|")).test(n.provider)) return !0
                    }
                    return !1
                }).map(function() {
                    return 0 === h(this).parents("object").length ? this : h(this).parents("object").get(0)
                }).wrap(h(document.createElement("span")).attr("class", "fr-video").attr("contenteditable", "false"));
                for (var t, n, a, r, o = u.$el.find("span.fr-video, video"), i = 0; i < o.length; i++) {
                    var s = h(o[i]);
                    !u.opts.htmlUntouched && u.opts.useClasses ? ((r = s).hasClass("fr-dvi") || r.hasClass("fr-dvb") || (r.addClass("fr-fv".concat(Y(r)[0])), r.addClass("fr-dv".concat(j(r)[0]))), u.opts.videoTextNear || s.removeClass("fr-dvi").addClass("fr-dvb")) : u.opts.htmlUntouched || u.opts.useClasses || (void 0, n = (t = s).hasClass("fr-dvb") ? "block" : t.hasClass("fr-dvi") ? "inline" : null, a = t.hasClass("fr-fvl") ? "left" : t.hasClass("fr-fvr") ? "right" : Y(t), Z(t, n, a), t.removeClass("fr-dvb fr-dvi fr-fvr fr-fvl"))
                }
                o.toggleClass("fr-draggable", u.opts.videoMove)
            }
        }

        function J() {
            if (p) {
                u.selection.clear();
                var e = u.doc.createRange();
                e.selectNode(p.get(0)), u.selection.get().addRange(e)
            }
        }

        return r[1] = "Video cannot be loaded from the passed link.", r[g] = "No link in upload response.", r[m] = "Error during file upload.", r[v] = "Parsing response failed.", r[c] = "File is too large.", r[b] = "Video file type is invalid.", r[7] = "Files can be uploaded only to same domain in IE 8 and IE 9.", u.shared.vid_exit_flag = !1, {
            _init: function ee() {
                u.opts.videoResponsive && (u.opts.videoResize = !1),
                    function e() {
                        u.events.on("drop", U, !0), u.events.on("mousedown window.mousedown", H), u.events.on("window.touchmove", K), u.events.on("mouseup window.mouseup", P), u.events.on("commands.mousedown", function(e) {
                            0 < e.parents(".fr-toolbar").length && P()
                        }), u.events.on("video.hideResizer commands.undo commands.redo element.dropped", function() {
                            P(!0)
                        })
                    }(), u.helpers.isMobile() && (u.events.$on(u.$el, "touchstart", "span.fr-video", function() {
                        n = !1
                    }), u.events.$on(u.$el, "touchmove", function() {
                        n = !0
                    })), u.events.on("html.set", Q), Q(), u.events.$on(u.$el, "mousedown", "span.fr-video", function(e) {
                        e.stopPropagation(), (u.browser.msie || u.browser.edge) && (e.target.innerText || (e.target.dragDrop(), t.call(this, e)))
                    }), u.events.$on(u.$el, "click touchend", "span.fr-video", function(e) {
                        if (e.target.innerText.length || "false" == h(this).parents("[contenteditable]").not(".fr-element").not(".fr-img-caption").not("body").first().attr("contenteditable")) return !0;
                        t.call(this, e)
                    }), u.events.on("keydown", function(e) {
                        var t = e.which;
                        return !p || t != $e.KEYCODE.BACKSPACE && t != $e.KEYCODE.DELETE ? p && t == $e.KEYCODE.ESC ? (P(!0), e.preventDefault(), !1) : p && t != $e.KEYCODE.F10 && !u.keys.isBrowserAction(e) ? (e.preventDefault(), !1) : void 0 : (e.preventDefault(), q(), u.undo.saveStep(), !1)
                    }, !0), u.events.on("toolbar.esc", function() {
                        if (p) return u.events.disableBlur(), u.events.focus(), !1
                    }, !0), u.events.on("toolbar.focusEditor", function() {
                        if (p) return !1
                    }, !0), u.events.on("keydown", function() {
                        u.$el.find("span.fr-video:empty").remove()
                    }), u.$wp && (F(), u.events.on("contentChanged", F)), i(!0), G(!0)
            },
            showInsertPopup: function te() {
                var e = u.$tb.find('.fr-command[data-cmd="insertVideo"]'),
                    t = u.popups.get("video.insert");
                if (t || (t = i()), y(), !t.hasClass("fr-active"))
                    if (u.popups.refresh("video.insert"), u.popups.setContainer("video.insert", u.$tb), e.isVisible()) {
                        var n = u.button.getPosition(e),
                            a = n.left,
                            r = n.top;
                        u.popups.show("video.insert", a, r, e.outerHeight())
                    } else u.position.forSelection(t), u.popups.show("video.insert")
            },
            showLayer: function ne(e) {
                var t, n, a = u.popups.get("video.insert");
                if (!p && !u.opts.toolbarInline) {
                    var r = u.$tb.find('.fr-command[data-cmd="insertVideo"]');
                    t = r.offset().left, n = r.offset().top + (u.opts.toolbarBottom ? 10 : r.outerHeight() - 10)
                }
                u.opts.toolbarInline && (n = a.offset().top - u.helpers.getPX(a.css("margin-top")), a.hasClass("fr-above") && (n += a.outerHeight())), a.find(".fr-layer").removeClass("fr-active"), a.find(".fr-".concat(e, "-layer")).addClass("fr-active"), u.popups.show("video.insert", t, n, 0), u.accessibility.focusPopup(a)
            },
            refreshByURLButton: function ae(e) {
                var t = u.popups.get("video.insert");
                t && t.find(".fr-video-by-url-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
            },
            refreshEmbedButton: function re(e) {
                var t = u.popups.get("video.insert");
                t && t.find(".fr-video-embed-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
            },
            refreshUploadButton: function oe(e) {
                var t = u.popups.get("video.insert");
                t && t.find(".fr-video-upload-layer").hasClass("fr-active") && e.addClass("fr-active").attr("aria-pressed", !0)
            },
            upload: W,
            insertByURL: function ie(e) {
                void 0 === e && (e = (u.popups.get("video.insert").find('.fr-video-by-url-layer input[type="text"]').val() || "").trim());
                var t = null;
                if (/^http/.test(e) || (e = "https://".concat(e)), u.helpers.isURL(e))
                    for (var n = 0; n < $e.VIDEO_PROVIDERS.length; n++) {
                        var a = $e.VIDEO_PROVIDERS[n];
                        if (a.test_regex.test(e) && new RegExp(u.opts.videoAllowedProviders.join("|")).test(a.provider)) {
                            t = e.replace(a.url_regex, a.url_text), t = a.html.replace(/\{url\}/, t);
                            break
                        }
                    }
                t ? T(t) : (L(u.language.translate("Something went wrong. Please try again.")), u.events.trigger("video.linkError", [e]))
            },
            insertEmbed: function se(e) {
                void 0 === e && (e = u.popups.get("video.insert").find(".fr-video-embed-layer textarea").val() || ""), 0 !== e.length && $e.VIDEO_EMBED_REGEX.test(e) ? T(e) : (L(u.language.translate("Something went wrong. Please try again.")), u.events.trigger("video.codeError", [e]))
            },
            insert: T,
            align: function le(e) {
                p.removeClass("fr-fvr fr-fvl"), !u.opts.htmlUntouched && u.opts.useClasses ? "left" == e ? p.addClass("fr-fvl") : "right" == e && p.addClass("fr-fvr") : Z(p, j(), e), J(), $(), o(), u.selection.clear()
            },
            refreshAlign: function ce(e) {
                if (!p) return !1;
                e.find(">*").first().replaceWith(u.icon.create("video-align-".concat(Y())))
            },
            refreshAlignOnShow: function de(e, t) {
                p && t.find('.fr-command[data-param1="'.concat(Y(), '"]')).addClass("fr-active").attr("aria-selected", !0)
            },
            display: function fe(e) {
                p.removeClass("fr-dvi fr-dvb"), !u.opts.htmlUntouched && u.opts.useClasses ? "inline" == e ? p.addClass("fr-dvi") : "block" == e && p.addClass("fr-dvb") : Z(p, e, Y()), J(), $(), o(), u.selection.clear()
            },
            refreshDisplayOnShow: function pe(e, t) {
                p && t.find('.fr-command[data-param1="'.concat(j(), '"]')).addClass("fr-active").attr("aria-selected", !0)
            },
            remove: q,
            hideProgressBar: y,
            showSizePopup: function ue() {
                var e = u.popups.get("video.size");
                e || (e = G()), y(), u.popups.refresh("video.size"), u.popups.setContainer("video.size", u.$sc);
                var t = p.find("iframe, embed, video"),
                    n = t.offset().left + t.outerWidth() / 2,
                    a = t.offset().top + t.height();
                u.popups.show("video.size", n, a, t.height(), !0)
            },
            replace: function he() {
                var e = u.popups.get("video.insert");
                e || (e = i()), u.popups.isVisible("video.insert") || (y(), u.popups.refresh("video.insert"), u.popups.setContainer("video.insert", u.$sc));
                var t = p.offset().left + p.outerWidth() / 2,
                    n = p.offset().top + p.height();
                u.popups.show("video.insert", t, n, p.outerHeight(), !0)
            },
            back: function e() {
                p ? (u.events.disableBlur(), p[0].click()) : (u.events.disableBlur(), u.selection.restore(), u.events.enableBlur(), u.popups.hide("video.insert"), u.toolbar.showInline())
            },
            setSize: function ge(e, t) {
                if (p) {
                    var n = u.popups.get("video.size"),
                        a = p.find("iframe, embed, video");
                    a.css("width", e || n.find('input[name="width"]').val()), a.css("height", t || n.find('input[name="height"]').val()), a.get(0).style.width && a.removeAttr("width"), a.get(0).style.height && a.removeAttr("height"), n.find("input:focus").blur(), setTimeout(function() {
                        p.trigger("click")
                    }, u.helpers.isAndroid() ? 50 : 0)
                }
            },
            get: function me() {
                return p
            },
            showProgressBar: S
        }
    }, $e.RegisterCommand("insertVideo", {
        title: "Insert Video",
        undo: !1,
        focus: !0,
        refreshAfterCallback: !1,
        popup: !0,
        callback: function() {
            this.popups.isVisible("video.insert") ? (this.$el.find(".fr-marker").length && (this.events.disableBlur(), this.selection.restore()), this.popups.hide("video.insert")) : this.video.showInsertPopup()
        },
        plugin: "video"
    }), $e.DefineIcon("insertVideo", {
        NAME: "video-camera",
        FA5NAME: "camera",
        SVG_KEY: "insertVideo"
    }), $e.DefineIcon("videoByURL", {
        NAME: "link",
        SVG_KEY: "insertLink"
    }), $e.RegisterCommand("videoByURL", {
        title: "By URL",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.video.showLayer("video-by-url")
        },
        refresh: function(e) {
            this.video.refreshByURLButton(e)
        }
    }), $e.DefineIcon("videoEmbed", {
        NAME: "code",
        SVG_KEY: "codeView"
    }), $e.RegisterCommand("videoEmbed", {
        title: "Embedded Code",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.video.showLayer("video-embed")
        },
        refresh: function(e) {
            this.video.refreshEmbedButton(e)
        }
    }), $e.DefineIcon("videoUpload", {
        NAME: "upload",
        SVG_KEY: "upload"
    }), $e.RegisterCommand("videoUpload", {
        title: "Upload Video",
        undo: !1,
        focus: !1,
        toggle: !0,
        callback: function() {
            this.video.showLayer("video-upload")
        },
        refresh: function(e) {
            this.video.refreshUploadButton(e)
        }
    }), $e.RegisterCommand("videoInsertByURL", {
        undo: !0,
        focus: !0,
        callback: function() {
            this.video.insertByURL()
        }
    }), $e.RegisterCommand("videoInsertEmbed", {
        undo: !0,
        focus: !0,
        callback: function() {
            this.video.insertEmbed()
        }
    }), $e.DefineIcon("videoDisplay", {
        NAME: "star",
        SVG_KEY: "star"
    }), $e.RegisterCommand("videoDisplay", {
        title: "Display",
        type: "dropdown",
        options: { inline: "Inline", block: "Break Text" },
        callback: function(e, t) {
            this.video.display(t)
        },
        refresh: function(e) {
            this.opts.videoTextNear || e.addClass("fr-hidden")
        },
        refreshOnShow: function(e, t) {
            this.video.refreshDisplayOnShow(e, t)
        }
    }), $e.DefineIcon("video-align", {
        NAME: "align-left",
        SVG_KEY: "align Left"
    }), $e.DefineIcon("video-align-left", {
        NAME: "align-left",
        SVG_KEY: "alignLeft"
    }), $e.DefineIcon("video-align-right", {
        NAME: "align-right",
        SVG_KEY: "alignRight"
    }), $e.DefineIcon("video-align-center", {
        NAME: "align-justify",
        SVG_KEY: "alignJustify"
    }), $e.DefineIcon("videoAlign", {
        NAME: "align-center",
        SVG_KEY: "alignCenter"
    }), $e.RegisterCommand("videoAlign", {
        type: "dropdown",
        title: "Align",
        options: { left: "Align Left", center: "None", right: "Align Right" },
        html: function() {
            var e = '<ul class="fr-dropdown-list" role="presentation">',
                t = $e.COMMANDS.videoAlign.options;
            for (var n in t) t.hasOwnProperty(n) && (e += '<li role="presentation"><a class="fr-command fr-title" tabIndex="-1" role="option" data-cmd="videoAlign" data-param1="'.concat(n, '" title="').concat(this.language.translate(t[n]), '">').concat(this.icon.create("video-align-".concat(n)), '<span class="fr-sr-only">').concat(this.language.translate(t[n]), "</span></a></li>"));
            return e += "</ul>"
        },
        callback: function(e, t) {
            this.video.align(t)
        },
        refresh: function(e) {
            this.video.refreshAlign(e)
        },
        refreshOnShow: function(e, t) {
            this.video.refreshAlignOnShow(e, t)
        }
    }), $e.DefineIcon("videoReplace", {
        NAME: "exchange",
        FA5NAME: "exchange-alt",
        SVG_KEY: "replaceImage"
    }), $e.RegisterCommand("videoReplace", {
        title: "Replace",
        undo: !1,
        focus: !1,
        popup: !0,
        refreshAfterCallback: !1,
        callback: function() {
            this.video.replace()
        }
    }), $e.DefineIcon("videoRemove", {
        NAME: "trash",
        SVG_KEY: "remove"
    }), $e.RegisterCommand("videoRemove", {
        title: "Remove",
        callback: function() {
            this.video.remove()
        }
    }), $e.DefineIcon("videoSize", { NAME: "arrows-alt", SVG_KEY: "imageSize" }), $e.RegisterCommand("videoSize", {
        undo: !1,
        focus: !1,
        popup: !0,
        title: "Change Size",
        callback: function() {
            this.video.showSizePopup()
        }
    }), $e.DefineIcon("videoBack", { NAME: "arrow-left", SVG_KEY: "back" }), $e.RegisterCommand("videoBack", {
        title: "Back",
        undo: !1,
        focus: !1,
        back: !0,
        callback: function() {
            this.video.back()
        },
        refresh: function(e) {
            this.video.get() || this.opts.toolbarInline ? (e.removeClass("fr-hidden"), e.next(".fr-separator").removeClass("fr-hidden")) : (e.addClass("fr-hidden"), e.next(".fr-separator").addClass("fr-hidden"))
        }
    }), $e.RegisterCommand("videoDismissError", {
        title: "OK",
        undo: !1,
        callback: function() {
            this.video.hideProgressBar(!0)
        }
    }), $e.RegisterCommand("videoSetSize", {
        undo: !0,
        focus: !1,
        title: "Update",
        refreshAfterCallback: !1,
        callback: function() {
            this.video.setSize()
        }
    }), Object.assign($e.DEFAULTS, {
        wordDeniedTags: [],
        wordDeniedAttrs: [],
        wordAllowedStyleProps: ["font-family", "font-size", "background", "color", "width", "text-align", "vertical-align", "background-color", "padding", "margin", "height", "margin-top", "margin-left", "margin-right", "margin-bottom", "text-decoration", "font-weight", "font-style", "text-indent", "border", "border-.*", "line-height", "list-style-type"],
        wordPasteModal: !0,
        wordPasteKeepFormatting: !0
    }), $e.PLUGINS.wordPaste = function(A) {
        var i, r, c = A.$,
            s = "word_paste",
            p = {};

        function t(e) {
            var t = A.opts.wordAllowedStyleProps;
            e || (A.opts.wordAllowedStyleProps = []), 0 === r.indexOf("<colgroup>") && (r = "<table>" + r + "</table>"), r = o(r = r.replace(/<span[\n\r ]*style='mso-spacerun:yes'>([\r\n\u00a0 ]*)<\/span>/g, function(e, t) {
                for (var n = "", a = 0; a++ < t.length;) n += "&nbsp;";
                return n
            }), A.paste.getRtfClipboard());
            var n = A.doc.createElement("DIV");
            n.innerHTML = r, A.html.cleanBlankSpaces(n), r = n.innerHTML, r = (r = A.paste.cleanEmptyTagsAndDivs(r)).replace(/\u200b/g, ""),
                function a() {
                    A.modals.hide(s)
                }(), A.paste.clean(r, !0, !0), A.opts.wordAllowedStyleProps = t
        }

        function C(e) {
            e.parentNode && e.parentNode.removeChild(e)
        }

        function u(e, t) {
            if (t(e))
                for (var n = e.firstChild; n;) {
                    var a = n,
                        r = n.previousSibling;
                    n = n.nextSibling, u(a, t), a.previousSibling || a.nextSibling || a.parentNode || !n || r === n.previousSibling || !n.parentNode ? a.previousSibling || a.nextSibling || a.parentNode || !n || n.previousSibling || n.nextSibling || n.parentNode || (r ? n = r.nextSibling ? r.nextSibling.nextSibling : null : e.firstChild && (n = e.firstChild.nextSibling)) : n = r ? r.nextSibling : e.firstChild
                }
        }

        function N(e) {
            if (!e.getAttribute("style") || !/mso-list:[\s]*l/gi.test(e.getAttribute("style").replace(/\n/gi, ""))) return !1;
            try {
                if (!e.querySelector('[style="mso-list:Ignore"]')) return !!(e.outerHTML && 0 <= e.outerHTML.indexOf("\x3c!--[if !supportLists]--\x3e"))
            } catch (t) {
                return !1
            }
            return !0
        }

        function x(e) {
            return e.getAttribute("style").replace(/\n/gi, "").replace(/.*level([0-9]+?).*/gi, "$1")
        }

        function I(e, a) {
            var t = e.cloneNode(!0);
            if (-1 !== ["H1", "H2", "H3", "H4", "H5", "H6"].indexOf(e.tagName)) {
                var n = document.createElement(e.tagName.toLowerCase());
                n.setAttribute("style", e.getAttribute("style")), n.innerHTML = t.innerHTML, t.innerHTML = n.outerHTML
            }
            u(t, function(e) {
                if (e.nodeType == Node.COMMENT_NODE && (A.browser.msie || A.browser.safari || A.browser.edge)) try {
                    if ("[if !supportLists]" === e.data) {
                        for (e = e.nextSibling; e && e.nodeType !== Node.COMMENT_NODE;) {
                            var t = e.nextSibling;
                            e.parentNode.removeChild(e), e = t
                        }
                        e && e.nodeType == Node.COMMENT_NODE && e.parentNode.removeChild(e)
                    }
                } catch (n) {}
                return e.nodeType === Node.ELEMENT_NODE && ("mso-list:\nIgnore" === e.getAttribute("style") && e.setAttribute("style", "mso-list:Ignore"), "mso-list:Ignore" === e.getAttribute("style") && e.parentNode.removeChild(e), e.setAttribute("style", function r(e) {
                    var n = "",
                        a = e.getAttribute("style");
                    a && ["line-height", "font-family", "font-size", "color", "background"].forEach(function(e) {
                        var t = a.match(new RegExp(e + ":.*(;|)"));
                        t && (n += t[0] + ";")
                    });
                    return n
                }(e)), m(e, a)), !0
            });
            var r = t.innerHTML;
            return r = r.replace(/<!--[\s\S]*?-->/gi, "")
        }

        function E(e, t) {
            for (var n = document.createElement(t), a = 0; a < e.attributes.length; a++) {
                var r = e.attributes[a].name;
                n.setAttribute(r, e.getAttribute(r))
            }
            return n.innerHTML = e.innerHTML, e.parentNode.replaceChild(n, e), n
        }

        function S(e) {
            var t = e.getAttribute("align");
            t && (e.style["text-align"] = t, e.removeAttribute("align"))
        }

        function y(e) {
            return e.replace(/\n|\r|\n\r|&quot;/g, "")
        }

        function R(e, t, n) {
            if (t) {
                var a = e.getAttribute("style");
                a && ";" !== a.slice(-1) && (a += ";"), t && ";" !== t.slice(-1) && (t += ";"), t = t.replace(/\n/gi, "");
                var r = null;
                r = n ? (a || "") + t : t + (a || ""), e.setAttribute("style", r)
            }
        }

        var h = null;

        function d(e, t, n) {
            for (var a = e.split(n), r = 1; r < a.length; r++) {
                var o = a[r];
                if (1 < (o = o.split("shplid")).length) {
                    o = o[1];
                    for (var i = "", s = 0; s < o.length && "\\" !== o[s] && "{" !== o[s] && " " !== o[s] && "\r" !== o[s] && "\n" !== o[s];) i += o[s], s++;
                    var l = o.split("bliptag");
                    if (l && l.length < 2) continue;
                    var c = null;
                    if (-1 !== l[0].indexOf("pngblip") ? c = "image/png" : -1 !== l[0].indexOf("jpegblip") && (c = "image/jpeg"), !c) continue;
                    var d = l[1].split("}");
                    if (d && d.length < 2) continue;
                    var f = void 0;
                    if (2 < d.length && -1 !== d[0].indexOf("blipuid")) f = d[1].split(" ");
                    else {
                        if ((f = d[0].split(" ")) && f.length < 2) continue;
                        f.shift()
                    }
                    var p = f.join("");
                    h[t + i] = { image_hex: p, image_type: c }
                }
            }
        }

        function g(e, t) {
            if (t) {
                var n;
                if ("IMG" === e.tagName) {
                    var a = e.getAttribute("src");
                    if (!a || -1 === a.indexOf("file://")) return;
                    if (0 === a.indexOf("file://") && A.helpers.isURL(e.getAttribute("alt"))) return void e.setAttribute("src", e.getAttribute("alt"));
                    (n = p[e.getAttribute("v:shapes")]) || (n = e.getAttribute("v:shapes"), e.parentNode && e.parentNode.parentNode && 0 <= e.parentNode.parentNode.innerHTML.indexOf("msEquation") && (n = null))
                } else n = e.parentNode.getAttribute("o:spid");
                if (e.removeAttribute("height"), n) {
                    ! function s(e) {
                        h = {}, d(e, "i", "\\shppict"), d(e, "s", "\\shp{")
                    }(t);
                    var r = h[n.substring(7)];
                    if (r) {
                        var o = function l(e) {
                                for (var t = e.match(/[0-9a-f]{2}/gi), n = [], a = 0; a < t.length; a++) n.push(String.fromCharCode(parseInt(t[a], 16)));
                                var r = n.join("");
                                return btoa(r)
                            }(r.image_hex),
                            i = "data:" + r.image_type + ";base64," + o;
                        "IMG" === e.tagName ? (e.src = i, e.setAttribute("data-fr-image-pasted", !0)) : c(e.parentNode).before('<img data-fr-image-pasted="true" src="' + i + '" style="' + e.parentNode.getAttribute("style") + '">').remove()
                    }
                }
            }
        }

        function m(e, t) {
            var n = e.tagName,
                a = n.toLowerCase();
            e.firstElementChild && ("I" === e.firstElementChild.tagName ? E(e.firstElementChild, "em") : "B" === e.firstElementChild.tagName && E(e.firstElementChild, "strong"));
            if (-1 !== ["SCRIPT", "APPLET", "EMBED", "NOFRAMES", "NOSCRIPT"].indexOf(n)) return C(e), !1;
            for (var r = ["META", "LINK", "XML", "ST1:", "O:", "W:", "FONT"], o = 0; o < r.length; o++)
                if (-1 !== n.indexOf(r[o])) return e.innerHTML && (e.outerHTML = e.innerHTML), C(e), !1;
            if ("TD" !== n) {
                var i = e.getAttribute("class") || "MsoNormal";
                if (t && i) {
                    for (var s = (i = y(i)).split(" "), l = 0; l < s.length; l++) {
                        var c = [],
                            d = "." + s[l];
                        c.push(d), d = a + d, c.push(d);
                        for (var f = 0; f < c.length; f++) t[c[f]] && R(e, t[c[f]])
                    }
                    e.removeAttribute("class")
                }
                t && t[a] && R(e, t[a])
            }
            if (-1 !== ["P", "H1", "H2", "H3", "H4", "H5", "H6", "PRE"].indexOf(n)) {
                var p = e.getAttribute("class");
                if (p && (t && t[n.toLowerCase() + "." + p] && R(e, t[n.toLowerCase() + "." + p]), -1 !== p.toLowerCase().indexOf("mso"))) {
                    var u = y(p);
                    (u = u.replace(/[0-9a-z-_]*mso[0-9a-z-_]*/gi, "")) ? e.setAttribute("class", u): e.removeAttribute("class")
                }
                var h = e.getAttribute("style");
                if (h) {
                    var g = h.match(/text-align:.+?[; "]{1,1}/gi);
                    g && g[g.length - 1].replace(/(text-align:.+?[; "]{1,1})/gi, "$1")
                }
                S(e)
            }
            if ("TR" === n && function T(e, t) {
                    A.node.clearAttributes(e);
                    for (var n = e.firstElementChild, a = 0, r = !1, o = null; n;) {
                        n.firstElementChild && -1 !== n.firstElementChild.tagName.indexOf("W:") && (n.innerHTML = n.firstElementChild.innerHTML), (o = n.getAttribute("width")) || r || (r = !0), a += parseInt(o, 10), (!n.firstChild || n.firstChild && n.firstChild.data === $e.UNICODE_NBSP) && (n.firstChild && C(n.firstChild), n.innerHTML = "<br>");
                        for (var i = n.firstElementChild, s = 1 === n.children.length; i;) "P" !== i.tagName || N(i) || s && S(i), i = i.nextElementSibling;
                        if (t) {
                            var l = n.getAttribute("class");
                            if (l) {
                                var c = (l = y(l)).match(/xl[0-9]+/gi);
                                if (c) {
                                    var d = "." + c[0];
                                    t[d] && R(n, t[d])
                                }
                            }
                            t.td && R(n, t.td)
                        }
                        var f = n.getAttribute("style");
                        f && (f = y(f)) && ";" !== f.slice(-1) && (f += ";");
                        var p = n.getAttribute("valign");
                        if (!p && f) {
                            var u = f.match(/vertical-align:.+?[; "]{1,1}/gi);
                            u && (p = u[u.length - 1].replace(/vertical-align:(.+?)[; "]{1,1}/gi, "$1"))
                        }
                        var h = null;
                        if (f) {
                            var g = f.match(/text-align:.+?[; "]{1,1}/gi);
                            g && (h = g[g.length - 1].replace(/text-align:(.+?)[; "]{1,1}/gi, "$1")), "general" === h && (h = null)
                        }
                        var m = null;
                        if (f) {
                            var v = f.match(/background:.+?[; "]{1,1}/gi);
                            v && (m = v[v.length - 1].replace(/background:(.+?)[; "]{1,1}/gi, "$1"))
                        }
                        var b = n.getAttribute("colspan"),
                            E = n.getAttribute("rowspan");
                        b && n.setAttribute("colspan", b), E && n.setAttribute("rowspan", E), p && (n.style["vertical-align"] = p), h && (n.style["text-align"] = h), m && (n.style["background-color"] = m), o && n.setAttribute("width", o), n = n.nextElementSibling
                    }
                    for (n = e.firstElementChild; n;) o = n.getAttribute("width"), r ? n.removeAttribute("width") : n.setAttribute("width", 100 * parseInt(o, 10) / a + "%"), n = n.nextElementSibling
                }(e, t), "A" !== n || e.attributes.getNamedItem("href") || e.attributes.getNamedItem("name") || !e.innerHTML || (e.outerHTML = e.innerHTML), "A" == n && e.getAttribute("href") && e.querySelector("img"))
                for (var m = e.querySelectorAll("span"), v = 0; v < m.length; v++) m[v].innerText || (m[v].outerHTML = m[v].innerHTML);
            if ("TD" !== n && "TH" !== n || e.innerHTML || (e.innerHTML = "<br>"), "TABLE" === n && (e.style.width = e.style.width), e.getAttribute("lang") && e.removeAttribute("lang"), e.getAttribute("style") && -1 !== e.getAttribute("style").toLowerCase().indexOf("mso")) {
                var b = y(e.getAttribute("style"));
                (b = b.replace(/[0-9a-z-_]*mso[0-9a-z-_]*:.+?(;{1,1}|$)/gi, "")) ? e.setAttribute("style", b): e.removeAttribute("style")
            }
            return !0
        }

        function o(e, t) {
            0 <= e.indexOf("<html") && (e = e.replace(/[.\s\S\w\W<>]*(<html[^>]*>[.\s\S\w\W<>]*<\/html>)[.\s\S\w\W<>]*/i, "$1")),
                function d(e) {
                    for (var t = e.split("v:shape"), n = 1; n < t.length; n++) {
                        var a = t[n],
                            r = a.split(' id="')[1];
                        if (r && 1 < r.length) {
                            r = r.split('"')[0];
                            var o = a.split(' o:spid="')[1];
                            o && 1 < o.length && (o = o.split('"')[0], p[r] = o)
                        }
                    }
                }(e);
            var n = (new DOMParser).parseFromString(e, "text/html"),
                a = n.head,
                r = n.body,
                s = function f(e) {
                    var t = {},
                        n = e.getElementsByTagName("style");
                    if (n.length) {
                        var a = n[0].innerHTML.match(/[\S ]+\s+{[\s\S]+?}/gi);
                        if (a)
                            for (var r = 0; r < a.length; r++) {
                                var o = a[r],
                                    i = o.replace(/([\S ]+\s+){[\s\S]+?}/gi, "$1"),
                                    s = o.replace(/[\S ]+\s+{([\s\S]+?)}/gi, "$1");
                                i = i.replace(/^[\s]|[\s]$/gm, ""), s = s.replace(/^[\s]|[\s]$/gm, ""), i = i.replace(/\n|\r|\n\r/g, ""), s = s.replace(/\n|\r|\n\r/g, "");
                                for (var l = i.split(", "), c = 0; c < l.length; c++) t[l[c]] = s
                            }
                    }
                    return t
                }(a);
            u(r, function(e) {
                if (e.nodeType === Node.TEXT_NODE && /\n|\u00a0|\r/.test(e.data)) {
                    if (!/\S| /.test(e.data) && !/[\u00a0]+/.test(e.data)) return e.data === $e.UNICODE_NBSP ? (e.data = "\u200b", !0) : 1 === e.data.length && 10 === e.data.charCodeAt(0) ? (e.data = " ", !0) : (C(e), !1);
                    e.data = e.data.replace(/\n|\r/gi, " ")
                }
                return !0
            }), u(r, function(e) {
                return e.nodeType !== Node.ELEMENT_NODE || "V:IMAGEDATA" !== e.tagName && "IMG" !== e.tagName || g(e, t), !0
            });
            for (var o = r.querySelectorAll("ul > ul, ul > ol, ol > ul, ol > ol"), i = o.length - 1; 0 <= i; i--) o[i].previousElementSibling && "LI" === o[i].previousElementSibling.tagName && o[i].previousElementSibling.appendChild(o[i]);
            u(r, function(e) {
                if (e.nodeType === Node.TEXT_NODE) return e.data = e.data.replace(/<br>(\n|\r)/gi, "<br>"), !1;
                if (e.nodeType === Node.ELEMENT_NODE) {
                    if (N(e)) {
                        var t = e.parentNode,
                            n = e.previousSibling,
                            a = function O(e, t, n, a) {
                                var r, o, i = /[0-9a-zA-Z]./gi,
                                    s = !1,
                                    l = navigator.userAgent.toLowerCase(); -
                                1 != l.indexOf("safari") && (l = -1 < l.indexOf("chrome") ? 1 : "safari"), e.innerHTML.includes("mso-list:\nIgnore") && (e.innerHTML = e.innerHTML.replace(/mso-list:\nIgnore/gi, "mso-list:Ignore"));
                                var c, d, f, p, u = e.querySelector('span[style="mso-list:Ignore"]');
                                null == u && "safari" == l && (u = e.querySelector('span[lang="PT-BR"]'));
                                var h;
                                u && (s = s || i.test(u.textContent)), null !== u && (h = u.textContent.trim().split(".")[0]), f = 1 == s ? ("1" == (h = u.textContent.trim().split(".")[0]) ? p = "decimal;" : "i" == h ? p = "lower-roman;" : "I" == h ? p = "upper-roman;" : "o" == h ? p = "circle;" : h.match(/^v$/) || (h.match(/^[a-z]$/) || h.match(/^[a-z]\)$/) ? p = "lower-alpha;" : (h.match(/^[A-Z]$/) || h.match(/^[A-Z]\)$/)) && (p = "upper-alpha;")), p = "list-style-type: " + p, "ol") : (null != u && (h = u.textContent.trim().split(".")[0]), "\xa7" == h ? p = "square;" : "\xb7" == h && (p = "disc;"), p = "list-style-type: " + p, "ul");
                                var g, m = "";
                                u == undefined || u.textContent == undefined || isNaN(parseInt(u.textContent.trim().split(".")[1], 10)) || (m = ' class="decimal_type" ');
                                var v, b = x(e),
                                    E = e.style.marginLeft;
                                if (E.includes("in") ? (v = "in", E = parseFloat(E) - .5) : E.includes("pt") && (v = "px", E = parseFloat(E) - 10), 1 == b)
                                    if (g = p ? "<" + f + ' style = "' + p + "; margin-left:" + E + v + ';">' : "<" + f + ' style="margin-left:' + E + v + ';">', "list-style-type: upper-alpha;" == p) {
                                        var T = h.charCodeAt(0) - 64;
                                        g = p ? "<" + f + m + ' start="' + T + '" style = "' + p + " margin-left:" + E + v + ';">' : "<" + f + ">"
                                    } else if ("list-style-type: lower-alpha;" == p) {
                                    var A = h.charCodeAt(0) - 96;
                                    g = p ? "<" + f + m + ' start="' + A + '" style = "' + p + "margin-left:" + E + v + ';">' : "<" + f + ">"
                                } else g = p ? "<" + f + m + ' style = "' + p + ";margin-left:" + E + v + ';">' : "<" + f + ' style="margin-left:' + E + v + ';">';
                                else if ("list-style-type: upper-alpha;" == p) {
                                    var C = h.charCodeAt(0) - 64;
                                    g = p ? "<" + f + m + ' style = "' + p + ' start="' + C + '">' : "<" + f + ">"
                                } else if ("list-style-type: lower-alpha;" == p) {
                                    var S = h.charCodeAt(0) - 96;
                                    g = p ? "<" + f + m + ' style = "' + p + ' start="' + S + '">' : "<" + f + ">"
                                } else g = p ? "<" + f + m + ' style = "' + p + '">' : "<" + f + ">";
                                for (var y = !1; e;) {
                                    if (!N(e)) {
                                        if (e.outerHTML && 0 < e.outerHTML.indexOf("mso-bookmark") && 0 == (e.textContent || "").length) {
                                            e = e.nextElementSibling;
                                            continue
                                        }
                                        break
                                    }
                                    var R = x(e);
                                    if ((n = n || R) < R) g += (d = O(e, t, R, e.style.marginLeft)).el.outerHTML, e = d.currentNode;
                                    else {
                                        if (R < n) break;
                                        e.firstElementChild && e.firstElementChild.firstElementChild && e.firstElementChild.firstElementChild.firstChild && (i.lastIndex = 0), o && o.firstElementChild && o.firstElementChild.firstElementChild && o.firstElementChild.firstElementChild.firstChild && (i.lastIndex = 0, r = i.test(o.firstElementChild.firstElementChild.firstChild.data || o.firstElementChild.firstElementChild.firstChild.firstChild && o.firstElementChild.firstElementChild.firstChild.firstChild.data || ""));
                                        var L = !1;
                                        (!a && !e.style.marginLeft || a && e.style.marginLeft && a === e.style.marginLeft) && (L = !0), a = e.style.marginLeft, L || r === undefined ? (c = I(e, t), e.nextSibling.innerText == undefined || e.nextSibling.innerText == undefined || g.includes('class="decimal_type"') || isNaN(parseInt(e.nextSibling.innerText.trim().split(".")[1], 10)) || (g = g.substring(3, 0) + ' class="decimal_type"' + g.substring(3, g.length)), g += "<li>" + c + "</li>") : (1 == R && (g += "</" + f + ">", y = !0, o = null), g += (d = O(e, t, R, e.style.marginLeft)).el.outerHTML, e = d.currentNode);
                                        var w = e && e.nextElementSibling;
                                        if (w && (o = w.previousElementSibling), e && !N(e)) {
                                            if (e.outerHTML && 0 < e.outerHTML.indexOf("mso-bookmark") && 0 == (e.textContent || "").length) {
                                                e = e.nextElementSibling;
                                                continue
                                            }
                                            break
                                        }
                                        e && e.parentNode && e.parentNode.removeChild(e), e = w
                                    }
                                }
                                y || (g += "</" + f + ">");
                                var _ = document.createElement("div");
                                return _.innerHTML = g, { el: _, currentNode: e }
                            }(e, s).el,
                            r = null;
                        return (r = n ? n.nextSibling : t.firstChild) ? t.insertBefore(a, r) : t.appendChild(a), !1
                    }
                    return "FONT" === e.tagName && s["." + e.getAttribute("class")] && (e = E(e, "span")), m(e, s)
                }
                if (e.nodeType !== Node.COMMENT_NODE) return !0;
                if (-1 < e.data.indexOf("[if !supportLineBreakNewLine]"))
                    for (var o = e.nextSibling; o;)(o = e.nextSibling) && C(o), o.data && -1 < o.data.indexOf("[endif]") && (o = null);
                if (-1 < e.data.indexOf("[if supportFields]") && -1 < e.data.indexOf("FORMCHECKBOX")) {
                    var i = document.createElement("input");
                    i.type = "checkbox", e.parentNode.insertBefore(i, e.nextSibling)
                }
                return C(e), !1
            }), u(r, function(e) {
                if (e.nodeType === Node.ELEMENT_NODE) {
                    var t = e.tagName;
                    if (!e.innerHTML && -1 === ["BR", "IMG", "INPUT"].indexOf(t)) {
                        for (var n = e.parentNode; n && (C(e), !(e = n).innerHTML);) n = e.parentNode;
                        return !1
                    }! function d(e) {
                        var t = e.getAttribute("style");
                        if (t) {
                            (t = y(t)) && ";" !== t.slice(-1) && (t += ";");
                            var n = t.match(/(^|\S+?):.+?;{1,1}/gi);
                            if (n) {
                                for (var a = {}, r = 0; r < n.length; r++) {
                                    var o = n[r].split(":");
                                    2 === o.length && ("text-align" === o[0] && "SPAN" === e.tagName || (a[o[0]] = o[1]))
                                }
                                var i = "";
                                for (var s in a)
                                    if (a.hasOwnProperty(s)) {
                                        if ("font-size" === s && "pt;" === a[s].slice(-3)) {
                                            var l = null;
                                            try {
                                                l = parseFloat(a[s].slice(0, -3), 10)
                                            } catch (c) {
                                                l = null
                                            }
                                            l && (l = Math.round(1.33 * l), a[s] = l + "px;")
                                        }
                                        i += s + ":" + a[s]
                                    }
                                i && e.setAttribute("style", i)
                            }
                        }
                    }(e)
                }
                return !0
            }), u(r, function(e) {
                if (e && "A" === e.nodeName && "" === e.href) {
                    for (var t = document.createDocumentFragment(); e.firstChild;) t.appendChild(e.firstChild);
                    e.parentNode.replaceChild(t, e)
                }
                return !0
            });
            var l = r.outerHTML,
                c = A.opts.htmlAllowedStyleProps;
            return A.opts.htmlAllowedStyleProps = A.opts.wordAllowedStyleProps, l = A.clean.html(l, A.opts.wordDeniedTags, A.opts.wordDeniedAttrs, !1), A.opts.htmlAllowedStyleProps = c, l
        }

        return {
            _init: function e() {
                A.events.on("paste.wordPaste", function(e) {
                    return r = e, A.opts.wordPasteModal ? function o() {
                        if (!i) {
                            var e = '<h4><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.95 73.23" style="height: 25px; vertical-align: text-bottom; margin-right: 5px; display: inline-block"><defs><style>.a{fill:#2a5699;}.b{fill:#fff;}</style></defs><path class="a" d="M615.15,827.22h5.09V834c9.11.05,18.21-.09,27.32.05a2.93,2.93,0,0,1,3.29,3.25c.14,16.77,0,33.56.09,50.33-.09,1.72.17,3.63-.83,5.15-1.24.89-2.85.78-4.3.84-8.52,0-17,0-25.56,0v6.81h-5.32c-13-2.37-26-4.54-38.94-6.81q0-29.8,0-59.59c13.05-2.28,26.11-4.5,39.17-6.83Z" transform="translate(-575.97 -827.22)"/><path class="b" d="M620.24,836.59h28.1v54.49h-28.1v-6.81h22.14v-3.41H620.24v-4.26h22.14V873.2H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24v-4.26h22.14v-3.41H620.24V846h22.14v-3.41H620.24Zm-26.67,15c1.62-.09,3.24-.16,4.85-.25,1.13,5.75,2.29,11.49,3.52,17.21,1-5.91,2-11.8,3.06-17.7,1.7-.06,3.41-.15,5.1-.26-1.92,8.25-3.61,16.57-5.71,24.77-1.42.74-3.55,0-5.24.09-1.13-5.64-2.45-11.24-3.47-16.9-1,5.5-2.29,10.95-3.43,16.42q-2.45-.13-4.92-.3c-1.41-7.49-3.07-14.93-4.39-22.44l4.38-.18c.88,5.42,1.87,10.82,2.64,16.25,1.2-5.57,2.43-11.14,3.62-16.71Z" transform="translate(-575.97 -827.22)"/></svg> ' + A.language.translate("Word Paste Detected") + "</h4>",
                                t = function r() {
                                    var e = '<div class="fr-word-paste-modal" style="padding: 20px 20px 10px 20px;">';
                                    return e += '<p style="text-align: left;">' + A.language.translate("The pasted content is coming from a Microsoft Word document. Do you want to keep the format or clean it up?") + "</p>", e += '<div style="text-align: right; margin-top: 50px;"><button class="fr-remove-word fr-command">' + A.language.translate("Clean") + '</button> <button class="fr-keep-word fr-command">' + A.language.translate("Keep") + "</button></div>", e += "</div>"
                                }(),
                                n = A.modals.create(s, e, t),
                                a = n.$body;
                            i = n.$modal, n.$modal.addClass("fr-middle"), A.events.bindClick(a, "button.fr-remove-word", function() {
                                var e = i.data("instance") || A;
                                e.wordPaste.clean()
                            }), A.events.bindClick(a, "button.fr-keep-word", function() {
                                var e = i.data("instance") || A;
                                e.wordPaste.clean(!0)
                            }), A.events.$on(c(A.o_win), "resize", function() {
                                A.modals.resize(s)
                            })
                        }
                        A.modals.show(s), A.modals.resize(s)
                    }() : t(A.opts.wordPasteKeepFormatting), !1
                })
            },
            clean: t,
            _wordClean: o
        }
    }, $e
});