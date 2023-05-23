import React, { PropsWithChildren, useEffect, useState } from 'react'
import { Props, useKeyContext } from '../KeyContext'
import { Fade } from '../animations/Fade'
import { useFeatureAutomation } from '../../utils/hooks/useFeatureAutomation'

interface WelcomeStep {
  title: string
  description: string
  buttonText: string
  buttonAction?: () => void
}

export const WelcomeSidebar = () => {
  const { sidebarIsOpen, setSidebarIsOpen, setFocusedId } = useKeyContext()
  const [welcomeState, setWelcomeState] = useState<number>(0)
  const {
    automateSetRootNote,
    automatePentatonicScale,
    automateChordSelection,
  } = useFeatureAutomation()
  useEffect(() => {
    if (!sidebarIsOpen) setWelcomeState(0)
  }, [sidebarIsOpen])

  const goToNextStep = () => {
    setWelcomeState((state) => state + 1)
  }
  const closeSidebar = () => setSidebarIsOpen(false)

  const steps: WelcomeStep[] = [
    {
      title: 'Welcome to Fretboard.fyi!',
      description:
        'With Fretboard.fyi, you can easily navigate the guitar fretboard, visualize scales and chords in any key, and discover chord voicings across the neck.',
      buttonText: 'Get started',
      buttonAction: async () => {
        goToNextStep()
        await automateSetRootNote()
      },
    },
    {
      title: 'Learn Scales Across the Fretboard',
      description:
        'Select a harmonic key and see the full scale across the fretboard. Ideal for learning scales in different keys and understanding the fretboard layout.',
      buttonText: 'Next',
      buttonAction: goToNextStep,
    },
    {
      title: 'Unlock Your Improvisation Skills',
      description:
        'Use visualized scales to start improvising and jamming along with songs in any key. Express your musical ideas and level up your playing.',
      buttonText: 'Next',
      buttonAction: async () => {
        goToNextStep()
        await automatePentatonicScale()
      },
    },
    {
      title: 'Explore the Pentatonic Scale',
      description:
        'Click on the pentatonic scale button to see a visual representation. This versatile scale adds melodic flair, opening up possibilities for captivating melodies and solos.',
      buttonText: 'Next',
      buttonAction: async () => {
        goToNextStep()
        await automateChordSelection()
      },
    },
    {
      title: 'Diversify Your Chord Progressions',
      description:
        'Discover alternative chord voicings by clicking on a chord name. Find a range of voicings across the neck, adding unique sounds and variations to familiar songs.',
      buttonText: 'Next',
      buttonAction: goToNextStep,
    },
    {
      title: 'Write Music, fast',
      description:
        'Easily identify appropriate chords within a key using Fretboard.fyi. Perfect for songwriters, it simplifies finding harmonizing chords and writing music efficiently.',
      buttonText: "Let's rock!",
      buttonAction: closeSidebar,
    },
  ]

  const step = steps[welcomeState]

  return (
    <div
      className={`w-[30vw] lg:w-[25vw] bg-slate-800/50 backdrop-blur-sm text-white transition-transform duration-500 ease-in-out transform rounded-2xl ${
        sidebarIsOpen ? 'translate-x-0' : 'translate-x-full'
      } fixed top-0 right-0 h-screen z-[100]`}
    >
      <WelcomeContent step={step} />
    </div>
  )
}

const WelcomeContent = ({ step }: PropsWithChildren<{ step: WelcomeStep }>) => {
  return (
    <Fade key={step.title} className="min-h-screen">
      <div className={'flex flex-col mt-44 items-center p-10 min-h-screen'}>
        <p className={'text-white font-inter text-3xl mb-8 text-center'}>
          {step.title}
        </p>
        <p className={'font-inter text-sm mb-10 text-center'}>
          {step.description}
        </p>
        <button
          className={'rounded-md border-white border-2 p-1 w-32'}
          onClick={step.buttonAction}
        >
          {step.buttonText}
        </button>
      </div>
    </Fade>
  )
}