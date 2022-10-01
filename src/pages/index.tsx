import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { format } from 'date-fns'

import { VscDebugStart, VscDebugStop, VscDebugPause } from 'react-icons/vsc'

import { useRouter } from 'next/router'
import Logo from '../assets/logo_gbsnet.svg'
import Countdown from '../components/countdown'
import Input from '../components/input'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const router = useRouter()
  const { minutes } = router.query

  const [editTitle, setEditTitle] = useState(false)
  const [title, setTitle] = useState<string | undefined>()
  const [editSubTitle, setEditSubTitle] = useState(false)
  const [subTitle, setSubTitle] = useState<string | undefined>()

  const [statusCountdown, setStatusCountdown] = useState('stop')
  const [time, setTime] = useState(0)

  const date = format(new Date(), 'dd/MM/yyyy')

  useEffect(() => {
    if (time && statusCountdown == 'start') {
      setTimeout(() => {
        setTime(time - 1000)
        localStorage.setItem('minutes', String(time));
      }, 1000)
    }
  }, [time, statusCountdown])

  useEffect(() => {
    const findStatus = localStorage.getItem('status_countdown')
    const findTitle = localStorage.getItem('title')
    const findSubTitle = localStorage.getItem('subTitle')
    const findMinutes = localStorage.getItem('minutes')

    if (findStatus) {
      setStatusCountdown(findStatus)
    }
    if (findTitle) {
      setTitle(findTitle)
    }
    if (findSubTitle) {
      setSubTitle(findSubTitle)
    }
    if (minutes) {
      const min = Number(findMinutes) || Number(minutes) * 1000 * 60
      setTime(min)
    }
  }, [minutes])

  const getFormatted = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60
    const minutes = totalMinutes % 60

    return `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`
  }

  const handleEditTitle = () => {
    if (title) {
      localStorage.setItem('title', title)
      setEditTitle(false)
    } else {
      alert('Por favor, insira o titulo da reunião.')
    }
  }

  const handleEditSubTitle = () => {
    if (subTitle) {
      localStorage.setItem('subTitle', subTitle)
      setEditSubTitle(false)
    } else {
      alert('Por favor, insirá a pauta da reunião.')
    }
  }

  const handleStart = () => {
    setStatusCountdown('start')
    localStorage.setItem('status_countdown', 'start');
  }

  const handlePaused = () => {
    setStatusCountdown('pause')
    localStorage.setItem('status_countdown', 'pause');
  }

  const handleStopped = () => {
    setStatusCountdown('stop')
    localStorage.setItem('status_countdown', 'stop');
    localStorage.removeItem('minutes')
    const min = Number(minutes) * 1000 * 60
    setTime(min)
  }

  return (
    <>
      <Head>
        <title>GbNet - Reuniões</title>
      </Head>

      <div className="flex flex-col w-screen h-screen bg-gray-200">
        <header className='flex items-center justify-between w-full h-36 bg-[#070272] p-5' style={{
          boxShadow: "0 17px #FF4000",
          borderRadius: "0 0 15px 15px"
        }}>
          <div className='flex flex-col'>
            {!editTitle
              ? <motion.h1
                className="font-sans not-italic text-4xl font-bold text-white text-[30px] cursor-pointer"
                // onClick={() => setEditTitle(true)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Reunião: GbsNet {date}
              </motion.h1>
              :
              <input
                type="text"
                className='outline-none font-sans not-italic text-4xl font-bold text-white text-[30px] bg-transparent'
                onChange={e => setTitle(e.target.value)}
                onKeyDown={e => e.key == 'Enter' ? handleEditTitle() : ''}
                autoFocus
              />}
            {!editSubTitle
              ?
              <motion.span
                className='font-sans not-italic font-light text-white text-[20px] cursor-pointer'
                onClick={() => setEditSubTitle(true)}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                Pauta: {subTitle || 'Pauta da reunião'}
              </motion.span>
              :
              <input
                type="text"
                className='outline-none font-sans not-italic font-light text-white text-[20px] bg-transparent'
                onChange={e => setSubTitle(e.target.value)}
                onKeyDown={e => e.key == 'Enter' ? handleEditSubTitle() : ''}
                autoFocus
              />}
          </div>
          <Image src={Logo} />
        </header>

        <main className='flex flex-col items-center justify-center w-full h-full'>
          <Countdown time={getFormatted(time)} />
          <div className='flex items-center justify-center gap-5 w-[450px] h-[60px]'>
            <Input />
          </div>
          <div className='flex items-center justify-between mt-3 w-[300px] h-[60px]'>
            <motion.button
              className={`flex items-center justify-center w-[50px] h-[50px] ${statusCountdown === 'start' ? 'bg-[#070272]' : 'bg-gray-600'} rounded-full text-white`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePaused()}
              disabled={statusCountdown != 'pause' ? false : true}
            >
              <VscDebugPause size={32} />
            </motion.button>

            <motion.button
              className={`flex items-center justify-center w-[50px] h-[50px] ${statusCountdown != 'start' ? 'bg-[#070272]' : 'bg-gray-600'} rounded-full text-white`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStart()}
              disabled={statusCountdown != 'start' ? false : true}
            >
              <VscDebugStart size={32} />
            </motion.button>

            <motion.button
              className={`flex items-center justify-center w-[50px] h-[50px] ${statusCountdown === 'pause' ? 'bg-[#070272]' : 'bg-gray-600'} rounded-full text-white`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStopped()}
              disabled={statusCountdown == 'pause' ? false : true}
            >
              <VscDebugStop size={32} />
            </motion.button>
          </div>
        </main>
      </div>
    </>

  )
}

export default Home
