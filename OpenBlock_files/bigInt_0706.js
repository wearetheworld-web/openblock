/* eslint-disable */
const bigInt = (function (t) {
  'use strict';

  const e = 1e7;
  const r = 9007199254740992;
  const o = f(r);
  const n = '0123456789abcdefghijklmnopqrstuvwxyz';
  const i = typeof BigInt === 'function';
  function u(t, e, r, o) {
    return void 0 === t
      ? u[0]
      : void 0 !== e && (Number(e) != 10 || r)
      ? _(t, e, r, o)
      : K(t);
  }
  function p(t, e) {
    (this.value = t), (this.sign = e), (this.isSmall = !1);
  }
  function a(t) {
    (this.value = t), (this.sign = t < 0), (this.isSmall = !0);
  }
  function s(t) {
    this.value = t;
  }
  function l(t) {
    return -r < t && t < r;
  }
  function f(t) {
    return t < 1e7
      ? [t]
      : t < 1e14
      ? [t % 1e7, Math.floor(t / 1e7)]
      : [t % 1e7, Math.floor(t / 1e7) % 1e7, Math.floor(t / 1e14)];
  }
  function v(t) {
    h(t);
    const r = t.length;
    if (r < 4 && A(t, o) < 0)
      switch (r) {
        case 0:
          return 0;
        case 1:
          return t[0];
        case 2:
          return t[0] + t[1] * e;
        default:
          return t[0] + (t[1] + t[2] * e) * e;
      }
    return t;
  }
  function h(t) {
    for (var e = t.length; t[--e] === 0; );
    t.length = e + 1;
  }
  function y(t) {
    for (var e = new Array(t), r = -1; ++r < t; ) e[r] = 0;
    return e;
  }
  function g(t) {
    return t > 0 ? Math.floor(t) : Math.ceil(t);
  }
  function c(t, r) {
    let o;
    let n;
    const i = t.length;
    const u = r.length;
    const p = new Array(i);
    let a = 0;
    const s = e;
    for (n = 0; n < u; n++)
      (a = (o = t[n] + r[n] + a) >= s ? 1 : 0), (p[n] = o - a * s);
    for (; n < i; ) (a = (o = t[n] + a) === s ? 1 : 0), (p[n++] = o - a * s);
    return a > 0 && p.push(a), p;
  }
  function m(t, e) {
    return t.length >= e.length ? c(t, e) : c(e, t);
  }
  function d(t, r) {
    let o;
    let n;
    const i = t.length;
    const u = new Array(i);
    const p = e;
    for (n = 0; n < i; n++)
      (o = t[n] - p + r), (r = Math.floor(o / p)), (u[n] = o - r * p), (r += 1);
    for (; r > 0; ) (u[n++] = r % p), (r = Math.floor(r / p));
    return u;
  }
  function b(t, r) {
    let o;
    let n;
    const i = t.length;
    const u = r.length;
    const p = new Array(i);
    let a = 0;
    const s = e;
    for (o = 0; o < u; o++)
      (n = t[o] - a - r[o]) < 0 ? ((n += s), (a = 1)) : (a = 0), (p[o] = n);
    for (o = u; o < i; o++) {
      if (!((n = t[o] - a) < 0)) {
        p[o++] = n;
        break;
      }
      (n += s), (p[o] = n);
    }
    for (; o < i; o++) p[o] = t[o];
    return h(p), p;
  }
  function w(t, r, o) {
    let n;
    let i;
    const u = t.length;
    let s = new Array(u);
    let l = -r;
    const f = e;
    for (n = 0; n < u; n++)
      (i = t[n] + l),
        (l = Math.floor(i / f)),
        (i %= f),
        (s[n] = i < 0 ? i + f : i);
    return typeof (s = v(s)) === 'number'
      ? (o && (s = -s), new a(s))
      : new p(s, o);
  }
  function S(t, r) {
    let o;
    let n;
    let i;
    let u;
    const p = t.length;
    const a = r.length;
    const s = y(p + a);
    const l = e;
    for (i = 0; i < p; ++i) {
      u = t[i];
      for (let f = 0; f < a; ++f)
        (o = u * r[f] + s[i + f]),
          (n = Math.floor(o / l)),
          (s[i + f] = o - n * l),
          (s[i + f + 1] += n);
    }
    return h(s), s;
  }
  function I(t, r) {
    let o;
    let n;
    const i = t.length;
    const u = new Array(i);
    const p = e;
    let a = 0;
    for (n = 0; n < i; n++)
      (o = t[n] * r + a), (a = Math.floor(o / p)), (u[n] = o - a * p);
    for (; a > 0; ) (u[n++] = a % p), (a = Math.floor(a / p));
    return u;
  }
  function q(t, e) {
    for (var r = []; e-- > 0; ) r.push(0);
    return r.concat(t);
  }
  function M(t, e) {
    let r = Math.max(t.length, e.length);
    if (r <= 30) return S(t, e);
    r = Math.ceil(r / 2);
    const o = t.slice(r);
    const n = t.slice(0, r);
    const i = e.slice(r);
    const u = e.slice(0, r);
    const p = M(n, u);
    const a = M(o, i);
    const s = M(m(n, o), m(u, i));
    const l = m(m(p, q(b(b(s, p), a), r)), q(a, 2 * r));
    return h(l), l;
  }
  function N(t, r, o) {
    return new p(t < e ? I(r, t) : S(r, f(t)), o);
  }
  function E(t) {
    let r;
    let o;
    let n;
    let i;
    const u = t.length;
    const p = y(u + u);
    const a = e;
    for (n = 0; n < u; n++) {
      o = 0 - (i = t[n]) * i;
      for (let s = n; s < u; s++)
        (r = i * t[s] * 2 + p[n + s] + o),
          (o = Math.floor(r / a)),
          (p[n + s] = r - o * a);
      p[n + u] = o;
    }
    return h(p), p;
  }
  function O(t, e) {
    let r;
    let o;
    let n;
    let i;
    const u = t.length;
    const p = y(u);
    for (n = 0, r = u - 1; r >= 0; --r)
      (n = (i = 1e7 * n + t[r]) - (o = g(i / e)) * e), (p[r] = 0 | o);
    return [p, 0 | n];
  }
  function B(t, r) {
    let o;
    const n = K(r);
    if (i) return [new s(t.value / n.value), new s(t.value % n.value)];
    let l;
    const c = t.value;
    let m = n.value;
    if (m === 0) throw new Error('Cannot divide by zero');
    if (t.isSmall)
      return n.isSmall ? [new a(g(c / m)), new a(c % m)] : [u[0], t];
    if (n.isSmall) {
      if (m === 1) return [t, u[0]];
      if (m == -1) return [t.negate(), u[0]];
      const d = Math.abs(m);
      if (d < e) {
        l = v((o = O(c, d))[0]);
        let w = o[1];
        return (
          t.sign && (w = -w),
          typeof l === 'number'
            ? (t.sign !== n.sign && (l = -l), [new a(l), new a(w)])
            : [new p(l, t.sign !== n.sign), new a(w)]
        );
      }
      m = f(d);
    }
    const S = A(c, m);
    if (S === -1) return [u[0], t];
    if (S === 0) return [u[t.sign === n.sign ? 1 : -1], u[0]];
    (o =
      c.length + m.length <= 200
        ? (function (t, r) {
            let o;
            let n;
            let i;
            let u;
            let p;
            let a;
            let s;
            const l = t.length;
            const f = r.length;
            const h = e;
            const g = y(r.length);
            let c = r[f - 1];
            const m = Math.ceil(h / (2 * c));
            let d = I(t, m);
            const b = I(r, m);
            for (
              d.length <= l && d.push(0), b.push(0), c = b[f - 1], n = l - f;
              n >= 0;
              n--
            ) {
              for (
                o = h - 1,
                  d[n + f] !== c &&
                    (o = Math.floor((d[n + f] * h + d[n + f - 1]) / c)),
                  i = 0,
                  u = 0,
                  a = b.length,
                  p = 0;
                p < a;
                p++
              )
                (i += o * b[p]),
                  (s = Math.floor(i / h)),
                  (u += d[n + p] - (i - s * h)),
                  (i = s),
                  u < 0
                    ? ((d[n + p] = u + h), (u = -1))
                    : ((d[n + p] = u), (u = 0));
              for (; u !== 0; ) {
                for (o -= 1, i = 0, p = 0; p < a; p++)
                  (i += d[n + p] - h + b[p]) < 0
                    ? ((d[n + p] = i + h), (i = 0))
                    : ((d[n + p] = i), (i = 1));
                u += i;
              }
              g[n] = o;
            }
            return (d = O(d, m)[0]), [v(g), v(d)];
          })(c, m)
        : (function (t, r) {
            for (
              var o,
                n,
                i,
                u,
                p,
                a = t.length,
                s = r.length,
                l = [],
                f = [],
                y = e;
              a;

            )
              if ((f.unshift(t[--a]), h(f), A(f, r) < 0)) l.push(0);
              else {
                (i = f[(n = f.length) - 1] * y + f[n - 2]),
                  (u = r[s - 1] * y + r[s - 2]),
                  n > s && (i = (i + 1) * y),
                  (o = Math.ceil(i / u));
                do {
                  if (A((p = I(r, o)), f) <= 0) break;
                  o--;
                } while (o);
                l.push(o), (f = b(f, p));
              }
            return l.reverse(), [v(l), v(f)];
          })(c, m)),
      (l = o[0]);
    const q = t.sign !== n.sign;
    let M = o[1];
    const N = t.sign;
    return (
      typeof l === 'number'
        ? (q && (l = -l), (l = new a(l)))
        : (l = new p(l, q)),
      typeof M === 'number'
        ? (N && (M = -M), (M = new a(M)))
        : (M = new p(M, N)),
      [l, M]
    );
  }
  function A(t, e) {
    if (t.length !== e.length) return t.length > e.length ? 1 : -1;
    for (let r = t.length - 1; r >= 0; r--)
      if (t[r] !== e[r]) return t[r] > e[r] ? 1 : -1;
    return 0;
  }
  function P(t) {
    const e = t.abs();
    return (
      !e.isUnit() &&
      (Boolean(e.equals(2) || e.equals(3) || e.equals(5)) ||
        (!(e.isEven() || e.isDivisibleBy(3) || e.isDivisibleBy(5)) &&
          (Boolean(e.lesser(49)) || void 0)))
    );
  }
  function Z(t, e) {
    for (var r, o, n, i = t.prev(), u = i, p = 0; u.isEven(); )
      (u = u.divide(2)), p++;
    t: for (o = 0; o < e.length; o++)
      if (
        !t.lesser(e[o]) &&
        !(n = bigInt(e[o]).modPow(u, t)).isUnit() &&
        !n.equals(i)
      ) {
        for (r = p - 1; r != 0; r--) {
          if ((n = n.square().mod(t)).isUnit()) return !1;
          if (n.equals(i)) continue t;
        }
        return !1;
      }
    return !0;
  }
  (p.prototype = Object.create(u.prototype)),
    (a.prototype = Object.create(u.prototype)),
    (s.prototype = Object.create(u.prototype)),
    (p.prototype.add = function (t) {
      const e = K(t);
      if (this.sign !== e.sign) return this.subtract(e.negate());
      const r = this.value;
      const o = e.value;
      return e.isSmall
        ? new p(d(r, Math.abs(o)), this.sign)
        : new p(m(r, o), this.sign);
    }),
    (p.prototype.plus = p.prototype.add),
    (a.prototype.add = function (t) {
      const e = K(t);
      const r = this.value;
      if (r < 0 !== e.sign) return this.subtract(e.negate());
      let o = e.value;
      if (e.isSmall) {
        if (l(r + o)) return new a(r + o);
        o = f(Math.abs(o));
      }
      return new p(d(o, Math.abs(r)), r < 0);
    }),
    (a.prototype.plus = a.prototype.add),
    (s.prototype.add = function (t) {
      return new s(this.value + K(t).value);
    }),
    (s.prototype.plus = s.prototype.add),
    (p.prototype.subtract = function (t) {
      const e = K(t);
      if (this.sign !== e.sign) return this.add(e.negate());
      const r = this.value;
      const o = e.value;
      return e.isSmall
        ? w(r, Math.abs(o), this.sign)
        : (function (t, e, r) {
            let o;
            return (
              A(t, e) >= 0 ? (o = b(t, e)) : ((o = b(e, t)), (r = !r)),
              typeof (o = v(o)) === 'number'
                ? (r && (o = -o), new a(o))
                : new p(o, r)
            );
          })(r, o, this.sign);
    }),
    (p.prototype.minus = p.prototype.subtract),
    (a.prototype.subtract = function (t) {
      const e = K(t);
      const r = this.value;
      if (r < 0 !== e.sign) return this.add(e.negate());
      const o = e.value;
      return e.isSmall ? new a(r - o) : w(o, Math.abs(r), r >= 0);
    }),
    (a.prototype.minus = a.prototype.subtract),
    (s.prototype.subtract = function (t) {
      return new s(this.value - K(t).value);
    }),
    (s.prototype.minus = s.prototype.subtract),
    (p.prototype.negate = function () {
      return new p(this.value, !this.sign);
    }),
    (a.prototype.negate = function () {
      const t = this.sign;
      const e = new a(-this.value);
      return (e.sign = !t), e;
    }),
    (s.prototype.negate = function () {
      return new s(-this.value);
    }),
    (p.prototype.abs = function () {
      return new p(this.value, !1);
    }),
    (a.prototype.abs = function () {
      return new a(Math.abs(this.value));
    }),
    (s.prototype.abs = function () {
      return new s(this.value >= 0 ? this.value : -this.value);
    }),
    (p.prototype.multiply = function (t) {
      let r;
      let o;
      let n;
      const i = K(t);
      const a = this.value;
      let s = i.value;
      const l = this.sign !== i.sign;
      if (i.isSmall) {
        if (s === 0) return u[0];
        if (s === 1) return this;
        if (s === -1) return this.negate();
        if ((r = Math.abs(s)) < e) return new p(I(a, r), l);
        s = f(r);
      }
      return (
        (o = a.length),
        (n = s.length),
        new p(-0.012 * o - 0.012 * n + 15e-6 * o * n > 0 ? M(a, s) : S(a, s), l)
      );
    }),
    (p.prototype.times = p.prototype.multiply),
    (a.prototype._multiplyBySmall = function (t) {
      return l(t.value * this.value)
        ? new a(t.value * this.value)
        : N(Math.abs(t.value), f(Math.abs(this.value)), this.sign !== t.sign);
    }),
    (p.prototype._multiplyBySmall = function (t) {
      return t.value === 0
        ? u[0]
        : t.value === 1
        ? this
        : t.value === -1
        ? this.negate()
        : N(Math.abs(t.value), this.value, this.sign !== t.sign);
    }),
    (a.prototype.multiply = function (t) {
      return K(t)._multiplyBySmall(this);
    }),
    (a.prototype.times = a.prototype.multiply),
    (s.prototype.multiply = function (t) {
      return new s(this.value * K(t).value);
    }),
    (s.prototype.times = s.prototype.multiply),
    (p.prototype.square = function () {
      return new p(E(this.value), !1);
    }),
    (a.prototype.square = function () {
      const t = this.value * this.value;
      return l(t) ? new a(t) : new p(E(f(Math.abs(this.value))), !1);
    }),
    (s.prototype.square = function (t) {
      return new s(this.value * this.value);
    }),
    (p.prototype.divmod = function (t) {
      const e = B(this, t);
      return { quotient: e[0], remainder: e[1] };
    }),
    (s.prototype.divmod = a.prototype.divmod = p.prototype.divmod),
    (p.prototype.divide = function (t) {
      return B(this, t)[0];
    }),
    (s.prototype.over = s.prototype.divide = function (t) {
      return new s(this.value / K(t).value);
    }),
    (a.prototype.over = a.prototype.divide = p.prototype.over =
      p.prototype.divide),
    (p.prototype.mod = function (t) {
      return B(this, t)[1];
    }),
    (s.prototype.mod = s.prototype.remainder = function (t) {
      return new s(this.value % K(t).value);
    }),
    (a.prototype.remainder = a.prototype.mod = p.prototype.remainder =
      p.prototype.mod),
    (p.prototype.pow = function (t) {
      let e;
      let r;
      let o;
      const n = K(t);
      const i = this.value;
      let p = n.value;
      if (p === 0) return u[1];
      if (i === 0) return u[0];
      if (i === 1) return u[1];
      if (i === -1) return n.isEven() ? u[1] : u[-1];
      if (n.sign) return u[0];
      if (!n.isSmall)
        throw new Error(`The exponent ${n.toString()} is too large.`);
      if (this.isSmall && l((e = Math.pow(i, p)))) return new a(g(e));
      for (r = this, o = u[1]; !0 & p && ((o = o.times(r)), --p), p !== 0; )
        (p /= 2), (r = r.square());
      return o;
    }),
    (a.prototype.pow = p.prototype.pow),
    (s.prototype.pow = function (t) {
      const e = K(t);
      const r = this.value;
      let o = e.value;
      const n = BigInt(0);
      const i = BigInt(1);
      const p = BigInt(2);
      if (o === n) return u[1];
      if (r === n) return u[0];
      if (r === i) return u[1];
      if (r === BigInt(-1)) return e.isEven() ? u[1] : u[-1];
      if (e.isNegative()) return new s(n);
      for (
        var a = this, l = u[1];
        (o & i) === i && ((l = l.times(a)), --o), o !== n;

      )
        (o /= p), (a = a.square());
      return l;
    }),
    (p.prototype.modPow = function (t, e) {
      if (((t = K(t)), (e = K(e)).isZero()))
        throw new Error('Cannot take modPow with modulus 0');
      let r = u[1];
      let o = this.mod(e);
      for (
        t.isNegative() && ((t = t.multiply(u[-1])), (o = o.modInv(e)));
        t.isPositive();

      ) {
        if (o.isZero()) return u[0];
        t.isOdd() && (r = r.multiply(o).mod(e)),
          (t = t.divide(2)),
          (o = o.square().mod(e));
      }
      return r;
    }),
    (s.prototype.modPow = a.prototype.modPow = p.prototype.modPow),
    (p.prototype.compareAbs = function (t) {
      const e = K(t);
      const r = this.value;
      const o = e.value;
      return e.isSmall ? 1 : A(r, o);
    }),
    (a.prototype.compareAbs = function (t) {
      const e = K(t);
      const r = Math.abs(this.value);
      let o = e.value;
      return e.isSmall ? (r === (o = Math.abs(o)) ? 0 : r > o ? 1 : -1) : -1;
    }),
    (s.prototype.compareAbs = function (t) {
      let e = this.value;
      let r = K(t).value;
      return (e = e >= 0 ? e : -e) === (r = r >= 0 ? r : -r)
        ? 0
        : e > r
        ? 1
        : -1;
    }),
    (p.prototype.compare = function (t) {
      if (t === 1 / 0) return -1;
      if (t === -1 / 0) return 1;
      const e = K(t);
      const r = this.value;
      const o = e.value;
      return this.sign !== e.sign
        ? e.sign
          ? 1
          : -1
        : e.isSmall
        ? this.sign
          ? -1
          : 1
        : A(r, o) * (this.sign ? -1 : 1);
    }),
    (p.prototype.compareTo = p.prototype.compare),
    (a.prototype.compare = function (t) {
      if (t === 1 / 0) return -1;
      if (t === -1 / 0) return 1;
      const e = K(t);
      const r = this.value;
      const o = e.value;
      return e.isSmall
        ? r == o
          ? 0
          : r > o
          ? 1
          : -1
        : r < 0 !== e.sign
        ? r < 0
          ? -1
          : 1
        : r < 0
        ? 1
        : -1;
    }),
    (a.prototype.compareTo = a.prototype.compare),
    (s.prototype.compare = function (t) {
      if (t === 1 / 0) return -1;
      if (t === -1 / 0) return 1;
      const e = this.value;
      const r = K(t).value;
      return e === r ? 0 : e > r ? 1 : -1;
    }),
    (s.prototype.compareTo = s.prototype.compare),
    (p.prototype.equals = function (t) {
      return this.compare(t) === 0;
    }),
    (s.prototype.eq = s.prototype.equals = a.prototype.eq = a.prototype.equals = p.prototype.eq =
      p.prototype.equals),
    (p.prototype.notEquals = function (t) {
      return this.compare(t) !== 0;
    }),
    (s.prototype.neq = s.prototype.notEquals = a.prototype.neq = a.prototype.notEquals = p.prototype.neq =
      p.prototype.notEquals),
    (p.prototype.greater = function (t) {
      return this.compare(t) > 0;
    }),
    (s.prototype.gt = s.prototype.greater = a.prototype.gt = a.prototype.greater = p.prototype.gt =
      p.prototype.greater),
    (p.prototype.lesser = function (t) {
      return this.compare(t) < 0;
    }),
    (s.prototype.lt = s.prototype.lesser = a.prototype.lt = a.prototype.lesser = p.prototype.lt =
      p.prototype.lesser),
    (p.prototype.greaterOrEquals = function (t) {
      return this.compare(t) >= 0;
    }),
    (s.prototype.geq = s.prototype.greaterOrEquals = a.prototype.geq = a.prototype.greaterOrEquals = p.prototype.geq =
      p.prototype.greaterOrEquals),
    (p.prototype.lesserOrEquals = function (t) {
      return this.compare(t) <= 0;
    }),
    (s.prototype.leq = s.prototype.lesserOrEquals = a.prototype.leq = a.prototype.lesserOrEquals = p.prototype.leq =
      p.prototype.lesserOrEquals),
    (p.prototype.isEven = function () {
      return (1 & this.value[0]) == 0;
    }),
    (a.prototype.isEven = function () {
      return (1 & this.value) == 0;
    }),
    (s.prototype.isEven = function () {
      return (this.value & BigInt(1)) === BigInt(0);
    }),
    (p.prototype.isOdd = function () {
      return (1 & this.value[0]) == 1;
    }),
    (a.prototype.isOdd = function () {
      return (1 & this.value) == 1;
    }),
    (s.prototype.isOdd = function () {
      return (this.value & BigInt(1)) === BigInt(1);
    }),
    (p.prototype.isPositive = function () {
      return !this.sign;
    }),
    (a.prototype.isPositive = function () {
      return this.value > 0;
    }),
    (s.prototype.isPositive = a.prototype.isPositive),
    (p.prototype.isNegative = function () {
      return this.sign;
    }),
    (a.prototype.isNegative = function () {
      return this.value < 0;
    }),
    (s.prototype.isNegative = a.prototype.isNegative),
    (p.prototype.isUnit = function () {
      return !1;
    }),
    (a.prototype.isUnit = function () {
      return Math.abs(this.value) === 1;
    }),
    (s.prototype.isUnit = function () {
      return this.abs().value === BigInt(1);
    }),
    (p.prototype.isZero = function () {
      return !1;
    }),
    (a.prototype.isZero = function () {
      return this.value === 0;
    }),
    (s.prototype.isZero = function () {
      return this.value === BigInt(0);
    }),
    (p.prototype.isDivisibleBy = function (t) {
      const e = K(t);
      return (
        !e.isZero() &&
        (Boolean(e.isUnit()) ||
          (e.compareAbs(2) === 0 ? this.isEven() : this.mod(e).isZero()))
      );
    }),
    (s.prototype.isDivisibleBy = a.prototype.isDivisibleBy =
      p.prototype.isDivisibleBy),
    (p.prototype.isPrime = function (e) {
      const r = P(this);
      if (r !== t) return r;
      const o = this.abs();
      const n = o.bitLength();
      if (n <= 64) return Z(o, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
      for (
        var i = Math.log(2) * n.toJSNumber(),
          u = Math.ceil(!0 === e ? 2 * Math.pow(i, 2) : i),
          p = [],
          a = 0;
        a < u;
        a++
      )
        p.push(bigInt(a + 2));
      return Z(o, p);
    }),
    (s.prototype.isPrime = a.prototype.isPrime = p.prototype.isPrime),
    (p.prototype.isProbablePrime = function (e, r) {
      const o = P(this);
      if (o !== t) return o;
      for (var n = this.abs(), i = e === t ? 5 : e, u = [], p = 0; p < i; p++)
        u.push(bigInt.randBetween(2, n.minus(2), r));
      return Z(n, u);
    }),
    (s.prototype.isProbablePrime = a.prototype.isProbablePrime =
      p.prototype.isProbablePrime),
    (p.prototype.modInv = function (t) {
      for (
        var e, r, o, n = bigInt.zero, i = bigInt.one, u = K(t), p = this.abs();
        !p.isZero();

      )
        (e = u.divide(p)),
          (r = n),
          (o = u),
          (n = i),
          (u = p),
          (i = r.subtract(e.multiply(i))),
          (p = o.subtract(e.multiply(p)));
      if (!u.isUnit())
        throw new Error(
          `${this.toString()} and ${t.toString()} are not co-prime`,
        );
      return (
        n.compare(0) === -1 && (n = n.add(t)),
        this.isNegative() ? n.negate() : n
      );
    }),
    (s.prototype.modInv = a.prototype.modInv = p.prototype.modInv),
    (p.prototype.next = function () {
      const t = this.value;
      return this.sign ? w(t, 1, this.sign) : new p(d(t, 1), this.sign);
    }),
    (a.prototype.next = function () {
      const t = this.value;
      return t + 1 < r ? new a(t + 1) : new p(o, !1);
    }),
    (s.prototype.next = function () {
      return new s(this.value + BigInt(1));
    }),
    (p.prototype.prev = function () {
      const t = this.value;
      return this.sign ? new p(d(t, 1), !0) : w(t, 1, this.sign);
    }),
    (a.prototype.prev = function () {
      const t = this.value;
      return t - 1 > -r ? new a(t - 1) : new p(o, !0);
    }),
    (s.prototype.prev = function () {
      return new s(this.value - BigInt(1));
    });
  for (var x = [1]; 2 * x[x.length - 1] <= e; ) x.push(2 * x[x.length - 1]);
  const J = x.length;
  const L = x[J - 1];
  function U(t) {
    return Math.abs(t) <= e;
  }
  function T(t, e, r) {
    e = K(e);
    for (
      var o = t.isNegative(),
        n = e.isNegative(),
        i = o ? t.not() : t,
        u = n ? e.not() : e,
        p = 0,
        a = 0,
        s = null,
        l = null,
        f = [];
      !i.isZero() || !u.isZero();

    )
      (p = (s = B(i, L))[1].toJSNumber()),
        o && (p = L - 1 - p),
        (a = (l = B(u, L))[1].toJSNumber()),
        n && (a = L - 1 - a),
        (i = s[0]),
        (u = l[0]),
        f.push(r(p, a));
    for (
      var v = r(o ? 1 : 0, n ? 1 : 0) !== 0 ? bigInt(-1) : bigInt(0),
        h = f.length - 1;
      h >= 0;
      h -= 1
    )
      v = v.multiply(L).add(bigInt(f[h]));
    return v;
  }
  (p.prototype.shiftLeft = function (t) {
    let e = K(t).toJSNumber();
    if (!U(e)) throw new Error(`${String(e)} is too large for shifting.`);
    if (e < 0) return this.shiftRight(-e);
    let r = this;
    if (r.isZero()) return r;
    for (; e >= J; ) (r = r.multiply(L)), (e -= J - 1);
    return r.multiply(x[e]);
  }),
    (s.prototype.shiftLeft = a.prototype.shiftLeft = p.prototype.shiftLeft),
    (p.prototype.shiftRight = function (t) {
      let e;
      let r = K(t).toJSNumber();
      if (!U(r)) throw new Error(`${String(r)} is too large for shifting.`);
      if (r < 0) return this.shiftLeft(-r);
      for (var o = this; r >= J; ) {
        if (o.isZero() || (o.isNegative() && o.isUnit())) return o;
        (o = (e = B(o, L))[1].isNegative() ? e[0].prev() : e[0]), (r -= J - 1);
      }
      return (e = B(o, x[r]))[1].isNegative() ? e[0].prev() : e[0];
    }),
    (s.prototype.shiftRight = a.prototype.shiftRight = p.prototype.shiftRight),
    (p.prototype.not = function () {
      return this.negate().prev();
    }),
    (s.prototype.not = a.prototype.not = p.prototype.not),
    (p.prototype.and = function (t) {
      return T(this, t, function (t, e) {
        return t & e;
      });
    }),
    (s.prototype.and = a.prototype.and = p.prototype.and),
    (p.prototype.or = function (t) {
      return T(this, t, function (t, e) {
        return t | e;
      });
    }),
    (s.prototype.or = a.prototype.or = p.prototype.or),
    (p.prototype.xor = function (t) {
      return T(this, t, function (t, e) {
        return t ^ e;
      });
    }),
    (s.prototype.xor = a.prototype.xor = p.prototype.xor);
  const j = 1 << 30;
  function C(t) {
    const r = t.value;
    const o =
      typeof r === 'number'
        ? r | j
        : typeof r === 'bigint'
        ? r | BigInt(j)
        : (r[0] + r[1] * e) | 1073758208;
    return o & -o;
  }
  function D(t, e) {
    if (e.compareTo(t) <= 0) {
      const r = D(t, e.square(e));
      const o = r.p;
      const n = r.e;
      const i = o.multiply(e);
      return i.compareTo(t) <= 0 ? { p: i, e: 2 * n + 1 } : { p: o, e: 2 * n };
    }
    return { p: bigInt(1), e: 0 };
  }
  function z(t, e) {
    return (t = K(t)), (e = K(e)), t.greater(e) ? t : e;
  }
  function R(t, e) {
    return (t = K(t)), (e = K(e)), t.lesser(e) ? t : e;
  }
  function k(t, e) {
    if (((t = K(t).abs()), (e = K(e).abs()), t.equals(e))) return t;
    if (t.isZero()) return e;
    if (e.isZero()) return t;
    for (var r, o, n = u[1]; t.isEven() && e.isEven(); )
      (r = R(C(t), C(e))),
        (t = t.divide(r)),
        (e = e.divide(r)),
        (n = n.multiply(r));
    for (; t.isEven(); ) t = t.divide(C(t));
    do {
      for (; e.isEven(); ) e = e.divide(C(e));
      t.greater(e) && ((o = e), (e = t), (t = o)), (e = e.subtract(t));
    } while (!e.isZero());
    return n.isUnit() ? t : t.multiply(n);
  }
  (p.prototype.bitLength = function () {
    let t = this;
    return (
      t.compareTo(bigInt(0)) < 0 && (t = t.negate().subtract(bigInt(1))),
      t.compareTo(bigInt(0)) === 0
        ? bigInt(0)
        : bigInt(D(t, bigInt(2)).e).add(bigInt(1))
    );
  }),
    (s.prototype.bitLength = a.prototype.bitLength = p.prototype.bitLength);
  var _ = function (t, e, r, o) {
    (r = r || n),
      (t = String(t)),
      o || ((t = t.toLowerCase()), (r = r.toLowerCase()));
    let i;
    const u = t.length;
    const p = Math.abs(e);
    const a = {};
    for (i = 0; i < r.length; i++) a[r[i]] = i;
    for (i = 0; i < u; i++) {
      if ((f = t[i]) !== '-' && f in a && a[f] >= p) {
        if (f === '1' && p === 1) continue;
        throw new Error(`${f} is not a valid digit in base ${e}.`);
      }
    }
    e = K(e);
    const s = [];
    const l = t[0] === '-';
    for (i = l ? 1 : 0; i < t.length; i++) {
      var f;
      if ((f = t[i]) in a) s.push(K(a[f]));
      else {
        if (f !== '<') throw new Error(`${f} is not a valid character`);
        const v = i;
        do {
          i++;
        } while (t[i] !== '>' && i < t.length);
        s.push(K(t.slice(v + 1, i)));
      }
    }
    return $(s, e, l);
  };
  function $(t, e, r) {
    let o;
    let n = u[0];
    let i = u[1];
    for (o = t.length - 1; o >= 0; o--)
      (n = n.add(t[o].times(i))), (i = i.times(e));
    return r ? n.negate() : n;
  }
  function F(t, e) {
    if ((e = bigInt(e)).isZero()) {
      if (t.isZero()) return { value: [0], isNegative: !1 };
      throw new Error('Cannot convert nonzero numbers to base 0.');
    }
    if (e.equals(-1)) {
      if (t.isZero()) return { value: [0], isNegative: !1 };
      if (t.isNegative())
        return {
          value: [].concat.apply(
            [],
            Array.apply(null, Array(-t.toJSNumber())).map(
              Array.prototype.valueOf,
              [1, 0],
            ),
          ),
          isNegative: !1,
        };
      const r = Array.apply(null, Array(t.toJSNumber() - 1)).map(
        Array.prototype.valueOf,
        [0, 1],
      );
      return r.unshift([1]), { value: [].concat.apply([], r), isNegative: !1 };
    }
    let o = !1;
    if (
      (t.isNegative() && e.isPositive() && ((o = !0), (t = t.abs())),
      e.isUnit())
    )
      return t.isZero()
        ? { value: [0], isNegative: !1 }
        : {
            value: Array.apply(null, Array(t.toJSNumber())).map(
              Number.prototype.valueOf,
              1,
            ),
            isNegative: o,
          };
    for (var n, i = [], u = t; u.isNegative() || u.compareAbs(e) >= 0; ) {
      (n = u.divmod(e)), (u = n.quotient);
      let p = n.remainder;
      p.isNegative() && ((p = e.minus(p).abs()), (u = u.next())),
        i.push(p.toJSNumber());
    }
    return i.push(u.toJSNumber()), { value: i.reverse(), isNegative: o };
  }
  function G(t, e, r) {
    const o = F(t, e);
    return (
      (o.isNegative ? '-' : '') +
      o.value
        .map(function (t) {
          return (function (t, e) {
            return t < (e = e || n).length ? e[t] : `<${t}>`;
          })(t, r);
        })
        .join('')
    );
  }
  function H(t) {
    if (l(Number(t))) {
      const e = Number(t);
      if (e === g(e)) return i ? new s(BigInt(e)) : new a(e);
      throw new Error(`Invalid integer: ${t}`);
    }
    const r = t[0] === '-';
    r && (t = t.slice(1));
    const o = t.split(/e/i);
    if (o.length > 2) throw new Error(`Invalid integer: ${o.join('e')}`);
    if (o.length === 2) {
      let n = o[1];
      if ((n[0] === '+' && (n = n.slice(1)), (n = Number(n)) !== g(n) || !l(n)))
        throw new Error(`Invalid integer: ${n} is not a valid exponent.`);
      let u = o[0];
      const f = u.indexOf('.');
      if (
        (f >= 0 &&
          ((n -= u.length - f - 1), (u = u.slice(0, f) + u.slice(f + 1))),
        n < 0)
      )
        throw new Error('Cannot include negative exponent part for integers');
      t = u += new Array(n + 1).join('0');
    }
    if (!/^([0-9][0-9]*)$/.test(t)) throw new Error(`Invalid integer: ${t}`);
    if (i) return new s(BigInt(r ? `-${t}` : t));
    for (var v = [], y = t.length, c = y - 7; y > 0; )
      v.push(Number(t.slice(c, y))), (c -= 7) < 0 && (c = 0), (y -= 7);
    return h(v), new p(v, r);
  }
  function K(t) {
    return typeof t === 'number'
      ? (function (t) {
          if (i) return new s(BigInt(t));
          if (l(t)) {
            if (t !== g(t)) throw new Error(`${t} is not an integer.`);
            return new a(t);
          }
          return H(t.toString());
        })(t)
      : typeof t === 'string'
      ? H(t)
      : typeof t === 'bigint'
      ? new s(t)
      : t;
  }
  (p.prototype.toArray = function (t) {
    return F(this, t);
  }),
    (a.prototype.toArray = function (t) {
      return F(this, t);
    }),
    (s.prototype.toArray = function (t) {
      return F(this, t);
    }),
    (p.prototype.toString = function (e, r) {
      if ((e === t && (e = 10), e !== 10)) return G(this, e, r);
      for (var o, n = this.value, i = n.length, u = String(n[--i]); --i >= 0; )
        (o = String(n[i])), (u += '0000000'.slice(o.length) + o);
      return (this.sign ? '-' : '') + u;
    }),
    (a.prototype.toString = function (e, r) {
      return e === t && (e = 10), e != 10 ? G(this, e, r) : String(this.value);
    }),
    (s.prototype.toString = a.prototype.toString),
    (s.prototype.toJSON = p.prototype.toJSON = a.prototype.toJSON = function () {
      return this.toString();
    }),
    (p.prototype.valueOf = function () {
      return parseInt(this.toString(), 10);
    }),
    (p.prototype.toJSNumber = p.prototype.valueOf),
    (a.prototype.valueOf = function () {
      return this.value;
    }),
    (a.prototype.toJSNumber = a.prototype.valueOf),
    (s.prototype.valueOf = s.prototype.toJSNumber = function () {
      return parseInt(this.toString(), 10);
    });
  for (let Q = 0; Q < 1e3; Q++) (u[Q] = K(Q)), Q > 0 && (u[-Q] = K(-Q));
  return (
    (u.one = u[1]),
    (u.zero = u[0]),
    (u.minusOne = u[-1]),
    (u.max = z),
    (u.min = R),
    (u.gcd = k),
    (u.lcm = function (t, e) {
      return (t = K(t).abs()), (e = K(e).abs()), t.divide(k(t, e)).multiply(e);
    }),
    (u.isInstance = function (t) {
      return t instanceof p || t instanceof a || t instanceof s;
    }),
    (u.randBetween = function (t, r, o) {
      (t = K(t)), (r = K(r));
      const n = o || Math.random;
      const i = R(t, r);
      const p = z(t, r).subtract(i).add(1);
      if (p.isSmall) return i.add(Math.floor(n() * p));
      for (var a = F(p, e).value, s = [], l = !0, f = 0; f < a.length; f++) {
        const v = l ? a[f] + (f + 1 < a.length ? a[f + 1] / e : 0) : e;
        const h = g(n() * v);
        s.push(h), h < a[f] && (l = !1);
      }
      return i.add(u.fromArray(s, e, !1));
    }),
    (u.fromArray = function (t, e, r) {
      return $(t.map(K), K(e || 10), r);
    }),
    u
  );
})();
if (typeof window !== "undefined") {
  window.bigInt = bigInt;
}
global.bigInt = bigInt;
typeof module !== 'undefined' &&
  module.hasOwnProperty('exports') &&
  (module.exports = bigInt),
  typeof define === 'function' &&
    define.amd &&
    define(function () {
      return bigInt;
    });