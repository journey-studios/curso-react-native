import { Redirect } from "expo-router";

const IndexPage = () => {
  const authenticated = false;
  
  if (authenticated) {
    return (
      <Redirect href={"/(tabs)"} />
    )
  }

  return (
    <Redirect href={"/(auth)/login"} />
  )
}

export default IndexPage;