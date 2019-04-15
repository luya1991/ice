const e=require("babylon"),r=require("fs"),t=require("babel-generator").default,i=require("prettier"),o=require("babel-types"),n=require("babel-traverse").default,a=require("uppercamelcase"),s=require("../../config");function l({path:e,layout:r="",component:t}){return r?o.objectExpression([o.objectProperty(o.stringLiteral("path"),o.stringLiteral(e)),o.objectProperty(o.stringLiteral("layout"),o.identifier(a(r))),o.objectProperty(o.stringLiteral("component"),o.identifier(t))]):o.objectExpression([o.objectProperty(o.stringLiteral("path"),o.stringLiteral(e)),o.objectProperty(o.stringLiteral("component"),o.identifier(t))])}function c({name:e,source:r}){return o.importDeclaration([o.importDefaultSpecifier(o.identifier(e))],o.stringLiteral(r))}function p({program:e},r){let t=0;e.body.forEach((e,r)=>{o.isImportDeclaration(e)&&(t=r)}),e.body.splice(t,0,r)}let u=!1,m=!1;const f="routerConfig";module.exports=async function({routePath:y,routeFilePath:d,routerConfigFilePath:g,pageFolderName:b,layoutName:h}){const I=r.readFileSync(g).toString(),P=e.parse(I,{sourceType:"module",plugins:["*"]});y=`/${y.replace(/^\//,"")}`;let S=!1;if(r.existsSync(d)){const t=r.readFileSync(d).toString(),i=e.parse(t,{sourceType:"module",plugins:["*"]});n(i,{ImportDeclaration({node:e}){S=e.specifiers.some(e=>!(!o.isImportDefaultSpecifier(e)||!o.isIdentifier(e.local)||e.local.name!==f))}})}n(P,{Program(){u=!1,m=!1},VariableDeclarator({node:e}){if(o.isIdentifier(e.id,{name:f})&&o.isArrayExpression(e.init)){let r=-1;const t=e.init.elements.some((e,t)=>{const i=e.properties.some(e=>"path"===e.key.name&&e.value.value===y);return i&&"/IceworksPreviewPage"===y&&(r=t),i}),i={path:y,component:b};S&&(i.layout=h),t?-1!==r&&e.init.elements.splice(r,1,l(i)):e.init.elements.push(l(i)),e.init.elements=e.init.elements.sort(e=>{return e.properties.some(e=>"path"===e.key.name&&"*"===e.value.value)?1:0})}},ImportDeclaration({node:e}){u||(u=e.specifiers.some(e=>!(!o.isImportDefaultSpecifier(e)||!o.isIdentifier(e.local)||e.local.name!==b))),!m&&h&&(m=e.specifiers.some(e=>!(!o.isImportDefaultSpecifier(e)||!o.isIdentifier(e.local)||e.local.name!==a(h))))}}),u||p(P,c({name:b,source:`./pages/${b}`})),S&&!m&&h&&p(P,c({name:a(h),source:`./layouts/${h}`})),r.writeFileSync(g,i.format(t(P).code,s.prettier))};