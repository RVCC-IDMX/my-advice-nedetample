# Instructions

This assignment has five parts. Work through them in order. Each part builds on the one before it.

---

## Part 1 — Plan your site with your agent

Before you touch this repo, you need a plan. You will create that plan in your **original** "What Should I...?" repo — the site you built earlier in the course (e.g., "What Should I Listen To?") — by having a planning conversation with an AI agent.

1. **You will be closing this repo soon**, but first read through all of Part 1 so you know what to expect.
2. **Open this gist URL:** `https://gist.github.com/cynthiateeters/b2aa58e6f6c67fb2400309c8543febc5` — this is your planning guide. It walks you through the conversation, model selection, and creating your `BUILD-PROMPT.md`.
3. **In the other repo**, you will start a Copilot agent conversation and paste something like:

   > "Read this planning guide and help me follow every step: <https://gist.github.com/cynthiateeters/b2aa58e6f6c67fb2400309c8543febc5>"

   The agent will read the gist, walk you through the planning conversation, and help you create your `BUILD-PROMPT.md` — all inside the right repo.

4. **When you are done**, bring `BUILD-PROMPT.md` back to this repo (the guide explains how) and continue with Part 2.
5. **OK, close this repo** and open your original "What Should I...?" repo in VS Code. You have everything you need.

---

## Part 2 — Get it running

If you have already cloned this repo and run `npm install`, confirm everything still works and move on. If not, do it now.

> **Before you start**, read [docs/tutorials/dev-tooling-overview.md](tutorials/dev-tooling-overview.md). It explains how all the tools in this repo fit together. You do not need to memorize it — just get the big picture. Come back to it whenever something surprises you.

1. **Clone this repo** and open it in VS Code
2. **Install dependencies:**

   ```bash
   npm install
   ```

   This also installs Husky, which sets up a pre-commit hook automatically.
3. **Start the dev server:**

   ```bash
   npm run dev
   ```

   A placeholder page should appear in the browser. This confirms Vite is working. Your agent will replace this page when you build your site.
4. **Confirm linting passes:**

   ```bash
   npm run lint
   ```

   This should pass with no errors.
5. **Confirm Husky is working:** Make a small test commit (like editing this file with a comment). When you commit, you should see lint-staged run in your terminal. If it does, Husky is installed correctly. You can revert this commit afterward if you like.

6. **Enable GitHub notifications:** Go to your repo on GitHub, click the **Watch** dropdown (top right), and select **All Activity**. Your instructor delivers weekly updates as Issues and Pull Requests — this ensures you see them. See [docs/course/weekly-updates-how-it-works.md](course/weekly-updates-how-it-works.md) for the full workflow.

Once everything runs without errors, you are ready for Part 3.

---

## Part 3 — Build the site

Now you will use your build prompt to generate your site inside this repo.

1. **Make sure `BUILD-PROMPT.md` is in the root of this repo**
2. **Open this repo in VS Code agent mode**
3. **Paste the contents of `BUILD-PROMPT.md`** as your first message to the agent. Tell the agent to **replace** the existing placeholder files (`index.html`, `src/js/app.js`, `src/css/style.css`) with your site — do not append to them.
4. The agent will generate files:
   - `index.html` in the repo root (replaces the placeholder)
   - JavaScript files in `src/js/` (`data.js`, `matching.js`, `app.js`) and CSS in `src/css/`
5. **Run the linter:**

   ```bash
   npm run lint
   ```

   The agent may have introduced linting errors. Fix them — this is part of the learning. Read the error messages, understand what rule was violated, and check `docs/reference/eslint-rules.md` if you need help.
6. **Run the dev server:**

   ```bash
   npm run dev
   ```

   Confirm your page loads in the browser and test your form.

---

## Part 4 — Modify your AGENTS.md

Now that you have worked with an AI agent, you know more about what helps and what does not.

1. **Read `docs/a-good-agents-md.md`** — it explains what makes an effective AGENTS.md and how to write personal instructions
2. **Open `AGENTS.md`** in the repo root and scroll to the "My personal instructions" section at the bottom
3. **Add at least 3 personal instructions** based on your experience. Think about:
   - What did the agent do well that you want it to keep doing?
   - What did the agent do that was unhelpful?
   - How do you learn best — analogies, short examples, step-by-step?
   - Any design or code preferences specific to your project?
4. **Try them out.** Start a short conversation with the agent and see if your instructions change its behavior. Note what is different.

---

## Part 5 — Deploy and reflect

Wrap up by building, deploying, and reflecting on the process.

1. **Build the project:**

   ```bash
   npm run build
   ```

   Confirm Vite builds successfully with no errors.
2. **Deploy to Netlify using the Netlify CLI.** If you haven't set up the CLI yet, see [docs/reference/cli-tools.md](reference/cli-tools.md) for installation and login steps. If this is your first deploy from this repo, initialize the site first:

   ```bash
   netlify init
   ```

   When prompted, choose "Create & configure a new site" and set the publish directory to `dist`. Then deploy:

   ```bash
   netlify deploy --prod
   ```

   Save your live URL — you will submit it.
3. **Push to GitHub** and check the Actions tab — confirm the lint workflow runs and shows a green check
4. **Complete `ai-collaboration-summary-template.md`** — answer every question thoughtfully. This is where you reflect on what you learned about working with AI agents in a real tooling environment.

## What to submit

- Your live Netlify URL
- Your GitHub repo URL (make sure it is public or that your instructor has access)
- Your completed `ai-collaboration-summary-template.md` in the repo
