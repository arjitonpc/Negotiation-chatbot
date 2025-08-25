
import fs from 'fs'

export class Store {
  constructor(filePath) {
    this.filePath = filePath
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(require('path').dirname(filePath), { recursive: true })
    }
    if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({ sessions: {} }, null, 2))
  }
  read() {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
  }
  write(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2))
  }
}
