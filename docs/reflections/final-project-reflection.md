# Final project — reflection

Write 2–3 sentences for each prompt. The reflection is where the learning gets named — give yourself room to think.

## 1. Pattern picked

I orignally planned to go with just Pattern B, but when working with my AI agent it showed how to have user input to get sent to Groq. I didn't shut this down and while I completely followed Pattern B, there are pieces of Pattern A as well.

## 2. The hardest part

I found the hardest part of the Groq integration to be the schema shaping. I did have to tweak a few of the Deezer datas into a better more tight form.

## 3. The moderation floor

How did the four-layer moderation floor (system prompt, JSON mode, delimited input, length cap) shape your design? Did any layer surprise you — either by how cheap it was to add, or by how much it changed the user-facing behavior?

The moderation didn't impact my design in any unexpected way. I definitly found it surprising how simple the system prompt is, yet how effective it can be aswell.

## 4. UX polish

I smoothed out the new placement of the reccomendations and the Groq information about the songs. Origianlly with the update the songs were super cramped with the new information, so I made it more user friendly.

## 5. Groq's strengths and weaknesses

What did Groq do well in your project? What did it not do well — wrong outputs, drift from the schema, latency, hallucinations, anything else? How would your design change if you had to use a slower or less capable model?
Groq did a decent job at giving upbeat info bits about each track, but it's Pattern A qualities of finding songs could be better, as it really limited itself, but since that wasn't my main focus I'm ok with that.

## 6. What you would do differently

I would be less reluctant on the Pattern A qualities of the search and maybe make the info bit section look more on theme. I would also have considered going completely for a A+B Pattern project.
