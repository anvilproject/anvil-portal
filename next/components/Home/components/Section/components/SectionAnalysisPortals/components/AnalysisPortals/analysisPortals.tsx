import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSectionsData } from "../../../../../../../../providers/sectionsData";
import { SectionCard } from "../../../../../../common/entities";
import { Bullets } from "../../../../../Bullets/bullets";
import { Grid } from "./analysisPortals.styles";
import { INTERSECTION_OBSERVER_OPTIONS, ROWS } from "./common/constants";
import { Cards } from "./components/Cards/cards";

export const AnalysisPortals = (): JSX.Element => {
  const { analysisPortalCards } = useSectionsData();
  const observerRef = useRef<IntersectionObserver>();
  const portalsRef = useRef<HTMLDivElement>(null);
  const [activeBullet, setActiveBullet] = useState<number>(0);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const bullets = useMemo(
    () => getBullets(analysisPortalCards),
    [analysisPortalCards]
  );
  const cards = useMemo(
    () => rotateCards(analysisPortalCards, activeBullet, isIntersecting),
    [activeBullet, analysisPortalCards, isIntersecting]
  );

  const onIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      setIsIntersecting(entry.isIntersecting);
    });
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(onIntersection, {
      root: portalsRef.current,
      ...INTERSECTION_OBSERVER_OPTIONS,
    });
    if (portalsRef.current?.lastElementChild) {
      observerRef.current.observe(portalsRef.current.lastElementChild);
    }
    return () => {
      observerRef.current?.disconnect();
    };
  }, [onIntersection]);

  // Reset the active bullet when the cards intersect the viewport.
  useEffect(() => {
    setActiveBullet(0);
  }, [isIntersecting]);

  return (
    <Fragment>
      <Grid ref={portalsRef}>
        <Cards cards={cards} />
      </Grid>
      {!isIntersecting && (
        <Bullets
          activeBullet={activeBullet}
          bullets={bullets}
          onBullet={setActiveBullet}
        />
      )}
    </Fragment>
  );
};

/**
 * Returns array of bullets.
 * @param cards - Cards.
 * @returns bullets.
 */
function getBullets(cards: SectionCard[]): number[] {
  const bulletCount = Math.ceil(cards.length / ROWS);
  return [...Array(bulletCount).keys()];
}

/**
 * Returns cards organised by row position.
 * @param cards - Cards.
 * @returns cards organised by row position.
 */
const organiseCardsByRowPosition = (cards: SectionCard[]): SectionCard[][] => {
  // Calculate the maximum number of cards per row.
  const cardsPerRow = Math.ceil(cards.length / ROWS);
  // Return the cards organised by row position.
  return [...cards].reduce((acc, card, cardIndex) => {
    const rowIndex = Math.floor(cardIndex / cardsPerRow);
    const row = acc[rowIndex] || [];
    row.push(card);
    acc[rowIndex] = row;
    return acc;
  }, [] as SectionCard[][]);
};

/**
 * Returns cards rotated into the correct position based on the active bullet.
 * Each row of cards handles its own rotation.
 * @param cards - Cards.
 * @param activeBullet - Active bullet.
 * @param isIntersecting - Boolean indicating cards are intersecting the viewport.
 * @returns rotated cards.
 */
function rotateCards(
  cards: SectionCard[],
  activeBullet: number,
  isIntersecting: boolean
): SectionCard[] {
  if (isIntersecting) {
    return cards;
  }
  const organisedCards = organiseCardsByRowPosition(cards);
  return organisedCards.reduce((acc, row) => {
    const rotatedRow: SectionCard[] = [...row];
    for (let i = 0; i < activeBullet; i++) {
      const firstCard = rotatedRow.shift() as SectionCard;
      rotatedRow.push(firstCard);
    }
    return acc.concat(rotatedRow);
  }, [] as SectionCard[]);
}
