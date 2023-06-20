import { useEffect } from 'react'

const useTabNavigation = (className = "focusable" ) => {

    useEffect(() => {
        // const searchInput = document.getElementById("search-input")
        const handleKeyDown = (event) => {

            // if (event.key === "/" && document.activeElement !== searchInput) {
            //     event.preventDefault()
            //     setActive(true)
            // }

            if (event.key === 'Tab') {
                event.preventDefault();

                const elements = document.querySelectorAll(`.${className}`);
                const currentIndex = Array.from(elements).findIndex((el) =>
                    el === document.activeElement
                );

                let nextIndex;
                if (event.shiftKey) {
                    // Reverse tab navigation
                    nextIndex = currentIndex === 0 ? elements.length - 1 : currentIndex - 1;
                } else {
                    // Forward tab navigation
                    nextIndex = (currentIndex + 1) % elements.length;
                }

                elements[nextIndex].focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
}

export default useTabNavigation
