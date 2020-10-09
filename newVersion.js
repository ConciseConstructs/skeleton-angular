const fs = require('fs')


const incrementor = { }

    incrementor.start = () => {
      incrementor.updatePackageJSON('package.json')
      incrementor.updateEnvironment('./src/environments/environment.ts')
      incrementor.updateEnvironment('./src/environments/environment.prod.ts')
      incrementor.updateAndroidGradle('./android/capacitor-cordova-android-plugins/build.gradle')
      incrementor.updateAndroidGradle('./android/app/build.gradle')
    }












  incrementor.updatePackageJSON = (filePath) => {
    let { content, lineNumber, key, major, minor, patch, newLineCharacters } = incrementor.incrementVersionAsString(filePath, `"version": `)
    patch++
    incrementor.versionAsString = `${ major }.${ minor }.${ patch }`
    content[lineNumber] = `${ key }: "${ incrementor.versionAsString }",`
    content = content.join(newLineCharacters)
    incrementor.saveFile(filePath, content, incrementor.versionAsString)
  }












  incrementor.updateEnvironment = (filePath) => {
    let { content, lineNumber, key, newLineCharacters } = incrementor.incrementVersionAsString(filePath, `version: '`)
    content[lineNumber] = `${ key }: '${ incrementor.versionAsString }',`
    content = content.join(newLineCharacters)
    incrementor.saveFile(filePath, content, incrementor.versionAsString)
  }












  incrementor.updateAndroidGradle = (filePath) => {
    let { content, newLineCharacters } = incrementor.incrementAndroidPluginsGradleVersion(filePath, `versionCode`)
    content = content.join(newLineCharacters)
    incrementor.saveFile(filePath, content, incrementor.versionAsString)
  }


















  incrementor.readFile = (filePath) => {
    let newLineAndReturn = `\r\n`, newLine = `\n`, newLineCharacters
    file = fs.readFileSync(filePath, 'utf-8')
    if (file.includes(newLineAndReturn)) newLineCharacters = newLineAndReturn
    else newLineCharacters = newLine
    return { content: file.split(newLineCharacters), newLineCharacters }
  }












  incrementor.incrementVersionAsString = (filePath, searchString) => {
    try {
      let { content, newLineCharacters } = incrementor.readFile(filePath)
      let lineNumber = content.findIndex(line => line.includes(searchString))
      if (!lineNumber || lineNumber === -1) throw new Error(`Did not find a line with ${ searchString } in file: ${ filePath }`)
      let [ key, value ] = content[lineNumber].split(`:`)
      let [ major, minor, patch ] = value.split(`.`)
      major = major.split(`"`).join('').split(`'`).join('').split(`,`).join('')
      minor = minor.split(`'`).join('').split(`,`).join('')
      patch = patch.split(`'`).join('').split(`,`).join('')
      major = parseInt(major)
      minor = parseInt(minor)
      patch = parseInt(patch)
      return { content, lineNumber, key, major, minor, patch, newLineCharacters }
    }
    catch (error) { console.error('error-9657f90d-b970-4a9a-a87a-7397038d25e4', error) }
  }












  incrementor.incrementAndroidPluginsGradleVersion = (filePath, searchString) => {
    let { content, newLineCharacters } = incrementor.readFile(filePath)
    let lineNumber = content.findIndex(line => line.includes(searchString))
    if (!lineNumber || lineNumber === -1) throw new Error(`Did not file a line with $${ searchString } in file: ${ filePath }`)
    let [ text, number ] = content[lineNumber].trim().split(' ')
    number = parseInt(number)
    number++
    let newContent = ['        ', text, ' ', number].join('')
    content[lineNumber] = newContent
    content[lineNumber + 1] = `        versionName "${ incrementor.versionAsString }"`
    return { content, newLineCharacters }
  }












  incrementor.saveFile = (filePath, content, version) => {
    fs.writeFile(filePath, content, (failure)=> {
      if (failure) incrementor.onSaveFileFailure(failure)
      else incrementor.onSaveFileSuccess(filePath, version)
    })
  }




      incrementor.onSaveFileFailure = (error) => {
        console.error('error-10eb10d9-ea22-4850-b1a7-06231bcfc211', error)
      }




      incrementor.onSaveFileSuccess = (filePath, version) => {
        console.log(`${ filePath } incremented to version ${ version }`)
      }




incrementor.start()