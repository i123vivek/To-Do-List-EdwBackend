const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlY3SVJldEozYyIsImlhdCI6MTU3MzIwMzIxNjkxNCwiZXhwIjoxNTczMjg5NjE2OTE0LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZC1wMi1Uby1Eby1MaXN0IiwiZGF0YSI6eyJ1c2VySWQiOiJuLVNna1BfbkkiLCJmaXJzdE5hbWUiOiJyYWh1bCIsImxhc3ROYW1lIjoia3IiLCJlbWFpbCI6InJhaHVsQGdtYWlsLmNvbSIsIm1vYmlsZU51bWJlciI6OTQzMTU4MjA1OCwiY291bnRyeSI6ImluZGlhIiwiY291bnRyeUNvZGUiOjkxLCJyZXNldFBhc3N3b3JkVG9rZW4iOiIiLCJyZXNldFBhc3N3b3JkRXhwaXJlcyI6IiIsImZyaWVuZHMiOlt7ImZyaWVuZElkIjoiZUczV2VXSXJqIiwiZnJpZW5kTmFtZSI6InNhdHUga3IiLCJfaWQiOiI1ZGJhOGNiMjgzNjliOTBhMDQ3NWQwYjQifV0sImZyaWVuZFJlcXVlc3RSZWNpZXZlZCI6W10sImZyaWVuZFJlcXVlc3RTZW50IjpbeyJmcmllbmRJZCI6ImxDeURqZFczTiIsImZyaWVuZE5hbWUiOiJzaGl2YW0iLCJfaWQiOiI1ZGM1MmNmYmE2ZDJkNDEyY2Q2OTI1MzgifV19fQ.aVsVcX0uu6YTHB76Ahv6PaaO6jqZGnSV-Ctt3mexhj0"

const userId = "n-SgkP_nI"


let friendSocket = () =>{
    socket.on('verifyUser', (data) =>{
        console.log("socket trying to verify user")
        socket.emit('set-user', authToken);
    })

    socket.on(userId, (data) =>{
        console.log("you received a message");
        console.log(data);
    })
}

friendSocket();