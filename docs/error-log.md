# Error Log

Every console error, browser warning, or lint failure gets a row here. Don't delete rows — the log is a record of how you got better.

| Date | Error message |       File + line     | My hypothesis        |        Fix      | Blamed |
| 4/14 |  | ----\/---- | app.js 54,109,116,170 | innerHTML restricted | use textContent | agent  |
"'innerHTML' is restricted from being used. Use createElement + textContent instead of innerHTML. See docs/reference/safe-dom-manipulation.md  no-restricted-properties"

Blamed: who or what introduced the error — you, the agent, or the starter code.
