import HomePageFooter from "./home-footer/page";
import HomePageHeader from "./home-header/page";
import HomeMain from "./home-main/page";

export default function HomeLayout() {
  return (
    <>
      <HomePageHeader />
      <HomeMain />
      <HomePageFooter />
    </>
  );
}
