export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount/limit)
}

export const getPagesArray = (totatPages) => {
    let result = []
   for (let i = 0; i < totatPages; i++){
        result.push(i+1)
    }
    return result;
}