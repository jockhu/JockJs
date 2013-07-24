/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/on.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');

/**
 * 为目标元素添加事件监听器
 * @name J.event.on
 * @function
 * @grammar J.on(element, type, handler [,data [,preventDefault [,stopPropagation]]])
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要添加的监听器
 * @param {Object} data 需要传递的数据 ，通过 event.data 获取
 * @param {Boolean} preventDefault 阻止事件默认行为
 * @param {Boolean} stopPropagation 停止事件冒泡
 *
 * @shortcut on
 * @meta standard
 * @see J.event.un
 *
 * @returns {HTMLElement|window} 目标元素
 */

J.on = J.event.on = function (element, type, handler, data, preventDefault, stopPropagation) {

    var E = J.event, a = E.CACHE, responder, isFire = type.indexOf(':') > -1, aD = 'addEventListener', aT = 'attachEvent', DA = E.DA, LO = E.LO;

    if( (element = E.g(element)).length == 0 ) return false;

    responder = E.fix(element, type, handler, data, preventDefault, stopPropagation);

    if (!E.MMES) type = E.fixName(type);

    if (element[aD])
        element[aD](isFire ? DA : type, responder, false); else {
        if (isFire) {
            element[aT]("on" + DA, responder);
            element[aT]("on" + LO, responder);
        } else element[aT]("on" + type, responder);
    }

    a.push({
        e:element,
        t:type,
        h:handler,
        r:responder
    });

    return element;
};
