# Reasons for Render
1. Mount (first render)
2. Parent rerender
3. Props changed
4. Hooks changed
* Every time we set a new state, we set a new reference
* Never modify the state, always pass a new reference