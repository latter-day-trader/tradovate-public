const predef = require("./tools/predef");
const meta = require("./tools/meta");
const { px, du, op, min } = require("./tools/graphics");


function bodyPortion(bar, ratio) {
        
    const body = bar.high() - bar.low();
    const portion = body * ratio;
    
    return bar.high() - portion;
}


class ldtPreviousBarFibonnaciRetracement {
    init() {
        this.rand = Math.floor(Math.random() * 2000);
    }
    
    getRetraceLine(bar, i, ratio, lineWidth, lineStyle, color, opacity, global) {
        const level = bodyPortion(bar, ratio);
        
        const levelLine = {
             tag: 'LineSegments',
             key: 'fibLevel;' + ratio + ';' + this.rand + ";" + bar.index(),
             global,
             lines: [
                 {
                     tag: 'Line',
                     a: {
                         x: op(du(bar.index()), "-", du(0.4)),
                         y: du(level)
                     },
                     b: {
                         x: op(du(bar.index()), "+", du(0.4)),
                         y: du(level),
                     },
                 },
             ],
             lineStyle: {
                 lineWidth,
                 lineStyle,
                 color,
                 opacity
             },
        };
        
        return levelLine;
    }

    map(d, i, history) {
        const prior = history.prior();
        if (!prior) {
            return;
        }
        
        let items = [];
        const rtn = {};
        
        if (!this.props.showOnlyLastBar || d.isLast()) {
            
            const levelLine = this.getRetraceLine(prior, i, this.props.retracePercent01, this.props.lineWidth01, this.props.lineStyle01, this.props.lineColor01, this.props.lineOpacity01, this.props.showOnlyLastBar);
            items.push(levelLine);
            
            rtn["graphics"] = { items };
        }
        
        if (!d.isLast()) {
            
            const midPoint = bodyPortion(prior, 0.50);
            rtn["midPoint"] = midPoint;
        }
        
        return rtn;
    }
}


module.exports = {
    name: "ldtPreviousBarFibonnaciRetracement",
    description: "LDT - Previous Bar Fib Retracement",
    calculator: ldtPreviousBarFibonnaciRetracement,
    tags: ["Latter-day Trader"],
    inputType: meta.InputType.BARS,
    params: {
        showOnlyLastBar: predef.paramSpecs.bool(false),
        retracePercent01: predef.paramSpecs.percent(0.500, .001, .001, 0.950),
        lineColor01: predef.paramSpecs.color("white"),
        lineWidth01: predef.paramSpecs.percent(1, 1, 1, 5),
        lineStyle01: predef.paramSpecs.percent(1, 1, 1, 5),
        lineOpacity01: predef.paramSpecs.percent(100, 1, 10, 100),
    },
    plotter: [
        { type: 'multiline', field: ['midPoint'] },
    ],
    plots: {
        midPoint: { title: "Mid Point" },
    },
    schemeStyles: {
        dark: {
            midPoint: predef.styles.plot({ color: "dodgerBlue", lineStyle: 1, lineWidth: 1 }),
        }
    },
};
