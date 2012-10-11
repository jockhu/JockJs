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
/// require('ua.ie');
/// require('string.trim');

/**
 * @namespace J.dom
 */
(function (J, D, U) {

    function g(id) {
        return new elem(id);
    }

    function s(selector, element) {
        return new select(selector, element)
    }

    function elem(id) {
        if (id = ( id && id.nodeType ) ? id : D.getElementById(id)) {
            this[0] = id;
            this.length = 1;
        }
        if (id === "body" && D.body) {
            this[0] = D.body;
            this.length = 1;
        }
        return this;
    }

    var T = 'getElementsByTagName', C = 'getElementsByClassName', dom = g, float = 'float', cssFloat = 'cssFloat', opacity = 'opacity',

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
            if (value === U)  return element.checked ? element.value : null;
            else element.checked = !!value;
        }

        function valueSelector(element, value) {
            if (value === U) return element.value; else element.value = value;
        }

        function select(element, value) {
            if (value === U)
                return selectOne(element);
        }

        function selectOne(element) {
            var index = element.selectedIndex;
            return index >= 0 ? optionValue(element.options[index]) : null;
        }

        function optionValue(opt) {
            return (opt['value'] !== U) ? opt.value : opt.text;
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
            element.parentNode.removeChild(element);
            return this
        },

        attr:function (key, value) {
            var element = this.get();
            if ('style' === key) {
                if (value === U) return element.style.cssText; else element.style.cssText = value;
                return this;
            }
            key = Fix_ATTS[key] || key;
            if (value === U) return element.getAttribute(key); else {
                if (typeof value === 'string') element.setAttribute(key, value); else {
                    for (var key in value) {
                        this.attr(key, value[key]);
                    }
                }
                return this
            }
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

        getStyle: function(style) {
            var element = this.get();
            style = style == float ? cssFloat : style;
            var value = element.style[style];
            if (!value || value == 'auto') {
                var css = document.defaultView.getComputedStyle(element, null);
                value = css ? css[style] : null;
            }
            if (style == opacity) return value ? parseFloat(value) : 1.0;
            return value == 'auto' ? null : value;
        },

        setStyle: function(styles) {
            var element = this.get(), elementStyle = element.style, match;
            if ("string" === typeof styles) {
                element.style.cssText += ';' + styles;
                styles.indexOf(opacity) > 0 && element.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]);
            }
            for (var property in styles)
                if (property == opacity) element.setOpacity(styles[property]);
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
            (typeof element === 'string' ? dom(element) : element).append(this.get());
            return this;
        },

        html:function(html){
            var self = this.get();
            if(html){
                self.innerHTML = html;
                return this;
            }
            return self.innerHTML;
        },

        val:function(value){
            var element = this.get(), V = valFix[element.tagName.toLowerCase() || element.type];
            V = V ? V (element, value) : null;
            return (value === U) ? V : this;
        },

        s:function (selector) {
            return new select(selector, (this[0].nodeType === 1) ? this[0] : D);
        },
        get:function (index) {
            return this[index || 0]
        },
        length:0,
        splice:[].splice
    };
    dom.fn = fn;
    dom.s = s;

    /**
     * class 选择器查询
     * @param selector '.className' | 'tagName' | '.className tagName'
     * @param element content | null
     * @return []
     */
    function select(selector, element) {

        // J.sizzle
        if (J.sizzle) return J.merge(this, J.sizzle(selector, element));

        var match = selector ? selector.match(/^(\.)?(\w+)(\s(\w+))?/) : null, result = [], trim = J.trim, len, i, elements, node, tagName, gC;
        element = element || D;
        // div       -> [  "div"  ,   undefined  ,   "div"  ,   undefined  ,   undefined  ]
        // .ttt      -> [  ".ttt"  ,   "."  ,   "ttt"  ,   undefined  ,   undefined  ]
        // .ttt span -> [  ".ttt span"  ,   "."  ,   "ttt"  ,   " span"  ,   "span"  ]
        if (match && match[1]) {
            // 初始化tagName参数
            tagName = match[4] ? match[4].toUpperCase() : '';
            // 查询元素
            if (gC = element[C]) {
                elements = gC(match[2]);
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
        },
        eq:function (i) {
            i = i || 0;
            return g(this[ i === -1 ? this.length - 1 : i ]);
        },
        length:0,
        splice:[].splice
    };

    J.mix(J, {
        dom:dom,
        s:s,
        g:g
    });

})(J, document, undefined);