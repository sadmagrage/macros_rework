const size = {
    sm: "300px",
    md: "500px",
    bg: "900px"
}

const breakpoint = {
    sm: `(max-width: ${ size.sm })`,
    md: `(max-width: ${ size.md })`,
    bg: `(max-width: ${ size.bg })`,
}

export default breakpoint