/**
 * EN-Hero = DE-Hero mit locale='en'.
 * Alle Inhalte kommen aus lib/i18n/strings.ts; DE und EN bleiben so
 * zwangsläufig strukturgleich.
 */
import HeroDE from '../Hero';

export default function Hero() {
  return <HeroDE locale="en" />;
}
