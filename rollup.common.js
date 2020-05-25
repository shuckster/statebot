export function banner(pkg) {
  return `
/*
 * Statebot
 * v${pkg.version}
 * ${pkg.homepage}
 * License: ${pkg.license}
 */
`
}

export const terserConfig = {
  output: {
    wrap_iife: true,
    comments: (node, comment) => {
      var text = comment.value;
      var type = comment.type;
      if (type == "comment2") {
        // multiline comment
        return /License: /.test(text);
      }
    }
  }
}
