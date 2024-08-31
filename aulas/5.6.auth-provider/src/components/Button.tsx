import { useRouter } from 'expo-router';
import {
  Button as ButtonT,
  Spinner,
  styled,
  Text,
} from 'tamagui';

type ButtonProps = {
  loading?: boolean;
  navigateTo?: string;
  onPress?: any;
}

const StyledButton = styled(ButtonT, {
  backgroundColor: "$blue6",
  borderColor: "$blue8",
  pressStyle: {
    backgroundColor: "$blue8",
  }
})

const Loading = () => {
  return <Spinner/>
}

const Button = StyledButton.styleable<ButtonProps>(({
  children,
  navigateTo,
  onPress,
  loading,
  ...rest
}, ref) => {
  const router = useRouter();

  // const handlePress = function() {}
  const handlePress = (e) => {
    if(loading) {
      return null;
    }

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
      {loading ? (
        <Loading/>
      ) : (
        <Text>
          {children}
        </Text>
      )}
    </StyledButton>
  )
})

export default Button;
