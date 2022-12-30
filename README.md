# serve the project for the first time
- `npm i`
- `npx nx serve dispatcher-ui`

# build the workspace
`npx nx run-many --target=build --all --parallel=${number of parallelization} ${--skip-nx-cache}`

# petrollogistic
vs code recommended extensions
- docker.
- nx console.
- prettier.
- eslint.
- c#.


nx nrwl (used steps to create petrollogistic's workspace)
- install nx nrwl `npm i nx`.<br />
- init new workspace `npx create-nx-workspace` "petrologistic", app template.<br />
- add nx Angular `npm install --save-dev @nrwl/angular`.<br /> 
- add nx Dotnet `npm install --save-dev @nx-dotnet/core`.<br />

# openrouteservice api interactive examples: 
https://openrouteservice.org/dev/#/api-docs/v2/directions/
# openrouteservice docker installation
https://giscience.github.io/openrouteservice/installation/Running-with-Docker.html
