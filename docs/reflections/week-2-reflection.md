# Week 2 reflection — DOM Fundamentals

## Reading the agent's code

- What was the hardest part of your code to understand? What made it click? The hardest part to understand was agent adding a lot of extra lines to ensure code doesn't result in an error. I hadn't seen things like the event listeners and timeouts yet so I had to push back to understand their purpose at first. Running the code with and without these features made it click what they were doing.
- Did you find anything in the agent's code that surprised you — something you would not have written yourself? When adding the gif I was honestly surprised at how easy it was. I asked agent first if it was possible and then to run me through how and it came out to be quite simple thanks to the explanation.

## Modernizing

- How many `getElementById` calls did you replace? Was the switch to `querySelector` straightforward? I replaced 4 getElementByID calls, they were very easy and straightforward.
- Did you find any `innerHTML` that was risky? How did you decide what to replace? The innerHTML was trickier cause the objects were so large and connected. I didn't replace any of the hardcoded or blank innerHTML instances.

## DOM experiments

- Which experiment was your favorite? Why? My favorite experiment was the gif upload one because it was really cool to see how it wasn't super complicated to do and now my website has a moving image that makes it pop.
- Which experiment was the hardest? What tripped you up? The counting recommendatino cards experiment was the hardest becasue it was my first introduction the the event listener and timeout features and I had the most trial and error to go over with my agent for it.
- Did any experiment give you an idea for a feature you want to add to your site later? The url experiment gave me a bit of an idea for a suggestion box feature for songs to add that would somehow take user input and get it back to me. Not sure how yet though.

## AGENTS.md

- What new rules or instructions did you add to AGENTS.md this week? I added rules to keep security risks from generated code in mind and avoidance of innerHTML and getElementByID for similar security purposes. 
- Compare your "About this student" section from the start of the week to the end. What changed? I now know a lot about DOM manipulation and I put in some of the specific features.

## Reflection

- What is one thing you understand about the DOM now that you did not understand before this week? I didn't completely understand how the DOM would make immediate changes from what the readings said at first, but now seeing it in action is really cool and I understand whats happening.
- What would you do differently if you were starting this week's work over? I would definitly make sure I know what all my items are named in app.js and get a better jump on following HTML so it would make finding the item I'm searching for for my experiments easier.
