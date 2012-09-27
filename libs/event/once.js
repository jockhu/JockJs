/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/once.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');
/// require('event.on');
/// require('event.un');

/**
 * 为目标元素添加一次事件绑定
 * @name J.event.once
 * @function
 * @grammar J.once(element, type, handler)
 * @param {HTMLElement|string} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要添加的监听器
 * @see J.event.un,J.event.on
 *             
 * @returns {HTMLElement} 目标元素
 */
J.once = J.event.once = function(element, type, handler){
    function onceListener(event){
        handler.call(element,event);
        J.event.un(element, type, onceListener);
    } 
    J.event.on(element, type, onceListener);
    return element;
};
