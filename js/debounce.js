const debounce = (fn, d) => {
    let timer
    let context = this
    // cant access search.value here

    return () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, [search.value]) //context is nothing but the window object here
        }, d)
    }
}

export default debounce