const size = {
    sm: "300px",
    md: "500px",
    bg: "900px"
}

const breakpointWidth = {
    sm: `(max-width: ${ size.sm })`,
    md: `(max-width: ${ size.md })`,
    bg: `(max-width: ${ size.bg })`,
}

const breakpointHeight = {
    sm: `(max-height: ${ size.sm })`,
    md: `(max-height: ${ size.md })`,
    bg: `(max-height: ${ size.bg })`,
}

export { breakpointWidth, breakpointHeight }