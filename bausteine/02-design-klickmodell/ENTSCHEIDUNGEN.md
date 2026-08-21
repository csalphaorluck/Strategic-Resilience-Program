# Entscheidungen – Baustein 2: Design & Klickmodell

Stand: 2026-08-21. Dieses Dokument hält die getroffenen Design-Entscheidungen für
Baustein 2 fest, bevor Code entsteht. Es referenziert die verbindlichen Vorgaben aus
der Projekt-`CLAUDE.md` und ergänzt sie um das, was dort offen gelassen wurde.

Arbeitsordner: `bausteine/02-design-klickmodell/` (Zwischenstand während der
Umsetzung — Endprodukt bleibt laut `CLAUDE.md` eine einzelne HTML-Datei).

## Bindende Vorgaben aus CLAUDE.md (nicht verhandelbar)

- 5-Ebenen-Modell: Kategorie → Unterkategorie → Themenbereich → Komponente →
  Sub-Komponente. Befüllung ab Ebene 2 möglich, nicht zwingend bis Ebene 5.
- Ampel-Skala mit genau 4 Zuständen: Grau (nicht bewertet), Grün (kein Risiko),
  Gelb (tolerierbar, Maßnahme nötig), Rot (inakzeptabel, Maßnahme-Definition
  erforderlich).
- Risikobewertung + Maßnahme hängen immer am tiefsten befüllten Punkt eines
  Pfads, nicht an jeder Ebene einzeln.
- Einzelne HTML-Datei als Endprodukt, kein Backend, keine echten
  Flughafendaten, allgemeingültig (nicht flughafenspezifisch).
- Kein produktionsreifes Rechte-/Rollensystem nötig (Vorbereitungsphase).

## 1. Klickmodell (2.1)

Sidebar-Panel-Layout: Baum links, Formular rechts. Der Baum bleibt beim
Ausfüllen sichtbar (kein Modal, das den Baum verdeckt). Formular öffnet sich
für den angeklickten Knoten im rechten Panel.

Bei schmalem Fenster (Breakpoint wird in 2.1 festgelegt) erscheint das Panel
stattdessen als Overlay über dem Baum.

## 2. Ampelfarben & Symbole (2.2)

Standard-Ampelfarben, kontrastgeprüft (WCAG AA, ≥ 4.5:1 für Text/Symbol auf
hellem Chip-Hintergrund). Jeder Status hat zusätzlich zur Farbe ein
eigenständiges Symbol, damit der Status nicht nur über Farbe (Rot-Grün-
Schwäche) erkennbar ist:

| Status | Farbe (Text/Icon) | Chip-Hintergrund | Symbol | Bedeutung |
|---|---|---|---|---|
| Grau | `#4B5563` | `#F3F4F6` | `–` | nicht bewertet |
| Grün | `#1B7A3D` | `#DCFCE7` | `✓` | kein Risiko |
| Gelb | `#92400E` | `#FEF3C7` | `!` | tolerierbar, Maßnahme nötig |
| Rot | `#B91C1C` | `#FEE2E2` | `✕` | inakzeptabel, Maßnahme-Definition erforderlich |

Die vier Symbole sind zusätzlich als Formunterschiede gedacht (Strich, Haken,
Ausrufezeichen, Kreuz) — nicht nur als Farbfläche.

Kontrast (Text/Symbol-Farbe gegen jeweiligen Chip-Hintergrund, WCAG-Formel,
Ziel ≥ 4.5:1 für Normaltext):

| Status | Kontrast auf Chip-BG | Kontrast auf Weiß |
|---|---|---|
| Grau | 6.87:1 | 7.56:1 |
| Grün | 4.91:1 | 5.39:1 |
| Gelb | 6.37:1 | 7.09:1 |
| Rot | 5.30:1 | 6.47:1 |

Alle vier Paare bestehen WCAG AA (≥ 4.5:1); Grün ist mit 4.91:1 auf dem
eigenen Chip-Hintergrund am knappsten.

## 3. Ebenen-Unterscheidung im Baum (2.3)

Rein über: Einrückung + abnehmende Schriftgröße/-stärke von Ebene 1 zu Ebene 5
+ dezente Verbindungslinien. Bewusst KEINE eigenen Icons pro Ebene — die Ampel
ist das einzige Symbol im Baum und soll optisch dominant bleiben.

## 4. Verdichtung nach oben (2.5)

„Schlechtester Wert gewinnt": Ein rotes Element färbt den gesamten Strang bis
zur Kategorie rot (Rot > Gelb > Grün in der Priorität). Zusätzlich zeigt jeder
Knoten einen kleinen Zähler (z. B. „3 rot, 2 gelb"). Grau wird NICHT verdichtet
bzw. eingefärbt, sondern separat als Abdeckungsgrad ausgewiesen (z. B. „7 von
20 bewertet").

## 5. Suche (2.4)

Zwei getrennte Mechanismen:
- (a) Freitextsuche über Knotennamen und Pfad. Treffer wird im Baum
  aufgeklappt und markiert — keine separate Ergebnisliste.
- (b) Statusfilter (z. B. „nur Rot anzeigen").

Freitextsuche über Bewertungs-/Maßnahmentext ist bewusst nicht Teil von
Baustein 2 (spätere Erweiterung).

## 6. Mock-Daten / Platzhalter-Schema

Liegt in genau einer Datei: `mock-daten.js`. Deutlich als Platzhalter markiert.
Der restliche Demo-Code greift ausschließlich über eine Zugriffsfunktion
(`holeBaumDaten()`) auf diese Datei zu — nicht direkt auf die Datenstruktur —
damit der Austausch gegen das echte Schema aus Baustein 1 später nur diese
eine Datei betrifft.

## Offen / nicht Teil von Baustein 2

- Endgültiger Breakpoint für Sidebar-Panel → Overlay (wird in 2.1 festgelegt).
- Aggregationsregel bei Gleichstand (nicht relevant, da Prioritätsreihenfolge
  Rot > Gelb > Grün eindeutig ist).
- Übernahme des echten Datenmodells aus Baustein 1 (ersetzt `mock-daten.js`
  beim finalen Merge).
