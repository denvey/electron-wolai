/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow } from 'electron'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'

dotenv.config({ path: join(__dirname, '../../.env') })

let win: any = null

function createWin() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  const URL = is_dev
    ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
    : `file://${join(__dirname, '../render/index.html')}` // vite 构建后的静态文件地址

  win.loadURL('https://www.wolai.com')
  win.webContents.on("did-finish-load", function() {
    win.webContents.insertCSS(`
      #wolai-header-bar {
        -webkit-app-region: drag;
      }
      .sidebar-collapse-btn {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      #wolai-sidebar > div:first-child:before {
        content: "";
        height: 35px;
        width: 100%;
        -webkit-app-region: drag;
      }
      #wolai-header-bar ._1ckUP {
        margin-left: 60px;
      }

    `)
    // win.webContents.executeJavaScript('document.querySelector("#wolai-sidebar div").classList.add("wolai-sidebar-drag")');
    //...
    //这里放注入代码逻辑
    //...
  });
}

app.whenReady().then(createWin)
