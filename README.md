# Drop Down

## Project description

I am very much a learning by doing kind of guy and using new things takes a while to fully understand.
I have never build a drop down component before, I have however always been annoyed that you are not able to style the regular form element and thereby keep the functionality of the select, but making it look nicer via css and maybe a bit of js to expand functionality.

So my initial thoughts was to go simple have a header part and a list part and populate those two with content and make functions and states to handle the interaction between the two.
I made a functional component for the drop down itself, I think there is a lot to keep track of and maybe I have complicated it a bit too much, but it passes props from parent to child and states are handled by react not redux, since I haven't worked with redux before.
I am using styled component, I just like to have one file hold the entire component and it's dependencies and styled components gives a fine overview in my opinion.


## Extra

I did make a bit of fun, maybe not useful, but I thought it would be nice for the UI

- Made the manager list have a small animation when appearing and disappearing
- The Arrow of the search is also having a small animation
- The Initials of the manager is decided via their id, right now it has a fault, but it was a fun thing
- Added a showing of the selected manager and a "empty" state


## Room for improvement

This has plenty of room for improvement, the scripting is a mix of a starter template for react, to have the basic setup and what I usually work with, it's a bit messy, but I did not want to make it all to complicated to get started.

- Cleanup - as written a b it of a mess, didn't even divided into different commits
- Accessibility - usually I spend a lot of time getting these things right
- States - the component could have had more states and maybe Redux would be a better choice
- Production ready - the component itself is decent, but the surroundings could be nicer
- Unit tests - there aren't any, learning opportunity


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
