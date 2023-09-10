export const InvoiceIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M7.49935 18.3332H12.4993C16.666 18.3332 18.3327 16.6665 18.3327 12.4998V7.49984C18.3327 3.33317 16.666 1.6665 12.4993 1.6665H7.49935C3.33268 1.6665 1.66602 3.33317 1.66602 7.49984V12.4998C1.66602 16.6665 3.33268 18.3332 7.49935 18.3332Z"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.125 7.5H6.875"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.125 12.5H6.875"
        stroke={props.stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AlertIcon = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <circle opacity="0.15" cx="8" cy="8" r="8" fill={props.circlefill} />
      <path
        d="M8.60401 4L8.48945 10.429H7.26887L7.1543 4H8.60401ZM7.88136 13.1081C7.63754 13.1081 7.42897 13.0229 7.25565 12.8525C7.08233 12.6792 6.99714 12.4706 7.00007 12.2268C6.99714 11.9859 7.08233 11.7803 7.25565 11.6099C7.42897 11.4366 7.63754 11.3499 7.88136 11.3499C8.11931 11.3499 8.32494 11.4366 8.49826 11.6099C8.67158 11.7803 8.75971 11.9859 8.76265 12.2268C8.75971 12.3884 8.71711 12.5367 8.63486 12.6719C8.55554 12.804 8.44979 12.9098 8.3176 12.9891C8.1854 13.0684 8.03999 13.1081 7.88136 13.1081Z"
        fill={props.exlamationmarkfill}
      />
    </svg>
  );
};
