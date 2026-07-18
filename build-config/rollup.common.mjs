export function banner (pkg, extra = '') {
  return `
/*
 * Statebot
 * v${pkg.version}
 * ${pkg.homepage}
 * License: ${pkg.license}
 */
${extra}`
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
