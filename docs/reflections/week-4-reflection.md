# Week 4 reflection

Answer each question thoughtfully. There are no wrong answers — the goal is to reflect on what you learned and how your understanding changed.

---

## 1. The enforcement ladder

What did the new linter (ESLint 9 + unicorn plugin) catch that your AGENTS.md rules alone didn't prevent? On the flip side, what kinds of things can AGENTS.md catch that a linter can't check for?

 The new linter caught uses of innerHTML that my agent previously hadn't. It was also finding defined but unused variabls that agent was missing. agent.md can find format issues though that the linter can't like when I had an export call in the wrong order.

---

## 2. Hooks across contexts

You've now seen hooks in five places: browser events, Git pre-commit, npm lifecycle scripts, GitHub Actions, and serverless functions. What is the common pattern across all of them?

Once they are in place they all automatically run without me having to go back to them.

---

## 3. Which enforcement layer changed your habits

Advisory (AGENTS.md), linting (ESLint + unicorn), or blocking (pre-commit hook) — which one changed how you write code the most this week? Why?

Linting changed how I write code the most because it would highlight wrong code before i even trued to run it so I could think about what was wrong right when I wrote it.

---

## 4. The data swap

What surprised you about working with a real API compared to your static `data.js`? Think about things like response shape, timing, missing fields, or error cases.

I had a lot of error cases with the API data becasue of not carefully checking the data types. It was really cool how it could have images and ranks on the songs, espicially ranks becasue I'd imagine those change.

---

## 5. The transform challenge

What was the hardest part of mapping the API response to the shape your views expect? How did you solve it?

The hardest part was I had three categories that my API didnt have. After consideration I got rif of activty and vibes categories and added 3 total new fields in place so that things were smooth.

---

## 6. New API fields

What new field(s) did you add from the API? How did they improve your app compared to the static version?

I added an album cover, album, and ranking. I think the album cover was a huge improvement becasue it adds a lot my character to the songs and might make the more recongnizable.

---

## 7. Error handling philosophy

You used try/catch in four different contexts this week: the serverless function, fetch in app.js, the localStorage wrapper, and the npm lint guard. What is the common pattern across all of them? What changes between contexts?

All of them are my early line of defense to unexpected issues that allows things to run more smooth but these ways of defense differ depending on each instance.