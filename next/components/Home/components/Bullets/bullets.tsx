import { Bullet, Bullets as SectionBullets } from "./bullets.styles";

interface BulletsProps {
  activeBullet: number;
  bullets: number[];
  className?: string;
  onBullet: (index: number) => void;
}

export const Bullets = ({
  activeBullet,
  bullets,
  className,
  onBullet,
}: BulletsProps): JSX.Element => {
  return (
    <SectionBullets className={className}>
      {bullets.map((bullet) => (
        <Bullet
          key={bullet}
          isActive={activeBullet === bullet}
          onClick={(): void => {
            onBullet(bullet);
          }}
          onKeyDown={(): void => {
            onBullet(bullet);
          }}
        />
      ))}
    </SectionBullets>
  );
};
