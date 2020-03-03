const express = require('express');
const query = require('./mysql'); //自定义一个模块
// console.log(query);

const bodyParser = require('body-parser')
// 提取body请求体数据用到的中间件,需要配置参数才能使用
var urlencodeParser = bodyParser.urlencoded({
    extended: false
});
const Router = express.Router(); //路由设置  Router==app

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
//需求：查询详情页的某一个商品，是否在数据库
Router.get('/detail', async (req, res) => {
    let {
        username,
        types,
        id,
        size,
        color
    } = req.query;
    // console.log(req.query);
    
    let str = `SELECT * FROM cars WHERE uname='${username}' AND leixing='${types}' AND yuanid=${id} AND size='${size}' AND color='${color}'`;
    let data = await query(str);
   
    let result = {};
    if (data.length) {
        //数据库里面查找到购物车有这个商品
        result = {
            type: 1,
            msg: 'isHere'
        }
    } else {
        //数据库里面没有这个商品
        result = {
            type: 0,
            msg: 'notHere'
        }
    }

    res.send(result);

});

//修改
Router.patch('/patch', urlencodeParser, async (req, res) => {
    let = {
        carid,
        num,
        color,
        size
    } = req.body;

    if (carid) {
        let sql = `UPDATE cars SET num= ${num}, color='${color}', size='${size}' WHERE carid=${carid}`;

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
//需求：删除功能
Router.delete("/del", urlencodeParser, express.json(),async (req, res) => {
    let {
        carid
    } = req.query;
    console.log(carid);
    
    if (carid) {
        let sql = `DELETE FROM cars WHERE carid=${carid}`;

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
//需求：添加购物车订单功能
Router.post("/add", urlencodeParser, express.json(),async (req, res) => {
    let {
        uname,
        gimg,
        color,
        size,
        num,
        price,
        title,
        shopname,
        yuanid,
        leixing
    } = req.body;

    console.log(req.body);
    let str = `INSERT INTO cars (uname,gimg,color,size,num,price,carid,title,shopname,yuanid,leixing,ischecked) VALUES ('${uname}','${gimg}','${color}','${size}',${num},${price},null,'${title}','${shopname}',${yuanid},'${leixing}',0)`;
    let data = await query(str);
    // console.log(data);

    let result = {};
    if (data.length) {
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
        uname,
        color,
        size,
        num,
        yuanid,
        leixing
    } = req.body;

    // console.log(req.body);
    let str = `UPDATE cars SET num=${num} WHERE uname='${uname}' AND color='${color}' AND size='${size}' AND yuanid=${yuanid} AND leixing='${leixing}'  `;
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
//需求：查询某一个的用户购物车信息，并在前端页面的购物车渲染做增删改查
Router.get('/alllist', async (req, res) => {
    let { username } = req.query;
    let sql2 = `SELECT * FROM cars WHERE uname='${username}'`;
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