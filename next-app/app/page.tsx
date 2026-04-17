import HomeCategories from "../components/HomeCategories";
import HomeHero from "../components/HomeHero";
import HomeFeatures from "../components/HomFeatures";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeatures/>
      <HomeCategories />
    </>
  );
}
