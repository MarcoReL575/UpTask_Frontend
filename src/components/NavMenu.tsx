import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import type { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
    name: User['name']
}

export const NavMenu = ({name}: NavMenuProps) => {

    const queryClient = useQueryClient()
    const logout = ()=> {
        localStorage.removeItem('AuthToken')
        queryClient.invalidateQueries({queryKey: ['user']})
    }

  return (
    <Menu>
        <MenuButton >
            <Bars3Icon className='text-2xl size-12'/>
        </MenuButton>
        <MenuItems 
            className='w-2xs pt-4 text-center bg-white text-lg font-semibold shadow-lg rounded-lg' 
            anchor="bottom"
        >
            <h1 >Bienvenido: <span >{name}</span></h1>
            <MenuItem>
                <Link 
                    to='/profile'
                    className='block hover:bg-gray-400 p-2'
                >Mi Perfil</Link>    
            </MenuItem>
            <MenuItem>
                <Link 
                    to='/'
                    className='block hover:bg-gray-400 p-2'
                >Mis Proyectos</Link> 
            </MenuItem>
            <MenuItem>
                <Link 
                    to='/'
                    className='block hover:text-white hover:bg-red-600 p-2'
                    onClick={logout}
                >Cerrar Sesión</Link> 
            </MenuItem>
      </MenuItems>
    </Menu>
  )
}
