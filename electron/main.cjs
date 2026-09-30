const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 320,
    minHeight: 180,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    title: 'Glücksrad-Quiz',
    webPreferences: { contextIsolation: true, sandbox: true, devTools: !app.isPackaged },
  });
  // F11 / Esc: Vollbild umschalten bzw. verlassen (Präsentationsbetrieb)
  win.webContents.on('before-input-event', (e, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') { win.setFullScreen(!win.isFullScreen()); e.preventDefault(); }
    else if (input.key === 'Escape' && win.isFullScreen()) { win.setFullScreen(false); e.preventDefault(); }
  });
  win.loadFile(path.join(__dirname, '..', 'dist', 'index.html'));
}

if (process.platform !== 'darwin') Menu.setApplicationMenu(null); // macOS behält das Standardmenü (Cmd+Q)
app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
