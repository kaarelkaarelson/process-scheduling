const validateProcessString = (processString: string) => {

    const regex = /\d,\d+(?:;\d+,\d+)+/

    return regex.test(processString)
}

export {validateProcessString}