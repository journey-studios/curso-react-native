import { View } from "tamagui"
import { useForm } from 'react-hook-form'
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from "src/components/Button";

import InputComponent from 'src/components/form/InputComponent';
import FormComponent from 'src/components/form/FormComponent';

const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Email incorreto'
  }),
  password: z.string().min(6, {
    message: 'Senha minima de 6 caracteres'
  })
})


type loginFormData = z.infer<typeof loginFormSchema>

const Login = () => {
  const {
    formState: {
      errors
    },
    control,
    handleSubmit
  } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = (data) => {
    alert(`User login ${data.email}`)
  }

  return (
    <FormComponent
      alignItems="center"
    >
      <View
        p="$6"
        gap="$4"
        flexDirection="column"
      >
        <InputComponent
          control={control}
          errors={errors}
          name="email" 
          id="email" 
          label="Email"
        />
        <InputComponent
          control={control}
          errors={errors}
          name="password" 
          id="password" 
          label="Senha"
        />
        <View
          gap="$4"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button 
            f={1}
            navigateTo="/signup"

          >
            Cadastrar
          </Button>
          <Button
            themeInverse
            f={1}
            onPress={handleSubmit(handleLogin)}
          >
            Login
          </Button>
        </View>

      </View>
    </FormComponent>
  )
}

export default Login;