import React from "react";
import Banner from "../Banner/Banner";
import BookAlertUI from "../BookAlerttUI/BookAlertUI";
import NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <BookAlertUI></BookAlertUI>
      <NewsletterSubscription></NewsletterSubscription>
    </div>
  );
};

export default Home;
