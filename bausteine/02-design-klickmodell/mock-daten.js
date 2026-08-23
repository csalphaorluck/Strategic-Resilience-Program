/**
 * ============================================================================
 * PLATZHALTER-SCHEMA — NICHT Baustein 1
 * ============================================================================
 * Dies ist ein minimales Mock-Datenschema für Baustein 2 (Design &
 * Klickmodell), solange das echte Datenmodell aus Baustein 1 noch nicht im
 * Repo vorliegt. Fiktive Beispieldaten, keine echten Flughafendaten.
 *
 * Regel: Der restliche Code in diesem Ordner greift NIE direkt auf
 * SRP_PLATZHALTER_DATEN zu, sondern immer nur über holeBaumDaten() unten.
 * Beim Austausch gegen das Baustein-1-Schema muss im Idealfall nur diese
 * Datei ersetzt werden (holeBaumDaten() bleibt die einzige Schnittstelle).
 * ============================================================================
 */

// Ein Knoten kann eine Bewertung tragen (dann ist er der "tiefste befüllte
// Punkt" seines Pfads) oder nicht (dann ist er nur strukturell / Grau).
// ebene: 1=Kategorie, 2=Unterkategorie, 3=Themenbereich, 4=Komponente, 5=Sub-Komponente
// risiko: "grau" | "gruen" | "gelb" | "rot"
const SRP_PLATZHALTER_DATEN = {
  id: "root",
  name: "Flughafen (Platzhalter)",
  kinder: [
    {
      id: "infrastruktur",
      ebene: 1,
      name: "Infrastruktur",
      kinder: [
        {
          id: "infra-technik",
          ebene: 2,
          name: "Technik",
          kinder: [
            {
              id: "infra-technik-landebahn",
              ebene: 3,
              name: "Landebahn",
              kinder: [
                {
                  id: "infra-technik-landebahn-beschilderung",
                  ebene: 4,
                  name: "Beschilderung",
                  kinder: [
                    {
                      id: "infra-technik-landebahn-beschilderung-kabel",
                      ebene: 5,
                      name: "Kabel",
                      kinder: [],
                      bewertung: {
                        risiko: "rot",
                        beschreibung:
                          "Kabel hält nur bis 42°C, bei 40°C Außentemperatur kritisch.",
                        massnahme:
                          "Neue Kabel verbauen, die bis 50°C ausgelegt sind.",
                        tracking: { durchgefuehrt: false, datum: null },
                        risikoNachMassnahme: null,
                      },
                    },
                    {
                      id: "infra-technik-landebahn-beschilderung-lesbarkeit",
                      ebene: 5,
                      name: "Lesbarkeit/Verformung",
                      kinder: [],
                      bewertung: {
                        risiko: "gelb",
                        beschreibung:
                          "Verformung der Schilder bei Extremhitze möglich, Lesbarkeit eingeschränkt.",
                        massnahme: "Hitzebeständiges Material prüfen.",
                        tracking: { durchgefuehrt: false, datum: null },
                        risikoNachMassnahme: null,
                      },
                    },
                  ],
                  bewertung: null,
                },
              ],
              bewertung: null,
            },
            {
              id: "infra-technik-strom",
              ebene: 3,
              name: "Stromversorgung",
              kinder: [],
              bewertung: {
                risiko: "gruen",
                beschreibung: "Notstromversorgung ausreichend hitzegetestet.",
                massnahme: null,
                tracking: { durchgefuehrt: true, datum: "2026-05-10" },
                risikoNachMassnahme: "gruen",
              },
            },
          ],
          bewertung: null,
        },
        {
          id: "infra-gebaeude",
          ebene: 2,
          name: "Gebäude",
          kinder: [],
          // Testfall: Zweig endet bereits auf Ebene 2 UND traegt eine
          // Bewertung (laut CLAUDE.md ausdruecklich zulaessig, da Befuellung
          // ab Ebene 2 moeglich ist, nicht zwingend bis Ebene 5).
          bewertung: {
            risiko: "gelb",
            beschreibung:
              "Klimatisierung in Bürogebäuden nicht auf Dauerhitze über 40°C ausgelegt.",
            massnahme: "Kühlungskapazität prüfen und ggf. nachrüsten.",
            tracking: { durchgefuehrt: false, datum: null },
            risikoNachMassnahme: null,
          },
        },
      ],
    },
    {
      id: "betrieb",
      ebene: 1,
      name: "Flughafenbetrieb",
      kinder: [
        {
          id: "betrieb-bodenverkehr",
          ebene: 2,
          name: "Bodenverkehrsdienste",
          kinder: [
            {
              id: "betrieb-bodenverkehr-geraete",
              ebene: 3,
              name: "Geräte & Fahrzeuge",
              kinder: [],
              bewertung: {
                risiko: "gelb",
                beschreibung:
                  "Überhitzungsrisiko bei elektrischen Bodengeräten ab 38°C.",
                massnahme: "Kühlpausen und Schattenparkplätze einplanen.",
                tracking: { durchgefuehrt: false, datum: null },
                risikoNachMassnahme: null,
              },
            },
          ],
          bewertung: null,
        },
      ],
    },
    {
      id: "personal",
      ebene: 1,
      name: "Personal & Governance",
      kinder: [
        {
          id: "personal-arbeitsschutz",
          ebene: 2,
          name: "Arbeitsschutz",
          kinder: [],
          bewertung: null,
        },
      ],
    },
  ],
};

/**
 * Einzige erlaubte Zugriffsstelle auf die Mock-Daten.
 * Gibt den Wurzelknoten des Baums zurück.
 */
function holeBaumDaten() {
  return SRP_PLATZHALTER_DATEN;
}
