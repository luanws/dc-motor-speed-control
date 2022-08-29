import React from 'react'
import { useTheme } from '../../hooks/theme'
import { Container, Slider } from './styles'

interface Props {
  maxSpeed: number
  speed: number
  onChange: (speed: number) => void
}

const SpeedSlider: React.FC<Props> = (props) => {
  const { maxSpeed, speed, onChange } = props

  const { colors } = useTheme()

  return (
    <Container>
      <Slider
        minimumValue={0}
        maximumValue={maxSpeed}
        value={speed}
        onValueChange={onChange}
        thumbTintColor={colors.danger}
        maximumTrackTintColor={'gray'}
        minimumTrackTintColor={colors.danger}
      />
    </Container>
  )
}

export default SpeedSlider