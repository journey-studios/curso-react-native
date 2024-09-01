import { Redirect } from "expo-router";
import { useAuth } from "src/modules/auth/AuthContext";
// import { useAuth } from "src/modules/auth/AuthContext"

const IndexPage = () => {
  const auth = useAuth();
  if(auth.isAuthenticated) {
    return (
      <Redirect href={"(tabs)"} />
    )
  }

  return (
    <Redirect href={"(auth)/login"} />
  )
}

export default IndexPage;