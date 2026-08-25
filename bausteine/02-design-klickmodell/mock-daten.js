/**
 * ============================================================================
 * TESTDATEN — NICHT Baustein 1, NICHT Baustein 6
 * ============================================================================
 * Dies ist ein minimales Mock-Datenschema mit fiktiven TESTDATEN für
 * Baustein 2 (Design & Klickmodell), solange das echte Datenmodell aus
 * Baustein 1 noch nicht im Repo vorliegt. Zweck: genug Knoten und
 * Statusverteilung, um Baumdarstellung (2.3) und Verdichtung/Zähler (2.5)
 * zu testen.
 *
 * WICHTIG: Namen, Beschreibungen und Maßnahmen hier sind erfundene
 * Testfälle, keine echten Flughafendaten und keine redaktionell
 * geprüften Fachinhalte. Die echten Beispielinhalte kommen aus dem
 * Fachbereich und sind Teil von Baustein 6 — sie ersetzen die Inhalte
 * dieser Datei, nicht nur einzelne Werte darin.
 *
 * Begründungs- und Maßnahmentexte sind ABSICHTLICH generisch gehalten,
 * ohne konkrete Temperaturen, Fristen oder Mengenangaben — in Demos vor
 * Fachpublikum dürfen sie nicht wie echte fachliche Feststellungen wirken.
 * Die tatsächlichen fachlichen Bewertungen liefert der Fachbereich in
 * Baustein 6.
 *
 * Regel: Der restliche Code in diesem Ordner greift NIE direkt auf
 * SRP_PLATZHALTER_DATEN zu, sondern immer nur über holeBaumDaten() unten.
 * Beim Austausch gegen das Baustein-1-Schema (und später Baustein-6-Inhalte)
 * muss im Idealfall nur diese Datei ersetzt werden (holeBaumDaten() bleibt
 * die einzige Schnittstelle).
 * ============================================================================
 */

// Ein Knoten kann eine Bewertung tragen (dann ist er der "tiefste befüllte
// Punkt" seines Pfads) oder nicht (dann ist er nur strukturell / Grau,
// bewertung: null).
// ebene: 1=Kategorie, 2=Unterkategorie, 3=Themenbereich, 4=Komponente, 5=Sub-Komponente
// risiko: "grau" | "gruen" | "gelb" | "rot"  (nur gesetzt, wenn bewertung != null)
const SRP_PLATZHALTER_DATEN = {
  id: "root",
  name: "Flughafen (Platzhalter)",
  kinder: [
    // ========================================================================
    // Kategorie 1: Infrastruktur
    // Enthaelt den Testfall "Rot auf Ebene 5, muss bis zur Kategorie
    // durchschlagen" (Kabel) sowie eine gemischte Statusverteilung.
    // ========================================================================
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
                          "Material ist für anhaltende Hitzebelastung nicht ausreichend ausgelegt.",
                        massnahme:
                          "Hitzebeständigere Ausführung prüfen und beschaffen.",
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
                          "Verformung bei anhaltender Hitze kann die Lesbarkeit beeinträchtigen.",
                        massnahme: "Hitzebeständigeres Material prüfen.",
                        tracking: { durchgefuehrt: false, datum: null },
                        risikoNachMassnahme: null,
                      },
                    },
                  ],
                  bewertung: null,
                },
                {
                  id: "infra-technik-landebahn-rollwegmarkierung",
                  ebene: 4,
                  name: "Rollwegmarkierung",
                  kinder: [],
                  bewertung: {
                    risiko: "gruen",
                    beschreibung:
                      "Material ist für anhaltende Hitzebelastung freigegeben.",
                    massnahme: null,
                    tracking: { durchgefuehrt: false, datum: null },
                    risikoNachMassnahme: null,
                  },
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
                beschreibung: "Notstromversorgung ist für Hitzeperioden ausreichend getestet.",
                massnahme: null,
                tracking: { durchgefuehrt: true, datum: "2026-05-10" },
                risikoNachMassnahme: "gruen",
              },
            },
            {
              id: "infra-technik-serverraeume",
              ebene: 3,
              name: "IT-Serverräume",
              kinder: [],
              bewertung: {
                risiko: "gelb",
                beschreibung:
                  "Kühlleistung ist bei anhaltender Hitze grenzwertig.",
                massnahme: "Redundante Kühlung prüfen.",
                tracking: { durchgefuehrt: false, datum: null },
                risikoNachMassnahme: null,
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
              "Klimatisierung ist auf anhaltende Hitzeperioden nicht ausreichend ausgelegt.",
            massnahme: "Kühlungskapazität prüfen und bei Bedarf nachrüsten.",
            tracking: { durchgefuehrt: false, datum: null },
            risikoNachMassnahme: null,
          },
        },
        {
          id: "infra-terminalklimatisierung",
          ebene: 2,
          name: "Terminalklimatisierung",
          kinder: [
            {
              id: "infra-terminalklimatisierung-kaelteanlage",
              ebene: 3,
              name: "Zentrale Kälteanlage",
              kinder: [
                {
                  id: "infra-terminalklimatisierung-kaelteanlage-verteilnetz",
                  ebene: 4,
                  name: "Verteilnetz",
                  kinder: [],
                  bewertung: null,
                },
              ],
              bewertung: {
                risiko: "gelb",
                beschreibung:
                  "Belastung bei anhaltender Hitze ist bisher nicht systematisch geprüft.",
                massnahme: "Lastverhalten bei Hitzeperioden simulieren.",
                tracking: { durchgefuehrt: false, datum: null },
                risikoNachMassnahme: null,
              },
            },
          ],
          bewertung: null,
        },
      ],
    },

    // ========================================================================
    // Kategorie 2: Flughafenbetrieb
    // Ebenfalls gemischte Statusverteilung, mit Zweigen, die auf Ebene 2,
    // 3 und 4 enden.
    // ========================================================================
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
                  "Überhitzungsrisiko bei elektrischen Geräten während Hitzeperioden.",
                massnahme: "Kühlpausen und Schattenbereiche einplanen.",
                tracking: { durchgefuehrt: false, datum: null },
                risikoNachMassnahme: null,
              },
            },
            {
              id: "betrieb-bodenverkehr-schleppfahrzeuge",
              ebene: 3,
              name: "Schleppfahrzeuge",
              kinder: [],
              bewertung: null,
            },
          ],
          bewertung: null,
        },
        {
          id: "betrieb-betankung",
          ebene: 2,
          name: "Betankung",
          kinder: [
            {
              id: "betrieb-betankung-tanklager",
              ebene: 3,
              name: "Tanklager",
              kinder: [
                {
                  id: "betrieb-betankung-tanklager-sicherheitsventile",
                  ebene: 4,
                  name: "Sicherheitsventile",
                  kinder: [],
                  // Testfall: zweites Rot in einer anderen Kategorie
                  // (Flughafenbetrieb), Zweig endet auf Ebene 4.
                  bewertung: {
                    risiko: "rot",
                    beschreibung:
                      "Ventile dichten bei anhaltender Hitze nicht mehr zuverlässig ab.",
                    massnahme:
                      "Nachrüstung mit hitzebeständigeren Dichtungen prüfen.",
                    tracking: { durchgefuehrt: false, datum: null },
                    risikoNachMassnahme: null,
                  },
                },
                {
                  id: "betrieb-betankung-tanklager-leckageueberwachung",
                  ebene: 4,
                  name: "Leckageüberwachung",
                  kinder: [],
                  // Testfall: zwei rote Geschwisterknoten unter demselben
                  // Elternknoten (Tanklager) — Zaehler "2 rot" am
                  // Elternknoten muss vorkommen.
                  bewertung: {
                    risiko: "rot",
                    beschreibung:
                      "Überwachungssensorik kann bei anhaltender Hitze zeitweise ausfallen.",
                    massnahme:
                      "Sensorik durch eine hitzebeständigere Variante ersetzen.",
                    tracking: { durchgefuehrt: false, datum: null },
                    risikoNachMassnahme: null,
                  },
                },
              ],
              bewertung: null,
            },
            {
              id: "betrieb-betankung-fahrzeuge",
              ebene: 3,
              name: "Betankungsfahrzeuge",
              kinder: [],
              bewertung: null,
            },
          ],
          bewertung: null,
        },
        {
          id: "betrieb-gepaeckfoerderanlagen",
          ebene: 2,
          name: "Gepäckförderanlagen",
          kinder: [],
          bewertung: {
            risiko: "gelb",
            beschreibung:
              "Material kann bei anhaltender Hitze verspröden.",
            massnahme: "Hitzebeständigeres Material prüfen.",
            tracking: { durchgefuehrt: false, datum: null },
            risikoNachMassnahme: null,
          },
        },
        {
          id: "betrieb-wasserversorgung",
          ebene: 2,
          name: "Wasserversorgung",
          kinder: [
            {
              id: "betrieb-wasserversorgung-trinkwasser",
              ebene: 3,
              name: "Trinkwasserversorgung",
              kinder: [],
              bewertung: {
                risiko: "gruen",
                beschreibung:
                  "Kapazität ist auch bei erhöhtem Bedarf während Hitzeperioden ausreichend.",
                massnahme: null,
                tracking: { durchgefuehrt: false, datum: null },
                risikoNachMassnahme: null,
              },
            },
            {
              id: "betrieb-wasserversorgung-loeschwasser",
              ebene: 3,
              name: "Löschwasserversorgung",
              kinder: [],
              bewertung: {
                risiko: "gelb",
                beschreibung:
                  "Reservekapazität bei gleichzeitigem Bedarf anderer Anlagen ist ungeprüft.",
                massnahme: "Bedarfsermittlung für Hitzeperioden aktualisieren.",
                tracking: { durchgefuehrt: false, datum: null },
                risikoNachMassnahme: null,
              },
            },
          ],
          bewertung: null,
        },
      ],
    },

    // ========================================================================
    // Kategorie 3: Personal & Governance
    // Testfall: gesamte Kategorie ohne jede Bewertung (durchgehend Grau) —
    // für die Abdeckungsgrad-Anzeige in 2.5.
    // ========================================================================
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
        {
          id: "personal-schichtplanung",
          ebene: 2,
          name: "Schichtplanung",
          kinder: [
            {
              id: "personal-schichtplanung-hitzeschichten",
              ebene: 3,
              name: "Hitzeangepasste Schichtmodelle",
              kinder: [],
              bewertung: null,
            },
          ],
          bewertung: null,
        },
        {
          id: "personal-notfallkommunikation",
          ebene: 2,
          name: "Notfallkommunikation",
          kinder: [],
          bewertung: null,
        },
        {
          id: "personal-schulung",
          ebene: 2,
          name: "Schulung",
          kinder: [
            {
              id: "personal-schulung-hitzeschutz",
              ebene: 3,
              name: "Hitzeschutz-Schulung Personal",
              kinder: [],
              bewertung: null,
            },
            {
              id: "personal-schulung-fuehrungskraefte",
              ebene: 3,
              name: "Schulung Führungskräfte",
              kinder: [],
              bewertung: null,
            },
          ],
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
