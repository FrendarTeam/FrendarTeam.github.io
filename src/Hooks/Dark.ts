const getDarkMode = () => {
    const color = localStorage.getItem('color')

    if (color === 'black') {
        return true
    }

    return false
}

export { getDarkMode }
