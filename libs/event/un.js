/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/un.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');


/**
 * 为目标元素移除事件监听器
 * @name J.event.un
 * @function
 * @grammar J.un(element, type, handler)
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要移除的监听器
 *
 * @shortcut un
 * @meta standard
 * @see J.event.on
 *
 * @returns {HTMLElement|window} 目标元素
 */

J.un = J.event.un = function (element, type, handler) {
    element = 'string' === J.type(element) ? document.getElementById(element) : element.length ? element.get(0) : element;

    var E = J.event, a = E.CACHE,  DA = E.DA, LO = E.LO, l = a.length, e, elmAll = !type, typeAll = !handler, isFire , rE = 'removeEventListener', dT = 'detachEvent';

    if (!E.MMES && !type) {
        type = E.fixName(type);
    }

    while (l--) {
        e = a[l];
        if (e.e == element && (elmAll || e.t == type) && (typeAll || e.h == handler)) {
            isFire = e.t.indexOf(':') > -1;
            if (element[rE])
                element[rE](isFire ? DA : (type || e.t), e.r, false); else {
                if (isFire) {
                    element[dT]("on"+DA, e.r);
                    element[dT]("on"+LO, e.r);
                } else element[dT]("on" + (type || e.t), e.r);
            }
            a.splice(l, 1);
        }

    }

    return element;

};