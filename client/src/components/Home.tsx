import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  //when the dependency array is empty the function in the useEffect will only run when the component is mounted and unmounted
  //will run the first function when mounted and the return function when unmounted
  //typically state variables go in the dependency array
  useEffect(() => {
    console.log("mount");

    if (!localStorage.getItem("access")) {
      navigate("/login");
    }
    return () => {
      console.log("Cleanup");
    };
  }, []);

  return <>Home</>;
}
