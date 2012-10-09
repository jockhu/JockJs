/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: dom/normal.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/27
 *
 */



/// require('dom.dom');
/// require('ua.ie');
/// require('string.trim');

(function(dom, document){

    var Fix_ATTS = (function(){
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
        float = 'float', cssFloat = 'cssFloat', opacity = 'opacity';

    J.mix(dom,{
        create:function(tagName, attributes){
            var el = document.createElement(tagName),attributes = attributes || {};
            return dom(el).setAttrs(attributes);
        },
        normal:{}
    });

    J.mix(dom.fn,{
        show:function () {
            this.get().style.display = '';
            return this
        },

        hide:function () {
            this.get().style.display = 'none';
            return this
        },

        getAttr:function(key){
            var element = this.get();
            if ('style' === key){
                return element.style.cssText;
            }
            key = Fix_ATTS[key] || key;
            return element.getAttribute(key);
        },

        setAttr:function (key, value) {
            var element = this.get();
            if ('style' === key){
                element.style.cssText = value;
            } else {
                key = Fix_ATTS[key] || key;
                element.setAttribute(key, value);
            }
            return this;
        },

        setAttrs:function (attributes) {
            for (var key in attributes) {
                this.setAttr(key, attributes[key]);
            }
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
        }
    });

    function matchNode(element, direction, start) {
        for (var node = element[start]; node; node = node[direction]) {
            if (node.nodeType == 1) {
                return dom(node);
            }
        }
        return null;
    }

})(J.dom, document);