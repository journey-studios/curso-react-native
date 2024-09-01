import { useState } from "react";
import { ScrollView, View } from "tamagui"
import FormComponent from 'src/components/form/FormComponent'
import InputComponent from 'src/components/form/InputComponent'
import Button from 'src/components/Button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'expo-router'
import useSupabase from "src/hooks/useSupabase";

const signupFormSchema = z.object({
  first_name: z.string().min(6, {
    message: 'Primeiro nome deve ter 6 caracteres'
  }),
  second_name: z.string().min(6, {
    message: 'Segundo nome deve ter 6 caracteres'
  }),
  email: z.string().min(6, {
    message: 'Email deve ter 6 caracteres'
  }),
  password: z.string().min(6, {
    message: 'Senha minima de 6 caracteres'
  }),
  confirm_password: z.string().min(6, {
    message: 'Confirmação da senha minima de 6 caracteres'
  }),
}).refine((data) => data.password === data.confirm_password, {
  message: 'A senha e a confirmação da senha são diferentes',
  path: ['confirm_password']
})

type signupFormData = z.infer<typeof signupFormSchema>


const Signup = () => {
  const [loading, setLoading] = useState(false);
  const supabase = useSupabase();
  const router = useRouter();

  const {
    formState: {
      errors
    },
    control,
    handleSubmit
  } = useForm<signupFormData>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      first_name: '',
      second_name: '',
      email: '',
      password: '',
      confirm_password: ''
    }
  });

  const handleRegister = async (data) => {
    setLoading(true);
    const result = await supabase.auth.signUp({
      email: data.email,
      password: data.password
    })

    if(result.error) {
      setLoading(false);
      alert(result.error)
      return false;
    }

    if(result.data.session) {
      alert('Usuário cadastrado com sucesso!')
    }
    setLoading(false);
  }

  return (
    <ScrollView>
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
            name="first_name" 
            id="first_name" 
            label="Nome"
          />
          <InputComponent
            control={control}
            errors={errors}
            name="second_name" 
            id="second_name" 
            label="Sobrenome"
          />
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
          <InputComponent
            control={control}
            errors={errors}
            name="confirm_password" 
            id="confirm_password" 
            label="Confirmação da senha"
          />
          <View
            gap="$4"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Button
              f={1}
              onPress={() => {
                router.back()
              }}
            >
              Voltar
            </Button>
            <Button 
              f={1}
              themeInverse
              loading={loading}
              onPress={handleSubmit(handleRegister)}
            >
              Cadastrar
            </Button>
          </View>

        </View>
      </FormComponent>
    </ScrollView>
  )
}

export default Signup;