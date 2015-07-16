# uxSys
用研展示系统

## 本地开发

- 修改config.js里的配置, 把domain改为你本地的IP或者127.0.0.1加上port
```JSON
    var config = {
        NODE_ENV:'dev',
        port:9999,
        passport: 'http://yhd.adanghome.com/passport',
        domain:'http://10.161.163.77:9999',
        backHash:'/admin'
    };
````
