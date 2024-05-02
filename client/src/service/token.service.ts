export const setAccesToken = (token:string) => {
    localStorage.setItem("token",token)
}

export const getAccessToken = () => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    return token;
}