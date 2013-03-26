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

/// require('lang.merge');
/// require('string.trim');

/**
 * @namespace J.dom
 */
(function (J, W, D) {

    function g(id) {
        var domElm = new elem(id);
        return domElm.length ? domElm : null;
    }

    function s(selector, element) {
        return new select(selector, element)
    }

    function elem(id) {
        var selector = id;
        if (id === "body" && D.body) {
            this[0] = D.body;
            this.length = 1;
            this.selector = selector;
            return this
        }
        if (id instanceof elem){
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
            input:input,
            textarea:valueSelector,
            select:select,
            button:valueSelector
        };
    })();


    var fn = elem.prototype = {
        show:function () {
            this.get().style.display = '';
            return this
        },

        hide:function () {
            this.get().style.display = 'none';
            return this
        },

        visible: function() {
            return this.get().style.display != 'none';
        },

        remove:function(){
            var element = this.get();
            element.parentNode && element.parentNode.removeChild(element);
            return this
        },

        attr:function (key, value) {
            var element = this.get();
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
        removeAttr:function(key){
            this.get().removeAttribute(key);
            return this;
        },

        /**
         * 为元素添加className
         * @param className
         * @return this
         */
        addClass:function (className) {
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
        removeClass:function (className) {
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
        hasClass:function (className) {
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
        getStyle: function(style) {
            var element = this.get();
            style = style == float ? cssFloat : style;
            var value = element.style[style];
            if (!value || value == 'auto') {
                var css = D.defaultView.getComputedStyle(element, null);
                value = css ? css[style] : null;
            }
            if (style == opacity) return value ? parseFloat(value) : 1.0;
            return value == 'auto' ? null : value;
        },

        /**
         * 设置样式
         * @param styles
         * @returns {*}
         */
        setStyle: function(styles) {
            var element = this.get(), elementStyle = element.style, match;
            if (J.isString(styles)) {
                element.style.cssText += ';' + styles;
                styles.indexOf(opacity) > 0 && this.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]);
            }
            for (var property in styles)
                if (property == opacity) this.setOpacity(styles[property]);
                else
                elementStyle[(property == float || property == cssFloat) ?
                (elementStyle.styleFloat ? 'styleFloat' : cssFloat) :
                property] = styles[property];

            return this;
        },

        getOpacity: function() {
            return this.getStyle(opacity);
        },

        setOpacity: function(value) {
            this.get().style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
            return this;
        },

        append:function(element){
            this.get().appendChild(element.nodeType === 1 ? element : element.get());
            return this;
        },

        appendTo:function(element){
            getRealElement(element).append(this.get());
            return this;
        },

        html:function(html){
            var self = this.get();
            if(!J.isUndefined(html)){
                if(html.nodeType === 1)
                    return this.append(html)
                self.innerHTML = html;
                return this;
            }
            return self.innerHTML;
        },

        val:function(value){
            var element = this.get(), V = valFix[element.tagName.toLowerCase() || element.type];
            V = V ? V (element, value) : null;
            return (U(value)) ? V : this;
        },

        s:function (selector) {
            return new select(selector, (this[0].nodeType === 1) ? this[0] : D);
        },

        get:function (index) {
            var index = index || 0, elm = this[index];
            if(!elm) throw('selector "'+this.selector+'" element is not found.');
            return elm;
        },

        width:function(){
            return getWH(this).width
        },

        height:function(){
            return getWH(this).height
        },

        offset:function() {
            var target = this.get();
            if(target && J.isUndefined(target.offsetLeft)) {
                target = target.parentNode;
            }
            var pageCoord = (function(element){
                var coord = {
                    x : 0,
                    y : 0
                };
                while(element) {
                    coord.x += element.offsetLeft;
                    coord.y += element.offsetTop;
                    element = element.offsetParent;
                }
                return coord;
            })(target);
            return {
                x : pageCoord.x,
                y : pageCoord.y
            };
        },

        /**
         * 将目标元素添加到基准元素之后
         * @param element 插入的元素
         */
        insertAfter:function (element) {
            var self = this.get(), parent = self.parentNode;
            if(parent){
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self.nextSibling);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素之前
         * @param element 插入的元素
         */
        insertBefore:function (element) {
            var self = this.get(), parent = self.parentNode;
            if(parent){
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素第一个子节点之前
         * @param element 插入的元素
         */
        insertFirst:function (element) {
            var first = this.first();
            first ? first.insertBefore(element) : this.append(element);
            return this;
        },

        insertFirstTo:function (element) {
            getRealElement(element).insertFirst(this.get());
            return this;
        },

        /**
         * 将目标元素添加到基准元素最后一个子节点之后
         * @param element 插入的元素
         */
        insertLast:function (element) {
            return this.append(element)
        },

        /**
         * 获取目标元素的第一个元素节点
         */
        first:function () {
            return matchNode(this.get(), 'nextSibling', 'firstChild');
        },

        /**
         * 获取目标元素的最后一个元素节点
         */
        last:function () {
            return matchNode(this.get(), 'previousSibling', 'lastChild');
        },

        /**
         * 获取目标元素的下一个兄弟元素节点
         */
        next:function () {
            return matchNode(this.get(), 'nextSibling', 'nextSibling');
        },

        /**
         * 获取目标元素的上一个兄弟元素节点
         */
        prev:function () {
            return matchNode(this.get(), 'previousSibling', 'previousSibling');
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
                    if(isNumber && i == expression) return g(element);
                    else if(R && ((R[1] && R[2] == element.className) || R[2].toUpperCase() == element.tagName)) return g(element);
                i++;
            }
            return null;
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        down: function (expression) {
            var element = this.get();
            if (arguments.length == 0) return this.first();
            return J.isNumber(expression) ? new select('*', element).eq(expression) : new select(expression, element);
        },

        /**
         * 提交表单
         */
        submit: function(){
            this.get().submit();
        },

        eq:function (i) {
            i = i || 0;
            return g(this[ i === -1 ? this.length - 1 : i ]);
        },

        empty:function(){
            return this.html('');
        },

        length:0,
        splice:[].splice
    };

    J.mix(dom,{
        dom:dom,
        create:create,
        fn:fn,
        s:s,
        g:g
    });

    function getRealElement(element){
        return J.isString(element) ? dom(element) : element
    }

    function matchNode(element, direction, start) {
        for (var node = element[start]; node; node = node[direction]) {
            if (node.nodeType == 1) {
                return dom(node);
            }
        }
        return null;
    }

    function getWH(element) {
        var el = element.get();

        if(element.visible()){
            return { width:el.offsetWidth, height:el.offsetHeight }
        }

        var sty = el.style, stys, wh, ostys = {
            visibility:sty.visibility,
            position:sty.position,
            display:sty.display
        };

        stys = {
            visibility:'hidden',
            display:'block'
        };
        if (ostys.position !== 'fixed')
            stys.position = 'absolute';

        element.setStyle(stys);

        wh = {
            width:el.offsetWidth,
            height:el.offsetHeight
        };

        element.setStyle(ostys);

        return wh;
    }

    function create(tagName, attributes){
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
        if (J.sizzle) return J.merge(this, J.sizzle(selector, element));

        var match = selector ? selector.match(/^(\.)?(\w+)(\s(\w+))?/) : null, result = [], len, i, elements, node, tagName;
        element = element || D;
        // div       -> [  "div"  ,   undefined  ,   "div"  ,   undefined  ,   undefined  ]
        // .ttt      -> [  ".ttt"  ,   "."  ,   "ttt"  ,   undefined  ,   undefined  ]
        // .ttt span -> [  ".ttt span"  ,   "."  ,   "ttt"  ,   " span"  ,   "span"  ]
        if (match && match[1]) {
            // 初始化tagName参数
            tagName = match[4] ? match[4].toUpperCase() : '';
            // 查询元素
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

        return J.merge(this, result)

    }

    select.prototype = {
        each:function (callback) {
            var i = 0, length = this.length;
            for (; i < length;) {
                if (callback.call(this[ i ], i, g(this[ i++ ])) === false) {
                    break;
                }
            }
            return this;
        },
        eq:function (i) {
            var i = i || 0, elm = this[ i === -1 ? this.length - 1 : i ];
            if(!elm) throw('"'+this.selector+'" element does not exist.');
            return g(elm);
        },
        get:function(i) {
            return this.eq(i);
        },
        length:0,
        splice:[].splice
    };

    J.mix(J, {
        dom:dom,
        create:create,
        s:s,
        g:g
    });

})(J, window, document);