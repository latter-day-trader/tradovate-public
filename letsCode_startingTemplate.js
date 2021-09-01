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
    description: "Let's Code - Starting Template",
    calculator: letsCodeStartingTemplate,
    tags: ["Let's Code"],
    plots: {
        midPoint: { title: "Mid Point" },
    },
};
