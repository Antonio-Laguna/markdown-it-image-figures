!function(t){"function"==typeof define&&define.amd?define(t):t()}(function(){function t(t,e){return(Array.isArray(t)?t:[]).filter(([t])=>t!==e)}function e(e,n){e&&e.attrs&&(e.attrs=t(e.attrs,n))}module.exports=function(n,i){i=i||{},n.core.ruler.before("linkify","image_figures",function(r){let s=1;for(let a=1,o=r.tokens.length;a<o-1;++a){const c=r.tokens[a];if("inline"!==c.type)continue;if(!c.children||1!==c.children.length&&3!==c.children.length)continue;if(1===c.children.length&&"image"!==c.children[0].type)continue;if(3===c.children.length){const[t,e,n]=c.children;if("link_open"!==t.type||"image"!==e.type||"link_close"!==n.type)continue}if(0!==a&&"paragraph_open"!==r.tokens[a-1].type)continue;if(a!==o-1&&"paragraph_close"!==r.tokens[a+1].type)continue;const l=r.tokens[a-1];let f;if(l.type="figure_open",l.tag="figure",r.tokens[a+1].type="figure_close",r.tokens[a+1].tag="figure",i.dataType&&r.tokens[a-1].attrPush(["data-type","image"]),i.link&&1===c.children.length){[f]=c.children;const t=new r.Token("link_open","a",1);t.attrPush(["href",f.attrGet("src")]),c.children.unshift(t),c.children.push(new r.Token("link_close","a",-1))}if(f=1===c.children.length?c.children[0]:c.children[1],i.figcaption){let e;const i=f.attrs.find(([t])=>"title"===t);if(Array.isArray(i)&&(e=i[1]),e){const[i]=n.parseInline(e,r.env);c.children.push(new r.Token("figcaption_open","figcaption",1)),c.children.push(...i.children),c.children.push(new r.Token("figcaption_close","figcaption",-1)),f.attrs&&(f.attrs=t(f.attrs,"title"))}}if(i.copyAttrs&&f.attrs){const t=!0===i.copyAttrs?"":i.copyAttrs;l.attrs=f.attrs.filter(([e])=>e.match(t)).map(t=>Array.from(t))}if(i.tabindex&&(r.tokens[a-1].attrPush(["tabindex",s]),s++),i.lazy){const t="string"==typeof i.lazy?i.lazy:"lazy",n=f.attrs.find(([t])=>"src"===t);f.attrs.push(["data-src",n[1]]),e(f,"src");let r=!1;for(let e=0,n=f.attrs.length;e<n&&!r;e++){const n=f.attrs[e];"class"===n[0]&&(n[1]=`${n[1]} ${t}`,r=!0)}r||f.attrs.push(["class",t]),f.attrs.push(["loading","lazy"])}}})}});