//
// Build with esbuild (pattern adapted from add-javascript)
//

import fs from 'node:fs'
import path from 'node:path'
import esbuild from 'esbuild'
import { outputs, addBanner } from './common.mjs'

async function main () {
  await Promise.all(outputs.map(buildModule))
  console.log(`Built ${outputs.length} outputs with esbuild`)
}

/**
 * @param {object} opts
 */
async function buildModule ({
  entry,
  outfile,
  format,
  platform,
  external = [],
  minify = false,
  sourcemap = false,
  globalName,
  bannerExtra = ''
}) {
  fs.mkdirSync(path.dirname(outfile), { recursive: true })

  const result = await esbuild.build({
    entryPoints: [entry],
    outfile,
    format,
    platform,
    globalName,
    external,
    bundle: true,
    minify,
    sourcemap,
    target: ['es2018'],
    write: false,
    logLevel: 'warning',
    // Keep the license banner; drop other legal comments when minifying.
    legalComments: minify ? 'none' : 'inline'
  })

  const jsFile = result.outputFiles.find(
    (f) => f.path.endsWith('.js') || f.path.endsWith('.mjs') || f.path.endsWith('.cjs')
  )
  const mapFile = result.outputFiles.find((f) => f.path.endsWith('.map'))

  if (!jsFile) {
    throw new Error(`esbuild produced no JS for ${outfile}`)
  }

  let code = new TextDecoder().decode(jsFile.contents)
  code = addBanner(code, bannerExtra)

  // Point sourceMappingURL at the outfile basename when a map is written.
  if (mapFile && sourcemap) {
    const mapName = path.basename(outfile) + '.map'
    if (!code.includes('sourceMappingURL=')) {
      code += `\n//# sourceMappingURL=${mapName}\n`
    }
    fs.writeFileSync(outfile + '.map', mapFile.contents)
  }

  fs.writeFileSync(outfile, code)
  console.log(`  → ${path.relative(process.cwd(), outfile)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
