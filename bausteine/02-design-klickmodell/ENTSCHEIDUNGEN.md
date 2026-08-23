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

### Umsetzung (2.1)

- **Breakpoint für Overlay:** 760px — derselbe Wert, der in 2.2 bereits das
  Grundlayout (Baum/Panel nebeneinander vs. gestapelt) steuert. Unterhalb
  von 760px UND bei aktiver Auswahl wird das Formular-Panel per CSS zu
  einem Vollbild-Overlay (`position: fixed; inset: 0;`) mit Schließen-Button
  (×) oben rechts im Panel-Kopf. Ohne Auswahl bleibt es bei schmalem
  Fenster ein normal gestapelter Block mit dem Leerzustand-Hinweistext,
  kein Overlay ohne Inhalt.
- **Schließen:** über den ×-Button im Panel-Kopf oder die Escape-Taste,
  beides bei jeder Fensterbreite (nicht nur im Overlay-Fall), da "Auswahl
  aufheben" auch am breiten Bildschirm ein sinnvoller Zustand ist.
- **Panel-Kopf:** zeigt immer Knotenname + "Ebene X · <Ebenenbezeichnung>"
  (Kategorie/Unterkategorie/Themenbereich/Komponente/Sub-Komponente).
- **Fallunterscheidung** (Kernentscheidung, direkt aus CLAUDE.md abgeleitet
  — Bewertung hängt am tiefsten befüllten Punkt):
  - Knoten **ohne** Kinder → Bewertungsformular: Risikostatus (Auswahl aus
    den 4 Ampelzuständen), Begründung, Maßnahme, Tracking
    (durchgeführt-Checkbox + Datum), Restrisiko nach Maßnahme. Felder sind
    vorbefüllt aus den (Platzhalter-)Daten des Knotens.
  - Knoten **mit** Kindern → kein Formular, sondern Übersicht: derselbe
    Ring-Chip + Zähler + Abdeckungsgrad wie im Baum, dazu eine Liste der
    direkten Kinder mit ihrem jeweils eigenen Status (gefüllt oder Ring, je
    nachdem ob das Kind selbst Kinder hat), plus Hinweistext, dass die
    Bewertung am tiefsten befüllten Punkt erfolgt.
- **Abgrenzung zu Baustein 3:** Die Formularfelder sind interaktiv
  (ausfüllbar, mit Platzhalter-Werten vorbefüllt), aber nicht angebunden —
  kein Speichern, keine Validierung, kein Feldverhalten über reines
  Anzeigen/Vorbefüllen hinaus. Der "Speichern"-Button ist bewusst
  deaktiviert und beschriftet mit "Speichern (folgt in Baustein 3)". Ein
  Hinweistext oben im Formular macht das zusätzlich explizit. Diese Grenze
  ist bewusst, damit Baustein 3 (Erfassungslogik) nicht vorweggenommen
  wird.
- **Leerzustand:** Solange kein Knoten ausgewählt ist, zeigt das Panel
  einen kurzen Hinweistext ("Wähle einen Knoten im Baum aus, um seine
  Bewertung oder Übersicht hier zu sehen.") statt einer leeren Fläche.

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

Textfarbe ist über alle 5 Ebenen identisch (normale Textfarbe, nicht
gedämpft). Korrektur gegenüber einem ersten Entwurf, der Ebene 4/5 gedämpft
dargestellt hatte: Da die Bewertung am tiefsten befüllten Punkt hängt, sind
Ebene-4/5-Knoten inhaltlich oft die wichtigsten im Baum — eine gedämpfte
Farbe hätte das visuell falsch gewichtet. Die Hierarchie läuft ausschließlich
über Einrückung, Schriftgröße und -stärke, nicht über Farbintensität.

## 4. Verdichtung nach oben (2.5)

„Schlechtester Wert gewinnt": Ein rotes Element färbt den gesamten Strang bis
zur Kategorie rot (Rot > Gelb > Grün in der Priorität). Zusätzlich zeigt jeder
Knoten einen kleinen Zähler (z. B. „3 rot, 2 gelb"). Grau wird NICHT verdichtet
bzw. eingefärbt, sondern separat als Abdeckungsgrad ausgewiesen (z. B. „7 von
20 bewertet").

Umsetzung (Konkretisierung beim Bauen):

- Blattknoten (keine Kinder) zeigen den GEFÜLLTEN Ampel-Chip aus 2.2 mit
  ihrem eigenen bewerteten Status — auch wenn dieser Status "unbewertet"
  (Grau) ist.
- Knoten mit Kindern zeigen stattdessen einen RING-Chip (transparenter
  Hintergrund, farbiger Rand + Symbol in derselben Farbe) mit dem
  verdichteten Status seines gesamten Teilbaums (inkl. sich selbst, falls er
  ausnahmsweise doch eine eigene Bewertung trägt). Gefüllt vs. Ring ist die
  Regel, mit der sich "eigener Status" und "verdichteter Status" optisch
  unterscheiden (Vorgabe aus Schritt 2.5).
- Der Zähler neben dem Ring-Chip zählt alle rot/gelb/grün-Bewertungen im
  gesamten Teilbaum (nicht nur direkte Kinder), Reihenfolge rot → gelb →
  grün, Nullwerte werden weggelassen.
- Der Abdeckungsgrad ("X von Y bewertet") wird für JEDEN Knoten mit Kindern
  berechnet (Y = Anzahl Knoten im Teilbaum inkl. sich selbst, X = davon
  bewertet), aber nur auf Kategorie-Ebene (Ebene 1) sichtbar als Text in der
  Zeile angezeigt — auf tieferen Ebenen steht dieselbe Information als
  Tooltip am Ring-Chip, um die Zeile nicht zu überladen.
- Fehlt jeglicher Farbstatus in einem Teilbaum (alles Grau, wie bei
  "Personal & Governance"), zeigt der Ring-Chip Grau statt einer Farbe;
  der Zähler entfällt dann (nichts zu zählen), der Abdeckungsgrad bleibt
  sichtbar (z. B. "0 von 8 bewertet").

### Verständlichkeit gefüllt vs. Ring (Nachtrag)

Beim ersten Ansehen der Demo war der Unterschied zwischen gefülltem Chip
(eigene Bewertung) und Ring-Chip (verdichteter Status aus untergeordneten
Einträgen) nicht selbsterklärend. Ergänzt deshalb:

- Eine sichtbare Kurz-Legende direkt über dem Baum (nicht im eingeklappten
  Stilguide, da dieser nur Entwicklerreferenz ist und Nutzer ihn nicht
  zwangsläufig öffnen): zwei Beispiel-Chips nebeneinander, einer gefüllt
  mit der Bezeichnung "eigene Bewertung", einer als Ring mit "abgeleitet
  aus untergeordneten Einträgen".
- Ein Tooltip auf jedem Ring-Chip: "Verdichtet — schlechtester Status der
  untergeordneten Einträge." (ergänzt um den konkreten Status und den
  Abdeckungsgrad des jeweiligen Knotens).

**Wichtig für Baustein 5 (Erklärungen & Nutzerführung):** Die hier ergänzte
Kurz-Legende und der Tooltip sind ein Minimalstand, kein Ersatz für eine
richtige Erklärung. Baustein 5 muss diese Darstellung (gefüllt vs. Ring,
Verdichtungsregel, Abdeckungsgrad) vertieft und nutzerfreundlich erklären
(z. B. Onboarding-Hinweis, ausführlichere Hilfe-Texte) — das gehört
inhaltlich dorthin, nicht nach Baustein 2.

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
