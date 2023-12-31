// Run: node Start.js   
const { app, BrowserWindow} = require('electron');
let mainWindow;

function createWindow() {
        const path = require('path');
        const appIco  = path.join(__dirname, "../../build/icons/win/icon.ico")
        console.log(appIco)
        mainWindow = new BrowserWindow({
            icon:appIco,
            width: 2500, 
            height: 2500,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
        }
    );
        mainWindow.loadFile(path.join(__dirname, '../index.html'));
        mainWindow.on('closed', function () {
        mainWindow = null;
        });
    }
    
    app.whenReady().then(() =>{
        createWindow()
    });
    
    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit();
    });
    
    app.on('activate', function () {
        if (mainWindow === null) createWindow();
    });

