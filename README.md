# core.type.module

a simple module

```js
let core = new require('core.constructor')();
 
core.plugin(
   require('core.type.module')
);
 
// define an action using core.Action method
core.Module({
    name: 'someModule',
    dependencies: ['moduleA', 'moduleB'],
    get(moduleA, moduleB){
    
        // build and return your module here
        return {
            doStuff(){ alert('did stuff'); }
        }
    }
});


// can be required
core.require(['someModule'], (someModule) => { ... })


// once loaded, also available on core.modules
core.modules.someModule.doStuff();
```
