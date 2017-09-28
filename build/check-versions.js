const cp = require('child_process')
const chalk = require('chalk')
const semver = require('semver')
const shell = require('shelljs')
const { oneLine } = require('common-tags')

const packageConfig = require('../package.json')

const exec = cmd => cp.execSync(cmd).toString().trim()

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node,
  },
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm,
  })
}

module.exports = () => {
  const warnings = []

  versionRequirements.forEach((mod) => {
    const { name, currentVersion, versionRequirement } = mod

    if (!semver.satisfies(currentVersion, versionRequirement)) {
      const warning = oneLine`
        ${name}: ${chalk.red(currentVersion)}
        should be ${chalk.green(versionRequirement)}
      `

      warnings.push(warning)
    }
  })

  if (warnings.length) {
    console.log()
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    warnings.forEach((warning) => {
      console.log(`  ${warning}`)
    })

    console.log()
    process.exit(1)
  }
}
