const path = require('path')
const fs = require('fs')

const app = { }


    app.begin = () => {
      app.setIconFilesPath()
      app.getAllIconFileNames()
      app.setUsedIcons()
      app.removeUnusedIcons()
    }




        app.setIconFilesPath = () => {
          app.iconsPath = 'www/svg'
        }




        app.getAllIconFileNames = () => {
          if (!fs.existsSync(app.iconsPath)) throw new Error(`Directory Not Found: ${ app.iconsPath }`)
          app.fileNames = fs.readdirSync(app.iconsPath)
        }




        app.setUsedIcons = () => {
          app.usedIcons = [
            'arrow-back-sharp.svg'
          ]
        }




        app.removeUnusedIcons = () => {
          app.fileNames.forEach((file) => {
            if (app.usedIcons.includes(file)) console.log(`Keeping file: ${ file }`)
            else fs.unlink(`${ app.iconsPath }/${ file }`, (error) => {
              if (error) console.error(`Unable to delete ${ file }.  Error:`, error)
            })
          })
        }


app.begin()
