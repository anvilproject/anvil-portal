import { Bullet, Bullets as CarouselBullets } from "./bullets.styles";

interface BulletsProps {
  activeCard: number;
  bullets: number[];
  setActiveCard: (cardIndex: number) => void;
  setSlow: (slow: boolean) => void;
}

export const Bullets = ({
  activeCard,
  bullets,
  setActiveCard,
  setSlow,
}: BulletsProps): JSX.Element => {
  return (
    <CarouselBullets>
      {bullets.map((bullet) => (
        <Bullet
          key={bullet}
          isActive={activeCard === bullet}
          onClick={(): void => {
            setSlow(false);
            setActiveCard(bullet);
          }}
          onKeyDown={(): void => {
            setSlow(false);
            setActiveCard(bullet);
          }}
        />
      ))}
    </CarouselBullets>
  );
};
