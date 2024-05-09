export const setTokensToLocalStorage = (tokens:any) => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
}

export const removeTokensFromLocalStorage = () => {
    localStorage.removeItem("tokens");
}

export const getTokensFromLocalStorage = ()=>{
    const tokens = JSON.parse(localStorage.getItem("tokens") as string);
    return tokens ? tokens : null;
}