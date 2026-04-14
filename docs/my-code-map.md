# My code map

Fill out each section below by reading your actual code. Do not guess — open each file and look. This map is your reference for the rest of the assignment. When instructions say "your results container" or "your card class," they mean what you write here.

---

## Files and their purposes

For each file, write one sentence about what it does.

| File                    | What it does |
| ----------------------- | ------------ |
| `src/js/app.js`         |Connects user input and matching functions to generate and filter recommendations|
| `src/js/matching.js`    |Contains the functions responsible for matching the best fit recommendations|
| `src/js/data.js`        |Contains the information/categorys for each song|
| `src/css/style.css`     |Defines the styling rules and layout|
| `index.html`            |Sets up the main layout and preference form in HTML|

---

## Form

Look at your `index.html` and find the form element.

- Form ID: `#preferences-form`
- Select element ID: `#vibe`

- What moods/options are in the select?

  - Chill
  - Hyped
  - Focused
  - Upbeat

---

## Results container

Where do results appear on the page?

- Container ID or class: `#recommendations`
- What element type is it? (`div`, `section`, etc.): `div`

---

## Card structure

Look at how your app.js builds each result card. What elements make up one card?

- Card element type: `div`
- Card class name: `song-card`

- What is inside each card? (list the child elements and what data they show)
  - song-title: title of the song
  - song-artist: artist of the song
  - song-meta: extra cetegories of the song
  - match-score: score of how accurate the match is

---

## Existing event listeners

Look through your app.js for any `addEventListener` calls. List each one.

| Where in the code | Event type | What it does |
| ----------------- | ---------- | ------------ |
|       Line 149    |   submit   | Recongnizes when the user submits their preference form and runs the recommendation generator. 
|       Line 157    |  click     | Runs the random song getter when the button is clicked.
|       Line 177    |  click     | Adds badges to each card of their number.
|       Line 79     |  click     | Runs function to show cards' detailed view. 


If you do not see any `addEventListener` calls, write "none found" — and then look again, because the form handler uses one.

---

## Data shape

Open `src/js/data.js` and look at one item in your dataset.

- How many items total? `20`

- Properties on each item

  - title
  - artist
  - activity
  - vibe
  - genre
  - durationSeconds

---

## CSS classes for show/hide


Do you have a `.hidden` class or similar in your CSS? If so, what does it do?

- Class name: `.hidden`
- What CSS rule does it apply? `display: none;`

If you do not have one, you will create one this week.
