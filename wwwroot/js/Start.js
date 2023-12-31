// Run: node Start.js   
const { app, BrowserWindow } = require('electron');

let mainWindow;
function createWindow() {
        const path = require('path');
        const IconPath =path.join(__dirname,'./public/Icons/LogoIco.ico')
        mainWindow = new BrowserWindow({
            width: 2500, 
            height: 2500,
            icon:IconPath,
            webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
        });
        mainWindow.loadFile(path.join(__dirname, '../index.html'));
        mainWindow.on('closed', function () {
        mainWindow = null;
        });
    }
    
    app.whenReady().then(createWindow);
    
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit();
    });
    
    app.on('activate', function () {
        if (mainWindow === null) createWindow();
    });

