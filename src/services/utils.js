export const formatDate = (birth) => {
    //const birthdate = user ? new Date(user.birthdate) : new Date()
    const birthdate = new Date(birth)
    let day = birthdate.getDate()
    let month = birthdate.getMonth() + 1
    const year = birthdate.getFullYear()
  
    if (day < 10) 
      day = "0" + day
    if (month < 10) 
      month = "0" + month
    
    return year + '-' + month + '-' + day
  }
  