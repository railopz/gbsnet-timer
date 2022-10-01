import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'

interface Props {
    time: string
}
const Countdown: React.FC<Props> = ({ time }) => {
    return (
        <motion.div
            className='flex justify-center items-center font-sans text-10xl text-[#FF4000] w-[600px]'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <span>{time}</span>
        </motion.div>
    );
}

export default Countdown;