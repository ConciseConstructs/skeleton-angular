const fs = require('fs')


const incrementor = { }

    incrementor.start = () => {
      incrementor.updatePackageJSON()
      incrementor.updateEnvironmentDEV()
      incrementor.updateEnvironmentPROD()
    }




        incrementor.updatePackageJSON = () => {
          fs.readFile('package.json', 'utf-8', (failure, success)=> {
            if (failure) incrementor.onReadPackageJSONFailure(failure)
            else incrementor.onReadPackageJSONSuccess(success)
          })
        }




            incrementor.onReadPackageJSONFailure = (error) => {
              console.error('error-c2a8a6a0-7e8c-400c-81bb-868b57951333', error)
            }




            incrementor.onReadPackageJSONSuccess = (success) => {
              incrementor.dataPackageJSON = JSON.parse(success)
              incrementor.incrementVersionInPackageJSON()
              incrementor.savePackageJSON()
            }




                incrementor.incrementVersionInPackageJSON = () => {
                  let versionAsString = incrementor.dataPackageJSON.version
                  let [ major, minor, patch ] = versionAsString.split(`.`)
                  patch = parseInt(patch)
                  patch++
                  versionAsString = `${ major }.${ minor }.${ patch }`
                  incrementor.dataPackageJSON.version = versionAsString
                }




                incrementor.savePackageJSON = () => {
                  fs.writeFile('package.json', JSON.stringify(incrementor.dataPackageJSON), (failure, success)=> {
                    if (failure) incrementor.onSavePackageJSONFailure(failure)
                    else incrementor.onSavePackageJSONSuccess(success)
                  })
                }




                    incrementor.onSavePackageJSONFailure = (error) => {
                      console.error('error-10eb10d9-ea22-4850-b1a7-06231bcfc211', error)
                    }




                    incrementor.onSavePackageJSONSuccess = (result) => {
                      console.log(`Package JSON incremented to version ${ incrementor.dataPackageJSON.version }`)
                    }




        incrementor.updateEnvironmentDEV = () => {
          fs.readFile('./src/environments/environment.ts', 'utf-8', (failure, success)=> {
            if (failure) incrementor.onReadEnvironmentDEVFailure(failure)
            else incrementor.onReadEnvironmentDEVSuccess(success)
          })
        }




            incrementor.onReadEnvironmentDEVFailure = (error) => {
              console.error('error-37608de3-4288-4db0-a482-0630fa0626e2', error)
            }




            incrementor.onReadEnvironmentDEVSuccess = (result) => {
              incrementor.dataEnvironmentDEV = incrementor.incrementVersionInEnvironment(result)
              incrementor.saveEnvironmentDEV()
            }




                incrementor.saveEnvironmentDEV = () => {
                  fs.writeFile('./src/environments/environment.ts', incrementor.dataEnvironmentDEV, (failure, success)=> {
                    if (failure) incrementor.onSaveEnvironmentDEVFailure(failure)
                    else incrementor.onSaveEnvironmentDEVSuccess(success)
                  })
                }




                    incrementor.onSaveEnvironmentDEVFailure = (error) => {
                      console.error('error-f10753af-c16f-42a3-8756-4750b2923af3', error)
                    }



                    incrementor.onSaveEnvironmentDEVSuccess = (result) => {
                      console.log(`Environment DEV incremented to version ${ incrementor.dataPackageJSON.version }`)
                    }




        incrementor.updateEnvironmentPROD = () => {
          fs.readFile('./src/environments/environment.prod.ts', 'utf-8', (failure, success)=> {
            if (failure) incrementor.onReadEnvironmentPRODFailure(failure)
            else incrementor.onReadEnvironmentPRODSuccess(success)
          })
        }




            incrementor.onReadEnvironmentPRODFailure = (error) => {
              console.error('error-b39f403e-04d7-4893-bbf0-fef863645ead', error)
            }




            incrementor.onReadEnvironmentPRODSuccess = (result) => {
              incrementor.dataEnvironmentPROD = incrementor.incrementVersionInEnvironment(result)
              incrementor.saveEnvironmentPROD()
            }




                incrementor.saveEnvironmentPROD = () => {
                  fs.writeFile('./src/environments/environment.prod.ts', incrementor.dataEnvironmentPROD, (failure, success)=> {
                    if (failure) incrementor.onSaveEnvironmentPRODFailure(failure)
                    else incrementor.onSaveEnvironmentPRODSuccess(success)
                  })
                }




                    incrementor.onSaveEnvironmentPRODFailure = (error) => {
                      console.error('error-db71d30b-983e-4373-9156-d9767f608360', error)
                    }




                    incrementor.onSaveEnvironmentPRODSuccess = (result) => {
                      console.log(`Environment PROD incremented to version ${ incrementor.dataPackageJSON.version }`)
                    }












  incrementor.incrementVersionInEnvironment = (result) => {
    try {
      let fileLines = result.split(`\r\n`)
      let lineNumber = fileLines.findIndex(line => line.includes(`version: "`))
      let [ key, value ] = fileLines[lineNumber].split(`:`)
      let [ major, minor, patch ] = value.split(`.`)
      let removedUnwantedCharacters = patch = patch.split(`"`).join('').split(`,`).join('')
      patch = parseInt(removedUnwantedCharacters)
      patch++
      value = `${ major }.${ minor }.${ patch }",`
      fileLines[lineNumber] = `${ key }:${ value }`
      return fileLines.join(`\r\n`)
    }
    catch (error) { console.error('error-9657f90d-b970-4a9a-a87a-7397038d25e4', error) }
  }






incrementor.start()
