/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: dom/dom.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/23
 *
 */

/// require('string.trim');

/**
 * @namespace J.dom
 */

/**
 * change log
 *
 * @version: 1.0.1 By Jock
 * 2014.7.23
 * J.g('id') 所有扩展的方法做了容错处理，哪怕ID不存在也不会有问题
 * J.s('.abc') 扩展了所有单个元素的方法，解决了以前只可以通过 each 使用
 *
 * 2014.08.28
 * setStyle 增加2个参数的用法支持， .setStyle(color,red)
 *
 *
 */


(function (J, W, D) {

    var undef = J.undef, fn = {
        show: function () {
            this.get().style.display = '';
            return this
        },

        hide: function () {
            this.get().style.display = 'none';
            return this
        },

        visible: function () {
            return this.get().style.display != 'none';
        },

        remove: function () {
            var element = this.get();
            element.parentNode && element.parentNode.removeChild(element);
            return this
        },

        attr: function (key, value) {
            var element = this.get();
            if(!element) return arguments.length <= 1 ? undef : this;

            if ('style' === key) {
                if (U(value)) return element.style.cssText; else element.style.cssText = value;
                return this;
            }
            key = Fix_ATTS[key] || key;
            if (J.isString(key))
                if (U(value)) return element.getAttribute(key); else (value === null) ? this.removeAttr(key) : element.setAttribute(key, value);
            else {
                for (var k in key) {
                    this.attr(k, key[k]);
                }
            }
            return this;
        },

        /**
         * 移除属性
         * @param key
         */
        removeAttr: function (key) {
            this.get().removeAttribute(key);
            return this;
        },

        /**
         * 为元素添加className
         * @param className
         * @return this
         */
        addClass: function (className) {
            var element = this.get();
            if (!this.hasClass(className))
                element.className += (element.className ? ' ' : '') + className;
            return this;
        },

        /**
         * 移除目标元素的className
         * @param className
         * @return this
         */
        removeClass: function (className) {
            var element = this.get();
            element.className = element.className.replace(
                new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').trim();
            return this;
        },

        /**
         * 判断元素是否拥有指定的className
         * @param className
         * @return {Boolean}
         */
        hasClass: function (className) {
            var element = this.get();
            var elementClassName = element.className;
            return (elementClassName.length > 0 && (elementClassName == className ||
                new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
        },

        /**
         * 获取样式
         * @param style
         * @returns {*}
         */
        getStyle: function (style) {
            var element = this.get(), css;
            style = style == float ? cssFloat : style;
            var value = element.style[style];
            if (!value || value == 'auto') {
                if (J.ua.ie) {
                    css = element.currentStyle; //use currentStyle to get real style for ie
                } else {
                    css = D.defaultView.getComputedStyle(element, null);
                }
                value = css ? css[style] : null;
            }
            if (style == opacity) return value ? parseFloat(value) : 1.0;
            return value == 'auto' ? null : value;
        },

        /**
         * 设置样式
         * @param style "color:#ccc; background:#fff" | {color:"#ccc",background:"#fff"} | color
         * @param value "red"
         * @returns {dom}
         */
        setStyle: function (style, value) {
            var element = this.get(), elementStyle = element.style, argumentsLength = arguments.length;
            if( argumentsLength === 2 ){
                elementStyle.cssText += ';' + style + ':' + value;
            }else if (J.isString(style)) {
                elementStyle.cssText += ';' + style;
                style.indexOf(opacity) > 0 && this.setOpacity(style.match(/opacity:\s*(\d?\.?\d*)/)[1]);
            }
            for (var property in style)
                if (property == opacity) this.setOpacity(style[property]);
                else
                    elementStyle[(property == float || property == cssFloat) ?
                        (elementStyle.styleFloat ? 'styleFloat' : cssFloat) :
                        property] = style[property];

            return this;
        },

        getOpacity: function () {
            return this.getStyle(opacity);
        },

        setOpacity: function (value) {
            this.get().style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
            return this;
        },

        append: function (element) {
            this.get().appendChild(element.nodeType === 1 ? element : element.get());
            return this;
        },

        appendTo: function (element) {
            g(element).append(this.get());
            return this;
        },

        html: function (value) {
            var element = this.get(), argumentsLength = arguments.length;
            if(!element) return argumentsLength === 0 ? undef : this;

            if (argumentsLength > 0) {
                if (value && value.nodeType === 1)
                    return this.append(value)
                element.innerHTML = value;
                return this;
            }
            return element.innerHTML;
        },

        val: function (value) {
            var element = this.get(), argumentsLength = arguments.length, V;
            if(!element) return argumentsLength === 0 ? undef : this;

            V = valFix[element.tagName.toLowerCase() || element.type];
            V = V ? V(element, value) : undef;
            return (argumentsLength === 0) ? V : this;
        },

        s: function(selector){
            return s(selector, this.get())
        },

        get: function (index) {
            var index = index || 0, elm = this[index];
            return elm;
        },

        width: function () {
            return getWH(this).width
        },

        height: function () {
            return getWH(this).height
        },

        offset: function () {
            var target = this.get();
            if (target && J.isUndefined(target.offsetLeft)) {
                target = target.parentNode;
            }
            var pageCoord = (function (element) {
                var coord = {
                    x: 0,
                    y: 0
                };
                while (element) {
                    coord.x += element.offsetLeft;
                    coord.y += element.offsetTop;
                    element = element.offsetParent;
                }
                return coord;
            })(target);
            return {
                x: pageCoord.x,
                y: pageCoord.y
            };
        },

        /**
         * 将目标元素添加到基准元素之后
         * @param element 插入的元素
         */
        insertAfter: function (element) {
            var self = this.get(), parent = self.parentNode;
            if (parent) {
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self.nextSibling);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素之前
         * @param element 插入的元素
         */
        insertBefore: function (element) {
            var self = this.get(), parent = self.parentNode;
            if (parent) {
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素第一个子节点之前
         * @param element 插入的元素
         */
        insertFirst: function (element) {
            var first = this.first();
            first ? first.insertBefore(element) : this.append(element);
            return this;
        },

        insertFirstTo: function (element) {
            getRealElement(element).insertFirst(this.get());
            return this;
        },

        /**
         * 将目标元素添加到基准元素最后一个子节点之后
         * @param element 插入的元素
         */
        insertLast: function (element) {
            return this.append(element)
        },

        /**
         * 获取目标元素的第一个元素节点
         */
        first: function () {
            return matchNode(this, 'nextSibling', 'firstChild');
        },

        /**
         * 获取目标元素的最后一个元素节点
         */
        last: function () {
            return matchNode(this, 'previousSibling', 'lastChild');
        },

        /**
         * 获取目标元素的下一个兄弟元素节点
         */
        next: function () {
            return matchNode(this, 'nextSibling', 'nextSibling');
        },

        /**
         * 获取目标元素的上一个兄弟元素节点
         */
        prev: function () {
            return matchNode(this, 'previousSibling', 'previousSibling');
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        up: function (expression) {
            var element = this.get();
            if (arguments.length == 0) return dom(element.parentNode);
            var i = 0, isNumber = J.isNumber(expression), R;
            isNumber || (R = expression.match(/^(\.)?(\w+)$/));
            while (element = element['parentNode']) {
                if (element.nodeType == 1)
                    if (isNumber && i == expression) return g(element);
                    else if (R && ((R[1] && R[2] == element.className) || R[2].toUpperCase() == element.tagName)) return g(element);
                i++;
            }
            return fnExtNull(this);
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        down: function (expression) {
            var element = this.get();
            if (arguments.length === 0 || expression === 0) return this.first();
            return J.isNumber(expression) ? s('*', element).eq(expression) : s(expression, element);
        },

        /**
         * 提交表单
         */
        submit: function () {
            this.get().submit();
        },

        eq: eq,

        empty: function () {
            return this.html('');
        },

        each: each,

        length: 0,
        splice: [].splice
    };

    function eq(i) {
        i = i || 0;
        var item = this[ i === -1 ? this.length - 1 : i ];
        return item ? g(item) : fnExtNull();
    }

    function each(callback) {
        debugger
        var i = 0, length = this.length;
        for (; i < length;) {
            if (callback.call( g( this[ i ] ), i, g( this[ i++ ]) ) === false) {
                break;
            }
        }
        return this;
    }

    function g(id) {
        var domElm = new elem(id);
        !domElm.length && fnExtNull(domElm);
        return domElm
    }

    function s(selector, element) {
        var domElms = new select(selector, element);
        return (domElms.length ? fnExt : fnExtNull)(domElms);
    }

    /**
     * 空方法重写
     * @param domElm
     * @return {*}
     */
    function fnExtNull(domElm){
        domElm = domElm || g();
        for(var f in fn){
            (f !== 'length' && f !== 'get' && f !== 'val' && f !== 'html' && f !== 'attr') && (domElm[f] = function () {
                return domElm;
            });
        }
        return domElm
    }

    /**
     * 空方法重写
     * @param domElms
     * @return {*}
     */
    function fnExt(domElms){
        for(var f in fn){
            (function(f){
                (f !== 'length' && f !== 'get' && f !== 'eq' && f !== 's' && f !== 'each') && (domElms[f] = function () {
                    var i = 0, length = domElms.length;
                    for (; i < length;) {
                        g( domElms[i] )[f].apply(domElms[i++], arguments);
                    }
                    return domElms;
                })
            })(f);
        }
        return domElms
    }

    function elem(id) {
        var selector = id;
        if (id === "body" && D.body) {
            this[0] = D.body;
            this.length = 1;
            this.selector = selector;
            return this
        }

        if (id instanceof elem) {
            return id
        }

        if (id = ( id && id.nodeType ) ? id : D.getElementById(id)) {
            this[0] = id;
            this.length = 1;
        }
        this.selector = selector;
        return this;
    }

    var T = 'getElementsByTagName', C = 'getElementsByClassName', dom = g, float = 'float', cssFloat = 'cssFloat', opacity = 'opacity', U = J.isUndefined,

        Fix_ATTS = (function () {
            var result = {};
            if (J.ua.ie < 8) {
                result['for'] = 'htmlFor';
                result['class'] = 'className';
            } else {
                result['htmlFor'] = 'for';
                result['className'] = 'class';
            }
            return result;
        })(),

        valFix = (function () {
            function input(element, value) {
                switch (element.type.toLowerCase()) {
                    case 'checkbox':
                    case 'radio':
                        return inputSelector(element, value);
                    default:
                        return valueSelector(element, value);
                }
            }

            function inputSelector(element, value) {
                if (U(value))  return element.checked ? element.value : null;
                else element.checked = !!value;
            }

            function valueSelector(element, value) {
                if (U(value)) return element.value; else element.value = value;
            }

            function select(element, value) {
                if (U(value))
                    return selectOne(element);
            }

            function selectOne(element) {
                var index = element.selectedIndex;
                return index >= 0 ? optionValue(element.options[index]) : null;
            }

            function optionValue(opt) {
                return (!U(opt['value'])) ? opt.value : opt.text;
            }

            return {
                input: input,
                textarea: valueSelector,
                select: select,
                button: valueSelector
            };
        })();


    elem.prototype = fn;

    J.mix(dom, {
        dom: dom,
        create: create,
        fn: fn,
        s: s,
        g: g
    });

    function getRealElement(element) {
        return J.isString(element) ? dom(element) : element
    }

    function matchNode(element, direction, start) {
        for (var node = element.get()[start]; node; node = node[direction]) {
            if (node.nodeType == 1) {
                return g(node);
            }
        }
        return fnExtNull(element);
    }

    function getWH(element) {
        var el = element.get();

        if (element.visible()) {
            return { width: el.offsetWidth, height: el.offsetHeight }
        }

        var sty = el.style, stys, wh, ostys = {
            visibility: sty.visibility,
            position: sty.position,
            display: sty.display
        };

        stys = {
            visibility: 'hidden',
            display: 'block'
        };
        if (ostys.position !== 'fixed')
            stys.position = 'absolute';

        element.setStyle(stys);

        wh = {
            width: el.offsetWidth,
            height: el.offsetHeight
        };

        element.setStyle(ostys);

        return wh;
    }

    function create(tagName, attributes) {
        var el = D.createElement(tagName), jEl = dom(el);
        return (U(attributes)) ? jEl : jEl.attr(attributes);
    }

    /**
     * class 选择器查询
     * @param selector '.className' | 'tagName' | '.className tagName'
     * @param element content | null
     * @return []
     */
    function select(selector, element) {
        this.selector = selector;
        // J.sizzle
        if (J.sizzle) return merge(this, J.sizzle(selector, element));

        var match = selector ? selector.match(/^(\.)?(\w+)(\s(\w+))?/) : null, result = [], len, i, elements, node, tagName;
        element = element || D;

        // div       -> [  "div"  ,   undefined  ,   "div"  ,   undefined  ,   undefined  ]
        // .ttt      -> [  ".ttt"  ,   "."  ,   "ttt"  ,   undefined  ,   undefined  ]
        // .ttt span -> [  ".ttt span"  ,   "."  ,   "ttt"  ,   " span"  ,   "span"  ]
        if (match && match[1]) {
            // 初始化tagName参数
            tagName = match[4] ? match[4].toUpperCase() : '';
            // 查询元素, 如果支持getElementsByClassName
            if (element[C]) {
                elements = element[C](match[2]);
                len = elements.length;
                for (i = 0; i < len; i++) {
                    node = elements[i];
                    if (tagName && node.tagName != tagName) {
                        continue;
                    }
                    result.push(node);
                }
            } else {
                var className = new RegExp("(^|\\s)" + match[2] + "(\\s|$)");
                elements = tagName ? element[T](tagName) : (element.all || element[T]("*"));
                len = elements.length;
                for (i = 0; i < len; i++) {
                    node = elements[i];
                    className.test(node.className) && result.push(node);
                }
            }
        } else {
            result = element[T](selector)
        }

        return merge(this, result)

    }

    select.prototype = {
        /*
         在新的版本中已经被重写
         each: each,
         get: function (i) {
         return this.eq(i);
         },
         eq: function (i) {
         var i = i || 0;
         return this[ i === -1 ? this.length - 1 : i ];
         },*/
        each: each,
        s: function(selector){
            return s(selector, this.eq().get())
        },
        eq: eq,
        length: 0,
        splice: [].splice
    };


    function merge(first, second){
        var i = first.length, l, j = 0;
        for ( l = second.length; j < l; j++ ) {
            first[ i++ ] = g(second[ j ]);
        }
        first.length = i;
    }

    J.mix(J, {
        dom: dom,
        create: create,
        s: s,
        g: g
    });

})(J, window, document);
