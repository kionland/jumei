const express = require('express');
const query = require('./mysql'); //自定义一个模块
// console.log(query);

const bodyParser = require('body-parser')
// 提取body请求体数据用到的中间件,需要配置参数才能使用
var urlencodeParser = bodyParser.urlencoded({
    extended: false
});
const Router = express.Router(); //路由设置  Router==app

//请勿使用SQL的关键字，比如name，table等，如果发现错误，不能查询或提示查询语句有问题，留意是否使用了SQL的关键字
//需求：查询所有的用户信息
Router.get('/all', async (req, res) => {
    let {
        page,
        num
    } = req.query;
    // console.log(page, num);

    page = page || 1; //设置默认值
    num = num || 15; //设置默认值
    let index = (page - 1) * num;
    let str = `SELECT * FROM cars LIMIT ${index},${num}`;
    let data = await query(str);
    // console.log(data);
    let sql2 = 'SELECT * FROM cars';
    let data2 = await query(sql2);

    let result = {};
    if (data.length) {
        //成功返回的数据
        let pages = Math.ceil(data2.length / num);
        result = {
            type: 1,
            msg: 'success',
            page,
            num,
            pages,
            datalist: data
        }
    } else {
        //失败返回的数据
        result = {
            type: 0,
            msg: 'fail',
            datalist: []
        }
    }

    res.send(result);

});
//需求：查询-聚美优品-详情页的某一个商品，是否在数据库
Router.get('/detail', async (req, res) => {
    let {
        phone,table,list_id
    } = req.query;
    // console.log(req.query);
    
    let str = "SELECT * FROM`cart_list` WHERE `phone` = '" + phone + "' AND `table_list` ='" + table + "' AND `list_id` = " + list_id +"";
    let data = await query(str);
//    console.log(data[0].buyNum);
   
    let result = {};
    if (data.length) {
        //数据库里面查找到购物车有这个商品
        result = {
            type: 1,
            msg: 'isHere',
            buyNum: data[0].buyNum
        }
    } else {
        //数据库里面没有这个商品
        result = {
            type: 0,
            msg: 'notHere',
            buyNum: 1
        }
    }
    res.send(result);
});

//修改-聚美优品-编辑购物车购买数量的开关
Router.patch('/editBuyNum', urlencodeParser, express.json(),async (req, res) => {
    let = {
        cart_id, phone, editBuyNum
    } = req.body;

    if (cart_id && phone ) {
        let sql = `UPDATE cart_list SET editBuyNum= ${editBuyNum} WHERE phone='${phone}' AND cart_id=${cart_id}`;

        let data = await query(sql);

        let result = {};
        if (data.affectedRows) {
            result = {
                type: 1,
                msg: "修改成功"
            }
        } else {
            //插入数据库失败
            result = {
                type: 0,
                msg: "修改失败"
            }
        }
        res.send(result);

    } else {
        res.send("请填写全部数据");
    }



});
//修改-聚美优品-编辑购物车勾选商品的开关
Router.patch('/changeChecked', urlencodeParser, express.json(),async (req, res) => {
    let = {
        cart_id, phone, checked
    } = req.body;

    if (cart_id && phone ) {
        let sql = `UPDATE cart_list SET checked=${checked} WHERE phone='${phone}' AND cart_id=${cart_id}`;

        let data = await query(sql);

        let result = {};
        if (data.affectedRows) {
            result = {
                type: 1,
                msg: "修改成功"
            }
        } else {
            //插入数据库失败
            result = {
                type: 0,
                msg: "修改失败"
            }
        }
        res.send(result);

    } else {
        res.send("请填写全部数据");
    }



});
//修改-聚美优品-编辑购物车单一个商品的购买数量
Router.patch('/changeBuyNum', urlencodeParser, express.json(),async (req, res) => {
    let = {
        cart_id, phone, buyNum
    } = req.body;

    if (cart_id && phone ) {
        let sql = `UPDATE cart_list SET buyNum=${buyNum} WHERE phone='${phone}' AND cart_id=${cart_id}`;

        let data = await query(sql);

        let result = {};
        if (data.affectedRows) {
            result = {
                type: 1,
                msg: "修改成功"
            }
        } else {
            //插入数据库失败
            result = {
                type: 0,
                msg: "修改失败"
            }
        }
        res.send(result);

    } else {
        res.send("请填写全部数据");
    }



});
//需求：删除-聚美优品-购物车单一个商品的功能
Router.delete("/del", urlencodeParser, express.json(),async (req, res) => {
    let {
        cart_id
    } = req.query;
    // console.log(cart_id);
    
    if (cart_id) {
        let sql = `DELETE FROM cart_list WHERE cart_id=${cart_id} `;

        let data = await query(sql);

        let result = {};

        if (data.affectedRows) {
            result = {
                type: 1,
                msg: "删除成功"
            }
        } else {
            //插入数据库失败
            result = {
                type: 0,
                msg: "删除失败"
            }
        }
        res.send(result);
    } else {
        res.send("请填写全部数据!");
    }
})
//需求：添加-聚美优品-到购物车-订单功能
Router.post("/add", urlencodeParser, express.json(),async (req, res) => {
    let {
        imgSrc, title, jumeiPrice, buyNum, phone, table, list_id 
    } = req.body;
    // console.log(req.body);
    
    let str = "INSERT INTO `cart_list`(`cart_id`, `imgSrc`, `title`, `jumeiPrice`, `buyNum`, `checked`, `phone`, `table_list`, `list_id`,`editBuyNum`) VALUES(null, '" + imgSrc + "', '" + title + "', '" + jumeiPrice + "'," + buyNum + ", " + 0 + ", '" + phone + "', '" + table + "', " + list_id + ", " + 0 + ")"
    let data = await query(str);
    // console.log(data);

    let result = {};
    if (data.affectedRows) {
        result = {
            type: 1,
            msg: 'success'
        }
    } else {
        result = {
            type: 0,
            msg: 'fail'
        }
    }
    res.send(result);
})
//需求：添加地址功能
Router.post("/adress", urlencodeParser, express.json(),async (req, res) => {
    let  {
        username,
        name,
        phone,
        shengshiqu,
        jutidizhi
    } = req.body;

    // console.log(req.body);
    let str = `INSERT INTO address (username,name,phone,shengshiqu,jutidizhi) VALUES ('${username}','${name}',${phone},'${shengshiqu}','${jutidizhi}')`;
    let data = await query(str);
    // console.log(data);

    let result = {};
    if (data.affectedRows) {
        //数据库里面查找到购物车有这个商品
        result = {
            type: 1,
            msg: 'success'
        }
    } else {
        //数据库里面没有这个商品
        result = {
            type: 0,
            msg: 'fail'
        }
    }

    res.send(result);
})
//需求：修改地址功能
Router.put("/putAdress", urlencodeParser, express.json(),async (req, res) => {
    let  {
        uid,
        name,
        phone,
        shengshiqu,
        jutidizhi
    } = req.body;

    // console.log(req.body);
    let str = `UPDATE address SET name='${name}',phone=${phone},shengshiqu='${shengshiqu}',jutidizhi='${jutidizhi}' WHERE uid=${uid}`;
    let data = await query(str);
    // console.log(data);

    let result = {};
    if (data.affectedRows) {
        //数据库里面查找到购物车有这个商品
        result = {
            type: 1,
            msg: 'success'
        }
    } else {
        //数据库里面没有这个商品
        result = {
            type: 0,
            msg: 'fail'
        }
    }

    res.send(result);
})
//需求：修改购物车订单功能
Router.put("/edit", urlencodeParser, express.json(),async (req, res) => {
    let {
        phone, table, list_id,buyNum
    } = req.body;

    // console.log(req.body);
    let str = `UPDATE cart_list SET buyNum=${buyNum} WHERE phone='${phone}' AND table_list='${table}' AND list_id='${list_id}' `;
    // let str = `UPDATE cars SET num=9 AND ischecked=1 AND shopchecked=1 WHERE uname='aaaaaa' AND yuanid=3 AND leixing='shoes' AND size='XL' AND color='黑色'`;
    let data = await query(str);
    // console.log(data);

    let result = {};
    if (data.affectedRows) {
        //数据库里面查找到购物车有这个商品
        result = {
            type: 1,
            msg: 'success'
        }
    } else {
        //数据库里面没有这个商品
        result = {
            type: 0,
            msg: 'fail'
        }
    }

    res.send(result);
})
//需求：查询-聚美优品-某一个的用户购物车信息，并在前端页面的购物车渲染做增删改查
Router.get('/cartlist', async (req, res) => {
    let { phone } = req.query;
    let sql2 = `SELECT * FROM cart_list WHERE phone='${phone}'`;
    let data2 = await query(sql2);

    let result = {};
    if (data2.length) {
        //成功返回的数据
        result = {
            type: 1,
            msg: 'success',

            datalist: data2
        }
    } else {
        //失败返回的数据
        result = {
            type: 0,
            msg: 'fail',
            datalist: []
        }
    }
    res.send(result);
});



module.exports = Router;