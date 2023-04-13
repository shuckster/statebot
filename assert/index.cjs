
/*
 * Statebot
 * v3.1.3
 * https://shuckster.github.io/statebot/
 * License: MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

isArray.displayName = 'isUnset';
function isArray(obj) {
  return Array.isArray(obj)
}
isArray.displayName = 'isArray';
function isArguments(obj) {
  return Object.prototype.toString.call(obj) === '[object Arguments]'
}
isArguments.displayName = 'isArguments';
function isFunction(obj) {
  return typeof obj === 'function'
}
isFunction.displayName = 'isFunction';
function isString(obj) {
  return typeof obj === 'string'
}
isString.displayName = 'isString';
function isUndefined(obj) {
  return obj === undefined
}
isUndefined.displayName = 'isUndefined';
function isNull(obj) {
  return obj === null
}
isNull.displayName = 'isNull';
function isNumber(obj) {
  return typeof obj === 'number'
}
isNumber.displayName = 'isNumber';
function isObject(obj) {
  return typeof obj === 'object' && !isNull(obj)
}
isObject.displayName = 'isObject';
function isPojo(obj) {
  if (isNull(obj) || !isObject(obj) || isArguments(obj)) {
    return false
  }
  return Object.getPrototypeOf(obj) === Object.prototype
}
isPojo.displayName = 'isPojo';
function isTemplateLiteral(obj) {
  if (isString(obj)) {
    return true
  }
  if (!isArray(obj)) {
    return false
  }
  return obj.every(isString)
}
isTemplateLiteral.displayName = 'isTemplateLiteral';
const typeErrorStringIfFnReturnsFalse = (argName, argTypeFn, arg) => {
  return argTypeFn(arg)
    ? undefined
    : (argTypeFn.displayName || argTypeFn.name) +
        `(${argName}) did not return true`
};
const typeErrorStringIfTypeOfFails = (argName, argType, arg) => {
  return typeof arg === argType
    ? undefined
    : `Argument "${argName}" should be a ${argType}`
};
const typeErrorStringFromArgument = argMap => (arg, index) => {
  if (index >= argMap.length) {
    return
  }
  const { argName, argType } = argMap[index];
  if (isUndefined(arg)) {
    return `Argument undefined: "${argName}"`
  }
  const permittedArgTypes = Array.isArray(argType) ? argType : [argType];
  const errorDescs = permittedArgTypes
    .map(argType =>
      isFunction(argType)
        ? typeErrorStringIfFnReturnsFalse(argName, argType, arg)
        : typeErrorStringIfTypeOfFails(argName, argType, arg)
    )
    .filter(isString);
  const multipleTypesSpecified = permittedArgTypes.length > 1;
  const shouldError = multipleTypesSpecified
    ? errorDescs.length > 1
    : errorDescs.length;
  if (shouldError) {
    return (
      errorDescs.join('\n| ') +
      `\n> typeof ${argName} === ${typeof arg}(${JSON.stringify(arg)})`
    )
  }
};
function ArgTypeError(namespace) {
  return typeMap => {
    const argMap = Object.entries(typeMap).map(([argName, argType]) => ({
      argName,
      argType
    }));
    return fnName =>
      (...args) => {
        const processedArgs = Array
          .from(args, x => isArguments(x) ? Array.from(x) : x)
          .flat(1);
        const err = processedArgs
          .map(typeErrorStringFromArgument(argMap))
          .filter(isString);
        if (!err.length) {
          return
        }
        const signature = Object.keys(typeMap).join(', ');
        return (
          `\n${namespace || ''}${fnName}(${signature}):\n` +
          `${err.map(err => `| ${err}`).join('\n')}`
        )
      }
  }
}

function defer (fn, ...args) {
  const timer = setTimeout(fn, 0, ...args);
  return () => { clearTimeout(timer); }
}
function Defer (fn) {
  return (...args) => defer(fn, ...args)
}
function Once (fn) {
  const { revoke, fn: _fn } = Revokable(fn);
  let result;
  return function (...args) {
    result = _fn(...args);
    revoke();
    return result
  }
}
function Revokable (fn) {
  let revoked = false;
  let result;
  return {
    fn: (...args) => {
      if (!revoked) {
        result = fn(...args);
      }
      return result
    },
    revoke: () => {
      revoked = true;
    }
  }
}
function Logger (level, _console) {
  if (isString(level)) {
    level = ({
      info: 3,
      log: 2,
      warn: 1,
      none: 0
    })[level] || 3;
  }
  function canWarn () {
    return level >= 1
  }
  function canLog () {
    return level >= 2
  }
  function canInfo () {
    return level >= 3
  }
  const { info, table, log, warn, error } = _console || console;
  return {
    canWarn,
    canLog,
    canInfo,
    info: (...args) => { canInfo() && info(...args); },
    table: (...args) => { canLog() && table(...args); },
    log: (...args) => { canLog() && log(...args); },
    warn: (...args) => { canWarn() && warn(...args); },
    error: (...args) => { error(...args); }
  }
}

const rxCRLF = /[\r\n]/;
const cxPipe = '|';
const cxArrow = '->';
const rxOperators = [cxPipe, cxArrow]
  .map(rxUnsafe => rxUnsafe.replace('|', '\\|'))
  .join('|');
const rxLineContinuations = new RegExp(`(${rxOperators})$`);
const rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi;
const rxComment = /(\/\/[^\n\r]*)/;
const argTypeError$1 = ArgTypeError('statebot.');
function decomposeRoute (templateLiteral) {
  const err = argTypeError$1(
    { templateLiteral: isTemplateLiteral }
  )('decomposeRoute')(templateLiteral);
  if (err) {
    throw TypeError(err)
  }
  const lines = condensedLines(templateLiteral);
  const linesOfTokens = tokenisedLines(lines);
  const route = linesOfTokens.flat(2);
  return route
}
function linesFrom (strOrArr) {
  return [strOrArr]
    .flat()
    .reduce((acc, line) => [...acc, ...line.split(rxCRLF)], [])
}
function condensedLines (strOrArr) {
  const input = linesFrom(strOrArr);
  const output = [];
  let previousLineHasContinuation = false;
  const condenseLine = (condensedLine, line) => {
    const sanitisedLine = line
      .replace(rxComment, '')
      .replace(rxDisallowedCharacters, '');
    if (!sanitisedLine) {
      return condensedLine
    }
    previousLineHasContinuation = rxLineContinuations
      .test(sanitisedLine);
    if (previousLineHasContinuation) {
      return condensedLine + sanitisedLine
    }
    output.push(condensedLine + sanitisedLine);
    return ''
  };
  const finalCondensedLine = input
    .reduce(condenseLine, '');
  if (previousLineHasContinuation || finalCondensedLine) {
    return [...output, finalCondensedLine]
  }
  return [...output]
}
function tokenisedLines (lines) {
  return lines
    .map(line => line
      .split(cxArrow)
      .map(str => str.split(cxPipe))
    )
}

function isStatebot (object) {
  return (
    isPojo(object) &&
    isNumber(object.__STATEBOT__)
  )
}

const argTypeError = ArgTypeError('statebot.');
function routeIsPossible (machine, route) {
  const err = argTypeError(
    { machine: isStatebot, route: isTemplateLiteral }
  )('routeIsPossible')(machine, route);
  if (err) {
    throw TypeError(err)
  }
  const _route = decomposeRoute(route);
  return _route.every((state, index) => {
    if (index === _route.length - 1) {
      return true
    } else {
      const nextState = _route[index + 1];
      const availableStates = machine.statesAvailableFromHere(state);
      const passes = availableStates.includes(nextState);
      return passes
    }
  })
}
let assertionId = 0;
function assertRoute (machine, expectedRoute, options) {
  const err = argTypeError(
    { machine: isStatebot, expectedRoute: isTemplateLiteral }
  )('assertRoute')(machine, expectedRoute);
  if (err) {
    throw TypeError(err)
  }
  assertionId += 1;
  const {
    description = 'Assertion complete',
    fromState = '',
    run = () => {},
    permittedDeviations = 0,
    timeoutInMs = 1000,
    logLevel = 3
  } = options || {};
  const console = Logger(logLevel);
  const prefix = `Statebot[${machine.name()}]: aId<${assertionId}>`;
  const route = decomposeRoute(expectedRoute);
  console.log(`\n${prefix}: Asserting route: [${route.join(' > ')}]`);
  console.log(`${prefix}: > Assertion will start from state: "${fromState}"`);
  const fromStateActionFn = Defer(run);
  let removeFromStateActionFn = () => { };
  const totalTimeTaken = TimeTaken();
  let stateTimeTaken = TimeTaken();
  let assertionTimeoutTimer;
  let deviations = 0;
  let pending = true;
  let unexpected = false;
  const consumeRoute = [...route];
  const report = Table(
    ['state', 'expected', 'info', 'took'],
    ['center', 'center', 'left', 'right']
  );
  const finaliseReport = Once(err => {
    addRow('', '', '', 'TOTAL: ' + totalTimeTaken());
    report.lock();
    console.log(`\n${prefix}: ${description}: [${err ? 'FAILED' : 'SUCCESS'}]`);
    console.table(report.content());
    return err
  });
  const { addRow } = report;
  function enteredState (state) {
    if (pending) {
      addRow(state, '-', 'PENDING');
    } else {
      const expectedState = consumeRoute[0];
      if (expectedState === state) {
        addRow(state, expectedState, unexpected ? 'REALIGNED' : 'OKAY', stateTimeTaken());
        unexpected = false;
        consumeRoute.shift();
      } else {
        addRow(state, expectedState, 'WRONG STATE', stateTimeTaken());
        unexpected = true;
        deviations += 1;
      }
      stateTimeTaken = TimeTaken();
    }
  }
  return new Promise((resolve, reject) => {
    if (consumeRoute.length === 0) {
      reject(finaliseReport(new Error('NO ROUTE TO TEST')));
      return
    }
    const clearTimeoutAndResolve = (...args) => {
      clearTimeout(assertionTimeoutTimer);
      removeFromStateActionFn();
      removeOnSwitchingListener();
      resolve(...args);
    };
    const clearTimeoutAndReject = err => {
      clearTimeout(assertionTimeoutTimer);
      removeFromStateActionFn();
      removeOnSwitchingListener();
      reject(err);
    };
    const bailout = message => {
      while (consumeRoute.length) {
        const expectedState = consumeRoute.shift();
        addRow(machine.currentState(), `(${expectedState})`, message);
        unexpected = false;
      }
      clearTimeoutAndReject(finaliseReport(new Error(message)));
    };
    if (machine.inState(fromState)) {
      pending = false;
      removeFromStateActionFn = fromStateActionFn();
    }
    const { revoke, fn } = Revokable(state => {
      assertionTimeoutTimer = setTimeout(() => {
        revoke();
        bailout('TIMEOUT');
      }, timeoutInMs);
      enteredState(state);
      if (pending && state === fromState) {
        pending = false;
        removeFromStateActionFn = fromStateActionFn();
      }
      if (deviations > permittedDeviations) {
        revoke();
        bailout('TOO MANY DEVIATIONS');
      }
      if (consumeRoute.length <= 0) {
        revoke();
        clearTimeoutAndResolve(finaliseReport());
      }
    });
    const removeOnSwitchingListener = machine.onSwitching(fn);
  })
}
function Table (columns, alignments) {
  columns = columns || [];
  alignments = alignments || [];
  const table = [];
  const alignment = columns.map((_, index) => alignments[index] || 'center');
  let locked = false;
  function lock () {
    locked = true;
  }
  function addRow (...args) {
    if (locked) {
      return
    }
    const obj = columns.reduce((acc, col, index) => {
      const row = args[index] || '';
      return {
        ...acc,
        [col]: row
      }
    }, {});
    table.push(obj);
  }
  function colSizes () {
    return table.reduce(
      (acc, row) => columns.map(
        (col, index) => Math.max(row[col].length, acc[index])
      ), columns.map(() => 0)
    )
  }
  function content () {
    const sizes = colSizes();
    function formatField (value, index) {
      const size = sizes[index];
      const align = alignment[index];
      if (align === 'left') {
        return value.padEnd(size)
      }
      if (align === 'right') {
        return value.padStart(size)
      }
      return value
    }
    const output = table.reduce((acc, row) => {
      const formattedRow = columns.reduce((acc, col, index) => ({
        ...acc,
        [col]: formatField(row[col], index)
      }), {});
      return [...acc, formattedRow]
    }, []);
    return output
  }
  return {
    lock: lock,
    addRow: addRow,
    content: content
  }
}
function TimeTaken () {
  const startTime = Date.now();
  function fmt (num, digits) {
    return num.toFixed(digits).replace(/\.0+$/, '')
  }
  return function () {
    const duration = Date.now() - startTime;
    if (duration < 500) {
      return `${fmt(duration)} ms`
    } else if (duration < 5000) {
      return `${fmt(duration / 1000, 2)} s `
    } else if (duration < 60000) {
      return `${fmt(duration / 1000, 1)} s `
    } else {
      return `${fmt(duration / 1000 / 60, 1)} m `
    }
  }
}

exports.assertRoute = assertRoute;
exports.routeIsPossible = routeIsPossible;
//# sourceMappingURL=index.cjs.map
