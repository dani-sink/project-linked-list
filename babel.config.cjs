// babel.config.cjs   ← must be .cjs, see gotcha below
module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};
