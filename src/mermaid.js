import { cxArrow, linesFrom } from './parsing'

const rxFrontMatter = /---[\r\n]+[\w\W]*---[\r\n]+[\r\n\s]*/m
const rxMermaidHeader = /stateDiagram(-v2)?[\r\n\s]*/g
const rxMermaidDirection = /direction\s+(TB|TD|BT|RL|LR)[\r\n\s]*/g
const rxMermaidComment = /%%/g
const rxMermaidArrow = /-->/g
const rxMermaidStartState = /\[\*\]\s*-->/g
const rxMermaidStopState = /-->\s*\[\*\]/g

/**
 * Support the Mermaid Preview extension for VS Code using
 * VSTS syntax for code blocks.
 *
 * @link https://marketplace.visualstudio.com/items?itemName=vstirbu.vscode-mermaid-preview
 * @link https://github.com/vstirbu/vscode-mermaid-preview
 *
 * For RegExp, see:
 * @see https://github.com/vstirbu/vscode-mermaid-preview/blob/v1.6.3/lib/find-diagram.js#L38
 *
 * @example
   // If you have the extension installed, enable the preview
   // window and place your cursor in the code block below.

   let mmd = `
   ::: mermaid
   stateDiagram
   direction LR
     go --> prepareToStop
       prepareToStop --> stop

     %% ...gotta keep that traffic flowing
     stop --> prepareToGo
       prepareToGo --> go
   :::
   `
 */
const rxMermaidPreviewVsts = /::: ?mermaid([\s\S]*?):::/g

export function mermaid(mmd) {
  return linesFrom(mmd)
    .join('\n')
    .replace(rxMermaidPreviewVsts, '$1')
    .replace(rxFrontMatter, '')
    .replace(rxMermaidHeader, '')
    .replace(rxMermaidDirection, '')
    .replace(rxMermaidComment, '//')
    .replace(rxMermaidStartState, '__START__ -->')
    .replace(rxMermaidStopState, '--> __STOP__')
    .replace(rxMermaidArrow, cxArrow)
}
