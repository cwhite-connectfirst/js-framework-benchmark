import { Application } from 'spectron';
import * as assert from 'assert';
import * as path from 'path';

import { PathHelper } from './utils/pathHelper';

let app = new Application({
  path: PathHelper.GetElectronPath(),
  args: [path.join(__dirname, 'electron-runner', 'main')]
});

app.start().then(function () {
  // Check if the window is visible
  return app.browserWindow.isVisible()
}).then(function (isVisible) {
  // Verify the window is visible
  assert.equal(isVisible, true)
}).then(function () {
  // Get the window's title
  return app.browserWindow.getTitle()
}).then(function (title) {
  // Verify the window's title
  assert.equal(title, 'My App')
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
}).then(function () {
  // Stop the application
  return app.stop()
})