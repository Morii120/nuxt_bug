import { app, BrowserWindow } from 'electron'
import path from 'path'
const distPath = path.join(__dirname, '../.output/public')
app.whenReady().then(() => {
    const win = new BrowserWindow({
        webPreferences: {
            //关闭web权限检查，允许跨域
            webSecurity: false,
        }
    })
    if (app.isPackaged) {
        win.loadFile(path.join(distPath, 'index.html'))
    } else {
        win.loadURL(process.env.VITE_DEV_SERVER_URL!)
        win.webContents.openDevTools()
    }
})

