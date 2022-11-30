const process2DArrayToSeparatedArrays = (processArray: number [] []): {arrivalTimes: number[]; burstTimes: number[]} => {
    const at = []
    const bt = []
    const numOfProcesses = processArray.length
    
    for (let i = 0; i < numOfProcesses; i++){
        let process = processArray[i]

        at.push(process[0])
        bt.push(process[1])
    }

    return {arrivalTimes: at, burstTimes: bt} 
}

export {process2DArrayToSeparatedArrays}