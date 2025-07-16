const Menu = ({ ...props }) => {
    return (
        <svg
            width="19"
            height="16"
            viewBox="0 0 19 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x="1"
                y="7"
                width="17"
                height="2"
                rx="0.81"
                fill="#000"
                stroke="#000"
                strokeWidth="0.3"
                strokeLinecap="round"
            />
            <rect
                x="1"
                y="1"
                width="17"
                height="2"
                rx="0.81"
                fill="#000"
                stroke="#000"
                strokeWidth="0.3"
                strokeLinecap="round"
            />
            <rect
                x="1"
                y="13"
                width="17"
                height="2"
                rx="0.81"
                fill="#000"
                stroke="#00"
                strokeWidth="0.3"
                strokeLinecap="round"
            />
        </svg>
    )
}

export default Menu
