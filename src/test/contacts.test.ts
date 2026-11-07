import { describe, expect, it } from "vitest";
import { CONTACTS, INTERNATIONAL, filterContacts, listCountries } from "@/data/contacts";

describe("contacts directory", () => {
  it("always includes international resources when a country is selected", () => {
    const results = filterContacts(CONTACTS, { country: "Brasil" });
    const countries = new Set(results.map((c) => c.country));
    expect(countries).toEqual(new Set(["Brasil", INTERNATIONAL]));
  });

  it("filters by type", () => {
    const results = filterContacts(CONTACTS, { country: "Portugal", type: "trafico" });
    expect(results.map((c) => c.id)).toEqual(["pt-tsh"]);
  });

  it("search ignores accents and case", () => {
    const results = filterContacts(CONTACTS, { query: "LINEA NACIONAL ANTI-TRATA" });
    expect(results.map((c) => c.id)).toContain("co-trata");
  });

  it("lists international first", () => {
    expect(listCountries()[0]).toBe(INTERNATIONAL);
  });
});
