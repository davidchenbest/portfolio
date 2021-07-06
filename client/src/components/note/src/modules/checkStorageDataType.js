function checkStorageDataType(data){
    try {
        let arr = JSON.parse(data)
        if( arr === null || arr === undefined) return arr
        else if(Array.isArray(arr)) return arr
        localStorage.setItem("noteList", '[]')
        return []
    } catch (error) {
        localStorage.setItem("noteList", '[]')
        return []
    }
    
}

module.exports=checkStorageDataType