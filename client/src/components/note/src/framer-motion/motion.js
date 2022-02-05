export const slideDownVariant = {
    initial: {
        y: '-100vh',
    },
    animate: {
        y: 0,
        transition: {
            duration: .3,
            delayChildren: .1,
            when: 'beforeChildren',

        }
    }
}

export const scaleVariant = {
    initial: {
        scale: 0,
    },
    animate: {
        scale: 1,
        transition: {
            duration: .2,
            delayChildren: .1,
            when: 'beforeChildren',

        }
    }
}

export const addNoteVariant={
    hover:{
        scale: 1.2,
        transition: { duration: .3 },
    },
    initial:{
        x:0
    },
    animate:{
        x: [-20, 20, 0],
        transition: { duration:.3,type: "spring", stiffness: 100, bounce: 0, ease:'linear' },
    }
    
}