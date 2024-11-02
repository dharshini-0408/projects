async function apiRequest(url ='', optionsObject = null, errMsg = null){ // In here optionsObject send a value of url like GET,POST in object type
    try{
        let response = await fetch(url,optionsObject);
        if(!response.ok) throw Error("Please reload the page");
    }catch(err){
        errMsg = err.Message;
    }finally{
        return errMsg;
    }
};
export default apiRequest;