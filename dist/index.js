import { Client as h } from "colyseus.js";
import { useSyncExternalStore as g } from "react";
function p(b) {
  let a = b;
  const u = /* @__PURE__ */ new Set();
  return { get: () => a, set: (r) => {
    a = r, u.forEach((f) => f(r));
  }, subscribe: (r) => (u.add(r), () => u.delete(r)) };
}
const R = (b, a) => {
  const u = new h(b), n = p(void 0), i = p(void 0);
  let l = !1;
  const r = async (t, o = {}) => {
    if (!(l || n.get())) {
      l = !0;
      try {
        const s = await u.joinOrCreate(t, o, a);
        await f(s);
      } catch (s) {
        console.error("Failed to connect to Colyseus!"), console.log(s);
      } finally {
        l = !1;
      }
    }
  }, f = async (t) => {
    var s;
    n.get() && await ((s = n.get()) == null ? void 0 : s.leave(!0)), n.set(t), i.set(t.state);
    const o = {};
    for (const [e, c] of Object.entries(t.state))
      typeof c != "object" || !c.clone || !c.onAdd || !c.onRemove || (o[e] = !1, c.onAdd(() => {
        o[e] = !0;
      }), c.onRemove(() => {
        o[e] = !0;
      }));
    t.onStateChange((e) => {
      if (!e)
        return;
      const c = { ...e };
      for (const [y, v] of Object.entries(o)) {
        if (!v)
          continue;
        o[y] = !1;
        const d = e[y];
        d.clone && (c[y] = d.clone());
      }
      i.set(c);
    });
  }, C = async (t) => {
    const o = n.get();
    if (o) {
      n.set(void 0), i.set(void 0);
      try {
        await o.leave(t), console.log("Disconnected from Colyseus!");
      } catch {
      }
    }
  }, S = () => g((s) => n.subscribe(() => s()), () => n.get());
  function m(t) {
    return g((e) => i.subscribe(() => {
      e();
    }), () => {
      const e = i.get();
      return e && t ? t(e) : e;
    });
  }
  return {
    client: u,
    connectToColyseus: r,
    setCurrentRoom: f,
    disconnectFromColyseus: C,
    useColyseusRoom: S,
    useColyseusState: m
  };
};
export {
  R as colyseus
};
