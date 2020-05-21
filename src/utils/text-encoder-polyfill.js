// prettier-ignore
/*
    Sourced from https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder#Polyfill
*/

/* eslint-disable */
if (typeof TextEncoder === "undefined") {
    TextEncoder=function TextEncoder(){};
    TextEncoder.prototype.encode = function encode(str) {
        "use strict";
        var Len = str.length, resPos = -1;
        var resArr = typeof Uint8Array === "undefined" ? new Array(Len * 2) : new Uint8Array(Len * 3);
        for (var point=0, nextcode=0, i = 0; i !== Len; ) {
            point = str.charCodeAt(i), i += 1;
            if (point >= 0xD800 && point <= 0xDBFF) {
                if (i === Len) {
                    resArr[resPos += 1] = 0xef/*0b11101111*/; resArr[resPos += 1] = 0xbf/*0b10111111*/;
                    resArr[resPos += 1] = 0xbd/*0b10111101*/; break;
                }
                // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
                nextcode = str.charCodeAt(i);
                if (nextcode >= 0xDC00 && nextcode <= 0xDFFF) {
                    point = (point - 0xD800) * 0x400 + nextcode - 0xDC00 + 0x10000;
                    i += 1;
                    if (point > 0xffff) {
                        resArr[resPos += 1] = (0x1e/*0b11110*/<<3) | (point>>>18);
                        resArr[resPos += 1] = (0x2/*0b10*/<<6) | ((point>>>12)&0x3f/*0b00111111*/);
                        resArr[resPos += 1] = (0x2/*0b10*/<<6) | ((point>>>6)&0x3f/*0b00111111*/);
                        resArr[resPos += 1] = (0x2/*0b10*/<<6) | (point&0x3f/*0b00111111*/);
                        continue;
                    }
                } else {
                    resArr[resPos += 1] = 0xef/*0b11101111*/; resArr[resPos += 1] = 0xbf/*0b10111111*/;
                    resArr[resPos += 1] = 0xbd/*0b10111101*/; continue;
                }
            }
            if (point <= 0x007f) {
                resArr[resPos += 1] = (0x0/*0b0*/<<7) | point;
            } else if (point <= 0x07ff) {
                resArr[resPos += 1] = (0x6/*0b110*/<<5) | (point>>>6);
                resArr[resPos += 1] = (0x2/*0b10*/<<6)  | (point&0x3f/*0b00111111*/);
            } else {
                resArr[resPos += 1] = (0xe/*0b1110*/<<4) | (point>>>12);
                resArr[resPos += 1] = (0x2/*0b10*/<<6)    | ((point>>>6)&0x3f/*0b00111111*/);
                resArr[resPos += 1] = (0x2/*0b10*/<<6)    | (point&0x3f/*0b00111111*/);
            }
        }
        if (typeof Uint8Array!=="undefined") return new Uint8Array(resArr.buffer.slice(0, resPos+1));
        else return resArr.length === resPos+1 ? resArr : resArr.slice(0, resPos+1); // IE 6-9
    };
    TextEncoder.prototype.toString = function(){return "[object TextEncoder]"};
    try { // Object.defineProperty only works on DOM prototypes in IE8
        Object.defineProperty(TextEncoder.prototype,"encoding",{
            get:function(){if(TextEncoder.prototype.isPrototypeOf(this)) return"utf-8";
                           else throw TypeError("Illegal invocation");}
        });
    } catch(e) { /*IE6-8 fallback*/ TextEncoder.prototype.encoding = "utf-8"; }
    if(typeof Symbol!=="undefined")TextEncoder.prototype[Symbol.toStringTag]="TextEncoder";
}
