class letsCodeStartingTemplate {
    init() {
    }

    map(d) {
        
        const mid = d.low() + ((d.high() - d.low()) / 2);
        
        return {
            midPoint: mid
        }
    }
}

module.exports = {
    name: "letsCodeStartingTemplate",
    description: "Lets Code - Starting Template",
    calculator: letsCodeStartingTemplate,
    tags: ["Lets Code"],
    plots: {
        midPoint: { title: "Mid Point" },
    },
};
