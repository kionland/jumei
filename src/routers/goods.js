const express = require('express');
const query = require('./mysql'); //自定义一个模块
// console.log(query);
const Router = express.Router(); //路由设置  Router==app
const bodyParser = require('body-parser');
// 提取body请求体数据用到的中间件,需要配置参数才能使用
var urlencodeParser = bodyParser.urlencoded({
    extended: false
});

//男士购
//查询所有
Router.get('/all', urlencodeParser, async (req, res) => {
    let {
        type1,
        page,
        num
    } = req.query;
    // console.log(page);
    // console.log(num);

    page = page || 1; //设置默认值
    num = num || 6; //设置默认值
    let index = (page - 1) * num;
    let str = `SELECT * FROM ${type1} LIMIT ${index},${num}`;
    let data = await query(str);
    // console.log(data);
    let sql2 = `SELECT * FROM ${type1}`;
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
//查询某个商品
Router.get('/alls-product', urlencodeParser, async (req, res) => {
    let {
        id,
        types1
    } = req.query;
    // console.log(type1);

    let str = `SELECT * FROM ${types1} where id=${id} `;
    let data = await query(str);
    let result = {};
    if (data.length) {
        //成功返回的数据
        result = {
            type: 1,
            msg: 'success',
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
//查询所有商品
Router.get('/alls', urlencodeParser, async (req, res) => {
    let {
        type1
    } = req.query;
    // console.log(type1);

    let str = `SELECT * FROM ${type1} `;
    let data = await query(str);
    let result = {};
    if (data.length) {
        //成功返回的数据
        result = {
            type: 1,
            msg: 'success',
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
//查询所有paixu
Router.get('/allspaixu', urlencodeParser, async (req, res) => {
    let {
        type1,
        leixing,
        guanjianzi
    } = req.query;
    // console.log(leixing);
    // console.log(guanjianzi);

    leixing = leixing || "id"; //设置默认值
    guanjianzi = guanjianzi || "ASC"; //设置默认值
    let str = `SELECT * FROM ${type1} ORDER BY ${leixing} ${guanjianzi}`;
    let data = await query(str);
    // console.log(data);
    // let sql2 = `SELECT * FROM ${type1}`;
    // let data2 = await query(sql2);

    let result = {};
    if (data.length) {
        //成功返回的数据
        result = {
            type: 1,
            msg: 'success',
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
//需求：删除功能
Router.delete("/del", urlencodeParser, async (req, res) => {
    let {
        type1,
        id
    } = req.body;
    if (id) {
        let sql = `DELETE FROM ${type1} WHERE id=${id}`;

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
        res.send("请填写全部数据");
    }
});

//修改
Router.patch('/patch', urlencodeParser, async (req, res) => {
    let = {
        type1,
        id,
        title,
        price,
        mprice,
        color,
        size

    } = req.body;

    if (id) {
        let sql = `UPDATE ${type1} SET title= '${title}', price=${price}, mprice=${mprice}, color='${color}', size='${size}' WHERE id=${id}`;

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

//新增男士购商品功能
Router.post('/reg', urlencodeParser, async (req, res) => {
    let {
        type1,
        title,
        bimg,
        simg,
        price,
        mprice,
        color,
        size,
        shopname
    } = req.body; //解构
    if (title && bimg && simg && price && mprice && color && size && shopname) {
        let sql = `INSERT INTO ${type1}(id,title,bimg,simg,price,mprice,color,size,shopname) VALUES
        (null,'${title}','${bimg}','${simg}',${price},${mprice},'${color}','${size}','${shopname}')`;
        let data = await query(sql);
        let result = {};
        if (data.affectedRows) {
            //插入成功
            result = {
                type: 1,
                msg: '新增成功'
            }
        } else {
            result = {
                type: 0,
                msg: '新增失败'
            }
        }
        res.send(result);
    } else {
        res.send('请填写全部数据')
    }

})


//新增-聚美优品-首页-今日10点上新-列表功能
Router.post('/addlist', urlencodeParser, express.json(),async (req, res) => {
    let {
        buyNum, imgSrc, groupPrice, jumeiPrice, title
    } = req.body; //解构
    if (buyNum && imgSrc && groupPrice && jumeiPrice && title) {
        let sql = `INSERT INTO group_list_next(list_id,buyNum, imgSrc,groupPrice,jumeiPrice,title) VALUES (NULL,'${buyNum}','${imgSrc}','${groupPrice}','${jumeiPrice}','${title}')`;
        let data = await query(sql);
        let result = {};
        if (data.affectedRows) {
            //插入成功
            result = {
                type: 1,
                msg: '新增成功'
            }
        } else {
            result = {
                type: 0,
                msg: '新增失败'
            }
        }
        res.send(result);
    } else {
        res.send('请填写全部数据')
    }

})
//聚美优品-查询-首页-今天10点上新-列表数据
//查询所有
Router.get('/jumei_all', urlencodeParser, async (req, res) => {
    let {
        table
    } = req.query;
  
    let sql = `SELECT * FROM ${table} LIMIT 0,50`;
    let data = await query(sql);

    let result = {};
    if (data.length) {
        //成功返回的数据
        result = {
            type: 1,
            msg: 'success',
            data
        }
    } else {
        //失败返回的数据
        result = {
            type: 0,
            msg: 'fail',
            data: []
        }
    }

    res.send(result);

});

module.exports = Router;