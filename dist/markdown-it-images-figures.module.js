function t(t,e){return(Array.isArray(t)?t:[]).filter(function(t){return t[0]!==e})}function e(e,n){e&&e.attrs&&(e.attrs=t(e.attrs,n))}module.exports=function(n,r){r=r||{},n.core.ruler.before("linkify","image_figures",function(i){for(var a=1,s=1,c=i.tokens.length;s<c-1;++s){var o=i.tokens[s];if("inline"===o.type&&o.children&&(1===o.children.length||3===o.children.length)&&(1!==o.children.length||"image"===o.children[0].type)){if(3===o.children.length){var l=o.children;if("link_open"!==l[0].type||"image"!==l[1].type||"link_close"!==l[2].type)continue}if(!(0!==s&&"paragraph_open"!==i.tokens[s-1].type||s!==c-1&&"paragraph_close"!==i.tokens[s+1].type)){var f=i.tokens[s-1];f.type="figure_open",f.tag="figure",i.tokens[s+1].type="figure_close",i.tokens[s+1].tag="figure",r.dataType&&i.tokens[s-1].attrPush(["data-type","image"]);var h=void 0;if(r.link&&1===o.children.length){h=o.children[0];var p=new i.Token("link_open","a",1);p.attrPush(["href",h.attrGet("src")]),o.children.unshift(p),o.children.push(new i.Token("link_close","a",-1))}if(h=1===o.children.length?o.children[0]:o.children[1],r.figcaption){var u=void 0,d=h.attrs.find(function(t){return"title"===t[0]});if(Array.isArray(d)&&(u=d[1]),u){var g,y=n.parseInline(u,i.env)[0];o.children.push(new i.Token("figcaption_open","figcaption",1)),(g=o.children).push.apply(g,y.children),o.children.push(new i.Token("figcaption_close","figcaption",-1)),h.attrs&&(h.attrs=t(h.attrs,"title"))}}if(r.copyAttrs&&h.attrs&&function(){var t=!0===r.copyAttrs?"":r.copyAttrs;f.attrs=h.attrs.filter(function(e){return e[0].match(t)}).map(function(t){return Array.from(t)})}(),r.tabindex&&(i.tokens[s-1].attrPush(["tabindex",a]),a++),r.lazy&&(h.attrs.some(function(t){return"loading"===t[0]})||h.attrs.push(["loading","lazy"])),r.async&&(h.attrs.some(function(t){return"decoding"===t[0]})||h.attrs.push(["decoding","async"])),r.classes&&"string"==typeof r.classes){for(var k=!1,v=0,m=h.attrs.length;v<m&&!k;v++){var _=h.attrs[v];"class"===_[0]&&(_[1]=_[1]+" "+r.classes,k=!0)}k||h.attrs.push(["class",r.classes])}if(r.removeSrc){var A=h.attrs.find(function(t){return"src"===t[0]});h.attrs.push(["data-src",A[1]]),e(h,"src")}}}}})};
//# sourceMappingURL=markdown-it-images-figures.module.js.map
