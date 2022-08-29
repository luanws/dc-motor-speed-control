import React, { useEffect, useState } from 'react'
import RotationDirection from '../../components/RotationDirection'
import SpeedDisplay from '../../components/SpeedDisplay'
import SpeedSlider from '../../components/SpeedSlider'
import { SpeedService } from '../../services/speed'
import { Container } from './styles'

const Home: React.FC = () => {
  const maxSpeed = 100

  const [speed, setSpeed] = useState<number>(0)
  const [realSpeed, setRealSpeed] = useState<number | undefined>(undefined)
  const [isAntiClockwise, setIsAntiClockwise] = useState<boolean>(false)

  useEffect(() => {
    const listener = SpeedService.listenRealSpeed(setRealSpeed)
    return () => listener.off()
  }, [])

  useEffect(() => {
    SpeedService.setSpeed(isAntiClockwise ? -speed : speed)
  }, [speed, isAntiClockwise])

  return (
    <Container>
      <SpeedDisplay
        title='Velocidade real'
        speed={realSpeed || 0}
        maxSpeed={maxSpeed}
        />
      <SpeedDisplay
        title='Velocidade'
        speed={speed}
        maxSpeed={maxSpeed}
      />
      <SpeedSlider
        maxSpeed={maxSpeed}
        speed={speed}
        onChange={setSpeed}
      />
      <RotationDirection
        onChange={setIsAntiClockwise}
      />
    </Container>
  )
}

export default Home