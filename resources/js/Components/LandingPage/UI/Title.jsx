export default function Title( { children } ) {
    return (
            <div>
            <h1
                className="
                  relative inline-block
                  text-5xl md:text-8xl font-extrabold mb-8
                  bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent
                  text-center select-none
                  animate-fade-slide-in
                "
            >
                {children}
                <span
                    className="
                      absolute left-0 -bottom-1 h-2 w-full
                      bg-gradient-to-r from-green-500 to-blue-600
                      origin-center scale-x-0
                      animate-grow-underline
                      pointer-events-none rounded-full
                    "
                />
            </h1>
        </div>
    )
}
