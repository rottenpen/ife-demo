function Observer(data) {
    this.data = data;
    this.walk(data)
}

let p = Observer.prototype;

p.walk = function(obj) {
    let val;
    for (let key in obj) {

        if (obj.hasOwnProperty(key)) {
            val = obj[key];

            if (typeof val === 'object') {
                new Observer(val);
            }

            this.convert(key, val);
        }
    }
};

p.convert = function(key, val) {
    Object.defineProperty(this.data, key, { //第一个参数:目标对象 第二个参数:需要定义的属性或方法的名字 第三个参数:目标属性所拥有的特性。（descriptor）
        enumerable: true, //默认false 属性可以用for...in枚举
        configurable: true, //默认false 属性描述符的类型可能被改变，并且可以从当前对象中删除
        get: function() {
            console.log('你访问了' + key);
            return val
        },
        set: function(newVal) {
            console.log('你设置了' + key);
            console.log('新的' + key + ' = ' + newVal)
            if (newVal === val) return;
            val = newVal
        }
    })
};

let app1 = new Observer({
    name: 'youngwind',
    age: 25
});

let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});
// // 要实现的结果如下：
// app1.data.name // 你访问了 name
// app.data.age = 100; // 你设置了 age，新的值为100
// app2.data.university // 你访问了 university
// app2.data.major = 'science' // 你设置了 major，新的值为 science