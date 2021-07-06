const month = []
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

export const getDate = str =>{
    let today = new Date()
    let d = new Date(str)
    let time = d.toLocaleDateString()
    let year = d.getFullYear()
    if( time === today.toLocaleDateString()) return formatTime(d.toLocaleTimeString())
    if( year === today.getFullYear() ) return `${month[d.getMonth()]} ${d.getDate()}`
    return `${month[d.getMonth()]} ${d.getDate()}, ${year}`
}

const formatTime = time =>{
    let t = time+''
    let arr = t.split(' ')
    let arr2 =  arr[0].split(':')
    arr2.splice(arr2.length-1)
    return arr2.join(':') + ' ' + arr[1]
}