import React from "react";
import Banner from "../Banner/Banner";
import BookAlertUI from "../BookAlerttUI/BookAlertUI";
import NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription";
import AuthorsOfMonth from "../AuthorsOfMonth/AuthorsOfMonth";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <BookAlertUI></BookAlertUI>
      <AuthorsOfMonth />
      <NewsletterSubscription></NewsletterSubscription>
    </div>
  );
};

export default Home;
