const meta = require("./tools/meta");
const predef = require("./tools/predef");
const { px, du, op, min } = require("./tools/graphics");

const th = require('./timeHelpers');

function isInTimeRange(bar, hour, minute, offsetMinutesLeft, offsetMinutesRight, debug) {
    
    const minsMillis = 60 * 1000;
    const offsetLeft = minsMillis * offsetMinutesLeft;
    const offsetRight = minsMillis * offsetMinutesRight;
    
    const baseDate = new Date(2000, 2, 2, hour, minute, 0, 0);
    let barDate = new Date(2000, 2, 2, bar.date.getHours(), bar.date.getMinutes(), 0, 0);
    
    // if (debug) {
    //     console.log("barDate: " + barDate + "; baseDate: " + baseDate);
    // }
    
    const beginDate = new Date(baseDate.getTime() - offsetLeft);
    if (barDate >= beginDate) {
        const endDate = new Date(baseDate.getTime() + offsetRight);
        
        if (barDate < endDate) {

            if (debug) {            
                console.log(bar.date + " is in Range => barDate: " + barDate + "; endDate: " + endDate);
            }
            
            return true;
        } else if (debug) {            
            console.log(bar.date + " is not Range => barDate: " + barDate + "; endDate: " + endDate);
        }
    }
    
    return false;
}

class ldtMagnums369 {
    init() {
        this.hourAlignOffset = th.getHourAlignOffset(this.props.globexOpenHour);
        this.rangeType = "minutes";
        this.rangeAmount = 60;
    }

    map(d, i, history) {
        const mid = d.low() + ((d.high() - d.low()) / 2);
        
            
        const am03Check = isInTimeRange(d, 1, 0, 0, 45);
        const am06Check = !am03Check && isInTimeRange(d, 4, 0, 30, 45);
        const am09Check = !am03Check && !am06Check && isInTimeRange(d, 7, 0, 30, 45);
        const am12Check = !am03Check && !am06Check && !am09Check && isInTimeRange(d, 10, 0, 30, 45);
        const am15Check = !am03Check && !am06Check && !am09Check && !am12Check && isInTimeRange(d, 13, 0, 30, 45);
        const am18Check = !am03Check && !am06Check && !am09Check && !am12Check && !am15Check && isInTimeRange(d, 18, 0, 30, 45);
        const am23Check = !am03Check && !am06Check && !am09Check && !am12Check && !am15Check && !am18Check && isInTimeRange(d, 23, 30, 45, 45, true);
        
        let v = 0;
        let color = "white";
        if (am03Check) {
            v = 1;
            color = "cyan";
            //console.log("3am passed: " + d.date);
        }
        
        if (am06Check) {
            v = 1;
            color = "red";
            //console.log("6am passed: " + d.date);
        }
        
        if (am09Check) {
            v = 1;
            color = "cyan";
            //console.log("9am passed: " + d.date);
        }
        
        if (am12Check) {
            v = 1;
            color = "red";
            //console.log("12pm passed: " + d.date);
        }
        
        if (am15Check) {
            v = 1;
            color = "cyan";
            //console.log("3pm passed: " + d.date);
        }
        
        if (am18Check) {
            v = 1;
            color = "red";
            //console.log("3pm passed: " + d.date);
        }
        
        if (am23Check) {
            v = 1;
            color = "cyan";
            //console.log("3pm passed: " + d.date);
        }
        
        return {
            value: v,
            style: { 
                value: {color: color},
            }
        }
    }
}

module.exports = {
    name: "ldtMagnums369",
    description: "LDT - Magnum's 3/6/9",
    calculator: ldtMagnums369,
    tags: ["Latter-day Trader"],
    areaChoice: meta.AreaChoice.NEW,
    inputType: meta.InputType.BARS,
    params: {
        period: predef.paramSpecs.period(15),
        globexOpenHour: predef.paramSpecs.percent(th.getAlignToHourDefault(), 1, 0, 23),
        show3OclockRange: predef.paramSpecs.bool(true),
        rangeAmount: predef.paramSpecs.number(30, 1, 0),
        
    },
    // plots: {
    //     midPoint: { title: "Mid Point" },
    // },
    plotter: [
        predef.plotters.columns("value")
    ],
    // schemeStyles: {
    //     dark: {
    //         midPoint: {
    //             color: "dodgerBlue",
    //             opacity: 100,
    //             lineStyle: 1, 
    //             lineWidth: 5
    //         },
    //     }
    // },
    scaler: predef.scalers.multiPath(["value"])
};
