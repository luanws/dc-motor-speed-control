import React, { useState } from 'react'
import { Container, RotateButton, RotateIcon } from './styles'

interface Props {
  onChange?: (isAnticlockwise: boolean) => void
}

const RotationDirection: React.FC<Props> = (props) => {
  const { onChange } = props

  const [isAntiClockwise, setIsAntiClockwise] = useState<boolean>(false)

  function handleLeftPress() {
    const isAnticlockwise = true
    setIsAntiClockwise(isAnticlockwise)
    if (onChange) onChange(isAnticlockwise)
  }

  function handleRightPress() {
    const isAnticlockwise = false
    setIsAntiClockwise(isAnticlockwise)
    if (onChange) onChange(isAnticlockwise)
  }

  return (
    <Container>
      <RotateButton onPress={handleLeftPress}>
        <RotateIcon
          name="rotate-left"
          enabled={isAntiClockwise}
        />
      </RotateButton>
      <RotateButton onPress={handleRightPress}>
        <RotateIcon
          name="rotate-right"
          enabled={!isAntiClockwise}
        />
      </RotateButton >
    </Container >
  )
}

export default RotationDirection