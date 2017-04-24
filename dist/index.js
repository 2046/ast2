'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _esprima = require('esprima');

var _esprima2 = _interopRequireDefault(_esprima);

var _escodegen = require('escodegen');

var _escodegen2 = _interopRequireDefault(_escodegen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// syntax see more https://esprima.readthedocs.io/en/latest/getting-started.html and https://github.com/estools/escodegen/wiki/API
let ast = {
    parse(...args) {
        return _esprima2.default.parse(...args);
    },
    tokenize(...args) {
        return _esprima2.default.tokenize(...args);
    },
    generate(ast, options = {}) {
        return _escodegen2.default.generate(ast, Object.assign({}, {
            comment: true
        }, options));
    },
    program(body = [], sourceType = 'script', config) {
        return Object.assign({}, {
            body,
            sourceType,
            type: 'Program'
        }, config);
    },
    super() {
        return {
            type: 'Super'
        };
    },
    literal(value = '') {
        return {
            value,
            type: 'Literal'
        };
    },
    identifier(name) {
        return {
            name,
            type: 'Identifier'
        };
    },
    property(key, value, kind = 'init', config) {
        return Object.assign({}, {
            key,
            value,
            kind,
            type: 'Property'
        }, config);
    },
    template(quasis = [], expressions = []) {
        quasis = quasis.map((item, index) => {
            return {
                value: {
                    raw: item.name,
                    cooked: item.name
                },
                type: 'TemplateElement',
                tail: !(index === quasis.length - 1)
            };
        });

        return {
            quasis,
            expressions,
            type: 'TemplateLiteral'
        };
    },
    spread(argument) {
        return {
            argument,
            type: 'SpreadElement'
        };
    },
    comments(value) {
        return {
            'leadingComments': value
        };
    },
    commentsLine(value) {
        return {
            type: 'Line',
            value: ` ${value}`
        };
    },
    commentsBlock(value) {
        return {
            value,
            type: 'Block'
        };
    },
    classMethod(key = null, value = null, config) {
        let kind = 'method';

        if (key && key.name === 'constructor') {
            kind = 'constructor';
        }

        return Object.assign({}, {
            key,
            kind,
            value,
            type: 'MethodDefinition'
        }, config);
    },
    patterns: {
        array(elements = []) {
            return {
                elements,
                type: 'ArrayPattern'
            };
        },
        object(properties = []) {
            return {
                properties,
                type: 'ObjectPattern'
            };
        },
        assignment(left, right) {
            return {
                left,
                right,
                type: 'AssignmentPattern'
            };
        }
    },
    expressions: {
        this() {
            return {
                type: 'ThisExpression'
            };
        },
        array(elements = []) {
            return {
                elements,
                type: 'ArrayExpression'
            };
        },
        object(properties = []) {
            return {
                properties,
                type: 'ObjectExpression'
            };
        },
        function(id = null, params = [], body = ast.statements.block(), config = {}) {
            return Object.assign({}, {
                id,
                body,
                params,
                type: 'FunctionExpression'
            }, config);
        },
        arrowfunction(id = null, params = [], body = ast.statements.block(), config = {}) {
            return Object.assign({}, {
                id,
                body,
                params,
                type: 'ArrowFunctionExpression'
            }, config);
        },
        class(id = null, body = [], superClass = null) {
            return {
                id,
                body: {
                    body,
                    type: 'ClassBody'
                },
                superClass,
                type: 'ClassExpression'
            };
        },
        member(object, property, config) {
            return Object.assign({}, {
                object,
                property,
                type: 'MemberExpression'
            }, config);
        },
        new(callee, argument = []) {
            return {
                callee,
                arguments: argument,
                type: 'NewExpression'
            };
        },
        call(callee, argument = []) {
            return {
                callee,
                arguments: argument,
                type: 'CallExpression'
            };
        },
        update(operator, argument, prefix = false) {
            return {
                prefix,
                operator,
                argument,
                type: 'UpdateExpression'
            };
        },
        await(argument) {
            return {
                argument,
                type: 'AwaitExpression'
            };
        },
        unary(operator, argument) {
            return {
                operator,
                argument,
                prefix: true,
                type: 'UnaryExpression'
            };
        },
        binary(operator, left, right) {
            return {
                left,
                right,
                operator,
                type: 'BinaryExpression'
            };
        },
        logical(operator, left, right) {
            return {
                left,
                right,
                operator,
                type: 'LogicalExpression'
            };
        },
        conditional(test, consequent, alternate) {
            return {
                test,
                consequent,
                alternate,
                type: 'ConditionalExpression'
            };
        },
        yield(argument = null, delegate = false) {
            return {
                argument,
                delegate,
                type: 'YieldExpression'
            };
        },
        assignment(operator, left, right) {
            return {
                left,
                right,
                operator,
                type: 'AssignmentExpression'
            };
        },
        sequence(expressions = []) {
            return {
                expressions,
                type: 'SequenceExpression'
            };
        }
    },
    statements: {
        block(body = []) {
            return {
                body,
                type: 'BlockStatement'
            };
        },
        break(label) {
            return {
                label,
                type: 'BreakStatement'
            };
        },
        continue(label) {
            return {
                label,
                type: 'ContinueStatement'
            };
        },
        debugger(label) {
            return {
                label,
                type: 'DebuggerStatement'
            };
        },
        doWhile(test, body = ast.statements.block()) {
            return {
                test,
                body,
                type: 'DoWhileStatement'
            };
        },
        while(test, body = ast.statements.block()) {
            return {
                test,
                body,
                type: 'WhileStatement'
            };
        },
        with(object, body = ast.statements.block()) {
            return {
                body,
                object,
                type: 'WithStatement'
            };
        },
        empty() {
            return {
                type: 'EmptyStatement'
            };
        },
        return(argument) {
            return {
                argument,
                type: 'ReturnStatement'
            };
        },
        expression(expression) {
            return {
                expression,
                type: 'ExpressionStatement'
            };
        },
        for(init = null, test = null, update = null, body = ast.statements.block()) {
            return {
                init,
                test,
                body,
                update,
                type: 'ForStatement'
            };
        },
        forIn(left, right, body = ast.statements.block()) {
            return {
                left,
                right,
                body,
                each: false,
                type: 'ForInStatement'
            };
        },
        forOf(left, right, body = ast.statements.block()) {
            return {
                left,
                right,
                body,
                each: false,
                type: 'ForOfStatement'
            };
        },
        if(test, consequent, alternate) {
            return {
                test,
                consequent,
                alternate,
                type: 'IfStatement'
            };
        },
        labeled(label, body = ast.statements.block()) {
            return {
                label,
                body,
                type: 'LabeledStatement'
            };
        },
        switch(discriminant, cases) {
            return {
                cases,
                discriminant,
                type: 'SwitchStatement'
            };
        },
        case(test, consequent = ast.statements.block()) {
            return {
                test,
                consequent,
                type: 'SwitchCase'
            };
        },
        throw(argument) {
            return {
                argument,
                type: 'ThrowStatement'
            };
        },
        try(block, handler = null, finalizer = null) {
            return {
                block,
                handler,
                finalizer,
                type: 'TryStatement'
            };
        },
        catch(param = ast.identifier(''), body = ast.statements.block()) {
            return {
                param,
                body,
                type: 'CatchClause'
            };
        }
    },
    declaration: {
        var(id, init) {
            return {
                declarations: [{
                    id,
                    init,
                    type: 'VariableDeclarator'
                }],
                kind: 'var',
                type: 'VariableDeclaration'
            };
        },
        let(id, init) {
            return {
                declarations: [{
                    id,
                    init,
                    type: 'VariableDeclarator'
                }],
                kind: 'let',
                type: 'VariableDeclaration'
            };
        },
        const(id, init) {
            return {
                declarations: [{
                    id,
                    init,
                    type: 'VariableDeclarator'
                }],
                kind: 'const',
                type: 'VariableDeclaration'
            };
        },
        function(id = null, params = [], body = ast.statements.block(), config) {
            return Object.assign({}, {
                id,
                body,
                params,
                type: 'FunctionDeclaration'
            }, config);
        },
        class(id = null, body = [], superClass = null) {
            return {
                id,
                body: {
                    body,
                    type: 'ClassBody'
                },
                superClass,
                type: 'ClassDeclaration'
            };
        },
        import(imported, source) {
            let specifiers = imported.map(item => {
                return {
                    imported: item,
                    type: 'ImportSpecifier'
                };
            });

            return {
                source,
                specifiers,
                type: 'ImportDeclaration'
            };
        },
        importDefault(local, source) {
            let specifiers = [{
                local,
                type: 'ImportDefaultSpecifier'
            }];

            return {
                source,
                specifiers,
                type: 'ImportDeclaration'
            };
        },
        importNamespace(local, source) {
            let specifiers = [{
                local,
                type: 'ImportNamespaceSpecifier'
            }];

            return {
                source,
                specifiers,
                type: 'ImportDeclaration'
            };
        },
        exportAll(source) {
            return {
                source,
                type: 'ExportAllDeclaration'
            };
        },
        exportDefault(declaration) {
            return {
                declaration,
                type: 'ExportDefaultDeclaration'
            };
        },
        exportNamed(declaration, specifiers = []) {
            return {
                declaration,
                specifiers,
                source: null,
                type: 'ExportNamedDeclaration'
            };
        },
        exportSpecifier(exported, local) {
            if (!local) {
                local = exported;
            }

            return {
                local,
                exported,
                type: 'ExportSpecifier'
            };
        }
    }
};

exports.default = ast;