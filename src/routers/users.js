const express = require('express');

const query = require('./mysql'); //自定义一个模块
// console.log(query);

const bodyParser = require('body-parser')
// 提取body请求体数据用到的中间件,需要配置参数才能使用
var urlencodeParser = bodyParser.urlencoded({
    extended: false
});
const Router = express.Router(); //路由设置  Router==app

const { create, verify } = require('./token');
/*
    用户管理：
        * 验证用户名是否存在 完成
        * 注册 完成
        * 登陆
        * 修改密码
        * 删除xx用户
        * 清空用户
        * 数据渲染 分页 完成
*/

// 验证-聚美优品-用户是否存在
Router.get('/checkname', async (req, res) => {
    //接受前端数据
    let {
        phone
    } = req.query;
    // console.log(username);
    //做数据库查询
    if (phone) {
        let sql = `SELECT * FROM user_list WHERE phone='${phone}'`;
        let data = await query(sql);
        let result = {};
        if (data.length) { // '0' 真  0 假
            //查找到了，不给注册
            result = {
                type: 0,
                msg: '不能注册'
            }
        } else {
            //可以注册
            result = {
                type: 1,
                msg: '可以注册'
            }
        }
        res.send(result); //无论失败与成功都需要响应给客户端
    } else {
        res.send('数据不能为空');

    }

});
// 验证用户的 所有 收货地址 是否存在
Router.get('/adress', async (req, res) => {
    //接受前端数据
    let {
        username
    } = req.query;
    // console.log(username);
    //做数据库查询
    if (username) {
        let sql = `SELECT * FROM address WHERE username='${username}'`;
        let data = await query(sql);
        let result = {};
        if (data.length) { // '0' 真  0 假
            //查找到了，不给注册
            result = {
                type: 0,
                msg: '查找成功',
                list:data
            }
        } else {
            //可以注册
            result = {
                type: 1,
                msg: '查找失败',
                list:[]
            }
        }
        res.send(result); //无论失败与成功都需要响应给客户端
    } else {
        res.send('数据不能为空');

    }

});
// 验证用户的 某一个 收货地址 是否存在
Router.get('/oneAdress', async (req, res) => {
    //接受前端数据
    let {
        uid
    } = req.query;
    console.log(uid);
    //做数据库查询
    if (uid) {
        let sql = `SELECT * FROM address WHERE uid='${uid}'`;
        let data = await query(sql);
        let result = {};
        console.log(data);
        if (data.length) { // '0' 真  0 假
            //查找到了，不给注册
            result = {
                type: 1,
                msg: '查找成功'
            }
        } else {
            //可以注册
            result = {
                type: 0,
                msg: '查找失败'
            }
        }
        res.send(result); //无论失败与成功都需要响应给客户端
    } else {
        res.send('数据不能为空');

    }

});

//-聚美优品-注册功能
Router.post('/reg', urlencodeParser, express.json(), async (req, res) => {
    let {
        password,
        phone
    } = req.body; //解构
    // console.log(req.body);
    
    if ( password && phone) {
        let sql = `INSERT INTO user_list(user_id,phone,password) VALUES(null,"${phone}",'${password}')`;
        let data = await query(sql);
        let result = {};
        if (data.affectedRows) {
            //插入成功
            result = {
                type: 1,
                msg: '注册成功'
            }
        } else {
            result = {
                type: 0,
                msg: '注册失败'
            }
        }
        res.send(result);
    } else {
        res.send('请填写全部数据')
    }

})

//需求：查询所有的用户信息
Router.get('/all', async (req, res) => {
    let {
        page,
        num
    } = req.query;
    page = page || 1; //设置默认值
    num = num || 5; //设置默认值
    let index = (page - 1) * num;
    let str = `SELECT * FROM userlist LIMIT ${index},${num}`;
    let data = await query(str);
    // console.log(data);
    let sql2 = 'SELECT * FROM userlist';
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

})

//需求：删除用户功能
Router.delete("/del", urlencodeParser, async (req, res) => {
    let {
        userid
    } = req.body;
    if (userid) {
        let sql = `DELETE FROM userlist WHERE userid=${userid}`;

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
})
//需求：删除地址功能
Router.delete("/delAdr", urlencodeParser, express.json(),  async (req, res) => {
    let {
        uid
    } = req.query;
    console.log(uid);
    
    if (uid) {
        let sql = `DELETE FROM address WHERE uid=${uid}`;

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
})
//修改
Router.patch('/patch', urlencodeParser, async (req, res) => {
    let = {
        userid,
        password,
        phone
    } = req.body;
    
    if (userid) {
        let sql = `UPDATE userlist SET password= ${password}, phone=${phone} WHERE userid=${userid}`;

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



})


//需求：-聚美优品-登陆功能
Router.get('/login', async (req, res) => {
    //接收前端数据
    // console.log(req);
    let { phone, password, keep } = req.query;
    if (phone && password) {
        let sql = `SELECT * FROM user_list WHERE phone = '${phone}' and password='${password}'`;
        let data = await query(sql);
        let result = {};
        if (data.length) { // '0' 真  0 假
            //查找到了，可以登陆
            let token = '';
            if (keep == 'true') {// 'true' 'false'
                //需求：7天免登陆，生成token发给你
                //生成token
                token = create(password);
                // console.log(token);
            }
            result = {
                type: 1,
                msg: '登陆成功',
                token
            }
        } else {
            
            result = {
                type: 0,
                msg: '登陆失败',
                token: ''
            }
        }
        res.send(result);//无论失败与成功都需要响应给客户端
    } else {
        res.send('数据不能为空');
    }

});


//需要：校验token:1.是否被串改  2.是否在有效期
Router.get('/verify', (req, res) => {
    let { token } = req.query;
    let result = verify(token);
    let data = {};
    if (result) {
        data = {
            type: 1,
            msg: '校验通过'
        }
    } else {
        data = {
            type: 0,
            msg: '校验失败'
        }
    }
    res.send(data);
});
module.exports = Router;