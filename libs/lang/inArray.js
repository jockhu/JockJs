/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/inArray.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/15
 *
 */



/// require('lang.lang');


/**
 * 判断是否出现在数组中
 *
 * @grammar J.inArray( item, array )
 *
 * @name J.lang.inArray
 * @param {Object | String | Int} item 要查找的对象
 * @param {Array} array 被查找的数组
 * @return {Int} 查找到的索引
 *
 */
J.inArray = J.lang.inArray = function( item, array ) {
    var i = 0, len;

    if ( array ) {
        len = array.length;

        for ( ; i < len; i++ ) {
            // Skip accessing in sparse arrays
            if ( i in array && array[ i ] === item ) {
                return i;
            }
        }
    }

    return -1;
};