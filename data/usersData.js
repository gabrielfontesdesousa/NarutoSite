
function LoadData(){
    const usersData = 
        [
            {
                id: 1,
                user: "Fontes",
                password: "12345"
            },
            {
                id: 2,
                user: "gabs",
                password: "12345"
            
            },
            {
                id: 3,
                user: "bruno",
                password: "12345"
            }
        ]
        usersDataJson = JSON.stringify(usersData)
        localStorage.setItem("DataBase", usersDataJson)
        return usersData;
}