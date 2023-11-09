import Cookies from "js-cookie";

export default async function CheckAuth(): Promise<boolean>{
    const accessToken = Cookies.get("token");
    fetch("http://localhost:5001/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
      }),
    })
    .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Authorized User");
          return true;
        } else {
          // Display an error message
          console.log("Unauthorized User");
          return false;
        }
      }).catch(()=>{return false}).catch(()=>{return false});
      console.log("insta false")
      return false;
      
}