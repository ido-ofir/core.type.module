# core.type.module

a simple module

```js
let core = new require('core.constructor')();
 
core.plugin(
   require('core.type.module')
);
 
// define an action using core.Action method
core.Component({
    name: 'someModule',
    dependencies: ['moduleA', 'moduleB'],
    get(moduleA, moduleB){
        return {
            doStuff(){ alert('did stuff'); }
        }
    }
});

// available on core.modules
core.modules.someModule.doStuff();

// can also be required
core.require(['someModule'], (someModule) => { ... })
```
