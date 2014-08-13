/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @description DOM 测试用例
 * @author: Jock
 * @version: 1.0.0
 * @date: 2014/08/11
 *
 */


/**
 * APIs
 *
 * g: function() {}
 * show: function () {}
 * hide: function () {}
 * visible: function () {}
 * remove: function () {}
 * attr: function (key, value) {}
 * removeAttr: function (key) {}
 * addClass: function (className) {}
 * removeClass: function (className) {}
 * hasClass: function (className) {}
 * getStyle: function (style) {}
 * setStyle: function (styles) {}
 * getOpacity: function () {}
 * setOpacity: function (value) {}
 * append: function (element) {}
 * appendTo: function (element) {}
 * html: function (html) {}
 * val: function (value) {}
 * s: s(selector, element) {}
 * get: function (index) {}
 * width: function () {}
 * height: function () {}
 * offset: function () {}
 * insertAfter: function (element) {}
 * insertBefore: function (element) {}
 * insertFirst: function (element) {}
 * insertFirstTo: function (element) {}
 * insertLast: function (element) {}
 * first: function () {}
 * last: function () {}
 * next: function () {}
 * prev: function () {}
 * up: function (expression) {}
 * down: function (expression) {}
 * submit: function () {}
 * eq: function (i) {}
 * empty: function () {}
 */



/**
 * Test Case: fn.g()
 */
describe("g", function () {
    var elmID = 'div_g',
        el = document.createElement("div");
    el.id = elmID;
    el.style.display = "none";
    document.body.appendChild(el);
    var myEl = document.getElementById(elmID);

    it("通过ID查找元素", function () {
        expect(myEl).to.equal(J.g(elmID).get());
    });
    it("查找到一个元素", function () {
        expect(1).to.equal(J.g(elmID).length);
    });
});

/**
 * Test Case: fn.show()
 */
describe("show", function () {
    var elmID = 'div_show',
        el = document.createElement("div");
    el.id = elmID;
    el.style.display = "none";
    document.body.appendChild(el);

    it("当前的状态是 none ", function () {
        expect(el.style.display).to.equal('none');
    });
    it("设置元素显示", function () {
        J.g(elmID).show();
        expect(el.style.display).to.not.equal('none');
    });
    it("链式调用", function () {
        J.g(elmID).show().setStyle({color:'#ccc'});
        expect(el.style.color).to.equal("rgb(204, 204, 204)");
    });
});

/**
 * Test Case: fn.hide()
 */
describe("hide", function () {
    var elmID = 'div_hide',
        el = document.createElement("div");
    el.id = elmID;
    el.style.display = "block";
    document.body.appendChild(el);

    it("当前的状态是 block", function () {
        expect(el.style.display).to.equal('block');
    });
    it("设置元素隐藏", function () {
        J.g(elmID).hide();
        expect(el.style.display).to.equal('none');
    });
    it("链式调用", function () {
        J.g(elmID).hide().setStyle({color:'#ccc'});
        expect(el.style.color).to.equal("rgb(204, 204, 204)");
    });
});

/**
 * Test Case: fn.visible()
 */
describe("visible", function () {
    var elmID = 'div_visible',
        el = document.createElement("div");
    el.id = elmID;
    el.style.display = "block";
    document.body.appendChild(el);

    it("当前的状态是 block", function () {
        expect(el.style.display).to.equal('block');
    });
    it("当前元素是显示", function () {
        expect(true).to.equal(J.g(elmID).visible());
    });
});

/**
 * Test Case: fn.remove()
 */
describe("remove", function () {
    var elmID = 'div_remove',
        el = document.createElement("div");
    el.id = elmID;
    document.body.appendChild(el);

    it("移除指定的元素", function () {
        J.g(elmID).remove();
        expect(document.getElementById(elmID)).to.equal(null);
    });
    it("链式调用", function () {
        J.g(elmID).remove().setStyle({color:'red'});
        expect(el.style.color).to.equal(""); //因为元素已经不存在，所以为空
    });
});

/**
 * Test Case: fn.attr()
 */
describe("attr", function () {
    var elmID = 'div_attr',
        el = document.createElement("div");
    el.id = elmID;
    document.body.appendChild(el);

    it("设置属性", function () {
        J.g(elmID).attr('custom-attr','abc');
        expect(el.getAttribute('custom-attr')).to.equal('abc');
    });
    it("获取属性", function () {
        expect(J.g(elmID).attr('custom-attr')).to.equal('abc');
    });
    it("链式调用", function () {
        J.g(elmID).attr('last','lastvalue').setStyle({color:'#ccc'});
        expect(el.style.color).to.equal("rgb(204, 204, 204)");
    });
});

/**
 * Test Case: fn.removeAttr()
 */
describe("removeAttr", function () {
    var elmID = 'div_removeAttr',
        el = document.createElement("div");
    el.id = elmID;
    el.setAttribute('custom-attr','abc');
    document.body.appendChild(el);

    it("获取属性", function () {
        expect(J.g(elmID).attr('custom-attr')).to.equal('abc');
    });
    it("移除属性", function () {
        J.g(elmID).removeAttr('custom-attr');
        expect(J.g(elmID).attr('custom-attr')).to.not.equal('abc');
    });
    it("链式调用", function () {
        J.g(elmID).removeAttr('last').setStyle({color:'#ccc'});
        expect(el.style.color).to.equal("rgb(204, 204, 204)");
    });
});

/**
 * Test Case: fn.addClass()
 */
describe("addClass", function () {
    var elmID = 'div_addClass',
        el = document.createElement("div");
    el.id = elmID;
    document.body.appendChild(el);

    it("添加className", function () {
        J.g(elmID).addClass('abc');
        expect(el.className).to.equal('abc');
    });
    it("链式调用", function () {
        J.g(elmID).addClass('abc').setStyle({color:'#ccc'});
        expect(el.style.color).to.equal("rgb(204, 204, 204)");
    });
});

/**
 * Test Case: fn.removeClass()
 */
describe("removeClass", function () {
    var elmID = 'div_removeClass',
        el = document.createElement("div");
    el.id = elmID;
    el.className = 'abc';
    document.body.appendChild(el);

    it("删除className", function () {
        J.g(elmID).removeClass('abc');
        expect(el.className).to.not.equal('abc');
    });
    it("链式调用", function () {
        J.g(elmID).removeClass('abc').setStyle({color:'#ccc'});
        expect(el.style.color).to.equal("rgb(204, 204, 204)");
    });
});

/**
 * Test Case: fn.hasClass()
 */
describe("hasClass", function () {
    var elmID = 'div_hasClass',
        el = document.createElement("div");
    el.id = elmID;
    el.className = 'abc';
    document.body.appendChild(el);

    it("className 是否存在", function () {
        expect(J.g(elmID).hasClass('abc')).to.equal(true);
    });
});

/**
 * Test Case: fn.getStyle()
 */
describe("getStyle", function () {
    var elmID = 'div_getStyle',
        el = document.createElement("div");
    el.id = elmID;
    document.body.appendChild(el);

    it("获取元素样式信息", function () {
        J.g(elmID).setStyle({color:'#ccc'});
        expect(J.g(elmID).getStyle('color')).to.equal('rgb(204, 204, 204)');
    });
});

/**
 * Test Case: fn.setStyle()
 */
describe("setStyle", function () {
    var elmID = 'div_setStyle',
        el = document.createElement("div");
    el.id = elmID;
    document.body.appendChild(el);

    it("设置一个样式", function () {
        J.g(elmID).setStyle({color:'#ccc'});
        expect(J.g(elmID).getStyle('color')).to.equal('rgb(204, 204, 204)');
    });
    it("设置多个样式", function () {
        J.g(elmID).setStyle({color:'#ccc',background:'#f60'});
        expect(J.g(elmID).getStyle('color')).to.equal('rgb(204, 204, 204)');
        expect(J.g(elmID).getStyle('background')).to.equal('rgb(255, 102, 0)');
    });
    it("链式调用", function () {
        J.g(elmID).setStyle({background:'#f60'}).setStyle({color:'#ccc'});
        expect(el.style.color).to.equal("rgb(204, 204, 204)");
        expect(J.g(elmID).getStyle('background')).to.equal('rgb(255, 102, 0)');
    });
});

/**
 * Test Case: fn.getOpacity()
 */
describe("getOpacity", function () {
    var elmID = 'div_getOpacity',
        el = document.createElement("div");
    el.id = elmID;
    document.body.appendChild(el);

    it("获取不透明值", function () {
        J.g(elmID).setStyle({opacity:0.5});
        expect(J.g(elmID).getStyle('opacity')).to.equal(0.5);
    });
    it("链式调用", function () {
        J.g(elmID).setStyle({opacity:0.5}).setStyle({color:'#f60'});
        expect(J.g(elmID).getStyle('opacity')).to.equal(0.5);
    });
});

/**
 * Test Case: fn.setOpacity()
 */
describe("setOpacity", function () {
    var elmID = 'div_setOpacity',
        el = document.createElement("div");
    el.id = elmID;
    document.body.appendChild(el);

    it("设置不透明值", function () {
        J.g(elmID).setStyle({opacity:0.5});
        expect(J.g(elmID).getStyle('opacity')).to.equal(0.5);
    });
    it("链式调用", function () {
        J.g(elmID).setStyle({opacity:0.5}).setStyle({color:'#f60'});
        expect(J.g(elmID).getStyle('opacity')).to.equal(0.5);
    });
});

/**
 * Test Case: fn.append()
 */
describe("append", function () {
    var elmID = 'div_append',
        el = document.createElement("div");
    el.id = elmID;

    J.g(document.body).append(el);

    it("在body里append一个元素", function () {
        expect(J.g(elmID).up().get()).to.equal(document.body);
    });
    it("链式调用", function () {
        var subElm = document.createElement("div");
        J.g(document.body).append(subElm).show();
        expect(J.g(subElm).visible()).to.equal(true);
    });
});

/**
 * Test Case: fn.appendTo()
 */
describe("appendTo", function () {
    var elmID = 'div_appendTo';

    J.create('div', {id:elmID}).appendTo(document.body);

    it("一个元素 append 到 body里", function () {
        expect(J.g(elmID).up().get()).to.equal(document.body);
    });
    it("链式调用", function () {
        J.create('div',{id:elmID+'1'}).appendTo(document.body).show();
        expect(J.g(document.body).visible()).to.equal(true);
    });
});

/**
 * Test Case: fn.html()
 */
describe("html", function () {
    var elmID = 'div_html';
    J.create('div', {id:elmID}).html('abc').hide().appendTo(document.body);

    it("获取元素的innerHtml值", function () {
        expect(J.g(elmID).html()).to.equal('abc');
    });
    it("设置元素的innerHtml值", function () {
        expect(J.g(elmID).html('efg').html()).to.equal('efg');
    });
    it("链式调用", function () {
        expect(J.g(elmID).html('hlm').html()).to.equal('hlm');
    });
});

/**
 * Test Case: fn.val()
 */
describe("val", function () {
    var elmID = 'div_val';
    J.create('input', {id:elmID}).val('abc').hide().appendTo(document.body);

    it("获取元素的value值", function () {
        expect(J.g(elmID).val()).to.equal('abc');
    });
    it("设置元素的value值", function () {
        expect(J.g(elmID).val('efg').val()).to.equal('efg');
    });
    it("链式调用", function () {
        expect(J.g(elmID).val('efg').val()).to.equal('efg');
    });
});

/**
 * Test Case: fn.s()
 */
describe("s", function () {
    var elmID = 'div_s';
    J.create('div', {id:elmID,'class':'div_s'}).html('<span class="span_s"></span>').hide().appendTo(document.body);

    it("通过class查找元素", function () {
        expect(J.s('.div_s').length).to.equal(1);
    });
    it("通过tagName查找元素", function () {
        expect(J.s('div').length).to.ok;
    });
    it("通过class tagName 组合查找元素", function () {
        expect(J.s('.span_s span').length).to.ok;
    });
    it("链式调用", function () {
        expect(J.g(elmID).s('span').length).to.ok;
    });
});

/**
 * Test Case: fn.get()
 */
describe("get", function () {
    var elmID = 'div_get';
    J.create('div', {id:elmID}).hide().appendTo(document.body);

    it("获取原生html元素对象", function () {
        expect(J.g(elmID).get()).to.equal(document.getElementById(elmID));
    });
});

/**
 * Test Case: fn.width()
 */
describe("width", function () {
    var elmID = 'div_width';
    J.create('div', {id:elmID}).setStyle('background:#000').appendTo(document.body);

    it("获取元素对象的宽度", function () {
        expect(J.g(elmID).width()).to.equal(document.getElementById(elmID));
    });
});