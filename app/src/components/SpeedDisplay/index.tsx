import React from 'react'
import SpeedProgressBar from './SpeedProgress'
import { Container, SpeedText, TitleText } from './styles'

interface Props {
  title: string
  speed: number
  maxSpeed: number
}

const SpeedDisplay: React.FC<Props> = (props) => {
  const { speed, title, maxSpeed } = props

  const speedString = `${Math.round(speed)}`

  return (
    <Container>
      <TitleText>{title}</TitleText>
      <SpeedText>{speedString} RPM</SpeedText>
      <SpeedProgressBar progress={speed} maxProgress={maxSpeed} />
    </Container>
  )
}

export default SpeedDisplay