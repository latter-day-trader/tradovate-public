/** 
 * LDT - Inside Bar (build 03)
 * 
 * https://youtu.be/pFg2UnEGthA
 * https://youtu.be/LRMaFSkIVwA
 * 
 * 
 * 03/04/2022 - Added number above the bar
 * 
 * You are responsible to do your own due diligence. I don't make any claims as to the accuracy of this indicator.
 * Any trading wins or losses will be upon your own shoulders, not because of this or any of my other indicators.
 *  
 * 
 * Copyright notice
 * 
 * This indicator is distributed as is.
 * You may not modify, redistribute, or de-obfuscate this code.
 * 
 * Questions: latter.day.trader at gmail.com
 * 
 **/
 
const predef = require("./tools/predef");
const meta = require("./tools/meta");
const { px, du, op, min } = require("./tools/graphics");



function _0x12a9(_0x4c7834,_0x3aa8b9){const _0x4b993c=_0x4b99();return _0x12a9=function(_0x12a943,_0x2b12bc){_0x12a943=_0x12a943-0x1b8;let _0x33df3d=_0x4b993c[_0x12a943];return _0x33df3d;},_0x12a9(_0x4c7834,_0x3aa8b9);}(function(_0x4da2d3,_0x530a47){const _0x322bbf=_0x12a9,_0x40fcb5=_0x4da2d3();while(!![]){try{const _0x5c25fd=parseInt(_0x322bbf(0x1b8))/0x1+parseInt(_0x322bbf(0x1bf))/0x2+parseInt(_0x322bbf(0x1c0))/0x3+-parseInt(_0x322bbf(0x1bb))/0x4+-parseInt(_0x322bbf(0x1bc))/0x5+parseInt(_0x322bbf(0x1c1))/0x6+-parseInt(_0x322bbf(0x1be))/0x7;if(_0x5c25fd===_0x530a47)break;else _0x40fcb5['push'](_0x40fcb5['shift']());}catch(_0x5a7b6c){_0x40fcb5['push'](_0x40fcb5['shift']());}}}(_0x4b99,0x69218));function drawText(_0x401676,_0x52726c,_0x3307b4,_0x7eee32,_0x1b1857,_0x49a01f,_0x444c15,_0x3f07cd,_0x3a992e,_0x574a87){const _0x22732d=_0x12a9,_0x462396=_0x7eee32*_0x1b1857;let _0x9b2393;if(_0x444c15)_0x9b2393=op(du(_0x3307b4),'-',px(_0x462396));else _0x9b2393=op(du(_0x3307b4),'+',px(_0x462396));const _0x4a01bf=0x0,_0x534581={'tag':_0x22732d(0x1ba),'key':_0x22732d(0x1b9)+_0x401676+';'+_0x1b1857+';'+_0x52726c,'point':{'x':du(_0x52726c+_0x4a01bf),'y':_0x9b2393},'text':_0x3f07cd,'style':{'fontSize':_0x574a87,'fontWeight':_0x22732d(0x1bd),'fill':_0x3a992e},'textAlignment':'centerMiddle','global':_0x49a01f};return _0x534581;}function _0x4b99(){const _0x1721e8=['232832OMuvmW','2307780tseqcd','4308072WBDeDF','431173GlMoDW','insidebar;','Text','2444556WFdGGL','3753630BjbsLy','bold','1696660YkToGi'];_0x4b99=function(){return _0x1721e8;};return _0x4b99();}




class LC_InsideBar_03 {
    init() {
        this.rand = Math.floor(Math.random() * 2000);
    }

    map(d, i, history) {
        
        const prior = history.prior();
        if (!prior)
            return;
            
            
        // Check to see if it is an inside bar
        let isInside = false;
        if (prior.high() > d.high() && prior.low() < d.low())
            isInside = true;
            

        const rtn = {};
        
        let colorProp = "gray";
        let numText = "0";
        let isAbove = false;
        
        if (isInside) {
            
            numText = "1";
            colorProp = this.props.insideColorUp;
            if (d.close() < d.open()) {
                colorProp = this.props.insideColorDn;
            }
            else if (d.close() === d.open())
                colorProp = this.props.insideColorDoji;
            
            
            if (this.props.colorTheCandles) {
                rtn["candlestick"] = {color: colorProp};    
            }
            
            if (this.props.showTextNumber) {
                const items = [];
                items.push(drawText(this.rand, d.index(), isAbove ? d.high() : d.low(), this.props.textDistanceFromBar, 1, false, isAbove, numText, colorProp, this.props.textFontSize));
                
                rtn["graphics"] = {items};
            }
        }
        

        return rtn;
    }
}

module.exports = {
    name: "LC_InsideBar_03",
    description: "LDT - InsideBar (03)",
    calculator: LC_InsideBar_03,
    tags: ["Let's Code", "Latter-day Trader"],
    params: {
        dividerForColors: predef.paramSpecs.enum({
            s: '------------------------------------------------------------------------------------------------------------------------------------------------------'
        }, 's'),
        colorTheCandles: predef.paramSpecs.bool(true),
        insideColorUp: predef.paramSpecs.color("dodgerBlue"),
        insideColorDn: predef.paramSpecs.color("yellow"),
        insideColorDoji: predef.paramSpecs.color("purple"),
        
        dividerForText: predef.paramSpecs.enum({
            s: '------------------------------------------------------------------------------------------------------------------------------------------------------'
        }, 's'),
        showTextNumber: predef.paramSpecs.bool(true),
        textDistanceFromBar: predef.paramSpecs.number(25, 1, 5),
        textFontSize: predef.paramSpecs.percent(14, 1, 1, 100),

        dividerForOthers: predef.paramSpecs.enum({
            s: '------------------------------------------------------------------------------------------------------------------------------------------------------'
        }, 's'),
    },
};

