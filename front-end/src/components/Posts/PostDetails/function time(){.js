function time(){

    const dates = new Date();
    const createTime = Data.()
    console.log(dates)
    const thisMonment = Date.now();
    console.log(thisMonment)
    if (thisMonment - dates < 10000) {
        userDate = "Now";
    } else if (thisMonment - dates > 10001 && thisMonment - dates < 100000) {
      userDate = "a few mins age";
    }
    userDate =
      dates.getMonth() + 1 + "/" + dates.getDate() + "/" + dates.getFullYear();
}
time()