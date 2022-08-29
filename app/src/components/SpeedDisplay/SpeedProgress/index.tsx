import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { Container, SpeedProgressBar, SpeedProgressBarContainer } from './styles'

interface Props {
  progress: number
  maxProgress: number
}

const SpeedProgress: React.FC<Props> = (props) => {
  const { progress, maxProgress } = props

  const fadeAnimation = useRef(new Animated.Value(0)).current

  const [animatedProgress, setAnimatedProgress] = useState<number>(0)

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }, [progress])

  useEffect(() => {
    fadeAnimation.addListener(({ value }) => {
      setAnimatedProgress(value)
    })
  }, [])

  return (
    <Container>
      <SpeedProgressBarContainer>
        <SpeedProgressBar
          progress={animatedProgress}
          maxProgress={maxProgress}
        />
      </SpeedProgressBarContainer>
    </Container>
  )
}

export default SpeedProgress