function t(t,e){return(Array.isArray(t)?t:[]).filter(([t])=>t!==e)}function e(e,n){e&&e.attrs&&(e.attrs=t(e.attrs,n))}module.exports=function(n,s){s=s||{},n.core.ruler.before("linkify","image_figures",function(i){let r=1;for(let a=1,c=i.tokens.length;a<c-1;++a){const o=i.tokens[a];if("inline"!==o.type)continue;if(!o.children||1!==o.children.length&&3!==o.children.length)continue;if(1===o.children.length&&"image"!==o.children[0].type)continue;if(3===o.children.length){const[t,e,n]=o.children;if("link_open"!==t.type||"image"!==e.type||"link_close"!==n.type)continue}if(0!==a&&"paragraph_open"!==i.tokens[a-1].type)continue;if(a!==c-1&&"paragraph_close"!==i.tokens[a+1].type)continue;const l=i.tokens[a-1];let h;if(l.type="figure_open",l.tag="figure",i.tokens[a+1].type="figure_close",i.tokens[a+1].tag="figure",s.dataType&&i.tokens[a-1].attrPush(["data-type","image"]),s.link&&1===o.children.length){[h]=o.children;const t=new i.Token("link_open","a",1);t.attrPush(["href",h.attrGet("src")]),o.children.unshift(t),o.children.push(new i.Token("link_close","a",-1))}if(h=1===o.children.length?o.children[0]:o.children[1],s.figcaption){let e;const s=h.attrs.find(([t])=>"title"===t);if(Array.isArray(s)&&(e=s[1]),e){const[s]=n.parseInline(e,i.env);o.children.push(new i.Token("figcaption_open","figcaption",1)),o.children.push(...s.children),o.children.push(new i.Token("figcaption_close","figcaption",-1)),h.attrs&&(h.attrs=t(h.attrs,"title"))}}if(s.copyAttrs&&h.attrs){const t=!0===s.copyAttrs?"":s.copyAttrs;l.attrs=h.attrs.filter(([e])=>e.match(t)).map(t=>Array.from(t))}if(s.tabindex&&(i.tokens[a-1].attrPush(["tabindex",r]),r++),s.lazy&&(h.attrs.some(([t])=>"loading"===t)||h.attrs.push(["loading","lazy"])),s.async&&(h.attrs.some(([t])=>"decoding"===t)||h.attrs.push(["decoding","async"])),s.classes&&"string"==typeof s.classes){let t=!1;for(let e=0,n=h.attrs.length;e<n&&!t;e++){const n=h.attrs[e];"class"===n[0]&&(n[1]=`${n[1]} ${s.classes}`,t=!0)}t||h.attrs.push(["class",s.classes])}if(s.removeSrc){const t=h.attrs.find(([t])=>"src"===t);h.attrs.push(["data-src",t[1]]),e(h,"src")}}})};
//# sourceMappingURL=markdown-it-images-figures.modern.js.map
