import assert from "node:assert/strict";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { THEME_INIT_SCRIPT } from "../lib/theme.ts";

function initialize(saved, storageBlocked = false) {
  const classes = new Set();
  const root = {
    dataset: {},
    style: {},
    classList: { toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name) },
  };
  runInNewContext(THEME_INIT_SCRIPT, {
    document: { documentElement: root },
    localStorage: { getItem: () => { if (storageBlocked) throw new Error("blocked"); return saved; } },
    window: { matchMedia: () => { throw new Error("The system theme must not be consulted"); } },
  });
  return { root, classes };
}

test("new visitors and invalid preferences start in light mode without consulting the system", () => {
  for (const saved of [null, "system", "invalid", "light"]) {
    const { root, classes } = initialize(saved);
    assert.equal(root.dataset.theme, "light");
    assert.equal(root.style.colorScheme, "light");
    assert.ok(classes.has("light"));
    assert.ok(!classes.has("dark"));
  }
});

test("an explicitly selected dark theme survives navigation and reload", () => {
  const { root, classes } = initialize("dark");
  assert.equal(root.dataset.theme, "dark");
  assert.equal(root.style.colorScheme, "dark");
  assert.ok(classes.has("dark"));
  assert.ok(!classes.has("light"));
});

test("blocked preference storage still initializes light mode", () => {
  const { root } = initialize(null, true);
  assert.equal(root.dataset.theme, "light");
  assert.equal(root.style.colorScheme, "light");
});
