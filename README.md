**Repository**

https://github.com/isameet/Spotify-Browser

**Setup / Important npm Commands**

- npm install
- npm start -s (runs in dev mode)
- npm run build -s (runs in prod mode)
- npm run deploy -s (deploys online to surge)

**Tools used**

- react, redux, react-router, redux-thunk, whatwg-fetch
- npm, express, webpack, babel, ESLint 
- mocha, expect (tests not written)

**Production**
- npm run build -s (runs locally in prod mode)
- npm run deploy -s (deploys online to surge)
- Production build minified, bundled, source-mapped, gzipped
- Production JS bundle (including everything) - **125KB**!

**Routes**
- localhost:3000
- localhost:3000 (default - no filters, search)
- localhost:3000/albums (filter applied, no search yet)
- "localhost:3000/albums/this is a test" (filter albums, search param)
- "localhost:3000/all/this is a test" (no filter, search param)
- Pattern: http://localhost:3000/(filter | all)/(search_term)

**Workflow**
- Filter, search term read from url (browserHistory used for clean URLs)
- Search results, count, status - composed in redux store (refer to initialState.js for store structure)
- Merely selecting a filter does not search (because query is mandatory as per spotify-api)
- Merely typing a search term searches across all filters and lists top 10 results, per category
- While API call is in progress, interface is disabled, loading indicator is shown 
- If you search for a term, then select a different filter, your search term is carried forward (this is a conscious UX decision)

**Scope for improvement**
- Paginated list (load more...) per category (right now, only 10 results per category are shown)
- Richer information in list of albums, songs, artists etc.
- Testing environment was set up, dummy test was written. Haven't written actual tests yet. Need to learn this skill.
