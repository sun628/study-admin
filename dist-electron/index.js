"use strict";const e=require("electron"),t=require("path"),o=()=>{const n=new e.BrowserWindow({width:1375,height:905,webPreferences:{devTools:!0,contextIsolation:!1,nodeIntegration:!0}});e.app.isPackaged?n.loadFile(t.join(__dirname,"../dist/index.html")):n.loadURL(`${process.env.VITE_DEV_SERVER_URL}`)};e.app.whenReady().then(o);