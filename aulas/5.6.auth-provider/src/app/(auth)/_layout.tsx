import { Redirect, Stack } from "expo-router";
import { useAuth } from "src/modules/auth/AuthContext";
import { Text, View } from "tamagui";

const AuthLayout = () => {
  const auth = useAuth()

  if(auth.isLoading) {
    return (
      <View f={1} p="$10">
        <Text>Loading</Text>
      </View>
    )
  }

  if(auth.isAuthenticated) {
    return <Redirect href={"(tabs)"}/>
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
    </Stack>
  )
}

export default AuthLayout;