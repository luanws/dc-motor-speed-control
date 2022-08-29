import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Storage from '../../utils/storage'

function usePersistedState<T>(key: string, defaultState: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState<T>(defaultState)

    useEffect(() => {
        Storage.get<T>(key).then(state => {
            if (state !== undefined) setState(state)
        })
    }, [])

    useEffect(() => {
        if (state !== undefined && state !== null) {
            Storage.set(key, state)
        }
    }, [state])

    return [state, setState]
}

export default usePersistedState