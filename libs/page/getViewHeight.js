/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: page/getViewHeight.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */


/// require('page.page');

/**
 * 获取页面视觉区域高度
 * @name J.page.getViewHeight
 * @function
 * @grammar J.page.getViewHeight()
 * @see J.page.getViewWidth
 *             
 * @returns {number} 页面视觉区域高度
 */
J.page.getViewHeight = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientHeight;
};
