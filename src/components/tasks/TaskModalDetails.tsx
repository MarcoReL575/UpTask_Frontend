import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import {  useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateTaskStatus } from '../../api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '../../utils/utils';
import { statusTranslations } from '../../locales/es';
import type { TaskStatus } from '../../types';
import { NotesPanel } from '../notes/NotesPanel';


export default function TaskModalDetails() {

    const params = useParams()
    const projectId = params.projectId!

    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!
    
    const show = taskId ? true : false

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: ()=> getTaskById({projectId, taskId}),
        enabled: !!taskId
    })
    
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateTaskStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data)=> {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus
        mutate({ projectId, taskId, status})
    }
    
    if(isError) {
        toast.error(error.message, {toastId: 'error'})
        return <Navigate to={`/projects/${projectId}`} />
    }

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle className='flex justify-end items-center'>
                                        <div className='bg-red-500 size-10 flex items-center justify-center rounded-lg hover:bg-red-600 cursor-pointer'>
                                            <XMarkIcon
                                                onClick={() => navigate(location.pathname, {replace: true})} 
                                                className='size-8 text-white rounded-lg'>
                                            </XMarkIcon>
                                        </div>
                                    </DialogTitle>
                                    <div>
                                        <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                        <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    </div>              
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}</DialogTitle>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                                    <p className='text-2xl text-slate-500 mb-2'>Historial de Cambios:</p>
                                    { data.completedBy.length ? (
                                        <>
                                            <ul className=' list-decimal'>
                                                {data.completedBy.map((activityLog) => (
                                                    <li key={activityLog._id} className='font-bold text-slate-600 mt-1 text-sm space-y-0 space-x-2 flex '>
                                                        <span className='text-2sm text-olivine-500'>{statusTranslations[activityLog.status]}.</span>
                                                        <span className='text-2sm text-slate-500'>Por: {activityLog.user.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    ): null}
                                    
                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: </label>
                                        <select
                                            className='w-full p-3 bg-white border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value])=> (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <NotesPanel notes={data.notes}/>
                                </DialogPanel>
                            </TransitionChild> 
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}