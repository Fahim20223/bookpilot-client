import React from "react";
import Banner from "../Banner/Banner";
import BookAlertUI from "../BookAlerttUI/BookAlertUI";
import NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription";
import AuthorsOfMonth from "../AuthorsOfMonth/AuthorsOfMonth";
import Coverage from "../Coverage/Coverage";
import LatestBooks from "../LatestBooks/LatestBooks";
import WhyChooseBookPilot from "../WhyChooseBookPilot/WhyChooseBookPilot";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <BookAlertUI></BookAlertUI>

      <AuthorsOfMonth />
      <LatestBooks />
      <Coverage></Coverage>
      <WhyChooseBookPilot></WhyChooseBookPilot>
      <NewsletterSubscription></NewsletterSubscription>
    </div>
  );
};

export default Home;
