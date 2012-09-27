/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: number/random.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */

/// require('number.number');

/**
 * 生成随机整数，范围是[min, max]
 * @name J.number.randomInt
 * @function
 * @grammar J.number.randomInt(min, max)
 * 
 * @param 	{number} min 	随机整数的最小值
 * @param 	{number} max 	随机整数的最大值
 * @return 	{number} 		生成的随机整数
 */
J.number.random = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};
