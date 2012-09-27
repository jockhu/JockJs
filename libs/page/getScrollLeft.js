/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: page/getScrollLeft.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */


/// require('page.page');


/**
 * 获取横向滚动量
 * 
 * @return {number} 横向滚动量
 */
J.page.getScrollLeft = function () {
    var d = document;
    return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
};
