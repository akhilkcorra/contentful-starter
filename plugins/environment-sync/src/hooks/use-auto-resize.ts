import { useEffect } from 'react'
import { WindowAPI } from '@contentful/app-sdk';

const useAutoResize = (sdkWindow: WindowAPI) => {
    useEffect(() => {
        sdkWindow.startAutoResizer();
    }, [sdkWindow]);
}

export default useAutoResize
