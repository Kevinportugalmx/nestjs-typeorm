// patch for typeorm

import { exec } from 'child_process'

const command = `npx typeorm-ts-node-commonjs migration:create ./src/database/migrations/${process.argv[2]}`

;(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr)
    }
    console.log(stdout)
  }))()
