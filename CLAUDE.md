# Strategic Resilience Program (SRP)

## Ziel
Den Flughafen systematisch auf Extremhitze-Szenarien vorbereiten: Fachbereiche tragen ihre
Risikobewertung (z. B. ab 40°C Außentemperatur, nach Ampel-Skala) und Maßnahmen selbst in ein
strukturiertes Tool ein, damit im Ernstfall vorbereitet statt überrascht reagiert wird.

**Aktuelle Phase: Vorbereitung – kein Produktivsystem.** Es gibt aktuell keine Aktivphase; das Tool
dient ausschließlich der Vorbereitung.

## Auftrag
Prototyp als **einzelne HTML-Datei**, einfach gehalten, **allgemeingültig für einen deutschen
Flughafen** (nicht auf einen bestimmten Flughafen zugeschnitten). Kein Backend erforderlich – auch
bei mehreren Branches während der Umsetzung bleibt das Endprodukt eine einzelne Datei.

Kategorien: **Infrastruktur · Flughafenbetrieb · Personal & Governance**

## Rahmenbedingungen für den Prototyp
- Einzelne HTML-Datei, kein Backend
- Keine echten oder sensiblen Betriebsdaten – niemals reale Flughafendaten verwenden
- Allgemeingültig gestalten, nicht flughafenspezifisch
- Prototyp muss **kein** produktionsreifes Rechte-/Rollensystem haben (Vorbereitungsphase)

## Struktur: 5-Ebenen-Modell (max. 5 Ebenen)
| Ebene | Bedeutung |
|---|---|
| 1 | Kategorie |
| 2 | Unterkategorie |
| 3 | Themenbereich |
| 4 | Komponente |
| 5 | Sub-Komponente |

Risikobewertung und Maßnahme hängen als Eintrag am jeweils **tiefsten befüllten Punkt** – eine
Befüllung ist ab Ebene 2 bis Ebene 5 möglich, nicht zwingend bis Ebene 5.

## Rollen im Tool

### Nutzer
Trägt Fachwissen ein, ergänzt Struktur, verfolgt Umsetzung. Vier Funktionen:
1. **Ausfüller/Berater** – füllt vom Entwickler bereits angelegte Punkte mit Risikobewertung und Maßnahme
2. **Neue Items** – kann Themen ergänzen, die der Entwickler noch nicht kannte (nur Ebene 3–5; eine
   neue Ebene-2-Kategorie kann nur der Entwickler anlegen)
3. **Tracking** – prüft/markiert, ob eine Maßnahme tatsächlich durchgeführt wurde (Status:
   durchgeführt / nicht durchgeführt, mit Datum)
4. **Risiko nach Maßnahme** – bewertet das Risiko nach Durchführung der Maßnahme neu (vorher/nachher
   sichtbar, Unterscheidung zwischen individuellem und residualem/Rest-Risiko)

### Entwickler
Baut und erweitert die Grundstruktur des Tools; hat die strukturelle Hoheit (Kategorien, Ebenen,
Grundgerüst). Kann die Struktur jederzeit erweitern/ändern.

### Admin
Verantwortet Governance der Nutzer-Inhalte, fachbereichsbezogen zuordenbar (z. B. ein Admin nur für
Infrastruktur). Braucht eine Übersicht aller neu angelegten Nutzer-Items ("neu").

## Risikobewertungs-Skala (Ampel)
- **Grau** = nicht bewertetes Risiko
- **Grün** = kein Risiko
- **Gelb** = tolerierbares Risiko (Maßnahme notwendig)
- **Rot** = inakzeptables Risiko (Maßnahme-Definition erforderlich)

## Ablauf je Eintrag
Nutzer/Admin trägt Risikobewertung & Maßnahme ein oder ergänzt neue Items → bei neuem Item: direkt
hinzufügen & bearbeiten (keine Prüfung) → Tracking: wurde die Maßnahme durchgeführt? → Risikobewertung
auf Restrisiko → zurück zum Nutzer.

## Playbook-Beispiel (Referenzfall für Tests/Demo-Daten)
"Neue Risikobewertung für die Landebahnbeschilderung":
1. Entwickler legt Pfad `Infrastruktur → Technik → Landebahn → Beschilderung → Kabel` an, ohne Werte.
2. Nutzer (Ausfüller/Berater) trägt ein: Kabel hält nur bis 42 °C → bei 40 °C Außentemperatur
   Ampel-Status Rot; Maßnahme "neue Kabel verbauen, die bis 50 °C ausgelegt sind".
3. Nutzer legt über **Neue Items** auf Ebene 5 einen weiteren Punkt an: "Lesbarkeit/Verformung".
4. Nutzer trägt über **Tracking** ein, ob die Maßnahme umgesetzt wurde: neue Kabel installiert.
5. Nutzer setzt über **Risiko nach Maßnahme** die Bewertung herab (von Rot auf Gelb).

## Team-Workflow (Git)
- GitHub-Repository als gemeinsame Quelle für den Code
- Branches als Arbeitskopien für Teilaufgaben, z. B.:
  - `feature/5-ebenen-struktur`
  - `feature/rollen-rechte`
  - `feature/playbook-beispiel`
- Zusammenführen der Änderungen über Pull Requests
- Claude Code arbeitet innerhalb dieses Workflows (Branch anlegen, Code schreiben, Commit
  vorschlagen) – **niemals direkt auf `main` pushen oder Commits erzwingen ohne Rückfrage**
