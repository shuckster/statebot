/*
 * Statebot
 * v4.0.0
 * https://shuckster.github.io/statebot/
 * License: MIT
 */
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// assert/index.mjs
var index_exports = {};
__export(index_exports, {
  assertRoute: () => assertRoute,
  routeIsPossible: () => routeIsPossible
});
module.exports = __toCommonJS(index_exports);

// src/types.js
function isEventEmitter(obj) {
  return isObject(obj) && isFunction(obj.emit) && (isFunction(obj.addListener) || isFunction(obj.on)) && (isFunction(obj.removeListener) || isFunction(obj.off));
}
isEventEmitter.displayName = "isEventEmitter";
isArray.displayName = "isUnset";
function isArray(obj) {
  return Array.isArray(obj);
}
isArray.displayName = "isArray";
function isArguments(obj) {
  return Object.prototype.toString.call(obj) === "[object Arguments]";
}
isArguments.displayName = "isArguments";
function isBoolean(obj) {
  return obj === true || obj === false;
}
isBoolean.displayName = "isBoolean";
function isFunction(obj) {
  return typeof obj === "function";
}
isFunction.displayName = "isFunction";
function isString(obj) {
  return typeof obj === "string";
}
isString.displayName = "isString";
function isAllStrings(arr) {
  return isArray(arr) && arr.every(isString);
}
isAllStrings.displayName = "isAllStrings";
function isUndefined(obj) {
  return obj === void 0;
}
isUndefined.displayName = "isUndefined";
function isNull(obj) {
  return obj === null;
}
isNull.displayName = "isNull";
function isNumber(obj) {
  return typeof obj === "number";
}
isNumber.displayName = "isNumber";
function isObject(obj) {
  return typeof obj === "object" && !isNull(obj);
}
isObject.displayName = "isObject";
function isPojo(obj) {
  if (isNull(obj) || !isObject(obj) || isArguments(obj)) {
    return false;
  }
  return Object.getPrototypeOf(obj) === Object.prototype;
}
isPojo.displayName = "isPojo";
function isTemplateLiteral(obj) {
  if (isString(obj)) {
    return true;
  }
  if (!isArray(obj)) {
    return false;
  }
  return obj.every(isString);
}
isTemplateLiteral.displayName = "isTemplateLiteral";
var typeErrorStringIfFnReturnsFalse = (argName, argTypeFn, arg) => {
  return argTypeFn(arg) ? void 0 : (argTypeFn.displayName || argTypeFn.name) + `(${argName}) did not return true`;
};
var typeErrorStringIfTypeOfFails = (argName, argType, arg) => {
  return typeof arg === argType ? void 0 : `Argument "${argName}" should be a ${argType}`;
};
var typeErrorStringFromArgument = (argMap) => (arg, index) => {
  if (index >= argMap.length) {
    return;
  }
  const { argName, argType } = argMap[index];
  if (isUndefined(arg)) {
    return `Argument undefined: "${argName}"`;
  }
  const permittedArgTypes = Array.isArray(argType) ? argType : [argType];
  const errorDescs = permittedArgTypes.map(
    (argType2) => isFunction(argType2) ? typeErrorStringIfFnReturnsFalse(argName, argType2, arg) : typeErrorStringIfTypeOfFails(argName, argType2, arg)
  ).filter(isString);
  const multipleTypesSpecified = permittedArgTypes.length > 1;
  const shouldError = multipleTypesSpecified ? errorDescs.length > 1 : errorDescs.length;
  if (shouldError) {
    return errorDescs.join("\n| ") + `
> typeof ${argName} === ${typeof arg}(${JSON.stringify(arg)})`;
  }
};
function ArgTypeError(namespace) {
  return (typeMap) => {
    const argMap = Object.entries(typeMap).map(([argName, argType]) => ({
      argName,
      argType
    }));
    return (fnName) => (...args) => {
      const processedArgs = Array.from(args, (x) => isArguments(x) ? Array.from(x) : x).flat(1);
      const err = processedArgs.map(typeErrorStringFromArgument(argMap)).filter(isString);
      if (!err.length) {
        return;
      }
      const signature = Object.keys(typeMap).join(", ");
      return `
${namespace || ""}${fnName}(${signature}):
${err.map((err2) => `| ${err2}`).join("\n")}`;
    };
  };
}

// src/utils.js
function defer(fn, ...args) {
  const timer = setTimeout(fn, 0, ...args);
  return () => {
    clearTimeout(timer);
  };
}
function Defer(fn) {
  return (...args) => defer(fn, ...args);
}
function Once(fn) {
  const { revoke, fn: _fn } = Revokable(fn);
  let result;
  return function(...args) {
    result = _fn(...args);
    revoke();
    return result;
  };
}
function Revokable(fn) {
  let revoked = false;
  let result;
  return {
    fn: (...args) => {
      if (!revoked) {
        result = fn(...args);
      }
      return result;
    },
    revoke: () => {
      revoked = true;
    }
  };
}
function Logger(level, _console) {
  if (isString(level)) {
    level = {
      info: 3,
      log: 2,
      warn: 1,
      none: 0
    }[level] || 3;
  }
  function canWarn() {
    return level >= 1;
  }
  function canLog() {
    return level >= 2;
  }
  function canInfo() {
    return level >= 3;
  }
  const { info, table, log, warn, error } = _console || console;
  return {
    canWarn,
    canLog,
    canInfo,
    info: (...args) => {
      canInfo() && info(...args);
    },
    table: (...args) => {
      canLog() && table(...args);
    },
    log: (...args) => {
      canLog() && log(...args);
    },
    warn: (...args) => {
      canWarn() && warn(...args);
    },
    error: (...args) => {
      error(...args);
    }
  };
}

// src/parsing.js
var rxCRLF = /[\r\n]/;
var cxPipe = "|";
var cxArrow = "->";
var rxOperators = [cxPipe, cxArrow].map((rxUnsafe) => rxUnsafe.replace("|", "\\|")).join("|");
var rxLineContinuations = new RegExp(`(${rxOperators})$`);
var rxDisallowedCharacters = /[^a-z0-9!@#$%^&*:_+=<>|~.\x2D]/gi;
var rxComment = /(\/\/[^\n\r]*)/;
var argTypeError = ArgTypeError("statebot.");
function decomposeRoute(templateLiteral) {
  const err = argTypeError(
    { templateLiteral: isTemplateLiteral }
  )("decomposeRoute")(templateLiteral);
  if (err) {
    throw TypeError(err);
  }
  const lines = condensedLines(templateLiteral);
  const linesOfTokens = tokenisedLines(lines);
  const route = linesOfTokens.flat(2);
  return route;
}
function linesFrom(strOrArr) {
  return [strOrArr].flat().reduce((acc, line) => [...acc, ...line.split(rxCRLF)], []);
}
function condensedLines(strOrArr) {
  const input = linesFrom(strOrArr);
  const output = [];
  let previousLineHasContinuation = false;
  const condenseLine = (condensedLine, line) => {
    const sanitisedLine = line.replace(rxComment, "").replace(rxDisallowedCharacters, "");
    if (!sanitisedLine) {
      return condensedLine;
    }
    previousLineHasContinuation = rxLineContinuations.test(sanitisedLine);
    if (previousLineHasContinuation) {
      return condensedLine + sanitisedLine;
    }
    output.push(condensedLine + sanitisedLine);
    return "";
  };
  const finalCondensedLine = input.reduce(condenseLine, "");
  if (previousLineHasContinuation || finalCondensedLine) {
    return [...output, finalCondensedLine];
  }
  return [...output];
}
function tokenisedLines(lines) {
  return lines.map(
    (line) => line.split(cxArrow).map((str) => str.split(cxPipe))
  );
}

// src/statebot.js
var ON_SWITCHING = "onSwitching";
var ON_SWITCHED = "onSwitched";
var INTERNAL_EVENTS = {
  [ON_SWITCHING]: "(ANY)state:changing",
  [ON_SWITCHED]: "(ANY)state:changed"
};
function isStatebot(object) {
  return isPojo(object) && isNumber(object.__STATEBOT__);
}

// assert/index.mjs
var argTypeError2 = ArgTypeError("statebot.");
function routeIsPossible(machine, route) {
  const err = argTypeError2(
    { machine: isStatebot, route: isTemplateLiteral }
  )("routeIsPossible")(machine, route);
  if (err) {
    throw TypeError(err);
  }
  const _route = decomposeRoute(route);
  return _route.every((state, index) => {
    if (index === _route.length - 1) {
      return true;
    } else {
      const nextState = _route[index + 1];
      const availableStates = machine.statesAvailableFromHere(state);
      const passes = availableStates.includes(nextState);
      return passes;
    }
  });
}
var assertionId = 0;
function assertRoute(machine, expectedRoute, options) {
  const err = argTypeError2(
    { machine: isStatebot, expectedRoute: isTemplateLiteral }
  )("assertRoute")(machine, expectedRoute);
  if (err) {
    throw TypeError(err);
  }
  assertionId += 1;
  const {
    description = "Assertion complete",
    fromState = "",
    run = () => {
    },
    permittedDeviations = 0,
    timeoutInMs = 1e3,
    logLevel = 3
  } = options || {};
  const console2 = Logger(logLevel);
  const prefix = `Statebot[${machine.name()}]: aId<${assertionId}>`;
  const route = decomposeRoute(expectedRoute);
  console2.log(`
${prefix}: Asserting route: [${route.join(" > ")}]`);
  console2.log(`${prefix}: > Assertion will start from state: "${fromState}"`);
  const fromStateActionFn = Defer(run);
  let removeFromStateActionFn = () => {
  };
  const totalTimeTaken = TimeTaken();
  let stateTimeTaken = TimeTaken();
  let assertionTimeoutTimer;
  let deviations = 0;
  let pending = true;
  let unexpected = false;
  const consumeRoute = [...route];
  const report = Table(
    ["state", "expected", "info", "took"],
    ["center", "center", "left", "right"]
  );
  const finaliseReport = Once((err2) => {
    addRow("", "", "", "TOTAL: " + totalTimeTaken());
    report.lock();
    console2.log(`
${prefix}: ${description}: [${err2 ? "FAILED" : "SUCCESS"}]`);
    console2.table(report.content());
    return err2;
  });
  const { addRow } = report;
  function enteredState(state) {
    if (pending) {
      addRow(state, "-", "PENDING");
    } else {
      const expectedState = consumeRoute[0];
      if (expectedState === state) {
        addRow(state, expectedState, unexpected ? "REALIGNED" : "OKAY", stateTimeTaken());
        unexpected = false;
        consumeRoute.shift();
      } else {
        addRow(state, expectedState, "WRONG STATE", stateTimeTaken());
        unexpected = true;
        deviations += 1;
      }
      stateTimeTaken = TimeTaken();
    }
  }
  return new Promise((resolve, reject) => {
    if (consumeRoute.length === 0) {
      reject(finaliseReport(new Error("NO ROUTE TO TEST")));
      return;
    }
    const clearTimeoutAndResolve = (...args) => {
      clearTimeout(assertionTimeoutTimer);
      removeFromStateActionFn();
      removeOnSwitchingListener();
      resolve(...args);
    };
    const clearTimeoutAndReject = (err2) => {
      clearTimeout(assertionTimeoutTimer);
      removeFromStateActionFn();
      removeOnSwitchingListener();
      reject(err2);
    };
    const bailout = (message) => {
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
    const { revoke, fn } = Revokable((state) => {
      assertionTimeoutTimer = setTimeout(() => {
        revoke();
        bailout("TIMEOUT");
      }, timeoutInMs);
      enteredState(state);
      if (pending && state === fromState) {
        pending = false;
        removeFromStateActionFn = fromStateActionFn();
      }
      if (deviations > permittedDeviations) {
        revoke();
        bailout("TOO MANY DEVIATIONS");
      }
      if (consumeRoute.length <= 0) {
        revoke();
        clearTimeoutAndResolve(finaliseReport());
      }
    });
    const removeOnSwitchingListener = machine.onSwitching(fn);
  });
}
function Table(columns, alignments) {
  columns = columns || [];
  alignments = alignments || [];
  const table = [];
  const alignment = columns.map((_, index) => alignments[index] || "center");
  let locked = false;
  function lock() {
    locked = true;
  }
  function addRow(...args) {
    if (locked) {
      return;
    }
    const obj = columns.reduce((acc, col, index) => {
      const row = args[index] || "";
      return {
        ...acc,
        [col]: row
      };
    }, {});
    table.push(obj);
  }
  function colSizes() {
    return table.reduce(
      (acc, row) => columns.map(
        (col, index) => Math.max(row[col].length, acc[index])
      ),
      columns.map(() => 0)
    );
  }
  function content() {
    const sizes = colSizes();
    function formatField(value, index) {
      const size = sizes[index];
      const align = alignment[index];
      if (align === "left") {
        return value.padEnd(size);
      }
      if (align === "right") {
        return value.padStart(size);
      }
      return value;
    }
    const output = table.reduce((acc, row) => {
      const formattedRow = columns.reduce((acc2, col, index) => ({
        ...acc2,
        [col]: formatField(row[col], index)
      }), {});
      return [...acc, formattedRow];
    }, []);
    return output;
  }
  return {
    lock,
    addRow,
    content
  };
}
function TimeTaken() {
  const startTime = Date.now();
  function fmt(num, digits) {
    return num.toFixed(digits).replace(/\.0+$/, "");
  }
  return function() {
    const duration = Date.now() - startTime;
    if (duration < 500) {
      return `${fmt(duration)} ms`;
    } else if (duration < 5e3) {
      return `${fmt(duration / 1e3, 2)} s `;
    } else if (duration < 6e4) {
      return `${fmt(duration / 1e3, 1)} s `;
    } else {
      return `${fmt(duration / 1e3 / 60, 1)} m `;
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assertRoute,
  routeIsPossible
});
//# sourceMappingURL=index.cjs.map
