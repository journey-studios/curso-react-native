import { Href, useRouter } from 'expo-router';
import {
  Button as ButtonT,
  styled,
} from 'tamagui';

type ButtonProps = {
  navigateTo?: Href;
  onPress?: any;
}

const StyledButton = styled(ButtonT, {
  backgroundColor: "$blue6",
  borderColor: "$blue8",
  pressStyle: {
    backgroundColor: "$blue8",
  }
})

const Button = StyledButton.styleable<ButtonProps>(({
  children,
  navigateTo,
  onPress,
  ...rest
}, ref) => {
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
    <StyledButton ref={ref} onPress={handlePress} {...rest}>
      {children}
    </StyledButton>
  )
})

export default Button;
