"use strict";
(function(root, module) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports)  {
            module(root, exports);
        });
    } else if (typeof exports === 'object' && exports !== null && typeof exports.nodeName !== 'string') {
        module(global, exports);
    } else {
        module(root, root);
    }
}(typeof self !== 'undefined' ? self : this, function($rt_globals, $rt_exports) {
    var $rt_seed = 2463534242;
    function $rt_nextId() {
        var x = $rt_seed;
        x ^= x << 13;
        x ^= x >>> 17;
        x ^= x << 5;
        $rt_seed = x;
        return x;
    }
    function $rt_compare(a, b) {
        return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
    }
    function $rt_isInstance(obj, cls) {
        return obj instanceof $rt_objcls() && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
    }
    function $rt_isAssignable(from, to) {
        if (from === to) {
            return true;
        }
        if (to.$meta.item !== null) {
            return from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
        }
        var supertypes = from.$meta.supertypes;
        for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
            if ($rt_isAssignable(supertypes[i], to)) {
                return true;
            }
        }
        return false;
    }
    function $rt_castToInterface(obj, cls) {
        if (obj !== null && !$rt_isInstance(obj, cls)) {
            $rt_throwCCE();
        }
        return obj;
    }
    function $rt_castToClass(obj, cls) {
        if (obj !== null && !(obj instanceof cls)) {
            $rt_throwCCE();
        }
        return obj;
    }
    $rt_globals.Array.prototype.fill = $rt_globals.Array.prototype.fill || function(value, start, end) {
        var len = this.length;
        if (!len) return this;
        start = start | 0;
        var i = start < 0 ? $rt_globals.Math.max(len + start, 0) : $rt_globals.Math.min(start, len);
        end = end === $rt_globals.undefined ? len : end | 0;
        end = end < 0 ? $rt_globals.Math.max(len + end, 0) : $rt_globals.Math.min(end, len);
        for (;i < end;i++) {
            this[i] = value;
        }
        return this;
    };
    function $rt_createArray(cls, sz) {
        var data = new $rt_globals.Array(sz);
        data.fill(null);
        return new $rt_array(cls, data);
    }
    function $rt_createArrayFromData(cls, init) {
        return $rt_wrapArray(cls, init);
    }
    function $rt_wrapArray(cls, data) {
        return new $rt_array(cls, data);
    }
    function $rt_createUnfilledArray(cls, sz) {
        return new $rt_array(cls, new $rt_globals.Array(sz));
    }
    function $rt_createNumericArray(cls, nativeArray) {
        return new $rt_array(cls, nativeArray);
    }
    var $rt_createLongArray;
    var $rt_createLongArrayFromData;
    if (typeof $rt_globals.BigInt64Array !== 'function') {
        $rt_createLongArray = function(sz) {
            var data = new $rt_globals.Array(sz);
            var arr = new $rt_array($rt_longcls(), data);
            data.fill(Long_ZERO);
            return arr;
        };
        $rt_createLongArrayFromData = function(init) {
            return new $rt_array($rt_longcls(), init);
        };
    } else {
        $rt_createLongArray = function(sz) {
            return $rt_createNumericArray($rt_longcls(), new $rt_globals.BigInt64Array(sz));
        };
        $rt_createLongArrayFromData = function(data) {
            var buffer = new $rt_globals.BigInt64Array(data.length);
            buffer.set(data);
            return $rt_createNumericArray($rt_longcls(), buffer);
        };
    }
    function $rt_createCharArray(sz) {
        return $rt_createNumericArray($rt_charcls(), new $rt_globals.Uint16Array(sz));
    }
    function $rt_createCharArrayFromData(data) {
        var buffer = new $rt_globals.Uint16Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_charcls(), buffer);
    }
    function $rt_createByteArray(sz) {
        return $rt_createNumericArray($rt_bytecls(), new $rt_globals.Int8Array(sz));
    }
    function $rt_createByteArrayFromData(data) {
        var buffer = new $rt_globals.Int8Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_bytecls(), buffer);
    }
    function $rt_createShortArray(sz) {
        return $rt_createNumericArray($rt_shortcls(), new $rt_globals.Int16Array(sz));
    }
    function $rt_createShortArrayFromData(data) {
        var buffer = new $rt_globals.Int16Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_shortcls(), buffer);
    }
    function $rt_createIntArray(sz) {
        return $rt_createNumericArray($rt_intcls(), new $rt_globals.Int32Array(sz));
    }
    function $rt_createIntArrayFromData(data) {
        var buffer = new $rt_globals.Int32Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_intcls(), buffer);
    }
    function $rt_createBooleanArray(sz) {
        return $rt_createNumericArray($rt_booleancls(), new $rt_globals.Int8Array(sz));
    }
    function $rt_createBooleanArrayFromData(data) {
        var buffer = new $rt_globals.Int8Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_booleancls(), buffer);
    }
    function $rt_createFloatArray(sz) {
        return $rt_createNumericArray($rt_floatcls(), new $rt_globals.Float32Array(sz));
    }
    function $rt_createFloatArrayFromData(data) {
        var buffer = new $rt_globals.Float32Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_floatcls(), buffer);
    }
    function $rt_createDoubleArray(sz) {
        return $rt_createNumericArray($rt_doublecls(), new $rt_globals.Float64Array(sz));
    }
    function $rt_createDoubleArrayFromData(data) {
        var buffer = new $rt_globals.Float64Array(data.length);
        buffer.set(data);
        return $rt_createNumericArray($rt_doublecls(), buffer);
    }
    function $rt_arraycls(cls) {
        var result = cls.$array;
        if (result === null) {
            var arraycls = {  };
            var name = "[" + cls.$meta.binaryName;
            arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
            arraycls.classObject = null;
            arraycls.$array = null;
            result = arraycls;
            cls.$array = arraycls;
        }
        return result;
    }
    function $rt_createcls() {
        return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
    }
    function $rt_createPrimitiveCls(name, binaryName) {
        var cls = $rt_createcls();
        cls.$meta.primitive = true;
        cls.$meta.name = name;
        cls.$meta.binaryName = binaryName;
        cls.$meta.enum = false;
        cls.$meta.item = null;
        cls.$meta.simpleName = null;
        cls.$meta.declaringClass = null;
        cls.$meta.enclosingClass = null;
        return cls;
    }
    var $rt_booleanclsCache = null;
    function $rt_booleancls() {
        if ($rt_booleanclsCache === null) {
            $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
        }
        return $rt_booleanclsCache;
    }
    var $rt_charclsCache = null;
    function $rt_charcls() {
        if ($rt_charclsCache === null) {
            $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
        }
        return $rt_charclsCache;
    }
    var $rt_byteclsCache = null;
    function $rt_bytecls() {
        if ($rt_byteclsCache === null) {
            $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
        }
        return $rt_byteclsCache;
    }
    var $rt_shortclsCache = null;
    function $rt_shortcls() {
        if ($rt_shortclsCache === null) {
            $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
        }
        return $rt_shortclsCache;
    }
    var $rt_intclsCache = null;
    function $rt_intcls() {
        if ($rt_intclsCache === null) {
            $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
        }
        return $rt_intclsCache;
    }
    var $rt_longclsCache = null;
    function $rt_longcls() {
        if ($rt_longclsCache === null) {
            $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
        }
        return $rt_longclsCache;
    }
    var $rt_floatclsCache = null;
    function $rt_floatcls() {
        if ($rt_floatclsCache === null) {
            $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
        }
        return $rt_floatclsCache;
    }
    var $rt_doubleclsCache = null;
    function $rt_doublecls() {
        if ($rt_doubleclsCache === null) {
            $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
        }
        return $rt_doubleclsCache;
    }
    var $rt_voidclsCache = null;
    function $rt_voidcls() {
        if ($rt_voidclsCache === null) {
            $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
        }
        return $rt_voidclsCache;
    }
    function $rt_throw(ex) {
        throw $rt_exception(ex);
    }
    var $rt_javaExceptionProp = $rt_globals.Symbol("javaException");
    function $rt_exception(ex) {
        var err = ex.$jsException;
        if (!err) {
            var javaCause = $rt_throwableCause(ex);
            var jsCause = javaCause !== null ? javaCause.$jsException : $rt_globals.undefined;
            var cause = typeof jsCause === "object" ? { cause : jsCause } : $rt_globals.undefined;
            err = new JavaError("Java exception thrown", cause);
            if (typeof $rt_globals.Error.captureStackTrace === "function") {
                $rt_globals.Error.captureStackTrace(err);
            }
            err[$rt_javaExceptionProp] = ex;
            ex.$jsException = err;
            $rt_fillStack(err, ex);
        }
        return err;
    }
    function $rt_fillStack(err, ex) {
        if (typeof $rt_decodeStack === "function" && err.stack) {
            var stack = $rt_decodeStack(err.stack);
            var javaStack = $rt_createArray($rt_stecls(), stack.length);
            var elem;
            var noStack = false;
            for (var i = 0;i < stack.length;++i) {
                var element = stack[i];
                elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
                if (elem == null) {
                    noStack = true;
                    break;
                }
                javaStack.data[i] = elem;
            }
            if (!noStack) {
                $rt_setStack(ex, javaStack);
            }
        }
    }
    function $rt_createMultiArray(cls, dimensions) {
        var first = 0;
        for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
            if (dimensions[i] === 0) {
                first = i;
                break;
            }
        }
        if (first > 0) {
            for (i = 0;i < first;i = i + 1 | 0) {
                cls = $rt_arraycls(cls);
            }
            if (first === dimensions.length - 1) {
                return $rt_createArray(cls, dimensions[first]);
            }
        }
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, first));
        var firstDim = dimensions[first] | 0;
        for (i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createArray(cls, firstDim);
        }
        return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
    }
    function $rt_createByteMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_bytecls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createByteArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
    }
    function $rt_createCharMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_charcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createCharArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
    }
    function $rt_createBooleanMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_booleancls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createBooleanArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
    }
    function $rt_createShortMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_shortcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createShortArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
    }
    function $rt_createIntMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_intcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createIntArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
    }
    function $rt_createLongMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_longcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createLongArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
    }
    function $rt_createFloatMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_floatcls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createFloatArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
    }
    function $rt_createDoubleMultiArray(dimensions) {
        var arrays = new $rt_globals.Array($rt_primitiveArrayCount(dimensions, 0));
        if (arrays.length === 0) {
            return $rt_createMultiArray($rt_doublecls(), dimensions);
        }
        var firstDim = dimensions[0] | 0;
        for (var i = 0;i < arrays.length;i = i + 1 | 0) {
            arrays[i] = $rt_createDoubleArray(firstDim);
        }
        return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
    }
    function $rt_primitiveArrayCount(dimensions, start) {
        var val = dimensions[start + 1] | 0;
        for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
            val = val * (dimensions[i] | 0) | 0;
            if (val === 0) {
                break;
            }
        }
        return val;
    }
    function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
        var limit = arrays.length;
        for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
            var dim = dimensions[i];
            var index = 0;
            var packedIndex = 0;
            while (index < limit) {
                var arr = $rt_createUnfilledArray(cls, dim);
                for (var j = 0;j < dim;j = j + 1 | 0) {
                    arr.data[j] = arrays[index];
                    index = index + 1 | 0;
                }
                arrays[packedIndex] = arr;
                packedIndex = packedIndex + 1 | 0;
            }
            limit = packedIndex;
        }
        return arrays[0];
    }
    function $rt_assertNotNaN(value) {
        if (typeof value === 'number' && $rt_globals.isNaN(value)) {
            throw "NaN";
        }
        return value;
    }
    function $rt_createOutputFunction(printFunction) {
        var buffer = "";
        var utf8Buffer = 0;
        var utf8Remaining = 0;
        function putCodePoint(ch) {
            if (ch === 0xA) {
                printFunction(buffer);
                buffer = "";
            } else if (ch < 0x10000) {
                buffer += $rt_globals.String.fromCharCode(ch);
            } else {
                ch = ch - 0x10000 | 0;
                var hi = (ch >> 10) + 0xD800;
                var lo = (ch & 0x3FF) + 0xDC00;
                buffer += $rt_globals.String.fromCharCode(hi, lo);
            }
        }
        return function(ch) {
            if ((ch & 0x80) === 0) {
                putCodePoint(ch);
            } else if ((ch & 0xC0) === 0x80) {
                if (utf8Buffer > 0) {
                    utf8Remaining <<= 6;
                    utf8Remaining |= ch & 0x3F;
                    if ( --utf8Buffer === 0) {
                        putCodePoint(utf8Remaining);
                    }
                }
            } else if ((ch & 0xE0) === 0xC0) {
                utf8Remaining = ch & 0x1F;
                utf8Buffer = 1;
            } else if ((ch & 0xF0) === 0xE0) {
                utf8Remaining = ch & 0x0F;
                utf8Buffer = 2;
            } else if ((ch & 0xF8) === 0xF0) {
                utf8Remaining = ch & 0x07;
                utf8Buffer = 3;
            }
        };
    }
    var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : typeof $rt_globals.console === "object" ? $rt_createOutputFunction(function(msg) {
        $rt_globals.console.info(msg);
    }) : function() {
    };
    var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : typeof $rt_globals.console === "object" ? $rt_createOutputFunction(function(msg) {
        $rt_globals.console.error(msg);
    }) : function() {
    };
    var $rt_packageData = null;
    function $rt_packages(data) {
        var i = 0;
        var packages = new $rt_globals.Array(data.length);
        for (var j = 0;j < data.length;++j) {
            var prefixIndex = data[i++];
            var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
            packages[j] = prefix + data[i++] + ".";
        }
        $rt_packageData = packages;
    }
    function $rt_metadata(data) {
        var packages = $rt_packageData;
        var i = 0;
        while (i < data.length) {
            var cls = data[i++];
            cls.$meta = {  };
            var m = cls.$meta;
            var className = data[i++];
            m.name = className !== 0 ? className : null;
            if (m.name !== null) {
                var packageIndex = data[i++];
                if (packageIndex >= 0) {
                    m.name = packages[packageIndex] + m.name;
                }
            }
            m.binaryName = "L" + m.name + ";";
            var superclass = data[i++];
            m.superclass = superclass !== 0 ? superclass : null;
            m.supertypes = data[i++];
            if (m.superclass) {
                m.supertypes.push(m.superclass);
                cls.prototype = $rt_globals.Object.create(m.superclass.prototype);
            } else {
                cls.prototype = {  };
            }
            var flags = data[i++];
            m.enum = (flags & 8) !== 0;
            m.flags = flags;
            m.primitive = false;
            m.item = null;
            cls.prototype.constructor = cls;
            cls.classObject = null;
            m.accessLevel = data[i++];
            var innerClassInfo = data[i++];
            if (innerClassInfo === 0) {
                m.simpleName = null;
                m.declaringClass = null;
                m.enclosingClass = null;
            } else {
                var enclosingClass = innerClassInfo[0];
                m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
                var declaringClass = innerClassInfo[1];
                m.declaringClass = declaringClass !== 0 ? declaringClass : null;
                var simpleName = innerClassInfo[2];
                m.simpleName = simpleName !== 0 ? simpleName : null;
            }
            var clinit = data[i++];
            cls.$clinit = clinit !== 0 ? clinit : function() {
            };
            var virtualMethods = data[i++];
            if (virtualMethods !== 0) {
                for (var j = 0;j < virtualMethods.length;j += 2) {
                    var name = virtualMethods[j];
                    var func = virtualMethods[j + 1];
                    if (typeof name === 'string') {
                        name = [name];
                    }
                    for (var k = 0;k < name.length;++k) {
                        cls.prototype[name[k]] = func;
                    }
                }
            }
            cls.$array = null;
        }
    }
    function $rt_wrapFunction0(f) {
        return function() {
            return f(this);
        };
    }
    function $rt_wrapFunction1(f) {
        return function(p1) {
            return f(this, p1);
        };
    }
    function $rt_wrapFunction2(f) {
        return function(p1, p2) {
            return f(this, p1, p2);
        };
    }
    function $rt_wrapFunction3(f) {
        return function(p1, p2, p3) {
            return f(this, p1, p2, p3, p3);
        };
    }
    function $rt_wrapFunction4(f) {
        return function(p1, p2, p3, p4) {
            return f(this, p1, p2, p3, p4);
        };
    }
    function $rt_threadStarter(f) {
        return function() {
            var args = $rt_globals.Array.prototype.slice.apply(arguments);
            $rt_startThread(function() {
                f.apply(this, args);
            });
        };
    }
    function $rt_mainStarter(f) {
        return function(args, callback) {
            if (!args) {
                args = [];
            }
            var javaArgs = $rt_createArray($rt_objcls(), args.length);
            for (var i = 0;i < args.length;++i) {
                javaArgs.data[i] = $rt_str(args[i]);
            }
            $rt_startThread(function() {
                f.call(null, javaArgs);
            }, callback);
        };
    }
    var $rt_stringPool_instance;
    function $rt_stringPool(strings) {
        $rt_stringPool_instance = new $rt_globals.Array(strings.length);
        for (var i = 0;i < strings.length;++i) {
            $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
        }
    }
    function $rt_s(index) {
        return $rt_stringPool_instance[index];
    }
    function $rt_eraseClinit(target) {
        return target.$clinit = function() {
        };
    }
    var $rt_numberConversionBuffer = new $rt_globals.ArrayBuffer(16);
    var $rt_numberConversionView = new $rt_globals.DataView($rt_numberConversionBuffer);
    var $rt_numberConversionFloatArray = new $rt_globals.Float32Array($rt_numberConversionBuffer);
    var $rt_numberConversionDoubleArray = new $rt_globals.Float64Array($rt_numberConversionBuffer);
    var $rt_numberConversionIntArray = new $rt_globals.Int32Array($rt_numberConversionBuffer);
    var $rt_doubleToRawLongBits;
    var $rt_longBitsToDouble;
    if (typeof $rt_globals.BigInt !== 'function') {
        $rt_doubleToRawLongBits = function(n) {
            $rt_numberConversionView.setFloat64(0, n, true);
            return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
        };
        $rt_longBitsToDouble = function(n) {
            $rt_numberConversionView.setInt32(0, n.lo, true);
            $rt_numberConversionView.setInt32(4, n.hi, true);
            return $rt_numberConversionView.getFloat64(0, true);
        };
    } else if (typeof $rt_globals.BigInt64Array !== 'function') {
        $rt_doubleToRawLongBits = function(n) {
            $rt_numberConversionView.setFloat64(0, n, true);
            var lo = $rt_numberConversionView.getInt32(0, true);
            var hi = $rt_numberConversionView.getInt32(4, true);
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(32, $rt_globals.BigInt(lo)) | $rt_globals.BigInt(hi) << $rt_globals.BigInt(32));
        };
        $rt_longBitsToDouble = function(n) {
            $rt_numberConversionView.setFloat64(0, n, true);
            var lo = $rt_numberConversionView.getInt32(0, true);
            var hi = $rt_numberConversionView.getInt32(4, true);
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(32, $rt_globals.BigInt(lo)) | $rt_globals.BigInt(hi) << $rt_globals.BigInt(32));
        };
    } else {
        var $rt_numberConversionLongArray = new $rt_globals.BigInt64Array($rt_numberConversionBuffer);
        $rt_doubleToRawLongBits = function(n) {
            $rt_numberConversionDoubleArray[0] = n;
            return $rt_numberConversionLongArray[0];
        };
        $rt_longBitsToDouble = function(n) {
            $rt_numberConversionLongArray[0] = n;
            return $rt_numberConversionDoubleArray[0];
        };
    }
    function $rt_floatToRawIntBits(n) {
        $rt_numberConversionFloatArray[0] = n;
        return $rt_numberConversionIntArray[0];
    }
    function $rt_intBitsToFloat(n) {
        $rt_numberConversionIntArray[0] = n;
        return $rt_numberConversionFloatArray[0];
    }
    function $rt_equalDoubles(a, b) {
        if (a !== a) {
            return b !== b;
        }
        $rt_numberConversionDoubleArray[0] = a;
        $rt_numberConversionDoubleArray[1] = b;
        return $rt_numberConversionIntArray[0] === $rt_numberConversionIntArray[2] && $rt_numberConversionIntArray[1] === $rt_numberConversionIntArray[3];
    }
    var JavaError;
    if (typeof $rt_globals.Reflect === 'object') {
        var defaultMessage = $rt_globals.Symbol("defaultMessage");
        JavaError = function JavaError(message, cause) {
            var self = $rt_globals.Reflect.construct($rt_globals.Error, [$rt_globals.undefined, cause], JavaError);
            $rt_globals.Object.setPrototypeOf(self, JavaError.prototype);
            self[defaultMessage] = message;
            return self;
        };
        JavaError.prototype = $rt_globals.Object.create($rt_globals.Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get : function() {
            try {
                var javaException = this[$rt_javaExceptionProp];
                if (typeof javaException === 'object') {
                    var javaMessage = $rt_throwableMessage(javaException);
                    if (typeof javaMessage === "object") {
                        return javaMessage !== null ? javaMessage.toString() : null;
                    }
                }
                return this[defaultMessage];
            } catch (e){
                return "Exception occurred trying to extract Java exception message: " + e;
            }
        } } });
    } else {
        JavaError = $rt_globals.Error;
    }
    function $rt_javaException(e) {
        return e instanceof $rt_globals.Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null;
    }
    function $rt_jsException(e) {
        return typeof e.$jsException === 'object' ? e.$jsException : null;
    }
    function $rt_wrapException(err) {
        var ex = err[$rt_javaExceptionProp];
        if (!ex) {
            ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
            err[$rt_javaExceptionProp] = ex;
            ex.$jsException = err;
            $rt_fillStack(err, ex);
        }
        return ex;
    }
    function $dbg_class(obj) {
        var cls = obj.constructor;
        var arrayDegree = 0;
        while (cls.$meta && cls.$meta.item) {
            ++arrayDegree;
            cls = cls.$meta.item;
        }
        var clsName = "";
        if (cls === $rt_booleancls()) {
            clsName = "boolean";
        } else if (cls === $rt_bytecls()) {
            clsName = "byte";
        } else if (cls === $rt_shortcls()) {
            clsName = "short";
        } else if (cls === $rt_charcls()) {
            clsName = "char";
        } else if (cls === $rt_intcls()) {
            clsName = "int";
        } else if (cls === $rt_longcls()) {
            clsName = "long";
        } else if (cls === $rt_floatcls()) {
            clsName = "float";
        } else if (cls === $rt_doublecls()) {
            clsName = "double";
        } else {
            clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
        }
        while (arrayDegree-- > 0) {
            clsName += "[]";
        }
        return clsName;
    }
    function Long(lo, hi) {
        this.lo = lo | 0;
        this.hi = hi | 0;
    }
    Long.prototype.__teavm_class__ = function() {
        return "long";
    };
    function Long_isPositive(a) {
        return (a.hi & 0x80000000) === 0;
    }
    function Long_isNegative(a) {
        return (a.hi & 0x80000000) !== 0;
    }
    var Long_MAX_NORMAL = 1 << 18;
    var Long_ZERO;
    var Long_create;
    var Long_fromInt;
    var Long_fromNumber;
    var Long_toNumber;
    var Long_hi;
    var Long_lo;
    if (typeof $rt_globals.BigInt !== "function") {
        Long.prototype.toString = function() {
            var result = [];
            var n = this;
            var positive = Long_isPositive(n);
            if (!positive) {
                n = Long_neg(n);
            }
            var radix = new Long(10, 0);
            do  {
                var divRem = Long_divRem(n, radix);
                result.push($rt_globals.String.fromCharCode(48 + divRem[1].lo));
                n = divRem[0];
            }while (n.lo !== 0 || n.hi !== 0);
            result = (result.reverse()).join('');
            return positive ? result : "-" + result;
        };
        Long.prototype.valueOf = function() {
            return Long_toNumber(this);
        };
        Long_ZERO = new Long(0, 0);
        Long_fromInt = function(val) {
            return new Long(val,  -(val < 0) | 0);
        };
        Long_fromNumber = function(val) {
            if (val >= 0) {
                return new Long(val | 0, val / 0x100000000 | 0);
            } else {
                return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
            }
        };
        Long_create = function(lo, hi) {
            return new Long(lo, hi);
        };
        Long_toNumber = function(val) {
            return 0x100000000 * val.hi + (val.lo >>> 0);
        };
        Long_hi = function(val) {
            return val.hi;
        };
        Long_lo = function(val) {
            return val.lo;
        };
    } else {
        Long_ZERO = $rt_globals.BigInt(0);
        Long_create = function(lo, hi) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, $rt_globals.BigInt(lo)) | $rt_globals.BigInt.asUintN(64, $rt_globals.BigInt(hi) << $rt_globals.BigInt(32)));
        };
        Long_fromInt = function(val) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt(val | 0));
        };
        Long_fromNumber = function(val) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt(val >= 0 ? $rt_globals.Math.floor(val) : $rt_globals.Math.ceil(val)));
        };
        Long_toNumber = function(val) {
            return $rt_globals.Number(val);
        };
        Long_hi = function(val) {
            return $rt_globals.Number($rt_globals.BigInt.asIntN(64, val >> $rt_globals.BigInt(32))) | 0;
        };
        Long_lo = function(val) {
            return $rt_globals.Number($rt_globals.BigInt.asIntN(32, val)) | 0;
        };
    }
    var $rt_imul = $rt_globals.Math.imul || function(a, b) {
        var ah = a >>> 16 & 0xFFFF;
        var al = a & 0xFFFF;
        var bh = b >>> 16 & 0xFFFF;
        var bl = b & 0xFFFF;
        return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    };
    var $rt_udiv = function(a, b) {
        return (a >>> 0) / (b >>> 0) >>> 0;
    };
    var $rt_umod = function(a, b) {
        return (a >>> 0) % (b >>> 0) >>> 0;
    };
    var $rt_ucmp = function(a, b) {
        a >>>= 0;
        b >>>= 0;
        return a < b ?  -1 : a > b ? 1 : 0;
    };
    function $rt_checkBounds(index, array) {
        if (index < 0 || index >= array.length) {
            $rt_throwAIOOBE();
        }
        return index;
    }
    function $rt_checkUpperBound(index, array) {
        if (index >= array.length) {
            $rt_throwAIOOBE();
        }
        return index;
    }
    function $rt_checkLowerBound(index) {
        if (index < 0) {
            $rt_throwAIOOBE();
        }
        return index;
    }
    function $rt_classWithoutFields(superclass) {
        if (superclass === 0) {
            return function() {
            };
        }
        if (superclass === void 0) {
            superclass = $rt_objcls();
        }
        return function() {
            superclass.call(this);
        };
    }
    function $rt_setCloneMethod(target, f) {
        target.$clone = f;
    }
    function $rt_cls(cls) {
        return jl_Class_getClass(cls);
    }
    function $rt_str(str) {
        if (str === null) {
            return null;
        }
        var characters = $rt_createCharArray(str.length);
        var charsBuffer = characters.data;
        for (var i = 0; i < str.length; i = (i + 1) | 0) {
            charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
        }
        return jl_String__init_(characters);
    }
    function $rt_ustr(str) {
        if (str === null) {
            return null;
        }
        var data = str.$characters.data;
        var result = "";
        for (var i = 0; i < data.length; i = (i + 1) | 0) {
            result += String.fromCharCode(data[i]);
        }
        return result;
    }
    function $rt_objcls() { return jl_Object; }
    function $rt_stecls() {
        return jl_Object;
    }
    function $rt_throwableMessage(t) {
        return jl_Throwable_getMessage(t);
    }
    function $rt_throwableCause(t) {
        return jl_Throwable_getCause(t);
    }
    function $rt_nullCheck(val) {
        if (val === null) {
            $rt_throw(jl_NullPointerException__init_());
        }
        return val;
    }
    function $rt_intern(str) {
        return str;
    }
    function $rt_getThread() {
        return jl_Thread_currentThread();
    }
    function $rt_setThread(t) {
        return jl_Thread_setCurrentThread(t);
    }
    function $rt_createException(message) {
        return jl_RuntimeException__init_(message);
    }
    function $rt_createStackElement(className, methodName, fileName, lineNumber) {
        return null;
    }
    function $rt_setStack(e, stack) {
    }
    function $rt_throwAIOOBE() {
        $rt_throw(jl_ArrayIndexOutOfBoundsException__init_());
    }
    function $rt_throwCCE() {
    }
    var $java = Object.create(null);
    function jl_Object() {
        this.$monitor = null;
        this.$id$ = 0;
    }
    function jl_Object__init_() {
        var var_0 = new jl_Object();
        jl_Object__init_0(var_0);
        return var_0;
    }
    function jl_Object_monitorEnterSync($o) {
        var var$2, var$3;
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        var$2 = $o.$monitor;
        var$3 = var$2.$owner;
        if (var$3 === null)
            var$2.$owner = jl_Thread_currentThread();
        else if (var$3 !== jl_Thread_currentThread()) {
            var$2 = new jl_IllegalStateException;
            jl_Throwable__init_(var$2, $rt_s(0));
            $rt_throw(var$2);
        }
        $o = $o.$monitor;
        $o.$count = $o.$count + 1 | 0;
    }
    function jl_Object_monitorExitSync($o) {
        var var$2, var$3;
        if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
            var$2 = $o.$monitor;
            var$3 = var$2.$count - 1 | 0;
            var$2.$count = var$3;
            if (!var$3)
                var$2.$owner = null;
            jl_Object_isEmptyMonitor($o);
            return;
        }
        $o = new jl_IllegalMonitorStateException;
        jl_Exception__init_($o);
        $rt_throw($o);
    }
    function jl_Object_monitorEnter($o) {
        var var$2;
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        var$2 = $o.$monitor;
        if (var$2.$owner === null)
            var$2.$owner = jl_Thread_currentThread();
        if ($o.$monitor.$owner !== jl_Thread_currentThread())
            jl_Object_monitorEnterWait$_asyncCall_$($o, 1);
        else {
            $o = $o.$monitor;
            $o.$count = $o.$count + 1 | 0;
        }
    }
    function jl_Object_createMonitor($o) {
        var var$2;
        var$2 = new jl_Object$Monitor;
        var$2.$owner = jl_Thread_currentThread();
        $o.$monitor = var$2;
    }
    function jl_Object_monitorEnterWait($o, $count, $callback) {
        var $thread_0, $monitor, var$6;
        $thread_0 = jl_Thread_currentThread();
        $monitor = $o.$monitor;
        if ($monitor === null) {
            jl_Object_createMonitor($o);
            jl_Thread_setCurrentThread($thread_0);
            $o = $o.$monitor;
            $o.$count = $o.$count + $count | 0;
            otpp_AsyncCallbackWrapper_complete($callback, null);
            return;
        }
        if ($monitor.$owner === null) {
            $monitor.$owner = $thread_0;
            jl_Thread_setCurrentThread($thread_0);
            $o = $o.$monitor;
            $o.$count = $o.$count + $count | 0;
            otpp_AsyncCallbackWrapper_complete($callback, null);
            return;
        }
        if ($monitor.$enteringThreads === null)
            $monitor.$enteringThreads = otp_Platform_createQueueJs$js_body$_30();
        $monitor = $monitor.$enteringThreads;
        var$6 = new jl_Object$monitorEnterWait$lambda$_6_0;
        var$6.$_0 = $thread_0;
        var$6.$_1 = $o;
        var$6.$_2 = $count;
        var$6.$_3 = $callback;
        $callback = var$6;
        $monitor.push($callback);
    }
    function jl_Object_monitorExit($o) {
        var var$2, var$3;
        if (!jl_Object_isEmptyMonitor($o) && $o.$monitor.$owner === jl_Thread_currentThread()) {
            var$2 = $o.$monitor;
            var$3 = var$2.$count - 1 | 0;
            var$2.$count = var$3;
            if (var$3 <= 0) {
                var$2.$owner = null;
                var$2 = var$2.$enteringThreads;
                if (var$2 !== null && !otp_PlatformQueue_isEmpty$static(var$2)) {
                    var$2 = new jl_Object$monitorExit$lambda$_8_0;
                    var$2.$_00 = $o;
                    otp_Platform_schedule(var$2, 0);
                } else
                    jl_Object_isEmptyMonitor($o);
            }
            return;
        }
        $o = new jl_IllegalMonitorStateException;
        jl_Exception__init_($o);
        $rt_throw($o);
    }
    function jl_Object_isEmptyMonitor($this) {
        var $monitor, var$2;
        $monitor = $this.$monitor;
        if ($monitor === null)
            return 1;
        a: {
            if ($monitor.$owner === null) {
                var$2 = $monitor.$enteringThreads;
                if (!(var$2 !== null && !otp_PlatformQueue_isEmpty$static(var$2))) {
                    $monitor = $monitor.$notifyListeners;
                    if ($monitor === null)
                        break a;
                    if (otp_PlatformQueue_isEmpty$static($monitor))
                        break a;
                }
            }
            return 0;
        }
        $this.$monitor = null;
        return 1;
    }
    function jl_Object__init_0($this) {}
    function jl_Object_getClass($this) {
        return jl_Class_getClass($this.constructor);
    }
    function jl_Object_equals($this, $other) {
        return $this !== $other ? 0 : 1;
    }
    function jl_Object_toString($this) {
        var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
        var$1 = jl_Class_getName(jl_Object_getClass($this));
        var$2 = $this;
        if (!var$2.$id$) {
            var$3 = $rt_nextId();
            var$2.$id$ = var$3;
        }
        var$4 = $this.$id$;
        if (!var$4)
            var$3 = $rt_s(1);
        else {
            if (!var$4)
                var$5 = 32;
            else {
                var$6 = 0;
                var$5 = var$4 >>> 16 | 0;
                if (var$5)
                    var$6 = 16;
                else
                    var$5 = var$4;
                var$7 = var$5 >>> 8 | 0;
                if (!var$7)
                    var$7 = var$5;
                else
                    var$6 = var$6 | 8;
                var$5 = var$7 >>> 4 | 0;
                if (!var$5)
                    var$5 = var$7;
                else
                    var$6 = var$6 | 4;
                var$7 = var$5 >>> 2 | 0;
                if (!var$7)
                    var$7 = var$5;
                else
                    var$6 = var$6 | 2;
                if (var$7 >>> 1 | 0)
                    var$6 = var$6 | 1;
                var$5 = (32 - var$6 | 0) - 1 | 0;
            }
            var$5 = (((32 - var$5 | 0) + 4 | 0) - 1 | 0) / 4 | 0;
            var$8 = $rt_createCharArray(var$5);
            var$9 = var$8.data;
            var$6 = (var$5 - 1 | 0) * 4 | 0;
            var$7 = 0;
            while (var$6 >= 0) {
                var$10 = var$7 + 1 | 0;
                var$9[var$7] = jl_Character_forDigit((var$4 >>> var$6 | 0) & 15, 16);
                var$6 = var$6 - 4 | 0;
                var$7 = var$10;
            }
            var$3 = jl_String__init_(var$8);
        }
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append0(jl_StringBuilder_append(var$2, var$1), 64), var$3);
        return jl_StringBuilder_toString(var$2);
    }
    function jl_Object_clone($this) {
        var $result, var$2, var$3;
        if (!$rt_isInstance($this, jl_Cloneable) && $this.constructor.$meta.item === null) {
            $result = new jl_CloneNotSupportedException;
            jl_Exception__init_($result);
            $rt_throw($result);
        }
        $result = otp_Platform_clone($this);
        var$2 = $result;
        var$3 = $rt_nextId();
        var$2.$id$ = var$3;
        return $result;
    }
    function jl_Object_monitorEnterWait$_asyncCall_$(var$1, var$2) {
        var thread = $rt_nativeThread();
        var javaThread = $rt_getThread();
        if (thread.isResuming()) {
            thread.status = 0;
            var result = thread.attribute;
            if (result instanceof Error) {
                throw result;
            }
            return result;
        }
        var callback = function() {};
        callback.$complete = function(val) {
            thread.attribute = val;
            $rt_setThread(javaThread);
            thread.resume();
        };
        callback.$error = function(e) {
            thread.attribute = $rt_exception(e);
            $rt_setThread(javaThread);
            thread.resume();
        };
        callback = otpp_AsyncCallbackWrapper_create(callback);
        thread.suspend(function() {
            try {
                jl_Object_monitorEnterWait(var$1, var$2, callback);
            } catch($e) {
                callback.$error($rt_exception($e));
            }
        });
        return null;
    }
    var cdmC_Client = $rt_classWithoutFields();
    function cdmC_Client_main($args) {
        var $rubyDung, var$3, var$4, var$5, var$6, var$7, var$8, $$je, $ptr, $tmp;
        $ptr = 0;
        if ($rt_resuming()) {
            var $thread = $rt_nativeThread();
            $ptr = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();$rubyDung = $thread.pop();$args = $thread.pop();
        }
        main: while (true) { switch ($ptr) {
        case 0:
            jl_Integer__clinit_();
            jl_Character__clinit_();
            m_WebGL__clinit_();
            cmr_Textures__clinit_();
            otci_Base64Impl__clinit_();
            cjj_Inflate__clinit_();
            cjj_InfBlocks__clinit_();
            cjj_InfCodes__clinit_();
            cjj_CRC32__clinit_();
            cjj_InfTree__clinit_();
            ji_FileInputStream__clinit_();
            otcic_StderrOutputStream__clinit_();
            jnc_CoderResult__clinit_();
            cjj_Tree__clinit_();
            ji_FileOutputStream__clinit_();
            oli_Mouse__clinit_();
            cmrl_Tile__clinit_();
            jl_Float__clinit_();
            m_ProgramGL__clinit_();
            $rubyDung = new cmr_RubyDung;
            var$3 = new cmr_Timer;
            var$3.$lastTime = jl_System_nanoTime();
            var$3.$timeScale = 1.0;
            var$3.$fps = 0.0;
            var$3.$passedTime = 0.0;
            var$3.$ticksPerSecond = 60.0;
            $rubyDung.$timer = var$3;
            $rubyDung.$fogColor = ol_BufferUtils_createFloatBuffer(4);
            $rubyDung.$width = 1024;
            $rubyDung.$height = 768;
            $rubyDung.$viewportBuffer = ol_BufferUtils_createIntBuffer(16);
            $rubyDung.$selectBuffer = ol_BufferUtils_createIntBuffer(2000);
            try {
                $ptr = 1;
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                } else {
                    throw $$e;
                }
            }
            var$4 = jl_System_currentTimeMillis();
            a: {
                b: {
                    c: {
                        d: {
                            e: {
                                try {
                                    if (!oli_Keyboard_isKeyDown(1) && !olo_Display_isCloseRequested())
                                        break e;
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Exception) {
                                        var$3 = $$je;
                                        break d;
                                    } else{
                                        var$3 = $$je;
                                        break c;
                                    }
                                }
                                cmr_RubyDung_destroy($rubyDung);
                                break a;
                            }
                            try {
                                cmr_Timer_advanceTime($rubyDung.$timer);
                                var$5 = 0;
                                while (true) {
                                    var$3 = $rubyDung.$timer;
                                    if (var$5 >= var$3.$ticks)
                                        break;
                                    cmr_RubyDung_tick($rubyDung);
                                    var$5 = var$5 + 1 | 0;
                                }
                                var$6 = var$3.$partialTicks;
                                $ptr = 2;
                                continue main;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_Exception) {
                                    var$3 = $$je;
                                } else{
                                    var$3 = $$je;
                                    break c;
                                }
                            }
                        }
                        try {
                            jl_Throwable_printStackTrace(var$3);
                            break b;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$3 = $$je;

                        }
                    }
                    cmr_RubyDung_destroy($rubyDung);
                    $rt_throw(var$3);
                }
                cmr_RubyDung_destroy($rubyDung);
            }
            return;
        case 1:
            a: {
                try {
                    cmr_RubyDung_init($rubyDung);
                    if ($rt_suspending()) {
                        break main;
                    }
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                    } else {
                        throw $$e;
                    }
                }
            }
            var$4 = jl_System_currentTimeMillis();
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                try {
                                    if (!oli_Keyboard_isKeyDown(1) && !olo_Display_isCloseRequested())
                                        break g;
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Exception) {
                                        var$3 = $$je;
                                        break f;
                                    } else{
                                        var$3 = $$je;
                                        break e;
                                    }
                                }
                                cmr_RubyDung_destroy($rubyDung);
                                break c;
                            }
                            try {
                                cmr_Timer_advanceTime($rubyDung.$timer);
                                var$5 = 0;
                                while (true) {
                                    var$3 = $rubyDung.$timer;
                                    if (var$5 >= var$3.$ticks)
                                        break;
                                    cmr_RubyDung_tick($rubyDung);
                                    var$5 = var$5 + 1 | 0;
                                }
                                var$6 = var$3.$partialTicks;
                                $ptr = 2;
                                continue main;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_Exception) {
                                    var$3 = $$je;
                                } else{
                                    var$3 = $$je;
                                    break e;
                                }
                            }
                        }
                        try {
                            jl_Throwable_printStackTrace(var$3);
                            break d;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$3 = $$je;

                        }
                    }
                    cmr_RubyDung_destroy($rubyDung);
                    $rt_throw(var$3);
                }
                cmr_RubyDung_destroy($rubyDung);
            }
            return;
        case 2:
            a: {
                b: {
                    c: {
                        d: {
                            try {
                                cmr_RubyDung_render($rubyDung, var$6);
                                if ($rt_suspending()) {
                                    break main;
                                }
                                while (true) {
                                    var$7 = jl_System_currentTimeMillis();
                                    var$8 = Long_add(var$4, Long_fromInt(1000));
                                    if (Long_lt(var$7, var$8))
                                        break;
                                    cmrl_Chunk_$callClinit();
                                    cmrl_Chunk_updates = 0;
                                    var$4 = var$8;
                                }
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_Exception) {
                                    var$3 = $$je;
                                    break d;
                                } else{
                                    var$3 = $$je;
                                    break c;
                                }
                            }
                            f: {
                                try {
                                    if (!oli_Keyboard_isKeyDown(1) && !olo_Display_isCloseRequested())
                                        break f;
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof jl_Exception) {
                                        var$3 = $$je;
                                        break d;
                                    } else{
                                        var$3 = $$je;
                                        break c;
                                    }
                                }
                                cmr_RubyDung_destroy($rubyDung);
                                break a;
                            }
                            try {
                                cmr_Timer_advanceTime($rubyDung.$timer);
                                var$5 = 0;
                                while (true) {
                                    var$3 = $rubyDung.$timer;
                                    if (var$5 >= var$3.$ticks)
                                        break;
                                    cmr_RubyDung_tick($rubyDung);
                                    var$5 = var$5 + 1 | 0;
                                }
                                var$6 = var$3.$partialTicks;
                                continue main;
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof jl_Exception) {
                                    var$3 = $$je;
                                } else{
                                    var$3 = $$je;
                                    break c;
                                }
                            }
                        }
                        try {
                            jl_Throwable_printStackTrace(var$3);
                            break b;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            var$3 = $$je;

                        }
                    }
                    cmr_RubyDung_destroy($rubyDung);
                    $rt_throw(var$3);
                }
                cmr_RubyDung_destroy($rubyDung);
            }
            return;
        default: $rt_invalidPointer();
        }}
        $rt_nativeThread().push($args, $rubyDung, var$3, var$4, var$5, var$6, var$7, var$8, $ptr);
    }
    var jlr_AnnotatedElement = $rt_classWithoutFields(0);
    var jlr_Type = $rt_classWithoutFields(0);
    function jl_Class() {
        var a = this; jl_Object.call(a);
        a.$name = null;
        a.$platformClass = null;
    }
    function jl_Class_getClass($cls) {
        var $result, var$3;
        if ($cls === null)
            return null;
        $result = $cls.classObject;
        if ($result === null) {
            $result = new jl_Class;
            $result.$platformClass = $cls;
            var$3 = $result;
            $cls.classObject = var$3;
        }
        return $result;
    }
    function jl_Class_getName($this) {
        if ($this.$name === null)
            $this.$name = $rt_str($this.$platformClass.$meta.name);
        return $this.$name;
    }
    function jl_Class_isPrimitive($this) {
        return $this.$platformClass.$meta.primitive ? 1 : 0;
    }
    function jl_Class_getComponentType($this) {
        return jl_Class_getClass(otp_Platform_getArrayItem($this.$platformClass));
    }
    function jl_Class_getClassLoader($this) {
        jl_ClassLoader_$callClinit();
        return jl_ClassLoader_systemClassLoader;
    }
    function jl_Class_getResourceAsStream($this, $name) {
        var $cls, $index, var$4, var$5, var$6, var$7;
        if (jl_String_startsWith($name, $rt_s(2)))
            return jl_ClassLoader_getResourceAsStream(jl_Class_getClassLoader($this), jl_String_substring($name, 1));
        $cls = $this;
        while (otp_Platform_getArrayItem($cls.$platformClass) === null ? 0 : 1) {
            $cls = jl_Class_getComponentType($cls);
        }
        $cls = jl_Class_getName($cls);
        $index = jl_String_lastIndexOf($cls, 46);
        if ($index >= 0) {
            $cls = jl_String_substring0($cls, 0, $index + 1 | 0);
            var$4 = $rt_createCharArray(jl_String_length($cls));
            var$5 = var$4.data;
            var$6 = 0;
            while (var$6 < jl_String_length($cls)) {
                var$5[var$6] = jl_String_charAt($cls, var$6) != 46 ? jl_String_charAt($cls, var$6) : 47;
                var$6 = var$6 + 1 | 0;
            }
            $cls = jl_String__init_0();
            $cls.$characters = var$4;
            var$7 = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(var$7, $cls), $name);
            $name = jl_StringBuilder_toString(var$7);
        }
        return jl_ClassLoader_getResourceAsStream(jl_Class_getClassLoader($this), $name);
    }
    var otji_JS = $rt_classWithoutFields();
    function otji_JS_function(var$1, var$2) {
        var name = 'jso$functor$' + var$2;
        if (!var$1[name]) {
            var fn = function() {
                return var$1[var$2].apply(var$1, arguments);
            };
            var$1[name] = function() {
                return fn;
            };
        }
        return var$1[name]();
    }
    var otp_Platform = $rt_classWithoutFields();
    function otp_Platform_clone(var$1) {
        var copy = new var$1.constructor();
        for (var field in var$1) {
            if (!var$1.hasOwnProperty(field)) {
                continue;
            }
            copy[field] = var$1[field];
        }
        return copy;
    }
    function otp_Platform_isAssignable($from, $to) {
        var $supertypes, $i;
        if ($from === $to)
            return 1;
        $supertypes = $from.$meta.supertypes;
        $i = 0;
        while ($i < $supertypes.length) {
            if (otp_Platform_isAssignable($supertypes[$i], $to))
                return 1;
            $i = $i + 1 | 0;
        }
        return 0;
    }
    function otp_Platform_launchThread($runnable) {
        $runnable.$run();
    }
    function otp_Platform_schedule(var$1, var$2) {
        return setTimeout(function() {
            otp_Platform_launchThread(var$1);
        }, var$2);
    }
    function otp_Platform_getArrayItem($cls) {
        return $cls.$meta.item;
    }
    function otp_Platform_createQueueJs$js_body$_30() {
        return [];
    }
    function jl_Throwable() {
        var a = this; jl_Object.call(a);
        a.$message = null;
        a.$cause = null;
        a.$suppressionEnabled = 0;
        a.$writableStackTrace = 0;
        a.$suppressed = null;
        a.$stackTrace = null;
    }
    function jl_Throwable__init_0(var_0) {
        var var_1 = new jl_Throwable();
        jl_Throwable__init_(var_1, var_0);
        return var_1;
    }
    function jl_Throwable__init_1(var_0) {
        var var_1 = new jl_Throwable();
        jl_Throwable__init_2(var_1, var_0);
        return var_1;
    }
    function jl_Throwable__init_($this, $message) {
        $this.$suppressionEnabled = 1;
        $this.$writableStackTrace = 1;
        $this.$message = $message;
    }
    function jl_Throwable__init_2($this, $cause) {
        $this.$suppressionEnabled = 1;
        $this.$writableStackTrace = 1;
        $this.$cause = $cause;
    }
    function jl_Throwable_fillInStackTrace($this) {
        return $this;
    }
    function jl_Throwable_getMessage($this) {
        return $this.$message;
    }
    function jl_Throwable_getLocalizedMessage($this) {
        return $this.$message;
    }
    function jl_Throwable_getCause($this) {
        var var$1;
        var$1 = $this.$cause;
        if (var$1 === $this)
            var$1 = null;
        return var$1;
    }
    function jl_Throwable_printStackTrace($this) {
        jl_Throwable_printStackTrace0($this, jl_System_err());
    }
    function jl_Throwable_printStackTrace0($this, $stream) {
        var var$2, var$3, var$4, var$5, var$6, $element;
        ji_PrintStream_print($stream, jl_Class_getName(jl_Object_getClass($this)));
        var$2 = $this.$message;
        if (var$2 !== null) {
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(3)), var$2);
            ji_PrintStream_print($stream, jl_StringBuilder_toString(var$3));
        }
        a: {
            var$4 = $stream.$buffer;
            var$4.data[0] = 10;
            ji_PrintStream_print0($stream, var$4, 0, 1);
            var$4 = $this.$stackTrace;
            if (var$4 !== null) {
                var$4 = var$4.data;
                var$5 = var$4.length;
                var$6 = 0;
                while (true) {
                    if (var$6 >= var$5)
                        break a;
                    $element = var$4[var$6];
                    ji_PrintStream_print($stream, $rt_s(4));
                    jl_StringBuilder_append0(jl_StringBuilder_append($stream.$sb, $element), 10);
                    ji_PrintStream_printSB($stream);
                    var$6 = var$6 + 1 | 0;
                }
            }
        }
        var$3 = $this.$cause;
        if (var$3 !== null && var$3 !== $this) {
            ji_PrintStream_print($stream, $rt_s(5));
            jl_Throwable_printStackTrace0($this.$cause, $stream);
        }
    }
    function jl_Throwable_addSuppressed($this, $exception) {
        var var$2, var$3;
        if (!$this.$suppressionEnabled)
            return;
        var$2 = $this.$suppressed;
        var$2 = ju_Arrays_copyOf(var$2, var$2.data.length + 1 | 0);
        var$3 = var$2.data;
        $this.$suppressed = var$2;
        var$3[var$3.length - 1 | 0] = $exception;
    }
    var jl_Exception = $rt_classWithoutFields(jl_Throwable);
    function jl_Exception__init_0() {
        var var_0 = new jl_Exception();
        jl_Exception__init_(var_0);
        return var_0;
    }
    function jl_Exception__init_($this) {
        $this.$suppressionEnabled = 1;
        $this.$writableStackTrace = 1;
    }
    var jl_RuntimeException = $rt_classWithoutFields(jl_Exception);
    function jl_RuntimeException__init_(var_0) {
        var var_1 = new jl_RuntimeException();
        jl_RuntimeException__init_0(var_1, var_0);
        return var_1;
    }
    function jl_RuntimeException__init_0($this, $message) {
        jl_Throwable__init_($this, $message);
    }
    var jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException);
    var ji_Serializable = $rt_classWithoutFields(0);
    var jl_Comparable = $rt_classWithoutFields(0);
    var jl_CharSequence = $rt_classWithoutFields(0);
    function jl_String() {
        var a = this; jl_Object.call(a);
        a.$characters = null;
        a.$hashCode = 0;
    }
    var jl_String_EMPTY_CHARS = null;
    var jl_String_EMPTY = null;
    var jl_String_CASE_INSENSITIVE_ORDER = null;
    function jl_String_$callClinit() {
        jl_String_$callClinit = $rt_eraseClinit(jl_String);
        jl_String__clinit_();
    }
    function jl_String__init_0() {
        var var_0 = new jl_String();
        jl_String__init_1(var_0);
        return var_0;
    }
    function jl_String__init_2(var_0) {
        var var_1 = new jl_String();
        jl_String__init_3(var_1, var_0);
        return var_1;
    }
    function jl_String__init_(var_0) {
        var var_1 = new jl_String();
        jl_String__init_4(var_1, var_0);
        return var_1;
    }
    function jl_String__init_5(var_0, var_1, var_2) {
        var var_3 = new jl_String();
        jl_String__init_6(var_3, var_0, var_1, var_2);
        return var_3;
    }
    function jl_String__init_1($this) {
        jl_String_$callClinit();
        $this.$characters = jl_String_EMPTY_CHARS;
    }
    function jl_String__init_3($this, $other) {
        jl_String_$callClinit();
        $this.$characters = $other.$characters;
    }
    function jl_String__init_4($this, $characters) {
        jl_String_$callClinit();
        jl_String__init_6($this, $characters, 0, $characters.data.length);
    }
    function jl_String__init_6($this, $value, $offset, $count) {
        var var$4;
        jl_String_$callClinit();
        var$4 = $rt_createCharArray($count);
        $this.$characters = var$4;
        jl_System_fastArraycopy($value, $offset, var$4, 0, $count);
    }
    function jl_String_charAt($this, $index) {
        var var$2, var$3;
        if ($index >= 0) {
            var$2 = $this.$characters.data;
            if ($index < var$2.length)
                return var$2[$index];
        }
        var$3 = new jl_StringIndexOutOfBoundsException;
        jl_Exception__init_(var$3);
        $rt_throw(var$3);
    }
    function jl_String_length($this) {
        return $this.$characters.data.length;
    }
    function jl_String_isEmpty($this) {
        return $this.$characters.data.length ? 0 : 1;
    }
    function jl_String_startsWith($this, $prefix) {
        var var$2, var$3, var$4, var$5;
        if ($this === $prefix)
            return 1;
        a: {
            var$2 = 0;
            if ((var$2 + jl_String_length($prefix) | 0) > jl_String_length($this))
                var$2 = 0;
            else {
                var$3 = 0;
                while (var$3 < jl_String_length($prefix)) {
                    var$4 = jl_String_charAt($prefix, var$3);
                    var$5 = var$2 + 1 | 0;
                    if (var$4 != jl_String_charAt($this, var$2)) {
                        var$2 = 0;
                        break a;
                    }
                    var$3 = var$3 + 1 | 0;
                    var$2 = var$5;
                }
                var$2 = 1;
            }
        }
        return var$2;
    }
    function jl_String_indexOf($this, $ch, $fromIndex) {
        var $i, $bmpChar, var$5, $hi, $lo;
        $i = jl_Math_max(0, $fromIndex);
        if ($ch < 65536) {
            $bmpChar = $ch & 65535;
            while (true) {
                var$5 = $this.$characters.data;
                if ($i >= var$5.length)
                    return (-1);
                if (var$5[$i] == $bmpChar)
                    break;
                $i = $i + 1 | 0;
            }
            return $i;
        }
        $hi = jl_Character_highSurrogate($ch);
        $lo = jl_Character_lowSurrogate($ch);
        while (true) {
            var$5 = $this.$characters.data;
            if ($i >= (var$5.length - 1 | 0))
                return (-1);
            if (var$5[$i] == $hi && var$5[$i + 1 | 0] == $lo)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    function jl_String_lastIndexOf($this, $ch) {
        var var$2, var$3, var$4, var$5;
        a: {
            var$2 = jl_Math_min(jl_String_length($this) - 1 | 0, jl_String_length($this) - 1 | 0);
            if ($ch < 65536) {
                $ch = $ch & 65535;
                while (true) {
                    if (var$2 < 0) {
                        var$2 = (-1);
                        break a;
                    }
                    if ($this.$characters.data[var$2] == $ch)
                        break;
                    var$2 = var$2 + (-1) | 0;
                }
            } else {
                var$3 = jl_Character_highSurrogate($ch);
                var$4 = jl_Character_lowSurrogate($ch);
                while (var$2 >= 1) {
                    var$5 = $this.$characters.data;
                    if (var$5[var$2] == var$4) {
                        $ch = var$2 - 1 | 0;
                        if (var$5[$ch] == var$3) {
                            var$2 = $ch;
                            break a;
                        }
                    }
                    var$2 = var$2 + (-1) | 0;
                }
                var$2 = (-1);
            }
        }
        return var$2;
    }
    function jl_String_substring0($this, $beginIndex, $endIndex) {
        var var$3, var$4;
        var$3 = $rt_compare($beginIndex, $endIndex);
        if (var$3 > 0) {
            var$4 = new jl_IndexOutOfBoundsException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if (!var$3) {
            jl_String_$callClinit();
            return jl_String_EMPTY;
        }
        if (!$beginIndex && $endIndex == jl_String_length($this))
            return $this;
        return jl_String__init_5($this.$characters, $beginIndex, $endIndex - $beginIndex | 0);
    }
    function jl_String_substring($this, $beginIndex) {
        return jl_String_substring0($this, $beginIndex, jl_String_length($this));
    }
    function jl_String_replace($this, $target, $replacement) {
        var $sb, $sz, $i, $j;
        $sb = jl_StringBuilder__init_();
        $sz = jl_String_length($this) - jl_String_length($target) | 0;
        $i = 0;
        while ($i <= $sz) {
            $j = 0;
            a: {
                while (true) {
                    if ($j >= jl_String_length($target)) {
                        jl_StringBuilder_append($sb, $replacement);
                        $i = $i + (jl_String_length($target) - 1 | 0) | 0;
                        break a;
                    }
                    if (jl_String_charAt($this, $i + $j | 0) != jl_String_charAt($target, $j))
                        break;
                    $j = $j + 1 | 0;
                }
                jl_StringBuilder_append0($sb, jl_String_charAt($this, $i));
            }
            $i = $i + 1 | 0;
        }
        jl_StringBuilder_append($sb, jl_String_substring($this, $i));
        return jl_StringBuilder_toString($sb);
    }
    function jl_String_valueOf($c) {
        var var$2, var$3;
        jl_String_$callClinit();
        var$2 = new jl_String;
        var$3 = $rt_createCharArray(1);
        var$3.data[0] = $c;
        jl_String__init_4(var$2, var$3);
        return var$2;
    }
    function jl_String_equals($this, $other) {
        var $str, $i;
        if ($this === $other)
            return 1;
        if (!($other instanceof jl_String))
            return 0;
        $str = $other;
        if (jl_String_length($str) != jl_String_length($this))
            return 0;
        $i = 0;
        while ($i < jl_String_length($str)) {
            if (jl_String_charAt($this, $i) != jl_String_charAt($str, $i))
                return 0;
            $i = $i + 1 | 0;
        }
        return 1;
    }
    function jl_String_hashCode($this) {
        var var$1, var$2, var$3, $c;
        a: {
            if (!$this.$hashCode) {
                var$1 = $this.$characters.data;
                var$2 = var$1.length;
                var$3 = 0;
                while (true) {
                    if (var$3 >= var$2)
                        break a;
                    $c = var$1[var$3];
                    $this.$hashCode = (31 * $this.$hashCode | 0) + $c | 0;
                    var$3 = var$3 + 1 | 0;
                }
            }
        }
        return $this.$hashCode;
    }
    function jl_String__clinit_() {
        jl_String_EMPTY_CHARS = $rt_createCharArray(0);
        jl_String_EMPTY = jl_String__init_0();
        jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_93_0;
    }
    var jl_Error = $rt_classWithoutFields(jl_Throwable);
    var jl_LinkageError = $rt_classWithoutFields(jl_Error);
    var jl_NoClassDefFoundError = $rt_classWithoutFields(jl_LinkageError);
    var jl_Number = $rt_classWithoutFields();
    function jl_Integer() {
        jl_Number.call(this);
        this.$value = 0;
    }
    var jl_Integer_TYPE = null;
    var jl_Integer_integerCache = null;
    function jl_Integer__init_(var_0) {
        var var_1 = new jl_Integer();
        jl_Integer__init_0(var_1, var_0);
        return var_1;
    }
    function jl_Integer__init_0($this, $value) {
        $this.$value = $value;
    }
    function jl_Integer_valueOf($i) {
        var var$2, var$3;
        if ($i >= (-128) && $i <= 127) {
            a: {
                if (jl_Integer_integerCache === null) {
                    jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
                    var$2 = 0;
                    while (true) {
                        var$3 = jl_Integer_integerCache.data;
                        if (var$2 >= var$3.length)
                            break a;
                        var$3[var$2] = jl_Integer__init_(var$2 - 128 | 0);
                        var$2 = var$2 + 1 | 0;
                    }
                }
            }
            return jl_Integer_integerCache.data[$i + 128 | 0];
        }
        return jl_Integer__init_($i);
    }
    function jl_Integer_intValue($this) {
        return $this.$value;
    }
    function jl_Integer_hashCode($this) {
        return $this.$value;
    }
    function jl_Integer_equals($this, $other) {
        if ($this === $other)
            return 1;
        return $other instanceof jl_Integer && $other.$value == $this.$value ? 1 : 0;
    }
    function jl_Integer__clinit_() {
        jl_Integer_TYPE = $rt_cls($rt_intcls());
    }
    function jl_AbstractStringBuilder() {
        var a = this; jl_Object.call(a);
        a.$buffer0 = null;
        a.$length0 = 0;
    }
    function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
        var var$3, $sz, $i, var$6;
        var$3 = $this.$length0;
        $sz = var$3 - $start | 0;
        jl_StringBuilder_ensureCapacity($this, (var$3 + $end | 0) - $start | 0);
        $i = $sz - 1 | 0;
        while ($i >= 0) {
            var$6 = $this.$buffer0.data;
            var$6[$end + $i | 0] = var$6[$start + $i | 0];
            $i = $i + (-1) | 0;
        }
        $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
    }
    var jl_Appendable = $rt_classWithoutFields(0);
    var jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder);
    function jl_StringBuilder__init_() {
        var var_0 = new jl_StringBuilder();
        jl_StringBuilder__init_0(var_0);
        return var_0;
    }
    function jl_StringBuilder__init_0($this) {
        $this.$buffer0 = $rt_createCharArray(16);
    }
    function jl_StringBuilder_append($this, $obj) {
        var var$2;
        var$2 = $this.$length0;
        if ($obj === null)
            $obj = $rt_s(6);
        jl_StringBuilder_insert($this, var$2, $obj);
        return $this;
    }
    function jl_StringBuilder_append1($this, $string) {
        jl_StringBuilder_insert($this, $this.$length0, $string);
        return $this;
    }
    function jl_StringBuilder_append2($this, $value) {
        var var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
        var$2 = $this.$length0;
        var$3 = 1;
        if ($value < 0) {
            var$3 = 0;
            $value =  -$value | 0;
        }
        a: {
            if ($rt_ucmp($value, 10) < 0) {
                if (var$3)
                    jl_AbstractStringBuilder_insertSpace($this, var$2, var$2 + 1 | 0);
                else {
                    jl_AbstractStringBuilder_insertSpace($this, var$2, var$2 + 2 | 0);
                    var$4 = $this.$buffer0.data;
                    var$5 = var$2 + 1 | 0;
                    var$4[var$2] = 45;
                    var$2 = var$5;
                }
                $this.$buffer0.data[var$2] = jl_Character_forDigit($value, 10);
            } else {
                var$6 = 1;
                var$7 = 1;
                var$5 = $rt_udiv((-1), 10);
                b: {
                    while (true) {
                        var$8 = var$6 * 10 | 0;
                        if ($rt_ucmp(var$8, $value) > 0) {
                            var$8 = var$6;
                            break b;
                        }
                        var$7 = var$7 + 1 | 0;
                        if ($rt_ucmp(var$8, var$5) > 0)
                            break;
                        var$6 = var$8;
                    }
                }
                if (!var$3)
                    var$7 = var$7 + 1 | 0;
                jl_AbstractStringBuilder_insertSpace($this, var$2, var$2 + var$7 | 0);
                if (var$3)
                    var$5 = var$2;
                else {
                    var$4 = $this.$buffer0.data;
                    var$5 = var$2 + 1 | 0;
                    var$4[var$2] = 45;
                }
                while (true) {
                    if (!var$8)
                        break a;
                    var$4 = $this.$buffer0.data;
                    var$9 = var$5 + 1 | 0;
                    var$4[var$5] = jl_Character_forDigit($rt_udiv($value, var$8), 10);
                    $value = $rt_umod($value, var$8);
                    var$8 = $rt_udiv(var$8, 10);
                    var$5 = var$9;
                }
            }
        }
        return $this;
    }
    function jl_StringBuilder_append0($this, $c) {
        var var$2;
        var$2 = $this.$length0;
        jl_AbstractStringBuilder_insertSpace($this, var$2, var$2 + 1 | 0);
        $this.$buffer0.data[var$2] = $c;
        return $this;
    }
    function jl_StringBuilder_toString($this) {
        return jl_String__init_5($this.$buffer0, 0, $this.$length0);
    }
    function jl_StringBuilder_ensureCapacity($this, var$1) {
        var var$2, var$3, var$4, var$5;
        var$2 = $this.$buffer0.data.length;
        if (var$2 < var$1) {
            var$1 = var$2 >= 1073741823 ? 2147483647 : jl_Math_max(var$1, jl_Math_max(var$2 * 2 | 0, 5));
            var$3 = $this.$buffer0.data;
            var$4 = $rt_createCharArray(var$1);
            var$5 = var$4.data;
            var$1 = jl_Math_min(var$1, var$3.length);
            var$2 = 0;
            while (var$2 < var$1) {
                var$5[var$2] = var$3[var$2];
                var$2 = var$2 + 1 | 0;
            }
            $this.$buffer0 = var$4;
        }
    }
    function jl_StringBuilder_insert($this, var$1, var$2) {
        var var$3, var$4, var$5;
        if (var$1 >= 0 && var$1 <= $this.$length0) {
            a: {
                if (var$2 === null)
                    var$2 = $rt_s(6);
                else if (jl_String_isEmpty(var$2))
                    break a;
                jl_StringBuilder_ensureCapacity($this, $this.$length0 + jl_String_length(var$2) | 0);
                var$3 = $this.$length0 - 1 | 0;
                while (var$3 >= var$1) {
                    $this.$buffer0.data[var$3 + jl_String_length(var$2) | 0] = $this.$buffer0.data[var$3];
                    var$3 = var$3 + (-1) | 0;
                }
                $this.$length0 = $this.$length0 + jl_String_length(var$2) | 0;
                var$3 = 0;
                while (var$3 < jl_String_length(var$2)) {
                    var$4 = $this.$buffer0.data;
                    var$5 = var$1 + 1 | 0;
                    var$4[var$1] = jl_String_charAt(var$2, var$3);
                    var$3 = var$3 + 1 | 0;
                    var$1 = var$5;
                }
            }
            return $this;
        }
        var$2 = new jl_StringIndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    var jl_IncompatibleClassChangeError = $rt_classWithoutFields(jl_LinkageError);
    var jl_NoSuchFieldError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
    function jl_NoSuchFieldError__init_(var_0) {
        var var_1 = new jl_NoSuchFieldError();
        jl_NoSuchFieldError__init_0(var_1, var_0);
        return var_1;
    }
    function jl_NoSuchFieldError__init_0($this, $message) {
        jl_Throwable__init_($this, $message);
    }
    var jl_NoSuchMethodError = $rt_classWithoutFields(jl_IncompatibleClassChangeError);
    function jl_NoSuchMethodError__init_(var_0) {
        var var_1 = new jl_NoSuchMethodError();
        jl_NoSuchMethodError__init_0(var_1, var_0);
        return var_1;
    }
    function jl_NoSuchMethodError__init_0($this, $message) {
        jl_Throwable__init_($this, $message);
    }
    var jl_Runnable = $rt_classWithoutFields(0);
    function cmr_RubyDung() {
        var a = this; jl_Object.call(a);
        a.$timer = null;
        a.$level = null;
        a.$levelRenderer = null;
        a.$player = null;
        a.$fogColor = null;
        a.$width = 1024;
        a.$height = 768;
        a.$viewportBuffer = null;
        a.$selectBuffer = null;
        a.$hitResult = null;
    }
    function cmr_RubyDung_init($this) {
        var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, $$je, $ptr, $tmp;
        $ptr = 0;
        if ($rt_resuming()) {
            var $thread = $rt_nativeThread();
            $ptr = $thread.pop();var$10 = $thread.pop();var$9 = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();var$4 = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();var$1 = $thread.pop();$this = $thread.pop();
        }
        main: while (true) { switch ($ptr) {
        case 0:
            jn_Buffer_flip(jn_FloatBuffer_put($this.$fogColor, $rt_createFloatArrayFromData([0.054901961237192154, 0.04313725605607033, 0.03921568766236305, 1.0])));
            ju_Objects_requireNonNull($this);
            ju_Objects_requireNonNull($this);
            olo_Display_$callClinit();
            var$1 = m_WebGL_window.devicePixelRatio;
            olo_Display_width = m_WebGL_canvas.clientWidth * var$1 | 0;
            olo_Display_height = m_WebGL_canvas.clientHeight * var$1 | 0;
            var$2 = olo_Display_title;
            if (var$2 === null) {
                var$3 = new jl_IllegalArgumentException;
                jl_Throwable__init_(var$3, $rt_s(7));
                $rt_throw(var$3);
            }
            olo_Display_title = var$2;
            $ptr = 1;
        case 1:
            olo_Display_update();
            if ($rt_suspending()) {
                break main;
            }
            oli_Keyboard_$callClinit();
            a: {
                b: {
                    try {
                        if (oli_Keyboard_created)
                            break a;
                        if (!oli_Keyboard_initialized)
                            oli_Keyboard_initialize();
                        var$4 = m_WebGL_window;
                        var$3 = oli_Keyboard$1__init_();
                        oli_Keyboard_keydown = var$3;
                        var$4.addEventListener("keydown", otji_JS_function(var$3, "handleEvent"));
                        var$2 = m_WebGL_window;
                        var$4 = oli_Keyboard$2__init_();
                        oli_Keyboard_keyup = var$4;
                        var$2.addEventListener("keyup", otji_JS_function(var$4, "handleEvent"));
                        var$2 = m_WebGL_window;
                        var$4 = oli_Keyboard$3__init_();
                        oli_Keyboard_keypress = var$4;
                        var$2.addEventListener("keypress", otji_JS_function(var$4, "handleEvent"));
                        oli_Keyboard_created = 1;
                        var$2 = oli_Keyboard_keyEvents;
                        if (var$2 === null)
                            break b;
                        ju_LinkedList_clear(var$2);
                        break b;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Throwable) {
                            var$2 = $$je;
                        } else {
                            throw $$e;
                        }
                    }
                    var$3 = new ol_LWJGLException;
                    jl_Throwable__init_2(var$3, var$2);
                    $rt_throw(var$3);
                }
            }
            c: {
                oli_Mouse_create();
                olo_GL11_glEnable(3553);
                olo_GL11_webgl.clearColor(0.5, 0.800000011920929, 1.0, 0.0);
                olo_GL11_webgl.clearDepth(0.0);
                olo_GL11_glEnable(2929);
                olo_GL11_glEnable(2884);
                var$5 = 518;
                switch (515) {
                    case 513:
                        var$5 = 516;
                        break c;
                    case 514:
                        var$5 = 514;
                        break c;
                    case 515:
                        var$5 = 518;
                        break c;
                    case 516:
                        var$5 = 513;
                        break c;
                    case 518:
                        var$5 = 515;
                        break c;
                    case 517:
                        break;
                    default:
                }
            }
            olo_GL11_webgl.depthFunc(var$5);
            var$2 = new cmrl_Level;
            var$2.$levelListeners = ju_ArrayList__init_();
            var$2.$width0 = 256;
            var$2.$height0 = 256;
            var$2.$depth = 64;
            var$6 = $rt_createByteArray(4194304);
            var$7 = var$6.data;
            var$2.$blocks = var$6;
            var$2.$lightDepths = $rt_createIntArray(65536);
            var$8 = 0;
            while (var$8 < 256) {
                var$9 = 0;
                while (var$9 < 64) {
                    var$10 = 0;
                    while (var$10 < 256) {
                        var$7[(((var$9 * 256 | 0) + var$10 | 0) * 256 | 0) + var$8 | 0] = (var$9 > 42 ? 0 : 1) << 24 >> 24;
                        var$10 = var$10 + 1 | 0;
                    }
                    var$9 = var$9 + 1 | 0;
                }
                var$8 = var$8 + 1 | 0;
            }
            cmrl_Level_calcLightDepths(var$2, 0, 0, 256, 256);
            d: {
                try {
                    var$3 = ji_DataInputStream__init_(juz_GZIPInputStream__init_(ji_FileInputStream__init_($rt_s(8))));
                    ji_DataInputStream_readFully(var$3, var$2.$blocks);
                    cmrl_Level_calcLightDepths(var$2, 0, 0, var$2.$width0, var$2.$height0);
                    ji_FilterInputStream_close(var$3);
                    var$3 = ju_AbstractList_iterator(var$2.$levelListeners);
                    while (ju_AbstractList$1_hasNext(var$3)) {
                        cmrl_LevelRenderer_allChanged(ju_AbstractList$1_next(var$3));
                    }
                    break d;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Exception) {
                        var$3 = $$je;
                    } else {
                        throw $$e;
                    }
                }
                jl_Throwable_printStackTrace(var$3);
            }
            $this.$level = var$2;
            $this.$levelRenderer = cmrl_LevelRenderer__init_(var$2);
            var$2 = new cmr_Player;
            var$2.$level0 = $this.$level;
            cmr_Player_resetPosition(var$2);
            $this.$player = var$2;
            oli_Mouse_setGrabbed(1);
            return;
        default: $rt_invalidPointer();
        }}
        $rt_nativeThread().push($this, var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, $ptr);
    }
    function cmr_RubyDung_destroy($this) {
        var var$1, var$2, var$3;
        cmrl_Level_save($this.$level);
        if (oli_Mouse_created) {
            oli_Mouse_isGrabbed = 0;
            oli_Mouse_setGrabbed(0);
            oli_Mouse_created = 0;
            oli_Mouse_resetMouse();
            var$1 = m_WebGL_window;
            var$2 = oli_Mouse_contextmenu;
            var$1.removeEventListener("contextmenu", otji_JS_function(var$2, "handleEvent"));
            var$3 = m_WebGL_window;
            var$1 = oli_Mouse_mousedown;
            var$3.removeEventListener("mousedown", otji_JS_function(var$1, "handleEvent"));
            var$3 = m_WebGL_window;
            var$1 = oli_Mouse_mouseup;
            var$3.removeEventListener("mouseup", otji_JS_function(var$1, "handleEvent"));
            var$3 = m_WebGL_window;
            var$1 = oli_Mouse_mousemove;
            var$3.removeEventListener("mousemove", otji_JS_function(var$1, "handleEvent"));
            var$3 = m_WebGL_window;
            var$1 = oli_Mouse_wheel;
            var$3.removeEventListener("wheel", otji_JS_function(var$1, "handleEvent"));
            var$3 = m_WebGL_window;
            var$1 = oli_Mouse_pointerLockChange;
            var$3.removeEventListener("pointerlockchange", otji_JS_function(var$1, "handleEvent"));
            ju_LinkedList_clear(oli_Mouse_mouseEvents);
        }
        oli_Keyboard_$callClinit();
        if (oli_Keyboard_created) {
            oli_Keyboard_created = 0;
            var$1 = m_WebGL_window;
            var$2 = oli_Keyboard_keydown;
            var$1.removeEventListener("keydown", otji_JS_function(var$2, "handleEvent"));
            var$3 = m_WebGL_window;
            var$1 = oli_Keyboard_keyup;
            var$3.removeEventListener("keyup", otji_JS_function(var$1, "handleEvent"));
            var$3 = m_WebGL_window;
            var$1 = oli_Keyboard_keypress;
            var$3.removeEventListener("keypress", otji_JS_function(var$1, "handleEvent"));
            ju_LinkedList_clear(oli_Keyboard_keyEvents);
        }
        olo_Display_$callClinit();
    }
    function cmr_RubyDung_tick($this) {
        cmr_Player_tick($this.$player);
    }
    function cmr_RubyDung_moveCameraToPlayer($this, $partialTicks) {
        var $player, $x, $y, $z, var$6, var$7, var$8;
        $player = $this.$player;
        olo_GL11_glTranslatef(0.0, 0.0, (-0.30000001192092896));
        olo_GL11_glRotatef($player.$xRotation, 1.0, 0.0, 0.0);
        olo_GL11_glRotatef($player.$yRotation, 0.0, 1.0, 0.0);
        $player = $this.$player;
        $x = $player.$prevX;
        $y = $player.$x - $x;
        $z = $partialTicks;
        $x = $x + $y * $z;
        $y = $player.$prevY;
        $y = $y + ($player.$y - $y) * $z;
        var$6 = $player.$prevZ;
        $z = var$6 + ($player.$z - var$6) * $z;
        $x =  -$x;
        $y =  -$y;
        $z =  -$z;
        $player = olo_GL11_matrixVector;
        $partialTicks = $x;
        var$7 = $y;
        var$8 = $z;
        oluv_Vector3f_set($player, $partialTicks, var$7, var$8);
        oluv_Matrix4f_translate(olo_GL11_getMatrix(), olo_GL11_matrixVector);
        if (olo_GL11_compilingDisplayList)
            ju_ArrayList_add(olo_GL11_currentList.$matrixMode, olo_GL11$MatrixMode__init_(1, $partialTicks, var$7, var$8));
    }
    function cmr_RubyDung_setupCamera($this, $partialTicks) {
        olo_GL11_glMatrixMode(5889);
        olo_GL11_glLoadIdentity();
        olug_GLU_gluPerspective(70.0, 1.3333333730697632, 0.05000000074505806, 1000.0);
        olo_GL11_glMatrixMode(5888);
        olo_GL11_glLoadIdentity();
        cmr_RubyDung_moveCameraToPlayer($this, $partialTicks);
    }
    function cmr_RubyDung_render($this, $partialTicks) {
        var var$2, $motionX, $motionY, var$5, var$6, var$7, $y, $z, var$10, var$11, $x, $ptr, $tmp;
        $ptr = 0;
        if ($rt_resuming()) {
            var $thread = $rt_nativeThread();
            $ptr = $thread.pop();$x = $thread.pop();var$11 = $thread.pop();var$10 = $thread.pop();$z = $thread.pop();$y = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();$motionY = $thread.pop();$motionX = $thread.pop();var$2 = $thread.pop();$partialTicks = $thread.pop();$this = $thread.pop();
        }
        main: while (true) { switch ($ptr) {
        case 0:
            var$2 = oli_Mouse_dx | 0;
            oli_Mouse_dx = 0.0;
            $motionX = var$2;
            var$2 = oli_Mouse_dy | 0;
            oli_Mouse_dy = 0.0;
            $motionY = var$2;
            var$5 = $this.$player;
            var$5.$yRotation = var$5.$yRotation + $motionX * 0.15000000596046448;
            $motionX = var$5.$xRotation - $motionY * 0.15000000596046448;
            var$5.$xRotation = $motionX;
            $motionY = jl_Math_maxImpl((-90.0), $motionX);
            var$5.$xRotation = $motionY;
            var$5.$xRotation = jl_Math_minImpl(90.0, $motionY);
            jn_Buffer_clear($this.$selectBuffer);
            ju_Objects_requireNonNull($this);
            ju_Objects_requireNonNull($this);
            olo_GL11_glMatrixMode(5889);
            olo_GL11_glLoadIdentity();
            jn_Buffer_clear($this.$viewportBuffer);
            var$5 = $this.$viewportBuffer;
            if (jn_Buffer_remaining(var$5) >= 4)
                olo_GL11_glGetInteger(2978, jn_IntBufferOverByteBuffer_getArray(var$5));
            jn_Buffer_flip($this.$viewportBuffer);
            jn_IntBuffer_limit($this.$viewportBuffer, 16);
            olug_Project_gluPickMatrix(512.0, 384.0, 5.0, 5.0, $this.$viewportBuffer);
            ju_Objects_requireNonNull($this);
            ju_Objects_requireNonNull($this);
            olug_GLU_gluPerspective(70.0, 1.3333333730697632, 0.05000000074505806, 1000.0);
            olo_GL11_glMatrixMode(5888);
            olo_GL11_glLoadIdentity();
            cmr_RubyDung_moveCameraToPlayer($this, $partialTicks);
            cmrl_LevelRenderer_pick($this.$levelRenderer, $this.$player);
            jn_Buffer_flip($this.$selectBuffer);
            var$5 = $this.$selectBuffer;
            jn_IntBuffer_limit(var$5, var$5.$capacity);
            var$6 = Long_ZERO;
            var$7 = $rt_createIntArray(10).data;
            var$2 = 0;
            $y = 0;
            while ($y < 7168) {
                $z = jn_IntBufferImpl_get($this.$selectBuffer);
                var$10 = Long_fromInt(jn_IntBufferImpl_get($this.$selectBuffer));
                jn_IntBufferImpl_get($this.$selectBuffer);
                if (Long_ge(var$10, var$6) && $y) {
                    var$11 = 0;
                    while (var$11 < $z) {
                        jn_IntBufferImpl_get($this.$selectBuffer);
                        var$11 = var$11 + 1 | 0;
                    }
                    var$10 = var$6;
                    $z = var$2;
                } else {
                    var$2 = 0;
                    while (var$2 < $z) {
                        var$7[var$2] = jn_IntBufferImpl_get($this.$selectBuffer);
                        var$2 = var$2 + 1 | 0;
                    }
                }
                $y = $y + 1 | 0;
                var$6 = var$10;
                var$2 = $z;
            }
            if (var$2 <= 0)
                $this.$hitResult = null;
            else
                $this.$hitResult = cmr_HitResult__init_(var$7[0], var$7[1], var$7[2], var$7[3], var$7[4]);
            while (oli_Mouse_next()) {
                if (oli_Mouse_getEventButton() == 1 && oli_Mouse_getEventButtonState()) {
                    var$5 = $this.$hitResult;
                    if (var$5 !== null)
                        cmrl_Level_setTile($this.$level, var$5.$x0, var$5.$y0, var$5.$z0, 0);
                }
                if (oli_Mouse_getEventButton())
                    continue;
                if (!oli_Mouse_getEventButtonState())
                    continue;
                var$5 = $this.$hitResult;
                if (var$5 === null)
                    continue;
                $x = var$5.$x0;
                $y = var$5.$y0;
                $z = var$5.$z0;
                var$2 = var$5.$face;
                if (!var$2)
                    $y = $y + (-1) | 0;
                if (var$2 == 1)
                    $y = $y + 1 | 0;
                if (var$2 == 2)
                    $z = $z + (-1) | 0;
                if (var$2 == 3)
                    $z = $z + 1 | 0;
                if (var$2 == 4)
                    $x = $x + (-1) | 0;
                if (var$2 == 5)
                    $x = $x + 1 | 0;
                cmrl_Level_setTile($this.$level, $x, $y, $z, 1);
            }
            while (oli_Keyboard_next()) {
                if (oli_Keyboard_getEventKey() != 28)
                    continue;
                if (!oli_Keyboard_getEventKeyState())
                    continue;
                cmrl_Level_save($this.$level);
            }
            olo_GL11_glClear(16640);
            cmr_RubyDung_setupCamera($this, $partialTicks);
            olo_GL11_glEnable(2912);
            olo_GL11_glFogi(2917, 9729);
            olo_GL11_glFogf(2915, (-10.0));
            olo_GL11_glFogf(2916, 20.0);
            olo_GL11_glFog(2918, $this.$fogColor);
            olo_GL11_glDisable(2912);
            cmrl_LevelRenderer_render($this.$levelRenderer, 0);
            olo_GL11_glEnable(2912);
            cmrl_LevelRenderer_render($this.$levelRenderer, 1);
            olo_GL11_glDisable(3553);
            var$5 = $this.$hitResult;
            if (var$5 !== null)
                cmrl_LevelRenderer_renderHit($this.$levelRenderer, var$5);
            olo_GL11_glDisable(2912);
            $ptr = 1;
        case 1:
            olo_Display_update();
            if ($rt_suspending()) {
                break main;
            }
            return;
        default: $rt_invalidPointer();
        }}
        $rt_nativeThread().push($this, $partialTicks, var$2, $motionX, $motionY, var$5, var$6, var$7, $y, $z, var$10, var$11, $x, $ptr);
    }
    var jl_System = $rt_classWithoutFields();
    var jl_System_errCache = null;
    function jl_System_err() {
        var var$1;
        if (jl_System_errCache === null) {
            var$1 = new ji_PrintStream;
            ji_FilterOutputStream__init_(var$1, otcic_StderrOutputStream_INSTANCE);
            var$1.$sb = jl_StringBuilder__init_();
            var$1.$buffer = $rt_createCharArray(32);
            var$1.$autoFlush = 0;
            jnci_UTF8Charset_$callClinit();
            var$1.$charset = jnci_UTF8Charset_INSTANCE;
            jl_System_errCache = var$1;
        }
        return jl_System_errCache;
    }
    function jl_System_arraycopy($src, $srcPos, $dest, $destPos, $length) {
        var $srcType, $targetType, $srcArray, $i, var$10, var$11, var$12, $elem, var$14;
        if ($src !== null && $dest !== null) {
            if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
                a: {
                    b: {
                        if ($src !== $dest) {
                            $srcType = jl_Class_getComponentType(jl_Object_getClass($src));
                            $targetType = jl_Class_getComponentType(jl_Object_getClass($dest));
                            if ($srcType !== null && $targetType !== null) {
                                if ($srcType === $targetType)
                                    break b;
                                if (!jl_Class_isPrimitive($srcType) && !jl_Class_isPrimitive($targetType)) {
                                    $srcArray = $src;
                                    $i = 0;
                                    var$10 = $srcPos;
                                    while ($i < $length) {
                                        var$11 = $srcArray.data;
                                        var$12 = var$10 + 1 | 0;
                                        $elem = var$11[var$10];
                                        var$14 = $targetType.$platformClass;
                                        if (!($elem !== null && !(typeof $elem.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable($elem.constructor, var$14) ? 1 : 0)) {
                                            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                            $src = new jl_ArrayStoreException;
                                            jl_Exception__init_($src);
                                            $rt_throw($src);
                                        }
                                        $i = $i + 1 | 0;
                                        var$10 = var$12;
                                    }
                                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                    return;
                                }
                                if (!jl_Class_isPrimitive($srcType))
                                    break a;
                                if (jl_Class_isPrimitive($targetType))
                                    break b;
                                else
                                    break a;
                            }
                            $src = new jl_ArrayStoreException;
                            jl_Exception__init_($src);
                            $rt_throw($src);
                        }
                    }
                    jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                    return;
                }
                $src = new jl_ArrayStoreException;
                jl_Exception__init_($src);
                $rt_throw($src);
            }
            $src = new jl_IndexOutOfBoundsException;
            jl_Exception__init_($src);
            $rt_throw($src);
        }
        $dest = new jl_NullPointerException;
        jl_Throwable__init_($dest, $rt_s(9));
        $rt_throw($dest);
    }
    function jl_System_fastArraycopy($src, $srcPos, $dest, $destPos, $length) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
            jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
            return;
        }
        $src = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($src);
        $rt_throw($src);
    }
    function jl_System_doArrayCopy(var$1, var$2, var$3, var$4, var$5) {
        if (var$5 === 0) {
            return; 
        } else if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (var i = 0; i < var$5; i = (i + 1) | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = (var$2 + var$5) | 0;
            var$4 = (var$4 + var$5) | 0;
            for (var i = 0; i < var$5; i = (i + 1) | 0) {
                var$3.data[--var$4] = var$1.data[--var$2];
            }
        }
    }
    function jl_System_currentTimeMillis() {
        return Long_fromNumber(new Date().getTime());
    }
    function jl_System_nanoTime() {
        return Long_fromNumber($rt_globals.performance.now() * 1000000.0);
    }
    var otci_IntegerUtil = $rt_classWithoutFields();
    function cmr_Timer() {
        var a = this; jl_Object.call(a);
        a.$ticksPerSecond = 0.0;
        a.$lastTime = Long_ZERO;
        a.$timeScale = 0.0;
        a.$fps = 0.0;
        a.$passedTime = 0.0;
        a.$ticks = 0;
        a.$partialTicks = 0.0;
    }
    function cmr_Timer_advanceTime($this) {
        var $now, $passedNs, var$3, var$4;
        $now = jl_System_nanoTime();
        $passedNs = Long_sub($now, $this.$lastTime);
        $this.$lastTime = $now;
        if (Long_gt(Long_ZERO, $passedNs))
            $passedNs = Long_ZERO;
        if (Long_lt(Long_fromInt(1000000000), $passedNs))
            $passedNs = Long_fromInt(1000000000);
        $this.$fps = Long_toNumber(Long_div(Long_fromInt(1000000000), $passedNs));
        var$3 = $this.$passedTime + Long_toNumber($passedNs) * $this.$timeScale * $this.$ticksPerSecond / 1.0E9;
        $this.$passedTime = var$3;
        var$4 = var$3 | 0;
        $this.$ticks = var$4;
        var$4 = jl_Math_min(100, var$4);
        $this.$ticks = var$4;
        var$3 = $this.$passedTime - var$4;
        $this.$passedTime = var$3;
        $this.$partialTicks = var$3;
    }
    var ol_BufferUtils = $rt_classWithoutFields();
    function ol_BufferUtils_createByteBuffer($size) {
        var var$2, var$3, var$4;
        var$2 = jn_ByteBuffer_wrap($rt_createByteArray($size));
        jn_ByteOrder_$callClinit();
        if (jn_ByteOrder_nativeOrder === null) {
            var$3 = new $rt_globals.ArrayBuffer(2);
            var$4 = new $rt_globals.Int16Array(var$3);
            0;
            var$4[0] = 1;
            jn_ByteOrder_nativeOrder = (new $rt_globals.Int8Array(var$3))[0] ? jn_ByteOrder_LITTLE_ENDIAN : jn_ByteOrder_BIG_ENDIAN;
        }
        var$2.$order = jn_ByteOrder_nativeOrder;
        return var$2;
    }
    function ol_BufferUtils_createIntBuffer($size) {
        var var$2, var$3, var$4;
        var$2 = ol_BufferUtils_createByteBuffer($size << 2);
        var$3 = jn_Buffer_remaining(var$2) / 4 | 0;
        var$4 = var$2.$order;
        jn_ByteOrder_$callClinit();
        if (var$4 !== jn_ByteOrder_BIG_ENDIAN) {
            var$4 = new jn_IntBufferOverByteBufferLittleEndian;
            jn_IntBufferOverByteBuffer__init_(var$4, var$2.$start + var$2.$position | 0, var$3, var$2, 0, var$3, var$2.$readOnly);
        } else {
            var$4 = new jn_IntBufferOverByteBufferBigEndian;
            jn_IntBufferOverByteBuffer__init_(var$4, var$2.$start + var$2.$position | 0, var$3, var$2, 0, var$3, var$2.$readOnly);
        }
        return var$4;
    }
    function ol_BufferUtils_createFloatBuffer($size) {
        var var$2, var$3, var$4;
        var$2 = ol_BufferUtils_createByteBuffer($size << 2);
        var$3 = jn_Buffer_remaining(var$2) / 4 | 0;
        var$4 = var$2.$order;
        jn_ByteOrder_$callClinit();
        if (var$4 !== jn_ByteOrder_LITTLE_ENDIAN) {
            var$4 = new jn_FloatBufferOverByteBufferLittleEndian;
            jn_FloatBufferOverByteBuffer__init_(var$4, var$2.$start + var$2.$position | 0, var$3, var$2, 0, var$3, var$2.$readOnly);
        } else {
            var$4 = new jn_FloatBufferOverByteBufferBigEndian;
            jn_FloatBufferOverByteBuffer__init_(var$4, var$2.$start + var$2.$position | 0, var$3, var$2, 0, var$3, var$2.$readOnly);
        }
        return var$4;
    }
    var ju_Comparator = $rt_classWithoutFields(0);
    var jl_String$_clinit_$lambda$_93_0 = $rt_classWithoutFields();
    var jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException);
    var jlr_Array = $rt_classWithoutFields();
    function jlr_Array_getLength(var$1) {
        if (var$1 === null || var$1.constructor.$meta.item === undefined) {
            $rt_throw(jl_IllegalArgumentException__init_());
        }
        return var$1.data.length;
    }
    function jlr_Array_newInstanceImpl(var$1, var$2) {
        if (var$1.$meta.primitive) {
            if (var$1 == $rt_bytecls()) {
                return $rt_createByteArray(var$2);
            }
            if (var$1 == $rt_shortcls()) {
                return $rt_createShortArray(var$2);
            }
            if (var$1 == $rt_charcls()) {
                return $rt_createCharArray(var$2);
            }
            if (var$1 == $rt_ıntcls()) {
                return $rt_createIntArray(var$2);
            }
            if (var$1 == $rt_longcls()) {
                return $rt_createLongArray(var$2);
            }
            if (var$1 == $rt_floatcls()) {
                return $rt_createFloatArray(var$2);
            }
            if (var$1 == $rt_doublecls()) {
                return $rt_createDoubleArray(var$2);
            }
            if (var$1 == $rt_booleancls()) {
                return $rt_createBooleanArray(var$2);
            }
        } else {
            return $rt_createArray(var$1, var$2)
        }
    }
    var jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException);
    var jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException);
    var jl_Character = $rt_classWithoutFields();
    var jl_Character_TYPE = null;
    var jl_Character_characterCache = null;
    function jl_Character_isHighSurrogate($ch) {
        return ($ch & 64512) != 55296 ? 0 : 1;
    }
    function jl_Character_isLowSurrogate($ch) {
        return ($ch & 64512) != 56320 ? 0 : 1;
    }
    function jl_Character_highSurrogate($codePoint) {
        return (55296 | ($codePoint - 65536 | 0) >> 10 & 1023) & 65535;
    }
    function jl_Character_lowSurrogate($codePoint) {
        return (56320 | $codePoint & 1023) & 65535;
    }
    function jl_Character_forDigit($digit, $radix) {
        if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
            return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
        return 0;
    }
    function jl_Character__clinit_() {
        jl_Character_TYPE = $rt_cls($rt_charcls());
        jl_Character_characterCache = $rt_createArray(jl_Character, 128);
    }
    var otj_JSObject = $rt_classWithoutFields(0);
    var otjb_Performance = $rt_classWithoutFields();
    function jn_Buffer() {
        var a = this; jl_Object.call(a);
        a.$capacity = 0;
        a.$position = 0;
        a.$limit0 = 0;
        a.$mark = 0;
    }
    function jn_Buffer__init_($this, $capacity) {
        $this.$mark = (-1);
        $this.$capacity = $capacity;
        $this.$limit0 = $capacity;
    }
    function jn_Buffer_capacity($this) {
        return $this.$capacity;
    }
    function jn_Buffer_position($this) {
        return $this.$position;
    }
    function jn_Buffer_position0($this, $newPosition) {
        var var$2, var$3, var$4;
        if ($newPosition >= 0 && $newPosition <= $this.$limit0) {
            $this.$position = $newPosition;
            if ($newPosition < $this.$mark)
                $this.$mark = 0;
            return $this;
        }
        var$2 = new jl_IllegalArgumentException;
        var$3 = $this.$limit0;
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$4, $rt_s(10)), $newPosition), $rt_s(11)), var$3), 93);
        jl_Throwable__init_(var$2, jl_StringBuilder_toString(var$4));
        $rt_throw(var$2);
    }
    function jn_Buffer_clear($this) {
        $this.$position = 0;
        $this.$limit0 = $this.$capacity;
        $this.$mark = (-1);
        return $this;
    }
    function jn_Buffer_flip($this) {
        $this.$limit0 = $this.$position;
        $this.$position = 0;
        $this.$mark = (-1);
        return $this;
    }
    function jn_Buffer_remaining($this) {
        return $this.$limit0 - $this.$position | 0;
    }
    function jn_Buffer_hasRemaining($this) {
        return $this.$position >= $this.$limit0 ? 0 : 1;
    }
    function jn_ByteBuffer() {
        var a = this; jn_Buffer.call(a);
        a.$start = 0;
        a.$array = null;
        a.$order = null;
    }
    function jn_ByteBuffer_wrap($array) {
        var var$2, var$3, var$4;
        var$2 = $array.data.length;
        var$3 = new jn_ByteBufferImpl;
        var$4 = 0 + var$2 | 0;
        jn_Buffer__init_(var$3, var$2);
        jn_ByteOrder_$callClinit();
        var$3.$order = jn_ByteOrder_BIG_ENDIAN;
        var$3.$start = 0;
        var$3.$array = $array;
        var$3.$position = 0;
        var$3.$limit0 = var$4;
        var$3.$direct = 0;
        var$3.$readOnly = 0;
        return var$3;
    }
    function jn_ByteBuffer_put($this, $src, $offset, $length) {
        var var$4, var$5, var$6, var$7, var$8, var$9, $pos, $i, var$12;
        if (!$length)
            return $this;
        if ($this.$readOnly) {
            var$4 = new jn_ReadOnlyBufferException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if (jn_Buffer_remaining($this) < $length) {
            var$4 = new jn_BufferOverflowException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if ($offset >= 0) {
            var$5 = $src.data;
            var$6 = var$5.length;
            if ($offset <= var$6) {
                var$7 = $offset + $length | 0;
                if (var$7 > var$6) {
                    var$8 = new jl_IndexOutOfBoundsException;
                    var$9 = jl_StringBuilder__init_();
                    jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$9, $rt_s(12)), var$7), $rt_s(13)), var$6);
                    jl_Throwable__init_(var$8, jl_StringBuilder_toString(var$9));
                    $rt_throw(var$8);
                }
                if ($length < 0) {
                    var$4 = new jl_IndexOutOfBoundsException;
                    var$8 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$8, $rt_s(14)), $length), $rt_s(15));
                    jl_Throwable__init_(var$4, jl_StringBuilder_toString(var$8));
                    $rt_throw(var$4);
                }
                var$7 = $this.$position;
                $pos = var$7 + $this.$start | 0;
                $i = 0;
                while ($i < $length) {
                    $src = $this.$array.data;
                    var$12 = $pos + 1 | 0;
                    var$6 = $offset + 1 | 0;
                    $src[$pos] = var$5[$offset];
                    $i = $i + 1 | 0;
                    $pos = var$12;
                    $offset = var$6;
                }
                $this.$position = var$7 + $length | 0;
                return $this;
            }
        }
        $src = $src.data;
        var$4 = new jl_IndexOutOfBoundsException;
        $length = $src.length;
        var$8 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$8, $rt_s(16)), $offset), $rt_s(11)), $length), 41);
        jl_Throwable__init_(var$4, jl_StringBuilder_toString(var$8));
        $rt_throw(var$4);
    }
    function jn_ByteBuffer_put0($this, $src) {
        return jn_ByteBuffer_put($this, $src, 0, $src.data.length);
    }
    function jn_ByteBuffer_flip($this) {
        jn_Buffer_flip($this);
        return $this;
    }
    function jn_ByteOrder() {
        jl_Object.call(this);
        this.$name0 = null;
    }
    var jn_ByteOrder_BIG_ENDIAN = null;
    var jn_ByteOrder_LITTLE_ENDIAN = null;
    var jn_ByteOrder_nativeOrder = null;
    function jn_ByteOrder_$callClinit() {
        jn_ByteOrder_$callClinit = $rt_eraseClinit(jn_ByteOrder);
        jn_ByteOrder__clinit_();
    }
    function jn_ByteOrder__init_(var_0) {
        var var_1 = new jn_ByteOrder();
        jn_ByteOrder__init_0(var_1, var_0);
        return var_1;
    }
    function jn_ByteOrder__init_0($this, $name) {
        jn_ByteOrder_$callClinit();
        $this.$name0 = $name;
    }
    function jn_ByteOrder__clinit_() {
        jn_ByteOrder_BIG_ENDIAN = jn_ByteOrder__init_($rt_s(17));
        jn_ByteOrder_LITTLE_ENDIAN = jn_ByteOrder__init_($rt_s(18));
    }
    var otjt_ArrayBuffer = $rt_classWithoutFields();
    var otjt_ArrayBufferView = $rt_classWithoutFields();
    var otjt_Int16Array = $rt_classWithoutFields(otjt_ArrayBufferView);
    var otjt_Int8Array = $rt_classWithoutFields(otjt_ArrayBufferView);
    function jn_ByteBufferImpl() {
        var a = this; jn_ByteBuffer.call(a);
        a.$direct = 0;
        a.$readOnly = 0;
    }
    var jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
    var olo_Display = $rt_classWithoutFields();
    var olo_Display_currentMode = null;
    var olo_Display_width = 0;
    var olo_Display_height = 0;
    var olo_Display_title = null;
    var olo_Display_fullscreen = 0;
    var olo_Display_swapInterval = 0;
    var olo_Display_windowResized = 0;
    var olo_Display_windowResizable = 0;
    var olo_Display_fullscreenQuery = null;
    var olo_Display_isWindowActive = 0;
    var olo_Display_resizeEvent = null;
    var olo_Display_blurEvent = null;
    var olo_Display_focusEvent = null;
    function olo_Display_$callClinit() {
        olo_Display_$callClinit = $rt_eraseClinit(olo_Display);
        olo_Display__clinit_();
    }
    function olo_Display_isCloseRequested() {
        olo_Display_$callClinit();
        return 0;
    }
    function olo_Display_update() {
        var var$1, $ptr, $tmp;
        $ptr = 0;
        if ($rt_resuming()) {
            var $thread = $rt_nativeThread();
            $ptr = $thread.pop();var$1 = $thread.pop();
        }
        main: while (true) { switch ($ptr) {
        case 0:
            olo_Display_$callClinit();
            var$1 = 1;
            $ptr = 1;
        case 1:
            olo_Display_update0(var$1);
            if ($rt_suspending()) {
                break main;
            }
            return;
        default: $rt_invalidPointer();
        }}
        $rt_nativeThread().push(var$1, $ptr);
    }
    function olo_Display_update0($processMessages) {
        var $r, $w, $h, var$5, var$6, var$7, var$8, $$je, $ptr, $tmp;
        $ptr = 0;
        if ($rt_resuming()) {
            var $thread = $rt_nativeThread();
            $ptr = $thread.pop();var$8 = $thread.pop();var$7 = $thread.pop();var$6 = $thread.pop();var$5 = $thread.pop();$h = $thread.pop();$w = $thread.pop();$r = $thread.pop();$processMessages = $thread.pop();
        }
        main: while (true) { switch ($ptr) {
        case 0:
            olo_Display_$callClinit();
            $r = m_WebGL_window.devicePixelRatio;
            $w = m_WebGL_canvas.clientWidth * $r | 0;
            $h = m_WebGL_canvas.clientHeight * $r | 0;
            if (!(olo_Display_width == $w && olo_Display_height == $h))
                olo_Display_windowResized = 1;
            if (olo_Display_windowResizable && olo_Display_windowResized) {
                olo_Display_width = $w;
                olo_Display_height = $h;
                var$5 = m_WebGL_canvas;
                var$6 = $w;
                var$5.width = var$6;
                var$5 = m_WebGL_canvas;
                var$6 = olo_Display_height;
                var$5.height = var$6;
                olo_Display_windowResized = 0;
            }
            var$5 = m_WebGL_webgl;
            var$6 = null;
            var$5.bindFramebuffer(36160, var$6);
            var$5 = m_WebGL_webgl;
            var$6 = m_WebGL_backBuffer.$obj;
            var$5.bindFramebuffer(36008, var$6);
            var$5 = m_WebGL_webgl;
            var$6 = null;
            var$5.bindFramebuffer(36009, var$6);
            var$5 = m_WebGL_webgl;
            $processMessages = m_WebGL_backBufferWidth;
            var$7 = m_WebGL_backBufferHeight;
            var$5.blitFramebuffer(0, 0, $processMessages, var$7, 0, 0, $w, $h, 16384, 9728);
            var$5 = m_WebGL_webgl;
            var$6 = m_WebGL_backBuffer.$obj;
            var$5.bindFramebuffer(36160, var$6);
            $processMessages = olo_Display_width;
            var$7 = olo_Display_height;
            if (!($processMessages == m_WebGL_backBufferWidth && var$7 == m_WebGL_backBufferHeight)) {
                m_WebGL_bindRenderbuffer(m_WebGL_backBufferColor);
                m_WebGL_renderbufferStorage(32856, $processMessages, var$7);
                m_WebGL_bindRenderbuffer(m_WebGL_backBufferDepth);
                m_WebGL_renderbufferStorage(36012, $processMessages, var$7);
                m_WebGL_backBufferWidth = $processMessages;
                m_WebGL_backBufferHeight = var$7;
            }
            var$5 = m_WebGL_document;
            var$6 = $rt_ustr(olo_Display_title);
            var$5.title = var$6;
            try {
                var$8 = Long_fromInt(1);
                $ptr = 1;
                continue main;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_InterruptedException) {
                } else {
                    throw $$e;
                }
            }
            return;
        case 1:
            a: {
                try {
                    jl_Thread_sleep(var$8);
                    if ($rt_suspending()) {
                        break main;
                    }
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_InterruptedException) {
                    } else {
                        throw $$e;
                    }
                }
            }
            return;
        default: $rt_invalidPointer();
        }}
        $rt_nativeThread().push($processMessages, $r, $w, $h, var$5, var$6, var$7, var$8, $ptr);
    }
    function olo_Display__clinit_() {
        var var$1, var$2;
        olo_Display_currentMode = new olo_DisplayMode;
        olo_Display_width = 0;
        olo_Display_height = 0;
        olo_Display_title = $rt_s(19);
        olo_Display_fullscreen = 0;
        olo_Display_swapInterval = 0;
        olo_Display_windowResized = 0;
        olo_Display_windowResizable = 1;
        olo_Display_fullscreenQuery = null;
        olo_Display_isWindowActive = 1;
        olo_Display_resizeEvent = new olo_Display$1;
        olo_Display_blurEvent = new olo_Display$2;
        olo_Display_focusEvent = new olo_Display$3;
        olo_Display_fullscreenQuery = $rt_globals.window.matchMedia('(display-mode: fullscreen)');
        var$1 = m_WebGL_window;
        var$2 = olo_Display_resizeEvent;
        var$1.addEventListener("resize", otji_JS_function(var$2, "handleEvent"));
        var$1 = m_WebGL_window;
        var$2 = olo_Display_blurEvent;
        var$1.addEventListener("blue", otji_JS_function(var$2, "handleEvent"));
        var$1 = m_WebGL_window;
        var$2 = olo_Display_focusEvent;
        var$1.addEventListener("focus", otji_JS_function(var$2, "handleEvent"));
    }
    var oli_Keyboard = $rt_classWithoutFields();
    var oli_Keyboard_keys = null;
    var oli_Keyboard_keyName = null;
    var oli_Keyboard_keyMap = null;
    var oli_Keyboard_counter = 0;
    var oli_Keyboard_created = 0;
    var oli_Keyboard_repeat_enabled = 0;
    var oli_Keyboard_initialized = 0;
    var oli_Keyboard_keyEvents = null;
    var oli_Keyboard_keyStates = null;
    var oli_Keyboard_keyCount = 0;
    var oli_Keyboard_keydown = null;
    var oli_Keyboard_keyup = null;
    var oli_Keyboard_keypress = null;
    var oli_Keyboard_currentEventK = null;
    var oli_Keyboard_LWJGLKeyCodes = null;
    function oli_Keyboard_$callClinit() {
        oli_Keyboard_$callClinit = $rt_eraseClinit(oli_Keyboard);
        oli_Keyboard__clinit_();
    }
    function oli_Keyboard_initialize() {
        oli_Keyboard_$callClinit();
        if (oli_Keyboard_initialized)
            return;
        oli_Keyboard_initialized = 1;
    }
    function oli_Keyboard_isKeyDown($key) {
        oli_Keyboard_$callClinit();
        return oli_Keyboard_keyStates.data[$key];
    }
    function oli_Keyboard_next() {
        var var$1, var$2;
        oli_Keyboard_$callClinit();
        a: {
            oli_Keyboard_currentEventK = null;
            if (!ju_AbstractCollection_isEmpty(oli_Keyboard_keyEvents)) {
                var$1 = otji_JSWrapper_unwrap(ju_AbstractSequentialList_remove(oli_Keyboard_keyEvents, 0));
                oli_Keyboard_currentEventK = var$1;
                if (var$1 !== null) {
                    var$2 = 1;
                    break a;
                }
            }
            var$2 = 0;
        }
        return var$2;
    }
    function oli_Keyboard_getEventKey() {
        var var$1;
        oli_Keyboard_$callClinit();
        var$1 = oli_Keyboard_currentEventK;
        return var$1 === null ? (-1) : oli_Keyboard_remap(var$1.which);
    }
    function oli_Keyboard_getEventKeyState() {
        var var$1;
        oli_Keyboard_$callClinit();
        var$1 = oli_Keyboard_currentEventK;
        return var$1 === null ? 0 : jl_String_equals($rt_str(var$1.type), $rt_s(20)) ? 0 : 1;
    }
    function oli_Keyboard_remap($k) {
        var var$2;
        oli_Keyboard_$callClinit();
        var$2 = oli_Keyboard_LWJGLKeyCodes.data;
        return $k <= var$2.length && $k >= 0 ? var$2[$k] : (-1);
    }
    function oli_Keyboard__clinit_() {
        var $keyIndex, var$2, $count, var$4, $key;
        oli_Keyboard_keys = $rt_createArrayFromData(jl_String, [$rt_s(21), $rt_s(22), $rt_s(23), $rt_s(24), $rt_s(25), $rt_s(26), $rt_s(27), $rt_s(28), $rt_s(29), $rt_s(30), $rt_s(31), $rt_s(1), $rt_s(32), $rt_s(33), $rt_s(34), $rt_s(35), $rt_s(36), $rt_s(37), $rt_s(38), $rt_s(39), $rt_s(40), $rt_s(41), $rt_s(42), $rt_s(43), $rt_s(44), $rt_s(45), $rt_s(46), $rt_s(47), $rt_s(48), $rt_s(49), $rt_s(50), $rt_s(51), $rt_s(52), $rt_s(53), $rt_s(54), $rt_s(55), $rt_s(56), $rt_s(57), $rt_s(58), $rt_s(59), $rt_s(60),
        $rt_s(61), $rt_s(62), $rt_s(63), $rt_s(64), $rt_s(65), $rt_s(66), $rt_s(67), $rt_s(68), $rt_s(69), $rt_s(70), $rt_s(71), $rt_s(72), $rt_s(73), $rt_s(74), $rt_s(75), $rt_s(76), $rt_s(77), $rt_s(78), $rt_s(79), $rt_s(80), $rt_s(81), $rt_s(82), $rt_s(83), $rt_s(84), $rt_s(85), $rt_s(86), $rt_s(87), $rt_s(88), $rt_s(89), $rt_s(90), $rt_s(91), $rt_s(92), $rt_s(93), $rt_s(94), $rt_s(95), $rt_s(96), $rt_s(97), $rt_s(98), $rt_s(99), $rt_s(100), $rt_s(101), $rt_s(102), $rt_s(103), $rt_s(104), $rt_s(104), $rt_s(104),
        $rt_s(105), $rt_s(106), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(107), $rt_s(108), $rt_s(109), $rt_s(110), $rt_s(111), $rt_s(112), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(113), $rt_s(114), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(115), $rt_s(104), $rt_s(116), $rt_s(104), $rt_s(117), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104),
        $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(118), $rt_s(104), $rt_s(104), $rt_s(119), $rt_s(120), $rt_s(121), $rt_s(122), $rt_s(123), $rt_s(124), $rt_s(125), $rt_s(126), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(127), $rt_s(128), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(129), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104),
        $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(130), $rt_s(104), $rt_s(131), $rt_s(104), $rt_s(132), $rt_s(133), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(134), $rt_s(135), $rt_s(104), $rt_s(136), $rt_s(137), $rt_s(138), $rt_s(104), $rt_s(139), $rt_s(104), $rt_s(140), $rt_s(104), $rt_s(141), $rt_s(142), $rt_s(143), $rt_s(144), $rt_s(145), $rt_s(104), $rt_s(104), $rt_s(104), $rt_s(104),
        $rt_s(104), $rt_s(104), $rt_s(146), $rt_s(147), $rt_s(148), $rt_s(149), $rt_s(150), $rt_s(151)]);
        oli_Keyboard_keyName = $rt_createArray(jl_String, 256);
        oli_Keyboard_keyMap = ju_HashMap__init_(253);
        oli_Keyboard_created = 0;
        oli_Keyboard_repeat_enabled = 0;
        oli_Keyboard_keyEvents = ju_LinkedList__init_();
        oli_Keyboard_keyStates = $rt_createBooleanArray(256);
        oli_Keyboard_keyCount = 0;
        oli_Keyboard_keydown = null;
        oli_Keyboard_keyup = null;
        oli_Keyboard_keypress = null;
        oli_Keyboard_currentEventK = null;
        oli_Keyboard_LWJGLKeyCodes = $rt_createIntArrayFromData([(-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), 14, 15, (-1), (-1), (-1), 28, (-1), (-1), 42, 29, 56, (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), 1, (-1), (-1), (-1), (-1), 57, 210, 201, 207, 199, 203, 200, 205, 208, 205, 208, (-1), (-1), 210, 211, 211, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, (-1), (-1), (-1), (-1), (-1), (-1), (-1), 30, 48, 46, 32, 18, 33, 34, 35, 23, 36, 37, 38, 50, 49, 24, 25, 16, 19, 31, 20, 22, 47, 17, 45, 21, 44, (-1), (-1),
        (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), 12, 52, 53, (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1),
        (-1), (-1), (-1), (-1), (-1), (-1), (-1), 39, 13, 51, 12, 52, 53, (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), (-1), 26, 43, 27, 40]);
        $keyIndex = 0;
        var$2 = oli_Keyboard_keys.data;
        $count = var$2.length;
        var$4 = 0;
        while (var$4 < $count) {
            $key = var$2[var$4];
            oli_Keyboard_keyName.data[$keyIndex] = $key;
            ju_HashMap_put(oli_Keyboard_keyMap, $key, jl_Integer_valueOf($keyIndex));
            $keyIndex = $keyIndex + 1 | 0;
            oli_Keyboard_counter = oli_Keyboard_counter + 1 | 0;
            var$4 = var$4 + 1 | 0;
        }
        $count = 0;
        var$2 = oli_Keyboard_LWJGLKeyCodes.data;
        $keyIndex = var$2.length;
        var$4 = 0;
        while (var$4 < $keyIndex) {
            if (jl_Integer_intValue(jl_Integer_valueOf(var$2[var$4])) != (-1))
                $count = $count + 1 | 0;
            var$4 = var$4 + 1 | 0;
        }
        oli_Keyboard_keyCount = $count;
    }
    function cmrl_Chunk() {
        var a = this; jl_Object.call(a);
        a.$level1 = null;
        a.$boundingBox = null;
        a.$minX = 0;
        a.$minY = 0;
        a.$minZ = 0;
        a.$maxX = 0;
        a.$maxY = 0;
        a.$maxZ = 0;
        a.$lists = 0;
        a.$dirty = 0;
    }
    var cmrl_Chunk_TEXTURE = 0;
    var cmrl_Chunk_TESSELLATOR = null;
    var cmrl_Chunk_rebuiltThisFrame = 0;
    var cmrl_Chunk_updates = 0;
    function cmrl_Chunk_$callClinit() {
        cmrl_Chunk_$callClinit = $rt_eraseClinit(cmrl_Chunk);
        cmrl_Chunk__clinit_();
    }
    function cmrl_Chunk_rebuild($this, $layer) {
        var $x, var$3, $y, $z, var$6;
        cmrl_Chunk_$callClinit();
        $x = cmrl_Chunk_rebuiltThisFrame;
        if ($x == 2)
            return;
        cmrl_Chunk_updates = cmrl_Chunk_updates + 1 | 0;
        cmrl_Chunk_rebuiltThisFrame = $x + 1 | 0;
        $this.$dirty = 0;
        $x = $this.$lists + $layer | 0;
        olo_GL11_$callClinit();
        if (!olo_GL11_compilingDisplayList) {
            var$3 = ju_HashMap_get(olo_GL11_lists, jl_Integer_valueOf($x));
            olo_GL11_currentList = var$3;
            if (var$3 !== null) {
                var$3.$mode = (-1);
                var$3.$length1 = 0;
                olo_GL11_compilingDisplayList = 1;
            }
        }
        olo_GL11_glEnable(3553);
        olo_GL11_glBindTexture(5890, cmrl_Chunk_TEXTURE);
        cmrl_Tessellator_clear(cmrl_Chunk_TESSELLATOR);
        $x = $this.$minX;
        while ($x < $this.$maxX) {
            $y = $this.$minY;
            while ($y < $this.$maxY) {
                $z = $this.$minZ;
                while ($z < $this.$maxZ) {
                    if (cmrl_Level_isTile($this.$level1, $x, $y, $z)) {
                        var$3 = $this.$level1;
                        if ($y == ((var$3.$depth * 2 | 0) / 3 | 0) ? 0 : 1)
                            cmrl_Tile_render(cmrl_Tile_rock, cmrl_Chunk_TESSELLATOR, var$3, $layer, $x, $y, $z);
                        else
                            cmrl_Tile_render(cmrl_Tile_grass, cmrl_Chunk_TESSELLATOR, var$3, $layer, $x, $y, $z);
                    }
                    $z = $z + 1 | 0;
                }
                $y = $y + 1 | 0;
            }
            $x = $x + 1 | 0;
        }
        cmrl_Tessellator_flush(cmrl_Chunk_TESSELLATOR);
        olo_GL11_glDisable(3553);
        if (olo_GL11_compilingDisplayList) {
            olo_GL11_compilingDisplayList = 0;
            var$3 = olo_GL11_appendbuffer.buffer;
            $x = olo_GL11_appendbufferindex;
            var$3 = new $rt_globals.Int32Array(var$3, 0, $x);
            olo_GL11_appendbufferindex = 0;
            var$6 = otji_JSWrapper_wrap(var$3);
            $layer = olo_GL11_glArrayByteLength(var$6);
            if ($layer > 0) {
                var$3 = olo_GL11_currentList;
                if (var$3.$buffer1 === null) {
                    ju_HashMap_put(olo_GL11_initLists, jl_Integer_valueOf(var$3.$id), olo_GL11_currentList);
                    olo_GL11_currentList.$array0 = olo_GL11_glCreateVertexArray();
                    olo_GL11_currentList.$buffer1 = olo_GL11_glCreateBuffer();
                    var$3 = m_WebGLShader_instance(olo_GL11_currentList.$mode);
                    olo_GL11_glBindVertexArray0(olo_GL11_currentList.$array0);
                    olo_GL11_glBindBuffer(34962, olo_GL11_currentList.$buffer1);
                    m_WebGLShader_setupArrayForProgram(var$3);
                }
                olo_GL11_glBindBuffer(34962, olo_GL11_currentList.$buffer1);
                olo_GL11_glBufferData(34962, var$6, 35044);
                olo_GL11_bytesUploaded = olo_GL11_bytesUploaded + $layer | 0;
            }
        }
    }
    function cmrl_Chunk__clinit_() {
        var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, $$je;
        olo_GL11_$callClinit();
        var$1 = olo_GL11_textureIndex + 1 | 0;
        olo_GL11_textureIndex = var$1;
        if (var$1 >= 256)
            olo_GL11_textureIndex = 1;
        var$2 = olo_GL11_textures;
        var$3 = jl_Integer_valueOf(olo_GL11_textureIndex);
        var$4 = new m_TextureGL;
        var$5 = olo_GL11_webgl.createTexture();
        var$4.$w = (-1);
        var$4.$h = (-1);
        var$4.$nearest = 1;
        var$4.$anisotropic = 0;
        var$4.$obj0 = var$5;
        ju_HashMap_put(var$2, var$3, var$4);
        var$6 = olo_GL11_textureIndex;
        if (var$6 != cmr_Textures_lastId) {
            olo_GL11_glBindTexture(3553, var$6);
            cmr_Textures_lastId = var$6;
        }
        olo_GL11_glTexParameteri(3553, 10241, 9728);
        olo_GL11_glTexParameteri(3553, 10240, 9728);
        a: {
            try {
                var$4 = jl_Class_getResourceAsStream($rt_cls(cmr_Textures), $rt_s(152));
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof ji_IOException) {
                    var$4 = $$je;
                    break a;
                } else {
                    throw $$e;
                }
            }
            b: {
                try {
                    if (var$4 === null) {
                        var$5 = new ji_IOException;
                        var$2 = jl_StringBuilder__init_();
                        jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(153)), $rt_s(152));
                        ji_IOException__init_(var$5, jl_StringBuilder_toString(var$2));
                        $rt_throw(var$5);
                    }
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Throwable) {
                        var$5 = $$je;
                        break b;
                    } else if ($$je instanceof ji_IOException) {
                        var$4 = $$je;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                c: {
                    try {
                        try {
                            var$7 = $rt_createByteArray(262144);
                            var$1 = ji_InputStream_read(var$4, var$7);
                            if (var$1 != 262144)
                                break c;
                            var$5 = ol_BufferUtils_createByteBuffer(262144);
                            jn_ByteBuffer_put0(var$5, var$7);
                            jn_ByteBuffer_flip(var$5);
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_Throwable) {
                                var$5 = $$je;
                                break b;
                            } else {
                                throw $$e;
                            }
                        }
                        ji_ByteArrayInputStream_close(var$4);
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof ji_IOException) {
                            var$4 = $$je;
                            break a;
                        } else {
                            throw $$e;
                        }
                    }
                    olo_GL11_glTexImage2D(3553, 0, 6408, 256, 256, 0, 6408, 5121, var$5);
                    cmrl_Chunk_TEXTURE = var$6;
                    cmrl_Chunk_TESSELLATOR = cmrl_Tessellator__init_();
                    return;
                }
                try {
                    var$5 = new ji_IOException;
                    var$2 = jl_StringBuilder__init_();
                    jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$2, $rt_s(154)), 262144), $rt_s(155)), var$1);
                    ji_IOException__init_(var$5, jl_StringBuilder_toString(var$2));
                    $rt_throw(var$5);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Throwable) {
                        var$5 = $$je;
                    } else if ($$je instanceof ji_IOException) {
                        var$4 = $$je;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
            }
            d: {
                try {
                    if (var$4 === null)
                        break d;
                    try {
                        ji_ByteArrayInputStream_close(var$4);
                        break d;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof jl_Throwable) {
                            var$4 = $$je;
                        } else {
                            throw $$e;
                        }
                    }
                    jl_Throwable_addSuppressed(var$5, var$4);
                    break d;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof ji_IOException) {
                        var$4 = $$je;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
            }
            try {
                $rt_throw(var$5);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof ji_IOException) {
                    var$4 = $$je;
                } else {
                    throw $$e;
                }
            }
        }
        var$5 = new jl_RuntimeException;
        var$2 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(var$2, $rt_s(156)), $rt_s(152));
        var$8 = jl_StringBuilder_toString(var$2);
        var$5.$suppressionEnabled = 1;
        var$5.$writableStackTrace = 1;
        var$5.$message = var$8;
        var$5.$cause = var$4;
        $rt_throw(var$5);
    }
    var oli_Mouse = $rt_classWithoutFields();
    var oli_Mouse_created = 0;
    var oli_Mouse_x = 0;
    var oli_Mouse_y = 0;
    var oli_Mouse_dx = 0.0;
    var oli_Mouse_dy = 0.0;
    var oli_Mouse_dwheel = 0;
    var oli_Mouse_buttonName = null;
    var oli_Mouse_buttonMap = null;
    var oli_Mouse_initialized = 0;
    var oli_Mouse_grab_x = 0;
    var oli_Mouse_grab_y = 0;
    var oli_Mouse_isGrabbed = 0;
    var oli_Mouse_mouseEvents = null;
    var oli_Mouse_buttonStates = null;
    var oli_Mouse_isInsideWindow = 0;
    var oli_Mouse_contextmenu = null;
    var oli_Mouse_mousedown = null;
    var oli_Mouse_mouseup = null;
    var oli_Mouse_mousemove = null;
    var oli_Mouse_wheel = null;
    var oli_Mouse_pointerLockChange = null;
    var oli_Mouse_currentEvent = null;
    function oli_Mouse_initialize() {
        var $i, var$2, var$3;
        oli_Mouse_buttonName = $rt_createArray(jl_String, 16);
        $i = 0;
        while ($i < 16) {
            var$2 = oli_Mouse_buttonName.data;
            var$3 = jl_StringBuilder__init_();
            jl_StringBuilder_append2(jl_StringBuilder_append(var$3, $rt_s(157)), $i);
            var$2[$i] = jl_StringBuilder_toString(var$3);
            ju_HashMap_put(oli_Mouse_buttonMap, oli_Mouse_buttonName.data[$i], jl_Integer_valueOf($i));
            $i = $i + 1 | 0;
        }
        oli_Mouse_initialized = 1;
    }
    function oli_Mouse_resetMouse() {
        oli_Mouse_dwheel = 0;
        oli_Mouse_dy = 0.0;
        oli_Mouse_dx = 0.0;
    }
    function oli_Mouse_create() {
        var $t, var$2, var$3, $$je;
        a: {
            b: {
                try {
                    if (!oli_Mouse_created)
                        break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Throwable) {
                        $t = $$je;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
                return;
            }
            c: {
                try {
                    if (oli_Mouse_initialized)
                        break c;
                    oli_Mouse_initialize();
                    break c;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Throwable) {
                        $t = $$je;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
            }
            d: {
                try {
                    var$2 = m_WebGL_window;
                    var$3 = oli_Mouse$1__init_();
                    oli_Mouse_contextmenu = var$3;
                    var$2.addEventListener("contextmenu", otji_JS_function(var$3, "handleEvent"));
                    $t = m_WebGL_canvas;
                    var$2 = oli_Mouse$2__init_();
                    oli_Mouse_mousedown = var$2;
                    $t.addEventListener("mousedown", otji_JS_function(var$2, "handleEvent"));
                    $t = m_WebGL_canvas;
                    var$2 = oli_Mouse$3__init_();
                    oli_Mouse_mouseup = var$2;
                    $t.addEventListener("mouseup", otji_JS_function(var$2, "handleEvent"));
                    $t = m_WebGL_canvas;
                    var$2 = oli_Mouse$4__init_();
                    oli_Mouse_mousemove = var$2;
                    $t.addEventListener("mousemove", otji_JS_function(var$2, "handleEvent"));
                    $t = m_WebGL_canvas;
                    var$2 = oli_Mouse$5__init_();
                    oli_Mouse_wheel = var$2;
                    $t.addEventListener("wheel", otji_JS_function(var$2, "handleEvent"));
                    $t = m_WebGL_canvas;
                    var$2 = oli_Mouse$6__init_();
                    oli_Mouse_pointerLockChange = var$2;
                    $t.addEventListener("pointerlockchange", otji_JS_function(var$2, "handleEvent"));
                    $t = m_WebGL_canvas;
                    var$2 = oli_Mouse$7__init_();
                    oli_Mouse_pointerLockChange = var$2;
                    $t.addEventListener("mouseleave", otji_JS_function(var$2, "handleEvent"));
                    $t = m_WebGL_canvas;
                    var$2 = oli_Mouse$8__init_();
                    oli_Mouse_pointerLockChange = var$2;
                    $t.addEventListener("mouseenter", otji_JS_function(var$2, "handleEvent"));
                    oli_Mouse_created = 1;
                    $t = oli_Mouse_mouseEvents;
                    if ($t === null)
                        break d;
                    ju_LinkedList_clear($t);
                    break d;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_Throwable) {
                        $t = $$je;
                        break a;
                    } else {
                        throw $$e;
                    }
                }
            }
            try {
                oli_Mouse_setGrabbed(oli_Mouse_isGrabbed);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                    $t = $$je;
                    break a;
                } else {
                    throw $$e;
                }
            }
            return;
        }
        var$3 = new ol_LWJGLException;
        jl_Throwable__init_2(var$3, $t);
        $rt_throw(var$3);
    }
    function oli_Mouse_next() {
        var var$1, var$2;
        a: {
            oli_Mouse_currentEvent = null;
            if (!ju_AbstractCollection_isEmpty(oli_Mouse_mouseEvents)) {
                var$1 = otji_JSWrapper_unwrap(ju_AbstractSequentialList_remove(oli_Mouse_mouseEvents, 0));
                oli_Mouse_currentEvent = var$1;
                if (var$1 !== null) {
                    var$2 = 1;
                    break a;
                }
            }
            var$2 = 0;
        }
        return var$2;
    }
    function oli_Mouse_getEventButton() {
        var var$1, $b;
        var$1 = oli_Mouse_currentEvent;
        if (var$1 === null)
            return (-1);
        $b = var$1.button;
        if ($b == 1)
            $b = 2;
        else if ($b == 2)
            $b = 1;
        return $b;
    }
    function oli_Mouse_getEventButtonState() {
        var var$1;
        var$1 = oli_Mouse_currentEvent;
        return var$1 === null ? 0 : jl_String_equals($rt_str(var$1.type), $rt_s(158));
    }
    function oli_Mouse_setGrabbed($grab) {
        var $grabbed;
        $grabbed = oli_Mouse_isGrabbed;
        oli_Mouse_isGrabbed = $grab;
        if (oli_Mouse_created) {
            if ($grab && !$grabbed) {
                if (!($rt_globals.document.pointerLockElement != null ? 1 : 0)) {
                    oli_Mouse_grab_x = oli_Mouse_x;
                    oli_Mouse_grab_y = oli_Mouse_y;
                    oli_Mouse_dx = 0.0;
                    oli_Mouse_dy = 0.0;
                    m_WebGL_canvas.requestPointerLock();
                }
            } else if (!$grab && $grabbed && ($rt_globals.document.pointerLockElement != null ? 1 : 0))
                m_WebGL_document.exitPointerLock();
            oli_Mouse_resetMouse();
        }
    }
    function oli_Mouse__clinit_() {
        oli_Mouse_buttonMap = ju_HashMap__init_(16);
        oli_Mouse_mouseEvents = new ju_LinkedList;
        oli_Mouse_buttonStates = $rt_createBooleanArray(8);
        oli_Mouse_isInsideWindow = 1;
        oli_Mouse_contextmenu = null;
        oli_Mouse_mousedown = null;
        oli_Mouse_mouseup = null;
        oli_Mouse_mousemove = null;
        oli_Mouse_wheel = null;
        oli_Mouse_pointerLockChange = null;
        oli_Mouse_currentEvent = null;
    }
    function cmr_HitResult() {
        var a = this; jl_Object.call(a);
        a.$x0 = 0;
        a.$y0 = 0;
        a.$z0 = 0;
        a.$type = 0;
        a.$face = 0;
    }
    function cmr_HitResult__init_(var_0, var_1, var_2, var_3, var_4) {
        var var_5 = new cmr_HitResult();
        cmr_HitResult__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
        return var_5;
    }
    function cmr_HitResult__init_0($this, $x, $y, $z, $type, $face) {
        $this.$x0 = $x;
        $this.$y0 = $y;
        $this.$z0 = $z;
        $this.$type = $type;
        $this.$face = $face;
    }
    var m_GLEnums = $rt_classWithoutFields();
    var olo_GL11 = $rt_classWithoutFields(m_GLEnums);
    var olo_GL11_webgl = null;
    var olo_GL11_alphaValue = 0.0;
    var olo_GL11_alpha = 0;
    var olo_GL11_currentWebGLProgram = 0;
    var olo_GL11_mat2 = null;
    var olo_GL11_mat3 = null;
    var olo_GL11_mat4 = null;
    var olo_GL11_textures = null;
    var olo_GL11_textureIndex = 0;
    var olo_GL11_textureArray = 0;
    var olo_GL11_colorArray = 0;
    var olo_GL11_normalArray = 0;
    var olo_GL11_compilingDisplayList = 0;
    var olo_GL11_currentList = null;
    var olo_GL11_lists = null;
    var olo_GL11_initLists = null;
    var olo_GL11_quadsToTrianglesBuffer = null;
    var olo_GL11_currentArray = null;
    var olo_GL11_bytesUploaded = 0;
    var olo_GL11_vertexDrawn = 0;
    var olo_GL11_triangleDrawn = 0;
    var olo_GL11_fogColorR = 0.0;
    var olo_GL11_fogColorG = 0.0;
    var olo_GL11_fogColorB = 0.0;
    var olo_GL11_fogColorA = 0.0;
    var olo_GL11_fogMode = 0;
    var olo_GL11_fogEnabled = 0;
    var olo_GL11_fogPremultiply = 0;
    var olo_GL11_fogStart = 0.0;
    var olo_GL11_fogEnd = 0.0;
    var olo_GL11_fogDensity = 0.0;
    var olo_GL11_texture2D = 0;
    var olo_GL11_lighting = 0;
    var olo_GL11_colorMaterial = 0;
    var olo_GL11_normalX = 0.0;
    var olo_GL11_normalY = 0.0;
    var olo_GL11_normalZ = 0.0;
    var olo_GL11_tex0X = 0.0;
    var olo_GL11_tex0Y = 0.0;
    var olo_GL11_colorR = 0.0;
    var olo_GL11_colorG = 0.0;
    var olo_GL11_colorB = 0.0;
    var olo_GL11_colorA = 0.0;
    var olo_GL11_matrixMode = 0;
    var olo_GL11_matModelV = null;
    var olo_GL11_matModelPointer = 0;
    var olo_GL11_matProjV = null;
    var olo_GL11_matProjPointer = 0;
    var olo_GL11_matTexV = null;
    var olo_GL11_matTexPointer = 0;
    var olo_GL11_matrixVector = null;
    var olo_GL11_lightPos1vec = null;
    var olo_GL11_lightPos0vec = null;
    var olo_GL11_lightPos0vec0 = null;
    var olo_GL11_lightPos1vec0 = null;
    var olo_GL11_vertexBuffer = null;
    var olo_GL11_texCoordBuffer = null;
    var olo_GL11_viewportCache = null;
    var olo_GL11_materialAmbientR = 0.0;
    var olo_GL11_materialAmbientG = 0.0;
    var olo_GL11_materialAmbientB = 0.0;
    var olo_GL11_materialAmbientA = 0.0;
    var olo_GL11_materialDiffuseR = 0.0;
    var olo_GL11_materialDiffuseG = 0.0;
    var olo_GL11_materialDiffuseB = 0.0;
    var olo_GL11_materialDiffuseA = 0.0;
    var olo_GL11_materialSpecularR = 0.0;
    var olo_GL11_materialSpecularG = 0.0;
    var olo_GL11_materialSpecularB = 0.0;
    var olo_GL11_materialSpecularA = 0.0;
    var olo_GL11_materialEmissionR = 0.0;
    var olo_GL11_materialEmissionG = 0.0;
    var olo_GL11_materialEmissionB = 0.0;
    var olo_GL11_materialEmissionA = 0.0;
    var olo_GL11_materialBackAmbientR = 0.0;
    var olo_GL11_materialBackAmbientG = 0.0;
    var olo_GL11_materialBackAmbientB = 0.0;
    var olo_GL11_materialBackAmbientA = 0.0;
    var olo_GL11_materialBackDiffuseR = 0.0;
    var olo_GL11_materialBackDiffuseG = 0.0;
    var olo_GL11_materialBackDiffuseB = 0.0;
    var olo_GL11_materialBackDiffuseA = 0.0;
    var olo_GL11_materialBackSpecularR = 0.0;
    var olo_GL11_materialBackSpecularG = 0.0;
    var olo_GL11_materialBackSpecularB = 0.0;
    var olo_GL11_materialBackSpecularA = 0.0;
    var olo_GL11_materialBackEmissionR = 0.0;
    var olo_GL11_materialBackEmissionG = 0.0;
    var olo_GL11_materialBackEmissionB = 0.0;
    var olo_GL11_materialBackEmissionA = 0.0;
    var olo_GL11_displayListId = 0;
    var olo_GL11_blankUploadArray = null;
    var olo_GL11_paramMatrix = null;
    var olo_GL11_bufferUpload = null;
    var olo_GL11_appendbufferindex = 0;
    var olo_GL11_appendbuffer = null;
    var olo_GL11_shaderWebGL = null;
    function olo_GL11_$callClinit() {
        olo_GL11_$callClinit = $rt_eraseClinit(olo_GL11);
        olo_GL11__clinit_();
    }
    function olo_GL11_glClear($mask) {
        olo_GL11_$callClinit();
        olo_GL11_webgl.clear($mask);
    }
    function olo_GL11_glDrawQuadArrays($p2, $p3) {
        var var$3, $v3, var$5, $i, $v1, $v2, $v4, var$10, var$11;
        olo_GL11_$callClinit();
        if (olo_GL11_quadsToTrianglesBuffer === null) {
            var$3 = $rt_createIntArray(49200);
            $v3 = var$3.data.length;
            var$5 = new jn_IntBufferOverArray;
            jn_IntBufferImpl__init_(var$5, $v3, 0, 0 + $v3 | 0);
            var$5.$start0 = 0;
            var$5.$readOnly0 = 0;
            var$5.$array1 = var$3;
            $i = 0;
            while ($i < 16384) {
                $v1 = $i * 4 | 0;
                $v2 = $v1 + 1 | 0;
                $v3 = $v1 + 2 | 0;
                $v4 = $v1 + 3 | 0;
                var$10 = $v2 << 16;
                jn_IntBufferImpl_put(var$5, $v1 | var$10);
                jn_IntBufferImpl_put(var$5, $v4 | var$10);
                jn_IntBufferImpl_put(var$5, $v3 | $v4 << 16);
                $i = $i + 1 | 0;
            }
            jn_Buffer_flip(var$5);
            var$11 = olo_GL11_glCreateBuffer();
            olo_GL11_quadsToTrianglesBuffer = var$11;
            olo_GL11_glBindBuffer(34963, var$11);
            $v4 = jn_Buffer_remaining(var$5);
            var$11 = new $rt_globals.Int32Array(olo_GL11_bufferUpload.buffer);
            var$10 = 0;
            while (var$10 < $v4) {
                $v1 = jn_IntBufferImpl_get(var$5);
                var$10;
                var$11[var$10] = $v1;
                var$10 = var$10 + 1 | 0;
            }
            var$5 = olo_GL11_bufferUpload.buffer;
            $v4 = $v4 * 4 | 0;
            var$11 = new $rt_globals.Uint8Array(var$5, 0, $v4);
            olo_GL11_webgl.bufferData(34963, var$11, 35044);
        }
        var$5 = olo_GL11_currentArray;
        if (!var$5.$isQuadBufferBound) {
            var$5.$isQuadBufferBound = 1;
            olo_GL11_glBindBuffer(34963, olo_GL11_quadsToTrianglesBuffer);
        }
        $i = ($p3 * 6 | 0) / 4 | 0;
        $p2 = ($p2 * 6 | 0) / 4 | 0;
        olo_GL11_webgl.drawElements(4, $i, 5123, $p2);
    }
    function olo_GL11_glBindVertexArray0($p1) {
        var var$2;
        olo_GL11_$callClinit();
        olo_GL11_currentArray = $p1;
        if ($p1 !== null) {
            var$2 = olo_GL11_webgl;
            $p1 = $p1.$obj1;
            var$2.bindVertexArray($p1);
            return;
        }
        $p1 = olo_GL11_webgl;
        var$2 = null;
        $p1.bindVertexArray(var$2);
    }
    function olo_GL11_glCallList($list) {
        var $d, $sb, $bl, $m, var$6;
        olo_GL11_$callClinit();
        if (!olo_GL11_compilingDisplayList) {
            $d = ju_HashMap_get(olo_GL11_initLists, jl_Integer_valueOf($list));
            if ($d !== null && $d.$length1 > 0) {
                $sb = $d.$currentBuffer;
                if ($sb !== null)
                    a: {
                        if ($d.$drawMode == 7) {
                            olo_GL11_glBindShaders($d.$mode | olo_GL11_glGetShaderMode1());
                            olo_GL11_glBindVertexArray0($d.$array0);
                            $sb = ju_AbstractList_iterator($d.$matrixMode);
                            while (true) {
                                if (!ju_AbstractList$1_hasNext($sb)) {
                                    olo_GL11_glDrawQuadArrays(0, $d.$length1);
                                    $list = olo_GL11_vertexDrawn;
                                    $bl = $d.$length1;
                                    olo_GL11_vertexDrawn = $list + (($bl * 6 | 0) / 4 | 0) | 0;
                                    olo_GL11_triangleDrawn = olo_GL11_triangleDrawn + ($bl / 2 | 0) | 0;
                                    break a;
                                }
                                $m = ju_AbstractList$1_next($sb);
                                $list = $m.$type0;
                                if ($list == 1) {
                                    oluv_Vector3f_set(olo_GL11_matrixVector, $m.$x1, $m.$y1, $m.$z1);
                                    oluv_Matrix4f_translate(olo_GL11_getMatrix(), olo_GL11_matrixVector);
                                } else if ($list == 2) {
                                    oluv_Vector3f_set(olo_GL11_matrixVector, $m.$x1, $m.$y1, $m.$z1);
                                    oluv_Matrix4f_rotate(olo_GL11_getMatrix(), $m.$angle * 0.01745329238474369, olo_GL11_matrixVector);
                                } else {
                                    if ($list != 3)
                                        break;
                                    oluv_Vector3f_set(olo_GL11_matrixVector, $m.$x1, $m.$y1, $m.$z1);
                                    oluv_Matrix4f_scale(olo_GL11_getMatrix(), olo_GL11_matrixVector);
                                }
                            }
                            $d = new jl_IllegalArgumentException;
                            jl_Throwable__init_($d, $rt_s(159));
                            $rt_throw($d);
                        }
                        $bl = olo_GL11_glArrayByteLength($sb);
                        olo_GL11_bytesUploaded = olo_GL11_bytesUploaded + $bl | 0;
                        olo_GL11_vertexDrawn = olo_GL11_vertexDrawn + $d.$count0 | 0;
                        olo_GL11_glBindShaders(0 | (!olo_GL11_colorArray ? 0 : 1) | (!olo_GL11_normalArray ? 0 : 2) | (!olo_GL11_textureArray ? 0 : 4) | (olo_GL11_colorMaterial && olo_GL11_lighting ? 8 : 0) | (!olo_GL11_fogEnabled ? 0 : 16) | (!olo_GL11_alpha ? 0 : 32) | (!olo_GL11_texture2D ? 0 : 64));
                        $sb = m_StreamBuffer_getBuffer(olo_GL11_shaderWebGL.$streamBuffer, $bl);
                        olo_GL11_glBindVertexArray0($sb.$vertexArray);
                        olo_GL11_glBindBuffer(34962, $sb.$vertexBuffer);
                        $sb = olo_GL11_shaderWebGL;
                        if (!$sb.$bufferIsInitialized) {
                            $sb.$bufferIsInitialized = 1;
                            olo_GL11_glBufferData(34962, olo_GL11_blankUploadArray, 35048);
                        }
                        $sb = $d.$currentBuffer;
                        $m = olo_GL11_webgl;
                        $sb = otji_JSWrapper_unwrap($sb);
                        $m.bufferSubData(34962, 0, $sb);
                        $sb = ju_AbstractList_iterator($d.$matrixMode);
                        while (true) {
                            if (!ju_AbstractList$1_hasNext($sb)) {
                                b: {
                                    c: {
                                        switch ($d.$drawMode) {
                                            case 1:
                                                break;
                                            case 2:
                                            case 4:
                                                break c;
                                            case 3:
                                                $list = 3;
                                                olo_GL11_triangleDrawn = olo_GL11_triangleDrawn + ($d.$count0 - 1 | 0) | 0;
                                                break b;
                                            case 5:
                                                $list = 5;
                                                olo_GL11_triangleDrawn = olo_GL11_triangleDrawn + ($d.$count0 - 2 | 0) | 0;
                                                break b;
                                            case 6:
                                                $list = 6;
                                                olo_GL11_triangleDrawn = olo_GL11_triangleDrawn + ($d.$count0 - 2 | 0) | 0;
                                                break b;
                                            default:
                                                break c;
                                        }
                                        $list = 1;
                                        olo_GL11_triangleDrawn = olo_GL11_triangleDrawn + ($d.$count0 / 2 | 0) | 0;
                                        break b;
                                    }
                                    $list = 4;
                                    olo_GL11_triangleDrawn = olo_GL11_triangleDrawn + ($d.$count0 / 3 | 0) | 0;
                                }
                                $sb = olo_GL11_webgl;
                                $bl = $d.$first;
                                var$6 = $d.$count0;
                                $sb.drawArrays($list, $bl, var$6);
                                break a;
                            }
                            $m = ju_AbstractList$1_next($sb);
                            $list = $m.$type0;
                            if ($list == 1) {
                                oluv_Vector3f_set(olo_GL11_matrixVector, $m.$x1, $m.$y1, $m.$z1);
                                oluv_Matrix4f_translate(olo_GL11_getMatrix(), olo_GL11_matrixVector);
                            } else if ($list == 2) {
                                oluv_Vector3f_set(olo_GL11_matrixVector, $m.$x1, $m.$y1, $m.$z1);
                                oluv_Matrix4f_rotate(olo_GL11_getMatrix(), $m.$angle * 0.01745329238474369, olo_GL11_matrixVector);
                            } else {
                                if ($list != 3)
                                    break;
                                oluv_Vector3f_set(olo_GL11_matrixVector, $m.$x1, $m.$y1, $m.$z1);
                                oluv_Matrix4f_scale(olo_GL11_getMatrix(), olo_GL11_matrixVector);
                            }
                        }
                        $d = new jl_IllegalArgumentException;
                        jl_Throwable__init_($d, $rt_s(159));
                        $rt_throw($d);
                    }
            }
        }
    }
    function olo_GL11_glBindTexture($target, $texture) {
        var $t, var$4;
        olo_GL11_$callClinit();
        $t = ju_HashMap_get(olo_GL11_textures, jl_Integer_valueOf($texture));
        if ($t !== null) {
            var$4 = olo_GL11_webgl;
            $t = $t.$obj0;
            var$4.bindTexture(3553, $t);
            return;
        }
        $t = olo_GL11_webgl;
        var$4 = null;
        $t.bindTexture(3553, var$4);
    }
    function olo_GL11_glEnableClientState($cap) {
        olo_GL11_$callClinit();
        a: {
            switch ($cap) {
                case 32885:
                    break;
                case 32886:
                    olo_GL11_colorArray = 1;
                    break a;
                case 32887:
                    break a;
                case 32888:
                    olo_GL11_textureArray = 1;
                    break a;
                default:
                    break a;
            }
            olo_GL11_normalArray = 1;
        }
    }
    function olo_GL11_glDisableClientState($cap) {
        olo_GL11_$callClinit();
        a: {
            switch ($cap) {
                case 32885:
                    break;
                case 32886:
                    olo_GL11_colorArray = 0;
                    break a;
                case 32887:
                    break a;
                case 32888:
                    olo_GL11_textureArray = 0;
                    break a;
                default:
                    break a;
            }
            olo_GL11_normalArray = 0;
        }
    }
    function olo_GL11_glEnable($cap) {
        olo_GL11_$callClinit();
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            switch ($cap) {
                                case 2884:
                                    break e;
                                case 2896:
                                    olo_GL11_lighting = 1;
                                    break a;
                                case 2903:
                                    olo_GL11_colorMaterial = 1;
                                    break a;
                                case 2912:
                                    olo_GL11_fogEnabled = 1;
                                    break a;
                                case 2929:
                                    olo_GL11_webgl.enable(2929);
                                    break e;
                                case 3008:
                                    olo_GL11_alpha = 1;
                                    break a;
                                case 3042:
                                    break d;
                                case 3089:
                                    break b;
                                case 3553:
                                    olo_GL11_texture2D = 1;
                                    break a;
                                case 32823:
                                    break c;
                                case 32826:
                                    break;
                                default:
                                    break a;
                            }
                            break a;
                        }
                        olo_GL11_webgl.enable(2884);
                    }
                    olo_GL11_webgl.enable(3042);
                }
                olo_GL11_webgl.enable(32823);
            }
            olo_GL11_webgl.enable(3089);
        }
    }
    function olo_GL11_glDisable($cap) {
        olo_GL11_$callClinit();
        a: {
            b: {
                c: {
                    d: {
                        e: {
                            switch ($cap) {
                                case 2884:
                                    break e;
                                case 2896:
                                    olo_GL11_lighting = 0;
                                    break a;
                                case 2903:
                                    olo_GL11_colorMaterial = 0;
                                    break a;
                                case 2912:
                                    olo_GL11_fogEnabled = 0;
                                    break a;
                                case 2929:
                                    olo_GL11_webgl.disable(2929);
                                    break e;
                                case 3008:
                                    olo_GL11_alpha = 0;
                                    break a;
                                case 3042:
                                    break d;
                                case 3089:
                                    break b;
                                case 3553:
                                    olo_GL11_texture2D = 0;
                                    break a;
                                case 32823:
                                    break c;
                                case 32826:
                                    break;
                                default:
                                    break a;
                            }
                            break a;
                        }
                        olo_GL11_webgl.disable(2884);
                    }
                    olo_GL11_webgl.disable(3042);
                }
                olo_GL11_webgl.disable(32823);
            }
            olo_GL11_webgl.disable(3089);
        }
    }
    function olo_GL11_glTexParameteri($target, $pname, $param) {
        olo_GL11_$callClinit();
        if (!($param != 33071 && $param != 10496))
            $param = 33071;
        olo_GL11_webgl.texParameteri($target, $pname, $param);
    }
    function olo_GL11_glMatrixMode($mode) {
        olo_GL11_$callClinit();
        olo_GL11_matrixMode = $mode;
    }
    function olo_GL11_getMatrix() {
        olo_GL11_$callClinit();
        switch (olo_GL11_matrixMode) {
            case 5888:
                break;
            case 5889:
                return olo_GL11_matProjV.data[olo_GL11_matProjPointer];
            case 5890:
                return olo_GL11_matTexV.data[olo_GL11_matTexPointer];
            default:
        }
        return olo_GL11_matModelV.data[olo_GL11_matModelPointer];
    }
    function olo_GL11_glLoadIdentity() {
        olo_GL11_$callClinit();
        oluv_Matrix4f_setIdentity(olo_GL11_getMatrix());
    }
    function olo_GL11_glTranslatef($x, $y, $z) {
        olo_GL11_$callClinit();
        oluv_Vector3f_set(olo_GL11_matrixVector, $x, $y, $z);
        oluv_Matrix4f_translate(olo_GL11_getMatrix(), olo_GL11_matrixVector);
        if (olo_GL11_compilingDisplayList)
            ju_ArrayList_add(olo_GL11_currentList.$matrixMode, olo_GL11$MatrixMode__init_(1, $x, $y, $z));
    }
    function olo_GL11_glRotatef($angle, $x, $y, $z) {
        var var$5, var$6;
        olo_GL11_$callClinit();
        oluv_Vector3f_set(olo_GL11_matrixVector, $x, $y, $z);
        oluv_Matrix4f_rotate(olo_GL11_getMatrix(), $angle * 0.01745329238474369, olo_GL11_matrixVector);
        if (olo_GL11_compilingDisplayList) {
            var$5 = olo_GL11_currentList.$matrixMode;
            var$6 = new olo_GL11$MatrixMode;
            var$6.$type0 = (-1);
            var$6.$type0 = 2;
            var$6.$x1 = $x;
            var$6.$y1 = $y;
            var$6.$z1 = $z;
            var$6.$angle = $angle;
            ju_ArrayList_add(var$5, var$6);
        }
    }
    function olo_GL11_glGetFloat($pname, $param) {
        olo_GL11_$callClinit();
        a: {
            switch ($pname) {
                case 2982:
                    break;
                case 2983:
                    oluv_Matrix4f_store(olo_GL11_matProjV.data[olo_GL11_matProjPointer], $param);
                    break a;
                default:
            }
            oluv_Matrix4f_store(olo_GL11_matModelV.data[olo_GL11_matModelPointer], $param);
        }
    }
    function olo_GL11_glTexImage2D($target, $level, $internalformat, $width, $height, $border, $format, $type, $pixels) {
        var var$10, $bufferLength, $array, $i, $bufferData, var$15;
        olo_GL11_$callClinit();
        if ($pixels === null) {
            var$10 = olo_GL11_webgl;
            $pixels = null;
            var$10.texImage2D(3553, $level, 32856, $width, $height, $border, 6408, 5121, $pixels);
            return;
        }
        a: {
            olo_GL11_bytesUploaded = olo_GL11_bytesUploaded + (jn_Buffer_remaining($pixels) * 4 | 0) | 0;
            if (!($pixels instanceof jn_ByteBuffer)) {
                if (!($pixels instanceof jn_IntBuffer))
                    ji_PrintStream_println(jl_System_err(), $rt_s(160));
                else {
                    $bufferLength = jn_Buffer_remaining($pixels);
                    $array = new $rt_globals.Int32Array(olo_GL11_bufferUpload.buffer);
                    $i = 0;
                    $bufferData = $pixels;
                    while ($i < $bufferLength) {
                        $target = $bufferData.$get();
                        $i;
                        $array[$i] = $target;
                        $i = $i + 1 | 0;
                    }
                    $pixels = olo_GL11_bufferUpload.buffer;
                    $target = $bufferLength * 4 | 0;
                    $bufferData = new $rt_globals.Uint8Array($pixels, 0, $target);
                    olo_GL11_webgl.texImage2D(3553, $level, 32856, $width, $height, $border, 6408, 5121, $bufferData);
                }
            } else {
                $bufferLength = jn_Buffer_remaining($pixels);
                $array = olo_GL11_bufferUpload;
                $i = 0;
                while (true) {
                    if ($i >= $bufferLength) {
                        $bufferData = new $rt_globals.Uint8Array(olo_GL11_bufferUpload.buffer, 0, $bufferLength);
                        olo_GL11_webgl.texImage2D(3553, $level, 32856, $width, $height, $border, 6408, 5121, $bufferData);
                        break a;
                    }
                    $internalformat = $pixels.$position;
                    if ($internalformat >= $pixels.$limit0)
                        break;
                    var$15 = $pixels.$array.data;
                    $format = $pixels.$start;
                    $pixels.$position = $internalformat + 1 | 0;
                    $target = (var$15[$format + $internalformat | 0] & 255) << 16 >> 16;
                    $i;
                    $array[$i] = $target;
                    $i = $i + 1 | 0;
                }
                $pixels = new jn_BufferUnderflowException;
                jl_Exception__init_($pixels);
                $rt_throw($pixels);
            }
        }
    }
    function olo_GL11_glBufferData($p1, $p2, $p3) {
        var var$4;
        olo_GL11_$callClinit();
        var$4 = olo_GL11_webgl;
        $p2 = otji_JSWrapper_unwrap($p2);
        var$4.bufferData($p1, $p2, $p3);
    }
    function olo_GL11_glGetShaderMode1() {
        olo_GL11_$callClinit();
        return 0 | (olo_GL11_colorMaterial && olo_GL11_lighting ? 8 : 0) | (!olo_GL11_fogEnabled ? 0 : 16) | (!olo_GL11_alpha ? 0 : 32) | (!olo_GL11_texture2D ? 0 : 64);
    }
    function olo_GL11_glBindShaders($i) {
        var $s, var$3, var$4, var$5, var$6, var$7, var$8;
        olo_GL11_$callClinit();
        $s = m_WebGLShader_instance($i);
        olo_GL11_shaderWebGL = $s;
        olo_GL11_glUseProgram($s.$globject);
        if (olo_GL11_alpha) {
            var$3 = olo_GL11_alphaValue;
            if ($s.$alphaTestValue !== var$3) {
                $s.$alphaTestValue = var$3;
                olo_GL11_glUniform1f($s.$u_alphaTestF, var$3);
            }
        }
        var$4 = olo_GL11_colorR;
        var$3 = olo_GL11_colorG;
        var$5 = olo_GL11_colorB;
        var$6 = olo_GL11_colorA;
        if (!($s.$colorUniformR === var$4 && $s.$colorUniformG === var$3 && $s.$colorUniformB === var$5 && $s.$colorUniformA === var$6)) {
            $s.$colorUniformR = var$4;
            $s.$colorUniformG = var$3;
            $s.$colorUniformB = var$5;
            $s.$colorUniformA = var$6;
            olo_GL11_glUniform4f($s.$u_colorUniform, var$4, var$3, var$5, var$6);
        }
        if (olo_GL11_fogEnabled) {
            $i = (!olo_GL11_fogPremultiply ? 0 : 2) + olo_GL11_fogMode | 0;
            if ($s.$fogMode != $i) {
                $s.$fogMode = $i;
                olo_GL11_glUniform1i($s.$u_fogMode, $i % 2 | 0);
                olo_GL11_glUniform1f($s.$u_fogPremultiply, $i / 2 | 0);
            }
            var$3 = olo_GL11_fogColorR;
            var$5 = olo_GL11_fogColorG;
            var$6 = olo_GL11_fogColorB;
            var$4 = olo_GL11_fogColorA;
            if (!($s.$fogColorR === var$3 && $s.$fogColorG === var$5 && $s.$fogColorB === var$6 && $s.$fogColorA === var$4)) {
                $s.$fogColorR = var$3;
                $s.$fogColorG = var$5;
                $s.$fogColorB = var$6;
                $s.$fogColorA = var$4;
                olo_GL11_glUniform4f($s.$u_fogColor, var$3, var$5, var$6, var$4);
            }
            var$3 = olo_GL11_fogDensity;
            if ($s.$fogDensity !== var$3) {
                $s.$fogDensity = var$3;
                olo_GL11_glUniform1f($s.$u_fogDensity, var$3);
            }
            var$3 = olo_GL11_fogStart;
            var$5 = olo_GL11_fogEnd;
            if (!($s.$fogStart === var$3 && $s.$fogEnd === var$5)) {
                $s.$fogStart = var$3;
                $s.$fogEnd = var$5;
                olo_GL11_glUniform1f($s.$u_fogStart, var$3);
                olo_GL11_glUniform1f($s.$u_fogEnd, $s.$fogEnd);
            }
        }
        var$7 = olo_GL11_matModelV.data[olo_GL11_matModelPointer];
        if (!jl_Object_equals(var$7, $s.$modelMatrix)) {
            oluv_Matrix4f_store0(oluv_Matrix4f_load($s.$modelMatrix, var$7), $s.$modelBuffer);
            olo_GL11_glUniformMat4fv($s.$u_matrix_m, $s.$modelBuffer);
        }
        var$7 = olo_GL11_matProjV.data[olo_GL11_matProjPointer];
        if (!jl_Object_equals(var$7, $s.$projectionMatrix)) {
            oluv_Matrix4f_store0(oluv_Matrix4f_load($s.$projectionMatrix, var$7), $s.$projectionBuffer);
            olo_GL11_glUniformMat4fv($s.$u_matrix_p, $s.$projectionBuffer);
        }
        var$7 = olo_GL11_matTexV.data[olo_GL11_matTexPointer];
        if (!jl_Object_equals(var$7, $s.$textureMatrix)) {
            oluv_Matrix4f_store0(oluv_Matrix4f_load($s.$textureMatrix, var$7), $s.$textureBuffer);
            olo_GL11_glUniformMat4fv($s.$u_matrix_t, $s.$textureBuffer);
        }
        if (olo_GL11_colorMaterial && olo_GL11_lighting) {
            var$3 = olo_GL11_normalX;
            var$5 = olo_GL11_normalY;
            var$6 = olo_GL11_normalZ;
            if (!($s.$normalUniformX === var$3 && $s.$normalUniformY === var$5 && $s.$normalUniformZ === var$6)) {
                $s.$normalUniformX = var$3;
                $s.$normalUniformY = var$5;
                $s.$normalUniformZ = var$6;
                olo_GL11_glUniform3f($s.$u_normalUniform, var$3, var$5, var$6);
            }
            var$7 = olo_GL11_lightPos0vec;
            var$8 = olo_GL11_lightPos1vec;
            if (!(oluv_Vector4f_equals(var$7, $s.$light0Pos) && oluv_Vector4f_equals(var$8, $s.$light1Pos))) {
                oluv_Vector4f_set($s.$light0Pos, var$7);
                oluv_Vector4f_set($s.$light1Pos, var$8);
                var$7 = $s.$u_light0Pos;
                var$8 = $s.$light0Pos;
                olo_GL11_glUniform3f(var$7, var$8.$x2, var$8.$y2, var$8.$z2);
                var$7 = $s.$u_light1Pos;
                var$8 = $s.$light1Pos;
                olo_GL11_glUniform3f(var$7, var$8.$x2, var$8.$y2, var$8.$z2);
            }
        }
        var$3 = olo_GL11_tex0X;
        var$5 = olo_GL11_tex0Y;
        if (!($s.$tex0x === var$3 && $s.$tex0y === var$5)) {
            $s.$tex0x = var$3;
            $s.$tex0y = var$5;
            $s = $s.$u_texCoordV0;
            if ($s !== null) {
                var$7 = olo_GL11_webgl;
                $s = $s.$obj2;
                var$7.uniform2f($s, var$3, var$5);
            }
        }
    }
    function olo_GL11_glCreateShader($p1) {
        var var$2;
        olo_GL11_$callClinit();
        var$2 = new m_ShaderGL;
        var$2.$obj3 = olo_GL11_webgl.createShader($p1);
        return var$2;
    }
    function olo_GL11_glCreateProgram() {
        var var$1, var$2;
        olo_GL11_$callClinit();
        var$1 = new m_ProgramGL;
        var$1.$obj4 = olo_GL11_webgl.createProgram();
        var$2 = m_ProgramGL_progId + 1 | 0;
        m_ProgramGL_progId = var$2;
        var$1.$hashcode = var$2;
        return var$1;
    }
    function olo_GL11_glDetachShader($p1, $p2) {
        var var$3;
        olo_GL11_$callClinit();
        var$3 = olo_GL11_webgl;
        $p1 = $p1.$obj4;
        $p2 = $p2.$obj3;
        var$3.detachShader($p1, $p2);
    }
    function olo_GL11_glDeleteShader($p1) {
        var var$2;
        olo_GL11_$callClinit();
        var$2 = olo_GL11_webgl;
        $p1 = $p1.$obj3;
        var$2.deleteShader($p1);
    }
    function olo_GL11_glCompileShader($p1) {
        var var$2;
        olo_GL11_$callClinit();
        var$2 = olo_GL11_webgl;
        $p1 = $p1.$obj3;
        var$2.compileShader($p1);
    }
    function olo_GL11_glAttachShader($p1, $p2) {
        var var$3;
        olo_GL11_$callClinit();
        var$3 = olo_GL11_webgl;
        $p1 = $p1.$obj4;
        $p2 = $p2.$obj3;
        var$3.attachShader($p1, $p2);
    }
    function olo_GL11_glLinkProgram($p1) {
        var var$2;
        olo_GL11_$callClinit();
        var$2 = olo_GL11_webgl;
        $p1 = $p1.$obj4;
        var$2.linkProgram($p1);
    }
    function olo_GL11_glShaderSource($p1, $p2) {
        var var$3;
        olo_GL11_$callClinit();
        var$3 = olo_GL11_webgl;
        $p1 = $p1.$obj3;
        var$3.shaderSource($p1, $rt_ustr($p2));
    }
    function olo_GL11_glGetShaderHeader() {
        olo_GL11_$callClinit();
        return $rt_s(161);
    }
    function olo_GL11_glGetShaderInfoLog($p1) {
        var var$2;
        olo_GL11_$callClinit();
        var$2 = olo_GL11_webgl;
        $p1 = $p1.$obj3;
        return $rt_str(var$2.getShaderInfoLog($p1));
    }
    function olo_GL11_glGetProgramInfoLog($p1) {
        var var$2;
        olo_GL11_$callClinit();
        var$2 = olo_GL11_webgl;
        $p1 = $p1.$obj4;
        return $rt_str(var$2.getProgramInfoLog($p1));
    }
    function olo_GL11_glGetProgramLinked($p1) {
        var var$2;
        olo_GL11_$callClinit();
        var$2 = olo_GL11_webgl;
        $p1 = $p1.$obj4;
        return var$2.getProgramParameter($p1, 35714) != 1 ? 0 : 1;
    }
    function olo_GL11_glGetShaderCompiled($p1) {
        var var$2;
        olo_GL11_$callClinit();
        var$2 = olo_GL11_webgl;
        $p1 = $p1.$obj3;
        return var$2.getShaderParameter($p1, 35713) != 1 ? 0 : 1;
    }
    function olo_GL11_glBindAttributeLocation($p1, $p2, $p3) {
        var var$4;
        olo_GL11_$callClinit();
        var$4 = olo_GL11_webgl;
        $p1 = $p1.$obj4;
        var$4.bindAttribLocation($p1, $p2, $rt_ustr($p3));
    }
    function olo_GL11_glGetUniformLocation($p1, $p2) {
        var $u;
        olo_GL11_$callClinit();
        $u = olo_GL11_webgl;
        $p1 = $p1.$obj4;
        $u = $u.getUniformLocation($p1, $rt_ustr($p2));
        if ($u === null)
            $p1 = null;
        else {
            $p1 = new m_UniformGL;
            $p1.$obj2 = $u;
        }
        return $p1;
    }
    function olo_GL11_glUseProgram($p1) {
        var var$2, var$3, var$4;
        olo_GL11_$callClinit();
        if ($p1 !== null) {
            var$2 = olo_GL11_currentWebGLProgram;
            var$3 = $p1.$hashcode;
            if (var$2 != var$3) {
                olo_GL11_currentWebGLProgram = var$3;
                var$4 = olo_GL11_webgl;
                $p1 = $p1.$obj4;
                var$4.useProgram($p1);
            }
        }
    }
    function olo_GL11_glUniform1f($p1, $p2) {
        var var$3;
        olo_GL11_$callClinit();
        if ($p1 !== null) {
            var$3 = olo_GL11_webgl;
            $p1 = $p1.$obj2;
            var$3.uniform1f($p1, $p2);
        }
    }
    function olo_GL11_glUniform3f($p1, $p2, $p3, $p4) {
        var var$5;
        olo_GL11_$callClinit();
        if ($p1 !== null) {
            var$5 = olo_GL11_webgl;
            $p1 = $p1.$obj2;
            var$5.uniform3f($p1, $p2, $p3, $p4);
        }
    }
    function olo_GL11_glUniform4f($p1, $p2, $p3, $p4, $p5) {
        var var$6, var$7;
        olo_GL11_$callClinit();
        if ($p1 !== null) {
            var$6 = olo_GL11_webgl;
            var$7 = $p1.$obj2;
            var$6.uniform4f(var$7, $p2, $p3, $p4, $p5);
        }
    }
    function olo_GL11_glUniform1i($p1, $p2) {
        var var$3;
        olo_GL11_$callClinit();
        if ($p1 !== null) {
            var$3 = olo_GL11_webgl;
            $p1 = $p1.$obj2;
            var$3.uniform1i($p1, $p2);
        }
    }
    function olo_GL11_glUniformMat4fv($p1, $mat) {
        var var$3, var$4;
        olo_GL11_$callClinit();
        olo_GL11_mat4.set($mat.data);
        if ($p1 !== null) {
            var$3 = olo_GL11_webgl;
            var$4 = $p1.$obj2;
            $p1 = olo_GL11_mat4;
            var$3.uniformMatrix4fv(var$4, !!0, $p1);
        }
    }
    function olo_GL11_glEnableVertexAttribArray($p1) {
        olo_GL11_$callClinit();
        olo_GL11_webgl.enableVertexAttribArray($p1);
    }
    function olo_GL11_glVertexAttribPointer($p1, $p2, $p3, $p4, $p5, $p6) {
        olo_GL11_$callClinit();
        olo_GL11_webgl.vertexAttribPointer($p1, $p2, $p3, !!$p4, $p5, $p6);
    }
    function olo_GL11_glCreateVertexArray() {
        var var$1;
        olo_GL11_$callClinit();
        var$1 = new m_BufferArrayGL;
        var$1.$obj1 = olo_GL11_webgl.createVertexArray();
        var$1.$isQuadBufferBound = 0;
        return var$1;
    }
    function olo_GL11_glCreateBuffer() {
        var var$1;
        olo_GL11_$callClinit();
        var$1 = new m_BufferGL;
        var$1.$obj5 = olo_GL11_webgl.createBuffer();
        return var$1;
    }
    function olo_GL11_glBindBuffer($p1, $p2) {
        var var$3;
        olo_GL11_$callClinit();
        var$3 = olo_GL11_webgl;
        $p2 = $p2 !== null ? $p2.$obj5 : null;
        var$3.bindBuffer($p1, $p2);
    }
    function olo_GL11_glFogi($pname, $param) {
        olo_GL11_$callClinit();
        a: {
            if ($pname == 2917) {
                b: {
                    switch ($param) {
                        case 2048:
                            break;
                        case 9729:
                            break b;
                        default:
                            break b;
                    }
                    olo_GL11_fogMode = 2;
                    break a;
                }
                olo_GL11_fogMode = 1;
            }
        }
    }
    function olo_GL11_glFogf($pname, $param) {
        olo_GL11_$callClinit();
        a: {
            switch ($pname) {
                case 2914:
                    break;
                case 2915:
                    olo_GL11_fogStart = $param;
                    break a;
                case 2916:
                    olo_GL11_fogEnd = $param;
                    break a;
                default:
                    break a;
            }
            olo_GL11_fogDensity = $param;
        }
    }
    function olo_GL11_glFog($pname, $param) {
        olo_GL11_$callClinit();
        if ($pname == 2918) {
            olo_GL11_fogColorR = jn_FloatBufferImpl_get($param);
            olo_GL11_fogColorG = jn_FloatBufferImpl_get($param);
            olo_GL11_fogColorB = jn_FloatBufferImpl_get($param);
            olo_GL11_fogColorA = jn_FloatBufferImpl_get($param);
        }
    }
    function olo_GL11_glArrayByteLength($obj) {
        olo_GL11_$callClinit();
        return (otji_JSWrapper_unwrap($obj)).byteLength;
    }
    function olo_GL11_glGetInteger($pname, $param) {
        var var$3;
        olo_GL11_$callClinit();
        if ($pname == 2978) {
            var$3 = $param.data;
            $param = olo_GL11_viewportCache.data;
            var$3[0] = $param[0];
            var$3[1] = $param[1];
            var$3[2] = $param[2];
            var$3[3] = $param[3];
        }
    }
    function olo_GL11__clinit_() {
        var $i, var$2;
        olo_GL11_currentList = null;
        olo_GL11_displayListId = 0;
        olo_GL11_blankUploadArray = otji_JSWrapper_wrap(new $rt_globals.Int32Array(525000));
        olo_GL11_paramMatrix = oluv_Matrix4f__init_();
        olo_GL11_bufferUpload = new $rt_globals.Uint8Array(new $rt_globals.ArrayBuffer(4194304));
        olo_GL11_appendbufferindex = 0;
        olo_GL11_appendbuffer = new $rt_globals.Int32Array(new $rt_globals.ArrayBuffer(2100000));
        olo_GL11_webgl = m_WebGL_webgl;
        olo_GL11_alphaValue = 0.10000000149011612;
        olo_GL11_alpha = 0;
        olo_GL11_currentWebGLProgram = (-1);
        olo_GL11_mat2 = new $rt_globals.Float32Array(4);
        olo_GL11_mat3 = new $rt_globals.Float32Array(9);
        olo_GL11_mat4 = new $rt_globals.Float32Array(16);
        olo_GL11_textures = ju_HashMap__init_(256);
        olo_GL11_textureIndex = 0;
        olo_GL11_textureArray = 0;
        olo_GL11_colorArray = 0;
        olo_GL11_normalArray = 0;
        olo_GL11_compilingDisplayList = 0;
        olo_GL11_currentList = null;
        olo_GL11_lists = ju_HashMap__init_0();
        olo_GL11_initLists = ju_HashMap__init_0();
        olo_GL11_quadsToTrianglesBuffer = null;
        olo_GL11_currentArray = null;
        olo_GL11_bytesUploaded = 0;
        olo_GL11_vertexDrawn = 0;
        olo_GL11_triangleDrawn = 0;
        olo_GL11_fogColorR = 1.0;
        olo_GL11_fogColorG = 1.0;
        olo_GL11_fogColorB = 1.0;
        olo_GL11_fogColorA = 1.0;
        olo_GL11_fogMode = 1;
        olo_GL11_fogEnabled = 0;
        olo_GL11_fogPremultiply = 0;
        olo_GL11_fogStart = 1.0;
        olo_GL11_fogEnd = 1.0;
        olo_GL11_fogDensity = 1.0;
        olo_GL11_texture2D = 0;
        olo_GL11_lighting = 0;
        olo_GL11_colorMaterial = 0;
        olo_GL11_normalX = 1.0;
        olo_GL11_normalY = 0.0;
        olo_GL11_normalZ = 0.0;
        olo_GL11_tex0X = 0.0;
        olo_GL11_tex0Y = 0.0;
        olo_GL11_colorR = 1.0;
        olo_GL11_colorG = 1.0;
        olo_GL11_colorB = 1.0;
        olo_GL11_colorA = 1.0;
        olo_GL11_matrixMode = 5888;
        olo_GL11_matModelV = $rt_createArray(oluv_Matrix4f, 32);
        olo_GL11_matModelPointer = 0;
        olo_GL11_matProjV = $rt_createArray(oluv_Matrix4f, 6);
        olo_GL11_matProjPointer = 0;
        olo_GL11_matTexV = $rt_createArray(oluv_Matrix4f, 16);
        olo_GL11_matTexPointer = 0;
        $i = 0;
        while (true) {
            var$2 = olo_GL11_matModelV.data;
            if ($i >= var$2.length)
                break;
            var$2[$i] = oluv_Matrix4f__init_();
            $i = $i + 1 | 0;
        }
        $i = 0;
        while (true) {
            var$2 = olo_GL11_matProjV.data;
            if ($i >= var$2.length)
                break;
            var$2[$i] = oluv_Matrix4f__init_();
            $i = $i + 1 | 0;
        }
        $i = 0;
        while (true) {
            var$2 = olo_GL11_matTexV.data;
            if ($i >= var$2.length)
                break;
            var$2[$i] = oluv_Matrix4f__init_();
            $i = $i + 1 | 0;
        }
        olo_GL11_matrixVector = new oluv_Vector3f;
        olo_GL11_lightPos1vec = new oluv_Vector4f;
        olo_GL11_lightPos0vec = new oluv_Vector4f;
        olo_GL11_lightPos0vec0 = new oluv_Vector4f;
        olo_GL11_lightPos1vec0 = new oluv_Vector4f;
        olo_GL11_vertexBuffer = olo_GL11_webgl.createBuffer();
        olo_GL11_texCoordBuffer = olo_GL11_webgl.createBuffer();
        olo_GL11_viewportCache = $rt_createIntArray(4);
        olo_GL11_materialAmbientR = 0.30000001192092896;
        olo_GL11_materialAmbientG = 0.30000001192092896;
        olo_GL11_materialAmbientB = 0.30000001192092896;
        olo_GL11_materialAmbientA = 1.0;
        olo_GL11_materialDiffuseR = 0.800000011920929;
        olo_GL11_materialDiffuseG = 0.5;
        olo_GL11_materialDiffuseB = 0.30000001192092896;
        olo_GL11_materialDiffuseA = 1.0;
        olo_GL11_materialSpecularR = 0.4000000059604645;
        olo_GL11_materialSpecularG = 0.4000000059604645;
        olo_GL11_materialSpecularB = 0.4000000059604645;
        olo_GL11_materialSpecularA = 1.0;
        olo_GL11_materialEmissionR = 0.0;
        olo_GL11_materialEmissionG = 0.0;
        olo_GL11_materialEmissionB = 0.0;
        olo_GL11_materialEmissionA = 1.0;
        olo_GL11_materialBackAmbientR = 0.20000000298023224;
        olo_GL11_materialBackAmbientG = 0.20000000298023224;
        olo_GL11_materialBackAmbientB = 0.4000000059604645;
        olo_GL11_materialBackAmbientA = 1.0;
        olo_GL11_materialBackDiffuseR = 0.6000000238418579;
        olo_GL11_materialBackDiffuseG = 0.30000001192092896;
        olo_GL11_materialBackDiffuseB = 0.5;
        olo_GL11_materialBackDiffuseA = 1.0;
        olo_GL11_materialBackSpecularR = 0.20000000298023224;
        olo_GL11_materialBackSpecularG = 0.20000000298023224;
        olo_GL11_materialBackSpecularB = 0.20000000298023224;
        olo_GL11_materialBackSpecularA = 1.0;
        olo_GL11_materialBackEmissionR = 0.0;
        olo_GL11_materialBackEmissionG = 0.0;
        olo_GL11_materialBackEmissionB = 0.20000000298023224;
        olo_GL11_materialBackEmissionA = 1.0;
        olo_GL11_shaderWebGL = null;
    }
    var olo_DisplayMode = $rt_classWithoutFields();
    var otjde_EventListener = $rt_classWithoutFields(0);
    var olo_Display$1 = $rt_classWithoutFields();
    function olo_Display$1_handleEvent$exported$0(var$0, var$1) {
        olo_Display_$callClinit();
        olo_Display_windowResized = 1;
    }
    var olo_Display$2 = $rt_classWithoutFields();
    function olo_Display$2_handleEvent$exported$0(var$0, var$1) {
        olo_Display_$callClinit();
        olo_Display_isWindowActive = 0;
    }
    var olo_Display$3 = $rt_classWithoutFields();
    function olo_Display$3_handleEvent$exported$0(var$0, var$1) {
        olo_Display_$callClinit();
        olo_Display_isWindowActive = 1;
    }
    var m_WebGL = $rt_classWithoutFields();
    var m_WebGL_document = null;
    var m_WebGL_parent = null;
    var m_WebGL_canvas = null;
    var m_WebGL_webgl = null;
    var m_WebGL_backBuffer = null;
    var m_WebGL_backBufferColor = null;
    var m_WebGL_backBufferDepth = null;
    var m_WebGL_window = null;
    var m_WebGL_width = 0;
    var m_WebGL_height = 0;
    var m_WebGL_backBufferWidth = 0;
    var m_WebGL_backBufferHeight = 0;
    function m_WebGL_bindRenderbuffer($p1) {
        var var$2;
        var$2 = m_WebGL_webgl;
        $p1 = $p1 !== null ? $p1.$obj6 : null;
        var$2.bindRenderbuffer(36161, $p1);
    }
    function m_WebGL_renderbufferStorage($p1, $p2, $p3) {
        m_WebGL_webgl.renderbufferStorage(36161, $p1, $p2, $p3);
    }
    function m_WebGL__clinit_() {
        m_WebGL_document = null;
        m_WebGL_parent = null;
        m_WebGL_canvas = null;
        m_WebGL_webgl = null;
        m_WebGL_backBuffer = null;
        m_WebGL_backBufferColor = null;
        m_WebGL_backBufferDepth = null;
        m_WebGL_window = null;
        m_WebGL_width = 0;
        m_WebGL_height = 0;
        m_WebGL_backBufferWidth = (-1);
        m_WebGL_backBufferHeight = (-1);
    }
    function cmr_Player() {
        var a = this; jl_Object.call(a);
        a.$level0 = null;
        a.$x = 0.0;
        a.$y = 0.0;
        a.$z = 0.0;
        a.$prevX = 0.0;
        a.$prevY = 0.0;
        a.$prevZ = 0.0;
        a.$motionX = 0.0;
        a.$motionY = 0.0;
        a.$motionZ = 0.0;
        a.$xRotation = 0.0;
        a.$yRotation = 0.0;
        a.$onGround = 0;
        a.$boundingBox0 = null;
    }
    function cmr_Player_resetPosition($this) {
        var $x, var$2, $y, $z;
        $x = jl_Math_random();
        var$2 = $this.$level0;
        $x = $x * var$2.$width0;
        $y = var$2.$depth + 3 | 0;
        $z = jl_Math_random() * $this.$level0.$height0;
        $this.$x = $x;
        $this.$y = $y;
        $this.$z = $z;
        $this.$boundingBox0 = cmrp_AABB__init_($x - 0.30000001192092896, $y - 0.8999999761581421, $z - 0.30000001192092896, $x + 0.30000001192092896, $y + 0.8999999761581421, $z + 0.30000001192092896);
    }
    function cmr_Player_tick($this) {
        var $forward, $vertical, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, var$20;
        $this.$prevX = $this.$x;
        $this.$prevY = $this.$y;
        $this.$prevZ = $this.$z;
        $forward = 0.0;
        $vertical = 0.0;
        if (oli_Keyboard_isKeyDown(19))
            cmr_Player_resetPosition($this);
        if (!(!oli_Keyboard_isKeyDown(200) && !oli_Keyboard_isKeyDown(17)))
            $forward = (-1.0);
        if (!(!oli_Keyboard_isKeyDown(208) && !oli_Keyboard_isKeyDown(31)))
            $forward = $forward + 1.0;
        if (!(!oli_Keyboard_isKeyDown(203) && !oli_Keyboard_isKeyDown(30)))
            $vertical = (-1.0);
        if (!(!oli_Keyboard_isKeyDown(205) && !oli_Keyboard_isKeyDown(32)))
            $vertical = $vertical + 1.0;
        if (!(!oli_Keyboard_isKeyDown(57) && !oli_Keyboard_isKeyDown(219)) && $this.$onGround)
            $this.$motionY = 0.11999999731779099;
        var$3 = !$this.$onGround ? 0.004999999888241291 : 0.019999999552965164;
        var$4 = $vertical * $vertical + $forward * $forward;
        if (var$4 >= 0.009999999776482582) {
            var$3 = var$3 / jl_Math_sqrt(var$4);
            $vertical = $vertical * var$3;
            $forward = $forward * var$3;
            var$5 = jl_Math_sin(jl_Math_toRadians($this.$yRotation));
            var$6 = jl_Math_cos(jl_Math_toRadians($this.$yRotation));
            var$7 = $this.$motionX;
            var$8 = $vertical;
            var$9 = var$8 * var$6;
            var$10 = $forward;
            $this.$motionX = var$7 + var$9 - var$10 * var$5;
            $this.$motionZ = $this.$motionZ + var$10 * var$6 + var$8 * var$5;
        }
        var$5 = $this.$motionY - 0.005;
        $this.$motionY = var$5;
        var$6 = $this.$motionX;
        var$7 = $this.$motionZ;
        var$11 = $this.$level0;
        var$12 = $this.$boundingBox0;
        var$9 = var$12.$minX0;
        var$10 = var$12.$minY0;
        var$13 = var$12.$minZ0;
        var$14 = var$12.$maxX0;
        var$15 = var$12.$maxY0;
        var$16 = var$12.$maxZ0;
        if (var$6 >= 0.0)
            var$14 = var$14 + var$6;
        else
            var$9 = var$9 + var$6;
        var$17 = $rt_compare(var$5, 0.0);
        if (var$17 >= 0)
            var$15 = var$15 + var$5;
        else
            var$10 = var$10 + var$5;
        if (var$7 >= 0.0)
            var$16 = var$16 + var$7;
        else
            var$13 = var$13 + var$7;
        var$18 = cmrl_Level_getCubes(var$11, cmrp_AABB__init_(var$9, var$10, var$13, var$14, var$15, var$16));
        var$19 = ju_AbstractList_iterator(var$18);
        var$14 = var$5;
        while (ju_AbstractList$1_hasNext(var$19)) {
            var$14 = cmrp_AABB_clipYCollide(ju_AbstractList$1_next(var$19), $this.$boundingBox0, var$14);
        }
        cmrp_AABB_move($this.$boundingBox0, 0.0, var$14, 0.0);
        var$19 = ju_AbstractList_iterator(var$18);
        var$8 = var$6;
        while (ju_AbstractList$1_hasNext(var$19)) {
            var$8 = cmrp_AABB_clipXCollide(ju_AbstractList$1_next(var$19), $this.$boundingBox0, var$8);
        }
        cmrp_AABB_move($this.$boundingBox0, var$8, 0.0, 0.0);
        var$12 = ju_AbstractList_iterator(var$18);
        var$9 = var$7;
        while (ju_AbstractList$1_hasNext(var$12)) {
            var$9 = cmrp_AABB_clipZCollide(ju_AbstractList$1_next(var$12), $this.$boundingBox0, var$9);
        }
        cmrp_AABB_move($this.$boundingBox0, 0.0, 0.0, var$9);
        var$20 = $rt_compare(var$5, var$14);
        var$17 = var$20 && var$17 < 0 ? 1 : 0;
        $this.$onGround = var$17;
        if (var$6 !== var$8)
            $this.$motionX = 0.0;
        if (var$20)
            $this.$motionY = 0.0;
        if (var$7 !== var$9)
            $this.$motionZ = 0.0;
        var$12 = $this.$boundingBox0;
        $this.$x = (var$12.$minX0 + var$12.$maxX0) / 2.0;
        $this.$y = var$12.$minY0 + 1.62;
        $this.$z = (var$12.$minZ0 + var$12.$maxZ0) / 2.0;
        var$5 = $this.$motionX * 0.9100000262260437;
        $this.$motionX = var$5;
        $this.$motionY = $this.$motionY * 0.9800000190734863;
        var$6 = $this.$motionZ * 0.9100000262260437;
        $this.$motionZ = var$6;
        if (var$17) {
            $this.$motionX = var$5 * 0.800000011920929;
            $this.$motionZ = var$6 * 0.800000011920929;
        }
    }
    var ju_Objects = $rt_classWithoutFields();
    function ju_Objects_requireNonNull($obj) {
        if ($obj !== null)
            return $obj;
        $obj = new jl_NullPointerException;
        jl_Throwable__init_($obj, $rt_s(104));
        $rt_throw($obj);
    }
    function otji_JSWrapper() {
        jl_Object.call(this);
        this.$js = null;
    }
    var otji_JSWrapper_hashCodes = null;
    var otji_JSWrapper_wrappers = null;
    var otji_JSWrapper_stringWrappers = null;
    var otji_JSWrapper_numberWrappers = null;
    var otji_JSWrapper_undefinedWrapper = null;
    var otji_JSWrapper_stringFinalizationRegistry = null;
    var otji_JSWrapper_numberFinalizationRegistry = null;
    function otji_JSWrapper_$callClinit() {
        otji_JSWrapper_$callClinit = $rt_eraseClinit(otji_JSWrapper);
        otji_JSWrapper__clinit_();
    }
    function otji_JSWrapper__init_(var_0) {
        var var_1 = new otji_JSWrapper();
        otji_JSWrapper__init_0(var_1, var_0);
        return var_1;
    }
    function otji_JSWrapper__init_0($this, $js) {
        otji_JSWrapper_$callClinit();
        $this.$js = $js;
    }
    function otji_JSWrapper_wrap($o) {
        var $jsNumber, $type, $isObject, $existingRef, $existing, $wrapper, $wrapperAsJs;
        otji_JSWrapper_$callClinit();
        if ($o === null)
            return null;
        $jsNumber = $o;
        $type = $rt_str(typeof $jsNumber);
        $isObject = !jl_String_equals($type, $rt_s(162)) && !jl_String_equals($type, $rt_s(163)) ? 0 : 1;
        if ($isObject && $o[$rt_jso_marker] === true)
            return $o;
        $o = otji_JSWrapper_wrappers;
        if ($o !== null) {
            if ($isObject) {
                $existingRef = $o.get($jsNumber);
                $existing = (typeof $existingRef === 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
                if (!(typeof $existing === 'undefined' ? 1 : 0))
                    return $existing;
                $wrapper = otji_JSWrapper__init_($jsNumber);
                otji_JSWrapper_wrappers.set($jsNumber, new $rt_globals.WeakRef($wrapper));
                return $wrapper;
            }
            if (jl_String_equals($type, $rt_s(164))) {
                $existingRef = otji_JSWrapper_stringWrappers.get($jsNumber);
                $existing = (typeof $existingRef === 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
                if (!(typeof $existing === 'undefined' ? 1 : 0))
                    return $existing;
                $wrapper = otji_JSWrapper__init_($jsNumber);
                $wrapperAsJs = $wrapper;
                otji_JSWrapper_stringWrappers.set($jsNumber, new $rt_globals.WeakRef($wrapperAsJs));
                otji_JSWrapper_register$js_body$_4(otji_JSWrapper_stringFinalizationRegistry, $wrapperAsJs, $jsNumber);
                return $wrapper;
            }
            if (jl_String_equals($type, $rt_s(165))) {
                $existingRef = otji_JSWrapper_numberWrappers.get($jsNumber);
                $existing = (typeof $existingRef === 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
                if (!(typeof $existing === 'undefined' ? 1 : 0))
                    return $existing;
                $wrapper = otji_JSWrapper__init_($jsNumber);
                $wrapperAsJs = $wrapper;
                otji_JSWrapper_numberWrappers.set($jsNumber, new $rt_globals.WeakRef($wrapperAsJs));
                otji_JSWrapper_register$js_body$_4(otji_JSWrapper_numberFinalizationRegistry, $wrapperAsJs, $jsNumber);
                return $wrapper;
            }
            if (jl_String_equals($type, $rt_s(166))) {
                $existingRef = otji_JSWrapper_undefinedWrapper;
                $existing = $existingRef === null ? void 0 : $existingRef.deref();
                if (!(typeof $existing === 'undefined' ? 1 : 0))
                    return $existing;
                $wrapper = otji_JSWrapper__init_($jsNumber);
                otji_JSWrapper_undefinedWrapper = new $rt_globals.WeakRef($wrapper);
                return $wrapper;
            }
        }
        return otji_JSWrapper__init_($jsNumber);
    }
    function otji_JSWrapper_unwrap($o) {
        otji_JSWrapper_$callClinit();
        if ($o === null)
            return null;
        return $o[$rt_jso_marker] === true ? $o : $o.$js;
    }
    function otji_JSWrapper_jsToJava($o) {
        otji_JSWrapper_$callClinit();
        if ($o === null)
            return null;
        return $o instanceof $rt_objcls() ? $o : otji_JSWrapper_wrap($o);
    }
    function otji_JSWrapper__clinit_() {
        otji_JSWrapper_hashCodes = new $rt_globals.WeakMap();
        otji_JSWrapper_wrappers = !(typeof $rt_globals.WeakRef !== 'undefined' ? 1 : 0) ? null : new $rt_globals.WeakMap();
        otji_JSWrapper_stringWrappers = !(typeof $rt_globals.WeakRef !== 'undefined' ? 1 : 0) ? null : new $rt_globals.Map();
        otji_JSWrapper_numberWrappers = !(typeof $rt_globals.WeakRef !== 'undefined' ? 1 : 0) ? null : new $rt_globals.Map();
        otji_JSWrapper_stringFinalizationRegistry = otji_JSWrapper_stringWrappers === null ? null : new $rt_globals.FinalizationRegistry(otji_JS_function(new otji_JSWrapper$_clinit_$lambda$_30_0, "accept"));
        otji_JSWrapper_numberFinalizationRegistry = otji_JSWrapper_numberWrappers === null ? null : new $rt_globals.FinalizationRegistry(otji_JS_function(new otji_JSWrapper$_clinit_$lambda$_30_1, "accept"));
    }
    function otji_JSWrapper_register$js_body$_4(var$1, var$2, var$3) {
        return var$1.register(var$2, var$3);
    }
    function cmrl_Level() {
        var a = this; jl_Object.call(a);
        a.$width0 = 0;
        a.$height0 = 0;
        a.$depth = 0;
        a.$blocks = null;
        a.$lightDepths = null;
        a.$levelListeners = null;
    }
    function cmrl_Level_save($this) {
        var $dos, $e, $$je;
        a: {
            try {
                $dos = ji_DataOutputStream__init_(juz_GZIPOutputStream__init_(ji_FileOutputStream__init_($rt_s(8))));
                ji_OutputStream_write($dos, $this.$blocks);
                ji_FilterOutputStream_close($dos);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Exception) {
                    $e = $$je;
                } else {
                    throw $$e;
                }
            }
            jl_Throwable_printStackTrace($e);
        }
    }
    function cmrl_Level_calcLightDepths($this, $x, $minZ, $maxX, $maxZ) {
        var var$5, $z, $prevDepth, $depth, $minTileChangeY, $maxTileChangeY, var$11, var$12;
        var$5 = $x + $maxX | 0;
        $maxX = $minZ + $maxZ | 0;
        while ($x < var$5) {
            $z = $minZ;
            while ($z < $maxX) {
                $prevDepth = $this.$lightDepths.data[$x + $rt_imul($z, $this.$width0) | 0];
                $depth = $this.$depth - 1 | 0;
                while ($depth > 0 && !cmrl_Level_isTile($this, $x, $depth, $z)) {
                    $depth = $depth + (-1) | 0;
                }
                a: {
                    $this.$lightDepths.data[$x + $rt_imul($z, $this.$width0) | 0] = $depth;
                    if ($prevDepth != $depth) {
                        $minTileChangeY = jl_Math_min($prevDepth, $depth);
                        $maxTileChangeY = jl_Math_max($prevDepth, $depth);
                        var$11 = ju_AbstractList_iterator($this.$levelListeners);
                        $minTileChangeY = $minTileChangeY - 1 | 0;
                        var$12 = $maxTileChangeY + 1 | 0;
                        while (true) {
                            if (!ju_AbstractList$1_hasNext(var$11))
                                break a;
                            cmrl_LevelRenderer_setDirty(ju_AbstractList$1_next(var$11), $x - 1 | 0, $minTileChangeY, $z - 1 | 0, $x + 1 | 0, var$12, $z + 1 | 0);
                        }
                    }
                }
                $z = $z + 1 | 0;
            }
            $x = $x + 1 | 0;
        }
    }
    function cmrl_Level_isTile($this, $x, $y, $z) {
        var $index, var$5;
        if ($x >= 0 && $y >= 0 && $z >= 0) {
            $index = $this.$width0;
            if ($x < $index && $y < $this.$depth) {
                var$5 = $this.$height0;
                if ($z < var$5) {
                    $index = $rt_imul($rt_imul($y, var$5) + $z | 0, $index) + $x | 0;
                    return !$this.$blocks.data[$index] ? 0 : 1;
                }
            }
        }
        return 0;
    }
    function cmrl_Level_getBrightness($this, $x, $y, $z) {
        var var$4;
        if ($x >= 0 && $y >= 0 && $z >= 0) {
            var$4 = $this.$width0;
            if ($x < var$4 && $y < $this.$depth && $z < $this.$height0) {
                if ($y >= $this.$lightDepths.data[$x + $rt_imul($z, var$4) | 0])
                    return 1.0;
                return 0.800000011920929;
            }
        }
        return 1.0;
    }
    function cmrl_Level_getCubes($this, $boundingBox) {
        var $boundingBoxList, $minX, $maxX, $minY, $maxY, $minZ, $maxZ, $x, $y, $z;
        $boundingBoxList = ju_ArrayList__init_();
        $minX = jl_Math_floor($boundingBox.$minX0) - 1.0 | 0;
        $maxX = jl_Math_ceil($boundingBox.$maxX0) + 1.0 | 0;
        $minY = jl_Math_floor($boundingBox.$minY0) - 1.0 | 0;
        $maxY = jl_Math_ceil($boundingBox.$maxY0) + 1.0 | 0;
        $minZ = jl_Math_floor($boundingBox.$minZ0) - 1.0 | 0;
        $maxZ = jl_Math_ceil($boundingBox.$maxZ0) + 1.0 | 0;
        $x = jl_Math_max(0, $minX);
        $minX = jl_Math_max(0, $minY);
        $minY = jl_Math_max(0, $minZ);
        $maxX = jl_Math_min($this.$width0, $maxX);
        $minZ = jl_Math_min($this.$depth, $maxY);
        $maxY = jl_Math_min($this.$height0, $maxZ);
        while ($x < $maxX) {
            $y = $minX;
            while ($y < $minZ) {
                $z = $minY;
                while ($z < $maxY) {
                    if (cmrl_Level_isTile($this, $x, $y, $z))
                        ju_ArrayList_add($boundingBoxList, cmrp_AABB__init_($x, $y, $z, $x + 1 | 0, $y + 1 | 0, $z + 1 | 0));
                    $z = $z + 1 | 0;
                }
                $y = $y + 1 | 0;
            }
            $x = $x + 1 | 0;
        }
        return $boundingBoxList;
    }
    function cmrl_Level_setTile($this, $x, $y, $z, $id) {
        var var$5, var$6, var$7, var$8;
        if ($x >= 0 && $y >= 0 && $z >= 0) {
            var$5 = $this.$width0;
            if ($x < var$5 && $y < $this.$depth) {
                var$6 = $this.$height0;
                if ($z < var$6) {
                    $this.$blocks.data[$rt_imul($rt_imul($y, var$6) + $z | 0, var$5) + $x | 0] = $id << 24 >> 24;
                    cmrl_Level_calcLightDepths($this, $x, $z, 1, 1);
                    var$7 = ju_AbstractList_iterator($this.$levelListeners);
                    $id = $x - 1 | 0;
                    var$5 = $y - 1 | 0;
                    var$8 = $z - 1 | 0;
                    var$6 = $x + 1 | 0;
                    $y = $y + 1 | 0;
                    $z = $z + 1 | 0;
                    while (ju_AbstractList$1_hasNext(var$7)) {
                        cmrl_LevelRenderer_setDirty(ju_AbstractList$1_next(var$7), $id, var$5, var$8, var$6, $y, $z);
                    }
                    return;
                }
            }
        }
    }
    var olug_GLU = $rt_classWithoutFields();
    function olug_GLU_gluPerspective($fovy, $aspect, $zNear, $zFar) {
        var var$5, var$6, var$7, var$8, var$9, var$10;
        olug_Project_$callClinit();
        $fovy = $fovy / 2.0 * 3.1415927410125732 / 180.0;
        var$5 = $zFar - $zNear;
        var$6 = $fovy;
        $fovy = jl_Math_sin(var$6);
        if (var$5 !== 0.0 && $fovy !== 0.0 && $aspect !== 0.0) {
            $fovy = jl_Math_cos(var$6) / $fovy;
            var$7 = olug_Project_matrix;
            var$8 = var$7.$position;
            jn_FloatBuffer_put(var$7, olug_Project_IDENTITY_MATRIX);
            jn_Buffer_position0(var$7, var$8);
            jn_FloatBufferImpl_put(olug_Project_matrix, 0, $fovy / $aspect);
            jn_FloatBufferImpl_put(olug_Project_matrix, 5, $fovy);
            jn_FloatBufferImpl_put(olug_Project_matrix, 10,  -($zFar + $zNear) / var$5);
            jn_FloatBufferImpl_put(olug_Project_matrix, 11, (-1.0));
            jn_FloatBufferImpl_put(olug_Project_matrix, 14, (-2.0) * $zNear * $zFar / var$5);
            jn_FloatBufferImpl_put(olug_Project_matrix, 15, 0.0);
            var$7 = olug_Project_matrix;
            olo_GL11_$callClinit();
            var$9 = olo_GL11_getMatrix();
            var$10 = olo_GL11_paramMatrix;
            var$10.$m00 = jn_FloatBufferImpl_get(var$7);
            var$10.$m01 = jn_FloatBufferImpl_get(var$7);
            var$10.$m02 = jn_FloatBufferImpl_get(var$7);
            var$10.$m03 = jn_FloatBufferImpl_get(var$7);
            var$10.$m10 = jn_FloatBufferImpl_get(var$7);
            var$10.$m11 = jn_FloatBufferImpl_get(var$7);
            var$10.$m12 = jn_FloatBufferImpl_get(var$7);
            var$10.$m13 = jn_FloatBufferImpl_get(var$7);
            var$10.$m20 = jn_FloatBufferImpl_get(var$7);
            var$10.$m21 = jn_FloatBufferImpl_get(var$7);
            var$10.$m22 = jn_FloatBufferImpl_get(var$7);
            var$10.$m23 = jn_FloatBufferImpl_get(var$7);
            var$10.$m30 = jn_FloatBufferImpl_get(var$7);
            var$10.$m31 = jn_FloatBufferImpl_get(var$7);
            var$10.$m32 = jn_FloatBufferImpl_get(var$7);
            var$10.$m33 = jn_FloatBufferImpl_get(var$7);
            oluv_Matrix4f_mul(var$9, olo_GL11_paramMatrix, var$9);
        }
    }
    var cmrl_LevelListener = $rt_classWithoutFields(0);
    function cmrl_LevelRenderer() {
        var a = this; jl_Object.call(a);
        a.$tessellator = null;
        a.$level2 = null;
        a.$chunks = null;
        a.$chunkAmountX = 0;
        a.$chunkAmountY = 0;
        a.$chunkAmountZ = 0;
    }
    function cmrl_LevelRenderer__init_(var_0) {
        var var_1 = new cmrl_LevelRenderer();
        cmrl_LevelRenderer__init_0(var_1, var_0);
        return var_1;
    }
    function cmrl_LevelRenderer__init_0($this, $level) {
        var $x, $z, $minChunkX, $y, $minChunkY, $minChunkZ, $maxChunkX, $maxChunkY, $z_0, $maxChunkZ, var$12, $chunk, var$14, var$15, var$16, var$17, var$18;
        ju_ArrayList_add($level.$levelListeners, $this);
        $this.$tessellator = cmrl_Tessellator__init_();
        $this.$level2 = $level;
        $x = $level.$width0 / 16 | 0;
        $this.$chunkAmountX = $x;
        $z = $level.$depth / 16 | 0;
        $this.$chunkAmountY = $z;
        $minChunkX = $level.$height0 / 16 | 0;
        $this.$chunkAmountZ = $minChunkX;
        $this.$chunks = $rt_createArray(cmrl_Chunk, $rt_imul($rt_imul($x, $z), $minChunkX));
        $x = 0;
        while ($x < $this.$chunkAmountX) {
            $y = 0;
            while ($y < $this.$chunkAmountY) {
                $z = 0;
                while ($z < $this.$chunkAmountZ) {
                    $minChunkX = $x * 16 | 0;
                    $minChunkY = $y * 16 | 0;
                    $minChunkZ = $z * 16 | 0;
                    $maxChunkX = ($x + 1 | 0) * 16 | 0;
                    $maxChunkY = ($y + 1 | 0) * 16 | 0;
                    $z_0 = $z + 1 | 0;
                    $maxChunkZ = $z_0 * 16 | 0;
                    $maxChunkX = jl_Math_min($level.$width0, $maxChunkX);
                    $maxChunkY = jl_Math_min($level.$depth, $maxChunkY);
                    var$12 = jl_Math_min($level.$height0, $maxChunkZ);
                    $chunk = new cmrl_Chunk;
                    cmrl_Chunk_$callClinit();
                    $chunk.$dirty = 1;
                    $chunk.$level1 = $level;
                    $chunk.$minX = $minChunkX;
                    $chunk.$minY = $minChunkY;
                    $chunk.$minZ = $minChunkZ;
                    $chunk.$maxX = $maxChunkX;
                    $chunk.$maxY = $maxChunkY;
                    $chunk.$maxZ = var$12;
                    olo_GL11_$callClinit();
                    var$14 = olo_GL11_displayListId + 1 | 0;
                    var$15 = 0;
                    while (var$15 < 2) {
                        $maxChunkZ = olo_GL11_displayListId + 1 | 0;
                        olo_GL11_displayListId = $maxChunkZ;
                        var$16 = olo_GL11_lists;
                        var$17 = jl_Integer_valueOf($maxChunkZ);
                        var$18 = new olo_GL11$DisplayList;
                        var$18.$drawMode = 7;
                        var$18.$currentBuffer = null;
                        var$18.$count0 = 0;
                        var$18.$first = 0;
                        var$18.$matrixMode = ju_ArrayList__init_();
                        var$18.$id = $maxChunkZ;
                        var$18.$array0 = null;
                        var$18.$buffer1 = null;
                        var$18.$mode = (-1);
                        var$18.$length1 = 0;
                        ju_HashMap_put(var$16, var$17, var$18);
                        var$15 = var$15 + 1 | 0;
                    }
                    $chunk.$lists = var$14;
                    $chunk.$boundingBox = cmrp_AABB__init_($minChunkX, $minChunkY, $minChunkZ, $maxChunkX, $maxChunkY, var$12);
                    $this.$chunks.data[$rt_imul($x + $rt_imul($y, $this.$chunkAmountX) | 0, $this.$chunkAmountZ) + $z | 0] = $chunk;
                    $z = $z_0;
                }
                $y = $y + 1 | 0;
            }
            $x = $x + 1 | 0;
        }
    }
    function cmrl_LevelRenderer_render($this, $layer) {
        var $frustum, var$3, var$4, var$5, $chunk, var$7;
        cmrl_Frustum_$callClinit();
        cmrl_Frustum_calculateFrustum(cmrl_Frustum_frustum);
        $frustum = cmrl_Frustum_frustum;
        cmrl_Chunk_$callClinit();
        cmrl_Chunk_rebuiltThisFrame = 0;
        var$3 = $this.$chunks.data;
        var$4 = var$3.length;
        var$5 = 0;
        while (var$5 < var$4) {
            $chunk = var$3[var$5];
            var$7 = $chunk.$boundingBox;
            if (cmrl_Frustum_cubeInFrustum($frustum, var$7.$minX0, var$7.$minY0, var$7.$minZ0, var$7.$maxX0, var$7.$maxY0, var$7.$maxZ0)) {
                if ($chunk.$dirty) {
                    cmrl_Chunk_rebuild($chunk, 0);
                    cmrl_Chunk_rebuild($chunk, 1);
                }
                olo_GL11_glCallList($chunk.$lists + $layer | 0);
            }
            var$5 = var$5 + 1 | 0;
        }
    }
    function cmrl_LevelRenderer_setDirty($this, $minX, $minY, $minZ, $maxX, $maxY, $maxZ) {
        var var$7, $z, $y, $x;
        $minX = $minX / 16 | 0;
        var$7 = $minY / 16 | 0;
        $z = $minZ / 16 | 0;
        $y = $maxX / 16 | 0;
        $minY = $maxY / 16 | 0;
        $minZ = $maxZ / 16 | 0;
        $x = jl_Math_max($minX, 0);
        $maxX = jl_Math_max(var$7, 0);
        $maxY = jl_Math_max($z, 0);
        $maxZ = jl_Math_min($y, $this.$chunkAmountX - 1 | 0);
        var$7 = jl_Math_min($minY, $this.$chunkAmountY - 1 | 0);
        $minZ = jl_Math_min($minZ, $this.$chunkAmountZ - 1 | 0);
        while ($x <= $maxZ) {
            $y = $maxX;
            while ($y <= var$7) {
                $z = $maxY;
                while ($z <= $minZ) {
                    $this.$chunks.data[$rt_imul($x + $rt_imul($y, $this.$chunkAmountX) | 0, $this.$chunkAmountZ) + $z | 0].$dirty = 1;
                    $z = $z + 1 | 0;
                }
                $y = $y + 1 | 0;
            }
            $x = $x + 1 | 0;
        }
    }
    function cmrl_LevelRenderer_pick($this, $player) {
        var $boundingBox, $x, $maxX, $minY, $maxY, $minZ, $maxZ, $y, $z, $face;
        $player = $player.$boundingBox0;
        $boundingBox = cmrp_AABB__init_($player.$minX0 - 3.0, $player.$minY0 - 3.0, $player.$minZ0 - 3.0, $player.$maxX0 + 3.0, $player.$maxY0 + 3.0, $player.$maxZ0 + 3.0);
        $x = $boundingBox.$minX0 | 0;
        $maxX = $boundingBox.$maxX0 + 1.0 | 0;
        $minY = $boundingBox.$minY0 | 0;
        $maxY = $boundingBox.$maxY0 + 1.0 | 0;
        $minZ = $boundingBox.$minZ0 | 0;
        $maxZ = $boundingBox.$maxZ0 + 1.0 | 0;
        while ($x < $maxX) {
            $y = $minY;
            while ($y < $maxY) {
                $z = $minZ;
                while ($z < $maxZ) {
                    a: {
                        if (cmrl_Level_isTile($this.$level2, $x, $y, $z)) {
                            $face = 0;
                            while (true) {
                                if ($face >= 6)
                                    break a;
                                cmrl_Tessellator_clear($this.$tessellator);
                                cmrl_Tile_renderFace(cmrl_Tile_rock, $this.$tessellator, $x, $y, $z, $face);
                                cmrl_Tessellator_flush($this.$tessellator);
                                $face = $face + 1 | 0;
                            }
                        }
                    }
                    $z = $z + 1 | 0;
                }
                $y = $y + 1 | 0;
            }
            $x = $x + 1 | 0;
        }
    }
    function cmrl_LevelRenderer_renderHit($this, $hitResult) {
        var var$2;
        olo_GL11_glEnable(3042);
        olo_GL11_fogPremultiply = 0;
        olo_GL11_webgl.blendFunc(770, 1);
        var$2 = jl_Math_sin(Long_toNumber(jl_System_currentTimeMillis()) / 100.0) * 0.20000000298023224 + 0.4000000059604645;
        olo_GL11_colorR = 1.0;
        olo_GL11_colorG = 1.0;
        olo_GL11_colorB = 1.0;
        olo_GL11_colorA = var$2;
        cmrl_Tessellator_clear($this.$tessellator);
        cmrl_Tile_renderFace(cmrl_Tile_rock, $this.$tessellator, $hitResult.$x0, $hitResult.$y0, $hitResult.$z0, $hitResult.$face);
        cmrl_Tessellator_flush($this.$tessellator);
        olo_GL11_glDisable(3042);
    }
    function cmrl_LevelRenderer_allChanged($this) {
        var var$1;
        var$1 = $this.$level2;
        cmrl_LevelRenderer_setDirty($this, 0, 0, 0, var$1.$width0, var$1.$depth, var$1.$height0);
    }
    var ju_Map = $rt_classWithoutFields(0);
    var ju_AbstractMap = $rt_classWithoutFields();
    var jl_Cloneable = $rt_classWithoutFields(0);
    function ju_HashMap() {
        var a = this; ju_AbstractMap.call(a);
        a.$elementCount = 0;
        a.$elementData = null;
        a.$modCount = 0;
        a.$loadFactor = 0.0;
        a.$threshold = 0;
    }
    function ju_HashMap__init_0() {
        var var_0 = new ju_HashMap();
        ju_HashMap__init_1(var_0);
        return var_0;
    }
    function ju_HashMap__init_(var_0) {
        var var_1 = new ju_HashMap();
        ju_HashMap__init_2(var_1, var_0);
        return var_1;
    }
    function ju_HashMap_newElementArray($this, $s) {
        return $rt_createArray(ju_HashMap$HashEntry, $s);
    }
    function ju_HashMap__init_1($this) {
        ju_HashMap__init_2($this, 16);
    }
    function ju_HashMap__init_2($this, $capacity) {
        var var$2;
        if ($capacity < 0) {
            var$2 = new jl_IllegalArgumentException;
            jl_Exception__init_(var$2);
            $rt_throw(var$2);
        }
        $capacity = ju_HashMap_calculateCapacity($capacity);
        $this.$elementCount = 0;
        $this.$elementData = $this.$newElementArray($capacity);
        $this.$loadFactor = 0.75;
        ju_HashMap_computeThreshold($this);
    }
    function ju_HashMap_calculateCapacity($x) {
        var var$2;
        if ($x >= 1073741824)
            return 1073741824;
        if (!$x)
            return 16;
        var$2 = $x - 1 | 0;
        $x = var$2 | var$2 >> 1;
        $x = $x | $x >> 2;
        $x = $x | $x >> 4;
        $x = $x | $x >> 8;
        return ($x | $x >> 16) + 1 | 0;
    }
    function ju_HashMap_computeThreshold($this) {
        $this.$threshold = $this.$elementData.data.length * $this.$loadFactor | 0;
    }
    function ju_HashMap_containsKey($this, $key) {
        return ju_HashMap_entryByKey($this, $key) === null ? 0 : 1;
    }
    function ju_HashMap_get($this, $key) {
        var $m;
        $m = ju_HashMap_entryByKey($this, $key);
        if ($m === null)
            return null;
        return $m.$value0;
    }
    function ju_HashMap_entryByKey($this, $key) {
        var $m, $hash;
        if ($key === null)
            $m = ju_HashMap_findNullKeyEntry($this);
        else {
            $hash = $key.$hashCode0();
            $m = ju_HashMap_findNonNullKeyEntry($this, $key, $hash & ($this.$elementData.data.length - 1 | 0), $hash);
        }
        return $m;
    }
    function ju_HashMap_findNonNullKeyEntry($this, $key, $index, $keyHash) {
        var $m, var$5;
        $m = $this.$elementData.data[$index];
        while ($m !== null) {
            if ($m.$origKeyHash == $keyHash) {
                var$5 = $m.$key;
                if ($key !== var$5 && !$key.$equals(var$5) ? 0 : 1)
                    break;
            }
            $m = $m.$next1;
        }
        return $m;
    }
    function ju_HashMap_findNullKeyEntry($this) {
        var $m;
        $m = $this.$elementData.data[0];
        while ($m !== null && $m.$key !== null) {
            $m = $m.$next1;
        }
        return $m;
    }
    function ju_HashMap_put($this, $key, $value) {
        var var$3, var$4, var$5;
        if ($key === null) {
            var$3 = ju_HashMap_findNullKeyEntry($this);
            if (var$3 === null) {
                $this.$modCount = $this.$modCount + 1 | 0;
                var$3 = ju_HashMap_createHashedEntry($this, null, 0, 0);
                var$4 = $this.$elementCount + 1 | 0;
                $this.$elementCount = var$4;
                if (var$4 > $this.$threshold)
                    ju_HashMap_rehash($this);
            }
        } else {
            var$4 = $key.$hashCode0();
            var$5 = var$4 & ($this.$elementData.data.length - 1 | 0);
            var$3 = ju_HashMap_findNonNullKeyEntry($this, $key, var$5, var$4);
            if (var$3 === null) {
                $this.$modCount = $this.$modCount + 1 | 0;
                var$3 = ju_HashMap_createHashedEntry($this, $key, var$5, var$4);
                var$4 = $this.$elementCount + 1 | 0;
                $this.$elementCount = var$4;
                if (var$4 > $this.$threshold)
                    ju_HashMap_rehash($this);
            }
        }
        $key = var$3.$value0;
        var$3.$value0 = $value;
        return $key;
    }
    function ju_HashMap_createHashedEntry($this, $key, $index, $hash) {
        var $entry, var$5;
        $entry = ju_HashMap$HashEntry__init_($key, $hash);
        var$5 = $this.$elementData.data;
        $entry.$next1 = var$5[$index];
        var$5[$index] = $entry;
        return $entry;
    }
    function ju_HashMap_rehash0($this, $capacity) {
        var $length, $newData, $i, var$5, $entry, $index, $next;
        $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
        $newData = $this.$newElementArray($length);
        $i = 0;
        $length = $length - 1 | 0;
        while (true) {
            var$5 = $this.$elementData.data;
            if ($i >= var$5.length)
                break;
            $entry = var$5[$i];
            var$5[$i] = null;
            while ($entry !== null) {
                var$5 = $newData.data;
                $index = $entry.$origKeyHash & $length;
                $next = $entry.$next1;
                $entry.$next1 = var$5[$index];
                var$5[$index] = $entry;
                $entry = $next;
            }
            $i = $i + 1 | 0;
        }
        $this.$elementData = $newData;
        ju_HashMap_computeThreshold($this);
    }
    function ju_HashMap_rehash($this) {
        ju_HashMap_rehash0($this, $this.$elementData.data.length);
    }
    var jl_Iterable = $rt_classWithoutFields(0);
    var ju_Collection = $rt_classWithoutFields(0);
    var ju_AbstractCollection = $rt_classWithoutFields();
    function ju_AbstractCollection_isEmpty($this) {
        return $this.$size ? 0 : 1;
    }
    var ju_SequencedCollection = $rt_classWithoutFields(0);
    var ju_List = $rt_classWithoutFields(0);
    function ju_AbstractList() {
        ju_AbstractCollection.call(this);
        this.$modCount0 = 0;
    }
    function ju_AbstractList_add($this, $e) {
        var var$2, var$3, var$4, var$5;
        var$2 = $this.$size;
        if (var$2 < 0) {
            $e = new jl_IndexOutOfBoundsException;
            jl_Exception__init_($e);
            $rt_throw($e);
        }
        var$3 = ju_LinkedList_listIterator($this, var$2);
        ju_LinkedList$SequentialListIterator_checkConcurrentModification(var$3);
        var$4 = new ju_LinkedList$Entry;
        var$4.$item = $e;
        $e = var$3.$prevEntry;
        var$4.$previous = $e;
        var$5 = var$3.$nextEntry;
        var$4.$next2 = var$5;
        if ($e !== null)
            $e.$next2 = var$4;
        else
            var$3.$this$0.$firstEntry = var$4;
        if (var$5 !== null)
            var$5.$previous = var$4;
        else
            var$3.$this$0.$lastEntry = var$4;
        var$3.$prevEntry = var$4;
        $e = var$3.$this$0;
        $e.$size = $e.$size + 1 | 0;
        var$2 = $e.$modCount0 + 1 | 0;
        $e.$modCount0 = var$2;
        var$3.$version = var$2;
        var$3.$currentEntry = null;
        return 1;
    }
    function ju_AbstractList_iterator($this) {
        var var$1;
        var$1 = new ju_AbstractList$1;
        var$1.$this$00 = $this;
        var$1.$modCount1 = $this.$modCount0;
        var$1.$size0 = $this.$size1;
        var$1.$removeIndex = (-1);
        return var$1;
    }
    var ju_AbstractSequentialList = $rt_classWithoutFields(ju_AbstractList);
    function ju_AbstractSequentialList_remove($this, $index) {
        var $iter, var$3, $elem, var$5, var$6, var$7, var$8, var$9, var$10;
        if ($index < 0) {
            $iter = new jl_IndexOutOfBoundsException;
            jl_Exception__init_($iter);
            $rt_throw($iter);
        }
        $iter = ju_LinkedList_listIterator($this, $index);
        ju_LinkedList$SequentialListIterator_checkConcurrentModification($iter);
        var$3 = $iter.$nextEntry;
        if (var$3 === null) {
            $iter = new ju_NoSuchElementException;
            jl_Exception__init_($iter);
            $rt_throw($iter);
        }
        $elem = var$3.$item;
        $iter.$currentEntry = var$3;
        $iter.$prevEntry = var$3;
        var$5 = var$3.$next2;
        $iter.$nextEntry = var$5;
        var$6 = $iter.$index + 1 | 0;
        $iter.$index = var$6;
        var$7 = $iter.$this$0;
        var$8 = var$3.$previous;
        if (var$8 === null)
            var$7.$firstEntry = var$5;
        else
            var$8.$next2 = var$5;
        var$9 = var$3.$next2;
        if (var$9 === null)
            var$7.$lastEntry = var$8;
        else
            var$9.$previous = var$8;
        var$7.$size = var$7.$size - 1 | 0;
        var$10 = var$7.$modCount0 + 1 | 0;
        var$7.$modCount0 = var$10;
        if (var$3 === var$3) {
            $iter.$prevEntry = !(var$5 === null ? 0 : 1) ? null : var$5.$previous;
            $iter.$index = var$6 - 1 | 0;
        } else if (var$3 === var$5) {
            if (!(var$3 === null ? 0 : 1))
                var$9 = null;
            $iter.$nextEntry = var$9;
        }
        $iter.$version = var$10;
        $iter.$currentEntry = null;
        return $elem;
    }
    var ju_Queue = $rt_classWithoutFields(0);
    var ju_Deque = $rt_classWithoutFields(0);
    function ju_LinkedList() {
        var a = this; ju_AbstractSequentialList.call(a);
        a.$firstEntry = null;
        a.$lastEntry = null;
        a.$size = 0;
    }
    function ju_LinkedList__init_() {
        var var_0 = new ju_LinkedList();
        ju_LinkedList__init_0(var_0);
        return var_0;
    }
    function ju_LinkedList__init_0($this) {}
    function ju_LinkedList_clear($this) {
        $this.$firstEntry = null;
        $this.$lastEntry = null;
        $this.$size = 0;
        $this.$modCount0 = $this.$modCount0 + 1 | 0;
    }
    function ju_LinkedList_listIterator($this, $index) {
        var $prev, var$3, $next, $i;
        if ($index < 0) {
            $prev = new jl_IndexOutOfBoundsException;
            jl_Exception__init_($prev);
            $rt_throw($prev);
        }
        var$3 = $this.$size;
        if ($index <= (var$3 / 2 | 0)) {
            $next = $this.$firstEntry;
            $i = 0;
            while ($i < $index) {
                $next = $next.$next2;
                $i = $i + 1 | 0;
            }
            return ju_LinkedList$SequentialListIterator__init_($this, $next, $next === null ? null : $next.$previous, $index);
        }
        if ($index > var$3) {
            $prev = new jl_IndexOutOfBoundsException;
            jl_Exception__init_($prev);
            $rt_throw($prev);
        }
        $prev = $this.$lastEntry;
        $i = $index;
        while ($i < var$3) {
            $prev = $prev.$previous;
            $i = $i + 1 | 0;
        }
        return ju_LinkedList$SequentialListIterator__init_($this, $prev === null ? null : $prev.$next2, $prev, $index);
    }
    var cmr_Textures = $rt_classWithoutFields();
    var cmr_Textures_lastId = 0;
    function cmr_Textures__clinit_() {
        cmr_Textures_lastId = (-2147483648);
    }
    function cmrl_Tessellator() {
        var a = this; jl_Object.call(a);
        a.$vertexBuffer0 = null;
        a.$textureCoordinateBuffer = null;
        a.$colorBuffer = null;
        a.$vertices = 0;
        a.$hasTexture = 0;
        a.$textureU = 0.0;
        a.$textureV = 0.0;
        a.$hasColor = 0;
        a.$red = 0.0;
        a.$green = 0.0;
        a.$blue = 0.0;
    }
    function cmrl_Tessellator__init_() {
        var var_0 = new cmrl_Tessellator();
        cmrl_Tessellator__init_0(var_0);
        return var_0;
    }
    function cmrl_Tessellator__init_0($this) {
        $this.$vertexBuffer0 = ol_BufferUtils_createFloatBuffer(300000);
        $this.$textureCoordinateBuffer = ol_BufferUtils_createFloatBuffer(200000);
        $this.$colorBuffer = ol_BufferUtils_createFloatBuffer(300000);
        $this.$vertices = 0;
        $this.$hasTexture = 0;
    }
    function cmrl_Tessellator_vertex($this, $x, $y, $z) {
        var var$4;
        jn_FloatBufferImpl_put($this.$vertexBuffer0, $this.$vertices * 3 | 0, $x);
        jn_FloatBufferImpl_put($this.$vertexBuffer0, ($this.$vertices * 3 | 0) + 1 | 0, $y);
        jn_FloatBufferImpl_put($this.$vertexBuffer0, ($this.$vertices * 3 | 0) + 2 | 0, $z);
        if ($this.$hasTexture) {
            jn_FloatBufferImpl_put($this.$textureCoordinateBuffer, $this.$vertices * 2 | 0, $this.$textureU);
            jn_FloatBufferImpl_put($this.$textureCoordinateBuffer, ($this.$vertices * 2 | 0) + 1 | 0, $this.$textureV);
        }
        if ($this.$hasColor) {
            jn_FloatBufferImpl_put($this.$colorBuffer, $this.$vertices * 3 | 0, $this.$red);
            jn_FloatBufferImpl_put($this.$colorBuffer, ($this.$vertices * 3 | 0) + 1 | 0, $this.$green);
            jn_FloatBufferImpl_put($this.$colorBuffer, ($this.$vertices * 3 | 0) + 2 | 0, $this.$blue);
        }
        var$4 = $this.$vertices + 1 | 0;
        $this.$vertices = var$4;
        if (var$4 == 100000)
            cmrl_Tessellator_flush($this);
    }
    function cmrl_Tessellator_texture($this, $textureU, $textureV) {
        $this.$hasTexture = 1;
        $this.$textureU = $textureU;
        $this.$textureV = $textureV;
    }
    function cmrl_Tessellator_color($this, $red, $green, $blue) {
        $this.$hasColor = 1;
        $this.$red = $red;
        $this.$green = $green;
        $this.$blue = $blue;
    }
    function cmrl_Tessellator_flush($this) {
        var var$1, var$2;
        jn_Buffer_flip($this.$vertexBuffer0);
        jn_Buffer_flip($this.$textureCoordinateBuffer);
        olo_GL11_glEnableClientState(32884);
        if ($this.$hasTexture)
            olo_GL11_glEnableClientState(32888);
        if ($this.$hasColor)
            olo_GL11_glEnableClientState(32886);
        var$1 = $this.$vertices;
        if (var$1 % 4 | 0) {
            olo_GL11_glDrawQuadArrays(0, var$1);
            olo_GL11_triangleDrawn = olo_GL11_triangleDrawn + (var$1 / 2 | 0) | 0;
        } else {
            var$2 = 0;
            while (var$2 < var$1) {
                olo_GL11_webgl.drawArrays(6, var$2, 4);
                var$2 = var$2 + 4 | 0;
            }
        }
        olo_GL11_glDisableClientState(32884);
        if ($this.$hasTexture)
            olo_GL11_glDisableClientState(32888);
        if ($this.$hasColor)
            olo_GL11_glDisableClientState(32886);
        cmrl_Tessellator_clear($this);
    }
    function cmrl_Tessellator_clear($this) {
        jn_Buffer_clear($this.$vertexBuffer0);
        jn_Buffer_clear($this.$textureCoordinateBuffer);
        $this.$vertices = 0;
        $this.$hasTexture = 0;
        $this.$hasColor = 0;
    }
    var jn_IntBuffer = $rt_classWithoutFields(jn_Buffer);
    function jn_IntBuffer_array($this) {
        return jn_IntBufferOverByteBuffer_getArray($this);
    }
    function jn_IntBuffer_clear($this) {
        jn_Buffer_clear($this);
        return $this;
    }
    function jn_IntBuffer_flip($this) {
        jn_Buffer_flip($this);
        return $this;
    }
    function jn_IntBuffer_limit($this, $newLimit) {
        var var$2, var$3, var$4;
        if ($newLimit >= 0 && $newLimit <= $this.$capacity) {
            if ($this.$mark > $newLimit)
                $this.$mark = (-1);
            $this.$limit0 = $newLimit;
            if ($this.$position > $newLimit)
                $this.$position = $newLimit;
            return $this;
        }
        var$2 = new jl_IllegalArgumentException;
        var$3 = $this.$capacity;
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$4, $rt_s(167)), $newLimit), $rt_s(11)), var$3), 93);
        jl_Throwable__init_(var$2, jl_StringBuilder_toString(var$4));
        $rt_throw(var$2);
    }
    var otjt_Int32Array = $rt_classWithoutFields(otjt_ArrayBufferView);
    var oluv_Matrix = $rt_classWithoutFields();
    function oluv_Matrix4f() {
        var a = this; oluv_Matrix.call(a);
        a.$m00 = 0.0;
        a.$m01 = 0.0;
        a.$m02 = 0.0;
        a.$m03 = 0.0;
        a.$m10 = 0.0;
        a.$m11 = 0.0;
        a.$m12 = 0.0;
        a.$m13 = 0.0;
        a.$m20 = 0.0;
        a.$m21 = 0.0;
        a.$m22 = 0.0;
        a.$m23 = 0.0;
        a.$m30 = 0.0;
        a.$m31 = 0.0;
        a.$m32 = 0.0;
        a.$m33 = 0.0;
    }
    function oluv_Matrix4f__init_() {
        var var_0 = new oluv_Matrix4f();
        oluv_Matrix4f__init_0(var_0);
        return var_0;
    }
    function oluv_Matrix4f__init_0($this) {
        oluv_Matrix4f_setIdentity($this);
    }
    function oluv_Matrix4f_setIdentity($this) {
        $this.$m00 = 1.0;
        $this.$m01 = 0.0;
        $this.$m02 = 0.0;
        $this.$m03 = 0.0;
        $this.$m10 = 0.0;
        $this.$m11 = 1.0;
        $this.$m12 = 0.0;
        $this.$m13 = 0.0;
        $this.$m20 = 0.0;
        $this.$m21 = 0.0;
        $this.$m22 = 1.0;
        $this.$m23 = 0.0;
        $this.$m30 = 0.0;
        $this.$m31 = 0.0;
        $this.$m32 = 0.0;
        $this.$m33 = 1.0;
        return $this;
    }
    function oluv_Matrix4f_setZero($this) {
        $this.$m00 = 0.0;
        $this.$m01 = 0.0;
        $this.$m02 = 0.0;
        $this.$m03 = 0.0;
        $this.$m10 = 0.0;
        $this.$m11 = 0.0;
        $this.$m12 = 0.0;
        $this.$m13 = 0.0;
        $this.$m20 = 0.0;
        $this.$m21 = 0.0;
        $this.$m22 = 0.0;
        $this.$m23 = 0.0;
        $this.$m30 = 0.0;
        $this.$m31 = 0.0;
        $this.$m32 = 0.0;
        $this.$m33 = 0.0;
        return $this;
    }
    function oluv_Matrix4f_load($this, $src) {
        $this.$m00 = $src.$m00;
        $this.$m01 = $src.$m01;
        $this.$m02 = $src.$m02;
        $this.$m03 = $src.$m03;
        $this.$m10 = $src.$m10;
        $this.$m11 = $src.$m11;
        $this.$m12 = $src.$m12;
        $this.$m13 = $src.$m13;
        $this.$m20 = $src.$m20;
        $this.$m21 = $src.$m21;
        $this.$m22 = $src.$m22;
        $this.$m23 = $src.$m23;
        $this.$m30 = $src.$m30;
        $this.$m31 = $src.$m31;
        $this.$m32 = $src.$m32;
        $this.$m33 = $src.$m33;
        return $this;
    }
    function oluv_Matrix4f_store($this, $buf) {
        jn_FloatBufferImpl_put0($buf, $this.$m00);
        jn_FloatBufferImpl_put0($buf, $this.$m01);
        jn_FloatBufferImpl_put0($buf, $this.$m02);
        jn_FloatBufferImpl_put0($buf, $this.$m03);
        jn_FloatBufferImpl_put0($buf, $this.$m10);
        jn_FloatBufferImpl_put0($buf, $this.$m11);
        jn_FloatBufferImpl_put0($buf, $this.$m12);
        jn_FloatBufferImpl_put0($buf, $this.$m13);
        jn_FloatBufferImpl_put0($buf, $this.$m20);
        jn_FloatBufferImpl_put0($buf, $this.$m21);
        jn_FloatBufferImpl_put0($buf, $this.$m22);
        jn_FloatBufferImpl_put0($buf, $this.$m23);
        jn_FloatBufferImpl_put0($buf, $this.$m30);
        jn_FloatBufferImpl_put0($buf, $this.$m31);
        jn_FloatBufferImpl_put0($buf, $this.$m32);
        jn_FloatBufferImpl_put0($buf, $this.$m33);
        return $this;
    }
    function oluv_Matrix4f_store0($this, $buf) {
        $buf = $buf.data;
        $buf[0] = $this.$m00;
        $buf[1] = $this.$m01;
        $buf[2] = $this.$m02;
        $buf[3] = $this.$m03;
        $buf[4] = $this.$m10;
        $buf[5] = $this.$m11;
        $buf[6] = $this.$m12;
        $buf[7] = $this.$m13;
        $buf[8] = $this.$m20;
        $buf[9] = $this.$m21;
        $buf[10] = $this.$m22;
        $buf[11] = $this.$m23;
        $buf[12] = $this.$m30;
        $buf[13] = $this.$m31;
        $buf[14] = $this.$m32;
        $buf[15] = $this.$m33;
        return $this;
    }
    function oluv_Matrix4f_mul($left, $right, $dest) {
        var var$4, $m12, $m31, var$7, $m13, var$9, $m20, $m30, $m21, $m00, var$14, var$15, var$16, var$17, $m01, var$19, $m33, var$21, var$22, $m02, var$24, var$25, var$26, var$27, $m03, $m32, $m22, $m10, $m11, $m23, var$34, var$35;
        if ($dest === null)
            $dest = oluv_Matrix4f__init_();
        var$4 = $left.$m00;
        $m12 = $right.$m00;
        $m31 = var$4 * $m12;
        var$7 = $left.$m10;
        $m13 = $right.$m01;
        $m31 = $m31 + var$7 * $m13;
        var$9 = $left.$m20;
        $m20 = $right.$m02;
        $m31 = $m31 + var$9 * $m20;
        $m30 = $left.$m30;
        $m21 = $right.$m03;
        $m00 = $m31 + $m30 * $m21;
        var$14 = $left.$m01;
        $m31 = var$14 * $m12;
        var$15 = $left.$m11;
        $m31 = $m31 + var$15 * $m13;
        var$16 = $left.$m21;
        $m31 = $m31 + var$16 * $m20;
        var$17 = $left.$m31;
        $m01 = $m31 + var$17 * $m21;
        var$19 = $left.$m02;
        $m31 = var$19 * $m12;
        $m33 = $left.$m12;
        $m31 = $m31 + $m33 * $m13;
        var$21 = $left.$m22;
        $m31 = $m31 + var$21 * $m20;
        var$22 = $left.$m32;
        $m02 = $m31 + var$22 * $m21;
        var$24 = $left.$m03;
        $m31 = var$24 * $m12;
        var$25 = $left.$m13;
        $m31 = $m31 + var$25 * $m13;
        var$26 = $left.$m23;
        $m31 = $m31 + var$26 * $m20;
        var$27 = $left.$m33;
        $m03 = $m31 + var$27 * $m21;
        $m20 = $right.$m10;
        $m31 = var$4 * $m20;
        $m21 = $right.$m11;
        $m32 = $m31 + var$7 * $m21;
        $m22 = $right.$m12;
        $m32 = $m32 + var$9 * $m22;
        $m13 = $right.$m13;
        $m10 = $m32 + $m30 * $m13;
        $m11 = var$14 * $m20 + var$15 * $m21 + var$16 * $m22 + var$17 * $m13;
        $m12 = var$19 * $m20 + $m33 * $m21 + var$21 * $m22 + var$22 * $m13;
        $m13 = var$24 * $m20 + var$25 * $m21 + var$26 * $m22 + var$27 * $m13;
        $m31 = $right.$m20;
        $m32 = var$4 * $m31;
        $m23 = $right.$m21;
        $m32 = $m32 + var$7 * $m23;
        var$34 = $right.$m22;
        $m32 = $m32 + var$9 * var$34;
        var$35 = $right.$m23;
        $m20 = $m32 + $m30 * var$35;
        $m21 = var$14 * $m31 + var$15 * $m23 + var$16 * var$34 + var$17 * var$35;
        $m22 = var$19 * $m31 + $m33 * $m23 + var$21 * var$34 + var$22 * var$35;
        $m23 = var$24 * $m31 + var$25 * $m23 + var$26 * var$34 + var$27 * var$35;
        var$34 = $right.$m30;
        $m31 = var$4 * var$34;
        var$4 = $right.$m31;
        $m31 = $m31 + var$7 * var$4;
        var$35 = $right.$m32;
        $m31 = $m31 + var$9 * var$35;
        var$9 = $right.$m33;
        $m30 = $m31 + $m30 * var$9;
        $m31 = var$14 * var$34 + var$15 * var$4 + var$16 * var$35 + var$17 * var$9;
        $m32 = var$19 * var$34 + $m33 * var$4 + var$21 * var$35 + var$22 * var$9;
        $m33 = var$24 * var$34 + var$25 * var$4 + var$26 * var$35 + var$27 * var$9;
        $dest.$m00 = $m00;
        $dest.$m01 = $m01;
        $dest.$m02 = $m02;
        $dest.$m03 = $m03;
        $dest.$m10 = $m10;
        $dest.$m11 = $m11;
        $dest.$m12 = $m12;
        $dest.$m13 = $m13;
        $dest.$m20 = $m20;
        $dest.$m21 = $m21;
        $dest.$m22 = $m22;
        $dest.$m23 = $m23;
        $dest.$m30 = $m30;
        $dest.$m31 = $m31;
        $dest.$m32 = $m32;
        $dest.$m33 = $m33;
        return $dest;
    }
    function oluv_Matrix4f_translate($this, $vec) {
        var var$2, var$3, var$4, var$5, var$6, var$7;
        var$2 = $this.$m30;
        var$3 = $this.$m00;
        var$4 = $vec.$x3;
        var$3 = var$3 * var$4;
        var$5 = $this.$m10;
        var$6 = $vec.$y3;
        var$3 = var$3 + var$5 * var$6;
        var$7 = $this.$m20;
        var$5 = $vec.$z3;
        $this.$m30 = var$2 + var$3 + var$7 * var$5;
        $this.$m31 = $this.$m31 + $this.$m01 * var$4 + $this.$m11 * var$6 + $this.$m21 * var$5;
        $this.$m32 = $this.$m32 + $this.$m02 * var$4 + $this.$m12 * var$6 + $this.$m22 * var$5;
        $this.$m33 = $this.$m33 + $this.$m03 * var$4 + $this.$m13 * var$6 + $this.$m23 * var$5;
        return $this;
    }
    function oluv_Matrix4f_scale($this, $vec) {
        var var$2, var$3;
        var$2 = $this.$m00;
        var$3 = $vec.$x3;
        $this.$m00 = var$2 * var$3;
        $this.$m01 = $this.$m01 * var$3;
        $this.$m02 = $this.$m02 * var$3;
        $this.$m03 = $this.$m03 * var$3;
        var$2 = $this.$m10;
        var$3 = $vec.$y3;
        $this.$m10 = var$2 * var$3;
        $this.$m11 = $this.$m11 * var$3;
        $this.$m12 = $this.$m12 * var$3;
        $this.$m13 = $this.$m13 * var$3;
        var$2 = $this.$m20;
        var$3 = $vec.$z3;
        $this.$m20 = var$2 * var$3;
        $this.$m21 = $this.$m21 * var$3;
        $this.$m22 = $this.$m22 * var$3;
        $this.$m23 = $this.$m23 * var$3;
        return $this;
    }
    function oluv_Matrix4f_rotate($this, $angle, $axis) {
        return oluv_Matrix4f_rotate0($angle, $axis, $this, $this);
    }
    function oluv_Matrix4f_rotate0($angle, $axis, $src, $dest) {
        var var$5, $c, $s, $oneminusc, $t11, $xy, $f22, $yz, $xz, $xs, $ys, $zs, $f00, $f01, $f02, $f10, $f11, $f12, $f20, $f21, var$25, $t00, var$27, $t01, $t02, $t03, $t10, $t12, $t13;
        if ($dest === null)
            $dest = oluv_Matrix4f__init_();
        var$5 = $angle;
        $c = jl_Math_cos(var$5);
        $s = jl_Math_sin(var$5);
        $oneminusc = 1.0 - $c;
        $angle = $axis.$x3;
        $t11 = $axis.$y3;
        $xy = $angle * $t11;
        $f22 = $axis.$z3;
        $yz = $t11 * $f22;
        $xz = $angle * $f22;
        $xs = $angle * $s;
        $ys = $t11 * $s;
        $zs = $f22 * $s;
        $f00 = $angle * $angle * $oneminusc + $c;
        $angle = $xy * $oneminusc;
        $f01 = $angle + $zs;
        $s = $xz * $oneminusc;
        $f02 = $s - $ys;
        $f10 = $angle - $zs;
        $f11 = $t11 * $t11 * $oneminusc + $c;
        $angle = $yz * $oneminusc;
        $f12 = $angle + $xs;
        $f20 = $s + $ys;
        $f21 = $angle - $xs;
        $f22 = $f22 * $f22 * $oneminusc + $c;
        $angle = $src.$m00;
        $c = $angle * $f00;
        $s = $src.$m10;
        $c = $c + $s * $f01;
        var$25 = $src.$m20;
        $t00 = $c + var$25 * $f02;
        var$27 = $src.$m01;
        $c = var$27 * $f00;
        $xy = $src.$m11;
        $c = $c + $xy * $f01;
        $ys = $src.$m21;
        $t01 = $c + $ys * $f02;
        $zs = $src.$m02;
        $c = $zs * $f00;
        $yz = $src.$m12;
        $c = $c + $yz * $f01;
        $xs = $src.$m22;
        $t02 = $c + $xs * $f02;
        $xz = $src.$m03;
        $c = $xz * $f00;
        $f00 = $src.$m13;
        $c = $c + $f00 * $f01;
        $f01 = $src.$m23;
        $t03 = $c + $f01 * $f02;
        $t10 = $angle * $f10 + $s * $f11 + var$25 * $f12;
        $t11 = var$27 * $f10 + $xy * $f11 + $ys * $f12;
        $t12 = $zs * $f10 + $yz * $f11 + $xs * $f12;
        $t13 = $xz * $f10 + $f00 * $f11 + $f01 * $f12;
        $dest.$m20 = $angle * $f20 + $s * $f21 + var$25 * $f22;
        $dest.$m21 = var$27 * $f20 + $xy * $f21 + $ys * $f22;
        $dest.$m22 = $zs * $f20 + $yz * $f21 + $xs * $f22;
        $dest.$m23 = $xz * $f20 + $f00 * $f21 + $f01 * $f22;
        $dest.$m00 = $t00;
        $dest.$m01 = $t01;
        $dest.$m02 = $t02;
        $dest.$m03 = $t03;
        $dest.$m10 = $t10;
        $dest.$m11 = $t11;
        $dest.$m12 = $t12;
        $dest.$m13 = $t13;
        return $dest;
    }
    var otjt_Uint8Array = $rt_classWithoutFields(otjt_ArrayBufferView);
    var otjt_Float32Array = $rt_classWithoutFields(otjt_ArrayBufferView);
    var oluv_ReadableVector = $rt_classWithoutFields(0);
    var oluv_Vector = $rt_classWithoutFields();
    var oluv_ReadableVector2f = $rt_classWithoutFields(0);
    var oluv_ReadableVector3f = $rt_classWithoutFields(0);
    var oluv_WritableVector2f = $rt_classWithoutFields(0);
    var oluv_WritableVector3f = $rt_classWithoutFields(0);
    function oluv_Vector3f() {
        var a = this; oluv_Vector.call(a);
        a.$x3 = 0.0;
        a.$y3 = 0.0;
        a.$z3 = 0.0;
    }
    function oluv_Vector3f_set($this, $x, $y, $z) {
        $this.$x3 = $x;
        $this.$y3 = $y;
        $this.$z3 = $z;
    }
    var oluv_ReadableVector4f = $rt_classWithoutFields(0);
    var oluv_WritableVector4f = $rt_classWithoutFields(0);
    function oluv_Vector4f() {
        var a = this; oluv_Vector.call(a);
        a.$x2 = 0.0;
        a.$y2 = 0.0;
        a.$z2 = 0.0;
        a.$w0 = 0.0;
    }
    function oluv_Vector4f__init_() {
        var var_0 = new oluv_Vector4f();
        oluv_Vector4f__init_0(var_0);
        return var_0;
    }
    function oluv_Vector4f__init_0($this) {}
    function oluv_Vector4f_set($this, $src) {
        $this.$x2 = $src.$x2;
        $this.$y2 = $src.$y2;
        $this.$z2 = $src.$z2;
        $this.$w0 = $src.$w0;
        return $this;
    }
    function oluv_Vector4f_equals($this, $other) {
        if ($this === $other)
            return 1;
        if ($other === null)
            return 0;
        if (jl_Object_getClass($this) !== jl_Object_getClass($other))
            return 0;
        if ($this.$x2 === $other.$x2 && $this.$y2 === $other.$y2 && $this.$z2 === $other.$z2 && $this.$w0 === $other.$w0)
            return 1;
        return 0;
    }
    var olug_Util = $rt_classWithoutFields();
    var olug_Project = $rt_classWithoutFields(olug_Util);
    var olug_Project_IDENTITY_MATRIX = null;
    var olug_Project_matrix = null;
    var olug_Project_finalMatrix = null;
    var olug_Project_tempMatrix = null;
    var olug_Project_in = null;
    var olug_Project_out = null;
    var olug_Project_forward = null;
    var olug_Project_side = null;
    var olug_Project_up = null;
    function olug_Project_$callClinit() {
        olug_Project_$callClinit = $rt_eraseClinit(olug_Project);
        olug_Project__clinit_();
    }
    function olug_Project_gluPickMatrix($x, $y, $deltaX, $deltaY, $viewport) {
        olug_Project_$callClinit();
        if ($deltaX > 0.0 && $deltaY > 0.0) {
            olo_GL11_glTranslatef((jn_IntBufferImpl_get0($viewport, $viewport.$position + 2 | 0) - 2.0 * ($x - jn_IntBufferImpl_get0($viewport, $viewport.$position + 0 | 0))) / $deltaX, (jn_IntBufferImpl_get0($viewport, $viewport.$position + 3 | 0) - 2.0 * ($y - jn_IntBufferImpl_get0($viewport, $viewport.$position + 1 | 0))) / $deltaY, 0.0);
            $x = jn_IntBufferImpl_get0($viewport, $viewport.$position + 2 | 0) / $deltaX;
            $y = jn_IntBufferImpl_get0($viewport, $viewport.$position + 3 | 0) / $deltaY;
            oluv_Vector3f_set(olo_GL11_matrixVector, $x, $y, 1.0);
            oluv_Matrix4f_scale(olo_GL11_getMatrix(), olo_GL11_matrixVector);
            if (olo_GL11_compilingDisplayList)
                ju_ArrayList_add(olo_GL11_currentList.$matrixMode, olo_GL11$MatrixMode__init_(3, $x, $y, 1.0));
            return;
        }
    }
    function olug_Project__clinit_() {
        olug_Project_IDENTITY_MATRIX = $rt_createFloatArrayFromData([1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);
        olug_Project_matrix = ol_BufferUtils_createFloatBuffer(16);
        olug_Project_finalMatrix = ol_BufferUtils_createFloatBuffer(16);
        olug_Project_tempMatrix = ol_BufferUtils_createFloatBuffer(16);
        olug_Project_in = $rt_createFloatArray(4);
        olug_Project_out = $rt_createFloatArray(4);
        olug_Project_forward = $rt_createFloatArray(3);
        olug_Project_side = $rt_createFloatArray(3);
        olug_Project_up = $rt_createFloatArray(3);
    }
    function m_FramebufferGL() {
        jl_Object.call(this);
        this.$obj = null;
    }
    function jl_Thread() {
        var a = this; jl_Object.call(a);
        a.$id0 = Long_ZERO;
        a.$timeSliceStart = Long_ZERO;
        a.$finishedLock = null;
        a.$interruptHandler = null;
        a.$name1 = null;
        a.$alive = 0;
        a.$target = null;
    }
    var jl_Thread_mainThread = null;
    var jl_Thread_currentThread0 = null;
    var jl_Thread_nextId = 0;
    var jl_Thread_activeCount = 0;
    var jl_Thread_defaultUncaughtExceptionHandler = null;
    function jl_Thread_$callClinit() {
        jl_Thread_$callClinit = $rt_eraseClinit(jl_Thread);
        jl_Thread__clinit_();
    }
    function jl_Thread_setCurrentThread($thread_0) {
        jl_Thread_$callClinit();
        if (jl_Thread_currentThread0 !== $thread_0)
            jl_Thread_currentThread0 = $thread_0;
        jl_Thread_currentThread0.$timeSliceStart = jl_System_currentTimeMillis();
    }
    function jl_Thread_currentThread() {
        jl_Thread_$callClinit();
        return jl_Thread_currentThread0;
    }
    function jl_Thread_sleep(var$1) {
        var $ptr, $tmp;
        $ptr = 0;
        if ($rt_resuming()) {
            var $thread = $rt_nativeThread();
            $ptr = $thread.pop();var$1 = $thread.pop();
        }
        main: while (true) { switch ($ptr) {
        case 0:
            jl_Thread_$callClinit();
            $ptr = 1;
        case 1:
            jl_Thread_sleep$_asyncCall_$(var$1);
            if ($rt_suspending()) {
                break main;
            }
            return;
        default: $rt_invalidPointer();
        }}
        $rt_nativeThread().push(var$1, $ptr);
    }
    function jl_Thread_sleep0($millis, $callback) {
        var $current, $handler;
        jl_Thread_$callClinit();
        $current = jl_Thread_currentThread();
        $handler = new jl_Thread$SleepHandler;
        $handler.$thread = $current;
        $handler.$callback = $callback;
        $handler.$scheduleId = otp_Platform_schedule($handler, Long_ge($millis, Long_fromInt(2147483647)) ? 2147483647 : Long_lo($millis));
        $current.$interruptHandler = $handler;
    }
    function jl_Thread__clinit_() {
        var var$1, var$2, var$3;
        var$1 = new jl_Thread;
        jl_Thread_$callClinit();
        var$2 = null;
        var$1.$finishedLock = new jl_Object;
        var$1.$alive = 1;
        var$1.$name1 = $rt_s(168);
        var$1.$target = var$2;
        var$3 = jl_Thread_nextId;
        jl_Thread_nextId = var$3 + 1 | 0;
        var$1.$id0 = Long_fromInt(var$3);
        jl_Thread_mainThread = var$1;
        jl_Thread_currentThread0 = var$1;
        jl_Thread_nextId = 1;
        jl_Thread_activeCount = 1;
        jl_Thread_defaultUncaughtExceptionHandler = new jl_DefaultUncaughtExceptionHandler;
    }
    function jl_Thread_sleep$_asyncCall_$(var$1) {
        var thread = $rt_nativeThread();
        var javaThread = $rt_getThread();
        if (thread.isResuming()) {
            thread.status = 0;
            var result = thread.attribute;
            if (result instanceof Error) {
                throw result;
            }
            return result;
        }
        var callback = function() {};
        callback.$complete = function(val) {
            thread.attribute = val;
            $rt_setThread(javaThread);
            thread.resume();
        };
        callback.$error = function(e) {
            thread.attribute = $rt_exception(e);
            $rt_setThread(javaThread);
            thread.resume();
        };
        callback = otpp_AsyncCallbackWrapper_create(callback);
        thread.suspend(function() {
            try {
                jl_Thread_sleep0(var$1, callback);
            } catch($e) {
                callback.$error($rt_exception($e));
            }
        });
        return null;
    }
    var jl_InterruptedException = $rt_classWithoutFields(jl_Exception);
    var otjc_JSWeakMap = $rt_classWithoutFields();
    var otjc_JSWeakRef = $rt_classWithoutFields();
    var otjc_JSMap = $rt_classWithoutFields();
    var otjc_JSFinalizationRegistryConsumer = $rt_classWithoutFields(0);
    var otji_JSWrapper$_clinit_$lambda$_30_0 = $rt_classWithoutFields();
    function otji_JSWrapper$_clinit_$lambda$_30_0_accept$exported$0(var$0, var$1) {
        var var$2;
        var$1 = otji_JSWrapper_jsToJava(var$1);
        var$2 = otji_JSWrapper_stringWrappers;
        var$1 = otji_JSWrapper_unwrap(var$1);
        var$2.delete(var$1);
    }
    var otjc_JSFinalizationRegistry = $rt_classWithoutFields();
    var otji_JSWrapper$_clinit_$lambda$_30_1 = $rt_classWithoutFields();
    function otji_JSWrapper$_clinit_$lambda$_30_1_accept$exported$0(var$0, var$1) {
        var var$2;
        var$1 = otji_JSWrapper_jsToJava(var$1);
        var$2 = otji_JSWrapper_numberWrappers;
        var$1 = otji_JSWrapper_unwrap(var$1);
        var$2.delete(var$1);
    }
    var otjc_JSObjects = $rt_classWithoutFields();
    var jl_Math = $rt_classWithoutFields();
    function jl_Math_sin(var$1) {
        return Math.sin(var$1);
    }
    function jl_Math_cos(var$1) {
        return Math.cos(var$1);
    }
    function jl_Math_toRadians($angdeg) {
        return $angdeg * 3.141592653589793 / 180.0;
    }
    function jl_Math_sqrt(var$1) {
        return Math.sqrt(var$1);
    }
    function jl_Math_ceil(var$1) {
        return Math.ceil(var$1);
    }
    function jl_Math_floor(var$1) {
        return Math.floor(var$1);
    }
    function jl_Math_random() {
        return jl_Math_randomImpl();
    }
    function jl_Math_randomImpl() {
        return Math.random();
    }
    function jl_Math_min($a, $b) {
        if ($a < $b)
            $b = $a;
        return $b;
    }
    function jl_Math_max($a, $b) {
        if ($a > $b)
            $b = $a;
        return $b;
    }
    function jl_Math_minImpl(var$1, var$2) {
        return Math.min(var$1, var$2);
    }
    function jl_Math_maxImpl(var$1, var$2) {
        return Math.max(var$1, var$2);
    }
    function olo_GL11$DisplayList() {
        var a = this; jl_Object.call(a);
        a.$id = 0;
        a.$array0 = null;
        a.$buffer1 = null;
        a.$mode = 0;
        a.$length1 = 0;
        a.$drawMode = 0;
        a.$currentBuffer = null;
        a.$count0 = 0;
        a.$first = 0;
        a.$matrixMode = null;
    }
    function olo_GL11$MatrixMode() {
        var a = this; jl_Object.call(a);
        a.$type0 = 0;
        a.$angle = 0.0;
        a.$x1 = 0.0;
        a.$y1 = 0.0;
        a.$z1 = 0.0;
    }
    function olo_GL11$MatrixMode__init_(var_0, var_1, var_2, var_3) {
        var var_4 = new olo_GL11$MatrixMode();
        olo_GL11$MatrixMode__init_0(var_4, var_0, var_1, var_2, var_3);
        return var_4;
    }
    function olo_GL11$MatrixMode__init_0($this, $type, $x, $y, $z) {
        $this.$type0 = (-1);
        $this.$type0 = $type;
        $this.$x1 = $x;
        $this.$y1 = $y;
        $this.$z1 = $z;
    }
    var jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
    function m_TextureGL() {
        var a = this; jl_Object.call(a);
        a.$obj0 = null;
        a.$w = 0;
        a.$h = 0;
        a.$nearest = 0;
        a.$anisotropic = 0;
    }
    var ji_IOException = $rt_classWithoutFields(jl_Exception);
    function ji_IOException__init_0(var_0) {
        var var_1 = new ji_IOException();
        ji_IOException__init_(var_1, var_0);
        return var_1;
    }
    function ji_IOException__init_($this, $message) {
        jl_Throwable__init_($this, $message);
    }
    function m_RenderbufferGL() {
        jl_Object.call(this);
        this.$obj6 = null;
    }
    var jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0);
    var jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields();
    var oti_AsyncCallback = $rt_classWithoutFields(0);
    function otpp_AsyncCallbackWrapper() {
        jl_Object.call(this);
        this.$realAsyncCallback = null;
    }
    function otpp_AsyncCallbackWrapper_create($realAsyncCallback) {
        var var$2;
        var$2 = new otpp_AsyncCallbackWrapper;
        var$2.$realAsyncCallback = $realAsyncCallback;
        return var$2;
    }
    function otpp_AsyncCallbackWrapper_complete($this, $result) {
        $this.$realAsyncCallback.$complete($result);
    }
    function otpp_AsyncCallbackWrapper_error($this, $e) {
        $this.$realAsyncCallback.$error($e);
    }
    var otp_PlatformRunnable = $rt_classWithoutFields(0);
    var otr_EventQueue$Event = $rt_classWithoutFields(0);
    var jl_ThreadInterruptHandler = $rt_classWithoutFields(0);
    function jl_Thread$SleepHandler() {
        var a = this; jl_Object.call(a);
        a.$thread = null;
        a.$callback = null;
        a.$isInterrupted = 0;
        a.$scheduleId = 0;
    }
    function jl_Thread$SleepHandler_run($this) {
        var var$1;
        if (!$this.$isInterrupted) {
            var$1 = $this.$thread;
            var$1.$interruptHandler = null;
            jl_Thread_setCurrentThread(var$1);
            otpp_AsyncCallbackWrapper_complete($this.$callback, null);
        }
    }
    var jl_AutoCloseable = $rt_classWithoutFields(0);
    var ji_Closeable = $rt_classWithoutFields(0);
    var ji_InputStream = $rt_classWithoutFields();
    function ji_InputStream_read($this, $b) {
        return $this.$read0($b, 0, $b.data.length);
    }
    var ji_Flushable = $rt_classWithoutFields(0);
    var ji_OutputStream = $rt_classWithoutFields();
    function ji_OutputStream_write($this, $b) {
        $this.$write0($b, 0, $b.data.length);
    }
    function ji_OutputStream_close($this) {}
    function ji_OutputStream_flush($this) {}
    function ji_FilterOutputStream() {
        ji_OutputStream.call(this);
        this.$out = null;
    }
    function ji_FilterOutputStream__init_0(var_0) {
        var var_1 = new ji_FilterOutputStream();
        ji_FilterOutputStream__init_(var_1, var_0);
        return var_1;
    }
    function ji_FilterOutputStream__init_($this, $out) {
        $this.$out = $out;
    }
    function ji_FilterOutputStream_close($this) {
        var $$je;
        a: {
            try {
                $this.$out.$flush();
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof ji_IOException) {
                } else {
                    throw $$e;
                }
            }
        }
        $this.$out.$close();
    }
    function ji_PrintStream() {
        var a = this; ji_FilterOutputStream.call(a);
        a.$autoFlush = 0;
        a.$errorState = 0;
        a.$sb = null;
        a.$buffer = null;
        a.$charset = null;
    }
    function ji_PrintStream_write($this, $b, $off, $len) {
        var var$4, $$je;
        var$4 = $this.$out;
        if (var$4 === null)
            $this.$errorState = 1;
        if (!($this.$errorState ? 0 : 1))
            return;
        a: {
            try {
                var$4.$write0($b, $off, $len);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof ji_IOException) {
                } else {
                    throw $$e;
                }
            }
            $this.$errorState = 1;
        }
    }
    function ji_PrintStream_print0($this, $s, $begin, $end) {
        var $destBytes, $src, var$6, var$7, $dest, var$9, var$10, var$11, var$12, var$13, $overflow, $$je;
        $destBytes = $s.data;
        $end = $end - $begin | 0;
        $src = new jn_CharBufferOverArray;
        var$6 = $destBytes.length;
        var$7 = $begin + $end | 0;
        jn_Buffer__init_($src, var$6);
        $src.$position = $begin;
        $src.$limit0 = var$7;
        $src.$start1 = 0;
        $src.$readOnly1 = 0;
        $src.$array2 = $s;
        $destBytes = $rt_createByteArray(jl_Math_max(16, jl_Math_min($end, 1024)));
        $dest = jn_ByteBuffer_wrap($destBytes);
        var$9 = $this.$charset;
        var$10 = new jnci_UTF8Encoder;
        $s = $rt_createByteArray(1);
        var$11 = $s.data;
        var$11[0] = 63;
        jnc_CodingErrorAction_$callClinit();
        var$12 = jnc_CodingErrorAction_REPORT;
        var$10.$malformedAction = var$12;
        var$10.$unmappableAction = var$12;
        $begin = var$11.length;
        if ($begin && $begin >= var$10.$maxBytesPerChar) {
            var$10.$charset0 = var$9;
            var$10.$replacement = $s.$clone();
            var$10.$averageBytesPerChar = 2.0;
            var$10.$maxBytesPerChar = 4.0;
            var$10.$inArray = $rt_createCharArray(512);
            var$10.$outArray = $rt_createByteArray(512);
            var$9 = jnc_CodingErrorAction_REPLACE;
            if (var$9 === null) {
                var$9 = new jl_IllegalArgumentException;
                jl_Throwable__init_(var$9, $rt_s(169));
                $rt_throw(var$9);
            }
            var$10.$malformedAction = var$9;
            var$10.$unmappableAction = var$9;
            while (var$10.$status != 3) {
                var$10.$status = 2;
                a: {
                    while (true) {
                        try {
                            var$13 = jnci_BufferedEncoder_encodeLoop(var$10, $src, $dest);
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof jl_RuntimeException) {
                                $dest = $$je;
                                var$9 = new jnc_CoderMalfunctionError;
                                jl_Throwable__init_2(var$9, $dest);
                                $rt_throw(var$9);
                            } else {
                                throw $$e;
                            }
                        }
                        if (var$13.$kind ? 0 : 1) {
                            $begin = jn_Buffer_remaining($src);
                            if ($begin <= 0)
                                break a;
                            var$13 = jnc_CoderResult_malformedForLength($begin);
                        } else if (jnc_CoderResult_isOverflow(var$13))
                            break;
                        var$9 = !jnc_CoderResult_isUnmappable(var$13) ? var$10.$malformedAction : var$10.$unmappableAction;
                        b: {
                            if (var$9 !== jnc_CodingErrorAction_REPLACE) {
                                if (var$9 === jnc_CodingErrorAction_IGNORE)
                                    break b;
                                else
                                    break a;
                            }
                            $begin = jn_Buffer_remaining($dest);
                            $s = var$10.$replacement;
                            if ($begin < $s.data.length) {
                                var$13 = jnc_CoderResult_OVERFLOW;
                                break a;
                            }
                            jn_ByteBuffer_put0($dest, $s);
                        }
                        $overflow = $src.$position;
                        $begin = var$13.$kind != 2 ? 0 : 1;
                        if (!(!$begin && !jnc_CoderResult_isUnmappable(var$13) ? 0 : 1)) {
                            $dest = new jl_UnsupportedOperationException;
                            jl_Exception__init_($dest);
                            $rt_throw($dest);
                        }
                        jn_Buffer_position0($src, $overflow + var$13.$length2 | 0);
                    }
                }
                $overflow = jnc_CoderResult_isOverflow(var$13);
                ji_PrintStream_write($this, $destBytes, 0, $dest.$position);
                jn_Buffer_clear($dest);
                if (!$overflow) {
                    while (true) {
                        $end = var$10.$status;
                        if ($end != 2 && $end != 4) {
                            $dest = new jl_IllegalStateException;
                            jl_Exception__init_($dest);
                            $rt_throw($dest);
                        }
                        var$9 = jnc_CoderResult_UNDERFLOW;
                        if (var$9 === var$9)
                            var$10.$status = 3;
                        $overflow = jnc_CoderResult_isOverflow(var$9);
                        ji_PrintStream_write($this, $destBytes, 0, $dest.$position);
                        jn_Buffer_clear($dest);
                        if (!$overflow)
                            break;
                    }
                    return;
                }
            }
            $dest = new jl_IllegalStateException;
            jl_Exception__init_($dest);
            $rt_throw($dest);
        }
        var$9 = new jl_IllegalArgumentException;
        jl_Throwable__init_(var$9, $rt_s(170));
        $rt_throw(var$9);
    }
    function ji_PrintStream_print($this, $s) {
        jl_StringBuilder_append1($this.$sb, $s);
        ji_PrintStream_printSB($this);
    }
    function ji_PrintStream_println($this, $s) {
        jl_StringBuilder_append0(jl_StringBuilder_append1($this.$sb, $s), 10);
        ji_PrintStream_printSB($this);
    }
    function ji_PrintStream_printSB($this) {
        var var$1, var$2, $buffer, var$4, var$5, var$6, var$7, var$8, var$9;
        var$1 = $this.$sb;
        var$2 = var$1.$length0;
        $buffer = $this.$buffer;
        if (var$2 > $buffer.data.length)
            $buffer = $rt_createCharArray(var$2);
        var$4 = 0;
        var$5 = 0;
        if (var$4 > var$2) {
            var$1 = new jl_IndexOutOfBoundsException;
            jl_Throwable__init_(var$1, $rt_s(171));
            $rt_throw(var$1);
        }
        while (var$4 < var$2) {
            var$6 = $buffer.data;
            var$7 = var$5 + 1 | 0;
            var$8 = var$1.$buffer0.data;
            var$9 = var$4 + 1 | 0;
            var$6[var$5] = var$8[var$4];
            var$5 = var$7;
            var$4 = var$9;
        }
        ji_PrintStream_print0($this, $buffer, 0, var$2);
        $this.$sb.$length0 = 0;
    }
    function otcic_ConsoleOutputStream() {
        ji_OutputStream.call(this);
        this.$buffer2 = null;
    }
    function otcic_ConsoleOutputStream_write($this, $b) {
        var var$2;
        var$2 = $this.$buffer2;
        var$2.data[0] = $b << 24 >> 24;
        ji_OutputStream_write($this, var$2);
    }
    var otcic_StderrOutputStream = $rt_classWithoutFields(otcic_ConsoleOutputStream);
    var otcic_StderrOutputStream_INSTANCE = null;
    function otcic_StderrOutputStream_write($this, $b, $off, $len) {
        var var$4;
        var$4 = 0;
        while (var$4 < $len) {
            $rt_putStderr($b.data[var$4 + $off | 0] & 255);
            var$4 = var$4 + 1 | 0;
        }
    }
    function otcic_StderrOutputStream__clinit_() {
        var var$1;
        var$1 = new otcic_StderrOutputStream;
        var$1.$buffer2 = $rt_createByteArray(1);
        otcic_StderrOutputStream_INSTANCE = var$1;
    }
    var jn_FloatBuffer = $rt_classWithoutFields(jn_Buffer);
    function jn_FloatBuffer_get($this, $dst, $offset, $length) {
        var var$4, var$5, $pos, var$7, var$8, $i, var$10, var$11;
        if ($offset >= 0) {
            var$4 = $dst.data;
            var$5 = var$4.length;
            if ($offset <= var$5) {
                $pos = $offset + $length | 0;
                if ($pos > var$5) {
                    var$7 = new jl_IndexOutOfBoundsException;
                    var$8 = jl_StringBuilder__init_();
                    jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$8, $rt_s(172)), $pos), $rt_s(13)), var$5);
                    jl_Throwable__init_(var$7, jl_StringBuilder_toString(var$8));
                    $rt_throw(var$7);
                }
                if (jn_Buffer_remaining($this) < $length) {
                    var$8 = new jn_BufferUnderflowException;
                    jl_Exception__init_(var$8);
                    $rt_throw(var$8);
                }
                if ($length < 0) {
                    var$8 = new jl_IndexOutOfBoundsException;
                    var$7 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$7, $rt_s(14)), $length), $rt_s(15));
                    jl_Throwable__init_(var$8, jl_StringBuilder_toString(var$7));
                    $rt_throw(var$8);
                }
                $pos = $this.$position;
                $i = 0;
                while ($i < $length) {
                    var$10 = $offset + 1 | 0;
                    var$5 = $pos + 1 | 0;
                    var$4[$offset] = $this.$getElement($pos);
                    $i = $i + 1 | 0;
                    $offset = var$10;
                    $pos = var$5;
                }
                $this.$position = $this.$position + $length | 0;
                return $this;
            }
        }
        $dst = $dst.data;
        var$8 = new jl_IndexOutOfBoundsException;
        $length = $dst.length;
        var$11 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$11, $rt_s(16)), $offset), $rt_s(11)), $length), 41);
        jl_Throwable__init_(var$8, jl_StringBuilder_toString(var$11));
        $rt_throw(var$8);
    }
    function jn_FloatBuffer_get0($this, $dst) {
        return jn_FloatBuffer_get($this, $dst, 0, $dst.data.length);
    }
    function jn_FloatBuffer_put0($this, $src, $offset, $length) {
        var var$4, var$5, var$6, $pos, var$8, $i, var$10;
        if ($this.$readOnly2) {
            var$4 = new jn_ReadOnlyBufferException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if (jn_Buffer_remaining($this) < $length) {
            var$4 = new jn_BufferOverflowException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if ($offset >= 0) {
            var$5 = $src.data;
            var$6 = var$5.length;
            if ($offset <= var$6) {
                $pos = $offset + $length | 0;
                if ($pos > var$6) {
                    var$4 = new jl_IndexOutOfBoundsException;
                    var$8 = jl_StringBuilder__init_();
                    jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$8, $rt_s(173)), $pos), $rt_s(13)), var$6);
                    jl_Throwable__init_(var$4, jl_StringBuilder_toString(var$8));
                    $rt_throw(var$4);
                }
                if ($length < 0) {
                    var$4 = new jl_IndexOutOfBoundsException;
                    var$8 = jl_StringBuilder__init_();
                    jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$8, $rt_s(14)), $length), $rt_s(15));
                    jl_Throwable__init_(var$4, jl_StringBuilder_toString(var$8));
                    $rt_throw(var$4);
                }
                $pos = $this.$position;
                $i = 0;
                while ($i < $length) {
                    var$10 = $pos + 1 | 0;
                    var$6 = $offset + 1 | 0;
                    $this.$putElement($pos, var$5[$offset]);
                    $i = $i + 1 | 0;
                    $pos = var$10;
                    $offset = var$6;
                }
                $this.$position = $this.$position + $length | 0;
                return $this;
            }
        }
        $src = $src.data;
        var$4 = new jl_IndexOutOfBoundsException;
        $length = $src.length;
        var$8 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$8, $rt_s(16)), $offset), $rt_s(11)), $length), 41);
        jl_Throwable__init_(var$4, jl_StringBuilder_toString(var$8));
        $rt_throw(var$4);
    }
    function jn_FloatBuffer_put($this, $src) {
        return jn_FloatBuffer_put0($this, $src, 0, $src.data.length);
    }
    function jn_FloatBuffer_clear($this) {
        jn_Buffer_clear($this);
        return $this;
    }
    function jn_FloatBuffer_flip($this) {
        jn_Buffer_flip($this);
        return $this;
    }
    function jn_FloatBuffer_rewind($this) {
        $this.$mark = (-1);
        $this.$position = 0;
        return $this;
    }
    function jn_FloatBuffer_position($this, $newPosition) {
        jn_Buffer_position0($this, $newPosition);
        return $this;
    }
    function jnc_Charset() {
        var a = this; jl_Object.call(a);
        a.$canonicalName = null;
        a.$aliases = null;
    }
    function jnc_Charset_checkCanonicalName($name) {
        var $i, $c;
        if (jl_String_isEmpty($name))
            $rt_throw(jnc_IllegalCharsetNameException__init_($name));
        if (!jnc_Charset_isValidCharsetStart(jl_String_charAt($name, 0)))
            $rt_throw(jnc_IllegalCharsetNameException__init_($name));
        $i = 1;
        while ($i < jl_String_length($name)) {
            a: {
                $c = jl_String_charAt($name, $i);
                switch ($c) {
                    case 43:
                    case 45:
                    case 46:
                    case 58:
                    case 95:
                        break;
                    default:
                        if (jnc_Charset_isValidCharsetStart($c))
                            break a;
                        else
                            $rt_throw(jnc_IllegalCharsetNameException__init_($name));
                }
            }
            $i = $i + 1 | 0;
        }
    }
    function jnc_Charset_isValidCharsetStart($c) {
        a: {
            b: {
                if (!($c >= 48 && $c <= 57) && !($c >= 97 && $c <= 122)) {
                    if ($c < 65)
                        break b;
                    if ($c > 90)
                        break b;
                }
                $c = 1;
                break a;
            }
            $c = 0;
        }
        return $c;
    }
    var jnci_UTF8Charset = $rt_classWithoutFields(jnc_Charset);
    var jnci_UTF8Charset_INSTANCE = null;
    function jnci_UTF8Charset_$callClinit() {
        jnci_UTF8Charset_$callClinit = $rt_eraseClinit(jnci_UTF8Charset);
        jnci_UTF8Charset__clinit_();
    }
    function jnci_UTF8Charset__clinit_() {
        var var$1, var$2, var$3, var$4, var$5;
        var$1 = new jnci_UTF8Charset;
        jnci_UTF8Charset_$callClinit();
        var$2 = $rt_createArray(jl_String, 0);
        var$3 = var$2.data;
        jnc_Charset_checkCanonicalName($rt_s(174));
        var$4 = var$3.length;
        var$5 = 0;
        while (var$5 < var$4) {
            jnc_Charset_checkCanonicalName(var$3[var$5]);
            var$5 = var$5 + 1 | 0;
        }
        var$1.$canonicalName = $rt_s(174);
        var$1.$aliases = var$2.$clone();
        jnci_UTF8Charset_INSTANCE = var$1;
    }
    function jnc_IllegalCharsetNameException() {
        jl_IllegalArgumentException.call(this);
        this.$charsetName = null;
    }
    function jnc_IllegalCharsetNameException__init_(var_0) {
        var var_1 = new jnc_IllegalCharsetNameException();
        jnc_IllegalCharsetNameException__init_0(var_1, var_0);
        return var_1;
    }
    function jnc_IllegalCharsetNameException__init_0($this, $charsetName) {
        jl_Exception__init_($this);
        $this.$charsetName = $charsetName;
    }
    var jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception);
    var jn_FloatBufferImpl = $rt_classWithoutFields(jn_FloatBuffer);
    function jn_FloatBufferImpl_get($this) {
        var var$1, var$2;
        var$1 = $this.$position;
        if (var$1 < $this.$limit0) {
            $this.$position = var$1 + 1 | 0;
            return $this.$getElement(var$1);
        }
        var$2 = new jn_BufferUnderflowException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    function jn_FloatBufferImpl_put0($this, $b) {
        var var$2, var$3;
        if ($this.$readOnly2) {
            var$2 = new jn_ReadOnlyBufferException;
            jl_Exception__init_(var$2);
            $rt_throw(var$2);
        }
        var$3 = $this.$position;
        if (var$3 < $this.$limit0) {
            $this.$position = var$3 + 1 | 0;
            $this.$putElement(var$3, $b);
            return $this;
        }
        var$2 = new jn_BufferOverflowException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    function jn_FloatBufferImpl_put($this, $index, $b) {
        var var$3, var$4, var$5;
        if ($this.$readOnly2) {
            var$3 = new jn_ReadOnlyBufferException;
            jl_Exception__init_(var$3);
            $rt_throw(var$3);
        }
        if ($index >= 0 && $index < $this.$limit0) {
            $this.$putElement($index, $b);
            return $this;
        }
        var$3 = new jl_IndexOutOfBoundsException;
        var$4 = $this.$limit0;
        var$5 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$5, $rt_s(175)), $index), $rt_s(11)), var$4), 41);
        jl_Throwable__init_(var$3, jl_StringBuilder_toString(var$5));
        $rt_throw(var$3);
    }
    function jn_FloatBufferImpl_isReadOnly($this) {
        return $this.$readOnly2;
    }
    function jn_FloatBufferOverByteBuffer() {
        var a = this; jn_FloatBufferImpl.call(a);
        a.$byteByffer = null;
        a.$readOnly2 = 0;
        a.$start2 = 0;
    }
    function jn_FloatBufferOverByteBuffer__init_($this, $start, $capacity, $byteBuffer, $position, $limit, $readOnly) {
        jn_Buffer__init_($this, $capacity);
        $this.$position = $position;
        $this.$limit0 = $limit;
        $this.$start2 = $start;
        $this.$byteByffer = $byteBuffer;
        $this.$readOnly2 = $readOnly;
    }
    function jn_FloatBufferOverByteBuffer_readOnly($this) {
        return $this.$readOnly2;
    }
    var jn_FloatBufferOverByteBufferLittleEndian = $rt_classWithoutFields(jn_FloatBufferOverByteBuffer);
    function jn_FloatBufferOverByteBufferLittleEndian_getElement($this, $index) {
        var var$2;
        var$2 = $this.$byteByffer.$array.data;
        $index = $this.$start2 + ($index * 4 | 0) | 0;
        return $rt_intBitsToFloat((var$2[$index] & 255) << 24 | (var$2[$index + 1 | 0] & 255) << 16 | (var$2[$index + 2 | 0] & 255) << 8 | var$2[$index + 3 | 0] & 255);
    }
    function jn_FloatBufferOverByteBufferLittleEndian_putElement($this, $index, $f) {
        var $value, var$4;
        $value = jl_Float_floatToIntBits($f);
        var$4 = $this.$byteByffer.$array.data;
        $index = $this.$start2 + ($index * 4 | 0) | 0;
        var$4[$index] = $value >> 24 << 24 >> 24;
        var$4[$index + 1 | 0] = $value >> 16 << 24 >> 24;
        var$4[$index + 2 | 0] = $value >> 8 << 24 >> 24;
        var$4[$index + 3 | 0] = $value << 24 >> 24;
    }
    var jn_FloatBufferOverByteBufferBigEndian = $rt_classWithoutFields(jn_FloatBufferOverByteBuffer);
    function jn_FloatBufferOverByteBufferBigEndian_getElement($this, $index) {
        var var$2;
        var$2 = $this.$byteByffer.$array.data;
        $index = $this.$start2 + ($index * 4 | 0) | 0;
        return $rt_intBitsToFloat(var$2[$index] & 255 | (var$2[$index + 1 | 0] & 255) << 8 | (var$2[$index + 2 | 0] & 255) << 16 | (var$2[$index + 3 | 0] & 255) << 24);
    }
    function jn_FloatBufferOverByteBufferBigEndian_putElement($this, $index, $f) {
        var $value, var$4;
        $value = jl_Float_floatToIntBits($f);
        var$4 = $this.$byteByffer.$array.data;
        $index = $this.$start2 + ($index * 4 | 0) | 0;
        var$4[$index] = $value << 24 >> 24;
        var$4[$index + 1 | 0] = $value >> 8 << 24 >> 24;
        var$4[$index + 2 | 0] = $value >> 16 << 24 >> 24;
        var$4[$index + 3 | 0] = $value >> 24 << 24 >> 24;
    }
    var jn_IntBufferImpl = $rt_classWithoutFields(jn_IntBuffer);
    function jn_IntBufferImpl__init_($this, $capacity, $position, $limit) {
        jn_Buffer__init_($this, $capacity);
        $this.$position = $position;
        $this.$limit0 = $limit;
    }
    function jn_IntBufferImpl_get($this) {
        var var$1, var$2;
        var$1 = $this.$position;
        if (var$1 < $this.$limit0) {
            $this.$position = var$1 + 1 | 0;
            return $this.$getElement0(var$1);
        }
        var$2 = new jn_BufferUnderflowException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    function jn_IntBufferImpl_put($this, $b) {
        var var$2, var$3;
        if ($this.$readOnly0) {
            var$2 = new jn_ReadOnlyBufferException;
            jl_Exception__init_(var$2);
            $rt_throw(var$2);
        }
        var$3 = $this.$position;
        if (var$3 >= $this.$limit0) {
            var$2 = new jn_BufferOverflowException;
            jl_Exception__init_(var$2);
            $rt_throw(var$2);
        }
        $this.$position = var$3 + 1 | 0;
        $this.$array1.data[var$3 + $this.$start0 | 0] = $b;
        return $this;
    }
    function jn_IntBufferImpl_get0($this, $index) {
        var var$2, var$3, var$4;
        if ($index >= 0 && $index < $this.$limit0)
            return $this.$getElement0($index);
        var$2 = new jl_IndexOutOfBoundsException;
        var$3 = $this.$limit0;
        var$4 = jl_StringBuilder__init_();
        jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append(var$4, $rt_s(175)), $index), $rt_s(11)), var$3), 41);
        jl_Throwable__init_(var$2, jl_StringBuilder_toString(var$4));
        $rt_throw(var$2);
    }
    function jn_IntBufferOverByteBuffer() {
        var a = this; jn_IntBufferImpl.call(a);
        a.$byteByffer0 = null;
        a.$readOnly3 = 0;
        a.$start3 = 0;
    }
    function jn_IntBufferOverByteBuffer__init_($this, $start, $capacity, $byteBuffer, $position, $limit, $readOnly) {
        jn_IntBufferImpl__init_($this, $capacity, $position, $limit);
        $this.$start3 = $start;
        $this.$byteByffer0 = $byteBuffer;
        $this.$readOnly3 = $readOnly;
    }
    function jn_IntBufferOverByteBuffer_getArray($this) {
        var var$1;
        var$1 = new jl_UnsupportedOperationException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var jn_IntBufferOverByteBufferLittleEndian = $rt_classWithoutFields(jn_IntBufferOverByteBuffer);
    function jn_IntBufferOverByteBufferLittleEndian_getElement($this, $index) {
        var var$2;
        var$2 = $this.$byteByffer0.$array.data;
        $index = $this.$start3 + ($index * 4 | 0) | 0;
        return var$2[$index] & 255 | (var$2[$index + 1 | 0] & 255) << 8 | (var$2[$index + 2 | 0] & 255) << 16 | (var$2[$index + 3 | 0] & 255) << 24;
    }
    var jn_IntBufferOverByteBufferBigEndian = $rt_classWithoutFields(jn_IntBufferOverByteBuffer);
    function jn_IntBufferOverByteBufferBigEndian_getElement($this, $index) {
        var var$2;
        var$2 = $this.$byteByffer0.$array.data;
        $index = $this.$start3 + ($index * 4 | 0) | 0;
        return (var$2[$index] & 255) << 24 | (var$2[$index + 1 | 0] & 255) << 16 | (var$2[$index + 2 | 0] & 255) << 8 | var$2[$index + 3 | 0] & 255;
    }
    var jn_BufferUnderflowException = $rt_classWithoutFields(jl_RuntimeException);
    var ju_Map$Entry = $rt_classWithoutFields(0);
    function ju_MapEntry() {
        var a = this; jl_Object.call(a);
        a.$key = null;
        a.$value0 = null;
    }
    function ju_HashMap$HashEntry() {
        var a = this; ju_MapEntry.call(a);
        a.$origKeyHash = 0;
        a.$next1 = null;
    }
    function ju_HashMap$HashEntry__init_(var_0, var_1) {
        var var_2 = new ju_HashMap$HashEntry();
        ju_HashMap$HashEntry__init_0(var_2, var_0, var_1);
        return var_2;
    }
    function ju_HashMap$HashEntry__init_0($this, $theKey, $hash) {
        var var$3;
        var$3 = null;
        $this.$key = $theKey;
        $this.$value0 = var$3;
        $this.$origKeyHash = $hash;
    }
    var ju_Arrays = $rt_classWithoutFields();
    function ju_Arrays_copyOf0($array, $length) {
        var $result, var$4, $sz, $i;
        $array = $array.data;
        $result = $rt_createByteArray($length);
        var$4 = $result.data;
        $sz = jl_Math_min($length, $array.length);
        $i = 0;
        while ($i < $sz) {
            var$4[$i] = $array[$i];
            $i = $i + 1 | 0;
        }
        return $result;
    }
    function ju_Arrays_copyOf($original, $newLength) {
        var var$3, $sz, $i;
        var$3 = jl_Class_getComponentType(jl_Object_getClass($original));
        if (var$3 === null) {
            var$3 = new jl_NullPointerException;
            jl_Exception__init_(var$3);
            $rt_throw(var$3);
        }
        if (var$3 === $rt_cls($rt_voidcls())) {
            var$3 = new jl_IllegalArgumentException;
            jl_Exception__init_(var$3);
            $rt_throw(var$3);
        }
        if ($newLength < 0) {
            var$3 = new jl_NegativeArraySizeException;
            jl_Exception__init_(var$3);
            $rt_throw(var$3);
        }
        $original = $original.data;
        var$3 = jlr_Array_newInstanceImpl(var$3.$platformClass, $newLength);
        $sz = jl_Math_min($newLength, $original.length);
        $i = 0;
        while ($i < $sz) {
            var$3.data[$i] = $original[$i];
            $i = $i + 1 | 0;
        }
        return var$3;
    }
    function ju_Arrays_fill($a, $val) {
        var var$3, var$4, var$5, var$6;
        $a = $a.data;
        var$3 = 0;
        var$4 = $a.length;
        if (var$3 > var$4) {
            var$5 = new jl_IllegalArgumentException;
            jl_Exception__init_(var$5);
            $rt_throw(var$5);
        }
        while (var$3 < var$4) {
            var$6 = var$3 + 1 | 0;
            $a[var$3] = $val;
            var$3 = var$6;
        }
    }
    var oli_Keyboard$1 = $rt_classWithoutFields();
    function oli_Keyboard$1__init_() {
        var var_0 = new oli_Keyboard$1();
        oli_Keyboard$1__init_0(var_0);
        return var_0;
    }
    function oli_Keyboard$1__init_0($this) {}
    function oli_Keyboard$1_handleEvent$exported$0(var$0, var$1) {
        oli_Keyboard_$callClinit();
        oli_Keyboard_keyStates.data[oli_Keyboard_remap(var$1.which)] = 1;
        ju_AbstractList_add(oli_Keyboard_keyEvents, otji_JSWrapper_wrap(var$1));
        var$1.preventDefault();
        var$1.stopPropagation();
    }
    var oli_Keyboard$2 = $rt_classWithoutFields();
    function oli_Keyboard$2__init_() {
        var var_0 = new oli_Keyboard$2();
        oli_Keyboard$2__init_0(var_0);
        return var_0;
    }
    function oli_Keyboard$2__init_0($this) {}
    function oli_Keyboard$2_handleEvent$exported$0(var$0, var$1) {
        oli_Keyboard_$callClinit();
        oli_Keyboard_keyStates.data[oli_Keyboard_remap(var$1.which)] = 0;
        ju_AbstractList_add(oli_Keyboard_keyEvents, otji_JSWrapper_wrap(var$1));
        var$1.preventDefault();
        var$1.stopPropagation();
    }
    var oli_Keyboard$3 = $rt_classWithoutFields();
    function oli_Keyboard$3__init_() {
        var var_0 = new oli_Keyboard$3();
        oli_Keyboard$3__init_0(var_0);
        return var_0;
    }
    function oli_Keyboard$3__init_0($this) {}
    function oli_Keyboard$3_handleEvent$exported$0(var$0, var$1) {
        oli_Keyboard_$callClinit();
        if (oli_Keyboard_repeat_enabled && (var$1.repeat ? 1 : 0))
            ju_AbstractList_add(oli_Keyboard_keyEvents, otji_JSWrapper_wrap(var$1));
        var$1.preventDefault();
        var$1.stopPropagation();
    }
    var ol_LWJGLException = $rt_classWithoutFields(jl_Exception);
    var oli_Mouse$1 = $rt_classWithoutFields();
    function oli_Mouse$1__init_() {
        var var_0 = new oli_Mouse$1();
        oli_Mouse$1__init_0(var_0);
        return var_0;
    }
    function oli_Mouse$1__init_0($this) {}
    function oli_Mouse$1_handleEvent$exported$0(var$0, var$1) {
        var$1.preventDefault();
        var$1.stopPropagation();
    }
    var oli_Mouse$2 = $rt_classWithoutFields();
    function oli_Mouse$2__init_() {
        var var_0 = new oli_Mouse$2();
        oli_Mouse$2__init_0(var_0);
        return var_0;
    }
    function oli_Mouse$2__init_0($this) {}
    function oli_Mouse$2_handleEvent$exported$0(var$0, var$1) {
        var var$2, var$3;
        var$2 = var$1.button;
        var$3 = oli_Mouse_buttonStates;
        if (var$2 == 1)
            var$2 = 2;
        else if (var$2 == 2)
            var$2 = 1;
        var$3.data[var$2] = 1;
        ju_AbstractList_add(oli_Mouse_mouseEvents, otji_JSWrapper_wrap(var$1));
        var$1.preventDefault();
        var$1.stopPropagation();
    }
    var oli_Mouse$3 = $rt_classWithoutFields();
    function oli_Mouse$3__init_() {
        var var_0 = new oli_Mouse$3();
        oli_Mouse$3__init_0(var_0);
        return var_0;
    }
    function oli_Mouse$3__init_0($this) {}
    function oli_Mouse$3_handleEvent$exported$0(var$0, var$1) {
        var var$2, var$3;
        var$2 = var$1.button;
        var$3 = oli_Mouse_buttonStates;
        if (var$2 == 1)
            var$2 = 2;
        else if (var$2 == 2)
            var$2 = 1;
        var$3.data[var$2] = 0;
        ju_AbstractList_add(oli_Mouse_mouseEvents, otji_JSWrapper_wrap(var$1));
        var$1.preventDefault();
        var$1.stopPropagation();
    }
    var oli_Mouse$4 = $rt_classWithoutFields();
    function oli_Mouse$4__init_() {
        var var_0 = new oli_Mouse$4();
        oli_Mouse$4__init_0(var_0);
        return var_0;
    }
    function oli_Mouse$4__init_0($this) {}
    function oli_Mouse$4_handleEvent$exported$0(var$0, var$1) {
        var var$2;
        var$1.preventDefault();
        var$1.stopPropagation();
        var$2 = m_WebGL_window.devicePixelRatio;
        oli_Mouse_x = var$1.offsetX * var$2 | 0;
        oli_Mouse_y = (m_WebGL_canvas.clientHeight - var$1.offsetY | 0) * var$2 | 0;
        oli_Mouse_dx = oli_Mouse_dx + var$1.movementX;
        oli_Mouse_dy = oli_Mouse_dy +  -var$1.movementY;
        olo_Display_$callClinit();
        if (olo_Display_isWindowActive)
            ju_AbstractList_add(oli_Mouse_mouseEvents, otji_JSWrapper_wrap(var$1));
    }
    var oli_Mouse$5 = $rt_classWithoutFields();
    function oli_Mouse$5__init_() {
        var var_0 = new oli_Mouse$5();
        oli_Mouse$5__init_0(var_0);
        return var_0;
    }
    function oli_Mouse$5__init_0($this) {}
    function oli_Mouse$5_handleEvent$exported$0(var$0, var$1) {
        var var$2;
        ju_AbstractList_add(oli_Mouse_mouseEvents, otji_JSWrapper_wrap(var$1));
        var$1.preventDefault();
        var$1.stopPropagation();
        var$2 = var$1.deltaY <= 0.0 ? (-1) : 1;
        oli_Mouse_dwheel = oli_Mouse_dwheel + var$2 | 0;
    }
    var oli_Mouse$6 = $rt_classWithoutFields();
    function oli_Mouse$6__init_() {
        var var_0 = new oli_Mouse$6();
        oli_Mouse$6__init_0(var_0);
        return var_0;
    }
    function oli_Mouse$6__init_0($this) {}
    function oli_Mouse$6_handleEvent$exported$0(var$0, var$1) {
        if (!($rt_globals.document.pointerLockElement != null ? 1 : 0))
            oli_Mouse_isGrabbed = 0;
        else
            oli_Mouse_isGrabbed = 1;
    }
    var oli_Mouse$7 = $rt_classWithoutFields();
    function oli_Mouse$7__init_() {
        var var_0 = new oli_Mouse$7();
        oli_Mouse$7__init_0(var_0);
        return var_0;
    }
    function oli_Mouse$7__init_0($this) {}
    function oli_Mouse$7_handleEvent$exported$0(var$0, var$1) {
        var$1.preventDefault();
        var$1.stopPropagation();
        oli_Mouse_isInsideWindow = 0;
    }
    var oli_Mouse$8 = $rt_classWithoutFields();
    function oli_Mouse$8__init_() {
        var var_0 = new oli_Mouse$8();
        oli_Mouse$8__init_0(var_0);
        return var_0;
    }
    function oli_Mouse$8__init_0($this) {}
    function oli_Mouse$8_handleEvent$exported$0(var$0, var$1) {
        var$1.preventDefault();
        var$1.stopPropagation();
        oli_Mouse_isInsideWindow = 1;
    }
    var ju_RandomAccess = $rt_classWithoutFields(0);
    function ju_ArrayList() {
        var a = this; ju_AbstractList.call(a);
        a.$array3 = null;
        a.$size1 = 0;
    }
    function ju_ArrayList__init_() {
        var var_0 = new ju_ArrayList();
        ju_ArrayList__init_0(var_0);
        return var_0;
    }
    function ju_ArrayList__init_0($this) {
        $this.$array3 = $rt_createArray(jl_Object, 10);
    }
    function ju_ArrayList_add($this, $element) {
        var var$2, var$3, var$4, var$5;
        var$2 = $this.$size1 + 1 | 0;
        var$3 = $this.$array3.data.length;
        if (var$3 < var$2) {
            var$2 = var$3 >= 1073741823 ? 2147483647 : jl_Math_max(var$2, jl_Math_max(var$3 * 2 | 0, 5));
            $this.$array3 = ju_Arrays_copyOf($this.$array3, var$2);
        }
        var$4 = $this.$array3.data;
        var$5 = $this.$size1;
        $this.$size1 = var$5 + 1 | 0;
        var$4[var$5] = $element;
        $this.$modCount0 = $this.$modCount0 + 1 | 0;
        return 1;
    }
    function jl_ClassLoader() {
        jl_Object.call(this);
        this.$parent = null;
    }
    var jl_ClassLoader_systemClassLoader = null;
    var jl_ClassLoader_resources = null;
    function jl_ClassLoader_$callClinit() {
        jl_ClassLoader_$callClinit = $rt_eraseClinit(jl_ClassLoader);
        jl_ClassLoader__clinit_();
    }
    function jl_ClassLoader_getResourceAsStream($this, $name) {
        var $dataString, $bytes, var$4, $i, var$6, var$7, var$8, var$9;
        jl_ClassLoader_$callClinit();
        if (jl_ClassLoader_resources === null)
            jl_ClassLoader_resources = {};
        $dataString = $rt_str(jl_ClassLoader_resourceToString$js_body$_6(jl_ClassLoader_resources[$rt_ustr($name)]));
        if ($dataString === null)
            return null;
        $bytes = $rt_createByteArray(jl_String_length($dataString));
        var$4 = $bytes.data;
        $i = 0;
        var$6 = var$4.length;
        while ($i < var$6) {
            var$4[$i] = jl_String_charAt($dataString, $i) << 24 >> 24;
            $i = $i + 1 | 0;
        }
        $name = new ji_ByteArrayInputStream;
        var$7 = otci_Base64Impl_reverse;
        $i = (var$6 / 4 | 0) * 3 | 0;
        var$8 = var$6 % 4 | 0;
        if (!(var$8 != 2 && var$8 != 3))
            $i = $i + (var$8 - 1 | 0) | 0;
        var$6 = var$6 - 1 | 0;
        while (var$6 >= 0 && var$4[var$6] == 61) {
            $i = $i + (-1) | 0;
            var$6 = var$6 + (-1) | 0;
        }
        var$4 = $rt_createByteArray($i);
        var$9 = var$4.data;
        otci_Base64Impl_decode($bytes, var$4, var$7);
        var$6 = var$9.length;
        $name.$buf = var$4;
        $name.$pos = 0;
        $name.$mark0 = 0;
        $name.$count1 = 0 + var$6 | 0;
        return $name;
    }
    function jl_ClassLoader__clinit_() {
        var var$1;
        var$1 = new jl_SystemClassLoader;
        jl_ClassLoader_$callClinit();
        var$1.$parent = null;
        jl_ClassLoader_systemClassLoader = var$1;
    }
    function jl_ClassLoader_resourceToString$js_body$_6(var$1) {
        return var$1 !== null && var$1 !== void 0 ? var$1 : null;
    }
    var jl_Readable = $rt_classWithoutFields(0);
    var jn_CharBuffer = $rt_classWithoutFields(jn_Buffer);
    function jnc_CodingErrorAction() {
        jl_Object.call(this);
        this.$name2 = null;
    }
    var jnc_CodingErrorAction_IGNORE = null;
    var jnc_CodingErrorAction_REPLACE = null;
    var jnc_CodingErrorAction_REPORT = null;
    function jnc_CodingErrorAction_$callClinit() {
        jnc_CodingErrorAction_$callClinit = $rt_eraseClinit(jnc_CodingErrorAction);
        jnc_CodingErrorAction__clinit_();
    }
    function jnc_CodingErrorAction__init_(var_0) {
        var var_1 = new jnc_CodingErrorAction();
        jnc_CodingErrorAction__init_0(var_1, var_0);
        return var_1;
    }
    function jnc_CodingErrorAction__init_0($this, $name) {
        jnc_CodingErrorAction_$callClinit();
        $this.$name2 = $name;
    }
    function jnc_CodingErrorAction__clinit_() {
        jnc_CodingErrorAction_IGNORE = jnc_CodingErrorAction__init_($rt_s(176));
        jnc_CodingErrorAction_REPLACE = jnc_CodingErrorAction__init_($rt_s(177));
        jnc_CodingErrorAction_REPORT = jnc_CodingErrorAction__init_($rt_s(178));
    }
    function cmrp_AABB() {
        var a = this; jl_Object.call(a);
        a.$epsilon = 0.0;
        a.$minX0 = 0.0;
        a.$minY0 = 0.0;
        a.$minZ0 = 0.0;
        a.$maxX0 = 0.0;
        a.$maxY0 = 0.0;
        a.$maxZ0 = 0.0;
    }
    function cmrp_AABB__init_(var_0, var_1, var_2, var_3, var_4, var_5) {
        var var_6 = new cmrp_AABB();
        cmrp_AABB__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
        return var_6;
    }
    function cmrp_AABB__init_0($this, $minX, $minY, $minZ, $maxX, $maxY, $maxZ) {
        $this.$epsilon = 0.0;
        $this.$minX0 = $minX;
        $this.$minY0 = $minY;
        $this.$minZ0 = $minZ;
        $this.$maxX0 = $maxX;
        $this.$maxY0 = $maxY;
        $this.$maxZ0 = $maxZ;
    }
    function cmrp_AABB_clipXCollide($this, $otherBoundingBox, $x) {
        var $max, $max_0;
        if ($otherBoundingBox.$maxY0 > $this.$minY0 && $otherBoundingBox.$minY0 < $this.$maxY0) {
            if ($otherBoundingBox.$maxZ0 > $this.$minZ0 && $otherBoundingBox.$minZ0 < $this.$maxZ0) {
                if ($x <= 0.0)
                    $max = $x;
                else {
                    $max = $otherBoundingBox.$maxX0;
                    $max_0 = $this.$minX0;
                    if ($max > $max_0)
                        $max = $x;
                    else {
                        $max = $max_0 - $max;
                        ju_Objects_requireNonNull($this);
                        $max = $max - 0.0;
                        if ($max >= $x)
                            $max = $x;
                    }
                }
                if ($max >= 0.0)
                    $max_0 = $max;
                else {
                    $x = $otherBoundingBox.$minX0;
                    $max_0 = $this.$maxX0;
                    if ($x < $max_0)
                        $max_0 = $max;
                    else {
                        $x = $max_0 - $x;
                        ju_Objects_requireNonNull($this);
                        $max_0 = $x + 0.0;
                        if ($max_0 <= $max)
                            $max_0 = $max;
                    }
                }
                return $max_0;
            }
            return $x;
        }
        return $x;
    }
    function cmrp_AABB_clipYCollide($this, $otherBoundingBox, $y) {
        var $max, $max_0;
        if ($otherBoundingBox.$maxX0 > $this.$minX0 && $otherBoundingBox.$minX0 < $this.$maxX0) {
            if ($otherBoundingBox.$maxZ0 > $this.$minZ0 && $otherBoundingBox.$minZ0 < $this.$maxZ0) {
                if ($y <= 0.0)
                    $max = $y;
                else {
                    $max = $otherBoundingBox.$maxY0;
                    $max_0 = $this.$minY0;
                    if ($max > $max_0)
                        $max = $y;
                    else {
                        $max = $max_0 - $max;
                        ju_Objects_requireNonNull($this);
                        $max = $max - 0.0;
                        if ($max >= $y)
                            $max = $y;
                    }
                }
                if ($max >= 0.0)
                    $max_0 = $max;
                else {
                    $y = $otherBoundingBox.$minY0;
                    $max_0 = $this.$maxY0;
                    if ($y < $max_0)
                        $max_0 = $max;
                    else {
                        $y = $max_0 - $y;
                        ju_Objects_requireNonNull($this);
                        $max_0 = $y + 0.0;
                        if ($max_0 <= $max)
                            $max_0 = $max;
                    }
                }
                return $max_0;
            }
            return $y;
        }
        return $y;
    }
    function cmrp_AABB_clipZCollide($this, $otherBoundingBox, $z) {
        var $max, $max_0;
        if ($otherBoundingBox.$maxX0 > $this.$minX0 && $otherBoundingBox.$minX0 < $this.$maxX0) {
            if ($otherBoundingBox.$maxY0 > $this.$minY0 && $otherBoundingBox.$minY0 < $this.$maxY0) {
                if ($z <= 0.0)
                    $max = $z;
                else {
                    $max = $otherBoundingBox.$maxZ0;
                    $max_0 = $this.$minZ0;
                    if ($max > $max_0)
                        $max = $z;
                    else {
                        $max = $max_0 - $max;
                        ju_Objects_requireNonNull($this);
                        $max = $max - 0.0;
                        if ($max >= $z)
                            $max = $z;
                    }
                }
                if ($max >= 0.0)
                    $max_0 = $max;
                else {
                    $z = $otherBoundingBox.$minZ0;
                    $max_0 = $this.$maxZ0;
                    if ($z < $max_0)
                        $max_0 = $max;
                    else {
                        $z = $max_0 - $z;
                        ju_Objects_requireNonNull($this);
                        $max_0 = $z + 0.0;
                        if ($max_0 <= $max)
                            $max_0 = $max;
                    }
                }
                return $max_0;
            }
            return $z;
        }
        return $z;
    }
    function cmrp_AABB_move($this, $x, $y, $z) {
        $this.$minX0 = $this.$minX0 + $x;
        $this.$minY0 = $this.$minY0 + $y;
        $this.$minZ0 = $this.$minZ0 + $z;
        $this.$maxX0 = $this.$maxX0 + $x;
        $this.$maxY0 = $this.$maxY0 + $y;
        $this.$maxZ0 = $this.$maxZ0 + $z;
    }
    var jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException);
    var jn_CharBufferImpl = $rt_classWithoutFields(jn_CharBuffer);
    function jn_CharBufferOverArray() {
        var a = this; jn_CharBufferImpl.call(a);
        a.$readOnly1 = 0;
        a.$start1 = 0;
        a.$array2 = null;
    }
    function jnc_CharsetEncoder() {
        var a = this; jl_Object.call(a);
        a.$charset0 = null;
        a.$replacement = null;
        a.$averageBytesPerChar = 0.0;
        a.$maxBytesPerChar = 0.0;
        a.$malformedAction = null;
        a.$unmappableAction = null;
        a.$status = 0;
    }
    function jnc_CoderResult() {
        var a = this; jl_Object.call(a);
        a.$kind = 0;
        a.$length2 = 0;
    }
    var jnc_CoderResult_UNDERFLOW = null;
    var jnc_CoderResult_OVERFLOW = null;
    function jnc_CoderResult__init_(var_0, var_1) {
        var var_2 = new jnc_CoderResult();
        jnc_CoderResult__init_0(var_2, var_0, var_1);
        return var_2;
    }
    function jnc_CoderResult__init_0($this, $kind, $length) {
        $this.$kind = $kind;
        $this.$length2 = $length;
    }
    function jnc_CoderResult_isOverflow($this) {
        return $this.$kind != 1 ? 0 : 1;
    }
    function jnc_CoderResult_isUnmappable($this) {
        return $this.$kind != 3 ? 0 : 1;
    }
    function jnc_CoderResult_malformedForLength($length) {
        return jnc_CoderResult__init_(2, $length);
    }
    function jnc_CoderResult__clinit_() {
        jnc_CoderResult_UNDERFLOW = jnc_CoderResult__init_(0, 0);
        jnc_CoderResult_OVERFLOW = jnc_CoderResult__init_(1, 0);
    }
    var jl_SystemClassLoader = $rt_classWithoutFields(jl_ClassLoader);
    var jl_UnsupportedOperationException = $rt_classWithoutFields(jl_RuntimeException);
    var jn_ReadOnlyBufferException = $rt_classWithoutFields(jl_UnsupportedOperationException);
    var ji_DataOutput = $rt_classWithoutFields(0);
    function ji_DataOutputStream() {
        var a = this; ji_FilterOutputStream.call(a);
        a.$written = 0;
        a.$buff = null;
    }
    function ji_DataOutputStream__init_(var_0) {
        var var_1 = new ji_DataOutputStream();
        ji_DataOutputStream__init_0(var_1, var_0);
        return var_1;
    }
    function ji_DataOutputStream__init_0($this, $out) {
        ji_FilterOutputStream__init_($this, $out);
        $this.$buff = $rt_createByteArray(8);
    }
    function ji_DataOutputStream_write($this, $buffer, $offset, $count) {
        var var$4;
        if ($buffer === null) {
            var$4 = new jl_NullPointerException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        $this.$out.$write0($buffer, $offset, $count);
        $this.$written = $this.$written + $count | 0;
    }
    function juz_DeflaterOutputStream() {
        var a = this; ji_FilterOutputStream.call(a);
        a.$buf0 = null;
        a.$def = null;
        a.$done = 0;
    }
    function juz_DeflaterOutputStream_close($this) {
        var var$1, var$2;
        var$1 = $this.$def;
        if (!var$1.$finished) {
            if (!$this.$done) {
                var$1.$flushParm = 4;
                while (true) {
                    var$1 = $this.$def;
                    if (var$1.$finished)
                        break;
                    if (juz_Deflater_needsInput(var$1))
                        juz_Deflater_setInput($this.$def, $this.$buf0, 0, 0);
                    var$2 = juz_Deflater_deflate($this.$def, $this.$buf0);
                    $this.$out.$write0($this.$buf0, 0, var$2);
                }
                $this.$done = 1;
            }
            juz_GZIPOutputStream_writeLong($this, juz_CRC32_getValue($this.$crc));
            juz_GZIPOutputStream_writeLong($this, $this.$crc.$tbytes);
        }
        $this.$def.$impl = null;
        $this.$out.$close();
    }
    function juz_DeflaterOutputStream_write($this, $i) {
        var $b;
        $b = $rt_createByteArray(1);
        $b.data[0] = $i << 24 >> 24;
        juz_GZIPOutputStream_write($this, $b, 0, 1);
    }
    function juz_GZIPOutputStream() {
        juz_DeflaterOutputStream.call(this);
        this.$crc = null;
    }
    function juz_GZIPOutputStream__init_(var_0) {
        var var_1 = new juz_GZIPOutputStream();
        juz_GZIPOutputStream__init_0(var_1, var_0);
        return var_1;
    }
    function juz_GZIPOutputStream__init_0($this, $os) {
        var var$2, $$je;
        var$2 = new juz_Deflater;
        var$2.$flushParm = 0;
        var$2.$compressLevel = (-1);
        var$2.$strategy = 0;
        var$2.$compressLevel = (-1);
        a: {
            try {
                var$2.$impl = cjj_Deflater__init_((-1), 1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof cjj_GZIPException) {
                } else {
                    throw $$e;
                }
            }
        }
        var$2.$nowrap = 1;
        ji_FilterOutputStream__init_($this, $os);
        if ($os === null) {
            $os = new jl_NullPointerException;
            jl_Exception__init_($os);
            $rt_throw($os);
        }
        $this.$def = var$2;
        $this.$buf0 = $rt_createByteArray(512);
        $this.$crc = juz_CRC32__init_();
        $this.$out.$write1(31);
        $this.$out.$write1(139);
        $this.$out.$write1(8);
        $this.$out.$write1(0);
        juz_GZIPOutputStream_writeLong($this, Long_ZERO);
        $this.$out.$write1(0);
        $this.$out.$write1(0);
    }
    function juz_GZIPOutputStream_flush($this) {
        var var$1, var$2, $count;
        var$1 = $this.$def;
        var$2 = $this.$buf0;
        $count = juz_Deflater_deflate0(var$1, var$2, 0, var$2.data.length, 2);
        $this.$out.$write0($this.$buf0, 0, $count);
        $this.$out.$flush();
    }
    function juz_GZIPOutputStream_write($this, $buffer, $off, $nbytes) {
        var var$4, var$5;
        if ($this.$done) {
            var$4 = new ji_IOException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        var$5 = $buffer.data.length;
        if ($off <= var$5 && $nbytes >= 0 && $off >= 0 && (var$5 - $off | 0) >= $nbytes) {
            if (!juz_Deflater_needsInput($this.$def)) {
                var$4 = new ji_IOException;
                jl_Exception__init_(var$4);
                $rt_throw(var$4);
            }
            juz_Deflater_setInput($this.$def, $buffer, $off, $nbytes);
            while (true) {
                var$5 = juz_Deflater_deflate($this.$def, $this.$buf0);
                $this.$out.$write0($this.$buf0, 0, var$5);
                if (!juz_Deflater_needsInput($this.$def))
                    continue;
                else
                    break;
            }
            juz_CRC32_update($this.$crc, $buffer, $off, $nbytes);
            return;
        }
        var$4 = new jl_ArrayIndexOutOfBoundsException;
        jl_Exception__init_(var$4);
        $rt_throw(var$4);
    }
    function juz_GZIPOutputStream_writeLong($this, $i) {
        var $unsigned;
        $unsigned = Long_lo($i);
        $this.$out.$write1($unsigned & 255);
        $this.$out.$write1($unsigned >> 8 & 255);
        $this.$out.$write1($unsigned >> 16 & 255);
        $this.$out.$write1($unsigned >> 24 & 255);
        return $i;
    }
    function ji_FileOutputStream() {
        ji_OutputStream.call(this);
        this.$accessor = null;
    }
    var ji_FileOutputStream_ONE_BYTE_BUFER = null;
    function ji_FileOutputStream__init_(var_0) {
        var var_1 = new ji_FileOutputStream();
        ji_FileOutputStream__init_0(var_1, var_0);
        return var_1;
    }
    function ji_FileOutputStream__init_0($this, $path) {
        var var$2, var$3, $$je;
        var$2 = ji_File__init_($path);
        if (jl_String_isEmpty(ji_File_getName(var$2))) {
            $path = new ji_FileNotFoundException;
            jl_Throwable__init_($path, $rt_s(179));
            $rt_throw($path);
        }
        var$3 = ji_File_getCanonicalPathImpl(var$2);
        if (!jl_String_isEmpty(var$3) && !jl_String_equals(var$3, $rt_s(2))) {
            $path = ji_File__init_(var$3);
            $path = ji_File_findVirtualFile(ji_File_getParent($path) === null ? null : ji_File__init_(ji_File_getParent($path)));
        } else
            $path = null;
        if ($path !== null) {
            var$3 = otrfm_VirtualFileImpl_findInMemory($path);
            if (var$3 !== null && var$3.$isDirectory() ? 1 : 0)
                a: {
                    try {
                        otrfm_VirtualFileImpl_createFile($path, ji_File_getName(var$2));
                        break a;
                    } catch ($$e) {
                        $$je = $rt_wrapException($$e);
                        if ($$je instanceof ji_IOException) {
                        } else {
                            throw $$e;
                        }
                    }
                    $path = new ji_FileNotFoundException;
                    jl_Exception__init_($path);
                    $rt_throw($path);
                }
        }
        $path = ji_File_findVirtualFile(var$2);
        if ($path !== null && otrfm_VirtualFileImpl_isFile($path)) {
            $path = otrfm_VirtualFileImpl_createAccessor($path, 0, 1, 0);
            $this.$accessor = $path;
            if ($path !== null)
                return;
            $path = new ji_FileNotFoundException;
            jl_Exception__init_($path);
            $rt_throw($path);
        }
        var$2 = new ji_FileNotFoundException;
        jl_Throwable__init_(var$2, $rt_s(180));
        $rt_throw(var$2);
    }
    function ji_FileOutputStream_write($this, $b, $off, $len) {
        var var$4;
        ju_Objects_requireNonNull($b);
        if ($off >= 0 && $len >= 0 && $off <= ($b.data.length - $len | 0)) {
            ji_FileOutputStream_ensureOpened($this);
            otrfm_InMemoryVirtualFile$1_write($this.$accessor, $b, $off, $len);
            return;
        }
        var$4 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$4);
        $rt_throw(var$4);
    }
    function ji_FileOutputStream_flush($this) {
        ji_FileOutputStream_ensureOpened($this);
    }
    function ji_FileOutputStream_close($this) {
        $this.$accessor = null;
    }
    function ji_FileOutputStream_write0($this, $b) {
        var $buffer;
        ji_FileOutputStream_ensureOpened($this);
        $buffer = ji_FileOutputStream_ONE_BYTE_BUFER;
        $buffer.data[0] = $b << 24 >> 24;
        otrfm_InMemoryVirtualFile$1_write($this.$accessor, $buffer, 0, 1);
    }
    function ji_FileOutputStream_ensureOpened($this) {
        var var$1;
        if ($this.$accessor !== null)
            return;
        var$1 = new ji_IOException;
        jl_Throwable__init_(var$1, $rt_s(181));
        $rt_throw(var$1);
    }
    function ji_FileOutputStream__clinit_() {
        ji_FileOutputStream_ONE_BYTE_BUFER = $rt_createByteArray(1);
    }
    function cmrl_Frustum() {
        var a = this; jl_Object.call(a);
        a.$m_Frustum = null;
        a.$modl_b = null;
        a.$proj_b = null;
    }
    var cmrl_Frustum_frustum = null;
    function cmrl_Frustum_$callClinit() {
        cmrl_Frustum_$callClinit = $rt_eraseClinit(cmrl_Frustum);
        cmrl_Frustum__clinit_();
    }
    function cmrl_Frustum_normalizePlane($this, $frustum, $side) {
        var $magnitude, var$4;
        $frustum = $frustum.data;
        $magnitude = jl_Math_sqrt($frustum[$side].data[0] * $frustum[$side].data[0] + $frustum[$side].data[1] * $frustum[$side].data[1] + $frustum[$side].data[2] * $frustum[$side].data[2]);
        var$4 = $frustum[$side].data;
        var$4[0] = var$4[0] / $magnitude;
        var$4 = $frustum[$side].data;
        var$4[1] = var$4[1] / $magnitude;
        var$4 = $frustum[$side].data;
        var$4[2] = var$4[2] / $magnitude;
        $frustum = $frustum[$side].data;
        $frustum[3] = $frustum[3] / $magnitude;
    }
    function cmrl_Frustum_calculateFrustum($this) {
        var $proj, var$2, $modl, var$4, $clip;
        $proj = $rt_createFloatArray(16);
        var$2 = $proj.data;
        $modl = $rt_createFloatArray(16);
        var$4 = $modl.data;
        $clip = $rt_createFloatArray(16).data;
        jn_FloatBuffer_rewind($this.$proj_b);
        olo_GL11_glGetFloat(2983, $this.$proj_b);
        jn_FloatBuffer_rewind($this.$proj_b);
        jn_FloatBuffer_get0($this.$proj_b, $proj);
        jn_FloatBuffer_rewind($this.$modl_b);
        olo_GL11_glGetFloat(2982, $this.$modl_b);
        jn_FloatBuffer_rewind($this.$modl_b);
        jn_FloatBuffer_get0($this.$modl_b, $modl);
        $clip[0] = var$4[0] * var$2[0] + var$4[1] * var$2[4] + var$4[2] * var$2[8] + var$4[3] * var$2[12];
        $clip[1] = var$4[0] * var$2[1] + var$4[1] * var$2[5] + var$4[2] * var$2[9] + var$4[3] * var$2[13];
        $clip[2] = var$4[0] * var$2[2] + var$4[1] * var$2[6] + var$4[2] * var$2[10] + var$4[3] * var$2[14];
        $clip[3] = var$4[0] * var$2[3] + var$4[1] * var$2[7] + var$4[2] * var$2[11] + var$4[3] * var$2[15];
        $clip[4] = var$4[4] * var$2[0] + var$4[5] * var$2[4] + var$4[6] * var$2[8] + var$4[7] * var$2[12];
        $clip[5] = var$4[4] * var$2[1] + var$4[5] * var$2[5] + var$4[6] * var$2[9] + var$4[7] * var$2[13];
        $clip[6] = var$4[4] * var$2[2] + var$4[5] * var$2[6] + var$4[6] * var$2[10] + var$4[7] * var$2[14];
        $clip[7] = var$4[4] * var$2[3] + var$4[5] * var$2[7] + var$4[6] * var$2[11] + var$4[7] * var$2[15];
        $clip[8] = var$4[8] * var$2[0] + var$4[9] * var$2[4] + var$4[10] * var$2[8] + var$4[11] * var$2[12];
        $clip[9] = var$4[8] * var$2[1] + var$4[9] * var$2[5] + var$4[10] * var$2[9] + var$4[11] * var$2[13];
        $clip[10] = var$4[8] * var$2[2] + var$4[9] * var$2[6] + var$4[10] * var$2[10] + var$4[11] * var$2[14];
        $clip[11] = var$4[8] * var$2[3] + var$4[9] * var$2[7] + var$4[10] * var$2[11] + var$4[11] * var$2[15];
        $clip[12] = var$4[12] * var$2[0] + var$4[13] * var$2[4] + var$4[14] * var$2[8] + var$4[15] * var$2[12];
        $clip[13] = var$4[12] * var$2[1] + var$4[13] * var$2[5] + var$4[14] * var$2[9] + var$4[15] * var$2[13];
        $clip[14] = var$4[12] * var$2[2] + var$4[13] * var$2[6] + var$4[14] * var$2[10] + var$4[15] * var$2[14];
        $clip[15] = var$4[12] * var$2[3] + var$4[13] * var$2[7] + var$4[14] * var$2[11] + var$4[15] * var$2[15];
        $proj = $this.$m_Frustum;
        $modl = $proj.data;
        $modl[0].data[0] = $clip[3] - $clip[0];
        $modl[0].data[1] = $clip[7] - $clip[4];
        $modl[0].data[2] = $clip[11] - $clip[8];
        $modl[0].data[3] = $clip[15] - $clip[12];
        cmrl_Frustum_normalizePlane($this, $proj, 0);
        $proj = $this.$m_Frustum;
        $modl = $proj.data;
        $modl[1].data[0] = $clip[3] + $clip[0];
        $modl[1].data[1] = $clip[7] + $clip[4];
        $modl[1].data[2] = $clip[11] + $clip[8];
        $modl[1].data[3] = $clip[15] + $clip[12];
        cmrl_Frustum_normalizePlane($this, $proj, 1);
        $proj = $this.$m_Frustum;
        $modl = $proj.data;
        $modl[2].data[0] = $clip[3] + $clip[1];
        $modl[2].data[1] = $clip[7] + $clip[5];
        $modl[2].data[2] = $clip[11] + $clip[9];
        $modl[2].data[3] = $clip[15] + $clip[13];
        cmrl_Frustum_normalizePlane($this, $proj, 2);
        $proj = $this.$m_Frustum;
        $modl = $proj.data;
        $modl[3].data[0] = $clip[3] - $clip[1];
        $modl[3].data[1] = $clip[7] - $clip[5];
        $modl[3].data[2] = $clip[11] - $clip[9];
        $modl[3].data[3] = $clip[15] - $clip[13];
        cmrl_Frustum_normalizePlane($this, $proj, 3);
        $proj = $this.$m_Frustum;
        $modl = $proj.data;
        $modl[4].data[0] = $clip[3] - $clip[2];
        $modl[4].data[1] = $clip[7] - $clip[6];
        $modl[4].data[2] = $clip[11] - $clip[10];
        $modl[4].data[3] = $clip[15] - $clip[14];
        cmrl_Frustum_normalizePlane($this, $proj, 4);
        $proj = $this.$m_Frustum;
        $modl = $proj.data;
        $modl[5].data[0] = $clip[3] + $clip[2];
        $modl[5].data[1] = $clip[7] + $clip[6];
        $modl[5].data[2] = $clip[11] + $clip[10];
        $modl[5].data[3] = $clip[15] + $clip[14];
        cmrl_Frustum_normalizePlane($this, $proj, 5);
    }
    function cmrl_Frustum_cubeInFrustum($this, $minX, $minY, $minZ, $maxX, $maxY, $maxZ) {
        var $i, var$8;
        $i = 0;
        while ($i < 6) {
            var$8 = $this.$m_Frustum.data;
            if (var$8[$i].data[0] * $minX + var$8[$i].data[1] * $minY + var$8[$i].data[2] * $minZ + var$8[$i].data[3] <= 0.0 && var$8[$i].data[0] * $maxX + var$8[$i].data[1] * $minY + var$8[$i].data[2] * $minZ + var$8[$i].data[3] <= 0.0 && var$8[$i].data[0] * $minX + var$8[$i].data[1] * $maxY + var$8[$i].data[2] * $minZ + var$8[$i].data[3] <= 0.0 && var$8[$i].data[0] * $maxX + var$8[$i].data[1] * $maxY + var$8[$i].data[2] * $minZ + var$8[$i].data[3] <= 0.0 && var$8[$i].data[0] * $minX + var$8[$i].data[1] * $minY
            + var$8[$i].data[2] * $maxZ + var$8[$i].data[3] <= 0.0 && var$8[$i].data[0] * $maxX + var$8[$i].data[1] * $minY + var$8[$i].data[2] * $maxZ + var$8[$i].data[3] <= 0.0 && var$8[$i].data[0] * $minX + var$8[$i].data[1] * $maxY + var$8[$i].data[2] * $maxZ + var$8[$i].data[3] <= 0.0 && var$8[$i].data[0] * $maxX + var$8[$i].data[1] * $maxY + var$8[$i].data[2] * $maxZ + var$8[$i].data[3] <= 0.0)
                return 0;
            $i = $i + 1 | 0;
        }
        return 1;
    }
    function cmrl_Frustum__clinit_() {
        var var$1;
        var$1 = new cmrl_Frustum;
        cmrl_Frustum_$callClinit();
        var$1.$m_Frustum = $rt_createFloatMultiArray([4, 6]);
        var$1.$modl_b = ol_BufferUtils_createFloatBuffer(16);
        var$1.$proj_b = ol_BufferUtils_createFloatBuffer(16);
        cmrl_Frustum_frustum = var$1;
    }
    function cmrl_Tile() {
        jl_Object.call(this);
        this.$textureId = 0;
    }
    var cmrl_Tile_grass = null;
    var cmrl_Tile_rock = null;
    function cmrl_Tile__init_(var_0) {
        var var_1 = new cmrl_Tile();
        cmrl_Tile__init_0(var_1, var_0);
        return var_1;
    }
    function cmrl_Tile__init_0($this, $textureId) {
        $this.$textureId = $textureId;
    }
    function cmrl_Tile_render($this, $tessellator, $level, $layer, $x, $y, $z) {
        var $minU, $maxU, $brightness, $minX, $maxX, $minY, $maxY, $minZ, $maxZ, var$16, var$17;
        $minU = $this.$textureId / 16.0;
        $maxU = $minU + 0.0625;
        $brightness = $x;
        $minX = $brightness + 0.0;
        $maxX = $brightness + 1.0;
        $brightness = $y;
        $minY = $brightness + 0.0;
        $maxY = $brightness + 1.0;
        $brightness = $z;
        $minZ = $brightness + 0.0;
        $maxZ = $brightness + 1.0;
        var$16 = $y - 1 | 0;
        if (!cmrl_Level_isTile($level, $x, var$16, $z)) {
            $brightness = cmrl_Level_getBrightness($level, $x, var$16, $z) * 1.0;
            if (($layer != 1 ? 0 : 1) ^ ($brightness !== 1.0 ? 0 : 1)) {
                cmrl_Tessellator_color($tessellator, $brightness, $brightness, $brightness);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $minX, $minY, $maxZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $minX, $minY, $minZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $minZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $maxZ);
            }
        }
        var$16 = $y + 1 | 0;
        if (!cmrl_Level_isTile($level, $x, var$16, $z)) {
            $brightness = cmrl_Level_getBrightness($level, $x, var$16, $z) * 1.0;
            if (($layer != 1 ? 0 : 1) ^ ($brightness !== 1.0 ? 0 : 1)) {
                cmrl_Tessellator_color($tessellator, $brightness, $brightness, $brightness);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $maxZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $minZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $minZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $maxZ);
            }
        }
        var$16 = $z - 1 | 0;
        if (!cmrl_Level_isTile($level, $x, $y, var$16)) {
            $brightness = cmrl_Level_getBrightness($level, $x, $y, var$16) * 0.800000011920929;
            if (($layer != 1 ? 0 : 1) ^ ($brightness !== 0.800000011920929 ? 0 : 1)) {
                cmrl_Tessellator_color($tessellator, $brightness, $brightness, $brightness);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $minZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $minZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $minZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $minX, $minY, $minZ);
            }
        }
        var$17 = $z + 1 | 0;
        if (!cmrl_Level_isTile($level, $x, $y, var$17)) {
            $brightness = cmrl_Level_getBrightness($level, $x, $y, var$17) * 0.800000011920929;
            if (($layer != 1 ? 0 : 1) ^ ($brightness !== 0.800000011920929 ? 0 : 1)) {
                cmrl_Tessellator_color($tessellator, $brightness, $brightness, $brightness);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $maxZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $minX, $minY, $maxZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $maxZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $maxZ);
            }
        }
        var$17 = $x - 1 | 0;
        if (!cmrl_Level_isTile($level, var$17, $y, $z)) {
            $brightness = cmrl_Level_getBrightness($level, var$17, $y, $z) * 0.6000000238418579;
            if (($layer != 1 ? 0 : 1) ^ ($brightness !== 0.6000000238418579 ? 0 : 1)) {
                cmrl_Tessellator_color($tessellator, $brightness, $brightness, $brightness);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $maxZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $minZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $minX, $minY, $minZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $minX, $minY, $maxZ);
            }
        }
        $x = $x + 1 | 0;
        if (!cmrl_Level_isTile($level, $x, $y, $z)) {
            $brightness = cmrl_Level_getBrightness($level, $x, $y, $z) * 0.6000000238418579;
            if (($layer != 1 ? 0 : 1) ^ ($brightness !== 0.6000000238418579 ? 0 : 1)) {
                cmrl_Tessellator_color($tessellator, $brightness, $brightness, $brightness);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $maxZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0625);
                cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $minZ);
                cmrl_Tessellator_texture($tessellator, $maxU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $minZ);
                cmrl_Tessellator_texture($tessellator, $minU, 0.0);
                cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $maxZ);
            }
        }
    }
    function cmrl_Tile_renderFace($this, $tessellator, $x, $y, $z, $face) {
        var $maxZ, $minX, $maxX, $minZ, $minY, $maxY, var$12;
        $maxZ = $x;
        $minX = $maxZ + 0.0;
        $maxX = $maxZ + 1.0;
        $minZ = $y;
        $minY = $minZ + 0.0;
        $maxY = $minZ + 1.0;
        var$12 = $z;
        $minZ = var$12 + 0.0;
        $maxZ = var$12 + 1.0;
        if (!$face) {
            cmrl_Tessellator_vertex($tessellator, $minX, $minY, $maxZ);
            cmrl_Tessellator_vertex($tessellator, $minX, $minY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $maxZ);
        }
        if ($face == 1) {
            cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $maxZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $maxZ);
        }
        if ($face == 2) {
            cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $minX, $minY, $minZ);
        }
        if ($face == 3) {
            cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $maxZ);
            cmrl_Tessellator_vertex($tessellator, $minX, $minY, $maxZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $maxZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $maxZ);
        }
        if ($face == 4) {
            cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $maxZ);
            cmrl_Tessellator_vertex($tessellator, $minX, $maxY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $minX, $minY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $minX, $minY, $maxZ);
        }
        if ($face == 5) {
            cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $maxZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $minY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $minZ);
            cmrl_Tessellator_vertex($tessellator, $maxX, $maxY, $maxZ);
        }
    }
    function cmrl_Tile__clinit_() {
        cmrl_Tile_grass = cmrl_Tile__init_(0);
        cmrl_Tile_rock = cmrl_Tile__init_(1);
    }
    var jn_BufferOverflowException = $rt_classWithoutFields(jl_RuntimeException);
    var ju_Iterator = $rt_classWithoutFields(0);
    var ju_ListIterator = $rt_classWithoutFields(0);
    function ju_LinkedList$SequentialListIterator() {
        var a = this; jl_Object.call(a);
        a.$nextEntry = null;
        a.$prevEntry = null;
        a.$currentEntry = null;
        a.$index = 0;
        a.$version = 0;
        a.$this$0 = null;
    }
    function ju_LinkedList$SequentialListIterator__init_(var_0, var_1, var_2, var_3) {
        var var_4 = new ju_LinkedList$SequentialListIterator();
        ju_LinkedList$SequentialListIterator__init_0(var_4, var_0, var_1, var_2, var_3);
        return var_4;
    }
    function ju_LinkedList$SequentialListIterator__init_0($this, var$1, $nextEntry, $prevEntry, $index) {
        $this.$this$0 = var$1;
        $this.$version = var$1.$modCount0;
        $this.$nextEntry = $nextEntry;
        $this.$prevEntry = $prevEntry;
        $this.$index = $index;
    }
    function ju_LinkedList$SequentialListIterator_checkConcurrentModification($this) {
        var var$1;
        if ($this.$version >= $this.$this$0.$modCount0)
            return;
        var$1 = new ju_ConcurrentModificationException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    function ju_LinkedList$Entry() {
        var a = this; jl_Object.call(a);
        a.$item = null;
        a.$next2 = null;
        a.$previous = null;
    }
    function ji_FilterInputStream() {
        ji_InputStream.call(this);
        this.$in = null;
    }
    function ji_FilterInputStream__init_(var_0) {
        var var_1 = new ji_FilterInputStream();
        ji_FilterInputStream__init_0(var_1, var_0);
        return var_1;
    }
    function ji_FilterInputStream__init_0($this, $in) {
        $this.$in = $in;
    }
    function ji_FilterInputStream_close($this) {
        $this.$in.$close();
    }
    function ji_FilterInputStream_read($this, $buffer) {
        return juz_GZIPInputStream_read($this, $buffer, 0, $buffer.data.length);
    }
    var ji_DataInput = $rt_classWithoutFields(0);
    function ji_DataInputStream() {
        ji_FilterInputStream.call(this);
        this.$buff0 = null;
    }
    function ji_DataInputStream__init_(var_0) {
        var var_1 = new ji_DataInputStream();
        ji_DataInputStream__init_0(var_1, var_0);
        return var_1;
    }
    function ji_DataInputStream__init_0($this, $in) {
        ji_FilterInputStream__init_0($this, $in);
        $this.$buff0 = $rt_createByteArray(8);
    }
    function ji_DataInputStream_readFully($this, $buffer) {
        var var$2, var$3, var$4, var$5, var$6;
        var$2 = $buffer.data;
        var$3 = 0;
        var$4 = var$2.length;
        if (var$4 < 0) {
            var$5 = new jl_IndexOutOfBoundsException;
            jl_Exception__init_(var$5);
            $rt_throw(var$5);
        }
        if (var$4) {
            if ($this.$in === null) {
                var$5 = new jl_NullPointerException;
                jl_Exception__init_(var$5);
                $rt_throw(var$5);
            }
            if (var$3 > (var$4 - var$4 | 0)) {
                var$5 = new jl_IndexOutOfBoundsException;
                jl_Exception__init_(var$5);
                $rt_throw(var$5);
            }
            while (var$4 > 0) {
                var$6 = $this.$in.$read0($buffer, var$3, var$4);
                if (var$6 < 0) {
                    var$5 = new ji_EOFException;
                    jl_Exception__init_(var$5);
                    $rt_throw(var$5);
                }
                var$3 = var$3 + var$6 | 0;
                var$4 = var$4 - var$6 | 0;
            }
        }
    }
    function juz_InflaterInputStream() {
        var a = this; ji_FilterInputStream.call(a);
        a.$inf = null;
        a.$buf1 = null;
        a.$len = 0;
        a.$closed = 0;
        a.$eof = 0;
    }
    function juz_InflaterInputStream_read($this) {
        var $b;
        $b = $rt_createByteArray(1);
        if (juz_GZIPInputStream_read($this, $b, 0, 1) == (-1))
            return (-1);
        return $b.data[0] & 255;
    }
    function juz_InflaterInputStream_read0($this, $buffer, $off, $nbytes) {
        var $e, var$5, $result, var$7, var$8, var$9, $$je;
        if ($this.$closed) {
            $e = new ji_IOException;
            jl_Throwable__init_($e, $rt_s(182));
            $rt_throw($e);
        }
        if (null === $buffer) {
            $e = new jl_NullPointerException;
            jl_Exception__init_($e);
            $rt_throw($e);
        }
        if ($off >= 0 && $nbytes >= 0) {
            var$5 = $buffer.data;
            $result = $off + $nbytes | 0;
            var$7 = var$5.length;
            if ($result <= var$7) {
                if (!$nbytes)
                    return 0;
                if ($this.$eof)
                    return (-1);
                if ($off <= var$7 && (var$7 - $off | 0) >= $nbytes) {
                    a: {
                        b: {
                            c: {
                                d: {
                                    e: {
                                        f: {
                                            while (true) {
                                                if (juz_Inflater_needsInput($this.$inf)) {
                                                    if ($this.$closed)
                                                        break;
                                                    $result = $this.$in.$read($this.$buf1);
                                                    $this.$len = $result;
                                                    if ($result > 0) {
                                                        $e = $this.$inf;
                                                        var$5 = $this.$buf1;
                                                        var$8 = $e.$impl0;
                                                        if (var$8 === null) {
                                                            $e = new jl_IllegalStateException;
                                                            jl_Exception__init_($e);
                                                            $rt_throw($e);
                                                        }
                                                        var$9 = var$5.data.length;
                                                        if (0 > var$9)
                                                            break f;
                                                        if ($result < 0)
                                                            break f;
                                                        if ((var$9 - 0 | 0) < $result)
                                                            break f;
                                                        $e.$inRead = 0;
                                                        $e.$inLength = $result;
                                                        cjj_ZStream_setInput(var$8, var$5, 0, $result, 0);
                                                    }
                                                }
                                                try {
                                                    $result = juz_Inflater_inflate($this.$inf, $buffer, $off, $nbytes);
                                                    var$7 = juz_Inflater_finished($this.$inf);
                                                    $this.$eof = var$7;
                                                    if ($result > 0)
                                                        break e;
                                                    if (var$7)
                                                        break d;
                                                    if (juz_Inflater_needsDictionary($this.$inf))
                                                        break b;
                                                    if ($this.$len == (-1))
                                                        break c;
                                                    continue;
                                                } catch ($$e) {
                                                    $$je = $rt_wrapException($$e);
                                                    if ($$je instanceof juz_DataFormatException) {
                                                        $e = $$je;
                                                        break a;
                                                    } else {
                                                        throw $$e;
                                                    }
                                                }
                                            }
                                            $e = new ji_IOException;
                                            jl_Exception__init_($e);
                                            $rt_throw($e);
                                        }
                                        $e = new jl_ArrayIndexOutOfBoundsException;
                                        jl_Exception__init_($e);
                                        $rt_throw($e);
                                    }
                                    return $result;
                                }
                                try {
                                } catch ($$e) {
                                    $$je = $rt_wrapException($$e);
                                    if ($$je instanceof juz_DataFormatException) {
                                        $e = $$je;
                                        break a;
                                    } else {
                                        throw $$e;
                                    }
                                }
                                return (-1);
                            }
                            try {
                                $this.$eof = 1;
                                $rt_throw(ji_EOFException__init_());
                            } catch ($$e) {
                                $$je = $rt_wrapException($$e);
                                if ($$je instanceof juz_DataFormatException) {
                                    $e = $$je;
                                    break a;
                                } else {
                                    throw $$e;
                                }
                            }
                        }
                        try {
                            $this.$eof = 1;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof juz_DataFormatException) {
                                $e = $$je;
                                break a;
                            } else {
                                throw $$e;
                            }
                        }
                        return (-1);
                    }
                    $this.$eof = 1;
                    if ($this.$len != (-1)) {
                        var$8 = new ji_IOException;
                        jl_Throwable__init_2(var$8, $e);
                        $rt_throw(var$8);
                    }
                    $e = new ji_EOFException;
                    jl_Exception__init_($e);
                    $rt_throw($e);
                }
                $e = new jl_ArrayIndexOutOfBoundsException;
                jl_Exception__init_($e);
                $rt_throw($e);
            }
        }
        $e = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($e);
        $rt_throw($e);
    }
    function juz_GZIPInputStream() {
        var a = this; juz_InflaterInputStream.call(a);
        a.$crc0 = null;
        a.$eos = 0;
    }
    function juz_GZIPInputStream__init_(var_0) {
        var var_1 = new juz_GZIPInputStream();
        juz_GZIPInputStream__init_0(var_1, var_0);
        return var_1;
    }
    function juz_GZIPInputStream__init_1(var_0, var_1) {
        var var_2 = new juz_GZIPInputStream();
        juz_GZIPInputStream__init_2(var_2, var_0, var_1);
        return var_2;
    }
    function juz_GZIPInputStream__init_0($this, $is) {
        juz_GZIPInputStream__init_2($this, $is, 512);
    }
    function juz_GZIPInputStream__init_2($this, $is, $size) {
        var var$3, $header, var$5, $length, $flags, $hcrc, $max, $result, $crc16, $$je;
        var$3 = new juz_Inflater;
        var$3.$nowrap0 = 1;
        a: {
            try {
                var$3.$impl0 = cjj_Inflater__init_(1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof cjj_GZIPException) {
                } else {
                    throw $$e;
                }
            }
        }
        ji_FilterInputStream__init_0($this, $is);
        if ($is === null) {
            $is = new jl_NullPointerException;
            jl_Exception__init_($is);
            $rt_throw($is);
        }
        if ($size <= 0) {
            $is = new jl_IllegalArgumentException;
            jl_Exception__init_($is);
            $rt_throw($is);
        }
        $this.$inf = var$3;
        $this.$buf1 = $rt_createByteArray($size);
        $this.$crc0 = juz_CRC32__init_();
        $header = $rt_createByteArray(10);
        var$5 = $header.data;
        $length = var$5.length;
        juz_GZIPInputStream_readFully($this, $header, 0, $length);
        if (juz_GZIPInputStream_getShort($this, $header, 0) != 35615) {
            $is = new ji_IOException;
            jl_Exception__init_($is);
            $rt_throw($is);
        }
        $flags = var$5[3];
        $hcrc = !($flags & 2) ? 0 : 1;
        if ($hcrc)
            juz_CRC32_update($this.$crc0, $header, 0, $length);
        b: {
            if ($flags & 4) {
                juz_GZIPInputStream_readFully($this, $header, 0, 2);
                if ($hcrc)
                    juz_CRC32_update($this.$crc0, $header, 0, 2);
                $length = juz_GZIPInputStream_getShort($this, $header, 0);
                while (true) {
                    if ($length <= 0)
                        break b;
                    var$5 = $this.$buf1;
                    $max = var$5.data.length;
                    if ($length <= $max)
                        $max = $length;
                    $result = $this.$in.$read0(var$5, 0, $max);
                    if ($result == (-1))
                        break;
                    if ($hcrc)
                        juz_CRC32_update($this.$crc0, $this.$buf1, 0, $result);
                    $length = $length - $result | 0;
                }
                $is = new ji_EOFException;
                jl_Exception__init_($is);
                $rt_throw($is);
            }
        }
        if ($flags & 8)
            juz_GZIPInputStream_readZeroTerminated($this, $hcrc);
        if ($flags & 16)
            juz_GZIPInputStream_readZeroTerminated($this, $hcrc);
        if ($hcrc) {
            juz_GZIPInputStream_readFully($this, $header, 0, 2);
            $crc16 = juz_GZIPInputStream_getShort($this, $header, 0);
            if (Long_ne(Long_and(juz_CRC32_getValue($this.$crc0), Long_fromInt(65535)), Long_fromInt($crc16))) {
                $is = new ji_IOException;
                jl_Exception__init_($is);
                $rt_throw($is);
            }
            $is = $this.$crc0;
            cjj_CRC32_reset($is.$impl1);
            $is.$tbytes = Long_ZERO;
        }
    }
    function juz_GZIPInputStream_close($this) {
        var var$1;
        $this.$eos = 1;
        if (!$this.$closed) {
            var$1 = $this.$inf;
            var$1.$inRead = 0;
            var$1.$inLength = 0;
            var$1.$impl0 = null;
            $this.$closed = 1;
            $this.$eof = 1;
            ji_FilterInputStream_close($this);
        }
    }
    function juz_GZIPInputStream_getLong($this, $buffer, $off) {
        $buffer = $buffer.data;
        return Long_or(Long_or(Long_or(Long_or(Long_ZERO, Long_fromInt($buffer[$off] & 255)), Long_fromInt(($buffer[$off + 1 | 0] & 255) << 8)), Long_fromInt(($buffer[$off + 2 | 0] & 255) << 16)), Long_shl(Long_fromInt($buffer[$off + 3 | 0] & 255), 24));
    }
    function juz_GZIPInputStream_getShort($this, $buffer, $off) {
        $buffer = $buffer.data;
        return $buffer[$off] & 255 | ($buffer[$off + 1 | 0] & 255) << 8;
    }
    function juz_GZIPInputStream_read($this, $buffer, $off, $nbytes) {
        var var$4, $bytesRead, var$6, $$je;
        if ($this.$closed) {
            var$4 = new ji_IOException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if ($this.$eos)
            return (-1);
        $bytesRead = $buffer.data.length;
        if ($off <= $bytesRead && $nbytes >= 0 && $off >= 0 && ($bytesRead - $off | 0) >= $nbytes) {
            a: {
                try {
                    $bytesRead = juz_InflaterInputStream_read0($this, $buffer, $off, $nbytes);
                    break a;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    var$4 = $$je;

                }
                $this.$eos = $this.$eof;
                $rt_throw(var$4);
            }
            $this.$eos = $this.$eof;
            if ($bytesRead != (-1))
                juz_CRC32_update($this.$crc0, $buffer, $off, $bytesRead);
            if ($this.$eos) {
                var$4 = $this.$inf;
                $nbytes = var$4.$inLength - var$4.$inRead | 0;
                $buffer = $rt_createByteArray(8);
                var$6 = $nbytes <= 8 ? $nbytes : 8;
                jl_System_fastArraycopy($this.$buf1, $this.$len - $nbytes | 0, $buffer, 0, var$6);
                juz_GZIPInputStream_readFully($this, $buffer, var$6, 8 - var$6 | 0);
                if (Long_ne(juz_GZIPInputStream_getLong($this, $buffer, 0), juz_CRC32_getValue($this.$crc0))) {
                    var$4 = new ji_IOException;
                    jl_Exception__init_(var$4);
                    $rt_throw(var$4);
                }
                $off = Long_lo((juz_GZIPInputStream_getLong($this, $buffer, 4)));
                var$4 = $this.$inf.$impl0;
                if (var$4 === null) {
                    var$4 = new jl_IllegalStateException;
                    jl_Exception__init_(var$4);
                    $rt_throw(var$4);
                }
                if ($off != Long_lo(var$4.$total_out)) {
                    var$4 = new ji_IOException;
                    jl_Exception__init_(var$4);
                    $rt_throw(var$4);
                }
            }
            return $bytesRead;
        }
        var$4 = new jl_ArrayIndexOutOfBoundsException;
        jl_Exception__init_(var$4);
        $rt_throw(var$4);
    }
    function juz_GZIPInputStream_readFully($this, $buffer, $offset, $length) {
        var $result, var$5;
        while ($length > 0) {
            $result = $this.$in.$read0($buffer, $offset, $length);
            if ($result == (-1)) {
                var$5 = new ji_EOFException;
                jl_Exception__init_(var$5);
                $rt_throw(var$5);
            }
            $offset = $offset + $result | 0;
            $length = $length - $result | 0;
        }
    }
    function juz_GZIPInputStream_readZeroTerminated($this, $hcrc) {
        var var$2, var$3;
        while (true) {
            var$2 = $this.$in.$read1();
            if (var$2 <= 0)
                break;
            if (!$hcrc)
                continue;
            juz_CRC32_update0($this.$crc0, var$2);
        }
        if (var$2 == (-1)) {
            var$3 = new ji_EOFException;
            jl_Exception__init_(var$3);
            $rt_throw(var$3);
        }
        if ($hcrc)
            juz_CRC32_update0($this.$crc0, var$2);
    }
    function ji_FileInputStream() {
        ji_InputStream.call(this);
        this.$accessor0 = null;
    }
    var ji_FileInputStream_ONE_BYTE_BUFFER = null;
    function ji_FileInputStream__init_(var_0) {
        var var_1 = new ji_FileInputStream();
        ji_FileInputStream__init_0(var_1, var_0);
        return var_1;
    }
    function ji_FileInputStream__init_0($this, $path) {
        $path = ji_File_findVirtualFile(ji_File__init_($path));
        if ($path !== null && otrfm_VirtualFileImpl_isFile($path)) {
            $path = otrfm_VirtualFileImpl_createAccessor($path, 1, 0, 0);
            $this.$accessor0 = $path;
            if ($path !== null)
                return;
            $path = new ji_FileNotFoundException;
            jl_Exception__init_($path);
            $rt_throw($path);
        }
        $path = new ji_FileNotFoundException;
        jl_Exception__init_($path);
        $rt_throw($path);
    }
    function ji_FileInputStream_read($this, $b, $off, $len) {
        var $result, var$5;
        ju_Objects_requireNonNull($b);
        if ($off >= 0 && $len >= 0 && $off <= ($b.data.length - $len | 0)) {
            if (!$len)
                return 0;
            ji_FileInputStream_ensureOpened($this);
            $result = otrfm_InMemoryVirtualFile$1_read($this.$accessor0, $b, $off, $len);
            if ($result <= 0)
                $result = (-1);
            return $result;
        }
        var$5 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    function ji_FileInputStream_close($this) {
        $this.$accessor0 = null;
    }
    function ji_FileInputStream_read0($this) {
        var $buffer;
        ji_FileInputStream_ensureOpened($this);
        $buffer = ji_FileInputStream_ONE_BYTE_BUFFER;
        return !otrfm_InMemoryVirtualFile$1_read($this.$accessor0, $buffer, 0, 1) ? (-1) : $buffer.data[0];
    }
    function ji_FileInputStream_ensureOpened($this) {
        var var$1;
        if ($this.$accessor0 !== null)
            return;
        var$1 = new ji_IOException;
        jl_Throwable__init_(var$1, $rt_s(181));
        $rt_throw(var$1);
    }
    function ji_FileInputStream__clinit_() {
        ji_FileInputStream_ONE_BYTE_BUFFER = $rt_createByteArray(1);
    }
    function jnci_BufferedEncoder() {
        var a = this; jnc_CharsetEncoder.call(a);
        a.$inArray = null;
        a.$outArray = null;
    }
    function jnci_BufferedEncoder_encodeLoop($this, $in, $out) {
        var $inArray, $inPos, $inSize, $outArray, $i, var$8, $outPos, $outSize, $result, var$12, var$13, var$14, $controller;
        $inArray = $this.$inArray;
        $inPos = 0;
        $inSize = 0;
        $outArray = $this.$outArray;
        a: {
            b: {
                while (true) {
                    if (($inPos + 32 | 0) > $inSize && jn_Buffer_hasRemaining($in)) {
                        $i = $inPos;
                        while ($i < $inSize) {
                            var$8 = $inArray.data;
                            var$8[$i - $inPos | 0] = var$8[$i];
                            $i = $i + 1 | 0;
                        }
                        var$8 = $inArray.data;
                        $outPos = $inSize - $inPos | 0;
                        $outSize = jn_Buffer_remaining($in) + $outPos | 0;
                        $i = var$8.length;
                        $inSize = jl_Math_min($outSize, $i);
                        $inPos = $inSize - $outPos | 0;
                        if ($outPos < 0)
                            break b;
                        if ($outPos > $i)
                            break b;
                        $outSize = $outPos + $inPos | 0;
                        if ($outSize > $i) {
                            $result = new jl_IndexOutOfBoundsException;
                            $in = jl_StringBuilder__init_();
                            jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append($in, $rt_s(183)), $outSize), $rt_s(13)), $i);
                            jl_Throwable__init_($result, jl_StringBuilder_toString($in));
                            $rt_throw($result);
                        }
                        if (jn_Buffer_remaining($in) < $inPos)
                            break;
                        if ($inPos < 0) {
                            $in = new jl_IndexOutOfBoundsException;
                            $out = jl_StringBuilder__init_();
                            jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append($out, $rt_s(14)), $inPos), $rt_s(15));
                            jl_Throwable__init_($in, jl_StringBuilder_toString($out));
                            $rt_throw($in);
                        }
                        $i = $in.$position;
                        var$12 = 0;
                        var$13 = $i;
                        while (var$12 < $inPos) {
                            var$14 = $outPos + 1 | 0;
                            $outSize = var$13 + 1 | 0;
                            var$8[$outPos] = $in.$array2.data[var$13 + $in.$start1 | 0];
                            var$12 = var$12 + 1 | 0;
                            $outPos = var$14;
                            var$13 = $outSize;
                        }
                        $in.$position = $i + $inPos | 0;
                        $inPos = 0;
                    }
                    if (!jn_Buffer_hasRemaining($out)) {
                        $result = !jn_Buffer_hasRemaining($in) && $inPos >= $inSize ? jnc_CoderResult_UNDERFLOW : jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    var$8 = $outArray.data;
                    $outSize = jl_Math_min(jn_Buffer_remaining($out), var$8.length);
                    $controller = new jnci_BufferedEncoder$Controller;
                    $controller.$in0 = $in;
                    $controller.$out0 = $out;
                    $result = jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, 0, $outSize, $controller);
                    $inPos = $controller.$inPosition;
                    $outPos = $controller.$outPosition;
                    if ($result === null) {
                        if (!jn_Buffer_hasRemaining($in) && $inPos >= $inSize)
                            $result = jnc_CoderResult_UNDERFLOW;
                        else if (!jn_Buffer_hasRemaining($out) && $inPos >= $inSize)
                            $result = jnc_CoderResult_OVERFLOW;
                    }
                    jn_ByteBuffer_put($out, $outArray, 0, $outPos);
                    if ($result !== null)
                        break a;
                }
                $in = new jn_BufferUnderflowException;
                jl_Exception__init_($in);
                $rt_throw($in);
            }
            $controller = new jl_IndexOutOfBoundsException;
            $result = jl_StringBuilder__init_();
            jl_StringBuilder_append0(jl_StringBuilder_append2(jl_StringBuilder_append(jl_StringBuilder_append2(jl_StringBuilder_append($result, $rt_s(16)), $outPos), $rt_s(11)), $i), 41);
            jl_Throwable__init_($controller, jl_StringBuilder_toString($result));
            $rt_throw($controller);
        }
        jn_Buffer_position0($in, $in.$position - ($inSize - $inPos | 0) | 0);
        return $result;
    }
    var jnci_UTF8Encoder = $rt_classWithoutFields(jnci_BufferedEncoder);
    function jnci_UTF8Encoder_arrayEncode($this, $inArray, $inPos, $inSize, $outArray, $outPos, $outSize, $controller) {
        var $result, var$9, var$10, $ch, var$12, $low, $codePoint;
        $result = null;
        a: {
            while ($inPos < $inSize) {
                if ($outPos >= $outSize) {
                    var$9 = $inPos;
                    break a;
                }
                var$10 = $inArray.data;
                var$9 = $inPos + 1 | 0;
                $ch = var$10[$inPos];
                if ($ch < 128) {
                    var$10 = $outArray.data;
                    var$12 = $outPos + 1 | 0;
                    var$10[$outPos] = $ch << 24 >> 24;
                } else if ($ch < 2048) {
                    if (($outPos + 2 | 0) > $outSize) {
                        var$9 = var$9 + (-1) | 0;
                        if (jnci_BufferedEncoder$Controller_hasMoreOutput($controller, 2))
                            break a;
                        $result = jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    var$10 = $outArray.data;
                    $inPos = $outPos + 1 | 0;
                    var$10[$outPos] = (192 | $ch >> 6) << 24 >> 24;
                    var$12 = $inPos + 1 | 0;
                    var$10[$inPos] = (128 | $ch & 63) << 24 >> 24;
                } else if (!(!jl_Character_isHighSurrogate($ch) && !jl_Character_isLowSurrogate($ch) ? 0 : 1)) {
                    if (($outPos + 3 | 0) > $outSize) {
                        var$9 = var$9 + (-1) | 0;
                        if (jnci_BufferedEncoder$Controller_hasMoreOutput($controller, 3))
                            break a;
                        $result = jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    var$10 = $outArray.data;
                    $low = $outPos + 1 | 0;
                    var$10[$outPos] = (224 | $ch >> 12) << 24 >> 24;
                    $inPos = $low + 1 | 0;
                    var$10[$low] = (128 | $ch >> 6 & 63) << 24 >> 24;
                    var$12 = $inPos + 1 | 0;
                    var$10[$inPos] = (128 | $ch & 63) << 24 >> 24;
                } else {
                    if (!jl_Character_isHighSurrogate($ch)) {
                        $result = jnc_CoderResult_malformedForLength(1);
                        break a;
                    }
                    if (var$9 >= $inSize) {
                        if (jn_Buffer_hasRemaining($controller.$in0))
                            break a;
                        $result = jnc_CoderResult_UNDERFLOW;
                        break a;
                    }
                    $inPos = var$9 + 1 | 0;
                    $low = var$10[var$9];
                    if (!jl_Character_isLowSurrogate($low)) {
                        var$9 = $inPos + (-2) | 0;
                        $result = jnc_CoderResult_malformedForLength(1);
                        break a;
                    }
                    if (($outPos + 4 | 0) > $outSize) {
                        var$9 = $inPos + (-2) | 0;
                        if (jnci_BufferedEncoder$Controller_hasMoreOutput($controller, 4))
                            break a;
                        $result = jnc_CoderResult_OVERFLOW;
                        break a;
                    }
                    var$10 = $outArray.data;
                    $codePoint = (($ch & 1023) << 10 | $low & 1023) + 65536 | 0;
                    $low = $outPos + 1 | 0;
                    var$10[$outPos] = (240 | $codePoint >> 18) << 24 >> 24;
                    $outPos = $low + 1 | 0;
                    var$10[$low] = (128 | $codePoint >> 12 & 63) << 24 >> 24;
                    $low = $outPos + 1 | 0;
                    var$10[$outPos] = (128 | $codePoint >> 6 & 63) << 24 >> 24;
                    var$12 = $low + 1 | 0;
                    var$10[$low] = (128 | $codePoint & 63) << 24 >> 24;
                    var$9 = $inPos;
                }
                $inPos = var$9;
                $outPos = var$12;
            }
            var$9 = $inPos;
        }
        $controller.$inPosition = var$9;
        $controller.$outPosition = $outPos;
        return $result;
    }
    function ju_AbstractList$1() {
        var a = this; jl_Object.call(a);
        a.$index0 = 0;
        a.$modCount1 = 0;
        a.$size0 = 0;
        a.$removeIndex = 0;
        a.$this$00 = null;
    }
    function ju_AbstractList$1_hasNext($this) {
        return $this.$index0 >= $this.$size0 ? 0 : 1;
    }
    function ju_AbstractList$1_next($this) {
        var var$1, var$2, var$3;
        var$1 = $this.$modCount1;
        var$2 = $this.$this$00;
        if (var$1 < var$2.$modCount0) {
            var$2 = new ju_ConcurrentModificationException;
            jl_Exception__init_(var$2);
            $rt_throw(var$2);
        }
        var$3 = $this.$index0;
        $this.$removeIndex = var$3;
        $this.$index0 = var$3 + 1 | 0;
        if (var$3 >= 0 && var$3 < var$2.$size1)
            return var$2.$array3.data[var$3];
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    function ji_File() {
        jl_Object.call(this);
        this.$path = null;
    }
    var ji_File_separatorChar = 0;
    var ji_File_separator = null;
    var ji_File_pathSeparatorChar = 0;
    var ji_File_pathSeparator = null;
    function ji_File_$callClinit() {
        ji_File_$callClinit = $rt_eraseClinit(ji_File);
        ji_File__clinit_();
    }
    function ji_File__init_(var_0) {
        var var_1 = new ji_File();
        ji_File__init_0(var_1, var_0);
        return var_1;
    }
    function ji_File__init_0($this, $path) {
        var var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10;
        ji_File_$callClinit();
        ju_Objects_requireNonNull($path);
        var$2 = jl_String_length($path);
        var$3 = 0;
        ji_File_fs();
        var$4 = 0;
        var$5 = $path.$characters.data;
        var$6 = $rt_createCharArray(var$5.length);
        var$7 = var$6.data;
        var$8 = 0;
        var$9 = var$7.length;
        while (var$8 < var$9) {
            var$7[var$8] = var$5[var$8];
            var$8 = var$8 + 1 | 0;
        }
        var$8 = 0;
        while (var$8 < var$2) {
            var$9 = var$7[var$8];
            if (var$9 != 47 && var$9 != ji_File_separatorChar) {
                var$10 = var$3 + 1 | 0;
                var$7[var$3] = var$9;
                var$4 = 0;
            } else if (var$4 && var$8)
                var$10 = var$3;
            else {
                var$10 = var$3 + 1 | 0;
                var$7[var$3] = ji_File_separatorChar;
                var$4 = 1;
            }
            var$8 = var$8 + 1 | 0;
            var$3 = var$10;
        }
        if (var$4 && !(var$3 <= 1 && var$7[0] == 47))
            var$3 = var$3 + (-1) | 0;
        $this.$path = jl_String__init_5(var$6, 0, var$3);
    }
    function ji_File_getName($this) {
        var var$1, var$2, $separatorIndex, var$4;
        var$1 = $this.$path;
        ji_File_$callClinit();
        var$2 = ji_File_separator;
        $separatorIndex = jl_Math_min(jl_String_length(var$1), jl_String_length(var$1) - jl_String_length(var$2) | 0);
        a: {
            b: while (true) {
                if ($separatorIndex < 0) {
                    $separatorIndex = (-1);
                    break a;
                }
                var$4 = 0;
                while (true) {
                    if (var$4 >= jl_String_length(var$2))
                        break b;
                    if (jl_String_charAt(var$1, $separatorIndex + var$4 | 0) != jl_String_charAt(var$2, var$4))
                        break;
                    var$4 = var$4 + 1 | 0;
                }
                $separatorIndex = $separatorIndex + (-1) | 0;
            }
        }
        if ($separatorIndex < 0)
            var$2 = $this.$path;
        else {
            var$2 = $this.$path;
            var$2 = jl_String_substring0(var$2, $separatorIndex + 1 | 0, jl_String_length(var$2));
        }
        return var$2;
    }
    function ji_File_fs() {
        var var$1, var$2, var$3;
        ji_File_$callClinit();
        if (otrf_VirtualFileSystemProvider_instance === null) {
            var$1 = new otrfm_InMemoryVirtualFileSystem;
            var$2 = new otrfm_InMemoryVirtualDirectory;
            otrfm_AbstractInMemoryVirtualFile__init_(var$2, $rt_s(104));
            var$3 = new ju_LinkedHashMap;
            ju_HashMap__init_1(var$3);
            var$3.$accessOrder = 0;
            var$3.$head = null;
            var$2.$children = var$3;
            var$1.$root = var$2;
            var$1.$userDir = $rt_s(2);
            otrf_VirtualFileSystemProvider_instance = var$1;
        }
        return otrf_VirtualFileSystemProvider_instance;
    }
    function ji_File_isAbsolutePath($this, $path) {
        ji_File_fs();
        return !jl_String_isEmpty($path) && jl_String_charAt($path, 0) == ji_File_separatorChar ? 1 : 0;
    }
    function ji_File_isDriveLetter($c) {
        ji_File_$callClinit();
        a: {
            b: {
                if (!($c >= 97 && $c <= 122)) {
                    if ($c < 65)
                        break b;
                    if ($c > 90)
                        break b;
                }
                $c = 1;
                break a;
            }
            $c = 0;
        }
        return $c;
    }
    function ji_File_getCanonicalPathImpl($this) {
        var $result, $numSeparators, var$3, $i, $sepLocations, var$6, $newResult, $newLength, $lastSlash, $foundDots, $i_0, $j;
        if (ji_File_isAbsolutePath($this, $this.$path))
            $result = $this.$path;
        else {
            $result = (ji_File_fs()).$userDir;
            if (!jl_String_isEmpty($this.$path)) {
                $numSeparators = jl_String_length($result);
                var$3 = new jl_StringBuilder;
                var$3.$buffer0 = $rt_createCharArray(jl_String_length($result));
                $i = 0;
                while (true) {
                    $sepLocations = var$3.$buffer0.data;
                    if ($i >= $sepLocations.length)
                        break;
                    $sepLocations[$i] = jl_String_charAt($result, $i);
                    $i = $i + 1 | 0;
                }
                var$3.$length0 = jl_String_length($result);
                if (jl_String_charAt($result, $numSeparators - 1 | 0) == ji_File_separatorChar)
                    ji_File_fs();
                else if (jl_String_charAt($this.$path, 0) != ji_File_separatorChar)
                    jl_StringBuilder_append1(var$3, ji_File_separator);
                jl_StringBuilder_append1(var$3, $this.$path);
                $result = jl_StringBuilder_toString(var$3);
            }
        }
        $numSeparators = 1;
        $i = 0;
        while ($i < jl_String_length($result)) {
            if (jl_String_charAt($result, $i) == ji_File_separatorChar)
                $numSeparators = $numSeparators + 1 | 0;
            $i = $i + 1 | 0;
        }
        var$6 = $rt_createIntArray($numSeparators).data;
        ji_File_fs();
        $newResult = $rt_createCharArray(jl_String_length($result) + 1 | 0);
        $sepLocations = $newResult.data;
        $newLength = 0;
        $lastSlash = 0;
        $foundDots = 0;
        var$6[$lastSlash] = 0;
        $i_0 = 0;
        a: {
            while (true) {
                if ($i_0 > jl_String_length($result))
                    break a;
                if ($i_0 < 0) {
                    $numSeparators = $newLength + 1 | 0;
                    $sepLocations[$newLength] = jl_String_charAt($result, $i_0);
                } else if ($i_0 != jl_String_length($result) && jl_String_charAt($result, $i_0) != ji_File_separatorChar) {
                    if (jl_String_charAt($result, $i_0) == 46) {
                        $foundDots = $foundDots + 1 | 0;
                        $numSeparators = $newLength;
                    } else {
                        if ($foundDots > 0) {
                            $j = 0;
                            while ($j < $foundDots) {
                                $numSeparators = $newLength + 1 | 0;
                                $sepLocations[$newLength] = 46;
                                $j = $j + 1 | 0;
                                $newLength = $numSeparators;
                            }
                        }
                        $numSeparators = $newLength + 1 | 0;
                        $sepLocations[$newLength] = jl_String_charAt($result, $i_0);
                        $foundDots = 0;
                    }
                } else {
                    if ($i_0 == jl_String_length($result) && !$foundDots)
                        break;
                    $numSeparators = $rt_compare($foundDots, 1);
                    if (!$numSeparators) {
                        $foundDots = 0;
                        $numSeparators = $newLength;
                    } else if ($numSeparators <= 0) {
                        $lastSlash = $lastSlash + 1 | 0;
                        var$6[$lastSlash] = $newLength;
                        $numSeparators = $newLength + 1 | 0;
                        $sepLocations[$newLength] = ji_File_separatorChar;
                    } else {
                        $numSeparators = $foundDots - 1 | 0;
                        $lastSlash = $lastSlash <= $numSeparators ? 0 : $lastSlash - $numSeparators | 0;
                        $numSeparators = var$6[$lastSlash] + 1 | 0;
                        $foundDots = 0;
                    }
                }
                $i_0 = $i_0 + 1 | 0;
                $newLength = $numSeparators;
            }
        }
        if ($newLength > 1 && $sepLocations[$newLength - 1 | 0] == ji_File_separatorChar)
            $newLength = $newLength + (-1) | 0;
        return jl_String__init_5($newResult, 0, $newLength);
    }
    function ji_File_getParent($this) {
        var $length, var$2, $index, var$4;
        $length = jl_String_length($this.$path);
        var$2 = $this.$path;
        ji_File_$callClinit();
        $index = jl_String_lastIndexOf(var$2, ji_File_separatorChar);
        if ($index != (-1)) {
            var$4 = jl_String_charAt($this.$path, $length - 1 | 0);
            $length = ji_File_separatorChar;
            if (var$4 != $length) {
                a: {
                    if (jl_String_indexOf($this.$path, $length, 0) == $index) {
                        if (ji_File_isAbsolutePath($this, $this.$path))
                            break a;
                        if (!$index)
                            break a;
                    }
                    return jl_String_substring0($this.$path, 0, $index);
                }
                return jl_String_substring0($this.$path, 0, $index + 1 | 0);
            }
        }
        return null;
    }
    function ji_File_findVirtualFile($this) {
        var var$1, var$2, var$3;
        var$1 = ji_File_fs();
        var$2 = ji_File_getCanonicalPathImpl($this);
        var$3 = new otrfm_VirtualFileImpl;
        var$3.$fs0 = var$1;
        var$3.$path0 = var$2;
        return var$3;
    }
    function ji_File__clinit_() {
        ji_File_fs();
        ji_File_separatorChar = 47;
        ji_File_separator = jl_String_valueOf(47);
        ji_File_fs();
        ji_File_pathSeparatorChar = 58;
        ji_File_pathSeparator = jl_String_valueOf(58);
    }
    function juz_Deflater() {
        var a = this; jl_Object.call(a);
        a.$flushParm = 0;
        a.$finished = 0;
        a.$compressLevel = 0;
        a.$strategy = 0;
        a.$impl = null;
        a.$inRead0 = 0;
        a.$inLength0 = 0;
        a.$nowrap = 0;
    }
    function juz_Deflater_deflate($this, $buf) {
        return juz_Deflater_deflate0($this, $buf, 0, $buf.data.length, $this.$flushParm);
    }
    function juz_Deflater_deflate0($this, $buf, $off, $nbytes, $flushParam) {
        var var$5, $err, $sin, $sout, var$9, var$10;
        var$5 = $this.$impl;
        if (var$5 === null) {
            var$5 = new jl_IllegalStateException;
            jl_Exception__init_(var$5);
            $rt_throw(var$5);
        }
        $err = $buf.data.length;
        if ($off <= $err && $nbytes >= 0 && $off >= 0 && ($err - $off | 0) >= $nbytes) {
            $sin = var$5.$total_in;
            $sout = var$5.$total_out;
            cjj_ZStream_setOutput(var$5, $buf, $off, $nbytes);
            var$5 = $this.$impl;
            var$9 = var$5.$dstate;
            if (var$9 === null)
                $err = (-2);
            else {
                $err = cjj_Deflate_deflate(var$9, $flushParam);
                if ($err == 1)
                    var$5.$finished1 = 1;
            }
            a: {
                switch ($err) {
                    case 0:
                        break a;
                    case 1:
                        $this.$finished = 1;
                        break a;
                    default:
                }
                var$5 = new jl_RuntimeException;
                var$9 = jl_StringBuilder__init_();
                jl_StringBuilder_append2(jl_StringBuilder_append(var$9, $rt_s(184)), $err);
                jl_Throwable__init_(var$5, jl_StringBuilder_toString(var$9));
                $rt_throw(var$5);
            }
            var$10 = Long_fromInt($this.$inRead0);
            var$5 = $this.$impl;
            $this.$inRead0 = Long_lo(Long_add(var$10, Long_sub(var$5.$total_in, $sin)));
            return Long_lo(Long_sub(var$5.$total_out, $sout));
        }
        var$5 = new jl_ArrayIndexOutOfBoundsException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    function juz_Deflater_needsInput($this) {
        return $this.$inRead0 != $this.$inLength0 ? 0 : 1;
    }
    function juz_Deflater_setInput($this, $buf, $off, $nbytes) {
        var var$4, var$5;
        var$4 = $this.$impl;
        if (var$4 === null) {
            var$4 = new jl_IllegalStateException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        var$5 = $buf.data.length;
        if ($off <= var$5 && $nbytes >= 0 && $off >= 0 && (var$5 - $off | 0) >= $nbytes) {
            $this.$inLength0 = $nbytes;
            $this.$inRead0 = 0;
            if (var$4.$next_in === null)
                cjj_Deflater_init(var$4, $this.$compressLevel, 15, $this.$nowrap);
            cjj_ZStream_setInput($this.$impl, $buf, $off, $nbytes, 0);
            return;
        }
        var$4 = new jl_ArrayIndexOutOfBoundsException;
        jl_Exception__init_(var$4);
        $rt_throw(var$4);
    }
    var juz_Checksum = $rt_classWithoutFields(0);
    function juz_CRC32() {
        var a = this; jl_Object.call(a);
        a.$impl1 = null;
        a.$tbytes = Long_ZERO;
    }
    function juz_CRC32__init_() {
        var var_0 = new juz_CRC32();
        juz_CRC32__init_0(var_0);
        return var_0;
    }
    function juz_CRC32__init_0($this) {
        $this.$impl1 = cjj_CRC32__init_();
    }
    function juz_CRC32_getValue($this) {
        return cjj_CRC32_getValue($this.$impl1);
    }
    function juz_CRC32_update0($this, $val) {
        var var$2, var$3;
        var$2 = $this.$impl1;
        var$3 = $rt_createByteArray(1);
        var$3.data[0] = $val << 24 >> 24;
        cjj_CRC32_update(var$2, var$3, 0, 1);
    }
    function juz_CRC32_update($this, $buf, $off, $nbytes) {
        var var$4, var$5;
        var$4 = $buf.data.length;
        if ($off <= var$4 && $nbytes >= 0 && $off >= 0 && (var$4 - $off | 0) >= $nbytes) {
            cjj_CRC32_update($this.$impl1, $buf, $off, $nbytes);
            $this.$tbytes = Long_add($this.$tbytes, Long_fromInt($nbytes));
            return;
        }
        var$5 = new jl_ArrayIndexOutOfBoundsException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    var ji_FileNotFoundException = $rt_classWithoutFields(ji_IOException);
    function juz_Inflater() {
        var a = this; jl_Object.call(a);
        a.$finished2 = 0;
        a.$nowrap0 = 0;
        a.$inLength = 0;
        a.$inRead = 0;
        a.$needsDictionary0 = 0;
        a.$impl0 = null;
    }
    function juz_Inflater_finished($this) {
        return $this.$finished2;
    }
    function juz_Inflater_inflate($this, $buf, $off, $nbytes) {
        var $neededDict, var$5, $lastInSize, $lastOutSize, var$8, $errCode, var$10;
        $neededDict = $buf.data.length;
        if ($off <= $neededDict && $nbytes >= 0 && $off >= 0 && ($neededDict - $off | 0) >= $nbytes) {
            if ($this.$impl0 === null) {
                var$5 = new jl_IllegalStateException;
                jl_Exception__init_(var$5);
                $rt_throw(var$5);
            }
            if (juz_Inflater_needsInput($this))
                return 0;
            var$5 = $this.$impl0;
            $lastInSize = var$5.$total_in;
            $lastOutSize = var$5.$total_out;
            $neededDict = $this.$needsDictionary0;
            $this.$needsDictionary0 = 0;
            cjj_ZStream_setOutput(var$5, $buf, $off, $nbytes);
            var$8 = $this.$impl0;
            var$5 = var$8.$istate;
            if (var$5 === null)
                $errCode = (-2);
            else {
                $errCode = cjj_Inflate_inflate(var$5, 0);
                if ($errCode == 1)
                    var$8.$finished3 = 1;
            }
            a: {
                switch ($errCode) {
                    case 0:
                        break a;
                    case 1:
                        $this.$finished2 = 1;
                        break a;
                    case 2:
                        $this.$needsDictionary0 = 1;
                        break a;
                    default:
                }
                var$5 = new juz_DataFormatException;
                var$8 = jl_StringBuilder__init_();
                jl_StringBuilder_append2(jl_StringBuilder_append(var$8, $rt_s(185)), $errCode);
                jl_Throwable__init_(var$5, jl_StringBuilder_toString(var$8));
                $rt_throw(var$5);
            }
            if ($this.$needsDictionary0 && $neededDict) {
                var$5 = new juz_DataFormatException;
                jl_Exception__init_(var$5);
                $rt_throw(var$5);
            }
            var$10 = Long_fromInt($this.$inRead);
            var$5 = $this.$impl0;
            $this.$inRead = Long_lo(Long_add(var$10, Long_sub(var$5.$total_in, $lastInSize)));
            return Long_lo(Long_sub(var$5.$total_out, $lastOutSize));
        }
        var$5 = new jl_ArrayIndexOutOfBoundsException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    function juz_Inflater_needsDictionary($this) {
        return $this.$needsDictionary0;
    }
    function juz_Inflater_needsInput($this) {
        return $this.$inRead != $this.$inLength ? 0 : 1;
    }
    var ji_EOFException = $rt_classWithoutFields(ji_IOException);
    function ji_EOFException__init_() {
        var var_0 = new ji_EOFException();
        ji_EOFException__init_0(var_0);
        return var_0;
    }
    function ji_EOFException__init_0($this) {
        jl_Exception__init_($this);
    }
    function cjj_ZStream() {
        var a = this; jl_Object.call(a);
        a.$next_in = null;
        a.$next_in_index = 0;
        a.$avail_in = 0;
        a.$total_in = Long_ZERO;
        a.$next_out = null;
        a.$next_out_index = 0;
        a.$avail_out = 0;
        a.$total_out = Long_ZERO;
        a.$msg = null;
        a.$dstate = null;
        a.$istate = null;
        a.$data_type = 0;
        a.$adler = null;
    }
    function cjj_ZStream__init_() {
        var var_0 = new cjj_ZStream();
        cjj_ZStream__init_0(var_0);
        return var_0;
    }
    function cjj_ZStream__init_0($this) {
        $this.$adler = cjj_Adler32__init_();
    }
    function cjj_ZStream_flush_pending($this) {
        var var$1, $len, var$3, var$4, var$5, var$6, var$7;
        var$1 = $this.$dstate;
        $len = var$1.$pending;
        var$3 = $this.$avail_out;
        if ($len <= var$3)
            var$3 = $len;
        if (!var$3)
            return;
        var$4 = var$1.$pending_buf;
        var$5 = var$4.data.length;
        var$6 = var$1.$pending_out;
        if (var$5 > var$6) {
            $len = $this.$next_out.data.length;
            var$7 = $this.$next_out_index;
            $len > var$7 && var$5 >= (var$6 + var$3 | 0) && $len >= (var$7 + var$3 | 0);
        }
        jl_System_fastArraycopy(var$4, var$6, $this.$next_out, $this.$next_out_index, var$3);
        $this.$next_out_index = $this.$next_out_index + var$3 | 0;
        var$1 = $this.$dstate;
        var$1.$pending_out = var$1.$pending_out + var$3 | 0;
        $this.$total_out = Long_add($this.$total_out, Long_fromInt(var$3));
        $this.$avail_out = $this.$avail_out - var$3 | 0;
        $len = var$1.$pending - var$3 | 0;
        var$1.$pending = $len;
        if (!$len)
            var$1.$pending_out = 0;
    }
    function cjj_ZStream_setOutput($this, $buf, $off, $len) {
        $this.$next_out = $buf;
        $this.$next_out_index = $off;
        $this.$avail_out = $len;
    }
    function cjj_ZStream_setInput($this, $buf, $off, $len, $append) {
        var var$5, $tmp_0;
        if ($len <= 0 && $append && $this.$next_in !== null)
            return;
        var$5 = $this.$avail_in;
        if (var$5 > 0 && $append) {
            $tmp_0 = $rt_createByteArray(var$5 + $len | 0);
            jl_System_fastArraycopy($this.$next_in, $this.$next_in_index, $tmp_0, 0, var$5);
            jl_System_fastArraycopy($buf, $off, $tmp_0, $this.$avail_in, $len);
            $this.$next_in = $tmp_0;
            $this.$next_in_index = 0;
            $this.$avail_in = $this.$avail_in + $len | 0;
        } else {
            $this.$next_in = $buf;
            $this.$next_in_index = $off;
            $this.$avail_in = $len;
        }
    }
    function cjj_Deflater() {
        cjj_ZStream.call(this);
        this.$finished1 = 0;
    }
    function cjj_Deflater__init_(var_0, var_1) {
        var var_2 = new cjj_Deflater();
        cjj_Deflater__init_0(var_2, var_0, var_1);
        return var_2;
    }
    function cjj_Deflater__init_0($this, $level, $nowrap) {
        var var$3;
        cjj_ZStream__init_0($this);
        $this.$finished1 = 0;
        $level = cjj_Deflater_init($this, $level, 15, $nowrap);
        if (!$level)
            return;
        var$3 = new cjj_GZIPException;
        jl_Throwable__init_(var$3, jl_StringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append1(jl_StringBuilder_append2(jl_StringBuilder__init_(), $level), $rt_s(3)), $this.$msg)));
        $rt_throw(var$3);
    }
    function cjj_Deflater_init($this, $level, $bits, $nowrap) {
        var var$4;
        $this.$finished1 = 0;
        var$4 = new cjj_Deflate;
        cjj_Deflate_$callClinit();
        var$4.$wrap1 = 1;
        var$4.$l_desc = new cjj_Tree;
        var$4.$d_desc = new cjj_Tree;
        var$4.$bl_desc = new cjj_Tree;
        var$4.$bl_count = $rt_createShortArray(16);
        var$4.$next_code = $rt_createShortArray(16);
        var$4.$heap = $rt_createIntArray(573);
        var$4.$depth0 = $rt_createByteArray(573);
        var$4.$gheader = null;
        var$4.$strm = $this;
        var$4.$dyn_ltree = $rt_createShortArray(1146);
        var$4.$dyn_dtree = $rt_createShortArray(122);
        var$4.$bl_tree = $rt_createShortArray(78);
        $this.$dstate = var$4;
        if ($nowrap)
            $bits =  -$bits | 0;
        return cjj_Deflate_deflateInit(var$4, $level, 8, $bits, 8, 0);
    }
    var cjj_GZIPException = $rt_classWithoutFields(ji_IOException);
    var cjj_Checksum = $rt_classWithoutFields(0);
    function cjj_CRC32() {
        jl_Object.call(this);
        this.$v = 0;
    }
    var cjj_CRC32_crc_table = null;
    function cjj_CRC32__init_() {
        var var_0 = new cjj_CRC32();
        cjj_CRC32__init_0(var_0);
        return var_0;
    }
    function cjj_CRC32__init_0($this) {
        $this.$v = 0;
    }
    function cjj_CRC32_update($this, $buf, $index, $len) {
        var $c, var$5, var$6, var$7;
        $c = $this.$v ^ (-1);
        while (true) {
            $len = $len + (-1) | 0;
            if ($len < 0)
                break;
            var$5 = $buf.data;
            var$6 = cjj_CRC32_crc_table.data;
            var$7 = $index + 1 | 0;
            $c = var$6[($c ^ var$5[$index]) & 255] ^ ($c >>> 8 | 0);
            $index = var$7;
        }
        $this.$v = $c ^ (-1);
    }
    function cjj_CRC32_reset($this) {
        $this.$v = 0;
    }
    function cjj_CRC32_reset0($this, $vv) {
        $this.$v = Long_lo(Long_and($vv, Long_create(4294967295, 0)));
    }
    function cjj_CRC32_getValue($this) {
        return Long_and(Long_fromInt($this.$v), Long_create(4294967295, 0));
    }
    function cjj_CRC32__clinit_() {
        var var$1, var$2, $n, $k, var$5;
        cjj_CRC32_crc_table = null;
        var$1 = $rt_createIntArray(256);
        var$2 = var$1.data;
        cjj_CRC32_crc_table = var$1;
        $n = 0;
        while ($n < 256) {
            $k = 8;
            var$5 = $n;
            while (true) {
                $k = $k + (-1) | 0;
                if ($k < 0)
                    break;
                if (!(var$5 & 1)) {
                    var$5 = var$5 >>> 1 | 0;
                    continue;
                }
                var$5 = (-306674912) ^ (var$5 >>> 1 | 0);
            }
            var$2[$n] = var$5;
            $n = $n + 1 | 0;
        }
    }
    function cjj_Inflater() {
        cjj_ZStream.call(this);
        this.$finished3 = 0;
    }
    function cjj_Inflater__init_(var_0) {
        var var_1 = new cjj_Inflater();
        cjj_Inflater__init_0(var_1, var_0);
        return var_1;
    }
    function cjj_Inflater__init_0($this, $nowrap) {
        var var$2, var$3, var$4, var$5;
        var$2 = 15;
        cjj_ZStream__init_0($this);
        $this.$finished3 = 0;
        $this.$finished3 = 0;
        var$3 = new cjj_Inflate;
        var$3.$was = Long_fromInt(-1);
        var$3.$need_bytes = (-1);
        var$3.$crcbuf = $rt_createByteArray(4);
        var$3.$gheader0 = null;
        var$3.$tmp_string = null;
        var$3.$z4 = $this;
        $this.$istate = var$3;
        if ($nowrap)
            var$2 = (-15);
        $this.$msg = null;
        var$3.$blocks0 = null;
        var$3.$wrap2 = 0;
        if (var$2 < 0)
            var$2 =  -var$2 | 0;
        else if (var$2 & 1073741824) {
            var$3.$wrap2 = 4;
            var$2 = var$2 & (-1073741825);
            if (var$2 < 48)
                var$2 = var$2 & 15;
        } else if (var$2 & (-32)) {
            var$3.$wrap2 = 4;
            var$2 = var$2 & 15;
        } else {
            var$3.$wrap2 = (var$2 >> 4) + 1 | 0;
            if (var$2 < 48)
                var$2 = var$2 & 15;
        }
        if (var$2 >= 8 && var$2 <= 15) {
            var$3.$wbits = var$2;
            var$4 = new cjj_InfBlocks;
            var$2 = 1 << var$2;
            var$4.$bb = $rt_createIntArray(1);
            var$4.$tb = $rt_createIntArray(1);
            var$4.$bl = $rt_createIntArray(1);
            var$4.$bd = $rt_createIntArray(1);
            var$4.$tl = $rt_createArray($rt_arraycls($rt_intcls()), 1);
            var$4.$td = $rt_createArray($rt_arraycls($rt_intcls()), 1);
            var$4.$tli = $rt_createIntArray(1);
            var$4.$tdi = $rt_createIntArray(1);
            var$5 = new cjj_InfTree;
            var$5.$hn = null;
            var$5.$v0 = null;
            var$5.$c = null;
            var$5.$r = null;
            var$5.$u = null;
            var$5.$x4 = null;
            var$4.$inftree = var$5;
            var$4.$z5 = $this;
            var$5 = new cjj_InfCodes;
            var$5.$tree_index = 0;
            var$5.$z6 = $this;
            var$5.$s = var$4;
            var$4.$codes = var$5;
            var$4.$hufts = $rt_createIntArray(4320);
            var$4.$window = $rt_createByteArray(var$2);
            var$4.$end = var$2;
            var$4.$check = var$3.$wrap2 ? 1 : 0;
            var$4.$mode0 = 0;
            cjj_InfBlocks_reset(var$4);
            var$3.$blocks0 = var$4;
            var$5 = var$3.$z4;
            if (var$5 !== null) {
                var$5.$total_out = Long_ZERO;
                var$5.$total_in = Long_ZERO;
                var$5.$msg = null;
                var$3.$mode1 = 14;
                var$3.$need_bytes = (-1);
                cjj_InfBlocks_reset(var$4);
            }
            $nowrap = 0;
        } else
            $nowrap = (-2);
        if (!$nowrap)
            return;
        var$3 = new cjj_GZIPException;
        jl_Throwable__init_(var$3, jl_StringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append1(jl_StringBuilder_append2(jl_StringBuilder__init_(), $nowrap), $rt_s(3)), $this.$msg)));
        $rt_throw(var$3);
    }
    var otrf_VirtualFileSystemProvider = $rt_classWithoutFields();
    var otrf_VirtualFileSystemProvider_instance = null;
    var otrf_VirtualFileSystem = $rt_classWithoutFields(0);
    function otrfm_InMemoryVirtualFileSystem() {
        var a = this; jl_Object.call(a);
        a.$root = null;
        a.$userDir = null;
    }
    function cjj_Adler32() {
        var a = this; jl_Object.call(a);
        a.$s1 = Long_ZERO;
        a.$s2 = Long_ZERO;
    }
    function cjj_Adler32__init_() {
        var var_0 = new cjj_Adler32();
        cjj_Adler32__init_0(var_0);
        return var_0;
    }
    function cjj_Adler32__init_0($this) {
        $this.$s1 = Long_fromInt(1);
        $this.$s2 = Long_ZERO;
    }
    function cjj_Adler32_reset($this, $init) {
        $this.$s1 = Long_and($init, Long_fromInt(65535));
        $this.$s2 = Long_and(Long_shr($init, 16), Long_fromInt(65535));
    }
    function cjj_Adler32_reset0($this) {
        $this.$s1 = Long_fromInt(1);
        $this.$s2 = Long_ZERO;
    }
    function cjj_Adler32_getValue($this) {
        return Long_or(Long_shl($this.$s2, 16), $this.$s1);
    }
    function cjj_Adler32_update($this, $buf, $index, $len) {
        var var$4, var$5, $len1, $len2, var$8, $k, var$10;
        if ($len == 1) {
            $buf = $buf.data;
            var$4 = Long_add($this.$s1, Long_fromInt($buf[$index] & 255));
            $this.$s1 = var$4;
            var$5 = Long_add($this.$s2, var$4);
            $this.$s2 = var$5;
            $this.$s1 = Long_rem(var$4, Long_fromInt(65521));
            $this.$s2 = Long_rem(var$5, Long_fromInt(65521));
            return;
        }
        $len1 = $len / 5552 | 0;
        $len2 = $len % 5552 | 0;
        while (true) {
            var$8 = $len1 + (-1) | 0;
            if ($len1 <= 0)
                break;
            $k = 5552;
            while (true) {
                $len1 = $k + (-1) | 0;
                if ($k <= 0)
                    break;
                var$10 = $buf.data;
                var$4 = $this.$s1;
                $len = $index + 1 | 0;
                var$4 = Long_add(var$4, Long_fromInt(var$10[$index] & 255));
                $this.$s1 = var$4;
                $this.$s2 = Long_add($this.$s2, var$4);
                $k = $len1;
                $index = $len;
            }
            $this.$s1 = Long_rem($this.$s1, Long_fromInt(65521));
            $this.$s2 = Long_rem($this.$s2, Long_fromInt(65521));
            $len1 = var$8;
        }
        while (true) {
            $len = $len2 + (-1) | 0;
            if ($len2 <= 0)
                break;
            var$10 = $buf.data;
            var$4 = $this.$s1;
            var$8 = $index + 1 | 0;
            var$4 = Long_add(var$4, Long_fromInt(var$10[$index] & 255));
            $this.$s1 = var$4;
            $this.$s2 = Long_add($this.$s2, var$4);
            $len2 = $len;
            $index = var$8;
        }
        $this.$s1 = Long_rem($this.$s1, Long_fromInt(65521));
        $this.$s2 = Long_rem($this.$s2, Long_fromInt(65521));
    }
    function otrfm_AbstractInMemoryVirtualFile() {
        var a = this; jl_Object.call(a);
        a.$name3 = null;
        a.$parent0 = null;
        a.$lastModified = Long_ZERO;
        a.$readOnly4 = 0;
    }
    function otrfm_AbstractInMemoryVirtualFile__init_($this, $name) {
        $this.$lastModified = jl_System_currentTimeMillis();
        $this.$name3 = $name;
    }
    function otrfm_AbstractInMemoryVirtualFile_modify($this) {
        $this.$lastModified = jl_System_currentTimeMillis();
    }
    function otrfm_InMemoryVirtualDirectory() {
        otrfm_AbstractInMemoryVirtualFile.call(this);
        this.$children = null;
    }
    function otrfm_InMemoryVirtualDirectory_isDirectory($this) {
        return 1;
    }
    function otrfm_InMemoryVirtualDirectory_isFile($this) {
        return 0;
    }
    function otrfm_InMemoryVirtualDirectory_getChildFile($this, $fileName) {
        var var$2, var$3, var$4;
        var$2 = $this.$children;
        var$3 = null;
        if ($fileName === null)
            $fileName = ju_HashMap_findNullKeyEntry(var$2);
        else {
            var$4 = jl_String_hashCode($fileName);
            $fileName = ju_HashMap_findNonNullKeyEntry(var$2, $fileName, (var$4 & 2147483647) % var$2.$elementData.data.length | 0, var$4);
        }
        if ($fileName !== null) {
            if (var$2.$accessOrder)
                ju_LinkedHashMap_linkEntry(var$2, $fileName, 0);
            var$3 = $fileName.$value0;
        }
        return var$3;
    }
    function otrfm_InMemoryVirtualDirectory_createAccessor($this, $readable, $writable, $append) {
        return null;
    }
    function otrfm_InMemoryVirtualDirectory_createFile($this, $fileName) {
        var $file, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11;
        if (!($this.$readOnly4 ? 0 : 1)) {
            $fileName = new ji_IOException;
            jl_Throwable__init_($fileName, $rt_s(186));
            $rt_throw($fileName);
        }
        if (ju_HashMap_containsKey($this.$children, $fileName))
            return null;
        $file = new otrfm_InMemoryVirtualFile;
        otrfm_AbstractInMemoryVirtualFile__init_($file, $fileName);
        $file.$data = $rt_createByteArray(0);
        if (ju_HashMap_containsKey($this.$children, $file.$name3)) {
            $fileName = new jl_IllegalArgumentException;
            var$3 = $file.$name3;
            $file = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($file, $rt_s(187)), var$3), $rt_s(188));
            jl_Throwable__init_($fileName, jl_StringBuilder_toString($file));
            $rt_throw($fileName);
        }
        $file.$parent0 = $this;
        $fileName = $this.$children;
        var$3 = $file.$name3;
        var$4 = $fileName.$elementCount;
        var$5 = $fileName.$accessOrder;
        if (!var$4) {
            $fileName.$head = null;
            $fileName.$tail = null;
        }
        var$6 = var$3 !== null ? jl_String_hashCode(var$3) : 0;
        var$7 = var$6 & 2147483647;
        var$8 = var$7 % $fileName.$elementData.data.length | 0;
        var$9 = var$3 === null ? ju_HashMap_findNullKeyEntry($fileName) : ju_HashMap_findNonNullKeyEntry($fileName, var$3, var$8, var$6);
        if (var$9 === null) {
            $fileName.$modCount = $fileName.$modCount + 1 | 0;
            var$10 = $fileName.$elementCount + 1 | 0;
            $fileName.$elementCount = var$10;
            if (var$10 > $fileName.$threshold) {
                ju_HashMap_rehash($fileName);
                var$8 = var$7 % $fileName.$elementData.data.length | 0;
            }
            var$9 = new ju_LinkedHashMap$LinkedHashMapEntry;
            ju_HashMap$HashEntry__init_0(var$9, var$3, var$6);
            var$9.$chainForward = null;
            var$9.$chainBackward = null;
            var$11 = $fileName.$elementData.data;
            var$9.$next1 = var$11[var$8];
            var$11[var$8] = var$9;
            var$3 = $fileName.$tail;
            if (var$3 === null)
                $fileName.$head = var$9;
            else
                var$3.$chainForward = var$9;
            var$9.$chainBackward = var$3;
            $fileName.$tail = var$9;
        } else if (var$5)
            ju_LinkedHashMap_linkEntry($fileName, var$9, 0);
        var$9.$value0 = $file;
        otrfm_AbstractInMemoryVirtualFile_modify($this);
        return $file;
    }
    var ju_SequencedMap = $rt_classWithoutFields(0);
    function ju_LinkedHashMap() {
        var a = this; ju_HashMap.call(a);
        a.$accessOrder = 0;
        a.$head = null;
        a.$tail = null;
    }
    function ju_LinkedHashMap_newElementArray($this, $s) {
        return $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, $s);
    }
    function ju_LinkedHashMap_linkEntry($this, $entry, $first) {
        var $n, $p;
        if (!$first) {
            $n = $entry.$chainForward;
            if ($n === null)
                return;
            $p = $entry.$chainBackward;
            if ($p === null)
                $this.$head = $n;
            else
                $p.$chainForward = $n;
            $n.$chainBackward = $p;
            $n = $this.$tail;
            if ($n !== null)
                $n.$chainForward = $entry;
            $entry.$chainBackward = $n;
            $entry.$chainForward = null;
            $this.$tail = $entry;
        } else {
            $p = $entry.$chainBackward;
            if ($p === null)
                return;
            $n = $entry.$chainForward;
            if ($n === null)
                $this.$tail = $p;
            else
                $n.$chainBackward = $p;
            $p.$chainForward = $n;
            $n = $this.$head;
            if ($n !== null)
                $n.$chainBackward = $entry;
            $entry.$chainForward = $n;
            $entry.$chainBackward = null;
            $this.$head = $entry;
        }
    }
    var ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException);
    var jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException);
    function ji_ByteArrayInputStream() {
        var a = this; ji_InputStream.call(a);
        a.$buf = null;
        a.$pos = 0;
        a.$mark0 = 0;
        a.$count1 = 0;
    }
    function ji_ByteArrayInputStream_read($this, $b, $off, $len) {
        var $bytesToRead, $i, var$6, var$7, var$8;
        $bytesToRead = jl_Math_min($len, $this.$count1 - $this.$pos | 0);
        $i = 0;
        while ($i < $bytesToRead) {
            var$6 = $b.data;
            $len = $off + 1 | 0;
            var$7 = $this.$buf.data;
            var$8 = $this.$pos;
            $this.$pos = var$8 + 1 | 0;
            var$6[$off] = var$7[var$8];
            $i = $i + 1 | 0;
            $off = $len;
        }
        if ($bytesToRead <= 0)
            $bytesToRead = (-1);
        return $bytesToRead;
    }
    function ji_ByteArrayInputStream_close($this) {}
    var otci_Base64Impl = $rt_classWithoutFields();
    var otci_Base64Impl_alphabet = null;
    var otci_Base64Impl_urlAlphabet = null;
    var otci_Base64Impl_reverse = null;
    var otci_Base64Impl_urlReverse = null;
    function otci_Base64Impl_decode($text, $output, $mapping) {
        var $inputSize, $i, $triples, $c, $j, var$9, $a, $b, $c_0, $d, $out, $rem;
        $text = $text.data;
        $inputSize = $text.length;
        $i = $inputSize - 1 | 0;
        while ($i >= 0 && $text[$i] == 61) {
            $inputSize = $inputSize + (-1) | 0;
            $i = $i + (-1) | 0;
        }
        $triples = ($inputSize / 4 | 0) * 4 | 0;
        $c = 0;
        $j = 0;
        while ($c < $triples) {
            var$9 = $output.data;
            $i = $c + 1 | 0;
            $a = otci_Base64Impl_decode0($mapping, $text[$c]);
            $c = $i + 1 | 0;
            $b = otci_Base64Impl_decode0($mapping, $text[$i]);
            $i = $c + 1 | 0;
            $c_0 = otci_Base64Impl_decode0($mapping, $text[$c]);
            $c = $i + 1 | 0;
            $d = otci_Base64Impl_decode0($mapping, $text[$i]);
            $out = $a << 18 | $b << 12 | $c_0 << 6 | $d;
            $i = $j + 1 | 0;
            var$9[$j] = ($out >>> 16 | 0) << 24 >> 24;
            $a = $i + 1 | 0;
            var$9[$i] = ($out >>> 8 | 0) << 24 >> 24;
            $j = $a + 1 | 0;
            var$9[$a] = $out << 24 >> 24;
        }
        $rem = $inputSize - $c | 0;
        if ($rem == 2)
            $output.data[$j] = (otci_Base64Impl_decode0($mapping, $text[$c]) << 2 | (otci_Base64Impl_decode0($mapping, $text[$c + 1 | 0]) >>> 4 | 0)) << 24 >> 24;
        else if ($rem == 3) {
            $output = $output.data;
            $a = otci_Base64Impl_decode0($mapping, $text[$c]);
            $b = otci_Base64Impl_decode0($mapping, $text[$c + 1 | 0]);
            $c = otci_Base64Impl_decode0($mapping, $text[$c + 2 | 0]);
            $output[$j] = ($a << 2 | ($b >>> 4 | 0)) << 24 >> 24;
            $output[$j + 1 | 0] = ($b << 4 | ($c >>> 2 | 0)) << 24 >> 24;
        }
    }
    function otci_Base64Impl_decode0($mapping, $c) {
        return $mapping.data[$c];
    }
    function otci_Base64Impl__clinit_() {
        var var$1, var$2, var$3, $i, $c, $c_0;
        var$1 = $rt_createByteArray(64);
        var$2 = var$1.data;
        otci_Base64Impl_alphabet = var$1;
        var$1 = $rt_createByteArray(64);
        var$3 = var$1.data;
        otci_Base64Impl_urlAlphabet = var$1;
        var$1 = $rt_createIntArray(256);
        otci_Base64Impl_reverse = var$1;
        otci_Base64Impl_urlReverse = $rt_createIntArray(256);
        $i = 0;
        $c = 65;
        while ($c <= 90) {
            $c_0 = $c << 24 >> 24;
            var$2[$i] = $c_0;
            var$3[$i] = $c_0;
            $i = $i + 1 | 0;
            $c = ($c + 1 | 0) & 65535;
        }
        $c = 97;
        while ($c <= 122) {
            $c_0 = $c << 24 >> 24;
            var$2[$i] = $c_0;
            var$3[$i] = $c_0;
            $i = $i + 1 | 0;
            $c = ($c + 1 | 0) & 65535;
        }
        $c_0 = 48;
        while ($c_0 <= 57) {
            $c = $c_0 << 24 >> 24;
            var$2[$i] = $c;
            var$3[$i] = $c;
            $i = $i + 1 | 0;
            $c_0 = ($c_0 + 1 | 0) & 65535;
        }
        var$2[$i] = 43;
        var$3[$i] = 45;
        $i = $i + 1 | 0;
        var$2[$i] = 47;
        var$3[$i] = 95;
        ju_Arrays_fill(var$1, (-1));
        ju_Arrays_fill(otci_Base64Impl_urlReverse, (-1));
        $c_0 = 0;
        while (true) {
            var$1 = otci_Base64Impl_alphabet.data;
            if ($c_0 >= var$1.length)
                break;
            otci_Base64Impl_reverse.data[var$1[$c_0]] = $c_0;
            otci_Base64Impl_urlReverse.data[otci_Base64Impl_urlAlphabet.data[$c_0]] = $c_0;
            $c_0 = $c_0 + 1 | 0;
        }
    }
    var jl_ArrayIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
    function ju_LinkedHashMap$LinkedHashMapEntry() {
        var a = this; ju_HashMap$HashEntry.call(a);
        a.$chainForward = null;
        a.$chainBackward = null;
    }
    var jl_Float = $rt_classWithoutFields(jl_Number);
    var jl_Float_TYPE = null;
    function jl_Float_floatToIntBits($value) {
        if ($rt_globals.isNaN($value) ? 1 : 0)
            return 2143289344;
        return $rt_floatToRawIntBits($value);
    }
    function jl_Float__clinit_() {
        jl_Float_TYPE = $rt_cls($rt_floatcls());
    }
    var otcic_Console = $rt_classWithoutFields();
    function cjj_Deflate() {
        var a = this; jl_Object.call(a);
        a.$strm = null;
        a.$status0 = 0;
        a.$pending_buf = null;
        a.$pending_buf_size = 0;
        a.$pending_out = 0;
        a.$pending = 0;
        a.$wrap1 = 0;
        a.$data_type0 = 0;
        a.$method = 0;
        a.$last_flush = 0;
        a.$w_size = 0;
        a.$w_bits = 0;
        a.$w_mask = 0;
        a.$window0 = null;
        a.$window_size = 0;
        a.$prev = null;
        a.$head0 = null;
        a.$ins_h = 0;
        a.$hash_size = 0;
        a.$hash_bits = 0;
        a.$hash_mask = 0;
        a.$hash_shift = 0;
        a.$block_start = 0;
        a.$match_length = 0;
        a.$prev_match = 0;
        a.$match_available = 0;
        a.$strstart = 0;
        a.$match_start = 0;
        a.$lookahead = 0;
        a.$prev_length = 0;
        a.$max_chain_length = 0;
        a.$max_lazy_match = 0;
        a.$level3 = 0;
        a.$strategy0 = 0;
        a.$good_match = 0;
        a.$nice_match = 0;
        a.$dyn_ltree = null;
        a.$dyn_dtree = null;
        a.$bl_tree = null;
        a.$l_desc = null;
        a.$d_desc = null;
        a.$bl_desc = null;
        a.$bl_count = null;
        a.$next_code = null;
        a.$heap = null;
        a.$heap_len = 0;
        a.$heap_max = 0;
        a.$depth0 = null;
        a.$l_buf = null;
        a.$lit_bufsize = 0;
        a.$last_lit = 0;
        a.$d_buf = 0;
        a.$opt_len = 0;
        a.$static_len = 0;
        a.$matches = 0;
        a.$last_eob_len = 0;
        a.$bi_buf = 0;
        a.$bi_valid = 0;
        a.$gheader = null;
    }
    var cjj_Deflate_config_table = null;
    var cjj_Deflate_z_errmsg = null;
    function cjj_Deflate_$callClinit() {
        cjj_Deflate_$callClinit = $rt_eraseClinit(cjj_Deflate);
        cjj_Deflate__clinit_();
    }
    function cjj_Deflate_init_block($this) {
        var $i;
        $i = 0;
        while ($i < 286) {
            $this.$dyn_ltree.data[$i * 2 | 0] = 0;
            $i = $i + 1 | 0;
        }
        $i = 0;
        while ($i < 30) {
            $this.$dyn_dtree.data[$i * 2 | 0] = 0;
            $i = $i + 1 | 0;
        }
        $i = 0;
        while ($i < 19) {
            $this.$bl_tree.data[$i * 2 | 0] = 0;
            $i = $i + 1 | 0;
        }
        $this.$dyn_ltree.data[512] = 1;
        $this.$static_len = 0;
        $this.$opt_len = 0;
        $this.$matches = 0;
        $this.$last_lit = 0;
    }
    function cjj_Deflate_pqdownheap($this, $tree, $k) {
        var $v, $j, var$5, var$6;
        $v = $this.$heap.data[$k];
        $j = $k << 1;
        a: {
            while (true) {
                var$5 = $rt_compare($j, $this.$heap_len);
                if (var$5 > 0)
                    break a;
                if (var$5 >= 0)
                    var$5 = $j;
                else {
                    var$6 = $this.$heap.data;
                    var$5 = $j + 1 | 0;
                    if (!cjj_Deflate_smaller($tree, var$6[var$5], var$6[$j], $this.$depth0))
                        var$5 = $j;
                }
                if (cjj_Deflate_smaller($tree, $v, $this.$heap.data[var$5], $this.$depth0))
                    break;
                var$6 = $this.$heap.data;
                var$6[$k] = var$6[var$5];
                $j = var$5 << 1;
                $k = var$5;
            }
        }
        $this.$heap.data[$k] = $v;
    }
    function cjj_Deflate_smaller($tree, $n, $m, $depth) {
        var $tn2;
        cjj_Deflate_$callClinit();
        a: {
            b: {
                $tree = $tree.data;
                $tn2 = $rt_compare($tree[$n * 2 | 0], $tree[$m * 2 | 0]);
                if ($tn2 >= 0) {
                    if ($tn2)
                        break b;
                    $tree = $depth.data;
                    if ($tree[$n] > $tree[$m])
                        break b;
                }
                $n = 1;
                break a;
            }
            $n = 0;
        }
        return $n;
    }
    function cjj_Deflate_scan_tree($this, $tree, $max_code) {
        var $prevlen, $nextlen, $count, $max_count, $min_count, $n, var$9, var$10;
        $tree = $tree.data;
        $prevlen = (-1);
        $nextlen = $tree[1];
        $count = 0;
        $max_count = 7;
        $min_count = 4;
        if (!$nextlen) {
            $max_count = 138;
            $min_count = 3;
        }
        $tree[(($max_code + 1 | 0) * 2 | 0) + 1 | 0] = (-1);
        $n = 0;
        while ($n <= $max_code) {
            $n = $n + 1 | 0;
            var$9 = $tree[($n * 2 | 0) + 1 | 0];
            $count = $count + 1 | 0;
            if (!($count < $max_count && $nextlen == var$9)) {
                if ($count < $min_count) {
                    var$10 = $this.$bl_tree.data;
                    $prevlen = $nextlen * 2 | 0;
                    var$10[$prevlen] = (var$10[$prevlen] + $count | 0) << 16 >> 16;
                } else if (!$nextlen) {
                    if ($count > 10) {
                        var$10 = $this.$bl_tree.data;
                        var$10[36] = (var$10[36] + 1 | 0) << 16 >> 16;
                    } else {
                        var$10 = $this.$bl_tree.data;
                        var$10[34] = (var$10[34] + 1 | 0) << 16 >> 16;
                    }
                } else {
                    if ($nextlen != $prevlen) {
                        var$10 = $this.$bl_tree.data;
                        $max_count = $nextlen * 2 | 0;
                        var$10[$max_count] = (var$10[$max_count] + 1 | 0) << 16 >> 16;
                    }
                    var$10 = $this.$bl_tree.data;
                    var$10[32] = (var$10[32] + 1 | 0) << 16 >> 16;
                }
                $count = 0;
                if (!var$9) {
                    $max_count = 138;
                    $min_count = 3;
                    $prevlen = $nextlen;
                } else if ($nextlen != var$9) {
                    $max_count = 7;
                    $min_count = 4;
                    $prevlen = $nextlen;
                } else {
                    $max_count = 6;
                    $min_count = 3;
                    $prevlen = $nextlen;
                }
            }
            $nextlen = var$9;
        }
    }
    function cjj_Deflate_send_tree($this, $tree, $max_code) {
        var var$3, $prevlen, $nextlen, $count, $max_count, $min_count, $n, var$10;
        var$3 = $tree.data;
        $prevlen = (-1);
        $nextlen = var$3[1];
        $count = 0;
        $max_count = 7;
        $min_count = 4;
        if (!$nextlen) {
            $max_count = 138;
            $min_count = 3;
        }
        $n = 0;
        while ($n <= $max_code) {
            $n = $n + 1 | 0;
            var$10 = var$3[($n * 2 | 0) + 1 | 0];
            $count = $count + 1 | 0;
            if (!($count < $max_count && $nextlen == var$10)) {
                if ($count < $min_count)
                    while (true) {
                        cjj_Deflate_send_code($this, $nextlen, $this.$bl_tree);
                        $count = $count + (-1) | 0;
                        if (!$count)
                            break;
                    }
                else if (!$nextlen) {
                    if ($count > 10) {
                        cjj_Deflate_send_code($this, 18, $this.$bl_tree);
                        cjj_Deflate_send_bits($this, $count - 11 | 0, 7);
                    } else {
                        cjj_Deflate_send_code($this, 17, $this.$bl_tree);
                        cjj_Deflate_send_bits($this, $count - 3 | 0, 3);
                    }
                } else {
                    if ($nextlen != $prevlen) {
                        cjj_Deflate_send_code($this, $nextlen, $this.$bl_tree);
                        $count = $count + (-1) | 0;
                    }
                    cjj_Deflate_send_code($this, 16, $this.$bl_tree);
                    cjj_Deflate_send_bits($this, $count - 3 | 0, 2);
                }
                $count = 0;
                if (!var$10) {
                    $max_count = 138;
                    $min_count = 3;
                    $prevlen = $nextlen;
                } else if ($nextlen != var$10) {
                    $max_count = 7;
                    $min_count = 4;
                    $prevlen = $nextlen;
                } else {
                    $max_count = 6;
                    $min_count = 3;
                    $prevlen = $nextlen;
                }
            }
            $nextlen = var$10;
        }
    }
    function cjj_Deflate_put_byte($this, $p, $start, $len) {
        jl_System_fastArraycopy($p, $start, $this.$pending_buf, $this.$pending, $len);
        $this.$pending = $this.$pending + $len | 0;
    }
    function cjj_Deflate_put_byte0($this, $c) {
        var var$2, var$3;
        var$2 = $this.$pending_buf.data;
        var$3 = $this.$pending;
        $this.$pending = var$3 + 1 | 0;
        var$2[var$3] = $c;
    }
    function cjj_Deflate_put_short($this, $w) {
        cjj_Deflate_put_byte0($this, $w << 24 >> 24);
        cjj_Deflate_put_byte0($this, ($w >>> 8 | 0) << 24 >> 24);
    }
    function cjj_Deflate_putShortMSB($this, $b) {
        cjj_Deflate_put_byte0($this, $b >> 8 << 24 >> 24);
        cjj_Deflate_put_byte0($this, $b << 24 >> 24);
    }
    function cjj_Deflate_send_code($this, $c, $tree) {
        var $c2;
        $tree = $tree.data;
        $c2 = $c * 2 | 0;
        cjj_Deflate_send_bits($this, $tree[$c2] & 65535, $tree[$c2 + 1 | 0] & 65535);
    }
    function cjj_Deflate_send_bits($this, $value, $length) {
        var var$3, var$4;
        var$3 = $this.$bi_valid;
        if (var$3 <= (16 - $length | 0)) {
            $this.$bi_buf = ($this.$bi_buf | $value << var$3 & 65535) << 16 >> 16;
            $this.$bi_valid = var$3 + $length | 0;
        } else {
            var$4 = ($this.$bi_buf | $value << var$3 & 65535) << 16 >> 16;
            $this.$bi_buf = var$4;
            cjj_Deflate_put_short($this, var$4);
            var$3 = $this.$bi_valid;
            $this.$bi_buf = ($value >>> (16 - var$3 | 0) | 0) << 16 >> 16;
            $this.$bi_valid = var$3 + ($length - 16 | 0) | 0;
        }
    }
    function cjj_Deflate__tr_align($this) {
        cjj_Deflate_send_bits($this, 2, 3);
        cjj_StaticTree_$callClinit();
        cjj_Deflate_send_code($this, 256, cjj_StaticTree_static_ltree);
        cjj_Deflate_bi_flush($this);
        if ((((1 + $this.$last_eob_len | 0) + 10 | 0) - $this.$bi_valid | 0) < 9) {
            cjj_Deflate_send_bits($this, 2, 3);
            cjj_Deflate_send_code($this, 256, cjj_StaticTree_static_ltree);
            cjj_Deflate_bi_flush($this);
        }
        $this.$last_eob_len = 7;
    }
    function cjj_Deflate__tr_tally($this, $dist, $lc) {
        var var$3, $dcode, $out_length, $in_length, var$7;
        var$3 = $this.$pending_buf.data;
        $dcode = $this.$d_buf;
        $out_length = $this.$last_lit;
        $in_length = $dcode + ($out_length * 2 | 0) | 0;
        var$3[$in_length] = ($dist >>> 8 | 0) << 24 >> 24;
        var$3[$in_length + 1 | 0] = $dist << 24 >> 24;
        $this.$l_buf.data[$out_length] = $lc << 24 >> 24;
        $this.$last_lit = $out_length + 1 | 0;
        if (!$dist) {
            var$3 = $this.$dyn_ltree.data;
            $dist = $lc * 2 | 0;
            var$3[$dist] = (var$3[$dist] + 1 | 0) << 16 >> 16;
        } else {
            $this.$matches = $this.$matches + 1 | 0;
            $dist = $dist + (-1) | 0;
            var$7 = $this.$dyn_ltree.data;
            $lc = ((cjj_Tree__length_code.data[$lc] + 256 | 0) + 1 | 0) * 2 | 0;
            var$7[$lc] = (var$7[$lc] + 1 | 0) << 16 >> 16;
            var$3 = $this.$dyn_dtree.data;
            $dist = cjj_Tree_d_code($dist) * 2 | 0;
            var$3[$dist] = (var$3[$dist] + 1 | 0) << 16 >> 16;
        }
        $lc = $this.$last_lit;
        if (!($lc & 8191) && $this.$level3 > 2) {
            $out_length = $lc * 8 | 0;
            $in_length = $this.$strstart - $this.$block_start | 0;
            $dcode = 0;
            while ($dcode < 30) {
                $out_length = Long_lo(Long_add(Long_fromInt($out_length), Long_mul(Long_fromInt($this.$dyn_dtree.data[$dcode * 2 | 0]), Long_add(Long_fromInt(5), Long_fromInt(cjj_Tree_extra_dbits.data[$dcode])))));
                $dcode = $dcode + 1 | 0;
            }
            $dist = $out_length >>> 3 | 0;
            if ($this.$matches < ($lc / 2 | 0) && $dist < ($in_length / 2 | 0))
                return 1;
        }
        return $lc != ($this.$lit_bufsize - 1 | 0) ? 0 : 1;
    }
    function cjj_Deflate_compress_block($this, $ltree, $dtree) {
        var $lx, var$4, $code, $dist, $lc, $extra;
        a: {
            $lx = 0;
            if ($this.$last_lit)
                while (true) {
                    var$4 = $this.$pending_buf.data;
                    $code = $this.$d_buf + ($lx * 2 | 0) | 0;
                    $dist = var$4[$code] << 8 & 65280 | var$4[$code + 1 | 0] & 255;
                    $lc = $this.$l_buf.data[$lx] & 255;
                    $lx = $lx + 1 | 0;
                    if (!$dist)
                        cjj_Deflate_send_code($this, $lc, $ltree);
                    else {
                        $code = cjj_Tree__length_code.data[$lc];
                        cjj_Deflate_send_code($this, ($code + 256 | 0) + 1 | 0, $ltree);
                        $extra = cjj_Tree_extra_lbits.data[$code];
                        if ($extra)
                            cjj_Deflate_send_bits($this, $lc - cjj_Tree_base_length.data[$code] | 0, $extra);
                        $dist = $dist + (-1) | 0;
                        $code = cjj_Tree_d_code($dist);
                        cjj_Deflate_send_code($this, $code, $dtree);
                        $lc = cjj_Tree_extra_dbits.data[$code];
                        if ($lc)
                            cjj_Deflate_send_bits($this, $dist - cjj_Tree_base_dist.data[$code] | 0, $lc);
                    }
                    if ($lx >= $this.$last_lit)
                        break a;
                }
        }
        $dtree = $ltree.data;
        cjj_Deflate_send_code($this, 256, $ltree);
        $this.$last_eob_len = $dtree[513];
    }
    function cjj_Deflate_bi_flush($this) {
        var var$1;
        var$1 = $this.$bi_valid;
        if (var$1 == 16) {
            cjj_Deflate_put_short($this, $this.$bi_buf);
            $this.$bi_buf = 0;
            $this.$bi_valid = 0;
        } else if (var$1 >= 8) {
            cjj_Deflate_put_byte0($this, $this.$bi_buf << 24 >> 24);
            $this.$bi_buf = ($this.$bi_buf >>> 8 | 0) << 16 >> 16;
            $this.$bi_valid = $this.$bi_valid - 8 | 0;
        }
    }
    function cjj_Deflate_bi_windup($this) {
        var var$1;
        var$1 = $this.$bi_valid;
        if (var$1 > 8)
            cjj_Deflate_put_short($this, $this.$bi_buf);
        else if (var$1 > 0)
            cjj_Deflate_put_byte0($this, $this.$bi_buf << 24 >> 24);
        $this.$bi_buf = 0;
        $this.$bi_valid = 0;
    }
    function cjj_Deflate_flush_block_only($this, $eof) {
        var var$2, var$3, var$4, var$5, var$6, var$7;
        var$2 = $this.$block_start;
        var$3 = var$2 < 0 ? (-1) : var$2;
        var$4 = $this.$strstart - var$2 | 0;
        var$5 = 0;
        if ($this.$level3 <= 0) {
            var$6 = var$4 + 5 | 0;
            var$2 = var$6;
        } else {
            if ($this.$data_type0 == 2) {
                var$2 = 0;
                var$6 = 0;
                var$5 = 0;
                while (var$2 < 7) {
                    var$5 = var$5 + $this.$dyn_ltree.data[var$2 * 2 | 0] | 0;
                    var$2 = var$2 + 1 | 0;
                }
                while (var$2 < 128) {
                    var$6 = var$6 + $this.$dyn_ltree.data[var$2 * 2 | 0] | 0;
                    var$2 = var$2 + 1 | 0;
                }
                while (var$2 < 256) {
                    var$5 = var$5 + $this.$dyn_ltree.data[var$2 * 2 | 0] | 0;
                    var$2 = var$2 + 1 | 0;
                }
                $this.$data_type0 = (var$5 <= (var$6 >>> 2 | 0) ? 1 : 0) << 24 >> 24;
            }
            cjj_Tree_build_tree($this.$l_desc, $this);
            cjj_Tree_build_tree($this.$d_desc, $this);
            cjj_Deflate_scan_tree($this, $this.$dyn_ltree, $this.$l_desc.$max_code);
            cjj_Deflate_scan_tree($this, $this.$dyn_dtree, $this.$d_desc.$max_code);
            cjj_Tree_build_tree($this.$bl_desc, $this);
            var$5 = 18;
            a: {
                while (true) {
                    if (var$5 < 3)
                        break a;
                    if ($this.$bl_tree.data[(cjj_Tree_bl_order.data[var$5] * 2 | 0) + 1 | 0])
                        break;
                    var$5 = var$5 + (-1) | 0;
                }
            }
            var$7 = $this.$opt_len + ((((3 * (var$5 + 1 | 0) | 0) + 5 | 0) + 5 | 0) + 4 | 0) | 0;
            $this.$opt_len = var$7;
            var$2 = ((var$7 + 3 | 0) + 7 | 0) >>> 3 | 0;
            var$6 = (($this.$static_len + 3 | 0) + 7 | 0) >>> 3 | 0;
            if (var$6 <= var$2)
                var$2 = var$6;
        }
        if ((var$4 + 4 | 0) <= var$2 && var$3 != (-1))
            cjj_Deflate__tr_stored_block($this, var$3, var$4, $eof);
        else if (var$6 == var$2) {
            cjj_Deflate_send_bits($this, 2 + (!$eof ? 0 : 1) | 0, 3);
            cjj_StaticTree_$callClinit();
            cjj_Deflate_compress_block($this, cjj_StaticTree_static_ltree, cjj_StaticTree_static_dtree);
        } else {
            cjj_Deflate_send_bits($this, 4 + (!$eof ? 0 : 1) | 0, 3);
            var$3 = $this.$l_desc.$max_code + 1 | 0;
            var$7 = $this.$d_desc.$max_code + 1 | 0;
            var$2 = var$5 + 1 | 0;
            cjj_Deflate_send_bits($this, var$3 - 257 | 0, 5);
            var$7 = var$7 - 1 | 0;
            cjj_Deflate_send_bits($this, var$7, 5);
            cjj_Deflate_send_bits($this, var$2 - 4 | 0, 4);
            var$6 = 0;
            while (var$6 < var$2) {
                cjj_Deflate_send_bits($this, $this.$bl_tree.data[(cjj_Tree_bl_order.data[var$6] * 2 | 0) + 1 | 0], 3);
                var$6 = var$6 + 1 | 0;
            }
            cjj_Deflate_send_tree($this, $this.$dyn_ltree, var$3 - 1 | 0);
            cjj_Deflate_send_tree($this, $this.$dyn_dtree, var$7);
            cjj_Deflate_compress_block($this, $this.$dyn_ltree, $this.$dyn_dtree);
        }
        cjj_Deflate_init_block($this);
        if ($eof)
            cjj_Deflate_bi_windup($this);
        $this.$block_start = $this.$strstart;
        cjj_ZStream_flush_pending($this.$strm);
    }
    function cjj_Deflate_deflate_stored($this, $flush) {
        var var$2, $max_block_size, $max_start;
        var$2 = $this.$pending_buf_size - 5 | 0;
        if (65535 <= var$2)
            var$2 = 65535;
        while (true) {
            if ($this.$lookahead <= 1) {
                cjj_Deflate_fill_window($this);
                $max_block_size = $this.$lookahead;
                if (!$max_block_size && !$flush)
                    return 0;
                if (!$max_block_size) {
                    $flush = $rt_compare($flush, 4);
                    cjj_Deflate_flush_block_only($this, $flush ? 0 : 1);
                    if ($this.$strm.$avail_out)
                        return $flush ? 1 : 3;
                    return $flush ? 0 : 2;
                }
            }
            $max_block_size = $this.$strstart + $this.$lookahead | 0;
            $this.$strstart = $max_block_size;
            $this.$lookahead = 0;
            $max_start = $this.$block_start + var$2 | 0;
            if (!($max_block_size && $max_block_size < $max_start)) {
                $this.$lookahead = $max_block_size - $max_start | 0;
                $this.$strstart = $max_start;
                cjj_Deflate_flush_block_only($this, 0);
                if (!$this.$strm.$avail_out)
                    return 0;
            }
            if (($this.$strstart - $this.$block_start | 0) < ($this.$w_size - 262 | 0))
                continue;
            cjj_Deflate_flush_block_only($this, 0);
            if (!$this.$strm.$avail_out)
                break;
        }
        return 0;
    }
    function cjj_Deflate__tr_stored_block($this, $buf, $stored_len, $eof) {
        cjj_Deflate_send_bits($this, 0 + (!$eof ? 0 : 1) | 0, 3);
        cjj_Deflate_bi_windup($this);
        $this.$last_eob_len = 8;
        cjj_Deflate_put_short($this, $stored_len << 16 >> 16);
        cjj_Deflate_put_short($this, ($stored_len ^ (-1)) << 16 >> 16);
        cjj_Deflate_put_byte($this, $this.$window0, $buf, $stored_len);
    }
    function cjj_Deflate_fill_window($this) {
        var $n, var$2, $m, $n_0, var$5, $p, var$7, var$8;
        while (true) {
            $n = $this.$window_size;
            var$2 = $this.$lookahead;
            $n = $n - var$2 | 0;
            $m = $this.$strstart;
            $n_0 = $n - $m | 0;
            if (!$n_0 && !$m && !var$2)
                $n_0 = $this.$w_size;
            else if ($n_0 == (-1))
                $n_0 = $n_0 + (-1) | 0;
            else {
                var$2 = $this.$w_size;
                if ($m >= ((var$2 + var$2 | 0) - 262 | 0)) {
                    var$5 = $this.$window0;
                    jl_System_fastArraycopy(var$5, var$2, var$5, 0, var$2);
                    $n = $this.$match_start;
                    var$2 = $this.$w_size;
                    $this.$match_start = $n - var$2 | 0;
                    $this.$strstart = $this.$strstart - var$2 | 0;
                    $this.$block_start = $this.$block_start - var$2 | 0;
                    $n = $this.$hash_size;
                    $p = $n;
                    while (true) {
                        var$5 = $this.$head0.data;
                        $p = $p + (-1) | 0;
                        $m = var$5[$p] & 65535;
                        var$5[$p] = $m < var$2 ? 0 : ($m - var$2 | 0) << 16 >> 16;
                        $n = $n + (-1) | 0;
                        if (!$n)
                            break;
                    }
                    $m = var$2;
                    $p = var$2;
                    while (true) {
                        var$5 = $this.$prev.data;
                        $m = $m + (-1) | 0;
                        var$7 = var$5[$m] & 65535;
                        var$5[$m] = var$7 < var$2 ? 0 : (var$7 - var$2 | 0) << 16 >> 16;
                        $p = $p + (-1) | 0;
                        if (!$p)
                            break;
                    }
                    $n_0 = $n_0 + var$2 | 0;
                }
            }
            var$8 = $this.$strm;
            $n = var$8.$avail_in;
            if (!$n)
                return;
            var$5 = $this.$window0;
            var$2 = $this.$strstart + $this.$lookahead | 0;
            if ($n <= $n_0)
                $n_0 = $n;
            if (!$n_0)
                $n_0 = 0;
            else {
                var$8.$avail_in = $n - $n_0 | 0;
                if (var$8.$dstate.$wrap1)
                    var$8.$adler.$update1(var$8.$next_in, var$8.$next_in_index, $n_0);
                jl_System_fastArraycopy(var$8.$next_in, var$8.$next_in_index, var$5, var$2, $n_0);
                var$8.$next_in_index = var$8.$next_in_index + $n_0 | 0;
                var$8.$total_in = Long_add(var$8.$total_in, Long_fromInt($n_0));
            }
            $n = $this.$lookahead + $n_0 | 0;
            $this.$lookahead = $n;
            if ($n >= 3) {
                var$5 = $this.$window0.data;
                var$2 = $this.$strstart;
                $m = var$5[var$2] & 255;
                $this.$ins_h = $m;
                $this.$ins_h = ($m << $this.$hash_shift ^ var$5[var$2 + 1 | 0] & 255) & $this.$hash_mask;
            }
            if ($n >= 262)
                break;
            if ($this.$strm.$avail_in)
                continue;
            else
                break;
        }
    }
    function cjj_Deflate_deflate_fast($this, $flush) {
        var $hash_head, $bflush, var$4, var$5, var$6;
        $hash_head = 0;
        while (true) {
            if ($this.$lookahead < 262) {
                cjj_Deflate_fill_window($this);
                $bflush = $this.$lookahead;
                if ($bflush < 262 && !$flush)
                    return 0;
                if (!$bflush) {
                    $flush = $rt_compare($flush, 4);
                    cjj_Deflate_flush_block_only($this, $flush ? 0 : 1);
                    if (!$this.$strm.$avail_out) {
                        if ($flush)
                            return 0;
                        return 2;
                    }
                    return $flush ? 1 : 3;
                }
            }
            if ($this.$lookahead >= 3) {
                $hash_head = $this.$ins_h << $this.$hash_shift;
                var$4 = $this.$window0.data;
                $bflush = $this.$strstart;
                var$5 = ($hash_head ^ var$4[$bflush + 2 | 0] & 255) & $this.$hash_mask;
                $this.$ins_h = var$5;
                var$4 = $this.$head0.data;
                $hash_head = var$4[var$5] & 65535;
                $this.$prev.data[$bflush & $this.$w_mask] = var$4[var$5];
                var$4[var$5] = $bflush << 16 >> 16;
            }
            if (Long_ne(Long_fromInt($hash_head), Long_ZERO) && (($this.$strstart - $hash_head | 0) & 65535) <= ($this.$w_size - 262 | 0) && $this.$strategy0 != 2)
                $this.$match_length = cjj_Deflate_longest_match($this, $hash_head);
            var$6 = $this.$match_length;
            if (var$6 < 3) {
                $bflush = cjj_Deflate__tr_tally($this, 0, $this.$window0.data[$this.$strstart] & 255);
                $this.$lookahead = $this.$lookahead - 1 | 0;
                $this.$strstart = $this.$strstart + 1 | 0;
            } else {
                $bflush = cjj_Deflate__tr_tally($this, $this.$strstart - $this.$match_start | 0, var$6 - 3 | 0);
                var$5 = $this.$lookahead;
                var$6 = $this.$match_length;
                var$5 = var$5 - var$6 | 0;
                $this.$lookahead = var$5;
                if (var$6 <= $this.$max_lazy_match && var$5 >= 3) {
                    $this.$match_length = var$6 - 1 | 0;
                    while (true) {
                        var$5 = $this.$strstart + 1 | 0;
                        $this.$strstart = var$5;
                        var$6 = ($this.$ins_h << $this.$hash_shift ^ $this.$window0.data[var$5 + 2 | 0] & 255) & $this.$hash_mask;
                        $this.$ins_h = var$6;
                        var$4 = $this.$head0.data;
                        $hash_head = var$4[var$6] & 65535;
                        $this.$prev.data[var$5 & $this.$w_mask] = var$4[var$6];
                        var$4[var$6] = var$5 << 16 >> 16;
                        var$6 = $this.$match_length - 1 | 0;
                        $this.$match_length = var$6;
                        if (var$6)
                            continue;
                        else
                            break;
                    }
                    $this.$strstart = var$5 + 1 | 0;
                } else {
                    var$5 = $this.$strstart + var$6 | 0;
                    $this.$strstart = var$5;
                    $this.$match_length = 0;
                    var$4 = $this.$window0.data;
                    var$6 = var$4[var$5] & 255;
                    $this.$ins_h = var$6;
                    $this.$ins_h = (var$6 << $this.$hash_shift ^ var$4[var$5 + 1 | 0] & 255) & $this.$hash_mask;
                }
            }
            if (!$bflush)
                continue;
            cjj_Deflate_flush_block_only($this, 0);
            if (!$this.$strm.$avail_out)
                break;
        }
        return 0;
    }
    function cjj_Deflate_deflate_slow($this, $flush) {
        var $hash_head, $bflush, var$4, $max_insert, var$6, var$7;
        $hash_head = 0;
        while (true) {
            if ($this.$lookahead < 262) {
                cjj_Deflate_fill_window($this);
                $bflush = $this.$lookahead;
                if ($bflush < 262 && !$flush)
                    return 0;
                if (!$bflush) {
                    if ($this.$match_available) {
                        cjj_Deflate__tr_tally($this, 0, $this.$window0.data[$this.$strstart - 1 | 0] & 255);
                        $this.$match_available = 0;
                    }
                    $flush = $rt_compare($flush, 4);
                    cjj_Deflate_flush_block_only($this, $flush ? 0 : 1);
                    if (!$this.$strm.$avail_out) {
                        if ($flush)
                            return 0;
                        return 2;
                    }
                    return $flush ? 1 : 3;
                }
            }
            if ($this.$lookahead >= 3) {
                $hash_head = $this.$ins_h << $this.$hash_shift;
                var$4 = $this.$window0.data;
                $bflush = $this.$strstart;
                $max_insert = ($hash_head ^ var$4[$bflush + 2 | 0] & 255) & $this.$hash_mask;
                $this.$ins_h = $max_insert;
                var$4 = $this.$head0.data;
                $hash_head = var$4[$max_insert] & 65535;
                $this.$prev.data[$bflush & $this.$w_mask] = var$4[$max_insert];
                var$4[$max_insert] = $bflush << 16 >> 16;
            }
            a: {
                $max_insert = $this.$match_length;
                $this.$prev_length = $max_insert;
                $this.$prev_match = $this.$match_start;
                $this.$match_length = 2;
                if ($hash_head && $max_insert < $this.$max_lazy_match && (($this.$strstart - $hash_head | 0) & 65535) <= ($this.$w_size - 262 | 0)) {
                    if ($this.$strategy0 != 2)
                        $this.$match_length = cjj_Deflate_longest_match($this, $hash_head);
                    $bflush = $this.$match_length;
                    if ($bflush <= 5) {
                        if ($this.$strategy0 != 1) {
                            if ($bflush != 3)
                                break a;
                            if (($this.$strstart - $this.$match_start | 0) <= 4096)
                                break a;
                        }
                        $this.$match_length = 2;
                    }
                }
            }
            var$6 = $this.$prev_length;
            if (!(var$6 >= 3 && $this.$match_length <= var$6)) {
                if (!$this.$match_available) {
                    $this.$match_available = 1;
                    $this.$strstart = $this.$strstart + 1 | 0;
                    $this.$lookahead = $this.$lookahead - 1 | 0;
                    continue;
                }
                if (cjj_Deflate__tr_tally($this, 0, $this.$window0.data[$this.$strstart - 1 | 0] & 255))
                    cjj_Deflate_flush_block_only($this, 0);
                $this.$strstart = $this.$strstart + 1 | 0;
                $this.$lookahead = $this.$lookahead - 1 | 0;
                if (!$this.$strm.$avail_out)
                    break;
                continue;
            }
            $bflush = $this.$strstart;
            $max_insert = ($bflush + $this.$lookahead | 0) - 3 | 0;
            $bflush = cjj_Deflate__tr_tally($this, ($bflush - 1 | 0) - $this.$prev_match | 0, var$6 - 3 | 0);
            var$7 = $this.$lookahead;
            var$6 = $this.$prev_length;
            $this.$lookahead = var$7 - (var$6 - 1 | 0) | 0;
            $this.$prev_length = var$6 - 2 | 0;
            while (true) {
                var$7 = $this.$strstart + 1 | 0;
                $this.$strstart = var$7;
                if (var$7 <= $max_insert) {
                    var$6 = ($this.$ins_h << $this.$hash_shift ^ $this.$window0.data[var$7 + 2 | 0] & 255) & $this.$hash_mask;
                    $this.$ins_h = var$6;
                    var$4 = $this.$head0.data;
                    $hash_head = var$4[var$6] & 65535;
                    $this.$prev.data[var$7 & $this.$w_mask] = var$4[var$6];
                    var$4[var$6] = var$7 << 16 >> 16;
                }
                var$6 = $this.$prev_length - 1 | 0;
                $this.$prev_length = var$6;
                if (!var$6)
                    break;
            }
            $this.$match_available = 0;
            $this.$match_length = 2;
            $this.$strstart = var$7 + 1 | 0;
            if ($bflush) {
                cjj_Deflate_flush_block_only($this, 0);
                if (!$this.$strm.$avail_out)
                    return 0;
            }
        }
        return 0;
    }
    function cjj_Deflate_longest_match($this, $cur_match) {
        var $chain_length, $scan, $best_len, $len, $limit, $nice_match, $wmask, $strend, var$10, $scan_end1, $scan_end, var$13, var$14, var$15, var$16;
        $chain_length = $this.$max_chain_length;
        $scan = $this.$strstart;
        $best_len = $this.$prev_length;
        $len = $this.$w_size - 262 | 0;
        $limit = $scan <= $len ? 0 : $scan - $len | 0;
        $nice_match = $this.$nice_match;
        $wmask = $this.$w_mask;
        $strend = $scan + 258 | 0;
        var$10 = $this.$window0.data;
        $len = $scan + $best_len | 0;
        $scan_end1 = var$10[$len - 1 | 0];
        $scan_end = var$10[$len];
        if ($best_len >= $this.$good_match)
            $chain_length = $chain_length >> 2;
        var$13 = $this.$lookahead;
        if ($nice_match > var$13)
            $nice_match = var$13;
        var$14 = $strend - 258 | 0;
        a: {
            while (true) {
                $len = $cur_match + $best_len | 0;
                if (var$10[$len] == $scan_end && var$10[$len - 1 | 0] == $scan_end1 && var$10[$cur_match] == var$10[$scan]) {
                    var$15 = $cur_match + 1 | 0;
                    if (var$10[var$15] == var$10[$scan + 1 | 0]) {
                        $len = $scan + 2 | 0;
                        $scan = var$15 + 1 | 0;
                        b: {
                            while (true) {
                                $len = $len + 1 | 0;
                                var$15 = var$10[$len];
                                $scan = $scan + 1 | 0;
                                if (var$15 != var$10[$scan])
                                    break;
                                $len = $len + 1 | 0;
                                var$15 = var$10[$len];
                                var$16 = $scan + 1 | 0;
                                if (var$15 != var$10[var$16])
                                    break b;
                                $len = $len + 1 | 0;
                                $scan = var$10[$len];
                                var$15 = var$16 + 1 | 0;
                                if ($scan != var$10[var$15])
                                    break b;
                                $len = $len + 1 | 0;
                                var$16 = var$10[$len];
                                $scan = var$15 + 1 | 0;
                                if (var$16 != var$10[$scan])
                                    break b;
                                $len = $len + 1 | 0;
                                var$15 = var$10[$len];
                                $scan = $scan + 1 | 0;
                                if (var$15 != var$10[$scan])
                                    break b;
                                $len = $len + 1 | 0;
                                var$15 = var$10[$len];
                                $scan = $scan + 1 | 0;
                                if (var$15 != var$10[$scan])
                                    break b;
                                $len = $len + 1 | 0;
                                var$15 = var$10[$len];
                                $scan = $scan + 1 | 0;
                                if (var$15 != var$10[$scan])
                                    break b;
                                $len = $len + 1 | 0;
                                var$15 = var$10[$len];
                                $scan = $scan + 1 | 0;
                                if (var$15 != var$10[$scan])
                                    break b;
                                if ($len >= $strend)
                                    break b;
                            }
                        }
                        $len = 258 - ($strend - $len | 0) | 0;
                        if ($len <= $best_len)
                            $scan = var$14;
                        else {
                            $this.$match_start = $cur_match;
                            if ($len >= $nice_match)
                                break;
                            $scan_end = var$14 + $len | 0;
                            $scan_end1 = var$10[$scan_end - 1 | 0];
                            $scan_end = var$10[$scan_end];
                            $scan = var$14;
                            $best_len = $len;
                        }
                    }
                }
                $cur_match = $this.$prev.data[$cur_match & $wmask] & 65535;
                if ($cur_match <= $limit) {
                    $len = $best_len;
                    break a;
                }
                $chain_length = $chain_length + (-1) | 0;
                if (!$chain_length) {
                    $len = $best_len;
                    break a;
                }
            }
        }
        if ($len > var$13)
            return var$13;
        return $len;
    }
    function cjj_Deflate_deflateInit($this, $level, $method, $windowBits, $memLevel, $strategy) {
        var $wrap, var$7, var$8, var$9, var$10, var$11;
        $wrap = 1;
        var$7 = $this.$strm;
        var$7.$msg = null;
        if ($level == (-1))
            $level = 6;
        if ($windowBits < 0) {
            $wrap = 0;
            $windowBits =  -$windowBits | 0;
        } else if ($windowBits > 15) {
            $wrap = 2;
            $windowBits = $windowBits + (-16) | 0;
            var$7.$adler = cjj_CRC32__init_();
        }
        a: {
            if ($memLevel < 1)
                break a;
            if ($memLevel > 9)
                break a;
            if ($method != 8)
                break a;
            if ($windowBits < 9)
                break a;
            if ($windowBits > 15)
                break a;
            if ($level < 0)
                break a;
            if ($level > 9)
                break a;
            if ($strategy < 0)
                break a;
            if ($strategy <= 2) {
                var$8 = $this.$strm;
                var$8.$dstate = $this;
                $this.$wrap1 = $wrap;
                $this.$w_bits = $windowBits;
                $windowBits = 1 << $windowBits;
                $this.$w_size = $windowBits;
                $this.$w_mask = $windowBits - 1 | 0;
                var$9 = $memLevel + 7 | 0;
                $this.$hash_bits = var$9;
                var$10 = 1 << var$9;
                $this.$hash_size = var$10;
                $this.$hash_mask = var$10 - 1 | 0;
                $this.$hash_shift = ((var$9 + 3 | 0) - 1 | 0) / 3 | 0;
                $this.$window0 = $rt_createByteArray($windowBits * 2 | 0);
                $this.$prev = $rt_createShortArray($windowBits);
                $this.$head0 = $rt_createShortArray(var$10);
                $windowBits = 1 << ($memLevel + 6 | 0);
                $this.$lit_bufsize = $windowBits;
                $memLevel = $windowBits * 3 | 0;
                $this.$pending_buf = $rt_createByteArray($memLevel);
                $this.$pending_buf_size = $memLevel;
                $this.$d_buf = $windowBits;
                $this.$l_buf = $rt_createByteArray($windowBits);
                $this.$level3 = $level;
                $this.$strategy0 = $strategy;
                $this.$method = $method << 24 >> 24;
                var$8.$total_out = Long_ZERO;
                var$8.$total_in = Long_ZERO;
                var$8.$msg = null;
                var$8.$data_type = 2;
                $this.$pending = 0;
                $this.$pending_out = 0;
                if ($wrap < 0)
                    $this.$wrap1 =  -$wrap | 0;
                $this.$status0 = $this.$wrap1 ? 42 : 113;
                var$8.$adler.$reset();
                $this.$last_flush = 0;
                var$8 = $this.$l_desc;
                var$8.$dyn_tree = $this.$dyn_ltree;
                cjj_StaticTree_$callClinit();
                var$8.$stat_desc = cjj_StaticTree_static_l_desc;
                var$8 = $this.$d_desc;
                var$8.$dyn_tree = $this.$dyn_dtree;
                var$8.$stat_desc = cjj_StaticTree_static_d_desc;
                var$8 = $this.$bl_desc;
                var$8.$dyn_tree = $this.$bl_tree;
                var$8.$stat_desc = cjj_StaticTree_static_bl_desc;
                $this.$bi_buf = 0;
                $this.$bi_valid = 0;
                $this.$last_eob_len = 8;
                cjj_Deflate_init_block($this);
                $this.$window_size = 2 * $this.$w_size | 0;
                var$11 = $this.$head0.data;
                $level = $this.$hash_size - 1 | 0;
                var$11[$level] = 0;
                $method = 0;
                while ($method < $level) {
                    var$11[$method] = 0;
                    $method = $method + 1 | 0;
                }
                var$11 = cjj_Deflate_config_table.data;
                $level = $this.$level3;
                $this.$max_lazy_match = var$11[$level].$max_lazy;
                $this.$good_match = var$11[$level].$good_length;
                $this.$nice_match = var$11[$level].$nice_length;
                $this.$max_chain_length = var$11[$level].$max_chain;
                $this.$strstart = 0;
                $this.$block_start = 0;
                $this.$lookahead = 0;
                $this.$prev_length = 2;
                $this.$match_length = 2;
                $this.$match_available = 0;
                $this.$ins_h = 0;
                return 0;
            }
        }
        return (-2);
    }
    function cjj_Deflate_deflate($this, $flush) {
        var var$2, var$3, $level_flags, $old_flush, $header, $adler, $bstate, $i;
        var$2 = $rt_compare($flush, 4);
        if (var$2 <= 0 && $flush >= 0) {
            a: {
                var$3 = $this.$strm;
                if (var$3.$next_out !== null && !(var$3.$next_in === null && var$3.$avail_in)) {
                    $level_flags = $this.$status0;
                    if ($level_flags != 666)
                        break a;
                    if (!var$2)
                        break a;
                }
                cjj_Deflate_$callClinit();
                var$3.$msg = cjj_Deflate_z_errmsg.data[4];
                return (-2);
            }
            if (!var$3.$avail_out) {
                cjj_Deflate_$callClinit();
                var$3.$msg = cjj_Deflate_z_errmsg.data[7];
                return (-5);
            }
            $old_flush = $this.$last_flush;
            $this.$last_flush = $flush;
            if ($level_flags == 42) {
                if ($this.$wrap1 == 2) {
                    cjj_GZIPHeader_put(cjj_Deflate_getGZIPHeader($this), $this);
                    $this.$status0 = 113;
                    $this.$strm.$adler.$reset();
                } else {
                    $header = (8 + (($this.$w_bits - 8 | 0) << 4) | 0) << 8;
                    $level_flags = (($this.$level3 - 1 | 0) & 255) >> 1;
                    if ($level_flags > 3)
                        $level_flags = 3;
                    $header = $header | $level_flags << 6;
                    if ($this.$strstart)
                        $header = $header | 32;
                    $level_flags = $header + (31 - ($header % 31 | 0) | 0) | 0;
                    $this.$status0 = 113;
                    cjj_Deflate_putShortMSB($this, $level_flags);
                    if ($this.$strstart) {
                        $adler = $this.$strm.$adler.$getValue();
                        cjj_Deflate_putShortMSB($this, Long_lo(Long_shru($adler, 16)));
                        cjj_Deflate_putShortMSB($this, Long_lo(Long_and($adler, Long_fromInt(65535))));
                    }
                    $this.$strm.$adler.$reset();
                }
            }
            b: {
                if ($this.$pending) {
                    cjj_ZStream_flush_pending($this.$strm);
                    if ($this.$strm.$avail_out)
                        break b;
                    $this.$last_flush = (-1);
                    return 0;
                }
                var$3 = $this.$strm;
                if (!var$3.$avail_in && $flush <= $old_flush && var$2) {
                    cjj_Deflate_$callClinit();
                    var$3.$msg = cjj_Deflate_z_errmsg.data[7];
                    return (-5);
                }
            }
            $level_flags = $rt_compare($this.$status0, 666);
            if (!$level_flags) {
                var$3 = $this.$strm;
                if (var$3.$avail_in) {
                    cjj_Deflate_$callClinit();
                    var$3.$msg = cjj_Deflate_z_errmsg.data[7];
                    return (-5);
                }
            }
            c: {
                if (!$this.$strm.$avail_in && !$this.$lookahead) {
                    if (!$flush)
                        break c;
                    if (!$level_flags)
                        break c;
                }
                d: {
                    $bstate = (-1);
                    cjj_Deflate_$callClinit();
                    switch (cjj_Deflate_config_table.data[$this.$level3].$func) {
                        case 0:
                            $bstate = cjj_Deflate_deflate_stored($this, $flush);
                            break d;
                        case 1:
                            $bstate = cjj_Deflate_deflate_fast($this, $flush);
                            break d;
                        case 2:
                            $bstate = cjj_Deflate_deflate_slow($this, $flush);
                            break d;
                        default:
                    }
                }
                $level_flags = $rt_compare($bstate, 2);
                if (!($level_flags && $bstate != 3))
                    $this.$status0 = 666;
                if ($bstate && $level_flags) {
                    if ($bstate != 1)
                        break c;
                    e: {
                        if ($flush == 1)
                            cjj_Deflate__tr_align($this);
                        else {
                            cjj_Deflate__tr_stored_block($this, 0, 0, 0);
                            if ($flush == 3) {
                                $i = 0;
                                while (true) {
                                    if ($i >= $this.$hash_size)
                                        break e;
                                    $this.$head0.data[$i] = 0;
                                    $i = $i + 1 | 0;
                                }
                            }
                        }
                    }
                    cjj_ZStream_flush_pending($this.$strm);
                    if ($this.$strm.$avail_out)
                        break c;
                    $this.$last_flush = (-1);
                    return 0;
                }
                if (!$this.$strm.$avail_out)
                    $this.$last_flush = (-1);
                return 0;
            }
            if (var$2)
                return 0;
            $flush = $this.$wrap1;
            if ($flush <= 0)
                return 1;
            if ($flush != 2) {
                $adler = $this.$strm.$adler.$getValue();
                cjj_Deflate_putShortMSB($this, Long_lo(Long_shru($adler, 16)));
                cjj_Deflate_putShortMSB($this, Long_lo(Long_and($adler, Long_fromInt(65535))));
            } else {
                $adler = $this.$strm.$adler.$getValue();
                cjj_Deflate_put_byte0($this, Long_lo(Long_and($adler, Long_fromInt(255))) << 24 >> 24);
                cjj_Deflate_put_byte0($this, Long_lo(Long_and(Long_shr($adler, 8), Long_fromInt(255))) << 24 >> 24);
                cjj_Deflate_put_byte0($this, Long_lo(Long_and(Long_shr($adler, 16), Long_fromInt(255))) << 24 >> 24);
                cjj_Deflate_put_byte0($this, Long_lo(Long_and(Long_shr($adler, 24), Long_fromInt(255))) << 24 >> 24);
                cjj_Deflate_put_byte0($this, Long_lo(Long_and($this.$strm.$total_in, Long_fromInt(255))) << 24 >> 24);
                cjj_Deflate_put_byte0($this, Long_lo(Long_and(Long_shr($this.$strm.$total_in, 8), Long_fromInt(255))) << 24 >> 24);
                cjj_Deflate_put_byte0($this, Long_lo(Long_and(Long_shr($this.$strm.$total_in, 16), Long_fromInt(255))) << 24 >> 24);
                cjj_Deflate_put_byte0($this, Long_lo(Long_and(Long_shr($this.$strm.$total_in, 24), Long_fromInt(255))) << 24 >> 24);
                cjj_GZIPHeader_setCRC(cjj_Deflate_getGZIPHeader($this), $adler);
            }
            cjj_ZStream_flush_pending($this.$strm);
            $flush = $this.$wrap1;
            if ($flush > 0)
                $this.$wrap1 =  -$flush | 0;
            return !$this.$pending ? 1 : 0;
        }
        return (-2);
    }
    function cjj_Deflate_getGZIPHeader($this) {
        jl_Object_monitorEnterSync($this);
        try {
            if ($this.$gheader === null)
                $this.$gheader = cjj_GZIPHeader__init_();
            return $this.$gheader;
        } finally {
            jl_Object_monitorExitSync($this);
        }
    }
    function cjj_Deflate__clinit_() {
        var var$1, var$2;
        var$1 = $rt_createArray(cjj_Deflate$Config, 10);
        var$2 = var$1.data;
        cjj_Deflate_config_table = var$1;
        var$2[0] = cjj_Deflate$Config__init_(0, 0, 0, 0, 0);
        cjj_Deflate_config_table.data[1] = cjj_Deflate$Config__init_(4, 4, 8, 4, 1);
        cjj_Deflate_config_table.data[2] = cjj_Deflate$Config__init_(4, 5, 16, 8, 1);
        cjj_Deflate_config_table.data[3] = cjj_Deflate$Config__init_(4, 6, 32, 32, 1);
        cjj_Deflate_config_table.data[4] = cjj_Deflate$Config__init_(4, 4, 16, 16, 2);
        cjj_Deflate_config_table.data[5] = cjj_Deflate$Config__init_(8, 16, 32, 32, 2);
        cjj_Deflate_config_table.data[6] = cjj_Deflate$Config__init_(8, 16, 128, 128, 2);
        cjj_Deflate_config_table.data[7] = cjj_Deflate$Config__init_(8, 32, 128, 256, 2);
        cjj_Deflate_config_table.data[8] = cjj_Deflate$Config__init_(32, 128, 258, 1024, 2);
        cjj_Deflate_config_table.data[9] = cjj_Deflate$Config__init_(32, 258, 258, 4096, 2);
        cjj_Deflate_z_errmsg = $rt_createArrayFromData(jl_String, [$rt_s(189), $rt_s(190), $rt_s(104), $rt_s(191), $rt_s(192), $rt_s(193), $rt_s(194), $rt_s(195), $rt_s(196), $rt_s(104)]);
    }
    function cjj_Inflate() {
        var a = this; jl_Object.call(a);
        a.$mode1 = 0;
        a.$method0 = 0;
        a.$was = Long_ZERO;
        a.$need = Long_ZERO;
        a.$marker = 0;
        a.$wrap2 = 0;
        a.$wbits = 0;
        a.$blocks0 = null;
        a.$z4 = null;
        a.$flags = 0;
        a.$need_bytes = 0;
        a.$crcbuf = null;
        a.$gheader0 = null;
        a.$tmp_string = null;
    }
    var cjj_Inflate_mark = null;
    function cjj_Inflate_inflate($this, $f) {
        var $e, var$3, $r, var$5, $foo, var$7, var$8, $b, var$10, $$je;
        $e = $this.$z4;
        if ($e !== null && $e.$next_in !== null) {
            var$3 = $f != 4 ? 0 : (-5);
            $r = (-5);
            a: {
                b: {
                    c: {
                        d: {
                            e: {
                                f: {
                                    g: {
                                        h: {
                                            i: while (true) {
                                                j: {
                                                    k: {
                                                        l: {
                                                            m: {
                                                                n: {
                                                                    o: {
                                                                        p: {
                                                                            q: {
                                                                                r: {
                                                                                    s: {
                                                                                        t: {
                                                                                            u: {
                                                                                                v: {
                                                                                                    w: {
                                                                                                        switch ($this.$mode1) {
                                                                                                            case 6:
                                                                                                                $this.$mode1 = 13;
                                                                                                                $this.$z4.$msg = $rt_s(189);
                                                                                                                $this.$marker = 0;
                                                                                                                return (-2);
                                                                                                            case 7:
                                                                                                                $r = cjj_InfBlocks_proc($this.$blocks0, $r);
                                                                                                                if ($r == (-3)) {
                                                                                                                    $this.$mode1 = 13;
                                                                                                                    $this.$marker = 0;
                                                                                                                    continue i;
                                                                                                                }
                                                                                                                if (!$r)
                                                                                                                    $r = var$3;
                                                                                                                if ($r != 1)
                                                                                                                    break i;
                                                                                                                $this.$was = $this.$z4.$adler.$getValue();
                                                                                                                cjj_InfBlocks_reset($this.$blocks0);
                                                                                                                if (!$this.$wrap2) {
                                                                                                                    $this.$mode1 = 12;
                                                                                                                    $r = var$3;
                                                                                                                    continue i;
                                                                                                                }
                                                                                                                $this.$mode1 = 8;
                                                                                                                $r = var$3;
                                                                                                                break w;
                                                                                                            case 12:
                                                                                                                break e;
                                                                                                            case 13:
                                                                                                                return (-3);
                                                                                                            case 14:
                                                                                                                break r;
                                                                                                            case 23:
                                                                                                                try {
                                                                                                                    $r = cjj_Inflate_readBytes($this, 2, $r, var$3);
                                                                                                                } catch ($$e) {
                                                                                                                    $$je = $rt_wrapException($$e);
                                                                                                                    if ($$je instanceof cjj_Inflate$Return) {
                                                                                                                        $e = $$je;
                                                                                                                        return $e.$r0;
                                                                                                                    } else {
                                                                                                                        throw $$e;
                                                                                                                    }
                                                                                                                }
                                                                                                                var$5 = $this.$need;
                                                                                                                $f = Long_lo(var$5) & 65535;
                                                                                                                $this.$flags = $f;
                                                                                                                if (($f & 255) != 8) {
                                                                                                                    $this.$z4.$msg = $rt_s(197);
                                                                                                                    $this.$mode1 = 13;
                                                                                                                    continue i;
                                                                                                                }
                                                                                                                if ($f & 57344) {
                                                                                                                    $this.$z4.$msg = $rt_s(198);
                                                                                                                    $this.$mode1 = 13;
                                                                                                                    continue i;
                                                                                                                }
                                                                                                                if ($f & 512)
                                                                                                                    cjj_Inflate_checksum($this, 2, var$5);
                                                                                                                $this.$mode1 = 16;
                                                                                                                break p;
                                                                                                            case 2:
                                                                                                                break d;
                                                                                                            case 3:
                                                                                                                break c;
                                                                                                            case 4:
                                                                                                                break b;
                                                                                                            case 5:
                                                                                                                var$3 = $r;
                                                                                                                break a;
                                                                                                            case 8:
                                                                                                                break w;
                                                                                                            case 9:
                                                                                                                break v;
                                                                                                            case 10:
                                                                                                                break u;
                                                                                                            case 11:
                                                                                                                break t;
                                                                                                            case 15:
                                                                                                                break s;
                                                                                                            case 16:
                                                                                                                break p;
                                                                                                            case 17:
                                                                                                                break o;
                                                                                                            case 18:
                                                                                                                break n;
                                                                                                            case 19:
                                                                                                                break q;
                                                                                                            case 20:
                                                                                                                break l;
                                                                                                            case 21:
                                                                                                                break k;
                                                                                                            case 22:
                                                                                                                break;
                                                                                                            default:
                                                                                                                return (-2);
                                                                                                        }
                                                                                                        break j;
                                                                                                    }
                                                                                                    $e = $this.$z4;
                                                                                                    $f = $e.$avail_in;
                                                                                                    if (!$f)
                                                                                                        return $r;
                                                                                                    $e.$avail_in = $f - 1 | 0;
                                                                                                    $e.$total_in = Long_add($e.$total_in, Long_fromInt(1));
                                                                                                    $foo = $e.$next_in.data;
                                                                                                    $f = $e.$next_in_index;
                                                                                                    $e.$next_in_index = $f + 1 | 0;
                                                                                                    $this.$need = Long_and(Long_fromInt(($foo[$f] & 255) << 24), Long_create(4278190080, 0));
                                                                                                    $this.$mode1 = 9;
                                                                                                    $r = var$3;
                                                                                                }
                                                                                                $e = $this.$z4;
                                                                                                $f = $e.$avail_in;
                                                                                                if (!$f)
                                                                                                    return $r;
                                                                                                $e.$avail_in = $f - 1 | 0;
                                                                                                $e.$total_in = Long_add($e.$total_in, Long_fromInt(1));
                                                                                                var$5 = $this.$need;
                                                                                                $foo = $e.$next_in.data;
                                                                                                $f = $e.$next_in_index;
                                                                                                $e.$next_in_index = $f + 1 | 0;
                                                                                                $this.$need = Long_add(var$5, Long_and(Long_fromInt(($foo[$f] & 255) << 16), Long_fromInt(16711680)));
                                                                                                $this.$mode1 = 10;
                                                                                                $r = var$3;
                                                                                            }
                                                                                            $e = $this.$z4;
                                                                                            $f = $e.$avail_in;
                                                                                            if (!$f)
                                                                                                return $r;
                                                                                            $e.$avail_in = $f - 1 | 0;
                                                                                            $e.$total_in = Long_add($e.$total_in, Long_fromInt(1));
                                                                                            var$5 = $this.$need;
                                                                                            $foo = $e.$next_in.data;
                                                                                            $f = $e.$next_in_index;
                                                                                            $e.$next_in_index = $f + 1 | 0;
                                                                                            $this.$need = Long_add(var$5, Long_and(Long_fromInt(($foo[$f] & 255) << 8), Long_fromInt(65280)));
                                                                                            $this.$mode1 = 11;
                                                                                            $r = var$3;
                                                                                        }
                                                                                        $e = $this.$z4;
                                                                                        $f = $e.$avail_in;
                                                                                        if (!$f)
                                                                                            return $r;
                                                                                        $e.$avail_in = $f - 1 | 0;
                                                                                        $e.$total_in = Long_add($e.$total_in, Long_fromInt(1));
                                                                                        var$5 = $this.$need;
                                                                                        $foo = $e.$next_in.data;
                                                                                        $f = $e.$next_in_index;
                                                                                        $e.$next_in_index = $f + 1 | 0;
                                                                                        var$5 = Long_add(var$5, Long_and(Long_fromInt($foo[$f]), Long_fromInt(255)));
                                                                                        $this.$need = var$5;
                                                                                        $f = $this.$flags;
                                                                                        if ($f)
                                                                                            $this.$need = Long_and(Long_or(Long_or(Long_or(Long_shr(Long_and(var$5, Long_fromInt(-16777216)), 24), Long_shr(Long_and(var$5, Long_fromInt(16711680)), 8)), Long_shl(Long_and(var$5, Long_fromInt(65280)), 8)), Long_shl(Long_and(var$5, Long_fromInt(65535)), 24)), Long_create(4294967295, 0));
                                                                                        $r = Long_lo($this.$was);
                                                                                        var$5 = $this.$need;
                                                                                        if ($r != Long_lo(var$5))
                                                                                            $e.$msg = $rt_s(199);
                                                                                        else if ($f) {
                                                                                            $e = $this.$gheader0;
                                                                                            if ($e !== null)
                                                                                                $e.$crc1 = var$5;
                                                                                        }
                                                                                        $this.$mode1 = 15;
                                                                                        $r = var$3;
                                                                                    }
                                                                                    if (!($this.$wrap2 && $this.$flags)) {
                                                                                        $e = $this.$z4.$msg;
                                                                                        if ($e === null)
                                                                                            break f;
                                                                                        if (!jl_String_equals($e, $rt_s(199)))
                                                                                            break f;
                                                                                        $this.$mode1 = 13;
                                                                                        $this.$marker = 5;
                                                                                        continue i;
                                                                                    }
                                                                                    try {
                                                                                        $r = cjj_Inflate_readBytes($this, 4, $r, var$3);
                                                                                    } catch ($$e) {
                                                                                        $$je = $rt_wrapException($$e);
                                                                                        if ($$je instanceof cjj_Inflate$Return) {
                                                                                            $e = $$je;
                                                                                            return $e.$r0;
                                                                                        } else {
                                                                                            throw $$e;
                                                                                        }
                                                                                    }
                                                                                    $e = $this.$z4.$msg;
                                                                                    if ($e !== null && jl_String_equals($e, $rt_s(199))) {
                                                                                        $this.$mode1 = 13;
                                                                                        $this.$marker = 5;
                                                                                        continue i;
                                                                                    }
                                                                                    var$5 = $this.$need;
                                                                                    $e = $this.$z4;
                                                                                    if (Long_eq(var$5, Long_and($e.$total_out, Long_create(4294967295, 0)))) {
                                                                                        $e.$msg = null;
                                                                                        break f;
                                                                                    }
                                                                                    $e.$msg = $rt_s(200);
                                                                                    $this.$mode1 = 13;
                                                                                    continue i;
                                                                                }
                                                                                if (!$this.$wrap2) {
                                                                                    $this.$mode1 = 7;
                                                                                    continue i;
                                                                                }
                                                                                try {
                                                                                    $r = cjj_Inflate_readBytes($this, 2, $r, var$3);
                                                                                } catch ($$e) {
                                                                                    $$je = $rt_wrapException($$e);
                                                                                    if ($$je instanceof cjj_Inflate$Return) {
                                                                                        $e = $$je;
                                                                                        return $e.$r0;
                                                                                    } else {
                                                                                        throw $$e;
                                                                                    }
                                                                                }
                                                                                $f = $this.$wrap2;
                                                                                var$7 = $rt_compare($f, 4);
                                                                                if (!(var$7 && !($f & 2)) && Long_eq($this.$need, Long_fromInt(35615))) {
                                                                                    if (!var$7)
                                                                                        $this.$wrap2 = 2;
                                                                                    $this.$z4.$adler = cjj_CRC32__init_();
                                                                                    cjj_Inflate_checksum($this, 2, $this.$need);
                                                                                    if ($this.$gheader0 === null)
                                                                                        $this.$gheader0 = cjj_GZIPHeader__init_();
                                                                                    $this.$mode1 = 23;
                                                                                    continue i;
                                                                                }
                                                                                if ($f & 2) {
                                                                                    $this.$mode1 = 13;
                                                                                    $this.$z4.$msg = $rt_s(201);
                                                                                    continue i;
                                                                                }
                                                                                $this.$flags = 0;
                                                                                var$5 = $this.$need;
                                                                                var$8 = Long_lo(var$5) & 255;
                                                                                $this.$method0 = var$8;
                                                                                $b = Long_lo(Long_shr(var$5, 8)) & 255;
                                                                                if (!($f & 1 && !(((var$8 << 8) + $b | 0) % 31 | 0)) && (var$8 & 15) != 8) {
                                                                                    if (var$7) {
                                                                                        $this.$mode1 = 13;
                                                                                        $this.$z4.$msg = $rt_s(201);
                                                                                        continue i;
                                                                                    }
                                                                                    $e = $this.$z4;
                                                                                    $e.$next_in_index = $e.$next_in_index - 2 | 0;
                                                                                    $e.$avail_in = $e.$avail_in + 2 | 0;
                                                                                    $e.$total_in = Long_sub($e.$total_in, Long_fromInt(2));
                                                                                    $this.$wrap2 = 0;
                                                                                    $this.$mode1 = 7;
                                                                                    continue i;
                                                                                }
                                                                                if ((var$8 & 15) != 8) {
                                                                                    $this.$mode1 = 13;
                                                                                    $this.$z4.$msg = $rt_s(197);
                                                                                    continue i;
                                                                                }
                                                                                if (!var$7)
                                                                                    $this.$wrap2 = 1;
                                                                                if (((var$8 >> 4) + 8 | 0) > $this.$wbits) {
                                                                                    $this.$mode1 = 13;
                                                                                    $this.$z4.$msg = $rt_s(202);
                                                                                    continue i;
                                                                                }
                                                                                $this.$z4.$adler = cjj_Adler32__init_();
                                                                                if ($b & 32) {
                                                                                    $this.$mode1 = 2;
                                                                                    break d;
                                                                                }
                                                                                $this.$mode1 = 7;
                                                                                continue i;
                                                                            }
                                                                            break m;
                                                                        }
                                                                        try {
                                                                            $r = cjj_Inflate_readBytes($this, 4, $r, var$3);
                                                                        } catch ($$e) {
                                                                            $$je = $rt_wrapException($$e);
                                                                            if ($$je instanceof cjj_Inflate$Return) {
                                                                                $e = $$je;
                                                                                return $e.$r0;
                                                                            } else {
                                                                                throw $$e;
                                                                            }
                                                                        }
                                                                        $e = $this.$gheader0;
                                                                        if ($e !== null)
                                                                            $e.$time = $this.$need;
                                                                        if ($this.$flags & 512)
                                                                            cjj_Inflate_checksum($this, 4, $this.$need);
                                                                        $this.$mode1 = 17;
                                                                    }
                                                                    try {
                                                                        $r = cjj_Inflate_readBytes($this, 2, $r, var$3);
                                                                    } catch ($$e) {
                                                                        $$je = $rt_wrapException($$e);
                                                                        if ($$je instanceof cjj_Inflate$Return) {
                                                                            $e = $$je;
                                                                            return $e.$r0;
                                                                        } else {
                                                                            throw $$e;
                                                                        }
                                                                    }
                                                                    $e = $this.$gheader0;
                                                                    if ($e !== null) {
                                                                        $f = Long_lo($this.$need);
                                                                        $e.$xflags = $f & 255;
                                                                        $e.$os = $f >> 8 & 255;
                                                                    }
                                                                    if ($this.$flags & 512)
                                                                        cjj_Inflate_checksum($this, 2, $this.$need);
                                                                    $this.$mode1 = 18;
                                                                }
                                                                if (!($this.$flags & 1024)) {
                                                                    $e = $this.$gheader0;
                                                                    if ($e !== null)
                                                                        $e.$extra = null;
                                                                } else {
                                                                    try {
                                                                        $r = cjj_Inflate_readBytes($this, 2, $r, var$3);
                                                                    } catch ($$e) {
                                                                        $$je = $rt_wrapException($$e);
                                                                        if ($$je instanceof cjj_Inflate$Return) {
                                                                            $e = $$je;
                                                                            return $e.$r0;
                                                                        } else {
                                                                            throw $$e;
                                                                        }
                                                                    }
                                                                    $e = $this.$gheader0;
                                                                    if ($e !== null)
                                                                        $e.$extra = $rt_createByteArray(Long_lo($this.$need) & 65535);
                                                                    if ($this.$flags & 512)
                                                                        cjj_Inflate_checksum($this, 2, $this.$need);
                                                                }
                                                                $this.$mode1 = 19;
                                                            }
                                                            if (!($this.$flags & 1024)) {
                                                                $e = $this.$gheader0;
                                                                if ($e !== null)
                                                                    $e.$extra = null;
                                                            } else
                                                                x: {
                                                                    try {
                                                                        $r = cjj_Inflate_readBytes0($this, $r, var$3);
                                                                        if ($this.$gheader0 === null)
                                                                            break x;
                                                                        $foo = ji_ByteArrayOutputStream_toByteArray($this.$tmp_string);
                                                                        var$10 = $foo.data;
                                                                        $this.$tmp_string = null;
                                                                        $f = var$10.length;
                                                                        var$10 = $this.$gheader0.$extra;
                                                                        if ($f != var$10.data.length) {
                                                                            $this.$z4.$msg = $rt_s(203);
                                                                            $this.$mode1 = 13;
                                                                            continue i;
                                                                        }
                                                                        jl_System_fastArraycopy($foo, 0, var$10, 0, $f);
                                                                        break x;
                                                                    } catch ($$e) {
                                                                        $$je = $rt_wrapException($$e);
                                                                        if ($$je instanceof cjj_Inflate$Return) {
                                                                            $e = $$je;
                                                                            return $e.$r0;
                                                                        } else {
                                                                            throw $$e;
                                                                        }
                                                                    }
                                                                }
                                                            $this.$mode1 = 20;
                                                        }
                                                        y: {
                                                            if (!($this.$flags & 2048)) {
                                                                $e = $this.$gheader0;
                                                                if ($e !== null)
                                                                    $e.$name4 = null;
                                                            } else {
                                                                z: {
                                                                    try {
                                                                        $r = cjj_Inflate_readString($this, $r, var$3);
                                                                        $e = $this.$gheader0;
                                                                        if ($e === null)
                                                                            break z;
                                                                        $e.$name4 = ji_ByteArrayOutputStream_toByteArray($this.$tmp_string);
                                                                        break z;
                                                                    } catch ($$e) {
                                                                        $$je = $rt_wrapException($$e);
                                                                        if ($$je instanceof cjj_Inflate$Return) {
                                                                            $e = $$je;
                                                                            break h;
                                                                        } else {
                                                                            throw $$e;
                                                                        }
                                                                    }
                                                                }
                                                                try {
                                                                    $this.$tmp_string = null;
                                                                    break y;
                                                                } catch ($$e) {
                                                                    $$je = $rt_wrapException($$e);
                                                                    if ($$je instanceof cjj_Inflate$Return) {
                                                                        $e = $$je;
                                                                        break h;
                                                                    } else {
                                                                        throw $$e;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        $this.$mode1 = 21;
                                                    }
                                                    ba: {
                                                        if (!($this.$flags & 4096)) {
                                                            $e = $this.$gheader0;
                                                            if ($e !== null)
                                                                $e.$comment = null;
                                                        } else {
                                                            bb: {
                                                                try {
                                                                    $r = cjj_Inflate_readString($this, $r, var$3);
                                                                    $e = $this.$gheader0;
                                                                    if ($e === null)
                                                                        break bb;
                                                                    $e.$comment = ji_ByteArrayOutputStream_toByteArray($this.$tmp_string);
                                                                    break bb;
                                                                } catch ($$e) {
                                                                    $$je = $rt_wrapException($$e);
                                                                    if ($$je instanceof cjj_Inflate$Return) {
                                                                        $e = $$je;
                                                                        break g;
                                                                    } else {
                                                                        throw $$e;
                                                                    }
                                                                }
                                                            }
                                                            try {
                                                                $this.$tmp_string = null;
                                                                break ba;
                                                            } catch ($$e) {
                                                                $$je = $rt_wrapException($$e);
                                                                if ($$je instanceof cjj_Inflate$Return) {
                                                                    $e = $$je;
                                                                    break g;
                                                                } else {
                                                                    throw $$e;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    $this.$mode1 = 22;
                                                }
                                                if ($this.$flags & 512) {
                                                    try {
                                                        $r = cjj_Inflate_readBytes($this, 2, $r, var$3);
                                                    } catch ($$e) {
                                                        $$je = $rt_wrapException($$e);
                                                        if ($$je instanceof cjj_Inflate$Return) {
                                                            $e = $$je;
                                                            return $e.$r0;
                                                        } else {
                                                            throw $$e;
                                                        }
                                                    }
                                                    $e = $this.$gheader0;
                                                    if ($e !== null)
                                                        $e.$hcrc = Long_lo(Long_and($this.$need, Long_fromInt(65535)));
                                                    if (Long_ne($this.$need, Long_and($this.$z4.$adler.$getValue(), Long_fromInt(65535)))) {
                                                        $this.$mode1 = 13;
                                                        $this.$z4.$msg = $rt_s(204);
                                                        $this.$marker = 5;
                                                        continue;
                                                    }
                                                }
                                                $this.$z4.$adler = cjj_CRC32__init_();
                                                $this.$mode1 = 7;
                                            }
                                            return $r;
                                        }
                                        return $e.$r0;
                                    }
                                    return $e.$r0;
                                }
                                $this.$mode1 = 12;
                            }
                            return 1;
                        }
                        $e = $this.$z4;
                        var$8 = $e.$avail_in;
                        if (!var$8)
                            return $r;
                        $e.$avail_in = var$8 - 1 | 0;
                        $e.$total_in = Long_add($e.$total_in, Long_fromInt(1));
                        $foo = $e.$next_in.data;
                        $r = $e.$next_in_index;
                        $e.$next_in_index = $r + 1 | 0;
                        $this.$need = Long_and(Long_fromInt(($foo[$r] & 255) << 24), Long_create(4278190080, 0));
                        $this.$mode1 = 3;
                        $r = var$3;
                    }
                    $e = $this.$z4;
                    $f = $e.$avail_in;
                    if (!$f)
                        return $r;
                    $e.$avail_in = $f - 1 | 0;
                    $e.$total_in = Long_add($e.$total_in, Long_fromInt(1));
                    var$5 = $this.$need;
                    $foo = $e.$next_in.data;
                    $r = $e.$next_in_index;
                    $e.$next_in_index = $r + 1 | 0;
                    $this.$need = Long_add(var$5, Long_and(Long_fromInt(($foo[$r] & 255) << 16), Long_fromInt(16711680)));
                    $this.$mode1 = 4;
                    $r = var$3;
                }
                $e = $this.$z4;
                $f = $e.$avail_in;
                if (!$f)
                    return $r;
                $e.$avail_in = $f - 1 | 0;
                $e.$total_in = Long_add($e.$total_in, Long_fromInt(1));
                var$5 = $this.$need;
                $foo = $e.$next_in.data;
                $f = $e.$next_in_index;
                $e.$next_in_index = $f + 1 | 0;
                $this.$need = Long_add(var$5, Long_and(Long_fromInt(($foo[$f] & 255) << 8), Long_fromInt(65280)));
                $this.$mode1 = 5;
            }
            $e = $this.$z4;
            $f = $e.$avail_in;
            if (!$f)
                return var$3;
            $e.$avail_in = $f - 1 | 0;
            $e.$total_in = Long_add($e.$total_in, Long_fromInt(1));
            var$5 = $this.$need;
            $foo = $e.$next_in.data;
            $f = $e.$next_in_index;
            $e.$next_in_index = $f + 1 | 0;
            var$5 = Long_add(var$5, Long_and(Long_fromInt($foo[$f]), Long_fromInt(255)));
            $this.$need = var$5;
            $e.$adler.$reset0(var$5);
            $this.$mode1 = 6;
            return 2;
        }
        if ($f == 4 && $this.$mode1 == 14)
            return 0;
        return (-2);
    }
    function cjj_Inflate_readBytes($this, $n, $r, $f) {
        var var$4, var$5, var$6, var$7, var$8;
        if ($this.$need_bytes == (-1)) {
            $this.$need_bytes = $n;
            $this.$need = Long_ZERO;
        }
        while (true) {
            var$4 = $this.$need_bytes;
            if (var$4 <= 0) {
                if ($n == 2)
                    $this.$need = Long_and($this.$need, Long_fromInt(65535));
                else if ($n == 4)
                    $this.$need = Long_and($this.$need, Long_create(4294967295, 0));
                $this.$need_bytes = (-1);
                return $r;
            }
            var$5 = $this.$z4;
            var$6 = var$5.$avail_in;
            if (!var$6)
                break;
            var$5.$avail_in = var$6 - 1 | 0;
            var$5.$total_in = Long_add(var$5.$total_in, Long_fromInt(1));
            var$7 = $this.$need;
            var$8 = var$5.$next_in.data;
            var$6 = var$5.$next_in_index;
            var$5.$next_in_index = var$6 + 1 | 0;
            $this.$need = Long_or(var$7, Long_fromInt((var$8[var$6] & 255) << (($n - var$4 | 0) * 8 | 0)));
            $this.$need_bytes = var$4 - 1 | 0;
            $r = $f;
        }
        $rt_throw(cjj_Inflate$Return__init_($this, $r));
    }
    function cjj_Inflate_readString($this, $r, $f) {
        var var$3, var$4, var$5, var$6, var$7;
        if ($this.$tmp_string === null)
            $this.$tmp_string = ji_ByteArrayOutputStream__init_();
        while (true) {
            var$3 = $this.$z4;
            var$4 = var$3.$avail_in;
            if (!var$4)
                $rt_throw(cjj_Inflate$Return__init_($this, $r));
            var$3.$avail_in = var$4 - 1 | 0;
            var$3.$total_in = Long_add(var$3.$total_in, Long_fromInt(1));
            var$5 = var$3.$next_in;
            var$6 = var$5.data;
            var$4 = var$3.$next_in_index;
            var$7 = var$6[var$4];
            if (var$7)
                ji_ByteArrayOutputStream_write($this.$tmp_string, var$5, var$4, 1);
            var$3 = $this.$z4;
            var$3.$adler.$update1(var$3.$next_in, var$3.$next_in_index, 1);
            var$3 = $this.$z4;
            var$3.$next_in_index = var$3.$next_in_index + 1 | 0;
            if (!var$7)
                break;
            $r = $f;
        }
        return $f;
    }
    function cjj_Inflate_readBytes0($this, $r, $f) {
        var var$3, var$4;
        if ($this.$tmp_string === null)
            $this.$tmp_string = ji_ByteArrayOutputStream__init_();
        while (Long_gt($this.$need, Long_ZERO)) {
            var$3 = $this.$z4;
            var$4 = var$3.$avail_in;
            if (!var$4)
                $rt_throw(cjj_Inflate$Return__init_($this, $r));
            var$3.$avail_in = var$4 - 1 | 0;
            var$3.$total_in = Long_add(var$3.$total_in, Long_fromInt(1));
            ji_ByteArrayOutputStream_write($this.$tmp_string, var$3.$next_in, var$3.$next_in_index, 1);
            var$3 = $this.$z4;
            var$3.$adler.$update1(var$3.$next_in, var$3.$next_in_index, 1);
            var$3 = $this.$z4;
            var$3.$next_in_index = var$3.$next_in_index + 1 | 0;
            $this.$need = Long_sub($this.$need, Long_fromInt(1));
            $r = $f;
        }
        return $r;
    }
    function cjj_Inflate_checksum($this, $n, $v) {
        var $i;
        $i = 0;
        while ($i < $n) {
            $this.$crcbuf.data[$i] = Long_lo(Long_and($v, Long_fromInt(255))) << 24 >> 24;
            $v = Long_shr($v, 8);
            $i = $i + 1 | 0;
        }
        $this.$z4.$adler.$update1($this.$crcbuf, 0, $n);
    }
    function cjj_Inflate__clinit_() {
        cjj_Inflate_mark = $rt_createByteArrayFromData([0, 0, (-1), (-1)]);
    }
    var ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
    var juz_DataFormatException = $rt_classWithoutFields(jl_Exception);
    function m_WebGLShader() {
        var a = this; jl_Object.call(a);
        a.$enable_color = 0;
        a.$enable_normal = 0;
        a.$enable_texture0 = 0;
        a.$enable_lighting = 0;
        a.$enable_fog = 0;
        a.$enable_alphatest = 0;
        a.$enable_unit0 = 0;
        a.$globject = null;
        a.$u_matrix_m = null;
        a.$u_matrix_p = null;
        a.$u_matrix_t = null;
        a.$u_fogColor = null;
        a.$u_fogMode = null;
        a.$u_fogStart = null;
        a.$u_fogEnd = null;
        a.$u_fogDensity = null;
        a.$u_fogPremultiply = null;
        a.$u_colorUniform = null;
        a.$u_normalUniform = null;
        a.$u_alphaTestF = null;
        a.$u_texCoordV0 = null;
        a.$u_light0Pos = null;
        a.$u_light1Pos = null;
        a.$a_position = 0;
        a.$a_texture0 = 0;
        a.$a_color = 0;
        a.$a_normal = 0;
        a.$streamBuffer = null;
        a.$bufferIsInitialized = 0;
        a.$modelBuffer = null;
        a.$projectionBuffer = null;
        a.$textureBuffer = null;
        a.$modelMatrix = null;
        a.$projectionMatrix = null;
        a.$textureMatrix = null;
        a.$light0Pos = null;
        a.$light1Pos = null;
        a.$fogMode = 0;
        a.$fogColorR = 0.0;
        a.$fogColorG = 0.0;
        a.$fogColorB = 0.0;
        a.$fogColorA = 0.0;
        a.$fogStart = 0.0;
        a.$fogEnd = 0.0;
        a.$fogDensity = 0.0;
        a.$alphaTestValue = 0.0;
        a.$tex0x = 0.0;
        a.$tex0y = 0.0;
        a.$colorUniformR = 0.0;
        a.$colorUniformG = 0.0;
        a.$colorUniformB = 0.0;
        a.$colorUniformA = 0.0;
        a.$normalUniformX = 0.0;
        a.$normalUniformY = 0.0;
        a.$normalUniformZ = 0.0;
    }
    var m_WebGLShader_vertexFragmentShader = null;
    var m_WebGLShader_instances = null;
    var m_WebGLShader_instanceList = null;
    var m_WebGLShader_shader = null;
    function m_WebGLShader_$callClinit() {
        m_WebGLShader_$callClinit = $rt_eraseClinit(m_WebGLShader);
        m_WebGLShader__clinit_();
    }
    function m_WebGLShader__init_(var_0, var_1, var_2, var_3, var_4, var_5, var_6, var_7) {
        var var_8 = new m_WebGLShader();
        m_WebGLShader__init_0(var_8, var_0, var_1, var_2, var_3, var_4, var_5, var_6, var_7);
        return var_8;
    }
    function m_WebGLShader_instance($i) {
        var $s, $CC_a_color, $CC_a_normal, $CC_a_texture0, $CC_lighting, $CC_fog, $CC_alphatest, $CC_unit0;
        m_WebGLShader_$callClinit();
        $s = m_WebGLShader_instances.data[$i];
        if ($s === null) {
            $CC_a_color = 0;
            $CC_a_normal = 0;
            $CC_a_texture0 = 0;
            $CC_lighting = 0;
            $CC_fog = 0;
            $CC_alphatest = 0;
            $CC_unit0 = 0;
            if (($i & 1) == 1)
                $CC_a_color = 1;
            if (($i & 2) == 2)
                $CC_a_normal = 1;
            if (($i & 4) == 4)
                $CC_a_texture0 = 1;
            if (($i & 8) == 8)
                $CC_lighting = 1;
            if (($i & 16) == 16)
                $CC_fog = 1;
            if (($i & 32) == 32)
                $CC_alphatest = 1;
            if (($i & 64) == 64)
                $CC_unit0 = 1;
            $s = m_WebGLShader__init_($i, $CC_a_color, $CC_a_normal, $CC_a_texture0, $CC_lighting, $CC_fog, $CC_alphatest, $CC_unit0);
            m_WebGLShader_instances.data[$i] = $s;
            ju_ArrayList_add(m_WebGLShader_instanceList, $s);
        }
        return $s;
    }
    function m_WebGLShader__init_0($this, $j, $CC_a_color, $CC_a_normal, $CC_a_texture0, $CC_lighting, $CC_fog, $CC_alphatest, $CC_unit0) {
        var $source, $v, $f, var$12, var$13;
        m_WebGLShader_$callClinit();
        jl_Object__init_0($this);
        $this.$u_matrix_m = null;
        $this.$u_matrix_p = null;
        $this.$u_matrix_t = null;
        $this.$u_fogColor = null;
        $this.$u_fogMode = null;
        $this.$u_fogStart = null;
        $this.$u_fogEnd = null;
        $this.$u_fogDensity = null;
        $this.$u_fogPremultiply = null;
        $this.$u_colorUniform = null;
        $this.$u_normalUniform = null;
        $this.$u_alphaTestF = null;
        $this.$u_texCoordV0 = null;
        $this.$u_light0Pos = null;
        $this.$u_light1Pos = null;
        $this.$bufferIsInitialized = 0;
        $this.$modelBuffer = $rt_createFloatArray(16);
        $this.$projectionBuffer = $rt_createFloatArray(16);
        $this.$textureBuffer = $rt_createFloatArray(16);
        $this.$modelMatrix = oluv_Matrix4f_setZero(oluv_Matrix4f__init_());
        $this.$projectionMatrix = oluv_Matrix4f_setZero(oluv_Matrix4f__init_());
        $this.$textureMatrix = oluv_Matrix4f_setZero(oluv_Matrix4f__init_());
        $this.$light0Pos = oluv_Vector4f__init_();
        $this.$light1Pos = oluv_Vector4f__init_();
        $this.$fogMode = 0;
        $this.$fogColorR = 0.0;
        $this.$fogColorG = 0.0;
        $this.$fogColorB = 0.0;
        $this.$fogColorA = 0.0;
        $this.$fogStart = 0.0;
        $this.$fogEnd = 0.0;
        $this.$fogDensity = 0.0;
        $this.$alphaTestValue = 0.0;
        $this.$tex0x = 0.0;
        $this.$tex0y = 0.0;
        $this.$colorUniformR = 0.0;
        $this.$colorUniformG = 0.0;
        $this.$colorUniformB = 0.0;
        $this.$colorUniformA = 0.0;
        $this.$normalUniformX = 0.0;
        $this.$normalUniformY = 0.0;
        $this.$normalUniformZ = 0.0;
        $this.$enable_color = $CC_a_color;
        $this.$enable_normal = $CC_a_normal;
        $this.$enable_texture0 = $CC_a_texture0;
        $this.$enable_lighting = $CC_lighting;
        $this.$enable_fog = $CC_fog;
        $this.$enable_alphatest = $CC_alphatest;
        $this.$enable_unit0 = $CC_unit0;
        if (m_WebGLShader_shader === null)
            m_WebGLShader_shader = jl_String__init_2(m_WebGLShader_vertexFragmentShader);
        $source = $rt_s(104);
        if ($this.$enable_color) {
            $v = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($v, $source), $rt_s(205));
            $source = jl_StringBuilder_toString($v);
        }
        if ($this.$enable_normal) {
            $v = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($v, $source), $rt_s(206));
            $source = jl_StringBuilder_toString($v);
        }
        if ($this.$enable_texture0) {
            $v = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($v, $source), $rt_s(207));
            $source = jl_StringBuilder_toString($v);
        }
        if ($this.$enable_lighting) {
            $v = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($v, $source), $rt_s(208));
            $source = jl_StringBuilder_toString($v);
        }
        if ($this.$enable_fog) {
            $v = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($v, $source), $rt_s(209));
            $source = jl_StringBuilder_toString($v);
        }
        if ($this.$enable_alphatest) {
            $v = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($v, $source), $rt_s(210));
            $source = jl_StringBuilder_toString($v);
        }
        if ($this.$enable_unit0) {
            $v = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($v, $source), $rt_s(211));
            $source = jl_StringBuilder_toString($v);
        }
        $v = m_WebGLShader_shader;
        $f = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append($f, $source), $v);
        var$12 = jl_StringBuilder_toString($f);
        $v = olo_GL11_glCreateShader(35633);
        $source = olo_GL11_glGetShaderHeader();
        $f = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append($f, $source), $rt_s(212)), var$12);
        olo_GL11_glShaderSource($v, jl_StringBuilder_toString($f));
        olo_GL11_glCompileShader($v);
        if (!olo_GL11_glGetShaderCompiled($v)) {
            $source = jl_System_err();
            $v = olo_GL11_glGetShaderInfoLog($v);
            $f = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($f, $rt_s(213)), $v);
            ji_PrintStream_println($source, jl_String_replace(jl_StringBuilder_toString($f), $rt_s(214), $rt_s(215)));
            $rt_throw(jl_RuntimeException__init_($rt_s(216)));
        }
        $f = olo_GL11_glCreateShader(35632);
        $source = olo_GL11_glGetShaderHeader();
        var$13 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$13, $source), $rt_s(217)), var$12);
        olo_GL11_glShaderSource($f, jl_StringBuilder_toString(var$13));
        olo_GL11_glCompileShader($f);
        if (!olo_GL11_glGetShaderCompiled($f)) {
            $source = jl_System_err();
            $v = olo_GL11_glGetShaderInfoLog($f);
            $f = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($f, $rt_s(213)), $v);
            ji_PrintStream_println($source, jl_String_replace(jl_StringBuilder_toString($f), $rt_s(214), $rt_s(218)));
            $rt_throw(jl_RuntimeException__init_($rt_s(216)));
        }
        $source = olo_GL11_glCreateProgram();
        $this.$globject = $source;
        olo_GL11_glAttachShader($source, $v);
        olo_GL11_glAttachShader($this.$globject, $f);
        $j = 1;
        $this.$a_position = 0;
        olo_GL11_glBindAttributeLocation($this.$globject, 0, $rt_s(219));
        if (!$this.$enable_texture0)
            $this.$a_texture0 = (-1);
        else {
            $this.$a_texture0 = $j;
            olo_GL11_glBindAttributeLocation($this.$globject, $j, $rt_s(220));
            $j = 2;
        }
        if (!$this.$enable_color)
            $this.$a_color = (-1);
        else {
            $CC_a_color = $j + 1 | 0;
            $this.$a_color = $j;
            olo_GL11_glBindAttributeLocation($this.$globject, $j, $rt_s(221));
            $j = $CC_a_color;
        }
        if (!$this.$enable_normal)
            $this.$a_normal = (-1);
        else {
            $this.$a_normal = $j;
            olo_GL11_glBindAttributeLocation($this.$globject, $j, $rt_s(222));
        }
        olo_GL11_glLinkProgram($this.$globject);
        olo_GL11_glDetachShader($this.$globject, $v);
        olo_GL11_glDetachShader($this.$globject, $f);
        olo_GL11_glDeleteShader($v);
        olo_GL11_glDeleteShader($f);
        if (!olo_GL11_glGetProgramLinked($this.$globject)) {
            $source = jl_System_err();
            $v = olo_GL11_glGetProgramInfoLog($this.$globject);
            $f = jl_StringBuilder__init_();
            jl_StringBuilder_append(jl_StringBuilder_append($f, $rt_s(213)), $v);
            ji_PrintStream_println($source, jl_String_replace(jl_StringBuilder_toString($f), $rt_s(214), $rt_s(223)));
            $rt_throw(jl_RuntimeException__init_($rt_s(216)));
        }
        olo_GL11_glUseProgram($this.$globject);
        $this.$u_matrix_m = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(224));
        $this.$u_matrix_p = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(225));
        $this.$u_matrix_t = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(226));
        $this.$u_colorUniform = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(227));
        if ($this.$enable_lighting) {
            $this.$u_normalUniform = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(228));
            $this.$u_light0Pos = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(229));
            $this.$u_light1Pos = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(230));
        }
        if ($this.$enable_fog) {
            $this.$u_fogColor = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(231));
            $this.$u_fogMode = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(232));
            $this.$u_fogStart = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(233));
            $this.$u_fogEnd = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(234));
            $this.$u_fogDensity = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(235));
            $this.$u_fogPremultiply = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(236));
        }
        if ($this.$enable_alphatest)
            $this.$u_alphaTestF = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(237));
        olo_GL11_glUniform1i(olo_GL11_glGetUniformLocation($this.$globject, $rt_s(238)), 0);
        $this.$u_texCoordV0 = olo_GL11_glGetUniformLocation($this.$globject, $rt_s(239));
        $this.$streamBuffer = m_StreamBuffer__init_(32768, 3, 8, m_WebGLShader$_init_$lambda$_2_0__init_($this));
    }
    function m_WebGLShader_setupArrayForProgram($this) {
        olo_GL11_glEnableVertexAttribArray($this.$a_position);
        olo_GL11_glVertexAttribPointer($this.$a_position, 3, 5126, 0, 28, 0);
        if ($this.$enable_texture0) {
            olo_GL11_glEnableVertexAttribArray($this.$a_texture0);
            olo_GL11_glVertexAttribPointer($this.$a_texture0, 2, 5126, 0, 28, 12);
        }
        if ($this.$enable_color) {
            olo_GL11_glEnableVertexAttribArray($this.$a_color);
            olo_GL11_glVertexAttribPointer($this.$a_color, 4, 5121, 1, 28, 20);
        }
        if ($this.$enable_normal) {
            olo_GL11_glEnableVertexAttribArray($this.$a_normal);
            olo_GL11_glVertexAttribPointer($this.$a_normal, 4, 5121, 1, 28, 24);
        }
    }
    function m_WebGLShader__clinit_() {
        m_WebGLShader_vertexFragmentShader = $rt_s(240);
        m_WebGLShader_instances = $rt_createArray(m_WebGLShader, 128);
        m_WebGLShader_instanceList = ju_ArrayList__init_();
        m_WebGLShader_shader = null;
    }
    function m_StreamBuffer$StreamBufferInstance() {
        var a = this; jl_Object.call(a);
        a.$vertexArray = null;
        a.$vertexBuffer = null;
        a.$vertexBufferSize = 0;
        a.$bindQuad16 = 0;
        a.$bindQuad32 = 0;
    }
    function cjj_Tree() {
        var a = this; jl_Object.call(a);
        a.$dyn_tree = null;
        a.$max_code = 0;
        a.$stat_desc = null;
    }
    var cjj_Tree_extra_lbits = null;
    var cjj_Tree_extra_dbits = null;
    var cjj_Tree_extra_blbits = null;
    var cjj_Tree_bl_order = null;
    var cjj_Tree__dist_code = null;
    var cjj_Tree__length_code = null;
    var cjj_Tree_base_length = null;
    var cjj_Tree_base_dist = null;
    function cjj_Tree_d_code($dist) {
        return $dist < 256 ? cjj_Tree__dist_code.data[$dist] : cjj_Tree__dist_code.data[256 + ($dist >>> 7 | 0) | 0];
    }
    function cjj_Tree_gen_bitlen($this, $s) {
        var $tree, var$3, $stree, $extra, $base, $max_length, $overflow, $bits, var$10, var$11, $h, $n, $m, var$15, $xbits, $f;
        $tree = $this.$dyn_tree;
        var$3 = $this.$stat_desc;
        $stree = var$3.$static_tree;
        $extra = var$3.$extra_bits;
        $base = var$3.$extra_base;
        $max_length = var$3.$max_length;
        $overflow = 0;
        $bits = 0;
        while ($bits <= 15) {
            $s.$bl_count.data[$bits] = 0;
            $bits = $bits + 1 | 0;
        }
        var$10 = $tree.data;
        var$11 = $s.$heap.data;
        $bits = $s.$heap_max;
        var$10[(var$11[$bits] * 2 | 0) + 1 | 0] = 0;
        $h = $bits + 1 | 0;
        while ($h < 573) {
            $n = var$11[$h];
            $bits = $n * 2 | 0;
            $m = $bits + 1 | 0;
            var$15 = var$10[(var$10[$m] * 2 | 0) + 1 | 0] + 1 | 0;
            if (var$15 > $max_length) {
                $overflow = $overflow + 1 | 0;
                var$15 = $max_length;
            }
            var$10[$m] = var$15 << 16 >> 16;
            if ($n <= $this.$max_code) {
                $tree = $s.$bl_count.data;
                $tree[var$15] = ($tree[var$15] + 1 | 0) << 16 >> 16;
                $xbits = 0;
                if ($n >= $base)
                    $xbits = $extra.data[$n - $base | 0];
                $f = var$10[$bits];
                $s.$opt_len = $s.$opt_len + $rt_imul($f, var$15 + $xbits | 0) | 0;
                if ($stree !== null) {
                    $tree = $stree.data;
                    $s.$static_len = $s.$static_len + $rt_imul($f, $tree[$m] + $xbits | 0) | 0;
                }
            }
            $h = $h + 1 | 0;
        }
        if (!$overflow)
            return;
        $base = $max_length - 1 | 0;
        while (true) {
            $n = $base;
            while (true) {
                $tree = $s.$bl_count.data;
                if ($tree[$n])
                    break;
                $n = $n + (-1) | 0;
            }
            $tree[$n] = ($tree[$n] - 1 | 0) << 16 >> 16;
            $bits = $n + 1 | 0;
            $tree[$bits] = ($tree[$bits] + 2 | 0) << 16 >> 16;
            $tree[$max_length] = ($tree[$max_length] - 1 | 0) << 16 >> 16;
            $overflow = $overflow + (-2) | 0;
            if ($overflow <= 0)
                break;
        }
        while ($max_length) {
            $n = $tree[$max_length];
            while ($n) {
                $h = $h + (-1) | 0;
                $m = var$11[$h];
                if ($m > $this.$max_code)
                    continue;
                $overflow = $m * 2 | 0;
                $bits = $overflow + 1 | 0;
                if (var$10[$bits] != $max_length) {
                    $s.$opt_len = Long_lo(Long_add(Long_fromInt($s.$opt_len), Long_mul(Long_sub(Long_fromInt($max_length), Long_fromInt(var$10[$bits])), Long_fromInt(var$10[$overflow]))));
                    var$10[$bits] = $max_length << 16 >> 16;
                }
                $n = $n + (-1) | 0;
            }
            $max_length = $max_length + (-1) | 0;
        }
    }
    function cjj_Tree_build_tree($this, $s) {
        var $tree, var$3, $stree, $node, $max_code, $n, var$8, $m, var$10, $node_0, var$12, var$13, var$14;
        $tree = $this.$dyn_tree;
        var$3 = $this.$stat_desc;
        $stree = var$3.$static_tree;
        $node = var$3.$elems;
        $max_code = (-1);
        $s.$heap_len = 0;
        $s.$heap_max = 573;
        $n = 0;
        while ($n < $node) {
            var$8 = $tree.data;
            $m = $n * 2 | 0;
            if (!var$8[$m])
                var$8[$m + 1 | 0] = 0;
            else {
                var$8 = $s.$heap.data;
                $m = $s.$heap_len + 1 | 0;
                $s.$heap_len = $m;
                var$8[$m] = $n;
                $s.$depth0.data[$n] = 0;
                $max_code = $n;
            }
            $n = $n + 1 | 0;
        }
        while (true) {
            $m = $s.$heap_len;
            if ($m >= 2)
                break;
            var$8 = $s.$heap;
            $m = $m + 1 | 0;
            $s.$heap_len = $m;
            if ($max_code >= 2)
                $n = 0;
            else {
                $max_code = $max_code + 1 | 0;
                $n = $max_code;
            }
            var$10 = var$8.data;
            var$8 = $tree.data;
            var$10[$m] = $n;
            $m = $n * 2 | 0;
            var$8[$m] = 1;
            $s.$depth0.data[$n] = 0;
            $s.$opt_len = $s.$opt_len - 1 | 0;
            if ($stree === null)
                continue;
            var$8 = $stree.data;
            $s.$static_len = $s.$static_len - var$8[$m + 1 | 0] | 0;
        }
        $this.$max_code = $max_code;
        $m = $m / 2 | 0;
        while ($m >= 1) {
            cjj_Deflate_pqdownheap($s, $tree, $m);
            $m = $m + (-1) | 0;
        }
        while (true) {
            var$8 = $tree.data;
            $stree = $s.$heap.data;
            $node_0 = $stree[1];
            var$12 = $s.$heap_len;
            $s.$heap_len = var$12 - 1 | 0;
            $stree[1] = $stree[var$12];
            cjj_Deflate_pqdownheap($s, $tree, 1);
            $stree = $s.$heap.data;
            $m = $stree[1];
            $n = $s.$heap_max - 1 | 0;
            $s.$heap_max = $n;
            $stree[$n] = $node_0;
            $n = $n - 1 | 0;
            $s.$heap_max = $n;
            $stree[$n] = $m;
            $n = $node * 2 | 0;
            var$12 = $node_0 * 2 | 0;
            var$13 = var$8[var$12];
            var$14 = $m * 2 | 0;
            var$8[$n] = (var$13 + var$8[var$14] | 0) << 16 >> 16;
            $stree = $s.$depth0.data;
            $stree[$node] = (jl_Math_max($stree[$node_0], $stree[$m]) + 1 | 0) << 24 >> 24;
            $m = var$12 + 1 | 0;
            $node_0 = var$14 + 1 | 0;
            $n = $node << 16 >> 16;
            var$8[$node_0] = $n;
            var$8[$m] = $n;
            $stree = $s.$heap.data;
            $node_0 = $node + 1 | 0;
            $stree[1] = $node;
            cjj_Deflate_pqdownheap($s, $tree, 1);
            if ($s.$heap_len < 2)
                break;
            $node = $node_0;
        }
        $tree = $s.$heap.data;
        $m = $s.$heap_max - 1 | 0;
        $s.$heap_max = $m;
        $tree[$m] = $tree[1];
        cjj_Tree_gen_bitlen($this, $s);
        $stree = $s.$bl_count;
        var$10 = $s.$next_code.data;
        $node_0 = 0;
        var$10[0] = 0;
        $n = 1;
        while ($n <= 15) {
            $node_0 = ($node_0 + $stree.data[$n - 1 | 0] | 0) << 1 << 16 >> 16;
            var$10[$n] = $node_0;
            $n = $n + 1 | 0;
        }
        $m = 0;
        while ($m <= $max_code) {
            $node_0 = $m * 2 | 0;
            $n = var$8[$node_0 + 1 | 0];
            if ($n) {
                $node = var$10[$n];
                var$10[$n] = ($node + 1 | 0) << 16 >> 16;
                var$12 = 0;
                while (true) {
                    var$12 = var$12 | $node & 1;
                    $node = $node >>> 1 | 0;
                    var$12 = var$12 << 1;
                    $n = $n + (-1) | 0;
                    if ($n <= 0)
                        break;
                }
                var$8[$node_0] = (var$12 >>> 1 | 0) << 16 >> 16;
            }
            $m = $m + 1 | 0;
        }
    }
    function cjj_Tree__clinit_() {
        cjj_Tree_extra_lbits = $rt_createIntArrayFromData([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
        cjj_Tree_extra_dbits = $rt_createIntArrayFromData([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
        cjj_Tree_extra_blbits = $rt_createIntArrayFromData([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
        cjj_Tree_bl_order = $rt_createByteArrayFromData([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
        cjj_Tree__dist_code = $rt_createByteArrayFromData([0, 1, 2, 3, 4, 4, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13,
        13, 13, 13, 13, 13, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
        15, 15, 15, 15, 15, 15, 15, 0, 0, 16, 17, 18, 18, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
        27, 27, 27, 27, 27, 27, 27, 27, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
        29, 29, 29, 29, 29, 29, 29, 29, 29]);
        cjj_Tree__length_code = $rt_createByteArrayFromData([0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 12, 12, 13, 13, 13, 13, 14, 14, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23,
        23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27,
        27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 28]);
        cjj_Tree_base_length = $rt_createIntArrayFromData([0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 0]);
        cjj_Tree_base_dist = $rt_createIntArrayFromData([0, 1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 6144, 8192, 12288, 16384, 24576]);
    }
    function m_StreamBuffer() {
        var a = this; jl_Object.call(a);
        a.$initialSize = 0;
        a.$initialCount = 0;
        a.$maxCount = 0;
        a.$buffers = null;
        a.$currentBufferId = 0;
        a.$overflowCounter = 0;
        a.$initializer = null;
    }
    function m_StreamBuffer__init_(var_0, var_1, var_2, var_3) {
        var var_4 = new m_StreamBuffer();
        m_StreamBuffer__init_0(var_4, var_0, var_1, var_2, var_3);
        return var_4;
    }
    function m_StreamBuffer__init_0($this, $initialSize, $initialCount, $maxCount, $initializer) {
        var var$5, var$6, $i, var$8, var$9;
        $this.$currentBufferId = 0;
        $this.$overflowCounter = 0;
        var$5 = $rt_createArray(m_StreamBuffer$StreamBufferInstance, $initialCount);
        var$6 = var$5.data;
        $this.$buffers = var$5;
        $i = 0;
        var$8 = var$6.length;
        while ($i < var$8) {
            var$9 = new m_StreamBuffer$StreamBufferInstance;
            var$9.$vertexArray = null;
            var$9.$vertexBuffer = null;
            var$9.$vertexBufferSize = 0;
            var$9.$bindQuad16 = 0;
            var$9.$bindQuad32 = 0;
            var$6[$i] = var$9;
            $i = $i + 1 | 0;
        }
        $this.$initialSize = $initialSize;
        $this.$initialCount = $initialCount;
        $this.$maxCount = $maxCount;
        $this.$initializer = $initializer;
    }
    function m_StreamBuffer_getBuffer($this, $requiredMemory) {
        var var$2, var$3, $next, var$5, var$6, var$7, $newSize;
        var$2 = $this.$buffers.data;
        var$3 = $this.$currentBufferId;
        $this.$currentBufferId = var$3 + 1 | 0;
        $next = var$2[var$3 % var$2.length | 0];
        if ($next.$vertexBuffer === null)
            $next.$vertexBuffer = olo_GL11_glCreateBuffer();
        if ($next.$vertexArray === null) {
            var$5 = olo_GL11_glCreateVertexArray();
            $next.$vertexArray = var$5;
            var$6 = $this.$initializer;
            var$7 = $next.$vertexBuffer;
            var$6 = var$6.$_01;
            olo_GL11_glBindVertexArray0(var$5);
            olo_GL11_glBindBuffer(34962, var$7);
            m_WebGLShader_setupArrayForProgram(var$6);
        }
        if ($next.$vertexBufferSize < $requiredMemory) {
            $newSize = ($requiredMemory & (-4096)) + 8192 | 0;
            olo_GL11_glBindBuffer(34962, $next.$vertexBuffer);
            m_WebGL_webgl.bufferData(34962, $newSize, 35040);
            $next.$vertexBufferSize = $newSize;
        }
        return $next;
    }
    function m_BufferArrayGL() {
        var a = this; jl_Object.call(a);
        a.$obj1 = null;
        a.$isQuadBufferBound = 0;
    }
    function m_BufferGL() {
        jl_Object.call(this);
        this.$obj5 = null;
    }
    function cjj_Deflate$Config() {
        var a = this; jl_Object.call(a);
        a.$good_length = 0;
        a.$max_lazy = 0;
        a.$nice_length = 0;
        a.$max_chain = 0;
        a.$func = 0;
    }
    function cjj_Deflate$Config__init_(var_0, var_1, var_2, var_3, var_4) {
        var var_5 = new cjj_Deflate$Config();
        cjj_Deflate$Config__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
        return var_5;
    }
    function cjj_Deflate$Config__init_0($this, $good_length, $max_lazy, $nice_length, $max_chain, $func) {
        $this.$good_length = $good_length;
        $this.$max_lazy = $max_lazy;
        $this.$nice_length = $nice_length;
        $this.$max_chain = $max_chain;
        $this.$func = $func;
    }
    var m_StreamBuffer$IStreamBufferInitializer = $rt_classWithoutFields(0);
    function m_WebGLShader$_init_$lambda$_2_0() {
        jl_Object.call(this);
        this.$_01 = null;
    }
    function m_WebGLShader$_init_$lambda$_2_0__init_(var_0) {
        var var_1 = new m_WebGLShader$_init_$lambda$_2_0();
        m_WebGLShader$_init_$lambda$_2_0__init_0(var_1, var_0);
        return var_1;
    }
    function m_WebGLShader$_init_$lambda$_2_0__init_0(var$0, var$1) {
        var$0.$_01 = var$1;
    }
    function jn_IntBufferOverArray() {
        var a = this; jn_IntBufferImpl.call(a);
        a.$readOnly0 = 0;
        a.$start0 = 0;
        a.$array1 = null;
    }
    function jn_IntBufferOverArray_getElement($this, $index) {
        return $this.$array1.data[$index + $this.$start0 | 0];
    }
    function m_ShaderGL() {
        jl_Object.call(this);
        this.$obj3 = null;
    }
    function m_ProgramGL() {
        var a = this; jl_Object.call(a);
        a.$obj4 = null;
        a.$hashcode = 0;
    }
    var m_ProgramGL_progId = 0;
    function m_ProgramGL__clinit_() {
        m_ProgramGL_progId = 0;
    }
    function m_UniformGL() {
        jl_Object.call(this);
        this.$obj2 = null;
    }
    var otrf_VirtualFile = $rt_classWithoutFields(0);
    function otrfm_VirtualFileImpl() {
        var a = this; jl_Object.call(a);
        a.$fs0 = null;
        a.$path0 = null;
    }
    function otrfm_VirtualFileImpl_isFile($this) {
        var $inMemory;
        $inMemory = otrfm_VirtualFileImpl_findInMemory($this);
        return $inMemory !== null && $inMemory.$isFile() ? 1 : 0;
    }
    function otrfm_VirtualFileImpl_createAccessor($this, $readable, $writable, $append) {
        var $inMemory;
        $inMemory = otrfm_VirtualFileImpl_findInMemory($this);
        return $inMemory === null ? null : $inMemory.$createAccessor($readable, $writable, $append);
    }
    function otrfm_VirtualFileImpl_createFile($this, $fileName) {
        var $inMemory;
        $inMemory = otrfm_VirtualFileImpl_findInMemory($this);
        if ($inMemory === null) {
            $inMemory = new ji_IOException;
            jl_Throwable__init_($inMemory, $rt_s(241));
            $rt_throw($inMemory);
        }
        return $inMemory.$createFile0($fileName) === null ? 0 : 1;
    }
    function otrfm_VirtualFileImpl_findInMemory($this) {
        var $file, $i, $next;
        $file = $this.$fs0.$root;
        $i = 0;
        if (jl_String_startsWith($this.$path0, $rt_s(2)))
            $i = 1;
        a: {
            while ($i < jl_String_length($this.$path0)) {
                $next = jl_String_indexOf($this.$path0, 47, $i);
                if ($next < 0)
                    $next = jl_String_length($this.$path0);
                $file = $file.$getChildFile(jl_String_substring0($this.$path0, $i, $next));
                if ($file === null)
                    break a;
                $i = $next + 1 | 0;
            }
        }
        return $file;
    }
    function cjj_InfBlocks() {
        var a = this; jl_Object.call(a);
        a.$mode0 = 0;
        a.$left = 0;
        a.$table = 0;
        a.$index1 = 0;
        a.$blens = null;
        a.$bb = null;
        a.$tb = null;
        a.$bl = null;
        a.$bd = null;
        a.$tl = null;
        a.$td = null;
        a.$tli = null;
        a.$tdi = null;
        a.$codes = null;
        a.$last = 0;
        a.$bitk = 0;
        a.$bitb = 0;
        a.$hufts = null;
        a.$window = null;
        a.$end = 0;
        a.$read2 = 0;
        a.$write2 = 0;
        a.$check = 0;
        a.$inftree = null;
        a.$z5 = null;
    }
    var cjj_InfBlocks_inflate_mask = null;
    var cjj_InfBlocks_border = null;
    function cjj_InfBlocks_reset($this) {
        var var$1;
        var$1 = $this.$mode0;
        var$1 != 4 && var$1 != 5;
        $this.$mode0 = 0;
        $this.$bitk = 0;
        $this.$bitb = 0;
        $this.$write2 = 0;
        $this.$read2 = 0;
        if ($this.$check)
            $this.$z5.$adler.$reset();
    }
    function cjj_InfBlocks_proc($this, $r) {
        var var$2, $p, $n, $b, $k, $q, var$8, $m, var$10, $i, $t, $c, var$14, var$15, var$16, $i_0, $j;
        var$2 = $this.$z5;
        $p = var$2.$next_in_index;
        $n = var$2.$avail_in;
        $b = $this.$bitb;
        $k = $this.$bitk;
        $q = $this.$write2;
        var$8 = $this.$read2;
        $m = $q >= var$8 ? $this.$end - $q | 0 : (var$8 - $q | 0) - 1 | 0;
        a: {
            b: {
                c: {
                    d: {
                        e: while (true) {
                            f: {
                                g: {
                                    h: {
                                        i: {
                                            j: {
                                                switch ($this.$mode0) {
                                                    case 2:
                                                        break f;
                                                    case 9:
                                                        $this.$bitb = $b;
                                                        $this.$bitk = $k;
                                                        var$2 = $this.$z5;
                                                        var$2.$avail_in = $n;
                                                        var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                        var$2.$next_in_index = $p;
                                                        $this.$write2 = $q;
                                                        return cjj_InfBlocks_inflate_flush($this, (-3));
                                                    case 0:
                                                        break j;
                                                    case 1:
                                                        break;
                                                    case 3:
                                                        while ($k < 14) {
                                                            if (!$n) {
                                                                $this.$bitb = $b;
                                                                $this.$bitk = $k;
                                                                var$2 = $this.$z5;
                                                                var$2.$avail_in = $n;
                                                                var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                                var$2.$next_in_index = $p;
                                                                $this.$write2 = $q;
                                                                return cjj_InfBlocks_inflate_flush($this, $r);
                                                            }
                                                            $r = 0;
                                                            $n = $n + (-1) | 0;
                                                            var$10 = $this.$z5.$next_in.data;
                                                            var$8 = $p + 1 | 0;
                                                            $b = $b | (var$10[$p] & 255) << $k;
                                                            $k = $k + 8 | 0;
                                                            $p = var$8;
                                                        }
                                                        var$8 = $b & 16383;
                                                        $this.$table = var$8;
                                                        $i = var$8 & 31;
                                                        if ($i > 29)
                                                            break d;
                                                        var$8 = var$8 >> 5 & 31;
                                                        if (var$8 > 29)
                                                            break d;
                                                        k: {
                                                            l: {
                                                                var$8 = (258 + $i | 0) + var$8 | 0;
                                                                var$10 = $this.$blens;
                                                                if (var$10 !== null) {
                                                                    var$10 = var$10.data;
                                                                    if (var$10.length >= var$8)
                                                                        break l;
                                                                }
                                                                $this.$blens = $rt_createIntArray(var$8);
                                                                break k;
                                                            }
                                                            $i = 0;
                                                            while (true) {
                                                                if ($i >= var$8)
                                                                    break k;
                                                                var$10[$i] = 0;
                                                                $i = $i + 1 | 0;
                                                            }
                                                        }
                                                        $b = $b >>> 14 | 0;
                                                        $k = $k + (-14) | 0;
                                                        $this.$index1 = 0;
                                                        $this.$mode0 = 4;
                                                        break i;
                                                    case 4:
                                                        break i;
                                                    case 5:
                                                        break h;
                                                    case 6:
                                                        break g;
                                                    case 7:
                                                        break b;
                                                    case 8:
                                                        break a;
                                                    default:
                                                        $this.$bitb = $b;
                                                        $this.$bitk = $k;
                                                        var$2 = $this.$z5;
                                                        var$2.$avail_in = $n;
                                                        var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                        var$2.$next_in_index = $p;
                                                        $this.$write2 = $q;
                                                        return cjj_InfBlocks_inflate_flush($this, (-2));
                                                }
                                                while ($k < 32) {
                                                    if (!$n) {
                                                        $this.$bitb = $b;
                                                        $this.$bitk = $k;
                                                        var$2 = $this.$z5;
                                                        var$2.$avail_in = $n;
                                                        var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                        var$2.$next_in_index = $p;
                                                        $this.$write2 = $q;
                                                        return cjj_InfBlocks_inflate_flush($this, $r);
                                                    }
                                                    $r = 0;
                                                    $n = $n + (-1) | 0;
                                                    var$10 = $this.$z5.$next_in.data;
                                                    var$8 = $p + 1 | 0;
                                                    $b = $b | (var$10[$p] & 255) << $k;
                                                    $k = $k + 8 | 0;
                                                    $p = var$8;
                                                }
                                                var$8 = (($b ^ (-1)) >>> 16 | 0) & 65535;
                                                $i = $b & 65535;
                                                if (var$8 != $i) {
                                                    $this.$mode0 = 9;
                                                    var$2 = $this.$z5;
                                                    var$2.$msg = $rt_s(242);
                                                    $this.$bitb = $b;
                                                    $this.$bitk = $k;
                                                    var$2.$avail_in = $n;
                                                    var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                    var$2.$next_in_index = $p;
                                                    $this.$write2 = $q;
                                                    return cjj_InfBlocks_inflate_flush($this, (-3));
                                                }
                                                $this.$left = $i;
                                                $k = 0;
                                                $this.$mode0 = $i ? 2 : !$this.$last ? 0 : 7;
                                                $b = $k;
                                                continue e;
                                            }
                                            while ($k < 3) {
                                                if (!$n) {
                                                    $this.$bitb = $b;
                                                    $this.$bitk = $k;
                                                    var$2 = $this.$z5;
                                                    var$2.$avail_in = $n;
                                                    var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                    var$2.$next_in_index = $p;
                                                    $this.$write2 = $q;
                                                    return cjj_InfBlocks_inflate_flush($this, $r);
                                                }
                                                $r = 0;
                                                $n = $n + (-1) | 0;
                                                var$10 = $this.$z5.$next_in.data;
                                                var$8 = $p + 1 | 0;
                                                $b = $b | (var$10[$p] & 255) << $k;
                                                $k = $k + 8 | 0;
                                                $p = var$8;
                                            }
                                            m: {
                                                $t = $b & 7;
                                                $this.$last = $t & 1;
                                                switch ($t >>> 1 | 0) {
                                                    case 0:
                                                        var$8 = $b >>> 3 | 0;
                                                        $i = $k + (-3) | 0;
                                                        $c = $i & 7;
                                                        $b = var$8 >>> $c | 0;
                                                        $k = $i - $c | 0;
                                                        $this.$mode0 = 1;
                                                        break m;
                                                    case 1:
                                                        cjj_InfTree_inflate_trees_fixed($this.$bl, $this.$bd, $this.$tl, $this.$td, $this.$z5);
                                                        cjj_InfCodes_init($this.$codes, $this.$bl.data[0], $this.$bd.data[0], $this.$tl.data[0], 0, $this.$td.data[0], 0);
                                                        $b = $b >>> 3 | 0;
                                                        $k = $k + (-3) | 0;
                                                        $this.$mode0 = 6;
                                                        break m;
                                                    case 2:
                                                        $b = $b >>> 3 | 0;
                                                        $k = $k + (-3) | 0;
                                                        $this.$mode0 = 3;
                                                        break m;
                                                    case 3:
                                                        $r = $b >>> 3 | 0;
                                                        var$8 = $k + (-3) | 0;
                                                        $this.$mode0 = 9;
                                                        var$2 = $this.$z5;
                                                        var$2.$msg = $rt_s(243);
                                                        $this.$bitb = $r;
                                                        $this.$bitk = var$8;
                                                        var$2.$avail_in = $n;
                                                        var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                        var$2.$next_in_index = $p;
                                                        $this.$write2 = $q;
                                                        return cjj_InfBlocks_inflate_flush($this, (-3));
                                                    default:
                                                }
                                            }
                                            continue e;
                                        }
                                        while (true) {
                                            var$8 = $this.$index1;
                                            if (var$8 >= (4 + ($this.$table >>> 10 | 0) | 0))
                                                break;
                                            while ($k < 3) {
                                                if (!$n) {
                                                    $this.$bitb = $b;
                                                    $this.$bitk = $k;
                                                    var$2 = $this.$z5;
                                                    var$2.$avail_in = $n;
                                                    var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                    var$2.$next_in_index = $p;
                                                    $this.$write2 = $q;
                                                    return cjj_InfBlocks_inflate_flush($this, $r);
                                                }
                                                $r = 0;
                                                $n = $n + (-1) | 0;
                                                var$10 = $this.$z5.$next_in.data;
                                                $i = $p + 1 | 0;
                                                $b = $b | (var$10[$p] & 255) << $k;
                                                $k = $k + 8 | 0;
                                                $p = $i;
                                            }
                                            var$14 = $this.$blens.data;
                                            var$10 = cjj_InfBlocks_border.data;
                                            $this.$index1 = var$8 + 1 | 0;
                                            var$14[var$10[var$8]] = $b & 7;
                                            $b = $b >>> 3 | 0;
                                            $k = $k + (-3) | 0;
                                        }
                                        while (true) {
                                            var$8 = $this.$index1;
                                            if (var$8 >= 19)
                                                break;
                                            var$14 = $this.$blens.data;
                                            var$10 = cjj_InfBlocks_border.data;
                                            $this.$index1 = var$8 + 1 | 0;
                                            var$14[var$10[var$8]] = 0;
                                        }
                                        var$10 = $this.$bb;
                                        var$10.data[0] = 7;
                                        var$8 = cjj_InfTree_inflate_trees_bits($this.$inftree, $this.$blens, var$10, $this.$tb, $this.$hufts, $this.$z5);
                                        if (var$8) {
                                            if (var$8 == (-3)) {
                                                $this.$blens = null;
                                                $this.$mode0 = 9;
                                            }
                                            $this.$bitb = $b;
                                            $this.$bitk = $k;
                                            var$2 = $this.$z5;
                                            var$2.$avail_in = $n;
                                            var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                            var$2.$next_in_index = $p;
                                            $this.$write2 = $q;
                                            return cjj_InfBlocks_inflate_flush($this, var$8);
                                        }
                                        $this.$index1 = 0;
                                        $this.$mode0 = 5;
                                    }
                                    while (true) {
                                        var$8 = $this.$table;
                                        $i = $this.$index1;
                                        $c = var$8 & 31;
                                        $m = 258 + $c | 0;
                                        var$8 = var$8 >> 5 & 31;
                                        $m = $m + var$8 | 0;
                                        if ($i >= $m)
                                            break;
                                        $t = $this.$bb.data[0];
                                        while ($k < $t) {
                                            if (!$n) {
                                                $this.$bitb = $b;
                                                $this.$bitk = $k;
                                                var$2 = $this.$z5;
                                                var$2.$avail_in = $n;
                                                var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                var$2.$next_in_index = $p;
                                                $this.$write2 = $q;
                                                return cjj_InfBlocks_inflate_flush($this, $r);
                                            }
                                            $r = 0;
                                            $n = $n + (-1) | 0;
                                            var$10 = $this.$z5.$next_in.data;
                                            var$8 = $p + 1 | 0;
                                            $b = $b | (var$10[$p] & 255) << $k;
                                            $k = $k + 8 | 0;
                                            $p = var$8;
                                        }
                                        var$10 = $this.$tb.data;
                                        var$15 = $this.$hufts.data;
                                        var$8 = var$10[0];
                                        var$14 = cjj_InfBlocks_inflate_mask.data;
                                        var$16 = var$15[((var$8 + ($b & var$14[$t]) | 0) * 3 | 0) + 1 | 0];
                                        $c = var$15[((var$10[0] + ($b & var$14[var$16]) | 0) * 3 | 0) + 2 | 0];
                                        $t = $rt_compare($c, 16);
                                        if ($t < 0) {
                                            $b = $b >>> var$16 | 0;
                                            $k = $k - var$16 | 0;
                                            var$10 = $this.$blens.data;
                                            $this.$index1 = $i + 1 | 0;
                                            var$10[$i] = $c;
                                        } else {
                                            var$8 = $rt_compare($c, 18);
                                            $i_0 = !var$8 ? 7 : $c - 14 | 0;
                                            $j = var$8 ? 3 : 11;
                                            while ($k < (var$16 + $i_0 | 0)) {
                                                if (!$n) {
                                                    $this.$bitb = $b;
                                                    $this.$bitk = $k;
                                                    var$2 = $this.$z5;
                                                    var$2.$avail_in = $n;
                                                    var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                                    var$2.$next_in_index = $p;
                                                    $this.$write2 = $q;
                                                    return cjj_InfBlocks_inflate_flush($this, $r);
                                                }
                                                $r = 0;
                                                $n = $n + (-1) | 0;
                                                var$10 = $this.$z5.$next_in.data;
                                                var$8 = $p + 1 | 0;
                                                $b = $b | (var$10[$p] & 255) << $k;
                                                $k = $k + 8 | 0;
                                                $p = var$8;
                                            }
                                            $c = $b >>> var$16 | 0;
                                            $k = $k - var$16 | 0;
                                            var$8 = $j + ($c & var$14[$i_0]) | 0;
                                            $b = $c >>> $i_0 | 0;
                                            $k = $k - $i_0 | 0;
                                            if (($i + var$8 | 0) > $m)
                                                break c;
                                            if (!$t && $i < 1)
                                                break c;
                                            $m = $t ? 0 : $this.$blens.data[$i - 1 | 0];
                                            while (true) {
                                                var$10 = $this.$blens.data;
                                                $c = $i + 1 | 0;
                                                var$10[$i] = $m;
                                                var$8 = var$8 + (-1) | 0;
                                                if (!var$8)
                                                    break;
                                                $i = $c;
                                            }
                                            $this.$index1 = $c;
                                        }
                                    }
                                    $this.$tb.data[0] = (-1);
                                    var$10 = $this.$bl;
                                    var$10.data[0] = 9;
                                    var$14 = $this.$bd;
                                    var$14.data[0] = 6;
                                    var$8 = cjj_InfTree_inflate_trees_dynamic($this.$inftree, 257 + $c | 0, 1 + var$8 | 0, $this.$blens, var$10, var$14, $this.$tli, $this.$tdi, $this.$hufts, $this.$z5);
                                    if (var$8) {
                                        if (var$8 == (-3)) {
                                            $this.$blens = null;
                                            $this.$mode0 = 9;
                                        }
                                        $this.$bitb = $b;
                                        $this.$bitk = $k;
                                        var$2 = $this.$z5;
                                        var$2.$avail_in = $n;
                                        var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                        var$2.$next_in_index = $p;
                                        $this.$write2 = $q;
                                        return cjj_InfBlocks_inflate_flush($this, var$8);
                                    }
                                    var$2 = $this.$codes;
                                    var$8 = $this.$bl.data[0];
                                    $i = $this.$bd.data[0];
                                    var$10 = $this.$hufts;
                                    cjj_InfCodes_init(var$2, var$8, $i, var$10, $this.$tli.data[0], var$10, $this.$tdi.data[0]);
                                    $this.$mode0 = 6;
                                }
                                $this.$bitb = $b;
                                $this.$bitk = $k;
                                var$2 = $this.$z5;
                                var$2.$avail_in = $n;
                                var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                var$2.$next_in_index = $p;
                                $this.$write2 = $q;
                                $r = cjj_InfCodes_proc($this.$codes, $r);
                                if ($r != 1)
                                    break e;
                                $r = 0;
                                cjj_InfCodes_free($this.$codes, $this.$z5);
                                var$2 = $this.$z5;
                                $p = var$2.$next_in_index;
                                $n = var$2.$avail_in;
                                $b = $this.$bitb;
                                $k = $this.$bitk;
                                $q = $this.$write2;
                                var$8 = $this.$read2;
                                $m = $q >= var$8 ? $this.$end - $q | 0 : (var$8 - $q | 0) - 1 | 0;
                                if ($this.$last) {
                                    $this.$mode0 = 7;
                                    break b;
                                }
                                $this.$mode0 = 0;
                                continue e;
                            }
                            if (!$n) {
                                $this.$bitb = $b;
                                $this.$bitk = $k;
                                var$2 = $this.$z5;
                                var$2.$avail_in = $n;
                                var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                var$2.$next_in_index = $p;
                                $this.$write2 = $q;
                                return cjj_InfBlocks_inflate_flush($this, $r);
                            }
                            if (!$m) {
                                $c = $this.$end;
                                if ($q == $c) {
                                    var$8 = $this.$read2;
                                    if (var$8) {
                                        $q = 0;
                                        $m = $q >= var$8 ? $c - $q | 0 : (var$8 - $q | 0) - 1 | 0;
                                    }
                                }
                                if (!$m) {
                                    $this.$write2 = $q;
                                    $i = cjj_InfBlocks_inflate_flush($this, $r);
                                    $q = $this.$write2;
                                    var$8 = $this.$read2;
                                    $m = $q >= var$8 ? $this.$end - $q | 0 : (var$8 - $q | 0) - 1 | 0;
                                    $c = $this.$end;
                                    if ($q == $c && var$8) {
                                        $q = 0;
                                        $m = $q >= var$8 ? $c - $q | 0 : (var$8 - $q | 0) - 1 | 0;
                                    }
                                    if (!$m) {
                                        $this.$bitb = $b;
                                        $this.$bitk = $k;
                                        var$2 = $this.$z5;
                                        var$2.$avail_in = $n;
                                        var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                                        var$2.$next_in_index = $p;
                                        $this.$write2 = $q;
                                        return cjj_InfBlocks_inflate_flush($this, $i);
                                    }
                                }
                            }
                            $r = 0;
                            var$8 = $this.$left;
                            if (var$8 > $n)
                                var$8 = $n;
                            if (var$8 > $m)
                                var$8 = $m;
                            jl_System_fastArraycopy($this.$z5.$next_in, $p, $this.$window, $q, var$8);
                            $p = $p + var$8 | 0;
                            $n = $n - var$8 | 0;
                            $q = $q + var$8 | 0;
                            $m = $m - var$8 | 0;
                            var$8 = $this.$left - var$8 | 0;
                            $this.$left = var$8;
                            if (var$8)
                                continue;
                            $this.$mode0 = !$this.$last ? 0 : 7;
                        }
                        return cjj_InfBlocks_inflate_flush($this, $r);
                    }
                    $this.$mode0 = 9;
                    var$2 = $this.$z5;
                    var$2.$msg = $rt_s(244);
                    $this.$bitb = $b;
                    $this.$bitk = $k;
                    var$2.$avail_in = $n;
                    var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                    var$2.$next_in_index = $p;
                    $this.$write2 = $q;
                    return cjj_InfBlocks_inflate_flush($this, (-3));
                }
                $this.$blens = null;
                $this.$mode0 = 9;
                var$2 = $this.$z5;
                var$2.$msg = $rt_s(245);
                $this.$bitb = $b;
                $this.$bitk = $k;
                var$2.$avail_in = $n;
                var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                var$2.$next_in_index = $p;
                $this.$write2 = $q;
                return cjj_InfBlocks_inflate_flush($this, (-3));
            }
            $this.$write2 = $q;
            $r = cjj_InfBlocks_inflate_flush($this, $r);
            $q = $this.$write2;
            var$8 = $this.$read2;
            if (var$8 != $q) {
                $this.$bitb = $b;
                $this.$bitk = $k;
                var$2 = $this.$z5;
                var$2.$avail_in = $n;
                var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
                var$2.$next_in_index = $p;
                $this.$write2 = $q;
                return cjj_InfBlocks_inflate_flush($this, $r);
            }
            $this.$mode0 = 8;
        }
        $this.$bitb = $b;
        $this.$bitk = $k;
        var$2 = $this.$z5;
        var$2.$avail_in = $n;
        var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt($p - var$2.$next_in_index | 0));
        var$2.$next_in_index = $p;
        $this.$write2 = $q;
        return cjj_InfBlocks_inflate_flush($this, 1);
    }
    function cjj_InfBlocks_free($this) {
        cjj_InfBlocks_reset($this);
        $this.$window = null;
        $this.$hufts = null;
    }
    function cjj_InfBlocks_inflate_flush($this, $r) {
        var var$2, $p, $q, var$5, $n, var$7;
        var$2 = $this.$z5;
        $p = var$2.$next_out_index;
        $q = $this.$read2;
        var$5 = $this.$write2;
        if ($q > var$5)
            var$5 = $this.$end;
        $n = var$5 - $q | 0;
        var$5 = var$2.$avail_out;
        if ($n > var$5)
            $n = var$5;
        if ($n && $r == (-5))
            $r = 0;
        var$2.$avail_out = var$5 - $n | 0;
        var$2.$total_out = Long_add(var$2.$total_out, Long_fromInt($n));
        if ($this.$check && $n > 0)
            var$2.$adler.$update1($this.$window, $q, $n);
        jl_System_fastArraycopy($this.$window, $q, $this.$z5.$next_out, $p, $n);
        var$5 = $p + $n | 0;
        var$7 = $q + $n | 0;
        $p = $this.$end;
        if (var$7 == $p) {
            if ($this.$write2 == $p)
                $this.$write2 = 0;
            $p = $this.$write2 - 0 | 0;
            var$2 = $this.$z5;
            $q = var$2.$avail_out;
            if ($p > $q)
                $p = $q;
            if ($p && $r == (-5))
                $r = 0;
            var$2.$avail_out = $q - $p | 0;
            var$2.$total_out = Long_add(var$2.$total_out, Long_fromInt($p));
            if ($this.$check && $p > 0)
                var$2.$adler.$update1($this.$window, 0, $p);
            jl_System_fastArraycopy($this.$window, 0, $this.$z5.$next_out, var$5, $p);
            var$5 = var$5 + $p | 0;
            var$7 = 0 + $p | 0;
        }
        $this.$z5.$next_out_index = var$5;
        $this.$read2 = var$7;
        return $r;
    }
    function cjj_InfBlocks__clinit_() {
        cjj_InfBlocks_inflate_mask = $rt_createIntArrayFromData([0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535]);
        cjj_InfBlocks_border = $rt_createIntArrayFromData([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    }
    function cjj_InfTree() {
        var a = this; jl_Object.call(a);
        a.$hn = null;
        a.$v0 = null;
        a.$c = null;
        a.$r = null;
        a.$u = null;
        a.$x4 = null;
    }
    var cjj_InfTree_fixed_tl = null;
    var cjj_InfTree_fixed_td = null;
    var cjj_InfTree_cplens = null;
    var cjj_InfTree_cplext = null;
    var cjj_InfTree_cpdist = null;
    var cjj_InfTree_cpdext = null;
    function cjj_InfTree_huft_build($this, $b, $bindex, $n, $s, $d, $e, $t, $m, $hp, $hn, $v) {
        var $p, $i, var$14, var$15, $a, $l, $j, $y, $xp, $mask, $w, $f, var$24, var$25, $h, $q, $z, $a_0;
        $p = 0;
        $i = $n;
        while (true) {
            var$14 = $b.data;
            var$15 = $this.$c.data;
            $a = var$14[$bindex + $p | 0];
            var$15[$a] = var$15[$a] + 1 | 0;
            $p = $p + 1 | 0;
            $i = $i + (-1) | 0;
            if (!$i)
                break;
        }
        if (var$15[0] == $n) {
            $b = $t.data;
            $d = $m.data;
            $b[0] = (-1);
            $d[0] = 0;
            return 0;
        }
        $b = $m.data;
        $l = $b[0];
        $j = 1;
        a: {
            while (true) {
                if ($j > 15)
                    break a;
                if (var$15[$j])
                    break;
                $j = $j + 1 | 0;
            }
        }
        if ($l < $j)
            $l = $j;
        $p = 15;
        b: {
            while (true) {
                if (!$p)
                    break b;
                if (var$15[$p])
                    break;
                $p = $p + (-1) | 0;
            }
        }
        if ($l > $p)
            $l = $p;
        $b[0] = $l;
        $y = 1 << $j;
        $xp = $j;
        while (true) {
            if ($xp >= $p) {
                $i = $y - var$15[$p] | 0;
                if ($i < 0)
                    return (-3);
                var$15[$p] = var$15[$p] + $i | 0;
                $b = $this.$x4.data;
                $mask = 0;
                $b[1] = $mask;
                $w = 1;
                $xp = 2;
                $f = $p;
                while (true) {
                    $f = $f + (-1) | 0;
                    if (!$f)
                        break;
                    $mask = $mask + var$15[$w] | 0;
                    $b[$xp] = $mask;
                    $xp = $xp + 1 | 0;
                    $w = $w + 1 | 0;
                }
                $a = 0;
                $xp = 0;
                while (true) {
                    $f = var$14[$bindex + $xp | 0];
                    if ($f) {
                        $m = $v.data;
                        $w = $b[$f];
                        $b[$f] = $w + 1 | 0;
                        $m[$w] = $a;
                    }
                    $xp = $xp + 1 | 0;
                    $a = $a + 1 | 0;
                    if ($a >= $n)
                        break;
                }
                $xp = $b[$p];
                var$24 = 0;
                $b[0] = var$24;
                var$25 = 0;
                $h = (-1);
                $w =  -$l | 0;
                $this.$u.data[0] = 0;
                $q = 0;
                $z = 0;
                c: while (true) {
                    if ($j > $p)
                        return $i && $p != 1 ? (-5) : 0;
                    $a = $this.$c.data[$j];
                    while (true) {
                        $a_0 = $a + (-1) | 0;
                        if (!$a)
                            break;
                        $y = $a_0 + 1 | 0;
                        while (true) {
                            $f = $w + $l | 0;
                            if ($j <= $f)
                                break;
                            $h = $h + 1 | 0;
                            $mask = $p - $f | 0;
                            if ($mask > $l)
                                $mask = $l;
                            d: {
                                $w = $j - $f | 0;
                                $bindex = 1 << $w;
                                if ($bindex > $y) {
                                    $bindex = $bindex - $y | 0;
                                    if ($w < $mask) {
                                        $n = $j;
                                        while (true) {
                                            $w = $w + 1 | 0;
                                            if ($w >= $mask)
                                                break;
                                            $bindex = $bindex << 1;
                                            $b = $this.$c.data;
                                            $n = $n + 1 | 0;
                                            if ($bindex <= $b[$n])
                                                break d;
                                            $bindex = $bindex - $b[$n] | 0;
                                        }
                                    }
                                }
                            }
                            $m = $hn.data;
                            $z = 1 << $w;
                            if (($m[0] + $z | 0) > 1440)
                                break c;
                            $b = $this.$u.data;
                            $q = $m[0];
                            $b[$h] = $q;
                            $m[0] = $m[0] + $z | 0;
                            if (!$h) {
                                $t.data[0] = $q;
                                $w = $f;
                                continue;
                            }
                            $this.$x4.data[$h] = var$24;
                            $m = $this.$r;
                            var$15 = $m.data;
                            var$15[0] = $w << 24 >> 24;
                            var$15[1] = $l << 24 >> 24;
                            $mask = var$24 >>> ($f - $l | 0) | 0;
                            $n = $h - 1 | 0;
                            var$15[2] = ($q - $b[$n] | 0) - $mask | 0;
                            jl_System_fastArraycopy($m, 0, $hp, ($b[$n] + $mask | 0) * 3 | 0, 3);
                            $w = $f;
                        }
                        var$15 = $this.$r.data;
                        $f = $j - $w | 0;
                        var$15[1] = $f << 24 >> 24;
                        if (var$25 >= $xp)
                            var$15[0] = 192;
                        else {
                            var$14 = $v.data;
                            if (var$14[var$25] >= $s) {
                                $b = $e.data;
                                $m = $d.data;
                                var$15[0] = (($b[var$14[var$25] - $s | 0] + 16 | 0) + 64 | 0) << 24 >> 24;
                                $n = var$25 + 1 | 0;
                                var$15[2] = $m[var$14[var$25] - $s | 0];
                                var$25 = $n;
                            } else {
                                var$15[0] = (var$14[var$25] >= 256 ? 96 : 0) << 24 >> 24;
                                $n = var$25 + 1 | 0;
                                var$15[2] = var$14[var$25];
                                var$25 = $n;
                            }
                        }
                        $f = 1 << $f;
                        $bindex = var$24 >>> $w | 0;
                        while ($bindex < $z) {
                            jl_System_fastArraycopy($this.$r, 0, $hp, ($q + $bindex | 0) * 3 | 0, 3);
                            $bindex = $bindex + $f | 0;
                        }
                        $bindex = 1 << ($j - 1 | 0);
                        while (var$24 & $bindex) {
                            var$24 = var$24 ^ $bindex;
                            $bindex = $bindex >>> 1 | 0;
                        }
                        var$24 = var$24 ^ $bindex;
                        $mask = (1 << $w) - 1 | 0;
                        while ((var$24 & $mask) != $this.$x4.data[$h]) {
                            $h = $h + (-1) | 0;
                            $w = $w - $l | 0;
                            $mask = (1 << $w) - 1 | 0;
                        }
                        $a = $a_0;
                    }
                    $j = $j + 1 | 0;
                }
                return (-3);
            }
            $a = $y - var$15[$xp] | 0;
            if ($a < 0)
                break;
            $xp = $xp + 1 | 0;
            $y = $a << 1;
        }
        return (-3);
    }
    function cjj_InfTree_inflate_trees_bits($this, $c, $bb, $tb, $hp, $z) {
        var var$6, $result;
        cjj_InfTree_initWorkArea($this, 19);
        var$6 = $this.$hn;
        var$6.data[0] = 0;
        $result = cjj_InfTree_huft_build($this, $c, 0, 19, 19, null, null, $tb, $bb, $hp, var$6, $this.$v0);
        if ($result == (-3))
            $z.$msg = $rt_s(246);
        else if (!($result != (-5) && $bb.data[0])) {
            $z.$msg = $rt_s(247);
            $result = (-3);
        }
        return $result;
    }
    function cjj_InfTree_inflate_trees_dynamic($this, $nl, $nd, $c, $bl, $bd, $tl, $td, $hp, $z) {
        var var$10, $result;
        cjj_InfTree_initWorkArea($this, 288);
        var$10 = $this.$hn;
        var$10.data[0] = 0;
        $result = cjj_InfTree_huft_build($this, $c, 0, $nl, 257, cjj_InfTree_cplens, cjj_InfTree_cplext, $tl, $bl, $hp, var$10, $this.$v0);
        if (!$result && $bl.data[0]) {
            cjj_InfTree_initWorkArea($this, 288);
            $nd = cjj_InfTree_huft_build($this, $c, $nl, $nd, 0, cjj_InfTree_cpdist, cjj_InfTree_cpdext, $td, $bd, $hp, $this.$hn, $this.$v0);
            if (!$nd && !(!$bd.data[0] && $nl > 257))
                return 0;
            if ($nd == (-3))
                $z.$msg = $rt_s(248);
            else if ($nd == (-5)) {
                $z.$msg = $rt_s(249);
                $nd = (-3);
            } else if ($nd != (-4)) {
                $z.$msg = $rt_s(250);
                $nd = (-3);
            }
            return $nd;
        }
        if ($result == (-3))
            $z.$msg = $rt_s(251);
        else if ($result != (-4)) {
            $z.$msg = $rt_s(252);
            $result = (-3);
        }
        return $result;
    }
    function cjj_InfTree_inflate_trees_fixed($bl, $bd, $tl, $td, $z) {
        $td = $td.data;
        $tl = $tl.data;
        $bd = $bd.data;
        $bl.data[0] = 9;
        $bd[0] = 5;
        $tl[0] = cjj_InfTree_fixed_tl;
        $td[0] = cjj_InfTree_fixed_td;
        return 0;
    }
    function cjj_InfTree_initWorkArea($this, $vsize) {
        var $i;
        if ($this.$hn === null) {
            $this.$hn = $rt_createIntArray(1);
            $this.$v0 = $rt_createIntArray($vsize);
            $this.$c = $rt_createIntArray(16);
            $this.$r = $rt_createIntArray(3);
            $this.$u = $rt_createIntArray(15);
            $this.$x4 = $rt_createIntArray(16);
        }
        if ($this.$v0.data.length < $vsize)
            $this.$v0 = $rt_createIntArray($vsize);
        $i = 0;
        while ($i < $vsize) {
            $this.$v0.data[$i] = 0;
            $i = $i + 1 | 0;
        }
        $i = 0;
        while ($i < 16) {
            $this.$c.data[$i] = 0;
            $i = $i + 1 | 0;
        }
        $i = 0;
        while ($i < 3) {
            $this.$r.data[$i] = 0;
            $i = $i + 1 | 0;
        }
        jl_System_fastArraycopy($this.$c, 0, $this.$u, 0, 15);
        jl_System_fastArraycopy($this.$c, 0, $this.$x4, 0, 16);
    }
    function cjj_InfTree__clinit_() {
        cjj_InfTree_fixed_tl = $rt_createIntArrayFromData([96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36,
        0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42,
        0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33,
        0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45,
        0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39,
        0, 9, 174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40,
        0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34,
        0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46,
        0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37,
        0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43,
        0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255]);
        cjj_InfTree_fixed_td = $rt_createIntArrayFromData([80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577]);
        cjj_InfTree_cplens = $rt_createIntArrayFromData([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]);
        cjj_InfTree_cplext = $rt_createIntArrayFromData([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112]);
        cjj_InfTree_cpdist = $rt_createIntArrayFromData([1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577]);
        cjj_InfTree_cpdext = $rt_createIntArrayFromData([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
    }
    function cjj_InfCodes() {
        var a = this; jl_Object.call(a);
        a.$mode2 = 0;
        a.$len0 = 0;
        a.$tree = null;
        a.$tree_index = 0;
        a.$need0 = 0;
        a.$lit = 0;
        a.$get5 = 0;
        a.$dist = 0;
        a.$lbits = 0;
        a.$dbits = 0;
        a.$ltree = null;
        a.$ltree_index = 0;
        a.$dtree = null;
        a.$dtree_index = 0;
        a.$z6 = null;
        a.$s = null;
    }
    var cjj_InfCodes_inflate_mask = null;
    function cjj_InfCodes_init($this, $bl, $bd, $tl, $tl_index, $td, $td_index) {
        $this.$mode2 = 0;
        $this.$lbits = $bl << 24 >> 24;
        $this.$dbits = $bd << 24 >> 24;
        $this.$ltree = $tl;
        $this.$ltree_index = $tl_index;
        $this.$dtree = $td;
        $this.$dtree_index = $td_index;
        $this.$tree = null;
    }
    function cjj_InfCodes_proc($this, $r) {
        var var$2, var$3, $n, var$5, var$6, $q, $f, $m, var$10, var$11, $j, $tindex, $e;
        var$2 = $this.$z6;
        var$3 = var$2.$next_in_index;
        $n = var$2.$avail_in;
        var$2 = $this.$s;
        var$5 = var$2.$bitb;
        var$6 = var$2.$bitk;
        $q = var$2.$write2;
        $f = var$2.$read2;
        $m = $q >= $f ? var$2.$end - $q | 0 : ($f - $q | 0) - 1 | 0;
        a: {
            b: while (true) {
                c: {
                    d: {
                        e: {
                            f: {
                                g: {
                                    switch ($this.$mode2) {
                                        case 0:
                                            break f;
                                        case 2:
                                            $f = $this.$get5;
                                            while (var$6 < $f) {
                                                if (!$n) {
                                                    var$2 = $this.$s;
                                                    var$2.$bitb = var$5;
                                                    var$2.$bitk = var$6;
                                                    var$10 = $this.$z6;
                                                    var$10.$avail_in = $n;
                                                    var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                                    var$10.$next_in_index = var$3;
                                                    var$2.$write2 = $q;
                                                    return cjj_InfBlocks_inflate_flush(var$2, $r);
                                                }
                                                $r = 0;
                                                $n = $n + (-1) | 0;
                                                var$11 = $this.$z6.$next_in.data;
                                                $j = var$3 + 1 | 0;
                                                var$5 = var$5 | (var$11[var$3] & 255) << var$6;
                                                var$6 = var$6 + 8 | 0;
                                                var$3 = $j;
                                            }
                                            $this.$len0 = $this.$len0 + (var$5 & cjj_InfCodes_inflate_mask.data[$f]) | 0;
                                            var$5 = var$5 >> $f;
                                            var$6 = var$6 - $f | 0;
                                            $this.$need0 = $this.$dbits;
                                            $this.$tree = $this.$dtree;
                                            $this.$tree_index = $this.$dtree_index;
                                            $this.$mode2 = 3;
                                            break g;
                                        case 4:
                                            $j = $this.$get5;
                                            while (var$6 < $j) {
                                                if (!$n) {
                                                    var$2 = $this.$s;
                                                    var$2.$bitb = var$5;
                                                    var$2.$bitk = var$6;
                                                    var$10 = $this.$z6;
                                                    var$10.$avail_in = $n;
                                                    var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                                    var$10.$next_in_index = var$3;
                                                    var$2.$write2 = $q;
                                                    return cjj_InfBlocks_inflate_flush(var$2, $r);
                                                }
                                                $r = 0;
                                                $n = $n + (-1) | 0;
                                                var$11 = $this.$z6.$next_in.data;
                                                $f = var$3 + 1 | 0;
                                                var$5 = var$5 | (var$11[var$3] & 255) << var$6;
                                                var$6 = var$6 + 8 | 0;
                                                var$3 = $f;
                                            }
                                            $this.$dist = $this.$dist + (var$5 & cjj_InfCodes_inflate_mask.data[$j]) | 0;
                                            var$5 = var$5 >> $j;
                                            var$6 = var$6 - $j | 0;
                                            $this.$mode2 = 5;
                                            break c;
                                        case 6:
                                            break d;
                                        case 7:
                                            if (var$6 > 7) {
                                                var$6 = var$6 + (-8) | 0;
                                                $n = $n + 1 | 0;
                                                var$3 = var$3 + (-1) | 0;
                                            }
                                            var$2 = $this.$s;
                                            var$2.$write2 = $q;
                                            $r = cjj_InfBlocks_inflate_flush(var$2, $r);
                                            var$2 = $this.$s;
                                            $q = var$2.$write2;
                                            $f = var$2.$read2;
                                            if ($f != $q) {
                                                var$2.$bitb = var$5;
                                                var$2.$bitk = var$6;
                                                var$10 = $this.$z6;
                                                var$10.$avail_in = $n;
                                                var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                                var$10.$next_in_index = var$3;
                                                var$2.$write2 = $q;
                                                return cjj_InfBlocks_inflate_flush(var$2, $r);
                                            }
                                            $this.$mode2 = 8;
                                            break a;
                                        case 9:
                                            var$2 = $this.$s;
                                            var$2.$bitb = var$5;
                                            var$2.$bitk = var$6;
                                            var$10 = $this.$z6;
                                            var$10.$avail_in = $n;
                                            var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                            var$10.$next_in_index = var$3;
                                            var$2.$write2 = $q;
                                            return cjj_InfBlocks_inflate_flush(var$2, (-3));
                                        case 1:
                                            break e;
                                        case 3:
                                            break;
                                        case 5:
                                            break c;
                                        case 8:
                                            break a;
                                        default:
                                            var$2 = $this.$s;
                                            var$2.$bitb = var$5;
                                            var$2.$bitk = var$6;
                                            var$10 = $this.$z6;
                                            var$10.$avail_in = $n;
                                            var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                            var$10.$next_in_index = var$3;
                                            var$2.$write2 = $q;
                                            return cjj_InfBlocks_inflate_flush(var$2, (-2));
                                    }
                                }
                                $f = $this.$need0;
                                while (var$6 < $f) {
                                    if (!$n) {
                                        var$2 = $this.$s;
                                        var$2.$bitb = var$5;
                                        var$2.$bitk = var$6;
                                        var$10 = $this.$z6;
                                        var$10.$avail_in = $n;
                                        var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                        var$10.$next_in_index = var$3;
                                        var$2.$write2 = $q;
                                        return cjj_InfBlocks_inflate_flush(var$2, $r);
                                    }
                                    $r = 0;
                                    $n = $n + (-1) | 0;
                                    var$11 = $this.$z6.$next_in.data;
                                    $j = var$3 + 1 | 0;
                                    var$5 = var$5 | (var$11[var$3] & 255) << var$6;
                                    var$6 = var$6 + 8 | 0;
                                    var$3 = $j;
                                }
                                $f = ($this.$tree_index + (var$5 & cjj_InfCodes_inflate_mask.data[$f]) | 0) * 3 | 0;
                                var$11 = $this.$tree.data;
                                $j = $f + 1 | 0;
                                var$5 = var$5 >> var$11[$j];
                                var$6 = var$6 - var$11[$j] | 0;
                                $j = var$11[$f];
                                if ($j & 16) {
                                    $this.$get5 = $j & 15;
                                    $this.$dist = var$11[$f + 2 | 0];
                                    $this.$mode2 = 4;
                                    continue b;
                                }
                                if ($j & 64) {
                                    $this.$mode2 = 9;
                                    var$2 = $this.$z6;
                                    var$2.$msg = $rt_s(253);
                                    var$10 = $this.$s;
                                    var$10.$bitb = var$5;
                                    var$10.$bitk = var$6;
                                    var$2.$avail_in = $n;
                                    var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt(var$3 - var$2.$next_in_index | 0));
                                    var$2.$next_in_index = var$3;
                                    var$10.$write2 = $q;
                                    return cjj_InfBlocks_inflate_flush(var$10, (-3));
                                }
                                $this.$need0 = $j;
                                $this.$tree_index = ($f / 3 | 0) + var$11[$f + 2 | 0] | 0;
                                continue b;
                            }
                            if ($m >= 258 && $n >= 10) {
                                var$2 = $this.$s;
                                var$2.$bitb = var$5;
                                var$2.$bitk = var$6;
                                var$10 = $this.$z6;
                                var$10.$avail_in = $n;
                                var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                var$10.$next_in_index = var$3;
                                var$2.$write2 = $q;
                                $r = cjj_InfCodes_inflate_fast($this, $this.$lbits, $this.$dbits, $this.$ltree, $this.$ltree_index, $this.$dtree, $this.$dtree_index, var$2, var$10);
                                var$2 = $this.$z6;
                                var$3 = var$2.$next_in_index;
                                $n = var$2.$avail_in;
                                var$2 = $this.$s;
                                var$5 = var$2.$bitb;
                                var$6 = var$2.$bitk;
                                $q = var$2.$write2;
                                $f = var$2.$read2;
                                $m = $q >= $f ? var$2.$end - $q | 0 : ($f - $q | 0) - 1 | 0;
                                if ($r) {
                                    $this.$mode2 = $r != 1 ? 9 : 7;
                                    continue b;
                                }
                            }
                            $this.$need0 = $this.$lbits;
                            $this.$tree = $this.$ltree;
                            $this.$tree_index = $this.$ltree_index;
                            $this.$mode2 = 1;
                        }
                        $j = $this.$need0;
                        while (var$6 < $j) {
                            if (!$n) {
                                var$2 = $this.$s;
                                var$2.$bitb = var$5;
                                var$2.$bitk = var$6;
                                var$10 = $this.$z6;
                                var$10.$avail_in = $n;
                                var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                var$10.$next_in_index = var$3;
                                var$2.$write2 = $q;
                                return cjj_InfBlocks_inflate_flush(var$2, $r);
                            }
                            $r = 0;
                            $n = $n + (-1) | 0;
                            var$11 = $this.$z6.$next_in.data;
                            $f = var$3 + 1 | 0;
                            var$5 = var$5 | (var$11[var$3] & 255) << var$6;
                            var$6 = var$6 + 8 | 0;
                            var$3 = $f;
                        }
                        $tindex = ($this.$tree_index + (var$5 & cjj_InfCodes_inflate_mask.data[$j]) | 0) * 3 | 0;
                        var$11 = $this.$tree.data;
                        $f = $tindex + 1 | 0;
                        var$5 = var$5 >>> var$11[$f] | 0;
                        var$6 = var$6 - var$11[$f] | 0;
                        $e = var$11[$tindex];
                        if (!$e) {
                            $this.$lit = var$11[$tindex + 2 | 0];
                            $this.$mode2 = 6;
                            continue b;
                        }
                        if ($e & 16) {
                            $this.$get5 = $e & 15;
                            $this.$len0 = var$11[$tindex + 2 | 0];
                            $this.$mode2 = 2;
                            continue b;
                        }
                        if (!($e & 64)) {
                            $this.$need0 = $e;
                            $this.$tree_index = ($tindex / 3 | 0) + var$11[$tindex + 2 | 0] | 0;
                            continue b;
                        }
                        if (!($e & 32)) {
                            $this.$mode2 = 9;
                            var$2 = $this.$z6;
                            var$2.$msg = $rt_s(254);
                            var$10 = $this.$s;
                            var$10.$bitb = var$5;
                            var$10.$bitk = var$6;
                            var$2.$avail_in = $n;
                            var$2.$total_in = Long_add(var$2.$total_in, Long_fromInt(var$3 - var$2.$next_in_index | 0));
                            var$2.$next_in_index = var$3;
                            var$10.$write2 = $q;
                            return cjj_InfBlocks_inflate_flush(var$10, (-3));
                        }
                        $this.$mode2 = 7;
                        continue b;
                    }
                    if ($m)
                        $f = $q;
                    else {
                        var$2 = $this.$s;
                        $j = var$2.$end;
                        if ($q != $j)
                            $f = $q;
                        else {
                            $tindex = var$2.$read2;
                            if (!$tindex)
                                $f = $q;
                            else {
                                $f = 0;
                                $m = $f >= $tindex ? $j - $f | 0 : ($tindex - $f | 0) - 1 | 0;
                            }
                        }
                        if (!$m) {
                            var$2.$write2 = $f;
                            $r = cjj_InfBlocks_inflate_flush(var$2, $r);
                            var$2 = $this.$s;
                            $f = var$2.$write2;
                            $j = var$2.$read2;
                            $m = $f >= $j ? var$2.$end - $f | 0 : ($j - $f | 0) - 1 | 0;
                            $tindex = var$2.$end;
                            if ($f == $tindex && $j) {
                                $f = 0;
                                $m = $f >= $j ? $tindex - $f | 0 : ($j - $f | 0) - 1 | 0;
                            }
                            if (!$m) {
                                var$2.$bitb = var$5;
                                var$2.$bitk = var$6;
                                var$10 = $this.$z6;
                                var$10.$avail_in = $n;
                                var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
                                var$10.$next_in_index = var$3;
                                var$2.$write2 = $f;
                                return cjj_InfBlocks_inflate_flush(var$2, $r);
                            }
                        }
                    }
                    $r = 0;
                    var$11 = $this.$s.$window.data;
                    $q = $f + 1 | 0;
                    var$11[$f] = $this.$lit << 24 >> 24;
                    $m = $m + (-1) | 0;
                    $this.$mode2 = 0;
                    continue b;
                }
                $f = $q - $this.$dist | 0;
                while ($f < 0) {
                    $f = $f + $this.$s.$end | 0;
                }
                while ($this.$len0) {
                    if ($m)
                        $j = $q;
                    else {
                        var$2 = $this.$s;
                        $tindex = var$2.$end;
                        if ($q != $tindex)
                            $j = $q;
                        else {
                            $e = var$2.$read2;
                            if (!$e)
                                $j = $q;
                            else {
                                $j = 0;
                                $m = $j >= $e ? $tindex - $j | 0 : ($e - $j | 0) - 1 | 0;
                            }
                        }
                        if (!$m) {
                            var$2.$write2 = $j;
                            $r = cjj_InfBlocks_inflate_flush(var$2, $r);
                            var$2 = $this.$s;
                            $j = var$2.$write2;
                            $tindex = var$2.$read2;
                            $m = $j >= $tindex ? var$2.$end - $j | 0 : ($tindex - $j | 0) - 1 | 0;
                            $e = var$2.$end;
                            if ($j == $e && $tindex) {
                                $j = 0;
                                $m = $j >= $tindex ? $e - $j | 0 : ($tindex - $j | 0) - 1 | 0;
                            }
                            if (!$m)
                                break b;
                        }
                    }
                    var$2 = $this.$s;
                    var$11 = var$2.$window.data;
                    $q = $j + 1 | 0;
                    $tindex = $f + 1 | 0;
                    var$11[$j] = var$11[$f];
                    $m = $m + (-1) | 0;
                    $f = $tindex == var$2.$end ? 0 : $tindex;
                    $this.$len0 = $this.$len0 - 1 | 0;
                }
                $this.$mode2 = 0;
            }
            var$2.$bitb = var$5;
            var$2.$bitk = var$6;
            var$10 = $this.$z6;
            var$10.$avail_in = $n;
            var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
            var$10.$next_in_index = var$3;
            var$2.$write2 = $j;
            return cjj_InfBlocks_inflate_flush(var$2, $r);
        }
        var$2 = $this.$s;
        var$2.$bitb = var$5;
        var$2.$bitk = var$6;
        var$10 = $this.$z6;
        var$10.$avail_in = $n;
        var$10.$total_in = Long_add(var$10.$total_in, Long_fromInt(var$3 - var$10.$next_in_index | 0));
        var$10.$next_in_index = var$3;
        var$2.$write2 = $q;
        return cjj_InfBlocks_inflate_flush(var$2, 1);
    }
    function cjj_InfCodes_free($this, $z) {}
    function cjj_InfCodes_inflate_fast($this, $bl, $bd, $tl, $tl_index, $td, $td_index, $s, $z) {
        var $p, $n, $b, $k, $q, $r, $m, var$16, $ml, $md, var$19, $t, $tp_index_t_3, $d, var$23, $c;
        $p = $z.$next_in_index;
        $n = $z.$avail_in;
        $b = $s.$bitb;
        $k = $s.$bitk;
        $q = $s.$write2;
        $r = $s.$read2;
        $m = $q >= $r ? $s.$end - $q | 0 : ($r - $q | 0) - 1 | 0;
        var$16 = cjj_InfCodes_inflate_mask.data;
        $ml = var$16[$bl];
        $md = var$16[$bd];
        while (true) {
            if ($k < 20) {
                $n = $n + (-1) | 0;
                var$16 = $z.$next_in.data;
                $bl = $p + 1 | 0;
                $b = $b | (var$16[$p] & 255) << $k;
                $k = $k + 8 | 0;
                $p = $bl;
                continue;
            }
            a: {
                var$19 = $tl.data;
                $t = $b & $ml;
                $tp_index_t_3 = ($tl_index + $t | 0) * 3 | 0;
                $bd = var$19[$tp_index_t_3];
                if (!$bd) {
                    $bl = $tp_index_t_3 + 1 | 0;
                    $b = $b >> var$19[$bl];
                    $k = $k - var$19[$bl] | 0;
                    var$16 = $s.$window.data;
                    $d = $q + 1 | 0;
                    var$16[$q] = var$19[$tp_index_t_3 + 2 | 0] << 24 >> 24;
                    $m = $m + (-1) | 0;
                } else {
                    while (true) {
                        $bl = $tp_index_t_3 + 1 | 0;
                        $b = $b >> var$19[$bl];
                        $k = $k - var$19[$bl] | 0;
                        if ($bd & 16) {
                            $bd = $bd & 15;
                            $bl = var$19[$tp_index_t_3 + 2 | 0];
                            var$23 = cjj_InfCodes_inflate_mask.data;
                            $c = $bl + ($b & var$23[$bd]) | 0;
                            $bl = $b >> $bd;
                            $bd = $k - $bd | 0;
                            while ($bd < 15) {
                                $n = $n + (-1) | 0;
                                var$16 = $z.$next_in.data;
                                $r = $p + 1 | 0;
                                $bl = $bl | (var$16[$p] & 255) << $bd;
                                $bd = $bd + 8 | 0;
                                $p = $r;
                            }
                            var$16 = $td.data;
                            $r = $bl & $md;
                            $d = ($td_index + $r | 0) * 3 | 0;
                            $b = var$16[$d];
                            while (true) {
                                $k = $d + 1 | 0;
                                $bl = $bl >> var$16[$k];
                                $bd = $bd - var$16[$k] | 0;
                                if ($b & 16)
                                    break;
                                if ($b & 64) {
                                    $z.$msg = $rt_s(253);
                                    $tl_index = $z.$avail_in - $n | 0;
                                    $td_index = $bd >> 3;
                                    if ($td_index < $tl_index)
                                        $tl_index = $td_index;
                                    $td_index = $n + $tl_index | 0;
                                    $r = $p - $tl_index | 0;
                                    $bd = $bd - ($tl_index << 3) | 0;
                                    $s.$bitb = $bl;
                                    $s.$bitk = $bd;
                                    $z.$avail_in = $td_index;
                                    $z.$total_in = Long_add($z.$total_in, Long_fromInt($r - $z.$next_in_index | 0));
                                    $z.$next_in_index = $r;
                                    $s.$write2 = $q;
                                    return (-3);
                                }
                                $r = ($r + var$16[$d + 2 | 0] | 0) + ($bl & var$23[$b]) | 0;
                                $d = ($td_index + $r | 0) * 3 | 0;
                                $b = var$16[$d];
                            }
                            $r = $b & 15;
                            while ($bd < $r) {
                                $n = $n + (-1) | 0;
                                var$19 = $z.$next_in.data;
                                $b = $p + 1 | 0;
                                $bl = $bl | (var$19[$p] & 255) << $bd;
                                $bd = $bd + 8 | 0;
                                $p = $b;
                            }
                            $d = var$16[$d + 2 | 0] + ($bl & var$23[$r]) | 0;
                            $b = $bl >> $r;
                            $k = $bd - $r | 0;
                            $m = $m - $c | 0;
                            if ($q >= $d) {
                                $r = $q - $d | 0;
                                $bl = $q - $r | 0;
                                if ($bl > 0 && 2 > $bl) {
                                    var$16 = $s.$window.data;
                                    $bl = $q + 1 | 0;
                                    $bd = $r + 1 | 0;
                                    var$16[$q] = var$16[$r];
                                    $q = $bl + 1 | 0;
                                    $r = $bd + 1 | 0;
                                    var$16[$bl] = var$16[$bd];
                                    $c = $c + (-2) | 0;
                                } else {
                                    var$16 = $s.$window;
                                    jl_System_fastArraycopy(var$16, $r, var$16, $q, 2);
                                    $q = $q + 2 | 0;
                                    $r = $r + 2 | 0;
                                    $c = $c + (-2) | 0;
                                }
                            } else {
                                $r = $q - $d | 0;
                                while (true) {
                                    $bl = $s.$end;
                                    $r = $r + $bl | 0;
                                    if ($r >= 0)
                                        break;
                                }
                                $bl = $bl - $r | 0;
                                if ($c > $bl) {
                                    $c = $c - $bl | 0;
                                    $bd = $q - $r | 0;
                                    if ($bd > 0 && $bl > $bd) {
                                        $bd = $q;
                                        while (true) {
                                            var$16 = $s.$window.data;
                                            $q = $bd + 1 | 0;
                                            $d = $r + 1 | 0;
                                            var$16[$bd] = var$16[$r];
                                            $bl = $bl + (-1) | 0;
                                            if (!$bl)
                                                break;
                                            $bd = $q;
                                            $r = $d;
                                        }
                                    } else {
                                        var$16 = $s.$window;
                                        jl_System_fastArraycopy(var$16, $r, var$16, $q, $bl);
                                        $q = $q + $bl | 0;
                                    }
                                    $r = 0;
                                }
                            }
                            $bl = $q - $r | 0;
                            if ($bl > 0 && $c > $bl) {
                                while (true) {
                                    var$16 = $s.$window.data;
                                    $d = $q + 1 | 0;
                                    $bl = $r + 1 | 0;
                                    var$16[$q] = var$16[$r];
                                    $c = $c + (-1) | 0;
                                    if (!$c)
                                        break;
                                    $q = $d;
                                    $r = $bl;
                                }
                                break a;
                            }
                            var$16 = $s.$window;
                            jl_System_fastArraycopy(var$16, $r, var$16, $q, $c);
                            $d = $q + $c | 0;
                            break a;
                        }
                        if ($bd & 64) {
                            if ($bd & 32) {
                                $c = $z.$avail_in - $n | 0;
                                $bl = $k >> 3;
                                if ($bl < $c)
                                    $c = $bl;
                                $bl = $n + $c | 0;
                                $bd = $p - $c | 0;
                                $tl_index = $k - ($c << 3) | 0;
                                $s.$bitb = $b;
                                $s.$bitk = $tl_index;
                                $z.$avail_in = $bl;
                                $z.$total_in = Long_add($z.$total_in, Long_fromInt($bd - $z.$next_in_index | 0));
                                $z.$next_in_index = $bd;
                                $s.$write2 = $q;
                                return 1;
                            }
                            $z.$msg = $rt_s(254);
                            $c = $z.$avail_in - $n | 0;
                            $bl = $k >> 3;
                            if ($bl < $c)
                                $c = $bl;
                            $bl = $n + $c | 0;
                            $bd = $p - $c | 0;
                            $tl_index = $k - ($c << 3) | 0;
                            $s.$bitb = $b;
                            $s.$bitk = $tl_index;
                            $z.$avail_in = $bl;
                            $z.$total_in = Long_add($z.$total_in, Long_fromInt($bd - $z.$next_in_index | 0));
                            $z.$next_in_index = $bd;
                            $s.$write2 = $q;
                            return (-3);
                        }
                        $t = ($t + var$19[$tp_index_t_3 + 2 | 0] | 0) + ($b & cjj_InfCodes_inflate_mask.data[$bd]) | 0;
                        $tp_index_t_3 = ($tl_index + $t | 0) * 3 | 0;
                        $bd = var$19[$tp_index_t_3];
                        if (!$bd)
                            break;
                    }
                    $bl = $tp_index_t_3 + 1 | 0;
                    $b = $b >> var$19[$bl];
                    $k = $k - var$19[$bl] | 0;
                    var$16 = $s.$window.data;
                    $d = $q + 1 | 0;
                    var$16[$q] = var$19[$tp_index_t_3 + 2 | 0] << 24 >> 24;
                    $m = $m + (-1) | 0;
                }
            }
            if ($m < 258)
                break;
            if ($n < 10)
                break;
            $q = $d;
        }
        $c = $z.$avail_in - $n | 0;
        $bl = $k >> 3;
        if ($bl < $c)
            $c = $bl;
        $bl = $n + $c | 0;
        $bd = $p - $c | 0;
        $tl_index = $k - ($c << 3) | 0;
        $s.$bitb = $b;
        $s.$bitk = $tl_index;
        $z.$avail_in = $bl;
        $z.$total_in = Long_add($z.$total_in, Long_fromInt($bd - $z.$next_in_index | 0));
        $z.$next_in_index = $bd;
        $s.$write2 = $d;
        return 0;
    }
    function cjj_InfCodes__clinit_() {
        cjj_InfCodes_inflate_mask = $rt_createIntArrayFromData([0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535]);
    }
    var jnc_CoderMalfunctionError = $rt_classWithoutFields(jl_Error);
    function jnci_BufferedEncoder$Controller() {
        var a = this; jl_Object.call(a);
        a.$in0 = null;
        a.$out0 = null;
        a.$inPosition = 0;
        a.$outPosition = 0;
    }
    function jnci_BufferedEncoder$Controller_hasMoreOutput($this, $sz) {
        return jn_Buffer_remaining($this.$out0) < $sz ? 0 : 1;
    }
    function cjj_Inflate$Return() {
        var a = this; jl_Exception.call(a);
        a.$r0 = 0;
        a.$this$01 = null;
    }
    function cjj_Inflate$Return__init_(var_0, var_1) {
        var var_2 = new cjj_Inflate$Return();
        cjj_Inflate$Return__init_0(var_2, var_0, var_1);
        return var_2;
    }
    function cjj_Inflate$Return__init_0($this, var$1, $r) {
        $this.$this$01 = var$1;
        jl_Exception__init_($this);
        $this.$r0 = $r;
    }
    function cjj_GZIPHeader() {
        var a = this; jl_Object.call(a);
        a.$text = 0;
        a.$fhcrc = 0;
        a.$time = Long_ZERO;
        a.$xflags = 0;
        a.$os = 0;
        a.$extra = null;
        a.$name4 = null;
        a.$comment = null;
        a.$hcrc = 0;
        a.$crc1 = Long_ZERO;
        a.$done0 = 0;
        a.$mtime = Long_ZERO;
    }
    function cjj_GZIPHeader__init_() {
        var var_0 = new cjj_GZIPHeader();
        cjj_GZIPHeader__init_0(var_0);
        return var_0;
    }
    function cjj_GZIPHeader__init_0($this) {
        $this.$text = 0;
        $this.$fhcrc = 0;
        $this.$os = 255;
        $this.$done0 = 0;
        $this.$mtime = Long_ZERO;
    }
    function cjj_GZIPHeader_setCRC($this, $crc) {
        $this.$crc1 = $crc;
    }
    function cjj_GZIPHeader_put($this, $d) {
        var $flag, $xfl, var$4, var$5;
        $flag = 0;
        if ($this.$text)
            $flag = 1;
        if ($this.$fhcrc)
            $flag = $flag | 2;
        if ($this.$extra !== null)
            $flag = $flag | 4;
        if ($this.$name4 !== null)
            $flag = $flag | 8;
        if ($this.$comment !== null)
            $flag = $flag | 16;
        $xfl = 0;
        var$4 = $d.$level3;
        if (var$4 == 1)
            $xfl = 4;
        else if (var$4 == 9)
            $xfl = 2;
        cjj_Deflate_put_short($d, (-29921));
        cjj_Deflate_put_byte0($d, 8);
        cjj_Deflate_put_byte0($d, $flag << 24 >> 24);
        cjj_Deflate_put_byte0($d, Long_lo($this.$mtime) << 24 >> 24);
        cjj_Deflate_put_byte0($d, Long_lo(Long_shr($this.$mtime, 8)) << 24 >> 24);
        cjj_Deflate_put_byte0($d, Long_lo(Long_shr($this.$mtime, 16)) << 24 >> 24);
        cjj_Deflate_put_byte0($d, Long_lo(Long_shr($this.$mtime, 24)) << 24 >> 24);
        cjj_Deflate_put_byte0($d, $xfl << 24 >> 24);
        cjj_Deflate_put_byte0($d, $this.$os << 24 >> 24);
        var$5 = $this.$extra;
        if (var$5 !== null) {
            cjj_Deflate_put_byte0($d, var$5.data.length << 24 >> 24);
            cjj_Deflate_put_byte0($d, $this.$extra.data.length >> 8 << 24 >> 24);
            var$5 = $this.$extra;
            cjj_Deflate_put_byte($d, var$5, 0, var$5.data.length);
        }
        var$5 = $this.$name4;
        if (var$5 !== null) {
            cjj_Deflate_put_byte($d, var$5, 0, var$5.data.length);
            cjj_Deflate_put_byte0($d, 0);
        }
        var$5 = $this.$comment;
        if (var$5 !== null) {
            cjj_Deflate_put_byte($d, var$5, 0, var$5.data.length);
            cjj_Deflate_put_byte0($d, 0);
        }
    }
    function cjj_StaticTree() {
        var a = this; jl_Object.call(a);
        a.$static_tree = null;
        a.$extra_bits = null;
        a.$extra_base = 0;
        a.$elems = 0;
        a.$max_length = 0;
    }
    var cjj_StaticTree_static_ltree = null;
    var cjj_StaticTree_static_dtree = null;
    var cjj_StaticTree_static_l_desc = null;
    var cjj_StaticTree_static_d_desc = null;
    var cjj_StaticTree_static_bl_desc = null;
    function cjj_StaticTree_$callClinit() {
        cjj_StaticTree_$callClinit = $rt_eraseClinit(cjj_StaticTree);
        cjj_StaticTree__clinit_();
    }
    function cjj_StaticTree__init_(var_0, var_1, var_2, var_3, var_4) {
        var var_5 = new cjj_StaticTree();
        cjj_StaticTree__init_0(var_5, var_0, var_1, var_2, var_3, var_4);
        return var_5;
    }
    function cjj_StaticTree__init_0($this, $static_tree, $extra_bits, $extra_base, $elems, $max_length) {
        cjj_StaticTree_$callClinit();
        $this.$static_tree = $static_tree;
        $this.$extra_bits = $extra_bits;
        $this.$extra_base = $extra_base;
        $this.$elems = $elems;
        $this.$max_length = $max_length;
    }
    function cjj_StaticTree__clinit_() {
        var var$1;
        var$1 = $rt_createShortArrayFromData([12, 8, 140, 8, 76, 8, 204, 8, 44, 8, 172, 8, 108, 8, 236, 8, 28, 8, 156, 8, 92, 8, 220, 8, 60, 8, 188, 8, 124, 8, 252, 8, 2, 8, 130, 8, 66, 8, 194, 8, 34, 8, 162, 8, 98, 8, 226, 8, 18, 8, 146, 8, 82, 8, 210, 8, 50, 8, 178, 8, 114, 8, 242, 8, 10, 8, 138, 8, 74, 8, 202, 8, 42, 8, 170, 8, 106, 8, 234, 8, 26, 8, 154, 8, 90, 8, 218, 8, 58, 8, 186, 8, 122, 8, 250, 8, 6, 8, 134, 8, 70, 8, 198, 8, 38, 8, 166, 8, 102, 8, 230, 8, 22, 8, 150, 8, 86, 8, 214, 8, 54, 8, 182, 8,
        118, 8, 246, 8, 14, 8, 142, 8, 78, 8, 206, 8, 46, 8, 174, 8, 110, 8, 238, 8, 30, 8, 158, 8, 94, 8, 222, 8, 62, 8, 190, 8, 126, 8, 254, 8, 1, 8, 129, 8, 65, 8, 193, 8, 33, 8, 161, 8, 97, 8, 225, 8, 17, 8, 145, 8, 81, 8, 209, 8, 49, 8, 177, 8, 113, 8, 241, 8, 9, 8, 137, 8, 73, 8, 201, 8, 41, 8, 169, 8, 105, 8, 233, 8, 25, 8, 153, 8, 89, 8, 217, 8, 57, 8, 185, 8, 121, 8, 249, 8, 5, 8, 133, 8, 69, 8, 197, 8, 37, 8, 165, 8, 101, 8, 229, 8, 21, 8, 149, 8, 85, 8, 213, 8, 53, 8, 181, 8, 117, 8, 245, 8, 13, 8,
        141, 8, 77, 8, 205, 8, 45, 8, 173, 8, 109, 8, 237, 8, 29, 8, 157, 8, 93, 8, 221, 8, 61, 8, 189, 8, 125, 8, 253, 8, 19, 9, 275, 9, 147, 9, 403, 9, 83, 9, 339, 9, 211, 9, 467, 9, 51, 9, 307, 9, 179, 9, 435, 9, 115, 9, 371, 9, 243, 9, 499, 9, 11, 9, 267, 9, 139, 9, 395, 9, 75, 9, 331, 9, 203, 9, 459, 9, 43, 9, 299, 9, 171, 9, 427, 9, 107, 9, 363, 9, 235, 9, 491, 9, 27, 9, 283, 9, 155, 9, 411, 9, 91, 9, 347, 9, 219, 9, 475, 9, 59, 9, 315, 9, 187, 9, 443, 9, 123, 9, 379, 9, 251, 9, 507, 9, 7, 9, 263, 9, 135,
        9, 391, 9, 71, 9, 327, 9, 199, 9, 455, 9, 39, 9, 295, 9, 167, 9, 423, 9, 103, 9, 359, 9, 231, 9, 487, 9, 23, 9, 279, 9, 151, 9, 407, 9, 87, 9, 343, 9, 215, 9, 471, 9, 55, 9, 311, 9, 183, 9, 439, 9, 119, 9, 375, 9, 247, 9, 503, 9, 15, 9, 271, 9, 143, 9, 399, 9, 79, 9, 335, 9, 207, 9, 463, 9, 47, 9, 303, 9, 175, 9, 431, 9, 111, 9, 367, 9, 239, 9, 495, 9, 31, 9, 287, 9, 159, 9, 415, 9, 95, 9, 351, 9, 223, 9, 479, 9, 63, 9, 319, 9, 191, 9, 447, 9, 127, 9, 383, 9, 255, 9, 511, 9, 0, 7, 64, 7, 32, 7, 96, 7,
        16, 7, 80, 7, 48, 7, 112, 7, 8, 7, 72, 7, 40, 7, 104, 7, 24, 7, 88, 7, 56, 7, 120, 7, 4, 7, 68, 7, 36, 7, 100, 7, 20, 7, 84, 7, 52, 7, 116, 7, 3, 8, 131, 8, 67, 8, 195, 8, 35, 8, 163, 8, 99, 8, 227, 8]);
        cjj_StaticTree_static_ltree = var$1;
        cjj_StaticTree_static_dtree = $rt_createShortArrayFromData([0, 5, 16, 5, 8, 5, 24, 5, 4, 5, 20, 5, 12, 5, 28, 5, 2, 5, 18, 5, 10, 5, 26, 5, 6, 5, 22, 5, 14, 5, 30, 5, 1, 5, 17, 5, 9, 5, 25, 5, 5, 5, 21, 5, 13, 5, 29, 5, 3, 5, 19, 5, 11, 5, 27, 5, 7, 5, 23, 5]);
        cjj_StaticTree_static_l_desc = cjj_StaticTree__init_(var$1, cjj_Tree_extra_lbits, 257, 286, 15);
        cjj_StaticTree_static_d_desc = cjj_StaticTree__init_(cjj_StaticTree_static_dtree, cjj_Tree_extra_dbits, 0, 30, 15);
        cjj_StaticTree_static_bl_desc = cjj_StaticTree__init_(null, cjj_Tree_extra_blbits, 0, 19, 7);
    }
    function ji_ByteArrayOutputStream() {
        var a = this; ji_OutputStream.call(a);
        a.$buf2 = null;
        a.$count2 = 0;
    }
    function ji_ByteArrayOutputStream__init_() {
        var var_0 = new ji_ByteArrayOutputStream();
        ji_ByteArrayOutputStream__init_0(var_0);
        return var_0;
    }
    function ji_ByteArrayOutputStream__init_0($this) {
        $this.$buf2 = $rt_createByteArray(32);
    }
    function ji_ByteArrayOutputStream_write($this, $b, $off, $len) {
        var $i, var$5, var$6, var$7, var$8;
        $i = $this.$count2 + $len | 0;
        var$5 = $this.$buf2.data.length;
        if (var$5 < $i) {
            var$6 = jl_Math_max($i, (var$5 * 3 | 0) / 2 | 0);
            $this.$buf2 = ju_Arrays_copyOf0($this.$buf2, var$6);
        }
        $i = 0;
        while ($i < $len) {
            var$7 = $b.data;
            var$8 = $this.$buf2.data;
            var$6 = $this.$count2;
            $this.$count2 = var$6 + 1 | 0;
            var$5 = $off + 1 | 0;
            var$8[var$6] = var$7[$off];
            $i = $i + 1 | 0;
            $off = var$5;
        }
    }
    function ji_ByteArrayOutputStream_toByteArray($this) {
        return ju_Arrays_copyOf0($this.$buf2, $this.$count2);
    }
    function otrfm_InMemoryVirtualFile() {
        var a = this; otrfm_AbstractInMemoryVirtualFile.call(a);
        a.$data = null;
        a.$size2 = 0;
    }
    function otrfm_InMemoryVirtualFile_isDirectory($this) {
        return 0;
    }
    function otrfm_InMemoryVirtualFile_isFile($this) {
        return 1;
    }
    function otrfm_InMemoryVirtualFile_getChildFile($this, $fileName) {
        $fileName = new jl_UnsupportedOperationException;
        jl_Exception__init_($fileName);
        $rt_throw($fileName);
    }
    function otrfm_InMemoryVirtualFile_createAccessor($this, $readable, $writable, $append) {
        var var$4;
        if ($this.$parent0 === null)
            return null;
        if ($writable && $this.$readOnly4)
            return null;
        var$4 = new otrfm_InMemoryVirtualFile$1;
        var$4.$this$02 = $this;
        var$4.$val$append = $append;
        var$4.$val$writable = $writable;
        if ($append)
            var$4.$pos0 = $this.$size2;
        else if ($writable)
            $this.$size2 = 0;
        return var$4;
    }
    function otrfm_InMemoryVirtualFile_createFile($this, $fileName) {
        var var$2, var$3;
        var$2 = new ji_IOException;
        var$3 = jl_StringBuilder__init_();
        jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(255)), $fileName), $rt_s(256));
        jl_Throwable__init_(var$2, jl_StringBuilder_toString(var$3));
        $rt_throw(var$2);
    }
    function jl_Object$Monitor() {
        var a = this; jl_Object.call(a);
        a.$enteringThreads = null;
        a.$notifyListeners = null;
        a.$owner = null;
        a.$count = 0;
    }
    var jl_IllegalMonitorStateException = $rt_classWithoutFields(jl_RuntimeException);
    var otp_PlatformQueue = $rt_classWithoutFields();
    function otp_PlatformQueue_isEmpty$static($this) {
        return $this.length ? 0 : 1;
    }
    function jl_Object$monitorExit$lambda$_8_0() {
        jl_Object.call(this);
        this.$_00 = null;
    }
    function jl_Object$monitorExit$lambda$_8_0_run(var$0) {
        var var$1, var$2, var$3, var$4;
        var$1 = var$0.$_00;
        if (!jl_Object_isEmptyMonitor(var$1)) {
            var$2 = var$1.$monitor;
            if (var$2.$owner === null) {
                var$1 = var$2.$enteringThreads;
                if (var$1 !== null && !otp_PlatformQueue_isEmpty$static(var$1)) {
                    var$1 = var$2.$enteringThreads.shift();
                    otji_JSWrapper_$callClinit();
                    if (var$1 !== null && !(var$1 instanceof $rt_objcls()))
                        var$1 = otji_JSWrapper_wrap(var$1);
                    var$3 = var$1;
                    var$2.$enteringThreads = null;
                    var$1 = var$3.$_0;
                    var$2 = var$3.$_1;
                    var$4 = var$3.$_2;
                    var$3 = var$3.$_3;
                    jl_Thread_setCurrentThread(var$1);
                    var$2 = var$2.$monitor;
                    var$2.$owner = var$1;
                    var$2.$count = var$2.$count + var$4 | 0;
                    otpp_AsyncCallbackWrapper_complete(var$3, null);
                }
            }
        }
    }
    function jl_Object$monitorEnterWait$lambda$_6_0() {
        var a = this; jl_Object.call(a);
        a.$_0 = null;
        a.$_1 = null;
        a.$_2 = 0;
        a.$_3 = null;
    }
    var otrf_VirtualFileAccessor = $rt_classWithoutFields(0);
    function otrfm_InMemoryVirtualFile$1() {
        var a = this; jl_Object.call(a);
        a.$pos0 = 0;
        a.$val$append = 0;
        a.$val$writable = 0;
        a.$this$02 = null;
    }
    function otrfm_InMemoryVirtualFile$1_read($this, $buffer, $offset, $limit) {
        $limit = jl_Math_max(0, jl_Math_min($this.$this$02.$size2 - $this.$pos0 | 0, $limit));
        if ($limit > 0) {
            jl_System_fastArraycopy($this.$this$02.$data, $this.$pos0, $buffer, $offset, $limit);
            $this.$pos0 = $this.$pos0 + $limit | 0;
        }
        return $limit;
    }
    function otrfm_InMemoryVirtualFile$1_write($this, $buffer, $offset, $limit) {
        var var$4, var$5, var$6;
        var$4 = $this.$this$02;
        var$5 = $this.$pos0 + $limit | 0;
        var$6 = var$4.$data.data.length;
        if (var$5 > var$6) {
            var$5 = (jl_Math_max(var$5, var$6) * 3 | 0) / 2 | 0;
            var$4.$data = ju_Arrays_copyOf0(var$4.$data, var$5);
        }
        jl_System_fastArraycopy($buffer, $offset, $this.$this$02.$data, $this.$pos0, $limit);
        $offset = $this.$pos0 + $limit | 0;
        $this.$pos0 = $offset;
        var$4 = $this.$this$02;
        if ($offset > var$4.$size2)
            var$4.$size2 = $offset;
        otrfm_AbstractInMemoryVirtualFile_modify(var$4);
    }
    $rt_packages([-1, "com", 0, "jcraft", 1, "jzlib", 0, "mojang", 3, "rubydung", -1, "java", 5, "util", 6, "zip", 5, "nio", 8, "charset", 5, "io", 5, "lang", -1, "org", 12, "lwjgl"
    ]);
    $rt_metadata([jl_Object, "Object", 11, 0, [], 0, 3, 0, 0, 0,
    cdmC_Client, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 0, 3, 0, 0, 0,
    otji_JS, 0, jl_Object, [], 4, 0, 0, 0, 0,
    otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, 0,
    jl_RuntimeException, "RuntimeException", 11, jl_Exception, [], 0, 3, 0, 0, 0,
    jl_ClassCastException, "ClassCastException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, jl_String_$callClinit, ["$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode0", $rt_wrapFunction0(jl_String_hashCode)],
    jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0, 0,
    jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0, 0,
    jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
    jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
    jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0, ["$hashCode0", $rt_wrapFunction0(jl_Integer_hashCode), "$equals", $rt_wrapFunction1(jl_Integer_equals)],
    jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, 0,
    jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, 0,
    jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0, 0,
    jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, 0,
    jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0, 0,
    jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    cmr_RubyDung, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, 0,
    jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
    otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
    cmr_Timer, 0, jl_Object, [], 0, 3, 0, 0, 0,
    ol_BufferUtils, 0, jl_Object, [], 0, 3, 0, 0, 0,
    ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_String$_clinit_$lambda$_93_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, 0,
    jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_NullPointerException, "NullPointerException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    jl_ArrayStoreException, "ArrayStoreException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, 0, 0,
    otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otjb_Performance, 0, jl_Object, [otj_JSObject], 4, 3, 0, 0, 0,
    jn_Buffer, 0, jl_Object, [], 1, 3, 0, 0, 0,
    jn_ByteBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0, 0,
    jn_ByteOrder, 0, jl_Object, [], 4, 3, 0, jn_ByteOrder_$callClinit, 0,
    otjt_ArrayBuffer, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otjt_ArrayBufferView, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otjt_Int16Array, 0, otjt_ArrayBufferView, [], 1, 3, 0, 0, 0,
    otjt_Int8Array, 0, otjt_ArrayBufferView, [], 1, 3, 0, 0, 0,
    jn_ByteBufferImpl, 0, jn_ByteBuffer, [], 0, 0, 0, 0, 0,
    jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 11, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, 0]);
    $rt_metadata([olo_Display, 0, jl_Object, [], 0, 3, 0, olo_Display_$callClinit, 0,
    oli_Keyboard, 0, jl_Object, [], 0, 3, 0, oli_Keyboard_$callClinit, 0,
    cmrl_Chunk, 0, jl_Object, [], 0, 3, 0, cmrl_Chunk_$callClinit, 0,
    oli_Mouse, 0, jl_Object, [], 0, 3, 0, 0, 0,
    cmr_HitResult, 0, jl_Object, [], 0, 3, 0, 0, 0,
    m_GLEnums, 0, jl_Object, [], 0, 3, 0, 0, 0,
    olo_GL11, 0, m_GLEnums, [], 0, 3, 0, olo_GL11_$callClinit, 0,
    olo_DisplayMode, 0, jl_Object, [], 0, 3, 0, 0, 0,
    otjde_EventListener, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
    olo_Display$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(olo_Display$1_handleEvent$exported$0)],
    olo_Display$2, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(olo_Display$2_handleEvent$exported$0)],
    olo_Display$3, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(olo_Display$3_handleEvent$exported$0)],
    m_WebGL, 0, jl_Object, [], 0, 3, 0, 0, 0,
    cmr_Player, 0, jl_Object, [], 0, 3, 0, 0, 0,
    ju_Objects, 0, jl_Object, [], 4, 3, 0, 0, 0,
    otji_JSWrapper, 0, jl_Object, [], 4, 3, 0, otji_JSWrapper_$callClinit, 0,
    cmrl_Level, 0, jl_Object, [], 0, 3, 0, 0, 0,
    olug_GLU, 0, jl_Object, [], 0, 3, 0, 0, 0,
    cmrl_LevelListener, 0, jl_Object, [], 3, 3, 0, 0, 0,
    cmrl_LevelRenderer, 0, jl_Object, [cmrl_LevelListener], 0, 3, 0, 0, 0,
    ju_Map, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0, 0,
    jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray)],
    jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
    ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, 0,
    ju_SequencedCollection, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
    ju_List, 0, jl_Object, [ju_SequencedCollection], 3, 3, 0, 0, 0,
    ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, 0,
    ju_AbstractSequentialList, 0, ju_AbstractList, [], 1, 3, 0, 0, 0,
    ju_Queue, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
    ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 3, 3, 0, 0, 0,
    ju_LinkedList, 0, ju_AbstractSequentialList, [ju_Deque], 0, 3, 0, 0, 0,
    cmr_Textures, "Textures", 4, jl_Object, [], 0, 3, 0, 0, 0,
    cmrl_Tessellator, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jn_IntBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0, 0,
    otjt_Int32Array, 0, otjt_ArrayBufferView, [], 1, 3, 0, 0, 0,
    oluv_Matrix, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
    oluv_Matrix4f, 0, oluv_Matrix, [ji_Serializable], 0, 3, 0, 0, 0,
    otjt_Uint8Array, 0, otjt_ArrayBufferView, [], 1, 3, 0, 0, 0,
    otjt_Float32Array, 0, otjt_ArrayBufferView, [], 1, 3, 0, 0, 0,
    oluv_ReadableVector, 0, jl_Object, [], 3, 3, 0, 0, 0,
    oluv_Vector, 0, jl_Object, [ji_Serializable, oluv_ReadableVector], 1, 3, 0, 0, 0,
    oluv_ReadableVector2f, 0, jl_Object, [oluv_ReadableVector], 3, 3, 0, 0, 0,
    oluv_ReadableVector3f, 0, jl_Object, [oluv_ReadableVector2f], 3, 3, 0, 0, 0,
    oluv_WritableVector2f, 0, jl_Object, [], 3, 3, 0, 0, 0,
    oluv_WritableVector3f, 0, jl_Object, [oluv_WritableVector2f], 3, 3, 0, 0, 0,
    oluv_Vector3f, 0, oluv_Vector, [ji_Serializable, oluv_ReadableVector3f, oluv_WritableVector3f], 0, 3, 0, 0, 0,
    oluv_ReadableVector4f, 0, jl_Object, [oluv_ReadableVector3f], 3, 3, 0, 0, 0]);
    $rt_metadata([oluv_WritableVector4f, 0, jl_Object, [oluv_WritableVector3f], 3, 3, 0, 0, 0,
    oluv_Vector4f, 0, oluv_Vector, [ji_Serializable, oluv_ReadableVector4f, oluv_WritableVector4f], 0, 3, 0, 0, 0,
    olug_Util, 0, jl_Object, [], 0, 3, 0, 0, 0,
    olug_Project, 0, olug_Util, [], 0, 3, 0, olug_Project_$callClinit, 0,
    m_FramebufferGL, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, 0, jl_Thread_$callClinit, 0,
    jl_InterruptedException, 0, jl_Exception, [], 0, 3, 0, 0, 0,
    otjc_JSWeakMap, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otjc_JSWeakRef, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otjc_JSMap, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otjc_JSFinalizationRegistryConsumer, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
    otji_JSWrapper$_clinit_$lambda$_30_0, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, ["$accept$exported$0", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_0_accept$exported$0)],
    otjc_JSFinalizationRegistry, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    otji_JSWrapper$_clinit_$lambda$_30_1, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, ["$accept$exported$0", $rt_wrapFunction1(otji_JSWrapper$_clinit_$lambda$_30_1_accept$exported$0)],
    otjc_JSObjects, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
    olo_GL11$DisplayList, 0, jl_Object, [], 0, 0, 0, 0, 0,
    olo_GL11$MatrixMode, 0, jl_Object, [], 0, 0, 0, 0, 0,
    jl_IllegalArgumentException, "IllegalArgumentException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    m_TextureGL, 0, jl_Object, [], 4, 3, 0, 0, 0,
    ji_IOException, "IOException", 10, jl_Exception, [], 0, 3, 0, 0, 0,
    m_RenderbufferGL, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 0, 3, 0, 0, 0,
    oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, 0, ["$complete", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_complete), "$error", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_error)],
    otp_PlatformRunnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otr_EventQueue$Event, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_ThreadInterruptHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jl_Thread$SleepHandler, 0, jl_Object, [otp_PlatformRunnable, otr_EventQueue$Event, jl_ThreadInterruptHandler], 0, 0, 0, 0, ["$run", $rt_wrapFunction0(jl_Thread$SleepHandler_run)],
    jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ji_Closeable, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0, 0,
    ji_InputStream, 0, jl_Object, [ji_Closeable], 1, 3, 0, 0, ["$read", $rt_wrapFunction1(ji_InputStream_read)],
    ji_Flushable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ji_OutputStream, 0, jl_Object, [ji_Closeable, ji_Flushable], 1, 3, 0, 0, ["$close", $rt_wrapFunction0(ji_OutputStream_close), "$flush", $rt_wrapFunction0(ji_OutputStream_flush)],
    ji_FilterOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, 0,
    ji_PrintStream, 0, ji_FilterOutputStream, [], 0, 3, 0, 0, 0,
    otcic_ConsoleOutputStream, 0, ji_OutputStream, [], 1, 3, 0, 0, ["$write1", $rt_wrapFunction1(otcic_ConsoleOutputStream_write)],
    otcic_StderrOutputStream, 0, otcic_ConsoleOutputStream, [], 0, 3, 0, 0, ["$write0", $rt_wrapFunction3(otcic_StderrOutputStream_write)],
    jn_FloatBuffer, 0, jn_Buffer, [jl_Comparable], 1, 3, 0, 0, 0,
    jnc_Charset, 0, jl_Object, [jl_Comparable], 1, 3, 0, 0, 0,
    jnci_UTF8Charset, 0, jnc_Charset, [], 0, 3, 0, jnci_UTF8Charset_$callClinit, 0,
    jnc_IllegalCharsetNameException, "IllegalCharsetNameException", 9, jl_IllegalArgumentException, [], 0, 3, 0, 0, 0,
    jl_CloneNotSupportedException, "CloneNotSupportedException", 11, jl_Exception, [], 0, 3, 0, 0, 0,
    jn_FloatBufferImpl, 0, jn_FloatBuffer, [], 1, 0, 0, 0, 0,
    jn_FloatBufferOverByteBuffer, 0, jn_FloatBufferImpl, [], 1, 0, 0, 0, 0,
    jn_FloatBufferOverByteBufferLittleEndian, 0, jn_FloatBufferOverByteBuffer, [], 0, 0, 0, 0, ["$getElement", $rt_wrapFunction1(jn_FloatBufferOverByteBufferLittleEndian_getElement), "$putElement", $rt_wrapFunction2(jn_FloatBufferOverByteBufferLittleEndian_putElement)],
    jn_FloatBufferOverByteBufferBigEndian, 0, jn_FloatBufferOverByteBuffer, [], 0, 0, 0, 0, ["$getElement", $rt_wrapFunction1(jn_FloatBufferOverByteBufferBigEndian_getElement), "$putElement", $rt_wrapFunction2(jn_FloatBufferOverByteBufferBigEndian_putElement)],
    jn_IntBufferImpl, 0, jn_IntBuffer, [], 1, 0, 0, 0, 0,
    jn_IntBufferOverByteBuffer, 0, jn_IntBufferImpl, [], 1, 0, 0, 0, 0]);
    $rt_metadata([jn_IntBufferOverByteBufferLittleEndian, 0, jn_IntBufferOverByteBuffer, [], 0, 0, 0, 0, ["$getElement0", $rt_wrapFunction1(jn_IntBufferOverByteBufferLittleEndian_getElement)],
    jn_IntBufferOverByteBufferBigEndian, 0, jn_IntBufferOverByteBuffer, [], 0, 0, 0, 0, ["$getElement0", $rt_wrapFunction1(jn_IntBufferOverByteBufferBigEndian_getElement)],
    jn_BufferUnderflowException, "BufferUnderflowException", 8, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, 0,
    ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0, 0,
    ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
    oli_Keyboard$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Keyboard$1_handleEvent$exported$0)],
    oli_Keyboard$2, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Keyboard$2_handleEvent$exported$0)],
    oli_Keyboard$3, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Keyboard$3_handleEvent$exported$0)],
    ol_LWJGLException, "LWJGLException", 13, jl_Exception, [], 0, 3, 0, 0, 0,
    oli_Mouse$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Mouse$1_handleEvent$exported$0)],
    oli_Mouse$2, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Mouse$2_handleEvent$exported$0)],
    oli_Mouse$3, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Mouse$3_handleEvent$exported$0)],
    oli_Mouse$4, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Mouse$4_handleEvent$exported$0)],
    oli_Mouse$5, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Mouse$5_handleEvent$exported$0)],
    oli_Mouse$6, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Mouse$6_handleEvent$exported$0)],
    oli_Mouse$7, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Mouse$7_handleEvent$exported$0)],
    oli_Mouse$8, 0, jl_Object, [otjde_EventListener], 0, 0, 0, 0, ["$handleEvent$exported$0", $rt_wrapFunction1(oli_Mouse$8_handleEvent$exported$0)],
    ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, 0,
    jl_ClassLoader, 0, jl_Object, [], 1, 3, 0, jl_ClassLoader_$callClinit, 0,
    jl_Readable, 0, jl_Object, [], 3, 3, 0, 0, 0,
    jn_CharBuffer, 0, jn_Buffer, [jl_Comparable, jl_Appendable, jl_CharSequence, jl_Readable], 1, 3, 0, 0, 0,
    jnc_CodingErrorAction, 0, jl_Object, [], 0, 3, 0, jnc_CodingErrorAction_$callClinit, 0,
    cmrp_AABB, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jl_NegativeArraySizeException, "NegativeArraySizeException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    jn_CharBufferImpl, 0, jn_CharBuffer, [], 1, 0, 0, 0, 0,
    jn_CharBufferOverArray, 0, jn_CharBufferImpl, [], 0, 0, 0, 0, 0,
    jnc_CharsetEncoder, 0, jl_Object, [], 1, 3, 0, 0, 0,
    jnc_CoderResult, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jl_SystemClassLoader, 0, jl_ClassLoader, [], 0, 0, 0, 0, 0,
    jl_UnsupportedOperationException, "UnsupportedOperationException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    jn_ReadOnlyBufferException, "ReadOnlyBufferException", 8, jl_UnsupportedOperationException, [], 0, 3, 0, 0, 0,
    ji_DataOutput, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ji_DataOutputStream, 0, ji_FilterOutputStream, [ji_DataOutput], 0, 3, 0, 0, ["$write0", $rt_wrapFunction3(ji_DataOutputStream_write)],
    juz_DeflaterOutputStream, 0, ji_FilterOutputStream, [], 0, 3, 0, 0, ["$close", $rt_wrapFunction0(juz_DeflaterOutputStream_close), "$write1", $rt_wrapFunction1(juz_DeflaterOutputStream_write)],
    juz_GZIPOutputStream, 0, juz_DeflaterOutputStream, [], 0, 3, 0, 0, ["$flush", $rt_wrapFunction0(juz_GZIPOutputStream_flush), "$write0", $rt_wrapFunction3(juz_GZIPOutputStream_write)],
    ji_FileOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, ["$write0", $rt_wrapFunction3(ji_FileOutputStream_write), "$flush", $rt_wrapFunction0(ji_FileOutputStream_flush), "$close", $rt_wrapFunction0(ji_FileOutputStream_close), "$write1", $rt_wrapFunction1(ji_FileOutputStream_write0)],
    cmrl_Frustum, 0, jl_Object, [], 0, 3, 0, cmrl_Frustum_$callClinit, 0,
    cmrl_Tile, 0, jl_Object, [], 0, 3, 0, 0, 0,
    jn_BufferOverflowException, "BufferOverflowException", 8, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ju_ListIterator, 0, jl_Object, [ju_Iterator], 3, 3, 0, 0, 0,
    ju_LinkedList$SequentialListIterator, 0, jl_Object, [ju_ListIterator], 0, 0, 0, 0, 0,
    ju_LinkedList$Entry, 0, jl_Object, [], 0, 0, 0, 0, 0,
    ji_FilterInputStream, 0, ji_InputStream, [], 0, 3, 0, 0, ["$read", $rt_wrapFunction1(ji_FilterInputStream_read)],
    ji_DataInput, 0, jl_Object, [], 3, 3, 0, 0, 0,
    ji_DataInputStream, 0, ji_FilterInputStream, [ji_DataInput], 0, 3, 0, 0, 0,
    juz_InflaterInputStream, 0, ji_FilterInputStream, [], 0, 3, 0, 0, ["$read1", $rt_wrapFunction0(juz_InflaterInputStream_read)]]);
    $rt_metadata([juz_GZIPInputStream, 0, juz_InflaterInputStream, [], 0, 3, 0, 0, ["$close", $rt_wrapFunction0(juz_GZIPInputStream_close), "$read0", $rt_wrapFunction3(juz_GZIPInputStream_read)],
    ji_FileInputStream, 0, ji_InputStream, [], 0, 3, 0, 0, ["$read0", $rt_wrapFunction3(ji_FileInputStream_read), "$close", $rt_wrapFunction0(ji_FileInputStream_close), "$read1", $rt_wrapFunction0(ji_FileInputStream_read0)],
    jnci_BufferedEncoder, 0, jnc_CharsetEncoder, [], 1, 3, 0, 0, 0,
    jnci_UTF8Encoder, 0, jnci_BufferedEncoder, [], 0, 3, 0, 0, 0,
    ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, 0,
    ji_File, 0, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, ji_File_$callClinit, 0,
    juz_Deflater, 0, jl_Object, [], 0, 3, 0, 0, 0,
    juz_Checksum, 0, jl_Object, [], 3, 3, 0, 0, 0,
    juz_CRC32, 0, jl_Object, [juz_Checksum], 0, 3, 0, 0, 0,
    ji_FileNotFoundException, "FileNotFoundException", 10, ji_IOException, [], 0, 3, 0, 0, 0,
    juz_Inflater, 0, jl_Object, [], 0, 3, 0, 0, 0,
    ji_EOFException, "EOFException", 10, ji_IOException, [], 0, 3, 0, 0, 0,
    cjj_ZStream, 0, jl_Object, [], 128, 3, 0, 0, 0,
    cjj_Deflater, 0, cjj_ZStream, [], 4, 3, 0, 0, 0,
    cjj_GZIPException, "GZIPException", 2, ji_IOException, [], 0, 3, 0, 0, 0,
    cjj_Checksum, 0, jl_Object, [], 3, 0, 0, 0, 0,
    cjj_CRC32, 0, jl_Object, [cjj_Checksum], 4, 3, 0, 0, ["$update1", $rt_wrapFunction3(cjj_CRC32_update), "$reset", $rt_wrapFunction0(cjj_CRC32_reset), "$reset0", $rt_wrapFunction1(cjj_CRC32_reset0), "$getValue", $rt_wrapFunction0(cjj_CRC32_getValue)],
    cjj_Inflater, 0, cjj_ZStream, [], 4, 3, 0, 0, 0,
    otrf_VirtualFileSystemProvider, 0, jl_Object, [], 4, 3, 0, 0, 0,
    otrf_VirtualFileSystem, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otrfm_InMemoryVirtualFileSystem, 0, jl_Object, [otrf_VirtualFileSystem], 0, 3, 0, 0, 0,
    cjj_Adler32, 0, jl_Object, [cjj_Checksum], 4, 3, 0, 0, ["$reset0", $rt_wrapFunction1(cjj_Adler32_reset), "$reset", $rt_wrapFunction0(cjj_Adler32_reset0), "$getValue", $rt_wrapFunction0(cjj_Adler32_getValue), "$update1", $rt_wrapFunction3(cjj_Adler32_update)],
    otrfm_AbstractInMemoryVirtualFile, 0, jl_Object, [], 1, 3, 0, 0, 0,
    otrfm_InMemoryVirtualDirectory, 0, otrfm_AbstractInMemoryVirtualFile, [], 0, 3, 0, 0, ["$isDirectory", $rt_wrapFunction0(otrfm_InMemoryVirtualDirectory_isDirectory), "$isFile", $rt_wrapFunction0(otrfm_InMemoryVirtualDirectory_isFile), "$getChildFile", $rt_wrapFunction1(otrfm_InMemoryVirtualDirectory_getChildFile), "$createAccessor", $rt_wrapFunction3(otrfm_InMemoryVirtualDirectory_createAccessor), "$createFile0", $rt_wrapFunction1(otrfm_InMemoryVirtualDirectory_createFile)],
    ju_SequencedMap, 0, jl_Object, [ju_Map], 3, 3, 0, 0, 0,
    ju_LinkedHashMap, 0, ju_HashMap, [ju_SequencedMap], 0, 3, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_LinkedHashMap_newElementArray)],
    ju_NoSuchElementException, "NoSuchElementException", 6, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    jl_IllegalStateException, "IllegalStateException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    ji_ByteArrayInputStream, 0, ji_InputStream, [], 0, 3, 0, 0, ["$read0", $rt_wrapFunction3(ji_ByteArrayInputStream_read)],
    otci_Base64Impl, 0, jl_Object, [], 4, 3, 0, 0, 0,
    jl_ArrayIndexOutOfBoundsException, "ArrayIndexOutOfBoundsException", 11, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, 0,
    ju_LinkedHashMap$LinkedHashMapEntry, 0, ju_HashMap$HashEntry, [], 4, 0, 0, 0, 0,
    jl_Float, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0, 0,
    otcic_Console, 0, jl_Object, [], 4, 3, 0, 0, 0,
    cjj_Deflate, 0, jl_Object, [jl_Cloneable], 4, 3, 0, cjj_Deflate_$callClinit, 0,
    cjj_Inflate, 0, jl_Object, [], 4, 0, 0, 0, 0,
    ju_ConcurrentModificationException, "ConcurrentModificationException", 6, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    juz_DataFormatException, "DataFormatException", 7, jl_Exception, [], 0, 3, 0, 0, 0,
    m_WebGLShader, 0, jl_Object, [], 0, 3, 0, m_WebGLShader_$callClinit, 0,
    m_StreamBuffer$StreamBufferInstance, 0, jl_Object, [], 0, 3, 0, 0, 0,
    cjj_Tree, 0, jl_Object, [], 4, 0, 0, 0, 0,
    m_StreamBuffer, 0, jl_Object, [], 0, 3, 0, 0, 0,
    m_BufferArrayGL, 0, jl_Object, [], 4, 3, 0, 0, 0,
    m_BufferGL, 0, jl_Object, [], 4, 3, 0, 0, 0,
    cjj_Deflate$Config, 0, jl_Object, [], 0, 0, 0, 0, 0,
    m_StreamBuffer$IStreamBufferInitializer, 0, jl_Object, [], 3, 3, 0, 0, 0,
    m_WebGLShader$_init_$lambda$_2_0, 0, jl_Object, [m_StreamBuffer$IStreamBufferInitializer], 0, 3, 0, 0, 0,
    jn_IntBufferOverArray, 0, jn_IntBufferImpl, [], 0, 0, 0, 0, ["$getElement0", $rt_wrapFunction1(jn_IntBufferOverArray_getElement)],
    m_ShaderGL, 0, jl_Object, [], 4, 3, 0, 0, 0,
    m_ProgramGL, 0, jl_Object, [], 4, 3, 0, 0, 0]);
    $rt_metadata([m_UniformGL, 0, jl_Object, [], 4, 3, 0, 0, 0,
    otrf_VirtualFile, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otrfm_VirtualFileImpl, 0, jl_Object, [otrf_VirtualFile], 0, 3, 0, 0, 0,
    cjj_InfBlocks, 0, jl_Object, [], 4, 0, 0, 0, 0,
    cjj_InfTree, 0, jl_Object, [], 4, 0, 0, 0, 0,
    cjj_InfCodes, 0, jl_Object, [], 4, 0, 0, 0, 0,
    jnc_CoderMalfunctionError, "CoderMalfunctionError", 9, jl_Error, [], 0, 3, 0, 0, 0,
    jnci_BufferedEncoder$Controller, 0, jl_Object, [], 0, 3, 0, 0, 0,
    cjj_Inflate$Return, "Inflate$Return", 2, jl_Exception, [], 0, 0, 0, 0, 0,
    cjj_GZIPHeader, 0, jl_Object, [jl_Cloneable], 0, 3, 0, 0, 0,
    cjj_StaticTree, 0, jl_Object, [], 4, 0, 0, cjj_StaticTree_$callClinit, 0,
    ji_ByteArrayOutputStream, 0, ji_OutputStream, [], 0, 3, 0, 0, 0,
    otrfm_InMemoryVirtualFile, 0, otrfm_AbstractInMemoryVirtualFile, [], 0, 3, 0, 0, ["$isDirectory", $rt_wrapFunction0(otrfm_InMemoryVirtualFile_isDirectory), "$isFile", $rt_wrapFunction0(otrfm_InMemoryVirtualFile_isFile), "$getChildFile", $rt_wrapFunction1(otrfm_InMemoryVirtualFile_getChildFile), "$createAccessor", $rt_wrapFunction3(otrfm_InMemoryVirtualFile_createAccessor), "$createFile0", $rt_wrapFunction1(otrfm_InMemoryVirtualFile_createFile)],
    jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0, 0,
    jl_IllegalMonitorStateException, "IllegalMonitorStateException", 11, jl_RuntimeException, [], 0, 3, 0, 0, 0,
    otp_PlatformQueue, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
    jl_Object$monitorExit$lambda$_8_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, ["$run", $rt_wrapFunction0(jl_Object$monitorExit$lambda$_8_0_run)],
    jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, 0,
    otrf_VirtualFileAccessor, 0, jl_Object, [], 3, 3, 0, 0, 0,
    otrfm_InMemoryVirtualFile$1, 0, jl_Object, [otrf_VirtualFileAccessor], 0, 0, 0, 0, 0]);
    function $rt_array(cls, data) {
        this.$monitor = null;
        this.$id$ = 0;
        this.type = cls;
        this.data = data;
        this.constructor = $rt_arraycls(cls);
    }
    $rt_array.prototype = $rt_globals.Object.create(($rt_objcls()).prototype);
    $rt_array.prototype.toString = function() {
        var str = "[";
        for (var i = 0;i < this.data.length;++i) {
            if (i > 0) {
                str += ", ";
            }
            str += this.data[i].toString();
        }
        str += "]";
        return str;
    };
    $rt_setCloneMethod($rt_array.prototype, function() {
        var dataCopy;
        if ('slice' in this.data) {
            dataCopy = this.data.slice();
        } else {
            dataCopy = new this.data.constructor(this.data.length);
            for (var i = 0;i < dataCopy.length;++i) {
                dataCopy[i] = this.data[i];
            }
        }
        return new $rt_array(this.type, dataCopy);
    });
    $rt_stringPool(["Can\'t enter monitor from another thread synchronously", "0", "/", ": ", "\tat ", "Caused by: ", "null", "title cannot be null", "level.dat", "Either src or dest is null", "New position ", " is outside of range [0;", "The last byte in src ", " is outside of array of size ", "Length ", " must be non-negative", "Offset ", "BIG_ENDIAN", "LITTLE_ENDIAN", "Game", "keyup", "NONE", "ESCAPE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "MINUS", "EQUALS", "BACK", "TAB", "Q", "W", "E", "R", "T",
    "Y", "U", "I", "O", "P", "LBRACKET", "RBRACKET", "RETURN", "LCONTROL", "A", "S", "D", "F", "G", "H", "J", "K", "L", "SEMICOLON", "APOSTROPHE", "GRAVE", "LSHIFT", "BACKSLASH", "Z", "X", "C", "V", "B", "N", "M", "COMMA", "PERIOD", "SLASH", "RSHIFT", "MULTIPLY", "LMENU", "SPACE", "CAPITAL", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "NUMLOCK", "SCROLL", "NUMPAD7", "NUMPAD8", "NUMPAD9", "SUBTRACT", "NUMPAD4", "NUMPAD5", "NUMPAD6", "ADD", "NUMPAD1", "NUMPAD2", "NUMPAD3", "NUMPAD0", "DECIMAL",
    "", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "KANA", "F19", "CONVERT", "NOCONVERT", "YEN", "NUMPADEQUALS", "CIRCUMFLEX", "AT", "COLON", "UNDERLINE", "KANJI", "STOP", "AX", "UNLABELED", "NUMPADENTER", "RCONTROL", "SECTION", "NUMPADCOMMA", "DIVIDE", "SYSRQ", "RMENU", "FUNCTION", "PAUSE", "HOME", "UP", "PRIOR", "LEFT", "RIGHT", "END", "DOWN", "NEXT", "INSERT", "DELETE", "CLEAR", "LMETA", "RMETA", "APPS", "POWER", "SLEEP", "/terrain.rgba", "Resource not found: ", "Invalid texture data size: expected ",
    ", but got ", "Failed to load texture: ", "BUTTON", "mousedown", "Unsupported matrix mode in display list", "glTexImage2D: Unsupported Buffer type!", "#version 300 es", "object", "function", "string", "number", "undefined", "New limit ", "main", "Action must be non-null", "Replacement preconditions do not hold", "Index out of bounds", "The last float in dst ", "The last float in src ", "UTF-8", "Index ", "IGNORE", "REPLACE", "REPORT", "Invalid file name", "Could not create file", "This stream is already closed",
    "Stream is closed", "The last char in dst ", "Error: ", "Error occurred: ", "Directory is read-only", "File ", " already exists", "need dictionary", "stream end", "file error", "stream error", "data error", "insufficient memory", "buffer error", "incompatible version", "unknown compression method", "unknown header flags set", "incorrect data check", "incorrect length check", "incorrect header check", "invalid window size", "bad extra field length", "header crc mismatch", "\n#define CC_a_color\n", "#define CC_a_normal\n",
    "#define CC_a_texture0\n", "#define CC_lighting\n", "#define CC_fog\n", "#define CC_alphatest\n", "#define CC_unit0\n", "\n#define CC_VERT\n", "\n\n", "\n", "\n[main.Main.vertexFragmentShader][CC_VERT] ", "broken shader source", "\n#define CC_FRAG\n", "\n[main.Main.vertexFragmentShader][CC_FRAG] ", "a_position", "a_texture0", "a_color", "a_normal", "\n[LINKER] ", "matrix_m", "matrix_p", "matrix_t", "colorUniform", "normalUniform", "light0Pos", "light1Pos", "fogColor", "fogMode", "fogStart", "fogEnd", "fogDensity",
    "fogPremultiply", "alphaTestF", "tex0", "texCoordV0", "precision highp int;\nprecision highp sampler2D;\nprecision highp float;\n\nuniform mat4 matrix_m;\nuniform mat4 matrix_p;\nuniform mat4 matrix_t;\n\n#ifdef CC_VERT\n\nin vec3 a_position;\n#ifdef CC_a_texture0\nin vec2 a_texture0;\n#endif\n#ifdef CC_a_color\nin vec4 a_color;\n#endif\n#ifdef CC_a_normal\nin vec4 a_normal;\n#endif\n\n#ifdef CC_fog\nout vec4 v_position;\n#endif\n#ifdef CC_a_color\nout vec4 v_color;\n#endif\n#ifdef CC_a_normal\nout vec4 v_normal;\n#endif\n#ifdef CC_a_texture0\nout vec2 v_texture0;\n#endif\n\nvoid main(){\n\tvec4 "
    + "pos = matrix_m * vec4(a_position, 1.0);\n#ifdef CC_fog\n\tv_position = pos;\n#endif\n#ifdef CC_a_color\n\tv_color = a_color;\n#endif\n#ifdef CC_a_normal\n\tv_normal = a_normal;\n#endif\n#ifdef CC_a_texture0\n\tv_texture0 = a_texture0;\n#endif\n\tgl_Position = matrix_p * pos;\n}\n\n#endif\n\n#ifdef CC_FRAG\n\n#ifdef CC_unit0\nuniform sampler2D tex0;\n#ifndef CC_a_texture0\nuniform vec2 texCoordV0;\n#endif\n#endif\n#ifdef CC_lighting\nuniform vec3 light0Pos;\nuniform vec3 light1Pos;\nuniform vec3 normalUniform;\n#endif\n#ifdef CC_fog\nuniform ve"
    + "c4 fogColor;\nuniform int fogMode;\nuniform float fogStart;\nuniform float fogEnd;\nuniform float fogDensity;\nuniform float fogPremultiply;\n#endif\nuniform vec4 colorUniform;\n#ifdef CC_alphatest\nuniform float alphaTestF;\n#endif\n\n#ifdef CC_fog\nin vec4 v_position;\n#endif\n#ifdef CC_a_color\nin vec4 v_color;\n#endif\n#ifdef CC_a_normal\nin vec4 v_normal;\n#endif\n#ifdef CC_a_texture0\nin vec2 v_texture0;\n#endif\n\nout vec4 fragColor;\n\n#define TEX_MAT3x2(mat4In) mat3x2(mat4In[0].xy,mat4In[1].xy,mat4In[3].xy)\n\nvoid main(){\n#if"
    + "def CC_a_color\n\tvec4 color = colorUniform * v_color;\n#else\n\tvec4 color = colorUniform;\n#endif\n\t\n#ifdef CC_unit0\n#ifdef CC_a_texture0\n\tcolor *= texture(tex0, (TEX_MAT3x2(matrix_t) * vec3(v_texture0, 1.0)).xy).rgba;\n#else\n\tcolor *= texture(tex0, (TEX_MAT3x2(matrix_t) * vec3(texCoordV0, 1.0)).xy).rgba;\n#endif\n#endif\n\n#ifdef CC_alphatest\n\tif(color.a < alphaTestF){\n\t\tdiscard;\n\t}\n#endif\n\n#ifdef CC_lighting\n#ifdef CC_a_normal\n\tvec3 normal = ((v_normal.xyz - 0.5) * 2.0);\n#else\n\tvec3 normal = normalUniform;\n#endif\n\t"
    + "normal = normalize(mat3(matrix_m) * normal);\n\tfloat ins = max(dot(normal, -light0Pos), 0.0) + max(dot(normal, -light1Pos), 0.0);\n\tcolor.rgb *= min((0.4 + ins * 0.6), 1.0);\n#endif\n\t\n#ifdef CC_fog\n\tfloat dist = sqrt(dot(v_position, v_position));\n\tfloat i = (fogMode == 1) ? clamp((dist - fogStart) / (fogEnd - fogStart), 0.0, 1.0) : clamp(1.0 - exp(-(fogDensity * dist)), 0.0, 1.0);\n\tcolor.rgb = mix(color.rgb, fogColor.xyz, i * fogColor.a);\n#endif\n\t\n\tfragColor = color;\n}\n\n#endif\n", "Directory does not exist",
    "invalid stored block lengths", "invalid block type", "too many length or distance symbols", "invalid bit length repeat", "oversubscribed dynamic bit lengths tree", "incomplete dynamic bit lengths tree", "oversubscribed distance tree", "incomplete distance tree", "empty distance tree with lengths", "oversubscribed literal/length tree", "incomplete literal/length tree", "invalid distance code", "invalid literal/length code", "Can\'t create file ", " since parent path denotes regular file"]);
    jl_String.prototype.toString = function() {
        return $rt_ustr(this);
    };
    jl_String.prototype.valueOf = jl_String.prototype.toString;
    jl_Object.prototype.toString = function() {
        return $rt_ustr(jl_Object_toString(this));
    };
    jl_Object.prototype.__teavm_class__ = function() {
        return $dbg_class(this);
    };
    var Long_eq;
    var Long_ne;
    var Long_gt;
    var Long_ge;
    var Long_lt;
    var Long_le;
    var Long_compare;
    var Long_ucompare;
    var Long_add;
    var Long_sub;
    var Long_inc;
    var Long_dec;
    var Long_mul;
    var Long_div;
    var Long_rem;
    var Long_udiv;
    var Long_urem;
    var Long_neg;
    var Long_and;
    var Long_or;
    var Long_xor;
    var Long_shl;
    var Long_shr;
    var Long_shru;
    var Long_not;
    if (typeof $rt_globals.BigInt !== 'function') {
        Long_eq = function(a, b) {
            return a.hi === b.hi && a.lo === b.lo;
        };
        Long_ne = function(a, b) {
            return a.hi !== b.hi || a.lo !== b.lo;
        };
        Long_gt = function(a, b) {
            if (a.hi < b.hi) {
                return false;
            }
            if (a.hi > b.hi) {
                return true;
            }
            var x = a.lo >>> 1;
            var y = b.lo >>> 1;
            if (x !== y) {
                return x > y;
            }
            return (a.lo & 1) > (b.lo & 1);
        };
        Long_ge = function(a, b) {
            if (a.hi < b.hi) {
                return false;
            }
            if (a.hi > b.hi) {
                return true;
            }
            var x = a.lo >>> 1;
            var y = b.lo >>> 1;
            if (x !== y) {
                return x >= y;
            }
            return (a.lo & 1) >= (b.lo & 1);
        };
        Long_lt = function(a, b) {
            if (a.hi > b.hi) {
                return false;
            }
            if (a.hi < b.hi) {
                return true;
            }
            var x = a.lo >>> 1;
            var y = b.lo >>> 1;
            if (x !== y) {
                return x < y;
            }
            return (a.lo & 1) < (b.lo & 1);
        };
        Long_le = function(a, b) {
            if (a.hi > b.hi) {
                return false;
            }
            if (a.hi < b.hi) {
                return true;
            }
            var x = a.lo >>> 1;
            var y = b.lo >>> 1;
            if (x !== y) {
                return x <= y;
            }
            return (a.lo & 1) <= (b.lo & 1);
        };
        Long_add = function(a, b) {
            if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
                return Long_fromNumber(a.lo + b.lo);
            } else if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
            }
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            var lolo = a_lolo + b_lolo | 0;
            var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
            var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
            var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
            return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
        };
        Long_inc = function(a) {
            var lo = a.lo + 1 | 0;
            var hi = a.hi;
            if (lo === 0) {
                hi = hi + 1 | 0;
            }
            return new Long(lo, hi);
        };
        Long_dec = function(a) {
            var lo = a.lo - 1 | 0;
            var hi = a.hi;
            if (lo ===  -1) {
                hi = hi - 1 | 0;
            }
            return new Long(lo, hi);
        };
        Long_neg = function(a) {
            return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
        };
        Long_sub = function(a, b) {
            if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
                return Long_fromNumber(a.lo - b.lo);
            }
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            var lolo = a_lolo - b_lolo | 0;
            var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
            var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
            var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
            return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
        };
        Long_compare = function(a, b) {
            var r = a.hi - b.hi;
            if (r !== 0) {
                return r;
            }
            r = (a.lo >>> 1) - (b.lo >>> 1);
            if (r !== 0) {
                return r;
            }
            return (a.lo & 1) - (b.lo & 1);
        };
        Long_ucompare = function(a, b) {
            var r = $rt_ucmp(a.hi, b.hi);
            if (r !== 0) {
                return r;
            }
            r = (a.lo >>> 1) - (b.lo >>> 1);
            if (r !== 0) {
                return r;
            }
            return (a.lo & 1) - (b.lo & 1);
        };
        Long_mul = function(a, b) {
            var positive = Long_isNegative(a) === Long_isNegative(b);
            if (Long_isNegative(a)) {
                a = Long_neg(a);
            }
            if (Long_isNegative(b)) {
                b = Long_neg(b);
            }
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            var lolo = 0;
            var lohi = 0;
            var hilo = 0;
            var hihi = 0;
            lolo = a_lolo * b_lolo | 0;
            lohi = lolo >>> 16;
            lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
            hilo = hilo + (lohi >>> 16) | 0;
            lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
            hilo = hilo + (lohi >>> 16) | 0;
            hihi = hilo >>> 16;
            hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
            hihi = hihi + (hilo >>> 16) | 0;
            hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
            hihi = hihi + (hilo >>> 16) | 0;
            hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
            hihi = hihi + (hilo >>> 16) | 0;
            hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
            var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
            return positive ? result : Long_neg(result);
        };
        Long_div = function(a, b) {
            if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
            }
            return (Long_divRem(a, b))[0];
        };
        Long_udiv = function(a, b) {
            if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
            }
            return (Long_udivRem(a, b))[0];
        };
        Long_rem = function(a, b) {
            if ($rt_globals.Math.abs(a.hi) < Long_MAX_NORMAL && $rt_globals.Math.abs(b.hi) < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
            }
            return (Long_divRem(a, b))[1];
        };
        Long_urem = function(a, b) {
            if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
                return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
            }
            return (Long_udivRem(a, b))[1];
        };
        function Long_divRem(a, b) {
            if (b.lo === 0 && b.hi === 0) {
                throw new $rt_globals.Error("Division by zero");
            }
            var positive = Long_isNegative(a) === Long_isNegative(b);
            if (Long_isNegative(a)) {
                a = Long_neg(a);
            }
            if (Long_isNegative(b)) {
                b = Long_neg(b);
            }
            a = new LongInt(a.lo, a.hi, 0);
            b = new LongInt(b.lo, b.hi, 0);
            var q = LongInt_div(a, b);
            a = new Long(a.lo, a.hi);
            q = new Long(q.lo, q.hi);
            return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
        }
        function Long_udivRem(a, b) {
            if (b.lo === 0 && b.hi === 0) {
                throw new $rt_globals.Error("Division by zero");
            }
            a = new LongInt(a.lo, a.hi, 0);
            b = new LongInt(b.lo, b.hi, 0);
            var q = LongInt_div(a, b);
            a = new Long(a.lo, a.hi);
            q = new Long(q.lo, q.hi);
            return [q, a];
        }
        function Long_shiftLeft16(a) {
            return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
        }
        function Long_shiftRight16(a) {
            return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
        }
        Long_and = function(a, b) {
            return new Long(a.lo & b.lo, a.hi & b.hi);
        };
        Long_or = function(a, b) {
            return new Long(a.lo | b.lo, a.hi | b.hi);
        };
        Long_xor = function(a, b) {
            return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
        };
        Long_shl = function(a, b) {
            b &= 63;
            if (b === 0) {
                return a;
            } else if (b < 32) {
                return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
            } else if (b === 32) {
                return new Long(0, a.lo);
            } else {
                return new Long(0, a.lo << b - 32);
            }
        };
        Long_shr = function(a, b) {
            b &= 63;
            if (b === 0) {
                return a;
            } else if (b < 32) {
                return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
            } else if (b === 32) {
                return new Long(a.hi, a.hi >> 31);
            } else {
                return new Long(a.hi >> b - 32, a.hi >> 31);
            }
        };
        Long_shru = function(a, b) {
            b &= 63;
            if (b === 0) {
                return a;
            } else if (b < 32) {
                return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
            } else if (b === 32) {
                return new Long(a.hi, 0);
            } else {
                return new Long(a.hi >>> b - 32, 0);
            }
        };
        Long_not = function(a) {
            return new Long(~a.hi, ~a.lo);
        };
        function LongInt(lo, hi, sup) {
            this.lo = lo;
            this.hi = hi;
            this.sup = sup;
        }
        function LongInt_mul(a, b) {
            var a_lolo = (a.lo & 0xFFFF) * b | 0;
            var a_lohi = (a.lo >>> 16) * b | 0;
            var a_hilo = (a.hi & 0xFFFF) * b | 0;
            var a_hihi = (a.hi >>> 16) * b | 0;
            var sup = a.sup * b | 0;
            a_lohi = a_lohi + (a_lolo >>> 16) | 0;
            a_hilo = a_hilo + (a_lohi >>> 16) | 0;
            a_hihi = a_hihi + (a_hilo >>> 16) | 0;
            sup = sup + (a_hihi >>> 16) | 0;
            a.lo = a_lolo & 0xFFFF | a_lohi << 16;
            a.hi = a_hilo & 0xFFFF | a_hihi << 16;
            a.sup = sup & 0xFFFF;
        }
        function LongInt_sub(a, b) {
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            a_lolo = a_lolo - b_lolo | 0;
            a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
            a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
            a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
            var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
            a.lo = a_lolo & 0xFFFF | a_lohi << 16;
            a.hi = a_hilo & 0xFFFF | a_hihi << 16;
            a.sup = sup;
        }
        function LongInt_add(a, b) {
            var a_lolo = a.lo & 0xFFFF;
            var a_lohi = a.lo >>> 16;
            var a_hilo = a.hi & 0xFFFF;
            var a_hihi = a.hi >>> 16;
            var b_lolo = b.lo & 0xFFFF;
            var b_lohi = b.lo >>> 16;
            var b_hilo = b.hi & 0xFFFF;
            var b_hihi = b.hi >>> 16;
            a_lolo = a_lolo + b_lolo | 0;
            a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
            a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
            a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
            var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
            a.lo = a_lolo & 0xFFFF | a_lohi << 16;
            a.hi = a_hilo & 0xFFFF | a_hihi << 16;
            a.sup = sup;
        }
        function LongInt_inc(a) {
            a.lo = a.lo + 1 | 0;
            if (a.lo === 0) {
                a.hi = a.hi + 1 | 0;
                if (a.hi === 0) {
                    a.sup = a.sup + 1 & 0xFFFF;
                }
            }
        }
        function LongInt_dec(a) {
            a.lo = a.lo - 1 | 0;
            if (a.lo ===  -1) {
                a.hi = a.hi - 1 | 0;
                if (a.hi ===  -1) {
                    a.sup = a.sup - 1 & 0xFFFF;
                }
            }
        }
        function LongInt_ucompare(a, b) {
            var r = a.sup - b.sup;
            if (r !== 0) {
                return r;
            }
            r = (a.hi >>> 1) - (b.hi >>> 1);
            if (r !== 0) {
                return r;
            }
            r = (a.hi & 1) - (b.hi & 1);
            if (r !== 0) {
                return r;
            }
            r = (a.lo >>> 1) - (b.lo >>> 1);
            if (r !== 0) {
                return r;
            }
            return (a.lo & 1) - (b.lo & 1);
        }
        function LongInt_numOfLeadingZeroBits(a) {
            var n = 0;
            var d = 16;
            while (d > 0) {
                if (a >>> d !== 0) {
                    a >>>= d;
                    n = n + d | 0;
                }
                d = d / 2 | 0;
            }
            return 31 - n;
        }
        function LongInt_shl(a, b) {
            if (b === 0) {
                return;
            }
            if (b < 32) {
                a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
                a.hi = a.lo >>> 32 - b | a.hi << b;
                a.lo <<= b;
            } else if (b === 32) {
                a.sup = a.hi & 0xFFFF;
                a.hi = a.lo;
                a.lo = 0;
            } else if (b < 64) {
                a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
                a.hi = a.lo << b;
                a.lo = 0;
            } else if (b === 64) {
                a.sup = a.lo & 0xFFFF;
                a.hi = 0;
                a.lo = 0;
            } else {
                a.sup = a.lo << b - 64 & 0xFFFF;
                a.hi = 0;
                a.lo = 0;
            }
        }
        function LongInt_shr(a, b) {
            if (b === 0) {
                return;
            }
            if (b === 32) {
                a.lo = a.hi;
                a.hi = a.sup;
                a.sup = 0;
            } else if (b < 32) {
                a.lo = a.lo >>> b | a.hi << 32 - b;
                a.hi = a.hi >>> b | a.sup << 32 - b;
                a.sup >>>= b;
            } else if (b === 64) {
                a.lo = a.sup;
                a.hi = 0;
                a.sup = 0;
            } else if (b < 64) {
                a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
                a.hi = a.sup >>> b - 32;
                a.sup = 0;
            } else {
                a.lo = a.sup >>> b - 64;
                a.hi = 0;
                a.sup = 0;
            }
        }
        function LongInt_copy(a) {
            return new LongInt(a.lo, a.hi, a.sup);
        }
        function LongInt_div(a, b) {
            var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
            var sz = 1 + (bits / 16 | 0);
            var dividentBits = bits % 16;
            LongInt_shl(b, bits);
            LongInt_shl(a, dividentBits);
            var q = new LongInt(0, 0, 0);
            while (sz-- > 0) {
                LongInt_shl(q, 16);
                var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
                var digitB = b.hi >>> 16;
                var digit = digitA / digitB | 0;
                var t = LongInt_copy(b);
                LongInt_mul(t, digit);
                if (LongInt_ucompare(t, a) >= 0) {
                    while (LongInt_ucompare(t, a) > 0) {
                        LongInt_sub(t, b);
                         --digit;
                    }
                } else {
                    while (true) {
                        var nextT = LongInt_copy(t);
                        LongInt_add(nextT, b);
                        if (LongInt_ucompare(nextT, a) > 0) {
                            break;
                        }
                        t = nextT;
                        ++digit;
                    }
                }
                LongInt_sub(a, t);
                q.lo |= digit;
                LongInt_shl(a, 16);
            }
            LongInt_shr(a, bits + 16);
            return q;
        }
    } else {
        Long_eq = function(a, b) {
            return a === b;
        };
        Long_ne = function(a, b) {
            return a !== b;
        };
        Long_gt = function(a, b) {
            return a > b;
        };
        Long_ge = function(a, b) {
            return a >= b;
        };
        Long_lt = function(a, b) {
            return a < b;
        };
        Long_le = function(a, b) {
            return a <= b;
        };
        Long_add = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a + b);
        };
        Long_inc = function(a) {
            return $rt_globals.BigInt.asIntN(64, a + 1);
        };
        Long_dec = function(a) {
            return $rt_globals.BigInt.asIntN(64, a - 1);
        };
        Long_neg = function(a) {
            return $rt_globals.BigInt.asIntN(64,  -a);
        };
        Long_sub = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a - b);
        };
        Long_compare = function(a, b) {
            return a < b ?  -1 : a > b ? 1 : 0;
        };
        Long_ucompare = function(a, b) {
            a = $rt_globals.BigInt.asUintN(64, a);
            b = $rt_globals.BigInt.asUintN(64, b);
            return a < b ?  -1 : a > b ? 1 : 0;
        };
        Long_mul = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a * b);
        };
        Long_div = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a / b);
        };
        Long_udiv = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) / $rt_globals.BigInt.asUintN(64, b));
        };
        Long_rem = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a % b);
        };
        Long_urem = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) % $rt_globals.BigInt.asUintN(64, b));
        };
        Long_and = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a & b);
        };
        Long_or = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a | b);
        };
        Long_xor = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a ^ b);
        };
        Long_shl = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a << $rt_globals.BigInt(b & 63));
        };
        Long_shr = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, a >> $rt_globals.BigInt(b & 63));
        };
        Long_shru = function(a, b) {
            return $rt_globals.BigInt.asIntN(64, $rt_globals.BigInt.asUintN(64, a) >> $rt_globals.BigInt(b & 63));
        };
        Long_not = function(a) {
            return $rt_globals.BigInt.asIntN(64, ~a);
        };
    }
    var Long_add = Long_add;

    var Long_sub = Long_sub;

    var Long_mul = Long_mul;

    var Long_div = Long_div;

    var Long_rem = Long_rem;

    var Long_or = Long_or;

    var Long_and = Long_and;

    var Long_xor = Long_xor;

    var Long_shl = Long_shl;

    var Long_shr = Long_shr;

    var Long_shru = Long_shru;

    var Long_compare = Long_compare;

    var Long_eq = Long_eq;

    var Long_ne = Long_ne;

    var Long_lt = Long_lt;

    var Long_le = Long_le;

    var Long_gt = Long_gt;

    var Long_ge = Long_ge;

    var Long_not = Long_not;

    var Long_neg = Long_neg;

    function TeaVMThread(runner) {
        this.status = 3;
        this.stack = [];
        this.suspendCallback = null;
        this.runner = runner;
        this.attribute = null;
        this.completeCallback = null;
    }
    TeaVMThread.prototype.push = function() {
        for (var i = 0;i < arguments.length;++i) {
            this.stack.push(arguments[i]);
        }
        return this;
    };
    TeaVMThread.prototype.s = TeaVMThread.prototype.push;
    TeaVMThread.prototype.pop = function() {
        return this.stack.pop();
    };
    TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
    TeaVMThread.prototype.isResuming = function() {
        return this.status === 2;
    };
    TeaVMThread.prototype.isSuspending = function() {
        return this.status === 1;
    };
    TeaVMThread.prototype.suspend = function(callback) {
        this.suspendCallback = callback;
        this.status = 1;
    };
    TeaVMThread.prototype.start = function(callback) {
        if (this.status !== 3) {
            throw new $rt_globals.Error("Thread already started");
        }
        if ($rt_currentNativeThread !== null) {
            throw new $rt_globals.Error("Another thread is running");
        }
        this.status = 0;
        this.completeCallback = callback ? callback : function(result) {
            if (result instanceof $rt_globals.Error) {
                throw result;
            }
        };
        this.run();
    };
    TeaVMThread.prototype.resume = function() {
        if ($rt_currentNativeThread !== null) {
            throw new $rt_globals.Error("Another thread is running");
        }
        this.status = 2;
        this.run();
    };
    TeaVMThread.prototype.run = function() {
        $rt_currentNativeThread = this;
        var result;
        try {
            result = this.runner();
        } catch (e){
            result = e;
        } finally {
            $rt_currentNativeThread = null;
        }
        if (this.suspendCallback !== null) {
            var self = this;
            var callback = this.suspendCallback;
            this.suspendCallback = null;
            callback(function() {
                self.resume();
            });
        } else if (this.status === 0) {
            this.completeCallback(result);
        }
    };
    function $rt_suspending() {
        var thread = $rt_nativeThread();
        return thread != null && thread.isSuspending();
    }
    function $rt_resuming() {
        var thread = $rt_nativeThread();
        return thread != null && thread.isResuming();
    }
    function $rt_suspend(callback) {
        var nativeThread = $rt_nativeThread();
        if (nativeThread === null) {
            throw new $rt_globals.Error("Suspension point reached from non-threading context (perhaps, from native JS method).");
        }
        return nativeThread.suspend(callback);
    }
    function $rt_startThread(runner, callback) {
        (new TeaVMThread(runner)).start(callback);
    }
    var $rt_currentNativeThread = null;
    function $rt_nativeThread() {
        return $rt_currentNativeThread;
    }
    function $rt_invalidPointer() {
        throw new $rt_globals.Error("Invalid recorded state");
    }
    $rt_exports.main = $rt_mainStarter(cdmC_Client_main);
    $rt_exports.main.javaException = $rt_javaException;
    let $rt_jso_marker = $rt_globals.Symbol('jsoClass');
    (function() {
        var c;
        c = otjb_Performance.prototype;
        c[$rt_jso_marker] = true;
        c = olo_Display$1.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = olo_Display$2.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = olo_Display$3.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = otji_JSWrapper$_clinit_$lambda$_30_0.prototype;
        c[$rt_jso_marker] = true;
        c.accept = c.$accept$exported$0;
        c = otji_JSWrapper$_clinit_$lambda$_30_1.prototype;
        c[$rt_jso_marker] = true;
        c.accept = c.$accept$exported$0;
        c = oli_Keyboard$1.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Keyboard$2.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Keyboard$3.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Mouse$1.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Mouse$2.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Mouse$3.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Mouse$4.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Mouse$5.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Mouse$6.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Mouse$7.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
        c = oli_Mouse$8.prototype;
        c[$rt_jso_marker] = true;
        c.handleEvent = c.$handleEvent$exported$0;
    })();
}));

//# sourceMappingURL=../classes.js.map