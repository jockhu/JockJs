/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: page/getScrollTop.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */


/// require('page.page');

/**
 * 获取纵向滚动量
 * @name J.page.getScrollTop
 * @function
 * @grammar J.page.getScrollTop()
 * @see J.page.getScrollLeft
 *             
 * @returns {number} 纵向滚动量
 */
J.page.getScrollTop = function () {
    var d = document;
    return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
};
