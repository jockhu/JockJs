/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/fire.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */



/**
 * 触发已经注册的事件。
 * @name J.event.fire
 * @function
 * @grammar J.fire(element, type, [,data [,bubble]])
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Object} data 需要传递的数据 ，通过 event.data 获取
 * @param {Boolean} bubble || true 是否冒泡
 *
 * @shortcut fire
 * @meta standard
 *
 * @returns {Event}
 */
J.fire = J.event.fire = function(element, type, data, bubble) {

    var event, E = J.event, DA = E.DA, LO = E.LO, D = document;

    element = typeof element === 'string' ? document.getElementById(element) : element.length ? element.get(0) : element;

    bubble = bubble || true;

    if (element == D && D.createEvent && !element.dispatchEvent)
        element = D.documentElement;


    if (D.createEvent) {
        event = D.createEvent('HTMLEvents');
        event.initEvent(DA, bubble, true);
    } else {
        event = D.createEventObject();
        event.eventType = bubble ? 'on'+DA : 'on'+LO;
    }

    event.eventName = type;
    event.data = data || { };

    if (D.createEvent)
        element.dispatchEvent(event); else
        element.fireEvent(event.eventType, event);

    return event;
};