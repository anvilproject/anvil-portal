import { Bullet, Bullets as CarouselBullets } from "./bullets.styles";

interface BulletsProps {
  activeCard: number;
  bullets: number[];
  setActiveCard: (cardIndex: number) => void;
}

export const Bullets = ({
  activeCard,
  bullets,
  setActiveCard,
}: BulletsProps): JSX.Element => {
  return (
    <CarouselBullets>
      {bullets.map((bullet) => (
        <Bullet
          key={bullet}
          isActive={activeCard === bullet}
          onClick={(): void => {
            setActiveCard(bullet);
          }}
          onKeyDown={(): void => {
            setActiveCard(bullet);
          }}
        />
      ))}
    </CarouselBullets>
  );
};
