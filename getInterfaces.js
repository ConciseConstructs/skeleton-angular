// const { spawn } = require('child_process')
const { exec, spawn } = require('child_process');
const { stderr } = require('process');
const fs = require('fs');

let app = { }

  app.begin = () => app.determineOS()




  app.determineOS = () => {
    if (process.platform === 'win32') app.onWindowsOs()
    else if (process.platform === 'linux') app.onLinuxOs()
    else throw new Error('Cannot determine OS')
  }



      app.onWindowsOs = () => {
        const path = 'src/assets/interfaces'
        async function print(path) {
          const dir = await fs.promises.opendir(path);
          for await (const directoryEntry of dir) {
            console.log(directoryEntry.name);
          }
        }
        print('./').catch(console.error);
      }
      // app.onWindowsOs = () => {
      //   console.log('Windows OS')
      //   exec('cd src/assets/interfaces', (error, stdout, stderr) => app.onWindowsOutcome(error, stdout, stderr))
      //   exec('dir', (error, stdout, stderr) => app.onWindowsOutcome(error, stdout, stderr))
      // }




      //     app.onWindowsOutcome =(failure, success, stderr) => {
      //       if (failure || stderr) console.error(failure)
      //       else console.log(success);
      //     }
      // app.onWindowsOs = () => {
      //   console.log('Windows OS')
      //   exec('getInterfaces.bat', (err, stdout) => {
      //     if (err) console.error(err)
      //     else console.log(stdout);
      //   });
      // }
      // app.onWindowsOs = () => {
      //   console.log('Windows OS')
      //   const job = spawn('cmd.exe', ['./', 'test.bat'])
      //   job.stdout.on('data', (data)=> console.log(data.toString()))
      //   job.stderr.on('data', (data)=> console.error(data.toString))
      //   job.on('exit', (code)=> console.log(`Exited with code: ${ code }`))
      // }




      app.onLinuxOs = () => {
        console.log('Linux OS')
      }




// #!/bin/bash


// echo "Syncing Interfaces from GitHub..."
// cd src/assets/interfaces
// rmdir auth-server-service-interface
// git clone https://github.com/ConciseConstructs/auth-server-service-interface.git
// rmdir database-server-service-interface
// git clone https://github.com/ConciseConstructs/database-server-service-interface.git
// rmdir email-server-service-interface
// git clone https://github.com/ConciseConstructs/email-server-service-interface.git
// rmdir login-server-service-interface
// git clone https://github.com/ConciseConstructs/login-server-service-interface.git
// rmdir icrud
// git clone https://github.com/ConciseConstructs/icrud.git


app.begin()