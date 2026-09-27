// One illustrative quote used by the hero, the product tour and the feature grid, priced with the
// product's demo rates (lawn $0.45/ft², snow $1.10/ft² + $4.50/lin ft, Snow & lawn less 10%).

export const sampleQuote = {
  address: "18 Juniper Crescent",
  service: "Snow & lawn",
  lines: [
    { label: "Lawn", qty: "4,812 ft²", rate: "$0.45", amount: "$2,165.40" },
    { label: "Snow surfaces", qty: "842 ft²", rate: "$1.10", amount: "$926.20" },
    { label: "Walkway", qty: "34 lin ft", rate: "$4.50", amount: "$153.00" },
  ],
  discount: { label: "Snow & lawn −10%", amount: "−$324.46" },
  total: "$2,920.14",
} as const;
