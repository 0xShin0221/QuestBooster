
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/json-logic-js/logic.js
  var require_logic = __commonJS({
    "node_modules/json-logic-js/logic.js"(exports, module) {
      (function(root, factory) {
        if (typeof define === "function" && define.amd) {
          define(factory);
        } else if (typeof exports === "object") {
          module.exports = factory();
        } else {
          root.jsonLogic = factory();
        }
      })(exports, function() {
        "use strict";
        if (!Array.isArray) {
          Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === "[object Array]";
          };
        }
        function arrayUnique(array) {
          var a = [];
          for (var i = 0, l = array.length; i < l; i++) {
            if (a.indexOf(array[i]) === -1) {
              a.push(array[i]);
            }
          }
          return a;
        }
        var jsonLogic2 = {};
        var operations = {
          "==": function(a, b) {
            return a == b;
          },
          "===": function(a, b) {
            return a === b;
          },
          "!=": function(a, b) {
            return a != b;
          },
          "!==": function(a, b) {
            return a !== b;
          },
          ">": function(a, b) {
            return a > b;
          },
          ">=": function(a, b) {
            return a >= b;
          },
          "<": function(a, b, c) {
            return c === void 0 ? a < b : a < b && b < c;
          },
          "<=": function(a, b, c) {
            return c === void 0 ? a <= b : a <= b && b <= c;
          },
          "!!": function(a) {
            return jsonLogic2.truthy(a);
          },
          "!": function(a) {
            return !jsonLogic2.truthy(a);
          },
          "%": function(a, b) {
            return a % b;
          },
          "log": function(a) {
            console.log(a);
            return a;
          },
          "in": function(a, b) {
            if (!b || typeof b.indexOf === "undefined")
              return false;
            return b.indexOf(a) !== -1;
          },
          "cat": function() {
            return Array.prototype.join.call(arguments, "");
          },
          "substr": function(source, start, end) {
            if (end < 0) {
              var temp = String(source).substr(start);
              return temp.substr(0, temp.length + end);
            }
            return String(source).substr(start, end);
          },
          "+": function() {
            return Array.prototype.reduce.call(arguments, function(a, b) {
              return parseFloat(a, 10) + parseFloat(b, 10);
            }, 0);
          },
          "*": function() {
            return Array.prototype.reduce.call(arguments, function(a, b) {
              return parseFloat(a, 10) * parseFloat(b, 10);
            });
          },
          "-": function(a, b) {
            if (b === void 0) {
              return -a;
            } else {
              return a - b;
            }
          },
          "/": function(a, b) {
            return a / b;
          },
          "min": function() {
            return Math.min.apply(this, arguments);
          },
          "max": function() {
            return Math.max.apply(this, arguments);
          },
          "merge": function() {
            return Array.prototype.reduce.call(arguments, function(a, b) {
              return a.concat(b);
            }, []);
          },
          "var": function(a, b) {
            var not_found = b === void 0 ? null : b;
            var data = this;
            if (typeof a === "undefined" || a === "" || a === null) {
              return data;
            }
            var sub_props = String(a).split(".");
            for (var i = 0; i < sub_props.length; i++) {
              if (data === null || data === void 0) {
                return not_found;
              }
              data = data[sub_props[i]];
              if (data === void 0) {
                return not_found;
              }
            }
            return data;
          },
          "missing": function() {
            var missing = [];
            var keys4 = Array.isArray(arguments[0]) ? arguments[0] : arguments;
            for (var i = 0; i < keys4.length; i++) {
              var key = keys4[i];
              var value = jsonLogic2.apply({ "var": key }, this);
              if (value === null || value === "") {
                missing.push(key);
              }
            }
            return missing;
          },
          "missing_some": function(need_count, options) {
            var are_missing = jsonLogic2.apply({ "missing": options }, this);
            if (options.length - are_missing.length >= need_count) {
              return [];
            } else {
              return are_missing;
            }
          }
        };
        jsonLogic2.is_logic = function(logic) {
          return typeof logic === "object" && logic !== null && !Array.isArray(logic) && Object.keys(logic).length === 1;
        };
        jsonLogic2.truthy = function(value) {
          if (Array.isArray(value) && value.length === 0) {
            return false;
          }
          return !!value;
        };
        jsonLogic2.get_operator = function(logic) {
          return Object.keys(logic)[0];
        };
        jsonLogic2.get_values = function(logic) {
          return logic[jsonLogic2.get_operator(logic)];
        };
        jsonLogic2.apply = function(logic, data) {
          if (Array.isArray(logic)) {
            return logic.map(function(l) {
              return jsonLogic2.apply(l, data);
            });
          }
          if (!jsonLogic2.is_logic(logic)) {
            return logic;
          }
          var op = jsonLogic2.get_operator(logic);
          var values = logic[op];
          var i;
          var current;
          var scopedLogic;
          var scopedData;
          var initial;
          if (!Array.isArray(values)) {
            values = [values];
          }
          if (op === "if" || op == "?:") {
            for (i = 0; i < values.length - 1; i += 2) {
              if (jsonLogic2.truthy(jsonLogic2.apply(values[i], data))) {
                return jsonLogic2.apply(values[i + 1], data);
              }
            }
            if (values.length === i + 1) {
              return jsonLogic2.apply(values[i], data);
            }
            return null;
          } else if (op === "and") {
            for (i = 0; i < values.length; i += 1) {
              current = jsonLogic2.apply(values[i], data);
              if (!jsonLogic2.truthy(current)) {
                return current;
              }
            }
            return current;
          } else if (op === "or") {
            for (i = 0; i < values.length; i += 1) {
              current = jsonLogic2.apply(values[i], data);
              if (jsonLogic2.truthy(current)) {
                return current;
              }
            }
            return current;
          } else if (op === "filter") {
            scopedData = jsonLogic2.apply(values[0], data);
            scopedLogic = values[1];
            if (!Array.isArray(scopedData)) {
              return [];
            }
            return scopedData.filter(function(datum) {
              return jsonLogic2.truthy(jsonLogic2.apply(scopedLogic, datum));
            });
          } else if (op === "map") {
            scopedData = jsonLogic2.apply(values[0], data);
            scopedLogic = values[1];
            if (!Array.isArray(scopedData)) {
              return [];
            }
            return scopedData.map(function(datum) {
              return jsonLogic2.apply(scopedLogic, datum);
            });
          } else if (op === "reduce") {
            scopedData = jsonLogic2.apply(values[0], data);
            scopedLogic = values[1];
            initial = typeof values[2] !== "undefined" ? values[2] : null;
            if (!Array.isArray(scopedData)) {
              return initial;
            }
            return scopedData.reduce(
              function(accumulator, current2) {
                return jsonLogic2.apply(
                  scopedLogic,
                  { current: current2, accumulator }
                );
              },
              initial
            );
          } else if (op === "all") {
            scopedData = jsonLogic2.apply(values[0], data);
            scopedLogic = values[1];
            if (!Array.isArray(scopedData) || !scopedData.length) {
              return false;
            }
            for (i = 0; i < scopedData.length; i += 1) {
              if (!jsonLogic2.truthy(jsonLogic2.apply(scopedLogic, scopedData[i]))) {
                return false;
              }
            }
            return true;
          } else if (op === "none") {
            scopedData = jsonLogic2.apply(values[0], data);
            scopedLogic = values[1];
            if (!Array.isArray(scopedData) || !scopedData.length) {
              return true;
            }
            for (i = 0; i < scopedData.length; i += 1) {
              if (jsonLogic2.truthy(jsonLogic2.apply(scopedLogic, scopedData[i]))) {
                return false;
              }
            }
            return true;
          } else if (op === "some") {
            scopedData = jsonLogic2.apply(values[0], data);
            scopedLogic = values[1];
            if (!Array.isArray(scopedData) || !scopedData.length) {
              return false;
            }
            for (i = 0; i < scopedData.length; i += 1) {
              if (jsonLogic2.truthy(jsonLogic2.apply(scopedLogic, scopedData[i]))) {
                return true;
              }
            }
            return false;
          }
          values = values.map(function(val) {
            return jsonLogic2.apply(val, data);
          });
          if (operations.hasOwnProperty(op) && typeof operations[op] === "function") {
            return operations[op].apply(data, values);
          } else if (op.indexOf(".") > 0) {
            var sub_ops = String(op).split(".");
            var operation = operations;
            for (i = 0; i < sub_ops.length; i++) {
              if (!operation.hasOwnProperty(sub_ops[i])) {
                throw new Error("Unrecognized operation " + op + " (failed at " + sub_ops.slice(0, i + 1).join(".") + ")");
              }
              operation = operation[sub_ops[i]];
            }
            return operation.apply(data, values);
          }
          throw new Error("Unrecognized operation " + op);
        };
        jsonLogic2.uses_data = function(logic) {
          var collection = [];
          if (jsonLogic2.is_logic(logic)) {
            var op = jsonLogic2.get_operator(logic);
            var values = logic[op];
            if (!Array.isArray(values)) {
              values = [values];
            }
            if (op === "var") {
              collection.push(values[0]);
            } else {
              values.forEach(function(val) {
                collection.push.apply(collection, jsonLogic2.uses_data(val));
              });
            }
          }
          return arrayUnique(collection);
        };
        jsonLogic2.add_operation = function(name, code) {
          operations[name] = code;
        };
        jsonLogic2.rm_operation = function(name) {
          delete operations[name];
        };
        jsonLogic2.rule_like = function(rule, pattern) {
          if (pattern === rule) {
            return true;
          }
          if (pattern === "@") {
            return true;
          }
          if (pattern === "number") {
            return typeof rule === "number";
          }
          if (pattern === "string") {
            return typeof rule === "string";
          }
          if (pattern === "array") {
            return Array.isArray(rule) && !jsonLogic2.is_logic(rule);
          }
          if (jsonLogic2.is_logic(pattern)) {
            if (jsonLogic2.is_logic(rule)) {
              var pattern_op = jsonLogic2.get_operator(pattern);
              var rule_op = jsonLogic2.get_operator(rule);
              if (pattern_op === "@" || pattern_op === rule_op) {
                return jsonLogic2.rule_like(
                  jsonLogic2.get_values(rule, false),
                  jsonLogic2.get_values(pattern, false)
                );
              }
            }
            return false;
          }
          if (Array.isArray(pattern)) {
            if (Array.isArray(rule)) {
              if (pattern.length !== rule.length) {
                return false;
              }
              for (var i = 0; i < pattern.length; i += 1) {
                if (!jsonLogic2.rule_like(rule[i], pattern[i])) {
                  return false;
                }
              }
              return true;
            } else {
              return false;
            }
          }
          return false;
        };
        return jsonLogic2;
      });
    }
  });

  // node_modules/punycode/punycode.js
  var require_punycode = __commonJS({
    "node_modules/punycode/punycode.js"(exports, module) {
      (function(root) {
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = typeof module == "object" && module && !module.nodeType && module;
        var freeGlobal = typeof global == "object" && global;
        if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
          root = freeGlobal;
        }
        var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
          "overflow": "Overflow: input needs wider integers to process",
          "not-basic": "Illegal input >= 0x80 (not a basic code point)",
          "invalid-input": "Invalid input"
        }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
        function error(type3) {
          throw RangeError(errors[type3]);
        }
        function map(array, fn) {
          var length = array.length;
          var result = [];
          while (length--) {
            result[length] = fn(array[length]);
          }
          return result;
        }
        function mapDomain(string, fn) {
          var parts = string.split("@");
          var result = "";
          if (parts.length > 1) {
            result = parts[0] + "@";
            string = parts[1];
          }
          string = string.replace(regexSeparators, ".");
          var labels = string.split(".");
          var encoded = map(labels, fn).join(".");
          return result + encoded;
        }
        function ucs2decode(string) {
          var output = [], counter = 0, length = string.length, value, extra;
          while (counter < length) {
            value = string.charCodeAt(counter++);
            if (value >= 55296 && value <= 56319 && counter < length) {
              extra = string.charCodeAt(counter++);
              if ((extra & 64512) == 56320) {
                output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
              } else {
                output.push(value);
                counter--;
              }
            } else {
              output.push(value);
            }
          }
          return output;
        }
        function ucs2encode(array) {
          return map(array, function(value) {
            var output = "";
            if (value > 65535) {
              value -= 65536;
              output += stringFromCharCode(value >>> 10 & 1023 | 55296);
              value = 56320 | value & 1023;
            }
            output += stringFromCharCode(value);
            return output;
          }).join("");
        }
        function basicToDigit(codePoint) {
          if (codePoint - 48 < 10) {
            return codePoint - 22;
          }
          if (codePoint - 65 < 26) {
            return codePoint - 65;
          }
          if (codePoint - 97 < 26) {
            return codePoint - 97;
          }
          return base;
        }
        function digitToBasic(digit, flag) {
          return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
        }
        function adapt(delta, numPoints, firstTime) {
          var k = 0;
          delta = firstTime ? floor(delta / damp) : delta >> 1;
          delta += floor(delta / numPoints);
          for (; delta > baseMinusTMin * tMax >> 1; k += base) {
            delta = floor(delta / baseMinusTMin);
          }
          return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
        }
        function decode(input) {
          var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, baseMinusT;
          basic = input.lastIndexOf(delimiter);
          if (basic < 0) {
            basic = 0;
          }
          for (j = 0; j < basic; ++j) {
            if (input.charCodeAt(j) >= 128) {
              error("not-basic");
            }
            output.push(input.charCodeAt(j));
          }
          for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
            for (oldi = i, w = 1, k = base; ; k += base) {
              if (index >= inputLength) {
                error("invalid-input");
              }
              digit = basicToDigit(input.charCodeAt(index++));
              if (digit >= base || digit > floor((maxInt - i) / w)) {
                error("overflow");
              }
              i += digit * w;
              t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
              if (digit < t) {
                break;
              }
              baseMinusT = base - t;
              if (w > floor(maxInt / baseMinusT)) {
                error("overflow");
              }
              w *= baseMinusT;
            }
            out = output.length + 1;
            bias = adapt(i - oldi, out, oldi == 0);
            if (floor(i / out) > maxInt - n) {
              error("overflow");
            }
            n += floor(i / out);
            i %= out;
            output.splice(i++, 0, n);
          }
          return ucs2encode(output);
        }
        function encode(input) {
          var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
          input = ucs2decode(input);
          inputLength = input.length;
          n = initialN;
          delta = 0;
          bias = initialBias;
          for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue < 128) {
              output.push(stringFromCharCode(currentValue));
            }
          }
          handledCPCount = basicLength = output.length;
          if (basicLength) {
            output.push(delimiter);
          }
          while (handledCPCount < inputLength) {
            for (m = maxInt, j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue >= n && currentValue < m) {
                m = currentValue;
              }
            }
            handledCPCountPlusOne = handledCPCount + 1;
            if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
              error("overflow");
            }
            delta += (m - n) * handledCPCountPlusOne;
            n = m;
            for (j = 0; j < inputLength; ++j) {
              currentValue = input[j];
              if (currentValue < n && ++delta > maxInt) {
                error("overflow");
              }
              if (currentValue == n) {
                for (q = delta, k = base; ; k += base) {
                  t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                  if (q < t) {
                    break;
                  }
                  qMinusT = q - t;
                  baseMinusT = base - t;
                  output.push(
                    stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
                  );
                  q = floor(qMinusT / baseMinusT);
                }
                output.push(stringFromCharCode(digitToBasic(q, 0)));
                bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                delta = 0;
                ++handledCPCount;
              }
            }
            ++delta;
            ++n;
          }
          return output.join("");
        }
        function toUnicode(input) {
          return mapDomain(input, function(string) {
            return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
          });
        }
        function toASCII(input) {
          return mapDomain(input, function(string) {
            return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
          });
        }
        punycode = {
          "version": "1.3.2",
          "ucs2": {
            "decode": ucs2decode,
            "encode": ucs2encode
          },
          "decode": decode,
          "encode": encode,
          "toASCII": toASCII,
          "toUnicode": toUnicode
        };
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          define("punycode", function() {
            return punycode;
          });
        } else if (freeExports && freeModule) {
          if (module.exports == freeExports) {
            freeModule.exports = punycode;
          } else {
            for (key in punycode) {
              punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
            }
          }
        } else {
          root.punycode = punycode;
        }
      })(exports);
    }
  });

  // node_modules/url/util.js
  var require_util = __commonJS({
    "node_modules/url/util.js"(exports, module) {
      "use strict";
      module.exports = {
        isString: function(arg) {
          return typeof arg === "string";
        },
        isObject: function(arg) {
          return typeof arg === "object" && arg !== null;
        },
        isNull: function(arg) {
          return arg === null;
        },
        isNullOrUndefined: function(arg) {
          return arg == null;
        }
      };
    }
  });

  // node_modules/querystring/decode.js
  var require_decode = __commonJS({
    "node_modules/querystring/decode.js"(exports, module) {
      "use strict";
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      module.exports = function(qs, sep, eq, options) {
        sep = sep || "&";
        eq = eq || "=";
        var obj = {};
        if (typeof qs !== "string" || qs.length === 0) {
          return obj;
        }
        var regexp = /\+/g;
        qs = qs.split(sep);
        var maxKeys = 1e3;
        if (options && typeof options.maxKeys === "number") {
          maxKeys = options.maxKeys;
        }
        var len = qs.length;
        if (maxKeys > 0 && len > maxKeys) {
          len = maxKeys;
        }
        for (var i = 0; i < len; ++i) {
          var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
          if (idx >= 0) {
            kstr = x.substr(0, idx);
            vstr = x.substr(idx + 1);
          } else {
            kstr = x;
            vstr = "";
          }
          k = decodeURIComponent(kstr);
          v = decodeURIComponent(vstr);
          if (!hasOwnProperty(obj, k)) {
            obj[k] = v;
          } else if (Array.isArray(obj[k])) {
            obj[k].push(v);
          } else {
            obj[k] = [obj[k], v];
          }
        }
        return obj;
      };
    }
  });

  // node_modules/querystring/encode.js
  var require_encode = __commonJS({
    "node_modules/querystring/encode.js"(exports, module) {
      "use strict";
      var stringifyPrimitive = function(v) {
        switch (typeof v) {
          case "string":
            return v;
          case "boolean":
            return v ? "true" : "false";
          case "number":
            return isFinite(v) ? v : "";
          default:
            return "";
        }
      };
      module.exports = function(obj, sep, eq, name) {
        sep = sep || "&";
        eq = eq || "=";
        if (obj === null) {
          obj = void 0;
        }
        if (typeof obj === "object") {
          return Object.keys(obj).map(function(k) {
            var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
            if (Array.isArray(obj[k])) {
              return obj[k].map(function(v) {
                return ks + encodeURIComponent(stringifyPrimitive(v));
              }).join(sep);
            } else {
              return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
            }
          }).join(sep);
        }
        if (!name)
          return "";
        return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
      };
    }
  });

  // node_modules/querystring/index.js
  var require_querystring = __commonJS({
    "node_modules/querystring/index.js"(exports) {
      "use strict";
      exports.decode = exports.parse = require_decode();
      exports.encode = exports.stringify = require_encode();
    }
  });

  // node_modules/url/url.js
  var require_url = __commonJS({
    "node_modules/url/url.js"(exports) {
      "use strict";
      var punycode = require_punycode();
      var util = require_util();
      exports.parse = urlParse;
      exports.resolve = urlResolve;
      exports.resolveObject = urlResolveObject;
      exports.format = urlFormat;
      exports.Url = Url;
      function Url() {
        this.protocol = null;
        this.slashes = null;
        this.auth = null;
        this.host = null;
        this.port = null;
        this.hostname = null;
        this.hash = null;
        this.search = null;
        this.query = null;
        this.pathname = null;
        this.path = null;
        this.href = null;
      }
      var protocolPattern = /^([a-z0-9.+-]+:)/i;
      var portPattern = /:[0-9]*$/;
      var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
      var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
      var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
      var autoEscape = ["'"].concat(unwise);
      var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
      var hostEndingChars = ["/", "?", "#"];
      var hostnameMaxLen = 255;
      var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
      var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
      var unsafeProtocol = {
        "javascript": true,
        "javascript:": true
      };
      var hostlessProtocol = {
        "javascript": true,
        "javascript:": true
      };
      var slashedProtocol = {
        "http": true,
        "https": true,
        "ftp": true,
        "gopher": true,
        "file": true,
        "http:": true,
        "https:": true,
        "ftp:": true,
        "gopher:": true,
        "file:": true
      };
      var querystring = require_querystring();
      function urlParse(url, parseQueryString, slashesDenoteHost) {
        if (url && util.isObject(url) && url instanceof Url)
          return url;
        var u = new Url();
        u.parse(url, parseQueryString, slashesDenoteHost);
        return u;
      }
      Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
        if (!util.isString(url)) {
          throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
        }
        var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
        uSplit[0] = uSplit[0].replace(slashRegex, "/");
        url = uSplit.join(splitter);
        var rest = url;
        rest = rest.trim();
        if (!slashesDenoteHost && url.split("#").length === 1) {
          var simplePath = simplePathPattern.exec(rest);
          if (simplePath) {
            this.path = rest;
            this.href = rest;
            this.pathname = simplePath[1];
            if (simplePath[2]) {
              this.search = simplePath[2];
              if (parseQueryString) {
                this.query = querystring.parse(this.search.substr(1));
              } else {
                this.query = this.search.substr(1);
              }
            } else if (parseQueryString) {
              this.search = "";
              this.query = {};
            }
            return this;
          }
        }
        var proto = protocolPattern.exec(rest);
        if (proto) {
          proto = proto[0];
          var lowerProto = proto.toLowerCase();
          this.protocol = lowerProto;
          rest = rest.substr(proto.length);
        }
        if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
          var slashes = rest.substr(0, 2) === "//";
          if (slashes && !(proto && hostlessProtocol[proto])) {
            rest = rest.substr(2);
            this.slashes = true;
          }
        }
        if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
          var hostEnd = -1;
          for (var i = 0; i < hostEndingChars.length; i++) {
            var hec = rest.indexOf(hostEndingChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          var auth, atSign;
          if (hostEnd === -1) {
            atSign = rest.lastIndexOf("@");
          } else {
            atSign = rest.lastIndexOf("@", hostEnd);
          }
          if (atSign !== -1) {
            auth = rest.slice(0, atSign);
            rest = rest.slice(atSign + 1);
            this.auth = decodeURIComponent(auth);
          }
          hostEnd = -1;
          for (var i = 0; i < nonHostChars.length; i++) {
            var hec = rest.indexOf(nonHostChars[i]);
            if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
              hostEnd = hec;
          }
          if (hostEnd === -1)
            hostEnd = rest.length;
          this.host = rest.slice(0, hostEnd);
          rest = rest.slice(hostEnd);
          this.parseHost();
          this.hostname = this.hostname || "";
          var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
          if (!ipv6Hostname) {
            var hostparts = this.hostname.split(/\./);
            for (var i = 0, l = hostparts.length; i < l; i++) {
              var part = hostparts[i];
              if (!part)
                continue;
              if (!part.match(hostnamePartPattern)) {
                var newpart = "";
                for (var j = 0, k = part.length; j < k; j++) {
                  if (part.charCodeAt(j) > 127) {
                    newpart += "x";
                  } else {
                    newpart += part[j];
                  }
                }
                if (!newpart.match(hostnamePartPattern)) {
                  var validParts = hostparts.slice(0, i);
                  var notHost = hostparts.slice(i + 1);
                  var bit = part.match(hostnamePartStart);
                  if (bit) {
                    validParts.push(bit[1]);
                    notHost.unshift(bit[2]);
                  }
                  if (notHost.length) {
                    rest = "/" + notHost.join(".") + rest;
                  }
                  this.hostname = validParts.join(".");
                  break;
                }
              }
            }
          }
          if (this.hostname.length > hostnameMaxLen) {
            this.hostname = "";
          } else {
            this.hostname = this.hostname.toLowerCase();
          }
          if (!ipv6Hostname) {
            this.hostname = punycode.toASCII(this.hostname);
          }
          var p = this.port ? ":" + this.port : "";
          var h = this.hostname || "";
          this.host = h + p;
          this.href += this.host;
          if (ipv6Hostname) {
            this.hostname = this.hostname.substr(1, this.hostname.length - 2);
            if (rest[0] !== "/") {
              rest = "/" + rest;
            }
          }
        }
        if (!unsafeProtocol[lowerProto]) {
          for (var i = 0, l = autoEscape.length; i < l; i++) {
            var ae = autoEscape[i];
            if (rest.indexOf(ae) === -1)
              continue;
            var esc = encodeURIComponent(ae);
            if (esc === ae) {
              esc = escape(ae);
            }
            rest = rest.split(ae).join(esc);
          }
        }
        var hash = rest.indexOf("#");
        if (hash !== -1) {
          this.hash = rest.substr(hash);
          rest = rest.slice(0, hash);
        }
        var qm = rest.indexOf("?");
        if (qm !== -1) {
          this.search = rest.substr(qm);
          this.query = rest.substr(qm + 1);
          if (parseQueryString) {
            this.query = querystring.parse(this.query);
          }
          rest = rest.slice(0, qm);
        } else if (parseQueryString) {
          this.search = "";
          this.query = {};
        }
        if (rest)
          this.pathname = rest;
        if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
          this.pathname = "/";
        }
        if (this.pathname || this.search) {
          var p = this.pathname || "";
          var s = this.search || "";
          this.path = p + s;
        }
        this.href = this.format();
        return this;
      };
      function urlFormat(obj) {
        if (util.isString(obj))
          obj = urlParse(obj);
        if (!(obj instanceof Url))
          return Url.prototype.format.call(obj);
        return obj.format();
      }
      Url.prototype.format = function() {
        var auth = this.auth || "";
        if (auth) {
          auth = encodeURIComponent(auth);
          auth = auth.replace(/%3A/i, ":");
          auth += "@";
        }
        var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
        if (this.host) {
          host = auth + this.host;
        } else if (this.hostname) {
          host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
          if (this.port) {
            host += ":" + this.port;
          }
        }
        if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
          query = querystring.stringify(this.query);
        }
        var search = this.search || query && "?" + query || "";
        if (protocol && protocol.substr(-1) !== ":")
          protocol += ":";
        if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
          host = "//" + (host || "");
          if (pathname && pathname.charAt(0) !== "/")
            pathname = "/" + pathname;
        } else if (!host) {
          host = "";
        }
        if (hash && hash.charAt(0) !== "#")
          hash = "#" + hash;
        if (search && search.charAt(0) !== "?")
          search = "?" + search;
        pathname = pathname.replace(/[?#]/g, function(match) {
          return encodeURIComponent(match);
        });
        search = search.replace("#", "%23");
        return protocol + host + pathname + search + hash;
      };
      function urlResolve(source, relative) {
        return urlParse(source, false, true).resolve(relative);
      }
      Url.prototype.resolve = function(relative) {
        return this.resolveObject(urlParse(relative, false, true)).format();
      };
      function urlResolveObject(source, relative) {
        if (!source)
          return relative;
        return urlParse(source, false, true).resolveObject(relative);
      }
      Url.prototype.resolveObject = function(relative) {
        if (util.isString(relative)) {
          var rel = new Url();
          rel.parse(relative, false, true);
          relative = rel;
        }
        var result = new Url();
        var tkeys = Object.keys(this);
        for (var tk = 0; tk < tkeys.length; tk++) {
          var tkey = tkeys[tk];
          result[tkey] = this[tkey];
        }
        result.hash = relative.hash;
        if (relative.href === "") {
          result.href = result.format();
          return result;
        }
        if (relative.slashes && !relative.protocol) {
          var rkeys = Object.keys(relative);
          for (var rk = 0; rk < rkeys.length; rk++) {
            var rkey = rkeys[rk];
            if (rkey !== "protocol")
              result[rkey] = relative[rkey];
          }
          if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
            result.path = result.pathname = "/";
          }
          result.href = result.format();
          return result;
        }
        if (relative.protocol && relative.protocol !== result.protocol) {
          if (!slashedProtocol[relative.protocol]) {
            var keys4 = Object.keys(relative);
            for (var v = 0; v < keys4.length; v++) {
              var k = keys4[v];
              result[k] = relative[k];
            }
            result.href = result.format();
            return result;
          }
          result.protocol = relative.protocol;
          if (!relative.host && !hostlessProtocol[relative.protocol]) {
            var relPath = (relative.pathname || "").split("/");
            while (relPath.length && !(relative.host = relPath.shift()))
              ;
            if (!relative.host)
              relative.host = "";
            if (!relative.hostname)
              relative.hostname = "";
            if (relPath[0] !== "")
              relPath.unshift("");
            if (relPath.length < 2)
              relPath.unshift("");
            result.pathname = relPath.join("/");
          } else {
            result.pathname = relative.pathname;
          }
          result.search = relative.search;
          result.query = relative.query;
          result.host = relative.host || "";
          result.auth = relative.auth;
          result.hostname = relative.hostname || relative.host;
          result.port = relative.port;
          if (result.pathname || result.search) {
            var p = result.pathname || "";
            var s = result.search || "";
            result.path = p + s;
          }
          result.slashes = result.slashes || relative.slashes;
          result.href = result.format();
          return result;
        }
        var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
        if (psychotic) {
          result.hostname = "";
          result.port = null;
          if (result.host) {
            if (srcPath[0] === "")
              srcPath[0] = result.host;
            else
              srcPath.unshift(result.host);
          }
          result.host = "";
          if (relative.protocol) {
            relative.hostname = null;
            relative.port = null;
            if (relative.host) {
              if (relPath[0] === "")
                relPath[0] = relative.host;
              else
                relPath.unshift(relative.host);
            }
            relative.host = null;
          }
          mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
        }
        if (isRelAbs) {
          result.host = relative.host || relative.host === "" ? relative.host : result.host;
          result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
          result.search = relative.search;
          result.query = relative.query;
          srcPath = relPath;
        } else if (relPath.length) {
          if (!srcPath)
            srcPath = [];
          srcPath.pop();
          srcPath = srcPath.concat(relPath);
          result.search = relative.search;
          result.query = relative.query;
        } else if (!util.isNullOrUndefined(relative.search)) {
          if (psychotic) {
            result.hostname = result.host = srcPath.shift();
            var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
            if (authInHost) {
              result.auth = authInHost.shift();
              result.host = result.hostname = authInHost.shift();
            }
          }
          result.search = relative.search;
          result.query = relative.query;
          if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
            result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
          }
          result.href = result.format();
          return result;
        }
        if (!srcPath.length) {
          result.pathname = null;
          if (result.search) {
            result.path = "/" + result.search;
          } else {
            result.path = null;
          }
          result.href = result.format();
          return result;
        }
        var last2 = srcPath.slice(-1)[0];
        var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last2 === "." || last2 === "..") || last2 === "";
        var up = 0;
        for (var i = srcPath.length; i >= 0; i--) {
          last2 = srcPath[i];
          if (last2 === ".") {
            srcPath.splice(i, 1);
          } else if (last2 === "..") {
            srcPath.splice(i, 1);
            up++;
          } else if (up) {
            srcPath.splice(i, 1);
            up--;
          }
        }
        if (!mustEndAbs && !removeAllDots) {
          for (; up--; up) {
            srcPath.unshift("..");
          }
        }
        if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
          srcPath.unshift("");
        }
        if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
          srcPath.push("");
        }
        var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
        if (psychotic) {
          result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
          var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        mustEndAbs = mustEndAbs || result.host && srcPath.length;
        if (mustEndAbs && !isAbsolute) {
          srcPath.unshift("");
        }
        if (!srcPath.length) {
          result.pathname = null;
          result.path = null;
        } else {
          result.pathname = srcPath.join("/");
        }
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.auth = relative.auth || result.auth;
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      };
      Url.prototype.parseHost = function() {
        var host = this.host;
        var port = portPattern.exec(host);
        if (port) {
          port = port[0];
          if (port !== ":") {
            this.port = port.substr(1);
          }
          host = host.substr(0, host.length - port.length);
        }
        if (host)
          this.hostname = host;
      };
    }
  });

  // contracts/common/lib/jsonschema/helpers.js
  var require_helpers = __commonJS({
    "contracts/common/lib/jsonschema/helpers.js"(exports, module) {
      "use strict";
      var uri = require_url();
      var ValidationError = exports.ValidationError = function ValidationError2(message, instance, schema, path, name, argument) {
        if (Array.isArray(path)) {
          this.path = path;
          this.property = path.reduce(function(sum, item) {
            return sum + makeSuffix(item);
          }, "instance");
        } else if (path !== void 0) {
          this.property = path;
        }
        if (message) {
          this.message = message;
        }
        if (schema) {
          var id = schema.$id || schema.id;
          this.schema = id || schema;
        }
        if (instance !== void 0) {
          this.instance = instance;
        }
        this.name = name;
        this.argument = argument;
        this.stack = this.toString();
      };
      ValidationError.prototype.toString = function toString2() {
        return this.property + " " + this.message;
      };
      var ValidatorResult = exports.ValidatorResult = function ValidatorResult2(instance, schema, options, ctx) {
        this.instance = instance;
        this.schema = schema;
        this.options = options;
        this.path = ctx.path;
        this.propertyPath = ctx.propertyPath;
        this.errors = [];
        this.throwError = options && options.throwError;
        this.throwFirst = options && options.throwFirst;
        this.throwAll = options && options.throwAll;
        this.disableFormat = options && options.disableFormat === true;
      };
      ValidatorResult.prototype.addError = function addError(detail) {
        var err2;
        if (typeof detail == "string") {
          err2 = new ValidationError(detail, this.instance, this.schema, this.path);
        } else {
          if (!detail)
            throw new Error("Missing error detail");
          if (!detail.message)
            throw new Error("Missing error message");
          if (!detail.name)
            throw new Error("Missing validator type");
          err2 = new ValidationError(
            detail.message,
            this.instance,
            this.schema,
            this.path,
            detail.name,
            detail.argument
          );
        }
        this.errors.push(err2);
        if (this.throwFirst) {
          throw new ValidatorResultError(this);
        } else if (this.throwError) {
          throw err2;
        }
        return err2;
      };
      ValidatorResult.prototype.importErrors = function importErrors(res) {
        if (typeof res == "string" || res && res.validatorType) {
          this.addError(res);
        } else if (res && res.errors) {
          this.errors = this.errors.concat(res.errors);
        }
      };
      function stringizer(v, i) {
        return i + ": " + v.toString() + "\n";
      }
      ValidatorResult.prototype.toString = function toString2(res) {
        return this.errors.map(stringizer).join("");
      };
      Object.defineProperty(ValidatorResult.prototype, "valid", {
        get: function() {
          return !this.errors.length;
        }
      });
      module.exports.ValidatorResultError = ValidatorResultError;
      function ValidatorResultError(result) {
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, ValidatorResultError);
        }
        this.instance = result.instance;
        this.schema = result.schema;
        this.options = result.options;
        this.errors = result.errors;
      }
      ValidatorResultError.prototype = new Error();
      ValidatorResultError.prototype.constructor = ValidatorResultError;
      ValidatorResultError.prototype.name = "Validation Error";
      var SchemaError = exports.SchemaError = function SchemaError2(msg, schema) {
        this.message = msg;
        this.schema = schema;
        Error.call(this, msg);
        if (typeof Error.captureStackTrace === "function") {
          Error.captureStackTrace(this, SchemaError2);
        }
      };
      SchemaError.prototype = Object.create(Error.prototype, {
        constructor: { value: SchemaError, enumerable: false },
        name: { value: "SchemaError", enumerable: false }
      });
      var SchemaContext = exports.SchemaContext = function SchemaContext2(schema, options, path, base, schemas) {
        this.schema = schema;
        this.options = options;
        if (Array.isArray(path)) {
          this.path = path;
          this.propertyPath = path.reduce(function(sum, item) {
            return sum + makeSuffix(item);
          }, "instance");
        } else {
          this.propertyPath = path;
        }
        this.base = base;
        this.schemas = schemas;
      };
      SchemaContext.prototype.resolve = function resolve(target) {
        return uri.resolve(this.base, target);
      };
      SchemaContext.prototype.makeChild = function makeChild(schema, propertyName) {
        var path = propertyName === void 0 ? this.path : this.path.concat([propertyName]);
        var id = schema.$id || schema.id;
        var base = uri.resolve(this.base, id || "");
        var ctx = new SchemaContext(
          schema,
          this.options,
          path,
          base,
          Object.create(this.schemas)
        );
        if (id && !ctx.schemas[base]) {
          ctx.schemas[base] = schema;
        }
        return ctx;
      };
      var FORMAT_REGEXPS = exports.FORMAT_REGEXPS = {
        "date-time": /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
        date: /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
        time: /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,
        duration: /P(T\d+(H(\d+M(\d+S)?)?|M(\d+S)?|S)|\d+(D|M(\d+D)?|Y(\d+M(\d+D)?)?)(T\d+(H(\d+M(\d+S)?)?|M(\d+S)?|S))?|\d+W)/i,
        email: /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
        "idn-email": /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/u,
        "ip-address": /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
        uri: /^[a-zA-Z][a-zA-Z0-9+.-]*:[^\s]*$/,
        "uri-reference": /^(((([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:?)?)|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?))#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|(([A-Za-z][+\-.0-9A-Za-z]*)?%[0-9A-Fa-f]{2}|[!$&-.0-9;=@_~]|[A-Za-z][+\-.0-9A-Za-z]*[!$&-*,;=@_~])(%[0-9A-Fa-f]{2}|[!$&-.0-9;=@-Z_a-z~])*((([/?](%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?#|[/?])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*)?|([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~])*|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~]+)?|[.0-:A-Fa-f]+)\])?)?|[A-Za-z][+\-.0-9A-Za-z]*:?)?$/,
        iri: /^[a-zA-Z][a-zA-Z0-9+.-]*:[^\s]*$/,
        "iri-reference": /^(((([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~-\u{10FFFF}]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|([A-Za-z][+\-.0-9A-Za-z]*:?)?)|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~-\u{10FFFF}])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~-\u{10FFFF}])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|(\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~-\u{10FFFF}])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?)?))#(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|(([A-Za-z][+\-.0-9A-Za-z]*)?%[0-9A-Fa-f]{2}|[!$&-.0-9;=@_~-\u{10FFFF}]|[A-Za-z][+\-.0-9A-Za-z]*[!$&-*,;=@_~-\u{10FFFF}])(%[0-9A-Fa-f]{2}|[!$&-.0-9;=@-Z_a-z~-\u{10FFFF}])*((([/?](%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*)?#|[/?])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*)?|([A-Za-z][+\-.0-9A-Za-z]*(:%[0-9A-Fa-f]{2}|:[!$&-.0-;=?-Z_a-z~-\u{10FFFF}]|[/?])|\?)(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|([A-Za-z][+\-.0-9A-Za-z]*:)?\/((%[0-9A-Fa-f]{2}|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~-\u{10FFFF}])+|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?)(:\d*)?[/?]|[!$&-.0-;=?-Z_a-z~-\u{10FFFF}])(%[0-9A-Fa-f]{2}|[!$&-;=?-Z_a-z~-\u{10FFFF}])*|\/((%[0-9A-Fa-f]{2}|[!$&-.0-9;=A-Z_a-z~-\u{10FFFF}])+(:\d*)?|(\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?:\d*|\[(([Vv][0-9A-Fa-f]+\.[!$&-.0-;=A-Z_a-z~-\u{10FFFF}]+)?|[.0-:A-Fa-f]+)\])?)?|[A-Za-z][+\-.0-9A-Za-z]*:?)?$/u,
        uuid: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        "uri-template": /(%[0-9a-f]{2}|[!#$&(-;=?@\[\]_a-z~]|\{[!#&+,./;=?@|]?(%[0-9a-f]{2}|[0-9_a-z])(\.?(%[0-9a-f]{2}|[0-9_a-z]))*(:[1-9]\d{0,3}|\*)?(,(%[0-9a-f]{2}|[0-9_a-z])(\.?(%[0-9a-f]{2}|[0-9_a-z]))*(:[1-9]\d{0,3}|\*)?)*\})*/iu,
        "json-pointer": /^(\/([\x00-\x2e0-@\[-}\x7f]|~[01])*)*$/iu,
        "relative-json-pointer": /^\d+(#|(\/([\x00-\x2e0-@\[-}\x7f]|~[01])*)*)$/iu,
        hostname: /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
        "host-name": /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
        "utc-millisec": function(input) {
          return typeof input === "string" && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
        },
        regex: function(input) {
          var result = true;
          try {
            new RegExp(input);
          } catch (e) {
            result = false;
          }
          return result;
        },
        style: /[\r\n\t ]*[^\r\n\t ][^:]*:[\r\n\t ]*[^\r\n\t ;]*[\r\n\t ]*;?/,
        color: /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
        phone: /^\+(?:[0-9] ?){6,14}[0-9]$/,
        alpha: /^[a-zA-Z]+$/,
        alphanumeric: /^[a-zA-Z0-9]+$/
      };
      FORMAT_REGEXPS.regexp = FORMAT_REGEXPS.regex;
      FORMAT_REGEXPS.pattern = FORMAT_REGEXPS.regex;
      FORMAT_REGEXPS.ipv4 = FORMAT_REGEXPS["ip-address"];
      exports.isFormat = function isFormat(input, format, validator2) {
        if (typeof input === "string" && FORMAT_REGEXPS[format] !== void 0) {
          if (FORMAT_REGEXPS[format] instanceof RegExp) {
            return FORMAT_REGEXPS[format].test(input);
          }
          if (typeof FORMAT_REGEXPS[format] === "function") {
            return FORMAT_REGEXPS[format](input);
          }
        } else if (validator2 && validator2.customFormats && typeof validator2.customFormats[format] === "function") {
          return validator2.customFormats[format](input);
        }
        return true;
      };
      var makeSuffix = exports.makeSuffix = function makeSuffix2(key) {
        key = key.toString();
        if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) {
          return "." + key;
        }
        if (key.match(/^\d+$/)) {
          return "[" + key + "]";
        }
        return "[" + JSON.stringify(key) + "]";
      };
      exports.deepCompareStrict = function deepCompareStrict(a, b) {
        if (typeof a !== typeof b) {
          return false;
        }
        if (Array.isArray(a)) {
          if (!Array.isArray(b)) {
            return false;
          }
          if (a.length !== b.length) {
            return false;
          }
          return a.every(function(v, i) {
            return deepCompareStrict(a[i], b[i]);
          });
        }
        if (typeof a === "object") {
          if (!a || !b) {
            return a === b;
          }
          var aKeys = Object.keys(a);
          var bKeys = Object.keys(b);
          if (aKeys.length !== bKeys.length) {
            return false;
          }
          return aKeys.every(function(v) {
            return deepCompareStrict(a[v], b[v]);
          });
        }
        return a === b;
      };
      function deepMerger(target, dst, e, i) {
        if (typeof e === "object") {
          dst[i] = deepMerge(target[i], e);
        } else {
          if (target.indexOf(e) === -1) {
            dst.push(e);
          }
        }
      }
      function copyist(src, dst, key) {
        dst[key] = src[key];
      }
      function copyistWithDeepMerge(target, src, dst, key) {
        if (typeof src[key] !== "object" || !src[key]) {
          dst[key] = src[key];
        } else {
          if (!target[key]) {
            dst[key] = src[key];
          } else {
            dst[key] = deepMerge(target[key], src[key]);
          }
        }
      }
      function deepMerge(target, src) {
        var array = Array.isArray(src);
        var dst = array && [] || {};
        if (array) {
          target = target || [];
          dst = dst.concat(target);
          src.forEach(deepMerger.bind(null, target, dst));
        } else {
          if (target && typeof target === "object") {
            Object.keys(target).forEach(copyist.bind(null, target, dst));
          }
          Object.keys(src).forEach(copyistWithDeepMerge.bind(null, target, src, dst));
        }
        return dst;
      }
      module.exports.deepMerge = deepMerge;
      exports.objectGetPath = function objectGetPath(o, s) {
        var parts = s.split("/").slice(1);
        var k;
        while (typeof (k = parts.shift()) == "string") {
          var n = decodeURIComponent(k.replace(/~0/, "~").replace(/~1/g, "/"));
          if (!(n in o))
            return;
          o = o[n];
        }
        return o;
      };
      function pathEncoder(v) {
        return "/" + encodeURIComponent(v).replace(/~/g, "%7E");
      }
      exports.encodePath = function encodePointer(a) {
        return a.map(pathEncoder).join("");
      };
      exports.getDecimalPlaces = function getDecimalPlaces(number) {
        var decimalPlaces = 0;
        if (isNaN(number))
          return decimalPlaces;
        if (typeof number !== "number") {
          number = Number(number);
        }
        var parts = number.toString().split("e");
        if (parts.length === 2) {
          if (parts[1][0] !== "-") {
            return decimalPlaces;
          } else {
            decimalPlaces = Number(parts[1].slice(1));
          }
        }
        var decimalParts = parts[0].split(".");
        if (decimalParts.length === 2) {
          decimalPlaces += decimalParts[1].length;
        }
        return decimalPlaces;
      };
      exports.isSchema = function isSchema(val) {
        return typeof val === "object" && val || typeof val === "boolean";
      };
    }
  });

  // contracts/common/lib/jsonschema/attribute.js
  var require_attribute = __commonJS({
    "contracts/common/lib/jsonschema/attribute.js"(exports, module) {
      "use strict";
      var helpers = require_helpers();
      var ValidatorResult = helpers.ValidatorResult;
      var SchemaError = helpers.SchemaError;
      var attribute = {};
      attribute.ignoreProperties = {
        "id": true,
        "default": true,
        "description": true,
        "title": true,
        "additionalItems": true,
        "then": true,
        "else": true,
        "$schema": true,
        "$ref": true,
        "extends": true
      };
      var validators = attribute.validators = {};
      validators.type = function validateType(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var types = Array.isArray(schema.type) ? schema.type : [schema.type];
        if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
          var list = types.map(function(v) {
            if (!v)
              return;
            var id = v.$id || v.id;
            return id ? "<" + id + ">" : v + "";
          });
          result.addError({
            name: "type",
            argument: list,
            message: "is not of a type(s) " + list
          });
        }
        return result;
      };
      function testSchemaNoThrow(instance, options, ctx, callback, schema) {
        var throwError = options.throwError;
        var throwAll = options.throwAll;
        options.throwError = false;
        options.throwAll = false;
        var res = this.validateSchema(instance, schema, options, ctx);
        options.throwError = throwError;
        options.throwAll = throwAll;
        if (!res.valid && callback instanceof Function) {
          callback(res);
        }
        return res.valid;
      }
      validators.anyOf = function validateAnyOf(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var inner = new ValidatorResult(instance, schema, options, ctx);
        if (!Array.isArray(schema.anyOf)) {
          throw new SchemaError("anyOf must be an array");
        }
        if (!schema.anyOf.some(
          testSchemaNoThrow.bind(
            this,
            instance,
            options,
            ctx,
            function(res) {
              inner.importErrors(res);
            }
          )
        )) {
          var list = schema.anyOf.map(function(v, i) {
            var id = v.$id || v.id;
            if (id)
              return "<" + id + ">";
            return v.title && JSON.stringify(v.title) || v["$ref"] && "<" + v["$ref"] + ">" || "[subschema " + i + "]";
          });
          if (options.nestedErrors) {
            result.importErrors(inner);
          }
          result.addError({
            name: "anyOf",
            argument: list,
            message: "is not any of " + list.join(",")
          });
        }
        return result;
      };
      validators.allOf = function validateAllOf(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        if (!Array.isArray(schema.allOf)) {
          throw new SchemaError("allOf must be an array");
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var self = this;
        schema.allOf.forEach(function(v, i) {
          var valid = self.validateSchema(instance, v, options, ctx);
          if (!valid.valid) {
            var id = v.$id || v.id;
            var msg = id || v.title && JSON.stringify(v.title) || v["$ref"] && "<" + v["$ref"] + ">" || "[subschema " + i + "]";
            result.addError({
              name: "allOf",
              argument: { id: msg, length: valid.errors.length, valid },
              message: "does not match allOf schema " + msg + " with " + valid.errors.length + " error[s]:"
            });
            result.importErrors(valid);
          }
        });
        return result;
      };
      validators.oneOf = function validateOneOf(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        if (!Array.isArray(schema.oneOf)) {
          throw new SchemaError("oneOf must be an array");
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var inner = new ValidatorResult(instance, schema, options, ctx);
        var count = schema.oneOf.filter(
          testSchemaNoThrow.bind(
            this,
            instance,
            options,
            ctx,
            function(res) {
              inner.importErrors(res);
            }
          )
        ).length;
        var list = schema.oneOf.map(function(v, i) {
          var id = v.$id || v.id;
          return id || v.title && JSON.stringify(v.title) || v["$ref"] && "<" + v["$ref"] + ">" || "[subschema " + i + "]";
        });
        if (count !== 1) {
          if (options.nestedErrors) {
            result.importErrors(inner);
          }
          result.addError({
            name: "oneOf",
            argument: list,
            message: "is not exactly one from " + list.join(",")
          });
        }
        return result;
      };
      validators.if = function validateIf(instance, schema, options, ctx) {
        if (instance === void 0)
          return null;
        if (!helpers.isSchema(schema.if))
          throw new Error('Expected "if" keyword to be a schema');
        var ifValid = testSchemaNoThrow.call(this, instance, options, ctx, null, schema.if);
        var result = new ValidatorResult(instance, schema, options, ctx);
        var res;
        if (ifValid) {
          if (schema.then === void 0)
            return;
          if (!helpers.isSchema(schema.then))
            throw new Error('Expected "then" keyword to be a schema');
          res = this.validateSchema(instance, schema.then, options, ctx.makeChild(schema.then));
          result.importErrors(res);
        } else {
          if (schema.else === void 0)
            return;
          if (!helpers.isSchema(schema.else))
            throw new Error('Expected "else" keyword to be a schema');
          res = this.validateSchema(instance, schema.else, options, ctx.makeChild(schema.else));
          result.importErrors(res);
        }
        return result;
      };
      function getEnumerableProperty(object, key) {
        if (Object.hasOwnProperty.call(object, key))
          return object[key];
        if (!(key in object))
          return;
        while (object = Object.getPrototypeOf(object)) {
          if (Object.propertyIsEnumerable.call(object, key))
            return object[key];
        }
      }
      validators.propertyNames = function validatePropertyNames(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var subschema = schema.propertyNames !== void 0 ? schema.propertyNames : {};
        if (!helpers.isSchema(subschema))
          throw new SchemaError('Expected "propertyNames" to be a schema (object or boolean)');
        for (var property in instance) {
          if (getEnumerableProperty(instance, property) !== void 0) {
            var res = this.validateSchema(property, subschema, options, ctx.makeChild(subschema));
            result.importErrors(res);
          }
        }
        return result;
      };
      validators.properties = function validateProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var properties = schema.properties || {};
        for (var property in properties) {
          var subschema = properties[property];
          if (subschema === void 0) {
            continue;
          } else if (subschema === null) {
            throw new SchemaError('Unexpected null, expected schema in "properties"');
          }
          if (typeof options.preValidateProperty == "function") {
            options.preValidateProperty(instance, property, subschema, options, ctx);
          }
          var prop = getEnumerableProperty(instance, property);
          var res = this.validateSchema(prop, subschema, options, ctx.makeChild(subschema, property));
          if (res.instance !== result.instance[property])
            result.instance[property] = res.instance;
          result.importErrors(res);
        }
        return result;
      };
      function testAdditionalProperty(instance, schema, options, ctx, property, result) {
        if (!this.types.object(instance))
          return;
        if (schema.properties && schema.properties[property] !== void 0) {
          return;
        }
        if (schema.additionalProperties === false) {
          result.addError({
            name: "additionalProperties",
            argument: property,
            message: "is not allowed to have the additional property " + JSON.stringify(property)
          });
        } else {
          var additionalProperties = schema.additionalProperties || {};
          if (typeof options.preValidateProperty == "function") {
            options.preValidateProperty(instance, property, additionalProperties, options, ctx);
          }
          var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
          if (res.instance !== result.instance[property])
            result.instance[property] = res.instance;
          result.importErrors(res);
        }
      }
      validators.patternProperties = function validatePatternProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var patternProperties = schema.patternProperties || {};
        for (var property in instance) {
          var test = true;
          for (var pattern in patternProperties) {
            var subschema = patternProperties[pattern];
            if (subschema === void 0) {
              continue;
            } else if (subschema === null) {
              throw new SchemaError('Unexpected null, expected schema in "patternProperties"');
            }
            try {
              var regexp = new RegExp(pattern, "u");
            } catch (_e) {
              regexp = new RegExp(pattern);
            }
            if (!regexp.test(property)) {
              continue;
            }
            test = false;
            if (typeof options.preValidateProperty == "function") {
              options.preValidateProperty(instance, property, subschema, options, ctx);
            }
            var res = this.validateSchema(instance[property], subschema, options, ctx.makeChild(subschema, property));
            if (res.instance !== result.instance[property])
              result.instance[property] = res.instance;
            result.importErrors(res);
          }
          if (test) {
            testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
          }
        }
        return result;
      };
      validators.additionalProperties = function validateAdditionalProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        if (schema.patternProperties) {
          return null;
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        for (var property in instance) {
          testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
        }
        return result;
      };
      validators.minProperties = function validateMinProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var keys4 = Object.keys(instance);
        if (!(keys4.length >= schema.minProperties)) {
          result.addError({
            name: "minProperties",
            argument: schema.minProperties,
            message: "does not meet minimum property length of " + schema.minProperties
          });
        }
        return result;
      };
      validators.maxProperties = function validateMaxProperties(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var keys4 = Object.keys(instance);
        if (!(keys4.length <= schema.maxProperties)) {
          result.addError({
            name: "maxProperties",
            argument: schema.maxProperties,
            message: "does not meet maximum property length of " + schema.maxProperties
          });
        }
        return result;
      };
      validators.items = function validateItems(instance, schema, options, ctx) {
        var self = this;
        if (!this.types.array(instance))
          return;
        if (schema.items === void 0)
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        instance.every(function(value, i) {
          if (Array.isArray(schema.items)) {
            var items = schema.items[i] === void 0 ? schema.additionalItems : schema.items[i];
          } else {
            var items = schema.items;
          }
          if (items === void 0) {
            return true;
          }
          if (items === false) {
            result.addError({
              name: "items",
              message: "additionalItems not permitted"
            });
            return false;
          }
          var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
          if (res.instance !== result.instance[i])
            result.instance[i] = res.instance;
          result.importErrors(res);
          return true;
        });
        return result;
      };
      validators.contains = function validateContains(instance, schema, options, ctx) {
        var self = this;
        if (!this.types.array(instance))
          return;
        if (schema.contains === void 0)
          return;
        if (!helpers.isSchema(schema.contains))
          throw new Error('Expected "contains" keyword to be a schema');
        var result = new ValidatorResult(instance, schema, options, ctx);
        var count = instance.some(function(value, i) {
          var res = self.validateSchema(value, schema.contains, options, ctx.makeChild(schema.contains, i));
          return res.errors.length === 0;
        });
        if (count === false) {
          result.addError({
            name: "contains",
            argument: schema.contains,
            message: "must contain an item matching given schema"
          });
        }
        return result;
      };
      validators.minimum = function validateMinimum(instance, schema, options, ctx) {
        if (!this.types.number(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
          if (!(instance > schema.minimum)) {
            result.addError({
              name: "minimum",
              argument: schema.minimum,
              message: "must be greater than " + schema.minimum
            });
          }
        } else {
          if (!(instance >= schema.minimum)) {
            result.addError({
              name: "minimum",
              argument: schema.minimum,
              message: "must be greater than or equal to " + schema.minimum
            });
          }
        }
        return result;
      };
      validators.maximum = function validateMaximum(instance, schema, options, ctx) {
        if (!this.types.number(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
          if (!(instance < schema.maximum)) {
            result.addError({
              name: "maximum",
              argument: schema.maximum,
              message: "must be less than " + schema.maximum
            });
          }
        } else {
          if (!(instance <= schema.maximum)) {
            result.addError({
              name: "maximum",
              argument: schema.maximum,
              message: "must be less than or equal to " + schema.maximum
            });
          }
        }
        return result;
      };
      validators.exclusiveMinimum = function validateExclusiveMinimum(instance, schema, options, ctx) {
        if (typeof schema.exclusiveMinimum === "boolean")
          return;
        if (!this.types.number(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var valid = instance > schema.exclusiveMinimum;
        if (!valid) {
          result.addError({
            name: "exclusiveMinimum",
            argument: schema.exclusiveMinimum,
            message: "must be strictly greater than " + schema.exclusiveMinimum
          });
        }
        return result;
      };
      validators.exclusiveMaximum = function validateExclusiveMaximum(instance, schema, options, ctx) {
        if (typeof schema.exclusiveMaximum === "boolean")
          return;
        if (!this.types.number(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var valid = instance < schema.exclusiveMaximum;
        if (!valid) {
          result.addError({
            name: "exclusiveMaximum",
            argument: schema.exclusiveMaximum,
            message: "must be strictly less than " + schema.exclusiveMaximum
          });
        }
        return result;
      };
      var validateMultipleOfOrDivisbleBy = function validateMultipleOfOrDivisbleBy2(instance, schema, options, ctx, validationType, errorMessage) {
        if (!this.types.number(instance))
          return;
        var validationArgument = schema[validationType];
        if (validationArgument == 0) {
          throw new SchemaError(validationType + " cannot be zero");
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        var instanceDecimals = helpers.getDecimalPlaces(instance);
        var divisorDecimals = helpers.getDecimalPlaces(validationArgument);
        var maxDecimals = Math.max(instanceDecimals, divisorDecimals);
        var multiplier = Math.pow(10, maxDecimals);
        if (Math.round(instance * multiplier) % Math.round(validationArgument * multiplier) !== 0) {
          result.addError({
            name: validationType,
            argument: validationArgument,
            message: errorMessage + JSON.stringify(validationArgument)
          });
        }
        return result;
      };
      validators.multipleOf = function validateMultipleOf(instance, schema, options, ctx) {
        return validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "multipleOf", "is not a multiple of (divisible by) ");
      };
      validators.divisibleBy = function validateDivisibleBy(instance, schema, options, ctx) {
        return validateMultipleOfOrDivisbleBy.call(this, instance, schema, options, ctx, "divisibleBy", "is not divisible by (multiple of) ");
      };
      validators.required = function validateRequired(instance, schema, options, ctx) {
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (instance === void 0 && schema.required === true) {
          result.addError({
            name: "required",
            message: "is required"
          });
        } else if (this.types.object(instance) && Array.isArray(schema.required)) {
          schema.required.forEach(function(n) {
            if (getEnumerableProperty(instance, n) === void 0) {
              result.addError({
                name: "required",
                argument: n,
                message: "requires property " + JSON.stringify(n)
              });
            }
          });
        }
        return result;
      };
      validators.pattern = function validatePattern(instance, schema, options, ctx) {
        if (!this.types.string(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var pattern = schema.pattern;
        try {
          var regexp = new RegExp(pattern, "u");
        } catch (_e) {
          regexp = new RegExp(pattern);
        }
        if (!instance.match(regexp)) {
          result.addError({
            name: "pattern",
            argument: schema.pattern,
            message: "does not match pattern " + JSON.stringify(schema.pattern.toString())
          });
        }
        return result;
      };
      validators.format = function validateFormat(instance, schema, options, ctx) {
        if (instance === void 0)
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) {
          result.addError({
            name: "format",
            argument: schema.format,
            message: "does not conform to the " + JSON.stringify(schema.format) + " format"
          });
        }
        return result;
      };
      validators.minLength = function validateMinLength(instance, schema, options, ctx) {
        if (!this.types.string(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var hsp = instance.match(/[\uDC00-\uDFFF]/g);
        var length = instance.length - (hsp ? hsp.length : 0);
        if (!(length >= schema.minLength)) {
          result.addError({
            name: "minLength",
            argument: schema.minLength,
            message: "does not meet minimum length of " + schema.minLength
          });
        }
        return result;
      };
      validators.maxLength = function validateMaxLength(instance, schema, options, ctx) {
        if (!this.types.string(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var hsp = instance.match(/[\uDC00-\uDFFF]/g);
        var length = instance.length - (hsp ? hsp.length : 0);
        if (!(length <= schema.maxLength)) {
          result.addError({
            name: "maxLength",
            argument: schema.maxLength,
            message: "does not meet maximum length of " + schema.maxLength
          });
        }
        return result;
      };
      validators.minItems = function validateMinItems(instance, schema, options, ctx) {
        if (!this.types.array(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!(instance.length >= schema.minItems)) {
          result.addError({
            name: "minItems",
            argument: schema.minItems,
            message: "does not meet minimum length of " + schema.minItems
          });
        }
        return result;
      };
      validators.maxItems = function validateMaxItems(instance, schema, options, ctx) {
        if (!this.types.array(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!(instance.length <= schema.maxItems)) {
          result.addError({
            name: "maxItems",
            argument: schema.maxItems,
            message: "does not meet maximum length of " + schema.maxItems
          });
        }
        return result;
      };
      function testArrays(v, i, a) {
        var j, len = a.length;
        for (j = i + 1, len; j < len; j++) {
          if (helpers.deepCompareStrict(v, a[j])) {
            return false;
          }
        }
        return true;
      }
      validators.uniqueItems = function validateUniqueItems(instance, schema, options, ctx) {
        if (schema.uniqueItems !== true)
          return;
        if (!this.types.array(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!instance.every(testArrays)) {
          result.addError({
            name: "uniqueItems",
            message: "contains duplicate item"
          });
        }
        return result;
      };
      validators.dependencies = function validateDependencies(instance, schema, options, ctx) {
        if (!this.types.object(instance))
          return;
        var result = new ValidatorResult(instance, schema, options, ctx);
        for (var property in schema.dependencies) {
          if (instance[property] === void 0) {
            continue;
          }
          var dep = schema.dependencies[property];
          var childContext = ctx.makeChild(dep, property);
          if (typeof dep == "string") {
            dep = [dep];
          }
          if (Array.isArray(dep)) {
            dep.forEach(function(prop) {
              if (instance[prop] === void 0) {
                result.addError({
                  name: "dependencies",
                  argument: childContext.propertyPath,
                  message: "property " + prop + " not found, required by " + childContext.propertyPath
                });
              }
            });
          } else {
            var res = this.validateSchema(instance, dep, options, childContext);
            if (result.instance !== res.instance)
              result.instance = res.instance;
            if (res && res.errors.length) {
              result.addError({
                name: "dependencies",
                argument: childContext.propertyPath,
                message: "does not meet dependency required by " + childContext.propertyPath
              });
              result.importErrors(res);
            }
          }
        }
        return result;
      };
      validators["enum"] = function validateEnum(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        if (!Array.isArray(schema["enum"])) {
          throw new SchemaError("enum expects an array", schema);
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!schema["enum"].some(helpers.deepCompareStrict.bind(null, instance))) {
          result.addError({
            name: "enum",
            argument: schema["enum"],
            message: "is not one of enum values: " + schema["enum"].map(String).join(",")
          });
        }
        return result;
      };
      validators["const"] = function validateEnum(instance, schema, options, ctx) {
        if (instance === void 0) {
          return null;
        }
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (!helpers.deepCompareStrict(schema["const"], instance)) {
          result.addError({
            name: "const",
            argument: schema["const"],
            message: "does not exactly match expected constant: " + schema["const"]
          });
        }
        return result;
      };
      validators.not = validators.disallow = function validateNot(instance, schema, options, ctx) {
        var self = this;
        if (instance === void 0)
          return null;
        var result = new ValidatorResult(instance, schema, options, ctx);
        var notTypes = schema.not || schema.disallow;
        if (!notTypes)
          return null;
        if (!Array.isArray(notTypes))
          notTypes = [notTypes];
        notTypes.forEach(function(type3) {
          if (self.testType(instance, schema, options, ctx, type3)) {
            var id = type3 && (type3.$id || type3.id);
            var schemaId = id || type3;
            result.addError({
              name: "not",
              argument: schemaId,
              message: "is of prohibited type " + schemaId
            });
          }
        });
        return result;
      };
      module.exports = attribute;
    }
  });

  // contracts/common/lib/jsonschema/scan.js
  var require_scan = __commonJS({
    "contracts/common/lib/jsonschema/scan.js"(exports, module) {
      "use strict";
      var urilib = require_url();
      var helpers = require_helpers();
      module.exports.SchemaScanResult = SchemaScanResult;
      function SchemaScanResult(found, ref) {
        this.id = found;
        this.ref = ref;
      }
      module.exports.scan = function scan(base, schema) {
        function scanSchema(baseuri, schema2) {
          if (!schema2 || typeof schema2 != "object")
            return;
          if (schema2.$ref) {
            var resolvedUri = urilib.resolve(baseuri, schema2.$ref);
            ref[resolvedUri] = ref[resolvedUri] ? ref[resolvedUri] + 1 : 0;
            return;
          }
          var id = schema2.$id || schema2.id;
          var ourBase = id ? urilib.resolve(baseuri, id) : baseuri;
          if (ourBase) {
            if (ourBase.indexOf("#") < 0)
              ourBase += "#";
            if (found[ourBase]) {
              if (!helpers.deepCompareStrict(found[ourBase], schema2)) {
                throw new Error(
                  "Schema <" + ourBase + "> already exists with different definition"
                );
              }
              return found[ourBase];
            }
            found[ourBase] = schema2;
            if (ourBase[ourBase.length - 1] == "#") {
              found[ourBase.substring(0, ourBase.length - 1)] = schema2;
            }
          }
          scanArray(
            ourBase + "/items",
            Array.isArray(schema2.items) ? schema2.items : [schema2.items]
          );
          scanArray(
            ourBase + "/extends",
            Array.isArray(schema2.extends) ? schema2.extends : [schema2.extends]
          );
          scanSchema(ourBase + "/additionalItems", schema2.additionalItems);
          scanObject(ourBase + "/properties", schema2.properties);
          scanSchema(ourBase + "/additionalProperties", schema2.additionalProperties);
          scanObject(ourBase + "/definitions", schema2.definitions);
          scanObject(ourBase + "/patternProperties", schema2.patternProperties);
          scanObject(ourBase + "/dependencies", schema2.dependencies);
          scanArray(ourBase + "/disallow", schema2.disallow);
          scanArray(ourBase + "/allOf", schema2.allOf);
          scanArray(ourBase + "/anyOf", schema2.anyOf);
          scanArray(ourBase + "/oneOf", schema2.oneOf);
          scanSchema(ourBase + "/not", schema2.not);
        }
        function scanArray(baseuri, schemas) {
          if (!Array.isArray(schemas))
            return;
          for (var i = 0; i < schemas.length; i++) {
            scanSchema(baseuri + "/" + i, schemas[i]);
          }
        }
        function scanObject(baseuri, schemas) {
          if (!schemas || typeof schemas != "object")
            return;
          for (var p in schemas) {
            scanSchema(baseuri + "/" + p, schemas[p]);
          }
        }
        var found = {};
        var ref = {};
        scanSchema(base, schema);
        return new SchemaScanResult(found, ref);
      };
    }
  });

  // contracts/common/lib/jsonschema/validator.js
  var require_validator = __commonJS({
    "contracts/common/lib/jsonschema/validator.js"(exports, module) {
      "use strict";
      var urilib = require_url();
      var attribute = require_attribute();
      var helpers = require_helpers();
      var scanSchema = require_scan().scan;
      var ValidatorResult = helpers.ValidatorResult;
      var ValidatorResultError = helpers.ValidatorResultError;
      var SchemaError = helpers.SchemaError;
      var SchemaContext = helpers.SchemaContext;
      var anonymousBase = "/";
      var Validator = function Validator2() {
        this.customFormats = Object.create(Validator2.prototype.customFormats);
        this.schemas = {};
        this.unresolvedRefs = [];
        this.types = Object.create(types);
        this.attributes = Object.create(attribute.validators);
      };
      Validator.prototype.customFormats = {};
      Validator.prototype.schemas = null;
      Validator.prototype.types = null;
      Validator.prototype.attributes = null;
      Validator.prototype.unresolvedRefs = null;
      Validator.prototype.addSchema = function addSchema(schema, base) {
        var self = this;
        if (!schema) {
          return null;
        }
        var scan = scanSchema(base || anonymousBase, schema);
        var ourUri = base || schema.$id || schema.id;
        for (var uri in scan.id) {
          this.schemas[uri] = scan.id[uri];
        }
        for (var uri in scan.ref) {
          this.unresolvedRefs.push(uri);
        }
        this.unresolvedRefs = this.unresolvedRefs.filter(function(uri2) {
          return typeof self.schemas[uri2] === "undefined";
        });
        return this.schemas[ourUri];
      };
      Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
        if (!Array.isArray(schemas))
          return;
        for (var i = 0; i < schemas.length; i++) {
          this.addSubSchema(baseuri, schemas[i]);
        }
      };
      Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
        if (!schemas || typeof schemas != "object")
          return;
        for (var p in schemas) {
          this.addSubSchema(baseuri, schemas[p]);
        }
      };
      Validator.prototype.setSchemas = function setSchemas(schemas) {
        this.schemas = schemas;
      };
      Validator.prototype.getSchema = function getSchema(urn) {
        return this.schemas[urn];
      };
      Validator.prototype.validate = function validate2(instance, schema, options, ctx) {
        if (typeof schema !== "boolean" && typeof schema !== "object" || schema === null) {
          throw new SchemaError("Expected `schema` to be an object or boolean");
        }
        if (!options) {
          options = {};
        }
        var id = schema.$id || schema.id;
        var base = urilib.resolve(options.base || anonymousBase, id || "");
        if (!ctx) {
          ctx = new SchemaContext(
            schema,
            options,
            [],
            base,
            Object.create(this.schemas)
          );
          if (!ctx.schemas[base]) {
            ctx.schemas[base] = schema;
          }
          var found = scanSchema(base, schema);
          for (var n in found.id) {
            var sch = found.id[n];
            ctx.schemas[n] = sch;
          }
        }
        if (options.required && instance === void 0) {
          var result = new ValidatorResult(instance, schema, options, ctx);
          result.addError("is required, but is undefined");
          return result;
        }
        var result = this.validateSchema(instance, schema, options, ctx);
        if (!result) {
          throw new Error("Result undefined");
        } else if (options.throwAll && result.errors.length) {
          throw new ValidatorResultError(result);
        }
        return result;
      };
      function shouldResolve(schema) {
        var ref = typeof schema === "string" ? schema : schema.$ref;
        if (typeof ref == "string")
          return ref;
        return false;
      }
      Validator.prototype.validateSchema = function validateSchema(instance, schema, options, ctx) {
        var result = new ValidatorResult(instance, schema, options, ctx);
        if (typeof schema === "boolean") {
          if (schema === true) {
            schema = {};
          } else if (schema === false) {
            schema = { type: [] };
          }
        } else if (!schema) {
          throw new Error("schema is undefined");
        }
        if (schema["extends"]) {
          if (Array.isArray(schema["extends"])) {
            var schemaobj = { schema, ctx };
            schema["extends"].forEach(this.schemaTraverser.bind(this, schemaobj));
            schema = schemaobj.schema;
            schemaobj.schema = null;
            schemaobj.ctx = null;
            schemaobj = null;
          } else {
            schema = helpers.deepMerge(
              schema,
              this.superResolve(schema["extends"], ctx)
            );
          }
        }
        var switchSchema = shouldResolve(schema);
        if (switchSchema) {
          var resolved = this.resolve(schema, switchSchema, ctx);
          var subctx = new SchemaContext(
            resolved.subschema,
            options,
            ctx.path,
            resolved.switchSchema,
            ctx.schemas
          );
          return this.validateSchema(instance, resolved.subschema, options, subctx);
        }
        var skipAttributes = options && options.skipAttributes || [];
        for (var key in schema) {
          if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
            var validatorErr = null;
            var validator2 = this.attributes[key];
            if (validator2) {
              validatorErr = validator2.call(this, instance, schema, options, ctx);
            } else if (options.allowUnknownAttributes === false) {
              throw new SchemaError("Unsupported attribute: " + key, schema);
            }
            if (validatorErr) {
              result.importErrors(validatorErr);
            }
          }
        }
        if (typeof options.rewrite == "function") {
          var value = options.rewrite.call(this, instance, schema, options, ctx);
          result.instance = value;
        }
        return result;
      };
      Validator.prototype.schemaTraverser = function schemaTraverser(schemaobj, s) {
        schemaobj.schema = helpers.deepMerge(
          schemaobj.schema,
          this.superResolve(s, schemaobj.ctx)
        );
      };
      Validator.prototype.superResolve = function superResolve(schema, ctx) {
        var ref = shouldResolve(schema);
        if (ref) {
          return this.resolve(schema, ref, ctx).subschema;
        }
        return schema;
      };
      Validator.prototype.resolve = function resolve(schema, switchSchema, ctx) {
        switchSchema = ctx.resolve(switchSchema);
        if (ctx.schemas[switchSchema]) {
          return { subschema: ctx.schemas[switchSchema], switchSchema };
        }
        var parsed = urilib.parse(switchSchema);
        var fragment = parsed && parsed.hash;
        var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
        if (!document || !ctx.schemas[document]) {
          throw new SchemaError("no such schema <" + switchSchema + ">", schema);
        }
        var subschema = helpers.objectGetPath(
          ctx.schemas[document],
          fragment.substr(1)
        );
        if (subschema === void 0) {
          throw new SchemaError(
            "no such schema " + fragment + " located in <" + document + ">",
            schema
          );
        }
        return { subschema, switchSchema };
      };
      Validator.prototype.testType = function validateType(instance, schema, options, ctx, type3) {
        if (type3 === void 0) {
          return;
        } else if (type3 === null) {
          throw new SchemaError('Unexpected null in "type" keyword');
        }
        if (typeof this.types[type3] == "function") {
          return this.types[type3].call(this, instance);
        }
        if (type3 && typeof type3 == "object") {
          var res = this.validateSchema(instance, type3, options, ctx);
          return res === void 0 || !(res && res.errors.length);
        }
        return true;
      };
      var types = Validator.prototype.types = {};
      types.string = function testString(instance) {
        return typeof instance == "string";
      };
      types.number = function testNumber(instance) {
        return typeof instance == "number" && isFinite(instance);
      };
      types.integer = function testInteger(instance) {
        return typeof instance == "number" && instance % 1 === 0;
      };
      types.boolean = function testBoolean(instance) {
        return typeof instance == "boolean";
      };
      types.array = function testArray(instance) {
        return Array.isArray(instance);
      };
      types["null"] = function testNull(instance) {
        return instance === null;
      };
      types.date = function testDate(instance) {
        return instance instanceof Date;
      };
      types.any = function testAny(instance) {
        return true;
      };
      types.object = function testObject(instance) {
        return instance && typeof instance === "object" && !Array.isArray(instance) && !(instance instanceof Date);
      };
      module.exports = Validator;
    }
  });

  // contracts/common/lib/jsonschema/index.js
  var require_jsonschema = __commonJS({
    "contracts/common/lib/jsonschema/index.js"(exports, module) {
      "use strict";
      var Validator = module.exports.Validator = require_validator();
      module.exports.ValidatorResult = require_helpers().ValidatorResult;
      module.exports.ValidatorResultError = require_helpers().ValidatorResultError;
      module.exports.ValidationError = require_helpers().ValidationError;
      module.exports.SchemaError = require_helpers().SchemaError;
      module.exports.SchemaScanResult = require_scan().SchemaScanResult;
      module.exports.scan = require_scan().scan;
      module.exports.validate = function(instance, schema, options) {
        var v = new Validator();
        return v.validate(instance, schema, options);
      };
    }
  });

  // contracts/common/lib/pure.js
  var require_pure = __commonJS({
    "contracts/common/lib/pure.js"(exports, module) {
      var isValidName2 = (str) => /^[^\/]+$/.test(str) && !/^__.*__+$/.test(str) && !/^\.{1,2}$/.test(str) && Buffer.byteLength(str, "utf8") <= 1500;
      module.exports = { isValidName: isValidName2 };
    }
  });

  // contracts/warp/lib/version.js
  var require_version = __commonJS({
    "contracts/warp/lib/version.js"(exports, module) {
      module.exports = "0.19.0";
    }
  });

  // node_modules/ramda/es/internal/_isPlaceholder.js
  function _isPlaceholder(a) {
    return a != null && typeof a === "object" && a["@@functional/placeholder"] === true;
  }

  // node_modules/ramda/es/internal/_curry1.js
  function _curry1(fn) {
    return function f1(a) {
      if (arguments.length === 0 || _isPlaceholder(a)) {
        return f1;
      } else {
        return fn.apply(this, arguments);
      }
    };
  }

  // node_modules/ramda/es/internal/_curry2.js
  function _curry2(fn) {
    return function f2(a, b) {
      switch (arguments.length) {
        case 0:
          return f2;
        case 1:
          return _isPlaceholder(a) ? f2 : _curry1(function(_b) {
            return fn(a, _b);
          });
        default:
          return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function(_a) {
            return fn(_a, b);
          }) : _isPlaceholder(b) ? _curry1(function(_b) {
            return fn(a, _b);
          }) : fn(a, b);
      }
    };
  }

  // node_modules/ramda/es/internal/_isArray.js
  var isArray_default = Array.isArray || function _isArray(val) {
    return val != null && val.length >= 0 && Object.prototype.toString.call(val) === "[object Array]";
  };

  // node_modules/ramda/es/internal/_isString.js
  function _isString(x) {
    return Object.prototype.toString.call(x) === "[object String]";
  }

  // node_modules/ramda/es/internal/_has.js
  function _has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  // node_modules/ramda/es/internal/_isArguments.js
  var toString = Object.prototype.toString;
  var _isArguments = /* @__PURE__ */ function() {
    return toString.call(arguments) === "[object Arguments]" ? function _isArguments2(x) {
      return toString.call(x) === "[object Arguments]";
    } : function _isArguments2(x) {
      return _has("callee", x);
    };
  }();
  var isArguments_default = _isArguments;

  // node_modules/ramda/es/keys.js
  var hasEnumBug = !/* @__PURE__ */ {
    toString: null
  }.propertyIsEnumerable("toString");
  var nonEnumerableProps = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
  var hasArgsEnumBug = /* @__PURE__ */ function() {
    "use strict";
    return arguments.propertyIsEnumerable("length");
  }();
  var contains = function contains2(list, item) {
    var idx = 0;
    while (idx < list.length) {
      if (list[idx] === item) {
        return true;
      }
      idx += 1;
    }
    return false;
  };
  var keys = typeof Object.keys === "function" && !hasArgsEnumBug ? /* @__PURE__ */ _curry1(function keys2(obj) {
    return Object(obj) !== obj ? [] : Object.keys(obj);
  }) : /* @__PURE__ */ _curry1(function keys3(obj) {
    if (Object(obj) !== obj) {
      return [];
    }
    var prop, nIdx;
    var ks = [];
    var checkArgsLength = hasArgsEnumBug && isArguments_default(obj);
    for (prop in obj) {
      if (_has(prop, obj) && (!checkArgsLength || prop !== "length")) {
        ks[ks.length] = prop;
      }
    }
    if (hasEnumBug) {
      nIdx = nonEnumerableProps.length - 1;
      while (nIdx >= 0) {
        prop = nonEnumerableProps[nIdx];
        if (_has(prop, obj) && !contains(ks, prop)) {
          ks[ks.length] = prop;
        }
        nIdx -= 1;
      }
    }
    return ks;
  });
  var keys_default = keys;

  // node_modules/ramda/es/internal/_isInteger.js
  var isInteger_default = Number.isInteger || function _isInteger(n) {
    return n << 0 === n;
  };

  // node_modules/ramda/es/nth.js
  var nth = /* @__PURE__ */ _curry2(function nth2(offset, list) {
    var idx = offset < 0 ? list.length + offset : offset;
    return _isString(list) ? list.charAt(idx) : list[idx];
  });
  var nth_default = nth;

  // node_modules/ramda/es/isNil.js
  var isNil = /* @__PURE__ */ _curry1(function isNil2(x) {
    return x == null;
  });
  var isNil_default = isNil;

  // node_modules/ramda/es/type.js
  var type = /* @__PURE__ */ _curry1(function type2(val) {
    return val === null ? "Null" : val === void 0 ? "Undefined" : Object.prototype.toString.call(val).slice(8, -1);
  });
  var type_default = type;

  // node_modules/ramda/es/internal/_arrayFromIterator.js
  function _arrayFromIterator(iter) {
    var list = [];
    var next;
    while (!(next = iter.next()).done) {
      list.push(next.value);
    }
    return list;
  }

  // node_modules/ramda/es/internal/_includesWith.js
  function _includesWith(pred, x, list) {
    var idx = 0;
    var len = list.length;
    while (idx < len) {
      if (pred(x, list[idx])) {
        return true;
      }
      idx += 1;
    }
    return false;
  }

  // node_modules/ramda/es/internal/_functionName.js
  function _functionName(f) {
    var match = String(f).match(/^function (\w*)/);
    return match == null ? "" : match[1];
  }

  // node_modules/ramda/es/internal/_objectIs.js
  function _objectIs(a, b) {
    if (a === b) {
      return a !== 0 || 1 / a === 1 / b;
    } else {
      return a !== a && b !== b;
    }
  }
  var objectIs_default = typeof Object.is === "function" ? Object.is : _objectIs;

  // node_modules/ramda/es/internal/_equals.js
  function _uniqContentEquals(aIterator, bIterator, stackA, stackB) {
    var a = _arrayFromIterator(aIterator);
    var b = _arrayFromIterator(bIterator);
    function eq(_a, _b) {
      return _equals(_a, _b, stackA.slice(), stackB.slice());
    }
    return !_includesWith(function(b2, aItem) {
      return !_includesWith(eq, aItem, b2);
    }, b, a);
  }
  function _equals(a, b, stackA, stackB) {
    if (objectIs_default(a, b)) {
      return true;
    }
    var typeA = type_default(a);
    if (typeA !== type_default(b)) {
      return false;
    }
    if (typeof a["fantasy-land/equals"] === "function" || typeof b["fantasy-land/equals"] === "function") {
      return typeof a["fantasy-land/equals"] === "function" && a["fantasy-land/equals"](b) && typeof b["fantasy-land/equals"] === "function" && b["fantasy-land/equals"](a);
    }
    if (typeof a.equals === "function" || typeof b.equals === "function") {
      return typeof a.equals === "function" && a.equals(b) && typeof b.equals === "function" && b.equals(a);
    }
    switch (typeA) {
      case "Arguments":
      case "Array":
      case "Object":
        if (typeof a.constructor === "function" && _functionName(a.constructor) === "Promise") {
          return a === b;
        }
        break;
      case "Boolean":
      case "Number":
      case "String":
        if (!(typeof a === typeof b && objectIs_default(a.valueOf(), b.valueOf()))) {
          return false;
        }
        break;
      case "Date":
        if (!objectIs_default(a.valueOf(), b.valueOf())) {
          return false;
        }
        break;
      case "Error":
        return a.name === b.name && a.message === b.message;
      case "RegExp":
        if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
          return false;
        }
        break;
    }
    var idx = stackA.length - 1;
    while (idx >= 0) {
      if (stackA[idx] === a) {
        return stackB[idx] === b;
      }
      idx -= 1;
    }
    switch (typeA) {
      case "Map":
        if (a.size !== b.size) {
          return false;
        }
        return _uniqContentEquals(a.entries(), b.entries(), stackA.concat([a]), stackB.concat([b]));
      case "Set":
        if (a.size !== b.size) {
          return false;
        }
        return _uniqContentEquals(a.values(), b.values(), stackA.concat([a]), stackB.concat([b]));
      case "Arguments":
      case "Array":
      case "Object":
      case "Boolean":
      case "Number":
      case "String":
      case "Date":
      case "Error":
      case "RegExp":
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "ArrayBuffer":
        break;
      default:
        return false;
    }
    var keysA = keys_default(a);
    if (keysA.length !== keys_default(b).length) {
      return false;
    }
    var extendedStackA = stackA.concat([a]);
    var extendedStackB = stackB.concat([b]);
    idx = keysA.length - 1;
    while (idx >= 0) {
      var key = keysA[idx];
      if (!(_has(key, b) && _equals(b[key], a[key], extendedStackA, extendedStackB))) {
        return false;
      }
      idx -= 1;
    }
    return true;
  }

  // node_modules/ramda/es/equals.js
  var equals = /* @__PURE__ */ _curry2(function equals2(a, b) {
    return _equals(a, b, [], []);
  });
  var equals_default = equals;

  // node_modules/ramda/es/internal/_indexOf.js
  function _indexOf(list, a, idx) {
    var inf, item;
    if (typeof list.indexOf === "function") {
      switch (typeof a) {
        case "number":
          if (a === 0) {
            inf = 1 / a;
            while (idx < list.length) {
              item = list[idx];
              if (item === 0 && 1 / item === inf) {
                return idx;
              }
              idx += 1;
            }
            return -1;
          } else if (a !== a) {
            while (idx < list.length) {
              item = list[idx];
              if (typeof item === "number" && item !== item) {
                return idx;
              }
              idx += 1;
            }
            return -1;
          }
          return list.indexOf(a, idx);
        case "string":
        case "boolean":
        case "function":
        case "undefined":
          return list.indexOf(a, idx);
        case "object":
          if (a === null) {
            return list.indexOf(a, idx);
          }
      }
    }
    while (idx < list.length) {
      if (equals_default(list[idx], a)) {
        return idx;
      }
      idx += 1;
    }
    return -1;
  }

  // node_modules/ramda/es/internal/_includes.js
  function _includes(a, list) {
    return _indexOf(list, a, 0) >= 0;
  }

  // node_modules/ramda/es/internal/_toISOString.js
  var pad = function pad2(n) {
    return (n < 10 ? "0" : "") + n;
  };
  var _toISOString = typeof Date.prototype.toISOString === "function" ? function _toISOString2(d) {
    return d.toISOString();
  } : function _toISOString3(d) {
    return d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate()) + "T" + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) + "." + (d.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
  };

  // node_modules/ramda/es/last.js
  var last = /* @__PURE__ */ nth_default(-1);
  var last_default = last;

  // node_modules/ramda/es/includes.js
  var includes = /* @__PURE__ */ _curry2(_includes);
  var includes_default = includes;

  // node_modules/ramda/es/is.js
  var is = /* @__PURE__ */ _curry2(function is2(Ctor, val) {
    return val instanceof Ctor || val != null && (val.constructor === Ctor || Ctor.name === "Object" && typeof val === "object");
  });
  var is_default = is;

  // node_modules/ramda/es/internal/_of.js
  function _of(x) {
    return [x];
  }

  // node_modules/ramda/es/of.js
  var of = /* @__PURE__ */ _curry1(_of);
  var of_default = of;

  // node_modules/ramda/es/pickAll.js
  var pickAll = /* @__PURE__ */ _curry2(function pickAll2(names, obj) {
    var result = {};
    var idx = 0;
    var len = names.length;
    while (idx < len) {
      var name = names[idx];
      result[name] = obj[name];
      idx += 1;
    }
    return result;
  });
  var pickAll_default = pickAll;

  // node_modules/ramda/es/trim.js
  var hasProtoTrim = typeof String.prototype.trim === "function";

  // contracts/common/lib/utils.js
  var import_json_logic_js = __toESM(require_logic());
  var import_jsonschema = __toESM(require_jsonschema());
  var import_pure = __toESM(require_pure());
  var err = (msg = `The wrong query`, contractErr = false) => {
    if (contractErr) {
      const error = typeof ContractError === "undefined" ? Error : ContractError;
      throw new error(msg);
    } else {
      throw msg;
    }
  };
  var isOwner = (signer, state) => {
    let owner = state.owner || [];
    if (is_default(String)(owner))
      owner = of_default(owner);
    if (!includes_default(signer)(owner)) {
      err(`Signer[${signer}] is not the owner[${owner.join(", ")}].`);
    }
    return owner;
  };
  var read = async (contract, param) => {
    return (await SmartWeave.contracts.viewContractState(contract, param)).result;
  };
  var isEvolving = (state) => !isNil_default(state.evolveHistory) && !isNil_default(last_default(state.evolveHistory)) && isNil_default(last_default(state.evolveHistory).newVersion);

  // contracts/common/lib/validate.js
  var validate = async (state, action, func) => {
    const {
      query,
      nonce,
      signature,
      caller,
      type: type3 = "secp256k1",
      pubKey
    } = action.input;
    if (!includes_default(type3)(
      state.auth.algorithms || ["secp256k1", "secp256k1-2", "ed25519", "rsa256"]
    )) {
      err(`The wrong algorithm`);
    }
    let _caller = caller;
    const EIP712Domain = [
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "verifyingContract", type: "string" }
    ];
    const domain = {
      name: state.auth.name,
      version: state.auth.version,
      verifyingContract: isNil_default(SmartWeave.contract) ? "exm" : SmartWeave.contract.id
    };
    const message = {
      nonce,
      query: JSON.stringify({ func, query })
    };
    const _data = {
      types: {
        EIP712Domain,
        Query: [
          { name: "query", type: "string" },
          { name: "nonce", type: "uint256" }
        ]
      },
      domain,
      primaryType: "Query",
      message
    };
    let signer = null;
    if (type3 === "ed25519") {
      const { isValid } = await read(state.contracts.dfinity, {
        function: "verify",
        data: _data,
        signature,
        signer: caller
      });
      if (isValid) {
        signer = caller;
      } else {
        err(`The wrong signature`);
      }
    } else if (type3 === "rsa256") {
      let encoded_data = JSON.stringify(_data);
      if (typeof TextEncoder !== "undefined") {
        const enc = new TextEncoder();
        encoded_data = enc.encode(encoded_data);
      }
      const _crypto = SmartWeave.arweave.crypto || SmartWeave.arweave.wallets.crypto;
      const isValid = await _crypto.verify(
        pubKey,
        encoded_data,
        Buffer.from(signature, "hex")
      );
      if (isValid) {
        signer = caller;
      } else {
        err(`The wrong signature`);
      }
    } else if (type3 == "secp256k1") {
      signer = (await read(state.contracts.ethereum, {
        function: "verify712",
        data: _data,
        signature
      })).signer;
    } else if (type3 == "secp256k1-2") {
      signer = (await read(state.contracts.ethereum, {
        function: "verify",
        data: _data,
        signature
      })).signer;
    }
    if (includes_default(type3)(["secp256k1", "secp256k1-2"])) {
      if (/^0x/.test(signer))
        signer = signer.toLowerCase();
      if (/^0x/.test(_caller))
        _caller = _caller.toLowerCase();
    }
    let original_signer = signer;
    let _signer = signer;
    if (_signer !== _caller) {
      const link = state.auth.links[_signer];
      if (!isNil_default(link)) {
        let _address = is_default(Object, link) ? link.address : link;
        let _expiry = is_default(Object, link) ? link.expiry || 0 : 0;
        if (_expiry === 0 || SmartWeave.block.timestamp <= _expiry) {
          _signer = _address;
        }
      }
    }
    if (_signer !== _caller)
      err(`signer[${_signer}] is not caller[${_caller}]`);
    let next_nonce = (state.nonces[original_signer] || 0) + 1;
    if (next_nonce !== nonce) {
      err(
        `The wrong nonce[${nonce}] for ${original_signer}: expected ${next_nonce}`
      );
    }
    if (isNil_default(state.nonces[original_signer]))
      state.nonces[original_signer] = 0;
    state.nonces[original_signer] += 1;
    return _signer;
  };

  // contracts/common/warp/actions/write/evolve.js
  var import_version = __toESM(require_version());
  var evolve = async (state, action, signer) => {
    signer ||= await validate(state, action, "evolve");
    const owner = isOwner(signer, state);
    if (action.input.value !== action.input.query.value) {
      err("Values don't match.");
    }
    if (state.canEvolve) {
      state.evolve = action.input.value;
    } else {
      err(`This contract cannot evolve.`);
    }
    state.evolveHistory ||= [];
    state.evolveHistory.push({
      signer,
      block: SmartWeave.block.height,
      data: SmartWeave.block.timestamp,
      srcTxId: action.input.value,
      oldVersion: import_version.default
    });
    return { state };
  };

  // contracts/common/actions/write/setCanEvolve.js
  var setCanEvolve = async (state, action, signer) => {
    signer ||= await validate(state, action, "setCanEvolve");
    const owner = isOwner(signer, state);
    if (!is_default(Boolean)(action.input.query.value)) {
      err("Value must be a boolean.");
    }
    state.canEvolve = action.input.query.value;
    return { state };
  };

  // contracts/common/actions/read/getEvolve.js
  var getEvolve = async (state, action) => {
    let evolve2 = pickAll_default(["canEvolve", "evolve"])(state);
    evolve2.history = state.evolveHistory || [];
    evolve2.isEvolving = isEvolving(state);
    return {
      result: evolve2
    };
  };

  // contracts/poseidon/poseidonConstants.js
  async function handle(state, action) {
    switch (action.input.function) {
      case "get":
        return { result: state.poseidonConstants };
      case "getEvolve":
        return await getEvolve(state, action);
      case "evolve":
        return await evolve(state, action);
      case "setCanEvolve":
        return await setCanEvolve(state, action);
      default:
        err(
          `No function supplied or function not recognised: "${action.input.function}"`
        );
    }
    return { state };
  }

/*! https://mths.be/punycode v1.3.2 by @mathias */
