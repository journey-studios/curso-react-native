import { Controller } from 'react-hook-form';
import { View, Label, Input, AnimatePresence, Text } from 'tamagui'
import { Info } from '@tamagui/lucide-icons'

const InputComponent = ({
  name,
  label,
  id,
  control,
  errors
}) => {
  
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <View
          {...(errors[name] && {
            theme: 'red'
          })}
          minWidth="100%"
        >
          <Label> {label} </Label>
          <Input
            onBlur={field.onBlur}
            onChangeText={field.onChange}
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
                <Info size={"$1"}
                color="$color10"/>
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
  )
}

export default InputComponent;