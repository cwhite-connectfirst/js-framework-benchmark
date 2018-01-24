import { Application } from 'spectron';
import * as assert from 'assert';
import * as path from 'path';

import { PathHelper } from './utils/pathHelper';

let app = new Application({
  path: PathHelper.GetElectronPath(),
  args: [path.join(__dirname, 'electron-runner', 'main')]
});

function onError(error: any) {
  let message = "Error: " + error.message; 
  console.log(message);
  return app.stop();
}

app.start().then(function() {
  // Check if the window is visible
  return app.client.isVisible("body")
}).then(function (isVisible) {
  // Verify the window is visible
  assert.equal(isVisible, true)
}).then(function () {
  // Get the window's title
  return app.client.getTitle()
}).then(function (title) {
  // Verify the window's title
  assert.equal(title, 'My App')
})
.catch(onError)
.then(function () {
  // Stop the application
  return app.stop();
})