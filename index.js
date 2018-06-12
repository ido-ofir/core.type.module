
module.exports = {
    name: 'core.type.module',
    dependecies: [
        'core.plugin.type',
        'core.loader.types',
    ],
    types: [
        {
            name: 'dependencies',
            extends: 'array',
            schema: [{
                key: 'itemsType',
                
            }]
        },{
            name: 'module',
            identifier: 'name',
            schema: [
                {
                    key: 'name',
                    type: 'string',
                    description: 'The name of the module.',
                    isRequired: true
                },{
                    key: 'dependencies',
                    type: 'array',
                    ofType: 'module',
                    description: `locally defined dependencies.`,
                    items: []
                },{
                    key: 'get',
                    type: 'function',
                    source: '() => {  }',
                    compiled: 'function(){  }'
                }
            ],
            build(definition, done) {

                var core = this;
                var {
                    name,
                    dependencies,
                    value,
                    get,
                } = definition;

                if ('value' in definition) {
                    core.injector.load(name, value);
                    done && done(value);
                    return value;
                } else if(!get){
                    throw new Error(`core.modules - a module must define either a 'value' property or a 'get' function.`)
                } else {
                    return core.injector.load(name, dependencies || [], function(){
                        value = get.apply(core, arguments);
                        core.modules[name] = value;
                        done && done(value);
                        return value;
                    });
                }
            }
        }
    ],
    extend: {
        modules: {},
        Module(name, dependencies, get, done) {
            if(Array.isArray(name)){
                return name.map(this.Module)
            }
            var definition = this.getDefinitionObject(name, dependencies, get, 'module', done);
            
            var source = this.type.toSource({
                id: definition.name,
                key: definition.name,
                type: 'module',
                description: definition.description || '',
              }, definition);
        
            return this.build(source, definition.done);
        },
    }
};