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

/**
 * @namespace J.dom
 */
(function (J, w, d, undefined) {

    function g(id) {
        return new elem(id);
    }
    function s(selector, element) {
        return new select(selector, element)
    }
    function elem(id) {
        if(id = ( id && id.nodeType ) ? id : document.getElementById(id)){
            this[0] = id;
            this.length = 1;
        }
        if ( id === "body" && d.body ) {
            this[0] = d.body;
            this.length = 1;
        }
        return this;
    }

    var fn = elem.prototype = {
        s:function (selector) {
            return new select(selector, (this[0].nodeType === 1) ? this[0] : d);
        },
        get:function(){
            return this[0]
        },
        length:0,
        splice:[].splice
    },
    T = 'getElementsByTagName', C = 'getElementsByClassName',
    dom = g;
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
        if(J.sizzle) return J.merge(this, J.sizzle(selector, element));

        var match = selector ? selector.match(/^(\.)?(\w+)(\s(\w+))?/) : null,
            result = [], trim = J.trim, len, i, elements, node, tagName;
        element = element || d;

        // div       -> [  "div"  ,   undefined  ,   "div"  ,   undefined  ,   undefined  ]
        // .ttt      -> [  ".ttt"  ,   "."  ,   "ttt"  ,   undefined  ,   undefined  ]
        // .ttt span -> [  ".ttt span"  ,   "."  ,   "ttt"  ,   " span"  ,   "span"  ]
        if(match && match[1]){
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
        }else{
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

})(J, window, document, undefined);