/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: page/getViewWidth.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */

/// require('page.page');


/**
 * 获取页面视觉区域宽度
 * @name J.page.getViewWidth
 * @function
 * @grammar J.page.getViewWidth()
 * @see J.page.getViewHeight
 *             
 * @returns {number} 页面视觉区域宽度
 */
J.page.getViewWidth = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};
