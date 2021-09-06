const predef = require("./tools/predef");
const SMA = require("./tools/SMA");

// PROSHOT: Include this to get the helper functions
const { px, du, op, min } = require("./tools/graphics");

class LC_Line_Segments {
    init() {
        
        // I generate this random so that multiple instances of this indicator won't interfere with each other
        this.rand = Math.floor(Math.random() * 10000);
        
        this.sma = SMA(this.props.period);
    }

    map(d) {
        
        let items = [];
        
        const myLine = {
             tag: 'LineSegments',
             key: "myAwesomeline::" + this.rand, // name it something uniuqe
             global: true, // set this to true to only have one line and drawn once; if you want multiple lines, just set this to false and name the key property uniquely, like with an index
             lines: [
                 // Top
                 {
                     tag: 'Line',
                     a: {
                         // op adds to units
                         // du basically means convert to amount * the width of a bar. so du(1) is the same as saying the amount of screen that 1 bar takes up
                         // you can use px(amount) if you want to convert things to pixels
                         // look in the ./tools/graphics.js for more info
                         
                         x: op(du(d.index()), "+", du(1)), // left side of line starts at the right-most bar, shifted one bar to the right
                         y: du(d.high()),
                     },
                     b: {
                         x: op(du(d.index()), "+", du(5)), // right side of line starts at the right-most bar, shifted five bars to the right
                         y: du(d.high())
                     },
                 },
             ],
             lineStyle: {
                 lineWidth: 3,
                 lineStyle: 2,
                 color: "purple",
                 opacity: 100
             },
        };
                    
        items.push(myLine);

        let rtn = {
            // add plots here, if you have any
        }
        
        // Include the graphics properties if you are drawing something
        if (items.length > 0) {
            rtn["graphics"] = { items: items }; 
        }
            
        return rtn;
        
    }
}

module.exports = {
    name: "LC_Line_Segments",
    description: "LC_Line_Segments",
    calculator: LC_Line_Segments,
    params: {
        period: predef.paramSpecs.period(14)
    },
    tags: ["Demo"],
    schemeStyles: predef.styles.solidLine("#8cecff")
};
