import React from "react";
import Banner from "../Banner/Banner";
import BookAlertUI from "../BookAlerttUI/BookAlertUI";
import NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription";
import Coverage from "../Coverage/Coverage";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <BookAlertUI></BookAlertUI>
      <NewsletterSubscription></NewsletterSubscription>
      <Coverage></Coverage>
    </div>
  );
};

export default Home;
