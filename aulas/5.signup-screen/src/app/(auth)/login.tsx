import { AnimatePresence, Input, Label, styled, Text, View } from "tamagui"
import { Controller, useForm } from "react-hook-form"
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from "src/components/Button";
import { Info } from "@tamagui/lucide-icons";

const FormComponent = styled(View, {
  tag: 'form',
  f: 1,
  flexDirection: 'row',
  maxWidth: '100%'
})

const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Email incorreto'
  }),
  password: z.string().min(6, {
    message: 'Senha minima de 6 caracteres'
  })
})


const InputComponent = ({
  name,
  id,
  control,
  label,
  errors
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field}) => (
          <View
            {...(errors[name] && {
              theme: 'red'
            })}
            minWidth="100%"
          >
            <Label> {label} </Label>
            <Input
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              value={field.value}
              id={id}
            />

            {errors[name] && 
              <AnimatePresence>
                <View
                  left={0}
                  gap="$2"
                  flexDirection="row"
                  animation={"bouncy"}
                  scaleY={1}
                  enterStyle={{
                    opacity: 0,
                    y: -10,
                    scaleY: 0.5
                  }}
                  paddingVertical="$2"
                >
                  <Info size={"$1"} color="$color10"/>
                  <Text
                    p="$1"
                    color="$color10"
                    fontWeight={"$2"}
                  >
                    {errors[name].message}
                  </Text>
                </View>
              </AnimatePresence>
            }
          </View>
        )}
      >
       
      </Controller>
    </>
  )
}

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
    
    >
      <View
        p="$6"
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
          label="Password"
        />

        <Button onPress={handleSubmit(handleLogin)}>
          Login
        </Button>
      </View>
    </FormComponent>
  )
}

export default Login;