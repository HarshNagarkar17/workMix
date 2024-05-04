export const setTokens = (token:string) => {
    localStorage.setItem("tokens",token)
}

export const getTokens = () => {
    const tokens = JSON.parse(localStorage.getItem("tokens") as string);
    return tokens;
}