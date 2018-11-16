
var Mock = require('mockjs');
let {Random} = Mock;

let data = Mock.mock({
    'arr|1-10':[{
        'id|+1':1
    }] 
})


module.exports = {
    [`GET /hello.json`]: (req, res) => {
       
        return res.json({
            id:1,
            name:Random.email()
        })

    },
    [`POST /api/getName`]: (req, res) => {
       
        return res.json({
            "data":[{
                "apprdate":"2016-01-22",
                "nodenum":"110000",
                "entname":"泰康人寿",
                "uniscid":"90000000000000",
                "estdate":"2018-01-01",
                "regstate_cn":"存续（在营、开业、在册）",
                "regorg":"110000",
                "regorg_cn":"北京西城监督管理局",
                "name":"张飒"
        
            }],
            "resinfo":{
                "code":"Z50000",
                "msg":"母公司信息查询成功"
            }
        })

    }
}
