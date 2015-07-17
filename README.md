# uxSys
用研展示系统

## 本地开发

- 修改config.js里的配置, 
    -  把domain改为你本地的IP或者127.0.0.1加上port
    -  把NODE_ENV改为dev
```JSON
    var config = {
        NODE_ENV:'release',
        port:9999,
        passport: 'http://yhd.adanghome.com/passport',
        domain:'http://10.161.163.77:9999',
        backHash:'/admin'
    };
````
