

export default function CheckAuth(access_token: string){

    fetch("http://localhost:5001/auth", {
      headers: {
        "access-token": access_token
      }
    })
      .then((response) => {
        console.log(response)
      })

}