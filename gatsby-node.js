const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const readdir = require('recursive-readdir')

exports.onPostBuild = async ({ reporter }, { thresholdInKb = 100 }) => {
  const pageJsonDir = path.join(process.cwd(), '/public/page-data')
  await readdir(pageJsonDir).then(
    files => {
      files
        .filter(filePath => filePath.includes('page-data.json'))
        .forEach(filePath => {
          const stats = fs.statSync(filePath)
          const fileSizeInBytes = stats.size
          const fileSizeInKb = (fileSizeInBytes / 1000).toFixed(0)
          if (fileSizeInKb > thresholdInKb) {
            const url = filePath
              .replace(pageJsonDir, '')
              .replace('/page-data.json', '')
            const amountOver = fileSizeInKb - thresholdInKb.toFixed(0)
            const color = amountOver > thresholdInKb / 2 ? 'red' : 'yellow'
            const message = `page-data.json is ${chalk.keyword(color)(
              `${fileSizeInKb}kb`
            )} (${amountOver}kb above ${thresholdInKb}kb threshold) for ${url}`
            reporter.warn(message)
          }
        })
    },
    error => reporter.error(error)
  )
}
