# AI collaboration summary

## Planning conversation

- Did the agent read your files before responding? How could you tell? Yes because it showed me what it was working on (reading) whie it generated the plan.
- What was the agent's first specific observation about your original repo? It's first observation was on my index.js file.
- Did you have to push back on anything the agent suggested? What happened? Yes I had to push back on all the questions agent asked becasue there were too many to answer at once. After this it sequentially asked me the questions as I answered them.

## Build conversation

- What did the agent generate that you kept as-is? Agent for the most part properly generated all the files correctly so I was able to keep them as is.
- What did you change or ask the agent to redo? Why? Agent did mistakenly import variables that didn't need to be imported in app.js as they were never used so I removed those.
- Did you run into any linting or formatting errors? How did you resolve them? The only linting error was the unused variables in app.js which I simply removed.

## AGENTS.md modifications

- What personal instructions did you add to the bottom of AGENTS.md? I added the following:
    - Whenever suggesting to or installing a new library, give a rundown of what it does and how.
    - When asking questions, only ask one at a time and give a breif example of what a helpful answer looks like to you.
    - For the syle of this project, keep things minimalistic and cozy
- Why did you choose those specific instructions? I chose the libraries one because in past projects I've been confused on agent's use of some of them. The questions was becasue of my building conversation and the style was because it had many style questions so I wanted it to have a place to reference.
- Did the agent's behavior change after you added them? How? I saw it change witht he question asking as it kept it to just one and the example answer was neat and would be useful on future projects.

## Reflection

- What surprised you about working with an AI agent in a real tooling environment? Honestly the length it took AI to complete some of the tasks so that everything obligied to the tools requirements was surpising, not that it took long but definitly some seconds longer than it has in the past.
- What would you do differently next time? Next time I think I would be more clear about the rules of my assignment becasue during the building conversation it asked me questions about it and I was too vague which led to me having to correct what it was allowed to use to build.
- What is one thing you learned about your own workflow or preferences? I learned that I prefer to attempt to figure out why something doesn't work before asking agent because sometimes it confuses me a little more when it tries to explain solutions.
