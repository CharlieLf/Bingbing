function IconPerson(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 15 15" height="100%" width="100%" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.5.875a3.625 3.625 0 00-1.006 7.109c-1.194.145-2.218.567-2.99 1.328-.982.967-1.479 2.408-1.479 4.288a.475.475 0 10.95 0c0-1.72.453-2.88 1.196-3.612.744-.733 1.856-1.113 3.329-1.113s2.585.38 3.33 1.113c.742.733 1.195 1.892 1.195 3.612a.475.475 0 10.95 0c0-1.88-.497-3.32-1.48-4.288-.77-.76-1.795-1.183-2.989-1.328A3.627 3.627 0 007.5.875zM4.825 4.5a2.675 2.675 0 115.35 0 2.675 2.675 0 01-5.35 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default IconPerson;