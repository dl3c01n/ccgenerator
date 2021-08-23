const chalk = require('chalk')
const figlet = require('figlet')
const args = process.argv
console.log(chalk.yellow(figlet.textSync('CC generator', {horizontalLayout: 'full'})))


const usage = () => {
    const usageText = `
        Generate any credit card.

        usage:
            ccgen <command>

            commands can be:

            full:   generate a random card.
            date:   generate a valid date only.
            cvv:    generate a valid cvv only.
            cc:     generate a credit card number only.
            help:   help.
    `

    console.log(usageText)
}

const generateCvv = () => {
    const cvv = Math.floor(Math.random()*(999-100+1)+100)
    console.log(chalk.green(`Here comes your CVV code : ${cvv}`))
    return cvv
}

const generateBetween = (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min)
}

const generateCc = () => {
    const start = generateBetween(4000, 5000) || generateBetween(6000, 5000)
    const secondQuarter = generateBetween(1000, 9999)
    const thirdQuarter = generateBetween(1000, 9999)
    const lastQuarter = generateBetween(1000, 9999)
    const cc = `${start}-${secondQuarter}-${thirdQuarter}-${lastQuarter}`
    console.log(chalk.green(`Here is your CC : ${cc}`))
    return cc
}

const generateDate = () => {
    const currentYear = new Date().getFullYear().toString().substr(-2)
    const maxValidation = parseInt(currentYear)+2
    const month = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    const validMonth = month[Math.floor(Math.random() * month.length)]
    console.log(`here is your valid date : ${validMonth}/${maxValidation}`)
    return `${validMonth}/${maxValidation}`
}

const generateFull = () => {
    const date = generateDate()
    const cvv = generateCvv()
    const cc = generateCc()
    console.log(`Here is the full credit card detail : 

        Number :    ${cc}
        Date :      ${date}
        Cvv :       ${cvv}
    `)
}


const errorLog = (err) => {
    const eLog = chalk.red(err)
    console.log(eLog)
}

if(args.length > 3){
    errorLog('Only one argument can be accepted')
    usage()
}

switch(args[2]){
    case 'help':
        usage()
        break
    case 'full':
        generateFull()
        break
    case 'date':
        generateDate()
        break
    case 'cvv':
        generateCvv()
        break
    case 'cc':
        generateCc()
        break
    default:
        errorLog('Invalid command')
        usage()                   
}
