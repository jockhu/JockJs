/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/getPageX.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/31
 *
 */


/**
 * 获取鼠标事件的鼠标x坐标
 * @name J.event.getPageX
 * @function
 * @grammar J.event.getPageX(event)
 * @param {Event} event 事件对象
 *
 * @returns {number} 鼠标事件的鼠标x坐标
 */
J.event.getPageX = function (event) {
    var doc = document, docEl = doc.documentElement,  body = doc.body || { scrollLeft:0 };
    return event.pageX || (event.clientX + (docEl.scrollLeft || body.scrollLeft) - (docEl.clientLeft || 0));
};
