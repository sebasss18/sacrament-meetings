// Account avatar.

type UserAvatarProps = {
  seed: string;
  className?: string;
  animated?: boolean;
};

function hash(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 2246822507);
  h ^= h >>> 13;
  return h >>> 0;
}

export default function UserAvatar({
  seed,
  className = "size-24 text-neutral-900 dark:text-neutral-100",
  animated = true,
}: UserAvatarProps) {
  const r = (k: string, n: number) => hash(seed + ":" + k) % n;

  const eye = 6.5 + r("eye", 4) * 0.5;
  const smile = 4.5 + r("smile", 4) * 0.5;
  const tilt = (r("tilt", 5) - 2) * 0.8;
  const delay = -(r("delay", 120) / 10);
  const duration = 11 + r("duration", 5);

  const motion = animated
    ? { animationDelay: `${delay}s`, animationDuration: `${duration}s` }
    : undefined;

  return (
    <div className={`shrink-0 ${className}`} aria-hidden="true">
      {animated && (
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            .av-head {
              transform-origin: 50px 66px;
              animation: av-tilt 12s ease-in-out infinite;
            }
            .av-face {
              animation: av-look 12s ease-in-out infinite;
            }
            .av-eyes {
              transform-box: fill-box;
              transform-origin: center;
              animation: av-blink 5s infinite;
            }
            @keyframes av-look {
              0%, 8%    { transform: translate(0, 0); }
              16%, 26%  { transform: translate(-3.5px, -0.5px); }
              34%, 42%  { transform: translate(0, 0); }
              50%, 60%  { transform: translate(3.5px, 0.5px); }
              68%, 74%  { transform: translate(0, -2.2px); }
              82%, 90%  { transform: translate(0, 1.2px); }
              100%      { transform: translate(0, 0); }
            }
            @keyframes av-tilt {
              0%, 8%    { transform: translate(0, 0) rotate(0deg); }
              16%, 26%  { transform: translate(0, 0) rotate(-2.5deg); }
              34%, 42%  { transform: translate(0, 0) rotate(0deg); }
              50%, 60%  { transform: translate(0, 0) rotate(2.5deg); }
              68%, 74%  { transform: translate(0, -1.2px) rotate(0deg); }
              82%, 90%  { transform: translate(0, 0.8px) rotate(0deg); }
              100%      { transform: translate(0, 0) rotate(0deg); }
            }
            @keyframes av-blink {
              0%, 92%, 100% { transform: scaleY(1); }
              96% { transform: scaleY(0.1); }
            }
          }
        `}</style>
      )}

      <svg
        viewBox="0 0 100 100"
        className="block size-full"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 96 V86 C22 74 34 66 50 66 C66 66 78 74 78 86 V96" />

        <g
          className="av-head"
          style={
            animated
              ? motion
              : {
                  transform: `rotate(${tilt}deg)`,
                  transformOrigin: "50px 66px",
                }
          }
        >
          <circle cx="50" cy="38" r="20" />

          <g className="av-face" style={motion}>
            <g
              className="av-eyes"
              style={animated ? { animationDelay: `${delay}s` } : undefined}
            >
              <path d={`M${50 - eye} 37 V43`} />
              <path d={`M${50 + eye} 37 V43`} />
            </g>

            <path d={`M${50 - smile} 49 Q50 54.5 ${50 + smile} 49`} />
          </g>
        </g>
      </svg>
    </div>
  );
}
