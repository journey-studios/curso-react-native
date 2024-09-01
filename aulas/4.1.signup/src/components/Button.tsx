import { Href, useRouter } from 'expo-router';
import {
  Button as ButtonT,
  ButtonProps as ButtonTProps
} from 'tamagui';

type ButtonProps = ButtonTProps & {
  navigateTo?: Href;
  onPress?: any;
}

const Button = ({
  children,
  navigateTo,
  onPress,
  ...rest
}:ButtonProps) => {
  const router = useRouter();

  // const handlePress = function() {}
  const handlePress = (e) => {
    e.preventDefault();
    if(navigateTo) {
      router.push(navigateTo)
    }

    if(onPress && typeof onPress === 'function' ) {
      onPress();
    }
  }
 
  return (
    <ButtonT onPress={handlePress} {...rest}>
      {children}
    </ButtonT>
  )
}

export default Button;
