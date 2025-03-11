const createError = (code, message) => {
    //code
    console.log("Step 1 Create error")
    const err = new Error(message);
    err.statusCode = code;
    throw err;
}

module.exports = createError;