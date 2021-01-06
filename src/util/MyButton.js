import { IconButton, Tooltip } from '@material-ui/core'
import React from 'react'

export default ({children,onClick,btnClassName,tip,tipClassName}) => (
    <Tooltip title={tip} className={tipClassName}>
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>
    </Tooltip>
)
