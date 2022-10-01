import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'

import { FiCheck } from 'react-icons/fi'

const Input: React.FC = () => {
    const [editUser, setEditUser] = useState(false)
    const [userName, setUserName] = useState<string | undefined>()

    useEffect(() => {
        const findUser = localStorage.getItem('userName')
        if (findUser) {
            setUserName(findUser)
        } else {
            setEditUser(true)
        }
    }, [])

    const handleEditUserName = () => {
        if (userName) {
            localStorage.setItem('userName', userName)
            setEditUser(false)
        } else {
            alert('Por favor, insirá o nome do palestrante.')
        }
    }

    return (
        <>
            <div className='relative flex items-center justify-center w-full h-full bg-[#070272] rounded-md'>
                {!editUser ?
                    <motion.span
                        className='flex items-center justify-center font-medium text-[40px] text-white cursor-pointer'
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        onClick={() => setEditUser(true)}
                    >
                        {userName ? userName.toUpperCase() : ''}
                    </motion.span>
                    :
                    <motion.input
                        className='w-full h-full outline-none rounded-md p-5 font-bold text-[40px] bg-[#070272] text-white'
                        type="text"
                        onKeyDown={(e) => e.key == 'Enter' ? handleEditUserName() : ''}
                        onChange={e => setUserName(e.target.value)}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        autoFocus
                    />
                }
            </div>
            {editUser && (
                <motion.div
                    className='flex items-center justify-center right-[-60px] w-12 h-12 bg-green-600 rounded-md'
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FiCheck
                        size={30}
                        cursor="pointer"
                        color='#FFF'
                        onClick={handleEditUserName}
                    />
                </motion.div>
            )}
        </>
    );
}

export default Input;