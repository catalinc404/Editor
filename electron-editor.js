const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const Config = require('electron-store');

const app = electron.app;
const config = new Config();

let window;

function createWindow()
{
  let options = { show: false };
  Object.assign( options, config.get('windowBounds') );

  window = new BrowserWindow( options );
  window.setMenu( null );
  window.loadURL( `file://${__dirname}/editor.html` );
  window.once( 'ready-to-show', window.show );
  //window.webContents.openDevTools()

  // save window size and position
  window.on( 'close', function() { config.set('windowBounds', window.getBounds()); } );
  window.on( 'closed', function () { window = null; } );
}

app.on('ready', createWindow)
app.on('window-all-closed', function ()
{
  if (process.platform !== 'darwin')
  {
    app.quit()
  }
});

app.on('activate', function ()
{
  if (window === null)
  {
    createWindow()
  }
});